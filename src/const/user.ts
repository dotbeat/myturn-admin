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
export const schoolDepartments: SelectItem[] = [
  { value: "LAW", label: "法律・政治学系" },
  { value: "ECO", label: "経済・経営・商学学系" },
  { value: "SOC", label: "社会・メディア学系" },
  { value: "INT", label: "国際関係学系" },
  { value: "LIT", label: "文学・人文・心理学系" },
  { value: "LNG", label: "外国語学系" },
  { value: "EDU", label: "教育・福祉学系" },
  { value: "HOM", label: "家政・生活学系" },
  { value: "ART", label: "芸術・表現系" },
  { value: "SPO", label: "健康・スポーツ系" },
  { value: "GEN", label: "教養・総合系" },
  { value: "SCI", label: "理・工学系" },
  { value: "AGR", label: "農・獣・畜産・水産系" },
  { value: "MED", label: "医・歯・薬学系" },
  { value: "NUR", label: "看護・保健・衛生系" },
  { value: "OTH", label: "その他文系" },
  { value: "OTS", label: "その他理系" },
];
export function schoolDepartmentsAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...schoolDepartments];
}

// 学年
export const schoolGrades: SelectItem[] = [
  { value: "FIRST_YEAR", label: "1年生" },
  { value: "SECOND_YEAR", label: "2年生" },
  { value: "THIRD_YEAR", label: "3年生" },
  { value: "FOURTH_YEAR", label: "4年生" },
  { value: "FIFTH_YEAR", label: "5年生" },
  { value: "SIXTH_YEAR", label: "6年生" },
  { value: "MASTER_FIRST_YEAR", label: "修士1年生" },
  { value: "MASTER_SECOND_YEAR", label: "修士2年生" },
  { value: "DOCTOR_FIRST_YEAR", label: "博士1年生" },
  { value: "DOCTOR_SECOND_YEAR", label: "博士2年生" },
  { value: "DOCTOR_THIRD_YEAR", label: "博士3年生" },
  { value: "GRADUATED", label: "既卒" },
  { value: "OTHER", label: "その他" },
];
export function schoolGradesAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...schoolGrades];
}

// 週の勤務可能日数
export const availableDaysPerWeeks: SelectItem<number>[] = [
  { value: 1, label: "週1日" },
  { value: 2, label: "週2日" },
  { value: 3, label: "週3日" },
  { value: 4, label: "週4日" },
  { value: 5, label: "週5日以上" },
];
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
  { value: 1, label: "1か月" },
  { value: 2, label: "2か月" },
  { value: 3, label: "3か月" },
  { value: 4, label: "4か月" },
  { value: 5, label: "5か月" },
  { value: 6, label: "6か月" },
  { value: 7, label: "7か月" },
  { value: 8, label: "8か月" },
  { value: 9, label: "9か月" },
  { value: 10, label: "10か月" },
  { value: 11, label: "11か月" },
  { value: 12, label: "12か月以上" },
];
export function availableDurationMonthsAndEmpty(
  emptyLabel: string,
): SelectItem<number>[] {
  return [{ value: 0, label: emptyLabel }, ...availableDurationMonths];
}
