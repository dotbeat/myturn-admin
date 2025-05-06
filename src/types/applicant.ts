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
  user: {
    lastName: string;
    firstName: string;
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
