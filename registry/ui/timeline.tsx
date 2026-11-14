"use client"

import {
  Children,
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react"

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

/** Proportional mode: rails are as long as the step took. */
const ScaleContext = createContext<{
  pxPerSecond: number
  maxRail: number
} | null>(null)

type TimelineProps = ComponentProps<"ol"> & {
  /**
   * Draws each rail as long as its step took, using `seconds` on items, and a
   * ghost of `previousSeconds` to compare with the last run.
   */
  proportional?: boolean
  /** Rail length per second in proportional mode. Defaults to 4px. */
  pxPerSecond?: number
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
  proportional = false,
  pxPerSecond = 4,
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
    <ScaleContext.Provider
      value={proportional ? { pxPerSecond, maxRail: 160 } : null}
    >
      <ol
        data-slot="timeline"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </ol>
    </ScaleContext.Provider>
  )
}

/** A title, mono metadata such as author and commit, and an optional total. */
function TimelineHeader({
  className,
  title,
  meta,
  total,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode
  meta?: ReactNode
  total?: ReactNode
}) {
  return (
    <div
      data-slot="timeline-header"
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="title-3 text-foreground">{title}</span>
        {meta ? (
          <span className="caption-5 font-mono text-muted-foreground">
            {meta}
          </span>
        ) : null}
      </div>
      {total ? (
        <span className="heading-6 shrink-0 text-foreground tabular-nums">
          {total}
        </span>
      ) : null}
    </div>
  )
}

/** A phase of the run, such as Build or Deploy, with its own steps. */
function TimelineGroup({
  className,
  label,
  total,
  children,
  ...props
}: Omit<ComponentProps<"li">, "title"> & {
  label: ReactNode
  total?: ReactNode
}) {
  return (
    <li
      data-slot="timeline-group"
      className={cn("flex flex-col gap-3 pb-6 last:pb-0", className)}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="caption-1 text-muted-foreground">{label}</span>
        {total ? (
          <span className="caption-5 text-muted-foreground tabular-nums">
            {total}
          </span>
        ) : null}
      </div>
      <ol className="flex flex-col">{children}</ol>
    </li>
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
  /** In proportional mode: how long it took, in seconds. */
  seconds?: number
  /** In proportional mode: how long it took last time, drawn as a ghost. */
  previousSeconds?: number
}

/**
 * One event. When it is done, the line below it draws down to the next one,
 * and a new status icon pops in. In proportional mode the line is as long as
 * the step took, next to a ghost of the last run.
 */
function TimelineItem({
  className,
  status = "pending",
  title,
  description,
  time,
  duration,
  seconds,
  previousSeconds,
  ...props
}: TimelineItemProps) {
  const scale = useContext(ScaleContext)
  const filled = status === "done"
  const rail = (value?: number) =>
    scale && value ? Math.min(scale.maxRail, value * scale.pxPerSecond) : 0
  const railLength = rail(seconds)
  const ghostLength = rail(previousSeconds)
  const proportional = railLength > 0 || ghostLength > 0
  const barTone =
    status === "failed"
      ? "bg-destructive"
      : status === "running"
        ? "animate-pulse bg-foreground/50 motion-reduce:animate-none"
        : "bg-foreground"

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
          className={cn(
            "relative my-1 flex w-px flex-1 justify-center bg-border",
            !proportional && "group-last/item:hidden",
          )}
          style={
            proportional
              ? { minHeight: Math.max(railLength, ghostLength) + 8 }
              : undefined
          }
        >
          {proportional ? (
            <>
              {ghostLength ? (
                <span
                  className="absolute top-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-foreground/12"
                  style={{ height: ghostLength }}
                />
              ) : null}
              <span
                className={cn(
                  "absolute top-0 left-1/2 w-1 origin-top -translate-x-1/2 rounded-full",
                  barTone,
                  "transition-[scale] duration-700 ease-calm motion-reduce:transition-none",
                  status === "pending" || status === "skipped"
                    ? "scale-y-0"
                    : "scale-y-100",
                )}
                style={{ height: railLength }}
              />
            </>
          ) : (
            <span
              className={cn(
                "absolute inset-0 origin-top bg-foreground",
                "transition-[scale] duration-500 ease-calm motion-reduce:transition-none",
                filled ? "scale-y-100" : "scale-y-0",
              )}
            />
          )}
        </span>
      </span>
      <span
        className={cn(
          "flex min-w-0 flex-col gap-0.5 pb-6",
          !proportional && "group-last/item:pb-0",
        )}
      >
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
        {previousSeconds ? (
          <span className="caption-5 mt-auto pt-2 text-muted-foreground tabular-nums">
            was {previousSeconds}s
          </span>
        ) : null}
      </span>
    </li>
  )
}

type TimelineBarSegment = {
  id: string
  label: ReactNode
  seconds: number
  /** Segments with the same group share a label above the bar. */
  group?: string
  status?: TimelineStatus
}

/** Phases differ by gray step; color is kept for status only. */
const groupTones = ["bg-foreground", "bg-foreground/60", "bg-foreground/35"]

function clock(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${String(minutes).padStart(2, "0")}:${String(Math.round(seconds % 60)).padStart(2, "0")}`
}

/**
 * The whole run at a glance: one segment per step, as wide as it took.
 * Segments grow in from the left; one tooltip glides between them.
 */
function TimelineBar({
  className,
  segments,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  segments: TimelineBarSegment[]
}) {
  const [active, setActive] = useState<number | null>(null)
  const total = segments.reduce((sum, segment) => sum + segment.seconds, 0) || 1
  const groups: { name: string; start: number; seconds: number }[] = []
  let elapsed = 0
  for (const segment of segments) {
    const name = segment.group ?? ""
    const last = groups[groups.length - 1]
    if (last && last.name === name) last.seconds += segment.seconds
    else groups.push({ name, start: elapsed, seconds: segment.seconds })
    elapsed += segment.seconds
  }
  const toneOf = (segment: TimelineBarSegment) => {
    if (segment.status === "failed") return "bg-destructive"
    if (segment.status === "running")
      return "animate-pulse bg-foreground/40 motion-reduce:animate-none"
    if (segment.status === "pending" || segment.status === "skipped")
      return "bg-foreground/10"
    const index = groups.findIndex(
      (group) => group.name === (segment.group ?? ""),
    )
    return groupTones[index % groupTones.length]
  }
  let offset = 0
  const placed = segments.map((segment) => {
    const start = offset
    offset += segment.seconds
    return { segment, start }
  })
  const shown = active === null ? null : placed[active]

  return (
    <div
      data-slot="timeline-bar"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="caption-4 relative h-4 text-muted-foreground"
      >
        {groups.map((group) =>
          group.name ? (
            <span
              key={group.name}
              className="absolute top-0 whitespace-nowrap"
              style={{ left: `${(group.start / total) * 100}%` }}
            >
              {group.name} · {group.seconds}s
            </span>
          ) : null,
        )}
      </div>
      <div className="relative">
        <ul
          aria-label={`Run, ${total} seconds`}
          className="flex h-8 w-full gap-0.5 overflow-hidden rounded-lg"
          onPointerLeave={() => setActive(null)}
        >
          {placed.map(({ segment }, index) => (
            <li
              key={segment.id}
              aria-label={`${typeof segment.label === "string" ? segment.label : segment.id}, ${segment.seconds} seconds${segment.status ? `, ${statusLabel[segment.status]}` : ""}`}
              onPointerEnter={() => setActive(index)}
              style={{
                flexGrow: segment.seconds,
                transitionDelay: `${index * 40}ms`,
              }}
              className={cn(
                "min-w-1 basis-0 origin-left",
                toneOf(segment),
                "transition-[scale,opacity] duration-500 ease-calm starting:scale-x-0",
                active !== null && active !== index && "opacity-60",
                "motion-reduce:starting:scale-x-100",
              )}
            />
          ))}
        </ul>
        <div
          aria-hidden="true"
          className={cn(
            "caption-4 pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-popover-foreground shadow-md",
            "transition-[translate,opacity] duration-200 ease-calm motion-reduce:transition-opacity",
            shown ? "opacity-100" : "opacity-0",
          )}
          style={
            shown
              ? {
                  left: `${((shown.start + shown.segment.seconds / 2) / total) * 100}%`,
                  translate: "-50% 0",
                }
              : undefined
          }
        >
          {shown ? (
            <>
              {shown.segment.label} · {shown.segment.seconds}s
            </>
          ) : null}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="caption-5 relative h-4 text-muted-foreground tabular-nums"
      >
        {groups.map((group, index) => (
          <span
            key={`tick-${group.name}`}
            className={cn("absolute top-0", index > 0 && "-translate-x-1/2")}
            style={{ left: `${(group.start / total) * 100}%` }}
          >
            {clock(group.start)}
          </span>
        ))}
        <span className="absolute top-0 right-0">{clock(total)}</span>
      </div>
    </div>
  )
}

export {
  Timeline,
  TimelineBar,
  type TimelineBarSegment,
  TimelineGroup,
  TimelineHeader,
  TimelineItem,
  type TimelineItemProps,
  type TimelineProps,
  type TimelineStatus,
}
