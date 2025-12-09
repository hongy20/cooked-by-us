export function getThemeScript() {
  // normal JS/TS code, fully linted
  const code = () => {
    let user = null;
    try {
      user = localStorage.getItem("theme");
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const enabled =
      user === "dark" || ((user === null || user === "system") && systemDark);

    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Serialize the function to a string, and make sure
  // any accidental </script> inside the code is escaped
  return `(${code.toString().replace(/<\/script>/gi, "<\\/script>")})()`;
}
