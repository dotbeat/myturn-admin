import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ReminderTargetCompany } from "@/types/company-reminder";

export default function ReminderConfirmDialog({
  open,
  company,
  templateName,
  subject,
  body,
  selectedCount,
  underThresholdCount,
  isSending,
  onClose,
  onSend,
}: {
  open: boolean;
  company: ReminderTargetCompany | null;
  templateName: string;
  subject: string;
  body: string;
  selectedCount: number;
  underThresholdCount: number;
  isSending: boolean;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="pb-0 pt-6 font-semibold">
        この内容で送信しますか？
      </DialogTitle>
      <DialogContent className="flex flex-col gap-3 pt-4">
        <Box>
          <Typography className="text-xs text-[var(--myturn-sub-text)]">
            送信先
          </Typography>
          <Typography className="text-sm">
            {company?.name}（{company?.email}）
          </Typography>
        </Box>
        <Box>
          <Typography className="text-xs text-[var(--myturn-sub-text)]">
            テンプレート
          </Typography>
          <Typography className="text-sm">{templateName}</Typography>
        </Box>
        <Box>
          <Typography className="text-xs text-[var(--myturn-sub-text)]">
            対象の学生
          </Typography>
          <Typography className="text-sm">{selectedCount}人</Typography>
        </Box>
        {underThresholdCount > 0 && (
          <Typography className="rounded-md bg-[var(--myturn-info-light)] px-3 py-2 text-sm text-[var(--myturn-info)]">
            基準未満の学生が{underThresholdCount}人含まれています。
          </Typography>
        )}
        <Box>
          <Typography className="text-xs text-[var(--myturn-sub-text)]">
            件名
          </Typography>
          <Typography className="text-sm">{subject}</Typography>
        </Box>
        <Box>
          <Typography className="text-xs text-[var(--myturn-sub-text)]">
            本文
          </Typography>
          <Typography className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-[var(--myturn-background)] px-3 py-2 text-sm">
            {body}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className="gap-2 px-6 pb-6">
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          disabled={isSending}
          className="px-3 py-1"
        >
          戻る
        </Button>
        <Button
          type="button"
          onClick={onSend}
          disabled={isSending}
          className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)] disabled:opacity-50"
        >
          {isSending ? "送信中..." : "送信する"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
