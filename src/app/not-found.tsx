import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-sheet py-28 text-center sm:py-40">
      <title>Page not found | Koura</title>
      <p className="label">Error 404</p>
      <h1 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,5vw,4rem)]">
        This page is not on any of our drawings.
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
        The address may be mistyped, or the page may have moved. Start again from the home page or
        browse the work.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Go to the home page
        </Link>
        <Link href="/work" className="btn-secondary">
          See the work
        </Link>
      </div>
    </section>
  );
}
