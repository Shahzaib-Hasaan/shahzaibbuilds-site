'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Mail, Sparkles } from 'lucide-react';
import { submitEmail, getCalendlyUrl } from '@/lib/emailCapture';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: 'calendly_gate' | 'exit_intent' | 'chatbot' | 'lead_magnet';
  title?: string;
  description?: string;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  source = 'calendly_gate',
  title = 'Book Your Free Automation Audit',
  description = 'Get your email to secure your spot. I\'ll send you the Calendly link instantly.',
}: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitEmail({
        email,
        challenge: challenge || undefined,
        source,
        timestamp: Date.now(),
      });

      if (success) {
        // Redirect to Calendly with pre-filled email
        window.location.href = getCalendlyUrl(email);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
          <div className="glass-card premium-border p-6 sm:p-8 mx-4">
            <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </Dialog.Close>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-code-green flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <Dialog.Title className="text-2xl font-bold text-white">
                {title}
              </Dialog.Title>
            </div>

            <Dialog.Description className="text-gray-300 mb-6">
              {description}
            </Dialog.Description>

            <div className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg p-3 mb-6 flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
              <p className="text-sm text-electric-blue font-medium">
                Limited: Only 5 audit slots available this week
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSubmitting) {
                        handleSubmit(e);
                      }
                    }}
                    placeholder="you@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-gray-300 mb-2">
                  What&apos;s your biggest automation challenge? (Optional)
                </label>
                <textarea
                  id="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="e.g., Manual lead qualification taking 10hrs/week"
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all resize-none disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-electric-blue to-code-green text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-electric-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Continue to Calendly →'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your information is secure and will never be shared.
              </p>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
