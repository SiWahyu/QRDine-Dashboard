"use client";

import { DataTable } from "@/components/data-table/data-table";
import { menuColumns } from "@/features/menu/components/MenuColumns";
import type { MenuType } from "@/types/menu";

const MenuList = ({ menus }: { menus: MenuType[] }) => {
  return (
    <DataTable
      data={menus}
      columns={menuColumns}
      getRowId={(menu) => String(menu.id)}
      searchKeys={["name", "category"]}
      searchPlaceholder="Search menu, category..."
      resultLabel="menu"
      emptyMessage="No menu yet"
      emptyDescription="Menu placed by customers will appear here."
      emptyFilteredMessage="No menu match your filters"
      emptyFilteredDescription="Try adjusting your search or filter."
      defaultPageSize={5}
    />
  );
};

export default MenuList;
