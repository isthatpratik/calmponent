"use client"

import {
  Button,
  type ButtonProps,
  type ButtonStatus,
} from "@calmponent/registry/ui/button"
import { useEffect, useRef, useState } from "react"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Runs a fake request, shows the result, then returns to idle. */
function useFakeAction(result: "success" | "error") {
  const [status, setStatus] = useState<ButtonStatus>("idle")
  const mounted = useRef(false)
  useEffect(() => {
    // Set on every mount: React strict mode mounts twice in development.
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  async function run() {
    setStatus("loading")
    await wait(1400)
    if (!mounted.current) return
    setStatus(result)
    await wait(1800)
    if (mounted.current) setStatus("idle")
  }

  return { status, run }
}

export function ButtonDemo() {
  const save = useFakeAction("success")
  const publish = useFakeAction("error")

  return (
    <div className="flex flex-wrap items-center gap-3 well p-6">
      <Button
        status={save.status}
        statusText={{ loading: "Saving", success: "Saved", error: "Try again" }}
        onClick={save.run}
      >
        Save changes
      </Button>
      <Button
        variant="outline"
        status={publish.status}
        statusText={{
          loading: "Publishing",
          success: "Published",
          error: "Failed",
        }}
        onClick={publish.run}
      >
        Publish
      </Button>
    </div>
  )
}

const variants: NonNullable<ButtonProps["variant"]>[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
]

const states: { label: string; props: Partial<ButtonProps> }[] = [
  { label: "idle", props: {} },
  { label: "disabled", props: { disabled: true } },
  { label: "loading", props: { status: "loading" } },
  { label: "success", props: { status: "success" } },
  { label: "error", props: { status: "error" } },
]

export function ButtonStates() {
  return (
    <div className="overflow-x-auto well">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="caption-3 p-3 text-left text-muted-foreground">
              variant
            </th>
            {states.map((state) => (
              <th
                key={state.label}
                className="caption-3 p-3 text-left text-muted-foreground"
              >
                {state.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant} className="border-border border-t">
              <td className="caption-2 p-3 font-mono text-muted-foreground">
                {variant}
              </td>
              {states.map((state) => (
                <td key={state.label} className="p-3">
                  <Button variant={variant} {...state.props}>
                    Save
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
