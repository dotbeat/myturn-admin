import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";

export default function TextFieldMini({
  name,
  type,
  placeholder,
  autoComplete,
  autoFocus = false,
  disabled = false,
  className = "",
  inputClass = "",
  onInput,
}: {
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  inputClass?: string;
  onInput?: () => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box className={`space-y-1 ${className}`}>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        {...register(name)}
        className={`w-full rounded-md border border-[var(--myturn-support-middle)] px-1 py-1 text-xs shadow-sm outline-none placeholder:text-[var(--myturn-support-middle)] ${disabled ? "bg-[var(--myturn-background)]" : ""} ${errors[name] ? "border-[var(--myturn-accent)] ring-1 ring-[var(--myturn-accent)]" : "focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"} ${inputClass}`}
        onInput={onInput}
      />
    </Box>
  );
}
