import {
  CalendarDays,
  CheckSquare,
  Home,
  Sparkles,
  Timer,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/focus", label: "Focus", icon: Timer },
  { to: "/insights", label: "Insights", icon: Sparkles },
] as const;
