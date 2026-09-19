import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatShortDate, formatWeekday } from "@/lib/dates";
import { demoSessions, subjectName } from "@/lib/demoData";

export function StudyPlannerPage() {
  const [activeId, setActiveId] = useState(demoSessions[1]?.id ?? demoSessions[0].id);
  const active = demoSessions.find((session) => session.id === activeId) ?? demoSessions[0];
  const days = [...new Set(demoSessions.map((session) => session.date))];

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Focus blocks"
        title="Study planner"
        description="Short sittings with a subject and a finish line. No timer API yet — this is the interface."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day}>
              <p className="mb-2 text-sm font-medium text-muted">
                {formatWeekday(day)}, {formatShortDate(day)}
              </p>
              <div className="space-y-2">
                {demoSessions
                  .filter((session) => session.date === day)
                  .map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setActiveId(session.id)}
                      className="w-full text-left"
                    >
                      <Card
                        className={
                          session.id === activeId
                            ? "border-primary/30 bg-primary-soft/40"
                            : ""
                        }
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-muted">
                              {session.startTime} – {session.endTime}
                            </p>
                            <h3 className="mt-1 font-medium">{subjectName(session.subjectId)}</h3>
                            <p className="mt-1 text-sm text-muted">{session.focus}</p>
                          </div>
                          <Badge tone={session.completed ? "mint" : "neutral"}>
                            {session.completed ? "Done" : "Planned"}
                          </Badge>
                        </div>
                      </Card>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <Card className="h-fit bg-[linear-gradient(180deg,#ffffff_0%,#f3f0ff_100%)]">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Selected block
          </p>
          <h2 className="mt-2 font-display text-2xl">{subjectName(active.subjectId)}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{active.focus}</p>
          <p className="mt-4 text-sm font-medium">
            {active.startTime} – {active.endTime} · {formatShortDate(active.date)}
          </p>
          <div className="mt-6 rounded-[1.25rem] bg-white p-4">
            <p className="font-medium">How to sit this</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted">
              <li>Phone in another room.</li>
              <li>Work the one focus line above.</li>
              <li>Stop when the block ends — even if the paragraph isn’t pretty.</li>
            </ol>
          </div>
          <Button className="mt-5 w-full" disabled>
            Start session (coming later)
          </Button>
        </Card>
      </div>
    </div>
  );
}
