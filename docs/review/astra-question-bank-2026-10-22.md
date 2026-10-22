## 1. The ten questions

Implementation and test results below are reported facts from the embedded documents. Independent execution, omitted source material and rendered appearance are **unverified**.

### 1.1 Is this scraping?

- **Hardest follow-up:** Which source policy permits your actual collection, storage and reuse of these postings?
- **Facts:** Collection runs on a lecturer's request through the documented Greenhouse or Lever API, with the source policy displayed. Postings retain links, dates and fingerprints. The saved sample contains real Stripe postings retrieved on 9 October 2026, truncated and labelled as a sample. (`docs/demo-script.md`, Watch and Questions; `JUDGES.md`, What is real and what is not.)
- **Must not claim:** Permission to collect from arbitrary boards, LinkedIn collection, or independently verified compliance with source terms. The actual policy text is absent, so those permissions remain **unverified**.
- **Show:** Watch's source policy and run log, including whether this run fetched live or used the saved sample; then a posting's provenance fields. (`docs/demo-script.md`, Questions and Watch.)

### 1.2 Where is the AI?

- **Hardest follow-up:** Show a model doing useful work today, and the boundary that prevents its output from becoming confirmed evidence or a decision.
- **Facts:** The core is deterministic, requires no AI key, and its agents default to fixture mode. The MCP tools cannot confirm quotations, mark postings reviewed, record decisions or adopt revisions. Five tools are read-only; the sixth creates a teaching pack file without changing the workspace. (`docs/claims.md`, `proof-no-keys`; `docs/doors.md`, What the local door does.)
- **Must not claim:** A verified model drafting run or a completed Claude Desktop demonstration. Both are **unverified** in the supplied record. (`docs/doors.md`, Recorded runs; `docs/as-built.md`, A5.)
- **Show:** The evidence report, its export timestamp and its receipts. The booth specifies Claude Desktop, but the completed run documented here uses the official SDK client over stdio. Identify that distinction. (`docs/demo-script.md`, The door; `docs/doors.md`, Try it without a host.)

### 1.3 Why not ChatGPT alone?

- **Hardest follow-up:** What comparison establishes that ChatGPT cannot provide those controls, and what does rejecting one paraphrase actually prove?
- **Facts:** Lyceum documents exact source matching, a reviewed denominator, decision records and retained course versions. Its checks report rejecting paraphrases. The ChatGPT door is planned. (`JUDGES.md`, The loop; `docs/claims.md`, `proof-no-paraphrase`; `deck/index.html`, slide 11 notes.)
- **Must not claim:** That those capabilities are impossible in ChatGPT, or that Lyceum has beaten ChatGPT in a controlled comparison. No such comparison is supplied. Exact matching also does not establish that a quotation supports a sound curriculum decision.
- **Show:** The refused paraphrase beside its saved source. Decision and History screens can substantiate the separate recordkeeping claims. (`docs/demo-script.md`, Report and Update.)

### 1.4 How do we know the postings are representative?

- **Hardest follow-up:** Who selected these nine postings, what was excluded, and why should one employer influence a university course?
- **Facts:** The frozen demo keeps ten postings, excludes one duplicate and reviews nine. The evidence report identifies one employer and reports shares with 95% Wilson intervals. The separate figure of 727 refers to a live fetch from one employer, not the demo denominator. (`docs/claims.md`, `deck-receipt` and `proof-live-board`; `docs/doors.md`, example evidence report.)
- **Must not claim:** Representative labour-market estimates or a general statement about what employers want. An interval does not establish that the selected postings represent a broader population. The files explicitly disclaim representative counts. (`JUDGES.md`, Never claimed; `docs/demo-script.md`, Report.)
- **Show:** Count's n of N and interval, alongside the employer, exclusions and source dates. (`docs/demo-script.md`, Questions; `docs/doors.md`, example evidence report.)

### 1.5 What breaks first at scale?

- **Hardest follow-up:** How many postings can a lecturer review within the available time, and what happens when two people work concurrently?
- **Facts:** Every posting used in a count requires human review. The booth script identifies review time as the expected bottleneck. The workspace currently lives in one browser; shared workspaces and sign-in are planned. (`docs/demo-script.md`, Questions; `JUDGES.md`, Planned.)
- **Must not claim:** A measured first failure, demonstrated concurrent operation or a quantified capacity. The 727-posting fetch supplies no reviewer throughput or concurrency measurement. (`docs/claims.md`, `proof-live-board`.)
- **Show:** Slide 8's planned shared workspace and sign-in, plus the actual Review step that creates the denominator. (`deck/index.html`, slide 8; `JUDGES.md`, hands-on Report.)

### 1.6 Does it decide the syllabus?

- **Hardest follow-up:** Can one operator switch personas and supply both approvals, and what makes the recorded approver an authorized university decision-maker?
- **Facts:** Decisions record the person, time, reason, brief, version and term. A decision on one's own brief is labelled self-recorded and remains open pending confirmation. Personas and browser-local role switching are prototype features; formal approval remains in the university's process. (`JUDGES.md`, Decide and What is real and what is not; `docs/demo-script.md`, Decide.)
- **Must not claim:** Authenticated separation of duties, verified institutional authority or formal university approval. The prototype records an attributed decision without establishing the real identity behind the selected persona.
- **Show:** The decision record, its self-recorded status where applicable, and History linking the decision to the adopted revision. (`JUDGES.md`, hands-on Decide and Update; `deck/index.html`, slide 6.)

### 1.7 Why another tool?

- **Hardest follow-up:** Which existing workflow does it actually reach today, and how can the lecturer tell whether the assistant is reading current information?
- **Facts:** The local MCP door reads an exported workspace backup, rereads that file on each call and returns its export time. Updating the app requires another export before the door reflects those changes. Editable PowerPoint packs exist; remote assistant, LMS and office suite doors are planned. (`docs/doors.md`, What the local door does and Before a demo; `deck/index.html`, slides 7 and 9.)
- **Must not claim:** Automatic synchronization with the open app, completed LMS or office suite integration, or measured adoption benefits. Claude Desktop operation remains **unverified**. (`docs/doors.md`, Recorded runs.)
- **Show:** Slide 9's built and planned boundaries, an actual downloaded PowerPoint pack, and the evidence report's export timestamp compared with the workspace. (`docs/demo-script.md`, Questions; `docs/doors.md`, Before a demo.)

### 1.8 What does the free tier cost us?

- **Hardest follow-up:** Is it free for the lecturer to try, or costless for the team to operate and support, and does using Claude require an account?
- **Facts:** The deck offers one course on one laptop, with the whole loop, exports and local door. The core requires no model key or external account; live collection requires the local API and network access. The Claude Desktop run requires its app and an account. Paid tiers and pricing remain hypotheses. (`deck/index.html`, slide 10; `JUDGES.md`, opening; `docs/as-built.md`, section 6.)
- **Must not claim:** Zero total cost, zero support cost, established unit economics or account-free use of Claude. Those are not established by a core that needs no AI key.
- **Show:** Slide 10's ladder, including the local prototype qualification and planned labels on paid tiers. (`deck/index.html`, slide 10.)

### 1.9 What is the benchmark?

- **Hardest follow-up:** What is predicted, how is it scored, which baseline is used, and would winning demonstrate better learning?
- **Facts:** The booth script describes predictions frozen before a semester and scored against the last cohort carried forward. Slide 7 also names a benchmark against the CLO survey. Neither has run; Learn currently displays descriptive results, and the demonstration marks are synthetic. (`docs/demo-script.md`, Questions and Learn; `deck/index.html`, slide 7.)
- **Must not claim:** Benchmark results, learning gains or a fully specified evaluation protocol. Plan Section 9 is not embedded, and the relationship between the carried-forward cohort and CLO-survey descriptions is **unverified**. Software checks do not validate learning. (`JUDGES.md`, Checks.)
- **Show:** Evaluation, with software checks identified as such, and Learn's synthetic-data notice and n of N. Keep the planned benchmark visibly distinct from results. (`docs/demo-script.md`, Questions; `deck/index.html`, slide 7.)

### 1.10 Is lime readable?

- **Hardest follow-up:** Do the colour calculations establish that the actual interface works with a projector, keyboard and screen reader?
- **Facts:** The audit reports lime contrast of 11.5 on forest and 9.4 on the inner dark surface, both AAA. Lime on white or mint fails the stated rule. The as-built summary reports focus and 320 px layout checks, while the manual keyboard and NVDA pass remains pending. (`docs/design/colour-scheme-audit-2026-10-22.md`, sections 1 to 3; `docs/as-built.md`, section 6.)
- **Must not claim:** Whole-product AAA accessibility, proven projection legibility or a completed screen-reader audit. Those remain **unverified**.
- **Show:** The actual header and poster, with lime on the permitted dark surfaces, supported by the relevant contrast rows. Their rendered appearance was not supplied for this review. (`docs/demo-script.md`, Questions; colour audit, sections 1 and 2.)

## 2. The two rehearsed answers

### “Where is the AI?”

Two passages invite a stronger interpretation than the evidence supports:

- **“In drafting, where a model may propose.”** A judge could reasonably hear this as an implemented model drafting feature. The files establish a deterministic core, fixture-mode agents and a brief-draft tool, but provide no model execution record showing drafting. The tool's name alone does not establish model involvement. Model drafting is **unverified**. (`docs/claims.md`, `proof-no-keys`; `docs/as-built.md`, section 1; `docs/doors.md`, tool table.)
- **“Today Claude, through the local door.”** The connector and protocol exercise are documented. The Claude Desktop run is explicitly unrecorded, and A5 is partly complete. This supports an implemented local interface with a pending host demonstration; it does not establish successful operation in Claude Desktop. (`docs/doors.md`, The manual Claude Desktop run; `docs/as-built.md`, A5.)

The deterministic numbers and human confirmation boundary have documentary support. The “never” language should remain scoped to the implemented core and exposed MCP tools. The files do not demonstrate equivalent enforcement in planned remote doors. (`docs/doors.md`, trust boundary; `deck/index.html`, slide 9.)

### “Why not ChatGPT with search?”

- **“It cannot” perform the four listed functions** is the largest unsupported assertion. The files document Lyceum's controls, but contain no comparative evaluation establishing categorical limitations of ChatGPT. The refused paraphrase demonstrates Lyceum's validation rule. (`deck/index.html`, slide 11 notes; `docs/claims.md`, `proof-no-paraphrase`.)
- **“Record who decided”** is supported as stored attribution within the prototype. It must not imply verified human identity or independently authenticated approval: browser-local role switching and personas are explicitly prototype features. (`JUDGES.md`, What is real and what is not.)
- **“Keep the version history”** has support in the retained versions and amendment records. Broader claims of tamper-proof institutional audit would remain **unverified**. (`JUDGES.md`, Update; `deck/index.html`, slide 6 notes.)

The deck's final qualification that the ChatGPT door is planned is accurate. The older plan's claim that Lyceum can already be used inside ChatGPT is unsupported and should not be carried into the spoken answer. (`docs/lyceum-upgrade-plan.md`, Section 14; `deck/index.html`, slides 8, 9 and 11.)

## 3. Five questions not in the bank

1. **What evidence qualifies this as TRL 6?**  
   The level is explicitly self-assessed against NASA's software column. The stated environment contains real postings, a sample course outline and a lecturer persona. No lecturer pilot has run. The outline is generated by `scripts/gen-demo-files.mjs`; the older plan's description of a real syllabus conflicts with the claims register and actual deck wording. An external readiness assessment is **unverified**. (`docs/claims.md`, `deck-trl` and following clarification; `deck/index.html`, slide 8; `JUDGES.md`, Never claimed; plan Section 14.)

2. **Which real lecturers have validated the problem, completed the workflow or agreed to pay?**  
   The landing-page problem evidence is described as desk research pending lecturer interview quotations. No lecturer pilot has run. Task completion, citation fidelity, time to a brief and repeat use are proposed pilot measures; pricing is a hypothesis. Completed user validation and willingness to pay are **unverified**. (`docs/claims.md`, opening problem section; `JUDGES.md`, Never claimed; `deck/index.html`, slides 10 and 11.)

3. **What happens to real student information when an assistant reads the workspace?**  
   The local door reads a workspace backup and logs tool calls, arguments and touched record IDs. The demonstration results are synthetic. Remote OAuth, shared sign-in and institutional data agreements are planned. The files do not establish assistant-host retention, data-processing terms or protection of a real cohort's records; those are **unverified**. (`docs/doors.md`, trust boundary; `JUDGES.md`, Illustrative and Planned; `deck/index.html`, slide 10.)

4. **What must be delivered before a department can run the LMS pilot being requested?**  
   The ask is one department for one term inside its LMS. The LMS door, shared workspace and sign-in are all planned; the current app is local, and its assistant interface reads exports. No named pilot institution, delivery schedule or completed LMS acceptance test is supplied. Those commitments are **unverified**. (`deck/index.html`, slides 8 to 11; `docs/doors.md`, opening.)

5. **Which demonstration fallbacks have actually been tested on the presenting laptop?**  
   PowerPoint opening with notes and film loading in Chrome are documented. Playback on the presenting laptop and venue player, plus the manual wifi-off run, remain pending. Both film cuts are rendered with captions but without the team's voices. The booth script requires narrated recordings, whose readiness is **unverified**. (`docs/as-built.md`, A6 to A8 and section 6; `docs/demo-script.md`, Before each run and If something fails.)

## 4. Gaps

These questions require facts beyond the supplied record. Each remains **unverified**.

| Question the files cannot settle today | Fact the team would need |
|---|---|
| What exactly permits collecting, retaining and displaying each source's content? | The applicable source-policy text and its relationship to the actual use. The booth script describes a displayed policy but does not reproduce it. (`docs/demo-script.md`, Watch and Questions.) |
| How were the demo postings selected, and how much relevant evidence does the quotation process miss? | The selection procedure, complete source material, truncation effects and independently checked extraction results. The register supplies the sample counts and quotation-rejection claims, not sampling or recall validation. (`docs/claims.md`, `deck-receipt` and `proof-no-paraphrase`.) |
| What precisely constitutes a benchmark win? | Prediction target, freeze record, scoring method, ground truth, success criterion and the relationship between the prior-cohort baseline and CLO survey. The referenced protocol is absent. (`docs/demo-script.md`, Questions; `deck/index.html`, slide 7.) |
| Does using Lyceum improve learning or curriculum decisions? | Observed outcomes from real use and an evaluation capable of supporting the particular improvement claimed. Synthetic marks and software checks cannot establish that result. (`JUDGES.md`, Checks and Never claimed.) |
| What is the actual workload and economic cost per course? | Measured review time, setup effort, support burden and service costs, with core use distinguished from assistant use. Free access and pricing hypotheses supply none of these measurements. (`docs/demo-script.md`, scale question; `deck/index.html`, slide 10.) |
| At what volume does the implementation fail or become impractical? | Measured processing limits, browser-storage behavior and reviewer throughput. Concurrent behavior would require evidence from the planned shared implementation. (`docs/demo-script.md`, scale question; `JUDGES.md`, Planned.) |
| Can an institution trust the identities, confidentiality and durability of these records? | Evidence of authentication, authorization, recovery guarantees and applicable data-processing arrangements. Prototype role switching, backups and planned institutional agreements do not establish those guarantees. (`JUDGES.md`, honesty labels; `deck/index.html`, slide 10.) |
| Has a model actually drafted anything, and has Claude Desktop completed the intended workflow? | A recorded model drafting execution and the prescribed Desktop run, including host version, date, response and comparison with a fresh export. Neither record is supplied. (`docs/claims.md`, `proof-no-keys`; `docs/doors.md`, manual run.) |
| Which exact build and event chronology support the demonstration? | A completed build stamp, the underlying verification records and a fresh export with actual event times. The as-built draft retains `STAMP_TIME` and `A7_HASH`; its verification section is not embedded. The sample export uses a 1 July 2026 seed clock despite containing postings retrieved on 9 October 2026, so it cannot establish actual activity chronology. (`docs/as-built.md`, Stamp; `docs/doors.md`, Before a demo.) |
| Is the presentation operationally and accessibly ready? | Recorded presenting-laptop playback, wifi-off, keyboard and NVDA results, plus confirmation of the required narrated artifacts. These remain listed as human tasks or preparation requirements. (`docs/as-built.md`, section 6; `docs/demo-script.md`, Before each run.) |