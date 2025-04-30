"use client";
import { Box, Button, Typography } from "@mui/material";
import { regionsAndEmpty } from "@/const/region";
import {
  industriesAndEmpty,
  jobStatusesAndEmpty,
  jobTypesAndEmpty,
} from "@/const/job";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function JobFilterForm({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <FilterGroup heading="基本情報">
        <FilterItem label="タイトル">
          <TextFieldMini name="title" className="w-28" />
        </FilterItem>
        <FilterItem label="企業名">
          <TextFieldMini name="companyName" className="w-28" />
        </FilterItem>
        <FilterItem label="都道府県">
          <SelectMini
            name="prefecture"
            groups={regionsAndEmpty("")}
            className="w-28"
          />
        </FilterItem>
        <FilterItem label="募集状況">
          <SelectMini
            name="status"
            items={jobStatusesAndEmpty("")}
            className="w-28"
          />
        </FilterItem>
      </FilterGroup>
      <FilterGroup heading="登録情報">
        <FilterItem label="公開日">
          <Box>
            <TextFieldMini type="date" name="openDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="openDateEnd" />
          </Box>
        </FilterItem>
        <FilterItem label="終了日">
          <Box>
            <TextFieldMini type="date" name="closeDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="closeDateEnd" />
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
      <FilterGroup heading="採用情報">
        <FilterItem label="PV数">
          <Box className="flex items-center gap-1">
            <TextFieldMini type="number" name="pvCountMin" className="w-12" />
            <Typography className="text-sm">〜</Typography>
            <TextFieldMini type="number" name="pvCountMax" className="w-14" />
          </Box>
        </FilterItem>
        <FilterItem label="❤️">
          <Box className="flex items-center gap-1">
            <TextFieldMini
              type="number"
              name="favoriteCountMin"
              className="w-12"
            />
            <Typography className="text-sm">〜</Typography>
            <TextFieldMini
              type="number"
              name="favoriteCountMax"
              className="w-14"
            />
          </Box>
        </FilterItem>
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
      </FilterGroup>
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
