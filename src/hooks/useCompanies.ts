import { useState } from "react";
import { useQuery } from "@apollo/client";
import { CompanyFilterFormData } from "@/schemas/company/filter";
import { SEARCH_COMPANY } from "@/server/graphql/company/queries";
import { CompanyItem } from "@/types/company";

export function useCompanies(
  input: CompanyFilterFormData,
  page: number,
  limit: number,
) {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 求職者一覧情報を取得
  const { loading } = useQuery(SEARCH_COMPANY, {
    variables: { input: { ...input, includeDeleted: true, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.getCompanies.totalCount);
      setCompanies(result.getCompanies.items);
      setTotalPages(result.getCompanies.totalPages);
    },
  });

  return {
    companies,
    totalCount,
    totalPages,
    loading,
  };
}
