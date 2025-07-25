import { ApplyStatus } from "@/types/applicant";

export const applyStatuses = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "SECOND_INTERVIEW_SCHEDULED",
  "OFFERED",
  "ACCEPTED",
  "REJECTED",
] as const satisfies ApplyStatus[];

export const applyStatusIndex: Record<ApplyStatus, { label: string }> = {
  PENDING: { label: "新着応募" },
  REVIEWING: { label: "レビュー中" },
  INTERVIEW: { label: "面談設定済" },
  SECOND_INTERVIEW_SCHEDULED: { label: "二次面談設定済み" },
  OFFERED: { label: "内定" },
  ACCEPTED: { label: "入社決定" },
  REJECTED: { label: "採用見送り" },
};
