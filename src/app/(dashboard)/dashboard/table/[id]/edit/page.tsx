import { FormEditTable } from "@/features/table/components/FormEditTable";
import { getTableById } from "@/features/table/services/table.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const table = await getTableById(id);

  return <FormEditTable table={table} />;
}
