import type { MDXComponents } from "mdx/types"

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="heading-6 pt-6" {...props} />,
  h3: (props) => <h3 className="title-2 pt-4" {...props} />,
  p: (props) => <p className="body-3 text-muted-foreground" {...props} />,
  a: (props) => (
    <a
      className="text-foreground underline underline-offset-4 transition-colors duration-200 ease-calm hover:text-muted-foreground"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="body-3 list-disc space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm"
      {...props}
    />
  ),
}
