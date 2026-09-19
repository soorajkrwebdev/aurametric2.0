import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Flame, Leaf, Timer } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGreeting } from "@/hooks/useGreeting";
import { fetchHealth } from "@/services/api";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DashboardPage() {
  const greeting = useGreeting();
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <div className="mx-auto max-w-6xl">
      <PageIntro
        eyebrow="Today"
        title={`${greeting}.`}
        description="Your study workspace is ready. Stats, tasks, and focus sessions will appear here once those features are connected."
        action={
          <Badge tone={healthQuery.isSuccess ? "mint" : "neutral"}>
            {healthQuery.isSuccess
              ? "API connected"
              : healthQuery.isError
                ? "API offline"
                : "Checking API"}
          </Badge>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Focus protected",
            value: "—",
            hint: "Hours will land here after your first session.",
            icon: Timer,
            tone: "bg-primary-soft text-primary",
          },
          {
            label: "Open tasks",
            value: "—",
            hint: "Assignments stay on this board, not in five apps.",
            icon: BookOpen,
            tone: "bg-amber-soft text-amber",
          },
          {
            label: "Study streak",
            value: "—",
            hint: "A quiet streak, counted by days you showed up.",
            icon: Flame,
            tone: "bg-mint-soft text-mint",
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.35 }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    <p className="mt-2 font-display text-3xl text-ink">{item.value}</p>
                  </div>
                  <span className={`grid size-10 place-items-center rounded-2xl ${item.tone}`}>
                    <Icon className="size-4.5" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-5 text-muted">{item.hint}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>This week’s rhythm</CardTitle>
              <CardDescription>
                A lighter view of the week so planning doesn’t feel like another class.
              </CardDescription>
            </div>
            <Badge tone="primary">Placeholder</Badge>
          </CardHeader>
          <div className="grid grid-cols-7 gap-2">
            {weekdays.map((day, index) => (
              <div
                key={day}
                className="rounded-2xl bg-canvas px-2 py-3 text-center"
              >
                <p className="text-[11px] font-medium text-muted">{day}</p>
                <div
                  className={`mx-auto mt-3 h-16 rounded-xl ${
                    index === 4
                      ? "bg-[linear-gradient(180deg,#5b4bff_0%,#8f84ff_100%)]"
                      : "bg-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[linear-gradient(165deg,#ffffff_0%,#f3f0ff_52%,#eaf8f1_100%)]">
          <CardHeader>
            <div>
              <CardTitle>Next focus block</CardTitle>
              <CardDescription>
                When Focus is ready, your next session will sit here.
              </CardDescription>
            </div>
            <Leaf className="size-5 text-mint" />
          </CardHeader>
          <div className="rounded-[1.25rem] border border-white/80 bg-white/70 p-4">
            <p className="font-medium">No session scheduled</p>
            <p className="mt-1 text-sm leading-5 text-muted">
              Keep the desk clear. We’ll add timers, breaks, and course context in a later step.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
