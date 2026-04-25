import { notFound } from "next/navigation"

import {
  Grid,
  GridItem,
  type GapScale,
  type GridItemSize,
  type ResponsiveValue,
} from "@/components/ui/teul"

type ItemConfig = {
  size?: ResponsiveValue<GridItemSize>
  offset?: ResponsiveValue<GridItemSize>
}

type FixtureConfig = {
  containerWidth: number
  gap?: ResponsiveValue<GapScale>
  rowGap?: ResponsiveValue<GapScale>
  colGap?: ResponsiveValue<GapScale>
  items: ItemConfig[]
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ cfg?: string }>
}) {
  if (process.env.NODE_ENV === "production") notFound()

  const { cfg } = await searchParams
  if (!cfg) {
    return <div data-testid="missing-cfg">missing cfg</div>
  }

  const config: FixtureConfig = JSON.parse(cfg)
  const { containerWidth, gap, rowGap, colGap, items } = config

  return (
    <div
      data-testid="grid-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: containerWidth,
        background: "white",
        zIndex: 100,
      }}
    >
      <Grid gap={gap} rowGap={rowGap} colGap={colGap} data-testid="grid">
        {items.map((item, i) => (
          <GridItem
            key={i}
            size={item.size}
            offset={item.offset}
            data-testid={`item-${i}`}
            style={{ height: 40, background: "#888" }}
          />
        ))}
      </Grid>
    </div>
  )
}
