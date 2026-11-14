"use client"

import { Checkbox } from "@calmponent/registry/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@calmponent/registry/ui/field"
import { RadioGroup, RadioGroupItem } from "@calmponent/registry/ui/radio-group"
import { Switch } from "@calmponent/registry/ui/switch"
import { type ReactNode, useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>
}

function Grid({ states }: { states: { label: string; node: ReactNode }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {states.map((state) => (
        <div key={state.label} className="flex flex-col gap-3 bg-card p-4">
          <span className="caption-3 text-muted-foreground">{state.label}</span>
          {state.node}
        </div>
      ))}
    </div>
  )
}

const items = ["Invoices", "Receipts", "Reports"]

export function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>(["Invoices"])
  const all = checked.length === items.length
  const some = checked.length > 0 && !all
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          checked={all}
          indeterminate={some}
          onCheckedChange={(value) => setChecked(value ? items : [])}
        />
        <FieldLabel>Email me all documents</FieldLabel>
      </Field>
      <div className="flex flex-col gap-3 pl-7">
        {items.map((item) => (
          <Field key={item} orientation="horizontal" className="w-fit">
            <Checkbox
              checked={checked.includes(item)}
              onCheckedChange={(value) =>
                setChecked((current) =>
                  value
                    ? [...current, item]
                    : current.filter((name) => name !== item),
                )
              }
            />
            <FieldLabel>{item}</FieldLabel>
          </Field>
        ))}
      </div>
    </div>
  )
}

export function CheckboxStates() {
  return (
    <Grid
      states={[
        {
          label: "unchecked",
          node: (
            <Row>
              <Checkbox aria-label="Accept" />
            </Row>
          ),
        },
        {
          label: "checked",
          node: (
            <Row>
              <Checkbox aria-label="Accept" defaultChecked />
            </Row>
          ),
        },
        {
          label: "indeterminate",
          node: (
            <Row>
              <Checkbox aria-label="Select all" indeterminate />
            </Row>
          ),
        },
        {
          label: "invalid",
          node: (
            <Row>
              <Checkbox aria-label="Accept" aria-invalid />
            </Row>
          ),
        },
        {
          label: "disabled",
          node: (
            <Row>
              <Checkbox aria-label="Accept" disabled />
            </Row>
          ),
        },
        {
          label: "disabled checked",
          node: (
            <Row>
              <Checkbox aria-label="Accept" disabled defaultChecked />
            </Row>
          ),
        },
      ]}
    />
  )
}

export function RadioDemo() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <RadioGroup defaultValue="team" aria-label="Plan">
        {[
          ["free", "Free", "For one person."],
          ["team", "Team", "Up to 20 seats."],
          ["business", "Business", "Unlimited seats and SSO."],
        ].map(([value, label, hint]) => (
          <Field
            key={value}
            orientation="horizontal"
            className="w-fit items-start"
          >
            <RadioGroupItem value={value} className="mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <FieldLabel>{label}</FieldLabel>
              <FieldDescription>{hint}</FieldDescription>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </div>
  )
}

export function RadioStates() {
  return (
    <Grid
      states={[
        {
          label: "selected",
          node: (
            <RadioGroup defaultValue="a" aria-label="Choice">
              <RadioGroupItem value="a" aria-label="A" />
              <RadioGroupItem value="b" aria-label="B" />
            </RadioGroup>
          ),
        },
        {
          label: "invalid",
          node: (
            <RadioGroup aria-label="Choice">
              <RadioGroupItem value="a" aria-label="A" aria-invalid />
              <RadioGroupItem value="b" aria-label="B" aria-invalid />
            </RadioGroup>
          ),
        },
        {
          label: "disabled item",
          node: (
            <RadioGroup defaultValue="a" aria-label="Choice">
              <RadioGroupItem value="a" aria-label="A" />
              <RadioGroupItem value="b" aria-label="B" disabled />
            </RadioGroup>
          ),
        },
      ]}
    />
  )
}

export function SwitchDemo() {
  const [on, setOn] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const [failNext, setFailNext] = useState(true)

  async function change(next: boolean) {
    setError(false)
    setOn(next)
    setPending(true)
    await wait(1200)
    setPending(false)
    if (failNext) {
      setOn(!next)
      setError(true)
    }
    setFailNext((value) => !value)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <Field
        orientation="horizontal"
        invalid={error}
        className="max-w-sm flex-wrap justify-start"
      >
        <Switch checked={on} pending={pending} onCheckedChange={change} />
        <FieldLabel>Weekly summary email</FieldLabel>
        <FieldError match={error} className="w-full">
          Could not save. Try again.
        </FieldError>
      </Field>
      <p className="caption-2 mt-4 text-muted-foreground">
        The first change fails on purpose. The next one saves.
      </p>
    </div>
  )
}

export function SwitchStates() {
  return (
    <Grid
      states={[
        {
          label: "off",
          node: (
            <Row>
              <Switch aria-label="Email" />
            </Row>
          ),
        },
        {
          label: "on",
          node: (
            <Row>
              <Switch aria-label="Email" defaultChecked />
            </Row>
          ),
        },
        {
          label: "pending",
          node: (
            <Row>
              <Switch aria-label="Email" defaultChecked pending />
            </Row>
          ),
        },
        {
          label: "failed",
          node: (
            <Field
              invalid
              orientation="horizontal"
              className="flex-wrap justify-start"
            >
              <Switch aria-label="Email" />
              <FieldError match className="w-full">
                Could not save. Try again.
              </FieldError>
            </Field>
          ),
        },
        {
          label: "disabled",
          node: (
            <Row>
              <Switch aria-label="Email" disabled />
            </Row>
          ),
        },
        {
          label: "disabled on",
          node: (
            <Row>
              <Switch aria-label="Email" disabled defaultChecked />
            </Row>
          ),
        },
      ]}
    />
  )
}
