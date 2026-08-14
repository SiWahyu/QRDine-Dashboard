import { getMenus } from "@/features/menu/api/menus";
import MenuList from "@/features/menu/components/MenuList";

export default async function Page() {
  const menus = await getMenus();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer Menu, price, and status.
          </p>
        </div>
      </div>

      <MenuList menus={menus} />
    </div>
  );
}
