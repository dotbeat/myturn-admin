import { z } from "zod";

export const updateTicketSchema = z.object({
  count: z.coerce.number().int().min(1, "デポジット追加数を入力してください"),
  amount: z.coerce.number().int().min(1, "請求金額を入力してください"),
  expiredAt: z.string().min(1, "有効期限を入力してください"),
});

export type UpdateTicketFormData = z.infer<typeof updateTicketSchema>;
