import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  demoChatSeed,
  demoHomework,
  demoNotifications,
  demoTasks,
} from "@/lib/demoData";
import type {
  AppNotification,
  ChatMessage,
  Homework,
  HomeworkStatus,
  Task,
} from "@/types";

type DemoState = {
  homework: Homework[];
  tasks: Task[];
  notifications: AppNotification[];
  chat: ChatMessage[];
  unreadCount: number;
  setHomeworkStatus: (id: string, status: HomeworkStatus) => void;
  toggleTask: (id: string) => void;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  markNotification: (id: string, read: boolean) => void;
  markAllNotificationsRead: () => void;
  sendChat: (content: string) => void;
};

const DemoStateContext = createContext<DemoState | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [homework, setHomework] = useState(demoHomework);
  const [tasks, setTasks] = useState(demoTasks);
  const [notifications, setNotifications] = useState(demoNotifications);
  const [chat, setChat] = useState(demoChatSeed);

  const value = useMemo<DemoState>(
    () => ({
      homework,
      tasks,
      notifications,
      chat,
      unreadCount: notifications.filter((item) => !item.read).length,
      setHomeworkStatus(id, status) {
        setHomework((current) =>
          current.map((item) => (item.id === id ? { ...item, status } : item)),
        );
      },
      toggleTask(id) {
        setTasks((current) =>
          current.map((item) =>
            item.id === id
              ? { ...item, status: item.status === "done" ? "open" : "done" }
              : item,
          ),
        );
      },
      addTask(title) {
        const next: Task = {
          id: `t-${Date.now()}`,
          title,
          notes: "Added from the demo app.",
          date: "2026-09-19",
          priority: "medium",
          status: "open",
          tag: "Inbox",
        };
        setTasks((current) => [next, ...current]);
      },
      removeTask(id) {
        setTasks((current) => current.filter((item) => item.id !== id));
      },
      markNotification(id, read) {
        setNotifications((current) =>
          current.map((item) => (item.id === id ? { ...item, read } : item)),
        );
      },
      markAllNotificationsRead() {
        setNotifications((current) => current.map((item) => ({ ...item, read: true })));
      },
      sendChat(content) {
        const now = new Date().toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
        });
        const userMessage: ChatMessage = {
          id: `m-${Date.now()}`,
          role: "user",
          content,
          time: now,
        };
        const reply: ChatMessage = {
          id: `m-${Date.now()}-r`,
          role: "assistant",
          content:
            "Demo mode only — I’m not connected to Hugging Face yet. Keep this thought in your planner, and we’ll wire a Qwen model in a later step.",
          time: now,
        };
        setChat((current) => [...current, userMessage, reply]);
      },
    }),
    [homework, tasks, notifications, chat],
  );

  return (
    <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error("useDemoState must be used inside DemoStateProvider");
  }
  return context;
}
