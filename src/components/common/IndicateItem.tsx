import { Box, Typography } from "@mui/material";

export default function IndicateItem({
  label,
  count,
  className = "",
}: {
  label: string;
  count: number;
  className?: string;
}) {
  return (
    <Box className={`text-center ${className}`}>
      <Typography className="mb-1 text-nowrap text-[var(--myturn-sub-text)]">
        {label}
      </Typography>
      <Typography className="text-2xl font-semibold">
        {count.toLocaleString("en")}
      </Typography>
    </Box>
  );
}
