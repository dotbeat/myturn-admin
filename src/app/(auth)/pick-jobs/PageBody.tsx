"use client";
import { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
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
import {
  PickJobWeightFormData,
  pickJobWeightFormSchema,
} from "@/schemas/pick-job/edit";
import {
  UPDATE_PICK_JOB_SCORING_WEIGHTS,
  RECALCULATE_PICK_JOBS,
} from "@/server/graphql/pick-job/mutations";
import {
  GET_PICK_JOB_SCORING_WEIGHTS,
  GET_JOBS_BY_PICK_LIST,
} from "@/server/graphql/pick-job/queries";
import { PICK_JOB_WEIGHT_METADATA } from "@/utils/frontend/hot-job";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";

export default function PageBody() {
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "info" });

  const handleCloseToast = () => setToast({ ...toast, open: false });
  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning",
  ) => setToast({ open: true, message, severity });

  const methods = useForm<PickJobWeightFormData>({
    resolver: zodResolver(pickJobWeightFormSchema),
    mode: "onChange",
    defaultValues: { weights: [] },
  });
  const { fields } = useFieldArray({
    control: methods.control,
    name: "weights",
  });
  const watchedWeights = useWatch({
    control: methods.control,
    name: "weights",
  });
  const totalPercent = (watchedWeights ?? []).reduce(
    (sum, w) => sum + (Number(w?.weight) || 0),
    0,
  );

  const { data: pickJobsData, refetch: refetchPickJobs } = useQuery(
    GET_JOBS_BY_PICK_LIST,
    { fetchPolicy: "network-only" },
  );
  const pickJobs: { id: number; title: string }[] =
    pickJobsData?.getJobsByPickList ?? [];

  useQuery(GET_PICK_JOB_SCORING_WEIGHTS, {
    fetchPolicy: "network-only",
    onCompleted: (data: any) => {
      const sorted = [...data.getPickJobScoringWeights].sort(
        (a: any, b: any) => a.displayOrder - b.displayOrder,
      );
      methods.setValue(
        "weights",
        sorted.map((w: any) => ({
          indicator: w.indicator,
          weight: w.weight,
        })),
      );
    },
  });

  const [updateWeights, { loading: isUpdating }] = useMutation(
    UPDATE_PICK_JOB_SCORING_WEIGHTS,
    {
      onCompleted: () => showToast("重み設定を更新しました", "success"),
      onError: (err) => {
        setError(err.message);
        showToast("更新中にエラーが発生しました", "error");
      },
    },
  );

  const [recalculate, { loading: isRecalculating }] = useMutation(
    RECALCULATE_PICK_JOBS,
    {
      onCompleted: (data: any) => {
        showToast(
          `再計算完了: ${data.recalculatePickJobs.updatedCount}件更新`,
          "success",
        );
        refetchPickJobs();
      },
      onError: (err) => showToast(`再計算エラー: ${err.message}`, "error"),
    },
  );

  const onSubmit = async (data: PickJobWeightFormData) => {
    setError(null);
    await updateWeights({
      variables: {
        input: {
          weights: data.weights.map((w) => ({
            indicator: w.indicator,
            weight: w.weight,
          })),
        },
      },
    });
  };

  const isWeightSumValid = Math.abs(totalPercent - 100) < 0.01;

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-1">注目の求人一覧管理（重み設定）</PageTitle>
      <Typography
        variant="body2"
        className="mb-8 text-[var(--myturn-sub-text)]"
      >
        myturnトップページで表示される注目の求人ランキングのアルゴリズムを管理します。一覧は1時間おきに更新されます。
      </Typography>

      <Box className="flex gap-12">
        <FormProvider {...methods}>
          <form
            method="POST"
            className="w-2xl flex flex-col items-start gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Typography variant="body1" className="font-semibold">
              合計:{" "}
              <span
                className={
                  isWeightSumValid
                    ? "text-[var(--myturn-main)]"
                    : "text-[var(--myturn-accent)]"
                }
              >
                {totalPercent.toFixed(1).replace(".0", "")}%{" "}
                {isWeightSumValid ? "" : "(合計100%にしてください)"}
              </span>
            </Typography>

            <Table className="bg-[var(--background)]">
              <TableHead>
                <TableRow className="text-nowrap border border-[var(--myturn-support-middle)] text-center text-base">
                  <TableCell className="p-2 pl-4">指標名</TableCell>
                  <TableCell className="p-2">重み (%)</TableCell>
                  <TableCell className="p-2 pr-4">説明</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((field, i) => (
                  <TableRow
                    key={field.id}
                    className="border-x border-b border-[var(--myturn-support-middle)] odd:bg-[var(--myturn-border)]"
                  >
                    <TableCell className="p-2 pl-4">
                      {PICK_JOB_WEIGHT_METADATA[field.indicator].label}
                    </TableCell>
                    <TableCell className="p-2">
                      <TextField
                        name={`weights.${i}.weight`}
                        type="number"
                        className="w-24"
                        inputClass="valid:border-[var(--myturn-support-middle)] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      {PICK_JOB_WEIGHT_METADATA[field.indicator].description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {error && (
              <Typography className="text-[var(--myturn-accent)]">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              disabled={isUpdating || !isWeightSumValid}
              className="rounded-full bg-[var(--myturn-main)] px-4 py-3 text-[var(--foreground)] disabled:bg-[var(--myturn-support-middle)]"
            >
              {isUpdating ? "更新中..." : "設定を更新する"}
            </Button>
          </form>
        </FormProvider>

        <Box className="min-w-64 max-w-2xl">
          <Box className="mb-4 flex items-center gap-2">
            <Typography variant="body1" className="font-semibold">
              現在の注目の求人一覧
            </Typography>
            <Typography className="text-sm text-[var(--myturn-sub-text)]">
              (上位30位)
            </Typography>
          </Box>
          {pickJobs.length === 0 ? (
            <Typography
              variant="body2"
              className="mb-4 text-[var(--myturn-sub-text)]"
            >
              設定済みの求人はありません
            </Typography>
          ) : (
            <Table className="mb-4 bg-[var(--background)]">
              <TableHead>
                <TableRow className="border border-[var(--myturn-support-middle)]">
                  <TableCell className="p-2 text-sm">ID</TableCell>
                  <TableCell className="p-2 text-sm">求人タイトル</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pickJobs.map((job) => (
                  <TableRow
                    key={job.id}
                    className="border-x border-b border-[var(--myturn-support-middle)] odd:bg-[var(--myturn-border)]"
                  >
                    <TableCell className="p-2 text-sm">{job.id}</TableCell>
                    <TableCell className="p-2 text-sm">{job.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Button
            type="button"
            disabled={isRecalculating}
            className="rounded-full border border-[var(--myturn-sub-text)] px-4 py-3"
            onClick={() => recalculate()}
          >
            {isRecalculating ? "更新中..." : "今すぐ一覧を更新する"}
          </Button>
        </Box>
      </Box>

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
