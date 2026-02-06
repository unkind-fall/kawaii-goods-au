export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
      <h1 className="text-2xl font-semibold">Character: {slug}</h1>
      <p className="mt-2 text-sm text-foreground/70">
        Phase 2 will build the full character shrine page.
      </p>
    </div>
  );
}

