import { Box, Container, Link, Typography } from "@mui/material";
import { industries, jobTypes } from "@/const/job";
import { ApplicantItem } from "@/types/applicant";
import { applyStatusIndex } from "@/utils/shared/applicant";
import { getSelectItem } from "@/utils/shared/select";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function ApplicantList({
  items,
  isLoading,
  className = "",
}: {
  items: ApplicantItem[];
  isLoading: boolean;
  className?: string;
}) {
  const columns = [
    { property: "avatarUrl", label: "", headCellClass: "w-20" },
    { property: "name", label: "氏名" },
    { property: "companyName", label: "企業名" },
    { property: "jobType", label: "職種" },
    { property: "industry", label: "業界" },
    { property: "jobTitle", label: "求人タイトル", headCellClass: "w-[19rem]" },
    { property: "entryDate", label: "応募日" },
    { property: "status", label: "ステータス" },
    { property: "hasAcceptReport", label: "内定報告" },
    { property: "interviewScheduledAt", label: "1回目面談日" },
    { property: "secondInterviewScheduledAt", label: "2回目面談日" },
    { property: "joinDate", label: "入社予定日" },
  ] as const satisfies TableColumn<(keyof ApplicantItem)[number]>[];

  const before3years = new Date();
  before3years.setFullYear(before3years.getFullYear() - 3);

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    avatarUrl: (
      <Avatar
        src={item.user.avatarUrl}
        size={64}
        href={`/users/${item.user.id}`}
        name={item.user.lastName + item.user.firstName}
        className="-my-1"
      />
    ),
    name:
      item.user.lastName && item.user.firstName ? (
        <Box className="w-28 text-left">
          <Link
            href={`/users/${item.user.id}`}
            title={`${item.user.lastName} ${item.user.firstName}`}
            className="line-clamp-2 text-wrap underline"
          >
            {item.user.lastName} {item.user.firstName}
          </Link>
          {item.user.deletedAt && <Typography>(退会済)</Typography>}
        </Box>
      ) : (
        <Typography>
          {item.user.deletedAt ? "(退会済ユーザー)" : "—"}
        </Typography>
      ),
    companyName:
      !item.job.company.deletedAt ||
      new Date(item.job.company.deletedAt) > before3years ? (
        <Box className="w-48 text-left">
          <Typography
            title={item.job.company.name}
            className="line-clamp-3 text-wrap"
          >
            {item.job.company.name}
          </Typography>
          {item.job.company.deletedAt && <Typography>(退会済)</Typography>}
        </Box>
      ) : (
        <Typography className="text-left">
          {item.job.company.deletedAt ? "(退会済企業)" : "—"}
        </Typography>
      ),
    jobType: getSelectItem(jobTypes, item.job.jobType)?.label ?? "",
    industry: getSelectItem(industries, item.job.industry)?.label ?? "",
    jobTitle: (
      <Typography className="line-clamp-3 w-72 text-wrap text-left">
        {item.job.title}
      </Typography>
    ),
    entryDate: new Date(item.createdAt)?.toLocaleDateString("ja") ?? "—",
    status: applyStatusIndex[item.status]?.label ?? "—",
    hasAcceptReport: item.joinDate ? "あり" : "なし",
    interviewScheduledAt: item.interviewScheduledAt
      ? new Date(item.interviewScheduledAt)?.toLocaleDateString("ja")
      : "—",
    secondInterviewScheduledAt: item.secondInterviewScheduledAt
      ? new Date(item.secondInterviewScheduledAt)?.toLocaleDateString("ja")
      : "—",
    joinDate: item.joinDate
      ? new Date(item.joinDate)?.toLocaleDateString("ja")
      : "—",
  }));

  return (
    <Box className={className}>
      <Table
        columns={columns}
        rows={rows}
        className="text-nowrap py-2 [word-break:break-word]"
      />
      {isLoading && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">読み込み中です</Typography>
        </Container>
      )}
      {!isLoading && items.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">応募者はいません</Typography>
        </Container>
      )}
    </Box>
  );
}
