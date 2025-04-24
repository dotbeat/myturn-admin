"use client";
import { useState } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Typography } from "@mui/material";
import { periods } from "@/const/date";
import { mockJobs } from "@/mock/job";
import { JobFilterFormData, jobFilterFormSchema } from "@/schemas/job/filter";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import JobFilterForm from "@/components/job/JobFilterForm";
import JobList from "@/components/job/JobList";

export default function PageBody() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const jobs = mockJobs;

  const allJobCount = 1049; // 合計求人数
  const activeCount = 478; // 募集中求人数
  const newCount = 26; // 新規掲載数
  const closedCount = 1; // 掲載終了数

  const searchResultCount = 38; // 検索結果数

  const initForm: DefaultValues<JobFilterFormData> = {
    title: "",
    companyName: "",
    prefecture: "",
    openDateStart: null,
    openDateEnd: null,
    jobType: "",
    industry: "",
    status: "",
  };
  const methods = useForm<JobFilterFormData>({
    resolver: zodResolver(jobFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initForm,
  });

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">求人管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem label="合計求人数" count={allJobCount} className="py-4" />
        <IndicateItem
          label="募集中求人数"
          count={activeCount}
          className="py-4"
        />
        <IndicateItem label="新規掲載数" count={newCount} className="py-4" />
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
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </MenuItem>
          ))}
        </PopUp>
      </Box>
      <Box className="flex items-start gap-4">
        <FormProvider {...methods}>
          <JobFilterForm />
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {searchResultCount} 件
          </Typography>
          <JobList
            items={jobs}
            className="overflow-x-auto rounded-lg bg-[var(--background)]"
          />
        </Box>
      </Box>
    </Box>
  );
}
