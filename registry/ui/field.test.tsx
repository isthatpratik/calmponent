import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Field, FieldDescription, FieldError, FieldLabel } from "./field"
import { Input } from "./input"

afterEach(cleanup)

describe("Field", () => {
  it("links the label and description to the control", () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>,
    )
    const input = screen.getByRole("textbox", { name: "Email" })
    const describedBy = input.getAttribute("aria-describedby") ?? ""
    expect(
      document.getElementById(describedBy.split(" ")[0] ?? "")?.textContent,
    ).toBe("We never share it.")
  })

  it("shows a forced error with its message", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError match>Enter an email address.</FieldError>
      </Field>,
    )
    expect(screen.getByText("Enter an email address.")).toBeTruthy()
    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe(
      "true",
    )
  })

  it("validates on blur and shows the validation message", async () => {
    render(
      <Field
        validationMode="onBlur"
        validate={(value) => (value ? null : "Enter your name.")}
      >
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldError />
      </Field>,
    )
    const input = screen.getByRole("textbox")
    await act(async () => {
      fireEvent.focus(input)
      fireEvent.blur(input)
    })
    expect(input.getAttribute("aria-invalid")).toBe("true")
    expect(screen.getByText("Enter your name.")).toBeTruthy()
  })

  it("marks required fields visually without duplicating the announcement", () => {
    render(
      <Field>
        <FieldLabel required>Email</FieldLabel>
        <Input required />
      </Field>,
    )
    const star = screen.getByText("*")
    expect(star.getAttribute("aria-hidden")).toBe("true")
    expect(screen.getByRole("textbox", { name: "Email" })).toBeTruthy()
  })

  it("dims the label when disabled", () => {
    render(
      <Field disabled>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>,
    )
    const field = document.querySelector("[data-slot='field']")
    expect(field?.hasAttribute("data-disabled")).toBe(true)
    expect((screen.getByRole("textbox") as HTMLInputElement).disabled).toBe(
      true,
    )
  })
})
