"use client"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@calmponent/registry/ui/field"
import { Input } from "@calmponent/registry/ui/input"
import { useEffect, useRef, useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const taken = ["admin", "calm", "pratik"]

export function FieldDemo() {
  const [checking, setChecking] = useState(false)

  return (
    <div className="well p-6">
      <FieldGroup className="max-w-sm">
        <Field validationMode="onBlur">
          <FieldLabel required>Email</FieldLabel>
          <Input type="email" required placeholder="ada@example.com" />
          <FieldDescription>Type ada, then click away.</FieldDescription>
          <FieldError />
        </Field>
        <Field
          validationMode="onChange"
          validationDebounceTime={400}
          validate={async (value) => {
            const name = String(value ?? "").trim()
            if (!name) return null
            setChecking(true)
            await wait(900)
            setChecking(false)
            return taken.includes(name.toLowerCase())
              ? "That username is taken."
              : null
          }}
        >
          <FieldLabel>Username</FieldLabel>
          <Input loading={checking} placeholder="Try calm, then ada" />
          <FieldDescription>Checked as you type.</FieldDescription>
          <FieldError />
        </Field>
      </FieldGroup>
    </div>
  )
}

function ValidField() {
  const actions = useRef<{ validate: () => void }>(null)
  useEffect(() => {
    actions.current?.validate()
  }, [])
  return (
    <Field actionsRef={actions} validate={() => null}>
      <FieldLabel>Email</FieldLabel>
      <Input defaultValue="ada@example.com" />
    </Field>
  )
}

const cell = "flex min-w-56 flex-col gap-2 p-4"

export function FieldStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          label: "with description",
          node: (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="ada@example.com" />
              <FieldDescription>We never share it.</FieldDescription>
            </Field>
          ),
        },
        {
          label: "required",
          node: (
            <Field>
              <FieldLabel required>Email</FieldLabel>
              <Input required placeholder="ada@example.com" />
            </Field>
          ),
        },
        {
          label: "invalid",
          node: (
            <Field invalid>
              <FieldLabel>Email</FieldLabel>
              <Input defaultValue="ada@" />
              <FieldError match>Enter a full email address.</FieldError>
            </Field>
          ),
        },
        { label: "valid", node: <ValidField /> },
        {
          label: "disabled",
          node: (
            <Field disabled>
              <FieldLabel>Email</FieldLabel>
              <Input defaultValue="ada@example.com" />
              <FieldDescription>Managed by your admin.</FieldDescription>
            </Field>
          ),
        },
        {
          label: "checking",
          node: (
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input loading defaultValue="ada" />
            </Field>
          ),
        },
      ].map((state) => (
        <div key={state.label} className={`${cell} bg-background`}>
          <span className="caption-3 text-muted-foreground">{state.label}</span>
          {state.node}
        </div>
      ))}
    </div>
  )
}
