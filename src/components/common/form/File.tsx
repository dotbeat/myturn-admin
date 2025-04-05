"use client";
import { Box, Button, Typography } from "@mui/material";
import { handleFileChange } from "@/utils/frontend/file";
import { FieldError, useFormContext } from "react-hook-form";

export default function File({
  name,
  accept,
  className = "",
  buttonClass = "",
  children,
  onChangeFiles,
}: {
  name: string;
  accept?: string;
  className?: string;
  buttonClass?: string;
  children: React.ReactNode;
  onChangeFiles?: ({
    file,
    files,
  }: {
    file: File | null;
    files: File[];
  }) => void;
}) {
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

  return (
    <Box className={`space-y-1 ${className}`}>
      <Button
        component="label"
        variant="text"
        color="inherit"
        className={buttonClass}
      >
        {children}
        <input
          type="file"
          {...register(name)}
          accept={accept}
          className="sr-only"
          onChange={(e) =>
            handleFileChange(e, ({ file, files }) => {
              onChangeFiles?.({ file, files });
            })
          }
        />
      </Button>
      {error?.message && (
        <Typography variant="body2" className="text-[var(--myturn-accent)]">
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
