import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone?: "primary" | "mint" | "amber";
};

const tones = {
  primary: "bg-primary-soft text-primary",
  mint: "bg-mint-soft text-mint",
  amber: "bg-amber-soft text-amber",
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
}: StatCardProps) {
  return (
    <Card className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl text-ink">{value}</p>
        </div>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-2xl", tones[tone])}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-sm leading-5 text-muted">{hint}</p>
    </Card>
  );
}
