import { z } from "zod";
import { applyStatuses } from "@/utils/shared/applicant";

export const applicantFilterFormSchema = z.object({
  jobTitle: z.string().trim(), // 求人名
  companyName: z.string().trim(), // 企業名
  jobType: z.string(), // 職種
  industry: z.string(), // 業界
  name: z.string().trim(), // 応募者名
  entryDateStart: z.string().length(10).nullable(), // 応募日(開始)
  entryDateEnd: z.string().length(10).nullable(), // 応募日(終了)
  status: z.enum(["", ...applyStatuses]), // ステータス
});

export type ApplicantFilterFormData = z.infer<typeof applicantFilterFormSchema>;
