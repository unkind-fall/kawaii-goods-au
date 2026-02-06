"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Character } from "@/lib/data/sample";

export function CharacterCard({ character, index = 0 }: { character: Character; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.05 }}
      whileHover={{ y: -6, rotate: [-0.5, 0.8, -0.5, 0] }}
    >
      <Link
        href={`/character/${character.slug}`}
        data-testid={`character-card-${character.slug}`}
        className="group block overflow-hidden rounded-kawaii-lg bg-white/75 shadow-kawaii-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: character.hexColor }}
        >
          <Image
            src={character.heroImage}
            alt={`${character.name} hero`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
        <div className="p-4" style={{ borderBottom: `3px solid ${character.hexColor}` }}>
          <p className="font-display text-sm font-bold">{character.name}</p>
          <p className="mt-1 text-xs text-foreground/60">{character.type === "main" ? "Main" : "Sub-character"}</p>
        </div>
      </Link>
    </motion.div>
  );
}
