import { z } from "zod";
import { jobStatuses } from "@/utils/shared/job";
import { ruleDateNullable } from "../common/date";

export const jobFilterFormSchema = z.object({
  title: z.string().trim(), // 求人タイトル
  companyName: z.string().trim(), // 企業名
  prefecture: z.string(), // 都道府県
  openDateStart: ruleDateNullable(), // 公開日(開始)
  openDateEnd: ruleDateNullable(), // 公開日(終了)
  closeDateStart: ruleDateNullable(), // 終了日(開始)
  closeDateEnd: ruleDateNullable(), // 終了日(終了)
  jobType: z.string(), // 職種
  industry: z.string(), // 業界
  status: z.enum(["", ...jobStatuses]), // ステータス
  pvCountMin: z.coerce.number().min(0), // PV数(最小)
  pvCountMax: z.coerce.number().min(0), // PV数(最大)
  favoriteCountMin: z.coerce.number().min(0), // お気に入り数(最小)
  favoriteCountMax: z.coerce.number().min(0), // お気に入り数(最大)
  applyCountMin: z.coerce.number().min(0), // 応募数(最小)
  applyCountMax: z.coerce.number().min(0), // 応募数(最大)
  acceptCountMin: z.coerce.number().min(0), // 採用数(最小)
  acceptCountMax: z.coerce.number().min(0), // 採用数(最大)
});

export type JobFilterFormData = z.infer<typeof jobFilterFormSchema>;
