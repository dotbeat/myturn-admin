import { useEffect, useRef } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";

export default function TextField({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  rows,
  autoFocus = false,
  required = false,
  disabled = false,
  className = "",
  inputClass = "",
  onInput,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClass?: string;
  onInput?: () => void;
} & ({ type?: never; rows: number } | { type?: string; rows?: never })) {
  const beforeInputRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (type === "number") {
      const inputElem = beforeInputRef.current
        ?.nextElementSibling as HTMLInputElement;
      if (inputElem.value === "0") {
        inputElem.value = "";
      }
    }
  }, []);

  return (
    <Box className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="inline-block text-sm font-semibold">
          {label}
        </label>
      )}
      {/* inputに直接refを付けるとregisterメソッド戻り値のrefと衝突する */}
      <Box ref={beforeInputRef} className="hidden" />
      <Box
        component={rows ? "textarea" : "input"}
        id={name}
        type={type}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        disabled={disabled}
        {...register(name)}
        className={`w-full rounded-md border px-3 py-2.5 shadow-sm outline-none placeholder:text-[var(--myturn-support-middle)] ${disabled ? "bg-[var(--myturn-background)]" : ""} ${error ? "border-[var(--myturn-accent)] ring-1 ring-[var(--myturn-accent)]" : "border-[var(--myturn-support-middle)] focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"} ${inputClass}`}
        onInput={onInput}
      />
      {error?.message && (
        <Typography variant="body2" className="text-[var(--myturn-accent)]">
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
