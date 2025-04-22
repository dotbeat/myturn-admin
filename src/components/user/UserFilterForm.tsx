"use client";
import { useState } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography } from "@mui/material";
import { industriesAndEmpty, jobTypesAndEmpty } from "@/const/job";
import { regionsAndEmpty } from "@/const/region";
import {
  availableDaysPerWeeksAndEmpty,
  availableDurationMonthsAndEmpty,
  availableHoursPerWeeksAndEmpty,
  departmentsAndEmpty,
  gendersAndEmpty,
  schoolGradesAndEmpty,
} from "@/const/user";
import {
  UserFilterFormData,
  userFilterFormSchema,
} from "@/schemas/user/filter";
import { SEARCH_USERS } from "@/server/graphql/user/queries";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function UserFilterForm({
  className = "",
  onFetched,
}: {
  className?: string;
  onFetched: (result: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DefaultValues<UserFilterFormData>>({
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
  });

  const methods = useForm<UserFilterFormData>({
    resolver: zodResolver(userFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: formData,
  });

  // 求職者一覧情報を取得
  const { refetch } = useQuery(SEARCH_USERS, {
    variables: { input: formData },
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      setLoading(false);
      onFetched(result.searchUsers);
    },
    onError: () => setLoading(false),
  });

  const onSubmit = (data: UserFilterFormData) => {
    setLoading(true);
    setFormData(data);
    refetch()
      .then((result) => onFetched(result.data.searchUsers))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`flex flex-col gap-6 rounded-lg bg-[var(--background)] px-4 py-6 ${className}`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FilterGroup heading="基本情報">
          <FilterItem label="名前">
            <TextFieldMini name="name" className="w-24" />
          </FilterItem>
          <FilterItem label="性別">
            <SelectMini
              name="gender"
              items={gendersAndEmpty("")}
              className="w-24"
            />
          </FilterItem>
          <FilterItem label="都道府県">
            <SelectMini
              name="prefecture"
              groups={regionsAndEmpty("")}
              className="w-24"
            />
          </FilterItem>
        </FilterGroup>
        <FilterGroup heading="登録情報">
          <FilterItem label="登録日">
            <Box>
              <TextFieldMini type="date" name="registerDateStart" />
              <Typography className="px-2 text-sm">〜</Typography>
              <TextFieldMini type="date" name="registerDateEnd" />
            </Box>
          </FilterItem>
          <FilterItem label="退会日">
            <Box>
              <TextFieldMini type="date" name="leaveDateStart" />
              <Typography className="px-2 text-sm">〜</Typography>
              <TextFieldMini type="date" name="leaveDateEnd" />
            </Box>
          </FilterItem>
        </FilterGroup>
        <FilterGroup heading="学校情報">
          <FilterItem label="大学名">
            <TextFieldMini name="university" className="w-32" />
          </FilterItem>
          <FilterItem label="学部">
            <TextFieldMini name="faculty" className="w-32" />
          </FilterItem>
          <FilterItem label="学科系統">
            <SelectMini
              name="department"
              items={departmentsAndEmpty("")}
              className="w-28"
            />
          </FilterItem>
          <FilterItem label="学年">
            <SelectMini
              name="grade"
              items={schoolGradesAndEmpty("")}
              className="w-28"
            />
          </FilterItem>
        </FilterGroup>
        <FilterGroup heading="勤務条件">
          <Box className="space-y-2">
            <Typography className="flex-1 text-nowrap text-sm">
              週の勤務可能日数
            </Typography>
            <Box className="flex items-center gap-1">
              <SelectMini
                name="availableDaysPerWeekMin"
                items={availableDaysPerWeeksAndEmpty("")}
                className="w-20"
              />
              <Typography className="text-sm">〜</Typography>
              <SelectMini
                name="availableDaysPerWeekMax"
                items={availableDaysPerWeeksAndEmpty("")}
                className="w-20"
              />
            </Box>
          </Box>
          <Box className="space-y-2">
            <Typography className="flex-1 text-nowrap text-sm">
              週の勤務可能時間
            </Typography>
            <Box className="flex items-center gap-1">
              <SelectMini
                name="availableHoursPerWeekMin"
                items={availableHoursPerWeeksAndEmpty("")}
                className="w-20"
              />
              <Typography className="text-sm">〜</Typography>
              <SelectMini
                name="availableHoursPerWeekMax"
                items={availableHoursPerWeeksAndEmpty("")}
                className="w-20"
              />
            </Box>
          </Box>
          <Box className="space-y-2">
            <Typography className="flex-1 text-nowrap text-sm">
              継続可能期間
            </Typography>
            <Box className="flex items-center gap-1">
              <SelectMini
                name="availableDurationMonthsMin"
                items={availableDurationMonthsAndEmpty("")}
                className="w-20"
              />
              <Typography className="text-sm">〜</Typography>
              <SelectMini
                name="availableDurationMonthsMax"
                items={availableDurationMonthsAndEmpty("")}
                className="w-20"
              />
            </Box>
          </Box>
        </FilterGroup>
        <FilterGroup heading="興味関心">
          <Box className="space-y-2">
            <Typography className="flex-1 text-nowrap text-sm">
              興味のある業界
            </Typography>
            <SelectMini
              name="interestedIndustry"
              items={industriesAndEmpty("")}
              className="w-40"
            />
          </Box>
          <Box className="space-y-2">
            <Typography className="flex-1 text-nowrap text-sm">
              興味のある職種
            </Typography>
            <SelectMini
              name="interestedJobType"
              items={jobTypesAndEmpty("")}
              className="w-40"
            />
          </Box>
        </FilterGroup>
        <FilterItem label="応募数">
          <Box className="flex items-center gap-1">
            <TextFieldMini
              type="number"
              name="entryCountMin"
              className="w-12"
            />
            <Typography className="text-sm">〜</Typography>
            <TextFieldMini
              type="number"
              name="entryCountMax"
              className="w-14"
            />
          </Box>
        </FilterItem>
        <Button
          type="submit"
          disabled={loading}
          className="self-center rounded-full bg-[var(--myturn-background)] px-4 py-2 text-base disabled:opacity-50"
        >
          検索
        </Button>
      </form>
    </FormProvider>
  );
}
