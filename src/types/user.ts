export type UserItem = {
  id: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  prefecture: string;
  university: string;
  faculty: string;
  department: string;
  grade: string;
  registerDate: Date | null;
  leaveDate: Date | null;
  availableDaysPerWeek: number;
  availableHoursPerWeek: number;
  availableDurationMonths: number;
  applyCount: number;
};
