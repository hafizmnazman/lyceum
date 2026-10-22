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

To reverse: move the two files back and restore the line in `docs/history/lyceum-v3-as-built-2026-10-09.md` (moved there in A8).

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

## 2026-10-22 06:37, A5: how the local door is put together

Options: (a) one server file with the tools written inline. (b) The tools as plain functions over a validated export (`mcp/workspace.ts`), the MCP registration and stdio entry in `mcp/server.ts`, the export read again on every call, and each call logged to stderr as one JSON line with the host, the tool, its arguments and the record ids. (c) A long-running server that loads the export once.

Chosen: (b), because the proofs can call the same functions through the protocol without spawning a process, and re-reading means a fresh export from the app is what the door answers from next, which Section 15 needs before the door is shown. Stderr is the channel a stdio host keeps for logs.

Reverse it if: an export grows large enough that reading it per call is slow.

To reverse: `mcp/workspace.ts` and `mcp/server.ts`.

## 2026-10-22 06:37, A5: zod as a direct dependency

Options: (a) rely on whatever zod is hoisted, which is puppeteer's 3.23.8, outside the SDK's required peer range (3.25 or 4). (b) Install zod 4 as a direct dependency, the SDK's required peer, so the schemas the door defines are the version the SDK validates with. (c) Describe the inputs as raw JSON Schema, which this SDK version does not accept for `registerTool`.

Chosen: (b), because the plan names the official SDK and zod is its non-optional peer; npm deduplicates it with the SDK's own copy, and puppeteer keeps its nested 3.23.8.

Reverse it if: a later SDK drops the zod peer.

To reverse: `package.json` and `mcp/server.ts`.

## 2026-10-22 06:37, A5: what the brief draft and the pack tool may claim and touch

Options: (a) let the brief draft name a person as its preparer, and let the pack tool write anywhere, overwriting. (b) The draft's preparer is a label, "the local door, as a draft for a lecturer to review", under a first line saying it is a draft that decides nothing; the pack tool takes only an absolute path ending in .pptx in an existing folder, refuses an existing file, and stamps the deck with the export time so the same export gives the same deck. (c) Leave both tools out.

Chosen: (b), because Section 11.3 says drafting tools return drafts and no tool sends a brief, and a door that can overwrite a file is a door that can destroy one. The pack is the app's own deck, so the two never disagree.

Reverse it if: a pilot host needs the pack returned as a resource instead of a file.

To reverse: `briefDraftText` and `writeTeachingPack` in `mcp/workspace.ts`.

## 2026-10-22 06:37, A5: the sample workspace in the repository

Options: (a) require an export from the app for every run of the door and its proofs. (b) Commit `mcp/sample-workspace.json`, the tour's end state built by `node mcp/sample.ts` through the same store actions, from the dated sample of the Stripe board and the sample results in `public/demo`, on the pinned clock so it is identical every run; `--check` and the proof fail when it is stale. (c) Build it on the fly in every proof only.

Chosen: (b), because the door then works offline at the booth and in a fresh clone, and the staleness check caught a real change in this package (the report's scope line). Its timestamps are the seed clock's, which docs/doors.md says.

Reverse it if: the file's size (about 310 kB) becomes a problem in the repository.

To reverse: `mcp/sample.ts`, `mcp/sample-workspace.json`, the first test in `src/prove-mcp.ts`.

## 2026-10-22 06:37, A5: the manual Claude Desktop run

Options: (a) edit the owner's Claude Desktop configuration from this session, which changes a file outside the repository and needs the desktop app and account. (b) Record a real stdio session instead, the server spawned and spoken to with the official SDK's client exactly as a desktop host does (`mcp/try.ts`, its output in docs/doors.md), and put the Claude Desktop run on the owner's list with the steps. (c) Skip the run.

Chosen: (b), because the protocol path is the same one a desktop host uses and it ran here, while a change outside the repository is the owner's call. docs/doors.md says "Recorded runs: none yet" until the owner makes one.

Reverse it if: never; the owner's run replaces the line.

To reverse: docs/doors.md, the run log's Needs the owner list.

## 2026-10-22 06:37, A5: the evidence report's scope line

Options: (a) keep "Nothing was collected from the web" in every exported evidence report, which is false whenever postings were collected on request, and which the door would repeat to an assistant. (b) Name the sources: collected postings with the board or sample they came from and any lecturer-supplied documents, and keep the old sentence only for a course with no collection, where it is true. (c) Drop the scope line.

Chosen: (b), because the A2a fix had corrected the screen but not the report the export and the door carry, and a receipt that misstates its own scope is worse than none. The stored brief embeds the report, so the sample workspace was rebuilt.

Reverse it if: never.

To reverse: `evidenceMarkdown` in `src/lib/evidence.ts`.

## 2026-10-22 06:37, A5: the doors strip after the local door

Options: (a) mark the MCP door Built. (b) Mark it "Local, read-only", as Section 11.2 states its status, the skill folder "Written" because no host has loaded it in this run, and every other door Planned. (c) Leave every door but the workspace Planned.

Chosen: (b), because each tag then says exactly what exists: the server works locally over an export, the skill is a file, and remote access and OAuth are not built.

Reverse it if: the owner's Claude Desktop run loads the skill as well, which earns it "Local".

To reverse: `DOORS` in `src/ui/screens/Landing.tsx`.

## 2026-10-22 06:37, A5: the advisories npm reports

Options: (a) run `npm audit fix` now, which moves locked versions of the app's own dependencies (xlsx has no fix; pptxgenjs's fix is a major version) days before a demo. (b) Record the eight advisories in the production dependencies as npm reports them and change no version in Track A; the door uses only the SDK's stdio path, not its HTTP stack. (c) Remove the SDK.

Chosen: (b), because a dependency upgrade belongs in Track B with its own checks, and nothing in Track A exposes a server to a network.

Reverse it if: an advisory concerns a path the demo uses.

To reverse: `package.json` and `package-lock.json`.

## 2026-10-22 06:55, A6: which marks the diagram carries

Options: (a) the official mark of every product in Section 12, as the plan asks. (b) Simple Icons marks, unmodified and in one colour, only for Claude, the Model Context Protocol and Greenhouse, whose doors or sources are built, and every other product named in text, because Microsoft needs a licence, Google a request that takes up to two weeks, Moodle permission for a logo, and the OpenAI and Instructure terms were not read in a run that sends nothing off the machine. (c) No marks at all.

Chosen: (b), because it shows real marks where Lyceum really connects and claims nothing about the rest; `docs/brand-use.md` records each mark, its source and its terms.

Reverse it if: the owner reads and accepts a brand's terms, or obtains a licence, for a mark in the second table of `docs/brand-use.md`.

To reverse: the `doors` list and the imports in `scripts/gen-architecture.mjs`, then `docs/brand-use.md`.

## 2026-10-22 07:05, A6: one term for every record in the demo

Options: (a) keep the tour as A4 left it, where the term is named only at Update, so the decision record says "term not set" and the results file keeps its own label, 2025-S1, while the brief and the ring say 2026/2027 semester 1. (b) Have the lecturer set the term at the Course step (a small field that shows until a term is set) and file the results under the loop's term, so the brief, the decision, the version and the results all carry 2026/2027 semester 1. (c) Show the window's current term on records that stored none.

Chosen: (b), because the decision record is the deck's central artefact and must be bound to the term it decides, as Section 4 specifies; (c) would print a term the record never held.

Reverse it if: the owner wants the term entered only at Update, as before.

To reverse: `TermSetter` in `src/ui/screens/CourseWorkspace.tsx`, the two steps in `src/demo/script.ts` (with `clear` in `src/demo/runner.ts`), `upload-term` in `src/ui/screens/Upload.tsx`, and the term lines in `mcp/sample.ts`; regenerate the sample.

## 2026-10-22 07:12, A6: the receipt on the first slide

Options: (a) the first confirmed quotation in the sample, from Stripe's Data Analyst posting published 2023-11-01. (b) The same sentence from Stripe's Data Analyst, Intern posting, published 2026-10-01, three weeks before the Grand Final, with the screenshot of the proposal taken from that posting so both slides cite one source. (c) A different skill's sentence.

Chosen: (b), because the receipt has to read as what employers ask for now, and the slide and the screen must agree on the posting, its date and its link.

Reverse it if: a fresh live fetch before the freeze changes the sample, when the receipt should be the newest confirmed sentence again.

To reverse: slide 1 in `deck/index.html`, the receipt in `scripts/gen-brief-pdf.mjs` and `scripts/gen-poster.mjs`, the proposal pick in `scripts/presentation-shots.mjs`, and the `deck-receipt` row in `docs/claims.md`.

## 2026-10-22 07:20, A6: the deck's five numbers

Options: (a) show the price hypothesis (RM 6,000 to 15,000 a year) and TRL 7 on slides 8 and 10 as well. (b) Keep the talk to five numbers as Section 14 asks: 1 of 9, 12 to 18 months, 39%, TRL 6 and 185 checks; the price stays the hypothesis the pilot tests, spoken only if asked, and TRL 7 is named in the notes as the next level. (c) Drop the check count.

Chosen: (b), because the plan sets the limit at five and the price is a hypothesis, not a finding.

Reverse it if: the judges ask for the price on screen, or the organiser's template wants a business slide with figures.

To reverse: slides 8 and 10 in `deck/index.html` and their rows in `docs/claims.md`.

## 2026-10-22 07:20, A6: the relevant environment on slide 8

Options: (a) "real postings from a real board, a real syllabus, a lecturer persona", as plan Section 14 words it. (b) "a sample course outline" in place of "a real syllabus", because the outline in `public/demo` is written by `scripts/gen-demo-files.mjs`, not taken from a university. (c) Leave the environment out.

Chosen: (b), because the honesty rule in Section 0 says synthetic data says synthetic, which settles the plan's wording; the NASA reviewer checklist still gets a named environment.

Reverse it if: a real syllabus, with its owner's permission, replaces the sample before the freeze.

To reverse: slide 8 in `deck/index.html`, page 2 of `scripts/gen-brief-pdf.mjs` and the `deck-trl` row in `docs/claims.md`.

## 2026-10-22 07:20, A6: slide 10's line

Options: (a) "The review happens anyway; the pack writes itself", the plan's spoken line. (b) "The review happens anyway; the evidence is kept", with the term's review pack shown as planned, because the accreditation pack from the term's records is not built. (c) No headline.

Chosen: (b), because the brief, the reports and the decision records exist today and the review pack does not.

Reverse it if: the term recap ships as the review pack (Track B).

To reverse: slide 10 and its notes in `deck/index.html`.

## 2026-10-22 07:25, A6: the deck as a file in the repository

Options: (a) slides written as data and generated into HTML. (b) One hand-edited `deck/index.html`, with every figure marked `data-claim` and every other number `data-ref`, which `scripts/gen-deck.mjs` checks against `docs/claims.md`, the sample workspace and the accreditor clauses before it exports. (c) A PowerPoint file as the source.

Chosen: (b), because the Deck and poster lane can edit slides as plain HTML in the theme while the checks keep every number honest, and the PDF and PPTX are derived.

Reverse it if: the lane prefers to work in PowerPoint, when the PPTX becomes the source and the HTML a fallback.

To reverse: `deck/` and `scripts/gen-deck.mjs`.

## 2026-10-22 07:25, A6: the deck's exports kept out of git

Options: (a) commit `lyceum-deck.pdf` (2.4 MB) and `lyceum-deck.pptx` (5 MB) on every change. (b) Ignore `deck/export/` and `deck/media/*.mp4`, as the plan already does for video renders, and rebuild them with `npm run deck` on the presenting laptop, which is also where Section 14.3 says the PPTX and its film must be tested. (c) Commit only the PDF.

Chosen: (b), because the exports are derived from committed sources by a checked script, and binary copies would go stale with every edit.

Reverse it if: the team repository needs the files for someone without Chrome or Node.

To reverse: the last three lines of `.gitignore`.

## 2026-10-22 07:25, A6: how the teaching pack appears on slide 7

Options: (a) a screenshot of the PowerPoint window. (b) The pack's slides exported by PowerPoint itself through its automation interface (read-only, no window), which is how PowerPoint draws the downloaded file, labelled so. (c) A render of the PPTX by another program.

Chosen: (b), because it shows the real file as PowerPoint renders it without driving the desktop, and the same script reads the deck's PPTX back to verify it.

Reverse it if: the lane wants the PowerPoint window itself in the shot, which needs a person at the machine.

To reverse: `scripts/render-pptx.ps1` and the PowerPoint step in `scripts/gen-sample-decks.mjs`.

## 2026-10-22 07:25, A6: one dataset for the sample decks

Options: (a) keep `scripts/gen-sample-decks.mjs` replaying its own version of the flow from `public/demo`. (b) Build both sample decks from `mcp/sample-workspace.json`, the tour's end state that the screenshots and the door already read, stamped with its export time so a rerun writes the same slides. (c) Delete the sample decks.

Chosen: (b), because Section 15 asks for one dataset for everything, and the deck shows this pack.

Reverse it if: the samples need a state the tour does not reach.

To reverse: `scripts/gen-sample-decks.mjs`.

## 2026-10-22 07:30, A6: screenshots from a narrower window

Options: (a) capture at a 1440 pixel window, as before. (b) Capture at 1180, still wide enough for the sidebar layout, so each panel is narrower and its text larger once placed on a slide, a page or the poster; add single-card shots (the dashboards count) and crop the rest by region. (c) Capture at a phone width.

Chosen: (b), because a screenshot placed at 1000 pixels on a 1920 slide then shows the app's text at nearly its real size.

Reverse it if: a shot needs the full laptop layout.

To reverse: the viewport line in `scripts/presentation-shots.mjs`.

## 2026-10-22 07:40, A6: the poster's format

Options: (a) A1 portrait, the usual booth format, which shrinks the 16:9 diagram to fit the story beats. (b) A1 landscape (841 by 594 mm), with beats 1 to 4 across the top and the diagram 452 mm wide below, so its smallest labels print near 3 mm and read from a metre. (c) Two posters.

Chosen: (b), because the poster's job at the booth is the loop, the mascots and the architecture (Section 15), and the diagram is the part that must stay legible.

Reverse it if: the booth board is portrait only; the finalist pack or a photograph of the booth will say.

To reverse: the layout in `scripts/gen-poster.mjs`.

## 2026-10-22 07:40, A6: the poster's QR code

Options: (a) a QR code to the GitHub repository, which may be private and is not the landing page. (b) A slot marked planned until the landing page is deployed, with `--qr <png>` to place the code then. (c) No slot.

Chosen: (b), because the plan asks for the landing page, and deploying it sends the build off the machine, which is the owner's call (Needs the owner, item 3).

Reverse it if: the owner deploys the landing page and gives its address.

To reverse: run `node scripts/gen-poster.mjs --qr <file>`.

## 2026-10-22 07:50, A7: the third-party skills

Options: (a) install remotion-dev/skills and brag after a SkillSpector scan of each, as the A7 prompt allows. (b) Build the Remotion project and the cold open directly, from the Dataworks project and Remotion's own packages, and install no third-party skill. (c) Skip Remotion.

Chosen: (b), because the Dataworks project already shows every technique the film needs, and a skill that is not installed needs no scan and cannot run anything; Section 16 allows the cold open as a Remotion scene instead of brag.

Reverse it if: a later pass wants the Remotion agent skills or the brag intro; scan each first and stop on anything but SAFE.

To reverse: nothing to undo; scan and install per the global CLAUDE.md.

## 2026-10-22 07:52, A7: how the app is captured

Options: (a) Playwright's `recordVideo`, as Section 16 names it, which needs Playwright's own browser and ffmpeg builds downloaded. (b) Puppeteer's screencast, already a dependency, which uses the ffmpeg on the PATH and the installed Chrome, recording the self-driving tour once and logging the time of each tour caption, so scenes cut excerpts by caption. (c) A hand recording.

Chosen: (b), because it records the same real app by script with nothing new to download, and one recording of the tour keeps every scene consistent with the demo the judges see.

Reverse it if: the team prefers Playwright's per-scene files, or the screencast drops frames on another machine (the script fails when the video's length and the tour's wall time differ by more than two seconds).

To reverse: `video/capture/capture.mjs` and the `Clips` lines in `video/script.md`.

## 2026-10-22 07:58, A7: the tour on the saved sample for the film

Options: (a) record the tour as it plays for the judges, which fetches Stripe's board live through the local API and needs the network. (b) A `?demoSample` flag that makes the same tour pick the dated saved sample of the same board from the start, offline and identical on every run, with the film's chip saying "saved sample". (c) Run the local API and fetch live during the capture.

Chosen: (b), because this run sends nothing off the machine, and Section 16.1 asks for sample footage labelled as the sample.

Reverse it if: the team wants live footage, captured with the local API running and the network up.

To reverse: `isSampleTour` in `src/demo/timing.ts`, `tourSteps` in `src/demo/runner.ts`, the `?demoSample` address in `video/capture/capture.mjs`.

## 2026-10-22 08:04, A7: the captured footage keeping time

Options: (a) Puppeteer's screencast as it is, which writes frames at a fixed rate, so every slow frame shortens the clock: the first recording ran 11 seconds short of the tour (373.7 s against 384.6 s) and the Decide scene showed the Teach page. (b) The same with a two-pixel heartbeat repainting in a corner; tried, still 13 seconds short (368.1 s against 381.2 s). (c) The browser's own screencast frames piped straight into ffmpeg, which stamps each frame with its arrival time and fills the gaps at 30 fps, with the heartbeat kept, and the capture failing when the video's length and the tour's wall time differ by more than two seconds.

Chosen: (c), because the excerpts are cut by the captions' wall-clock times, so the video must keep the same clock.

Reverse it if: a recorder that timestamps frames itself replaces the pipe.

To reverse: the recorder in `video/capture/capture.mjs`.

## 2026-10-22 08:05, A7: the lecturer's caption bar

Options: (a) emerald, as Section 16.1 first names it. (b) ray3, because the audit says emerald on forest is 2.96 to 1, under the 3 to 1 a graphic needs, and on forest data uses ray2, ray3 and lime; the host keeps lime. (c) White.

Chosen: (b), because the bar tells the two voices apart and must stay visible on the caption box; it changes no token, only which one the bar uses.

Reverse it if: the audit is revised for emerald on the dark field.

To reverse: `SPEAKER_BAR` in `video/remotion/src/theme.ts` and the Captions line in `video/style.md`.

## 2026-10-22 08:06, A7: the characters in the film

Options: (a) draw the host and the helpers again for the film. (b) Import the app's own components (`src/ui/mascots`), with one optional `mouth` opening added to the host for speech (the app never passes it, and the generated mascot files are unchanged), and draw only the faceless lecturer figure in the film. (c) Use the PNG exports.

Chosen: (b), because the film's characters then are the app's characters by construction, and the mouth can follow the voice's loudness.

Reverse it if: the film needs poses the app does not have.

To reverse: `video/remotion/src/components/Cast.tsx`, and the `open` prop in `src/ui/mascots/parts.tsx` and `mouth` in `host.tsx`.

## 2026-10-22 08:07, A7: the film without voices

Options: (a) wait for the team's recordings before building anything. (b) Build both cuts now with every line timed from its words at 2.6 a second, mouths closed and no sound, so the pictures, cues, captions and numbers can be reviewed; the recordings, once named as `video/README.md` says, replace the estimates by a sync. (c) Use text to speech.

Chosen: (b), because A7 in this run covers the parts that need no human voice, and Section 16 allows text to speech only as the documented fallback.

Reverse it if: the team records the voices; nothing to undo, run the sync.

To reverse: nothing.

## 2026-10-22 08:08, A7: rendering without a browser download

Options: (a) let Remotion download its headless browser on the first render. (b) Point the render at the Chrome or Edge already installed (`--browser-executable`), which rendered correctly here. (c) Render in the cloud.

Chosen: (b), because it needs nothing from the network and the stills matched the studio.

Reverse it if: a Chrome update breaks the render; then `npx remotion browser ensure` downloads the headless shell.

To reverse: `BROWSER` in `video/remotion/scripts/render.mjs`.

## 2026-10-22 09:15, A7: a render that reproduces

Options: (a) Remotion's own H.264 render, as first set up: two renders of Loop90 differed in 1,447 of 2,603 decoded frames, from the first app scene on. (b) Remotion's PNG frames encoded by the system ffmpeg, tried next (an 08:45 entry here chose it, blaming Remotion's encoder and Chrome's JPEG frames): still 1,456 differing frames, and decoded side by side the pixels differed only in the 60 px blurred shadow under the app's frame, 1 to 10 levels apart along the browser's raster tiles, while the footage, the drawn scenes and the text matched. (c) A flat offset shadow, as the style guide's flat shapes ask, so the film has no blur anywhere, with the frames still drawn as PNG and encoded by the system ffmpeg, the master and the 720p copy from one render.

Chosen: (c), because the blur was the cause, and with it gone the first app scene rendered twice differs in 1 of 412 frames, by one level in one pixel. The PNG path stays because its frames are lossless and the encoder's settings and colour tags are the project's, at the cost of temporary frames of about 1.2 MB each, deleted after the encode.

Reverse it if: the film wants a soft shadow again; run `scripts/determinism.mjs` before keeping it.

To reverse: the frame's `boxShadow` in `video/remotion/src/scenes/Real.tsx`, the Illustration rules in `video/style.md`, and `render` in `video/remotion/scripts/render.mjs`.

## 2026-10-22 09:15, A7: what the determinism check accepts

Options: (a) the two encoded files byte for byte, which one pixel one level apart fails, and which H.264 spreads over dozens of frames, so the report cannot say how large a difference is. (b) Chrome's software renderer (`--gl=swangle`) to make the frames byte-identical; tried on the first app scene, also 1 of 412 frames one level apart, and 2.5 times slower. (c) The rendered frames diffed before encoding, each differing frame measured in pixels and levels, failing on a missing frame or on any pixel more than 2 levels apart, with one set of frames encoded twice to show the encoder adds nothing.

Chosen: (c), because what the check is for (a clock, a random number, a late font or a blur in the film) moves pixels by tens of levels, while the rasteriser's own rounding moves one level in a pixel now and then; the report counts both, so nothing is hidden.

Reverse it if: a Chrome or Remotion release draws the frames byte for byte the same, which the report will show as no differing frames; then the tolerance can go to 0.

To reverse: `TOLERANCE` and the comparison in `video/remotion/scripts/determinism.mjs`.

## 2026-10-22 09:18, A7: which Codex reviews run, and what they see

Options: (a) none, as this run planned while the limit was spent and the owner had not said to send files. (b) The jobs plan Section 15 gives Codex, once the owner reported the limit reset (the owner's earlier message asked for the queued steps to run then): the pitch and the claims audit at once on what A6 committed, and the question bank once A8 has written the booth script and JUDGES.md, each `codex exec --sandbox read-only` with only the named files on stdin. (c) One review of the whole repository.

Chosen: (b), because each review sees exactly the files its question needs, nothing else leaves the machine, and its report is kept as written in `docs/review/` with every claim checked against the notes and the code before anything changes.

Reverse it if: the owner wants no project files sent to OpenAI; the three reports and their logs are the whole footprint.

To reverse: delete `docs/review/astra-*-2026-10-22.md` and their run logs; nothing else depends on them.

## 2026-10-22 09:48, A8: Lens on the loop graphic

Options: (a) the eight stations of the A2b decision, Lens labelled "Report, Learn" between Atlas and Steward, so the ring reads Learn before Decide (the pitch review's finding). (b) Nine stations in loop order with Lens drawn twice, counting at Report and reading the results at Learn, which the A2b decision named as its reversal. (c) Seven stations, one per step with Report's three helpers grouped, which needs a new station layout.

Chosen: (b), because the six steps then read in their order on every ring, with the same seven helpers, and the change is the station list on each surface. The rings are a little wider than tall where there is room (the film, the deck, the poster), and the landing's compact ring shows each step with its helper's name only, the full line kept for screen readers, because nine full lines do not fit at 460 px.

Reverse it if: nine stations crowd the ring at a width the smokes or the shots show.

To reverse: `STATIONS` in `src/ui/screens/LoopGraphic.tsx` (and its compact line) with the station widths in `src/theme/global.css`, `video/remotion/src/scenes/Drawn.tsx` and `scripts/gen-poster.mjs`, slide 4 in `deck/index.html` and its ring in `deck/deck.css`.

## 2026-10-22 09:55, A8: how records from the app's sample files say they are synthetic

Options: (a) leave them as they are: Learn shows the sample file's marks (N = 24, a mean of 62.1) with nothing to say they are made up, against the rule that synthetic data says synthetic. (b) Rename the sample files with a "sample-" prefix, which changes the names the tour, the proofs and the sample workspace check. (c) An optional `sample` flag that the sample buttons set on the parsed file and the store carries onto the result and the data source, shown as "Sample file, synthetic marks" on Learn, the course overview, the Data room and the upload receipt; old backups, without the flag, still restore.

Chosen: (c), because only the app's own sample files are labelled, a lecturer's file of the same name is not, and nothing else changes name; the sample workspace and the door's proof now carry and assert the flag.

Reverse it if: the sample files are replaced by a real, consented results file.

To reverse: `sample` in `src/types.ts`, `handleFile` in `src/ui/screens/Upload.tsx`, `fileIntake` in `src/app/store.ts`, the shapes in `src/lib/workspaceBackup.ts`, the tags in `Learn.tsx`, `CourseWorkspace.tsx` and `DataRoom.tsx`, `mcp/sample.ts` and the assertion in `src/prove-mcp.ts`.

## 2026-10-22 09:57, A8: what the claims audit changes

Options: (a) keep the registered wording, which states WEF's forecast as a fact ("will be transformed"), the approval time as general where its sources are two US universities, and Biggs as an accreditor's clause. (b) The audit's full rewrite: new headings and longer labels on every surface. (c) The smallest change that makes each line true to its note, on every surface that shows it: employers expect the 39%; the approval time is at the US universities cited; the Malaysian 3.2% is of graduates in the labour force; the landing's unsourced "the asks change within a year" goes; Biggs is labelled a teaching principle; the interviews are in at least three Asian countries, as R1 says.

Chosen: (c), because every changed line is now checkable against a quoted passage in its note, and the figures themselves, which the audit found supported, stay as they are.

Reverse it if: a note gains a passage that supports the stronger wording.

To reverse: the `world-skills-and-approval` and `malaysia-underemployment` rows in `docs/claims.md`, `src/data/painStats.ts`, `src/data/accreditors.ts`, `src/ui/screens/Landing.tsx`, slides 2 and 10 in `deck/index.html`, `scripts/gen-brief-pdf.mjs`, `scripts/gen-poster.mjs`, Afternoon's second scene in `video/script.md`.

## 2026-10-22 09:57, A8: TRL 6 after the audit

Options: (a) keep TRL 6, self-assessed, with the environment named as it is (real postings from a real public board, a sample course outline, a lecturer persona). (b) Present TRL 5 until a real syllabus and a real lecturer have run the loop, which the research note's own definition of the relevant environment asks for. (c) Run one real syllabus with one lecturer before the final.

Chosen: (a) for now, because the level is a positioning claim the owner made in the plan and the deck already names the weaker environment beside it; the choice between (a), (b) and (c) is under Needs the owner.

Reverse it if: the owner picks (b) or (c).

To reverse: the `deck-trl` row in `docs/claims.md`, slide 8 in `deck/index.html`, `scripts/gen-brief-pdf.mjs`, `scripts/gen-poster.mjs`, Afternoon's proof scene in `video/script.md`.

## 2026-10-22 09:58, A8: what the pitch review changes in the deck

Options: (a) every copy suggestion, the opening reordered and the commercial slide rewritten. (b) The verified accuracy and timing fixes only: the ChatGPT door said as planned in the rehearsed answer, formal approval kept apart from what Lyceum records, the forecast period no longer tied to the approval time, "TRL 7 needs" as the register says, no claim about what every lecturer wants, the reviewed postings as the demo's, "People decide" back in the spoken close, slide 5's chip no longer saying live, and the notes of slides 1, 8 and 10 cut to fit 140 words a minute. (c) Nothing until the Story lane reads the review.

Chosen: (b), because each of these lines was wrong or overran by the review's own count, while the opening order (plan Sections 4.1 and 14 disagree) and the commercial framing are the owner's and the Story lane's to settle; both are under Needs the owner.

Reverse it if: the Story lane rewrites the talk; the review stays in `docs/review/` for it.

To reverse: `deck/index.html`.

## 2026-10-22 09:59, A8: the README

Options: (a) merge the house-style README already on `origin/main` (7 October), which carries the v3 story with figures and sources the later audit withdrew (LinkedIn and Glassdoor as market sources, the backtest's 0.009 as headline evidence) and art in the old palette. (b) Rewrite the README to the loop in the house layout of the global CLAUDE.md, reading shuden, penyu and the profile README with `gh` (read-only; only the requests leave the machine): the banner and card from shuden's `build.py` (the later of the two, 6 October) with only its config block changed, every colour a token and lime only in the dark theme, the art a tree's cross-section in braille, real screenshots in pairs, the about block with a real command and its output. (c) Leave the old README.

Chosen: (b), because the README must tell the same story as the deck and the app, and nothing in it may claim what the audit withdrew; the contrast check now holds the four SVGs to the tokens.

Reverse it if: the owner wants `origin/main`'s README merged instead; the two can be compared line by line.

To reverse: `README.md`, `.github/readme/`, the README lines in `scripts/presentation-shots.mjs` and `scripts/contrast-check.mjs`.

## 2026-10-22 10:00, A8: DECISIONS.md and docs/decisions.md

Options: (a) move DECISIONS.md into `docs/history/` and leave a one-line pointer, as plan Section 18 says. (b) Keep DECISIONS.md as written, because the project's CLAUDE.md names it as required reading, and add a note at its top that Track A's decisions, from 22 October, are in `docs/decisions.md`. (c) Merge the two files.

Chosen: (b), because the operating brief points sessions at DECISIONS.md and changing that brief is the owner's call; a pointer at the top serves the same purpose without breaking it.

Reverse it if: the owner updates CLAUDE.md's reading list; then the move in (a) is one commit.

To reverse: the first lines of `DECISIONS.md`.

## 2026-10-22 10:16, A8: what the question-bank rehearsal changes

Options: (a) nothing until the Story lane reads it. (b) The overclaims it found that the files confirm: "Claude reads" the door, in the deck's notes, the brief, FEEDBACK.md and the booth script, where only the official MCP client has run it and the Claude Desktop run is still to be recorded; a rehearsed answer saying "today Claude"; and the film and the booth calling the local door the university's own assistant, which is a planned door. (c) Write the eight unrehearsed answers from it, which would put model text into the team's script.

Chosen: (b), because each changed line now says what has been run, and the answers stay the Story lane's, with the review kept in `docs/review/` as their input.

Reverse it if: the Claude Desktop run is recorded (Needs the owner 2); then "Claude reads" is true and can return.

To reverse: slides 9 and 11 in `deck/index.html`, `scripts/gen-brief-pdf.mjs`, `team-overlay/FEEDBACK.md`, `docs/demo-script.md`, Afternoon's doors scene in `video/script.md`.

## 2026-10-22 10:18, A8: the sample's seed clock

Options: (a) leave the seed clock at 1 July 2026, so records built outside the browser (the sample workspace, and so the screenshots restored from it) are dated before the postings they cite were retrieved on 9 October. (b) Move it to 22 October; tried, and two journey proofs fail, because their term windows and decision rules are anchored to the July clock. (c) Pin a separate clock for the sample workspace only, which shifts its term against the seed records and is untested.

Chosen: (a) for this run, because the proofs are the contract and re-anchoring them the day of the freeze is the larger risk; the live demo runs on the browser's real clock, so the booth shows today's dates.

Reverse it if: the owner wants the screenshots' dates consistent before the final; then (b) with the two proofs re-anchored is one change.

To reverse: `SEED_NOW` in `src/app/store.ts`, the dates asserted in `src/prove-journey.ts`, then `node mcp/sample.ts` and `npm run shots`.

## 2026-10-22 10:53, A8: the as-built record

Options: (a) a fresh as-built document with the package sections deleted. (b) The Amanah shape on top (stamp, what Lyceum is, plan versus built with the known mismatches, exact versions, layout, the full verification with its date, what needs a person) and the package sections kept as written below as the changelog, the 9 October report moved to `docs/history/` as Section 18 says. (c) Keep the package sections only.

Chosen: (b), because the package sections are the dated evidence the plan-versus-built table points to, and a reader wants the summary first.

Reverse it if: the file grows past what a judge will read; then the changelog moves to `docs/history/`.

To reverse: `docs/as-built.md`, and `git mv` the 9 October report back.

## 2026-10-22 11:08, after Track A: the sample's seed clock, on the owner's word

Options: (a) keep the seed clock at 1 July 2026, as the 10:18 entry chose, so the sample's brief, decision and results stay dated before the postings they cite were retrieved (9 October). (b) Move it to 22 October 2026, after the retrieval, and build the proofs' "a day later" and "a day earlier" moments from the clock itself instead of fixed July dates, so the proofs hold for any seed date. (c) A separate clock for the sample workspace only.

Chosen: (b), because the owner asked for the dates to be consistent, and with the proofs' moments derived from `SEED_NOW` the change is one constant; all 185 checks, the four smokes and the walk passed on it, and the sample workspace, the screenshots, the deck, the brief, the poster and the sample decks were rebuilt from it.

Reverse it if: a later seed needs a date before the saved sample's retrieval; then the saved sample's dates move with it.

To reverse: `SEED_NOW` in `src/app/store.ts`, then `node mcp/sample.ts`, `npm run shots`, `npm run deck`, `node scripts/gen-brief-pdf.mjs`, `node scripts/gen-poster.mjs` and `node scripts/gen-sample-decks.mjs`.

## 2026-10-22 11:34, after Track A: where the landing page is published, on the owner's word

Options: (a) the production build as a static site on Vercel, from the owner's signed-in Vercel command line (`npx vercel@latest deploy --prod`), as the owner suggested. (b) The Vercel connector in this session, which uploads every file inline; the build is about 11 MB, so it was impractical. (c) GitHub Pages, which means a workflow in a repository and a push, which this run does not do.

Chosen: (a), because the owner asked for it and it sends only the built `dist/` folder, which holds no workspace data (the app keeps work in the visitor's browser). The project is `lyceum`; the production address is <https://lyceum-rho.vercel.app>. Checked: the address answers 200 and opens on the landing page at `#/index`.

Reverse it if: the team wants the page under the university's or the team's own domain; then the QR code and the poster follow the new address.

To reverse: remove the `lyceum` project in the owner's Vercel account; then make a new QR image and run `node scripts/gen-poster.mjs --qr <file>`.

## 2026-10-22 11:36, after Track A: the poster's QR code

Options: (a) a QR code to the site's root, which opens on the sign-in screen. (b) A QR code to `#/index`, the public landing page. (c) A short link that forwards to the page.

Chosen: (b), because a judge who scans the poster should land on the page that explains Lyceum, without signing in, and a short link adds a service that can lapse. The image is `docs/presentation/qr-landing.png`, 900 px, forest modules on white, made with `qrcode` 1.5.4 and decoded back with OpenCV to the same address; `scripts/gen-poster.mjs` now uses the saved image when no `--qr` is given, and the poster PDF was rebuilt with it at 11:37.

Reverse it if: the page moves to another address.

To reverse: `node scripts/gen-poster.mjs --qr <new image>`, or delete `docs/presentation/qr-landing.png` to put the planned slot back.

## 2026-10-22 12:00, after Track A: a friendlier workspace, as a concept first (approved by the owner by 12:42)

The owner, 11:31: the UI "is congested, not intuitive enough"; keep the colours and the graphics, with "more duolingo vibe" that is "slight brutalist".

Options: (a) keep plan Section 6.4's restraint (hairline cards, depth by surface, shadows only under mascots and open menus, "structure is felt, not seen", at most one forest element on a working screen) and only tidy the spacing. (b) The owner's direction, on the same tokens: 2 px forest outlines and a flat lip under every control and panel (no blur), pills for tags and chips, bigger and bolder type, more air; the loop as a path of round stops across the top of each step instead of the sidebar rail (each stop with its state in a word and a mark, and its count, as plan Section 5.2 asks of the rail); the step's helper asking its question in a speech bubble; the sandbox folded in the sidebar. (c) Rework every screen's content at once.

Chosen: (b), built as a concept on the real screens and shown to the owner before it goes further, because it breaks five of Section 6.4's rules (the outlines and lips, structure that is seen, the forest "you are here" stop beside the header, pills instead of the 8 px chip radius, and a 2.25 icon stroke on the path's stops instead of 1.75) and that is the owner's call to confirm. The palette, the honesty labels, the six steps and their order are unchanged; colours still come only from `tokens.ts`, and the contrast check passes. All 185 proofs, the four smokes and the walk pass on it; the integrity smoke and the walk now enter the loop from the selected course chip, and the sandbox screens are opened from the fold.

Reverse it if: the owner prefers the quieter workspace once it is seen.

To reverse: delete the chunky layer at the end of `src/theme/global.css`; put the sidebar rail back from `git show HEAD:src/ui/shell/LoopRail.tsx` and `HEAD:src/ui/shell/Shell.tsx`, and the step header from `HEAD:src/ui/screens/StepFrame.tsx`; restore the deleted rail styles from `HEAD:src/theme/global.css`; drop the fold steps from `scripts/integrity-smoke.mjs`, `scripts/walk.mjs` and `scripts/workspace-smoke.mjs`.

Approved: the owner, by 12:42: "The rules is AI generated anyway. i prefer something that more attract judges attention so yeah thank you proceed". Plan Sections 5.2, 6.4 and 6.6 now describe the path, the bubble and the depth by outline and lip, and the rollout below carries it to every screen.

## 2026-10-22 12:52, after Track A: Watch, shorter without changing the tour

Options: (a) split Watch into sub-steps, as Report has (Fetch, Kept, Over time). (b) Keep one page: show the first three kept sources of a run with "Show all", say a run's shared provenance once in its head instead of on every card, and give the long source name a wider column. (c) Leave Watch as it was.

Chosen: (b), because the self-driving tour fetches on Watch, goes to Report and comes back to Watch to freeze a snapshot, and the film is cut from that tour by caption; sub-steps would add tour steps and move every later caption and clip. (b) takes about 700 px off the page at 1440 px and leaves the tour, its captions and the film's script as they are. Nothing is dropped: every source is one press away, and a mixed run still labels each card.

Reverse it if: testers still find Watch long; then (a), with the tour, `video/script.md` and the film's clips changed together.

To reverse: `SourceGroup`, `FIRST_CARDS` and `PROVENANCE_LABEL` in `src/ui/screens/EvidenceWorkspace.tsx`, and `form-grid-wide-first` in `src/ui/screens/EvidenceResearch.tsx`.

## 2026-10-22 13:47, after Track A: what the team repo gets

Options: (a) the whole working tree, as the first snapshot had it. (b) The working code and what its checks and generators read (the claims register, the research notes, the lecturer guide, the palette and its audit, the doors and brand notes, the generated presentation assets), without the plans, the run records, the reviews, the history, the booth script, `JUDGES.md` and the AI brief. (c) The code alone, without docs.

Chosen: (b), because the owner asked for the functional part without the plan, and (c) would fail the proofs (the journey proof reads the research notes) and the deck, brief and poster checks (they read the claims register). Proved on the exact snapshot from a fresh install: every check and smoke passed. The first snapshot's history still holds what (a) published on 20 October; removing it means rewriting the team repo's history, which only the owner can choose.

Reverse it if: the team needs the plan's lanes or the decisions log; send them separately, or drop their lines from EXCLUDE.

To reverse: `EXCLUDE` in `scripts/team.mjs`, then `node scripts/team.mjs publish`.

## 2026-10-22 14:00, after Track A: the text people see

The owner, 13:58: "evaluate the text people see. i think some are straight up chartjunk", showing the sidebar's footer and the sandbox's notice.

Options: (a) leave the copy as it is. (b) Cut what repeats itself or explains the interface to itself, and keep every honesty label, number, receipt and checked string. (c) Rewrite every screen's copy from the start.

Chosen: (b). Junk here means a sentence that repeats the helper's line, the heading or another line on the same screen; one sentence repeated on every row of a list; a subtitle that names the page again; an explanation of where something will appear; a button that repeats the sidebar; a zero count beside a sentence that already says so. What stays: real, prototype, illustrative, planned and synthetic wherever they apply; a number with its denominator and interval; the verified tag on each quotation and the review state of each posting, because each is that row's receipt; a failing check's warning, always shown, first. (c) would move the strings the smokes check, the guide the guide check compares, and the tour's captions the film is cut from, for little gain over (b).

Reverse it if: a tester misses an explanation; it comes back in that screen's How to use panel rather than on the screen.

To reverse: the copy is in `src/ui/screens/` (Inbox, Watch, EvidenceResearch, EvidenceWatch, EvidenceWorkspace, Report, CurriculumWorkspace, CourseWorkspace, Studio, Decide, Learn, Guide, Courses, Office, Evaluation, Landing, Login), `src/ui/shell/Shell.tsx`, `src/ui/primitives/PrototypeNotice.tsx` and `src/ui/primitives/loop.tsx`.

## 2026-10-22 18:13, before Track C's D0: the owner's uncommitted follow-ups

Options: (a) commit them first as their own commit, so each Track C commit holds one package. (b) Fold them into D0's commit, which mixes the follow-ups of the day with the institution profile in one change. (c) Stash them, which removes the tree the depth plan was written over.

Chosen: (a), as `ba980e7`, because the driver asks for one commit per package and the depth plan is written over `main` plus these follow-ups, so they are its base. The commit is local, nothing is pushed, and the run log names what it holds and what it leaves out.

Reverse it if: the owner wanted to commit the follow-ups under another message.

To reverse: reword `ba980e7` before pushing; its content stays the base either way.

## 2026-10-22 18:16, D0: where the owner's utp.svg lives

Options: (a) track the root `utp.svg` and widen the contrast check's exception to cover it, which makes the exception two places instead of the one folder the owner approved. (b) Move the file into `public/brand/partners/` and delete the root copy, which removes the file from where the owner put it. (c) Keep the owner's file at the root, ignored by git, and copy it byte for byte into `public/brand/partners/`, the tracked copy the build uses, with `--check` comparing the two and a manifest fingerprint tying the PNGs to the copy.

Chosen: (c), because the exception stays exactly the folder the owner approved and the owner's file stays where it was supplied, while a fresh clone still has the tracked copy and its PNGs. The baseline contrast check failed only because the untracked root file was in its file list.

Reverse it if: the owner wants the root file tracked as well.

To reverse: remove `/utp.svg` from `.gitignore` and add `^utp\.svg$` to `PARTNER_MARKS` in `scripts/contrast-check.mjs`, which part 2 would then also need to skip.

## 2026-10-22 18:18, D0: one backup schema for the whole of Track C

Options: (a) bump the schema with every package that adds a record (6 for the profile, 7 for the course record, and so on), which multiplies the migration paths the check must restore. (b) One schema 6 for Track C, as the plan's Section 11 says, with a missing record taking its default whatever the file's version, so a schema 6 file exported after D0 still restores after D3a adds the surveys.

Chosen: (b), because the plan names schema 6 for the track and no build ships between packages. The defaults only ever add an empty collection or the demo profile, never change a record that is present.

Reverse it if: a Track C build is handed to someone before the track ends, so two shapes of schema 6 exist; then the later records take schema 7.

To reverse: `LATER_DEFAULTS` and `BACKUP_SCHEMA_VERSION` in `src/lib/workspaceBackup.ts`, and `scripts/check-backup-migration.mjs`.

## 2026-10-22 18:19, D0: who may change the institution's settings

Options: (a) a person who coordinates any course, as the plan's Section 3.1 says ("coordinator only"). (b) The programme owner only. (c) Both.

Chosen: (a): a coordinator edits, and everyone else, the programme owner included, reads the settings with where each default comes from. Positions as data and an `assign-positions` capability are Track B's (master plan Section 4.2), and until then the plan's word stands.

Reverse it if: the owner wants the programme owner to hold the settings.

To reverse: `mayEditInstitution` in `src/app/store.ts`.

## 2026-10-22 18:20, D0: the captures the walk and the smokes refresh

Options: (a) let the walk and the smokes overwrite the tracked captures in `docs/screenshots/` as they run, and commit the new screens with each package. (b) Restore the tracked captures after every verification run, so each stays a record of the 22 October build until D9, as the plan's Section 13.1 says of the stale screenshots. (c) Stop the walk and the smokes writing captures.

Chosen: (b), because the plan's Section 0.3 lists `docs/screenshots/` among the screenshots rebuilt only at D9, while the driver puts the walk and the smokes in every D8 run; restoring keeps both. (c) would change the checks' evidence trail for no gain.

Reverse it if: the owner wants the captures to follow the build between packages.

To reverse: stop running `git checkout -- docs/screenshots/` after the checks; no code changes.

## 2026-10-22 18:40, D1: the plan's week list and its learning-time line disagree

Options: (a) follow the week list of Section 4.3 (thirteen weeks of 2 lecture and 2 lab hours, week 14 of 1 lecture hour), which gives 27 lecture and 26 lab hours before the revision, a free slot of 1 lecture and 2 lab hours in week 14, and 28 and 28 after. (b) Follow the learning-time line (lecture 28 in both states, lab 25 before and 28 after), which needs two weeks changed from the list and a topic of 3 lab hours.

Chosen: (a), because it keeps the fourteen weeks exactly as listed, keeps the totals the plan states (117 hours before, 120 after) and arrives at the plan's own after state, 28 lecture and 28 lab hours, with the added topic lab-weighted (2 of its 3 hours). The line's 28 and 25 before the revision is an arithmetic slip against its own week list.

Reverse it if: the owner wants the before split exactly as the learning-time line says.

To reverse: `SCHEDULE` and `SLT_BEFORE` in `src/data/sample-course/cs310.ts`, and the figures in `src/prove-course-record.ts`.

## 2026-10-22 18:42, D1: the added topic's default week and split

Options: (a) the next free slot: the first week with fewer hours than the course's usual week (week 14, 1 lecture hour and no lab), with that slot's free hours, lecture first, so three hours typed become 1 lecture and 2 lab hours. (b) Week 6, where the brief's note and the mapping put the dashboard exercise. (c) No week, as before Track C.

Chosen: (a), the plan's own suggestion, because it is a rule a lecturer can see rather than a reading of the brief's words, and it puts the three hours exactly where the outline leaves them free; the tour types no week, so the default decides. The brief's "week 6" names the exercise in week 6's lab session, which Teach holds; the outline's new topic sits in week 14, and the Week field moves it.

Reverse it if: the owner prefers the topic beside week 12's storytelling or in week 6.

To reverse: `nextFreeSlot` and `splitForSlot` in `src/lib/curriculum.ts`, `addTopic` in `src/ui/screens/CurriculumWorkspace.tsx`, `cs310After` in `src/data/sample-course/cs310.ts`.

## 2026-10-22 18:44, D1: the revision editor's targets once a course has five outcomes and fourteen topics

Options: (a) leave every outcome and topic with the same ids, so the tour types its words into CLO1 and week 1 instead of CLO5 and the topic it adds. (b) Give each outcome's wording its own id (`curriculum-outcome-text-<label>`) and point the tour's one step at CLO5's, and keep the plain topic ids only on topics added in the revision, a topic from the baseline carrying its id in its targets. (c) Give the plain id to whichever outcome renders first, after reordering CLO5 to the top.

Chosen: (b), because the plan allows a target change where the richer course requires it (Section 0.2 item 2), the caption and the step order are untouched, and the rule is one a reader can see: the topic you add is the one the plain ids name. The curriculum smoke now names CLO1's wording, and baseline topics fold to one line in the editor so a fourteen-week outline stays readable.

Reverse it if: a later capture needs the old target name; the film is cut by caption, so none does today.

To reverse: the outcome and topic ids in `src/ui/screens/CurriculumWorkspace.tsx`, one target in `src/demo/script.ts`, two lines in `scripts/curriculum-smoke.mjs`.

## 2026-10-22 18:46, D1: the sandbox's catalogue beside the course record

Options: (a) change the seed's `CLOS` and `SUBJECTS` for CS310 to the five outcomes everywhere, which breaks the synthetic survey split and the analogy agent, whose cohort rated one outcome per course. (b) Keep `CLOS` and `SUBJECTS` as the illustrative sandbox's catalogue and seed the store from `SEED_CLOS` and `SEED_SUBJECTS`, which carry the record.

Chosen: (b), because the sandbox computes over a synthetic cohort that knows only CLO5 for CS310, while the workspace opens on the record; the relevance index rates only outcomes with market data, so CS310 still shows CLO5 there and every sandbox number is unchanged (the acceptance scenario's 12 checks pass as before).

Reverse it if: the sandbox is rebuilt on the course record (Track B).

To reverse: the `SEED_*` constants in `src/data/seed.ts` and `seedState` in `src/app/store.ts`.

## 2026-10-22 18:48, D1: the stored learning time and matrix links when a revision changes the outline

Options: (a) store lecture, lab and self-study hours as typed, so the tour's added topic leaves the stored totals behind and the check blocks the revision. (b) Derive them from the topics when a revision is saved (`withDerivedFields`), check the editor's outline as it will be saved, and keep the stored-against-topics check for imported records.

Chosen: (b), because the plan's model stores the totals (Section 4.2) and checks them against the topics, and deriving on save keeps both while the lecturer never types a sum the outline already holds. A matrix level for a programme outcome the mapping drops is dropped with it.

Reverse it if: a campus wants learning time entered by hand.

To reverse: `withDerivedFields` in `src/lib/curriculum.ts`, `saveCurriculumRevision` in `src/app/store.ts`, and the `issues` line in `RevisionEditor`.

## 2026-10-22 18:50, D1: the rubric spreadsheet in the course file

Options: (a) write the rubric as an XLSX in D1 through SheetJS. (b) Put each rubric in the zip as a Markdown table now and leave the spreadsheet to D7, which the plan gives the rubric-to-XLSX writer (Section 10).

Chosen: (b), because the plan places the writer in D7 and the rubric's whole content is already in the Markdown; the manifest says the spreadsheet comes with D7.

Reverse it if: D7 does not land and the owner wants the spreadsheet in Amsterdam.

To reverse: `files()` and the rubrics line of `courseFileManifest` in `src/lib/courseFile.ts`.

## 2026-10-22 18:52, D1: Folio and the course file

Options: (a) record each export as a new event, `course-file-exported`, so Folio can show "done" after it, which adds an event kind the plan's Section 11 does not list. (b) Register the export as a request in flight, so Folio is "working" while the file builds and rests after, and leave "done" until an export is a stored record.

Chosen: (b), because a mood must follow a record (master plan Section 7.2) and the plan names no export record; the build is a real request, so "working" is honest.

Reverse it if: the owner wants exports on the event log, which would also put them on the How it works timeline.

To reverse: `InFlightRequest` in `src/app/store.ts`, `moodsFor` in `src/app/moods.ts`.

## 2026-10-22 19:14, D2: where the term's sample sessions live

Options: (a) keep the fourteen sample sessions outside the store, as a read-only catalogue that only Teach and the course file show. (b) Seed them into CS310's teaching plan as sessions flagged `sample: true`, so the schedule, the pack generator, the course file and the local door read them where they read every session.

Chosen: (b), because the plan says the sample saves fourteen sessions, one per week (Section 5.1), and every reader of material already reads the plan's sessions. The flag keeps them out of Teach's done rule, the version taught, the plan's counts, the timeline and the moods.

Reverse it if: the owner wants a fresh workspace to open with an empty plan and the samples behind a button.

To reverse: `src/data/sample-course/sessions.ts`, `SEED_TEACHING_PLANS` in `src/data/seed.ts` and the store's seed, and the `sample` filters in `src/app/loop.ts`, `src/lib/teachingPlan.ts`, `src/app/runs.ts` and `src/app/moods.ts`.

## 2026-10-22 19:18, D2: the pack's body on a slide master

Options: (a) give each master a body placeholder and fill it per slide. (b) Masters carry the title placeholder, the mark, the footer and the slide number; the body, the two columns, the table and the figure go on as text boxes and shapes at the layout's positions (`src/lib/deckLayout.ts`).

Chosen: (b), because pptxgenjs 4.0.1 takes a placeholder's position from the layout and adds every layout placeholder a slide leaves unfilled to that slide, empty, so a body placeholder puts an empty "click to add text" box on every slide with a table or two columns. Text boxes keep the same positions, the 18 pt floor and the editable text, with nothing empty.

Reverse it if: a pptxgenjs release drops unfilled placeholders, or the owner wants the body to follow a campus template's layout.

To reverse: `renderBranded` in `src/lib/slides.ts` and `LAYOUT` in `src/lib/deckLayout.ts`.

## 2026-10-22 19:18, D2: which packs carry the UTP mark

Options: (a) put the institution's mark on every pack whenever the profile's `showMark` is on. (b) Put the mark and the demo line on the sample course's packs only (`definition.sample` and `showMark`), from a wide render cropped to the mark's own bounds; a lecturer's own course keeps the plain footer and no mark.

Chosen: (b), because the owner approved the mark for the demo course, labelled demo, and a course a lecturer creates in this prototype is not UTP's to brand. The wide render fills the corner and the plate at the mark's own proportions, where the square render's margin shrank it.

Reverse it if: a pilot campus's profile carries its own permission to show its mark on its lecturers' courses.

To reverse: `brandFor` in `src/lib/slides.ts`, the `wide` render in `scripts/gen-partner-marks.mjs` and `mark.wide` in `src/data/institution.ts`.

## 2026-10-22 19:21, D2: the parts pptxgenjs declares and never writes

Options: (a) ship the file as pptxgenjs writes it. (b) After writing, drop the `[Content_Types].xml` overrides whose parts are not in the package (pptxgenjs issue 1449: it declares a slide master for every slide and writes only the first, so a twelve-slide pack names eleven parts it does not hold), and nothing else, with a proof that the repair removes exactly those.

Chosen: (b), because a declared part that is missing is a package error that some readers answer with a repair prompt, and a lecturer's first sight of the pack should not be one. The repair touches only overrides that name absent parts, so a correct file passes through unchanged.

Reverse it if: pptxgenjs fixes issue 1449; the proof's first assertion then fails and says so.

To reverse: `repairPptx` and its calls in `deckBytes`, `deckBuffer` and `downloadDeck` in `src/lib/slides.ts`, and the repair test in `src/prove-materials.ts`.

## 2026-10-22 19:23, D2: the week a new session starts on

Options: (a) keep Track A's rule, the week after the last session in the plan, which with fourteen seeded sessions is week 15. (b) The first week whose topic teaches an outcome the latest version changed; otherwise the week after the lecturer's own last session, samples aside (`suggestedWeek`).

Chosen: (b), because the plan says the session the tour saves is week 6, and week 6 is the first week that teaches CLO5, the outcome the tour's revision rewords. A lecturer who just changed a course is most likely planning the first class that teaches the change.

Reverse it if: lecturers in the pilot plan in calendar order rather than from the change.

To reverse: `suggestedWeek` in `src/lib/teachingPlan.ts` and `add()` in `TeachingPlanPanel` (`src/ui/screens/CourseWorkspace.tsx`).

## 2026-10-22 19:25, D2: the samples beside the lecturer's own sessions in Teach

Options: (a) one list in week order, the samples mixed in with a tag each. (b) The lecturer's own sessions first, then "Sample sessions for the term" under its own heading, the Sample, synthetic tag and the demo line.

Chosen: (b), because the tour's pack download targets `session-slides-*` and the runner takes the first match, so the lecturer's own pack must come first in the page; a separate group also makes the label impossible to miss. The week filter covers both groups.

Reverse it if: the tour's target becomes the session's own id, and the owner prefers one list.

To reverse: `TeachingPlanPanel` and `SessionCard` in `src/ui/screens/CourseWorkspace.tsx`.

## 2026-10-22 19:28, D2: two packs for one week in the course file

Options: (a) one pack per week, named by the week. (b) Every session's pack, named so no two collide: a sample pack ends `-sample-teaching-pack`, and a second pack for the same week takes the session's id.

Chosen: (b), because after the tour week 6 holds the lecturer's own session beside the sample one, and a zip keeps only one file per name. The manifest counts sample packs and the lecturer's packs apart.

Reverse it if: the owner wants the course file to carry only the lecturer's packs.

To reverse: `CourseFileExport` in `src/ui/screens/CourseWorkspace.tsx` and the packs line of `courseFileManifest` in `src/lib/courseFile.ts`.

## 2026-10-22 19:42, D2: what counts as the lecturer's teaching plan

Options: (a) count every session in the plan wherever sessions are counted. (b) Count only the lecturer's own: `planSummary` returns their sessions and keeps the samples apart in `samples`, and Home, Courses, the Course step's checklist, the timeline, Prism's mood, the tour's wait for a saved session and the tour's "reset your saved work?" check all follow it.

Chosen: (b), because nobody here saved the samples: counting them put "Continue teaching plan, next class week 1" on a fresh Home, fourteen "Session saved" lines on the timeline, passed the tour's wait before its save, and made the tour ask to reset a fresh workspace, which held the headless smoke on the dialog until it timed out. The course record still shows them, labelled, where the record is the subject: the schedule, the materials and each outcome's linked sessions.

Reverse it if: the owner wants the term's samples to count as the plan the lecturer starts from.

To reverse: `planSummary` and `teachingPlanMarkdown` in `src/lib/teachingPlan.ts`, `src/ui/screens/Inbox.tsx`, `src/ui/screens/Courses.tsx`, `src/app/runs.ts`, `src/app/moods.ts`, the `session-saved` predicate in `src/demo/runner.ts` and `hasSavedWork` in `src/demo/DemoOverlay.tsx`.

## 2026-10-22 19:43, D2: a lecturer's edit to a sample session

Options: (a) let a lecturer edit a sample session in place. (b) Sample sessions stay as written: the store refuses an edit to one, Teach offers Remove but not Edit on them, and every save is the lecturer's own, without the sample flag, slides, lab sheet or brief; a sample pack's cover names no one, where the lecturer's says who prepared it.

Chosen: (b), because CLAUDE.md now says a lecturer's own artefacts never carry model text, and an edit in place would either put a lecturer's words inside a record labelled synthetic or carry the build session's slides into the lecturer's pack. The samples' records name Dr Sobri only because the backup needs a person on every record, so the cover does not repeat it.

Reverse it if: a slide editor for lecturers lands; the save then keeps the lecturer's own slides and strips only the flag.

To reverse: `saveTeachingSession` in `src/app/store.ts`, `SessionCard` in `src/ui/screens/CourseWorkspace.tsx`, the cover in `sessionDeck` (`src/lib/slides.ts`), and the last test in `src/prove-materials.ts`.

## 2026-10-22 20:12, D5a: how History finds the decision behind a version

Options: (a) the latest decision on the course's newest brief, whatever its outcome and whenever it was recorded. (b) Read the event log: before the version's `version-adopted` event, each person's standing decision on each brief, and of those the latest to adopt a change, bound to the version the revision started from; otherwise "No decision on record for this change" (`authorisingDecision`).

Chosen: (b), because the plan says the link is found through the `decision-recorded` and `version-adopted` events, and only (b) refuses a decision taken after the change, one amended to retain before it, or one about another version. The first version on record says so instead of claiming a missing decision.

Reverse it if: the owner wants a self-recorded decision on a shared course to be shown as not authorising until a second person confirms it.

To reverse: `authorisingDecision` in `src/lib/decisions.ts`, the version entry in `CurriculumHistoryPanel` (`src/ui/screens/CurriculumWorkspace.tsx`), and the last test in `src/prove-diff.ts`.

## 2026-10-22 20:13, D5a: which week's pack Update and History compare

Options: (a) always the week 6 pack, as the plan's table names it. (b) The first week whose topic teaches an outcome the version rewords or adds, taking the lecturer's own session in that week before the sample one (`changedOutcomeWeek`, `sessionInWeek`), the rule `suggestedWeek` already follows.

Chosen: (b), because for the tour's change it is week 6, so the plan's view is what the judge sees, and for any other change it still picks the class the change reaches first instead of an unrelated week. When no session teaches the change, the screen says no pack is compared.

Reverse it if: the owner wants every changed pack listed in History rather than the first.

To reverse: `changedOutcomeWeek` and `sessionInWeek` in `src/lib/teachingPlan.ts`, their uses in `RevisionEditor` and `CurriculumHistoryPanel`.

## 2026-10-22 20:14, D5a: the colour of a changed region on a slide preview

Options: (a) the warn token, the colour the app uses for things to review. (b) A dashed outline in emerald on light slides and lime on forest ones, with the list of changes beside it carrying the meaning.

Chosen: (b), because the audit keeps warn for warnings and stale reviews and allows lime only on forest, and a changed slide is not a warning. The outline is never the only signal: the list names every change in words.

Reverse it if: the owner wants changes to read as warnings across the app.

To reverse: the outlines in `SlideSvg` (`src/ui/primitives/DeckPreview.tsx`).

## 2026-10-22 20:15, D5a: the unchanged topics in the two-column table

Options: (a) every topic, always, fifteen rows with one change among them. (b) The topics that changed, the totals and "Show all 15 topics (14 unchanged)", and a sentence instead of the table when no topic changed.

Chosen: (b), because the note's comparison tools (Confluence among them) fold what did not change, and the committee convention puts the change in front. The full table is one click away and the totals always show.

Reverse it if: a committee asks to see the whole schedule beside the change by default.

To reverse: `TwoColumn` in `src/ui/primitives/compare.tsx`.

## 2026-10-22 20:19, D5a: which Teach cards show what changed in their pack

Options: (a) only the week 6 card. (b) Every card whose pack, built under the version before the current one, differs from the pack built now, with "What changed in this pack since" and the slide diff behind it.

Chosen: (b), because the same generator applies the same rule to every pack, and showing week 6 alone would hide that the sample weeks 12, 13 and 14, which teach CLO5 too and which the revision flagged for review, changed as well. A card whose pack did not change shows nothing extra.

Reverse it if: the owner finds five disclosures in Teach crowd the tour's stop.

To reverse: `priorPack` in `TeachingPlanPanel` and the disclosure in `SessionCard` (`src/ui/screens/CourseWorkspace.tsx`).

## 2026-10-22 20:22, D5a: a renamed slide or a replaced one

Options: (a) pair slides by position whenever titles differ, so a new slide in an old slide's place reads as an edit. (b) Pair by title first (a pack's titles are unique), then by position only when the slide keeps some of its content; otherwise a removal and an addition.

Chosen: (b), because the proof caught (a) calling an unrelated slide a rename, and a lecturer reading "changed" would look for an edit that is not there. Records rarely rename a slide, so the position match is only a fallback.

Reverse it if: lecturer-written slides arrive and renames with all-new text become common.

To reverse: `match` inside `deckDiff` in `src/lib/diff.ts`, and the renamed-slide test in `src/prove-diff.ts`.
