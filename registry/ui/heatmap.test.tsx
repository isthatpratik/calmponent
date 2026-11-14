import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Heatmap } from "./heatmap"

afterEach(cleanup)

// Saturday 2026-11-14 ends the last week.
const endDate = new Date(Date.UTC(2026, 10, 14))
const data = [
  { date: "2026-11-14", count: 9 },
  { date: "2026-11-13", count: 1 },
  { date: "2026-11-12", count: 4 },
  { date: "2026-11-11", count: 6 },
]

describe("Heatmap", () => {
  it("renders 7 rows and one cell per day", () => {
    render(<Heatmap data={data} weeks={4} endDate={endDate} />)
    expect(screen.getAllByRole("row")).toHaveLength(7)
    expect(screen.getAllByRole("gridcell")).toHaveLength(28)
  })

  it("labels each day for screen readers", () => {
    render(<Heatmap data={data} weeks={4} endDate={endDate} />)
    expect(
      screen.getByRole("gridcell", { name: "9 contributions on Nov 14, 2026" }),
    ).toBeTruthy()
    expect(
      screen.getByRole("gridcell", { name: "1 contribution on Nov 13, 2026" }),
    ).toBeTruthy()
  })

  it("scales levels to the data", () => {
    render(<Heatmap data={data} weeks={4} endDate={endDate} />)
    const high = screen.getByRole("gridcell", { name: /9 contributions/ })
    const low = screen.getByRole("gridcell", { name: /1 contribution on/ })
    expect(high.className).toContain("bg-foreground ")
    expect(low.className).toContain("bg-foreground/30")
  })

  it("moves focus with the arrow keys", async () => {
    render(<Heatmap data={data} weeks={4} endDate={endDate} />)
    const start = screen.getByRole("gridcell", { name: /Nov 14, 2026/ })
    expect(start.getAttribute("tabindex")).toBe("0")
    start.focus()
    await act(async () => fireEvent.keyDown(start, { key: "ArrowUp" }))
    expect(document.activeElement?.getAttribute("aria-label")).toContain(
      "Nov 13, 2026",
    )
    await act(async () =>
      fireEvent.keyDown(document.activeElement as Element, {
        key: "ArrowLeft",
      }),
    )
    expect(document.activeElement?.getAttribute("aria-label")).toContain(
      "Nov 6, 2026",
    )
  })

  it("shows the tooltip text for the hovered day", async () => {
    render(<Heatmap data={data} weeks={4} endDate={endDate} />)
    const cell = screen.getByRole("gridcell", { name: /9 contributions/ })
    await act(async () => fireEvent.pointerEnter(cell))
    expect(
      document.querySelector("[data-slot='heatmap-tooltip']")?.textContent,
    ).toBe("9 contributions on Nov 14, 2026")
  })

  it("shows the empty message when every day is 0", () => {
    render(
      <Heatmap data={[]} weeks={4} endDate={endDate} empty="Nothing yet." />,
    )
    expect(screen.getByText("Nothing yet.")).toBeTruthy()
  })
})
