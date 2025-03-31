import { useFormContext } from "react-hook-form";
import { Box, FormControl, Typography } from "@mui/material";
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
  const inputId = `select-input-${name}`;

  return (
    <FormControl className={`space-y-1 ${className}`}>
      <Box className="relative text-[var(--myturn-sub-text)]">
        <select
          id={inputId}
          {...register(name)}
          disabled={disabled}
          className="peer w-full appearance-none rounded-md border border-[var(--myturn-support-middle)] bg-[var(--background)] py-0.5 pl-1.5 pr-5 text-sm placeholder:text-[var(--myturn-support-middle)] disabled:opacity-60"
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
        <Box className="absolute right-1.5 top-1/2 -translate-y-1/2 peer-disabled:opacity-40">
          <ArrowDownNarrowIcon size={12} />
        </Box>
      </Box>
      {errors[name] && (
        <Typography variant="body2" className="text-[var(--myturn-accent)]">
          {errors[name]?.message as string}
        </Typography>
      )}
    </FormControl>
  );
}
