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
  user_id?: string;
  subject_id?: string | null;
  subjectId?: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  dueDate?: string | null;
  priority: Priority;
  status: HomeworkStatus;
};

export type Exam = {
  id: string;
  user_id?: string;
  subject_id?: string | null;
  subjectId?: string;
  title?: string;
  exam_date?: string;
  date?: string;
  time?: string;
  venue?: string;
  type?: ExamType;
  exam_type?: "internal" | "lab" | "end-semester";
  notes?: string | null;
  syllabus?: string;
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
  user_id?: string;
  name?: string;
  hobby_name?: string;
  weeklyGoalHours?: number;
  loggedHours?: number;
  hours_spent?: number;
  lastSession?: string;
  date?: string;
  note?: string;
  notes?: string | null;
};

export type StudySession = {
  id: string;
  user_id?: string;
  subject_id?: string | null;
  subjectId?: string;
  date?: string;
  study_date?: string;
  startTime?: string;
  endTime?: string;
  focus?: string;
  topic?: string;
  duration?: number;
  notes?: string | null;
  completed?: boolean;
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
  body?: string;
  message?: string;
  time?: string;
  created_at?: string;
  read?: boolean;
  is_read?: boolean;
  category?: "homework" | "exam" | "planner" | "system";
  type?: "homework" | "exam" | "planner" | "system";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  message?: string;
  time?: string;
  created_at?: string;
};

export type ChatThread = {
  id: string;
  title: string;
  preview: string;
};

export type DashboardProfile = {
  id: string;
  name: string | null;
  email: string | null;
  college: string | null;
  course: string | null;
  semester: number | null;
  section: string | null;
  profile_image: string | null;
  created_at: string;
};

export type DashboardHomework = {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: "low" | "medium" | "high";
  status: "not-started" | "in-progress" | "submitted" | "late";
  created_at: string;
};

export type DashboardExam = {
  id: string;
  user_id: string;
  subject_id: string | null;
  exam_date: string;
  exam_type: "internal" | "lab" | "end-semester";
  notes: string | null;
  created_at: string;
};

export type DashboardTask = {
  id: string;
  user_id: string;
  task_title: string;
  status: "open" | "done";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
};

export type DashboardStudySession = {
  id: string;
  user_id: string;
  subject_id: string | null;
  topic: string;
  study_date: string;
  duration: number;
  notes: string | null;
  created_at: string;
};

export type DashboardStats = {
  totalSubjects: number;
  pendingHomework: number;
  upcomingExams: number;
  completedTasks: number;
  totalStudyMinutes: number;
};

export type DashboardData = {
  profile: DashboardProfile | null;
  stats: DashboardStats;
  homework: DashboardHomework[];
  exams: DashboardExam[];
  tasks: DashboardTask[];
  studySessions: DashboardStudySession[];
  recentActivity: Array<{
    id: string;
    title: string;
    detail: string;
    time: string;
    tone: "primary" | "mint" | "amber";
  }>;
};
