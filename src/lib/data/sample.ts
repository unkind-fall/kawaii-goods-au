export type CharacterType = "main" | "sub";

export type Character = {
  slug: string;
  name: string;
  type: CharacterType;
  hexColor: string;
  birthday?: string;
  interests?: string[];
  bio: string;
  heroImage: string;
  friends: string[]; // slugs
};

export type ProductBadge = "new" | "sale" | "sold_out";

export type Product = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtPriceCents?: number;
  badges: ProductBadge[];
  createdAtMs: number;
  category: "stationery" | "plush" | "accessories";
  characterTags: string[];
  images: { url: string; alt: string }[];
  variants: { id: string; title: string; sku: string; priceCents?: number; stock: number }[];
  materials?: string;
  care?: string;
  maxPerCustomer?: number;
};

// Small, stable dataset that supports pagination/infinite-scroll tests.
export const SAMPLE_CHARACTERS: Character[] = [
  {
    slug: "hello-kitty",
    name: "Hello Kitty",
    type: "main",
    hexColor: "#FFB6C1",
    birthday: "11/01",
    interests: ["Baking", "Friends", "Piano"],
    bio: "Hello Kitty is kind, cheerful, and always ready to share a sweet treat.",
    heroImage: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=60",
    friends: ["my-melody", "kuromi", "cinnamoroll"],
  },
  {
    slug: "cinnamoroll",
    name: "Cinnamoroll",
    type: "main",
    hexColor: "#87CEEB",
    birthday: "03/06",
    interests: ["Cafe naps", "Flying", "Hot cocoa"],
    bio: "A fluffy pup with long ears who drifts gently through the sky.",
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60",
    friends: ["hello-kitty", "pompompurin"],
  },
  {
    slug: "kuromi",
    name: "Kuromi",
    type: "main",
    hexColor: "#E6E6FA",
    birthday: "10/31",
    interests: ["Diaries", "Pranks", "Cute chaos"],
    bio: "Mischievous, stylish, and secretly soft on the inside.",
    heroImage: "https://images.unsplash.com/photo-1520975680904-4dd3b2c236d6?auto=format&fit=crop&w=1200&q=60",
    friends: ["my-melody", "hello-kitty"],
  },
  {
    slug: "my-melody",
    name: "My Melody",
    type: "main",
    hexColor: "#FFDAB9",
    birthday: "01/18",
    interests: ["Baking", "Picnics", "Handmade crafts"],
    bio: "Gentle and thoughtful, with a cozy heart and a very cute hood.",
    heroImage: "https://images.unsplash.com/photo-1517926112623-f32a800790d4?auto=format&fit=crop&w=1200&q=60",
    friends: ["hello-kitty", "kuromi"],
  },
  {
    slug: "pompompurin",
    name: "Pompompurin",
    type: "main",
    hexColor: "#FFDAB9",
    birthday: "04/16",
    interests: ["Pudding", "Nap time", "Collecting shoes"],
    bio: "A golden retriever who loves pudding and comfy days.",
    heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=60",
    friends: ["cinnamoroll"],
  },
  // generate a bunch of sub-characters for paging
  ...Array.from({ length: 45 }).map((_, i) => {
    const n = i + 1;
    return {
      slug: `friend-${n}`,
      name: `Friend ${n}`,
      type: "sub" as const,
      hexColor: n % 2 ? "#98D8C8" : "#E6E6FA",
      bio: "A tiny side character with a big pastel personality.",
      heroImage: "https://images.unsplash.com/photo-1520975680904-4dd3b2c236d6?auto=format&fit=crop&w=1200&q=60",
      friends: [],
    };
  }),
];

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    slug: "hello-kitty-sticker-pack",
    name: "Hello Kitty Sticker Pack",
    description: "A pastel sticker set for journals and letters.",
    priceCents: 990,
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "stationery",
    characterTags: ["hello-kitty"],
    images: [
      { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=60", alt: "Sticker pack front" },
      { url: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&q=60", alt: "Sticker pack close-up" },
    ],
    variants: [
      { id: "default", title: "Default", sku: "HK-STICKERS-01", stock: 25 },
    ],
    materials: "Paper, glossy finish",
    care: "Keep dry, avoid direct sunlight.",
  },
  {
    slug: "cinnamoroll-plush-mini",
    name: "Cinnamoroll Mini Plush",
    description: "A soft little cloud buddy for your desk.",
    priceCents: 2490,
    compareAtPriceCents: 2990,
    badges: ["sale"],
    createdAtMs: daysAgo(10),
    category: "plush",
    characterTags: ["cinnamoroll"],
    images: [
      { url: "https://images.unsplash.com/photo-1615486364462-ef6363ad7b1d?auto=format&fit=crop&w=1200&q=60", alt: "Plush front" },
      { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60", alt: "Plush side" },
    ],
    variants: [
      { id: "s", title: "Small", sku: "CIN-PLUSH-S", stock: 3 },
      { id: "m", title: "Medium", sku: "CIN-PLUSH-M", stock: 0 },
    ],
    maxPerCustomer: 2,
    materials: "Polyester",
    care: "Spot clean only.",
  },
  {
    slug: "kuromi-keychain",
    name: "Kuromi Keychain Charm",
    description: "A mischievous charm for bags and keys.",
    priceCents: 1290,
    badges: [],
    createdAtMs: daysAgo(20),
    category: "accessories",
    characterTags: ["kuromi"],
    images: [
      { url: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=60", alt: "Keychain front" },
      { url: "https://images.unsplash.com/photo-1517926112623-f32a800790d4?auto=format&fit=crop&w=1200&q=60", alt: "Keychain detail" },
    ],
    variants: [{ id: "default", title: "Default", sku: "KRM-KEY-01", stock: 0 }],
  },
  // a few generic products for filtering/pagination
  ...Array.from({ length: 36 }).map((_, i) => {
    const n = i + 1;
    const category = n % 3 === 0 ? "plush" : n % 3 === 1 ? "stationery" : "accessories";
    const tags = n % 2 ? ["hello-kitty"] : ["cinnamoroll"];
    return {
      slug: `kawaii-item-${n}`,
      name: `Kawaii Item ${n}`,
      description: "A cute product used for grid and filter testing.",
      priceCents: 500 + n * 37,
      badges: n % 7 === 0 ? (["new"] as ProductBadge[]) : [],
      createdAtMs: daysAgo(60 - n),
      category,
      characterTags: tags,
      images: [
        { url: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&q=60", alt: "Item image 1" },
        { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=60", alt: "Item image 2" },
      ],
      variants: [{ id: "default", title: "Default", sku: `ITEM-${n}`, stock: n % 10 === 0 ? 0 : 10 }],
    } satisfies Product;
  }),
];

export const TRENDING_SEARCH_TERMS = ["Hello Kitty", "Plush", "Stationery", "Sticker", "Keychain"];

export const SEARCH_SYNONYMS: Record<string, string> = {
  kitty: "hello kitty",
  hk: "hello kitty",
  cinna: "cinnamoroll",
  pudding: "pompompurin",
};

