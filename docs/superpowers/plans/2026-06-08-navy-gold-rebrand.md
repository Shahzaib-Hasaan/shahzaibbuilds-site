# Navy/Gold Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand shahzaibbuilds.me to the LinkedIn navy/gold + Fraunces identity, add a "Building in Public" section, soften services, and strengthen follow CTAs — while archiving the old site for recovery.

**Architecture:** The site is token-driven (CSS variables in `app/globals.css`, consumed via `var(--x)` and Tailwind `text-[color:var(--x)]`). Changing the token values reskins most of the site automatically. Remaining work: swap the serif font, force dark-only, fix a handful of hardcoded colors (THREE.js scene, project accents), add one new data-driven section, and adjust two sections' copy.

**Tech Stack:** Next.js (App Router), Tailwind, next-themes (to be neutralized), next/font (Google), framer-motion, GSAP, React Three Fiber.

> **Verification note:** This is a visual reskin, not logic. "Tests" here = `npx tsc --noEmit` clean (ignoring pre-existing `Tools/` errors), `npm run build` success, and visual confirmation in `npm run dev`. No unit tests are added.

---

## File Structure

**Modify:**
- `app/globals.css` — rewrite token palette to navy/gold; collapse light+dark into one dark theme.
- `tailwind.config.ts` — serif → Fraunces; update any hardcoded accent values.
- `app/layout.tsx` — swap Instrument_Serif → Fraunces; force dark; drop ThemeProvider toggle behavior.
- `app/v2/_components/Hero3DScene.tsx` — recolor THREE.js scene to navy/gold.
- `app/v2/_components/ProjectGrid.tsx` — replace teal/amber accent branching with gold.
- `app/v2/_components/TeachingSection.tsx` — teal span → gold.
- `app/v2/_components/HeroSection.tsx` — add "Follow along" CTA + "in public" to headline.
- `app/v2/_components/ServicesStrip.tsx` — finish softening (mostly done).
- `app/v2/_components/ContactSection.tsx` — strengthen LinkedIn follow CTA.
- `app/page.tsx` — insert `<BuildingInPublic />` after `<HeroSection />`.

**Create:**
- `lib/building.ts` — posts + products data.
- `app/v2/_components/BuildingInPublic.tsx` — new section.
- `public/building/youtubification.png` — first post cover (copied from LinkedIn slides).

**Remove (usage, not necessarily files):**
- ThemeToggle usage from Navbar/layout.

---

## Task 0: Git Safety — Archive Current Site

**Files:** none (git only)

- [ ] **Step 1: Ensure working tree is clean/committed**

Run: `cd shahzaibbuilds-site && git status --short`
Expected: only the spec/plan docs (already committed) — nothing else uncommitted. If component edits from earlier are uncommitted, commit them first:
```bash
git add app/v2/_components/*.tsx
git commit -m "chore: align section copy to LinkedIn voice (pre-rebrand)"
```

- [ ] **Step 2: Create + push archive branch**

```bash
git branch v1-archive
git push -u origin v1-archive
```
Expected: branch pushed to GitHub.

- [ ] **Step 3: Tag the pre-rebrand state**

```bash
git tag v1-pre-rebrand
git push origin v1-pre-rebrand
```
Expected: tag pushed. Recovery is now `git checkout v1-archive`.

- [ ] **Step 4: Confirm on main**

Run: `git branch --show-current`
Expected: `main`

---

## Task 1: Rewrite Brand Tokens (navy/gold, dark-only)

**Files:**
- Modify: `app/globals.css:5-78` (the `:root` and `.dark` blocks)

- [ ] **Step 1: Replace the `:root` block with navy/gold values**

In `app/globals.css`, replace the entire `:root { ... }` block (lines ~6-42) with:

```css
  :root {
    /* navy/gold brand — single theme */
    --bg: #0d1322;
    --bg-alt: #141c30;
    --bg-deep: #1b2540;
    --text: #f4f1e9;
    --text-muted: #aab4cd;
    --text-faint: #5d6b88;
    --accent: #d4a04a;
    --accent-hover: #c98f3c;
    --accent-hi: #ecc377;
    --teal: #d4a04a;        /* alias kept so legacy refs render gold, not teal */
    --charcoal: #aab4cd;
    --border: #2a3450;
    --border-strong: #38456a;
    --card: #1b2540;
    --radius: 0.75rem;

    /* shadcn HSL tokens — navy/gold */
    --background: 222 38% 9%;
    --foreground: 40 38% 93%;
    --card-foreground: 40 38% 93%;
    --popover: 222 34% 12%;
    --popover-foreground: 40 38% 93%;
    --primary: 38 60% 56%;
    --primary-foreground: 222 38% 9%;
    --secondary: 222 30% 18%;
    --secondary-foreground: 40 38% 93%;
    --muted: 222 30% 18%;
    --muted-foreground: 220 22% 73%;
    --accent-color: 38 60% 56%;
    --accent-foreground: 222 38% 9%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 40 38% 93%;
    --border-color: 222 26% 24%;
    --input: 222 26% 24%;
    --ring: 38 60% 56%;
  }
```

- [ ] **Step 2: Make `.dark` identical to `:root` (dark-only safety)**

Replace the entire `.dark { ... }` block (lines ~44-78) with a copy of the same navy/gold values so that whether or not the `dark` class is present, the site is navy/gold:

```css
  .dark {
    --bg: #0d1322;
    --bg-alt: #141c30;
    --bg-deep: #1b2540;
    --text: #f4f1e9;
    --text-muted: #aab4cd;
    --text-faint: #5d6b88;
    --accent: #d4a04a;
    --accent-hover: #c98f3c;
    --accent-hi: #ecc377;
    --teal: #d4a04a;
    --charcoal: #aab4cd;
    --border: #2a3450;
    --border-strong: #38456a;
    --card: #1b2540;

    --background: 222 38% 9%;
    --foreground: 40 38% 93%;
    --card-foreground: 40 38% 93%;
    --popover: 222 34% 12%;
    --popover-foreground: 40 38% 93%;
    --primary: 38 60% 56%;
    --primary-foreground: 222 38% 9%;
    --secondary: 222 30% 18%;
    --secondary-foreground: 40 38% 93%;
    --muted: 222 30% 18%;
    --muted-foreground: 220 22% 73%;
    --accent-color: 38 60% 56%;
    --accent-foreground: 222 38% 9%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 40 38% 93%;
    --border-color: 222 26% 24%;
    --input: 222 26% 24%;
    --ring: 38 60% 56%;
  }
```

- [ ] **Step 3: Verify build still compiles**

Run: `npm run build`
Expected: completes without CSS errors. (Visual check comes in Task 9.)

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(brand): navy/gold token palette, dark-only"
```

---

## Task 2: Swap Serif Font to Fraunces + Force Dark

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Import Fraunces, remove Instrument_Serif in layout.tsx**

In `app/layout.tsx`, change the font import line:
```tsx
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google';
```
Replace the `instrumentSerif` definition block with:
```tsx
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-instrument',   // keep same CSS var name so tailwind mapping still works
  display: 'swap',
  axes: ['opsz'],
});
```
(Keeping the `--font-instrument` variable name avoids touching `tailwind.config.ts` serif mapping. The variable now points to Fraunces.)

- [ ] **Step 2: Update the body className variable reference**

In `app/layout.tsx`, change the `<body className=...>` to use `fraunces.variable` instead of `instrumentSerif.variable`:
```tsx
<body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased`}>
```

- [ ] **Step 3: Force the dark class on `<html>`**

In `app/layout.tsx`, add `dark` to the html className so navy/gold always applies:
```tsx
<html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
```

- [ ] **Step 4: Neutralize next-themes toggle**

In `app/layout.tsx`, find the `<ThemeProvider>` wrapper. Change its props so it is locked to dark and not switchable. Open `components/ThemeProvider.tsx` and set:
```tsx
<NextThemes attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
  {children}
</NextThemes>
```
(`forcedTheme="dark"` makes next-themes ignore stored/system preference.)

- [ ] **Step 5: Verify tailwind serif points to Fraunces label**

Open `tailwind.config.ts`, find the serif fontFamily line. Update the fallback label for clarity (functionally optional but keeps it honest):
```ts
serif: ['var(--font-instrument)', 'Fraunces', 'Georgia', 'serif'],
```

- [ ] **Step 6: Build + typecheck**

Run: `npm run build`
Expected: success, Fraunces fetched at build.
Run: `npx tsc --noEmit 2>&1 | grep -v "Tools/"`
Expected: no errors outside `Tools/`.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx tailwind.config.ts components/ThemeProvider.tsx
git commit -m "feat(brand): Fraunces serif + lock dark theme"
```

---

## Task 3: Recolor the Hero 3D Scene

**Files:**
- Modify: `app/v2/_components/Hero3DScene.tsx:48-49`

- [ ] **Step 1: Replace the THREE.js color seeds**

In `Hero3DScene.tsx`, the scene morphs from a "biology" color to an "AI" color. Replace the teal/amber seeds with navy-grey → gold:
```tsx
const tealColor = useMemo(() => new THREE.Color('#5d6b88'), []);   // muted blue-grey start
const amberColor = useMemo(() => new THREE.Color('#d4a04a'), []);  // gold end
```
(Variable names left unchanged to avoid touching the lerp logic below.)

- [ ] **Step 2: Build to confirm THREE scene compiles**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add app/v2/_components/Hero3DScene.tsx
git commit -m "feat(brand): recolor hero 3D scene to navy/gold"
```

---

## Task 4: Fix Project Accent Colors

**Files:**
- Modify: `app/v2/_components/ProjectGrid.tsx:36-37`

- [ ] **Step 1: Collapse the amber/teal branch to gold**

In `ProjectGrid.tsx`, the project cards pick teal or amber via `p.accent`. Since the brand is single-accent gold, replace:
```tsx
const isAmber = p.accent === 'amber';
const accent = isAmber ? 'var(--accent)' : 'var(--teal)';
```
with:
```tsx
const accent = 'var(--accent)';
```
Then remove any now-unused `isAmber` references further down (search the file for `isAmber` and delete those usages, defaulting to the gold `accent`).

- [ ] **Step 2: Typecheck (catch unused var / broken refs)**

Run: `npx tsc --noEmit 2>&1 | grep "ProjectGrid"`
Expected: no errors mentioning ProjectGrid.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add app/v2/_components/ProjectGrid.tsx
git commit -m "feat(brand): single gold accent for project cards"
```

---

## Task 5: Hunt Remaining Hardcoded Colors

**Files:** any in `app/`, `components/` surfaced by grep

- [ ] **Step 1: Grep for stray brand colors**

Run:
```bash
grep -rnE "#D97706|#E89530|#0F766E|#3FAA9F|#FAFAF5|#F0ECE3|#1C1C1C|#0E0D0C" app/ components/ | grep -viE "node_modules|Tools/"
```
Expected: a list (possibly empty). For each hit in user-visible code, replace the hex with the matching token (`var(--accent)`, `var(--bg)`, etc.). The `--teal` token alias already renders gold, so `var(--teal)` usages are fine to leave.

- [ ] **Step 2: Grep for Tailwind amber/teal utility classes**

Run:
```bash
grep -rnE "amber-|teal-|orange-" app/ components/ | grep -viE "node_modules|Tools/"
```
Expected: a list. Replace any user-visible `text-amber-*` / `bg-teal-*` etc. with token-based classes like `text-[color:var(--accent)]`.

- [ ] **Step 3: Build + typecheck**

Run: `npm run build && npx tsc --noEmit 2>&1 | grep -v "Tools/"`
Expected: success, no new errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(brand): replace stray hardcoded colors with tokens"
```

---

## Task 6: Create Building-in-Public Data

**Files:**
- Create: `lib/building.ts`
- Create: `public/building/youtubification.png`

- [ ] **Step 1: Copy the first post cover image**

Copy the YouTubification carousel cover into the site's public dir:
```bash
mkdir -p public/building
cp "../Linkedin/content/posts/2026-06-08-youtubification/slides/slide-01.png" public/building/youtubification.png
```
(Path is relative to the site root; adjust if the LinkedIn folder differs. If unavailable, use any existing brand image and flag it.)

- [ ] **Step 2: Write `lib/building.ts`**

Create `lib/building.ts`:
```ts
export interface BuildPost {
  title: string;
  type: 'carousel' | 'post';
  linkedinUrl: string;
  cover: string;
  date: string; // ISO
}

export interface BuildProduct {
  name: string;
  status: 'live' | 'building' | 'planned';
  blurb: string;
  url?: string;
}

export const posts: BuildPost[] = [
  {
    title: 'The YouTubification of Software',
    type: 'carousel',
    linkedinUrl: 'https://www.linkedin.com/in/shahzaibbuilds/',
    cover: '/building/youtubification.png',
    date: '2026-06-08',
  },
];

export const products: BuildProduct[] = [
  {
    name: 'Hisaab',
    status: 'live',
    blurb: 'A personal finance tracker that answers the only question that matters: where does the money actually go?',
    url: 'https://hisaab.shahzaibbuilds.me/',
  },
  {
    name: 'Toolbelt',
    status: 'live',
    blurb: 'Free, privacy-first browser utilities — PDF, image, and dev tools that run entirely on your machine. No uploads, no sign-ups.',
    url: 'https://tools.shahzaibbuilds.me/',
  },
  {
    name: 'Promptly',
    status: 'building',
    blurb: 'A faster way to run, organize, and reuse your best AI prompts. In progress.',
  },
];
```

- [ ] **Step 3: Typecheck the data file**

Run: `npx tsc --noEmit 2>&1 | grep "building"`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/building.ts public/building/youtubification.png
git commit -m "feat(building): add building-in-public data + first post cover"
```

---

## Task 7: Build the Building-in-Public Section

**Files:**
- Create: `app/v2/_components/BuildingInPublic.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the component**

Create `app/v2/_components/BuildingInPublic.tsx`:
```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { posts, products } from '@/lib/building';

const statusStyles: Record<string, string> = {
  live: 'text-[color:var(--bg)] bg-[color:var(--accent)]',
  building: 'text-[color:var(--accent)] border border-[color:var(--accent)]/40',
  planned: 'text-[color:var(--text-faint)] border border-[color:var(--border-strong)]',
};

export default function BuildingInPublic() {
  return (
    <section id="building" className="relative py-24 sm:py-32 bg-[color:var(--bg-alt)] border-t border-[color:var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--accent)] mb-3">
            Building in public
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[color:var(--text)] tracking-tight leading-tight">
            I build it, then I show you how.
          </h2>
          <p className="mt-3 text-[color:var(--text-muted)]">
            Live products I ship on the side, and the breakdowns I post as I go.
          </p>
        </motion.div>

        {/* Now building */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--border)] mb-16">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="bg-[color:var(--bg)] p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-2xl text-[color:var(--text)]">{p.name}</h3>
                <span className={`text-[10px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-sm text-[color:var(--text-muted)] leading-relaxed flex-1">{p.blurb}</p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--accent)] hover:gap-2 transition-all"
                >
                  Visit <ArrowUpRight size={15} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Latest posts */}
        {posts.length > 0 && (
          <>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--text-faint)] mb-6">
              Latest, in public
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <a
                  key={post.title}
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--bg)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[color:var(--accent)]">{post.type}</span>
                    <h4 className="font-serif text-lg text-[color:var(--text)] mt-1 leading-snug group-hover:text-[color:var(--accent)] transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <a
          href="https://www.linkedin.com/in/shahzaibbuilds/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-[color:var(--text)] border border-[color:var(--border-strong)] hover:border-[color:var(--accent)] rounded-full px-5 py-3 transition-colors"
        >
          I post every build on LinkedIn. Follow along <ArrowUpRight size={16} className="text-[color:var(--accent)]" />
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into the page**

In `app/page.tsx`, add the import near the other v2 imports:
```tsx
import BuildingInPublic from './v2/_components/BuildingInPublic';
```
And insert it right after `<HeroSection />`:
```tsx
        <HeroSection />
        <BuildingInPublic />
        <AboutTimeline />
```

- [ ] **Step 3: Update the LinkedIn URL if the real handle differs**

If the custom URL `/in/shahzaibbuilds` is not yet live, the `linkedin.com/in/shahzaibbuilds/` links will 404. Use the actual profile URL if known, otherwise leave as-is and flag it in the commit message.

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit 2>&1 | grep -v "Tools/"`
Expected: no errors.
Run: `npm run build`
Expected: success (Next image config must allow local `/building/*` — it does, they're in `public/`).

- [ ] **Step 5: Commit**

```bash
git add app/v2/_components/BuildingInPublic.tsx app/page.tsx
git commit -m "feat(building): add Building-in-Public section to homepage"
```

---

## Task 8: Hero CTA + Navbar Link + Soften/Strengthen Copy

**Files:**
- Modify: `app/v2/_components/HeroSection.tsx`
- Modify: `app/v2/_components/Navbar.tsx`
- Modify: `app/v2/_components/ContactSection.tsx`

- [ ] **Step 1: Add a "Follow along" CTA in the hero**

In `HeroSection.tsx`, find the CTA row (the `flex flex-wrap items-center gap-4` div with "See the pivot" and "jump to what I've built"). Add a third link after the existing two:
```tsx
            <a
              href="#building"
              className="font-mono text-sm text-[color:var(--accent)] hover:underline underline-offset-[6px]"
            >
              see what I&apos;m building →
            </a>
```

- [ ] **Step 2: Add "Building" to the navbar links**

In `Navbar.tsx`, find the nav link list and add a Building entry pointing to `#building` (match the existing link markup/pattern in that file). Place it after the Work/Path links.

- [ ] **Step 3: Strengthen the contact follow CTA**

In `ContactSection.tsx`, ensure there is a prominent LinkedIn follow link. If the section already lists socials, add or promote a primary button:
```tsx
            <a
              href="https://www.linkedin.com/in/shahzaibbuilds/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              Follow on LinkedIn →
            </a>
```
Place it as the primary action near the email line. (The `btn-ink` class already exists in the codebase.)

- [ ] **Step 4: Confirm ServicesStrip soften is complete**

Open `ServicesStrip.tsx`. Confirm the heading reads "The systems I ship, in public." and the intro mentions building for clients + breaking them down (edited earlier). No change needed if already present.

- [ ] **Step 5: Typecheck + build**

Run: `npx tsc --noEmit 2>&1 | grep -v "Tools/"`
Expected: no errors.
Run: `npm run build`
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add app/v2/_components/HeroSection.tsx app/v2/_components/Navbar.tsx app/v2/_components/ContactSection.tsx
git commit -m "feat(brand): hero follow CTA, building nav link, stronger contact CTA"
```

---

## Task 9: Full Visual Verification

**Files:** none (manual verification)

- [ ] **Step 1: Run dev server**

Run: `npm run dev` (background) and open `http://localhost:3000`.

- [ ] **Step 2: Section-by-section visual check**

Confirm each renders in navy/gold with no leftover cream/amber/teal:
- Navbar — navy bg, gold accent, has "Building" link
- Hero — navy, Fraunces headline, gold "Instead I build AI", photo visible, "see what I'm building" CTA
- Building in Public — products with status pills (Hisaab/Toolbelt gold "live", Promptly "building"), post card, follow CTA
- Timeline — navy/gold, animation still scrubs
- Projects — gold accents (no teal), lens still opens
- Skills — navy/gold
- Teaching — gold (no teal span)
- Services — "systems I ship, in public" heading
- Contact — prominent Follow on LinkedIn
- Footer — navy/gold
- Chat assistant — navy/gold styling, opens/closes

- [ ] **Step 3: Confirm no light-mode flash**

Reload a few times. Expected: always dark navy, no white flash (forcedTheme=dark prevents it).

- [ ] **Step 4: Em-dash sweep (carry the LinkedIn rule)**

Run:
```bash
grep -rn "—" app/v2/_components/ app/page.tsx | grep -viE "title: '—'|//|/\*"
```
Expected: empty (the timeline `'—'` placeholders and code comments are allowed; user-visible prose em-dashes are not). Fix any that appear.

- [ ] **Step 5: Final build**

Run: `npm run build`
Expected: success, no errors/warnings about missing modules or images.

- [ ] **Step 6: Commit any verification fixes**

```bash
git add -A
git commit -m "fix(brand): visual verification pass"
```

---

## Task 10: Deploy Decision

**Files:** none

- [ ] **Step 1: Decide deploy path**

Default: push `main` (auto-deploys via the site's hosting). Since `v1-archive` + `v1-pre-rebrand` exist, rollback is one command. If you prefer to preview first, push a branch and open a PR for a preview deploy instead.

- [ ] **Step 2: Push**

```bash
git push origin main
```
Expected: deploy triggers. Verify the live site renders navy/gold.

- [ ] **Step 3: Rollback note (only if needed)**

If the live deploy looks wrong:
```bash
git checkout v1-archive
git push origin main --force-with-lease   # only with explicit go-ahead
```
(Do NOT force-push without confirming — prefer a revert commit in normal cases.)

---

## Self-Review Notes

- **Spec coverage:** brand tokens (T1), Fraunces (T2), dark-only (T1/T2), 3D recolor (T3), project accents (T4), stray colors (T5), Building-in-Public data+component (T6/T7), hero CTA + nav + contact (T8), services soften (T8 step 4, mostly pre-done), git archive (T0), verification (T9), deploy (T10). All spec sections covered.
- **Type consistency:** `BuildPost`/`BuildProduct` interfaces defined in T6 are consumed verbatim in T7. `posts`/`products` names match. `statusStyles` keys match the `status` union.
- **No light mode left:** `:root` and `.dark` both navy/gold (T1); `forcedTheme="dark"` (T2). Belt + suspenders.
- **`--teal` alias:** intentionally remapped to gold so legacy `var(--teal)` references render on-brand without hunting every one.
