import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatShortDate, daysUntil } from "@/lib/dates";
import { subjectName } from "@/lib/demoData";
import type { Exam } from "@/types";

type ExamCardProps = {
  exam: Exam;
};

const typeTone = {
  internal: "primary",
  lab: "mint",
  "end-semester": "amber",
} as const;

export function ExamCard({ exam }: ExamCardProps) {
  const examDate = exam.date ?? exam.exam_date ?? new Date().toISOString();
  const examType = exam.type ?? exam.exam_type ?? "internal";
  const days = daysUntil(examDate);
  const tone = typeTone[examType as keyof typeof typeTone] ?? "primary";

  return (
    <Card className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted uppercase">
            {subjectName(exam.subjectId ?? exam.subject_id ?? "general")}
          </p>
          <h3 className="mt-1 font-display text-lg">{exam.title ?? exam.notes ?? "Exam"}</h3>
        </div>
        <Badge tone={tone}>{examType.replace("-", " ")}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{exam.syllabus ?? exam.notes ?? "Assessment details are being tracked."}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="font-medium">
          {formatShortDate(examDate)} · {exam.time ?? "TBD"}
        </span>
        <span className="inline-flex items-center gap-1 text-muted">
          <MapPin className="size-3.5" />
          {exam.venue ?? "Location TBD"}
        </span>
        <Badge tone={days <= 10 ? "amber" : "neutral"}>
          {days === 0 ? "Today" : days < 0 ? "Done" : `${days} days`}
        </Badge>
      </div>
    </Card>
  );
}
