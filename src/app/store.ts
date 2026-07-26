// The central store: one in-memory state plus the actions that move it. Built as
// a module-level external store (useSyncExternalStore) so React screens, the
// self-driving demo runner, and the proof scripts all read the same state and
// dispatch the same real actions.
//
// v3 changes over v2 (spec "This is an app, not a demo"):
//  - the mutable world persists to localStorage (versioned key, debounced), and
//    "Reset workspace" restores the seed;
//  - timestamps are real in the browser and pinned in Node / demo mode, so the
//    app feels live while the proofs and the recorded demo stay deterministic;
//  - new slices: agentRuns (live agent presence), pendingIntake (the parse ->
//    interpret -> confirm upload flow), testDrafts (the assessment studio), and
//    relevanceRatings (the advisory's core output);
//  - home is the Inbox; navigation syncs to the URL hash (wired in App.tsx).
//
// The v2 proposal state machine is carried unchanged:
//   drafting --(coordinator runs)--> testing
//   drafting --(lecturer submits)--> coordinator-review
//   coordinator-review --(approve)--> testing   --(changes)--> drafting
//   testing --(run done)--> management-approval
//   management-approval --(approve)--> approved (writes a Prediction)
//                       --(reject)--> drafting

import { useSyncExternalStore } from "react";
import type {
  AgentName,
  AgentRun,
  AssessmentBlueprint,
  BloomLevel,
  CLO,
  ChangeProposal,
  DataSource,
  Hat,
  IntakeInterpretation,
  Notification,
  NotificationKind,
  ParsedDoc,
  Person,
  PersonId,
  Prediction,
  ProposalId,
  RelevanceRating,
  ResultUpload,
  RoleAssignment,
  Subject,
  SubjectId,
  SubjectVersion,
  SurveyRecord,
  TestDraft,
  TestItem,
  VerdictReport,
} from "../types.ts";
import type { Screen } from "./roles.ts";
import { can, landingScreen, navAllows, hatsOn } from "./roles.ts";
import type { SimState } from "./sim.ts";
import { initSim, SIM_TICK_MS, stepSim } from "./sim.ts";
import type { SignalSimState } from "./signalSim.ts";
import { initSignalSim, SIGNAL_TICK_MS, stepSignal } from "./signalSim.ts";
import { DRILL_STEP_MS, DRILL_STEPS, scaleMs } from "../demo/timing.ts";
import {
  runAcceptanceWithDistribution,
  type AcceptanceDistribution,
} from "../agents/acceptance.ts";
import { runIntake, type ParsedSheet } from "../agents/intake.ts";
import { runAuthoring } from "../agents/authoring.ts";
import { runAnalogy } from "../agents/analogy.ts";
import { runSignal } from "../agents/signal.ts";
import { computeRelevanceRatings } from "../data/market.ts";
import { ITEMS, itemsForCLOs } from "../data/items.ts";
import {
  CANONICAL_PROPOSAL,
  CLOS,
  DATA_SOURCES,
  PEOPLE,
  PEOPLE_IDS,
  PROGRAMME,
  ROLE_ASSIGNMENTS,
  SEED_PREDICTIONS,
  SEED_RESULT_UPLOADS,
  SEED_SUBJECT_VERSIONS,
  SUBJECTS,
  SURVEY,
  TERM,
} from "../data/seed.ts";

// ---------- the seven agents (office + presence) ----------
export type AgentId = AgentName;
export type AgentState = "idle" | "working" | "done" | "needs-input";

export const AGENT_LABELS: Record<AgentId, string> = {
  intake: "Intake",
  signal: "Signal",
  curriculum: "Curriculum",
  authoring: "Authoring",
  cohort: "Cohort",
  analogy: "Analogy",
  evaluator: "Evaluator",
};

// ---------- time ----------
// The seed clock: every seeded timestamp, and every timestamp in demo/proof
// mode, so those paths are identical every run. In the browser (outside the
// demo) actions stamp real time, which is what makes the app feel live.
const SEED_NOW = "2026-07-01T10:00:00Z";
let clockPinned = typeof window === "undefined";

/** Pin (or unpin) the clock. The demo pins it on Play so a recording is
 *  deterministic; proofs run in Node where it is pinned by default. */
export function setClockPinned(pinned: boolean) {
  clockPinned = typeof window === "undefined" ? true : pinned;
}
export function nowIso(): string {
  return clockPinned ? SEED_NOW : new Date().toISOString();
}

export interface AppState {
  // reference data
  people: Person[];
  assignments: RoleAssignment[];
  programme: typeof PROGRAMME;
  subjects: Subject[];
  clos: CLO[];
  survey: SurveyRecord[];

  // session
  currentPersonId: PersonId | null;
  screen: Screen;
  selectedSubjectId: SubjectId | null;
  selectedProposalId: ProposalId | null;

  // mutable world
  proposals: ChangeProposal[];
  notifications: Notification[];
  predictions: Prediction[];
  resultUploads: ResultUpload[];
  dataSources: DataSource[];
  subjectVersions: SubjectVersion[];
  testDrafts: TestDraft[];
  relevanceRatings: RelevanceRating[];

  // v3: agent presence + the intake pipeline
  agentRuns: AgentRun[];
  pendingIntake: { doc: ParsedDoc; interp: IntakeInterpretation } | null;

  // transient UI
  sim: SimState | null;
  signalSim: SignalSimState | null; // the staged Signal reveal on Trends
  drillOpen: boolean;
  drillStep: number; // -1 closed; 0..5 the six-hop drill-down revealing one by one
  agentStates: Record<AgentId, AgentState>;
  agentBubble: { agent: AgentId; text: string } | null;
  agentPanelOpen: boolean; // the right-side agent panel (spec 5.7)
  critique: string[] | null; // last Authoring review critique
  flashUpload: ResultUpload | null; // last filed upload, for the Upload receipt
  toast: string | null;

  idSeq: number;
}

function idleAgents(): Record<AgentId, AgentState> {
  return {
    intake: "idle",
    signal: "idle",
    curriculum: "idle",
    authoring: "idle",
    cohort: "idle",
    analogy: "idle",
    evaluator: "idle",
  };
}

function seedState(): AppState {
  return {
    people: PEOPLE,
    assignments: [...ROLE_ASSIGNMENTS],
    programme: PROGRAMME,
    subjects: [...SUBJECTS],
    clos: [...CLOS],
    survey: SURVEY,

    currentPersonId: null,
    screen: "login",
    selectedSubjectId: null,
    selectedProposalId: CANONICAL_PROPOSAL.id,

    proposals: [structuredClone(CANONICAL_PROPOSAL)],
    notifications: [],
    predictions: [...SEED_PREDICTIONS],
    resultUploads: [...SEED_RESULT_UPLOADS],
    dataSources: [...DATA_SOURCES],
    subjectVersions: [...SEED_SUBJECT_VERSIONS],
    testDrafts: [],
    relevanceRatings: computeRelevanceRatings(SUBJECTS, CLOS, SEED_NOW),

    agentRuns: [],
    pendingIntake: null,

    sim: null,
    signalSim: null,
    drillOpen: false,
    drillStep: -1,
    agentStates: idleAgents(),
    agentBubble: null,
    agentPanelOpen: false,
    critique: null,
    flashUpload: null,
    toast: null,

    idSeq: 1,
  };
}

// ---------- persistence (spec: "State persists") ----------
const STORAGE_KEY = "lyceum-v3-state@1";

// The slice of state worth keeping across refreshes: the mutable world and the
// session. Transient UI (sims, drills, toasts, agent runs) always starts clean.
const PERSISTED_KEYS = [
  "assignments",
  "subjects",
  "clos",
  "currentPersonId",
  "screen",
  "selectedSubjectId",
  "selectedProposalId",
  "proposals",
  "notifications",
  "predictions",
  "resultUploads",
  "dataSources",
  "subjectVersions",
  "testDrafts",
  "relevanceRatings",
  "idSeq",
] as const;

function loadPersisted(): Partial<AppState> | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    // A running sim or a mid-demo screen must not resurrect into a fresh page.
    if (parsed.screen === "login" || parsed.screen === undefined) parsed.currentPersonId = null;
    return parsed;
  } catch {
    return null;
  }
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function schedulePersist() {
  if (typeof localStorage === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const out: Record<string, unknown> = {};
      for (const k of PERSISTED_KEYS) out[k] = state[k];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    } catch {
      // Storage full or blocked: the app still works, it just will not persist.
    }
  }, 250);
}

let state: AppState = (() => {
  const seed = seedState();
  const persisted = loadPersisted();
  return persisted ? { ...seed, ...persisted } : seed;
})();

// ---------- external-store plumbing ----------
const listeners = new Set<() => void>();
function emit() {
  for (const l of listeners) l();
  schedulePersist();
}
function set(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  emit();
}
export function getState(): AppState {
  return state;
}
function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
export function useStore(): AppState {
  return useSyncExternalStore(subscribe, getState, getState);
}

function nextId(prefix: string): string {
  const id = `${prefix}-${state.idSeq}`;
  state = { ...state, idSeq: state.idSeq + 1 };
  return id;
}

// ---------- selectors ----------
export function currentPerson(): Person | null {
  return state.people.find((p) => p.id === state.currentPersonId) ?? null;
}
export function personById(id: PersonId): Person | undefined {
  return state.people.find((p) => p.id === id);
}
export function subjectById(id: SubjectId): Subject | undefined {
  return state.subjects.find((s) => s.id === id);
}
export function proposalById(id: ProposalId | null): ChangeProposal | undefined {
  return id ? state.proposals.find((p) => p.id === id) : undefined;
}
export function unreadFor(personId: PersonId): Notification[] {
  return state.notifications.filter((n) => n.toPersonId === personId && !n.read);
}
export function inboxFor(personId: PersonId): Notification[] {
  return [...state.notifications]
    .filter((n) => n.toPersonId === personId)
    .sort((a, b) => (a.createdAt === b.createdAt ? 0 : a.createdAt < b.createdAt ? 1 : -1));
}
/** First person who holds the given hat on a subject. */
export function personWithHat(subjectId: SubjectId, hat: Hat): Person | undefined {
  const a = state.assignments.find((x) => x.subjectId === subjectId && x.hat === hat);
  return a ? personById(a.personId) : undefined;
}
export function ratingFor(subjectId: SubjectId): RelevanceRating | undefined {
  return state.relevanceRatings.find((r) => r.subjectId === subjectId);
}
export function testDraftById(id: string | undefined): TestDraft | undefined {
  return id ? state.testDrafts.find((t) => t.id === id) : undefined;
}

function setAgent(agent: AgentId, st: AgentState) {
  set((s) => ({ agentStates: { ...s.agentStates, [agent]: st } }));
}
function resetAgents() {
  set({ agentStates: idleAgents(), agentBubble: null });
}

// ---------- agent presence (spec 5.7) ----------
export function beginAgentRun(agent: AgentId, label: string, onPage: string): string {
  const id = nextId("AR");
  const run: AgentRun = {
    id,
    agent,
    status: "thinking",
    startedAt: nowIso(),
    label,
    streamText: "",
    onPage,
  };
  setAgent(agent, "working");
  set((s) => ({ agentRuns: [...s.agentRuns.slice(-19), run] }));
  return id;
}
export function appendAgentStream(runId: string, chunk: string) {
  set((s) => ({
    agentRuns: s.agentRuns.map((r) =>
      r.id === runId ? { ...r, status: "streaming", streamText: (r.streamText ?? "") + chunk } : r,
    ),
  }));
}
export function finishAgentRun(
  runId: string,
  status: "done" | "failed" | "fallback",
  opts?: { label?: string; resultRef?: string },
) {
  const run = state.agentRuns.find((r) => r.id === runId);
  if (run) setAgent(run.agent, "done");
  set((s) => ({
    agentRuns: s.agentRuns.map((r) =>
      r.id === runId
        ? { ...r, status, label: opts?.label ?? r.label, resultRef: opts?.resultRef }
        : r,
    ),
  }));
}
export function latestRunFor(agent: AgentId): AgentRun | undefined {
  return [...state.agentRuns].reverse().find((r) => r.agent === agent);
}
export function toggleAgentPanel(open?: boolean) {
  set((s) => ({ agentPanelOpen: open ?? !s.agentPanelOpen }));
}

// ---------- session actions ----------
export function login(personId: PersonId) {
  const person = personById(personId);
  if (!person) return;
  resetAgents();
  set({ currentPersonId: personId, screen: landingScreen(person, state.assignments) });
}
export function logout() {
  set({ currentPersonId: null, screen: "login" });
}
/** Person switch (the account menu): change who we are, clamp the screen. */
export function switchUser(personId: PersonId) {
  const person = personById(personId);
  if (!person) return;
  set((s) => ({
    currentPersonId: personId,
    screen: navAllows(person, s.assignments, s.screen)
      ? s.screen
      : landingScreen(person, s.assignments),
  }));
}
export function navigate(screen: Screen) {
  set({ screen });
}
export function selectSubject(subjectId: SubjectId | null) {
  set({ selectedSubjectId: subjectId });
}
export function selectProposal(proposalId: ProposalId | null) {
  set({ selectedProposalId: proposalId });
}
export function dismissToast() {
  set({ toast: null });
}
export function showToast(message: string) {
  set({ toast: message });
}

// ---------- notifications ----------
function notify(args: {
  toPersonId: PersonId;
  kind: NotificationKind;
  subjectId?: SubjectId;
  proposalId?: ProposalId;
  agentFindings?: string;
}) {
  const n: Notification = {
    id: nextId("N"),
    toPersonId: args.toPersonId,
    kind: args.kind,
    subjectId: args.subjectId,
    proposalId: args.proposalId,
    agentFindings: args.agentFindings,
    read: false,
    createdAt: nowIso(),
  };
  set((s) => ({ notifications: [...s.notifications, n] }));
}

export function openNotification(id: string) {
  const n = state.notifications.find((x) => x.id === id);
  if (!n) return;
  set((s) => ({
    notifications: s.notifications.map((x) => (x.id === id ? { ...x, read: true } : x)),
  }));
  if (n.proposalId) selectProposal(n.proposalId);
  if (n.subjectId) selectSubject(n.subjectId);
  // Land the reader in context.
  const person = currentPerson();
  if (!person) return;
  if (n.kind === "review-request") navigate("studio");
  else if (n.kind === "ping-update") navigate("studio");
  else if (n.kind === "ping-new-subject") navigate("new-subject");
  else if (n.kind === "test-done" || n.kind === "approved" || n.kind === "rejected") {
    navigate(person.orgRole === "management" ? "approval" : "studio");
  }
}

// ---------- proposal helpers ----------
function patchProposal(id: ProposalId, fn: (p: ChangeProposal) => ChangeProposal) {
  set((s) => ({ proposals: s.proposals.map((p) => (p.id === id ? fn(p) : p)) }));
}
function authorIsCoordinator(p: ChangeProposal): boolean {
  return hatsOn(p.authorId, p.subjectId, state.assignments).includes("coordinator");
}

// ---------- Trends -> routing (spec Section 7) ----------
export function routeDrift(subjectId: SubjectId) {
  const signal = runSignal(state.programme.id);
  setAgent("signal", "done");
  setAgent("curriculum", "done");
  const drift = signal.subjectDrift.find((d) => d.subjectId === subjectId);
  const rating = ratingFor(subjectId);
  const sources = rating
    ? new Set(rating.evidence.map((e) => e.sourceId)).size
    : 0;
  const findings =
    `Demand on this subject's outcomes is outpacing coverage (gap ${(drift?.gap ?? 0).toFixed(2)}` +
    (sources > 0 ? `, corroborated across ${sources} market sources` : "") +
    `). Sampled from the skills signal over the programme.`;
  if (drift?.flag === "new-subject") {
    notify({
      toPersonId: state.programme.departmentOwnerId,
      kind: "ping-new-subject",
      subjectId,
      agentFindings: findings,
    });
    set({ toast: "Routed to the department owner to scope a new subject." });
  } else {
    const coord = personWithHat(subjectId, "coordinator");
    const proposal = state.proposals.find((p) => p.subjectId === subjectId);
    if (coord) {
      notify({
        toPersonId: coord.id,
        kind: "ping-update",
        subjectId,
        proposalId: proposal?.id,
        agentFindings: findings,
      });
      set({ toast: `Routed to ${coord.name}, the subject coordinator.` });
    }
  }
}

// ---------- Trends -> the staged Signal reveal ----------
let signalTimer: ReturnType<typeof setInterval> | null = null;

/** Play the Signal agent's staged reveal on the Trends screen: reading ->
 *  extracting -> mapping -> done, landing on CS220 / CLO4 gap 0.62.
 *  Deterministic, fixed ticks. Idempotent while running. */
export function runSignalReveal() {
  if (state.signalSim && state.signalSim.phase !== "done") return;
  setAgent("signal", "working");
  set({ signalSim: initSignalSim() });
  if (signalTimer) clearInterval(signalTimer);
  signalTimer = setInterval(tickSignal, scaleMs(SIGNAL_TICK_MS));
}

function tickSignal() {
  const ss = state.signalSim;
  if (!ss) {
    if (signalTimer) clearInterval(signalTimer);
    signalTimer = null;
    return;
  }
  const next = stepSignal(ss);
  set({ signalSim: next });
  if (next.phase === "done") {
    if (signalTimer) clearInterval(signalTimer);
    signalTimer = null;
    setAgent("signal", "done");
    setAgent("curriculum", "done");
  }
}

/** Clear the reveal so a fresh demo run replays it from the top. */
export function resetSignalReveal() {
  if (signalTimer) clearInterval(signalTimer);
  signalTimer = null;
  set({ signalSim: null });
}

// ---------- the real intake pipeline (parse -> interpret -> confirm) ----------
/** Stage an interpreted upload for the user to confirm. The preview-and-confirm
 *  step is the trust boundary: nothing files until a human has seen what the
 *  agent read and what it made of it. */
export function stagePendingIntake(doc: ParsedDoc, interp: IntakeInterpretation) {
  set({ pendingIntake: { doc, interp } });
}
export function clearPendingIntake() {
  set({ pendingIntake: null });
}

/** File the confirmed interpretation into the spine. Returns what was filed. */
export function confirmPendingIntake(): string | null {
  const pending = state.pendingIntake;
  const person = currentPerson();
  if (!pending || !person) return null;
  const { doc, interp } = pending;
  const subjectId = interp.subjectGuess;
  const term = interp.termGuess ?? TERM;
  const at = nowIso();

  if (interp.docType === "results" && subjectId && interp.mappedRows?.length) {
    const upload: ResultUpload = {
      id: nextId(`RU-${subjectId}`),
      subjectId,
      uploadedBy: person.id,
      term,
      rows: interp.mappedRows,
      filedAt: at,
      sourceFileName: doc.fileName,
    };
    const ds: DataSource = {
      kind: "results",
      subjectId,
      term,
      recordCount: upload.rows.reduce((m, r) => Math.max(m, r.n), 0),
      ingestedAt: at,
      verified: true,
      sourceFileName: doc.fileName,
    };
    set((s) => ({
      resultUploads: [...s.resultUploads, upload],
      dataSources: [ds, ...s.dataSources],
      flashUpload: upload,
      pendingIntake: null,
      toast: `Filed ${doc.fileName} to ${subjectId}, ${term}. This ground now feeds the cohort.`,
    }));
    fillPredictionsForSubject(subjectId);
    return upload.id;
  }

  if (interp.docType === "clo-survey" && interp.surveyRecords?.length) {
    const records = interp.surveyRecords;
    const bySubject = new Map<string, number>();
    for (const r of records) {
      bySubject.set(r.subjectId, (bySubject.get(r.subjectId) ?? 0) + 1);
    }
    const sources: DataSource[] = [...bySubject.entries()].map(([sid, count]) => ({
      kind: "clo-survey",
      subjectId: sid,
      term,
      recordCount: count,
      ingestedAt: at,
      verified: true,
      sourceFileName: doc.fileName,
    }));
    set((s) => ({
      survey: [...s.survey, ...records],
      dataSources: [...sources, ...s.dataSources],
      pendingIntake: null,
      toast: `Filed ${records.length} survey records from ${doc.fileName}.`,
    }));
    return `${records.length} records`;
  }

  if ((interp.docType === "syllabus" || interp.docType === "slides") && subjectId) {
    const ds: DataSource = {
      kind: interp.docType === "syllabus" ? "syllabus" : "material",
      subjectId,
      term,
      recordCount: doc.pages.length,
      ingestedAt: at,
      verified: interp.docType === "syllabus",
      sourceFileName: doc.fileName,
    };
    set((s) => ({
      dataSources: [ds, ...s.dataSources],
      subjects:
        interp.docType === "syllabus"
          ? s.subjects.map((su) =>
              su.id === subjectId ? { ...su, syllabusVerifiedAt: at, syllabusSourceUrl: doc.fileName } : su,
            )
          : s.subjects,
      pendingIntake: null,
      toast: `Filed ${doc.fileName} as ${interp.docType === "syllabus" ? "the verified syllabus" : "course material"} for ${subjectId}.`,
    }));
    return ds.sourceFileName ?? null;
  }

  set({ toast: "Nothing was filed: the interpretation had no usable content.", pendingIntake: null });
  return null;
}

// ---------- Upload (the v2 one-click fixture path, kept for demo + proofs) ----------
const DEMO_SHEET: ParsedSheet = {
  fileName: "CS220-results-2025-S1.xlsx",
  headers: ["student", "CLO4 score"],
  rows: [
    { student: "anon-1", "CLO4 score": 0.55 },
    { student: "anon-2", "CLO4 score": 0.6 },
  ],
};

export function uploadResults(subjectId: SubjectId) {
  const person = currentPerson();
  if (!person) return;
  setAgent("intake", "working");
  const upload = runIntake(DEMO_SHEET, subjectId, {
    uploadedBy: person.id,
    term: TERM,
    filedAt: SEED_NOW,
    uploadId: `RU-${subjectId}-${TERM}`,
  });
  set((s) => {
    const others = s.resultUploads.filter((u) => u.id !== upload.id);
    const ds: DataSource = {
      kind: "results",
      subjectId,
      term: TERM,
      recordCount: upload.rows.reduce((m, r) => Math.max(m, r.n), 0),
      ingestedAt: SEED_NOW,
      verified: true,
    };
    const dataSources = [
      ds,
      ...s.dataSources.filter(
        (d) => !(d.kind === "results" && d.subjectId === subjectId && d.term === TERM),
      ),
    ];
    return { resultUploads: [...others, upload], dataSources, flashUpload: upload };
  });
  setAgent("intake", "done");
  fillPredictionsForSubject(subjectId);
}

function masteryFromUpload(u: ResultUpload): number {
  if (u.rows.length === 0) return 0;
  return u.rows.reduce((sum, r) => sum + r.meanScore, 0) / u.rows.length;
}

/** The latest results upload for a subject filed AT OR AFTER a moment. A
 *  prediction is a claim about the change taking effect, so it is only scored by
 *  results that arrived after it was made, never by what was already on file. */
function latestUploadSince(subjectId: SubjectId, since: string): ResultUpload | undefined {
  return [...state.resultUploads]
    .filter((u) => u.subjectId === subjectId && u.filedAt >= since)
    .sort((a, b) => (a.filedAt < b.filedAt ? 1 : -1))[0];
}

/** Closed loop: score any open prediction on a subject against results filed
 *  after the prediction was made. Returns how many were scored. */
function fillPredictionsForSubject(subjectId: SubjectId): number {
  let scored = 0;
  set((s) => ({
    predictions: s.predictions.map((p) => {
      if (p.subjectId !== subjectId || p.actualMastery !== undefined) return p;
      const upload = latestUploadSince(subjectId, p.madeAt);
      if (!upload) return p;
      const actual = masteryFromUpload(upload);
      scored += 1;
      return { ...p, actualMastery: actual, residual: Math.abs(p.predictedMastery - actual) };
    }),
  }));
  return scored;
}

/** Score every open prediction against results filed since it was made. Honest
 *  toast: only claims what it actually did. */
export function scoreOpenPredictions() {
  let scored = 0;
  for (const subjectId of new Set(
    state.predictions.filter((p) => p.actualMastery === undefined).map((p) => p.subjectId),
  )) {
    scored += fillPredictionsForSubject(subjectId);
  }
  set({
    toast:
      scored > 0
        ? `Scored ${scored} prediction${scored === 1 ? "" : "s"} against the filed results.`
        : "No new results have been filed since these predictions were made.",
  });
}

// ---------- Course Studio: authoring ----------
export function draftWithAgent(proposalId: ProposalId, mode: "agent" | "hybrid") {
  const p = proposalById(proposalId);
  const subject = p && subjectById(p.subjectId);
  if (!p || !subject) return;
  setAgent("authoring", "working");
  const clos = state.clos.filter((c) => c.subjectId === subject.id);
  const result = runAuthoring(subject, clos, "Align with demand", "draft", p.draft, "fixture");
  patchProposal(proposalId, (pp) => ({
    ...pp,
    draft: { ...result.draft, testDraftId: pp.draft.testDraftId },
    history: [
      ...pp.history,
      { at: nowIso(), byPersonId: pp.authorId, action: "agent-drafted", note: `Agent drafted (${mode} mode).` },
    ],
  }));
  setAgent("authoring", mode === "hybrid" ? "needs-input" : "done");
  if (mode === "hybrid") {
    set({ agentBubble: { agent: "authoring", text: "Drafted a revision. Your turn to refine a line." } });
  }
}

/** Replace a proposal's draft wholesale (the live Authoring path streams, then
 *  commits through here so history stays honest about who wrote what). */
export function applyAgentDraft(proposalId: ProposalId, draft: ChangeProposal["draft"], note: string) {
  patchProposal(proposalId, (pp) => ({
    ...pp,
    draft: { ...draft, testDraftId: pp.draft.testDraftId },
    history: [...pp.history, { at: nowIso(), byPersonId: pp.authorId, action: "agent-drafted", note }],
  }));
}

export function requestAgentReview(proposalId: ProposalId) {
  const p = proposalById(proposalId);
  const subject = p && subjectById(p.subjectId);
  if (!p || !subject) return;
  setAgent("authoring", "working");
  const clos = state.clos.filter((c) => c.subjectId === subject.id);
  const result = runAuthoring(subject, clos, "Review draft", "review", p.draft, "fixture");
  set({ critique: result.critique ?? [] });
  setAgent("authoring", "needs-input");
  set({ agentBubble: { agent: "authoring", text: "I flagged a few things in the draft." } });
}

export function setCritique(critique: string[] | null) {
  set({ critique });
}

/** Edit a single CLO-change line. */
export function editCloChangeText(proposalId: ProposalId, index: number, text: string) {
  patchProposal(proposalId, (p) => {
    const cloChanges = [...(p.draft.cloChanges ?? [])];
    if (cloChanges[index]) cloChanges[index] = { ...cloChanges[index], text };
    return { ...p, draft: { ...p.draft, cloChanges } };
  });
}

/** Edit the free-text parts of a draft (topics, test/lab notes). */
export function editDraftField(
  proposalId: ProposalId,
  field: "topics" | "testDraft" | "labDraft",
  value: string,
) {
  patchProposal(proposalId, (p) => ({
    ...p,
    draft: {
      ...p.draft,
      [field]: field === "topics" ? value.split("\n").filter((t) => t.trim().length > 0) : value,
    },
  }));
}

/** Start a fresh draft on a subject that has no open proposal. Authored by the
 *  current person, so a lecturer's draft is correctly lecturer-authored (and so
 *  must pass coordinator review before testing). Selects it. */
export function startDraft(subjectId: SubjectId): ProposalId | null {
  const person = currentPerson();
  if (!person) return null;
  const existing = state.proposals.find(
    (p) => p.subjectId === subjectId && p.status !== "approved" && p.status !== "rejected",
  );
  if (existing) {
    selectSubject(subjectId);
    selectProposal(existing.id);
    return existing.id;
  }
  const clo = state.clos.find((c) => c.subjectId === subjectId);
  const id = `CP-${subjectId}-${state.idSeq}`;
  const proposal: ChangeProposal = {
    id,
    subjectId,
    kind: "update",
    authorId: person.id,
    draft: {
      topics: [],
      cloChanges: clo
        ? [{ cloId: clo.id, op: "edit", text: clo.text, bloomLevel: clo.bloomLevel }]
        : [],
    },
    status: "drafting",
    history: [{ at: nowIso(), byPersonId: person.id, action: "drafted", note: "Draft started." }],
  };
  set((s) => ({
    proposals: [...s.proposals, proposal],
    idSeq: s.idSeq + 1,
    selectedSubjectId: subjectId,
    selectedProposalId: id,
  }));
  return id;
}

// ---------- the assessment studio (spec 6.4) ----------
const BLOOM_ORDER: BloomLevel[] = ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"];
// Display difficulty per Bloom level for generated items (the ladder shape the
// spine uses; labelled as a draft value until an item is calibrated).
const BLOOM_B: Record<BloomLevel, number> = {
  Remember: 0.1,
  Understand: 0.3,
  Apply: 0.5,
  Analyse: 0.7,
  Evaluate: 0.85,
  Create: 1.0,
};
const BLOOM_VERB: Record<BloomLevel, string> = {
  Remember: "Define",
  Understand: "Explain",
  Apply: "Apply",
  Analyse: "Analyse",
  Evaluate: "Evaluate",
  Create: "Design",
};

/** Create (or return the existing) test draft for a subject/proposal. */
export function createTestDraft(subjectId: SubjectId, proposalId?: ProposalId): string | null {
  const person = currentPerson();
  if (!person) return null;
  const existing = state.testDrafts.find(
    (t) => t.subjectId === subjectId && t.status !== "approved" && (!proposalId || t.proposalId === proposalId),
  );
  if (existing) return existing.id;
  const clos = state.clos.filter((c) => c.subjectId === subjectId);
  const weight = clos.length > 0 ? 1 / clos.length : 1;
  const draft: TestDraft = {
    id: nextId(`TD-${subjectId}`),
    subjectId,
    proposalId,
    blueprint: {
      subjectId,
      totalMarks: 40,
      cloWeights: clos.map((c) => ({ cloId: c.id, weight })),
      bloomMix: { Understand: 0.25, Apply: 0.5, Analyse: 0.25 },
    },
    items: [],
    status: "drafting",
    authorId: person.id,
  };
  set((s) => ({ testDrafts: [...s.testDrafts, draft] }));
  if (proposalId) {
    patchProposal(proposalId, (p) => ({ ...p, draft: { ...p.draft, testDraftId: draft.id } }));
  }
  return draft.id;
}

export function updateBlueprint(testDraftId: string, blueprint: AssessmentBlueprint) {
  set((s) => ({
    testDrafts: s.testDrafts.map((t) => (t.id === testDraftId ? { ...t, blueprint } : t)),
  }));
}

/** Deterministic local item generation against the blueprint (the offline path;
 *  the live Authoring agent replaces the wording, not the structure). */
export function generateTestItems(testDraftId: string) {
  const t = state.testDrafts.find((x) => x.id === testDraftId);
  if (!t) return;
  const clos = state.clos.filter((c) => c.subjectId === t.subjectId);
  const targetCount = Math.max(4, Math.round(t.blueprint.totalMarks / 5));
  const mix = Object.entries(t.blueprint.bloomMix) as Array<[BloomLevel, number]>;
  const bloomPool: BloomLevel[] = [];
  for (const [level, share] of mix) {
    const n = Math.max(1, Math.round(share * targetCount));
    for (let i = 0; i < n; i += 1) bloomPool.push(level);
  }
  while (bloomPool.length < targetCount) bloomPool.push("Apply");
  bloomPool.sort((a, b) => BLOOM_ORDER.indexOf(a) - BLOOM_ORDER.indexOf(b));

  const items: TestItem[] = [];
  let i = 0;
  for (const cw of t.blueprint.cloWeights) {
    const clo = clos.find((c) => c.id === cw.cloId);
    if (!clo) continue;
    const count = Math.max(1, Math.round(cw.weight * targetCount));
    for (let k = 0; k < count && items.length < targetCount; k += 1) {
      const bloom = bloomPool[Math.min(i, bloomPool.length - 1)];
      i += 1;
      items.push({
        id: `${t.id}-Q${items.length + 1}`,
        text: `${BLOOM_VERB[bloom]} ${clo.text.toLowerCase()} ${
          bloom === "Apply" || bloom === "Analyse"
            ? "on a worked scenario, showing each step"
            : "in your own words, with one concrete example"
        }.`,
        targetCLO: clo.id,
        bloomLevel: bloom,
        difficulty: BLOOM_B[bloom],
        marks: Math.max(2, Math.round((cw.weight * t.blueprint.totalMarks) / count)),
        source: "agent",
      });
    }
  }
  set((s) => ({
    testDrafts: s.testDrafts.map((x) => (x.id === testDraftId ? { ...x, items } : x)),
    toast: `Drafted ${items.length} items against the blueprint.`,
  }));
}

export function updateTestItem(testDraftId: string, itemId: string, patch: Partial<TestItem>) {
  set((s) => ({
    testDrafts: s.testDrafts.map((t) =>
      t.id === testDraftId
        ? {
            ...t,
            items: t.items.map((it) =>
              it.id === itemId ? { ...it, ...patch, source: "human" as const } : it,
            ),
          }
        : t,
    ),
  }));
}

export function removeTestItem(testDraftId: string, itemId: string) {
  set((s) => ({
    testDrafts: s.testDrafts.map((t) =>
      t.id === testDraftId ? { ...t, items: t.items.filter((it) => it.id !== itemId) } : t,
    ),
  }));
}

/** A lecturer submits their test for coordinator review; a coordinator's own
 *  draft can be approved directly. Same authority chain as proposals. */
export function submitTestDraft(testDraftId: string) {
  const t = state.testDrafts.find((x) => x.id === testDraftId);
  if (!t) return;
  const isCoord = hatsOn(t.authorId, t.subjectId, state.assignments).includes("coordinator");
  if (isCoord) {
    set((s) => ({
      testDrafts: s.testDrafts.map((x) => (x.id === testDraftId ? { ...x, status: "approved" } : x)),
      toast: "Test approved (coordinator's own draft).",
    }));
    return;
  }
  set((s) => ({
    testDrafts: s.testDrafts.map((x) =>
      x.id === testDraftId ? { ...x, status: "coordinator-review" } : x,
    ),
  }));
  const coord = personWithHat(t.subjectId, "coordinator");
  if (coord) {
    notify({
      toPersonId: coord.id,
      kind: "review-request",
      subjectId: t.subjectId,
      proposalId: t.proposalId,
      agentFindings: "A lecturer has drafted a test and is asking for your review.",
    });
  }
  set({ toast: "Test sent to the coordinator for review." });
}

export function approveTestDraft(testDraftId: string) {
  const t = state.testDrafts.find((x) => x.id === testDraftId);
  const person = currentPerson();
  if (!t || !person) return;
  if (!can(person, "review-draft", { subjectId: t.subjectId, assignments: state.assignments })) {
    set({ toast: "Only the subject coordinator can approve a test." });
    return;
  }
  set((s) => ({
    testDrafts: s.testDrafts.map((x) => (x.id === testDraftId ? { ...x, status: "approved" } : x)),
    toast: "Test approved.",
  }));
}

// ---------- proposal state machine ----------
/** Lecturer-only author submits to the coordinator for review. */
export function submitForReview(proposalId: ProposalId) {
  const p = proposalById(proposalId);
  if (!p) return;
  const coord = personWithHat(p.subjectId, "coordinator");
  patchProposal(proposalId, (pp) => ({
    ...pp,
    status: "coordinator-review",
    history: [...pp.history, { at: nowIso(), byPersonId: pp.authorId, action: "submitted-for-review" }],
  }));
  if (coord) {
    notify({
      toPersonId: coord.id,
      kind: "review-request",
      subjectId: p.subjectId,
      proposalId,
      agentFindings: "A lecturer has drafted a change and is asking for your review before testing.",
    });
  }
  set({ toast: "Submitted to the coordinator for review." });
}

export function reviewApprove(proposalId: ProposalId) {
  patchProposal(proposalId, (p) => ({
    ...p,
    status: "testing",
    history: [
      ...p.history,
      { at: nowIso(), byPersonId: state.currentPersonId ?? p.authorId, action: "review-approved" },
    ],
  }));
  set({ toast: "Review approved. Ready to run the acceptance test." });
}

export function reviewRequestChanges(proposalId: ProposalId, note: string) {
  const p = proposalById(proposalId);
  if (!p) return;
  patchProposal(proposalId, (pp) => ({
    ...pp,
    status: "drafting",
    history: [
      ...pp.history,
      {
        at: nowIso(),
        byPersonId: state.currentPersonId ?? pp.authorId,
        action: "review-changes-requested",
        note,
      },
    ],
  }));
  notify({
    toPersonId: p.authorId,
    kind: "review-request",
    subjectId: p.subjectId,
    proposalId,
    agentFindings: note || "The coordinator asked for changes before this can be tested.",
  });
  set({ toast: "Changes requested; sent back to the author." });
}

/** Whether the test may run now. Two gates, both required:
 *  1. The ACTOR must have run-test capability on the subject: an academic with a
 *     hat there. This blocks management and the department from triggering a run.
 *  2. The PROPOSAL must be ready: already review-approved (status testing), or a
 *     coordinator's own draft (status drafting + author is the coordinator). This
 *     stops a lecturer's draft reaching a test without review. */
export function canRunTest(proposalId: ProposalId): boolean {
  const p = proposalById(proposalId);
  if (!p) return false;
  const person = currentPerson();
  if (!person || !can(person, "run-test", { subjectId: p.subjectId, assignments: state.assignments }))
    return false;
  if (p.status === "testing") return true;
  if (p.status === "drafting") return authorIsCoordinator(p);
  return false;
}

// ---------- the staged acceptance run ----------
let simTimer: ReturnType<typeof setInterval> | null = null;

/** Shared by the staged and immediate runs: enforce the gate, set testing, build
 *  the proxy cohort for a new subject, and compute the real spine result. */
function prepareRun(
  proposalId: ProposalId,
): { report: VerdictReport; distribution: AcceptanceDistribution } | null {
  const p = proposalById(proposalId);
  const subject = p && subjectById(p.subjectId);
  if (!p || !subject) return null;
  if (!canRunTest(proposalId)) {
    set({ toast: "This draft must pass coordinator review before it can be tested." });
    return null;
  }
  patchProposal(proposalId, (pp) => ({
    ...pp,
    status: "testing",
    history:
      pp.status === "testing"
        ? pp.history
        : [
            ...pp.history,
            { at: nowIso(), byPersonId: state.currentPersonId ?? pp.authorId, action: "review-approved" },
          ],
  }));

  // New-subject proposals are tested on an Analogy proxy cohort.
  const isNew = p.kind === "new-subject";
  let survey = state.survey;
  let items = ITEMS;
  let isProxyCohort = false;
  if (isNew) {
    const newCLOs = state.clos.filter((c) => c.subjectId === subject.id);
    const analogy = runAnalogy(newCLOs, state.subjects, state.survey);
    setAgent("analogy", "done");
    survey = analogy.proxySurvey;
    items = itemsForCLOs(newCLOs);
    isProxyCohort = true;
  }

  setAgent("cohort", "working");
  return runAcceptanceWithDistribution(p, subject, survey, items, {
    subjects: state.subjects,
    isProxyCohort,
  });
}

export function startAcceptanceRun(proposalId: ProposalId) {
  const prepared = prepareRun(proposalId);
  if (!prepared) return;
  const { report, distribution } = prepared;
  set({ sim: initSim(proposalId, report, distribution), drillOpen: false, drillStep: -1, screen: "acceptance" });
  selectProposal(proposalId);

  if (simTimer) clearInterval(simTimer);
  simTimer = setInterval(() => tickRun(report, distribution), scaleMs(SIM_TICK_MS));
}

/** Run without the staged reveal (a "skip animation" path; also used by proofs). */
export function runAcceptanceImmediate(proposalId: ProposalId) {
  const prepared = prepareRun(proposalId);
  if (!prepared) return;
  set({
    sim: {
      ...initSim(proposalId, prepared.report, prepared.distribution),
      phase: "done",
      learnersRun: prepared.report.groundedOnLearners,
      bins: initSim(proposalId, prepared.report, prepared.distribution).finalBins,
      displayedMastery: prepared.report.projectedMastery,
    },
  });
  finishRun(proposalId, prepared.report);
}

function tickRun(report: VerdictReport, _distribution: AcceptanceDistribution) {
  const sim = state.sim;
  if (!sim) {
    if (simTimer) clearInterval(simTimer);
    simTimer = null;
    return;
  }
  const next = stepSim(sim);
  set({ sim: next });
  if (next.phase === "done") {
    if (simTimer) clearInterval(simTimer);
    simTimer = null;
    finishRun(next.proposalId, report);
  }
}

function finishRun(proposalId: ProposalId, report: VerdictReport) {
  patchProposal(proposalId, (p) => ({
    ...p,
    status: "management-approval",
    acceptanceResult: report,
    history: [
      ...p.history,
      {
        at: nowIso(),
        byPersonId: state.currentPersonId ?? p.authorId,
        action: "tested",
        note: `Projected mastery ${report.projectedMastery.toFixed(2)}.`,
      },
    ],
  }));
  setAgent("cohort", "done");
  setAgent("evaluator", "needs-input");
  // Drop any earlier test-done ping for this proposal so a re-run (reject then
  // test again) does not pile up duplicate pings in management's inbox.
  set((s) => ({
    drillOpen: true,
    agentBubble: { agent: "evaluator", text: `Verdict ready: ${report.projectedMastery.toFixed(2)} projected.` },
    notifications: s.notifications.filter((n) => !(n.kind === "test-done" && n.proposalId === proposalId)),
  }));
  for (const m of state.people.filter((pp) => pp.orgRole === "management")) {
    notify({
      toPersonId: m.id,
      kind: "test-done",
      subjectId: proposalById(proposalId)?.subjectId,
      proposalId,
      agentFindings: report.summary,
    });
  }
}

/** The coordinator's explicit "send this to management" affordance after a test. */
export function submitToManagement(proposalId: ProposalId) {
  const p = proposalById(proposalId);
  if (!p) return;
  closeDrill();
  set({ toast: "Verdict sent to management for approval." });
}

// ---------- the six-hop drill-down reveal ----------
let drillTimer: ReturnType<typeof setInterval> | null = null;

/** Reveal the drill-down one hop at a time (verdict -> CLO4 -> learner -> theta ->
 *  item -> P), each held long enough to read. Deterministic; the interval scales
 *  under turbo for the smoke. Works for a human too. */
export function startDrillReveal() {
  const report = proposalById(state.selectedProposalId)?.acceptanceResult;
  if (!report) return;
  set({ drillOpen: true, drillStep: 0 });
  if (drillTimer) clearInterval(drillTimer);
  drillTimer = setInterval(() => {
    const cur = state.drillStep;
    if (cur >= DRILL_STEPS - 1) {
      if (drillTimer) clearInterval(drillTimer);
      drillTimer = null;
      return;
    }
    set({ drillStep: cur + 1 });
  }, scaleMs(DRILL_STEP_MS));
}

export function closeDrill() {
  if (drillTimer) clearInterval(drillTimer);
  drillTimer = null;
  set({ drillStep: -1 });
}

// ---------- management approval gate ----------
export function approveProposal(proposalId: ProposalId) {
  const p = proposalById(proposalId);
  // Only a tested proposal awaiting approval can be approved; the status guard
  // also makes this idempotent against a double-click.
  if (!p || !p.acceptanceResult || p.status !== "management-approval") return;
  const report = p.acceptanceResult;
  patchProposal(proposalId, (pp) => ({
    ...pp,
    status: "approved",
    history: [
      ...pp.history,
      { at: nowIso(), byPersonId: state.currentPersonId ?? PEOPLE_IDS.lim, action: "approved" },
    ],
  }));
  const prediction: Prediction = {
    proposalId,
    subjectId: p.subjectId,
    predictedMastery: report.projectedMastery,
    madeAt: nowIso(),
  };
  const version: SubjectVersion = {
    id: nextId(`${p.subjectId}-v`),
    subjectId: p.subjectId,
    snapshot: {
      title: subjectById(p.subjectId)?.title ?? p.subjectId,
      cloIds: subjectById(p.subjectId)?.cloIds ?? [],
      prerequisiteSubjectIds: subjectById(p.subjectId)?.prerequisiteSubjectIds ?? [],
    },
    cloSnapshot: state.clos.filter((c) => c.subjectId === p.subjectId),
    changedBy: state.currentPersonId ?? PEOPLE_IDS.lim,
    changedAt: nowIso(),
    reason: "Approved curriculum change.",
  };
  set((s) => ({
    predictions: [...s.predictions, prediction],
    subjectVersions: [...s.subjectVersions, version],
    subjects: s.subjects.map((su) => (su.id === p.subjectId ? { ...su, status: "active" } : su)),
    toast: "Approved. Prediction recorded for next term.",
  }));
  setAgent("evaluator", "done");
  notify({
    toPersonId: p.authorId,
    kind: "approved",
    subjectId: p.subjectId,
    proposalId,
    agentFindings: "Management approved the tested change.",
  });
  // The prediction stays OPEN: scored by NEXT term's results, not what is on file.
}

export function rejectProposal(proposalId: ProposalId, note = "Not approved.") {
  const p = proposalById(proposalId);
  if (!p || p.status !== "management-approval") return;
  patchProposal(proposalId, (pp) => ({
    ...pp,
    status: "drafting",
    history: [
      ...pp.history,
      { at: nowIso(), byPersonId: state.currentPersonId ?? PEOPLE_IDS.lim, action: "rejected", note },
    ],
  }));
  notify({ toPersonId: p.authorId, kind: "rejected", subjectId: p.subjectId, proposalId, agentFindings: note });
  set({ toast: "Rejected and returned to the author." });
  setAgent("evaluator", "done");
}

// ---------- department: create subject + assign hats ----------
export function createSubject(args: {
  id: SubjectId;
  title: string;
  year: number;
  semester: number;
  coordinatorId: PersonId;
  cloText: string;
}): SubjectId {
  const cloId = `${args.id}-CLO1`;
  const subject: Subject = {
    id: args.id,
    title: args.title,
    programmeId: state.programme.id,
    year: args.year,
    semester: args.semester,
    cloIds: [cloId],
    prerequisiteSubjectIds: [],
    sharedWithProgrammeIds: [],
    status: "proposed",
    currentVersionId: `${args.id}-v1`,
  };
  const clo: CLO = { id: cloId, subjectId: args.id, text: args.cloText, bloomLevel: "Apply" };
  const proposal: ChangeProposal = {
    id: `CP-${args.id}-001`,
    subjectId: args.id,
    kind: "new-subject",
    authorId: args.coordinatorId,
    draft: {
      topics: [args.cloText],
      cloChanges: [{ cloId, op: "add", text: args.cloText, bloomLevel: "Apply" }],
    },
    status: "drafting",
    history: [
      { at: nowIso(), byPersonId: state.programme.departmentOwnerId, action: "drafted", note: "New subject scoped." },
    ],
  };
  set((s) => ({
    subjects: [...s.subjects, subject],
    clos: [...s.clos, clo],
    assignments: [...s.assignments, { personId: args.coordinatorId, subjectId: args.id, hat: "coordinator" }],
    proposals: [...s.proposals, proposal],
    toast: `Created ${args.id} and assigned a coordinator.`,
  }));
  return args.id;
}

export function assignHat(personId: PersonId, subjectId: SubjectId, hat: Hat) {
  if (state.assignments.some((a) => a.personId === personId && a.subjectId === subjectId && a.hat === hat))
    return;
  set((s) => ({ assignments: [...s.assignments, { personId, subjectId, hat }], toast: "Hat assigned." }));
}

// ---------- office helpers ----------
export function setAgentState(agent: AgentId, st: AgentState) {
  setAgent(agent, st);
}

// ---------- reset (workspace + demo) ----------
/** Reset the mutable world to seed and stop every timer. Used by the account
 *  menu's "Reset workspace" and by the self-driving demo on each Play. */
export function resetDemoState() {
  if (simTimer) clearInterval(simTimer);
  simTimer = null;
  if (signalTimer) clearInterval(signalTimer);
  signalTimer = null;
  if (drillTimer) clearInterval(drillTimer);
  drillTimer = null;
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fine: the in-memory reset below still applies
    }
  }
  state = seedState();
  emit();
}
export const resetWorkspace = resetDemoState;
