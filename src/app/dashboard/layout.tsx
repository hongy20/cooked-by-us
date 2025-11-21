import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
