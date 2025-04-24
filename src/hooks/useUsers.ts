import { useState } from "react";
import { useQuery } from "@apollo/client";
import { UserFilterFormData } from "@/schemas/user/filter";
import { SEARCH_USERS } from "@/server/graphql/user/queries";
import { UserItem } from "@/types/user";

export function useUsers(initialInput: UserFilterFormData) {
  const [input, setInput] = useState<UserFilterFormData>(initialInput);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)

  // 求職者一覧情報を取得
  const { loading } = useQuery(SEARCH_USERS, {
    variables: { input: { ...input, limit: 30 } },
    fetchPolicy: "no-cache",
    onCompleted(result) {
      setTotalCount(result.searchUsers.totalCount);
      setUsers(result.searchUsers.items);
    },
  });

  // 再リクエストする
  const refetchUsers = async (input: UserFilterFormData) => {
    setUsers([]);
    setInput(input);
  };

  return {
    users,
    totalCount,
    loading,
    refetchUsers,
  };
}
