import { Grid, GridCol } from "@/components/ui/teul"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/site/tabs"
import { ThemeToggle } from "@/components/site/theme-toggle"
import Link from "next/link"

const REGISTRY_URL = "https://teul.joohyun.dev/registry/teul.json"
const INSTALL_COMMANDS = [
  { name: "pnpm", command: `pnpm dlx shadcn@latest add ${REGISTRY_URL}` },
  { name: "npm", command: `npx shadcn@latest add ${REGISTRY_URL}` },
  { name: "yarn", command: `yarn dlx shadcn@latest add ${REGISTRY_URL}` },
  { name: "bun", command: `bunx shadcn@latest add ${REGISTRY_URL}` },
] as const

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
          <p className="text-muted-foreground">
            Three things Tailwind makes harder than it should:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong className="font-medium text-foreground">
                Column sizing gets lost in the utility string.
              </strong>{" "}
              Span and start classes pile up next to every other utility, and
              each breakpoint multiplies them.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Offsets don’t read like offsets.
              </strong>{" "}
              <code>col-start-*</code> is 1-indexed and describes a position,
              not a shift — so intent gets lost in the math.
            </li>
            <li>
              <strong className="font-medium text-foreground">
                Containers and items look the same.
              </strong>{" "}
              A grid is two concepts — structure and contents — but in
              Tailwind both are just <code>&lt;div&gt;</code>s with class
              strings.
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground">
          The result is a 12-column grid component: <code>Grid</code> for
          containers, <code>GridCol</code> for items. Type-safe responsive
          props, plain Tailwind output, copy-paste install — no runtime, no
          dependencies, no config.
        </p>
      </Section>

      {/* Installation */}
      <Section>
        <h2>Installation</h2>
        <p>Add the component with the shadcn CLI.</p>
        <Tabs defaultValue="pnpm">
          <TabsList variant="line">
            {INSTALL_COMMANDS.map(({ name }) => (
              <TabsTrigger key={name} value={name}>
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
          {INSTALL_COMMANDS.map(({ name, command }) => (
            <TabsContent key={name} value={name}>
              <CodeBlock code={command} lang="bash" />
            </TabsContent>
          ))}
        </Tabs>
        <p>Then import and use.</p>
        <CodeBlock
          code={`import { Grid, GridCol } from "@/components/ui/teul"`}
          lang="tsx"
        />
      </Section>

      {/* Examples */}
      <Section>
        <h2>Examples</h2>

        <h3>Responsive size</h3>
        <CodePreview>
          <Grid>
            <GridCol size={{ md: 8 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                md: 8
              </div>
            </GridCol>
            <GridCol size={{ md: 4 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                md: 4
              </div>
            </GridCol>
            {(["C", "D"] as const).map((label) => (
              <GridCol key={label} size={{ sm: 6 }}>
                <div className="rounded bg-muted p-4 text-center text-sm">
                  sm: 6
                </div>
              </GridCol>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <GridCol size={{ md: 8 }}>...</GridCol>
  <GridCol size={{ md: 4 }}>...</GridCol>
  <GridCol size={{ sm: 6 }}>...</GridCol>
  <GridCol size={{ sm: 6 }}>...</GridCol>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Responsive gap</h3>
        <CodePreview>
          <Grid gap={{ base: 2, sm: 4, md: 8 }}>
            {(["A", "B", "C"] as const).map((label) => (
              <GridCol key={label} size={4}>
                <div className="rounded bg-muted p-4 text-center text-sm">
                  {label}
                </div>
              </GridCol>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={{ base: 2, sm: 4, md: 8 }}>
  <GridCol size={4}>A</GridCol>
  <GridCol size={4}>B</GridCol>
  <GridCol size={4}>C</GridCol>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Nested grids</h3>
        <CodePreview>
          <Grid>
            <GridCol size={{ md: 8 }}>
              <Grid gap={4}>
                <GridCol size={6}>
                  <div className="rounded bg-muted p-4 text-center text-sm">
                    Top left
                  </div>
                </GridCol>
                <GridCol size={6}>
                  <div className="rounded bg-muted p-4 text-center text-sm">
                    Top right
                  </div>
                </GridCol>
                <GridCol size={12}>
                  <div className="rounded bg-muted p-4 text-center text-sm">
                    Bottom
                  </div>
                </GridCol>
              </Grid>
            </GridCol>
            <GridCol size={{ md: 4 }}>
              <div className="flex h-full items-center justify-center rounded bg-muted p-4 text-center text-sm">
                Sidebar
              </div>
            </GridCol>
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <GridCol size={{ md: 8 }}>
    <Grid gap={4}>
      <GridCol size={6}>Top left</GridCol>
      <GridCol size={6}>Top right</GridCol>
      <GridCol size={12}>Bottom</GridCol>
    </Grid>
  </GridCol>
  <GridCol size={{ md: 4 }}>Sidebar</GridCol>
</Grid>`}
        />
      </Section>

      <Section>
        <h3>Offset / centered content</h3>
        <CodePreview>
          <Grid gap={4}>
            <GridCol size={{ sm: 6 }} offset={{ sm: 3 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                sm offset: 3
              </div>
            </GridCol>
            <GridCol size={{ md: 4 }} offset={{ md: 1 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                md offset: 1
              </div>
            </GridCol>
            <GridCol size={{ lg: 4 }} offset={{ lg: 2 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                lg offset: 2
              </div>
            </GridCol>
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid gap={4}>
  <GridCol size={{ sm: 6 }} offset={{ sm: 3 }}>...</GridCol>
  <GridCol size={{ md: 4 }} offset={{ md: 1 }}>...</GridCol>
  <GridCol size={{ lg: 4 }} offset={{ lg: 2 }}>...</GridCol>
</Grid>`}
        />
      </Section>

      {/* API reference */}
      <Section>
        <h2>API reference</h2>

        <dl className="space-y-1 font-mono text-muted-foreground">
          <div className="flex flex-wrap gap-x-2">
            <dt>Breakpoint</dt>
            <dd>
              = &quot;base&quot; | &quot;sm&quot; | &quot;md&quot; |
              &quot;lg&quot; | &quot;xl&quot; | &quot;2xl&quot;
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>GapScale</dt>
            <dd>= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>GridColSize</dt>
            <dd>= 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12</dd>
          </div>
        </dl>

        <p className="text-muted-foreground">
          Every prop below also accepts a per-breakpoint object, e.g.{" "}
          <code className="font-mono">{`{ md: 4, lg: 6 }`}</code>.
        </p>

        <h3>Grid</h3>

        <div className="rounded border text-muted-foreground">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">rowGap</TableCell>
                <TableCell className="font-mono text-xs">GapScale</TableCell>
                <TableCell className="font-mono text-xs">12 (48px)</TableCell>
                <TableCell>Vertical gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">colGap</TableCell>
                <TableCell className="font-mono text-xs">GapScale</TableCell>
                <TableCell className="font-mono text-xs">8 (32px)</TableCell>
                <TableCell>Horizontal gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">gap</TableCell>
                <TableCell className="font-mono text-xs">GapScale</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Shorthand for both axes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section>
        <h3>GridCol</h3>
        <div className="rounded border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">size</TableCell>
                <TableCell className="font-mono text-xs">GridColSize</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Columns to span (1–12)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">offset</TableCell>
                <TableCell className="font-mono text-xs">GridColSize</TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Shifts the column by N leading columns</TableCell>
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
