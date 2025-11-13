"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="border rounded-md w-full max-w-sm mx-1 bg-white p-6 dark:bg-gray-700 flex flex-col gap-2">
      <p className="text-2xl font-bold dark:text-white">Login to Continue</p>

      <button
        type="button"
        className="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow hover:cursor-pointer transition duration-150"
        onClick={() => handleGoogleLogin()}
      >
        <Image
          src="/google.svg"
          className="mr-2"
          alt="Google Icon"
          width={20}
          height={20}
        />
        <span className="dark:text-gray-300">Login with Google</span>
      </button>
    </div>
  );
};

export { Login };
