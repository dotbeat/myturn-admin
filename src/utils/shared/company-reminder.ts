import {
  REMINDER_COMPANY_NAME_VARIABLE,
  REMINDER_USER_LIST_VARIABLE,
  reminderDelayTypeIndex,
  reminderDelayTypes,
} from "@/const/company-reminder";
import {
  ReminderDelayType,
  ReminderTargetUser,
  ReminderTemplate,
} from "@/types/company-reminder";

/** 経過日数の表示（当日は「本日」） */
export function formatElapsedDays(elapsedDays: number): string {
  return elapsedDays === 0 ? "本日" : `${elapsedDays}日`;
}

/** 日時から今日までの日数（「◯日前」表示用、当日は0） */
export function daysAgo(date: Date, now: Date = new Date()): number {
  const toDay = (d: Date) =>
    Math.floor(
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000,
    );
  return toDay(now) - toDay(date);
}

/** 「◯日前に催促済み」「◯日前に同送済み」のラベル（催促記録がなければnull） */
export function formatLastReminded(
  user: ReminderTargetUser,
  now: Date = new Date(),
): string | null {
  if (!user.lastRemindedAt) return null;
  const days = daysAgo(user.lastRemindedAt, now);
  const when = days === 0 ? "本日" : `${days}日前に`;
  return `${when}${user.lastRemindedIsOverdue ? "催促済み" : "同送済み"}`;
}

/** 遅延の種類ごとにグループ化し、各グループ内を経過日数の長い順に並べる */
export function groupUsersByDelayType(
  users: ReminderTargetUser[],
): { delayType: ReminderDelayType; users: ReminderTargetUser[] }[] {
  return reminderDelayTypes
    .map((delayType) => ({
      delayType,
      users: users
        .filter((s) => s.delayType === delayType)
        .sort((a, b) => b.elapsedDays - a.elapsedDays),
    }))
    .filter((group) => group.users.length > 0);
}

/**
 * 初期選択（チェック）のルール
 * - グループ内に基準超過の学生が1人もいない → 全員チェックなし
 * - グループ内に基準超過の学生がいる → 全員チェック（以下の例外を除く）
 *   - 催促済み（基準超過の状態で催促済み） → チェックなし
 *   - 同送済み、かつ現在も基準未満 → チェックなし
 *   - 同送済み、かつ現在は基準超過 → チェックあり
 */
export function isInitiallySelected(
  user: ReminderTargetUser,
  group: ReminderTargetUser[],
): boolean {
  if (!group.some((s) => s.isOverdue)) return false;
  if (user.lastRemindedAt === null) return true;
  if (user.lastRemindedIsOverdue) return false;
  return user.isOverdue;
}

/** 初期選択のエントリーIDを求める */
export function getInitialSelection(users: ReminderTargetUser[]): number[] {
  return groupUsersByDelayType(users).flatMap((group) =>
    group.users
      .filter((s) => isInitiallySelected(s, group.users))
      .map((s) => s.entryId),
  );
}

/**
 * 選択した学生を遅延の種類別に整形する
 *
 * 【未対応の新着応募（3名）】
 * ・学生Aさん（応募から7日）
 * ・学生Bさん（応募から4日）
 * ・学生Cさん（本日）
 */
export function buildUserList(users: ReminderTargetUser[]): string {
  return groupUsersByDelayType(users)
    .map(({ delayType, users: group }) => {
      const { label, elapsedPrefix } = reminderDelayTypeIndex[delayType];
      const lines = group.map(
        (s) =>
          `・${s.userName}さん（${s.elapsedDays === 0 ? "本日" : `${elapsedPrefix}${s.elapsedDays}日`}）`,
      );
      return `\n【${label}（${group.length}名）】\n${lines.join("\n")}\n`;
    })
    .join("");
}

/** テンプレートと選択した学生から本文を作成する */
export function buildReminderBody(
  template: ReminderTemplate,
  companyName: string,
  users: ReminderTargetUser[],
): string {
  return template.body
    .replaceAll(REMINDER_COMPANY_NAME_VARIABLE, companyName)
    .replaceAll(REMINDER_USER_LIST_VARIABLE, buildUserList(users));
}
