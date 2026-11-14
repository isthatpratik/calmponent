"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "gap-1 rounded-lg bg-muted p-1",
        line: "gap-4 border-border border-b",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

/**
 * The highlight slides to the chosen tab: a pill in the default variant, a
 * line under the tab in the line variant.
 */
function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className={cn(
          "absolute left-0 w-(--active-tab-width) translate-x-(--active-tab-left)",
          "transition-[translate,width] duration-300 ease-snap motion-reduce:transition-none",
          variant === "line"
            ? "-bottom-px h-px bg-foreground"
            : "top-1/2 h-[calc(100%-0.5rem)] -translate-y-1/2 rounded-md bg-background shadow-[0_1px_2px_rgb(0_0_0/0.2),0_0_0_1px_var(--border)]",
        )}
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "button-sm relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 outline-none",
        "transition-colors duration-200 ease-calm hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "data-[active]:text-foreground",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pb-2.5",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

type TabsContentProps = ComponentProps<typeof TabsPrimitive.Panel> & {
  /** Shows skeleton lines shaped like content while the panel loads. */
  loading?: boolean
}

/**
 * The new panel slides in a few pixels from the side of the chosen tab and
 * fades in, so the content follows the direction of the choice.
 */
function TabsContent({
  className,
  loading = false,
  children,
  ...props
}: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      aria-busy={loading || undefined}
      className={cn(
        "outline-none transition-[opacity,translate] duration-300 ease-calm",
        "starting:opacity-0",
        "data-[activation-direction=right]:starting:translate-x-2 data-[activation-direction=left]:starting:-translate-x-2",
        "data-[activation-direction=down]:starting:translate-y-2 data-[activation-direction=up]:starting:-translate-y-2",
        "motion-reduce:starting:translate-x-0 motion-reduce:starting:translate-y-0",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {loading ? (
        <div data-slot="tabs-skeleton" className="flex flex-col gap-3">
          <span className="h-4 w-1/3 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
          <span className="h-3 w-4/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
          <span className="h-3 w-3/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
        </div>
      ) : (
        children
      )}
    </TabsPrimitive.Panel>
  )
}

export {
  Tabs,
  TabsContent,
  type TabsContentProps,
  TabsList,
  TabsTrigger,
  tabsListVariants,
}
