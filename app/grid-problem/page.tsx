import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Block } from "@/components/site/block"
import { ThemeToggle } from "@/components/site/theme-toggle"

import { CssGridOverflowDemo } from "./_components/css-grid-overflow-demo"

export const metadata: Metadata = {
  title: "On twelve columns — Teul",
  description:
    "Why Teul uses flex-wrap with percentage widths instead of CSS Grid, and what breaks on mobile when you don’t.",
  openGraph: {
    title: "On twelve columns — Teul",
    description:
      "Why Teul uses flex-wrap with percentage widths instead of CSS Grid, and what breaks on mobile when you don’t.",
    type: "article",
  },
}

export default function NotesPage() {
  return (
    <div>
      <Link href="/">
        <ArrowLeft className="size-4" />
      </Link>

      <Block>
        <h1>Why CSS Grid doesn&rsquo;t work for a 12-column layout system</h1>
        <p className="text-muted-foreground">
          Why Teul uses flex-wrap with percentage widths instead of CSS Grid.
        </p>
      </Block>

      <Block>
        <p>
          Every design system I&rsquo;ve built eventually needs a 12-column
          grid, and CSS Grid looks made for the job.{" "}
          <code>grid-template-columns: repeat(12, 1fr)</code> spells out the
          shape literally. So that&rsquo;s where I started.
        </p>
      </Block>

      <Block>
        <figure className="space-y-2">
          <div className="grid grid-cols-12 gap-8 text-center text-xs font-medium">
            <div className="col-span-12 h-12 rounded bg-muted-foreground/50" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="col-span-6 h-12 rounded bg-muted-foreground/50"
              />
            ))}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="col-span-4 h-12 rounded bg-muted-foreground/50"
              />
            ))}
          </div>
          <figcaption className="text-sm text-muted-foreground">
            A 12-column grid with full, half, and third-width items.
          </figcaption>
        </figure>
      </Block>

      <Block>
        <h2>Where it breaks</h2>
        <p>
          On most laptop viewports, a 12-column grid looks fine. Shrink the
          container below, though, and you&rsquo;ll see items push past the
          right edge around 352px.
        </p>
      </Block>

      <Block>
        <CssGridOverflowDemo />
      </Block>

      <Block>
        <p>
          CSS Grid builds a fixed-width scaffold. Gaps are set in concrete —
          they don&rsquo;t shrink when the container gets smaller, they
          don&rsquo;t wrap to the next row, they don&rsquo;t collapse. For 12
          columns, that&rsquo;s 11 gaps × 32px (<code>gap-8</code>) = 352px
          of gutter, locked in. Narrower than that, and the grid spills.
        </p>
      </Block>

      <Block>
        <h2>What about container queries?</h2>
        <p>
          The obvious refinement: <code>@container</code> queries that swap
          the column count at smaller widths — 12 &rarr; 4 &rarr; 2. Better
          than viewport media queries, since a grid inside a sidebar
          shouldn&rsquo;t care about viewport width. But it doesn&rsquo;t
          actually solve the problem. The layout snaps at thresholds instead
          of reflowing continuously, and spans don&rsquo;t translate across
          breakpoints — half on a 12-col grid is <code>col-span-6</code>, on
          a 4-col grid it&rsquo;s <code>col-span-2</code>, so every item
          respells its span per breakpoint.
        </p>
        <p>
          <code>grid-template-columns: repeat(auto-fit, minmax(MIN, 1fr))</code>{" "}
          skips the breakpoint dance, but it only produces uniform-width rows
          — you can&rsquo;t say &ldquo;this one is a third, this one is
          two-thirds.&rdquo;
        </p>
      </Block>

      <Block>
        <h2>Why flex, not CSS Grid</h2>
        <p>
          A grid primitive needs three things: continuous reflow as the
          container changes, per-item widths (a third here, a half there),
          and no overflow at any container size.
        </p>
        <p>
          CSS Grid gives you per-item widths but fights the other two;{" "}
          <code>auto-fit</code> gives you reflow and safety but locks you into
          uniform columns. Flex-wrap with percentage widths is the only approach
          that delivers all three.
        </p>
        <p>
          Teul writes the primitive as <code>flex flex-wrap</code>. Each item
          declares its own percentage width, and items that don&rsquo;t fit
          wrap to the next row — the gap between them moving with them
          instead of sitting fixed in the container. No rigid scaffold, no
          phantom columns.
        </p>
      </Block>

      <Block>
        <CssGridOverflowDemo type="flex" />
      </Block>

      <footer className="mt-24 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <span>
          By <Link href="https://joohyun.dev">Joohyun Park</Link>
        </span>
        <ThemeToggle />
      </footer>
    </div>
  )
}
