import { Box, Container, Typography } from "@mui/material";
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
  ] as const satisfies TableColumn<(keyof ApplicantItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    avatarUrl: (
      <Avatar
        src={item.avatarUrl}
        size={64}
        name={item.user.lastName + item.user.firstName}
        className="-my-1"
      />
    ),
    name: (
      <Typography
        title={`${item.user.lastName} ${item.user.firstName}`}
        className="line-clamp-3 w-28 text-wrap text-left"
      >
        {item.user.lastName} {item.user.firstName}
      </Typography>
    ),
    companyName: item.job.company.name,
    jobType: getSelectItem(jobTypes, item.job.jobType)?.label ?? "",
    industry: getSelectItem(industries, item.job.industry)?.label ?? "",
    jobTitle: (
      <Typography className="line-clamp-3 w-72 text-wrap text-left">
        {item.job.title}
      </Typography>
    ),
    entryDate: new Date(item.createdAt)?.toLocaleDateString("ja") ?? "—",
    status: applyStatusIndex[item.status]?.label ?? "—",
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
