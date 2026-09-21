import { ReminderDelayType, ReminderTemplate } from "@/types/company-reminder";

/** 遅延の種類の表示順と表示ラベル */
export const reminderDelayTypes = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "OFFERED",
] as const satisfies ReminderDelayType[];

export const reminderDelayTypeIndex: Record<
  ReminderDelayType,
  {
    /** グループ見出し・学生リストの見出し */
    label: string;
    /** 学生リストでの経過日数の接頭辞（例: 応募から7日） */
    elapsedPrefix: string;
  }
> = {
  PENDING: { label: "未対応の新着応募", elapsedPrefix: "応募から" },
  REVIEWING: { label: "未対応のレビュー中", elapsedPrefix: "レビュー開始から" },
  INTERVIEW: {
    label: "ステータス未変更（面談済み）",
    elapsedPrefix: "面談から",
  },
  OFFERED: {
    label: "ステータス未変更（内定）",
    elapsedPrefix: "入社予定日から",
  },
};

/** 本文に差し込む変数 */
export const REMINDER_COMPANY_NAME_VARIABLE = "{企業名}";
export const REMINDER_USER_LIST_VARIABLE = "{学生リスト}";

/**
 * 催促メールのテンプレート（コード内で管理し、管理画面からは編集しない）
 * 初期値は先頭の「標準」
 */
export const reminderTemplates: ReminderTemplate[] = [
  {
    name: "標準",
    subject: "【myturn】選考状況のご確認のお願い",
    body: `{企業名}
ご担当者様

いつもお世話になっております。myturnです。
下記の学生について、ご対応状況をご確認いただけますでしょうか。
{学生リスト}
お手数ですが、管理画面よりステータスの更新をお願いいたします。

ご不明な点がございましたら、本メールにご返信ください。
引き続き、どうぞよろしくお願いいたします。

myturn運営事務局`,
  },
  {
    name: "2回目（回答期限あり）",
    subject: "【myturn】選考状況のご確認のお願い（再送）",
    body: `{企業名}
ご担当者様

いつもお世話になっております。myturnです。
先日ご連絡した件、重ねてのご連絡失礼いたします。
{学生リスト}
学生側の意思決定の都合上、◯月◯日までにご対応いただけますと幸いです。
お手数ですが、管理画面よりステータスの更新をお願いいたします。

ご不明な点がございましたら、本メールにご返信ください。
引き続き、どうぞよろしくお願いいたします。

myturn運営事務局`,
  },
  {
    name: "内定後の手続き確認",
    subject: "【myturn】内定後の手続き状況のご確認",
    body: `{企業名}
ご担当者様

いつもお世話になっております。myturnです。
下記の学生について、その後の手続き状況をお伺いできますでしょうか。
{学生リスト}
承諾・入社日が決まりましたら、管理画面でステータスの更新をお願いいたします。

ご不明な点がございましたら、本メールにご返信ください。
引き続き、どうぞよろしくお願いいたします。

myturn運営事務局`,
  },
];
