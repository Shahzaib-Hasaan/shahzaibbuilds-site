
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


# BUSINESS CONTEXT — Read This First Before Any Task

## Who I Am
- Name: Shahzaib Hassan | Brand: Shahzaib Builds | Handle: @shahzaib_builds
- AI Automation Engineer @ Automaxion, Lahore Pakistan
- Tagline: "Deploying AI employees for lean teams"
- Self-taught: Classical AI → GenAI → Agentic AI specialist
- I build custom self-hosted infra (not a "prompt guy") — this is a credibility signal

## Target Client (Judge everything through their eyes)
- Busy startup founders, business owners, non-technical leads
- Geography: Gulf, US, Europe — NOT local Pakistan market
- Pain: Drowning in manual ops — CRM management, inbound calls, lead qualification
- They're skeptical, time-poor, and decide within 10 seconds whether to trust me
- They're likely arriving from a cold DM on LinkedIn/X or a referral

## The ONE Job This Website Has
→ Get the visitor to click "Book a 15-Min Audit" (Calendly)

This is NOT a portfolio. It is a B2B sales funnel.
Every design, copy, and technical decision must serve conversion.
If it doesn't move someone toward booking — it's either neutral or harmful.

## Core Services
1. AI Voice Agents — 24/7 inbound/outbound, human-like latency
   - Voice platforms: VAPI, Retell, Regal (+ others as needed)
2. Workflow Automation — connecting CRMs, email, Slack on autopilot
   - Primary tool: n8n (self-hosted, custom infra — key credibility signal)
   - Also works with: Make.com, Zapier — picks best tool per client need
3. Custom Consulting — AI ops audits and roadmaps

## Tool Stack
- **Workflow automation (primary):** n8n (self-hosted)
- **Workflow automation (also uses):** Make.com, Zapier
- **Voice agents:** VAPI, Retell, Regal
- **AI/LLM:** Python, OpenAI, Groq
- **Infra:** Self-hosted preferred; cloud when required

## Value Proposition
"I replace manual operations with intelligent autonomous agents, saving businesses 20+ hours/week."

## Audit Mindset (For Any Analysis Task)
- Be ruthless. No sugarcoating.
- Imagine a skeptical US/EU founder landing here at 11pm after a cold DM
- Flag anything that reduces trust, adds friction, or distracts from the CTA
- Prioritize findings by BUSINESS IMPACT, not technical elegance
- Quote specific component names, file paths, or copy when flagging issues

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

**Next.js 13 App Router** with a single-page portfolio layout. All sections are composed in `app/page.tsx`.

### Key flows

**Email capture / Calendly gating** — Every CTA button first calls `isEmailCaptured()` from `lib/emailCapture.ts` (checks localStorage with 24h expiry). If no email, it shows `EmailGateModal`; on success, `submitEmail()` POSTs to the n8n webhook and redirects to Calendly with `?email=` pre-filled. If already captured, goes directly to Calendly.

**Exit intent** — `ExitIntentWrapper` uses `useExitIntent` hook (mouse leaving top of viewport, desktop only, once per session via sessionStorage) to show `ExitIntentModal`, which captures email and auto-triggers a PDF download via `GET /api/download?file=5-automations-checklist`.

**Chatbot** — `CustomChatbot.tsx` POSTs to `https://n8n.shahzaibai.site/webhook/website-message`. Session ID and chat history are persisted in localStorage. Response parsing handles string, array, or object shapes from n8n.

### n8n webhook endpoints

- `https://n8n.shahzaibai.site/webhook/email-capture` — email submissions
- `https://n8n.shahzaibai.site/webhook/website-message` — chatbot messages

### Styling conventions

- Dark theme throughout. Key custom colors: `electric-blue` (#3B82F6), `code-green` (#10B981), `dark-bg` (#050505), `dark-surface` (#0a0a0a).
- Fonts: `Inter` (body, `--font-inter`), `JetBrains Mono` (mono, `--font-mono`).
- Use `cn()` from `lib/utils.ts` for conditional Tailwind class merging.
- `.glass-card` is a custom component class defined in `globals.css`.
- Custom Tailwind animations: `blink` (cursor), `gradient-x`, `glow`.

### Analytics

GA4 (`G-BPJFLR0JE9`) is loaded in `app/layout.tsx`, which also injects global tracking helpers on `window`: `trackEmailCapture(method)`, `trackExitIntent(action)`, `trackCalculatorInteraction()`, `trackPricingViewed()`. Call these when adding new conversion touchpoints.

### UI components

`components/ui/` follows the shadcn/ui pattern — Radix UI primitives styled with Tailwind. Add new primitives there, not inline.

### Path alias

`@/*` resolves to the project root (configured in `tsconfig.json`).
