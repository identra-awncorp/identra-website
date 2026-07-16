const fs = require('fs');

const importsAndInterfaces = `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Terminal, ArrowRight, HelpCircle, Cpu, Landmark, Briefcase, Ticket, Plane, ShieldCheck, HeartPulse, QrCode, Search, Shield, Zap, RefreshCw, Smartphone, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DemoGlobalTrendsDashboard from './DemoGlobalTrendsDashboard';

interface DemoPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: any) => void;
}

interface Scenario {
  id: string;
  icon: React.ComponentType<any>;
  titleEn: string;
  titleEs: string;
  titleJa: string;
  titleDe: string;
  titleVi: string;
  tagEn: string;
  tagEs: string;
  tagJa: string;
  tagDe: string;
  tagVi: string;
  descEn: string;
  descEs: string;
  descJa: string;
  descDe: string;
  descVi: string;
  securityEn: string;
  securityEs: string;
  securityJa: string;
  securityDe: string;
  securityVi: string;
  steps: {
    labelEn: string;
    labelEs: string;
    labelJa: string;
    labelDe: string;
    labelVi: string;
    actionEn: string;
    actionEs: string;
    actionJa: string;
    actionDe: string;
    actionVi: string;
  }[];
  successResultEn: string;
  successResultEs: string;
  successResultJa: string;
  successResultDe: string;
  successResultVi: string;
}

const getLocalizedValue = (obj: any, keyPrefix: string, lang: string) => {
  if (lang === 'vi') return obj[\`\${keyPrefix}Vi\`];
  if (lang === 'es') return obj[\`\${keyPrefix}Es\`];
  if (lang === 'ja') return obj[\`\${keyPrefix}Ja\`];
  if (lang === 'de') return obj[\`\${keyPrefix}De\`];
  return obj[\`\${keyPrefix}En\`];
};

const DEMO_SCENARIOS: Scenario[] = [];

`;

let content = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');

// The file currently starts with /*export default function DemoPage...
// Let's remove the /* and prepend the imports
if (content.startsWith('/*')) {
    content = content.substring(2);
}

content = importsAndInterfaces + content;
fs.writeFileSync('src/components/DemoPage.tsx', content);
console.log("Restored imports");
