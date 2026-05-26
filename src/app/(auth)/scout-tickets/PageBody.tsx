"use client";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
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
import {
  createAdditionalScoutTicketSchema,
  CreateAdditionalScoutTicketFormData,
  ALLOWED_TOTAL_COUNTS,
  PRICE_BY_COUNT,
} from "@/schemas/scout/create-additional";
import { GET_ADDITIONAL_SCOUT_TICKETS } from "@/server/graphql/scout/queries";
import { CREATE_ADDITIONAL_SCOUT_TICKET } from "@/server/graphql/scout/mutations";
import { GET_ALL_COMPANIES } from "@/server/graphql/company/queries";
import { AdditionalScoutTicket } from "@/types/scout-ticket";
import { ConvertUrlParamEntry } from "@/utils/frontend/form";
import TextField from "@/components/common/form/TextField";
import Select from "@/components/common/form/Select";
import PageTitle from "@/components/common/PageTitle";

type CompanyOption = { id: number; name: string };

// codegen 実行後は GetAdditionalScoutTicketsQuery に置き換え可
type AdditionalScoutTicketsResult = {
  getAdditionalScoutTickets: {
    items: Array<{
      id: number;
      companyId: number;
      companyName: string;
      totalCount: number;
      usedCount: number;
      remainingCount: number;
      expiredAt: string;
      createdAt: string;
    }>;
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  };
};

const VALIDITY_DAYS = 90;

function getPreviewExpiredAt(): string {
  const d = new Date();
  d.setDate(d.getDate() + VALIDITY_DAYS);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default function PageBody() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

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
  } = useQuery<AdditionalScoutTicketsResult>(GET_ADDITIONAL_SCOUT_TICKETS, {
    fetchPolicy: "no-cache",
    variables: { input: { page, limit } },
  });

  const resetPaginateAndList = () => {
    if (page !== 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page");
      router.push(`/scout-tickets${newParams.size ? `?${newParams}` : ""}`);
    } else {
      refetchTickets();
    }
  };

  const ticketsResult = ticketsData?.getAdditionalScoutTickets;
  const tickets: AdditionalScoutTicket[] =
    ticketsResult?.items.map((t) => ({
      id: t.id,
      companyId: t.companyId,
      companyName: t.companyName,
      totalCount: t.totalCount,
      usedCount: t.usedCount,
      remainingCount: t.remainingCount,
      expiredAt: new Date(t.expiredAt),
      createdAt: new Date(t.createdAt),
    })) ?? [];
  const ticketsTotalCount = ticketsResult?.totalCount ?? 0;
  const ticketsTotalPages = ticketsResult?.totalPages ?? 0;

  const createMethods = useForm<CreateAdditionalScoutTicketFormData>({
    resolver: zodResolver(createAdditionalScoutTicketSchema),
    defaultValues: { companyId: 0, totalCount: ALLOWED_TOTAL_COUNTS[0] },
  });

  const selectedTotalCount = useWatch({
    control: createMethods.control,
    name: "totalCount",
  });
  const priceDisplay =
    PRICE_BY_COUNT[Number(selectedTotalCount)]?.toLocaleString();
  const previewExpiredAt = getPreviewExpiredAt();

  const [createTicket, { loading: isCreating }] = useMutation(
    CREATE_ADDITIONAL_SCOUT_TICKET,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "スカウトチケットを付与しました",
          severity: "success",
        });
        createMethods.reset({
          companyId: 0,
          totalCount: ALLOWED_TOTAL_COUNTS[0],
        });
        resetPaginateAndList();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "付与中にエラーが発生しました",
          severity: "error",
        });
      },
    },
  );

  const onCreateSubmit = (data: CreateAdditionalScoutTicketFormData) => {
    createTicket({
      variables: {
        input: {
          companyId: data.companyId,
          totalCount: Number(data.totalCount),
        },
      },
    });
  };

  const now = new Date();

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">追加スカウトチケット管理</PageTitle>

      {/* 付与フォーム */}
      <Box className="mb-8 rounded-lg bg-[var(--background)] px-6 py-6">
        <Typography className="mb-2 font-semibold">
          スカウトチケットを付与する
        </Typography>
        <FormProvider {...createMethods}>
          <form
            className="flex flex-wrap items-end gap-4"
            onSubmit={createMethods.handleSubmit(onCreateSubmit)}
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
              <Select
                name="totalCount"
                label="追加数"
                items={ALLOWED_TOTAL_COUNTS.map((c) => ({
                  value: c,
                  label: `${c}通`,
                }))}
                className="w-28"
              />
            </Box>

            <Box>
              <Typography className="text-sm">
                料金：{priceDisplay ? `${priceDisplay}円` : "—"}
              </Typography>
              <Typography className="text-sm">
                有効期限：付与日から{VALIDITY_DAYS}日 ({previewExpiredAt})
              </Typography>
            </Box>

            <Button
              type="submit"
              disabled={isCreating}
              className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
            >
              {isCreating ? "付与中..." : "付与する"}
            </Button>
          </form>
        </FormProvider>
      </Box>

      {/* 一覧 */}
      <Box className="mt-8">
        <Typography className="mb-2 px-4 text-lg font-semibold">
          スカウトチケット付与(有料分)一覧 {ticketsTotalCount} 件
        </Typography>
        <Box className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]">
          <Table className="max-w-5xl border-separate text-nowrap py-2">
            <TableHead>
              <TableRow className="text-nowrap">
                {[
                  "企業名",
                  "追加数",
                  "消費数",
                  "残数",
                  "有効期限",
                  "付与日",
                ].map((h) => (
                  <TableCell
                    key={h}
                    align="center"
                    className="p-2 text-base text-[var(--myturn-sub-text)]"
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => {
                const isExpired = ticket.expiredAt < now;
                const isExhausted = ticket.remainingCount === 0;
                return (
                  <TableRow key={ticket.id}>
                    <TableCell align="center" className="p-2 text-base">
                      {ticket.companyName}
                    </TableCell>
                    <TableCell align="center" className="p-2 text-base">
                      {ticket.totalCount}
                    </TableCell>
                    <TableCell align="center" className="p-2 text-base">
                      {ticket.usedCount}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={`p-2 text-base ${isExhausted ? "text-red-500" : ""}`}
                    >
                      {ticket.remainingCount}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={`p-2 text-base ${isExpired ? "text-red-500" : ""}`}
                    >
                      {ticket.expiredAt.toLocaleDateString("ja")}
                    </TableCell>
                    <TableCell align="center" className="p-2 text-base">
                      {ticket.createdAt.toLocaleDateString("ja")}
                    </TableCell>
                  </TableRow>
                );
              })}
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
                スカウトチケットの付与履歴はありません
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
                  return `/scout-tickets${newParams.size ? "?" : ""}${newParams}`;
                })()}
              />
            )}
          />
        </Box>
      </Box>

      {/* 企業選択ダイアログ */}
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
                          createMethods.setValue("companyId", c.id, {
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
