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
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function UserFilterForm({ isLoading }: { isLoading: boolean }) {
  return (
    <>
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
          <TextFieldMini type="number" name="entryCountMin" className="w-12" />
          <Typography className="text-sm">〜</Typography>
          <TextFieldMini type="number" name="entryCountMax" className="w-14" />
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
