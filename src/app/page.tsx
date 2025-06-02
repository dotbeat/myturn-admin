import { Metadata } from "next";
import { Box, Link, Stack } from "@mui/material";
import PageTitle from "@/components/common/PageTitle";

export const metadata: Metadata = {
  title: "ダッシュボード - myturn管理",
};

export default function Page() {
  return (
    <Box className="flex-1 px-8 py-6">
      <PageTitle className="mb-8">ダッシュボード</PageTitle>
      <Stack spacing={3}>
        <Link href="/users" className="underline">
          求職者アカウント
        </Link>
        <Link href="/companies" className="underline">
          企業アカウント
        </Link>
        <Link href="/jobs" className="underline">
          求人
        </Link>
        <Link href="/applicants" className="underline">
          応募者
        </Link>
        <Link href="/invoices" className="underline">
          請求
        </Link>
        <Link href="/magazine" className="underline">
          Magazine
        </Link>
      </Stack>
    </Box>
  );
}
