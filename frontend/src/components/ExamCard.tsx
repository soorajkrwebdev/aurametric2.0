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
  const days = daysUntil(exam.date);

  return (
    <Card className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted uppercase">
            {subjectName(exam.subjectId)}
          </p>
          <h3 className="mt-1 font-display text-lg">{exam.title}</h3>
        </div>
        <Badge tone={typeTone[exam.type]}>{exam.type.replace("-", " ")}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{exam.syllabus}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="font-medium">
          {formatShortDate(exam.date)} · {exam.time}
        </span>
        <span className="inline-flex items-center gap-1 text-muted">
          <MapPin className="size-3.5" />
          {exam.venue}
        </span>
        <Badge tone={days <= 10 ? "amber" : "neutral"}>
          {days === 0 ? "Today" : days < 0 ? "Done" : `${days} days`}
        </Badge>
      </div>
    </Card>
  );
}
