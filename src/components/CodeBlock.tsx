import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { AlertCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CODE_BLOCK_TRANSLATIONS } from '../translations/CodeBlockTranslations';
import { copyTextToClipboard } from '../utils/clipboard';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
}

export default function CodeBlock({ code, language: codeLanguage, fileName }: CodeBlockProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CODE_BLOCK_TRANSLATIONS, language as keyof typeof CODE_BLOCK_TRANSLATIONS, 'CODE_BLOCK_TRANSLATIONS');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, codeLanguage]);

  const handleCopy = async () => {
    const copied = await copyTextToClipboard(code.trim());
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className="bg-[#0b0e14] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg mt-3 text-left">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0e121b] border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {fileName ? (
            <span className="text-slate-400 font-mono text-[11px] font-medium">{fileName}</span>
          ) : (
            <span className="text-slate-500 uppercase font-mono font-bold tracking-wider text-[10px]">{codeLanguage}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors py-1 px-2 rounded hover:bg-slate-800 font-medium"
          title={copyStatus === 'error' ? t.copyFailed : t.copyCode}
        >
          {copyStatus === 'success' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">{t.copied}</span>
            </>
          ) : copyStatus === 'error' ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-rose-400">{t.copyFailed}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copy}</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className={`language-${codeLanguage} m-0 p-0 text-xs font-mono leading-relaxed bg-transparent`}>
          <code ref={codeRef} className={`language-${codeLanguage} bg-transparent`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
}
