import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardList } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { homeworkService } from "@/services/homeworkService";
import { subjectService } from "@/services/subjectService";

export function HomeworkPage() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState("all");
  const [status, setStatus] = useState<"all" | string>("all");

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: subjectService.list,
  });

  const {
    data: homework = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["homework"],
    queryFn: homeworkService.list,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: string }) =>
      homeworkService.update(id, { status: nextStatus as "not-started" | "in-progress" | "submitted" | "late" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homework"] });
    },
  });

  const filtered = useMemo(() => {
    return homework.filter((item) => {
      const text = item.title.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesSubject = subjectId === "all" || item.subject_id === subjectId;
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesSubject && matchesStatus;
    });
  }, [homework, query, subjectId, status]);

  if (isLoading) {
    return <LoadingState label="Loading homework" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl p-6 text-sm text-red-600">
        Unable to load homework right now.
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl min-w-0">
      <PageHeader
        eyebrow="Assignments"
        title="Homework"
        description="Your tasks from the authenticated backend, including due dates and real progress updates."
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
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code ?? subject.name}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-2xl border border-line bg-white px-3 text-sm"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
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
            <Card key={item.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="font-medium leading-snug">{item.title}</p>
                <p className="text-sm text-muted">
                  {item.subject_id ? `Subject ${item.subject_id}` : "General work"} · {item.due_date ? new Date(item.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "No date"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={item.priority === "high" ? "primary" : item.priority === "low" ? "mint" : "amber"}>{item.priority}</Badge>
                <select
                  className="h-10 rounded-xl border border-line bg-white px-2 text-sm"
                  value={item.status}
                  onChange={(event) => updateMutation.mutate({ id: item.id, nextStatus: event.target.value })}
                  aria-label={`Update status for ${item.title}`}
                >
                  <option value="not-started">Not started</option>
                  <option value="in-progress">In progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="late">Late</option>
                </select>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
