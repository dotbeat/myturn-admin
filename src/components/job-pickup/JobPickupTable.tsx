"use client";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { JobPickup } from "@/types/job-pickup";

const formatDate = (date: string) => date.replaceAll("-", "/");

const columns: { label: string; render: (pickup: JobPickup) => ReactNode }[] = [
  {
    label: "求人タイトル",
    render: (p) => (
      <Typography
        title={p.jobTitle}
        className="line-clamp-3 w-96 text-left text-wrap"
      >
        {p.jobTitle}
      </Typography>
    ),
  },
  { label: "開始日", render: (p) => formatDate(p.startDate) },
  { label: "終了日", render: (p) => formatDate(p.endDate) },
  { label: "請求金額", render: (p) => `${p.amount.toLocaleString()}円` },
  {
    label: "一覧表示数",
    render: (p) => p.searchHitCount.toLocaleString(),
  },
  { label: "詳細閲覧数", render: (p) => p.pvCount.toLocaleString() },
  { label: "応募数", render: (p) => p.entryCount.toLocaleString() },
  {
    label: "企業名",
    render: (p) => (
      <Typography
        title={p.companyName}
        className="line-clamp-3 w-48 text-left text-wrap"
      >
        {p.companyName}
      </Typography>
    ),
  },
  { label: "職種", render: (p) => p.jobType },
  { label: "業界", render: (p) => p.industry },
];

export default function JobPickupTable({
  pickups,
  loading,
  canEdit,
  onEdit,
  onDelete,
}: {
  pickups: JobPickup[];
  loading: boolean;
  canEdit: boolean;
  onEdit: (pickup: JobPickup) => void;
  onDelete: (pickup: JobPickup) => void;
}) {
  return (
    <Box className="mb-4 overflow-x-auto rounded-lg bg-(--background)">
      <Table className="border-separate py-2 text-nowrap [word-break:break-word]">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.label}
                align="center"
                className="p-2 text-base text-(--myturn-sub-text)"
              >
                {column.label}
              </TableCell>
            ))}
            {canEdit && (
              <TableCell className="p-2 text-base text-(--myturn-sub-text)" />
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {pickups.map((pickup) => (
            <TableRow key={pickup.id}>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  align="center"
                  className="p-2 text-base"
                >
                  {column.render(pickup)}
                </TableCell>
              ))}
              {canEdit && (
                <TableCell align="center" className="p-2">
                  <Box className="flex items-center justify-center gap-2">
                    <Button
                      className="rounded-md border border-(--myturn-sub-text) px-2 py-1"
                      onClick={() => onEdit(pickup)}
                    >
                      編集
                    </Button>
                    <Button
                      className="rounded-md border border-red-500 px-2 py-1 text-red-500"
                      onClick={() => onDelete(pickup)}
                    >
                      削除
                    </Button>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">読み込み中です</Typography>
        </Container>
      )}
      {!loading && pickups.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">
            ピックアップ中の求人はありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
