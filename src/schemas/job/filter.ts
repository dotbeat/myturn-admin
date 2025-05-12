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
  .refine(
    ({ openDateStart: start, openDateEnd: end }) =>
      start == null || end == null || start <= end,
    {
      message: "期間指定が逆です",
      path: ["openDateEnd"],
    },
  )
  .refine(
    ({ closeDateStart: start, closeDateEnd: end }) =>
      start == null || end == null || start <= end,
    {
      message: "期間指定が逆です",
      path: ["closeDateEnd"],
    },
  )
  .refine(({ pvCountMin: min, pvCountMax: max }) => max === 0 || min <= max, {
    message: "範囲指定が逆です",
    path: ["pvCountMax"],
  })
  .refine(
    ({ favoriteCountMin: min, favoriteCountMax: max }) =>
      max === 0 || min <= max,
    {
      message: "範囲指定が逆です",
      path: ["favoriteCountMax"],
    },
  )
  .refine(
    ({ entryCountMin: min, entryCountMax: max }) => max === 0 || min <= max,
    {
      message: "範囲指定が逆です",
      path: ["entryCountMax"],
    },
  )
  .refine(
    ({ acceptCountMin: min, acceptCountMax: max }) => max === 0 || min <= max,
    {
      message: "範囲指定が逆です",
      path: ["acceptCountMax"],
    },
  );

export type JobFilterFormData = z.infer<typeof jobFilterFormSchema>;
