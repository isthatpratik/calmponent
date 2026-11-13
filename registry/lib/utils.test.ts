import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center")
  })

  it("drops falsy values", () => {
    expect(cn("flex", false, null, undefined, "", "gap-2")).toBe("flex gap-2")
  })

  it("keeps the last conflicting Tailwind class", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
    expect(cn("text-sm text-neutral-500", "text-lg")).toBe(
      "text-neutral-500 text-lg",
    )
  })

  it("accepts objects and arrays", () => {
    expect(cn(["flex", { "gap-2": true, hidden: false }])).toBe("flex gap-2")
  })
})
