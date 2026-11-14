"use client"

import { type ComponentProps, useRef } from "react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

export function CodeBlock({
  className,
  // Fumadocs passes an icon string for its own UI. We do not render it.
  icon: _icon,
  style: _style,
  ...props
}: ComponentProps<"pre"> & { icon?: string }) {
  const ref = useRef<HTMLPreElement>(null)
  return (
    <div className="relative">
      <pre
        ref={ref}
        className={cn(
          "overflow-x-auto rounded-xl border border-border bg-card p-4 pr-12 font-mono text-sm",
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm",
          className,
        )}
        {...props}
      />
      <CopyButton
        label="Copy code"
        value={() => ref.current?.textContent ?? ""}
        className="absolute top-2.5 right-2.5"
      />
    </div>
  )
}
