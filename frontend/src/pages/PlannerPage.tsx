import { CalendarRange } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Card } from "@/components/ui/card";

export function PlannerPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageIntro
        eyebrow="Calendar"
        title="Planner"
        description="Map lectures, labs, and personal time without turning the week into a wall of color."
      />
      <Card className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-3xl bg-primary-soft text-primary">
          <CalendarRange className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl">Week view comes next</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          This page is a placeholder. The planner will use real events once the backend and database are ready.
        </p>
      </Card>
    </div>
  );
}
