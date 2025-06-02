import { SelectItem } from "@/types/select";

export const invoceServices: SelectItem[] = [
  { value: "TECHNICAL", label: "技術職" },
  { value: "GENERAL", label: "総合職" },
];
export function invoceServicesAndEmpty(emptyLabel: string): SelectItem[] {
  return [{ value: "", label: emptyLabel }, ...invoceServices];
}
