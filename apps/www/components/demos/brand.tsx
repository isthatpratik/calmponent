import { LogoMark } from "@/components/logo"

const files = [
  { href: "/brand/calmponent-mark.svg", label: "Mark, current color" },
  { href: "/brand/calmponent-mark-dark.svg", label: "Mark on black" },
  { href: "/brand/calmponent-mark-light.svg", label: "Mark on white" },
]

export function BrandMarks() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
        <div className="flex min-h-56 items-center justify-center gap-3 bg-black text-[#fafafa]">
          <LogoMark className="size-10" />
          <span className="heading-6">Calmponent</span>
        </div>
        <div className="flex min-h-56 items-center justify-center gap-3 bg-white text-[#0a0a0a]">
          <LogoMark className="size-10" />
          <span className="heading-6">Calmponent</span>
        </div>
      </div>
      <div className="flex min-h-48 items-center justify-center rounded-xl bg-background">
        {/* Clear space: one dot diameter (a fifth of the mark) on every side. */}
        <div className="relative p-3 outline-1 outline-dashed outline-border">
          <LogoMark className="size-16 text-foreground" />
          <span className="caption-5 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-muted-foreground">
            clear space: one dot diameter
          </span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2">
        {files.map((file) => (
          <li key={file.href}>
            <a
              href={file.href}
              download
              className="caption-1 inline-flex rounded-lg px-3 py-2 text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors duration-200 ease-calm hover:text-foreground"
            >
              {file.label} (SVG)
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
