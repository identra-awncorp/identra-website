/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PRIVACY_PAGE_TRANSLATIONS: any = {
  en: {
    heroBadge: 'Trust & Transparency',
    identraInitial: 'P',
    heroTitleLine1: 'Your identity matters.',
    heroTitleLine2: 'So does your privacy.',
    heroDesc: 'Identity verification requires sharing personal information. You should be able to see and understand how that information is handled.',
    heroSubdesc: 'When you verify with Identra, your data is used for a specific purpose, protected by security practices, and kept within defined limits.',
    manageData: 'Manage your data',
    verifyTitle: 'How we verify identity',
    idvQuestion: 'Why does identity verification (IDV) exist?',
    idvIntro: 'Many online services verify identity to:',
    idvBullets: ['Prevent fraud and imidentration', 'Comply with financial, safety, or age-related regulations', 'Protect users and platform integrity'],
    roleQuestion: "What is Identra's role when an organization asks me to verify my identity?",
    roleP1: "Identra primarily acts as a data processor. This means we process information on behalf of the organization you're interacting with, and only to provide identity verification and related services they've requested.",
    roleP2: 'In limited circumstances such as Identra Wallet, Identra may act as a data controller. This means we decide how your information is handled, in accordance with applicable data protection laws.',
    collectQuestion: 'What personal information might Identra collect?',
    collectIntro: "We collect only what's needed to provide the service requested. This may include:",
    collectBullets: ['Information you provide (e.g., name, contact details, government ID images)', 'Photos or video you upload (e.g., for facial recognition and liveness check)', 'Device or technical data (like IP address or browser signals)', 'Data from third-party sources if used in verification checks'],
    useQuestion: 'How does Identra use my data?',
    useAnswer: "We use your information only to complete the verification or fraud prevention checks requested by the organization you're interacting with. We do not use your personal information for marketing, and we don't sell to third parties.",
    howVerificationWorks: 'How verification works',
    collectionTitle: 'Collection',
    collectionDesc: 'You submit information during a secure verification flow. Depending on what the organization requires to meet compliance or trust and safety initiatives, this may include a government ID, selfie, business details, or something else.',
    securePortal: 'Secure Identity Portal',
    encrypted: 'Encrypted',
    scanGovId: 'Scan Government ID',
    scanGovIdHint: 'Place front of ID card within the camera boundary guidelines',
    securePipeline: 'Identra keeps transmission pipelines secure with ISO 27001-rated TLS encryptions.',
    processingTitle: 'Processing',
    processingDesc: "Identra uses secure, automated systems and predefined rules to verify your information. Depending on the organization's requirements, this may include checking it against fraud signals and trusted sources, such as public records.",
    processingPipeline: 'ID PROCESSING PIPELINE',
    analyzingDoc: 'Analyzing Document...',
    running: 'Running',
    docAuthenticityCheck: 'Document Authenticity Check',
    pass: 'PASS',
    crossMatch: 'Cross-match Name vs DB records',
    match: 'MATCH',
    biometricMatch: 'Biometric Selfie Match',
    matchPercent: '99.4% Match',
    aiAccuracyNote: 'Cross-referencing uses strict automated lookup routines. AI is used solely for accuracy, never for unrequested training.',
    outcomeTitle: 'Outcome',
    outcomeDesc1: 'We return an outcome to the company that asked you to complete verification, which may include a status (for example, "verified" or "not verified") and relevant signals or supporting information based on their configuration and use case.',
    outcomeDesc2: 'The company can access the information you submit along with your verification status and related information. However, in some flows, such as Relay, access to information is limited.',
    outcomeNote: 'Your information is not shared or repurposed beyond verification.',
    decisionDiscovery: 'DECISION DISCOVERY',
    applicant: 'Applicant',
    verified: 'Verified',
    companyPortal: 'Company Portal',
    decisionClear: 'Automated Decision Pipeline Clear',
    decisionClearDesc: 'Outcome safely transferred to customer platform. No data retains in public-facing cache nodes.',
    overviewTitle: 'Privacy overview',
    navItems: [
      { id: 'verify-identity', label: 'How we verify identity' },
      { id: 'privacy-by-default', label: 'Privacy by default' },
      { id: 'safeguard', label: 'How we safeguard your data' },
      { id: 'data-rights', label: 'Your data rights and control' }
    ],
    privacyNoticesTitle: 'Privacy Notices',
    privacyNoticesSubtitle: 'Documents & Guidelines',
    read: 'Read',
    privacyDefaultTitle: 'Privacy by default',
    privacyDefaultDesc: 'Privacy and data security are core to how we operate. We do not sell or share personal data processed for verification purposes and we do not use personal data outside the scope of what is listed in our privacy policy.',
    privacyQa: [
      { q: 'Does Identra sell or share my data?', a: 'No. Identra does not sell personal data or broker it to third parties. Privacy and data security are core to how we operate.' },
      { q: 'Is my data used to train AI models?', a: 'No. We do not use your personal data for any AI or model training.' },
      { q: 'Who has access to my data?', a: 'Access is limited to automated systems and authorized personnel under strict role-based controls. Human review only occurs when configured by the organization you are interacting with and is subject to audit and oversight.' },
      { q: 'How does Identra work with companies?', a: 'We work with organizations across industries that need secure identity verification and assurance. We do not disclose details of customer relationships, and we do not share user data beyond what is necessary for providing our services.' },
      { q: 'How much data do I have to provide?', a: 'We collect the minimum data needed and continuously evaluate the impact of our activities on data privacy to improve our practices.' },
      { q: 'How does Identra safeguard my data?', a: 'We use industry-standard safeguards including encryption, secure storage, and access controls to protect your information while we process it. These measures reflect our security-first design and compliance frameworks.' }
    ],
    safeguardBadge: 'Hardened Standards',
    safeguardTitle: 'How we safeguard your data',
    safeguardDesc: 'Beyond limiting how data is used, we apply layered safeguards to protect it while it is processed and stored.',
    safeguards: [
      { title: 'Encryption in transit and at rest', desc: 'Your information is encrypted while being transmitted and while stored, helping prevent unauthorized access.' },
      { title: 'Restricted system access', desc: 'We limit access to sensitive data through single sign-on, logged access, and role-based permissions, which we regularly review.' },
      { title: 'Monitored infrastructure', desc: 'We continuously monitor our systems for unusual activity and use alerts and response processes to act quickly.' },
      { title: 'Secure hosting environment', desc: 'Verification services run on secure cloud infrastructure designed with physical, network, and operational safeguards.' },
      { title: 'Ongoing security review', desc: 'We conduct regular internal reviews and external assessments to evaluate and improve our security controls over time.' },
      { title: 'Passkeys for Identra Wallet', desc: 'Information saved to a Identra Wallet is encrypted and protected by passkeys, a passwordless authentication method secured on your device by Face ID, ensuring only you can unlock it.' }
    ],
    industryStandards: 'INDUSTRY STANDARDS',
    securityCoreTitle: 'Security and privacy at our core',
    securityCoreDesc: "Security and privacy are paramount to a trusted relationship. That's why Identra is compliant and certified to the highest industry standards and committed to protecting your privacy.",
    certs: ['CCPA', 'GDPR', 'AICPA SOC 2 Type II', 'ISO 27001', 'HIPAA compliant', 'PCI DSS', 'FERPA', 'Kantara (NIST SP 800-63)', 'Age Check Certification Scheme', 'KJM approved'],
    userControlsBadge: 'User Controls',
    dataRightsTitle: 'Your data rights and control',
    dataRightsDesc: "How we process your data depends on whether we're acting as a processor or controller, the organization's configuration, and applicable laws.",
    rightsQuestion: 'What rights do I have over my information?',
    rightsIntro: 'You may have the right to:',
    rightsBullets: ['Access your personal information', 'Correct inaccurate or outdated information', 'Request deletion of your information', 'Receive a portable copy of your information'],
    manageQuestion: 'Where can I find and manage my data?',
    manageAnswer: 'Visit our consumer data portal to check records, request files, or coordinate structured GDPR/CCPA removals on your behalf.',
    submitDsr: 'Submit a Data Subject Request',
    retentionQuestion: 'How long is my data retained?',
    retentionAnswer: 'Retention periods vary by organization and applicable legal requirements. In some cases, it must be kept for a set period to meet fraud prevention, compliance, or financial regulatory obligations.',
    deleteQuestion: 'How do I delete my data?',
    deleteAnswer: "Submit a request through the Privacy Portal. We'll review your request, verify your identity, and check for matches. Then we'll either delete your data or route your request to the appropriate organization, depending on how your data was processed.",
    contactQuestion: 'Who can I contact with privacy questions?',
    contactAnswerPrefix: "For questions about Identra's privacy practices, or to submit custom CCPA inquiries directly to our security officer, use the Privacy Portal link below or email",
    closeDocument: 'Close Document',
    portalTitle: 'Consumer Privacy Portal',
    portalIntro: 'Use this secure portal to request a structural copy of your verification records or request deletion under GDPR/CCPA.',
    requestType: 'Request Type',
    requestOptions: ['Retrieve my verified data file (Access)', 'Erase my identity verification checks (Erasure/Delete)', 'Correct / Update personal records'],
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    emailAddress: 'Email Address',
    emailPlaceholder: 'john.doe@example.com',
    partnerOrg: 'Partner Organization name',
    partnerOrgPlaceholder: 'e.g., Robinhood, Cozy Rentals',
    submitPrivacyRequest: 'Submit Privacy Request',
    requestSubmitted: 'Request Submitted',
    requestSubmittedDesc: "Your request was securely queued in Identra's internal privacy verification pipeline. We will notify you at your provided email address within 3-5 business days.",
    returnToPage: 'Return to Page',
    notices: [
      {
        id: 'standard',
        title: 'Standard Privacy Policy',
        desc: 'For website visitors and business customers.',
        content: `### Identra Standard Privacy Policy

**Last Updated:** July 2026

This Privacy Policy describes how Identra Identities, Inc. ("Identra", "we", "us", or "our") collects, uses, and discloses personal information when you visit our website, attend our events, or interact with us as a business customer.

#### 1. Information We Collect
- **Contact Information**: Name, email address, phone number, company name.
- **Account Credentials**: Passwords, usernames, and multi-factor authentication tokens.
- **Usage Data**: IP address, browser type, operating system, and website interactions.

#### 2. How We Use Information
We use website and visitor data to maintain and improve our marketing websites, analyze user traffic, host corporate webinars, and provide security oversight on our corporate platforms.

#### 3. Cookies and Tracking
We employ cookies, pixels, and standard web analytics tools to customize your browsing experience and serve tailored newsletters/events.

#### 4. Sharing and Disclosure
We do not sell personal data. We only share website usage telemetry with authorized service providers who facilitate website analytics, hosting, and CRM outreach.`
      },
      {
        id: 'identity',
        title: 'Identity Verification Notice',
        desc: 'Applies where Identra provides certain services directly.',
        content: `### Identity Verification Notice

**Last Updated:** July 2026

This notice explains how Identra processes personal data on behalf of our business customers to verify your identity, perform fraud checks, and ensure platform safety.

#### 1. Identra as a Data Processor
In most verification transactions, the business you are interacting with is the **Data Controller** (decides why and how your data is collected), and Identra is the **Data Processor** (processes data only according to the customer's instructions).

#### 2. Information Collected during IDV
- **Government Identification**: Passports, driver's licenses, national ID card photos.
- **Biometric Identifiers**: Selfie photographs or video recordings used for facial recognition and liveness analysis.
- **Database Verification Records**: Public registries, credit bureau data, and political watchlist logs.

#### 3. Data Protection and Deletion
Identra deletes or anonymizes verification records in accordance with the retention periods configured by the business customer, or as mandated by regional compliance standards.`
      },
      {
        id: 'glba',
        title: 'GLBA Privacy Notice',
        desc: 'Applies where required under U.S. financial privacy law.',
        content: `### GLBA (Gramm-Leach-Bliley Act) Privacy Notice

**Last Updated:** July 2026

This financial privacy notice describes how Identra collects and safeguards Nonpublic Personal Information (NPI) when acting on behalf of financial institutions regulated under U.S. financial privacy frameworks.

#### 1. Scope of Financial Data
This notice applies exclusively to verification services conducted for regulated banks, money transmitters, insurance providers, and asset management platforms in the United States.

#### 2. Information Collected
- Social Security Numbers (SSN), individual taxpayer identification numbers (ITIN).
- Asset verification checks, credit history summaries, and transaction records.
- Anti-Money Laundering (AML) list match statuses.

#### 3. Security Standards
We enforce multi-layered administrative, technical, and physical safeguards designed to comply with FTC Safeguards Rules and GLBA data confidentiality metrics.`
      }
    ]
  },
  vi: {
    heroBadge: 'Niềm tin & minh bạch',
    identraInitial: 'P',
    heroTitleLine1: 'Danh tính của bạn rất quan trọng.',
    heroTitleLine2: 'Quyền riêng tư của bạn cũng vậy.',
    heroDesc: 'Xác minh danh tính yêu cầu chia sẻ thông tin cá nhân. Bạn cần có thể nhìn thấy và hiểu cách thông tin đó được xử lý.',
    heroSubdesc: 'Khi xác minh với Identra, dữ liệu của bạn được dùng cho mục đích cụ thể, được bảo vệ bằng các biện pháp bảo mật và được giữ trong giới hạn xác định.',
    manageData: 'Quản lý dữ liệu của bạn',
    verifyTitle: 'Cách chúng tôi xác minh danh tính',
    idvQuestion: 'Vì sao cần xác minh danh tính (IDV)?',
    idvIntro: 'Nhiều dịch vụ trực tuyến xác minh danh tính để:',
    idvBullets: ['Ngăn chặn gian lận và mạo danh', 'Tuân thủ quy định tài chính, an toàn hoặc liên quan đến độ tuổi', 'Bảo vệ người dùng và tính toàn vẹn của nền tảng'],
    roleQuestion: 'Identra có vai trò gì khi một tổ chức yêu cầu tôi xác minh danh tính?',
    roleP1: 'Identra chủ yếu đóng vai trò bên xử lý dữ liệu. Điều này nghĩa là chúng tôi xử lý thông tin thay mặt cho tổ chức mà bạn đang tương tác, và chỉ để cung cấp dịch vụ xác minh danh tính cùng các dịch vụ liên quan mà họ yêu cầu.',
    roleP2: 'Trong một số trường hợp giới hạn như Identra Wallet, Identra có thể đóng vai trò bên kiểm soát dữ liệu. Điều này nghĩa là chúng tôi quyết định cách thông tin của bạn được xử lý, phù hợp với luật bảo vệ dữ liệu áp dụng.',
    collectQuestion: 'Identra có thể thu thập thông tin cá nhân nào?',
    collectIntro: 'Chúng tôi chỉ thu thập những gì cần thiết để cung cấp dịch vụ được yêu cầu. Dữ liệu này có thể bao gồm:',
    collectBullets: ['Thông tin bạn cung cấp, chẳng hạn họ tên, thông tin liên hệ, ảnh giấy tờ định danh do chính phủ cấp', 'Ảnh hoặc video bạn tải lên, chẳng hạn để nhận diện khuôn mặt và kiểm tra độ sống', 'Dữ liệu thiết bị hoặc kỹ thuật, như địa chỉ IP hoặc tín hiệu trình duyệt', 'Dữ liệu từ nguồn bên thứ ba nếu được dùng trong kiểm tra xác minh'],
    useQuestion: 'Identra sử dụng dữ liệu của tôi như thế nào?',
    useAnswer: 'Chúng tôi chỉ dùng thông tin của bạn để hoàn tất các kiểm tra xác minh hoặc phòng chống gian lận do tổ chức mà bạn đang tương tác yêu cầu. Chúng tôi không dùng thông tin cá nhân của bạn cho tiếp thị và không bán thông tin đó cho bên thứ ba.',
    howVerificationWorks: 'Cách xác minh hoạt động',
    collectionTitle: 'Thu thập',
    collectionDesc: 'Bạn gửi thông tin trong một luồng xác minh bảo mật. Tùy theo yêu cầu tuân thủ, niềm tin và an toàn của tổ chức, thông tin này có thể gồm giấy tờ định danh do chính phủ cấp, ảnh tự chụp, chi tiết doanh nghiệp hoặc dữ liệu khác.',
    securePortal: 'Cổng danh tính bảo mật',
    encrypted: 'Đã mã hóa',
    scanGovId: 'Quét giấy tờ định danh',
    scanGovIdHint: 'Đặt mặt trước giấy tờ trong khung hướng dẫn của camera',
    securePipeline: 'Identra bảo mật các kênh truyền dữ liệu bằng mã hóa TLS đạt chuẩn ISO 27001.',
    processingTitle: 'Xử lý',
    processingDesc: 'Identra dùng hệ thống tự động bảo mật và các quy tắc định sẵn để xác minh thông tin của bạn. Tùy yêu cầu của tổ chức, việc này có thể bao gồm đối chiếu với tín hiệu gian lận và nguồn tin cậy như hồ sơ công khai.',
    processingPipeline: 'QUY TRÌNH XỬ LÝ ID',
    analyzingDoc: 'Đang phân tích giấy tờ...',
    running: 'Đang chạy',
    docAuthenticityCheck: 'Kiểm tra tính xác thực của giấy tờ',
    pass: 'ĐẠT',
    crossMatch: 'Đối chiếu họ tên với hồ sơ CSDL',
    match: 'KHỚP',
    biometricMatch: 'Đối chiếu ảnh tự chụp sinh trắc học',
    matchPercent: 'Khớp 99,4%',
    aiAccuracyNote: 'Việc đối chiếu dùng quy trình tra cứu tự động nghiêm ngặt. AI chỉ được dùng để tăng độ chính xác, không dùng để huấn luyện ngoài yêu cầu.',
    outcomeTitle: 'Kết quả',
    outcomeDesc1: 'Chúng tôi trả kết quả cho công ty đã yêu cầu bạn hoàn tất xác minh. Kết quả có thể gồm trạng thái, ví dụ "đã xác minh" hoặc "chưa xác minh", cùng tín hiệu liên quan hoặc thông tin hỗ trợ dựa trên cấu hình và trường hợp sử dụng của họ.',
    outcomeDesc2: 'Công ty có thể truy cập thông tin bạn gửi cùng trạng thái xác minh và thông tin liên quan. Tuy nhiên, trong một số luồng như Relay, quyền truy cập thông tin sẽ bị giới hạn.',
    outcomeNote: 'Thông tin của bạn không được chia sẻ hoặc dùng lại ngoài mục đích xác minh.',
    decisionDiscovery: 'KHÁM PHÁ QUYẾT ĐỊNH',
    applicant: 'Người đăng ký',
    verified: 'Đã xác minh',
    companyPortal: 'Cổng công ty',
    decisionClear: 'Quy trình quyết định tự động đã thông qua',
    decisionClearDesc: 'Kết quả được chuyển an toàn đến nền tảng khách hàng. Không lưu dữ liệu trong bộ nhớ đệm công khai.',
    overviewTitle: 'Tổng quan quyền riêng tư',
    navItems: [
      { id: 'verify-identity', label: 'Cách chúng tôi xác minh danh tính' },
      { id: 'privacy-by-default', label: 'Quyền riêng tư theo mặc định' },
      { id: 'safeguard', label: 'Cách chúng tôi bảo vệ dữ liệu của bạn' },
      { id: 'data-rights', label: 'Quyền và quyền kiểm soát dữ liệu của bạn' }
    ],
    privacyNoticesTitle: 'Thông báo quyền riêng tư',
    privacyNoticesSubtitle: 'Tài liệu & hướng dẫn',
    read: 'Đọc',
    privacyDefaultTitle: 'Quyền riêng tư theo mặc định',
    privacyDefaultDesc: 'Quyền riêng tư và bảo mật dữ liệu là cốt lõi trong cách chúng tôi vận hành. Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân được xử lý cho mục đích xác minh, và không dùng dữ liệu cá nhân ngoài phạm vi nêu trong chính sách quyền riêng tư.',
    privacyQa: [
      { q: 'Identra có bán hoặc chia sẻ dữ liệu của tôi không?', a: 'Không. Identra không bán dữ liệu cá nhân hoặc môi giới dữ liệu đó cho bên thứ ba. Quyền riêng tư và bảo mật dữ liệu là cốt lõi trong cách chúng tôi vận hành.' },
      { q: 'Dữ liệu của tôi có được dùng để huấn luyện mô hình AI không?', a: 'Không. Chúng tôi không dùng dữ liệu cá nhân của bạn cho bất kỳ hoạt động huấn luyện AI hoặc mô hình nào.' },
      { q: 'Ai có quyền truy cập dữ liệu của tôi?', a: 'Quyền truy cập được giới hạn cho hệ thống tự động và nhân sự được ủy quyền theo kiểm soát vai trò nghiêm ngặt. Con người chỉ xem xét khi tổ chức mà bạn tương tác cấu hình việc đó, và hoạt động này chịu kiểm toán cùng giám sát.' },
      { q: 'Identra làm việc với các công ty như thế nào?', a: 'Chúng tôi làm việc với các tổ chức thuộc nhiều ngành cần xác minh và đảm bảo danh tính bảo mật. Chúng tôi không tiết lộ chi tiết quan hệ khách hàng và không chia sẻ dữ liệu người dùng ngoài những gì cần thiết để cung cấp dịch vụ.' },
      { q: 'Tôi phải cung cấp bao nhiêu dữ liệu?', a: 'Chúng tôi thu thập lượng dữ liệu tối thiểu cần thiết và liên tục đánh giá tác động của hoạt động xử lý đến quyền riêng tư dữ liệu để cải thiện thực hành của mình.' },
      { q: 'Identra bảo vệ dữ liệu của tôi như thế nào?', a: 'Chúng tôi dùng các biện pháp bảo vệ theo chuẩn ngành, gồm mã hóa, lưu trữ bảo mật và kiểm soát truy cập để bảo vệ thông tin trong quá trình xử lý. Các biện pháp này phản ánh thiết kế ưu tiên bảo mật và khung tuân thủ của chúng tôi.' }
    ],
    safeguardBadge: 'Tiêu chuẩn bảo vệ nghiêm ngặt',
    safeguardTitle: 'Cách chúng tôi bảo vệ dữ liệu của bạn',
    safeguardDesc: 'Ngoài việc giới hạn cách sử dụng dữ liệu, chúng tôi áp dụng nhiều lớp bảo vệ khi dữ liệu được xử lý và lưu trữ.',
    safeguards: [
      { title: 'Mã hóa khi truyền và khi lưu trữ', desc: 'Thông tin của bạn được mã hóa khi truyền và khi lưu trữ, giúp ngăn truy cập trái phép.' },
      { title: 'Giới hạn quyền truy cập hệ thống', desc: 'Chúng tôi giới hạn quyền truy cập dữ liệu nhạy cảm bằng đăng nhập một lần, nhật ký truy cập và phân quyền theo vai trò, đồng thời rà soát thường xuyên.' },
      { title: 'Hạ tầng được giám sát', desc: 'Chúng tôi liên tục giám sát hệ thống để phát hiện hoạt động bất thường và dùng cảnh báo cùng quy trình phản hồi để hành động nhanh chóng.' },
      { title: 'Môi trường lưu trữ bảo mật', desc: 'Dịch vụ xác minh chạy trên hạ tầng đám mây bảo mật, được thiết kế với biện pháp bảo vệ vật lý, mạng và vận hành.' },
      { title: 'Rà soát bảo mật liên tục', desc: 'Chúng tôi thực hiện đánh giá nội bộ và đánh giá bên ngoài định kỳ để xem xét và cải thiện kiểm soát bảo mật theo thời gian.' },
      { title: 'Passkey cho Identra Wallet', desc: 'Thông tin lưu trong Identra Wallet được mã hóa và bảo vệ bằng passkey, phương thức xác thực không mật khẩu được bảo mật trên thiết bị của bạn bằng Face ID, bảo đảm chỉ bạn có thể mở khóa.' }
    ],
    industryStandards: 'TIÊU CHUẨN NGÀNH',
    securityCoreTitle: 'Bảo mật và quyền riêng tư là cốt lõi',
    securityCoreDesc: 'Bảo mật và quyền riêng tư là nền tảng của mối quan hệ đáng tin cậy. Vì vậy Identra tuân thủ, được chứng nhận theo các tiêu chuẩn ngành cao nhất và cam kết bảo vệ quyền riêng tư của bạn.',
    certs: ['CCPA', 'GDPR', 'AICPA SOC 2 Loại II', 'ISO 27001', 'Tuân thủ HIPAA', 'PCI DSS', 'FERPA', 'Kantara (NIST SP 800-63)', 'Chương trình chứng nhận kiểm tra độ tuổi', 'Được KJM phê duyệt'],
    userControlsBadge: 'Kiểm soát của người dùng',
    dataRightsTitle: 'Quyền và quyền kiểm soát dữ liệu của bạn',
    dataRightsDesc: 'Cách chúng tôi xử lý dữ liệu phụ thuộc vào việc chúng tôi đóng vai trò bên xử lý hay bên kiểm soát, cấu hình của tổ chức và luật áp dụng.',
    rightsQuestion: 'Tôi có quyền gì đối với thông tin của mình?',
    rightsIntro: 'Bạn có thể có quyền:',
    rightsBullets: ['Truy cập thông tin cá nhân của bạn', 'Sửa thông tin không chính xác hoặc đã lỗi thời', 'Yêu cầu xóa thông tin của bạn', 'Nhận bản sao thông tin có thể chuyển giao'],
    manageQuestion: 'Tôi có thể tìm và quản lý dữ liệu ở đâu?',
    manageAnswer: 'Truy cập cổng dữ liệu người tiêu dùng của chúng tôi để kiểm tra hồ sơ, yêu cầu tệp hoặc phối hợp xóa dữ liệu theo GDPR/CCPA thay mặt bạn.',
    submitDsr: 'Gửi yêu cầu của chủ thể dữ liệu',
    retentionQuestion: 'Dữ liệu của tôi được lưu giữ trong bao lâu?',
    retentionAnswer: 'Thời hạn lưu giữ khác nhau tùy tổ chức và yêu cầu pháp lý áp dụng. Trong một số trường hợp, dữ liệu phải được giữ trong thời gian nhất định để đáp ứng nghĩa vụ phòng chống gian lận, tuân thủ hoặc quy định tài chính.',
    deleteQuestion: 'Tôi xóa dữ liệu của mình như thế nào?',
    deleteAnswer: 'Gửi yêu cầu qua Cổng quyền riêng tư. Chúng tôi sẽ xem xét yêu cầu, xác minh danh tính của bạn và kiểm tra kết quả khớp. Sau đó chúng tôi sẽ xóa dữ liệu của bạn hoặc chuyển yêu cầu đến tổ chức phù hợp, tùy cách dữ liệu của bạn đã được xử lý.',
    contactQuestion: 'Tôi có thể liên hệ ai nếu có câu hỏi về quyền riêng tư?',
    contactAnswerPrefix: 'Nếu có câu hỏi về thực hành quyền riêng tư của Identra, hoặc muốn gửi yêu cầu CCPA trực tiếp đến cán bộ bảo mật của chúng tôi, hãy dùng liên kết Cổng quyền riêng tư bên dưới hoặc email',
    closeDocument: 'Đóng tài liệu',
    portalTitle: 'Cổng quyền riêng tư người tiêu dùng',
    portalIntro: 'Dùng cổng bảo mật này để yêu cầu bản sao có cấu trúc của hồ sơ xác minh hoặc yêu cầu xóa theo GDPR/CCPA.',
    requestType: 'Loại yêu cầu',
    requestOptions: ['Lấy tệp dữ liệu đã xác minh của tôi (truy cập)', 'Xóa các kiểm tra xác minh danh tính của tôi', 'Sửa / cập nhật hồ sơ cá nhân'],
    fullName: 'Họ và tên',
    fullNamePlaceholder: 'Nguyễn Văn A',
    emailAddress: 'Địa chỉ email',
    emailPlaceholder: 'nguyen.van.a@example.com',
    partnerOrg: 'Tên tổ chức đối tác',
    partnerOrgPlaceholder: 'ví dụ: Robinhood, Cozy Rentals',
    submitPrivacyRequest: 'Gửi yêu cầu quyền riêng tư',
    requestSubmitted: 'Đã gửi yêu cầu',
    requestSubmittedDesc: 'Yêu cầu của bạn đã được đưa an toàn vào quy trình xác minh quyền riêng tư nội bộ của Identra. Chúng tôi sẽ thông báo qua địa chỉ email bạn cung cấp trong vòng 3-5 ngày làm việc.',
    returnToPage: 'Quay lại trang',
    notices: []
  }
};

const sharedLocalizedNotices = {
  es: [
    {
      id: 'standard',
      title: 'Política de privacidad estándar',
      desc: 'Para visitantes del sitio web y clientes empresariales.',
      content: `### Política de privacidad estándar de Identra

**Última actualización:** julio de 2026

Esta Política de privacidad describe cómo Identra Identities, Inc. ("Identra", "nosotros") recopila, usa y divulga información personal cuando visitas nuestro sitio web, asistes a nuestros eventos o interactúas con nosotros como cliente empresarial.

#### 1. Información que recopilamos
- **Información de contacto**: nombre, correo electrónico, teléfono y nombre de la empresa.
- **Credenciales de cuenta**: contraseñas, nombres de usuario y tokens de autenticación multifactor.
- **Datos de uso**: dirección IP, tipo de navegador, sistema operativo e interacciones con el sitio web.

#### 2. Cómo usamos la información
Usamos datos del sitio web y de visitantes para mantener y mejorar nuestros sitios de marketing, analizar tráfico, organizar webinars corporativos y supervisar la seguridad de nuestras plataformas empresariales.

#### 3. Cookies y seguimiento
Usamos cookies, píxeles y herramientas estándar de analítica web para personalizar tu experiencia de navegación y ofrecer newsletters o eventos relevantes.

#### 4. Compartición y divulgación
No vendemos datos personales. Solo compartimos telemetría de uso del sitio web con proveedores autorizados que nos ayudan con analítica, alojamiento y contacto CRM.`
    },
    {
      id: 'identity',
      title: 'Aviso de verificación de identidad',
      desc: 'Aplica cuando Identra presta ciertos servicios directamente.',
      content: `### Aviso de verificación de identidad

**Última actualización:** julio de 2026

Este aviso explica cómo Identra procesa datos personales en nombre de nuestros clientes empresariales para verificar tu identidad, realizar comprobaciones de fraude y proteger la seguridad de la plataforma.

#### 1. Identra como encargado del tratamiento
En la mayoría de las transacciones de verificación, la empresa con la que interactúas es el **responsable del tratamiento** y Identra es el **encargado del tratamiento**, que procesa datos solo siguiendo las instrucciones del cliente.

#### 2. Información recopilada durante IDV
- **Identificación gubernamental**: pasaportes, licencias de conducir o fotos de documentos nacionales.
- **Identificadores biométricos**: selfies o grabaciones de video usadas para reconocimiento facial y análisis de liveness.
- **Registros de verificación de bases de datos**: registros públicos, datos de burós de crédito y logs de watchlists políticas.

#### 3. Protección y eliminación de datos
Identra elimina o anonimiza registros de verificación de acuerdo con los periodos de retención configurados por el cliente empresarial o exigidos por estándares regionales de cumplimiento.`
    },
    {
      id: 'glba',
      title: 'Aviso de privacidad GLBA',
      desc: 'Aplica cuando lo exige la ley estadounidense de privacidad financiera.',
      content: `### Aviso de privacidad GLBA (Gramm-Leach-Bliley Act)

**Última actualización:** julio de 2026

Este aviso de privacidad financiera describe cómo Identra recopila y protege Información Personal No Pública (NPI) cuando actúa en nombre de instituciones financieras reguladas por marcos de privacidad financiera de Estados Unidos.

#### 1. Alcance de los datos financieros
Este aviso aplica exclusivamente a servicios de verificación realizados para bancos regulados, transmisores de dinero, aseguradoras y plataformas de gestión de activos en Estados Unidos.

#### 2. Información recopilada
- Números de Seguro Social (SSN) y números de identificación fiscal individual (ITIN).
- Comprobaciones de activos, resúmenes de historial crediticio y registros de transacciones.
- Estados de coincidencia en listas de anti-money laundering (AML).

#### 3. Estándares de seguridad
Aplicamos salvaguardas administrativas, técnicas y físicas de varias capas diseñadas para cumplir las Reglas de Salvaguardas de la FTC y métricas de confidencialidad de datos GLBA.`
    }
  ],
  ja: [
    {
      id: 'standard',
      title: '標準プライバシーポリシー',
      desc: 'Webサイト訪問者および法人のお客様向け。',
      content: `### Identra標準プライバシーポリシー

**最終更新:** 2026年7月

このプライバシーポリシーは、Identra Identities, Inc.（「Identra」、「当社」）が、Webサイト訪問、イベント参加、法人のお客様としてのやり取りにおいて個人情報を収集、利用、開示する方法を説明します。

#### 1. 収集する情報
- **連絡先情報**: 氏名、メールアドレス、電話番号、会社名。
- **アカウント認証情報**: パスワード、ユーザー名、多要素認証トークン。
- **利用データ**: IPアドレス、ブラウザ種類、OS、Webサイト上の操作。

#### 2. 情報の利用方法
当社は、マーケティングサイトの維持と改善、トラフィック分析、法人向けウェビナー運営、企業プラットフォームのセキュリティ監視のためにWebサイトおよび訪問者データを使用します。

#### 3. Cookieとトラッキング
Cookie、ピクセル、標準的なWeb解析ツールを使用し、閲覧体験をカスタマイズし、関連するニュースレターやイベントを提供します。

#### 4. 共有と開示
当社は個人データを販売しません。Webサイト利用テレメトリは、解析、ホスティング、CRM連絡を支援する認定サービスプロバイダーにのみ共有します。`
    },
    {
      id: 'identity',
      title: '本人確認通知',
      desc: 'Identraが一部サービスを直接提供する場合に適用されます。',
      content: `### 本人確認通知

**最終更新:** 2026年7月

この通知は、Identraが法人のお客様に代わって、本人確認、不正チェック、プラットフォーム安全性の確保のために個人データを処理する方法を説明します。

#### 1. データ処理者としてのIdentra
多くの確認取引では、あなたが利用する事業者が**データ管理者**であり、Identraは顧客の指示に従ってデータを処理する**データ処理者**です。

#### 2. IDV中に収集される情報
- **政府発行ID**: パスポート、運転免許証、国民IDカード画像。
- **生体識別情報**: 顔認識やliveness分析に使われるセルフィー写真または動画。
- **データベース確認記録**: 公的登録、信用情報、政治的watchlistログ。

#### 3. データ保護と削除
Identraは、法人のお客様が設定した保持期間、または地域のコンプライアンス基準に従って、確認記録を削除または匿名化します。`
    },
    {
      id: 'glba',
      title: 'GLBAプライバシー通知',
      desc: '米国金融プライバシー法で求められる場合に適用されます。',
      content: `### GLBA（Gramm-Leach-Bliley Act）プライバシー通知

**最終更新:** 2026年7月

この金融プライバシー通知は、Identraが米国金融プライバシー規制の対象となる金融機関に代わって業務を行う際、非公開個人情報（NPI）を収集し保護する方法を説明します。

#### 1. 金融データの範囲
この通知は、米国で規制される銀行、送金事業者、保険会社、資産管理プラットフォーム向けに実施される確認サービスに限定して適用されます。

#### 2. 収集する情報
- 社会保障番号（SSN）および個人納税者識別番号（ITIN）。
- 資産確認、信用履歴サマリー、取引記録。
- Anti-Money Laundering（AML）リスト照合ステータス。

#### 3. セキュリティ基準
当社は、FTC Safeguards RulesおよびGLBAデータ機密性要件に沿うよう設計された、多層的な管理的、技術的、物理的保護策を適用します。`
    }
  ],
  de: [
    {
      id: 'standard',
      title: 'Standard-Datenschutzrichtlinie',
      desc: 'Für Websitebesucher und Geschäftskunden.',
      content: `### Identra Standard-Datenschutzrichtlinie

**Zuletzt aktualisiert:** Juli 2026

Diese Datenschutzrichtlinie beschreibt, wie Identra Identities, Inc. ("Identra", "wir") personenbezogene Informationen erhebt, verwendet und offenlegt, wenn Sie unsere Website besuchen, an Veranstaltungen teilnehmen oder als Geschäftskunde mit uns interagieren.

#### 1. Informationen, die wir erheben
- **Kontaktinformationen**: Name, E-Mail-Adresse, Telefonnummer und Unternehmensname.
- **Kontozugangsdaten**: Passwörter, Benutzernamen und Multi-Faktor-Authentifizierungstoken.
- **Nutzungsdaten**: IP-Adresse, Browsertyp, Betriebssystem und Websiteinteraktionen.

#### 2. Wie wir Informationen verwenden
Wir verwenden Website- und Besucherdaten, um Marketing-Websites zu betreiben und zu verbessern, Traffic zu analysieren, Unternehmens-Webinare zu hosten und die Sicherheit unserer Unternehmensplattformen zu überwachen.

#### 3. Cookies und Tracking
Wir verwenden Cookies, Pixel und Standardtools für Webanalyse, um Ihr Surferlebnis anzupassen und relevante Newsletter oder Veranstaltungen bereitzustellen.

#### 4. Weitergabe und Offenlegung
Wir verkaufen keine personenbezogenen Daten. Wir teilen Website-Nutzungstelemetrie nur mit autorisierten Dienstleistern, die Analyse, Hosting und CRM-Kommunikation unterstützen.`
    },
    {
      id: 'identity',
      title: 'Hinweis zur Identitätsverifizierung',
      desc: 'Gilt, wenn Identra bestimmte Dienste direkt bereitstellt.',
      content: `### Hinweis zur Identitätsverifizierung

**Zuletzt aktualisiert:** Juli 2026

Dieser Hinweis erklärt, wie Identra personenbezogene Daten im Auftrag unserer Geschäftskunden verarbeitet, um Ihre Identität zu verifizieren, Betrugsprüfungen durchzuführen und Plattformsicherheit zu gewährleisten.

#### 1. Identra als Auftragsverarbeiter
In den meisten Verifizierungsvorgängen ist das Unternehmen, mit dem Sie interagieren, der **Verantwortliche**, und Identra ist der **Auftragsverarbeiter**, der Daten nur nach Weisung des Kunden verarbeitet.

#### 2. Während IDV erhobene Informationen
- **Amtliche Ausweise**: Reisepässe, Führerscheine oder Fotos nationaler Ausweise.
- **Biometrische Identifikatoren**: Selfie-Fotos oder Videoaufnahmen für Gesichtserkennung und liveness-Analyse.
- **Datenbank-Verifizierungsdatensätze**: Öffentliche Register, Auskunfteidaten und politische Watchlist-Protokolle.

#### 3. Datenschutz und Löschung
Identra löscht oder anonymisiert Verifizierungsdatensätze gemäß den vom Geschäftskunden konfigurierten Aufbewahrungsfristen oder nach regionalen Compliance-Vorgaben.`
    },
    {
      id: 'glba',
      title: 'GLBA-Datenschutzhinweis',
      desc: 'Gilt, wenn US-Finanzdatenschutzrecht dies verlangt.',
      content: `### GLBA-Datenschutzhinweis (Gramm-Leach-Bliley Act)

**Zuletzt aktualisiert:** Juli 2026

Dieser Finanzdatenschutzhinweis beschreibt, wie Identra nicht öffentliche personenbezogene Informationen (NPI) erhebt und schützt, wenn Identra im Auftrag von Finanzinstituten handelt, die US-Finanzdatenschutzrahmen unterliegen.

#### 1. Umfang der Finanzdaten
Dieser Hinweis gilt ausschließlich für Verifizierungsdienste für regulierte Banken, Geldtransmitter, Versicherer und Vermögensverwaltungsplattformen in den Vereinigten Staaten.

#### 2. Erhobene Informationen
- Social Security Numbers (SSN) und Individual Taxpayer Identification Numbers (ITIN).
- Prüfungen zur Vermögensverifikation, Zusammenfassungen der Kredithistorie und Transaktionsdatensätze.
- Trefferstatus in Anti-Money-Laundering-Listen (AML).

#### 3. Sicherheitsstandards
Wir setzen mehrschichtige administrative, technische und physische Schutzmaßnahmen ein, die auf die FTC Safeguards Rules und GLBA-Vertraulichkeitsanforderungen ausgerichtet sind.`
    }
  ],
  vi: [
    {
      id: 'standard',
      title: 'Chính sách quyền riêng tư tiêu chuẩn',
      desc: 'Dành cho khách truy cập website và khách hàng doanh nghiệp.',
      content: `### Chính sách quyền riêng tư tiêu chuẩn của Identra

**Cập nhật lần cuối:** Tháng 7 năm 2026

Chính sách này mô tả cách Identra Identities, Inc. ("Identra", "chúng tôi") thu thập, sử dụng và tiết lộ thông tin cá nhân khi bạn truy cập website, tham dự sự kiện hoặc tương tác với chúng tôi với tư cách khách hàng doanh nghiệp.

#### 1. Thông tin chúng tôi thu thập
- **Thông tin liên hệ**: Họ tên, địa chỉ email, số điện thoại, tên công ty.
- **Thông tin đăng nhập tài khoản**: Mật khẩu, tên người dùng và mã xác thực đa yếu tố.
- **Dữ liệu sử dụng**: Địa chỉ IP, loại trình duyệt, hệ điều hành và tương tác trên website.

#### 2. Cách chúng tôi sử dụng thông tin
Chúng tôi dùng dữ liệu website và khách truy cập để duy trì, cải thiện website tiếp thị, phân tích lưu lượng, tổ chức hội thảo trực tuyến và giám sát bảo mật cho nền tảng doanh nghiệp.

#### 3. Cookie và theo dõi
Chúng tôi dùng cookie, pixel và công cụ phân tích web tiêu chuẩn để tùy chỉnh trải nghiệm duyệt web và cung cấp bản tin hoặc sự kiện phù hợp.

#### 4. Chia sẻ và tiết lộ
Chúng tôi không bán dữ liệu cá nhân. Chúng tôi chỉ chia sẻ dữ liệu đo lường sử dụng website với nhà cung cấp dịch vụ được ủy quyền hỗ trợ phân tích website, lưu trữ và liên hệ CRM.`
    },
    {
      id: 'identity',
      title: 'Thông báo xác minh danh tính',
      desc: 'Áp dụng khi Identra trực tiếp cung cấp một số dịch vụ nhất định.',
      content: `### Thông báo xác minh danh tính

**Cập nhật lần cuối:** Tháng 7 năm 2026

Thông báo này giải thích cách Identra xử lý dữ liệu cá nhân thay mặt khách hàng doanh nghiệp để xác minh danh tính, thực hiện kiểm tra gian lận và bảo đảm an toàn nền tảng.

#### 1. Identra là bên xử lý dữ liệu
Trong hầu hết giao dịch xác minh, doanh nghiệp mà bạn tương tác là **bên kiểm soát dữ liệu** (quyết định vì sao và cách dữ liệu của bạn được thu thập), còn Identra là **bên xử lý dữ liệu** (chỉ xử lý dữ liệu theo hướng dẫn của khách hàng).

#### 2. Thông tin được thu thập trong IDV
- **Giấy tờ định danh do chính phủ cấp**: Hộ chiếu, giấy phép lái xe, ảnh căn cước quốc gia.
- **Dữ liệu sinh trắc học**: Ảnh tự chụp hoặc video dùng cho nhận diện khuôn mặt và phân tích độ sống.
- **Hồ sơ xác minh cơ sở dữ liệu**: Sổ đăng ký công khai, dữ liệu cơ quan tín dụng và nhật ký danh sách theo dõi chính trị.

#### 3. Bảo vệ và xóa dữ liệu
Identra xóa hoặc ẩn danh hồ sơ xác minh theo thời hạn lưu giữ do khách hàng doanh nghiệp cấu hình hoặc theo yêu cầu của tiêu chuẩn tuân thủ khu vực.`
    },
    {
      id: 'glba',
      title: 'Thông báo quyền riêng tư GLBA',
      desc: 'Áp dụng khi luật quyền riêng tư tài chính Hoa Kỳ yêu cầu.',
      content: `### Thông báo quyền riêng tư GLBA (Gramm-Leach-Bliley Act)

**Cập nhật lần cuối:** Tháng 7 năm 2026

Thông báo quyền riêng tư tài chính này mô tả cách Identra thu thập và bảo vệ Thông tin cá nhân không công khai (NPI) khi hoạt động thay mặt các tổ chức tài chính được quản lý theo khung quyền riêng tư tài chính của Hoa Kỳ.

#### 1. Phạm vi dữ liệu tài chính
Thông báo này chỉ áp dụng cho dịch vụ xác minh được thực hiện cho ngân hàng, đơn vị chuyển tiền, nhà cung cấp bảo hiểm và nền tảng quản lý tài sản được quản lý tại Hoa Kỳ.

#### 2. Thông tin được thu thập
- Số An sinh Xã hội (SSN), mã số thuế cá nhân (ITIN).
- Kiểm tra xác minh tài sản, tóm tắt lịch sử tín dụng và hồ sơ giao dịch.
- Trạng thái khớp danh sách chống rửa tiền (AML).

#### 3. Tiêu chuẩn bảo mật
Chúng tôi áp dụng nhiều lớp bảo vệ hành chính, kỹ thuật và vật lý được thiết kế để tuân thủ Quy tắc bảo vệ của FTC và chỉ số bảo mật dữ liệu GLBA.`
    }
  ]
};

PRIVACY_PAGE_TRANSLATIONS.es = {
  heroBadge: 'Confianza y transparencia',
  identraInitial: 'P',
  heroTitleLine1: 'Tu identidad importa.',
  heroTitleLine2: 'Tu privacidad también.',
  heroDesc: 'La verificación de identidad requiere compartir información personal. Debes poder ver y entender cómo se maneja esa información.',
  heroSubdesc: 'Cuando verificas con Identra, tus datos se usan para un propósito específico, se protegen con prácticas de seguridad y se mantienen dentro de límites definidos.',
  manageData: 'Gestionar tus datos',
  verifyTitle: 'Cómo verificamos la identidad',
  idvQuestion: '¿Por qué existe la verificación de identidad (IDV)?',
  idvIntro: 'Muchos servicios en línea verifican la identidad para:',
  idvBullets: ['Prevenir fraude y suplantación', 'Cumplir regulaciones financieras, de seguridad o relacionadas con la edad', 'Proteger a los usuarios y la integridad de la plataforma'],
  roleQuestion: '¿Cuál es el papel de Identra cuando una organización me pide verificar mi identidad?',
  roleP1: 'Identra actúa principalmente como encargado del tratamiento de datos. Esto significa que procesamos información en nombre de la organización con la que interactúas y solo para proporcionar la verificación de identidad y los servicios relacionados que esa organización solicitó.',
  roleP2: 'En circunstancias limitadas, como Identra Wallet, Identra puede actuar como responsable del tratamiento de datos. Esto significa que decidimos cómo se maneja tu información, de acuerdo con las leyes de protección de datos aplicables.',
  collectQuestion: '¿Qué información personal puede recopilar Identra?',
  collectIntro: 'Recopilamos solo lo necesario para prestar el servicio solicitado. Esto puede incluir:',
  collectBullets: ['Información que proporcionas, como nombre, datos de contacto e imágenes de documentos oficiales', 'Fotos o videos que subes, por ejemplo para reconocimiento facial y prueba de liveness', 'Datos del dispositivo o técnicos, como dirección IP o señales del navegador', 'Datos de fuentes externas si se usan en comprobaciones de verificación'],
  useQuestion: '¿Cómo usa Identra mis datos?',
  useAnswer: 'Usamos tu información únicamente para completar las comprobaciones de verificación o prevención de fraude solicitadas por la organización con la que interactúas. No usamos tu información personal para marketing y no la vendemos a terceros.',
  howVerificationWorks: 'Cómo funciona la verificación',
  collectionTitle: 'Recopilación',
  collectionDesc: 'Envías información durante un flujo de verificación seguro. Según lo que la organización necesite para cumplir iniciativas de cumplimiento, confianza o seguridad, esto puede incluir un documento oficial, una selfie, datos empresariales u otra información.',
  securePortal: 'Portal de identidad seguro',
  encrypted: 'Cifrado',
  scanGovId: 'Escanear documento oficial',
  scanGovIdHint: 'Coloca el frente del documento dentro de las guías de la cámara',
  securePipeline: 'Identra mantiene canales de transmisión seguros con cifrado TLS alineado con ISO 27001.',
  processingTitle: 'Procesamiento',
  processingDesc: 'Identra usa sistemas automatizados seguros y reglas predefinidas para verificar tu información. Según los requisitos de la organización, esto puede incluir contrastarla con señales de fraude y fuentes confiables, como registros públicos.',
  processingPipeline: 'FLUJO DE PROCESAMIENTO DE ID',
  analyzingDoc: 'Analizando documento...',
  running: 'En ejecución',
  docAuthenticityCheck: 'Comprobación de autenticidad del documento',
  pass: 'APROBADO',
  crossMatch: 'Cruce de nombre con registros de base de datos',
  match: 'COINCIDE',
  biometricMatch: 'Coincidencia biométrica de selfie',
  matchPercent: '99,4% de coincidencia',
  aiAccuracyNote: 'El cruce de datos usa rutinas de búsqueda automatizadas estrictas. La IA se usa solo para mejorar la precisión, nunca para entrenamiento no solicitado.',
  outcomeTitle: 'Resultado',
  outcomeDesc1: 'Devolvemos un resultado a la empresa que te pidió completar la verificación. Ese resultado puede incluir un estado, por ejemplo "verificado" o "no verificado", y señales o información de respaldo según su configuración y caso de uso.',
  outcomeDesc2: 'La empresa puede acceder a la información que envías junto con tu estado de verificación y datos relacionados. Sin embargo, en algunos flujos, como Relay, el acceso a la información es limitado.',
  outcomeNote: 'Tu información no se comparte ni se reutiliza fuera de la verificación.',
  decisionDiscovery: 'DESCUBRIMIENTO DE DECISIÓN',
  applicant: 'Solicitante',
  verified: 'Verificado',
  companyPortal: 'Portal de la empresa',
  decisionClear: 'Canal de decisión automatizada aprobado',
  decisionClearDesc: 'Resultado transferido de forma segura a la plataforma del cliente. No se conservan datos en nodos de caché públicos.',
  overviewTitle: 'Resumen de privacidad',
  navItems: [
    { id: 'verify-identity', label: 'Cómo verificamos la identidad' },
    { id: 'privacy-by-default', label: 'Privacidad por defecto' },
    { id: 'safeguard', label: 'Cómo protegemos tus datos' },
    { id: 'data-rights', label: 'Tus derechos y control de datos' }
  ],
  privacyNoticesTitle: 'Avisos de privacidad',
  privacyNoticesSubtitle: 'Documentos y guías',
  read: 'Leer',
  privacyDefaultTitle: 'Privacidad por defecto',
  privacyDefaultDesc: 'La privacidad y la seguridad de datos son esenciales para nuestra forma de operar. No vendemos ni compartimos datos personales procesados para fines de verificación, y no usamos datos personales fuera del alcance indicado en nuestra política de privacidad.',
  privacyQa: [
    { q: '¿Identra vende o comparte mis datos?', a: 'No. Identra no vende datos personales ni los intermedia con terceros. La privacidad y la seguridad de datos son esenciales para nuestra forma de operar.' },
    { q: '¿Mis datos se usan para entrenar modelos de IA?', a: 'No. No usamos tus datos personales para ningún entrenamiento de IA o de modelos.' },
    { q: '¿Quién tiene acceso a mis datos?', a: 'El acceso está limitado a sistemas automatizados y personal autorizado bajo controles estrictos basados en roles. La revisión humana solo ocurre cuando la organización con la que interactúas la configura, y está sujeta a auditoría y supervisión.' },
    { q: '¿Cómo trabaja Identra con empresas?', a: 'Trabajamos con organizaciones de distintos sectores que necesitan verificación de identidad y seguridad. No divulgamos detalles de relaciones con clientes y no compartimos datos de usuarios más allá de lo necesario para prestar nuestros servicios.' },
    { q: '¿Cuántos datos debo proporcionar?', a: 'Recopilamos la cantidad mínima de datos necesaria y evaluamos continuamente el impacto de nuestras actividades sobre la privacidad para mejorar nuestras prácticas.' },
    { q: '¿Cómo protege Identra mis datos?', a: 'Usamos salvaguardas estándar del sector, como cifrado, almacenamiento seguro y controles de acceso, para proteger tu información mientras la procesamos. Estas medidas reflejan nuestro diseño centrado en seguridad y nuestros marcos de cumplimiento.' }
  ],
  safeguardBadge: 'Estándares reforzados',
  safeguardTitle: 'Cómo protegemos tus datos',
  safeguardDesc: 'Además de limitar cómo se usan los datos, aplicamos capas de protección mientras se procesan y almacenan.',
  safeguards: [
    { title: 'Cifrado en tránsito y en reposo', desc: 'Tu información se cifra mientras se transmite y mientras se almacena, lo que ayuda a impedir accesos no autorizados.' },
    { title: 'Acceso restringido a sistemas', desc: 'Limitamos el acceso a datos sensibles mediante inicio de sesión único, registros de acceso y permisos basados en roles que revisamos periódicamente.' },
    { title: 'Infraestructura monitoreada', desc: 'Supervisamos continuamente nuestros sistemas para detectar actividad inusual y usamos alertas y procesos de respuesta para actuar con rapidez.' },
    { title: 'Entorno de alojamiento seguro', desc: 'Los servicios de verificación se ejecutan en infraestructura cloud segura diseñada con protecciones físicas, de red y operativas.' },
    { title: 'Revisión continua de seguridad', desc: 'Realizamos revisiones internas y evaluaciones externas periódicas para evaluar y mejorar nuestros controles de seguridad con el tiempo.' },
    { title: 'Passkeys para Identra Wallet', desc: 'La información guardada en Identra Wallet está cifrada y protegida mediante passkeys, un método de autenticación sin contraseña protegido en tu dispositivo por Face ID, para que solo tú puedas desbloquearla.' }
  ],
  industryStandards: 'ESTÁNDARES DEL SECTOR',
  securityCoreTitle: 'Seguridad y privacidad en nuestro núcleo',
  securityCoreDesc: 'La seguridad y la privacidad son esenciales para una relación de confianza. Por eso Identra cumple y está certificada con los estándares más altos del sector, y se compromete a proteger tu privacidad.',
  certs: ['CCPA', 'GDPR', 'AICPA SOC 2 Type II', 'ISO 27001', 'Cumplimiento HIPAA', 'PCI DSS', 'FERPA', 'Kantara (NIST SP 800-63)', 'Age Check Certification Scheme', 'Aprobado por KJM'],
  userControlsBadge: 'Controles de usuario',
  dataRightsTitle: 'Tus derechos y control de datos',
  dataRightsDesc: 'La forma en que procesamos tus datos depende de si actuamos como encargado o responsable del tratamiento, de la configuración de la organización y de las leyes aplicables.',
  rightsQuestion: '¿Qué derechos tengo sobre mi información?',
  rightsIntro: 'Puedes tener derecho a:',
  rightsBullets: ['Acceder a tu información personal', 'Corregir información inexacta u obsoleta', 'Solicitar la eliminación de tu información', 'Recibir una copia portable de tu información'],
  manageQuestion: '¿Dónde puedo encontrar y gestionar mis datos?',
  manageAnswer: 'Visita nuestro portal de datos del consumidor para revisar registros, solicitar archivos o coordinar eliminaciones estructuradas bajo GDPR/CCPA en tu nombre.',
  submitDsr: 'Enviar solicitud de sujeto de datos',
  retentionQuestion: '¿Durante cuánto tiempo se conservan mis datos?',
  retentionAnswer: 'Los periodos de retención varían según la organización y los requisitos legales aplicables. En algunos casos, deben conservarse durante un periodo definido para cumplir obligaciones de prevención de fraude, cumplimiento o regulación financiera.',
  deleteQuestion: '¿Cómo elimino mis datos?',
  deleteAnswer: 'Envía una solicitud a través del Portal de privacidad. Revisaremos tu solicitud, verificaremos tu identidad y comprobaremos coincidencias. Después eliminaremos tus datos o dirigiremos la solicitud a la organización correspondiente, según cómo se procesaron tus datos.',
  contactQuestion: '¿Con quién puedo contactar si tengo preguntas de privacidad?',
  contactAnswerPrefix: 'Para preguntas sobre las prácticas de privacidad de Identra o para enviar consultas CCPA personalizadas directamente a nuestro responsable de seguridad, usa el enlace del Portal de privacidad a continuación o escribe a',
  closeDocument: 'Cerrar documento',
  portalTitle: 'Portal de privacidad del consumidor',
  portalIntro: 'Usa este portal seguro para solicitar una copia estructurada de tus registros de verificación o pedir la eliminación bajo GDPR/CCPA.',
  requestType: 'Tipo de solicitud',
  requestOptions: ['Recuperar mi archivo de datos verificados (acceso)', 'Borrar mis comprobaciones de verificación de identidad', 'Corregir / actualizar registros personales'],
  fullName: 'Nombre completo',
  fullNamePlaceholder: 'Juan Pérez',
  emailAddress: 'Dirección de correo electrónico',
  emailPlaceholder: 'juan.perez@example.com',
  partnerOrg: 'Nombre de la organización asociada',
  partnerOrgPlaceholder: 'p. ej., Robinhood, Cozy Rentals',
  submitPrivacyRequest: 'Enviar solicitud de privacidad',
  requestSubmitted: 'Solicitud enviada',
  requestSubmittedDesc: 'Tu solicitud se incorporó de forma segura al flujo interno de verificación de privacidad de Identra. Te notificaremos en la dirección de correo proporcionada en un plazo de 3 a 5 días hábiles.',
  returnToPage: 'Volver a la página',
  notices: sharedLocalizedNotices.es
};

PRIVACY_PAGE_TRANSLATIONS.ja = {
  heroBadge: '信頼と透明性',
  identraInitial: 'P',
  heroTitleLine1: 'あなたの本人性は重要です。',
  heroTitleLine2: 'プライバシーも同じです。',
  heroDesc: '本人確認では個人情報の共有が必要です。その情報がどのように扱われるかを確認し、理解できるべきです。',
  heroSubdesc: 'Identraで確認する際、データは特定の目的に使用され、セキュリティ対策で保護され、定められた範囲内で保持されます。',
  manageData: 'データを管理',
  verifyTitle: '本人確認の仕組み',
  idvQuestion: '本人確認（IDV）はなぜ必要ですか？',
  idvIntro: '多くのオンラインサービスは、次の目的で本人確認を行います。',
  idvBullets: ['不正やなりすましを防ぐため', '金融、安全、年齢関連の規制に準拠するため', 'ユーザーとプラットフォームの健全性を守るため'],
  roleQuestion: '組織が本人確認を求めるとき、Identraはどのような役割ですか？',
  roleP1: 'Identraは主にデータ処理者として機能します。つまり、あなたが利用している組織に代わって、その組織が依頼した本人確認および関連サービスを提供するためだけに情報を処理します。',
  roleP2: 'Identra Walletなど一部の場合、Identraはデータ管理者として機能することがあります。この場合、適用されるデータ保護法に従い、情報の扱い方をIdentraが決定します。',
  collectQuestion: 'Identraはどのような個人情報を収集しますか？',
  collectIntro: '当社は、依頼されたサービスの提供に必要な情報だけを収集します。これには次の情報が含まれる場合があります。',
  collectBullets: ['氏名、連絡先、政府発行ID画像など、あなたが提供する情報', '顔認識やliveness確認に使うセルフィー写真または動画', 'IPアドレスやブラウザシグナルなどの端末・技術データ', '確認チェックで使用される場合の第三者ソースからのデータ'],
  useQuestion: 'Identraは私のデータをどのように使いますか？',
  useAnswer: '当社は、あなたが利用している組織から依頼された確認または不正防止チェックを完了するためだけに情報を使用します。個人情報をマーケティングに使用せず、第三者に販売しません。',
  howVerificationWorks: '確認の流れ',
  collectionTitle: '収集',
  collectionDesc: '安全な確認フローの中で情報を送信します。組織がコンプライアンス、信頼、安全性の要件を満たすために必要とする内容に応じて、政府発行ID、セルフィー、事業情報、その他の情報が含まれる場合があります。',
  securePortal: '安全な本人確認ポータル',
  encrypted: '暗号化済み',
  scanGovId: '政府発行IDをスキャン',
  scanGovIdHint: 'IDカードの表面をカメラ枠のガイド内に配置してください',
  securePipeline: 'Identraは、ISO 27001に沿ったTLS暗号化で送信経路を安全に保ちます。',
  processingTitle: '処理',
  processingDesc: 'Identraは、安全な自動システムと事前定義されたルールを使って情報を確認します。組織の要件に応じて、不正シグナルや公的記録などの信頼できるソースとの照合が含まれる場合があります。',
  processingPipeline: 'ID処理パイプライン',
  analyzingDoc: '書類を解析中...',
  running: '実行中',
  docAuthenticityCheck: '書類真正性チェック',
  pass: '合格',
  crossMatch: '氏名とデータベース記録の照合',
  match: '一致',
  biometricMatch: 'セルフィー生体照合',
  matchPercent: '99.4%一致',
  aiAccuracyNote: '照合には厳格な自動検索ルーチンを使用します。AIは精度向上のためだけに使用され、依頼されていない学習には使用されません。',
  outcomeTitle: '結果',
  outcomeDesc1: '当社は、確認を依頼した企業に結果を返します。結果には、たとえば「確認済み」または「未確認」といったステータスや、その企業の設定とユースケースに基づく関連シグナルまたは補足情報が含まれる場合があります。',
  outcomeDesc2: '企業は、あなたが送信した情報、確認ステータス、関連情報にアクセスできます。ただしRelayなど一部のフローでは、情報へのアクセスが制限されます。',
  outcomeNote: 'あなたの情報は、確認以外の目的で共有または再利用されません。',
  decisionDiscovery: '判定の可視化',
  applicant: '申請者',
  verified: '確認済み',
  companyPortal: '企業ポータル',
  decisionClear: '自動判定パイプライン通過',
  decisionClearDesc: '結果は顧客プラットフォームへ安全に転送されました。公開キャッシュノードにデータは保持されません。',
  overviewTitle: 'プライバシー概要',
  navItems: [
    { id: 'verify-identity', label: '本人確認の仕組み' },
    { id: 'privacy-by-default', label: '標準でプライバシーを保護' },
    { id: 'safeguard', label: 'データ保護の方法' },
    { id: 'data-rights', label: 'データに関する権利と管理' }
  ],
  privacyNoticesTitle: 'プライバシー通知',
  privacyNoticesSubtitle: '文書とガイドライン',
  read: '読む',
  privacyDefaultTitle: '標準でプライバシーを保護',
  privacyDefaultDesc: 'プライバシーとデータセキュリティは、当社の運営の中核です。確認目的で処理される個人データを販売または共有せず、プライバシーポリシーに記載された範囲外で個人データを使用しません。',
  privacyQa: [
    { q: 'Identraは私のデータを販売または共有しますか？', a: 'いいえ。Identraは個人データを販売せず、第三者に仲介しません。プライバシーとデータセキュリティは当社の運営の中核です。' },
    { q: '私のデータはAIモデルの学習に使われますか？', a: 'いいえ。当社はあなたの個人データをAIまたはモデル学習に使用しません。' },
    { q: '誰が私のデータにアクセスできますか？', a: 'アクセスは、厳格なロールベース管理のもとで自動システムと権限を持つ担当者に限定されます。人によるレビューは、あなたが利用している組織が設定した場合にのみ行われ、監査と監督の対象になります。' },
    { q: 'Identraは企業とどのように連携しますか？', a: '当社は、安全な本人確認と保証を必要とする幅広い業界の組織と連携しています。顧客関係の詳細は開示せず、サービス提供に必要な範囲を超えてユーザーデータを共有しません。' },
    { q: 'どれくらいのデータを提供する必要がありますか？', a: '当社は必要最小限のデータを収集し、プライバシーへの影響を継続的に評価して実務を改善しています。' },
    { q: 'Identraは私のデータをどのように保護しますか？', a: '当社は、暗号化、安全な保管、アクセス制御など業界標準の保護策を使って、処理中の情報を守ります。これらの対策は、セキュリティを重視した設計とコンプライアンスフレームワークを反映しています。' }
  ],
  safeguardBadge: '強固な基準',
  safeguardTitle: 'データ保護の方法',
  safeguardDesc: 'データの利用方法を制限するだけでなく、処理と保存の間にも多層的な保護を適用します。',
  safeguards: [
    { title: '転送時と保存時の暗号化', desc: '情報は送信中および保存中に暗号化され、不正アクセスの防止に役立ちます。' },
    { title: 'システムアクセスの制限', desc: 'シングルサインオン、アクセスログ、ロールベース権限で機密データへのアクセスを制限し、定期的に見直します。' },
    { title: '監視されたインフラ', desc: '異常な活動を検知するためにシステムを継続的に監視し、アラートと対応プロセスで迅速に対処します。' },
    { title: '安全なホスティング環境', desc: '確認サービスは、物理、ネットワーク、運用面の保護を備えた安全なクラウドインフラ上で実行されます。' },
    { title: '継続的なセキュリティレビュー', desc: '社内レビューと外部評価を定期的に実施し、セキュリティ管理を評価し改善します。' },
    { title: 'Identra Walletのpasskeys', desc: 'Identra Walletに保存された情報は暗号化され、Face IDで保護された端末上のパスワードレス認証方式であるpasskeysによって保護されます。解除できるのはあなただけです。' }
  ],
  industryStandards: '業界基準',
  securityCoreTitle: 'セキュリティとプライバシーを中核に',
  securityCoreDesc: 'セキュリティとプライバシーは、信頼関係に不可欠です。そのためIdentraは業界最高水準に準拠し認証を取得し、あなたのプライバシー保護に取り組んでいます。',
  certs: ['CCPA', 'GDPR', 'AICPA SOC 2 Type II', 'ISO 27001', 'HIPAA準拠', 'PCI DSS', 'FERPA', 'Kantara (NIST SP 800-63)', 'Age Check Certification Scheme', 'KJM承認'],
  userControlsBadge: 'ユーザー管理',
  dataRightsTitle: 'データに関する権利と管理',
  dataRightsDesc: 'データの処理方法は、当社が処理者として機能するか管理者として機能するか、組織の設定、適用法によって異なります。',
  rightsQuestion: '自分の情報に対してどのような権利がありますか？',
  rightsIntro: 'あなたには次の権利がある場合があります。',
  rightsBullets: ['個人情報へアクセスする', '不正確または古い情報を訂正する', '情報の削除を要求する', '情報のポータブルなコピーを受け取る'],
  manageQuestion: 'どこで自分のデータを確認・管理できますか？',
  manageAnswer: '消費者データポータルにアクセスして記録を確認し、ファイルを請求したり、GDPR/CCPAに基づく構造化された削除を調整したりできます。',
  submitDsr: 'データ主体リクエストを送信',
  retentionQuestion: 'データはどれくらい保持されますか？',
  retentionAnswer: '保持期間は組織と適用される法的要件によって異なります。不正防止、コンプライアンス、金融規制上の義務を満たすため、一定期間の保持が必要な場合があります。',
  deleteQuestion: 'データを削除するにはどうすればよいですか？',
  deleteAnswer: 'プライバシーポータルからリクエストを送信してください。当社はリクエストを確認し、本人性を確認し、一致結果を調べます。その後、データを削除するか、データの処理方法に応じて適切な組織へリクエストを転送します。',
  contactQuestion: 'プライバシーに関する質問は誰に連絡できますか？',
  contactAnswerPrefix: 'Identraのプライバシー実務についての質問、またはカスタムCCPA問い合わせをセキュリティ責任者へ直接送る場合は、以下のプライバシーポータルリンクを使うか、次のメールアドレスへ連絡してください',
  closeDocument: '文書を閉じる',
  portalTitle: '消費者プライバシーポータル',
  portalIntro: 'この安全なポータルを使って、確認記録の構造化コピーを請求したり、GDPR/CCPAに基づく削除を依頼したりできます。',
  requestType: 'リクエスト種別',
  requestOptions: ['確認済みデータファイルを取得する（アクセス）', '本人確認チェックを削除する', '個人記録を訂正 / 更新する'],
  fullName: '氏名',
  fullNamePlaceholder: '山田 太郎',
  emailAddress: 'メールアドレス',
  emailPlaceholder: 'taro.yamada@example.com',
  partnerOrg: '提携組織名',
  partnerOrgPlaceholder: '例: Robinhood、Cozy Rentals',
  submitPrivacyRequest: 'プライバシーリクエストを送信',
  requestSubmitted: 'リクエストを送信しました',
  requestSubmittedDesc: 'リクエストはIdentraの内部プライバシー確認フローに安全に登録されました。ご提供いただいたメールアドレス宛に3〜5営業日以内に通知します。',
  returnToPage: 'ページに戻る',
  notices: sharedLocalizedNotices.ja
};

PRIVACY_PAGE_TRANSLATIONS.de = {
  heroBadge: 'Vertrauen und Transparenz',
  identraInitial: 'P',
  heroTitleLine1: 'Ihre Identität zählt.',
  heroTitleLine2: 'Ihre Privatsphäre auch.',
  heroDesc: 'Identitätsprüfung erfordert das Teilen personenbezogener Informationen. Sie sollten sehen und verstehen können, wie diese Informationen verarbeitet werden.',
  heroSubdesc: 'Wenn Sie sich mit Identra verifizieren, werden Ihre Daten für einen bestimmten Zweck genutzt, durch Sicherheitsmaßnahmen geschützt und innerhalb definierter Grenzen aufbewahrt.',
  manageData: 'Daten verwalten',
  verifyTitle: 'Wie wir Identität verifizieren',
  idvQuestion: 'Warum gibt es Identitätsverifizierung (IDV)?',
  idvIntro: 'Viele Online-Dienste verifizieren Identität, um:',
  idvBullets: ['Betrug und Identitätsmissbrauch zu verhindern', 'Finanz-, Sicherheits- oder altersbezogene Vorschriften einzuhalten', 'Nutzer und Plattformintegrität zu schützen'],
  roleQuestion: 'Welche Rolle hat Identra, wenn eine Organisation mich zur Identitätsprüfung auffordert?',
  roleP1: 'Identra handelt überwiegend als Auftragsverarbeiter. Das bedeutet, dass wir Informationen im Auftrag der Organisation verarbeiten, mit der Sie interagieren, und nur zur Bereitstellung der angeforderten Identitätsprüfung und verwandter Dienste.',
  roleP2: 'In begrenzten Fällen, etwa bei Identra Wallet, kann Identra als Verantwortlicher handeln. Das bedeutet, dass wir nach geltendem Datenschutzrecht entscheiden, wie Ihre Informationen verarbeitet werden.',
  collectQuestion: 'Welche personenbezogenen Informationen kann Identra erfassen?',
  collectIntro: 'Wir erfassen nur, was zur Bereitstellung des angeforderten Dienstes erforderlich ist. Dazu können gehören:',
  collectBullets: ['Informationen, die Sie angeben, etwa Name, Kontaktdaten und Bilder amtlicher Ausweise', 'Fotos oder Videos, die Sie hochladen, etwa für Gesichtserkennung und liveness-Prüfung', 'Geräte- oder technische Daten wie IP-Adresse oder Browsersignale', 'Daten aus Drittquellen, sofern sie in Verifizierungsprüfungen verwendet werden'],
  useQuestion: 'Wie verwendet Identra meine Daten?',
  useAnswer: 'Wir verwenden Ihre Informationen nur, um die von der Organisation angeforderten Verifizierungs- oder Betrugspräventionsprüfungen abzuschließen. Wir verwenden Ihre personenbezogenen Informationen nicht für Marketing und verkaufen sie nicht an Dritte.',
  howVerificationWorks: 'So funktioniert Verifizierung',
  collectionTitle: 'Erfassung',
  collectionDesc: 'Sie übermitteln Informationen in einem sicheren Verifizierungsflow. Je nach Anforderungen der Organisation für Compliance, Vertrauen oder Sicherheit kann dies einen amtlichen Ausweis, ein Selfie, Unternehmensdetails oder andere Informationen umfassen.',
  securePortal: 'Sicheres Identitätsportal',
  encrypted: 'Verschlüsselt',
  scanGovId: 'Amtlichen Ausweis scannen',
  scanGovIdHint: 'Platzieren Sie die Vorderseite des Ausweises innerhalb der Kamerahilfslinien',
  securePipeline: 'Identra schützt Übertragungskanäle mit TLS-Verschlüsselung nach ISO 27001.',
  processingTitle: 'Verarbeitung',
  processingDesc: 'Identra verwendet sichere automatisierte Systeme und vordefinierte Regeln, um Ihre Informationen zu verifizieren. Je nach Anforderungen der Organisation kann dies den Abgleich mit Betrugssignalen und vertrauenswürdigen Quellen wie öffentlichen Registern umfassen.',
  processingPipeline: 'ID-VERARBEITUNGSPIPELINE',
  analyzingDoc: 'Dokument wird analysiert...',
  running: 'Wird ausgeführt',
  docAuthenticityCheck: 'Prüfung der Dokumentechtheit',
  pass: 'BESTANDEN',
  crossMatch: 'Namensabgleich mit Datenbankeinträgen',
  match: 'TREFFER',
  biometricMatch: 'Biometrischer Selfie-Abgleich',
  matchPercent: '99,4% Treffer',
  aiAccuracyNote: 'Der Abgleich nutzt strenge automatisierte Suchroutinen. KI wird ausschließlich zur Genauigkeit eingesetzt, niemals für unaufgefordertes Training.',
  outcomeTitle: 'Ergebnis',
  outcomeDesc1: 'Wir geben ein Ergebnis an das Unternehmen zurück, das Sie zur Verifizierung aufgefordert hat. Dieses Ergebnis kann einen Status, zum Beispiel "verifiziert" oder "nicht verifiziert", sowie relevante Signale oder unterstützende Informationen gemäß Konfiguration und Anwendungsfall enthalten.',
  outcomeDesc2: 'Das Unternehmen kann auf die von Ihnen eingereichten Informationen sowie auf Ihren Verifizierungsstatus und verwandte Informationen zugreifen. In manchen Flows, etwa Relay, ist der Zugriff auf Informationen jedoch begrenzt.',
  outcomeNote: 'Ihre Informationen werden nicht über die Verifizierung hinaus geteilt oder weiterverwendet.',
  decisionDiscovery: 'ENTSCHEIDUNGSÜBERSICHT',
  applicant: 'Antragsteller',
  verified: 'Verifiziert',
  companyPortal: 'Unternehmensportal',
  decisionClear: 'Automatisierte Entscheidungspipeline freigegeben',
  decisionClearDesc: 'Ergebnis sicher an die Kundenplattform übertragen. In öffentlich zugänglichen Cache-Knoten werden keine Daten gespeichert.',
  overviewTitle: 'Datenschutzübersicht',
  navItems: [
    { id: 'verify-identity', label: 'Wie wir Identität verifizieren' },
    { id: 'privacy-by-default', label: 'Datenschutz standardmäßig' },
    { id: 'safeguard', label: 'Wie wir Ihre Daten schützen' },
    { id: 'data-rights', label: 'Ihre Datenrechte und Kontrolle' }
  ],
  privacyNoticesTitle: 'Datenschutzhinweise',
  privacyNoticesSubtitle: 'Dokumente und Leitlinien',
  read: 'Lesen',
  privacyDefaultTitle: 'Datenschutz standardmäßig',
  privacyDefaultDesc: 'Datenschutz und Datensicherheit sind zentral für unsere Arbeitsweise. Wir verkaufen oder teilen keine personenbezogenen Daten, die zu Verifizierungszwecken verarbeitet werden, und verwenden personenbezogene Daten nicht außerhalb des in unserer Datenschutzrichtlinie beschriebenen Umfangs.',
  privacyQa: [
    { q: 'Verkauft oder teilt Identra meine Daten?', a: 'Nein. Identra verkauft keine personenbezogenen Daten und vermittelt sie nicht an Dritte. Datenschutz und Datensicherheit sind zentral für unsere Arbeitsweise.' },
    { q: 'Werden meine Daten zum Training von KI-Modellen verwendet?', a: 'Nein. Wir verwenden Ihre personenbezogenen Daten nicht für KI- oder Modelltraining.' },
    { q: 'Wer hat Zugriff auf meine Daten?', a: 'Der Zugriff ist auf automatisierte Systeme und autorisierte Mitarbeitende unter strengen rollenbasierten Kontrollen begrenzt. Eine menschliche Prüfung erfolgt nur, wenn sie von der Organisation konfiguriert wurde, mit der Sie interagieren, und unterliegt Audit und Aufsicht.' },
    { q: 'Wie arbeitet Identra mit Unternehmen zusammen?', a: 'Wir arbeiten mit Organisationen verschiedener Branchen zusammen, die sichere Identitätsprüfung und Sicherheit benötigen. Wir legen keine Details zu Kundenbeziehungen offen und teilen Nutzerdaten nur soweit dies zur Bereitstellung unserer Dienste erforderlich ist.' },
    { q: 'Wie viele Daten muss ich bereitstellen?', a: 'Wir erfassen die minimal erforderlichen Daten und bewerten fortlaufend die Auswirkungen unserer Verarbeitung auf den Datenschutz, um unsere Praktiken zu verbessern.' },
    { q: 'Wie schützt Identra meine Daten?', a: 'Wir verwenden branchenübliche Schutzmaßnahmen wie Verschlüsselung, sichere Speicherung und Zugriffskontrollen, um Ihre Informationen während der Verarbeitung zu schützen. Diese Maßnahmen spiegeln unser sicherheitsorientiertes Design und unsere Compliance-Rahmen wider.' }
  ],
  safeguardBadge: 'Gehärtete Standards',
  safeguardTitle: 'Wie wir Ihre Daten schützen',
  safeguardDesc: 'Neben der Begrenzung der Datennutzung wenden wir mehrschichtige Schutzmaßnahmen an, während Daten verarbeitet und gespeichert werden.',
  safeguards: [
    { title: 'Verschlüsselung bei Übertragung und Speicherung', desc: 'Ihre Informationen werden während der Übertragung und Speicherung verschlüsselt, um unbefugten Zugriff zu verhindern.' },
    { title: 'Eingeschränkter Systemzugriff', desc: 'Wir begrenzen den Zugriff auf sensible Daten durch Single Sign-On, protokollierten Zugriff und rollenbasierte Berechtigungen, die wir regelmäßig überprüfen.' },
    { title: 'Überwachte Infrastruktur', desc: 'Wir überwachen unsere Systeme kontinuierlich auf ungewöhnliche Aktivitäten und nutzen Warnmeldungen sowie Reaktionsprozesse, um schnell zu handeln.' },
    { title: 'Sichere Hosting-Umgebung', desc: 'Verifizierungsdienste laufen auf sicherer Cloud-Infrastruktur, die mit physischen, netzwerkbezogenen und betrieblichen Schutzmaßnahmen gestaltet ist.' },
    { title: 'Laufende Sicherheitsprüfung', desc: 'Wir führen regelmäßige interne Reviews und externe Bewertungen durch, um unsere Sicherheitskontrollen im Laufe der Zeit zu bewerten und zu verbessern.' },
    { title: 'Passkeys für Identra Wallet', desc: 'Informationen in Identra Wallet werden verschlüsselt und durch passkeys geschützt, eine passwortlose Authentifizierungsmethode, die auf Ihrem Gerät durch Face ID abgesichert ist, sodass nur Sie sie entsperren können.' }
  ],
  industryStandards: 'BRANCHENSTANDARDS',
  securityCoreTitle: 'Sicherheit und Datenschutz im Kern',
  securityCoreDesc: 'Sicherheit und Datenschutz sind entscheidend für eine vertrauensvolle Beziehung. Deshalb erfüllt Identra höchste Branchenstandards, ist entsprechend zertifiziert und verpflichtet sich zum Schutz Ihrer Privatsphäre.',
  certs: ['CCPA', 'GDPR', 'AICPA SOC 2 Type II', 'ISO 27001', 'HIPAA-konform', 'PCI DSS', 'FERPA', 'Kantara (NIST SP 800-63)', 'Age Check Certification Scheme', 'KJM-genehmigt'],
  userControlsBadge: 'Nutzerkontrollen',
  dataRightsTitle: 'Ihre Datenrechte und Kontrolle',
  dataRightsDesc: 'Wie wir Ihre Daten verarbeiten, hängt davon ab, ob wir als Auftragsverarbeiter oder Verantwortlicher handeln, von der Konfiguration der Organisation und vom geltenden Recht.',
  rightsQuestion: 'Welche Rechte habe ich in Bezug auf meine Informationen?',
  rightsIntro: 'Sie können das Recht haben:',
  rightsBullets: ['Auf Ihre personenbezogenen Informationen zuzugreifen', 'Unrichtige oder veraltete Informationen zu korrigieren', 'Die Löschung Ihrer Informationen zu verlangen', 'Eine übertragbare Kopie Ihrer Informationen zu erhalten'],
  manageQuestion: 'Wo kann ich meine Daten finden und verwalten?',
  manageAnswer: 'Besuchen Sie unser Verbraucherdatenportal, um Datensätze zu prüfen, Dateien anzufordern oder strukturierte Löschungen nach GDPR/CCPA in Ihrem Namen zu koordinieren.',
  submitDsr: 'Anfrage betroffener Person senden',
  retentionQuestion: 'Wie lange werden meine Daten aufbewahrt?',
  retentionAnswer: 'Aufbewahrungsfristen variieren je nach Organisation und geltenden gesetzlichen Anforderungen. In manchen Fällen müssen Daten für einen bestimmten Zeitraum gespeichert werden, um Pflichten zur Betrugsprävention, Compliance oder Finanzregulierung zu erfüllen.',
  deleteQuestion: 'Wie lösche ich meine Daten?',
  deleteAnswer: 'Senden Sie eine Anfrage über das Datenschutzportal. Wir prüfen Ihre Anfrage, verifizieren Ihre Identität und suchen nach Treffern. Anschließend löschen wir Ihre Daten oder leiten die Anfrage an die passende Organisation weiter, abhängig davon, wie Ihre Daten verarbeitet wurden.',
  contactQuestion: 'An wen kann ich mich bei Datenschutzfragen wenden?',
  contactAnswerPrefix: 'Für Fragen zu Identras Datenschutzpraktiken oder zum direkten Einreichen individueller CCPA-Anfragen an unseren Sicherheitsbeauftragten nutzen Sie den Link zum Datenschutzportal unten oder schreiben Sie an',
  closeDocument: 'Dokument schließen',
  portalTitle: 'Verbraucher-Datenschutzportal',
  portalIntro: 'Nutzen Sie dieses sichere Portal, um eine strukturierte Kopie Ihrer Verifizierungsdatensätze anzufordern oder eine Löschung nach GDPR/CCPA zu beantragen.',
  requestType: 'Anfragetyp',
  requestOptions: ['Meine verifizierte Datendatei abrufen (Zugriff)', 'Meine Identitätsverifizierungsprüfungen löschen', 'Personenbezogene Datensätze korrigieren / aktualisieren'],
  fullName: 'Vollständiger Name',
  fullNamePlaceholder: 'Max Mustermann',
  emailAddress: 'E-Mail-Adresse',
  emailPlaceholder: 'max.mustermann@example.com',
  partnerOrg: 'Name der Partnerorganisation',
  partnerOrgPlaceholder: 'z. B. Robinhood, Cozy Rentals',
  submitPrivacyRequest: 'Datenschutzanfrage senden',
  requestSubmitted: 'Anfrage gesendet',
  requestSubmittedDesc: 'Ihre Anfrage wurde sicher in Identras internen Datenschutz-Verifizierungsprozess eingereiht. Wir benachrichtigen Sie innerhalb von 3 bis 5 Werktagen unter der angegebenen E-Mail-Adresse.',
  returnToPage: 'Zur Seite zurückkehren',
  notices: sharedLocalizedNotices.de
};

PRIVACY_PAGE_TRANSLATIONS.vi.notices = sharedLocalizedNotices.vi;
