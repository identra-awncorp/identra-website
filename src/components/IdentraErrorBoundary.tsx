/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IDENTRA_ERROR_BOUNDARY_TRANSLATIONS, type IdentraErrorBoundaryCopy } from '../translations/IdentraErrorBoundaryTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

interface BoundaryProps {
  copy: IdentraErrorBoundaryCopy;
  children: ReactNode;
}

class Boundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // The error name only: messages may carry data from the API.
    console.error(`[identra] a section failed to render: ${error.name}`, info.componentStack?.split('\n')[1]?.trim() ?? '');
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { copy } = this.props;
    return (
      <div role="alert" className="flex flex-wrap items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
        <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="type-card-title">{copy.title}</p>
          <p className="type-body">{copy.body}</p>
        </div>
        <button
          type="button"
          onClick={() => this.setState({ failed: false })}
          className="type-control min-h-11 cursor-pointer rounded-full border border-amber-300 bg-white px-5 text-amber-950 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
        >
          {copy.retry}
        </button>
      </div>
    );
  }
}

/** Keeps a rendering failure inside one experience instead of turning the whole page white. */
export default function IdentraErrorBoundary({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(IDENTRA_ERROR_BOUNDARY_TRANSLATIONS, language, 'IDENTRA_ERROR_BOUNDARY_TRANSLATIONS');
  return <Boundary copy={copy}>{children}</Boundary>;
}
