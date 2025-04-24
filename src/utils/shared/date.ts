import { periods } from "@/const/date";

export type PeriodKeys = (typeof periods)[number]["value"];

export function getPeriod(periodKey: PeriodKeys): {
  start: Date | null;
  end: Date | null;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  switch (periodKey) {
    case "Past30Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 30);
      return { start, end: null };
    }
    case "Past14Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 14);
      return { start, end: null };
    }
    case "Past7Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      return { start, end: null };
    }
    case "Yesterday": {
      const start = new Date(today);
      start.setDate(start.getDate() - 1);
      const end = new Date(today);
      end.setMilliseconds(-1);
      return { start, end };
    }
    case "Today": {
      const start = new Date(today);
      return { start, end: null };
    }
    case "ThisMonth": {
      const start = new Date(today);
      start.setDate(1);
      return { start, end: null };
    }
    case "LastMonth": {
      const start = new Date(today);
      start.setDate(1);
      start.setMonth(start.getMonth() - 1);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setMilliseconds(-1);
      return { start, end };
    }
    default: {
      return { start: null, end: null };
    }
  }
}
