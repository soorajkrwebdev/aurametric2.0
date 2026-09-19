import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { FocusPage } from "@/pages/FocusPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { PlannerPage } from "@/pages/PlannerPage";
import { TasksPage } from "@/pages/TasksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "planner", element: <PlannerPage /> },
      { path: "focus", element: <FocusPage /> },
      { path: "insights", element: <InsightsPage /> },
    ],
  },
]);
