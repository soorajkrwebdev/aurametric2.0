import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { HomeworkCard } from "@/components/HomeworkCard";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { useDemoState } from "@/contexts/DemoStateContext";
import { demoSubjects } from "@/lib/demoData";
import type { HomeworkStatus } from "@/types";

export function HomeworkPage() {
  const { homework, setHomeworkStatus } = useDemoState();
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState("all");
  const [status, setStatus] = useState<"all" | HomeworkStatus>("all");

  const filtered = useMemo(() => {
    return homework.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesSubject = subjectId === "all" || item.subjectId === subjectId;
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesSubject && matchesStatus;
    });
  }, [homework, query, subjectId, status]);

  return (
    <div className="mx-auto max-w-4xl min-w-0">
      <PageHeader
        eyebrow="Assignments"
        title="Homework"
        description="Titles, subjects, due dates, and an honest status. Changes stay in this browser session."
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search homework"
        />
        <select
          className="h-11 rounded-2xl border border-line bg-white px-3 text-sm"
          value={subjectId}
          onChange={(event) => setSubjectId(event.target.value)}
          aria-label="Filter by subject"
        >
          <option value="all">All subjects</option>
          {demoSubjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-2xl border border-line bg-white px-3 text-sm"
          value={status}
          onChange={(event) => setStatus(event.target.value as "all" | HomeworkStatus)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="not-started">Not started</option>
          <option value="in-progress">In progress</option>
          <option value="submitted">Submitted</option>
          <option value="late">Late</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Nothing matches"
          description="Try another subject or clear the search."
          actionLabel="Reset filters"
          onAction={() => {
            setQuery("");
            setSubjectId("all");
            setStatus("all");
          }}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <HomeworkCard
              key={item.id}
              homework={item}
              onStatus={(next) => setHomeworkStatus(item.id, next)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
