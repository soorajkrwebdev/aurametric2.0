export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type Profile = {
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

export type Subject = {
  id: string;
  user_id: string;
  name: string;
  code: string | null;
  semester: number | null;
  created_at: string;
};

export type Homework = {
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

export type StudySession = {
  id: string;
  user_id: string;
  subject_id: string | null;
  topic: string;
  study_date: string;
  duration: number;
  notes: string | null;
  created_at: string;
};

export type Exam = {
  id: string;
  user_id: string;
  subject_id: string | null;
  exam_date: string;
  exam_type: "internal" | "lab" | "end-semester";
  notes: string | null;
  created_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  task_title: string;
  status: "open" | "done";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
};

export type Hobby = {
  id: string;
  user_id: string;
  hobby_name: string;
  hours_spent: number;
  date: string;
  notes: string | null;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "homework" | "exam" | "planner" | "system";
  is_read: boolean;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  message: string;
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
  profile: Profile | null;
  stats: DashboardStats;
  homework: Homework[];
  exams: Exam[];
  tasks: Task[];
  studySessions: StudySession[];
  recentActivity: Array<{
    id: string;
    title: string;
    detail: string;
    time: string;
    tone: "primary" | "mint" | "amber";
  }>;
};
