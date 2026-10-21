"use client";
import { useMutation } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { ADMIN_LOGOUT } from "@/server/graphql/admin-user/mutations";
import { useAdminUser } from "@/lib/AdminUserProvider";
import { getAdminRoleLabel } from "@/const/admin-user";
import SideNavigationItem from "./SideNavigationItem";

export default function SideNavigationAccount({
  className = "",
}: {
  className?: string;
}) {
  const { adminUser } = useAdminUser();

  const [logout, { loading }] = useMutation(ADMIN_LOGOUT, {
    onCompleted() {
      window.location.assign("/login");
    },
  });

  if (!adminUser) return null;

  return (
    <Box className={className}>
      <Box className="mb-1 px-4">
        <Typography
          title={adminUser.email}
          className="truncate text-sm font-semibold"
        >
          {adminUser.name || adminUser.email}
        </Typography>
        <Typography className="text-xs opacity-70">
          {getAdminRoleLabel(adminUser.role)}
        </Typography>
      </Box>
      <SideNavigationItem
        label={loading ? "ログアウト中..." : "ログアウト"}
        onClick={() => logout()}
      />
    </Box>
  );
}
