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

describe("Timeline v2", () => {
  it("groups steps under a phase with its total", async () => {
    const { TimelineGroup } = await import("./timeline")
    render(
      <Timeline>
        <TimelineGroup label="Build" total="24s">
          <TimelineItem status="done" title="Clone" />
        </TimelineGroup>
      </Timeline>,
    )
    expect(screen.getByText("Build")).toBeTruthy()
    expect(screen.getByText("24s")).toBeTruthy()
  })

  it("draws proportional rails and a ghost of the last run", () => {
    render(
      <Timeline proportional pxPerSecond={4}>
        <TimelineItem
          status="done"
          title="Build"
          seconds={19}
          previousSeconds={31}
        />
      </Timeline>,
    )
    const bars = document.querySelectorAll<HTMLElement>(".w-1.rounded-full")
    const heights = [...bars].map((bar) => bar.style.height)
    expect(heights).toContain("124px")
    expect(heights).toContain("76px")
    expect(screen.getByText("was 31s")).toBeTruthy()
  })

  it("sizes bar segments by their seconds", async () => {
    const { TimelineBar } = await import("./timeline")
    render(
      <TimelineBar
        segments={[
          { id: "a", label: "Clone", seconds: 2, group: "Build" },
          {
            id: "b",
            label: "Upload",
            seconds: 11,
            group: "Deploy",
            status: "failed",
          },
        ]}
      />,
    )
    const items = screen.getAllByRole("listitem")
    expect(items[0]?.style.flexGrow).toBe("2")
    expect(items[1]?.style.flexGrow).toBe("11")
    expect(items[1]?.className).toContain("bg-destructive")
    expect(screen.getByText("Build · 2s")).toBeTruthy()
    expect(screen.getByText("00:13")).toBeTruthy()
  })
})
