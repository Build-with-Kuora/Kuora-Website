import { TransitionLink } from "@/components/page-transition";

export default function NotFound() {
  return (
    <section className="container-sheet py-24 sm:py-32">
      <title>Page not found | Kura</title>
      <p className="stretch-narrow text-sm text-graphite">Error 404</p>
      <h1 className="stretch-wide mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight">
        This page is not on any of our drawings.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-graphite">
        The address may be mistyped, or the page may have moved. Start again from the home page or
        browse the work.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <TransitionLink
          href="/"
          className="bg-chalk px-5 py-3 text-base font-medium text-ink transition-colors hover:bg-signal"
        >
          Go to the home page
        </TransitionLink>
        <TransitionLink
          href="/work"
          className="border border-line px-5 py-3 text-base font-medium transition-colors hover:border-signal hover:text-signal"
        >
          See the work
        </TransitionLink>
      </div>
    </section>
  );
}
