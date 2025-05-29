export type InvoiceService = "TECHNICAL" | "GENERAL";

export type InvoiceItem = {
  id: number;
  acceptDate: Date;
  paymentLimitDate: Date;
  entryId: number;
  userId: number;
  applicantName: string;
  service: InvoiceService;
  amount: number;
  companyName: string;
};
