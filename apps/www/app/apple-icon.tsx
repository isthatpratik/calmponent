import { ImageResponse } from "next/og"
import { markDot, markPath } from "@/lib/mark"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** The mark on black, for home screens. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <svg
        width="128"
        height="128"
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
    </div>,
    size,
  )
}
