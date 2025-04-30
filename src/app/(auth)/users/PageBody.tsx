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
import { useUsers } from "@/hooks/useUsers";
import { useUsersStatistics } from "@/hooks/useUsersStatistics";
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
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();
  const page = parseInt((searchParams.get("page") as string) || "1", 10);
  const limit = 30;

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const initialFormData: UserFilterFormData = {
    name: "",
    gender: "",
    prefecture: "",
    registerDateStart: null,
    registerDateEnd: null,
    leaveDateStart: null,
    leaveDateEnd: null,
    university: "",
    faculty: "",
    department: "",
    grade: "",
    availableDaysPerWeekMin: 0,
    availableDaysPerWeekMax: 0,
    availableHoursPerWeekMin: 0,
    availableHoursPerWeekMax: 0,
    availableDurationMonthsMin: 0,
    availableDurationMonthsMax: 0,
    interestedIndustry: "",
    interestedJobType: "",
    entryCountMin: 0,
    entryCountMax: 0,
  };

  const methods = useForm<UserFilterFormData>({
    resolver: zodResolver(userFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const { users, totalCount, totalPages, loading, refetchUsers } = useUsers(
    initialFormData,
    page,
    limit,
  );

  const {
    allUserCount, // 合計登録者数
    applicantCount, // 応募者数
    acceptedCount, // 採用者数
    leavedCount, // 退会者数
    refetchStatistics,
  } = useUsersStatistics("");

  const onSubmit = (data: UserFilterFormData) => {
    refetchUsers(data);
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">求職者アカウント管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem
          label="合計登録者数"
          count={allUserCount}
          className="py-4"
        />
        <IndicateItem
          label="応募者数"
          count={applicantCount}
          className="py-4"
        />
        <IndicateItem label="採用者数" count={acceptedCount} className="py-4" />
        <IndicateItem label="退会者数" count={leavedCount} className="py-4" />
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
            <UserFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <UserList
            items={users}
            isLoading={loading}
            className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]"
          />
          <Box className="flex justify-center">
            <Pagination
              count={totalPages}
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={item.page !== page ? Link : Box}
                  href={`/companies${item.page === 1 ? "" : `?page=${item.page}`}`}
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
