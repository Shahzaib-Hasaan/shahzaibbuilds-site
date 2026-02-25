'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, CalendarDays, ArrowRight } from 'lucide-react';
import EmailGateModal from '../EmailGateModal';
import { isEmailCaptured } from '@/lib/emailCapture';

function sliderFill(value: number, min: number, max: number, color: string) {
    const pct = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`;
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: string; prefix?: string; suffix?: string }) {
    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={value}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="tabular-nums"
            >
                {prefix}{value}{suffix}
            </motion.span>
        </AnimatePresence>
    );
}

export default function ROICalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(75);
    const [hoursSaved, setHoursSaved] = useState(30);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    const totalHoursPerWeek = teamSize * hoursSaved;
    const weeklySavings = totalHoursPerWeek * hourlyRate;
    const monthlySavings = weeklySavings * 4.33;
    const yearlySavings = weeklySavings * 52;

    const fmt = (n: number) => {
        if (!isClient) return '—';
        if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
        if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
        return `$${n.toFixed(0)}`;
    };

    const fmtFull = (n: number) => {
        if (!isClient) return '—';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
    };

    const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (typeof window !== 'undefined' && (window as any).trackCalculatorInteraction) {
            (window as any).trackCalculatorInteraction();
        }
        if (isEmailCaptured()) {
            window.location.href = 'https://calendly.com/shahxeebhassan/30min';
        } else {
            setShowEmailModal(true);
        }
    };

    const results = [
        { label: 'Weekly', value: fmt(weeklySavings), full: fmtFull(weeklySavings), icon: Zap, color: '#3B82F6', highlight: false },
        { label: 'Monthly', value: fmt(monthlySavings), full: fmtFull(monthlySavings), icon: TrendingUp, color: '#10B981', highlight: false },
        { label: 'Yearly', value: fmt(yearlySavings), full: fmtFull(yearlySavings), icon: CalendarDays, color: '#10B981', highlight: true },
    ];

    return (
        <section className="relative py-20 px-4 overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="font-mono text-sm text-code-green">{'// ROI CALCULATOR'}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white mt-3 mb-3">
                        Calculate Your Savings
                    </h2>
                    <p className="text-gray-400 text-base">
                        Adjust the inputs to see your potential automation ROI.
                    </p>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="glass-card premium-border rounded-2xl p-6 md:p-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {/* Left — Sliders */}
                        <div className="flex flex-col gap-8">
                            {/* Team Size */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-mono text-gray-400">Team Size</span>
                                    <motion.span
                                        key={teamSize}
                                        initial={{ scale: 1.15 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="text-xl font-mono font-bold text-white tabular-nums"
                                    >
                                        {teamSize}<span className="text-xs text-gray-500 ml-1">people</span>
                                    </motion.span>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={100}
                                    step={1}
                                    value={teamSize}
                                    onChange={(e) => setTeamSize(Number(e.target.value))}
                                    className="roi-slider w-full cursor-pointer"
                                    style={{ background: sliderFill(teamSize, 1, 100, '#3B82F6') }}
                                />
                                <div className="flex justify-between text-[11px] text-gray-600 mt-1.5 font-mono">
                                    <span>1</span><span>100</span>
                                </div>
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-mono text-gray-400">Avg. Hourly Rate</span>
                                    <motion.span
                                        key={hourlyRate}
                                        initial={{ scale: 1.15 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="text-xl font-mono font-bold text-white tabular-nums"
                                    >
                                        ${hourlyRate}<span className="text-xs text-gray-500 ml-1">/hr</span>
                                    </motion.span>
                                </div>
                                <input
                                    type="range"
                                    min={20}
                                    max={300}
                                    step={5}
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                                    className="roi-slider w-full cursor-pointer"
                                    style={{ background: sliderFill(hourlyRate, 20, 300, '#10B981') }}
                                />
                                <div className="flex justify-between text-[11px] text-gray-600 mt-1.5 font-mono">
                                    <span>$20</span><span>$300</span>
                                </div>
                            </div>

                            {/* Hours Saved */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-mono text-gray-400">Hours Saved / Person / Week</span>
                                    <motion.span
                                        key={hoursSaved}
                                        initial={{ scale: 1.15 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="text-xl font-mono font-bold text-white tabular-nums"
                                    >
                                        {hoursSaved}<span className="text-xs text-gray-500 ml-1">hrs</span>
                                    </motion.span>
                                </div>
                                <input
                                    type="range"
                                    min={5}
                                    max={60}
                                    step={5}
                                    value={hoursSaved}
                                    onChange={(e) => setHoursSaved(Number(e.target.value))}
                                    className="roi-slider w-full cursor-pointer"
                                    style={{ background: sliderFill(hoursSaved, 5, 60, '#8B5CF6') }}
                                />
                                <div className="flex justify-between text-[11px] text-gray-600 mt-1.5 font-mono">
                                    <span>5hrs</span><span>60hrs</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — Results */}
                        <div className="flex flex-col gap-4">
                            {results.map((r) => {
                                const Icon = r.icon;
                                return (
                                    <div
                                        key={r.label}
                                        className={`rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-300 ${
                                            r.highlight
                                                ? 'bg-gradient-to-r from-code-green/10 to-electric-blue/10 border border-code-green/30'
                                                : 'bg-white/[0.03] border border-white/[0.07]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{ background: `${r.color}18` }}
                                            >
                                                <Icon className="w-4 h-4" style={{ color: r.color }} />
                                            </div>
                                            <span className="text-sm font-mono text-gray-400">{r.label}</span>
                                        </div>
                                        <span
                                            className="text-2xl font-mono font-bold"
                                            style={{ color: r.highlight ? '#10B981' : '#ffffff' }}
                                        >
                                            <AnimatedNumber value={r.value} />
                                        </span>
                                    </div>
                                );
                            })}

                            {/* CTA */}
                            <motion.button
                                onClick={handleCTAClick}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-cta-primary w-full mt-2 flex items-center justify-center gap-2 text-sm font-semibold"
                            >
                                <span>Book Free Audit — Save {isClient ? fmtFull(yearlySavings) : '…'}/yr</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>

                            {/* Formula footnote */}
                            <p className="text-[11px] font-mono text-gray-600 text-center leading-relaxed">
                                {teamSize} people × {hoursSaved}h × ${hourlyRate}/hr = {isClient ? fmtFull(weeklySavings) : '—'}/wk
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <EmailGateModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                source="calendly_gate"
            />

        </section>
    );
}
