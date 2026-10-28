# Lyceum: the 4V pitch and the A1 poster, a plan

**Stamp.** Written on Saturday 24 October 2026 for the owner and the presenting team. Plan only: no code, capture or render was changed for it. The Grand Final is on Thursday 29 October 2026 in Amsterdam (docs/competition/grand-final-2026.md). The evidence for every new fact is in [docs/research/pitch-gaps-2026-10-24.md](research/pitch-gaps-2026-10-24.md). Nothing new may go on a slide or the poster until it has a row in [docs/claims.md](claims.md).

**What this plan is for.** The owner's draft script uses the 4V structure (Valued, Valid, Valuable, Valunique) that won GreenWater AI the Upstream Innovate competition. This plan checks that script against the current plan, the code, the competition's criteria and new research. It then proposes the slide structure, what the A1 poster must carry, and the decisions the owner has to make. The next two deliverables, after the owner's answers in Section 9, are the poster brief for ChatGPT (a separate markdown file) and the full timed script with its slides.

## 0. In one screen

1. **The AI claim is the biggest risk.** The script says "the Academic Course Drafter of the future, powered by a multi-agent AI framework". The code says otherwise: "Roles are deterministic workflow steps with optional model help, not autonomous agents" (`src/app/sectionGuides.ts:140`). None of the seven helpers calls a model. The banner already says "Meet Our AI Agents". The fix keeps the theme and stays true: Lyceum is the evidence engine that AI agents call, with a human gate they cannot pass (Section 4, G1).
2. **Valued has no real person and no numbers at the person's level.** GreenWater won with a real technologist and hours per task. Lyceum's figures are national (39%, 32.2%). The fix is Dr Sobri Hashim, with his consent: one quote, one photo, and four numbers from a fifteen minute interview (G2).
3. **Valuable and Valunique are empty on every surface today.** The deck has no price, no market size and no named competitor. Research now gives the counts for TAM, SAM and SOM (Malaysia's ministry, the IAU, ASEAN) and a competitor scan as of October 2026 (G3, G4).
4. **The competition moved.** OpenAI's College Educator plugin (4 August 2026) updates syllabi and reads student results. Coursedog shows job demand inside programme proposals. "Nobody serves lecturers" is no longer safe. The safe claim is the join plus sentence-level receipts: no product found shows the posting sentence behind a count, binds it to a recorded decision, checks the revision, builds the pack and reads the results in one flow (G4).
5. **Drop SerpApi from the pitch.** It scrapes Google pages that Google's robots.txt disallows. Google sued it in December 2025 and amended its complaint in August 2026, after a partial dismissal. Its legal shield covers US claims only. "Used by NVIDIA" is one logo on its own home page, and AMD is not shown. For production, say licensed or official data (G5).
6. **A gift from this month.** On 8 October 2026 the Higher Education Minister said 455 public-university programmes were reviewed this year "to keep up with modern technology, such as AI". The ministry also wants AI elements in 80% of bachelor's programmes. This is the home-market demand signal for Valuable, and it supports "not only IT".
7. **The script is missing its close and runs long.** It has no ask. As drafted, it runs about 9 to 10 minutes against 8 plus 2, with a warning at 7 (G8, G9).
8. **Found while auditing (not fixed here).** The portrait poster committed on 23 October says "Microsoft Word: The course file out". The course file is Markdown in a zip. The only Word file Lyceum writes is the survey document for Microsoft Forms Quick Import. The same slip is in `docs/brand-use.md` and the logo manifest. Each fix is one line (F2).

## 1. Lyceum today, in one page

Read on 24 October from the plan, the depth plan, the as-built record, the code and the claims register.

- **The idea.** "Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use" (plan Section 2.3). Nothing changes a course without a person.
- **The loop.** Course (Folio) sets up. Then come six steps:
  - Watch (Scout)
  - Report (Atlas, Lens, Steward)
  - Decide (people)
  - Update (Quill)
  - Teach (Prism)
  - Learn (Lens)

  Each step is the working form of a clause reviewers already use: AUN-QA 1.4 and QAA (Watch); MQA COPPA 6.1.6 (Report); ABET Criterion 2 (Decide); ESG 1.9 (Update); Biggs (Teach); ABET Criterion 4 (Learn).
- **What runs today** (259 checks in twenty-four suites, four browser smokes):
  - Collection, on request, from Greenhouse and Lever public job-board APIs. 727 postings were fetched live on 9 October.
  - A citation validator that refuses a paraphrase.
  - Counts over the postings a person reviewed, with Wilson intervals.
  - The meeting brief.
  - A decision record with separation of duties: the brief's author cannot decide alone.
  - A checked revision, with before and after.
  - An editable PowerPoint teaching pack.
  - Quiz items with a lint, exported as Moodle XML and QTI.
  - The course file as a zip of Markdown files and rubric spreadsheets.
  - Two student surveys, with importers for Microsoft Forms, Google Forms and Moodle Feedback and a response floor.
  - The OBE course report, the term recap and the programme wall.
  - The judge's walk with Tualang, and the kiosk.
  - The local MCP door: eight tools, seven read-only, tested with the official MCP client.
  - The skill folder (written; no recorded run in an assistant yet).
  - The landing page, live at <https://lyceum-rho.vercel.app>.
- **What AI does today** (the code audit):
  - Helpers and doors:
    - The seven helpers are steps drawn as mascots. Their moods come from saved records, and none calls a model.
    - The MCP door calls no model. It lets an outside AI assistant call Lyceum's tools; Claude does today, locally.
  - Where a model can run (only with a model set in `.env` on the local API; since the take of 29 October 2026 that is any OpenAI-compatible endpoint through `LYCEUM_AGENT_*`, and the Anthropic SDK path of 22 October is gone):
    - The intake read of an uploaded file: its classification, shown for a person to confirm.
    - Two sandbox panels: the critique lines and the verdict prose.
  - Rules:
    - The "live" branches of the older agent functions throw "live mode is not wired".
    - The rule is "model text augments, never replaces, and never moves a number" (plan principle 5).
- **Planned, not built:**
  - Remote MCP doors for ChatGPT Edu, Copilot and Gemini.
  - A Microsoft 365 Copilot and Teams agent.
  - Canvas and Moodle through LTI.
  - A shared workspace with sign-in.
  - Scheduled watching.
  - Pooling, predictions and the benchmark.
  - Model drafting under a lecturer's review (Track B, B7).
  - No Slack or Outlook integration exists in any current plan or code.
- **Figures the register already allows:**
  - 39% and 12 to 18 months.
  - 77% of 10,095 (a vendor survey).
  - 32.2%, 1.60 million and 3.2%.
  - 1 of 9 (the receipt's denominator).
  - 259 automated checks.
  - 727 postings fetched live.
  - 0 keys and 0 paraphrases.
  - TRL 6, with TRL 7 next.
  - About 7 minutes (the tour).
- **The format.** The pitch is at most 8 minutes plus 2 minutes of questions, with a warning at 7, in front of at least three judges; PowerPoint and video are allowed. Then comes a 10-minute booth demo in front of another judge team. A finalist reported 10 plus 5 instead, so rehearse both. The weights (provisional) are Innovation 30, Technology readiness 20, Commercial 15, Education 15, Presentation 10, Demo 10. The theme is "Agentic AI for Education". Simon See of NVIDIA is a general chair; the judges are not named.
- **Personas today.**
  - The deck, film and poster tell the story through Dr Aisyah, labelled fictional.
  - The app's tour signs in as "Dr Sobri", the coordinator of CS310, whose seed record carries a utp.edu.my address.
  - The script adds Sharvin, a teammate in role-play, and the real Dr Sobri Hashim.

## 2. What the GreenWater deck teaches

| Slide | What it did | Why it worked | Lyceum's version |
|:--|:--|:--|:--|
| Title | Big wordmark, a tagline bar, the team, one illustration | Brand in two seconds | Lyceum lockup, one line that is not the banner's, Tualang |
| 01 Valued | A real person with photo, job and site; pain in her units (hours per task, 500+ times a year); five impact boxes; a "Thought" quote | A judge believes a named person with numbers | Dr Sobri Hashim (with consent); hours from an interview; three impact boxes; one thought |
| 02 Valid | The solution as a seven-box flow; "does not take control over everything... advisory mode"; one proof number (2 to 4 minutes); the video; four benefits, each answering a pain, the fourth a "what about" objection | The human stays in charge, said in a quote; the benefits map one to one to the pains | The loop as a flow; "Lyceum never changes a course"; the receipt and the proof strip; the film beside the slides; four answers, the fourth "what about the approval process?" |
| 03 Valuable | TAM, SAM, SOM as nested circles, each a named scope with RM per year | Scale, in the buyer's currency | World, ASEAN, Malaysia, in RM per year, with the assumption printed |
| 04 Valunique | Two named competitors with logos; five feature rows; ticks and crosses with short qualifiers; "We don't just monitor. We optimise." | Specific, visual, ends on a line a judge repeats | Three named competitors; five rows where the join shows; an honest legend; one closing line |
| Thank you | Illustration | Clean exit | The ask, then "Every semester adds a ring." |

## 3. The script against the 4V, the story spine and the criteria

| Part of the script | Story beats (plan Section 4.1) | Criteria it serves | Estimated length as drafted |
|:--|:--|:--|:--|
| Greetings in five languages, the team, "4V" | none | Presentation | 0:20 |
| Valued: Sharvin as lecturer; AI changes every field; the gap grows; the twist (he is a student); Dr Sobri Hashim foresaw it; research; impact; thought | 1 (a person and a question), 2 (why now) | Education 15 | 2:00 |
| Valid: the film on a second laptop; "introducing Lyceum"; the agents one by one; the tools; the loop; the impact of AI; Sharvin's first interruption (approval structures); the answer (assist, not replace) | 3 (the receipt) is missing; 4 (the loop); 5 (the journey); 6 (the proof) is missing | Innovation 30, Technology readiness 20, Demo 10 | 3:00 |
| Valuable: TAM, SAM, SOM; Sharvin's second interruption (why pay, another app); the answer (MCP, ChatGPT, Claude, Copilot, Slack, Outlook, a Copilot lite version) | 7 (the wider world) | Commercial 15 | 2:00 |
| Valunique: the comparison table, all ticks for us; AI in education leans to students | gap check question 3 ("why not just ask ChatGPT?") | Innovation 30 | 1:15 |
| KIV: responsible AI, legitimate sources, SerpApi, people in the loop, verified content | 6 (the proof) | Technology readiness, Innovation | 0:45 |
| (missing) the ask and the close | 8 (the return) | Commercial, Presentation | 0:00 |
| **Total** | | | **about 9:20, against 8:00** |

The 4V order follows the spine well: Valued is beats 1 and 2, Valid beats 3 to 6, Valuable beat 7, Valunique answers "why not ChatGPT", and the close is beat 8. What is missing is the receipt (the strongest artefact the project has), the proof with the readiness level, and the ask.

## 4. The gaps, ranked

| # | Gap | What the script says | What is true or available | The fix | Needs | Priority |
|:--|:--|:--|:--|:--|:--|:--|
| G1 | The AI claim | "Academic Course Drafter of the future powered by Multi agent ai framework"; "explain what agent do one by one"; "impact of using AI" | The helpers are deterministic steps; no helper calls a model; "Course Drafter" appears nowhere; model drafting is Track B. The theme is agentic AI. A judge from NVIDIA will ask "which model, doing what?" | Say it straight: "Seven specialist agents, one per step. The ones that touch evidence are deterministic tools with hard limits, on purpose. The AI agent in this story is your university's assistant: it calls Lyceum's tools through MCP and gets receipts back, and it cannot confirm a quote or decide." Show the local door. Optional build: one guarded model step (F1) | Decision 1 and 2 | Critical |
| G2 | A real person, with numbers | Sharvin role-play; "this problem have been foreseen by... Dr Sobri Hashim"; "give impact" | Valued has no persona-level numbers. No source anywhere gives lecturers' hours on course review. The app's persona is already "Dr Sobri" | Keep the role-play and the twist. Ask Dr Sobri for consent to be named and photographed, one sentence of his own, and four numbers: hours to gather industry evidence for one course; courses he coordinates; years between reviews at UTP; months for an approval. Label them "interview, 1 person, 2026-10-2x" | Dr Sobri by Monday; decision 3 | Critical |
| G3 | TAM, SAM and SOM | "sam is malaysia market, asia market for sam, som for global market"; unsure whether to show the market's worth or price times universities | The plan has a price hypothesis (RM 6,000 to 15,000 per department per year, Section 13). Research found the counts: 22,000 institutions in the world (IAU), about 7,000 in ASEAN, and in Malaysia 20 public universities, 65 private universities, 11 foreign branch campuses and 38 university colleges (MOHE, May 2026) | Nest them the usual way: TAM the world, SAM ASEAN, SOM Malaysia. Size them as buyers times price, not the "worth of the market"; Section 6.3 has the worked numbers. Keep one vendor market figure as a cross-check only | Decision 4 | High |
| G4 | The competitor table | "all of our side tick right, but competitor tick wrong"; "AI in education leans towards students... idk if there idea like this for lecturers" | The scan found every step occupied by someone, and the join occupied by no one (research note Section 7). OpenAI, Microsoft, Google, Instructure and Blackboard now ship educator tools. The investment skew to tutoring is thinly evidenced; the faculty gap is better evidenced (80% of faculty unclear how AI applies to their teaching; 6% fully agree their institution gave them enough training resources) | Five rows where the join shows, with an honest legend (✓ built; ◐ partly; "not shown" where a vendor's public pages do not show it). Columns: Lightcast Skillabi, Coursedog, ChatGPT Edu with the College Educator plugin. The line for the room: "Every other finalist built for the student. We built for the person who designs the course." | Decision 7 | High |
| G5 | SerpApi | "for production we plan to subscribe with production level tool such as serpapi that are used by nvidia and amd" | It scrapes Google; Google's robots.txt disallows /search; Google v. SerpApi has been live since December 2025; the shield covers US claims only; NVIDIA is a logo on SerpApi's page, and AMD is absent. Lyceum's own rule is documented sources with a stated policy | Drop it. Say: "Today, employers' own public job boards through the APIs they document. For production, licensed postings data (Lightcast, Textkernel, Adzuna under licence) or open government data (USAJOBS), each with its terms on record." | Decision 5 | High |
| G6 | Slack and Outlook | "extensions to their app slack etc"; "email / escalation through outlook" | No current plan or code has Slack or Outlook. The plan has Microsoft 365 Copilot and Teams as a planned agent, and the skill folder is built. UTP runs Moodle with Microsoft 365 (a vendor case study) | Say "Microsoft 365 Copilot and Teams (planned)" and "your Moodle or Canvas (planned)". Keep Slack and Outlook out until a pilot asks | Decision 6 | Medium |
| G7 | One proof number | GreenWater had "2 to 4 minutes, 98% less" | No time saving has been measured; "time to a brief" is a pilot measure. What exists: 1 of 9, 0 paraphrases accepted, 727 postings fetched live, 259 checks, TRL 6 | Show the receipt and the proof strip. Say "time to a brief is what the pilot measures". Optional: a stopwatch trial on Monday with one teammate, labelled self-run | none | Medium |
| G8 | The close and the ask | absent | The deck's slide 11: "One department, one term, inside its LMS"; the pilot measures; "Every semester adds a ring." | Add 30 seconds | none | High |
| G9 | Length | about 9:20 | 8:00 plus 2:00, warning at 7:00 | The time budget in Section 6.1; the interruptions stay, each answer under 30 seconds | rehearsal | High |
| G10 | "The gap will increase"; "all departments" | "the gap between the industry and what learn in university will increase" | WEF's skills-instability series is falling (57%, 44%, 39%), so "accelerating" is unsafe. Strong evidence across fields exists: ILO 25% of jobs exposed; the 2024 Chemistry prize for AlphaFold; FDA submissions; illustrators and translators losing work; the minister's 455 programmes | Say "AI is reaching every field, and a course reviewed every five years cannot keep up", with one example per field. Do not say "accelerating". Note the demo course is computing | none | Medium |
| G11 | Education significance (15%) | nothing on students or results | Learn: the OBE report, n of N, the survey beside the marks, no learning gain claimed | One line in Valid: the class gets the pack, and Learn reads the results against the same outcomes | none | Medium |
| G12 | One persona across surfaces | Sharvin, then Dr Sobri | Dr Aisyah in the deck, film and poster; "Dr Sobri" in the app | Pick one story line (decision 3). If Dr Sobri consents, the app's persona and the real person align; if not, keep the role-play and a fictional name everywhere | Decision 3 | Medium |
| G13 | Responsible AI, for an NVIDIA judge | "how our app responsible ai, the scrap are from legit source... human in the loop... verified content" | Strong today: exact quotes or refused, the reviewed denominator, people decide, read-only doors, no AI key, honesty labels, the survey floor. NVIDIA publishes four principles: privacy, safety and security, transparency, nondiscrimination | Map each built guarantee to NVIDIA's four words (Section 6.6). Do not claim NVIDIA endorses anything | none | Medium |
| G14 | The film beside the slides | "another laptop will play demo video" | Loop90 is 87 seconds, silent with burned-in captions, captured before Track C; the longer cut still says 185 checks | Use Loop90 as is (silent suits a talk over it), or re-render at D9 on the owner's go | D9 | Medium |
| G15 | Small things | "vanekem"; "Drrafter"; numbers | Tamil "Vanakkam"; add Malay "Selamat petang"? The plan's rule of five numbers will not hold under 4V | Decide the number budget (decision 8) | Decision 8 | Low |

## 5. What the research adds

The full tables, quotes and links are in the research note. The strongest items for the stage:

- **Malaysia's own clock and push.** MQA requires a compliance evaluation of every accredited programme at least once in five years (COPPA, P). The minister reported 455 programmes reviewed in 2026 for AI, with AI elements planned for 80% of bachelor's programmes (S). TalentCorp: "educational programmes must adapt alongside industry advancements" (P).
- **The size of the home market.** There are 20 public universities, 65 private universities, 11 foreign branch campuses and 38 university colleges, with 74,047 academic staff in 2025 (MOHE, P). The register holds 19,006 qualifications (MQA, P).
- **The world.** There are about 22,000 higher-education institutions (IAU, P) and about 7,000 in ASEAN (EU SHARE with the ASEAN Secretariat, P, an estimate).
- **What buyers pay elsewhere.** Single-module curriculum tools run about USD 15,000 to 40,000 a year; accreditation suites about USD 60,000 to 115,000 (US college board records, P). No Malaysian record was found.
- **Beyond computing.** One job in four is exposed to generative AI (ILO, P). The 2024 Chemistry prize went to protein structure prediction (P). The FDA has seen more than 500 drug submissions with AI components (P). 75% of UK financial firms use AI (P). 26% of illustrators and 36% of translators have lost work (S).
- **Faculty are underserved.** 80% of faculty are unclear how AI applies to their teaching, and 6% fully agree their institution gave them enough resources to train their AI literacy (Digital Education Council 2025, S). Only 12% of institutions embed career-connected learning in every undergraduate department (Tyton 2026, V).
- **Competitors.** Section 7 of the note: the join is unoccupied; each step is not.
- **SerpApi and licensed data.** Section 9 of the note.
- **NVIDIA's four principles.** Section 10 of the note.

## 6. The proposed 4V pitch: 8 minutes

### 6.1 The time budget

| Clock | Part | Who | On screen (laptop 1) | Laptop 2 |
|:--|:--|:--|:--|:--|
| 0:00 to 0:15 | Greetings, the team, "4V" | Speaker A | Title: Lyceum, the 4V roadmap | Kiosk loop |
| 0:15 to 1:45 | 01 Valued | Sharvin, then Speaker A | The persona, the pains, three impact boxes, the thought | Kiosk loop |
| 1:45 to 4:15 | 02 Valid, with interruption 1 at about 3:15 | Speaker B; Sharvin interrupts | The receipt, the loop flow, the proof strip with TRL, four answers | Loop90 film from 2:00 |
| 4:15 to 5:45 | 03 Valuable, with interruption 2 at about 5:00 | Speaker C; Sharvin interrupts | TAM, SAM, SOM; the doors; why a department pays | The door in Claude Desktop (still) |
| 5:45 to 6:45 | 04 Valunique | Speaker C | The comparison table, the closing line | Kiosk loop |
| 6:45 to 7:25 | Responsible AI | Speaker B | NVIDIA's four words, Lyceum's guarantees | Kiosk loop |
| 7:25 to 8:00 | The ask and the close | Speaker A | One department, one term, inside its LMS; the pilot measures; the ring | Kiosk loop |

The warning at 7:00 lands inside responsible AI, which can shrink to one sentence if the clock runs late. Rehearse a 10 plus 5 version as well: it adds the live receipt (a click opens the posting) inside Valid.

### 6.2 01 Valued

- **Persona (role-play, 20 s).** Sharvin plays a lecturer and course coordinator for computing, business and engineering students who sees AI reaching every field. Use one example each, from the research note:
  - biology: AlphaFold and the 2024 Chemistry prize;
  - engineering: AI forecasting in operations at ECMWF;
  - creative work: illustrators and translators losing work.
- **The twist (25 s).** "Sharvin is a student. But the problem is real. Our chair of department, Dr Sobri Hashim, saw it first." Then Dr Sobri's own sentence, with his consent. Then the ministry: 455 programmes reviewed this year for AI, and every programme checked at least once in five years.
- **Pains (in Dr Sobri's units, from the interview).** Up to four tiles, for example: hours to gather industry evidence for one course; courses per review; years between reviews; months for an approval. Until the interview is done, two public tiles can stand in:
  - "Approving a new degree programme: 12 to 18 months (US universities cited)";
  - "Every accredited programme: checked at least once in five years (MQA)".
- **Impact (three boxes).**
  - 32.2% of employed Malaysian graduates, 1.60 million people, work below their qualification (registered).
  - Employers expect 39% of workers' skills to change by 2030 (registered; never on one chart with approval time).
  - One more needs registering first. Either 66.0% for graduates aged 24 and below (DOSM), or 63% of employers naming skill gaps the biggest barrier (WEF).
- **Thought (10 s), in the persona's voice.** "Carrying on like this, we approve a course on last year's evidence and teach it for five more. Our students graduate into a job market that moved without us." The quote is not Dr Sobri's unless he says it.

### 6.3 02 Valid

- **The receipt first (20 s).** "Introducing Lyceum." Then the Stripe sentence, its date, its link, "1 of 9 reviewed postings". "This is a receipt. Every claim Lyceum makes has one."
- **The loop, agents step by step (50 s).** The film runs on laptop 2.
  - Watch: Scout fetches an employer's public board, on request.
  - Report: Atlas proposes each quote beside its source; a paraphrase is refused; Lens counts over the postings a person reviewed; Steward drafts the brief.
  - Decide: people decide, and the record says who, when and why.
  - Update: Quill checks the revision against the hours and the protected topics.
  - Teach: Prism builds the editable PowerPoint pack.
  - Learn: Lens reads the results against the same outcomes, n of N.

  Say once: "The agents that touch evidence are deterministic tools with hard limits, on purpose."
- **Proof strip (20 s).** 259 automated checks pass; 727 real postings were fetched live from one employer's board; 0 paraphrases accepted as evidence; TRL 6, self-assessed, with TRL 7 next: one department for one term.
- **Interruption 1 (40 s).** Sharvin: "You talk about AI this and AI that. Course changes have a structure and an approval process. We cannot let AI do it." Answer, under 30 seconds:

  > Agreed, and that is the design. Lyceum never changes a course. It speeds up the evidence work: the research, the report, the brief, the pack and the results. A person decides at Decide, the record keeps who and why, the author of a brief cannot decide alone, and formal approval stays in the university's own process. That is what makes it valid.
- **Four answers (20 s), GreenWater style.**
  1. No more guesswork: every count has its sentence.
  2. No more waiting five years: the loop runs every semester.
  3. No more lost decisions: who decided, when and why, on record.
  4. What about the approval process? People decide; Lyceum keeps the evidence that goes into it.

### 6.4 03 Valuable

- **TAM, SAM, SOM (30 s).** Buyers times price, each scope named, the assumption printed on the slide. Worked numbers, for the owner to accept or change:

| Scope | Buyers (source) | If each buys ten departments at USD 1,400 to 3,500 a year (RM 6,000 to 15,000) | Per year |
|:--|:--|:--|:--|
| TAM, the world | about 22,000 institutions (IAU, P) | USD 14,000 to 35,000 per institution | USD 308 million to 770 million |
| SAM, ASEAN | about 7,000 institutions (EU SHARE and ASEAN Secretariat, P, estimate) | the same | USD 98 million to 245 million |
| SOM, Malaysia first | the 20 public universities (MOHE 2025, P), where the ministry reviewed 455 programmes for AI this year | the same | USD 280,000 to 700,000 |

Updated on 24 October at the owner's request: USD for an international jury, and the SOM narrowed from all 134 Malaysian university-level institutions (USD 1.9 million to 4.7 million a year) to the 20 public universities, because a SOM is what can be won first, not the whole home market.

Checks on the assumption:
- **Against what buyers pay.** Ten departments at USD 1,400 to 3,500 make USD 14,000 to 35,000 per institution. That is in the range US colleges pay for one curriculum module, USD 15,000 to 40,000 a year (P).
- **Against the staff count.** 74,047 academic staff in departments of about 25 give about 2,960 Malaysian departments, or USD 4.1 million to 10.4 million a year across all of Malaysia. The 134 university-level institutions alone give USD 1.9 million to 4.7 million, the same order.
- **Against vendor research.** It values curriculum management software at about USD 3.5 billion a year (V); that is a ceiling, not a target.
- **The first step.** Three to five pilot institutions, then one or two paid department licences in two years (plan Section 13).
- **Interruption 2 (45 s).** Sharvin: "Why would a university pay? Every university has its own systems. This is another subscription, another app on top of a dozen." Answer:

  > Three reasons. The review happens anyway: MQA checks every programme at least once in five years, and the ministry reviewed 455 programmes for AI this year. It is not another app: one core, many doors, so the web workspace, and the university's own assistant through MCP. Claude does that today, locally; ChatGPT Edu, Microsoft 365 Copilot and Teams, Gemini, and Moodle or Canvas are planned. And it is free to try: one course, one laptop, no account. A department pays for the shared workspace and the doors, and the pilot tests whether it renews for a second term.

### 6.5 04 Valunique

The table, to be verified cell by cell against the vendors' pages before it is printed. In the legend, "not shown" means the vendor's public pages, read on 24 October 2026, do not show it; it is not a claim that the product cannot do it.

| What it does | Lyceum | Lightcast Skillabi | Coursedog | ChatGPT Edu, College Educator plugin |
|:--|:--|:--|:--|:--|
| The exact job-posting sentence behind every skill count | ✓ | not shown (a score and a skill list) | not shown (job demand, no source text) | not shown |
| Counts over the postings a lecturer reviewed, with an interval | ✓ | not shown | not shown | not shown |
| The decision bound to that evidence, by a named person | ✓ | not shown | ◐ approval routing and an audit trail | ◐ drafts reviewed, no record |
| The revision checked against hours and protected topics | ✓ | not shown | not shown | not shown |
| The teaching pack built from the approved change | ✓ | not shown | not shown | ◐ materials, not tied to a decision |

- **The line for the room.** "Most AI in education helps students study or teachers make slides. Every other finalist here built for the student. We built for the person who designs the course."
- **Closing line options.** "Others draft or score. We show the receipt, and people decide." Or: "We don't just find skills. We show the sentence."

### 6.6 Responsible AI, in NVIDIA's own four words

| NVIDIA principle | What Lyceum does today |
|:--|:--|
| Privacy | One course runs on one laptop, no account, no AI key. A survey shows nothing below its response floor or before grades are released. The assistant door reads an exported file and writes nothing to the workspace. |
| Safety and security | The numbers come from deterministic code. A paraphrase is refused before it is stored. Collection runs only on request, from boards whose terms permit it. The door's tools are read-only, and none confirms a quote, adopts a change or decides. |
| Transparency | Every count shows its sentence, link, date, fingerprint and n of N. Every decision records who, when and why. Every surface says what is real, illustrative or planned. |
| Nondiscrimination | Job postings over-represent some occupations, so Lyceum names its boards and shows the denominator rather than hiding the gap. People review every posting a count uses. |

The data-source sentence: "Today, employers' own public job boards through the APIs they document. For production, licensed postings data or open government data, each with its terms on record." Say NVIDIA's principles are the frame, never that NVIDIA endorses Lyceum.

### 6.7 The ask and the close (35 s)

"We ask for one department, for one term, inside its LMS. We will measure task completion, citation fidelity, time to a brief, repeat use, and whether it renews for a second term. Receipts. People decide. The tools you already use. Every semester adds a ring."

### 6.8 Reusing the current deck

| 4V part | From the current deck | New |
|:--|:--|:--|
| Title | slide 1's lockup | the 4V roadmap |
| 01 Valued | slide 3, the latency (two pictures, never one chart) | the persona, the pain tiles, the impact boxes, the thought |
| 02 Valid | slides 1 (the receipt), 4 (the loop), 5 to 7 condensed, 8 (what is real) | the four answers |
| 03 Valuable | slides 9 (the doors) and 10 (why a department pays) | TAM, SAM, SOM |
| 04 Valunique | none | the table, the line, responsible AI |
| Close | slide 11 (the ask) | none |

The deck generator checks every figure against the register, so each new figure gets its row before the slide is built.

## 7. The poster: what it carries, and how ChatGPT should make it

### 7.1 What the owner asked for

The poster should take the banner's graphic, unwordy look and the teammate's A1, carry what the slides carry plus the architecture, and use real logos. It should not repeat the banner (the agents only as a small graphic), and it should tell one story, not random facts in random places. ChatGPT does the design; this plan fixes the content.

### 7.2 The content, top to bottom (A1 portrait, 594 by 841 mm)

| Block | Carries | Visual | Text budget |
|:--|:--|:--|:--|
| Header | The Lyceum lockup; one line that is not the banner's; the 4V roadmap as four chips; a small strip of the helpers | Forest band, lime accent | 15 words |
| 01 Valued | The persona (Dr Sobri with consent, or the role-play); up to four pain tiles; three impact boxes; the thought | Photo circle, tiles, quote | 60 words |
| 02 Valid | The loop as a flow with the helpers as small icons; the receipt card; the quote "Lyceum never changes a course. It brings the evidence; people decide."; the proof strip (259, 727, 0, TRL 6 to 7); the four answers | Flow diagram, a slip of paper, a ladder | 80 words |
| The system | People, then the doors (logos with built or planned), then the core's engines, then job boards and files in and out (logos) | The architecture, full width | 60 words |
| 03 Valuable | TAM, SAM, SOM circles with USD per year and the assumption; why a department pays (the five-year check, the 455 programmes, the free, department and institution ladder) | Nested circles, a ladder | 50 words |
| 04 Valunique | The table (Section 6.5); the closing line | Table with ticks | 50 words |
| Responsible AI | The four tiles of Section 6.6 | Four icons | 50 words |
| The ask | One department, one term, inside its LMS; the pilot measures; "Every semester adds a ring."; the QR to the landing page | Rings, QR | 25 words |
| Footer | The UTP mark beside the demo line; the ownership line; the sources line | Small type | as needed |

### 7.3 Rules ChatGPT must keep (they go into the brief)

- Text exactly as given. No invented number. No en or em dashes.
- The palette from `src/theme/tokens.ts`:
  - forest `#0F2A20`;
  - lime `#B8F23A`, on forest only and never as text on a light surface;
  - emerald `#1C7C54`, with emerald text `#176B4A`;
  - mint `#E9EFE7`, tint `#EEF6EF` and `#DDEFE1`, white;
  - ink `#0F2A20` and `#4E6258`;
  - amber for planned: `#8A5A00` on `#FCF0E0`.
- Type: Bricolage Grotesque for display, Plus Jakarta Sans for body, JetBrains Mono for labels. All three are free on Google Fonts.
- Logos are never drawn by the model. Each sits in a labelled placeholder, to be replaced with the owners' files from `public/brand/partners/logos/`, beside its full product name and its status. ChatGPT Edu stays as text, because OpenAI's mark was not downloaded. Copilot is named in text beside the Microsoft 365 icon.
- Mascots are placed from `public/brand/mascots/*.png`, never redrawn.
- The UTP mark goes only in the footer, beside the demo line, never in the title. The ownership line goes in the footer.
- Every planned item carries the word "Planned".

### 7.4 How to get a printable file out of ChatGPT

An image model renders small text unreliably and does not output print resolution at A1 (about 3,500 by 4,970 pixels at 150 dpi). The brief will ask for two things in order:

1. A concept image, to agree the look.
2. An editable A1 file (PowerPoint at 594 by 841 mm, or SVG), built with code from the exact text, with placeholders for the logos and the mascots.

The team then places the real files, exports a PDF, and checks every figure and dash against this plan. Fallback: the existing generator (`scripts/gen-poster.mjs`) already holds most of these blocks with the checks built in, and a 4V version is a few hours' work if ChatGPT's file disappoints.

The portrait poster committed on 23 October tells the eight-beat story. The 4V poster would replace it at the booth (decision 9).

## 8. Functionality notes, for later

Noted as asked; none is started by this plan.

| # | Note | Status today | When |
|:--|:--|:--|:--|
| F1 | One guarded model step: a model proposes candidate quotes, the citation validator checks each is an exact substring, the lecturer confirms. It makes "AI agent" literally true for Atlas, without moving a number | Not built (B7 is model drafting, Track B) | Optional before the freeze, the owner's call |
| F2 | The Word slip: the poster tile, `docs/brand-use.md` and the logo manifest say the course file is a Word document; it is Markdown in a zip. The Word file is the survey document for Forms Quick Import | Wrong since 23 October; published to the team | One-line fixes, on the owner's word |
| F3 | Personas: the app's "Dr Sobri" carries a utp.edu.my address in the seed; if the real Dr Sobri does not consent, rename the persona and its address | Seed data | With decision 3 |
| F4 | A licensed or official job-data source for production (USAJOBS open; Adzuna, Lightcast or Textkernel under licence) | Greenhouse and Lever only | Track B |
| F5 | Remote MCP doors for ChatGPT Edu, Copilot and Gemini | Planned (B4) | Track B |
| F6 | The Microsoft 365 Copilot and Teams agent: the "lite version" the script mentions | Planned | Track B |
| F7 | Slack and Outlook | Not in any plan | Only if a pilot asks |
| F8 | A non-computing sample course, so "every field" has a demo behind it (posting coverage is thinner outside computing and business) | All seeded courses are computing, mathematics or statistics | After the final |
| F9 | Measuring time to a brief inside the app, for the pilot | Not built | Track B |
| F10 | The film: voices, and the longer cut's stale "185 checks" | Silent; captured before Track C | D9, on the owner's go |
| F11 | The pack's footer still says "no AI-written text"; the other surfaces say "Lyceum adds no AI text" | Inconsistent | Small |
| F12 | The recorded Claude Desktop run for `docs/doors.md` | Config merged on 23 October; the run needs the owner | Before the booth |

## 9. Decisions for the owner

Each with a recommendation. Answering "go with the recommendations" is enough for the poster brief to be written next.

1. **The AI framing.** Recommended: the honest agentic framing in G1 (specialist agents, deterministic where it must be right; the university's assistant calls Lyceum through MCP; people decide). The alternative is to keep "multi-agent AI framework" and accept the question it invites.
2. **The product line.** Recommended: drop "Academic Course Drafter". Use Lyceum with "Course decisions, with receipts", or "the evidence engine for course reviews".
3. **The persona.** Recommended: Sharvin's role-play, then Dr Sobri Hashim, with his consent, a quote, a photo and the four interview numbers; Dr Aisyah retires from the pitch and the poster. If he declines, keep the role-play and a fictional name everywhere, and rename the app's persona (F3).
4. **TAM, SAM, SOM.** Recommended: world, ASEAN, Malaysia, as buyers times price, using the plan's RM 6,000 to 15,000 per department per year and ten departments per institution, with the assumption printed. Or change the departments, the price or the scopes.
5. **SerpApi.** Recommended: drop it; use the licensed and official data sentence.
6. **Slack and Outlook.** Recommended: replace them with Microsoft 365 Copilot and Teams (planned) and Moodle or Canvas (planned).
7. **The competitor columns.** Recommended: Lightcast Skillabi, Coursedog, ChatGPT Edu with the College Educator plugin. Alternatives: Watermark, Blackboard's AI Design Assistant.
8. **The number budget.** The plan's rule of five numbers in the talk does not fit 4V. Recommended: about ten, each registered first.
9. **The poster.** Recommended: the 4V poster replaces the portrait poster at the booth; A1 portrait; ChatGPT designs it from the brief, and the generator is the fallback.
10. **Fix F2 now?** Recommended: yes; it is one line in each of three files.
11. **A Codex review of this plan** (read-only, the files embedded through stdin)? Only if the owner allows sending the plan to Codex.
12. **Who says what.** Speakers A, B and C, plus Sharvin, in Section 6.1. Names, please.
13. **The flight time.** It sets the freeze and the print deadline.

## 10. Questions to rehearse, beyond the plan's ten

Each answer is one breath and ends on what is on screen.

- **Which model do your agents use?** "None, for the numbers: on purpose. Scout calls the employer's documented API; the counts are code you can check. A model may read an uploaded file's type, and a person confirms it. The AI agent here is your university's assistant: it calls Lyceum through MCP, as Claude does on this laptop, and gets receipts back."
- **Isn't ChatGPT's College Educator plugin doing this?** "It drafts materials and can update a syllabus. It does not show the job-posting sentence behind a change, keep a reviewed denominator, record who decided, or check the change against the hours. Lyceum does those four, and an assistant can call it."
- **How do you get job data legally at scale?** "Employers' own public boards through the APIs they document, on request, today. For production, licensed postings data or open government data, each with its terms on record. Never LinkedIn, Indeed or Workday feeds."
- **Coursedog and Watermark already exist. Why you?** "They route proposals and show programme-level demand. None shows the sentence behind a count, binds it to the decision, and builds the pack. Lyceum can sit beside them; a licensed dataset is just another source."
- **What is your TAM based on?** "Counts from the IAU, ASEAN and Malaysia's ministry, times a price the pilot tests, with the assumption on the slide."
- **Is Dr Sobri real?** The honest answer, as decided in decision 3.
- **Biology or creative jobs are not on Greenhouse.** "True: postings over-represent some fields, and we show the denominator and name the board. The loop is the same in every field; the source list grows with licensed data."

## 11. Next steps and the days left

| Day | What | Who |
|:--|:--|:--|
| Saturday 24 | Read this plan; answer Section 9; message Dr Sobri (consent, a sentence, a photo, fifteen minutes) | Owner |
| Saturday 24 | The poster brief for ChatGPT, written from the answers | Claude |
| Saturday 24 to Sunday 25 | ChatGPT's concept, then the editable A1; the real logos and mascots placed; every figure checked; the new figures registered in `docs/claims.md` | Owner, Claude |
| Sunday 25 | Send the poster to print (confirm the shop's lead time for A1) | Owner |
| Sunday 25 to Monday 26 | The full timed 4V script and the slides; the Valunique table checked cell by cell | Claude, team |
| Monday 26 | Rehearsal one, with the interruptions; a sceptical judge runs the gap check | Team |
| Tuesday 27 | The freeze (12:00 Kuala Lumpur time, or 24 hours before the flight); D9 only on the owner's written go; rehearsal two | Team |
| Thursday 29 | The Grand Final | Team |
