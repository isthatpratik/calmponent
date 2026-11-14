import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

export function CopyIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 5.5v-.5a2 2 0 0 0-2-2h-8.5a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h.5" />
    </svg>
  )
}

export function CaretDownIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />
    </svg>
  )
}

export function LinkIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </svg>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" {...base} {...props}>
      <path d="M8 16L16 8" />
      <path d="M9.5 8H16v6.5" />
    </svg>
  )
}
