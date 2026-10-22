import { Box } from "@mui/material";

const variantClasses = {
  /** 基準超過 */
  warning: "bg-orange-100 text-(--myturn-orange)",
  /** 基準未満・待ち */
  neutral: "bg-(--myturn-background) text-(--myturn-sub-text)",
  /** 催促済み・同送済み */
  info: "bg-(--myturn-main-opacity) text-(--myturn-primary)",
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
      className={`inline-block rounded-md px-1.5 py-0.5 text-xs text-nowrap ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Box>
  );
}
