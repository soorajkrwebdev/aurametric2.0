import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { examService } from "@/services/examService";

export function ExamsPage() {
  const {
    data: exams = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: examService.list,
  });

  if (isLoading) {
    return <LoadingState label="Loading exams" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-sm text-red-600">
        Unable to load your exams right now.
      </Card>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="mx-auto max-w-5xl min-w-0">
        <PageHeader eyebrow="Assessment" title="Exams" description="Your exam timeline is synced from the backend." />
        <EmptyState icon={CalendarDays} title="No exams yet" description="Add an exam through the API flow when you’re ready." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Assessment"
        title="Exams"
        description="A live view of upcoming internal and end-semester assessments."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {exams.map((exam) => (
          <Card key={exam.id} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {exam.exam_type}
              </p>
              <Badge tone={exam.exam_type === "end-semester" ? "primary" : "amber"}>
                {exam.exam_type}
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-xl">{exam.notes ?? "Assessment"}</h3>
            <p className="mt-2 text-sm text-muted">
              {new Date(exam.exam_date ?? new Date().toISOString()).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
