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

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/Dayron-Glez/github-user-search"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-glass)",
          }}
          aria-label="View source on GitHub"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            className="transition-transform duration-300 group-hover:scale-110"
            style={{ fill: "var(--color-text-secondary)" }}
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
        </a>

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
      </div>
    </header>
  );
};

export default NavBar;
