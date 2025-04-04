import { Box, Container, Typography } from "@mui/material";
import { UserItem } from "@/types/user";
import { getSelectItem } from "@/utils/shared/select";
import {
  availableDaysPerWeeks,
  availableDurationMonths,
  availableHoursPerWeeks,
  departments,
  schoolGrades,
} from "@/const/user";
import Avatar from "@/components/common/Avatar";
import Table, { TableColumn, TableRow } from "@/components/common/Table";

export default function UserList({
  items,
  className = "",
}: {
  items: UserItem[];
  className?: string;
}) {
  const columns = [
    { property: "avatarUrl", label: "" },
    { property: "name", label: "氏名" },
    { property: "prefecture", label: "都道府県" },
    { property: "belong", label: "大学・学部" },
    { property: "department", label: "学科系統" },
    { property: "grade", label: "学年" },
    { property: "registerDate", label: "登録日" },
    { property: "leaveDate", label: "退会日" },
    { property: "availableDaysPerWeek", label: "勤務日数" },
    { property: "availableHoursPerWeek", label: "勤務時間" },
    { property: "availableDurationMonths", label: "継続期間" },
    { property: "applyCount", label: "応募件数" },
  ] as const satisfies TableColumn<(keyof UserItem)[number]>[];

  const rows: TableRow<TableColumn["property"]>[] = items.map((item) => ({
    id: item.id,
    avatarUrl: (
      <Avatar
        src={item.avatarUrl}
        size={64}
        name={item.lastName + item.firstName}
        className="-my-1"
      />
    ),
    name: `${item.lastName} ${item.firstName}`,
    prefecture: item.prefecture,
    belong: (
      <Box>
        <Typography>{item.university}</Typography>
        <Typography>{item.faculty}</Typography>
      </Box>
    ),
    department: getSelectItem(departments, item.department)?.label ?? "",
    grade: getSelectItem(schoolGrades, item.grade)?.label ?? "",
    registerDate: item.registerDate?.toLocaleDateString("ja") ?? "—",
    leaveDate: item.leaveDate?.toLocaleDateString("ja") ?? "—",
    availableDaysPerWeek:
      getSelectItem(availableDaysPerWeeks, item.availableDaysPerWeek)?.label ??
      "",
    availableHoursPerWeek:
      getSelectItem(availableHoursPerWeeks, item.availableHoursPerWeek)
        ?.label ?? "",
    availableDurationMonths:
      getSelectItem(availableDurationMonths, item.availableDurationMonths)
        ?.label ?? "",
    applyCount: item.applyCount,
  }));

  return (
    <Box className={className}>
      <Table columns={columns} rows={rows} className="text-nowrap py-2" />
      {items.length === 0 && (
        <Container className="flex flex-col items-center gap-4 py-8">
          <Typography className="font-semibold">
            求職者アカウントはありません
          </Typography>
        </Container>
      )}
    </Box>
  );
}
