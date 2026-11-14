"use client"

import { Button } from "@calmponent/registry/ui/button"
import { toast } from "@calmponent/registry/ui/toast"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
let attempt = 0

export function ToastDemo() {
  function upload() {
    attempt += 1
    const fails = attempt % 2 === 1
    toast.promise(
      wait(1500).then(() => {
        if (fails) throw new Error("Network")
        return "report.pdf"
      }),
      {
        loading: { title: "Uploading report.pdf", description: "2.4 MB" },
        success: {
          title: "Uploaded",
          description: "report.pdf is in your files.",
        },
        error: {
          title: "Upload failed",
          description: "The connection dropped. Try again.",
        },
      },
    )
  }

  return (
    <div className="flex flex-wrap gap-3 well p-6">
      <Button variant="outline" onClick={() => toast("Invite sent to Ada")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Changes saved", {
            description: "Your profile is up to date.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Payment failed", {
            description: "Your card was declined.",
            action: {
              label: "Retry",
              onClick: () => toast.success("Payment sent"),
            },
          })
        }
      >
        Error with retry
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Storage almost full", {
            description: "You have used 92% of 10 GB.",
          })
        }
      >
        Warning
      </Button>
      <Button variant="outline" onClick={upload}>
        Loading to result
      </Button>
    </div>
  )
}
