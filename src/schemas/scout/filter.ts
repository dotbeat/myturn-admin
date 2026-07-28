import { z } from "zod";
import { ruleDateNullable } from "../common/date";

export const scoutFilterFormSchema = z
  .object({
    scoutDateStart: ruleDateNullable(),
    scoutDateEnd: ruleDateNullable(),
    userName: z.string().trim(),
    companyName: z.string().trim(),
    industry: z.string(),
    jobType: z.string(),
    jobTitle: z.string().trim(),
    status: z.string(),
  })
  .superRefine(({ scoutDateStart: start, scoutDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["scoutDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["scoutDateEnd"],
      });
    }
  });

export type ScoutFilterFormData = z.infer<typeof scoutFilterFormSchema>;
