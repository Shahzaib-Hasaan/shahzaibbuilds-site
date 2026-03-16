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
    name: 'Strives.ai',
    tagline: 'Autonomous social media that runs itself.',
    story:
      'Most businesses treat social media as a chore. Brainstorm ideas, write posts, schedule them, repeat. Strives.ai removes the human from that loop entirely. I built an end-to-end autonomous system that handles ideation, content creation, and posting across platforms without anyone pressing a button. The interesting challenge was making AI-generated content feel genuinely on-brand, not generic. The whole pipeline runs on Make.com orchestrating Airtable and multiple AI APIs, each handling a different piece of the creative process.',
    tech: ['Make.com', 'Airtable', 'AI APIs', 'Social Media APIs'],
    accent: 'amber',
  },
  {
    name: 'Sentience',
    tagline: 'AI-powered cold outreach that actually converts.',
    story:
      'Cold email is a numbers game, unless you make every email personal. Sentience automates the entire outbound pipeline: it sources leads, enriches them with company and role data, then generates hyper-personalized email sequences tailored to each prospect. Follow-ups are automatic and contextual. What made this project challenging was the enrichment layer. Stitching together multiple data sources to build a prospect profile rich enough for AI to write something a human would actually reply to. The result is outreach that scales without losing the personal touch.',
    tech: ['Airtable', 'Make.com', 'Instantly', 'AI APIs', 'Data Enrichment'],
    accent: 'teal',
  },
  {
    name: 'ANESI',
    tagline: 'A data enrichment dashboard built from scratch.',
    story:
      'This one is different from the rest. No automation platform involved. ANESI is a full Next.js application with a custom multi-step data pipeline. You feed it a company name, and it runs through search, enrichment, and detail extraction stages using custom API integrations. The UI surfaces everything in a clean dashboard so the user never has to touch a spreadsheet. I built this because sometimes off-the-shelf tools add more friction than they remove. When you need complete control over the data flow, you build it yourself.',
    tech: ['Next.js', 'Custom APIs', 'Data Pipeline', 'React', 'TypeScript'],
    accent: 'amber',
  },
  {
    name: 'StressProofed',
    tagline: 'Psychological assessment turned into software.',
    story:
      'StressProofed takes an 18-question psychological assessment and turns it into an automated experience. A user fills out a Typeform, which triggers a custom scoring algorithm that calculates their decision stability profile. The system generates a personalized PDF report and delivers it via email through ActiveCampaign. The tricky part was translating a psychologist\'s scoring methodology into reliable code. The algorithm needed to produce clinically meaningful results, not just numbers. Every edge case in scoring had to match what the psychologist would do by hand.',
    tech: ['Typeform', 'Custom Algorithm', 'PDF Generation', 'ActiveCampaign'],
    accent: 'teal',
  },
  {
    name: 'AI Slide Generator',
    tagline: 'Upload a document, get an AI teaching assistant.',
    story:
      'Built as an internal tool at Automaxion, this system takes PDF or DOCX files and breaks them into chapters, then generates teaching slides from the content. But it goes further. Each slide comes with AI-narrated voice explanations via ElevenLabs, and there\'s a quiz after each section to test comprehension. It turns static documents into interactive learning experiences. The architecture had to handle wildly different document structures while producing consistent, well-paced educational content.',
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
