import { Box, Container, Typography } from "@mui/material";
import { CompanyItem } from "@/types/company";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function CompanyAcceptTicketList({
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
    { property: "name", label: "企業名", headCellClass: "w-48" },
    { property: "acceptCount", label: "累計採用" },
    { property: "interviewRate", label: "面談率" },
    { property: "offerRate", label: "内定率" },
    { property: "acceptRate", label: "入社決定率" },
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
        <Typography className="text-left">(退会済企業)</Typography>
      ),
    acceptCount: item.acceptCount,
    interviewRate: `${item.entryCount ? ((item.interviewCount / item.entryCount) * 100).toFixed(1).replace(".0", "") : 0}%`,
    offerRate: `${item.entryCount ? ((item.offerCount / item.entryCount) * 100).toFixed(1).replace(".0", "") : 0}%`,
    acceptRate: `${item.entryCount ? ((item.acceptCount / item.entryCount) * 100).toFixed(1).replace(".0", "") : 0}%`,
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
