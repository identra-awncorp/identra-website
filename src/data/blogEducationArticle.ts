import type { AcademicArticle } from './blogAcademicContent';

export const educationSsiArticle: AcademicArticle = {
  format: 'case-study',
  readingTimeMinutes: 28,
  title: {
    vi: 'SSI trong giáo dục: từ vấn nạn bằng giả đến quy trình xác minh bằng cấp bằng mật mã',
    en: 'SSI in education: from diploma fraud to cryptographic degree verification',
  },
  deck: {
    vi: 'Phân tích bài toán bằng cấp giả, rủi ro của cổng xác minh tập trung và cách thiết kế trọn vẹn luồng cấp phát, nắm giữ, chia sẻ, xác minh bằng cấp bằng Identra SDK.',
    en: 'An analysis of diploma fraud, centralized-verification risks, and a complete issuance, holding, sharing, and verification flow built with the illustrative Identra SDK.',
  },
  abstract: {
    vi: 'Bằng giấy, ảnh scan và PDF có thể bị làm giả hoặc chỉnh sửa; quy trình gọi điện, gửi email cho trường để xác minh lại chậm, khó mở rộng và đặc biệt bất tiện khi xác minh xuyên biên giới. Cổng tra cứu tập trung giúp tự động hóa nhưng tạo thêm kho dữ liệu có giá trị cao, điểm lỗi tập trung và xu hướng thu thập cả bảng điểm dù bên xác minh chỉ cần biết một vài điều kiện. Bài viết này phân tích cách SSI dùng Verifiable Credential, DID, DIDComm và CertNet để biến bằng cấp thành dữ liệu có thể kiểm tra bằng mật mã, do người học nắm giữ và chỉ chia sẻ theo yêu cầu cụ thể. Bài viết cũng trình bày sơ đồ vòng đời, code minh họa cho trường, ứng dụng sinh viên và nhà tuyển dụng, cùng những giới hạn mà chữ ký số không thể tự giải quyết.',
    en: 'Paper diplomas, scans, and PDFs can be forged or altered; calling or emailing universities for confirmation is slow, difficult to scale, and especially awkward across borders. Central verification portals automate parts of the process but create valuable data stores, single points of failure, and a tendency to collect full transcripts when a verifier needs only a few facts. This article analyzes how SSI uses Verifiable Credentials, DIDs, DIDComm, and CertNet to make degrees cryptographically verifiable, holder-controlled, and disclosed for a specific request. It includes a lifecycle diagram, illustrative code for universities, student apps, and employers, and the limits that signatures alone cannot solve.',
  },
  keywords: [
    { vi: 'bằng cấp giả', en: 'diploma fraud' },
    { vi: 'xác minh bằng cấp', en: 'degree verification' },
    { vi: 'tối thiểu hóa dữ liệu', en: 'data minimization' },
    { vi: 'Verifiable Credential', en: 'Verifiable Credential' },
    { vi: 'DIDComm', en: 'DIDComm' },
  ],
  sections: [
    {
      id: 'education-real-problem',
      title: {
        vi: '1. Bài toán thật: một tệp PDF trông hợp lệ chưa chắc là bằng cấp thật',
        en: '1. The real problem: a plausible PDF is not necessarily a real degree',
      },
      thesis: {
        vi: 'Giá trị của một văn bằng nằm ở khả năng chứng minh ai đã cấp, cấp cho ai, nội dung có bị sửa hay không và văn bằng còn được công nhận hay không.',
        en: 'A qualification is useful only when one can establish who issued it, to whom, whether it was altered, and whether it remains recognized.',
      },
      paragraphs: [
        {
          vi: 'Một nhà tuyển dụng nhận CV kèm ảnh chụp bằng tốt nghiệp và bảng điểm thường chỉ nhìn thấy kết quả của quá trình sao chép. Logo, con dấu, chữ ký tay, mã sinh viên, điểm số và ngày tốt nghiệp đều có thể được chỉnh sửa bằng công cụ phổ thông. PDF có chữ ký số tốt hơn ảnh scan, nhưng người nhận vẫn phải biết cách kiểm tra chứng thư ký, chuỗi tin cậy, thời hạn và trạng thái thu hồi. Khi tệp được in ra, chụp màn hình hoặc chuyển đổi định dạng, nhiều tín hiệu xác minh lại biến mất.',
          en: 'An employer receiving a CV with diploma and transcript images sees only the output of a copying process. Logos, seals, handwritten signatures, student numbers, grades, and graduation dates can all be edited with common tools. A digitally signed PDF is stronger than a scan, but the recipient must still know how to validate the signing certificate, trust chain, validity period, and revocation state. Printing, screenshotting, or converting the file can remove many verification signals.',
        },
        {
          vi: 'Bên xác minh vì thế thường quay về quy trình thủ công: gửi email cho phòng đào tạo, gọi điện, yêu cầu bản sao công chứng hoặc mua dịch vụ kiểm tra lý lịch. Quy trình này phụ thuộc giờ làm việc, ngôn ngữ, khả năng tìm đúng đầu mối và chính sách phản hồi của từng trường. Một trường có thể xác nhận rằng sinh viên đã tốt nghiệp nhưng không thể gửi toàn bộ hồ sơ qua email vì nghĩa vụ bảo vệ dữ liệu. Kết quả là quyết định tuyển dụng bị chậm, trong khi hồ sơ giả tinh vi vẫn có khả năng lọt qua.',
          en: 'Verifiers therefore fall back to manual work: emailing registrars, making calls, requesting notarized copies, or purchasing background checks. The process depends on office hours, language, finding the right contact, and each institution’s response policy. A university may confirm graduation but be unable to email an entire record because of data-protection duties. Hiring decisions slow down while sophisticated fraud can still pass.',
        },
        {
          vi: 'Cần phân biệt hai dạng gian lận. Dạng thứ nhất là giả mạo hoặc sửa một văn bằng do trường hợp pháp cấp; mật mã có thể phát hiện tốt dạng này. Dạng thứ hai là một tổ chức không đủ thẩm quyền tự nhận là trường và phát hành “bằng” có chữ ký hợp lệ của chính họ. Chữ ký số không tự chứng minh tổ chức đó được công nhận. Bên xác minh vẫn cần trust registry, dữ liệu kiểm định hoặc chính sách chấp nhận issuer.',
          en: 'Two fraud classes matter. The first is forging or altering a qualification issued by a legitimate institution; cryptography can detect this well. The second is an unauthorized organization calling itself a university and signing its own “degrees.” A valid signature does not prove accreditation. Verifiers still need a trust registry, accreditation evidence, or an issuer-acceptance policy.',
        },
      ],
      table: {
        headers: [
          { vi: 'Cách biểu diễn', en: 'Representation' },
          { vi: 'Có thể kiểm tra tự động?', en: 'Machine-verifiable?' },
          { vi: 'Điểm yếu chính', en: 'Primary weakness' },
        ],
        rows: [
          [
            { vi: 'Bằng giấy / ảnh scan', en: 'Paper diploma / scan' },
            { vi: 'Không; chủ yếu dựa vào quan sát và xác nhận thủ công', en: 'No; primarily visual inspection and manual confirmation' },
            { vi: 'Dễ sao chép, chỉnh sửa và tách khỏi nguồn cấp', en: 'Easy to copy, alter, and detach from the issuing source' },
          ],
          [
            { vi: 'PDF ký số', en: 'Digitally signed PDF' },
            { vi: 'Có, nếu bên nhận giữ đúng tệp và hiểu hệ thống chứng thư', en: 'Yes, if the original file and certificate system are understood' },
            { vi: 'Khó xử lý dữ liệu theo cấu trúc; tín hiệu xác minh dễ mất khi chuyển đổi', en: 'Weak structured-data processing; verification signals can disappear during conversion' },
          ],
          [
            { vi: 'Cổng tra cứu tập trung', en: 'Central verification portal' },
            { vi: 'Có, nhưng phụ thuộc portal và tích hợp riêng', en: 'Yes, but depends on the portal and proprietary integration' },
            { vi: 'Điểm lỗi tập trung, sao chép dữ liệu và khóa chặt hệ sinh thái', en: 'Central failure point, data replication, and ecosystem lock-in' },
          ],
          [
            { vi: 'Verifiable Credential', en: 'Verifiable Credential' },
            { vi: 'Có; dữ liệu và proof có cấu trúc', en: 'Yes; structured claims and proofs' },
            { vi: 'Cần governance, trust framework và vận hành trạng thái lâu dài', en: 'Requires governance, a trust framework, and long-term status operations' },
          ],
        ],
      },
      sources: ['vc-data-model', 'vc-data-integrity', 'open-badges-3'],
    },
    {
      id: 'education-centralized-risk',
      title: {
        vi: '2. Cổng xác minh tập trung giải quyết tốc độ nhưng tạo ra rủi ro mới',
        en: '2. Central verification portals improve speed but create new risks',
      },
      paragraphs: [
        {
          vi: 'Một cổng tập trung thường lưu hồ sơ học tập hoặc cung cấp API để nhà tuyển dụng tra cứu. Nó có thể giảm email thủ công, nhưng đồng thời trở thành một kho dữ liệu hấp dẫn: danh tính, lịch sử học tập, điểm số, thời gian theo học và lịch sử truy vấn. Nếu tài khoản quản trị bị chiếm, API bị khai thác hoặc nhà cung cấp gặp sự cố, ảnh hưởng không còn giới hạn ở một tệp bằng cấp mà lan tới toàn bộ tập dữ liệu. Portal ngừng hoạt động cũng có thể khiến những văn bằng hoàn toàn hợp lệ tạm thời không xác minh được.',
          en: 'A central portal typically stores academic records or exposes an employer lookup API. It can reduce manual email, but it also becomes an attractive data store containing identities, academic history, grades, attendance periods, and query history. A compromised administrator, exploited API, or provider incident can affect the whole dataset rather than one diploma file. An outage may also make legitimate qualifications temporarily unverifiable.',
        },
        {
          vi: 'Rủi ro ít được chú ý hơn là thu thập quá mức. Để kiểm tra ứng viên có bằng cử nhân ngành Công nghệ thông tin hay không, nhà tuyển dụng có thể yêu cầu nguyên bảng điểm gồm mọi học phần, điểm số và mã sinh viên. Dữ liệu đó nhiều hơn điều kiện cần cho quyết định tuyển dụng, làm tăng trách nhiệm bảo vệ dữ liệu của verifier và tác động nếu dữ liệu bị lộ. Một hệ thống tốt cần giúp verifier mô tả đúng câu hỏi nghiệp vụ, ví dụ “có bằng cử nhân thuộc nhóm ngành CNTT, cấp bởi issuer được chấp nhận, chưa bị thu hồi”, thay vì mặc định nhận toàn bộ hồ sơ.',
          en: 'A less visible risk is over-collection. To determine whether an applicant holds an IT bachelor’s degree, an employer may request a complete transcript containing every course, grade, and student number. That exceeds the decision requirement, increases the verifier’s data-protection duties, and magnifies breach impact. A better system lets the verifier express the actual business question, such as “holds an unrevoked IT-related bachelor’s degree from an accepted issuer,” rather than defaulting to the full record.',
        },
        {
          vi: 'SSI không bắt buộc trường bỏ hệ thống quản lý sinh viên tập trung. Hệ thống đó vẫn là nguồn sự thật để trường quyết định tốt nghiệp. Điểm khác biệt là kết quả đã được phê duyệt được phát hành thành VC cho người học; verifier kiểm tra proof và trạng thái thay vì yêu cầu sao chép toàn bộ hồ sơ học tập sang một portal trung gian.',
          en: 'SSI does not require a university to abandon its centralized student information system. That system remains the authoritative source for graduation decisions. The difference is that an approved outcome is issued as a VC to the learner; a verifier checks its proof and status instead of requiring the entire academic record to be copied into an intermediary portal.',
        },
      ],
      bullets: [
        { vi: 'Giảm bản sao dữ liệu: credential nằm trong ví của người học; verifier chỉ giữ dữ liệu cần cho quyết định và audit.', en: 'Reduce data copies: the credential lives in the learner’s wallet; the verifier retains only what is needed for the decision and audit.' },
        { vi: 'Giảm phụ thuộc thời gian thực vào trường: verifier có thể kiểm tra chữ ký ngoại tuyến sau khi đã có DID Document phù hợp, rồi kiểm tra trạng thái theo policy.', en: 'Reduce real-time dependence on the university: the verifier can validate proofs after obtaining the appropriate DID Document, then check status according to policy.' },
        { vi: 'Giảm phạm vi sự cố: một wallet bị mất không đồng nghĩa toàn bộ hồ sơ sinh viên của trường bị lộ.', en: 'Reduce incident scope: losing one wallet does not expose the university’s complete student population.' },
      ],
      sources: ['vc-data-model', 'vc-di-bbs'],
    },
    {
      id: 'education-how-ssi-solves',
      title: {
        vi: '3. SSI giải quyết từng vấn đề như thế nào?',
        en: '3. How does SSI address each problem?',
      },
      paragraphs: [
        {
          vi: 'Trường tạo cặp khóa ký và công bố khóa công khai trong DID Document trên CertNet. Khi phát hành bằng, trường ký VC bằng khóa bí mật tương ứng. Bất kỳ thay đổi nào đối với issuer, subject, loại bằng, ngành học hoặc ngày tốt nghiệp đều làm proof không còn hợp lệ. Verifier lấy issuer DID trong VC, resolve DID Document trên CertNet, chọn đúng verification method và kiểm tra chữ ký. Đây là cơ chế phát hiện giả mạo và chỉnh sửa, không phải so sánh ảnh hoặc tin vào giao diện.',
          en: 'The university creates a signing key pair and publishes the public key in a DID Document on CertNet. When issuing a degree, it signs the VC with the corresponding private key. Any change to the issuer, subject, degree type, major, or graduation date invalidates the proof. The verifier reads the issuer DID from the VC, resolves its DID Document on CertNet, selects the correct verification method, and validates the signature. This detects forgery and alteration without image comparison or trust in a user interface.',
        },
        {
          vi: 'Người học nhận VC qua kết nối DIDComm và lưu trong secure vault trên điện thoại. Khi nhà tuyển dụng tạo yêu cầu chia sẻ, ví hiển thị danh tính verifier, mục đích và từng trường dữ liệu được yêu cầu. Sau khi người dùng đồng ý, ví tạo Verifiable Presentation gắn với challenge của phiên xác minh rồi gửi qua kết nối DIDComm vừa thiết lập. Challenge và domain binding giúp verifier phát hiện VP cũ bị phát lại cho phiên mới.',
          en: 'The learner receives the VC over DIDComm and stores it in a phone secure vault. When an employer requests disclosure, the wallet displays the verifier identity, purpose, and each requested field. After consent, it creates a Verifiable Presentation bound to the verification challenge and sends it over the newly established DIDComm connection. Challenge and domain binding help the verifier reject presentations replayed into another session.',
        },
        {
          vi: 'Cơ chế status cho phép trường đánh dấu credential bị thu hồi hoặc thay thế mà không cần đưa nội dung bằng lên CertNet. Nếu dùng cryptosuite hỗ trợ selective disclosure, holder có thể tạo proof chỉ tiết lộ các thuộc tính cần thiết. Tuy nhiên, selective disclosure không phải mặc định của mọi chữ ký VC; schema, cryptosuite và verifier policy phải được thiết kế từ đầu để hỗ trợ nó.',
          en: 'A status mechanism lets the university mark a credential revoked or replaced without publishing degree contents to CertNet. With a selective-disclosure cryptosuite, the holder can prove only the required claims. Selective disclosure is not automatic for every VC signature; schemas, cryptosuites, and verifier policies must be designed for it.',
        },
      ],
      table: {
        headers: [
          { vi: 'Vấn đề', en: 'Problem' },
          { vi: 'Cơ chế SSI', en: 'SSI mechanism' },
          { vi: 'Kết quả và giới hạn', en: 'Outcome and limit' },
        ],
        rows: [
          [
            { vi: 'Sửa điểm hoặc tên ngành trên bản sao', en: 'Altering grades or major on a copy' },
            { vi: 'Data Integrity proof của issuer', en: 'Issuer Data Integrity proof' },
            { vi: 'Phát hiện thay đổi; không chứng minh dữ liệu nguồn ban đầu đúng', en: 'Detects alteration; does not prove the original source record was correct' },
          ],
          [
            { vi: 'Giả danh một trường hợp pháp', en: 'Impersonating a legitimate university' },
            { vi: 'Issuer DID + trust registry / accreditation policy', en: 'Issuer DID + trust registry / accreditation policy' },
            { vi: 'Binding khóa với tổ chức được chấp nhận; governance vẫn bắt buộc', en: 'Binds keys to an accepted institution; governance remains essential' },
          ],
          [
            { vi: 'Xác minh thủ công chậm', en: 'Slow manual verification' },
            { vi: 'VC có cấu trúc + resolver + verifier policy', en: 'Structured VC + resolver + verifier policy' },
            { vi: 'Tự động hóa kiểm tra kỹ thuật; trường hợp ngoại lệ vẫn cần con người', en: 'Automates technical checks; exceptions still need human handling' },
          ],
          [
            { vi: 'Chia sẻ toàn bộ bảng điểm', en: 'Sharing a complete transcript' },
            { vi: 'Presentation request + selective disclosure', en: 'Presentation request + selective disclosure' },
            { vi: 'Giảm dữ liệu công bố nếu schema và cryptosuite hỗ trợ', en: 'Reduces disclosed data when schema and cryptosuite support it' },
          ],
        ],
      },
      sources: ['did-core', 'vc-data-model', 'vc-data-integrity', 'bitstring-status-list', 'vc-di-bbs'],
    },
    {
      id: 'education-lifecycle',
      title: {
        vi: '4. Sơ đồ cấp phát, nắm giữ và xác minh bằng cấp',
        en: '4. Degree issuance, holding, and verification lifecycle',
      },
      paragraphs: [
        {
          vi: 'Luồng dưới đây có ba chủ thể và hai kết nối độc lập. Kết nối thứ nhất nằm giữa trường và sinh viên, dùng để chuyển VC đã ký vào ví. Kết nối thứ hai nằm giữa sinh viên và nhà tuyển dụng, dùng để gửi yêu cầu chia sẻ, VP và biên nhận kết quả. Nhà tuyển dụng không dùng lại kết nối với trường và trường không biết sinh viên đã trình bằng cho nhà tuyển dụng nào.',
          en: 'The flow below has three actors and two independent connections. The first connects university and learner to deliver the signed VC into the wallet. The second connects learner and employer to carry the disclosure request, VP, and result receipt. The employer does not reuse the university connection, and the university does not learn which employer received the presentation.',
        },
        {
          vi: 'CertNet chỉ giữ dữ liệu phục vụ resolution và trạng thái: DID Document, khóa công khai, service endpoint phù hợp và status resource. Nội dung bằng, bảng điểm, VP và lịch sử chia sẻ không được ghi lên CertNet. Điều này quan trọng vì dữ liệu cá nhân được mã hóa nhưng lưu vĩnh viễn vẫn có thể tạo rủi ro về metadata, tương quan và lộ khóa trong tương lai.',
          en: 'CertNet stores only resolution and status material: DID Documents, public keys, appropriate service endpoints, and status resources. Degree contents, transcripts, VPs, and disclosure history are not written to CertNet. Even permanently stored encrypted personal data can create metadata, correlation, and future-key-exposure risks.',
        },
      ],
      diagram: {
        type: 'education-ssi-lifecycle',
        caption: {
          vi: 'Issuer ký và chuyển VC cho Holder; Holder chủ động tạo VP cho từng yêu cầu; Verifier resolve DID và kiểm tra trạng thái trên CertNet trước khi trả kết quả.',
          en: 'The Issuer signs and delivers a VC to the Holder; the Holder creates a VP for each request; the Verifier resolves DIDs and checks status on CertNet before returning a result.',
        },
      },
      sources: ['did-core', 'didcomm-v2', 'vc-data-model', 'bitstring-status-list'],
    },
    {
      id: 'education-credential-model',
      title: {
        vi: '5. Thiết kế dữ liệu bằng cấp trước khi viết code',
        en: '5. Design the degree data before writing code',
      },
      paragraphs: [
        {
          vi: 'Một credential không nên là bản sao tùy ý của toàn bộ bảng điểm. Trước tiên cần xác định quyết định nào verifier thường đưa ra, trường dữ liệu nào có ngữ nghĩa ổn định và thuộc tính nào thật sự cần công bố. Ví dụ, bằng tốt nghiệp có thể chứa loại văn bằng, ngành, ngày tốt nghiệp, mã chương trình và trạng thái xếp loại; bảng điểm nên là credential riêng vì có độ nhạy và vòng đời khác.',
          en: 'A credential should not be an arbitrary copy of the full transcript. First identify the decisions verifiers commonly make, fields with stable semantics, and claims that genuinely need disclosure. A degree credential might contain award type, major, graduation date, program code, and classification; a transcript should be a separate credential because it has different sensitivity and lifecycle.',
        },
        {
          vi: 'Mỗi phiên bản schema cần quy định required fields, kiểu dữ liệu, vocabulary, quy tắc phiên bản và mapping xuyên hệ thống. Verifier phải kiểm tra schema mà họ hiểu, không chấp nhận một credential chỉ vì chữ ký đúng. Trường cũng cần chính sách sửa sai: lỗi tên, thay đổi tên pháp lý, hủy kết quả, lộ khóa ký và chuyển schema không phải cùng một loại sự kiện.',
          en: 'Each schema version needs required fields, data types, vocabulary, version rules, and cross-system mappings. A verifier must validate a schema it understands rather than accept a credential merely because the signature is valid. Universities also need correction policies: name errors, legal-name changes, award rescission, signing-key compromise, and schema migration are different events.',
        },
      ],
      code: {
        language: 'typescript',
        source: {
          vi: `// Chạy trên server của trường: dữ liệu đầu vào đã được phòng đào tạo phê duyệt.
const approvedDegreeRecord = {
  recordId: 'degree-2026-000184',
  studentDid: 'did:identra:holder:7f3a',
  credentialType: 'UniversityDegreeCredential',
  schema: 'https://schemas.identra.dev/education/degree/v1',
  claims: {
    degreeLevel: 'bachelor',
    fieldOfStudy: 'information-technology',
    programCode: 'IT-2022',
    graduationDate: '2026-06-15',
    classification: 'distinction'
  }
};

// Không đưa email, số điện thoại hoặc toàn bộ bảng điểm vào credential này.
// Bảng điểm là một credential riêng và chỉ được chia sẻ khi nghiệp vụ yêu cầu.`,
          en: `// Runs on the university server: the registrar has already approved this source record.
const approvedDegreeRecord = {
  recordId: 'degree-2026-000184',
  studentDid: 'did:identra:holder:7f3a',
  credentialType: 'UniversityDegreeCredential',
  schema: 'https://schemas.identra.dev/education/degree/v1',
  claims: {
    degreeLevel: 'bachelor',
    fieldOfStudy: 'information-technology',
    programCode: 'IT-2022',
    graduationDate: '2026-06-15',
    classification: 'distinction'
  }
};

// Do not place email, phone number, or the full transcript in this credential.
// The transcript is a separate credential disclosed only when the use case requires it.`,
        },
        caption: {
          vi: 'Schema minh họa tách bằng tốt nghiệp khỏi bảng điểm để giảm dữ liệu mặc định được chia sẻ.',
          en: 'The illustrative schema separates the degree from the transcript to reduce default disclosure.',
        },
      },
      sources: ['vc-data-model', 'open-badges-3'],
    },
    {
      id: 'education-issuance-code',
      title: {
        vi: '6. Code minh họa: trường tạo DID, QR kết nối và phát hành bằng',
        en: '6. Illustrative code: university DID, connection QR, and degree issuance',
      },
      paragraphs: [
        {
          vi: 'Code phát hành phù hợp nhất với server của trường vì khóa ký cần được bảo vệ bằng HSM/KMS và quy trình phải tích hợp với hệ thống học vụ. Trường chỉ ký sau khi record tốt nghiệp đã được phê duyệt. QR không chứa bằng cấp; nó chỉ là invitation một lần để ví sinh viên thiết lập kết nối DIDComm.',
          en: 'Issuance code most naturally runs on the university server because signing keys require HSM/KMS protection and the workflow must integrate with the student information system. The university signs only after the graduation record is approved. The QR does not contain the degree; it is a one-time invitation for the learner wallet to establish DIDComm.',
        },
      ],
      codeBlocks: [
        {
          title: { vi: 'Server Node.js/TypeScript: khởi tạo issuer và công bố DID Document', en: 'Node.js/TypeScript server: initialize issuer and publish its DID Document' },
          language: 'typescript',
          source: {
            vi: `import { Identra } from '@identra/node';

// SDK minh họa. Trong production, cấu hình endpoint và khóa bằng secret manager.
const identra = new Identra({
  environment: 'sandbox',
  certNetUrl: 'https://sandbox.certnet.identra.dev',
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});

// keyProtection: hsm khiến ứng dụng chỉ nhận key handle, không nhận private key dạng rõ.
const issuer = await identra.issuer.create({
  organizationId: 'university-a',
  keyProtection: 'hsm',
  didcommEndpoint: 'https://issuer.university-a.edu/didcomm'
});

// CertNet lưu DID Document chứa khóa công khai và trả DID chuẩn của trường.
const issuerDid = await issuer.publishDidDocument();`,
            en: `import { Identra } from '@identra/node';

// Illustrative SDK. In production, configure endpoints and keys through a secret manager.
const identra = new Identra({
  environment: 'sandbox',
  certNetUrl: 'https://sandbox.certnet.identra.dev',
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});

// keyProtection: hsm gives the application a key handle, never a clear private key.
const issuer = await identra.issuer.create({
  organizationId: 'university-a',
  keyProtection: 'hsm',
  didcommEndpoint: 'https://issuer.university-a.edu/didcomm'
});

// CertNet stores the DID Document with public keys and returns the canonical university DID.
const issuerDid = await issuer.publishDidDocument();`,
          },
          caption: {
            vi: 'Khóa bí mật nằm trong HSM; CertNet chỉ nhận DID Document và khóa công khai.',
            en: 'The private key remains in the HSM; CertNet receives only the DID Document and public keys.',
          },
        },
        {
          title: { vi: 'Server Node.js/TypeScript: tạo invitation và gửi VC qua DIDComm', en: 'Node.js/TypeScript server: create an invitation and deliver the VC over DIDComm' },
          language: 'typescript',
          source: {
            vi: `// Invitation hết hạn và chỉ dùng cho đúng phiên cấp phát này.
const invitation = await issuer.didcomm.createInvitation({
  goal: 'issue-university-degree',
  expiresIn: '10m',
  singleUse: true
});
const issuanceQr = await issuer.createQr(invitation);

// Sau khi sinh viên quét QR, server chờ kết nối DIDComm được xác thực.
const connection = await issuer.didcomm.waitForConnection(invitation.id);

// Chỉ đọc record đã được phòng đào tạo phê duyệt; dùng recordId làm idempotency key.
const degree = await issuer.issue({
  subjectDid: connection.peerDid,
  type: 'UniversityDegreeCredential',
  schema: 'https://schemas.identra.dev/education/degree/v1',
  claims: approvedDegreeRecord.claims,
  credentialStatus: { purpose: 'revocation' },
  idempotencyKey: approvedDegreeRecord.recordId
});

// VC đã ký được mã hóa và gửi trên kết nối vừa thiết lập.
await issuer.didcomm.sendCredentialOffer({
  connectionId: connection.id,
  credential: degree
});`,
            en: `// The invitation expires and is valid only for this issuance session.
const invitation = await issuer.didcomm.createInvitation({
  goal: 'issue-university-degree',
  expiresIn: '10m',
  singleUse: true
});
const issuanceQr = await issuer.createQr(invitation);

// After the learner scans the QR, the server waits for an authenticated DIDComm connection.
const connection = await issuer.didcomm.waitForConnection(invitation.id);

// Read only the registrar-approved record; use recordId as an idempotency key.
const degree = await issuer.issue({
  subjectDid: connection.peerDid,
  type: 'UniversityDegreeCredential',
  schema: 'https://schemas.identra.dev/education/degree/v1',
  claims: approvedDegreeRecord.claims,
  credentialStatus: { purpose: 'revocation' },
  idempotencyKey: approvedDegreeRecord.recordId
});

// The signed VC is encrypted and sent over the newly established connection.
await issuer.didcomm.sendCredentialOffer({
  connectionId: connection.id,
  credential: degree
});`,
          },
          caption: {
            vi: 'Invitation chỉ bootstrap kết nối; bằng cấp chỉ được gửi sau khi DIDComm handshake hoàn tất.',
            en: 'The invitation only bootstraps a connection; the degree is sent after the DIDComm handshake completes.',
          },
        },
      ],
      sources: ['did-core', 'vc-data-integrity', 'didcomm-v2'],
    },
    {
      id: 'education-holder-code',
      title: {
        vi: '7. Code minh họa: sinh viên nhận bằng và chỉ chia sẻ sau khi đồng ý',
        en: '7. Illustrative code: learner receives the degree and shares only after consent',
      },
      paragraphs: [
        {
          vi: 'Theo mô hình Identra, luồng nắm giữ chỉ tồn tại trên mobile. Ví tạo khóa trên thiết bị, bảo vệ khóa mã hóa vault bằng Secure Enclave hoặc Android Keystore và không cho export credential lên web hoặc thiết bị thứ hai. Khi đổi thiết bị, credential cũ bị xóa và người học thực hiện quy trình cấp lại với trường.',
          en: 'In the Identra model, holding exists only on mobile. The wallet creates device keys, protects the vault-encryption key with Secure Enclave or Android Keystore, and does not export credentials to the web or a second device. When replacing a phone, old credentials are deleted and the learner follows the university reissuance process.',
        },
      ],
      codeBlocks: [
        {
          title: { vi: 'React Native: kích hoạt ví, quét QR của trường và lưu VC', en: 'React Native: activate the wallet, scan the university QR, and store the VC' },
          language: 'typescript',
          source: {
            vi: `import { IdentraMobile } from '@identra/react-native';

const identra = new IdentraMobile({ environment: 'sandbox' });

// Chỉ mobile mới có Holder SDK. Vault không cho export và yêu cầu sinh trắc học.
const wallet = await identra.holder.activateSingleDeviceVault({
  migrationPolicy: 'wipe-old-device',
  exportCredentials: false,
  requireBiometric: true
});

// QR chỉ chứa invitation. Ví resolve issuer DID trước khi hiển thị tên trường.
const issuerConnection = await wallet.scanConnectionQr(scannedIssuerQr);
await wallet.confirmConnection(issuerConnection.id);

// Trước khi lưu, SDK kiểm tra proof, issuer DID, schema và credential status.
wallet.didcomm.onCredential(async (credential) => {
  const result = await wallet.verify(credential);
  if (!result.verified) throw new Error(result.reason);
  await wallet.store(credential);
});`,
            en: `import { IdentraMobile } from '@identra/react-native';

const identra = new IdentraMobile({ environment: 'sandbox' });

// Only mobile has the Holder SDK. The vault disables export and requires biometrics.
const wallet = await identra.holder.activateSingleDeviceVault({
  migrationPolicy: 'wipe-old-device',
  exportCredentials: false,
  requireBiometric: true
});

// The QR contains only an invitation. The wallet resolves the issuer DID before displaying it.
const issuerConnection = await wallet.scanConnectionQr(scannedIssuerQr);
await wallet.confirmConnection(issuerConnection.id);

// Before storage, the SDK validates proof, issuer DID, schema, and credential status.
wallet.didcomm.onCredential(async (credential) => {
  const result = await wallet.verify(credential);
  if (!result.verified) throw new Error(result.reason);
  await wallet.store(credential);
});`,
          },
          caption: {
            vi: 'Ví không tin QR hoặc VC chỉ vì nhận được từ một kết nối; nó vẫn xác minh độc lập trước khi lưu.',
            en: 'The wallet does not trust a QR or VC merely because it arrived over a connection; it independently verifies before storage.',
          },
        },
        {
          title: { vi: 'React Native: xem yêu cầu, đồng ý và gửi VP', en: 'React Native: review the request, consent, and send a VP' },
          language: 'typescript',
          source: {
            vi: `// Tạo kết nối riêng với nhà tuyển dụng từ QR xác minh.
const verifierConnection = await wallet.scanPresentationQr(scannedVerifierQr);
await wallet.confirmConnection(verifierConnection.id);

// Verifier gửi yêu cầu sau khi kết nối; ví hiển thị mục đích và từng claim.
const request = await wallet.didcomm.waitForPresentationRequest(
  verifierConnection.id
);
const consent = await wallet.requestUserConsent(request);
if (!consent.approved) return;

// VP gắn với challenge/domain của request để chống phát lại.
const presentation = await wallet.createPresentation({ request, consent });
await wallet.didcomm.sendPresentation({
  connectionId: verifierConnection.id,
  presentation
});

// Holder nhận lại kết quả xác minh trên chính kết nối này.
const receipt = await wallet.didcomm.waitForVerificationReceipt(request.id);`,
            en: `// Create a separate employer connection from the verification QR.
const verifierConnection = await wallet.scanPresentationQr(scannedVerifierQr);
await wallet.confirmConnection(verifierConnection.id);

// The verifier sends its request after connection; the wallet shows purpose and each claim.
const request = await wallet.didcomm.waitForPresentationRequest(
  verifierConnection.id
);
const consent = await wallet.requestUserConsent(request);
if (!consent.approved) return;

// The VP binds to the request challenge/domain to prevent replay.
const presentation = await wallet.createPresentation({ request, consent });
await wallet.didcomm.sendPresentation({
  connectionId: verifierConnection.id,
  presentation
});

// The Holder receives a verification result over the same connection.
const receipt = await wallet.didcomm.waitForVerificationReceipt(request.id);`,
          },
          caption: {
            vi: 'Kết nối issuer và verifier tách biệt; holder quyết định chia sẻ cho từng request.',
            en: 'Issuer and verifier connections remain separate; the holder decides for each request.',
          },
        },
      ],
      sources: ['didcomm-v2', 'vc-data-model', 'vc-di-bbs'],
    },
    {
      id: 'education-verifier-code',
      title: {
        vi: '8. Code minh họa: nhà tuyển dụng yêu cầu tối thiểu và xác minh VP',
        en: '8. Illustrative code: employer requests the minimum and verifies the VP',
      },
      paragraphs: [
        {
          vi: 'Verifier cần tách kết quả kỹ thuật khỏi quyết định tuyển dụng. `verified: true` nên có nghĩa proof, challenge, schema, issuer trust và status đều đạt policy đã công bố. Việc ứng viên có phù hợp công việc hay không là nghiệp vụ riêng và chỉ chạy sau đó. Nếu xác minh thất bại, verifier trả một mã lý do có thể hành động cho holder, thay vì chỉ ghi “không hợp lệ”.',
          en: 'The verifier should separate technical verification from the hiring decision. `verified: true` should mean that proof, challenge, schema, issuer trust, and status satisfy the published policy. Whether the applicant suits the job is a separate business process that runs afterward. On failure, the verifier returns an actionable reason code to the holder rather than only “invalid.”',
        },
      ],
      codeBlocks: [
        {
          title: { vi: 'Server Node.js/TypeScript: tạo QR và yêu cầu đúng dữ liệu cần thiết', en: 'Node.js/TypeScript server: create a QR and request only required data' },
          language: 'typescript',
          source: {
            vi: `import { Identra } from '@identra/node';

const identra = new Identra({ environment: 'sandbox' });
const verifier = await identra.verifier.create({
  organizationId: 'employer-example',
  keyProtection: 'hsm'
});
await verifier.publishDidDocument();

// Yêu cầu bằng cử nhân ngành CNTT; không yêu cầu bảng điểm hay mã sinh viên.
const request = await verifier.createPresentationRequest({
  credentialType: 'UniversityDegreeCredential',
  acceptedIssuers: ['did:identra:university-a'],
  fields: ['degreeLevel', 'fieldOfStudy', 'graduationDate'],
  constraints: {
    degreeLevel: { equals: 'bachelor' },
    fieldOfStudy: { equals: 'information-technology' }
  },
  purpose: 'Kiểm tra điều kiện bằng cấp cho vị trí kỹ sư phần mềm',
  challenge: crypto.randomUUID(),
  expiresIn: '5m'
});

const verificationQr = await verifier.createQr(request);`,
            en: `import { Identra } from '@identra/node';

const identra = new Identra({ environment: 'sandbox' });
const verifier = await identra.verifier.create({
  organizationId: 'employer-example',
  keyProtection: 'hsm'
});
await verifier.publishDidDocument();

// Request an IT bachelor’s degree, not the transcript or student number.
const request = await verifier.createPresentationRequest({
  credentialType: 'UniversityDegreeCredential',
  acceptedIssuers: ['did:identra:university-a'],
  fields: ['degreeLevel', 'fieldOfStudy', 'graduationDate'],
  constraints: {
    degreeLevel: { equals: 'bachelor' },
    fieldOfStudy: { equals: 'information-technology' }
  },
  purpose: 'Check the degree requirement for a software engineering role',
  challenge: crypto.randomUUID(),
  expiresIn: '5m'
});

const verificationQr = await verifier.createQr(request);`,
          },
          caption: {
            vi: 'Presentation request là hợp đồng dữ liệu: nêu rõ mục đích, trường cần thiết, điều kiện và thời hạn.',
            en: 'The presentation request is a data contract defining purpose, required fields, constraints, and expiry.',
          },
        },
        {
          title: { vi: 'Server Node.js/TypeScript: resolve DID, kiểm tra proof/status và gửi biên nhận', en: 'Node.js/TypeScript server: resolve DIDs, verify proof/status, and send a receipt' },
          language: 'typescript',
          source: {
            vi: `const presentation = await verifier.didcomm.waitForPresentation(request.id);

// SDK lấy issuer DID trong VC và holder DID trong VP rồi resolve trên CertNet.
const result = await verifier.verify({
  presentation,
  request,
  resolveDid: (did) => identra.certNet.resolveDidDocument(did),
  checkCredentialStatus: true,
  checkChallenge: true,
  checkSchema: true,
  checkIssuerTrust: true
});

// Luôn trả kết quả kỹ thuật cho Holder trước khi chạy nghiệp vụ tuyển dụng.
await verifier.didcomm.sendVerificationReceipt({
  connectionId: presentation.connectionId,
  requestId: request.id,
  verified: result.verified,
  reasonCodes: result.reasonCodes
});

if (result.verified) {
  await hiringWorkflow.evaluateDegreeRequirement(result.disclosedClaims);
}`,
            en: `const presentation = await verifier.didcomm.waitForPresentation(request.id);

// The SDK extracts issuer DIDs from VCs and the holder DID from the VP, then resolves CertNet.
const result = await verifier.verify({
  presentation,
  request,
  resolveDid: (did) => identra.certNet.resolveDidDocument(did),
  checkCredentialStatus: true,
  checkChallenge: true,
  checkSchema: true,
  checkIssuerTrust: true
});

// Always return the technical result to the Holder before running hiring logic.
await verifier.didcomm.sendVerificationReceipt({
  connectionId: presentation.connectionId,
  requestId: request.id,
  verified: result.verified,
  reasonCodes: result.reasonCodes
});

if (result.verified) {
  await hiringWorkflow.evaluateDegreeRequirement(result.disclosedClaims);
}`,
          },
          caption: {
            vi: 'Một verifier đúng không chỉ kiểm tra chữ ký: nó kiểm tra challenge, schema, status và quyền phát hành của issuer.',
            en: 'A correct verifier checks more than signatures: challenge, schema, status, and issuer authorization also matter.',
          },
        },
      ],
      sources: ['did-core', 'vc-data-integrity', 'bitstring-status-list', 'didcomm-v2'],
    },
    {
      id: 'education-effectiveness-limits',
      title: {
        vi: '9. Hiệu quả cần đo bằng gì và SSI không giải quyết được điều gì?',
        en: '9. What should be measured, and what does SSI not solve?',
      },
      paragraphs: [
        {
          vi: 'Không nên đánh giá dự án bằng số QR đã tạo hoặc số VC đã phát hành. Một hệ thống có hàng triệu credential nhưng nhà tuyển dụng vẫn yêu cầu ảnh scan và gọi điện cho trường chưa tạo ra giá trị. Chỉ số có ý nghĩa hơn là thời gian xác minh trung vị, tỷ lệ yêu cầu cần xử lý thủ công, lượng dữ liệu trung bình được công bố, tỷ lệ phát hiện replay, tỷ lệ cấp lại thành công và thời gian phục hồi khi status service hoặc resolver gặp sự cố.',
          en: 'A project should not be judged by QR codes created or VCs issued. A system with millions of credentials creates little value if employers still request scans and call universities. Better metrics include median verification time, percentage of requests requiring manual handling, average disclosure volume, replay-detection rate, successful reissuance, and recovery time after status-service or resolver incidents.',
        },
        {
          vi: 'SSI bảo vệ tính toàn vẹn sau khi phát hành, nhưng không sửa được dữ liệu học vụ sai trước khi ký. Nó cũng không tự xác định một trường có được kiểm định, một chương trình có tương đương ở quốc gia khác hay một học phần có đáp ứng yêu cầu nghề nghiệp hay không. Những quyết định đó cần governance, vocabulary, accreditation evidence và chính sách nghiệp vụ. Cuối cùng, chính sách một kho duy nhất bảo vệ credential tốt hơn nhưng đặt trách nhiệm cấp lại dài hạn lên trường khi người học mất hoặc đổi điện thoại.',
          en: 'SSI protects integrity after issuance but cannot correct a bad academic source record before signing. Nor does it determine whether a university is accredited, a program is equivalent across countries, or a course satisfies a professional requirement. Those decisions require governance, vocabularies, accreditation evidence, and business policy. Finally, a single-vault policy protects credentials but creates a long-term reissuance duty when learners lose or replace phones.',
        },
      ],
      table: {
        headers: [
          { vi: 'Mục tiêu', en: 'Goal' },
          { vi: 'Chỉ số vận hành', en: 'Operational metric' },
          { vi: 'Rủi ro còn lại', en: 'Residual risk' },
        ],
        rows: [
          [
            { vi: 'Giảm gian lận sửa văn bằng', en: 'Reduce altered-document fraud' },
            { vi: 'Tỷ lệ proof sai, schema sai và status bị thu hồi được phát hiện', en: 'Detected invalid proofs, schemas, and revoked statuses' },
            { vi: 'Issuer giả hoặc issuer hợp pháp nhập dữ liệu sai', en: 'Fraudulent issuer or bad data entered by a legitimate issuer' },
          ],
          [
            { vi: 'Rút ngắn xác minh', en: 'Shorten verification' },
            { vi: 'Thời gian từ quét QR đến receipt; tỷ lệ ngoại lệ thủ công', en: 'Time from QR scan to receipt; manual-exception rate' },
            { vi: 'Resolver/status outage, schema lạ, tranh chấp danh tính', en: 'Resolver/status outage, unknown schema, identity dispute' },
          ],
          [
            { vi: 'Tối thiểu hóa dữ liệu', en: 'Minimize data disclosure' },
            { vi: 'Số claim trung bình và tỷ lệ request bị ví cảnh báo', en: 'Average disclosed claims and wallet-warning rate' },
            { vi: 'Verifier yêu cầu quá mức hoặc kết hợp dữ liệu ngoài hệ thống', en: 'Verifier over-requesting or combining external data' },
          ],
          [
            { vi: 'Duy trì giá trị lâu dài', en: 'Preserve long-term value' },
            { vi: 'Tỷ lệ cấp lại; khả năng xác minh credential cũ sau key rotation', en: 'Reissuance success; old-credential verification after key rotation' },
            { vi: 'Issuer ngừng hoạt động hoặc mất lịch sử khóa', en: 'Issuer closure or loss of key history' },
          ],
        ],
      },
      sources: ['vc-data-model', 'did-core', 'bitstring-status-list', 'open-badges-3'],
    },
    {
      id: 'education-conclusion',
      title: {
        vi: '10. Kết luận',
        en: '10. Conclusion',
      },
      paragraphs: [
        {
          vi: 'SSI có giá trị trong giáo dục khi được dùng để thay đổi cách bằng cấp được chứng minh, không chỉ thay ảnh scan bằng một QR. Trường ký dữ liệu đã được phê duyệt bằng khóa có thể resolve; sinh viên giữ credential trong ví riêng và chủ động chia sẻ; nhà tuyển dụng kiểm tra proof, challenge, schema, status và quyền của issuer bằng máy. Kiến trúc này làm cho việc sửa một bản sao trở nên vô nghĩa, giảm xác minh thủ công và cho phép yêu cầu ít dữ liệu hơn.',
          en: 'SSI creates value in education when it changes how qualifications are proven rather than replacing a scan with a QR. Universities sign approved data with resolvable keys; learners hold credentials in private wallets and disclose deliberately; employers machine-check proofs, challenges, schemas, status, and issuer authorization. This makes copy alteration ineffective, reduces manual verification, and enables smaller data requests.',
        },
        {
          vi: 'Nhưng mật mã chỉ bảo vệ những tuyên bố đã được ký. Một hệ sinh thái đáng tin còn cần kiểm định issuer, quản trị schema, quy trình sửa sai và cấp lại, vận hành CertNet/status bền vững, thiết kế consent dễ hiểu và chính sách verifier không thu thập quá mức. Nếu bỏ qua các phần đó, hệ thống có thể xác minh rất nhanh một tuyên bố được ký đúng nhưng không đáng tin hoặc không cần thiết.',
          en: 'Cryptography protects signed statements, but a trustworthy ecosystem also needs issuer accreditation, schema governance, correction and reissuance procedures, durable CertNet/status operations, understandable consent, and verifier policies against over-collection. Without these, the system may rapidly verify a correctly signed statement that is untrustworthy or unnecessary.',
        },
      ],
      sources: ['vc-data-model', 'did-core', 'open-badges-3'],
    },
  ],
  references: [
    {
      id: 'vc-data-model',
      title: { vi: 'Verifiable Credentials Data Model v2.0', en: 'Verifiable Credentials Data Model v2.0' },
      publisher: 'W3C',
      url: 'https://www.w3.org/TR/vc-data-model-2.0/',
      year: '2025',
    },
    {
      id: 'vc-data-integrity',
      title: { vi: 'Verifiable Credential Data Integrity 1.0', en: 'Verifiable Credential Data Integrity 1.0' },
      publisher: 'W3C',
      url: 'https://www.w3.org/TR/vc-data-integrity/',
      year: '2025',
    },
    {
      id: 'did-core',
      title: { vi: 'Decentralized Identifiers (DIDs) v1.0', en: 'Decentralized Identifiers (DIDs) v1.0' },
      publisher: 'W3C',
      url: 'https://www.w3.org/TR/did-core/',
      year: '2022',
    },
    {
      id: 'bitstring-status-list',
      title: { vi: 'Bitstring Status List v1.0', en: 'Bitstring Status List v1.0' },
      publisher: 'W3C',
      url: 'https://www.w3.org/TR/vc-bitstring-status-list/',
      year: '2025',
    },
    {
      id: 'vc-di-bbs',
      title: { vi: 'Data Integrity BBS Cryptosuites v1.0', en: 'Data Integrity BBS Cryptosuites v1.0' },
      publisher: 'W3C',
      url: 'https://www.w3.org/TR/vc-di-bbs/',
      year: '2025',
    },
    {
      id: 'didcomm-v2',
      title: { vi: 'DIDComm Messaging Specification v2', en: 'DIDComm Messaging Specification v2' },
      publisher: 'Decentralized Identity Foundation',
      url: 'https://identity.foundation/didcomm-messaging/spec/',
      year: 'Editor draft',
    },
    {
      id: 'open-badges-3',
      title: { vi: 'Open Badges Specification v3.0', en: 'Open Badges Specification v3.0' },
      publisher: '1EdTech Consortium',
      url: 'https://www.imsglobal.org/spec/ob/v3p0/',
      year: '2024',
    },
  ],
};
