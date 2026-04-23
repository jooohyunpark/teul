# Teul

An opinionated 12-column grid system for React and Tailwind.

```bash
pnpm dlx shadcn@latest add https://teul.joohyun.dev/registry/teul.json
# or: npx / yarn dlx / bunx
```

## Why Teul

- **Type-safe responsive props.** Autocomplete for every breakpoint, no template strings.
- **No config changes.** Drop it in any Tailwind project and it just works.
- **Zero runtime cost.** Static class maps compile to plain Tailwind utilities.
- **You own the code.** Copy-paste once, modify freely, ship without a dependency.

## Prerequisites

- React 19+
- Tailwind CSS v4 (uses the `--spacing` theme token)
- The [shadcn CLI](https://ui.shadcn.com/docs/cli)

## Usage

```tsx
import { Grid, GridItem } from "@/components/ui/teul"
```

### Basic

```tsx
<Grid gap={4}>
  <GridItem size={8}>Main</GridItem>
  <GridItem size={4}>Sidebar</GridItem>
</Grid>
```

### Responsive

```tsx
<Grid gap={{ base: 2, md: 6 }}>
  <GridItem size={{ md: 8 }}>Main</GridItem>
  <GridItem size={{ md: 4 }}>Sidebar</GridItem>
</Grid>
```

### Offset

```tsx
<Grid gap={4}>
  <GridItem size={6} offset={3}>Centered</GridItem>
</Grid>
```

## API

### `<Grid>`

| Prop     | Type                        | Default     | Notes                   |
| -------- | --------------------------- | ----------- | ----------------------- |
| `rowGap` | `ResponsiveValue<GapScale>` | `12` (48px) | Vertical gap            |
| `colGap` | `ResponsiveValue<GapScale>` | `8` (32px)  | Horizontal gap          |
| `gap`    | `ResponsiveValue<GapScale>` | —           | Shorthand for both axes |

### `<GridItem>`

| Prop     | Type                            | Default | Notes                                  |
| -------- | ------------------------------- | ------- | -------------------------------------- |
| `size`   | `ResponsiveValue<GridItemSize>` | —       | Columns to span (1–12)                 |
| `offset` | `ResponsiveValue<GridItemSize>` | —       | Shifts the column by N leading columns |

Where:

```ts
type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type GridItemSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
```

`base` is the unprefixed default — values apply until `sm` (640px) takes over. `size` defaults to `12`, so `size={{ md: 6 }}` means full width on mobile, half from `md` up.

## License

MIT
