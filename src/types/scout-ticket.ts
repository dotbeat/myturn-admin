export type AdditionalScoutTicket = {
  id: number;
  companyId: number;
  companyName: string;
  totalCount: number;
  usedCount: number;
  remainingCount: number;
  expiredAt: Date;
  createdAt: Date;
};
