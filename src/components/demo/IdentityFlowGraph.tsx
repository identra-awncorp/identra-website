import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';

interface ScenarioStep {
  label: string;
  action: string;
}

interface IdentityFlowGraphProps {
  steps: ScenarioStep[];
  currentStepIdx: number;
  completedSteps: boolean[];
  isSuccess: boolean;
}

export const IdentityFlowGraph: React.FC<IdentityFlowGraphProps> = ({
  steps,
  currentStepIdx,
  completedSteps,
  isSuccess,
}) => {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].identityFlowGraph;

  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full bg-slate-50/50 border border-slate-150 rounded-2xl p-4 my-2">
      <div className="flex items-center justify-between w-full relative">
        {steps.map((st, idx) => {
          const isActive = currentStepIdx === idx && !isSuccess;
          const isDone = completedSteps[idx] || isSuccess;
          
          // For the link *before* this node (i.e. between idx-1 and idx)
          const isLinkDone = completedSteps[idx] || isSuccess;
          const isLinkActive = currentStepIdx === idx && !isSuccess;

          return (
            <React.Fragment key={idx}>
              {/* Connector line leading to this node (skip for first node) */}
              {idx > 0 && (
                <div className="flex-1 h-[3px] mx-1 sm:mx-2 rounded-full bg-slate-200 relative overflow-hidden min-w-[8px] sm:min-w-[16px]">
                  <motion.div 
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      isLinkDone ? 'bg-emerald-500' : isLinkActive ? 'bg-[#354CE1]' : 'bg-transparent'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: isLinkDone || isLinkActive ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}

              {/* Node Column */}
              <div className="flex flex-col items-center text-center relative group">
                {/* Node Circle Container */}
                <div className="relative">
                  {/* Outer Pulsing Ring for Active State */}
                  {isActive && (
                    <motion.div 
                      className="absolute -inset-1.5 rounded-full border-2 border-[#354CE1]/30"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Interactive Circle */}
                  <motion.div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all cursor-help ${
                      isDone 
                        ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm shadow-emerald-500/20' 
                        : isActive 
                          ? 'bg-white border-[#354CE1] text-[#354CE1] shadow-md shadow-[#354CE1]/15 ring-2 ring-indigo-50' 
                          : 'bg-white border-slate-200 text-slate-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    ) : isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#354CE1] block animate-pulse" />
                    ) : (
                      <span className="text-[10px] font-bold font-mono">{idx + 1}</span>
                    )}
                  </motion.div>
                </div>

                {/* Helpful Hover Tooltip */}
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-[9px] font-mono py-1 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-50">
                  {st.label}
                </div>

                {/* Step Labels */}
                <div className="mt-1.5 w-16 sm:w-20 md:w-24 text-center">
                  <span className={`block text-[9.5px] font-extrabold font-sans leading-tight tracking-tight line-clamp-2 transition-colors ${
                    isActive 
                      ? 'text-[#354CE1]' 
                      : isDone 
                        ? 'text-emerald-600 font-bold' 
                        : 'text-slate-400'
                  }`}>
                    {st.label}
                  </span>
                  <span className="block text-[7px] text-slate-400 font-mono uppercase tracking-wider scale-90 mt-0.5">
                    {t.stepLabel.replace('{index}', String(idx + 1))}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default IdentityFlowGraph;
