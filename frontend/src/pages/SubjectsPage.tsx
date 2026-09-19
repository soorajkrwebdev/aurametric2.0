import { PageHeader } from "@/components/PageHeader";
import { SubjectCard } from "@/components/SubjectCard";
import { demoProfile, demoSubjects } from "@/lib/demoData";

export function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl min-w-0">
      <PageHeader
        eyebrow="Semester"
        title="Subjects"
        description={`${demoProfile.course} · Semester ${demoProfile.semester}${demoProfile.section}. Five papers, one desk.`}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
