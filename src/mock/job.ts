import { JobItem } from "@/types/job";

export const mockJobs: JobItem[] = [
  {
    id: 1,
    jobHeader: "/assets/company/header.jpg",
    title: "理想的なマッチングで世の中を変えたいデータサイエンティストを募集",
    companyName: "株式会社バベル",
    prefecture: "東京都",
    jobType: "エンジニア",
    industry: "IT",
    openDate: new Date(2025, 1, 27),
    status: "ACTIVE",
    acceptCount: 18,
    applyCount: 3,
  },
  {
    id: 2,
    jobHeader: "/assets/company/header.jpg",
    title: "急成長中のスタートアップで採用・広報インターン！",
    companyName: "株式会社ドットビート",
    prefecture: "東京都",
    jobType: "人事",
    industry: "IT",
    openDate: new Date(2022, 11, 6),
    status: "CLOSED",
    acceptCount: 1038,
    applyCount: 40,
  },
  {
    id: 3,
    jobHeader: "/assets/company/header.jpg",
    title:
      "求人タイトルTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText",
    companyName: "株式会社◯◯◯◯◯",
    prefecture: "鹿児島県",
    jobType: "事務",
    industry: "コンサルティング",
    openDate: null,
    status: "DRAFT",
    acceptCount: 0,
    applyCount: 0,
  },
];
