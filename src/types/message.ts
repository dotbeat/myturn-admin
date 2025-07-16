export interface AdminMessageUser {
  id: number;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  university?: string;
  faculty?: string;
}

export interface AdminMessageCompany {
  id: number;
  name: string;
  iconImageUrl?: string;
}

export interface AdminMessageJob {
  id: number;
  title: string;
  jobHeader: string;
  industry: string;
  jobType: string;
}

export interface AdminMessage {
  id: number;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  entryId: number;
  user?: AdminMessageUser;
  company?: AdminMessageCompany;
  job: AdminMessageJob;
}

export interface AdminMessagesResult {
  items: AdminMessage[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
