export type ApplyStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFERED"
  | "ACCEPTED"
  | "REJECTED";

export type ApplicantItem = {
  id: number;
  avatarUrl: string;
  lastName: string;
  firstName: string;
  companyName: string;
  jobType: string;
  industry: string;
  jobTitle: string;
  applyDate: Date | null;
  status: ApplyStatus;
};
