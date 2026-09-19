import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AiChatPage } from "@/pages/AiChatPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ExamsPage } from "@/pages/ExamsPage";
import { HobbiesPage } from "@/pages/HobbiesPage";
import { HomeworkPage } from "@/pages/HomeworkPage";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ProgressPage } from "@/pages/ProgressPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { StudyPlannerPage } from "@/pages/StudyPlannerPage";
import { SubjectsPage } from "@/pages/SubjectsPage";
import { TasksPage } from "@/pages/TasksPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "subjects", element: <SubjectsPage /> },
      { path: "homework", element: <HomeworkPage /> },
      { path: "planner", element: <StudyPlannerPage /> },
      { path: "exams", element: <ExamsPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "hobbies", element: <HobbiesPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "chat", element: <AiChatPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
