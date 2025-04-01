import { Box, Typography } from "@mui/material";

export default function FilterItem({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Box className={`flex items-center gap-2 ${className}`}>
      <Typography className="flex-1 text-nowrap text-sm">{label}</Typography>
      {children}
    </Box>
  );
}
