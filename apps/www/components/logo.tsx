import Link from "next/link"

/**
 * The Calmponent mark on a 24-unit grid: a rounded square (radius 5,
 * stroke 2) and its status light (radius 2.5). A component and its state.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
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
