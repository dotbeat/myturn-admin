type User = {
  id: number;
  avatarUrl: string;
  lastName: string;
  firstName: string;
  prefecture: string;
  university: string;
  faculty: string;
  department: string;
  grade: string;
  availableDaysPerWeek: number;
  availableHoursPerWeek: number;
  availableDurationMonths: number;
};

export type UserItem = User & {
  createdAt: string;
  deletedAt: string;
  entryCount: number;
};

export type UserDetail = User & {
  gender: string;
  birthDate: string;
  graduationYear: number;
  interestedIndustries: string;
  interestedJobTypes: string;
  selfPR: string;
  futureGoals: string;
};
