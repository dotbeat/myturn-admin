import { Typography } from "@mui/material";

export default function PageTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Typography variant="h1" className={`text-lg font-semibold ${className}`}>
      {children}
    </Typography>
  );
}
