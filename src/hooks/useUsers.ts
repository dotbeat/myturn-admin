import { useState } from "react";
import { useQuery } from "@apollo/client";
import { UserFilterFormData } from "@/schemas/user/filter";
import { SEARCH_USERS } from "@/server/graphql/user/queries";
import { UserItem } from "@/types/user";
import { SearchUsersInput } from "@/graphql-client";

export function useUsers(
  formData: UserFilterFormData,
  page: number,
  limit: number,
) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 検索結果数(全ページ)
  const [totalPages, setTotalPages] = useState(0); // 一覧表のページ数

  const input: SearchUsersInput = {
    name: formData.name,
    gender: formData.gender,
    prefectures: formData.prefecture ? [formData.prefecture] : [],
    registerDateStart: formData.registerDateStart,
    registerDateEnd: formData.registerDateEnd,
    leaveDateStart: formData.leaveDateStart,
    leaveDateEnd: formData.leaveDateEnd,
    university: formData.university,
    faculty: formData.faculty,
    departments: formData.department ? [formData.department] : [],
    grades: formData.grade ? [formData.grade] : [],
    availableDaysPerWeekMin: formData.availableDaysPerWeekMin,
    availableDaysPerWeekMax: formData.availableDaysPerWeekMax,
    availableHoursPerWeekMin: formData.availableHoursPerWeekMin,
    availableHoursPerWeekMax: formData.availableHoursPerWeekMax,
    availableDurationMonthsMin: formData.availableDurationMonthsMin,
    availableDurationMonthsMax: formData.availableDurationMonthsMax,
    interestedIndustries: formData.interestedIndustry
      ? [formData.interestedIndustry]
      : [],
    interestedJobTypes: formData.interestedJobType
      ? [formData.interestedJobType]
      : [],
    entryCountMin: formData.entryCountMin,
    entryCountMax: formData.entryCountMax,
  };

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
