import * as React from "react"
import { cn } from "@/lib/utils"

// --- Types ---

/** Tailwind breakpoint keys. `xs` = no prefix (mobile-first base). */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

/**
 * A single value applied at every breakpoint, or a partial record of
 * per-breakpoint values. Mobile-first: `xs` is the base, and each larger
 * breakpoint overrides it when set.
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

/** Supported spacing scale for `gap`, `rowGap`, `colGap`. */
export type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12

/** Column span values. The grid is fixed at 12 columns. */
export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shorthand gap applied to both axes. */
  gap?: ResponsiveValue<GapScale>
  /** Vertical gap between rows. Overrides `gap` on the row axis. */
  rowGap?: ResponsiveValue<GapScale>
  /** Horizontal gap between columns. Overrides `gap` on the column axis. */
  colGap?: ResponsiveValue<GapScale>
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span (1–12). */
  size?: ResponsiveValue<ColSize>
  /** Leading empty columns. `offset={2}` starts the column at grid line 3. */
  offset?: ResponsiveValue<ColSize>
}

// --- Class maps ---
//
// Tailwind's JIT compiler only picks up class names that appear as complete
// string literals in the source. These maps enumerate every class we might
// render so the compiler sees each one verbatim.

const sizeMap: Record<Breakpoint, Record<ColSize, string>> = {
  xs: {
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
}

// `offset` is 0-indexed: offset={N} maps to col-start-(N+1).
const offsetMap: Record<Breakpoint, Record<ColSize, string>> = {
  xs: {
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
}

const gapMap: Record<Breakpoint, Record<GapScale, string>> = {
  xs: {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  },
  sm: {
    0: "sm:gap-0",
    1: "sm:gap-1",
    2: "sm:gap-2",
    3: "sm:gap-3",
    4: "sm:gap-4",
    5: "sm:gap-5",
    6: "sm:gap-6",
    8: "sm:gap-8",
    10: "sm:gap-10",
    12: "sm:gap-12",
  },
  md: {
    0: "md:gap-0",
    1: "md:gap-1",
    2: "md:gap-2",
    3: "md:gap-3",
    4: "md:gap-4",
    5: "md:gap-5",
    6: "md:gap-6",
    8: "md:gap-8",
    10: "md:gap-10",
    12: "md:gap-12",
  },
  lg: {
    0: "lg:gap-0",
    1: "lg:gap-1",
    2: "lg:gap-2",
    3: "lg:gap-3",
    4: "lg:gap-4",
    5: "lg:gap-5",
    6: "lg:gap-6",
    8: "lg:gap-8",
    10: "lg:gap-10",
    12: "lg:gap-12",
  },
  xl: {
    0: "xl:gap-0",
    1: "xl:gap-1",
    2: "xl:gap-2",
    3: "xl:gap-3",
    4: "xl:gap-4",
    5: "xl:gap-5",
    6: "xl:gap-6",
    8: "xl:gap-8",
    10: "xl:gap-10",
    12: "xl:gap-12",
  },
}

const rowGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  xs: {
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
}

const colGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  xs: {
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
}

// --- Resolver ---

const BREAKPOINTS = ["xs", "sm", "md", "lg", "xl"] as const

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

// --- Components ---

/**
 * A 12-column CSS Grid container. Children are expected to be `<Col>`.
 *
 * ```tsx
 * <Grid gap={{ xs: 2, md: 6 }}>
 *   <Col size={{ xs: 12, md: 8 }}>Main</Col>
 *   <Col size={{ xs: 12, md: 4 }}>Sidebar</Col>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ gap, rowGap, colGap, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-12",
        resolveResponsive(gap, gapMap),
        resolveResponsive(rowGap, rowGapMap),
        resolveResponsive(colGap, colGapMap),
        className,
      )}
      {...props}
    />
  ),
)
Grid.displayName = "Grid"

/**
 * A grid cell that spans `size` columns (out of 12). `offset` skips N
 * leading columns — `offset={2}` starts at grid column line 3.
 */
export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({ size, offset, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        resolveResponsive(size, sizeMap),
        resolveResponsive(offset, offsetMap),
        className,
      )}
      {...props}
    />
  ),
)
Col.displayName = "Col"
