// Lyceum v3, Layer 0 data model (implementation spec Sections 1 and 4).
//
// This is the contract. Every page and every agent reads and writes only these
// shapes. The v2 contract is carried unchanged (so the audited spine, the seed
// and the proofs port cleanly); the v3 additions (real intake, test creation,
// agent presence, demand truth, verification) are appended in marked sections.
//
// The audited spine (src/lib/spine/*) computes over a small set of computation
// types (Student, Cohort, ItemResult, CLOMastery, CohortResult) that are NOT
// part of the Layer 0 contract; they live in a marked appendix at the bottom so
// the spine imports resolve against one place and the maths stays byte-identical.

// ---------- ids ----------
export type PersonId = string;
export type ProgrammeId = string;
export type SubjectId = string;
export type CLOId = string;
export type ProposalId = string;

export type BloomLevel =
  | "Remember"
  | "Understand"
  | "Apply"
  | "Analyse"
  | "Evaluate"
  | "Create";

// ---------- people, hats, scope ----------
// Org tier is fixed to the person. Subject-level hats are per (person x subject).
export type OrgRole = "management" | "department" | "academic";
export type Hat = "coordinator" | "lecturer";

export interface Person {
  id: PersonId;
  name: string; // e.g. "Dr Sobri"
  orgRole: OrgRole; // management, department owner, or an academic who holds hats
  departmentOf?: ProgrammeId; // set when orgRole === "department": the programme they own
  // v3: verification (supply-side truth). Verified = institutional email domain
  // + presence on the official course page. Unverified people can work, but
  // their edits carry an "unverified" tag and the approval gate shows it.
  email?: string;
  verified?: boolean;
}

export interface RoleAssignment {
  // the model that resolves the lecturer/coordinator overlap
  personId: PersonId;
  subjectId: SubjectId;
  hat: Hat; // a person can appear here twice for one subject (both hats)
}

// ---------- curriculum ----------
export interface Programme {
  id: ProgrammeId;
  title: string; // "Bachelor of Computer Science"
  departmentOwnerId: PersonId;
  subjectIds: SubjectId[];
}

export interface Subject {
  id: SubjectId; // "CS220"
  title: string; // "Applied Machine Learning"
  programmeId: ProgrammeId;
  year: number; // 1..4
  semester: number;
  cloIds: CLOId[];
  prerequisiteSubjectIds: SubjectId[];
  sharedWithProgrammeIds: ProgrammeId[]; // cross-programme ripple
  status: "active" | "proposed"; // proposed = a new subject not yet approved
  currentVersionId: string;
  // v3: supply-side truth. Content ingested from a published document (the
  // official syllabus pdf, the public course page) is verified with its source;
  // self-entered content is labelled unverified until it matches one.
  syllabusSourceUrl?: string;
  syllabusVerifiedAt?: string;
}

export interface CLO {
  id: CLOId;
  subjectId: SubjectId;
  text: string;
  bloomLevel: BloomLevel;
  demandSignal?: number; // 0..1, written by the Signal agent
}

export interface Item {
  // same shape as v1
  id: string;
  text: string;
  targetCLO: CLOId;
  bloomLevel: BloomLevel;
  difficulty: number; // b, from the Bloom ladder
}

// ---------- the data spine (real ground) ----------
export interface SurveyRecord {
  // CLO mastery survey + SSRT, per student per subject per term
  studentId: string;
  subjectId: SubjectId;
  term: string; // "2025-S1"
  cloRatings: Record<CLOId, number>; // 1..10 self-rating
}

export interface ResultUpload {
  // what a lecturer drops in
  id: string;
  subjectId: SubjectId;
  uploadedBy: PersonId;
  term: string;
  rows: Array<{ cloId: CLOId; meanScore: number; sd: number; n: number }>;
  filedAt: string; // ISO
  // v3: which file this came from, for provenance in the Data room.
  sourceFileName?: string;
}

export interface DataSource {
  // for the data room freshness view
  kind: "clo-survey" | "ssrt" | "results" | "syllabus" | "material";
  subjectId: SubjectId;
  term: string;
  recordCount: number;
  ingestedAt: string;
  // v3: verified = ingested from a published document rather than self-entered.
  verified?: boolean;
  sourceFileName?: string;
}

// ---------- change proposals (the flow) ----------
export type ProposalStatus =
  | "drafting" // author working in Course Studio
  | "coordinator-review" // lecturer-drafted, awaiting coordinator
  | "testing" // acceptance test running
  | "management-approval" // tested, awaiting management
  | "approved"
  | "rejected";

export interface ProposalEvent {
  at: string;
  byPersonId: PersonId;
  action:
    | "drafted"
    | "agent-drafted"
    | "agent-reviewed"
    | "submitted-for-review"
    | "review-approved"
    | "review-changes-requested"
    | "tested"
    | "approved"
    | "rejected";
  note?: string;
}

export interface ChangeProposal {
  id: ProposalId;
  subjectId: SubjectId;
  kind: "update" | "new-subject";
  authorId: PersonId;
  draft: {
    topics?: string[];
    cloChanges?: Array<{
      cloId?: CLOId;
      text: string;
      bloomLevel: BloomLevel;
      op: "add" | "edit" | "remove";
    }>;
    testDraft?: string;
    labDraft?: string;
    // v3: a structured test built in the assessment studio rides with the
    // proposal through the same review chain.
    testDraftId?: string;
  };
  status: ProposalStatus;
  acceptanceResult?: VerdictReport; // filled by the Cohort agent
  history: ProposalEvent[];
}

// ---------- verdict (reuse the audited shape) ----------
export interface VerdictReport {
  summary: string;
  projectedMastery: number; // e.g. 0.58
  currentMastery: number; // e.g. 0.60
  cloMastery: Array<{
    cloId: CLOId;
    meanP: number;
    spread: number;
    confidence: number;
  }>;
  failedItems: Array<{ studentId: string; itemId: string; p: number }>;
  drillRoot: {
    studentId: string;
    cloId: CLOId;
    theta: number;
    itemId: string;
    b: number;
    p: number;
    cause: string;
  };
  prerequisiteConflicts: Array<{
    subjectId: SubjectId;
    missingPrereqId: SubjectId;
    edge: [SubjectId, SubjectId];
  }>;
  groundedOnLearners: number; // for the provenance line
  isProxyCohort: boolean; // true when the Analogy agent stood in
}

// ---------- closed loop ----------
export interface Prediction {
  proposalId: ProposalId;
  subjectId: SubjectId;
  predictedMastery: number;
  madeAt: string;
  actualMastery?: number; // filled when the next term's results arrive
  residual?: number; // |predicted - actual|
}

// ---------- connective tissue ----------
export type NotificationKind =
  | "ping-update"
  | "ping-new-subject"
  | "review-request"
  | "test-done"
  | "approved"
  | "rejected";

export interface Notification {
  id: string;
  toPersonId: PersonId;
  kind: NotificationKind;
  subjectId?: SubjectId;
  proposalId?: ProposalId;
  agentFindings?: string; // the context that prompted the ping
  read: boolean;
  createdAt: string;
}

export interface SubjectVersion {
  id: string;
  subjectId: SubjectId;
  snapshot: Pick<Subject, "title" | "cloIds" | "prerequisiteSubjectIds">;
  cloSnapshot: CLO[];
  changedBy: PersonId;
  changedAt: string;
  reason: string;
}

// ============================================================================
// v3 additions, Section A: real intake (files in, interpreted, confirmed)
// ============================================================================

export type UploadedFileKind = "xlsx" | "csv" | "pdf" | "pptx" | "docx";

/** What /api/parse returns for any dropped file, agent-agnostic. */
export interface ParsedDoc {
  fileName: string;
  kind: UploadedFileKind;
  pages: Array<{ index: number; text: string }>; // slides = pages
  tables: Array<{ name: string; rows: string[][] }>; // sheets and detected tables
}

/** What the Intake agent makes of a ParsedDoc. The user always confirms this
 *  before anything files; the preview-and-confirm step is the trust boundary. */
export interface IntakeInterpretation {
  docType: "results" | "clo-survey" | "syllabus" | "slides" | "unknown";
  subjectGuess?: SubjectId;
  termGuess?: string;
  mappedRows?: ResultUpload["rows"]; // when docType === "results"
  surveyRecords?: SurveyRecord[]; // when docType === "clo-survey"
  contentSummary?: string; // syllabus/slides: filed as subject material
  confidence: number; // 0..1, shown to the user
  notes: string[]; // "column 'Avg' read as meanScore", etc.
}

// ============================================================================
// v3 additions, Section B: test creation (the assessment studio)
// ============================================================================

/** The coordinator's contract for a test. */
export interface AssessmentBlueprint {
  subjectId: SubjectId;
  totalMarks: number;
  cloWeights: Array<{ cloId: CLOId; weight: number }>; // must sum to 1
  bloomMix: Partial<Record<BloomLevel, number>>; // proportions, sum <= 1
}

export type TestItem = Item & {
  marks: number;
  modelAnswer?: string;
  source: "agent" | "human";
};

export interface TestDraft {
  id: string;
  subjectId: SubjectId;
  proposalId?: ProposalId; // when part of a change proposal
  blueprint: AssessmentBlueprint;
  items: TestItem[];
  status: "drafting" | "coordinator-review" | "approved";
  authorId: PersonId;
}

// ============================================================================
// v3 additions, Section C: agent presence (one live invocation, drives all UI)
// ============================================================================

export type AgentName =
  | "intake"
  | "signal"
  | "curriculum"
  | "authoring"
  | "cohort"
  | "analogy"
  | "evaluator";

export interface AgentRun {
  id: string;
  agent: AgentName;
  status: "queued" | "thinking" | "streaming" | "done" | "failed" | "fallback";
  startedAt: string;
  label: string; // one quiet line for the agent strip
  streamText?: string; // grows while streaming
  resultRef?: string; // id of whatever it produced
  onPage: string; // the screen it belongs to
}

// ============================================================================
// v3 additions, Section D: demand truth (multi-source) + the Relevance Index
// ============================================================================

export interface MarketSource {
  id: string; // "jobstreet" | "linkedin" | "glassdoor" | "mohe-col"
  name: string;
  kind: "job-platform" | "gov-labour" | "industry-report";
  snapshotDate: string; // shown in the UI: "prepared snapshot, <date>"
  recordCount: number;
}

/** One source's view of one skill. */
export interface DemandEvidence {
  sourceId: string;
  skill: string;
  demandScore: number; // 0..1 normalised within the source
  delta12m: number; // change vs 12 months ago
}

export type RelevanceBand = "aligned" | "drifting" | "misaligned" | "unrated";

/** The advisory's core output, per subject. Rendered on the public Relevance
 *  Index, on Trends, on Courses, and in the Studio header. */
export interface RelevanceRating {
  subjectId: SubjectId;
  score: number; // 0..1
  band: RelevanceBand;
  perCLO: Array<{ cloId: CLOId; score: number; movedBy: string[] }>;
  evidence: DemandEvidence[]; // the receipts, grouped by source in the UI
  agreement: number; // 0..1 cross-source agreement; < 0.5 renders "sources disagree"
  ratedAt: string;
}

// ============================================================================
// Layer 1, spine computation types (NOT part of the Layer 0 contract).
//
// These are the shapes the audited spine (src/lib/spine/*) computes over. The
// spine files import them from here so the maths copies across byte-identical.
// ============================================================================

export interface Student {
  id: string;
  cohortId: string;
  ratings: Record<CLOId, number>; // raw 1..10 self-rating, kept for provenance
  ability: Record<CLOId, number>; // theta per CLO, on the logistic scale
}

export interface Cohort {
  id: string;
  intake: string; // e.g. "2023-S1". Labels the batch. Never blend batches.
  programmeId: string;
  students: Student[];
}

export interface ItemResult {
  studentId: string;
  itemId: string;
  p: number; // P(correct) from the link
  outcome: 0 | 1; // seeded Bernoulli draw, gives concrete pass/fail
}

export interface CLOMastery {
  cloId: CLOId;
  meanP: number; // cohort mean P on this CLO
  spread: number; // SD across the cohort
  confidence: number; // 0..1, from how much grounding data backs this CLO
}

export interface CohortResult {
  cohortId: string;
  itemResults: ItemResult[]; // full provenance: every student x every item
  cloMastery: CLOMastery[];
}
