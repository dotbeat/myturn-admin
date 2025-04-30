import { JobStatus } from "@/types/job";
import { SelectItem } from "@/types/select";
import {
  jobOfferStatusIndex,
  jobStatuses as jobStatusKeys,
} from "@/utils/shared/job";

export const jobStatuses: SelectItem<JobStatus>[] = jobStatusKeys.map(
  (key) => ({
    value: key,
    label: jobOfferStatusIndex[key].label,
  }),
);
export function jobStatusesAndEmpty(
  emptyLabel: string,
): SelectItem<JobStatus | "">[] {
  return [{ value: "", label: emptyLabel }, ...jobStatuses];
}

export const industries: SelectItem[] = [
  "IT",
  "人材",
  "エンタメ/芸能",
  "広告/PR",
  "コンサルティング",
  "教育",
  "不動産/計画",
  "メディア/出版",
  "金融",
  "会計/士業",
  "通信",
  "M&A",
  "メーカー",
  "VC/PE",
  "医療/福祉",
  "流通/小売",
  "商社",
  "交通/インフラ",
  "サービス",
  "飲食",
  "旅行",
].map((period) => ({
  value: period,
  label: period,
}));
export function industriesAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...industries];
}

export const jobTypes: SelectItem[] = [
  "営業",
  "マーケティング",
  "エンジニア",
  "企画",
  "編集/ライター",
  "デザイナー",
  "広報",
  "人事",
  "事務",
  "コンサルタント",
  "秘書",
  "その他",
].map((period) => ({
  value: period,
  label: period,
}));
export function jobTypesAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...jobTypes];
}
