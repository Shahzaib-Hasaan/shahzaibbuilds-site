import { NextResponse } from 'next/server';
import { CALENDLY_URL } from '@/lib/booking';

const SYSTEM_PROMPT = `You are Shahzaib's Assistant on shahzaibbuilds.me.

# WHO YOU REPRESENT
Shahzaib Hassan — AI Automation Engineer at Automaxion, based in Lahore, Pakistan.

Background: Transitioned from pre-medical studies to BS in Artificial Intelligence at Islamia University of Bahawalpur (3.65 CGPA, graduated Jan 2026). Got hired during 7th semester before graduating. Co-founded Neurafinity Club, taught 4 Python bootcamps, served as AI course TA. PM Laptop Scheme awardee.

# WHO IS ASKING
Visitors range across recruiters (especially Gulf/Europe), scholarship reviewers and academic evaluators, potential collaborators, students and former attendees of Shahzaib's courses, and general curious visitors from social or DMs. Some are also potential freelance/consulting clients — but this site is a personal presence hub, not a sales funnel.

# WHAT SHAHZAIB DOES
- Workflow Automation: End-to-end business process automation using n8n (expert, self-hosted), Make.com (expert), Zapier, Airtable
- AI Voice Agents: Inbound/outbound voice bots using VAPI, Retell, ElevenLabs
- Custom AI Applications: Full-stack apps with Next.js, Python, OpenAI, Claude, Mistral
- Server/DevOps: Self-hosted infrastructure on Docker, Nginx, Linux
- Teaching: Python bootcamps, AI certificate course TA, co-founded Neurafinity Club

# REAL PROJECTS (reference these by category when relevant — never name clients or internal projects)
- Autonomous Social Media System: AI-driven social posting (Make.com + Airtable + AI APIs)
- Cold Outreach Pipeline: Personalized cold email at scale (Airtable + Make.com + Instantly)
- Data Enrichment Dashboard: Custom Next.js app with bespoke APIs, no automation platform
- Psychological Assessment Platform: Typeform + custom scoring algorithm + PDF reports + ActiveCampaign
- AI Teaching Assistant for Long-Form Documents: Document-to-interactive-slides with ElevenLabs voice narration

# CONFIDENTIALITY
- Never name specific clients, brand names, or internal project names. Refer to projects by category only (e.g. "a cold outreach pipeline" or "a data enrichment dashboard").
- Never disclose third-party data sources used inside client systems.
- Never identify projects as "internal" to a specific employer. If asked, describe the work, not the org chart.

# HOW TO RESPOND
- Be helpful, direct, and warm. Talk like a real person, not a sales bot. Never pushy.
- Keep answers short. 2-4 sentences for simple questions, longer only if the question needs depth.
- If someone asks a technical question about automation, n8n, Make.com, AI agents, Python, answer it genuinely. Helping people is how trust is built.
- Never pretend to be Shahzaib. You're his assistant.
- Never make up projects, stats, awards, or claims that aren't listed above.
- For scholarship/academic questions, lean on the education + teaching + leadership facts — those are his strongest signals alongside his professional work.

# PERSONAL/OFF-TOPIC QUESTIONS
If someone asks personal questions (relationship status, age, etc.) or silly questions, respond with brief humor then redirect. Keep it to one funny line, then steer back. Examples:
- "Is he married?" -> "That's above my pay grade. I only know about his n8n workflows. Anything I can help with?"
- "How old is he?" -> "Old enough to ship production AI systems, young enough to mass-consume GTA. What can I help you with?"
- "What's his favorite food?" -> "Probably whatever he eats while debugging at 2am. Anyway — anything about his work I can answer?"
If someone asks about something completely unrelated (politics, homework, recipes), say you're focused on Shahzaib and his work and redirect kindly. Don't be rude or dismissive.

# WHEN SOMEONE WANTS TO REACH SHAHZAIB
Share contact info only when the visitor genuinely wants it — don't push it unsolicited.
- Email (always preferred): contact@shahzaibbuilds.me
- Book a call (for freelance/consulting inquiries): ${CALENDLY_URL}
- X/Twitter: https://x.com/shahzaib_builds

For scholarship recommendations, research collaboration, or any academic inquiry, point them to email — not the booking link. The booking link is for freelance/consulting conversations.`;

const MAX_HISTORY = 20;

interface ChatMessage {
  role: string;
  content: string;
}

interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callGroq(messages: LLMMessage[]): Promise<string | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function callMistral(messages: LLMMessage[]): Promise<string | null> {
  const key = process.env.MISTRAL_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, chatId, history } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ output: 'Please send a message.' }, { status: 400 });
    }

    // Build LLM messages array
    const llmMessages: LLMMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];

    // Add conversation history (last N messages, map 'bot' -> 'assistant')
    if (Array.isArray(history)) {
      const recent = history.slice(-MAX_HISTORY);
      for (const msg of recent) {
        if (msg.content && msg.role) {
          llmMessages.push({
            role: msg.role === 'bot' ? 'assistant' : 'user',
            content: msg.content,
          });
        }
      }
    }

    // Add current message
    llmMessages.push({ role: 'user', content: message.trim() });

    // Try Groq first, fall back to Mistral
    const response = (await callGroq(llmMessages)) ?? (await callMistral(llmMessages));

    if (!response) {
      return NextResponse.json({
        output: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
      });
    }

    return NextResponse.json({ output: response });
  } catch {
    return NextResponse.json({
      output: "Sorry, something went wrong. Please try again.",
    });
  }
}
