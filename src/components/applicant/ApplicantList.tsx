import { Box, Container, Typography } from "@mui/material";
import { industries, jobTypes } from "@/const/job";
import { ApplicantItem } from "@/types/applicant";
import { applyStatusIndex } from "@/utils/shared/applicant";
import { getSelectItem } from "@/utils/shared/select";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function ApplicantList({
  items,
  className = "",
}: {
  items: ApplicantItem[];
  className?: string;
}) {
  const columns = [
    { property: "avatarUrl", label: "", headCellClass: "w-20" },
    { property: "name", label: "氏名" },
    { property: "companyName", label: "企業名" },
    { property: "jobType", label: "職種" },
    { property: "industry", label: "業界" },
    { property: "jobTitle", label: "求人タイトル", headCellClass: "w-[19rem]" },
    { property: "applyDate", label: "応募日" },
    { property: "status", label: "ステータス" },
  ] as const satisfies TableColumn<(keyof ApplicantItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    avatarUrl: (
      <Avatar
        src={item.avatarUrl}
        size={64}
        name={item.lastName + item.firstName}
        className="-my-1"
      />
    ),
    name: `${item.lastName} ${item.firstName}`,
    companyName: item.companyName,
    jobType: getSelectItem(jobTypes, item.jobType)?.label ?? "",
    industry: getSelectItem(industries, item.industry)?.label ?? "",
    jobTitle: (
      <Typography className="line-clamp-3 w-72 text-wrap text-left">
        {item.jobTitle}
      </Typography>
    ),
    applyDate: item.applyDate?.toLocaleDateString("ja") ?? "—",
    status: applyStatusIndex[item.status]?.label ?? "—",
  }));

  return (
    <Box className={className}>
      <Table
        columns={columns}
        rows={rows}
        className="text-nowrap py-2 [word-break:break-word]"
      />
      {items.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">
            企業アカウントはありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
