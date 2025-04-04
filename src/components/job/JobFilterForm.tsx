"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { regionsAndEmpty } from "@/const/region";
import { industriesAndEmpty, jobTypesAndEmpty } from "@/const/job";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function JobFilterForm({
  className = "",
}: {
  className?: string;
}) {
  return (
    <form
      className={`flex flex-col gap-6 rounded-lg bg-[var(--background)] px-4 py-6 ${className}`}
    >
      <FilterGroup heading="基本情報">
        <FilterItem label="タイトル">
          <TextFieldMini name="title" className="w-28" />
        </FilterItem>
        <FilterItem label="都道府県">
          <SelectMini
            name="region"
            groups={regionsAndEmpty("")}
            className="w-28"
          />
        </FilterItem>
        <FilterItem label="企業名">
          <TextFieldMini name="companyName" className="w-28" />
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
        <FilterItem label="職種">
          <SelectMini
            name="jobType"
            items={jobTypesAndEmpty("")}
            className="w-32"
          />
        </FilterItem>
        <FilterItem label="業界">
          <SelectMini
            name="industry"
            items={industriesAndEmpty("")}
            className="w-32"
          />
        </FilterItem>
      </FilterGroup>
      <Stack spacing={1}>
        <FilterItem label="応募数">
          <Box className="flex items-center gap-1">
            <TextFieldMini
              type="number"
              name="acceptCountMin"
              className="w-12"
            />
            <Typography className="text-sm">〜</Typography>
            <TextFieldMini
              type="number"
              name="acceptCountMax"
              className="w-14"
            />
          </Box>
        </FilterItem>
        <FilterItem label="採用数">
          <Box className="flex items-center gap-1">
            <TextFieldMini
              type="number"
              name="acceptCountMin"
              className="w-12"
            />
            <Typography className="text-sm">〜</Typography>
            <TextFieldMini
              type="number"
              name="acceptCountMax"
              className="w-14"
            />
          </Box>
        </FilterItem>
      </Stack>
      <Button
        type="submit"
        className="self-center rounded-full bg-[var(--myturn-background)] px-4 py-2 text-base"
      >
        検索
      </Button>
    </form>
  );
}
