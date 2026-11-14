import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

afterEach(cleanup)

function Demo({ loading = false }: { loading?: boolean }) {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team" disabled>
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="billing" loading={loading}>
        Billing settings
      </TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("shows the default panel and switches on click", async () => {
    render(<Demo />)
    expect(screen.getByText("Account settings")).toBeTruthy()
    await act(async () =>
      fireEvent.click(screen.getByRole("tab", { name: "Billing" })),
    )
    expect(
      screen
        .getByRole("tab", { name: "Billing" })
        .getAttribute("aria-selected"),
    ).toBe("true")
    expect(screen.getByText("Billing settings")).toBeTruthy()
  })

  it("keeps a disabled tab from being chosen", async () => {
    render(<Demo />)
    const team = screen.getByRole("tab", { name: "Team" })
    await act(async () => fireEvent.click(team))
    expect(team.getAttribute("aria-selected")).toBe("false")
  })

  it("renders the sliding indicator", () => {
    render(<Demo />)
    expect(document.querySelector("[data-slot='tabs-indicator']")).toBeTruthy()
  })

  it("shows a skeleton while a panel loads", async () => {
    render(<Demo loading />)
    await act(async () =>
      fireEvent.click(screen.getByRole("tab", { name: "Billing" })),
    )
    const panel = screen.getByRole("tabpanel")
    expect(panel.getAttribute("aria-busy")).toBe("true")
    expect(panel.querySelector("[data-slot='tabs-skeleton']")).toBeTruthy()
  })
})
