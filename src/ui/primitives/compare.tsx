// Before and after on screen (depth plan Section 6.2, the D5a core): the word-level redline, current against proposed in
// two columns, the structural slide diff over the pack previews, and the change summary as static text. Everything comes
// from lib/diff.ts, which reads records only. Colours are tokens (global.css); strikethrough and underline carry each change
// as well as colour, hidden labels name it for a screen reader, and nothing animates.

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { deckDiff, hoursDelta, topicDeltas, wordDiff, type PartChange, type SlidePart, type TopicDelta, type TopicHours } from "../../lib/diff.ts";
import { previewSlides } from "../../lib/deckLayout.ts";
import type { DeckSpec } from "../../lib/slides.ts";
import type { CourseDefinition } from "../../types.ts";
import { SlideSvg, type SlideHighlight } from "./DeckPreview.tsx";
import { Button, Tag } from "./index.tsx";

/** One text before and after, in one run of prose: what went struck through in the danger token, what came underlined in
 *  the emerald text token, each with a hidden "deleted" or "inserted". With `hide`, the clean new text alone. */
export function Redline({ before, after, hide = false }: { before: string; after: string; hide?: boolean }) {
  if (hide) return <span className="redline">{after}</span>;
  return <span className="redline">{wordDiff(before, after).map((r, i) => r.kind === "kept" ? <span key={i}>{r.text}</span>
    : r.kind === "deleted" ? <del key={i}><span className="sr-only">deleted: </span>{r.text}</del>
    : <ins key={i}><span className="sr-only">inserted: </span>{r.text}</ins>)}</span>;
}

/** What the marks mean, in words and icons, and the "Hide changes" switch for the clean text. */
export function RedlineControls({ hide, onToggle }: { hide: boolean; onToggle: () => void }) {
  return <div className="redline-controls">
    <p className="redline-legend"><span><Minus size={14} aria-hidden /> <span className="redline-del">struck through</span>: removed</span>
      <span><Plus size={14} aria-hidden /> <span className="redline-ins">underlined</span>: added</span></p>
    <Button aria-pressed={hide} onClick={onToggle} data-demo-id="redline-hide">Hide changes</Button>
  </div>;
}

/** Each outcome that changed between two versions: its wording as a redline, a new Bloom level in words, an added outcome
 *  all inserted and a removed one all struck. Says so when no outcome changed. */
export function OutcomeChanges({ before, after }: { before: CourseDefinition; after: CourseDefinition }) {
  const [hide, setHide] = useState(false);
  const rows = [
    ...after.outcomes.map((o) => ({ o, was: before.outcomes.find((b) => b.id === o.id) })).filter(({ o, was }) => !was || was.text !== o.text || was.bloomLevel !== o.bloomLevel)
      .map(({ o, was }) => ({ id: o.id, label: o.label, level: was && was.bloomLevel !== o.bloomLevel ? was.bloomLevel + " to " + o.bloomLevel : o.bloomLevel, before: was?.text ?? "", after: o.text, kind: was ? "changed" : "added" })),
    ...before.outcomes.filter((b) => !after.outcomes.some((o) => o.id === b.id)).map((b) => ({ id: b.id, label: b.label, level: b.bloomLevel, before: b.text, after: "", kind: "removed" })),
  ];
  if (!rows.length) return <p className="muted">No outcome changed.</p>;
  return <div className="outcome-changes" data-demo-id="outcome-redline">
    <RedlineControls hide={hide} onToggle={() => setHide(!hide)} />
    <ul className="redline-list">{rows.map((r) => <li key={r.id}>
      <strong>{r.label}</strong> <span className="muted">{r.level}{r.kind === "added" ? ", added" : r.kind === "removed" ? ", removed" : ""}</span>
      <p>{r.kind === "removed" && hide ? <span className="muted">Removed in the new version.</span> : <Redline before={r.before} after={r.after} hide={hide} />}</p>
    </li>)}</ul>
  </div>;
}

const hoursText = (h: TopicHours | null) => !h ? "Not in this version"
  : h.lecture !== null && h.lab !== null ? h.contact + " h: " + h.lecture + " lecture, " + h.lab + " lab" : h.contact + " h";
const STATUS: Record<TopicDelta["status"], string> = { added: "Added", removed: "Removed", changed: "Changed", moved: "Moved", unchanged: "Unchanged" };

/** Topics and hours, current against proposed (the committee convention): a table with the delta in words, the changed rows
 *  first with every changed cell outlined, the unchanged ones folded behind a button, the totals, and the assessment plan said
 *  to be unchanged when it is. */
export function TwoColumn({ before, after, beforeLabel, afterLabel }: { before: CourseDefinition; after: CourseDefinition; beforeLabel: string; afterLabel: string }) {
  const [all, setAll] = useState(false);
  const deltas = topicDeltas(before, after);
  const changed = deltas.filter((d) => d.status !== "unchanged"), shown = all ? deltas : changed;
  const total = (defn: CourseDefinition) => defn.topics.reduce((n, t) => n + t.contactHours, 0);
  const hoursChanged = (d: TopicDelta) => d.changed.some((c) => c === "contact" || c === "lecture" || c === "lab");
  const assessmentChanged = JSON.stringify(before.assessment ?? []) !== JSON.stringify(after.assessment ?? []);
  return <div className="two-column" data-demo-id="hours-two-column">
    {!shown.length ? <p>No topic or hour changed: {total(before)} contact hours in both.</p> : <table className="record-table diff-table">
      <caption>Topics and contact hours, {beforeLabel} against {afterLabel}{all ? "" : ": the topics that changed"}</caption>
      <thead><tr><th scope="col">Week</th><th scope="col">Topic</th><th scope="col">{beforeLabel}</th><th scope="col">{afterLabel}</th><th scope="col">Change</th></tr></thead>
      <tbody>{shown.map((d) => <tr key={d.id} className={"diff-row-" + d.status}>
        <td data-label="Week" className={d.changed.includes("week") && d.status !== "added" && d.status !== "removed" ? "diff-cell" : undefined}>
          {d.week ? (d.week.after ?? "Not set") + (d.week.before !== d.week.after ? " (was " + (d.week.before ?? "not set") + ")" : "") : d.status === "added" ? "New" : "Gone"}</td>
        <th scope="row" data-label="Topic" className={d.changed.includes("title") && d.status === "changed" ? "diff-cell" : undefined}>{d.title || "Untitled topic"} {d.status !== "unchanged" ? <Tag tone={d.status === "removed" ? "warn" : "accent"}>{STATUS[d.status]}</Tag> : null}</th>
        <td data-label={beforeLabel} className={d.status === "removed" || (hoursChanged(d) && d.status === "changed") ? "diff-cell" : undefined}>{hoursText(d.before)}</td>
        <td data-label={afterLabel} className={d.status === "added" || (hoursChanged(d) && d.status === "changed") ? "diff-cell" : undefined}>{hoursText(d.after)}</td>
        <td data-label="Change">{hoursDelta(d.delta)}{d.status === "moved" ? ", moved" : ""}</td>
      </tr>)}</tbody>
      <tfoot><tr><th scope="row" colSpan={2}>Contact hours outlined</th><td data-label={beforeLabel}>{total(before)} h</td><td data-label={afterLabel}>{total(after)} h</td><td data-label="Change">{hoursDelta(total(after) - total(before))}</td></tr></tfoot>
    </table>}
    {deltas.length > changed.length ? <Button variant="quiet" aria-expanded={all} onClick={() => setAll(!all)}>{all ? "Show only the topics that changed" : "Show all " + deltas.length + " topics (" + (deltas.length - changed.length) + " unchanged)"}</Button> : null}
    <p className="muted">{assessmentChanged ? "The assessment plan changed as well; the course record shows both versions." : "The assessment plan is unchanged."}</p>
  </div>;
}

const PART_LABEL: Record<SlidePart, string> = { title: "Title", body: "Text", right: "Second column", figure: "Figure", notes: "Speaker notes" };

function PartLines({ change }: { change: PartChange }) {
  const paired = change.removed.length === change.added.length;
  return <div className="slide-diff-part"><span className="eyebrow">{PART_LABEL[change.part]}</span>
    <ul>{paired ? change.removed.map((r, i) => <li key={i}><Redline before={r} after={change.added[i]} /></li>)
      : [...change.removed.map((r, i) => <li key={"r" + i}><del><span className="sr-only">deleted: </span>{r}</del></li>),
        ...change.added.map((a, i) => <li key={"a" + i}><ins><span className="sr-only">inserted: </span>{a}</ins></li>)]}</ul>
  </div>;
}

/** What changed between two packs built from records (pattern 6): each changed slide under both versions with the changed
 *  parts outlined, and the list of changes beside it, which is the description; nothing depends on the pixels. */
export function SlideDiffList({ before, after, beforeLabel, afterLabel, markSrc }: { before: DeckSpec; after: DeckSpec; beforeLabel: string; afterLabel: string; markSrc?: string }) {
  const changes = deckDiff(before, after);
  if (!changes.length) return <p className="muted">The pack is the same under {beforeLabel} and {afterLabel}.</p>;
  const was = previewSlides(before), now = previewSlides(after);
  return <ol className="slide-diff" data-demo-id="slide-diff">{changes.map((c, i) => {
    // Speaker notes have no place on the slide, so a notes change is in the list only.
    const marks: SlideHighlight[] = c.kind === "changed" ? c.parts.flatMap((p): SlideHighlight[] => (p.part === "notes" ? [] : [p.part])) : ["whole"];
    return <li key={i} className="slide-diff-item">
      <p className="slide-diff-head"><Tag tone="accent">{c.kind === "added" ? "Slide added" : c.kind === "removed" ? "Slide removed" : "Slide " + (c.afterIndex! + 1) + " changed"}</Tag> <strong>{c.title}</strong></p>
      <div className="slide-diff-thumbs">
        {c.beforeIndex !== null ? <figure><figcaption>{beforeLabel}</figcaption><SlideSvg slide={was[c.beforeIndex]} number={c.beforeIndex + 1} markSrc={markSrc} highlight={marks} /></figure> : null}
        {c.afterIndex !== null ? <figure><figcaption>{afterLabel}</figcaption><SlideSvg slide={now[c.afterIndex]} number={c.afterIndex + 1} markSrc={markSrc} highlight={marks} /></figure> : null}
      </div>
      {c.parts.map((p) => <PartLines key={p.part} change={p} />)}
    </li>;
  })}</ol>;
}

/** The change in one line of words, from the diffs ("1 outcome reworded, 1 topic added, 3 h added, 1 slide changed"). */
export function ChangeSummary({ text }: { text: string }) {
  return <p className="change-summary" data-demo-id="change-summary">{text === "no change" ? "Nothing changed between the two versions." : <><strong>What changed:</strong> {text}.</>}</p>;
}
