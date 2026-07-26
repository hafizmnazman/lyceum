// The Course Studio (spec 6.3 / 6.4): the centrepiece. Subject editing, the
// review chain, and the assessment studio, kept calm with three quiet tabs so
// density stays opt-in. Works for every role that can reach it: the status and
// the person's hats decide which single primary action is on offer.

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { can, hatsOn, subjectsForPerson } from "../../app/roles.ts";
import {
  approveTestDraft,
  canRunTest,
  createTestDraft,
  currentPerson,
  draftWithAgent,
  editCloChangeText,
  editDraftField,
  generateTestItems,
  navigate,
  personById,
  personWithHat,
  ratingFor,
  removeTestItem,
  requestAgentReview,
  reviewApprove,
  reviewRequestChanges,
  setCritique,
  startAcceptanceRun,
  startDraft,
  submitForReview,
  submitTestDraft,
  subjectById,
  testDraftById,
  updateBlueprint,
  updateTestItem,
  useStore,
  type AppState,
} from "../../app/store.ts";
import type {
  BloomLevel,
  ChangeProposal,
  Person,
  ProposalEvent,
  ProposalStatus,
  RelevanceBand,
  Subject,
  TestDraft,
} from "../../types.ts";
import { AgentStrip } from "../shell/AgentStrip.tsx";
import {
  Button,
  Card,
  EmptyState,
  Field,
  Input,
  Page,
  PageHead,
  Row,
  SectionLabel,
  Tag,
  Textarea,
} from "../primitives/index.tsx";

const BAND_TONE: Record<RelevanceBand, "ok" | "warn" | "danger" | "neutral"> = {
  aligned: "ok",
  drifting: "warn",
  misaligned: "danger",
  unrated: "neutral",
};

const STATUS_LABEL: Record<ProposalStatus, string> = {
  drafting: "Drafting",
  "coordinator-review": "Coordinator review",
  testing: "Ready to test",
  "management-approval": "Awaiting management",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_TONE: Record<ProposalStatus, "neutral" | "accent" | "ok" | "warn" | "danger"> = {
  drafting: "neutral",
  "coordinator-review": "warn",
  testing: "accent",
  "management-approval": "accent",
  approved: "ok",
  rejected: "danger",
};

const ACTION_LABEL: Record<ProposalEvent["action"], string> = {
  drafted: "Draft started",
  "agent-drafted": "Agent drafted",
  "agent-reviewed": "Agent reviewed",
  "submitted-for-review": "Submitted for review",
  "review-approved": "Review approved",
  "review-changes-requested": "Changes requested",
  tested: "Acceptance test run",
  approved: "Approved",
  rejected: "Rejected",
};

function fmtWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

type TabId = "content" | "assessment" | "history";

export function StudioScreen() {
  const state = useStore();
  const [tab, setTab] = useState<TabId>("content");
  const person = currentPerson();
  if (!person) return null;

  // Subject resolution: the selected subject, else the person's first subject.
  const selected = state.selectedSubjectId ? subjectById(state.selectedSubjectId) : undefined;
  const firstOwnId: string | undefined = subjectsForPerson(person.id, state.assignments)[0];
  const subject = selected ?? (firstOwnId ? subjectById(firstOwnId) : undefined);

  if (!subject) {
    return (
      <Page>
        <PageHead title="Course Studio" />
        <EmptyState
          title="Pick a subject in Courses"
          body="The Studio works on one subject at a time. Choose one of your subjects and it opens here with its draft, its test, and its history."
          action={
            <Button variant="outline" onClick={() => navigate("courses")}>
              Go to Courses <ArrowRight size={15} />
            </Button>
          }
        />
      </Page>
    );
  }

  const band = ratingFor(subject.id)?.band ?? "unrated";
  const coordinator = personWithHat(subject.id, "coordinator");
  const proposal = state.proposals.find(
    (p) => p.subjectId === subject.id && p.status !== "approved" && p.status !== "rejected",
  );
  const lastApproved = [...state.proposals]
    .reverse()
    .find((p) => p.subjectId === subject.id && p.status === "approved");

  const head = (
    <PageHead
      title={`${subject.id} ${subject.title}`}
      context={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Tag tone={BAND_TONE[band]}>{band}</Tag>
          <span>Coordinator: {coordinator?.name ?? "unassigned"}</span>
          {subject.syllabusVerifiedAt ? (
            <Tag tone="ok">verified syllabus</Tag>
          ) : (
            <Tag tone="warn">syllabus unverified, upload the official pdf in Upload</Tag>
          )}
        </span>
      }
    />
  );

  if (!proposal) {
    const mayDraft = can(person, "draft-change", {
      subjectId: subject.id,
      assignments: state.assignments,
    });
    return (
      <Page>
        {head}
        {lastApproved ? (
          <div
            style={{
              fontSize: 13,
              color: "var(--ok)",
              background: "var(--ok-soft)",
              borderRadius: "var(--radius-s)",
              padding: "8px 12px",
              marginBottom: 16,
            }}
          >
            Live. The prediction is recorded.{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("backtest");
              }}
            >
              See the closed loop
            </a>
          </div>
        ) : null}
        <EmptyState
          title="No open proposal on this subject"
          body="A draft holds the topics, outcome edits, and test you want to change, then walks the review chain to the acceptance test."
          action={
            mayDraft ? (
              <Button
                variant="primary"
                data-demo-id="studio-start-draft"
                onClick={() => startDraft(subject.id)}
              >
                Start a draft
              </Button>
            ) : (
              <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                Only this subject's coordinator or lecturer can start one.
              </span>
            )
          }
        />
      </Page>
    );
  }

  return (
    <Page>
      {head}

      {/* Tabs: quiet underlines, no boxes. The proposal status sits beside them. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderBottom: "1px solid var(--border)",
          marginBottom: 20,
        }}
      >
        <TabButton
          id="content"
          label="Content"
          active={tab === "content"}
          onPick={setTab}
          demoId="tab-content"
        />
        <TabButton
          id="assessment"
          label="Assessment"
          active={tab === "assessment"}
          onPick={setTab}
          demoId="tab-assessment"
        />
        <TabButton id="history" label="History" active={tab === "history"} onPick={setTab} />
        <span style={{ flex: 1 }} />
        <Tag tone={STATUS_TONE[proposal.status]} style={{ marginBottom: 6 }}>
          {STATUS_LABEL[proposal.status]}
        </Tag>
      </div>

      {tab === "content" ? (
        <ContentTab state={state} person={person} subject={subject} proposal={proposal} />
      ) : tab === "assessment" ? (
        <AssessmentTab state={state} person={person} subject={subject} proposal={proposal} />
      ) : (
        <HistoryTab state={state} subject={subject} proposal={proposal} />
      )}
    </Page>
  );
}

function TabButton(props: {
  id: TabId;
  label: string;
  active: boolean;
  onPick: (id: TabId) => void;
  demoId?: string;
}) {
  return (
    <button
      data-demo-id={props.demoId}
      onClick={() => props.onPick(props.id)}
      style={{
        background: "none",
        border: "none",
        borderBottom: props.active ? "2px solid var(--accent)" : "2px solid transparent",
        marginBottom: -1,
        padding: "8px 2px 10px",
        fontSize: 14,
        fontWeight: props.active ? 600 : 500,
        color: props.active ? "var(--ink)" : "var(--ink-2)",
        cursor: "pointer",
      }}
    >
      {props.label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Content: the draft, editable in place, with the agent modes, the critique,
// and the one status-driven primary action.
// ---------------------------------------------------------------------------

function ContentTab(props: {
  state: AppState;
  person: Person;
  subject: Subject;
  proposal: ChangeProposal;
}) {
  const { state, person, subject, proposal } = props;
  const [mode, setMode] = useState<"self" | "agent" | "hybrid">("self");
  const [changesOpen, setChangesOpen] = useState(false);
  const [changeNote, setChangeNote] = useState("");

  const hats = hatsOn(person.id, subject.id, state.assignments);
  const coordHere = hats.includes("coordinator");
  const isAuthor = proposal.authorId === person.id;
  const mayReview =
    proposal.status === "coordinator-review" &&
    can(person, "review-draft", { subjectId: subject.id, assignments: state.assignments });

  // The topics textarea is uncontrolled (the store normalises lines, which would
  // eat newlines mid-typing); it remounts whenever the agent rewrites the draft.
  const agentDraftCount = proposal.history.filter((h) => h.action === "agent-drafted").length;
  const topicsKey = `${proposal.id}-topics-${agentDraftCount}`;

  const draft = proposal.draft;

  function pickMode(next: "self" | "agent" | "hybrid") {
    setMode(next);
    if (next === "agent" || next === "hybrid") draftWithAgent(proposal.id, next);
  }

  const modeButton = (id: "self" | "agent" | "hybrid", label: string) => (
    <Button
      variant="outline"
      data-demo-id={`mode-${id}`}
      onClick={() => pickMode(id)}
      style={{
        height: 30,
        padding: "0 12px",
        fontSize: 13,
        ...(mode === id
          ? {
              borderColor: "var(--accent)",
              color: "var(--accent)",
              background: "var(--accent-soft)",
            }
          : {}),
      }}
    >
      {label}
    </Button>
  );

  return (
    <div>
      <AgentStrip
        agent="authoring"
        idleText="Authoring drafts, reviews, and fixes. Pick a mode or ask for a review."
      />

      {mayReview ? (
        <Card focal style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
            A lecturer's draft awaits your review
          </div>
          <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--ink-2)", maxWidth: 560 }}>
            Approve it for testing, or send it back with a note. Nothing reaches the acceptance
            test without your review.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              variant="primary"
              data-demo-id="review-approve"
              onClick={() => reviewApprove(proposal.id)}
            >
              Approve for testing
            </Button>
            <Button
              variant="quiet"
              data-demo-id="review-changes"
              onClick={() => setChangesOpen((v) => !v)}
            >
              Request changes
            </Button>
          </div>
          {changesOpen ? (
            <div style={{ marginTop: 12 }}>
              <Textarea
                value={changeNote}
                onChange={(e) => setChangeNote(e.target.value)}
                placeholder="What should change before this is tested?"
                style={{ minHeight: 64 }}
              />
              <Button
                variant="outline"
                style={{ marginTop: 8 }}
                onClick={() => {
                  reviewRequestChanges(proposal.id, changeNote.trim());
                  setChangesOpen(false);
                  setChangeNote("");
                }}
              >
                Send back to the author
              </Button>
            </div>
          ) : null}
        </Card>
      ) : null}

      <SectionLabel style={{ marginTop: 0 }}>Drafting mode</SectionLabel>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {modeButton("self", "Self")}
        {modeButton("agent", "Agent drafts")}
        {modeButton("hybrid", "Hybrid")}
      </div>

      <Field label="Topics" hint="One topic per line.">
        <Textarea
          key={topicsKey}
          defaultValue={(draft.topics ?? []).join("\n")}
          onChange={(e) => editDraftField(proposal.id, "topics", e.target.value)}
          style={{ minHeight: 104 }}
        />
      </Field>

      <SectionLabel>Outcome changes</SectionLabel>
      {(draft.cloChanges ?? []).length === 0 ? (
        <EmptyState
          title="No outcome changes yet"
          body="Agent or hybrid mode drafts an edit to this subject's outcomes; you can refine every line."
        />
      ) : (
        (draft.cloChanges ?? []).map((c, i) => (
          <div
            key={`${c.cloId ?? "new"}-${i}`}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-s)",
              padding: 12,
              marginBottom: 10,
              background: "var(--surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span className="num" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" }}>
                {c.cloId ?? "new outcome"}
              </span>
              <Tag tone={c.op === "remove" ? "danger" : c.op === "add" ? "ok" : "accent"}>{c.op}</Tag>
              <Tag>{c.bloomLevel}</Tag>
            </div>
            <Textarea
              data-demo-id={i === 0 ? "studio-draft-clo-0" : undefined}
              value={c.text}
              onChange={(e) => editCloChangeText(proposal.id, i, e.target.value)}
              style={{ minHeight: 64 }}
            />
          </div>
        ))
      )}

      <Field label="Test notes">
        <Textarea
          value={draft.testDraft ?? ""}
          onChange={(e) => editDraftField(proposal.id, "testDraft", e.target.value)}
          style={{ minHeight: 72 }}
        />
      </Field>
      <Field label="Lab notes">
        <Textarea
          value={draft.labDraft ?? ""}
          onChange={(e) => editDraftField(proposal.id, "labDraft", e.target.value)}
          style={{ minHeight: 72 }}
        />
      </Field>

      <div style={{ margin: "4px 0 16px" }}>
        <Button variant="quiet" onClick={() => requestAgentReview(proposal.id)}>
          Ask the agent to review
        </Button>
      </div>

      {state.critique ? (
        <div
          style={{
            background: "var(--warn-soft)",
            borderRadius: "var(--radius-s)",
            padding: "10px 12px",
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--warn)" }}>
              The agent's review
            </span>
            <Button
              variant="quiet"
              style={{ height: 24, padding: "0 8px", fontSize: 12 }}
              onClick={() => setCritique(null)}
            >
              Dismiss
            </Button>
          </div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            {state.critique.map((line, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 2 }}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* The one status-driven primary action. */}
      {isAuthor && !coordHere && proposal.status === "drafting" ? (
        <Button
          variant="primary"
          data-demo-id="studio-submit-review"
          onClick={() => submitForReview(proposal.id)}
        >
          Submit for coordinator review
        </Button>
      ) : canRunTest(proposal.id) ? (
        <Button
          variant="primary"
          data-demo-id="studio-run-test"
          onClick={() => startAcceptanceRun(proposal.id)}
        >
          Run the acceptance test
        </Button>
      ) : null}

      {proposal.status === "management-approval" ? (
        <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
          Tested. Awaiting management.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("acceptance");
            }}
          >
            View the acceptance run
          </a>
        </div>
      ) : null}
      {proposal.status === "approved" ? (
        <div style={{ fontSize: 13, color: "var(--ok)" }}>
          Live. The prediction is recorded.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("backtest");
            }}
          >
            See the closed loop
          </a>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Assessment: the blueprint, agent-drafted items, the coverage meter, and the
// same review chain as the proposal (spec 6.4).
// ---------------------------------------------------------------------------

const MIX_LEVELS: BloomLevel[] = ["Understand", "Apply", "Analyse"];

function AssessmentTab(props: {
  state: AppState;
  person: Person;
  subject: Subject;
  proposal: ChangeProposal;
}) {
  const { state, person, subject, proposal } = props;
  const td = testDraftById(proposal.draft.testDraftId);

  if (!td) {
    return (
      <EmptyState
        title="No test draft yet"
        body="Set the blueprint (marks per outcome, Bloom mix), let the agent draft items against it, then review coverage. The approved test rides with this proposal."
        action={
          <Button
            variant="primary"
            data-demo-id="assessment-start"
            onClick={() => createTestDraft(subject.id, proposal.id)}
          >
            Start a test draft
          </Button>
        }
      />
    );
  }

  const weightSum = td.blueprint.cloWeights.reduce((s, w) => s + w.weight, 0);
  const mixSum = Object.values(td.blueprint.bloomMix).reduce<number>((s, v) => s + (v ?? 0), 0);
  const weightsOk = Math.abs(weightSum - 1) <= 0.01;
  const mixOk = mixSum <= 1;
  const hasItems = td.items.length > 0;

  return (
    <div>
      {/* (a) the blueprint, editable */}
      <SectionLabel style={{ marginTop: 0 }}>Blueprint</SectionLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 13, width: 130, color: "var(--ink-2)" }}>Total marks</span>
        <Input
          type="number"
          min={1}
          className="num"
          style={{ width: 90 }}
          value={td.blueprint.totalMarks}
          onChange={(e) =>
            updateBlueprint(td.id, { ...td.blueprint, totalMarks: Number(e.target.value) })
          }
        />
      </div>
      {td.blueprint.cloWeights.map((cw) => {
        const clo = state.clos.find((c) => c.id === cw.cloId);
        return (
          <div
            key={cw.cloId}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
          >
            <span className="num" style={{ fontSize: 13, width: 130, color: "var(--ink-2)" }}>
              {cw.cloId} weight
            </span>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.05}
              className="num"
              style={{ width: 90 }}
              value={cw.weight}
              onChange={(e) =>
                updateBlueprint(td.id, {
                  ...td.blueprint,
                  cloWeights: td.blueprint.cloWeights.map((w) =>
                    w.cloId === cw.cloId ? { ...w, weight: Number(e.target.value) } : w,
                  ),
                })
              }
            />
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{clo?.text ?? cw.cloId}</span>
          </div>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
        <span style={{ fontSize: 13, width: 130, color: "var(--ink-2)" }}>Bloom mix</span>
        {MIX_LEVELS.map((level) => (
          <span key={level} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Input
              type="number"
              min={0}
              max={1}
              step={0.05}
              className="num"
              style={{ width: 74 }}
              value={td.blueprint.bloomMix[level] ?? 0}
              onChange={(e) =>
                updateBlueprint(td.id, {
                  ...td.blueprint,
                  bloomMix: { ...td.blueprint.bloomMix, [level]: Number(e.target.value) },
                })
              }
            />
            <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{level}</span>
          </span>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0 20px" }}>
        <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Blueprint check</span>
        <Tag tone={weightsOk ? "ok" : "danger"}>
          <span className="num">weights {weightSum.toFixed(2)}</span>
        </Tag>
        <Tag tone={mixOk ? "ok" : "danger"}>
          <span className="num">bloom mix {mixSum.toFixed(2)}</span>
        </Tag>
      </div>

      {/* (b) generation + (c) the items */}
      {hasItems ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <SectionLabel style={{ margin: 0 }}>Items</SectionLabel>
          <span style={{ flex: 1 }} />
          <Button
            variant="outline"
            data-demo-id="assessment-generate"
            onClick={() => generateTestItems(td.id)}
          >
            Draft items against the blueprint
          </Button>
        </div>
      ) : (
        <EmptyState
          title="No items yet"
          body="The Authoring agent drafts items to match your weights and Bloom mix; every item stays editable."
          action={
            <Button
              variant="primary"
              data-demo-id="assessment-generate"
              onClick={() => generateTestItems(td.id)}
            >
              Draft items against the blueprint
            </Button>
          }
        />
      )}

      {td.items.map((it, idx) => (
        <Card key={it.id} style={{ marginBottom: 10, boxShadow: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="num" style={{ fontWeight: 600, fontSize: 13 }}>
              Q{idx + 1}
            </span>
            <Tag>{it.bloomLevel}</Tag>
            <span className="num" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
              {it.targetCLO}
            </span>
            {it.source === "human" ? <Tag>edited</Tag> : null}
            <span style={{ flex: 1 }} />
            <Input
              type="number"
              min={1}
              className="num"
              style={{ width: 70 }}
              value={it.marks}
              onChange={(e) => updateTestItem(td.id, it.id, { marks: Number(e.target.value) })}
            />
            <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>marks</span>
            <Button
              variant="quiet"
              style={{ height: 28, padding: "0 8px", fontSize: 12.5 }}
              onClick={() => removeTestItem(td.id, it.id)}
            >
              Remove
            </Button>
          </div>
          <Textarea
            value={it.text}
            onChange={(e) => updateTestItem(td.id, it.id, { text: e.target.value })}
            style={{ minHeight: 56 }}
          />
        </Card>
      ))}

      {/* (d) coverage meter */}
      {hasItems ? <CoverageMeter draft={td} /> : null}

      {/* (e) status action: exactly one primary at a time. */}
      {hasItems ? (
        <div style={{ marginTop: 20 }}>
          <TestStatusAction state={state} person={person} subject={subject} draft={td} />
        </div>
      ) : null}
    </div>
  );
}

function CoverageMeter(props: { draft: TestDraft }) {
  const td = props.draft;
  const totalMarks = td.items.reduce((s, it) => s + it.marks, 0);
  const itemLevels = [...new Set<BloomLevel>([...MIX_LEVELS, ...td.items.map((it) => it.bloomLevel)])];

  const bar = (value: number, color: string) => (
    <div
      style={{
        height: 4,
        background: "var(--surface-2)",
        borderRadius: 2,
        marginTop: 3,
        maxWidth: 360,
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value * 100)).toFixed(1)}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
        }}
      />
    </div>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <SectionLabel style={{ marginTop: 0 }}>Coverage against the blueprint</SectionLabel>
      {td.blueprint.cloWeights.map((cw) => {
        const actual =
          totalMarks > 0
            ? td.items.filter((it) => it.targetCLO === cw.cloId).reduce((s, it) => s + it.marks, 0) /
              totalMarks
            : 0;
        return (
          <div key={cw.cloId} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
              <span className="num" style={{ width: 48, fontWeight: 600 }}>
                {cw.cloId}
              </span>
              <span className="num">
                {(actual * 100).toFixed(0)}% of marks, planned {(cw.weight * 100).toFixed(0)}%
              </span>
            </div>
            {bar(actual, "var(--accent)")}
            {bar(cw.weight, "var(--border)")}
          </div>
        );
      })}
      {itemLevels.map((level) => {
        const share =
          td.items.length > 0
            ? td.items.filter((it) => it.bloomLevel === level).length / td.items.length
            : 0;
        const target = td.blueprint.bloomMix[level] ?? 0;
        return (
          <div key={level} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, fontSize: 12.5, color: "var(--ink-2)" }}>
              <span style={{ width: 90 }}>{level}</span>
              <span className="num">
                {(share * 100).toFixed(0)}% of items, mix {(target * 100).toFixed(0)}%
              </span>
            </div>
            {bar(share, "var(--accent)")}
            {bar(target, "var(--border)")}
          </div>
        );
      })}
    </div>
  );
}

function TestStatusAction(props: {
  state: AppState;
  person: Person;
  subject: Subject;
  draft: TestDraft;
}) {
  const { state, person, subject, draft } = props;

  if (draft.status === "approved") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Tag tone="ok">Approved</Tag>
        <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
          This test rides with the proposal to the acceptance test.
        </span>
      </div>
    );
  }

  if (
    draft.status === "coordinator-review" &&
    can(person, "review-draft", { subjectId: subject.id, assignments: state.assignments })
  ) {
    return (
      <Button variant="primary" onClick={() => approveTestDraft(draft.id)}>
        Approve test
      </Button>
    );
  }

  if (draft.status === "coordinator-review") {
    return (
      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
        Sent for review. Awaiting the coordinator.
      </span>
    );
  }

  // Drafting: the author moves it on. A coordinator's own draft approves
  // directly; a lecturer's goes to the coordinator (both via submitTestDraft).
  if (draft.status === "drafting" && draft.authorId === person.id) {
    const authorIsCoordHere = hatsOn(draft.authorId, subject.id, state.assignments).includes(
      "coordinator",
    );
    return (
      <Button
        variant="primary"
        data-demo-id="assessment-submit"
        onClick={() => submitTestDraft(draft.id)}
      >
        {authorIsCoordHere ? "Approve test" : "Send test for review"}
      </Button>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// History: the proposal's events, newest first, then the subject's versions.
// ---------------------------------------------------------------------------

function HistoryTab(props: { state: AppState; subject: Subject; proposal: ChangeProposal }) {
  const { state, subject, proposal } = props;
  const events = [...proposal.history].reverse();
  const versions = [...state.subjectVersions]
    .filter((v) => v.subjectId === subject.id)
    .reverse();

  return (
    <div>
      <SectionLabel style={{ marginTop: 0 }}>Proposal history</SectionLabel>
      {events.length === 0 ? (
        <EmptyState
          title="Nothing has happened yet"
          body="Every draft, review, test, and decision on this proposal is recorded here."
        />
      ) : (
        events.map((e, i) => (
          <Row key={`${e.at}-${e.action}-${i}`}>
            <span style={{ fontWeight: 600, fontSize: 13, width: 180, flexShrink: 0 }}>
              {ACTION_LABEL[e.action]}
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 13,
                color: "var(--ink-2)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {e.note ?? ""}
            </span>
            <span style={{ fontSize: 12.5, color: "var(--ink-2)", flexShrink: 0 }}>
              {personById(e.byPersonId)?.name ?? e.byPersonId}
            </span>
            <span className="num" style={{ fontSize: 12, color: "var(--ink-3)", flexShrink: 0 }}>
              {fmtWhen(e.at)}
            </span>
          </Row>
        ))
      )}

      <SectionLabel>Subject versions</SectionLabel>
      {versions.length === 0 ? (
        <EmptyState
          title="No versions yet"
          body="Each approved change snapshots the subject here, so every revision stays traceable."
        />
      ) : (
        versions.map((v) => (
          <Row key={v.id}>
            <span className="num" style={{ fontWeight: 600, fontSize: 13, width: 120, flexShrink: 0 }}>
              {v.id}
            </span>
            <span
              style={{
                flex: 1,
                fontSize: 13,
                color: "var(--ink-2)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {v.reason}
            </span>
            <span style={{ fontSize: 12.5, color: "var(--ink-2)", flexShrink: 0 }}>
              {personById(v.changedBy)?.name ?? v.changedBy}
            </span>
            <span className="num" style={{ fontSize: 12, color: "var(--ink-3)", flexShrink: 0 }}>
              {fmtWhen(v.changedAt)}
            </span>
          </Row>
        ))
      )}
    </div>
  );
}
