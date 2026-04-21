# Teul

An opinionated 12-column grid system for React and Tailwind.

```bash
npx shadcn@latest add https://teul.joohyun.dev/registry/teul.json
```

## Why Teul

- **Type-safe responsive props.** Autocomplete for every breakpoint, no template strings.
- **No config changes.** Drop it in any Tailwind project and it just works.
- **Zero runtime cost.** Static class maps compile to plain Tailwind utilities.
- **You own the code.** Copy-paste once, modify freely, ship without a dependency.

## Prerequisites

- React 18+
- Tailwind CSS v4 (uses the `--spacing` theme token)
- The [shadcn CLI](https://ui.shadcn.com/docs/cli)

## Usage

```tsx
import { Grid, GridCol } from "@/components/ui/teul"
```

### Basic

```tsx
<Grid gap={4}>
  <GridCol size={8}>Main</GridCol>
  <GridCol size={4}>Sidebar</GridCol>
</Grid>
```

### Responsive

```tsx
<Grid gap={{ xs: 2, md: 6 }}>
  <GridCol size={{ xs: 12, md: 8 }}>Main</GridCol>
  <GridCol size={{ xs: 12, md: 4 }}>Sidebar</GridCol>
</Grid>
```

### Offset

```tsx
<Grid gap={4}>
  <GridCol size={6} offset={3}>Centered</GridCol>
</Grid>
```

## API

### `<Grid>`

| Prop     | Type                        | Notes                   |
| -------- | --------------------------- | ----------------------- |
| `gap`    | `ResponsiveValue<GapScale>` | Shorthand for both axes |
| `rowGap` | `ResponsiveValue<GapScale>` | Vertical gap override   |
| `colGap` | `ResponsiveValue<GapScale>` | Horizontal gap override |

### `<GridCol>`

| Prop     | Type                       | Notes                             |
| -------- | -------------------------- | --------------------------------- |
| `size`   | `ResponsiveValue<GridColSize>` | Columns to span (1–12)            |
| `offset` | `ResponsiveValue<GridColSize>` | Shifts the column by N leading columns |

Where:

```ts
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type GridColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
```

## License

MIT
