import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { studyService } from "@/services/studyService";

export function StudyPlannerPage() {
  const {
    data: sessions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["study-sessions"],
    queryFn: studyService.list,
  });

  const grouped = sessions.reduce<Record<string, typeof sessions>>((acc, session) => {
    const dateKey = (session.study_date ?? session.date ?? new Date().toISOString()).slice(0, 10);
    acc[dateKey] = [...(acc[dateKey] ?? []), session];
    return acc;
  }, {});

  const days = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  if (isLoading) {
    return <LoadingState label="Loading study planner" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-sm text-red-600">
        Unable to load your study sessions right now.
      </Card>
    );
  }

  if (days.length === 0) {
    return (
      <div className="mx-auto max-w-5xl min-w-0">
        <PageHeader
          eyebrow="Focus blocks"
          title="Study planner"
          description="Track your learning blocks using the live backend."
        />
        <EmptyState
          icon={Calendar}
          title="No study sessions yet"
          description="Add a study session from the API-backed data flow to begin tracking your blocks."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Focus blocks"
        title="Study planner"
        description="Short sittings with a subject and a finish line, all backed by your authenticated data."
      />
      <div className="space-y-4">
        {days.map(([day, items]) => (
          <div key={day}>
            <p className="mb-2 text-sm font-medium text-muted">
              {new Date(day).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
            <div className="space-y-2">
              {items.map((session) => (
                <Card key={session.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted">
                        {(session.study_date ?? session.date)
                          ? new Date(session.study_date ?? session.date ?? new Date().toISOString()).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
                          : "Time"} · {(session.duration ?? 0)} min
                      </p>
                      <h3 className="mt-1 font-medium">{session.topic ?? session.focus ?? "Study block"}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {session.notes ?? session.focus ?? "Focused study block."}
                      </p>
                    </div>
                    <Badge tone="mint">Planned</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
