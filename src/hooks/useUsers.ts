import { useState } from "react";
import { useQuery } from "@apollo/client";
import { UserFilterFormData } from "@/schemas/user/filter";
import { SEARCH_USERS } from "@/server/graphql/user/queries";
import { UserItem } from "@/types/user";
import { isSameObject } from "@/utils/shared/object";

export function useUsers(
  initialInput: UserFilterFormData,
  page: number,
  limit: number,
) {
  const [input, setInput] = useState<UserFilterFormData>(initialInput);
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

  // 再リクエストする
  const refetchUsers = async (newInput: UserFilterFormData) => {
    if (!isSameObject(input, newInput)) {
      setUsers([]);
      setInput(newInput);
    }
  };

  return {
    users,
    totalCount,
    totalPages,
    loading,
    refetchUsers,
  };
}
