import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

afterEach(cleanup)

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Pear", value: "pear" },
]

function Demo({
  items = fruits,
  empty,
}: {
  items?: typeof fruits
  empty?: string
}) {
  return (
    <Select items={items}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent empty={empty}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

describe("Select", () => {
  it("shows the placeholder until a value is chosen", () => {
    render(<Demo />)
    expect(screen.getByText("Pick a fruit")).toBeTruthy()
  })

  it("opens and lists the items", async () => {
    render(<Demo />)
    await act(async () => fireEvent.click(screen.getByRole("combobox")))
    expect(await screen.findByRole("option", { name: "Apple" })).toBeTruthy()
    expect(screen.getByRole("option", { name: "Pear" })).toBeTruthy()
  })

  it("shows the empty message when there are no items", async () => {
    render(<Demo items={[]} empty="No fruit in stock." />)
    await act(async () => fireEvent.click(screen.getByRole("combobox")))
    expect(await screen.findByText("No fruit in stock.")).toBeTruthy()
  })

  it("marks the trigger invalid", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit" aria-invalid>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent />
      </Select>,
    )
    expect(screen.getByRole("combobox").getAttribute("aria-invalid")).toBe(
      "true",
    )
  })
})
