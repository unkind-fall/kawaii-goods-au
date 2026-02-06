import { CharacterIndexClient } from "@/components/character/CharacterIndexClient";
import { FloatingHearts, SparkleEffect } from "@/components/ui/DecorativeElements";

export default function CharactersIndexPage() {
  return (
    <div>
      <div className="relative overflow-hidden rounded-kawaii-lg bg-gradient-to-br from-kawaii-lavender/40 via-kawaii-pink/25 to-kawaii-sky/30 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <FloatingHearts count={4} />
        <SparkleEffect count={3} />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-kawaii-lavender/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-kawaii-pink/30 blur-3xl"
        />
        <div className="relative z-10">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Characters</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/75">
            A character wiki experience, built with a soft &ldquo;fancy goods&rdquo; vibe. Discover your favorite Sanrio friends and explore their worlds.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <CharacterIndexClient />
      </div>
    </div>
  );
}
