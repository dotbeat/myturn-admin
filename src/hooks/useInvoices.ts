import { useQuery } from "@apollo/client/react";
import { InvoiceFilterFormData } from "@/schemas/invoice/filter";
import { SEARCH_COMPANY_INVOICE } from "@/server/graphql/invoice/queries";
import { InvoiceItem } from "@/types/invoice";

export function useInvoices(
  input: InvoiceFilterFormData,
  page: number,
  limit: number,
) {
  // 企業請求一覧情報を取得
  const { data, previousData, loading, refetch } = useQuery<{
    getCompanyInvoices: {
      items: InvoiceItem[];
      totalCount: number;
      totalPages: number;
    };
  }>(SEARCH_COMPANY_INVOICE, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.getCompanyInvoices;

  const refetchInvoices = async () => {
    await refetch();
  };

  return {
    invoices: result?.items ?? [],
    totalCount: result?.totalCount ?? 0, // 検索結果数(全ページ)
    totalPages: result?.totalPages ?? 0, // 一覧表のページ数
    loading,
    refetch: refetchInvoices,
  };
}
