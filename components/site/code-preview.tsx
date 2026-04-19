import * as React from "react"
import { cn } from "@/lib/utils"

export function CodePreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-sm border p-6", className)} {...props} />
}
