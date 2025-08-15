export type CompanyItem = {
  id: number;
  iconImageUrl: string;
  name: string;
  prefecture: string;
  industry: string;
  createdAt: Date;
  deletedAt: Date | null;
  jobCount: number;
  entryCount: number;
  interviewCount: number;
  offerCount: number;
  acceptCount: number;
};
