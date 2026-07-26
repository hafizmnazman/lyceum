// The screen registry: one component per Screen id. As real screens land they
// replace their placeholder import here and nowhere else.

import type { ComponentType } from "react";
import type { Screen } from "../../app/roles.ts";
import { LoginScreen } from "./Login.tsx";
import { InboxScreen } from "./Inbox.tsx";
import {
  AcceptanceScreen,
  ApprovalScreen,
  AssignmentsScreen,
  BacktestScreen,
  CoursesScreen,
  DataRoomScreen,
  IndexScreen,
  NewSubjectScreen,
  OfficeScreen,
  ProgrammeScreen,
  StudioScreen,
  TrendsScreen,
  UploadScreen,
} from "./placeholders.tsx";

export const SCREENS: Record<Screen, ComponentType> = {
  login: LoginScreen,
  index: IndexScreen,
  inbox: InboxScreen,
  trends: TrendsScreen,
  approval: ApprovalScreen,
  programme: ProgrammeScreen,
  "new-subject": NewSubjectScreen,
  assignments: AssignmentsScreen,
  courses: CoursesScreen,
  studio: StudioScreen,
  acceptance: AcceptanceScreen,
  upload: UploadScreen,
  backtest: BacktestScreen,
  dataroom: DataRoomScreen,
  office: OfficeScreen,
};
