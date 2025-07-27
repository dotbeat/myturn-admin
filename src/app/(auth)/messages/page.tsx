'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ADMIN_MESSAGES } from '../../../server/graphql/message/queries';
import { AdminMessage, AdminMessagesResult } from '../../../types/message';

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
    user?: AdminMessage['user'];
    company?: AdminMessage['company'];
    job: AdminMessage['job'];
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
      if (new Date(message.createdAt) > new Date(groups[entryId].latestMessageAt)) {
        groups[entryId].latestMessageAt = message.createdAt;
      }

      // 未読数をカウント
      if (!message.isRead) {
        groups[entryId].unreadCount++;
      }
    });

    // 各グループ内のメッセージを時系列順にソート
    Object.values(groups).forEach((group) => {
      group.messages.sort((a: AdminMessage, b: AdminMessage) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    });

    return groups;
  }, [data]);

  // グループを最新メッセージ順にソート
  const sortedGroups = useMemo(() => {
    return Object.values(groupedMessages).sort(
      (a, b) => new Date(b.latestMessageAt).getTime() - new Date(a.latestMessageAt).getTime()
    );
  }, [groupedMessages]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setSelectedEntryId(null);
  };

  if (loading) return <div className="p-6">読み込み中...</div>;
  if (error) return <div className="p-6 text-red-600">エラー: {error.message}</div>;

  const selectedGroup = selectedEntryId ? groupedMessages[selectedEntryId] : null;

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">メッセージ管理</h1>

        {/* フィルター */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                検索
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="メッセージ内容、ユーザー名、求人名で検索"
                value={filters.search || ''}
                onChange={(e) =>
                  handleFilterChange({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                企業ID
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="企業IDで絞り込み"
                value={filters.companyId || ''}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    companyId: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ユーザーID
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ユーザーIDで絞り込み"
                value={filters.userId || ''}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    userId: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                求人ID
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="求人IDで絞り込み"
                value={filters.jobId || ''}
                onChange={(e) =>
                  handleFilterChange({
                    ...filters,
                    jobId: e.target.value ? parseInt(e.target.value) : undefined,
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

      <div className="flex-1 flex gap-6 min-h-0">
        {/* 応募一覧 */}
        <div className="w-1/3 bg-white rounded-lg shadow flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              応募一覧 ({sortedGroups.length}件)
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sortedGroups.map((group) => (
              <div
                key={group.entryId}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedEntryId === group.entryId ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                onClick={() => setSelectedEntryId(group.entryId)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        応募ID: {group.entryId}
                      </span>
                      {group.unreadCount > 0 && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          {group.unreadCount}件未読
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 mb-1">
                      <strong>求人:</strong> {group.job.title}
                    </div>

                    <div className="text-sm text-gray-600 mb-1">
                      <strong>応募者:</strong> {group.user ? `${group.user.lastName} ${group.user.firstName}` : '-'}
                    </div>

                    <div className="text-sm text-gray-600">
                      <strong>企業:</strong> {group.company?.name || '-'}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  最終更新: {new Date(group.latestMessageAt).toLocaleString('ja-JP')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* チャット表示 */}
        <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
          {selectedGroup ? (
            <>
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  応募ID: {selectedGroup.entryId} のメッセージ
                </h3>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedGroup.job.title} - {selectedGroup.user?.lastName} {selectedGroup.user?.firstName}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedGroup.messages.map((message) => (
                  <div key={message.id} className="flex flex-col">
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'SYSTEM'
                        ? 'bg-gray-100 text-gray-800 self-center'
                        : message.user
                          ? 'bg-blue-100 text-blue-900 self-start'
                          : 'bg-green-100 text-green-900 self-end'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">
                          {message.type === 'SYSTEM'
                            ? 'システム'
                            : message.user
                              ? `${message.user.lastName} ${message.user.firstName}`
                              : message.company?.name || '企業'}
                        </span>
                        <span
                          className={`px-1 py-0.5 text-xs rounded ${message.type === 'ENTRY'
                            ? 'bg-blue-200 text-blue-800'
                            : message.type === 'SYSTEM'
                              ? 'bg-gray-200 text-gray-800'
                              : 'bg-green-200 text-green-800'
                            }`}
                        >
                          {message.type}
                        </span>
                        {!message.isRead && (
                          <span className="px-1 py-0.5 text-xs bg-red-200 text-red-800 rounded">
                            未読
                          </span>
                        )}
                      </div>

                      <p className="text-sm">{message.content}</p>

                      <div className="text-xs opacity-75 mt-1">
                        {new Date(message.createdAt).toLocaleString('ja-JP')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              応募を選択してメッセージを表示
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
