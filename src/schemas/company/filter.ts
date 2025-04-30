import { z } from "zod";
import { ruleDateNullable } from "../common/date";

export const companyFilterFormSchema = z.object({
  name: z.string().trim(), // 企業名
  prefecture: z.string(), // 都道府県
  registerDateStart: ruleDateNullable(), // 登録日(開始)
  registerDateEnd: ruleDateNullable(), // 登録日(終了)
  leaveDateStart: ruleDateNullable(), // 退会日(開始)
  leaveDateEnd: ruleDateNullable(), // 退会日(終了)
  industry: z.string(), // 業界
  jobCountMin: z.coerce.number().min(0), // 掲載数(最小)
  jobCountMax: z.coerce.number().min(0), // 掲載数(最大)
  acceptCountMin: z.coerce.number().min(0), // 採用数(最小)
  acceptCountMax: z.coerce.number().min(0), // 採用数(最大)
});

export type CompanyFilterFormData = z.infer<typeof companyFilterFormSchema>;
