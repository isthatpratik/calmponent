"use client"

import { Children, type ComponentProps, type ReactNode } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type TimelineStatus = "done" | "running" | "pending" | "failed" | "skipped"

const statusLabel: Record<TimelineStatus, string> = {
  done: "Done",
  running: "In progress",
  pending: "Not started",
  failed: "Failed",
  skipped: "Skipped",
}

function StatusIcon({ status }: { status: TimelineStatus }) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    className: "size-4",
  }
  if (status === "running")
    return <Spinner decorative className="size-4 text-foreground" />
  if (status === "done")
    return (
      <svg aria-hidden="true" {...common}>
        <circle cx="8" cy="8" r="8" className="fill-foreground" />
        <path
          d="M4.75 8.25l2 2 4.5-4.5"
          className="stroke-background"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  if (status === "failed")
    return (
      <svg aria-hidden="true" {...common}>
        <circle cx="8" cy="8" r="8" className="fill-destructive" />
        <path
          d="M5.5 5.5l5 5m0-5l-5 5"
          className="stroke-background"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    )
  if (status === "skipped")
    return (
      <svg aria-hidden="true" {...common}>
        <circle
          cx="8"
          cy="8"
          r="7"
          className="stroke-muted-foreground"
          strokeWidth="1.5"
          strokeDasharray="2.5 2.5"
        />
      </svg>
    )
  return (
    <svg aria-hidden="true" {...common}>
      <circle cx="8" cy="8" r="7" className="stroke-input" strokeWidth="1.5" />
    </svg>
  )
}

type TimelineProps = ComponentProps<"ol"> & {
  /** Shows skeleton rows shaped like real items while the data loads. */
  loading?: boolean
  /** How many skeleton rows to show while loading. */
  loadingRows?: number
  /** Shown when there are no items and nothing is loading. */
  empty?: ReactNode
}

function Timeline({
  className,
  children,
  loading = false,
  loadingRows = 3,
  empty = "Nothing has happened yet.",
  ...props
}: TimelineProps) {
  if (loading) {
    return (
      <ol
        data-slot="timeline"
        aria-busy="true"
        aria-label="Loading"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {Array.from(
          { length: loadingRows },
          (_, index) => `skeleton-${index}`,
        ).map((row) => (
          <li key={row} className="grid grid-cols-[4rem_1rem_1fr] gap-x-3 pb-6">
            <span className="mt-0.5 h-3 w-10 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
            <span className="size-4 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
            <span className="flex flex-col gap-2">
              <span className="h-3.5 w-2/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
              <span className="h-3 w-3/5 animate-pulse rounded-sm bg-muted motion-reduce:animate-none" />
            </span>
          </li>
        ))}
      </ol>
    )
  }

  if (Children.count(children) === 0) {
    return (
      <div
        data-slot="timeline-empty"
        className={cn(
          "caption-2 rounded-xl border border-border border-dashed px-4 py-8 text-center text-muted-foreground",
          className,
        )}
      >
        {empty}
      </div>
    )
  }

  return (
    <ol
      data-slot="timeline"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </ol>
  )
}

type TimelineItemProps = Omit<ComponentProps<"li">, "title"> & {
  status?: TimelineStatus
  title: ReactNode
  description?: ReactNode
  /** When it happened, shown in the left column. */
  time?: ReactNode
  /** How long it took, shown on the right. */
  duration?: ReactNode
}

/**
 * One event. The connector below it fills from the top when the event is
 * done, drawing the line down to the next one. A new status icon pops in.
 */
function TimelineItem({
  className,
  status = "pending",
  title,
  description,
  time,
  duration,
  ...props
}: TimelineItemProps) {
  const filled = status === "done"
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      aria-current={status === "running" ? "step" : undefined}
      className={cn(
        "group/item grid grid-cols-[4rem_1rem_1fr] gap-x-3",
        className,
      )}
      {...props}
    >
      <span className="caption-5 pt-0.5 text-muted-foreground tabular-nums">
        {time}
      </span>
      <span className="flex flex-col items-center">
        <span
          key={status}
          className="flex transition-[scale,opacity] duration-500 ease-pop starting:scale-50 starting:opacity-0 motion-reduce:starting:scale-100"
        >
          <StatusIcon status={status} />
        </span>
        {/* The rail: a quiet track, and a fill that draws down when done. */}
        <span
          aria-hidden="true"
          className="relative my-1 w-px flex-1 bg-border group-last/item:hidden"
        >
          <span
            className={cn(
              "absolute inset-0 origin-top bg-foreground",
              "transition-[scale] duration-500 ease-calm motion-reduce:transition-none",
              filled ? "scale-y-100" : "scale-y-0",
            )}
          />
        </span>
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 pb-6 group-last/item:pb-0">
        <span className="flex items-baseline justify-between gap-3">
          <span
            className={cn(
              "body-5 text-foreground transition-colors duration-300 ease-calm",
              "group-data-[status=pending]/item:text-muted-foreground group-data-[status=skipped]/item:text-muted-foreground group-data-[status=skipped]/item:line-through",
            )}
          >
            {title}
            <span className="sr-only">, {statusLabel[status]}</span>
          </span>
          {duration ? (
            <span className="caption-5 shrink-0 text-muted-foreground tabular-nums">
              {duration}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="caption-2 text-muted-foreground group-data-[status=failed]/item:text-destructive">
            {description}
          </span>
        ) : null}
      </span>
    </li>
  )
}

export {
  Timeline,
  TimelineItem,
  type TimelineItemProps,
  type TimelineProps,
  type TimelineStatus,
}
