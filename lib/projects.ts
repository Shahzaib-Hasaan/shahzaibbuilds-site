export type ProjectAccent = 'amber' | 'teal';

export interface Project {
  name: string;
  tagline: string;
  story: string;
  tech: string[];
  accent: ProjectAccent;
  /** Medical / biology analog for the v2 "path-not-taken" lens. Optional. */
  lens?: string;
}

export const projects: Project[] = [
  {
    name: 'Autonomous Social Media System',
    tagline: 'Social posting that runs itself.',
    story:
      'The client wanted to post on social media consistently but never had the time. So I built a system that does the whole thing without anyone touching it. It comes up with content ideas, writes the posts, and publishes them on schedule. The hard part was getting AI-written content to actually sound like the brand and not like a robot. The pipeline uses Make.com to coordinate Airtable and a few AI APIs, each one handling a different step.',
    tech: ['Make.com', 'Airtable', 'AI APIs', 'Social Media APIs'],
    accent: 'amber',
    lens: 'A circulatory system. Inputs become outputs continuously, no operator needed.',
  },
  {
    name: 'Cold Outreach Pipeline',
    tagline: 'Personalized cold email on autopilot.',
    story:
      'A full cold-email pipeline from start to finish. You feed it a list of prospects, and it generates personalized email sequences and sends them through Instantly. Follow-ups happen automatically based on whether someone opened or replied. The whole thing runs on Airtable as the data layer with Make.com handling the orchestration. The challenge was getting the personalization right so emails actually felt written by a human.',
    tech: ['Airtable', 'Make.com', 'Instantly', 'AI APIs'],
    accent: 'teal',
    lens: 'Triage. Read the chart, decide the response, follow up on the right cadence.',
  },
  {
    name: 'Data Enrichment Dashboard',
    tagline: 'A data enrichment dashboard built from scratch.',
    story:
      'No automation platform for this one. A full Next.js app I built with custom API integrations. You give it a company name, and it runs through multiple stages: search, company enrichment, and detail extraction from third-party data sources. Everything shows up in a clean dashboard. The client needed complete control over their data pipeline, and no off-the-shelf tool gave them that. So I built it from scratch.',
    tech: ['Next.js', 'Custom APIs', 'Data Pipeline', 'React', 'TypeScript'],
    accent: 'amber',
    lens: 'A diagnostic workup. Pull every signal, cross-reference, present a coherent picture.',
  },
  {
    name: 'Psychological Assessment Platform',
    tagline: 'Clinical assessment turned into software.',
    story:
      'A psychologist had an 18-question assessment for measuring decision stability. They wanted it automated. I built the pipeline: user fills a Typeform, it triggers a custom scoring algorithm, generates a personalized PDF report, and delivers it through ActiveCampaign with follow-up sequences. The tricky part was getting the scoring exactly right. The algorithm had to match what the psychologist would calculate by hand, every edge case included.',
    tech: ['Typeform', 'Custom Algorithm', 'PDF Generation', 'ActiveCampaign'],
    accent: 'teal',
    lens: 'Scoring an exam. Replace the manual rubric, keep every edge case the grader knew.',
  },
  {
    name: 'AI Teaching Assistant for Long-Form Documents',
    tagline: 'Upload a document, get an AI teaching assistant.',
    story:
      'Built for an internal training need. You upload a PDF or Word doc, and the system breaks it into chapters and generates teaching slides. Each slide gets AI-narrated voice explanations through ElevenLabs, plus a quiz after each section. The hard part was handling completely different document structures and still producing slides that made sense. Not every document is organized the same way, so the parsing had to be flexible.',
    tech: ['ElevenLabs', 'AI APIs', 'PDF/DOCX Parsing', 'Quiz Engine'],
    accent: 'amber',
    lens: 'A study guide writer. Read the textbook, break it into lessons, quiz at the end.',
  },
];
