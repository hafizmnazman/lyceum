# Lyceum: the depth plan (Track C, after Track A, before Amsterdam)

> **What this file is.** The second plan over the built tree. Track A gave Lyceum its loop, its theme, its characters, its deck and its film. This plan gives it depth: a course record shaped like the file a quality office keeps, teaching material a judge can open, the two student surveys, attainment against a stated threshold and KPI, a before and after a judge can see, and a judge's own way through the app with the host at the door. It plans only. Nothing in it is built, captured or rendered until the owner says so, and recording is gated to the end (Section 0.3).

**Stamp.**

- Written: 22 October 2026, evening, Kuala Lumpur time, by the planning session that wrote the four research notes it cites. Revised the same evening after the Codex review ([review/astra-depth-plan-review-2026-10-22.md](review/astra-depth-plan-review-2026-10-22.md)); the changelog at the end says what the review changed.
- Over: `main` after the A8 commit (`b4bfdc4`) plus the owner's uncommitted follow-ups of 22 October, as [as-built.md](as-built.md) records them (stamp 15:05). Where this plan and the code disagree about what exists, the code and the as-built record win; where this plan and [lyceum-upgrade-plan.md](lyceum-upgrade-plan.md) disagree about what to build next, this plan wins, because it is later and was written against the built tree.
- For: the HACKaSTONE 2026 Grand Final, Thursday 29 October 2026, Amsterdam ([competition/grand-final-2026.md](competition/grand-final-2026.md)).
- Status: approved to run. Section 18 lists what only the owner can decide; its two blocking items were answered by the owner on 22 October 2026, evening (the build session writes the sample content as labelled fixtures; the UTP mark may be used, on the advisor's word), so nothing blocks the run.

## Contents

0. [Read this first](#0-read-this-first)
1. [Where the depth is missing today](#1-where-the-depth-is-missing-today)
2. [What depth and wow mean here](#2-what-depth-and-wow-mean-here)
3. [The demo institution: UTP, labelled](#3-the-demo-institution-utp-labelled)
4. [The course record, in the shape of a course file](#4-the-course-record-in-the-shape-of-a-course-file)
5. [Teaching material](#5-teaching-material)
6. [Before and after](#6-before-and-after)
7. [The two student surveys](#7-the-two-student-surveys)
8. [Attainment against a stated threshold](#8-attainment-against-a-stated-threshold)
9. [The judge's way through, with the host](#9-the-judges-way-through-with-the-host)
10. [Assessment items and exports](#10-assessment-items-and-exports)
11. [The data model and the migration](#11-the-data-model-and-the-migration)
12. [Checks, documentation and the sample workspace](#12-checks-documentation-and-the-sample-workspace)
13. [What goes stale, and the gated capture](#13-what-goes-stale-and-the-gated-capture)
14. [Work packages, order and schedule](#14-work-packages-order-and-schedule)
15. [Codex and the other tools](#15-codex-and-the-other-tools)
16. [Running it as one autonomous session](#16-running-it-as-one-autonomous-session)
17. [Session prompts for Opus](#17-session-prompts-for-opus)
18. [Needs the owner, before the run](#18-needs-the-owner-before-the-run)
19. [Risks, and what stays thin](#19-risks-and-what-stays-thin)
20. [Sources](#20-sources)

## 0. Read this first

### 0.1 What this plan is

A plan for one more autonomous build run (Track C) on the days left before the freeze, in the same shape as Track A: numbered packages, each with a scope, an acceptance line, its verification and an Opus prompt; one driver prompt; decisions logged in `docs/decisions.md`; progress in `docs/run-log.md`; the result recorded in `docs/as-built.md`. It is written from the code as it stands, not from memory: every "today" statement in Section 1 names the file it was read in. The Codex review could not verify those statements from the extract it was given; they stand on the files named.

### 0.2 Rules that bind every session

All of [CLAUDE.md](../CLAUDE.md) and the master plan's Section 0 still bind. Added or made precise for this track:

1. **The recording gate.** No presentation asset is produced or replaced without the owner's written go in that session: `npm run shots`, `node video/capture/capture.mjs`, the Remotion renders and the determinism check, `npm run gen:sample-decks` (PowerPoint renders of the pack), `npm run deck`, `node scripts/gen-brief-pdf.mjs`, `node scripts/gen-poster.mjs`, and the README screenshot copy. They are package D9 and run once, at the end. The owner's words: "everytime you add something don't record straight away the video etc. waste of credit. Not unless I am satisfied with everything, only then you can record." Not gated, because they are build-time outputs and proofs rather than captures: `scripts/gen-partner-marks.mjs` (a PNG of the mark, like `gen-mascots.mjs`), a pack or a zip a proof builds in memory or in a temporary folder, the sample workspace `node mcp/sample.ts` regenerates.
2. **The tour's captions are frozen.** `src/demo/script.ts` keeps its 95 captions and its step order, because the film is cut from the tour by caption (`docs/as-built.md`, mismatch 2). Targets and typed values may change only where the richer sample course requires it, the smokes must still pass, and the change is logged. New guided experiences (Section 9) are separate scripts, never edits to the tour.
3. **Synthetic says synthetic, and the demo institution says demo.** Every sample record, slide, response and mark in this track carries the existing `sample` flag or a visible "Sample, synthetic" label, and every surface that shows the UTP mark carries the demo line of Section 3.3, content slides included.
4. **Who writes the sample content is the owner's decision, and it is a rule change if the build session writes it.** The operating brief says "no model-written text inside shipped artefacts before the pilot" with no runtime qualification; the as-built record says the pack carries "no model text". A course record, slides, lab sheets, a quiz and survey responses written by the build session and shipped as fixtures are model-written text, whatever they are called. Section 18 item 1 puts the choice to the owner: the session writes them as labelled fixtures (which adds one sentence to CLAUDE.md's rule: sample fixtures may be written by the build session when labelled sample; a lecturer's own artefacts never carry model text), or the team writes them, or the structure ships with the content marked "to be written by the lecturer" and only the demo revision's material filled. **Answered by the owner on 22 October, evening: the build session writes the content as labelled fixtures, and D0 adds the clause to CLAUDE.md.**
5. **Every new figure on a surface is a claims-register row or a synthetic label.** Attainment shares, survey counts and change summaries on the sample course are synthetic and say so; the check count on the landing page changes with the suites and `prove-journey` keeps it honest.
6. **Every comparison is honest by construction.** A before and after shows two stored records and the decision between them; nothing is animated that is not in the event log.
7. **The host speaks at welcome, empty states, completions and the recap, and never on errors, constraint failures, data provenance or pricing.** In the judge's walk the host speaks only at the first and the last stop; the stops' explanatory lines are the app's own captions, as the tour's are, so the character never does the teaching (GitHub's rule for mascots, in the judge note).
8. **Codex sees files only when the owner has said so in the session**, read-only, embedded through stdin, reports saved under `docs/review/`, every claim verified before it is kept (Section 15).

### 0.3 The recording gate, in one table

| Surface | Built from | Changes in this track | Rebuilt when |
|:--|:--|:--|:--|
| The screenshots (`docs/screenshots/`, `docs/presentation/shot-*.png`, `.github/readme/shots/`) | `npm run shots` on the sample workspace | The Course, Teach, Learn, History and Courses screens look different | D9, on the owner's go |
| The film (`video/out/*.mp4`, `deck/media/loop90.mp4`) | The tour captured once, cut by caption | The screens inside the capture change; the captions do not | D9, on the owner's go; the silent renders of 22 October stay valid as a record of that build until then |
| The deck's PDF and PPTX, the brief, the poster | Generators that read the screenshots and the claims register | Slides 6 and 7 may gain the before and after and the attainment table (Section 13.2, on the owner's decision) | D9, on the owner's go |
| The teaching pack as PowerPoint draws it (`docs/presentation/pack/`) | `npm run gen:sample-decks` with PowerPoint | The pack gains masters and the mark | D9, on the owner's go |
| The sample workspace (`mcp/sample-workspace.json`) | `node mcp/sample.ts` from the tour's end state | Every package | D8, as a check (not a capture) |

### 0.4 How to use it with Opus

Section 16 is the driver prompt; Section 17 holds one prompt per package. Section 14 gives the order and the tiers. The run is sequential, one package committed before the next, and resumable from `docs/run-log.md`. Before the run the owner answers Section 18, at least its two blocking items.

## 1. Where the depth is missing today

Read from the code on 22 October 2026, after the owner's follow-ups. Each row names where the thinness is visible and what a judge would see.

| Area | Today, as built | Where read | What a judge sees |
|:--|:--|:--|:--|
| The course record | CS310 has one outcome (`CLO5`, "Data visualisation", Apply) and no topics: `courseDefinitions` is empty until a revision is adopted, so `definitionForCourse` returns an empty brief and `topics: []`. The Course screen prints "No topic outline is recorded yet" and "Achievement evidence not recorded". The brief holds no synopsis, no references, no assessment plan, no PLO list, no SLT | `src/data/seed.ts` lines 70 to 78; `src/lib/curriculum.ts` `courseDefinition`; `src/ui/screens/CourseWorkspace.tsx` | A course that is a title and one sentence |
| Teaching material | A session has a topic, minutes, an activity, a check and a resources line. Its pack is six text slides (title, outcomes, evidence, activity, check, resources) in Calibri on the forest and white backgrounds, no master, no mark, no preview on screen | `src/lib/slides.ts` `sessionDeck`, `renderDeck`; `CourseWorkspace.tsx` `TeachingPlanPanel` | One session saved in the tour; a pack that opens in PowerPoint but reads as a form |
| The sample files | `results.xlsx` holds one column, "CLO5 mark (%)"; `clo-survey.csv` is CS220's single CLO4 self-rating on 1 to 10; `syllabus.pdf` and `lecture-slides.pptx` are CS220's, five slides | `scripts/gen-demo-files.mjs`; `public/demo/` | The Learn step files a one-column file |
| Surveys | A survey enters only as a CSV file; there is no survey instrument, no form, no student page, no response floor, no lock before grades. The data model has `SurveyRecord` (1 to 10 per CLO) and `DataSource` kinds `clo-survey` and `ssrt`, nothing more | `src/types.ts`; `src/ui/screens/Learn.tsx` ("Surveys are listed, not yet set beside the marks") | "Where is the survey?" has no answer on screen |
| Attainment | Mean, spread and n of N per outcome, as filed; no threshold, no KPI, no indirect measure beside the direct one | `src/lib/learn.ts`; `Learn.tsx` `PLANNED` | A mean mark alone, where the practice the research records reports the share of students above a stated mark |
| Before and after | `curriculumChanges` produces text pairs (before and after strings) per outcome and topic; Update shows them as text; History lists versions and decisions with "Open" on each; no word-level diff, no hours table with deltas, no slide comparison, no results comparison, no link from a change to the decision that authorised it | `src/lib/curriculum.ts` lines 123 to 142; `src/ui/screens/CurriculumWorkspace.tsx` `CurriculumHistoryPanel` | The change the whole loop exists to make is a list item |
| The judge's way through | The landing page offers the tour and sign-in; `JUDGES.md` is text with no character; the host appears only at the centre of the loop graphic, on Home's Start here card and in the wordmark; nothing greets a judge, walks a judge, or hands a judge the weak spots | `src/ui/screens/Landing.tsx`, `Guide.tsx`, `Inbox.tsx` line 182, `LoopGraphic.tsx` line 39; `JUDGES.md` | A good app with no host at the door |
| The programme | Seven seeded courses, one with a loop; the Courses screen is a card per course with counts; `Programme.tsx` is the illustrative relevance-band screen of the sandbox | `src/data/seed.ts`; `src/ui/screens/Courses.tsx`, `Programme.tsx` | One course, no sense of the department |
| Assessment items | Items are template strings built from the outcome text ("Apply data visualisation on a worked scenario, showing each step"), in the old test-draft flow; no options, no lint, no export an LMS can import | `src/app/store.ts` `generateTestItems`; `src/data/items.ts` | Not shown in the loop today |

What is already deep and stays as it is: Watch and Report (collection with receipts, exact quotations, the reviewed denominator, Wilson intervals, snapshots, the brief), Decide (the immutable record and the authority model), the constraint check in Update, the local door, the claims register and the checks.

## 2. What depth and wow mean here

This plan's framing, not a rubric (none was found; the judge note says the finalist pack settles the timings): a judge has about ten minutes to decide whether this is real, whether it goes deep, and whether a university would use it. One judge's published notes ([judge-experience-and-wow-2026-10-22.md](research/judge-experience-and-wow-2026-10-22.md), Section 2) say a live, working, specific demo beat a more ambitious one on slides, that a named weakness raised that judge's score, and that the sentence a judge repeats an hour later is worth choosing in advance. The sentence for this track: **"They showed me the course before and after, and the receipt for why."**

**Depth** means the records a quality office keeps exist in the app and have the shape of the real thing: a course file in the order EAC lists it (course information, the CLO to PLO matrix, the syllabus, references, assessments with marking schemes, rubrics), an OBE course report against a stated threshold, the two surveys, the CQI note ([course-records-and-surveys-2026-10-22.md](research/course-records-and-surveys-2026-10-22.md), Sections 1 to 3). Shape, not accreditation: the file names what it does not contain (Section 4.5), and no surface claims the course is accredited or accreditable.

**Wow** means a stored record shown so well that the judge feels the change, and never a trick. The organising pattern is Duarte's "what is, what could be": hold the old state, reveal the new with one comparison pattern, and leave the comparison on screen so the information lives in the persisted view and not in the motion ([before-and-after-patterns-2026-10-22.md](research/before-and-after-patterns-2026-10-22.md), pattern 10). The ranked wow moments of the judge note are costed in Section 9.4; the ones chosen for Track C are honest by construction and small enough for the days left.

## 3. The demo institution: UTP, labelled

The owner supplied `utp.svg` at the repository root on 22 October 2026 (652 by 652 viewBox, two fills: `#004A84` blue and `#BC893A` gold). The demo lecturer, Dr Sobri, already carries a `utp.edu.my` address in the seed, as do Dr Rahman, Prof Lim and Mr Devan (`src/data/seed.ts` lines 47 to 51). This track makes the institution explicit and labelled.

### 3.1 The institution profile

A new record, `InstitutionProfile`, in the store and the backup (Section 11). Every value below is a setting, printed beside any figure it shapes, because the research found three different attainment conventions and no single national method.

| Field | Demo value | Why |
|:--|:--|:--|
| `name`, `shortName` | "Universiti Teknologi PETRONAS (demo)", "UTP" | The team's own university; the word demo stays in the name on every surface |
| `showMark` | true | A switch kept for campuses that must not show a mark; for the demo it stays true, including at D9, because the owner approved the mark on published surfaces on the advisor's word (Section 18 item 2) |
| `mark` | `/brand/partners/utp.svg` and `.png` | Section 3.2 |
| `kpi.passMark`, `kpi.studentShare` | 55, 0.50 | The practice one Malaysian faculty publishes ("at least 50% of students achieve 55 marks in all CLO", UTHM FKEE 2024, recorded as an example in the note, not a national rule and not a UTP document); the help text says so |
| `kpi.method` | "share-above-mark" | The only method the retained data can compute (Section 8.1); the note's other conventions are named in the help text as alternatives a campus would configure once their data is kept |
| `surveyScale` | 1 to 5, target "4 or higher" | The MQA GGP AOSL worked target and the UTM end-of-course form |
| `surveyFloor`, `surveyFloorShare` | 5 responses, and 25% of the class | McLennan's five per section; McGill's five applies to classes of 5 to 11 and then a share by size (40, 35, 30 and 25%), so the profile carries both a count and a share and applies the stricter; below either no aggregate is shown |
| `releaseRule` | "all results after grades" | McGill: nothing disclosed to the instructor before final grades are processed; Rutgers the same. Not only comments (Section 7.3) |
| `lms` | "Moodle (ULearn)" | UTP runs two Moodle instances (a vendor case study; marked as such), so Moodle XML is the first item export |
| `controller` | "This prototype is run by the Lyceum team at UTP for a demonstration; a campus deployment names its own data controller" | The privacy line the student page shows; UTP's general privacy notice is linked as the demo's example and not as the operator's notice |
| `termPattern` | "2026/2027 semester 1" | The term the tour already sets |

Editable in a small Institution panel on the Guide page (coordinator only).

### 3.2 The mark pipeline, and the one rule it changes

- `scripts/gen-partner-marks.mjs` copies `utp.svg` to `public/brand/partners/utp.svg` and rasterises it with Puppeteer to `utp-1024.png` and `utp-256.png` (PNG because pptxgenjs documents SVG support only for the newest desktop PowerPoint, with no fallback). `--check` reports drift.
- The PPTX masters place the PNG with alt text ("Universiti Teknologi PETRONAS mark, demo course"); the React preview and the survey page use the PNG by `<img>` with the same alt text; the mark is never inlined into a component, never recoloured and never combined with Lyceum's own lockup (the rule in [brand-use.md](brand-use.md)).
- **The rule change, stated.** The operating brief says colours come from `tokens.ts` only, and `scripts/contrast-check.mjs` enforces it by scanning every tracked `.svg` (its part 3 checks `public/brand/*.svg` against the tokens). A third-party mark keeps its owner's colours, so a tracked `utp.svg` fails the check as written. This plan proposes one explicit exception, `public/brand/partners/`, excluded from part 3 with the reason in the script, and the rule in CLAUDE.md gains the clause "third-party marks under `public/brand/partners/` keep their owners' colours and are never used for Lyceum's own surfaces". It is a policy change, and the owner approved it on 22 October, evening (Section 18 item 2), so D0 makes it.
- `docs/brand-use.md` gains a row: UTP, the team's own institution, the mark supplied by the owner on 22 October; shown on sample material inside the app, in the pack and on published surfaces, labelled demo; the team's advisor confirmed on 22 October that the team represents the university and that an earlier student's team used the mark the same way, which the row records as the permission on file.
- Where the mark appears: the pack's title and content masters (top right on white; a white plate on the forest title slide), the survey's student page header, the course file's cover sheet, the OBE course report's header, the term recap's header; screenshots of those screens may be published as they are. Beside the team's name on the deck's closing slide and the poster's team line, if the owner wants it, added in D9. Never inside Lyceum's own lockup, a poster title or a booth banner headline (the brand-use rule).

### 3.3 The honesty line

One string, in `src/data/sample-course/index.ts`, used wherever the mark or the course appears, including the footer of every content slide: "A demo course at UTP, written for this prototype. CS310 is not a UTP course outline, and these marks, responses and slides are synthetic." The real UTP course in this area, TFB3133 Data Visualisation in the 2026 handbook, is named in the research note and nowhere in the app.

## 4. The course record, in the shape of a course file

### 4.1 What a course file holds

From the research (EAC 2020 and 2024 course files; MQA GGP AOSL Table 1 and Appendix 12; UTM's Course Information elements; AUN-QA 4.0's course specification): a synopsis of 100 to 150 words; four to six CLOs, one measurable verb each, tagged with a Bloom level and an MQF cluster; the CLO to PLO matrix with a level per cell; the teaching and learning methods; the assessment plan (components, weights, the CLOs each assesses, the week) with a table of specifications; student learning time that adds to 40 hours per credit; a week-by-week schedule; references under five years old; the course materials (lecture notes, lab sheets, the project brief, rubrics, exam papers with marking schemes, graded samples at three levels); and the per-term OBE report with its CQI note. The demo's frame is MQA's (COPPA and the GGP AOSL), because the demo programme is Malaysian; EAC's list is used as the checklist for the course file because it is the clearest list. The manifest (4.4) says which items are present, which are sample, and which are not included, so the file shows its own gaps and claims no accreditation.

### 4.2 The data model (additions, all optional so old backups migrate)

| Record | Added fields | Notes |
|:--|:--|:--|
| `CourseDefinition` | `synopsis`, `methods: string[]`, `references: Reference[]`, `assessment: AssessmentComponent[]`, `slt: { lecture, lab, selfStudy, assessmentWork: { quizzes, labs, essay, project }, exam }` | `slt` totals are checked against `credits * 40`; lecture and lab totals are checked against the topics; `assessment` weights are checked to sum to 100 |
| `CourseOutcome` | `mqfCluster`, `ploLinks: { ploId, level: "H" or "M" or "L" }[]` | `ploIds` stays for compatibility and is derived from `ploLinks` |
| `CourseTopic` | `kind: "lecture" or "lab" or "mixed" or "quiz" or "studio" or "review"`, `lectureHours`, `labHours`, `activities`, `readings`, `misconceptions: string[]` | `contactHours` stays as the sum the Meter and the constraint check use; the proof checks `lectureHours + labHours = contactHours` |
| `AssessmentComponent` (new) | `id, title, kind, weight, week, description, individual: boolean, allocation: { cloId, bloomLevel, marks }[], rubricId?` | `allocation` sums to `weight`, so the table of specifications is a sum and not a division the plan never stated |
| `Rubric` (new) | `id, title, criteria: { name, marks, cloIds, levels: [capstone, milestone2, milestone1, benchmark] }[]` | Criterion marks sum to the component's team or individual part; the four-level grid shape of the VALUE rubrics with our own descriptors; the AAC&U text is linked, not bundled (CC BY-NC-SA) |
| `Programme` | `plos: { id, text, cluster }[]` | Eight demo PLOs shaped on the MQF 2.0 clusters, labelled synthetic |

### 4.3 The sample course: CS310 Data Visualisation

Authored under `src/data/sample-course/cs310.ts` by whoever Section 18 item 1 names, in their own words, modelled on the published outlines the note lists (GWU DATS 6401 Spring 2026 for the week structure and the project; UTP's TFB3133 synopsis for the local anchor on JavaScript charts, D3 and a mini project; the BTAA rubric for the criteria), credited in a `source` line on the record, with no sentence copied from any of them. The skeleton, so every session writes the same course:

**Outcomes**, one verb each (the existing `CLO5` keeps its id and label, because the tour, the smokes, the sample results file and the Map step target it; the four new outcomes take course-scoped ids `CS310-1` to `CS310-4` with display labels CLO1 to CLO4):

| Label | Bloom | MQF cluster | The outcome, our wording | PLO links |
|:--|:--|:--|:--|:--|
| CLO1 | Understand | Knowledge and understanding | Explain how data and task abstraction, marks and channels, and human perception decide whether a chart answers its question | PLO1 H, PLO2 M |
| CLO2 | Apply | Functional work skills (digital) | Construct charts for categorical, temporal and geospatial data with a reproducible tool chain, with the colour and accessibility choices recorded | PLO4 H, PLO6 M |
| CLO3 | Analyse | Cognitive skills | Analyse a published visualisation against perception, Gestalt, accessibility and ethics criteria to locate where it misleads | PLO2 H, PLO7 M |
| CLO4 | Evaluate | Cognitive skills | Evaluate competing designs for a stakeholder question against evidence from a usability check | PLO2 H, PLO5 M |
| CLO5 | Apply, before and after | Functional work skills (interpersonal and communication) | Before: use charts to tell a data story to a stakeholder audience. After the tour's Update, which appends its fixed typed value: use charts to tell a data story to a stakeholder audience with dashboards that answer a stakeholder's question | PLO5 H, PLO4 M |

The Bloom level of CLO5 does not change: the tour has no step that changes it, and a change of object (static charts to dashboards) is not a change of level.

**What the demo's revision changes, so the before and after is more than wording.** The before state has no dashboard topic: dashboards are mentioned in week 12's reading and nowhere else, and the project is a data-story report with static charts. The tour's existing Update steps (unchanged captions and typed values) reword CLO5 and add the topic "Dashboards and data storytelling" with three contact hours; the before schedule therefore allocates 53 of the brief's 56 contact hours, so the added topic fits within the hours as the brief and the decision say, and the Meter moves from 53 of 56 to 56 of 56. D1 decides the new topic's default week (the next free slot) and its lab and lecture split, and logs it. The assessment plan is not changed by this revision, and the History view says so; a second revision could change it, outside the demo.

**Student learning time** for 3 credits, 120 hours: lecture 14 weeks by 2 hours, 28; lab 25 before the revision and 28 after (the added topic is lab-weighted); self-study 40; assessment work 21 (quizzes 3, labs 6, the critique essay 4, the project 8); the final examination 3. Before the revision the total is 117 with 3 hours shown as unallocated contact time; after, 120. The proof checks both states.

**Schedule**, fourteen weeks, each a `CourseTopic` with its kind, lecture and lab hours, outcomes, readings and two or three misconceptions; 53 contact hours before the revision:

1. Why visualise: questions, data and tasks (lecture 2, lab 2: the tool chain installed)
2. Data and task abstraction; tidy data (2, 2)
3. Marks, channels and perception (2, 2)
4. Colour, Gestalt and accessibility (2, 2)
5. Charts for comparison and distribution (2, 2)
6. Time: trends, seasonality and small multiples (2, 2)
7. Mid-semester quiz; critique workshop on misleading charts (2, 2)
8. Interaction: filter, brush and link; the project brief released (2, 2)
9. Geospatial data (2, 2)
10. Networks and hierarchies (2, 2)
11. Uncertainty and ethics (2, 2)
12. Data storytelling: static reports for stakeholders (2, 2)
13. Project studio (2, 2)
14. Presentations and review (1, 0)

**Assessment plan** (continuous 60, final 40, inside the 50 to 70 continuous range UTM's guide gives), each component with its allocation of marks by CLO and Bloom level: quizzes 10 (week 7 and week 12; CLO1 Understand 6, CLO3 Analyse 4); labs 15 (weeks 2 to 11; CLO2 Apply 15); the project 25, of which a team report 15 (CLO5 Apply 10, CLO2 Apply 5) and an individual defence 10 (CLO4 Evaluate 10), so each student's CLO4 evidence is their own; the critique essay 10 (week 9; CLO3 Analyse 10); the final examination 40 (CLO1 Understand 12, CLO2 Apply 12, CLO4 Evaluate 16). The table of specifications is the sum of the allocations and is checked to equal the weights.

**Rubric** for the project: four criteria shaped on the BTAA categories in our words (design and accessibility; clarity and integrity of the communication, sources cited; insight for the audience; reproducibility of the pipeline), four levels each, marks per criterion summing to the team part, each criterion naming the CLO it evidences; the defence has its own two-criterion rubric for CLO4.

**References**: Munzner 2014 and Few 2013 as the two the research anchors, plus at least two references under five years old supplied by the team's lecturer (Section 18 item 8); until supplied, the record lists the two books and the line "recent references to be supplied by the lecturer", and the proof flags the gap rather than passing silently.

**Methods**: lectures, labs, a studio critique, the project with a defence.

### 4.4 The Course screen

The Course step grows from two panels to a record with sections, in this order, each a panel with the chunky outline and lip the owner approved: Synopsis (with the credits and the SLT bar: lecture, lab, self-study, assessment work, exam, with the unallocated hours shown before the revision); Outcomes (five cards with the Bloom tag, the MQF cluster and the assessment that evidences each, and the CLO to PLO matrix as a heat table in H, M and L with the level in text in every cell); Assessment plan (the components with weights and allocations, the table of specifications behind a disclosure); Schedule (fourteen rows: week, kind, topic, lecture and lab hours, outcomes, the pack's thumbnail, a dot when a lab sheet or the brief exists); Materials (Section 5); References; the context and the preparation checklist as today behind disclosures. One action at the top stays: Watch employers, or Start a revision.

**The course file in one click.** "Export the course file (.zip)": `course-information.md` (everything above), the packs that exist, the lab sheets, the project brief, the rubric (`.xlsx`), the quiz (`.xml`, Moodle) once D7 has shipped, the OBE course report (`.md`) once D4 has shipped, the decisions and versions (`.md`), and `MANIFEST.md`, a checklist in the EAC course-file order marking each item present, sample, not yet built (with the package that builds it) or not included. The zip is built with the `jszip` dependency already installed; it grows as packages land, and D8 verifies the final manifest. D1's acceptance is the zip with what exists at D1 and an honest manifest, nothing more.

### 4.5 Left out, and said so

Graded student samples at low, medium and high (synthetic student work is one step too far from honest); exam papers beyond the week 7 quiz and the final's outline with its marking scheme; the external examiner's report. `MANIFEST.md` lists them as not included.

## 5. Teaching material

### 5.1 Sessions with slides, scoped to the days left

`TeachingSession` gains `slides: SlideDraft[]` (title, bullets, notes, an optional figure: a chart from the evidence, a table, or a labelled placeholder) and `labSheet?: string` (markdown). The sample saves fourteen sessions, one per week. Four of them carry full slides, six to nine each, written in a lecturer's voice with notes: weeks 1, 6 (the session the tour saves is week 6, so the judge sees a full pack there), 7 and 12. The other ten carry an outline pack the generator builds from the topic record (a title slide, the outcomes slide, one outline slide of three bullets from the topic's activities and readings, the evidence slide, the closing slide), labelled "outline pack: the lecturer's slides are not written yet", so every week has a pack and none pretends. Lab sheets for weeks 1, 6 and 7; the project brief at week 8 (teams of three, a packaged workbook, a written report, a 10 to 15 minute defence, shaped on the MSU Texas brief in our words); the week 7 quiz only when D7 lands, otherwise the check for understanding stays text. The Codex review's estimate stands: fourteen full weeks is 84 to 126 authored slides, which does not fit beside the schema and screen work; the owner can widen this in Section 18 item 1.

### 5.2 The pack, with masters and the mark

`src/lib/slides.ts` keeps `DeckSpec` and gains a `Brand` record (the institution's name, its mark PNG when `showMark` is true, the token colours, Calibri) and five masters through `defineSlideMaster`: TITLE (forest, the course and week, the lecturer, the mark on a white plate), SECTION, CONTENT (title, body placeholder, the mark top right, the footer with the course code, the week, the slide number and the demo line of Section 3.3), TWO_COLUMN and CLOSING (the outcomes revisited, next week). `sessionDeck` builds from the saved slides first, then the evidence slide as today (the counts over the reviewed denominator and the exact quotation), then the check for understanding, then resources. Objects are added in reading order; body text is 18 pt or larger; every slide has a unique title and notes; the mark and every figure carry `altText`; shapes use the `pres.shapes` constants. The proof unzips the file and checks each of these in the XML; clipping cannot be checked without rendering, which is gated, so `fit: shrink` is set and the PowerPoint pass in D9 is the clipping check. Only if the XML shows the malformed parts pptxgenjs issue 1449 describes does D2 add the repair pass.

### 5.3 The preview on screen

`src/ui/primitives/DeckPreview.tsx` draws a `DeckSpec` to SVG at a 960 by 540 viewBox with the same layout rules as `renderDeck`: the thumbnail on each session card, a filmstrip behind "Preview the pack", the two-version comparison in Section 6, and the frames in the judge's walk. The preview says "A preview; PowerPoint draws the file" once, because it is not pixel-identical. No PowerPoint or LibreOffice is needed on the demo laptop to show slides.

### 5.4 Teach, as the judge sees it

Fourteen cards by week with the thumbnail, the outcomes, the status and the pack; a filter for the week in view; "Teaching pack (.pptx)" unchanged; the lab sheet and the brief as downloads where they exist. The tour's week 6 session step keeps its caption and lands on a card that already has full slides.

## 6. Before and after

### 6.1 One library

`src/lib/diff.ts`, deterministic and proved: `wordDiff(a, b)` (a token LCS, giving kept, deleted and inserted runs); `topicDeltas(before, after)` (per topic: lecture and lab hours before and after, delta, moved, added, removed); `deckDiff(a: DeckSpec, b: DeckSpec)` (per slide: title changed, bullets added or removed, figure changed, slide added or removed); `resultDeltas(prior, current)` (per outcome: share before and after, with a "not comparable" mark when the outcome's wording changed between the two versions); `changeSummary(...)` ("1 outcome reworded, 1 topic added, 3 h added, 2 slides changed", from the diffs). The library reads records only; it never guesses.

### 6.2 The views, in two parts

**D5a, the core (Tier 1).** The redline, the two-column table, the structural slide diff and the decision link carry the claim.

| Where | Pattern | What the judge sees | Accessibility |
|:--|:--|:--|:--|
| Update, the check panel, before adopting; History | Word-level redline (1) | CLO5's old words struck through in the danger token and the new words inserted in the emerald text token, inside one paragraph, with "Hide changes" for the clean text | Strikethrough and underline, not colour alone; visually hidden "deleted" and "inserted" labels |
| Update and History | Current versus proposed, two columns (2) | Topics and hours as a real table: topic, lecture and lab hours before and after, delta as text ("+3 h"), the added row and the changed cells outlined; the unchanged assessment plan named as unchanged | A table with headers; the delta in words |
| Teach and History | Structural slide diff (6) | For the week 6 pack as generated under version 1 and under version 2 (the generator takes each version's outcome snapshot): the list of what changed (the outcomes slide's line, the evidence slide's rows), each highlighting its region on the `DeckPreview` thumbnail | The list is the accessible description; nothing depends on pixels |
| History | The decision link | Each version entry names the decision that authorised it, found through the `decision-recorded` and `version-adopted` events, and opens it; a change without a decision says "no decision on record" | Plain links |
| History and the recap | Change summary (9, static) | "1 outcome reworded, 1 topic added, 3 h added, 2 slides changed", as text | None needed |

**D5b, if time (Tier 3).** The dumbbell per topic for hours (3), the swipe and onion-skin slide compare over the two SVG previews with arrow keys, click to position and Show before and Show after buttons (5, WCAG 2.5.7), the version scrubber with named stops (7, a slider role, keyboard steps, the stop name announced, no autoplay), the counters counting up once (9, static under reduced motion, in a live region), and the slopegraph for results (4) once D4 has filed a prior term, with CLO5 drawn as a broken line labelled "reworded between terms; not comparable". Object-constant animated transitions (8) stay in Track B.

### 6.3 Where the change comes from in the demo

The tour's Update adopts a version: CLO5 reworded by the fixed typed value, the topic "Dashboards and data storytelling" added with three contact hours within the budget, the version's reason quoting the decision. History then holds two versions, one decision and the events between them, so every view above has real records to show, and the judge can open the decision from the diff.

## 7. The two student surveys

### 7.1 The instruments

Two `SurveyDefinition` records in the workspace, built from the course record and the institution profile:

- **The Course Outcome Survey**: one item per CLO ("I can ..." in the outcome's words), 1 to 5 from strongly disagree to strongly agree, a "cannot say" option excluded from means with its count shown, the target "4 or higher", one open comment. Run at the end of the semester.
- **The Student Self Reflection Tools Survey (SSRT)**: UTP names it in a job advertisement and nowhere public, so the demo carries a **demo instrument, unvalidated**, twelve items on the same scale across the dimensions SEEQ names (learning, organisation, breadth, assessment, workload) in our words, plus two open comments, labelled "a demo instrument written for this prototype; not SEEQ, not UTP's instrument; a campus loads its own". Unanswered items are excluded per item, with n shown per item.

Every question carries a stable id embedded in its text ("Q3.") so an import matches on the id, not the wording.

### 7.2 Collection without a server

The research note's own order for a campus puts the Forms exports first (a DOCX for Microsoft Forms Quick Import, Google Forms through its API) and the static page and paste token as fallbacks. The booth needs the opposite order, and this plan says so rather than attributing it to the note:

1. **The booth way (D3a)**: the local API (`server/`) gains `POST /api/survey/:formToken` (append-only, in memory, no identifiers, one response per client id, where the student page draws a random client id and the count on screen is of distinct ids) and `GET /api/survey/:formToken/responses?reader=<secret>`, the reader secret generated with the form and held only in the lecturer's workspace, so the submission token never reads responses. The student page is a route of the built app (`#/survey/<form>`) that reads the form from the URL fragment (lz-string, MIT; the proof checks the link stays under 2,000 characters) and posts to the laptop's address on the booth's own hotspot; the QR on screen encodes that address. Judges answer on their phones; the lecturer presses "Collect". **Booth responses are a demonstration of the collector, not course evidence**: they are stored with `source: "booth"`, shown in their own panel, and excluded from the OBE report and the recap by rule and by proof. The screen says "3 responses from 3 devices; the floor is 5 and 25% of the class; results open when grades are released", which is itself the honest moment.
2. **The campus way (D3a, one importer; D3b, the rest)**: the Microsoft Forms XLSX importer first (ID, Start time, Completion time, Email, Name, then one column per question; Name and Email dropped at import), because UTP is a Microsoft 365 campus; then, in D3b, the DOCX export shaped for Quick Import written with `jszip`, and the Google Forms CSV and Moodle Feedback CSV importers through the SheetJS dependency, matched on the question id, with duplicate rows (same timestamp and answers) dropped and counted.
3. **The paste way (D3b)**: a short code the student pastes into the LMS or an email, labelled on the page "not anonymous: the channel you paste it into identifies you", kept only for campuses without the other two.

### 7.3 Rules on screen

The floor: a count and a share, the stricter applied, from the profile. **Release: no result for the term, aggregates and comments alike, is shown to the lecturer until the coordinator records "grades released"** (an event, `grades-released`, in the log, so History shows it); before that the lecturer sees only the response count. The consent line and the controller line from the profile on the student page, with the privacy notice linked as the demo's example. Comments carry the warning the research quotes from Edinburgh Napier: confidentiality holds unless students identify themselves in free text, and the lecturer's view says comments may identify a student. Nothing stored identifies a student. The response rate beside n of N, with context rather than a standard: "31 of 38, 82%; Nulty's figures, reported by Ahmad 2018, are about 58% for a class under 20 and 35% over 50, and a class of 38 sits between; online surveys at Monash drew 31%".

### 7.4 The sample responses

Synthetic, under `src/data/sample-course/surveys.ts`: the prior term's Course Outcome Survey (31 of 38) and SSRT (29 of 38), with a dozen short comments labelled synthetic, for a term whose grades are recorded as released; `scripts/gen-demo-files.mjs` also writes them as a Microsoft Forms style XLSX so the importer has a real fixture (and, in D3b, a Google Forms style CSV).

## 8. Attainment against a stated threshold

### 8.1 The arithmetic, and what it can honestly say

`src/lib/attainment.ts`, proved against a hand-computed fixture:

- **Direct, per CLO**: n, mean, spread, the count at or above the profile's pass mark, the share, and KPI met or not against the student share. The default reads "CLO2: 29 of 38 students at 55 or above, 76%; KPI 50% met". **Denominators, stated**: N is the students listed in the file; n is those with a valid mark for that CLO; blanks and absences count in N, are excluded from n, and are shown ("3 without a mark"); the share's denominator is n, with N beside it; this is a labelled convention, selectable later. **Intervals**: when every listed student has a mark the share is the cohort's and is printed without an interval; when n is below N an interval appears, sized with the finite population correction as the statistics note specifies, labelled "sampling noise from non-response only; nothing else".
- **Indirect, per CLO**: the Course Outcome Survey's share at 4 or higher, shown beside the direct share as two shares in percentage points, with the line that they are different constructs (achievement above a mark; confidence at 4 or higher) over different respondent sets, never averaged and never read as a learning gain (plan Section 9.4 of the master plan).
- **The CLO to PLO matrix with results**: per PLO, the linked CLOs with their link strength (H, M, L) and their direct shares, listed. No index, no weighted average and no comparison with a PLO KPI: the research records a weighted-average practice without the weights, a 60% PLO target needs every course's data and a programme-level method, and H, M and L are strengths, not numbers. The screen says so, and the programme figure is planned.

The UAEU variant (attainment as the share of students at 70% of each tool's maximum, weighted by tool) is not offered: it needs per-tool scores that the results file and the intake do not carry, as the Codex review's worked example shows (two students with marks of 70 and 70, against 100 and 40, give the same CLO mark and different tool attainment). It is named in the profile's help text as a method a campus would configure once per-tool scores are filed.

### 8.2 What the intake keeps

The results file holds a mark per student per outcome. At intake the interpreter keeps, per outcome, the sorted list of valid marks with no identifier, the number without a mark, and the pass mark the profile held at filing; mean, spread, counts at any threshold and histogram bins are computed from the marks when shown. A change to the profile's pass mark therefore recomputes an existing upload honestly, and the OBE report records the threshold it was printed with. `ResultUpload.rows` gains optional `marks`, `missing` and `passMarkAtFiling`; a row from an older backup has none, and the screen says "distribution not filed; file the results again to compute the share" rather than guessing. The marks already sit in the file the lecturer uploads; Lyceum keeps them without identifiers, and the sample's marks are synthetic.

### 8.3 The OBE course report

One panel on Learn, printable, and one section of the term recap: the header (course, term, version taught, the pass mark and the KPI used, the survey wording's version, the mark when `showMark` is true); the table CLO, n of N, mean, share at or above the pass mark (with its interval only when n is below N), KPI, met; the indirect column beside it with the two shares; the per-PLO listing; the response rate and the floor; the CQI note the lecturer writes (a saved record, `CqiNote`, with the term, the version and the date, shown in History); and the sentence that stays: "No learning gain is claimed; the benchmark has not been run." The report is a snapshot: it stores the version id, the threshold, the method and the survey definition's id it was printed with, so a later setting change cannot relabel it. The `PLANNED` list on Learn shrinks to pooling, frozen predictions, comment themes and the programme-level PLO figure.

### 8.4 The sample results

`scripts/gen-demo-files.mjs` writes `results.xlsx` with five columns (CLO1 to CLO5) for 38 synthetic students, three of them without a mark on one outcome, and `results-prior.xlsx` for the prior term; the seed files the prior term's upload as a labelled, never-counted example, as the CS220 example is today. Across the two terms CLO5's wording changes, so any comparison of its two shares is marked not comparable (Section 6.1).

## 9. The judge's way through, with the host

### 9.1 The host at the door

The research on mascots before professional audiences (GitHub, Mailchimp, Atlassian, Duolingo, Headspace) gives the rule, and Section 0.2 keeps it: the host greets, marks completions, names what is not built and signs off; it never explains, never narrates a receipt, never sells.

**D6a, Tier 1:**

1. **The judge's page**, `#/judge`, reachable from the landing page ("For judges: walk with Tualang") and from the Guide page. Tualang, greeting, size 160, one line: "Six steps, one course, one term. Walk with me, or watch." Three buttons: Walk the loop, Before and after, Ask the door. Under them, the card "What is not built", Tualang holding it, listing `REMAINING_WORK` from `src/app/sectionGuides.ts` word for word, and the register's four figures from `src/data/proof.ts` as static text (the count-up is D6b).
2. **The guided walk**: ten stops over the real app on the restored sample workspace, built on the existing demo runner (`src/demo/runner.ts`) in a new "guided" mode that waits for Next, Back or Escape instead of a timer: Course (the record and the mark), Watch (a posting with its link and date), Report Quote (the receipt), Report Count (the interval), Decide (the record), Update (the redline and the hours table), Teach (the pack preview), Learn (the OBE table beside the survey, or "planned" until D4), History (the decision link), Home (the ring). At each stop a spotlight on the element and the app's own caption of at most twenty words with the honesty label where one applies ("synthetic marks"); Tualang's corner card speaks only at the first stop and the last, and otherwise holds the stop number and the Next control. No new dependency: the runner already finds targets by `data-demo-id` and moves a cursor; driver.js stays an option in the decisions log.
3. **The phone**: the walk and the judge page work at 320 px (the smokes already check that width), so the poster's QR leads a judge's phone to the landing page and from there to Tualang.
4. **The term recap**, `#/course/:id/recap`: one printable A4 per course and term from records (plan Section 8 of the master plan): what employers asked for (the top skills with their denominators), what was decided (the record), what changed (the change summary and the redline), what was taught (the sessions and their packs), what came back (the OBE table and the survey beside it, or "not filed"); Tualang reflecting in the header, silent; the honesty line in the footer. Printed once for each judge team to keep (the booth lane).
5. **The close**: when the ring closes, Home shows Tualang celebrating for the done window as today; the booth script ends on the receipt opening in a new tab, then Home's ring, and no new claim after it.

**D6b, Tier 3:** the programme wall on Courses (every course as a mini ring with its term, closed or open, and the programme's CLO to PLO heat table across the seven courses, the six others saying "no outline recorded", which is true); the kiosk at `#/kiosk` (Tualang resting on the forest, the existing Loop90 render of 22 October in a loop with a visible pause, "Touch to walk the loop", a thirty-second idle return; nothing rendered); the count-up of the register's figures on the judge page, once, static under reduced motion.

### 9.2 The fifteen wow moments, ranked and costed

| # | Moment | Honest because | Cost | In Track C |
|:--|:--|:--|:--|:--|
| 1 | The live receipt: the quotation opens its posting | Real link, survives checking | Built (A2a) | Kept; the walk's stop 3 |
| 2 | Tualang's two-minute walk, on a phone from the QR | The honesty label never leaves; the host does not narrate | Medium | D6a |
| 3 | The before and after of the outline, linked to the decision | Every diff has a recorded reason | Medium | D5a |
| 4 | The one-click pack that opens in PowerPoint, now branded, with a preview on screen | The real generator's output | Small on top of A2b | D2 |
| 5 | The same question, two doors (Report beside Claude Desktop) | Both read one exported file | Needs the owner's Claude Desktop run | Kept as the booth's last step; two read-only tools for the course record and the attainment table are D8b |
| 6 | The register's figures counting up on the judge page | Every figure already audited | Small | D6b |
| 7 | A printed receipt from a thermal printer | Prints a stored record | Hardware | Owner's call (Section 18, item 4) |
| 8 | The term recap, one A4 per term, printed for the judge | Each number traces to a record | Medium | D6a |
| 9 | The programme wall | The same data at another zoom | Medium | D6b |
| 10 | The kiosk attract loop on the existing render | A capture of the real app | Small | D6b |
| 11 | The named weak spot, Tualang holding the card | Honest by definition | Small | D6a |
| 12 | Decision replay on real timestamps | Animates stored events only | Large | Track B |
| 13 | The judge as lecturer: name a skill, Watch finds a posting live | The fallback is labelled recorded | Medium | Already possible in Watch; rehearsed in the booth script, not built |
| 14 | A second screen on a stand | None needed | Logistics | Owner's call |
| 15 | The peak-end close | No new claim after the receipt | Small | The booth script (D8) |
| 16 | The course file in one click (new in this plan) | Each part a record; the manifest names the gaps | Small on top of D1 | D1 |
| 17 | Three judges answer the survey on their phones and the floor and the release rule refuse to show a result | The rule is the point; booth answers never count as evidence | Medium | D3a |

### 9.3 `JUDGES.md` and the booth script

`JUDGES.md` opens with Tualang (the existing PNG under `public/brand/mascots/`, the greeting pose) and gains the judge's page, the walk, the course file, the before and after and the survey as numbered things to try. `docs/demo-script.md` gains the three new steps (the before and after at Update, the survey on the judges' phones at Learn, the recap handed over at the close) with what each rests on and which check covers it, and keeps the six-minute path under six minutes by cutting narration, not steps (the Story lane times it on 26 October).

## 10. Assessment items and exports

Smallest useful version, last in the order, and honest about what a lint can and cannot do:

- `src/lib/items.ts`: deterministic item templates per Bloom level using the Arkansas verb list (remember: list, define, name; understand: explain, paraphrase, summarise; apply: calculate, demonstrate, use; analyse: classify, diagram, break down; evaluate: judge, defend, justify; create: design, formulate, compose), the course topic's `misconceptions` as distractors, and the outcome's words in the stem. Multiple choice with three or four options, short answer and essay. An item is **drafted, for the lecturer's review**; the app never marks an item approved, and a verb in a stem does not make an item test that level, which the screen says.
- The surface lint, each rule named on screen, catches what a rule can catch: a positive stem that carries the main idea; three or four options; one keyed answer with its position varied; options of similar length; no "all of the above" or "none of the above"; no absolutes; no grammar clue (an article mismatch); distractors drawn from recorded misconceptions. It cannot judge whether the key is defensible or the distractors plausible; the lecturer's review does, and the export carries "reviewed by" only when a person marks it.
- Exports from one item model: Moodle XML first (UTP's ULearn is Moodle; `multichoice`, `shortanswer`, `essay` with the elements the research lists), checked well-formed and shaped on the documented elements, labelled "not yet imported into a Moodle; the import test is planned", because a real import is the only proof; QTI 2.1 second, validated against the 1EdTech schema only if the schema is already on the machine, otherwise labelled unvalidated; the rubric grid to XLSX through SheetJS.
- Where: the Teach step's session card, "Check for understanding" becomes items with the lint beside them and "Export for Moodle (.xml)"; the week 7 quiz in the sample has ten drafted items that pass the lint and are marked reviewed by the person Section 18 item 1 names.
- The old test-draft flow in the sandbox is left as it is and labelled illustrative, as today.

## 11. The data model and the migration

- Backup schema 6. `LATER_DEFAULTS` in `src/lib/workspaceBackup.ts` gains `institution`, `programme.plos`, `surveys`, `surveyResponses`, `cqiNotes`, `rubrics`; the course definition, topic, outcome, session and result-row additions are optional fields with defaults applied on restore. `scripts/check-backup-migration.mjs` restores schemas 3, 4, 5 and 6.
- New event kinds: `grades-released`, `survey-opened`, `survey-collected`, `cqi-noted`. The How it works timeline reads them as it reads the others.
- `ResultUpload.rows[].marks`, `missing`, `passMarkAtFiling`; `SurveyResponse` (formId, term, answers keyed by question id, collectedAt, clientId, source: booth, pasted, imported, sample); never a student identifier; booth responses excluded from reports by the rule in Section 7.2.
- The OBE report and the recap store the version id, the threshold, the method and the survey definition id they were printed with.
- The moods: Lens is "waiting" while survey responses await collection and "done" when an OBE report or a CQI note is saved; Prism "done" when slides are saved; Folio "done" when the course file is exported. `prove-moods` keeps every mood a pure function of records.
- The loop's done rules are unchanged (Section 4 of the master plan); the richer record changes no rule.

## 12. Checks, documentation and the sample workspace

- New suites, registered in `prove:all` and in `src/data/suites.ts`: `prove-course-record` (the sample validates in both states; SLT sums as Section 4.3 states; weights and allocations sum; every CLO is assessed; every topic links an outcome and its lecture and lab hours sum to its contact hours; the matrix has a level in every linked cell; the references gap is flagged until supplied; the course file zip lists its parts and the manifest marks what is sample, not yet built or not included), `prove-materials` (fourteen packs render and unzip; four full and ten outline; unique titles, notes, 18 pt, alt text on the mark and the figures, the demo line on every content slide, the mark absent when `showMark` is false; the preview SVG lists the same slides as the file), `prove-surveys` (the definitions; the URL round trip; the booth collector's rules: one response per client id, the reader secret, booth responses excluded from reports; the importer on its fixture; the floor; the release rule), `prove-attainment` (the arithmetic on a hand-computed fixture with missing marks; no interval at a census; the FPC interval below N; the recomputation after a threshold change; the migration of a row without marks), `prove-diff` (word diff, deltas, the slide diff from two version snapshots, the not-comparable mark, the summary), `prove-judge` (every walk stop's `data-demo-id` exists on its screen; the host speaks at two stops only; the recap's numbers equal the records they cite). The four smokes gain the judge's page, the walk by keyboard, the course file download, the survey's booth round trip and the compare view at 320 px.
- `node mcp/sample.ts` regenerates the sample workspace from the tour's end state. The guide check after the section guides gain Judge, Recap and Institution. The contrast check with the partner-mark exception. The dash scan. The backup migration check. The bundle size measured in D8 (the DOCX writer, `jszip` and the comparison views behind dynamic imports like pptxgenjs).
- `docs/as-built.md` gains the Track C changelog and the dated verification table; `docs/claims.md` gains any figure a judge-facing surface shows that is not synthetic (the check count row changes by the check); `docs/lecturer-guide.md` regenerates; `README.md` gains the judge's page and the course file under the existing headings, with its screenshots untouched until D9. D8b, if time: `lyceum_course_record` and `lyceum_attainment` as read-only door tools, proved and described in `docs/doors.md` and `skills/lyceum/SKILL.md`.
- `CLAUDE.md`'s read order gains one line after item 1: this plan, and the four research notes it cites by name (D0); its rules gain the two clauses Section 0.2 item 4 and Section 3.2 propose, each only once the owner has approved it.

## 13. What goes stale, and the gated capture

### 13.1 Stale after Track C

The screenshots of Course, Teach, Learn, History and Courses; the film's capture (the screens inside it); the deck's slides 6 and 7 and their PNG exports if the owner takes Section 18 item 6; the brief's page with the pack; the poster's screenshots; `docs/presentation/pack/`; the README's hero and pairs. None is rebuilt before D9. Until then every one of them is a true record of the 22 October build and is labelled with that date where a date is shown.

### 13.2 D9, when the owner says go

One gate: the recording go (Section 0.2 item 1). The mark stays visible in every capture, because its publication was approved (Section 18 item 2). Then, in this order, each with its check, on the presenting laptop or the build machine: `npm run build`; `npm run shots` (the new screens replace the stale files; the README's seven copied); `npm run gen:sample-decks` with PowerPoint, which is also the clipping check for the packs; if item 6 says so, the deck's slides 6 and 7 edited to carry the before and after and the OBE table, then `npm run deck`, which checks every figure against the register; `node scripts/gen-brief-pdf.mjs`; `node scripts/gen-poster.mjs` (with the QR as today); `node video/capture/capture.mjs` (about seven minutes); `npm run render:loop90`, `npm run render:afternoon`, `npm run check:determinism` in `video/remotion/` (the capture and both renders took 37 minutes on 22 October, 14:21 to 14:58; the determinism check adds a second Loop90 render); copy the film into `deck/media/` and run `npm run deck` again. Machine time about one hour; allow half a day in all, for the owner's look at every screenshot, one corrective round and a second capture if a fault shows, and the playback test on the venue's player, which only a person can do.

## 14. Work packages, order and schedule

### 14.1 The days and the tiers

Computed, not guessed: 22 October 2026 is a Thursday; the run has Friday 23, Saturday 24, Sunday 25 and Monday 26; the freeze is Tuesday 27 at 12:00 Kuala Lumpur time or 24 hours before the flight, whichever is earlier (master plan 17.1; the flight is still unconfirmed in the competition file, and an early flight shortens Monday); the rehearsals are Monday 26 (booth script); the final is Thursday 29. Each tier ends with its own verification package, so the decision to start the next tier rests on a green run and not on a package scheduled later.

| Day | Package | Tier | Scope in one line |
|:--|:--|:--|:--|
| Fri 23 | **D0** The institution and the mark | 1 | The profile record, the mark pipeline and the checker exception, the brand row, the honesty line, `CLAUDE.md`'s lines, schema 6 scaffold |
| Fri 23 | **D1** The course record | 1 | The model additions, the CS310 sample record in both states, the Course screen, the course file zip with an honest manifest, `prove-course-record` |
| Sat 24 | **D2** The material | 1 | Sessions with slides (four full weeks, ten outline packs), the masters and the mark, the preview, three lab sheets, the brief, the rubric, `prove-materials` |
| Sat 24 | **D5a** Before and after, the core | 1 | `diff.ts`, the redline, the two-column table, the structural slide diff, the decision link, the static summary, `prove-diff` |
| Sun 25 | **D6a** The judge's way through | 1 | The judge's page, the walk with the host silent between its ends, the recap, `JUDGES.md`, `prove-judge` |
| Sun 25 | **D8a** Verification, Tier 1 | 1 | The suites table, the smokes, the sample workspace, the guide, the as-built table; the gate for Tier 2 |
| Sun 25 to Mon 26 | **D3a** The surveys, the core | 2 | The two instruments, the student page, the booth collector with the reader secret and the booth exclusion, the Microsoft Forms importer, the floor and the release rule, the sample responses, `prove-surveys` |
| Mon 26 | **D4a** Attainment | 2 | `attainment.ts` with the stated denominators and the census rule, the intake's marks without identifiers, the OBE report snapshot, the CQI note, the per-PLO listing, the prior-term file, `prove-attainment` |
| Mon 26 | **D8b** Verification, Tier 2 | 2 | D8a repeated, the booth script's new steps, the door's two tools if time |
| Mon 26, if time | **D5b**, **D6b**, **D3b**, **D7** | 3 | The dumbbell, swipe, scrubber, counters and slopegraph; the programme wall, the kiosk and the count-up; the paste code, the DOCX export and the two other importers; items, the lint, Moodle XML and the rubric export; then D8c |
| On the owner's go | **D9** Capture and render | gated | Section 13.2 |

Order inside the run: D0, D1, D2, D5a, D6a, D8a; then D3a, D4a, D8b; then the Tier 3 packages in the order D7, D5b, D6b, D3b with D8c after whatever lands. If Monday arrives with Tier 1 not green, Tier 2 is not started and D8a's table is what ships. The owner's wish for as many wow moments as possible is served first by Tier 1's four (the walk, the before and after, the branded pack with its preview, the course file), then by the survey moment, and only then by the decorative ones.

### 14.2 Dependencies

D1 needs D0 (the profile and the mark). D2 needs D1 (the schedule and the outcomes). D5a needs D1 and D2 (two versions, two generated packs). D6a needs D1, D2 and D5a for its stops and degrades honestly without D3a or D4a (the stop's line says "planned"). D3a needs D0 (the scale, the floor, the release rule) and D1 (the outcomes). D4a needs D0 (the threshold) and reads D3a's responses for the indirect column when they exist. D7 needs D1 (`misconceptions`); D1's manifest and D2's check for understanding say "not yet built (D7)" until it lands. D8 runs after each tier. D9 runs last.

## 15. Codex and the other tools

| Tool | Use it for in this track | Never for |
|:--|:--|:--|
| Claude Code (Opus) | Every package, the checks, the documentation, and the sample content only if Section 18 item 1 says so | A figure without a source; a reference it cannot verify |
| Codex CLI, `gpt-6-astra` at max reasoning, `--sandbox read-only`, the files embedded through stdin (the tool host fails under a non-elevated shell, so Codex reads nothing from disk) | Two reviews, each once: (1) this plan, run on 22 October and folded in; (2) the course record and the material as an external examiner would read them, after D2, if the owner says so. Saved under `docs/review/`, every claim verified before it is kept. The owner's Plus limit is five hours; a review that hits it is deferred, not retried | Writing code or content into the repository; anything sent without the owner's go in the session |
| ChatGPT image generation | Not needed: no new character and the mark exists | Production assets |
| ui-ux-pro-max | The compare views, the judge's page and the recap against the accessibility, touch and animation checklists; the review before D8a | Colours or type (fixed) |
| behavior-pro-max | The judge's page and the walk (ten steps, a first step of ten to twenty words, ungated), the survey's consent and floor | Urgency or scarcity of any kind |

The prompt used for review (1), kept here so review (2) follows the same shape, with the plan, the four notes, `docs/as-built.md` Sections 1, 2 and 6 and `CLAUDE.md` concatenated into one stdin file:

```text
codex exec --sandbox read-only -o docs/review/<name>.md "Review the Lyceum depth plan exactly as instructed in the text that follows on stdin; all files are embedded there. Write the review in plain Markdown with no en or em dashes." < <the stdin file> > docs/review/<name>-run.log 2>&1
```

The stdin file opens with the reviewer's brief ("You are a sceptical reviewer with ten years in a Malaysian university quality office and five judging education-technology finals ... Report, in this order: claims in the plan that the notes do not support, quoting both; places where the plan contradicts the as-built record or the operating brief; packages whose scope cannot fit the day given, with what to cut first; anything a quality office would call wrong about the course record, the surveys or the attainment arithmetic; what a judge would still find thin after this track, in three lines. No praise, no rewriting, no dashes.") and then each file under a `===== FILE: <path> =====` line.

## 16. Running it as one autonomous session

The protocol of master plan 17.5 applies with these changes: the order is Section 14.1's; the permissions granted in advance are the same (commit after every package with a plain message and no attribution trailer, install the npm packages this plan names, create and delete files inside the repository, run every check, smoke and generator that is not gated); the gated commands of Section 0.2 item 1 are added to the never list, along with "never edit a tour caption or reorder the tour, never send files to Codex except review (2) in Section 15 and only on the owner's go in this session, never put the UTP mark inside Lyceum's own lockup, a poster title or a booth banner headline". Decisions go to `docs/decisions.md` in the fixed shape; questions go to Needs the owner in `docs/run-log.md`; the run continues with the next package that does not depend on the answer.

**The driver prompt** (copy as one message; the owner's answers of 22 October are already in it):

```text
You are running Track C of docs/lyceum-depth-plan.md on your own. Read CLAUDE.md, then the depth plan in full, then docs/as-built.md Sections 1, 2, 5 and 6, docs/decisions.md from "12:00, after Track A" to the end, docs/competition/grand-final-2026.md, docs/review/astra-depth-plan-review-2026-10-22.md, and the four research notes the plan cites in Section 20, before anything else; re-read the plan's Section 16 and docs/run-log.md at the start of every package. Do not work from memory: when the plan and the code disagree about what exists, read the code and log the difference.

My answers to the plan's Section 18, given on 22 October 2026: item 1, who writes the sample content: you, the build session, as labelled fixtures, and CLAUDE.md gains the clause "sample fixtures may be written by the build session when labelled sample; a lecturer's own artefacts never carry model text". Item 2, the UTP mark: approved everywhere the plan places it, in the app, the pack and the published surfaces, labelled demo, with the contrast check's partner exception and its CLAUDE.md clause; our advisor confirmed the team represents the university, and docs/brand-use.md records that as the permission on file. The other items stand as the plan's defaults unless I say otherwise in docs/run-log.md.

Work through the packages in this order, one at a time, finishing and committing each before the next: D0, D1, D2, D5a, D6a, D8a (Tier 1); then D3a, D4a, D8b (Tier 2); then D7, D5b, D6b, D3b and D8c (Tier 3), stopping Tier 3 wherever Monday 26 October ends. Do not start a tier until the previous tier's D8 run is green. The session prompt in Section 17 is each package's specification. Do not stop between packages. You have my permission in advance, so do not ask: commit after every package with a plain message and no attribution trailer; install the npm packages the plan names (lz-string; nothing else without a decision logged); create and delete files inside this repository; run every check, smoke and generator that the plan does not gate.

Never: run npm run shots, node video/capture/capture.mjs, any Remotion render or the determinism check, npm run gen:sample-decks, npm run deck, node scripts/gen-brief-pdf.mjs or node scripts/gen-poster.mjs, or copy screenshots into the README (those are D9 and wait for my written go); edit a caption in src/demo/script.ts or reorder the tour; push to any remote; tag amsterdam-2026; spend money; send anything off this machine, including to Codex, unless I say so in this session; use a third-party skill without the SkillSpector scan; put the UTP mark inside Lyceum's own lockup, a poster title or a booth banner headline; change the main idea, the six steps, the palette, the honesty labels or the dates. Every sample record, slide, response and mark you ship is synthetic and is labelled so, and every surface that shows the UTP mark, content slides included, carries the demo line from the plan's Section 3.3.

Decisions: when the plan leaves a choice open or you meet one it did not foresee, decide it yourself if it stays inside the plan's rules, then log it in docs/decisions.md before moving on, in the shape the master plan's Section 17.5 gives: a dated heading with the package and the question; the options you considered, at least two, one line each with its trade-off; the one you chose and why, in two sentences; what would make me reverse it; the files to touch to reverse it. Stop and ask me only when a choice would change the main idea, the six steps, the palette, the honesty labels, the dates, money, credentials, anything leaving this machine, or a destructive action outside the repository; when a foundational check (typecheck, build, prove:all) still fails after three honest attempts; or when the plan contradicts the code in a way the plan does not resolve. Put every such question in the Needs the owner list at the top of docs/run-log.md, under a new Track C heading, and carry on with the next package that does not depend on it.

Progress: keep docs/run-log.md current under a Track C heading: one line when a package starts, one per check with its result, one when it ends, the Needs the owner list, and what is left. If this session is interrupted, the next session resumes from the first unfinished package in that file. After every package run its verification from the plan and fix what fails before committing; in each D8 run the full verification (typecheck, prove:all, build, the four smokes, the walk, the guide check, the contrast check, the dash scan, the backup migration check, the sample workspace check, the bundle size) and write the dated table into docs/as-built.md under a Track C heading, with the stale list from the plan's Section 13.1 beside it. No en or em dashes anywhere: code strings, docs, slides, captions, commit messages. Finish with a report of what shipped by tier, the Needs the owner list, every decision logged, and the exact D9 commands waiting for my go.
```

## 17. Session prompts for Opus

Each assumes the repository root, the driver's rules, and that the previous package is committed.

**D0, the institution and the mark**

```text
Read docs/lyceum-depth-plan.md Sections 0, 3 and 11, docs/brand-use.md, src/theme/tokens.ts, scripts/contrast-check.mjs, src/lib/workspaceBackup.ts, scripts/check-backup-migration.mjs and src/data/seed.ts. Add InstitutionProfile to src/types.ts and the store with the demo values in the plan's Section 3.1, showMark included and true, editable on the Guide page by a coordinator, saved in the workspace and the backup at schema 6 (LATER_DEFAULTS, the migration check restoring 3, 4, 5 and 6). Write scripts/gen-partner-marks.mjs that copies utp.svg to public/brand/partners/utp.svg and rasterises it with puppeteer-core to utp-1024.png and utp-256.png, with --check; add the partner exception to the contrast check's part 3 with a comment saying why, and prove the check still fails on a planted hex elsewhere. Add two clauses to CLAUDE.md's rules, both approved by the owner on 22 October: "sample fixtures may be written by the build session when labelled sample; a lecturer's own artefacts never carry model text" and "third-party marks under public/brand/partners/ keep their owners' colours and are never used for Lyceum's own surfaces". Add the UTP row to docs/brand-use.md as Section 3.2 specifies, with the advisor's confirmation as the permission on file. Add the demo line of Section 3.3 as one exported string in src/data/sample-course/index.ts, and one line to CLAUDE.md's read order after item 1 naming docs/lyceum-depth-plan.md and the four notes in the plan's Section 20. Do not show the mark anywhere yet. Verify with npm run typecheck, npm run prove:all, node scripts/contrast-check.mjs, node scripts/check-backup-migration.mjs and npm run smoke:workspace.
```

**D1, the course record**

```text
Read docs/lyceum-depth-plan.md Sections 1, 3, 4 and 11, docs/research/course-records-and-surveys-2026-10-22.md in full, src/types.ts, src/lib/curriculum.ts, src/ui/screens/CourseWorkspace.tsx, src/ui/screens/CurriculumWorkspace.tsx, src/data/seed.ts, src/demo/script.ts (the Course and Update steps; do not change a caption or a typed value) and scripts/demo-smoke.mjs. Extend CourseDefinition, CourseOutcome, CourseTopic, AssessmentComponent, Rubric and Programme exactly as Section 4.2 lists, every field optional with a default on restore, and validateCourseDefinition with the new checks (SLT as Section 4.3 states, in both states; weights and allocations sum; every outcome assessed; a level on every linked matrix cell; lecture plus lab equals contact hours per topic). Write src/data/sample-course/cs310.ts: the structure, and the content in Section 4.3 in your own words, credited in a source line and labelled sample (the owner's answer to Section 18 item 1). CLO5 keeps its id and label; the four new outcomes are CS310-1 to CS310-4; the before state allocates 53 of 56 contact hours so the tour's added topic fits; references as Section 4.3 says, with the gap flagged. Seed CS310 with it as the current version's definition so the Course screen shows it before any revision, decide the added topic's default week and split and log it, and keep every data-demo-id the tour and the smokes use. Rebuild the Course screen as Section 4.4 orders it, with the matrix as a heat table carrying the level in text in every cell, the SLT bar with the unallocated hours, the schedule rows and the course-file export built with jszip, the manifest in EAC order marking present, sample, not yet built (naming the package) and not included. Write src/prove-course-record.ts with the checks in Section 12 and register it. Verify with npm run typecheck, npm run prove:all, npm run build, npm run smoke and npm run smoke:curriculum.
```

**D2, the material**

```text
Read docs/lyceum-depth-plan.md Sections 3, 5 and 12, docs/research/slides-items-and-surveys-tech-2026-10-22.md Sections 1, 2 and 6, src/lib/slides.ts, src/prove-slides.ts, scripts/gen-sample-decks.mjs (read only; do not run it), src/ui/screens/CourseWorkspace.tsx and src/data/sample-course/cs310.ts. Add slides and labSheet to TeachingSession with defaults on restore. Write src/data/sample-course/sessions.ts: fourteen sessions; full slides for weeks 1, 6, 7 and 12 (six to nine each, a title, bullets and notes in a lecturer's voice); the other ten as outline packs the generator builds from the topic record and labels; lab sheets for weeks 1, 6 and 7; the project brief at week 8; all labelled sample (the owner's answer to Section 18 item 1). Give slides.ts a Brand record and five slide masters through defineSlideMaster as Section 5.2 specifies: the mark from public/brand/partners/utp-1024.png when the profile's showMark is true, on a white plate on the title master and top right on the content master, with altText; the demo line in the content master's footer; Calibri; body 18 pt or larger; objects in reading order; shapes through the pres.shapes constants; notes on every slide; build sessionDeck from the saved slides first and keep the evidence slide. Write src/ui/primitives/DeckPreview.tsx drawing a DeckSpec to SVG at 960 by 540 with the same layout rules, used for the thumbnail on each session card and the filmstrip behind Preview the pack, with the sentence that PowerPoint draws the file. Write src/prove-materials.ts: fourteen packs unzip, four full and ten outline, unique titles, notes, 18 pt, alt text on every image, the demo line on every content slide, the mark present or absent as showMark says, and only if the XML shows the malformed parts of pptxgenjs issue 1449 add a repair pass and prove it. Verify with npm run typecheck, npm run prove:all, npm run build and npm run smoke.
```

**D5a, before and after, the core**

```text
Read docs/lyceum-depth-plan.md Section 6, docs/research/before-and-after-patterns-2026-10-22.md Sections 1, 3 and the ten patterns, src/lib/curriculum.ts (curriculumChanges), src/ui/screens/CurriculumWorkspace.tsx, src/ui/primitives/loop.tsx, src/theme/tokens.ts and src/lib/slides.ts. Write src/lib/diff.ts with wordDiff, topicDeltas, deckDiff, resultDeltas (with the not-comparable mark when an outcome's wording differs between the two versions) and changeSummary, pure and proved in src/prove-diff.ts. Write src/ui/primitives/compare.tsx with Redline (strikethrough in the danger token and insertion in the emerald text token, hidden deleted and inserted labels, Hide changes), TwoColumn with the delta in text and the unchanged assessment plan named as unchanged, SlideDiffList (the structural list highlighting the region on the DeckPreview thumbnail, the two specs generated from each version's outcome snapshot) and ChangeSummary as static text. Place them as Section 6.2's first table says: Update's check panel, History (each version naming and opening the decision that authorised it through the decision-recorded and version-adopted events, or saying no decision on record) and Teach (the week 6 pack's changed slides). Colours only from tokens; nothing animates. Leave the dumbbell, the swipe, the scrubber, the counters and the slopegraph for D5b. Verify with npm run typecheck, npm run prove:all, npm run build, npm run smoke:curriculum and the 320 px layout in npm run smoke:workspace.
```

**D6a, the judge's way through**

```text
Read docs/lyceum-depth-plan.md Sections 0.2 (rule 7), 2, 9 and 12, docs/research/judge-experience-and-wow-2026-10-22.md in full, src/demo/runner.ts, src/demo/script.ts (do not edit a caption), src/ui/screens/Landing.tsx, Guide.tsx, Inbox.tsx, LoopGraphic.tsx, src/ui/mascots/index.tsx, src/app/sectionGuides.ts, src/app/routes.ts, src/data/proof.ts, JUDGES.md and docs/demo-script.md. Build the judge's page at #/judge as Section 9.1 item 1 specifies, with Tualang greeting, the three buttons, the register's four figures as static text, and the What is not built card from REMAINING_WORK word for word. Add a guided mode to the runner that waits for Next, Back or Escape, with a spotlight and the app's own caption at each stop, and write src/demo/walk.ts with the ten stops in Section 9.1 item 2, each caption at most twenty words with the honesty label where one applies; Tualang's corner card speaks only at the first and the last stop and otherwise shows the stop number and Next; the walk restores the sample workspace first the way the tour does. Build the term recap at #/course/:id/recap from records only, printable at A4, with Tualang reflecting and silent. Rewrite JUDGES.md to open with Tualang and the numbered things to try, and add the three new steps to docs/demo-script.md with their checks. Write src/prove-judge.ts (every stop's data-demo-id exists on its screen; the host speaks at two stops only; the recap's numbers equal the records they cite) and extend the smokes with the judge's page, the walk by keyboard and 320 px. Leave the programme wall, the kiosk and the count-up for D6b. Verify with npm run typecheck, npm run prove:all, npm run build, npm run smoke, npm run smoke:integrity and npm run smoke:workspace.
```

**D3a, the surveys, the core**

```text
Read docs/lyceum-depth-plan.md Sections 3, 7 and 11, docs/research/slides-items-and-surveys-tech-2026-10-22.md Sections 4 and 5 and docs/research/course-records-and-surveys-2026-10-22.md Section 3, server/index.ts, src/agents/intakeLocal.ts, src/ui/screens/Upload.tsx, src/ui/screens/Learn.tsx, scripts/gen-demo-files.mjs and src/data/sample-course/cs310.ts. Add SurveyDefinition and SurveyResponse to the types, the store and schema 6; build the two instruments from the course record and the profile as Section 7.1 specifies (the cannot-say option, per-item n, the demo-instrument label on the SSRT), with the question id in each question's text. Install lz-string and build the student page at #/survey/<form> (the form in the URL fragment, the mark in the header when showMark is true, the consent and controller lines, the comment warning, a random client id, 320 px) and the booth collector in server/: POST /api/survey/:formToken, append-only, in memory, one response per client id, no identifiers; GET /api/survey/:formToken/responses?reader=<secret> with the reader secret generated with the form and held in the workspace; Collect on the Learn screen; a plain link to the laptop's address, or a QR only if you log the decision to add the qrcode package. Booth responses carry source booth, show in their own panel and are excluded from the OBE report and the recap by rule and by proof. Write the Microsoft Forms XLSX importer through the xlsx dependency, dropping Name and Email and duplicate rows, matched on the question id. The floor (a count and a share, the stricter applied), the grades-released event and the release rule that hides every result for the term, aggregates and comments alike, until it is recorded. Extend scripts/gen-demo-files.mjs to write the sample responses as a Microsoft Forms style XLSX and seed the prior term's two surveys as sample for a term recorded as released. Write src/prove-surveys.ts. Verify with npm run typecheck, npm run prove:all, npm run build, npm run smoke:workspace and a curl round trip against the local API recorded in the run log.
```

**D4a, attainment**

```text
Read docs/lyceum-depth-plan.md Sections 3, 8 and 11, docs/research/course-records-and-surveys-2026-10-22.md Section 2, docs/research/statistics-2026-10-22.md Sections 1 and 2, src/lib/learn.ts, src/lib/evidence.ts (wilsonInterval), src/agents/intakeLocal.ts, src/ui/screens/Learn.tsx, src/data/seed.ts and scripts/gen-demo-files.mjs. Write src/lib/attainment.ts as Section 8.1 specifies: the stated denominators, no interval at a census, the finite-population interval below N, the two shares in points for direct beside indirect, the per-PLO listing with no index, and no UAEU variant; prove it in src/prove-attainment.ts against a hand-computed fixture with missing marks, and prove the recomputation after a threshold change. Extend the intake to keep the sorted valid marks, the missing count and the pass mark at filing per outcome and never an identifier; extend ResultUpload rows; a row without marks shows the sentence in Section 8.2. Extend scripts/gen-demo-files.mjs to write results.xlsx with five outcome columns for 38 synthetic students, three without a mark on one outcome, and results-prior.xlsx for the prior term; seed the prior file as a labelled, never-counted example. Build the OBE course report panel on Learn as Section 8.3 specifies, stored as a snapshot with the version id, the threshold, the method and the survey definition id, with the CQI note as a saved record shown in History, and keep the learning-gain sentence; shrink the planned list as the plan says. Verify with npm run typecheck, npm run prove:all, npm run build and npm run smoke.
```

**D7, items and exports**

```text
Read docs/lyceum-depth-plan.md Section 10 and docs/research/slides-items-and-surveys-tech-2026-10-22.md Section 3, src/data/items.ts, src/app/store.ts (generateTestItems, read only), src/data/sample-course/cs310.ts and src/ui/screens/CourseWorkspace.tsx. Write src/lib/items.ts: the templates per Bloom level with the Arkansas verbs, distractors from the topic's misconceptions, the surface lint with each rule named and the sentence that it cannot judge the key or the distractors, items drafted for review and never approved by the app, and writers for Moodle XML (multichoice, shortanswer, essay with the elements the note lists, UTF-8, the declaration alone on line 1, labelled not yet imported into a Moodle), QTI 2.1 (validated against the 1EdTech schema only if it is already on this machine, otherwise labelled unvalidated) and the rubric to XLSX. Put the items on the session card under Check for understanding with the lint beside them and Export for Moodle (.xml); write the week 7 quiz into the sample with ten drafted items that pass the lint, labelled sample and drafted, not reviewed, until a person on the team marks them reviewed. Leave the sandbox's test-draft flow as it is. Write src/prove-items.ts with a well-formedness check of the XML. Verify with npm run typecheck, npm run prove:all and npm run build.
```

**D5b, D6b, D3b** (Tier 3, each only if Monday has time; one prompt each, written by the session from Sections 6.2, 9.1 and 7.2 with the same verification lines as their core packages, and logged as a decision before it starts)

**D8, checks and documentation** (D8a after Tier 1, D8b after Tier 2, D8c after Tier 3)

```text
Read docs/lyceum-depth-plan.md Sections 12 and 13, docs/as-built.md, docs/claims.md, docs/doors.md, docs/demo-script.md, JUDGES.md, README.md, src/data/suites.ts, src/app/sectionGuides.ts, mcp/server.ts and mcp/sample.ts. Register every new suite in prove:all and the suites table with its measured count; extend the four smokes and the walk for the new routes; regenerate the sample workspace with node mcp/sample.ts; regenerate the section guides and the lecturer guide; update the claims register for any non-synthetic figure a surface shows and let prove-journey confirm the check count; refresh README.md and JUDGES.md text under the existing headings without touching a screenshot; verify the course file's manifest against what has shipped. In D8b only, and only if time remains after the verification: add lyceum_course_record and lyceum_attainment to the door, read-only, proved in src/prove-mcp.ts and described in docs/doors.md and skills/lyceum/SKILL.md. Run the full verification (typecheck, prove:all, build, the four smokes, the walk, the guide check, the contrast check, the dash scan, the backup migration check, the sample workspace check, the bundle size) and write the dated table into docs/as-built.md under a Track C heading with the stale list from Section 13.1 beside it. Do not run any gated command.
```

**D9, capture and render** (only after the owner's written go in the session)

```text
The owner has said go. Read docs/lyceum-depth-plan.md Section 13 and docs/as-built.md's Track C table. The mark stays visible: its publication was approved. Run npm run build; npm run shots and copy the README's seven; npm run gen:sample-decks with PowerPoint, reading every slide back for clipping; if Section 18 item 6 says so, edit deck/index.html so slide 6 carries the before and after (the redline and the hours table from the new screenshots) and slide 7 the OBE table beside the survey, every figure a claims row or labelled synthetic on the slide, and, if the owner asks for it in the run log, the UTP mark beside the team's name on the closing slide and the poster's team line, never in a title; then npm run deck and read the PDF back; node scripts/gen-brief-pdf.mjs; node scripts/gen-poster.mjs; node video/capture/capture.mjs; in video/remotion, npm run render:loop90, npm run render:afternoon and npm run check:determinism; copy the film into deck/media and run npm run deck again. Stop after the screenshots and show me the list before the film is captured. Record every command, its duration and its result in docs/run-log.md and the as-built table, and list what the owner must still test on the venue's player.
```

## 18. Needs the owner, before the run

1. **Who writes the sample content.** Writing it in the build session is a rule change, not a reading of the rule (Section 0.2 item 4). The choices were: (a) the build session writes it as labelled fixtures, and CLAUDE.md gains the clause "sample fixtures may be written by the build session when labelled sample; a lecturer's own artefacts never carry model text"; (b) the team writes it, so the run builds the structure and marks the content "to be written by the lecturer"; (c) the structure only, with the demo revision's material filled by the session. **Answered: (a), the owner, 22 October 2026, evening**, following the recommendation (the deadline is four days away and every earlier fixture in the repository was written the same way). The four full weeks of slides are the ceiling for Saturday.
2. **The UTP mark.** In the app's sample material and the pack, with the contrast check's partner exception and the CLAUDE.md clause of Section 3.2, and on the published surfaces (the screenshots, the deck, the poster, the film). **Answered: yes to all of it, the owner, 22 October 2026, evening, on the advisor's word**: the team represents the university, and an earlier student's team used the mark the same way with the advisor's agreement. `docs/brand-use.md` records that as the permission on file (D0); `showMark` stays true at D9.
3. **The booth collector.** Recommended: the local API on the booth laptop over the team's own hotspot, no third party, with the reader secret and the booth exclusion (Section 7.2). Alternative: a Cloudflare Worker on your account (free tier, sends responses off the machine). Choose.
4. **Hardware.** A second screen on a stand (the research's packing list), and a thermal printer for printed receipts (optional, only if one is to hand). Choose.
5. **The record day.** D9 runs only on your word; the best moment is after Tier 2 lands and you have seen the screens, which the schedule puts on Monday 26; allow half a day. Say when.
6. **The deck.** Slides 6 and 7 can change at D9 to carry the before and after and the OBE table; the receipt on slide 1 and the five figures do not change. Confirm, or keep the deck as it is and show the new screens only in the booth.
7. **Open from Track A.** TRL 6 or TRL 5 (run-log item 4), the pitch's opening order (item 5), the GitHub description (item 6), the Claude Desktop run (item 2), the flight time that sets the freeze.
8. **References.** Two or more references under five years old for CS310, from the team's lecturer, so the record meets its own rule; until then the gap is flagged.

## 19. Risks, and what stays thin

| Risk | Why it matters | Guard |
|:--|:--|:--|
| The sample course breaks the tour | The tour targets `data-demo-id`s and types fixed values into fields that D1 redesigns; a full contact-hour budget would make the tour's added topic fail the check | D1 keeps every id, leaves 3 hours unallocated, and runs `npm run smoke`; captions and typed values untouched |
| Four days is not enough | D2's content and D5's views are the long ones | Tiers with a verification package closing each; the cuts named in Section 14.1; Tier 3 is optional by design |
| The 500 kB bundle advisory grows | The compare views, the preview and the writers add code | `jszip`, the DOCX writer and the comparison views behind dynamic import like pptxgenjs; measured in each D8 |
| The contrast check and the partner mark | A third-party SVG carries non-token colours, and the check scans every tracked SVG | A stated policy exception, approved by the owner or not done at all (Section 3.2) |
| pptxgenjs issue 1449 | String shape presets write invalid XML | Shape constants; the proof reads the XML; the repair only if the proof finds the fault |
| Personal data in a real survey run | Comments and paste channels can identify a student; a reader route without a secret exposes raw responses | No identifiers stored; the reader secret; the comment warning; the release rule on every result; the controller line; the policy note is Track B's `docs/learning-analytics-policy.md` |
| Booth answers mistaken for evidence | Judges are not the cohort | `source: "booth"`, a separate panel, excluded from the report and the recap by proof |
| Realism of the course record | A quality officer on the panel will know a thin course file | The EAC and MQA lists in Section 4.1; the external examiner review by Codex after D2 if the owner allows it; the manifest that names its own gaps; no accreditation claim anywhere |
| The threshold reads as UTP's rule | It is one faculty's published practice, not a UTP document | The profile's help text and the research note say so; the threshold is a setting and every report records the one it used |
| Someone records anyway | The owner's credit and time | The gate in the driver prompt's never list; D9 is the only package that names those commands |

**What stays thin after this track, in the Codex review's words and ours.** No real lecturer or quality office has run a real course through the loop; no measured evidence shows better decisions, less staff work or improved learning; the buyer, the pilot's purchase decision and the campus deployment stay behind one synthetic course. Those are Track B's pilot (B9), the interviews (B10) and the commercial slide the pitch review asked for, and every surface keeps saying so.

## 20. Sources

The four research notes written for this plan on 22 October 2026, each with its URLs and source keys:

- [research/course-records-and-surveys-2026-10-22.md](research/course-records-and-surveys-2026-10-22.md): the course file lists (EAC 2020 and 2024, MQA GGP AOSL 2023, GGP PDD 2023, UTM 2026, MQF 2024, UTHM's template, UTP's handbook, ABET, AUN-QA, Lancaster); attainment (UTHM 2024, UAEU, Derouich 2025, Hamid 2016, CLOAP, ABET, AACSB); the surveys (UTP's SSRT mention, Awang 2012, UiTM SuFO, SEEQ, Nulty through Ahmad 2018, Rutgers, the Forms and Moodle exports); the CS310 content models (GWU DATS 6401, UW-Madison, CCBC, Columbus State, MSU Texas, Anurag, BTAA).
- [research/before-and-after-patterns-2026-10-22.md](research/before-and-after-patterns-2026-10-22.md): diff and compare UX (GitHub, Google Docs, Word, Notion, Figma, Confluence, PowerPoint, Pitch, Gamma), change charts (slopegraph, dumbbell, FT, Gleicher, Heer and Robertson, Bostock, WCAG 2.2.2 and 2.3.3, Chartability), curriculum systems (CIM, Curriculog, Kuali, Coursedog, committee forms), scrubbers, slide diffs, wow patterns (Juxtapose, WCAG 2.5.7, View Transitions, Duarte, NN/g).
- [research/slides-items-and-surveys-tech-2026-10-22.md](research/slides-items-and-surveys-tech-2026-10-22.md): pptxgenjs 4.0.1 (masters, images, charts, limits, issue 1449, thumbnails), alternatives, QTI 3.0 and 2.1, Moodle XML, the Arkansas verbs, Haladyna 2002, the VALUE rubrics' licence, survey collection (Microsoft Forms, Google Forms API, lz-string, QR, Formspree, Apps Script, Cloudflare), imports, anonymity and consent (McGill, McLennan, UNC Charlotte, Ruhr, Edinburgh Napier, PDPA 2024, UTP's notice), institutional templates and the Accessibility Checker rules.
- [research/judge-experience-and-wow-2026-10-22.md](research/judge-experience-and-wow-2026-10-22.md): tours (driver.js, Navattic, Arcade, kiosks, Duo), what wins (one judge's notes, Wharton, Imagine Cup), booths, honest wow mechanics, mascot presence (GitHub, Mailchimp, Duolingo, Atlassian, Headspace), live demo sites, the ranked fifteen; and the format check (the awards on 30 October per the official site; ITS's report of ten plus five), recorded as unconfirmed in the competition file.

Earlier notes still in force: [research/statistics-2026-10-22.md](research/statistics-2026-10-22.md) for the intervals, the finite population correction and the perception gap; [research/hackastone-and-competitors-2026-10-22.md](research/hackastone-and-competitors-2026-10-22.md) for the readiness levels.

## Changelog

- 22 October 2026, evening: first draft, written from the code and the four notes.
- 22 October 2026, later: revised after the Codex review ([review/astra-depth-plan-review-2026-10-22.md](review/astra-depth-plan-review-2026-10-22.md)). Verified and folded in: the attainment heading and the Section 1 wording no longer claim a universal method; the H, M and L weighting and the PLO index are dropped for a per-PLO listing; the collection order is stated as the booth's choice, not the note's; the response floor carries both McLennan's count and McGill's share; the release rule covers every result, not only comments, as McGill and Rutgers say; Nulty's figures are context from a secondary source, not a standard; the judging "three tests" are this plan's framing and the named-weakness effect is one judge's note. Rule conflicts: sample content authorship is now a stated rule change for the owner (Section 0.2 item 4, Section 18 item 1); the partner-mark colour exception is a stated rule change (Section 3.2, item 2); the demo line sits on every content slide; the recording gate names what it exempts; D9 checks the mark's publication gate separately with `showMark`; the host speaks at two stops only. Schedule: a verification package closes each tier; D1's zip grows with an honest manifest; D2 drops to four full weeks and ten outline packs; D5, D6 and D3 split into core and optional parts; the UAEU method and the PLO index are cut; D7 is last and its outputs are marked not yet built until it lands; D9 allows half a day. Quality office: the demo's frame is MQA with EAC's list as the checklist and no accreditation claim; one verb per outcome and CLO5 stays Apply; the baseline has no dashboard topic so the revision changes hours, a topic and a pack, and says the assessment plan is unchanged; assessment allocations by CLO and Bloom level with marks; rubric criteria with marks and CLO ids and an individual defence; lecture and lab hours per topic and the essay in the SLT; the lint is a surface check and items are drafted for review; Moodle XML labelled not yet imported; alt text and the clipping check at D9; the SSRT labelled a demo instrument with anchors and a cannot-say option; the reader secret, the comment warning and the controller line; booth responses excluded from evidence and counted by distinct client id; marks kept without identifiers with the threshold at filing, so a threshold change recomputes honestly; stated denominators; no interval at a census; direct and indirect as two shares in points; CLO5 marked not comparable across terms; the OBE report stored as a snapshot. Not changed: the Section 1 rows stand on the files they name, which the review could not see; the sentence a judge should repeat stays as the track's aim. Added: Section 19's "what stays thin", from the review's last three lines.
- 22 October 2026, evening, last: the owner answered the two blocking items (Section 18 items 1 and 2: the build session writes the sample content as labelled fixtures; the UTP mark is approved in the app, the pack and the published surfaces, on the advisor's word). The mark's publication gate is removed from Sections 3.1, 3.2, 13.2, 16 and the D0, D1, D2, D7 and D9 prompts; the driver prompt carries the answers. Status: approved to run.
