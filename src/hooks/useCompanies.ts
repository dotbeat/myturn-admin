import { useQuery } from "@apollo/client/react";
import { CompanyFilterFormData } from "@/schemas/company/filter";
import { SEARCH_COMPANY } from "@/server/graphql/company/queries";
import { CompanyItem } from "@/types/company";

export function useCompanies(
  input: CompanyFilterFormData,
  page: number,
  limit: number,
  orderBy: string,
  orderDirection: string,
) {
  // 求職者一覧情報を取得
  const { data, previousData, loading } = useQuery<{
    getCompanies: {
      items: CompanyItem[];
      totalCount: number;
      totalPages: number;
    };
  }>(SEARCH_COMPANY, {
    variables: {
      input: {
        ...input,
        includeDeleted: true,
        page,
        limit,
        orderBy,
        orderDirection,
      },
    },
    fetchPolicy: "no-cache",
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.getCompanies;

  return {
    companies: result?.items ?? [],
    totalCount: result?.totalCount ?? 0, // 検索結果数(全ページ)
    totalPages: result?.totalPages ?? 0, // 一覧表のページ数
    loading,
  };
}
