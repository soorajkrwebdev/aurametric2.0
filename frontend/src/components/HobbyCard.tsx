import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { formatShortDate } from "@/lib/dates";
import type { Hobby } from "@/types";

type HobbyCardProps = {
  hobby: Hobby;
};

export function HobbyCard({ hobby }: HobbyCardProps) {
  const name = hobby.name ?? hobby.hobby_name ?? "Hobby";
  const loggedHours = hobby.loggedHours ?? hobby.hours_spent ?? 0;
  const weeklyGoalHours = hobby.weeklyGoalHours ?? 1;
  const percent = Math.round((loggedHours / weeklyGoalHours) * 100);
  const lastSession = hobby.lastSession ?? hobby.date ?? new Date().toISOString();
  const note = hobby.note ?? hobby.notes ?? "No additional note.";

  return (
    <Card className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl">{name}</h3>
          <p className="mt-1 text-sm text-muted">{note}</p>
        </div>
        <Badge tone="mint">
          {loggedHours}/{weeklyGoalHours}h
        </Badge>
      </div>
      <div className="mt-5">
        <ProgressBar value={percent} tone="mint" />
        <p className="mt-2 text-xs text-muted">
          Last session {formatShortDate(lastSession)}
        </p>
      </div>
    </Card>
  );
}
