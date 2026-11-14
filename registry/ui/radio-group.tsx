"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive>) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

/** The dot grows in when selected and shrinks out when another is chosen. */
function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio peer relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-input bg-transparent outline-none",
        // Release flash on the border.
        "transition-[border-color,box-shadow,scale] duration-400 ease-fade",
        "not-data-[disabled]:active:border-foreground/60 not-data-[disabled]:active:duration-0",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-90 motion-reduce:active:scale-100",
        "data-[checked]:border-primary",
        "data-[invalid]:border-destructive aria-[invalid=true]:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        keepMounted
        data-slot="radio-group-indicator"
        className={cn(
          "size-2 rounded-full bg-primary",
          // The dot pops in on a spring and shrinks out calmly.
          "scale-0 transition-[scale] duration-300 ease-calm group-data-[checked]/radio:duration-500 group-data-[checked]/radio:ease-pop",
          "group-data-[checked]/radio:scale-100",
          "motion-reduce:transition-none",
        )}
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
