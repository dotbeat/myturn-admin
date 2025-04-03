"use client";
import { Box, Button, Typography } from "@mui/material";
import { industriesAndEmpty, jobTypesAndEmpty } from "@/const/job";
import { applyStatuses, applyStatusIndex } from "@/utils/shared/applicant";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function ApplicantFilterForm({
  className = "",
}: {
  className?: string;
}) {
  return (
    <form
      className={`flex flex-col gap-6 rounded-lg bg-[var(--background)] px-4 py-6 ${className}`}
    >
      <FilterGroup heading="求人情報">
        <FilterItem label="求人名">
          <TextFieldMini name="jobTitle" className="w-28" />
        </FilterItem>
        <FilterItem label="企業名">
          <TextFieldMini name="companyName" className="w-28" />
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
      <FilterGroup heading="応募情報">
        <FilterItem label="応募者名">
          <TextFieldMini name="name" className="w-24" />
        </FilterItem>
        <FilterItem label="応募日">
          <Box>
            <TextFieldMini type="date" name="applyDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="applyDateEnd" />
          </Box>
        </FilterItem>
        <FilterItem label="ステータス">
          <SelectMini
            name="status"
            items={[
              { value: "", label: "" },
              ...applyStatuses.map((status) => ({
                value: status,
                label: applyStatusIndex[status].label,
              })),
            ]}
            className="w-24"
          />
        </FilterItem>
      </FilterGroup>
      <Button
        type="submit"
        className="self-center rounded-full bg-[var(--myturn-background)] px-4 py-2 text-base"
      >
        検索
      </Button>
    </form>
  );
}
