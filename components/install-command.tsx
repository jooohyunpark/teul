"use client"

import * as React from "react"
import { Button } from "@/components/site/button"

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard unavailable (e.g., insecure context). Silently fail.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted px-4 py-3 font-mono text-sm">
      <code className="truncate text-foreground">{command}</code>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copy}
        aria-label="Copy install command"
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}
