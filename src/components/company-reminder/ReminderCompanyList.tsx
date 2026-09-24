import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { CompanyReminderFilterFormData } from "@/schemas/company-reminder/filter";
import { ReminderCandidateCompany } from "@/types/company-reminder";
import TextFieldMini from "@/components/common/form/TextFieldMini";
import ReminderBadge from "./ReminderBadge";

/**
 * 催促候補の企業一覧
 * 検索条件（企業名・基準超過のみ）は親のFormProvider（CompanyReminderFilterFormData）から取得する
 */
export default function ReminderCompanyList({
  companies,
  selectedCompanyId,
  isLoading,
  onSelect,
  className = "",
}: {
  companies: ReminderCandidateCompany[];
  selectedCompanyId: number | null;
  isLoading: boolean;
  onSelect: (company: ReminderCandidateCompany | null) => void;
  className?: string;
}) {
  const { control, watch } = useFormContext<CompanyReminderFilterFormData>();
  const onlyOverdue = watch("onlyOverdue");

  return (
    <Box className={className}>
      <Typography className="mb-2 font-semibold">催促候補の企業</Typography>
      <TextFieldMini
        name="keyword"
        placeholder="企業名で検索"
        className="mb-1"
        inputClass="px-2 py-1.5 text-sm"
      />
      <Controller
        name="onlyOverdue"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            className="mb-1"
            control={
              <Checkbox
                size="small"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={<span className="text-sm">基準超過のある企業のみ</span>}
          />
        )}
      />
      <Typography className="mb-2 text-xs text-[var(--myturn-sub-text)]">
        {onlyOverdue
          ? "基準超過のある企業（超過件数順）"
          : "未対応の新着応募がある全企業（超過件数順）"}
      </Typography>
      <Box className="divide-y divide-[var(--myturn-border)] rounded-md border border-[var(--myturn-support-middle)]">
        {companies.map((company) => {
          const isSelected = company.id === selectedCompanyId;
          return (
            <Button
              key={company.id}
              onClick={() => onSelect(isSelected ? null : company)}
              className={`flex w-full items-center justify-between gap-2 rounded-none px-3 py-2 text-left text-sm normal-case ${isSelected ? "bg-[var(--myturn-main-opacity)] font-semibold" : "hover:bg-[var(--myturn-background)]"}`}
            >
              <Typography
                title={company.name}
                className="line-clamp-2 text-sm text-[var(--myturn-main-text)]"
              >
                {company.name}
              </Typography>
              <Box className="flex shrink-0 gap-1">
                {company.overdueCount > 0 && (
                  <ReminderBadge variant="warning">
                    超過{company.overdueCount}
                  </ReminderBadge>
                )}
                {company.waitingCount > 0 && (
                  <ReminderBadge variant="neutral">
                    待ち{company.waitingCount}
                  </ReminderBadge>
                )}
              </Box>
            </Button>
          );
        })}
        {isLoading && (
          <Typography className="px-3 py-4 text-center text-sm text-[var(--myturn-sub-text)]">
            読み込み中です
          </Typography>
        )}
        {!isLoading && companies.length === 0 && (
          <Typography className="px-3 py-4 text-center text-sm text-[var(--myturn-sub-text)]">
            該当する企業はありません
          </Typography>
        )}
      </Box>
    </Box>
  );
}
