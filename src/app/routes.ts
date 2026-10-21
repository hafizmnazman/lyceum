// Hash routes (plan Section 5.2): #/<screen> for the app's screens and
// #/course/<id>/<step> for a course's loop, so deep links, refresh and the back
// button keep working inside a course.

import { isCourseStep, stepDef, stepForTab, type CourseStep } from "./loop.ts";
import type { Screen } from "./roles.ts";
import type { AppState } from "./store.ts";

export const HASH_SCREENS: Screen[] = [
  "login", "index", "inbox", "trends", "approval", "programme", "new-subject", "assignments", "courses",
  "studio", "acceptance", "upload", "backtest", "dataroom", "office", "evaluation", "guide",
];

export interface CourseRoute { subjectId: string; step: CourseStep }
export type Route = { screen: Screen } | { course: CourseRoute };

export function parseRoute(hash: string): Route | null {
  const path = hash.replace(/^#\/?/, "");
  const course = /^course\/([^/]+)(?:\/([a-z]+))?\/?$/.exec(path);
  if (course) {
    const step = course[2] ?? "course";
    return isCourseStep(step) ? { course: { subjectId: decodeURIComponent(course[1]), step } } : null;
  }
  return (HASH_SCREENS as string[]).includes(path) ? { screen: path as Screen } : null;
}

type RouteState = Pick<AppState, "screen" | "courseStep" | "selectedSubjectId" | "studioTab">;

/** The loop step in view: the chosen rail step when the screen and tab still match it, otherwise the step the Studio tab belongs to. */
export function effectiveStep(s: RouteState): CourseStep | null {
  if (s.courseStep) {
    const def = stepDef(s.courseStep);
    if (def.screen === s.screen && (!def.tab || def.tab === s.studioTab)) return s.courseStep;
  }
  return s.screen === "studio" ? stepForTab(s.studioTab, null) : null;
}

export function hashFor(s: RouteState): string {
  const step = effectiveStep(s);
  return step && s.selectedSubjectId ? "#/course/" + encodeURIComponent(s.selectedSubjectId) + "/" + step : "#/" + s.screen;
}
