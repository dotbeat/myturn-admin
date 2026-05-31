import { z } from "zod";

export const PICK_JOB_INDICATORS = [
  "responseSpeed",
  "replyRate",
  "interviewRate",
  "offerRate",
  "pvCount",
  "favoriteCount",
] as const;
export type PickJobIndicator = (typeof PICK_JOB_INDICATORS)[number];

const pickJobWeightItemSchema = z.object({
  indicator: z.enum(PICK_JOB_INDICATORS),
  weight: z.coerce
    .number({ message: "半角数字で入力してください" })
    .min(0, { message: "0以上で入力してください" })
    .max(100, { message: "100以下で入力してください" }),
});

export const pickJobWeightFormSchema = z
  .object({
    weights: z
      .array(pickJobWeightItemSchema)
      .length(PICK_JOB_INDICATORS.length, {
        message: `${PICK_JOB_INDICATORS.length}個の指標すべてを入力してください`,
      }),
  })
  .refine(
    (data) => {
      const sum = data.weights.reduce((a, b) => a + b.weight, 0);
      return Math.abs(sum - 100) < 0.01;
    },
    {
      message: "全指標の重みの合計が100%になるようにしてください",
      path: ["weights"],
    },
  );

export type PickJobWeightFormData = z.infer<typeof pickJobWeightFormSchema>;
