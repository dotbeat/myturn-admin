import { useState } from "react";
import { useQuery } from "@apollo/client";
import { InvoiceFilterFormData } from "@/schemas/invoice/filter";
import { SEARCH_COMPANY_INVOICE } from "@/server/graphql/invoice/queries";
import { InvoiceItem } from "@/types/invoice";

export function useInvoices(
  input: InvoiceFilterFormData,
  page: number,
  limit: number,
) {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 企業請求一覧情報を取得
  const { loading } = useQuery(SEARCH_COMPANY_INVOICE, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.getCompanyInvoices.totalCount);
      setInvoices(result.getCompanyInvoices.items);
      setTotalPages(result.getCompanyInvoices.totalPages);
    },
  });

  return {
    invoices,
    totalCount,
    totalPages,
    loading,
  };
}
