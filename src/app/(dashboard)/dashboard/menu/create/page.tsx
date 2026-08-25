import { FormCreateMenu } from "@/features/menu/components/FormCreateMenu";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Menu</h1>
          <p className="text-sm text-muted-foreground">Create a new menu.</p>
        </div>
      </div>

      <FormCreateMenu />
    </div>
  );
}
