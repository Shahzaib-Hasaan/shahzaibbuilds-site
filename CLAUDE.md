# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# PURPOSE & AUDIENCE — Read This First Before Any Task

## Who I Am

- **Name:** Shahzaib Hassan | **Brand:** Shahzaib Builds | **Handle:** @shahzaib_builds
- **Role:** AI Automation Engineer @ Automaxion (Lahore, Pakistan)
- **Background:** Self-taught pre-med → AI; BS Artificial Intelligence from IUB (graduated Jan 2026, CGPA 3.65)
- **Additional roles:** Educator (Python bootcamps, TA for AI certificate course), co-founder of Neurafinity Club at IUB, public speaker

> **Full knowledge base:** The authoritative, up-to-date context about Shahzaib lives in [`context/`](./context/). Load `context/README.md` first to see the section map, then pull only the files relevant to the current task. Do NOT duplicate that content here.

## What This Site Is

**A personal presence hub — not a sales funnel.**

It serves multiple overlapping purposes:

1. **Credibility + identity** — a central place people land when they search "Shahzaib Hassan" or arrive from social/DMs
2. **Scholarship applications** — Shahzaib is aggressively applying to international scholarships; the site should stand up as a professional reference for reviewers
3. **Professional profile** — recruiters, collaborators, potential clients, and students use it to understand his work
4. **SEO / ranking** — the blog exists specifically to rank for his name and topics he teaches/builds

## Who Visits This Site

- Scholarship reviewers and academic evaluators
- Recruiters (especially Gulf/Europe — he is actively seeking international roles)
- Students, juniors, and former course attendees
- Potential freelance/consulting clients (still welcome — the Services section stays)
- Collaborators on AI/automation projects
- General curious visitors from social media or referrals

**Tone for all copy and design decisions:** professional, honest, specific. Not salesy. Not hype-driven. Credibility over conversion.

## What This Site Is NOT

- ~~A B2B sales funnel~~ (it used to be — that framing is retired)
- ~~Calendly-driven booking pipeline~~ (no pushy booking CTAs — Calendly exists only for freelance inquiries via the chatbot)
- ~~Email capture / lead gen~~ (no gated content, no exit-intent modals)

Most of the funnel-era code (email gating, exit-intent modal, lead-magnet PDF, download API, Calendly CTAs in sections) has already been removed. Planning docs from that era are archived under [`docs/archive/`](./docs/archive/). If you spot any leftover funnel references while working on a task, flag them for cleanup rather than extending them.

## Editorial Principles

- **Honesty over inflation.** Shahzaib has ~6 months professional experience + strong self-taught + university/teaching depth. Own it plainly; don't claim Fortune-500 case studies.
- **Specificity over buzzwords.** "Self-hosted n8n on a personal VPS" beats "leveraging enterprise-grade infrastructure."
- **Identity first, services second.** Who he is → what he's done → what he offers. Not the reverse.
- **Scholarship-safe.** Anything a reviewer or academic would find cringe, overclaiming, or unprofessional has to go.

## What to Keep vs. Add

**Keep:**
- Current visual design (warm cream background `#F0ECE3`, amber accent `#D97706`, teal accent `#0F766E`, serif + sans + mono type pairing). Do not revert to the old dark theme.
- Custom chatbot — persona is now "answers questions about Shahzaib for visitors, recruiters, and scholarship reviewers." Not a sales bot.
- Blog (for SEO ranking on his name and topics)
- Services section — he still takes freelance/consulting inquiries
- Contact section — plain email + socials, with a line noting he is open to **scholarship recommendations, research collaboration, and freelance**
- `lib/booking.ts` — the **only** place the Calendly URL lives. If you need to link to booking anywhere, import from here. Do not hardcode Calendly URLs.

**Add (phased, as Shahzaib directs):**
- Photo gallery — teaching moments, university events, Neurafinity activities, project milestones (categories TBD)
- Expanded academic/achievements content suitable for scholarship reviewers (PM Laptop Award, Neurafinity co-founder, TA role, Stanford Code in Place, etc.)
- More blog posts (n8n self-hosting, agentic AI, teaching notes, project deep-dives)

---

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type check (tsc --noEmit)
```

Deployed on Netlify via `@netlify/plugin-nextjs`. Build command: `npx next build`, publish dir: `.next`.

## Architecture

**Next.js 13 App Router** with a single-page layout. Sections are composed in `app/page.tsx`.

### Chatbot

The visitor-facing chat is [components/ChatAssistant.tsx](components/ChatAssistant.tsx), backed by [app/api/chat/route.ts](app/api/chat/route.ts) (Groq + Mistral fallback). Persona: answer questions about Shahzaib for visitors, recruiters, and scholarship reviewers — friendly, honest, specific; never pushy or sales-driven. Session ID and history are persisted in localStorage. When updating the chatbot's system prompt, pull facts from `context/` — do not hardcode bios. The Calendly URL in the prompt is imported from `lib/booking.ts`.

### Blog

Markdown-based blog at `content/blog/` with Zod-validated frontmatter (`lib/blog.ts`). Primarily exists to rank for Shahzaib's name and the topics he teaches/builds. `/blog` index + `/blog/[slug]` routes.

### Styling conventions

- Warm light theme. Key colors used across sections:
  - Background: `#F0ECE3` (cream)
  - Primary text: `#1C1C1C`
  - Muted text: `#6B7280`
  - Amber accent: `#D97706` (primary accent, used on hover/CTAs)
  - Teal accent: `#0F766E` (for status badges like "Currently @ Automaxion")
  - Border/divider: `#E5E1D8`
- Typography: serif for headings, sans (Inter) for body, mono (JetBrains Mono) for emails/code/labels.
- Use `cn()` from `lib/utils.ts` for conditional Tailwind class merging.

### Booking

If any feature needs the Calendly URL, import it from [lib/booking.ts](lib/booking.ts). Do **not** hardcode the URL anywhere else. `getBookingUrl(email?)` returns the URL with an optional email pre-fill.

### UI components

`components/ui/` follows the shadcn/ui pattern. Many files are currently unused — when touching this directory, feel free to delete components that aren't imported anywhere.

### Analytics

GA4 is loaded in `app/layout.tsx` for basic page-view tracking. The old funnel-specific `window.track*` helpers have been removed — don't reintroduce them.

### Path alias

`@/*` resolves to the project root (configured in `tsconfig.json`).

---

## Audit Mindset (For Any Analysis Task)

- Judge through the eyes of a **scholarship reviewer** and a **recruiter**, not a skeptical US founder.
- Flag anything that feels salesy, inflated, or inconsistent with the context files.
- Prefer fewer, more specific claims over many vague ones.
- Quote specific component names, file paths, or copy when flagging issues.
