import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  FileStack,
  KeyRound,
  QrCode,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import {
  CREDENTIAL_ISSUANCE_PREVIEW_CAPABILITY_IDS,
  CREDENTIAL_ISSUANCE_PREVIEW_TRANSLATIONS,
  type CredentialIssuancePreviewCapabilityId,
} from '../../translations/dashboard/CredentialIssuancePreviewTranslations';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedRecord } from '../../utils/i18nRuntime';

const CAPABILITY_ICONS: Record<CredentialIssuancePreviewCapabilityId, LucideIcon> = {
  modules: FileStack,
  delivery: QrCode,
  custody: KeyRound,
  lifecycle: RefreshCw,
};

type CredentialIssuancePreviewProps = {
  readonly onOpenDocs: () => void;
  readonly onBack: () => void;
};

export default function CredentialIssuancePreview({
  onOpenDocs,
  onBack,
}: CredentialIssuancePreviewProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    CREDENTIAL_ISSUANCE_PREVIEW_TRANSLATIONS,
    language,
    'CREDENTIAL_ISSUANCE_PREVIEW_TRANSLATIONS',
  );

  return (
    <section className="min-h-[inherit] bg-[#FAFBFD] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#0F1E36]/8">
          <div className="relative overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#5B6DFF]/12 blur-3xl"
            />
            <div className="relative max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-label uppercase tracking-wider text-[#354CE1]">
                  {copy.eyebrow}
                </span>
                <span className="type-label rounded-full bg-[#EEF1FF] px-3 py-1 text-[#354CE1]">
                  {copy.status}
                </span>
              </div>
              <span className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#354CE1] text-white shadow-lg shadow-[#354CE1]/20">
                <BadgeCheck className="h-7 w-7" aria-hidden="true" />
              </span>
              <h1 className="type-featured-title mt-6 text-balance text-[#0F1E36]">
                {copy.title}
              </h1>
              <p className="type-body mt-4 max-w-2xl text-slate-600">
                {copy.description}
              </p>
            </div>
          </div>

          <div className="bg-[#F6F8FB] px-6 py-10 sm:px-10 lg:px-14">
            <p className="type-label uppercase tracking-wider text-slate-500">
              {copy.capabilitiesLabel}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CREDENTIAL_ISSUANCE_PREVIEW_CAPABILITY_IDS.map((capabilityId) => {
                const Icon = CAPABILITY_ICONS[capabilityId];
                const capability = copy.capabilities[capabilityId];
                return (
                  <article
                    key={capabilityId}
                    className="rounded-2xl bg-white p-5 shadow-sm shadow-[#0F1E36]/5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF1FF] text-[#354CE1]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="type-card-title-sm mt-4 text-[#0F1E36]">
                      {capability.title}
                    </h2>
                    <p className="type-body-sm mt-2 text-slate-600">
                      {capability.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onOpenDocs}
                className="type-control inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-6 py-3 text-white shadow-md shadow-[#354CE1]/20 transition hover:bg-[#283DBF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.docsCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onBack}
                className="type-control inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-slate-700 shadow-sm transition hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {copy.backCta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
