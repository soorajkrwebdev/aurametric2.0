import { Sparkles } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Card } from "@/components/ui/card";

export function InsightsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageIntro
        eyebrow="Progress"
        title="Insights"
        description="See how your weeks actually went — study time, finished work, and quiet streaks."
      />
      <Card className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-3xl bg-amber-soft text-amber">
          <Sparkles className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl">Charts wait for real data</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          Insights will stay empty until you have authentic study history. No sample charts, no fake metrics.
        </p>
      </Card>
    </div>
  );
}
