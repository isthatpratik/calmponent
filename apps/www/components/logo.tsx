import Link from "next/link"
import { markDot, markPath } from "@/lib/mark"

/** The Calmponent mark: an open square (a "C") and its status light. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d={markPath}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        {...markDot}
        fill="currentColor"
        className="origin-center transition-[scale] duration-300 ease-pop group-hover/logo:scale-125 motion-reduce:transition-none"
      />
    </svg>
  )
}

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Calmponent home"
      className="group/logo flex items-center gap-2 rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <LogoMark className="size-6" />
      <span className="title-4">Calmponent</span>
    </Link>
  )
}
