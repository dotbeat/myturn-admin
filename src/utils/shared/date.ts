import { periods } from "@/const/date";

export type PeriodKeys = (typeof periods)[number]["value"];

export function getPeriod(periodKey: PeriodKeys): {
  start: Date | null;
  end: Date | null;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterdayLast = new Date(today);
  yesterdayLast.setMilliseconds(-1);

  // (全期間)：現時点までの全期
  // Past30Days(過去30日間)：昨日までの30日間
  // Past14Days(過去14日間)：昨日までの14日間
  // Past7Days(過去7日間)：昨日までの7日間
  // Yesterday(昨日)：昨日0:00から23:59
  // Today(今日)：本日0:00から現時点
  // ThisMonth(今月)：今月1日から現時点
  // LastMonth(先月)：前月1日から末日
  switch (periodKey) {
    case "Past30Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 30);
      return { start, end: yesterdayLast };
    }
    case "Past14Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 14);
      return { start, end: yesterdayLast };
    }
    case "Past7Days": {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      return { start, end: yesterdayLast };
    }
    case "Yesterday": {
      const start = new Date(today);
      start.setDate(start.getDate() - 1);
      return { start, end: yesterdayLast };
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
