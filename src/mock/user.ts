import { ApplicantItem } from "@/types/applicant";
import { UserItem } from "@/types/user";

export const mockUsers: UserItem[] = [
  {
    id: 1,
    avatarUrl: "/assets/user/avatar.png",
    lastName: "求職",
    firstName: "引担",
    prefecture: "愛知県",
    university: "名古屋大学",
    faculty: "文学部",
    department: "A",
    grade: "FIRST_YEAR",
    registerDate: new Date(2025, 3, 1),
    leaveDate: null,
    availableDaysPerWeek: 3,
    availableHoursPerWeek: 18,
    availableDurationMonths: 24,
    applyCount: 2,
  },
  {
    id: 2,
    avatarUrl: "/assets/user/avatar.png",
    lastName: "学業",
    firstName: "専念",
    prefecture: "山口県",
    university: "山口大学",
    faculty: "工学部",
    department: "G",
    grade: "SECOND_YEAR",
    registerDate: new Date(2025, 2, 26),
    leaveDate: null,
    availableDaysPerWeek: 4,
    availableHoursPerWeek: 32,
    availableDurationMonths: 12,
    applyCount: 0,
  },
];

export const mockApplicants: ApplicantItem[] = [
  {
    id: 1,
    avatarUrl: "/assets/user/avatar.png",
    lastName: "求職",
    firstName: "引担",
    companyName: "株式会社バベル",
    jobType: "エンジニア",
    industry: "IT",
    jobTitle:
      "理想的なマッチングで世の中を変えたいデータサイエンティストを募集",
    applyDate: new Date(2025, 1, 27),
    status: "PENDING",
  },
];
