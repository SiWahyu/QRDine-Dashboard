import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/features/auth/services/user.service";
import { AppHeader } from "@/layouts/Header/AppHeader";
import { AppSidebar } from "@/layouts/Sidebar/AppSidebar";

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
