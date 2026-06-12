export type JobStatus = "DRAFT" | "ACTIVE" | "CLOSED";

export type StatusIndicator = {
  label: string;
  colorClass: string;
};

export type JobItem = {
  id: number;
  jobHeader: string;
  title: string;
  companyName: string;
  companyDeletedAt: Date | null;
  jobType: string;
  industry: string;
  openedAt: Date | null;
  deletedAt: Date | null;
  status: JobStatus;
  isAgentPlanOnly: boolean;
  pv: number;
  favoriteCount: number;
  entryCount: number;
  acceptCount: number;
};
