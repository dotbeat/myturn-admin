"use client";
import { Box, Button, Typography } from "@mui/material";
import { invoceServicesAndEmpty } from "@/const/invoice";
import FilterGroup from "@/components/common/filter/FilterGroup";
import FilterItem from "@/components/common/filter/FilterItem";
import SelectMini from "@/components/common/form/SelectMini";
import TextFieldMini from "@/components/common/form/TextFieldMini";

export default function InvoiceFilterForm({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <>
      <FilterGroup heading="基本情報">
        <FilterItem label="応募者名">
          <TextFieldMini name="applicantName" className="w-24" />
        </FilterItem>
        <FilterItem label="企業名">
          <TextFieldMini name="companyName" className="w-24" />
        </FilterItem>
      </FilterGroup>
      <FilterGroup heading="登録情報">
        <FilterItem label="入社日">
          <Box>
            <TextFieldMini type="date" name="acceptDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="acceptDateEnd" />
          </Box>
        </FilterItem>
        <FilterItem label="支払日">
          <Box>
            <TextFieldMini type="date" name="paymentLimitDateStart" />
            <Typography className="px-2 text-sm">〜</Typography>
            <TextFieldMini type="date" name="paymentLimitDateEnd" />
          </Box>
        </FilterItem>
      </FilterGroup>
      <FilterItem label="サービス">
        <SelectMini
          name="service"
          items={invoceServicesAndEmpty("")}
          className="w-24"
        />
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
