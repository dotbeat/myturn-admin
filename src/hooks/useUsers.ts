import { useState } from "react";
import { useQuery } from "@apollo/client";
import { UserFilterFormData } from "@/schemas/user/filter";
import { SEARCH_USERS } from "@/server/graphql/user/queries";
import { UserItem } from "@/types/user";

export function useUsers(
  input: UserFilterFormData,
  page: number,
  limit: number,
) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  // 求職者一覧情報を取得
  const { loading } = useQuery(SEARCH_USERS, {
    variables: { input: { ...input, page, limit } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.searchUsers.totalCount);
      setUsers(result.searchUsers.items);
      setTotalPages(result.searchUsers.totalPages);
    },
  });

  return {
    users,
    totalCount,
    totalPages,
    loading,
  };
}
