"use client";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
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
import { GetJobsByOldHotListQuery } from "@/graphql-client";
import {
  OldHotJobEditFormData,
  oldHotJobEditFormSchema,
} from "@/schemas/old-hot-job/edit";
import { UPDATE_OLD_HOT_JOBS } from "@/server/graphql/old-hot-job/mutations";
import { GET_JOBS_BY_OLD_HOT_LIST } from "@/server/graphql/job/queries";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";

type EditingOldHotJobItem = {
  jobId: number;
};

export default function PageBody() {
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

  // 人気求人データ更新
  const [updateOldHotJobs, { loading: isUpdating }] = useMutation(
    UPDATE_OLD_HOT_JOBS,
    {
      onCompleted: () => {
        // 更新成功時のトースト表示
        showToast("記事情報が更新されました", "success");
      },
      onError: (error) => {
        console.error("更新中にエラーが発生しました:", error);
        setError(error.message || "更新中にエラーが発生しました");
        // エラー時のトースト表示
        showToast("更新中にエラーが発生しました", "error");
      },
    },
  );

  const initFormOldHotJobs: OldHotJobEditFormData["oldHotJobs"] = new Array(6)
    .fill(null)
    .map(() => ({ jobId: 0 }));
  const methods = useForm<OldHotJobEditFormData>({
    resolver: zodResolver(oldHotJobEditFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: { oldHotJobs: initFormOldHotJobs },
  });
  const oldHotJobsControl = useFieldArray({
    control: methods.control,
    name: "oldHotJobs",
  });

  // 人気求人データ取得
  useQuery(GET_JOBS_BY_OLD_HOT_LIST, {
    fetchPolicy: "network-only",
    onCompleted: (data: GetJobsByOldHotListQuery) => {
      const oldHotList = data.getJobsByOldHotList.map((job) => ({
        jobId: job.id,
      }));
      initFormOldHotJobs.splice(0, oldHotList.length, ...oldHotList);
      methods.setValue("oldHotJobs", initFormOldHotJobs);
    },
  });

  // フォームデータをGraphQLミューテーションの入力形式に変換する関数
  const convertFormDataToUpdateInput = async (data: OldHotJobEditFormData) => {
    const oldHotJobsInput = await Promise.all(
      data.oldHotJobs.map(async (oldHotJob) => {
        const oldHotJobData: EditingOldHotJobItem = {
          jobId: oldHotJob.jobId,
        };
        return oldHotJobData;
      }),
    );

    // 更新用の入力データを作成
    return { oldHotJobs: oldHotJobsInput };
  };

  const onSubmit = async (data: OldHotJobEditFormData) => {
    try {
      // フォームデータをGraphQLミューテーションの入力形式に変換
      const updateInput = await convertFormDataToUpdateInput(data);
      // 更新ミューテーションを実行
      await updateOldHotJobs({
        variables: { input: updateInput },
      });

      setError(null);
    } catch (err) {
      console.error("人気求人更新中にエラーが発生しました:", err);
      setError(
        err instanceof Error
          ? err.message
          : "人気求人更新中にエラーが発生しました",
      );
    }
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">人気求人管理</PageTitle>

      <FormProvider {...methods}>
        <form
          method="POST"
          className="flex flex-col items-start gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Table className="max-w-64 bg-[var(--background)]">
            <TableHead>
              <TableRow className="text-nowrap border border-[var(--myturn-support-middle)] text-center text-base">
                <TableCell className="p-2"></TableCell>
                <TableCell className="p-2">求人ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {oldHotJobsControl.fields.map((oldHotJob, i) => {
                return (
                  <TableRow
                    key={oldHotJob.id}
                    className="border-x border-b border-[var(--myturn-support-middle)] odd:bg-[var(--myturn-border)]"
                  >
                    <TableCell className="p-2 pl-4">{i + 1}</TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`oldHotJobs.${i}.jobId`}
                        type="number"
                        className="w-32"
                        inputClass="valid:border-[var(--myturn-support-middle)] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {error && (
            <Typography className="text-[var(--myturn-accent)]">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            className="rounded-full bg-[var(--myturn-main)] px-4 py-3 text-[var(--foreground)]"
          >
            {isUpdating ? "更新中..." : "更新する"}
          </Button>
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
