import { HotJobIndicator } from "@/schemas/hot-job/edit";
import { PickJobIndicator } from "@/schemas/pick-job/edit";

export interface JobScoringWeightMeta {
  label: string;
  description: string;
}

export const HOT_JOB_WEIGHT_METADATA: Record<
  HotJobIndicator,
  JobScoringWeightMeta
> = {
  applicationCount: {
    label: "応募数",
    description: "直近30日の応募数（全体最大値で正規化）",
  },
  applicationRate: {
    label: "応募率",
    description: "直近30日の応募数 ÷ 閲覧数",
  },
  acceptedCount: {
    label: "入社決定数",
    description: "累計入社決定数",
  },
  acceptanceRate: {
    label: "入社率",
    description: "直近30日の入社決定数 ÷ 内定数",
  },
  favoriteCount: {
    label: "お気に入り",
    description: "累計お気に入り数",
  },
};

export const PICK_JOB_WEIGHT_METADATA: Record<
  PickJobIndicator,
  JobScoringWeightMeta
> = {
  responseSpeed: {
    label: "応募対応時間",
    description: "直近30日の平均対応時間（逆スコア化）",
  },
  replyRate: {
    label: "返信率",
    description: "直近30日の返信数 ÷ 応募数",
  },
  interviewRate: {
    label: "面談率(一次)",
    description: "直近30日の面談数 ÷ 応募数",
  },
  offerRate: {
    label: "内定率",
    description: "直近30日の内定数 ÷ 面談数",
  },
  pvCount: {
    label: "PV",
    description: "直近7日のログインユーザーのユニークPV",
  },
  favoriteCount: {
    label: "お気に入り",
    description: "直近7日のお気に入り増加数",
  },
};
