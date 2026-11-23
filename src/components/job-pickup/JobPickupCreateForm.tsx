"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { Box, Button, Typography } from "@mui/material";
import {
  CreateJobPickupFormData,
  createJobPickupSchema,
} from "@/schemas/job-pickup/edit";
import { CREATE_JOB_PICKUP_PERIOD } from "@/server/graphql/job-pickup/mutations";
import { NotifyFn } from "@/types/job-pickup";
import { toJstDateString } from "@/utils/shared/date";
import TextField from "@/components/common/form/TextField";

const getDefaultValues = (): CreateJobPickupFormData => ({
  jobId: 0,
  startDate: toJstDateString(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  endDate: "",
  amount: 0,
});

export default function JobPickupCreateForm({
  onCreated,
  notify,
}: {
  onCreated: () => void;
  notify: NotifyFn;
}) {
  const methods = useForm<CreateJobPickupFormData>({
    resolver: zodResolver(createJobPickupSchema),
    defaultValues: getDefaultValues(),
  });

  const [createPickup, { loading }] = useMutation(CREATE_JOB_PICKUP_PERIOD, {
    onCompleted() {
      notify("ピックアップを追加しました", "success");
      methods.reset(getDefaultValues());
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
          <TextField
            name="jobId"
            label="求人ID"
            type="number"
            className="w-28"
          />
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
    </Box>
  );
}
