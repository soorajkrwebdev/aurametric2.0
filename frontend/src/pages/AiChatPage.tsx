import { type FormEvent, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDemoState } from "@/contexts/DemoStateContext";
import { demoThreads } from "@/lib/demoData";
import { cn } from "@/lib/utils";

export function AiChatPage() {
  const { chat, sendChat } = useDemoState();
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || pending) return;
    setPending(true);
    window.setTimeout(() => {
      sendChat(draft.trim());
      setDraft("");
      setPending(false);
    }, 400);
  }

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Assistant"
        title="AI chat"
        description="The conversation UI is ready. It is not connected to Hugging Face or any model yet."
      />
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit">
          <p className="mb-3 text-sm font-medium">Threads</p>
          <div className="space-y-2">
            {demoThreads.map((thread, index) => (
              <div
                key={thread.id}
                className={cn(
                  "rounded-2xl px-3 py-2.5",
                  index === 0 ? "bg-primary-soft" : "bg-canvas",
                )}
              >
                <p className="text-sm font-medium">{thread.title}</p>
                <p className="truncate text-xs text-muted">{thread.preview}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex min-h-[28rem] flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {chat.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                  message.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-canvas text-ink",
                )}
              >
                <p>{message.content}</p>
                <p
                  className={cn(
                    "mt-1 text-[11px]",
                    message.role === "user" ? "text-white/70" : "text-muted",
                  )}
                >
                  {message.time}
                </p>
              </div>
            ))}
            {pending ? <LoadingState label="Drafting a demo reply" /> : null}
          </div>
          <form className="mt-4 space-y-2" onSubmit={onSubmit}>
            <Textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask for a study split, a recap, or a kinder timetable…"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted">Local canned replies only.</p>
              <Button type="submit" disabled={pending}>
                Send
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
