"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * The check draws itself when checked and erases when unchecked. The
 * indeterminate dash grows from the center. Both stay mounted, so they
 * animate both ways.
 */
function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/checkbox peer relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-input bg-transparent text-primary-foreground outline-none",
        // Release flash on the border; the fill follows the state quickly.
        "transition-[background-color,border-color,box-shadow,scale] duration-400 ease-fade",
        "not-data-[disabled]:active:border-foreground/60 not-data-[disabled]:active:duration-0",
        "data-[checked]:duration-200 data-[indeterminate]:duration-200",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-90 motion-reduce:active:scale-100",
        "data-[checked]:border-primary data-[checked]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:bg-primary",
        "data-[invalid]:border-destructive aria-[invalid=true]:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "size-3.5",
            // The mark pops in on a spring while the check draws itself.
            "scale-75 transition-[scale] duration-500 ease-pop",
            "group-data-[checked]/checkbox:scale-100 group-data-[indeterminate]/checkbox:scale-100",
            "motion-reduce:scale-100 motion-reduce:transition-none",
          )}
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            pathLength={1}
            className={cn(
              "[stroke-dasharray:1] [stroke-dashoffset:1]",
              "transition-[stroke-dashoffset] duration-300 ease-calm",
              "group-data-[checked]/checkbox:[stroke-dashoffset:0]",
              "motion-reduce:transition-none",
            )}
          />
          <path
            d="M6 12h12"
            className={cn(
              "origin-center scale-x-0",
              "transition-[scale] duration-300 ease-calm",
              "group-data-[indeterminate]/checkbox:scale-x-100",
              "motion-reduce:transition-none",
            )}
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
