// Nav metadata: label + icon per screen. One icon set (Lucide), stroke 1.75,
// never emoji (spec 3.2).

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  CheckSquare,
  Database,
  FlaskConical,
  Globe,
  Inbox,
  Layers,
  PenLine,
  PlusSquare,
  Target,
  TrendingUp,
  UploadCloud,
  Users,
} from "lucide-react";
import type { Screen } from "../../app/roles.ts";

export const NAV_META: Record<Exclude<Screen, "login">, { label: string; icon: LucideIcon }> = {
  inbox: { label: "Inbox", icon: Inbox },
  trends: { label: "Trends", icon: TrendingUp },
  approval: { label: "Approvals", icon: CheckSquare },
  programme: { label: "Programme", icon: Layers },
  "new-subject": { label: "New subject", icon: PlusSquare },
  assignments: { label: "Assignments", icon: Users },
  courses: { label: "Courses", icon: BookOpen },
  studio: { label: "Course Studio", icon: PenLine },
  acceptance: { label: "Acceptance test", icon: FlaskConical },
  upload: { label: "Upload", icon: UploadCloud },
  backtest: { label: "Closed loop", icon: Target },
  dataroom: { label: "Data room", icon: Database },
  office: { label: "Agents", icon: Bot },
  index: { label: "Relevance Index", icon: Globe },
};

export function screenLabel(screen: Screen): string {
  if (screen === "login") return "Sign in";
  return NAV_META[screen]?.label ?? screen;
}
