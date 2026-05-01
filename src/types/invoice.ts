export type InvoiceService = "TECHNICAL" | "GENERAL";

export type InvoiceItem = {
  id: number;
  acceptDate: Date;
  paymentLimitDate: Date | null;
  applicantName: string;
  entryId: number;
  userId: number;
  service: InvoiceService;
  isDeposit: boolean;
  amount: number;
  companyName: string;
};

export type AcceptTicket = {
  id: number;
  companyId: number;
  companyName: string;
  count: number;
  usedCount: number;
  expiredAt: Date;
  amount: number;
  createdAt: Date;
};
