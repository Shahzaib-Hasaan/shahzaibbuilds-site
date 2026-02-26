'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Download, Sparkles } from 'lucide-react';
import { submitEmail, getCalendlyUrl } from '@/lib/emailCapture';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    const success = await submitEmail({
      email,
      source: 'exit_intent',
      timestamp: Date.now(),
    });

    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exit_intent_converted');
      }

      // Trigger download immediately
      window.location.href = '/api/download?file=5-automations-checklist';
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          <div className="glass-card premium-border p-8 mx-4 relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-code-green/10 animate-pulse" />

            <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 transition-colors z-10">
              <X className="w-5 h-5 text-gray-400" />
            </Dialog.Close>

            <div className="relative z-10">
              {!isSuccess ? (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-code-green flex items-center justify-center animate-bounce">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <Dialog.Title className="text-3xl font-bold text-white text-center mb-3">
                    Before You Go! 👋
                  </Dialog.Title>

                  <Dialog.Description className="text-gray-300 text-center mb-6">
                    Get the <span className="text-electric-blue font-semibold">&quot;5 AI Automations Every Business Needs&quot;</span> checklist — free download, no strings attached.
                  </Dialog.Description>

                  <div className="bg-code-green/10 border border-code-green/30 rounded-lg p-4 mb-6">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-code-green flex-shrink-0 mt-0.5" />
                        <span>Save 30+ hours per week with proven automations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-code-green flex-shrink-0 mt-0.5" />
                        <span>Step-by-step implementation checklists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-code-green flex-shrink-0 mt-0.5" />
                        <span>Bonus: ROI calculator worksheet included</span>
                      </li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to download"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                        required
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
                      {isSubmitting ? 'Sending...' : 'Download Free Checklist →'}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      Instant download. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-code-green/20 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-code-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Download Starting! 🎉
                  </h3>
                  <p className="text-gray-300 mb-6">
                    While it downloads — want a personalized automation audit?
                  </p>
                  <a
                    href={getCalendlyUrl(email)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-6 bg-electric-blue hover:bg-electric-blue-hover text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-electric-blue/20"
                  >
                    Book Your Free 15-Min Audit →
                  </a>
                  <p className="text-xs text-gray-500 mt-3">No obligation. See what we&apos;d automate first.</p>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
