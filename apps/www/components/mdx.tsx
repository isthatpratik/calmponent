import type { MDXComponents } from "mdx/types"
import type { ComponentProps } from "react"
import { CodeBlock } from "@/components/code-block"
import { LinkIcon } from "@/components/icons"
import { InstallCommand } from "@/components/install-command"
import { cn } from "@/lib/utils"

function Heading({
  as: Tag,
  id,
  className,
  children,
  ...props
}: ComponentProps<"h2"> & { as: "h2" | "h3" }) {
  return (
    <Tag
      id={id}
      className={cn("group/heading scroll-mt-12", className)}
      {...props}
    >
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 inline-flex align-middle text-muted-foreground opacity-0 transition-opacity duration-200 ease-calm hover:text-foreground focus-visible:opacity-100 group-hover/heading:opacity-100"
        >
          <LinkIcon className="size-4" />
        </a>
      ) : null}
    </Tag>
  )
}

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <Heading as="h2" className={cn("heading-6 pt-6", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <Heading as="h3" className={cn("title-2 pt-4", className)} {...props} />
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
        "rounded-md bg-background px-1.5 py-0.5 font-mono text-foreground text-sm shadow-[inset_0_0_0_1px_var(--border)]",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="well overflow-x-auto">
      <table
        className={cn("body-6 w-full border-collapse", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "caption-3 border-border border-b px-4 py-2.5 text-left text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-border border-t px-4 py-2.5 align-top text-muted-foreground first:text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  InstallCommand,
}
