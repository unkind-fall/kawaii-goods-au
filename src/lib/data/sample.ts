export type CharacterType = "main" | "sub";

export type Character = {
  slug: string;
  name: string;
  nameJp?: string;
  type: CharacterType;
  hexColor: string;
  birthday?: string;
  interests?: string[];
  bio: string;
  heroImage: string;
  friends: string[];
};

export type ProductBadge = "new" | "sale" | "sold_out" | "popular";

export type ProductCategory = 
  | "lunch-boxes"
  | "bottles"
  | "kitchen"
  | "storage"
  | "bags"
  | "towels"
  | "cutlery";

export type Product = {
  slug: string;
  name: string;
  nameJp?: string;
  description: string;
  priceCents: number;
  compareAtPriceCents?: number;
  badges: ProductBadge[];
  createdAtMs: number;
  category: ProductCategory;
  characterTags: string[];
  images: { url: string; alt: string }[];
  variants: { id: string; title: string; sku: string; priceCents?: number; stock: number }[];
  materials?: string;
  capacity?: string;
  dimensions?: string;
  features?: string[];
};

// Placeholder with kawaii colors
function ph(w: number, h: number, bg: string, text: string, label: string) {
  const bgHex = bg.replace("#", "");
  const txtHex = text.replace("#", "");
  return `https://placehold.co/${w}x${h}/${bgHex}/${txtHex}?text=${encodeURIComponent(label)}`;
}

// Character images from official sources (using colorful placeholders for now)
const CHARACTER_IMAGES = {
  "hello-kitty": ph(800, 800, "FFB6C1", "FFFFFF", "🎀"),
  "my-melody": ph(800, 800, "FFB6C1", "FFFFFF", "🐰"),
  "kuromi": ph(800, 800, "9370DB", "FFFFFF", "💜"),
  "cinnamoroll": ph(800, 800, "87CEEB", "FFFFFF", "☁️"),
  "pompompurin": ph(800, 800, "FFD700", "FFFFFF", "🍮"),
  "pochacco": ph(800, 800, "98D8C8", "FFFFFF", "🐕"),
  "sumikko": ph(800, 800, "98D8C8", "FFFFFF", "🧸"),
  "pokemon": ph(800, 800, "FFD700", "FFFFFF", "⚡"),
  "totoro": ph(800, 800, "708090", "FFFFFF", "🌳"),
  "miffy": ph(800, 800, "FF6B35", "FFFFFF", "🐰"),
  "moomin": ph(800, 800, "87CEEB", "FFFFFF", "🏔️"),
  "snoopy": ph(800, 800, "F5F5DC", "333333", "🐕"),
  "disney": ph(800, 800, "4169E1", "FFFFFF", "🏰"),
};

// =============================================================================
// CHARACTERS - Based on Skater's licensed character lineup
// =============================================================================

export const SAMPLE_CHARACTERS: Character[] = [
  {
    slug: "hello-kitty",
    name: "Hello Kitty",
    nameJp: "ハローキティ",
    type: "main",
    hexColor: "#FFB6C1",
    birthday: "November 1",
    interests: ["Baking cookies", "Making friends", "Playing piano"],
    bio: "Hello Kitty is a cheerful girl with a heart of gold. She loves baking cookies and making new friends. With her signature red bow, she brings joy wherever she goes!",
    heroImage: CHARACTER_IMAGES["hello-kitty"],
    friends: ["my-melody", "kuromi", "cinnamoroll"],
  },
  {
    slug: "my-melody",
    name: "My Melody",
    nameJp: "マイメロディ",
    type: "main",
    hexColor: "#FFB6C1",
    birthday: "January 18",
    interests: ["Baking", "Picking flowers", "Dreaming"],
    bio: "My Melody is a sweet rabbit from Mariland Forest. She always wears her pink hood and loves spending time with her friends.",
    heroImage: CHARACTER_IMAGES["my-melody"],
    friends: ["hello-kitty", "kuromi"],
  },
  {
    slug: "kuromi",
    name: "Kuromi",
    nameJp: "クロミ",
    type: "main",
    hexColor: "#9370DB",
    birthday: "October 31",
    interests: ["Writing in diary", "Tough attitude", "Romance novels"],
    bio: "Kuromi is My Melody's rival but secretly has a soft heart. She leads a biker gang but loves cute things and writing in her diary!",
    heroImage: CHARACTER_IMAGES["kuromi"],
    friends: ["my-melody"],
  },
  {
    slug: "cinnamoroll",
    name: "Cinnamoroll",
    nameJp: "シナモロール",
    type: "main",
    hexColor: "#87CEEB",
    birthday: "March 6",
    interests: ["Flying", "Napping on clouds", "Cinnamon rolls"],
    bio: "Cinnamoroll is a fluffy white puppy with blue eyes and a curly tail like a cinnamon roll. He can fly using his big ears!",
    heroImage: CHARACTER_IMAGES["cinnamoroll"],
    friends: ["hello-kitty", "pompompurin"],
  },
  {
    slug: "pompompurin",
    name: "Pompompurin",
    nameJp: "ポムポムプリン",
    type: "main",
    hexColor: "#FFD700",
    birthday: "April 16",
    interests: ["Pudding", "Taking naps", "Collecting shoes"],
    bio: "Pompompurin is a golden retriever who loves pudding and wears a brown beret. He's laid-back and loves to relax with friends.",
    heroImage: CHARACTER_IMAGES["pompompurin"],
    friends: ["cinnamoroll"],
  },
  {
    slug: "pochacco",
    name: "Pochacco",
    nameJp: "ポチャッコ",
    type: "main",
    hexColor: "#98D8C8",
    birthday: "February 29",
    interests: ["Playing sports", "Banana ice cream", "Adventures"],
    bio: "Pochacco is an energetic white dog with floppy black ears. He's curious and loves going on adventures with his friends!",
    heroImage: CHARACTER_IMAGES["pochacco"],
    friends: ["hello-kitty", "pompompurin"],
  },
  {
    slug: "sumikko-gurashi",
    name: "Sumikko Gurashi",
    nameJp: "すみっコぐらし",
    type: "main",
    hexColor: "#98D8C8",
    interests: ["Corners", "Being cozy", "Warm drinks"],
    bio: "The Sumikko Gurashi are shy creatures who love gathering in corners. They include Shirokuma, Penguin?, Tonkatsu, Neko, and Tokage!",
    heroImage: CHARACTER_IMAGES["sumikko"],
    friends: [],
  },
  {
    slug: "pokemon",
    name: "Pokémon",
    nameJp: "ポケモン",
    type: "main",
    hexColor: "#FFD700",
    interests: ["Battles", "Friendship", "Adventure"],
    bio: "Pokémon are wonderful creatures that live alongside humans! From Pikachu to hundreds of others, each has unique abilities.",
    heroImage: CHARACTER_IMAGES["pokemon"],
    friends: [],
  },
  {
    slug: "totoro",
    name: "My Neighbor Totoro",
    nameJp: "となりのトトロ",
    type: "main",
    hexColor: "#708090",
    interests: ["Forest", "Rain", "Sleeping"],
    bio: "Totoro is a magical forest spirit from Studio Ghibli. He's friendly, fluffy, and loves the rain!",
    heroImage: CHARACTER_IMAGES["totoro"],
    friends: [],
  },
  {
    slug: "miffy",
    name: "Miffy",
    nameJp: "ミッフィー",
    type: "main",
    hexColor: "#FF6B35",
    birthday: "June 21",
    interests: ["Drawing", "Playing", "Family time"],
    bio: "Miffy is a small white rabbit created by Dick Bruna. With simple design and warm colors, she's beloved worldwide!",
    heroImage: CHARACTER_IMAGES["miffy"],
    friends: [],
  },
  {
    slug: "moomin",
    name: "Moomin",
    nameJp: "ムーミン",
    type: "main",
    hexColor: "#87CEEB",
    interests: ["Adventures", "Moominvalley", "Friends"],
    bio: "The Moomins are hippo-like trolls from Finland. They live in Moominvalley and have many adventures with friends!",
    heroImage: CHARACTER_IMAGES["moomin"],
    friends: [],
  },
  {
    slug: "snoopy",
    name: "Snoopy",
    nameJp: "スヌーピー",
    type: "main",
    hexColor: "#F5F5DC",
    birthday: "October 4",
    interests: ["Sleeping on doghouse", "Being Joe Cool", "Writing novels"],
    bio: "Snoopy is Charlie Brown's beagle with a vivid imagination. He's a WWI flying ace, Joe Cool, and so much more!",
    heroImage: CHARACTER_IMAGES["snoopy"],
    friends: [],
  },
  {
    slug: "disney",
    name: "Disney Characters",
    nameJp: "ディズニー",
    type: "main",
    hexColor: "#4169E1",
    interests: ["Magic", "Dreams", "Adventure"],
    bio: "Disney's magical characters including Mickey, Minnie, Donald, and friends from beloved animated films!",
    heroImage: CHARACTER_IMAGES["disney"],
    friends: [],
  },
];

// =============================================================================
// PRODUCTS - Real Skater products with AUD pricing
// =============================================================================

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

// Convert JPY to AUD cents (rough rate: 1 JPY ≈ 0.01 AUD, marked up for import)
function jpyToAudCents(jpy: number): number {
  return Math.round(jpy * 1.2); // 20% markup for import costs
}

export const SAMPLE_PRODUCTS: Product[] = [
  // =========================================================================
  // LUNCH BOXES - ランチボックス
  // =========================================================================
  {
    slug: "hello-kitty-bento-600ml",
    name: "Hello Kitty Bento Box 600ml",
    nameJp: "ハローキティ 弁当箱 600ml",
    description: "Adorable Hello Kitty lunch box with dome lid that keeps your food fluffy and beautiful. Features 4-point lock for leak-proof sealing. Perfect for school or office!",
    priceCents: jpyToAudCents(2200),
    badges: ["popular"],
    createdAtMs: daysAgo(5),
    category: "lunch-boxes",
    characterTags: ["hello-kitty"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🎀+Bento"), alt: "Hello Kitty Bento Box front view" },
      { url: ph(800, 800, "FFD1DC", "FFFFFF", "Inside"), alt: "Bento box interior" },
    ],
    variants: [{ id: "default", title: "600ml", sku: "PLB6HB-KT", stock: 15 }],
    materials: "BPA-free plastic, antibacterial coating",
    capacity: "600ml",
    dimensions: "16.5 × 10.5 × 6cm",
    features: ["Dome lid design", "4-point lock", "Microwave safe (lid off)", "Dishwasher safe"],
  },
  {
    slug: "kuromi-bento-600ml",
    name: "Kuromi Bento Box 600ml",
    nameJp: "クロミ 弁当箱 600ml",
    description: "Stylish Kuromi design lunch box with her signature purple and black aesthetic. Dome lid prevents food from getting squished!",
    priceCents: jpyToAudCents(2200),
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "lunch-boxes",
    characterTags: ["kuromi"],
    images: [
      { url: ph(800, 800, "9370DB", "FFFFFF", "💜+Bento"), alt: "Kuromi Bento Box" },
      { url: ph(800, 800, "8B6BB0", "FFFFFF", "Open"), alt: "Kuromi Bento open view" },
    ],
    variants: [{ id: "default", title: "600ml", sku: "PLB6HB-KU", stock: 20 }],
    materials: "BPA-free plastic, antibacterial coating",
    capacity: "600ml",
    features: ["Dome lid design", "4-point lock", "Microwave safe (lid off)"],
  },
  {
    slug: "cinnamoroll-bento-530ml",
    name: "Cinnamoroll Fluffy Bento 530ml",
    nameJp: "シナモロール ふわっと弁当箱 530ml",
    description: "Cloud-soft Cinnamoroll design! The special dome lid keeps rice and sides looking perfect. Great for kids and adults alike.",
    priceCents: jpyToAudCents(1980),
    badges: [],
    createdAtMs: daysAgo(15),
    category: "lunch-boxes",
    characterTags: ["cinnamoroll"],
    images: [
      { url: ph(800, 800, "87CEEB", "FFFFFF", "☁️+Bento"), alt: "Cinnamoroll Bento Box" },
    ],
    variants: [{ id: "default", title: "530ml", sku: "QAF2BA-CN", stock: 12 }],
    capacity: "530ml",
    features: ["Dome lid", "Divider included", "Made in Japan"],
  },
  {
    slug: "sumikko-onigiri-case",
    name: "Sumikko Gurashi Onigiri Case",
    nameJp: "すみっコぐらし おにぎりケース",
    description: "Cute triangular case perfect for carrying onigiri! Features Sumikko characters gathering in the corner. 2-tier design holds onigiri + snacks.",
    priceCents: jpyToAudCents(1540),
    badges: ["popular"],
    createdAtMs: daysAgo(8),
    category: "lunch-boxes",
    characterTags: ["sumikko-gurashi"],
    images: [
      { url: ph(800, 800, "98D8C8", "FFFFFF", "🍙+Case"), alt: "Sumikko Onigiri Case" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-SG", stock: 25 }],
    capacity: "240ml (2-tier)",
    features: ["Antibacterial", "Microwave safe", "Stackable design"],
  },
  {
    slug: "pokemon-pikachu-bento",
    name: "Pikachu Face Bento Box",
    nameJp: "ピカチュウ フェイス弁当箱",
    description: "Pikachu's happy face makes lunchtime exciting! Antibacterial coating keeps food fresh. Perfect size for kids.",
    priceCents: jpyToAudCents(1650),
    badges: ["new"],
    createdAtMs: daysAgo(3),
    category: "lunch-boxes",
    characterTags: ["pokemon"],
    images: [
      { url: ph(800, 800, "FFD700", "333333", "⚡+Bento"), alt: "Pikachu Bento Box" },
    ],
    variants: [{ id: "default", title: "450ml", sku: "QAF2BA-PK", stock: 18 }],
    capacity: "450ml",
    features: ["Antibacterial", "Dome lid", "Food-safe materials"],
  },
  {
    slug: "totoro-2-tier-bento",
    name: "Totoro 2-Tier Bento Box",
    nameJp: "となりのトトロ 二段弁当箱",
    description: "Beautiful Mino-yaki inspired design featuring Totoro and forest friends. Two tiers for rice and sides, with elegant wood-grain pattern.",
    priceCents: jpyToAudCents(2640),
    badges: [],
    createdAtMs: daysAgo(20),
    category: "lunch-boxes",
    characterTags: ["totoro"],
    images: [
      { url: ph(800, 800, "708090", "FFFFFF", "🌳+Bento"), alt: "Totoro 2-Tier Bento" },
    ],
    variants: [{ id: "default", title: "640ml", sku: "PFLW6-TT", stock: 8 }],
    capacity: "640ml total (320ml × 2)",
    features: ["2-tier stackable", "Wood-grain lid", "Chopsticks included"],
  },
  {
    slug: "my-melody-dome-bento",
    name: "My Melody Dome Bento 530ml",
    nameJp: "マイメロディ ドーム弁当箱",
    description: "Sweet My Melody design with her pink hood! The dome lid keeps your carefully arranged bento looking beautiful until lunchtime.",
    priceCents: jpyToAudCents(1980),
    compareAtPriceCents: jpyToAudCents(2200),
    badges: ["sale"],
    createdAtMs: daysAgo(30),
    category: "lunch-boxes",
    characterTags: ["my-melody"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🐰+Bento"), alt: "My Melody Bento Box" },
    ],
    variants: [{ id: "default", title: "530ml", sku: "QAF2BA-MM", stock: 6 }],
    capacity: "530ml",
    features: ["Dome lid", "Divider included", "Microwave safe"],
  },

  // =========================================================================
  // BOTTLES - ボトル
  // =========================================================================
  {
    slug: "hello-kitty-stainless-bottle-350ml",
    name: "Hello Kitty Stainless Bottle 350ml",
    nameJp: "ハローキティ ステンレスボトル 350ml",
    description: "Keep drinks cold for 24 hours or hot for 12 hours! Adorable Hello Kitty design with vacuum insulation. One-touch open lid.",
    priceCents: jpyToAudCents(3080),
    badges: ["popular"],
    createdAtMs: daysAgo(10),
    category: "bottles",
    characterTags: ["hello-kitty"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🎀+Bottle"), alt: "Hello Kitty Stainless Bottle" },
    ],
    variants: [{ id: "default", title: "350ml", sku: "SDPC4-KT", stock: 14 }],
    capacity: "350ml",
    materials: "18/8 stainless steel, BPA-free lid",
    features: ["Vacuum insulated", "One-touch lid", "24h cold / 12h hot"],
  },
  {
    slug: "cinnamoroll-straw-bottle-450ml",
    name: "Cinnamoroll Straw Bottle 450ml",
    nameJp: "シナモロール ストローボトル 450ml",
    description: "Easy-to-use straw bottle with Cinnamoroll floating on clouds! Perfect for kids. Push-button lid with lock.",
    priceCents: jpyToAudCents(1760),
    badges: ["new"],
    createdAtMs: daysAgo(4),
    category: "bottles",
    characterTags: ["cinnamoroll"],
    images: [
      { url: ph(800, 800, "87CEEB", "FFFFFF", "☁️+Bottle"), alt: "Cinnamoroll Straw Bottle" },
    ],
    variants: [{ id: "default", title: "450ml", sku: "PSB5SAN-CN", stock: 22 }],
    capacity: "450ml",
    features: ["Push-button lid", "Straw included", "Shoulder strap"],
  },
  {
    slug: "sumikko-direct-drink-480ml",
    name: "Sumikko Gurashi Direct Drink Bottle",
    nameJp: "すみっコぐらし 直飲みボトル",
    description: "Direct-drink water bottle with all your favorite Sumikko friends! Lightweight and easy to carry. Great for school.",
    priceCents: jpyToAudCents(1540),
    badges: [],
    createdAtMs: daysAgo(12),
    category: "bottles",
    characterTags: ["sumikko-gurashi"],
    images: [
      { url: ph(800, 800, "98D8C8", "FFFFFF", "🧸+Bottle"), alt: "Sumikko Bottle" },
    ],
    variants: [{ id: "default", title: "480ml", sku: "PSB5TR-SG", stock: 30 }],
    capacity: "480ml",
    features: ["Direct drink spout", "Name tag included", "BPA-free"],
  },
  {
    slug: "pokemon-thermos-600ml",
    name: "Pokémon Thermos Bottle 600ml",
    nameJp: "ポケモン サーモス 600ml",
    description: "High-performance thermos with Pikachu and friends! Double-wall vacuum keeps drinks at perfect temperature all day.",
    priceCents: jpyToAudCents(4180),
    badges: [],
    createdAtMs: daysAgo(25),
    category: "bottles",
    characterTags: ["pokemon"],
    images: [
      { url: ph(800, 800, "FFD700", "333333", "⚡+Thermos"), alt: "Pokémon Thermos" },
    ],
    variants: [{ id: "default", title: "600ml", sku: "STGC6-PK", stock: 10 }],
    capacity: "600ml",
    features: ["Premium insulation", "Sport cap + cup", "Pouch included"],
  },
  {
    slug: "moomin-stainless-mug",
    name: "Moomin Stainless Mug 350ml",
    nameJp: "ムーミン ステンレスマグ",
    description: "Elegant Moomin design on a premium stainless mug. Perfect for coffee or tea on the go. Leak-proof screw lid.",
    priceCents: jpyToAudCents(2750),
    badges: [],
    createdAtMs: daysAgo(18),
    category: "bottles",
    characterTags: ["moomin"],
    images: [
      { url: ph(800, 800, "87CEEB", "FFFFFF", "🏔️+Mug"), alt: "Moomin Stainless Mug" },
    ],
    variants: [{ id: "default", title: "350ml", sku: "STBC3-MM", stock: 9 }],
    capacity: "350ml",
    features: ["Vacuum insulated", "Screw lid", "Wide mouth"],
  },

  // =========================================================================
  // CUTLERY & CHOPSTICKS - カトラリー
  // =========================================================================
  {
    slug: "sanrio-chopsticks-set",
    name: "Sanrio Characters Chopstick Set (10 pairs)",
    nameJp: "サンリオキャラクターズ 天削げ箸10本セット",
    description: "Mix and match your favorite characters! Each chopstick features a different Sanrio character. Choose any two to make your own pair!",
    priceCents: jpyToAudCents(2200),
    badges: ["popular"],
    createdAtMs: daysAgo(7),
    category: "cutlery",
    characterTags: ["hello-kitty", "my-melody", "kuromi", "cinnamoroll", "pompompurin"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🥢+Set"), alt: "Sanrio Chopstick Set" },
    ],
    variants: [{ id: "default", title: "10-piece set", sku: "ANT5-SN", stock: 20 }],
    materials: "Natural bamboo with character prints",
    dimensions: "21cm length",
    features: ["10 unique designs", "Mix & match", "Gift box included"],
  },
  {
    slug: "kuromi-cutlery-trio",
    name: "Kuromi Cutlery Trio Set",
    nameJp: "クロミ トリオセット",
    description: "Spoon, fork, and chopsticks in a compact Kuromi case! Slide-open design. Perfect for school or office lunch.",
    priceCents: jpyToAudCents(1320),
    badges: ["new"],
    createdAtMs: daysAgo(1),
    category: "cutlery",
    characterTags: ["kuromi"],
    images: [
      { url: ph(800, 800, "9370DB", "FFFFFF", "💜+Cutlery"), alt: "Kuromi Cutlery Set" },
    ],
    variants: [{ id: "default", title: "Trio set", sku: "TACC2AG-KU", stock: 28 }],
    materials: "ABS plastic, antibacterial",
    features: ["3-piece set", "Slide-open case", "Dishwasher safe"],
  },
  {
    slug: "totoro-wooden-spoon-fork",
    name: "Totoro Wooden Spoon & Fork Set",
    nameJp: "となりのトトロ 木製スプーン&フォーク",
    description: "Beautiful natural wood cutlery with laser-engraved Totoro design. Eco-friendly and gentle on dishes.",
    priceCents: jpyToAudCents(1650),
    badges: [],
    createdAtMs: daysAgo(22),
    category: "cutlery",
    characterTags: ["totoro"],
    images: [
      { url: ph(800, 800, "DEB887", "333333", "🌳+Spoon"), alt: "Totoro Wooden Cutlery" },
    ],
    variants: [{ id: "default", title: "2-piece set", sku: "WLSF-TT", stock: 15 }],
    materials: "Natural beech wood",
    features: ["Laser engraved", "Food-safe coating", "Hand wash recommended"],
  },
  {
    slug: "pokemon-chopsticks-case",
    name: "Pikachu Chopsticks with Case",
    nameJp: "ピカチュウ 箸＆箸箱セット",
    description: "Bright yellow case with Pikachu face! Includes matching chopsticks. Antibacterial coating for freshness.",
    priceCents: jpyToAudCents(660),
    badges: [],
    createdAtMs: daysAgo(14),
    category: "cutlery",
    characterTags: ["pokemon"],
    images: [
      { url: ph(800, 800, "FFD700", "333333", "⚡+Chopsticks"), alt: "Pikachu Chopsticks" },
    ],
    variants: [{ id: "default", title: "16.5cm", sku: "ABS2AM-PK", stock: 35 }],
    dimensions: "16.5cm chopsticks",
    features: ["Antibacterial", "Slide-open case", "Name sticker included"],
  },

  // =========================================================================
  // BAGS & POUCHES - バッグ
  // =========================================================================
  {
    slug: "hello-kitty-lunch-bag",
    name: "Hello Kitty Insulated Lunch Bag",
    nameJp: "ハローキティ 保冷ランチバッグ",
    description: "Keep your bento cool and cute! Insulated interior with Hello Kitty all-over print. Zip closure with front pocket.",
    priceCents: jpyToAudCents(1980),
    badges: [],
    createdAtMs: daysAgo(11),
    category: "bags",
    characterTags: ["hello-kitty"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🎀+Bag"), alt: "Hello Kitty Lunch Bag" },
    ],
    variants: [{ id: "default", title: "Standard", sku: "KGA1-KT", stock: 18 }],
    materials: "Polyester with aluminum lining",
    dimensions: "22 × 11.5 × 16cm",
    features: ["Insulated interior", "Front pocket", "Zip closure"],
  },
  {
    slug: "sumikko-drawstring-bag",
    name: "Sumikko Gurashi Drawstring Bag",
    nameJp: "すみっコぐらし 巾着袋",
    description: "Adorable drawstring bag with Sumikko characters at the bottom. Perfect for snacks, small items, or as a lunch bag cover!",
    priceCents: jpyToAudCents(770),
    badges: [],
    createdAtMs: daysAgo(16),
    category: "bags",
    characterTags: ["sumikko-gurashi"],
    images: [
      { url: ph(800, 800, "98D8C8", "FFFFFF", "🧸+Pouch"), alt: "Sumikko Drawstring Bag" },
    ],
    variants: [
      { id: "pink", title: "Pink", sku: "KB62-SG-PK", stock: 25 },
      { id: "blue", title: "Blue", sku: "KB62-SG-BL", stock: 20 },
    ],
    materials: "Cotton blend",
    dimensions: "18 × 20cm",
    features: ["Drawstring closure", "Lined interior", "Machine washable"],
  },
  {
    slug: "miffy-bento-pouch",
    name: "Miffy Bento Pouch",
    nameJp: "ミッフィー ランチポーチ",
    description: "Simple and cute Miffy design with orange accents. Fits standard bento boxes perfectly. Gusseted bottom for stability.",
    priceCents: jpyToAudCents(1430),
    badges: ["new"],
    createdAtMs: daysAgo(5),
    category: "bags",
    characterTags: ["miffy"],
    images: [
      { url: ph(800, 800, "FF6B35", "FFFFFF", "🐰+Pouch"), alt: "Miffy Bento Pouch" },
    ],
    variants: [{ id: "default", title: "Standard", sku: "RB3A-MF", stock: 16 }],
    materials: "Cotton canvas",
    features: ["Gusseted bottom", "Velcro closure", "Wipe-clean interior"],
  },

  // =========================================================================
  // TOWELS - タオル
  // =========================================================================
  {
    slug: "cinnamoroll-towel-cap",
    name: "Cinnamoroll Hair Drying Cap",
    nameJp: "シナモロール 吸水タオルキャップ",
    description: "Super absorbent microfiber cap with Cinnamoroll ears! Wraps wet hair after bath or shower. Quick-dry material.",
    priceCents: jpyToAudCents(1650),
    badges: ["new", "popular"],
    createdAtMs: daysAgo(3),
    category: "towels",
    characterTags: ["cinnamoroll"],
    images: [
      { url: ph(800, 800, "87CEEB", "FFFFFF", "☁️+Towel"), alt: "Cinnamoroll Towel Cap" },
    ],
    variants: [{ id: "default", title: "One size", sku: "TCAP1-CN", stock: 30 }],
    materials: "Microfiber polyester",
    features: ["Quick-dry", "Elastic fit", "Character ears design"],
  },
  {
    slug: "hello-kitty-hand-towel",
    name: "Hello Kitty Hand Towel Set",
    nameJp: "ハローキティ ハンドタオル",
    description: "Soft cotton hand towels with Hello Kitty embroidery. Set of 3 colors: pink, white, and red. Loop for hanging.",
    priceCents: jpyToAudCents(1320),
    badges: [],
    createdAtMs: daysAgo(19),
    category: "towels",
    characterTags: ["hello-kitty"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🎀+Towels"), alt: "Hello Kitty Hand Towels" },
    ],
    variants: [{ id: "default", title: "3-piece set", sku: "OHT1-KT", stock: 22 }],
    materials: "100% cotton",
    dimensions: "25 × 25cm each",
    features: ["3 colors", "Embroidered design", "Hanging loop"],
  },
  {
    slug: "snoopy-bath-poncho",
    name: "Snoopy Kids Bath Poncho",
    nameJp: "スヌーピー キッズバスポンチョ",
    description: "Wrap your little one in Snoopy! Hooded bath poncho with cute ear details. Super absorbent microfiber.",
    priceCents: jpyToAudCents(2420),
    badges: [],
    createdAtMs: daysAgo(28),
    category: "towels",
    characterTags: ["snoopy"],
    images: [
      { url: ph(800, 800, "F5F5DC", "333333", "🐕+Poncho"), alt: "Snoopy Bath Poncho" },
    ],
    variants: [{ id: "default", title: "Kids (3-7 years)", sku: "TBCP-SN", stock: 12 }],
    materials: "Microfiber polyester",
    dimensions: "60 × 60cm",
    features: ["Hooded design", "Button closure", "Quick-dry"],
  },

  // =========================================================================
  // KITCHEN - キッチン
  // =========================================================================
  {
    slug: "hello-kitty-enamel-kettle",
    name: "Hello Kitty Enamel Kettle",
    nameJp: "ハローキティ ホーロー ケトル",
    description: "Beautiful white enamel kettle with Hello Kitty and Tiny Chum design. Wooden handle for heat protection. Classic kawaii kitchen essential!",
    priceCents: jpyToAudCents(4950),
    badges: ["popular"],
    createdAtMs: daysAgo(9),
    category: "kitchen",
    characterTags: ["hello-kitty"],
    images: [
      { url: ph(800, 800, "FFFFFF", "333333", "🎀+Kettle"), alt: "Hello Kitty Enamel Kettle" },
    ],
    variants: [{ id: "default", title: "1.5L", sku: "ENKO-KT", stock: 7 }],
    capacity: "1.5L",
    materials: "Enamel-coated steel, wooden handle",
    features: ["Enamel coating", "Wooden handle", "IH compatible"],
  },
  {
    slug: "moomin-multipot",
    name: "Moomin Multi-Cooking Pot",
    nameJp: "ムーミン マルチポット",
    description: "Versatile pot featuring Moomin characters! Cook, boil, steam - all in one. Glass lid lets you watch your cooking.",
    priceCents: jpyToAudCents(3850),
    badges: [],
    createdAtMs: daysAgo(24),
    category: "kitchen",
    characterTags: ["moomin"],
    images: [
      { url: ph(800, 800, "87CEEB", "FFFFFF", "🏔️+Pot"), alt: "Moomin Multi Pot" },
    ],
    variants: [{ id: "default", title: "2.2L", sku: "MTP22-MM", stock: 11 }],
    capacity: "2.2L",
    materials: "Aluminum with non-stick coating",
    features: ["Glass lid", "Non-stick", "All heat sources"],
  },
  {
    slug: "butter-case-with-cutter",
    name: "Butter Case with Cutter",
    nameJp: "バターカッター付き バターケース",
    description: "Viral TikTok sensation! Cut butter into perfect portions with the built-in wire cutter. Store and slice in one container.",
    priceCents: jpyToAudCents(1100),
    badges: ["popular", "new"],
    createdAtMs: daysAgo(2),
    category: "kitchen",
    characterTags: [],
    images: [
      { url: ph(800, 800, "FFF8E7", "333333", "🧈+Cutter"), alt: "Butter Case with Cutter" },
    ],
    variants: [{ id: "default", title: "Standard (200g butter)", sku: "BTG1-PL", stock: 50 }],
    materials: "AS resin, stainless steel cutter",
    features: ["Built-in cutter", "10g portions", "Clear lid"],
  },
  {
    slug: "miffy-heat-board",
    name: "Miffy Kitchen Heat Board",
    nameJp: "ミッフィー 耐熱ボード",
    description: "Protect your surfaces with this cute Miffy heat board! Place hot pots and pans directly. Non-slip bottom.",
    priceCents: jpyToAudCents(1980),
    badges: [],
    createdAtMs: daysAgo(17),
    category: "kitchen",
    characterTags: ["miffy"],
    images: [
      { url: ph(800, 800, "FFFFFF", "FF6B35", "🐰+Board"), alt: "Miffy Heat Board" },
    ],
    variants: [{ id: "default", title: "Standard", sku: "HB1-MF", stock: 14 }],
    materials: "Silicone, heat resistant to 230°C",
    dimensions: "20 × 20cm",
    features: ["Heat resistant", "Non-slip", "Dishwasher safe"],
  },

  // =========================================================================
  // STORAGE - 保存容器
  // =========================================================================
  {
    slug: "sanrio-seal-container-3pc",
    name: "Sanrio Characters Container Set",
    nameJp: "サンリオキャラクターズ シール容器3点セット",
    description: "Nesting container set with Hello Kitty, My Melody, and Cinnamoroll! Stack to save space. Microwave and freezer safe.",
    priceCents: jpyToAudCents(880),
    badges: [],
    createdAtMs: daysAgo(13),
    category: "storage",
    characterTags: ["hello-kitty", "my-melody", "cinnamoroll"],
    images: [
      { url: ph(800, 800, "FFB6C1", "FFFFFF", "🎀+Container"), alt: "Sanrio Container Set" },
    ],
    variants: [{ id: "default", title: "3-piece set", sku: "SRS3-SN", stock: 40 }],
    capacity: "140ml / 250ml / 430ml",
    materials: "Polypropylene",
    features: ["Nesting design", "Microwave safe", "Freezer safe"],
  },
  {
    slug: "totoro-glass-container",
    name: "Totoro Glass Storage Container",
    nameJp: "となりのトトロ ガラス保存容器",
    description: "Premium glass container with bamboo lid featuring Totoro design. Perfect for storing snacks or displaying small items.",
    priceCents: jpyToAudCents(1650),
    badges: [],
    createdAtMs: daysAgo(21),
    category: "storage",
    characterTags: ["totoro"],
    images: [
      { url: ph(800, 800, "708090", "FFFFFF", "🌳+Glass"), alt: "Totoro Glass Container" },
    ],
    variants: [
      { id: "small", title: "Small (300ml)", sku: "GJR3-TT-S", stock: 18 },
      { id: "large", title: "Large (500ml)", sku: "GJR3-TT-L", stock: 15 },
    ],
    materials: "Borosilicate glass, bamboo lid",
    features: ["Airtight seal", "Oven safe (without lid)", "Eco-friendly"],
  },
  {
    slug: "pokemon-food-picks",
    name: "Pokémon Bento Food Picks Set",
    nameJp: "ポケモン フードピック",
    description: "Make any bento cuter with Pokémon picks! Set includes Pikachu, Eevee, Snorlax, and more. 16 picks total.",
    priceCents: jpyToAudCents(440),
    badges: ["new"],
    createdAtMs: daysAgo(6),
    category: "storage",
    characterTags: ["pokemon"],
    images: [
      { url: ph(800, 800, "FFD700", "333333", "⚡+Picks"), alt: "Pokémon Food Picks" },
    ],
    variants: [{ id: "default", title: "16-piece set", sku: "LKP3-PK", stock: 60 }],
    materials: "ABS plastic",
    features: ["16 designs", "Reusable", "Bento-safe"],
  },
  {
    slug: "disney-ice-tray",
    name: "Disney Characters Ice Tray",
    nameJp: "ディズニー シリコンアイストレー",
    description: "Make Mickey-shaped ice cubes! Silicone tray pops out ice easily. Also great for chocolate or jelly molds.",
    priceCents: jpyToAudCents(770),
    badges: [],
    createdAtMs: daysAgo(26),
    category: "storage",
    characterTags: ["disney"],
    images: [
      { url: ph(800, 800, "4169E1", "FFFFFF", "🏰+Ice"), alt: "Disney Ice Tray" },
    ],
    variants: [{ id: "default", title: "8-cube tray", sku: "SIT8-DS", stock: 28 }],
    materials: "Food-grade silicone",
    features: ["8 Mickey shapes", "Easy release", "Multi-use"],
  },
];

// =============================================================================
// SEARCH & TRENDING
// =============================================================================

export const TRENDING_SEARCH_TERMS = [
  "Hello Kitty bento",
  "Cinnamoroll bottle",
  "Kuromi",
  "Sumikko Gurashi",
  "Pikachu lunch",
  "Totoro",
  "Moomin",
];

export const SEARCH_SYNONYMS: Record<string, string> = {
  kitty: "hello kitty",
  hk: "hello kitty",
  cinna: "cinnamoroll",
  cinnamon: "cinnamoroll",
  pudding: "pompompurin",
  pom: "pompompurin",
  melody: "my melody",
  mm: "my melody",
  sumikko: "sumikko gurashi",
  ghibli: "totoro",
  pikachu: "pokemon",
  sanrio: "hello kitty",
};

// =============================================================================
// CATEGORIES FOR NAVIGATION
// =============================================================================

export const PRODUCT_CATEGORIES: { slug: ProductCategory; name: string; nameJp: string; emoji: string; color: string }[] = [
  { slug: "lunch-boxes", name: "Lunch Boxes", nameJp: "弁当箱", emoji: "🍱", color: "bg-kawaii-pink/30" },
  { slug: "bottles", name: "Bottles", nameJp: "ボトル", emoji: "🍶", color: "bg-kawaii-sky/30" },
  { slug: "cutlery", name: "Cutlery", nameJp: "カトラリー", emoji: "🥢", color: "bg-kawaii-lavender/30" },
  { slug: "bags", name: "Bags & Pouches", nameJp: "バッグ", emoji: "👜", color: "bg-kawaii-peach/30" },
  { slug: "towels", name: "Towels", nameJp: "タオル", emoji: "🧴", color: "bg-kawaii-mint/30" },
  { slug: "kitchen", name: "Kitchen", nameJp: "キッチン", emoji: "🍳", color: "bg-kawaii-cream" },
  { slug: "storage", name: "Storage", nameJp: "保存容器", emoji: "📦", color: "bg-kawaii-gold/30" },
];
