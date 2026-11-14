import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Button } from "./button"

afterEach(cleanup)

describe("Button", () => {
  it("renders a plain button when no status is set", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    expect(button.getAttribute("data-status")).toBeNull()
    expect(button.getAttribute("data-slot")).toBe("button")
  })

  it("applies the variant and size classes", () => {
    render(
      <Button variant="outline" size="lg">
        Save
      </Button>,
    )
    const button = screen.getByRole("button")
    expect(button.className).toContain("h-10")
    expect(button.className).toContain("cursor-pointer")
    // The fill is a separate layer, so it can scale without moving the label.
    const fill = button.querySelector("span[aria-hidden='true']")
    expect(fill?.className).toContain("border-border")
    expect(fill?.className).toContain("group-hover/button:scale-97")
  })

  it("gives the link variant no fill", () => {
    render(<Button variant="link">Read more</Button>)
    const fill = screen
      .getByRole("button")
      .querySelector("span[aria-hidden='true']")
    expect(fill?.className).toContain("hidden")
  })

  it("draws a still arc instead of the moving one with reduced motion", () => {
    render(<Button status="loading">Save</Button>)
    const circles = screen
      .getByRole("button")
      .querySelectorAll("[data-active] circle")
    expect(circles).toHaveLength(3)
    expect(circles[1]?.getAttribute("class")).toContain("motion-reduce:hidden")
    expect(circles[2]?.getAttribute("class")).toContain("motion-reduce:block")
  })

  it("names the button with the active label only", () => {
    render(
      <Button status="success" statusText={{ success: "Saved" }}>
        Save
      </Button>,
    )
    expect(screen.getByRole("button", { name: "Saved" })).toBeTruthy()
  })

  it("stays focusable and busy while loading", () => {
    render(
      <Button status="loading" statusText={{ loading: "Saving" }}>
        Save
      </Button>,
    )
    const button = screen.getByRole("button", { name: "Saving" })
    expect(button.getAttribute("aria-busy")).toBe("true")
    expect(button.hasAttribute("data-disabled")).toBe(true)
    button.focus()
    expect(document.activeElement).toBe(button)
  })

  it("keeps every layer mounted and hides the inactive ones", () => {
    render(<Button status="error">Save</Button>)
    const button = screen.getByRole("button")
    const layers = button.querySelectorAll("span[id]")
    expect(layers).toHaveLength(4)
    const visible = [...layers].filter(
      (layer) => layer.getAttribute("aria-hidden") !== "true",
    )
    expect(visible).toHaveLength(1)
    expect(visible[0]?.getAttribute("data-active")).toBe("true")
  })

  it("announces the status to screen readers", () => {
    render(<Button status="error">Save</Button>)
    expect(screen.getByRole("status").textContent).toBe("Failed")
  })

  it("prefers an explicit aria-label over the layer label", () => {
    render(
      <Button size="icon" status="loading" aria-label="Refresh">
        R
      </Button>,
    )
    const button = screen.getByRole("button", { name: "Refresh" })
    expect(button.hasAttribute("aria-labelledby")).toBe(false)
  })
})
