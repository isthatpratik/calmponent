// Code shown in the Preview / Code toggles. A plain module, so server
// components receive the strings themselves, not client references.

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
