import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="font-semibold text-3xl">Calmponent</h1>
      <p className="mt-4 text-neutral-600">
        Finished components for shadcn/ui. Every state designed, every motion
        with a reason.
      </p>
      <p className="mt-2 text-neutral-500 text-sm">
        Status: planning. This page is a placeholder.
      </p>
      <Link href="/docs" className="mt-8 inline-block underline">
        Read the docs
      </Link>
    </main>
  )
}
