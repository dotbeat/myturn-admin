"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client/react";
import { Box, Button, Typography } from "@mui/material";
import {
  CreateJobPickupFormData,
  createJobPickupSchema,
} from "@/schemas/job-pickup/edit";
import { GetJobPickupPeriodsQuery } from "@/graphql-client";
import { CREATE_JOB_PICKUP_PERIOD } from "@/server/graphql/job-pickup/mutations";
import { GET_JOB_PICKUP_PERIODS } from "@/server/graphql/job-pickup/queries";
import { NotifyFn } from "@/types/job-pickup";
import { toJstDateString } from "@/utils/shared/date";
import TextField from "@/components/common/form/TextField";
import JobSelectDialog from "@/components/job-pickup/JobSelectDialog";

const DAY_MS = 24 * 60 * 60 * 1000;
/** 既存のピックアップが無い場合の請求金額の初期値 */
const DEFAULT_AMOUNT = 30000;

// 開始日は翌日、終了日は開始日から2週間（例: 12/3 開始なら 12/16 終了）
const getDefaultValues = (amount: number): CreateJobPickupFormData => ({
  jobId: 0,
  startDate: toJstDateString(new Date(Date.now() + DAY_MS)),
  endDate: toJstDateString(new Date(Date.now() + 14 * DAY_MS)),
  amount,
});

export default function JobPickupCreateForm({
  onCreated,
  notify,
}: {
  onCreated: () => void;
  notify: NotifyFn;
}) {
  // 請求金額の初期値には直近（開始日が最も新しい）のピックアップ金額を使う
  const { data: latestData, refetch: refetchLatest } =
    useQuery<GetJobPickupPeriodsQuery>(GET_JOB_PICKUP_PERIODS, {
      fetchPolicy: "no-cache",
      variables: { input: { page: 1, limit: 1 } },
    });
  const defaultAmount =
    latestData?.jobPickupPeriods.items[0]?.amount ?? DEFAULT_AMOUNT;

  const methods = useForm<CreateJobPickupFormData>({
    resolver: zodResolver(createJobPickupSchema),
    defaultValues: getDefaultValues(defaultAmount),
  });

  // 既存ピックアップの取得完了後、未編集なら請求金額の初期値を差し替える
  useEffect(() => {
    if (!methods.getFieldState("amount").isDirty) {
      methods.resetField("amount", { defaultValue: defaultAmount });
    }
  }, [defaultAmount, methods]);

  const [jobDialogOpen, setJobDialogOpen] = useState(false);

  const [createPickup, { loading }] = useMutation(CREATE_JOB_PICKUP_PERIOD, {
    onCompleted() {
      notify("ピックアップを追加しました", "success");
      methods.reset(getDefaultValues(defaultAmount));
      refetchLatest();
      onCreated();
    },
    onError(error) {
      notify(error.message || "追加中にエラーが発生しました", "error");
    },
  });

  const onSubmit = (data: CreateJobPickupFormData) => {
    createPickup({ variables: { input: data } });
  };

  return (
    <Box className="mb-8 rounded-lg bg-(--background) px-6 py-6">
      <Typography className="mb-2 font-semibold">
        求人のピックアップを追加する
      </Typography>
      <FormProvider {...methods}>
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box className="flex items-end gap-2">
            <TextField
              name="jobId"
              label="求人ID"
              type="number"
              className="w-28"
            />
            <Button
              type="button"
              variant="outlined"
              onClick={() => setJobDialogOpen(true)}
              className="mb-1.5 shrink-0 rounded-md border border-current px-2 py-1"
            >
              求人選択
            </Button>
          </Box>
          <TextField
            name="startDate"
            label="開始日"
            type="date"
            className="w-44"
          />
          <TextField
            name="endDate"
            label="終了日"
            type="date"
            className="w-44"
          />
          <TextField
            name="amount"
            label="請求金額"
            type="number"
            className="w-40"
          />
          <Button
            type="submit"
            disabled={loading}
            className="rounded-full bg-(--myturn-main) px-4 py-2 text-(--foreground)"
          >
            {loading ? "追加中..." : "追加する"}
          </Button>
        </form>
      </FormProvider>

      {/* ピックアップする求人の選択ダイアログ */}
      <JobSelectDialog
        open={jobDialogOpen}
        onClose={() => setJobDialogOpen(false)}
        onSelect={(jobId) => {
          methods.setValue("jobId", jobId, { shouldValidate: true });
          setJobDialogOpen(false);
        }}
      />
    </Box>
  );
}
