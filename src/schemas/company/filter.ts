import { z } from "zod";

export const companyFilterFormSchema = z.object({
  name: z.string().trim(), // 企業名
  prefecture: z.string(), // 都道府県
  registerDateStart: z.string().length(10).nullable(), // 登録日(開始)
  registerDateEnd: z.string().length(10).nullable(), // 登録日(終了)
  leaveDateStart: z.string().length(10).nullable(), // 退会日(開始)
  leaveDateEnd: z.string().length(10).nullable(), // 退会日(終了)
  industry: z.string(), // 業界
  jobCountMax: z.coerce.number().min(0), // 掲載数(最小)
  jobCountMin: z.coerce.number().min(0), // 掲載数(最大)
  acceptCountMin: z.coerce.number().min(0), // 採用数(最小)
  acceptCountMax: z.coerce.number().min(0), // 採用数(最大)
});

export type CompanyFilterFormData = z.infer<typeof companyFilterFormSchema>;
