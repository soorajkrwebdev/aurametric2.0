import { supabase } from "../config/supabase.js";
import { getProfileByUserId } from "./profileService.js";
import type { DashboardData, Homework, StudySession, Subject, Task, Exam } from "../types/index.js";

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const [profile, subjects, homework, exams, tasks, studySessions] = await Promise.all([
    getProfileByUserId(userId),
    supabase.from("subjects").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("homework").select("*").eq("user_id", userId).order("due_date", { ascending: true, nullsFirst: false }),
    supabase.from("exams").select("*").eq("user_id", userId).order("exam_date", { ascending: true }),
    supabase.from("tasks").select("*").eq("user_id", userId).order("due_date", { ascending: true, nullsFirst: false }),
    supabase.from("study_sessions").select("*").eq("user_id", userId).order("study_date", { ascending: false }),
  ]);

  if (subjects.error) {
    throw subjects.error;
  }

  if (homework.error) {
    throw homework.error;
  }

  if (exams.error) {
    throw exams.error;
  }

  if (tasks.error) {
    throw tasks.error;
  }

  if (studySessions.error) {
    throw studySessions.error;
  }

  const subjectRows = (subjects.data ?? []) as Subject[];
  const homeworkRows = (homework.data ?? []) as Homework[];
  const examRows = (exams.data ?? []) as Exam[];
  const taskRows = (tasks.data ?? []) as Task[];
  const studyRows = (studySessions.data ?? []) as StudySession[];

  const pendingHomework = homeworkRows.filter((item) => item.status !== "submitted").length;
  const upcomingExams = examRows.filter((item) => new Date(item.exam_date) >= new Date()).length;
  const completedTasks = taskRows.filter((item) => item.status === "done").length;
  const totalStudyMinutes = studyRows.reduce((sum, row) => sum + Number(row.duration), 0);

  const recentActivity = [
    ...homeworkRows.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      detail: `Homework due ${item.due_date ?? "soon"}`,
      time: item.due_date ?? "TBD",
      tone: "primary" as const,
    })),
    ...examRows.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.exam_type,
      detail: `${item.notes ?? "Exam scheduled"}`,
      time: item.exam_date,
      tone: "amber" as const,
    })),
    ...studyRows.slice(0, 2).map((item) => ({
      id: item.id,
      title: item.topic,
      detail: `${item.duration} min session`,
      time: item.study_date,
      tone: "mint" as const,
    })),
  ].slice(0, 6);

  return {
    profile,
    stats: {
      totalSubjects: subjectRows.length,
      pendingHomework,
      upcomingExams,
      completedTasks,
      totalStudyMinutes,
    },
    homework: homeworkRows,
    exams: examRows,
    tasks: taskRows,
    studySessions: studyRows,
    recentActivity,
  };
}
