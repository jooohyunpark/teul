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
          right edge around 352px — and that&rsquo;s no coincidence. A
          12-column grid has 11 gaps; at <code>gap-8</code> (32px each), the
          gutters alone add up to 32 × 11 = 352px, leaving nothing for the
          tracks themselves.
        </p>
      </Block>

      <Block>
        <CssGridOverflowDemo />
      </Block>

      <Block>
        <h2>Why it breaks</h2>
        <p>
          CSS Grid builds a fixed-width scaffold. Gaps are set in concrete —
          they don&rsquo;t shrink when the container gets smaller, they
          don&rsquo;t wrap to the next row, they don&rsquo;t collapse.
          Whatever you hand to <code>gap-8</code> is reserved. If the parent
          can&rsquo;t fit that 352px of gutter, the grid just spills out the
          side.
        </p>
      </Block>

      <Block>
        <h2>What about container queries?</h2>
        <p>
          The obvious refinement: use <code>@container</code> to reduce the
          column count at smaller sizes — 12 &rarr; 4 &rarr; 2. This is better
          than viewport media queries, since a grid inside a narrow sidebar
          shouldn&rsquo;t care about viewport width. And it does raise the
          threshold at which overflow appears.
        </p>
        <p>But it doesn&rsquo;t actually solve the problem:</p>
        <ul>
          <li>
            <strong>Jumps, not flow.</strong> A 380px container lays out the
            same as a 480px one until it crosses a threshold; resize through it
            and the layout snaps.
          </li>
          <li>
            <strong>Spans don&rsquo;t translate.</strong>{" "}
            <code>col-span-6</code> is half on a 12-col grid but the whole row
            on a 4-col one. Each call site ends up respelling its span per
            breakpoint (<code>@sm:col-span-4 @lg:col-span-6</code>).
          </li>
          <li>
            <strong>Gaps still don&rsquo;t shrink.</strong> Fewer tracks means
            fewer gaps, so the threshold moves down, but the scaffold is still
            rigid at every breakpoint.
          </li>
        </ul>
        <p>
          <code>grid-template-columns: repeat(auto-fit, minmax(MIN, 1fr))</code>{" "}
          skips the breakpoint dance — items reflow continuously and wrap when
          they can&rsquo;t be at least <code>MIN</code> wide. But it only
          produces uniform-width rows. You can&rsquo;t say &ldquo;this card is a
          third, this one is two-thirds.&rdquo;
        </p>
      </Block>

      <Block>
        <h2>Why flex, not CSS Grid</h2>
        <p>A grid primitive needs three things:</p>
        <ol>
          <li>
            <strong>Continuous reflow</strong> as the container changes, not in
            discrete steps.
          </li>
          <li>
            <strong>Per-item widths</strong> — a third here, a half there.
          </li>
          <li>
            <strong>No overflow</strong> at any container size.
          </li>
        </ol>
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
