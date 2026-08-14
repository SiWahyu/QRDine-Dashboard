"use client";

import { DataTable } from "@/components/data-table/data-table";
import { tableColumns } from "./TableColumns";
import { TableType } from "@/types/table";

const TableList = ({ tables }: { tables: TableType[] }) => {
  return (
    <DataTable
      data={tables}
      columns={tableColumns}
      getRowId={(table) => String(table.id)}
      searchKeys={["name"]}
      searchPlaceholder="Search table..."
      resultLabel="tables"
      emptyMessage="No table yet"
      emptyDescription="Table placed by customers will appear here."
      emptyFilteredMessage="No table match your filters"
      emptyFilteredDescription="Try adjusting your search or filter."
      defaultPageSize={10}
    />
  );
};

export default TableList;
