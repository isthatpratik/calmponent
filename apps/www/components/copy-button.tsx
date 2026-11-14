"use client"

import { Button } from "@calmponent/registry/ui/button"
import { useEffect, useRef, useState } from "react"
import { CopyIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * Copies text and confirms on itself: the copy icon moves out and a check
 * moves in, using the button's own success state.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string | (() => string)
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    const text = typeof value === "function" ? value() : value
    await navigator.clipboard.writeText(text)
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      status={copied ? "success" : "idle"}
      aria-label={copied ? "Copied" : label}
      onClick={copy}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      <CopyIcon />
    </Button>
  )
}
