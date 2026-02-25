'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Zap, Users, DollarSign } from 'lucide-react';
import EmailGateModal from '../EmailGateModal';
import { isEmailCaptured } from '@/lib/emailCapture';

export default function ROICalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const automations = [
        { name: 'Email-to-CRM', hours: 5, icon: '📧' },
        { name: 'Lead Qualification', hours: 10, icon: '🤖' },
        { name: 'Invoice Automation', hours: 3, icon: '📄' },
        { name: 'Support Triage', hours: 8, icon: '💬' },
        { name: 'Reporting', hours: 4, icon: '📊' },
    ];

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hoursSavedPerWeekPerPerson = automations.reduce((acc, auto) => acc + auto.hours, 0);
    const totalHoursSavedPerWeek = hoursSavedPerWeekPerPerson * teamSize;
    const weeklySavings = totalHoursSavedPerWeek * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = weeklySavings * 52;

    const formatCurrency = (value: number) => {
        if (!isClient) return '';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Track calculator interaction
        if (typeof window !== 'undefined' && (window as any).trackCalculatorInteraction) {
            (window as any).trackCalculatorInteraction();
        }

        if (isEmailCaptured()) {
            window.location.href = 'https://calendly.com/shahxeebhassan/30min';
        } else {
            setShowEmailModal(true);
        }
    };

    return (
        <section className="relative py-12 sm:py-24 md:py-32 bg-dark-surface/30">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <span className="inline-block font-mono text-sm text-code-green mb-4">
                        {'// ROI CALCULATOR'}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
                        Calculate Your Savings
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
                        See how much your team could save with AI automation.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-12 premium-border">
                        {/* Calculator Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 rounded-xl bg-electric-blue/10 flex items-center justify-center glow-blue">
                                <Calculator className="w-8 h-8 text-electric-blue" />
                            </div>
                        </div>

                        {/* Input Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {/* Team Size Slider */}
                            <div className="interactive-card">
                                <label className="block text-sm font-mono text-gray-400 mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-electric-blue" />
                                    Team Size
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={teamSize}
                                        onChange={(e) => setTeamSize(Number(e.target.value))}
                                        className="flex-1 h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer accent-electric-blue"
                                    />
                                    <motion.span
                                        key={teamSize}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-mono font-bold text-white min-w-[70px] text-right"
                                    >
                                        {teamSize}
                                    </motion.span>
                                </div>
                            </div>

                            {/* Hourly Rate Slider */}
                            <div className="interactive-card">
                                <label className="block text-sm font-mono text-gray-400 mb-3 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-code-green" />
                                    Avg. Hourly Rate (USD)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="20"
                                        max="200"
                                        step="5"
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="flex-1 h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer accent-code-green"
                                    />
                                    <motion.span
                                        key={hourlyRate}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-mono font-bold text-white min-w-[80px] text-right"
                                    >
                                        ${hourlyRate}
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        {/* Hours Saved Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8 p-4 rounded-xl bg-electric-blue/10 border border-electric-blue/30"
                        >
                            <p className="text-sm text-gray-400 mb-1">
                                Total Hours Saved Per Week
                            </p>
                            <motion.p
                                key={totalHoursSavedPerWeek}
                                initial={{ scale: 1.2, color: '#10B981' }}
                                animate={{ scale: 1, color: '#FFFFFF' }}
                                className="text-2xl font-mono font-bold text-white"
                            >
                                {totalHoursSavedPerWeek} hours
                            </motion.p>
                        </motion.div>

                        {/* Results Display */}
                        <div className="border-t border-white/10 pt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Weekly Savings */}
                                <div className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10">
                                    <Zap className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                                    <p className="text-xs font-mono text-gray-400 mb-2">Weekly</p>
                                    <motion.p
                                        key={weeklySavings}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-mono font-bold text-white"
                                    >
                                        {formatCurrency(weeklySavings)}
                                    </motion.p>
                                </div>

                                {/* Monthly Savings */}
                                <div className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10">
                                    <TrendingUp className="w-6 h-6 text-code-green mx-auto mb-2" />
                                    <p className="text-xs font-mono text-gray-400 mb-2">Monthly</p>
                                    <motion.p
                                        key={monthlySavings}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="text-3xl font-mono font-bold text-white"
                                    >
                                        {formatCurrency(monthlySavings)}
                                    </motion.p>
                                </div>

                                {/* Yearly Savings - Highlighted */}
                                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-electric-blue/10 to-code-green/10 border border-code-green/30 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-code-green/5 opacity-50" />
                                    <div className="relative z-10">
                                        <Calculator className="w-6 h-6 text-code-green mx-auto mb-2" />
                                        <p className="text-xs font-mono text-gray-400 mb-2">Yearly</p>
                                        <motion.p
                                            key={yearlySavings}
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            className="text-3xl font-mono font-bold text-code-green"
                                        >
                                            {formatCurrency(yearlySavings)}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="text-center mt-8"
                            >
                                <p className="text-sm text-gray-400 mb-4 font-mono">
                                    Based on <span className="text-code-green font-semibold">20 hours saved/week</span> per deployment
                                </p>
                                <a
                                    href="#"
                                    onClick={handleCTAClick}
                                    className="btn-cta-primary inline-flex items-center gap-2"
                                >
                                    <span className="text-sm sm:text-base font-semibold">
                                        Book Audit to Save {formatCurrency(yearlySavings)}
                                    </span>
                                    <TrendingUp className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Email Gate Modal */}
            <EmailGateModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                source="calendly_gate"
            />
        </section>
    );
}
