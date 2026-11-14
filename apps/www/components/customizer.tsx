"use client"

import { Popover } from "@base-ui/react/popover"
import { Slider } from "@base-ui/react/slider"
import { Button } from "@calmponent/registry/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@calmponent/registry/ui/select"
import { Switch } from "@calmponent/registry/ui/switch"
import { toast } from "@calmponent/registry/ui/toast"
import { useEffect, useState } from "react"
import {
  type Accent,
  accents,
  applyLook,
  type Base,
  baseLabels,
  decodeLook,
  defaultLook,
  encodeLook,
  type Font,
  fonts,
  isDefault,
  type Look,
  radiusStops,
  type Stroke,
  storageKey,
  strokes,
  tokensFor,
} from "@/lib/customize"
import { cn } from "@/lib/utils"

function Sliders() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4"
    >
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="title-4 mb-3">{label}</legend>
      <div
        className="grid gap-1 rounded-lg bg-background p-1 shadow-[inset_0_0_0_1px_var(--border)]"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className="caption-1 h-7 cursor-pointer rounded-md text-muted-foreground outline-none transition-colors duration-200 ease-calm hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-muted aria-pressed:text-foreground"
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

const fontItems = (Object.keys(fonts) as Font[]).map((value) => ({
  value,
  label: fonts[value].label,
}))

async function copy(text: string, done: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(done)
  } catch {
    toast.error("Could not copy", {
      description: "Your browser blocked the clipboard.",
    })
  }
}

/**
 * Preview Calmponent in your own look: accent, shape, typeface, and motion.
 * Choices are saved, applied before paint, and can be copied as tokens.
 */
export function Customizer() {
  const [look, setLook] = useState<Look>(defaultLook)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("look")
    const shared = fromUrl ? decodeLook(fromUrl) : null
    let saved: Look | null = null
    try {
      const raw = localStorage.getItem(storageKey)
      saved = raw ? { ...defaultLook, ...JSON.parse(raw) } : null
    } catch {}
    const initial = shared ?? saved ?? defaultLook
    setLook(initial)
    applyLook(initial)
  }, [])

  function update(next: Partial<Look>) {
    const merged = { ...look, ...next }
    setLook(merged)
    applyLook(merged)
    try {
      localStorage.setItem(storageKey, JSON.stringify(merged))
    } catch {}
  }

  function reset() {
    setLook(defaultLook)
    applyLook(defaultLook)
    try {
      localStorage.removeItem(storageKey)
    } catch {}
  }

  const setup = [
    "Set up Calmponent in this project:",
    "1. npx shadcn@latest add isthatpratik/calmponent/tokens",
    "2. Add these variables to the end of the global CSS file:",
    tokensFor(look),
    "3. Add components, for example: npx shadcn@latest add isthatpratik/calmponent/form",
  ].join("\n")

  return (
    <Popover.Root>
      <Popover.Trigger
        render={<Button variant="ghost" size="sm" className="gap-1.5" />}
      >
        <Sliders />
        <span className="max-sm:sr-only">Customize</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          sideOffset={8}
          align="end"
          collisionPadding={12}
          className="z-50"
        >
          <Popover.Popup className="max-h-(--available-height) w-[min(20rem,calc(100vw-2rem))] origin-(--transform-origin) overflow-y-auto rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-xl outline-none transition-[opacity,scale] duration-200 ease-calm data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:data-[ending-style]:scale-100 motion-reduce:data-[starting-style]:scale-100">
            <Popover.Title className="sr-only">
              Customize the preview
            </Popover.Title>
            <div className="flex flex-col gap-6">
              <Segmented
                label="Base"
                value={look.base}
                options={(Object.keys(baseLabels) as Base[]).map((value) => ({
                  value,
                  label: baseLabels[value],
                }))}
                onChange={(base) => update({ base })}
              />

              <fieldset className="flex flex-col gap-3">
                <legend className="title-4 mb-3">Accent</legend>
                <div className="grid grid-cols-5 gap-2">
                  {(Object.keys(accents) as Accent[]).map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={look.accent === value}
                      onClick={() => update({ accent: value })}
                      aria-label={accents[value].label}
                      title={accents[value].label}
                      className={cn(
                        "caption-1 flex h-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground outline-none",
                        "shadow-[inset_0_0_0_1px_var(--border)] transition-[box-shadow,color] duration-200 ease-calm hover:text-foreground",
                        "focus-visible:ring-2 focus-visible:ring-ring aria-pressed:text-foreground aria-pressed:shadow-[inset_0_0_0_1.5px_var(--foreground)]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-4 shrink-0 rounded-full"
                        style={{ background: accents[value].swatch }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span id="shape-label" className="title-4">
                    Shape
                  </span>
                  <span className="caption-1 font-mono text-muted-foreground tabular-nums">
                    {radiusStops[look.shape]?.label}
                  </span>
                </div>
                <Slider.Root
                  aria-labelledby="shape-label"
                  value={look.shape}
                  min={0}
                  max={radiusStops.length - 1}
                  step={1}
                  onValueChange={(value) => update({ shape: Number(value) })}
                >
                  <Slider.Control className="flex h-5 w-full cursor-pointer touch-none items-center">
                    <Slider.Track className="relative h-1 w-full rounded-full bg-muted">
                      <Slider.Indicator className="rounded-full bg-foreground" />
                      <Slider.Thumb
                        getAriaValueText={(_, value) =>
                          radiusStops[value]?.label ?? ""
                        }
                        className="size-4 rounded-full bg-foreground shadow-[0_0_0_4px_var(--popover)] outline-none transition-[scale] duration-200 ease-calm focus-visible:ring-2 focus-visible:ring-ring active:scale-110"
                      />
                    </Slider.Track>
                  </Slider.Control>
                </Slider.Root>
                <div className="caption-5 flex justify-between text-muted-foreground">
                  <span>Square</span>
                  <span>Pill</span>
                </div>
              </div>

              <Segmented
                label="Icons"
                value={look.stroke}
                options={(Object.keys(strokes) as Stroke[]).map((value) => ({
                  value,
                  label: strokes[value].label,
                }))}
                onChange={(stroke) => update({ stroke })}
              />

              <div className="flex items-center justify-between gap-4">
                <span id="font-label" className="title-4">
                  Typeface
                </span>
                <Select
                  items={fontItems}
                  value={look.font}
                  onValueChange={(value) => update({ font: value as Font })}
                >
                  <SelectTrigger
                    aria-labelledby="font-label"
                    size="sm"
                    className="w-40"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span id="motion-label" className="title-4">
                  Motion
                </span>
                <Switch
                  aria-labelledby="motion-label"
                  checked={look.motion}
                  onCheckedChange={(value) => update({ motion: value })}
                />
              </div>

              <div className="flex flex-col gap-2 border-border border-t pt-5">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copy(setup, "Setup copied")}
                  >
                    Copy setup
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const url = new URL(window.location.href)
                      url.searchParams.set("look", encodeLook(look))
                      copy(url.toString(), "Link copied")
                    }}
                  >
                    Copy link
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isDefault(look)}
                    onClick={() => copy(tokensFor(look), "Tokens copied")}
                  >
                    Copy tokens
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isDefault(look)}
                    onClick={reset}
                  >
                    Reset to defaults
                  </Button>
                </div>
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
