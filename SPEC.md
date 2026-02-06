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

# Test-Driven Development Strategy

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

### Character Pages
31. [E2E] Character landing page loads with hero image/animation.
32. [E2E] Character page shows bio, birthday, and personality traits.
33. [Unit] Character color theme applies to page accents dynamically.
34. [E2E] "Shop by Character" filter works correctly.
35. [E2E] Character mascot appears on related product cards.
36. [Unit] Character data fetches from CMS correctly.
37. [E2E] Character page has meta tags for SEO (og:image, description).
38. [Vis] Character page maintains brand consistency with main site.

### Character Navigation
39. [E2E] Character carousel on homepage is swipeable on mobile.
40. [E2E] Character carousel has keyboard navigation (arrow keys).
41. [Unit] Character icons have hover animations (bounce/wiggle).
42. [E2E] Clicking character icon filters products by that character.
43. [E2E] Active character filter shows visual indicator.

### Character Collections
44. [E2E] "New Characters" section highlights recent additions.
45. [E2E] "Popular Characters" section based on view/purchase data.
46. [Unit] Character grouping by franchise works (Sanrio, San-X, etc.).
47. [E2E] Character search/autocomplete works.
48. [E2E] Character page shows related characters (same franchise).

### Character Details
49. [Unit] Character birthday displays correctly with zodiac.
50. [E2E] Character "friends" section links to other character pages.
51. [Unit] Character trivia/facts section renders markdown correctly.
52. [E2E] Character product count updates dynamically.
53. [Vis] Character pages use character's signature colors.
54. [E2E] Character page breadcrumbs work correctly.

### Character Data Management
55. [Unit] CMS can add/edit/delete characters.
56. [Unit] Character images have proper alt text.
57. [E2E] Character with no products shows appropriate message.
58. [Unit] Character slug generation is consistent and URL-safe.
59. [E2E] Duplicate character slugs are prevented.
60. [Unit] Character popularity score calculates correctly.

### Character Animations
61. [E2E] Character mascots have idle animations (subtle).
62. [Unit] Animations respect reduced-motion preference.
63. [E2E] Character hover effects are smooth (no jank).
64. [Vis] Character sprites/images are crisp at all sizes.
65. [E2E] Character loading states show skeleton with character shape.

### Character Favorites
66. [E2E] Users can favorite characters (stored locally).
67. [E2E] Favorited characters appear in user's "My Characters" section.
68. [Unit] Favorite state persists across sessions.
69. [E2E] Favorite toggle has heart animation.
70. [E2E] "Shop My Characters" shows products from favorited characters only.

---

## Suite 3: Product Display & Cards (35 Tests)
*Focus: Product cards are the heart of e-commerce.*

### Product Card Component
71. [Vis] Product cards have consistent border-radius (rounded-2xl).
72. [Unit] Product card shows: image, name, price, character badge.
73. [E2E] Product card hover lifts with shadow and slight scale.
74. [Unit] "Sale" badge shows percentage and strikethrough price.
75. [Unit] "New" badge appears for products added in last 14 days.
76. [Unit] "Low Stock" badge appears when inventory < 5.
77. [E2E] Product card image lazy loads with blur placeholder.
78. [Unit] Product card truncates long names with ellipsis.
79. [E2E] Quick view modal opens on "eye" icon click.
80. [E2E] Add to cart from card shows success animation.

### Product Grid
81. [E2E] Grid is responsive (4-3-2-1 columns breakpoints).
82. [Unit] Grid gap is consistent across breakpoints.
83. [E2E] Infinite scroll loads more products smoothly.
84. [E2E] "Load More" button alternative to infinite scroll.
85. [Unit] Product count displays correctly ("Showing 1-24 of 156").
86. [E2E] Empty grid shows friendly "no products" message with mascot.

### Product Images
87. [Unit] Product images use Next.js Image optimization.
88. [E2E] Multiple product images cycle on hover.
89. [Unit] Alt text includes product name and character.
90. [E2E] Image zoom works on product detail page.
91. [Vis] Images maintain aspect ratio (no squishing).
92. [E2E] Missing images show kawaii placeholder.

### Product Variants
93. [Unit] Color swatches display on card when applicable.
94. [E2E] Clicking swatch updates card image.
95. [Unit] Size options show on hover (if applicable).
96. [E2E] Out of stock variant is visually distinct (crossed out).
97. [Unit] Variant price differences display correctly.

### Product Badges & Labels
98. [Unit] Badges stack correctly (max 2 visible, "+1" for more).
99. [Vis] Badge colors are consistent (red=sale, green=new, etc.).
100. [Unit] "Pre-order" badge shows estimated date.
101. [E2E] "Exclusive" badge links to exclusives collection.
102. [Unit] Badge animations don't distract from content.

### Wishlist Integration
103. [E2E] Heart icon toggles wishlist status.
104. [Unit] Wishlist count updates in header.
105. [E2E] Wishlist works without login (local storage).

---

## Suite 4: Product Detail Page (30 Tests)
*Focus: The detail page must convince and delight.*

### Product Information
106. [E2E] Product name, price, and description render correctly.
107. [Unit] Breadcrumbs show: Home > Category > Character > Product.
108. [E2E] "Share" buttons work for social platforms.
109. [Unit] SKU/Product code displays.
110. [E2E] Product dimensions/weight info available (for shipping calc).
111. [Unit] Material/care instructions shown when applicable.

### Image Gallery
112. [E2E] Main image changes when thumbnail clicked.
113. [E2E] Image gallery supports pinch-zoom on mobile.
114. [E2E] Lightbox opens on image click (desktop).
115. [E2E] Swipe between images in lightbox.
116. [Unit] Thumbnails have active state indicator.

### Add to Cart
117. [E2E] Quantity selector increments/decrements correctly.
118. [Unit] Quantity cannot go below 1.
119. [E2E] "Add to Cart" disabled when out of stock.
120. [E2E] Success toast appears after adding to cart.
121. [Unit] Cart icon in header shows updated count.

### Variants & Options
122. [E2E] Selecting variant updates price and image.
123. [Unit] Out of stock variants are selectable but show notice.
124. [E2E] "Notify when available" captures email.
125. [Unit] Selected variant persists in URL for sharing.

### Related Products
126. [E2E] "You might also like" shows 4-6 related products.
127. [Unit] Related products are from same character or category.
128. [E2E] "Complete the set" section for product bundles.

### Reviews & Ratings
129. [E2E] Star rating displays with count.
130. [Unit] Review summary shows breakdown (5★, 4★, etc.).
131. [E2E] "Write a review" form validates inputs.
132. [E2E] Review photos upload and display correctly.
133. [Unit] Helpful/Not helpful voting works.
134. [E2E] Reviews paginate after 10 entries.
135. [Unit] Verified purchase badge shows correctly.

---

## Suite 5: Shopping Cart & Checkout (35 Tests)
*Focus: Frictionless path to purchase.*

### Cart Sidebar/Page
136. [E2E] Cart opens as sidebar on desktop.
137. [E2E] Cart is full page on mobile.
138. [Unit] Cart items show image, name, quantity, price, subtotal.
139. [E2E] Quantity can be updated in cart.
140. [E2E] Remove item shows confirmation or undo option.
141. [Unit] Cart subtotal calculates correctly.
142. [E2E] Empty cart shows friendly message and "continue shopping".

### Cart Features
143. [E2E] "Save for later" moves item to wishlist.
144. [Unit] Cart persists across sessions (localStorage/auth).
145. [E2E] Promo code field validates and applies discount.
146. [Unit] Invalid promo code shows clear error.
147. [E2E] Free shipping threshold shows progress bar.
148. [Unit] Cart shows estimated delivery date range.

### Checkout Flow
149. [E2E] Guest checkout available (no account required).
150. [E2E] Shipping address form validates Australian postcodes.
151. [E2E] Suburb auto-suggests from postcode.
152. [Unit] Shipping cost calculates based on location/weight.
153. [E2E] Multiple shipping options available (standard, express).
154. [Unit] Order summary updates in real-time.

### Payment
155. [E2E] Stripe payment integration works.
156. [E2E] PayPal option available.
157. [E2E] Afterpay/Zip available for orders $50-$1000.
158. [Unit] Card validation follows Stripe best practices.
159. [E2E] Payment error shows clear message and retry option.
160. [Unit] Order confirmation number generated correctly.

### Post-Purchase
161. [E2E] Confirmation page shows order details and "cute" thank you.
162. [E2E] Confirmation email sends (testable via mock).
163. [Unit] Order saved to database with correct status.
164. [E2E] "Track Order" link works in confirmation.
165. [Unit] Inventory decrements after successful purchase.

### Cart Edge Cases
166. [E2E] Cart handles item going out of stock gracefully.
167. [Unit] Cart validates max quantity limits.
168. [E2E] Currency displays correctly (AUD with $).
169. [E2E] Cart syncs across tabs (if logged in).
170. [Unit] Tax calculation follows Australian GST rules.

---

## Suite 6: Search & Filtering (25 Tests)
*Focus: Finding the perfect Cinnamoroll stationery set.*

### Search
171. [E2E] Search bar autocomplete shows suggestions.
172. [E2E] Search results page loads quickly (<200ms perceived).
173. [Unit] Search indexes product name, description, character, category.
174. [E2E] Fuzzy matching works ("cinnamon roll" finds "Cinnamoroll").
175. [E2E] Search highlights matching terms in results.
176. [Unit] Recent searches saved and displayed.
177. [E2E] "No results" page suggests alternatives.

### Filters
178. [E2E] Category filter updates results without page reload.
179. [E2E] Character filter works with multiple selections.
180. [E2E] Price range slider filters correctly.
181. [Unit] Filter counts show available products.
182. [E2E] "Clear all filters" resets to default.
183. [E2E] Active filters shown as removable tags.

### Sorting
184. [E2E] Sort by: Newest, Price (low/high), Popularity, Name.
185. [Unit] Default sort is "Newest" or "Recommended".
186. [E2E] Sort preference persists during session.

### URL State
187. [E2E] Filters reflect in URL for sharing/bookmarking.
188. [E2E] Browser back button restores previous filter state.
189. [Unit] Deep linking to filtered view works.

### Search UX
190. [E2E] Mobile search is full-screen overlay.
191. [Unit] Search debounces input (300ms).
192. [E2E] Search works with Japanese characters.
193. [E2E] Voice search available on supported browsers.
194. [Unit] Search analytics tracks popular queries.
195. [E2E] "Did you mean?" for typos.

---

## Suite 7: User Account & Auth (25 Tests)
*Focus: Optional but beneficial user accounts.*

### Authentication
196. [E2E] Sign up form validates email and password strength.
197. [E2E] Login works with email/password.
198. [E2E] Social login available (Google, Apple).
199. [E2E] "Forgot password" flow sends reset email.
200. [Unit] Password reset token expires correctly.
201. [E2E] Session persists appropriately (remember me).

### Account Dashboard
202. [E2E] Dashboard shows recent orders.
203. [E2E] Order history with status tracking.
204. [E2E] Address book for saved addresses.
205. [E2E] Payment methods management.
206. [Unit] Account deletion GDPR compliant.

### Wishlist
207. [E2E] Wishlist page lists all saved items.
208. [E2E] Add to cart from wishlist works.
209. [E2E] Wishlist shareable via link.
210. [Unit] Wishlist syncs when user logs in.

### Profile
211. [E2E] Profile edit (name, email, avatar).
212. [E2E] Communication preferences toggleable.
213. [Unit] Password change requires current password.
214. [E2E] Order notifications configurable.

### Account Features
215. [E2E] "My Characters" shows favorited characters.
216. [E2E] Purchase history shows reorder button.
217. [Unit] Loyalty points display (if applicable).
218. [E2E] Account page mobile responsive.
219. [E2E] Logout clears session correctly.
220. [Unit] Account creation triggers welcome email.

---

## Suite 8: Performance & Accessibility (30 Tests)
*Focus: Fast and usable by everyone.*

### Performance
221. [Perf] Largest Contentful Paint < 2.5s.
222. [Perf] First Input Delay < 100ms.
223. [Perf] Cumulative Layout Shift < 0.1.
224. [Perf] Time to Interactive < 3.5s.
225. [Unit] Images served in WebP/AVIF format.
226. [Unit] JavaScript bundle < 200KB (gzipped).
227. [Perf] Homepage loads in < 3s on 3G.
228. [Unit] Fonts preloaded and display:swap used.
229. [E2E] Service worker caches static assets.
230. [Perf] API responses < 200ms (p95).

### Accessibility
231. [A11y] All images have meaningful alt text.
232. [A11y] Color contrast meets WCAG AA (4.5:1).
233. [A11y] Focus indicators visible on all interactive elements.
234. [A11y] Skip to content link available.
235. [A11y] Form inputs have associated labels.
236. [A11y] Error messages announced to screen readers.
237. [A11y] Modals trap focus correctly.
238. [A11y] ARIA landmarks used appropriately.
239. [E2E] Full keyboard navigation possible.
240. [A11y] Reduced motion respected for animations.

### SEO
241. [Unit] Meta titles unique and < 60 chars.
242. [Unit] Meta descriptions unique and < 160 chars.
243. [E2E] Sitemap.xml generated correctly.
244. [E2E] Robots.txt configured appropriately.
245. [Unit] Canonical URLs set on all pages.
246. [E2E] Structured data (JSON-LD) for products.
247. [E2E] Open Graph tags for social sharing.
248. [Unit] Heading hierarchy (h1-h6) correct on all pages.

### Edge Cases & Error Handling
249. [E2E] 404 page is styled and helpful.
250. [E2E] 500 error page displays gracefully.
251. [E2E] Offline page available (PWA).
252. [Unit] API errors show user-friendly messages.
253. [E2E] Slow network shows loading states (not frozen UI).
254. [Unit] Form submission prevents double-submit.
255. [E2E] Session timeout handled gracefully.

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
│   ├── ui/                # Base components
│   ├── product/           # Product-specific
│   ├── character/         # Character-specific
│   └── layout/            # Header, Footer, etc.
├── lib/
│   ├── db/                # Drizzle schema & queries
│   ├── stripe/            # Payment integration
│   └── utils/
├── styles/
│   └── globals.css        # Tailwind + custom CSS
└── tests/
    ├── unit/              # Vitest
    ├── e2e/               # Playwright
    └── visual/            # Visual regression
```

### Priorities
1. **Phase 1**: Layout, navigation, character system, product display
2. **Phase 2**: Cart, checkout, payments
3. **Phase 3**: User accounts, search, filters
4. **Phase 4**: Performance optimization, accessibility audit

### Commands
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm test         # Run Vitest
pnpm test:e2e     # Run Playwright
pnpm lint         # ESLint
pnpm db:push      # Push schema to D1
```

---

## Notes for AI Agent

1. **Study the reference sites** - Really understand the Japanese kawaii e-commerce aesthetic before building.
2. **TDD approach** - Write tests first or alongside components.
3. **Mobile-first** - Design for mobile, enhance for desktop.
4. **Performance budget** - Keep it fast, Cloudflare free tier has limits.
5. **Accessibility** - Kawaii doesn't mean inaccessible.
6. **Commit frequently** - Small, logical commits with clear messages.
7. **Ask questions** - If requirements are unclear, ask before assuming.

Let's build something delightfully kawaii! 🎀
