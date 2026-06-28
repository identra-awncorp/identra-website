import { educationSsiArticle } from './blogEducationArticle';

export type AcademicLocalizedText = {
  vi: string;
  en: string;
};

export interface AcademicReference {
  id: string;
  title: AcademicLocalizedText;
  publisher: string;
  url: string;
  year: string;
}

export interface AcademicSection {
  id: string;
  title: AcademicLocalizedText;
  thesis?: AcademicLocalizedText;
  paragraphs: AcademicLocalizedText[];
  subsections?: Array<{
    title: AcademicLocalizedText;
    paragraphs: AcademicLocalizedText[];
  }>;
  bullets?: AcademicLocalizedText[];
  table?: {
    headers: AcademicLocalizedText[];
    rows: AcademicLocalizedText[][];
  };
  code?: {
    language: 'json' | 'typescript';
    source: string | AcademicLocalizedText;
    caption: AcademicLocalizedText;
  };
  codeBlocks?: Array<{
    title: AcademicLocalizedText;
    language: 'json' | 'typescript';
    source: string | AcademicLocalizedText;
    caption: AcademicLocalizedText;
  }>;
  diagram?: {
    type: 'education-ssi-lifecycle';
    caption: AcademicLocalizedText;
  };
  sources?: string[];
}

export interface AcademicArticle {
  format: 'conceptual-paper' | 'engineering-guide' | 'security-analysis' | 'case-study' | 'technical-reference';
  readingTimeMinutes: number;
  title: AcademicLocalizedText;
  deck: AcademicLocalizedText;
  abstract: AcademicLocalizedText;
  keywords: AcademicLocalizedText[];
  sections: AcademicSection[];
  references: AcademicReference[];
}

const refs = {
  did: {
    id: 'did-core',
    title: {
      vi: 'Decentralized Identifiers (DIDs) v1.0',
      en: 'Decentralized Identifiers (DIDs) v1.0',
    },
    publisher: 'W3C',
    url: 'https://www.w3.org/TR/did-core/',
    year: '2022',
  },
  vc: {
    id: 'vc-data-model',
    title: {
      vi: 'Verifiable Credentials Data Model v2.0',
      en: 'Verifiable Credentials Data Model v2.0',
    },
    publisher: 'W3C',
    url: 'https://www.w3.org/TR/vc-data-model-2.0/',
    year: '2025',
  },
  integrity: {
    id: 'vc-data-integrity',
    title: {
      vi: 'Verifiable Credential Data Integrity 1.0',
      en: 'Verifiable Credential Data Integrity 1.0',
    },
    publisher: 'W3C',
    url: 'https://www.w3.org/TR/vc-data-integrity/',
    year: '2025',
  },
  status: {
    id: 'bitstring-status-list',
    title: {
      vi: 'Bitstring Status List v1.0',
      en: 'Bitstring Status List v1.0',
    },
    publisher: 'W3C',
    url: 'https://www.w3.org/TR/vc-bitstring-status-list/',
    year: '2025',
  },
  didcomm: {
    id: 'didcomm-v2',
    title: {
      vi: 'DIDComm Messaging Specification v2',
      en: 'DIDComm Messaging Specification v2',
    },
    publisher: 'Decentralized Identity Foundation',
    url: 'https://identity.foundation/didcomm-messaging/spec/',
    year: 'Editor draft',
  },
  bbs: {
    id: 'vc-di-bbs',
    title: {
      vi: 'Data Integrity BBS Cryptosuites v1.0',
      en: 'Data Integrity BBS Cryptosuites v1.0',
    },
    publisher: 'W3C',
    url: 'https://www.w3.org/TR/vc-di-bbs/',
    year: '2025',
  },
  openBadges: {
    id: 'open-badges-3',
    title: {
      vi: 'Open Badges Specification v3.0',
      en: 'Open Badges Specification v3.0',
    },
    publisher: '1EdTech Consortium',
    url: 'https://www.imsglobal.org/spec/ob/v3p0/',
    year: '2024',
  },
  nistAuth: {
    id: 'nist-800-63b',
    title: {
      vi: 'NIST SP 800-63B: Authentication and Authenticator Management',
      en: 'NIST SP 800-63B: Authentication and Authenticator Management',
    },
    publisher: 'NIST',
    url: 'https://pages.nist.gov/800-63-4/sp800-63b.html',
    year: '2025',
  },
  nistProofing: {
    id: 'nist-800-63a',
    title: {
      vi: 'NIST SP 800-63A: Identity Proofing and Enrollment',
      en: 'NIST SP 800-63A: Identity Proofing and Enrollment',
    },
    publisher: 'NIST',
    url: 'https://pages.nist.gov/800-63-4/sp800-63a.html',
    year: '2025',
  },
} satisfies Record<string, AcademicReference>;

export const academicBlogContentDb: Record<string, AcademicArticle> = {
  'f-1': {
    format: 'conceptual-paper',
    readingTimeMinutes: 18,
    title: {
      vi: 'Self-Sovereign Identity: kiến trúc, mô hình tin cậy và những giới hạn thường bị bỏ qua',
      en: 'Self-Sovereign Identity: architecture, trust model, and frequently overlooked limits',
    },
    deck: {
      vi: 'Một phân tích từ định danh, DID Document và Verifiable Credential đến quá trình phát hành, trình bày, xác minh và quản trị niềm tin.',
      en: 'An analysis spanning identifiers, DID Documents, Verifiable Credentials, issuance, presentation, verification, and trust governance.',
    },
    abstract: {
      vi: 'Bài viết phân tích SSI như một kiến trúc phối hợp nhiều chuẩn, không phải một sản phẩm hoặc một blockchain cụ thể. Trọng tâm là sự phân tách giữa quyền kiểm soát định danh, quyền phát hành tuyên bố và quyền quyết định chấp nhận của verifier. Bài viết mô tả vòng đời thực chứng, giải thích vai trò của DID, DID Document, Verifiable Credential, Verifiable Presentation và registry, sau đó đánh giá các giới hạn về assurance, quyền riêng tư, thu hồi, khả năng liên kết và quản trị hệ sinh thái.',
      en: 'This paper analyzes SSI as an architecture composed of multiple standards rather than a single product or blockchain. It focuses on the separation between identifier control, authority to issue claims, and a verifier’s decision to accept them. It describes the credential lifecycle, explains the roles of DIDs, DID Documents, Verifiable Credentials, Verifiable Presentations, and registries, then evaluates limits involving assurance, privacy, revocation, linkability, and ecosystem governance.',
    },
    keywords: [
      { vi: 'Self-Sovereign Identity', en: 'Self-Sovereign Identity' },
      { vi: 'DID', en: 'DID' },
      { vi: 'Verifiable Credential', en: 'Verifiable Credential' },
      { vi: 'mô hình tin cậy', en: 'trust model' },
      { vi: 'quyền riêng tư', en: 'privacy' },
    ],
    sections: [
      {
        id: 'ssi-definition-and-scope',
        title: { vi: '1. Định nghĩa SSI qua các thuộc tính kiến trúc', en: '1. Defining SSI through architectural properties' },
        thesis: {
          vi: 'SSI không đồng nghĩa với DID, VC, ví điện tử hoặc blockchain; nó là cách tổ chức quyền kiểm soát và trao đổi bằng chứng giữa nhiều chủ thể độc lập.',
          en: 'SSI is not synonymous with DIDs, VCs, wallets, or blockchains; it is a way to organize control and evidence exchange among independent actors.',
        },
        paragraphs: [
          {
            vi: 'Thuật ngữ Self-Sovereign Identity thường bị diễn giải thành khẩu hiệu “người dùng sở hữu dữ liệu”. Cách diễn giải này chưa đủ chính xác. Người dùng không tự tạo ra giá trị pháp lý cho bằng tốt nghiệp, giấy phép hành nghề hoặc chứng nhận nhân sự. Thẩm quyền xác nhận vẫn thuộc về issuer. Điều thay đổi là sau khi issuer cấp một bằng chứng có thể kiểm tra bằng mật mã, holder có thể giữ và trình bày bằng chứng đó mà không yêu cầu issuer trực tiếp tham gia vào mọi lần xác minh.',
            en: 'Self-Sovereign Identity is often summarized as “users own their data.” That description is incomplete. A person cannot independently create legal authority for a degree, professional license, or employment certificate. The authority to attest remains with the issuer. What changes is that after the issuer creates cryptographically verifiable evidence, the holder can retain and present it without requiring the issuer to participate directly in every verification.',
          },
          {
            vi: 'W3C DID Core định nghĩa DID là một URI có thể resolve tới DID Document. DID Document thường biểu đạt verification methods, quan hệ giữa các khóa với mục đích sử dụng và service endpoints. Chuẩn không bắt buộc DID phải dùng blockchain; verifiable data registry có thể là sổ cái phân tán, cơ sở dữ liệu, mạng ngang hàng hoặc một cơ chế lưu trữ đáng tin khác. Vì vậy, tính “tự chủ” cần được đánh giá từ quyền kiểm soát, khả năng chuyển đổi nhà cung cấp, quản trị khóa và mức phụ thuộc vào hạ tầng, không thể suy ra chỉ từ việc hệ thống dùng DLT.',
            en: 'W3C DID Core defines a DID as a URI that resolves to a DID Document. A DID Document typically expresses verification methods, relationships between keys and intended purposes, and service endpoints. The standard does not require blockchain; a verifiable data registry can be a distributed ledger, database, peer-to-peer network, or another trusted storage mechanism. Sovereignty must therefore be evaluated through control, provider portability, key governance, and infrastructure dependencies, not inferred merely from the use of DLT.',
          },
          {
            vi: 'Verifiable Credentials Data Model phân biệt issuer, holder, subject và verifier. Các vai trò có thể trùng nhau trong một số giao dịch nhưng không nên bị gộp trong thiết kế. Issuer chịu trách nhiệm cho tuyên bố đã ký; holder quyết định khi nào trình bày; verifier áp dụng chính sách riêng để quyết định có chấp nhận bằng chứng hay không. Chữ ký hợp lệ chỉ trả lời câu hỏi bằng chứng có bị sửa và khóa nào đã ký, không tự trả lời issuer có đáng tin cho nghiệp vụ hiện tại hay dữ liệu có còn đúng ngoài đời thực.',
            en: 'The Verifiable Credentials Data Model distinguishes issuer, holder, subject, and verifier. Roles may overlap in some transactions but should not be conflated in system design. The issuer is accountable for the signed claims; the holder decides when to present; the verifier applies its own policy to determine acceptance. A valid signature answers whether evidence changed and which key signed it; it does not automatically establish that the issuer is trusted for the current use case or that the real-world facts remain true.',
          },
        ],
        sources: ['did-core', 'vc-data-model'],
      },
      {
        id: 'ssi-component-boundaries',
        title: { vi: '2. Ranh giới giữa các thành phần cốt lõi', en: '2. Boundaries among core components' },
        thesis: {
          vi: 'Thiết kế SSI dễ sai khi một thành phần bị giao nhiều trách nhiệm hơn phạm vi của chuẩn.',
          en: 'SSI designs fail when a component is assigned responsibilities beyond the scope of its standard.',
        },
        paragraphs: [
          {
            vi: 'DID xác định một chủ thể hoặc controller trong một ngữ cảnh định danh. DID Document công bố vật liệu cần để chứng minh quyền kiểm soát hoặc hỗ trợ tương tác. VC là tập hợp tuyên bố có nguồn gốc và cơ chế bảo vệ tính toàn vẹn. VP là cách holder tổ chức một hoặc nhiều credential, hoặc các bằng chứng dẫn xuất từ chúng, để phản hồi một yêu cầu cụ thể. Wallet quản lý khóa, credential, consent và kết nối. Registry hỗ trợ resolve và trạng thái. Mỗi khái niệm giải quyết một lớp khác nhau.',
            en: 'A DID identifies a subject or controller within an identifier context. A DID Document publishes material needed to prove control or support interactions. A VC is a set of claims with provenance and integrity protection. A VP is how a holder organizes credentials, or derived proofs from them, to answer a specific request. A wallet manages keys, credentials, consent, and connections. A registry supports resolution and status. Each concept addresses a different layer.',
          },
          {
            vi: 'Một lỗi phổ biến là đưa dữ liệu cá nhân vào DID Document vì document có thể được resolve công khai. DID Core cảnh báo về rủi ro tương quan và khuyến nghị giữ dữ liệu cá nhân riêng tư. DID Document nên tối thiểu hóa nội dung, tập trung vào verification methods và service endpoints thực sự cần thiết. Một lỗi khác là xem registry như kho lưu thực chứng. Cách làm này phá vỡ mô hình holder-controlled, làm tăng khả năng tương quan và tạo xung đột với nghĩa vụ xóa hoặc sửa dữ liệu.',
            en: 'A common error is placing personal data in a publicly resolvable DID Document. DID Core warns about correlation risks and recommends keeping personal data private. DID Documents should minimize content and focus on verification methods and genuinely necessary service endpoints. Another error is treating the registry as a credential repository. That breaks the holder-controlled model, increases linkability, and conflicts with obligations to delete or correct data.',
          },
        ],
        table: {
          headers: [
            { vi: 'Thành phần', en: 'Component' },
            { vi: 'Trách nhiệm chính', en: 'Primary responsibility' },
            { vi: 'Không nên được dùng để', en: 'Should not be used to' },
          ],
          rows: [
            [
              { vi: 'DID / DID Document', en: 'DID / DID Document' },
              { vi: 'Định danh, công bố verification methods và services', en: 'Identification, verification methods, and services' },
              { vi: 'Lưu hồ sơ cá nhân hoặc toàn bộ credential', en: 'Store personal records or complete credentials' },
            ],
            [
              { vi: 'Verifiable Credential', en: 'Verifiable Credential' },
              { vi: 'Biểu đạt tuyên bố có nguồn gốc và tính toàn vẹn', en: 'Express claims with provenance and integrity' },
              { vi: 'Thay thế chính sách chấp nhận của verifier', en: 'Replace verifier acceptance policy' },
            ],
            [
              { vi: 'Wallet', en: 'Wallet' },
              { vi: 'Bảo vệ khóa, lưu credential, hiển thị consent', en: 'Protect keys, store credentials, present consent' },
              { vi: 'Tự tuyên bố issuer nào đáng tin cho mọi nghiệp vụ', en: 'Declare universal issuer trust' },
            ],
            [
              { vi: 'Registry / CertNet', en: 'Registry / CertNet' },
              { vi: 'Resolve DID, công bố khóa và trạng thái cần thiết', en: 'Resolve DIDs and publish necessary keys and status' },
              { vi: 'Theo dõi lịch sử giao dịch riêng tư của holder', en: 'Track a holder’s private interaction history' },
            ],
          ],
        },
        sources: ['did-core', 'vc-data-model'],
      },
      {
        id: 'ssi-lifecycle',
        title: { vi: '3. Vòng đời thực chứng và các điểm kiểm soát', en: '3. Credential lifecycle and control points' },
        thesis: {
          vi: 'Vòng đời không kết thúc khi issuer ký credential; trạng thái, khóa, consent và thông báo kết quả đều ảnh hưởng tới tính đúng đắn của hệ thống.',
          en: 'The lifecycle does not end when an issuer signs a credential; status, keys, consent, and result notification all affect correctness.',
        },
        paragraphs: [
          {
            vi: 'Trong giai đoạn phát hành, issuer trước hết phải hoàn thành identity proofing hoặc một quy trình xác nhận nghiệp vụ tương đương. Sau đó hệ thống ánh xạ dữ liệu sang schema, gắn issuer, thời hạn và thông tin trạng thái, rồi tạo proof bằng khóa được ủy quyền cho assertion. Credential được truyền tới holder qua một kênh được xác thực và bảo mật. Nếu holder chỉ nhận một JSON qua email mà không xác minh nguồn kết nối, hệ thống đã bỏ qua một phần quan trọng của assurance.',
            en: 'During issuance, the issuer must first complete identity proofing or an equivalent business validation process. The system maps data to a schema, attaches issuer, validity, and status information, then creates a proof using a key authorized for assertions. The credential is delivered to the holder through an authenticated, protected channel. If a holder merely receives JSON by email without authenticating the connection, an important part of assurance is missing.',
          },
          {
            vi: 'Trong giai đoạn trình bày, verifier cần mô tả yêu cầu đủ cụ thể: loại bằng chứng, thuộc tính, mục đích, nonce, audience và thời hạn. Wallet phải hiển thị các thông tin này trước khi holder đồng ý. Holder có thể gửi credential đầy đủ, selective disclosure hoặc một derived proof tùy cryptosuite. VP cần được ràng buộc với challenge của phiên để chống phát lại. Chỉ kiểm tra chữ ký credential mà không kiểm tra holder binding hoặc challenge sẽ cho phép kẻ tấn công tái sử dụng bằng chứng đã thu thập.',
            en: 'During presentation, the verifier should describe the request precisely: evidence type, attributes, purpose, nonce, audience, and expiry. The wallet must display this information before holder consent. The holder may send a complete credential, selective disclosure, or a derived proof depending on the cryptosuite. The VP must be bound to the session challenge to prevent replay. Checking only the credential signature without holder binding or challenge validation allows attackers to reuse captured evidence.',
          },
          {
            vi: 'Trong giai đoạn xác minh, verifier resolve DID, chọn đúng verification method được proof tham chiếu, kiểm tra quan hệ ủy quyền của khóa, xác minh proof, kiểm tra schema, thời hạn và status, rồi áp dụng trust policy. Bitstring Status List được thiết kế để công bố trạng thái theo nhóm, giảm nguy cơ issuer theo dõi từng lần verifier kiểm tra. Tuy vậy, verifier vẫn phải quyết định độ mới chấp nhận được của status list và cách xử lý khi registry hoặc endpoint tạm thời không khả dụng.',
            en: 'During verification, the verifier resolves the DID, selects the exact verification method referenced by the proof, checks key authorization, verifies the proof, evaluates schema, validity, and status, then applies trust policy. Bitstring Status List publishes status in groups to reduce the risk that an issuer observes each verifier check. The verifier must still decide how fresh status information must be and how to behave when a registry or endpoint is temporarily unavailable.',
          },
        ],
        bullets: [
          { vi: 'Identity proofing xác định chất lượng dữ liệu trước khi phát hành; chữ ký không thể sửa một quy trình proofing yếu.', en: 'Identity proofing determines data quality before issuance; signatures cannot repair weak proofing.' },
          { vi: 'Holder consent phải gắn với mục đích và audience cụ thể, không chỉ là một nút “chia sẻ”.', en: 'Holder consent must be tied to a specific purpose and audience, not merely a “share” button.' },
          { vi: 'Verification là một pipeline chính sách, không phải một hàm boolean chỉ kiểm tra chữ ký.', en: 'Verification is a policy pipeline, not a boolean signature-check function.' },
          { vi: 'Issuer nên nhận được thông báo nghiệp vụ sau xác minh chỉ khi holder và chính sách cho phép; không nên suy ra mặc định rằng issuer phải biết mọi lần sử dụng.', en: 'Issuer notification after verification should occur only when holder consent and policy allow it; issuer awareness of every use should not be assumed.' },
        ],
        sources: ['vc-data-model', 'vc-data-integrity', 'bitstring-status-list', 'didcomm-v2'],
      },
      {
        id: 'ssi-trust-and-assurance',
        title: { vi: '4. Tính xác thực, assurance và niềm tin không phải một khái niệm', en: '4. Authenticity, assurance, and trust are different concepts' },
        thesis: {
          vi: 'Mật mã chứng minh tính toàn vẹn và quyền kiểm soát khóa; giá trị nghiệp vụ còn phụ thuộc vào governance và chất lượng quy trình ngoài chuỗi.',
          en: 'Cryptography proves integrity and key control; business value also depends on governance and off-chain process quality.',
        },
        paragraphs: [
          {
            vi: 'Một credential có proof hợp lệ có thể chứa tuyên bố sai nếu issuer bị lừa, quy trình nhập liệu lỗi hoặc nhân viên lạm quyền. Ngược lại, một credential bị thu hồi có thể đại diện cho bằng cấp ngoài đời vẫn hợp lệ nếu khóa ký bị lộ và issuer phải phát hành lại. W3C Bitstring Status List nêu rõ trạng thái của VC là trạng thái của credential số, không nhất thiết là trạng thái của bằng chứng nền ngoài đời thực.',
            en: 'A credential with a valid proof can contain false claims if the issuer was deceived, data entry failed, or an employee abused authority. Conversely, a revoked credential may represent a real-world qualification that remains valid if the signing key was compromised and the issuer must reissue. W3C Bitstring Status List explicitly notes that VC status concerns the digital credential and does not necessarily determine the status of the underlying real-world record.',
          },
          {
            vi: 'Do đó verifier cần một trust framework trả lời ít nhất bốn câu hỏi: issuer nào được phép cấp loại credential này; issuer được nhận diện pháp lý ra sao; tiêu chuẩn proofing và audit là gì; và khi có tranh chấp hoặc sự cố thì bên nào chịu trách nhiệm. Một danh sách issuer đáng tin không nên được hard-code rải rác trong ứng dụng; nó cần governance, versioning, quy trình thêm hoặc loại bỏ và bằng chứng kiểm toán.',
            en: 'A verifier therefore needs a trust framework that answers at least four questions: which issuers may issue this credential type; how the issuer is legally identified; what proofing and audit standards apply; and who is accountable during disputes or incidents. Trusted-issuer lists should not be scattered as hard-coded application values; they require governance, versioning, admission and removal procedures, and audit evidence.',
          },
        ],
        sources: ['vc-data-model', 'bitstring-status-list', 'nist-800-63a'],
      },
      {
        id: 'ssi-privacy-and-limits',
        title: { vi: '5. Quyền riêng tư và những giới hạn của SSI', en: '5. Privacy and the limits of SSI' },
        thesis: {
          vi: 'Giữ credential trong ví không tự động tạo ra quyền riêng tư; thiết kế identifier, status, telemetry và consent quyết định khả năng theo dõi.',
          en: 'Keeping credentials in a wallet does not automatically create privacy; identifier, status, telemetry, and consent design determine trackability.',
        },
        paragraphs: [
          {
            vi: 'Nếu holder dùng cùng một DID ổn định với mọi verifier, các bên có thể liên kết hoạt động. Nếu mỗi credential có một URL status duy nhất và verifier truy vấn trực tiếp issuer, issuer có thể quan sát thời điểm và bối cảnh credential được dùng. Nếu wallet gửi telemetry chứa DID hoặc loại credential, nhà vận hành wallet có thể trở thành điểm theo dõi mới. SSI chỉ giảm tập trung dữ liệu khi các kênh phụ này cũng được tối thiểu hóa.',
            en: 'If a holder uses the same stable DID with every verifier, parties may correlate activity. If each credential has a unique status URL and verifiers query the issuer directly, the issuer may observe when and where the credential is used. If wallet telemetry contains DIDs or credential types, the wallet operator can become a new tracking point. SSI reduces data centralization only when these side channels are minimized as well.',
          },
          {
            vi: 'Selective disclosure và zero-knowledge proofs có thể giảm dữ liệu được tiết lộ, nhưng không che giấu IP, fingerprint thiết bị, tài khoản ứng dụng hoặc mục đích nghiệp vụ. Quyền riêng tư cần được phân tích theo toàn bộ hệ thống. Một verifier yêu cầu “chứng minh trên 18 tuổi” bằng ZKP nhưng bắt đăng nhập bằng tài khoản định danh cố định vẫn có thể biết chính xác người dùng là ai.',
            en: 'Selective disclosure and zero-knowledge proofs can reduce disclosed data, but they do not hide IP addresses, device fingerprints, application accounts, or business context. Privacy must be analyzed across the complete system. A verifier may request a ZKP proving age over 18 yet still identify the user precisely through a stable login account.',
          },
          {
            vi: 'Cuối cùng, “sovereign” không có nghĩa holder có thể từ chối mọi quy định hoặc tự quyết giá trị của bằng chứng. Các hệ sinh thái có yêu cầu pháp lý, chính sách lưu trữ, nghĩa vụ chống gian lận và quy tắc chấp nhận. Thiết kế tốt làm các ràng buộc đó minh bạch, giảm dữ liệu dư thừa và giữ holder trong vòng quyết định, thay vì tuyên bố loại bỏ hoàn toàn tổ chức trung gian.',
            en: 'Finally, “sovereign” does not mean a holder can ignore regulation or determine the value of evidence unilaterally. Ecosystems have legal requirements, retention policies, anti-fraud duties, and acceptance rules. Good design makes these constraints transparent, minimizes unnecessary data, and keeps the holder involved in decisions rather than claiming to eliminate institutions entirely.',
          },
        ],
        sources: ['did-core', 'vc-data-model', 'bitstring-status-list', 'vc-di-bbs'],
      },
      {
        id: 'ssi-conclusion',
        title: { vi: '6. Kết luận: đánh giá SSI bằng quyền kiểm soát có thể kiểm chứng', en: '6. Conclusion: evaluate SSI through verifiable control' },
        paragraphs: [
          {
            vi: 'Một hệ thống SSI trưởng thành không được đánh giá bằng số lượng từ khóa “phi tập trung” xuất hiện trong tài liệu. Cần kiểm tra holder có thực sự kiểm soát khóa và consent hay không; issuer có governance và quy trình proofing rõ hay không; verifier có pipeline xác minh đầy đủ hay chỉ kiểm tra chữ ký; registry có tối thiểu hóa dữ liệu và hỗ trợ luân chuyển khóa hay không; và toàn bộ hệ thống có giảm khả năng tương quan hay chỉ di chuyển điểm tập trung từ cơ sở dữ liệu sang wallet provider.',
            en: 'A mature SSI system should not be judged by how often “decentralized” appears in its documentation. Evaluation should ask whether holders genuinely control keys and consent; whether issuers have clear governance and proofing; whether verifiers run a complete verification pipeline rather than only checking signatures; whether registries minimize data and support key rotation; and whether the system reduces correlation rather than merely moving centralization from a database to a wallet provider.',
          },
        ],
        sources: ['did-core', 'vc-data-model', 'vc-data-integrity'],
      },
    ],
    references: [refs.did, refs.vc, refs.integrity, refs.status, refs.didcomm, refs.bbs, refs.nistProofing],
  },
  'f-2': {
    format: 'engineering-guide',
    readingTimeMinutes: 16,
    title: {
      vi: 'Thiết kế SSI Wallet an toàn: mô hình đe dọa, kiến trúc khóa và vòng đời thiết bị',
      en: 'Designing a secure SSI Wallet: threat model, key architecture, and device lifecycle',
    },
    deck: {
      vi: 'Một hướng dẫn kỹ thuật về cách ví tạo DID, bảo vệ khóa bí mật, lưu thực chứng, xử lý consent và duy trì nguyên tắc một kho dữ liệu duy nhất.',
      en: 'A technical guide to DID creation, private-key protection, credential storage, consent handling, and a single-active-vault policy.',
    },
    abstract: {
      vi: 'SSI Wallet là ranh giới bảo mật giữ khóa bí mật, thực chứng và quyền quyết định chia sẻ của holder. Bài viết xây dựng mô hình đe dọa cho ví di động, phân tích sự khác nhau giữa khóa ký, khóa mã hóa dữ liệu và khóa do secure storage bảo vệ, sau đó mô tả quá trình khởi tạo DID, nhận credential, tạo presentation và đổi thiết bị theo nguyên tắc không export thực chứng. Phần cuối đánh giá các đánh đổi giữa khả năng phục hồi, tính tiện dụng và nguy cơ nhân bản kho dữ liệu.',
      en: 'An SSI Wallet is the security boundary holding private keys, credentials, and the holder’s disclosure authority. This paper develops a mobile-wallet threat model, distinguishes signing keys, data-encryption keys, and keys protected by secure storage, then describes DID provisioning, credential receipt, presentation creation, and device replacement under a no-export policy. It concludes by evaluating trade-offs among recoverability, usability, and vault-cloning risk.',
    },
    keywords: [
      { vi: 'mobile wallet', en: 'mobile wallet' },
      { vi: 'secure storage', en: 'secure storage' },
      { vi: 'quản trị khóa', en: 'key management' },
      { vi: 'DIDComm', en: 'DIDComm' },
      { vi: 'mô hình đe dọa', en: 'threat model' },
    ],
    sections: [
      {
        id: 'wallet-security-boundary',
        title: { vi: '1. Ví là một security boundary, không phải thư mục tài liệu', en: '1. A wallet is a security boundary, not a document folder' },
        thesis: {
          vi: 'Ví phải bảo vệ cả bí mật mật mã lẫn ý định của người dùng; mất một trong hai đều có thể dẫn tới chia sẻ trái phép.',
          en: 'A wallet must protect both cryptographic secrets and user intent; losing either can enable unauthorized disclosure.',
        },
        paragraphs: [
          {
            vi: 'Một ví SSI tối thiểu thực hiện bốn chức năng nhạy cảm: tạo và sử dụng khóa bí mật; lưu credential; thiết lập kênh với issuer hoặc verifier; và xin consent trước khi ký hoặc chia sẻ. Vì vậy, đánh giá an toàn không thể dừng ở câu hỏi “dữ liệu có được mã hóa hay không”. Cần xem ai có thể gọi hàm ký, ai có thể giải mã kho, giao diện có hiển thị đúng nội dung cần phê duyệt và nhật ký có làm lộ metadata hay không.',
            en: 'An SSI wallet performs at least four sensitive functions: generating and using private keys, storing credentials, establishing channels with issuers or verifiers, and obtaining consent before signing or sharing. Security evaluation cannot stop at “is the data encrypted?” It must ask who can invoke signing, who can decrypt the vault, whether the interface accurately displays what is being approved, and whether logs expose metadata.',
          },
          {
            vi: 'Mô hình đe dọa nên bao gồm mất thiết bị, malware trong cùng hệ điều hành, thiết bị bị root hoặc jailbreak, ứng dụng giả mạo, tấn công social engineering, sao lưu cloud ngoài ý muốn, lỗi backend, verifier độc hại và nhân viên hỗ trợ lạm quyền. Không phải rủi ro nào cũng được xử lý bằng secure enclave. Secure enclave có thể hạn chế trích xuất khóa nhưng không ngăn người dùng bị lừa ký một yêu cầu xấu trên thiết bị đã mở khóa.',
            en: 'The threat model should include device loss, malware within the operating system, rooted or jailbroken devices, counterfeit apps, social engineering, unintended cloud backups, backend failures, malicious verifiers, and abusive support staff. Secure enclaves do not address every risk. They may restrict key extraction but cannot stop a user from being deceived into signing a malicious request on an unlocked device.',
          },
        ],
        table: {
          headers: [
            { vi: 'Tài sản', en: 'Asset' },
            { vi: 'Rủi ro chính', en: 'Primary risk' },
            { vi: 'Kiểm soát cần thiết', en: 'Required control' },
          ],
          rows: [
            [
              { vi: 'Khóa bí mật DID', en: 'DID private key' },
              { vi: 'Trích xuất hoặc sử dụng trái phép', en: 'Extraction or unauthorized use' },
              { vi: 'Non-exportable key, user presence, rotation', en: 'Non-exportable key, user presence, rotation' },
            ],
            [
              { vi: 'Kho credential', en: 'Credential vault' },
              { vi: 'Sao chép, giải mã hoặc backup ngoài ý muốn', en: 'Cloning, decryption, or unintended backup' },
              { vi: 'Envelope encryption, OS backup exclusion, single-vault policy', en: 'Envelope encryption, OS backup exclusion, single-vault policy' },
            ],
            [
              { vi: 'Consent', en: 'Consent' },
              { vi: 'Người dùng phê duyệt nhầm audience hoặc thuộc tính', en: 'Approval of the wrong audience or attributes' },
              { vi: 'Verified requester identity, plain-language purpose, review screen', en: 'Verified requester identity, plain-language purpose, review screen' },
            ],
          ],
        },
        sources: ['nist-800-63b', 'didcomm-v2'],
      },
      {
        id: 'wallet-key-hierarchy',
        title: { vi: '2. Kiến trúc khóa: tách mục đích và giới hạn tác động sự cố', en: '2. Key architecture: separate purposes and limit incident impact' },
        thesis: {
          vi: 'Dùng một khóa duy nhất cho DID, mã hóa kho và mọi chữ ký làm tăng blast radius và khiến luân chuyển khóa gần như không thể.',
          en: 'Using one key for DIDs, vault encryption, and every signature expands blast radius and makes rotation nearly impossible.',
        },
        paragraphs: [
          {
            vi: 'Khóa kiểm soát DID hoặc authentication chứng minh ví đang hành động thay mặt controller. Khóa assertion thường dành cho issuer, không phải holder thông thường. Khóa key agreement hỗ trợ thiết lập bí mật chung cho trao đổi thông điệp. Khóa mã hóa dữ liệu đối xứng bảo vệ credential lưu cục bộ. Một khóa bảo vệ hoặc wrapping key trong secure storage mã hóa khóa dữ liệu. Các khóa này có vòng đời, quyền sử dụng và yêu cầu phục hồi khác nhau.',
            en: 'DID-control or authentication keys prove that the wallet acts for a controller. Assertion keys are commonly used by issuers rather than ordinary holders. Key-agreement keys support shared-secret establishment for messaging. A symmetric data-encryption key protects locally stored credentials. A wrapping key in secure storage protects that data key. These keys have different lifecycles, permissions, and recovery requirements.',
          },
          {
            vi: 'Envelope encryption là lựa chọn phù hợp cho kho credential: mỗi bản ghi hoặc nhóm bản ghi được mã hóa bằng data-encryption key; key này được wrap bởi khóa do secure storage bảo vệ. Khi cần đọc credential, ứng dụng yêu cầu secure storage mở wrap sau khi xác nhận user presence. Cách làm này cho phép thay đổi khóa bảo vệ mà không phải mã hóa lại toàn bộ dữ liệu, đồng thời giảm thời gian khóa nhạy cảm tồn tại trong bộ nhớ.',
            en: 'Envelope encryption is appropriate for credential storage: each record or group is encrypted with a data-encryption key, which is wrapped by a key protected by secure storage. To read a credential, the application asks secure storage to unwrap after confirming user presence. This permits replacement of the wrapping key without re-encrypting all records and reduces the time sensitive keys remain in memory.',
          },
          {
            vi: 'DID Document chỉ chứa vật liệu công khai và quan hệ sử dụng khóa. Khóa bí mật không được đưa lên CertNet, gửi về backend hoặc ghi vào log. Khi luân chuyển khóa, wallet hoặc dịch vụ được ủy quyền cập nhật DID Document theo DID method; verifier cần xử lý version và không cache khóa vô thời hạn.',
            en: 'A DID Document contains public material and key relationships only. Private keys must not be placed on CertNet, sent to a backend, or written to logs. During rotation, the wallet or an authorized service updates the DID Document according to the DID method; verifiers must handle versions and avoid indefinite key caching.',
          },
        ],
        sources: ['did-core', 'nist-800-63b'],
      },
      {
        id: 'wallet-provisioning',
        title: { vi: '3. Khởi tạo ví và ghi DID lên CertNet', en: '3. Wallet provisioning and DID registration on CertNet' },
        thesis: {
          vi: 'Provisioning phải tạo ra bằng chứng rằng khóa công khai trên CertNet thực sự thuộc quyền kiểm soát của phiên ví đang được thiết lập.',
          en: 'Provisioning must establish that the public key registered on CertNet is controlled by the wallet session being created.',
        },
        paragraphs: [
          {
            vi: 'Quy trình bắt đầu bằng kiểm tra integrity của ứng dụng và trạng thái thiết bị. Wallet tạo cặp khóa trong vùng bảo vệ phù hợp, xây dựng DID Document chứa verification method, quan hệ authentication hoặc keyAgreement và service endpoint cần thiết. Trước khi gửi giao dịch tạo DID, wallet ký proof-of-possession bằng khóa bí mật tương ứng. CertNet hoặc dịch vụ đăng ký xác minh proof này để ngăn kẻ tấn công đăng một khóa công khai mà họ không kiểm soát.',
            en: 'The process begins by checking application integrity and device posture. The wallet generates keys in an appropriate protected environment and constructs a DID Document containing verification methods, authentication or key-agreement relationships, and necessary service endpoints. Before submitting the DID-creation transaction, the wallet signs proof of possession with the corresponding private key. CertNet or the registration service verifies the proof to prevent registration of a public key the requester does not control.',
          },
          {
            vi: 'Sau khi giao dịch đạt mức finality theo chính sách của CertNet, wallet lưu DID, metadata phiên bản và receipt cần cho audit. Ứng dụng không nên xem một transaction ID là bằng chứng duy nhất rằng DID đã sẵn sàng; cần resolve lại DID qua đường đọc độc lập và so sánh DID Document nhận được với document dự kiến. Đây là kiểm tra end-to-end quan trọng để phát hiện lỗi serialization, thay đổi ngoài ý muốn hoặc kết nối sai mạng.',
            en: 'After the transaction reaches the finality level required by CertNet policy, the wallet stores the DID, version metadata, and an audit receipt. A transaction ID alone should not be treated as proof that the DID is ready; the wallet should resolve the DID through an independent read path and compare the result with the intended document. This end-to-end check detects serialization errors, unintended changes, and wrong-network connections.',
          },
        ],
        bullets: [
          { vi: 'Không tạo DID trước khi thiết bị có khóa màn hình và secure storage khả dụng.', en: 'Do not create a DID before screen lock and secure storage are available.' },
          { vi: 'Không gửi seed, private key hoặc wrapping key tới backend để “hỗ trợ”.', en: 'Do not send seeds, private keys, or wrapping keys to a backend for “support.”' },
          { vi: 'Resolve lại DID sau khi ghi để kiểm tra kết quả end-to-end.', en: 'Resolve the DID after registration to verify the end-to-end result.' },
        ],
        sources: ['did-core'],
      },
      {
        id: 'wallet-credential-and-consent',
        title: { vi: '4. Nhận, lưu và trình bày credential', en: '4. Receiving, storing, and presenting credentials' },
        paragraphs: [
          {
            vi: 'Khi quét QR của issuer, wallet không nên xem QR là dữ liệu đáng tin. QR chỉ là bootstrap input chứa invitation hoặc thông tin để thiết lập kết nối. Wallet phải xác minh cấu trúc, giới hạn kích thước, chống replay, hiển thị danh tính bên kết nối và hoàn thành DIDComm handshake trước khi nhận credential. Credential nhận được phải được kiểm tra proof, issuer, schema, thời hạn và status policy trước khi ghi vào kho.',
            en: 'When scanning an issuer QR, the wallet must not treat the QR itself as trusted data. It is bootstrap input containing an invitation or connection information. The wallet must validate structure, enforce size limits, prevent replay, display the connecting party, and complete the DIDComm handshake before accepting a credential. The received credential should be checked for proof, issuer, schema, validity, and status policy before storage.',
          },
          {
            vi: 'Khi verifier yêu cầu chia sẻ, consent screen cần phân biệt rõ dữ liệu bắt buộc, dữ liệu tùy chọn, derived predicate và mục đích. Wallet không nên hiển thị tên schema kỹ thuật thay cho ngôn ngữ người dùng. Trước khi tạo VP, wallet ràng buộc proof với challenge và audience, sau đó ký bằng khóa holder phù hợp nếu protocol yêu cầu holder binding. Bản ghi audit cục bộ nên đủ để người dùng xem lại, nhưng tránh lưu dư thừa nội dung nhạy cảm hoặc gửi lịch sử chia sẻ về máy chủ.',
            en: 'When a verifier requests disclosure, the consent screen should distinguish required data, optional data, derived predicates, and purpose. The wallet should not substitute technical schema names for user-facing language. Before creating a VP, it binds the proof to the challenge and audience, then signs with an appropriate holder key when the protocol requires holder binding. Local audit history should be sufficient for user review while avoiding unnecessary sensitive content or server-side disclosure histories.',
          },
        ],
        sources: ['didcomm-v2', 'vc-data-model', 'vc-data-integrity'],
      },
      {
        id: 'wallet-single-vault-recovery',
        title: { vi: '5. Nguyên tắc một kho dữ liệu và đổi thiết bị', en: '5. Single-vault policy and device replacement' },
        thesis: {
          vi: 'Không export credential làm giảm nguy cơ nhân bản, nhưng chuyển trọng tâm phục hồi từ “restore backup” sang deactivation và reissuance.',
          en: 'Prohibiting credential export reduces cloning risk but shifts recovery from backup restoration to deactivation and reissuance.',
        },
        paragraphs: [
          {
            vi: 'Trong mô hình Identra, credential đầy đủ chỉ tồn tại trên điện thoại đang hoạt động. Không có bản sao web và không có backup cloud chứa kho. Khi đổi thiết bị, hệ thống trước hết xác minh yêu cầu chuyển đổi, vô hiệu hóa hoặc tách quyền của DID và kết nối cũ, tạo khóa cùng DID mới trên thiết bị mới, sau đó yêu cầu issuer cấp lại credential theo chính sách. Credential cũ không được sao chép sang máy mới.',
            en: 'Under Identra’s model, complete credentials exist only on the active phone. There is no web copy and no cloud backup of the vault. During device replacement, the system first validates the transition request, deactivates or removes authority from old DIDs and connections, creates new keys and DIDs on the replacement device, then requests reissuance under issuer policy. Old credentials are not copied to the new device.',
          },
          {
            vi: 'Cách làm này giảm rủi ro một backup bị giải mã tạo ra nhiều ví cùng nắm giữ credential. Đổi lại, issuer phải duy trì quy trình reissuance lâu dài; holder cần được giải thích rằng “khôi phục” là khôi phục quyền tiếp tục sử dụng, không phải phục hồi bit-for-bit. Hệ thống hỗ trợ phải chống account recovery fraud, bởi kẻ tấn công có thể cố chiếm quyền bằng cách giả báo mất thiết bị.',
            en: 'This reduces the risk that a decrypted backup creates multiple wallets holding the same credentials. In exchange, issuers must maintain long-term reissuance processes, and holders must understand that “recovery” restores the ability to continue, not a bit-for-bit vault. Support processes must resist account-recovery fraud because attackers may falsely report device loss to seize control.',
          },
        ],
        sources: ['did-core', 'nist-800-63a', 'nist-800-63b'],
      },
      {
        id: 'wallet-engineering-conclusion',
        title: { vi: '6. Tiêu chí chấp nhận cho một ví production', en: '6. Acceptance criteria for a production wallet' },
        paragraphs: [
          {
            vi: 'Một ví production cần vượt qua kiểm thử không chỉ ở happy path mà cả khi registry chậm, QR độc hại, status endpoint không khả dụng, thiết bị bị thay đổi posture, người dùng hủy consent giữa chừng và quá trình reissuance bị gián đoạn. Thiết kế khóa phải có inventory, rotation và incident playbook. Telemetry phải được đánh giá quyền riêng tư. Cuối cùng, giao diện consent phải được xem là một control bảo mật hạng nhất, ngang với secure storage và cryptographic verification.',
            en: 'A production wallet must be tested beyond happy paths: slow registries, malicious QR payloads, unavailable status endpoints, changed device posture, consent cancellation, and interrupted reissuance. Key design needs inventory, rotation, and incident playbooks. Telemetry requires privacy review. Finally, the consent interface must be treated as a first-class security control alongside secure storage and cryptographic verification.',
          },
        ],
        sources: ['nist-800-63b', 'didcomm-v2'],
      },
    ],
    references: [refs.did, refs.vc, refs.integrity, refs.didcomm, refs.nistAuth, refs.nistProofing],
  },
  'f-3': {
    format: 'security-analysis',
    readingTimeMinutes: 14,
    title: {
      vi: 'Zero-Knowledge Proof trong SSI: mô hình mật mã, selective disclosure và giới hạn quyền riêng tư',
      en: 'Zero-Knowledge Proofs in SSI: cryptographic model, selective disclosure, and privacy limits',
    },
    deck: {
      vi: 'Phân biệt predicate proof, selective disclosure và ẩn danh; phân tích quy trình tạo derived proof, chống liên kết và các rủi ro triển khai.',
      en: 'Distinguishing predicate proofs, selective disclosure, and anonymity while analyzing derived proofs, unlinkability, and implementation risks.',
    },
    abstract: {
      vi: 'Bài viết trình bày Zero-Knowledge Proof theo mô hình statement, witness, prover và verifier, sau đó đặt mô hình này vào vòng đời Verifiable Credential. Nội dung phân biệt selective disclosure với predicate proof, giải thích vai trò của BBS cryptosuite trong tạo derived proof, phân tích challenge, nonce, domain binding và khả năng liên kết. Bài viết kết luận rằng ZKP giảm dữ liệu tiết lộ nhưng không tự tạo ra ẩn danh, không thay thế trust policy và có thể bị vô hiệu hóa bởi metadata hoặc giao diện consent yếu.',
      en: 'This paper presents Zero-Knowledge Proofs through statements, witnesses, provers, and verifiers, then maps the model onto the Verifiable Credential lifecycle. It distinguishes selective disclosure from predicate proofs, explains BBS-derived proofs, and analyzes challenges, nonces, domain binding, and linkability. It concludes that ZKPs reduce disclosure but do not automatically create anonymity, replace trust policy, or overcome metadata and weak consent design.',
    },
    keywords: [
      { vi: 'zero-knowledge proof', en: 'zero-knowledge proof' },
      { vi: 'selective disclosure', en: 'selective disclosure' },
      { vi: 'BBS proof', en: 'BBS proof' },
      { vi: 'unlinkability', en: 'unlinkability' },
      { vi: 'predicate proof', en: 'predicate proof' },
    ],
    sections: [
      {
        id: 'zkp-formal-model',
        title: { vi: '1. Mô hình cơ bản: statement, witness và proof', en: '1. Basic model: statement, witness, and proof' },
        paragraphs: [
          {
            vi: 'Trong một hệ chứng minh zero-knowledge, prover muốn thuyết phục verifier rằng một statement là đúng mà không tiết lộ witness bí mật dùng để chứng minh. Ví dụ, statement có thể là “credential hợp lệ chứa ngày sinh thỏa điều kiện tuổi từ 18 trở lên”; witness gồm credential, chữ ký và ngày sinh. Ba thuộc tính thường được thảo luận là completeness, soundness và zero-knowledge: prover trung thực có thể chứng minh statement đúng; prover không có witness hợp lệ khó tạo proof được chấp nhận; và verifier không học thêm thông tin ngoài điều statement cho phép.',
            en: 'In a zero-knowledge proof system, a prover convinces a verifier that a statement is true without revealing the secret witness used to prove it. A statement might be “a valid credential contains a birth date satisfying age at least 18,” while the witness includes the credential, signature, and birth date. Three properties are commonly considered: completeness, soundness, and zero knowledge. An honest prover can prove a true statement, a prover without a valid witness cannot feasibly create an accepted proof, and the verifier learns nothing beyond what the statement permits.',
          },
          {
            vi: 'Trong SSI, thuật ngữ ZKP đôi khi được dùng quá rộng cho mọi hình thức tiết lộ tối thiểu. Selective disclosure chỉ che các thuộc tính không được chọn và tiết lộ nguyên văn thuộc tính được chọn. Predicate proof chứng minh một quan hệ, như lớn hơn một ngưỡng, mà không tiết lộ giá trị. Hai cơ chế có mục tiêu gần nhau nhưng yêu cầu mật mã, schema và khả năng tương tác khác nhau.',
            en: 'In SSI, “ZKP” is sometimes used too broadly for all minimal-disclosure techniques. Selective disclosure hides unselected attributes while revealing selected values verbatim. A predicate proof establishes a relation, such as exceeding a threshold, without revealing the value. The mechanisms have related goals but different cryptographic, schema, and interoperability requirements.',
          },
        ],
        table: {
          headers: [
            { vi: 'Cơ chế', en: 'Mechanism' },
            { vi: 'Verifier nhận được', en: 'Verifier receives' },
            { vi: 'Ví dụ', en: 'Example' },
          ],
          rows: [
            [
              { vi: 'Full disclosure', en: 'Full disclosure' },
              { vi: 'Toàn bộ credential hoặc toàn bộ claim', en: 'Complete credential or claim set' },
              { vi: 'Ngày sinh 2000-04-12', en: 'Birth date 2000-04-12' },
            ],
            [
              { vi: 'Selective disclosure', en: 'Selective disclosure' },
              { vi: 'Một số claim nguyên văn', en: 'Selected claims verbatim' },
              { vi: 'Chỉ tiết lộ quốc gia cư trú', en: 'Reveal country of residence only' },
            ],
            [
              { vi: 'Predicate proof', en: 'Predicate proof' },
              { vi: 'Kết quả điều kiện và proof', en: 'Predicate result and proof' },
              { vi: 'Tuổi lớn hơn hoặc bằng 18', en: 'Age is at least 18' },
            ],
          ],
        },
        sources: ['vc-di-bbs', 'vc-data-model'],
      },
      {
        id: 'zkp-derived-proof',
        title: { vi: '2. Derived proof từ credential đã ký', en: '2. Derived proofs from signed credentials' },
        paragraphs: [
          {
            vi: 'Với cryptosuite hỗ trợ selective disclosure như BBS, issuer ký một tập message đại diện cho các claim. Holder không thay đổi credential gốc; thay vào đó wallet tạo derived proof tiết lộ một tập con message và chứng minh các message ẩn vẫn thuộc credential được issuer ký. Verifier kiểm tra derived proof bằng khóa công khai của issuer mà không cần nhận toàn bộ credential gốc.',
            en: 'With a selective-disclosure cryptosuite such as BBS, the issuer signs a set of messages representing claims. The holder does not modify the original credential; the wallet creates a derived proof that reveals a subset of messages while proving that hidden messages belonged to the issuer-signed credential. The verifier validates the derived proof with the issuer’s public key without receiving the complete original credential.',
          },
          {
            vi: 'Derived proof cần được tạo mới cho từng phiên và ràng buộc với verifier challenge hoặc domain. Nếu wallet tái sử dụng cùng proof, verifier có thể liên kết các lần trình bày hoặc attacker có thể replay. Khả năng unlinkability còn phụ thuộc vào credential schema, các claim hiếm và metadata. Chỉ tiết lộ “chức danh: giám đốc phòng nghiên cứu lượng tử tại tổ chức X” vẫn có thể nhận diện một người dù proof không chứa tên.',
            en: 'A derived proof should be generated for each session and bound to a verifier challenge or domain. Reusing the same proof enables correlation or replay. Unlinkability also depends on schema, rare claims, and metadata. Revealing “director of quantum research at organization X” can identify a person even when the proof contains no name.',
          },
        ],
        sources: ['vc-di-bbs', 'vc-data-integrity'],
      },
      {
        id: 'zkp-age-proof',
        title: { vi: '3. Phân tích trường hợp kiểm tra tuổi', en: '3. Analysis of an age-verification case' },
        paragraphs: [
          {
            vi: 'Một thiết kế yếu yêu cầu verifier gửi mốc 18, wallet tự tính và trả về một boolean không có proof. Verifier phải tin wallet. Một thiết kế khác yêu cầu holder tiết lộ ngày sinh, rồi verifier tự tính. Thiết kế này xác minh được nhưng thu thập dữ liệu dư thừa. Predicate proof tốt phải chứng minh đồng thời rằng ngày sinh nằm trong credential có chữ ký hợp lệ và phép so sánh với thời điểm tham chiếu cho kết quả đúng.',
            en: 'A weak design asks the wallet to compare against 18 and return an unproven boolean, forcing the verifier to trust the wallet. Another design reveals the birth date and lets the verifier calculate, which is verifiable but over-collects data. A sound predicate proof must establish both that the birth date belongs to a valid signed credential and that comparison with the reference time is correct.',
          },
          {
            vi: 'Thời điểm tham chiếu phải được định nghĩa rõ để tránh proof còn hiệu lực quá lâu hoặc lệch múi giờ. Yêu cầu cần challenge ngẫu nhiên, audience, expiration và policy về issuer. Verifier cũng phải kiểm tra status của credential nền. Nếu credential đã bị thu hồi vì issuer phát hiện sai ngày sinh, proof tuổi tạo từ credential đó không còn đáng tin dù phép toán zero-knowledge tự nó vẫn đúng.',
            en: 'The reference time must be precisely defined to avoid overly long validity or timezone ambiguity. The request needs a random challenge, audience, expiry, and issuer policy. The verifier must also check the status of the underlying credential. If it was revoked because the issuer discovered an incorrect birth date, an age proof derived from it is no longer trustworthy even though the zero-knowledge computation itself remains valid.',
          },
        ],
        bullets: [
          { vi: 'Statement phải gắn với credential được issuer đáng tin ký.', en: 'The statement must be tied to a credential signed by a trusted issuer.' },
          { vi: 'Proof phải gắn với challenge và audience của phiên.', en: 'The proof must be bound to the session challenge and audience.' },
          { vi: 'Verifier vẫn phải kiểm tra status, validity và policy.', en: 'The verifier still checks status, validity, and policy.' },
          { vi: 'Log và telemetry không được lưu dữ liệu dẫn xuất làm mất mục tiêu tối thiểu hóa.', en: 'Logs and telemetry must not retain derived data that defeats minimization.' },
        ],
        sources: ['vc-di-bbs', 'vc-data-model', 'bitstring-status-list'],
      },
      {
        id: 'zkp-privacy-limits',
        title: { vi: '4. Giới hạn: ZKP không đồng nghĩa với ẩn danh', en: '4. Limits: ZKP is not anonymity' },
        paragraphs: [
          {
            vi: 'ZKP bảo vệ witness trong phạm vi proof, không bảo vệ toàn bộ giao dịch. Verifier vẫn có thể quan sát IP, tài khoản đăng nhập, thời điểm, thiết bị, vị trí, loại credential và tập claim được yêu cầu. Nếu cùng một holder identifier xuất hiện ở nhiều phiên, verifier có thể liên kết. Nếu issuer trực tiếp phục vụ status request duy nhất cho mỗi credential, issuer có thể suy ra nơi credential được dùng.',
            en: 'A ZKP protects the witness within the proof, not the entire transaction. A verifier may still observe IP addresses, login accounts, timing, devices, location, credential type, and requested claim sets. A stable holder identifier enables cross-session linkage. A unique issuer-hosted status request for each credential can reveal where it is used.',
          },
          {
            vi: 'ZKP cũng không làm cho một yêu cầu dữ liệu trở nên hợp pháp hoặc hợp lý. Một verifier độc hại có thể yêu cầu nhiều predicate vô hại riêng lẻ nhưng kết hợp chúng thành fingerprint nhận diện. Chính sách cần giới hạn tập yêu cầu, mục đích, retention và khả năng kết hợp dữ liệu. Wallet nên cảnh báo khi tập thuộc tính có tính nhận diện cao dù từng thuộc tính riêng lẻ không trực tiếp là danh tính.',
            en: 'A ZKP also does not make a request lawful or reasonable. A malicious verifier can request several individually harmless predicates and combine them into an identifying fingerprint. Policy must limit request sets, purpose, retention, and data combination. Wallets should warn when the requested set is highly identifying even if no single attribute is directly identifying.',
          },
        ],
        sources: ['vc-di-bbs', 'did-core', 'bitstring-status-list'],
      },
      {
        id: 'zkp-implementation-criteria',
        title: { vi: '5. Tiêu chí triển khai và kiểm thử', en: '5. Implementation and testing criteria' },
        paragraphs: [
          {
            vi: 'Đội triển khai cần xác định cryptosuite được hỗ trợ, canonicalization, schema mapping, cách chọn claim tiết lộ, challenge format, domain binding và chính sách status. Test vector phải bao gồm proof bị sửa, challenge cũ, sai audience, khóa issuer đã rotate, credential hết hạn, status bị thu hồi, claim không tồn tại và các proof được tạo lại nhiều lần để đánh giá unlinkability. Không nên tự thiết kế primitive mật mã hoặc biến thể proof nếu không có review chuyên gia.',
            en: 'Implementation teams must define supported cryptosuites, canonicalization, schema mapping, disclosure selection, challenge format, domain binding, and status policy. Test vectors should cover modified proofs, stale challenges, wrong audiences, rotated issuer keys, expired credentials, revoked status, missing claims, and repeatedly generated proofs to assess unlinkability. Teams should not invent cryptographic primitives or proof variants without expert review.',
          },
        ],
        sources: ['vc-di-bbs', 'vc-data-integrity'],
      },
    ],
    references: [refs.vc, refs.integrity, refs.bbs, refs.status, refs.did],
  },
  'l-1': {
    format: 'technical-reference',
    readingTimeMinutes: 14,
    title: {
      vi: 'Blockchain trong hạ tầng định danh: ranh giới on-chain, mô hình registry và quản trị CertNet',
      en: 'Blockchain in identity infrastructure: on-chain boundaries, registry models, and CertNet governance',
    },
    deck: {
      vi: 'Phân tích khi nào sổ cái phân tán tạo giá trị, dữ liệu nào không được ghi on-chain và cách verifier sử dụng registry mà không biến nó thành điểm theo dõi.',
      en: 'Analyzing when distributed ledgers add value, what must remain off-chain, and how verifiers use registries without turning them into tracking systems.',
    },
    abstract: {
      vi: 'Bài viết xem blockchain như một khả năng triển khai của verifiable data registry, không phải điều kiện bắt buộc của SSI. Nội dung phân tích ranh giới on-chain và off-chain, consistency và finality, luân chuyển khóa, trạng thái credential, caching, privacy metadata và governance. CertNet được mô tả như một trust infrastructure công bố DID Document và dữ liệu trạng thái tối thiểu, trong khi credential đầy đủ và lịch sử chia sẻ phải nằm ngoài chuỗi.',
      en: 'This paper treats blockchain as one implementation of a verifiable data registry rather than a requirement for SSI. It analyzes on-chain and off-chain boundaries, consistency and finality, key rotation, credential status, caching, privacy metadata, and governance. CertNet is described as trust infrastructure publishing DID Documents and minimal status data while complete credentials and disclosure histories remain off-chain.',
    },
    keywords: [
      { vi: 'verifiable data registry', en: 'verifiable data registry' },
      { vi: 'CertNet', en: 'CertNet' },
      { vi: 'on-chain', en: 'on-chain' },
      { vi: 'finality', en: 'finality' },
      { vi: 'governance', en: 'governance' },
    ],
    sections: [
      {
        id: 'registry-not-requirement',
        title: { vi: '1. DLT là lựa chọn registry, không phải định nghĩa của DID', en: '1. DLT is a registry choice, not the definition of a DID' },
        paragraphs: [
          {
            vi: 'DID Core mô tả verifiable data registry theo nghĩa rộng: hệ thống có thể ghi và trả về dữ liệu cần để tạo DID Document. Registry có thể là distributed ledger, database, decentralized file system hoặc peer-to-peer network. Lựa chọn blockchain chỉ hợp lý khi nhiều tổ chức cần chia sẻ một trạng thái tin cậy, không muốn một bên đơn phương thay đổi và chấp nhận chi phí của consensus, governance cùng vận hành node.',
            en: 'DID Core defines a verifiable data registry broadly as a system that records and returns data needed to produce DID Documents. It may be a distributed ledger, database, decentralized file system, or peer-to-peer network. Blockchain is justified when multiple organizations need shared trusted state, do not want unilateral control by one party, and accept the costs of consensus, governance, and node operation.',
          },
          {
            vi: 'Nếu một doanh nghiệp duy nhất vừa sở hữu hạ tầng, vừa quyết định mọi update và mọi verifier đều phải gọi API của doanh nghiệp đó, việc thêm blockchain có thể không làm hệ thống phi tập trung hơn. Phân tích cần xem quyền ghi, quyền xác thực block, khả năng kiểm tra độc lập, quy trình nâng cấp và cách xử lý tranh chấp.',
            en: 'If one company owns the infrastructure, decides every update, and requires every verifier to call its API, adding a blockchain may not make the system more decentralized. Analysis must examine write authority, block validation, independent verification, upgrade procedures, and dispute handling.',
          },
        ],
        sources: ['did-core'],
      },
      {
        id: 'onchain-boundary',
        title: { vi: '2. Ranh giới on-chain và off-chain', en: '2. On-chain and off-chain boundaries' },
        thesis: {
          vi: 'Tính bất biến có ích cho lịch sử kiểm soát khóa nhưng nguy hiểm đối với dữ liệu cá nhân và metadata có thể liên kết.',
          en: 'Immutability helps key-control history but is dangerous for personal data and linkable metadata.',
        },
        paragraphs: [
          {
            vi: 'CertNet nên lưu dữ liệu tối thiểu để resolve DID Document, xác định version, cập nhật hoặc deactivation và công bố trạng thái theo cơ chế giảm tương quan. Họ tên, ngày sinh, nội dung credential, VP, invitation DIDComm và lịch sử verifier không nên ghi on-chain. Mã hóa dữ liệu cá nhân trước khi ghi không giải quyết hoàn toàn vấn đề, bởi ciphertext và metadata vẫn tồn tại lâu dài, khóa có thể lộ trong tương lai và quyền xóa trở nên khó thực hiện.',
            en: 'CertNet should store the minimum needed for DID Document resolution, versioning, updates or deactivation, and privacy-preserving status publication. Names, birth dates, credential contents, VPs, DIDComm invitations, and verifier histories should not be placed on-chain. Encrypting personal data before writing does not fully solve the problem because ciphertext and metadata persist, keys may later be exposed, and deletion becomes difficult.',
          },
          {
            vi: 'Ngay cả DID công khai cũng cần được phân loại theo mục đích. DID của issuer tổ chức có thể cần tính ổn định và khả năng khám phá. DID của holder thường cần pairwise hoặc scoped để tránh tương quan. Việc ghi mọi holder DID lên một ledger công khai có thể tạo ra tập dữ liệu hoạt động dù document không chứa tên.',
            en: 'Even public DIDs require purpose classification. An organizational issuer DID may need stability and discoverability. Holder DIDs commonly need pairwise or scoped use to reduce correlation. Registering every holder DID on a public ledger can create an activity dataset even when documents contain no names.',
          },
        ],
        table: {
          headers: [
            { vi: 'Dữ liệu', en: 'Data' },
            { vi: 'Vị trí khuyến nghị', en: 'Recommended location' },
            { vi: 'Lý do', en: 'Rationale' },
          ],
          rows: [
            [
              { vi: 'DID Document issuer', en: 'Issuer DID Document' },
              { vi: 'CertNet / registry', en: 'CertNet / registry' },
              { vi: 'Cần resolve và kiểm tra khóa độc lập', en: 'Requires independent resolution and key verification' },
            ],
            [
              { vi: 'Credential đầy đủ', en: 'Complete credential' },
              { vi: 'Ví holder', en: 'Holder wallet' },
              { vi: 'Chứa dữ liệu cá nhân và chỉ được chia sẻ theo consent', en: 'Contains personal data disclosed only with consent' },
            ],
            [
              { vi: 'Status theo nhóm', en: 'Grouped status data' },
              { vi: 'Endpoint/cache có bảo vệ quyền riêng tư', en: 'Privacy-preserving endpoint/cache' },
              { vi: 'Cho phép verifier kiểm tra mà giảm theo dõi từng holder', en: 'Enables checks while reducing holder-specific tracking' },
            ],
            [
              { vi: 'Lịch sử chia sẻ', en: 'Disclosure history' },
              { vi: 'Cục bộ trên thiết bị hoặc không lưu', en: 'Local device storage or no retention' },
              { vi: 'Tránh tạo hồ sơ hành vi tập trung', en: 'Avoids centralized behavioral profiles' },
            ],
          ],
        },
        sources: ['did-core', 'bitstring-status-list'],
      },
      {
        id: 'certnet-consistency',
        title: { vi: '3. Consistency, finality và thuật toán xác minh', en: '3. Consistency, finality, and verification algorithms' },
        paragraphs: [
          {
            vi: 'Verifier cần định nghĩa mức finality chấp nhận được khi resolve DID. Nếu một update khóa vừa được ghi nhưng chưa final, các node có thể trả document khác nhau. Chính sách phải xác định có chấp nhận phiên bản trước hay không, cách phát hiện rollback và thời gian cache. Cache quá ngắn tăng tải và khả năng theo dõi; cache quá dài làm chậm phản ứng khi khóa bị thu hồi.',
            en: 'A verifier must define acceptable finality when resolving DIDs. If a key update is recorded but not final, nodes may return different documents. Policy must determine whether an earlier version is acceptable, how rollbacks are detected, and how long data is cached. Very short caches increase load and tracking opportunities; overly long caches delay response to revoked keys.',
          },
          {
            vi: 'Quy trình xác minh nên nhận proof, lấy DID URL của verification method, resolve DID Document kèm metadata, kiểm tra document version và deactivation, dereference đúng fragment, xác nhận quan hệ assertionMethod hoặc authentication, rồi mới kiểm tra chữ ký. Sau đó verifier kiểm tra credential status và trust policy. Chỉ gọi một API “verify=true” mà không lưu evidence về version và policy khiến kết quả khó audit.',
            en: 'Verification should take the proof, obtain the verification-method DID URL, resolve the DID Document with metadata, check version and deactivation, dereference the exact fragment, confirm the assertionMethod or authentication relationship, and only then verify the signature. The verifier subsequently evaluates credential status and trust policy. Calling a single “verify=true” API without retaining evidence of version and policy makes results difficult to audit.',
          },
        ],
        sources: ['did-core', 'vc-data-integrity', 'bitstring-status-list'],
      },
      {
        id: 'certnet-governance',
        title: { vi: '4. Governance quyết định mức độ phi tập trung thực tế', en: '4. Governance determines practical decentralization' },
        paragraphs: [
          {
            vi: 'Một mạng production cần quy tắc gia nhập node, phân quyền ghi, nâng cấp protocol, thay đổi tham số, giám sát, xử lý khóa node bị lộ và phục hồi sau sự cố. Nếu governance không rõ, verifier không biết nên tin trạng thái nào khi mạng phân nhánh hoặc một nhóm node ngừng hoạt động. Tính minh bạch governance quan trọng không kém thuật toán consensus.',
            en: 'A production network needs rules for node admission, write authorization, protocol upgrades, parameter changes, monitoring, compromised node keys, and incident recovery. Without clear governance, verifiers do not know which state to trust during forks or outages. Governance transparency matters as much as the consensus algorithm.',
          },
          {
            vi: 'CertNet cũng cần chính sách dữ liệu: loại DID nào được công bố, trường nào được phép trong DID Document, retention của transaction metadata, cơ chế status, quyền truy cập log và quy trình phản hồi yêu cầu pháp lý. “Dữ liệu công khai” không đồng nghĩa “không có rủi ro quyền riêng tư”. Các phép phân tích graph có thể suy luận quan hệ từ update timing, controller chung hoặc endpoint dùng lại.',
            en: 'CertNet also needs data policy: which DID classes are published, which DID Document fields are permitted, transaction-metadata retention, status mechanisms, log access, and legal-request procedures. “Public data” does not mean “no privacy risk.” Graph analysis may infer relationships from update timing, shared controllers, or reused endpoints.',
          },
        ],
        sources: ['did-core', 'bitstring-status-list'],
      },
      {
        id: 'certnet-decision',
        title: { vi: '5. Khi nào blockchain là lựa chọn hợp lý?', en: '5. When is blockchain a reasonable choice?' },
        paragraphs: [
          {
            vi: 'Blockchain phù hợp khi nhiều issuer và verifier độc lập cần chung một registry; không bên nào được phép đơn phương thay lịch sử; việc kiểm tra độc lập quan trọng; và hệ sinh thái chấp nhận governance cùng chi phí vận hành. Nếu các điều kiện này không tồn tại, một registry có audit log, chữ ký, replication và quản trị rõ có thể đơn giản hơn. Tiêu chí nên là tính đúng đắn, quyền riêng tư và khả năng chịu lỗi, không phải nhu cầu gắn nhãn blockchain.',
            en: 'Blockchain is reasonable when independent issuers and verifiers need a shared registry, no party may unilaterally rewrite history, independent verification matters, and the ecosystem accepts governance and operating costs. Without these conditions, a registry with signed audit logs, replication, and clear governance may be simpler. Criteria should be correctness, privacy, and resilience rather than the desire to apply a blockchain label.',
          },
        ],
        sources: ['did-core'],
      },
    ],
    references: [refs.did, refs.integrity, refs.status],
  },
  'l-2': {
    format: 'case-study',
    readingTimeMinutes: 13,
    title: {
      vi: 'Verifiable Credentials trong giáo dục: thiết kế vòng đời bằng cấp số và mô hình liên thông',
      en: 'Verifiable Credentials in education: designing digital-degree lifecycles and interoperability',
    },
    deck: {
      vi: 'Một nghiên cứu tình huống từ dữ liệu nguồn của nhà trường đến phát hành, cấp lại, thu hồi, xác minh xuyên biên giới và quản trị schema.',
      en: 'A case study spanning university source records, issuance, reissuance, revocation, cross-border verification, and schema governance.',
    },
    abstract: {
      vi: 'Bằng cấp số có chữ ký mật mã chỉ hữu ích khi nó phản ánh đúng hồ sơ đào tạo, có schema được hiểu thống nhất và tồn tại lâu hơn hệ thống phát hành ban đầu. Bài viết xây dựng kiến trúc tham chiếu cho trường đại học phát hành Verifiable Credential, phân tích trách nhiệm của registrar, dịch vụ issuer, wallet sinh viên và verifier, sau đó xem xét sửa sai, thu hồi, cấp lại khi đổi thiết bị, liên thông với Open Badges và các rủi ro pháp lý, ngữ nghĩa.',
      en: 'A cryptographically signed digital degree is useful only when it accurately reflects academic records, uses commonly understood semantics, and outlives the original issuance system. This case study develops a reference architecture for university-issued Verifiable Credentials, analyzes responsibilities across registrars, issuance services, student wallets, and verifiers, then examines correction, revocation, reissuance, Open Badges interoperability, and legal and semantic risks.',
    },
    keywords: [
      { vi: 'digital degree', en: 'digital degree' },
      { vi: 'Open Badges', en: 'Open Badges' },
      { vi: 'schema governance', en: 'schema governance' },
      { vi: 'reissuance', en: 'reissuance' },
      { vi: 'cross-border verification', en: 'cross-border verification' },
    ],
    sections: [
      {
        id: 'education-problem',
        title: { vi: '1. Bài toán không chỉ là số hóa tấm bằng', en: '1. The problem is more than digitizing a diploma' },
        paragraphs: [
          {
            vi: 'Ảnh scan hoặc PDF ký số cải thiện tính toàn vẹn của một tài liệu, nhưng vẫn buộc verifier đọc và ánh xạ nội dung thủ công. Một VC tốt biểu đạt dữ liệu có cấu trúc: tổ chức cấp, người học, chương trình, cấp độ, ngày hoàn thành, kết quả và trạng thái. Tuy nhiên, cấu trúc chỉ có giá trị khi các bên thống nhất ngữ nghĩa. “Bachelor”, “cử nhân”, “degree level 6” hoặc tên chương trình nội bộ có thể không tương đương nếu không có vocabulary và mapping rõ.',
            en: 'A scan or signed PDF improves document integrity but still forces verifiers to read and map content manually. A well-designed VC expresses structured data: awarding institution, learner, program, level, completion date, outcome, and status. Structure is useful only when parties agree on semantics. “Bachelor,” local degree labels, qualification level 6, and internal program names may not be equivalent without clear vocabularies and mappings.',
          },
          {
            vi: 'Do đó dự án cần bắt đầu từ mô hình dữ liệu và governance, không phải màn hình QR. Registrar phải là nguồn thẩm quyền cho dữ liệu học vụ; dịch vụ issuer không được tự suy luận hoặc sửa nội dung; schema owner quản lý phiên bản và mapping; bộ phận pháp chế xác định dữ liệu được cấp và thời hạn; đội vận hành xử lý thu hồi, cấp lại và tranh chấp.',
            en: 'The project should begin with data modeling and governance, not a QR screen. The registrar remains authoritative for academic records; the issuance service must not infer or alter content; a schema owner manages versions and mappings; legal teams define permitted claims and validity; operations handle revocation, reissuance, and disputes.',
          },
        ],
        sources: ['vc-data-model', 'open-badges-3'],
      },
      {
        id: 'education-issuance',
        title: { vi: '2. Pipeline phát hành và kiểm soát chất lượng', en: '2. Issuance pipeline and quality controls' },
        paragraphs: [
          {
            vi: 'Pipeline production nên tách quyết định đủ điều kiện tốt nghiệp khỏi thao tác ký. Hệ thống học vụ tạo một immutable issuance record sau khi quy trình phê duyệt hoàn tất. Dịch vụ issuer đọc record, validate schema, kiểm tra required fields, gắn issuer DID, validity và credentialStatus, rồi ký bằng khóa thuộc assertionMethod của trường. Một hàng đợi và idempotency key ngăn phát hành trùng khi job retry.',
            en: 'A production pipeline should separate the graduation decision from signing. The student information system creates an immutable issuance record after approval completes. The issuance service reads it, validates schema and required fields, attaches issuer DID, validity, and credentialStatus, then signs with a key authorized through the university’s assertionMethod. A queue and idempotency key prevent duplicate issuance during retries.',
          },
          {
            vi: 'Trước khi chuyển credential, trường thiết lập kết nối với wallet qua invitation có thời hạn. Wallet xác minh issuer, hiển thị loại credential và các thuộc tính sẽ lưu. Sau khi nhận, wallet kiểm tra proof độc lập. Issuer chỉ đánh dấu phát hành hoàn tất khi nhận acknowledgement ở mức protocol; acknowledgement không nên chứa bản sao credential hoặc dữ liệu không cần thiết.',
            en: 'Before delivery, the university establishes a wallet connection using an expiring invitation. The wallet verifies the issuer and displays the credential type and stored attributes. After receipt, the wallet independently validates the proof. The issuer marks delivery complete only after a protocol-level acknowledgment, which should not contain a credential copy or unnecessary data.',
          },
        ],
        sources: ['vc-data-model', 'vc-data-integrity', 'didcomm-v2'],
      },
      {
        id: 'education-verification',
        title: { vi: '3. Xác minh xuyên tổ chức và xuyên biên giới', en: '3. Cross-organization and cross-border verification' },
        paragraphs: [
          {
            vi: 'Một verifier quốc tế không chỉ kiểm tra chữ ký. Họ cần nhận diện pháp lý của trường, hiểu schema, ánh xạ cấp độ đào tạo, kiểm tra accreditation tại thời điểm cấp và đánh giá credential status. Trust registry hoặc credential accreditation riêng có thể cung cấp bằng chứng rằng issuer được phép cấp loại văn bằng đó. Nếu verifier chỉ tin mọi DID có chữ ký hợp lệ, bất kỳ tổ chức nào cũng có thể tự cấp “bằng đại học”.',
            en: 'An international verifier does more than validate a signature. It must establish the university’s legal identity, understand schema semantics, map qualification levels, assess accreditation at issuance time, and evaluate credential status. A trust registry or separate accreditation credential can establish authorization to issue that degree type. If a verifier trusts every DID with a valid signature, any organization can issue itself a “university degree.”',
          },
          {
            vi: 'Open Badges 3.0 cung cấp một mô hình cho achievement credentials và sử dụng nền tảng VC. Tuy vậy, liên thông kỹ thuật không bảo đảm tương đương học thuật. Một microcredential 20 giờ và một học phần đại học có thể cùng dùng chuẩn nhưng không có cùng trọng lượng. Verifier cần chính sách nghiệp vụ dựa trên issuer, criteria, evidence và context.',
            en: 'Open Badges 3.0 provides a model for achievement credentials using VC foundations. Technical interoperability does not guarantee academic equivalence. A twenty-hour microcredential and a university course can use the same standard without carrying the same weight. Verifiers need business policy based on issuer, criteria, evidence, and context.',
          },
        ],
        sources: ['vc-data-model', 'open-badges-3'],
      },
      {
        id: 'education-correction-status',
        title: { vi: '4. Sửa sai, thu hồi và cấp lại', en: '4. Correction, revocation, and reissuance' },
        paragraphs: [
          {
            vi: 'Credential có thể cần thay thế vì lỗi chính tả, thay đổi tên, khóa issuer bị lộ hoặc chính sách schema mới. Không phải mọi thay đổi đều có nghĩa bằng cấp ngoài đời bị hủy. Status cần phân biệt credential số không còn được chấp nhận với trạng thái qualification nền. Khi sửa, issuer nên thu hồi hoặc đánh dấu credential cũ theo policy, phát hành credential mới có liên kết audit nội bộ và giải thích rõ cho holder.',
            en: 'A credential may need replacement because of a spelling error, name change, compromised issuer key, or schema migration. Not every change means the underlying qualification is invalid. Status must distinguish an unacceptable digital credential from the underlying award. During correction, the issuer should revoke or mark the old credential according to policy, issue a replacement with internal audit linkage, and explain the change clearly to the holder.',
          },
          {
            vi: 'Theo nguyên tắc một kho của Identra, đổi điện thoại không sao chép credential cũ. Trường cần endpoint hoặc quy trình reissuance xác minh cựu sinh viên, kiểm tra credential trước đây và cấp lại vào DID mới. Đây là trách nhiệm dài hạn, đặc biệt vì bằng cấp có thể cần xác minh sau nhiều thập kỷ trong khi hệ thống và khóa đã thay đổi nhiều lần.',
            en: 'Under Identra’s single-vault policy, replacing a phone does not copy old credentials. The university needs a reissuance endpoint or process that identifies alumni, checks prior issuance, and issues to the new DID. This is a long-term responsibility because degrees may require verification decades later after systems and keys have changed repeatedly.',
          },
        ],
        sources: ['bitstring-status-list', 'did-core'],
      },
      {
        id: 'education-evaluation',
        title: { vi: '5. Đánh giá thành công và giới hạn', en: '5. Evaluation and limits' },
        paragraphs: [
          {
            vi: 'Thành công không nên đo bằng số credential đã phát hành. Các chỉ số có ý nghĩa hơn gồm tỷ lệ issuer data lỗi, thời gian xác minh, số yêu cầu thủ công giảm, tỷ lệ cấp lại thành công, tỷ lệ verifier hiểu đúng schema, sự cố status và mức dữ liệu trung bình được chia sẻ. Một dự án phát hành hàng triệu credential nhưng verifier vẫn yêu cầu ảnh scan chưa tạo ra chuyển đổi thực tế.',
            en: 'Success should not be measured by credentials issued. More meaningful metrics include issuer-data error rate, verification time, reduced manual requests, successful reissuance, verifier schema comprehension, status incidents, and average disclosure volume. A project can issue millions of credentials yet fail to transform practice if verifiers still request scans.',
          },
        ],
        sources: ['vc-data-model', 'open-badges-3'],
      },
    ],
    references: [refs.vc, refs.integrity, refs.status, refs.didcomm, refs.openBadges, refs.did],
  },
  'l-3': {
    format: 'security-analysis',
    readingTimeMinutes: 12,
    title: {
      vi: 'Phục hồi SSI Wallet theo mô hình không sao lưu thực chứng: threat model và quy trình cấp lại',
      en: 'Recovering an SSI Wallet without credential backups: threat model and reissuance process',
    },
    deck: {
      vi: 'Phân tích cách khôi phục quyền kiểm soát sau mất thiết bị mà không tạo bản sao thứ hai của kho credential.',
      en: 'Analyzing how to restore control after device loss without creating a second copy of the credential vault.',
    },
    abstract: {
      vi: 'Mô hình một kho dữ liệu duy nhất loại bỏ cloud backup của credential và ngăn nhiều thiết bị cùng nắm giữ. Bài viết phân biệt phục hồi khóa, phục hồi định danh và cấp lại credential; mô tả các cuộc tấn công vào account recovery; xây dựng quy trình deactivation, thiết lập thiết bị mới và reissuance; cuối cùng đánh giá giới hạn vận hành khi issuer ngừng hoạt động hoặc holder không thể hoàn thành identity proofing lại.',
      en: 'A single-active-vault model removes cloud credential backups and prevents simultaneous multi-device custody. This paper distinguishes key recovery, identity recovery, and credential reissuance; describes attacks against account recovery; develops a deactivation, replacement-device, and reissuance process; and evaluates operational limits when issuers disappear or holders cannot repeat identity proofing.',
    },
    keywords: [
      { vi: 'wallet recovery', en: 'wallet recovery' },
      { vi: 'reissuance', en: 'reissuance' },
      { vi: 'device loss', en: 'device loss' },
      { vi: 'account recovery fraud', en: 'account recovery fraud' },
    ],
    sections: [
      {
        id: 'recovery-three-problems',
        title: { vi: '1. Ba bài toán thường bị gọi chung là “khôi phục”', en: '1. Three problems commonly called “recovery”' },
        paragraphs: [
          {
            vi: 'Khôi phục khóa là lấy lại cùng private key; khôi phục định danh là giành lại quyền cập nhật hoặc thay thế controller của DID; cấp lại credential là issuer tạo một credential mới cho holder sau khi xác minh lại. Trong mô hình Identra, private key cũ và credential cũ không được sao lưu, nên quy trình chủ yếu là phục hồi quyền tiếp tục sử dụng thông qua DID mới và reissuance, không phải giải mã một backup.',
            en: 'Key recovery restores the same private key; identity recovery restores authority to update or replace a DID controller; credential reissuance creates a new credential after the issuer re-identifies the holder. In Identra’s model, old private keys and credentials are not backed up, so recovery restores the ability to continue through new DIDs and reissuance rather than decrypting a backup.',
          },
          {
            vi: 'Phân biệt này quan trọng vì mỗi bài toán có trust assumption khác nhau. Social recovery có thể phù hợp để giành lại quyền controller nhưng không nên cho phép người hỗ trợ đọc credential. Issuer có thể cấp lại credential nhưng không nên nhận private key mới của holder. Đội hỗ trợ có thể khóa tài khoản dịch vụ nhưng không nên có khả năng ký thay holder.',
            en: 'The distinction matters because each problem has different trust assumptions. Social recovery may help regain controller authority but should not expose credentials to helpers. An issuer can reissue credentials but should never receive the holder’s new private key. Support staff may lock service access but should not sign as the holder.',
          },
        ],
        sources: ['did-core', 'nist-800-63a', 'nist-800-63b'],
      },
      {
        id: 'recovery-threat-model',
        title: { vi: '2. Mô hình đe dọa của quy trình recovery', en: '2. Threat model for recovery' },
        paragraphs: [
          {
            vi: 'Kẻ tấn công có thể giả báo mất máy, chiếm SIM hoặc email, sử dụng giấy tờ bị đánh cắp, lừa nhân viên hỗ trợ, hoặc lợi dụng quy trình khẩn cấp để vô hiệu hóa thiết bị hợp lệ. Recovery vì vậy thường là đường tấn công dễ hơn mật mã của ví. NIST nhấn mạnh identity proofing và authenticator lifecycle phải xử lý rủi ro enrollment, binding và replacement, không chỉ authentication thường ngày.',
            en: 'An attacker may falsely report device loss, take over a SIM or email, use stolen documents, deceive support staff, or exploit emergency procedures to deactivate a legitimate device. Recovery is therefore often easier to attack than wallet cryptography. NIST emphasizes that identity proofing and authenticator lifecycles must address enrollment, binding, and replacement risks, not only routine authentication.',
          },
          {
            vi: 'Thiết kế cần chống cả takeover và denial of service. Nếu chỉ cần một kênh yếu để bắt đầu recovery, attacker có thể khóa ví của nạn nhân dù không lấy được credential. Nếu recovery quá khó, holder hợp lệ có thể mất khả năng sử dụng dài hạn. Mức proofing nên tỷ lệ với giá trị credential và hậu quả của việc cấp lại sai.',
            en: 'Design must resist both takeover and denial of service. If a weak channel can initiate recovery, an attacker may lock a victim’s wallet without obtaining credentials. If recovery is too difficult, legitimate holders may lose long-term access. Proofing strength should be proportional to credential value and the consequences of wrongful reissuance.',
          },
        ],
        sources: ['nist-800-63a', 'nist-800-63b'],
      },
      {
        id: 'recovery-protocol',
        title: { vi: '3. Quy trình mất thiết bị và chuyển sang máy mới', en: '3. Lost-device and replacement protocol' },
        paragraphs: [
          {
            vi: 'Quy trình nên bắt đầu bằng signal mất thiết bị qua kênh độc lập, sau đó áp dụng cooldown hoặc risk review phù hợp. Hệ thống đánh dấu DID và connection cũ là nghi ngờ, vô hiệu hóa quyền ký khi đủ bằng chứng, đồng thời lưu audit evidence. Thiết bị mới tạo khóa và DID mới sau khi đạt yêu cầu proofing. Không có bước chuyển private key hoặc credential từ thiết bị cũ.',
            en: 'The process should begin with a loss signal through an independent channel, followed by an appropriate cooldown or risk review. The system marks old DIDs and connections as suspect, removes signing authority when evidence is sufficient, and retains audit evidence. The replacement device creates new keys and DIDs after proofing requirements are met. No old private key or credential is transferred.',
          },
          {
            vi: 'Sau khi thiết bị mới hoạt động, wallet lập danh sách issuer cần liên hệ từ metadata không nhạy cảm hoặc hồ sơ do holder cung cấp. Mỗi issuer thực hiện policy reissuance riêng, kiểm tra trạng thái credential cũ và phát hành credential mới. Nếu credential cũ có nguy cơ bị dùng trái phép, issuer cập nhật status. Holder nhận thông báo rõ credential nào đã cấp lại, credential nào cần hành động bổ sung và credential nào không thể phục hồi.',
            en: 'After the new device is active, the wallet compiles issuers to contact from non-sensitive metadata or holder-provided records. Each issuer applies its own reissuance policy, checks old credential status, and issues a replacement. If an old credential risks misuse, the issuer updates status. The holder receives a clear account of credentials reissued, requiring further action, or unavailable for recovery.',
          },
        ],
        sources: ['did-core', 'bitstring-status-list', 'nist-800-63a'],
      },
      {
        id: 'recovery-failure-modes',
        title: { vi: '4. Failure modes và giới hạn của mô hình', en: '4. Failure modes and model limits' },
        paragraphs: [
          {
            vi: 'Nếu issuer ngừng hoạt động, holder có thể không nhận được credential thay thế dù qualification nền vẫn tồn tại. Hệ sinh thái cần quy tắc succession, escrow dữ liệu phát hành tối thiểu hoặc cơ quan kế nhiệm, nhưng không nên giải quyết bằng cách sao lưu credential cá nhân tập trung. Nếu holder không thể proof lại do thay đổi giấy tờ hoặc hoàn cảnh, issuer cần exception process có audit và human review.',
            en: 'If an issuer ceases operation, a holder may not obtain a replacement even when the underlying qualification still exists. Ecosystems need succession rules, minimal issuance-record escrow, or successor authorities without centralizing personal credential backups. If a holder cannot repeat proofing because records or circumstances changed, issuers need audited exception processes with human review.',
          },
          {
            vi: 'Mô hình không backup ưu tiên chống nhân bản và giảm hậu quả cloud breach, nhưng tăng phụ thuộc vào issuer và chất lượng recovery governance. Đây là một lựa chọn chính sách có đánh đổi, không phải kết quả tất yếu của SSI. Hệ thống phải công bố rõ cho người dùng trước khi họ lưu credential quan trọng.',
            en: 'A no-backup model prioritizes anti-cloning and reduces cloud-breach impact, but increases dependence on issuers and recovery governance. This is a policy trade-off, not an inevitable property of SSI. Systems must disclose it clearly before users store important credentials.',
          },
        ],
        sources: ['nist-800-63a', 'did-core'],
      },
    ],
    references: [refs.did, refs.status, refs.nistAuth, refs.nistProofing],
  },
  'l-4': {
    format: 'security-analysis',
    readingTimeMinutes: 12,
    title: {
      vi: 'Phishing trong SSI và DIDComm: phân tích trust, consent và tấn công thao túng người dùng',
      en: 'Phishing in SSI and DIDComm: analyzing trust, consent, and user-manipulation attacks',
    },
    deck: {
      vi: 'Vì sao kênh mã hóa và chữ ký hợp lệ không đủ ngăn yêu cầu chia sẻ độc hại, cùng các kiểm soát cần có ở wallet và verifier.',
      en: 'Why encrypted channels and valid signatures do not prevent malicious disclosure requests, and which wallet and verifier controls are required.',
    },
    abstract: {
      vi: 'SSI giảm giả mạo tài liệu nhưng không loại bỏ social engineering. Một attacker có thể vận hành DID hợp lệ, tạo invitation DIDComm hợp lệ và gửi yêu cầu chia sẻ được ký đúng. Bài viết phân biệt xác thực kỹ thuật với trust nghiệp vụ, xây dựng taxonomy tấn công phishing trong SSI, phân tích rủi ro QR và consent, rồi đề xuất kiểm soát ở protocol, wallet UX, governance và incident response.',
      en: 'SSI reduces document forgery but does not eliminate social engineering. An attacker can operate a valid DID, create a valid DIDComm invitation, and sign a disclosure request correctly. This paper distinguishes technical authentication from business trust, develops an SSI phishing taxonomy, analyzes QR and consent risks, and proposes controls across protocols, wallet UX, governance, and incident response.',
    },
    keywords: [
      { vi: 'phishing', en: 'phishing' },
      { vi: 'DIDComm', en: 'DIDComm' },
      { vi: 'consent', en: 'consent' },
      { vi: 'social engineering', en: 'social engineering' },
      { vi: 'verifier trust', en: 'verifier trust' },
    ],
    sections: [
      {
        id: 'phishing-authentication-trust',
        title: { vi: '1. Authentication không đồng nghĩa với trust', en: '1. Authentication is not trust' },
        paragraphs: [
          {
            vi: 'DIDComm có thể bảo vệ confidentiality, integrity và nguồn gửi của thông điệp theo cách cấu hình. Khi wallet xác minh chữ ký của một request, nó biết request đến từ controller của DID tương ứng. Nó chưa biết controller đó là ngân hàng thật, có thẩm quyền yêu cầu dữ liệu hay mục đích công bố có đúng hay không. Một attacker có thể kiểm soát hoàn toàn DID riêng và vẫn gửi request độc hại được ký hợp lệ.',
            en: 'DIDComm can protect message confidentiality, integrity, and sender origin depending on configuration. When a wallet validates a request signature, it knows the request came from the corresponding DID controller. It does not yet know that the controller is the real bank, is authorized to request the data, or has stated a truthful purpose. An attacker may fully control its own DID and still send a correctly signed malicious request.',
          },
          {
            vi: 'Trust cần thêm binding giữa DID và tổ chức pháp lý, accreditation hoặc trust registry, policy về loại dữ liệu được yêu cầu và context của giao dịch. Wallet cũng cần giải thích mức xác minh: “kết nối được mã hóa”, “DID đã biết”, “tổ chức được hệ sinh thái xác nhận” là ba trạng thái khác nhau và không nên hiển thị cùng một dấu an toàn chung chung.',
            en: 'Trust requires additional binding between a DID and a legal entity, accreditation or trust registry, policy concerning requested data, and transaction context. Wallets also need to explain assurance levels: “encrypted connection,” “known DID,” and “ecosystem-verified organization” are distinct states and should not share one generic safety badge.',
          },
        ],
        sources: ['didcomm-v2', 'did-core'],
      },
      {
        id: 'phishing-taxonomy',
        title: { vi: '2. Taxonomy tấn công phishing trong SSI', en: '2. Taxonomy of SSI phishing attacks' },
        paragraphs: [
          {
            vi: 'Invitation substitution xảy ra khi QR hoặc deep link hợp lệ bị thay bằng invitation của attacker. Request overreach xảy ra khi verifier thật yêu cầu nhiều thuộc tính hơn mục đích. Context spoofing dùng cuộc gọi hoặc website giả để khiến người dùng quét request độc hại. Consent fatigue gửi nhiều yêu cầu quen thuộc để người dùng phê duyệt theo phản xạ. Relay attack chuyển tiếp challenge giữa hai phiên nhằm làm holder ký cho audience khác.',
            en: 'Invitation substitution replaces a legitimate QR or deep link with an attacker invitation. Request overreach occurs when a real verifier asks for more attributes than the purpose requires. Context spoofing uses a fraudulent call or website to induce scanning of a malicious request. Consent fatigue sends familiar requests until users approve reflexively. Relay attacks forward challenges across sessions to make a holder sign for another audience.',
          },
          {
            vi: 'Ngoài ra còn có verifier impersonation qua tên hiển thị gần giống, malicious schema labels khiến thuộc tính nhạy cảm trông vô hại, và support recovery phishing yêu cầu người dùng “xác minh ví” sau khi báo mất thiết bị. Các cuộc tấn công này khai thác ngữ nghĩa và áp lực tâm lý hơn là phá mật mã.',
            en: 'Additional attacks include verifier impersonation through similar display names, malicious schema labels that make sensitive attributes appear harmless, and support-recovery phishing that asks users to “verify the wallet” after reporting device loss. These attacks exploit semantics and psychological pressure rather than breaking cryptography.',
          },
        ],
        sources: ['didcomm-v2', 'nist-800-63b'],
      },
      {
        id: 'phishing-wallet-controls',
        title: { vi: '3. Kiểm soát ở wallet: thiết kế consent như một security control', en: '3. Wallet controls: treating consent as a security control' },
        paragraphs: [
          {
            vi: 'Consent screen phải hiển thị danh tính verifier đã được binding, nguồn xác minh, mục đích, audience, thời hạn, từng thuộc tính và derived predicate. Thuộc tính nhạy cảm cần hierarchy rõ; request bất thường cần warning dựa trên policy, không chỉ màu sắc. Wallet nên trì hoãn hoặc yêu cầu xác nhận bổ sung khi request đến ngoài context, yêu cầu dữ liệu hiếm, hoặc được kích hoạt từ deep link không có phiên người dùng chủ động.',
            en: 'A consent screen must display the bound verifier identity, verification source, purpose, audience, expiry, each attribute, and derived predicates. Sensitive attributes need clear hierarchy; unusual requests need policy-based warnings rather than color alone. Wallets should delay or require additional confirmation when requests arrive out of context, ask for rare data, or originate from deep links without an active user-initiated session.',
          },
          {
            vi: 'QR parser phải giới hạn kích thước, scheme, redirect, expiration và số lần sử dụng. Invitation cần nonce và expiry; wallet không tự động chấp nhận connection chỉ vì QR decode được. Sau khi kết nối, mọi request phải được ràng buộc với connection và audience. Wallet nên cho phép người dùng xem, ngắt và chặn connection, đồng thời không gửi telemetry chứa nội dung request.',
            en: 'QR parsers must restrict size, schemes, redirects, expiry, and reuse. Invitations need nonce and expiry; wallets must not accept connections merely because a QR decodes. After connection, every request must be bound to that connection and audience. Wallets should let users inspect, disconnect, and block connections while avoiding telemetry that contains request contents.',
          },
        ],
        sources: ['didcomm-v2', 'nist-800-63b'],
      },
      {
        id: 'phishing-ecosystem-controls',
        title: { vi: '4. Kiểm soát ở verifier và hệ sinh thái', en: '4. Verifier and ecosystem controls' },
        paragraphs: [
          {
            vi: 'Verifier hợp lệ nên ký request bằng khóa được ủy quyền, dùng domain hoặc audience ổn định, mô tả purpose machine-readable và human-readable, yêu cầu dữ liệu tối thiểu, đặt expiration ngắn và không dùng dark pattern. Trust registry cần quy trình đăng ký tên hiển thị, xử lý impersonation và thu hồi quyền khi verifier vi phạm. Issuer không nên dạy người dùng rằng “mọi QR có logo đều an toàn”.',
            en: 'Legitimate verifiers should sign requests with authorized keys, use stable domains or audiences, describe purpose in machine-readable and human-readable forms, request minimal data, set short expiration, and avoid dark patterns. Trust registries need display-name registration, impersonation handling, and removal procedures for abusive verifiers. Issuers should not teach users that every branded QR is safe.',
          },
          {
            vi: 'Incident response cần thu thập DID, request ID, thời điểm, channel khởi tạo và tập thuộc tính đã chia sẻ; chặn verifier độc hại; đánh giá credential nào cần status update hoặc reissuance; và thông báo holder bằng kênh độc lập. Không nên thu thập thêm bản sao credential trong quá trình điều tra nếu metadata đủ để xử lý.',
            en: 'Incident response should collect the DID, request ID, time, initiating channel, and disclosed attribute set; block the malicious verifier; assess which credentials require status changes or reissuance; and notify holders through independent channels. Investigations should not collect additional credential copies when metadata is sufficient.',
          },
        ],
        sources: ['didcomm-v2', 'nist-800-63b'],
      },
      {
        id: 'phishing-residual-risk',
        title: { vi: '5. Rủi ro còn lại', en: '5. Residual risk' },
        paragraphs: [
          {
            vi: 'Không giao diện nào loại bỏ hoàn toàn social engineering. Người dùng có thể phê duyệt vì áp lực, quen tay hoặc tin sai người gọi. Mục tiêu thực tế là giảm tần suất request, làm context rõ, giới hạn dữ liệu và blast radius, phát hiện abuse nhanh, đồng thời bảo đảm một lần phê duyệt sai không dẫn tới mất private key hoặc toàn bộ kho credential.',
            en: 'No interface eliminates social engineering. Users may approve under pressure, from habit, or because they trust the wrong caller. The practical goal is to reduce request frequency, clarify context, limit data and blast radius, detect abuse quickly, and ensure that one mistaken approval cannot expose private keys or the complete vault.',
          },
        ],
        sources: ['nist-800-63b'],
      },
    ],
    references: [refs.didcomm, refs.did, refs.nistAuth],
  },
  'l-5': {
    format: 'technical-reference',
    readingTimeMinutes: 15,
    title: {
      vi: 'DID Document và DID Resolution: verification methods, key rotation và thuật toán xác minh',
      en: 'DID Documents and DID Resolution: verification methods, key rotation, and verification algorithms',
    },
    deck: {
      vi: 'Tài liệu kỹ thuật về cấu trúc DID Document, quan hệ ủy quyền của khóa, resolution metadata, dereferencing và xử lý lịch sử khóa.',
      en: 'A technical reference for DID Document structure, key authorization relationships, resolution metadata, dereferencing, and key history.',
    },
    abstract: {
      vi: 'DID Document không phải hồ sơ danh tính cá nhân mà là tài liệu mô tả cơ chế kiểm soát và tương tác liên quan tới DID. Bài viết phân tích dữ liệu cốt lõi, verification method và verification relationship, phân biệt resolution với dereferencing, trình bày thuật toán verifier chọn đúng khóa cho VC, sau đó thảo luận key rotation, revocation, historical verification, caching và quyền riêng tư.',
      en: 'A DID Document is not a personal identity profile; it describes control and interaction mechanisms associated with a DID. This technical reference analyzes the core data model, verification methods and relationships, distinguishes resolution from dereferencing, presents an algorithm for selecting the correct VC verification key, and discusses key rotation, revocation, historical verification, caching, and privacy.',
    },
    keywords: [
      { vi: 'DID Document', en: 'DID Document' },
      { vi: 'DID Resolution', en: 'DID Resolution' },
      { vi: 'verification method', en: 'verification method' },
      { vi: 'key rotation', en: 'key rotation' },
    ],
    sections: [
      {
        id: 'did-document-data-model',
        title: { vi: '1. DID Document biểu đạt điều gì?', en: '1. What does a DID Document express?' },
        paragraphs: [
          {
            vi: 'DID Document gắn với một DID subject và được controller quản lý theo quy tắc của DID method. Document có thể chứa verification methods, verification relationships, services và một số thuộc tính cốt lõi khác. Verification method mô tả cách kiểm tra proof, thường gồm id, type, controller và public-key material. Verification relationship cho biết method được phép dùng cho mục đích nào, chẳng hạn authentication, assertionMethod, keyAgreement, capabilityInvocation hoặc capabilityDelegation.',
            en: 'A DID Document is associated with a DID subject and managed by controllers according to a DID method. It may contain verification methods, verification relationships, services, and other core properties. A verification method describes how to verify proofs, commonly including id, type, controller, and public-key material. A verification relationship authorizes a method for a purpose such as authentication, assertionMethod, keyAgreement, capabilityInvocation, or capabilityDelegation.',
          },
          {
            vi: 'Sự tồn tại của khóa trong verificationMethod không tự cho phép dùng khóa đó cho mọi mục đích. Khi xác minh VC, verifier thường cần method được proof tham chiếu và được liệt kê hoặc nhúng trong assertionMethod. Khi xác thực controller, authentication mới là quan hệ phù hợp. Bỏ qua relationship biến DID Document thành danh sách khóa không có semantics và có thể chấp nhận chữ ký được tạo bằng khóa sai mục đích.',
            en: 'A key’s presence in verificationMethod does not authorize it for every purpose. When verifying a VC, the verifier generally needs the method referenced by the proof and authorized under assertionMethod. Authentication of a controller uses the authentication relationship. Ignoring relationships reduces the DID Document to a semantically empty key list and may accept signatures from keys intended for another purpose.',
          },
        ],
        sources: ['did-core'],
      },
      {
        id: 'did-document-example',
        title: { vi: '2. Ví dụ DID Document cho issuer', en: '2. Example issuer DID Document' },
        paragraphs: [
          {
            vi: 'Ví dụ dưới đây tách khóa ký credential khỏi khóa key agreement. Trong production, type và encoding phải phù hợp cryptosuite, DID method và registry profile. Private key tương ứng không xuất hiện trong document.',
            en: 'The example separates credential-signing and key-agreement keys. In production, types and encodings must match the cryptosuite, DID method, and registry profile. Corresponding private keys never appear in the document.',
          },
        ],
        code: {
          language: 'json',
          source: `{
  "id": "did:identra:issuer:university-a",
  "verificationMethod": [
    {
      "id": "did:identra:issuer:university-a#assertion-2026-01",
      "type": "JsonWebKey2020",
      "controller": "did:identra:issuer:university-a",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "Ed25519",
        "x": "base64url-public-key"
      }
    },
    {
      "id": "did:identra:issuer:university-a#agreement-2026-01",
      "type": "JsonWebKey2020",
      "controller": "did:identra:issuer:university-a",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "X25519",
        "x": "base64url-public-key"
      }
    }
  ],
  "assertionMethod": [
    "did:identra:issuer:university-a#assertion-2026-01"
  ],
  "keyAgreement": [
    "did:identra:issuer:university-a#agreement-2026-01"
  ],
  "service": [
    {
      "id": "did:identra:issuer:university-a#didcomm",
      "type": "DIDCommMessaging",
      "serviceEndpoint": "https://issuer.example.edu/didcomm"
    }
  ]
}`,
          caption: {
            vi: 'Document minh họa tách khóa assertion và key agreement; triển khai thực tế phải profile hóa type, context và service.',
            en: 'The example separates assertion and key-agreement keys; production deployments must profile types, contexts, and services.',
          },
        },
        sources: ['did-core', 'didcomm-v2'],
      },
      {
        id: 'did-resolution-dereferencing',
        title: { vi: '3. Resolution và dereferencing là hai thao tác khác nhau', en: '3. Resolution and dereferencing are distinct operations' },
        paragraphs: [
          {
            vi: 'DID resolution nhận một DID và trả DID Document cùng resolution metadata và document metadata. Metadata có thể mô tả lỗi, content type, version, thời điểm tạo hoặc deactivation tùy DID method. DID URL dereferencing nhận một DID URL có path, query hoặc fragment và trả resource cụ thể, ví dụ verification method `#assertion-2026-01`. Verifier cần phân biệt hai bước để xử lý lỗi và audit chính xác.',
            en: 'DID resolution accepts a DID and returns a DID Document plus resolution and document metadata. Depending on the DID method, metadata may describe errors, content type, version, creation time, or deactivation. DID URL dereferencing accepts a DID URL with path, query, or fragment and returns a specific resource such as verification method `#assertion-2026-01`. Verifiers must distinguish the operations for correct error handling and audit.',
          },
          {
            vi: 'Resolver là một trust-sensitive component. Resolver độc hại có thể trả document giả, document cũ hoặc theo dõi DID được truy vấn. Verifier có thể giảm rủi ro bằng cách kiểm tra proof hoặc registry evidence theo DID method, dùng nhiều nguồn khi cần, cache có giới hạn, xác minh version metadata và không gửi truy vấn holder DID nhạy cảm tới resolver bên thứ ba không đáng tin.',
            en: 'A resolver is trust-sensitive. A malicious resolver can return fabricated or stale documents or observe queried DIDs. Verifiers can reduce risk by validating method-specific proofs or registry evidence, using multiple sources when appropriate, applying bounded caches, checking version metadata, and avoiding untrusted third-party resolution of sensitive holder DIDs.',
          },
        ],
        sources: ['did-core'],
      },
      {
        id: 'did-verification-algorithm',
        title: { vi: '4. Thuật toán chọn khóa và xác minh VC', en: '4. Key-selection and VC-verification algorithm' },
        paragraphs: [
          {
            vi: 'Verifier đọc issuer và verificationMethod từ proof. DID URL của verificationMethod được tách thành DID gốc và fragment. Resolver lấy DID Document phù hợp với thời điểm hoặc policy xác minh. Verifier dereference fragment, kiểm tra method tồn tại, controller phù hợp và được ủy quyền qua assertionMethod. Sau đó verifier chọn cryptosuite dựa trên proof type, kiểm tra canonicalization cùng chữ ký, rồi mới kiểm tra validity, schema, status và trust policy.',
            en: 'The verifier reads issuer and verificationMethod from the proof. The verification-method DID URL is split into its base DID and fragment. The resolver obtains the document version required by verification-time policy. The verifier dereferences the fragment, confirms that the method exists, has an appropriate controller, and is authorized under assertionMethod. It then selects the cryptosuite from the proof type, verifies canonicalization and signature, and only afterward evaluates validity, schema, status, and trust policy.',
          },
          {
            vi: 'Mỗi lỗi cần được phân loại. Không resolve được DID khác với method không tồn tại; method tồn tại nhưng không thuộc assertionMethod khác với chữ ký sai; chữ ký đúng nhưng credential hết hạn khác với issuer không nằm trong trust framework. Gộp mọi trường hợp thành “invalid credential” làm mất khả năng vận hành, audit và phản hồi đúng cho holder.',
            en: 'Errors should be classified. Failure to resolve a DID differs from a missing method; a method not authorized for assertion differs from a bad signature; a valid signature on an expired credential differs from an issuer outside the trust framework. Collapsing every case into “invalid credential” harms operations, audit, and meaningful holder feedback.',
          },
        ],
        sources: ['did-core', 'vc-data-integrity', 'vc-data-model'],
      },
      {
        id: 'did-key-lifecycle',
        title: { vi: '5. Luân chuyển, thu hồi và xác minh lịch sử', en: '5. Rotation, revocation, and historical verification' },
        paragraphs: [
          {
            vi: 'Khóa cần rotate khi hết chu kỳ, thay đổi hệ thống hoặc có nghi ngờ lộ. Document mới nên thêm khóa mới, chuyển hoạt động sang khóa đó và loại bỏ hoặc đánh dấu khóa cũ theo DID method. Tuy nhiên, verifier xác minh credential đã ký trước đây có thể cần biết khóa nào hợp lệ tại thời điểm ký. DID method và CertNet profile phải xác định cách truy xuất lịch sử hoặc version để tránh hai lỗi đối lập: tiếp tục tin khóa bị lộ hoặc không thể xác minh credential cũ hợp lệ.',
            en: 'Keys require rotation at lifecycle boundaries, system changes, or suspected compromise. A new document should introduce the replacement key, transition activity, and remove or mark the old key according to the DID method. Verifying previously issued credentials may require knowing which key was valid at signing time. The DID method and CertNet profile must define version history to avoid either trusting a compromised key indefinitely or losing the ability to verify legitimate historical credentials.',
          },
          {
            vi: 'Khi khóa issuer bị lộ, chỉ cập nhật DID Document chưa đủ. Issuer cần xác định credential nào có thể đã bị giả mạo, cập nhật status hoặc phát hành lại, thông báo verifier và giữ bằng chứng sự cố. Khi DID bị deactivated, verifier phải biết deactivation có hiệu lực từ thời điểm nào và policy đối với proof trước thời điểm đó.',
            en: 'When an issuer key is compromised, updating the DID Document is insufficient. The issuer must identify potentially forged credentials, update status or reissue, notify verifiers, and retain incident evidence. When a DID is deactivated, verifiers need the effective time and a policy for proofs created beforehand.',
          },
        ],
        sources: ['did-core', 'bitstring-status-list'],
      },
      {
        id: 'did-privacy',
        title: { vi: '6. Privacy và tối thiểu hóa DID Document', en: '6. Privacy and DID Document minimization' },
        paragraphs: [
          {
            vi: 'DID Document có thể công khai và tồn tại lâu dài, vì vậy không nên chứa tên, email, địa chỉ hoặc service endpoint tiết lộ hành vi cá nhân. Reuse cùng endpoint, controller hoặc verification method giữa nhiều DID có thể tạo correlation. Holder DID nên được scope phù hợp; issuer DID công khai cần profile trường cho phép. Dữ liệu mã hóa trong document vẫn có thể tạo rủi ro tương lai và metadata tương quan.',
            en: 'DID Documents may be public and long-lived, so they should not contain names, email addresses, physical addresses, or service endpoints that reveal personal behavior. Reusing endpoints, controllers, or verification methods across DIDs can enable correlation. Holder DIDs should be appropriately scoped, and public issuer DIDs need an allowed-field profile. Encrypted document data can still create future and metadata correlation risks.',
          },
        ],
        sources: ['did-core'],
      },
    ],
    references: [refs.did, refs.integrity, refs.vc, refs.status, refs.didcomm],
  },
};

academicBlogContentDb['l-2'] = educationSsiArticle;
