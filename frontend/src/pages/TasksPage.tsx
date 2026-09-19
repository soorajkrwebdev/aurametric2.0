import { ListChecks } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TasksPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageIntro
        eyebrow="Work"
        title="Tasks"
        description="Assignments, errands, and study follow-ups will live here. Nothing is connected yet."
        action={
          <Button disabled>New task</Button>
        }
      />
      <Card className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-3xl bg-amber-soft text-amber">
          <ListChecks className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl">A clean task list, soon</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          We’ll add due dates, courses, and priorities after authentication and the database are in place.
        </p>
      </Card>
    </div>
  );
}
