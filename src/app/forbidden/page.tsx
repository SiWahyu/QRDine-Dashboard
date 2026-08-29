export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">403</h2>

        <div className="h-10 w-px bg-foreground/30" />

        <div className="text-sm">
          You don't have permission to access this page.
        </div>
      </div>
    </div>
  );
}
