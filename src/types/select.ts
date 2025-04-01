export type SelectItem<T = string> = {
  value: T;
  label: string;
};

export type SelectGroup<T = string> = {
  label: string;
  items: SelectItem<T>[];
};
