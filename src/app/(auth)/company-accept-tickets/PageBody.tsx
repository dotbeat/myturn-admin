"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
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
  Link,
  Pagination,
  PaginationItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { acceptTicketUnitPrice } from "@/const/company";
import { GetCompanyAcceptTicketsQuery } from "@/graphql-client";
import {
  CreateTicketFormData,
  createTicketSchema,
} from "@/schemas/company/create-accept-ticket";
import {
  UpdateTicketFormData,
  updateTicketSchema,
} from "@/schemas/company/update-accept-ticket";
import {
  GET_ALL_COMPANIES,
  GET_COMPANY_ACCEPT_TICKETS,
} from "@/server/graphql/company/queries";
import {
  CREATE_COMPANY_ACCEPT_TICKET,
  DELETE_COMPANY_ACCEPT_TICKET,
  UPDATE_COMPANY_ACCEPT_TICKET,
} from "@/server/graphql/company/mutations";
import { AcceptTicket } from "@/types/invoice";
import { ConvertUrlParamEntry } from "@/utils/frontend/form";
import TextField from "@/components/common/form/TextField";
import PageTitle from "@/components/common/PageTitle";

type CompanyOption = { id: number; name: string };

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();

  const router = useRouter();
  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  // ---- 採用デポジット作成フォーム ----
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: "no-cache",
    onCompleted(data) {
      setCompanyOptions(data.companies ?? []);
    },
  });

  const {
    loading: ticketsLoading,
    refetch: refetchTickets,
    data: ticketsData,
  } = useQuery<GetCompanyAcceptTicketsQuery>(GET_COMPANY_ACCEPT_TICKETS, {
    fetchPolicy: "no-cache",
    variables: { input: { page, limit } },
  });

  const resetPaginateAndList = () => {
    if (page !== 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page");
      router.push(
        `/company-accept-tickets${newParams.size ? `?${newParams}` : ""}`,
      );
    } else {
      refetchTickets();
    }
  };

  const ticketsResult = ticketsData?.getCompanyAcceptTickets;
  const tickets: AcceptTicket[] =
    ticketsResult?.items.map((ticket) => ({
      id: ticket.id,
      companyId: ticket.companyId,
      companyName: ticket.companyName,
      count: ticket.count,
      usedCount: ticket.usedCount,
      expiredAt: new Date(ticket.expiredAt),
      amount: ticket.amount,
      createdAt: new Date(ticket.createdAt),
    })) ?? [];
  const ticketsTotalCount = ticketsResult?.totalCount ?? 0;
  const ticketsTotalPages = ticketsResult?.totalPages ?? 0;

  const ticketMethods = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      companyId: 0,
      count: 0,
      amount: 0,
      expiredAt: "9999-12-31",
    },
  });

  // ---- 採用デポジット削除 ----
  const [deletingTicket, setDeletingTicket] = useState<AcceptTicket | null>(
    null,
  );

  const [deleteTicket, { loading: isDeleting }] = useMutation(
    DELETE_COMPANY_ACCEPT_TICKET,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "採用デポジットを削除しました",
          severity: "success",
        });
        setDeletingTicket(null);
        refetchTickets();
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

  // ---- 採用デポジット編集フォーム ----
  const [editingTicket, setEditingTicket] = useState<AcceptTicket | null>(null);
  const editMethods = useForm<UpdateTicketFormData>({
    resolver: zodResolver(updateTicketSchema),
  });

  const [updateTicket, { loading: isUpdating }] = useMutation(
    UPDATE_COMPANY_ACCEPT_TICKET,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "採用デポジットを更新しました",
          severity: "success",
        });
        setEditingTicket(null);
        refetchTickets();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "更新中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  const openEditDialog = (ticket: AcceptTicket) => {
    const yyyy = ticket.expiredAt.getFullYear();
    const mm = String(ticket.expiredAt.getMonth() + 1).padStart(2, "0");
    const dd = String(ticket.expiredAt.getDate()).padStart(2, "0");
    editMethods.reset({
      count: ticket.count,
      expiredAt: `${yyyy}-${mm}-${dd}`,
      amount: ticket.amount,
    });
    setEditingTicket(ticket);
  };

  const onEditSubmit = (data: UpdateTicketFormData) => {
    if (!editingTicket) return;
    const expiredAt = new Date(data.expiredAt);
    expiredAt.setHours(23, 59, 59, 999);
    updateTicket({
      variables: {
        input: {
          id: editingTicket.id,
          count: data.count,
          expiredAt: expiredAt.toISOString(),
          amount: data.amount,
        },
      },
    });
  };

  const [createTicket, { loading: isCreating }] = useMutation(
    CREATE_COMPANY_ACCEPT_TICKET,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "採用デポジットを作成しました",
          severity: "success",
        });
        ticketMethods.reset({
          companyId: 0,
          count: 5,
          expiredAt: "9999-12-31",
          amount: 500000,
        });
        resetPaginateAndList();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "作成中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  const onTicketSubmit = (data: CreateTicketFormData) => {
    const expiredAt = new Date(data.expiredAt);
    expiredAt.setHours(23, 59, 59, 999);
    createTicket({
      variables: {
        input: {
          companyId: data.companyId,
          count: data.count,
          expiredAt: expiredAt.toISOString(),
          amount: data.amount,
        },
      },
    });
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">企業の採用デポジット管理</PageTitle>
      {/* 採用デポジット作成フォーム */}
      <Box className="mb-8 rounded-lg bg-[var(--background)] px-6 py-6">
        <Typography className="mb-2 font-semibold">
          採用デポジット（前払いの成果報酬）を追加する
        </Typography>
        <FormProvider {...ticketMethods}>
          <form
            className="flex flex-wrap items-end gap-4"
            onSubmit={ticketMethods.handleSubmit(onTicketSubmit)}
          >
            <Box className="flex items-end gap-2">
              <TextField
                name="companyId"
                label="企業ID"
                type="number"
                className="w-24"
              />
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  setCompanySearch("");
                  setCompanyDialogOpen(true);
                }}
                className="mb-1.5 shrink-0 rounded-md border border-current px-2 py-1"
              >
                企業選択
              </Button>
            </Box>
            <TextField
              name="count"
              label="採用デポジット追加数"
              type="number"
              className="w-36"
              onBlur={() => {
                const count = Number(ticketMethods.getValues("count"));
                ticketMethods.setValue("amount", count * acceptTicketUnitPrice);
              }}
            />
            <TextField
              name="amount"
              label="請求金額"
              type="number"
              className="w-40"
            />
            <TextField
              name="expiredAt"
              label="有効期限"
              type="date"
              className="w-44"
            />
            <Button
              type="submit"
              disabled={isCreating}
              className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
            >
              {isCreating ? "作成中..." : "作成する"}
            </Button>
          </form>
        </FormProvider>
      </Box>

      {/* 採用デポジット一覧 */}
      <Box className="mt-8">
        <Typography className="mb-2 px-4 text-lg font-semibold">
          採用デポジット一覧 {ticketsTotalCount} 件
        </Typography>
        <Box className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]">
          <Table className="max-w-5xl border-separate text-nowrap py-2">
            <TableHead>
              <TableRow className="text-nowrap">
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  企業名
                </TableCell>
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  追加した数
                </TableCell>
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  消費した数
                </TableCell>
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  有効期限
                </TableCell>
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  請求金額
                </TableCell>
                <TableCell
                  align="center"
                  className="p-2 text-base text-[var(--myturn-sub-text)]"
                >
                  チャージ日
                </TableCell>
                <TableCell className="p-2 text-base text-[var(--myturn-sub-text)]" />
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell align="center" className="p-2 text-base">
                    {ticket.companyName}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {ticket.count}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {ticket.usedCount}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {new Date(ticket.expiredAt).toLocaleDateString("ja")}
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {ticket.amount.toLocaleString()}円
                  </TableCell>
                  <TableCell align="center" className="p-2 text-base">
                    {new Date(ticket.createdAt).toLocaleDateString("ja")}
                  </TableCell>
                  <TableCell align="center" className="p-2">
                    <Box className="flex items-center justify-center gap-2">
                      <Button
                        className="rounded-md border border-[var(--myturn-sub-text)] px-2 py-1"
                        onClick={() => openEditDialog(ticket)}
                      >
                        編集
                      </Button>
                      <Button
                        className="rounded-md border border-red-500 px-2 py-1 text-red-500"
                        onClick={() => setDeletingTicket(ticket)}
                      >
                        削除
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {ticketsLoading && (
            <Container className="flex flex-col items-center gap-4 py-8">
              <Typography className="font-semibold">読み込み中です</Typography>
            </Container>
          )}
          {!ticketsLoading && tickets.length === 0 && (
            <Container className="flex flex-col items-center gap-4 py-8">
              <Typography className="font-semibold">
                採用デポジットはありません
              </Typography>
            </Container>
          )}
        </Box>
        <Box className="flex justify-center">
          <Pagination
            count={ticketsTotalPages}
            page={page}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                component={item.page !== page ? Link : Box}
                {...item}
                href={(() => {
                  const newParams = new URLSearchParams(searchParams);
                  if (item.page === 1) {
                    newParams.delete("page");
                  } else {
                    newParams.set("page", String(item.page));
                  }
                  return `/company-accept-tickets${newParams.size ? "?" : ""}${newParams}`;
                })()}
              />
            )}
          />
        </Box>
      </Box>

      {/* 採用デポジットを追加する企業の選択ダイアログ */}
      <Dialog
        open={companyDialogOpen}
        onClose={() => setCompanyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="font-semibold">企業を選択</DialogTitle>
        <DialogContent>
          <MuiTextField
            placeholder="企業名またはIDで検索"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="mb-4 w-full border border-[var(--myturn-support-middle)] px-2 py-1"
            autoFocus
          />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>企業名</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {companyOptions
                .filter((c) => {
                  const q = companySearch.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    c.name.toLowerCase().includes(q) || String(c.id).includes(q)
                  );
                })
                .map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <Button
                        className="border border-[var(--myturn-sub-text)] px-2 py-1"
                        onClick={() => {
                          ticketMethods.setValue("companyId", c.id, {
                            shouldValidate: true,
                          });
                          setCompanyDialogOpen(false);
                        }}
                      >
                        選択する
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* 採用デポジット編集ダイアログ */}
      <Dialog
        open={editingTicket !== null}
        onClose={() => setEditingTicket(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          採用デポジットを編集
        </DialogTitle>
        <FormProvider {...editMethods}>
          <form onSubmit={editMethods.handleSubmit(onEditSubmit)}>
            <DialogContent className="flex flex-col gap-4">
              {editingTicket && (
                <Box className="mb-2 rounded bg-[var(--background)] text-[var(--myturn-sub-text)]">
                  <Typography>企業名：{editingTicket.companyName}</Typography>
                  <Typography>
                    チャージ日：
                    {editingTicket.createdAt.toLocaleDateString("ja")}
                  </Typography>
                </Box>
              )}
              <TextField
                name="count"
                label="追加した数"
                type="number"
                className="w-full"
              />
              <TextField
                name="amount"
                label="請求金額"
                type="number"
                className="w-full"
              />
              <TextField
                name="expiredAt"
                label="有効期限"
                type="date"
                className="w-full"
              />
            </DialogContent>
            <DialogActions className="gap-2 px-6 pb-6">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditingTicket(null)}
                className="px-3 py-1"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
              >
                {isUpdating ? "保存中..." : "保存する"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* 採用デポジット削除確認ダイアログ */}
      <Dialog
        open={deletingTicket !== null}
        onClose={() => setDeletingTicket(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          採用デポジットを削除しますか？
        </DialogTitle>
        <DialogContent className="pt-4">
          {deletingTicket && (
            <Typography>
              <span className="font-semibold">
                {deletingTicket.companyName}
              </span>
              の採用デポジット（
              {deletingTicket.count}
              件・{deletingTicket.amount.toLocaleString()}
              円）を削除します。この操作は取り消せません。
            </Typography>
          )}
        </DialogContent>
        <DialogActions className="gap-2 px-6 pb-6">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setDeletingTicket(null)}
            className="px-3 py-1"
          >
            キャンセル
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            className="rounded-full border border-red-500 px-4 py-2 text-red-500"
            onClick={() => {
              if (!deletingTicket) return;
              deleteTicket({
                variables: { input: { id: deletingTicket.id } },
              });
            }}
          >
            {isDeleting ? "削除中..." : "削除する"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* トースト通知 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
