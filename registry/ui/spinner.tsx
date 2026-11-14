import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * A dash ring: a faint track and an arc that grows, travels, and shrinks
 * while it turns. The loop ends where it began. It keeps running while
 * hidden, so it never restarts when it fades in. With reduced motion, a
 * still arc shows instead, because SVG animation ignores that setting.
 */
type SpinnerProps = ComponentProps<"svg"> & {
  /**
   * Hides the spinner from assistive tech. Use it when the surrounding
   * component already announces that it is loading.
   */
  decorative?: boolean
}

function Spinner({ className, decorative, ...props }: SpinnerProps) {
  const spline = "0.22 1 0.36 1;0.22 1 0.36 1"
  return (
    <svg
      role={decorative ? "presentation" : "status"}
      aria-label={decorative ? undefined : "Loading"}
      aria-hidden={decorative || undefined}
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={cn("size-4 shrink-0", className)}
      {...props}
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

export { Spinner, type SpinnerProps }
