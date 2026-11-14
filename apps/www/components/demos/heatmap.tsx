"use client"

import { Heatmap, type HeatmapDatum } from "@calmponent/registry/ui/heatmap"

const endDate = new Date(Date.UTC(2026, 10, 14))

/** Seeded, so the server and the browser draw the same grid. */
function sample(weeks: number): HeatmapDatum[] {
  let seed = 7
  const next = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const days = weeks * 7
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(endDate.getTime() - (days - 1 - index) * 86_400_000)
    const weekday = date.getUTCDay()
    const busy = weekday > 0 && weekday < 6 ? 1 : 0.35
    const count = next() < 0.18 ? 0 : Math.round(next() * 12 * busy)
    return { date: date.toISOString().slice(0, 10), count }
  })
}

const data = sample(26)

export function HeatmapDemo() {
  return (
    <div className="flex flex-col gap-4 well p-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="title-4">Commits, last 6 months</span>
        <span className="caption-2 text-muted-foreground tabular-nums">
          {data.reduce((sum, day) => sum + day.count, 0)} total
        </span>
      </div>
      <Heatmap data={data} weeks={26} endDate={endDate} />
    </div>
  )
}

export function HeatmapStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
      <div className="flex flex-col gap-3 bg-background p-4">
        <span className="caption-3 text-muted-foreground">loading</span>
        <Heatmap data={[]} weeks={12} endDate={endDate} loading />
      </div>
      <div className="flex flex-col gap-3 bg-background p-4">
        <span className="caption-3 text-muted-foreground">empty</span>
        <Heatmap
          data={[]}
          weeks={12}
          endDate={endDate}
          empty="No commits yet. Push your first one."
        />
      </div>
    </div>
  )
}
