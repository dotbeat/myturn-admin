import { Box, Container, Typography } from "@mui/material";
import { industries, jobTypes } from "@/const/job";
import { JobItem } from "@/types/job";
import { jobOfferStatusIndex } from "@/utils/shared/job";
import { getSelectItem } from "@/utils/shared/select";
import { ImageFillIcon } from "@/icons/image/fill";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function JobList({
  items,
  isLoading,
  className = "",
}: {
  items: JobItem[];
  isLoading: boolean;
  className?: string;
}) {
  const columns = [
    { property: "jobHeader", label: "ヘッダー" },
    { property: "title", label: "求人タイトル" },
    { property: "companyName", label: "企業名" },
    { property: "jobType", label: "職種" },
    { property: "industry", label: "業界" },
    { property: "openDate", label: "公開日" },
    { property: "status", label: "ステータス" },
    { property: "pvCount", label: "PV" },
    { property: "favoriteCount", label: "❤️" },
    { property: "entryCount", label: "応募" },
    { property: "acceptCount", label: "採用" },
  ] as const satisfies TableColumn<(keyof JobItem)[number]>[];

  const before3years = new Date();
  before3years.setFullYear(before3years.getFullYear() - 3);

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    jobHeader: (
      <Box className="h-12 w-20 object-cover">
        {item.jobHeader ? (
          <img
            src={item.jobHeader}
            alt={`${item.companyName}による求人のヘッダー画像`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Box className="flex h-full w-full flex-col items-center justify-center bg-[var(--myturn-background)] p-1">
            <ImageFillIcon
              size={44}
              className="text-[var(--myturn-support-middle)]"
            />
          </Box>
        )}
      </Box>
    ),
    title: (
      <Typography
        title={item.title}
        className="line-clamp-3 w-72 text-wrap text-left"
      >
        {item.title}
      </Typography>
    ),
    companyName:
      !item.companyDeletedAt ||
      new Date(item.companyDeletedAt) > before3years ? (
        <Box className="w-48 text-left">
          <Typography
            title={item.companyName}
            className="line-clamp-3 text-wrap"
          >
            {item.companyName}
          </Typography>
          {item.companyDeletedAt && <Typography>(退会済)</Typography>}
        </Box>
      ) : (
        <Typography className="text-left">(退会済企業)</Typography>
      ),
    jobType: getSelectItem(jobTypes, item.jobType)?.label ?? "",
    industry: getSelectItem(industries, item.industry)?.label ?? "",
    openDate: item.id,
    status: jobOfferStatusIndex[item.status]?.label ?? "—",
    pvCount: item.pv,
    favoriteCount: item.favoriteCount,
    entryCount: item.entryCount,
    acceptCount: item.acceptCount,
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
          <Typography className="font-semibold">求人はありません</Typography>
        </Container>
      )}
    </Box>
  );
}
