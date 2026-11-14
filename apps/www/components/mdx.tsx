import type { MDXComponents } from "mdx/types"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

function Pre({
  className,
  // Fumadocs passes an icon string for its own UI. We do not render it.
  icon: _icon,
  style: _style,
  ...props
}: ComponentProps<"pre"> & { icon?: string }) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm",
        "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm",
        className,
      )}
      {...props}
    />
  )
}

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2 className={cn("heading-6 pt-6", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("title-2 pt-4", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("body-3 text-muted-foreground", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-foreground underline underline-offset-4 transition-colors duration-200 ease-calm hover:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "body-3 list-disc space-y-2 pl-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-foreground text-sm",
        className,
      )}
      {...props}
    />
  ),
  pre: Pre,
}
