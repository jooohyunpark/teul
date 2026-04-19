"use client"

import { Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Tabs, TabsList, TabsTrigger } from "@/components/site/tabs"

const OPTIONS = [
  { value: "system", label: "System", icon: Laptop },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Tabs value={theme ?? "system"} onValueChange={(v) => setTheme(String(v))}>
      <TabsList aria-label="Theme">
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <TabsTrigger key={value} value={value} aria-label={label}>
            <Icon />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
