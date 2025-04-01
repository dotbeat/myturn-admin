"use client";
import { useState } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Typography } from "@mui/material";
import { periods } from "@/const/date";
import { mockUsers } from "@/mock/user";
import {
  UserFilterFormData,
  userFilterFormSchema,
} from "@/schemas/user/filter";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import UserFilterForm from "@/components/user/UserFilterForm";
import UserList from "@/components/user/UserList";

export default function PageBody() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].value);

  const users = mockUsers;

  const allUserCount = 1349; // 合計登録者数
  const appliedCount = 478; // 応募者数
  const acceptedCount = 26; // 採用者数
  const withdrawnCount = 0; // 退会者数

  const searchResultCount = 38; // 検索結果数

  const initForm: DefaultValues<UserFilterFormData> = {
    gender: "",
    region: "",
    registerDateStart: null,
    registerDateEnd: null,
    university: "",
    faculty: "",
    department: "",
    grade: "",
    availableDaysPerWeekMin: 0,
    availableDaysPerWeekMax: 0,
    availableHoursPerWeekMin: 0,
    availableHoursPerWeekMax: 0,
    availableDurationMonthsMin: "",
    availableDurationMonthsMax: "",
    interestedIndustry: "",
    interestedJobType: "",
  };
  const methods = useForm<UserFilterFormData>({
    resolver: zodResolver(userFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initForm,
  });

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">ダッシュボード</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem
          label="合計登録者数"
          count={allUserCount}
          className="py-4"
        />
        <IndicateItem label="応募者数" count={appliedCount} className="py-4" />
        <IndicateItem label="採用者数" count={acceptedCount} className="py-4" />
        <IndicateItem
          label="退会者数"
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
          <UserFilterForm />
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {searchResultCount} 件
          </Typography>
          <UserList
            items={users}
            className="overflow-x-auto rounded-lg bg-[var(--background)]"
          />
        </Box>
      </Box>
    </Box>
  );
}
