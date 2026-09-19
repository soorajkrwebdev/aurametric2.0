import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { hobbyService } from "@/services/hobbyService";

export function HobbiesPage() {
  const {
    data: hobbies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hobbies"],
    queryFn: hobbyService.list,
  });

  if (isLoading) {
    return <LoadingState label="Loading hobbies" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-sm text-red-600">
        Unable to load hobbies right now.
      </Card>
    );
  }

  const totalHours = hobbies.reduce((sum, item) => sum + Number(item.hours_spent ?? 0), 0);

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Not only grades"
        title="Hobbies"
        description="Your wellbeing and personal time tracked through the application backend."
      />
      <Card className="mb-4">
        <p className="text-sm text-muted">This week</p>
        <p className="mt-1 font-display text-3xl">{totalHours}h logged</p>
        <p className="mt-1 text-sm text-muted">A live snapshot from the authenticated user record.</p>
      </Card>
      {hobbies.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No hobbies yet"
          description="Add a hobby entry to keep non-academic time visible."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {hobbies.map((hobby) => (
            <Card key={hobby.id} className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">{hobby.date}</p>
              <h3 className="mt-2 font-display text-xl">{hobby.hobby_name}</h3>
              <p className="mt-2 text-sm text-muted">{hobby.notes ?? "No additional note."}</p>
              <p className="mt-4 text-sm font-medium">{hobby.hours_spent}h logged</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
