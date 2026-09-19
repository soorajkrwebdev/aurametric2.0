import { HobbyCard } from "@/components/HobbyCard";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { demoHobbies } from "@/lib/demoData";

export function HobbiesPage() {
  const totalGoal = demoHobbies.reduce((sum, hobby) => sum + hobby.weeklyGoalHours, 0);
  const totalLogged = demoHobbies.reduce((sum, hobby) => sum + hobby.loggedHours, 0);

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Not only grades"
        title="Hobbies"
        description="Keep a little non-academic time visible so the semester doesn’t flatten everything else."
      />
      <Card className="mb-4">
        <p className="text-sm text-muted">This week</p>
        <p className="mt-1 font-display text-3xl">
          {totalLogged}h of {totalGoal}h
        </p>
        <p className="mt-1 text-sm text-muted">
          Guitar still has the largest gap. The run is almost on target.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {demoHobbies.map((hobby) => (
          <HobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </div>
  );
}
