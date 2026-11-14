"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { type ReactNode, useId } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg outline-none",
    "transition-[color,opacity,scale] duration-200 ease-calm",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-98 motion-reduce:active:scale-100",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    // A loading button looks active, not disabled, while it waits.
    "data-[status=loading]:pointer-events-auto data-[status=loading]:cursor-progress data-[status=loading]:opacity-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        secondary: "text-secondary-foreground",
        outline: "hover:text-accent-foreground",
        ghost: "hover:text-accent-foreground",
        destructive: "text-destructive",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "button-sm h-9 px-3",
        xs: "button-xsm h-7 gap-1 rounded-md px-2",
        sm: "button-sm h-8 px-3",
        lg: "button-md h-10 px-4",
        icon: "size-9",
        "icon-xs": "size-7 rounded-md",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/**
 * The fill sits on its own layer behind the label. On hover it draws in
 * slightly (scale 0.97) while the label stays still and sharp.
 */
const fillVariants = cva(
  [
    "pointer-events-none absolute inset-0 -z-10 rounded-[inherit]",
    "transition-[scale,opacity,background-color] duration-300 ease-calm",
    "group-hover/button:scale-97 motion-reduce:transition-[opacity,background-color] motion-reduce:group-hover/button:scale-100",
    // No hover response while the button waits for its result.
    "group-data-[status=loading]/button:scale-100",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary group-hover/button:bg-primary/90",
        secondary: "bg-secondary group-hover/button:bg-secondary/80",
        outline:
          "border border-border bg-background group-hover/button:bg-accent",
        ghost: "scale-97 bg-accent opacity-0 group-hover/button:opacity-100",
        destructive: "bg-destructive/10 group-hover/button:bg-destructive/20",
        link: "hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ButtonStatus = "idle" | "loading" | "success" | "error"

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /**
     * The result of the action this button starts. Leave it unset for a
     * plain button. When set, the label moves between states instead of
     * swapping, and the width stays the same.
     */
    status?: ButtonStatus
    /** Text for each status. Defaults to the button's own label. */
    statusText?: Partial<Record<Exclude<ButtonStatus, "idle">, ReactNode>>
  }

/**
 * A faint track and an arc that grows, travels, and shrinks while it turns.
 * The loop ends where it began. It keeps running while hidden, so it never
 * restarts when it fades in. With reduced motion, a still arc shows instead.
 */
function Spinner() {
  const spline = "0.22 1 0.36 1;0.22 1 0.36 1"
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" opacity="0.2" />
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeDasharray="1 57"
        className="motion-reduce:hidden"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="1 57;30 57;1 57"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines={spline}
          dur="1.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-10;-56.5"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines={spline}
          dur="1.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeDasharray="14 57"
        className="hidden motion-reduce:block"
      />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5" />
      <path d="M12 16.5h.01" />
    </svg>
  )
}

const statusIcons: Record<ButtonStatus, ReactNode> = {
  idle: null,
  loading: <Spinner />,
  success: <SuccessIcon />,
  error: <ErrorIcon />,
}

const announcements: Record<ButtonStatus, string> = {
  idle: "",
  loading: "Loading",
  success: "Done",
  error: "Failed",
}

const statuses: ButtonStatus[] = ["idle", "loading", "success", "error"]

function Button({
  className,
  variant = "default",
  size = "default",
  status,
  statusText,
  children,
  disabled,
  focusableWhenDisabled,
  ...props
}: ButtonProps) {
  const id = useId()

  if (status === undefined) {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        focusableWhenDisabled={focusableWhenDisabled}
        {...props}
      >
        <span aria-hidden="true" className={fillVariants({ variant })} />
        {children}
      </ButtonPrimitive>
    )
  }

  const loading = status === "loading"
  const iconOnly = size?.startsWith("icon") ?? false

  return (
    <ButtonPrimitive
      data-slot="button"
      data-status={status}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      // Keep focus on the button while it waits, as Base UI recommends.
      focusableWhenDisabled={focusableWhenDisabled || loading}
      aria-busy={loading || undefined}
      aria-labelledby={props["aria-label"] ? undefined : `${id}-${status}`}
      {...props}
    >
      <span aria-hidden="true" className={fillVariants({ variant })} />
      {/* All layers stay mounted in one grid cell, so the width never jumps. */}
      <span className="grid">
        {statuses.map((layer) => {
          const active = layer === status
          const text =
            layer === "idle" ? children : (statusText?.[layer] ?? children)
          return (
            <span
              key={layer}
              id={`${id}-${layer}`}
              aria-hidden={active ? undefined : true}
              data-active={active || undefined}
              className={cn(
                "col-start-1 row-start-1 inline-flex items-center justify-center",
                size === "xs" ? "gap-1" : "gap-2",
                "transition-[opacity,translate] duration-300 ease-calm motion-reduce:transition-opacity",
                active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0 motion-reduce:translate-y-0",
              )}
            >
              {statusIcons[layer]}
              {iconOnly && layer !== "idle" ? null : text}
            </span>
          )
        })}
      </span>
      <span role="status" className="sr-only">
        {announcements[status]}
      </span>
    </ButtonPrimitive>
  )
}

export {
  Button,
  type ButtonProps,
  type ButtonStatus,
  buttonVariants,
  fillVariants,
}
