import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/Sidebar/AppSidebar";
import { AppHeader } from "@/layouts/Header/AppHeader";
import { getCurrentUser } from "@/features/auth/services/user.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset className="min-w-0 overflow-hidden">
        <AppHeader />

        <main className="min-w-0 px-6 space-y-6 lg:px-17 no-scrollbar">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
