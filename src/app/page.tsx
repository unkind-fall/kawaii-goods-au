import Link from "next/link";

const FEATURED = [
  { title: "Sanrio Stationery", desc: "Pens, stickers, and notebooks.", href: "/products?tag=stationery" },
  { title: "Character Plush", desc: "Soft friends for your desk.", href: "/products?tag=plush" },
  { title: "Tiny Accessories", desc: "Keychains, pouches, charms.", href: "/products?tag=accessories" },
  { title: "New Arrivals", desc: "Fresh drops every week.", href: "/new" },
];

export default function HomePage() {
  return (
    <div className="grid gap-10">
      <section className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-kawaii-sky/30 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-kawaii-pink/30 blur-2xl"
        />
        <p className="inline-flex rounded-kawaii bg-kawaii-lavender/40 px-4 py-2 text-xs font-semibold text-foreground/75">
          AU shipping, JP vibes
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">
          Character goods that feel like a tiny Tokyo stationery aisle
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
          Rounded corners. Pastel colors. Little micro-interactions. This is the foundation for the full store build.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/characters"
            className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-kawaii-pink px-6 text-sm font-semibold shadow-sm transition hover:shadow-kawaii-hover"
          >
            Browse characters
          </Link>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-white/80 px-6 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-white"
          >
            Shop products
          </Link>
        </div>
      </section>

      <section aria-label="Featured categories" className="grid gap-4 sm:grid-cols-2">
        {FEATURED.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-kawaii-lg bg-white/70 p-6 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:-translate-y-0.5 hover:shadow-kawaii-hover"
          >
            <p className="text-base font-semibold">{c.title}</p>
            <p className="mt-1 text-sm text-foreground/70">{c.desc}</p>
            <p className="mt-4 text-xs font-semibold text-foreground/60 group-hover:text-foreground/80">
              Explore →
            </p>
          </Link>
        ))}
      </section>

      {/* Extra content to enable Back-to-Top behavior during E2E. */}
      <section aria-label="Atmosphere" className="grid gap-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="rounded-kawaii-lg bg-white/50 p-5 shadow-sm ring-1 ring-kawaii-pink/20"
          >
            <p className="text-sm font-semibold">Kawaii detail #{i + 1}</p>
            <p className="mt-1 text-sm text-foreground/70">
              Soft shadows, comfy spacing, and playful rounded geometry.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

