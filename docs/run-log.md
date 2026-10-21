# Track A run log

The autonomous run of Track A (docs/lyceum-upgrade-plan.md Section 17.5). Times are Kuala Lumpur time (GMT+8). To resume after an interruption, start at the first package below that has no "ended" line, and re-read Section 17.5 and this file first.

## Needs the owner

1. **The doors strip: official marks or neutral icons?** (raised 2026-10-22 06:16, A2b) Plan Section 17.1 asks for the landing page's doors strip "with the official marks" and a `docs/brand-use.md` listing each mark and its source. A2b shipped neutral Lucide icons with each door's name and a Planned tag, because the third-party marks (Claude, ChatGPT, Copilot, Gemini, Teams, the LMS) carry usage terms nobody has checked, and showing them beside doors that are not built could read as an endorsement or an integration. To switch: approve the marks and their sources (from each brand's press or brand page), and the strip and `docs/brand-use.md` follow in one change (`DOORS` in `src/ui/screens/Landing.tsx`). Nothing else waits on this. *Update, A6 (07:45):* the architecture diagram, and so the deck, the brief and the poster, now carry three Simple Icons marks where Lyceum really connects (Claude and MCP on the built local door, Greenhouse on the board it reads), with the ownership line; every other product is named in text, because Microsoft needs a licence, Google a request that takes up to two weeks, Moodle permission, and the OpenAI and Instructure terms were not read in a run that sends nothing off the machine. `docs/brand-use.md` lists each mark, its source and its terms. The landing strip is unchanged until you answer.

2. **Run the local door once in Claude Desktop** (raised 2026-10-22 06:37, A5) Plan Section 17.1 asks for a recorded Claude Desktop run of the door. It needs the desktop app and your account, and configuring it changes a file outside the repository, so this session recorded a real stdio session with the official SDK client instead (`node mcp/try.ts`, in docs/doors.md). The steps and what to check are in docs/doors.md, under "The manual Claude Desktop run"; record the date and the first lines of the answer there. Nothing else waits on this.

3. **The poster's QR code needs a public address for the landing page** (raised 2026-10-22 07:45, A6) Plan Section 15 puts a QR code to the public landing page on the poster. No deployed address exists in the repository, and deploying sends the build off this machine, so the poster's slot is marked planned. Once the page is live, make a QR image of its address and run `node scripts/gen-poster.mjs --qr <file>`; the poster PDF is regenerated with it. Nothing else waits on this.

## Codex queue

The owner's Codex limit was reached on 22 October and resets within hours. A Codex run also sends the embedded files to OpenAI, which this run's rules forbid without the owner's go-ahead, so no package here waits on Codex. Reviews worth running once the limit resets and the owner approves are listed here with their files and question; each is `codex exec --sandbox read-only` with the files on stdin and the report saved under `docs/review/`.

None queued yet.

## Packages

### A0, checkpoint and the branch

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

### A1, theme and shell

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

### A3, mascots v1

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

### A2a, Watch, Report, Decide

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

### A2b, the remaining loop screens, Home, How it works, Landing

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

### A4, demo and checks

- 2026-10-22 06:16 started; re-read Section 17.5 and this log, then Sections 4, 15 and 17.
- Before 06:23: the tour rewritten in loop order (91 steps) with a `decision-recorded` wait; the demo smoke now ends on Home with the closed ring and asserts the decision, the event order and the results matched to the version taught; the walk updated for the rail and Learn; the tour length computed and registered in `docs/claims.md`.
- 06:23 check: `npm run typecheck` passed; `npm run prove:all` 179 passed.
- 06:24 check: `npm run build` passed.
- 06:25 check: `npm run smoke` 19 of 19, `smoke:integrity` 2 of 2, `smoke:workspace` 7 of 7, `smoke:curriculum` 6 of 6 passed.
- 06:25 check: guide check matches; contrast check, dash scan (231 files) and the backup migration passed; `node scripts/walk.mjs` WALK OK (21 checks).
- 06:23 three decisions logged (docs/decisions.md).
- 06:26 ended; committed `8beb1fe` "A4: the tour follows the loop and closes the ring, the demo smoke asserts the decision record, and the walk visits every step".

### A5, the local door

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

### A6, deck, diagram, brief, poster

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

## What is left

A7 (the parts that need no human voice), A8, in that order.
