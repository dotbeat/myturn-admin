"use client";
import { Box, Button, Typography } from "@mui/material";
import { handleFileChange } from "@/utils/frontend/file";
import { useFormContext } from "react-hook-form";

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
      {errors[name] && (
        <Typography variant="body2" className="text-[var(--myturn-accent)]">
          {errors[name]?.message as string}
        </Typography>
      )}
    </Box>
  );
}
