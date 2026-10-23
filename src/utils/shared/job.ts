import { JobStatus, StatusIndicator } from "@/types/job";

export const jobOfferStatuses = [
  "DRAFT",
  "ACTIVE",
  "CLOSED",
] as const satisfies JobStatus[];

export const jobOfferStatusIndex: Record<JobStatus, StatusIndicator> = {
  DRAFT: { label: "下書き", colorClass: "bg-(--myturn-sub-text)" },
  ACTIVE: { label: "募集中", colorClass: "bg-(--myturn-main)" },
  CLOSED: {
    label: "募集終了",
    colorClass: "bg-(--myturn-support-middle)",
  },
};
