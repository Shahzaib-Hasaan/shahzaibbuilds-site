export interface OpenSourceProject {
  name: string;
  tagline: string;
  details: string;
  highlights: string[];
  tech: string[];
  repo: string;
  /** SPDX id, or a short label when the repo has no licence file. */
  license: string;
  /** Extra link, e.g. a download page on this site. */
  extra?: { label: string; href: string };
}

/** Public on github.com/Shahzaib-Hasaan. Details come from each repo's README. */
export const openSource: OpenSourceProject[] = [
  {
    name: 'Telegram Order Agent',
    tagline: 'AI order-taking for restaurants. The AI never touches money.',
    details:
      'Customers order through Telegram in English, Roman Urdu or a mix. An AI agent matches what they say to the real menu, collects delivery details and shows a cart they confirm with a button. The interesting part is where the rules live: prices, minimums, delivery fees and order states are enforced in Postgres, not in the prompt, so swapping the model changes nothing about correctness.',
    highlights: [
      'Orders are placed only by a button press, never by typing "ok"',
      'Live kitchen board that messages the customer on every status change',
      'The agent has exactly seven database tools and cannot write its own SQL',
    ],
    tech: ['n8n', 'Postgres', 'Next.js', 'Telegram Bot API'],
    repo: 'https://github.com/Shahzaib-Hasaan/telegram-order-agent',
    license: 'MIT',
  },
  {
    name: 'YTDM',
    tagline: 'A fast, modern download manager for YouTube.',
    details:
      'A desktop app in the style of IDM, built for YouTube. Paste a video or a playlist, pick a quality, and it downloads in a managed queue that survives crashes and restarts. Its download engine updates itself independently, so YouTube changes do not break it.',
    highlights: [
      'Queue with pause, resume, retry and crash recovery',
      'Playlists, subtitles, quality presets and a bandwidth cap',
      'Self-updating app and engine, builds produced by GitHub Actions',
    ],
    tech: ['Electron', 'TypeScript', 'yt-dlp', 'FFmpeg'],
    repo: 'https://github.com/Shahzaib-Hasaan/ytdm',
    license: 'MIT',
    extra: { label: 'Download', href: '/ytdm' },
  },
  {
    name: 'Memory-Mate',
    tagline: 'An AI chat assistant that remembers you between sessions.',
    details:
      'A chat assistant with persistent, per-user memory. It keeps the important facts from each conversation and a running summary, stored in SQLite, so the next session starts with context instead of from zero.',
    highlights: [
      'User-specific long-term memory and conversation summaries',
      'Simple username sign-in, responsive chat interface',
    ],
    tech: ['Python', 'Agno', 'Streamlit', 'SQLite'],
    repo: 'https://github.com/Shahzaib-Hasaan/Memory-Mate',
    license: 'MIT',
  },
  {
    name: 'AI Surrogate',
    tagline: 'Final year project: an assistant that acts, with you approving.',
    details:
      'An agentic mobile assistant built for the BS Artificial Intelligence final year project at IUB. It chats with memory, drafts Gmail replies that you edit and approve before they send, and schedules meetings through conversation, in English, Urdu and Punjabi.',
    highlights: [
      'Human approval step before anything leaves the app',
      'Voice input and spoken replies',
    ],
    tech: ['FastAPI', 'React Native', 'Mistral', 'OpenAI', 'Postgres'],
    repo: 'https://github.com/Shahzaib-Hasaan/Ai-Surrogate',
    license: 'FYP, public repo',
  },
];

/** Client and internal systems. Named by category only, no details. */
export const clientWork: { name: string; stack: string }[] = [
  { name: 'Autonomous social media system', stack: 'Make.com, Airtable, LLM APIs' },
  { name: 'Cold outreach pipeline', stack: 'Airtable, Make.com, Instantly' },
  { name: 'Data enrichment dashboard', stack: 'Next.js, custom APIs' },
  { name: 'Psychological assessment automation', stack: 'Custom scoring, PDF reports, ActiveCampaign' },
  { name: 'AI teaching assistant for long documents', stack: 'ElevenLabs narration, quizzes' },
  { name: 'Self-hosted infrastructure for all of the above', stack: 'Linux, Docker, Nginx' },
];
