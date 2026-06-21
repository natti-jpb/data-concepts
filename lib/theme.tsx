"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);
const STORAGE_KEY = "dc-theme";

/* Runs before paint (injected in <head>) so the chosen theme is applied to
   <html> before the first render — no flash of the wrong palette.
   Defaults to light; only a stored "dark" preference opts into dark. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR-safe default; the real value is read from the DOM after mount, matching
  // what themeScript already applied. Mirrors LanguageProvider's approach.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setThemeState(stored === "dark" ? "dark" : "light");
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    window.localStorage.setItem(STORAGE_KEY, t);
    document.documentElement.setAttribute("data-theme", t);
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
