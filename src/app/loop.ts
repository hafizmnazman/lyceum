// The Lyceum Loop (plan Section 4): Setup opens the course, six steps follow,
// and History keeps the record. One list, read by the loop rail in the sidebar,
// the hash routes (#/course/:id/<step>) and the step headers, so the names and
// the questions are the same everywhere.
//
// A step is done only when the record it produces exists (the "Done when"
// column of Section 4). Seeded examples never count as the lecturer's work.
// Package A2a adds the decision record, per-term scoping and the ring.

import { SEED_RESULT_UPLOADS } from "../data/seed.ts";
import type { Screen } from "./roles.ts";
import type { AppState } from "./store.ts";

export type CourseStep = "course" | "watch" | "report" | "decide" | "update" | "teach" | "learn" | "history";
export type StudioTab = AppState["studioTab"];

export interface LoopStepDef {
  id: CourseStep;
  label: string;
  question: string; // the one line under the step's title
  helper: string; // who assists at this step (plan Section 7.1); people decide at Decide
  screen: Screen; // where the step lives until its own screen is built
  tab?: StudioTab;
}

export const LOOP_STEPS: LoopStepDef[] = [
  { id: "course", label: "Course", question: "What does this course promise today?", helper: "Folio", screen: "studio", tab: "overview" },
  { id: "watch", label: "Watch", question: "What are employers asking for, right now and over time?", helper: "Scout", screen: "studio", tab: "evidence" },
  { id: "report", label: "Report", question: "What exactly do they ask, how often, and what does the course do about it?", helper: "Atlas, Lens and Steward", screen: "studio", tab: "evidence" },
  { id: "decide", label: "Decide", question: "What will we do, and who said so?", helper: "People decide", screen: "studio", tab: "evidence" },
  { id: "update", label: "Update", question: "What does the approved change look like, within our hours and rules?", helper: "Quill", screen: "studio", tab: "curriculum" },
  { id: "teach", label: "Teach", question: "What will the class do, and with what?", helper: "Prism", screen: "studio", tab: "plan" },
  { id: "learn", label: "Learn", question: "Did it work, as far as we can honestly tell?", helper: "Lens", screen: "upload" },
  { id: "history", label: "History", question: "Versions and decisions on one timeline.", helper: "Folio", screen: "studio", tab: "history" },
];

export const COURSE_STEPS = LOOP_STEPS.map((s) => s.id);

export function stepDef(id: CourseStep): LoopStepDef {
  return LOOP_STEPS.find((s) => s.id === id)!;
}

export function isCourseStep(value: string): value is CourseStep {
  return (COURSE_STEPS as string[]).includes(value);
}

/** The step a Studio tab belongs to. The evidence tab serves Watch, Report and Decide until A2a splits it, so the current step is kept when it already lives there. */
export function stepForTab(tab: StudioTab, current: CourseStep | null): CourseStep | null {
  if (current && stepDef(current).tab === tab) return current;
  switch (tab) {
    case "overview": return "course";
    case "evidence": return "watch";
    case "curriculum": return "update";
    case "plan": case "assessment": return "teach";
    case "history": return "history";
    default: return null; // the proposal tab belongs to the illustrative sandbox, not the loop
  }
}

export interface LoopStepStatus { id: CourseStep; done: boolean; count: string }

const plural = (n: number, one: string, many: string) => n + " " + (n === 1 ? one : many);

/** Done marks and counts for each step of one course, from saved records only. */
export function loopStatus(state: AppState, subjectId: string): LoopStepStatus[] {
  const outcomes = state.clos.filter((c) => c.subjectId === subjectId);
  const current = new Set(outcomes.map((c) => c.id));
  const sources = state.evidenceSources.filter((s) => s.subjectId === subjectId);
  const reviewed = sources.filter((s) => s.reviewed && !s.duplicateOf);
  const mentions = state.skillMentions.filter((m) => m.subjectId === subjectId);
  const mappings = state.skillMappings.filter((m) => m.subjectId === subjectId);
  const briefs = state.evidenceBriefs.filter((b) => b.subjectId === subjectId);
  const adopted = state.curriculumDrafts.filter((d) => d.subjectId === subjectId && d.status === "adopted");
  const versions = state.subjectVersions.filter((v) => v.subjectId === subjectId);
  const sessions = state.teachingPlans.find((p) => p.subjectId === subjectId)?.sessions ?? [];
  const seeded = new Set(SEED_RESULT_UPLOADS.map((u) => u.id));
  const filed = state.resultUploads.filter((u) => u.subjectId === subjectId && !seeded.has(u.id));
  const quoted = reviewed.some((s) => mentions.some((m) => m.sourceId === s.id));
  const mapped = mappings.some((m) => m.cloIds.some((id) => current.has(id)));
  const exists = state.subjects.some((s) => s.id === subjectId);
  return [
    { id: "course", done: exists && outcomes.length > 0, count: plural(outcomes.length, "outcome", "outcomes") },
    { id: "watch", done: reviewed.length > 0, count: plural(sources.length, "source", "sources") },
    { id: "report", done: quoted && mapped && briefs.length > 0, count: plural(mentions.length, "quotation", "quotations") },
    { id: "decide", done: false, count: plural(briefs.filter((b) => b.sentAt).length, "brief sent", "briefs sent") },
    { id: "update", done: adopted.length > 0, count: plural(adopted.length, "adopted version", "adopted versions") },
    { id: "teach", done: sessions.some((s) => s.cloIds.some((id) => current.has(id))), count: plural(sessions.length, "session", "sessions") },
    { id: "learn", done: filed.length > 0, count: plural(filed.length, "result file", "result files") },
    { id: "history", done: false, count: plural(versions.length, "version", "versions") },
  ];
}
