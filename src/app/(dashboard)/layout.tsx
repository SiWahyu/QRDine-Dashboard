import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/Sidebar/AppSidebar";
import { AppHeader } from "@/layouts/Header/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-w-0 overflow-hidden">
        <AppHeader />

        <main className="min-w-0 px-6 space-y-6 lg:px-17 no-scrollbar">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
