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
- Tailwind CSS 3.4+ (Tailwind v4 works too)
- The [shadcn CLI](https://ui.shadcn.com/docs/cli)

## Usage

```tsx
import { Grid, Col } from "@/components/ui/teul"
```

### Basic

```tsx
<Grid gap={4}>
  <Col size={8}>Main</Col>
  <Col size={4}>Sidebar</Col>
</Grid>
```

### Responsive

```tsx
<Grid gap={{ xs: 2, md: 6 }}>
  <Col size={{ xs: 12, md: 8 }}>Main</Col>
  <Col size={{ xs: 12, md: 4 }}>Sidebar</Col>
</Grid>
```

### Offset

```tsx
<Grid gap={4}>
  <Col size={6} offset={3}>Centered</Col>
</Grid>
```

## API

### `<Grid>`

| Prop     | Type                        | Notes                   |
| -------- | --------------------------- | ----------------------- |
| `gap`    | `ResponsiveValue<GapScale>` | Shorthand for both axes |
| `rowGap` | `ResponsiveValue<GapScale>` | Vertical gap override   |
| `colGap` | `ResponsiveValue<GapScale>` | Horizontal gap override |

### `<Col>`

| Prop     | Type                       | Notes                             |
| -------- | -------------------------- | --------------------------------- |
| `size`   | `ResponsiveValue<ColSize>` | Columns to span (1–12)            |
| `offset` | `ResponsiveValue<ColSize>` | Leading empty columns (0-indexed) |

Where:

```ts
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
type ColSize  = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
```

## License

MIT
