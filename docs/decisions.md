# Decisions made during the Track A run

The choices the autonomous Track A run made on its own, as docs/lyceum-upgrade-plan.md Section 17.5 allows, in the fixed shape that section gives, so the owner can reverse any of them later. It continues [DECISIONS.md](../DECISIONS.md), which keeps the dated history up to 22 October 2026. Times are Kuala Lumpur time.

## 2026-10-22 03:28, A0: how to resolve the DECISIONS.md conflict when taking feature/evidence-snapshots

Options: (a) keep both entries, the 22 October plan entry first and the branch's 21 October Watch entry after it, so the log stays newest first. (b) Keep only the branch's entry and move the plan entry to docs/decisions.md, which splits the dated history across two files on day one. (c) Keep only ours and drop the teammate's record, which loses the reasons behind the snapshot rules.

Chosen: (a), because both entries are true records of different days and the file is already ordered newest first. Nothing in either entry contradicts the other.

Reverse it if: the owner wants DECISIONS.md frozen at the 22 October entry with everything later in this file.

To reverse: move the "21 October 2026: the Watch step" section from DECISIONS.md into this file.

## 2026-10-22 03:30, A0: where the backup migration check lives

Options: (a) a scratch script outside the repository, run once, which leaves the as-built table citing a command nobody can run again. (b) `scripts/check-backup-migration.mjs` in the repository, run by hand, which adds one file but no product change. (c) A new test in `src/prove-snapshots.ts`, which edits the teammate's suite inside a package whose rule is to fix only what the checks reveal.

Chosen: (b), because the verification table should name commands that can be run again, and the A0 rule forbids changes beyond what the checks reveal. The script drives the real store: it collects the saved sample, reviews it, freezes a snapshot, then restores a schema 4 and a schema 3 backup through restoreWorkspaceBackup.

Reverse it if: the owner wants every check inside prove:all.

To reverse: move the script's assertions into `src/prove-snapshots.ts` and delete `scripts/check-backup-migration.mjs`.

## 2026-10-22 03:36, A0: the em dashes inside the saved sample of real postings

Options: (a) replace them with commas, which keeps the house rule literally but edits a real employer's text, breaks its recorded fingerprint and makes the sample no longer what Stripe published. (b) Keep the posting text verbatim and have the dash scan skip `public/demo/collected-sample.json`, which leaves five em dashes from one Stripe posting in a data file. (c) Drop that posting from the sample, which changes the demo's denominator and every count built on it.

Chosen: (b), because a receipt is only worth something if the source text is exactly what the employer published, and the house rule governs the team's own writing, not quoted evidence. The scan still covers every other text file, including the app's own strings.

Reverse it if: the owner decides quoted evidence must also be dash free on screen, in which case the source pane should render the dash as a comma at display time rather than editing the record.

To reverse: remove the VERBATIM_EVIDENCE entry in `scripts/dash-scan.mjs`; for display-time replacement, change the source pane in `src/ui/screens/`.

## 2026-10-22 03:52, A1: how the three faces are bundled

Options: (a) import the Fontsource CSS through Vite, which hashes the files into dist but ships every subset and leaves no stable path for Remotion, the deck or a preload link. (b) Copy the Latin variable woff2 files and their licences into `public/fonts/` from the Fontsource packages with `scripts/gen-theme-css.mjs`, and generate the `@font-face` rules and two preload links from `tokens.ts`. (c) Commit hand-downloaded font files, which loses the link to a versioned package.

Chosen: (b), because one set of files then serves the app, the Puppeteer renderers, the deck and the film, and the preload links can name stable paths. The packages stay dev dependencies at 5.3.0, so `gen-theme-css.mjs --check` notices a font that changes on upgrade.

Reverse it if: the size of three variable faces (about 109 kB) matters more than one shared source.

To reverse: `scripts/gen-theme-css.mjs`, `src/theme/tokens.ts` (fontFiles), `index.html`, `public/fonts/`.

## 2026-10-22 03:54, A1: what happens to the old theme variable names

Options: (a) keep the old names (--accent, --surface, --ok) as aliases of the new tokens, which is quick but keeps one name for two jobs, emerald fill and emerald text. (b) Move every use to the plan's token names, splitting --accent and --ok by context: text and icons become --emerald-text, fills become --emerald, the focus outline becomes --focus-light. (c) Rewrite every screen's styles now, which belongs to A2a and A2b.

Chosen: (b), because the audit's main finding is that emerald as small text fails on mint, so the split has to be explicit at each use. The old --ink-3 (a lighter grey) became --ink-2, since the poster has no text colour lighter than #4E6258 and the new --ink-3 is darker, for small text on tinted cards.

Reverse it if: a later screen needs the old two-level grey hierarchy back; that would need a new token and an audit row first.

To reverse: no aliases exist; a reversal means adding names to `src/theme/tokens.ts` and the generator.

## 2026-10-22 03:58, A1: the font the generated PowerPoint files name

Options: (a) name Bricolage Grotesque and Plus Jakarta Sans, which matches the brand but renders in a substitute on any machine without them, since pptxgenjs cannot embed fonts. (b) Name Calibri, which every PowerPoint has, with the colours from the tokens. (c) Render text as images, which makes the pack uneditable.

Chosen: (b), because the teaching pack and the brief deck are editable files a lecturer opens on their own machine. The Georgia serif titles went with the rest of the old palette.

Reverse it if: the university's template names other fonts, or the deck pipeline (A6) moves these decks to slide images.

To reverse: the FACE constant in `src/lib/slides.ts`.

## 2026-10-22 04:00, A1: the colours inside the stand-in lecturer slide file

Options: (a) recolour the OOXML theme in `scripts/gen-demo-files.mjs` with Lyceum tokens, which makes a file that stands for a lecturer's own PowerPoint look like Lyceum's. (b) Keep Office's default theme there and have the contrast check skip that one generator. (c) Remove the theme part, which risks an invalid file.

Chosen: (b), because the sample stands for a file the lecturer brings, so it should look like an ordinary Office file. Every other script and source file is scanned.

Reverse it if: the sample files are ever shown as Lyceum output.

To reverse: the SKIP list in `scripts/contrast-check.mjs`.

## 2026-10-22 04:02, A1: the 9 October architecture diagram in the old palette

Options: (a) leave `docs/presentation/architecture.html` and `.png` in place, which keeps 16 old hex values in a hand-written file the check must then exempt. (b) Move both to `docs/history/presentation/` with the date in the name and fix the one link, as was done for the other old-palette documents. (c) Delete them.

Chosen: (b), because A6 generates the replacement from the tokens and the history folder already holds superseded presentation material. The 9 October report's link was updated.

Reverse it if: the owner wants the old diagram in the deck before A6's version exists.

To reverse: move the two files back and restore the line in `docs/lyceum-v3-as-built-2026-10-09.md`.

## 2026-10-22 04:05, A1: the floating Play demo button once signed in

Options: (a) keep it floating on the Guide page, where it now covers the "All roles" filter and can hide a focused control (WCAG 2.4.11). (b) Move it into the Guide page's header as an inline "Play the demo tour" button and keep the floating pill only on the signed-out screens. (c) Move the Guide page's filters, which leaves the overlap waiting for the next layout change.

Chosen: (b), because a fixed control over working content is a defect wherever it lands, and the signed-out pill is still where the demo smoke and the presentation shots click it. The inline button fires the same event, so the reset warning is unchanged.

Reverse it if: the owner wants the demo one click away on every signed-in screen.

To reverse: the idle guard in `src/demo/DemoOverlay.tsx` and the PageHead actions in `src/ui/screens/Guide.tsx`.

## 2026-10-22 04:07, A1: how the loop rail is wired before the step screens exist

Options: (a) wait for A2a and A2b to build the step screens before adding the rail. (b) Add the rail now with a `courseStep` field in the store, hash routes `#/course/:id/<step>`, and each step mapped onto today's Studio tab or the Upload screen, keeping the Studio tabs that the workspace smoke drives by keyboard. (c) Replace the Studio tabs with the rail now and update the smokes in the same package.

Chosen: (b), because the A1 prompt asks for the rail wired to the existing screens, and keeping the tabs keeps every smoke green while A2a splits Evidence into Watch and Report. Watch, Report and Decide all open the Evidence tab until then; the rail remembers which one was chosen, and the step a tab belongs to is derived when code sets the tab directly.

Reverse it if: the tabs and the rail together confuse a tester before A2a lands.

To reverse: `src/app/loop.ts`, `src/app/routes.ts`, `navigate` and `openStep` in `src/app/store.ts`, `src/App.tsx`, `src/ui/shell/LoopRail.tsx`.

## 2026-10-22 04:09, A1: the narrow-screen navigation

Options: (a) build Section 5.2's bottom bar (Home, Courses, Course, Explore, More) and the rail as a horizontal scroller now. (b) Keep the existing "Toggle navigation" sidebar on narrow screens, with the rail inside it, and decide the bottom bar when A2b restyles Home and the course header. (c) Hide the rail on phones.

Chosen: (b), because no A package prompt names the bottom bar, and the workspace and curriculum smokes drive the toggle at 390 and 320 px. The rail is usable inside the toggled sidebar, and the 320 px reflow checks pass.

Reverse it if: the Sunday QA on phones finds the toggled sidebar too long.

To reverse: `src/ui/shell/Shell.tsx` and the 760 px block in `src/theme/global.css`.

## 2026-10-22 04:11, A1: putting the leftover sizes on the type scale

Options: (a) leave the 106 inline sizes between 11 and 52 px as they were, which breaks the "one type scale" rule on most sandbox screens. (b) Move each to the nearest step of Section 6.3 (11 to 12.5 become 13; 13.5 and 14.5 become 14; 15 to 16.5 become 16; 17 becomes 18; 20 becomes 22; 26 becomes 28; 40 becomes 36; 44 and 52 become 48), with counts in mono 12. (c) Rewrite each screen's typography by hand.

Chosen: (b), because it applies the rule everywhere at once and never goes below the 13 px body minimum or the 12 px mono minimum. The wordmark moved to 28 px, the smallest display size.

Reverse it if: a dense sandbox table needs the old 12.5 px size to fit at 320 px.

To reverse: the inline `fontSize` values in the fifteen files the A1 commit touches.

## 2026-10-22 04:12, A1: the default type of the Button primitive

Options: (a) leave it unset, so any Button inside a form submits it by default. (b) Default to `type="button"` and require `type="submit"` where a form submits, which every form already states.

Chosen: (b), because a Cancel or Remove inside a form should never submit it, and all five forms already mark their submit buttons. Nothing that submitted before stops submitting.

Reverse it if: a new form relies on implicit submission.

To reverse: the Button primitive in `src/ui/primitives/index.tsx`.

## 2026-10-22 04:13, A1: "Guide & progress" in the sidebar

Options: (a) rename it now to the plan's "Guide and progress", leaving the generated lecturer guide on the old name until A4. (b) Keep the label until A4 regenerates the section guides and the lecturer guide, then rename everywhere at once.

Chosen: (b), because one consistent name for three days is better than two names. A4 owns the regeneration.

Reverse it if: A4 does not run before the freeze.

To reverse: `src/ui/shell/nav.ts`, `src/ui/screens/Inbox.tsx`, `src/ui/screens/Guide.tsx`, `scripts/generate-guide.mjs`.

## 2026-10-22 04:18, A3: the host's working name

Options: (a) Sage: plain English and wise, but a common product name (an accounting company among them) and the plant is a herb, not a tree. (b) Tualang: the giant tree of the Malaysian rainforest, a local root with an international sound, and literally a tree. (c) Ring: the loop itself, but "Ring holds the ring" is confusing out loud and the word already names the receipts ring.

Chosen: (b), because the host is a young tree and the name gives the team a one-line origin story at the booth. It is a working name the plan leaves to the team, so it lives in one constant.

Reverse it if: the team prefers another name, or a judge or teammate finds it hard to say.

To reverse: `HOST_NAME` in `src/ui/mascots/host.tsx`; file names stay `host.*` so nothing else moves.

## 2026-10-22 04:19, A3: the host's file name once the name is chosen

Options: (a) rename `host.tsx` to `tualang.tsx` as Section 7.4 suggests, which renames again if the team changes the working name. (b) Keep `host.tsx`, the `host-*` image names and the `host` role id, with the name in `HOST_NAME`.

Chosen: (b), because the role is stable and the name is not yet settled; a rename then touches one line. Every generated file keeps its path.

Reverse it if: the team settles the name for good.

To reverse: rename the file, the role id in `src/ui/mascots/index.tsx` and the outputs of `scripts/gen-mascots.mjs`.

## 2026-10-22 04:21, A3: how the same components render outside the browser

Options: (a) write the characters with `createElement` in `.ts` files so Node can import them, which keeps no JSX as Section 7.4 asks. (b) Keep them as TSX and load them in Node through Vite's SSR loader (`ssrLoadModule`), with React from Node, then `renderToStaticMarkup`. (c) Bundle them with esbuild, a transitive dependency the plan does not name.

Chosen: (b), because it uses the declared Vite dependency and renders exactly the modules the app ships. The deck (A6) and the film (A7) can use the same loader or import the TSX directly.

Reverse it if: the SSR loader proves slow or fragile on another machine.

To reverse: `scripts/gen-mascots.mjs`.

## 2026-10-22 04:23, A3: where "a request in flight" comes from

Options: (a) derive it inside the moods from existing records (the research run's status, the agent runs), which lets a mood read state that is not a request. (b) A session-only `requests` list in the store, filled by `beginRequest`, `endRequest` and `trackRequest` around the real work: the fetch, the file parse and the pack render; the moods take that list as an argument. (c) Track nothing and never show "working".

Chosen: (b), because the plan asks for a pure function of the state and the in-flight request list, and the proof can then assert that nothing works without an entry. Model streaming (the old agent runs) is not one of the seven helpers' requests, so it moves no mood.

Reverse it if: a new long request appears (for example a remote door call), in which case it registers the same way.

To reverse: `requests` and the three actions in `src/app/store.ts`, `downloadPack`, the parse in `src/ui/screens/Upload.tsx`, `src/app/moods.ts`.

## 2026-10-22 04:25, A3: the two-tone shading

Options: (a) a hand-drawn dark region per body, which drifted across the face on the first drawing and looked heavy. (b) The dark side as a rim: the body minus itself shifted up and left, through an SVG mask, the same for every character. (c) Flat single colours, which loses the poster's two-tone look.

Chosen: (b), because it keeps one rule for the whole family and never crosses a face. Masks use luminance, so no colour enters the drawing outside the tokens.

Reverse it if: a renderer the film or deck uses does not support SVG masks.

To reverse: `TwoTone` in `src/ui/mascots/parts.tsx`.

## 2026-10-22 04:27, A3: the colours of each character

Options: (a) give every helper an emerald body, which fails the eyes: forest ink on emerald is 2.96. (b) Light or mid bodies under every face (the host ray3 and ray2, Folio tint2 with an emerald spine, Scout ray2 and emerald with a forest cap, Atlas white, Lens a forest rim with white glass, Quill on-forest grey green, Prism tint1, Steward mint), lime once per helper as the prop accent, and the rays only on Prism.

Chosen: (b), because the eyes are the character and must hold their contrast, and the plan reserves lime for one accent per character. The host's celebration glows a ring in ray3, not lime, because its one lime element is the leaf.

Reverse it if: the team's concept sheets choose other colours; the components take colours from the tokens, so a change is a few lines per file.

To reverse: the files in `src/ui/mascots/`.

## 2026-10-22 04:29, A3: committing the generated images

Options: (a) commit the 72 PNGs and 35 SVGs in `public/brand/` (3.9 MB), so the deck, the poster and the printer have them without running a script. (b) Ignore them in git and regenerate on demand, which saves space but makes A6 and the printer depend on Chrome on the machine at the time.

Chosen: (a), because the acceptance test is that the files exist, and the poster goes to the printer on Sunday. `gen-mascots.mjs --check` and the contrast check catch drift and any non-token colour.

Reverse it if: the repository size matters more, for example before publishing to the team repository.

To reverse: add `public/brand/mascots/*.png` to `.gitignore` and run the generator in the build.

## 2026-10-22 04:30, A3: what "stuck" can mean today

Options: (a) record every failed check and failed parse as a record so each helper can be stuck. (b) Derive "stuck" only where a failure is already a record (a failed research run), and let the error card speak elsewhere, since a failed revision check or parse is already shown as an error and leaves no record.

Chosen: (b), because "stuck" shows no mascot anyway, so the visible result is the same: the error card with the cause, the fix and a retry. Adding failure records would change the store for no visible gain.

Reverse it if: a later screen needs to know a helper failed after the error card is dismissed.

To reverse: `src/app/moods.ts` and the actions that fail.

## 2026-10-22 04:31, A3: how long "done" lasts

Options: (a) one second, which a viewer can miss. (b) Four seconds after the record was saved, then rest, with the hook re-rendering once when the window ends. (c) Until the next action, which leaves characters excited indefinitely.

Chosen: (b), because Section 7.2 says "in the last few seconds" and the spring itself lasts 0.72 s. In demo mode the clock is pinned, so recordings stay identical.

Reverse it if: the film's pacing needs a longer hold.

To reverse: `DONE_WINDOW_MS` in `src/app/moods.ts`.

## 2026-10-22 04:32, A3: the mark beside the wordmark

Options: (a) the wordmark alone in the header, as in A1. (b) The one-colour mark in white with the lime leaf beside the wordmark in the header and on the landing bar, as the poster lockup in Section 7.1 describes. (c) The tile (favicon) in the header, which boxes the mark twice on a forest band.

Chosen: (b), because the mark then appears where the product is named, and lime stays on forest. The mark is hidden from assistive technology there; the button's name says "Lyceum".

Reverse it if: the header feels crowded at 320 px.

To reverse: `src/ui/shell/Shell.tsx`, `src/ui/screens/Landing.tsx`, the `leaf` option in `src/ui/mascots/mark.tsx`.

## 2026-10-22 04:45, A2a: what "this term" means for the ring

Options: (a) match term strings: a decision, an adopted version, a teaching plan and a results file count when their term text equals the current term, which fails whenever a lecturer writes "2026-S2" in one place and "September 2026" in another. (b) A term window by time: the current term is the teaching plan's term (or, if none, the latest adopted version's effective term), and the window restarts only when that term changes from one stated value to a different one, an event the log records; records saved inside the window count, records before it stay in the history. (c) Ignore terms until Track B.

Chosen: (b), because it scopes the loop per term as Section 4 requires without trusting free-text terms to match, and a loop closed last term can never certify the new one. Setting a term for the first time does not restart the window, so earlier work this term is kept.

Reverse it if: the pilot institution has a term calendar Lyceum can read, which would give exact term boundaries.

To reverse: `termWindow` in `src/app/loop.ts` and the "term-set" event in `src/app/store.ts`.

## 2026-10-22 04:46, A2a: who holds "decide" and "adopt" before positions exist as data

Options: (a) wait for Track B's positions and institution profile. (b) Map today's records onto the two capabilities, as Section 4.2 says: the coordinator hat gives both; the lecturer hat gives neither; the department tier (Dr Rahman, the programme owner) gives "decide" on every course; management gives neither, since the old approval chain is in the sandbox; and the creator of a personal course workspace holds both, because they own that outline alone. (c) Give every lecturer both, which defeats the separation rule.

Chosen: (b), because it needs no data migration before Amsterdam and keeps the separation rule meaningful. The personal-workspace rule keeps a lecturer's own course usable; such a course is single-owner, so its Decide closes on the author's own decision and the ring says so in words.

Reverse it if: the owner wants personal workspaces to need a second person too, or Track B's profile arrives.

To reverse: `mayDecide` and `mayAdopt` in `src/app/store.ts`, `can` in `src/app/roles.ts`, the single-owner rule in `src/app/loop.ts`.

## 2026-10-22 05:40, A2a: when an adoption counts as this term's Update

Options: (a) any revision adopted inside the term window counts, which marks Update done for a new course's first outline, or for a revision adopted before anyone decided, so the ring could tick Update before Decide. (b) An adoption counts only under an adopt decision that governs the latest brief, and only from that decision's time on; retain completes Update with "no change this term" and never counts an adoption. (c) Tie each adoption to a decision id in the record.

Chosen: (b), because Section 4 asks Update to show "the approved change", and the plan's order (Decide, then Update) should be what the ring reads. It needs no new field; (c) can come with Track B's positions if a course ever needs two adoptions per decision told apart. If a version is adopted after a retain decision anyway, Update stays complete but says "1 version adopted after a retain decision" and asks for a new decision, never "no change this term". When the adoption and the decision carry the same time (the pinned demo clock), the event log's order decides which came first.

Reverse it if: lecturers routinely adopt first and record the decision afterwards, and the owner prefers the ring to accept that order.

To reverse: the `adoptions` line in `loopState` in `src/app/loop.ts`, and the proofs in `src/prove-journey.ts`.

## 2026-10-22 05:40, A2a: order between records saved at the same moment

Options: (a) order decisions and briefs by their time alone, which leaves two records at the same time unordered; the demo and the proofs run on a pinned clock, so a second brief would not supersede the first and a person's amendment might not be their standing decision. (b) Break a tie by the order the records were saved, which the append-only arrays keep (and a backup restores in order). (c) Add a sequence number to every record.

Chosen: (b), because the arrays are already append-only and in order, so the tie-break is exact without a schema change. A real clock almost never ties, and when it does the save order is the truth.

Reverse it if: records ever arrive from more than one device, where save order and time order can disagree; then (c).

To reverse: `inOrder` in `src/lib/decisions.ts`.

## 2026-10-22 05:40, A2a: the Learn step and the time a results file is filed

Options: (a) keep the fixed seed time on a filed results file, so a file filed after a change of term would fall before the new window and Learn could never be done again. (b) Stamp the file with the store's clock when it is filed (the pinned seed time in the demo and the proofs, the real time otherwise), and count it in this term's window; matching the file to the taught course version, the other half of the Section 4 rule, lands with the Learn screen in A2b. (c) Build the version match now.

Chosen: (b), because it makes the done rule work across terms with a one-line change, and A2b's prompt already rebuilds Learn on the existing upload pipeline, where the version match belongs. Seeded results files still never count.

Reverse it if: A2b finds the upload pipeline cannot carry the course version, in which case Learn's rule is restated in the plan with the owner.

To reverse: `uploadResults` in `src/app/store.ts` and the learn line in `src/app/loop.ts`.

## 2026-10-22 05:40, A2a: a decision made before any term is stated

Options: (a) borrow the seed's survey term ("2025-S1") or today's date as the term, which would print a term nobody chose. (b) Record the term as it stands, empty when neither the teaching plan nor an adopted version names one, and show "term not set" on the record; a later amendment carries the term stated by then. (c) Refuse a decision until a term is stated.

Chosen: (b), because a record should say what was true when it was made, and (c) would block Decide on a step (Teach) that comes later in the loop.

Reverse it if: the institution profile in Track B supplies the current term, which would fill it for every course.

To reverse: `recordDecision` in `src/app/store.ts` (the `term` field) and `termWindow` in `src/app/loop.ts`.

## 2026-10-22 05:40, A2a: removing a snapshot that a brief has cited (A0 follow-up 5)

Options: (a) require a reason before a cited snapshot is removed. (b) Keep removal as it is: the brief keeps its own text of what changed since the snapshot (it is written into the brief when prepared), and the append-only event log keeps the "snapshot frozen" line, which then says the snapshot was later removed. (c) Forbid removal once a brief cites it.

Chosen: (b), because the record cannot be erased either way: the brief and the event both survive, and the timeline says the snapshot was removed. A reason prompt adds a step for a rare action without protecting anything more.

Reverse it if: a reviewer reads a removed snapshot as hidden evidence; then (a), with the reason on the event.

To reverse: `removeEvidenceSnapshot` in `src/app/store.ts`, the snapshot line in `src/app/runs.ts`, and the relaxed snapshot check in `src/lib/workspaceBackup.ts`.

## 2026-10-22 05:40, A2a: the Course step's address

Options: (a) keep `#/course/:id/course`, which the A1 routes generated. (b) Use `#/course/:id` for the Course step, as the Section 4 table gives it, and keep parsing the long form so an old link still opens the course.

Chosen: (b), because the plan names that address and the course is the setup the six steps hang from. Nothing is lost: both forms open the same step.

Reverse it if: an analytics or sharing tool needs every step to have a segment of its own.

To reverse: `hashFor` in `src/app/routes.ts` and the route proof in `src/prove-journey.ts`.

## 2026-10-22 05:40, A2a: open editors when moving between Course, Update, Teach and History

Options: (a) render only the step in view, which unmounts an editor with unsaved work when the lecturer moves from Update to Teach and loses it without a warning. (b) Keep the four Studio steps mounted and hide the ones not in view, as the old tabs did, so an open editor survives a step change; leaving for Watch, Report, Decide or another page still asks first.

Chosen: (b), because it keeps the promise in `src/app/unsaved.ts` and the guide ("moving between Course, Update, Teach and History preserves an open editor") at the cost of rendering four panels.

Reverse it if: rendering the hidden panels slows the Studio on a large course; then (a) with the editors' drafts kept in the store.

To reverse: the `step-view` wrappers in `src/ui/screens/Studio.tsx`.

## 2026-10-22 05:40, A2a: the guides, the smokes and the tour in this package

Options: (a) leave the section guides, the workspace and curriculum smokes, the presentation shots and the tour for A4, which rewrites them, and let those checks fail in between. (b) Update each one now only as far as the new screens need: a guide for Watch, Report, Decide and the sandbox proposal (the teaching proof requires a guide for every navigation section), the smokes moved onto the rail and the sub-rail, and the tour's targets remapped in its old order with the snapshot freeze added (A0 follow-up 3).

Chosen: (b), because every check stays green between packages and A4 still owns the tour's new order (Course, Watch, Report, Decide by Dr Rahman, Update, Teach, Learn). The tour runner now treats a disclosure's summary as interactive, so a step can open one.

Reverse it if: never; A4 builds on it.

To reverse: `src/app/sectionGuides.ts`, `scripts/generate-guide.mjs`, `scripts/workspace-smoke.mjs`, `scripts/curriculum-smoke.mjs`, `scripts/presentation-shots.mjs`, `src/demo/script.ts`, `src/demo/runner.ts`.

## 2026-10-22 06:12, A2b: where Learn lives

Options: (a) restyle the Upload screen into Learn, which mixes syllabus and slide intake into the loop's last step. (b) Give Learn its own screen (`#/course/:id/learn`) with what came back, the filing of results and surveys, the list of what is filed, the planned items and the protocol status, reusing Upload's intake panel; Upload stays the generic document intake reached from Course. (c) Show Learn inside the Data room.

Chosen: (b), because Section 4 gives Learn its own address and one question, and the intake's preview-and-confirm boundary is kept unchanged by reusing the same panel. The integrity smoke now reaches Learn from the rail.

Reverse it if: lecturers look for results under Upload and miss Learn in testing.

To reverse: `src/ui/screens/Learn.tsx`, the `learn` screen in `src/app/roles.ts`, `src/app/routes.ts`, `src/app/loop.ts` and `src/ui/screens/index.ts`, and `IntakePanel` in `src/ui/screens/Upload.tsx`.

## 2026-10-22 06:12, A2b: matching a term's results to the taught version

Options: (a) count any results file filed this term, which leaves the "matched to the taught version" half of the Section 4 rule unmet. (b) Record a `courseVersionId` on each results file, confirmed by the person filing in the review panel and defaulting to the version this term's sessions were saved on (the latest session decides), or the current version when no session exists; Learn counts only files matched to a version of the course, and a backup rejects a file naming another course's version. (c) Match automatically by term text, which free-text terms cannot support.

Chosen: (b), because the person filing knows which version was taught and the default is right in the common case. The field is optional, so backup schema 5 stays as it is and older files restore; an unmatched file is listed and the step says to file it again with the version.

Reverse it if: Track B's term archive records the taught version per cohort, which would make the choice automatic.

To reverse: `taughtVersionId` and the learn rule in `src/app/loop.ts`, `confirmPendingIntake` and `uploadResults` in `src/app/store.ts`, the version field in `src/ui/screens/Upload.tsx`, the check in `src/lib/workspaceBackup.ts`.

## 2026-10-22 06:12, A2b: what N means in "n of N" on Learn

Options: (a) the enrolled class size, which no record in the workspace holds. (b) The most students the results file records for any one outcome, said in words on the screen, with n per outcome beside it. (c) Leave N out.

Chosen: (b), because Section 9.8 asks for n of N from the existing pipeline and the file is the only count there is; the words stop it being read as the class. Track B's adequacy meter brings the enrolment figure and the corrected margin.

Reverse it if: an enrolment number is filed with the results.

To reverse: `attainment` in `src/lib/learn.ts` and the Learn screen's explanation.

## 2026-10-22 06:12, A2b: what goes behind the disclosure on Update

Options: (a) put the rationale, the term and the affected sessions behind a disclosure, as the Section 5.3 table lists, which hides two fields the adoption requires. (b) Keep the rationale and the term visible beside Save and Check, and put the affected sessions and assessments behind the disclosure; open the revision with the hours meters, the number of changes and the check state.

Chosen: (b), because a required field behind a closed disclosure is a form error waiting to happen, and the meters at the top give the before and after the table asks for at a glance. The affected list still sits one click away.

Reverse it if: testers find the revision form too long and want the decision context collapsed after it is filled.

To reverse: `RevisionEditor` and `HoursMeters` in `src/ui/screens/CurriculumWorkspace.tsx`.

## 2026-10-22 06:12, A2b: Home's work queue and notifications

Options: (a) keep them visible below Start here, which dilutes the one visual and the one action. (b) Put the briefs waiting, the notifications and the courses behind disclosures, each opening by itself when something is waiting (a brief to decide, an unread notification), so a waiting item is never hidden. (c) Move them to a separate screen.

Chosen: (b), because Section 5.3 puts them behind a disclosure and the self-opening rule keeps a programme owner's waiting brief in view. The resume button joins Start here as its secondary action.

Reverse it if: a recipient misses a brief in testing.

To reverse: `InboxScreen` and `StartHere` in `src/ui/screens/Inbox.tsx`.

## 2026-10-22 06:12, A2b: the loop graphic's stations

Options: (a) seven stations, one per helper, which leaves Decide with no station. (b) Eight stations in loop order, the seven helpers plus a people station at Decide with the scale icon and no character, Lens labelled "Report and Learn" because it serves both; each station sits on an opaque backing in the surface colour so the ring never crosses text. (c) Draw the ring inside the stations, which needed sizes that collide with the host's caption at some widths.

Chosen: (b), because the plan says people decide at Decide and the helpers never speak for the product, and the backing keeps every label legible on mint and on forest. Below 640 px the ring folds into a two-column list.

Reverse it if: the team wants Lens drawn twice, once at Report and once at Learn.

To reverse: `STATIONS` and `LoopGraphic` in `src/ui/screens/LoopGraphic.tsx`, the loop-graphic rules in `src/theme/global.css`.

## 2026-10-22 06:12, A2b: the landing page's figures and clauses

Options: (a) keep the nine pain figures (three per level) and the ILOSTAT comparators. (b) Show Section 2.4's one figure per level, each registered in the new `docs/claims.md` with its source, its note and its key, and the accreditor mapping with only the clauses a dated note quotes (ESG 1.2 and AACSB Standard 5, named in Section 4, are left out until a note checks their wording; NAAC is marked a paraphrase); a proof checks every figure against the register and every quoted clause word for word against its note. (c) Show the figures without sources until R1.

Chosen: (b), because Section 2.4 and the A2b prompt set one figure per level and the register rule, and a quotation nobody checked would be a fabricated receipt on the product's own front page. The Malaysian figure says "of employed graduates", which the release's numbers imply. The nine figures stay in the research notes for the deck.

Reverse it if: a note checks ESG 1.2 and AACSB Standard 5, or R1's interviews add a quotation per level.

To reverse: `src/data/painStats.ts`, `src/data/accreditors.ts`, `src/data/proof.ts`, `docs/claims.md`, the landing proof in `src/prove-journey.ts`.

## 2026-10-22 06:12, A2b: the doors strip

Options: (a) third-party logos in monochrome (Claude, ChatGPT, Copilot, Gemini, Teams, Moodle), which uses trademarks without permission and reads as endorsement. (b) Neutral Lucide icons with the door's name and what a lecturer does through it, the web workspace tagged Built and every other door tagged Planned, including the MCP server until A5 ships it locally. (c) Leave the doors off until any of them works.

Chosen: (b), because Section 11 makes the doors part of the story while the honesty labels forbid implying they work, and generic marks carry no brand claim. The hero line drops "inside the tools lecturers already use" for the same reason.

Reverse it if: a partner grants logo use, or A5 ships a door, which flips its tag to what it is ("local, read-only").

To reverse: `DOORS` and the hero lead in `src/ui/screens/Landing.tsx`.

## 2026-10-22 06:12, A2b: the narrow-screen bottom bar (deferred from A1)

Options: (a) build Section 5.2's bottom bar with Home, Courses, Course, Explore and More. (b) Keep the toggled sidebar, with the step strip under each step's title (added in A2a) as the in-course navigation on phones. (c) Both.

Chosen: (b), because the step strip already gives the horizontal course navigation Section 5.2 asks for and every smoke drives the toggle at 390 and 320 px without overflow; a bottom bar would add a third navigation for the same five places.

Reverse it if: the Sunday QA on phones finds the sidebar toggle hard to reach one-handed.

To reverse: `src/ui/shell/Shell.tsx`, `LoopStrip` in `src/ui/screens/StepFrame.tsx`, the 760 px block in `src/theme/global.css`.

## 2026-10-22 06:23, A4: what the tour shows, in what order

Options: (a) keep the old storyline (revision first, then evidence, assessment, brief, reader), which tells a different story from the loop the screens now follow. (b) The loop in order, as Section 15's booth path: Course; Watch (the live board, the sample only if the network fails); Report (confirm, reject a paraphrase, review, count, freeze the window, map, brief with slides, send); Decide (Dr Rahman reads the brief on Home and records adopt with a reason); Update (Dr Sobri opens the decision, then makes the revision within the hours, its reason quoting the decision); Teach (a session and its pack); Learn (the sample results filed against the version taught); How it works with the record; and Home with the ring closed. The template assessment leaves the tour; it stays in Teach behind its disclosure. (c) Two tours, short and long.

Chosen: (b), because the A4 prompt and Section 15 set this order, and a tour that closes the ring shows every done rule working on real records. The assessment was the one detour off the loop; dropping it keeps the tour about six minutes.

Reverse it if: judges ask to see the assessment, in which case it goes back after Teach as two steps.

To reverse: `src/demo/script.ts`, the `decision-recorded` wait in `src/demo/runner.ts`, the intro card in `src/demo/DemoOverlay.tsx`, `scripts/demo-smoke.mjs`.

## 2026-10-22 06:23, A4: the tour's stated length

Options: (a) keep "the five-minute tour" on the landing page, which was already wrong (the old script estimated 376 seconds) and would drift with every edit. (b) Compute the minutes from the script's own pacing (`tourMinutes()`, rounded) and say "about 6 minutes"; register the figure in `docs/claims.md`, where a proof checks it equals what the script computes. (c) Say no length.

Chosen: (b), because a figure on the landing page is a claim like any other, and computing it keeps it true when A5 adds the door to the tour. "About" covers a live fetch running a little long.

Reverse it if: the tour is cut to fit an exact slot, which the estimate will then show.

To reverse: `tourMinutes` in `src/demo/script.ts`, the two tour buttons in `src/ui/screens/Landing.tsx`, the `tour-length` row in `docs/claims.md` and its assertion in `src/prove-journey.ts`.

## 2026-10-22 06:23, A4: the walk and its captures

Options: (a) add the walk to `package.json` as a fifth smoke. (b) Keep it a manual run, as it was, updated to visit every screen and every loop step through the rail at its own address and to exercise the intake from Learn; keep the six captures the repository already tracks (three are in the README) refreshed, and delete the rest it writes. (c) Retire the walk.

Chosen: (b), because the four smokes already cover the routes in CI terms and the walk's value is its captures for the README in A8. Tracking only the files the README uses keeps the repository small.

Reverse it if: A8's README wants more captures; the walk writes them on demand.

To reverse: `scripts/walk.mjs`.
