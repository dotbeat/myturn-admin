import { Button } from "@mui/material";

export default function SideNavigationItem({
  href,
  label,
  className = "",
  onClick,
}: {
  label?: string;
  className?: string;
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
)) {
  return (
    <Button
      className={`w-full justify-start text-nowrap px-4 py-3 text-base font-semibold hover:bg-stone-300/30 ${className}`}
      href={href}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
