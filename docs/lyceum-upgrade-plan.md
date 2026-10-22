# Lyceum: the upgrade plan

**Stamp.** Written 22 October 2026 for the Opus build sessions and the Lyceum team. It supersedes the product direction in [lyceum-improvement-plan.md](lyceum-improvement-plan.md) Sections 1 to 29 wherever the two differ; that file keeps its dated execution records (Section 30) and its work-package numbers W00 to W17, which this plan cites. The evidence behind every claim here is in five research notes dated 22 October 2026 in [docs/research/](research/).

**The calendar.** The HACKaSTONE 2026 Grand Final is on 29 October 2026 in Amsterdam, inside the AI for Education Netherlands 2026 conference (the organiser's Grand Final page; the team letter of 13 October names Lyceum as a finalist team of eight from UTP). Format: at most 8 minutes of presentation plus 2 minutes of questions in front of one judge team, then at most 10 minutes of demonstration including questions at the team booth in front of another. The briefing slide photographed on 22 October gives Innovation 30%, Technology Readiness 20%, Commercial Viability 15%, Education Significance 15%, Presentation 10%, Demo 10%, marked "to be firmed". Media are PowerPoint and video. Confirm the date against the ticket and the weights against the finalist pack; nothing else in this plan changes if they move.

**Two tracks.** Track A ships and freezes before the flight (code freeze Tuesday 27 October at 12:00 Kuala Lumpur time, or 24 hours before the flight if that is earlier; 23 October is a Friday, so the build days are Friday to Monday). Track B is the rest of the overhaul, built after Amsterdam, in the order the pilot needs. Everything the owner asked for is in one of the two; nothing has been dropped.

---

## 0. Read this first

### What this plan is

One plan for the overhaul of the look, the flow, the story, the maths, the doors, the pitch, the booth demo, the video and the documentation. The main idea does not change: a lecturer turns real employer evidence into a course decision with receipts, and nothing changes a course without a person. What changes is that the whole product now runs on one storyline, one visual system, one honest set of numbers, and one architecture that reaches the tools universities already use.

### Rules that bind every session

1. **Honesty labels.** Real, prototype, illustrative, planned. Synthetic data says synthetic on screen. A door says "planned" until a pilot tenant runs it. Every number on any surface has a source in `docs/claims.md` (Section 18).
2. **No en or em dashes anywhere:** UI text, docs, captions, commit messages, slides. Use commas, colons, periods or "to".
3. **The palette and the type are fixed** (Section 6). No new hex values outside the token file. Lime is for emphasis only.
4. **Fonts are bundled**, never fetched at runtime. The demo must work with the venue wifi down.
5. **No model-written text inside shipped artefacts for Amsterdam.** Packs, briefs, decks and the video carry saved data or the team's words. Model streaming stays optional, labelled, and never moves a number. After the pilot, Track B's model drafts (B7) are allowed only line by line under a lecturer's review and labelled as drafts.
6. **Verify before claiming.** `npm run typecheck`, `npm run prove:all`, `npm run build`, the four smokes and `node scripts/generate-guide.mjs --check` pass before any sentence says "works".
7. **Commit only when the owner asks.** The team repo is reached only through `node scripts/team.mjs`.
8. **Third-party skills are scanned** with SkillSpector before first use (brag, remotion-dev/skills, anything else). The house rule is in the global CLAUDE.md.
9. **Mascots never appear on errors, billing or security moments**, and nothing animates unless a real request is running or a real record changed.
10. **One primary action per screen.** The explanation lives behind a disclosure.
11. **Read, do not recall, and do not assume.** Every session opens the references before it acts: this plan (Sections 0, 4, 4.1, 4.2, 6, 7, 17), [docs/competition/grand-final-2026.md](competition/grand-final-2026.md) for the date, format and criteria, [docs/design/colour-scheme-2026-10-22.png](design/colour-scheme-2026-10-22.png) for the palette and type, the research notes for every figure, DECISIONS.md for the reasons, and the code a package touches, in full. If a fact is not in those files or in the code, say so and verify or ask; never fill the gap from memory or from an earlier conversation. Weekdays are computed, counts come from running the command, hex values come from `tokens.ts`. The root `CLAUDE.md` repeats this so every AI session in the folder loads it.

### How to use it with Opus

One package per session. Each package in Section 17 names the files, the acceptance test and the verification command. The session prompts in Section 17.6 are copy-ready. Start every session by reading this file's Sections 0, 4, 6 and the package, then the files the package names. End every session with the verification table filled in and a dated line in `docs/as-built.md`.

### Reviewed

Codex (`gpt-6-astra`, max reasoning effort, read-only, with the plan and the research notes embedded) reviewed this plan on 22 October; its report is `docs/review/astra-upgrade-plan-review-2026-10-22.md`. Kept after verification: the weekday correction (23 October is a Friday), the decision lifecycle and per-term scoping, the append-only event log, the stale collection copy in the Evidence screen, the contrast and large-text corrections, the token and licence wording, the restraint rule for working screens, static rest for the characters, the realistic order of sacrifice, the purchase hypothesis and the causal framing of Learn. Not kept: dropping the loop rail or the characters (the organizer asked for personas and the owner decided), and the claim that the figures from the 11 October note are unsupported (that note was not in its input; the figures are sourced there).

---

## 1. Where we stand on 22 October

| Area | State |
|:--|:--|
| Verified build | 11 October: typecheck, 160 checks across fourteen suites, build, four browser smokes, the full-tour demo, the guide check. Nothing committed since 26 July; 99 modified or untracked paths carry the whole October workspace. Local `main` is two commits behind `origin` (the house-style README). |
| Team branch | `feature/evidence-snapshots` on the team repo (21 October, about 620 lines): frozen evidence snapshots, change over time, an `EvidenceWatch` panel, a proof suite. **Reviewed on 22 October: green.** On a scratch checkout, typecheck, all 166 checks (the six new snapshot proofs included), the production build and the full-tour demo smoke pass. The design follows the house rules: a snapshot is never edited, a change is called only when two 95% Wilson intervals do not overlap, a skill not looked for is "not comparable" rather than zero, postings are matched across windows by board posting id, backups move to schema 4 with consistency checks and older schemas still restore, and the brief gains a "Changes since" section. It is the Watch step's "over time" half (Section 4, B1). Take it with `node scripts/team.mjs take feature/evidence-snapshots` and fold four follow-ups into A2a: move the panel into the Watch screen; update the Evaluation suites table (166 checks, fifteen suites); let the demo tour freeze a snapshot so the feature is visible; replace the arrow glyphs in the coverage column with words. Consider requiring a reason to remove a snapshot once a brief cites it. |
| The organiser's review (14 October) | Idea solid and on theme; fellowship applied for. Asks: less text and more graphics with mascots and personas (W15); the problem at Asia and world level (R1); one storyline across app, demo and pitch (W16); a benchmark for the mock cohort against the SSRT and CLO surveys (W17); the platform answer built, not said (W14). |
| The field | The finalists announced 12 to 14 October are almost all learner-facing tutors (an emotional-support agent, a humanoid tutor, a sign-language learner, a learning-by-teaching app). Lyceum is the only lecturer-facing decision tool in the list we found. That is the positioning. |
| Design direction | The colour scheme poster from a teammate (`docs/design/colour-scheme-2026-10-22.png`: forest, electric lime, emerald, mint mist, white, with supporting tints, on-dark colours, text colours, mascot shadows and the prism rays) and the type (Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono) are decided and audited against WCAG 2.2 (`docs/design/colour-scheme-audit-2026-10-22.md`). |
| Tooling on the machine | Node 24.14, npm 11, ffmpeg 8.1, Python 3.12, uv, SkillSpector, gh, Chrome and Edge, Playwright in the Amanah demo folder, the Dataworks Remotion project and its style guide on disk, the Shenzhen brag intro pipeline on disk. The web workspace already generates its README art, its brief PDF and its screenshots from code. |
| Skills | ui-ux-pro-max 2.5.0 is installed (with sibling skills brand, design-system, slides, ui-styling) and behavior-pro-max. "Impeccable" is not installed on this machine and could not be verified online this turn; if the owner has a link, it is scanned before use. |

---

## 2. The thesis, restated for the world

### 2.1 From "Malaysia's mismatch" to "curriculum latency"

The problem is not that one country's graduates are mismatched. The problem is latency: the time between what employers ask for and what a classroom teaches, in an age when the asks move faster than the approval cycle.

**The cycle is slow everywhere.** New-programme approval "generally requires twelve to eighteen months" (Wayne State) and "can take up to 18 months" (Texas Tech); a course change takes "four to six months" even without external approval (Indiana). A UK programme must be approved "at least 12 months before it is implemented" (Regent's) and validated "no later than 12 months prior" (Northampton). Singapore's universities review curricula through advisory boards "every two to five years" (MOE, 2022). Malaysia's cycle runs three to five years in practice (a UiTM study, secondary, in the 11 October research note). Sources: [curriculum-latency-global-2026-10-22.md](research/curriculum-latency-global-2026-10-22.md), Section 1.

**The asks move fast, and AI is the accelerant.** 39% of workers' skills will be transformed or outdated between 2025 and 2030 (WEF, over 1,000 employers in 55 economies). 32% of the skills required for the average job changed between 2021 and 2024 (Lightcast, vendor). Skills requirements evolve 66% faster in AI-exposed jobs (PwC, vendor). The half-life of a learned skill is estimated at five years and shorter for technical skills (IBM, vendor). Section 2 of the same note.

**So a course approved this year was designed on last year's evidence and will be taught until the next review.** By the time a change lands, the tools, libraries and roles it was written for may have moved. That is the "future" argument the owner asked for: Lyceum is built for a world where the review has to run every semester, not every cycle, and where the evidence must carry its date.

**The outcome is visible worldwide.** 52% of US bachelor's graduates are underemployed a year after graduating and 45% ten years on (Strada and Burning Glass). EU over-qualification is 21.4% (Eurostat, 2024). About one in five employed English graduates works in medium or low-skilled jobs (computed from the DfE rates). The OECD counts 23% of workers overqualified. Australia reports a decline in professional employment since 2022 (QILT). India's graduate employability index is 42.6% (vendor). Malaysia's skill-related underemployment is 32.2%, 1.60 million people (DOSM). Section 4.

**The rule already exists; the evidence is what is missing.** ABET Criterion 2 and 4, AACSB 4.1 and 4.2, AUN-QA 1.4 and 2.7, the UK Quality Code's external expertise guidance, Australia's HESF 3.1.2, the European ESG 1.9, India's NAAC 1.1.1 and 1.4.1 and Malaysia's MQA 6.1.6 and 7.1.4 all require documented external-stakeholder or market evidence in programme review. Singapore's government builds its Skills Frameworks from "labour market surveillance data, such as job posting data". Section 3. Lyceum is the operational form of what the accreditors already demand.

**And the assistants are already on campus.** CSU gave ChatGPT Edu to 460,000 students; Oxford to all staff and students; Northeastern runs Claude for Education for 50,000 people; Manchester rolled Microsoft 365 Copilot to 65,000; Gemini for Education reaches over a million Italian students. Section 5. "Not another platform" is not a slogan; it is where the users already are.

### 2.2 The caveats we keep saying out loud

- Job postings over-represent management, computing and business roles and under-represent production and service work (OECD 2024; Washington State ESD). Lyceum counts what it collected and names the boards.
- Posting wages are unreliable (NBER 2023); Lyceum never shows wage claims from postings.
- Skills-based hiring is announced more than practised (Burning Glass and Harvard, "not even 1 in 700 hires"); Lyceum reports what employers ask for, not what they hire.
- 85% of US employers say colleges do a good job (AAC&U, December 2025). We do not say universities are failing. We say the evidence behind reviews is thin and late.
- Information shifts beliefs more than behaviour (NBER 2017; IZA 2015). So the evidence arrives with a decision and a deliverable, never on its own.
- The employability evidence base is small-scale (Scandurra et al 2023). Lyceum claims process quality it can verify, not learning gains it cannot.
- A prediction that beats carry-forward shows forecast skill, nothing more. The near-term benefit Lyceum can claim is better-documented decisions and less preparation work; the causal effect of a revision on learning needs the designs in Section 9.5 and a pilot.

### 2.3 The sentence a judge should repeat an hour later

"Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use."

### 2.4 The problem at three levels, one figure each

| Level | Figure | Source |
|:--|:--|:--|
| World | 39% of workers' skills change by 2030, while programme approval takes 12 to 18 months | WEF Future of Jobs 2025; Wayne State and Texas Tech policy pages |
| Asia | 77% of 10,095 Asia Pacific employers cannot find the skills they need, up from 45% in 2014 | ManpowerGroup Talent Shortage 2025 (vendor survey, say so; in the 11 October note) |
| Malaysia | 32.2% of graduates worked below their qualification in 2024, while graduate unemployment was 3.2% | DOSM Graduates Statistics 2024, in the 11 October note |

R1 (interviews with lecturers in at least three Asian countries) adds one quotation per level when it is done. Until then the landing page says the figures are desk research.

---

## 3. Principles

Kept from the current build:

1. A requirement is an exact quotation from its source or it is rejected.
2. Every count shows its numerator and denominator with a Wilson interval; empty evidence is unknown, never zero.
3. Collection happens only on request, from documented sources with a stated policy.
4. People decide. Nothing changes a course without the lecturer, and formal approval stays in the university's process.
5. The core needs no AI key; model text augments, never replaces, and never moves a number.
6. The sandbox stays labelled illustrative and off the public page.

New with this plan:

7. **One loop, everywhere.** The same six steps with the same names in the app, the demo, the deck, the video and the brief.
8. **One core, many doors.** The deterministic core is reached from the web workspace, from the university's AI assistant, from the LMS and from the office suite. No door confirms a quotation, adopts a revision or sends a brief without an explicit human action.
9. **Evidence arrives with a decision and a deliverable.** A count is never the end of a screen; the next action is.
10. **Perception and attainment stay apart.** Surveys measure how students feel; marks measure what they can do; the gap is a finding.
11. **Graphics carry the story.** One visual and one action per screen; words behind a disclosure.
12. **Moods come from records.** A mascot works when a request runs, waits when a proposal needs you, celebrates when a result is saved, and never fakes activity.
13. **Quality, never volume.** Milestones reward verified quotations, reviewed sets, recorded decisions and closed loops; nothing rewards the number of changes, speed or streaks.
14. **Fits the tools they already use.** The cost of trying Lyceum must be close to zero: a single course runs locally for free with no account; a department buys the shared workspace and the doors. Setup, review labour, hosting, support and the institution's approvals are real costs and are priced in Section 13.
15. **Everything is one story.** Eight beats in one order on every surface (Section 4.1); no surface leaves a question hanging; the artefact appears on screen before the sentence that describes it. A gap in the story is a bug, and it blocks the freeze like a failing check.

---

## 4. The Lyceum Loop: the storyline and the flow

The canonical storyline from the 14 October review, now the product's spine. Setup opens the course; six steps follow; the loop runs again every semester.

| Step | The question it answers | Role (mascot) | Reads | Produces (the records) | Done when | Screen |
|:--|:--|:--|:--|:--|:--|:--|
| Setup: Course | What does this course promise today? | Folio | Syllabus, outline, uploaded documents | Course definition: outcomes, topics, hours, prerequisites, locators | A course is open with at least one outcome | `#/course/:id` |
| 1. Watch | What are employers asking for, right now and over time? | Scout | Permitted boards on request, the dated sample, pasted documents | Sources with link, publication date, retrieval time, fingerprint; dated collection snapshots | At least one reviewed source exists | `#/course/:id/watch` |
| 2. Report | What exactly do they ask, how often, and what does the course do about it? | Atlas, Lens, Steward | Kept postings, the skills you name, the outcomes | Confirmed quotations; the reviewed denominator; counts with intervals; mappings with coverage stage and target; the meeting brief with receipts | A reviewed posting carries a confirmed quotation, a mapping reaches a current outcome, and a brief is prepared | `#/course/:id/report` with a sub-rail Quote, Review, Count, Map, Brief |
| 3. Decide | What will we do, and who said so? | People (coordinator, committee), with the sandbox as optional evidence | The brief and its receipts | A decision record: adopt, retain, defer or return, by whom, when, why, bound to the brief and the course version; the mock-cohort try is labelled illustrative | An adopt or retain decision is recorded on the latest brief of this term (defer leaves the step open; return sends it back to Report) | `#/course/:id/decide` and the recipient's Home |
| 4. Update | What does the approved change look like, within our hours and rules? | Quill | The decision, the constraints, the confirmed evidence | A checked revision; an adopted local version; the history | A revision is adopted, or the recorded decision was retain and the step shows "no change this term" | `#/course/:id/update` and `#/course/:id/history` |
| 5. Teach | What will the class do, and with what? | Prism | Saved sessions, the evidence linked to their outcomes | Sessions with activities and checks; editable teaching packs; template assessment items | A session linked to an outcome is saved | `#/course/:id/teach` |
| 6. Learn | Did it work, as far as we can honestly tell? | Lens | Results, the CLO survey, the SSRT survey | Per-outcome attainment with n of N and intervals; perception beside attainment; the frozen prediction and its score | A term's results are filed and matched to the taught version | `#/course/:id/learn` |

**What changes in the flow, and where it lives today.**

- The Evidence tab splits in two: collection becomes **Watch** (`EvidenceResearch.tsx`, plus the teammate's snapshots if taken), and the rest becomes **Report** (`EvidenceWorkspace.tsx`) with a visible sub-rail instead of a long stack. The Codex review's ranked UI fixes (a step rail, a source pane beside each proposed quotation, skill cards instead of the ten-column table) land here.
- **Decide** is new and small, and specified fully so it cannot be gamed: `BriefDecision { id, briefId, subjectId, courseVersionId, term, byPersonId, at, outcome: "adopt" | "retain" | "defer" | "return", note }` in `types.ts` and the store. Only a recipient of the brief with the `decide` capability (Section 4.2) may record one, and the brief's author cannot be its sole decider (a self-recorded decision stays open until a second person confirms, unless the institution profile allows single-owner courses); one decision per person per brief; records are immutable and an amendment is a new record; a newer brief for the same course and term supersedes the decisions on the older one and says so; a decision made before the evidence changed is shown with "evidence changed since" rather than deleted. A Decide screen shows the latest brief, its recipients, who has read it and what each decided; on the recipient's Home the brief gains four buttons and a required note. Retain is a legitimate completed outcome: the course is kept, Update shows "no change this term", and the loop continues to Teach. The journey and the timeline read the record. This is the honest version of "the coordinator or committee decides": the decision now exists as data.
- **Update** is today's Outcomes and topics plus History (`CurriculumWorkspace.tsx`); the journey step "Confirm the outline" moves here, after the brief, as the review decided.
- **Teach** is today's Teaching plan plus Assessment (`CourseWorkspace.tsx`, `Studio.tsx` assessment panel).
- **Learn** is today's Upload and Data room pieces, reframed: results and surveys in, descriptive attainment per outcome with the sample rules of Section 9, the benchmark status (frozen predictions, naive baseline), and nothing predictive on a real course until the benchmark is run.
- The seven-step journey bar becomes the **receipts ring** (Section 8): Course plus six segments, each done only when its record exists, the next step always one action.
- **An append-only event log.** `events: { id, at, byPersonId, kind, refs }` for decisions, snapshots, adoptions, and briefs prepared, sent and read. The How it works timeline reads events first and derived summaries second, and labels a derived line ("the count as the records stand now") so the record never claims a time it does not have. The current `runs.ts` derivation stays for older records.
- **The loop is per course and per term.** The ring, the done rules and the handoff cards are scoped to the current term and course version; a loop closed last term stays in the recap and never certifies the new one. The term comes from the course's effective term and the teaching plan's term, and is printed on the ring.
- The sandbox screens (Trends, Acceptance test, Closed loop, Data room, Relevance Index) keep their labels and move under Explore, where Decide links to the Acceptance test as "try the change on a mock cohort (illustrative)". The old approval chain (the Proposal tab, the Approvals screen, the management persona) joins them there (Section 4.2), so the product has one way to decide.

**Why this is a process any university can adopt.** Each step is the operational form of a clause the accreditors already use: Watch is the environmental and stakeholder scan (AUN-QA 1.4, QAA external expertise); Report is the needs analysis with evidence (MQA 6.1.6, NAAC 1.4.1); Decide is the programme committee's documented decision (ABET Criterion 2's "documented process"); Update is the approved revision with version history (ESG 1.2 and 1.9); Teach is constructive alignment of outcomes, activities and assessment (Biggs); Learn is assurance of learning (AACSB Standard 5, ABET Criterion 4's "systematically utilized" results). The names are plain so the loop reads the same in Kuala Lumpur, Amsterdam, Jakarta or Boston. The accreditor mapping appears once on the landing page and once in the deck, with the clauses quoted.

### 4.1 One story, no gaps

Everything is one story. The app, the demo, the deck, the film, the brief, the poster and the README tell the same story in the same order, and none of them leaves a question hanging. "Convincing" has one meaning here: every claim arrives with the thing that proves it already on screen.

**The spine.** Eight beats, in this order, on every surface.

| Beat | What the audience must know or feel | The proof on screen |
|:--|:--|:--|
| 1. A person and a question | Dr Aisyah, after class, is asked what to change before the next review. She can suggest; she cannot show. | Her desk: the outline, the browser tabs, the message |
| 2. Why now | Approval takes 12 to 18 months while 39% of skills turn over by 2030; the accreditor already asks for the evidence; the assistants are already on campus | Two bars, one quoted clause, one monochrome logo strip; sources in the notes |
| 3. The gift | A receipt: an exact sentence from a real posting with its employer, date and link, counted over a known denominator | One receipt card, before the word "receipt" is spoken |
| 4. The plan | The loop: six steps, seven helpers, the same names everywhere | The loop graphic with the mascots |
| 5. The journey | Watch, Report, Decide, Update, Teach, Learn, each step ending in a thing she can hold | The real app or its film: the sources, the brief, the decision record, the adopted version, the opened pack, the results with n of N |
| 6. The proof | What is real, what is illustrative, what is planned; the checks; software TRL 6 in NASA's words | The verification table; the amber list of what is not built |
| 7. The wider world | Any university can run the loop; the doors reach the tools they already use; a department pays because the review happens anyway | The architecture diagram; the ladder; the accreditor mapping |
| 8. The return | The ask, the pilot measures, and the sentence a judge repeats an hour later | The closing card with the ring closed |

**The transition rule.** Beats connect with "but" or "therefore", never with "and then". Every slide, scene and screen ends on the question the next one answers: the receipt ends with "one receipt is not a decision", and the loop answers it; Watch ends with "postings are not evidence until someone reads them", and Report answers it; Report ends with "a count is not a decision", and Decide answers it; Decide ends with "a decision is not a course", and Update answers it; Update ends with "a course is not a class", and Teach answers it; Teach ends with "a class is not proof", and Learn answers it; Learn ends with "next semester the loop runs again", and the ring closes.

**The gap check.** No surface may leave these questions unanswered, and they are answered in this order, before they are asked:

1. Who is this for, exactly?
2. Why now, and why was this not done two years ago?
3. Why not just ask ChatGPT?
4. Where did that number come from, and over what denominator?
5. Who decided, and where is it written?
6. What changed in the course, and what was protected?
7. What happened in the classroom?
8. Did it work, as far as we can honestly say?
9. Why would a university adopt it, and what does it cost them to try?
10. What is not built, and what comes next?

**Show, then say.** The artefact appears before the sentence that describes it: the quotation before "exact quotations", the denominator before "honest counts", the decision record before "people decide", the opened PowerPoint before "no model wrote this", the dated check before "verified". Never the reverse.

**The same story on every surface.**

| Surface | Beats it carries | Where its artefacts come from |
|:--|:--|:--|
| Landing page | 1 to 4, then 6 to 8 in short | The ring, the mascots, the sourced figures, the doors strip |
| Home and the step path | 4 and 5 as the lecturer lives them: each step screen opens with the question it answers and closes with the handoff to the next step | The ring and the saved records |
| How it works | 4, 5 and 6: the loop, the roles, the derived record of a real course | The timeline built from saved records |
| The demo tour | 1 to 8 in one afternoon, the captions carrying the "but" and the "therefore" | The real app on the dated sample |
| The deck | All eight, one beat per slide group (Section 14) | Real screenshots, the film, the diagram |
| The film, 90 seconds | 1, 3, 4, 5 and 8 | Scripted capture of the real app |
| The film, about three minutes | All eight | The same capture plus the proof and the doors |
| The brief PDF and the poster | 1 to 4, then 6 to 8 | The same artwork and figures |
| README and JUDGES.md | 4 to 8 for a reader at a keyboard | The commands and the checks |

**The story review.** On Saturday and again on Sunday, one teammate plays the sceptical judge: reads the deck, watches the film, follows the demo path, and writes down every question they were left with next to the beat that should have answered it. The Story lane closes the gaps before the freeze. Nothing ships with an open question on the list.

### 4.2 People and positions: one authority model, no redundant roles

**The redundancy today.** The app carries two chains of authority at once: the old one (a proposal is drafted, reviewed by a coordinator, run through the acceptance test and approved by management on the Approvals screen) and the new one (a brief goes to a colleague who decides). It also carries three overlapping ways to say who someone is: an organisation tier (management, department, academic), per-course hats (coordinator, lecturer, or both at once, with the union of powers), and five named personas. The result is that a judge, or a lecturer, cannot tell who decides what, a person who holds both hats on a course can prepare a brief and approve it alone, and "management" has a screen but no part in the loop.

**The approach: separate three things, then keep one chain.**

1. **Who someone is: positions.** A person holds one or more positions on a course or a programme. The positions are plain words any university recognises, and the set is configurable per institution (the institution profile from W02): Lecturer (teaches the course), Course coordinator (owns the course outline), Programme owner (owns the programme; the head, the programme coordinator or a committee chair), Quality office (reads and exports), and Formal approver (the senate, faculty board or dean, who acts outside Lyceum and is only recorded). "Management" and "department" as tiers go away; a dean is a programme owner or a formal approver by position.
2. **What the loop needs done: capabilities.** Each action in the loop requires a capability, never a role name: `watch` and `report` (run the research, confirm quotations, map, count), `brief` (prepare and send), `decide` (record adopt, retain, defer or return), `adopt` (make a checked revision the local version), `teach` (sessions and packs), `file` (results and surveys), `read` (everything on the course), and the administrative `create-course` and `assign-positions`. The institution profile maps positions to capabilities; the code checks capabilities only.
3. **Separation of duties, stated once.** The person who prepared a brief cannot be its sole decider. If one person holds both the lecturer and the coordinator positions on a course (the common case in a small department), their decision is recorded as "self-recorded" and the Decide segment shows "decision recorded by the author; a second person's confirmation is open" until a programme owner or another coordinator confirms, or until the institution profile says single-owner courses close on the author's decision, in which case the ring says so in words. Formal approval stays outside Lyceum and is recorded as a date and a reference, never performed in it.

**The default profile** (a Malaysian public university; other profiles map onto the same capabilities):

| Position | Capabilities on their courses | Receives | Does not |
|:--|:--|:--|:--|
| Lecturer | watch, report, brief, teach, file, read | The decision on their brief; affected-session flags after a change | adopt, decide |
| Course coordinator | all of the lecturer's, plus adopt and decide (with the separation rule) | Briefs from the course's lecturers | decide alone on their own brief |
| Programme owner | decide and read on every course in the programme; assign-positions; create-course | Briefs escalated from coordinators; the term recap | watch, report, teach on courses they do not teach |
| Quality office | read and export on every course | The term recap and the evidence pack at review time | any change |
| Formal approver | none inside Lyceum | A pack, by the owner's hand | anything in the app; the approval is recorded as an external event with a date and a reference |

**One chain.** The loop's Decide is the only decision in the product. The old chain (Proposal tab, Acceptance test, Approvals screen, the management persona) moves wholly into the sandbox, labelled illustrative, reachable from Decide as "try the change on a mock cohort" and from Explore; it leaves the lecturer's navigation and the story. The old `can()` capabilities that belong to it (`run-test`, `approve`, `review-draft`) stay only for the sandbox screens.

**Personas for the demo and the sign-in screen.** Five remain, each stated in one line of what they can do in the loop: Dr Sobri, lecturer and coordinator of CS310 (runs the loop; his decision on his own brief is self-recorded); Dr Rahman, programme owner (decides, assigns positions); Dr Lim, lecturer on a second course (sees only her courses); Mr Devan, quality office (reads and exports); Ms Tan, lecturer, unverified (works, flagged). The demo tour uses Sobri and Rahman, and the Decide step shows the separation rule working: Sobri's self-recorded decision, then Rahman's confirmation.

**The helpers are not roles of people.** The seven helpers are the steps' assistants, and three of them act inside Report (Atlas maps, Lens counts, Steward briefs) while Lens returns in Learn. That is intended, not redundant, but it must never read as a committee of agents: a step's header card names only the helper acting at that sub-step; the host, not a helper, introduces the cast; and Folio reads while Quill drafts, so neither ever writes what the other owns. The deck introduces the helpers step by step, never all seven at once.

**What ships when.** Track A (inside A2a and A2b): the separation rule and the self-recorded label in Decide; the old chain out of the lecturer's navigation and into the sandbox; the sign-in screen's one-line positions; the capability names `decide` and `adopt` used by the new screens, mapped onto today's hats (coordinator gives both, lecturer gives neither) so no data migration is needed before Amsterdam. Track B (B3): positions and the institution profile as data, the capability map, a backup schema bump with a migration from hats, and the Quality office and Formal approver positions.

---

## 5. Information architecture and navigation

### 5.1 Signed out

The landing page (`#/index`): the loop as a hero graphic with the host at its centre and the seven helpers at their stations; the problem at three levels with sources; "what is proven" with dated checks; the doors as a strip of monochrome marks labelled planned; two ways in. No synthetic figure. The integrity smoke keeps asserting it.

### 5.2 Signed in

```text
Home                      the ring for the selected course, "Start here", the inbox, briefs waiting for a decision
Courses                   catalogue, create a workspace, backups
Course  (the step path)   Course · Watch · Report · Decide · Update · Teach · Learn, and History beside it
Explore                   How it works · Evaluation · Guide and progress · Sandbox (illustrative)
```

- The sidebar shows Home, Courses, your courses as chips, Explore, and the illustrative sandbox folded away until opened. Inside a course the loop runs as a path of round stops across the top of every step (revised 22 October 2026 on the owner's direction, docs/decisions.md): the path is the primary navigation inside a course and replaces the Studio tabs. Every stop shows its step's icon, its state in a word and a mark, and a count ("4 sources", "2 decisions"); the stop you are on is the dark one, History sits beside the path, and the step's helper speaks its question in a bubble below it.
- Routes are hash routes with the course id in the path so deep links, refresh and back keep working: `#/course/CS310/report/map`. The existing `screen` and `studioTab` state map onto these; `navigate()` grows a `course` argument.
- On narrow screens the path becomes a horizontal strip of pills under the course title, and the sidebar collapses to a bottom bar with Home, Courses, Course, Explore and More (five items at most).
- Report's sub-rail (Quote, Review, Count, Map, Brief) is a secondary tab list with `role="tablist"`, keyboard arrows, and the active step in the URL.
- Focus moves to the main heading on every route change; the skip link stays; the account menu and sidebar return focus to their trigger on dismissal (the Codex review's open items).
- The loop reads as chapters. Each step screen opens with the question it answers under its title, in the helper's speech bubble ("What are employers asking for, right now and over time?"), and closes with a handoff card to the next step once its record exists ("Brief prepared. Next: Decide."). The path, the ring and the handoff cards are the same story told three ways, so a lecturer never wonders what comes next.

### 5.3 The screens, one visual and one action each

One visual and one action per screen, but the evidence a judgement needs is never hidden: the employer, the date, the count, the denominator, the interval and the collection limits stay beside the claim they support; only how-to text and secondary options go behind a disclosure.

| Screen | The one visual | The one action | Behind the disclosure |
|:--|:--|:--|:--|
| Home | The ring with the next step lit | "Continue: Confirm quotations" | The work queue, notifications, the latest brief |
| Course | The outline as cards: outcomes with their Bloom level, topics with hours | "Start a revision" (goes to Update) or "Watch employers" when the course is fresh | Documents, prerequisites, programme outcomes |
| Watch | Source cards with a dated timeline of collections | "Fetch postings" | Policies, the log, the saved sample notice, pasted documents |
| Report: Quote | The source pane beside the proposed sentence, the matched words highlighted | "Confirm" per proposal, "Confirm all" | Dismissed proposals, the lexicon editor |
| Report: Review | The denominator as a meter: reviewed of kept, duplicates set aside | "Mark reviewed" with the acknowledgement | The duplicate list |
| Report: Count | Skill cards: quoted postings over reviewed postings, the interval printed, required against preferred | "Map this skill" | The full table, exports |
| Report: Map | The coverage ladder per skill: absent, introduced, practised, assessed, with the target | "Save mapping" | Cited course evidence |
| Report: Brief | The brief preview with its receipt appendix | "Prepare brief", then "Send" | Options, notes, previous briefs |
| Decide | The latest brief, its recipients, their decisions | "Record decision" (recipient) or "Send to a colleague" (author) | The mock-cohort try, labelled illustrative |
| Update | Before and after outline with the hours budget meter and the check results | "Check", then "Use as my course version" | The rationale, the term, affected sessions |
| Teach | Session cards by week with their linked outcomes | "Teaching pack (.pptx)" per session, "Add session" | Assessment blueprint and template items |
| Learn | Attainment per outcome: n of N, the interval, perception beside attainment | "File results" or "File survey" | Response adequacy, the benchmark protocol and status |
| History | Versions and decisions on one timeline | "Open" | Exports |
| How it works | The loop with the host at its centre and the seven helpers at their stations, each helper card opening to reads, produces, cannot | "See the record on this course" | The derived timeline |
| Evaluation | Live checks, the scan benchmark, the suites | None | The protocol |

### 5.4 Empty, loading, error and recovery states

Every screen designs its empty state (an action-led title, one primary call to action, the mascot resting), its loading state (skeleton after 300 ms, never a blank frame), its error state (the cause, the fix, a retry; no mascot), and its recovery (undo for destructive actions, a pre-restore copy before any restore, the unsaved-edit warning on navigation). The premium-apps note in Dev Knowledge is the checklist: after every action the user knows what happened, how to undo it and what to do next.

---

## 6. The design system

### 6.1 Tokens

The poster is the source of truth, audited against WCAG 2.2 and best practice on 22 October ([design/colour-scheme-audit-2026-10-22.md](design/colour-scheme-audit-2026-10-22.md)): every colour is kept, one token is added for green text on light surfaces, and nine rules say where each colour may appear. `src/theme/tokens.ts` becomes the single definition and `src/theme/global.css` is generated from it (a small script, `scripts/gen-theme-css.mjs`, writes the `:root` block so the two can never drift). No other hand-written file holds a hex value: the generated `:root` block, the generated video theme and the generated PNGs are outputs, and the contrast check compares each generated file with `tokens.ts` so none can drift.

| Token | Hex | Use |
|:--|:--|:--|
| `--forest` | `#0F2A20` | Primary dark: hero, header, tool cards, headlines and main text |
| `--lime` | `#B8F23A` | Accent, emphasis only, and only on forest surfaces: the loop line, the active step, highlights, chips and labels on forest. On mint and white the same roles are forest or emerald |
| `--emerald` | `#1C7C54` | Data: chart bars, meters, the primary button fill (white text, 5.2) |
| `--emerald-text` | `#176B4A` | Green text and links on light surfaces (6.5 on white, 5.6 on mint, 5.4 on tint-2, 5.0 on the moods card); plain emerald fails AA for small text on the tints |
| `--mint` | `#E9EFE7` | Page background |
| `--white` | `#FFFFFF` | Light cards |
| `--tint-1` | `#EEF6EF` | Agent tiles, the receipt slip |
| `--tint-2` | `#DDEFE1` | Chips, meter tracks, mascot circles |
| `--moods` | `#CDE8D3` | The moods card |
| `--border` | `#D3E0D6` | Card borders |
| `--dots` | `#C8D8CC` | The background dot grid |
| `--gridline` | `#DCE7DF` | Chart gridlines |
| `--next-dashed` | `#8FB59E` | The "coming next" dashed border, decorative only (2.3 on white): a planned item always carries the word "Planned" in a tag |
| `--forest-2` | `#173A2C` | Inner boxes on dark cards |
| `--forest-border` | `#2E5A46` | Decorative borders on dark cards (1.9 on forest); an input on a dark card is bounded by `--on-forest` and focused in lime |
| `--on-forest` | `#B9CDBF` | Body text on forest |
| `--ink` | `#0F2A20` | Headlines and main text |
| `--ink-2` | `#4E6258` | Body and captions |
| `--ink-3` | `#2F4A3D` | Small muted text on tinted cards |
| `--shadow-mascot` | `#CFE3D4` | Mascot shadow on white and mint tiles |
| `--shadow-mascot-moods` | `#B5D9BE` | Mascot shadow on the moods card |
| `--ray-1`, `--ray-2`, `--ray-3` | `#1C7C54`, `#4FA36F`, `#8BC34A` | Illustration only: Prism's rays. On forest, only `--ray-2`, `--ray-3` and lime may carry data, because `--ray-1` is emerald and reads at 2.96:1 there |
| `--forest-deep` | `#0B1F17` | The bottom of the film's field gradient and the sign-in backdrop; never under text smaller than 24 px |
| `--control-border` | `#4E6258` | Input and control outlines (6.5:1 on white), because the card border is too pale to bound a field on its own |
| `--focus-light`, `--focus-dark` | `#1C7C54`, `#B8F23A` | The 2 px focus ring, offset 2 px with a gap in the surface colour, on every interactive element: emerald on light surfaces (4.0 or better), lime on forest surfaces (9.4 or better), because emerald on forest is 2.96 |
| `--warn`, `--warn-soft` | `#8A5A00`, `#FCF0E0` | Semantic only: warnings, stale reviews, unknown budgets (added outside the brand palette because the brand has no amber; always with an icon and text) |
| `--danger`, `--danger-soft` | `#A33A2A`, `#FBE9E6` | Semantic only: a blocked check, a rejected quotation, a failed fetch (never decoration) |

### 6.2 Contrast, measured

| Pair | Ratio | Verdict |
|:--|:--|:--|
| Forest text on mint | 13.1 | AAA |
| Forest text on white | 15.3 | AAA |
| Forest text on lime (the lime button) | 11.5 | AAA |
| Lime text on forest | 11.5 | AAA |
| Lime on the inner box `#173A2C` | 9.4 | AAA |
| White text on emerald (the primary button) | 5.2 | AA |
| Emerald text on white | 5.2 | AA |
| Emerald text on mint | 4.4 | large text only (24 px regular or 19 px bold) or non-text UI |
| `#4E6258` body on white, mint, tint-1 | 6.5, 5.6, 5.9 | AA |
| `#2F4A3D` on the moods card and tint-2 | 7.4, 8.1 | AAA |
| `#B9CDBF` on forest and on the inner box | 9.1, 7.5 | AAA |
| Emerald bar on white, on mint | 5.2, 4.4 | passes the 3:1 non-text rule |
| Lime on white, lime on mint | 1.33, 1.14 | **fails**: lime never carries text or a bar on a light surface |
| Emerald on forest | 2.96 | **fails** the 3:1 non-text rule: charts on dark cards use `--ray-2`, `--ray-3` and lime, never emerald |
| `#4E6258` control border on white, on mint | 6.5, 5.6 | AA, so a field is bounded without relying on the card border |
| Lime on emerald | 3.9 | UI only, never text |

Rules that follow: lime text, bars, lines and chips only on forest and the inner box; green text on light surfaces is `--emerald-text`, and plain emerald text on mint only at large-text sizes (24 px regular or 19 px bold); links in body text are underlined; the Wilson whiskers are drawn in forest with a white backing so they read over emerald bars (the Codex review's 1.1:1 finding); state colours always pair with an icon and a word.

### 6.3 Typography

- **Bricolage Grotesque** (display): page titles, hero lines, big numbers, the wordmark, mascot name tags. Weights 600 and 800. Sizes 28, 36, 48, 64.
- **Plus Jakarta Sans** (body and UI): everything else. Weights 400, 500, 600, 700. Sizes 13, 14, 16, 18, 22. Body 16 on mobile, 14 to 16 on desktop, line height 1.55.
- **JetBrains Mono** (labels): section eyebrows in uppercase with 0.12 em tracking, hex and ids, timestamps, receipt numbers, counts in tables (tabular figures). Sizes 12 and 13, never smaller; green eyebrows use `--emerald-text`.
- Bundled through the Fontsource variable packages for the three faces (verify the exact package names at install), subset to Latin, `font-display: swap`, preloaded only for the two weights above the fold.
- One type scale, one line-height scale, no other faces. The serif Newsreader leaves the product.

### 6.4 Space, shape, depth, motion

- Spacing on a 4-point grid: 4, 8, 12, 16, 24, 32, 48, 64.
- Radius: 12 (buttons, inputs), 16 (cards), 24 (hero and tool cards, as on the poster, and the speech bubble); tags and chips are pills.
- Depth by outline and lip (revised 22 October 2026 on the owner's direction, docs/decisions.md): a mint page; white panels and every control with a 2 px forest outline and a flat lip under everything that can be pressed, never a blur; cards inside a panel outlined lightly in `--border`; forest cards for the hero, the header and the tools. A press moves the control down onto its lip. Anything outlined with a lip is a control; a flat pill is a label.
- The dot grid on the page background (`--dots`, 2 px dots on a 28 px grid, masked away under dense tables).
- Motion tokens: 120 ms feedback, 200 ms state change, 320 ms enter, 220 ms exit; ease-out in, ease-in out; springs only for mascots. `prefers-reduced-motion` stops every animation, including the demo cursor and the mascot idle.
- Icons: Lucide at 1.75 stroke (2.25 on the path's stops), 16, 20, 24. No emoji anywhere.

**Bold enough to hold a judge's eye, one task at a time so it never reads as a dashboard** (revised 22 October 2026: the owner judged the earlier restraint congested and not intuitive, and asked for a friendlier, slightly brutalist workspace). Each step screen reads top to bottom: the path, the helper's question, the work, the handoff. The forest cards, the dot grid and the oversized numbers still belong to the landing page, the header, the tools strip and the deck; the working screens stay white and mint with forest text, the dark "you are here" stop and the header are their forest elements, and lime marks one thing a screen, on forest surfaces only. Numbers sit at body size beside the words they belong to. The earlier rule (hairline cards, shadows only under mascots and menus, structure felt and not seen, one forest element) is superseded.

### 6.5 Charts

Emerald single-hue bars on white; the interval printed beside the percentage, never hover-only; the whisker in forest on a white backing; one series per chart, the count on each bar, the axis ending at the denominator; gridlines `--gridline`; a table alternative within a disclosure; chart SVGs scale with a `viewBox` and a responsive width (the 320 px reflow finding). On forest cards, the three rays are the only series colours. The waffle grid is the honest proportion chart for small denominators: one cell per reviewed posting, rows of ten, so the grid is the denominator itself and the filled cells are the postings that quote the skill; it is never a fixed 100-cell percentage.

### 6.6 Components

Refactor in place, in `src/ui/primitives/`: Page, PageHead, SectionLabel, Card (light, tint, forest), Row, Button (primary emerald, lime on forest only, quiet, danger), Tag, Field, Input, Textarea, Select, Spinner, EmptyState, Stat, Kbd, Provenance, BarList. New: `StepPath` (the loop's path, once the sidebar's `LoopRail`), `SubRail`, `Ring`, `Meter` (the denominator and hours budget), `SkillCard`, `SourcePane`, `ReceiptSlip`, `DecisionCard`, `Mascot`, `MoodBadge`, `Milestone`, `Disclosure`, `Waffle`. Every component has hover, focus-visible, active, disabled and loading states defined in one place, and a 44 px minimum target on touch.

### 6.7 Accessibility baseline

WCAG 2.2 AA as the target: contrast per the table, visible focus everywhere, labels on every control with the visible words in the accessible name, status text beside every colour cue ("Next", "Done"), list and table semantics for chart rows, no hover-only content, 320 px reflow, 200% text zoom, reduced motion, axe in the workspace smoke with zero violations on the loop screens. A screen-reader pass with NVDA on Report before Track B closes.

---

## 7. Mascots and living personas

### 7.1 The cast: one for Lyceum, seven helpers

The cast is eight. **Lyceum has its own mascot**, the host and the face of the product, the way Kancil is the face of Amanah. The **seven agents each have their own**, and they are the helpers the host introduces. The host never does a helper's work and a helper never speaks for the product.

**The host.** A young tree. Lyceum was Aristotle's garden school, the palette is a forest, and a tree adds a ring every season: the receipts ring is literally its growth ring, and "every semester adds a ring" becomes the line that closes the story. It is the one character allowed a lime element as a body part (a single lime leaf at the crown), so it reads as the brand at any size; everyone else wears lime only as a prop accent. Its silhouette is also the product mark: the favicon, the app icon, the poster lockup beside the wordmark, and the monochrome mark in the architecture diagram, so Lyceum has a real logo rather than a word. Working name to decide with the team: Sage (plain English, a green plant, wisdom), Tualang (the Malaysian giant tree, a local root with an international sound) or Ring (the loop itself). The plan uses "the host" until the name is chosen.

Where the host appears: the landing hero, the sign-in screen, Home's Start here card, the empty course before any step has run, the term recap, the title and the close of the deck, the cold open and the end card of the film, the brag intro, the booth banner and the printed brief. Its moods follow the ring, not activity: greeting on a first visit, resting while a course is mid-loop, celebrating when a loop closes, reflecting beside the term recap. Like the helpers, it never appears on an error, a failed fetch or a blocked check.

**The helpers.** One shape family, as Duolingo builds Duo and his cast from the same geometry: rounded bodies, big simple eyes with a white catchlight, no mouths beyond a line, detached rounded feet, one prop each tied to the job. Flat, two-tone (a light side top-left, a darker side bottom-right), forest ink outlines at one stroke weight, lime used once per character as the prop accent, drawn as inline SVG so the same source runs in the app, in Remotion and in the deck. The host shares the family and the stroke, and is drawn with two extra size classes (hero and poster) because it carries more detail at large sizes.

| Mascot | Job | Body | Prop | Lime accent | How it carries the mood |
|:--|:--|:--|:--|:--|:--|
| The host (name to decide) | Lyceum itself: host, guide, the mark | A young tree with a round crown and a short trunk, rings visible on the base | The receipts ring it holds or stands on | One lime leaf at the crown | The leaf lifts on greeting; a new ring glows once when a loop closes; it leans toward the next step on Home |
| Folio | Course reader | A book with a soft spine | A bookmark tab | The tab | Pages open when working; a page curls when waiting |
| Scout | Industry researcher | A rounded explorer with a cap | A small telescope | The lens glint | The telescope sweeps while a fetch runs; lowers when done |
| Atlas | Curriculum mapper | A map-pin shaped body | A thread between two pins | The thread | The thread tightens when a proposal awaits confirmation |
| Lens | Evidence analyst | A magnifier with a handle | A bracket (the interval) | The bracket ends | The bracket is drawn at the real interval width, so it narrows only when the evidence does |
| Quill | Course designer | A feather pen | A ruler rail | The nib | The nib lifts while a check runs and rests when a version is adopted; on a failed check the character steps aside and the error card speaks |
| Prism | Teaching-material creator | A triangular prism | The three rays | None (the rays are the ray tokens) | The rays fan out when a pack is generated |
| Steward | Review assistant | A folder with a receipt tab | A clipboard | The receipt tab | Holds the folder out when a brief is ready to send |

The first versions are static SVG with four poses each; they already read as characters. Rigged mouths and Rive state machines are Track B.

### 7.2 Moods, from records only

| Mood | The record that proves it | What the viewer sees |
|:--|:--|:--|
| Resting | Nothing pending for this role on this course | Static. No idle motion in the workspace; a slow float is allowed only on the landing page and in the film, where nothing is being worked on |
| Working | A real request is in flight (a fetch, a scan, a pack render) | The prop moves; a short progress line beside the mascot |
| Waiting for you | A proposal exists and needs confirmation (a scan proposal, a brief awaiting a decision, a check result awaiting adoption) | The mascot faces the control; a dot on the step's stop in the path |
| Done | The record this step produces was saved in the last few seconds | One spring (damping 12), then rest |
| Stuck | A request failed | No mascot; the error card with the cause, the fix and retry |

A proof suite (`src/prove-moods.ts`) asserts that each mood is a pure function of the workspace state and that no mood is "working" without an in-flight request. The demo clock pins any motion so recordings are identical.

### 7.3 Placement

Characters appear where they serve a purpose, never beside every control, so routine work for university staff does not read as a children's app. The host: the landing hero, the sign-in screen, Home's Start here card, the empty course, the term recap. Each helper: once per step, in the step's header card beside the question the step answers, and in that step's empty state; Scout's header card sits above the fetch controls, Atlas's above the proposals, and so on. The path uses neutral Lucide role icons at 24 px with the step names, and the step's helper speaks in the bubble below it. On How it works, the host stands at the centre of the loop graphic and the seven helpers at their stations; the host's card introduces them ("seven helpers, one afternoon, nothing automatic"). Never more than one character in motion per screen. Never on error, billing or security moments.

### 7.4 Production

- `src/ui/mascots/host.tsx` (renamed once the name is chosen) and `src/ui/mascots/<helper>.tsx`: the SVG as JSX, named groups (`eyes`, `prop`, `arms`, and for the host `leaf` and `rings`), a `mood` prop, a `size` prop, `aria-hidden` with the name in the adjacent label.
- `src/ui/mascots/mark.tsx`: the host's silhouette as the product mark, in forest and in white, used for the favicon, the app icon and the diagram.
- `scripts/gen-mascots.mjs`: renders every character at every mood to PNG at 512 and 1024 (the host also at 2048 for the poster) through Puppeteer into `public/brand/mascots/`, and the mark to `public/brand/mark.svg`, `favicon.svg` and the PNG icon sizes.
- The Remotion project imports the same components.
- Concept sheets first: ChatGPT image generation produces silhouette and prop options for the host and the seven helpers in the palette; the team picks; Opus draws the chosen designs in code. Generated images are never shipped as assets; the only exception considered is the landing hero, and only if it matches the drawn cast side by side.

---

## 8. Honest gamification

What rewards quality and completion, never volume or speed (Deci, Koestner and Ryan 1999; Mekler et al 2017; Sailer and Homner 2020; Kim and Werbach 2016):

- **The receipts ring** per course and per term: Course plus six segments. A segment fills only when its record exists for the current term (a reviewed posting with a confirmed quotation, a recorded decision, an adopted version or a retain decision). Its completion text is scoped and literal ("Loop closed for 2026 S1: 24 postings reviewed, 1 decision, 1 version, 3 sessions"); it never says approved, ready or good. A new term starts a new ring; the old one stays in the recap. It replaces the journey bar and lives on Home; on a course's steps the path's progress bar counts the same seven records.
- **Milestones**, each once per course, each a saved record: first verified quotation; first reviewed set (reviewed postings reach the Krejcie-Morgan figure for the kept set, or all of them); first mapping with cited course evidence; first brief sent; first decision recorded; first adopted version; first teaching pack downloaded; first term of results matched to the taught version; first loop closed. A milestone shows once, as a small card with the mascot in its done pose, and stays in the term recap.
- **The term recap**: one page per course and term, generated from records: what employers asked for, what was decided, what changed, what was taught, what came back. Exportable as the evidence pack for the periodic review.
- **Evidence-quality signals** instead of scores: reviewed of kept; interval width; share of quoted weight with a known coverage stage; response adequacy on surveys.

Banned: streaks, leaderboards, points, levels, badges for counts, guilt notifications, confetti, any reward for the number of course changes.

---

## 9. The maths: the Learn step and the benchmark

The owner's question, verbatim: can a survey of a few people stand for the whole cohort, and can the CLO survey and the test averages predict acceptance and expected mastery, with the qualitative side included? The answer is yes within stated limits, with standard methods, and every one of them is cited in [statistics-2026-10-22.md](research/statistics-2026-10-22.md).

### 9.1 Representing the cohort

- **Sample adequacy** uses Cochran's formula with the finite population correction (the Krejcie and Morgan table gives the same numbers): at 95% and ±5 points, a class of 40 needs 37 responses, a class of 120 needs 92, a class of 300 needs 169. The Learn screen shows "n of N responded" and the corrected margin, and says "below the sample-size rule" under the figure; it never says "representative", because the rule assumes random non-response, so the responder comparison in the next bullet is always shown beside it. A census is the collection target for small classes (Israel puts the point near 200; Nulty gives a liberal and a stringent standard for course evaluations).
- **Non-response bias** (Groves): responders are compared with the whole class on marks, and the difference is shown, because a low response rate only hurts when the two groups differ.
- **Intervals**: Wilson or Jeffreys for proportions at small n (Brown, Cai and DasGupta), Agresti-Coull above 40, each multiplied by the finite population factor when the class is a census with non-response; t-intervals for 1 to 10 ratings; the percentile bootstrap for CLO-weighted marks, flagged as unreliable near n = 10 (Efron).

### 9.2 Making small cohorts usable

Partial pooling (Gelman and Hill): a cohort's per-outcome estimate is blended with the course's earlier cohorts, weighted by precision. The note's illustration: a 25-student cohort moves from a half-width near ±19 points to somewhere near ±10 with three comparable earlier cohorts; the gain depends on how alike the cohorts are and is computed, never assumed. The screen shows raw beside pooled and never hides a break: a redesign enters as a covariate, and the raw estimate stays visible because shrinkage can still soften a real break.

### 9.3 Mastery

- Attainment per outcome from filed results: earned marks over available marks per outcome, with the allocation rules stated, and a cut score set by a documented standard-setting method (Angoff or Bookmark, 10 to 15 judges) when the department wants "mastered" as a category. Until then the screen shows the distribution, not a label.
- The Rasch spine stays illustrative on real courses until items are pooled to 100 responses per item for ±0.5 logit at 95% confidence (150 at 99%, per Linacre), which no single semester of 40 students reaches. The sandbox says so in its own words.

### 9.4 Perception beside attainment

The CLO survey (1 to 10 self-rating) and the SSRT measure perception; marks measure attainment; the two are shown as separate series with intervals and the gap between them, never averaged. Self-assessment tracks motivation more than learning (Sitzmann et al 2010) and ratings do not predict learning (Uttl et al 2017), so the gap is itself the finding the lecturer discusses.

### 9.5 Predicting the effect of a change ("expected mastery" and "acceptance")

- **Expected mastery**: a prediction per outcome is frozen before the semester, stamped with course version, cohort, term and model version (pre-registration, Nosek et al 2018). It is scored afterwards against the naive baseline (last cohort carried forward): mean absolute error and interval coverage for attainment, a Brier score for the probability that the cohort reaches the cut score. A win over the baseline on a held-out semester establishes forecast skill and nothing else: not a learning gain and not the causal effect of the revision, which need an unchanged comparison course (difference-in-differences) or several cohorts on each side of the change (interrupted time series). This is W17, unchanged, with the methods named.
- **Acceptance**: measured, not predicted, with validated scales: perceived usefulness and ease of use (Davis 1989) from students after the change, and Kirkpatrick's reaction level kept apart from learning (Alliger et al 1997). A pre-change expectation can be recorded as a prediction and scored the same way.

### 9.6 The qualitative side

Open survey comments are coded with thematic analysis (Braun and Clarke 2006) against a codebook; a human gold set of 100 to 200 comments is double-coded, Cohen's kappa is shown in the UI, and a model may propose codes only after it is validated against that set and re-validated on any prompt or model change (Pangakis et al 2023; Törnberg 2024). Themes sit beside the numbers in a convergence matrix per outcome (O'Cathain et al 2010).

### 9.7 Ethics and law

Cohort-level estimates only on screen. A per-student prediction that would trigger an intervention is a solely automated decision with significant effects under GDPR Article 22 for European pilots; Malaysia's PDPA 2010 has no such right, and Lyceum applies the same rule by policy. Per-student predictions are not built. JISC's code of practice and the DELICATE checklist become `docs/learning-analytics-policy.md`.

### 9.8 What the Learn screen shows

For Amsterdam (A2b): the results and surveys already filed, per-outcome descriptive attainment from the existing upload pipeline with n of N, the protocol status, and the sentence "No learning gain is claimed; the benchmark has not been run." After Amsterdam (B2): the adequacy meter with the corrected margin and the responder comparison; intervals; raw beside pooled; perception beside attainment with the gap; the frozen predictions and their scores once a term has closed; the comment themes with kappa.

---

## 10. Evidence sources and the international standard

Sources: [doors-and-taxonomies-2026-10-22.md](research/doors-and-taxonomies-2026-10-22.md), Sections 4 to 6.

- **Boards with a documented public API and a stated policy**: Greenhouse and Lever (built), Ashby, Workable, SmartRecruiters (where the customer enables it), USAJOBS (public data, attribution encouraged), Adzuna (registered key, quotas in the terms), and employer career pages that publish schema.org JobPosting and whose terms permit automated access, checked per employer and recorded with the source policy (the markup identifies a posting; it grants no permission). Never LinkedIn, Indeed or Workday feeds; the terms forbid it and the research note says why.
- **Taxonomies, so the process is comparable across countries**: ESCO as the spine (CC BY 4.0, 13,939 skills, 28 languages, a free API), an O*NET crosswalk (CC BY 4.0, Web Services free with attribution) and ISCO-08 occupation codes. A confirmed quotation can be tagged with an ESCO skill the lecturer picks from a short list; the tag never replaces the quotation, and counts stay on the quotation. Lightcast Open Skills stays optional because production use needs a commercial licence; Singapore's Skills Frameworks, Skills England and MyMahir are reference links, not APIs.
- **Supply-side references**: CS2023, the ACM data science competencies, SFIA 9 (internal use free; a partner licence to sell), the NICE framework, CDIO 3.0, the Washington Accord attributes, AACSB 2026. The Course screen can cite one as the baseline the outline is measured against.
- **Watch on a schedule** (Track B): a dated snapshot per collection run; change in percentage points between two windows with both denominators; "last checked against postings on <date>" on the course header. The teammate's snapshots branch is the candidate implementation.

---

## 11. One core, many doors

### 11.1 The core

The deterministic engines already exist in `src/lib/`: the collector contract, the citation validator, the fingerprinting, the counter with Wilson intervals, the coverage index, the constraint engine, the brief composer, the pack renderer, the backup validator, the benchmark. Track B wraps them in a shared API with identity and server-side permissions (W02), described first as OpenAPI 3.1 so every door is a thin adapter and no door re-implements a calculation.

### 11.2 The doors

| Door | A lecturer does | Built on | Status | Admin reality |
|:--|:--|:--|:--|:--|
| Web workspace | Everything that needs a full editor | The app that exists today | Built | None |
| MCP server | Asks the university's assistant for a course's evidence report with receipts, a brief draft, a teaching pack | Streamable HTTP, HTTPS with a public CA, OAuth 2.0 for anything that reads private course data; no-auth only for a public sample workspace; never SSE | Built locally for the demo (a stdio server over an exported workspace, not deployed anywhere). Remote: planned | Copilot Studio needs its own subscription; Claude Team and Enterprise owners add connectors; ChatGPT Business, Enterprise and Edu use Developer mode then an admin publishes; Gemini Enterprise needs a policy override and an OAuth client |
| Lyceum skill | Installs the loop as a skill folder (SKILL.md plus scripts) so the assistant runs the steps with the right tools and labels | The open Agent Skills standard; loads unchanged in Claude, ChatGPT and Codex, Copilot Studio, GitHub Copilot, Gemini CLI (46 clients listed) | Track A: the folder exists and is demonstrated in Claude Code | Organisation-wide enablement by the admin |
| ChatGPT plugin | The skill plus the MCP server packaged for the ChatGPT directory | Apps SDK | Track B | Verified developer identity; OAuth or no-auth only |
| Microsoft 365 | A declarative agent in Teams and Microsoft 365 Copilot; briefs posted as Adaptive Cards that link to the receipts | Microsoft 365 Agents Toolkit, Entra ID | Track B | Agent Registry approval |
| Google Workspace | Gemini Enterprise connector; save a brief to Docs or a pack to Slides | The MCP server plus the Docs and Slides APIs | Track B | Policy override and allow-list |
| LMS | Launch from the course page; push a pack or a quiz | LTI 1.3 with Deep Linking; QTI 3.0 and Moodle XML exports | Track B | Developer key (Canvas) or External tool registration (Moodle) |
| Office add-ins and a browser extension | Open the receipt behind a sentence in a syllabus document; clip a posting from an employer page that publishes JobPosting data | Office.js; WebExtensions | Track B, after the pilot | Store review |

The proof that the model is real, for the judges: Coursera inside ChatGPT, Wiley and Panopto inside Claude for Education, the University of Hong Kong's agent inside Copilot Studio.

### 11.3 The trust boundary

Read-only tools are annotated read-only. Drafting tools return drafts. No tool confirms a quotation, adopts a revision, records a decision or sends a brief; those stay human actions in the workspace or behind an explicit confirmation in the host. Every tool call is logged with caller, host, tool and the record ids it touched. Revoking a host leaves the workspace and its exports intact.

### 11.4 What ships for Amsterdam

`mcp/` in the repo: a stdio MCP server in TypeScript over the official SDK, pointed at a workspace backup JSON exported from the app, exposing five read-only tools (`lyceum_courses`, `lyceum_sources`, `lyceum_evidence_report`, `lyceum_course_outline`, `lyceum_brief_draft`) and one file-producing tool (`lyceum_teaching_pack`, which writes the same deterministic PPTX). Plus `skills/lyceum/SKILL.md` describing the loop and the labels. Demonstrated in Claude Desktop or Claude Code at the booth: "What do employers ask for in CS310, with receipts?" returns the counts, the denominator and the quotations with links. It is honest: it reads what the lecturer exported, writes nothing to the workspace (the pack tool writes one PPTX to a path the user names), the export is refreshed immediately before the demo so the door reads the same state as the screen, and the slide says "local, read-only, remote and OAuth planned".

---

## 12. The architecture diagram

One diagram, drawn in the theme, complex because the system is, legible because it follows C4 notation: a title with scope, a legend, every line labelled with direction and purpose, technology on the lines, built and planned told apart by solid and dashed strokes, readable in black and white.

**Layers, top to bottom, left to right:**

1. **People**: lecturer, coordinator, programme committee, students, quality office.
2. **Doors**: web workspace (built); Claude, ChatGPT Edu, Microsoft 365 Copilot and Copilot Studio with Teams, Gemini Enterprise (MCP, planned, local demo built); Canvas and Moodle (LTI 1.3, planned); Word, Docs, Slides (planned); browser extension (planned). Each with its mark.
3. **The Lyceum core**: the API and identity (planned); the seven roles as a ring; the engines (collector, citation validator, counter, mapper, constraint engine, brief composer, pack renderer, benchmark) as forest inner boxes; the store and audit log; the skill folder.
4. **Sources and references**: Greenhouse, Lever (built); Ashby, Workable, SmartRecruiters, USAJOBS, Adzuna, schema.org JobPosting (planned); ESCO, O*NET, ISCO-08 (planned); CS2023, SFIA, NICE, CDIO, AACSB (reference links).
5. **Institution systems**: SIS, LMS gradebook, survey tools, the quality office's review calendar.

**Logos, used the way every tutorial and review uses them: referentially.** The diagram and the deck show the official marks of the products Lyceum reaches, because a mark identifies a product faster than its name and the owner asked for real logos. The rules that keep that honest: the mark comes from the company's own brand kit or from the Simple Icons package, unmodified (no recolouring, no cropping; a monochrome version only where the kit provides one); every mark sits at the same height on a neutral tint tile with the product name beside it and "built" or "planned" under it; the legend and the deck footer carry one line, "Product names and logos belong to their owners and identify integrations; no partnership or endorsement is implied"; no third-party mark ever appears inside Lyceum's own lockup, poster title or booth banner headline; and `docs/brand-use.md` lists each mark with where it came from. That is the referential use a competition diagram needs, and it is the same use a conference deck, a tutorial or a product page makes.

**Production.** `scripts/gen-architecture.mjs` renders an HTML and SVG layout with the tokens through Puppeteer, like the brief PDF, into `docs/presentation/architecture.svg` and `.png` at 16:9 for the deck and A1 for the poster. A D2 or Excalidraw draft is fine to lay it out; the final is generated so it stays in the theme.

---

## 13. Business

Sources: [hackastone-and-competitors-2026-10-22.md](research/hackastone-and-competitors-2026-10-22.md), Sections 4 and 5, and the market sizing in the master plan Section 27.

- **User and buyer.** The lecturer uses it; the department, faculty or teaching and learning unit buys it; central IT approves the doors. Cycles run 6 to 12 months and split between department-led purchases and central IT.
- **The ladder and the purchase hypothesis.** Free: one course, local-first, no account, the whole loop, exports. Department: the shared workspace, identity, the MCP door and the skill, the LMS door, the term recap as the accreditation pack, support. Institution: tenancy, audit, the Office and Workspace doors, data agreements. The hypothesis the pilot tests: the buyer is a head of department or a teaching and learning centre; the price is RM 6,000 to 15,000 (about USD 1,400 to 3,500) per department per year (the master plan's Section 27 arithmetic), bought as a department-led purchase under the small-purchase threshold with central IT reviewing the doors; the condition that justifies paying is that three of five pilot lecturers repeat the loop in the next term and the department's periodic review cites a Lyceum pack. Anchors, all secondary: Canvas at $3 to $12 per active user a year with a median contract near $22,000 (Vendr), one public Lightcast renewal near $14,000 a year (a community college board paper, in the 11 October note), and Blackboard's AI course generation priced at zero inside the LMS. The free tier is the adoption engine; the department tier is the revenue.
- **Why a department pays.** The periodic review needs exactly this evidence (Section 2); the review happens anyway; the pack writes itself from records. Demand signals: 89% of institutions say they will invest more in faculty-facing AI (Tyton, June 2026); only 30% of faculty trust their institution to choose tools, and more than half fear tools reduce their autonomy over course design (WGU Labs), which is why the lecturer keeps authority.
- **Competitors** sell alignment to institutional research, provosts and boards: Lightcast Skillabi (a 0 to 100 score from course text, no quotations), Chmura JobsEQ (programme-level aggregates), Coursedog and Watermark (approval workflows), Anthology's AI Design Assistant (free course generation, no evidence), Ellucian Journey (continuing education), Canvas Career (workforce learning). None shows exact quotations with denominators, lets a lecturer run the collection, or produces a brief and an editable pack. Lyceum complements them: a licensed dataset can be another source with a policy.
- **Moat and costs.** The receipt chain (quotation, count, decision, version, pack, result) as one record; the doors; the standard loop a quality office can cite. The variable compute cost of the deterministic core is near zero; the real costs are setup, the lecturer's review labour, hosting, support and the institution's approvals, and the pilot measures them (time to a brief, support hours per department).
- **Risks.** Data access terms (handled by the policy-first source list); incumbents adding citations (the lecturer-level workflow and the decision record remain); procurement (the free single-course tier and the doors avoid a platform purchase); Remotion and skill licences as the team grows (checked before each release).
- **Market shape** (sources in the master plan's Section 27 and the 11 October note). Over 22,000 accredited institutions and over 14 million tertiary teachers worldwide (UNESCO); adjacent software spend in the low single-digit billions of dollars; roughly 45,000 lecturers in Malaysia. Targets, not forecasts: three to five pilot institutions, 50 to 200 lecturers, one or two paid department licences in two years.

---

## 14. The pitch: 8 minutes plus 2

One presenter speaks; a second person drives the screen. At most five numbers in the whole talk. Slides carry about seven words each; the graphics carry the rest. The deck is HTML in the theme (Section 14.3), presented from the laptop, with the PPTX and PDF handed to the organiser.

| Minute | Slide | On screen | Spoken line (the gist) |
|:--|:--|:--|:--|
| 0:00 | 1. A receipt | The host holding one real posting sentence, its employer, its date, and "1 of N reviewed postings" with N the real denominator of the frozen demo state; the wordmark beside it | "This is a receipt. By the end of this talk you will have seen a course decision made of them." The sentence from Section 2.3. |
| 0:30 | 2. Who it lands on | Dr Aisyah's desk: tabs, a syllabus, a message asking what to change | Fictional lecturer, real workflow |
| 1:00 | 3. The latency | A calendar strip (approval, 12 to 18 months) beside a churn figure (39% by 2030): two different measures as two different graphics, never one chart | The world problem, one figure, one caveat ("they describe different populations") |
| 1:45 | 4. The loop | The six steps with the host introducing the seven helpers | Watch, Report, Decide, Update, Teach, Learn: the same names in the app you are about to see |
| 2:15 | 5. Live: Watch and Report | The app (or the 90-second film if the room is hostile): fetch, confirm a quotation, watch a paraphrase fail, the count with its denominator | "Nothing invented, nothing pasted. A paraphrase is rejected." |
| 4:15 | 6. Decide and Update | The brief with receipts, the decision record, the checked revision | "The decision stays with people, and it leaves a record" |
| 5:00 | 7. Teach and Learn | The teaching pack opened in PowerPoint; the Learn screen with n of N and the gap | "Lyceum adds no model text to this pack" |
| 5:45 | 8. What is real | Our assessment against NASA's software column, TRL 6, with the relevant environment named (real postings from a real board, a real syllabus, a lecturer persona); the checks; the sample; what is not built, in amber | Honest limits; the TRL 7 step named: one department, one term, inside its LMS |
| 6:15 | 9. The doors | The architecture diagram | "One core; the assistants, the LMS and the office suite they already run; local read-only door built, remote planned" |
| 6:50 | 10. Why a department pays | The ladder and the accreditor clauses | "The review happens anyway; the pack writes itself" |
| 7:20 | 11. The ask and the close | The host with the ring closed; the pilot measures; the three points restated; the sentence | "Task completion, citation fidelity, time to a brief, repeat use. Evidence that arrives with a decision. Every semester adds a ring." |

Questions bank for the two minutes: is this scraping; where is the AI; why not ChatGPT alone; how do we know the postings are representative; what breaks first at scale; does it decide the syllabus; why another tool; what does the free tier cost us; what is the benchmark; is lime readable. Each answer is one breath and ends with what is on screen. Two are rehearsed word for word. Where is the AI: "The numbers come from deterministic code on purpose. AI sits at the doors, where the university's own assistant asks Lyceum for the evidence report, and in drafting, where a model may propose and a lecturer confirms; it never confirms a quotation, never moves a count and never decides." Why not ChatGPT with search: "A chat can draft text. It cannot refuse a quotation that is not in the source, keep the denominator honest, record who decided, or keep the version history. Lyceum does those four things, and it can be used from inside ChatGPT."

### 14.1 Delivery

Open with the receipt, not with "hi, we are team". Pause after the paraphrase is rejected. Say the limits slower than the claims. Never read a slide. Restate three points at the end: receipts, people decide, the tools they already use. Every slide ends on the question the next one answers (Section 4.1), and the artefact is on screen before the word for it is spoken. The talk is rehearsed against the gap check until a listener who hears it once can retell the eight beats in order.

### 14.2 Slide craft

One message per slide; titles as full sentences; four lines of text at most; big numbers in Bricolage; real screenshots with a hairline border; mascots where they serve a purpose; the amber token for everything not built; no stock imagery, no gradients; third-party marks as their official versions at one consistent size, never recoloured.

### 14.3 Production

`deck/` in the repo: an HTML deck at 1920 by 1080 using the tokens, the bundled fonts, the mascots and real screenshots from `scripts/presentation-shots.mjs`, with keyboard navigation and the film embedded as a local file. `scripts/gen-deck.mjs` exports a PDF and a PPTX (one image per slide at 2x plus the speaker notes as real notes, built with the pptxgenjs dependency already in the project). The organiser asks for PowerPoint, so the PPTX embeds the film as a media object on its slide and is tested on the presenting laptop with the venue's player; present from the PPTX if the film plays there, otherwise from the HTML deck, and hand over the PPTX and the PDF either way. The brief PDF is regenerated from the same tokens.

---

## 15. The booth demo: 10 minutes including questions

- **Two people**: a narrator who never touches the keyboard and an operator who never speaks over the narrator.
- **Start state**: one dataset for everything: the demo's end state, saved as a backup, restored before each run, and exported again immediately before the door is shown so Claude reads exactly what is on screen; the local API running, the saved sample ready, the Claude Desktop door configured. The network is tested first; if it is down, the saved sample stands in and the narrator says so. The switch to each fallback is rehearsed as a step of its own, with the words the narrator says while it happens.
- **The path, six minutes**: Watch (fetch Stripe's board live or the dated sample), Report (scan, confirm, reject a paraphrase, review the denominator, the skill cards, one mapping, prepare the brief), Decide (switch to Dr Rahman, record a decision with a reason), Update (check and adopt the revision, show the history), Teach (download the pack and open it), Learn (file the sample results, show n of N and the gap), then the door: ask Claude for CS310's evidence report and watch the receipts come back.
- **Fallbacks**: a narrated 60-second screen recording of the same path, the 90-second film, and the full tour recording, all on the laptop and a USB stick. Never debug live.
- **The booth**: the A1 poster (the loop, the mascots, the architecture), the university banner the organisers ask for, a QR code to the public landing page, a printed one-page brief.
- **The checklist** lives in `docs/demo-script.md` and is rehearsed twice on 26 October with the smoke under turbo as the warm-up.

---

## 16. The video

Two cuts from one Remotion project in `video/`: **The loop in 90 seconds** (plays inside the pitch and on the landing page) and **One afternoon, about three minutes** (the organiser's media and the booth fallback). The pipeline is the one the team already ran for Dataworks and Shenzhen, re-themed:

1. **Script** (`video/script.md`): the six steps as six scenes plus a cold open and a close; two voices, a sceptic and a builder, as in the Shenzhen cut; stressed words marked; every number from `docs/claims.md`.
2. **Capture**: Playwright drives the real app in demo mode at 1920 by 1080 with `recordVideo`, one file per scene, plus 2x stills for hero frames; converted with Remotion's ffmpeg. Scripted capture, never a hand recording, so a UI change means a re-run, not a reshoot.
3. **Voice**: team voices, one file per line, two takes, phone in a quiet room (the Shenzhen recording rules); text-to-speech only as the documented fallback.
4. **Transcribe**: faster-whisper with word timings; captions take the script's words and the recording's timing.
5. **Build**: `Root.tsx` with the two compositions; `<Series>` of scenes; the forest and lime overlay layer (chapter chips, receipts sliding in, the count counting up to the exact value, the ring filling); captions in the band with the speaker's colour bar and stressed words in lime on forest; fonts through `@remotion/fonts` from `public/fonts`. The speaking avatars: the host speaks for Lyceum (the builder's voice) and a faceless lecturer figure speaks for Dr Aisyah (the sceptic's voice, the questions a judge would ask), so the film is the story's two sides talking; the seven helpers appear at their stations when their step runs and never narrate.
6. **Cold open**: the brag intro method from Shenzhen (an HTML scene captured frame by frame) with the host dropping in beside the wordmark and the leaf lifting, after a SkillSpector scan of the brag skill; or a Remotion scene that does the same without it. The end card: the host with the ring closed and the line "every semester adds a ring".
7. **Sound**: a CC0 or Kevin MacLeod bed only with its licence saved beside it; ducked under speech; final mix near -14 LUFS, true peak under -1 dBTP.
8. **Render**: H.264, CRF 18, 1080p30, plus a 720p review copy; captions and chapters written beside it; renders never committed.
9. **Review checklist**: every number on screen matches the claims register and the voice; sample footage labelled as the sample; no dash in any caption; it reads with the sound off; under the length; a phone watch.

### 16.1 The look: an explainer in the Infographics Show spirit, in our theme

The film is a flat, colourful cartoon explainer of the kind the big infographics channels make: bold shapes, a dark field, bright accents, everything gently moving, a narrator you can see, captions that belong to the picture. The Dataworks guide (`video/style.md` in the dataworks repo) is the template; `video/style.md` here is the same document rewritten for the tokens. Inspired by that look, never copied: no other channel's characters, music or sound.

| Element | The rule, in Lyceum's theme |
|:--|:--|
| Frame | 1920 by 1080 at 30 fps; margins 96 px left and right, 64 px top; the caption band owns y 880 to 1040; nothing important below y 860 |
| Field | A vertical gradient from forest `#0F2A20` at the top to `--forest-deep` (`#0B1F17`) at the bottom, a soft vignette, and the dot grid drifting slowly like dust in light; light scenes (the app) sit on mint with the dot grid |
| Colour code | Lime is the one thing to look at in any shot (a receipt, a count, a decision); emerald and the three rays carry data; `--on-forest` carries secondary text; white carries primary text on the dark field; the semantic amber and red appear only on a check that blocks |
| Type | Bricolage Grotesque 800 at 120 to 180 px for the big numbers, 600 at 48 to 64 px for scene titles; Plus Jakarta Sans 600 at 36 to 48 px for labels; JetBrains Mono at 26 to 28 px for chips, dates and ids; no dash on screen |
| Illustration | Flat shapes, rounded corners, no outlines except the characters' forest ink; two-tone shading (light top-left, dark bottom-right); a soft glow only on the one thing that matters; three depth layers moving at slightly different speeds; scenes for beats 1, 2, 4, 7 and 8 are drawn (the desk, the calendar against the churn, the loop, the doors, the ring closing), scenes for beats 3, 5 and 6 are the real app, captured by script, inside a drawn frame |
| Characters | The host presents, bottom left in a round badge on a `--forest-2` panel, mouth opening with the loudness of the voice, the lime leaf as its prop; the lecturer figure (faceless, two dot eyes, a quarter turn) appears bottom right when she asks; the seven helpers pop in at their stations during beat 5 and never narrate; mascots are the cutest thing on screen and never read as data |
| Chapter chip | Top left from the first scene: a rounded pill in `--forest-2` with the step name in JetBrains Mono and the helper's 24 px mascot |
| Motion | Nothing is ever completely still: idle objects float 3 to 5 px on a slow sine, the dots drift; entrances pop with a spring (damping about 12), smooth moves glide (damping 200); text appears word by word with a two-frame stagger; numbers count up over 0.6 to 1.0 s and stop on the exact value; bars draw in over 1 to 1.5 s and whiskers snap in after; scene changes are a camera push through an object into the next scene or a soft circle wipe, 12 to 18 frames; at most three things moving at once; every key number held for 2 s |
| Captions | Always on, burned in, and written to `captions.srt`: Plus Jakarta Sans 700 at 48 px, white, centred between x 400 and 1520 in the band; a rounded box in `--forest-2` at 85% with an 18 px radius; a 6 px bar on the box's left edge in the speaker's colour (the host lime, the lecturer emerald, both when everyone speaks); stressed words in lime at weight 800; at most two lines of 42 characters, 1 to 6 s on screen; each caption rises 8 px and fades over 4 frames; no karaoke, no speaker names, no sound tags, no dashes |
| Charts | On a `--forest-2` panel with 32 px corners, no gridlines, one series, the count on each bar, the axis ending at the denominator, labels at the ends of lines instead of a legend; the same meaning has the same colour in every scene |
| Sound | Team voices only (phone in a quiet room, one file per line, two takes); a music bed only with a licence that allows YouTube use, about 18 dB under the voices and up where nobody speaks; soft pops on the big beats at most; final mix near -14 LUFS integrated, true peak no higher than -1 dBTP |
| Numbers | Only from `docs/claims.md`; never typed or rounded in the project; sample footage labelled as the sample in the chip |

Remotion's terms: free for individuals and for-profit organisations with up to three employees, with educational institutions excluded from the non-profit clause unless Remotion agrees in writing. Who owns Lyceum (the team or the university) decides which clause applies; the Research lane confirms it on Friday and records the answer in `docs/claims.md`.

---

## 17. Work packages, order and session prompts

### 17.1 Track A: Amsterdam (Friday 23 to Tuesday 27 October)

23 October 2026 is a Friday. Four build days, Friday to Monday; freeze on Tuesday 27 October at 12:00 Kuala Lumpur time, or 24 hours before the flight if that is earlier (confirm the flight). Parallel Opus sessions run in separate git worktrees on disjoint files: A1 (theme) and A3 (mascots) together on Friday; A2a before A2b, because both touch the store and the types; A5 (`mcp/`) beside A2b; A6 and A7 belong to the team with Opus assisting. Each package has one accepting owner (Section 17.3) who signs its verification line in `docs/as-built.md`.

| Day | Package | Scope | Acceptance | Verification |
|:--|:--|:--|:--|:--|
| Fri 23, 09:00 | **A0** Checkpoint and the branch | The owner tags the current tree `pre-overhaul` (or zips it) so every later step can roll back; `node scripts/team.mjs take feature/evidence-snapshots` (reviewed green on 22 October); a schema 3 and a schema 4 backup each restored once to prove the migration | The tag or zip exists; the snapshots suite is in prove:all; both restores succeed | typecheck, prove:all, the two manual restores |
| Fri 23 | **Claims register** (Research and Story lanes, no code) | `docs/claims.md` with every figure the landing page, the deck and the film will carry, its source label, and the figures to drop or qualify; `docs/brand-use.md` listing each mark and its source; the Remotion ownership question answered | The register exists before any public copy changes | Read by the Story lane |
| Fri 23 | **A1** Theme and shell | `tokens.ts` as the source, generated `global.css`, bundled fonts, primitives restyled, the sidebar with the loop rail, dot grid and forest cards on the landing and the header only, the restraint rule on working screens, the warn and danger semantics, the control-border and focus tokens | Every screen renders in the new theme with no hand-written hex outside tokens; the contrast script passes the table in 6.2 | typecheck, build, `scripts/contrast-check.mjs`, smoke:workspace |
| Fri 23 | **A3** Mascots v1 (parallel session) | Eight SVG components (the host and the seven helpers), four poses each, the product mark from the host's silhouette, the `Mascot` primitive, `gen-mascots.mjs`, the moods function and its proof suite; rest is static | PNGs exist for every character and mood; the favicon and app icon are the mark; `prove:moods` passes; nothing moves without a request | typecheck, prove:all, gen-mascots |
| Sat 24 | **A2a** Watch, Report, Decide | The Evidence split; the Report sub-rail; the source pane; skill cards; the waffle; the decision record exactly as Section 4 specifies; the event log; per-term scoping of the ring; the recipient's decision buttons; the stale limitation copy in `EvidenceWorkspace.tsx` ("nothing is collected from the web") corrected | The journey proof passes with the new done rules; a decision record and an event appear on the timeline; the 320 px reflow holds | typecheck, prove:all (journey, research, evidence updated), smoke:curriculum |
| Sat 24, 12:00 go or no-go | **A5** The local door | `mcp/` stdio server over the exported workspace: the evidence-report tool first, with the export timestamp and the receipts; the other tools only if the first is green by 15:00; `skills/lyceum/SKILL.md`; a proof suite against the sample backup | Claude Desktop returns CS310's evidence report with receipts from a fresh export; no tool writes to the workspace | `prove:mcp`, a manual Claude Desktop run recorded |
| Sat 24 | **A7, part one** Video capture and voices | The script frozen by noon; Playwright capture of the demo path; the two voices recorded line by line; transcription | Every scene has footage and audio; the transcript matches the script | The capture re-runs clean twice |
| Sat 24, evening | **A9, first pass** | The story review of Section 4.1 on the deck draft and the demo path; the first timed rehearsal of the pitch | The gap-check list written with every open question | The list |
| Sun 25 | **A2b** Course, Update, Teach, Learn (descriptive only), History, Home, How it works, Landing | The remaining loop screens restyled; Home with the ring; How it works with the loop graphic; the landing page with the three-level problem, the doors strip with the official marks and the accreditor mapping; Learn shows only the filed records and the protocol status | The landing carries no synthetic figure; every landing figure is in claims.md; the integrity smoke passes | smoke:integrity, prove:journey |
| Sun 25 | **A4** Demo and checks | The tour follows the loop order including a recorded decision and a frozen snapshot; hooks kept; walk, demo-smoke, workspace and curriculum smokes updated; guides regenerated; the Evaluation suites table updated | `npm run smoke` passes with the decision recorded and both decks downloaded; the guide check passes | all four smokes, guide check |
| Sun 25 | **A6** Deck, diagram, brief, poster | `deck/` HTML, `gen-deck.mjs` (PDF and PPTX with the film embedded), the diagram (generated if the generator is ready by noon, otherwise a hand-laid SVG in the theme), the brief PDF regenerated, the poster file to the printer by Sunday night | The PPTX opens in PowerPoint with notes and the film plays; the diagram passes the C4 checklist; no dash anywhere | Visual review on two screens; the playback test |
| Sun 25 | **A7, part two** Video build | The Remotion build of the 90-second cut first, the three-minute cut if time; first render Sunday night | The 90-second cut rendered and reviewed against the checklist | A second render diffed for determinism |
| Mon 26 | **A8** Documentation and verification | `docs/as-built.md` (stamped), `docs/claims.md` reconciled, `docs/demo-script.md`, README, JUDGES.md, FEEDBACK.md, the lecturer guide; the full verification run; the manual keyboard and screen-reader pass (NVDA) on the demo path; the offline test with wifi off; fixes only for demonstrated defects | Every claim on the landing, the deck and the film traces to claims.md; the demo path works by keyboard and reads in NVDA; everything plays offline | guide check, the dash scan, the verification table |
| Mon 26 | **A9, final** | The story review again on the final artefacts; two timed runs of the pitch and the booth path; fallback recordings made; USB and laptop packed; the afternoon kept free as contingency | No open question on the gap check; pitch under 8:00; booth path under 6:00; fallbacks play offline | The gap-check list with every item answered and where; stopwatch |
| Tue 27, 12:00 | **Freeze** | The owner tags `amsterdam-2026` and publishes to the team repo; print collected; pack | | |

If a package runs late, the order of sacrifice is: first the mascot poses beyond resting and done, the waffle, the term recap and any dot-grid motion; then the three-minute film cut and the generated diagram (a hand-laid SVG instead); then the MCP tools beyond the evidence report; then the Learn screen beyond the filed records. Never cut: the source pane, the decision record, the deck, the 90-second film, the demo, the documentation and the rehearsals.

### 17.2 Track B: after Amsterdam, in pilot order

| Package | Scope | Master-plan link |
|:--|:--|:--|
| **B1** Watch over time | Snapshots as first-class records, comparable windows, change in points with both denominators, "last checked" on the course header, scheduled runs with failure reporting and the source's permission on file | W04, Section 28 item 3 |
| **B2** Learn, the maths package | The adequacy meter, FPC-adjusted intervals, partial pooling with raw beside pooled, perception beside attainment, the frozen prediction and its Brier score, thematic coding with kappa, `docs/learning-analytics-policy.md` | W09, W17 |
| **B3** The shared core | OpenAPI 3.1, identity, server-side permissions, tenancy, audit log, term archives; positions and the institution profile as data with the capability map of Section 4.2, a backup schema bump and a migration from hats | W02, W14 step 1 |
| **B4** The remote door | Streamable HTTP MCP with OAuth; the ChatGPT plugin; the Microsoft 365 declarative agent; Gemini Enterprise connector; per-vendor admin guides | W14 steps 2 and 3 |
| **B5** The LMS door | LTI 1.3 with Deep Linking; QTI 3.0 and Moodle XML exports; gradebook CSV import into Learn | W14 step 4 |
| **B6** Sources and taxonomies | Ashby, Workable, SmartRecruiters, USAJOBS, Adzuna, JobPosting pages; ESCO tagging with the O*NET crosswalk; supply-side references on the Course screen | W04, Section 10 |
| **B7** Model-drafted materials with review | Slide text and quiz items drafted by a model from saved records, every sentence reviewed, selective regeneration, institutional templates | W06, W07, W08 |
| **B8** Personas v2 | Rigged mouths and Rive state machines, the term recap, milestones, a first-time moderated test of the loop without the guide | W15 |
| **B9** Accessibility and the pilot | The NVDA pass, a full WCAG 2.2 AA audit, the pilot protocol in `docs/user-study.md`, three to five lecturers, the measures in Section 14 | W10, W11 |
| **B10** R1 interviews | Eight to twelve lecturers in at least three Asian countries; one quotation per level on the landing page | R1 |
| **B11** Office and Workspace add-ins, the browser extension | After the pilot names its stack | W14, Section 11 |

### 17.3 Team lanes for the week

| Lane | Owns | Produces by |
|:--|:--|:--|
| Code (the owner with Opus) | A0 to A5, A8 | Sunday night |
| Story | The spine and the gap check (Section 4.1), the talk track, the question bank, the demo captions and the film script, the claims register with the research lane; signs off every artefact against the spine before it ships | Friday draft, Saturday story review, Sunday final |
| Deck and poster | A6 with the designer's eye on every slide; the A1 poster; the booth QR | Saturday |
| Video | A7: the script, the two voices, the capture session, the build with Opus | Sunday |
| Research and claims | `docs/claims.md`; the accreditor clauses; the three-level figures checked once more | Saturday |
| Booth and logistics | Banner, shirts, printed brief, laptop and USB, venue wifi plan | Monday |
| QA | Everyone on Sunday afternoon: phones, 320 px, keyboard only, reduced motion, offline |  |

Accepting owners: Code accepts A0 to A5 and A8; Story accepts A9 and the gap check; Deck and poster accepts A6; Video accepts A7; Booth and logistics accepts the packing list. The owner of each package signs its verification line in `docs/as-built.md`.

### 17.4 Tools and budgets

| Tool | Use it for | Never for |
|:--|:--|:--|
| Claude Code (Opus for the build sessions) | Code, documentation, verification, the Remotion build, the deck generator | Claims without a source |
| Codex CLI with `gpt-6-astra` at max reasoning effort (the ChatGPT plan; the config already names it) | Adversarial review of this plan and of the pitch; a sceptical-judge rehearsal of the question bank; a claims audit against the research notes; a second read of the deck copy. Always `codex exec --sandbox read-only`, output saved under `docs/review/`, every claim verified before it is kept | Writing code or documents into the repo |
| ChatGPT image generation | Concept sheets for the host, the seven helpers and the landing hero in the palette, to choose silhouettes, props and poses quickly | Production assets: the chosen concepts are redrawn as SVG in code so they stay consistent, animatable, rights-clean and identical across the app, the deck and the video |
| ui-ux-pro-max and behavior-pro-max | The pre-delivery checklists in Sections 5 to 8; the honest-gamification screen | Choosing colours or type (fixed) |

**The Claude usage resets.** Three full resets (weekly plus 5-hour) are available, expiring 23 October 03:46, 30 October 02:10 and 7 November 05:49 (GMT+8). Both bars read 100% on 22 October, so a reset used now is wasted; a reset is only worth using when a bar is empty in the middle of work.

- Reset 1 (expires 23 October 03:46): use it only if sessions run tonight and the 5-hour bar empties before 03:46; otherwise let it lapse, which costs nothing.
- Reset 2 (expires 30 October 02:10): the Amsterdam-week insurance. The weekly bar resets by itself on 29 October, so spend the week's budget on A1 to A3 on 23 and 24 October, and press this reset the moment the weekly bar empties (most likely on 25 or 26 October) to get a second full week for A4 to A8. If the weekly bar never empties, it lapses with nothing lost.
- Reset 3 (expires 7 November 05:49): the first Track B push (B1 and B2) in the week after Amsterdam.

### 17.5 Running Track A as one autonomous session

The owner's preference: one prompt, one run, no stops except where a person is genuinely needed, with every small decision made by the session and logged so it can be reconsidered later. The protocol:

**Order.** A0, A1, A3, A2a, A2b, A4, A5, A6, A7 (the parts that need no human voice), A8, one package at a time, each finished and committed before the next. Sequential in one session is simpler and safer than parallel worktrees; the parallel plan in 17.1 is for a team of sessions, not for this mode.

**Permissions granted in advance, so the session never asks for them:** commit after every package with a plain message and no attribution trailer (A0 commits the checkpoint and tags `pre-overhaul`); install the npm packages the plan names; create and delete files inside the repository; run every check, smoke and generator. **Never:** push to any remote, tag `amsterdam-2026` (the owner does that at the freeze), spend money, send anything off the machine, use a third-party skill without the SkillSpector scan, or change the main idea, the six steps, the palette, the honesty labels or the dates.

**Decisions.** A choice the plan leaves open, or one it did not foresee, is the session's to make when it stays inside the rules: the host's working name, exact sizes, file names, label wording, which of two equivalent libraries, the order of sub-tasks. Every such decision goes into `docs/decisions.md` before the work moves on, in one fixed shape:

```text
## <date and time>, <package>: <the question in one line>
Options: (a) ... its trade-off. (b) ... its trade-off. (c) ...
Chosen: (b), because ... (two sentences).
Reverse it if: ... (what would make the owner change it).
To reverse: the files to touch.
```

**Stop and ask only when:** the choice would change the main idea, the six steps, the palette, the honesty labels, the dates, money, credentials, anything leaving the machine, or a destructive action outside the repository; a foundational check (typecheck, build, prove:all) still fails after three honest attempts; or the plan contradicts the code in a way the plan does not resolve. Each such question goes into the "Needs the owner" list at the top of `docs/run-log.md`, and the run continues with the next package that does not depend on it.

**Progress and resumption.** `docs/run-log.md` holds one line when a package starts, one per check with its result, one when it ends, the Needs the owner list, and what is left. If the session is interrupted (a usage cap, a crash, a closed laptop), the next session is told "Continue Track A from docs/run-log.md" and resumes from the first unfinished package. When the 5-hour cap hits, that is the moment to use a reset (Section 17.4) or to wait for the bar.

**The driver prompt** (copy as one message):

```text
You are running Track A of docs/lyceum-upgrade-plan.md on your own. Read CLAUDE.md, then the plan's Sections 0, 4, 4.1, 4.2, 6, 7, 17.1, 17.6 and 17.5, docs/design/colour-scheme-audit-2026-10-22.md and docs/competition/grand-final-2026.md before anything else, and re-read Section 17.5 and docs/run-log.md at the start of every package.

Work through the packages in this order, one at a time, finishing and committing each before the next: A0, A1, A3, A2a, A2b, A4, A5, A6, A7 (the parts that need no human voice), A8. The session prompt in Section 17.6 is each package's specification. Do not stop between packages. You have my permission in advance, so do not ask: commit after every package with a plain message and no attribution trailer (A0 commits the checkpoint and tags pre-overhaul); install the npm packages the plan names; create and delete files inside this repository; run every check, smoke and generator. Never push to any remote, never tag amsterdam-2026, never spend money, never send anything off this machine, never use a third-party skill without the SkillSpector scan the global CLAUDE.md requires, and never change the main idea, the six steps, the palette, the honesty labels or the dates.

Decisions: when the plan leaves a choice open or you meet one it did not foresee, decide it yourself if it stays inside the plan's rules, then log it in docs/decisions.md before moving on, in the shape Section 17.5 gives: a dated heading with the package and the question; the options you considered, at least two, one line each with its trade-off; the one you chose and why, in two sentences; what would make me reverse it; the files to touch to reverse it. The host's working name, exact sizes, file names, label wording, which of two equivalent libraries, and the order of sub-tasks are yours. Stop and ask me only when a choice would change the main idea, the six steps, the palette, the honesty labels, the dates, money, credentials, anything leaving this machine, or a destructive action outside the repository; when a foundational check (typecheck, build, prove:all) still fails after three honest attempts; or when the plan contradicts the code in a way the plan does not resolve. Put every such question in the Needs the owner list at the top of docs/run-log.md and carry on with the next package that does not depend on it.

Progress: keep docs/run-log.md current: one line when a package starts, one per check with its result, one when it ends, the Needs the owner list, and what is left. If this session is interrupted, the next session resumes from the first unfinished package in that file. After every package run its verification from the plan and fix what fails before committing; after A8 run the full verification (typecheck, prove:all, build, the four smokes, the guide check, the contrast check, the dash scan) and write the dated table into docs/as-built.md. No en or em dashes anywhere: code strings, docs, captions, commit messages. Finish with a report of what shipped, the Needs the owner list, and every decision logged.
```

### 17.6 Session prompts for Opus

Copy one per session. Each assumes the session starts in the repo root. Run A0 first and alone: parallel sessions need git worktrees, and a worktree only carries committed work, so the October changes must be committed before A1 and A3 can run side by side.

**A0, checkpoint and the branch**

```text
Read CLAUDE.md, then docs/lyceum-upgrade-plan.md Sections 0, 1 and 17.1 (package A0). First the rollback checkpoint: the tree has been uncommitted since 26 July. Ask me once whether to commit the current working tree as "Checkpoint before the overhaul" and tag it pre-overhaul. If I say yes, do exactly that with a plain commit message and no attribution trailer; if I say no, write a zip of the tree without node_modules and dist to the folder beside the repo, named with today's date, and record its path in docs/as-built.md. Then take the teammate's branch with node scripts/team.mjs take feature/evidence-snapshots (reviewed green on 22 October; the verdict and its four follow-ups are in the plan's Section 1), read every file it changed, and run npm run typecheck, npm run prove:all, npm run build and npm run smoke. Then prove the backup migration: export a workspace backup through exportWorkspaceBackup in a short node script, confirm it reports schemaVersion 4 and restores through restoreWorkspaceBackup, and confirm a schema 3 backup (strip evidenceSnapshots and set schemaVersion to 3) restores with empty snapshots. Fix only what those checks reveal. Finish by creating docs/as-built.md with a stamp and the dated verification table, listing the branch's four follow-ups so A2a picks them up. No dashes anywhere. Do not start A1.
```

**A1, theme and shell**

```text
Read docs/lyceum-upgrade-plan.md Sections 0, 5 and 6, then src/theme/tokens.ts, src/theme/global.css, src/ui/primitives/index.tsx and src/ui/shell/Shell.tsx. Replace the palette and type with the tokens in Section 6.1 exactly, as audited in docs/design/colour-scheme-audit-2026-10-22.md (every colour kept, --emerald-text added, lime only on forest surfaces, focus rings by surface): tokens.ts is the only source, write scripts/gen-theme-css.mjs that emits the :root block into global.css, and bundle Bricolage Grotesque, Plus Jakarta Sans and JetBrains Mono through Fontsource (no runtime font fetch). Restyle every primitive to Section 6.6 with hover, focus-visible, active, disabled and loading states, 44 px touch targets and the motion tokens. Build the LoopRail (Course, Watch, Report, Decide, Update, Teach, Learn, History) inside the sidebar for the selected course, with hash routes #/course/:id/<step> wired to the existing screens for now, and the dot grid, forest cards and the warn and danger semantics. Add scripts/contrast-check.mjs that asserts every ratio in the audit's tables and fails on any hand-written hex outside tokens.ts. No dashes anywhere. Finish with npm run typecheck, npm run build, node scripts/contrast-check.mjs and npm run smoke:workspace, and record the results in docs/as-built.md under a dated heading.
```

**A3, mascots v1**

```text
Read docs/lyceum-upgrade-plan.md Section 7 and the Kancil SVG approach in C:\Users\abdul\OneDrive\Documents\04 Competitions\03 Shenzhen FinTechathon\submission\production\intro\intro.html. Draw eight characters in src/ui/mascots/ as inline SVG React components in one shape family (rounded geometry, big simple eyes with a catchlight, forest ink at one stroke weight, two-tone shading): the host, a young tree with growth rings at its base and a single lime leaf at the crown, which is Lyceum's own mascot and the source of the product mark; and the seven helpers with the props in the table, lime only as the prop accent. Each has the poses resting, working, waiting and done (the host: greeting, resting, celebrating, reflecting), and a Mascot primitive handles mood, size and reduced motion. Make src/ui/mascots/mark.tsx from the host's silhouette and wire it as the favicon and app icon. Write src/app/moods.ts, a pure function from AppState and the in-flight request list to a mood per role per course (the host's moods follow the ring), and src/prove-moods.ts asserting no mood is working without a request. Write scripts/gen-mascots.mjs rendering every character and mood to PNG at 512 and 1024 (the host also at 2048) into public/brand/mascots/ and the mark to public/brand/. Register prove:moods in package.json and prove:all. Verify with npm run typecheck and npm run prove:all.
```

**A2a, Watch, Report, Decide**

```text
Read docs/lyceum-upgrade-plan.md Sections 4, 5 and 8, then src/ui/screens/EvidenceResearch.tsx, EvidenceWorkspace.tsx, src/app/journey.ts, src/app/runs.ts, src/types.ts and the store. Split Evidence into Watch (collection and sources, with snapshots if A0 took the branch) and Report with a SubRail (Quote, Review, Count, Map, Brief) in the URL. Build the source pane beside each proposed quotation with the matched words highlighted, the denominator Meter, SkillCards with the interval printed and a Waffle, and the coverage ladder. Add BriefDecision to types.ts and the store exactly as Sections 4 and 4.2 specify (adopt, retain, defer, return; bound to the brief, the course version and the term; recipients with the decide capability only, mapped onto today's hats; the author cannot be the sole decider, so a self-recorded decision is labelled and stays open until a second person confirms; immutable; superseded by a newer brief), the Proposal tab and the Approvals screen moved out of the lecturer's navigation into the sandbox, an append-only events slice for decisions, snapshots, adoptions and briefs, a Decide screen, decision buttons on the recipient's Home, and the decision on the timeline with derived lines labelled as derived. Replace the journey bar with the Ring whose segments follow the done rules in Section 4, scoped to the current term and course version; seeded data never counts; a course counts only when it exists and has an outcome; a session counts only when its outcome is current. Fix the stale limitation line in EvidenceWorkspace.tsx that says nothing is collected from the web. Update prove-journey, prove-research and prove-evidence for the new rules and the decision record. Keep every data-demo-id the demo uses or update src/demo/script.ts in the same session. Verify with npm run typecheck, npm run prove:all, npm run build and npm run smoke:curriculum.
```

**A2b, the remaining loop screens, Home, How it works, Landing**

```text
Read docs/lyceum-upgrade-plan.md Sections 2, 4, 5 and 6, then CurriculumWorkspace.tsx, CourseWorkspace.tsx, Studio.tsx, Upload.tsx, Inbox.tsx, Office.tsx and Landing.tsx. Restyle Course, Update (outline before and after with the hours Meter), Teach (session cards, packs, assessment behind a disclosure), Learn (the results and surveys already filed, per-outcome descriptive attainment from the existing upload pipeline with n of N, the protocol status, and the Track A sentence in Section 9.8; the adequacy meter, intervals, pooling and the perception gap are Track B and are shown as planned), History, Home (the Ring and Start here), How it works (the loop graphic with the mascots, the role cards, the derived timeline) and the Landing page (the three-level problem from Section 2.4 with sources, the accreditor mapping from Section 4, the doors strip in monochrome labelled planned, what is proven with dates, two ways in). Every figure on the landing page must exist in docs/claims.md with its source. No synthetic figure on the landing page. Verify with npm run typecheck, npm run prove:all, npm run build and npm run smoke:integrity.
```

**A4, demo and checks**

```text
Read docs/lyceum-upgrade-plan.md Sections 4, 15 and 17, then src/demo/script.ts, src/demo/runner.ts, scripts/demo-smoke.mjs, scripts/walk.mjs, scripts/workspace-smoke.mjs, scripts/curriculum-smoke.mjs, scripts/integrity-smoke.mjs, scripts/generate-guide.mjs and src/app/sectionGuides.ts. Rewrite the self-driving tour to follow the loop in order: Course, Watch, Report (confirm, reject a paraphrase, review, count, map, brief), Decide (Dr Rahman records a decision with a reason), Update, Teach (pack downloaded), Learn (sample results filed), then How it works and the door if A5 shipped. Update the four smokes and the walk for the new routes and assert the decision record and both downloads. Regenerate the section guides and the lecturer guide for the new screens and update the Evaluation suites table. Verify with npm run build, npm run smoke, npm run smoke:integrity, npm run smoke:workspace, npm run smoke:curriculum and node scripts/generate-guide.mjs --check.
```

**A5, the local door**

```text
Read docs/lyceum-upgrade-plan.md Section 11, src/lib/workspaceBackup.ts, src/lib/evidence.ts, src/lib/curriculum.ts and src/lib/slides.ts. Create mcp/ with a stdio MCP server on the official TypeScript SDK that loads a workspace backup JSON named by LYCEUM_WORKSPACE, validates it with parseWorkspaceBackup, and exposes read-only tools lyceum_courses, lyceum_sources, lyceum_evidence_report, lyceum_course_outline and lyceum_brief_draft, plus lyceum_teaching_pack which writes the deterministic PPTX to a path and returns it. Annotate read-only tools as such; no tool mutates the workspace. Add skills/lyceum/SKILL.md under the Agent Skills specification describing the loop, the labels and when to call each tool. Write src/prove-mcp.ts calling every tool against public/demo and a sample backup. Add a docs/doors.md with the Claude Desktop and Claude Code configuration and the sentence that remote access and OAuth are planned. Verify with npm run typecheck and node --test src/prove-mcp.ts, then a manual Claude Desktop run described in docs/doors.md.
```

**A6, deck, diagram, brief, poster**

```text
Read docs/lyceum-upgrade-plan.md Sections 12, 13, 14 and the design note in docs/research/design-and-video-references-2026-10-22.md Section 6. Build deck/ as an HTML deck at 1920 by 1080 on the tokens and bundled fonts with keyboard navigation and the film embedded locally, following the eleven slides in Section 14 with about seven words per slide line, real screenshots from scripts/presentation-shots.mjs, the mascots where they serve a purpose, and the amber token for everything not built. Write scripts/gen-deck.mjs exporting a PDF and a PPTX (one 2x image per slide with the speaker notes as notes) using the pptxgenjs dependency. Write scripts/gen-architecture.mjs rendering the diagram in Section 12 to docs/presentation/architecture.svg and .png with monochrome Simple Icons marks, labels and a legend. Rewrite scripts/gen-brief-pdf.mjs to the tokens and the six steps. No dashes anywhere. Verify by opening the PPTX and the PDF and checking every number against docs/claims.md.
```

**A7, the video**

```text
Read docs/lyceum-upgrade-plan.md Section 16, then the Dataworks pipeline at C:\Users\abdul\OneDrive\Documents\04 Competitions\02 Dataworks Challenge\dataworks\video (README.md, style.md, avatars.json, remotion/scripts/sync.mjs, remotion/src/components/Captions.tsx, remotion/src/anim.ts). Before installing remotion-dev/skills or brag, scan each with SkillSpector as the global CLAUDE.md requires and stop on anything but SAFE. Create video/ with script.md, storyboard.md and style.md, where style.md is the Dataworks style guide rewritten for the tokens exactly as Section 16.1 specifies (the flat cartoon explainer look of the infographics channels, forest field, lime as the one thing to look at, drawn scenes for beats 1, 2, 4, 7 and 8, real app capture inside a drawn frame for beats 3, 5 and 6), a Playwright capture script that records the real app in demo mode per scene at 1920 by 1080, a Remotion project with the compositions Loop90 and Afternoon, captions from the transcripts with the speaker's colour bar and stressed words in lime on forest, the host and a faceless lecturer figure as the two speaking avatars with mouths driven by the voice loudness and the seven helpers at their stations, chapter chips, numbers counting up to the exact claims-register value, and render scripts. Numbers on screen only from docs/claims.md. No dashes, no mention of AI tools in the video. Verify by rendering twice and diffing, then the review checklist in Section 16.
```

**A8, documentation**

```text
Read docs/lyceum-upgrade-plan.md Sections 18 and 19 and the Amanah documentation style at C:\Users\abdul\OneDrive\Documents\01 Coding Project\03 Amanah\docs\as-built.md (the stamp, the plan-versus-built table, the verification tables). Write docs/as-built.md for the Amsterdam build with a stamp, docs/claims.md listing every number on the landing page, the deck and the video with its source and check, docs/demo-script.md for the booth, and refresh README.md, JUDGES.md, team-overlay/FEEDBACK.md and docs/lecturer-guide.md to the loop. Run the full verification (typecheck, prove:all, build, the four smokes, the guide check, the contrast check) and put the results in the as-built table with the date. Scan every .md, .ts, .tsx and .mjs file for en and em dashes and remove them.
```

---

## 18. Documentation and development style

The Amanah standard, applied here: everything written from the code, stamped, verified, with the mismatches named.

| File | What it is |
|:--|:--|
| `docs/as-built.md` | The system as built, with a stamp (date, branch, commit), a plan-versus-built table, exact versions, the verification table with commands and results, and a changelog. Replaces the dated as-built reports going forward; the 9 October report moves to history. |
| `docs/decisions.md` | One paragraph per significant choice with the reason, continued from DECISIONS.md (which becomes a pointer). |
| `docs/claims.md` | The claims register: every number on any surface (landing, deck, video, brief, README) with its source, its label (primary, secondary, vendor, computed) and the script or page that checks it. A proof fails when a figure on the landing page is missing from it. |
| `docs/problem-statement.md` | The problem at three levels, the objectives, the scope, and how each claim stands against what was built. |
| `docs/demo-script.md` | The booth walkthrough with what to say and what not to claim; every step also checked by a smoke. |
| `docs/user-study.md` | The pilot protocol: tasks, measures, baselines, consent, analysis; not run yet, said so. |
| `docs/ui-accessibility-review.md` | What changed, how it was verified, what remains, with the axe and contrast results. |
| `docs/learning-analytics-policy.md` | JISC and DELICATE as written policy for the Learn step. |
| `docs/doors.md` | Each door: what works today, the admin steps, the licence, the status. |
| `docs/video/` and `deck/README.md` | The script, storyboard, style and build notes for the film and the deck. |

Checks: the fifteen proof suites plus moods, mcp and claims; the four browser smokes plus axe; the contrast check; the guide check; the dash scan. Counts are printed in the README the way Amanah prints them. The team repo gets every snapshot through `node scripts/team.mjs publish`; the PR template asks "what is broken, what is labelled, what was verified".

Writing rules: sentence case, plain words, no dashes, numbers with their denominators, "planned" for anything not run by a pilot tenant, "illustrative" for anything synthetic, the lecturer as the subject of every sentence about the workflow.

---

## 19. Housekeeping done on 22 October, and the target layout

Done today, so the plan cites final paths:

- Four pitch documents written for the old palette and the old step order moved to `docs/history/presentation/` (the deck brief, the fellowship pitch pack, pitch v2, the Gemini asset brief); links in the master plan, DECISIONS.md and FEEDBACK.md updated.
- Nine July screenshots nothing referenced moved to `docs/history/screenshots-2026-07/`; the walk and the smokes keep regenerating the ones they own.
- `scripts/gen-xlsx.mjs` deleted (superseded by `gen-demo-files.mjs`, which writes the real sample files).
- `src/agents/evaluator.ts` deleted (never imported; the agent name lives on in the store and the server until W06 rebuilds the agent layer).
- `npm run shots` pointed at `scripts/presentation-shots.mjs` (it named a script that no longer exists).
- Five research notes added under `docs/research/`.

Target layout after Track A:

```text
deck/                 the HTML deck and its assets
docs/
  as-built.md  claims.md  decisions.md  demo-script.md  doors.md  lecturer-guide.md  lyceum-upgrade-plan.md
  lyceum-improvement-plan.md (execution records and W numbers)  problem-statement.md  ui-accessibility-review.md  user-study.md
  presentation/       architecture.svg and .png, the brief PDF, shots, the poster source
  research/           the dated notes
  history/            superseded documents, screenshots and presentations
mcp/                  the local door
skills/lyceum/        the skill folder
video/                script, storyboard, style, capture, the Remotion project
src/
  theme/              tokens.ts (the source) and the generated global.css
  ui/mascots/         the host, the seven helpers and the mark
  ui/primitives/      the components
  ui/screens/         one file per loop step plus Home, Courses, Explore and the sandbox
  app/                store, roles, journey (the ring), runs, moods
  lib/                the deterministic core
  prove-*.ts          the checks
```

---

## 20. Risks and guardrails

| Risk | Guardrail |
|:--|:--|
| The overhaul breaks the demo two days before the flight | The demo and the smokes are updated in the same session as any screen change; the order of sacrifice in 17.1; the freeze on Monday noon |
| Lime used as text on a light surface | The contrast check fails the build |
| A number on a slide that nothing can verify | The claims register; the landing proof |
| A door claimed to work | "Planned" on every surface until a pilot tenant runs it; the local door says local and read-only |
| Mascots read as childish or as fake activity | The moods proof; GitHub's rule on errors and money; one mascot in motion per screen; the Duolingo purpose test |
| Fonts or video fail offline at the venue | Bundled fonts; the film as a local file; the fallback recordings on a USB stick |
| A third-party skill carries something unwanted | SkillSpector before first use; findings shown; nothing installed on CAUTION |
| Remotion or skill licences outgrow the free tier | Rechecked before each release and when the team grows |
| Per-student predictions appear on screen | Cohort-level only; the policy document; the Learn proof |
| The date or the weights move | Nothing else in this plan depends on them; confirm against the ticket and the finalist pack |
| A change on Sunday breaks what worked on Friday | The `pre-overhaul` tag; a release candidate on Sunday night; Monday fixes only demonstrated defects |
| A mark is altered, or a slide reads as a partnership | Official unmodified marks only, the attribution line on the legend and the deck footer, `docs/brand-use.md`; the Remotion ownership question answered on Friday |

---

## 21. Sources

The five notes in `docs/research/` dated 22 October 2026 carry every URL: curriculum latency and the global evidence; statistics; the doors, taxonomies, boards and standards; HackaSTONE, readiness levels, pitch evidence, the market and the competitors; Remotion, mascots, gamification, dashboards, decks and diagrams. The 11 October note carries the Malaysian, ASEAN and world pain figures and the competitor landscape. The master plan's Section 30 carries the earlier source register.
