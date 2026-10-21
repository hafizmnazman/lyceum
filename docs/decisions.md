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
