"use client";
import { useState } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Typography } from "@mui/material";
import { periods } from "@/const/date";
import { mockCompanies } from "@/mock/company";
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

  const companies = mockCompanies;

  const allCompanyCount = 1349; // 合計登録社数
  const postedCount = 478; // 新規掲載社数
  const acceptedCount = 26; // 採用社数
  const withdrawnCount = 0; // 退会社数

  const searchResultCount = 38; // 検索結果数

  const initForm: DefaultValues<CompanyFilterFormData> = {
    name: "",
    prefecture: "",
    registerDateStart: null,
    registerDateEnd: null,
    leaveDateStart: null,
    leaveDateEnd: null,
    industry: "",
  };
  const methods = useForm<CompanyFilterFormData>({
    resolver: zodResolver(companyFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initForm,
  });

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
          label="新規掲載社数"
          count={postedCount}
          className="py-4"
        />
        <IndicateItem label="採用社数" count={acceptedCount} className="py-4" />
        <IndicateItem
          label="退会社数"
          count={withdrawnCount}
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
          <CompanyFilterForm />
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {searchResultCount} 件
          </Typography>
          <CompanyList
            items={companies}
            className="overflow-x-auto rounded-lg bg-[var(--background)]"
          />
        </Box>
      </Box>
    </Box>
  );
}
