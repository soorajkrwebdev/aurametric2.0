import { Bell } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemoState } from "@/contexts/DemoStateContext";
import { cn } from "@/lib/utils";

export function NotificationsPage() {
  const { notifications, markNotification, markAllNotificationsRead } = useDemoState();

  return (
    <div className="mx-auto max-w-3xl min-w-0">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Read and unread cards. Nothing is pushed from a server yet."
        action={
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
            Mark all read
          </Button>
        }
      />
      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You’re caught up"
          description="New reminders will show here once the backend exists."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => markNotification(item.id, !item.read)}
              className="w-full text-left"
            >
              <Card
                className={cn(
                  "min-w-0",
                  !item.read && "border-primary/25 bg-primary-soft/30",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
                    <p className="mt-2 text-xs text-muted">{item.time}</p>
                  </div>
                  <Badge tone={item.read ? "neutral" : "primary"}>
                    {item.read ? "Read" : "Unread"}
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
