import { BookOpen, Database, Globe, List } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    label: "Recipe",
    href: "/dashboard",
    icon: BookOpen,
  },
  {
    label: "Category",
    href: "/dashboard/category",
    icon: List,
  },
  {
    label: "Cuisine",
    href: "/dashboard/cuisine",
    icon: Globe,
  },
  {
    label: "Bootstrapping",
    href: "/dashboard/bootstrap",
    icon: Database,
  },
];

export function DashboardSidebar() {
  return (
    // top-16 should match the global header height (4rem);
    // h-[calc(100vh-4rem)] = 100vh - header
    <Sidebar className="top-16 h-[calc(100vh-4rem)] border-r">
      <SidebarHeader className="p-4 text-xl font-semibold">
        Dashboard
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()}
      </SidebarFooter>
    </Sidebar>
  );
}
