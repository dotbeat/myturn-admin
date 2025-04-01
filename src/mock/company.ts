import { CompanyItem } from "@/types/company";

export const mockCompanies: CompanyItem[] = [
  {
    id: 1,
    logo: "/assets/company/logo.png",
    name: "株式会社バベル",
    prefecture: "東京都",
    industry: "IT",
    registerDate: new Date(2025, 1, 27),
    leaveDate: null,
    jobCount: 3,
    acceptCount: 18,
  },
  {
    id: 2,
    logo: "/assets/company/logo.png",
    name: "株式会社ドットビート",
    prefecture: "東京都",
    industry: "IT",
    registerDate: new Date(2022, 11, 6),
    leaveDate: null,
    jobCount: 3,
    acceptCount: 18,
  },
  {
    id: 3,
    logo: "/assets/company/logo.png",
    name: "株式会社◯◯◯◯◯",
    prefecture: "鹿児島県",
    industry: "コンサルティング",
    registerDate: new Date(2005, 11, 28),
    leaveDate: new Date(2024, 0, 8),
    jobCount: 40,
    acceptCount: 1038,
  },
];
