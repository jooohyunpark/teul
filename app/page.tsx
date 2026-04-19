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
        <h1>Teul</h1>
        <p className="text-muted-foreground">
          An opinionated grid system for React and Tailwind.
        </p>
      </Section>

      {/* Why */}
      <Section>
        <h2>Why Teul</h2>

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
        <h2>Installation</h2>
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
        <h2>Examples</h2>

        <h3>Responsive size</h3>
        <CodePreview>
          <Grid>
            <Col size={{ xs: 12, md: 8 }}>
              <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                xs: 12, md: 8
              </div>
            </Col>
            <Col size={{ xs: 12, md: 4 }}>
              <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                xs: 12, md: 4
              </div>
            </Col>
            {(["C", "D"] as const).map((label) => (
              <Col key={label} size={{ xs: 12, sm: 6 }}>
                <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                  xs: 12, sm: 6
                </div>
              </Col>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <Col size={{ xs: 12, md: 8 }}>...</Col>
  <Col size={{ xs: 12, md: 4 }}>...</Col>
  <Col size={{ xs: 12, sm: 6 }}>...</Col>
  <Col size={{ xs: 12, sm: 6 }}>...</Col>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Responsive gap</h3>
        <CodePreview>
          <Grid gap={{ xs: 2, sm: 4, md: 8 }}>
            {(["A", "B", "C"] as const).map((label) => (
              <Col key={label} size={4}>
                <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                  {label}
                </div>
              </Col>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={{ xs: 2, sm: 4, md: 8 }}>
  <Col size={4}>A</Col>
  <Col size={4}>B</Col>
  <Col size={4}>C</Col>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Nested grids</h3>
        <CodePreview>
          <Grid>
            <Col size={{ xs: 12, md: 8 }}>
              <Grid gap={4}>
                <Col size={6}>
                  <div className="rounded bg-muted p-4 text-center text-sm">
                    Top left
                  </div>
                </Col>
                <Col size={6}>
                  <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                    Top right
                  </div>
                </Col>
                <Col size={12}>
                  <div className="rounded bg-muted px-3 py-6 text-center text-sm">
                    Bottom
                  </div>
                </Col>
              </Grid>
            </Col>
            <Col size={{ xs: 12, md: 4 }}>
              <div className="flex h-full items-center justify-center rounded bg-muted px-3 py-6 text-center text-sm">
                Sidebar
              </div>
            </Col>
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <Col size={{ xs: 12, md: 8 }}>
    <Grid gap={4}>
      <Col size={6}>Top left</Col>
      <Col size={6}>Top right</Col>
      <Col size={12}>Bottom</Col>
    </Grid>
  </Col>
  <Col size={{ xs: 12, md: 4 }}>Sidebar</Col>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Offset / centered content</h3>
        <CodePreview>
          <Grid gap={4}>
            <Col size={6} offset={3}>
              <div className="rounded bg-muted px-3 py-4 text-center text-sm">
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
        <h2>API reference</h2>

        <p className="text-muted-foreground">
          Breakpoint is{" "}
          <code className="font-mono">
            &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
            &quot;xl&quot;
          </code>
          .
        </p>

        <div className="space-y-2">
          <h3>Grid</h3>
          <p className="text-muted-foreground">
            GapScale is{" "}
            <code className="font-mono">
              0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
            </code>
            .
          </p>
        </div>

        <div className="rounded border text-muted-foreground">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">rowGap</TableCell>
                <TableCell className="font-mono text-xs">12 (48px)</TableCell>
                <TableCell>Vertical gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">colGap</TableCell>
                <TableCell className="font-mono text-xs">8 (32px)</TableCell>
                <TableCell>Horizontal gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">gap</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Shorthand for both axes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section>
        <div className="space-y-2">
          <h3>Col</h3>
        </div>
        <div className="rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">size</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Columns to span (1–12)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">offset</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Leading empty columns (0-indexed)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
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
