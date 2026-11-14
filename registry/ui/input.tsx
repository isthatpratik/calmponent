"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import type { ComponentProps } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const inputClasses = [
  "body-6 h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 text-foreground outline-none",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-calm",
  "placeholder:text-muted-foreground",
  "file:mr-3 file:border-0 file:bg-transparent file:font-medium file:text-foreground",
  "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
  // Base UI sets data-invalid from validation, and aria-invalid for assistive tech.
  "data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive/30 aria-[invalid=true]:border-destructive",
  "read-only:bg-muted read-only:focus-visible:ring-0",
  "disabled:cursor-not-allowed disabled:opacity-50",
]

type InputProps = ComponentProps<typeof InputPrimitive> & {
  /**
   * Shows that a value is being checked, for example a username lookup.
   * Leave it unset for a plain input.
   */
  loading?: boolean
}

function Input({ className, loading, ...props }: InputProps) {
  if (loading === undefined) {
    return (
      <InputPrimitive
        data-slot="input"
        className={cn(inputClasses, className)}
        {...props}
      />
    )
  }

  return (
    <span data-slot="input-wrapper" className="relative block w-full">
      <InputPrimitive
        data-slot="input"
        aria-busy={loading || undefined}
        className={cn(inputClasses, "pr-9", className)}
        {...props}
      />
      {/* Stays mounted and keeps turning, so it fades in mid-turn. */}
      <Spinner
        decorative
        className={cn(
          "-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 text-muted-foreground",
          "transition-[opacity,scale] duration-300 ease-calm motion-reduce:transition-opacity",
          loading
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0 motion-reduce:scale-100",
        )}
      />
      <span role="status" className="sr-only">
        {loading ? "Checking" : ""}
      </span>
    </span>
  )
}

export { Input, type InputProps }
