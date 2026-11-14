"use client"

import { Checkbox } from "@calmponent/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@calmponent/registry/ui/field"
import { Form, FormMessage, FormSubmit } from "@calmponent/registry/ui/form"
import { Input } from "@calmponent/registry/ui/input"
import { toast } from "@calmponent/registry/ui/toast"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function FormDemo() {
  return (
    <div className="well p-6">
      <Form
        className="max-w-sm"
        onFormSubmit={async (values) => {
          await wait(1200)
          if (values.outage) {
            return {
              error: "Our servers are not responding. Try again in a minute.",
            }
          }
          if (String(values.email).toLowerCase() === "ada@example.com") {
            return { errors: { email: "That email already has an account." } }
          }
          toast.success("Account created", {
            description: `We sent a link to ${values.email}.`,
          })
          return { success: "Account created. Check your inbox." }
        }}
      >
        <Field name="name">
          <FieldLabel required>Name</FieldLabel>
          <Input required placeholder="Grace Hopper" />
          <FieldError />
        </Field>
        <Field name="email">
          <FieldLabel required>Email</FieldLabel>
          <Input type="email" required placeholder="grace@example.com" />
          <FieldDescription>
            Try ada@example.com to see a server error.
          </FieldDescription>
          <FieldError />
        </Field>
        <Field name="outage" orientation="horizontal" className="w-fit">
          <Checkbox />
          <FieldLabel>Simulate a server outage</FieldLabel>
        </Field>
        <FormMessage />
        <FormSubmit
          statusText={{
            loading: "Creating account",
            success: "Created",
            error: "Try again",
          }}
        >
          Create account
        </FormSubmit>
      </Form>
    </div>
  )
}
