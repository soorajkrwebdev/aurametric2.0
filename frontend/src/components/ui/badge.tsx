import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "mint" | "amber" | "neutral";
};

const tones = {
  primary: "bg-primary-soft text-primary-dark",
  mint: "bg-mint-soft text-mint",
  amber: "bg-amber-soft text-amber",
  neutral: "bg-canvas text-muted",
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
