import { JobStatus, StatusIndicator } from "@/types/job";

export const jobOfferStatuses = [
  "DRAFT",
  "ACTIVE",
  "CLOSED",
] as const satisfies JobStatus[];

export const jobOfferStatusIndex: Record<JobStatus, StatusIndicator> = {
  DRAFT: { label: "下書き", colorClass: "bg-[var(--myturn-sub-text)]" },
  ACTIVE: { label: "募集中", colorClass: "bg-[var(--myturn-main)]" },
  CLOSED: {
    label: "募集終了",
    colorClass: "bg-[var(--myturn-support-middle)]",
  },
};
