import { useEffect, useMemo, useState } from 'react';
import { Monitor, Server, Smartphone } from 'lucide-react';
import CodeBlock from '../CodeBlock';
import { useLanguage } from '../../context/LanguageContext';
import {
  docsSdkEnvironmentLabels,
  docsSdkExplorerCopy,
  docsSdkVariants,
  type DocsSdkEnvironment,
  type DocsSdkVariantId
} from './docsSdkCatalog';
import { getDocsReferenceFileName, getDocsReferenceSnippet } from './docsSdkReferenceCatalog';
import type { DocsReferenceCodeKey } from './docsTypes';

interface DocsSdkReferenceCodeProps {
  codeKey: DocsReferenceCodeKey;
  variants: DocsSdkVariantId[];
}

const environmentIcons: Record<DocsSdkEnvironment, typeof Monitor> = {
  web: Monitor,
  server: Server,
  mobile: Smartphone
};

const compactCodeMaxHeight = 'max-h-[34rem]';

export default function DocsSdkReferenceCode({ codeKey, variants }: DocsSdkReferenceCodeProps) {
  const { language } = useLanguage();
  const copy = docsSdkExplorerCopy[language];
  const availableVariants = useMemo(
    () => docsSdkVariants.filter(variant => variants.includes(variant.id)),
    [variants]
  );
  const [variantId, setVariantId] = useState<DocsSdkVariantId>(availableVariants[0]?.id ?? 'web-javascript');

  useEffect(() => {
    setVariantId(availableVariants[0]?.id ?? 'web-javascript');
  }, [availableVariants]);

  const selectedVariant = availableVariants.find(variant => variant.id === variantId) ?? availableVariants[0];

  if (!selectedVariant) return null;

  const environments = Array.from(new Set<DocsSdkEnvironment>(availableVariants.map(variant => variant.environment)));
  const variantsForEnvironment = availableVariants.filter(variant => variant.environment === selectedVariant.environment);
  const code = getDocsReferenceSnippet(codeKey, selectedVariant.id, language);

  const selectEnvironment = (environment: DocsSdkEnvironment) => {
    const nextVariant = availableVariants.find(variant => variant.environment === environment);
    if (nextVariant) setVariantId(nextVariant.id);
  };

  return (
    <div className="border-t border-slate-100 dark:border-slate-800/40">
      <div className="grid gap-5 p-4 sm:p-5">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {copy.chooseRuntime}
          </p>
          <div className="flex flex-wrap gap-2">
            {environments.map(environment => {
              const Icon = environmentIcons[environment];
              const isActive = environment === selectedVariant.environment;

              return (
                <button
                  key={environment}
                  type="button"
                  onClick={() => selectEnvironment(environment)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-[#5B6CFF] bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF]'
                      : 'border-slate-200 text-slate-600 hover:border-[#5B6CFF]/50 hover:text-[#5B6CFF] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#7C8CFF]/50 dark:hover:text-[#7C8CFF]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{docsSdkEnvironmentLabels[environment][language]}</span>
                </button>
              );
            })}
          </div>
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
        fileName={getDocsReferenceFileName(selectedVariant)}
        maxHeightClassName={compactCodeMaxHeight}
        flush
      />
    </div>
  );
}
