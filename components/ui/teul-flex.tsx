import * as React from "react"

import { cn } from "@/lib/utils"

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
export type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
export type GridItemSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridProps extends React.ComponentProps<"div"> {
  gap?: ResponsiveValue<GapScale>
  rowGap?: ResponsiveValue<GapScale>
  colGap?: ResponsiveValue<GapScale>
}

export interface GridItemProps extends React.ComponentProps<"div"> {
  size?: ResponsiveValue<GridItemSize>
  offset?: ResponsiveValue<GridItemSize>
}

const BREAKPOINTS = ["base", "sm", "md", "lg", "xl", "2xl"] as const
const DEFAULT_SIZE: GridItemSize = 12
const DEFAULT_ROW_GAP: GapScale = 12
const DEFAULT_COL_GAP: GapScale = 8

// Gutter = visible space between items. Each item carries half on every side via
// padding; the Grid container pulls its own outer edges back with a matching
// negative margin. Because flex-basis fractions then sum to a clean 100% with
// no gap to account for, the row math works at every viewport.

const basisMap: Record<Breakpoint, Record<GridItemSize, string>> = {
  base: {
    1: "basis-1/12",
    2: "basis-2/12",
    3: "basis-3/12",
    4: "basis-4/12",
    5: "basis-5/12",
    6: "basis-6/12",
    7: "basis-7/12",
    8: "basis-8/12",
    9: "basis-9/12",
    10: "basis-10/12",
    11: "basis-11/12",
    12: "basis-full",
  },
  sm: {
    1: "sm:basis-1/12",
    2: "sm:basis-2/12",
    3: "sm:basis-3/12",
    4: "sm:basis-4/12",
    5: "sm:basis-5/12",
    6: "sm:basis-6/12",
    7: "sm:basis-7/12",
    8: "sm:basis-8/12",
    9: "sm:basis-9/12",
    10: "sm:basis-10/12",
    11: "sm:basis-11/12",
    12: "sm:basis-full",
  },
  md: {
    1: "md:basis-1/12",
    2: "md:basis-2/12",
    3: "md:basis-3/12",
    4: "md:basis-4/12",
    5: "md:basis-5/12",
    6: "md:basis-6/12",
    7: "md:basis-7/12",
    8: "md:basis-8/12",
    9: "md:basis-9/12",
    10: "md:basis-10/12",
    11: "md:basis-11/12",
    12: "md:basis-full",
  },
  lg: {
    1: "lg:basis-1/12",
    2: "lg:basis-2/12",
    3: "lg:basis-3/12",
    4: "lg:basis-4/12",
    5: "lg:basis-5/12",
    6: "lg:basis-6/12",
    7: "lg:basis-7/12",
    8: "lg:basis-8/12",
    9: "lg:basis-9/12",
    10: "lg:basis-10/12",
    11: "lg:basis-11/12",
    12: "lg:basis-full",
  },
  xl: {
    1: "xl:basis-1/12",
    2: "xl:basis-2/12",
    3: "xl:basis-3/12",
    4: "xl:basis-4/12",
    5: "xl:basis-5/12",
    6: "xl:basis-6/12",
    7: "xl:basis-7/12",
    8: "xl:basis-8/12",
    9: "xl:basis-9/12",
    10: "xl:basis-10/12",
    11: "xl:basis-11/12",
    12: "xl:basis-full",
  },
  "2xl": {
    1: "2xl:basis-1/12",
    2: "2xl:basis-2/12",
    3: "2xl:basis-3/12",
    4: "2xl:basis-4/12",
    5: "2xl:basis-5/12",
    6: "2xl:basis-6/12",
    7: "2xl:basis-7/12",
    8: "2xl:basis-8/12",
    9: "2xl:basis-9/12",
    10: "2xl:basis-10/12",
    11: "2xl:basis-11/12",
    12: "2xl:basis-full",
  },
}

const offsetMap: Record<Breakpoint, Record<GridItemSize, string>> = {
  base: {
    1: "ml-[calc(1/12*100%)]",
    2: "ml-[calc(2/12*100%)]",
    3: "ml-[calc(3/12*100%)]",
    4: "ml-[calc(4/12*100%)]",
    5: "ml-[calc(5/12*100%)]",
    6: "ml-[calc(6/12*100%)]",
    7: "ml-[calc(7/12*100%)]",
    8: "ml-[calc(8/12*100%)]",
    9: "ml-[calc(9/12*100%)]",
    10: "ml-[calc(10/12*100%)]",
    11: "ml-[calc(11/12*100%)]",
    12: "ml-[calc(12/12*100%)]",
  },
  sm: {
    1: "sm:ml-[calc(1/12*100%)]",
    2: "sm:ml-[calc(2/12*100%)]",
    3: "sm:ml-[calc(3/12*100%)]",
    4: "sm:ml-[calc(4/12*100%)]",
    5: "sm:ml-[calc(5/12*100%)]",
    6: "sm:ml-[calc(6/12*100%)]",
    7: "sm:ml-[calc(7/12*100%)]",
    8: "sm:ml-[calc(8/12*100%)]",
    9: "sm:ml-[calc(9/12*100%)]",
    10: "sm:ml-[calc(10/12*100%)]",
    11: "sm:ml-[calc(11/12*100%)]",
    12: "sm:ml-[calc(12/12*100%)]",
  },
  md: {
    1: "md:ml-[calc(1/12*100%)]",
    2: "md:ml-[calc(2/12*100%)]",
    3: "md:ml-[calc(3/12*100%)]",
    4: "md:ml-[calc(4/12*100%)]",
    5: "md:ml-[calc(5/12*100%)]",
    6: "md:ml-[calc(6/12*100%)]",
    7: "md:ml-[calc(7/12*100%)]",
    8: "md:ml-[calc(8/12*100%)]",
    9: "md:ml-[calc(9/12*100%)]",
    10: "md:ml-[calc(10/12*100%)]",
    11: "md:ml-[calc(11/12*100%)]",
    12: "md:ml-[calc(12/12*100%)]",
  },
  lg: {
    1: "lg:ml-[calc(1/12*100%)]",
    2: "lg:ml-[calc(2/12*100%)]",
    3: "lg:ml-[calc(3/12*100%)]",
    4: "lg:ml-[calc(4/12*100%)]",
    5: "lg:ml-[calc(5/12*100%)]",
    6: "lg:ml-[calc(6/12*100%)]",
    7: "lg:ml-[calc(7/12*100%)]",
    8: "lg:ml-[calc(8/12*100%)]",
    9: "lg:ml-[calc(9/12*100%)]",
    10: "lg:ml-[calc(10/12*100%)]",
    11: "lg:ml-[calc(11/12*100%)]",
    12: "lg:ml-[calc(12/12*100%)]",
  },
  xl: {
    1: "xl:ml-[calc(1/12*100%)]",
    2: "xl:ml-[calc(2/12*100%)]",
    3: "xl:ml-[calc(3/12*100%)]",
    4: "xl:ml-[calc(4/12*100%)]",
    5: "xl:ml-[calc(5/12*100%)]",
    6: "xl:ml-[calc(6/12*100%)]",
    7: "xl:ml-[calc(7/12*100%)]",
    8: "xl:ml-[calc(8/12*100%)]",
    9: "xl:ml-[calc(9/12*100%)]",
    10: "xl:ml-[calc(10/12*100%)]",
    11: "xl:ml-[calc(11/12*100%)]",
    12: "xl:ml-[calc(12/12*100%)]",
  },
  "2xl": {
    1: "2xl:ml-[calc(1/12*100%)]",
    2: "2xl:ml-[calc(2/12*100%)]",
    3: "2xl:ml-[calc(3/12*100%)]",
    4: "2xl:ml-[calc(4/12*100%)]",
    5: "2xl:ml-[calc(5/12*100%)]",
    6: "2xl:ml-[calc(6/12*100%)]",
    7: "2xl:ml-[calc(7/12*100%)]",
    8: "2xl:ml-[calc(8/12*100%)]",
    9: "2xl:ml-[calc(9/12*100%)]",
    10: "2xl:ml-[calc(10/12*100%)]",
    11: "2xl:ml-[calc(11/12*100%)]",
    12: "2xl:ml-[calc(12/12*100%)]",
  },
}

// User-facing GapScale N produces a visible gutter equivalent to Tailwind's
// `gap-N` — so the gutter var holds spacing * (N / 2), applied to each side
// of every item (and negated once on the container).

const rowGutterMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "[--grid-row-gutter:0px]",
    1: "[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
  sm: {
    0: "sm:[--grid-row-gutter:0px]",
    1: "sm:[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "sm:[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "sm:[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "sm:[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "sm:[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "sm:[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "sm:[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "sm:[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "sm:[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
  md: {
    0: "md:[--grid-row-gutter:0px]",
    1: "md:[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "md:[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "md:[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "md:[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "md:[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "md:[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "md:[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "md:[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "md:[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
  lg: {
    0: "lg:[--grid-row-gutter:0px]",
    1: "lg:[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "lg:[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "lg:[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "lg:[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "lg:[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "lg:[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "lg:[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "lg:[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "lg:[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
  xl: {
    0: "xl:[--grid-row-gutter:0px]",
    1: "xl:[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "xl:[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "xl:[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "xl:[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "xl:[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "xl:[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "xl:[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "xl:[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "xl:[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
  "2xl": {
    0: "2xl:[--grid-row-gutter:0px]",
    1: "2xl:[--grid-row-gutter:calc(var(--spacing)*0.5)]",
    2: "2xl:[--grid-row-gutter:calc(var(--spacing)*1)]",
    3: "2xl:[--grid-row-gutter:calc(var(--spacing)*1.5)]",
    4: "2xl:[--grid-row-gutter:calc(var(--spacing)*2)]",
    5: "2xl:[--grid-row-gutter:calc(var(--spacing)*2.5)]",
    6: "2xl:[--grid-row-gutter:calc(var(--spacing)*3)]",
    8: "2xl:[--grid-row-gutter:calc(var(--spacing)*4)]",
    10: "2xl:[--grid-row-gutter:calc(var(--spacing)*5)]",
    12: "2xl:[--grid-row-gutter:calc(var(--spacing)*6)]",
  },
}

const colGutterMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "[--grid-col-gutter:0px]",
    1: "[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
  sm: {
    0: "sm:[--grid-col-gutter:0px]",
    1: "sm:[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "sm:[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "sm:[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "sm:[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "sm:[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "sm:[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "sm:[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "sm:[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "sm:[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
  md: {
    0: "md:[--grid-col-gutter:0px]",
    1: "md:[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "md:[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "md:[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "md:[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "md:[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "md:[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "md:[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "md:[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "md:[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
  lg: {
    0: "lg:[--grid-col-gutter:0px]",
    1: "lg:[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "lg:[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "lg:[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "lg:[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "lg:[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "lg:[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "lg:[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "lg:[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "lg:[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
  xl: {
    0: "xl:[--grid-col-gutter:0px]",
    1: "xl:[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "xl:[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "xl:[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "xl:[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "xl:[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "xl:[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "xl:[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "xl:[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "xl:[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
  "2xl": {
    0: "2xl:[--grid-col-gutter:0px]",
    1: "2xl:[--grid-col-gutter:calc(var(--spacing)*0.5)]",
    2: "2xl:[--grid-col-gutter:calc(var(--spacing)*1)]",
    3: "2xl:[--grid-col-gutter:calc(var(--spacing)*1.5)]",
    4: "2xl:[--grid-col-gutter:calc(var(--spacing)*2)]",
    5: "2xl:[--grid-col-gutter:calc(var(--spacing)*2.5)]",
    6: "2xl:[--grid-col-gutter:calc(var(--spacing)*3)]",
    8: "2xl:[--grid-col-gutter:calc(var(--spacing)*4)]",
    10: "2xl:[--grid-col-gutter:calc(var(--spacing)*5)]",
    12: "2xl:[--grid-col-gutter:calc(var(--spacing)*6)]",
  },
}

function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  map: Record<Breakpoint, Record<T, string>>,
): string {
  if (value === undefined) return ""
  if (typeof value !== "object") return map.base[value]
  const classes: string[] = []
  let last: T | undefined
  for (const bp of BREAKPOINTS) {
    const v = value[bp]
    if (v !== undefined && v !== last) {
      classes.push(map[bp][v])
      last = v
    }
  }
  return classes.join(" ")
}

function resolveGapAxis(
  shorthand: ResponsiveValue<GapScale> | undefined,
  axis: ResponsiveValue<GapScale> | undefined,
  fallback: GapScale,
  map: Record<Breakpoint, Record<GapScale, string>>,
): string {
  const toRecord = (
    v: ResponsiveValue<GapScale> | undefined,
  ): Partial<Record<Breakpoint, GapScale>> =>
    v === undefined ? {} : typeof v === "object" ? v : { base: v }
  const s = toRecord(shorthand)
  const a = toRecord(axis)

  const classes: string[] = []
  let current: GapScale = fallback
  let last: GapScale | undefined
  for (const bp of BREAKPOINTS) {
    current = a[bp] ?? s[bp] ?? current
    if (current !== last) {
      classes.push(map[bp][current])
      last = current
    }
  }
  return classes.join(" ")
}

function Grid({ gap, rowGap, colGap, className, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "flex flex-wrap -mx-(--grid-col-gutter) -my-(--grid-row-gutter)",
        resolveGapAxis(gap, rowGap, DEFAULT_ROW_GAP, rowGutterMap),
        resolveGapAxis(gap, colGap, DEFAULT_COL_GAP, colGutterMap),
        className,
      )}
      {...props}
    />
  )
}

function GridItem({ size, offset, className, ...props }: GridItemProps) {
  return (
    <div
      data-slot="grid-item"
      className={cn(
        "min-w-0 px-(--grid-col-gutter) py-(--grid-row-gutter)",
        resolveResponsive(size ?? DEFAULT_SIZE, basisMap),
        resolveResponsive(offset, offsetMap),
        className,
      )}
      {...props}
    />
  )
}

export { Grid, GridItem }
