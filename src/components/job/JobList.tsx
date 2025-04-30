import { Box, Container, Typography } from "@mui/material";
import { industries, jobTypes } from "@/const/job";
import { JobItem } from "@/types/job";
import { jobOfferStatusIndex } from "@/utils/shared/job";
import { getSelectItem } from "@/utils/shared/select";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function JobList({
  items,
  className = "",
}: {
  items: JobItem[];
  className?: string;
}) {
  const columns = [
    { property: "jobHeader", label: "ヘッダー" },
    { property: "title", label: "求人タイトル" },
    { property: "companyName", label: "企業名" },
    { property: "prefecture", label: "都道府県" },
    { property: "jobType", label: "職種" },
    { property: "industry", label: "業界" },
    { property: "openDate", label: "公開日" },
    { property: "status", label: "ステータス" },
    { property: "pvCount", label: "PV" },
    { property: "favoriteCount", label: "❤️" },
    { property: "applyCount", label: "応募" },
    { property: "acceptCount", label: "採用" },
  ] as const satisfies TableColumn<(keyof JobItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    jobHeader: (
      <Box className="h-12 w-20 object-cover">
        <img
          src={item.jobHeader}
          alt={`${item.companyName}による求人のヘッダー画像`}
          className="h-full w-full object-cover"
        />
      </Box>
    ),
    title: (
      <Typography className="line-clamp-3 w-72 text-wrap text-left">
        {item.title}
      </Typography>
    ),
    companyName: item.companyName,
    prefecture: item.prefecture,
    jobType: getSelectItem(jobTypes, item.jobType)?.label ?? "",
    industry: getSelectItem(industries, item.industry)?.label ?? "",
    openDate: item.openDate?.toLocaleDateString("ja") ?? "—",
    status: jobOfferStatusIndex[item.status]?.label ?? "—",
    pvCount: item.pvCount,
    favoriteCount: item.favoriteCount,
    applyCount: item.applyCount,
    acceptCount: item.acceptCount,
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
