/** 求人ピックアップ（ピックアップ期間と期間中の実績） */
export type JobPickup = {
  id: number;
  jobId: number;
  jobTitle: string;
  /** 開始日（JST、YYYY-MM-DD） */
  startDate: string;
  /** 終了日（JST、YYYY-MM-DD） */
  endDate: string;
  amount: number;
  /** 期間中の検索結果での表示回数 */
  searchHitCount: number;
  /** 期間中の求人詳細閲覧数 */
  pvCount: number;
  /** 期間内の求人応募数（未承認スカウトは除く） */
  entryCount: number;
  companyName: string;
  jobType: string;
  industry: string;
};

export type NotifyFn = (message: string, severity: "success" | "error") => void;
