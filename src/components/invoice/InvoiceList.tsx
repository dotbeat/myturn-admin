import { Box, Button, Container, Link, Typography } from "@mui/material";
import { InvoiceItem } from "@/types/invoice";
import { getSelectItem } from "@/utils/shared/select";
import Table, { TableColumn, TableRow } from "@/components/common/Table";
import { invoceServices } from "@/const/invoice";

export default function InvoiceList({
  items,
  isLoading,
  onEditInvoice,
  onGuaranteeInvoice,
  className = "",
}: {
  items: InvoiceItem[];
  isLoading: boolean;
  onEditInvoice: (item: InvoiceItem) => void;
  onGuaranteeInvoice: (item: InvoiceItem) => void;
  className?: string;
}) {
  const columns = [
    { property: "acceptDate", label: "入社日" },
    { property: "paymentLimitDate", label: "お支払い期限" },
    { property: "content", label: "内訳" },
    { property: "service", label: "サービス" },
    { property: "amount", label: "金額" },
    { property: "companyName", label: "採用企業" },
    { property: "actions", label: "" },
  ] as const satisfies TableColumn<(keyof InvoiceItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    acceptDate: new Date(item.acceptDate).toLocaleDateString("ja"),
    paymentLimitDate: item.paymentLimitDate
      ? new Date(item.paymentLimitDate).toLocaleDateString("ja")
      : "—",
    content: (
      <Typography className="line-clamp-3 w-[15rem] text-wrap text-left">
        {item.isDeposit ? "採用デポジット消費：" : "採用成果報酬："}
        {item.applicantName ? (
          <Link
            href={`/users/${item.userId}`}
            className="text-[var(--myturn-main)] underline"
          >
            {item.applicantName}
          </Link>
        ) : (
          "(名前未設定ユーザー)"
        )}
      </Typography>
    ),
    service:
      getSelectItem(invoceServices, item.service)?.label + "インターン採用",
    amount: item.isDeposit ? "—" : item.amount.toLocaleString("en") + "円",
    companyName: item.companyName,
    actions: (
      <Box className="flex items-center justify-center gap-2">
        <Button
          className="rounded-md border border-[var(--myturn-sub-text)] px-2 py-1"
          onClick={() => onEditInvoice(item)}
        >
          編集
        </Button>
        <Button
          className="rounded-md border border-[var(--myturn-sub-text)] px-2 py-1"
          onClick={() => onGuaranteeInvoice(item)}
        >
          早期退職保証
        </Button>
      </Box>
    ),
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
