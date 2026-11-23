"use client";
import { useMutation } from "@apollo/client/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DELETE_JOB_PICKUP_PERIOD } from "@/server/graphql/job-pickup/mutations";
import { JobPickup, NotifyFn } from "@/types/job-pickup";

export default function JobPickupDeleteDialog({
  pickup,
  onClose,
  onDeleted,
  notify,
}: {
  /** 削除対象（nullならダイアログを閉じる） */
  pickup: JobPickup | null;
  onClose: () => void;
  onDeleted: () => void;
  notify: NotifyFn;
}) {
  const [deletePickup, { loading }] = useMutation(DELETE_JOB_PICKUP_PERIOD, {
    onCompleted() {
      notify("ピックアップを削除しました", "success");
      onDeleted();
    },
    onError(error) {
      notify(error.message || "削除中にエラーが発生しました", "error");
    },
  });

  return (
    <Dialog open={pickup !== null} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="pt-6 pb-0 font-semibold">
        ピックアップを削除しますか？
      </DialogTitle>
      <DialogContent className="pt-4">
        {pickup && (
          <Typography>
            <span className="font-semibold">{pickup.jobTitle}</span>
            のピックアップ（{pickup.startDate.replaceAll("-", "/")}〜
            {pickup.endDate.replaceAll("-", "/")}・
            {pickup.amount.toLocaleString()}
            円）を削除します。この操作は取り消せません。
          </Typography>
        )}
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
          type="button"
          disabled={loading}
          className="rounded-full border border-red-500 px-4 py-2 text-red-500"
          onClick={() => {
            if (!pickup) return;
            deletePickup({ variables: { input: { id: pickup.id } } });
          }}
        >
          {loading ? "削除中..." : "削除する"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
