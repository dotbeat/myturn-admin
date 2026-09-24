"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { SendCompanyReminderMutation } from "@/graphql-client";
import { SEND_COMPANY_REMINDER } from "@/server/graphql/company-reminder/mutations";
import {
  useCompanyReminderHistories,
  useCompanyReminderTargets,
  useReminderCandidateCompanies,
} from "@/hooks/useCompanyReminders";
import { reminderTemplates } from "@/const/company-reminder";
import {
  CompanyReminderFilterFormData,
  companyReminderFilterFormSchema,
} from "@/schemas/company-reminder/filter";
import { ReminderCandidateCompany } from "@/types/company-reminder";
import {
  buildReminderBody,
  getInitialSelection,
} from "@/utils/shared/company-reminder";
import { ConvertUrlParamEntry } from "@/utils/frontend/form";
import PageTitle from "@/components/common/PageTitle";
import ReminderCompanyList from "@/components/company-reminder/ReminderCompanyList";
import ReminderUserGroups from "@/components/company-reminder/ReminderUserGroups";
import ReminderHistoryList from "@/components/company-reminder/ReminderHistoryList";
import ReminderConfirmDialog from "@/components/company-reminder/ReminderConfirmDialog";

export default function PageBody() {
  // URLパラメータから選択中の企業を取得（リロードしても選択を維持する）
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsConverter = new ConvertUrlParamEntry(searchParams);
  const companyIdParam = paramsConverter.toNumber("companyId", 0);
  const selectedCompanyId = companyIdParam > 0 ? companyIdParam : null;

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // ---- 催促候補の企業一覧（検索条件） ----
  const filterMethods = useForm<CompanyReminderFilterFormData>({
    resolver: zodResolver(companyReminderFilterFormSchema),
    defaultValues: { keyword: "", onlyOverdue: true },
  });
  const keyword = filterMethods.watch("keyword");
  const onlyOverdue = filterMethods.watch("onlyOverdue");
  // 企業名は入力が落ち着いてから検索する
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  const {
    companies,
    loading: companiesLoading,
    refetch: refetchCompanies,
  } = useReminderCandidateCompanies(debouncedKeyword, onlyOverdue);

  const selectCompany = (company: ReminderCandidateCompany | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (company) {
      newParams.set("companyId", String(company.id));
    } else {
      newParams.delete("companyId");
    }
    router.push(`/company-reminders${newParams.size ? `?${newParams}` : ""}`);
  };

  // ---- 催促対象の学生 ----
  const {
    company,
    users,
    loading: usersLoading,
    refetch: refetchTargets,
  } = useCompanyReminderTargets(selectedCompanyId);

  const {
    reminders,
    loading: remindersLoading,
    refetch: refetchReminders,
  } = useCompanyReminderHistories(selectedCompanyId);

  // ---- 学生の選択・テンプレート・本文 ----
  const [selectedEntryIds, setSelectedEntryIds] = useState<Set<number>>(
    new Set(),
  );
  const [templateName, setTemplateName] = useState(reminderTemplates[0].name);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  // 本文を手動で編集したか
  const [isDirty, setIsDirty] = useState(false);
  // 編集済みの本文がある状態で選択やテンプレートを変えたため、作り直しの確認を表示中か
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);

  const template =
    reminderTemplates.find((t) => t.name === templateName) ??
    reminderTemplates[0];

  const selectedUsers = useMemo(
    () => users.filter((s) => selectedEntryIds.has(s.entryId)),
    [users, selectedEntryIds],
  );
  const underThresholdCount = selectedUsers.filter((s) => !s.isOverdue).length;

  // テンプレートと選択した学生から件名・本文を作り直す
  const regenerate = (
    entryIds: Set<number> = selectedEntryIds,
    nextTemplateName: string = templateName,
  ) => {
    const nextTemplate =
      reminderTemplates.find((t) => t.name === nextTemplateName) ?? template;
    const picked = users.filter((s) => entryIds.has(s.entryId));
    setSubject(nextTemplate.subject);
    setBody(buildReminderBody(nextTemplate, company?.name ?? "", picked));
    setIsDirty(false);
    setShowRegenerateConfirm(false);
  };

  // 学生一覧を取得したら初期選択を適用し、本文を作成する
  useEffect(() => {
    const initial = new Set(getInitialSelection(users));
    setSelectedEntryIds(initial);
    regenerate(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, company]);

  // 選択・テンプレートを変更した時：編集済みなら確認を出し、そうでなければ作り直す
  const handleSelectionOrTemplateChange = (
    entryIds: Set<number>,
    nextTemplateName: string,
  ) => {
    if (isDirty) {
      setShowRegenerateConfirm(true);
    } else {
      regenerate(entryIds, nextTemplateName);
    }
  };

  const toggleUser = (entryId: number, checked: boolean) => {
    const next = new Set(selectedEntryIds);
    if (checked) {
      next.add(entryId);
    } else {
      next.delete(entryId);
    }
    setSelectedEntryIds(next);
    handleSelectionOrTemplateChange(next, templateName);
  };

  const changeTemplate = (name: string) => {
    setTemplateName(name);
    handleSelectionOrTemplateChange(selectedEntryIds, name);
  };

  // ---- 送信 ----
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [sendReminder, { loading: isSending }] =
    useMutation<SendCompanyReminderMutation>(SEND_COMPANY_REMINDER, {
      async onCompleted(data) {
        setConfirmOpen(false);
        const result = data.sendCompanyReminder;
        if (result.isSuccess) {
          setToast({
            open: true,
            message: "送信しました。履歴と各学生の催促記録に反映されています",
            severity: "success",
          });
        } else {
          setToast({
            open: true,
            message: `送信に失敗しました${result.errorMessage ? `：${result.errorMessage}` : ""}`,
            severity: "error",
          });
        }
        await Promise.all([
          refetchTargets(),
          refetchReminders(),
          refetchCompanies(),
        ]);
      },
      onError(error) {
        setConfirmOpen(false);
        setToast({
          open: true,
          message: error.message || "送信中にエラーが発生しました",
          severity: "error",
        });
      },
    });

  const handleSend = () => {
    if (!company) return;
    sendReminder({
      variables: {
        input: {
          companyId: company.id,
          templateName,
          subject,
          body,
          entryIds: [...selectedEntryIds],
        },
      },
    });
  };

  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-2">企業への催促</PageTitle>
      <Typography className="mb-6 text-sm text-[var(--myturn-sub-text)]">
        対応が遅れている企業に、対象の学生をまとめて催促メールで送ります。基準日数を超えた学生がいる企業が候補として表示されます。
      </Typography>

      <Box className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* 催促候補の企業 */}
        <FormProvider {...filterMethods}>
          <form
            className="w-full shrink-0 lg:w-80"
            onSubmit={(e) => e.preventDefault()}
          >
            <ReminderCompanyList
              companies={companies}
              selectedCompanyId={selectedCompanyId}
              isLoading={companiesLoading}
              onSelect={selectCompany}
              className="rounded-lg bg-[var(--background)] px-4 py-4"
            />
          </form>
        </FormProvider>

        {/* 学生の選択・本文の編集 */}
        <Box className="min-w-0 flex-1 rounded-lg bg-[var(--background)] px-6 py-4">
          {selectedCompanyId === null ? (
            <Typography className="py-8 text-center text-sm text-[var(--myturn-sub-text)]">
              左の一覧から企業を選択してください
            </Typography>
          ) : (
            <>
              <Box className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <Typography className="text-lg font-semibold">
                  {company?.name ?? "読み込み中です"}
                </Typography>
                <Typography className="text-xs text-[var(--myturn-sub-text)]">
                  {company?.email}
                </Typography>
              </Box>

              <ReminderUserGroups
                users={users}
                selectedEntryIds={selectedEntryIds}
                isLoading={usersLoading}
                onToggle={toggleUser}
              />

              <Box className="mt-4 border-t border-[var(--myturn-border)] pt-4">
                <Typography className="mb-1 text-sm font-semibold">
                  テンプレート
                </Typography>
                <select
                  value={templateName}
                  onChange={(e) => changeTemplate(e.target.value)}
                  className="mb-4 w-full rounded-md border border-[var(--myturn-support-middle)] bg-[var(--background)] px-3 py-2 text-sm focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"
                >
                  {reminderTemplates.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>

                {showRegenerateConfirm && (
                  <Box className="mb-3 rounded-md bg-orange-100 px-3 py-2 text-sm text-[var(--myturn-orange)]">
                    本文を作り直すと編集内容が消えます
                    <Box className="mt-2 flex gap-2">
                      <Button
                        size="small"
                        onClick={() => regenerate()}
                        className="rounded-md border border-current px-2 py-0.5 text-xs"
                      >
                        作り直す
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setShowRegenerateConfirm(false)}
                        className="rounded-md border border-current px-2 py-0.5 text-xs"
                      >
                        今の本文を残す
                      </Button>
                    </Box>
                  </Box>
                )}

                <Typography className="mb-1 text-sm font-semibold">
                  件名
                </Typography>
                <MuiTextField
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setIsDirty(true);
                  }}
                  size="small"
                  className="mb-4 w-full"
                />

                <Typography className="mb-1 text-sm font-semibold">
                  本文
                  {isDirty && (
                    <span className="ml-2 text-xs font-normal text-[var(--myturn-main)]">
                      編集済み
                    </span>
                  )}
                </Typography>
                <textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setIsDirty(true);
                  }}
                  rows={14}
                  className="w-full rounded-md border border-[var(--myturn-support-middle)] px-3 py-2 text-sm leading-relaxed outline-none focus:border-[var(--myturn-main)] focus:ring-1 focus:ring-[var(--myturn-main)]"
                />

                <Box className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <Typography className="text-xs text-[var(--myturn-sub-text)]">
                    {selectedEntryIds.size}人を選択中
                    {underThresholdCount > 0 &&
                      `（うち基準未満${underThresholdCount}人）`}
                  </Typography>
                  <Button
                    onClick={() => setConfirmOpen(true)}
                    disabled={
                      usersLoading || !company || selectedEntryIds.size === 0
                    }
                    className="rounded-full bg-[var(--myturn-main)] px-4 py-2 text-[var(--foreground)] disabled:opacity-50"
                  >
                    内容を確認する
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* 送信履歴 */}
      {selectedCompanyId !== null && (
        <Box className="mt-4 rounded-lg bg-[var(--background)] px-6 py-4">
          <Typography className="mb-3 font-semibold">
            送信履歴
            {company && (
              <span className="ml-4 text-sm font-normal text-[var(--myturn-sub-text)]">
                {company.name}
              </span>
            )}
          </Typography>
          <ReminderHistoryList
            reminders={reminders}
            isLoading={remindersLoading}
          />
        </Box>
      )}

      {/* 送信前の確認モーダル */}
      <ReminderConfirmDialog
        open={confirmOpen}
        company={company}
        templateName={templateName}
        subject={subject}
        body={body}
        selectedCount={selectedEntryIds.size}
        underThresholdCount={underThresholdCount}
        isSending={isSending}
        onClose={() => setConfirmOpen(false)}
        onSend={handleSend}
      />

      {/* トースト通知 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
