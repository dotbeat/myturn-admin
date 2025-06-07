export type ApplyStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFERED"
  | "ACCEPTED"
  | "REJECTED";

export type ApplicantItem = {
  id: number;
  user: {
    id: number;
    lastName: string;
    firstName: string;
    avatarUrl: string;
    deletedAt: Date | null;
  };
  job: {
    title: string;
    jobType: string;
    industry: string;
    company: {
      name: string;
    };
  };
  createdAt: string;
  status: ApplyStatus;
};
