export type JobStatus = "DRAFT" | "ACTIVE" | "CLOSED";

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
  pv: number;
  favoriteCount: number;
  entryCount: number;
  acceptCount: number;
};
