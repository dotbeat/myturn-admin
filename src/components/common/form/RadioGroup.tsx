import { FieldError, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  RadioGroup as MUIRadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import { SelectItem } from "@/types/select";

export default function RadioGroup({
  name,
  label,
  items,
  required,
  disabled = false,
  className = "",
}: {
  name: string;
  label?: string;
  items: SelectItem[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = (() => {
    let errorObj = errors;
    name.split(".").forEach((nameLevel) => {
      errorObj = errorObj != null ? (errorObj[nameLevel] as any) : null;
    });
    return errorObj as Partial<FieldError> | null;
  })();

  const currentValue = watch(name);

  return (
    <FormControl disabled={disabled} className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="inline-block text-sm font-semibold">
          {label}
          {required && <span className="text-[var(--myturn-accent)]"> *</span>}
        </label>
      )}
      <MUIRadioGroup row className="gap-x-2 gap-y-1" value={currentValue || ""}>
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            control={
              <Radio
                {...register(name)}
                value={String(item.value)}
                checked={currentValue === String(item.value)}
                className="p-1 text-[var(--myturn-main)]"
              />
            }
            label={item.label}
            className="-ml-1.5"
          />
        ))}
      </MUIRadioGroup>
      {error?.message && (
        <Typography variant="body2" className="text-[var(--myturn-accent)]">
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
}
