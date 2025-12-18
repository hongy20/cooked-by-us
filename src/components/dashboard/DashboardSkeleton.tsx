import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="flex w-full flex-1">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 flex-col gap-4 border-r p-4 md:flex">
        <Skeleton className="h-8 w-32" /> {/* Logo */}
        <div className="mt-4 flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-44" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile topbar skeleton */}
        <header className="flex h-14 items-center gap-4 border-b px-6 md:hidden">
          <Skeleton className="h-6 w-6 rounded" /> {/* SidebarTrigger */}
          <Skeleton className="h-6 w-32" />
        </header>

        {/* Main content */}
        <main className="flex-1 space-y-6 p-6">
          {/* Page title */}
          <Skeleton className="h-8 w-48" />

          {/* Cards grid (fake data summaries) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
