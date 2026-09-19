import { ExamCard } from "@/components/ExamCard";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { formatShortDate } from "@/lib/dates";
import { demoExams, subjectName } from "@/lib/demoData";

export function ExamsPage() {
  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Assessment"
        title="Exams"
        description="A list plus a compact calendar strip so internals don’t sneak up."
      />
      <Card className="mb-4 overflow-x-auto">
        <p className="mb-3 text-sm font-medium">September – October</p>
        <div className="flex min-w-max gap-3">
          {demoExams.map((exam) => (
            <div
              key={exam.id}
              className="w-40 shrink-0 rounded-2xl bg-canvas px-3 py-3"
            >
              <p className="text-xs text-muted">{formatShortDate(exam.date)}</p>
              <p className="mt-1 font-medium leading-snug">{subjectName(exam.subjectId)}</p>
              <p className="mt-1 text-xs text-muted">{exam.time}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {demoExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
}
