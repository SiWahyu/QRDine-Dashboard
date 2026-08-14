import { getTables } from "@/features/table/api/tables";
import TableList from "@/features/table/components/TableList";

export default async function Page() {
  const tables = await getTables();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Table</h1>
          <p className="text-sm text-muted-foreground">
            Manage Table information.
          </p>
        </div>
      </div>

      <TableList tables={tables} />
    </div>
  );
}
