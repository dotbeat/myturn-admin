import { SelectItem } from "@/types/select";

export const genders: SelectItem[] = [
  { value: "MALE", label: "男性" },
  { value: "FEMALE", label: "女性" },
  { value: "OTHER", label: "その他" },
];
export function gendersAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...genders];
}

// 学科系統
export const departments: SelectItem[] = [
  { value: "A", label: "人文科学" },
  { value: "C", label: "社会科学" },
  { value: "E", label: "理学" },
  { value: "G", label: "工学" },
  { value: "K", label: "農学" },
  { value: "M", label: "保健" },
  { value: "P", label: "商船" },
  { value: "Q", label: "家政" },
  { value: "S", label: "教育" },
  { value: "V", label: "芸術" },
  { value: "X", label: "その他" },
];
export function departmentsAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...departments];
}

// 学年
export const schoolGrades: SelectItem[] = [
  { value: "FIRST_YEAR", label: "1年生" },
  { value: "SECOND_YEAR", label: "2年生" },
  { value: "THIRD_YEAR", label: "3年生" },
  { value: "FOURTH_YEAR", label: "4年生" },
];
export function schoolGradesAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...schoolGrades];
}

// 週の勤務可能日数
export const availableDaysPerWeeks: SelectItem<number>[] = (() => {
  return new Array(7).fill(0).map((v, i) => ({
    value: i + 1,
    label: `週${i + 1}日`,
  }));
})();
export function availableDaysPerWeeksAndEmpty(
  emptyLabel: string,
): SelectItem<number>[] {
  return [{ value: 0, label: emptyLabel }, ...availableDaysPerWeeks];
}

// 週の勤務可能時間
export const availableHoursPerWeeks: SelectItem<number>[] = (() => {
  return new Array(40).fill(0).map((v, i) => ({
    value: i + 1,
    label: `週${i + 1}時間`,
  }));
})();
export function availableHoursPerWeeksAndEmpty(
  emptyLabel: string,
): SelectItem<number>[] {
  return [{ value: 0, label: emptyLabel }, ...availableHoursPerWeeks];
}

// 継続可能期間
export const availableDurationMonths: SelectItem<number>[] = [
  { value: 1, label: "1ヶ月以上" },
  { value: 2, label: "2ヶ月以上" },
  { value: 3, label: "3ヶ月以上" },
  { value: 4, label: "4ヶ月以上" },
  { value: 5, label: "5ヶ月以上" },
  { value: 6, label: "6ヶ月以上" },
  { value: 9, label: "9ヶ月以上" },
  { value: 12, label: "1年以上" },
  { value: 18, label: "1年半以上" },
  { value: 24, label: "2年以上" },
  { value: 30, label: "2年半以上" },
  { value: 36, label: "3年以上" },
  { value: 42, label: "3年半以上" },
];
export function availableDurationMonthsAndEmpty(
  emptyLabel: string,
): SelectItem<number>[] {
  return [{ value: 0, label: emptyLabel }, ...availableDurationMonths];
}
