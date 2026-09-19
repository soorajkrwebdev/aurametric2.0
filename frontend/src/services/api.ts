import { demoActivity, demoExams, demoHomework, demoProfile, demoSessions, demoSubjects, demoTasks } from "@/lib/demoData";
import { supabase } from "@/lib/supabase";
import type { ApiSuccess, DashboardData, HealthStatus } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

function isDemoMode() {
  const url = import.meta.env.VITE_SUPABASE_URL ?? "";
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

  return !url || !key || url.includes("placeholder") || key.includes("placeholder");
}

function buildDemoDashboard(): DashboardData {
  const totalStudyMinutes = demoSessions.reduce((sum, session) => {
    const end = session.endTime ? session.endTime.split(":") : ["0", "0"];
    const endMinutes = Number(end[0]) * 60 + Number(end[1]);
    const start = session.startTime ? session.startTime.split(":") : ["0", "0"];
    const startMinutes = Number(start[0]) * 60 + Number(start[1]);
    return sum + Math.max(0, endMinutes - startMinutes);
  }, 0);

  return {
    profile: {
      id: "demo-user",
      name: demoProfile.name,
      email: demoProfile.email,
      college: demoProfile.college,
      course: demoProfile.course,
      semester: demoProfile.semester,
      section: demoProfile.section,
      profile_image: null,
      created_at: new Date().toISOString(),
    },
    stats: {
      totalSubjects: demoSubjects.length,
      pendingHomework: demoHomework.filter((item) => item.status !== "submitted").length,
      upcomingExams: demoExams.length,
      completedTasks: demoTasks.filter((item) => item.status === "done").length,
      totalStudyMinutes,
    },
    homework: demoHomework.map((item) => ({
      id: item.id,
      user_id: "demo-user",
      subject_id: item.subjectId ?? null,
      title: item.title,
      description: item.description ?? null,
      due_date: item.dueDate ?? null,
      priority: item.priority,
      status: item.status,
      created_at: new Date().toISOString(),
    })),
    exams: demoExams.map((item) => ({
      id: item.id,
      user_id: "demo-user",
      subject_id: item.subjectId ?? null,
      exam_date: item.date ?? "",
      exam_type: item.type ?? "internal",
      notes: item.syllabus ?? null,
      created_at: new Date().toISOString(),
    })),
    tasks: demoTasks.map((item) => ({
      id: item.id,
      user_id: "demo-user",
      task_title: item.title,
      status: item.status,
      priority: item.priority,
      due_date: item.date,
      created_at: new Date().toISOString(),
    })),
    studySessions: demoSessions.map((item) => ({
      id: item.id,
      user_id: "demo-user",
      subject_id: item.subjectId ?? null,
      topic: item.focus ?? "Study session",
      study_date: item.date ?? new Date().toISOString(),
      duration: (() => {
        const end = item.endTime ? item.endTime.split(":") : ["0", "0"];
        const start = item.startTime ? item.startTime.split(":") : ["0", "0"];
        const endMinutes = Number(end[0]) * 60 + Number(end[1]);
        const startMinutes = Number(start[0]) * 60 + Number(start[1]);
        return Math.max(0, endMinutes - startMinutes);
      })(),
      notes: item.focus ?? null,
      created_at: new Date().toISOString(),
    })),
    recentActivity: demoActivity.map((item) => ({
      id: item.id,
      title: item.title,
      detail: item.detail,
      time: item.time,
      tone: item.tone,
    })),
  };
}

async function request<T>(path: string): Promise<T> {
  if (isDemoMode()) {
    if (path === "/health") {
      return {
        status: "ok",
        service: "Aurametric API",
        timestamp: new Date().toISOString(),
      } as T;
    }

    if (path === "/dashboard") {
      return buildDemoDashboard() as T;
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const body = (await response.json()) as ApiSuccess<T>;
  return body.data;
}

export function fetchHealth() {
  return request<HealthStatus>("/health");
}

export function fetchDashboard() {
  return request<DashboardData>("/dashboard");
}
