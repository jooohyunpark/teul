import { expect, test, type Page } from "@playwright/test"

type ItemConfig = {
  size?: number | Record<string, number>
  offset?: number | Record<string, number>
}

type FixtureConfig = {
  containerWidth: number
  gap?: number
  rowGap?: number
  colGap?: number
  items: ItemConfig[]
}

async function loadFixture(page: Page, config: FixtureConfig) {
  const cfg = encodeURIComponent(JSON.stringify(config))
  await page.goto(`/playwright/grid?cfg=${cfg}`)
  await expect(page.getByTestId("grid")).toBeAttached()
}

async function widthOf(page: Page, testid: string): Promise<number> {
  const box = await page.getByTestId(testid).boundingBox()
  if (!box) throw new Error(`no bounding box for ${testid}`)
  return box.width
}

async function topOf(page: Page, testid: string): Promise<number> {
  const box = await page.getByTestId(testid).boundingBox()
  if (!box) throw new Error(`no bounding box for ${testid}`)
  return box.y
}

async function leftOf(page: Page, testid: string): Promise<number> {
  const box = await page.getByTestId(testid).boundingBox()
  if (!box) throw new Error(`no bounding box for ${testid}`)
  return box.x
}

const W = (size: number, container: number, colGap: number) =>
  (size / 12) * (container + colGap) - colGap

const OFFSET_PX = (offset: number, container: number, colGap: number) =>
  (offset / 12) * (container + colGap)

test.describe("Grid + GridItem widths", () => {
  test("default size fills the container", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 700,
      items: [{}],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(700, 0)
  })

  test("size=6 produces half-minus-gap width (default colGap=8 → 32px)", async ({
    page,
  }) => {
    await loadFixture(page, {
      containerWidth: 700,
      items: [{ size: 6 }, { size: 6 }],
    })
    const expected = W(6, 700, 32)
    expect(await widthOf(page, "item-0")).toBeCloseTo(expected, 0)
    expect(await widthOf(page, "item-1")).toBeCloseTo(expected, 0)
  })

  test("three size=4 items fill a single row exactly", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      items: [{ size: 4 }, { size: 4 }, { size: 4 }],
    })
    const expected = W(4, 600, 32)
    for (const id of ["item-0", "item-1", "item-2"]) {
      expect(await widthOf(page, id)).toBeCloseTo(expected, 0)
    }
    const top0 = await topOf(page, "item-0")
    const top2 = await topOf(page, "item-2")
    expect(top2).toBeCloseTo(top0, 0)
  })

  test("colGap=4 (16px) shrinks gaps and widens items", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      colGap: 4,
      items: [{ size: 6 }, { size: 6 }],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(W(6, 600, 16), 0)
  })

  test("colGap=0 yields exact size/12 widths", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      colGap: 0,
      items: [{ size: 4 }, { size: 4 }, { size: 4 }],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(200, 0)
    expect(await widthOf(page, "item-1")).toBeCloseTo(200, 0)
    expect(await widthOf(page, "item-2")).toBeCloseTo(200, 0)
  })

  test("rowGap doesn't affect widths", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      rowGap: 12,
      items: [{ size: 6 }, { size: 6 }],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(W(6, 600, 32), 0)
  })

  test("items totaling more than 12 wrap to a new row", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      items: [{ size: 8 }, { size: 8 }],
    })
    const top0 = await topOf(page, "item-0")
    const top1 = await topOf(page, "item-1")
    expect(top1).toBeGreaterThan(top0)
  })

  test("offset=2 shifts the item by 2/12 of (container + colGap)", async ({
    page,
  }) => {
    await loadFixture(page, {
      containerWidth: 600,
      items: [{ size: 4, offset: 2 }],
    })
    const containerLeft = await leftOf(page, "grid-container")
    const itemLeft = await leftOf(page, "item-0")
    const expectedShift = OFFSET_PX(2, 600, 32)
    expect(itemLeft - containerLeft).toBeCloseTo(expectedShift, 0)
  })

  test("size=0 hides the item (zero width)", async ({ page }) => {
    await loadFixture(page, {
      containerWidth: 600,
      items: [{ size: 0 }, { size: 12 }],
    })
    const hidden = await page.getByTestId("item-0").boundingBox()
    expect(hidden).toBeNull()
    expect(await widthOf(page, "item-1")).toBeCloseTo(600, 0)
  })

  test("responsive size: { base: 12, md: 6 } at viewport < md is full-width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 800 })
    await loadFixture(page, {
      containerWidth: 500,
      items: [{ size: { base: 12, md: 6 } }],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(500, 0)
  })

  test("responsive size: { base: 12, md: 6 } at viewport ≥ md becomes half", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 800 })
    await loadFixture(page, {
      containerWidth: 500,
      items: [{ size: { base: 12, md: 6 } }],
    })
    expect(await widthOf(page, "item-0")).toBeCloseTo(W(6, 500, 32), 0)
  })

  test("responsive size: { base: 0, md: 6 } hides at base, shows at md", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 800 })
    await loadFixture(page, {
      containerWidth: 500,
      items: [{ size: { base: 0, md: 6 } }],
    })
    expect(await page.getByTestId("item-0").boundingBox()).toBeNull()

    await page.setViewportSize({ width: 1024, height: 800 })
    expect(await widthOf(page, "item-0")).toBeCloseTo(W(6, 500, 32), 0)
  })
})
