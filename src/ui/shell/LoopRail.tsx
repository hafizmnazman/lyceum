// The loop rail (plan Sections 5.2 and 7.3): the selected course's loop in the
// sidebar, in the same order and with the same names as the demo, the deck and
// the film. Each item shows a neutral role icon, the step name, what exists (or
// what is open) and, in words, whether its record exists this term ("Done") or
// it comes next. The ring at the top of the rail carries the host's leaf.

import type { LucideIcon } from "lucide-react";
import { BookOpen, Check, FileSearch, GraduationCap, History, PenLine, Presentation, Scale, Telescope } from "lucide-react";
import { LOOP_STEPS, loopState, type CourseStep } from "../../app/loop.ts";
import { effectiveStep } from "../../app/routes.ts";
import { openStep, type AppState } from "../../app/store.ts";
import { HOST_LEAF } from "../mascots/host.tsx";
import { color } from "../../theme/tokens.ts";
import { Ring } from "../primitives/loop.tsx";

const ICONS: Record<CourseStep, LucideIcon> = {
  course: BookOpen, watch: Telescope, report: FileSearch, decide: Scale, update: PenLine, teach: Presentation, learn: GraduationCap, history: History,
};

export function LoopRail({ state, subjectId }: { state: AppState; subjectId: string }) {
  const subject = state.subjects.find((s) => s.id === subjectId);
  const loop = loopState(state, subjectId);
  const inThisCourse = state.selectedSubjectId === subjectId;
  const active = inThisCourse ? effectiveStep(state) : null;
  const leaf = <g transform="translate(-4 -2) scale(0.25)" aria-hidden><path d={HOST_LEAF} fill={color.lime} stroke={color.forest} strokeWidth={6} strokeLinejoin="round" /></g>;
  return <section className="loop-rail" aria-labelledby="loop-rail-title" data-demo-id="loop-rail">
    <div className="rail-head">
      <Ring loop={loop} size={44} compact leaf={leaf} />
      <div>
        <span className="eyebrow">Course loop{loop.window.term ? " · " + loop.window.term : ""}</span>
        <span id="loop-rail-title" className="rail-course"><span className="tabular">{subjectId}</span>{subject ? " " + subject.title : ""}</span>
      </div>
    </div>
    <ol className="rail-list">
      {LOOP_STEPS.map((step) => {
        const st = loop.steps.find((x) => x.id === step.id)!;
        const Icon = ICONS[step.id];
        const isNext = !st.done && step.id === loop.next;
        return <li key={step.id}>
          <button type="button" className="rail-item" data-demo-id={"rail-" + step.id} aria-current={active === step.id ? "page" : undefined} onClick={() => openStep(subjectId, step.id)}>
            <Icon className="rail-icon" size={24} strokeWidth={1.75} aria-hidden />
            <span className="rail-text"><span className="rail-label">{step.label}</span><span className="rail-count">{st.note ?? st.count}</span></span>
            {st.done ? <span className="rail-status is-done"><Check size={14} strokeWidth={2.25} aria-hidden />Done</span>
              : isNext ? <span className="rail-status is-next">Next</span> : null}
          </button>
        </li>;
      })}
    </ol>
  </section>;
}
