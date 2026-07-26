// The Inbox: home for every role (spec 6.1). Opens on the one thing that needs
// this person now; everything else is a quiet list below. The calm empty state
// is the honest resting state of a working system.

import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Notification } from "../../types.ts";
import {
  currentPerson,
  inboxFor,
  openNotification,
  personWithHat,
  useStore,
} from "../../app/store.ts";
import { Button, Card, EmptyState, Page, PageHead, Row, Tag } from "../primitives/index.tsx";

const KIND_LABEL: Record<Notification["kind"], string> = {
  "ping-update": "Update requested",
  "ping-new-subject": "New subject requested",
  "review-request": "Review requested",
  "test-done": "Acceptance test finished",
  approved: "Change approved",
  rejected: "Change rejected",
};

const KIND_TONE: Record<Notification["kind"], "accent" | "warn" | "ok" | "danger"> = {
  "ping-update": "warn",
  "ping-new-subject": "warn",
  "review-request": "accent",
  "test-done": "accent",
  approved: "ok",
  rejected: "danger",
};

export function InboxScreen() {
  useStore(); // subscribe so the inbox re-renders on every store change
  const person = currentPerson();
  if (!person) return null;
  const items = inboxFor(person.id);
  const unread = items.filter((n) => !n.read);
  const top = unread[0];
  const rest = items.filter((n) => n.id !== top?.id);

  return (
    <Page>
      <PageHead
        title={`Good day, ${person.name.split(" ").slice(-1)[0]}`}
        context={
          unread.length === 0
            ? "Nothing needs you right now."
            : `${unread.length} thing${unread.length === 1 ? " needs" : "s need"} your attention.`
        }
      />

      {top ? (
        <Card focal data-demo-id="inbox-top">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Tag tone={KIND_TONE[top.kind]}>{KIND_LABEL[top.kind]}</Tag>
            {top.subjectId ? <span className="num" style={{ fontSize: 13, color: "var(--ink-2)" }}>{top.subjectId}</span> : null}
          </div>
          {top.agentFindings ? (
            <p style={{ margin: "0 0 14px", fontSize: 14, maxWidth: 620 }}>{top.agentFindings}</p>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              variant="primary"
              data-demo-id="inbox-open-top"
              onClick={() => openNotification(top.id)}
            >
              Open {top.subjectId ?? "it"} <ArrowRight size={15} />
            </Button>
            {sender(top) ? (
              <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{sender(top)}</span>
            ) : null}
          </div>
        </Card>
      ) : (
        <EmptyState
          title="Inbox zero"
          body="Pings from management, review requests from lecturers, and finished test runs land here, each carrying the agent context that prompted it."
          action={
            <span style={{ color: "var(--ok)", display: "inline-flex", gap: 6, alignItems: "center", fontSize: 13 }}>
              <CheckCircle2 size={15} /> All caught up
            </span>
          }
        />
      )}

      {rest.length > 0 ? (
        <div style={{ marginTop: 28 }}>
          {rest.map((n) => (
            <Row key={n.id} onClick={() => openNotification(n.id)} data-demo-id={`inbox-${n.id}`}>
              <Tag tone={KIND_TONE[n.kind]}>{KIND_LABEL[n.kind]}</Tag>
              <span className="num" style={{ fontSize: 13, color: "var(--ink-2)", width: 56 }}>
                {n.subjectId ?? ""}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: n.read ? "var(--ink-3)" : "var(--ink)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {n.agentFindings ?? KIND_LABEL[n.kind]}
              </span>
              {!n.read ? (
                <span aria-label="Unread" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
              ) : null}
            </Row>
          ))}
        </div>
      ) : null}
    </Page>
  );

  function sender(n: Notification): string | null {
    if (n.kind === "ping-update" || n.kind === "ping-new-subject") return "From management, via the Signal agent.";
    if (n.kind === "review-request" && n.subjectId) {
      const coord = personWithHat(n.subjectId, "coordinator");
      return coord && coord.id === person!.id ? "From the subject's lecturer." : "From the coordinator.";
    }
    if (n.kind === "test-done") return "From the Cohort agent.";
    return null;
  }
}
