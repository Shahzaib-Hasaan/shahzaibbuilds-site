# Design — shahzaibbuilds.me Navy/Gold Rebrand

**Date:** 2026-06-08
**Author:** Shahzaib Hassan (with Claude)
**Status:** Approved design, pre-implementation

## Goal

Rebrand the personal site (`shahzaibbuilds-site`, Next.js v2) so it is visually and tonally consistent with the new LinkedIn brand: **navy + gold, Fraunces serif, "builder-in-public who teaches."** Preserve the well-built existing structure; reskin it, restructure lightly, and add the build-in-public content the brand needs.

Currently the site uses a cream/amber palette with Instrument Serif and a freelancer-portfolio voice. The LinkedIn profile (cover, avatar, carousel) uses deep navy + warm gold + Fraunces. They must converge on the LinkedIn identity.

## Non-Goals

- Not a ground-up rebuild. The timeline, project grid, skills lens, teaching, and chat assistant are good and stay.
- Not adding a CMS or backend. Build-in-public content is a hand-edited local data file.
- Not touching the nested `Tools/` sub-project (separate, untracked, out of scope).
- Not keeping a light mode. Site becomes dark-only (the brand is dark navy).

## Brand System (single source of truth)

All sections inherit from CSS variables in `app/globals.css` + `tailwind.config.ts`. Changing tokens reskins the site.

```
Palette (dark-only):
  --bg:        #0d1322   deep navy
  --bg-alt:    #141c30   raised navy
  --bg-deep:   #1b2540   cards / elevation
  --text:      #f4f1e9   warm cream
  --text-muted:#aab4cd   blue-grey
  --text-faint:#5d6b88
  --accent:    #d4a04a   gold
  --accent-hi: #ecc377   bright gold (gradients)
  --accent-hover:#c98f3c
  --border:    #2a3450
  --border-strong:#38456a

Fonts:
  serif: Fraunces           (headlines/claims — matches carousel)
  sans:  Inter              (body)
  mono:  JetBrains Mono     (kickers/labels — keep)

Texture: faint grid overlay + radial gold glow, matching the LinkedIn cover/carousel.
```

Decision: drop the light theme. Remove the light-mode `:root` block and any theme-toggle wiring. If a toggle component exists (`ThemeToggle.tsx`), remove its use from the layout (component file may remain unused or be deleted).

## Git Safety Strategy

Old site must remain fully recoverable.

1. Commit current working state (the 8 voice edits already made) to `main`.
2. Create branch `v1-archive` from that commit; push to GitHub.
3. Tag `v1-pre-rebrand`.
4. Return to `main`; build the rebrand there.
5. Recovery if needed: `git checkout v1-archive`.

## Section-by-Section Plan

| # | Section | File | Change |
|---|---------|------|--------|
| 1 | Hero | `HeroSection.tsx` | Reskin navy/gold. Keep "supposed to be a doctor / Instead I build AI" headline (add "in public"). Brand sub-line (done). "Follow along" CTA. Photo on navy/gold. |
| 2 | Building in Public | `BuildingInPublic.tsx` (NEW) | New section. See below. |
| 3 | Pivot Timeline | `AboutTimeline.tsx` | Reskin only. GSAP untouched. |
| 4 | Projects | `ProjectGrid.tsx` | Reskin only. Lens kept. |
| 5 | Skills | `SkillsLens.tsx` | Reskin only. |
| 6 | Teaching | `TeachingSection.tsx` | Reskin only. |
| 7 | Work With Me | `ServicesStrip.tsx` | Reskin + soften (partly done). "Available for select work," lower priority. |
| 8 | Contact + Follow | `ContactSection.tsx` | Reskin + strengthen LinkedIn-follow CTA + email. |
| — | Chat assistant | `ChatAssistant.tsx` | Reskin only. |
| — | Blog | `app/blog/*`, blog components | Reskin via tokens. |
| — | Navbar/Footer | `Navbar.tsx`, `Footer.tsx` | Reskin. Footer copy already de-em-dashed. |

Page order in `app/page.tsx` becomes: Navbar, Hero, **BuildingInPublic**, AboutTimeline, ProjectGrid, SkillsLens, TeachingSection, BlogTeaser, ServicesStrip, ContactSection, Footer.

## New Component: Building in Public

**Data file:** `lib/building.ts`
```ts
export interface BuildPost {
  title: string;
  type: 'carousel' | 'post';
  linkedinUrl: string;
  cover: string;        // /building/<file>.png in public/
  date: string;         // ISO
}
export interface BuildProduct {
  name: string;
  status: 'live' | 'building' | 'planned';
  blurb: string;
  url?: string;
}
export const posts: BuildPost[] = [ /* hand-edited */ ];
export const products: BuildProduct[] = [
  { name: 'Hisaab',   status: 'live',     blurb: '...', url: '...' },
  { name: 'Toolbelt', status: 'building', blurb: '...' },
  { name: 'Promptly', status: 'building', blurb: '...' },
];
```

**Component:** `app/v2/_components/BuildingInPublic.tsx`
- Heading: "Building in public" kicker + serif title.
- "Latest" → responsive grid of post cards (cover image, title, date, link out to LinkedIn).
- "Now building" → product list with status pills (gold = live, muted = building, faint = planned).
- CTA: "I post every build on LinkedIn." → Follow link.
- Uses brand tokens only. Framer-motion reveal consistent with siblings.
- Empty-state safe: if `posts` is empty, show only "Now building" + CTA.

First post entry: the YouTubification carousel (cover = slide-01 from the LinkedIn work; copy a cover image into `public/building/`).

## Implementation Order

1. Git: commit, branch `v1-archive`, push, tag, return to main.
2. Tokens: rewrite palette in `globals.css`; drop light block; update `tailwind.config.ts` (serif → Fraunces, accent values).
3. Fonts: add Fraunces (next/font Google) in `app/layout.tsx`; remove Instrument Serif wiring.
4. Hunt hardcoded colors: grep for hex codes + `--teal` + amber values in components; replace with tokens.
5. Reskin verification per section (most automatic via tokens).
6. Build `lib/building.ts` + `BuildingInPublic.tsx`; wire into `page.tsx`.
7. Soften `ServicesStrip` (finish), strengthen `ContactSection` follow CTA.
8. Remove theme toggle usage.
9. Verify: `npx tsc --noEmit` clean on app (ignore `Tools/`); `npm run build` succeeds; eyeball each section in `npm run dev`.

## Testing / Verification

- TypeScript: `npx tsc --noEmit` — no new errors in `app/` (pre-existing `Tools/` errors ignored).
- Build: `npm run build` completes without error.
- Visual: run `npm run dev`, confirm every section renders in navy/gold, no leftover cream/amber, no broken light-mode references, Building-in-Public renders with at least one post.
- No em-dashes in any user-visible prose (carry over the LinkedIn rule).

## Risks / Mitigations

- **Hardcoded colors missed** → grep sweep before declaring done; visual pass catches stragglers.
- **Light-mode removal breaks a component referencing light tokens** → search for theme/`dark:` usage; test build.
- **Live site auto-deploys from main** → the `v1-archive` branch + tag guarantee rollback; optionally rebuild on a branch and merge once verified (decide at implementation time).
- **Fraunces load/FOUT** → use `next/font` with `display: swap` and proper subsets.

## Open Items (fill at implementation)

- Real blurbs/URLs for Hisaab / Toolbelt / Promptly (ask Shahzaib; use placeholders flagged in-file if unknown).
- Confirm whether to rebuild on a feature branch + merge, or build directly on main (default: direct on main since `v1-archive` exists as backup).
