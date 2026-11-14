import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Field, FieldError, FieldLabel } from "./field"
import { Form, FormMessage, type FormResult, FormSubmit } from "./form"
import { Input } from "./input"

afterEach(cleanup)

function Demo({
  onFormSubmit,
}: {
  onFormSubmit: (values: Record<string, unknown>) => Promise<FormResult>
}) {
  return (
    <Form onFormSubmit={onFormSubmit}>
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input required />
        <FieldError />
      </Field>
      <FormMessage />
      <FormSubmit>Save</FormSubmit>
    </Form>
  )
}

async function submitWith(value: string) {
  fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
    target: { value },
  })
  await act(async () => {
    fireEvent.submit(document.querySelector("form") as HTMLFormElement)
  })
}

describe("Form", () => {
  it("passes the values to onFormSubmit", async () => {
    const submit = vi.fn(async () => ({ success: "Saved." }))
    render(<Demo onFormSubmit={submit} />)
    await submitWith("ada@example.com")
    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ada@example.com" }),
    )
  })

  it("shows server errors on their fields", async () => {
    render(
      <Demo
        onFormSubmit={async () => ({
          errors: { email: "That email is taken." },
        })}
      />,
    )
    await submitWith("ada@example.com")
    expect(await screen.findByText("That email is taken.")).toBeTruthy()
    expect(
      screen
        .getByRole("textbox", { name: "Email" })
        .getAttribute("aria-invalid"),
    ).toBe("true")
  })

  it("shows a form error as an alert", async () => {
    render(
      <Demo onFormSubmit={async () => ({ error: "The server is down." })} />,
    )
    await submitWith("ada@example.com")
    expect(screen.getByRole("alert").textContent).toBe("The server is down.")
    const button = screen.getByRole("button")
    expect(button.getAttribute("data-status")).toBe("error")
  })

  it("treats a thrown error as a form error", async () => {
    render(
      <Demo
        onFormSubmit={async () => {
          throw new Error("Network unreachable.")
        }}
      />,
    )
    await submitWith("ada@example.com")
    expect(screen.getByRole("alert").textContent).toBe("Network unreachable.")
  })

  it("confirms success on the button and in the message", async () => {
    render(<Demo onFormSubmit={async () => ({ success: "Profile saved." })} />)
    await submitWith("ada@example.com")
    expect(screen.getByText("Profile saved.")).toBeTruthy()
    expect(screen.getByRole("button").getAttribute("data-status")).toBe(
      "success",
    )
  })

  it("shows loading on the button while submitting", async () => {
    let finish: () => void = () => {}
    render(
      <Demo
        onFormSubmit={() =>
          new Promise<FormResult>((resolve) => {
            finish = () => resolve({})
          })
        }
      />,
    )
    await submitWith("ada@example.com")
    const button = screen.getByRole("button")
    expect(button.getAttribute("data-status")).toBe("loading")
    expect(document.querySelector("form")?.getAttribute("aria-busy")).toBe(
      "true",
    )
    await act(async () => finish())
    expect(button.getAttribute("data-status")).toBe("success")
  })
})
