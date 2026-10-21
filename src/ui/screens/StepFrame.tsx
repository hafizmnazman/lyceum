// The frame every loop step shares (plan Sections 5.2 and 7.3): the course and
// the step's place in the loop, the one line stating the question the step
// answers, the helper acting at this step in its header card (only that helper;
// people decide at Decide), the course switcher, and on narrow screens the loop
// as a horizontal strip under the title. The handoff to the next step closes
// the screen once its record exists.

import type { ReactNode } from "react";
import { LOOP_STEPS, stepDef, type CourseStep } from "../../app/loop.ts";
import type { HelperRole } from "../../app/moods.ts";
import { openStep, type AppState } from "../../app/store.ts";
import { subjectsForPerson } from "../../app/roles.ts";
import type { Person, Subject } from "../../types.ts";
import { CAST, Mascot, useCourseMoods } from "../mascots/index.tsx";
import { Page, PageHead, Select } from "../primitives/index.tsx";

export interface StepHelper { who: HelperRole; line: string }

/** The courses this person may open in the loop (an academic, only their assigned courses), and the one in view. */
export function courseContext(state: AppState, person: Person): { subjects: Subject[]; subject: Subject | undefined } {
  const own = subjectsForPerson(person.id, state.assignments);
  const subjects = state.subjects.filter((s) => person.orgRole !== "academic" || own.includes(s.id));
  return { subjects, subject: subjects.find((s) => s.id === state.selectedSubjectId) ?? subjects[0] };
}

export function StepFrame({ step, subject, subjects, helper, children }: {
  state: AppState; step: CourseStep; subject: Subject; subjects: Subject[]; helper?: StepHelper; children: ReactNode;
}) {
  const def = stepDef(step);
  const moods = useCourseMoods(subject.id);
  const cast = helper ? CAST.find((c) => c.who === helper.who)! : null;
  const mood = helper && moods ? moods.helpers[helper.who] : "resting";
  return (
    <Page wide>
      <PageHead
        eyebrow={<>{subject.id} · {subject.title} · {def.number ? "Step " + def.number + " of 6" : step === "course" ? "Setup" : "The record"}</>}
        title={def.label}
        question={def.question}
        actions={subjects.length > 1 ? <label className="course-switcher">Course<Select aria-label="Choose course" value={subject.id} onChange={(e) => openStep(e.target.value, step)}>{subjects.map((s) => <option key={s.id} value={s.id}>{s.id} · {s.title}</option>)}</Select></label> : undefined}
      />
      <LoopStrip subjectId={subject.id} active={step} />
      {helper && cast && mood !== "stuck" ? <div className="step-helper" data-demo-id={"helper-" + helper.who}>
        <Mascot who={helper.who} mood={mood} size={56} />
        <p><strong>{cast.name}</strong>, {cast.job.toLowerCase()}. {helper.line}</p>
      </div> : null}
      {children}
    </Page>
  );
}

/** The loop as a horizontal strip, shown on narrow screens where the sidebar rail is folded away. */
export function LoopStrip({ subjectId, active }: { subjectId: string; active: CourseStep }) {
  return (
    <nav className="loop-strip" aria-label="Steps of this course's loop">
      <ol>
        {LOOP_STEPS.map((s) => <li key={s.id}>
          <button type="button" data-demo-id={"strip-" + s.id} aria-current={active === s.id ? "page" : undefined} onClick={() => openStep(subjectId, s.id)}>{s.label}</button>
        </li>)}
      </ol>
    </nav>
  );
}
