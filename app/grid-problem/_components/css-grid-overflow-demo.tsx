"use client"

import { useState } from "react"

import { Slider } from "@/components/site/slider"

export function CssGridOverflowDemo() {
  const [width, setWidth] = useState(700)
  const [cols, setCols] = useState(12)

  return (
    <figure className="space-y-4">
      <div className="mx-auto rounded border p-8" style={{ width }}>
        <div
          className="grid gap-x-6"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="col-span-1 rounded bg-muted p-2 text-center text-xs tabular-nums"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-[120px] space-y-2">
          <div className="flex items-baseline justify-between text-sm text-muted-foreground">
            <label htmlFor="column-count-slider">Columns</label>
            <span className="tabular-nums">{cols}</span>
          </div>
          <Slider
            id="column-count-slider"
            value={[cols]}
            onValueChange={(value) =>
              setCols(Array.isArray(value) ? value[0] : value)
            }
            min={1}
            max={12}
            step={1}
            aria-label="Column count"
          />
        </div>

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
            min={200}
            max={700}
            aria-label="Container width"
          />
        </div>
      </div>
    </figure>
  )
}
