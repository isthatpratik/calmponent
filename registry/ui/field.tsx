"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentProps, type ReactNode, useRef } from "react"

import { cn } from "@/lib/utils"

function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function FieldLegend({ className, ...props }: ComponentProps<"legend">) {
  return (
    <legend
      data-slot="field-legend"
      className={cn("title-3 mb-3 text-foreground", className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    />
  )
}

const fieldVariants = cva("group/field flex w-full gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-center justify-between gap-3",
    },
  },
  defaultVariants: { orientation: "vertical" },
})

type FieldProps = ComponentProps<typeof FieldPrimitive.Root> &
  VariantProps<typeof fieldVariants>

function Field({ className, orientation, ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    />
  )
}

type FieldLabelProps = ComponentProps<typeof FieldPrimitive.Label> & {
  /** Marks the field as required. The control's own `required` is announced. */
  required?: boolean
}

function FieldLabel({
  className,
  required,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "title-4 flex w-fit select-none items-center gap-1.5 text-foreground",
        "group-data-[disabled]/field:cursor-not-allowed group-data-[disabled]/field:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="text-muted-foreground">
          *
        </span>
      ) : null}
      {/* Appears once the value passes validation. Stays mounted so it can fade. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "size-3.5 text-success",
          "scale-75 opacity-0 transition-[opacity,scale] duration-300 ease-calm",
          // Only for a filled value: an empty optional field is valid but needs no check.
          "group-data-[valid]/field:group-data-[filled]/field:scale-100 group-data-[valid]/field:group-data-[filled]/field:opacity-100",
          "motion-reduce:scale-100",
        )}
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </FieldPrimitive.Label>
  )
}

function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(
        "caption-2 text-muted-foreground",
        "group-data-[disabled]/field:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

/** Keeps the last message on screen while the error animates out. */
function LastMessage({ message }: { message: ReactNode }) {
  const last = useRef<ReactNode>(message)
  if (message) last.current = message
  return last.current
}

/**
 * The error grows in under the field and pushes the content below it down
 * smoothly, then shrinks away when the value is fixed. It never pops.
 */
function FieldError({
  className,
  children,
  ...props
}: ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn(
        // -mt-2 cancels the field gap, so nothing jumps when the error unmounts.
        "-mt-2 grid grid-rows-[1fr] opacity-100",
        "transition-[grid-template-rows,opacity] duration-300 ease-calm",
        "data-[ending-style]:grid-rows-[0fr] data-[starting-style]:grid-rows-[0fr]",
        "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        "motion-reduce:transition-opacity",
        className,
      )}
      {...props}
    >
      <span className="min-h-0 overflow-hidden">
        <span className="caption-1 block pt-2 text-destructive">
          {children ?? (
            <FieldPrimitive.Validity>
              {(validity) => <LastMessage message={validity.error} />}
            </FieldPrimitive.Validity>
          )}
        </span>
      </span>
    </FieldPrimitive.Error>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldLabelProps,
  FieldLegend,
  type FieldProps,
  FieldSet,
}
