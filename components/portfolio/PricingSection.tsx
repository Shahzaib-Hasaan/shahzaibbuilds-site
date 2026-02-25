'use client';

import React, { useEffect } from 'react';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import EmailGateModal from '../EmailGateModal';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter Automation',
    price: '$2,500',
    period: 'one-time',
    description: 'Perfect for testing automation with a single workflow',
    features: [
      '1 automated workflow',
      'CRM/Email/Slack integration',
      '2 weeks delivery',
      '30-day support included',
      'Documentation & training',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'voice-agent',
    name: 'Voice Agent Deploy',
    price: '$5,000',
    period: 'one-time',
    recurring: '$200/mo hosting',
    description: 'AI voice agent that handles calls 24/7',
    features: [
      'Custom voice agent built',
      'Lead qualification logic',
      'CRM integration',
      'Unlimited calls included',
      'Ongoing optimization',
      '3 weeks delivery',
    ],
    cta: 'Deploy Voice Agent',
    popular: true,
    badge: '🔥 3 spots left this month',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Consulting',
    price: 'Custom',
    period: 'monthly retainer',
    description: 'Full automation strategy and implementation',
    features: [
      'Operations audit included',
      'Custom AI roadmap',
      'Multiple automations',
      'Dedicated support',
      'Priority implementation',
      'Quarterly strategy reviews',
    ],
    cta: 'Discuss Your Needs',
    popular: false,
  },
];

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  useEffect(() => {
    // Track pricing section view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof window !== 'undefined' && (window as any).trackPricingViewed) {
            (window as any).trackPricingViewed();
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('pricing');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="pricing" className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-6">
            <Zap className="w-4 h-4 text-electric-blue" />
            <span className="text-sm font-medium text-electric-blue">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Clear Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            No hidden fees. No surprises. Choose the package that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card premium-border interactive-card p-8 relative ${
                tier.popular ? 'ring-2 ring-electric-blue' : ''
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-electric-blue to-code-green rounded-full text-sm font-semibold text-white whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              {tier.popular && (
                <div className="absolute -top-4 right-4 px-3 py-1 bg-electric-blue rounded-full text-xs font-semibold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  POPULAR
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">{tier.period}</span>
                </div>
                {tier.recurring && (
                  <p className="text-sm text-gray-400 mt-1">+ {tier.recurring}</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-code-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setSelectedTier(tier.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-electric-blue to-code-green text-white hover:shadow-lg hover:shadow-electric-blue/20'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="glass-card p-6 text-center">
          <p className="text-gray-300 mb-4">
            <span className="text-white font-semibold">Not sure which package is right?</span> Book a free 30-minute consultation to discuss your needs.
          </p>
          <button
            onClick={() => setSelectedTier('consultation')}
            className="inline-flex items-center gap-2 text-electric-blue hover:text-code-green transition-colors font-medium"
          >
            Schedule Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            ✓ 30-day money-back guarantee &nbsp;•&nbsp; ✓ GDPR compliant &nbsp;•&nbsp; ✓ 24hr response time
          </p>
        </div>
      </div>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={selectedTier !== null}
        onClose={() => setSelectedTier(null)}
        source="calendly_gate"
        title={
          selectedTier === 'consultation'
            ? 'Book Your Free Consultation'
            : 'Get Started with ' + pricingTiers.find(t => t.id === selectedTier)?.name
        }
        description="Enter your email to continue. I'll send you the booking link instantly."
      />
    </section>
  );
}
