import { CharacterIndexClient } from "@/components/character/CharacterIndexClient";

export default function CharactersIndexPage() {
  return (
    <div>
      <div className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-kawaii-lavender/30 blur-2xl"
        />
        <h1 className="text-2xl font-semibold">Characters</h1>
        <p className="mt-2 max-w-xl text-sm text-foreground/70">
          A character wiki experience, built with a soft &ldquo;fancy goods&rdquo; vibe. Discover your favorite Sanrio friends and explore their worlds.
        </p>
      </div>

      <div className="mt-6">
        <CharacterIndexClient />
      </div>
    </div>
  );
}
