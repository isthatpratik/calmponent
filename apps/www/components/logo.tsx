import Link from "next/link"

/** A component with a state: a rounded square and its status light. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group/logo flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        aria-hidden="true"
        className="relative flex size-5 items-center justify-center rounded-md border border-foreground/80"
      >
        <span className="size-1.5 rounded-full bg-foreground transition-[scale] duration-300 ease-pop group-hover/logo:scale-125" />
      </span>
      <span className="title-4 text-foreground">Calmponent</span>
    </Link>
  )
}
