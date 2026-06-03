import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "auto";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    return saved || "auto";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (currentTheme: ThemeMode) => {
      if (currentTheme === "auto") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", systemPrefersDark);
      } else {
        root.classList.toggle("dark", currentTheme === "dark");
      }
    };

    applyTheme(theme);

    // If auto, listen to system changes
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        applyTheme("auto");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const toggleTheme = () => {
    // If toggling manually via header button, we alternate between light and dark
    const root = document.documentElement;
    const isDarkNow = root.classList.contains("dark");
    const next = isDarkNow ? "light" : "dark";
    setThemeMode(next);
  };

  return { theme, setThemeMode, toggleTheme };
};
