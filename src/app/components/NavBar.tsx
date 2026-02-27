"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import SunnyIcon from "./icons/SunnyIcon";
import MoonIcon from "./icons/MoonIcon";

const emptySubscribe = (): () => void => () => {};

const useHasMounted = (): boolean => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
};

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark";
};

const NavBar = () => {
  const hasMounted = useHasMounted();
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!hasMounted) return null;

  const handleTheme = (): void =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="flex items-center justify-between mb-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        dev<span style={{ color: "var(--color-accent)" }}>/</span>finder
      </h1>

      <button
        onClick={handleTheme}
        className="group relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border-glass)",
        }}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <div className="transition-transform duration-500 group-hover:rotate-45">
          {theme === "light" ? (
            <MoonIcon
              width={18}
              height={18}
              style={{ fill: "var(--color-text-secondary)" }}
            />
          ) : (
            <SunnyIcon
              width={18}
              height={18}
              style={{ fill: "var(--color-text-secondary)" }}
            />
          )}
        </div>
      </button>
    </header>
  );
};

export default NavBar;
