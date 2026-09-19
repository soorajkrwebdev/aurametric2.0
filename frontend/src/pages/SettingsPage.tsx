import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ToggleRowProps = {
  label: string;
  hint: string;
  on: boolean;
  onToggle: () => void;
};

function ToggleRow({ label, hint, on, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-4 last:border-b-0">
      <div>
        <p className="font-medium">{label}</p>
        <p className="mt-1 text-sm text-muted">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className={cn(
          "h-7 w-12 rounded-full p-1 transition",
          on ? "bg-primary" : "bg-line",
        )}
      >
        <span
          className={cn(
            "block size-5 rounded-full bg-white transition",
            on && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [emailDigest, setEmailDigest] = useState(true);
  const [examAlerts, setExamAlerts] = useState(true);
  const [hobbyReminders, setHobbyReminders] = useState(false);
  const [compact, setCompact] = useState(false);

  return (
    <div className="mx-auto max-w-3xl min-w-0">
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Local toggles for the demo. Nothing is persisted to a server."
      />
      <Card>
        <Label className="text-muted">Notifications</Label>
        <ToggleRow
          label="Evening digest"
          hint="A short list of due work around 7 PM."
          on={emailDigest}
          onToggle={() => setEmailDigest((value) => !value)}
        />
        <ToggleRow
          label="Exam countdown"
          hint="Amber reminder three days before internals."
          on={examAlerts}
          onToggle={() => setExamAlerts((value) => !value)}
        />
        <ToggleRow
          label="Hobby nudge"
          hint="If guitar or a run is quiet by Thursday."
          on={hobbyReminders}
          onToggle={() => setHobbyReminders((value) => !value)}
        />
      </Card>
      <Card className="mt-4">
        <Label className="text-muted">Display</Label>
        <ToggleRow
          label="Compact cards"
          hint="Visual only for now — layout stays the same in this demo."
          on={compact}
          onToggle={() => setCompact((value) => !value)}
        />
        <div className="pt-4">
          <Button variant="outline" disabled>
            Save to account (soon)
          </Button>
        </div>
      </Card>
    </div>
  );
}
