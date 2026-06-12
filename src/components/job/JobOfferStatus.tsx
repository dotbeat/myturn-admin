"use client";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import type { JobStatus } from "@/types/job";
import { jobOfferStatuses, jobOfferStatusIndex } from "@/utils/shared/job";
import Menu from "@/components/common/Menu";
import { ArrowDownNarrowIcon } from "@/icons/arrow/down-narrow";
import { useMutation, ApolloError } from "@apollo/client";
import { UPDATE_JOB_STATUS } from "@/server/graphql/job/mutations";

export default function JobOfferStatus({
  id,
  status,
  className = "",
  onChange,
  onStatusUpdated,
}: {
  id?: number;
  status: JobStatus;
  className?: string;
  onChange?: (newStatus: JobStatus) => void;
  companyId?: number;
  onStatusUpdated?: () => Promise<void>;
}) {
  const [statusInfo, setStatusInfo] = useState(jobOfferStatusIndex[status]);

  const [updateJobStatus] = useMutation(UPDATE_JOB_STATUS, {
    onCompleted: async (data) => {
      if (onStatusUpdated) {
        try {
          await onStatusUpdated();
        } catch (error) {
          console.error("refetch中にエラーが発生しました:", error);
        }
      }
    },
  });

  // トースト通知の状態
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // トースト通知を閉じる
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // トースト通知を表示
  const showToast = (
    message: string,
    severity: "success" | "error" | "info" | "warning",
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  useEffect(() => {
    setStatusInfo(jobOfferStatusIndex[status]);
  }, [status]);

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (id) {
      try {
        await updateJobStatus({
          variables: {
            input: {
              id,
              status: newStatus,
            },
          },
        });
        // 成功時のトースト表示
        showToast(
          `ステータスを「${jobOfferStatusIndex[newStatus].label}」に更新しました`,
          "success",
        );

        // 内部状態を更新
        setStatusInfo(jobOfferStatusIndex[newStatus]);
      } catch (error: unknown) {
        console.error("Failed to update job status:", error);

        // GraphQLエラーメッセージを抽出
        let errorMessage = "ステータスの更新に失敗しました";

        if (error instanceof ApolloError) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            // GraphQLエラーからメッセージを取得
            const graphQLError = error.graphQLErrors[0];
            if (graphQLError.message) {
              errorMessage = graphQLError.message;

              // 「以下の求人は必須項目が入力されていないため」というメッセージを処理
              if (
                errorMessage.includes(
                  "以下の求人は必須項目が入力されていないため",
                )
              ) {
                // メッセージを分割
                const parts = errorMessage.split(": ");
                if (parts.length === 2) {
                  // 求人名リストを取得
                  const jobNames = parts[1].split("、");
                  // 改行を入れて整形
                  const formattedJobNames = jobNames
                    .map((name) => `・${name.trim()}`)
                    .join("\n");
                  // メッセージを再構成
                  errorMessage = `${parts[0]}:\n${formattedJobNames}`;
                }
              }
            }
            // 拡張データがある場合（ValidationErrorなど）
            if (
              graphQLError.extensions &&
              graphQLError.extensions.originalError
            ) {
              let originalError = graphQLError.extensions
                .originalError as string;

              // 「以下の求人は必須項目が入力されていないため」というメッセージを処理
              if (
                originalError.includes(
                  "以下の求人は必須項目が入力されていないため",
                )
              ) {
                // メッセージを分割
                const parts = originalError.split(": ");
                if (parts.length === 2) {
                  // 求人名リストを取得
                  const jobNames = parts[1].split("、");
                  // 改行を入れて整形
                  const formattedJobNames = jobNames
                    .map((name) => `・${name.trim()}`)
                    .join("\n");
                  // メッセージを再構成
                  originalError = `${parts[0]}:\n${formattedJobNames}`;
                }
              }

              errorMessage = originalError;
            }
          } else if (error.message) {
            // 通常のエラーメッセージ
            errorMessage = error.message;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        // エラー時のトースト表示
        showToast(errorMessage, "error");
      }
    }

    onChange?.(newStatus);
  };

  return (
    <>
      {status !== "CLOSED" ? (
        <Menu
          id={`job-offer-status-${id}`}
          className={`flex items-center gap-1 px-2 py-1 ${className}`}
          menuClass="p-2"
          activator={({ isOpenMenu }) => (
            <>
              <Box
                className={`h-4 w-4 rounded-full ${statusInfo.colorClass}`}
              />
              <Typography className="shrink-0">{statusInfo.label}</Typography>
              <ArrowDownNarrowIcon
                size={12}
                className={isOpenMenu ? "rotate-180" : ""}
              />
            </>
          )}
        >
          {jobOfferStatuses.map((statusItem) => {
            // 下書き→募集中→募集終了の一方通行で、逆方向には切り替えられない
            const isBlockSwitch =
              status === statusItem ||
              (status !== "DRAFT" && statusItem === "DRAFT");
            return (
              <Button
                key={statusItem}
                disabled={isBlockSwitch}
                className="flex w-full items-center gap-4 px-4 py-3 disabled:opacity-30 [&:not(:disabled)]:hover:bg-stone-300/30"
                onClick={() => !isBlockSwitch && handleStatusChange(statusItem)}
              >
                <Box
                  className={`h-4 w-4 rounded-full ${jobOfferStatusIndex[statusItem].colorClass}`}
                />
                <Typography className="flex-1 shrink-0 text-left">
                  {jobOfferStatusIndex[statusItem].label}
                </Typography>
              </Button>
            );
          })}
        </Menu>
      ) : (
        <Box className="flex items-center gap-1 px-2">
          <Box className={`h-4 w-4 rounded-full ${statusInfo.colorClass}`} />
          <Typography className="leading-none">{statusInfo.label}</Typography>
        </Box>
      )}

      {/* トースト通知 */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              whiteSpace: "pre-line", // 改行を表示するために追加
            },
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
