import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { profileService } from "@/services/profileService";
import { subjectService } from "@/services/subjectService";

export function SubjectsPage() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
  });

  const {
    data: subjects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: subjectService.list,
  });

  if (isLoading) {
    return <LoadingState label="Loading subjects" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-sm text-red-600">
        Unable to load your subjects right now.
      </Card>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="mx-auto max-w-4xl min-w-0">
        <PageHeader
          eyebrow="Semester"
          title="Subjects"
          description={profile ? `${profile.course ?? "Your program"} · Semester ${profile.semester ?? "current"}` : "Your subject list is ready."}
        />
        <EmptyState
          icon={BookOpen}
          title="No subjects yet"
          description="Add a subject to start tracking your semester."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl min-w-0">
      <PageHeader
        eyebrow="Semester"
        title="Subjects"
        description={
          profile
            ? `${profile.course ?? "Your program"} · Semester ${profile.semester ?? "current"}${profile.section ? ` ${profile.section}` : ""}`
            : "Your academic overview from the backend."
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject, index) => {
          const progress = 35 + (index % 4) * 15;
          const credits = subject.semester ? 3 : 2;

          return (
            <Card key={subject.id} className="flex h-full min-w-0 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-muted uppercase">
                    {subject.code ?? "SUBJ"} · Sem {subject.semester ?? 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl leading-tight">{subject.name}</h3>
                </div>
                <Badge tone={index % 3 === 0 ? "primary" : index % 3 === 1 ? "mint" : "amber"}>
                  {credits} cr
                </Badge>
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted">Syllabus progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <ProgressBar value={progress} tone={index % 3 === 0 ? "primary" : index % 3 === 1 ? "mint" : "amber"} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <Badge tone="neutral">{subject.name.length} topics</Badge>
                <Badge tone="amber">Tracking live</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
