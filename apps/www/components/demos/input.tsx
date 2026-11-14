"use client"

import { Input } from "@calmponent/registry/ui/input"
import { Spinner } from "@calmponent/registry/ui/spinner"

const states = [
  {
    label: "placeholder",
    node: <Input aria-label="Name" placeholder="Ada Lovelace" />,
  },
  {
    label: "filled",
    node: <Input aria-label="Name" defaultValue="Ada Lovelace" />,
  },
  {
    label: "invalid",
    node: <Input aria-label="Email" aria-invalid defaultValue="ada@" />,
  },
  {
    label: "read only",
    node: <Input aria-label="Plan" readOnly defaultValue="Team, 12 seats" />,
  },
  {
    label: "disabled",
    node: <Input aria-label="Name" disabled defaultValue="Ada Lovelace" />,
  },
  {
    label: "checking",
    node: <Input aria-label="Username" loading defaultValue="ada" />,
  },
]

export function InputStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {states.map((state) => (
        <div key={state.label} className="flex flex-col gap-2 bg-card p-4">
          <span className="caption-3 text-muted-foreground">{state.label}</span>
          {state.node}
        </div>
      ))}
    </div>
  )
}

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-6">
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  )
}
