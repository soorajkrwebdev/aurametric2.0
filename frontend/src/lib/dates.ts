const dateFmt = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
});

const weekdayFmt = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
});

export function formatLongDate(date = new Date()) {
  return dateFmt.format(date);
}

export function formatShortDate(value: string) {
  return shortFmt.format(new Date(value));
}

export function formatWeekday(value: string) {
  return weekdayFmt.format(new Date(value));
}

export function daysUntil(value: string) {
  const target = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function dueLabel(value: string) {
  const days = daysUntil(value);
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days < 0) return `${Math.abs(days)}d overdue`;
  return `Due in ${days} days`;
}
