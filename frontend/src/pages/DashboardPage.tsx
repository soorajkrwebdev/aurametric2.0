import { useQuery } from "@tanstack/react-query";
import { BookOpen, CalendarDays, CheckSquare, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useGreeting } from "@/hooks/useGreeting";
import { formatLongDate, dueLabel } from "@/lib/dates";
import { fetchDashboard } from "@/services/api";

export function DashboardPage() {
  const greeting = useGreeting();
  const { session, user, loading: authLoading } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    enabled: !authLoading && !!session?.access_token,
    staleTime: 30_000,
  });

  const profile = data?.profile ?? {
    name: user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Student",
    course: "",
    college: "",
    semester: null,
    section: "",
  };

  const homework = data?.homework ?? [];
  const exams = data?.exams ?? [];
  const tasks = data?.tasks ?? [];
  const studySessions = data?.studySessions ?? [];
  const recentActivity = data?.recentActivity ?? [];
  const stats = data?.stats ?? {
    totalSubjects: 0,
    pendingHomework: 0,
    upcomingExams: 0,
    completedTasks: 0,
    totalStudyMinutes: 0,
  };

  const pending = homework.filter((item) => item.status !== "submitted");
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const todayTasks = tasks.filter((item) => item.due_date && new Date(item.due_date).toISOString().slice(0, 10) === todayKey);

  const weeklyStudy = Array.from({ length: 7 }, (_, index) => {
    const pointDate = new Date();
    pointDate.setDate(pointDate.getDate() - (6 - index));
    const key = pointDate.toISOString().slice(0, 10);
    const hours = studySessions
      .filter((session) => session.study_date.slice(0, 10) === key)
      .reduce((sum, session) => sum + Number(session.duration), 0) / 60;

    return {
      day: pointDate.toLocaleDateString("en-IN", { weekday: "short" }).slice(0, 3),
      hours: Number(hours.toFixed(1)),
    };
  });
  const maxHours = Math.max(...weeklyStudy.map((item) => item.hours), 1);
  const studyHours = (stats.totalStudyMinutes / 60).toFixed(1);

  if (authLoading || isLoading) {
    return <LoadingState label="Loading your dashboard" className="mx-auto mt-8 max-w-4xl" />;
  }

  if (error) {
    return (
      <Card className="mx-auto mt-8 max-w-3xl p-6 text-sm text-red-600">
        We couldn’t load your dashboard data right now. Please refresh or try again in a moment.
      </Card>
    );
  }

  const quickActions = [
    { label: "Add Homework", to: "/app/homework" },
    { label: "Add Task", to: "/app/tasks" },
    { label: "Add Study Session", to: "/app/planner" },
    { label: "Add Exam", to: "/app/exams" },
  ];

  return (
    <div className="mx-auto max-w-6xl min-w-0">
      <PageHeader
        eyebrow="Today"
        title={`${greeting}, ${profile.name?.split(" ")[0] ?? "Student"}.`}
        description={`${formatLongDate()} · ${profile.semester ? `Semester ${profile.semester}` : "Current semester"}${profile.section ? ` ${profile.section}` : ""}${profile.course ? `, ${profile.course}` : ""}.`}
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

      <div className="mb-4 flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <Link key={action.label} to={action.to}>
            <Button size="sm" variant="outline">
              {action.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending homework"
          value={String(stats.pendingHomework || pending.length)}
          hint={pending[0] ? `Next due ${dueLabel(pending[0].due_date ?? new Date().toISOString())}` : "No work left pending."}
          icon={BookOpen}
          tone="primary"
        />
        <StatCard
          label="Upcoming exams"
          value={String(stats.upcomingExams || exams.length)}
          hint={exams[0] ? `Next: ${exams[0].exam_type} on ${new Date(exams[0].exam_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}.` : "No exams scheduled."}
          icon={CalendarDays}
          tone="amber"
        />
        <StatCard
          label="Today's tasks"
          value={`${todayTasks.filter((item) => item.status === "open").length} open`}
          hint={`${todayTasks.length} on the day plan.`}
          icon={CheckSquare}
          tone="mint"
        />
        <StatCard
          label="Study this week"
          value={`${studyHours}h`}
          hint={isLoading ? "Syncing your study log..." : "Your latest study minutes are live from the backend."}
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
                  <p className="text-sm text-muted">{item.subject_id ? `Subject ${item.subject_id}` : "General work"}</p>
                </div>
                <Badge tone={item.priority === "high" ? "primary" : "amber"}>
                  {item.due_date ? dueLabel(item.due_date) : "No date"}
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
            {exams.slice(0, 3).map((exam) => (
              <li key={exam.id} className="rounded-2xl bg-canvas px-3 py-3">
                <p className="font-medium">{exam.exam_type}</p>
                <p className="text-sm text-muted">
                  {exam.subject_id ? `Subject ${exam.subject_id}` : "General exam"} · {new Date(exam.exam_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
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
                  {task.task_title}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <div>
              <CardTitle>Study activity</CardTitle>
              <CardDescription>Hours logged this week from your live study sessions.</CardDescription>
            </div>
          </CardHeader>
          <div className="flex h-36 items-end gap-2">
            {weeklyStudy.map((point) => (
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
          {recentActivity.map((item) => (
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
