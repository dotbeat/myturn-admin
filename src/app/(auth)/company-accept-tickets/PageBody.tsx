"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
import {
  CreateTicketFormData,
  createTicketSchema,
} from "@/schemas/company/create-accept-ticket";
import { GET_ALL_COMPANIES } from "@/server/graphql/company/queries";
import { CREATE_COMPANY_ACCEPT_TICKET } from "@/server/graphql/company/mutations";
import TextField from "@/components/common/form/TextField";
import { ConvertUrlParamEntry } from "@/utils/frontend/form";
import PageTitle from "@/components/common/PageTitle";

type CompanyOption = { id: number; name: string };

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();

  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  // ---- 採用チケット作成フォーム ----
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

  const ticketMethods = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: { companyId: 0, count: 1, expiredAt: "", amount: 0 },
  });

  const [createTicket, { loading: isCreating }] = useMutation(
    CREATE_COMPANY_ACCEPT_TICKET,
    {
      onCompleted() {
        setToast({
          open: true,
          message: "採用チケットを作成しました",
          severity: "success",
        });
        ticketMethods.reset({
          companyId: 0,
          count: 1,
          expiredAt: "",
          amount: 0,
        });
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
    createTicket({
      variables: {
        input: {
          companyId: data.companyId,
          count: data.count,
          expiredAt: new Date(data.expiredAt).toISOString(),
          amount: data.amount,
        },
      },
    });
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">企業の採用チケット管理</PageTitle>
      {/* 採用チケット作成フォーム */}
      <Box className="mb-8 rounded-lg bg-[var(--background)] px-6 py-6">
        <Typography className="mb-2 font-semibold">
          採用チケットを追加する
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
              label="採用チケット追加数"
              type="number"
              className="w-36"
              onInput={() => {
                const count = Number(ticketMethods.getValues("count"));
                ticketMethods.setValue("amount", count * acceptTicketUnitPrice);
              }}
            />
            <TextField
              name="amount"
              label="請求金額（円）"
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

      {/* 採用チケットを追加する企業の選択ダイアログ */}
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
