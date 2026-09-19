import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  tone?: "primary" | "mint" | "amber";
  className?: string;
};

const tones = {
  primary: "bg-primary",
  mint: "bg-mint",
  amber: "bg-amber",
};

export function ProgressBar({ value, tone = "primary", className }: ProgressBarProps) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-canvas", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-300", tones[tone])}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
