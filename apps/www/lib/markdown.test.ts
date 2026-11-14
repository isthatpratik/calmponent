import { describe, expect, it } from "vitest"
import { toPlainMarkdown } from "./markdown"

describe("toPlainMarkdown", () => {
  it("turns install components into commands", () => {
    expect(toPlainMarkdown('<InstallCommand item="a/b/button" />')).toBe(
      "```bash\nnpx shadcn@latest add a/b/button\n```",
    )
  })

  it("turns showcase sections into headings", () => {
    const input =
      '<Example title="At a glance" description="One bar.">\n</Example>'
    expect(toPlainMarkdown(input)).toBe("### At a glance\n\nOne bar.")
  })

  it("drops live demos and heading anchors", () => {
    const input = "Intro\n\n<ButtonDemo />\n\n## Install [#install]\n\nText"
    expect(toPlainMarkdown(input)).toBe("Intro\n\n## Install\n\nText")
  })
})
