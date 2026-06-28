import { useEffect, useMemo, useState } from 'react';
import { Check, Code2, Copy, Monitor, Server, Smartphone } from 'lucide-react';
import {
  environmentLabels,
  getSdkSnippet,
  getSupportedVariants,
  sdkFlows,
  sdkVariants,
  type SdkEnvironment,
  type SdkFlow,
  type SdkVariantId,
} from '../identraSdkCatalog';
import SyntaxHighlightedCode from './SyntaxHighlightedCode';

interface SdkCodeExplorerProps {
  lang: 'vi' | 'en';
  flow: SdkFlow;
  onFlowChange?: (flow: SdkFlow) => void;
  showFlowTabs?: boolean;
}

const environmentIcons = { web: Monitor, server: Server, mobile: Smartphone };

export default function SdkCodeExplorer({ lang, flow, onFlowChange, showFlowTabs = false }: SdkCodeExplorerProps) {
  const isVi = lang === 'vi';
  const supported = useMemo(() => getSupportedVariants(flow), [flow]);
  const [environment, setEnvironment] = useState<SdkEnvironment>(supported[0].environment);
  const [variantId, setVariantId] = useState<SdkVariantId>(supported[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const next = getSupportedVariants(flow)[0];
    setEnvironment(next.environment);
    setVariantId(next.id);
  }, [flow]);

  const variantsForEnvironment = supported.filter((variant) => variant.environment === environment);
  const variant = sdkVariants.find((item) => item.id === variantId) ?? variantsForEnvironment[0];
  const code = getSdkSnippet(flow, variant.id, lang);
  const environments = Array.from(new Set<SdkEnvironment>(supported.map((item) => item.environment)));

  const selectEnvironment = (next: SdkEnvironment) => {
    setEnvironment(next);
    setVariantId(supported.find((variantItem) => variantItem.environment === next)!.id);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {showFlowTabs && (
        <div className="flex gap-1 overflow-x-auto border-b border-slate-200 p-2 dark:border-slate-800">
          {sdkFlows.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onFlowChange?.(item.id)}
              className={`min-h-10 whitespace-nowrap rounded-xl px-4 text-xs font-bold transition-colors ${
                item.id === flow
                  ? 'bg-[#5B6CFF] text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {item.shortTitle[lang]}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 p-4 sm:p-5">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {isVi ? '1. Chọn môi trường chạy' : '1. Choose runtime'}
          </p>
          <div className="flex flex-wrap gap-2">
            {environments.map((item) => {
              const Icon = environmentIcons[item];
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectEnvironment(item)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors ${
                    item === environment
                      ? 'border-[#5B6CFF] bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF]'
                      : 'border-slate-200 text-slate-600 hover:border-[#5B6CFF]/50 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="size-4" />
                  {environmentLabels[item][lang]}
                </button>
              );
            })}
          </div>
          {flow === 'holder' && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              {isVi
                ? 'Luồng này chỉ hỗ trợ mobile vì thực chứng phải nằm trong một secure vault duy nhất trên điện thoại.'
                : 'This flow supports mobile only because credentials must remain in one secure vault on the phone.'}
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {isVi ? '2. Chọn SDK và ngôn ngữ' : '2. Choose SDK and language'}
          </p>
          <div className="flex flex-wrap gap-2">
            {variantsForEnvironment.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVariantId(item.id)}
                className={`min-h-10 rounded-xl px-3 text-left text-xs font-bold transition-colors ${
                  item.id === variant.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:text-[#5B6CFF] dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {item.framework} · {item.language}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0D1220]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-[11px] font-bold text-slate-400">
            <Code2 className="size-3.5 shrink-0 text-[#8F9BFF]" />
            <span className="truncate">{variant.framework} · {variant.language} · {variant.packageName}</span>
          </div>
          <button type="button" onClick={copy} className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold text-slate-300 hover:bg-white/10 hover:text-white">
            {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
            {copied ? (isVi ? 'Đã chép' : 'Copied') : isVi ? 'Sao chép' : 'Copy'}
          </button>
        </div>
        <pre className="max-h-[34rem] overflow-auto p-4 text-left text-xs leading-6 text-slate-200 sm:p-5">
          <SyntaxHighlightedCode code={code} language={variant.syntax} />
        </pre>
      </div>
    </div>
  );
}
