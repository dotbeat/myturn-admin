import { Box, Typography } from "@mui/material";

export default function UserProfileItem({
  headline,
  className = "",
  children,
}: {
  headline: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Box className={`[word-break:break-word] ${className}`}>
      <Typography className="mb-1 text-lg font-semibold text-[var(--myturn-sub-text)]">
        {headline}
      </Typography>
      {children}
    </Box>
  );
}
