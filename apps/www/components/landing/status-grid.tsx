"use client"

import { createContext, type ReactNode, useContext, useState } from "react"
import { cn } from "@/lib/utils"

export type CellStatus = "idle" | "loading" | "success" | "error"

const CellContext = createContext<(status: CellStatus) => void>(() => {})

/** Demos inside a cell call this to light their status dot. */
export function useCellStatus() {
  return useContext(CellContext)
}

function Dot({
  status,
  className,
}: {
  status?: CellStatus
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        // The background ring cuts a small gap into the dashed lines.
        // Centred on the 1px line: half a pixel outside the padding edge.
        "absolute z-10 size-1.5 rounded-full shadow-[0_0_0_5px_var(--background)]",
        "transition-[background-color,scale] duration-500 ease-calm",
        status === "loading" &&
          "animate-pulse bg-foreground motion-reduce:animate-none",
        status === "success" && "scale-125 bg-success",
        status === "error" && "scale-125 bg-destructive",
        // Opaque, so the corner where the lines meet never shows through.
        (!status || status === "idle") &&
          "bg-[color-mix(in_oklab,var(--foreground)_35%,var(--background))]",
        className,
      )}
    />
  )
}

/**
 * One cell of the landing grid. Dashed lines run along its edges; the dot at
 * its top-left corner is a status light for the demo inside.
 */
export function GridCell({
  title,
  description,
  children,
  className,
  last,
}: {
  title: string
  description: string
  children: ReactNode
  className?: string
  /** Edges this cell closes: draws their lines and corner dots. */
  last?: { right?: boolean; bottom?: boolean }
}) {
  const [status, setStatus] = useState<CellStatus>("idle")
  return (
    <CellContext.Provider value={setStatus}>
      <div
        data-status={status}
        className={cn(
          "relative flex min-h-80 flex-col justify-between gap-8 border-border border-t border-dashed p-8 lg:border-l",
          last?.right && "lg:border-r",
          last?.bottom && "border-b",
          className,
        )}
      >
        <Dot
          status={status}
          className="top-[-0.5px] left-[-0.5px] -translate-1/2 max-lg:hidden"
        />
        {last?.right ? (
          <Dot className="top-[-0.5px] right-[-0.5px] translate-x-1/2 -translate-y-1/2 max-lg:hidden" />
        ) : null}
        {last?.bottom ? (
          <Dot className="bottom-[-0.5px] left-[-0.5px] -translate-x-1/2 translate-y-1/2 max-lg:hidden" />
        ) : null}
        {last?.right && last.bottom ? (
          <Dot className="right-[-0.5px] bottom-[-0.5px] translate-1/2 max-lg:hidden" />
        ) : null}
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
        <div className="flex flex-col gap-1">
          <span className="title-4 text-foreground">{title}</span>
          <span className="caption-2 min-h-[2lh] text-pretty text-muted-foreground">
            {description}
          </span>
        </div>
      </div>
    </CellContext.Provider>
  )
}
