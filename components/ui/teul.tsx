import * as React from "react"

import { cn } from "@/lib/utils"

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
export type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl", "2xl"] as const
const DEFAULT_ROW_GAP: GapScale = 12
const DEFAULT_COL_GAP: GapScale = 8

const WIDTH_CALC =
  "w-[calc(var(--size,12)/12*(100%+var(--col-gap,0px))-var(--col-gap,0px))]"
const OFFSET_CALC =
  "ml-[calc(var(--offset,0)/12*(100%+var(--col-gap,0px)))]"

const sizeMap: Record<Breakpoint, Record<ColSize, string>> = {
  xs: {
    1: "[--size:1]",
    2: "[--size:2]",
    3: "[--size:3]",
    4: "[--size:4]",
    5: "[--size:5]",
    6: "[--size:6]",
    7: "[--size:7]",
    8: "[--size:8]",
    9: "[--size:9]",
    10: "[--size:10]",
    11: "[--size:11]",
    12: "[--size:12]",
  },
  sm: {
    1: "sm:[--size:1]",
    2: "sm:[--size:2]",
    3: "sm:[--size:3]",
    4: "sm:[--size:4]",
    5: "sm:[--size:5]",
    6: "sm:[--size:6]",
    7: "sm:[--size:7]",
    8: "sm:[--size:8]",
    9: "sm:[--size:9]",
    10: "sm:[--size:10]",
    11: "sm:[--size:11]",
    12: "sm:[--size:12]",
  },
  md: {
    1: "md:[--size:1]",
    2: "md:[--size:2]",
    3: "md:[--size:3]",
    4: "md:[--size:4]",
    5: "md:[--size:5]",
    6: "md:[--size:6]",
    7: "md:[--size:7]",
    8: "md:[--size:8]",
    9: "md:[--size:9]",
    10: "md:[--size:10]",
    11: "md:[--size:11]",
    12: "md:[--size:12]",
  },
  lg: {
    1: "lg:[--size:1]",
    2: "lg:[--size:2]",
    3: "lg:[--size:3]",
    4: "lg:[--size:4]",
    5: "lg:[--size:5]",
    6: "lg:[--size:6]",
    7: "lg:[--size:7]",
    8: "lg:[--size:8]",
    9: "lg:[--size:9]",
    10: "lg:[--size:10]",
    11: "lg:[--size:11]",
    12: "lg:[--size:12]",
  },
  xl: {
    1: "xl:[--size:1]",
    2: "xl:[--size:2]",
    3: "xl:[--size:3]",
    4: "xl:[--size:4]",
    5: "xl:[--size:5]",
    6: "xl:[--size:6]",
    7: "xl:[--size:7]",
    8: "xl:[--size:8]",
    9: "xl:[--size:9]",
    10: "xl:[--size:10]",
    11: "xl:[--size:11]",
    12: "xl:[--size:12]",
  },
  "2xl": {
    1: "2xl:[--size:1]",
    2: "2xl:[--size:2]",
    3: "2xl:[--size:3]",
    4: "2xl:[--size:4]",
    5: "2xl:[--size:5]",
    6: "2xl:[--size:6]",
    7: "2xl:[--size:7]",
    8: "2xl:[--size:8]",
    9: "2xl:[--size:9]",
    10: "2xl:[--size:10]",
    11: "2xl:[--size:11]",
    12: "2xl:[--size:12]",
  },
}

const offsetMap: Record<Breakpoint, Record<ColSize, string>> = {
  xs: {
    1: "[--offset:1]",
    2: "[--offset:2]",
    3: "[--offset:3]",
    4: "[--offset:4]",
    5: "[--offset:5]",
    6: "[--offset:6]",
    7: "[--offset:7]",
    8: "[--offset:8]",
    9: "[--offset:9]",
    10: "[--offset:10]",
    11: "[--offset:11]",
    12: "[--offset:12]",
  },
  sm: {
    1: "sm:[--offset:1]",
    2: "sm:[--offset:2]",
    3: "sm:[--offset:3]",
    4: "sm:[--offset:4]",
    5: "sm:[--offset:5]",
    6: "sm:[--offset:6]",
    7: "sm:[--offset:7]",
    8: "sm:[--offset:8]",
    9: "sm:[--offset:9]",
    10: "sm:[--offset:10]",
    11: "sm:[--offset:11]",
    12: "sm:[--offset:12]",
  },
  md: {
    1: "md:[--offset:1]",
    2: "md:[--offset:2]",
    3: "md:[--offset:3]",
    4: "md:[--offset:4]",
    5: "md:[--offset:5]",
    6: "md:[--offset:6]",
    7: "md:[--offset:7]",
    8: "md:[--offset:8]",
    9: "md:[--offset:9]",
    10: "md:[--offset:10]",
    11: "md:[--offset:11]",
    12: "md:[--offset:12]",
  },
  lg: {
    1: "lg:[--offset:1]",
    2: "lg:[--offset:2]",
    3: "lg:[--offset:3]",
    4: "lg:[--offset:4]",
    5: "lg:[--offset:5]",
    6: "lg:[--offset:6]",
    7: "lg:[--offset:7]",
    8: "lg:[--offset:8]",
    9: "lg:[--offset:9]",
    10: "lg:[--offset:10]",
    11: "lg:[--offset:11]",
    12: "lg:[--offset:12]",
  },
  xl: {
    1: "xl:[--offset:1]",
    2: "xl:[--offset:2]",
    3: "xl:[--offset:3]",
    4: "xl:[--offset:4]",
    5: "xl:[--offset:5]",
    6: "xl:[--offset:6]",
    7: "xl:[--offset:7]",
    8: "xl:[--offset:8]",
    9: "xl:[--offset:9]",
    10: "xl:[--offset:10]",
    11: "xl:[--offset:11]",
    12: "xl:[--offset:12]",
  },
  "2xl": {
    1: "2xl:[--offset:1]",
    2: "2xl:[--offset:2]",
    3: "2xl:[--offset:3]",
    4: "2xl:[--offset:4]",
    5: "2xl:[--offset:5]",
    6: "2xl:[--offset:6]",
    7: "2xl:[--offset:7]",
    8: "2xl:[--offset:8]",
    9: "2xl:[--offset:9]",
    10: "2xl:[--offset:10]",
    11: "2xl:[--offset:11]",
    12: "2xl:[--offset:12]",
  },
}

const rowGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  xs: {
    0: "[--row-gap:0px]",
    1: "[--row-gap:calc(var(--spacing)*1)]",
    2: "[--row-gap:calc(var(--spacing)*2)]",
    3: "[--row-gap:calc(var(--spacing)*3)]",
    4: "[--row-gap:calc(var(--spacing)*4)]",
    5: "[--row-gap:calc(var(--spacing)*5)]",
    6: "[--row-gap:calc(var(--spacing)*6)]",
    8: "[--row-gap:calc(var(--spacing)*8)]",
    10: "[--row-gap:calc(var(--spacing)*10)]",
    12: "[--row-gap:calc(var(--spacing)*12)]",
  },
  sm: {
    0: "sm:[--row-gap:0px]",
    1: "sm:[--row-gap:calc(var(--spacing)*1)]",
    2: "sm:[--row-gap:calc(var(--spacing)*2)]",
    3: "sm:[--row-gap:calc(var(--spacing)*3)]",
    4: "sm:[--row-gap:calc(var(--spacing)*4)]",
    5: "sm:[--row-gap:calc(var(--spacing)*5)]",
    6: "sm:[--row-gap:calc(var(--spacing)*6)]",
    8: "sm:[--row-gap:calc(var(--spacing)*8)]",
    10: "sm:[--row-gap:calc(var(--spacing)*10)]",
    12: "sm:[--row-gap:calc(var(--spacing)*12)]",
  },
  md: {
    0: "md:[--row-gap:0px]",
    1: "md:[--row-gap:calc(var(--spacing)*1)]",
    2: "md:[--row-gap:calc(var(--spacing)*2)]",
    3: "md:[--row-gap:calc(var(--spacing)*3)]",
    4: "md:[--row-gap:calc(var(--spacing)*4)]",
    5: "md:[--row-gap:calc(var(--spacing)*5)]",
    6: "md:[--row-gap:calc(var(--spacing)*6)]",
    8: "md:[--row-gap:calc(var(--spacing)*8)]",
    10: "md:[--row-gap:calc(var(--spacing)*10)]",
    12: "md:[--row-gap:calc(var(--spacing)*12)]",
  },
  lg: {
    0: "lg:[--row-gap:0px]",
    1: "lg:[--row-gap:calc(var(--spacing)*1)]",
    2: "lg:[--row-gap:calc(var(--spacing)*2)]",
    3: "lg:[--row-gap:calc(var(--spacing)*3)]",
    4: "lg:[--row-gap:calc(var(--spacing)*4)]",
    5: "lg:[--row-gap:calc(var(--spacing)*5)]",
    6: "lg:[--row-gap:calc(var(--spacing)*6)]",
    8: "lg:[--row-gap:calc(var(--spacing)*8)]",
    10: "lg:[--row-gap:calc(var(--spacing)*10)]",
    12: "lg:[--row-gap:calc(var(--spacing)*12)]",
  },
  xl: {
    0: "xl:[--row-gap:0px]",
    1: "xl:[--row-gap:calc(var(--spacing)*1)]",
    2: "xl:[--row-gap:calc(var(--spacing)*2)]",
    3: "xl:[--row-gap:calc(var(--spacing)*3)]",
    4: "xl:[--row-gap:calc(var(--spacing)*4)]",
    5: "xl:[--row-gap:calc(var(--spacing)*5)]",
    6: "xl:[--row-gap:calc(var(--spacing)*6)]",
    8: "xl:[--row-gap:calc(var(--spacing)*8)]",
    10: "xl:[--row-gap:calc(var(--spacing)*10)]",
    12: "xl:[--row-gap:calc(var(--spacing)*12)]",
  },
  "2xl": {
    0: "2xl:[--row-gap:0px]",
    1: "2xl:[--row-gap:calc(var(--spacing)*1)]",
    2: "2xl:[--row-gap:calc(var(--spacing)*2)]",
    3: "2xl:[--row-gap:calc(var(--spacing)*3)]",
    4: "2xl:[--row-gap:calc(var(--spacing)*4)]",
    5: "2xl:[--row-gap:calc(var(--spacing)*5)]",
    6: "2xl:[--row-gap:calc(var(--spacing)*6)]",
    8: "2xl:[--row-gap:calc(var(--spacing)*8)]",
    10: "2xl:[--row-gap:calc(var(--spacing)*10)]",
    12: "2xl:[--row-gap:calc(var(--spacing)*12)]",
  },
}

const colGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  xs: {
    0: "[--col-gap:0px]",
    1: "[--col-gap:calc(var(--spacing)*1)]",
    2: "[--col-gap:calc(var(--spacing)*2)]",
    3: "[--col-gap:calc(var(--spacing)*3)]",
    4: "[--col-gap:calc(var(--spacing)*4)]",
    5: "[--col-gap:calc(var(--spacing)*5)]",
    6: "[--col-gap:calc(var(--spacing)*6)]",
    8: "[--col-gap:calc(var(--spacing)*8)]",
    10: "[--col-gap:calc(var(--spacing)*10)]",
    12: "[--col-gap:calc(var(--spacing)*12)]",
  },
  sm: {
    0: "sm:[--col-gap:0px]",
    1: "sm:[--col-gap:calc(var(--spacing)*1)]",
    2: "sm:[--col-gap:calc(var(--spacing)*2)]",
    3: "sm:[--col-gap:calc(var(--spacing)*3)]",
    4: "sm:[--col-gap:calc(var(--spacing)*4)]",
    5: "sm:[--col-gap:calc(var(--spacing)*5)]",
    6: "sm:[--col-gap:calc(var(--spacing)*6)]",
    8: "sm:[--col-gap:calc(var(--spacing)*8)]",
    10: "sm:[--col-gap:calc(var(--spacing)*10)]",
    12: "sm:[--col-gap:calc(var(--spacing)*12)]",
  },
  md: {
    0: "md:[--col-gap:0px]",
    1: "md:[--col-gap:calc(var(--spacing)*1)]",
    2: "md:[--col-gap:calc(var(--spacing)*2)]",
    3: "md:[--col-gap:calc(var(--spacing)*3)]",
    4: "md:[--col-gap:calc(var(--spacing)*4)]",
    5: "md:[--col-gap:calc(var(--spacing)*5)]",
    6: "md:[--col-gap:calc(var(--spacing)*6)]",
    8: "md:[--col-gap:calc(var(--spacing)*8)]",
    10: "md:[--col-gap:calc(var(--spacing)*10)]",
    12: "md:[--col-gap:calc(var(--spacing)*12)]",
  },
  lg: {
    0: "lg:[--col-gap:0px]",
    1: "lg:[--col-gap:calc(var(--spacing)*1)]",
    2: "lg:[--col-gap:calc(var(--spacing)*2)]",
    3: "lg:[--col-gap:calc(var(--spacing)*3)]",
    4: "lg:[--col-gap:calc(var(--spacing)*4)]",
    5: "lg:[--col-gap:calc(var(--spacing)*5)]",
    6: "lg:[--col-gap:calc(var(--spacing)*6)]",
    8: "lg:[--col-gap:calc(var(--spacing)*8)]",
    10: "lg:[--col-gap:calc(var(--spacing)*10)]",
    12: "lg:[--col-gap:calc(var(--spacing)*12)]",
  },
  xl: {
    0: "xl:[--col-gap:0px]",
    1: "xl:[--col-gap:calc(var(--spacing)*1)]",
    2: "xl:[--col-gap:calc(var(--spacing)*2)]",
    3: "xl:[--col-gap:calc(var(--spacing)*3)]",
    4: "xl:[--col-gap:calc(var(--spacing)*4)]",
    5: "xl:[--col-gap:calc(var(--spacing)*5)]",
    6: "xl:[--col-gap:calc(var(--spacing)*6)]",
    8: "xl:[--col-gap:calc(var(--spacing)*8)]",
    10: "xl:[--col-gap:calc(var(--spacing)*10)]",
    12: "xl:[--col-gap:calc(var(--spacing)*12)]",
  },
  "2xl": {
    0: "2xl:[--col-gap:0px]",
    1: "2xl:[--col-gap:calc(var(--spacing)*1)]",
    2: "2xl:[--col-gap:calc(var(--spacing)*2)]",
    3: "2xl:[--col-gap:calc(var(--spacing)*3)]",
    4: "2xl:[--col-gap:calc(var(--spacing)*4)]",
    5: "2xl:[--col-gap:calc(var(--spacing)*5)]",
    6: "2xl:[--col-gap:calc(var(--spacing)*6)]",
    8: "2xl:[--col-gap:calc(var(--spacing)*8)]",
    10: "2xl:[--col-gap:calc(var(--spacing)*10)]",
    12: "2xl:[--col-gap:calc(var(--spacing)*12)]",
  },
}

function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  map: Record<Breakpoint, Record<T, string>>,
): string {
  if (value === undefined) return ""
  if (typeof value !== "object") return map.xs[value]
  return BREAKPOINTS.map((bp) =>
    value[bp] !== undefined ? map[bp][value[bp] as T] : "",
  )
    .filter(Boolean)
    .join(" ")
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
    v === undefined ? {} : typeof v === "object" ? v : { xs: v }
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

function Grid({
  gap,
  rowGap,
  colGap,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  gap?: ResponsiveValue<GapScale>
  rowGap?: ResponsiveValue<GapScale>
  colGap?: ResponsiveValue<GapScale>
}) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "flex flex-wrap gap-x-(--col-gap) gap-y-(--row-gap)",
        resolveGapAxis(gap, rowGap, DEFAULT_ROW_GAP, rowGapMap),
        resolveGapAxis(gap, colGap, DEFAULT_COL_GAP, colGapMap),
        className,
      )}
      {...props}
    />
  )
}

function Col({
  size,
  offset,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  size?: ResponsiveValue<ColSize>
  offset?: ResponsiveValue<ColSize>
}) {
  return (
    <div
      data-slot="col"
      className={cn(
        "flex-none",
        size !== undefined && WIDTH_CALC,
        offset !== undefined && OFFSET_CALC,
        resolveResponsive(size, sizeMap),
        resolveResponsive(offset, offsetMap),
        className,
      )}
      {...props}
    />
  )
}

export { Grid, Col }
