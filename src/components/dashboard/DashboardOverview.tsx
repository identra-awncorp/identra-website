/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  FilePenLine,
  GitBranch,
  Layers3,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react';
import type { Language } from '../../context/LanguageContext';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  createFlowProject,
  validateDynamicFlow,
  type FlowProject,
} from './dashboardModel';
import { useDialogFocus } from './useDialogFocus';

type FlowFilter = 'all' | 'draft' | 'ready';
type ModalState =
  | { readonly type: 'create' }
  | { readonly type: 'rename'; readonly project: FlowProject }
  | { readonly type: 'delete'; readonly project: FlowProject }
  | null;

type DashboardOverviewProps = {
  readonly copy: DashboardCopy;
  readonly language: Language;
  readonly projects: readonly FlowProject[];
  readonly recoveredCorruptData: boolean;
  readonly onCreate: (project: FlowProject) => void;
  readonly onRename: (project: FlowProject, name: string) => void;
  readonly onDuplicate: (project: FlowProject) => void;
  readonly onDelete: (project: FlowProject) => void;
  readonly onOpen: (project: FlowProject) => void;
};

const projectIsReady = (project: FlowProject) =>
  validateDynamicFlow(project.flow, project.customModules).length === 0;

export default function DashboardOverview({
  copy,
  language,
  projects,
  recoveredCorruptData,
  onCreate,
  onRename,
  onDuplicate,
  onDelete,
  onOpen,
}: DashboardOverviewProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FlowFilter>('all');
  const [modal, setModal] = useState<ModalState>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const readyCount = projects.filter(projectIsReady).length;
  const customModuleCount = projects.reduce(
    (count, project) => count + project.customModules.length,
    0,
  );
  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(language);
    return projects.filter((project) => {
      const ready = projectIsReady(project);
      const matchesFilter = filter === 'all'
        || (filter === 'ready' && ready)
        || (filter === 'draft' && !ready);
      const matchesQuery = !normalizedQuery
        || project.name.toLocaleLowerCase(language).includes(normalizedQuery)
        || project.description.toLocaleLowerCase(language).includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, language, projects, query]);

  const openCreateModal = () => {
    setName('');
    setDescription('');
    setModal({ type: 'create' });
  };

  const openRenameModal = (project: FlowProject) => {
    setName(project.name);
    setDescription('');
    setModal({ type: 'rename', project });
  };

  const closeModal = () => {
    setModal(null);
    setName('');
    setDescription('');
  };
  const dialogRef = useDialogFocus<HTMLDivElement>(Boolean(modal), closeModal);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName || !modal) return;

    if (modal.type === 'create') {
      onCreate(createFlowProject(normalizedName, description.trim()));
    } else if (modal.type === 'rename') {
      onRename(modal.project, normalizedName);
    }
    closeModal();
  };

  const formatDate = (date: string) => new Intl.DateTimeFormat(language, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {recoveredCorruptData && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-bold">{copy.overview.recoveredTitle}</p>
            <p className="mt-1 text-xs leading-5 text-amber-800">{copy.overview.recoveredDescription}</p>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(82,101,255,0.34),transparent_68%)]" />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9DA9FF]">
              {copy.overview.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {copy.overview.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              {copy.overview.description}
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#EEF0FF] focus:outline-none focus:ring-2 focus:ring-white/70 motion-reduce:transform-none"
          >
            <Plus className="h-4 w-4" />
            {copy.overview.newFlow}
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: copy.overview.totalFlows, value: projects.length, icon: GitBranch, color: 'text-[#354CE1]', background: 'bg-[#EEF0FF]' },
          { label: copy.overview.readyFlows, value: readyCount, icon: ShieldCheck, color: 'text-emerald-600', background: 'bg-emerald-50' },
          { label: copy.overview.customModules, value: customModuleCount, icon: Layers3, color: 'text-violet-600', background: 'bg-violet-50' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.background} ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-slate-950">{metric.value}</p>
                <p className="text-xs font-semibold text-slate-500">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">{copy.overview.searchPlaceholder}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.overview.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#354CE1] focus:bg-white focus:ring-2 focus:ring-[#354CE1]/10"
            />
          </label>
          <div className="flex rounded-xl bg-slate-100 p-1">
            {([
              ['all', copy.overview.allFilter],
              ['draft', copy.overview.draftFilter],
              ['ready', copy.overview.readyFilter],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === value
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#354CE1]">
              <GitBranch className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-lg font-bold text-slate-950">
              {projects.length === 0 ? copy.overview.emptyTitle : copy.overview.noResultsTitle}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {projects.length === 0
                ? copy.overview.emptyDescription
                : copy.overview.noResultsDescription}
            </p>
            {projects.length === 0 && (
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#354CE1] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#2739B8]"
              >
                <Plus className="h-4 w-4" />
                {copy.overview.createFirst}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  <th className="px-5 py-3.5">{copy.overview.flowColumn}</th>
                  <th className="px-5 py-3.5">{copy.overview.statusColumn}</th>
                  <th className="px-5 py-3.5">{copy.overview.modulesColumn}</th>
                  <th className="px-5 py-3.5">{copy.overview.updatedColumn}</th>
                  <th className="px-5 py-3.5 text-right">{copy.overview.actionsColumn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((project) => {
                  const ready = projectIsReady(project);
                  const moduleCount = project.flow.nodes.filter((node) => node.kind === 'verification').length;
                  return (
                    <tr key={project.id} className="group transition hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <button type="button" onClick={() => onOpen(project)} className="text-left">
                          <p className="text-sm font-bold text-slate-950 group-hover:text-[#354CE1]">{project.name}</p>
                          <p className="mt-1 max-w-md truncate text-xs text-slate-400">{project.description || '—'}</p>
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          ready
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {ready ? <CheckCircle2 className="h-3 w-3" /> : <FilePenLine className="h-3 w-3" />}
                          {ready ? copy.overview.readyStatus : copy.overview.draftStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-600">{moduleCount}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{formatDate(project.updatedAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            title={copy.overview.rename}
                            aria-label={copy.overview.rename}
                            onClick={() => openRenameModal(project)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                          >
                            <FilePenLine className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title={copy.overview.duplicate}
                            aria-label={copy.overview.duplicate}
                            onClick={() => onDuplicate(project)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title={copy.overview.delete}
                            aria-label={copy.overview.delete}
                            onClick={() => setModal({ type: 'delete', project })}
                            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpen(project)}
                            className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-[#354CE1]"
                          >
                            {copy.overview.openFlow}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={copy.close}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              aria-label={copy.close}
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>

            {modal.type === 'delete' ? (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Trash2 className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-slate-950">{copy.overview.deleteTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy.overview.deleteDescription}</p>
                <div className="mt-7 flex justify-end gap-3">
                  <button type="button" onClick={closeModal} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
                    {copy.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(modal.project);
                      closeModal();
                    }}
                    className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700"
                  >
                    {copy.overview.deleteAction}
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="pr-10 font-display text-xl font-bold text-slate-950">
                  {modal.type === 'create' ? copy.overview.createTitle : copy.overview.renameTitle}
                </h2>
                {modal.type === 'create' && (
                  <p className="mt-2 text-sm leading-6 text-slate-500">{copy.overview.createDescription}</p>
                )}
                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">{copy.overview.nameLabel}</span>
                    <input
                      autoFocus
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={copy.overview.namePlaceholder}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10"
                    />
                  </label>
                  {modal.type === 'create' && (
                    <label className="block">
                      <span className="text-xs font-bold text-slate-700">{copy.overview.descriptionLabel}</span>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder={copy.overview.descriptionPlaceholder}
                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10"
                      />
                    </label>
                  )}
                </div>
                <div className="mt-7 flex justify-end gap-3">
                  <button type="button" onClick={closeModal} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
                    {copy.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className="rounded-xl bg-[#354CE1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2739B8] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {modal.type === 'create' ? copy.overview.createAction : copy.overview.renameAction}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
