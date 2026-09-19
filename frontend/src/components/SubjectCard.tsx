import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { subjectName, demoHomework, demoExams } from "@/lib/demoData";
import type { Subject } from "@/types";

type SubjectCardProps = {
  subject: Subject;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  const upcomingHomework = demoHomework.filter(
    (item) => item.subjectId === subject.id && item.status !== "submitted",
  ).length;
  const upcomingExams = demoExams.filter((item) => item.subjectId === subject.id).length;

  return (
    <Card className="flex h-full min-w-0 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {subject.code} · Sem {subject.semester}
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight">{subject.name}</h3>
          <p className="mt-1 text-sm text-muted">{subject.instructor}</p>
        </div>
        <Badge tone={subject.color}>{subject.credits} cr</Badge>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted">Syllabus progress</span>
          <span className="font-medium">{subject.progress}%</span>
        </div>
        <ProgressBar value={subject.progress} tone={subject.color} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs">
        <Badge tone="neutral">{upcomingHomework} homework open</Badge>
        <Badge tone="amber">{upcomingExams} exam{upcomingExams === 1 ? "" : "s"}</Badge>
      </div>
      <Link
        to="/app/homework"
        className="mt-5 text-sm font-medium text-primary hover:text-primary-dark"
      >
        View {subjectName(subject.id)} work
      </Link>
    </Card>
  );
}
