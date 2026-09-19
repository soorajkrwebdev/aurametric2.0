import { BookOpen, CheckSquare, Timer, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { demoSubjects, demoWeeklyStudy } from "@/lib/demoData";

export function ProgressPage() {
  const maxHours = Math.max(...demoWeeklyStudy.map((item) => item.hours), 1);
  const submittedRate = 20;
  const avgProgress = Math.round(
    demoSubjects.reduce((sum, subject) => sum + subject.progress, 0) / demoSubjects.length,
  );

  return (
    <div className="mx-auto max-w-6xl min-w-0">
      <PageHeader
        eyebrow="Analytics"
        title="Progress"
        description="Simple numbers from the demo set — not live telemetry."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Avg. syllabus"
          value={`${avgProgress}%`}
          hint="Across five semester papers."
          icon={BookOpen}
        />
        <StatCard
          label="On-time homework"
          value={`${submittedRate}%`}
          hint="One of five is submitted in the demo."
          icon={CheckSquare}
          tone="mint"
        />
        <StatCard
          label="Weekly hours"
          value="14.0"
          hint="Mon–Sat, Sunday left empty on purpose."
          icon={Timer}
          tone="amber"
        />
        <StatCard
          label="Strongest paper"
          value="SE 81%"
          hint="Software Engineering is furthest along."
          icon={TrendingUp}
          tone="primary"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Hours by weekday</CardTitle>
              <CardDescription>Same series as the home dashboard.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {demoWeeklyStudy.map((point) => (
              <div key={point.day} className="grid grid-cols-[40px_1fr_40px] items-center gap-2">
                <span className="text-sm text-muted">{point.day}</span>
                <div className="h-2.5 overflow-hidden rounded-full bg-canvas">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(point.hours / maxHours) * 100}%` }}
                  />
                </div>
                <span className="text-right text-sm">{point.hours}h</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Subject completion</CardTitle>
              <CardDescription>Self-reported syllabus coverage.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {demoSubjects.map((subject) => (
              <div key={subject.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{subject.name}</span>
                  <span className="text-muted">{subject.progress}%</span>
                </div>
                <ProgressBar value={subject.progress} tone={subject.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
