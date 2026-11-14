"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { type ChangeEvent, type ComponentProps, useState } from "react"

import { cn } from "@/lib/utils"

const textareaClasses = [
  "body-6 field-sizing-content min-h-20 w-full min-w-0 resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-foreground outline-none",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-calm",
  // Grows with its content where supported; elsewhere the user can resize it.
  "supports-[field-sizing:content]:resize-none",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
  "data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive/30 aria-[invalid=true]:border-destructive",
  "read-only:bg-muted read-only:focus-visible:ring-0",
  "disabled:cursor-not-allowed disabled:opacity-50",
]

type TextareaProps = Omit<ComponentProps<"textarea">, "children"> & {
  /**
   * With `maxLength`, a counter shows how many characters are used. It turns
   * amber from this share of the limit. Defaults to 0.9.
   */
  warnAt?: number
}

/** Screen readers hear the count only at these points, not on every key. */
function announcement(left: number) {
  if (left === 0) return "Character limit reached"
  if (left === 10 || left === 20 || left === 50)
    return `${left} characters left`
  return null
}

function Textarea({
  className,
  maxLength,
  warnAt = 0.9,
  onChange,
  value,
  defaultValue,
  ...props
}: TextareaProps) {
  const initial = String(value ?? defaultValue ?? "").length
  const [count, setCount] = useState(initial)
  const [spoken, setSpoken] = useState("")
  const length = value === undefined ? count : String(value).length

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const next = event.target.value.length
    setCount(next)
    if (maxLength) {
      const message = announcement(maxLength - next)
      if (message) setSpoken(message)
    }
    onChange?.(event)
  }

  const control = (
    <FieldPrimitive.Control
      data-slot="textarea"
      render={<textarea />}
      className={cn(textareaClasses, className)}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      // Base UI types Field.Control events as input events; ours is a textarea.
      onChange={(event) =>
        handleChange(event as unknown as ChangeEvent<HTMLTextAreaElement>)
      }
      // Textarea attributes are valid here; Base UI only types input ones.
      {...(props as ComponentProps<typeof FieldPrimitive.Control>)}
    />
  )

  if (!maxLength) return control

  const near = length >= Math.floor(maxLength * warnAt)
  const full = length >= maxLength

  return (
    <span data-slot="textarea-wrapper" className="flex w-full flex-col gap-1">
      {control}
      <span
        data-slot="textarea-count"
        data-near={(near && !full) || undefined}
        data-full={full || undefined}
        aria-hidden="true"
        className={cn(
          "caption-5 self-end text-muted-foreground tabular-nums",
          "transition-colors duration-200 ease-calm",
          "data-[near]:text-warning data-[full]:text-destructive",
        )}
      >
        {length} / {maxLength}
      </span>
      <span role="status" className="sr-only">
        {spoken}
      </span>
    </span>
  )
}

export { Textarea, type TextareaProps }
