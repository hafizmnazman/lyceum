// Proof of the two student surveys (depth plan Sections 7 and 12): the instruments built from the record and the profile,
// the link that carries the form (under 2,000 characters), the collector's token against the server's own hash, the floor
// and the release rule, the booth's rules through the store (one response per device, never course evidence), the Microsoft
// Forms importer on its fixture, backups that carry the surveys, and the sample's counts.
//   node --test src/prove-surveys.ts

import assert from "node:assert/strict";
import { test } from "node:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";
import { recapFor } from "./app/recap.ts";
import { collectBoothResponses, createCourseSurveys, exportWorkspaceBackup, getState, login, openSurveyForCollection, recordGradesReleased, resetDemoState,
  saveTeachingPlanDetails } from "./app/store.ts";
import { DEMO_INSTITUTION } from "./data/institution.ts";
import { DEMO_LINE } from "./data/sample-course/index.ts";
import { CS310_BEFORE } from "./data/sample-course/cs310.ts";
import { PRIOR_COS, PRIOR_SSRT, PRIOR_SURVEY_RESPONSES } from "./data/sample-course/surveys.ts";
import { PEOPLE, PEOPLE_IDS } from "./data/seed.ts";
import { decodeForm, encodeForm, formTokenFor, gradesReleased, importFormsRows, newReaderSecret, respondents, studentForm, surveyFloor, surveyLink, surveyReleased,
  surveySummary } from "./lib/surveys.ts";
import { parseWorkspaceBackup } from "./lib/workspaceBackup.ts";
import type { SurveyResponse } from "./types.ts";

const CS310 = { id: "CS310", title: "Data Visualisation" };
const TERM = "2026/2027 semester 1";
const serverToken = (reader: string) => createHash("sha256").update(reader).digest("base64url").slice(0, 22); // server/index.ts tokenOf

test("the two instruments: one item per outcome in its words, the SSRT's twelve over five dimensions, ids at the start of every question", () => {
  assert.deepEqual(PRIOR_COS.questions.map((q) => [q.id, q.kind, q.cloId ?? null]).slice(0, 2), [["Q1", "scale", "CS310-1"], ["Q2", "scale", "CS310-2"]]);
  const label = (cloId?: string) => CS310_BEFORE.outcomes.find((o) => o.id === cloId)!.label;
  assert.equal(PRIOR_COS.questions.filter((q) => q.kind === "scale").length, 5, "five outcomes, five items");
  assert.ok(PRIOR_COS.questions.filter((q) => q.kind === "scale").every((q) => q.text.startsWith(q.id + ". I can ") && q.text.endsWith("(" + label(q.cloId) + ").")), "in the outcome's words, with its label");
  assert.equal(PRIOR_COS.questions.at(-1)!.kind, "comment");
  const ssrt = PRIOR_SSRT.questions;
  assert.equal(ssrt.filter((q) => q.kind === "scale").length, 12);
  assert.deepEqual([...new Set(ssrt.filter((q) => q.dimension).map((q) => q.dimension))], ["learning", "organisation", "breadth", "assessment", "workload"]);
  assert.equal(ssrt.filter((q) => q.kind === "comment").length, 2);
  assert.match(PRIOR_SSRT.instrumentNote!, /demo instrument .* unvalidated: not SEEQ and not UTP's instrument/);
  for (const def of [PRIOR_COS, PRIOR_SSRT]) {
    assert.ok(def.questions.every((q) => q.text.startsWith(q.id + ".")), "every question carries its id at the start of its text");
    assert.equal(new Set(def.questions.map((q) => q.id)).size, def.questions.length);
    assert.deepEqual([def.scale.min, def.scale.max, def.scale.target], [1, 5, 4], "the profile's scale and target");
  }
});

test("the link carries the form and nothing else, stays under 2,000 characters, and a damaged one opens nothing", () => {
  const secret = newReaderSecret();
  for (const def of [PRIOR_COS, PRIOR_SSRT]) {
    const form = studentForm({ ...def, formToken: serverToken(secret), readerSecret: secret }, CS310, DEMO_INSTITUTION, DEMO_LINE);
    const link = surveyLink("http://192.168.137.120:5173", form);
    assert.ok(link.length < 2000, def.kind + " link is " + link.length + " characters");
    assert.deepEqual(decodeForm(link.split("#/survey/")[1]), form, "the form comes back whole");
    assert.ok(!link.includes(secret) && !JSON.stringify(form).includes(secret), "the reader secret never travels in the link");
    assert.equal(form.mark, DEMO_INSTITUTION.mark.pngSmall, "the demo course's form shows the mark, with the demo line");
    assert.equal(form.demo, DEMO_LINE);
  }
  const plain = studentForm({ ...PRIOR_COS, formToken: serverToken(secret) }, CS310, DEMO_INSTITUTION, null);
  assert.deepEqual([plain.mark, plain.demo], [null, null], "a lecturer's own course shows neither");
  assert.equal(decodeForm("not-a-form"), null);
  assert.equal(decodeForm(encodeForm({ ...plain, f: "short" })), null, "a form without a well-formed token opens nothing");
  assert.equal(decodeForm(encodeForm({ ...plain, q: [["name", "Your name?", "comment"]] })), null, "nor one whose questions are not the survey's ids");
});

test("the submission token is the reader secret's hash as the collector computes it, and cannot read", async () => {
  const secret = newReaderSecret(), token = await formTokenFor(secret);
  assert.equal(token, serverToken(secret), "the browser and the collector agree");
  assert.match(token, /^[A-Za-z0-9_-]{22}$/);
  assert.notEqual(serverToken(token), token, "the token is not a reader of itself");
  assert.notEqual(await formTokenFor(newReaderSecret()), token);
});

test("the floor is a count and a share, the stricter applied; nothing but the count shows below it or before grades are released", () => {
  assert.deepEqual([surveyFloor(DEMO_INSTITUTION, 38).required, surveyFloor(DEMO_INSTITUTION, 12).required, surveyFloor(DEMO_INSTITUTION, null).required], [10, 5, 5]);
  const few = PRIOR_SURVEY_RESPONSES.filter((r) => r.formId === PRIOR_COS.id).slice(0, 9);
  const closed = surveySummary(PRIOR_COS, few, DEMO_INSTITUTION, true);
  assert.deepEqual([closed.respondents, closed.floorMet, closed.open, closed.items.length, closed.comments.length], [9, false, false, 0, 0], "below the floor: the count only");
  const unreleased = surveySummary(PRIOR_COS, PRIOR_SURVEY_RESPONSES, DEMO_INSTITUTION, false);
  assert.deepEqual([unreleased.respondents, unreleased.floorMet, unreleased.open, unreleased.items.length, unreleased.comments.length], [31, true, false, 0, 0], "before the release: the count only, comments included");
  const open = surveySummary(PRIOR_COS, PRIOR_SURVEY_RESPONSES, DEMO_INSTITUTION, true);
  assert.equal(open.rate, "31 of 38, 82%");
  const q5 = open.items.find((it) => it.id === "Q5")!;
  const raw = PRIOR_SURVEY_RESPONSES.filter((r) => r.formId === PRIOR_COS.id).map((r) => r.answers.Q5);
  assert.deepEqual([q5.n, q5.cannotSay, q5.atTarget], [raw.filter((v) => typeof v === "number").length, raw.filter((v) => v === "cannot-say").length, raw.filter((v) => typeof v === "number" && v >= 4).length],
    "n excludes cannot say, which is counted beside it");
  const device = (id: string, clientId: string): SurveyResponse => ({ id, formId: "F", term: TERM, answers: {}, collectedAt: "", clientId, source: "booth" });
  assert.equal(respondents([device("a", "dev-00000001"), device("b", "dev-00000001"), device("c", "dev-00000002")]), 2, "a device counts once");
});

test("through the store: surveys need a term, a device answers once, booth responses never count, and only the coordinator releases grades", async () => {
  resetDemoState(); login(PEOPLE_IDS.sobri);
  assert.equal(createCourseSurveys("CS310").ok, false, "no term, no survey");
  assert.equal(saveTeachingPlanDetails("CS310", { term: TERM, notes: "" }).ok, true);
  assert.equal(createCourseSurveys("CS310").ok, true);
  assert.equal(createCourseSurveys("CS310").ok, false, "once per course and term");
  const cos = getState().surveys.find((x) => x.subjectId === "CS310" && x.kind === "course-outcome" && x.term === TERM)!;
  assert.equal(cos.questions.filter((q) => q.kind === "scale").length, 5, "built from the course record's five outcomes");
  assert.equal((await openSurveyForCollection(cos.id, 38)).ok, true);
  const opened = getState().surveys.find((x) => x.id === cos.id)!;
  assert.equal(opened.formToken, serverToken(opened.readerSecret!));
  assert.ok(getState().events.some((e) => e.kind === "survey-opened" && e.refs.formId === cos.id));
  const collector = { responses: [
    { clientId: "device-0000000a", answers: { Q1: 4, Q2: 5, Q6: "Clear." } },
    { clientId: "device-0000000b", answers: { Q1: 3, Q5: "cannot-say" } },
    { clientId: "device-0000000a", answers: { Q1: 1 } },
    { clientId: "device-0000000c", answers: { Q1: 9 } },
    { clientId: "device-0000000d", answers: { name: "Aisyah" } },
  ] };
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string) => {
    assert.ok(String(url).includes("/api/survey/" + opened.formToken + "/responses?reader="), "the reader secret reads, through the token's path");
    return new Response(JSON.stringify(collector), { status: 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  try {
    const first = await collectBoothResponses(cos.id);
    assert.deepEqual([first.ok, first.ok && first.added], [true, 2], "two devices; a repeated device, an answer off the scale and an unknown question are refused");
    const again = await collectBoothResponses(cos.id);
    assert.deepEqual([again.ok, again.ok && again.added], [true, 0], "collecting again adds nothing");
  } finally {
    globalThis.fetch = realFetch;
  }
  const booth = getState().surveyResponses.filter((r) => r.formId === cos.id);
  assert.deepEqual(booth.map((r) => [r.source, r.clientId]), [["booth", "device-0000000a"], ["booth", "device-0000000b"]]);
  assert.ok(booth.every((r) => Object.keys(r.answers).every((k) => cos.questions.some((q) => q.id === k))), "nothing kept but answers to the questions");
  login(PEOPLE_IDS.tan);
  assert.equal(recordGradesReleased("CS310", TERM).ok, false, "a lecturer does not release grades");
  login(PEOPLE_IDS.sobri);
  assert.equal(recordGradesReleased("CS310", TERM).ok, true);
  assert.ok(gradesReleased(getState().events, "CS310", TERM));
  assert.equal(surveyReleased(cos, getState().events), true);
  const recap = recapFor(getState(), "CS310", "2026-10-22T10:00:00Z")!;
  assert.deepEqual([recap.survey?.respondents, recap.survey?.booth, recap.survey?.open], [0, 2, false], "the recap counts no booth response, and says how many it left out");
});

test("the Microsoft Forms importer on its fixture: 31 responses, the repeated row and the identity columns dropped, answers matched on the ids", () => {
  const book = XLSX.read(readFileSync(new URL("../public/demo/course-outcome-survey-forms.xlsx", import.meta.url)), { type: "buffer" });
  const rows = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]], { header: 1, raw: true, defval: null }) as unknown[][];
  let n = 0;
  const result = importFormsRows(rows, PRIOR_COS, "2026-10-22T10:00:00Z", () => "IMP-" + ++n);
  assert.deepEqual([result.rows, result.responses.length, result.duplicates, result.skippedAnswers, result.unmatched], [32, 31, 1, 0, []]);
  assert.deepEqual(result.dropped, ["ID", "Start time", "Completion time", "Email", "Name"]);
  const sample = PRIOR_SURVEY_RESPONSES.filter((r) => r.formId === PRIOR_COS.id);
  assert.deepEqual(result.responses.map((r) => r.answers), sample.map((r) => r.answers), "every answer as the sample holds it");
  assert.ok(result.responses.every((r) => r.source === "imported" && r.clientId === null));
  const reworded = rows.map((row, i) => (i === 0 ? row.map((h) => (typeof h === "string" ? h.replace(/I can /, "I am able to ") : h)) : row));
  assert.equal(importFormsRows(reworded, PRIOR_COS, "x", () => "R").responses.length, 31, "a reworded question still matches on its id");
});

test("backups carry the surveys, and refuse a response whose answer fits no question", () => {
  resetDemoState(); login(PEOPLE_IDS.sobri);
  const raw = exportWorkspaceBackup();
  const people = PEOPLE.map((p) => p.id);
  const parsed = parseWorkspaceBackup(raw, people);
  assert.ok(parsed.ok);
  assert.deepEqual(parsed.ok && [parsed.backup.data.surveys.length, parsed.backup.data.surveyResponses.length], [2, 60]);
  const broken = JSON.parse(raw);
  broken.data.surveyResponses[0].answers.Q1 = 9;
  assert.equal(parseWorkspaceBackup(JSON.stringify(broken), people).ok, false);
  const older = JSON.parse(raw);
  delete older.data.surveys; delete older.data.surveyResponses;
  const restored = parseWorkspaceBackup(JSON.stringify(older), people);
  assert.deepEqual(restored.ok && [restored.backup.data.surveys.length, restored.backup.data.surveyResponses.length], [0, 0], "an earlier schema 6 file restores without them");
});

test("the sample: last term's two surveys, 31 and 29 of 38, released with the sample, and nothing in them identifies anyone", () => {
  const s = getState();
  for (const [def, count] of [[PRIOR_COS, 31], [PRIOR_SSRT, 29]] as const) {
    const answers = PRIOR_SURVEY_RESPONSES.filter((r) => r.formId === def.id);
    assert.equal(answers.length, count);
    assert.ok(def.sample && def.sampleReleasedAt && surveyReleased(def, []), "released with the sample, not through the event log");
    assert.ok(answers.every((r) => r.source === "sample" && r.clientId === null && r.term === def.term));
  }
  const comments = PRIOR_SURVEY_RESPONSES.flatMap((r) => Object.entries(r.answers).filter(([, v]) => typeof v === "string" && v !== "cannot-say"));
  assert.equal(comments.length, 12, "a dozen short comments, written for the prototype");
  assert.ok(!s.events.some((e) => e.kind === "grades-released"), "a fresh workspace has no release on its event log");
});
