import { Timer } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FocusPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageIntro
        eyebrow="Deep work"
        title="Focus"
        description="A simple timer for study blocks. No extra AI layer — just time, a course, and a break."
        action={
          <Button variant="mint" disabled>
            Start session
          </Button>
        }
      />
      <Card className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-3xl bg-mint-soft text-mint">
          <Timer className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl">Sessions will start here</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">
          Focus mode is not implemented yet. The layout is ready so the later timer can drop in cleanly.
        </p>
      </Card>
    </div>
  );
}
