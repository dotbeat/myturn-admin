import { z } from "zod";

export const scheduleTypeEnum = z.enum(["daily", "weekly", "monthly"]);
export type ScheduleType = z.infer<typeof scheduleTypeEnum>;

export const scheduleConfigSchema = z.object({
  scheduleType: scheduleTypeEnum,
  // 毎週選択時のみ使用（0=日, 1=月, ..., 6=土）複数曜日を配列で保持
  dayOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  // 毎月選択時のみ使用（1〜31日）最大3件を配列で保持、未入力はnull
  dayOfMonth: z
    .array(
      z.preprocess(
        (val) => {
          if (val == null || val === "") return null;
          const n = Number(val);
          return isNaN(n) ? null : n;
        },
        z.union([
          z
            .number()
            .int()
            .min(1, "1以上を入力してください")
            .max(31, "31以下を入力してください"),
          z.null(),
        ]),
      ),
    )
    .length(3)
    .optional(),
  hour: z.coerce
    .number({ message: "半角数字で入力してください" })
    .int()
    .min(0, "0以上を入力してください")
    .max(23, "23以下を入力してください"),
  minute: z.coerce
    .number({ message: "半角数字で入力してください" })
    .int()
    .min(0, "0以上を入力してください")
    .max(59, "59以下を入力してください"),
});

const notificationItemSchema = z.object({
  key: z.string(),
  message: z.string().min(1, "メッセージを入力してください"),
  schedule: scheduleConfigSchema.optional(),
});

export const lineNotificationEditFormSchema = z.object({
  notifications: z.array(notificationItemSchema),
});

export type ScheduleConfig = z.infer<typeof scheduleConfigSchema>;
export type NotificationItem = z.infer<typeof notificationItemSchema>;
export type LineNotificationEditFormData = z.infer<
  typeof lineNotificationEditFormSchema
>;
