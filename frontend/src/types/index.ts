export type HealthStatus = {
  status: string;
  service: string;
  timestamp: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type Priority = "low" | "medium" | "high";
export type HomeworkStatus = "not-started" | "in-progress" | "submitted" | "late";
export type TaskStatus = "open" | "done";
export type ExamType = "internal" | "lab" | "end-semester";

export type StudentProfile = {
  name: string;
  email: string;
  college: string;
  course: string;
  semester: number;
  section: string;
  initials: string;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  semester: number;
  instructor: string;
  progress: number;
  color: "primary" | "mint" | "amber";
  credits: number;
};

export type Homework = {
  id: string;
  title: string;
  subjectId: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: HomeworkStatus;
};

export type Exam = {
  id: string;
  title: string;
  subjectId: string;
  date: string;
  time: string;
  venue: string;
  type: ExamType;
  syllabus: string;
};

export type Task = {
  id: string;
  title: string;
  notes: string;
  date: string;
  priority: Priority;
  status: TaskStatus;
  tag: string;
};

export type Hobby = {
  id: string;
  name: string;
  weeklyGoalHours: number;
  loggedHours: number;
  lastSession: string;
  note: string;
};

export type StudySession = {
  id: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  focus: string;
  completed: boolean;
};

export type WeeklyStudyPoint = {
  day: string;
  hours: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "primary" | "mint" | "amber";
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  category: "homework" | "exam" | "planner" | "system";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

export type ChatThread = {
  id: string;
  title: string;
  preview: string;
};
