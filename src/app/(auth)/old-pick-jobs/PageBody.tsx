"use client";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GetJobsByOldPickListQuery } from "@/graphql-client";
import {
  OldPickJobEditFormData,
  oldPickJobEditFormSchema,
} from "@/schemas/old-pick-job/edit";
import { UPDATE_OLD_PICK_JOBS } from "@/server/graphql/old-pick-job/mutations";
import { GET_JOBS_BY_OLD_PICK_LIST } from "@/server/graphql/job/queries";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";
import { useAdminUser } from "@/lib/AdminUserProvider";

type EditingOldPickJobItem = {
  jobId: number;
};

export default function PageBody() {
  const { canEdit } = useAdminUser();
  const [error, setError] = useState<string | null>(null);

  // トースト通知の状態
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // トースト通知を閉じる
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // トースト通知を表示
  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning",
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  // 注目の求人データ更新
  const [updateOldPickJobs, { loading: isUpdating }] = useMutation(
    UPDATE_OLD_PICK_JOBS,
    {
      onCompleted: () => {
        // 更新成功時のトースト表示
        showToast("一覧情報が更新されました", "success");
      },
      onError: (error) => {
        console.error("更新中にエラーが発生しました:", error);
        setError(error.message || "更新中にエラーが発生しました");
        // エラー時のトースト表示
        showToast("更新中にエラーが発生しました", "error");
      },
    },
  );

  const initFormOldPickJobs: OldPickJobEditFormData["oldPickJobs"] = new Array(
    18,
  )
    .fill(null)
    .map(() => ({ jobId: 0 }));
  const methods = useForm<OldPickJobEditFormData>({
    resolver: zodResolver(oldPickJobEditFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: { oldPickJobs: initFormOldPickJobs },
  });
  const oldPickJobsControl = useFieldArray({
    control: methods.control,
    name: "oldPickJobs",
  });

  // 注目の求人データ取得
  const { data: oldPickJobsData } = useQuery<GetJobsByOldPickListQuery>(
    GET_JOBS_BY_OLD_PICK_LIST,
    { fetchPolicy: "network-only" },
  );
  // 取得した求人をフォームの初期値に反映する
  useEffect(() => {
    if (!oldPickJobsData) return;
    const oldPickList = oldPickJobsData.getJobsByOldPickList.map((job) => ({
      jobId: job.id,
    }));
    initFormOldPickJobs.splice(0, oldPickList.length, ...oldPickList);
    methods.setValue("oldPickJobs", initFormOldPickJobs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldPickJobsData]);

  // フォームデータをGraphQLミューテーションの入力形式に変換する関数
  const convertFormDataToUpdateInput = async (data: OldPickJobEditFormData) => {
    const oldPickJobsInput = await Promise.all(
      data.oldPickJobs.map(async (oldPickJob) => {
        const oldPickJobData: EditingOldPickJobItem = {
          jobId: oldPickJob.jobId,
        };
        return oldPickJobData;
      }),
    );

    // 更新用の入力データを作成
    return { oldPickJobs: oldPickJobsInput };
  };

  const onSubmit = async (data: OldPickJobEditFormData) => {
    try {
      // フォームデータをGraphQLミューテーションの入力形式に変換
      const updateInput = await convertFormDataToUpdateInput(data);
      // 更新ミューテーションを実行
      await updateOldPickJobs({
        variables: { input: updateInput },
      });

      setError(null);
    } catch (err) {
      console.error("注目の求人更新中にエラーが発生しました:", err);
      setError(
        err instanceof Error
          ? err.message
          : "注目の求人更新中にエラーが発生しました",
      );
    }
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">注目の求人一覧管理</PageTitle>

      <FormProvider {...methods}>
        <form
          method="POST"
          className="flex flex-col items-start gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Table className="max-w-64 bg-(--background)">
            <TableHead>
              <TableRow className="border border-(--myturn-support-middle) text-center text-base text-nowrap">
                <TableCell className="p-2"></TableCell>
                <TableCell className="p-2">求人ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oldPickJobsControl.fields.map((oldPickJob, i) => {
                return (
                  <TableRow
                    key={oldPickJob.id}
                    className="border-x border-b border-(--myturn-support-middle) odd:bg-(--myturn-border)"
                  >
                    <TableCell className="p-2 pl-4">{i + 1}</TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`oldPickJobs.${i}.jobId`}
                        type="number"
                        disabled={!canEdit}
                        className="w-32"
                        inputClass="valid:border-(--myturn-support-middle) [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {error && (
            <Typography className="text-(--myturn-accent)">{error}</Typography>
          )}
          {canEdit && (
            <Button
              type="submit"
              className="rounded-full bg-(--myturn-main) px-4 py-3 text-(--foreground)"
            >
              {isUpdating ? "更新中..." : "更新する"}
            </Button>
          )}
        </form>
      </FormProvider>

      {/* トースト通知 */}
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
