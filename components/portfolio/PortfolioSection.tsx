'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink, Bot, MessageSquare, Database } from 'lucide-react';

const projects = [
  {
    title: 'AI Voice Agent',
    description: 'Built a 24/7 inbound voice agent for lead qualification. Handles 200+ calls daily with human-like latency.',
    icon: Bot,
    tags: ['Voice AI', 'Lead Gen', 'Python'],
    metrics: '200+ calls/day',
    color: 'electric-blue',
  },
  {
    title: 'CRM Automation Bot',
    description: 'Automated customer data sync between Salesforce, HubSpot, and internal systems. Zero manual entry.',
    icon: Database,
    tags: ['CRM', 'Make.com', 'API'],
    metrics: '15hrs saved/week',
    color: 'code-green',
  },
  {
    title: 'Support Chat Agent',
    description: 'Deployed an AI chatbot that handles 80% of customer inquiries without human intervention.',
    icon: MessageSquare,
    tags: ['Chatbot', 'NLP', 'Support'],
    metrics: '80% resolution',
    color: 'electric-blue',
  },
];

export default function PortfolioSection() {
  return (
    <section id="work" className="relative py-12 sm:py-24 md:py-32 bg-dark-surface/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block font-mono text-sm text-code-green mb-4">
            {'// RECENT DEPLOYS'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Work in Production
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Real systems. Real results. No mock-ups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full glass-card rounded-xl overflow-hidden premium-border interactive-card">
                <div className="relative aspect-video bg-gradient-to-br from-dark-bg to-dark-surface flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-code-green/5" />
                  <div className="absolute inset-0 noise-bg" />
                  <div
                    className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center ${
                      project.color === 'electric-blue'
                        ? 'bg-electric-blue/20 text-electric-blue'
                        : 'bg-code-green/20 text-code-green'
                    }`}
                  >
                    <project.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-bg/90 backdrop-blur-sm">
                    <button className="flex items-center gap-2 px-5 py-3 bg-electric-blue hover:bg-electric-blue-hover text-white rounded-lg font-medium text-sm glow-blue transition-all hover:scale-105">
                      <Play className="w-4 h-4" />
                      View Demo
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-mono font-semibold text-white group-hover:text-electric-blue transition-colors">
                      {project.title}
                    </h3>
                    <span
                      className={`shrink-0 px-2.5 py-1 text-xs font-mono rounded-md ${
                        project.color === 'electric-blue'
                          ? 'bg-electric-blue/10 text-electric-blue border border-electric-blue/20'
                          : 'bg-code-green/10 text-code-green border border-code-green/20'
                      }`}
                    >
                      {project.metrics}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono bg-dark-surface border border-white/10 rounded text-gray-400 hover:border-electric-blue/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 sm:mt-12"
        >
          <a
            href="https://calendly.com/shahxeebhassan/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Your Own Deploy
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
