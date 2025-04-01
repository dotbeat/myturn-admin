export type CompanyItem = {
  id: number;
  logo: string;
  name: string;
  prefecture: string;
  industry: string;
  registerDate: Date | null;
  leaveDate: Date | null;
  jobCount: number;
  acceptCount: number;
};
