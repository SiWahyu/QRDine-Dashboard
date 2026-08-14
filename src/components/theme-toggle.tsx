"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type ThemeToggleVariant = "default" | "outline" | "ghost";
type ThemeToggleSize = "default" | "icon";

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ThemeToggleVariant;
  size?: ThemeToggleSize;
}

export const ThemeToggle = ({
  variant = "outline",
  size = "icon",
  className,
  ...props
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={handleTheme}
      className={cn(buttonVariants({ variant, size }), "relative", className)}
      aria-label="Toggle theme"
      {...props}
    >
      <Sun className="transition-all scale-100 rotate-0 size-4 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute transition-all scale-0 rotate-90 size-4 dark:rotate-0 dark:scale-100" />
      {size === "default" && <span className="ml-2">Toggle theme</span>}
    </button>
  );
};
