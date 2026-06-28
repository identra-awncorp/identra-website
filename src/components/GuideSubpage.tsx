import { ArrowLeft, ArrowRight, BookOpenCheck, FileBadge2, LockKeyhole, ShieldCheck, Smartphone, TriangleAlert } from 'lucide-react';
import { sdkFlows, type SdkFlow } from '../identraSdkCatalog';
import SdkCodeExplorer from './SdkCodeExplorer';
import SubpageBrowserHeroVisual from './SubpageBrowserHeroVisual';

interface GuideSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onOpenDemo?: () => void;
}

const flowIcons = { issuance: FileBadge2, holder: LockKeyhole, verification: ShieldCheck };

export default function GuideSubpage({ lang, onBack, onNavigate, onOpenDemo }: GuideSubpageProps) {
  const isVi = lang === 'vi';
  const guideCopy: Record<SdkFlow, { question: string; answer: string; boundary: string }> = {
    issuance: {
      question: isVi ? 'Ai tạo thực chứng và đoạn mã chạy ở đâu?' : 'Who creates a credential and where does the code run?',
      answer: isVi ? 'Tổ chức phát hành kiểm tra dữ liệu, ký VC và gửi cho người dùng. Họ có thể tích hợp trên web nội bộ, server hoặc ứng dụng.' : 'The issuer checks data, signs a VC, and sends it to the user. It may integrate on internal web, server, or app.',
      boundary: isVi ? 'Khóa ký của tổ chức phải được bảo vệ phù hợp với môi trường, ưu tiên HSM trên server.' : 'Organization signing keys must be protected for the runtime, preferably by an HSM on server.',
    },
    holder: {
      question: isVi ? 'Thực chứng nằm ở đâu và được chia sẻ thế nào?' : 'Where does the credential live and how is it shared?',
      answer: isVi ? 'VC chỉ nằm trong secure vault trên điện thoại. Người dùng quét QR, xem yêu cầu, đồng ý rồi ứng dụng mới tạo VP và gửi qua DIDComm.' : 'The VC lives only in the phone secure vault. The user scans a QR, reviews the request, consents, and only then does the app create and send a VP over DIDComm.',
      boundary: isVi ? 'Không có SDK Holder cho web hoặc server. Không export VC. Đổi thiết bị đồng nghĩa xóa toàn bộ VC trên thiết bị cũ.' : 'There is no Holder SDK for web or server. VCs cannot be exported. Device migration deletes every VC from the old phone.',
    },
    verification: {
      question: isVi ? 'Bên xác minh tin vào VP bằng cách nào?' : 'How does the verifier trust a VP?',
      answer: isVi ? 'Verifier nhận VP, lấy DID của holder và issuer bên trong, resolve DID Document trên CertNet rồi kiểm tra chữ ký, challenge và trạng thái thu hồi.' : 'The verifier receives a VP, extracts holder and issuer DIDs, resolves DID Documents on CertNet, then checks signatures, challenge, and revocation status.',
      boundary: isVi ? 'Verifier có thể chạy trên web, server hoặc app nhưng không được lưu VC như một Holder.' : 'A verifier may run on web, server, or app, but it must not store VCs as a Holder.',
    },
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F8FC] pb-24 text-[#1F2937] dark:bg-[#0B0F1A] dark:text-[#E5E7EB]">
      <section className="border-b border-[#E5E7EB] bg-white px-6 pb-16 pt-8 dark:border-slate-800/80 dark:bg-[#0F172A]/45 lg:px-12 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-left"><button type="button" onClick={onBack} className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#5B6CFF] hover:text-[#4A5AF0] dark:text-[#7C8CFF]"><ArrowLeft className="size-4" />{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</button></div>
          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="space-y-6 text-left lg:col-span-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#5B6CFF]/10 bg-[#5B6CFF]/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]"><BookOpenCheck className="size-3.5" />{isVi ? 'Hướng dẫn SSI theo vai trò' : 'Role-based SSI guide'}</div>
              <div className="space-y-4"><h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">{isVi ? 'Hiểu SSI qua nơi từng đoạn mã thực sự chạy' : 'Understand SSI by where each piece of code actually runs'}</h1><p className="max-w-2xl text-base leading-relaxed text-[#6B7280] dark:text-gray-400 sm:text-lg">{isVi ? 'Đi từng bước qua ba vai trò, xem ranh giới dữ liệu và chuyển đổi ví dụ giữa các SDK web, server và mobile.' : 'Walk through the three roles, understand data boundaries, and switch examples across web, server, and mobile SDKs.'}</p></div>
              <a href="#guide-flows" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#5B6CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4A5AF0]">{isVi ? 'Bắt đầu từng bước' : 'Start step by step'}<ArrowRight className="size-4" /></a>
            </div>
            <SubpageBrowserHeroVisual
              fileName="identra_ssi_guide.ts"
              eyebrow={isVi ? 'IDENTRA · HƯỚNG DẪN SSI' : 'IDENTRA · SSI GUIDE'}
              meta="ISSUER + HOLDER + VERIFIER"
              status={isVi ? '3 VAI TRÒ' : '3 ROLES'}
              title={isVi ? 'Một thực chứng, ba trách nhiệm rõ ràng' : 'One credential, three clear responsibilities'}
              description={isVi ? 'Phát hành VC · Lưu an toàn trên mobile · Tạo VP · Xác minh' : 'Issue VC · Secure mobile storage · Create VP · Verify'}
              progressLabel={isVi ? 'LUỒNG SSI ĐÃ SẴN SÀNG' : 'SSI FLOW READY'}
              progressValue="03 / 03"
              logsLabel="role_based_flow"
              logs={[
                { label: '✓ issuer_connection', value: 'didcomm_established', tone: 'success' },
                { label: '✓ holder_secure_vault', value: 'mobile_only', tone: 'success' },
                { label: '→ verifier_request', value: 'awaiting_consent', tone: 'warning' },
              ]}
              primaryStatus={{
                icon: <ShieldCheck className="size-5" />,
                eyebrow: 'DIDComm connected',
                title: isVi ? 'Kết nối SSI an toàn' : 'Secure SSI connection',
              }}
              secondaryStatus={{
                icon: <Smartphone className="size-5" />,
                eyebrow: isVi ? 'VC lưu trên mobile' : 'VC stored on mobile',
                title: isVi ? 'Một kho dữ liệu duy nhất' : 'One secure data vault',
              }}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-left"><h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{isVi ? 'SSI không có nghĩa mọi nền tảng đều giữ thực chứng' : 'SSI does not mean every platform holds credentials'}</h2><p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{isVi ? 'Identra phân tách rõ trách nhiệm: Issuer tạo VC, điện thoại của Holder là kho duy nhất, Verifier chỉ yêu cầu và xác minh VP.' : 'Identra separates responsibilities clearly: the Issuer creates VCs, the Holder phone is the only vault, and the Verifier only requests and verifies VPs.'}</p></div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left dark:border-amber-500/20 dark:bg-amber-500/5"><TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" /><div><p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">{isVi ? 'Quy tắc quan trọng nhất' : 'Most important rule'}</p><p className="mt-1 text-xs leading-relaxed text-amber-800 dark:text-amber-300/80">{isVi ? 'Web và server không bao giờ nhận SDK nắm giữ. Chúng không được import, export hoặc sao lưu VC của người dùng.' : 'Web and server never receive a holding SDK. They cannot import, export, or back up user VCs.'}</p></div></div>
        </div>
      </section>

      <section id="guide-flows" className="scroll-mt-24 border-y border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-[#0F172A]/35 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          {sdkFlows.map((flow, index) => {
            const Icon = flowIcons[flow.id];
            const copy = guideCopy[flow.id];
            return (
              <article key={flow.id} id={`guide-${flow.id}`} className="scroll-mt-24 rounded-3xl border border-slate-200 bg-[#F7F8FC] p-5 text-left dark:border-slate-800 dark:bg-[#0B0F1A] sm:p-7">
                <div className="grid gap-8 xl:grid-cols-12">
                  <div className="xl:col-span-4">
                    <div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-[#5B6CFF] text-white"><Icon className="size-5" /></div><span className="font-mono text-xs font-extrabold text-[#5B6CFF] dark:text-[#7C8CFF]">{isVi ? `BƯỚC 0${index + 1}` : `STEP 0${index + 1}`}</span></div>
                    <h2 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">{flow.title[lang]}</h2>
                    <p className="mt-2 text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF]">{flow.actor[lang]}</p>
                    <h3 className="mt-6 text-sm font-extrabold text-slate-900 dark:text-white">{copy.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{copy.answer}</p>
                    <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-white p-4 dark:bg-slate-900"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" /><p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{copy.boundary}</p></div>
                    {flow.id === 'holder' && <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#5B6CFF]/15 bg-[#5B6CFF]/5 p-4"><Smartphone className="mt-0.5 size-4 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" /><p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{isVi ? 'SDK khả dụng: React Native, Java Android và Swift iOS.' : 'Available SDKs: React Native, Java Android, and Swift iOS.'}</p></div>}
                  </div>
                  <div className="min-w-0 xl:col-span-8"><SdkCodeExplorer lang={lang} flow={flow.id} /></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 pt-16 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-[#5B6CFF]/20 bg-[#5B6CFF]/5 p-7 text-left sm:p-10 md:flex-row md:items-center"><div><h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{isVi ? 'Cần contract và module chi tiết hơn?' : 'Need detailed contracts and modules?'}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">{isVi ? 'Mở trang Tài liệu để so sánh toàn bộ môi trường, ngôn ngữ và ranh giới dữ liệu.' : 'Open Documentation to compare every runtime, language, and data boundary.'}</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={() => onNavigate?.('docs')} className="min-h-11 rounded-full border border-[#5B6CFF]/25 bg-white px-5 py-3 text-sm font-semibold text-[#5B6CFF] dark:bg-slate-900 dark:text-[#7C8CFF]">{isVi ? 'Tài liệu SDK' : 'SDK documentation'}</button><button type="button" onClick={onOpenDemo} className="min-h-11 rounded-full bg-[#5B6CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4A5AF0]">{isVi ? 'Mở demo' : 'Open demo'}</button></div></div>
      </section>
    </div>
  );
}
