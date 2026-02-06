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
  | "cutlery"
  | "cups";

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

// Character hero images
const CHARACTER_IMAGES = {
  "hello-kitty": "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&h=800&fit=crop",
  "my-melody": "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=800&h=800&fit=crop",
  "kuromi": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=800&fit=crop",
  "cinnamoroll": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=800&fit=crop",
  "pokemon": "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&h=800&fit=crop",
  "disney": "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=800&fit=crop",
  "bluey": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
  "frozen": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&h=800&fit=crop",
  "sanrio": "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=800&h=800&fit=crop",
};

// =============================================================================
// CHARACTERS - Based on GohanPals product lineup
// =============================================================================

export const SAMPLE_CHARACTERS: Character[] = [
  {
    slug: "pokemon",
    name: "Pokémon",
    nameJp: "ポケモン",
    type: "main",
    hexColor: "#FFCB05",
    interests: ["Catching 'em all", "Battles", "Adventure"],
    bio: "Join Pikachu and friends on your lunch adventures! From Pikachu to Eevee, these beloved pocket monsters make every meal more fun.",
    heroImage: CHARACTER_IMAGES["pokemon"],
    friends: [],
  },
  {
    slug: "kuromi",
    name: "Kuromi",
    nameJp: "クロミ",
    type: "main",
    hexColor: "#2D2D2D",
    birthday: "October 31",
    interests: ["Writing in diary", "Romantic novels", "Tricycles"],
    bio: "Kuromi is My Melody's mischievous rival with a heart of gold. With her signature black jester hood and punk rock attitude, she's the coolest Sanrio character around!",
    heroImage: CHARACTER_IMAGES["kuromi"],
    friends: ["my-melody", "cinnamoroll"],
  },
  {
    slug: "cinnamoroll",
    name: "Cinnamoroll",
    nameJp: "シナモロール",
    type: "main",
    hexColor: "#7EC8E3",
    birthday: "March 6",
    interests: ["Flying with ears", "Napping on clouds", "Cinnamon rolls"],
    bio: "Cinnamoroll is an adorable white puppy who can fly using his big ears! He was found on a cloud and loves hanging out at Café Cinnamon.",
    heroImage: CHARACTER_IMAGES["cinnamoroll"],
    friends: ["kuromi", "hello-kitty"],
  },
  {
    slug: "bluey",
    name: "Bluey",
    nameJp: "ブルーイ",
    type: "main",
    hexColor: "#4FA4D9",
    interests: ["Imaginative games", "Playing with Bingo", "Adventures"],
    bio: "Bluey is a loveable, inexhaustible six-year-old Blue Heeler dog. She loves to play and turns everyday family life into extraordinary adventures!",
    heroImage: CHARACTER_IMAGES["bluey"],
    friends: [],
  },
  {
    slug: "disney-princess",
    name: "Disney Princess",
    nameJp: "ディズニープリンセス",
    type: "main",
    hexColor: "#E91E8C",
    interests: ["Dreams", "Adventure", "Magic"],
    bio: "The Disney Princesses including Ariel, Rapunzel, Belle, Cinderella and more! Each princess brings her own magic to every meal.",
    heroImage: CHARACTER_IMAGES["disney"],
    friends: ["frozen"],
  },
  {
    slug: "frozen",
    name: "Frozen",
    nameJp: "アナと雪の女王",
    type: "main",
    hexColor: "#74D3F7",
    interests: ["Ice magic", "Sisterly love", "Adventure"],
    bio: "Elsa the Snow Queen and her sister Anna from the magical kingdom of Arendelle. Let it go with these enchanting designs!",
    heroImage: CHARACTER_IMAGES["frozen"],
    friends: ["disney-princess"],
  },
  {
    slug: "sanrio",
    name: "Sanrio Characters",
    nameJp: "サンリオキャラクターズ",
    type: "main",
    hexColor: "#FF6B98",
    interests: ["Friendship", "Kawaii culture", "Making everyone smile"],
    bio: "All your favorite Sanrio friends together! Hello Kitty, My Melody, Kuromi, Cinnamoroll and more in adorable mix designs.",
    heroImage: CHARACTER_IMAGES["sanrio"],
    friends: ["kuromi", "cinnamoroll"],
  },
];

// =============================================================================
// PRODUCTS - GohanPals real products with Shopify CDN images
// =============================================================================

function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

// =============================================================================
// PRODUCT CATEGORIES
// =============================================================================

export const PRODUCT_CATEGORIES = [
  { slug: "lunch-boxes", name: "Lunch Boxes", nameJp: "弁当箱", emoji: "🍱", color: "bg-pink-50" },
  { slug: "bottles", name: "Bottles", nameJp: "ボトル", emoji: "🧴", color: "bg-blue-50" },
  { slug: "bags", name: "Lunch Bags", nameJp: "ランチバッグ", emoji: "👜", color: "bg-purple-50" },
  { slug: "cutlery", name: "Cutlery", nameJp: "カトラリー", emoji: "🥢", color: "bg-green-50" },
  { slug: "cups", name: "Cups", nameJp: "コップ", emoji: "🥤", color: "bg-yellow-50" },
  { slug: "kitchen", name: "Kitchen", nameJp: "キッチン", emoji: "🍳", color: "bg-orange-50" },
  { slug: "storage", name: "Storage", nameJp: "収納", emoji: "📦", color: "bg-teal-50" },
  { slug: "towels", name: "Towels", nameJp: "タオル", emoji: "🧺", color: "bg-rose-50" },
];

// =============================================================================
// SEARCH DATA
// =============================================================================

export const TRENDING_SEARCH_TERMS = [
  "Pikachu",
  "Kuromi",
  "Bento Box",
  "Bluey",
  "Disney Princess",
  "Cinnamoroll",
  "Water Bottle",
  "Lunch Bag",
];

export const SEARCH_SYNONYMS: Record<string, string> = {
  kitty: "hello kitty",
  pika: "pikachu",
  pokemon: "pokémon",
  elsa: "frozen",
  bento: "bento box",
};

export const SAMPLE_PRODUCTS: Product[] = [
  // =========================================================================
  // POKEMON PRODUCTS
  // =========================================================================
  {
    slug: "pikachu-lunch-bag",
    name: "Pikachu Lunch Bag",
    nameJp: "ピカチュウ ランチバッグ",
    description: "Keep lunch cool with this adorable Pikachu Lunch Bag! This super cute sweat-fabric lunch bag is shaped like Pikachu's face! Insulated lining keeps food at the right temperature.",
    priceCents: 4795,
    badges: ["popular"],
    createdAtMs: daysAgo(3),
    category: "bags",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/000000012522_fYA1KkB.jpg?v=1765367194", alt: "Pikachu Lunch Bag" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/000000012522_1_SyRs8ak.avif?v=1766914416", alt: "Pikachu Lunch Bag inside view" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1_000000012522.avif?v=1766914416", alt: "Pikachu Lunch Bag detail" },
    ],
    variants: [{ id: "47665763549409", title: "Default", sku: "GP-POKE-BAG-DIECUT", stock: 15 }],
    features: ["Adorable Pikachu face die-cut shape", "Soft sweat fabric exterior", "Insulated aluminium lining", "Drawstring closure", "Fits most bento boxes up to 650ml", "Easy to clean - wipe inside"],
  },
  {
    slug: "pikachu-4-point-lock-lunch-box",
    name: "Pikachu 4-Point Lock Lunch Box",
    nameJp: "ピカチュウ 4点ロック弁当箱",
    description: "Secure your lunch with this 4-Point Lock Pikachu Bento Box! This large capacity bento features a secure 4-point locking system - no leaks, no spills!",
    priceCents: 2895,
    badges: ["new"],
    createdAtMs: daysAgo(1),
    category: "lunch-boxes",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/000000008664_wI72jwW.avif?v=1766917962", alt: "Pikachu 4-Point Lock Lunch Box" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/000000008664_1_aXBfqeS.avif?v=1766917962", alt: "Pikachu Lunch Box open view" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/Pikachu4-lockLunchBox_be19c001-a152-47cc-96ff-96785c2fa7ef.png?v=1766979776", alt: "Pikachu Lunch Box features" },
    ],
    variants: [{ id: "47665763123425", title: "650ml", sku: "GP-POKE-4LOCK-650", stock: 20 }],
    capacity: "650ml",
    features: ["4-point lock system - completely leak-proof", "Antibacterial coating - AG+ silver ions", "Cute Pikachu Face design", "Microwave safe (remove lid)", "Dishwasher safe", "Made in Japan", "Includes movable divider"],
  },
  {
    slug: "pikachu-monster-ball-lunch-box",
    name: "Pikachu Monster Ball Lunch Box",
    nameJp: "モンスターボール ランチボックス",
    description: "Catch 'em all with this awesome Pokéball Lunch Box by Skater Japan! Every Pokémon trainer needs this iconic Monster Ball bento box! The unique round design looks just like a real Pokéball.",
    priceCents: 2995,
    badges: ["popular"],
    createdAtMs: daysAgo(5),
    category: "lunch-boxes",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1.png?v=1766986339", alt: "Pikachu Monster Ball Lunch Box" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/2.png?v=1766986339", alt: "Monster Ball Lunch Box open" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/PikachuMonsterBall.png?v=1767002937", alt: "Monster Ball features" },
    ],
    variants: [{ id: "47665761714401", title: "310ml", sku: "GP-POKE-MONSTERBALL-310", stock: 18 }],
    capacity: "310ml",
    features: ["Iconic Pokéball design with Pikachu", "Secure snap-lock lid", "Dishwasher safe (top rack)", "Made in Japan", "BPA free", "Includes inner divider"],
  },
  {
    slug: "pokemon-25-antibacterial-bottle",
    name: "Pokémon 25 Antibacterial Bottle",
    nameJp: "ポケモン 抗菌ボトル 480ml",
    description: "Stay hydrated with this Pokémon Antibacterial Water Bottle! Featuring Pikachu and friends, this bottle has built-in antibacterial coating for extra hygiene protection.",
    priceCents: 2895,
    badges: [],
    createdAtMs: daysAgo(8),
    category: "bottles",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/ProductSize_3.png?v=1767341270", alt: "Pokémon Antibacterial Bottle" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/ProductSize_1.png?v=1767341270", alt: "Pokémon Bottle features" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/ProductSize_3_copy.png?v=1767342167", alt: "Pokémon Bottle size" },
    ],
    variants: [{ id: "47665762205921", title: "480ml", sku: "GP-POKE-BOTTLE-480-AB", stock: 22 }],
    capacity: "480ml",
    features: ["Antibacterial coating - AG+ silver ions", "One-touch flip-top lid", "Direct drinking spout", "Dishwasher safe", "Made in Japan", "BPA free", "Includes shoulder strap"],
  },
  {
    slug: "pokemon-training-chopsticks",
    name: "Pokémon Training Chopsticks",
    nameJp: "ポケモン トレーニング箸",
    description: "Help your little one master chopsticks with Pikachu! These fun training chopsticks make learning easy with a 2-step system - start with the holder, then graduate to regular chopsticks!",
    priceCents: 995,
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "cutlery",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/PikachuTrainingChopstick_Main.png?v=1766925689", alt: "Pokémon Training Chopsticks" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/Pikachu_Training_Chopsticks_Size.png?v=1766979219", alt: "Training Chopsticks size" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/PikachuTrainingChopsticks_Instruction.png?v=1766979350", alt: "Training Chopsticks instructions" },
    ],
    variants: [{ id: "47665762664673", title: "16.5cm", sku: "GP-POKE-CHOPSTICK-TRAIN", stock: 30 }],
    features: ["2-step training system: holder on, holder off!", "Adjustable holder that fits any", "Chopsticks length: 16.5cm", "Non-slip tips for easy food gripping", "Holder is sterilisable (boiling/microwave safe)", "Made in Japan", "Ages 2+"],
  },
  {
    slug: "pokemon-water-bottle-480ml",
    name: "Pokemon Water Bottle 480ml",
    nameJp: "ポケモン 水筒 480ml",
    description: "Stay hydrated on your Pokemon adventures! Features Pikachu and your favourite Pokemon characters with one-touch open lid and shoulder strap.",
    priceCents: 2695,
    badges: ["sold_out"],
    createdAtMs: daysAgo(15),
    category: "bottles",
    characterTags: ["pokemon"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000163462_LYQPklV.jpg?v=1765367157", alt: "Pokemon Water Bottle" },
    ],
    variants: [{ id: "47665757225185", title: "480ml", sku: "GP-POKE-BOTTLE-480", stock: 0 }],
    capacity: "480ml",
    features: ["One-touch open lid", "Shoulder strap included", "Dishwasher safe", "Lightweight for kids", "Official Pokemon licensed", "Made by Skater Japan"],
  },
  
  // =========================================================================
  // SANRIO / KUROMI / CINNAMOROLL PRODUCTS
  // =========================================================================
  {
    slug: "sanrio-characters-stainless-400ml",
    name: "Sanrio Characters Stainless 400ml",
    nameJp: "サンリオキャラクターズ ステンレスボトル 400ml",
    description: "Adorable Sanrio Stainless Steel Bottle - Mix Village Design! Featuring your favourite Sanrio characters in a beautiful village scene. Premium insulated bottle for all-day hydration.",
    priceCents: 5095,
    badges: ["popular"],
    createdAtMs: daysAgo(4),
    category: "bottles",
    characterTags: ["sanrio"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1_585ac78b-69aa-4029-bbb1-606b3c1823a4.png?v=1767364401", alt: "Sanrio Characters Stainless Bottle" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/2_78779b6a-5e55-4fd2-8943-a62153dac76e.png?v=1767364402", alt: "Sanrio Bottle back view" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/3_79db6c56-f812-48f2-b35e-8e84c34886c7.png?v=1767364401", alt: "Sanrio Bottle detail" },
    ],
    variants: [{ id: "47665762894049", title: "400ml", sku: "GP-SANRIO-SS-400", stock: 12 }],
    capacity: "400ml",
    features: ["Double-wall vacuum insulation", "Keeps drinks cold for 6+ hours", "Features Hello Kitty, My Melody, Kuromi & friends", "Screw-top lid with cup", "Made in Japan - premium quality", "Lightweight stainless steel", "Compact design fits in bags"],
  },
  {
    slug: "kuromi-dome-bento-box-450ml",
    name: "Kuromi Dome Bento Box 450ml",
    nameJp: "クロミ ドーム弁当箱 450ml",
    description: "For fans of Sanrio's coolest character! Kuromi is the mischievous rival of My Melody - perfect for those who love a bit of edge with their kawaii.",
    priceCents: 1995,
    compareAtPriceCents: 2495,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(12),
    category: "lunch-boxes",
    characterTags: ["kuromi"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000134002_1VCVsYn.jpg?v=1765367163", alt: "Kuromi Dome Bento Box" },
    ],
    variants: [{ id: "47665758142689", title: "450ml", sku: "GP-KUROMI-BENTO-450", stock: 0 }],
    capacity: "450ml",
    features: ["Dome lid design", "Antibacterial coating", "Dishwasher safe", "Microwave safe (remove lid)", "Official Sanrio licensed", "Made in Japan by Skater"],
  },
  {
    slug: "kuromi-stainless-steel-bottle-600ml",
    name: "Kuromi Stainless Steel Bottle 600ml",
    nameJp: "クロミ ステンレスボトル 600ml",
    description: "The ultimate Kuromi bottle for true fans! Large capacity premium stainless steel bottle with stunning Kuromi design.",
    priceCents: 4695,
    compareAtPriceCents: 5495,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(20),
    category: "bottles",
    characterTags: ["kuromi"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000145922_uAWmQyd.jpg?v=1765367165", alt: "Kuromi Stainless Steel Bottle" },
    ],
    variants: [{ id: "47665758765281", title: "600ml", sku: "GP-KUROMI-SS-600", stock: 0 }],
    capacity: "600ml",
    features: ["Double-wall vacuum insulation", "Keeps drinks cold 8+ hours", "One-push open mechanism", "Shoulder strap included", "Premium Sanrio licensed", "Made by Skater Japan"],
  },
  {
    slug: "cinnamoroll-2-tier-bento-box-600ml",
    name: "Cinnamoroll 2-Tier Bento Box 600ml",
    nameJp: "シナモロール 2段弁当箱 600ml",
    description: "Double the space, double the cute! Two-tier design for bigger appetites or separating different foods.",
    priceCents: 3095,
    compareAtPriceCents: 3495,
    badges: ["sale"],
    createdAtMs: daysAgo(7),
    category: "lunch-boxes",
    characterTags: ["cinnamoroll"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/2_58729ed0-5390-4d25-bb3c-0dc1138c54ff.png?v=1767356606", alt: "Cinnamoroll 2-Tier Bento Box" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/3_700c1532-5361-4b2e-82ff-62780217926c.png?v=1767356606", alt: "Cinnamoroll Bento open view" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1_1d1fa787-c2c3-4bf5-b93a-186d39aafc8a.png?v=1767356606", alt: "Cinnamoroll Bento stacked" },
    ],
    variants: [{ id: "47665760141537", title: "600ml", sku: "GP-CINNA-2TIER-600", stock: 16 }],
    capacity: "600ml total (230ml + 370ml)",
    features: ["Stackable 2-tier design", "Compact when nested", "Fork included", "Antibacterial coating", "Microwave safe", "Official Sanrio licensed", "Made in Japan"],
  },
  {
    slug: "cinnamoroll-dome-bento-box-360ml",
    name: "Cinnamoroll Dome Bento Box 360ml",
    nameJp: "シナモロール ドーム弁当箱 360ml",
    description: "The cutest bento for Cinnamoroll fans! Cinnamoroll is Sanrio's adorable white puppy with long ears - perfect for lovers of cute aesthetic.",
    priceCents: 2795,
    badges: [],
    createdAtMs: daysAgo(10),
    category: "lunch-boxes",
    characterTags: ["cinnamoroll"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1_94987971-3b12-4b19-ad2b-7ef1f811f523.png?v=1767355303", alt: "Cinnamoroll Dome Bento Box" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/2_8ef71061-1f3f-4a4a-9e0e-a4b1e7a9e3e7.png?v=1767355303", alt: "Cinnamoroll Bento inside" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/3_9ff1c8fd-86fc-4244-9f55-3061926c50b2.png?v=1767355303", alt: "Cinnamoroll Bento closed" },
    ],
    variants: [{ id: "47665759715553", title: "360ml", sku: "GP-CINNA-BENTO-360", stock: 14 }],
    capacity: "360ml",
    features: ["Dome lid design", "Antibacterial coating", "Dishwasher safe", "Microwave safe (remove lid)", "Official Sanrio licensed", "Made in Japan"],
  },

  // =========================================================================
  // DISNEY PRINCESS PRODUCTS
  // =========================================================================
  {
    slug: "disney-princess-bento-box-370ml",
    name: "Disney Princess Bento Box 370ml",
    nameJp: "ディズニープリンセス アルミ弁当箱 370ml",
    description: "Make lunchtime magical with this Disney Princess Aluminium Bento Box! Featuring beloved princesses including Ariel, Rapunzel, and more! The premium aluminium construction keeps food fresh and cool.",
    priceCents: 4295,
    badges: ["popular"],
    createdAtMs: daysAgo(6),
    category: "lunch-boxes",
    characterTags: ["disney-princess"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/3_594a50d5-3636-44e6-995f-2e7e5bac7b54.png?v=1767415125", alt: "Disney Princess Bento Box" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/1_b7ae318c-1f14-44eb-9414-a2990ad9c986.png?v=1767415125", alt: "Disney Princess Bento inside" },
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/2_0bc526cf-23c3-48cd-81ed-48e02b36997f.png?v=1767415125", alt: "Disney Princess Bento artwork" },
    ],
    variants: [{ id: "47665761943777", title: "370ml", sku: "GP-PRINCESS-ALUM-370", stock: 10 }],
    capacity: "370ml",
    materials: "Premium aluminium",
    features: ["Premium aluminium body - keeps food cool", "Beautiful Disney Princess artwork", "Secure elastic band closure", "Made in Japan - superior quality", "Includes removable divider", "Easy to clean"],
  },
  {
    slug: "disney-princess-dome-bento-box-360ml",
    name: "Disney Princess Dome Bento Box 360ml",
    nameJp: "ディズニープリンセス ドーム弁当箱 360ml",
    description: "Lunch fit for a princess! Features beloved Disney Princesses including Ariel, Rapunzel, Belle, and Cinderella.",
    priceCents: 2795,
    badges: ["sold_out"],
    createdAtMs: daysAgo(18),
    category: "lunch-boxes",
    characterTags: ["disney-princess"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000161192_6XqBvyF.jpg?v=1765367159", alt: "Disney Princess Dome Bento Box" },
    ],
    variants: [{ id: "47665757454561", title: "360ml", sku: "GP-PRINCESS-BENTO-360", stock: 0 }],
    capacity: "360ml",
    features: ["Dome lid protects delicate foods", "Antibacterial coating", "Dishwasher safe", "Microwave safe (remove lid)", "Includes divider", "Made in Japan by Skater"],
  },
  {
    slug: "disney-princess-stainless-steel-bottle-470ml",
    name: "Disney Princess Stainless Steel Bottle 470ml",
    nameJp: "ディズニープリンセス ステンレスボトル 470ml",
    description: "Premium insulated bottle for your little princess! Keep drinks ice cold for hours with this beautiful stainless steel bottle.",
    priceCents: 6695,
    badges: ["sold_out"],
    createdAtMs: daysAgo(25),
    category: "bottles",
    characterTags: ["disney-princess"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000167312_5ffpG4W.jpg?v=1765367161", alt: "Disney Princess Stainless Steel Bottle" },
    ],
    variants: [{ id: "47665757683937", title: "470ml", sku: "GP-PRINCESS-SS-470", stock: 0 }],
    capacity: "470ml",
    features: ["Double-wall vacuum insulation", "Keeps drinks cold up to 6 hours", "One-touch open mechanism", "Shoulder strap included", "Premium quality finish", "Made by Skater Japan"],
  },
  {
    slug: "disney-princess-trio-cutlery-set",
    name: "Disney Princess Trio Cutlery Set",
    nameJp: "ディズニープリンセス トリオセット",
    description: "Dine like royalty with this Disney Princess cutlery set! Includes fork, spoon, chopsticks, and slide-open carry case.",
    priceCents: 1595,
    badges: ["sold_out"],
    createdAtMs: daysAgo(22),
    category: "cutlery",
    characterTags: ["disney-princess"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000161202_BqM3hra.jpg?v=1765367162", alt: "Disney Princess Trio Cutlery Set" },
    ],
    variants: [{ id: "47665757913313", title: "Default", sku: "GP-PRINCESS-CUTLERY", stock: 0 }],
    features: ["Fork, Spoon, Chopsticks included", "Slide-open carry case", "Dishwasher safe", "Perfect for school lunches", "Kid-friendly sizes", "Made in Japan"],
  },

  // =========================================================================
  // FROZEN PRODUCTS
  // =========================================================================
  {
    slug: "frozen-elsa-stainless-470ml",
    name: "Frozen Elsa Stainless 470ml",
    nameJp: "アナと雪の女王 エルサ ステンレスボトル 470ml",
    description: "Let it go with this stunning Frozen Elsa Stainless Steel Bottle! Premium insulated bottle featuring Elsa from Frozen. Keeps drinks cold for up to 6 hours!",
    priceCents: 7295,
    badges: ["new"],
    createdAtMs: daysAgo(2),
    category: "bottles",
    characterTags: ["frozen"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000167272_JvAcSoM.jpg?v=1765367189", alt: "Frozen Elsa Stainless Bottle" },
    ],
    variants: [{ id: "47665762435297", title: "470ml", sku: "GP-FROZEN-SS-470", stock: 8 }],
    capacity: "470ml",
    features: ["Double-wall vacuum insulation", "Keeps drinks cold for 6+ hours", "One-touch flip-top lid with lock", "Direct drinking spout", "Made in Japan - premium quality", "Includes removable shoulder strap", "Lightweight design"],
  },

  // =========================================================================
  // BLUEY PRODUCTS
  // =========================================================================
  {
    slug: "bluey-dome-bento-box-360ml",
    name: "Bluey Dome Bento Box 360ml",
    nameJp: "ブルーイ ドーム弁当箱 360ml",
    description: "Authentic Japanese-made Bluey bento box by Skater Japan! Your little one will love showing off Bluey and Bingo at lunchtime! Perfect for kindy and school lunches.",
    priceCents: 1995,
    compareAtPriceCents: 2495,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(14),
    category: "lunch-boxes",
    characterTags: ["bluey"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000166042_HhfkZ26.jpg?v=1765367150", alt: "Bluey Dome Bento Box" },
    ],
    variants: [{ id: "47665755881697", title: "360ml", sku: "GP-BLUEY-BENTO-360", stock: 0 }],
    capacity: "360ml",
    features: ["Dome lid keeps food from getting squashed", "Dishwasher safe", "Microwave safe (remove lid)", "Made in Japan - superior quality", "BPA free & antibacterial coating", "Includes divider"],
  },
  {
    slug: "bluey-water-bottle-480ml",
    name: "Bluey Water Bottle 480ml",
    nameJp: "ブルーイ 水筒 480ml",
    description: "Keep your little one hydrated with this adorable Bluey water bottle! Features Bluey and Bingo in a fun design kids will love.",
    priceCents: 2195,
    compareAtPriceCents: 2695,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(16),
    category: "bottles",
    characterTags: ["bluey"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000166032_8XmYdK5.jpg?v=1765367152", alt: "Bluey Water Bottle" },
    ],
    variants: [{ id: "47665756307681", title: "480ml", sku: "GP-BLUEY-BOTTLE-480", stock: 0 }],
    capacity: "480ml",
    features: ["One-touch push button opening", "Includes adjustable shoulder strap", "Dishwasher safe", "Lightweight plastic - easy for small hands", "Wide mouth for easy filling & ice cubes", "Made by Skater Japan"],
  },
  {
    slug: "bluey-trio-cutlery-set",
    name: "Bluey Trio Cutlery Set",
    nameJp: "ブルーイ トリオセット",
    description: "Complete cutlery set featuring Bluey and Bingo! Everything your child needs for lunch in one convenient case.",
    priceCents: 1595,
    compareAtPriceCents: 1995,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(17),
    category: "cutlery",
    characterTags: ["bluey"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000166062_Ij6s66m.jpg?v=1765367153", alt: "Bluey Trio Cutlery Set" },
    ],
    variants: [{ id: "47665756537057", title: "Default", sku: "GP-BLUEY-CUTLERY", stock: 0 }],
    features: ["Fork, Spoon, Chopsticks included", "Slide-open carry case", "Dishwasher safe", "Perfect size for kids' hands", "Made in Japan by Skater"],
  },
  {
    slug: "bluey-plastic-cup-200ml",
    name: "Bluey Plastic Cup 200ml",
    nameJp: "ブルーイ プラカップ 200ml",
    description: "Adorable Bluey cup for home or school! Perfect size for little hands and small drinks.",
    priceCents: 695,
    compareAtPriceCents: 895,
    badges: ["sale", "sold_out"],
    createdAtMs: daysAgo(19),
    category: "cups",
    characterTags: ["bluey"],
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0798/6207/1521/files/0000000166022_AAWbGh6.jpg?v=1765367155", alt: "Bluey Plastic Cup" },
    ],
    variants: [{ id: "47665756766433", title: "200ml", sku: "GP-BLUEY-CUP-200", stock: 0 }],
    capacity: "200ml",
    features: ["Lightweight, durable plastic", "Dishwasher safe", "Hook hole for hanging", "Made in Japan"],
  },
];
