import { useState } from "react";
import { useQuery } from "@apollo/client";
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
  const [companies, setCompanies] = useState<ReminderCandidateCompany[]>([]);

  const applyResult = (result?: GetReminderCandidateCompaniesQuery) => {
    if (!result?.getReminderCandidateCompanies) return;
    setCompanies(result.getReminderCandidateCompanies);
  };

  const { loading, refetch: refetchQuery } =
    useQuery<GetReminderCandidateCompaniesQuery>(
      GET_REMINDER_CANDIDATE_COMPANIES,
      {
        variables: { input: { keyword: keyword || null, onlyOverdue } },
        fetchPolicy: "no-cache",
        onCompleted: applyResult,
      },
    );

  // onCompletedはrefetch時に発火しないため、結果から直接一覧を再描画する
  const refetch = async () => {
    const { data } = await refetchQuery();
    applyResult(data);
  };

  return { companies, loading, refetch };
}

/** 企業の催促対象の学生一覧を取得 */
export function useCompanyReminderTargets(companyId: number | null) {
  const [company, setCompany] = useState<ReminderTargetCompany | null>(null);
  const [users, setUsers] = useState<ReminderTargetUser[]>([]);

  const applyResult = (result?: GetCompanyReminderTargetsQuery) => {
    if (!result?.getCompanyReminderTargets) return;
    setCompany(result.getCompanyReminderTargets.company);
    setUsers(
      result.getCompanyReminderTargets.users.map((user) => ({
        ...user,
        delayType: user.delayType as ReminderDelayType,
        lastRemindedAt: user.lastRemindedAt
          ? new Date(user.lastRemindedAt as any)
          : null,
        lastRemindedIsOverdue: user.lastRemindedIsOverdue ?? null,
      })),
    );
  };

  const { loading, refetch: refetchQuery } =
    useQuery<GetCompanyReminderTargetsQuery>(GET_COMPANY_REMINDER_TARGETS, {
      variables: { input: { companyId } },
      fetchPolicy: "no-cache",
      skip: companyId === null,
      onCompleted: applyResult,
    });

  const refetch = async () => {
    if (companyId === null) return;
    const { data } = await refetchQuery();
    applyResult(data);
  };

  return { company, users, loading, refetch };
}

/** 企業ごとの催促メール送信履歴を取得 */
export function useCompanyReminderHistories(companyId: number | null) {
  const [reminders, setReminders] = useState<CompanyReminder[]>([]);

  const applyResult = (result?: GetCompanyRemindersQuery) => {
    if (!result?.getCompanyReminders) return;
    setReminders(
      result.getCompanyReminders.map((reminder) => ({
        ...reminder,
        errorMessage: reminder.errorMessage ?? null,
        createdAt: new Date(reminder.createdAt as any),
        users: reminder.users.map((user) => ({
          ...user,
          delayType: user.delayType as ReminderDelayType,
        })),
      })),
    );
  };

  const { loading, refetch: refetchQuery } = useQuery<GetCompanyRemindersQuery>(
    GET_COMPANY_REMINDERS,
    {
      variables: { input: { companyId } },
      fetchPolicy: "no-cache",
      skip: companyId === null,
      onCompleted: applyResult,
    },
  );

  const refetch = async () => {
    if (companyId === null) return;
    const { data } = await refetchQuery();
    applyResult(data);
  };

  return { reminders, loading, refetch };
}
