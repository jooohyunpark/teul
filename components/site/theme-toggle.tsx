"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/site/button"

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </Button>
  )
}
