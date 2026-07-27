import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Skeleton,
  Link,
  Avatar,
} from "@mui/material";

type ScoutItem = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  companyId: string;
  companyName: string;
  jobId: string;
  jobTitle: string;
  industry?: string;
  jobType?: string;
  status: string;
  createdAt: string;
};

type Props = {
  items: ScoutItem[];
  isLoading: boolean;
  className?: string;
};

const statusConfig = {
  PENDING: { label: "未承諾", color: "warning" as const },
  ACCEPTED: { label: "承諾", color: "success" as const },
  REJECTED: { label: "辞退", color: "default" as const },
};

export default function ScoutList({ items, isLoading, className }: Props) {
  if (isLoading) {
    return (
      <TableContainer className={className}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>画像</TableCell>
              <TableCell>氏名</TableCell>
              <TableCell>企業名</TableCell>
              <TableCell>業界</TableCell>
              <TableCell>職種</TableCell>
              <TableCell>求人タイトル</TableCell>
              <TableCell>スカウト日</TableCell>
              <TableCell>ステータス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="circular" width={40} height={40} />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer className={className}>
      <Table className="text-nowrap">
        <TableHead>
          <TableRow>
            <TableCell className="pr-0 text-base">画像</TableCell>
            <TableCell className="text-base">氏名</TableCell>
            <TableCell className="text-base">企業名</TableCell>
            <TableCell className="text-base">業界</TableCell>
            <TableCell className="text-base">職種</TableCell>
            <TableCell className="text-base">求人タイトル</TableCell>
            <TableCell className="text-base">スカウト日</TableCell>
            <TableCell className="text-base">ステータス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            const statusInfo =
              statusConfig[item.status as keyof typeof statusConfig] ||
              statusConfig.PENDING;
            return (
              <TableRow key={item.id}>
                <TableCell className="pr-0">
                  <Avatar src={item.userAvatar} sx={{ width: 40, height: 40 }}>
                    {item.userName?.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell className="text-base">
                  <Link href={`/users/${item.userId}`} className="underline">
                    {item.userName}
                  </Link>
                </TableCell>
                <TableCell className="text-base">
                  <Link
                    href={`/companies/${item.companyId}`}
                    className="underline"
                  >
                    {item.companyName}
                  </Link>
                </TableCell>
                <TableCell className="text-base">
                  {item.industry || "-"}
                </TableCell>
                <TableCell className="text-base">
                  {item.jobType || "-"}
                </TableCell>
                <TableCell className="min-w-80 text-wrap text-base">
                  {item.jobTitle}
                </TableCell>
                <TableCell className="text-base">
                  {new Date(item.createdAt).toLocaleDateString("ja")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusInfo.label}
                    color={statusInfo.color}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
