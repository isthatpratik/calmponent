import { markDot, markPath } from "@/lib/mark"

/**
 * The Open Graph card, drawn by next/og: black, the mark and wordmark, a
 * dashed rule with status dots, the title, and the description.
 */
export function OgCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  const dot = (color: string) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: color,
    boxShadow: "0 0 0 8px #000",
  })
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000",
        color: "#fafafa",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={markPath}
            stroke="#fafafa"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle {...markDot} fill="#fafafa" />
        </svg>
        <div style={{ fontSize: 32, fontWeight: 600 }}>Calmponent</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 22,
            color: "#a3a3a3",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            lineHeight: 1.35,
            maxWidth: 940,
          }}
        >
          {description}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <div style={dot("#62c073")} />
        <div style={{ flex: 1, borderTop: "2px dashed #313131" }} />
        <div style={dot("#525252")} />
        <div style={{ flex: 1, borderTop: "2px dashed #313131" }} />
        <div style={dot("#525252")} />
      </div>
    </div>
  )
}
