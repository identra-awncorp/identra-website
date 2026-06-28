import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Database,
  FileBadge2,
  Fingerprint,
  KeyRound,
  Link2,
  LockKeyhole,
  QrCode,
  ReceiptText,
  ScanSearch,
  Send,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Waypoints,
} from 'lucide-react';
import {
  referenceActors,
  referencePhases,
  sdkReferenceSteps,
  type ReferenceActor,
  type ReferencePhase,
} from '../identraSdkReference';
import SdkReferenceCode from './SdkReferenceCode';

interface DocumentSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo?: () => void;
}

const actorStyles: Record<ReferenceActor, string> = {
  issuer: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  holder: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  verifier: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

const stepIcons = [
  KeyRound,
  Database,
  Smartphone,
  QrCode,
  Link2,
  FileBadge2,
  LockKeyhole,
  Fingerprint,
  QrCode,
  Link2,
  Send,
  FileBadge2,
  ScanSearch,
  ReceiptText,
];

const phaseOrder: ReferencePhase[] = ['identity', 'issuance', 'verification'];

export default function DocumentSubpage({ lang, onBack, onOpenDemo }: DocumentSubpageProps) {
  const isVi = lang === 'vi';
  const [activeStep, setActiveStep] = useState(sdkReferenceSteps[0].id);

  useEffect(() => {
    const elements = sdkReferenceSteps
      .map((step) => document.getElementById(step.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(visible.target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2, 0.5] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (id: string) => {
    setActiveStep(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F8FC] pb-24 text-[#1F2937] dark:bg-[#0B0F1A] dark:text-[#E5E7EB]">
      <section className="border-b border-[#E5E7EB] bg-white px-6 pb-16 pt-8 dark:border-slate-800/80 dark:bg-[#0F172A]/45 lg:px-12 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-left">
            <button type="button" onClick={onBack} className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#5B6CFF] hover:text-[#4A5AF0] dark:text-[#7C8CFF]">
              <ArrowLeft className="size-4" />
              {isVi ? 'Quay lại Trang chủ' : 'Back to Home'}
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="space-y-6 text-left lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#5B6CFF]/10 bg-[#5B6CFF]/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">
                <BookOpenCheck className="size-3.5" />
                {isVi ? 'Tham chiếu kỹ thuật Identra SDK' : 'Identra SDK technical reference'}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {isVi ? 'Toàn bộ vòng đời mật mã của một thực chứng' : 'The complete cryptographic lifecycle of a credential'}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-[#6B7280] dark:text-gray-400 sm:text-lg">
                  {isVi
                    ? 'Tài liệu API chi tiết từ tạo khóa, đăng ký DID trên CertNet, thiết lập DIDComm, cấp phát và mã hóa VC đến tạo VP, xác minh và trả kết quả cho Holder.'
                    : 'A detailed API reference from key creation and CertNet DID registration through DIDComm, VC issuance and encryption, VP creation, verification, and Holder receipts.'}
                </p>
              </div>
              <button type="button" onClick={() => scrollToStep(sdkReferenceSteps[0].id)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#5B6CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4A5AF0]">
                {isVi ? 'Đọc API theo lifecycle' : 'Read the lifecycle API'}
                <ArrowRight className="size-4" />
              </button>
            </div>

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
                    identra_sdk_lifecycle.ts
                  </div>
                  <div className="flex gap-1.5">
                    <span className="block size-2.5 rounded-full bg-gray-700" />
                    <span className="block size-2.5 rounded-full bg-gray-700" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-hidden text-left text-[11px] text-gray-400">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#7C8CFF]">
                    <span className="block size-2 animate-ping rounded-full bg-emerald-500" />
                    <span>{isVi ? 'IDENTRA SDK · TRUST LIFECYCLE' : 'IDENTRA SDK · TRUST LIFECYCLE'}</span>
                  </div>

                  <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-950/80 p-3.5 font-sans">
                    <div className="flex items-center justify-between text-[9px] font-bold tracking-wide text-gray-500">
                      <span>CERTNET + DIDCOMM</span>
                      <span className="text-blue-400">14 API STAGES</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold tracking-tight text-slate-100">
                        {isVi ? 'Vòng đời tin cậy của thực chứng' : 'Credential trust lifecycle'}
                      </p>
                      <p className="text-[10px] leading-tight text-gray-500">
                        {isVi
                          ? 'Tạo khóa · Đăng ký DID · Cấp VC · Tạo VP · Xác minh · Gửi receipt'
                          : 'Create keys · Register DID · Issue VC · Create VP · Verify · Send receipt'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] text-gray-600">
                        <span>{isVi ? 'ĐỒNG BỘ TRẠNG THÁI LIFECYCLE' : 'LIFECYCLE STATE SYNCHRONIZED'}</span>
                        <span>14 / 14</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pl-1.5 font-mono text-[9px] text-gray-500">
                    <p className="font-bold text-gray-600">// sdk_execution_log:</p>
                    <p>✓ did_document_registered: <span className="text-emerald-400">"certnet://confirmed"</span></p>
                    <p>✓ vp_signature_verified: <span className="text-emerald-400">"public_key_resolved"</span></p>
                    <p>→ verification_receipt: <span className="text-yellow-400">"sent_to_holder"</span></p>
                  </div>
                </div>

                <div className="absolute -left-6 top-1/4 flex animate-bounce items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white/95 p-4 shadow-lg backdrop-blur-md [animation-duration:6s] dark:border-slate-800 dark:bg-slate-900/95">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div className="text-left font-sans">
                    <span className="block text-[9px] font-black uppercase tracking-wider text-emerald-500">CertNet resolved</span>
                    <span className="block text-xs font-black text-slate-900 dark:text-white">{isVi ? 'Khóa công khai hợp lệ' : 'Valid public key'}</span>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-10 flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF]">
                    <ReceiptText className="size-5" />
                  </div>
                  <div className="text-left font-sans text-xs text-slate-900 dark:text-white">
                    <span className="block font-bold">{isVi ? 'Receipt đã gửi' : 'Receipt delivered'}</span>
                    <span className="block text-[10px] leading-tight text-gray-400 dark:text-[#E2E8F0]">{isVi ? 'Holder đã nhận kết quả' : 'Holder received result'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-500/20 dark:bg-amber-500/5">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div><p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">{isVi ? 'Contract SDK trong tài liệu là thiết kế minh họa' : 'SDK contracts in this reference are illustrative'}</p><p className="mt-1 text-xs leading-relaxed text-amber-800 dark:text-amber-300/80">{isVi ? 'Tên package, API và endpoint chưa được phát hành. Tài liệu mô tả contract dự kiến và các ràng buộc bảo mật bắt buộc.' : 'Package names, APIs, and endpoints are not released. This reference describes intended contracts and mandatory security boundaries.'}</p></div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {phaseOrder.map((phase) => {
              const steps = sdkReferenceSteps.filter((step) => step.phase === phase);
              return <div key={phase} className="rounded-2xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900"><p className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">{referencePhases[phase][lang]}</p><p className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">{steps.length}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{isVi ? 'API stage được mô tả chi tiết' : 'API stages documented in detail'}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-12">
          <aside className="scrollbar-thin hidden lg:sticky lg:top-24 lg:col-span-3 lg:block lg:h-[calc(100dvh-7.5rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-left dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800"><Waypoints className="size-4 text-[#5B6CFF] dark:text-[#7C8CFF]" /><p className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">{isVi ? 'Lifecycle API' : 'API lifecycle'}</p></div>
              {phaseOrder.map((phase) => (
                <div key={phase} className="mb-4 last:mb-0">
                  <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{referencePhases[phase][lang]}</p>
                  <nav className="space-y-1">
                    {sdkReferenceSteps.filter((step) => step.phase === phase).map((step) => (
                      <button key={step.id} type="button" onClick={() => scrollToStep(step.id)} className={`flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left text-[11px] font-semibold leading-relaxed ${activeStep === step.id ? 'bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF]' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`}><span className="font-mono font-extrabold">{step.number}</span><span>{step.title[lang]}</span></button>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 space-y-8 lg:col-span-9">
            {sdkReferenceSteps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article key={step.id} id={step.id} className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-5 text-left dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5B6CFF] text-white"><Icon className="size-5" /></div>
                        <div><p className="font-mono text-xs font-extrabold text-[#5B6CFF] dark:text-[#7C8CFF]">{step.number} · {referencePhases[step.phase][lang]}</p><span className={`mt-1 inline-flex rounded-lg px-2 py-1 text-[10px] font-extrabold ${actorStyles[step.actor]}`}>{referenceActors[step.actor][lang]}</span></div>
                      </div>
                      <h2 className="mt-5 text-2xl font-extrabold leading-snug text-slate-900 dark:text-white">{step.title[lang]}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.summary[lang]}</p>
                    </div>
                    <div className="shrink-0 rounded-xl bg-[#F7F8FC] px-3 py-2 text-xs font-bold text-slate-600 dark:bg-[#0B0F1A] dark:text-slate-300">{step.protocol}</div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-[#F7F8FC] p-4 dark:bg-[#0B0F1A]"><p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{isVi ? 'Đầu vào API' : 'API inputs'}</p><div className="mt-3 space-y-2">{step.inputs.map((item) => <p key={item[lang]} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400"><ArrowRight className="mt-0.5 size-3.5 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" />{item[lang]}</p>)}</div></div>
                    <div className="rounded-2xl bg-[#F7F8FC] p-4 dark:bg-[#0B0F1A]"><p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{isVi ? 'Đầu ra API' : 'API outputs'}</p><div className="mt-3 space-y-2">{step.outputs.map((item) => <p key={item[lang]} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />{item[lang]}</p>)}</div></div>
                  </div>

                  <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#5B6CFF]/15 bg-[#5B6CFF]/5 p-4"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" /><div><p className="text-xs font-extrabold text-slate-900 dark:text-white">{isVi ? 'Ràng buộc bảo mật' : 'Security invariant'}</p><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{step.security[lang]}</p></div></div>

                  <div className="mt-6"><SdkReferenceCode lang={lang} codeKey={step.codeKey} variants={step.variants} /></div>
                </article>
              );
            })}
          </main>
        </div>
      </section>

      <section className="px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-[#5B6CFF]/20 bg-[#5B6CFF]/5 p-7 text-left sm:p-10 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{isVi ? 'Kiểm tra lifecycle dưới góc nhìn Holder' : 'Test the lifecycle from the Holder perspective'}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">{isVi ? 'Demo mô phỏng việc quét QR, kết nối DIDComm, chấp thuận chia sẻ và nhận kết quả xác minh.' : 'The demo simulates QR scanning, DIDComm connection, consent, and receiving the verification result.'}</p></div>
          <button type="button" onClick={onOpenDemo} className="min-h-11 whitespace-nowrap rounded-full bg-[#5B6CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4A5AF0]">{isVi ? 'Mở demo' : 'Open demo'}</button>
        </div>
      </section>
    </div>
  );
}
