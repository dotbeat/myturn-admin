import { Box } from "@mui/material";

const variantClasses = {
  /** 基準超過 */
  warning: "bg-orange-100 text-[var(--myturn-orange)]",
  /** 基準未満・待ち */
  neutral: "bg-[var(--myturn-background)] text-[var(--myturn-sub-text)]",
  /** 催促済み・同送済み */
  info: "bg-[var(--myturn-main-opacity)] text-[var(--myturn-primary)]",
  /** 送信失敗 */
  danger: "bg-red-100 text-red-600",
} as const;

export default function ReminderBadge({
  variant,
  children,
  className = "",
}: {
  variant: keyof typeof variantClasses;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Box
      component="span"
      className={`inline-block text-nowrap rounded-md px-1.5 py-0.5 text-xs ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Box>
  );
}
