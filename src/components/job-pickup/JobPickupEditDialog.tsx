"use client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  UpdateJobPickupFormData,
  updateJobPickupSchema,
} from "@/schemas/job-pickup/edit";
import { UPDATE_JOB_PICKUP_PERIOD } from "@/server/graphql/job-pickup/mutations";
import { JobPickup, NotifyFn } from "@/types/job-pickup";
import TextField from "@/components/common/form/TextField";

export default function JobPickupEditDialog({
  pickup,
  onClose,
  onUpdated,
  notify,
}: {
  /** 編集対象（nullならダイアログを閉じる） */
  pickup: JobPickup | null;
  onClose: () => void;
  onUpdated: () => void;
  notify: NotifyFn;
}) {
  const methods = useForm<UpdateJobPickupFormData>({
    resolver: zodResolver(updateJobPickupSchema),
  });

  useEffect(() => {
    if (pickup) {
      methods.reset({
        startDate: pickup.startDate,
        endDate: pickup.endDate,
        amount: pickup.amount,
      });
    }
  }, [pickup, methods]);

  const [updatePickup, { loading }] = useMutation(UPDATE_JOB_PICKUP_PERIOD, {
    onCompleted() {
      notify("ピックアップを更新しました", "success");
      onUpdated();
    },
    onError(error) {
      notify(error.message || "更新中にエラーが発生しました", "error");
    },
  });

  const onSubmit = (data: UpdateJobPickupFormData) => {
    if (!pickup) return;
    updatePickup({ variables: { input: { id: pickup.id, ...data } } });
  };

  return (
    <Dialog open={pickup !== null} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="pt-6 pb-0 font-semibold">
        ピックアップを編集
      </DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent className="flex flex-col gap-4">
            {pickup && (
              <Box className="mb-2 rounded-sm bg-(--background) text-(--myturn-sub-text)">
                <Typography>求人：{pickup.jobTitle}</Typography>
                <Typography>企業名：{pickup.companyName}</Typography>
              </Box>
            )}
            <TextField
              name="startDate"
              label="開始日"
              type="date"
              className="w-full"
            />
            <TextField
              name="endDate"
              label="終了日"
              type="date"
              className="w-full"
            />
            <TextField
              name="amount"
              label="請求金額"
              type="number"
              className="w-full"
            />
          </DialogContent>
          <DialogActions className="gap-2 px-6 pb-6">
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              className="px-3 py-1"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-(--myturn-main) px-4 py-2 text-(--foreground)"
            >
              {loading ? "保存中..." : "保存する"}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
