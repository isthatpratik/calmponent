"use client"

import { Button, type ButtonStatus } from "@calmponent/registry/ui/button"
import { Checkbox } from "@calmponent/registry/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@calmponent/registry/ui/field"
import { Input } from "@calmponent/registry/ui/input"
import { Switch } from "@calmponent/registry/ui/switch"
import { TimelineBar } from "@calmponent/registry/ui/timeline"
import { toast } from "@calmponent/registry/ui/toast"
import { useEffect, useRef, useState } from "react"
import { useCellStatus } from "@/components/landing/status-grid"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function useMounted() {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return mounted
}

export function SaveDemo() {
  const report = useCellStatus()
  const [status, setStatus] = useState<ButtonStatus>("idle")
  const mounted = useMounted()
  async function save() {
    setStatus("loading")
    report("loading")
    await wait(1200)
    if (!mounted.current) return
    setStatus("success")
    report("success")
    await wait(1800)
    if (!mounted.current) return
    setStatus("idle")
    report("idle")
  }
  return (
    <Button
      status={status}
      statusText={{ loading: "Saving", success: "Saved" }}
      onClick={save}
    >
      Save changes
    </Button>
  )
}

export function SwitchDemo() {
  const report = useCellStatus()
  const [on, setOn] = useState(true)
  const [pending, setPending] = useState(false)
  async function change(next: boolean) {
    setOn(next)
    setPending(true)
    report("loading")
    await wait(1100)
    setPending(false)
    report("success")
  }
  return (
    <Field orientation="horizontal" className="w-fit justify-center">
      <Switch checked={on} pending={pending} onCheckedChange={change} />
      <FieldLabel>Weekly summary</FieldLabel>
    </Field>
  )
}

export function UsernameDemo() {
  const report = useCellStatus()
  const [checking, setChecking] = useState(false)
  return (
    <Field
      className="w-full max-w-60"
      validationMode="onChange"
      validationDebounceTime={350}
      validate={async (value) => {
        const name = String(value ?? "").trim()
        if (!name) {
          report("idle")
          return null
        }
        setChecking(true)
        report("loading")
        await wait(800)
        setChecking(false)
        const taken = ["admin", "calm"].includes(name.toLowerCase())
        report(taken ? "error" : "success")
        return taken ? "That username is taken." : null
      }}
    >
      <FieldLabel>Username</FieldLabel>
      <Input loading={checking} placeholder="Try calm, then ada" />
      <FieldError />
    </Field>
  )
}

const items = ["Invoices", "Receipts", "Reports"]

export function ChecklistDemo() {
  const report = useCellStatus()
  const [checked, setChecked] = useState<string[]>(["Invoices"])
  const all = checked.length === items.length
  useEffect(() => {
    report(all ? "success" : "idle")
  }, [all, report])
  return (
    <div className="flex flex-col gap-3">
      <Field orientation="horizontal" className="w-fit">
        <Checkbox
          checked={all}
          indeterminate={checked.length > 0 && !all}
          onCheckedChange={(value) => setChecked(value ? items : [])}
        />
        <FieldLabel>All documents</FieldLabel>
      </Field>
      <div className="flex flex-col gap-3 pl-7">
        {items.map((item) => (
          <Field key={item} orientation="horizontal" className="w-fit">
            <Checkbox
              checked={checked.includes(item)}
              onCheckedChange={(value) =>
                setChecked((current) =>
                  value
                    ? [...current, item]
                    : current.filter((name) => name !== item),
                )
              }
            />
            <FieldLabel>{item}</FieldLabel>
          </Field>
        ))}
      </div>
    </div>
  )
}

export function ToastDemo() {
  const report = useCellStatus()
  const attempt = useRef(0)
  function upload() {
    attempt.current += 1
    const fails = attempt.current % 2 === 1
    report("loading")
    toast
      .promise(
        wait(1300).then(() => {
          if (fails) throw new Error("Network")
        }),
        {
          loading: { title: "Uploading report.pdf", description: "2.4 MB" },
          success: {
            title: "Uploaded",
            description: "report.pdf is in your files.",
          },
          error: {
            title: "Upload failed",
            description: "The connection dropped. Try again.",
          },
        },
      )
      .then(
        () => report("success"),
        () => report("error"),
      )
  }
  return (
    <Button variant="outline" onClick={upload}>
      Upload a file
    </Button>
  )
}

const run = [
  { id: "clone", label: "Clone", seconds: 2, group: "Build" },
  { id: "install", label: "Install", seconds: 6, group: "Build" },
  { id: "build", label: "Build", seconds: 19, group: "Build" },
  { id: "upload", label: "Upload", seconds: 9, group: "Deploy" },
  { id: "warm", label: "Warm cache", seconds: 3, group: "Deploy" },
]

export function RunDemo() {
  return <TimelineBar segments={run} className="w-full max-w-sm" />
}
