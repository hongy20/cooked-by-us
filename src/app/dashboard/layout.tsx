import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <div className="flex flex-1 w-full">
        {/* Sidebar: positioned below global header */}
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          {/* Dashboard-specific top bar */}
          <header className="flex items-center gap-4 border-b px-6 h-14 md:hidden">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardLayout>{children}</DashboardLayout>
    </Suspense>
  );
}
