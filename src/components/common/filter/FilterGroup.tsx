import { Box, Stack, Typography } from "@mui/material";

export default function FilterGroup({
  heading,
  children,
  className = "",
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Box className={className}>
      <Typography className="mb-1 font-semibold">{heading}</Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
}
