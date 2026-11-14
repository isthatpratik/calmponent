import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Spinner } from "./spinner"

afterEach(cleanup)

describe("Spinner", () => {
  it("announces loading by default", () => {
    render(<Spinner />)
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy()
  })

  it("hides from assistive tech when decorative", () => {
    const { container } = render(<Spinner decorative />)
    const svg = container.querySelector("svg")
    expect(svg?.getAttribute("aria-hidden")).toBe("true")
    expect(screen.queryByRole("status")).toBeNull()
  })

  it("swaps to a still arc with reduced motion", () => {
    const { container } = render(<Spinner />)
    const circles = container.querySelectorAll("circle")
    expect(circles[1]?.getAttribute("class")).toContain("motion-reduce:hidden")
    expect(circles[2]?.getAttribute("class")).toContain("motion-reduce:block")
  })
})
