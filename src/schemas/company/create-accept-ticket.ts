import { z } from "zod";

export const createTicketSchema = z.object({
  companyId: z.coerce.number().int().min(1, "企業を選択してください"),
  count: z.coerce.number().int().min(1, "1以上の整数を入力してください"),
  expiredAt: z.string().min(1, "有効期限を入力してください"),
  amount: z.coerce.number().int().min(0, "0以上の金額を入力してください"),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;
