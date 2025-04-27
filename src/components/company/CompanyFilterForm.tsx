"use client";
import { Box, Button, Typography } from "@mui/material";
import { regionsAndEmpty } from "@/const/region";
import { industriesAndEmpty } from "@/const/job";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function CompanyFilterForm({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <>
      <FilterGroup heading="基本情報">
        <FilterItem label="名前">
          <TextFieldMini name="name" className="w-24" />
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
      <FilterItem label="業界">
        <SelectMini
          name="industry"
          items={industriesAndEmpty("")}
          className="w-32"
        />
      </FilterItem>
      <FilterItem label="掲載数">
        <Box className="flex items-center gap-1">
          <TextFieldMini type="number" name="jobCountMin" className="w-12" />
          <Typography className="text-sm">〜</Typography>
          <TextFieldMini type="number" name="jobCountMax" className="w-14" />
        </Box>
      </FilterItem>
      <FilterItem label="採用数">
        <Box className="flex items-center gap-1">
          <TextFieldMini type="number" name="acceptCountMin" className="w-12" />
          <Typography className="text-sm">〜</Typography>
          <TextFieldMini type="number" name="acceptCountMax" className="w-14" />
        </Box>
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
