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
import { useScouts } from "@/hooks/useScouts";
import { useScoutsStatistics } from "@/hooks/useScoutsStatistics";
import {
  ScoutFilterFormData,
  scoutFilterFormSchema,
} from "@/schemas/scout/filter";
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
import ScoutFilterForm from "@/components/scout/ScoutFilterForm";
import ScoutList from "@/components/scout/ScoutList";

export default function PageBody() {
  const searchParams = useSearchParams();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  const initialFormData: ScoutFilterFormData = {
    scoutDateStart: paramsConverter.toString("scoutDateStart"),
    scoutDateEnd: paramsConverter.toString("scoutDateEnd"),
    companyName: paramsConverter.toString("companyName"),
    jobTitle: paramsConverter.toString("jobTitle"),
    industry: paramsConverter.toString("industry"),
    status: paramsConverter.toString("status"),
  };

  const methods = useForm<ScoutFilterFormData>({
    resolver: zodResolver(scoutFilterFormSchema),
    mode: "onChange",
    defaultValues: initialFormData,
  });

  const { scouts, totalCount, totalPages, loading } = useScouts(
    initialFormData,
    page,
    limit,
  );

  const {
    totalScoutCount,
    acceptedCount,
    refetchStatistics,
  } = useScoutsStatistics(selectedPeriod);

  const onSubmit = (data: ScoutFilterFormData) => {
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
      <PageTitle className="mb-8">スカウト管理</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem
          label="現状のスカウト数"
          count={totalScoutCount}
          className="py-4"
        />
        <IndicateItem
          label="承認数"
          count={acceptedCount}
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
            className="flex flex-col gap-4 rounded-lg bg-[var(--background)] px-4 py-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <ScoutFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <ScoutList
            items={scouts}
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
                    return `/scouts${newParams.size ? "?" : ""}${newParams}`;
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