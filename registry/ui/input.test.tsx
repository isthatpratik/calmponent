import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Input } from "./input"

afterEach(cleanup)

describe("Input", () => {
  it("renders a plain input without a wrapper", () => {
    const { container } = render(<Input aria-label="Email" />)
    expect(container.firstElementChild?.tagName).toBe("INPUT")
    expect(screen.getByRole("textbox", { name: "Email" })).toBeTruthy()
  })

  it("marks itself busy and announces the check while loading", () => {
    render(<Input aria-label="Username" loading />)
    const input = screen.getByRole("textbox", { name: "Username" })
    expect(input.getAttribute("aria-busy")).toBe("true")
    expect(screen.getByRole("status").textContent).toBe("Checking")
  })

  it("keeps the spinner mounted when the check ends", () => {
    const { container } = render(
      <Input aria-label="Username" loading={false} />,
    )
    const spinner = container.querySelector("[data-slot='spinner']")
    expect(spinner).toBeTruthy()
    expect(spinner?.getAttribute("class")).toContain("opacity-0")
  })

  it("passes native attributes through", () => {
    render(<Input aria-label="Name" disabled readOnly placeholder="Ada" />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.disabled).toBe(true)
    expect(input.readOnly).toBe(true)
    expect(input.placeholder).toBe("Ada")
  })
})
