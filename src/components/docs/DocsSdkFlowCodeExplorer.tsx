import { useEffect, useMemo, useState } from 'react';
import { Monitor, Server, Smartphone } from 'lucide-react';
import CodeBlock from '../CodeBlock';
import { useLanguage } from '../../context/LanguageContext';
import {
  docsSdkEnvironmentLabels,
  docsSdkExplorerCopy,
  docsSdkVariants,
  getDocsSdkFileName,
  getDocsSdkSnippet,
  getSupportedDocsSdkVariants,
  type DocsSdkEnvironment,
  type DocsSdkVariantId
} from './docsSdkFlowCatalog';
import type { DocsSdkFlow } from './docsModel';

interface DocsSdkFlowCodeExplorerProps {
  flow: DocsSdkFlow;
}

const environmentIcons: Record<DocsSdkEnvironment, typeof Monitor> = {
  web: Monitor,
  server: Server,
  mobile: Smartphone
};

const compactCodeMaxHeight = 'max-h-[34rem]';

export default function DocsSdkFlowCodeExplorer({ flow }: DocsSdkFlowCodeExplorerProps) {
  const { language } = useLanguage();
  const copy = docsSdkExplorerCopy[language];
  const supportedVariants = useMemo(() => getSupportedDocsSdkVariants(flow), [flow]);
  const [environment, setEnvironment] = useState<DocsSdkEnvironment>(supportedVariants[0].environment);
  const [variantId, setVariantId] = useState<DocsSdkVariantId>(supportedVariants[0].id);

  useEffect(() => {
    const nextVariant = getSupportedDocsSdkVariants(flow)[0];
    setEnvironment(nextVariant.environment);
    setVariantId(nextVariant.id);
  }, [flow]);

  const environments = Array.from(new Set<DocsSdkEnvironment>(supportedVariants.map(variant => variant.environment)));
  const variantsForEnvironment = supportedVariants.filter(variant => variant.environment === environment);
  const selectedVariant = docsSdkVariants.find(variant => variant.id === variantId) ?? variantsForEnvironment[0];
  const code = getDocsSdkSnippet(flow, selectedVariant.id, language);

  const selectEnvironment = (nextEnvironment: DocsSdkEnvironment) => {
    const nextVariant = supportedVariants.find(variant => variant.environment === nextEnvironment);
    if (!nextVariant) return;

    setEnvironment(nextEnvironment);
    setVariantId(nextVariant.id);
  };

  return (
    <div className="not-prose mt-4 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-5 p-4 sm:p-5">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {copy.chooseRuntime}
          </p>
          <div className="flex flex-wrap gap-2">
            {environments.map(item => {
              const Icon = environmentIcons[item];
              const isActive = item === environment;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectEnvironment(item)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-[#5B6CFF] bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF]'
                      : 'border-slate-200 text-slate-600 hover:border-[#5B6CFF]/50 hover:text-[#5B6CFF] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#7C8CFF]/50 dark:hover:text-[#7C8CFF]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{docsSdkEnvironmentLabels[item][language]}</span>
                </button>
              );
            })}
          </div>
          {flow === 'holder' && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              {copy.mobileOnly}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {copy.chooseSdk}
          </p>
          <div className="flex flex-wrap gap-2">
            {variantsForEnvironment.map(variant => {
              const isActive = variant.id === selectedVariant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setVariantId(variant.id)}
                  className={`min-h-10 rounded-xl px-3 text-left text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 text-slate-600 hover:text-[#5B6CFF] dark:bg-slate-800 dark:text-slate-300 dark:hover:text-[#7C8CFF]'
                  }`}
                >
                  {variant.framework} · {variant.language}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <CodeBlock
        language={selectedVariant.syntax}
        code={code}
        fileName={getDocsSdkFileName(selectedVariant)}
        maxHeightClassName={compactCodeMaxHeight}
        flush
      />
    </div>
  );
}
