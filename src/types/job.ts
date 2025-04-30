export type JobStatus = "DRAFT" | "ACTIVE" | "CLOSED";

export type JobItem = {
  id: number;
  jobHeader: string;
  title: string;
  companyName: string;
  prefecture: string;
  jobType: string;
  industry: string;
  openDate: Date | null;
  status: JobStatus;
  pvCount: number;
  favoriteCount: number;
  applyCount: number;
  acceptCount: number;
};
