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

/** Generate a placehold.co URL with pastel bg and dark text */
function ph(w: number, h: number, bg: string, text: string, label: string) {
  const bgHex = bg.replace("#", "");
  const txtHex = text.replace("#", "");
  return `https://placehold.co/${w}x${h}/${bgHex}/${txtHex}?text=${encodeURIComponent(label)}`;
}

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
    heroImage: ph(1200, 900, "#FFB6C1", "#8B4557", "Hello+Kitty"),
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
    heroImage: ph(1200, 900, "#87CEEB", "#2C5F7A", "Cinnamoroll"),
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
    heroImage: ph(1200, 900, "#E6E6FA", "#5B4E8B", "Kuromi"),
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
    heroImage: ph(1200, 900, "#FFDAB9", "#8B6841", "My+Melody"),
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
    heroImage: ph(1200, 900, "#FFE4A0", "#8B7530", "Pompompurin"),
    friends: ["cinnamoroll"],
  },
  // generate a bunch of sub-characters for paging
  ...Array.from({ length: 45 }).map((_, i) => {
    const n = i + 1;
    const color = n % 2 ? "#98D8C8" : "#E6E6FA";
    const textColor = n % 2 ? "#2D6B5E" : "#5B4E8B";
    return {
      slug: `friend-${n}`,
      name: `Friend ${n}`,
      type: "sub" as const,
      hexColor: color,
      bio: "A tiny side character with a big pastel personality.",
      heroImage: ph(1200, 900, color, textColor, `Friend+${n}`),
      friends: [],
    };
  }),
];

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

const PRODUCT_COLORS = [
  { bg: "#FFB6C1", text: "#8B4557" }, // pink
  { bg: "#87CEEB", text: "#2C5F7A" }, // sky
  { bg: "#E6E6FA", text: "#5B4E8B" }, // lavender
  { bg: "#98D8C8", text: "#2D6B5E" }, // mint
  { bg: "#FFDAB9", text: "#8B6841" }, // peach
  { bg: "#FFE4A0", text: "#8B7530" }, // gold
];

function productColor(i: number) {
  return PRODUCT_COLORS[i % PRODUCT_COLORS.length]!;
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
      { url: ph(1200, 1200, "#FFB6C1", "#8B4557", "Sticker+Pack"), alt: "Sticker pack front" },
      { url: ph(1200, 1200, "#FFD1DC", "#8B4557", "Close-up"), alt: "Sticker pack close-up" },
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
      { url: ph(1200, 1200, "#87CEEB", "#2C5F7A", "Plush+Front"), alt: "Plush front" },
      { url: ph(1200, 1200, "#A8DEFF", "#2C5F7A", "Plush+Side"), alt: "Plush side" },
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
      { url: ph(1200, 1200, "#E6E6FA", "#5B4E8B", "Keychain"), alt: "Keychain front" },
      { url: ph(1200, 1200, "#D8D8F5", "#5B4E8B", "Detail"), alt: "Keychain detail" },
    ],
    variants: [{ id: "default", title: "Default", sku: "KRM-KEY-01", stock: 0 }],
  },
  // a few generic products for filtering/pagination
  ...Array.from({ length: 36 }).map((_, i) => {
    const n = i + 1;
    const category = n % 3 === 0 ? "plush" : n % 3 === 1 ? "stationery" : "accessories";
    const tags = n % 2 ? ["hello-kitty"] : ["cinnamoroll"];
    const pc = productColor(n);
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
        { url: ph(1200, 1200, pc.bg, pc.text, `Item+${n}`), alt: "Item image 1" },
        { url: ph(1200, 1200, pc.bg, pc.text, `Item+${n}+B`), alt: "Item image 2" },
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
