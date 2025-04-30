export type JobStatus = "DRAFT" | "ACTIVE" | "CLOSED";

export type JobItem = {
  id: number;
  jobHeader: string;
  title: string;
  companyName: string;
  jobType: string;
  industry: string;
  updatedAt: string;
  status: JobStatus;
  pv: number;
  favoriteCount: number;
  entryCount: number;
  acceptCount: number;
};
