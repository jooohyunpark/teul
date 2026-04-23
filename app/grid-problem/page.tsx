import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { Block } from "@/components/site/block"
import { CodeBlock } from "@/components/site/code-block"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Grid, GridItem } from "@/components/ui/teul"
import { Button } from "@/components/site/button"

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
    <main className="mx-auto min-h-svh max-w-3xl px-6 py-10">
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
        <p>
          It held up on desktop &mdash; twelve tracks, a gap between them, items
          declaring <code>grid-column: span N</code>. Clean.
        </p>
        <p>Then I opened devtools on mobile.</p>

        <figure className="space-y-2">
          <div className="overflow-x-auto rounded border bg-card p-4">
            <div className="grid grid-cols-[repeat(12,1fr)] gap-x-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded bg-muted p-2 text-center text-xs tabular-nums"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <figcaption className="text-sm text-muted-foreground">
            A 12-column CSS Grid (<code>grid-cols-[repeat(12,1fr)]</code>) with
            twelve <code>col-span-1</code> items. On narrow viewports the
            items&rsquo; min-content widths force the grid wider than its
            container — try resizing or open this on a phone.
          </figcaption>
        </figure>
      </Block>

      <Block>
        <h2>The first problem</h2>
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
          tracks to shrink below their content. That stops the overflow. It also
          reveals a second problem.
        </p>
      </Block>

      <Block>
        <h2>The bigger problem</h2>
        <p>
          On mobile you usually don&rsquo;t want twelve columns at all &mdash;
          you want one. Items stack. Tailwind gives you breakpoint-prefixed span
          utilities (<code>col-span-12 md:col-span-8</code>) and CSS Grid can
          express that. But the grid still has twelve live tracks underneath,
          calculating widths, subject to every item&rsquo;s content.
        </p>
        <p>
          And then there&rsquo;s gap. A <code>24px</code> gap across eleven
          boundaries eats <code>264px</code> of your <code>390px</code> viewport
          &mdash; leaving <code>126px</code> for the actual content. The grid
          you asked for ends up fighting you.
        </p>
      </Block>

      <Block>
        <h2>The switch</h2>
        <p>I rewrote the primitive with flex-wrap and percentage widths.</p>
        <CodeBlock
          code={`<div className="flex flex-wrap gap-x-8 gap-y-12">
  <div className="w-[calc(8/12*100%)] min-w-0">...</div>
  <div className="w-[calc(4/12*100%)] min-w-0">...</div>
</div>`}
        />
        <p>
          Each item declares its own width as a percentage. Items wrap. At{" "}
          <code>{`size={12}`}</code> the item takes 100% of the row and the next
          one wraps underneath &mdash; which is exactly what you want on mobile.
        </p>
        <p>
          There are no intrinsic track sizings, no <code>minmax</code>{" "}
          negotiations, no twelve phantom columns. <code>min-width: 0</code> on
          each item cuts the min-content problem at the root.
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

      <Block>
        <h2>The gap math</h2>
        <p>
          The one subtlety is making widths sum to 100% when gap is involved.
          Teul&rsquo;s width calc is:
        </p>
        <CodeBlock
          lang="css"
          code={`width: calc(
  var(--grid-size) / 12 * (100% + var(--grid-col-gap))
  - var(--grid-col-gap)
);`}
        />
        <p>
          The &ldquo;plus gap, minus gap&rdquo; isn&rsquo;t a hack. It&rsquo;s
          the equation for <em>N</em> items across a row with (<em>N</em>
          &minus;1) gaps between them, solved per-item. Two{" "}
          <code>{`size={6}`}</code> items side-by-side sum to{" "}
          <code>(100% + G) &minus; 2G + G = 100%</code>. Three{" "}
          <code>{`size={4}`}</code>, same. The gap is paid for once, by the row
          &mdash; never by the track.
        </p>
      </Block>

      <Block>
        <h2>Why a component at all</h2>
        <p>
          At that point the layout works, but the ergonomics are still noisy.
          You write the calc once and the class strings three or four times per
          item, once per breakpoint.{" "}
          <code>col-span-12 md:col-span-8 lg:col-span-6</code> crowds the
          utility string next to color, padding, typography.
        </p>
        <p>
          Teul&rsquo;s <code>{`<GridItem size={{ base: 12, md: 8 }}>`}</code>{" "}
          reads like intent. You name the thing, not its mechanism. And because
          the output is still plain Tailwind classes, the scanner ships what it
          needs and nothing more &mdash; no runtime, no CSS-in-JS, no config.
        </p>
      </Block>

      <Block>
        <h2>In short</h2>
        <p>
          CSS Grid is great, and I still reach for it when I need
          two-dimensional alignment &mdash; named areas, subgrid, explicit row
          placement. But for the specific problem of &ldquo;twelve columns that
          stack on mobile and behave at every size in between,&rdquo; flex-wrap
          with a tiny width calc is quieter, smaller, and &mdash; critically
          &mdash; actually works on a 390-pixel viewport.
        </p>
      </Block>

      <footer className="mt-24 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <span>
          By <Link href="https://joohyun.dev">Joohyun Park</Link>
        </span>
        <ThemeToggle />
      </footer>
    </main>
  )
}
