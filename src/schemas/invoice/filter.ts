import { z } from "zod";
import { ruleDateNullable } from "../common/date";

export const invoiceFilterFormSchema = z
  .object({
    applicantName: z.string().trim(), // 応募者名
    companyName: z.string().trim(), // 採用企業名
    acceptDateStart: ruleDateNullable(), // 入社日(開始)
    acceptDateEnd: ruleDateNullable(), // 入社日(終了)
    paymentLimitDateStart: ruleDateNullable(), // 支払い期限日(開始)
    paymentLimitDateEnd: ruleDateNullable(), // 支払い期限日(終了)
    service: z.string(), // サービス
  })
  .superRefine(({ acceptDateStart: start, acceptDateEnd: end }, ctx) => {
    if (start != null && end != null && start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["acceptDateStart"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "期間指定が逆です",
        path: ["acceptDateEnd"],
      });
    }
  })
  .superRefine(
    ({ paymentLimitDateStart: start, paymentLimitDateEnd: end }, ctx) => {
      if (start != null && end != null && start > end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "期間指定が逆です",
          path: ["paymentLimitDateStart"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "期間指定が逆です",
          path: ["paymentLimitDateEnd"],
        });
      }
    },
  );

export type InvoiceFilterFormData = z.infer<typeof invoiceFilterFormSchema>;
