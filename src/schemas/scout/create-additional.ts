import { z } from "zod";

// API 側 ALLOWED_ADDITIONAL_SCOUT_TICKET_COUNTS と一致させること
export const ALLOWED_TOTAL_COUNTS = [100, 200] as const;

export const PRICE_BY_COUNT: Record<number, number> = {
  100: 30000,
  200: 50000,
};

export const createAdditionalScoutTicketSchema = z.object({
  companyId: z.coerce
    .number()
    .int()
    .min(1, { message: "企業を選択してください" }),
  totalCount: z.coerce
    .number()
    .refine((v) => (ALLOWED_TOTAL_COUNTS as readonly number[]).includes(v), {
      message: "追加数は 100 または 200 を選択してください",
    }),
});

export type CreateAdditionalScoutTicketFormData = z.infer<
  typeof createAdditionalScoutTicketSchema
>;
