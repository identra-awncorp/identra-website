/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Cpu, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { SKELETON_LOADER_TRANSLATIONS } from '../translations/SkeletonLoaderTranslations';

interface SkeletonLoaderProps {
  view: string;
}

export default function SkeletonLoader({ view }: SkeletonLoaderProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(SKELETON_LOADER_TRANSLATIONS, language as keyof typeof SKELETON_LOADER_TRANSLATIONS, 'SKELETON_LOADER_TRANSLATIONS');

  // Determine layout archetype based on view name
  let layoutType: 'landing' | 'product' | 'list' | 'text' | 'dashboard' | 'login' = 'product';

  const viewLower = view.toLowerCase();

  if (viewLower === 'landing') {
    layoutType = 'landing';
  } else if (viewLower === 'login') {
    layoutType = 'login';
  } else if (viewLower === 'docs') {
    layoutType = 'dashboard';
  } else if (
    ['blog', 'ebooks', 'events', 'careers', 'research', 'resource-center', 'academy'].includes(viewLower)
  ) {
    layoutType = 'list';
  } else if (
    ['about', 'pricing', 'contact', 'partners', 'security', 'privacy-overview', 'blog-detail'].includes(viewLower)
  ) {
    layoutType = 'text';
  } else if (
    ['graph', 'workflows', 'copilot', 'case-management', 'platform', 'marketplace'].includes(viewLower)
  ) {
    layoutType = 'dashboard';
  }

  // Common pulsing shimmer effect using framer-motion for smooth, predictable rendering
  const pulseProps = {
    animate: { opacity: [0.4, 0.75, 0.4] },
    transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" as const }
  };

  const renderShimmerBlock = (className: string, delay: number = 0) => (
    <motion.div
      animate={{ opacity: [0.4, 0.75, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay }}
      className={`bg-slate-200/80 rounded-lg ${className}`}
    />
  );

  // 1. Landing Layout Skeleton
  const renderLandingSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            {renderShimmerBlock("w-28 h-6 rounded-full")}
            {renderShimmerBlock("w-16 h-6 rounded-full")}
          </div>
          {renderShimmerBlock("w-full h-12 sm:h-16 rounded-xl")}
          {renderShimmerBlock("w-10/12 h-12 sm:h-16 rounded-xl")}
          <div className="space-y-3 pt-4">
            {renderShimmerBlock("w-full h-5 rounded")}
            {renderShimmerBlock("w-11/12 h-5 rounded")}
            {renderShimmerBlock("w-8/12 h-5 rounded")}
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            {renderShimmerBlock("w-40 h-12 rounded-xl")}
            {renderShimmerBlock("w-36 h-12 rounded-xl")}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] bg-white rounded-2xl border border-slate-100 shadow-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                {renderShimmerBlock("w-10 h-10 rounded-full")}
                <div className="space-y-1.5">
                  {renderShimmerBlock("w-24 h-4 rounded")}
                  {renderShimmerBlock("w-16 h-3 rounded")}
                </div>
              </div>
              {renderShimmerBlock("w-12 h-6 rounded-full")}
            </div>
            <div className="space-y-4 py-8">
              {renderShimmerBlock("w-full h-10 rounded-lg")}
              {renderShimmerBlock("w-11/12 h-10 rounded-lg")}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              {renderShimmerBlock("w-20 h-4 rounded")}
              {renderShimmerBlock("w-28 h-8 rounded-lg")}
            </div>
          </div>
        </div>
      </div>

      {/* Row of logos / proof points */}
      <div className="border-y border-slate-100 py-8 flex justify-between gap-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 min-w-[100px] flex justify-center">
            {renderShimmerBlock("w-24 h-8 rounded-md", i * 0.1)}
          </div>
        ))}
      </div>

      {/* Grid structure */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          {renderShimmerBlock("w-32 h-6 rounded-full mx-auto")}
          {renderShimmerBlock("w-10/12 h-10 rounded-xl mx-auto")}
          {renderShimmerBlock("w-full h-5 rounded mx-auto")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5 shadow-sm">
              {renderShimmerBlock("w-12 h-12 rounded-xl", i * 0.15)}
              <div className="space-y-2">
                {renderShimmerBlock("w-2/3 h-6 rounded", i * 0.15)}
                {renderShimmerBlock("w-full h-4 rounded", i * 0.15)}
                {renderShimmerBlock("w-5/6 h-4 rounded", i * 0.15)}
              </div>
              {renderShimmerBlock("w-20 h-4 rounded", i * 0.15)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. Product / Verification Skeleton
  const renderProductSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            {renderShimmerBlock("w-4 h-4 rounded-full")}
            {renderShimmerBlock("w-32 h-4 rounded")}
          </div>
          {renderShimmerBlock("w-11/12 h-12 rounded-xl")}
          {renderShimmerBlock("w-8/12 h-12 rounded-xl")}
          <div className="space-y-3 pt-2">
            {renderShimmerBlock("w-full h-5 rounded")}
            {renderShimmerBlock("w-11/12 h-5 rounded")}
            {renderShimmerBlock("w-9/12 h-5 rounded")}
          </div>
          <div className="flex gap-4 pt-4">
            {renderShimmerBlock("w-36 h-12 rounded-xl")}
            {renderShimmerBlock("w-28 h-12 rounded-xl")}
          </div>
        </div>

        {/* Dynamic Simulator Screen / Visual */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-indigo-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-slate-800 text-[10px] text-indigo-400 font-mono px-2.5 py-1 rounded border border-slate-700/50 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />{t.securePlayground}</div>
            </div>

            <div className="flex-1 py-8 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <motion.div
                  {...pulseProps}
                  className="h-2.5 w-1/4 bg-slate-800 rounded"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="h-7 w-2/3 bg-slate-800 rounded-md"
                />
              </div>

              {/* Central mobile layout mockup */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-slate-700 rounded" />
                      <div className="h-2 w-12 bg-slate-700 rounded" />
                    </div>
                  </div>
                  <div className="h-5 w-14 bg-indigo-500/20 border border-indigo-500/30 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-8 w-full bg-slate-700/60 rounded-lg" />
                  <div className="h-8 w-full bg-slate-700/60 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-slate-500 text-[11px] font-mono">
              <span>{t.statusIntegrating}</span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              {renderShimmerBlock("w-10 h-10 rounded-xl", i * 0.15)}
              {renderShimmerBlock("w-6 h-6 rounded-full", i * 0.15)}
            </div>
            <div className="space-y-2">
              {renderShimmerBlock("w-2/3 h-5 rounded", i * 0.15)}
              {renderShimmerBlock("w-full h-3.5 rounded", i * 0.15)}
              {renderShimmerBlock("w-5/6 h-3.5 rounded", i * 0.15)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 3. Grid / List Layout (Ebooks, Resource Center, Events, Careers)
  const renderListSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* View Header */}
      <div className="max-w-3xl space-y-4">
        {renderShimmerBlock("w-24 h-6 rounded-full")}
        {renderShimmerBlock("w-8/12 h-10 rounded-xl")}
        {renderShimmerBlock("w-11/12 h-5 rounded")}
      </div>

      {/* Filter / Search bar bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        {renderShimmerBlock("w-full md:w-80 h-10 rounded-xl")}
        <div className="flex gap-3 w-full md:w-auto">
          {renderShimmerBlock("w-28 h-10 rounded-xl")}
          {renderShimmerBlock("w-28 h-10 rounded-xl")}
        </div>
      </div>

      {/* Grid list of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col h-[380px]">
            {/* Shimmer cover */}
            <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <motion.div
                {...pulseProps}
                className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100/50"
              />
              <Layers className="w-10 h-10 text-indigo-300 animate-pulse" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  {renderShimmerBlock("w-16 h-5 rounded-full", i * 0.1)}
                  {renderShimmerBlock("w-12 h-3.5 rounded", i * 0.1)}
                </div>
                {renderShimmerBlock("w-11/12 h-5 rounded-md", i * 0.1)}
                {renderShimmerBlock("w-9/12 h-5 rounded-md", i * 0.1)}
                <div className="space-y-1.5 pt-2">
                  {renderShimmerBlock("w-full h-3.5 rounded", i * 0.1)}
                  {renderShimmerBlock("w-5/6 h-3.5 rounded", i * 0.1)}
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                {renderShimmerBlock("w-24 h-4 rounded", i * 0.1)}
                {renderShimmerBlock("w-8 h-8 rounded-full", i * 0.1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 4. Elegant Text / Corporate Layout (About, Pricing, Privacy, Partners)
  const renderTextSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Centered header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        {renderShimmerBlock("w-28 h-6 rounded-full mx-auto")}
        {renderShimmerBlock("w-10/12 h-10 rounded-xl mx-auto")}
        {renderShimmerBlock("w-8/12 h-5 rounded mx-auto")}
      </div>

      {/* Main text container card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-10">
        <div className="space-y-4">
          {renderShimmerBlock("w-1/3 h-7 rounded-lg")}
          <div className="space-y-2.5">
            {renderShimmerBlock("w-full h-4.5 rounded")}
            {renderShimmerBlock("w-full h-4.5 rounded")}
            {renderShimmerBlock("w-11/12 h-4.5 rounded")}
            {renderShimmerBlock("w-9/12 h-4.5 rounded")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl p-6 space-y-3 bg-slate-50/50">
              {renderShimmerBlock("w-8 h-8 rounded-lg", i * 0.2)}
              {renderShimmerBlock("w-1/2 h-5 rounded", i * 0.2)}
              {renderShimmerBlock("w-full h-3.5 rounded", i * 0.2)}
              {renderShimmerBlock("w-5/6 h-3.5 rounded", i * 0.2)}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {renderShimmerBlock("w-1/4 h-7 rounded-lg")}
          <div className="space-y-2.5">
            {renderShimmerBlock("w-full h-4.5 rounded")}
            {renderShimmerBlock("w-full h-4.5 rounded")}
            {renderShimmerBlock("w-10/12 h-4.5 rounded")}
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Dashboard / Hub Layout (Graph, Workflows, Cases, Docs)
  const renderDashboardSkeleton = () => (
    <div className="w-full min-h-[500px] flex border-b border-slate-100 bg-[#F8FAFC]">
      {/* Sidebar Nav rail skeleton */}
      <div className="hidden lg:block w-64 border-r border-slate-100 bg-white p-6 space-y-8">
        <div className="space-y-3">
          {renderShimmerBlock("w-16 h-4 rounded")}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              {renderShimmerBlock("w-4 h-4 rounded-md")}
              {renderShimmerBlock("w-28 h-4 rounded")}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {renderShimmerBlock("w-20 h-4 rounded")}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              {renderShimmerBlock("w-4 h-4 rounded-md")}
              {renderShimmerBlock("w-32 h-4 rounded")}
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {renderShimmerBlock("w-20 h-5 rounded-full")}
              {renderShimmerBlock("w-16 h-5 rounded-full")}
            </div>
            {renderShimmerBlock("w-56 h-8 rounded-lg")}
          </div>
          <div className="flex gap-3">
            {renderShimmerBlock("w-24 h-10 rounded-xl")}
            {renderShimmerBlock("w-32 h-10 rounded-xl")}
          </div>
        </div>

        {/* Big visualization panel mockup */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <div className="flex gap-2">
              {renderShimmerBlock("w-24 h-7 rounded-lg")}
              {renderShimmerBlock("w-24 h-7 rounded-lg")}
            </div>
            {renderShimmerBlock("w-32 h-7 rounded-lg")}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[250px]">
            <div className="lg:col-span-2 border border-dashed border-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center bg-slate-50/50">
              <motion.div
                {...pulseProps}
                className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-indigo-50/10"
              />
              <div className="space-y-2 text-center p-6">
                <Shield className="w-10 h-10 text-indigo-300 animate-bounce mx-auto" />
                <div className="h-4 w-32 bg-slate-200 rounded mx-auto" />
              </div>
            </div>
            <div className="border border-slate-100 rounded-xl p-4 space-y-4">
              {renderShimmerBlock("w-1/2 h-5 rounded")}
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    {renderShimmerBlock("w-20 h-3.5 rounded", i * 0.1)}
                    {renderShimmerBlock("w-10 h-3.5 rounded", i * 0.1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Login Layout Skeleton
  const renderLoginSkeleton = () => (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
        <div className="text-center space-y-3">
          {renderShimmerBlock("w-12 h-12 rounded-2xl mx-auto")}
          {renderShimmerBlock("w-44 h-7 rounded-lg mx-auto")}
          {renderShimmerBlock("w-32 h-4 rounded mx-auto")}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            {renderShimmerBlock("w-16 h-4 rounded")}
            {renderShimmerBlock("w-full h-11 rounded-xl")}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              {renderShimmerBlock("w-20 h-4 rounded")}
              {renderShimmerBlock("w-28 h-4 rounded")}
            </div>
            {renderShimmerBlock("w-full h-11 rounded-xl")}
          </div>
          <div className="flex items-center gap-2 py-2">
            {renderShimmerBlock("w-4.5 h-4.5 rounded")}
            {renderShimmerBlock("w-28 h-4 rounded")}
          </div>
          {renderShimmerBlock("w-full h-12 rounded-xl")}
        </div>
        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          {renderShimmerBlock("w-32 h-4 rounded")}
          {renderShimmerBlock("w-24 h-4 rounded")}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen">
      {layoutType === 'landing' && renderLandingSkeleton()}
      {layoutType === 'product' && renderProductSkeleton()}
      {layoutType === 'list' && renderListSkeleton()}
      {layoutType === 'text' && renderTextSkeleton()}
      {layoutType === 'dashboard' && renderDashboardSkeleton()}
      {layoutType === 'login' && renderLoginSkeleton()}
    </div>
  );
}
