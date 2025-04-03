"use client";
import { useState } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Typography } from "@mui/material";
import { periods } from "@/const/date";
import { mockApplicants } from "@/mock/user";
import {
  applicantFilterFormSchema,
  ApplicantFilterFormData,
} from "@/schemas/applicant/filter";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import ApplicantFilterForm from "@/components/applicant/ApplicantFilterForm";
import ApplicantList from "@/components/applicant/ApplicantList";

export default function PageBody() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].value);

  const applicants = mockApplicants;

  const allApplicantCount = 1049; // 合計応募者数
  const pendingCount = 54; // 新着応募
  const reviewingCount = 15; // レビュー中
  const interviewCount = 0; // 面談設定済
  const offeredCount = 2; // 内定
  const acceptedCount = 2; // 入社決定
  const rejectedCount = 915; // 採用見送り

  const searchResultCount = 38; // 検索結果数

  const initForm: DefaultValues<ApplicantFilterFormData> = {
    jobTitle: "",
    companyName: "",
    jobType: "",
    industry: "",
    name: "",
    applyDateStart: null,
    applyDateEnd: null,
    status: "",
  };
  const methods = useForm<ApplicantFilterFormData>({
    resolver: zodResolver(applicantFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initForm,
  });

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">応募者管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem
          label="合計応募数"
          count={allApplicantCount}
          className="py-4"
        />
        <IndicateItem label="新着応募" count={pendingCount} className="py-4" />
        <IndicateItem
          label="レビュー中"
          count={reviewingCount}
          className="py-4"
        />
        <IndicateItem
          label="面談設定済"
          count={interviewCount}
          className="py-4"
        />
        <IndicateItem label="内定" count={offeredCount} className="py-4" />
        <IndicateItem label="入社決定" count={acceptedCount} className="py-4" />
        <IndicateItem
          label="採用見送り"
          count={rejectedCount}
          className="py-4"
        />
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
          <ApplicantFilterForm />
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {searchResultCount} 件
          </Typography>
          <ApplicantList
            items={applicants}
            className="overflow-x-auto rounded-lg bg-[var(--background)]"
          />
        </Box>
      </Box>
    </Box>
  );
}
