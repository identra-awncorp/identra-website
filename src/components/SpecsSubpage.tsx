import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Binary,
  Braces,
  CheckCircle2,
  Clock3,
  FileCode2,
  Fingerprint,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import SubpageBrowserHeroVisual from './SubpageBrowserHeroVisual';

interface SpecsSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
}

export default function SpecsSubpage({ lang, onBack }: SpecsSubpageProps) {
  const isVi = lang === 'vi';

  const profileSummary = [
    { label: isVi ? 'DID method' : 'DID method', value: 'did:identra', note: isVi ? 'DID chuẩn do CertNet trả về' : 'Canonical DID returned by CertNet', icon: Fingerprint },
    { label: isVi ? 'Mã hóa vault' : 'Vault encryption', value: 'AES-256-GCM', note: isVi ? 'Khóa đối xứng không được export' : 'Non-exportable symmetric key', icon: LockKeyhole },
    { label: isVi ? 'Challenge tối thiểu' : 'Minimum challenge', value: '32 bytes', note: isVi ? 'Sinh bằng CSPRNG cho mỗi phiên' : 'CSPRNG-generated per session', icon: Binary },
    { label: isVi ? 'TTL yêu cầu chia sẻ' : 'Request TTL', value: '5 minutes', note: isVi ? 'Quá hạn phải tạo phiên mới' : 'Create a new session after expiry', icon: Clock3 },
  ];

  const artifactContracts = [
    {
      artifact: 'DID Document',
      media: 'application/did+ld+json',
      encoding: 'UTF-8 JSON-LD',
      limit: '32 KB',
      required: 'id · verificationMethod · authentication · assertionMethod · service',
      rejection: isVi ? 'Khóa trùng ID, service endpoint không HTTPS, chứa dữ liệu cá nhân' : 'Duplicate key IDs, non-HTTPS service endpoint, or personal data',
    },
    {
      artifact: 'Verifiable Credential',
      media: 'application/vc+ld+json',
      encoding: 'Canonical JSON',
      limit: '64 KB',
      required: 'issuer · credentialSubject · validFrom · proof · credentialStatus',
      rejection: isVi ? 'Thiếu verificationMethod, issuer DID không resolve được, schema sai' : 'Missing verificationMethod, unresolved issuer DID, or invalid schema',
    },
    {
      artifact: 'Verifiable Presentation',
      media: 'application/vp+ld+json',
      encoding: 'Canonical JSON',
      limit: '128 KB',
      required: 'holder · verifiableCredential · proof.challenge · proof.domain',
      rejection: isVi ? 'Challenge không khớp, domain sai, VC hết hạn hoặc bị thu hồi' : 'Challenge mismatch, wrong domain, expired or revoked VC',
    },
    {
      artifact: 'DIDComm OOB Invitation',
      media: 'application/didcomm-plain+json',
      encoding: 'Base64URL in QR',
      limit: '2.9 KB QR',
      required: 'id · from · body.goal_code · body.accept · attachments',
      rejection: isVi ? 'Invitation đã dùng, hết hạn hoặc attachment chứa VC/VP' : 'Used or expired invitation, or attachment containing a VC or VP',
    },
  ];

  const securityRules = [
    { name: isVi ? 'Khóa ký DID' : 'DID signing key', value: 'Ed25519', detail: isVi ? 'Khóa mặc định cho chữ ký DID, VC và VP trong reference profile.' : 'Default signing key for DID, VC, and VP proofs in the reference profile.' },
    { name: isVi ? 'Khóa mã hóa DIDComm' : 'DIDComm encryption key', value: 'X25519', detail: isVi ? 'Tách biệt với khóa ký để giảm phạm vi ảnh hưởng khi xoay khóa.' : 'Separated from signing keys to reduce the impact radius of rotation.' },
    { name: isVi ? 'Khóa bí mật trên server' : 'Server private keys', value: 'HSM handle', detail: isVi ? 'SDK chỉ nhận key handle; vật liệu khóa không xuất hiện trong bộ nhớ ứng dụng.' : 'SDK receives only a key handle; key material never enters application memory.' },
    { name: isVi ? 'Khóa bí mật trên mobile' : 'Mobile private keys', value: 'Non-exportable', detail: isVi ? 'Bọc bởi secure storage và yêu cầu xác thực thiết bị trước thao tác nhạy cảm.' : 'Wrapped by secure storage with device authentication before sensitive operations.' },
    { name: isVi ? 'Mã hóa thực chứng cục bộ' : 'Local credential encryption', value: 'AES-256-GCM', detail: isVi ? 'Mỗi bản ghi có nonce riêng; khóa vault nằm trong secure data storage.' : 'Each record has a unique nonce; the vault key lives in secure data storage.' },
  ];

  const validationPipeline = [
    isVi ? 'Parse JSON và kiểm tra giới hạn kích thước trước khi xử lý mật mã.' : 'Parse JSON and enforce size limits before cryptographic processing.',
    isVi ? 'Kiểm tra context, type, schema và các trường bắt buộc.' : 'Validate context, type, schema, and required fields.',
    isVi ? 'Kiểm tra challenge, domain, thời hạn và chống phát lại.' : 'Validate challenge, domain, expiry, and replay protection.',
    isVi ? 'Resolve Holder DID và Issuer DID trên CertNet.' : 'Resolve Holder and Issuer DIDs on CertNet.',
    isVi ? 'Khớp proof.verificationMethod với khóa công khai đã resolve.' : 'Match proof.verificationMethod to a resolved public key.',
    isVi ? 'Xác minh chữ ký Holder, chữ ký Issuer và trạng thái thực chứng.' : 'Verify Holder proof, Issuer proof, and credential status.',
    isVi ? 'Gửi receipt kết quả qua chính kết nối DIDComm trước nghiệp vụ riêng.' : 'Send a result receipt over the same DIDComm connection before business logic.',
  ];

  const sessionConstraints = [
    ['OOB invitation', isVi ? 'Dùng một lần' : 'Single use', '5 min', isVi ? 'Không chứa VC, VP hoặc dữ liệu cá nhân' : 'Contains no VC, VP, or personal data'],
    ['Presentation request', isVi ? 'Gắn challenge + domain' : 'Challenge + domain bound', '5 min', isVi ? 'Challenge tối thiểu 32 byte từ CSPRNG' : 'Minimum 32-byte CSPRNG challenge'],
    ['DIDComm connection', isVi ? 'Mã hóa đầu cuối' : 'End-to-end encrypted', '15 min idle', isVi ? 'Đóng sau receipt hoặc khi hết idle timeout' : 'Close after receipt or idle timeout'],
    ['DID resolution', isVi ? 'Cache theo document version' : 'Cache by document version', '5 min cache', isVi ? 'Không dùng cache sau sự kiện xoay khóa' : 'Bypass cache after a key rotation event'],
    ['Clock tolerance', isVi ? 'Cho phép lệch đồng hồ' : 'Clock skew allowance', '± 60 sec', isVi ? 'Ngoài biên phải từ chối proof' : 'Reject proofs outside this boundary'],
    ['Retry policy', isVi ? 'Exponential backoff' : 'Exponential backoff', '3 attempts', isVi ? 'Không retry lỗi validation hoặc consent' : 'Do not retry validation or consent errors'],
  ];

  const errors = [
    { code: 'IDN-1001', family: 'DID_RESOLUTION_FAILED', retry: true, description: isVi ? 'Không lấy được DID Document hợp lệ từ CertNet.' : 'A valid DID Document could not be resolved from CertNet.' },
    { code: 'IDN-1102', family: 'KEY_REFERENCE_MISMATCH', retry: false, description: isVi ? 'verificationMethod trong proof không tồn tại trong DID Document.' : 'The proof verificationMethod does not exist in the DID Document.' },
    { code: 'IDN-2101', family: 'INVITATION_EXPIRED', retry: false, description: isVi ? 'OOB invitation đã hết TTL hoặc đã được sử dụng.' : 'The OOB invitation expired or was already consumed.' },
    { code: 'IDN-2203', family: 'CHALLENGE_MISMATCH', retry: false, description: isVi ? 'Challenge trong VP không thuộc verification session hiện tại.' : 'The VP challenge does not belong to the active verification session.' },
    { code: 'IDN-3104', family: 'CREDENTIAL_REVOKED', retry: false, description: isVi ? 'Credential status cho biết thực chứng đã bị thu hồi.' : 'Credential status indicates that the credential was revoked.' },
    { code: 'IDN-4101', family: 'USER_CONSENT_DENIED', retry: false, description: isVi ? 'Holder từ chối yêu cầu chia sẻ; không được tự động hỏi lại.' : 'The Holder denied sharing; do not automatically ask again.' },
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F8FC] pb-24 text-slate-900 dark:bg-[#0B0F1A] dark:text-slate-100">
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
                <Terminal className="size-3.5" />
                {isVi ? 'Identra Reference Profile' : 'Identra Reference Profile'}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {isVi ? 'Quy ước triển khai mà mọi Identra SDK phải tuân thủ' : 'Implementation rules every Identra SDK must follow'}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-[#6B7280] dark:text-gray-400 sm:text-lg">
                  {isVi ? 'Contract dữ liệu, giới hạn truyền tải, profile mật mã, vòng đời phiên, thứ tự xác minh và taxonomy lỗi cho SDK minh họa.' : 'Data contracts, transport limits, cryptographic profiles, session lifecycles, verification order, and error taxonomy for the illustrative SDK.'}
                </p>
              </div>
              <a href="#data-contracts" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#5B6CFF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4A5AF0]">
                {isVi ? 'Đọc contract kỹ thuật' : 'Read technical contracts'}
                <ArrowRight className="size-4" />
              </a>
            </div>

            <SubpageBrowserHeroVisual
              fileName="identra_reference_profile.yml"
              eyebrow="IDENTRA · IMPLEMENTATION CONTRACT"
              meta="PROFILE: ILLUSTRATIVE"
              status="NORMATIVE RULES"
              title={isVi ? 'Contract trước, code sau' : 'Contracts before code'}
              description="DID · VC · VP · DIDComm · CertNet · Secure Vault"
              progressLabel={isVi ? 'QUY TẮC BẮT BUỘC ĐÃ NẠP' : 'REQUIRED RULES LOADED'}
              progressValue="24 / 24"
              logsLabel="conformance_check"
              logs={[
                { label: '✓ challenge_entropy', value: '32_bytes_min', tone: 'success' },
                { label: '✓ holder_key_export', value: 'disabled', tone: 'success' },
                { label: '→ profile_status', value: 'illustrative', tone: 'warning' },
              ]}
              primaryStatus={{ icon: <ShieldCheck className="size-5" />, eyebrow: 'Validation order', title: isVi ? 'Bắt buộc tuần tự' : 'Strictly ordered' }}
              secondaryStatus={{ icon: <FileCode2 className="size-5" />, eyebrow: 'Payload contracts', title: isVi ? 'Có giới hạn rõ ràng' : 'Explicitly bounded' }}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-amber-200 bg-amber-50 px-6 py-4 dark:border-amber-500/20 dark:bg-amber-500/5 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-start gap-3 text-left">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-200">
            <strong>{isVi ? 'Trạng thái profile:' : 'Profile status:'}</strong>{' '}
            {isVi ? 'Các giá trị bên dưới là quy ước đề xuất cho SDK Identra minh họa, chưa phải cam kết production hoặc kết quả benchmark đã kiểm định.' : 'Values below are proposed conventions for the illustrative Identra SDK, not production guarantees or audited benchmark results.'}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-[#0F172A]/35 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {profileSummary.map(({ label, value, note, icon: Icon }) => (
            <article key={label} className="border-l-2 border-[#5B6CFF]/30 pl-4 text-left">
              <div className="flex items-center gap-2 text-[#5B6CFF] dark:text-[#7C8CFF]"><Icon className="size-4" /><span className="text-[10px] font-extrabold uppercase tracking-widest">{label}</span></div>
              <p className="mt-3 font-mono text-xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="data-contracts" className="scroll-mt-24 px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">{isVi ? 'Data envelope contract' : 'Data envelope contract'}</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{isVi ? 'Định dạng, giới hạn và điều kiện từ chối' : 'Formats, limits, and rejection conditions'}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{isVi ? 'SDK phải từ chối payload vượt giới hạn trước khi parse sâu hoặc thực hiện phép toán mật mã.' : 'SDKs must reject oversized payloads before deep parsing or cryptographic work.'}</p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[1060px] border-collapse text-left">
              <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr><th className="px-5 py-4">Artifact</th><th className="px-5 py-4">Media type</th><th className="px-5 py-4">Encoding</th><th className="px-5 py-4">{isVi ? 'Giới hạn đề xuất' : 'Proposed limit'}</th><th className="px-5 py-4">{isVi ? 'Trường bắt buộc' : 'Required fields'}</th><th className="px-5 py-4">{isVi ? 'Từ chối khi' : 'Reject when'}</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-xs dark:divide-slate-800 dark:bg-[#0B0F1A]">
                {artifactContracts.map((item) => (
                  <tr key={item.artifact}>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{item.artifact}</td><td className="px-5 py-4 font-mono text-[#5B6CFF] dark:text-[#7C8CFF]">{item.media}</td><td className="px-5 py-4 text-slate-600 dark:text-slate-400">{item.encoding}</td><td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-white">{item.limit}</td><td className="max-w-xs px-5 py-4 font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-400">{item.required}</td><td className="max-w-xs px-5 py-4 leading-relaxed text-slate-600 dark:text-slate-400">{item.rejection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-[#0F172A]/35 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="text-left lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">{isVi ? 'Security profile' : 'Security profile'}</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{isVi ? 'Mỗi khóa chỉ có một trách nhiệm' : 'One responsibility per key'}</h2>
            <div className="mt-8 space-y-5">
              {securityRules.map((rule) => (
                <article key={rule.name} className="border-l-2 border-slate-200 pl-4 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{rule.name}</h3><span className="rounded-lg bg-[#5B6CFF]/8 px-2 py-1 font-mono text-[10px] font-bold text-[#5B6CFF] dark:text-[#7C8CFF]">{rule.value}</span></div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{rule.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-[#0B0F1A] p-6 text-left sm:p-8 lg:col-span-7">
            <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-[#5B6CFF]/15 text-[#7C8CFF]"><ShieldCheck className="size-5" /></div><div><p className="text-xs font-extrabold uppercase tracking-widest text-[#7C8CFF]">{isVi ? 'Thứ tự xác minh bắt buộc' : 'Required validation order'}</p><p className="mt-1 text-xs text-slate-500">{isVi ? 'Dừng ngay tại bước lỗi đầu tiên' : 'Stop at the first failing step'}</p></div></div>
            <div className="mt-8 space-y-3">
              {validationPipeline.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#5B6CFF]/15 font-mono text-[10px] font-black text-[#7C8CFF]">{String(index + 1).padStart(2, '0')}</span>
                  <p className="pt-1 text-xs leading-relaxed text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-left"><span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">{isVi ? 'Session & transport' : 'Session & transport'}</span><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{isVi ? 'Vòng đời phiên và chính sách retry' : 'Session lifecycle and retry policy'}</h2></div>
          <div className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0F172A] md:grid-cols-2 xl:grid-cols-3">
            {sessionConstraints.map(([name, mode, lifetime, rule]) => (
              <article key={name} className="border-b border-slate-200 p-5 text-left dark:border-slate-800 md:border-r xl:[&:nth-child(3n)]:border-r-0">
                <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{name}</h3><span className="font-mono text-[10px] font-bold text-[#5B6CFF] dark:text-[#7C8CFF]">{lifetime}</span></div>
                <p className="mt-3 text-xs font-semibold text-slate-600 dark:text-slate-300">{mode}</p><p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-[#0F172A]/35 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl text-left"><span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">{isVi ? 'Error taxonomy' : 'Error taxonomy'}</span><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{isVi ? 'Lỗi phải có mã ổn định và hành vi retry rõ ràng' : 'Errors require stable codes and explicit retry behavior'}</h2></div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead className="bg-slate-50 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:bg-slate-950 dark:text-slate-400"><tr><th className="px-5 py-4">Code</th><th className="px-5 py-4">Family</th><th className="px-5 py-4">{isVi ? 'Mô tả' : 'Description'}</th><th className="px-5 py-4">Retry</th></tr></thead>
              <tbody className="divide-y divide-slate-200 bg-white text-xs dark:divide-slate-800 dark:bg-[#0B0F1A]">
                {errors.map((error) => <tr key={error.code}><td className="px-5 py-4 font-mono font-black text-[#5B6CFF] dark:text-[#7C8CFF]">{error.code}</td><td className="px-5 py-4 font-mono text-slate-700 dark:text-slate-300">{error.family}</td><td className="px-5 py-4 leading-relaxed text-slate-600 dark:text-slate-400">{error.description}</td><td className="px-5 py-4">{error.retry ? <span className="inline-flex items-center gap-1 font-bold text-blue-500"><RotateCcw className="size-3.5" />Yes</span> : <span className="inline-flex items-center gap-1 font-bold text-slate-500"><CheckCircle2 className="size-3.5" />No</span>}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-6 pt-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0B0F1A] lg:grid-cols-12">
          <div className="p-6 text-left sm:p-8 lg:col-span-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#5B6CFF]/15 text-[#7C8CFF]"><Braces className="size-5" /></div>
            <h2 className="mt-6 text-2xl font-extrabold text-white">{isVi ? 'Cấu hình verifier tham chiếu' : 'Reference verifier configuration'}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{isVi ? 'Một triển khai conformant phải cho phép cấu hình timeout, giới hạn payload và toàn bộ bước validation thay vì giấu chúng trong SDK.' : 'A conformant implementation exposes timeouts, payload limits, and validation steps instead of hiding them inside the SDK.'}</p>
            <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" /><p className="text-xs leading-relaxed text-amber-200">{isVi ? 'Không tắt kiểm tra challenge, domain hoặc credential status trong production.' : 'Never disable challenge, domain, or credential status checks in production.'}</p></div>
          </div>
          <div className="border-t border-slate-800 bg-slate-950 p-6 font-mono text-[11px] leading-relaxed text-slate-400 sm:p-8 lg:col-span-7 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-800 pb-4 text-[#7C8CFF]"><Terminal className="size-4" /><span className="font-bold">verifier.reference.yml</span></div>
            <p><span className="text-blue-400">profile:</span> identra-reference-illustrative</p><p><span className="text-blue-400">limits:</span></p><p className="pl-4">vp_bytes: 131072</p><p className="pl-4">request_ttl_seconds: 300</p><p className="pl-4">clock_skew_seconds: 60</p><p><span className="text-blue-400">validation:</span></p><p className="pl-4">challenge: <span className="text-emerald-400">required</span></p><p className="pl-4">domain: <span className="text-emerald-400">required</span></p><p className="pl-4">credential_status: <span className="text-emerald-400">required</span></p><p className="pl-4">send_result_receipt: <span className="text-emerald-400">true</span></p>
          </div>
        </div>
      </section>
    </div>
  );
}
