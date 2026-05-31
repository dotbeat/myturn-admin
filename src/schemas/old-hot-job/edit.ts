import { z } from "zod";

const oldHotJobItemSchema = z.object({
  jobId: z.coerce
    .number({ message: "半角数字のみを入力してください" })
    .min(1, { message: "1以上を入力してください" }),
});

export const oldHotJobEditFormSchema = z.object({
  oldHotJobs: z.array(oldHotJobItemSchema).length(6),
});

export type OldHotJobEditFormData = z.infer<typeof oldHotJobEditFormSchema>;
