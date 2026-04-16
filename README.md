# shahzaibbuilds.me

Personal website for **Shahzaib Hassan** — AI Automation Engineer, educator, and builder based in Lahore, Pakistan.

## What this site is

A personal presence hub. It exists to:

- Serve as a credible online profile for recruiters, collaborators, and scholarship reviewers
- Support scholarship applications with a professional reference point
- Host a blog that ranks for Shahzaib's name and the topics he works on
- Let curious visitors (from DMs, social, referrals) quickly understand who he is and what he's done

> **Authoritative context about Shahzaib lives in [`context/`](./context/)** — modular markdown files covering identity, education, experience, skills, teaching, values, and more.

## Sections

- **Hero** — identity and summary
- **About** — background, journey, academic story
- **Projects** — selected client and personal work
- **Skills** — technical stack (AI/ML, automation, web, DevOps)
- **Services** — freelance/consulting inquiries welcome
- **Blog** — essays and notes (primarily for SEO)
- **Contact** — email and socials; open to scholarship recommendations, research collaboration, and freelance
- **Chatbot** — visitor-facing assistant that answers questions about Shahzaib
- **Photo gallery** *(planned)* — teaching, university events, projects

## Tech stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI primitives:** Radix UI (shadcn/ui pattern)
- **Chatbot backend:** Groq (Mistral) via `app/api/chat/route.ts`
- **Deployment:** Netlify
- **Analytics:** GA4 + Vercel Analytics

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |

## Notes for contributors / future AI sessions

- See [CLAUDE.md](./CLAUDE.md) for purpose, editorial principles, and what to keep/remove/add.
- Prior sales-funnel code (email gating, exit-intent modals, Calendly CTAs, lead-capture) is being removed. Don't extend it — flag leftovers for cleanup.
- Treat `context/` as the source of truth for any factual claims about Shahzaib.
