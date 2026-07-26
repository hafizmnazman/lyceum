# Five minutes with Lyceum (for judges)

Everything below runs offline and deterministic; no keys or accounts needed.

```bash
npm install
npm run build
npm run preview     # open the printed URL
```

(`npm run dev` works too and additionally starts the api, which enables pdf
and pptx parsing plus live agent streaming when an ANTHROPIC_API_KEY is set.
Nothing below requires it.)

## Option A: hands off (2 minutes of setup, zero clicks)

Click **Play demo** (bottom right). The app performs the whole storyline
itself with a simulated cursor: a lecturer files real documents, management
routes the drift, the coordinator drafts the fix and tests it against a
measured cohort of 200 learners, and the approval records a prediction the
next term will score. Captions narrate every beat. Press Escape to take over
at any point: the demo drives the same interface you can.

## Option B: hands on (the same loop, your clicks)

1. **Sign in as Ms Tan** (lecturer). Home is her inbox: nothing needs her.
2. **Upload**: click the `results.xlsx` sample chip (or drop any spreadsheet
   of your own). The Intake agent shows what it read beside what it made of
   it; correct the subject if you like, then confirm. Watch the receipt: the
   filing feeds the cohort.
3. **Account menu (top right) -> switch to Prof Lim** (management). Open
   **Trends**: the Signal agent triangulates four market snapshots and lands
   on CS220, the widest gap. Expand the receipts: per-source evidence and the
   agreement level. Click **Route to coordinator**.
4. **Switch to Dr Sobri** (coordinator). His inbox has the ping, carrying the
   agent's findings. Open it: you land in the Course Studio.
5. Pick **Hybrid** mode (the Authoring agent drafts, you edit), then open the
   **Assessment** tab and generate test items against the blueprint.
6. Back on **Content**, click **Run the acceptance test**. The 16-second run
   is real computation revealed at human pace: 200 learners sampled from the
   CLO mastery survey. Then click **Trace it to one learner** and follow the
   drill to a single learner, a single item, P(correct) = 0.43.
7. **Send the verdict to management**, switch to Prof Lim, open
   **Approvals**: the change reads as a document (the diff, the cohort's
   answer, the Evaluator's recommendation). Approve it.
8. **Closed loop**: the approval recorded an open prediction. Reveal the
   historical backtest: predicted 0.534 against a real 0.536, mean error
   0.009. The system grades its own homework.

## Things worth poking

- **The public Relevance Index**: sign out (account menu) and click "View the
  public Relevance Index" on the login screen. This surface exists without a
  login; it is the product's front door.
- **Drop your own files.** Any xlsx or csv with CLO-shaped columns will parse
  and file, offline, through the same pipeline (pdf and pptx too when the api
  is running). The sample files are samples, not rails.
- **The Data room**: every source with its term, freshness, and
  verified-vs-self-entered state, plus the honesty labels the system keeps
  (demand from job ads is a proxy; ability is self-reported mastery).
- **Agents** (sidebar): the seven desks light up as agents actually run.
- **Reset workspace** (account menu) puts the seed back whenever you want a
  clean slate; the workspace otherwise persists across reloads, like the real
  tool it is.
