import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { chatService } from "@/services/chatService";
import { cn } from "@/lib/utils";

export function AiChatPage() {
  const queryClient = useQueryClient();
  const endRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState("");

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey: ["chat"],
    queryFn: chatService.list,
  });

  const sendMutation = useMutation({
    mutationFn: chatService.send,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      setDraft("");
    },
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = draft.trim();

    if (!trimmed || sendMutation.isPending) {
      return;
    }

    sendMutation.mutate(trimmed);
  }

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <PageHeader
        eyebrow="Assistant"
        title="AI chat"
        description="A simple Qwen-powered conversation kept behind the authenticated backend API."
      />

      <Card className="flex min-h-[30rem] flex-col">
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
          {isLoading ? (
            <LoadingState label="Loading chat history" />
          ) : error ? (
            <div className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">
              Unable to load chat history right now.
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl bg-canvas p-4 text-sm text-muted">
              Start the conversation with a quick message.
            </div>
          ) : (
            messages.map((message) => (
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
            ))
          )}

          {sendMutation.isPending ? <LoadingState label="Thinking…" /> : null}
          <div ref={endRef} />
        </div>

        <form className="mt-4 space-y-2" onSubmit={onSubmit}>
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask a simple question…"
            maxLength={2000}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted">{draft.trim().length}/2000</p>
            <Button type="submit" disabled={sendMutation.isPending || !draft.trim()}>
              Send
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
