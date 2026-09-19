import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarClock,
  CheckSquare,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    icon: BookOpen,
    title: "Subjects that stay in one place",
    copy: "Codes, instructors, homework, and exams sit together so you stop hunting across chats.",
  },
  {
    icon: CalendarClock,
    title: "A planner that respects evenings",
    copy: "Block study time next to guitar or a run. The week should look like a student life, not a factory.",
  },
  {
    icon: CheckSquare,
    title: "Homework with honest status",
    copy: "Due dates, priority, and whether you actually started — without a wall of fake charts.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-canvas">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <BrandMark />
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Create account</Button>
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            For the semester you are actually in
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.1] font-semibold text-ink sm:text-5xl">
            A calmer desk for subjects, homework, and the rest of your week.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            Aurametric is a student workspace — not another generic dashboard.
            Keep CS301 next to your guitar practice. See what is due tomorrow
            without opening five apps.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/app">
              <Button size="lg">Open the demo</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">
                Join the wait for accounts
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">
            Demo uses static data. Sign-in and the database are not connected yet.
          </p>
        </motion.div>

        <Card className="bg-[linear-gradient(165deg,#ffffff_0%,#f3f0ff_55%,#eaf8f1_100%)] p-6">
          <p className="text-sm font-medium text-primary">Saturday · 19 Sep</p>
          <p className="mt-2 font-display text-2xl">OS lab still open</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Process scheduling write-up due tomorrow. Guitar is blocked for 7 PM
            so the report doesn’t eat the evening.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              ["4", "Homework"],
              ["2", "Exams"],
              ["5", "Tasks"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/80 py-3">
                <p className="font-display text-2xl">{value}</p>
                <p className="text-[11px] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="min-w-0">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-4" />
              </span>
              <h2 className="mt-4 font-display text-xl">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
            </Card>
          );
        })}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Card className="flex flex-col gap-4 bg-paper md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-1 size-5 text-mint" />
            <div>
              <h2 className="font-display text-2xl">Built for a real timetable</h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                Internals, lab practicals, and a sketch journal can share a week
                without turning into a project-management parody.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Sparkles className="size-4 text-amber" />
            Chat is a later step. The desk comes first.
          </div>
        </Card>
      </section>
    </div>
  );
}
