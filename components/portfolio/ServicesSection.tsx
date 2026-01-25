'use client';

import { motion } from 'framer-motion';
import { Phone, Workflow, Search, ArrowUpRight, Code } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'AI Voice Agents',
    description:
      '24/7 Inbound/Outbound callers that handle customer support & lead qualification with human-like latency.',
    features: ['Lead Qualification', 'Customer Support', '24/7 Availability', 'Human-like Latency'],
    techStack: ['VAPI', 'Python', 'OpenAI', 'Twilio'],
    accent: 'electric-blue',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Connecting CRM, Email, and Slack to run on autopilot using Make.com & Python.',
    features: ['CRM Integration', 'Email Automation', 'Slack Workflows', 'Custom Pipelines'],
    techStack: ['Make.com', 'Python', 'Zapier', 'APIs'],
    accent: 'code-green',
  },
  {
    icon: Search,
    title: 'Custom Consulting',
    description:
      'Auditing business operations and building a roadmap to cut costs with AI.',
    features: ['Operations Audit', 'Cost Analysis', 'AI Roadmap', 'Implementation Support'],
    techStack: ['Strategy', 'Analysis', 'Planning', 'Execution'],
    accent: 'electric-blue',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-12 sm:py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block font-mono text-sm text-code-green mb-4">
            {'// SERVICES'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            How I Help
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Deploying AI employees for lean teams. No fluff, just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-6 sm:p-8 glass-card rounded-xl premium-border interactive-card">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${service.accent === 'electric-blue'
                    ? 'bg-electric-blue/10 text-electric-blue glow-blue'
                    : 'bg-code-green/10 text-code-green glow-green'
                    }`}
                >
                  <service.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-mono font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${service.accent === 'electric-blue'
                          ? 'bg-electric-blue'
                          : 'bg-code-green'
                          }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1.5 mb-6 flex-wrap">
                  <Code className="w-3.5 h-3.5 text-gray-400" />
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={service.accent === 'electric-blue' ? 'tech-badge' : 'tech-badge-green'}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 relative z-10">
                  <a
                    href="https://calendly.com/shahxeebhassan/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-electric-blue transition-colors group/link relative z-20"
                  >
                    Discuss This
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
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
            <span>Get Custom Solution</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
