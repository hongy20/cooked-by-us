"use client";

import { CookingPot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export const NavBar = () => {
  const router = useRouter();

  const signOutHandler = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      router.replace("/");
    }
  };

  return (
    <nav className="flex flex-row justify-between px-5 py-4">
      <Link href={"/"} className="flex flex-row items-center gap-2">
        <CookingPot />
        <p className="hidden md:block font-bold text-xl">Home</p>
      </Link>
      <ul className="flex flex-row items-center gap-6">
        <li>
          <Link href={"/admin"}>Admin</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <button type="button" onClick={signOutHandler}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};
