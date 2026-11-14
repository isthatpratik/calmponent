"use client"

import {
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

type HeatmapDatum = { date: string; count: number }

type HeatmapProps = Omit<ComponentProps<"div">, "children"> & {
  /** One entry per day, `date` as `YYYY-MM-DD`. Missing days count as 0. */
  data: HeatmapDatum[]
  /** How many weeks to show, ending with the week of `endDate`. */
  weeks?: number
  /** The last day shown. Defaults to today. */
  endDate?: Date
  /** Describes one day for the tooltip and screen readers. */
  formatLabel?: (count: number, date: Date) => string
  loading?: boolean
  /** Shown over the grid when every day is 0. */
  empty?: ReactNode
}

const levels = [
  "bg-foreground/8",
  "bg-foreground/30",
  "bg-foreground/55",
  "bg-foreground/80",
  "bg-foreground",
]

const dayMs = 86_400_000

function toKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function defaultLabel(count: number, date: Date) {
  const day = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  if (count === 0) return `No activity on ${day}`
  return `${count} ${count === 1 ? "contribution" : "contributions"} on ${day}`
}

/** Quartile thresholds of the non-zero counts, so the scale fits the data. */
function thresholds(counts: number[]) {
  const values = counts.filter((count) => count > 0).sort((a, b) => a - b)
  if (values.length === 0) return [1, 1, 1]
  const at = (share: number) =>
    values[Math.floor(share * (values.length - 1))] ?? 1
  return [at(0.25), at(0.5), at(0.75)]
}

function levelOf(count: number, limits: number[]) {
  if (count <= 0) return 0
  if (count <= (limits[0] ?? 1)) return 1
  if (count <= (limits[1] ?? 1)) return 2
  if (count <= (limits[2] ?? 1)) return 3
  return 4
}

const pitch = 16 // 12px dot + 4px gap

function Heatmap({
  className,
  data,
  weeks = 26,
  endDate,
  formatLabel = defaultLabel,
  loading = false,
  empty = "No activity yet.",
  ...props
}: HeatmapProps) {
  const cells = useMemo(() => {
    const end = endDate ?? new Date()
    const last = Date.UTC(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate(),
    )
    // Start on the Sunday that begins the first week.
    const lastWeekStart = last - new Date(last).getUTCDay() * dayMs
    const first = lastWeekStart - (weeks - 1) * 7 * dayMs
    const counts = new Map(data.map((datum) => [datum.date, datum.count]))
    const list: {
      date: Date
      count: number
      col: number
      row: number
      future: boolean
    }[] = []
    for (let col = 0; col < weeks; col++) {
      for (let row = 0; row < 7; row++) {
        const time = first + (col * 7 + row) * dayMs
        const date = new Date(time)
        list.push({
          date,
          count: counts.get(toKey(date)) ?? 0,
          col,
          row,
          future: time > last,
        })
      }
    }
    return list
  }, [data, weeks, endDate])

  const limits = useMemo(
    () => thresholds(cells.map((cell) => cell.count)),
    [cells],
  )
  const isEmpty = !loading && cells.every((cell) => cell.count === 0)
  const [active, setActive] = useState<number | null>(null)
  const [focusIndex, setFocusIndex] = useState(() => cells.length - 1)
  const refs = useRef<(HTMLTableCellElement | null)[]>([])

  function move(event: KeyboardEvent<HTMLTableCellElement>, index: number) {
    const cell = cells[index]
    if (!cell) return
    let next = index
    if (event.key === "ArrowRight") next = index + 7
    else if (event.key === "ArrowLeft") next = index - 7
    else if (event.key === "ArrowDown") next = cell.row < 6 ? index + 1 : index
    else if (event.key === "ArrowUp") next = cell.row > 0 ? index - 1 : index
    else if (event.key === "Home") next = index - cell.col * 7
    else if (event.key === "End") next = (weeks - 1) * 7 + cell.row
    else return
    event.preventDefault()
    next = Math.max(0, Math.min(cells.length - 1, next))
    setFocusIndex(next)
    setActive(next)
    refs.current[next]?.focus()
  }

  const shown = active === null ? null : cells[active]

  return (
    <div
      data-slot="heatmap"
      className={cn("flex w-fit max-w-full flex-col gap-3", className)}
      {...props}
    >
      <div className="relative overflow-x-auto pt-8">
        <table
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ARIA in HTML allows role="grid" on table for an interactive grid with arrow keys.
          role="grid"
          aria-label="Activity"
          aria-busy={loading || undefined}
          className="relative border-separate border-spacing-1"
          onPointerLeave={() => setActive(null)}
        >
          <tbody>
            {Array.from({ length: 7 }, (_, row) => `row-${row}`).map(
              (rowKey, row) => (
                <tr key={rowKey}>
                  {Array.from({ length: weeks }, (_, col) => {
                    const index = col * 7 + row
                    const cell = cells[index]
                    if (!cell) return null
                    const level = levelOf(cell.count, limits)
                    const distance = shown
                      ? Math.max(
                          Math.abs(cell.col - shown.col),
                          Math.abs(cell.row - shown.row),
                        )
                      : 9
                    return (
                      <td
                        key={cell.date.getTime()}
                        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: cells of a role="grid" table are gridcells.
                        role="gridcell"
                        ref={(node) => {
                          refs.current[index] = node
                        }}
                        tabIndex={index === focusIndex ? 0 : -1}
                        aria-label={formatLabel(cell.count, cell.date)}
                        aria-disabled={cell.future || undefined}
                        onPointerEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onBlur={() => setActive(null)}
                        onKeyDown={(event) => move(event, index)}
                        // Arrival: a short diagonal wave, capped at about 400 ms.
                        style={{
                          transitionDelay: shown
                            ? "0ms"
                            : `${Math.min(400, (cell.col + cell.row) * 8)}ms`,
                        }}
                        className={cn(
                          "size-3 rounded-full p-0 outline-none",
                          loading
                            ? "animate-pulse bg-foreground/8 motion-reduce:animate-none"
                            : levels[level],
                          cell.future && "invisible",
                          "transition-[scale,opacity,box-shadow] duration-300 ease-calm starting:opacity-0",
                          // The lens: the dot under the pointer swells, its neighbours a little.
                          distance === 0 &&
                            "scale-140 shadow-[0_0_0_1px_var(--foreground)]",
                          distance === 1 && "scale-115",
                          "focus-visible:shadow-[0_0_0_1px_var(--background),0_0_0_3px_var(--ring)]",
                          "motion-reduce:scale-100 motion-reduce:starting:opacity-100",
                        )}
                      />
                    )
                  })}
                </tr>
              ),
            )}
          </tbody>
        </table>
        {/* One tooltip that glides from dot to dot instead of popping. */}
        <div
          aria-hidden="true"
          data-slot="heatmap-tooltip"
          className={cn(
            "caption-4 pointer-events-none absolute top-0 left-0 z-10 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-popover-foreground shadow-md",
            "transition-[translate,opacity] duration-200 ease-calm motion-reduce:transition-opacity",
            shown ? "opacity-100" : "opacity-0",
          )}
          style={
            shown
              ? {
                  translate: `calc(${shown.col * pitch + 10}px - 50%) calc(${shown.row * pitch - 2}px - 100%)`,
                }
              : undefined
          }
        >
          {shown ? formatLabel(shown.count, shown.date) : ""}
        </div>
        {isEmpty ? (
          <div
            data-slot="heatmap-empty"
            className="caption-2 absolute inset-0 flex items-center justify-center text-muted-foreground"
          >
            <span className="rounded-md bg-background/80 px-2 py-1">
              {empty}
            </span>
          </div>
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="caption-5 flex items-center justify-end gap-1.5 text-muted-foreground"
      >
        Less
        {levels.map((level) => (
          <span key={level} className={cn("size-3 rounded-full", level)} />
        ))}
        More
      </div>
    </div>
  )
}

export { Heatmap, type HeatmapDatum, type HeatmapProps }
