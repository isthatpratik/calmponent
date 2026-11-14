"use client"

import { Field, FieldLabel } from "@calmponent/registry/ui/field"
import { Input } from "@calmponent/registry/ui/input"
import { Switch } from "@calmponent/registry/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@calmponent/registry/ui/tabs"
import { useState } from "react"

export function TabsDemo() {
  return (
    <Tabs defaultValue="profile" className="mx-auto w-full max-w-md">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="sso" disabled>
          SSO
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input defaultValue="Ada Lovelace" />
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input defaultValue="ada@example.com" />
        </Field>
      </TabsContent>
      <TabsContent value="notifications" className="flex flex-col gap-4">
        <Field orientation="horizontal">
          <FieldLabel>Weekly summary</FieldLabel>
          <Switch defaultChecked />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>Product updates</FieldLabel>
          <Switch />
        </Field>
      </TabsContent>
      <TabsContent value="billing" className="body-6 text-muted-foreground">
        Team plan, 12 seats. Renews on December 14.
      </TabsContent>
    </Tabs>
  )
}

export function TabsLineDemo() {
  const [loading, setLoading] = useState(true)
  return (
    <Tabs
      defaultValue="overview"
      className="mx-auto w-full max-w-md"
      onValueChange={(value) => {
        if (value === "activity") {
          setLoading(true)
          setTimeout(() => setLoading(false), 1200)
        }
      }}
    >
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="body-6 text-muted-foreground">
        18 deploys this week, 2 failed. Median build time 31 seconds.
      </TabsContent>
      <TabsContent
        value="activity"
        loading={loading}
        className="body-6 text-muted-foreground"
      >
        Ines merged “Update pricing page” 4 minutes ago.
      </TabsContent>
      <TabsContent value="settings" className="body-6 text-muted-foreground">
        Builds run on every push to main.
      </TabsContent>
    </Tabs>
  )
}

export const tabsCode = `
<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
    <TabsTrigger value="sso" disabled>SSO</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">…</TabsContent>
  <TabsContent value="notifications">…</TabsContent>
</Tabs>
`

export const tabsLineCode = `
<Tabs defaultValue="overview">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity" loading={loading}>…</TabsContent>
</Tabs>
`
