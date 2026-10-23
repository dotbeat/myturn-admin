import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetCompanyReminderTargetsQuery,
  GetCompanyRemindersQuery,
  GetReminderCandidateCompaniesQuery,
} from "@/graphql-client";
import {
  GET_COMPANY_REMINDER_TARGETS,
  GET_COMPANY_REMINDERS,
  GET_REMINDER_CANDIDATE_COMPANIES,
} from "@/server/graphql/company-reminder/queries";
import {
  CompanyReminder,
  ReminderCandidateCompany,
  ReminderDelayType,
  ReminderTargetCompany,
  ReminderTargetUser,
} from "@/types/company-reminder";

/**
 * 催促候補の企業一覧を取得
 * @param keyword 企業名の部分一致
 * @param onlyOverdue 基準超過のある企業のみ（falseの場合は未対応の新着応募がある全企業）
 */
export function useReminderCandidateCompanies(
  keyword: string,
  onlyOverdue: boolean,
) {
  const {
    data,
    previousData,
    loading,
    refetch: refetchQuery,
  } = useQuery<GetReminderCandidateCompaniesQuery>(
    GET_REMINDER_CANDIDATE_COMPANIES,
    {
      variables: { input: { keyword: keyword || null, onlyOverdue } },
      fetchPolicy: "no-cache",
    },
  );
  // 再取得中も前回の結果を表示し続ける
  const companies: ReminderCandidateCompany[] =
    (data ?? previousData)?.getReminderCandidateCompanies ?? [];

  const refetch = async () => {
    await refetchQuery();
  };

  return { companies, loading, refetch };
}

/** 企業の催促対象の学生一覧を取得 */
export function useCompanyReminderTargets(companyId: number | null) {
  const {
    data,
    previousData,
    loading,
    refetch: refetchQuery,
  } = useQuery<GetCompanyReminderTargetsQuery>(GET_COMPANY_REMINDER_TARGETS, {
    variables: { input: { companyId } },
    fetchPolicy: "no-cache",
    skip: companyId === null,
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.getCompanyReminderTargets;

  const company: ReminderTargetCompany | null = result?.company ?? null;
  // 取得結果が変わったときだけ作り直し、利用側のeffectが毎レンダー走らないようにする
  const users = useMemo<ReminderTargetUser[]>(
    () =>
      result?.users.map((user) => ({
        ...user,
        delayType: user.delayType as ReminderDelayType,
        lastRemindedAt: user.lastRemindedAt
          ? new Date(user.lastRemindedAt as any)
          : null,
        lastRemindedIsOverdue: user.lastRemindedIsOverdue ?? null,
      })) ?? [],
    [result],
  );

  const refetch = async () => {
    if (companyId === null) return;
    await refetchQuery();
  };

  return { company, users, loading, refetch };
}

/** 企業ごとの催促メール送信履歴を取得 */
export function useCompanyReminderHistories(companyId: number | null) {
  const {
    data,
    previousData,
    loading,
    refetch: refetchQuery,
  } = useQuery<GetCompanyRemindersQuery>(GET_COMPANY_REMINDERS, {
    variables: { input: { companyId } },
    fetchPolicy: "no-cache",
    skip: companyId === null,
  });
  // 再取得中も前回の結果を表示し続ける
  const result = (data ?? previousData)?.getCompanyReminders;

  const reminders = useMemo<CompanyReminder[]>(
    () =>
      result?.map((reminder) => ({
        ...reminder,
        errorMessage: reminder.errorMessage ?? null,
        createdAt: new Date(reminder.createdAt as any),
        users: reminder.users.map((user) => ({
          ...user,
          delayType: user.delayType as ReminderDelayType,
        })),
      })) ?? [],
    [result],
  );

  const refetch = async () => {
    if (companyId === null) return;
    await refetchQuery();
  };

  return { reminders, loading, refetch };
}
