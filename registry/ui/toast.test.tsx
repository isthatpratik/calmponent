import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Toaster, toast } from "./toast"

afterEach(async () => {
  await act(async () => toast.dismiss())
  cleanup()
})

describe("toast", () => {
  it("shows a toast with title and description", async () => {
    render(<Toaster />)
    await act(async () => {
      toast("Invite sent", { description: "Ada will get an email." })
    })
    expect(await screen.findByText("Invite sent")).toBeTruthy()
    expect(screen.getByText("Ada will get an email.")).toBeTruthy()
  })

  it("sets the type for styling and icons", async () => {
    render(<Toaster />)
    await act(async () => {
      toast.success("Saved")
    })
    await screen.findByText("Saved")
    const root = document.querySelector("[data-slot='toast']")
    expect(root?.getAttribute("data-type")).toBe("success")
  })

  it("runs the action", async () => {
    const retry = vi.fn()
    render(<Toaster />)
    await act(async () => {
      toast.error("Upload failed", {
        action: { label: "Retry", onClick: retry },
      })
    })
    // Base UI hides error toasts in place and announces them in a separate
    // live region, so the button is found with { hidden: true }.
    fireEvent.click(
      await screen.findByRole("button", { name: "Retry", hidden: true }),
    )
    expect(retry).toHaveBeenCalledOnce()
  })

  it("turns a loading toast into its result in place", async () => {
    render(<Toaster />)
    let finish: (value: string) => void = () => {}
    const work = new Promise<string>((resolve) => {
      finish = resolve
    })
    await act(async () => {
      toast.promise(work, {
        loading: "Saving",
        success: "Saved",
        error: "Could not save",
      })
    })
    expect(await screen.findByText("Saving")).toBeTruthy()
    const first = document.querySelector("[data-slot='toast']")
    expect(first?.getAttribute("data-type")).toBe("loading")
    await act(async () => {
      finish("ok")
      await work
    })
    expect(await screen.findByText("Saved")).toBeTruthy()
    expect(document.querySelectorAll("[data-slot='toast']")).toHaveLength(1)
    expect(
      document.querySelector("[data-slot='toast']")?.getAttribute("data-type"),
    ).toBe("success")
  })

  it("closes from the close button", async () => {
    render(<Toaster />)
    await act(async () => {
      toast("Copied", { timeout: 0 })
    })
    // Close stays out of the accessibility tree until the stack is focused
    // or expanded, which keeps announcements short. Find it in its toast.
    const copied = await screen.findByText("Copied")
    const close = copied
      .closest("[data-slot='toast']")
      ?.querySelector("button[aria-label='Close']")
    expect(close).toBeTruthy()
    fireEvent.click(close as Element)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600))
    })
    expect(screen.queryByText("Copied")).toBeNull()
  })
})
