// The self-driving demo script (spec Section 9): the storyline the cursor
// performs over the real app. Every step targets a data-demo-id that exists in
// the shipped screens; `wait` steps poll real store state, never a duration.
//
// The storyline: a lecturer files real documents, management sees the drift
// and routes it, the coordinator drafts the fix (agent assisting) and builds
// the test, the cohort stress-tests it, management approves with evidence,
// and the closed loop records the prediction that next term will score.

export interface DemoStep {
  caption: string;
  target?: string; // data-demo-id
  action: "move" | "click" | "type" | "wait" | "switchUser" | "hold";
  value?: string; // text for type, personId for switchUser, predicate for wait
  settleMs: number; // pause after the action
  scroll?: string; // "top" | "bottom" | a data-demo-id to centre
}

export const SCRIPT: DemoStep[] = [
  // ---- Act: the lecturer's morning ----
  {
    caption: "Ms Tan, a lecturer, signs in. Her inbox is calm: nothing needs her.",
    action: "switchUser",
    value: "P-TAN",
    settleMs: 2600,
  },
  {
    caption: "She has this term's results to file.",
    target: "nav-upload",
    action: "click",
    settleMs: 1400,
  },
  {
    caption: "One click stands in for the drop: a real xlsx, messy headers and all.",
    target: "sample-results",
    action: "click",
    settleMs: 600,
  },
  {
    caption: "The Intake agent reads the sheet and shows exactly what it read.",
    action: "wait",
    value: "intake-staged",
    settleMs: 2400,
  },
  {
    caption: "Left: the raw table. Right: what the agent made of it. She confirms.",
    action: "hold",
    settleMs: 5200,
  },
  {
    caption: "Confirmed. Percent marks become grounded CLO evidence on CS310.",
    target: "upload-confirm",
    action: "click",
    settleMs: 1200,
  },
  {
    caption: "Filed. This ground now feeds the cohort every test runs against.",
    action: "wait",
    value: "intake-filed",
    settleMs: 3600,
  },
  {
    caption: "Slides too: any document becomes ground. The agent reads the pptx.",
    target: "sample-slides",
    action: "click",
    settleMs: 600,
  },
  {
    caption: "Five slides of lecture content, classified and mapped to CS220.",
    action: "wait",
    value: "intake-staged",
    settleMs: 3400,
  },
  {
    caption: "Confirm, and the material files against the subject.",
    target: "upload-confirm",
    action: "click",
    settleMs: 2000,
  },

  // ---- Act: management sees the drift ----
  {
    caption: "Prof Lim, management, opens Trends.",
    action: "switchUser",
    value: "P-LIM",
    settleMs: 1200,
  },
  {
    caption: "The Signal agent triangulates four market snapshots, live.",
    target: "nav-trends",
    action: "click",
    settleMs: 800,
  },
  {
    caption: "Reading sources, extracting rising skills, mapping them onto outcomes.",
    action: "wait",
    value: "signal-done",
    settleMs: 2800,
  },
  {
    caption: "Three of four sources agree: machine learning demand is outrunning CS220.",
    action: "hold",
    settleMs: 5600,
  },
  {
    caption: "One decision: route it to the person who owns the fix.",
    target: "trends-route",
    action: "click",
    settleMs: 2600,
  },

  // ---- Act: the coordinator fixes it ----
  {
    caption: "Dr Sobri, the CS220 coordinator, finds the ping waiting.",
    action: "switchUser",
    value: "P-SOBRI",
    settleMs: 1200,
  },
  {
    caption: "The ping carries the agent's findings, not just a notification.",
    target: "nav-inbox",
    action: "click",
    settleMs: 3000,
  },
  {
    caption: "He opens the flagged subject.",
    target: "inbox-open-top",
    action: "click",
    settleMs: 3400,
  },
  {
    caption: "The Course Studio: hybrid mode, the Authoring agent drafts, he decides.",
    target: "mode-hybrid",
    action: "click",
    settleMs: 3800,
  },
  {
    caption: "He sharpens one outcome line himself. Human judgment stays in charge.",
    target: "studio-draft-clo-0",
    action: "type",
    value: " Transformers included.",
    settleMs: 2200,
  },
  {
    caption: "The test is not an afterthought: the assessment studio drafts against a blueprint.",
    target: "tab-assessment",
    action: "click",
    settleMs: 2200,
  },
  {
    caption: "A test draft opens with the subject's outcome weights.",
    target: "assessment-start",
    action: "click",
    settleMs: 2600,
  },
  {
    caption: "Items generated to the blueprint: outcomes weighted, Bloom mix respected.",
    target: "assessment-generate",
    action: "click",
    settleMs: 5000,
  },
  {
    caption: "Back to the change itself.",
    target: "tab-content",
    action: "click",
    settleMs: 1600,
  },
  {
    caption: "Now the question that matters: can this cohort actually handle it?",
    target: "studio-run-test",
    action: "click",
    settleMs: 1000,
  },
  {
    caption: "200 real learners, sampled from the CLO mastery survey. Watch it run.",
    action: "wait",
    value: "run-done",
    settleMs: 3000,
  },
  {
    caption: "Projected mastery falls to 0.58. The verdict is grounded, not guessed.",
    action: "hold",
    settleMs: 4600,
    scroll: "acceptance-verdict",
  },
  {
    caption: "And it traces. From the verdict to one learner, one item, one probability.",
    target: "drill-open",
    action: "click",
    settleMs: 800,
  },
  {
    caption: "Learner S-0488, item ML-14: P(correct) = 0.43. None of it is invented.",
    action: "wait",
    value: "drill-done",
    settleMs: 4400,
  },
  {
    caption: "The tested change goes up to management.",
    target: "acceptance-submit",
    action: "click",
    settleMs: 2200,
  },

  // ---- Act: the decision, and the loop ----
  {
    caption: "Management reads the change as a document: the diff, the verdict, the recommendation.",
    action: "switchUser",
    value: "P-LIM",
    settleMs: 1000,
  },
  {
    caption: "What changes, what the cohort says, what the Evaluator recommends.",
    target: "nav-approval",
    action: "click",
    settleMs: 5200,
  },
  {
    caption: "Approve, and the decision records a prediction it will be judged by.",
    target: "approve-btn",
    action: "click",
    settleMs: 3200,
  },
  {
    caption: "The closed loop: every approval is a claim the next term will score.",
    target: "nav-backtest",
    action: "click",
    settleMs: 2600,
  },
  {
    caption: "The credential: the same predictor, backtested on a held-out cohort.",
    target: "reveal-backtest",
    action: "click",
    settleMs: 1200,
  },
  {
    caption: "Predicted 0.534 against a real 0.536. Mean error 0.009. It grades its own homework.",
    action: "hold",
    settleMs: 5600,
    scroll: "backtest-result",
  },
  {
    caption: "Seven agents, four roles, one data spine. The office shows what is running.",
    target: "nav-office",
    action: "click",
    settleMs: 5200,
  },
  {
    caption: "Lyceum. Know which courses have drifted, fix them on evidence, and let the results keep score.",
    action: "hold",
    settleMs: 3600,
  },
];

// ---- runtime estimate (for the progress bar) ----
import { PRE_ACT_MS, SIGNAL_REVEAL_MS, ACCEPTANCE_REVEAL_MS, DRILL_REVEAL_MS, TWEEN_MS, TYPE_CHAR_MS, SWITCH_PAD_MS } from "./timing.ts";

const WAIT_MS: Record<string, number> = {
  "intake-staged": 900,
  "intake-filed": 400,
  "signal-done": SIGNAL_REVEAL_MS,
  "run-done": ACCEPTANCE_REVEAL_MS,
  "drill-done": DRILL_REVEAL_MS,
};

function stepCost(step: DemoStep): number {
  switch (step.action) {
    case "move":
      return TWEEN_MS + step.settleMs;
    case "switchUser":
      return TWEEN_MS * 2 + PRE_ACT_MS + SWITCH_PAD_MS + step.settleMs;
    case "click":
      return TWEEN_MS + PRE_ACT_MS + step.settleMs;
    case "type":
      return TWEEN_MS + PRE_ACT_MS + (step.value?.length ?? 0) * TYPE_CHAR_MS + step.settleMs;
    case "wait":
      return (step.value ? (WAIT_MS[step.value] ?? 0) : 0) + step.settleMs;
    default:
      return step.settleMs;
  }
}

export const INTRO_HOLDS = [6400, 8400, 6000];
const SCROLL_ALLOWANCE_MS = 9000;

/** Deterministic full-speed runtime estimate in ms (intro + walkthrough). */
export function estimateTotalMs(): number {
  return (
    INTRO_HOLDS.reduce((a, b) => a + b, 0) +
    SCRIPT.reduce((a, s) => a + stepCost(s), 0) +
    SCROLL_ALLOWANCE_MS
  );
}
