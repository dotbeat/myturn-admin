import { Box, Container, Typography } from "@mui/material";
import { industries } from "@/const/job";
import { CompanyItem } from "@/types/company";
import { getSelectItem } from "@/utils/shared/select";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function CompanyList({
  items,
  isLoading,
  className = "",
}: {
  items: CompanyItem[];
  isLoading: boolean;
  className?: string;
}) {
  const columns = [
    { property: "iconImageUrl", label: "ロゴ" },
    { property: "name", label: "企業名" },
    { property: "prefecture", label: "都道府県" },
    { property: "industry", label: "業界" },
    { property: "createdAt", label: "登録日" },
    { property: "deletedAt", label: "退会日" },
    { property: "jobCount", label: "掲載求人" },
    { property: "acceptCount", label: "累計採用" },
  ] as const satisfies TableColumn<(keyof CompanyItem)[number]>[];

  const before3years = new Date();
  before3years.setFullYear(before3years.getFullYear() - 3);

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    iconImageUrl: (
      <Avatar
        src={item.iconImageUrl}
        size={64}
        alt={`${item.name}のロゴ`}
        className="-my-1 mx-auto border border-[var(--myturn-border)]"
        imageClass="object-contain"
      />
    ),
    name:
      !item.deletedAt || new Date(item.deletedAt) > before3years ? (
        <Box className="w-48 text-left">
          <Typography title={item.name} className="line-clamp-3 text-wrap">
            {item.name}
          </Typography>
          {item.deletedAt && <Typography>(退会済)</Typography>}
        </Box>
      ) : (
        <Typography className="text-left">
          {item.deletedAt ? "(退会済企業)" : "—"}
        </Typography>
      ),
    prefecture: item.prefecture || "—",
    industry: getSelectItem(industries, item.industry)?.label ?? "—",
    createdAt: new Date(item.createdAt).toLocaleDateString("ja"),
    deletedAt: item.deletedAt
      ? new Date(item.deletedAt).toLocaleDateString("ja")
      : "—",
    jobCount: item.jobCount,
    acceptCount: item.acceptCount,
  }));

  return (
    <Box className={className}>
      <Table columns={columns} rows={rows} className="text-nowrap py-2" />
      {isLoading && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">読み込み中です</Typography>
        </Container>
      )}
      {!isLoading && items.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">
            企業アカウントはありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
