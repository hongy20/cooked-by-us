export type ThemeOption = "light" | "dark" | "system";

export const getThemeFromLocalStorage = (): ThemeOption => {
  try {
    return (localStorage.getItem("theme") as ThemeOption) || "system";
  } catch {
    // localStorage unavailable (private window), use default
    return "system";
  }
};

export const setThemeToLocalStorage = (theme: ThemeOption) => {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage unavailable (private mode, etc.)
  }
};

export const applyTheme = (theme?: ThemeOption) => {
  if (!theme) {
    theme = getThemeFromLocalStorage();
  }

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme === "dark" || (theme === "system" && systemDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export function getApplyThemeScript() {
  // Serialize the function to a string, and make sure
  // any accidental </script> inside the code is escaped
  return `(${applyTheme
    .toString()
    .replace(
      /getThemeFromLocalStorage/g,
      `(${getThemeFromLocalStorage.toString()})`,
    )
    .replace(/<\/script>/gi, "<\\/script>")})()`;
}
