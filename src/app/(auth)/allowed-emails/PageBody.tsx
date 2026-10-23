"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client/react";
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
import { AdminRole, GetAdminAllowedEmailsQuery } from "@/graphql-client";
import { GET_ADMIN_ALLOWED_EMAILS } from "@/server/graphql/admin-user/queries";
import {
  CREATE_ADMIN_ALLOWED_EMAIL,
  DELETE_ADMIN_ALLOWED_EMAIL,
} from "@/server/graphql/admin-user/mutations";
import {
  CreateAllowedEmailFormData,
  createAllowedEmailSchema,
} from "@/schemas/admin-user/create-allowed-email";
import { adminRoleItems, getAdminRoleLabel } from "@/const/admin-user";
import { useAdminUser } from "@/lib/AdminUserProvider";
import PageTitle from "@/components/common/PageTitle";
import TextField from "@/components/common/form/TextField";
import Select from "@/components/common/form/Select";

type AllowedEmailItem =
  GetAdminAllowedEmailsQuery["getAdminAllowedEmails"][number];

const headCellClass = "p-2 text-base text-(--myturn-sub-text)";

const defaultFormValues: CreateAllowedEmailFormData = {
  email: "",
  initialRole: AdminRole.Viewer,
};

export default function PageBody() {
  const { adminUser: me, isSystemAdmin, isLoading } = useAdminUser();

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center gap-4 py-8">
        <Typography className="font-semibold">読み込み中です</Typography>
      </Container>
    );
  }

  if (!isSystemAdmin) {
    return (
      <Box className="flex-1 px-8 py-6">
        <PageTitle className="mb-8">許可メールアドレス設定</PageTitle>
        <Typography>このページはシステム管理者のみ表示できます。</Typography>
      </Box>
    );
  }

  return <AllowedEmailSettings myEmail={me?.email ?? ""} />;
}

function AllowedEmailSettings({ myEmail }: { myEmail: string }) {
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { data, loading, refetch } = useQuery<GetAdminAllowedEmailsQuery>(
    GET_ADMIN_ALLOWED_EMAILS,
    { fetchPolicy: "no-cache" },
  );
  const allowedEmails = data?.getAdminAllowedEmails ?? [];

  // ---- 許可メールアドレス追加 ----
  const methods = useForm<CreateAllowedEmailFormData>({
    resolver: zodResolver(createAllowedEmailSchema),
    defaultValues: defaultFormValues,
  });

  const [createAllowedEmail, { loading: isCreating }] = useMutation(
    CREATE_ADMIN_ALLOWED_EMAIL,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "許可メールアドレスを追加しました",
          severity: "success",
        });
        methods.reset(defaultFormValues);
        refetch();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "追加中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  const onSubmit = (formData: CreateAllowedEmailFormData) => {
    createAllowedEmail({ variables: { input: formData } });
  };

  // ---- 許可メールアドレス削除 ----
  const [deletingAllowedEmail, setDeletingAllowedEmail] =
    useState<AllowedEmailItem | null>(null);

  const [deleteAllowedEmail, { loading: isDeleting }] = useMutation(
    DELETE_ADMIN_ALLOWED_EMAIL,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "許可メールアドレスを削除しました",
          severity: "success",
        });
        setDeletingAllowedEmail(null);
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
      <Box className="mb-8 flex items-center justify-between gap-4">
        <PageTitle>許可メールアドレス設定</PageTitle>
        <Button href="/admin-users" className="-mx-3 rounded-md px-4 py-2">
          管理者アカウント一覧へ
        </Button>
      </Box>
      <Typography variant="body2" className="mb-8 text-(--myturn-sub-text)">
        ここに設定したメールアドレスのGoogleアカウントでのみ、管理画面への登録・ログインができます。
      </Typography>

      {/* 許可メールアドレス追加フォーム */}
      <Box className="mb-8 rounded-lg bg-(--background) px-6 py-6">
        <Typography className="mb-2 font-semibold">
          許可メールアドレスを追加する
        </Typography>
        <FormProvider {...methods}>
          <form
            className="flex flex-wrap items-end gap-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <TextField
              name="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              className="w-80"
            />
            <Select
              name="initialRole"
              label="登録時の権限"
              items={adminRoleItems}
              className="w-40"
            />
            <Button
              type="submit"
              disabled={isCreating}
              className="mt-7 rounded-full bg-(--myturn-main) px-4 py-2 text-(--foreground)"
            >
              {isCreating ? "追加中..." : "追加する"}
            </Button>
          </form>
        </FormProvider>
        <Typography variant="body2" className="mt-2 text-(--myturn-sub-text)">
          登録後の権限は管理者アカウント画面から変更できます。
        </Typography>
      </Box>

      {/* 許可メールアドレス一覧 */}
      <Typography className="mb-2 px-4 text-lg font-semibold">
        許可メールアドレス一覧 {allowedEmails.length} 件
      </Typography>
      <Box className="mb-4 overflow-x-auto rounded-lg bg-(--background)">
        <Table className="border-separate py-2 text-nowrap">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={headCellClass}>
                メールアドレス
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                登録時の権限
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                アカウント
              </TableCell>
              <TableCell align="center" className={headCellClass}>
                追加日
              </TableCell>
              <TableCell className={headCellClass} />
            </TableRow>
          </TableHead>
          <TableBody>
            {allowedEmails.map((allowedEmail) => {
              const isMine = allowedEmail.email === myEmail;
              return (
                <TableRow key={allowedEmail.id}>
                  <TableCell align="center" className="p-2 text-base">
                    {allowedEmail.email}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {getAdminRoleLabel(allowedEmail.initialRole)}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {allowedEmail.isRegistered ? "登録済み" : "未登録"}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {new Date(allowedEmail.createdAt).toLocaleDateString("ja")}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    {isMine ? (
                      <Typography className="text-sm text-(--myturn-sub-text)">
                        自身のメールアドレスは削除できません
                      </Typography>
                    ) : (
                      <Button
                        className="rounded-md border border-red-500 px-2 py-1 text-red-500"
                        onClick={() => setDeletingAllowedEmail(allowedEmail)}
                      >
                        削除
                      </Button>
                    )}
                  </TableCell>
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

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deletingAllowedEmail !== null}
        onClose={() => setDeletingAllowedEmail(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pt-6 pb-0 font-semibold">
          許可メールアドレスを削除
        </DialogTitle>
        <DialogContent className="pt-4">
          {deletingAllowedEmail && (
            <Typography className="mb-2">
              {deletingAllowedEmail.email} を許可リストから削除しますか？
            </Typography>
          )}
          {deletingAllowedEmail?.isRegistered && (
            <Typography className="text-sm text-(--myturn-sub-text)">
              登録済みのアカウントは削除されませんが、ログインできなくなります。
            </Typography>
          )}
        </DialogContent>
        <DialogActions className="gap-2 px-6 pb-6">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setDeletingAllowedEmail(null)}
            className="px-3 py-1"
          >
            キャンセル
          </Button>
          <Button
            disabled={isDeleting}
            onClick={() =>
              deletingAllowedEmail &&
              deleteAllowedEmail({
                variables: { input: { id: deletingAllowedEmail.id } },
              })
            }
            className="rounded-full bg-red-500 px-4 py-2 text-(--foreground)"
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
