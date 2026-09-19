import { Link } from "react-router-dom";
import { BookOpen, CalendarDays, CheckSquare, Timer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoState } from "@/contexts/DemoStateContext";
import { useGreeting } from "@/hooks/useGreeting";
import { formatLongDate, dueLabel } from "@/lib/dates";
import {
  demoActivity,
  demoExams,
  demoProfile,
  demoWeeklyStudy,
  subjectName,
} from "@/lib/demoData";

export function DashboardPage() {
  const greeting = useGreeting();
  const { homework, tasks } = useDemoState();
  const pending = homework.filter((item) => item.status !== "submitted");
  const todayTasks = tasks.filter((item) => item.date === "2026-09-19");
  const maxHours = Math.max(...demoWeeklyStudy.map((item) => item.hours), 1);

  return (
    <div className="mx-auto max-w-6xl min-w-0">
      <PageHeader
        eyebrow="Today"
        title={`${greeting}, ${demoProfile.name.split(" ")[0]}.`}
        description={`${formatLongDate()} · Semester ${demoProfile.semester}${demoProfile.section}, ${demoProfile.course}.`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link to="/app/homework">
              <Button size="sm">Log homework</Button>
            </Link>
            <Link to="/app/planner">
              <Button size="sm" variant="outline">
                Open planner
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending homework"
          value={String(pending.length)}
          hint="One write-up is due tomorrow."
          icon={BookOpen}
          tone="primary"
        />
        <StatCard
          label="Upcoming exams"
          value={String(demoExams.length)}
          hint="Next: OS series test on 28 Sep."
          icon={CalendarDays}
          tone="amber"
        />
        <StatCard
          label="Today's tasks"
          value={`${todayTasks.filter((item) => item.status === "open").length} open`}
          hint={`${todayTasks.length} on the Saturday list.`}
          icon={CheckSquare}
          tone="mint"
        />
        <StatCard
          label="Study this week"
          value="14.0h"
          hint="Thursday was the deep-work day."
          icon={Timer}
          tone="primary"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <div>
              <CardTitle>Pending homework</CardTitle>
              <CardDescription>What still needs a sitting before class.</CardDescription>
            </div>
            <Link to="/app/homework" className="text-sm font-medium text-primary">
              All
            </Link>
          </CardHeader>
          <ul className="space-y-3">
            {pending.slice(0, 4).map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 rounded-2xl bg-canvas px-3 py-3">
                <div className="min-w-0">
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="text-sm text-muted">{subjectName(item.subjectId)}</p>
                </div>
                <Badge tone={item.priority === "high" ? "primary" : "amber"}>
                  {dueLabel(item.dueDate)}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <div>
              <CardTitle>Upcoming exams</CardTitle>
              <CardDescription>Internals and labs on the near calendar.</CardDescription>
            </div>
            <Link to="/app/exams" className="text-sm font-medium text-primary">
              All
            </Link>
          </CardHeader>
          <ul className="space-y-3">
            {demoExams.slice(0, 3).map((exam) => (
              <li key={exam.id} className="rounded-2xl bg-canvas px-3 py-3">
                <p className="font-medium">{exam.title}</p>
                <p className="text-sm text-muted">
                  {subjectName(exam.subjectId)} · {exam.date} · {exam.venue}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="min-w-0">
          <CardHeader>
            <div>
              <CardTitle>Today's tasks</CardTitle>
              <CardDescription>Campus errands mixed with revision.</CardDescription>
            </div>
            <Link to="/app/tasks" className="text-sm font-medium text-primary">
              Tasks
            </Link>
          </CardHeader>
          <ul className="space-y-2">
            {todayTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 rounded-2xl border border-line px-3 py-2.5">
                <span
                  className={
                    task.status === "done"
                      ? "size-2.5 rounded-full bg-mint"
                      : "size-2.5 rounded-full bg-primary"
                  }
                />
                <span className={task.status === "done" ? "text-muted line-through" : ""}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <div>
              <CardTitle>Study activity</CardTitle>
              <CardDescription>Hours logged this week (demo).</CardDescription>
            </div>
          </CardHeader>
          <div className="flex h-36 items-end gap-2">
            {demoWeeklyStudy.map((point) => (
              <div key={point.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-[linear-gradient(180deg,#5b4bff_0%,#8f84ff_100%)]"
                  style={{ height: `${(point.hours / maxHours) * 100}%` }}
                />
                <span className="text-[11px] text-muted">{point.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-4 min-w-0">
        <CardHeader>
          <div>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>A short trail of what already happened.</CardDescription>
          </div>
        </CardHeader>
        <ul className="space-y-3">
          {demoActivity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span
                className={
                  item.tone === "mint"
                    ? "mt-1 size-2.5 rounded-full bg-mint"
                    : item.tone === "amber"
                      ? "mt-1 size-2.5 rounded-full bg-amber"
                      : "mt-1 size-2.5 rounded-full bg-primary"
                }
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.detail} · {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
