## 1. Sceptical judge review

References to “plan” mean `docs/lyceum-upgrade-plan.md`. README.md and DECISIONS.md were not embedded, and `src/ui/screens/EvidenceWorkspace.tsx` is only an excerpt; their missing contents, source pages and reported test results remain unverified.

- **Innovation, 30%:** “Only lecturer-facing” and “none” of the competitors offer these capabilities exceed the limited product-page review. The strongest distinction is the inspectable chain from quotation to decision to teaching material; demonstrate that chain and answer why ordinary document search plus ChatGPT cannot reproduce its safeguards. Seven named roles do not establish seven AI agents, so explain precisely where AI contributes. (Plan §§1, 11, 13, 14.)
- **Technology Readiness, 20%:** TRL 6 is a self-assessment, not established by passing software checks. Name the real syllabus, lecturer and realistic problem used for validation; distinguish local role switching from authenticated committee approval, and exported backups from connected university systems. (Plan §§1, 4, 11, 14.)
- **Commercial Viability, 15%:** “Near-zero” adoption and variable cost ignore setup, review labour, hosting, support and institutional approval. A department price hypothesis, budget owner, procurement route and measurable pilot conversion condition would be more convincing than worldwide institution counts. (Plan §§3, 11, 13.)
- **Education Significance, 15%:** Programme approval timelines and graduate underemployment do not establish that missing job-posting evidence causes either problem. The credible near-term benefit is better documented decisions and potentially less preparation work; beating a prediction baseline would establish neither learning gains nor the causal effect of a revision. (Plan §§2, 9, 14.)
- **Presentation, 10%:** The receipt opening is strong, but eleven slides, a live workflow, learning analytics and a dense architecture diagram compete for eight minutes. Two bars cannot meaningfully compare months with a percentage, and the proposed content already strains the five-number limit. (Plan §14.)
- **Demo, 10%:** Rejection of a paraphrase and an editable pack are strong demonstrations. The six-minute booth path adds account switching, results import, PowerPoint and Claude, while Claude reads an export that could predate the demonstrated changes; specify one consistent dataset and a tested transition to the fallback. (Plan §§11.4, 15.)

## 2. Contradictions and gaps

- **The current workflow differs materially.** `src/app/journey.ts` and `src/demo/script.ts` put outline adoption before evidence and the brief last; neither implements the proposed Decide or Learn stages. This is a workflow and data change, not just restyling. (Plan §§4, 17.1.)
- **Completion needs stronger definitions.** `journey.ts` accepts an existing subject without an outcome, any source without review, and a session with any outcome ID without checking that it remains current. Its comment excludes seeded examples, but the function has no explicit seed exclusion; upstream safeguards are unverified. (Plan §§4, 8.)
- **Decisions are underspecified.** `BriefDecision` lacks explicit links to the proposed revision and term, while permissions, conflicting decisions, amendments and invalidation after evidence changes are unspecified. Any recorded decision appears to complete Decide, including “defer” or “return”, yet Update then requires adoption; retaining the course should also be a legitimate completed outcome. (Plan §§3, 4, 8.)
- **The semester loop can remain permanently complete.** Existing journey predicates inspect accumulated records, and the proposed rules do not consistently scope them to the current term, evidence snapshot and course version. Historical completion must not certify a new semester. (Plan §§4, 8, 9.)
- **The timeline is not an immutable audit trail.** `src/app/runs.ts` timestamps the current count using source addition times, despite later quotation or review changes, and timestamps assessment drafts using course-version changes. Those are not necessarily the times the displayed actions occurred. (Plan §§4, 12, 13.)
- **Existing copy contradicts collection.** The Evidence excerpt says “nothing is collected from the web” immediately above `ResearchRun`, while the demo script describes a live board fetch. Correct the limitation where it appears, including the distinction between manual documents and collected postings. (Plan §§1, 4, 10.)
- **Learn crosses the track boundary.** A2b, the pitch and booth promise attainment, surveys and their gap, but B2 owns the relevant maths and implementation. Define the exact Track A fields and calculations, or label that part planned. (Plan §§9, 14, 15, 17.)
- **The honesty rules conflict.** The local door is both demonstrably built and “planned until a pilot tenant runs it”; a file-producing tool also contradicts “writes nothing”. Separate local demonstration, production deployment and workspace mutation, and resolve the blanket ban on model-written artefacts against B7’s reviewed model drafts. (Plan §§0, 11, 17.2, 18.)
- **The token rule cannot literally hold.** Generated CSS necessarily contains colour values outside `tokens.ts`, and §16 introduces `#0B1F17`, absent from the palette. Specify permitted generated outputs and check that they match the source. (Plan §§6, 16, 17.4.)
- **Governance needs explicit boundaries.** Read-only remote tools still require authentication for private course data; structured JobPosting markup does not itself grant collection permission. Article 22 is not a blanket prohibition on individual predictions, and the statistics note explicitly distinguishes Malaysia’s law. (Plan §§9.7, 10, 11.)
- **Several execution claims conflict.** A0 repeats a review already reported complete; §18 retains fourteen base suites despite the snapshot branch bringing fifteen; the claims register arrives after screens that depend on it. Freeze also assumes tagging and publishing despite the owner-only commit rule. (Plan §§0, 1, 17, 18.)
- **Presentation delivery is unresolved.** The calendar specifies PowerPoint and video, but the plan presents HTML and exports image-only slides without specifying embedded playback in PowerPoint. Monochrome logos also do not remove the permissions concerns documented in the design research. (Plan §§12, 14, 16.)

## 3. Track A schedule

**The weekdays are wrong:** 23 October 2026 is Friday, 24 Saturday, 25 Sunday, 26 Monday and 27 Tuesday. Resolve whether freeze means Monday 26 October or Tuesday 27 October, then record its timezone and relation to the flight. (Plan §17.1.)

One developer and one coding agent cannot reliably complete a theme migration, routing rewrite, decision persistence, analytics, seven characters, MCP server and changed browser automation in four build days. Seven teammates can own research, recordings, slides and testing, but the proposed “parallel sessions” still compete for shared code and the same coding agent. (Plan §§17.1, 17.3.)

**Cut first, in this order:**

1. Mascot poses, moods infrastructure, waffle and decorative ring work.
2. The second film and bespoke deck, diagram and animation pipelines.
3. Navigation changes across every screen and unsupported Track A analytics.
4. Additional MCP tools beyond one evidence-report demonstration, if necessary.

Keep the source pane: it directly supports Lyceum’s central verification claim. Dropping the entire local door first sacrifices the organiser’s explicit platform request before lower-value decoration. (Plan §§1, 17.1.)

| Actual day | Achievable priority |
|:--|:--|
| Friday 23 | Preserve a recoverable baseline, integrate snapshots if safe, establish the claims register, lock one demo scenario and make focused theme changes. |
| Saturday 24 | Implement the decision record and essential Report improvements, update affected proofs and smoke tests immediately, attempt one local MCP reporting tool. |
| Sunday 25 | Freeze the capture candidate, verify the complete path and backup, produce slides and one recording, run the first timed rehearsal. |
| Monday 26 | Fix only demonstrated defects, test offline playback and accessibility, complete documentation, rehearse and package the release candidate. |

Missing from the day plan: a rollback checkpoint, named acceptance owners, tested backup migration, a lecturer usability session, export refresh before the MCP demonstration, actual PowerPoint playback, licence clearance, print deadlines and contingency time. Rehearsals must start before Sunday’s final documentation and media work. (Plan §§15 to 17.)

## 4. Numerical and source audit

Research references below:

- **L:** `docs/research/curriculum-latency-global-2026-10-22.md`
- **S:** `docs/research/statistics-2026-10-22.md`
- **D:** `docs/research/doors-and-taxonomies-2026-10-22.md`
- **H:** `docs/research/hackastone-and-competitors-2026-10-22.md`
- **V:** `docs/research/design-and-video-references-2026-10-22.md`

Agreement with a note establishes transcription, not independent verification of its source.

| Plan reference and figure | Finding |
|:--|:--|
| Calendar, §17.1: 29 October, 8 + 2 minutes, 10-minute booth; judging percentages | The event date and durations match H §1. Weights remain provisional, and the dated finalist letter is not supplied. The schedule’s weekdays are incorrect. |
| §2.1: 12 to 18 months, four to six months, 12 months before delivery, two to five years | L §1 supports specific institutional examples. These mix new-programme approval, course changes, advance deadlines and periodic reviews; they do not establish a worldwide measured delay. Indiana also gives an approximate three-month minimum. |
| §2.1: Malaysia’s three to five years | Unsupported in the supplied notes. The referenced earlier research is missing. |
| §§2.1, 2.4: 39%, over 1,000 employers, 55 economies | Match L §2, primary WEF research. The 39% is an employer-based expectation for 2025 to 2030, not an observed transformation or certain future outcome. |
| §2.1: 32%, 66%, five-year half-life | Match vendor material in L §2. Preserve the studied scope, the “other roles” comparator for 66%, and the dated, estimated nature of IBM’s half-life; these are not universal constants. |
| §2.1: 23% OECD, 42.6% India, “one in five” England | OECD is secondary reporting through LBC, not a fetched OECD primary source. India is a vendor assessment of graduates applying for jobs; England is a computed approximation, about 22.5% from the supplied employment rates. (L §4.) |
| §2.4: 77%, 10,095 employers, 45% in 2014 | None appears in the five supplied notes. Unverified, including geography, denominator and comparability across years. |
| §§2.1, 2.4: 32.2%, 1.60 million, 3.2% unemployment | L §4 repeats the first two but delegates verification to the missing 11 October note; 3.2% is absent. Verify the employed-graduate denominator rather than saying simply “graduates”. |
| §2.2: “1 in 700 hires” | Absent from the supplied notes. Unverified. |
| §2.1: campus populations of 460,000, 50,000, 65,000 and over one million | L §5 supports access announcements, not measured adoption. Northeastern is vendor material, Italy is secondary/vendor, and Manchester’s quoted source says people “will benefit”, weaker than a completed rollout claim. |
| §§2.1, 4: numbered accreditation clauses | The clauses do not uniformly mandate documented employer or job-posting evidence. QAA says “encouraged”; AUN-QA, HESF and NAAC are secondary reproductions; MQA’s source is missing, and the added ESG 1.2 mapping is not substantiated in L §3. AACSB 2026’s stated transition timing also matters. |
| §9.1: 95%, ±5 points, 36 or 37 of 40, 92 of 120, 169 of 300 | The last two match the formula; the first requires rounding up to **37** to meet the stated bound. All require the sampling assumptions in S §1, so reaching the count cannot justify “representative”. |
| §9.1: census below 200 | S §1 explicitly associates the approximate threshold with Israel and discusses Nulty’s different precision standards. Attribute the threshold accurately and present a census as a collection target, not protection against non-response bias. |
| §9.1: Jeffreys below 40; bootstrap above about 15 | S §2 recommends Wilson **or** Jeffreys at small samples, not replacing Wilson because it generally misbehaves. The approximately 15-person bootstrap threshold is unsupported; multiplying an unspecified Wilson interval by an FPC is also not a complete implementation rule. |
| §1: change when two 95% intervals do not overlap | The notes do not validate this as the appropriate change test for overlapping posting windows. Describe it as a conservative display rule, with sampling and dependence limitations, rather than evidence that market demand changed. |
| §9.2: 25 students, ±19 to ±10 points, three earlier cohorts | S §3 supplies this illustration without cohort sizes, between-cohort variation or a reproducible calculation. It is not a guaranteed precision improvement; adding a redesign covariate cannot guarantee that pooling preserves a real break. |
| §9.3: 100 responses, stable at 150, 10 to 15 judges | S §4 ties 100 to a particular Rasch precision target; “stable at 150” appears only in the note’s recommendation table, without a demonstrated Linacre derivation. The panel size is supported as guidance, not a universal validity guarantee. |
| §9.5: six cohorts and one held-out semester | S §6 requires several observations on each side for interrupted time series, not a universal six-cohort minimum. One baseline win does not establish learning gains; Brier scoring also needs a defined probabilistic event, unlike ordinary continuous attainment prediction. |
| §9.6: 100 to 200 comments | S §7 identifies this as Lyceum’s proposed protocol, not a validated sufficiency threshold. Specify sampling, rare-theme coverage and separate human agreement from model coding accuracy. |
| §6.2: contrast ratios | The hex values imply emerald on forest is approximately **2.96:1**, below 3:1, and lime on mint approximately **1.14:1**, not 1.3:1. The remaining claimed measurements lack an embedded calculation report; the 18 px text rule is also insufficient, as discussed in section 6 below. |
| §14: TRL 6 and the TRL 7 milestone | H §2 contains an author judgement, not evidence that Lyceum met NASA’s conditions. A department, a term and an LMS are useful proposed milestones, not NASA’s literal numerical requirements. |
| §13: six to twelve months; $3 to $12; about $22,000; about $14,000 annually | Sales-cycle figures are vendor guidance; Canvas figures are secondary Vendr estimates, with $22,000 reasonably rounding $21,789. The $14,000 renewal is absent, and contract scope must be established before using these as pricing anchors. (H §4.) |
| §13: 89%, 30%, more than half | Match H §4’s industry surveys. Preserve respondent scope: willingness to invest is not committed spending, and distrust or autonomy concerns do not establish demand for Lyceum. |
| §13: 22,000 institutions, 14 million teachers, 45,000 Malaysian lecturers, low single-digit billions | Unsupported by the supplied notes; the cited master-plan sizing is missing. “Near-zero” cost also lacks a cost model. |
| §14: “1 of 24 reviewed postings” | No embedded fixture or report establishes this denominator. Treat it as unverified until the selected posting and frozen report reproduce it. |
| §16: free Remotion use up to three video contributors | Misstates V §1, which discusses organisational employees, ownership and version-specific terms, including an educational-institution exception. Team eligibility is unverified and cannot be inferred from video contributor count. |

Other headline figures match their notes: US **52% and 45%**, EU **21.4%**, employer sentiment **85%**, ESCO **13,939 skills and 28 languages**, and **46 listed skill clients**. Preserve their populations, dates and source labels; the client count does not prove Lyceum compatibility. (L §§4, 6; H §6; D §§2, 4.)

The **160/166 checks, fourteen/fifteen suites, six added checks, 99 paths, two commits behind, approximately 620 lines**, local software versions, housekeeping counts and account reset dates/balances are all unverified from the supplied material. The check totals are arithmetically consistent, but §18’s base-suite count is stale. (Plan §§1, 17.5, 18, 19.)

Typography, spacing, motion, rendering settings, tool counts, rehearsal durations and pilot targets are proposed specifications, not research findings. Keep that distinction explicit rather than claiming the research establishes every number.

## 5. Ten highest value changes, ranked

1. **Reduce Track A to one dependable course decision.** Protect quotation inspection, the reviewed denominator, the brief, a recorded decision and one editable pack before adding decorative systems or more screens. (Plan §§4, 17.1.)

2. **Create the claims register before changing public copy.** Remove unsupported figures, qualify forecasts and vendor surveys, and replace universal accreditation claims with precisely scoped clauses. (Plan §§2, 13, 18.)

3. **Specify the decision lifecycle and receipt links.** Bind decisions to immutable briefs and revisions, define authority and amendment rules, and allow retain, defer and return without forcing course adoption. (Plan §§4, 8.)

4. **Separate descriptive Learn features from research promises.** Remove representative/not-representative labels and the prediction-win learning-gain claim, then give each later method explicit assumptions, inputs and validation criteria. (Plan §§9, 17.2.)

5. **Establish a recoverable release candidate early.** Correct the calendar, assign release ownership, test restored backups and preserve a known working demo before integrating the overhaul. (Plan §§1, 17, 20.)

6. **Demonstrate one narrow assistant connection.** Prioritise a validated evidence-report tool with export timestamp and consistent receipts, while labelling every untested host and remote deployment planned. (Plan §§11, 17.1.)

7. **Run a small lecturer task study before polishing further.** Observe source checking and brief preparation against the existing process, recording completion, errors, time and unsolicited confusion. (Plan §§14, 17.2.)

8. **Replace market breadth with a purchase hypothesis.** State the department buyer, proposed price, support cost, procurement requirements and the pilot result that would justify paying. (Plan §13.)

9. **Make accessibility part of Track A acceptance.** Test the actual quotation and decision path with keyboard, screen reader, zoom and reduced motion, alongside automated checks. (Plan §§6.7, 17.)

10. **Build presentation assets from the frozen demonstration.** Use one recording and a tested organiser-compatible deck, then spend the recovered time rehearsing transitions, fallback playback and difficult questions. (Plan §§14 to 17.)

## 6. Design and accessibility

- **The visual recipe risks looking generic.** Forest cards, lime chips, dot grids, uppercase mono labels, oversized numbers and rounded tiles repeat a familiar generated-dashboard style. Retain the chosen brand but make the working screens resemble a clear editorial workspace: source, quotation, judgement and action, with restrained framing. (Plan §§6.3 to 6.6.)

- **Seven large-eyed characters risk infantilising routine work.** Their names and props also add another vocabulary over the six steps, especially at 24 px. Use neutral role icons in navigation and occasional character illustrations in onboarding or the explanatory loop; do not put a character beside every control. (Plan §7; V §§2, 3.)

- **Motion contradicts the honesty rule.** A resting float is animation without a request or record change, and Quill shaking on failure conflicts with excluding mascots from errors. Make rest truly static, reserve motion for meaningful transitions, and render Lens’s interval from actual data rather than assuming it always narrows as the denominator grows. (Plan §§0, 7.)

- **Several accessibility rules need correction.** Eighteen-pixel regular text does not qualify as large text for the relaxed contrast threshold; use at least 24 px regular or approximately 18.7 px bold. Emerald fails 3:1 on forest, `ray-1` is that same emerald, and the pale border cannot be the sole essential boundary of an input; retain explicit control-border and focus tokens. (Plan §§6.1, 6.2, 6.6.)

- **The ring and waffle can mislead.** A fixed 100-cell waffle cannot represent one posting per cell for arbitrary denominators, while a completed ring can imply quality or institutional approval that the records do not establish. Prefer a labelled step list, exact reviewed counts and clearly scoped completion text; keep milestones as quiet history entries. (Plan §§6.5, 8.)

- **Do not hide the evidence needed for judgement.** Employer, date, denominator, uncertainty and collection limitations belong beside the relevant claim, even when other details use disclosures. The current Evidence excerpt already prints intervals in a table, so preserve that information while improving the chart and source comparison. (Plan §§5.3, 6.5; `src/ui/screens/EvidenceWorkspace.tsx`.)

- **Automated accessibility checks are insufficient.** Zero axe violations do not establish WCAG conformance, and deferring the screen-reader pass leaves the central workflow untested for Amsterdam. Check focus order, route announcements, tabs, bulk-confirm controls, reflow and understandable status changes on the actual demonstration path. (Plan §§5.2, 6.7, 17.2.)