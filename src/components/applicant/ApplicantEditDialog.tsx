"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  UpdateEntryFormData,
  updateEntrySchema,
} from "@/schemas/applicant/update-entry";
import {
  CreateCompanyInvoicesMutation,
  UpdateEntryMutation,
} from "@/graphql-client";
import { CREATE_COMPANY_INVOICES } from "@/server/graphql/company/mutations";
import { UPDATE_ENTRY } from "@/server/graphql/entry/mutations";
import { ApplicantItem, ApplyStatus } from "@/types/applicant";
import { applyStatuses, applyStatusIndex } from "@/utils/shared/applicant";
import Select from "@/components/common/form/Select";
import TextField from "@/components/common/form/TextField";

// ISO日時 → date入力欄の値(yyyy-MM-dd)
function toDateInputValue(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// date入力欄の値(yyyy-MM-dd) → ISO日時(空ならnull)
function toIsoOrNull(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (isNaN(date.getTime())) return null;
  return date.toISOString();
}

export default function ApplicantEditDialog({
  item,
  onClose,
  onSaved,
}: {
  item: ApplicantItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const methods = useForm<UpdateEntryFormData>({
    resolver: zodResolver(updateEntrySchema),
    defaultValues: {
      status: "PENDING",
      interviewScheduledAt: "",
      secondInterviewScheduledAt: "",
      joinDate: "",
    },
  });

  // 編集対象が変わるたびフォームに反映
  useEffect(() => {
    if (!item) return;
    methods.reset({
      status: item.status,
      interviewScheduledAt: toDateInputValue(item.interviewScheduledAt),
      secondInterviewScheduledAt: toDateInputValue(
        item.secondInterviewScheduledAt,
      ),
      joinDate: toDateInputValue(item.jobOfferScheduledAt),
    });
  }, [item, methods]);

  const [updateEntry, { loading: isUpdating }] =
    useMutation<UpdateEntryMutation>(UPDATE_ENTRY, {
      onCompleted(data) {
        setToast({
          open: true,
          message: "応募情報を更新しました",
          severity: "success",
        });
        if (
          item?.status !== "ACCEPTED" &&
          (data.updateEntry.status as ApplyStatus) === "ACCEPTED"
        ) {
          // 元々別statusだった応募を入社決定に変更した場合のみ、バックグラウンドで請求情報を作成
          createInvoices({
            variables: { entryIds: [data.updateEntry.id] },
          });
        }
        onSaved();
        onClose();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "更新中にエラーが発生しました",
          severity: "error",
        });
      },
    });

  // 請求情報作成ミューテーション
  const [createInvoices] = useMutation<CreateCompanyInvoicesMutation>(
    CREATE_COMPANY_INVOICES,
    {
      onError: (error) => {
        console.error("Failed to create company invoice:", error);
        setToast({
          open: true,
          message: error.message || "請求情報の作成に失敗しました",
          severity: "error",
        });
      },
    },
  );

  const onSubmit = (data: UpdateEntryFormData) => {
    if (!item) return;
    updateEntry({
      variables: {
        input: {
          id: item.id,
          status: data.status,
          interviewScheduledAt: toIsoOrNull(data.interviewScheduledAt),
          secondInterviewScheduledAt: toIsoOrNull(
            data.secondInterviewScheduledAt,
          ),
          jobOfferScheduledAt: toIsoOrNull(data.joinDate),
        },
      },
    });
  };

  return (
    <>
      <Dialog open={item !== null} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle className="pb-0 pt-6 font-semibold">
          応募情報を編集
        </DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent className="flex flex-col items-start gap-4">
              {item && (
                <Box className="mb-2 rounded bg-[var(--background)] text-[var(--myturn-sub-text)]">
                  <Typography>
                    応募者：{item.user.lastName} {item.user.firstName}
                  </Typography>
                  <Typography>企業名：{item.job.company.name}</Typography>
                </Box>
              )}
              <Select
                name="status"
                label="ステータス"
                disabled={item?.status === "ACCEPTED"}
                items={applyStatuses.map((status) => ({
                  value: status,
                  label: applyStatusIndex[status].label,
                }))}
              />
              <TextField
                name="interviewScheduledAt"
                label="1回目面談日"
                type="date"
                className="w-full"
              />
              <TextField
                name="secondInterviewScheduledAt"
                label="2回目面談日"
                type="date"
                className="w-full"
              />
              <TextField
                name="joinDate"
                label="入社予定日"
                type="date"
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
                disabled={isUpdating}
                className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
              >
                {isUpdating ? "保存中..." : "保存する"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* 完了・エラー通知 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
