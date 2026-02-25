'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Zap, Users, DollarSign, Clock, ArrowRight } from 'lucide-react';
import EmailGateModal from '../EmailGateModal';
import { isEmailCaptured } from '@/lib/emailCapture';

export default function ROIInteractiveCalculator() {
    const [teamSize, setTeamSize] = useState(5);
    const [hourlyRate, setHourlyRate] = useState(50);
    const [activeAutomation, setActiveAutomation] = useState(0);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const automations = [
        { name: 'Email-to-CRM', hours: 5, icon: '📧' },
        { name: 'Lead Qualification', hours: 10, icon: '🤖' },
        { name: 'Invoice Automation', hours: 3, icon: '📄' },
        { name: 'Support Triage', hours: 8, icon: '💬' },
        { name: 'Reporting', hours: 4, icon: '📊' },
    ];

    const hoursSavedPerWeekPerPerson = useMemo(() => {
        return automations.reduce((acc, auto) => acc + auto.hours, 0);
    }, [automations]);

    const totalHoursSavedPerWeek = hoursSavedPerWeekPerPerson * teamSize;
    const weeklySavings = totalHoursSavedPerWeek * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = weeklySavings * 52;
    const ROI = ((yearlySavings - 12000) / 12000) * 100; // Assuming $12k average investment

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
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent" />
            <div className="absolute top-10 left-10 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-code-green/10 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-6">
                        <Calculator className="w-5 h-5 text-electric-blue" />
                        <span className="text-sm font-mono text-electric-blue">ROI CALCULATOR</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Calculate Your Automation ROI
                    </h2>
                    <p className="text-xl text-gray-300">
                        See how much your team could save with AI automation
                    </p>
                </motion.div>

                {/* Main Calculator Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl p-8 md:p-12 premium-border"
                >
                    {/* Input Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Team Size */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 text-lg text-gray-300">
                                    <Users className="w-5 h-5 text-electric-blue" />
                                    Team Size
                                </label>
                                <motion.div
                                    key={teamSize}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    {teamSize}
                                </motion.div>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={teamSize}
                                onChange={(e) => setTeamSize(Number(e.target.value))}
                                className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer accent-electric-blue"
                            />
                        </div>

                        {/* Hourly Rate */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 text-lg text-gray-300">
                                    <DollarSign className="w-5 h-5 text-code-green" />
                                    Hourly Rate (USD)
                                </label>
                                <motion.div
                                    key={hourlyRate}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="text-3xl font-bold text-white"
                                >
                                    ${hourlyRate}
                                </motion.div>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="200"
                                step="5"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer accent-code-green"
                            />
                        </div>
                    </div>

                    {/* Automation Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-12"
                    >
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-electric-blue" />
                            Hours Saved Per Week: {totalHoursSavedPerWeek}h
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {automations.map((auto, idx) => {
                                const totalHours = auto.hours * teamSize;
                                return (
                                    <motion.div
                                        key={auto.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="text-center p-4 rounded-xl bg-dark-surface/50 border border-white/10"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-2xl mb-2">{auto.icon}</div>
                                        <div className="text-sm text-gray-400">{auto.name}</div>
                                        <div className="text-lg font-bold text-white">{totalHours}h</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Weekly */}
                        <motion.div
                            key={`weekly-${weeklySavings}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10"
                        >
                            <Zap className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                            <p className="text-xs font-mono text-gray-400 mb-1">Weekly</p>
                            <p className="text-2xl font-mono font-bold text-white">
                                {formatCurrency(weeklySavings)}
                            </p>
                        </motion.div>

                        {/* Monthly */}
                        <motion.div
                            key={`monthly-${monthlySavings}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                            className="text-center p-6 rounded-xl bg-dark-surface/50 border border-white/10"
                        >
                            <TrendingUp className="w-6 h-6 text-code-green mx-auto mb-2" />
                            <p className="text-xs font-mono text-gray-400 mb-1">Monthly</p>
                            <p className="text-2xl font-mono font-bold text-white">
                                {formatCurrency(monthlySavings)}
                            </p>
                        </motion.div>

                        {/* Yearly - Highlighted */}
                        <motion.div
                            key={`yearly-${yearlySavings}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                            className="text-center p-8 rounded-xl bg-gradient-to-br from-electric-blue/10 to-code-green/10 border-2 border-code-green/30 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-code-green/5 opacity-50" />
                            <Calculator className="w-8 h-8 text-code-green mx-auto mb-3 relative z-10" />
                            <p className="text-xs font-mono text-gray-400 mb-2 relative z-10">Yearly Savings</p>
                            <p className="text-4xl font-mono font-bold text-code-green relative z-10">
                                {formatCurrency(yearlySavings)}
                            </p>
                        </motion.div>

                        {/* ROI */}
                        <motion.div
                            key={`roi-${ROI}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
                            className="text-center p-6 rounded-xl bg-gradient-to-br from-purple/10 to-electric-blue/10 border-2 border-electric-blue/30"
                        >
                            <TrendingUp className="w-6 h-6 text-purple mx-auto mb-2" />
                            <p className="text-xs font-mono text-gray-400 mb-1">ROI</p>
                            <p className="text-2xl font-mono font-bold text-white">
                                +{Math.round(ROI)}%
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="#"
                            onClick={handleCTAClick}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-electric-blue to-code-green text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-electric-blue/20 transition-all group"
                        >
                            <span className="text-lg">
                                Book Audit to Save {formatCurrency(yearlySavings)}
                            </span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-sm text-gray-400 mt-4 font-mono">
                            Based on {totalHoursSavedPerWeek} hours saved/week at ${hourlyRate}/hour
                        </p>
                    </motion.div>
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
