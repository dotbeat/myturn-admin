import { z } from "zod";
import { jobStatuses } from "@/utils/shared/job";
import { ruleDateNullable } from "../common/date";

export const jobFilterFormSchema = z
  .object({
    title: z.string().trim(), // 求人タイトル
    companyName: z.string().trim(), // 企業名
    prefecture: z.string(), // 都道府県
    status: z.enum(["", ...jobStatuses]), // ステータス
    openDateStart: ruleDateNullable(), // 公開日(開始)
    openDateEnd: ruleDateNullable(), // 公開日(終了)
    closeDateStart: ruleDateNullable(), // 終了日(開始)
    closeDateEnd: ruleDateNullable(), // 終了日(終了)
    jobType: z.string(), // 職種
    industry: z.string(), // 業界
    pvCountMin: z.coerce.number().min(0), // PV数(最小)
    pvCountMax: z.coerce.number().min(0), // PV数(最大)
    favoriteCountMin: z.coerce.number().min(0), // お気に入り数(最小)
    favoriteCountMax: z.coerce.number().min(0), // お気に入り数(最大)
    entryCountMin: z.coerce.number().min(0), // 応募数(最小)
    entryCountMax: z.coerce.number().min(0), // 応募数(最大)
    acceptCountMin: z.coerce.number().min(0), // 採用数(最小)
    acceptCountMax: z.coerce.number().min(0), // 採用数(最大)
  })
  .superRefine(({ openDateStart: start, openDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["openDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["openDateEnd"],
      });
    }
  })
  .superRefine(({ closeDateStart: start, closeDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["closeDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["closeDateEnd"],
      });
    }
  })
  .superRefine(({ pvCountMin: min, pvCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["pvCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["pvCountMax"],
      });
    }
  })
  .superRefine(({ favoriteCountMin: min, favoriteCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["favoriteCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["favoriteCountMax"],
      });
    }
  })
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
  })
  .superRefine(({ acceptCountMin: min, acceptCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["acceptCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["acceptCountMax"],
      });
    }
  });

export type JobFilterFormData = z.infer<typeof jobFilterFormSchema>;
