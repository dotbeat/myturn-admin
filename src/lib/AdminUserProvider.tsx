"use client";

import { createContext, ReactNode, useContext } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { AdminMeQuery, AdminRole } from "@/graphql-client";
import { ADMIN_ME } from "@/server/graphql/admin-user/queries";

export type AdminUser = AdminMeQuery["adminMe"];

type AdminUserContextValue = {
  adminUser: AdminUser | null;
  isLoading: boolean;
  /** 最上位管理者か（管理者アカウント・許可メールアドレスの管理が可能） */
  isSuperAdmin: boolean;
  /** データの更新が可能か（閲覧のみ権限ではない） */
  canEdit: boolean;
};

const AdminUserContext = createContext<AdminUserContextValue>({
  adminUser: null,
  isLoading: true,
  isSuperAdmin: false,
  canEdit: false,
});

export function AdminUserProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 未ログイン時はApolloClientのエラーハンドリングでログイン画面へ遷移する
  const { data, loading } = useQuery<AdminMeQuery>(ADMIN_ME, {
    skip: pathname === "/login",
  });

  const adminUser = data?.adminMe ?? null;
  const role = adminUser?.role;

  return (
    <AdminUserContext.Provider
      value={{
        adminUser,
        isLoading: loading,
        isSuperAdmin: role === AdminRole.SuperAdmin,
        canEdit: role === AdminRole.SuperAdmin || role === AdminRole.Moderator,
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
}

export const useAdminUser = () => useContext(AdminUserContext);
