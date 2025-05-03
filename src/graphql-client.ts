import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddFavoriteInput = {
  jobId: Scalars['Int']['input'];
};

export type ApplicantInfo = {
  __typename?: 'ApplicantInfo';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  faculty?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  university?: Maybe<Scalars['String']['output']>;
};

export type CompaniesStatisticsResultType = {
  __typename?: 'CompaniesStatisticsResultType';
  acceptedCount: Scalars['Int']['output'];
  leavedCount: Scalars['Int']['output'];
  postedCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type CompanyIdInfoType = {
  __typename?: 'CompanyIdInfoType';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  notificationEmails?: Maybe<Array<Scalars['String']['output']>>;
};

export type CompanyInfo = {
  __typename?: 'CompanyInfo';
  iconImageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CompanyJobsWithSimpleEntriesType = {
  __typename?: 'CompanyJobsWithSimpleEntriesType';
  companyId: Scalars['Int']['output'];
  jobs: Array<SimpleJobWithEntriesType>;
};

export type CompanyLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CompanyLoginResponse = {
  __typename?: 'CompanyLoginResponse';
  accessToken: Scalars['String']['output'];
  company: CompanyType;
};

export type CompanyLogoutResponse = {
  __typename?: 'CompanyLogoutResponse';
  message: Scalars['String']['output'];
};

export type CompanyMemberInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconImageBase64?: InputMaybe<Scalars['String']['input']>;
  iconImageMimeType?: InputMaybe<Scalars['String']['input']>;
  iconImageUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyMemberType = {
  __typename?: 'CompanyMemberType';
  description?: Maybe<Scalars['String']['output']>;
  iconImageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CompanySearchResultType = {
  __typename?: 'CompanySearchResultType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<CompanyType>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type CompanyType = {
  __typename?: 'CompanyType';
  about?: Maybe<Scalars['String']['output']>;
  acceptCount?: Maybe<Scalars['Int']['output']>;
  businessContent?: Maybe<Scalars['String']['output']>;
  capital?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  detailAddress?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  employeeCount?: Maybe<Scalars['Int']['output']>;
  headerImageUrl?: Maybe<Scalars['String']['output']>;
  iconImageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  jobCount?: Maybe<Scalars['Int']['output']>;
  jobType?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<CompanyMemberType>>;
  name: Scalars['String']['output'];
  notificationEmails?: Maybe<Array<Scalars['String']['output']>>;
  phoneNumber: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  prefecture?: Maybe<Scalars['String']['output']>;
  representative?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CompanyUnreadCount = {
  __typename?: 'CompanyUnreadCount';
  totalCompanyUnreadCount: Scalars['Int']['output'];
  totalUserUnreadCount: Scalars['Int']['output'];
};

export type CompanyUnreadMessages = {
  __typename?: 'CompanyUnreadMessages';
  applicant: ApplicantInfo;
  entryId: Scalars['Int']['output'];
  jobId: Scalars['Int']['output'];
  jobTitle: Scalars['String']['output'];
  unreadCount: Scalars['Int']['output'];
  unreadMessages: Array<UnreadMessageInfo>;
};

export type CompanyWithJobsType = {
  __typename?: 'CompanyWithJobsType';
  company: CompanyType;
  jobs: Array<JobType>;
  members: Array<CompanyMemberType>;
};

export type CreateCompanyInput = {
  companyUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
  emailConfirmation: Scalars['String']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
  jobType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type CreateEntryInput = {
  jobId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CreateJobInput = {
  access: Scalars['String']['input'];
  acquirableSkills: Array<Scalars['String']['input']>;
  applicationProcess?: InputMaybe<Scalars['String']['input']>;
  businessContent: Scalars['String']['input'];
  city: Scalars['String']['input'];
  companyAtmosphere: Scalars['String']['input'];
  companyId: Scalars['Int']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  experienceGained: Scalars['String']['input'];
  features: Array<Scalars['String']['input']>;
  goal: Scalars['String']['input'];
  headerImageBase64?: InputMaybe<Scalars['String']['input']>;
  headerImageMimeType?: InputMaybe<Scalars['String']['input']>;
  industry: Scalars['String']['input'];
  internJobDescription: Scalars['String']['input'];
  jobHeader: Scalars['String']['input'];
  jobType: Scalars['String']['input'];
  members?: InputMaybe<Array<CreateMemberInput>>;
  minWorkingDaysPerWeek: Scalars['Int']['input'];
  minWorkingHoursPerWeek: Scalars['Int']['input'];
  period: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  prefecture: Scalars['String']['input'];
  preferences: Array<Scalars['String']['input']>;
  programmingLanguages: Array<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  salary: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  streetAddress: Scalars['String']['input'];
  title: Scalars['String']['input'];
  transportationFeeAmount: Scalars['String']['input'];
  usefulSkills: Array<Scalars['String']['input']>;
  workConditions: Array<Scalars['String']['input']>;
  workingHoursEnd: Scalars['String']['input'];
  workingHoursStart: Scalars['String']['input'];
};

export type CreateMemberInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconImageBase64?: InputMaybe<Scalars['String']['input']>;
  iconImageMimeType?: InputMaybe<Scalars['String']['input']>;
  iconImageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  availableDaysPerWeek?: InputMaybe<Scalars['Int']['input']>;
  availableDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  availableHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  faculty?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  futureGoals?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['Int']['input']>;
  interestedIndustries?: InputMaybe<Array<Scalars['String']['input']>>;
  interestedJobTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  magazineNotification?: Scalars['Boolean']['input'];
  messageNotification?: Scalars['Boolean']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  selfPR?: InputMaybe<Scalars['String']['input']>;
  university?: InputMaybe<Scalars['String']['input']>;
};

export type Entry = {
  __typename?: 'Entry';
  applicantNote?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  jobId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type EntryCheck = {
  __typename?: 'EntryCheck';
  hasApplied: Scalars['Boolean']['output'];
};

export type EntryType = {
  __typename?: 'EntryType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  jobId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type EntryWithDetailsType = {
  __typename?: 'EntryWithDetailsType';
  applicantNote?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isChecked: Scalars['Boolean']['output'];
  job: JobWithCompanyType;
  jobId: Scalars['Int']['output'];
  messages: Array<Message>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserType;
  userId: Scalars['Int']['output'];
};

export type EntryWithJobType = {
  __typename?: 'EntryWithJobType';
  entry: Entry;
  job: JobType;
};

export type EntryWithLastMessage = {
  __typename?: 'EntryWithLastMessage';
  company: CompanyInfo;
  companyUnreadCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  entryId: Scalars['Int']['output'];
  job: JobInfo;
  jobId: Scalars['Int']['output'];
  lastMessage: Scalars['String']['output'];
  lastMessageAt: Scalars['DateTime']['output'];
  messageType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<UserInfo>;
  userId: Scalars['Int']['output'];
  userUnreadCount: Scalars['Int']['output'];
};

export type EntryWithUserAndJob = {
  __typename?: 'EntryWithUserAndJob';
  entry: Entry;
  job: JobType;
  user: UserType;
};

export type EntryWithUserAndJobType = {
  __typename?: 'EntryWithUserAndJobType';
  entry: Entry;
  job: JobWithCompanyType;
  user: UserType;
};

export type EntryWithUserType = {
  __typename?: 'EntryWithUserType';
  entry: EntryType;
  user: UserType;
};

export type FavoriteType = {
  __typename?: 'FavoriteType';
  createdAt: Scalars['DateTime']['output'];
  job?: Maybe<JobWithCompanyType>;
  jobId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type GetCompaniesInput = {
  acceptCountMax?: InputMaybe<Scalars['Int']['input']>;
  acceptCountMin?: InputMaybe<Scalars['Int']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  jobCountMax?: InputMaybe<Scalars['Int']['input']>;
  jobCountMin?: InputMaybe<Scalars['Int']['input']>;
  leaveDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  leaveDateStart?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  registerDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  registerDateStart?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GetCompaniesStatisticsInput = {
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GetCompanyUnreadMessagesInput = {
  companyId: Scalars['Int']['input'];
};

export type GetEntryByIdInput = {
  id: Scalars['Int']['input'];
};

export type GetJobsStatisticsInput = {
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GetNewEntriesWithoutMessagesInput = {
  companyId: Scalars['Int']['input'];
};

export type GetRecentJobsInput = {
  /** 取得する最新ジョブの件数 */
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type GetStaleEntriesInput = {
  companyId: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};

export type GetUserEntriesInput = {
  userId: Scalars['Int']['input'];
};

export type GetUserStatusInput = {
  userId: Scalars['Int']['input'];
};

export type GetUsersStatisticsInput = {
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart?: InputMaybe<Scalars['DateTime']['input']>;
};

export type JobInfo = {
  __typename?: 'JobInfo';
  id: Scalars['Int']['output'];
  jobHeader: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type JobMemberType = {
  __typename?: 'JobMemberType';
  description?: Maybe<Scalars['String']['output']>;
  iconImageUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type JobSearchResultType = {
  __typename?: 'JobSearchResultType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<JobWithCompanyType>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type JobSearchWithStatsResultType = {
  __typename?: 'JobSearchWithStatsResultType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<JobWithStatsType>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type JobType = {
  __typename?: 'JobType';
  access: Scalars['String']['output'];
  acquirableSkills: Array<Scalars['String']['output']>;
  applicationProcess?: Maybe<Scalars['String']['output']>;
  businessContent: Scalars['String']['output'];
  city: Scalars['String']['output'];
  companyAtmosphere: Scalars['String']['output'];
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  detailAddress?: Maybe<Scalars['String']['output']>;
  experienceGained: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  goal: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  industry: Scalars['String']['output'];
  internJobDescription: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  jobHeader: Scalars['String']['output'];
  jobType: Scalars['String']['output'];
  minWorkingDaysPerWeek: Scalars['Int']['output'];
  minWorkingHoursPerWeek: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  prefecture: Scalars['String']['output'];
  preferences: Array<Scalars['String']['output']>;
  programmingLanguages: Array<Scalars['String']['output']>;
  pv: Scalars['Int']['output'];
  requirements?: Maybe<Scalars['String']['output']>;
  salary: Scalars['String']['output'];
  status: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  title: Scalars['String']['output'];
  transportationFeeAmount: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usefulSkills: Array<Scalars['String']['output']>;
  workConditions: Array<Scalars['String']['output']>;
  workingHoursEnd: Scalars['String']['output'];
  workingHoursStart: Scalars['String']['output'];
};

export type JobWithCompanyType = {
  __typename?: 'JobWithCompanyType';
  access: Scalars['String']['output'];
  acquirableSkills: Array<Scalars['String']['output']>;
  applicationProcess?: Maybe<Scalars['String']['output']>;
  businessContent: Scalars['String']['output'];
  city: Scalars['String']['output'];
  company: CompanyType;
  companyAbout?: Maybe<Scalars['String']['output']>;
  companyAtmosphere: Scalars['String']['output'];
  companyBusinessContent?: Maybe<Scalars['String']['output']>;
  companyEmail: Scalars['String']['output'];
  companyHeaderImageUrl?: Maybe<Scalars['String']['output']>;
  companyIconImageUrl?: Maybe<Scalars['String']['output']>;
  companyId: Scalars['Int']['output'];
  companyName: Scalars['String']['output'];
  companyPhoneNumber: Scalars['String']['output'];
  companyUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  detailAddress?: Maybe<Scalars['String']['output']>;
  experienceGained: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  goal: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  industry: Scalars['String']['output'];
  internJobDescription: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  jobHeader: Scalars['String']['output'];
  jobType: Scalars['String']['output'];
  members: Array<JobMemberType>;
  minWorkingDaysPerWeek: Scalars['Int']['output'];
  minWorkingHoursPerWeek: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  prefecture: Scalars['String']['output'];
  preferences: Array<Scalars['String']['output']>;
  programmingLanguages: Array<Scalars['String']['output']>;
  pv: Scalars['Int']['output'];
  requirements?: Maybe<Scalars['String']['output']>;
  salary: Scalars['String']['output'];
  status: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  title: Scalars['String']['output'];
  transportationFeeAmount: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usefulSkills: Array<Scalars['String']['output']>;
  workConditions: Array<Scalars['String']['output']>;
  workingHoursEnd: Scalars['String']['output'];
  workingHoursStart: Scalars['String']['output'];
};

export type JobWithEntriesType = {
  __typename?: 'JobWithEntriesType';
  entries: Array<EntryWithUserType>;
  job: JobType;
};

export type JobWithStatsType = {
  __typename?: 'JobWithStatsType';
  acceptCount: Scalars['Int']['output'];
  access: Scalars['String']['output'];
  acquirableSkills: Array<Scalars['String']['output']>;
  applicationProcess?: Maybe<Scalars['String']['output']>;
  businessContent: Scalars['String']['output'];
  city: Scalars['String']['output'];
  company: CompanyType;
  companyAbout?: Maybe<Scalars['String']['output']>;
  companyAtmosphere: Scalars['String']['output'];
  companyBusinessContent?: Maybe<Scalars['String']['output']>;
  companyEmail: Scalars['String']['output'];
  companyHeaderImageUrl?: Maybe<Scalars['String']['output']>;
  companyIconImageUrl?: Maybe<Scalars['String']['output']>;
  companyId: Scalars['Int']['output'];
  companyName: Scalars['String']['output'];
  companyPhoneNumber: Scalars['String']['output'];
  companyUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  detailAddress?: Maybe<Scalars['String']['output']>;
  entryCount: Scalars['Int']['output'];
  experienceGained: Scalars['String']['output'];
  favoriteCount: Scalars['Int']['output'];
  features: Array<Scalars['String']['output']>;
  goal: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  industry: Scalars['String']['output'];
  internJobDescription: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  jobHeader: Scalars['String']['output'];
  jobType: Scalars['String']['output'];
  members: Array<JobMemberType>;
  minWorkingDaysPerWeek: Scalars['Int']['output'];
  minWorkingHoursPerWeek: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  prefecture: Scalars['String']['output'];
  preferences: Array<Scalars['String']['output']>;
  programmingLanguages: Array<Scalars['String']['output']>;
  pv: Scalars['Int']['output'];
  requirements?: Maybe<Scalars['String']['output']>;
  salary: Scalars['String']['output'];
  status: Scalars['String']['output'];
  streetAddress: Scalars['String']['output'];
  title: Scalars['String']['output'];
  transportationFeeAmount: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usefulSkills: Array<Scalars['String']['output']>;
  workConditions: Array<Scalars['String']['output']>;
  workingHoursEnd: Scalars['String']['output'];
  workingHoursStart: Scalars['String']['output'];
};

export type JobsStatisticsResultType = {
  __typename?: 'JobsStatisticsResultType';
  activeCount: Scalars['Int']['output'];
  closedCount: Scalars['Int']['output'];
  newPostedCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  user: UserType;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
};

export type MagazineItemInput = {
  articleUrl: Scalars['String']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  thumbnailBase64?: InputMaybe<Scalars['String']['input']>;
  thumbnailMimeType?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MagazineType = {
  __typename?: 'MagazineType';
  articleUrl: Scalars['String']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MarkEntryAsCheckedInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type MarkMessageAsReadInput = {
  messageId: Scalars['Int']['input'];
};

export type MarkNotificationAsReadInput = {
  notificationId: Scalars['Int']['input'];
};

export type Message = {
  __typename?: 'Message';
  companyId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MessageNotification = {
  __typename?: 'MessageNotification';
  entryId: Scalars['Int']['output'];
  message: MessageSubscriptionType;
};

export type MessageSubscriptionType = {
  __typename?: 'MessageSubscriptionType';
  companyId?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  entryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: FavoriteType;
  companyLogin: CompanyLoginResponse;
  companyLogout: CompanyLogoutResponse;
  createCompany: CompanyType;
  createEntry: Entry;
  createJob: JobType;
  createUser: UserType;
  deleteCompany: Scalars['Boolean']['output'];
  deleteJob: JobType;
  deleteUserAccount: Scalars['Boolean']['output'];
  login: LoginResponse;
  logout: LogoutResponse;
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markEntryAsChecked: Array<Entry>;
  markMessageAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead: Scalars['Boolean']['output'];
  removeFavorite: Scalars['Boolean']['output'];
  requestCompanyPasswordReset: RequestCompanyPasswordResetResponse;
  requestPasswordReset: RequestPasswordResetResponse;
  resetCompanyPassword: ResetCompanyPasswordResponse;
  resetPassword: ResetPasswordResponse;
  sendCompanyMessage: Message;
  sendMessage: Message;
  updateCompany: CompanyType;
  updateEntriesStatus: Array<Entry>;
  updateEntryApplicantNote: Entry;
  updateEntryStatus: Entry;
  updateJob: JobType;
  updateJobPv: JobType;
  updateJobStatus: JobType;
  updateJobsStatus: Scalars['Int']['output'];
  updateMagazines: Array<MagazineType>;
  updateUser: UserType;
  updateUserEmail: UserType;
  updateUserPassword: UserType;
  uploadAvatar: Scalars['String']['output'];
  verifyCompanyPasswordResetToken: VerifyCompanyPasswordResetTokenResponse;
  verifyPasswordResetToken: VerifyPasswordResetTokenResponse;
};


export type MutationAddFavoriteArgs = {
  input: AddFavoriteInput;
};


export type MutationCompanyLoginArgs = {
  companyLoginInput: CompanyLoginInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMarkEntryAsCheckedArgs = {
  input: MarkEntryAsCheckedInput;
};


export type MutationMarkMessageAsReadArgs = {
  input: MarkMessageAsReadInput;
};


export type MutationMarkNotificationAsReadArgs = {
  input: MarkNotificationAsReadInput;
};


export type MutationRemoveFavoriteArgs = {
  input: RemoveFavoriteInput;
};


export type MutationRequestCompanyPasswordResetArgs = {
  input: RequestCompanyPasswordResetInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetCompanyPasswordArgs = {
  input: ResetCompanyPasswordInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendCompanyMessageArgs = {
  input: SendMessageInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateEntriesStatusArgs = {
  input: UpdateEntriesStatusInput;
};


export type MutationUpdateEntryApplicantNoteArgs = {
  input: UpdateEntryApplicantNoteInput;
};


export type MutationUpdateEntryStatusArgs = {
  input: UpdateEntryStatusInput;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
};


export type MutationUpdateJobPvArgs = {
  input: UpdateJobPvInput;
};


export type MutationUpdateJobStatusArgs = {
  input: UpdateJobStatusInput;
};


export type MutationUpdateJobsStatusArgs = {
  input: UpdateJobsStatusInput;
};


export type MutationUpdateMagazinesArgs = {
  input: UpdateMagazinesInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateUserEmailArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUserEmailInput;
};


export type MutationUpdateUserPasswordArgs = {
  id: Scalars['Int']['input'];
  input: UpdateUserPasswordInput;
};


export type MutationUploadAvatarArgs = {
  input: UploadAvatarInput;
};


export type MutationVerifyCompanyPasswordResetTokenArgs = {
  input: VerifyCompanyPasswordResetTokenInput;
};


export type MutationVerifyPasswordResetTokenArgs = {
  input: VerifyPasswordResetTokenInput;
};

export type NewEntriesWithoutMessagesType = {
  __typename?: 'NewEntriesWithoutMessagesType';
  entries: Array<EntryWithUserAndJobType>;
};

export type Notification = {
  __typename?: 'Notification';
  companyIconImageUrl?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  entryId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isRead: Scalars['Boolean']['output'];
  messageId?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  unreadCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  checkUserJobEntry: EntryCheck;
  companies: Array<CompanyType>;
  company?: Maybe<CompanyWithJobsType>;
  companyMe: CompanyType;
  getAllCompanyIds: Array<CompanyIdInfoType>;
  getCompanies: CompanySearchResultType;
  getCompaniesStatistics: CompaniesStatisticsResultType;
  getCompanyEntries: Array<EntryWithLastMessage>;
  getCompanyJobsWithEntries: CompanyJobsWithSimpleEntriesType;
  getCompanyUnreadCount: CompanyUnreadCount;
  getCompanyUnreadMessages: Array<CompanyUnreadMessages>;
  getEntryById: EntryWithDetailsType;
  getJobsStatistics: JobsStatisticsResultType;
  getMessages: Array<Message>;
  getNewEntriesWithoutMessages: NewEntriesWithoutMessagesType;
  getStaleEntries: StaleEntriesType;
  getUncheckedEntriesCount: UncheckedEntriesCountType;
  getUnreadNotificationCount: NotificationCount;
  getUserEntries: UserEntriesType;
  getUserMessages: Array<EntryWithLastMessage>;
  getUserNotifications: Array<Notification>;
  getUserStatus: UserStatusType;
  getUsersStatistics: UsersStatisticsResultType;
  isFavorite: Scalars['Boolean']['output'];
  job?: Maybe<JobWithCompanyType>;
  jobs: Array<JobWithCompanyType>;
  jobsByCompanyId: Array<JobWithCompanyType>;
  jobsByCompanyIdWithStats: Array<JobWithStatsType>;
  magazines: Array<MagazineType>;
  me: UserType;
  recentJobs: Array<JobWithCompanyType>;
  searchJobs: JobSearchResultType;
  searchJobsWithStats: JobSearchWithStatsResultType;
  searchUsers: UserSearchResultType;
  user?: Maybe<UserType>;
  userByEmail?: Maybe<UserType>;
  userFavorites: Array<FavoriteType>;
  users: Array<UserType>;
};


export type QueryCheckUserJobEntryArgs = {
  jobId: Scalars['Int']['input'];
};


export type QueryCompanyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCompaniesArgs = {
  input: GetCompaniesInput;
};


export type QueryGetCompaniesStatisticsArgs = {
  input: GetCompaniesStatisticsInput;
};


export type QueryGetCompanyUnreadMessagesArgs = {
  input: GetCompanyUnreadMessagesInput;
};


export type QueryGetEntryByIdArgs = {
  input: GetEntryByIdInput;
};


export type QueryGetJobsStatisticsArgs = {
  input: GetJobsStatisticsInput;
};


export type QueryGetMessagesArgs = {
  entryId: Scalars['Int']['input'];
};


export type QueryGetNewEntriesWithoutMessagesArgs = {
  input: GetNewEntriesWithoutMessagesInput;
};


export type QueryGetStaleEntriesArgs = {
  input: GetStaleEntriesInput;
};


export type QueryGetUserEntriesArgs = {
  input: GetUserEntriesInput;
};


export type QueryGetUserStatusArgs = {
  input: GetUserStatusInput;
};


export type QueryGetUsersStatisticsArgs = {
  input: GetUsersStatisticsInput;
};


export type QueryIsFavoriteArgs = {
  jobId: Scalars['Int']['input'];
};


export type QueryJobArgs = {
  id: Scalars['Int']['input'];
};


export type QueryJobsByCompanyIdArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryJobsByCompanyIdWithStatsArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryRecentJobsArgs = {
  input?: InputMaybe<GetRecentJobsInput>;
};


export type QuerySearchJobsArgs = {
  input: SearchJobsInput;
};


export type QuerySearchJobsWithStatsArgs = {
  input: SearchJobsWithStatsInput;
};


export type QuerySearchUsersArgs = {
  input: SearchUsersInput;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export type RemoveFavoriteInput = {
  jobId: Scalars['Int']['input'];
};

export type RequestCompanyPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type RequestCompanyPasswordResetResponse = {
  __typename?: 'RequestCompanyPasswordResetResponse';
  message: Scalars['String']['output'];
};

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type RequestPasswordResetResponse = {
  __typename?: 'RequestPasswordResetResponse';
  message: Scalars['String']['output'];
};

export type ResetCompanyPasswordInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetCompanyPasswordResponse = {
  __typename?: 'ResetCompanyPasswordResponse';
  message: Scalars['String']['output'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

export type SearchJobsInput = {
  industries?: InputMaybe<Array<Scalars['String']['input']>>;
  jobTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prefectures?: InputMaybe<Array<Scalars['String']['input']>>;
  preferences?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchJobsWithStatsInput = {
  acceptCountMax?: InputMaybe<Scalars['Int']['input']>;
  acceptCountMin?: InputMaybe<Scalars['Int']['input']>;
  closeDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  closeDateStart?: InputMaybe<Scalars['DateTime']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  entryCountMax?: InputMaybe<Scalars['Int']['input']>;
  entryCountMin?: InputMaybe<Scalars['Int']['input']>;
  favoriteCountMax?: InputMaybe<Scalars['Int']['input']>;
  favoriteCountMin?: InputMaybe<Scalars['Int']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  jobType?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  openDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  openDateStart?: InputMaybe<Scalars['DateTime']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  pvCountMax?: InputMaybe<Scalars['Int']['input']>;
  pvCountMin?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUsersInput = {
  availableDaysPerWeekMax?: InputMaybe<Scalars['Int']['input']>;
  availableDaysPerWeekMin?: InputMaybe<Scalars['Int']['input']>;
  availableDurationMonthsMax?: InputMaybe<Scalars['Int']['input']>;
  availableDurationMonthsMin?: InputMaybe<Scalars['Int']['input']>;
  availableHoursPerWeekMax?: InputMaybe<Scalars['Int']['input']>;
  availableHoursPerWeekMin?: InputMaybe<Scalars['Int']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  entryCountMax?: InputMaybe<Scalars['Int']['input']>;
  entryCountMin?: InputMaybe<Scalars['Int']['input']>;
  faculty?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  interestedIndustry?: InputMaybe<Scalars['String']['input']>;
  interestedJobType?: InputMaybe<Scalars['String']['input']>;
  leaveDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  leaveDateStart?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  registerDateEnd?: InputMaybe<Scalars['DateTime']['input']>;
  registerDateStart?: InputMaybe<Scalars['DateTime']['input']>;
  university?: InputMaybe<Scalars['String']['input']>;
};

export type SendMessageInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  content: Scalars['String']['input'];
  entryId: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type SimpleJobWithEntriesType = {
  __typename?: 'SimpleJobWithEntriesType';
  entries: Array<EntryWithUserType>;
  job: JobType;
};

export type StaleEntriesType = {
  __typename?: 'StaleEntriesType';
  entries: Array<EntryWithUserAndJob>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: MessageNotification;
};


export type SubscriptionMessageAddedArgs = {
  entryId: Scalars['Int']['input'];
};

export type UncheckedEntriesCountType = {
  __typename?: 'UncheckedEntriesCountType';
  count: Scalars['Int']['output'];
};

export type UnreadMessageInfo = {
  __typename?: 'UnreadMessageInfo';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  entryId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isRead: Scalars['Boolean']['output'];
};

export type UpdateCompanyInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  businessContent?: InputMaybe<Scalars['String']['input']>;
  capital?: InputMaybe<Scalars['Int']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companyUrl?: InputMaybe<Scalars['String']['input']>;
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeCount?: InputMaybe<Scalars['Int']['input']>;
  headerImageBase64?: InputMaybe<Scalars['String']['input']>;
  headerImageMimeType?: InputMaybe<Scalars['String']['input']>;
  headerImageUrl?: InputMaybe<Scalars['String']['input']>;
  iconImageBase64?: InputMaybe<Scalars['String']['input']>;
  iconImageMimeType?: InputMaybe<Scalars['String']['input']>;
  iconImageUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
  jobType?: InputMaybe<Scalars['String']['input']>;
  members?: InputMaybe<Array<CompanyMemberInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationEmails?: InputMaybe<Array<Scalars['String']['input']>>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  representative?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEntriesStatusInput = {
  ids: Array<Scalars['Int']['input']>;
  status: Scalars['String']['input'];
};

export type UpdateEntryApplicantNoteInput = {
  applicantNote?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateEntryStatusInput = {
  id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};

export type UpdateJobInput = {
  access: Scalars['String']['input'];
  acquirableSkills: Array<Scalars['String']['input']>;
  applicationProcess?: InputMaybe<Scalars['String']['input']>;
  businessContent: Scalars['String']['input'];
  city: Scalars['String']['input'];
  companyAtmosphere: Scalars['String']['input'];
  detailAddress?: InputMaybe<Scalars['String']['input']>;
  experienceGained: Scalars['String']['input'];
  features: Array<Scalars['String']['input']>;
  goal: Scalars['String']['input'];
  headerImageBase64?: InputMaybe<Scalars['String']['input']>;
  headerImageMimeType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  industry: Scalars['String']['input'];
  internJobDescription: Scalars['String']['input'];
  jobHeader: Scalars['String']['input'];
  jobType: Scalars['String']['input'];
  members?: InputMaybe<Array<CreateMemberInput>>;
  minWorkingDaysPerWeek: Scalars['Int']['input'];
  minWorkingHoursPerWeek: Scalars['Int']['input'];
  period: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  prefecture: Scalars['String']['input'];
  preferences: Array<Scalars['String']['input']>;
  programmingLanguages: Array<Scalars['String']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  salary: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  streetAddress: Scalars['String']['input'];
  title: Scalars['String']['input'];
  transportationFeeAmount: Scalars['String']['input'];
  usefulSkills: Array<Scalars['String']['input']>;
  workConditions: Array<Scalars['String']['input']>;
  workingHoursEnd: Scalars['String']['input'];
  workingHoursStart: Scalars['String']['input'];
};

export type UpdateJobPvInput = {
  id: Scalars['Int']['input'];
};

export type UpdateJobStatusInput = {
  id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};

export type UpdateJobsStatusInput = {
  ids: Array<Scalars['Int']['input']>;
  status: Scalars['String']['input'];
};

export type UpdateMagazinesInput = {
  magazines: Array<MagazineItemInput>;
};

export type UpdateUserEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateUserInput = {
  availableDaysPerWeek?: InputMaybe<Scalars['Int']['input']>;
  availableDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  availableHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  avatarFileBase64?: InputMaybe<Scalars['String']['input']>;
  avatarMimeType?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  faculty?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  futureGoals?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  graduationYear?: InputMaybe<Scalars['Int']['input']>;
  interestedIndustries?: InputMaybe<Array<Scalars['String']['input']>>;
  interestedJobTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  magazineNotification?: InputMaybe<Scalars['Boolean']['input']>;
  messageNotification?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  prefecture?: InputMaybe<Scalars['String']['input']>;
  selfPR?: InputMaybe<Scalars['String']['input']>;
  university?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UploadAvatarInput = {
  fileBase64: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type UserEntriesType = {
  __typename?: 'UserEntriesType';
  entries: Array<EntryWithJobType>;
  userId: Scalars['Int']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  faculty?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  university?: Maybe<Scalars['String']['output']>;
};

export type UserSearchResultType = {
  __typename?: 'UserSearchResultType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<UserWithEntryCountType>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type UserStatusType = {
  __typename?: 'UserStatusType';
  status: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  applicantNote?: Maybe<Scalars['String']['output']>;
  availableDaysPerWeek?: Maybe<Scalars['Int']['output']>;
  availableDurationMonths?: Maybe<Scalars['Int']['output']>;
  availableHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  department?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  faculty?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  futureGoals?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  graduationYear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  interestedIndustries: Array<Scalars['String']['output']>;
  interestedJobTypes: Array<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  magazineNotification: Scalars['Boolean']['output'];
  messageNotification: Scalars['Boolean']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  prefecture?: Maybe<Scalars['String']['output']>;
  selfPR?: Maybe<Scalars['String']['output']>;
  university?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserWithEntryCountType = {
  __typename?: 'UserWithEntryCountType';
  availableDaysPerWeek: Scalars['Int']['output'];
  availableDurationMonths: Scalars['Int']['output'];
  availableHoursPerWeek: Scalars['Int']['output'];
  avatarUrl: Scalars['String']['output'];
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  entryCount: Scalars['Int']['output'];
  faculty: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  grade: Scalars['String']['output'];
  graduationYear: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  interestedIndustries: Array<Scalars['String']['output']>;
  interestedJobTypes: Array<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  prefecture: Scalars['String']['output'];
  university: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UsersStatisticsResultType = {
  __typename?: 'UsersStatisticsResultType';
  acceptedCount: Scalars['Int']['output'];
  applicantCount: Scalars['Int']['output'];
  leavedCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type VerifyCompanyPasswordResetTokenInput = {
  token: Scalars['String']['input'];
};

export type VerifyCompanyPasswordResetTokenResponse = {
  __typename?: 'VerifyCompanyPasswordResetTokenResponse';
  isValid: Scalars['Boolean']['output'];
};

export type VerifyPasswordResetTokenInput = {
  token: Scalars['String']['input'];
};

export type VerifyPasswordResetTokenResponse = {
  __typename?: 'VerifyPasswordResetTokenResponse';
  isValid: Scalars['Boolean']['output'];
};

export type GetCompaniesQueryVariables = Exact<{
  input: GetCompaniesInput;
}>;


export type GetCompaniesQuery = { __typename?: 'Query', getCompanies: { __typename?: 'CompanySearchResultType', limit: number, page: number, totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, items: Array<{ __typename?: 'CompanyType', id: number, name: string, industry?: string | null, iconImageUrl?: string | null, prefecture?: string | null, createdAt: any, jobCount?: number | null, acceptCount?: number | null }> } };

export type GetCompaniesStatisticsQueryVariables = Exact<{
  input: GetCompaniesStatisticsInput;
}>;


export type GetCompaniesStatisticsQuery = { __typename?: 'Query', getCompaniesStatistics: { __typename?: 'CompaniesStatisticsResultType', totalCount: number, postedCount: number, acceptedCount: number, leavedCount: number } };

export type SearchJobsWithStatsQueryVariables = Exact<{
  input: SearchJobsWithStatsInput;
}>;


export type SearchJobsWithStatsQuery = { __typename?: 'Query', searchJobsWithStats: { __typename?: 'JobSearchWithStatsResultType', limit: number, page: number, totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, items: Array<{ __typename?: 'JobWithStatsType', id: number, title: string, status: string, pv: number, jobHeader: string, prefecture: string, jobType: string, industry: string, updatedAt: any, companyName: string, favoriteCount: number, entryCount: number, acceptCount: number }> } };

export type GetJobsStatisticsQueryVariables = Exact<{
  input: GetJobsStatisticsInput;
}>;


export type GetJobsStatisticsQuery = { __typename?: 'Query', getJobsStatistics: { __typename?: 'JobsStatisticsResultType', totalCount: number, newPostedCount: number, activeCount: number, closedCount: number } };

export type UpdateMagazineMutationVariables = Exact<{
  input: UpdateMagazinesInput;
}>;


export type UpdateMagazineMutation = { __typename?: 'Mutation', updateMagazines: Array<{ __typename?: 'MagazineType', id: number, title: string, description: string, category: string, thumbnailUrl: string, articleUrl: string }> };

export type GetMagazineQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMagazineQuery = { __typename?: 'Query', magazines: Array<{ __typename?: 'MagazineType', id: number, title: string, description: string, category: string, thumbnailUrl: string, articleUrl: string }> };

export type SearchUsersQueryVariables = Exact<{
  input: SearchUsersInput;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'UserSearchResultType', limit: number, page: number, totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, items: Array<{ __typename?: 'UserWithEntryCountType', id: number, avatarUrl: string, lastName: string, firstName: string, prefecture: string, university: string, faculty: string, department: string, grade: string, availableDaysPerWeek: number, availableHoursPerWeek: number, availableDurationMonths: number, entryCount: number, createdAt: any }> } };

export type GetUsersStatisticsQueryVariables = Exact<{
  input: GetUsersStatisticsInput;
}>;


export type GetUsersStatisticsQuery = { __typename?: 'Query', getUsersStatistics: { __typename?: 'UsersStatisticsResultType', totalCount: number, applicantCount: number, acceptedCount: number, leavedCount: number } };


export const GetCompaniesDocument = gql`
    query getCompanies($input: GetCompaniesInput!) {
  getCompanies(input: $input) {
    items {
      id
      name
      industry
      iconImageUrl
      prefecture
      createdAt
      jobCount
      acceptCount
    }
    limit
    page
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
  }
}
    `;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCompaniesQuery(baseOptions: Apollo.QueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables> & ({ variables: GetCompaniesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
      }
export function useGetCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export function useGetCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompaniesQuery, GetCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, options);
        }
export type GetCompaniesQueryHookResult = ReturnType<typeof useGetCompaniesQuery>;
export type GetCompaniesLazyQueryHookResult = ReturnType<typeof useGetCompaniesLazyQuery>;
export type GetCompaniesSuspenseQueryHookResult = ReturnType<typeof useGetCompaniesSuspenseQuery>;
export type GetCompaniesQueryResult = Apollo.QueryResult<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCompaniesStatisticsDocument = gql`
    query GetCompaniesStatistics($input: GetCompaniesStatisticsInput!) {
  getCompaniesStatistics(input: $input) {
    totalCount
    postedCount
    acceptedCount
    leavedCount
  }
}
    `;

/**
 * __useGetCompaniesStatisticsQuery__
 *
 * To run a query within a React component, call `useGetCompaniesStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesStatisticsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCompaniesStatisticsQuery(baseOptions: Apollo.QueryHookOptions<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables> & ({ variables: GetCompaniesStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>(GetCompaniesStatisticsDocument, options);
      }
export function useGetCompaniesStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>(GetCompaniesStatisticsDocument, options);
        }
export function useGetCompaniesStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>(GetCompaniesStatisticsDocument, options);
        }
export type GetCompaniesStatisticsQueryHookResult = ReturnType<typeof useGetCompaniesStatisticsQuery>;
export type GetCompaniesStatisticsLazyQueryHookResult = ReturnType<typeof useGetCompaniesStatisticsLazyQuery>;
export type GetCompaniesStatisticsSuspenseQueryHookResult = ReturnType<typeof useGetCompaniesStatisticsSuspenseQuery>;
export type GetCompaniesStatisticsQueryResult = Apollo.QueryResult<GetCompaniesStatisticsQuery, GetCompaniesStatisticsQueryVariables>;
export const SearchJobsWithStatsDocument = gql`
    query searchJobsWithStats($input: SearchJobsWithStatsInput!) {
  searchJobsWithStats(input: $input) {
    items {
      id
      title
      status
      pv
      jobHeader
      prefecture
      jobType
      industry
      updatedAt
      companyName
      favoriteCount
      entryCount
      acceptCount
    }
    limit
    page
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
  }
}
    `;

/**
 * __useSearchJobsWithStatsQuery__
 *
 * To run a query within a React component, call `useSearchJobsWithStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJobsWithStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJobsWithStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchJobsWithStatsQuery(baseOptions: Apollo.QueryHookOptions<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables> & ({ variables: SearchJobsWithStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>(SearchJobsWithStatsDocument, options);
      }
export function useSearchJobsWithStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>(SearchJobsWithStatsDocument, options);
        }
export function useSearchJobsWithStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>(SearchJobsWithStatsDocument, options);
        }
export type SearchJobsWithStatsQueryHookResult = ReturnType<typeof useSearchJobsWithStatsQuery>;
export type SearchJobsWithStatsLazyQueryHookResult = ReturnType<typeof useSearchJobsWithStatsLazyQuery>;
export type SearchJobsWithStatsSuspenseQueryHookResult = ReturnType<typeof useSearchJobsWithStatsSuspenseQuery>;
export type SearchJobsWithStatsQueryResult = Apollo.QueryResult<SearchJobsWithStatsQuery, SearchJobsWithStatsQueryVariables>;
export const GetJobsStatisticsDocument = gql`
    query GetJobsStatistics($input: GetJobsStatisticsInput!) {
  getJobsStatistics(input: $input) {
    totalCount
    newPostedCount
    activeCount
    closedCount
  }
}
    `;

/**
 * __useGetJobsStatisticsQuery__
 *
 * To run a query within a React component, call `useGetJobsStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsStatisticsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetJobsStatisticsQuery(baseOptions: Apollo.QueryHookOptions<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables> & ({ variables: GetJobsStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>(GetJobsStatisticsDocument, options);
      }
export function useGetJobsStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>(GetJobsStatisticsDocument, options);
        }
export function useGetJobsStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>(GetJobsStatisticsDocument, options);
        }
export type GetJobsStatisticsQueryHookResult = ReturnType<typeof useGetJobsStatisticsQuery>;
export type GetJobsStatisticsLazyQueryHookResult = ReturnType<typeof useGetJobsStatisticsLazyQuery>;
export type GetJobsStatisticsSuspenseQueryHookResult = ReturnType<typeof useGetJobsStatisticsSuspenseQuery>;
export type GetJobsStatisticsQueryResult = Apollo.QueryResult<GetJobsStatisticsQuery, GetJobsStatisticsQueryVariables>;
export const UpdateMagazineDocument = gql`
    mutation UpdateMagazine($input: UpdateMagazinesInput!) {
  updateMagazines(input: $input) {
    id
    title
    description
    category
    thumbnailUrl
    articleUrl
  }
}
    `;
export type UpdateMagazineMutationFn = Apollo.MutationFunction<UpdateMagazineMutation, UpdateMagazineMutationVariables>;

/**
 * __useUpdateMagazineMutation__
 *
 * To run a mutation, you first call `useUpdateMagazineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMagazineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMagazineMutation, { data, loading, error }] = useUpdateMagazineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMagazineMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMagazineMutation, UpdateMagazineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMagazineMutation, UpdateMagazineMutationVariables>(UpdateMagazineDocument, options);
      }
export type UpdateMagazineMutationHookResult = ReturnType<typeof useUpdateMagazineMutation>;
export type UpdateMagazineMutationResult = Apollo.MutationResult<UpdateMagazineMutation>;
export type UpdateMagazineMutationOptions = Apollo.BaseMutationOptions<UpdateMagazineMutation, UpdateMagazineMutationVariables>;
export const GetMagazineDocument = gql`
    query GetMagazine {
  magazines {
    id
    title
    description
    category
    thumbnailUrl
    articleUrl
  }
}
    `;

/**
 * __useGetMagazineQuery__
 *
 * To run a query within a React component, call `useGetMagazineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMagazineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMagazineQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMagazineQuery(baseOptions?: Apollo.QueryHookOptions<GetMagazineQuery, GetMagazineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMagazineQuery, GetMagazineQueryVariables>(GetMagazineDocument, options);
      }
export function useGetMagazineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMagazineQuery, GetMagazineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMagazineQuery, GetMagazineQueryVariables>(GetMagazineDocument, options);
        }
export function useGetMagazineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMagazineQuery, GetMagazineQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMagazineQuery, GetMagazineQueryVariables>(GetMagazineDocument, options);
        }
export type GetMagazineQueryHookResult = ReturnType<typeof useGetMagazineQuery>;
export type GetMagazineLazyQueryHookResult = ReturnType<typeof useGetMagazineLazyQuery>;
export type GetMagazineSuspenseQueryHookResult = ReturnType<typeof useGetMagazineSuspenseQuery>;
export type GetMagazineQueryResult = Apollo.QueryResult<GetMagazineQuery, GetMagazineQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($input: SearchUsersInput!) {
  searchUsers(input: $input) {
    items {
      id
      avatarUrl
      lastName
      firstName
      prefecture
      university
      faculty
      department
      grade
      availableDaysPerWeek
      availableHoursPerWeek
      availableDurationMonths
      entryCount
      createdAt
    }
    limit
    page
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables> & ({ variables: SearchUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export function useSearchUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersSuspenseQueryHookResult = ReturnType<typeof useSearchUsersSuspenseQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetUsersStatisticsDocument = gql`
    query GetUsersStatistics($input: GetUsersStatisticsInput!) {
  getUsersStatistics(input: $input) {
    totalCount
    applicantCount
    acceptedCount
    leavedCount
  }
}
    `;

/**
 * __useGetUsersStatisticsQuery__
 *
 * To run a query within a React component, call `useGetUsersStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersStatisticsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersStatisticsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables> & ({ variables: GetUsersStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>(GetUsersStatisticsDocument, options);
      }
export function useGetUsersStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>(GetUsersStatisticsDocument, options);
        }
export function useGetUsersStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>(GetUsersStatisticsDocument, options);
        }
export type GetUsersStatisticsQueryHookResult = ReturnType<typeof useGetUsersStatisticsQuery>;
export type GetUsersStatisticsLazyQueryHookResult = ReturnType<typeof useGetUsersStatisticsLazyQuery>;
export type GetUsersStatisticsSuspenseQueryHookResult = ReturnType<typeof useGetUsersStatisticsSuspenseQuery>;
export type GetUsersStatisticsQueryResult = Apollo.QueryResult<GetUsersStatisticsQuery, GetUsersStatisticsQueryVariables>;