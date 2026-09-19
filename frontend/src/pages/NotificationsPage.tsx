import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { notificationService } from "@/services/notificationService";
import { cn } from "@/lib/utils";

export function NotificationsPage() {
  const queryClient = useQueryClient();
  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.list,
  });

  const markReadMutation = useMutation({
    mutationFn: notificationService.markRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  if (isLoading) {
    return <LoadingState label="Loading notifications" />;
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-3xl p-6 text-sm text-red-600">
        Unable to load notifications.
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl min-w-0">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Unread and read reminders from the session user account."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => notifications.filter((item) => !item.is_read).forEach((item) => markReadMutation.mutate(item.id))}
          >
            Mark all read
          </Button>
        }
      />
      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You’re caught up"
          description="No notifications are waiting for you right now."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => markReadMutation.mutate(item.id)}
              className="w-full text-left"
            >
              <Card
                className={cn(
                  "min-w-0",
                  !item.is_read && "border-primary/25 bg-primary-soft/30",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.message}</p>
                    <p className="mt-2 text-xs text-muted">
                      {new Date(item.created_at ?? new Date().toISOString()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                  <Badge tone={item.is_read ? "neutral" : "primary"}>
                    {item.is_read ? "Read" : "Unread"}
                  </Badge>
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
