"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export const NavBar = () => {
  const signOutHandler = () => {
    authClient.signOut();
  };
  return (
    <nav>
      <Link href={"/admin"}>Admin</Link>
      <Link href={"/sign-in"}>Sign In</Link>
      <button type="button" onClick={() => signOutHandler()}>
        Sign Out
      </button>
    </nav>
  );
};
