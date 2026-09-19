import { supabase } from "../config/supabase.js";
import { getProfileByUserId } from "./profileService.js";
import type { DashboardData, Homework, StudySession, Subject, Task, Exam } from "../types/index.js";

export async function getDashboardData(userId: string): Promise<DashboardData> {
  if (userId === "demo-user") {
    const profile = {
      id: "demo-user",
      name: "Ananya Krishnan",
      email: "ananya.krishnan@campus.edu",
      college: "St. Mary's College of Engineering",
      course: "B.Tech Computer Science",
      semester: 5,
      section: "B",
      profile_image: null,
      created_at: new Date().toISOString(),
    };

    const homeworkRows: Homework[] = [
      {
        id: "hw-1",
        user_id: "demo-user",
        subject_id: "os",
        title: "Process scheduling lab report",
        description: "Compare FCFS, SJF, and Round Robin on the sample workload.",
        due_date: "2026-09-20",
        priority: "high",
        status: "in-progress",
        created_at: new Date().toISOString(),
      },
      {
        id: "hw-2",
        user_id: "demo-user",
        subject_id: "dbms",
        title: "Normalisation worksheet",
        description: "Take the library schema to 3NF.",
        due_date: "2026-09-22",
        priority: "medium",
        status: "not-started",
        created_at: new Date().toISOString(),
      },
      {
        id: "hw-3",
        user_id: "demo-user",
        subject_id: "cn",
        title: "Subnetting practice set",
        description: "Solve the eight VLSM problems.",
        due_date: "2026-09-24",
        priority: "medium",
        status: "not-started",
        created_at: new Date().toISOString(),
      },
    ];

    const examRows: Exam[] = [
      {
        id: "ex-1",
        user_id: "demo-user",
        subject_id: "os",
        exam_date: "2026-09-28",
        exam_type: "internal",
        notes: "CPU scheduling, deadlock, memory management",
        created_at: new Date().toISOString(),
      },
      {
        id: "ex-2",
        user_id: "demo-user",
        subject_id: "dbms",
        exam_date: "2026-10-03",
        exam_type: "lab",
        notes: "SQL joins, views, normalisation",
        created_at: new Date().toISOString(),
      },
    ];

    const taskRows: Task[] = [
      {
        id: "t-1",
        user_id: "demo-user",
        task_title: "Print OS lab graphs",
        status: "open",
        priority: "high",
        due_date: "2026-09-19",
        created_at: new Date().toISOString(),
      },
      {
        id: "t-2",
        user_id: "demo-user",
        task_title: "Revise paging diagrams",
        status: "open",
        priority: "medium",
        due_date: "2026-09-19",
        created_at: new Date().toISOString(),
      },
      {
        id: "t-3",
        user_id: "demo-user",
        task_title: "Pay exam form fee",
        status: "done",
        priority: "high",
        due_date: "2026-09-19",
        created_at: new Date().toISOString(),
      },
    ];

    const studyRows: StudySession[] = [
      {
        id: "s-1",
        user_id: "demo-user",
        subject_id: "os",
        topic: "Deadlock prevention vs avoidance",
        study_date: "2026-09-19",
        duration: 90,
        notes: "Focused 90-minute study block",
        created_at: new Date().toISOString(),
      },
      {
        id: "s-2",
        user_id: "demo-user",
        subject_id: "ml",
        topic: "Decision tree lab",
        study_date: "2026-09-19",
        duration: 90,
        notes: "Planning the write-up",
        created_at: new Date().toISOString(),
      },
    ];

    const totalStudyMinutes = studyRows.reduce((sum, row) => sum + Number(row.duration), 0);
    const recentActivity = [
      {
        id: "a-1",
        title: "OS lab report updated",
        detail: "Process scheduling work is in progress",
        time: "2h ago",
        tone: "primary" as const,
      },
      {
        id: "a-2",
        title: "Series test reminder",
        detail: "OS internal is scheduled for 28 Sep",
        time: "Today",
        tone: "amber" as const,
      },
      {
        id: "a-3",
        title: "Study session logged",
        detail: "90 minutes on deadlock prevention",
        time: "Today",
        tone: "mint" as const,
      },
    ];

    return {
      profile,
      stats: {
        totalSubjects: 5,
        pendingHomework: homeworkRows.filter((item) => item.status !== "submitted").length,
        upcomingExams: examRows.length,
        completedTasks: taskRows.filter((item) => item.status === "done").length,
        totalStudyMinutes,
      },
      homework: homeworkRows,
      exams: examRows,
      tasks: taskRows,
      studySessions: studyRows,
      recentActivity,
    };
  }

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
