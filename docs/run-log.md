# Run log

Two autonomous runs: Track C (docs/lyceum-depth-plan.md Section 16), the current one, and Track A (docs/lyceum-upgrade-plan.md Section 17.5) below it, kept as written. Times are Kuala Lumpur time (GMT+8).

## Track C

To resume after an interruption, start at the first package below that has no "ended" line, and re-read the depth plan's Section 16 and this file first. The order: D0, D1, D2, D5a, D6a, D8a (Tier 1); D3a, D4a, D8b (Tier 2); D7, D5b, D6b, D3b, D8c (Tier 3, until Monday 26 October ends). A tier starts only after the previous tier's D8 run is green.

### Needs the owner (Track C)

None yet.

### Packages

#### Before D0: the baseline and the base commit

- 2026-10-22 18:07 read CLAUDE.md, the depth plan in full, `docs/as-built.md` Sections 1, 2, 5 and 6, `docs/decisions.md` from "12:00, after Track A" to the end, the competition file, the Codex review of the depth plan, the four research notes of the plan's Section 20, and, as CLAUDE.md's read order asks, the master plan's Sections 0, 4 to 4.2, 6, 7 and 17.5, the palette poster and its audit, DECISIONS.md and the improvement plan's Section 30.
- 18:09 baseline check: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites.
- 18:12 baseline check: `npm run build` passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; `node scripts/walk.mjs` WALK OK (21 checks); the guide check matches; no en or em dash in 286 text files; BACKUP MIGRATION OK; the sample workspace matches the tour's end state.
- 18:12 baseline check: `node scripts/contrast-check.mjs` FAILED: the owner's `utp.svg` at the repository root is untracked, so the check's file list includes it, and it carries the mark's own colours (`#004A84`, `#BC893A`) as hand-written hex values. D0's partner exception resolves it.
- 18:13 committed the owner's uncommitted follow-ups of 22 October, with the depth plan, its four notes and its review, as `ba980e7`, so each Track C commit holds one package (docs/decisions.md). Left out: `utp.svg` (D0 places it) and the stale `docs/presentation/shot-update-hours.png`, which the Track A log also kept out.

#### D0, the institution and the mark

- 18:14 started; re-read Section 16 and this log; read Sections 0, 3 and 11, `docs/brand-use.md`, `tokens.ts`, `contrast-check.mjs`, `workspaceBackup.ts`, `check-backup-migration.mjs`, `seed.ts`, `types.ts`, the store and the Guide page.
- 18:15 `scripts/gen-partner-marks.mjs` written: the owner's `utp.svg` copied byte for byte into `public/brand/partners/` and rasterised to `utp-1024.png` and `utp-256.png` (looked at: the whole mark, uncropped, in its own colours), with a manifest fingerprint tying the PNGs to the copy; `--check` matches.
- 18:16 the contrast check's partner exception (parts 2 and 3 leave `public/brand/partners/` alone, the reason in the script); the root `utp.svg` ignored by git (docs/decisions.md). Check: CONTRAST CHECK OK. Negative test: the mark's blue planted in `src/zz-planted-check.ts` and the mark copied to `public/brand/zz-planted-mark.svg`: CONTRAST CHECK FAILED on all three colours, as it should; both removed, OK again.
- 18:17 `InstitutionProfile` in `src/types.ts`; the demo values and where each default comes from in `src/data/institution.ts`; one check in `src/lib/institution.ts`; the store (the seed, persistence, `saveInstitutionProfile` for a coordinator); the backup at schema 6.
- 18:18 check: `node scripts/check-backup-migration.mjs` BACKUP MIGRATION OK, 28 checks: schema 6 keeps a saved pass mark and refuses an impossible one, schema 5 takes the demo profile, schemas 4 and 3 restore, and a schema 3 workspace re-exports at 6.
- 18:19 the Guide page's Institution panel: the settings that shape figures, and behind a disclosure the form (a coordinator edits, everyone else reads) with where each default comes from; the mark is not shown. Looked at in the built app at 1440 and 320 px: no horizontal scroll.
- 18:19 CLAUDE.md: the depth plan and its four notes in the read order, and the two clauses the owner approved; `docs/brand-use.md`: the UTP row and the partner mark's rule; `DEMO_LINE` in `src/data/sample-course/index.ts`.
- 18:20 check: `npm run typecheck` passed; `npm run prove:all` failed: four proofs and the curriculum smoke pinned the backup at schema 5. Moved to 6 (prove-evidence's schema 1 case now also drops the profile and expects the demo default back); `node mcp/sample.ts` regenerated the sample workspace at schema 6.
- 18:21 check: `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed; `npm run smoke:workspace` 7 of 7; `npm run smoke:curriculum` 6 of 6; the sample workspace, the guide, the partner mark and the dash scan (292 files) match or pass. The tracked capture the smokes rewrote was restored (docs/decisions.md).
- 18:23 five decisions logged (docs/decisions.md).
- 18:24 ended; committed as "D0: the institution profile at schema 6, the partner mark and its contrast exception, the brand row, the honesty line and the two CLAUDE.md clauses" (the hash is in `git log`).

### What is left

D1 to D8c, in the order above. For D8a: claims rows for the sourced examples in the institution's help lines (UTHM's 50% at 55, McGill's floor by class size, McLennan's five), if the register's scope covers settings' help text.

## Track A

### Needs the owner (Track A)

1. **The doors strip: official marks or neutral icons?** (raised 2026-10-22 06:16, A2b) Plan Section 17.1 asks for the landing page's doors strip "with the official marks" and a `docs/brand-use.md` listing each mark and its source. A2b shipped neutral Lucide icons with each door's name and a Planned tag, because the third-party marks (Claude, ChatGPT, Copilot, Gemini, Teams, the LMS) carry usage terms nobody has checked, and showing them beside doors that are not built could read as an endorsement or an integration. To switch: approve the marks and their sources (from each brand's press or brand page), and the strip and `docs/brand-use.md` follow in one change (`DOORS` in `src/ui/screens/Landing.tsx`). Nothing else waits on this. *Update, A6 (07:45):* the architecture diagram, and so the deck, the brief and the poster, now carry three Simple Icons marks where Lyceum really connects (Claude and MCP on the built local door, Greenhouse on the board it reads), with the ownership line; every other product is named in text, because Microsoft needs a licence, Google a request that takes up to two weeks, Moodle permission, and the OpenAI and Instructure terms were not read in a run that sends nothing off the machine. `docs/brand-use.md` lists each mark, its source and its terms. The landing strip is unchanged until you answer.

2. **Run the local door once in Claude Desktop** (raised 2026-10-22 06:37, A5) Plan Section 17.1 asks for a recorded Claude Desktop run of the door. It needs the desktop app and your account, and configuring it changes a file outside the repository, so this session recorded a real stdio session with the official SDK client instead (`node mcp/try.ts`, in docs/doors.md). The steps and what to check are in docs/doors.md, under "The manual Claude Desktop run"; record the date and the first lines of the answer there. Nothing else waits on this.

3. **The poster's QR code needs a public address for the landing page** (raised 2026-10-22 07:45, A6) Plan Section 15 puts a QR code to the public landing page on the poster. No deployed address exists in the repository, and deploying sends the build off this machine, so the poster's slot is marked planned. Once the page is live, make a QR image of its address and run `node scripts/gen-poster.mjs --qr <file>`; the poster PDF is regenerated with it. Nothing else waits on this. *Resolved 11:37:* the owner approved a Vercel deploy; the page is live at <https://lyceum-rho.vercel.app>, and the poster carries a QR code to its landing page.

4. **TRL 6, or TRL 5, until a real syllabus has run the loop?** (raised 2026-10-22 09:30, A8) The Codex claims audit points out that the research note defines the relevant environment as "real postings, a real syllabus, a real lecturer", while the build demonstrates on real postings, a sample course outline and a lecturer persona. Every surface already names that weaker environment beside TRL 6, self-assessed. Choose: keep TRL 6 as it stands, present TRL 5 ("validated in a relevant environment"), or run one real syllabus with one lecturer before the final, after which TRL 6 stands as the note defines it. A change is one row in `docs/claims.md` and the surfaces it lists. Nothing else waits on this.

5. **The pitch's opening order and its commercial slide** (raised 2026-10-22 09:34, A8) Plan Section 4.1 opens person, urgency, receipt; Section 14 opens receipt, urgency, person. The deck follows Section 14. The Codex pitch review (`docs/review/astra-pitch-review-2026-10-22.md`) also asks who buys, which purchase decision the pilot tests, and what support it costs; slide 10 names the price as a hypothesis and nothing more. Both are the owner's and the Story lane's to settle; the review's verified accuracy and timing fixes are already in the deck (docs/decisions.md).

6. **The GitHub repository's description** (raised 2026-10-22 10:00, A8) The house style asks for one plain sentence as the repository description, which changes a setting on GitHub, so this run did not. Suggested: "Lyceum turns real job postings into a course decision with receipts, every semester."

7. **Files the hook kept** (raised 2026-10-22 09:35, A7) The Blast Radius hook held this run's deletes of its own experiment files, and they were not retried: in the ignored `video/out/` (`seq-a`, `seq-b`, `jseq-a`, `jseq-b`, `enc-*.mp4`, `vid-*.mp4`, `stills`, about 370 MB) and in the system temp folder (`lyceum-pngtwice-*` and `lyceum-frames-*`, about 2 GB, from stopped renders and the determinism tests). None is tracked or needed; delete them when convenient. *Resolved 10:58:* deleted on the owner's word (about 4 GB); the hook could not resolve the Git Bash paths, so the delete ran through PowerShell with Windows paths.

8. **The sample's dates** (raised 2026-10-22 10:18, A8) Records built outside the browser take the seed clock, 1 July 2026, so the sample workspace and the screenshots restored from it show a brief, a decision and results dated before the postings they cite were retrieved (9 October 2026). Moving the clock to 22 October fails two journey proofs whose term windows are anchored to July, so this run left it (docs/decisions.md). The live demo uses the browser's real clock. Say if the screenshots' dates should be consistent before the final; it is one change with those two proofs re-anchored. *Resolved 11:08:* the owner asked for the fix; the seed clock is now 22 October 2026 and the proofs build their moments from it (docs/decisions.md).

### Codex queue

The owner's Codex limit was reached on 22 October and resets within hours. A Codex run also sends the embedded files to OpenAI, which this run's rules forbid without the owner's go-ahead, so no package here waits on Codex. Reviews worth running once the limit resets and the owner approves are listed here with their files and question; each is `codex exec --sandbox read-only` with the files on stdin and the report saved under `docs/review/`.

At 09:18 the owner reported the limit reset; the owner's earlier message asked for the queued Codex steps to run once it did. The jobs are the ones plan Section 15's tool table gives Codex, run with `gpt-6-astra` at max reasoning, read-only, every claim verified before any is kept:

1. **The pitch** (09:18, returned 09:34): an adversarial judge's read of `deck/index.html` and its notes, with `docs/claims.md`, the competition facts and plan Sections 2.3, 2.4, 4.1 and 14. Report: `docs/review/astra-pitch-review-2026-10-22.md`.
2. **The claims audit** (09:18, returned 09:28): `docs/claims.md` row by row against the six research notes, with the landing page. Report: `docs/review/astra-claims-audit-2026-10-22.md`.
3. **The question bank** (10:01, returned 10:11): a sceptical judge's rehearsal of plan Section 14's ten questions against `JUDGES.md`, the booth script, the deck, the claims register, the as-built drafts, the colour audit and `docs/doors.md`. Report: `docs/review/astra-question-bank-2026-10-22.md`.

### Packages

#### A0, checkpoint and the branch

- 2026-10-22 03:25 started.
- 03:25 checkpoint: committed `f5b26a4` "Checkpoint before the overhaul" and tagged `pre-overhaul`.
- 03:26 took `feature/evidence-snapshots` (one commit, 18 files); one conflict in DECISIONS.md, resolved by keeping both entries (docs/decisions.md).
- 03:27 environment: `node_modules` had no `.bin` folder and lacked two declared packages; `npm install` from the unchanged lockfile restored them.
- 03:27 check: `npm run typecheck` passed.
- 03:28 check: `npm run prove:all` 166 passed, 0 failed, fifteen suites.
- 03:28 check: `npm run build` passed.
- 03:29 check: `npm run smoke` 14 of 14 passed.
- 03:30 check: `node scripts/check-backup-migration.mjs` 16 of 16 passed (schema 4 and schema 3 restores).
- 03:31 docs/as-built.md created with the stamp, the A0 table and the four follow-ups for A2a.
- 03:32 ended; committed `1c1cdd3` "A0: take the evidence snapshots branch and prove the backup migration".
- 03:36 check after the commit: the dash scan (new `scripts/dash-scan.mjs`) found no en or em dash in 164 text files, apart from five em dashes inside one verbatim Stripe posting in the saved sample, which stays as published (docs/decisions.md). The script is committed with A1.

#### A1, theme and shell

- 2026-10-22 03:37 started.
- 03:40 installed `@fontsource-variable/bricolage-grotesque`, `plus-jakarta-sans` and `jetbrains-mono` 5.3.0 (dev dependencies; the plan names Fontsource).
- 03:49 `tokens.ts` rewritten as the source; `scripts/gen-theme-css.mjs` writes the `:root` block, the `@font-face` rules, the fonts in `public/fonts/` and the preloads.
- 03:50 338 old variable uses migrated by context; primitives, the shell, the loop rail and the hash routes rebuilt; the landing and sign-in screens restyled.
- 03:58 `scripts/contrast-check.mjs` written; negative test caught a planted hex, `rgba()`, bare pptx colour and lime rule.
- 04:02 check: `npm run smoke:workspace` failed at the Guide page: the floating Play demo pill covered the "All roles" filter. Fixed by moving the signed-in tour button into the Guide page (docs/decisions.md).
- 04:03 check: `npm run smoke:integrity` failed: it clicked `nav-studio`, now reached through the rail. The smoke now clicks `rail-course` and `rail-learn`.
- 04:11 106 inline font sizes moved onto the type scale; counters to mono 12; the wordmark to 28 px.
- 04:13 check: `npm run typecheck` passed.
- 04:13 check: `npm run build` passed.
- 04:13 check: `node scripts/contrast-check.mjs` passed (61 ratios, 172 files).
- 04:13 check: `npm run smoke:workspace` 7 of 7 passed.
- 04:13 check: `npm run prove:all` 166 passed; `npm run smoke` 14 of 14; `smoke:integrity` 2 of 2; `smoke:curriculum` 5 of 5; guide check matches; dash scan clean.
- 04:15 ended; committed `1849d25` "A1: tokens as the source, bundled fonts, restyled primitives, the loop rail and the contrast check".

#### A3, mascots v1

- 2026-10-22 04:16 started; read the Kancil SVG in the Shenzhen intro (`submission/production/intro/intro.html`) for the layered approach.
- 04:18 host's working name chosen: Tualang (docs/decisions.md).
- 04:22 session-only request registry added to the store; the fetch, the parse and the pack render are tracked.
- 04:23 `src/app/moods.ts` and `src/prove-moods.ts` written; 8 of 8 passed; a mutation test (Scout forced to working) failed 4, as it should.
- 04:24 host drawn and previewed on white, mint and forest at 160, 64 and 28 px; first draft fixed (arms hidden behind the crown; the dark side swamped the crown, replaced by a rim).
- 04:27 the seven helpers drawn and previewed; Folio's cover label read as a mouth and Scout's strap crossed the face, both removed.
- 04:28 `mark.tsx`, the Mascot primitive and `useCourseMoods` written; `scripts/gen-mascots.mjs` wrote 35 SVGs, 72 PNGs and the manifest.
- 04:33 check: `npm run typecheck` passed.
- 04:33 check: `npm run prove:all` 174 passed, 0 failed, sixteen suites.
- 04:34 check: `node scripts/gen-mascots.mjs --check`, `gen-theme-css.mjs --check` and the contrast check passed (35 generated SVGs, all token colours).
- 04:34 check: `npm run build` passed; the four smokes 14, 2, 7 and 5 of 5 passed; guide check matches; dash scan clean.
- 04:37 ended; committed `13c9851` "A3: the host and seven helpers in code, moods from records, the mark as favicon and app icon".

#### A2a, Watch, Report, Decide

- 2026-10-22 04:37 started, right after the A3 commit; read Sections 4, 4.1, 4.2, 5 and 8, `EvidenceResearch.tsx`, `EvidenceWorkspace.tsx`, `journey.ts`, `runs.ts`, `types.ts` and the store.
- 04:45 decision logged: the term window by time (docs/decisions.md).
- 04:46 decision logged: decide and adopt mapped onto today's hats.
- Before 05:35, found by the checks and fixed: the teaching proof wanted a guide for each new section (four added); the curriculum smoke's click on a disclosure landed on a passing toast (the smokes now toggle a disclosure through the DOM); the workspace smoke still drove the old tabs, and a scripted replace had turned a `$$` into `$` (fixed by hand); the Course step's address carried a `/course` suffix the plan does not have; the Studio unmounted an open editor on a step change (the four steps stay mounted again).
- 05:35 check: `npm run typecheck` passed.
- 05:35 check: `npm run prove:all` 178 passed, 0 failed, sixteen suites.
- 05:35 check: dash scan (225 files), contrast check, guide check, theme check, mascot check and `check-backup-migration.mjs` passed.
- 05:36 check: `npm run build` passed.
- 05:36 check: `npm run smoke` 14 of 14 and `smoke:integrity` 2 of 2 passed.
- 05:37 check: `npm run smoke:workspace` 7 of 7 and `smoke:curriculum` 6 of 6 passed.
- 05:39 check: `npm run smoke` 15 of 15 after the tour gained the snapshot freeze (A0 follow-up 3).
- 05:40 eight decisions logged (docs/decisions.md); the A2a section of docs/as-built.md written.
- 05:41 check: after the last proof and document edits, `npm run typecheck`, `npm run prove:all` (178 passed), `npm run build`, `smoke:curriculum` (6 of 6), the dash scan, the contrast check and the guide check passed again.
- 05:43 the refreshed screenshot showed Update saying "no change this term" after a version was adopted following a retain decision; the count and the notice now say a version was adopted after the retain, and an adoption at the same moment as the decision is ordered by the event log (docs/decisions.md, the Update entry).
- 05:45 check: `npm run prove:all` passed; `npm run build` passed; `npm run smoke` 15 of 15, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6.
- 05:46 ended; committed `c4dd51d` "A2a: Watch and Report with its sub-rail, the decision record and Decide, the event log, and the receipts ring scoped to the term".

#### A2b, the remaining loop screens, Home, How it works, Landing

- 2026-10-22 05:46 started; re-read Section 17.5 and this log, then Sections 2, 4, 5, 6 and 9.8. `docs/claims.md` does not exist yet; A2b creates it from the dated research notes.
- Before 06:12, built and checked as it went: Learn as its own screen with results bound to the taught version, Course, Update, Teach, History, Home, How it works with the loop graphic, the landing page and `docs/claims.md`. Found and fixed: the teaching proof wanted a guide for Learn (added); a visual pass showed the ring crossing the station labels, a seeded outcome shown as removed on a session card, and the filing toast speaking of the sandbox cohort (all fixed).
- 06:12 nine decisions logged (docs/decisions.md).
- 06:12 check: `npm run typecheck` passed.
- 06:12 check: `npm run prove:all` 179 passed, 0 failed, sixteen suites.
- 06:12 check: `npm run build` passed.
- 06:12 check: `npm run smoke:integrity` 2 of 2 passed.
- 06:13 check: `npm run smoke` 15 of 15 and `smoke:workspace` 7 of 7 passed.
- 06:14 check: `npm run smoke:curriculum` 6 of 6 passed; guide check, contrast check, dash scan (231 files), theme check, mascot check and the backup migration passed.
- 06:15 ended; committed `b86f01d` "A2b: Learn matched to the taught version, the restyled loop screens, Home, How it works and a landing page whose every figure is in the claims register".

- 06:16 repaired this log: in A2a a replacement string holding a dollar and a backtick had pasted the log's opening into the A2a entry; the pasted copy was removed by slicing, and the scratch scripts were checked for the same pattern.

#### A4, demo and checks

- 2026-10-22 06:16 started; re-read Section 17.5 and this log, then Sections 4, 15 and 17.
- Before 06:23: the tour rewritten in loop order (91 steps) with a `decision-recorded` wait; the demo smoke now ends on Home with the closed ring and asserts the decision, the event order and the results matched to the version taught; the walk updated for the rail and Learn; the tour length computed and registered in `docs/claims.md`.
- 06:23 check: `npm run typecheck` passed; `npm run prove:all` 179 passed.
- 06:24 check: `npm run build` passed.
- 06:25 check: `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6 passed.
- 06:25 check: guide check matches; contrast check, dash scan (231 files) and the backup migration passed; `node scripts/walk.mjs` WALK OK (21 checks).
- 06:23 three decisions logged (docs/decisions.md).
- 06:26 ended; committed `8beb1fe` "A4: the tour follows the loop and closes the ring, the demo smoke asserts the decision record, and the walk visits every step".

#### A5, the local door

- 2026-10-22 06:26 started, right after the A4 commit; re-read Section 17.5 and this log, then Section 11, `workspaceBackup.ts`, `evidence.ts`, `curriculum.ts` and `slides.ts`.
- Before 06:37: installed `@modelcontextprotocol/sdk` 1.32.1 and zod 4.6.7 (its required peer); wrote `mcp/workspace.ts`, `mcp/server.ts`, `mcp/sample.ts`, `mcp/try.ts`, `skills/lyceum/SKILL.md`, `docs/doors.md` and `src/prove-mcp.ts`. Found and fixed: the exported evidence report claimed nothing was collected from the web when postings had been (the sample check caught the knock-on change in the stored brief); a proof compared annotations against a key they never carry.
- 06:37 eight decisions logged (docs/decisions.md); the Claude Desktop run added to Needs the owner.
- 06:38 check: `npm run typecheck` passed; `node --test src/prove-mcp.ts` 5 of 5; `npm run prove:all` 184 passed, seventeen suites; `node mcp/sample.ts --check` matches.
- 06:38 check: `npm run build` passed; `smoke:integrity` 2 of 2.
- 06:39 check: `npm run smoke` 19 of 19 and `smoke:workspace` 7 of 7.
- 06:40 check: `smoke:curriculum` 6 of 6; guide check, contrast check and the backup migration passed; `node mcp/try.ts` connected over stdio and returned the report.
- 06:41 check: the dash scan flagged the verbatim Stripe posting inside the sample workspace (five dashes, all inside source texts); exempted like the saved sample; then clean across 239 files.
- 06:42 ended; committed `78d351d` "A5: the local door, a read-only MCP server over an exported workspace, with the skill, the sample and its proofs".
- 06:43 after the commit: git here converts line ends (core.autocrlf, no .gitattributes), so a fresh Windows clone holds generated files with CRLF and the byte comparisons in `generate-guide.mjs --check`, `mcp/sample.ts --check` and the first door proof would fail. They now compare content with line ends normalised, as the theme and mascot checks already did; all three passed against CRLF copies of the files.

#### A6, deck, diagram, brief, poster

- 2026-10-22 06:44 started, right after the line-end commit; re-read Section 17.5 and this log, then Sections 12, 13 and 14 and the design note's Sections 5 and 6.
- 06:44 installed `simple-icons` 16.35.0 (dev dependency) for the monochrome marks in the diagram; its licence terms are recorded in `docs/brand-use.md`.
- 06:48 `scripts/presentation-shots.mjs` rewritten for the loop: one capture of a proposed quotation beside its source, then the sample workspace restored through the app's own restore and every loop screen captured from it; eleven shots written.
- 06:50 the shots showed the ring's term line overflowing ("2026/2027 semester 1"); `ringTermLines` in `src/app/loop.ts` now sets the term on at most two lines inside the ring, with a proof in `prove-journey`.
- 06:51 the History shot showed events saved in the same second out of order; the timeline now breaks a tie by save order.
- 06:55 `scripts/gen-architecture.mjs` written; the first render had tags over door names and clipped chips, fixed and rendered again to `docs/presentation/architecture.svg` and `.png` (3840 by 2160).
- 07:05 the Decide shot showed the decision record saying "term not set" while the brief said 2026/2027 semester 1, because the tour named the term only at Update. The tour now sets the term at the Course step (a field that shows until a term is set) and the sample workspace was regenerated (docs/decisions.md).
- 07:09 the sample decks now build from the sample workspace, one dataset with the shots and the door; `scripts/render-pptx.ps1` opens the teaching pack in PowerPoint (read-only, no window) and exports its slides: 6 slides read back with their notes.
- 07:15 the Learn shot showed the results file's own term label (2025-S1); the tour now files the results under the loop's term (`upload-term`, typed with a new `clear` option).
- 07:16 check: `npm run typecheck` passed; `node --test src/prove-mcp.ts` 5 of 5 against the regenerated sample.
- 07:29 shots captured at a 1180 pixel window, with a single dashboards card and a refused paraphrase added; the proposal shot is taken from the posting the receipt cites (Stripe's Data Analyst, Intern, published 2026-10-01).
- 07:30 `deck/` written: eleven slides with speaker notes in `index.html`, `deck.css` on the tokens, `deck.js` for the keys, the scaling and the film; `scripts/gen-deck.mjs` writes the theme, checks and exports. Its first run found two slides crowding their footers and the receipt's count read without its space; all fixed.
- 07:30 check: `npm run deck` passed: 11 slides, five figures in the claims register, the receipt in its source, the clauses word for word, no dash; the PDF (2,461 KB) read back with unpdf, 11 pages with every digit registered or a reference; the PPTX (5,039 KB) opened in PowerPoint, 11 slides at 960 by 540 points with every slide's notes as written and no media object, because the film is not rendered yet (A7). Four PDF pages rendered with the Windows PDF renderer and looked at.
- 07:31 `deck/export/` and `deck/media/*.mp4` ignored (docs/decisions.md); npm scripts `deck`, `deck:check`, `gen:architecture`, `gen:brief`, `gen:poster` and `gen:sample-decks` added.
- 07:32 the claims checks moved into `scripts/lib/claims-node.mjs`, shared by the deck, the brief and the poster.
- 07:35 `scripts/gen-brief-pdf.mjs` rewritten to the tokens and the six steps: three A4 pages carrying the eight beats, every number registered. The first run overran page 3's footer by 3.9 mm; fixed.
- 07:39 `scripts/gen-poster.mjs` written: A1 landscape (docs/decisions.md). The first renders found a card growing past its row, which the check did not catch; the check now does, and the layout was fixed.
- 07:40 the tour now runs 393 seconds at full speed, so `tour-length` in `docs/claims.md` moved to about 7 minutes, as the landing page computes it; `prove-journey` 9 of 9.
- 07:41 `docs/brand-use.md` written; Needs the owner item 1 updated and item 3 (the QR code) added; thirteen decisions logged (docs/decisions.md).
- 07:41 a delete of the stale, untracked `docs/presentation/shot-update-hours.png` was held by the Blast Radius hook and not retried; the file stays out of the commit. The seven old shots the previous brief used (`shot-agents`, `shot-evidence-table`, `shot-home-with-brief`, `shot-how-it-works`, `shot-inbox-brief`, `shot-meeting-brief`, `shot-studio-journey`) are no longer referenced and are left in place for the owner to remove.
- 07:41 check: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed.
- 07:41 check: guide check matches; contrast check OK (61 ratios, 176 files, 37 generated outputs); dash scan clean (250 files); backup migration OK; the theme, mascot, architecture and sample checks match.
- 07:44 check: `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; `node scripts/walk.mjs` WALK OK (21 checks).
- 07:45 ended; committed `34203fb` "A6: the HTML deck with every figure checked against the claims register and its PDF and PPTX, the architecture diagram, the brief on the tokens and the six steps, the A1 poster, and one term across the demo's records".

#### A7, the video (the parts that need no human voice)

- 2026-10-22 07:46 started, right after the A6 commit; re-read Section 17.5 and this log, then Section 16 and the Dataworks pipeline.
- 07:47 read the Dataworks pipeline (README.md, style.md, avatars.json, remotion/scripts/sync.mjs, Captions.tsx, anim.ts, Badge.tsx, Root.tsx, timeline.ts) as reference; no third-party skill installed, so none needed a scan (docs/decisions.md).
- 07:48 installed Remotion 4.0.537 (`remotion`, `@remotion/cli`, pinned) in its own project, `video/remotion/`, ignored by git with its footage, generated timeline and renders.
- 07:55 `video/style.md`, `video/script.md` (both cuts, two voices, stressed words) and `video/storyboard.md` (scenes and cue words) written.
- 07:58 the tour gained a `?demoSample` flag (the saved sample from the start, offline) and the overlay's caption, progress and controls gained data attributes a recording can hide.
- 08:03 `video/capture/capture.mjs` recorded the tour at 1920 by 1080 with 75 captions marked; the video ran 11 s short of the tour, because the screencast drops still moments, and the first stills showed the drift. A two-pixel heartbeat now keeps the frames coming, and the capture fails if the lengths differ by more than 2 s; recording again.
- 08:05 `video/remotion/scripts/sync.mjs` builds the timeline from the script, the storyboard, the claims register (the receipt checked against the sample workspace) and the capture; Loop90 1:30 and Afternoon 3:26 estimated from the words. The film's components drawn: the field, the chip, the speakers (the app's host with a mouth for speech, the faceless lecturer), the captions, the desk, the latency, the receipt, the loop, the app in its frame, what is real, the doors and the close.
- 08:07 check: `npx tsc --noEmit` in `video/remotion` passed; stills of the desk, the receipt, the loop, the app and the close rendered with the installed Chrome; a stray space before stressed punctuation in captions was fixed.
- 08:08 eight decisions logged (docs/decisions.md).
- 08:11 the heartbeat alone did not fix the drift (368.1 s of video for a 381.2 s tour): Puppeteer's recorder writes frames at a fixed rate. The capture now pipes the browser's own screencast frames into ffmpeg, which stamps each with its arrival time.
- 08:18 the capture kept time: 380.97 s of video for 380.9 s of tour, 17,610 frames, 75 captions marked. Synced: Loop90 1:27 and Afternoon 3:26; stills of the app scenes show the step each line narrates (the proposals under Report, the decision on Dr Rahman's Home, Learn with n of N).
- 08:20 rendering Loop90 (master and 720p copy), a second Loop90 render for the determinism check, and the Afternoon master.
- 08:20 the first render call failed before starting: the Windows shell split the browser path at its space. `render.mjs` now runs Remotion's CLI script with node directly.
- 08:25 Loop90 rendered: 86.8 s, 1920 by 1080, 30 fps, H.264, 16,465,573 bytes, silent, with a 720p copy (2,955,517 bytes), 33 captions in `loop90.srt` and 6 chapters, by 08:30; frames pulled from the file show the receipt counting to 1 of 9 and the ring closing on the end card.
- 08:27 the film copied to `deck/media/loop90.mp4` (ignored) and the deck exported again: Chrome loads the film on slide 5 (86.8 s at 1920 by 1080); the PPTX (21,943 KB) opened in PowerPoint with 11 slides, every note and 1 media object.
- 08:28 check: `npm run typecheck` passed; `npm run prove:all` 185 passed; guide check, contrast check, dash scan (274 files), backup migration, theme, mascot, architecture and sample checks passed; `npx tsc --noEmit` in `video/remotion` passed.
- 08:35 check: `node scripts/determinism.mjs Loop90` failed: the second render differed in 1,447 of 2,603 frames, from the first app scene on. Single stills and PNG frame sequences were identical run to run, Chrome's JPEG frames were not, Remotion's own H.264 path was not (with or without parallel encoding), and the system ffmpeg encoded identical frames byte for byte the same. `render.mjs` now renders PNG frames and encodes them with the system ffmpeg (docs/decisions.md); rendering Loop90 again, the determinism check, then Afternoon.
- 08:45 check: `npm run build` passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; `node scripts/walk.mjs` WALK OK (21 checks).
- 08:57 check: `node scripts/determinism.mjs Loop90` failed again on the PNG path: 1,456 of 2,603 frames differ, all from the first app scene on. The Afternoon render that followed was stopped, since it would need redoing.
- 09:03 the cause: decoded side by side, the differing frames differ only in the 60 px blurred shadow under the app's frame, by 1 to 10 levels along the browser's raster tiles; the footage, the drawn scenes and the text match. So neither the encoder nor the JPEG frames were the cause the 08:45 decision named. The frame's shadow is now a flat offset, and `video/style.md` says no blur anywhere.
- 09:06 check: the first app scene rendered twice as PNG frames: 1 of 412 frames differs, by one level in one background pixel. 09:12, with Chrome's software renderer (`--gl=swangle`): also 1 of 412, and 2.5 times slower, so not adopted. Three attempts at a byte-identical render; what is left is the rasteriser's own rounding.
- 09:15 `scripts/determinism.mjs` now diffs the rendered frames before encoding, measures any differing frame in pixels and levels, and encodes one set of frames twice; it fails on a missing frame, on any pixel more than 2 levels apart, or on two different encodes. `scripts/render.mjs` encodes the master and the 720p copy from one render of the frames (docs/decisions.md).
- 09:16 rendering Loop90 (master and 720p), the determinism check (two more renders), then the Afternoon master.
- 09:18 the owner reported Codex's limit reset, the go-ahead the Codex queue waited for; two reviews started (below).
- 09:20 Loop90 rendered: 1:27 (86.8 s), 13,802,507 bytes, with the 720p copy (2,781,341 bytes) encoded from the same frames, 33 captions and 6 chapters.
- 09:28 the Codex claims audit returned (633 s): no figure unsupported; the 39% stated as a fact where WEF gives an employer forecast, the approval time general where its sources are two US universities, the Malaysian denominators, Biggs filed as an accreditor's clause, and the landing's "the asks change within a year" without a source. Kept as written in `docs/review/`; the changes, each checked against its note, are A8's.
- 09:31 check: `node scripts/determinism.mjs Loop90` passed: 2,603 frames rendered twice, 2,445 identical byte for byte and 158 differing by at most 1 level in 1 to 12 pixels (275 pixels in all, in drawn and app scenes alike); one set of frames encoded twice gave the same file byte for byte.
- 09:33 the new master copied to `deck/media/loop90.mp4`; check: `npm run deck` passed: the film loads on slide 5 (86.8 s at 1920 by 1080), the PDF read back with 11 pages, the PPTX (19,342 KB) opened in PowerPoint with 11 slides, every note and 1 media object.
- 09:34 the Codex pitch review returned (944 s): no figure differs from its row; the verified accuracy and timing fixes (the ChatGPT door in a rehearsed answer, formal approval, "over the same years", "TRL 7 is", three slides over their minutes) and the loop graphic reading Learn before Decide are A8's; the opening order and the commercial framing go to the owner.
- 09:35 check: dash scan (274 files), contrast check (193 files, 37 generated SVGs) and the guide check passed; `npx tsc --noEmit` in `video/remotion` passed.
- 09:35 the experiment files of the determinism hunt could not be deleted: the Blast Radius hook held both deletes, which were not retried. They are outside git: in the ignored `video/out/` (`seq-a`, `seq-b`, `jseq-a`, `jseq-b`, `enc-*.mp4`, `vid-*.mp4`, `stills`, about 370 MB) and in the system temp folder (`lyceum-pngtwice-*`, `lyceum-frames-ONT8r7`, about 1.4 GB, from a stopped render).
- 09:43 Afternoon rendered: 3:26 (206.2 s), 30,147,578 bytes, 64 captions and 12 chapters; four frames pulled from it show the latency pair, Report's helpers beside the footage, the proof scene counting up to 185 and the ring at the close.
- 09:45 ended; committed `7f9b926` "A7: the film's two cuts from one Remotion project, built on a capture of the real app, with captions and numbers from the claims register, a render diffed frame by frame, and the first two Codex reviews".

#### A8, documentation and the full verification

- 2026-10-22 09:46 started; re-read Section 17.5 and this log, then Sections 18 and 19 and the Amanah as-built record (the stamp, the known-mismatches table, the verification tables).
- 09:48 the film: Afternoon's second scene scoped to its sources (employers expect the 39%; the approval time is at the US universities we checked), the proof line names the sample outline and the persona, and the loop scene has nine stations, Lens at Report and again at Learn. A still of the first, round ring showed the labels at Decide overlapping; the ring is now 430 by 300 and every label clears.
- 09:55 records filed from the app's own sample files now say synthetic: an optional `sample` flag on the parsed file, the result and the data source (old backups still restore), shown on Learn, the course overview, the Data room and the upload receipt; the sample workspace regenerated; check: `node --test src/prove-mcp.ts` 5 of 5, with the flag asserted. The film's two lines about the results say synthetic sample, so the render chain started at 09:50 was stopped and started again at 09:56 (Loop90, the determinism check, Afternoon).
- 09:57 the claims audit's changes on every surface that shows them: the register, the landing (both labels, the lead without "the asks change within a year", the clause heading, Biggs labelled a teaching principle, at least three Asian countries), the deck, the brief and the poster. The 9 October as-built report moved to `docs/history/`, with its links.
- 09:58 the deck: the pitch review's verified fixes, and nine stations on slide 4 on a ring a little wider than tall; the poster's ring the same, and its TRL box now names the environment.
- 09:59 README rewritten in the house layout after reading shuden, penyu and the profile README with `gh` (read-only): the banner and card from shuden's `build.py` (6 October, the later of the two) with only its config block changed, every colour a token, a tree's cross-section in braille; the contrast check now holds `.github/readme/*.svg` to the tokens (41 generated SVGs, CONTRAST CHECK OK).
- 10:00 JUDGES.md, `team-overlay/FEEDBACK.md`, `team-overlay/README.md` and `docs/demo-script.md` (new) written to the loop; the guide's review stamp and the Course step's term; `docs/lecturer-guide.md` regenerated and the guide check matches; DECISIONS.md now points at `docs/decisions.md`.
- 10:01 the Codex question-bank rehearsal started (queue item 3).
- 10:08 check: `node scripts/determinism.mjs Loop90` passed on the changed film: 2,615 frames rendered twice, 2,482 identical byte for byte, 133 differing by at most 1 level in 1 to 5 pixels; one set of frames encoded twice gave the same file byte for byte. Loop90's master is 13,855,890 bytes.
- 10:09 check: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; guide check matches; CONTRAST CHECK OK (41 generated SVGs); no en or em dash in 280 text files; BACKUP MIGRATION OK; theme, mascot, architecture and sample workspace checks match; `node --test src/prove-mcp.ts` 5 of 5.
- 10:10 `node scripts/gen-sample-decks.mjs`: PowerPoint opened the pack, 6 slides with their notes; the pack's slide images unchanged.
- 10:11 the Codex question-bank rehearsal returned (590 s): it confirms the corrected rehearsed answers and finds "Claude reads" where only the official MCP client has run the door, and the sample's records dated before the postings they cite.
- 10:15 the seed clock moved to 22 October to fix those dates: two journey proofs failed (their term windows are anchored to July), so it was put back and `prove:all` passed again (docs/decisions.md; Needs the owner 8).
- 10:16 the door's claims say what has run: the deck's notes, the brief, FEEDBACK.md, the booth script and Afternoon's doors line (docs/decisions.md).
- 10:20 Afternoon rendered (3:33, 31,204,367 bytes, 66 captions, 12 chapters), before the doors line changed; it is rendered again after the verification.
- 10:21 the second half of the verification started: build, screenshots, deck, brief, poster, the four smokes and the walk.
- 10:23 check: `npm run build` passed; `npm run shots` wrote 12 screenshots and copied the README's seven; `npm run deck` failed once: slide 6's new note said "CLO5", a digit the slide does not show, so the note names the visualisation outcome instead. The brief passed (1.3 mm to spare on page 3), the poster passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; `node scripts/walk.mjs` WALK OK (21 checks).
- 10:24 check: `npm run deck` passed: the film loads on slide 5 (87.2 s at 1920 by 1080), the PDF (2,483 KB) read back, the PPTX (19,471 KB) opened in PowerPoint with 11 slides, every note and 1 media object.
- 10:27 the screenshots showed the app's ring crowded at nine stations: on How it works Steward's backing covered the start of Lens's line, and on the landing three lines were cut off. The stations are narrower, two lines shorter, and the landing's compact ring shows each step with its helper's name, the full line kept for screen readers (docs/decisions.md); built and shot again, both rings clear.
- 10:30 looked at the deck's slides 2, 4, 7 and 10 and the poster: the scoped labels, nine stations, the sample tag on Learn, the ladder and Biggs labelled.
- 10:35 Afternoon rendered with the corrected doors line (3:33, 31,277,786 bytes); a frame showed the chapter chip over the diagram's title, a flaw from A7, so the diagram now sits below the chip, and Afternoon renders once more.
- 10:48 Afternoon rendered, final: 3:33 (213.1 s), 31,447,971 bytes, 66 captions and 12 chapters; a frame of the doors scene shows the whole diagram clear of the chip, the badge and the captions. `npx tsc --noEmit` in `video/remotion` passed.
- 10:51 check, on the final build: `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; `node scripts/walk.mjs` WALK OK (21 checks); dash scan clean (280 files); CONTRAST CHECK OK (41 generated SVGs).
- 10:53 `docs/as-built.md` restructured and stamped: the Amanah front (what Lyceum is, plan versus built with fourteen known mismatches, exact versions, the layout, the dated verification table, what needs a person) and the package sections A0 to A8 as the changelog; ten A8 decisions logged (docs/decisions.md).
- 10:55 ended; committed as "A8: the as-built record, the claims register checked by a Codex audit, the deck after the pitch review, synthetic samples labelled, the loop in order on every ring, the README in the house style, and the full verification" (the hash is in `git log`).

#### After Track A: the owner's follow-ups

- 2026-10-22 10:56 the owner asked: explain the doors' marks, the Claude Desktop run and TRL 6; the poster's QR code by a Vercel deploy; the opening order and the repository description later; delete the kept files; fix the sample's dates; show the new UI.
- 10:58 the kept files deleted (about 4 GB): the render experiments in the ignored `video/out/` and the frame folders in the system temp folder. The Blast Radius hook could not resolve the Git Bash paths, so the delete ran through PowerShell with Windows paths.
- 10:59 `npm run dev` started for the owner: the workspace at <http://localhost:5173/> and the local API on :8787.
- 11:01 the seed clock moved to 22 October 2026, after the saved sample's retrieval; `src/prove-journey.ts` now builds its "a day later" and "a day earlier" moments and the superseded brief's date from `SEED_NOW`. Check: `npm run prove:all` 184 of 185 until the sample workspace was rebuilt (`node mcp/sample.ts`), then 185 passed, 0 failed, seventeen suites.
- 11:02 the film's timeline is unchanged by the clock (`node scripts/sync.mjs`), so the renders stand.
- 11:06 check: `npm run typecheck` passed; `npm run build` passed; `npm run shots` (12, the README's seven copied); `npm run deck` passed (the PPTX 19,472 KB, every note and 1 media object); the brief, the poster and the sample decks rebuilt; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; WALK OK (21 checks); the guide, contrast (41 generated SVGs), dash scan (280 files), backup migration, theme, mascot, architecture and sample checks pass; `node --test src/prove-mcp.ts` 5 of 5. The Decide shot now reads "Prepared 2026-10-22".
- 11:07 `node mcp/try.ts`: the evidence report says exported and generated 2026-10-22T10:00:00Z, after the retrieval on 2026-10-09; the quoted run in `docs/doors.md` updated.
- 11:31 the owner said yes to the deploy, and asked for a workspace that is less congested and more intuitive: keep the colours and the graphics, "more duolingo vibe", "slight brutalist".
- 11:34 the production build deployed to Vercel as a static site from the owner's signed-in command line: project `lyceum`, <https://lyceum-rho.vercel.app> (docs/decisions.md). Check: the address answers 200 and opens on the landing page at `#/index`. The site serves the A8 workspace until the owner approves the new one.
- 11:36 the poster's QR code, `docs/presentation/qr-landing.png`, to <https://lyceum-rho.vercel.app/#/index>, decoded back with OpenCV to the same address; `scripts/gen-poster.mjs` uses it by default. 11:37 the poster PDF rebuilt with it (Needs the owner 3, resolved).
- 12:00 a concept of the friendlier workspace, uncommitted, for the owner to judge (docs/decisions.md): the loop as a path of round stops across the top of every step, the helper's question in a speech bubble, a chunky layer at the end of `src/theme/global.css` on the tokens (outlines, flat lips, pills, more air), the sandbox folded in the sidebar. Before and after captures at 1440 px and a 390 px capture were made from the running app.
- 12:05 check on the concept: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed; `npm run smoke` 19 of 19, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; the guide, contrast (41 generated SVGs), dash scan (280 files), backup migration, theme, mascot, architecture and sample checks pass; `node --test src/prove-mcp.ts` passed. `smoke:integrity` and the walk failed at first: both clicked the loop rail from Home and the Courses list, where the path now does not show, and the sandbox links, now in the fold. They now enter the loop from the selected course chip and open the fold first; re-run at 12:09: `smoke:integrity` 2 of 2, WALK OK (21 checks).
- By 12:42 the owner approved the concept ("The rules is AI generated anyway. i prefer something that more attract judges attention so yeah thank you proceed"): roll it out to every screen, rebuild what is made from the screens, redeploy; commit on the owner's word.
- 12:46 to 12:57 the rollout, every screen captured at 1440 px and the public pages, Home, Watch and Report at 390 px: the path's header carries the save status and the kind of course, so the separate line under Course, Update, Teach and History is gone; sign-in shows each person as a big pressable card, the card on a lime edge over the forest-deep backdrop (the contrast check refused the first version, whose selector named no forest surface; the backdrop is now marked as one); the landing page's cards stand on the dot grid with an outline and a lip; How it works' helpers and principles, History's toggles and the decision cards restyled; the handoff carries a check mark; Watch shortened without touching the tour (docs/decisions.md); on a phone the path's header takes fewer rows and the landing bar keeps one button.
- 12:59 `npm run shots`: 12 shots, the README's seven copied. The deck's two crops and the poster's crop re-measured for the new sizes. `npm run deck` failed first (slide 5's caption ran into the footer), then passed with the slide's left column at 920 px: 11 slides, the PDF read back, the PPTX opened in PowerPoint with every note and 1 media object. The brief passed its checks; the poster failed first (a card 18 px past its row), then passed with the refused paraphrase at 196 mm.
- 13:06 check: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; WALK OK (21 checks, the tracked captures refreshed); the guide, contrast (41 generated SVGs), dash scan (280 files), backup migration, theme, mascot, architecture and sample checks pass; `node --test src/prove-mcp.ts` passed.
- 13:08 plan Sections 5.2, 6.4 and 6.6 revised for the path, the bubble and the depth by outline and lip; the lecturer guide (regenerated from `scripts/generate-guide.mjs`), `JUDGES.md` and the code comments now name the path, not the rail.
- 13:13 the film's footage recorded again on the new workspace (`node video/capture/capture.mjs`): 386.23 s of video for 386.3 s of tour, 17,949 frames, 75 captions marked; frames pulled at 75 s and 230 s show the path on Report and Dr Rahman's decision in the new panels.
- 13:15 `npm run build` passed; `npm run shots`: 13 shots, the new one the step's frame (the path and the helper's question, at 1440 px), now the README's hero in place of Home's ring; the README's unused copy of the ring removed.
- 13:16 the new build deployed to production on Vercel, project `lyceum`: <https://lyceum-rho.vercel.app> serves the new build (the index names the same script and style files as `dist/`), and the landing page loads with no page error.
- 13:44 the film rendered on the new workspace: Loop90 1:27 (13,919,607 bytes) with its 720p copy, 33 captions and 6 chapters; `npm run check:determinism` passed (2,615 frames rendered twice, 2,465 identical byte for byte and 150 differing by at most 1 level in 1 to 12 pixels; one set of frames encoded twice gave the same file); Afternoon 3:33 (31,420,160 bytes), 66 captions and 12 chapters. The new Loop90 copied to `deck/media/`; `npm run deck` passed: 11 slides, the PDF read back, the PPTX opened in PowerPoint with every note and 1 media object.
- 13:47 the team repo, on the owner's word ("update the team repo but don't include my plan etc. and readme only functional part they can branch off and develop"): `scripts/team.mjs` now leaves out `CLAUDE.md`, `DECISIONS.md`, `JUDGES.md`, the upgrade and improvement plans, this log, the decisions log, the as-built record, the booth script, `docs/review/`, `docs/history/`, `docs/competition/` and seven screenshots nothing reads, and its dry run prints the snapshot's tree (docs/decisions.md). The team's README is cut to running, checking, the code map, the UI rules, the docs that ship and how the team works; FEEDBACK.md no longer links to what stays here; the team's `.gitignore` covers the deck's and the film's outputs. The walk's 16 untracked extra captures deleted, as decision 457 of A4 says.
- 13:52 check on the exact snapshot, unpacked and installed fresh with `npm ci`, with Windows line endings: `npm run typecheck`, `npm run prove:all` 185 passed, `npm run build`, the guide, contrast, dash scan (262 files), theme, architecture, mascot, sample and migration checks, `npm run smoke` DEMO SMOKE OK, `smoke:integrity`, `smoke:workspace` and `smoke:curriculum` passed, after one fix: `scripts/gen-theme-css.mjs --check` compared the font licences byte for byte, because it looked for `.txt` on the package's file name instead of the copy's, so any checkout with CRLF line endings, a Windows clone, failed it; it now normalises line endings, as its comment says.
- 13:53 published `955f6f6` to the team's main: 387 files, 18.2 MB, and no plan, run record, review or history file in its tree. The first snapshot (`5732fc1`, 20 October) still holds the older improvement plan, `DECISIONS.md`, two Codex reviews, the history and four pitch-planning notes in the team repo's history.
- 13:58 the owner asked for the text people see to be evaluated ("i think some are straight up chartjunk"), with the sidebar's footer and the sandbox's notice as the examples.
- 14:00 to 14:10 the visible text of every screen captured from the running app: 25 screens, 7,911 words, closed disclosures not counted. Cut: lines that repeat the helper's line, the heading or another line on the same screen, one sentence repeated on every row, filler subtitles, buttons that repeat the sidebar, explanations of where things will appear, zero counts beside a sentence that says the same; long lists now open with their first entries and Show all, a failing quotation always shown; Evaluation's suite table and the benchmark protocol behind disclosures. Kept: every honesty label, every number with its denominator and interval, the verified tag on each quotation, the review state of each posting, and every string the smokes check (docs/decisions.md). Fixed on the way: "1 quotations", "1 sessions", "1 linked sessions", "1 saved teaching sessions", raw ISO times on the brief and the snapshots, and the Guide's first card, which still described the earlier workflow and said slide generation was planned. After: 7,065 words, 11% fewer (Evaluation 749 to 404, Watch 644 to 530, sign-in 184 to 131, Home 137 to 105).
- 14:14 check: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; WALK OK; the guide, contrast, dash scan, backup migration, theme, mascot, architecture and sample checks pass; `node --test src/prove-mcp.ts` passed. The walk now deletes the captures it writes that the repository does not track, which decision 457 of A4 left to be done by hand.
- 14:16 `npm run shots` (13), `npm run deck`, the brief and the poster rebuilt on the edited text, each passing its checks; the film's capture and renders started again so the footage carries the same text.
- 14:17 the edited build deployed to production on Vercel; <https://lyceum-rho.vercel.app> serves it (the same script file as `dist/`). Published `f3b2de3` to the team's main: the text pass, the walk's cleanup and the rebuilt assets, 41 files.
- 14:21 the help pill named all four steps the Studio's guide covers ("How to use Course, Update, Teach and History") and read "How to use How it works" on that page; it now names the step in view, and "this page" on How it works. The film run that had started was stopped (its capture and ffmpeg processes stopped by id, no headless browser left), the build remade, and the film started again on it.
- 14:58 the film on the final build: the capture 385.47 s for 385.5 s of tour, 17,814 frames, 75 captions marked (a frame at 243 s shows the Update step with "How to use Update"); Loop90 1:27, 13,929,397 bytes, with its 720p copy, 33 captions and 6 chapters; `npm run check:determinism` passed (2,615 frames rendered twice, 2,471 identical byte for byte, 144 differing by at most 1 level in 1 to 14 pixels; the encoder gave the same file twice); Afternoon 3:33, 31,599,152 bytes, 66 captions and 12 chapters; the new Loop90 in the deck, `npm run deck` passed (the PDF 2,501 KB, the PPTX 19,599 KB opened in PowerPoint with every note and 1 media object).
- 15:02 the full verification on the final source: `npm run typecheck` passed; `npm run prove:all` 185 passed, 0 failed, seventeen suites; `npm run build` passed; `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6; WALK OK, with no capture left behind; the guide, contrast (41 generated SVGs), dash scan (280 files), backup migration, theme, mascot, architecture and sample checks pass; `node --test src/prove-mcp.ts` passed; `npx tsc --noEmit` in `video/remotion` passed.
- 15:03 the final build deployed: <https://lyceum-rho.vercel.app> serves `index-235_z167.js`, the same file as `dist/`. Published `d8ca740` to the team's main: the help pill and three refreshed captures.
- 15:05 `docs/as-built.md` stamped and its verification section brought to this run. Nothing is committed; the owner commits.

### What is left

Track A is done, apart from the Needs the owner list at the top of this file and the parts that need a person (`docs/as-built.md`, section 6: the voices, the music bed, the Claude Desktop run, the playback test on the presenting laptop, the NVDA and wifi-off passes, the rehearsals). Track B follows in pilot order (plan Section 17.2).
