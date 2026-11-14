import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Timeline, TimelineItem } from "./timeline"

afterEach(cleanup)

describe("Timeline", () => {
  it("renders an ordered list with status text for screen readers", () => {
    render(
      <Timeline>
        <TimelineItem status="done" title="Build" time="09:41" duration="31s" />
        <TimelineItem status="running" title="Deploy" />
        <TimelineItem status="pending" title="Verify" />
      </Timeline>,
    )
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(3)
    expect(items[0]?.textContent).toContain("Done")
    expect(items[1]?.getAttribute("aria-current")).toBe("step")
    expect(items[2]?.textContent).toContain("Not started")
  })

  it("fills the connector only below finished items", () => {
    render(
      <Timeline>
        <TimelineItem status="done" title="Build" />
        <TimelineItem status="running" title="Deploy" />
      </Timeline>,
    )
    const fills = document.querySelectorAll(
      "[data-slot='timeline-item'] .origin-top",
    )
    expect(fills[0]?.className).toContain("scale-y-100")
    expect(fills[1]?.className).toContain("scale-y-0")
  })

  it("shows a spinner for the running item", () => {
    render(
      <Timeline>
        <TimelineItem status="running" title="Deploy" />
      </Timeline>,
    )
    expect(document.querySelector("[data-slot='spinner']")).toBeTruthy()
  })

  it("shows skeleton rows while loading", () => {
    render(<Timeline loading loadingRows={4} />)
    const list = screen.getByRole("list")
    expect(list.getAttribute("aria-busy")).toBe("true")
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
  })

  it("shows the empty message without items", () => {
    render(<Timeline empty="No deploys yet." />)
    expect(screen.getByText("No deploys yet.")).toBeTruthy()
  })
})
