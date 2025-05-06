import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ApplicantFilterFormData } from "@/schemas/applicant/filter";
import { SEARCH_ENTRIES } from "@/server/graphql/entry/queries";
import { ApplicantItem } from "@/types/applicant";

export function useApplicants(
  initialInput: ApplicantFilterFormData,
  page: number,
  limit: number,
) {
  const [input, setInput] = useState<ApplicantFilterFormData>(initialInput);
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数
  const [loading, setLoading] = useState(true);

  // 応募者一覧情報を取得
  useQuery(SEARCH_ENTRIES, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.searchEntries.totalCount);
      setApplicants(result.searchEntries.items);
      setTotalPages(result.searchEntries.totalPages);
      setLoading(false);
    },
    onError() {
      setLoading(false);
    },
  });

  // 再リクエストする
  const refetchApplicants = async (input: ApplicantFilterFormData) => {
    setApplicants([]);
    setLoading(true);
    setInput(input);
  };

  return {
    applicants,
    totalCount,
    totalPages,
    loading,
    refetchApplicants,
  };
}
