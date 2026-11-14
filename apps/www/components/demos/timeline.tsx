"use client"

import { Button, type ButtonStatus } from "@calmponent/registry/ui/button"
import {
  Timeline,
  TimelineBar,
  TimelineGroup,
  TimelineHeader,
  TimelineItem,
  type TimelineStatus,
} from "@calmponent/registry/ui/timeline"
import { useEffect, useRef, useState } from "react"
import { usePreviewState } from "@/components/preview-state"

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
  const forced = usePreviewState(["loading", "empty"])
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
    <div className="flex flex-col gap-6 well p-6">
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
      <Timeline
        className="max-w-md"
        loading={forced === "loading"}
        empty="No deploys yet. Push to main to start one."
      >
        {forced === "empty"
          ? null
          : steps.map((step, index) => {
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
                    status === "pending" || status === "skipped"
                      ? undefined
                      : time
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
      <div className="flex flex-col gap-3 bg-background p-4">
        <span className="caption-3 text-muted-foreground">every status</span>
        <Timeline>
          <TimelineItem status="done" title="Done" time="09:41" />
          <TimelineItem status="running" title="Running" time="09:42" />
          <TimelineItem status="failed" title="Failed" time="09:43" />
          <TimelineItem status="skipped" title="Skipped" />
          <TimelineItem status="pending" title="Pending" />
        </Timeline>
      </div>
      <div className="flex flex-col gap-3 bg-background p-4">
        <span className="caption-3 text-muted-foreground">loading</span>
        <Timeline loading />
      </div>
      <div className="flex flex-col gap-3 bg-background p-4">
        <span className="caption-3 text-muted-foreground">empty</span>
        <Timeline empty="No deploys yet. Push to main to start one." />
      </div>
    </div>
  )
}

export function PullRequestTimeline() {
  const forced = usePreviewState(["loading", "empty"])
  if (forced !== "live") {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <TimelineHeader
          title="Update pricing page"
          meta="Ines · main / a3f91c2"
        />
        <Timeline
          loading={forced === "loading"}
          empty="This pull request has no runs yet."
        />
      </div>
    )
  }
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <TimelineHeader
        title="Update pricing page"
        meta="Ines · main / a3f91c2"
        total="42s"
      />
      <Timeline proportional>
        <TimelineGroup label="Build" total="24s">
          <TimelineItem
            status="done"
            time="00:00"
            title="Clone repository"
            duration="2s"
          />
          <TimelineItem
            status="skipped"
            time="00:02"
            title="Restore build cache"
            duration="skipped"
          />
          <TimelineItem
            status="done"
            time="00:02"
            title="Run build commands"
            duration="19s"
            seconds={19}
            previousSeconds={31}
          />
          <TimelineItem
            status="done"
            time="00:21"
            title="Collect build output"
            duration="3s"
          />
        </TimelineGroup>
        <TimelineGroup label="Deploy" total="18s">
          <TimelineItem
            status="done"
            time="00:24"
            title="Upload build output"
            duration="12s"
            seconds={12}
            previousSeconds={21}
          />
          <TimelineItem
            status="done"
            time="00:36"
            title="Assign calmponent.dev"
            duration="3s"
          />
          <TimelineItem
            status="done"
            time="00:39"
            title="Warm the cache"
            duration="3s"
          />
        </TimelineGroup>
      </Timeline>
    </div>
  )
}

export const pullRequestCode = `
<TimelineHeader title="Update pricing page" meta="Ines · main / a3f91c2" total="42s" />
<Timeline proportional>
  <TimelineGroup label="Build" total="24s">
    <TimelineItem status="done" time="00:00" title="Clone repository" duration="2s" />
    <TimelineItem status="skipped" time="00:02" title="Restore build cache" duration="skipped" />
    <TimelineItem
      status="done"
      time="00:02"
      title="Run build commands"
      duration="19s"
      seconds={19}
      previousSeconds={31}
    />
    <TimelineItem status="done" time="00:21" title="Collect build output" duration="3s" />
  </TimelineGroup>
  <TimelineGroup label="Deploy" total="18s">
    <TimelineItem
      status="done"
      time="00:24"
      title="Upload build output"
      duration="12s"
      seconds={12}
      previousSeconds={21}
    />
    <TimelineItem status="done" time="00:36" title="Assign calmponent.dev" duration="3s" />
  </TimelineGroup>
</Timeline>
`

const glance = [
  { id: "clone", label: "Clone repository", seconds: 2, group: "Build" },
  { id: "cache", label: "Restore build cache", seconds: 4, group: "Build" },
  { id: "build", label: "Run build commands", seconds: 27, group: "Build" },
  { id: "upload", label: "Upload build output", seconds: 11, group: "Deploy" },
  { id: "assign", label: "Assign halo.studio", seconds: 2, group: "Deploy" },
  { id: "warm", label: "Warm the cache", seconds: 4, group: "Deploy" },
]

export function GlanceTimeline() {
  const forced = usePreviewState(["loading", "empty"])
  let elapsed = 0
  if (forced !== "live") {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <TimelineHeader
          title="Publish Halo case study"
          meta="Maya · main / 7be04d1"
        />
        <Timeline loading={forced === "loading"} empty="No runs yet." />
      </div>
    )
  }
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <TimelineHeader
        title="Publish Halo case study"
        meta="Maya · main / 7be04d1"
        total="50s"
      />
      <TimelineBar segments={glance} />
      <Timeline>
        {["Build", "Deploy"].map((group) => (
          <TimelineGroup
            key={group}
            label={group}
            total={`${glance.filter((step) => step.group === group).reduce((sum, step) => sum + step.seconds, 0)}s`}
          >
            {glance
              .filter((step) => step.group === group)
              .map((step) => {
                const time = `00:${String(elapsed).padStart(2, "0")}`
                elapsed += step.seconds
                return (
                  <TimelineItem
                    key={step.id}
                    status="done"
                    time={time}
                    title={step.label}
                    duration={`${step.seconds}s`}
                  />
                )
              })}
          </TimelineGroup>
        ))}
      </Timeline>
    </div>
  )
}

export const glanceCode = `
const steps = [
  { id: "clone", label: "Clone repository", seconds: 2, group: "Build" },
  { id: "build", label: "Run build commands", seconds: 27, group: "Build" },
  { id: "upload", label: "Upload build output", seconds: 11, group: "Deploy", status: "failed" },
]

<TimelineHeader title="Publish Halo case study" meta="Maya · main / 7be04d1" total="50s" />
<TimelineBar segments={steps} />
`
