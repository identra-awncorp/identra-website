/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, ArrowRight, ShieldCheck, Check, Users, Lock, 
  Database, Smartphone, HelpCircle, AlertTriangle, FileText, 
  Share2, Zap, Sliders, Settings, Play, RefreshCw, 
  User, CheckCircle2, AlertCircle, Plus, Trash2, Bell, Shield, ShieldAlert,
  Clock, Search, BookOpen, ChevronDown, Landmark, Globe, Terminal,
  Fingerprint, Activity, Filter, Cpu, Layers, Eye, Link2, GitCommit
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  GRAPH_NODE_LABEL_KEYS,
  GRAPH_NODE_LOCALIZED_DICT,
  GRAPH_PAGE_TRANSLATIONS
} from '../translations/GraphPageTranslations';

interface GraphPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface GraphNode {
  id: string;
  label: string;
  type: 'user' | 'ip' | 'device' | 'phone' | 'email' | 'bank_account';
  x: number;
  y: number;
  status: 'clean' | 'suspicious' | 'blocked';
  details: Record<string, string>;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
}

const translateNodeKeys = (details: Record<string, string>, lang: string) => {
  if (lang === 'en' || !GRAPH_NODE_LOCALIZED_DICT[lang]) return details;
  
  const translated: Record<string, string> = {};
  for (const [key, value] of Object.entries(details)) {
    const newKey = GRAPH_NODE_LOCALIZED_DICT[lang][key] || key;
    let newValue = GRAPH_NODE_LOCALIZED_DICT[lang][value] || value;
    
    if (value.includes(GRAPH_NODE_LABEL_KEYS.disposable)) {
      newValue = value.replace(GRAPH_NODE_LABEL_KEYS.disposable, GRAPH_NODE_LOCALIZED_DICT[lang][GRAPH_NODE_LABEL_KEYS.disposable] || GRAPH_NODE_LABEL_KEYS.disposable);
    } else if (value.includes(GRAPH_NODE_LABEL_KEYS.torExitNode)) {
      newValue = value.replace(GRAPH_NODE_LABEL_KEYS.torExitNode, GRAPH_NODE_LOCALIZED_DICT[lang][GRAPH_NODE_LABEL_KEYS.torExitNode] || GRAPH_NODE_LABEL_KEYS.torExitNode);
    }
    
    translated[newKey] = newValue;
  }
  return translated;
};

const translateNodeLabel = (label: string, lang: string) => {
  if (lang === 'en' || !GRAPH_NODE_LOCALIZED_DICT[lang]) return label;
  
  if (GRAPH_NODE_LOCALIZED_DICT[lang][label]) return GRAPH_NODE_LOCALIZED_DICT[lang][label];
  
  if (label.startsWith(GRAPH_NODE_LABEL_KEYS.vpnIp)) return label.replace(GRAPH_NODE_LABEL_KEYS.vpnIp, GRAPH_NODE_LOCALIZED_DICT[lang][GRAPH_NODE_LABEL_KEYS.vpnIp] || GRAPH_NODE_LABEL_KEYS.vpnIp);
  if (label.startsWith(GRAPH_NODE_LABEL_KEYS.deviceHash)) return label.replace(GRAPH_NODE_LABEL_KEYS.deviceHash, GRAPH_NODE_LOCALIZED_DICT[lang][GRAPH_NODE_LABEL_KEYS.deviceHash] || GRAPH_NODE_LABEL_KEYS.deviceHash);
  if (label.startsWith(GRAPH_NODE_LABEL_KEYS.chimeRouting)) return label.replace(GRAPH_NODE_LABEL_KEYS.chimeRouting, GRAPH_NODE_LOCALIZED_DICT[lang][GRAPH_NODE_LABEL_KEYS.chimeRouting] || GRAPH_NODE_LABEL_KEYS.chimeRouting);
  
  return label;
};

export default function GraphPage({ onOpenSandbox, onBackToLanding, onViewChange }: GraphPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(GRAPH_PAGE_TRANSLATIONS, language as keyof typeof GRAPH_PAGE_TRANSLATIONS, 'GRAPH_PAGE_TRANSLATIONS');

  // Scenario Selection State
  const [currentScenario, setCurrentScenario] = useState<'device-collusion' | 'credential-stuffing'>('device-collusion');
  
  // Selected Node State for Inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-user-1');
  
  // Interactive Simulator States
  const [clusterBlocked, setClusterBlocked] = useState(false);
  const [simulationStep, setSimulationStep] = useState<0 | 1 | 2 | 3>(0);
  const [logs, setLogs] = useState<string[]>([
    t.logs.init1,
    t.logs.init2,
  ]);

  // Scenario 1: Device & VPN Collusion
  const scenarioDeviceCollusion = useMemo(() => {
    const nodes: GraphNode[] = [
      { id: 'node-user-1', label: 'David Vance', type: 'user', x: 200, y: 150, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'd.vance92@example.com', 'Signup Date': 'Today, 10:42 AM', Country: 'United States', 'ID Status': 'Passed' } },
      { id: 'node-user-2', label: 'Evelyn Miller', type: 'user', x: 100, y: 220, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'e.miller@example.com', 'Signup Date': 'Today, 10:45 AM', Country: 'Canada', 'ID Status': 'Passed' } },
      { id: 'node-user-3', label: 'Frank Chen', type: 'user', x: 300, y: 220, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'frankchen89@example.com', 'Signup Date': 'Today, 10:47 AM', Country: 'United Kingdom', 'ID Status': 'Passed' } },
      { id: 'node-ip-1', label: 'VPN IP: 185.220.101.5', type: 'ip', x: 200, y: 300, status: 'suspicious', details: { 'ISP/Host': 'M247 Ltd (Tor Exit Node)', 'Fraud Score': '98/100', Region: 'Frankfurt, DE', Connections: '3 Users' } },
      { id: 'node-device-1', label: `${GRAPH_NODE_LABEL_KEYS.deviceHash} c9d8f3`, type: 'device', x: 100, y: 320, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Hardware: 'iPhone 13,1 Mini', OS: 'iOS 15.4.1', Language: 'en-US', Fingerprint: 'c9d8f36a83210bc' } },
      { id: 'node-email-1', label: 'vance_finance@temp.com', type: 'email', x: 300, y: 80, status: clusterBlocked ? 'blocked' : 'blocked', details: { Provider: 'TempMail.co (Disposable)', Status: 'Flagged', 'Linked accounts': '1' } },
      { id: 'node-phone-1', label: '+1 (555) 019-3829', type: 'phone', x: 90, y: 100, status: 'clean', details: { Carrier: 'T-Mobile US', Type: 'Mobile', Location: 'New York, USA' } },
    ];

    const links: GraphLink[] = [
      { source: 'node-user-1', target: 'node-ip-1', type: 'routed_through' },
      { source: 'node-user-2', target: 'node-ip-1', type: 'routed_through' },
      { source: 'node-user-3', target: 'node-ip-1', type: 'routed_through' },
      { source: 'node-user-1', target: 'node-device-1', type: 'registered_on' },
      { source: 'node-user-2', target: 'node-device-1', type: 'registered_on' },
      { source: 'node-user-1', target: 'node-email-1', type: 'associated_email' },
      { source: 'node-user-2', target: 'node-phone-1', type: 'associated_phone' },
    ];

    return { nodes, links };
  }, [clusterBlocked]);

  // Scenario 2: Credential Stuffing & Shared Bank Ring
  const scenarioCredentialStuffing = useMemo(() => {
    const nodes: GraphNode[] = [
      { id: 'node-user-4', label: 'Grace Kelly', type: 'user', x: 200, y: 120, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'gkelly_invest@example.com', 'Signup Date': 'Today, 08:12 AM', Country: 'Ireland', 'Risk Score': '74/100' } },
      { id: 'node-user-5', label: 'Henry Ford', type: 'user', x: 120, y: 220, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'henryford_retro@example.com', 'Signup Date': 'Today, 08:15 AM', Country: 'United States', 'Risk Score': '81/100' } },
      { id: 'node-user-6', label: 'Irene Adler', type: 'user', x: 280, y: 220, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Email: 'irene.a.88@example.com', 'Signup Date': 'Today, 08:19 AM', Country: 'Austria', 'Risk Score': '78/100' } },
      { id: 'node-bank-1', label: `${GRAPH_NODE_LABEL_KEYS.chimeRouting} 11103`, type: 'bank_account', x: 200, y: 320, status: 'suspicious', details: { Bank: 'Chime Financial', Account: '•••• 8291', 'Holders Mismatch': 'True', 'Linked Accounts': '3' } },
      { id: 'node-phone-2', label: '+1 (555) 992-0041', type: 'phone', x: 80, y: 140, status: clusterBlocked ? 'blocked' : 'suspicious', details: { Carrier: 'Bandwidth.com (VoIP)', Type: 'Virtual Phone', Verification: 'Failed SMS OTP' } },
      { id: 'node-device-2', label: `${GRAPH_NODE_LABEL_KEYS.deviceHash} a2e4d1`, type: 'device', x: 320, y: 140, status: 'clean', details: { Hardware: 'MacBook Pro 16', OS: 'macOS 12.3', Fingerprint: 'a2e4d10f882a77e' } },
    ];

    const links: GraphLink[] = [
      { source: 'node-user-4', target: 'node-bank-1', type: 'payout_to' },
      { source: 'node-user-5', target: 'node-bank-1', type: 'payout_to' },
      { source: 'node-user-6', target: 'node-bank-1', type: 'payout_to' },
      { source: 'node-user-4', target: 'node-phone-2', type: 'associated_phone' },
      { source: 'node-user-5', target: 'node-phone-2', type: 'associated_phone' },
      { source: 'node-user-6', target: 'node-device-2', type: 'registered_on' },
    ];

    return { nodes, links };
  }, [clusterBlocked]);

  const activeGraph = currentScenario === 'device-collusion' ? scenarioDeviceCollusion : scenarioCredentialStuffing;

  // Selected Node Data Memo
  const selectedNode = useMemo(() => {
    return activeGraph.nodes.find(n => n.id === selectedNodeId) || null;
  }, [activeGraph, selectedNodeId]);

  // Handle Scenario Switch
  const handleScenarioChange = (scenario: 'device-collusion' | 'credential-stuffing') => {
    setCurrentScenario(scenario);
    setClusterBlocked(false);
    setSimulationStep(0);
    if (scenario === 'device-collusion') {
      setSelectedNodeId('node-user-1');
      setLogs([
        t.logs.switchDevice1,
        t.logs.switchDevice2,
      ]);
    } else {
      setSelectedNodeId('node-user-4');
      setLogs([
        t.logs.switchCred1,
        t.logs.switchCred2,
      ]);
    }
  };

  // Block Ring Action
  const handleBlockRing = () => {
    setClusterBlocked(true);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev,
      `[${timestamp}] ${t.logs.block1}`,
      `[${timestamp}] ${t.logs.block2}`,
      `[${timestamp}] ${t.logs.block3}`,
      `[${timestamp}] ${currentScenario === 'device-collusion' ? t.logs.block4_users : t.logs.block4_payouts}`,
    ]);
  };

  // Reset Scenario Action
  const handleResetScenario = () => {
    setClusterBlocked(false);
    setSimulationStep(0);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev,
      `[${timestamp}] ${t.logs.reset}`,
    ]);
  };

  // Run Step-by-Step Simulation Flow
  const handleRunSimulation = () => {
    if (simulationStep === 3) {
      setSimulationStep(0);
      return;
    }

    const nextStep = (simulationStep + 1) as 1 | 2 | 3;
    setSimulationStep(nextStep);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (nextStep === 1) {
      setLogs(prev => [
        ...prev,
        `[${timestamp}] ${t.logs.sim1_1}`,
        `[${timestamp}] ${t.logs.sim1_2}`,
      ]);
    } else if (nextStep === 2) {
      setLogs(prev => [
        ...prev,
        `[${timestamp}] ${t.logs.sim2_1}`,
        `[${timestamp}] ${t.logs.sim2_2}`,
      ]);
    } else if (nextStep === 3) {
      setLogs(prev => [
        ...prev,
        `[${timestamp}] ${t.logs.sim3_1}`,
        `[${timestamp}] ${t.logs.sim3_2}`,
      ]);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800">
      {/* Upper Navigation Back-Bar */}
      <div className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#354CE1] transition"
        >
          <span className="text-sm">←</span> {t.backToHome}
        </button>
        <div className="flex items-center gap-1 bg-[#FAFBFD] border border-slate-200 rounded-full px-3 py-1 text-slate-600">
          <Network className="w-3.5 h-3.5 text-[#354CE1]" />
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold">{t.productSuite}</span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-[#E2E6FF] text-[#354CE1] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
              <Zap className="w-3 h-3" />
              <span>{t.linkAnalysisEngine}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
              {t.heroTitle}
            </h1>
            
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenSandbox}
                className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-lg transition flex items-center gap-2"
              >
                {t.launchSandbox}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('interactive-graph');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-6 py-3.5 rounded-full transition"
              >
                {t.tryVisualizer}
              </button>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden p-6 border border-slate-800 flex flex-col justify-between">
              
              {/* Header inside Mock Dashboard */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">{t.fraudRingActive}</span>
                </div>
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{t.matchScore}</span>
              </div>

              {/* Graphic nodes representation */}
              <div className="flex-1 flex items-center justify-center relative my-4">
                <svg className="w-full h-full min-h-[140px]" viewBox="0 0 400 160">
                  {/* Links */}
                  <line x1="200" y1="80" x2="100" y2="40" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="200" y1="80" x2="300" y2="40" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="200" y1="80" x2="200" y2="130" stroke="#3B82F6" strokeWidth="1.5" />
                  <line x1="100" y1="40" x2="50" y2="100" stroke="#3B82F6" strokeWidth="1" />
                  <line x1="300" y1="40" x2="350" y2="100" stroke="#3B82F6" strokeWidth="1" />

                  {/* Nodes */}
                  <circle cx="200" cy="80" r="16" fill="#1E1B4B" stroke="#EF4444" strokeWidth="2" />
                  <circle cx="100" cy="40" r="12" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="300" cy="40" r="12" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="200" cy="130" r="12" fill="#1E1B4B" stroke="#EF4444" strokeWidth="1.5" />
                  <circle cx="50" cy="100" r="8" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.2" />
                  <circle cx="350" cy="100" r="8" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.2" />

                  {/* Text labels */}
                  <text x="200" y="84" fill="#EF4444" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{t.ipLabel}</text>
                  <text x="100" y="44" fill="#FFF" fontSize="6" fontFamily="monospace" textAnchor="middle">{t.user1Label}</text>
                  <text x="300" y="44" fill="#FFF" fontSize="6" fontFamily="monospace" textAnchor="middle">{t.user2Label}</text>
                  <text x="200" y="134" fill="#FFF" fontSize="5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{t.deviceLabel}</text>
                </svg>

                {/* Floating alert */}
                <div className="absolute top-2 right-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-2 text-[9px] backdrop-blur-md max-w-[120px] shadow-lg">
                  <p className="font-bold">{t.collusionPattern}</p>
                  <p className="text-slate-400 mt-0.5">{t.collusionDesc}</p>
                </div>
              </div>

              {/* Console log footer inside visually rich block */}
              <div className="bg-[#0b101c] rounded-xl p-3 border border-slate-800">
                <div className="flex items-center gap-1.5 text-[8px] font-mono text-slate-400">
                  <Terminal className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400">{t.consolePrompt}</span>
                  <span className="truncate">{t.consoleCommand}</span>
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-1 leading-normal pl-4">
                  {t.consoleFound}
                  <br />{t.consoleThreat}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Playground Section */}
      <section id="interactive-graph" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.playgroundTitle}
            </h2>
            <p className="text-slate-500 text-sm">
              {t.playgroundDesc}
            </p>
          </div>

          {/* Scenarios Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-1.5 rounded-full flex items-center border border-slate-200">
              <button
                onClick={() => handleScenarioChange('device-collusion')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition ${currentScenario === 'device-collusion' ? 'bg-[#354CE1] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t.scenarioDevice}
              </button>
              <button
                onClick={() => handleScenarioChange('credential-stuffing')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition ${currentScenario === 'credential-stuffing' ? 'bg-[#354CE1] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t.scenarioCredential}
              </button>
            </div>
          </div>

          {/* Interactive Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: SVG Canvas Panel (Col span 8) */}
            <div className="lg:col-span-8 bg-[#0B101D] rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl relative min-h-[460px] overflow-hidden">
              
              {/* Overlay Alert for New Simulated Nodes */}
              <AnimatePresence>
                {simulationStep >= 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 left-4 right-4 z-10 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 backdrop-blur-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-red-400">{t.criticalCollusion}</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">{t.criticalCollusionDesc}</p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {t.threatConfirmed}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Canvas header controls */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#354CE1]" />
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    {currentScenario === 'device-collusion' ? t.patternAnalysisTor : t.patternAnalysisPayout}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-semibold font-mono">{t.zoom}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Dynamic SVG Visualizer Container */}
              <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
                <svg className="w-full h-full min-h-[300px] select-none" viewBox="0 0 400 360">
                  
                  {/* Link connections */}
                  {activeGraph.links.map((link, idx) => {
                    const sourceNode = activeGraph.nodes.find(n => n.id === link.source);
                    const targetNode = activeGraph.nodes.find(n => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;

                    const isHighlighted = selectedNodeId === link.source || selectedNodeId === link.target;
                    const isRed = sourceNode.status === 'blocked' || targetNode.status === 'blocked' || clusterBlocked;

                    return (
                      <g key={idx}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={isRed ? '#EF4444' : isHighlighted ? '#5B6DFF' : '#1E293B'}
                          strokeWidth={isHighlighted ? 2.5 : 1.2}
                          strokeDasharray={isRed ? '4 2' : undefined}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}

                  {/* Simulated Incoming Link Animation */}
                  {simulationStep >= 1 && (
                    <>
                      <line
                        x1={200}
                        y1={30}
                        x2={200}
                        y2={150}
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                      <line
                        x1={200}
                        y1={30}
                        x2={200}
                        y2={300}
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                    </>
                  )}

                  {/* Nodes Rendering */}
                  {activeGraph.nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isNodeBlocked = node.status === 'blocked' || (clusterBlocked && node.status !== 'clean');
                    const isNodeSuspicious = node.status === 'suspicious' && !isNodeBlocked;

                    let colorHex = '#3B82F6'; // default blue
                    if (isNodeBlocked) colorHex = '#EF4444'; // Red
                    else if (isNodeSuspicious) colorHex = '#F59E0B'; // Orange
                    else if (node.type === 'user') colorHex = '#10B981'; // Green

                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        className="cursor-pointer group"
                      >
                        {/* Selected Indicator Outline Halo */}
                        {isSelected && (
                          <circle
                            r={22}
                            fill="none"
                            stroke="#5B6DFF"
                            strokeWidth={1.5}
                            className="animate-ping opacity-35"
                          />
                        )}
                        <circle
                          r={isSelected ? 18 : 14}
                          fill={isSelected ? '#1E293B' : '#0B101D'}
                          stroke={colorHex}
                          strokeWidth={isSelected ? 3 : 2}
                          className="transition-all duration-300 group-hover:scale-115"
                        />

                        {/* Node Icons representation */}
                        <g transform="translate(-7, -7) scale(0.65)">
                          {node.type === 'user' ? (
                            <User className={isNodeBlocked ? 'text-red-400' : 'text-slate-300'} />
                          ) : node.type === 'ip' ? (
                            <Globe className="text-yellow-400" />
                          ) : node.type === 'device' ? (
                            <Fingerprint className="text-indigo-400" />
                          ) : node.type === 'phone' ? (
                            <Smartphone className="text-cyan-400" />
                          ) : node.type === 'bank_account' ? (
                            <Landmark className="text-violet-400" />
                          ) : (
                            <Link2 className="text-slate-400" />
                          )}
                        </g>

                        {/* Small Node Title Label */}
                        <text
                          y={28}
                          fill={isSelected ? '#FFF' : '#94A3B8'}
                          fontSize="7"
                          fontFamily="monospace"
                          textAnchor="middle"
                          className="font-medium pointer-events-none transition-colors duration-200"
                        >
                          {translateNodeLabel(node.label, language)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Simulated Node */}
                  {simulationStep >= 1 && (
                    <g transform="translate(200, 30)">
                      <circle r={14} fill="#0B101D" stroke="#EF4444" strokeWidth={2} />
                      <g transform="translate(-7, -7) scale(0.65)">
                        <User className="text-red-400" />
                      </g>
                      <text y={25} fill="#EF4444" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        {t.miloNew}
                      </text>
                    </g>
                  )}

                </svg>
              </div>

              {/* Interactive control buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-800 pt-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleBlockRing}
                    disabled={clusterBlocked}
                    className={`text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition ${clusterBlocked ? 'bg-red-900/30 text-red-500 border border-red-500/20 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white shadow-md'}`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {clusterBlocked ? t.ringBlacklisted : t.blockFraudRing}
                  </button>
                  <button
                    onClick={handleRunSimulation}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5 text-indigo-400" />
                    {simulationStep === 0 ? t.simulateFraudSignup : simulationStep === 3 ? t.resetSimulation : t.runStep.replace('{step}', (simulationStep + 1).toString())}
                  </button>
                </div>

                <button
                  onClick={handleResetScenario}
                  className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  {t.resetState}
                </button>
              </div>

            </div>

            {/* Right: Node Property Inspector Panel (Col span 4) */}
            <div className="lg:col-span-4 bg-[#FAFBFD] border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                
                {/* Header Title */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-5">
                  <Sliders className="w-4 h-4 text-[#354CE1]" />
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.nodeInspector}</h3>
                </div>

                {/* Inspecting node detail structure */}
                {selectedNode ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                        {selectedNode.type === 'user' ? (
                          <User className="w-5 h-5 text-indigo-500" />
                        ) : selectedNode.type === 'ip' ? (
                          <Globe className="w-5 h-5 text-yellow-500" />
                        ) : selectedNode.type === 'device' ? (
                          <Fingerprint className="w-5 h-5 text-emerald-500" />
                        ) : selectedNode.type === 'phone' ? (
                          <Smartphone className="w-5 h-5 text-cyan-500" />
                        ) : selectedNode.type === 'bank_account' ? (
                          <Landmark className="w-5 h-5 text-violet-500" />
                        ) : (
                          <Link2 className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-none">{translateNodeLabel(selectedNode.label, language)}</h4>
                        <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-1.5" style={{
                          backgroundColor: selectedNode.status === 'blocked' || clusterBlocked ? '#FEE2E2' : selectedNode.status === 'suspicious' ? '#FEF3C7' : '#D1FAE5',
                          color: selectedNode.status === 'blocked' || clusterBlocked ? '#DC2626' : selectedNode.status === 'suspicious' ? '#D97706' : '#059669',
                        }}>
                          {selectedNode.status === 'blocked' || clusterBlocked ? t.blockedTerminated : selectedNode.status === 'suspicious' ? t.flaggedPattern : t.cleanApproved}
                        </span>
                      </div>
                    </div>

                    {/* Metadata property rows */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 font-mono text-[11px]">
                      {Object.entries(translateNodeKeys(selectedNode.details, language)).map(([key, val]) => (
                        <div key={key} className="flex justify-between gap-2 border-b border-slate-100 last:border-0 pb-1.5 last:pb-0">
                          <span className="text-slate-400 font-semibold">{key}</span>
                          <span className="text-slate-800 text-right">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* System analysis text */}
                    <div className="text-xs text-slate-500 leading-relaxed bg-[#354CE1]/5 border border-[#354CE1]/15 rounded-xl p-3.5">
                      <p className="font-semibold text-slate-800 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#354CE1]" />
                        {t.linkAnalysisNotes}
                      </p>
                      <p className="mt-1">
                        {selectedNode.type === 'user' ? (
                          t.userNote
                        ) : selectedNode.type === 'ip' ? (
                          t.ipNote
                        ) : selectedNode.type === 'device' ? (
                          t.deviceNote
                        ) : (
                          t.bankNote
                        )}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    {t.noActiveNode}
                  </div>
                )}

              </div>

              {/* Action sandbox trigger */}
              <div className="border-t border-slate-200 pt-5 mt-6">
                <button
                  onClick={onOpenSandbox}
                  className="w-full bg-[#E2E6FF] hover:bg-[#D5DAFF] text-[#354CE1] font-semibold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  {t.verifyCustomFlow}
                </button>
              </div>

            </div>

          </div>

          {/* Interactive Logs Console */}
          <div className="mt-8 bg-slate-950 rounded-3xl border border-slate-800 p-5 font-mono text-xs text-indigo-300 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-300">{t.liveConsoleStream}</span>
              </div>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{t.apiLogger}</span>
            </div>
            
            <div className="space-y-2 max-h-[140px] overflow-y-auto pl-1 scrollbar-none text-[11px] leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-slate-600 select-none shrink-0">[{idx+1}]</span>
                  <p className="text-slate-300">{log}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Feature Bento Grid Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-widest bg-[#E2E6FF] px-3.5 py-1.5 rounded-full inline-block">{t.enterpriseCapabilities}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">{t.featuresTitle}</h2>
            <p className="text-slate-500 text-sm">{t.featuresDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[0].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[0].desc}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[1].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[1].desc}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[2].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[2].desc}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[3].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[3].desc}
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[4].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[4].desc}
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-[#5B6DFF]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.features[5].title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t.features[5].desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Trust Banner */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">{t.caseStudy}</span>
          <blockquote className="text-lg md:text-xl font-medium text-slate-900 tracking-tight leading-relaxed">
            {t.quote}
          </blockquote>
          <div>
            <p className="font-bold text-xs text-slate-900">{t.director}</p>
            <p className="text-[10px] text-slate-500">{t.company}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
