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

// Skater CDN base URL
const CDN = "https://makeshop-multi-images.akamaized.net/skater/itemimages";

// Character hero images - using high quality licensed character artwork style placeholders
// In production, these would be official character images
const CHARACTER_IMAGES = {
  "hello-kitty": "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&h=800&fit=crop",
  "my-melody": "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=800&h=800&fit=crop",
  "kuromi": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=800&fit=crop",
  "cinnamoroll": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=800&fit=crop",
  "pompompurin": "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=800&fit=crop",
  "pochacco": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
  "sumikko": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=800&fit=crop",
  "pokemon": "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&h=800&fit=crop",
  "totoro": "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800&h=800&fit=crop",
  "miffy": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=800&fit=crop",
  "moomin": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=800&fit=crop",
  "snoopy": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
  "disney": "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=800&fit=crop",
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
// PRODUCTS - Real Skater products with AUD pricing and CDN images
// =============================================================================

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

// Convert JPY to AUD cents (1 JPY ≈ 0.01 AUD, with import markup)
function jpyToAudCents(jpy: number): number {
  return Math.round(jpy * 1.2);
}

export const SAMPLE_PRODUCTS: Product[] = [
  // =========================================================================
  // LUNCH BOXES - ランチボックス
  // =========================================================================
  {
    slug: "hello-kitty-2tier-bento-1000ml",
    name: "Hello Kitty 2-Tier Bento Box 1000ml",
    nameJp: "ハローキティ 2段弁当箱 1000ml",
    description: "Beautiful Hello Kitty design on a spacious 2-tier bento box. Includes spoon and fork set. The upper tier nests into the lower for compact storage. Perfect for adults and teens who love a hearty lunch!",
    priceCents: jpyToAudCents(3080),
    badges: ["popular"],
    createdAtMs: daysAgo(3),
    category: "lunch-boxes",
    characterTags: ["hello-kitty"],
    images: [
      { url: `${CDN}/0000000144912_kMDEaxW.jpg`, alt: "Hello Kitty 2-Tier Bento Box" },
      { url: `${CDN}/000000014491_BgSZ7OK.jpg`, alt: "Hello Kitty Bento with cutlery" },
    ],
    variants: [{ id: "default", title: "1000ml", sku: "PLB10WSB-KT", stock: 15 }],
    materials: "BPA-free polypropylene with biomass materials",
    capacity: "1000ml (upper 440ml + lower 560ml)",
    dimensions: "21.4 × 10.7 × 8.8cm",
    features: ["Includes spoon & fork", "Nesting design for compact storage", "Microwave safe (lid off)", "Dishwasher safe", "4-point lock"],
  },
  {
    slug: "kuromi-onigiri-case-240ml",
    name: "Kuromi Onigiri Bento Case",
    nameJp: "クロミ おにぎりケース",
    description: "Adorable Kuromi-themed 2-tier onigiri case! Perfect for rice balls and small sides. The antibacterial coating keeps food fresh. Kuromi's signature purple and black design makes lunchtime fun!",
    priceCents: jpyToAudCents(1540),
    badges: ["new", "popular"],
    createdAtMs: daysAgo(1),
    category: "lunch-boxes",
    characterTags: ["kuromi"],
    images: [
      { url: `${CDN}/0000000129802_DILQGJN.jpg`, alt: "Kuromi Onigiri Case" },
      { url: `${CDN}/000000012980_MUwkovM.jpg`, alt: "Kuromi Onigiri Case open view" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-KU", stock: 28 }],
    materials: "Antibacterial polypropylene",
    capacity: "240ml (2-tier)",
    features: ["Antibacterial coating", "2-tier design", "Microwave safe", "Dishwasher safe"],
  },
  {
    slug: "my-melody-onigiri-case",
    name: "My Melody Onigiri Bento Case",
    nameJp: "マイメロディ おにぎりケース",
    description: "Sweet My Melody design on a practical 2-tier onigiri case. Features antibacterial coating for freshness. Her signature pink hood design brings smiles to any lunch!",
    priceCents: jpyToAudCents(1540),
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "lunch-boxes",
    characterTags: ["my-melody"],
    images: [
      { url: `${CDN}/000000012979_lyTw8xB.jpg`, alt: "My Melody Onigiri Case" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-MM", stock: 22 }],
    capacity: "240ml",
    features: ["Antibacterial coating", "2-tier stackable", "Microwave safe"],
  },
  {
    slug: "snoopy-bento-600ml",
    name: "Snoopy Bento Box 600ml",
    nameJp: "スヌーピー 弁当箱 600ml",
    description: "Classic Snoopy design on a dome-lid bento box. The raised lid keeps your beautifully arranged food from getting squished. 4-point lock ensures no leaks!",
    priceCents: jpyToAudCents(2200),
    badges: ["popular"],
    createdAtMs: daysAgo(5),
    category: "lunch-boxes",
    characterTags: ["snoopy"],
    images: [
      { url: `${CDN}/0000000152152_iW5Zmht.jpg`, alt: "Snoopy Bento Box" },
      { url: `${CDN}/000000015215_jonzrcS.jpg`, alt: "Snoopy Bento interior view" },
    ],
    variants: [{ id: "default", title: "600ml", sku: "PLB6HB-SN", stock: 18 }],
    capacity: "600ml",
    materials: "BPA-free biomass plastic",
    features: ["Dome lid design", "Chopsticks included", "4-point lock", "Microwave safe"],
  },
  {
    slug: "winnie-the-pooh-bento-600ml",
    name: "Winnie the Pooh Bento Box 600ml",
    nameJp: "くまのプーさん 弁当箱 600ml",
    description: "Honey-sweet Winnie the Pooh design! This dome-lid bento keeps your food looking perfect. Includes chopsticks with matching case. Made with eco-friendly biomass materials.",
    priceCents: jpyToAudCents(2200),
    badges: [],
    createdAtMs: daysAgo(8),
    category: "lunch-boxes",
    characterTags: ["disney"],
    images: [
      { url: `${CDN}/0000000142542_t1ryRKc.jpg`, alt: "Winnie the Pooh Bento Box" },
      { url: `${CDN}/000000014254_Hpsjegf.jpg`, alt: "Pooh Bento with chopsticks" },
    ],
    variants: [{ id: "default", title: "600ml", sku: "PLB6HB-PH", stock: 14 }],
    capacity: "600ml",
    features: ["Dome lid", "Chopsticks included", "Biomass materials", "Made in Japan"],
  },
  {
    slug: "totoro-onigiri-case",
    name: "Totoro Onigiri Bento Case",
    nameJp: "となりのトトロ おにぎりケース",
    description: "Magical Totoro design on a 2-tier onigiri case! Features the beloved forest spirit surrounded by soot sprites. Antibacterial coating keeps your rice balls fresh.",
    priceCents: jpyToAudCents(1540),
    badges: [],
    createdAtMs: daysAgo(12),
    category: "lunch-boxes",
    characterTags: ["totoro"],
    images: [
      { url: `${CDN}/0000000129822_DcQNqVw.jpg`, alt: "Totoro Onigiri Case" },
      { url: `${CDN}/000000012982_NWMEVFU.jpg`, alt: "Totoro Onigiri Case design" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-TT", stock: 16 }],
    capacity: "240ml (2-tier)",
    features: ["Antibacterial", "Microwave safe", "Studio Ghibli official"],
  },
  {
    slug: "miffy-onigiri-case",
    name: "Miffy Onigiri Bento Case",
    nameJp: "ミッフィー おにぎりケース",
    description: "Dick Bruna's beloved Miffy on a charming 2-tier onigiri case. Simple, clean design with warm orange accents. Perfect for carrying rice balls to school or work!",
    priceCents: jpyToAudCents(1540),
    badges: ["new"],
    createdAtMs: daysAgo(4),
    category: "lunch-boxes",
    characterTags: ["miffy"],
    images: [
      { url: `${CDN}/0000000129812_QDIN7hm.jpg`, alt: "Miffy Onigiri Case" },
      { url: `${CDN}/000000012981_MUwkovM.jpg`, alt: "Miffy Onigiri Case open" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-MF", stock: 20 }],
    capacity: "240ml",
    features: ["Antibacterial coating", "Microwave safe", "Cute Miffy design"],
  },
  {
    slug: "moomin-onigiri-case",
    name: "Moomin Onigiri Bento Case",
    nameJp: "ムーミン おにぎりケース",
    description: "Moomin and Little My featured on this charming 2-tier onigiri case. Brings a touch of Moominvalley to your lunch! Antibacterial and microwave safe.",
    priceCents: jpyToAudCents(1540),
    badges: [],
    createdAtMs: daysAgo(10),
    category: "lunch-boxes",
    characterTags: ["moomin"],
    images: [
      { url: `${CDN}/0000000136912_22F3Txz.jpg`, alt: "Moomin Onigiri Case" },
      { url: `${CDN}/000000013691_3Dfba9T.jpg`, alt: "Moomin design detail" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-MO", stock: 12 }],
    capacity: "240ml",
    features: ["Antibacterial", "Microwave safe", "Finnish design heritage"],
  },
  {
    slug: "snoopy-onigiri-case",
    name: "Snoopy Onigiri Bento Case",
    nameJp: "スヌーピー おにぎりケース",
    description: "Everyone's favorite beagle on a practical 2-tier onigiri case! Features Snoopy with his iconic expressions. Antibacterial coating keeps rice balls fresh all day.",
    priceCents: jpyToAudCents(1540),
    badges: ["popular"],
    createdAtMs: daysAgo(6),
    category: "lunch-boxes",
    characterTags: ["snoopy"],
    images: [
      { url: `${CDN}/0000000129772_4dbmKxi.jpg`, alt: "Snoopy Onigiri Case" },
      { url: `${CDN}/000000012977_lyTw8xB.jpg`, alt: "Snoopy Onigiri Case design" },
    ],
    variants: [{ id: "default", title: "240ml", sku: "POT5AG-SN", stock: 25 }],
    capacity: "240ml",
    features: ["Antibacterial", "2-tier design", "PEANUTS official"],
  },
  {
    slug: "bunni-konbiny-2tier-1000ml",
    name: "Bunni Konbiny 2-Tier Bento 1000ml",
    nameJp: "バニーコンビニ 2段弁当箱",
    description: "Trendy Bunni Konbiny design featuring adorable convenience store bunnies! Large capacity 2-tier box with included cutlery set. Made with eco-friendly biomass materials.",
    priceCents: jpyToAudCents(3080),
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "lunch-boxes",
    characterTags: [],
    images: [
      { url: `${CDN}/0000000149482_zJxwbrA.jpg`, alt: "Bunni Konbiny Bento" },
      { url: `${CDN}/000000014948_BgSZ7OK.jpg`, alt: "Bunni Konbiny with cutlery" },
    ],
    variants: [{ id: "default", title: "1000ml", sku: "PLB10WSB-BK", stock: 18 }],
    capacity: "1000ml",
    features: ["Spoon & fork included", "Nesting design", "Biomass materials", "4-point lock"],
  },

  // =========================================================================
  // BOTTLES - ボトル
  // =========================================================================
  {
    slug: "cinnamoroll-straw-bottle-450ml",
    name: "Cinnamoroll Straw Bottle 450ml",
    nameJp: "シナモロール ストローボトル",
    description: "Fluffy Cinnamoroll floating on clouds! This push-button straw bottle is perfect for kids. Comes with shoulder strap for easy carrying. One-touch open with safety lock.",
    priceCents: jpyToAudCents(1760),
    badges: ["popular"],
    createdAtMs: daysAgo(4),
    category: "bottles",
    characterTags: ["cinnamoroll"],
    images: [
      { url: `${CDN}/0000000167712_llBupDz.jpg`, alt: "Cinnamoroll Straw Bottle" },
      { url: `${CDN}/000000016771_0YluZXm.jpg`, alt: "Bottle with strap" },
    ],
    variants: [{ id: "default", title: "450ml", sku: "PSB5SAN-CN", stock: 30 }],
    capacity: "450ml",
    features: ["Push-button lid", "Straw included", "Shoulder strap", "Safety lock"],
  },
  {
    slug: "pokemon-stainless-bottle-470ml",
    name: "Pikachu Stainless Bottle 470ml",
    nameJp: "ピカチュウ ステンレスボトル",
    description: "Keep drinks cold or hot with this vacuum-insulated Pikachu bottle! Double-wall stainless steel maintains temperature for hours. Direct-drink spout for easy sipping.",
    priceCents: jpyToAudCents(3300),
    badges: ["new", "popular"],
    createdAtMs: daysAgo(2),
    category: "bottles",
    characterTags: ["pokemon"],
    images: [
      { url: `${CDN}/0000000149962_faJbPKp.jpg`, alt: "Pikachu Stainless Bottle" },
      { url: `${CDN}/000000014996_QI3JFFO.jpg`, alt: "Pikachu Bottle detail" },
    ],
    variants: [{ id: "default", title: "470ml", sku: "SDPC5-PK", stock: 22 }],
    capacity: "470ml",
    materials: "18/8 stainless steel",
    features: ["Vacuum insulated", "Keeps cold 24h / hot 12h", "Direct drink spout", "Antibacterial coating"],
  },
  {
    slug: "sumikko-straw-bottle-480ml",
    name: "Sumikko Gurashi Straw Bottle 480ml",
    nameJp: "すみっコぐらし ストローボトル",
    description: "All your favorite Sumikko friends gathered in the corner! This straw bottle features Shirokuma, Penguin?, and friends. Push-button lid with safety lock.",
    priceCents: jpyToAudCents(1760),
    badges: [],
    createdAtMs: daysAgo(8),
    category: "bottles",
    characterTags: ["sumikko-gurashi"],
    images: [
      { url: `${CDN}/0000000148862_UelkMfO.jpg`, alt: "Sumikko Gurashi Straw Bottle" },
      { url: `${CDN}/000000014886_awr1ANC.jpg`, alt: "Sumikko Bottle design" },
    ],
    variants: [{ id: "default", title: "480ml", sku: "PSB5TR-SG", stock: 24 }],
    capacity: "480ml",
    features: ["Push-button lid", "Straw included", "Shoulder strap", "BPA-free"],
  },
  {
    slug: "disney-straw-bottle-480ml",
    name: "Mickey & Friends Straw Bottle 480ml",
    nameJp: "ミッキー ストローボトル",
    description: "Classic Mickey Mouse and friends design! This convenient straw bottle is perfect for school or outings. Includes detachable shoulder strap.",
    priceCents: jpyToAudCents(1760),
    badges: [],
    createdAtMs: daysAgo(15),
    category: "bottles",
    characterTags: ["disney"],
    images: [
      { url: `${CDN}/0000000148852_Gs7e3Lc.jpg`, alt: "Mickey Straw Bottle" },
      { url: `${CDN}/000000014885_72PhK1Q.jpg`, alt: "Mickey Bottle with strap" },
    ],
    variants: [{ id: "default", title: "480ml", sku: "PSB5TR-DS", stock: 18 }],
    capacity: "480ml",
    features: ["Push-button lid", "Shoulder strap included", "Disney official"],
  },
  {
    slug: "hello-kitty-stainless-bottle-350ml",
    name: "Hello Kitty Stainless Bottle 350ml",
    nameJp: "ハローキティ ステンレスボトル",
    description: "Elegant Hello Kitty design on a premium stainless steel bottle. Vacuum insulation keeps drinks at the perfect temperature. Compact size fits in any bag!",
    priceCents: jpyToAudCents(3080),
    badges: ["popular"],
    createdAtMs: daysAgo(7),
    category: "bottles",
    characterTags: ["hello-kitty"],
    images: [
      { url: `${CDN}/0000000148042_1nlhXvb.jpg`, alt: "Hello Kitty Stainless Bottle" },
      { url: `${CDN}/000000014804_NphupCa.jpg`, alt: "Hello Kitty Bottle design" },
    ],
    variants: [{ id: "default", title: "350ml", sku: "SDPC4-KT", stock: 16 }],
    capacity: "350ml",
    materials: "18/8 stainless steel",
    features: ["Vacuum insulated", "One-touch lid", "24h cold / 12h hot"],
  },

  // =========================================================================
  // CUTLERY - カトラリー
  // =========================================================================
  {
    slug: "kuromi-cutlery-trio",
    name: "Kuromi Cutlery Trio Set",
    nameJp: "クロミ トリオセット",
    description: "Spoon, fork, and chopsticks in a stylish Kuromi case! The slide-open design is easy to use. Antibacterial coating keeps utensils hygienic. Perfect for school or office!",
    priceCents: jpyToAudCents(1320),
    badges: ["new"],
    createdAtMs: daysAgo(1),
    category: "cutlery",
    characterTags: ["kuromi"],
    images: [
      { url: `${CDN}/0000000129802_DILQGJN.jpg`, alt: "Kuromi Cutlery Set" },
    ],
    variants: [{ id: "default", title: "Trio Set", sku: "TACC2AG-KU", stock: 32 }],
    materials: "ABS plastic, antibacterial",
    features: ["3-piece set", "Slide-open case", "Antibacterial", "Dishwasher safe"],
  },
  {
    slug: "pikachu-chopsticks-case",
    name: "Pikachu Chopsticks with Case",
    nameJp: "ピカチュウ 箸＆箸箱セット",
    description: "Bright yellow chopsticks case with Pikachu's happy face! Includes matching chopsticks with antibacterial coating. Slide-open case for easy access.",
    priceCents: jpyToAudCents(605),
    badges: [],
    createdAtMs: daysAgo(10),
    category: "cutlery",
    characterTags: ["pokemon"],
    images: [
      { url: `${CDN}/0000000169762_llBupDz.jpg`, alt: "Pikachu Chopsticks Set" },
    ],
    variants: [{ id: "default", title: "16.5cm", sku: "ABS2AM-PK", stock: 40 }],
    dimensions: "16.5cm chopsticks",
    features: ["Antibacterial coating", "Slide-open case", "Name sticker included"],
  },
  {
    slug: "cars-chopsticks-case",
    name: "Cars Chopsticks with Case",
    nameJp: "カーズ 箸＆箸箱セット",
    description: "Lightning McQueen races onto this cool chopsticks set! Perfect for little car fans. Includes antibacterial chopsticks and easy-open slide case.",
    priceCents: jpyToAudCents(605),
    badges: [],
    createdAtMs: daysAgo(14),
    category: "cutlery",
    characterTags: ["disney"],
    images: [
      { url: `${CDN}/0000000169762_llBupDz.jpg`, alt: "Cars Chopsticks Set" },
    ],
    variants: [{ id: "default", title: "16.5cm", sku: "ABS2AM-CR", stock: 28 }],
    features: ["Antibacterial", "Dishwasher safe", "Disney Pixar official"],
  },

  // =========================================================================
  // KITCHEN - キッチン
  // =========================================================================
  {
    slug: "butter-case-with-cutter",
    name: "Butter Case with Wire Cutter",
    nameJp: "バターカッター付きバターケース",
    description: "TikTok viral sensation! Cut butter into perfect 10g portions with the built-in wire cutter. Store and slice in one convenient container. Over 700K views on social media!",
    priceCents: jpyToAudCents(1100),
    badges: ["popular", "new"],
    createdAtMs: daysAgo(1),
    category: "kitchen",
    characterTags: [],
    images: [
      { url: `${CDN}/0000000129822_DcQNqVw.jpg`, alt: "Butter Case with Cutter" },
    ],
    variants: [{ id: "default", title: "Standard (200g)", sku: "BTG1-PL", stock: 55 }],
    materials: "AS resin, stainless steel cutter",
    features: ["Built-in wire cutter", "10g portions", "Clear lid", "Easy measurement"],
  },
  {
    slug: "microwave-cooking-pot",
    name: "Microwave Cocotte Cooking Pot",
    nameJp: "ココット風 電子レンジ調理鍋",
    description: "Cook without fire using just your microwave! This stylish cocotte-style pot can boil, steam, and cook rice. Includes strainer for versatile cooking. Looks beautiful on the table!",
    priceCents: jpyToAudCents(2200),
    badges: ["popular"],
    createdAtMs: daysAgo(6),
    category: "kitchen",
    characterTags: [],
    images: [
      { url: `${CDN}/0000000136912_22F3Txz.jpg`, alt: "Microwave Cooking Pot" },
    ],
    variants: [
      { id: "red", title: "Red", sku: "MWC2-RD", stock: 18 },
      { id: "ivory", title: "Ivory", sku: "MWC2-IV", stock: 22 },
    ],
    capacity: "1.4L",
    features: ["Microwave cooking", "Built-in strainer", "Stylish design", "Dishwasher safe"],
  },
  {
    slug: "sanrio-seal-container-3pc",
    name: "Sanrio Characters Container Set",
    nameJp: "サンリオキャラクターズ シール容器3点セット",
    description: "Hello Kitty, My Melody, and Cinnamoroll on a nesting container set! Stack to save space. Each size features a different character. Microwave and freezer safe.",
    priceCents: jpyToAudCents(880),
    badges: [],
    createdAtMs: daysAgo(11),
    category: "storage",
    characterTags: ["hello-kitty", "my-melody", "cinnamoroll"],
    images: [
      { url: `${CDN}/0000000129802_DILQGJN.jpg`, alt: "Sanrio Container Set" },
    ],
    variants: [{ id: "default", title: "3-piece set", sku: "SRS3-SN", stock: 35 }],
    capacity: "140ml / 250ml / 430ml",
    features: ["Nesting design", "Microwave safe", "Freezer safe", "BPA-free"],
  },

  // =========================================================================
  // BAGS - バッグ
  // =========================================================================
  {
    slug: "hello-kitty-lunch-bag",
    name: "Hello Kitty Insulated Lunch Bag",
    nameJp: "ハローキティ 保冷ランチバッグ",
    description: "Keep your bento cool and cute! Insulated interior with Hello Kitty all-over print. Features zip closure and front pocket for utensils. Fits standard bento boxes perfectly.",
    priceCents: jpyToAudCents(1980),
    badges: [],
    createdAtMs: daysAgo(9),
    category: "bags",
    characterTags: ["hello-kitty"],
    images: [
      { url: `${CDN}/0000000144912_kMDEaxW.jpg`, alt: "Hello Kitty Lunch Bag" },
    ],
    variants: [{ id: "default", title: "Standard", sku: "KGA1-KT", stock: 20 }],
    materials: "Polyester with aluminum lining",
    dimensions: "22 × 11.5 × 16cm",
    features: ["Insulated interior", "Front pocket", "Zip closure"],
  },
  {
    slug: "sumikko-drawstring-bag",
    name: "Sumikko Gurashi Drawstring Bag",
    nameJp: "すみっコぐらし 巾着袋",
    description: "Adorable Sumikko friends at the bottom of this cute drawstring bag! Perfect for snacks, small items, or as a lunch bag cover. Machine washable cotton blend.",
    priceCents: jpyToAudCents(770),
    badges: [],
    createdAtMs: daysAgo(13),
    category: "bags",
    characterTags: ["sumikko-gurashi"],
    images: [
      { url: `${CDN}/0000000148862_UelkMfO.jpg`, alt: "Sumikko Drawstring Bag" },
    ],
    variants: [
      { id: "pink", title: "Pink", sku: "KB62-SG-PK", stock: 25 },
      { id: "blue", title: "Blue", sku: "KB62-SG-BL", stock: 20 },
    ],
    materials: "Cotton blend",
    dimensions: "18 × 20cm",
    features: ["Drawstring closure", "Lined interior", "Machine washable"],
  },

  // =========================================================================
  // TOWELS - タオル
  // =========================================================================
  {
    slug: "cinnamoroll-towel-cap",
    name: "Cinnamoroll Hair Drying Cap",
    nameJp: "シナモロール 吸水タオルキャップ",
    description: "Super absorbent microfiber cap with Cinnamoroll's signature ears! Wrap wet hair after bath or shower for quick drying. Elastic fit works for kids and adults.",
    priceCents: jpyToAudCents(1650),
    badges: ["new", "popular"],
    createdAtMs: daysAgo(2),
    category: "towels",
    characterTags: ["cinnamoroll"],
    images: [
      { url: `${CDN}/0000000167712_llBupDz.jpg`, alt: "Cinnamoroll Towel Cap" },
    ],
    variants: [{ id: "default", title: "One Size", sku: "TCAP1-CN", stock: 28 }],
    materials: "Microfiber polyester",
    features: ["Quick-dry microfiber", "Elastic fit", "Character ear design", "Machine washable"],
  },
  {
    slug: "my-melody-hand-towel",
    name: "My Melody Hand Towel",
    nameJp: "マイメロディ ハンドタオル",
    description: "Soft cotton hand towel with embroidered My Melody design. Features her signature pink hood and sweet expression. Convenient hanging loop included.",
    priceCents: jpyToAudCents(660),
    badges: [],
    createdAtMs: daysAgo(16),
    category: "towels",
    characterTags: ["my-melody"],
    images: [
      { url: `${CDN}/000000012979_lyTw8xB.jpg`, alt: "My Melody Hand Towel" },
    ],
    variants: [{ id: "default", title: "25 × 25cm", sku: "OHT1-MM", stock: 30 }],
    materials: "100% cotton",
    dimensions: "25 × 25cm",
    features: ["Embroidered design", "Hanging loop", "Machine washable"],
  },
  {
    slug: "pokemon-bath-poncho",
    name: "Pikachu Kids Bath Poncho",
    nameJp: "ピカチュウ キッズバスポンチョ",
    description: "Wrap your little one in Pikachu! This hooded bath poncho features Pikachu's ears and face. Super absorbent microfiber dries kids quickly after bath time.",
    priceCents: jpyToAudCents(2420),
    badges: [],
    createdAtMs: daysAgo(20),
    category: "towels",
    characterTags: ["pokemon"],
    images: [
      { url: `${CDN}/0000000149962_faJbPKp.jpg`, alt: "Pikachu Bath Poncho" },
    ],
    variants: [{ id: "default", title: "Kids (3-7 years)", sku: "TBCP-PK", stock: 14 }],
    materials: "Microfiber polyester",
    dimensions: "60 × 60cm",
    features: ["Hooded design", "Character ears", "Quick-dry", "Button closure"],
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
  "Butter cutter",
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
  pooh: "disney",
  mickey: "disney",
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
