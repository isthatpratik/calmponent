import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="heading-3">Calmponent</h1>
      <p className="body-3 mt-4 text-muted-foreground">
        Finished components for shadcn/ui. Every state designed, every motion
        with a reason.
      </p>
      <p className="caption-2 mt-2 text-muted-foreground">
        Status: planning. This page is a placeholder until the site structure
        (D7) is decided.
      </p>
      <Link
        href="/docs"
        className="button-md mt-8 inline-flex rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-opacity duration-200 ease-calm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98]"
      >
        Read the docs
      </Link>
    </main>
  )
}
