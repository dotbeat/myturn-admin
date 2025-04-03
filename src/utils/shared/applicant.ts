import { ApplyStatus } from "@/types/applicant";

export const applyStatuses = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "OFFERED",
  "ACCEPTED",
  "REJECTED",
] as const satisfies ApplyStatus[];

export const applyStatusIndex: Record<ApplyStatus, { label: string }> = {
  PENDING: { label: "新着応募" },
  REVIEWING: { label: "レビュー中" },
  INTERVIEW: { label: "面談設定済" },
  OFFERED: { label: "内定" },
  ACCEPTED: { label: "入社決定" },
  REJECTED: { label: "採用見送り" },
};
