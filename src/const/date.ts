import { SelectItem } from "@/types/select";

export const periods: SelectItem[] = [
  { value: "", label: "全期間" },
  { value: "Past30Days", label: "過去30日間" },
  { value: "Past14Days", label: "過去14日間" },
  { value: "Past7Days", label: "過去7日間" },
  { value: "Yesterday", label: "昨日" },
  { value: "Today", label: "今日" },
  { value: "ThisMonth", label: "今月" },
  { value: "LastMonth", label: "先月" },
];
