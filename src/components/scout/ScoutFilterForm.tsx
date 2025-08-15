"use client";
import { Box, Button, Typography } from "@mui/material";
import { industriesAndEmpty } from "@/const/job";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

type Props = {
  isLoading: boolean;
};

const scoutStatuses = [
  { value: "", label: "" },
  { value: "PENDING", label: "未承認" },
  { value: "ACCEPTED", label: "承認" },
];

export default function ScoutFilterForm({ isLoading }: Props) {
  return (
    <>
      <FilterGroup heading="スカウト情報">
        <FilterItem label="スカウト日">
          <Box>
            <TextFieldMini type="date" name="scoutDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="scoutDateEnd" />
          </Box>
        </FilterItem>
        <FilterItem label="企業名">
          <TextFieldMini name="companyName" className="w-36" />
        </FilterItem>
        <FilterItem label="求人タイトル">
          <TextFieldMini name="jobTitle" className="w-36" />
        </FilterItem>
      </FilterGroup>
      <FilterItem label="業界">
        <SelectMini
          name="industry"
          items={industriesAndEmpty("")}
          className="w-32"
        />
      </FilterItem>
      <FilterItem label="ステータス">
        <SelectMini name="status" items={scoutStatuses} className="w-24" />
      </FilterItem>
      <Button
        type="submit"
        disabled={isLoading}
        className="self-center rounded-full bg-[var(--myturn-background)] px-4 py-2 text-base disabled:opacity-50"
      >
        検索
      </Button>
    </>
  );
}
