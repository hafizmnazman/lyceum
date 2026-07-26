# Lyceum v3: Decisions log

A running log of the calls made during the v3 build that are worth reviewing,
and anything deferred for the owner. The spec is `lyceum-v3-implementation.md`;
where it is concrete it was followed exactly.

---

## Carried from v2 unchanged (as the spec mandates)

- The audited Rasch spine (`src/lib/spine/*`, `rng`, `stats`, `backtest`), the
  200-student and 186-student cohorts, the canonical numbers (0.60 to 0.58,
  CLO4 0.45, S-0488 / ML-14 / P = 0.43, backtest MAE 0.009), the proposal state
  machine with all its adversarial-review fixes, and the four v2 proof suites.
  All 56 v2 checks passed against the v3 store before any screen was built.

## The frame (mentor feedback, adopted into the spec)

- Problem statement, goal, objectives, and the advisory positioning were added
  to the spec front matter. Demand is multi-source by contract (four prepared
  snapshots with per-source provenance and a cross-source agreement level);
  supply truth is the published record; coordinators carry a verified flag; the
  public Relevance Index is the wedge surface, reachable without signing in.

## Architecture calls

- **Thin Hono server** (`server/`) for file parsing and LLM streaming; the app
  is fully functional without it (spreadsheets parse in-browser via a
  code-split SheetJS load; interpretation falls back to a deterministic local
  interpreter). No key, no network, no server: every flow still works.
- **The local Intake interpreter is a real interpreter**, not a fixture: any
  results sheet, survey export, syllabus or slide deck with recognisable
  structure files correctly offline. It scans the first rows for the true
  header (real exports carry comment lines), reads sheet names for term and
  subject, normalises percent marks into 0..1, and distinguishes per-student
  1..10 survey ratings from aggregated results.
- **Live agents augment, never replace, the deterministic path.** Fixture
  output applies instantly (the demo and proofs depend on it); when a key is
  present the real Claude stream runs alongside, visible in the agent strip and
  panel, and where its shape is safe (the Authoring critique lines) it replaces
  the fixture text. Live calls are skipped while the demo clock is pinned so a
  recording is identical every run. Structured state (drafts, verdicts,
  ratings) is never mutated by free-text model output.
- **Persistence**: the mutable world snapshots to localStorage (versioned key,
  debounced), restored on load; "Reset workspace" in the account menu restores
  the seed. Timestamps are real in the browser and pinned in Node and in demo
  mode (`nowIso`), so the app feels live while proofs and recordings stay
  deterministic.
- **Routing** is hash-based (`#/screen`) so refresh, back, and deep links work;
  signed out, only Login and the public Index render.
- **Relevance ratings are deterministic** (`computeRelevanceRatings` over the
  audited demand/coverage fixture plus the per-source evidence), so the Index,
  Trends, and Courses all agree with the canonical story (CS220 worst, gap
  0.62) and the proofs can rely on them. The Signal LLM path narrates; it does
  not move the numbers.

## Product calls

- **Home is the Inbox for every role**; the landing screen is "what needs me",
  and the empty state ("Nothing needs you") is the honest resting state.
- **Verification seed**: Sobri, Lim, Rahman, Devan verified (institutional
  domain); Ms Tan deliberately unverified so the labelled-unverified state is
  visible in Assignments, Approval, and the account menu.
- **Sample-file chips on Upload** (results.xlsx, clo-survey.csv, syllabus.pdf,
  lecture-slides.pptx) fetch the real files from `public/demo` and push them
  through the exact drop pipeline. They exist because a scripted cursor cannot
  operate a native file dialog, and because a judge exploring alone should hit
  the hero flow in one click. The dropzone accepts arbitrary files as primary.
- **The office survives as the "Agents" page**, restyled to the v3 system
  (plain surfaces, line-drawn desks), state-driven from real agent runs. The
  per-page agent strip + right-side panel are the primary agent presence.

## Demo calls

- Three intro cards (problem, product, "watch it work"), then the cursor
  walkthrough; no architecture act (the Hackastone setup-requirements acts were
  a v2 submission constraint, not a v3 one). Runtime lands around five minutes.
- The runner was ported from v2 with two adaptations: scrolling targets the
  shell's main container, and person switching drives the real account menu.
- The walkthrough uploads TWO real files (results.xlsx, lecture-slides.pptx)
  through the genuine parse-interpret-confirm pipeline, on the fallback path,
  so the recording never depends on a network or key.
- Headless verification: `scripts/walk.mjs` (every screen, a real upload, a
  reload-persistence check, zero page errors) and `scripts/demo-smoke.mjs`
  (the whole demo under turbo: approval reached, prediction recorded, drill at
  P = 0.43, zero page errors).

## Deferred / needs owner

- **Music**: the v2 generated ambient track was not carried over; the demo is
  currently silent. Drop a royalty-free mp3 and wire `audio.ts` (the v2 file is
  parked as `src/demo/audio.ts.v2bak`) if sound is wanted for the recording.
- **PowerPoint strictness**: `lecture-slides.pptx` is minimal PresentationML.
  LibreOffice opens it; desktop PowerPoint may offer a repair on so spartan a
  deck. The intake parser (the thing being demonstrated) reads it perfectly.
- **Live-mode recording**: the demo records on the deterministic path by
  design. A live-mode take (key present, demo clock unpinned) would show real
  streaming but lose reproducibility; the owner can choose per recording.
- **Second programme / cross-programme ripple**: still single-programme, as in
  v2. The field is carried; populate when a screen needs it.
