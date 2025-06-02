import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Logo } from "@/icons/logo";
import SideNavigationItem from "./SideNavigationItem";

export default function SideNavigation({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Box
      className={`bg-[var(--myturn-main-text)] px-2 py-4 text-[var(--foreground)] ${className}`}
    >
      <Button
        href="/"
        className="mb-6 flex w-full items-center justify-start gap-1 px-4 py-2"
      >
        <Logo width={109} />
        <Typography className="text-lg font-semibold">管理</Typography>
      </Button>
      <List>
        <ListItem className="p-0">
          <SideNavigationItem href="/" label="ダッシュボード" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/users" label="求職者アカウント" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/companies" label="企業アカウント" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/jobs" label="求人" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/applicants" label="応募者" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/invoices" label="請求" />
        </ListItem>
        <ListItem className="p-0">
          <SideNavigationItem href="/magazine" label="Magazine" />
        </ListItem>
      </List>
    </Box>
  );
}
