import { getCategories } from "@/features/category/api/categories";
import CategoryList from "@/features/category/components/CategoryList";

export default async function Page() {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Category</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer Categories.
          </p>
        </div>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
