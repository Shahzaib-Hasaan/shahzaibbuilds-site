'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  name: string;
  tagline: string;
  story: string;
  tech: string[];
  accent: 'amber' | 'teal';
}

const projects: Project[] = [
  {
    name: 'Autonomous Social Media System',
    tagline: 'Social posting that runs itself.',
    story:
      'The client wanted to post on social media consistently but never had the time. So I built a system that does the whole thing without anyone touching it. It comes up with content ideas, writes the posts, and publishes them on schedule. The hard part was getting AI-written content to actually sound like the brand and not like a robot. The pipeline uses Make.com to coordinate Airtable and a few AI APIs, each one handling a different step.',
    tech: ['Make.com', 'Airtable', 'AI APIs', 'Social Media APIs'],
    accent: 'amber',
  },
  {
    name: 'Cold Outreach Pipeline',
    tagline: 'Personalized cold email on autopilot.',
    story:
      'A full cold-email pipeline from start to finish. You feed it a list of prospects, and it generates personalized email sequences and sends them through Instantly. Follow-ups happen automatically based on whether someone opened or replied. The whole thing runs on Airtable as the data layer with Make.com handling the orchestration. The challenge was getting the personalization right so emails actually felt written by a human.',
    tech: ['Airtable', 'Make.com', 'Instantly', 'AI APIs'],
    accent: 'teal',
  },
  {
    name: 'Data Enrichment Dashboard',
    tagline: 'A data enrichment dashboard built from scratch.',
    story:
      'No automation platform for this one. A full Next.js app I built with custom API integrations. You give it a company name, and it runs through multiple stages: search, company enrichment, and detail extraction from third-party data sources. Everything shows up in a clean dashboard. The client needed complete control over their data pipeline, and no off-the-shelf tool gave them that. So I built it from scratch.',
    tech: ['Next.js', 'Custom APIs', 'Data Pipeline', 'React', 'TypeScript'],
    accent: 'amber',
  },
  {
    name: 'Psychological Assessment Platform',
    tagline: 'Clinical assessment turned into software.',
    story:
      'A psychologist had an 18-question assessment for measuring decision stability. They wanted it automated. I built the pipeline: user fills a Typeform, it triggers a custom scoring algorithm, generates a personalized PDF report, and delivers it through ActiveCampaign with follow-up sequences. The tricky part was getting the scoring exactly right. The algorithm had to match what the psychologist would calculate by hand, every edge case included.',
    tech: ['Typeform', 'Custom Algorithm', 'PDF Generation', 'ActiveCampaign'],
    accent: 'teal',
  },
  {
    name: 'AI Teaching Assistant for Long-Form Documents',
    tagline: 'Upload a document, get an AI teaching assistant.',
    story:
      'Built for an internal training need. You upload a PDF or Word doc, and the system breaks it into chapters and generates teaching slides. Each slide gets AI-narrated voice explanations through ElevenLabs, plus a quiz after each section. The hard part was handling completely different document structures and still producing slides that made sense. Not every document is organized the same way, so the parsing had to be flexible.',
    tech: ['ElevenLabs', 'AI APIs', 'PDF/DOCX Parsing', 'Quiz Engine'],
    accent: 'amber',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function ProjectsSection() {
  return (
    <section id="work" className="relative py-20 sm:py-28 md:py-36 bg-warm-alt">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight mb-4">
            Things I&apos;ve built
          </h2>
          <p className="text-ink-muted text-lg sm:text-xl max-w-2xl leading-relaxed">
            Real systems running in production. Not tutorials, not toy projects.
            Each one solved a problem someone was willing to pay for.
          </p>
        </motion.div>

        {/* Projects — editorial vertical stack */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, index) => {
            const isAmber = project.accent === 'amber';
            const accentColor = isAmber ? 'text-amber-accent' : 'text-teal-accent';
            const accentBorder = isAmber ? 'border-amber-accent' : 'border-teal-accent';
            const accentBg = isAmber ? 'bg-amber-subtle' : 'bg-teal-subtle';

            return (
              <motion.article
                key={project.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                {/* Project number + name */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className={`font-mono text-sm ${accentColor} opacity-70`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink">
                    {project.name}
                  </h3>
                </div>

                {/* Tagline */}
                <p className={`text-lg sm:text-xl font-medium ${accentColor} mb-6 ml-10 sm:ml-12`}>
                  {project.tagline}
                </p>

                {/* Story block */}
                <div
                  className={`warm-card rounded-xl p-6 sm:p-8 md:p-10 border-l-[3px] ${accentBorder} ml-0 sm:ml-12`}
                >
                  <p className="text-ink/85 text-base sm:text-lg leading-relaxed mb-6">
                    {project.story}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`tech-tag inline-flex items-center px-3 py-1 rounded-full text-xs font-mono ${accentBg} ${accentColor} border border-current/10`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider between projects (not after last) */}
                {index < projects.length - 1 && (
                  <div className="section-divider mt-16 sm:mt-24 border-t border-warm-border" />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
