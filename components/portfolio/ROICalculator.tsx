'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap } from 'lucide-react';

export default function ROICalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(50);

    const hoursSavedPerWeek = 20;
    const weeklySavings = hoursSavedPerWeek * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = weeklySavings * 52;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
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
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-3">
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
                                    <span className="text-2xl font-mono font-bold text-white min-w-[60px] text-right">
                                        {teamSize}
                                    </span>
                                </div>
                            </div>

                            {/* Hourly Rate Slider */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-3">
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
                                    <span className="text-2xl font-mono font-bold text-white min-w-[60px] text-right">
                                        ${hourlyRate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Results Display */}
                        <div className="border-t border-white/10 pt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Weekly Savings */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10"
                                >
                                    <Zap className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                                    <p className="text-xs font-mono text-gray-400 mb-2">Weekly</p>
                                    <p className="text-2xl sm:text-3xl font-mono font-bold text-white">
                                        {formatCurrency(weeklySavings)}
                                    </p>
                                </motion.div>

                                {/* Monthly Savings */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10"
                                >
                                    <TrendingUp className="w-6 h-6 text-code-green mx-auto mb-2" />
                                    <p className="text-xs font-mono text-gray-400 mb-2">Monthly</p>
                                    <p className="text-2xl sm:text-3xl font-mono font-bold text-white">
                                        {formatCurrency(monthlySavings)}
                                    </p>
                                </motion.div>

                                {/* Yearly Savings - Highlighted */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center p-6 rounded-xl bg-gradient-to-br from-electric-blue/10 to-code-green/10 border border-code-green/30 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-code-green/5 opacity-50" />
                                    <div className="relative z-10">
                                        <Calculator className="w-6 h-6 text-code-green mx-auto mb-2" />
                                        <p className="text-xs font-mono text-gray-400 mb-2">Yearly</p>
                                        <p className="text-2xl sm:text-3xl font-mono font-bold text-code-green">
                                            {formatCurrency(yearlySavings)}
                                        </p>
                                    </div>
                                </motion.div>
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
                                    href="https://calendly.com/shahxeebhassan/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
        </section>
    );
}
