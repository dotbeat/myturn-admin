import { FieldError, useFormContext } from "react-hook-form";
import { Box, FormControl, Typography } from "@mui/material";
import { SelectGroup, SelectItem } from "@/types/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";

export default function Select({
  name,
  label,
  items,
  groups,
  required,
  disabled = false,
  className = "",
}: {
  name: string;
  label?: string;
  required?: boolean;
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
      errorObj = errorObj != null ? (errorObj[nameLevel] as any) : null;
    });
    return errorObj as Partial<FieldError> | null;
  })();
  const inputId = `select-input-${name}`;

  return (
    <FormControl className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="inline-block text-sm font-semibold">
          {label}
          {required && <span className="text-(--myturn-accent)"> *</span>}
        </label>
      )}
      <Box className="relative text-(--myturn-sub-text)">
        <select
          id={inputId}
          {...register(name)}
          disabled={disabled}
          className={`peer w-full appearance-none rounded-md border bg-(--background) py-2.5 pr-7 pl-3 placeholder:text-(--myturn-support-middle) disabled:opacity-60 ${error ? "border-(--myturn-accent) ring-1 ring-(--myturn-accent)" : "border-(--myturn-support-middle) focus:border-(--myturn-main) focus:ring-1 focus:ring-(--myturn-main)"}`}
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
        <Box className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 peer-disabled:opacity-40">
          <ArrowDownNarrowIcon
            size={16}
            className={error ? "text-(--myturn-accent)" : ""}
          />
        </Box>
      </Box>
      {error?.message && (
        <Typography variant="body2" className="text-(--myturn-accent)">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
}
