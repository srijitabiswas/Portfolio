import { createContext, useContext, useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeChoice;          // what the user picked
  resolvedTheme: ResolvedTheme; // what's actually applied right now
  setTheme: (t: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>(() => {
    return (localStorage.getItem("theme") as ThemeChoice) || "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const stored = localStorage.getItem("theme") as ThemeChoice;
    if (stored === "light" || stored === "dark") return stored;
    return getSystemTheme();
  });

  /* Apply the resolved theme to <html data-theme="..."> so CSS variables
     can switch globally — every component reads colors via var(--...),
     so this single attribute flips the whole site. */
  useEffect(() => {
    const apply = () => {
      const resolved = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    };
    apply();

    // If the user picked "system", keep watching for OS-level changes
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [theme]);

  const setTheme = (t: ThemeChoice) => {
    localStorage.setItem("theme", t);
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}