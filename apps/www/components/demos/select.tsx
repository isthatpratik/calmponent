"use client"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@calmponent/registry/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@calmponent/registry/ui/select"
import type { ReactNode } from "react"

const regions = [
  { label: "Frankfurt", value: "fra" },
  { label: "London", value: "lhr" },
  { label: "Mumbai", value: "bom" },
  { label: "Singapore", value: "sin" },
  { label: "Virginia", value: "iad" },
]

export function SelectDemo() {
  return (
    <div className="well p-6">
      <Field className="max-w-xs">
        <FieldLabel>Region</FieldLabel>
        <Select items={regions} defaultValue="bom">
          <SelectTrigger>
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="fra">Frankfurt</SelectItem>
              <SelectItem value="lhr">London</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Asia and Americas</SelectLabel>
              <SelectItem value="bom">Mumbai</SelectItem>
              <SelectItem value="sin">Singapore</SelectItem>
              <SelectItem value="iad">Virginia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>Where your data is stored.</FieldDescription>
      </Field>
    </div>
  )
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 bg-background p-4">
      <span className="caption-3 text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

export function SelectStates() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      <Cell label="placeholder">
        <Select items={regions}>
          <SelectTrigger aria-label="Region">
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Cell>
      <Cell label="selected">
        <Select items={regions} defaultValue="lhr">
          <SelectTrigger aria-label="Region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Cell>
      <Cell label="empty list (open it)">
        <Select items={[]}>
          <SelectTrigger aria-label="Project">
            <SelectValue placeholder="Choose a project" />
          </SelectTrigger>
          <SelectContent empty="No projects yet. Create one first." />
        </Select>
      </Cell>
      <Cell label="invalid">
        <Field invalid>
          <Select items={regions}>
            <SelectTrigger aria-label="Region">
              <SelectValue placeholder="Choose a region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError match>Choose a region to continue.</FieldError>
        </Field>
      </Cell>
      <Cell label="disabled">
        <Select items={regions} defaultValue="fra" disabled>
          <SelectTrigger aria-label="Region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent />
        </Select>
      </Cell>
      <Cell label="small">
        <Select items={regions} defaultValue="sin">
          <SelectTrigger aria-label="Region" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Cell>
    </div>
  )
}
