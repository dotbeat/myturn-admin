import { SelectItem } from "@/types/select";

export function getSelectItem<T = string>(list: SelectItem<T>[], value: T) {
  return list.find((item) => item.value === value);
}
