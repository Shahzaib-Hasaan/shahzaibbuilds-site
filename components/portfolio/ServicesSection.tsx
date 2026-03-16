'use client';

import { motion } from 'framer-motion';
import { Workflow, Phone, Code, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Connecting your CRMs, email, Slack, and everything in between. I build custom automations using n8n (self-hosted or cloud), Make.com, and Zapier. Designed around how your team actually works.',
    techStack: ['n8n', 'Make.com', 'Zapier', 'Airtable', 'Python'],
  },
  {
    icon: Phone,
    title: 'AI Voice Agents',
    description:
      'Inbound and outbound voice bots that handle lead qualification, appointment booking, and customer support. Natural-sounding voices, low latency.',
    techStack: ['VAPI', 'Retell', 'ElevenLabs', 'Python', 'OpenAI'],
  },
  {
    icon: Code,
    title: 'Custom AI Applications',
    description:
      'Full-stack applications with AI baked in. Dashboards, data pipelines, internal tools. Built with modern frameworks and deployed to production.',
    techStack: ['Next.js', 'Python', 'OpenAI', 'Airtable'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#FAFAF5]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1C1C] mb-4">
            What I can build for you
          </h2>
          <p className="text-[#6B7280] font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Practical automation and AI solutions. No fluff, no buzzwords.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-[#E5E1D8] p-7 sm:p-8 hover:shadow-md hover:border-[#D97706]/30 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 flex items-center justify-center mb-6 group-hover:bg-[#D97706]/15 transition-colors">
                  <service.icon className="w-6 h-6 text-[#D97706]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1C1C] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#6B7280] font-sans text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-3 py-1 text-xs font-mono text-[#0F766E] bg-[#0F766E]/8 rounded-full border border-[#0F766E]/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-14 sm:mt-18"
        >
          <p className="text-[#6B7280] font-sans text-base sm:text-lg mb-5">
            Have a project in mind?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-sans text-base font-medium text-[#D97706] hover:text-[#B45309] transition-colors group/cta"
          >
            Let&apos;s talk
            <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
