# Lyceum: as built

**Stamp.** Track A of [lyceum-upgrade-plan.md](lyceum-upgrade-plan.md), built from 22 October 2026 on `main`. Base commit `f5b26a4`, tagged `pre-overhaul`. Each package adds a dated section with its verification table; package A8 turns this file into the stamped as-built report for Amsterdam (plan-versus-built table, exact versions, the full verification table, the changelog). Each section is signed by the package's accepting owner (plan Section 17.3).

**Rollback.** `git checkout pre-overhaul` returns the tree as it stood before the overhaul: the whole October workspace, committed on 22 October 2026 at 03:25 as "Checkpoint before the overhaul".

## A0, checkpoint and the branch: 22 October 2026

What was done:

- The working tree, uncommitted since 26 July, was committed as `f5b26a4` "Checkpoint before the overhaul" and tagged `pre-overhaul`.
- The teammate's branch was taken with `node scripts/team.mjs take feature/evidence-snapshots` (one commit, `41d8429`, 18 files): frozen evidence snapshots in `src/lib/snapshots.ts`, the `EvidenceWatch` panel, store actions, backup schema 4, the brief's "Changes since" section and `src/prove-snapshots.ts` (six checks). Sixteen files applied cleanly, `package.json` merged, and the one conflict (`DECISIONS.md`, both sides added an entry) was resolved by keeping both entries (docs/decisions.md). The team README change landed in `team-overlay/README.md`, as the team script maps it.
- Every changed file was read before the checks ran.
- Environment fix: `node_modules` had lost its `.bin` folder and two declared packages (`@anthropic-ai/sdk`, `@hono/node-server`), so `tsc` could not run. `npm install` from the unchanged lockfile restored them. No dependency was added or upgraded.
- Versions on this machine: Node 24.14.1, npm 11.11.0, TypeScript 5.9.3, Vite 6.4.3, React 18.3.1, puppeteer-core 23.11.1, pptxgenjs 4.0.1. The smokes drive the installed Chrome.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 166 passed, 0 failed, in fifteen suites (the six snapshot checks included) |
| `npm run build` | Passed. The main chunk is 630 kB, over Vite's 500 kB advisory; pptxgenjs and SheetJS stay in their own chunks |
| `npm run smoke` | 14 of 14 passed: the full tour on the saved sample, both decks downloaded, no page errors |
| `node scripts/check-backup-migration.mjs` | 16 of 16 passed. A schema 4 export (10 sources, 7 quotations, 1 snapshot) restores through `restoreWorkspaceBackup` with everything kept and the snapshot still comparing (9 of 9 reviewed postings carried; the sample holds one duplicate copy). The same backup set to schema 3 with `evidenceSnapshots` removed restores with empty snapshots and re-exports at schema 4 |

Nothing else was changed; the checks revealed nothing to fix in the code.

**Follow-ups from the branch review, for A2a** (plan Section 1):

1. Move the `EvidenceWatch` panel into the Watch screen.
2. Update the Evaluation suites table to 166 checks in fifteen suites.
3. Let the demo tour freeze a snapshot so the feature is visible.
4. Replace the arrow glyphs in the coverage column with words.
5. To consider: require a reason to remove a snapshot once a brief cites it.

Accepted by: the Code lane (owner to sign).

## A1, theme and shell: 22 October 2026

What was built:

- **Tokens as the only source.** `src/theme/tokens.ts` holds the Section 6.1 colours exactly (the poster's values plus `--emerald-text`, the semantic warn and danger pairs, the control border and the two focus colours), the type, space, radius, motion, depth and layout scales, and helpers (`cssVar`, `withAlpha`, `bareHex`). `scripts/gen-theme-css.mjs` writes the `:root` block and the `@font-face` rules into `src/theme/global.css` between markers, copies the three fonts and their OFL licences into `public/fonts/`, and writes the two preload links into `index.html`; `--check` reports drift.
- **Bundled fonts.** Bricolage Grotesque, Plus Jakarta Sans and JetBrains Mono from the Fontsource variable packages 5.3.0, Latin subset only (27 to 41 kB each), `font-display: swap`, the display and body faces preloaded. The Google Fonts links are gone from `index.html` and from the brief generator; a headless capture loads all three faces with every external request blocked.
- **Every screen in the new theme.** 338 uses of the old variables moved to the plan's names, with `--accent` and `--ok` split by context (text and icons to `--emerald-text`, fills to `--emerald`, focus to `--focus-light`); 106 inline font sizes moved onto the Section 6.3 scale. The pptx decks, the demo overlay, the command palette and the brief generator take their colours from the tokens.
- **Primitives** in `src/ui/primitives/index.tsx` are class based, with hover, focus-visible, active, disabled and loading states defined once in `global.css`: Button (primary emerald, outline, quiet, danger, lime and ghost for forest surfaces, a `loading` state), Card (light, tint, forest), Tag (ok, warn and danger always with an icon; `planned` with the dashed border), Field, Input, Textarea, Select (bounded by `--control-border`), Spinner, EmptyState, Stat, Kbd, Provenance, Row and a new Disclosure. Targets are 44 px on coarse pointers and narrow screens.
- **The shell.** A forest header band (the one forest element on a working screen) with the wordmark, the current course and step, search, notifications and the account menu, lime focus rings inside it; a white sidebar with Home, Courses, the **loop rail** (Course, Watch, Report, Decide, Update, Teach, Learn, History, each with a Lucide role icon, a count from saved records and a worded Done or Next), the course chips, Explore and the labelled sandbox. Focus moves to the page heading on each screen change and returns to the trigger when a menu is dismissed with Escape.
- **Hash routes** `#/course/:id/<step>` (`src/app/routes.ts`, `src/app/loop.ts`), honoured on refresh and deep links for a course the person may open, and wired to today's screens: Course, Watch, Report and Decide, Update, Teach and History open the Studio tabs, Learn opens Upload. `navigate()` takes the course argument the plan names.
- **Surfaces.** The dot grid and the forest hero card on the landing page; the sign-in screen on the `--forest-deep` backdrop with every line of text on a card; warn and danger boxes carry an icon and a word.
- **Checks.** `scripts/contrast-check.mjs` asserts the 61 ratios in the audit's tables and the plan's Section 6.2 table against `tokens.ts`, fails on a hand-written hex, bare Office or pptx colour, `rgb()` or `hsl()` value anywhere outside `tokens.ts`, on drift in the generated theme, on a generated SVG using a non-token colour, and on lime outside a forest context in the stylesheet. A negative test (a planted hex, an `rgba()`, a bare pptx colour and a lime rule on a light selector) failed it as it should. `scripts/dash-scan.mjs` is the dash scan.
- **Smaller fixes found on the way:** the floating Play demo pill covered the Guide page's role filter once signed in, so signed in the tour now starts from an inline button on the Guide page; Button defaults to `type="button"`; the integrity smoke reaches the Studio and Upload screens through the rail.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run build` | Passed; `dist/fonts` holds the three faces and their licences |
| `node scripts/contrast-check.mjs` | CONTRAST CHECK OK: 61 ratios, 172 files scanned, theme outputs current. One rounding note: `--emerald-text` on mint computes 5.55 where the audit and plan print 5.6; the AA verdict holds |
| `node scripts/gen-theme-css.mjs --check` | Outputs match `tokens.ts` |
| `npm run smoke:workspace` | 7 of 7 passed, including 390 and 320 px with no page overflow |
| `npm run prove:all` | 166 passed, 0 failed, fifteen suites |
| `npm run smoke`, `smoke:integrity`, `smoke:curriculum` | 14 of 14, 2 of 2 and 5 of 5 passed |
| `node scripts/generate-guide.mjs --check` | Matches |
| `node scripts/dash-scan.mjs` | No en or em dash in 172 text files |

Not done in A1, by design: the step screens themselves (A2a and A2b), the ring that replaces the journey bar (A2a), the narrow-screen bottom bar of Section 5.2 (decided in docs/decisions.md), the mascots in the rail and the empty states (A3).

Accepted by: the Code lane (owner to sign).

## A3, mascots v1: 22 October 2026

What was built:

- **The cast, drawn in code** in `src/ui/mascots/`: the host (working name Tualang, a young tree on its growth rings with a single lime leaf at the crown) and the seven helpers, Folio (a book with a soft spine and a lime bookmark), Scout (an explorer with a telescope and a lime lens glint), Atlas (a map pin with a lime thread between two pins), Lens (a magnifier holding the interval bracket with lime ends, drawn at the real interval width), Quill (a feather pen with a lime nib on a ruler rail), Prism (a prism with the three ray tokens) and Steward (a folder with a lime receipt and a clipboard). One shape family (`parts.tsx`): rounded bodies, big eyes with a white catchlight, a line for a mouth, detached feet, forest ink at one stroke weight, two-tone fills with the dark side as a rim, colours taken from `tokens.ts` as values so the same SVG renders in the app, in Puppeteer and in Remotion. Named parts (`eyes`, `prop`, `arms`, and the host's `leaf` and `rings`) for animation.
- **Poses.** Every helper has resting, working, waiting and done; the host has greeting, resting, celebrating (a new ring glows) and reflecting. The host has two extra size classes (hero and poster detail).
- **The Mascot primitive** (`src/ui/mascots/index.tsx`): who, mood, size and surface; hidden from assistive technology with the name in the adjacent label; draws nothing for "stuck", so the error card speaks. Rest is static; the prop moves only in the working mood and a just-saved record gets one spring; a float is allowed only where the plan allows it (`float`, landing and film); `prefers-reduced-motion` stops all of it. `useCourseMoods` reads the moods from the store and re-renders once when a done window ends.
- **The mark** (`mark.tsx`): the host's silhouette in one colour (forest or white, with an optional lime leaf on forest) and the tile for the favicon and the app icon. Wired in `index.html` (SVG favicon, 32 px PNG, the 180 px Apple touch icon, a web manifest) and beside the wordmark in the header and on the landing bar.
- **Moods from records only** (`src/app/moods.ts`): a pure function of the state, the requests in flight and the clock. A session-only `requests` list in the store (`beginRequest`, `endRequest`, `trackRequest`) wraps the real work: the research-run fetch, the upload parse and the pack render (`downloadPack`). Working needs a request; waiting needs a proposal of the helper's own (fetched postings not kept, quotations not confirmed, a checked revision not adopted, a brief not sent, an upload not confirmed); done lasts four seconds after the record's own timestamp; stuck comes from a failed fetch. The host follows the loop's done marks: greeting before any step, resting mid-loop, celebrating then reflecting once the six steps are done.
- **Renders.** `scripts/gen-mascots.mjs` loads the same TSX through Vite's SSR loader and writes `public/brand/mascots/` (every character and pose as SVG, and as PNG at 512 and 1024, the host also at 2048), `mark.svg`, `mark-white.svg`, `favicon.svg`, `icon-32.png`, `icon-180.png`, `icon-192.png`, `icon-512.png` and `manifest.webmanifest`: 35 SVGs and 72 PNGs, 3.9 MB, in under five seconds. `--check` re-renders the SVGs and reports drift; the contrast check confirms every colour in the 35 SVGs is a token.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 174 passed, 0 failed, sixteen suites; `prove:moods` adds 8 checks. A mutation test (Scout forced to "working") failed 4 of the 8, as it should |
| `node scripts/gen-mascots.mjs` then `--check` | 35 SVGs, 72 PNGs and the manifest written; outputs match the components |
| `node scripts/contrast-check.mjs` | CONTRAST CHECK OK, 35 generated SVGs checked |
| `npm run build` | Passed |
| `npm run smoke`, `smoke:integrity`, `smoke:workspace`, `smoke:curriculum` | 14 of 14, 2 of 2, 7 of 7 and 5 of 5 passed |
| `node scripts/generate-guide.mjs --check`, `node scripts/dash-scan.mjs` | Matches; no en or em dash in 221 text files |

Not done in A3, by design: placing the helpers in the step header cards and empty states and the host on Home and How it works (A2a and A2b, Section 7.3); the host's celebrating and reflecting moods can only be reached once Decide records exist (A2a), so their proof is added there; concept sheets from image generation were not made, because that would send prompts off the machine (Section 7.4 makes the drawn cast the production asset either way).

Accepted by: the Code lane (owner to sign).

## A2a, Watch, Report, Decide: 22 October 2026

What was built:

- **Evidence split in two.** **Watch** (`src/ui/screens/Watch.tsx`) holds the research run, the kept sources as cards on a dated timeline (one entry per collection run or pasted document), the paste form behind a disclosure, and the teammate's snapshot panel (A0 follow-up 1). **Report** (`src/ui/screens/Report.tsx`) has a sub-rail, Quote, Review, Count, Map and Brief, in the URL as `#/course/:id/report/<tab>` and keyboard operable (arrows, Home, End). Quote shows each proposed quotation beside its source pane with the matched words highlighted; Review shows the denominator meter ("n of m kept postings reviewed"); Count shows a skill card per skill with the share, the Wilson 95% interval printed and drawn, and a waffle, with the old table behind a disclosure; Map shows the coverage ladder (absent, introduced, practised, assessed) with the target and the shortfall in words; Brief is the meeting brief. The stale "nothing is collected from the web" line is gone.
- **The decision record** (`BriefDecision` in `src/types.ts`, `src/lib/decisions.ts`, `recordDecision` in the store): adopt, retain, defer or return, with a required reason of up to 2,000 characters, bound to the brief, the course version and the term. Only a recipient of the brief who holds "decide" (a coordinator of the course, or the programme owner) may record one; a lecturer and management cannot. The brief's author can record a decision, but it is labelled self-recorded and the step stays open until a second person decides, except on a personal single-owner course. Records are never edited: deciding again is a new record that becomes that person's standing decision. A newer brief supersedes the older one, whose decisions stay on record. A decision taken before the evidence changed is marked "evidence changed since".
- **Decide** (`src/ui/screens/Decide.tsx`) shows the latest brief, its recipients, who has read it, every decision on record and the form; the same panel, compact, gives the four buttons and the note on the recipient's Home. The mock-cohort try is linked as illustrative. The author is notified of a decision on their brief, and the notification opens Decide.
- **The append-only event log** (`events` in the store): briefs prepared, sent and read, decisions, snapshots frozen, versions adopted and term changes, each with who and when. The How it works timeline (`src/app/runs.ts`) reads the events first and labels the lines worked out from records as derived ("the count as the records stand now").
- **The receipts ring** replaces the journey bar (deleted: `src/app/journey.ts`, `src/ui/primitives/Journey.tsx`). `src/app/loop.ts` holds the six steps, their questions and handoffs, and the done rules of Section 4, scoped to the current term: a step counts only records inside the term window, which restarts when the stated term changes from one value to another; seeded examples never count; the course counts only with an outcome; a session only when its outcome is current; Update only for an adoption under an adopt decision, or "no change this term" after retain; return sends Report back. The ring and its legend are on Home (Start here, with the host) and in the rail; the summary line is literal ("3 of 7 done for 2026-S2. Next: Decide." or "Loop closed for ...").
- **Positions mapped onto today's hats** (Section 4.2): `decide` and `adopt` capabilities; the old Proposal tab and the Approvals screen moved into the sandbox group, labelled illustrative; sign-in shows one line per person saying what they can do in the loop.
- **Step frames**: each step page has the eyebrow (course, step n of 6), the step's question, the helper with its mascot, a course switcher, a step strip on narrow screens and a handoff card that ends the step. Course, Update, Teach and History stay in the Studio and stay mounted, so an open editor survives a step change. Teach holds the assessment behind a disclosure.
- **Backups at schema 5** carry the decision record and the event log, with referential checks; schema 4 and older files restore with both empty. The host's mood reads the loop's own `closed`, so the ring and the host cannot disagree; celebrating and reflecting are now proven.
- **Kept green in this package**: the section guides gained Watch, Report, Decide and the sandbox proposal (19 sections), the lecturer guide was regenerated in the loop's order, the Evaluation suites table now shows the measured 178 checks in sixteen suites (A0 follow-up 2), the coverage words replace the arrow glyphs (A0 follow-up 4), and the tour, in its old order with remapped targets, now freezes a snapshot (A0 follow-up 3). Follow-up 5 is decided in docs/decisions.md.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 178 passed, 0 failed, sixteen suites. `prove-journey` rewritten (7 checks: done rules, the decision record, single-owner courses, a new term, the event-first timeline, the routes, landing figures); `prove-research` adds the event log and the decision; `prove-evidence`, `prove-research` and `prove-snapshots` assert schema 5; `prove-moods` adds the closed loop |
| `npm run build` | Passed |
| `npm run smoke:curriculum` | 6 of 6 passed: Watch and Report on a personal course (pasted receipt, exact quotation, rejected misquote, the denominator meter, the ladder, the scan beside its source, count, brief sent, report export, reflow at 390 and 320 px on every sub-step), Dr Rahman's retain decision with its reason on his Home, Decide and Update after retain, backup and restore keeping the decision, the keyboard sub-rail, zero page errors |
| `npm run smoke` | 15 of 15 passed, including the frozen snapshot |
| `npm run smoke:integrity`, `smoke:workspace` | 2 of 2 and 7 of 7 passed (the workspace smoke walks the rail by keyboard and opens the proposal in the sandbox) |
| `node scripts/check-backup-migration.mjs` | BACKUP MIGRATION OK: schema 5 with the decision and four events restores whole; schema 4 and schema 3 files restore with an empty record and log |
| `node scripts/generate-guide.mjs --check`, `node scripts/contrast-check.mjs`, `gen-theme-css.mjs --check`, `gen-mascots.mjs --check` | Match; CONTRAST CHECK OK (61 ratios); theme and mascot outputs current |
| `node scripts/dash-scan.mjs` | No en or em dash in 225 text files |

A visual pass on the built app with the dated saved sample (Home, Course, Watch, every Report sub-step, Decide for the author and the recipient, How it works, and Report and Decide at 390 px) found no layout fault; the captures were review aids and are not committed.

Not done in A2a, by design: the Learn step's match between a results file and the taught version, and the restyled Course, Update, Teach, Learn, History, Home and How it works screens (A2b); the tour in the loop's order with Dr Rahman's decision (A4). Times on records are shown as stored (UTC), as elsewhere in the app.

Accepted by: the Code lane (owner to sign).

## A2b, the remaining loop screens, Home, How it works, Landing: 22 October 2026

What was built:

- **Course** shows the outline as cards: outcomes with their Bloom level and achievement evidence, topics with their hours against the contact-hour budget as a meter. One action: "Watch employers" while the course has no evidence, "Start a revision" once it has. Teaching context, documents and sources, the preparation checklist and the illustrative sandbox sit behind disclosures.
- **Update** opens a revision with the hours meters (contact and self-study against their budgets, an over-budget state in words), the number of changes, what is left to fix or review and the check state; the current outline shows the same meters. The sessions and assessments a change affects are listed behind a disclosure. The rationale and the term stay visible because adoption requires them (docs/decisions.md).
- **Teach** shows session cards by week, each with its linked outcomes as tags, its status and its teaching pack (.pptx); the assessment stays behind its disclosure.
- **Learn** is its own screen (`#/course/:id/learn`): the sentence "No learning gain is claimed; the benchmark has not been run."; attainment per outcome from the latest results file as filed, with the mean mark, its spread and n of N (N being the most students the file records for any outcome, said in words); filing results or a CLO survey through Upload's intake panel, where the person filing confirms the course version taught; the results and surveys filed, a seeded example labelled and never counted; the planned Track B items, each tagged Planned; the benchmark protocol and its status (written, not run, 0 real terms). A results file now carries the version it is for, and Learn's done rule counts only files matched to a version of the course (Section 4).
- **History** puts the course versions and the decisions on briefs on one timeline, newest first; each entry opens to its outline with an export, or to its decision card; the revision log sits behind a disclosure.
- **Home** leads with Start here: the host, the ring with the next step lit, "Continue" and the resume action. The briefs waiting, the notifications and the courses sit behind disclosures that open by themselves when something is waiting.
- **How it works** opens with the loop graphic: the host at the centre and the seven helpers at their stations in loop order, with a people station at Decide; choosing a helper opens its card (reads, produces, cannot). "See the record on this course" opens the timeline, behind its disclosure, with recorded and derived lines labelled. The same graphic is the landing hero, on forest.
- **The landing page**: the loop as the hero with two ways in; the problem at three levels, one figure each, with every source linked and the vendor survey said so, labelled desk research until the interviews; each loop step beside the accreditor clause it operationalises, quoted word for word from the dated notes (NAAC marked a paraphrase; ESG 1.2 and AACSB Standard 5 left out until a note checks them); the doors as a monochrome strip, the web workspace Built and the rest Planned; what is proven, with dates (179 checks on 22 October, 727 live postings on 9 October). No synthetic figure.
- **`docs/claims.md`**, the claims register: every landing figure with the words it is shown in, its source and link, the note that checked it, its key and the date. `prove-journey` fails if a landing figure is missing from it, if a registered link differs, or if a quoted clause is not word for word in its note.
- Kept green: a section guide for Learn (20 sections) and updated guides for Home, the Studio steps, Upload and How it works; the lecturer guide regenerated; the Evaluation table at 179 checks in sixteen suites; the integrity smoke reaches Learn from the rail and checks its sentence; the tour opens the record from How it works.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed |
| `npm run prove:all` | 179 passed, 0 failed, sixteen suites. `prove-journey` adds Learn matched to the taught version (the default, an explicit choice, another course's version refused, unmatched files not counted, the backup guard, n of N) and replaces the landing test with the claims register check |
| `npm run build` | Passed |
| `npm run smoke:integrity` | 2 of 2 passed: the public landing page (no synthetic figures, limits stated, no notice) and eleven signed-in screens including Learn, notice only on sandbox screens, zero page errors |
| `npm run smoke`, `smoke:workspace`, `smoke:curriculum` | 15 of 15, 7 of 7 and 6 of 6 passed |
| `node scripts/check-backup-migration.mjs` | BACKUP MIGRATION OK |
| `node scripts/generate-guide.mjs --check`, `contrast-check.mjs`, `gen-theme-css.mjs --check`, `gen-mascots.mjs --check` | Match; CONTRAST CHECK OK; outputs current |
| `node scripts/dash-scan.mjs` | No en or em dash in 231 text files |

A visual pass on the built app (the landing sections, Home, Course, Update, Teach, Learn before and after filing the sample results, History, How it works at 1440 and 900 px, and Learn, Teach and How it works at 390 px) found three faults, fixed before the checks: the ring ran through the station labels (each station now has an opaque backing, so the ring reads as links between stations), a seeded outcome without a label showed as "removed" on a session card, and the filing toast still spoke of the sandbox cohort. The captures were review aids and are not committed.

Not done in A2b, by design: the term recap and the milestones of Section 8; Track B's Learn (adequacy, intervals, pooling, perception beside attainment, scored predictions); focus moving to the main heading on every route change (Section 5.2, an A4 or Track B accessibility item); the tour in the loop's order (A4).

Accepted by: the Code lane (owner to sign).

## A4, demo and checks: 22 October 2026

What was built:

- **The self-driving tour follows the loop** (`src/demo/script.ts`, 91 steps, about 6 minutes at full speed): Course (CS310 as it stands); Watch (Stripe's public board on Greenhouse fetched live through the local API, the dated saved sample only if the network fails, postings kept); Report (scan and confirm, a rejected paraphrase, the reviewed denominator, the count, a frozen snapshot, one mapping, the brief with its slides, sent to Dr Rahman); Decide (Dr Rahman reads the brief on Home and records adopt with a reason); Update (Dr Sobri opens the decision from his Home, then makes the revision within the hours, the reason quoting the decision); Teach (a session and its teaching pack); Learn (the sample results filed against the version taught, with n of N); How it works with the record; and Home with the ring closed for the term. The template assessment left the tour (docs/decisions.md). The door joins when A5 ships it.
- **The demo smoke asserts the loop**: postings kept, quotations confirmed, the reviewed denominator, the snapshot, the mapping, the brief sent and read, Dr Rahman's decision with a reason bound to the brief and the course version, the event log in order (brief prepared, sent, read, decision, then the adoption), the revision adopted after the decision, the session saved on the adopted version, the results matched to the version taught, both decks downloaded, the closed ring on Home, and no page errors.
- **The walk** (`scripts/walk.mjs`, run by hand) visits every screen and every loop step through the rail at its own address and files the sample results from Learn; it refreshed the six captures the repository tracks.
- The intro card describes the loop; the landing page's tour buttons state the length the script computes ("about 6 minutes"), registered in `docs/claims.md` and checked by `prove-journey`; the upload review rounds the spread to two places.
- The four smokes were already on the new routes from A2a and A2b; the section guides and the lecturer guide were already regenerated for the new screens, and the Evaluation table already shows the 179 checks, which A4 does not change.

| Command | Result |
|:--|:--|
| `npm run build` | Passed |
| `npm run smoke` | 19 of 19 passed (listed above) |
| `npm run smoke:integrity` | 2 of 2 passed |
| `npm run smoke:workspace` | 7 of 7 passed |
| `npm run smoke:curriculum` | 6 of 6 passed, including Dr Rahman's retain decision with its reason and the brief deck, teaching pack, outline and evidence report downloads |
| `node scripts/generate-guide.mjs --check` | Matches |
| `node scripts/walk.mjs` | WALK OK, 21 checks |
| `npm run typecheck`, `npm run prove:all` | Passed; 179 passed, 0 failed, sixteen suites |
| Contrast check, dash scan, backup migration | CONTRAST CHECK OK; no en or em dash in 231 text files; BACKUP MIGRATION OK |

Not done in A4, by design: the door step of the tour (A5); `docs/demo-script.md`, the booth checklist of Section 15 (A8); the README's screenshot captions (A8).

Accepted by: the Code lane (owner to sign).

## A5, the local door: 22 October 2026

What was built:

- **`mcp/`, a stdio MCP server** on the official TypeScript SDK (`@modelcontextprotocol/sdk` 1.32.1, with zod 4.6.7, its required peer). It reads the workspace backup named by `LYCEUM_WORKSPACE`, validates it with `parseWorkspaceBackup` exactly as the app's restore does, reads it again on every call, and offers six tools: `lyceum_courses`, `lyceum_sources`, `lyceum_evidence_report`, `lyceum_course_outline` and `lyceum_brief_draft`, annotated read-only, and `lyceum_teaching_pack`, which writes the app's own deterministic deck to a new absolute .pptx path and never overwrites. Every reply starts with the export time; every call is logged to stderr with the host, the tool, its arguments and the record ids it touched. No tool confirms, reviews, decides, adopts or sends. `npm run mcp` starts it.
- **`mcp/sample-workspace.json`**, the tour's end state on CS310 built by `node mcp/sample.ts` through the same store actions from `public/demo` (the dated Stripe sample and the sample results, read by the browser's own offline interpretation), identical on every run; `--check` reports a stale file. The door works offline from it.
- **`mcp/try.ts`**, a real stdio session: it spawns the server and speaks MCP to it with the SDK's client, as a desktop host does. Its run is quoted in docs/doors.md.
- **`skills/lyceum/SKILL.md`** under the Agent Skills specification: the loop, the labels, what the assistant may and must not say, and when to call each tool.
- **`docs/doors.md`**: the tools, the trust boundary, the one-dataset rule before a demo, the Claude Desktop and Claude Code configuration, the stdio transcript, the steps for the manual Claude Desktop run, and the sentence "Remote access and OAuth are planned."
- **Corrected on the way:** the exported evidence report said "Nothing was collected from the web" even when postings had been collected on request; it now names its sources (the A2a fix had reached the screen but not the report). The landing page's doors strip now says what exists: the MCP door "Local, read-only", the skill "Written", the rest Planned. The Evaluation suites live in `src/data/suites.ts`, and a proof ties the landing's check count to their total.

| Command | Result |
|:--|:--|
| `npm run typecheck` | Passed (the typecheck now includes `mcp/`) |
| `node --test src/prove-mcp.ts` | 5 of 5 passed: the sample is current and validates; six tools, five annotated read-only; each read tool answers with its receipts, the export time and the right scope; the pack is the app's deck and is never overwritten, nor written to a relative path, a wrong extension or a missing folder; the workspace file is untouched; unknown courses, tampered and missing exports are refused; one log line per call with the host and the records |
| `node mcp/try.ts` | Connected over stdio to lyceum 3.0.0; six tools listed with their annotations; CS310's evidence report returned (9 reviewed postings, each share with its interval) |
| `node mcp/sample.ts --check` | The sample workspace matches the tour's end state |
| `npm run prove:all` | 184 passed, 0 failed, seventeen suites |
| `npm run build` | Passed |
| `npm run smoke:integrity`, `smoke`, `smoke:workspace`, `smoke:curriculum` | 2 of 2, 19 of 19, 7 of 7 and 6 of 6 passed |
| Guide check, contrast check, dash scan, backup migration | Matches; CONTRAST CHECK OK; no en or em dash in 239 text files (the sample workspace's verbatim postings are exempt, as the saved sample is); BACKUP MIGRATION OK |

`npm install` reported eight advisories in the production dependencies (xlsx with no fix, pptxgenjs and image-size whose fix is a major version, tar and node-pre-gyp, brace-expansion, hono, ip-address); no version was changed in Track A (docs/decisions.md).

Not done in A5, by design: the recorded Claude Desktop run (on the owner's list in docs/run-log.md, steps in docs/doors.md); remote access, OAuth and the other doors (Track B).

Accepted by: the Code lane (owner to sign).
