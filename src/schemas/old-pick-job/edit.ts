import { z } from "zod";

const oldPickJobItemSchema = z.object({
  jobId: z.coerce
    .number({ message: "半角数字のみを入力してください" })
    .min(1, { message: "1以上を入力してください" }),
});

export const oldPickJobEditFormSchema = z.object({
  oldPickJobs: z.array(oldPickJobItemSchema).length(18),
});

export type OldPickJobEditFormData = z.infer<typeof oldPickJobEditFormSchema>;
