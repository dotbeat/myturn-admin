import { z } from "zod";
import { ruleDateNullable } from "../common/date";

export const companyFilterFormSchema = z
  .object({
    name: z.string().trim(), // 企業名
    prefecture: z.string(), // 都道府県
    registerDateStart: ruleDateNullable(), // 登録日(開始)
    registerDateEnd: ruleDateNullable(), // 登録日(終了)
    leaveDateStart: ruleDateNullable(), // 退会日(開始)
    leaveDateEnd: ruleDateNullable(), // 退会日(終了)
    industry: z.string(), // 業界
    jobCountMin: z.coerce.number().min(0), // 掲載数(最小)
    jobCountMax: z.coerce.number().min(0), // 掲載数(最大)
    entryCountMin: z.coerce.number().min(0), // 応募数(最小)
    entryCountMax: z.coerce.number().min(0), // 応募数(最大)
    offerCountMin: z.coerce.number().min(0), // 内定数(最小)
    offerCountMax: z.coerce.number().min(0), // 内定数(最大)
    acceptCountMin: z.coerce.number().min(0), // 採用数(最小)
    acceptCountMax: z.coerce.number().min(0), // 採用数(最大)
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
  .superRefine(({ jobCountMin: min, jobCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["jobCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["jobCountMax"],
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
  .superRefine(({ offerCountMin: min, offerCountMax: max }, ctx) => {
    if (max !== 0 && min > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["offerCountMin"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "範囲指定が逆です",
        path: ["offerCountMax"],
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

export type CompanyFilterFormData = z.infer<typeof companyFilterFormSchema>;
