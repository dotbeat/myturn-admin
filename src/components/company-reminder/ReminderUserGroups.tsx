import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { reminderDelayTypeIndex } from "@/const/company-reminder";
import { ReminderTargetUser } from "@/types/company-reminder";
import {
  formatElapsedDays,
  formatLastReminded,
  groupUsersByDelayType,
} from "@/utils/shared/company-reminder";
import ReminderBadge from "./ReminderBadge";

export default function ReminderUserGroups({
  users,
  selectedEntryIds,
  isLoading,
  onToggle,
  className = "",
}: {
  users: ReminderTargetUser[];
  selectedEntryIds: Set<number>;
  isLoading: boolean;
  onToggle: (entryId: number, checked: boolean) => void;
  className?: string;
}) {
  const groups = groupUsersByDelayType(users);

  if (isLoading) {
    return (
      <Typography
        className={`text-sm text-[var(--myturn-sub-text)] ${className}`}
      >
        読み込み中です
      </Typography>
    );
  }

  if (groups.length === 0) {
    return (
      <Typography
        className={`text-sm text-[var(--myturn-sub-text)] ${className}`}
      >
        対象の学生はいません
      </Typography>
    );
  }

  return (
    <Box className={`flex flex-col gap-3 ${className}`}>
      {groups.map(({ delayType, users: group }) => {
        const { label } = reminderDelayTypeIndex[delayType];
        const thresholdDays = group[0].thresholdDays;
        return (
          <Box key={delayType}>
            <Typography className="text-sm font-semibold">
              {label}
              <span className="ml-2 text-xs font-normal text-[var(--myturn-sub-text)]">
                基準{thresholdDays}日
              </span>
            </Typography>
            <Box className="-mx-2.5 flex flex-col">
              {group.map((user) => {
                const lastReminded = formatLastReminded(user);
                return (
                  <FormControlLabel
                    key={user.entryId}
                    className="mx-0 items-center"
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedEntryIds.has(user.entryId)}
                        onChange={(e) =>
                          onToggle(user.entryId, e.target.checked)
                        }
                      />
                    }
                    label={
                      <Box className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                        <span
                          className={
                            user.isOverdue
                              ? ""
                              : "text-[var(--myturn-sub-text)]"
                          }
                        >
                          {user.userName}
                        </span>
                        <span className="text-xs text-[var(--myturn-sub-text)]">
                          {formatElapsedDays(user.elapsedDays)}
                        </span>
                        {user.isOverdue ? (
                          <ReminderBadge variant="warning">
                            基準超過
                          </ReminderBadge>
                        ) : (
                          <ReminderBadge variant="neutral">
                            基準まであと{thresholdDays - user.elapsedDays}日
                          </ReminderBadge>
                        )}
                        {lastReminded && (
                          <ReminderBadge variant="info">
                            {lastReminded}
                          </ReminderBadge>
                        )}
                      </Box>
                    }
                  />
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
