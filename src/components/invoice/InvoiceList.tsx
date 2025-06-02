import { Box, Container, Link, Typography } from "@mui/material";
import { InvoiceItem } from "@/types/invoice";
import { getSelectItem } from "@/utils/shared/select";
import Table, { TableColumn, TableRow } from "@/components/common/Table";
import { invoceServices } from "@/const/invoice";

export default function InvoiceList({
  items,
  isLoading,
  className = "",
}: {
  items: InvoiceItem[];
  isLoading: boolean;
  className?: string;
}) {
  const columns = [
    { property: "acceptDate", label: "入社日" },
    { property: "paymentLimitDate", label: "お支払い期限" },
    { property: "content", label: "内訳" },
    { property: "service", label: "サービス" },
    { property: "amount", label: "金額" },
    { property: "companyName", label: "採用企業" },
  ] as const satisfies TableColumn<(keyof InvoiceItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    acceptDate: new Date(item.acceptDate).toLocaleDateString("ja"),
    paymentLimitDate: new Date(item.paymentLimitDate).toLocaleDateString("ja"),
    content: (
      <Typography className="line-clamp-3 w-[12.5rem] text-wrap text-left">
        採用成果報酬：
        <Link
          href={`/users/${item.userId}`}
          className="text-[var(--myturn-main)] underline"
        >
          {item.applicantName}
        </Link>
      </Typography>
    ),
    service: (
      <Box className="inline-block rounded border border-current px-2 py-1 text-[var(--myturn-sub-text)]">
        {getSelectItem(invoceServices, item.service)?.label}インターン採用
      </Box>
    ),
    amount: item.amount.toLocaleString("en") + "円",
    companyName: item.companyName,
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
            請求情報はありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
