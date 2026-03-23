"use client";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import {
  LineNotificationEditFormData,
  lineNotificationEditFormSchema,
} from "@/schemas/line-notification/edit";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";
import ScheduleInput from "@/components/common/ScheduleInput";

import { useQuery, useMutation } from "@apollo/client";
import {
  GetLineNotificationSettingsQuery,
  UpdateLineNotificationSettingsMutation,
} from "@/graphql-client";
import { GET_LINE_NOTIFICATION_SETTINGS } from "@/server/graphql/line-notification/queries";
import { UPDATE_LINE_NOTIFICATION_SETTINGS } from "@/server/graphql/line-notification/mutations";

type NotificationTypeInfo = {
  key: string;
  name: string;
  description: string;
  notificationType: "transaction" | "schedule";
  timingDescription?: string;
  defaultSchedule?: {
    scheduleType: "daily" | "weekly" | "monthly";
    dayOfWeek?: number;
    dayOfMonth?: number;
    hour: number;
    minute: number;
  };
};

const NOTIFICATION_TYPES: NotificationTypeInfo[] = [
  // ── トランザクション通知 ──────────────────────────────────────
  {
    key: "AfterRegister",
    name: "登録完了",
    description: "ユーザーがアカウントを作成したことの通知",
    notificationType: "transaction",
    timingDescription: "登録時に自動送信されます",
  },
  {
    key: "NewMessage",
    name: "新着メッセージ",
    description: "企業からメッセージが届いた時の通知",
    notificationType: "transaction",
    timingDescription: "メッセージ受信時に自動送信されます",
  },
  {
    key: "NewScout",
    name: "新着スカウト",
    description: "企業からスカウトが届いた時の通知",
    notificationType: "transaction",
    timingDescription: "スカウト受信時に自動送信されます",
  },
  {
    key: "JobOffer",
    name: "内定通知",
    description: "応募した求人ステータスが内定になった時の通知",
    notificationType: "transaction",
    timingDescription: "求人ステータスが内定に変更された時に自動送信されます",
  },
  // ── スケジュール通知 ──────────────────────────────────────────
  {
    key: "YesterdayOfInterview",
    name: "面接日前日",
    description: "面接日の前日であることの通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 19, minute: 3 },
  },
  {
    key: "TodayOfInterview",
    name: "面接日当日",
    description: "面接日の当日であることの通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 8, minute: 3 },
  },
  {
    key: "UnreadMessage",
    name: "未読メッセージ",
    description: "未読メッセージがあることのリマインド通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 19, minute: 3 },
  },
  {
    key: "UnreadScout",
    name: "未承諾スカウト",
    description: "承諾待ちのスカウトがあることのリマインド通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 19, minute: 3 },
  },
  {
    key: "IncompleteProfile",
    name: "プロフィール未記入",
    description: "プロフィールが未記入であることの促進通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 9, minute: 3 },
  },
  {
    key: "NewJob",
    name: "新着求人",
    description:
      "直近24時間以内に作成・公開された新着求人の通知（内定の無いユーザーのみ）",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 9, minute: 6 },
  },
  {
    key: "EncourageApply",
    name: "応募促進",
    description: "1件も応募していないユーザーへの応募促進通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 9, minute: 3 },
  },
  {
    key: "EncourageMoreApply",
    name: "追加応募促進",
    description:
      "1件のみ応募したユーザーへのさらなる応募促進通知（内定の無いユーザーのみ）",
    notificationType: "schedule",
    defaultSchedule: {
      scheduleType: "weekly",
      dayOfWeek: 1,
      hour: 9,
      minute: 3,
    },
  },
  {
    key: "RequestOfferReport",
    name: "内定報告依頼",
    description: "二次面談後の3日後に内定の有無を確認するリマインド通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 9, minute: 6 },
  },
  {
    key: "Comeback",
    name: "再来促進",
    description: "30日間/60日間ログインしていないユーザーへの再来促進通知",
    notificationType: "schedule",
    defaultSchedule: { scheduleType: "daily", hour: 10, minute: 9 },
  },
];

const transactionNotifications = NOTIFICATION_TYPES.filter(
  (n) => n.notificationType === "transaction",
);
const scheduleNotifications = NOTIFICATION_TYPES.filter(
  (n) => n.notificationType === "schedule",
);

const createDefaultValues = (): LineNotificationEditFormData => ({
  notifications: NOTIFICATION_TYPES.map((type) => ({
    key: type.key,
    isEnabled: true,
    message: "",
    ...(type.defaultSchedule
      ? {
          schedule: {
            scheduleType: type.defaultSchedule.scheduleType,
            // 毎週の初期曜日は1件の配列、それ以外は空配列
            dayOfWeek:
              type.defaultSchedule.dayOfWeek != null
                ? [type.defaultSchedule.dayOfWeek]
                : [],
            // 毎月の日付は常に3スロット分（未入力はnull）
            dayOfMonth: [null, null, null],
            hour: type.defaultSchedule.hour,
            minute: type.defaultSchedule.minute,
          },
        }
      : {}),
  })),
});

export default function PageBody() {
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "info" });

  const handleCloseToast = () => setToast((prev) => ({ ...prev, open: false }));

  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning",
  ) => setToast({ open: true, message, severity });

  const methods = useForm<LineNotificationEditFormData>({
    resolver: zodResolver(lineNotificationEditFormSchema),
    mode: "onChange",
    defaultValues: createDefaultValues(),
  });

  useQuery<GetLineNotificationSettingsQuery>(GET_LINE_NOTIFICATION_SETTINGS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const updated = createDefaultValues();
      data.getLineNotificationSettings.forEach((setting) => {
        const index = NOTIFICATION_TYPES.findIndex(
          (n) => n.key === setting.key,
        );
        if (index !== -1) {
          updated.notifications[index].isEnabled = setting.isEnabled;
          updated.notifications[index].message = setting.message;
          if (setting.schedule) {
            updated.notifications[index].schedule = {
              scheduleType: setting.schedule.scheduleType as
                | "daily"
                | "weekly"
                | "monthly",
              dayOfWeek: setting.schedule.dayOfWeek ?? [],
              dayOfMonth: setting.schedule.dayOfMonth ?? [null, null, null],
              hour: setting.schedule.hour ?? 0,
              minute: setting.schedule.minute ?? 0,
            };
          }
        }
      });
      methods.reset(updated);
    },
  });

  const [updateLineNotificationSettings, { loading: isUpdating }] =
    useMutation<UpdateLineNotificationSettingsMutation>(
      UPDATE_LINE_NOTIFICATION_SETTINGS,
      {
        onCompleted: () => {
          showToast("LINE通知設定が更新されました", "success");
        },
        onError: (err) => {
          console.error("更新中にエラーが発生しました:", err);
          setError(err.message || "更新中にエラーが発生しました");
          showToast("更新中にエラーが発生しました", "error");
        },
      },
    );

  const onSubmit = async (data: LineNotificationEditFormData) => {
    try {
      const input = {
        notifications: data.notifications.map((n) => ({
          key: n.key,
          isEnabled: n.isEnabled,
          message: n.message,
          ...(n.schedule
            ? {
                schedule: {
                  scheduleType: n.schedule.scheduleType,
                  ...(n.schedule.scheduleType === "weekly"
                    ? { dayOfWeek: n.schedule.dayOfWeek }
                    : {}),
                  ...(n.schedule.scheduleType === "monthly"
                    ? { dayOfMonth: n.schedule.dayOfMonth }
                    : {}),
                  hour: n.schedule.hour,
                  minute: n.schedule.minute,
                },
              }
            : {}),
        })),
      };
      console.log("input", input);
      await updateLineNotificationSettings({ variables: { input } });

      setError(null);
    } catch (err) {
      console.error("LINE通知設定更新中にエラーが発生しました:", err);
      setError(
        err instanceof Error
          ? err.message
          : "LINE通知設定更新中にエラーが発生しました",
      );
    }
  };

  return (
    <Box className="flex-1 px-8 pb-12 pt-6">
      <PageTitle className="mb-1">LINE通知メッセージ設定</PageTitle>
      <Typography
        variant="body2"
        className="mb-8 text-[var(--myturn-sub-text)]"
      >
        使用可能なプレースホルダー ...{" "}
        {"{候補者名} {企業名} {求人名} {面談日時}"}
      </Typography>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-10"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {/* トランザクション通知セクション */}
          <Box className="space-y-4">
            <Box>
              <Typography className="mb-1 text-lg font-bold">
                トランザクション通知
              </Typography>
              <Typography
                variant="body2"
                className="text-[var(--myturn-sub-text)]"
              >
                特定のイベント発生時に自動的に送信される通知です。送信タイミングはシステムにより固定されています。
              </Typography>
              <Divider className="mt-3" />
            </Box>
            <Box className="grid gap-4 lg:grid-cols-2">
              {transactionNotifications.map((notification) => {
                const index = NOTIFICATION_TYPES.findIndex(
                  (n) => n.key === notification.key,
                );
                return (
                  <NotificationCard
                    key={notification.key}
                    notification={notification}
                    formIndex={index}
                  />
                );
              })}
            </Box>
          </Box>

          {/* スケジュール通知セクション */}
          <Box className="space-y-4">
            <Box>
              <Typography className="mb-1 text-lg font-bold">
                スケジュール通知
              </Typography>
              <Typography
                variant="body2"
                className="text-[var(--myturn-sub-text)]"
              >
                定期的なスケジュールで送信される通知です。通知ごとに送信タイミングを設定できます。
              </Typography>
              <Divider className="mt-3" />
            </Box>
            <Box className="grid gap-4 lg:grid-cols-2">
              {scheduleNotifications.map((notification) => {
                const index = NOTIFICATION_TYPES.findIndex(
                  (n) => n.key === notification.key,
                );
                return (
                  <NotificationCard
                    key={notification.key}
                    notification={notification}
                    formIndex={index}
                  />
                );
              })}
            </Box>
          </Box>

          {error && (
            <Typography className="text-[var(--myturn-accent)]">
              {error}
            </Typography>
          )}

          <Box>
            <Button
              type="submit"
              disabled={isUpdating}
              className="rounded-full bg-[var(--myturn-main)] px-6 py-3 text-[var(--foreground)] disabled:opacity-50"
            >
              {isUpdating ? "更新中..." : "すべての設定を保存する"}
            </Button>
          </Box>
        </form>
      </FormProvider>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function NotificationCard({
  notification,
  formIndex,
}: {
  notification: NotificationTypeInfo;
  formIndex: number;
}) {
  const { control: isEnabledControl } =
    useFormContext<LineNotificationEditFormData>();

  return (
    <Box className="space-y-2 rounded-lg border border-[var(--myturn-border)] bg-[var(--background)] p-3">
      <Box className="p-2">
        {/* ヘッダー */}
        <Box className="mb-1 flex items-center justify-between">
          <Typography className="text-base font-bold">
            {notification.name}
          </Typography>
          <Controller
            control={isEnabledControl}
            name={`notifications.${formIndex}.isEnabled`}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                size="small"
              />
            )}
          />
        </Box>
        <Typography
          variant="body2"
          className="mb-2 text-[var(--myturn-sub-text)]"
        >
          {notification.description}
        </Typography>

        {/* メッセージテキストエリア */}
        <TextField
          name={`notifications.${formIndex}.message`}
          label="メッセージ"
          rows={6}
          placeholder="{候補者名}さんへのメッセージを入力してください..."
        />
      </Box>

      {/* 送信タイミング */}
      {notification.notificationType === "transaction" ? (
        <Box className="rounded bg-[var(--myturn-background)] p-2">
          <Typography variant="body2" className="text-[var(--myturn-sub-text)]">
            送信タイミング：{notification.timingDescription}
          </Typography>
        </Box>
      ) : (
        <Box className="space-y-2">
          <Typography className="px-2 text-sm font-semibold">
            送信タイミング
          </Typography>
          <Box className="rounded border border-[var(--myturn-border)] bg-[var(--myturn-background)] p-2">
            <ScheduleInput name={`notifications.${formIndex}.schedule`} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
