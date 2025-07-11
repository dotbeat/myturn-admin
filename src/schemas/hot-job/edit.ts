import { z } from "zod";

const hotJobItemSchema = z.object({
  jobId: z.coerce
    .number({ message: "半角数字のみを入力してください" })
    .min(1, { message: "1以上を入力してください" }),
});

export const hotJobEditFormSchema = z.object({
  hotJobs: z.array(hotJobItemSchema).length(6),
});

export type HotJobEditFormData = z.infer<typeof hotJobEditFormSchema>;
