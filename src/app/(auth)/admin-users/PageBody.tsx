"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GetAdminUsersQuery } from "@/graphql-client";
import { GET_ADMIN_USERS } from "@/server/graphql/admin-user/queries";
import {
  DELETE_ADMIN_USER,
  UPDATE_ADMIN_USER_ROLE,
} from "@/server/graphql/admin-user/mutations";
import {
  UpdateRoleFormData,
  updateRoleSchema,
} from "@/schemas/admin-user/update-role";
import { adminRoleItems, getAdminRoleLabel } from "@/const/admin-user";
import { useAdminUser } from "@/lib/AdminUserProvider";
import PageTitle from "@/components/common/PageTitle";
import Avatar from "@/components/common/Avatar";
import Select from "@/components/common/form/Select";

type AdminUserItem = GetAdminUsersQuery["getAdminUsers"][number];

const headCellClass = "p-2 text-base text-[var(--myturn-sub-text)]";

export default function PageBody() {
  const { adminUser: me, isSuperAdmin } = useAdminUser();
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { data, loading, refetch } = useQuery<GetAdminUsersQuery>(
    GET_ADMIN_USERS,
    { fetchPolicy: "no-cache" },
  );
  const adminUsers = data?.getAdminUsers ?? [];

  // ---- 権限変更 ----
  const [editingAdminUser, setEditingAdminUser] =
    useState<AdminUserItem | null>(null);
  const roleMethods = useForm<UpdateRoleFormData>({
    resolver: zodResolver(updateRoleSchema),
  });

  const [updateRole, { loading: isUpdating }] = useMutation(
    UPDATE_ADMIN_USER_ROLE,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "権限を変更しました",
          severity: "success",
        });
        setEditingAdminUser(null);
        refetch();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "権限の変更中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  const openRoleDialog = (adminUser: AdminUserItem) => {
    roleMethods.reset({ role: adminUser.role });
    setEditingAdminUser(adminUser);
  };

  const onRoleSubmit = (formData: UpdateRoleFormData) => {
    if (!editingAdminUser) return;
    updateRole({
      variables: { input: { id: editingAdminUser.id, role: formData.role } },
    });
  };

  // ---- アカウント削除 ----
  const [deletingAdminUser, setDeletingAdminUser] =
    useState<AdminUserItem | null>(null);

  const [deleteAdminUser, { loading: isDeleting }] = useMutation(
    DELETE_ADMIN_USER,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "管理者アカウントを削除しました",
          severity: "success",
        });
        setDeletingAdminUser(null);
        refetch();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "削除中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  return (
    <Box className="flex-1 px-8 py-6">
      <Box className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <PageTitle>管理者アカウント</PageTitle>
        {isSuperAdmin && (
          <Button
            href="/allowed-emails"
            className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
          >
            許可メールアドレス設定
          </Button>
        )}
      </Box>

      <Typography className="mb-2 px-4 text-lg font-semibold">
        管理者アカウント一覧 {adminUsers.length} 件
      </Typography>
      <Box className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]">
        <Table className="border-separate text-nowrap py-2">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={headCellClass}>
                アイコン
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                名前
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                メールアドレス
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                権限
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                ログイン
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                最終ログイン日時
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                登録日
              </TableCell>
              {isSuperAdmin && <TableCell className={headCellClass} />}
            </TableRow>
          </TableHead>
          <TableBody>
            {adminUsers.map((adminUser) => {
              const isMe = adminUser.id === me?.id;
              return (
                <TableRow key={adminUser.id}>
                  <TableCell align="center" className="p-2">
                    <Avatar
                      src={adminUser.avatarUrl ?? ""}
                      size={40}
                      name={adminUser.name ?? adminUser.email}
                      className="mx-auto"
                    />
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {adminUser.name ?? "-"}
                    {isMe && (
                      <Typography
                        component="span"
                        className="ml-1 text-sm text-[var(--myturn-sub-text)]"
                      >
                        (あなた)
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {adminUser.email}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {getAdminRoleLabel(adminUser.role)}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {adminUser.isAllowed ? (
                      "可"
                    ) : (
                      <Typography
                        component="span"
                        title="メールアドレスが許可リストに含まれていないため、ログインできません"
                        className="text-[var(--myturn-accent)]"
                      >
                        不可（許可リスト外）
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {new Date(adminUser.lastLoggedInAt).toLocaleString("ja")}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {new Date(adminUser.createdAt).toLocaleDateString("ja")}
                  </TableCell>
                  {isSuperAdmin && (
                    <TableCell align="center" className="p-2">
                      {!isMe && (
                        <Box className="flex items-center justify-center gap-2">
                          <Button
                            className="rounded-md border border-[var(--myturn-sub-text)] px-2 py-1"
                            onClick={() => openRoleDialog(adminUser)}
                          >
                            権限変更
                          </Button>
                          <Button
                            className="rounded-md border border-red-500 px-2 py-1 text-red-500"
                            onClick={() => setDeletingAdminUser(adminUser)}
                          >
                            削除
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {loading && (
          <Container className="flex flex-col items-center gap-4 py-8">
            <Typography className="font-semibold">読み込み中です</Typography>
          </Container>
        )}
      </Box>

      {/* 権限変更ダイアログ */}
      <Dialog
        open={editingAdminUser !== null}
        onClose={() => setEditingAdminUser(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          権限を変更
        </DialogTitle>
        <FormProvider {...roleMethods}>
          <form onSubmit={roleMethods.handleSubmit(onRoleSubmit)}>
            <DialogContent className="flex flex-col gap-4">
              {editingAdminUser && (
                <Typography className="text-[var(--myturn-sub-text)]">
                  {editingAdminUser.name ?? ""}（{editingAdminUser.email}）
                </Typography>
              )}
              <Select name="role" label="権限" items={adminRoleItems} />
            </DialogContent>
            <DialogActions className="gap-2 px-6 pb-6">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditingAdminUser(null)}
                className="px-3 py-1"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
              >
                {isUpdating ? "変更中..." : "変更する"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deletingAdminUser !== null}
        onClose={() => setDeletingAdminUser(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          管理者アカウントを削除
        </DialogTitle>
        <DialogContent className="pt-4">
          {deletingAdminUser && (
            <Typography className="mb-2">
              {deletingAdminUser.name ?? ""}（{deletingAdminUser.email}
              ）を削除しますか？
            </Typography>
          )}
          <Typography className="text-sm text-[var(--myturn-sub-text)]">
            メールアドレスも許可リストから削除され、ログインできなくなります。
          </Typography>
        </DialogContent>
        <DialogActions className="gap-2 px-6 pb-6">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setDeletingAdminUser(null)}
            className="px-3 py-1"
          >
            キャンセル
          </Button>
          <Button
            disabled={isDeleting}
            onClick={() =>
              deletingAdminUser &&
              deleteAdminUser({
                variables: { input: { id: deletingAdminUser.id } },
              })
            }
            className="rounded-full bg-red-500 px-4 py-2 text-[var(--foreground)]"
          >
            {isDeleting ? "削除中..." : "削除する"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
