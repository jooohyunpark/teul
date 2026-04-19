import { Col, Grid } from "@/components/ui/teul"
import { InstallCommand } from "@/components/install-command"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/site/table"
import Link from "next/link"

const INSTALL = "npx shadcn@latest add https://teul.dev/registry/teul.json"

export default function Page() {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6">
      {/* Hero */}
      <section className="mt-20 mb-20">
        <h1 className="text-4xl font-semibold tracking-tight">Teul</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          An opinionated grid system for React and Tailwind.
        </p>
        <div className="mt-8">
          <InstallCommand command={INSTALL} />
        </div>
      </section>

      {/* Why */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Why Teul</h2>
        <ul className="mt-6 space-y-3 text-foreground/80">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              Type-safe responsive props. Autocomplete for every breakpoint, no
              template strings.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              No config changes. Drop it in any Tailwind project and it just
              works.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              Zero runtime cost. Static class maps compile to plain Tailwind
              utilities.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              You own the code. Copy-paste once, modify freely, ship without a
              dependency.
            </span>
          </li>
        </ul>
      </section>

      {/* Examples */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Basic 2-column
        </h3>
        <div className="mt-3 rounded-lg border bg-card p-4">
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
        </div>
        <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs leading-relaxed">
          <code>{`<Grid gap={4}>
  <Col size={8}>Main</Col>
  <Col size={4}>Sidebar</Col>
</Grid>`}</code>
        </pre>

        <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Responsive size and gap
        </h3>
        <div className="mt-3 rounded-lg border bg-card p-4">
          <Grid gap={{ xs: 2, md: 6 }}>
            <Col size={{ xs: 12, md: 8 }}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Main
              </div>
            </Col>
            <Col size={{ xs: 12, md: 4 }}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Sidebar
              </div>
            </Col>
          </Grid>
        </div>
        <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs leading-relaxed">
          <code>{`<Grid gap={{ xs: 2, md: 6 }}>
  <Col size={{ xs: 12, md: 8 }}>Main</Col>
  <Col size={{ xs: 12, md: 4 }}>Sidebar</Col>
</Grid>`}</code>
        </pre>

        <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Offset / centered content
        </h3>
        <div className="mt-3 rounded-lg border bg-card p-4">
          <Grid gap={4}>
            <Col size={6} offset={3}>
              <div className="rounded-md bg-muted px-3 py-4 text-center text-sm">
                Centered
              </div>
            </Col>
          </Grid>
        </div>
        <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs leading-relaxed">
          <code>{`<Grid gap={4}>
  <Col size={6} offset={3}>Centered</Col>
</Grid>`}</code>
        </pre>
      </section>

      {/* API reference */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">API reference</h2>

        <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Grid
        </h3>
        <div className="mt-3 rounded-lg border">
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

        <h3 className="mt-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Col
        </h3>
        <div className="mt-3 rounded-lg border">
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

        <p className="mt-6 text-sm text-muted-foreground">
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
      </section>

      {/* Philosophy */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Philosophy</h2>
        <div className="mt-6 space-y-4 text-foreground/80">
          <p>
            <strong className="text-foreground">
              Copy-paste, not install.
            </strong>{" "}
            Your grid is one file in your repo. No version pinning, no upgrade
            anxiety, no transitive dependencies.
          </p>
          <p>
            <strong className="text-foreground">Twelve columns only.</strong>{" "}
            Every extra configuration knob is a decision you&apos;d have to make
            again at every call site. 12 is the answer most of the time;
            hardcode it and move on.
          </p>
          <p>
            <strong className="text-foreground">No npm package.</strong> A grid
            is a hundred lines of JSX. Taking a dependency for a hundred lines
            of JSX is how you end up with 300 packages in node_modules.
          </p>
        </div>
      </section>

      {/* Footer */}

      <footer className="mt-24 flex items-center border-t py-6 text-sm text-muted-foreground">
        <span>
          By <Link href="https://joohyun.dev">Joohyun Park</Link>
        </span>
      </footer>
    </main>
  )
}
