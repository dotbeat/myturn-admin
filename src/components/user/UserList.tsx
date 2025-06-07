import { Box, Container, Link, Typography } from "@mui/material";
import { UserItem } from "@/types/user";
import { getSelectItem } from "@/utils/shared/select";
import {
  availableDaysPerWeeks,
  availableDurationMonths,
  availableHoursPerWeeks,
  schoolDepartments,
  schoolGrades,
} from "@/const/user";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function UserList({
  items,
  isLoading,
  className = "",
}: {
  items: UserItem[];
  isLoading: boolean;
  className?: string;
}) {
  const columns = [
    { property: "avatarUrl", label: "" },
    { property: "name", label: "氏名" },
    { property: "prefecture", label: "都道府県" },
    { property: "belong", label: "大学・学部" },
    { property: "department", label: "学科系統" },
    { property: "grade", label: "学年" },
    { property: "createdAt", label: "登録日" },
    { property: "deletedAt", label: "退会日" },
    { property: "availableDaysPerWeek", label: "勤務日数" },
    { property: "availableHoursPerWeek", label: "勤務時間" },
    { property: "availableDurationMonths", label: "継続期間" },
    { property: "entryCount", label: "応募件数" },
  ] as const satisfies TableColumn<(keyof UserItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    avatarUrl: (
      <Avatar
        src={item.avatarUrl}
        size={64}
        href={`/users/${item.id}`}
        name={item.lastName + item.firstName}
        className="-my-1 border border-[var(--myturn-border)]"
      />
    ),
    name:
      item.lastName && item.firstName ? (
        <Box className="w-28 text-left">
          <Link
            href={`/users/${item.id}`}
            title={`${item.lastName} ${item.firstName}`}
            className="line-clamp-2 text-wrap underline"
          >
            {item.lastName} {item.firstName}
          </Link>
          {item.deletedAt && <Typography>(退会済)</Typography>}
        </Box>
      ) : (
        "—"
      ),
    prefecture: item.prefecture || "—",
    belong:
      item.university && item.faculty ? (
        <Typography
          title={`${item.university} ${item.faculty}`}
          className="line-clamp-3 w-44 text-wrap text-left"
        >
          {item.university} {item.faculty}
        </Typography>
      ) : (
        "—"
      ),
    department: getSelectItem(schoolDepartments, item.department)?.label ?? "—",
    grade: getSelectItem(schoolGrades, item.grade)?.label ?? "—",
    createdAt: new Date(item.createdAt).toLocaleDateString("ja"),
    deletedAt: item.deletedAt
      ? new Date(item.deletedAt).toLocaleDateString("ja")
      : "—",
    availableDaysPerWeek:
      getSelectItem(availableDaysPerWeeks, item.availableDaysPerWeek)?.label ??
      "—",
    availableHoursPerWeek:
      getSelectItem(availableHoursPerWeeks, item.availableHoursPerWeek)
        ?.label ?? "—",
    availableDurationMonths:
      getSelectItem(availableDurationMonths, item.availableDurationMonths)
        ?.label ?? "—",
    entryCount: item.entryCount,
  }));

  return (
    <Box className={className}>
      <Table
        columns={columns}
        rows={rows}
        className="text-nowrap py-2 [word-break:break-word]"
      />
      {isLoading && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">読み込み中です</Typography>
        </Container>
      )}
      {!isLoading && items.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">
            求職者アカウントはありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
