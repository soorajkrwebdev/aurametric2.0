import { type FormEvent, useMemo, useState } from "react";
import { CheckSquare } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDemoState } from "@/contexts/DemoStateContext";

const days = [
  { id: "2026-09-19", label: "Sat 19" },
  { id: "2026-09-20", label: "Sun 20" },
  { id: "2026-09-21", label: "Mon 21" },
];

export function TasksPage() {
  const { tasks, toggleTask, addTask, removeTask } = useDemoState();
  const [day, setDay] = useState("2026-09-19");
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const filtered = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.date === day && task.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [tasks, day, query],
  );

  function onAdd(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle("");
    setAddOpen(false);
    setDay("2026-09-19");
  }

  return (
    <div className="mx-auto max-w-3xl min-w-0">
      <PageHeader
        eyebrow="Daily"
        title="Tasks"
        description="Small campus work that isn’t a full assignment. Demo tasks live only in memory."
        action={<Button onClick={() => setAddOpen(true)}>Add task</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {days.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDay(item.id)}
            className={
              day === item.id
                ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-white"
                : "rounded-full bg-white px-4 py-2 text-sm font-medium text-muted"
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <SearchBar
        className="mb-4"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter today's list"
      />
      {filtered.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="List is clear"
          description="No tasks on this day match the filter."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onRemove={() => setRemoveId(task.id)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="New task"
        description="Saved only in this demo session."
      >
        <form className="space-y-3" onSubmit={onAdd}>
          <div>
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Collect lab printouts"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={Boolean(removeId)}
        title="Remove this task?"
        description="It will disappear from the demo list until you refresh."
        confirmLabel="Remove"
        onClose={() => setRemoveId(null)}
        onConfirm={() => {
          if (removeId) removeTask(removeId);
        }}
      />
    </div>
  );
}
