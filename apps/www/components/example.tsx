import { highlight } from "fumadocs-core/highlight"
import type { ReactNode } from "react"
import { ExampleTabs } from "@/components/example-tabs"
import { codeThemes } from "@/lib/code-themes"

/**
 * A showcase section: a title, and a Preview / Code toggle. The code is
 * highlighted on the server with the same themes as the docs code blocks.
 */
export async function Example({
  title,
  description,
  code,
  lang = "tsx",
  children,
}: {
  title: string
  description?: string
  code?: string
  lang?: string
  children: ReactNode
}) {
  const codeNode = code
    ? await highlight(code.trim(), { lang, themes: codeThemes })
    : null
  return (
    <ExampleTabs
      title={title}
      description={description}
      code={code}
      codeNode={codeNode}
    >
      {children}
    </ExampleTabs>
  )
}
