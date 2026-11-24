import { z } from "zod";

export const updateJobPickupSchema = z
  .object({
    startDate: z.string().min(1, "開始日を入力してください"),
    endDate: z.string().min(1, "終了日を入力してください"),
    amount: z.coerce
      .number<number>()
      .int()
      .min(0, "請求金額を入力してください"),
  })
  // YYYY-MM-DD 形式の文字列同士は辞書順で日付の前後を比較できる
  .refine((data) => data.startDate <= data.endDate, {
    path: ["endDate"],
    message: "終了日は開始日以降にしてください",
  });

export type UpdateJobPickupFormData = z.infer<typeof updateJobPickupSchema>;

export const createJobPickupSchema = updateJobPickupSchema.safeExtend({
  jobId: z.coerce.number<number>().int().min(1, "求人IDを入力してください"),
});

export type CreateJobPickupFormData = z.infer<typeof createJobPickupSchema>;
