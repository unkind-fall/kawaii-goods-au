"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Character } from "@/lib/data/sample";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <Link
        href={`/character/${character.slug}`}
        data-testid={`character-card-${character.slug}`}
        className="group block overflow-hidden rounded-kawaii-lg bg-white/70 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-kawaii-cream">
          <Image
            src={character.heroImage}
            alt={`${character.name} hero`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-[1.02]"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          />
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold">{character.name}</p>
          <p className="mt-1 text-xs text-foreground/60">{character.type === "main" ? "Main" : "Sub-character"}</p>
        </div>
      </Link>
    </motion.div>
  );
}

