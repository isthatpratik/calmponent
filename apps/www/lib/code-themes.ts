/**
 * Code syntax themes for the docs. Code is the one place where color is not
 * only for status (owner request, ADR 0009): the palette uses the step-900
 * colors of the Geist scales. Pink keywords, green strings, purple functions, blue
 * variables and tags, orange imports, types and numbers, plain punctuation.
 * Every light color has at least 4.5:1 contrast on white, and every dark
 * color on the dark well, so code stays readable (WCAG AA).
 */

type Palette = {
  fg: string
  comment: string
  keyword: string
  string: string
  fn: string
  variable: string
  accent: string
}

function theme(name: string, type: "light" | "dark", p: Palette) {
  return {
    name,
    type,
    // The code surface comes from the site CSS, so the theme has no background.
    colors: { "editor.background": "#00000000", "editor.foreground": p.fg },
    tokenColors: [
      { settings: { foreground: p.fg } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: p.comment },
      },
      {
        scope: [
          "keyword",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.operator.new",
          "keyword.operator.expression",
          "keyword.control",
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: [
          "keyword.operator",
          "punctuation",
          "meta.brace",
          "meta.jsx.children",
          "variable.other.property",
          "variable.other.object.property",
          "meta.object-literal.key",
          "variable.parameter",
        ],
        settings: { foreground: p.fg },
      },
      {
        scope: [
          "string",
          "string.template",
          "punctuation.definition.string",
          "markup.inline.raw",
        ],
        settings: { foreground: p.string },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "meta.function-call entity.name.function",
          "entity.other.attribute-name",
        ],
        settings: { foreground: p.fn },
      },
      {
        scope: [
          "variable",
          "variable.other.readwrite",
          "variable.other.constant",
          "support.variable",
          "entity.name.tag",
          "support.class.component",
          "markup.heading",
        ],
        settings: { foreground: p.variable },
      },
      {
        scope: [
          "variable.other.readwrite.alias",
          "entity.name.type",
          "entity.name.class",
          "support.type",
          "support.class",
          "constant",
          "constant.numeric",
          "constant.language",
        ],
        settings: { foreground: p.accent },
      },
      {
        // Shell commands: the program name reads as a function call.
        scope: ["entity.name.command", "support.function.builtin.shell"],
        settings: { foreground: p.fn },
      },
    ],
  }
}

export const codeLight = theme("calmponent-light", "light", {
  fg: "#171717",
  comment: "#4d4d4d",
  keyword: "#bd2864",
  string: "#297a3a",
  fn: "#7820bc",
  variable: "#0068d6",
  accent: "#a35200",
})

export const codeDark = theme("calmponent-dark", "dark", {
  fg: "#ededed",
  comment: "#a1a1a1",
  keyword: "#f75f8f",
  string: "#62c073",
  fn: "#bf7af0",
  variable: "#52a8ff",
  accent: "#f2a20d",
})

export const codeThemes = { light: codeLight, dark: codeDark }
