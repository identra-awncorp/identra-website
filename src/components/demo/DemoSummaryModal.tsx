/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ShieldCheck, Cpu, CheckCircle2, AlertTriangle,
  TrendingUp, ArrowRight, Lock, Shield, Sparkles, Check,
  Clock, Database, Activity, Eye, Info, Fingerprint, Terminal,
  Copy, Download, QrCode, FileText, BadgeCheck, ShieldAlert, Award
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useManagedTimeouts } from '../../hooks/useManagedTimeouts';
import { DEMO_SUMMARY_MODAL_TRANSLATIONS, getDemoSummaryDecisionData, getDemoSummaryStepEvidence } from '../../translations/demo/DemoSummaryModalTranslations';
import { copyTextToClipboard } from '../../utils/clipboard';
import { getLocalizedRecord } from '../../utils/i18nRuntime';

interface DemoSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioId: string;
  scenarioTitle: string;
  steps: { label: string }[];
  isSsiMode?: boolean;
}

export default function DemoSummaryModal({
  isOpen,
  onClose,
  scenarioId,
  scenarioTitle,
  steps,
  isSsiMode = false
}: DemoSummaryModalProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(
    DEMO_SUMMARY_MODAL_TRANSLATIONS,
    language as keyof typeof DEMO_SUMMARY_MODAL_TRANSLATIONS,
    'DEMO_SUMMARY_MODAL_TRANSLATIONS',
  );

  const data = getDemoSummaryDecisionData(scenarioId, language, isSsiMode);
  const riskIndex = data.overallRisk;
  const confidenceScore = data.overallConfidence;
  const credentialHash = `0x7f9a8b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a-${scenarioId}`;

  // Render SVG progression path based on confidenceTrend
  const pointsCount = data.confidenceTrend.length;

  // Track active node for evidence query
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(pointsCount - 1);
  const [activeTab, setActiveTab] = useState<'verdict' | 'evidence' | 'certificate'>('verdict');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const { clearTimeouts, scheduleTimeout } = useManagedTimeouts();

  // Sync activeNodeIdx to the last element of the new trend when scenario shifts
  useEffect(() => {
    setActiveNodeIdx(pointsCount - 1);
  }, [scenarioId, pointsCount]);

  useEffect(() => {
    if (!isOpen) {
      clearTimeouts();
      setCopyStatus('idle');
      setExporting(false);
      setExportSuccess(false);
    }
  }, [isOpen, clearTimeouts]);

  if (!isOpen) return null;

  const width = 500;
  const height = 150;
  const paddingX = 40;
  const paddingY = 25;

  // Generate SVG coordinate points
  const coords = data.confidenceTrend.map((conf, index) => {
    const x = paddingX + ((width - paddingX * 2) / (pointsCount - 1)) * index;
    // Map conf (0 - 100) to height range (height - paddingY to paddingY)
    const y = height - paddingY - ((conf / 100) * (height - paddingY * 2));
    return { x, y, value: conf };
  });

  // Build the path definition
  let pathD = '';
  if (coords.length > 0) {
    pathD = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      // Use cubic curves for smooth rendering
      const cpX1 = coords[i - 1].x + (coords[i].x - coords[i - 1].x) / 2;
      const cpY1 = coords[i - 1].y;
      const cpX2 = coords[i - 1].x + (coords[i].x - coords[i - 1].x) / 2;
      const cpY2 = coords[i].y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${coords[i].x} ${coords[i].y}`;
    }
  }

  // Path for gradient fill (closes the shape at the bottom)
  const fillD = pathD ? `${pathD} L ${coords[coords.length - 1].x} ${height - 10} L ${coords[0].x} ${height - 10} Z` : '';

  const handleCopyHash = async () => {
    const mockHash = `0x7f9a8b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a-${scenarioId}`;
    const copied = await copyTextToClipboard(mockHash);
    setCopyStatus(copied ? 'success' : 'error');
    scheduleTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleExportReport = () => {
    setExporting(true);
    scheduleTimeout(() => {
      setExporting(false);
      setExportSuccess(true);
      scheduleTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden select-none" id="decision-logic-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-[32px] border border-slate-200/80 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition border border-slate-100 cursor-pointer z-30"
          id="close-modal-button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">

        {/* Header Title with animated sparkles */}
        <div className="space-y-2 max-w-[90%]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-[#354CE1] text-[10px] font-bold rounded-full uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.securityEngineVerdictReport}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            {t.decisionLogicAnalysis.replace('{scenario}', scenarioTitle)}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            {t.headerDescription}
          </p>
        </div>

        {/* Navigation Tabs System */}
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('verdict')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm transition-all relative shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'verdict'
                ? 'text-[#354CE1]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t.verdictProgression}</span>
            {activeTab === 'verdict' && (
              <motion.div
                layoutId="activeModalTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#354CE1]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm transition-all relative shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'evidence'
                ? 'text-[#354CE1]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>{t.evidenceRules}</span>
            {activeTab === 'evidence' && (
              <motion.div
                layoutId="activeModalTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#354CE1]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2.5 font-bold text-xs sm:text-sm transition-all relative shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'certificate'
                ? 'text-[#354CE1]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t.digitalPassTab}</span>
            {activeTab === 'certificate' && (
              <motion.div
                layoutId="activeModalTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#354CE1]"
              />
            )}
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'verdict' && (
              <motion.div
                key="verdict"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Bento Grid Analytics Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Circular Gauge */}
                  <div className="md:col-span-4 bg-[#FAFBFD] border border-slate-200/60 rounded-[24px] p-5 flex flex-col justify-between items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#354CE1]/5 rounded-bl-full pointer-events-none" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {t.systemVerdict}
                    </p>

                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="52"
                          className="stroke-slate-100 fill-none"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="52"
                          className="stroke-[#354CE1] fill-none"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 52}
                          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - confidenceScore / 100) }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{confidenceScore}%</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          {t.confidenceLabel}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1.5 w-full">
                      <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs rounded-xl w-full">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.approvedVerified}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] px-1 text-slate-500 font-mono font-medium">
                        <span>{t.overallRiskIndex}</span>
                        <span className="font-bold text-slate-900">{riskIndex}% ({t.veryLow})</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Dimensions Bar Chart */}
                  <div className="md:col-span-8 bg-[#FAFBFD] border border-slate-200/60 rounded-[24px] p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {t.riskScoreDimensionBreakdown}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {t.riskVectorsDescription}
                      </p>
                    </div>

                    <div className="space-y-3.5 py-1">
                      {data.riskDimensions.map((dim, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700">{dim.label}</span>
                            <span className={`font-mono font-bold ${dim.score > 20 ? 'text-amber-500' : 'text-slate-500'}`}>
                              {dim.score}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${dim.score}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.1 }}
                              className={`h-full rounded-full ${
                                dim.score > 25
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                  : 'bg-gradient-to-r from-indigo-500 to-[#354CE1]'
                              }`}
                            />
                            <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-slate-300" title="Safe Limit Limit" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 border-t border-slate-200/50 pt-2">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
                        {t.safeThreshold}
                      </span>
                      <span>{t.decisionApprovalLimit}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Progression Chart */}
                <div className="bg-[#FAFBFD] border border-slate-200/60 rounded-[28px] p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t.verificationConfidenceProgressionTrend}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {t.progressionDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="font-bold">{t.cumulativeTrust}</span>
                    </div>
                  </div>

                  {/* SVG Canvas */}
                  <div className="w-full relative bg-white border border-slate-200/60 rounded-2xl overflow-hidden pt-6 pb-2 px-4 shadow-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,76,225,0.015),transparent_70%)] pointer-events-none" />
                    <svg
                      viewBox={`0 0 ${width} ${height}`}
                      className="w-full h-auto overflow-visible"
                    >
                      <defs>
                        <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#354CE1" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#354CE1" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} className="stroke-slate-100" strokeDasharray="3 3" />
                      <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} className="stroke-slate-100" strokeDasharray="3 3" />
                      <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} className="stroke-slate-100" strokeDasharray="3 3" />

                      {/* Area path */}
                      {fillD && (
                        <motion.path
                          d={fillD}
                          fill="url(#chart-area-grad)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        />
                      )}

                      {/* Line path */}
                      {pathD && (
                        <motion.path
                          d={pathD}
                          className="stroke-[#354CE1] fill-none"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                      )}

                      {/* Nodes */}
                      {coords.map((point, index) => {
                        const isActive = index === activeNodeIdx;
                        return (
                          <g key={index} className="cursor-pointer group">
                            {isActive && (
                              <motion.circle
                                cx={point.x}
                                cy={point.y}
                                r="14"
                                className="fill-none stroke-[#354CE1] stroke-[2]"
                                initial={{ scale: 0.8, opacity: 0.6 }}
                                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              />
                            )}

                            <motion.circle
                              cx={point.x}
                              cy={point.y}
                              r={isActive ? "10" : "8"}
                              className={`${isActive ? 'fill-[#354CE1]/20 stroke-[#354CE1]/30' : 'fill-indigo-100 stroke-indigo-500/20 group-hover:stroke-indigo-400 group-hover:fill-indigo-50'} transition-all duration-200`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                            />

                            <circle
                              cx={point.x}
                              cy={point.y}
                              r={isActive ? "5.5" : "4"}
                              className={`${isActive ? 'fill-[#354CE1]' : 'fill-[#354CE1]/70 group-hover:fill-[#354CE1]'} transition-all duration-200`}
                            />

                            <motion.text
                              x={point.x}
                              y={point.y - 14}
                              textAnchor="middle"
                              className={`font-mono text-[9px] font-extrabold ${isActive ? 'fill-[#354CE1] text-[10px]' : 'fill-slate-800'}`}
                              initial={{ opacity: 0, y: point.y - 5 }}
                              animate={{ opacity: 1, y: point.y - 14 }}
                              transition={{ delay: 0.7 + index * 0.15 }}
                            >
                              {point.value}%
                            </motion.text>
                            <text
                              x={point.x}
                              y={height - 8}
                              textAnchor="middle"
                              className={`font-sans font-bold text-[8px] tracking-wider uppercase ${isActive ? 'fill-[#354CE1] font-extrabold' : 'fill-slate-400'}`}
                            >
                              {t.stepLabel.replace('{index}', String(index + 1))}
                            </text>

                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="24"
                              className="fill-transparent stroke-none cursor-pointer"
                              onClick={() => {
                                setActiveNodeIdx(index);
                                setActiveTab('evidence');
                              }}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 italic">
                    {t.evidenceNodeHint}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'evidence' && (
              <motion.div
                key="evidence"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Horizontal Layer Quick Selection bar */}
                <div className="flex flex-wrap gap-2">
                  {coords.map((point, index) => {
                    const stepObj = steps[index] || { label: t.layerLabel.replace('{index}', String(index + 1)) };
                    const isActive = index === activeNodeIdx;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveNodeIdx(index)}
                        className={`flex-1 min-w-[120px] text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                          isActive
                            ? 'bg-indigo-50/40 border-[#354CE1] shadow-md ring-2 ring-indigo-100/30 scale-[1.015]'
                            : 'bg-white border-slate-200/60 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`text-[8px] font-mono font-extrabold uppercase tracking-wider block px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-[#354CE1] text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {t.layerLabel.replace('{index}', String(index + 1))}
                          </span>
                        </div>
                        <p className={`text-[10px] font-bold leading-snug line-clamp-1 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                          {stepObj.label}
                        </p>
                        <p className="text-[11px] font-mono text-emerald-600 font-extrabold mt-1">
                          +{index === 0 ? point.value : (point.value - coords[index-1].value).toFixed(1)}% {t.trustGainLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Evidence vault panel */}
                {(() => {
                  const evidenceList = getDemoSummaryStepEvidence(scenarioId, language, isSsiMode);
                  const evidence = evidenceList[activeNodeIdx] || evidenceList[evidenceList.length - 1];
                  const currentStepLabel = steps[activeNodeIdx] || { label: t.layerLabel.replace('{index}', String(activeNodeIdx + 1)) };

                  return (
                    <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 md:p-6 space-y-4 relative overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-800">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                            {t.evidenceVaultTitle.replace('{index}', String(activeNodeIdx + 1))}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] font-mono text-slate-400">
                          <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                            NODE: {evidence.processorNode}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>
                            {evidence.timestamp}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left description */}
                        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="text-xs text-slate-400 font-mono font-medium">
                              {t.triggeredLogicBranch}
                            </div>
                            <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                              {currentStepLabel.label}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {evidence.details}
                            </p>
                          </div>

                          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800 space-y-2.5 mt-2">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-slate-400">{t.totalTrustGained}</span>
                              <span className="font-bold text-emerald-400">+{evidence.confidenceAchieved}%</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-slate-400">{t.threatDeflected}</span>
                              <span className="font-bold text-emerald-400">{evidence.riskDeflection}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right decoded signals */}
                        <div className="md:col-span-7 space-y-3">
                          <div className="text-xs text-slate-400 font-mono font-medium">
                            {t.decodedCryptographicSignals}
                          </div>

                          <div className="space-y-2">
                            {evidence.signals.map((sig, sIdx) => (
                              <div key={sIdx} className="bg-slate-950/40 rounded-xl p-2.5 flex items-center justify-between border border-slate-800/50 hover:border-slate-800 transition">
                                <div className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-xs font-bold text-slate-300">
                                    {sig.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px]">
                                  <span className="text-emerald-400 font-semibold">
                                    {sig.value}
                                  </span>
                                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                                    PASS
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono pt-3.5 border-t border-slate-800 flex items-start gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <p className="leading-normal">
                          {t.consensusSealDescription}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Rules Evaluation Ledger */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t.rulesEngineEvaluationAudit}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      {data.rules.length} {t.rulesChecked}
                    </span>
                  </div>

                  <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-slate-50/20 shadow-sm">
                    {data.rules.map((rule, index) => {
                      const isRuleActive = index === activeNodeIdx;
                      return (
                        <div
                          key={index}
                          className={`p-4 flex items-center justify-between gap-4 transition duration-150 ${
                            isRuleActive
                              ? 'bg-indigo-50/40 border-l-4 border-l-[#354CE1]'
                              : 'bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                isRuleActive ? 'bg-[#354CE1] text-white' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {rule.id}
                              </span>
                              <span className="text-xs font-bold text-slate-800">
                                {rule.name}
                              </span>
                              {isRuleActive && (
                                <span className="bg-indigo-100 text-[#354CE1] border border-indigo-200 text-[8px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                                  {t.selectedLayer}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500">
                              {t.ruleExplanation}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right">
                              <span className="text-[10px] font-mono font-bold text-slate-500 block">
                                {t.trustWeight}
                              </span>
                              <span className="text-xs font-bold text-[#354CE1]">
                                +{rule.weight}%
                              </span>
                            </div>
                            <span className="inline-flex items-center justify-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>PASS</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'certificate' && (
              <motion.div
                key="certificate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Visual Security Certificate Pass Card */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
                  {/* Decorative circular meshes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-indigo-500/10 to-transparent blur-2xl rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                  {/* Stamp Seal Logo Placeholder */}
                  <div className="absolute top-8 right-8 text-emerald-500/25 opacity-70 pointer-events-none">
                    <BadgeCheck className="w-24 h-24 stroke-[1]" />
                  </div>

                  <div className="space-y-6">
                    {/* Header bar of the certificate */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-[8px] font-mono font-black tracking-widest text-indigo-400 uppercase">{t.highAssuranceSecurityAttestation}</span>
                          <span className="text-xs font-bold tracking-tight text-white">{t.coreSecureTrustVerdict}</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-mono font-bold tracking-wider">
                        {t.statusCompliantValid}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-800" />

                    {/* Certificate Main Title */}
                    <div className="text-center space-y-2 py-4">
                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest font-mono text-emerald-400 flex items-center justify-center gap-2">
                        <Award className="w-5 h-5 animate-pulse text-emerald-400" />
                        <span>{t.identityVerificationPass}</span>
                      </h3>
                      <p className="text-[11px] md:text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                        {t.certificateDescription.replace('{scenario}', scenarioTitle)}
                      </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/55 p-4 rounded-2xl border border-slate-800/60 text-xs font-mono">
                      <div>
                        <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{t.transactionId}</span>
                        <span className="text-slate-300 font-semibold text-[11px] break-all">TXN-{scenarioId.toUpperCase()}-2026</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{t.issuingAuthority}</span>
                        <span className="text-emerald-400 font-semibold text-[11px]">{t.secureCoreVersion}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{t.attestationWeight}</span>
                        <span className="text-indigo-400 font-semibold text-[11px]">{confidenceScore}% {t.assuranceSuffix}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{t.cryptoProtocol}</span>
                        <span className="text-slate-300 font-semibold text-[11px]">{t.cryptoProtocolValue}</span>
                      </div>
                    </div>

                    {/* Cryptographic Hash bar */}
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between gap-4">
                      <div className="space-y-0.5 truncate">
                        <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">{t.digitalCredentialSha256Signature}</span>
                        <span className="font-mono text-[10px] text-emerald-400 truncate block">
                          {credentialHash}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyHash}
                        className={`p-2 rounded-lg cursor-pointer transition shrink-0 ${
                          copyStatus === 'success'
                            ? 'bg-emerald-500 text-white'
                            : copyStatus === 'error'
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title={copyStatus === 'error' ? t.copySignatureHashFailed : t.copySignatureHash}
                      >
                        {copyStatus === 'success' ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : copyStatus === 'error' ? (
                          <AlertTriangle className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Lower disclaimer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{t.officiallyCertified}</span>
                      </div>
                      {/* Interactive Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleExportReport}
                          disabled={exporting}
                          className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-emerald-500 to-[#354CE1] hover:from-emerald-600 hover:to-[#2539BE] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {exporting ? (
                            <>
                              <motion.span
                                className="h-3 w-3 border-2 border-white border-t-transparent rounded-full block animate-spin"
                              />
                              <span>{t.exporting}</span>
                            </>
                          ) : exportSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>{t.reportExported}</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>{t.downloadAuditPass}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Export Toast notification */}
                <AnimatePresence>
                  {exportSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-medium"
                    >
                      <BadgeCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">{t.auditReportDownloaded}</span>
                        <span className="text-emerald-600">{t.reportSavedDescription}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        </div>

        {/* Bottom Button / Footer */}
        <div className="flex justify-end p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-[32px] z-20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#354CE1] hover:bg-[#354CE1]/90 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#354CE1]/15 cursor-pointer active:scale-[0.98]"
            id="close-modal-bottom-button"
          >
            {t.closeAuditSummary}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
