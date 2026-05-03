"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/site/button"

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // next-themes only knows the real theme on the client, so we must render
  // a neutral placeholder for SSR + first paint to avoid hydration mismatch.
  // useSyncExternalStore is React's built-in "server value vs. client value"
  // primitive: getServerSnapshot runs on SSR + initial hydration, getSnapshot
  // runs after — so `mounted` is false on the server, true thereafter, with
  // no setState-in-effect (which react-hooks/set-state-in-effect flags).
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    return <div className="h-8 w-[104px] rounded-lg bg-muted" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
