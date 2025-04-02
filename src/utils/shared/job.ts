import { JobStatus } from "@/types/job";

export const jobStatuses = [
  "DRAFT",
  "ACTIVE",
  "CLOSED",
] as const satisfies JobStatus[];

export const jobOfferStatusIndex: Record<JobStatus, { label: string }> = {
  DRAFT: { label: "下書き" },
  ACTIVE: { label: "募集中" },
  CLOSED: { label: "募集終了" },
};
