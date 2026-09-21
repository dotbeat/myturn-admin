export type ReminderDelayType =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFERED";

export type ReminderCandidateCompany = {
  id: number;
  name: string;
  email: string;
  overdueCount: number;
  waitingCount: number;
};

export type ReminderTargetUser = {
  entryId: number;
  userId: number;
  userName: string;
  jobTitle: string;
  delayType: ReminderDelayType;
  thresholdDays: number;
  elapsedDays: number;
  isOverdue: boolean;
  lastRemindedAt: Date | null;
  lastRemindedIsOverdue: boolean | null;
};

export type ReminderTargetCompany = {
  id: number;
  name: string;
  email: string;
};

export type CompanyReminderUser = {
  id: number;
  entryId: number;
  userId: number;
  userName: string;
  jobTitle: string;
  delayType: ReminderDelayType;
  elapsedDays: number;
  isOverdue: boolean;
};

export type CompanyReminder = {
  id: number;
  companyId: number;
  templateName: string;
  subject: string;
  body: string;
  isSuccess: boolean;
  errorMessage: string | null;
  underThresholdCount: number;
  createdAt: Date;
  users: CompanyReminderUser[];
};

export type ReminderTemplate = {
  name: string;
  subject: string;
  /** `{企業名}` `{学生リスト}` を差し込む本文の外枠 */
  body: string;
};
