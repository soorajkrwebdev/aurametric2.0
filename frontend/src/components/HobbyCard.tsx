import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { formatShortDate } from "@/lib/dates";
import type { Hobby } from "@/types";

type HobbyCardProps = {
  hobby: Hobby;
};

export function HobbyCard({ hobby }: HobbyCardProps) {
  const percent = Math.round((hobby.loggedHours / hobby.weeklyGoalHours) * 100);

  return (
    <Card className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl">{hobby.name}</h3>
          <p className="mt-1 text-sm text-muted">{hobby.note}</p>
        </div>
        <Badge tone="mint">
          {hobby.loggedHours}/{hobby.weeklyGoalHours}h
        </Badge>
      </div>
      <div className="mt-5">
        <ProgressBar value={percent} tone="mint" />
        <p className="mt-2 text-xs text-muted">
          Last session {formatShortDate(hobby.lastSession)}
        </p>
      </div>
    </Card>
  );
}
