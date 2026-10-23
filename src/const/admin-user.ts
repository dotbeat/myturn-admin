import { SelectItem } from "@/types/select";
import { AdminRole } from "@/graphql-client";

// 管理画面アカウントの権限
export const adminRoleItems: SelectItem<AdminRole>[] = [
  { value: AdminRole.SystemAdmin, label: "システム管理者" },
  { value: AdminRole.Moderator, label: "モデレータ" },
  { value: AdminRole.Viewer, label: "閲覧のみ" },
];

export const getAdminRoleLabel = (role: AdminRole) =>
  adminRoleItems.find((item) => item.value === role)?.label ?? role;
