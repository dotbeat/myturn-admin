import { Stack, Typography } from "@mui/material";

export default function UserProfileGroup({
  heading,
  children,
  className = "",
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <Typography variant="h2" className="mb-4 text-xl font-semibold">
        {heading}
      </Typography>
      <Stack spacing={2}>{children}</Stack>
    </section>
  );
}
