import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { dueLabel } from "@/lib/dates";
import { subjectName } from "@/lib/demoData";
import type { Homework, HomeworkStatus, Priority } from "@/types";
import { cn } from "@/lib/utils";

const priorityTone: Record<Priority, "mint" | "amber" | "primary"> = {
  low: "mint",
  medium: "amber",
  high: "primary",
};

const statusLabel: Record<HomeworkStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  submitted: "Submitted",
  late: "Late",
};

type HomeworkCardProps = {
  homework: Homework;
  onStatus?: (status: HomeworkStatus) => void;
};

export function HomeworkCard({ homework, onStatus }: HomeworkCardProps) {
  return (
    <Card className="min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted uppercase">
            {subjectName(homework.subjectId)}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug">{homework.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={priorityTone[homework.priority]}>{homework.priority}</Badge>
          <Badge tone={homework.status === "submitted" ? "mint" : "neutral"}>
            {statusLabel[homework.status]}
          </Badge>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{homework.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={cn("text-sm font-medium", dueLabel(homework.dueDate).includes("overdue") ? "text-amber" : "text-ink")}>
          {dueLabel(homework.dueDate)}
        </p>
        {onStatus ? (
          <select
            className="h-10 rounded-full border border-line bg-white px-3 text-sm"
            value={homework.status}
            onChange={(event) => onStatus(event.target.value as HomeworkStatus)}
            aria-label={`Status for ${homework.title}`}
          >
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="submitted">Submitted</option>
            <option value="late">Late</option>
          </select>
        ) : null}
      </div>
    </Card>
  );
}
