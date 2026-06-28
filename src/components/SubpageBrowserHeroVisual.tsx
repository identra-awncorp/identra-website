import type { ReactNode } from 'react';

type LogTone = 'success' | 'warning' | 'info';

interface HeroLog {
  label: string;
  value: string;
  tone: LogTone;
}

interface FloatingStatus {
  icon: ReactNode;
  eyebrow: string;
  title: string;
}

interface SubpageBrowserHeroVisualProps {
  fileName: string;
  eyebrow: string;
  meta: string;
  status: string;
  title: string;
  description: string;
  progressLabel: string;
  progressValue: string;
  logsLabel: string;
  logs: HeroLog[];
  primaryStatus: FloatingStatus;
  secondaryStatus: FloatingStatus;
}

const logToneClasses: Record<LogTone, string> = {
  success: 'text-emerald-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
};

export default function SubpageBrowserHeroVisual({
  fileName,
  eyebrow,
  meta,
  status,
  title,
  description,
  progressLabel,
  progressValue,
  logsLabel,
  logs,
  primaryStatus,
  secondaryStatus,
}: SubpageBrowserHeroVisualProps) {
  return (
    <div className="subpage-hero-visual relative mx-auto hidden w-full max-w-[30rem] lg:col-span-5 lg:block lg:justify-self-end">
      <div className="pointer-events-none absolute -right-10 -top-10 -z-10 size-72 rounded-full bg-[#5B6CFF]/15 blur-3xl dark:bg-[#5B6CFF]/10" />

      <div className="relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 font-mono text-xs shadow-xl">
        <div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="block size-3 rounded-full bg-red-500/80" />
            <span className="block size-3 rounded-full bg-yellow-400/80" />
            <span className="block size-3 rounded-full bg-green-500/80" />
          </div>
          <div className="rounded-md border border-slate-700 bg-slate-800/80 px-3 py-1 text-[10px] text-gray-500">
            {fileName}
          </div>
          <div className="flex gap-1.5">
            <span className="block size-2.5 rounded-full bg-gray-700" />
            <span className="block size-2.5 rounded-full bg-gray-700" />
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-hidden text-left text-[11px] text-gray-400">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#7C8CFF]">
            <span className="block size-2 animate-ping rounded-full bg-emerald-500" />
            <span>{eyebrow}</span>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-950/80 p-3.5 font-sans">
            <div className="flex items-center justify-between text-[9px] font-bold tracking-wide text-gray-500">
              <span>{meta}</span>
              <span className="text-blue-400">{status}</span>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-tight text-slate-100">{title}</p>
              <p className="text-[10px] leading-tight text-gray-500">{description}</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-gray-600">
                <span>{progressLabel}</span>
                <span>{progressValue}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pl-1.5 font-mono text-[9px] text-gray-500">
            <p className="font-bold text-gray-600">// {logsLabel}:</p>
            {logs.map((log) => (
              <p key={log.label}>
                {log.label}: <span className={logToneClasses[log.tone]}>"{log.value}"</span>
              </p>
            ))}
          </div>
        </div>

        <div className="absolute -left-6 top-1/4 flex animate-bounce items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white/95 p-4 shadow-lg backdrop-blur-md [animation-duration:6s] dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            {primaryStatus.icon}
          </div>
          <div className="text-left font-sans">
            <span className="block text-[9px] font-black uppercase tracking-wider text-emerald-500">{primaryStatus.eyebrow}</span>
            <span className="block text-xs font-black text-slate-900 dark:text-white">{primaryStatus.title}</span>
          </div>
        </div>

        <div className="absolute -right-6 bottom-10 flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF]">
            {secondaryStatus.icon}
          </div>
          <div className="text-left font-sans text-xs text-slate-900 dark:text-white">
            <span className="block font-bold">{secondaryStatus.eyebrow}</span>
            <span className="block text-[10px] leading-tight text-gray-400 dark:text-[#E2E8F0]">{secondaryStatus.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
