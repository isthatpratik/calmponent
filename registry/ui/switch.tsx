"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import type { ComponentProps } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  /**
   * The change is being saved. The thumb shows a spinner and the switch
   * ignores input until the result is known. If saving fails, set `checked`
   * back: the thumb slides back to where it was.
   */
  pending?: boolean
}

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
        "group/switch peer relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input outline-none",
        "transition-[background-color,box-shadow] duration-300 ease-calm",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[checked]:bg-primary",
        "data-[invalid]:ring-2 data-[invalid]:ring-destructive/40",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[pending]:cursor-progress data-[pending]:opacity-100",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none flex size-4 items-center justify-center rounded-full bg-background shadow-sm",
          "translate-x-0.5 transition-[translate,scale] duration-300 ease-calm",
          "group-data-[checked]/switch:translate-x-4",
          "group-active/switch:scale-90 motion-reduce:group-active/switch:scale-100",
          "motion-reduce:transition-none",
        )}
      >
        <Spinner
          decorative
          className={cn(
            "size-3 text-foreground transition-opacity duration-200 ease-calm",
            pending ? "opacity-100" : "opacity-0",
          )}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch, type SwitchProps }
