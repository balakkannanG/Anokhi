"use client";

import { MoonStars, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const THEME_KEY = "anokhi-theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = window.localStorage.getItem(THEME_KEY);
    const initialTheme = stored === "dark" || stored === "light"
      ? stored
      : systemPreference.matches ? "dark" : "light";
    applyTheme(initialTheme);
    const frame = window.requestAnimationFrame(() => {
      setIsDark(document.documentElement.dataset.theme === "dark");
    });

    function syncSystemPreference(event: MediaQueryListEvent) {
      if (window.localStorage.getItem(THEME_KEY)) return;
      applyTheme(event.matches ? "dark" : "light");
      setIsDark(event.matches);
    }

    systemPreference.addEventListener("change", syncSystemPreference);
    return () => {
      window.cancelAnimationFrame(frame);
      systemPreference.removeEventListener("change", syncSystemPreference);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    window.localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    setIsDark(nextTheme === "dark");
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="grid size-10 place-items-center text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.96]"
    >
      {isDark ? <Sun size={19} weight="light" className="text-[#d6b36a]" /> : <MoonStars size={19} weight="light" className="text-[var(--anokhi)]" />}
    </button>
  );
}