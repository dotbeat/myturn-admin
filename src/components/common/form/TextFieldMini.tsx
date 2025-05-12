import { useEffect, useRef } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Box, Tooltip } from "@mui/material";

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
    <Tooltip
      title={error?.message ?? ""}
      arrow
      placement="top-start"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        },
        tooltip: { className: "text-sm p-2" },
      }}
    >
      <Box className={`space-y-1 ${className}`}>
        {/* inputに直接refを付けるとregisterメソッド戻り値のrefと衝突する */}
        <Box ref={beforeInputRef} className="hidden" />
        <input
          id={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          {...register(name)}
          className={`w-full rounded-md border px-1 py-1 text-xs shadow-sm outline-none placeholder:text-[var(--myturn-support-middle)] ${disabled ? "bg-[var(--myturn-background)]" : ""} ${error ? "border-[var(--myturn-accent)] ring-1 ring-[var(--myturn-accent)]" : "border-[var(--myturn-support-middle)] focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"} ${inputClass}`}
          onInput={onInput}
        />
      </Box>
    </Tooltip>
  );
}
