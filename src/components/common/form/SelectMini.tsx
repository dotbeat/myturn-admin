import { FieldError, useFormContext } from "react-hook-form";
import { Box, FormControl } from "@mui/material";
import { SelectGroup, SelectItem } from "@/types/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";

export default function SelectMini({
  name,
  items,
  groups,
  disabled = false,
  className = "",
}: {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
} & (
  | { items: SelectItem<number | string>[]; groups?: never }
  | { items?: never; groups: SelectGroup<number | string>[] }
)) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = (() => {
    let errorObj = errors;
    name.split(".").forEach((nameLevel) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorObj = errorObj != null ? (errorObj[nameLevel] as any) : null;
    });
    return errorObj as Partial<FieldError> | null;
  })();

  const inputId = `select-input-${name}`;

  return (
    <FormControl className={`space-y-1 ${className}`}>
      <Box className="relative text-(--myturn-sub-text)">
        <select
          id={inputId}
          {...register(name)}
          disabled={disabled}
          className={`peer w-full appearance-none rounded-md border bg-(--background) py-0.5 pr-5 pl-1.5 text-sm placeholder:text-(--myturn-support-middle) disabled:opacity-60 ${error ? "border-(--myturn-accent) ring-1 ring-(--myturn-accent)" : "border-(--myturn-support-middle) focus:border-(--myturn-main) focus:ring-1 focus:ring-(--myturn-main)"}`}
        >
          {groups?.map((group, i) => (
            <optgroup key={i} label={group.label}>
              {group.items.map((item) => (
                <option key={String(item.value)} value={String(item.value)}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
          {items?.map((item) => (
            <option key={String(item.value)} value={String(item.value)}>
              {item.label}
            </option>
          ))}
        </select>
        <Box className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 peer-disabled:opacity-40">
          <ArrowDownNarrowIcon
            size={12}
            className={error ? "text-(--myturn-accent)" : ""}
          />
        </Box>
      </Box>
    </FormControl>
  );
}
