"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Link,
  MenuItem,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { periods } from "@/const/date";
import { useJobs } from "@/hooks/useJobs";
import { useJobsStatistics } from "@/hooks/useJobsStatistics";
import { JobFilterFormData, jobFilterFormSchema } from "@/schemas/job/filter";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import JobFilterForm from "@/components/job/JobFilterForm";
import JobList from "@/components/job/JobList";

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();
  const page = parseInt((searchParams.get("page") as string) || "1", 10);
  const limit = 30;

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const initialFormData: JobFilterFormData = {
    title: "",
    companyName: "",
    prefecture: "",
    status: "",
    openDateStart: null,
    openDateEnd: null,
    closeDateStart: null,
    closeDateEnd: null,
    jobType: "",
    industry: "",
    pvCountMin: 0,
    pvCountMax: 0,
    favoriteCountMin: 0,
    favoriteCountMax: 0,
    entryCountMin: 0,
    entryCountMax: 0,
    acceptCountMin: 0,
    acceptCountMax: 0,
  };
  const methods = useForm<JobFilterFormData>({
    resolver: zodResolver(jobFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const { jobs, totalCount, totalPages, loading, refetchJobs } = useJobs(
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
    refetchJobs(data);
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
                  href={`/jobs${item.page === 1 ? "" : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
