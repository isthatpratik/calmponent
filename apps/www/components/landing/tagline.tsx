"use client"

import { useEffect, useRef } from "react"

/**
 * Words light up one at a time as they cross a line 60% down the viewport.
 * With reduced motion, the text shows at full strength right away.
 */
export function Tagline({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]")
    if (!words) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-lit", "")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    )
    for (const word of words) observer.observe(word)
    return () => observer.disconnect()
  }, [])

  return (
    <p
      ref={ref}
      className="heading-3 mx-auto max-w-[680px] text-balance text-center sm:heading-2"
    >
      {lines.map((line, row) => (
        <span key={line} className="block">
          {line
            .split(" ")
            .map((word, index) => ({ word, id: `${row}.${index}` }))
            .map(({ word, id }) => (
              <span
                key={id}
                data-word
                className="text-foreground/30 transition-colors duration-700 ease-calm data-[lit]:text-foreground motion-reduce:text-foreground"
              >
                {word}{" "}
              </span>
            ))}
        </span>
      ))}
    </p>
  )
}
