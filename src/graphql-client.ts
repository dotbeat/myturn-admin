/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type AdminLoginWithGoogleInput = {
  /** Googleログインで取得したIDトークン */
  idToken: string;
};

/** 管理画面アカウントの権限（SYSTEM_ADMIN: システム管理者, MODERATOR: モデレータ, VIEWER: 閲覧のみ） */
export enum AdminRole {
  Moderator = "MODERATOR",
  SystemAdmin = "SYSTEM_ADMIN",
  Viewer = "VIEWER",
}

export type CreateAdditionalScoutTicketInput = {
  companyId: number;
  totalCount: number;
};

export type CreateAdminAllowedEmailInput = {
  email: string;
  /** 初回登録時に付与する権限 */
  initialRole: AdminRole;
};

export type CreateCompanyAcceptTicketInput = {
  amount: number;
  companyId: number;
  count: number;
  expiredAt: any;
  isGuaranteed?: boolean | null | undefined;
  service?: string | null | undefined;
};

export type DeleteAdminAllowedEmailInput = {
  id: number;
};

export type DeleteAdminUserInput = {
  id: number;
};

export type DeleteCompanyAcceptTicketInput = {
  id: number;
};

export type GetAdminMessagesInput = {
  companyId?: number | null | undefined;
  jobId?: number | null | undefined;
  limit?: number | null | undefined;
  page?: number | null | undefined;
  search?: string | null | undefined;
  userId?: number | null | undefined;
};

export type GetCompaniesInput = {
  acceptCountMax?: number | null | undefined;
  acceptCountMin?: number | null | undefined;
  entryCountMax?: number | null | undefined;
  entryCountMin?: number | null | undefined;
  includeDeleted?: boolean | null | undefined;
  industry?: string | null | undefined;
  jobCountMax?: number | null | undefined;
  jobCountMin?: number | null | undefined;
  leaveDateEnd?: any;
  leaveDateStart?: any;
  limit?: number | null | undefined;
  name?: string | null | undefined;
  offerCountMax?: number | null | undefined;
  offerCountMin?: number | null | undefined;
  orderBy?: string | null | undefined;
  orderDirection?: string | null | undefined;
  page?: number | null | undefined;
  prefecture?: string | null | undefined;
  registerDateEnd?: any;
  registerDateStart?: any;
};

export type GetCompaniesStatisticsInput = {
  periodEnd?: any;
  periodStart?: any;
};

export type GetCompanyAcceptTicketsInput = {
  companyId?: number | null | undefined;
  expiredAtEnd?: any;
  expiredAtStart?: any;
  limit?: number | null | undefined;
  page?: number | null | undefined;
};

export type GetCompanyInvoicesInput = {
  acceptDateEnd?: any;
  acceptDateStart?: any;
  applicantName?: string | null | undefined;
  companyId?: number | null | undefined;
  companyName?: string | null | undefined;
  limit?: number | null | undefined;
  page?: number | null | undefined;
  paymentLimitDateEnd?: any;
  paymentLimitDateStart?: any;
  service?: string | null | undefined;
};

export type GetCompanyInvoicesStatisticsInput = {
  periodEnd?: any;
  periodStart?: any;
};

export type GetCompanyReminderTargetsInput = {
  companyId: number;
};

export type GetCompanyRemindersInput = {
  companyId: number;
};

export type GetEntriesStatisticsInput = {
  periodEnd?: any;
  periodStart?: any;
};

export type GetJobsStatisticsInput = {
  periodEnd?: any;
  periodStart?: any;
};

export type GetReminderCandidateCompaniesInput = {
  /** 企業名の部分一致（指定時は基準超過がなくても対象の学生がいる企業を返す） */
  keyword?: string | null | undefined;
  /** 基準超過のある企業のみに絞るか（デフォルトtrue。falseの場合は未対応の新着応募がある全企業） */
  onlyOverdue?: boolean | null | undefined;
};

export type GetUsersStatisticsInput = {
  periodEnd?: any;
  periodStart?: any;
};

export type HotJobScoringWeightItemInput = {
  indicator: string;
  weight: number;
};

export type LineNotificationItemInput = {
  isEnabled: boolean;
  key: string;
  message: string;
  schedule?: LineNotificationScheduleInput | null | undefined;
};

export type LineNotificationScheduleInput = {
  dayOfMonth?: Array<number | null | undefined> | null | undefined;
  dayOfWeek?: Array<number> | null | undefined;
  hour: number;
  minute: number;
  scheduleType: string;
};

export type MagazineItemInput = {
  articleUrl: string;
  category: string;
  description: string;
  id: number;
  thumbnailBase64?: string | null | undefined;
  thumbnailMimeType?: string | null | undefined;
  thumbnailUrl: string;
  title: string;
};

export type OldHotJobItemInput = {
  jobId: number;
};

export type OldPickJobItemInput = {
  jobId: number;
};

export type PickJobScoringWeightItemInput = {
  indicator: string;
  weight: number;
};

/** 企業催促の対象となる遅延の種類 */
export enum ReminderDelayType {
  Interview = "INTERVIEW",
  Offered = "OFFERED",
  Pending = "PENDING",
  Reviewing = "REVIEWING",
}

export type SearchAdditionalScoutTicketsInput = {
  companyName?: string | null | undefined;
  limit: number;
  page: number;
};

export type SearchEntriesInput = {
  companyName?: string | null | undefined;
  entryDateEnd?: any;
  entryDateStart?: any;
  industry?: string | null | undefined;
  interviewDateEnd?: any;
  interviewDateStart?: any;
  jobTitle?: string | null | undefined;
  jobType?: string | null | undefined;
  joinDateByApplicantEnd?: any;
  joinDateByApplicantStart?: any;
  joinDateEnd?: any;
  joinDateStart?: any;
  limit?: number | null | undefined;
  name?: string | null | undefined;
  page?: number | null | undefined;
  scoutedUserId?: number | null | undefined;
  secondInterviewDateEnd?: any;
  secondInterviewDateStart?: any;
  status?: string | null | undefined;
};

export type SearchJobsWithStatsInput = {
  acceptCountMax?: number | null | undefined;
  acceptCountMin?: number | null | undefined;
  closeDateEnd?: any;
  closeDateStart?: any;
  companyName?: string | null | undefined;
  entryCountMax?: number | null | undefined;
  entryCountMin?: number | null | undefined;
  favoriteCountMax?: number | null | undefined;
  favoriteCountMin?: number | null | undefined;
  industry?: string | null | undefined;
  jobType?: string | null | undefined;
  limit?: number | null | undefined;
  openDateEnd?: any;
  openDateStart?: any;
  page?: number | null | undefined;
  prefecture?: string | null | undefined;
  pvCountMax?: number | null | undefined;
  pvCountMin?: number | null | undefined;
  status?: string | null | undefined;
  title?: string | null | undefined;
};

export type SearchUsersInput = {
  availableDaysPerWeekMax?: number | null | undefined;
  availableDaysPerWeekMin?: number | null | undefined;
  availableDurationMonthsMax?: number | null | undefined;
  availableDurationMonthsMin?: number | null | undefined;
  availableHoursPerWeekMax?: number | null | undefined;
  availableHoursPerWeekMin?: number | null | undefined;
  departments?: Array<string> | null | undefined;
  enteredCompanyId?: number | null | undefined;
  entryCountMax?: number | null | undefined;
  entryCountMin?: number | null | undefined;
  faculty?: string | null | undefined;
  favoritedJobId?: number | null | undefined;
  gender?: string | null | undefined;
  grades?: Array<string> | null | undefined;
  interestedIndustries?: Array<string> | null | undefined;
  interestedJobTypes?: Array<string> | null | undefined;
  isAccepted?: boolean | null | undefined;
  isIncludeDeleted?: boolean | null | undefined;
  /** スカウト情報を含めるか */
  isIncludeScout?: boolean | null | undefined;
  /** 自社がスカウトした求職者のみを表示するか */
  isOnlyScoutedByMe?: boolean | null | undefined;
  lastLogInDateEnd?: any;
  lastLogInDateStart?: any;
  leaveDateEnd?: any;
  leaveDateStart?: any;
  limit?: number | null | undefined;
  name?: string | null | undefined;
  page?: number | null | undefined;
  prefectures?: Array<string> | null | undefined;
  /** 名前など直接特定できる個人情報を除いたキーワード検索 */
  privacyKeyword?: string | null | undefined;
  registerDateEnd?: any;
  registerDateStart?: any;
  scoutCountMax?: number | null | undefined;
  scoutCountMin?: number | null | undefined;
  scoutedCompanyId?: number | null | undefined;
  university?: string | null | undefined;
};

export type SendCompanyReminderInput = {
  /** 送信する本文（編集後の内容） */
  body: string;
  companyId: number;
  /** 催促対象として選択したエントリーID */
  entryIds: Array<number>;
  subject: string;
  /** 使用したテンプレート名 */
  templateName: string;
};

export type UpdateAdminUserRoleInput = {
  id: number;
  role: AdminRole;
};

export type UpdateCompanyAcceptTicketInput = {
  amount?: number | null | undefined;
  count?: number | null | undefined;
  expiredAt?: any;
  id: number;
};

export type UpdateCompanyAgentPlanAmountInput = {
  agentPlanAmount: number;
  id: number;
};

export type UpdateCompanyInvoiceInput = {
  amount: number;
  id: number;
};

export type UpdateEntryInput = {
  id: number;
  interviewScheduledAt?: string | null | undefined;
  jobOfferScheduledAt?: string | null | undefined;
  secondInterviewScheduledAt?: string | null | undefined;
  status?: string | null | undefined;
};

export type UpdateHotJobScoringWeightsInput = {
  weights: Array<HotJobScoringWeightItemInput>;
};

export type UpdateJobIsAgentPlanOnlyInput = {
  id: number;
  isAgentPlanOnly: boolean;
};

export type UpdateJobStatusInput = {
  id: number;
  status: string;
};

export type UpdateLineNotificationSettingsInput = {
  notifications: Array<LineNotificationItemInput>;
};

export type UpdateMagazinesInput = {
  magazines: Array<MagazineItemInput>;
};

export type UpdateOldHotJobsInput = {
  oldHotJobs: Array<OldHotJobItemInput>;
};

export type UpdateOldPickJobsInput = {
  oldPickJobs: Array<OldPickJobItemInput>;
};

export type UpdatePickJobScoringWeightsInput = {
  weights: Array<PickJobScoringWeightItemInput>;
};

export type AdminLoginWithGoogleMutationVariables = Exact<{
  input: AdminLoginWithGoogleInput;
}>;

export type AdminLoginWithGoogleMutation = {
  adminLoginWithGoogle: { id: number };
};

export type AdminLogoutMutationVariables = Exact<{ [key: string]: never }>;

export type AdminLogoutMutation = { adminLogout: { message: string } };

export type UpdateAdminUserRoleMutationVariables = Exact<{
  input: UpdateAdminUserRoleInput;
}>;

export type UpdateAdminUserRoleMutation = {
  updateAdminUserRole: { id: number; role: AdminRole };
};

export type DeleteAdminUserMutationVariables = Exact<{
  input: DeleteAdminUserInput;
}>;

export type DeleteAdminUserMutation = { deleteAdminUser: boolean };

export type CreateAdminAllowedEmailMutationVariables = Exact<{
  input: CreateAdminAllowedEmailInput;
}>;

export type CreateAdminAllowedEmailMutation = {
  createAdminAllowedEmail: { id: number };
};

export type DeleteAdminAllowedEmailMutationVariables = Exact<{
  input: DeleteAdminAllowedEmailInput;
}>;

export type DeleteAdminAllowedEmailMutation = {
  deleteAdminAllowedEmail: boolean;
};

export type AdminMeQueryVariables = Exact<{ [key: string]: never }>;

export type AdminMeQuery = {
  adminMe: {
    id: number;
    email: string;
    name: string | null;
    avatarUrl: string | null;
    role: AdminRole;
  };
};

export type GetAdminUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAdminUsersQuery = {
  getAdminUsers: Array<{
    id: number;
    name: string | null;
    avatarUrl: string | null;
    role: AdminRole;
    isAllowed: boolean;
    lastLoggedInAt: any;
    createdAt: any;
  }>;
};

export type GetAdminAllowedEmailsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAdminAllowedEmailsQuery = {
  getAdminAllowedEmails: Array<{
    id: number;
    email: string;
    initialRole: AdminRole;
    isRegistered: boolean;
    createdAt: any;
  }>;
};

export type BatchDailyMutationVariables = Exact<{ [key: string]: never }>;

export type BatchDailyMutation = { batchDaily: boolean };

export type SendCompanyReminderMutationVariables = Exact<{
  input: SendCompanyReminderInput;
}>;

export type SendCompanyReminderMutation = {
  sendCompanyReminder: {
    id: number;
    isSuccess: boolean;
    errorMessage: string | null;
    underThresholdCount: number;
    createdAt: any;
  };
};

export type GetReminderCandidateCompaniesQueryVariables = Exact<{
  input?: GetReminderCandidateCompaniesInput | null | undefined;
}>;

export type GetReminderCandidateCompaniesQuery = {
  getReminderCandidateCompanies: Array<{
    id: number;
    name: string;
    email: string;
    overdueCount: number;
    waitingCount: number;
  }>;
};

export type GetCompanyReminderTargetsQueryVariables = Exact<{
  input: GetCompanyReminderTargetsInput;
}>;

export type GetCompanyReminderTargetsQuery = {
  getCompanyReminderTargets: {
    company: { id: number; name: string; email: string };
    users: Array<{
      entryId: number;
      userId: number;
      userName: string;
      jobTitle: string;
      delayType: ReminderDelayType;
      thresholdDays: number;
      elapsedDays: number;
      isOverdue: boolean;
      lastRemindedAt: any;
      lastRemindedIsOverdue: boolean | null;
    }>;
  };
};

export type GetCompanyRemindersQueryVariables = Exact<{
  input: GetCompanyRemindersInput;
}>;

export type GetCompanyRemindersQuery = {
  getCompanyReminders: Array<{
    id: number;
    companyId: number;
    templateName: string;
    subject: string;
    body: string;
    isSuccess: boolean;
    errorMessage: string | null;
    underThresholdCount: number;
    createdAt: any;
    users: Array<{
      id: number;
      entryId: number;
      userId: number;
      userName: string;
      jobTitle: string;
      delayType: ReminderDelayType;
      elapsedDays: number;
      isOverdue: boolean;
    }>;
  }>;
};

export type UpdateCompanyAgentPlanAmountMutationVariables = Exact<{
  input: UpdateCompanyAgentPlanAmountInput;
}>;

export type UpdateCompanyAgentPlanAmountMutation = {
  updateCompanyAgentPlanAmount: { id: number; agentPlanAmount: number | null };
};

export type CreateCompanyAcceptTicketMutationVariables = Exact<{
  input: CreateCompanyAcceptTicketInput;
}>;

export type CreateCompanyAcceptTicketMutation = {
  createCompanyAcceptTicket: {
    id: number;
    companyId: number;
    count: number;
    expiredAt: any;
    amount: number;
    createdAt: any;
  };
};

export type UpdateCompanyAcceptTicketMutationVariables = Exact<{
  input: UpdateCompanyAcceptTicketInput;
}>;

export type UpdateCompanyAcceptTicketMutation = {
  updateCompanyAcceptTicket: {
    id: number;
    count: number;
    expiredAt: any;
    amount: number;
  };
};

export type DeleteCompanyAcceptTicketMutationVariables = Exact<{
  input: DeleteCompanyAcceptTicketInput;
}>;

export type DeleteCompanyAcceptTicketMutation = {
  deleteCompanyAcceptTicket: { id: number };
};

export type CreateCompanyInvoicesForAdminMutationVariables = Exact<{
  entryIds: Array<number> | number;
}>;

export type CreateCompanyInvoicesForAdminMutation = {
  createCompanyInvoicesForAdmin: Array<{ id: number }>;
};

export type DeleteCompanyInvoiceMutationVariables = Exact<{
  entryId: number;
}>;

export type DeleteCompanyInvoiceMutation = { deleteCompanyInvoice: boolean };

export type GetCompaniesQueryVariables = Exact<{
  input: GetCompaniesInput;
}>;

export type GetCompaniesQuery = {
  getCompanies: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
      id: number;
      name: string;
      industry: string | null;
      iconImageUrl: string | null;
      prefecture: string | null;
      createdAt: any;
      deletedAt: any;
      jobCount: number | null;
      entryCount: number | null;
      interviewCount: number | null;
      offerCount: number | null;
      acceptCount: number | null;
      agentPlanAmount: number | null;
    }>;
  };
};

export type GetAllCompaniesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCompaniesQuery = {
  companies: Array<{ id: number; name: string }>;
};

export type GetCompanyAcceptTicketsQueryVariables = Exact<{
  input: GetCompanyAcceptTicketsInput;
}>;

export type GetCompanyAcceptTicketsQuery = {
  getCompanyAcceptTickets: {
    totalCount: number;
    totalPages: number;
    items: Array<{
      id: number;
      companyId: number;
      companyName: string;
      count: number;
      usedCount: number;
      expiredAt: any;
      amount: number;
      service: string;
      createdAt: any;
    }>;
  };
};

export type GetCompaniesStatisticsQueryVariables = Exact<{
  input: GetCompaniesStatisticsInput;
}>;

export type GetCompaniesStatisticsQuery = {
  getCompaniesStatistics: {
    totalCount: number;
    postedCount: number;
    acceptedCount: number;
    leavedCount: number;
  };
};

export type UpdateEntryMutationVariables = Exact<{
  input: UpdateEntryInput;
}>;

export type UpdateEntryMutation = {
  updateEntry: { id: number; status: string; updatedAt: any };
};

export type SearchEntriesQueryVariables = Exact<{
  input: SearchEntriesInput;
}>;

export type SearchEntriesQuery = {
  searchEntries: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
      id: number;
      jobId: number;
      userId: number;
      createdAt: any;
      updatedAt: any;
      status: string;
      joinDate: any;
      interviewScheduledAt: any;
      secondInterviewScheduledAt: any;
      jobOfferScheduledAt: any;
      isScouted: boolean;
      job: {
        id: number;
        title: string;
        jobType: string;
        industry: string;
        company: { id: number; name: string; deletedAt: any };
      };
      user: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        deletedAt: any;
      };
    }>;
  };
};

export type GetEntriesStatisticsQueryVariables = Exact<{
  input: GetEntriesStatisticsInput;
}>;

export type GetEntriesStatisticsQuery = {
  getEntriesStatistics: {
    totalCount: number;
    pendingCount: number;
    reviewingCount: number;
    interviewCount: number;
    secondInterviewScheduledCount: number;
    offeredCount: number;
    acceptedCount: number;
    rejectedCount: number;
  };
};

export type UpdateHotJobScoringWeightsMutationVariables = Exact<{
  input: UpdateHotJobScoringWeightsInput;
}>;

export type UpdateHotJobScoringWeightsMutation = {
  updateHotJobScoringWeights: Array<{
    id: number;
    indicator: string;
    weight: number;
    displayOrder: number;
    updatedAt: any;
  }>;
};

export type RecalculateHotJobsForAdminMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RecalculateHotJobsForAdminMutation = {
  recalculateHotJobsForAdmin: { updatedCount: number };
};

export type GetHotJobScoringWeightsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetHotJobScoringWeightsQuery = {
  getHotJobScoringWeights: Array<{
    id: number;
    indicator: string;
    weight: number;
    displayOrder: number;
    updatedAt: any;
  }>;
};

export type GetJobsByHotListQueryVariables = Exact<{ [key: string]: never }>;

export type GetJobsByHotListQuery = {
  getJobsByHotList: Array<{ id: number; title: string }>;
};

export type UpdateCompanyInvoiceMutationVariables = Exact<{
  input: UpdateCompanyInvoiceInput;
}>;

export type UpdateCompanyInvoiceMutation = {
  updateCompanyInvoice: { id: number; amount: number };
};

export type GuaranteeCompanyInvoiceMutationVariables = Exact<{
  invoiceId: number;
}>;

export type GuaranteeCompanyInvoiceMutation = {
  guaranteeCompanyInvoice: { id: number; amount: number };
};

export type GetCompanyInvoicesQueryVariables = Exact<{
  input: GetCompanyInvoicesInput;
}>;

export type GetCompanyInvoicesQuery = {
  getCompanyInvoices: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
      id: number;
      companyName: string;
      entryId: number;
      userId: number;
      isDeposit: boolean;
      applicantName: string;
      acceptDate: any;
      paymentLimitDate: any;
      service: string;
      amount: number;
    }>;
  };
};

export type GetCompanyInvoicesStatisticsQueryVariables = Exact<{
  input: GetCompanyInvoicesStatisticsInput;
}>;

export type GetCompanyInvoicesStatisticsQuery = {
  getCompanyInvoicesStatistics: {
    totalAmount: number;
    acceptedCount: number;
    generalCount: number;
    technicalCount: number;
  };
};

export type UpdateJobIsAgentPlanOnlyMutationVariables = Exact<{
  input: UpdateJobIsAgentPlanOnlyInput;
}>;

export type UpdateJobIsAgentPlanOnlyMutation = {
  updateJobIsAgentPlanOnly: { id: number; isAgentPlanOnly: boolean };
};

export type UpdateJobStatusForAdminMutationVariables = Exact<{
  input: UpdateJobStatusInput;
}>;

export type UpdateJobStatusForAdminMutation = {
  updateJobStatusForAdmin: {
    id: number;
    title: string;
    status: string;
    updatedAt: any;
  };
};

export type SearchJobsWithStatsQueryVariables = Exact<{
  input: SearchJobsWithStatsInput;
}>;

export type SearchJobsWithStatsQuery = {
  searchJobsWithStats: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
      id: number;
      title: string;
      status: string;
      isAgentPlanOnly: boolean;
      openedAt: any;
      pv: number;
      jobHeader: string;
      prefecture: string;
      jobType: string;
      industry: string;
      deletedAt: any;
      companyName: string;
      companyDeletedAt: any;
      favoriteCount: number;
      entryCount: number;
      acceptCount: number;
    }>;
  };
};

export type GetJobsStatisticsQueryVariables = Exact<{
  input: GetJobsStatisticsInput;
}>;

export type GetJobsStatisticsQuery = {
  getJobsStatistics: {
    totalCount: number;
    newPostedCount: number;
    activeCount: number;
    closedCount: number;
  };
};

export type GetJobsByOldHotListQueryVariables = Exact<{ [key: string]: never }>;

export type GetJobsByOldHotListQuery = {
  getJobsByOldHotList: Array<{ id: number }>;
};

export type GetJobsByOldPickListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetJobsByOldPickListQuery = {
  getJobsByOldPickList: Array<{ id: number }>;
};

export type UpdateLineNotificationSettingsMutationVariables = Exact<{
  input: UpdateLineNotificationSettingsInput;
}>;

export type UpdateLineNotificationSettingsMutation = {
  updateLineNotificationSettings: {
    __typename: "UpdateLineNotificationSettingsResult";
  };
};

export type GetLineNotificationSettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetLineNotificationSettingsQuery = {
  getLineNotificationSettings: Array<{
    key: string;
    message: string;
    isEnabled: boolean;
    schedule: {
      scheduleType: string;
      dayOfWeek: Array<number>;
      dayOfMonth: Array<number | null> | null;
      hour: number;
      minute: number;
    } | null;
  }>;
};

export type UpdateMagazineMutationVariables = Exact<{
  input: UpdateMagazinesInput;
}>;

export type UpdateMagazineMutation = {
  updateMagazines: Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    thumbnailUrl: string;
    articleUrl: string;
  }>;
};

export type GetMagazineQueryVariables = Exact<{ [key: string]: never }>;

export type GetMagazineQuery = {
  magazines: Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    thumbnailUrl: string;
    articleUrl: string;
  }>;
};

export type GetAdminMessagesQueryVariables = Exact<{
  input: GetAdminMessagesInput;
}>;

export type GetAdminMessagesQuery = {
  getAdminMessages: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
      id: number;
      content: string;
      type: string;
      isRead: boolean;
      createdAt: any;
      updatedAt: any;
      entryId: number;
      user: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        university: string | null;
        faculty: string | null;
      } | null;
      company: { id: number; name: string; iconImageUrl: string | null } | null;
      entryUser: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        avatarUrl: string | null;
        university: string | null;
        faculty: string | null;
      };
      job: {
        id: number;
        title: string;
        jobHeader: string;
        industry: string;
        jobType: string;
        company: { id: number; name: string; iconImageUrl: string | null };
      };
    }>;
  };
};

export type UpdateOldHotJobsMutationVariables = Exact<{
  input: UpdateOldHotJobsInput;
}>;

export type UpdateOldHotJobsMutation = {
  updateOldHotJobs: { __typename: "OldHotJobType" };
};

export type UpdateOldPickJobsMutationVariables = Exact<{
  input: UpdateOldPickJobsInput;
}>;

export type UpdateOldPickJobsMutation = {
  updateOldPickJobs: { __typename: "OldPickJobType" };
};

export type UpdatePickJobScoringWeightsMutationVariables = Exact<{
  input: UpdatePickJobScoringWeightsInput;
}>;

export type UpdatePickJobScoringWeightsMutation = {
  updatePickJobScoringWeights: Array<{
    id: number;
    indicator: string;
    weight: number;
    displayOrder: number;
    updatedAt: any;
  }>;
};

export type RecalculatePickJobsForAdminMutationVariables = Exact<{
  [key: string]: never;
}>;

export type RecalculatePickJobsForAdminMutation = {
  recalculatePickJobsForAdmin: { updatedCount: number };
};

export type GetPickJobScoringWeightsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetPickJobScoringWeightsQuery = {
  getPickJobScoringWeights: Array<{
    id: number;
    indicator: string;
    weight: number;
    displayOrder: number;
    updatedAt: any;
  }>;
};

export type GetJobsByPickListQueryVariables = Exact<{ [key: string]: never }>;

export type GetJobsByPickListQuery = {
  getJobsByPickList: Array<{ id: number; title: string }>;
};

export type CreateAdditionalScoutTicketMutationVariables = Exact<{
  input: CreateAdditionalScoutTicketInput;
}>;

export type CreateAdditionalScoutTicketMutation = {
  createAdditionalScoutTicket: {
    id: number;
    companyId: number;
    companyName: string;
    totalCount: number;
    usedCount: number;
    remainingCount: number;
    expiredAt: any;
    createdAt: any;
  };
};

export type GetAdditionalScoutTicketsQueryVariables = Exact<{
  input: SearchAdditionalScoutTicketsInput;
}>;

export type GetAdditionalScoutTicketsQuery = {
  getAdditionalScoutTickets: {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
    items: Array<{
      id: number;
      companyId: number;
      companyName: string;
      totalCount: number;
      usedCount: number;
      remainingCount: number;
      expiredAt: any;
      createdAt: any;
    }>;
  };
};

export type SearchUsersQueryVariables = Exact<{
  input: SearchUsersInput;
}>;

export type SearchUsersQuery = {
  searchUsers: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: Array<{
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
      entryCount: number;
      createdAt: any;
      deletedAt: any;
    }>;
  };
};

export type GetUsersStatisticsQueryVariables = Exact<{
  input: GetUsersStatisticsInput;
}>;

export type GetUsersStatisticsQuery = {
  getUsersStatistics: {
    totalCount: number;
    applicantCount: number;
    acceptedCount: number;
    leavedCount: number;
  };
};

export type GetUserQueryVariables = Exact<{
  id: number;
}>;

export type GetUserQuery = {
  user: {
    id: number;
    lastName: string | null;
    firstName: string | null;
    avatarUrl: string | null;
    university: string | null;
    faculty: string | null;
    department: string | null;
    gender: string | null;
    birthDate: any;
    prefecture: string | null;
    email: string;
    phoneNumber: string | null;
    grade: string | null;
    graduationYear: number | null;
    availableDaysPerWeek: number | null;
    availableHoursPerWeek: number | null;
    availableDurationMonths: number | null;
    interestedIndustries: Array<string>;
    interestedJobTypes: Array<string>;
    selfPR: string | null;
    futureGoals: string | null;
  } | null;
};

export const AdminLoginWithGoogleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminLoginWithGoogle" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AdminLoginWithGoogleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminLoginWithGoogle" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminLoginWithGoogleMutation,
  AdminLoginWithGoogleMutationVariables
>;
export const AdminLogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminLogout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminLogout" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminLogoutMutation, AdminLogoutMutationVariables>;
export const UpdateAdminUserRoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAdminUserRole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateAdminUserRoleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAdminUserRole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAdminUserRoleMutation,
  UpdateAdminUserRoleMutationVariables
>;
export const DeleteAdminUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAdminUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeleteAdminUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAdminUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAdminUserMutation,
  DeleteAdminUserMutationVariables
>;
export const CreateAdminAllowedEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAdminAllowedEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAdminAllowedEmailInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAdminAllowedEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAdminAllowedEmailMutation,
  CreateAdminAllowedEmailMutationVariables
>;
export const DeleteAdminAllowedEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAdminAllowedEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeleteAdminAllowedEmailInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAdminAllowedEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAdminAllowedEmailMutation,
  DeleteAdminAllowedEmailMutationVariables
>;
export const AdminMeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminMe" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminMe" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminMeQuery, AdminMeQueryVariables>;
export const GetAdminUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAdminUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAdminUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "isAllowed" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastLoggedInAt" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAdminUsersQuery, GetAdminUsersQueryVariables>;
export const GetAdminAllowedEmailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAdminAllowedEmails" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAdminAllowedEmails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "initialRole" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isRegistered" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAdminAllowedEmailsQuery,
  GetAdminAllowedEmailsQueryVariables
>;
export const BatchDailyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "BatchDaily" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "batchDaily" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BatchDailyMutation, BatchDailyMutationVariables>;
export const SendCompanyReminderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendCompanyReminder" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SendCompanyReminderInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendCompanyReminder" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "isSuccess" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errorMessage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "underThresholdCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendCompanyReminderMutation,
  SendCompanyReminderMutationVariables
>;
export const GetReminderCandidateCompaniesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetReminderCandidateCompanies" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GetReminderCandidateCompaniesInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getReminderCandidateCompanies" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "overdueCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "waitingCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetReminderCandidateCompaniesQuery,
  GetReminderCandidateCompaniesQueryVariables
>;
export const GetCompanyReminderTargetsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompanyReminderTargets" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompanyReminderTargetsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanyReminderTargets" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "company" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "users" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobTitle" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "delayType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "thresholdDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "elapsedDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isOverdue" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastRemindedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastRemindedIsOverdue" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompanyReminderTargetsQuery,
  GetCompanyReminderTargetsQueryVariables
>;
export const GetCompanyRemindersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompanyReminders" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompanyRemindersInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanyReminders" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "companyId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "templateName" },
                },
                { kind: "Field", name: { kind: "Name", value: "subject" } },
                { kind: "Field", name: { kind: "Name", value: "body" } },
                { kind: "Field", name: { kind: "Name", value: "isSuccess" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errorMessage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "underThresholdCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "users" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobTitle" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "delayType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "elapsedDays" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isOverdue" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompanyRemindersQuery,
  GetCompanyRemindersQueryVariables
>;
export const UpdateCompanyAgentPlanAmountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCompanyAgentPlanAmount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "UpdateCompanyAgentPlanAmountInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCompanyAgentPlanAmount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "agentPlanAmount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCompanyAgentPlanAmountMutation,
  UpdateCompanyAgentPlanAmountMutationVariables
>;
export const CreateCompanyAcceptTicketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCompanyAcceptTicket" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateCompanyAcceptTicketInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCompanyAcceptTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "companyId" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
                { kind: "Field", name: { kind: "Name", value: "expiredAt" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCompanyAcceptTicketMutation,
  CreateCompanyAcceptTicketMutationVariables
>;
export const UpdateCompanyAcceptTicketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCompanyAcceptTicket" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCompanyAcceptTicketInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCompanyAcceptTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
                { kind: "Field", name: { kind: "Name", value: "expiredAt" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCompanyAcceptTicketMutation,
  UpdateCompanyAcceptTicketMutationVariables
>;
export const DeleteCompanyAcceptTicketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCompanyAcceptTicket" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeleteCompanyAcceptTicketInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCompanyAcceptTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCompanyAcceptTicketMutation,
  DeleteCompanyAcceptTicketMutationVariables
>;
export const CreateCompanyInvoicesForAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCompanyInvoicesForAdmin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "entryIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCompanyInvoicesForAdmin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "entryIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "entryIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCompanyInvoicesForAdminMutation,
  CreateCompanyInvoicesForAdminMutationVariables
>;
export const DeleteCompanyInvoiceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCompanyInvoice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "entryId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCompanyInvoice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "entryId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "entryId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCompanyInvoiceMutation,
  DeleteCompanyInvoiceMutationVariables
>;
export const GetCompaniesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getCompanies" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompaniesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanies" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "industry" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "iconImageUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prefecture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "interviewCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "offerCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "acceptCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "agentPlanAmount" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetAllCompaniesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAllCompanies" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "companies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCompaniesQuery,
  GetAllCompaniesQueryVariables
>;
export const GetCompanyAcceptTicketsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompanyAcceptTickets" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompanyAcceptTicketsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanyAcceptTickets" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyName" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "usedCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expiredAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "service" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompanyAcceptTicketsQuery,
  GetCompanyAcceptTicketsQueryVariables
>;
export const GetCompaniesStatisticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompaniesStatistics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompaniesStatisticsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompaniesStatistics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "postedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "acceptedCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "leavedCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompaniesStatisticsQuery,
  GetCompaniesStatisticsQueryVariables
>;
export const UpdateEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateEntryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateEntryMutation, UpdateEntryMutationVariables>;
export const SearchEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchEntries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SearchEntriesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchEntries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "jobId" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "joinDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "interviewScheduledAt" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "secondInterviewScheduledAt",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobOfferScheduledAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isScouted" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "job" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "jobType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "industry" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "deletedAt" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatarUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "deletedAt" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchEntriesQuery, SearchEntriesQueryVariables>;
export const GetEntriesStatisticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetEntriesStatistics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetEntriesStatisticsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getEntriesStatistics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pendingCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reviewingCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "interviewCount" },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "secondInterviewScheduledCount",
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "offeredCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "acceptedCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rejectedCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEntriesStatisticsQuery,
  GetEntriesStatisticsQueryVariables
>;
export const UpdateHotJobScoringWeightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateHotJobScoringWeights" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateHotJobScoringWeightsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateHotJobScoringWeights" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "indicator" } },
                { kind: "Field", name: { kind: "Name", value: "weight" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOrder" },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateHotJobScoringWeightsMutation,
  UpdateHotJobScoringWeightsMutationVariables
>;
export const RecalculateHotJobsForAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RecalculateHotJobsForAdmin" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "recalculateHotJobsForAdmin" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RecalculateHotJobsForAdminMutation,
  RecalculateHotJobsForAdminMutationVariables
>;
export const GetHotJobScoringWeightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetHotJobScoringWeights" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getHotJobScoringWeights" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "indicator" } },
                { kind: "Field", name: { kind: "Name", value: "weight" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOrder" },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetHotJobScoringWeightsQuery,
  GetHotJobScoringWeightsQueryVariables
>;
export const GetJobsByHotListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetJobsByHotList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getJobsByHotList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetJobsByHotListQuery,
  GetJobsByHotListQueryVariables
>;
export const UpdateCompanyInvoiceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCompanyInvoice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCompanyInvoiceInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCompanyInvoice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCompanyInvoiceMutation,
  UpdateCompanyInvoiceMutationVariables
>;
export const GuaranteeCompanyInvoiceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "GuaranteeCompanyInvoice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "invoiceId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "guaranteeCompanyInvoice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "invoiceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "invoiceId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GuaranteeCompanyInvoiceMutation,
  GuaranteeCompanyInvoiceMutationVariables
>;
export const GetCompanyInvoicesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompanyInvoices" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetCompanyInvoicesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanyInvoices" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDeposit" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "applicantName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "acceptDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "paymentLimitDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "service" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompanyInvoicesQuery,
  GetCompanyInvoicesQueryVariables
>;
export const GetCompanyInvoicesStatisticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCompanyInvoicesStatistics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "GetCompanyInvoicesStatisticsInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCompanyInvoicesStatistics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalAmount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "acceptedCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "generalCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "technicalCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCompanyInvoicesStatisticsQuery,
  GetCompanyInvoicesStatisticsQueryVariables
>;
export const UpdateJobIsAgentPlanOnlyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateJobIsAgentPlanOnly" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateJobIsAgentPlanOnlyInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateJobIsAgentPlanOnly" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isAgentPlanOnly" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateJobIsAgentPlanOnlyMutation,
  UpdateJobIsAgentPlanOnlyMutationVariables
>;
export const UpdateJobStatusForAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateJobStatusForAdmin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateJobStatusInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateJobStatusForAdmin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateJobStatusForAdminMutation,
  UpdateJobStatusForAdminMutationVariables
>;
export const SearchJobsWithStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "searchJobsWithStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SearchJobsWithStatsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchJobsWithStats" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isAgentPlanOnly" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "openedAt" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "pv" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobHeader" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prefecture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "industry" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyDeletedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "favoriteCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "acceptCount" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SearchJobsWithStatsQuery,
  SearchJobsWithStatsQueryVariables
>;
export const GetJobsStatisticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetJobsStatistics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetJobsStatisticsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getJobsStatistics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "newPostedCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "activeCount" } },
                { kind: "Field", name: { kind: "Name", value: "closedCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetJobsStatisticsQuery,
  GetJobsStatisticsQueryVariables
>;
export const GetJobsByOldHotListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetJobsByOldHotList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getJobsByOldHotList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetJobsByOldHotListQuery,
  GetJobsByOldHotListQueryVariables
>;
export const GetJobsByOldPickListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetJobsByOldPickList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getJobsByOldPickList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetJobsByOldPickListQuery,
  GetJobsByOldPickListQueryVariables
>;
export const UpdateLineNotificationSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateLineNotificationSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "UpdateLineNotificationSettingsInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateLineNotificationSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateLineNotificationSettingsMutation,
  UpdateLineNotificationSettingsMutationVariables
>;
export const GetLineNotificationSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetLineNotificationSettings" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getLineNotificationSettings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "key" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
                { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "schedule" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "scheduleType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dayOfWeek" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dayOfMonth" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "hour" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "minute" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetLineNotificationSettingsQuery,
  GetLineNotificationSettingsQueryVariables
>;
export const UpdateMagazineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateMagazine" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateMagazinesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMagazines" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnailUrl" },
                },
                { kind: "Field", name: { kind: "Name", value: "articleUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateMagazineMutation,
  UpdateMagazineMutationVariables
>;
export const GetMagazineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMagazine" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "magazines" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thumbnailUrl" },
                },
                { kind: "Field", name: { kind: "Name", value: "articleUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMagazineQuery, GetMagazineQueryVariables>;
export const GetAdminMessagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAdminMessages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetAdminMessagesInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAdminMessages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isRead" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatarUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "university" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "faculty" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "company" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "iconImageUrl" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryUser" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatarUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "university" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "faculty" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "job" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "jobHeader" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "industry" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "jobType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "company" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "iconImageUrl",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAdminMessagesQuery,
  GetAdminMessagesQueryVariables
>;
export const UpdateOldHotJobsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateOldHotJobs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateOldHotJobsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateOldHotJobs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateOldHotJobsMutation,
  UpdateOldHotJobsMutationVariables
>;
export const UpdateOldPickJobsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateOldPickJobs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateOldPickJobsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateOldPickJobs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateOldPickJobsMutation,
  UpdateOldPickJobsMutationVariables
>;
export const UpdatePickJobScoringWeightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePickJobScoringWeights" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdatePickJobScoringWeightsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePickJobScoringWeights" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "indicator" } },
                { kind: "Field", name: { kind: "Name", value: "weight" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOrder" },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePickJobScoringWeightsMutation,
  UpdatePickJobScoringWeightsMutationVariables
>;
export const RecalculatePickJobsForAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RecalculatePickJobsForAdmin" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "recalculatePickJobsForAdmin" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RecalculatePickJobsForAdminMutation,
  RecalculatePickJobsForAdminMutationVariables
>;
export const GetPickJobScoringWeightsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPickJobScoringWeights" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPickJobScoringWeights" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "indicator" } },
                { kind: "Field", name: { kind: "Name", value: "weight" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOrder" },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPickJobScoringWeightsQuery,
  GetPickJobScoringWeightsQueryVariables
>;
export const GetJobsByPickListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetJobsByPickList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getJobsByPickList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetJobsByPickListQuery,
  GetJobsByPickListQueryVariables
>;
export const CreateAdditionalScoutTicketDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAdditionalScoutTicket" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAdditionalScoutTicketInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAdditionalScoutTicket" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "companyId" } },
                { kind: "Field", name: { kind: "Name", value: "companyName" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "usedCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "remainingCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "expiredAt" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAdditionalScoutTicketMutation,
  CreateAdditionalScoutTicketMutationVariables
>;
export const GetAdditionalScoutTicketsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAdditionalScoutTickets" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "SearchAdditionalScoutTicketsInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAdditionalScoutTickets" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "companyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "totalCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "usedCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remainingCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expiredAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAdditionalScoutTicketsQuery,
  GetAdditionalScoutTicketsQueryVariables
>;
export const SearchUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SearchUsersInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchUsers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatarUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "prefecture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "university" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "faculty" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "department" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "grade" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availableDaysPerWeek" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availableHoursPerWeek" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "availableDurationMonths",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entryCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deletedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hasPreviousPage" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetUsersStatisticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsersStatistics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GetUsersStatisticsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsersStatistics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "applicantCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "acceptedCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "leavedCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUsersStatisticsQuery,
  GetUsersStatisticsQueryVariables
>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "avatarUrl" } },
                { kind: "Field", name: { kind: "Name", value: "university" } },
                { kind: "Field", name: { kind: "Name", value: "faculty" } },
                { kind: "Field", name: { kind: "Name", value: "department" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                { kind: "Field", name: { kind: "Name", value: "prefecture" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "graduationYear" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availableDaysPerWeek" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availableHoursPerWeek" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availableDurationMonths" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "interestedIndustries" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "interestedJobTypes" },
                },
                { kind: "Field", name: { kind: "Name", value: "selfPR" } },
                { kind: "Field", name: { kind: "Name", value: "futureGoals" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
