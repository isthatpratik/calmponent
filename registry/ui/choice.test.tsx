import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Switch } from "./switch"

afterEach(cleanup)

describe("Checkbox", () => {
  it("toggles and keeps its indicator mounted", async () => {
    render(<Checkbox aria-label="Accept" />)
    const box = screen.getByRole("checkbox", { name: "Accept" })
    expect(box.getAttribute("aria-checked")).toBe("false")
    expect(box.querySelector("[data-slot='checkbox-indicator']")).toBeTruthy()
    await act(async () => fireEvent.click(box))
    expect(box.getAttribute("aria-checked")).toBe("true")
    expect(box.hasAttribute("data-checked")).toBe(true)
  })

  it("supports the indeterminate state", () => {
    render(<Checkbox aria-label="Select all" indeterminate />)
    const box = screen.getByRole("checkbox")
    expect(box.getAttribute("aria-checked")).toBe("mixed")
  })

  it("respects disabled", async () => {
    render(<Checkbox aria-label="Accept" disabled />)
    const box = screen.getByRole("checkbox")
    await act(async () => fireEvent.click(box))
    expect(box.getAttribute("aria-checked")).toBe("false")
  })
})

describe("RadioGroup", () => {
  it("selects one item at a time", async () => {
    render(
      <RadioGroup aria-label="Plan" defaultValue="free">
        <RadioGroupItem value="free" aria-label="Free" />
        <RadioGroupItem value="team" aria-label="Team" />
      </RadioGroup>,
    )
    const free = screen.getByRole("radio", { name: "Free" })
    const team = screen.getByRole("radio", { name: "Team" })
    expect(free.getAttribute("aria-checked")).toBe("true")
    await act(async () => fireEvent.click(team))
    expect(team.getAttribute("aria-checked")).toBe("true")
    expect(free.getAttribute("aria-checked")).toBe("false")
  })

  it("keeps the dot mounted on unselected items", () => {
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="free" aria-label="Free" />
      </RadioGroup>,
    )
    const radio = screen.getByRole("radio")
    expect(
      radio.querySelector("[data-slot='radio-group-indicator']"),
    ).toBeTruthy()
  })
})

describe("Switch", () => {
  it("toggles on click", async () => {
    render(<Switch aria-label="Notifications" />)
    const toggle = screen.getByRole("switch", { name: "Notifications" })
    await act(async () => fireEvent.click(toggle))
    expect(toggle.getAttribute("aria-checked")).toBe("true")
  })

  it("ignores input and reports busy while pending", async () => {
    render(<Switch aria-label="Notifications" pending />)
    const toggle = screen.getByRole("switch")
    expect(toggle.getAttribute("aria-busy")).toBe("true")
    expect(toggle.hasAttribute("data-pending")).toBe(true)
    await act(async () => fireEvent.click(toggle))
    expect(toggle.getAttribute("aria-checked")).toBe("false")
  })
})
