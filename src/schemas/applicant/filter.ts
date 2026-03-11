import { z } from "zod";
import { ruleDateNullable } from "@/schemas/common/date";
import { applyStatuses } from "@/utils/shared/applicant";

export const applicantFilterFormSchema = z
  .object({
    jobTitle: z.string().trim(), // 求人名
    companyName: z.string().trim(), // 企業名
    jobType: z.string(), // 職種
    industry: z.string(), // 業界
    name: z.string().trim(), // 応募者名
    entryDateStart: ruleDateNullable(), // 応募日(開始)
    entryDateEnd: ruleDateNullable(), // 応募日(終了)
    status: z.enum(["", ...applyStatuses]), // ステータス
    interviewDateStart: ruleDateNullable(), // 1回目面談日(開始)
    interviewDateEnd: ruleDateNullable(), // 1回目面談日(終了)
    secondInterviewDateStart: ruleDateNullable(), // 1回目面談日(開始)
    secondInterviewDateEnd: ruleDateNullable(), // 1回目面談日(終了)
    joinDateStart: ruleDateNullable(), // 入社予定日(開始)
    joinDateEnd: ruleDateNullable(), // 入社予定日(終了)
    joinDateByApplicantStart: ruleDateNullable(), // (学生報告)入社予定日(開始)
    joinDateByApplicantEnd: ruleDateNullable(), // (学生報告)入社予定日(終了)
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
  })
  .superRefine(({ interviewDateStart: start, interviewDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["interviewDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["interviewDateEnd"],
      });
    }
  })
  .superRefine(({ joinDateStart: start, joinDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["joinDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["joinDateEnd"],
      });
    }
  })
  .superRefine(
    ({ joinDateByApplicantStart: start, joinDateByApplicantEnd: end }, ctx) => {
      if (start != null && end != null && start > end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "期間指定が逆です",
          path: ["joinDateByApplicantStart"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "期間指定が逆です",
          path: ["joinDateByApplicantEnd"],
        });
      }
    },
  );

export type ApplicantFilterFormData = z.infer<typeof applicantFilterFormSchema>;
