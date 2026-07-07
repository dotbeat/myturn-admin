import { z } from "zod";

export const editInvoiceSchema = z.object({
  amount: z.coerce.number().int().min(0, "請求金額は0以上を入力してください"),
});

export type EditInvoiceFormData = z.infer<typeof editInvoiceSchema>;
