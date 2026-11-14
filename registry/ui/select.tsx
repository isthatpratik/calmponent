"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Children, type ComponentProps, type ReactNode } from "react"

import { cn } from "@/lib/utils"

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
    >
      <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />
    </svg>
  )
}

const Select = SelectPrimitive.Root

function SelectGroup({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "truncate data-[placeholder]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "group/select body-6 flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-foreground outline-none",
        "h-9 data-[size=sm]:h-8",
        "transition-[border-color,box-shadow,background-color] duration-200 ease-calm",
        "hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
        "data-[popup-open]:border-ring",
        "data-[invalid]:border-destructive aria-[invalid=true]:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        className={cn(
          "flex shrink-0 text-muted-foreground",
          // Turns when the list opens: the motion follows the cause.
          "transition-[rotate] duration-300 ease-calm group-data-[popup-open]/select:rotate-180",
          "motion-reduce:transition-none",
        )}
      >
        <Chevron />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

type SelectContentProps = ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<
    ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    /** Shown when there are no items, for example when a filter matches nothing. */
    empty?: ReactNode
  }

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  empty = "Nothing to choose yet.",
  ...props
}: SelectContentProps) {
  const isEmpty = Children.count(children) === 0
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
            "transition-[opacity,scale] duration-200 ease-calm",
            "data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
            "motion-reduce:data-[ending-style]:scale-100 motion-reduce:data-[starting-style]:scale-100",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="max-h-(--available-height) overflow-y-auto p-1">
            {isEmpty ? (
              <div
                data-slot="select-empty"
                className="caption-2 px-2.5 py-6 text-center text-muted-foreground"
              >
                {empty}
              </div>
            ) : (
              children
            )}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("caption-3 px-2.5 py-1.5 text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group/item body-5 relative flex w-full cursor-pointer select-none items-center justify-between gap-6 rounded-lg py-1.5 pr-2 pl-2.5 text-muted-foreground outline-none",
        "transition-colors duration-200 ease-calm",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[selected]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        keepMounted
        className={cn(
          "flex size-4 items-center justify-center",
          "scale-75 opacity-0 transition-[opacity,scale] duration-200 ease-calm",
          "group-data-[selected]/item:scale-100 group-data-[selected]/item:opacity-100",
          "motion-reduce:scale-100",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "absolute inset-x-0 top-0 z-10 flex h-6 cursor-default items-center justify-center bg-popover text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Chevron className="rotate-180" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex h-6 cursor-default items-center justify-center bg-popover text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Chevron />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  type SelectContentProps,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
