import { z } from "zod";

export const userFilterFormSchema = z.object({
  name: z.string().trim(), // 名前
  gender: z.string(), // 性別
  region: z.string(), // 都道府県
  registerDateStart: z.string().length(10).nullable(), // 登録日(開始)
  registerDateEnd: z.string().length(10).nullable(), // 登録日(終了)
  university: z.string().trim(), // 大学
  faculty: z.string().trim(), // 学部
  department: z.string(), // 学科系統
  grade: z.string(), // 学年
  availableDaysPerWeekMin: z.coerce.number().min(0), // 週の勤務可能日数(最小)
  availableDaysPerWeekMax: z.coerce.number().min(0), // 週の勤務可能日数(最大)
  availableHoursPerWeekMin: z.coerce.number().min(0), // 週の勤務可能時間(最小)
  availableHoursPerWeekMax: z.coerce.number().min(0), // 週の勤務可能時間(最大)
  availableDurationMonthsMin: z.string(), // 継続可能期間(最小)
  availableDurationMonthsMax: z.string(), // 継続可能期間(最大)
  interestedIndustry: z.string(), // 興味のある業界
  interestedJobType: z.string(), // 興味のある職種
  applyCountMin: z.coerce.number().min(0), // 応募階数(最小)
  applyCountMax: z.coerce.number().min(0), // 応募階数(最大)
});

export type UserFilterFormData = z.infer<typeof userFilterFormSchema>;
