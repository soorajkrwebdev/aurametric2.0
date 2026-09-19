import type {
  ActivityItem,
  AppNotification,
  ChatMessage,
  ChatThread,
  Exam,
  Hobby,
  Homework,
  StudentProfile,
  StudySession,
  Subject,
  Task,
  WeeklyStudyPoint,
} from "@/types";

export const demoProfile: StudentProfile = {
  name: "Ananya Krishnan",
  email: "ananya.krishnan@campus.edu",
  college: "St. Mary's College of Engineering",
  course: "B.Tech Computer Science",
  semester: 5,
  section: "B",
  initials: "AK",
};

export const demoSubjects: Subject[] = [
  {
    id: "os",
    name: "Operating Systems",
    code: "CS301",
    semester: 5,
    instructor: "Dr. Meera Nair",
    progress: 72,
    color: "primary",
    credits: 4,
  },
  {
    id: "dbms",
    name: "Database Systems",
    code: "CS305",
    semester: 5,
    instructor: "Prof. Arjun Menon",
    progress: 64,
    color: "mint",
    credits: 4,
  },
  {
    id: "cn",
    name: "Computer Networks",
    code: "CS307",
    semester: 5,
    instructor: "Dr. Latha Iyer",
    progress: 58,
    color: "amber",
    credits: 3,
  },
  {
    id: "se",
    name: "Software Engineering",
    code: "CS309",
    semester: 5,
    instructor: "Ms. Rhea D'Souza",
    progress: 81,
    color: "primary",
    credits: 3,
  },
  {
    id: "ml",
    name: "Machine Learning",
    code: "CS321",
    semester: 5,
    instructor: "Dr. Kabir Hussain",
    progress: 46,
    color: "mint",
    credits: 4,
  },
];

export const demoHomework: Homework[] = [
  {
    id: "hw-1",
    title: "Process scheduling lab report",
    subjectId: "os",
    description: "Compare FCFS, SJF, and Round Robin on the sample workload. Include Gantt charts and waiting-time tables.",
    dueDate: "2026-09-20",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "hw-2",
    title: "Normalisation worksheet",
    subjectId: "dbms",
    description: "Take the library schema to 3NF. List functional dependencies and justify each decomposition.",
    dueDate: "2026-09-22",
    priority: "medium",
    status: "not-started",
  },
  {
    id: "hw-3",
    title: "Subnetting practice set",
    subjectId: "cn",
    description: "Solve the eight VLSM problems. Show network, broadcast, and usable host ranges.",
    dueDate: "2026-09-24",
    priority: "medium",
    status: "not-started",
  },
  {
    id: "hw-4",
    title: "Sprint retrospective notes",
    subjectId: "se",
    description: "Write a one-page retro for the campus portal sprint: what worked, what stalled, next experiment.",
    dueDate: "2026-09-19",
    priority: "low",
    status: "submitted",
  },
  {
    id: "hw-5",
    title: "Decision tree from weather data",
    subjectId: "ml",
    description: "Train a shallow tree on the provided CSV. Report accuracy, a confusion matrix, and two misclassified rows.",
    dueDate: "2026-09-26",
    priority: "high",
    status: "in-progress",
  },
];

export const demoExams: Exam[] = [
  {
    id: "ex-1",
    title: "OS series test II",
    subjectId: "os",
    date: "2026-09-28",
    time: "10:00 AM",
    venue: "Hall A2",
    type: "internal",
    syllabus: "CPU scheduling, deadlock, memory management through paging",
  },
  {
    id: "ex-2",
    title: "DBMS lab practical",
    subjectId: "dbms",
    date: "2026-10-03",
    time: "02:00 PM",
    venue: "Lab 4",
    type: "lab",
    syllabus: "SQL joins, views, and a short normalisation question",
  },
  {
    id: "ex-3",
    title: "Networks mid-term",
    subjectId: "cn",
    date: "2026-10-08",
    time: "09:30 AM",
    venue: "Hall B1",
    type: "internal",
    syllabus: "OSI vs TCP/IP, IP addressing, reliable data transfer",
  },
  {
    id: "ex-4",
    title: "ML quiz — supervised learning",
    subjectId: "ml",
    date: "2026-10-14",
    time: "11:00 AM",
    venue: "Seminar 2",
    type: "internal",
    syllabus: "Bias-variance, decision trees, kNN, evaluation metrics",
  },
];

export const demoTasks: Task[] = [
  {
    id: "t-1",
    title: "Print OS lab graphs",
    notes: "Use the department printer before 4 PM.",
    date: "2026-09-19",
    priority: "high",
    status: "open",
    tag: "Campus",
  },
  {
    id: "t-2",
    title: "Revise paging diagrams",
    notes: "Two pages in the Meera Nair notes.",
    date: "2026-09-19",
    priority: "medium",
    status: "open",
    tag: "Study",
  },
  {
    id: "t-3",
    title: "Pay exam form fee",
    notes: "Portal closes Sunday night.",
    date: "2026-09-19",
    priority: "high",
    status: "done",
    tag: "Admin",
  },
  {
    id: "t-4",
    title: "Message project teammates",
    notes: "Share the Figma link for the portal screens.",
    date: "2026-09-20",
    priority: "low",
    status: "open",
    tag: "Team",
  },
  {
    id: "t-5",
    title: "Pack ID card and calculator",
    notes: "Needed for Monday internals.",
    date: "2026-09-21",
    priority: "medium",
    status: "open",
    tag: "Campus",
  },
];

export const demoHobbies: Hobby[] = [
  {
    id: "h-1",
    name: "Classical guitar",
    weeklyGoalHours: 4,
    loggedHours: 2.5,
    lastSession: "2026-09-18",
    note: "Working through the second Villa-Lobos prelude.",
  },
  {
    id: "h-2",
    name: "Evening runs",
    weeklyGoalHours: 3,
    loggedHours: 2,
    lastSession: "2026-09-17",
    note: "Campus loop, easy pace. Rest day today.",
  },
  {
    id: "h-3",
    name: "Sketch journal",
    weeklyGoalHours: 2,
    loggedHours: 0.75,
    lastSession: "2026-09-14",
    note: "Ink study of the library steps.",
  },
];

export const demoSessions: StudySession[] = [
  {
    id: "s-1",
    subjectId: "os",
    date: "2026-09-19",
    startTime: "07:30",
    endTime: "09:00",
    focus: "Deadlock prevention vs avoidance",
    completed: true,
  },
  {
    id: "s-2",
    subjectId: "ml",
    date: "2026-09-19",
    startTime: "16:00",
    endTime: "17:30",
    focus: "Decision tree lab + write-up start",
    completed: false,
  },
  {
    id: "s-3",
    subjectId: "dbms",
    date: "2026-09-20",
    startTime: "08:00",
    endTime: "09:30",
    focus: "3NF worksheet block 1",
    completed: false,
  },
  {
    id: "s-4",
    subjectId: "cn",
    date: "2026-09-20",
    startTime: "19:00",
    endTime: "20:00",
    focus: "VLSM drills",
    completed: false,
  },
  {
    id: "s-5",
    subjectId: "se",
    date: "2026-09-21",
    startTime: "10:00",
    endTime: "11:00",
    focus: "Use-case diagram polish",
    completed: false,
  },
];

export const demoWeeklyStudy: WeeklyStudyPoint[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 1 },
  { day: "Sun", hours: 0 },
];

export const demoActivity: ActivityItem[] = [
  {
    id: "a-1",
    title: "Submitted Software Engineering retro",
    detail: "Marked complete at 11:40 AM",
    time: "2h ago",
    tone: "mint",
  },
  {
    id: "a-2",
    title: "OS lab graphs exported",
    detail: "Saved to Assignments / CS301",
    time: "Yesterday",
    tone: "primary",
  },
  {
    id: "a-3",
    title: "Study block: paging",
    detail: "90 focused minutes before class",
    time: "Yesterday",
    tone: "amber",
  },
];

export const demoNotifications: AppNotification[] = [
  {
    id: "n-1",
    title: "OS lab report due tomorrow",
    body: "Process scheduling write-up is still in progress. Leave time for the Gantt charts.",
    time: "20 min ago",
    read: false,
    category: "homework",
  },
  {
    id: "n-2",
    title: "Series test on 28 Sep",
    body: "Operating Systems series test II — Hall A2 at 10:00 AM.",
    time: "2h ago",
    read: false,
    category: "exam",
  },
  {
    id: "n-3",
    title: "Evening ML session",
    body: "Your 4:00–5:30 PM block is still open. Decision tree lab is waiting.",
    time: "Yesterday",
    read: true,
    category: "planner",
  },
  {
    id: "n-4",
    title: "Exam form reminder",
    body: "Campus portal closes Sunday. Fee task is already ticked off.",
    time: "Yesterday",
    read: true,
    category: "system",
  },
];

export const demoThreads: ChatThread[] = [
  {
    id: "c-1",
    title: "Plan the OS week",
    preview: "Break the scheduling lab into two sittings…",
  },
  {
    id: "c-2",
    title: "3NF checklist",
    preview: "What should I verify before submitting?",
  },
];

export const demoChatSeed: ChatMessage[] = [
  {
    id: "m-1",
    role: "assistant",
    content:
      "Hi Ananya — I’m the Aurametric study assistant. I can help you break work into sitting-sized pieces. I’m in demo mode right now, so answers stay on this device.",
    time: "4:02 PM",
  },
  {
    id: "m-2",
    role: "user",
    content: "How should I finish the OS lab report tonight without skipping guitar practice?",
    time: "4:03 PM",
  },
  {
    id: "m-3",
    role: "assistant",
    content:
      "Do the Gantt charts first (35 min), write the comparison table next (25 min), then stop for guitar. The discussion paragraph can wait until the 7:30 AM block tomorrow.",
    time: "4:03 PM",
  },
];

export function subjectById(id: string) {
  return demoSubjects.find((subject) => subject.id === id);
}

export function subjectName(id: string) {
  return subjectById(id)?.name ?? "Subject";
}
