import { SelectItem } from "@/types/select";

// 企業一覧の並び替え基準(getCompanies APIにおいてorderByが受け付ける値)
export const companyOrderByItems: SelectItem[] = [
  { value: "createdAt", label: "登録日" },
  { value: "jobCount", label: "掲載求人" },
  { value: "entryCount", label: "累計応募" },
  { value: "offerCount", label: "累計内定" },
  { value: "acceptCount", label: "累計採用" },
  { value: "interviewRate", label: "面談率" },
  { value: "offerRate", label: "内定率" },
  { value: "acceptRate", label: "入社決定率" },
];

// 企業一覧の並び順(getCompanies APIにおいてorderDirectionが受け付ける値)
export const companyOrderDirectionItems: SelectItem[] = [
  { value: "ASC", label: "昇順" },
  { value: "DESC", label: "降順" },
];
