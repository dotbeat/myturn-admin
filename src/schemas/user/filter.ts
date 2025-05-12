import { z } from "zod";
import { ruleDateNullable } from "../common/date";

export const userFilterFormSchema = z
  .object({
    name: z.string().trim(), // 名前
    gender: z.string(), // 性別
    prefecture: z.string(), // 都道府県
    registerDateStart: ruleDateNullable(), // 登録日(開始)
    registerDateEnd: ruleDateNullable(), // 登録日(終了)
    leaveDateStart: ruleDateNullable(), // 退会日(開始)
    leaveDateEnd: ruleDateNullable(), // 退会日(終了)
    university: z.string().trim(), // 大学
    faculty: z.string().trim(), // 学部
    department: z.string(), // 学科系統
    grade: z.string(), // 学年
    availableDaysPerWeekMin: z.coerce.number().min(0), // 週の勤務可能日数(最小)
    availableDaysPerWeekMax: z.coerce.number().min(0), // 週の勤務可能日数(最大)
    availableHoursPerWeekMin: z.coerce.number().min(0), // 週の勤務可能時間(最小)
    availableHoursPerWeekMax: z.coerce.number().min(0), // 週の勤務可能時間(最大)
    availableDurationMonthsMin: z.coerce.number().min(0), // 継続可能期間(最小)
    availableDurationMonthsMax: z.coerce.number().min(0), // 継続可能期間(最大)
    interestedIndustry: z.string(), // 興味のある業界
    interestedJobType: z.string(), // 興味のある職種
    entryCountMin: z.coerce.number().min(0), // 応募階数(最小)
    entryCountMax: z.coerce.number().min(0), // 応募階数(最大)
  })
  .superRefine(({ registerDateStart: start, registerDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["registerDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["registerDateEnd"],
      });
    }
  })
  .superRefine(({ leaveDateStart: start, leaveDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["leaveDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["leaveDateEnd"],
      });
    }
  })
  .superRefine(
    ({ availableDaysPerWeekMin: min, availableDaysPerWeekMax: max }, ctx) => {
      if (max !== 0 && min > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableDaysPerWeekMin"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableDaysPerWeekMax"],
        });
      }
    },
  )
  .superRefine(
    ({ availableHoursPerWeekMin: min, availableHoursPerWeekMax: max }, ctx) => {
      if (max !== 0 && min > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableHoursPerWeekMin"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableHoursPerWeekMax"],
        });
      }
    },
  )
  .superRefine(
    (
      { availableDurationMonthsMin: min, availableDurationMonthsMax: max },
      ctx,
    ) => {
      if (max !== 0 && min > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableDurationMonthsMin"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "範囲指定が逆です",
          path: ["availableDurationMonthsMax"],
        });
      }
    },
  )
  .superRefine(({ entryCountMin: min, entryCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["entryCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["entryCountMax"],
      });
    }
  });

export type UserFilterFormData = z.infer<typeof userFilterFormSchema>;
