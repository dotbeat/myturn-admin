import { Box, Container, Typography } from "@mui/material";
import { industries } from "@/const/job";
import { CompanyItem } from "@/types/company";
import { getSelectItem } from "@/utils/shared/select";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function CompanyList({
  items,
  className = "",
}: {
  items: CompanyItem[];
  className?: string;
}) {
  const columns = [
    { property: "logo", label: "ロゴ" },
    { property: "name", label: "企業名" },
    { property: "prefecture", label: "都道府県" },
    { property: "industry", label: "業種" },
    { property: "registerDate", label: "登録日" },
    { property: "leaveDate", label: "退会日" },
    { property: "jobCount", label: "掲載求人" },
    { property: "acceptCount", label: "累計採用" },
  ] as const satisfies TableColumn<(keyof CompanyItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    logo: (
      <Avatar
        src={item.logo}
        size={64}
        alt={`${item.name}のロゴ`}
        className="-my-1"
      />
    ),
    name: item.name,
    prefecture: item.prefecture,
    industry: getSelectItem(industries, item.industry)?.label ?? "",
    registerDate: item.registerDate?.toLocaleDateString("ja") ?? "—",
    leaveDate: item.leaveDate?.toLocaleDateString("ja") ?? "—",
    jobCount: item.jobCount,
    acceptCount: item.acceptCount,
  }));

  return (
    <Box className={className}>
      <Table columns={columns} rows={rows} className="text-nowrap py-2" />
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
