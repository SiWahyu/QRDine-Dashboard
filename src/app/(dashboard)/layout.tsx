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
      <SidebarInset>
        <AppHeader />
        <main className="space-y-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
