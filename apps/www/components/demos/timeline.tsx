"use client"

import { Button, type ButtonStatus } from "@calmponent/registry/ui/button"
import {
  Timeline,
  TimelineItem,
  type TimelineStatus,
} from "@calmponent/registry/ui/timeline"
import { useEffect, useRef, useState } from "react"

const steps = [
  { title: "Checkout", description: "main at 3f9c21a", seconds: 2 },
  { title: "Install", description: "pnpm install, 214 packages", seconds: 9 },
  { title: "Build", description: "next build, 18 routes", seconds: 31 },
  { title: "Test", description: "vitest, 57 tests", seconds: 6 },
  { title: "Deploy", description: "Production, eu-central", seconds: 12 },
]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function clock(offset: number) {
  const date = new Date(Date.UTC(2026, 10, 14, 9, 41, 0) + offset * 1000)
  return date.toISOString().slice(11, 19)
}

export function TimelineDemo() {
  const [statuses, setStatuses] = useState<TimelineStatus[]>(
    steps.map(() => "pending"),
  )
  const [run, setRun] = useState<ButtonStatus>("idle")
  const attempt = useRef(0)
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  async function deploy() {
    attempt.current += 1
    const failAt = attempt.current % 2 === 1 ? 3 : -1
    setRun("loading")
    setStatuses(steps.map(() => "pending"))
    for (let index = 0; index < steps.length; index++) {
      setStatuses((current) =>
        current.map((status, i) => (i === index ? "running" : status)),
      )
      await wait(900)
      if (!mounted.current) return
      if (index === failAt) {
        setStatuses((current) =>
          current.map((status, i) =>
            i === index ? "failed" : i > index ? "skipped" : status,
          ),
        )
        setRun("error")
        return
      }
      setStatuses((current) =>
        current.map((status, i) => (i === index ? "done" : status)),
      )
    }
    setRun("success")
  }

  let elapsed = 0
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="title-4">Deploy calmponent.dev</span>
          <span className="caption-2 text-muted-foreground">
            The first run fails at Test. The next one ships.
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          status={run}
          statusText={{
            loading: "Running",
            success: "Shipped",
            error: "Retry",
          }}
          onClick={deploy}
        >
          Run deploy
        </Button>
      </div>
      <Timeline className="max-w-md">
        {steps.map((step, index) => {
          const status = statuses[index] ?? "pending"
          const time = clock(elapsed)
          elapsed += step.seconds
          return (
            <TimelineItem
              key={step.title}
              status={status}
              title={step.title}
              description={
                status === "failed"
                  ? "2 tests failed in form.test.tsx"
                  : step.description
              }
              time={
                status === "pending" || status === "skipped" ? undefined : time
              }
              duration={status === "done" ? `${step.seconds}s` : undefined}
            />
          )
        })}
      </Timeline>
    </div>
  )
}

export function TimelineStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
      <div className="flex flex-col gap-3 bg-card p-4">
        <span className="caption-3 text-muted-foreground">every status</span>
        <Timeline>
          <TimelineItem status="done" title="Done" time="09:41" />
          <TimelineItem status="running" title="Running" time="09:42" />
          <TimelineItem status="failed" title="Failed" time="09:43" />
          <TimelineItem status="skipped" title="Skipped" />
          <TimelineItem status="pending" title="Pending" />
        </Timeline>
      </div>
      <div className="flex flex-col gap-3 bg-card p-4">
        <span className="caption-3 text-muted-foreground">loading</span>
        <Timeline loading />
      </div>
      <div className="flex flex-col gap-3 bg-card p-4">
        <span className="caption-3 text-muted-foreground">empty</span>
        <Timeline empty="No deploys yet. Push to main to start one." />
      </div>
    </div>
  )
}
