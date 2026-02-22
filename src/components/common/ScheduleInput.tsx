"use client";
import {
  FieldError,
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const DAYS_OF_WEEK = [
  { label: "月", value: 1 },
  { label: "火", value: 2 },
  { label: "水", value: 3 },
  { label: "木", value: 4 },
  { label: "金", value: 5 },
  { label: "土", value: 6 },
  { label: "日", value: 0 },
];

const DAY_OF_MONTH_SLOTS = [0, 1, 2] as const;

export default function ScheduleInput({ name }: { name: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const scheduleType = useWatch({ control, name: `${name}.scheduleType` });

  const getError = (fieldPath: string): Partial<FieldError> | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorObj: any = errors;
    fieldPath.split(".").forEach((level) => {
      errorObj = errorObj != null ? errorObj[level] : null;
    });
    return errorObj as Partial<FieldError> | null;
  };

  const hourError = getError(`${name}.hour`);
  const minuteError = getError(`${name}.minute`);

  const numberInputClass = (hasError: boolean) =>
    `w-16 rounded-md border px-3 py-2 shadow-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
      hasError
        ? "border-[var(--myturn-accent)] ring-1 ring-[var(--myturn-accent)]"
        : "border-[var(--myturn-support-middle)] focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"
    }`;

  return (
    <Box className="space-y-3">
      {/* 送信頻度 */}
      <Box className="flex flex-wrap items-center gap-3">
        <Typography className="min-w-[4.5rem] text-sm font-semibold">
          送信頻度
        </Typography>
        <Controller
          name={`${name}.scheduleType`}
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value="daily"
                control={<Radio size="small" />}
                label="毎日"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio size="small" />}
                label="毎週"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio size="small" />}
                label="毎月"
              />
            </RadioGroup>
          )}
        />
      </Box>

      {/* 曜日選択（毎週の場合）複数選択可 */}
      {scheduleType === "weekly" && (
        <Box className="flex flex-wrap items-center gap-3">
          <Typography className="min-w-[4.5rem] text-sm font-semibold">
            曜日
          </Typography>
          <Controller
            name={`${name}.dayOfWeek`}
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <Box className="flex flex-wrap gap-1">
                {DAYS_OF_WEEK.map((day) => (
                  <FormControlLabel
                    key={day.value}
                    label={day.label}
                    control={
                      <Checkbox
                        size="small"
                        checked={(value as number[]).includes(day.value)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...(value as number[]), day.value]
                            : (value as number[]).filter(
                                (v) => v !== day.value,
                              );
                          onChange(next);
                        }}
                      />
                    }
                  />
                ))}
              </Box>
            )}
          />
        </Box>
      )}

      {/* 日付選択（毎月の場合）最大3件 */}
      {scheduleType === "monthly" && (
        <Box className="space-y-2">
          <Box className="flex flex-wrap items-start gap-3">
            <Typography className="min-w-[4.5rem] pt-2 text-sm font-semibold">
              日付
            </Typography>
            <Box className="flex flex-col gap-1.5">
              <Box className="flex gap-1">
                {DAY_OF_MONTH_SLOTS.map((i) => {
                  const slotError = getError(`${name}.dayOfMonth.${i}`);
                  return (
                    <Box key={i} className="flex items-center gap-1">
                      <Typography className="text-sm">
                        {i === 0 ? "毎月" : "・"}
                      </Typography>
                      <input
                        type="number"
                        {...register(`${name}.dayOfMonth.${i}`)}
                        min={1}
                        max={31}
                        className={numberInputClass(!!slotError)}
                      />
                      <Typography className="text-sm">日</Typography>
                    </Box>
                  );
                })}
              </Box>
              {DAY_OF_MONTH_SLOTS.map((i) => {
                const slotError = getError(`${name}.dayOfMonth.${i}`);
                return slotError?.message ? (
                  <Box key={i} className="space-y-0.5">
                    <Typography
                      variant="body2"
                      className="text-[var(--myturn-accent)]"
                    >
                      {i + 1}: {slotError.message}
                    </Typography>
                  </Box>
                ) : null;
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* 送信時刻 */}
      <Box className="space-y-1">
        <Box className="flex flex-wrap items-center gap-3">
          <Typography className="min-w-[4.5rem] text-sm font-semibold">
            送信時刻
          </Typography>
          <Box className="flex items-center gap-1">
            <input
              type="number"
              {...register(`${name}.hour`)}
              min={0}
              max={23}
              className={numberInputClass(!!hourError)}
            />
            <Typography className="text-sm">時</Typography>
            <input
              type="number"
              {...register(`${name}.minute`)}
              min={0}
              max={59}
              className={numberInputClass(!!minuteError)}
            />
            <Typography className="text-sm">分</Typography>
          </Box>
        </Box>
        {(hourError?.message || minuteError?.message) && (
          <Typography
            variant="body2"
            className="pl-[5.5rem] text-[var(--myturn-accent)]"
          >
            {hourError?.message || minuteError?.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
