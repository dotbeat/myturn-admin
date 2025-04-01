import {
  Checkbox,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export type TableColumn<T = string> = {
  property: T;
  label: string | React.ReactNode;
};

export type TableRow<T extends string> = Record<T, React.ReactNode> &
  Record<"id", number>;

export default function Table({
  columns,
  rows,
  checkboxName,
  className = "",
}: {
  columns: Readonly<TableColumn[]>;
  rows: TableRow<TableColumn["property"]>[];
  checkboxName?: string;
  className?: string;
}) {
  return (
    <MUITable className={`border-separate ${className}`}>
      <TableHead>
        <TableRow className="text-nowrap">
          {checkboxName && <TableCell />}
          {columns.map((column, i) => (
            <TableCell
              key={i}
              align="center"
              className="px-2 py-4 text-base text-[var(--myturn-sub-text)]"
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {checkboxName && (
              <TableCell component="th" scope="row" className="p-2">
                <Checkbox name={checkboxName} size="small" />
              </TableCell>
            )}
            {columns.map((column, j) => (
              <TableCell key={j} align="center" className="p-2 text-base">
                {row[column.property]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MUITable>
  );
}
