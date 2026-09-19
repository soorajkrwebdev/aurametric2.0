import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageCircle,
  Palette,
  Settings,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end: boolean;
};

export const sidebarGroups: { title: string; items: AppNavItem[] }[] = [
  {
    title: "Study",
    items: [
      { to: "/app", label: "Home", icon: LayoutDashboard, end: true },
      { to: "/app/subjects", label: "Subjects", icon: BookOpen, end: false },
      { to: "/app/homework", label: "Homework", icon: ClipboardList, end: false },
      { to: "/app/planner", label: "Study planner", icon: CalendarDays, end: false },
      { to: "/app/exams", label: "Exams", icon: GraduationCap, end: false },
    ],
  },
  {
    title: "Life",
    items: [
      { to: "/app/tasks", label: "Tasks", icon: CheckSquare, end: false },
      { to: "/app/hobbies", label: "Hobbies", icon: Palette, end: false },
      { to: "/app/progress", label: "Progress", icon: Sparkles, end: false },
    ],
  },
  {
    title: "Inbox",
    items: [
      { to: "/app/notifications", label: "Notifications", icon: Bell, end: false },
      { to: "/app/chat", label: "AI chat", icon: MessageCircle, end: false },
    ],
  },
  {
    title: "You",
    items: [
      { to: "/app/profile", label: "Profile", icon: UserRound, end: false },
      { to: "/app/settings", label: "Settings", icon: Settings, end: false },
    ],
  },
];

export const mobileNavItems: AppNavItem[] = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/homework", label: "Work", icon: ClipboardList, end: false },
  { to: "/app/planner", label: "Plan", icon: CalendarDays, end: false },
  { to: "/app/tasks", label: "Tasks", icon: CheckSquare, end: false },
];

export const allAppLinks: AppNavItem[] = sidebarGroups.flatMap((group) => group.items);
