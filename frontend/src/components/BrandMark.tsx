import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  showWordmark?: boolean;
};

export function BrandMark({ className, showWordmark = true }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 place-items-center rounded-2xl bg-primary shadow-[var(--shadow-float)]">
        <span className="absolute inset-1 rounded-full border-2 border-mint/80" />
        <span className="h-2 w-2 rounded-full bg-amber" />
      </span>
      {showWordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Aurametric
        </span>
      ) : null}
    </div>
  );
}
