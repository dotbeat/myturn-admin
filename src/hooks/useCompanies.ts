import { useState } from "react";
import { useQuery } from "@apollo/client";
import { CompanyFilterFormData } from "@/schemas/company/filter";
import { SEARCH_COMPANY } from "@/server/graphql/company/queries";
import { CompanyItem } from "@/types/company";

export function useCompanies(initialInput: CompanyFilterFormData) {
  const [input, setInput] = useState(initialInput);
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [loading, setLoading] = useState(true);

  // 求職者一覧情報を取得
  useQuery(SEARCH_COMPANY, {
    variables: { input: { ...input, limit: 30 } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.getCompanies.totalCount);
      setCompanies(result.getCompanies.items);
      setLoading(false);
    },
    onError() {
      setLoading(false);
    },
  });

  // 再リクエストする
  const refetchCompanies = async (input: CompanyFilterFormData) => {
    setCompanies([]);
    setLoading(true);
    setInput(input);
  };

  return {
    companies,
    totalCount,
    loading,
    refetchCompanies,
  };
}
