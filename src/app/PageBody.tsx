"use client";
import { useAdminUser } from "@/lib/AdminUserProvider";
import { Box, Link, Stack } from "@mui/material";
import PageTitle from "@/components/common/PageTitle";

export default function Page() {
  const { isSystemAdmin } = useAdminUser();

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
        <Link href="/scouts" className="underline">
          スカウト管理
        </Link>
        <Link href="/applicants" className="underline">
          応募者
        </Link>
        <Link href="/messages" className="underline">
          メッセージ
        </Link>
        <Link href="/company-reminders" className="underline">
          企業への催促
        </Link>
        <Link href="/invoices" className="underline">
          請求
        </Link>
        <Link href="/company-accept-tickets" className="underline">
          企業の採用デポジット
        </Link>
        <Link href="/scout-tickets" className="underline">
          追加スカウトチケット
        </Link>
        <Link href="/magazine" className="underline">
          Magazine
        </Link>
        <Link href="/hot-jobs" className="underline">
          人気求人ランキング
        </Link>
        <Link href="/pick-jobs" className="underline">
          注目の求人
        </Link>
        <Link href="/line-notifications" className="underline">
          LINE通知メッセージ設定
        </Link>
        <Link href="/admin-users" className="underline">
          管理者アカウント
        </Link>
        {isSystemAdmin && (
          <Link href="/allowed-emails" className="underline">
            許可メールアドレス
          </Link>
        )}
      </Stack>
    </Box>
  );
}
