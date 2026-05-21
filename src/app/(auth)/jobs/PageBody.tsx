"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
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
  Link,
  MenuItem,
  Pagination,
  PaginationItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { periods } from "@/const/date";
import { useJobs } from "@/hooks/useJobs";
import { useJobsStatistics } from "@/hooks/useJobsStatistics";
import { JobFilterFormData, jobFilterFormSchema } from "@/schemas/job/filter";
import { UPDATE_JOB_IS_AGENT_PLAN_ONLY } from "@/server/graphql/job/mutations";
import { JobItem, JobStatus } from "@/types/job";
import {
  convertFormDataToUrlParams,
  ConvertUrlParamEntry,
} from "@/utils/frontend/form";
import { isSameObject } from "@/utils/shared/object";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import RadioGroup from "@/components/common/form/RadioGroup";
import JobFilterForm from "@/components/job/JobFilterForm";
import JobList from "@/components/job/JobList";
import { UpdateJobIsAgentPlanOnlyMutation } from "@/graphql-client";

const agentPlanOnlyItems = [
  { value: "true", label: "はい" },
  { value: "false", label: "いいえ" },
];

const editJobAgentPlanOnlySchema = z.object({
  isAgentPlanOnly: z.string(),
});
type EditJobAgentPlanOnlyFormData = z.infer<typeof editJobAgentPlanOnlySchema>;

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [updateJobIsAgentPlanOnly, { loading: isUpdatingJobAgentPlanOnly }] =
    useMutation<UpdateJobIsAgentPlanOnlyMutation>(
      UPDATE_JOB_IS_AGENT_PLAN_ONLY,
      {
        onCompleted() {
          setToast({
            open: true,
            message: "エージェントプラン設定を更新しました",
            severity: "success",
          });
          setEditingJob(null);
        },
        onError(error) {
          setToast({
            open: true,
            message: error.message || "更新中にエラーが発生しました",
            severity: "error",
          });
        },
      },
    );

  const openAgentPlanDialog = (item: JobItem) => {
    agentPlanEditMethods.reset({
      isAgentPlanOnly: String(item.isAgentPlanOnly),
    });
    setEditingJob(item);
  };

  const onAgentPlanEditSubmit = (data: EditJobAgentPlanOnlyFormData) => {
    if (!editingJob) return;
    updateJobIsAgentPlanOnly({
      variables: {
        input: {
          id: editingJob.id,
          isAgentPlanOnly: data.isAgentPlanOnly === "true",
        },
      },
    });
  };

  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  const initialFormData: JobFilterFormData = {
    title: paramsConverter.toString("title"),
    companyName: paramsConverter.toString("companyName"),
    prefecture: paramsConverter.toString("prefecture"),
    status: paramsConverter.toString("status") as JobStatus | "",
    openDateStart: paramsConverter.toDate("openDateStart"),
    openDateEnd: paramsConverter.toDate("openDateEnd"),
    closeDateStart: paramsConverter.toDate("closeDateStart"),
    closeDateEnd: paramsConverter.toDate("closeDateEnd"),
    jobType: paramsConverter.toString("jobType"),
    industry: paramsConverter.toString("industry"),
    pvCountMin: paramsConverter.toNumber("pvCountMin"),
    pvCountMax: paramsConverter.toNumber("pvCountMax"),
    favoriteCountMin: paramsConverter.toNumber("favoriteCountMin"),
    favoriteCountMax: paramsConverter.toNumber("favoriteCountMax"),
    entryCountMin: paramsConverter.toNumber("entryCountMin"),
    entryCountMax: paramsConverter.toNumber("entryCountMax"),
    acceptCountMin: paramsConverter.toNumber("acceptCountMin"),
    acceptCountMax: paramsConverter.toNumber("acceptCountMax"),
  };
  const methods = useForm<JobFilterFormData>({
    resolver: zodResolver(jobFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const agentPlanEditMethods = useForm<EditJobAgentPlanOnlyFormData>({
    resolver: zodResolver(editJobAgentPlanOnlySchema),
    defaultValues: { isAgentPlanOnly: "false" },
  });

  const { jobs, totalCount, totalPages, loading } = useJobs(
    initialFormData,
    page,
    limit,
  );

  const {
    allJobCount, // 合計求人数
    newPostedCount, // 新規掲載数
    activeCount, // 募集中求人数
    closedCount, // 掲載終了数
    refetchStatistics,
  } = useJobsStatistics("");

  const onSubmit = (data: JobFilterFormData) => {
    const oldParams = new URLSearchParams(window.location.search);
    const newParams = convertFormDataToUrlParams(data);
    if (
      !isSameObject(
        Object.fromEntries(oldParams),
        Object.fromEntries(newParams),
      )
    ) {
      location.search = `${newParams.size ? "?" : ""}${newParams.toString()}`;
    }
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">求人管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem label="合計求人数" count={allJobCount} className="py-4" />
        <IndicateItem
          label="新規掲載数"
          count={newPostedCount}
          className="py-4"
        />
        <IndicateItem
          label="募集中求人数"
          count={activeCount}
          className="py-4"
        />
        <IndicateItem label="掲載終了数" count={closedCount} className="py-4" />
        <PopUp
          id="period-filter"
          className="flex min-w-24 items-center justify-between gap-2 self-start rounded border border-current px-2 py-1"
          menuClass="p-2"
          activator={() => (
            <>
              <Typography className="text-sm">
                {getSelectItem(periods, selectedPeriod)?.label}
              </Typography>
              <ArrowDownNarrowIcon size={16} />
            </>
          )}
        >
          {periods.map((period) => (
            <MenuItem
              key={period.value}
              onClick={() => {
                refetchStatistics(period.value);
                setSelectedPeriod(period.value);
              }}
            >
              {period.label}
            </MenuItem>
          ))}
        </PopUp>
      </Box>
      <Box className="flex items-start gap-4">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6 rounded-lg bg-[var(--background)] px-4 py-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <JobFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <JobList
            items={jobs}
            isLoading={loading}
            onEditAgentPlanOnly={openAgentPlanDialog}
            className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]"
          />
          <Box className="flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={item.page !== page ? Link : Box}
                  {...item}
                  href={(() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (item.page === 1) {
                      newParams.delete("page");
                    } else {
                      newParams.set("page", String(item.page));
                    }
                    return `/jobs${newParams.size ? "?" : ""}${newParams}`;
                  })()}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* エージェントプラン設定編集ダイアログ */}
      <Dialog
        open={editingJob !== null}
        onClose={() => setEditingJob(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          エージェントプラン設定の編集
        </DialogTitle>
        <FormProvider {...agentPlanEditMethods}>
          <form
            onSubmit={agentPlanEditMethods.handleSubmit(onAgentPlanEditSubmit)}
          >
            <DialogContent className="flex flex-col gap-4 pt-4">
              {editingJob && (
                <Typography className="text-[var(--myturn-sub-text)]">
                  求人：{editingJob.title}
                </Typography>
              )}
              <RadioGroup
                name="isAgentPlanOnly"
                label="エージェントプラン専用"
                items={agentPlanOnlyItems}
              />
            </DialogContent>
            <DialogActions className="gap-2 px-6 pb-6">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditingJob(null)}
                className="px-3 py-1"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isUpdatingJobAgentPlanOnly}
                className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
              >
                {isUpdatingJobAgentPlanOnly ? "保存中..." : "保存する"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* トースト通知 */}
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
    </Box>
  );
}
