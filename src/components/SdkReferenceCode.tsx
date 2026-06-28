import { useEffect, useMemo, useState } from 'react';
import { Check, Code2, Copy, Monitor, Server, Smartphone } from 'lucide-react';
import { environmentLabels, sdkVariants, type SdkEnvironment, type SdkVariantId } from '../identraSdkCatalog';
import { getReferenceSnippet, type ReferenceCodeKey } from '../identraSdkReference';
import SyntaxHighlightedCode from './SyntaxHighlightedCode';

interface SdkReferenceCodeProps {
  lang: 'vi' | 'en';
  codeKey: ReferenceCodeKey;
  variants: SdkVariantId[];
}

const environmentIcons = { web: Monitor, server: Server, mobile: Smartphone };

export default function SdkReferenceCode({ lang, codeKey, variants }: SdkReferenceCodeProps) {
  const available = useMemo(() => sdkVariants.filter((item) => variants.includes(item.id)), [variants]);
  const [variantId, setVariantId] = useState<SdkVariantId>(available[0].id);
  const [copied, setCopied] = useState(false);
  const variant = available.find((item) => item.id === variantId) ?? available[0];
  const environments = Array.from(new Set<SdkEnvironment>(available.map((item) => item.environment)));
  const code = getReferenceSnippet(codeKey, variant.id, lang);
  const isVi = lang === 'vi';

  useEffect(() => setVariantId(available[0].id), [codeKey, available]);

  const chooseEnvironment = (environment: SdkEnvironment) => {
    setVariantId(available.find((item) => item.environment === environment)!.id);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {environments.map((environment) => {
            const Icon = environmentIcons[environment];
            return (
              <button key={environment} type="button" onClick={() => chooseEnvironment(environment)} className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold ${variant.environment === environment ? 'border-[#5B6CFF] bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF]' : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'}`}>
                <Icon className="size-4" />{environmentLabels[environment][lang]}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {available.filter((item) => item.environment === variant.environment).map((item) => (
            <button key={item.id} type="button" onClick={() => setVariantId(item.id)} className={`min-h-10 rounded-xl px-3 text-xs font-bold ${item.id === variant.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              {item.framework} · {item.language}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#0D1220]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-[11px] font-bold text-slate-400"><Code2 className="size-3.5 shrink-0 text-[#8F9BFF]" /><span className="truncate">{variant.framework} · {variant.language} · {variant.packageName}</span></div>
          <button type="button" onClick={copy} className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold text-slate-300 hover:bg-white/10 hover:text-white">{copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}{copied ? (isVi ? 'Đã chép' : 'Copied') : isVi ? 'Sao chép' : 'Copy'}</button>
        </div>
        <pre className="max-h-[38rem] overflow-auto p-4 text-left text-xs leading-6 text-slate-200 sm:p-5"><SyntaxHighlightedCode code={code} language={variant.syntax} /></pre>
      </div>
    </div>
  );
}
