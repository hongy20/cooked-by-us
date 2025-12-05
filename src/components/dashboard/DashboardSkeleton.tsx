import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-1 w-full">
      {/* Sidebar skeleton */}
      <aside className="hidden md:flex flex-col w-64 border-r p-4 gap-4">
        <Skeleton className="h-8 w-32" /> {/* Logo */}
        <div className="flex flex-col gap-3 mt-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-44" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Mobile topbar skeleton */}
        <header className="flex items-center gap-4 border-b px-6 h-14 md:hidden">
          <Skeleton className="h-6 w-6 rounded" /> {/* SidebarTrigger */}
          <Skeleton className="h-6 w-32" />
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Page title */}
          <Skeleton className="h-8 w-48" />

          {/* Cards grid (fake data summaries) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Large content area */}
          <Skeleton className="h-[400px] w-full" />
        </main>
      </div>
    </div>
  );
};
