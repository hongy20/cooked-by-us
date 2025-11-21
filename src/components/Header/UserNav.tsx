"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export function UserNav() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast(
        "Login failed",
        error instanceof Error ? { description: error.message } : undefined,
      );
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.replace("/");
    } catch (error) {
      toast(
        "Logout failed",
        error instanceof Error ? { description: error.message } : undefined,
      );
    }
  };

  // Loading state (better-auth fetch in progress)
  if (isPending) {
    return <div className="h-8 w-20 rounded bg-muted animate-pulse" />;
  }

  // Not logged in → show Login CTA
  if (!session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Login</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 p-2">
          <Button
            variant="outline"
            onClick={handleLogin}
            className="flex-row items-center gap-2 w-full"
          >
            <span className="dark:text-gray-300">Login with Google</span>
          </Button>
          <p className="text-muted-foreground pt-2 text-xs text-center">
            Access restricted to authorized accounts
          </p>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Logged in → User menu
  const user = session.user;
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex-row items-center gap-2 w-full"
          >
            <LogOut />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
