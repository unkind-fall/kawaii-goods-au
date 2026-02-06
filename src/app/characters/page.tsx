import { CharacterIndexClient } from "@/components/character/CharacterIndexClient";

export default function CharactersIndexPage() {
  return (
    <div>
      <div className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <h1 className="text-2xl font-semibold">Characters</h1>
        <p className="mt-2 text-sm text-foreground/70">
          A character wiki experience, built with a soft “fancy goods” vibe.
        </p>
      </div>

      <div className="mt-6">
        <CharacterIndexClient />
      </div>
    </div>
  );
}
