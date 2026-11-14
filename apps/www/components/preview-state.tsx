"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@calmponent/registry/ui/select"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type PreviewState =
  | "live"
  | "loading"
  | "success"
  | "error"
  | "empty"
  | "disabled"

const order: PreviewState[] = [
  "live",
  "loading",
  "success",
  "error",
  "empty",
  "disabled",
]
const labels: Record<PreviewState, string> = {
  live: "Live",
  loading: "Loading",
  success: "Success",
  error: "Error",
  empty: "Empty",
  disabled: "Disabled",
}

type Context = {
  state: PreviewState
  setState: (state: PreviewState) => void
  supported: Set<PreviewState>
  register: (states: PreviewState[]) => () => void
}

const PreviewContext = createContext<Context | null>(null)

/** Holds the forced state for every preview on a page. */
export function PreviewStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PreviewState>("live")
  const [counts, setCounts] = useState<Map<PreviewState, number>>(new Map())

  const register = useCallback((states: PreviewState[]) => {
    setCounts((current) => {
      const next = new Map(current)
      for (const item of states) next.set(item, (next.get(item) ?? 0) + 1)
      return next
    })
    return () =>
      setCounts((current) => {
        const next = new Map(current)
        for (const item of states) next.set(item, (next.get(item) ?? 1) - 1)
        return next
      })
  }, [])

  const supported = useMemo(
    () =>
      new Set(
        [...counts].filter(([, count]) => count > 0).map(([item]) => item),
      ),
    [counts],
  )

  return (
    <PreviewContext.Provider value={{ state, setState, supported, register }}>
      {children}
    </PreviewContext.Provider>
  )
}

/**
 * A demo declares which states it can show. It gets the forced state back,
 * or "live" when the visitor has not forced one it supports.
 */
export function usePreviewState<T extends PreviewState>(
  states: T[],
): T | "live" {
  const context = useContext(PreviewContext)
  const key = states.join(",")
  // biome-ignore lint/correctness/useExhaustiveDependencies: key captures the states
  useEffect(() => context?.register(states), [context?.register, key])
  if (!context) return "live"
  return (states as PreviewState[]).includes(context.state)
    ? (context.state as T)
    : "live"
}

/** The control in the page header. Hidden when no demo supports a state. */
export function PreviewStateSelect() {
  const context = useContext(PreviewContext)
  if (!context || context.supported.size === 0) return null
  const items = order
    .filter((item) => item === "live" || context.supported.has(item))
    .map((value) => ({ value, label: labels[value] }))
  return (
    <div className="flex items-center gap-2">
      <span
        id="preview-state-label"
        className="caption-1 text-muted-foreground"
      >
        State
      </span>
      <Select
        items={items}
        value={context.state}
        onValueChange={(value) => context.setState(value as PreviewState)}
      >
        <SelectTrigger
          aria-labelledby="preview-state-label"
          size="sm"
          className="w-32"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
