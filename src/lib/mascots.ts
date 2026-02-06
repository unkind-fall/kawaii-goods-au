export type Mascot = {
  id: string;
  name: string;
  tagline: string;
};

export const MASCOTS: Mascot[] = [
  { id: "hello-kitty", name: "Hello Kitty", tagline: "Lost? Let's go home together." },
  { id: "cinnamoroll", name: "Cinnamoroll", tagline: "Pages float away sometimes." },
  { id: "pompompurin", name: "Pompompurin", tagline: "This page went out for pudding." },
  { id: "my-melody", name: "My Melody", tagline: "Oopsie. Let's try a different route." },
  { id: "kuromi", name: "Kuromi", tagline: "404: mischievous detour detected." },
];

function hashStringToInt(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

export function pickMascot(seed?: string | null) {
  if (!seed) {
    const d = new Date();
    const day = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
    seed = day;
  }
  const idx = hashStringToInt(seed) % MASCOTS.length;
  return MASCOTS[idx]!;
}

