import { Col, Grid } from "@/components/ui/teul"
import { CodeBlock } from "@/components/site/code-block"
import { CodePreview } from "@/components/site/code-preview"
import { Section } from "@/components/site/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/site/table"
import { ThemeToggle } from "@/components/site/theme-toggle"
import Link from "next/link"

const INSTALL = "npx shadcn@latest add https://teul.dev/registry/teul.json"

export default function Page() {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 py-10">
      <Section>
        <h1 className="text-4xl font-semibold tracking-tight">Teul</h1>
        <p className="text-muted-foreground">
          An opinionated grid system for React and Tailwind.
        </p>
      </Section>

      {/* Why */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight">Why Teul</h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">Teul solves three problems:</p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong className="font-medium text-foreground">
                Grid classes get buried as layouts grow.
              </strong>{" "}
              <code>grid-cols-12</code>, <code>col-span-*</code>,{" "}
              <code>col-start-*</code>, responsive variants — all stacked next
              to every other utility, hard to scan and harder to maintain.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Offsets are awkward in Tailwind.
              </strong>{" "}
              <code>col-start-*</code> is 1-indexed and doesn’t read like an
              offset. Intent gets lost in the math.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Containers and items look the same.
              </strong>{" "}
              A grid is two concepts — the layout and what fills it — but in
              Tailwind they’re expressed identically, with no mental separation.
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground">
          The result is an opinionated grid component with a clear split:{" "}
          <code>Grid</code> for containers, <code>Col</code> for items.
          Type-safe responsive props, plain Tailwind output, no config to touch.
        </p>
      </Section>

      {/* Installation */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <p>Add the component with the shadcn CLI.</p>
        <CodeBlock code={INSTALL} lang="bash" />
        <p>Then import and use.</p>
        <CodeBlock
          code={`import { Col, Grid } from "@/components/ui/teul"`}
          lang="tsx"
        />
      </Section>

      {/* Examples */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Basic 2-column
        </h3>
        <CodePreview>
          <Grid gap={4}>
            <Col size={8}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Main
              </div>
            </Col>
            <Col size={4}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Sidebar
              </div>
            </Col>
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <Col size={8}>Main</Col>
  <Col size={4}>Sidebar</Col>
</Grid>`}
        />

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          All 12 column sizes
        </h3>
        <CodePreview className="space-y-2">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((n) => (
            <Grid key={n} gap={2}>
              <Col size={n}>
                <div className="rounded-md bg-muted px-3 py-2 text-center text-xs">
                  size={n}
                </div>
              </Col>
            </Grid>
          ))}
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={2}>
  <Col size={1}>size=1</Col>
</Grid>
<Grid gap={2}>
  <Col size={2}>size=2</Col>
</Grid>
{/* ...through size={12} */}`}
        />

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Responsive size and gap
        </h3>
        <CodePreview>
          <Grid gap={{ xs: 2, md: 4 }}>
            {(["A", "B", "C", "D", "E", "F"] as const).map((label) => (
              <Col key={label} size={{ xs: 12, sm: 6, lg: 4 }}>
                <div className="rounded-md bg-muted px-3 py-6 text-center text-sm">
                  {label}
                </div>
              </Col>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={{ xs: 2, md: 4 }}>
  {items.map((item) => (
    <Col key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
      <Card {...item} />
    </Col>
  ))}
</Grid>`}
        />

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Separate row and column gaps
        </h3>
        <CodePreview>
          <Grid rowGap={{ xs: 2, md: 6 }} colGap={{ xs: 1, md: 4 }}>
            {(["A", "B", "C", "D", "E", "F"] as const).map((label) => (
              <Col key={label} size={{ xs: 6, md: 4 }}>
                <div className="rounded-md bg-muted px-3 py-6 text-center text-sm">
                  {label}
                </div>
              </Col>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid rowGap={{ xs: 2, md: 6 }} colGap={{ xs: 1, md: 4 }}>
  {items.map((item) => (
    <Col key={item.id} size={{ xs: 6, md: 4 }}>
      <Card {...item} />
    </Col>
  ))}
</Grid>`}
        />

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Offset / centered content
        </h3>
        <CodePreview>
          <Grid gap={4}>
            <Col size={6} offset={3}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Centered
              </div>
            </Col>
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={4}>
  <Col size={6} offset={3}>Centered</Col>
</Grid>`}
        />
      </Section>

      {/* API reference */}
      <Section>
        <h2 className="text-2xl font-semibold tracking-tight">API reference</h2>

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Grid
        </h3>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">gap</TableCell>
                <TableCell className="font-mono text-xs">
                  ResponsiveValue&lt;GapScale&gt;
                </TableCell>
                <TableCell>Shorthand for both axes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">rowGap</TableCell>
                <TableCell className="font-mono text-xs">
                  ResponsiveValue&lt;GapScale&gt;
                </TableCell>
                <TableCell>Vertical gap override</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">colGap</TableCell>
                <TableCell className="font-mono text-xs">
                  ResponsiveValue&lt;GapScale&gt;
                </TableCell>
                <TableCell>Horizontal gap override</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Col
        </h3>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">size</TableCell>
                <TableCell className="font-mono text-xs">
                  ResponsiveValue&lt;ColSize&gt;
                </TableCell>
                <TableCell>Columns to span (1–12)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">offset</TableCell>
                <TableCell className="font-mono text-xs">
                  ResponsiveValue&lt;ColSize&gt;
                </TableCell>
                <TableCell>Leading empty columns (0-indexed)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground">
          <code className="font-mono">Breakpoint</code> is{" "}
          <code className="font-mono">
            &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
            &quot;xl&quot;
          </code>
          . <code className="font-mono">GapScale</code> is{" "}
          <code className="font-mono">
            0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
          </code>
          .
        </p>
      </Section>

      <footer className="mt-24 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
        <span>
          By <Link href="https://joohyun.dev">Joohyun Park</Link>
        </span>
        <ThemeToggle />
      </footer>
    </main>
  )
}
