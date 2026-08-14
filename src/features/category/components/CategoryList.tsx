"use client";

import { DataTable } from "@/components/data-table/data-table";
import { CategoryType } from "@/types/category";
import { categoryColumns } from "./CategoryColumn";

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <DataTable
      data={categories}
      columns={categoryColumns}
      getRowId={(category) => String(category.id)}
      searchKeys={["name"]}
      searchPlaceholder="Search category..."
      resultLabel="categories"
      emptyMessage="No category yet"
      emptyDescription="Category placed by customers will appear here."
      emptyFilteredMessage="No category match your filters"
      emptyFilteredDescription="Try adjusting your search or filter."
      defaultPageSize={10}
    />
  );
};

export default CategoryList;
