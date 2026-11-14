"use client"

import { CopyButton } from "@/components/copy-button"

export function InstallChip({ command }: { command: string }) {
  return (
    <div className="flex h-9 w-full max-w-full items-center gap-2 rounded-lg bg-card pr-1 pl-3 shadow-[inset_0_0_0_1px_var(--border)] sm:w-auto">
      <span className="caption-1 min-w-0 flex-1 truncate text-left font-mono text-muted-foreground">
        <span className="select-none text-muted-foreground/60">$ </span>
        {command}
      </span>
      <CopyButton label="Copy install command" value={command} />
    </div>
  )
}
