/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useSecondsUntilLocal } from '../hooks/useSchoolPortal';
import { useInertAppRoot } from '../hooks/useModalLayer';
import type { ConfirmState } from '../identra/schoolPortalState';
import { formatCountdown } from '../identra/verifierSession';
import type { SchoolPortalPageCopy } from '../translations/SchoolPortalPageTranslations';

// The portal's confirmation dialog for a status change (a student's revocation, a registrar's change),
// shared with the guided diploma demo.

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/60 aria-disabled:cursor-not-allowed aria-disabled:bg-[#354CE1]/60 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 ${focusRing}`;
const apiText = 'break-words [overflow-wrap:anywhere]';

export default function ConfirmDialog({
  title,
  subtitle,
  body,
  confirmLabel,
  destructive,
  state,
  problemText,
  onConfirm,
  onCancel,
  copy,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  body: ReactNode;
  confirmLabel: string;
  destructive: boolean;
  state: Extract<ConfirmState<unknown>, { phase: 'confirm' | 'saving' | 'failed' }>;
  problemText: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  copy: SchoolPortalPageCopy;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const saving = state.phase === 'saving';
  const problem = state.phase === 'failed' ? state.problem : null;
  const waitSeconds = useSecondsUntilLocal(state.phase === 'failed' ? state.retryAt : null);
  const blocked = saving || waitSeconds > 0;
  useInertAppRoot(true);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  // While saving, the buttons stay focusable (aria-disabled), so focus never falls out of the dialog.
  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      if (!saving) onCancel();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? []);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 sm:items-center sm:p-4">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="school-portal-confirm-title"
        aria-describedby="school-portal-confirm-body"
        aria-busy={saving}
        onKeyDown={handleKeyDown}
        data-testid="portal-confirm-dialog"
        className="max-h-[100dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <h2 id="school-portal-confirm-title" className={`type-featured-title text-[#0F1E36] ${apiText}`}>{title}</h2>
        <div className="type-body-sm mt-1 text-slate-600">{subtitle}</div>
        <div id="school-portal-confirm-body" className="mt-4 space-y-3">
          {body}
          <p className="type-body text-slate-600">{copy.timingNote}</p>
        </div>
        {problem && problemText && (
          <div role="alert" data-testid="portal-confirm-problem" className="type-body mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p>{problemText}</p>
              {waitSeconds > 0 && (
                <p className="tabular-nums">{fill(copy.retryIn, { time: formatCountdown(waitSeconds) })}</p>
              )}
            </div>
          </div>
        )}
        {saving && (
          <p role="status" className="type-body mt-4 flex items-center gap-2 text-slate-700">
            <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />
            {copy.saving}
          </p>
        )}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={() => { if (!saving) onCancel(); }}
            aria-disabled={saving}
            data-testid="portal-confirm-cancel"
            className={secondaryButton}
          >
            {copy.cancel}
          </button>
          {problem !== 'already_revoked' && problem !== 'not_found' && (
            <button
              type="button"
              onClick={() => { if (!blocked) onConfirm(); }}
              aria-disabled={blocked}
              data-testid="portal-confirm-submit"
              className={destructive
                ? `type-control inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-rose-700 px-5 text-white transition-colors hover:bg-rose-800 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 ${focusRing}`
                : primaryButton}
            >
              {problem ? copy.retry : confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
