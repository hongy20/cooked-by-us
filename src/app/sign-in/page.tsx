"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-md bg-white text-center w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <Image
            src="/google-color.svg"
            alt="Google"
            width={40}
            height={40}
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
