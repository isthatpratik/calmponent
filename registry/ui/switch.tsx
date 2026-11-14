"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  /**
   * The change is being saved. The thumb breathes slowly and the switch
   * ignores input until the result is known. If saving fails, set `checked`
   * back: the thumb slides back to where it was.
   */
  pending?: boolean
}

/**
 * Track 44×24 with our 8px radius. The 16px thumb sits 3px inside, so its
 * radius is 8 − 4 = 4px. It travels 20px on a fast curve, and while pressed
 * it widens toward the centre, as if it were being pushed.
 */
function Switch({
  className,
  pending = false,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-pending={pending || undefined}
      aria-busy={pending || undefined}
      // Pending blocks input but keeps the switch at full strength.
      disabled={disabled || pending}
      className={cn(
        "group/switch peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-lg border border-input bg-transparent outline-none",
        // Release flash on the border; the fill follows the state quickly.
        "transition-[background-color,border-color,box-shadow] duration-400 ease-fade",
        "not-data-[disabled]:active:border-foreground/60 not-data-[disabled]:active:duration-0",
        "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:duration-150",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[invalid]:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[pending]:cursor-progress data-[pending]:opacity-100",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-sm bg-input",
          "translate-x-0.75 transition-[translate,width,background-color,opacity] duration-300 ease-snap",
          "group-hover/switch:bg-muted-foreground",
          "group-data-[checked]/switch:translate-x-5.75 group-data-[checked]/switch:bg-primary-foreground",
          // Pressed: the thumb widens, and when on it grows toward the centre.
          "group-active/switch:w-5 group-data-[checked]/switch:group-active/switch:translate-x-4.75",
          "group-data-[disabled]/switch:group-active/switch:w-4",
          // Waiting for the result: a slow breath, not a spinner.
          "group-data-[pending]/switch:animate-pulse",
          "motion-reduce:transition-none motion-reduce:group-data-[pending]/switch:animate-none motion-reduce:group-data-[pending]/switch:opacity-60",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, type SwitchProps }
