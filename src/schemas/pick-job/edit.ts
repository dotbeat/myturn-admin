import { z } from "zod";

const pickJobItemSchema = z.object({
  jobId: z.coerce
    .number({ message: "半角数字のみを入力してください" })
    .min(1, { message: "1以上を入力してください" }),
});

export const pickJobEditFormSchema = z.object({
  pickJobs: z.array(pickJobItemSchema).length(18),
});

export type PickJobEditFormData = z.infer<typeof pickJobEditFormSchema>;
