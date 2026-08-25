import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/layouts/Header/AppHeader";
import { SidebarKitchen } from "@/layouts/SidebarKitchen/SidebarKitchen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarKitchen />

      <SidebarInset className="min-w-0 overflow-hidden">
        <AppHeader />

        <main className="min-w-0 px-6 space-y-6 lg:px-17 no-scrollbar">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
