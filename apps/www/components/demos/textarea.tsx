"use client"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@calmponent/registry/ui/field"
import { Textarea } from "@calmponent/registry/ui/textarea"
import { usePreviewState } from "@/components/preview-state"

export function TextareaDemo() {
  const forced = usePreviewState(["error", "disabled"])
  return (
    <div className="well p-6">
      <Field className="max-w-md">
        <FieldLabel>Bio</FieldLabel>
        <Textarea
          aria-invalid={forced === "error" || undefined}
          disabled={forced === "disabled"}
          maxLength={120}
          defaultValue="Designer and engineer. I build calm interfaces with every state."
        />
        <FieldDescription>
          Keep typing: it grows, and the count turns amber near the limit.
        </FieldDescription>
      </Field>
    </div>
  )
}

const states = [
  {
    label: "placeholder",
    node: <Textarea aria-label="Note" placeholder="Add a note" />,
  },
  {
    label: "with count",
    node: (
      <Textarea aria-label="Bio" maxLength={120} defaultValue="Short bio." />
    ),
  },
  {
    label: "near limit",
    node: (
      <Textarea
        aria-label="Bio"
        maxLength={34}
        defaultValue="Almost at the end of the limit."
      />
    ),
  },
  {
    label: "at limit",
    node: (
      <Textarea
        aria-label="Bio"
        maxLength={24}
        defaultValue="Exactly at the limit now"
      />
    ),
  },
  {
    label: "invalid",
    node: <Textarea aria-label="Note" aria-invalid defaultValue="Too short" />,
  },
  {
    label: "disabled",
    node: <Textarea aria-label="Note" disabled defaultValue="Locked note" />,
  },
]

export function TextareaStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {states.map((state) => (
        <div
          key={state.label}
          className="flex flex-col gap-2 bg-background p-4"
        >
          <span className="caption-3 text-muted-foreground">{state.label}</span>
          {state.node}
        </div>
      ))}
    </div>
  )
}
