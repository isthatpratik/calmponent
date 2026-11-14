import { Button } from "@calmponent/registry/ui/button"
import Link from "next/link"
import {
  ChecklistDemo,
  RunDemo,
  SaveDemo,
  SwitchDemo,
  ToastDemo,
  UsernameDemo,
} from "@/components/landing/demos"
import { InstallChip } from "@/components/landing/install-chip"
import { GridCell } from "@/components/landing/status-grid"
import { Tagline } from "@/components/landing/tagline"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const features = [
  {
    title: "Every state, built in",
    body: "Loading, success, error, empty, and disabled are part of each component, not homework for later.",
  },
  {
    title: "Motion with a cause",
    body: "Things move when something changed, then rest. One curve family, and reduced motion everywhere.",
  },
  {
    title: "Accessible by default",
    body: "Built on Base UI. Keyboard, focus, live regions, and contrast that passes AA in light and dark.",
  },
  {
    title: "Ready for AI agents",
    body: "Copy any page as clean Markdown, or open it in an assistant. Same names as shadcn/ui.",
  },
]

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 pt-24 pb-20 text-center sm:pt-32">
          <Link
            href="https://github.com/isthatpratik/calmponent/releases/tag/v0.1.0"
            className="caption-4 flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors duration-200 ease-calm hover:text-foreground"
          >
            <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-foreground">
              v0.1.0
            </span>
            Forms core is out
          </Link>
          <h1 className="heading-3 max-w-[680px] text-balance bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent sm:heading-1">
            Finished components
            <br />
            for shadcn/ui
          </h1>
          <p className="body-3 max-w-[560px] text-pretty text-muted-foreground">
            Every state designed, every motion with a reason. Add them with the
            shadcn CLI and own every line.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/docs/components/button" />}
            >
              Browse components
            </Button>
            <InstallChip command="npx shadcn@latest add isthatpratik/calmponent/form" />
          </div>
          <p className="caption-2 text-muted-foreground">
            13 components · built on Base UI · MIT licensed
          </p>
        </section>

        <section
          aria-labelledby="live"
          className="mx-auto max-w-[1200px] px-6 pb-24"
        >
          <h2 id="live" className="sr-only">
            Live components
          </h2>
          <div className="grid lg:grid-cols-3">
            <GridCell
              title="Button"
              description="Loading, then success, at the same width."
            >
              <SaveDemo />
            </GridCell>
            <GridCell
              title="Switch"
              description="Pending while it saves. The first change fails on purpose."
            >
              <SwitchDemo />
            </GridCell>
            <GridCell
              title="Field and input"
              description="Checked as you type. Try calm, then ada."
              last={{ right: true }}
            >
              <UsernameDemo />
            </GridCell>
            <GridCell
              title="Checkbox"
              description="The check draws itself. Check them all."
              last={{ bottom: true }}
            >
              <ChecklistDemo />
            </GridCell>
            <GridCell
              title="Toast"
              description="Loading turns into its result, in place."
              last={{ bottom: true }}
            >
              <ToastDemo />
            </GridCell>
            <GridCell
              title="Timeline bar"
              description="A whole run at a glance. Hover a segment."
              last={{ right: true, bottom: true }}
            >
              <RunDemo />
            </GridCell>
          </div>
          <p className="caption-2 mt-4 text-center text-muted-foreground">
            The dot at each corner is a status light for its demo.
          </p>
        </section>

        <section className="px-6 py-32">
          <Tagline
            lines={[
              "Most components look done in a screenshot.",
              "These feel done when you use them.",
            ]}
          />
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-px overflow-hidden px-6 pb-32 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 py-6 sm:pr-8"
            >
              <span className="caption-5 font-mono text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="title-3 text-foreground">{feature.title}</span>
              <p className="body-6 text-pretty text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 pb-32 text-center">
          <h2 className="heading-4 max-w-[680px] text-balance text-foreground">
            Start with one component
          </h2>
          <p className="body-3 max-w-[480px] text-pretty text-muted-foreground">
            Each one works on its own and keeps the shadcn/ui names, so you can
            swap them in one at a time.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/docs/installation" />}
          >
            Read the installation guide
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
