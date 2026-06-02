import * as React from "react"
import { cn } from "@/lib/utils"

export function Block({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("flex flex-col gap-6 py-10", className)}
      {...props}
    />
  )
}
