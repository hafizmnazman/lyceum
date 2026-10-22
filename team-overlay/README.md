# Lyceum

Lyceum turns real job postings into a course decision with receipts, every semester, inside the tools lecturers already use. A lecturer runs one loop per course and term: Watch (postings fetched on request, each with its link, date and fingerprint), Report (exact quotations, the reviewed denominator, counts with intervals, a mapping, a brief), Decide (a decision record by a person), Update (a checked revision, adopted as a new version), Teach (an editable teaching pack) and Learn (results matched to the version taught, with n of N). Nothing changes a course without a person.

This is the team repo, and it is private. Lyceum is a working local prototype today: the app runs in the browser with a small local API, and no AI key is needed.

## Run it

You need Node 24 or newer, and Chrome or Edge for the browser checks.

```
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if `npm` is blocked. Open the URL it prints and choose Dr Sobri on the sign-in screen for the full lecturer workflow, or press **Play demo** there for the self-driving tour (about 7 minutes).

`npm run dev` also starts the local API, which live job-board collection and file parsing need. Copy `.env.example` to `.env` only if you want the optional model features, and never commit `.env`.

## Check your work

```
npm run typecheck
npm run prove:all     # 185 checks in seventeen suites
npm run build
npm run smoke         # the full demo tour in a headless browser
```

More browser checks: `npm run smoke:integrity`, `npm run smoke:workspace`, `npm run smoke:curriculum` (run `npm run build` first). The guide, the palette and the prose: `node scripts/generate-guide.mjs --check`, `node scripts/contrast-check.mjs`, `node scripts/dash-scan.mjs`. The pitch: `npm run deck`.

## Read these first

| file | what it is |
|:--|:--|
| [FEEDBACK.md](FEEDBACK.md) | what the organizer said, what's done and what's open, on one page |
| [docs/lyceum-upgrade-plan.md](docs/lyceum-upgrade-plan.md) | the master plan for Amsterdam (Track A) and after (Track B), with the team lanes in Section 17.3 |
| [docs/as-built.md](docs/as-built.md) | what is built and verified, with every check and its date, and what needs a person |
| [docs/claims.md](docs/claims.md) | every number on every surface, with its source and the check that holds it |
| [docs/decisions.md](docs/decisions.md) | every choice of the 22 October build, with how to reverse it; [DECISIONS.md](DECISIONS.md) keeps the record before that |
| [docs/demo-script.md](docs/demo-script.md) | the booth walkthrough: what to do, what to say, what not to claim |
| [docs/presentation/lyceum-brief.pdf](docs/presentation/lyceum-brief.pdf) | a three-page summary of the idea and the review |
| [docs/research/](docs/research/) | the dated research notes behind every figure |
| [docs/lecturer-guide.md](docs/lecturer-guide.md) | how each screen is used |
| [JUDGES.md](JUDGES.md) | the five-minute walkthrough |

## Where the code is

```
src/
  ui/screens/     one file per loop step plus Home, Courses, How it works, Evaluation and the landing page
  ui/primitives/  shared components
  ui/mascots/     the host and the seven helpers, drawn in code
  app/            the store, roles, the loop and its ring, the event log, moods
  lib/            the deterministic core: evidence maths, collection, curriculum checks, slides, benchmark
  data/           seed data, sourced figures, the labelled scan benchmark
  demo/           the self-driving demo
  prove-*.ts      the automated checks
server/           the local API: file parsing, job-board collection, optional model streaming
scripts/          browser smokes, screenshot and document generators
mcp/              the local door: a read-only MCP server over an exported workspace
deck/             the pitch, an HTML deck with its PDF and PPTX export
video/            the film: script, storyboard, style, the capture and the Remotion project
docs/             plan, as-built, claims, decisions, research, presentation material, history
```

## How we work

We work swarm style: everyone builds in their own branches, and Hafiz consolidates.

- `main` is Hafiz's. Don't push to it; it moves when work is consolidated.
- Branch from `main` and name the branch after yourself and the work, for example `aina/mascot-art`. Push as often as you like. Nothing in a branch can break `main`, so experiment freely.
- Overlap is fine. If two people try the same thing, the better version wins, or the best parts of both.
- When something is worth a look, open a pull request into `main` and fill in the template. Hafiz reviews it and takes what helps into `main`, sometimes only part of it, then closes the PR. A closed PR is not a rejected idea.
- When `main` moves, merge it into your branch before you carry on.
- Good places to start: the open work in [FEEDBACK.md](FEEDBACK.md).

Ground rules:

- No secrets, keys or personal data in the repo. `.env` is ignored for a reason.
- Keep claims honest. Synthetic data is labelled synthetic, numbers come with their source, and anything not built yet is called planned.
- Keep the checks green on your branch, or say in the PR what is broken.
- One idea per branch keeps review quick.
