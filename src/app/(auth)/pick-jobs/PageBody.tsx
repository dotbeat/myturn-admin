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
import { GetJobsByPickListQuery } from "@/graphql-client";
import {
  PickJobEditFormData,
  pickJobEditFormSchema,
} from "@/schemas/pick-job/edit";
import { UPDATE_PICK_JOBS } from "@/server/graphql/pick-job/mutations";
import { GET_JOBS_BY_PICK_LIST } from "@/server/graphql/job/queries";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";

type EditingPickJobItem = {
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

  // 注目の求人データ更新
  const [updatePickJobs, { loading: isUpdating }] = useMutation(
    UPDATE_PICK_JOBS,
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

  const initFormPickJobs: PickJobEditFormData["pickJobs"] = new Array(18)
    .fill(null)
    .map(() => ({ jobId: 0 }));
  const methods = useForm<PickJobEditFormData>({
    resolver: zodResolver(pickJobEditFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: { pickJobs: initFormPickJobs },
  });
  const pickJobsControl = useFieldArray({
    control: methods.control,
    name: "pickJobs",
  });

  // 注目の求人データ取得
  useQuery(GET_JOBS_BY_PICK_LIST, {
    fetchPolicy: "network-only",
    onCompleted: (data: GetJobsByPickListQuery) => {
      const pickList = data.getJobsByPickList.map((job) => ({ jobId: job.id }));
      initFormPickJobs.splice(0, pickList.length, ...pickList);
      methods.setValue("pickJobs", initFormPickJobs);
    },
  });

  // フォームデータをGraphQLミューテーションの入力形式に変換する関数
  const convertFormDataToUpdateInput = async (data: PickJobEditFormData) => {
    const pickJobsInput = await Promise.all(
      data.pickJobs.map(async (pickJob) => {
        const pickJobData: EditingPickJobItem = {
          jobId: pickJob.jobId,
        };
        return pickJobData;
      }),
    );

    // 更新用の入力データを作成
    return { pickJobs: pickJobsInput };
  };

  const onSubmit = async (data: PickJobEditFormData) => {
    try {
      // フォームデータをGraphQLミューテーションの入力形式に変換
      const updateInput = await convertFormDataToUpdateInput(data);
      // 更新ミューテーションを実行
      await updatePickJobs({
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
          <Table className="max-w-64 bg-[var(--background)]">
            <TableHead>
              <TableRow className="text-nowrap border border-[var(--myturn-support-middle)] text-center text-base">
                <TableCell className="p-2"></TableCell>
                <TableCell className="p-2">求人ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pickJobsControl.fields.map((pickJob, i) => {
                return (
                  <TableRow
                    key={pickJob.id}
                    className="border-x border-b border-[var(--myturn-support-middle)] odd:bg-[var(--myturn-border)]"
                  >
                    <TableCell className="p-2 pl-4">{i + 1}</TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`pickJobs.${i}.jobId`}
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
