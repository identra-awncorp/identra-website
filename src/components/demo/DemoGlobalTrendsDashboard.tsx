/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, ComposedChart, LineChart, BarChart, RadarChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, Area, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, AreaChart
} from 'recharts';
import { 
  Shield, TrendingUp, Cpu, CheckCircle2, AlertTriangle, Sparkles, 
  Info, ArrowRight, ShieldCheck, HelpCircle, Activity, Globe, RefreshCw, Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { getDemoGlobalTrendsDashboardData } from '../../translations/DemoGlobalTrendsDashboardData';

export default function DemoGlobalTrendsDashboard() {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].globalTrends;
  const dashboardScenarioData = useMemo(() => getDemoGlobalTrendsDashboardData(language), [language]);

  // Scenario Selection States for interactive filtering
  const [selectedIds, setSelectedIds] = useState<string[]>(
    dashboardScenarioData.map(sc => sc.id)
  );

  // Active scenario for detailed drill-down view
  const [drillDownId, setDrillDownId] = useState<string>('bank-account');

  // Toggle selection helper
  const handleToggleScenario = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return dashboardScenarioData.filter(sc => selectedIds.includes(sc.id));
  }, [dashboardScenarioData, selectedIds]);

  // Dynamic Bento stats calculation
  const stats = useMemo(() => {
    if (filteredData.length === 0) return { avgConfidence: 0, avgRisk: 0, totalRulesChecked: 0, threatDeflected: 100 };
    
    let confSum = 0;
    let riskSum = 0;
    let ruleCount = 0;

    filteredData.forEach(sc => {
      confSum += sc.overallConfidence;
      riskSum += sc.overallRisk;
      ruleCount += sc.rules.length;
    });

    const avgConfidence = parseFloat((confSum / filteredData.length).toFixed(2));
    const avgRisk = parseFloat((riskSum / filteredData.length).toFixed(2));
    const threatDeflected = parseFloat((100 - avgRisk).toFixed(2));

    return {
      avgConfidence,
      avgRisk,
      totalRulesChecked: ruleCount,
      threatDeflected
    };
  }, [filteredData]);

  // Data parsed for primary Composed Chart (Scenario Confidence & Risk Comparison)
  const comparisonChartData = useMemo(() => {
    return filteredData.map(sc => ({
      name: sc.title,
      confidence: sc.overallConfidence,
      risk: sc.overallRisk,
      id: sc.id
    }));
  }, [filteredData]);

  // Trust progression steps trend data (Stage 1 to 4)
  const trustProgressionData = useMemo(() => {
    // Find the max number of steps among filtered scenarios
    const maxSteps = Math.max(...filteredData.map(sc => sc.confidenceTrend.length));
    
    const stepsArray = [];
    for (let i = 0; i < maxSteps; i++) {
      const stepItem: Record<string, any> = {
        stageName: t.layerName.replace('{index}', String(i + 1)),
        stageIndex: i + 1
      };
      
      filteredData.forEach(sc => {
        // If scenario doesn't have this step, pad it with its last available confidence value
        const trend = sc.confidenceTrend;
        if (i < trend.length) {
          stepItem[sc.id] = trend[i];
        } else {
          stepItem[sc.id] = trend[trend.length - 1];
        }
      });
      stepsArray.push(stepItem);
    }
    return stepsArray;
  }, [filteredData, t.layerName]);

  // Drilldown scenario data
  const drillDownScenario = useMemo(() => {
    return dashboardScenarioData.find(sc => sc.id === drillDownId) || dashboardScenarioData[0];
  }, [dashboardScenarioData, drillDownId]);

  // Drilldown parsed risk dimensions data
  const drillDownRiskData = useMemo(() => {
    return drillDownScenario.riskDimensions.map(dim => ({
      subject: dim.label,
      score: dim.score,
      fullMark: 20
    }));
  }, [drillDownScenario]);

  // Color mapping helper for lines in progression chart
  const getScenarioColor = (id: string) => {
    const colors: Record<string, string> = {
      'bank-account': '#354CE1',     // Indigo
      'apply-job': '#5F3CF3',        // Purple
      'ticket-booking': '#FFB300',   // Amber
      'airlines-hotels': '#00D4B2',  // Teal
      'government-services': '#3B82F6', // Blue
      'healthcare': '#EF4444',       // Red
      'ticket-transfer': '#10B981'   // Emerald
    };
    return colors[id] || '#64748B';
  };

  return (
    <div className="bg-[#FAFBFD] rounded-[32px] border border-slate-200/60 p-6 md:p-8 space-y-8 shadow-sm">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/50 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100/50 text-[#354CE1] rounded-full text-xs font-semibold tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.globalTelemetryIntelligence}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {t.verificationConfidenceRiskTrends}
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            {t.dashboardDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center font-mono text-[10px] bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/50 text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>REAL-TIME AGGREGATION ACTIVE</span>
        </div>
      </div>

      {/* 2. Interactive Scenarios Toggle Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            {t.toggleScenarios}
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            {selectedIds.length} / 7 {t.scenariosSelected}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dashboardScenarioData.map(sc => {
            const isSelected = selectedIds.includes(sc.id);
            const color = getScenarioColor(sc.id);
            return (
              <button
                key={sc.id}
                onClick={() => handleToggleScenario(sc.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-150 flex items-center gap-2 cursor-pointer select-none ${
                  isSelected 
                    ? 'bg-white text-slate-800 shadow-sm border-slate-300' 
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                }`}
                style={isSelected ? { borderLeft: `4px solid ${color}` } : {}}
              >
                <span 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: isSelected ? color : '#CBD5E1' }} 
                />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Global Stats Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between space-y-2 relative overflow-hidden group hover:border-[#354CE1]/30 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#354CE1]/5 to-transparent rounded-full pointer-events-none" />
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            {t.averageVerificationConfidence}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-slate-800 font-mono tracking-tight">
              {stats.avgConfidence}%
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold font-mono">{t.passRateBadge}</span>
          </div>
          <p className="text-[10px] text-slate-500">
            {t.averageConfidenceDescription}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between space-y-2 relative overflow-hidden group hover:border-rose-500/30 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-full pointer-events-none" />
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            {t.averageSystemRiskScore}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-rose-600 font-mono tracking-tight">
              {stats.avgRisk}%
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold font-mono">{t.lowRiskBadge}</span>
          </div>
          <p className="text-[10px] text-slate-500">
            {t.averageRiskDescription}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between space-y-2 relative overflow-hidden group hover:border-teal-500/30 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/5 to-transparent rounded-full pointer-events-none" />
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            {t.threatDeflectionEfficiency}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-teal-600 font-mono tracking-tight">
              {stats.threatDeflected}%
            </span>
            <span className="text-[10px] text-indigo-600 font-extrabold font-mono">{t.optimalBadge}</span>
          </div>
          <p className="text-[10px] text-slate-500">
            {t.threatDeflectionDescription}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between space-y-2 relative overflow-hidden group hover:border-indigo-500/30 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full pointer-events-none" />
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            {t.regulatoryRulesExecuted}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-[#354CE1] font-mono tracking-tight">
              {stats.totalRulesChecked}
            </span>
            <span className="text-[10px] text-emerald-600 font-extrabold font-mono">{t.compliantBadge}</span>
          </div>
          <p className="text-[10px] text-slate-500">
            {t.regulatoryRulesDescription}
          </p>
        </div>
      </div>

      {/* 4. Chart Section A: Global Confidence vs Risk Composed Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Composed Chart Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.verificationConfidenceVsRisk}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t.confidenceRiskCorrelation}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-3 bg-[#354CE1] rounded-sm" />
                <span className="text-slate-600">{t.confidencePercent}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-rose-500" />
                <span className="text-slate-600">{t.riskRightAxis}</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full text-xs">
            {comparisonChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-mono">
                {t.selectScenarioPrompt}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={comparisonChartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 10 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#354CE1', fontSize: 10 }}
                    unit="%"
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 10]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#EF4444', fontSize: 10 }}
                    unit="%"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F172A', 
                      borderRadius: '16px', 
                      border: 'none',
                      color: '#F8FAFC',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#38BDF8', marginBottom: '4px' }}
                  />
                  <Bar 
                    yAxisId="left" 
                    dataKey="confidence" 
                    fill="#354CE1" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={36}
                    name={t.confidence}
                  >
                    {comparisonChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getScenarioColor(entry.id)} opacity={0.85} />
                    ))}
                  </Bar>
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    dot={{ fill: '#EF4444', r: 5 }}
                    activeDot={{ r: 7 }}
                    name={t.threatRisk}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Drill-down Radar Radar Analysis */}
        <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">
              {t.scenarioThreatCompositionDrilldown}
            </h3>
            <p className="text-[11px] text-slate-500">
              {t.threatBreakdownDescription}
            </p>
          </div>

          {/* Drilldown Selector dropdown */}
          <div className="space-y-3">
            <select
              value={drillDownId}
              onChange={(e) => setDrillDownId(e.target.value)}
              className="w-full bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200/80 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#354CE1]/50"
            >
              {dashboardScenarioData.map(sc => (
                <option key={sc.id} value={sc.id}>
                  {sc.title}
                </option>
              ))}
            </select>
          </div>

          {/* Radar Chart */}
          <div className="h-[180px] w-full flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={drillDownRiskData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 8 }} />
                <PolarRadiusAxis angle={30} domain={[0, 15]} tick={{ fontSize: 8 }} />
                <Radar 
                  name={t.score} 
                  dataKey="score" 
                  stroke={getScenarioColor(drillDownId)} 
                  fill={getScenarioColor(drillDownId)} 
                  fillOpacity={0.2} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Drilldown stats */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100/50 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">{t.engineDecisionLogic}</span>
              <span className="font-bold text-[#354CE1] uppercase tracking-wider bg-indigo-50 border border-indigo-100/30 px-2 py-0.2 rounded text-[9px]">
                {drillDownScenario.verdict}
              </span>
            </div>
            <p className="text-slate-600 italic line-clamp-2 leading-relaxed">
              "{drillDownScenario.decisionLogic}"
            </p>
          </div>
        </div>

      </div>

      {/* 5. Chart Section B: Incremental Trust Progression Line Chart */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Trust Progression Card */}
        <div className="md:col-span-12 bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.trustAccumulationCycles}
              </h3>
              <p className="text-[11px] text-slate-500">
                {t.trustProgressionDescription}
              </p>
            </div>
          </div>

          <div className="h-[280px] w-full text-xs">
            {filteredData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-mono">
                {t.selectScenarioPrompt}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trustProgressionData} margin={{ top: 15, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="stageName" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 10 }}
                  />
                  <YAxis 
                    domain={[20, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    unit="%"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F172A', 
                      borderRadius: '16px', 
                      border: 'none',
                      color: '#F8FAFC',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#38BDF8', marginBottom: '4px' }}
                  />
                  {filteredData.map(sc => (
                    <Line 
                      key={sc.id}
                      type="monotone" 
                      dataKey={sc.id} 
                      stroke={getScenarioColor(sc.id)} 
                      strokeWidth={2.5}
                      dot={{ r: 4, strokeWidth: 1.5, fill: '#FFF' }}
                      activeDot={{ r: 6 }}
                      name={sc.title}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* 6. Comprehensive Audit Ledger Table (Clean Grid) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {t.globalSecurityMatchAuditLedger}
          </h3>
          <p className="text-[11px] text-slate-500">
            {t.auditLedgerDescription}
          </p>
        </div>

        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm overflow-x-auto bg-white">
          <table className="w-full border-collapse text-left text-xs text-slate-700 min-w-[700px]">
            <thead className="bg-slate-50 font-mono text-[9px] text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">{t.scenario}</th>
                <th className="p-4">{t.segment}</th>
                <th className="p-4">{t.cumulativeTrust}</th>
                <th className="p-4">{t.threatRiskColumn}</th>
                <th className="p-4">{t.rulesChecked}</th>
                <th className="p-4">{t.verdict}</th>
                <th className="p-4 text-right">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardScenarioData.map(sc => {
                const color = getScenarioColor(sc.id);
                return (
                  <tr 
                    key={sc.id} 
                    className={`hover:bg-slate-50/50 transition cursor-pointer ${
                      drillDownId === sc.id ? 'bg-indigo-50/20' : ''
                    }`}
                    onClick={() => setDrillDownId(sc.id)}
                  >
                    <td className="p-4 flex items-center gap-3 font-semibold text-slate-900">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                      <span>{sc.title}</span>
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {sc.tag}
                    </td>
                    <td className="p-4 font-mono font-extrabold text-[#354CE1]">
                      {sc.overallConfidence}%
                    </td>
                    <td className="p-4 font-mono font-extrabold text-rose-500">
                      {sc.overallRisk}%
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-500">
                      {sc.rules.length} {t.rulesUnit}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{sc.verdict}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrillDownId(sc.id);
                        }}
                        className="text-xs font-bold text-[#354CE1] hover:underline"
                      >
                        {t.inspect}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
