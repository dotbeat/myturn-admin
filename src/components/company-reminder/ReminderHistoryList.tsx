import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { reminderDelayTypeIndex } from "@/const/company-reminder";
import { CompanyReminder } from "@/types/company-reminder";
import { formatElapsedDays } from "@/utils/shared/company-reminder";
import ReminderBadge from "./ReminderBadge";

export default function ReminderHistoryList({
  reminders,
  isLoading,
  className = "",
}: {
  reminders: CompanyReminder[];
  isLoading: boolean;
  className?: string;
}) {
  // 本文を展開表示している履歴ID
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <Typography
        className={`text-sm text-[var(--myturn-sub-text)] ${className}`}
      >
        読み込み中です
      </Typography>
    );
  }

  if (reminders.length === 0) {
    return (
      <Typography
        className={`text-sm text-[var(--myturn-sub-text)] ${className}`}
      >
        まだ送信履歴はありません
      </Typography>
    );
  }

  return (
    <Box className={`divide-y divide-[var(--myturn-border)] ${className}`}>
      {reminders.map((reminder) => {
        const isExpanded = expandedId === reminder.id;
        return (
          <Box key={reminder.id} className="py-3">
            <Box className="flex flex-wrap items-center justify-between gap-2">
              <Box className="flex flex-wrap items-center gap-2">
                <Typography className="text-sm font-semibold">
                  {reminder.templateName}
                </Typography>
                {!reminder.isSuccess && (
                  <ReminderBadge variant="danger">送信失敗</ReminderBadge>
                )}
                {reminder.underThresholdCount > 0 && (
                  <ReminderBadge variant="info">
                    基準未満{reminder.underThresholdCount}人を含む
                  </ReminderBadge>
                )}
              </Box>
              <Typography className="text-xs text-[var(--myturn-sub-text)]">
                {reminder.createdAt.toLocaleString("ja")}
              </Typography>
            </Box>
            <Typography className="mt-1 text-sm text-[var(--myturn-sub-text)]">
              {reminder.users
                .map(
                  (s) =>
                    `${s.userName}（${reminderDelayTypeIndex[s.delayType].label}・${formatElapsedDays(s.elapsedDays)}${s.isOverdue ? "" : "・基準未満"}）`,
                )
                .join("、")}
            </Typography>
            {!reminder.isSuccess && reminder.errorMessage && (
              <Typography className="mt-1 text-xs text-red-600">
                {reminder.errorMessage}
              </Typography>
            )}
            <Button
              size="small"
              onClick={() => setExpandedId(isExpanded ? null : reminder.id)}
              className="mt-1 px-1 py-0 text-xs text-[var(--myturn-sub-text)]"
            >
              {isExpanded ? "本文を閉じる" : "本文を表示"}
            </Button>
            {isExpanded && (
              <Box className="mt-1 rounded-md bg-[var(--myturn-background)] px-3 py-2 text-sm">
                <Typography className="mb-1 text-xs text-[var(--myturn-sub-text)]">
                  件名：{reminder.subject}
                </Typography>
                <Typography className="whitespace-pre-wrap text-sm">
                  {reminder.body}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
