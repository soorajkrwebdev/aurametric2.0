import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label = "Loading", className }: LoadingStateProps) {
  return (
    <Card className={cn("flex flex-col gap-3 p-5", className)}>
      <p className="text-sm text-muted">{label}</p>
      <div className="h-3 w-1/3 animate-pulse rounded-full bg-primary-soft" />
      <div className="h-3 w-full animate-pulse rounded-full bg-canvas" />
      <div className="h-3 w-5/6 animate-pulse rounded-full bg-canvas" />
    </Card>
  );
}
