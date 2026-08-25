import { FormEditCategory } from "@/features/category/components/FormEditCategory";
import { getCategoryById } from "@/features/category/services/category.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await getCategoryById(id);

  return <FormEditCategory category={category} />;
}
