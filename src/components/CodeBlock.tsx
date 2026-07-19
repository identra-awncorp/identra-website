import { useState, type ReactNode } from 'react';
import { AlertCircle, Check, Code2, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CODE_BLOCK_TRANSLATIONS } from '../translations/CodeBlockTranslations';
import { copyTextToClipboard } from '../utils/clipboard';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
  className?: string;
  maxHeightClassName?: string;
  flush?: boolean;
}

type HighlightLanguage = 'typescript' | 'javascript' | 'bash' | 'go' | 'java' | 'swift' | 'json' | 'text';

const tokenPattern =
  /(\/\/.*|#.*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:abstract|async|await|break|case|catch|class|const|continue|default|defer|do|else|enum|export|extends|final|finally|for|from|func|function|guard|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|static|struct|switch|throw|throws|try|type|typeof|var|while)\b|\b(?:true|false|null|nil|undefined)\b|\b\d+(?:\.\d+)?\b)/g;

function normalizeLanguage(language: string): HighlightLanguage {
  const value = language.toLowerCase();

  if (value === 'tsx' || value === 'ts') return 'typescript';
  if (value === 'jsx' || value === 'js') return 'javascript';
  if (value === 'shell' || value === 'sh' || value === 'zsh' || value === 'powershell') return 'bash';
  if (['typescript', 'javascript', 'bash', 'go', 'java', 'swift', 'json'].includes(value)) {
    return value as HighlightLanguage;
  }

  return 'text';
}

function tokenClassName(token: string, language: HighlightLanguage) {
  if (token.startsWith('//') || (language === 'bash' && token.startsWith('#'))) {
    return 'text-emerald-400/85';
  }

  if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`')) {
    return 'text-amber-300';
  }

  if (/^(true|false|null|nil|undefined)$/.test(token)) {
    return 'text-rose-300';
  }

  if (/^\d/.test(token)) {
    return 'text-sky-300';
  }

  return 'font-semibold text-[#AEB7FF]';
}

function highlightLine(line: string, language: HighlightLanguage, lineIndex: number) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  if (language === 'text') return [line];

  for (const match of line.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    const token = match[0];

    if (index > cursor) {
      nodes.push(line.slice(cursor, index));
    }

    nodes.push(
      <span key={`${lineIndex}-${index}`} className={tokenClassName(token, language)}>
        {token}
      </span>
    );
    cursor = index + token.length;
  }

  if (cursor < line.length) {
    nodes.push(line.slice(cursor));
  }

  return nodes;
}

function SyntaxHighlightedCode({ code, language }: { code: string; language: HighlightLanguage }) {
  return (
    <code className="text-slate-200">
      {code.split('\n').map((line, index, lines) => (
        <span key={index}>
          {highlightLine(line, language, index)}
          {index < lines.length - 1 ? '\n' : null}
        </span>
      ))}
    </code>
  );
}

export default function CodeBlock({
  code,
  language: codeLanguage,
  fileName,
  className = '',
  maxHeightClassName = 'max-h-[38rem]',
  flush = false
}: CodeBlockProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CODE_BLOCK_TRANSLATIONS, language as keyof typeof CODE_BLOCK_TRANSLATIONS, 'CODE_BLOCK_TRANSLATIONS');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const trimmedCode = code.trim();
  const normalizedLanguage = normalizeLanguage(codeLanguage);
  const displayLabel = fileName ?? codeLanguage.toUpperCase();
  const rootClassName = flush
    ? `min-w-0 overflow-hidden bg-white text-left dark:bg-slate-900 ${className}`
    : `mt-3 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`;

  const handleCopy = async () => {
    const copied = await copyTextToClipboard(trimmedCode);
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className={rootClassName}>
      <div className="bg-[#0D1220]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-[11px] font-bold text-slate-400">
            <Code2 className="size-3.5 shrink-0 text-[#8F9BFF]" />
            <span className="truncate">{displayLabel}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            title={copyStatus === 'error' ? t.copyFailed : t.copyCode}
            aria-label={copyStatus === 'error' ? t.copyFailed : t.copyCode}
          >
            {copyStatus === 'success' ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.copied}</span>
              </>
            ) : copyStatus === 'error' ? (
              <>
                <AlertCircle className="size-3.5 text-rose-400" />
                <span className="text-rose-400">{t.copyFailed}</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>{t.copy}</span>
              </>
            )}
          </button>
        </div>

        <pre
          className={`m-0 overflow-auto bg-[#0D1220] p-4 text-left font-mono text-xs leading-6 text-slate-200 sm:p-5 ${maxHeightClassName}`}
        >
          <SyntaxHighlightedCode code={trimmedCode} language={normalizedLanguage} />
        </pre>
      </div>
    </div>
  );
}
