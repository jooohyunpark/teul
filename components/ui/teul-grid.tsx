import * as React from "react"

import { cn } from "@/lib/utils"

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
export type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
export type GridItemSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridProps extends React.ComponentProps<"div"> {
  gap?: ResponsiveValue<GapScale>
  rowGap?: ResponsiveValue<GapScale>
  colGap?: ResponsiveValue<GapScale>
}

export interface GridItemProps extends React.ComponentProps<"div"> {
  size?: ResponsiveValue<GridItemSize>
  offset?: ResponsiveValue<GridItemSize>
}

const BREAKPOINTS = [
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly Breakpoint[]
const DEFAULT_SIZE: GridItemSize = 12
const DEFAULT_ROW_GAP: GapScale = 12
const DEFAULT_COL_GAP: GapScale = 8

const sizeMap: Record<Breakpoint, Record<Exclude<GridItemSize, 0>, string>> = {
  base: {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  },
  sm: {
    1: "sm:col-span-1",
    2: "sm:col-span-2",
    3: "sm:col-span-3",
    4: "sm:col-span-4",
    5: "sm:col-span-5",
    6: "sm:col-span-6",
    7: "sm:col-span-7",
    8: "sm:col-span-8",
    9: "sm:col-span-9",
    10: "sm:col-span-10",
    11: "sm:col-span-11",
    12: "sm:col-span-12",
  },
  md: {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    9: "md:col-span-9",
    10: "md:col-span-10",
    11: "md:col-span-11",
    12: "md:col-span-12",
  },
  lg: {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    9: "lg:col-span-9",
    10: "lg:col-span-10",
    11: "lg:col-span-11",
    12: "lg:col-span-12",
  },
  xl: {
    1: "xl:col-span-1",
    2: "xl:col-span-2",
    3: "xl:col-span-3",
    4: "xl:col-span-4",
    5: "xl:col-span-5",
    6: "xl:col-span-6",
    7: "xl:col-span-7",
    8: "xl:col-span-8",
    9: "xl:col-span-9",
    10: "xl:col-span-10",
    11: "xl:col-span-11",
    12: "xl:col-span-12",
  },
  "2xl": {
    1: "2xl:col-span-1",
    2: "2xl:col-span-2",
    3: "2xl:col-span-3",
    4: "2xl:col-span-4",
    5: "2xl:col-span-5",
    6: "2xl:col-span-6",
    7: "2xl:col-span-7",
    8: "2xl:col-span-8",
    9: "2xl:col-span-9",
    10: "2xl:col-span-10",
    11: "2xl:col-span-11",
    12: "2xl:col-span-12",
  },
}

const hiddenMap: Record<Breakpoint, string> = {
  base: "hidden",
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
}

const blockMap: Record<Breakpoint, string> = {
  base: "block",
  sm: "sm:block",
  md: "md:block",
  lg: "lg:block",
  xl: "xl:block",
  "2xl": "2xl:block",
}

const offsetMap: Record<Breakpoint, Record<GridItemSize, string>> = {
  base: {
    0: "col-start-auto",
    1: "col-start-2",
    2: "col-start-3",
    3: "col-start-4",
    4: "col-start-5",
    5: "col-start-6",
    6: "col-start-7",
    7: "col-start-8",
    8: "col-start-9",
    9: "col-start-10",
    10: "col-start-11",
    11: "col-start-12",
    12: "col-start-13",
  },
  sm: {
    0: "sm:col-start-auto",
    1: "sm:col-start-2",
    2: "sm:col-start-3",
    3: "sm:col-start-4",
    4: "sm:col-start-5",
    5: "sm:col-start-6",
    6: "sm:col-start-7",
    7: "sm:col-start-8",
    8: "sm:col-start-9",
    9: "sm:col-start-10",
    10: "sm:col-start-11",
    11: "sm:col-start-12",
    12: "sm:col-start-13",
  },
  md: {
    0: "md:col-start-auto",
    1: "md:col-start-2",
    2: "md:col-start-3",
    3: "md:col-start-4",
    4: "md:col-start-5",
    5: "md:col-start-6",
    6: "md:col-start-7",
    7: "md:col-start-8",
    8: "md:col-start-9",
    9: "md:col-start-10",
    10: "md:col-start-11",
    11: "md:col-start-12",
    12: "md:col-start-13",
  },
  lg: {
    0: "lg:col-start-auto",
    1: "lg:col-start-2",
    2: "lg:col-start-3",
    3: "lg:col-start-4",
    4: "lg:col-start-5",
    5: "lg:col-start-6",
    6: "lg:col-start-7",
    7: "lg:col-start-8",
    8: "lg:col-start-9",
    9: "lg:col-start-10",
    10: "lg:col-start-11",
    11: "lg:col-start-12",
    12: "lg:col-start-13",
  },
  xl: {
    0: "xl:col-start-auto",
    1: "xl:col-start-2",
    2: "xl:col-start-3",
    3: "xl:col-start-4",
    4: "xl:col-start-5",
    5: "xl:col-start-6",
    6: "xl:col-start-7",
    7: "xl:col-start-8",
    8: "xl:col-start-9",
    9: "xl:col-start-10",
    10: "xl:col-start-11",
    11: "xl:col-start-12",
    12: "xl:col-start-13",
  },
  "2xl": {
    0: "2xl:col-start-auto",
    1: "2xl:col-start-2",
    2: "2xl:col-start-3",
    3: "2xl:col-start-4",
    4: "2xl:col-start-5",
    5: "2xl:col-start-6",
    6: "2xl:col-start-7",
    7: "2xl:col-start-8",
    8: "2xl:col-start-9",
    9: "2xl:col-start-10",
    10: "2xl:col-start-11",
    11: "2xl:col-start-12",
    12: "2xl:col-start-13",
  },
}

const rowGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "gap-y-0",
    1: "gap-y-1",
    2: "gap-y-2",
    3: "gap-y-3",
    4: "gap-y-4",
    5: "gap-y-5",
    6: "gap-y-6",
    8: "gap-y-8",
    10: "gap-y-10",
    12: "gap-y-12",
  },
  sm: {
    0: "sm:gap-y-0",
    1: "sm:gap-y-1",
    2: "sm:gap-y-2",
    3: "sm:gap-y-3",
    4: "sm:gap-y-4",
    5: "sm:gap-y-5",
    6: "sm:gap-y-6",
    8: "sm:gap-y-8",
    10: "sm:gap-y-10",
    12: "sm:gap-y-12",
  },
  md: {
    0: "md:gap-y-0",
    1: "md:gap-y-1",
    2: "md:gap-y-2",
    3: "md:gap-y-3",
    4: "md:gap-y-4",
    5: "md:gap-y-5",
    6: "md:gap-y-6",
    8: "md:gap-y-8",
    10: "md:gap-y-10",
    12: "md:gap-y-12",
  },
  lg: {
    0: "lg:gap-y-0",
    1: "lg:gap-y-1",
    2: "lg:gap-y-2",
    3: "lg:gap-y-3",
    4: "lg:gap-y-4",
    5: "lg:gap-y-5",
    6: "lg:gap-y-6",
    8: "lg:gap-y-8",
    10: "lg:gap-y-10",
    12: "lg:gap-y-12",
  },
  xl: {
    0: "xl:gap-y-0",
    1: "xl:gap-y-1",
    2: "xl:gap-y-2",
    3: "xl:gap-y-3",
    4: "xl:gap-y-4",
    5: "xl:gap-y-5",
    6: "xl:gap-y-6",
    8: "xl:gap-y-8",
    10: "xl:gap-y-10",
    12: "xl:gap-y-12",
  },
  "2xl": {
    0: "2xl:gap-y-0",
    1: "2xl:gap-y-1",
    2: "2xl:gap-y-2",
    3: "2xl:gap-y-3",
    4: "2xl:gap-y-4",
    5: "2xl:gap-y-5",
    6: "2xl:gap-y-6",
    8: "2xl:gap-y-8",
    10: "2xl:gap-y-10",
    12: "2xl:gap-y-12",
  },
}

const colGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "gap-x-0",
    1: "gap-x-1",
    2: "gap-x-2",
    3: "gap-x-3",
    4: "gap-x-4",
    5: "gap-x-5",
    6: "gap-x-6",
    8: "gap-x-8",
    10: "gap-x-10",
    12: "gap-x-12",
  },
  sm: {
    0: "sm:gap-x-0",
    1: "sm:gap-x-1",
    2: "sm:gap-x-2",
    3: "sm:gap-x-3",
    4: "sm:gap-x-4",
    5: "sm:gap-x-5",
    6: "sm:gap-x-6",
    8: "sm:gap-x-8",
    10: "sm:gap-x-10",
    12: "sm:gap-x-12",
  },
  md: {
    0: "md:gap-x-0",
    1: "md:gap-x-1",
    2: "md:gap-x-2",
    3: "md:gap-x-3",
    4: "md:gap-x-4",
    5: "md:gap-x-5",
    6: "md:gap-x-6",
    8: "md:gap-x-8",
    10: "md:gap-x-10",
    12: "md:gap-x-12",
  },
  lg: {
    0: "lg:gap-x-0",
    1: "lg:gap-x-1",
    2: "lg:gap-x-2",
    3: "lg:gap-x-3",
    4: "lg:gap-x-4",
    5: "lg:gap-x-5",
    6: "lg:gap-x-6",
    8: "lg:gap-x-8",
    10: "lg:gap-x-10",
    12: "lg:gap-x-12",
  },
  xl: {
    0: "xl:gap-x-0",
    1: "xl:gap-x-1",
    2: "xl:gap-x-2",
    3: "xl:gap-x-3",
    4: "xl:gap-x-4",
    5: "xl:gap-x-5",
    6: "xl:gap-x-6",
    8: "xl:gap-x-8",
    10: "xl:gap-x-10",
    12: "xl:gap-x-12",
  },
  "2xl": {
    0: "2xl:gap-x-0",
    1: "2xl:gap-x-1",
    2: "2xl:gap-x-2",
    3: "2xl:gap-x-3",
    4: "2xl:gap-x-4",
    5: "2xl:gap-x-5",
    6: "2xl:gap-x-6",
    8: "2xl:gap-x-8",
    10: "2xl:gap-x-10",
    12: "2xl:gap-x-12",
  },
}

function toRecord<T>(
  v: ResponsiveValue<T> | undefined
): Partial<Record<Breakpoint, T>> {
  if (v === undefined) return {}
  if (typeof v === "object" && v !== null)
    return v as Partial<Record<Breakpoint, T>>
  return { base: v as T }
}

function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  map: Record<Breakpoint, Record<T, string>>
): string {
  const r = toRecord(value)
  const out: string[] = []
  let last: T | undefined
  for (const bp of BREAKPOINTS) {
    const v = r[bp]
    if (v !== undefined && v !== last) {
      out.push(map[bp][v])
      last = v
    }
  }
  return out.join(" ")
}

function resolveGapAxis(
  shorthand: ResponsiveValue<GapScale> | undefined,
  axis: ResponsiveValue<GapScale> | undefined,
  fallback: GapScale,
  map: Record<Breakpoint, Record<GapScale, string>>
): string {
  const s = toRecord(shorthand)
  const a = toRecord(axis)
  const out: string[] = []
  let current: GapScale = fallback
  let last: GapScale | undefined
  for (const bp of BREAKPOINTS) {
    current = a[bp] ?? s[bp] ?? current
    if (current !== last) {
      out.push(map[bp][current])
      last = current
    }
  }
  return out.join(" ")
}

function resolveSize(value: ResponsiveValue<GridItemSize> | undefined): string {
  const r = toRecord(value)
  const out: string[] = []
  let last: GridItemSize | undefined
  for (const bp of BREAKPOINTS) {
    const v = bp === "base" ? (r.base ?? DEFAULT_SIZE) : r[bp]
    if (v === undefined || v === last) continue
    if (v === 0) {
      out.push(hiddenMap[bp])
    } else {
      out.push(sizeMap[bp][v])
      if (last === 0) out.push(blockMap[bp])
    }
    last = v
  }
  return out.join(" ")
}

function Grid({ gap, rowGap, colGap, className, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid grid-cols-12",
        resolveGapAxis(gap, rowGap, DEFAULT_ROW_GAP, rowGapMap),
        resolveGapAxis(gap, colGap, DEFAULT_COL_GAP, colGapMap),
        className
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
        "min-w-0",
        resolveSize(size),
        resolveResponsive(offset, offsetMap),
        className
      )}
      {...props}
    />
  )
}

export { Grid, GridItem }
