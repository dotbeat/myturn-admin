import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ApplicantFilterFormData } from "@/schemas/applicant/filter";
import { SEARCH_ENTRIES } from "@/server/graphql/entry/queries";
import { ApplicantItem } from "@/types/applicant";

export function useApplicants(
  input: ApplicantFilterFormData,
  page: number,
  limit: number,
) {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 応募者一覧情報を取得
  const { loading } = useQuery(SEARCH_ENTRIES, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.searchEntries.totalCount);
      setApplicants(result.searchEntries.items);
      setTotalPages(result.searchEntries.totalPages);
    },
  });

  // サーバー側DB取得時は、内定報告有りのユーザーに絞り込むことまでしかできない
  // そのため取得後に、内定報告した対象企業についての応募のみに絞り込む

  return {
    applicants: input.isOnlyAccepted
      ? applicants.filter((applicant) => applicant.joinDate)
      : applicants,
    totalCount,
    totalPages,
    loading,
  };
}
