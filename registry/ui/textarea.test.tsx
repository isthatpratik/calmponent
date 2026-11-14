import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Field, FieldLabel } from "./field"
import { Textarea } from "./textarea"

afterEach(cleanup)

describe("Textarea", () => {
  it("renders a plain textarea without a counter", () => {
    const { container } = render(<Textarea aria-label="Note" />)
    expect(container.firstElementChild?.tagName).toBe("TEXTAREA")
  })

  it("counts characters against the limit", () => {
    render(<Textarea aria-label="Bio" maxLength={100} defaultValue="Hello" />)
    const count = document.querySelector("[data-slot='textarea-count']")
    expect(count?.textContent).toBe("5 / 100")
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Hello there" },
    })
    expect(count?.textContent).toBe("11 / 100")
  })

  it("warns near the limit and marks a full field", () => {
    render(<Textarea aria-label="Bio" maxLength={10} />)
    const box = screen.getByRole("textbox")
    const count = document.querySelector("[data-slot='textarea-count']")
    fireEvent.change(box, { target: { value: "123456789" } })
    expect(count?.hasAttribute("data-near")).toBe(true)
    expect(count?.hasAttribute("data-full")).toBe(false)
    fireEvent.change(box, { target: { value: "1234567890" } })
    expect(count?.hasAttribute("data-full")).toBe(true)
    expect(screen.getByRole("status").textContent).toBe(
      "Character limit reached",
    )
  })

  it("announces only at set points", () => {
    render(<Textarea aria-label="Bio" maxLength={30} />)
    const box = screen.getByRole("textbox")
    fireEvent.change(box, { target: { value: "a".repeat(5) } })
    expect(screen.getByRole("status").textContent).toBe("")
    fireEvent.change(box, { target: { value: "a".repeat(10) } })
    expect(screen.getByRole("status").textContent).toBe("20 characters left")
  })

  it("works as a field control with a label", () => {
    render(
      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea />
      </Field>,
    )
    expect(screen.getByRole("textbox", { name: "Message" })).toBeTruthy()
  })
})
