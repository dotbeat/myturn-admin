"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  MenuItem,
  Pagination,
  PaginationItem,
  Snackbar,
  Typography,
} from "@mui/material";
import TextField from "@/components/common/form/TextField";
import { periods } from "@/const/date";
import { useInvoices } from "@/hooks/useInvoices";
import { useInvoicesStatistics } from "@/hooks/useInvoicesStatistics";
import {
  EditInvoiceFormData,
  editInvoiceSchema,
} from "@/schemas/invoice/edit-amount";
import {
  InvoiceFilterFormData,
  invoiceFilterFormSchema,
} from "@/schemas/invoice/filter";
import { UPDATE_COMPANY_INVOICE } from "@/server/graphql/invoice/mutations";
import { InvoiceItem } from "@/types/invoice";
import {
  convertFormDataToUrlParams,
  ConvertUrlParamEntry,
} from "@/utils/frontend/form";
import { isSameObject } from "@/utils/shared/object";
import { getSelectItem } from "@/utils/shared/select";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import IndicateItem from "@/components/common/IndicateItem";
import PageTitle from "@/components/common/PageTitle";
import PopUp from "@/components/common/PopUp";
import InvoiceFilterForm from "@/components/invoice/InvoiceFilterForm";
import InvoiceList from "@/components/invoice/InvoiceList";

export default function PageBody() {
  // URLパラメータから検索条件を取得
  const searchParams = useSearchParams();

  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periods[0].value,
  );

  const [editingInvoice, setEditingInvoice] = useState<InvoiceItem | null>(
    null,
  );

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [updateCompanyInvoice, { loading: isUpdatingCompanyInvoice }] =
    useMutation(UPDATE_COMPANY_INVOICE, {
      onCompleted() {
        setToast({
          open: true,
          message: "請求金額を更新しました",
          severity: "success",
        });
        setEditingInvoice(null);
        refetch();
      },
      onError(error) {
        setToast({
          open: true,
          message: error.message || "更新中にエラーが発生しました",
          severity: "error",
        });
      },
    });

  const openEditInvoiceDialog = (item: InvoiceItem) => {
    invoiceEditMethods.reset({ amount: item.amount });
    setEditingInvoice(item);
  };

  const onInvoiceEditSubmit = (data: EditInvoiceFormData) => {
    if (!editingInvoice) return;
    updateCompanyInvoice({
      variables: {
        input: {
          id: editingInvoice.id,
          amount: data.amount,
        },
      },
    });
  };

  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const page = paramsConverter.toNumber("page", 1);
  const limit = paramsConverter.toNumber("limit", 30);

  const initialFormData: InvoiceFilterFormData = {
    applicantName: paramsConverter.toString("applicantName"),
    companyName: paramsConverter.toString("companyName"),
    acceptDateStart: paramsConverter.toDate("acceptDateStart"),
    acceptDateEnd: paramsConverter.toDate("acceptDateEnd"),
    paymentLimitDateStart: paramsConverter.toDate("paymentLimitDateStart"),
    paymentLimitDateEnd: paramsConverter.toDate("paymentLimitDateEnd"),
    service: paramsConverter.toString("service"),
  };
  const methods = useForm<InvoiceFilterFormData>({
    resolver: zodResolver(invoiceFilterFormSchema),
    mode: "onChange", // リアルタイムバリデーション
    defaultValues: initialFormData,
  });

  const invoiceEditMethods = useForm<EditInvoiceFormData>({
    resolver: zodResolver(editInvoiceSchema),
    defaultValues: { amount: 0 },
  });

  const { invoices, totalCount, totalPages, loading, refetch } = useInvoices(
    initialFormData,
    page,
    limit,
  );

  const {
    totalAmount, // 合計売上
    acceptedCount, // 入社人数
    generalCount, // 総合職
    technicalCount, // 技術職
    refetchStatistics,
  } = useInvoicesStatistics("");

  const onSubmit = (data: InvoiceFilterFormData) => {
    const oldParams = new URLSearchParams(window.location.search);
    const newParams = convertFormDataToUrlParams(data);
    if (
      !isSameObject(
        Object.fromEntries(oldParams),
        Object.fromEntries(newParams),
      )
    ) {
      location.search = `${newParams.size ? "?" : ""}${newParams.toString()}`;
    }
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">請求ページ</PageTitle>
      <Box className="mb-8 inline-flex gap-8 rounded-lg bg-[var(--background)] py-2 pl-8 pr-2">
        <IndicateItem label="合計売上" count={totalAmount} className="py-4" />
        <IndicateItem label="入社人数" count={acceptedCount} className="py-4" />
        <IndicateItem label="総合職" count={generalCount} className="py-4" />
        <IndicateItem label="技術職" count={technicalCount} className="py-4" />
        <PopUp
          id="period-filter"
          className="flex min-w-24 items-center justify-between gap-2 self-start rounded border border-current px-2 py-1"
          menuClass="p-2"
          activator={() => (
            <>
              <Typography className="text-sm">
                {getSelectItem(periods, selectedPeriod)?.label}
              </Typography>
              <ArrowDownNarrowIcon size={16} />
            </>
          )}
        >
          {periods.map((period) => (
            <MenuItem
              key={period.value}
              onClick={() => {
                refetchStatistics(period.value);
                setSelectedPeriod(period.value);
              }}
            >
              {period.label}
            </MenuItem>
          ))}
        </PopUp>
      </Box>
      <Box className="flex items-start gap-4">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6 rounded-lg bg-[var(--background)] px-4 py-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InvoiceFilterForm isLoading={loading} />
          </form>
        </FormProvider>
        <Box className="min-w-0 flex-1">
          <Typography className="mb-2 px-4 text-lg font-semibold">
            検索結果 {totalCount} 件
          </Typography>
          <InvoiceList
            items={invoices}
            isLoading={loading}
            onEditInvoice={openEditInvoiceDialog}
            className="mb-4 overflow-x-auto rounded-lg bg-[var(--background)]"
          />
          <Box className="flex justify-center">
            <Pagination
              count={totalPages}
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
                    return `/invoices${newParams.size ? "?" : ""}${newParams}`;
                  })()}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {/* 請求金額編集ダイアログ */}
      <Dialog
        open={editingInvoice !== null}
        onClose={() => setEditingInvoice(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="pb-0 pt-6 font-semibold">
          請求金額の編集
        </DialogTitle>
        <FormProvider {...invoiceEditMethods}>
          <form onSubmit={invoiceEditMethods.handleSubmit(onInvoiceEditSubmit)}>
            <DialogContent className="flex flex-col gap-4 pt-4">
              {editingInvoice && (
                <Typography className="text-[var(--myturn-sub-text)]">
                  採用企業：{editingInvoice.companyName}
                </Typography>
              )}
              <TextField name="amount" label="請求金額" type="number" />
            </DialogContent>
            <DialogActions className="gap-2 px-6 pb-6">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setEditingInvoice(null)}
                className="px-3 py-1"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isUpdatingCompanyInvoice}
                className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)]"
              >
                {isUpdatingCompanyInvoice ? "保存中..." : "保存する"}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
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
