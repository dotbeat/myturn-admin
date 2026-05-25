import { z } from "zod";

export const editAgentPlanAmountSchema = z.object({
  agentPlanAmount: z.coerce
    .number()
    .int()
    .min(0, "採用時の請求金額は0以上を入力してください"),
});

export type EditAgentPlanAmountFormData = z.infer<
  typeof editAgentPlanAmountSchema
>;
