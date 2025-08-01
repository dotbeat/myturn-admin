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
import { useApplicants } from "@/hooks/useApplicants";
import { useApplicantsStatistics } from "@/hooks/useApplicantsStatistics";
import {
  applicantFilterFormSchema,
  ApplicantFilterFormData,
} from "@/schemas/applicant/filter";
import { ApplyStatus } from "@/types/applicant";
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
import ApplicantFilterForm from "@/components/applicant/ApplicantFilterForm";
import ApplicantList from "@/components/applicant/ApplicantList";

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  const initialFormData: ApplicantFilterFormData = {
    jobTitle: paramsConverter.toString("jobTitle"),
    companyName: paramsConverter.toString("companyName"),
    jobType: paramsConverter.toString("jobType"),
    industry: paramsConverter.toString("industry"),
    name: paramsConverter.toString("name"),
    entryDateStart: paramsConverter.toDate("entryDateStart"),
    entryDateEnd: paramsConverter.toDate("entryDateEnd"),
    status: paramsConverter.toString("status") as ApplyStatus | "",
  };
  const methods = useForm<ApplicantFilterFormData>({
    resolver: zodResolver(applicantFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const { applicants, totalCount, totalPages, loading } = useApplicants(
    initialFormData,
    page,
    limit,
  );

  const {
    allApplicantCount, // 合計応募者数
    pendingCount, // 新着応募
    reviewingCount, // レビュー中
    interviewCount, // 面談設定済
    secondInterviewScheduledCount, // 二次面談設定済み
    offeredCount, // 内定
    acceptedCount, // 入社決定
    rejectedCount, // 採用見送り
    refetchStatistics,
  } = useApplicantsStatistics("");

  const onSubmit = (data: ApplicantFilterFormData) => {
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
        <IndicateItem
          label="二次面談設定済み"
          count={secondInterviewScheduledCount}
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
              onClick={() => {
                setSelectedPeriod(period.value);
                refetchStatistics(period.value);
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
            <ApplicantFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <ApplicantList
            items={applicants}
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
                  {...item}
                  href={(() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (item.page === 1) {
                      newParams.delete("page");
                    } else {
                      newParams.set("page", String(item.page));
                    }
                    return `/applicants${newParams.size ? "?" : ""}${newParams}`;
                  })()}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
