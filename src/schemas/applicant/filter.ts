import { z } from "zod";
import { applyStatuses } from "@/utils/shared/applicant";

export const applicantFilterFormSchema = z
  .object({
    jobTitle: z.string().trim(), // 求人名
    companyName: z.string().trim(), // 企業名
    jobType: z.string(), // 職種
    industry: z.string(), // 業界
    name: z.string().trim(), // 応募者名
    entryDateStart: z.string().length(10).nullable(), // 応募日(開始)
    entryDateEnd: z.string().length(10).nullable(), // 応募日(終了)
    status: z.enum(["", ...applyStatuses]), // ステータス
    isOnlyAccepted: z.enum(["", "y"]), // 内定報告済みユーザーに絞り込む
  })
  .superRefine(({ entryDateStart: start, entryDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["entryDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["entryDateEnd"],
      });
    }
  });

export type ApplicantFilterFormData = z.infer<typeof applicantFilterFormSchema>;
