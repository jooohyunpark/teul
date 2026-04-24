"use client"

import { useState } from "react"

import { Slider } from "@/components/site/slider"
import { Switch } from "@/components/site/switch"
import { cn } from "@/lib/utils"

type CssGridOverflowDemoProps = {
  type?: "grid" | "flex"
}

export function CssGridOverflowDemo({
  type = "grid",
}: CssGridOverflowDemoProps = {}) {
  const [width, setWidth] = useState(700)
  const [showGrid, setShowGrid] = useState(false)

  return (
    <figure className="space-y-4">
      <div className={"relative mx-auto py-12"} style={{ width }}>
        <div
          className={cn(
            "relative",
            type === "grid"
              ? "grid grid-cols-12 gap-8"
              : "flex flex-wrap gap-8",
            showGrid &&
              "before:absolute before:top-1/2 before:left-0 before:h-[200%] before:w-px before:-translate-x-1/2 before:-translate-y-1/2 before:bg-blue-500 before:content-[''] after:absolute after:top-1/2 after:right-0 after:h-[200%] after:w-px after:translate-x-1/2 after:-translate-y-1/2 after:bg-blue-500 after:content-['']",
          )}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-12 rounded bg-muted-foreground/50",
                type === "grid"
                  ? "col-span-4"
                  : "w-[calc((100%-4rem)/3)] min-w-0",
              )}
            />
          ))}
          {showGrid && type === "grid" ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-8"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-x border-dashed border-destructive/60 bg-destructive/20"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-end justify-center gap-12">
        <div className="w-[180px] space-y-2">
          <div className="flex items-baseline justify-between text-sm text-muted-foreground">
            <label htmlFor="container-width-slider">Container width</label>
            <span className="tabular-nums">{width}px</span>
          </div>
          <Slider
            id="container-width-slider"
            value={[width]}
            onValueChange={(value) =>
              setWidth(Array.isArray(value) ? value[0] : value)
            }
            min={300}
            max={700}
            aria-label="Container width"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Switch
            checked={showGrid}
            onCheckedChange={setShowGrid}
            aria-label="Toggle grid outline"
          />
          Show grid
        </label>
      </div>
    </figure>
  )
}
