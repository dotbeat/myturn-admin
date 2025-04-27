"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Typography } from "@mui/material";
import { periods } from "@/const/date";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompaniesStatistics } from "@/hooks/useCompaniesStatistics";
import {
  CompanyFilterFormData,
  companyFilterFormSchema,
} from "@/schemas/company/filter";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import CompanyFilterForm from "@/components/company/CompanyFilterForm";
import CompanyList from "@/components/company/CompanyList";

export default function PageBody() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const initialFormData: CompanyFilterFormData = {
    name: "",
    prefecture: "",
    registerDateStart: null,
    registerDateEnd: null,
    leaveDateStart: null,
    leaveDateEnd: null,
    industry: "",
    jobCountMin: 0,
    jobCountMax: 0,
    acceptCountMin: 0,
    acceptCountMax: 0,
  };
  const methods = useForm<CompanyFilterFormData>({
    resolver: zodResolver(companyFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const { companies, totalCount, loading, refetchCompanies } =
    useCompanies(initialFormData);

  const {
    allCompanyCount, // 合計登録者数
    postedCount, // 求人掲載社数
    acceptedCount, // 採用社数
    leavedCount, // 退会社数
    refetchStatistics,
  } = useCompaniesStatistics("");

  const onSubmit = (data: CompanyFilterFormData) => {
    refetchCompanies(data);
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">企業アカウント管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem
          label="合計登録社数"
          count={allCompanyCount}
          className="py-4"
        />
        <IndicateItem
          label="求人掲載社数"
          count={postedCount}
          className="py-4"
        />
        <IndicateItem label="採用社数" count={acceptedCount} className="py-4" />
        <IndicateItem label="退会社数" count={leavedCount} className="py-4" />
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
            <CompanyFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <CompanyList
            items={companies}
            isLoading={loading}
            className="overflow-x-auto rounded-lg bg-[var(--background)]"
          />
        </Box>
      </Box>
    </Box>
  );
}
