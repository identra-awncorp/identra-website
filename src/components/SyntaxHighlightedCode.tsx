import type { ReactNode } from 'react';

export type SyntaxLanguage = 'typescript' | 'javascript' | 'bash' | 'go' | 'java' | 'swift' | 'json';

interface SyntaxHighlightedCodeProps {
  code: string;
  language?: SyntaxLanguage;
}

const tokenPattern =
  /(\/\/.*|#.*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:async|await|break|case|catch|class|const|continue|default|defer|else|enum|export|extends|finally|for|from|func|function|guard|if|implements|import|in|instanceof|interface|let|new|of|package|return|struct|switch|throw|throws|try|type|typeof|var|while)\b|\b(?:true|false|null|nil|undefined)\b|\b\d+(?:\.\d+)?\b)/g;

function tokenClassName(token: string, language: SyntaxLanguage) {
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

function highlightLine(line: string, language: SyntaxLanguage, lineIndex: number) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of line.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    const token = match[0];

    if (index > cursor) {
      nodes.push(line.slice(cursor, index));
    }

    nodes.push(
      <span key={`${lineIndex}-${index}`} className={tokenClassName(token, language)}>
        {token}
      </span>,
    );
    cursor = index + token.length;
  }

  if (cursor < line.length) {
    nodes.push(line.slice(cursor));
  }

  return nodes;
}

export default function SyntaxHighlightedCode({
  code,
  language = 'typescript',
}: SyntaxHighlightedCodeProps) {
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
