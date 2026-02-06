"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageGallery({ images }: { images: { url: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);
  const active = images[idx] ?? images[0]!;

  return (
    <div>
      <div className="group relative aspect-square overflow-hidden rounded-kawaii-lg bg-kawaii-cream shadow-sm ring-1 ring-kawaii-pink/30">
        <Image
          data-testid="pdp-image"
          src={active.url}
          alt={active.alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        />
        {/* lightweight zoom hint */}
        <div
          data-testid="zoom-lens"
          className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        >
          <div className="absolute right-3 top-3 rounded-kawaii bg-white/80 px-3 py-2 text-xs font-semibold shadow-sm ring-1 ring-kawaii-pink/30">
            Hover to zoom
          </div>
        </div>
      </div>

      <div data-testid="pdp-thumbs" className="mt-3 grid grid-cols-5 gap-2">
        {images.slice(0, 5).map((img, i) => (
          <button
            key={img.url}
            type="button"
            className={[
              "relative aspect-square overflow-hidden rounded-kawaii bg-white shadow-sm ring-1 ring-kawaii-pink/30",
              i === idx ? "outline outline-2 outline-kawaii-sky" : "",
            ].join(" ")}
            onClick={() => setIdx(i)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="80px"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />
          </button>
        ))}
      </div>
    </div>
  );
}

