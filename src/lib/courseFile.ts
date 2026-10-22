// The course file in one click (depth plan Section 4.4): the course record as a zip, in the order EAC lists a course
// file (Engineering Programme Accreditation Standard 2020, item viii, in docs/research/course-records-and-surveys-
// 2026-10-22.md), with a manifest that marks each item present, sample, not yet built (naming the package that builds
// it) or not included, so the file shows its own gaps. Course-file shape, not accreditation: nothing here claims the
// course is accredited or accreditable. jszip is loaded on demand, like pptxgenjs, so the main bundle stays small.

import type { BriefDecision, CourseDefinition, EvidenceBrief, InstitutionProfile, Person, ProgrammeOutcome, Rubric, Subject, SubjectVersion } from "../types.ts";
import { assessmentOf, capitalise, learningTime, listText, tableOfSpecifications, topicHours } from "./curriculum.ts";

export type ManifestStatus = "present" | "sample" | "not yet built" | "not included";
export interface ManifestEntry { item: string; status: ManifestStatus; detail: string; files: string[] }
export interface CourseFilePack { fileName: string; week: number; bytes: Uint8Array }
export interface CourseFileInput {
  subject: Subject; definition: CourseDefinition; versionId: string; rubrics: Rubric[]; plos: ProgrammeOutcome[];
  versions: SubjectVersion[]; decisions: BriefDecision[]; briefs: EvidenceBrief[]; people: Person[];
  packs: CourseFilePack[]; institution: InstitutionProfile; mark: Uint8Array | null; demoLine: string | null; generatedAt: string;
}

export const MARK_FILE = "institution-mark.png";
const pipe = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const row = (cells: Array<string | number>) => "| " + cells.map((c) => pipe(String(c))).join(" | ") + " |";
const table = (header: string[], rows: Array<Array<string | number>>) => [row(header), "|" + header.map(() => ":--").join("|") + "|", ...rows.map(row)].join("\n");
const personName = (people: Person[], id: string) => people.find((p) => p.id === id)?.name ?? id;
const rubricFile = (r: Rubric) => "rubrics/" + r.id + ".md";
const count = (n: number, noun: string) => n + " " + noun + (n === 1 ? "" : "s");

/** The files the zip holds, by path. */
function files(input: CourseFileInput): Map<string, string | Uint8Array> {
  const out = new Map<string, string | Uint8Array>();
  out.set("course-information.md", courseInformationMarkdown(input));
  const exams = (input.definition.assessment ?? []).filter((a) => a.kind === "exam");
  if (exams.length) out.set("final-examination-outline.md", examMarkdown(input));
  for (const r of input.rubrics) out.set(rubricFile(r), rubricMarkdown(input, r));
  out.set("decisions-and-versions.md", decisionsMarkdown(input));
  for (const p of input.packs) out.set("packs/" + p.fileName, p.bytes);
  if (input.mark && input.institution.showMark) out.set(MARK_FILE, input.mark);
  return out;
}

/** The manifest in EAC's course-file order, then what Lyceum adds. Each status says what is in the zip today. */
export function courseFileManifest(input: CourseFileInput): ManifestEntry[] {
  const d = input.definition, sample = Boolean(d.sample);
  const have = (ok: boolean): ManifestStatus => (ok ? (sample ? "sample" : "present") : "not included");
  const linked = d.outcomes.some((o) => (o.ploLinks ?? []).length || o.ploIds.length);
  const exams = (d.assessment ?? []).filter((a) => a.kind === "exam");
  const info = ["course-information.md"];
  return [
    { item: "Course learning outcomes", status: have(d.outcomes.length > 0), files: info, detail: d.outcomes.length + " outcomes, each with its Bloom level" + (d.outcomes.some((o) => o.mqfCluster) ? ", MQF cluster" : "") + " and the assessment that evidences it" },
    { item: "The matrix linking course outcomes to programme outcomes", status: have(linked), files: linked ? info : [], detail: linked ? "A level, H, M or L, in every linked cell; the levels are strengths, not scores" : "No programme outcome mapping is recorded for this course" },
    { item: "Course synopsis and syllabus", status: have(Boolean(d.synopsis) || d.topics.length > 0), files: info, detail: [d.synopsis ? "the synopsis" : "", d.topics.length ? "a " + d.topics.length + "-topic schedule" : "", d.slt ? "student learning time" : "", d.assessment?.length ? "the assessment plan and its table of specifications" : ""].filter(Boolean).join(", ") || "Not recorded" },
    { item: "List of references", status: have((d.references ?? []).length > 0), files: (d.references ?? []).length ? info : [], detail: count((d.references ?? []).length, "reference") + (d.referencesGap ? "; " + d.referencesGap.charAt(0).toLowerCase() + d.referencesGap.slice(1) : "") },
    { item: "Examination papers with marking schemes: the final examination's outline", status: have(exams.length > 0), files: exams.length ? ["final-examination-outline.md"] : [], detail: exams.length ? "Its sections, marks by outcome and Bloom level, and the marking scheme" : "No examination is recorded" },
    { item: "Examination papers with marking schemes: the week 7 quiz", status: "not yet built", files: [], detail: "Drafted items with the surface lint and a Moodle export come with D7" },
    { item: "Graded examination papers at low, medium and high grades", status: "not included", files: [], detail: "Synthetic student work would be one step too far from honest" },
    { item: "Projects: the project brief", status: "not yet built", files: [], detail: "The week 8 brief comes with the teaching material (D2)" },
    { item: "Tutorial questions and assignments: the lab sheets", status: "not yet built", files: [], detail: "Lab sheets for weeks 1, 6 and 7 come with the teaching material (D2); each lab's task is in the schedule" },
    { item: "Copies of the course notes: the teaching packs", status: input.packs.length ? "present" : "not yet built", files: input.packs.map((p) => "packs/" + p.fileName),
      detail: input.packs.length ? count(input.packs.length, "editable teaching pack") + " generated from the saved sessions" : "No session is saved yet; the sample weeks' slides come with the teaching material (D2)" },
    { item: "Samples of projects at low, medium and high grades", status: "not included", files: [], detail: "Synthetic student work would be one step too far from honest" },
    { item: "Assessment rubrics", status: have(input.rubrics.length > 0), files: input.rubrics.map(rubricFile), detail: input.rubrics.length ? count(input.rubrics.length, "rubric") + " with marks per criterion and the outcomes each evidences; the spreadsheet export comes with D7" : "No rubric is recorded" },
    { item: "The OBE course report with its CQI note", status: "not yet built", files: [], detail: "Attainment against the stated threshold comes with D4" },
    { item: "Decisions and versions", status: "present", files: ["decisions-and-versions.md"], detail: count(input.versions.length, "version") + " and " + count(input.decisions.length, "decision") + " on record" },
    { item: "The external examiner's report", status: "not included", files: [], detail: "No external examiner has reviewed this course" },
  ];
}

export function manifestMarkdown(input: CourseFileInput, manifest = courseFileManifest(input)): string {
  return ["# Course file manifest: " + input.subject.id + " " + input.definition.title, "",
    "Generated by Lyceum on " + input.generatedAt + " from version " + input.versionId + ". The items follow the order EAC lists a course file (Engineering Programme Accreditation Standard 2020, item viii); the demo's frame is MQA's. This is the shape of a course file, not an accreditation. No accreditation is claimed.", "",
    "Status: present; sample (written for this prototype and synthetic); not yet built (the package that builds it); not included (and why).", "",
    table(["#", "Item", "Status", "Files", "Detail"], manifest.map((m, i) => [i + 1, m.item, m.status, m.files.join(", ") || "none", m.detail])),
    ...(input.demoLine ? ["", input.demoLine] : []), ""].join("\n");
}

export function courseInformationMarkdown(input: CourseFileInput): string {
  const { subject, definition: d, institution } = input;
  const label = (id: string) => d.outcomes.find((o) => o.id === id)?.label ?? id;
  const time = learningTime(d);
  const lines: string[] = ["# " + subject.id + " " + d.title + ": course information", ""];
  if (input.mark && institution.showMark) lines.push("![" + institution.mark.alt + "](" + MARK_FILE + ")", "");
  lines.push(institution.name + " · " + (d.brief.programmeTitle || "Programme not recorded") + " · version " + input.versionId + " · generated " + input.generatedAt, "");
  if (input.demoLine) lines.push("> " + input.demoLine, "");
  if (d.source) lines.push(d.source, "");
  lines.push("## 1. Course information", "", table(["Field", "Value"], [
    ["Credits", d.brief.credits ?? "Not recorded"], ["Teaching weeks", d.brief.teachingWeeks ?? "Not recorded"], ["Level", d.brief.level || "Not recorded"],
    ["Language", d.brief.language || "Not recorded"], ["Contact-hour budget", d.brief.contactHours ?? "Not recorded"], ["Self-study budget", d.brief.selfStudyHours ?? "Not recorded"],
    ["Teaching and learning methods", capitalise(listText(d.methods ?? [])) || "Not recorded"], ["Framework", d.brief.framework || "Not recorded"], ["Roles", d.brief.targetRoles || "Not recorded"],
  ]), "");
  lines.push("## 2. Synopsis", "", d.synopsis || "No synopsis recorded.", "");
  lines.push("## 3. Course learning outcomes", "", table(["Label", "Outcome", "Bloom", "MQF cluster", "Assessed by"],
    d.outcomes.map((o) => [o.label, o.text, o.bloomLevel, o.mqfCluster ?? "Not recorded", assessmentOf(d, o.id).map((a) => a.title + " (" + a.marks + ")").join("; ") || o.assessmentEvidence || "Not recorded"])), "");
  const plos = input.plos.filter((p) => d.outcomes.some((o) => o.ploIds.includes(p.id)));
  lines.push("## 4. The CLO to PLO matrix", "");
  if (plos.length) {
    lines.push(table(["Outcome", ...plos.map((p) => p.id)], d.outcomes.map((o) => [o.label, ...plos.map((p) => o.ploLinks?.find((l) => l.ploId === p.id)?.level ?? (o.ploIds.includes(p.id) ? "linked, no level" : ""))])), "",
      "H, M and L are the strength of each link, not scores; no PLO index is computed from them.", "", "Programme outcomes" + (d.sample ? " (demo outcomes, synthetic)" : "") + ":", "",
      ...plos.map((p) => "- " + p.id + " (" + p.cluster + "): " + p.text), "");
  } else lines.push("No programme outcome mapping is recorded.", "");
  lines.push("## 5. Student learning time", "");
  if (time) lines.push(table(["Part", "Hours"], [["Lecture", time.lecture], ["Lab", time.lab], ...(time.unsplit ? [["Contact, not split", time.unsplit]] : []), ["Self-study", time.selfStudy], ["Assessment work", time.assessment], ["Final examination", time.exam], ["Total", time.total]]), "",
    time.capacity !== null ? time.total + " of the " + time.capacity + " hours that " + d.brief.credits + " credits carry at 40 hours a credit" + (time.unallocated ? "; " + time.unallocated + " unallocated." : ".") : "Credits not recorded.", "");
  else lines.push("Not recorded.", "");
  lines.push("## 6. Assessment plan", "");
  if (d.assessment?.length) {
    const exam = d.assessment.filter((a) => a.kind === "exam").reduce((n, a) => n + a.weight, 0);
    lines.push(table(["Component", "Weight", "When", "Individual", "Assesses (marks)"], d.assessment.map((a) => [a.title, a.weight + "%", a.week, a.individual ? "Yes" : "Team", a.allocation.map((x) => label(x.cloId) + " " + x.bloomLevel + " " + x.marks).join("; ")])), "",
      "Continuous assessment " + (100 - exam) + "%, final examination " + exam + "%.", "", "### Table of specifications", "",
      table(["Outcome", "Bloom level", "Marks", "From"], tableOfSpecifications(d).map((r) => [label(r.cloId), r.bloomLevel, r.marks, r.components.join("; ")])), "",
      ...d.assessment.flatMap((a) => ["### " + a.title, "", a.description, ""]));
  } else lines.push("Not recorded.", "");
  lines.push("## 7. Schedule", "", table(["Week", "Kind", "Topic", "Hours", "Self-study", "Outcomes"], d.topics.map((t) => [t.week ?? "Not set", t.kind ?? "", t.title, topicHours(t), t.selfStudyHours, t.cloIds.map(label).join(", ")])), "");
  for (const t of d.topics.filter((x) => x.activities || x.readings || x.misconceptions?.length))
    lines.push("### Week " + (t.week ?? "not set") + ": " + t.title, "", ...(t.activities ? [t.activities, ""] : []), ...(t.readings ? ["Reading: " + t.readings, ""] : []),
      ...(t.misconceptions?.length ? ["Misconceptions to address:", "", ...t.misconceptions.map((m) => "- " + m), ""] : []));
  lines.push("## 8. References", "", ...((d.references ?? []).length ? d.references!.map((r) => "- " + r.citation) : ["None recorded."]), "", ...(d.referencesGap ? [d.referencesGap, ""] : []));
  lines.push("## 9. What this file is", "", "The record as it stood in version " + input.versionId + ", in the shape of a course file. MANIFEST.md lists what is present, what is sample, what is not yet built and what is not included. No accreditation is claimed.", "");
  return lines.join("\n");
}

function examMarkdown(input: CourseFileInput): string {
  const d = input.definition;
  const label = (id: string) => d.outcomes.find((o) => o.id === id)?.label ?? id;
  return ["# " + input.subject.id + ": the final examination's outline and marking scheme", "", ...(input.demoLine ? ["> " + input.demoLine, ""] : []),
    ...(d.assessment ?? []).filter((a) => a.kind === "exam").flatMap((a) => ["## " + a.title + " (" + a.weight + "%)", "", a.description, "",
      table(["Outcome", "Bloom level", "Marks"], a.allocation.map((x) => [label(x.cloId), x.bloomLevel, x.marks])), ""])].join("\n");
}

function rubricMarkdown(input: CourseFileInput, r: Rubric): string {
  const d = input.definition, component = d.assessment?.find((a) => a.id === r.componentId);
  const label = (id: string) => d.outcomes.find((o) => o.id === id)?.label ?? id;
  return ["# " + r.title, "", ...(input.demoLine ? ["> " + input.demoLine, ""] : []),
    "For " + (component ? component.title + " (" + component.weight + "%)" : r.componentId) + ". Four levels in the grid shape of the AAC&U VALUE rubrics, with descriptors written for this course; the VALUE text itself is not reproduced.", "",
    table(["Criterion", "Marks", "Outcomes", "Capstone", "Milestone 2", "Milestone 1", "Benchmark"], r.criteria.map((c) => [c.name, c.marks, c.cloIds.map(label).join(", "), ...c.levels])),
    "", "Marks: " + r.criteria.reduce((n, c) => n + c.marks, 0) + ".", ""].join("\n");
}

function decisionsMarkdown(input: CourseFileInput): string {
  const lines = ["# " + input.subject.id + ": decisions and versions", "", "A local version keeps the outline, the reason and the term; it does not attest university approval.", "", "## Versions", ""];
  lines.push(input.versions.length ? table(["Version", "Saved", "By", "Term", "Reason"], input.versions.map((v) => [v.id + (v.id === input.versionId ? " (current)" : ""), v.changedAt.slice(0, 10), personName(input.people, v.changedBy), v.effectiveTerm || "Not recorded", v.reason])) : "No version recorded.", "", "## Decisions", "");
  lines.push(input.decisions.length ? table(["Recorded", "By", "Decision", "Reason", "On the brief of", "Course version"], input.decisions.map((x) => [x.at.slice(0, 16).replace("T", " "), personName(input.people, x.byPersonId), x.outcome, x.note,
    input.briefs.find((b) => b.id === x.briefId)?.createdAt.slice(0, 10) ?? "an earlier date", x.courseVersionId])) : "No decision recorded.", "");
  return lines.join("\n");
}

/** The zip: MANIFEST.md first, then the record's files. */
export async function buildCourseFile(input: CourseFileInput): Promise<{ bytes: Uint8Array; manifest: ManifestEntry[]; paths: string[] }> {
  const mod = (await import("jszip")) as unknown as { default?: JSZipCtor } & JSZipCtor;
  const JSZip = (mod.default ?? mod) as JSZipCtor;
  const zip = new JSZip();
  const manifest = courseFileManifest(input);
  const all = new Map<string, string | Uint8Array>([["MANIFEST.md", manifestMarkdown(input, manifest)], ...files(input)]);
  // A fixed date on every entry, so the same record always makes the same zip.
  const date = new Date(Date.parse(input.generatedAt) || 0);
  for (const [path, content] of all) zip.file(path, content, { date });
  const bytes = await zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
  return { bytes, manifest, paths: [...all.keys()] };
}
interface JSZipInstance { file: (path: string, content: string | Uint8Array, options?: { date?: Date }) => void; generateAsync: (options: { type: "uint8array"; compression?: string }) => Promise<Uint8Array> }
type JSZipCtor = new () => JSZipInstance;
