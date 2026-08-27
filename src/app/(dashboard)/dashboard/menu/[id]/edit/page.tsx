import { getCategories } from "@/features/category/services/category.service";
import { FormEditMenu } from "@/features/menu/components/FormEditMenu";
import { getMenuById } from "@/features/menu/services/menu.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const menu = await getMenuById(id);
  const categories = await getCategories();

  return <FormEditMenu menu={menu} categories={categories} />;
}
