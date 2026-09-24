import { z } from "zod";

export const companyReminderFilterFormSchema = z.object({
  keyword: z.string().trim(), // 企業名（部分一致）
  onlyOverdue: z.boolean(), // 基準超過のある企業のみ
});

export type CompanyReminderFilterFormData = z.infer<
  typeof companyReminderFilterFormSchema
>;
