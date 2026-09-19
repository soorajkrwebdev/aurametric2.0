import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Priority, Task } from "@/types";
import { cn } from "@/lib/utils";

const priorityTone: Record<Priority, "mint" | "amber" | "primary"> = {
  low: "mint",
  medium: "amber",
  high: "primary",
};

type TaskCardProps = {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
};

export function TaskCard({ task, onToggle, onRemove }: TaskCardProps) {
  return (
    <Card className="flex min-w-0 items-start gap-3">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={task.status === "done"}
        className={cn(
          "mt-1 size-5 shrink-0 rounded-full border-2",
          task.status === "done" ? "border-mint bg-mint" : "border-primary/40 bg-white",
        )}
        aria-label={`Mark ${task.title} ${task.status === "done" ? "open" : "done"}`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3
            className={cn(
              "font-medium leading-snug",
              task.status === "done" && "text-muted line-through",
            )}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1">
            <Badge tone="neutral">{task.tag}</Badge>
            <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
          </div>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted">{task.notes}</p>
      </div>
      <Button variant="ghost" size="icon" aria-label="Remove task" onClick={onRemove}>
        <Trash2 className="size-4" />
      </Button>
    </Card>
  );
}
