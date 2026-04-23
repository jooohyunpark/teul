import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Block } from "@/components/site/block"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Grid, GridItem } from "@/components/ui/teul"

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
        <h1>Why CSS Grid does not work for conventional grid system</h1>
        <p className="text-muted-foreground">
          Why Teul uses flex, not CSS grid.
        </p>
      </Block>

      <Block>
        <p>
          Every design system I&rsquo;ve worked on eventually needs a 12-column
          grid, and CSS Grid seems made for the job.{" "}
          <code>grid-template-columns: repeat(12, 1fr)</code> spells out a
          12-column grid almost literally. So that&rsquo;s where I started.
        </p>

        <p>dummy paragraph</p>
      </Block>

      <Block>
        <div className="grid grid-cols-12 gap-6 text-center text-xs font-medium">
          <div className="col-span-12 h-12 rounded bg-muted" />

          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="col-span-6 h-12 rounded bg-muted" />
          ))}

          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="col-span-3 h-12 rounded bg-muted" />
          ))}
        </div>
      </Block>

      <Block>
        <h2>Problem</h2>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </Block>

      <Block>
        <CssGridOverflowDemo />
      </Block>

      <Block>
        <h2>Why it happens</h2>
        <p>
          Every item overflows horizontally. You can see the twelve tracks in
          the inspector, and the items &mdash; sized to span twelve &mdash; are
          wider than the container they live inside.
        </p>
        <p>
          The cause is a quiet detail of <code>1fr</code>. It doesn&rsquo;t mean
          &ldquo;one flexible fraction.&rdquo; It expands to{" "}
          <code>minmax(auto, 1fr)</code>, and that <code>auto</code> minimum is
          the track&rsquo;s <em>min-content</em> width. On a 390px viewport
          divided into twelve tracks, each track nominally gets ~32px. But any
          item whose min-content is wider than 32px pushes its track wider
          &mdash; and the sum of those tracks runs past the container.
        </p>
        <p>
          The usual patch is <code>repeat(12, minmax(0, 1fr))</code>: force the
          tracks to shrink below their content. That stops the overflow, but
          items still get crushed and their content spills out anyway.
        </p>
      </Block>

      <Block>
        <h2>The fix</h2>
        <p>
          Teul rewrites the primitive with <code>flex-wrap</code> and percentage
          widths. Each item declares its own width; items that don&rsquo;t fit
          wrap to the next row. <code>min-width: 0</code> cuts the min-content
          problem at the root. No intrinsic track sizing, no <code>minmax</code>{" "}
          negotiations, no twelve phantom columns.
        </p>

        <figure className="space-y-2">
          <div className="rounded border bg-card p-4">
            <Grid>
              {Array.from({ length: 12 }).map((_, i) => (
                <GridItem key={i} size={1}>
                  <div className="rounded bg-muted p-2 text-center text-xs tabular-nums">
                    {i + 1}
                  </div>
                </GridItem>
              ))}
            </Grid>
          </div>
          <figcaption className="text-sm text-muted-foreground">
            The same twelve items under Teul. The container stays honest at
            every viewport — items that don&rsquo;t fit wrap to the next row
            instead of overflowing.
          </figcaption>
        </figure>
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
