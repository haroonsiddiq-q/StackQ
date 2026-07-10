"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme(); 
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      data-cursor-expand
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} 
      className="p-2 bg-border"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="w-4 h-4 shrink-0 stroke-current stroke-3" /> : <Moon className="w-4 h-4 shrink-0 stroke-current stroke-3" />}
    </button>
  );
}