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
    expect(button.className).toContain("border-border")
    expect(button.className).toContain("h-10")
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
