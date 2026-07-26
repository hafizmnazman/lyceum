# Lyceum

**Know which of your courses have drifted from industry demand, and fix them
before your graduates feel it.**

A university has no independent, data-grounded way to know which of its courses
have drifted from industry demand until its graduates fail to get hired.
Curricula are reviewed on 3-to-5-year accreditation cycles while the market
reprices skills every 12 to 18 months. Lyceum is the missing mechanism: an
advisory layer that detects the drift, localises it to specific courses, helps
the faculty fix it on evidence, and then scores its own advice against the next
term's real results.

- **Demand truth.** Skill demand triangulated across four market sources
  (JobStreet, LinkedIn, Glassdoor, the TalentCorp Critical Occupations List),
  never a single feed. Every claim carries its receipts and a cross-source
  agreement level; when sources disagree, the UI says so.
- **Supply truth.** What a course teaches is read from published documents
  (the official syllabus pdf, real results files), not self-reported forms.
  Coordinators are verified; unverified edits are labelled.
- **Grounded remediation.** Every proposed change is stress-tested against a
  measured cohort of 200 real learners on a Rasch 1PL psychometric model before
  anyone commits. Every number traces to a learner and an item: the worked
  example lands on learner S-0488, item ML-14, P(correct) = 0.43.
- **Self-scoring.** Approving a change records a prediction; next term's
  uploads score it. The same predictor, backtested on a held-out cohort it
  never saw: predicted 0.534 against a real 0.536, mean error 0.009.

Four roles work in it (management, department, coordinator, lecturer), each
with a calm, task-first workspace. Seven agents sit on one shared data spine
and wake where the user works: Intake reads any dropped file (xlsx, csv, pdf,
pptx, docx) and shows what it read before anything files; Signal triangulates
the market; Curriculum reasons over the prerequisite graph; Authoring drafts
and critiques; Cohort runs the acceptance test; Analogy grounds brand-new
subjects in similar courses; Evaluator compiles the verdict for the gate.

The public wedge is the **Relevance Index**: every subject rated against
demand, built from public data, reachable without signing in. The rating exists
whether a university joins or not; joining gives the university the pen.

---

## Getting started

Requirements: Node.js 22.2+ (24 recommended) and a modern browser.

```bash
npm install
npm run dev        # web app on http://localhost:5173 + api on :8787
npm run build      # production build into dist/
npm run preview    # serve the build (app runs fully without the api server)
npm run typecheck  # tsc --noEmit
```

Live agents are optional. Copy `.env.example` to `.env` and add an
`ANTHROPIC_API_KEY` to make the five LLM agents (Intake, Signal, Authoring,
Analogy, Evaluator) call Claude with streaming; without a key every flow still
works on the deterministic offline path, labelled honestly as such in the UI.
The Cohort and Curriculum agents are real computation either way and never call
a model.

## Proofs

The maths, the flows, and the intake pipeline are covered by deterministic
proof scripts (no UI, no network):

```bash
npm run prove          # the spine and the canonical numbers (12 checks)
npm run prove:backtest # the closed-loop backtest (4 checks)
npm run prove:flow     # store, roles, state machine, analogy, closed loop (28 checks)
npm run prove:signal   # the staged Signal reveal (12 checks)
npm run prove:intake   # every demo file parses, interprets, files (18 checks)
npm run prove:all      # all of the above (74 checks)
```

Headless verification of the built app:

```bash
npm run build
node scripts/walk.mjs  # sign in, visit every screen, file a real upload, assert no errors
npm run smoke          # play the whole self-driving demo, assert the end state
```

## The self-driving demo

One **Play demo** control (bottom right) plays the entire storyline over the
real app: a lecturer files real documents through the actual parse pipeline,
management routes the drift the Signal agent finds, the coordinator drafts the
fix with the Authoring agent assisting and builds the test in the assessment
studio, the Cohort agent stress-tests it live on screen, management approves
with the evidence attached, and the closed loop records the prediction. A
simulated cursor performs every step with human pacing; nothing is mocked.
Press record, click Play once.

## Project structure

```text
server/               the thin api: /api/parse (5 formats) + /api/agent (streaming, fallback)
public/demo/          real sample files: results.xlsx, clo-survey.csv, syllabus.pdf, lecture-slides.pptx
src/
  types.ts            the Layer 0 data contract
  theme/              tokens + global styles (one system, no ad-hoc styling)
  lib/spine/          the audited Rasch spine (pure maths, reused from v2 byte-identical)
  data/               seed, cohorts, items, the multi-source market snapshots
  agents/             the seven agents: client wrappers, local interpreters, fixtures
  app/                store (persistent), roles, staged simulations
  ui/                 primitives, shell (sidebar, palette, agent panel), 15 screens
  demo/               the self-driving demo (script, runner, overlay)
scripts/              generators and headless verification
```

## License

Copyright (c) 2026 Hafiz Azman. All rights reserved. Proprietary software; see
[LICENSE](LICENSE).
