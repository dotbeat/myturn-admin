"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ADMIN_MESSAGES } from "../../../server/graphql/message/queries";
import { AdminMessage, AdminMessagesResult } from "../../../types/message";

interface FilterState {
  companyId?: number;
  userId?: number;
  jobId?: number;
  search?: string;
}

interface GroupedMessages {
  [entryId: number]: {
    entryId: number;
    messages: AdminMessage[];
    user?: AdminMessage["user"];
    company?: AdminMessage["company"];
    job: AdminMessage["job"];
    latestMessageAt: string;
    unreadCount: number;
  };
}

export default function MessagesPage() {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({});
  const limit = 1000; // 大きな値にしてすべてのメッセージを取得

  const { data, loading, error } = useQuery<{
    getAdminMessages: AdminMessagesResult;
  }>(GET_ADMIN_MESSAGES, {
    variables: {
      input: {
        page: 1,
        limit,
        ...filters,
      },
    },
  });

  // メッセージを応募IDごとにグループ化
  const groupedMessages: GroupedMessages = useMemo(() => {
    if (!data?.getAdminMessages?.items) return {};

    const groups: GroupedMessages = {};

    data.getAdminMessages.items.forEach((message) => {
      const entryId = message.entryId;

      if (!groups[entryId]) {
        groups[entryId] = {
          entryId,
          messages: [],
          user: message.user,
          company: message.company,
          job: message.job,
          latestMessageAt: message.createdAt,
          unreadCount: 0,
        };
      } else {
        // ユーザーとカンパニーの情報を更新（両方の情報を保持）
        if (message.user && !groups[entryId].user) {
          groups[entryId].user = message.user;
        }
        if (message.company && !groups[entryId].company) {
          groups[entryId].company = message.company;
        }
      }

      groups[entryId].messages.push(message);

      // 最新メッセージの時刻を更新
      if (
        new Date(message.createdAt) > new Date(groups[entryId].latestMessageAt)
      ) {
        groups[entryId].latestMessageAt = message.createdAt;
      }

      // 未読数をカウント
      if (!message.isRead) {
        groups[entryId].unreadCount++;
      }
    });

    // 各グループ内のメッセージを時系列順にソート
    Object.values(groups).forEach((group) => {
      group.messages.sort(
        (a: AdminMessage, b: AdminMessage) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    });

    return groups;
  }, [data]);

  // グループを最新メッセージ順にソート
  const sortedGroups = useMemo(() => {
    return Object.values(groupedMessages).sort(
      (a, b) =>
        new Date(b.latestMessageAt).getTime() -
        new Date(a.latestMessageAt).getTime(),
    );
  }, [groupedMessages]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setSelectedEntryId(null);
  };

  if (loading) return <div className="p-6">読み込み中...</div>;
  if (error)
    return <div className="p-6 text-red-600">エラー: {error.message}</div>;

  const selectedGroup = selectedEntryId
    ? groupedMessages[selectedEntryId]
    : null;

  return (
    <div className="flex h-screen flex-col p-6">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          メッセージ管理
        </h1>

        {/* フィルター */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                検索
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="メッセージ内容、ユーザー名、求人名で検索"
                value={filters.search || ""}
                onChange={(e) =>
                  handleFilterChange({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                企業ID
              </label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="企業IDで絞り込み"
                value={filters.companyId || ""}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    companyId: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ユーザーID
              </label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ユーザーIDで絞り込み"
                value={filters.userId || ""}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    userId: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                求人ID
              </label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="求人IDで絞り込み"
                value={filters.jobId || ""}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    jobId: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setFilters({});
                setSelectedEntryId(null);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              フィルターをクリア
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-6">
        {/* 応募一覧 */}
        <div className="flex w-1/3 flex-col rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              応募一覧 ({sortedGroups.length}件)
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sortedGroups.map((group) => (
              <div
                key={group.entryId}
                className={`cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50 ${
                  selectedEntryId === group.entryId
                    ? "border-blue-200 bg-blue-50"
                    : ""
                }`}
                onClick={() => setSelectedEntryId(group.entryId)}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        応募ID: {group.entryId}
                      </span>
                      {group.unreadCount > 0 && (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                          {group.unreadCount}件未読
                        </span>
                      )}
                    </div>

                    <div className="mb-1 text-sm text-gray-600">
                      <strong>求人:</strong> {group.job.title}
                    </div>

                    <div className="mb-1 text-sm text-gray-600">
                      <strong>応募者:</strong>{" "}
                      {group.user
                        ? `${group.user.lastName} ${group.user.firstName}`
                        : "-"}
                    </div>

                    <div className="text-sm text-gray-600">
                      <strong>企業:</strong> {group.company?.name || "-"}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  最終更新:{" "}
                  {new Date(group.latestMessageAt).toLocaleString("ja-JP")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* チャット表示 */}
        <div className="flex flex-1 flex-col rounded-lg bg-white shadow">
          {selectedGroup ? (
            <>
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  応募ID: {selectedGroup.entryId} のメッセージ
                </h3>
                <div className="mt-1 text-sm text-gray-600">
                  {selectedGroup.job.title} - {selectedGroup.user?.lastName}{" "}
                  {selectedGroup.user?.firstName}
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                {selectedGroup.messages.map((message) => (
                  <div key={message.id} className="flex flex-col">
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                        message.type === "SYSTEM"
                          ? "self-center bg-gray-100 text-gray-800"
                          : message.user
                            ? "self-start bg-blue-100 text-blue-900"
                            : "self-end bg-green-100 text-green-900"
                      }`}
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium">
                          {message.type === "SYSTEM"
                            ? "システム"
                            : message.user
                              ? `${message.user.lastName} ${message.user.firstName}`
                              : message.company?.name || "企業"}
                        </span>
                        <span
                          className={`rounded px-1 py-0.5 text-xs ${
                            message.type === "ENTRY"
                              ? "bg-blue-200 text-blue-800"
                              : message.type === "SYSTEM"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-green-200 text-green-800"
                          }`}
                        >
                          {message.type}
                        </span>
                        {!message.isRead && (
                          <span className="rounded bg-red-200 px-1 py-0.5 text-xs text-red-800">
                            未読
                          </span>
                        )}
                      </div>

                      <p className="text-sm">{message.content}</p>

                      <div className="mt-1 text-xs opacity-75">
                        {new Date(message.createdAt).toLocaleString("ja-JP")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              応募を選択してメッセージを表示
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
