// Temporary placeholders for screens still being built. Each renders inside the
// real shell so the app is walkable end to end while screens land one by one.
// Every placeholder is replaced by a real screen file; nothing here ships.

import { EmptyState, Page, PageHead } from "../primitives/index.tsx";

function placeholder(title: string, body: string) {
  return function PlaceholderScreen() {
    return (
      <Page>
        <PageHead title={title} />
        <EmptyState title="This screen is being built" body={body} />
      </Page>
    );
  };
}

export const TrendsScreen = placeholder(
  "Trends",
  "The Signal agent triangulates market sources and surfaces the biggest drift.",
);
export const ApprovalScreen = placeholder(
  "Approvals",
  "Tested changes arrive here as documents: the diff, the verdict, the recommendation.",
);
export const ProgrammeScreen = placeholder(
  "Programme",
  "The degree by year, flagged subjects first.",
);
export const NewSubjectScreen = placeholder(
  "New subject",
  "Create a proposed subject and assign a coordinator; the Analogy agent grounds it.",
);
export const AssignmentsScreen = placeholder(
  "Assignments",
  "Who holds which hat on which subject.",
);
export const CoursesScreen = placeholder(
  "Courses",
  "Your subjects with the Curriculum agent's annotations.",
);
export const StudioScreen = placeholder(
  "Course Studio",
  "Draft changes in self, agent, or hybrid mode; build tests in the assessment studio.",
);
export const AcceptanceScreen = placeholder(
  "Acceptance test",
  "The staged run against the grounded cohort, then the drill-down to one learner.",
);
export const UploadScreen = placeholder(
  "Upload",
  "Drop any results sheet, survey export, syllabus, or slide deck; Intake reads it and you confirm.",
);
export const BacktestScreen = placeholder(
  "Closed loop",
  "Open predictions, scored predictions, and the historical backtest.",
);
export const DataRoomScreen = placeholder(
  "Data room",
  "Every data source, its term, freshness, and verified state.",
);
export const OfficeScreen = placeholder(
  "Agents",
  "The seven agents at their desks, driven by real system state.",
);
export const IndexScreen = placeholder(
  "Relevance Index",
  "Every subject rated against triangulated market demand, receipts attached.",
);
