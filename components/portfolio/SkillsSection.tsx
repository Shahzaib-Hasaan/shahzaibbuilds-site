'use client';

import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: 'Automation',
    skills: ['n8n', 'Make.com', 'Zapier', 'Airtable', 'Instantly', 'ActiveCampaign'],
  },
  {
    category: 'AI / ML',
    skills: ['OpenAI', 'Claude', 'Mistral', 'CrewAI', 'TensorFlow', 'Scikit-learn', 'OpenCV'],
  },
  {
    category: 'Voice AI',
    skills: ['VAPI', 'Retell', 'ElevenLabs', 'Bland AI'],
  },
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'HTML/CSS', 'C++', 'Java'],
  },
  {
    category: 'Web Dev',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
  },
  {
    category: 'DevOps',
    skills: ['Linux/Ubuntu', 'Docker', 'Nginx', 'AWS', 'Hetzner', 'DigitalOcean'],
  },
  {
    category: 'Tools',
    skills: ['Git/GitHub', 'Claude Code', 'Cursor', 'Playwright', 'ClickUp'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function SkillsSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#F0ECE3]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1C1C] mb-4">
            What I work with
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg max-w-2xl leading-relaxed">
            Tools and technologies I use regularly. Not a keyword dump. These are things I actually build with.
          </p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={itemVariants}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-3 py-1.5 text-sm font-sans text-[#1C1C1C] bg-white border border-[#E5E1D8] rounded-lg hover:border-[#D97706]/40 hover:text-[#D97706] transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
