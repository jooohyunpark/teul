import { Grid, GridCol } from "@/components/ui/teul"
import { CodeBlock } from "@/components/site/code-block"
import { CodePreview } from "@/components/site/code-preview"
import { Block } from "@/components/site/block"
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
      <Block>
        <h1>Teul</h1>
        <p className="text-muted-foreground">
          An opinionated grid system for React and Tailwind.
        </p>
      </Block>

      {/* Why */}
      <Block>
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
              A grid is two concepts — structure and contents — but in Tailwind,
              both are just <code>&lt;div&gt;</code>s with class strings — no
              component boundary to signal which is which.
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground">
          The result is a 12-column grid component: <code>Grid</code> for
          containers, <code>GridCol</code> for items. Type-safe responsive
          props, plain Tailwind output, copy-paste install — no runtime, no
          dependencies, no config.
        </p>
      </Block>

      {/* Installation */}
      <Block>
        <h2>Installation</h2>
        <p className="text-muted-foreground">
          Add Teul to your project via the shadcn CLI.
        </p>
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
        <p className="text-muted-foreground">Then import and start building.</p>
        <CodeBlock
          code={`import { Grid, GridCol } from "@/components/ui/teul"`}
          lang="tsx"
        />
      </Block>

      {/* Examples */}
      <Block>
        <h2>Examples</h2>

        <h3>Responsive size</h3>
        <CodePreview>
          <Grid>
            <GridCol size={{ base: 12, md: 8 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                base: 12 · md: 8
              </div>
            </GridCol>
            <GridCol size={{ base: 12, md: 4 }}>
              <div className="rounded bg-muted p-4 text-center text-sm">
                base: 12 · md: 4
              </div>
            </GridCol>
            {(["C", "D"] as const).map((label) => (
              <GridCol key={label} size={{ base: 12, md: 6 }}>
                <div className="rounded bg-muted p-4 text-center text-sm">
                  base: 12 · md: 6
                </div>
              </GridCol>
            ))}
          </Grid>
        </CodePreview>
        <CodeBlock
          code={`<Grid>
  <GridCol size={{ base: 12, md: 8 }}>...</GridCol>
  <GridCol size={{ base: 12, md: 4 }}>...</GridCol>
  <GridCol size={{ base: 12, md: 6 }}>...</GridCol>
  <GridCol size={{ base: 12, md: 6 }}>...</GridCol>
</Grid>`}
        />
      </Block>

      <Block>
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
      </Block>

      <Block>
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
      </Block>

      <Block>
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
      </Block>

      {/* API reference */}
      <Block>
        <h2>API reference</h2>

        <CodeBlock
          lang="ts"
          code={`type Breakpoint  = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
type GapScale    = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type GridColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12`}
        />

        <p className="text-muted-foreground">
          Every prop accepts a single value or a per-breakpoint object (e.g.{" "}
          <code>{`{ md: 4, lg: 6 }`}</code>). <code>GapScale</code> follows
          Tailwind’s spacing scale.
        </p>

        <h3>Grid</h3>

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
                <TableCell>
                  <code>rowGap</code>
                </TableCell>
                <TableCell>
                  <code>GapScale</code>
                </TableCell>
                <TableCell>
                  <code>12</code>
                </TableCell>
                <TableCell>Vertical gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>colGap</code>
                </TableCell>
                <TableCell>
                  <code>GapScale</code>
                </TableCell>
                <TableCell>
                  <code>8</code>
                </TableCell>
                <TableCell>Horizontal gap</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>gap</code>
                </TableCell>
                <TableCell>
                  <code>GapScale</code>
                </TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Shorthand for both axes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Block>

      <Block>
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
                <TableCell>
                  <code>size</code>
                </TableCell>
                <TableCell>
                  <code>GridColSize</code>
                </TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Columns to span (1–12)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>offset</code>
                </TableCell>
                <TableCell>
                  <code>GridColSize</code>
                </TableCell>
                <TableCell className="text-muted-foreground">—</TableCell>
                <TableCell>Empty columns before the item</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
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
