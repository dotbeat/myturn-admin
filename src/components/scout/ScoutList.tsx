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
import { format } from "date-fns";

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
  PENDING: { label: "未承認", color: "warning" as const },
  ACCEPTED: { label: "承認", color: "success" as const },
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
                <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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
          {items.map((item) => {
            const statusInfo = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.PENDING;
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar
                    src={item.userAvatar}
                    sx={{ width: 40, height: 40 }}
                  >
                    {item.userName?.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Link href={`/users/${item.userId}`} underline="hover">
                    {item.userName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/companies/${item.companyId}`} underline="hover">
                    {item.companyName}
                  </Link>
                </TableCell>
                <TableCell>{item.industry || "-"}</TableCell>
                <TableCell>{item.jobType || "-"}</TableCell>
                <TableCell>{item.jobTitle}</TableCell>
                <TableCell>{format(new Date(item.createdAt), "yyyy/MM/dd")}</TableCell>
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