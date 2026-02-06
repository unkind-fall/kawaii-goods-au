# Kawaii Goods AU - Project Specification

## Overview
A Japanese kawaii-style e-commerce website for an Australian supplier of Japanese accessories, stationery, and character goods (primarily Sanrio products). The site targets Australian customers.

## Design Inspiration (CRITICAL)
Study these sites for the authentic Japanese "fancy goods" aesthetic:
- https://www.sanrio.co.jp/ - Sanrio official (THE gold standard)
- https://www.san-x.co.jp/ja/ - San-X (Sumikko Gurashi, Rilakkuma)
- https://www.donguri-sora.com/ - Ghibli/character goods store
- https://www.pokemoncenter-online.com/ - Pokemon Center Online
- https://www.qlia.com/collection/ - Qlia stationery

### Key Visual Elements to Replicate:
1. **Rounded everything** - Cards, buttons, images all have generous border-radius
2. **Soft color palettes** - Pastels, cream backgrounds, gentle gradients
3. **Character-centric** - Characters are heroes, not just product photos
4. **Playful typography** - Rounded fonts, mix of sizes
5. **Micro-interactions** - Bouncy hover effects, smooth transitions
6. **Grid layouts** - Complex but organized product grids
7. **Decorative elements** - Subtle patterns, stars, hearts, character mascots

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14+ App Router with OpenNext |
| Hosting | Cloudflare Pages (free tier) |
| Styling | Tailwind CSS + custom design tokens |
| Animations | Framer Motion |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle ORM |
| Testing | Vitest (Unit) + Playwright (E2E/Visual) |
| Package Manager | pnpm |

## Color Palette (suggested)
```css
--kawaii-pink: #FFB6C1;
--kawaii-cream: #FFF8E7;
--kawaii-mint: #98D8C8;
--kawaii-lavender: #E6E6FA;
--kawaii-peach: #FFDAB9;
--kawaii-sky: #87CEEB;
```

---

# Test-Driven Development Strategy (200+ Tests)

## Suite 1: Global "Kawaii" UI & Layout (30 Tests)
*Focus: The "atmosphere" is created by rounded corners, soft shadows, and specific layouts.*

### Header & Navigation
1. [E2E] Header logo centers on mobile, aligns left on desktop.
2. [E2E] "Hamburger" menu opens with a smooth spring animation (no instant jumps).
3. [Unit] Navigation links change color/icon on hover (e.g., Hello Kitty bow appears).
4. [E2E] Search bar expands on click without shifting layout (CLS 0).
5. [E2E] "Mega Menu" opens on hover for "Characters" category.
6. [E2E] Mega Menu closes when mouse leaves the hit area + 200ms buffer.
7. [Unit] Sticky header applies a drop shadow only after scrolling 50px.
8. [E2E] Language selector toggles between JP/EN (if applicable) and persists preference.

### Footer
9. [Unit] Copyright year updates dynamically.
10. [E2E] "Back to Top" button appears after 1 screen height scroll.
11. [E2E] "Back to Top" button scrolls smoothly (behavior: smooth).
12. [Unit] Social media icons have consistent padding and hover distinct colors.
13. [Unit] Newsletter signup form validates email format client-side.
14. [E2E] Newsletter success state shows a "cute" success message/mascot.

### Layout & Aesthetics
15. [Vis] Base font is Noto Sans JP (or rounded equivalent) with correct line-height (1.6+).
16. [Vis] Primary brand colors match config (e.g., Sanrio Pink #FFC0CB).
17. [Vis] All 'Card' components have rounded-xl or greater border-radius.
18. [Vis] Background patterns (dots/stripes) repeat seamlessly.
19. [E2E] 404 Page renders a random character mascot from the CMS.
20. [E2E] Mobile bottom navigation bar appears on viewports < 640px.

### Responsiveness (The "Commuter" Test)
21. [E2E] Layout shifts from 4-col to 2-col on Tablet.
22. [E2E] Layout shifts from 2-col to 1-col on Mobile.
23. [Unit] Touch targets on mobile are min 44x44px (Apple HIG).
24. [E2E] No horizontal scroll on mobile (overflow-x: hidden check).
25. [E2E] Images use sizes attribute to load small variants on mobile.
26. [Unit] "New" badges overlay correctly without obscuring product images.
27. [E2E] Modal/Popups disable background scrolling when open.
28. [E2E] Modal/Popups close on "Escape" key press.
29. [E2E] Modal/Popups close on backdrop click.
30. [Unit] Skeleton loaders match the border-radius of the final content.

---

## Suite 2: The Character System (40 Tests)
*Focus: Unlike standard e-commerce, these sites are "Wikis" for characters.*

### Character Index Page
31. [E2E] Grid renders all characters fetched from API.
32. [Unit] Clicking a character card routes to /character/[slug].
33. [Unit] Character filter (e.g., "Main", "Sub-character") updates the grid.
34. [Vis] Character cards have a "hover lift" animation (translate-y-2).
35. [Unit] Empty search results show a specific "Sad Mascot" state.
36. [E2E] Infinite scroll or "Load More" loads next batch of 20 characters.
37. [Vis] Images lazy-load with a blur placeholder.

### Character Detail Page (The "Shrine")
38. [E2E] Page title matches Character Name (SEO).
39. [Unit] "Birthday" and "Interests" fields render if data exists.
40. [Unit] "Related Friends" section renders linked character cards.
41. [Unit] "Related Products" section filters store items by character tag.
42. [Unit] "Download Wallpapers" button works (if authenticated).
43. [Unit] "Next/Prev Character" navigation links are present.
44. [Vis] Hero banner background color matches character hex code (dynamic styling).
45. [E2E] "Share" button copies specific URL with UTM params.
46. [Unit] Character description truncates at 3 lines with "Read More".
47. [Unit] "Read More" expands text without page reload.
48. [E2E] Embedded YouTube video (if any) pauses when out of viewport.
49. [Unit] Breadcrumbs show Home > Characters > [Name].
50. [E2E] Character specific "News" feed loads correct articles.

### Interactive Elements
51. [Unit] "Like" or "Vote" for character updates local count optimistically.
52. [E2E] "Like" persists to local storage (for guest users).
53. [E2E] Character "stamps" or decorative SVGs float in background.
54. [Vis] Text outlines (common in JP design) render correctly in CSS.
55. [Unit] Ruby characters (Furigana) render correctly for kids (optional).
56-70. [Vis] Visual regression tests for top 15 main characters to ensure no layout breaks on long names.

---

## Suite 3: E-Commerce Product Catalog (30 Tests)
*Focus: High density, clear prices, "New Arrival" emphasis.*

### Product Grid
71. [Unit] Product Card shows: Image, Name, Price, "New" Badge, Fav Button.
72. [Unit] Price formats correctly (¥1,000 or $10.00 AUD).
73. [Unit] "Sold Out" badge overlays and grays out image.
74. [E2E] Hovering product image swaps to 2nd image (Effect: "Quick Look").
75. [Unit] Clicking "Quick Add" opens drawer, does not navigate.
76. [E2E] Filtering by "Category" (Stationery, Plush) updates URL params.
77. [E2E] Filtering by "Price Range" updates grid.
78. [E2E] Sorting by "Newest" is default.
79. [Unit] Sorting by "Price: Low to High" reorders correctly.
80. [Unit] Pagination allows navigating to specific page numbers.

### Search Logic
81. [E2E] Search handles synonyms (e.g., "Kitty" -> "Hello Kitty").
82. [E2E] Search maintains filters (e.g., "Plush" + Search "Bear").
83. [Unit] Search bar suggests top 5 trending terms on focus.
84. [E2E] Recent search terms are saved to local history.
85. [Unit] Search result count is displayed accurately.

### Product Detail Page (PDP)
86. [Vis] Image Gallery supports swipe gestures on mobile.
87. [Unit] Image Gallery supports thumbnail clicks on desktop.
88. [Unit] Zoom lens appears on hover (desktop).
89. [Unit] Selecting "Size" variant updates price/availability.
90. [Unit] "Add to Cart" button disabled if variant not selected.
91. [E2E] "Add to Cart" triggers "flying item" animation to cart icon.
92. [Unit] Stock status (Low Stock) displays threshold logic (e.g., "Only 3 left!").
93. [Unit] SKU/Product Code is visible (for support).
94. [Unit] "Shipping Date" estimate is calculated based on current time.
95. [E2E] "Frequently Bought Together" items add multiple to cart.
96. [Unit] Accordion for "Materials/Care" starts collapsed.
97. [Unit] Reviews section renders star rating average.
98. [E2E] Clicking a review image opens a lightbox.
99. [Unit] "Restock Notification" form appears for sold-out items.
100. [Unit] Limit per customer logic (e.g., "Max 2 per person") enforces on click.

---

## Suite 4: Cart & Checkout (30 Tests)
*Focus: Trust, clarity, and payment preferences.*

### Cart Drawer/Page
101. [E2E] Cart count badge updates immediately after add.
102. [Unit] Cart items persist on page reload (localStorage or DB).
103. [Unit] Updating quantity to 0 removes item.
104. [Unit] Updating quantity updates Subtotal.
105. [Unit] "Free Shipping" progress bar updates (e.g., "$50 more for free ship").
106. [E2E] Cart drawer closes on outside click.
107. [Unit] "Out of stock" items in cart (stale session) show alert.

### Checkout Flow
108. [E2E] Guest Checkout option is available.
109. [Unit] Address validator checks Australian postal code format.
110. [Unit] Auto-fill suburb from Australian postal code.
111. [Unit] Phone number validation (Australian format).
112. [Unit] "Same as shipping" checkbox copies address to billing.
113. [E2E] Coupon code field accepts valid codes.
114. [E2E] Coupon code field rejects invalid codes with error.
115. [Unit] Shipping method selection updates Total Price.
116. [E2E] Payment Step: Credit Card form uses Stripe/PCI elements.
117. [E2E] Payment Step: Afterpay/Zip option displays for $50-$1000 orders.
118. [E2E] Order Summary is visible on all steps.
119. [E2E] "Place Order" button prevents double-click submissions.
120. [E2E] Success page displays Order ID.
121. [E2E] Success page triggers "Confetti" animation.
122. [Unit] Confirmation email is triggered (mocked).
123-130. [E2E] Edge cases: Declined card, Network timeout, Inventory seized by another user during checkout.

---

## Suite 5: User Account & "Fun" Features (20 Tests)
*Focus: Gamification (Pokemon Center style) and Loyalty.*

### Authentication
131. [E2E] Login with Email/Password works.
132. [E2E] Login with Social (Google/Apple) works.
133. [E2E] Password Reset flow sends email.
134. [Unit] Session expires after 30 days (Remember Me).

### My Page / Dashboard
135. [Unit] User can set a "Favorite Character" (changes theme).
136. [Unit] Order History lists past orders.
137. [E2E] Order Detail page shows tracking number (if shipped).
138. [Unit] Wishlist allows moving items to Cart.

### Points System
139. [Unit] Points accrue at set rate (e.g., 1%).
140. [Unit] Points can be applied at checkout slider.
141. [Unit] Points history shows earn/spend events.
142. [Unit] Birthday coupon generates on birth month.

### News/Blog
143. [Unit] News list filters by "Event", "Goods", "Campaign".
144. [Unit] Date format is DD.MM.YYYY (AU Standard).
145. [E2E] "New" badge disappears after 7 days.
146. [Unit] Related characters linked in news articles.
147. [E2E] RSS Feed/Atom is valid (for aggregators).
148-150. [Unit] Newsletter preferences, unsubscribe flow, email validation.

---

## Suite 6: Performance & Quality Assurance (20 Tests)
*Focus: These sites are heavy. Use Cloudflare & Next.js Image optimization.*

### Core Web Vitals
151. [Perf] LCP (Largest Contentful Paint) < 2.5s on 3G.
152. [Perf] CLS (Cumulative Layout Shift) < 0.1.
153. [Perf] FID (First Input Delay) < 100ms.
154. [Perf] First Load JS bundle size < 200kb.
155. [Perf] Images use WebP/AVIF formats.

### SEO & Meta
156. [Unit] All pages have canonical URLs.
157. [Unit] OpenGraph (OG) images are generated dynamically for Products.
158. [Unit] Twitter Card data is present.
159. [Unit] robots.txt allows indexing of products, blocks checkout.
160. [Unit] Structured Data (JSON-LD) for Products is valid (Price, Stock).
161. [Unit] Structured Data for Breadcrumbs is valid.

### Accessibility (A11y)
162. [A11y] All images have alt text (Characters describe appearance).
163. [A11y] Color contrast ratio > 4.5:1 for text.
164. [A11y] Focus rings are visible on keyboard navigation.
165. [A11y] Screen readers announce "Cart Updated" dynamically (aria-live).
166. [A11y] Carousel controls are focusable.

### Store Locator (Optional)
167. [Unit] "Find Store" uses Geolocation API.
168. [Unit] Map pins cluster correctly.
169. [Unit] Store detail page shows Opening Hours.
170. [Unit] QR Code generator for "Member ID" renders.

---

## Suite 7: The "San-X" Vibe Check (30 Tests)
*Focus: The specific "soft" feel that makes Japanese sites special.*

### Animations & Micro-interactions
171. [Vis] Verify all modals have "bounce" entrance animation.
172. [Vis] Verify buttons have "squish" scale effect on click (scale: 0.95).
173. [Vis] Verify page transitions fade/slide (AnimatePresence).
174. [Vis] Verify "Sparkle" effects on "Ultra Rare" items.
175. [Vis] Background parallax speed is subtle (not nauseating).
176. [Unit] Seasonal themes (Sakura, Halloween) toggle via Config.
177. [Vis] Font weight is never "Bold" (700), prefer "Medium" (500) for softness.
178. [Vis] Drop shadows are colored (e.g., light pink shadow, not black).
179. [Vis] Borders are border-2 or border-4 for cartoon look.

### Component Visual Tests
180. [Vis] Nav Icon states (default, hover, active).
181. [Vis] Footer Mascot renders correctly.
182. [Vis] Cart Empty State with cute illustration.
183. [Vis] Search Loading State with bouncing dots.
184. [Vis] Error Toast with sad mascot.
185. [Vis] Success Toast with happy mascot.
186. [Vis] Tooltip styling (rounded, soft shadow).
187. [Vis] Dropdown menu animations.
188. [Vis] Toggle Switch with smooth transition.
189. [Vis] Checkbox with custom kawaii checkmark.
190. [Vis] Radio button with filled dot animation.
191. [Vis] Input Error state (pink border, shake).
192. [Vis] Input Focus state (glow effect).
193. [Vis] Badge component (New, Sale, Limited).
194. [Vis] Avatar component with border.
195. [Vis] Divider with decorative elements.
196. [Vis] Loader spinner (not boring circles).
197. [Vis] Skeleton loader with gradient shimmer.
198. [Vis] Video Player custom controls.
199. [Vis] Audio Player custom controls.
200. [Vis] Overall page screenshots for regression.

---

## Development Guidelines

### File Structure (suggested)
```
src/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Shop routes group
│   │   ├── products/
│   │   ├── characters/
│   │   ├── categories/
│   │   └── cart/
│   ├── (account)/         # Auth routes group
│   ├── api/               # API routes
│   └── layout.tsx
├── components/
│   ├── ui/                # Base components (Button, Card, Input, etc.)
│   ├── product/           # Product-specific components
│   ├── character/         # Character-specific components
│   └── layout/            # Header, Footer, Navigation
├── lib/
│   ├── db/                # Drizzle schema & queries
│   ├── stripe/            # Payment integration
│   └── utils/
├── styles/
│   └── globals.css        # Tailwind + custom CSS
└── tests/
    ├── unit/              # Vitest unit tests
    ├── e2e/               # Playwright E2E tests
    └── visual/            # Visual regression tests
```

### Priorities
1. **Phase 1**: Layout, navigation, character system, product display (Suites 1, 2, 3)
2. **Phase 2**: Cart, checkout, payments (Suite 4)
3. **Phase 3**: User accounts, search, filters (Suite 5)
4. **Phase 4**: Performance optimization, accessibility audit (Suites 6, 7)

### Commands
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm test         # Run Vitest unit tests
pnpm test:e2e     # Run Playwright E2E tests
pnpm test:visual  # Run visual regression tests
pnpm lint         # ESLint
pnpm db:push      # Push schema to D1
pnpm db:studio    # Open Drizzle Studio
```

### Design Tokens
```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: '#FFB6C1',
          cream: '#FFF8E7',
          mint: '#98D8C8',
          lavender: '#E6E6FA',
          peach: '#FFDAB9',
          sky: '#87CEEB',
        }
      },
      borderRadius: {
        'kawaii': '1.5rem',
        'kawaii-lg': '2rem',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Kosugi Maru', 'sans-serif'],
      },
      boxShadow: {
        'kawaii': '0 4px 14px 0 rgba(255, 182, 193, 0.39)',
        'kawaii-hover': '0 6px 20px rgba(255, 182, 193, 0.5)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 0.5s ease-in-out',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      }
    }
  }
}
```

---

## Notes for AI Agent

1. **Study the reference sites** - Really understand the Japanese kawaii e-commerce aesthetic before building. The "vibe" is critical.
2. **TDD approach** - Write tests first or alongside components.
3. **Mobile-first** - Design for mobile, enhance for desktop. Most customers browse on phones.
4. **Performance budget** - Keep it fast, Cloudflare free tier has limits.
5. **Accessibility** - Kawaii doesn't mean inaccessible. Keep WCAG AA compliance.
6. **Commit frequently** - Small, logical commits with clear messages.
7. **Australian localization** - AUD currency, Australian postal codes, AU shipping options.
8. **Character system is KEY** - This is what differentiates from generic e-commerce.

Let's build something delightfully kawaii! 🎀✨
