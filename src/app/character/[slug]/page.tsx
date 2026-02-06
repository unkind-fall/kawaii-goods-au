import type { Metadata } from "next";
import Link from "next/link";

import { CharacterShrine } from "@/components/character/CharacterShrine";
import { SAMPLE_CHARACTERS } from "@/lib/data/sample";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = SAMPLE_CHARACTERS.find((c) => c.slug === slug);
  return {
    title: character ? `${character.name} | Characters` : "Character | Characters",
  };
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const character = SAMPLE_CHARACTERS.find((c) => c.slug === slug);
  if (!character) {
    return (
      <div className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <h1 className="text-2xl font-semibold">Character not found</h1>
        <p className="mt-2 text-sm text-foreground/70">Try browsing the character index.</p>
        <Link className="mt-4 inline-flex min-h-11 items-center rounded-kawaii bg-kawaii-pink px-5 text-sm font-semibold" href="/characters">
          Back to Characters
        </Link>
      </div>
    );
  }

  return <CharacterShrine character={character} />;
}

