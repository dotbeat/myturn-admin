"use client";
import { Box, Button, Typography } from "@mui/material";
import { industriesAndEmpty, jobTypesAndEmpty } from "@/const/job";
import { applyStatuses, applyStatusIndex } from "@/utils/shared/applicant";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function ApplicantFilterForm({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <>
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
            <TextFieldMini type="date" name="entryDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="entryDateEnd" />
          </Box>
        </FilterItem>
        <FilterItem label="ステータス" className="mb-2">
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
        <Box className="mb-2 max-w-36">
          <p className="mb-1 text-sm">1回目面談日</p>
          <TextFieldMini type="date" name="interviewDateStart" />
          <Typography className="px-2 text-sm">〜</Typography>
          <TextFieldMini type="date" name="interviewDateEnd" />
        </Box>
        <Box className="mb-2 max-w-36">
          <p className="mb-1 text-sm">2回目面談日</p>
          <TextFieldMini type="date" name="secondInterviewDateStart" />
          <Typography className="px-2 text-sm">〜</Typography>
          <TextFieldMini type="date" name="secondInterviewDateEnd" />
        </Box>
        <Box className="mb-2 max-w-36">
          <p className="mb-1 text-sm">入社予定日</p>
          <TextFieldMini type="date" name="joinDateStart" />
          <Typography className="px-2 text-sm">〜</Typography>
          <TextFieldMini type="date" name="joinDateEnd" />
        </Box>
        <Box className="max-w-36">
          <p className="mb-1 text-sm">(学生報告)入社予定日</p>
          <TextFieldMini type="date" name="joinDateByApplicantStart" />
          <Typography className="px-2 text-sm">〜</Typography>
          <TextFieldMini type="date" name="joinDateByApplicantEnd" />
        </Box>
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
