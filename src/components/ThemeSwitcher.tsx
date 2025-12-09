"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type ThemeOption = "light" | "dark" | "system";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeOption>("system");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((value: ThemeOption) => {
    const root = document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (value === "dark" || (value === "system" && systemDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme immediately when component mounts
    const stored = (localStorage.getItem("theme") as ThemeOption) || "system";
    setTheme(stored);

    // Only apply if not already applied by the head script
    const isDark = document.documentElement.classList.contains("dark");
    const shouldBeDark =
      stored === "dark" ||
      (stored === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark !== shouldBeDark) {
      applyTheme(stored);
    }

    setMounted(true);
  }, [applyTheme]);

  useEffect(() => {
    // Update theme if OS changes and mode is "system"
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  const onSelectHandler = (value: ThemeOption) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  return (
    <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700">
      {mounted
        ? [
            { option: "light" as const, icon: Sun },
            { option: "dark" as const, icon: Moon },
            { option: "system" as const, icon: Monitor },
          ].map(({ option, icon: Icon }) => (
            <button
              type="button"
              key={option}
              onClick={() => onSelectHandler(option)}
              className={`flex items-center justify-center w-8 h-8 transition-colors cursor-pointer ${
                theme === option /* active vs inactive */
                  ? "bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Icon className="size-4" />
            </button>
          ))
        : // Avoid hydration mismatch
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: placeholder
              key={i}
              className="w-8 h-8 rounded-none"
            />
          ))}
    </div>
  );
}
