"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/site/tabs"

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

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
    return null
  }

  return (
    <Tabs value={resolvedTheme} onValueChange={(v) => setTheme(String(v))}>
      <TabsList aria-label="Theme">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <TabsTrigger key={value} value={value} aria-label={label}>
            <Icon className="size-3.5" />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
