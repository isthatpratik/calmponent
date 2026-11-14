"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import type { ReactNode } from "react"

import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const manager = ToastPrimitive.createToastManager()

type ToastType = "default" | "success" | "error" | "warning" | "loading"

type ToastOptions = {
  description?: ReactNode
  /** A button in the toast, for example "Retry" or "Undo". */
  action?: { label: string; onClick: () => void }
  /** Milliseconds before it closes. 0 keeps it open. */
  timeout?: number
  /** Reuse an id to update a toast in place instead of adding a new one. */
  id?: string
}

function add(type: ToastType, title: ReactNode, options: ToastOptions = {}) {
  const { action, description, timeout, id } = options
  return manager.add({
    id,
    type,
    title,
    description,
    // A loading toast stays until its result replaces it.
    timeout: timeout ?? (type === "loading" ? 0 : 5000),
    // Errors interrupt screen readers; everything else waits its turn.
    priority: type === "error" ? "high" : "low",
    actionProps: action
      ? { children: action.label, onClick: action.onClick }
      : undefined,
  })
}

type Message = ReactNode | { title: ReactNode; description?: ReactNode }

function asOptions(message: Message) {
  return typeof message === "object" && message !== null && "title" in message
    ? message
    : { title: message as ReactNode }
}

/**
 * Show a toast from anywhere. Render `<Toaster />` once near the root.
 *
 * toast("Invite sent")
 * toast.success("Saved", { description: "Your changes are live." })
 * toast.error("Upload failed", { action: { label: "Retry", onClick: retry } })
 * toast.promise(save(), { loading: "Saving", success: "Saved", error: "Could not save" })
 */
const toast = Object.assign(
  (title: ReactNode, options?: ToastOptions) => add("default", title, options),
  {
    success: (title: ReactNode, options?: ToastOptions) =>
      add("success", title, options),
    error: (title: ReactNode, options?: ToastOptions) =>
      add("error", title, options),
    warning: (title: ReactNode, options?: ToastOptions) =>
      add("warning", title, options),
    loading: (title: ReactNode, options?: ToastOptions) =>
      add("loading", title, options),
    /** One toast that turns from loading into its result, in place. */
    promise: <T,>(
      promise: Promise<T>,
      messages: { loading: Message; success: Message; error: Message },
    ) =>
      manager.promise(promise, {
        loading: {
          ...asOptions(messages.loading),
          type: "loading",
          timeout: 0,
        },
        success: {
          ...asOptions(messages.success),
          type: "success",
          timeout: 5000,
        },
        error: {
          ...asOptions(messages.error),
          type: "error",
          timeout: 5000,
          priority: "high",
        },
      }),
    update: (
      id: string,
      title: ReactNode,
      options: ToastOptions & { type?: ToastType } = {},
    ) =>
      manager.update(id, {
        title,
        description: options.description,
        type: options.type,
        timeout: options.timeout,
      }),
    dismiss: (id?: string) => manager.close(id),
  },
)

function Icon({ type }: { type?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-4",
  }
  if (type === "loading") return <Spinner decorative />
  if (type === "success")
    return (
      <svg aria-hidden="true" {...common} className="size-4 text-success">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    )
  if (type === "error")
    return (
      <svg aria-hidden="true" {...common} className="size-4 text-destructive">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5" />
        <path d="M12 16.5h.01" />
      </svg>
    )
  if (type === "warning")
    return (
      <svg aria-hidden="true" {...common} className="size-4 text-warning">
        <path d="M12 4l9 16H3z" />
        <path d="M12 10v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  return null
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()
  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      data-slot="toast"
      swipeDirection={["right", "down"]}
      className={cn(
        "absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full select-none rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none",
        // Stacked: each toast behind peeks out and shrinks a little.
        "[--gap:0.75rem] [--peek:0.625rem] [--scale:calc(max(0,1-(var(--toast-index)*0.06)))] [--shrink:calc(1-var(--scale))]",
        "[--height:var(--toast-frontmost-height,var(--toast-height))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "h-(--height) origin-bottom",
        "[translate:var(--toast-swipe-movement-x)_calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height)))] [scale:var(--scale)]",
        "transition-[translate,scale,opacity,height] duration-500 ease-calm",
        // Hovering the stack spreads it out, so every toast can be read.
        "data-[expanded]:h-(--toast-height) data-[expanded]:[scale:1] data-[expanded]:[translate:var(--toast-swipe-movement-x)_var(--offset-y)]",
        // Arrives from below and leaves the way it is swiped.
        "data-[starting-style]:[translate:0_150%]",
        "data-[ending-style]:opacity-0 data-[ending-style]:[translate:0_150%]",
        "data-[ending-style]:data-[swipe-direction=right]:[translate:calc(var(--toast-swipe-movement-x)+150%)_var(--offset-y)]",
        "data-[limited]:opacity-0 data-[swiping]:duration-0",
        // After a pointer grabs it, height and spacing stay put while it moves.
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "motion-reduce:transition-opacity",
      )}
    >
      <ToastPrimitive.Content className="flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-300 ease-calm data-[behind]:opacity-0 data-[expanded]:opacity-100">
        {/* A new key per type: when loading turns into its result, the icon pops in. */}
        <span
          key={item.type}
          className="mt-0.5 flex shrink-0 transition-[scale,opacity] duration-500 ease-pop empty:hidden starting:scale-50 starting:opacity-0 motion-reduce:starting:scale-100"
        >
          <Icon type={item.type} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastPrimitive.Title className="body-5 text-foreground" />
          <ToastPrimitive.Description className="caption-2 text-muted-foreground" />
        </div>
        <ToastPrimitive.Action className="caption-3 shrink-0 cursor-pointer rounded-md border border-border px-2 py-1 text-foreground transition-colors duration-200 ease-calm hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring" />
        <ToastPrimitive.Close
          aria-label="Close"
          className="-mt-1 -mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 ease-calm hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-3.5"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  ))
}

/** Render once near the root of your app. */
function Toaster({ limit = 3 }: { limit?: number }) {
  return (
    <ToastPrimitive.Provider toastManager={manager} limit={limit}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toaster"
          className="fixed right-4 bottom-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:bottom-6"
        >
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

export { Toaster, type ToastOptions, type ToastType, toast }
