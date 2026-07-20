/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FooterLanguage = 'en' | 'es' | 'ja' | 'de' | 'vi';

export type FooterTextKey =
  | 'readyToStart'
  | 'readyToStartDesc'
  | 'getDemo'
  | 'tryItNow'
  | 'platform'
  | 'verifications'
  | 'riskReports'
  | 'useCases'
  | 'industries'
  | 'businessGoals'
  | 'resources'
  | 'company'
  | 'developers'
  | 'platformOverview'
  | 'dynamicFlow'
  | 'relay'
  | 'flowEditor'
  | 'passiveSignals'
  | 'caseManagement'
  | 'graph'
  | 'workflows'
  | 'copilot'
  | 'identraMarketplace'
  | 'governmentId'
  | 'documentAi'
  | 'selfieLiveness'
  | 'selfieRecognition'
  | 'databaseChecks'
  | 'phoneEmail'
  | 'mobileDriversLicense'
  | 'nfc'
  | 'watchlists'
  | 'adverseMedia'
  | 'profileReport'
  | 'phoneEmailRisk'
  | 'addressLookup'
  | 'socialMediaLookup'
  | 'amlKycCompliance'
  | 'shareableKyc'
  | 'kyb'
  | 'businessFraudPrevention'
  | 'ageAssurance'
  | 'candidateVerification'
  | 'workforceIdv'
  | 'backgroundChecks'
  | 'reverification'
  | 'manualReview'
  | 'fintech'
  | 'marketplaces'
  | 'digitalHealth'
  | 'payments'
  | 'cryptocurrency'
  | 'government'
  | 'financialInstitutions'
  | 'eLearning'
  | 'higherEducation'
  | 'compliance'
  | 'trustSafety'
  | 'fraudPrevention'
  | 'globalExpansion'
  | 'blog'
  | 'ebooksReports'
  | 'research'
  | 'webinarsVideos'
  | 'identityGlossary'
  | 'helpCenter'
  | 'caseStudies'
  | 'identraAcademy'
  | 'aboutUs'
  | 'pricing'
  | 'login'
  | 'contactUs'
  | 'industryRecognition'
  | 'events'
  | 'earlyCareers'
  | 'careers'
  | 'partnerWithUs'
  | 'security'
  | 'awards'
  | 'documentation'
  | 'whitePaper'
  | 'apiReference'
  | 'serviceStatus'
  | 'websiteTerms'
  | 'privacyPolicy'
  | 'cookiePolicy'
  | 'doNotSell'
  | 'dataSubjectRequest'
  | 'consumerHealthPrivacy'
  | 'accessibilityStatement'
  | 'gartnerRating'
  | 'g2Reviews'
  | 'slogan'
  | 'pageUnavailableNotice'
  | 'copyright';

export const FOOTER_TRANSLATIONS: Record<FooterLanguage, Record<FooterTextKey, string>> = {
  en: {
    readyToStart: 'Ready to get started?',
    readyToStartDesc: "Let's build a safer, more human internet together.",
    getDemo: 'Get a demo',
    tryItNow: 'Try it now',
    platform: 'Platform',
    verifications: 'Verifications',
    riskReports: 'Risk & Reports',
    useCases: 'Use Cases',
    industries: 'Industries',
    businessGoals: 'Business Goals',
    resources: 'Resources',
    company: 'Company',
    developers: 'Developers',
    platformOverview: 'Platform Overview',
    dynamicFlow: 'Dynamic Flow',
    relay: 'Relay',
    flowEditor: 'Flow Editor',
    passiveSignals: 'Passive signals',
    caseManagement: 'Case management',
    graph: 'Graph',
    workflows: 'Workflows',
    copilot: 'Copilot',
    identraMarketplace: 'Identra Marketplace',
    governmentId: 'Government ID',
    documentAi: 'Document AI',
    selfieLiveness: 'Selfie liveness',
    selfieRecognition: 'Selfie recognition',
    databaseChecks: 'Database checks',
    phoneEmail: 'Phone & email',
    mobileDriversLicense: "Mobile driver's license",
    nfc: 'NFC',
    watchlists: 'Watchlists',
    adverseMedia: 'Adverse media',
    profileReport: 'Profile report',
    phoneEmailRisk: 'Phone & email risk',
    addressLookup: 'Address lookup',
    socialMediaLookup: 'Social media lookup',
    amlKycCompliance: 'AML/KYC compliance',
    shareableKyc: 'Shareable KYC',
    kyb: 'Know Your Business (KYB)',
    businessFraudPrevention: 'Business fraud prevention',
    ageAssurance: 'Age assurance',
    candidateVerification: 'Candidate verification',
    workforceIdv: 'Workforce IDV',
    backgroundChecks: 'Background checks',
    reverification: 'Reverification',
    manualReview: 'Manual review',
    fintech: 'Fintech',
    marketplaces: 'Marketplaces',
    digitalHealth: 'Digital health',
    payments: 'Payments',
    cryptocurrency: 'Cryptocurrency',
    government: 'Government',
    financialInstitutions: 'Financial institutions',
    eLearning: 'E-learning',
    higherEducation: 'Higher education',
    compliance: 'Compliance',
    trustSafety: 'Trust & safety',
    fraudPrevention: 'Fraud prevention',
    globalExpansion: 'Global expansion',
    blog: 'Blog',
    ebooksReports: 'E-books & reports',
    research: 'Research',
    webinarsVideos: 'Webinars & videos',
    identityGlossary: 'Identity glossary',
    helpCenter: 'Help center',
    caseStudies: 'Case studies',
    identraAcademy: 'Identra Academy',
    aboutUs: 'About us',
    pricing: 'Pricing',
    login: 'Login',
    contactUs: 'Contact us',
    industryRecognition: 'Industry recognition',
    events: 'Events',
    earlyCareers: 'Early careers',
    careers: 'Careers',
    partnerWithUs: 'Partner with us',
    security: 'Security',
    awards: 'Awards',
    documentation: 'Documentation',
    whitePaper: 'White Paper',
    apiReference: 'API reference',
    serviceStatus: 'Service status',
    websiteTerms: 'Website terms of service',
    privacyPolicy: 'Privacy policy',
    cookiePolicy: 'Cookie policy',
    doNotSell: 'Do not sell or share my personal info',
    dataSubjectRequest: 'Data subject request',
    consumerHealthPrivacy: 'Consumer health privacy',
    accessibilityStatement: 'Identra website accessibility statement',
    gartnerRating: '4.7 via Gartner Peer Insights™',
    g2Reviews: 'Read our reviews on G2 • Recommended Industry Standard Leader 2026',
    slogan: 'Humanizing online identity',
    pageUnavailableNotice: 'This page is not available yet. Please check back later.',

    copyright: '© 2026 Identra Identities, Inc. All rights reserved.'
  },
  es: {
    readyToStart: '¿Listo para comenzar?',
    readyToStartDesc: 'Construyamos juntos un internet más seguro y más humano.',
    getDemo: 'Solicitar una demo',
    tryItNow: 'Probar ahora',
    platform: 'Plataforma',
    verifications: 'Verificaciones',
    riskReports: 'Riesgo e informes',
    useCases: 'Casos de uso',
    industries: 'Sectores',
    businessGoals: 'Objetivos empresariales',
    resources: 'Recursos',
    company: 'Empresa',
    developers: 'Desarrolladores',
    platformOverview: 'Resumen de la plataforma',
    dynamicFlow: 'Dynamic Flow',
    relay: 'Relay',
    flowEditor: 'Editor de flujos',
    passiveSignals: 'Señales pasivas',
    caseManagement: 'Gestión de casos',
    graph: 'Graph',
    workflows: 'Flujos de trabajo',
    copilot: 'Copilot',
    identraMarketplace: 'Marketplace de Identra',
    governmentId: 'Identificación oficial',
    documentAi: 'Document AI',
    selfieLiveness: 'Prueba de vida con selfie',
    selfieRecognition: 'Reconocimiento por selfie',
    databaseChecks: 'Comprobaciones de bases de datos',
    phoneEmail: 'Teléfono y correo electrónico',
    mobileDriversLicense: 'Licencia de conducir móvil',
    nfc: 'NFC',
    watchlists: 'Listas de vigilancia',
    adverseMedia: 'Medios adversos',
    profileReport: 'Informe de perfil',
    phoneEmailRisk: 'Riesgo de teléfono y correo',
    addressLookup: 'Búsqueda de dirección',
    socialMediaLookup: 'Búsqueda en redes sociales',
    amlKycCompliance: 'Cumplimiento AML/KYC',
    shareableKyc: 'KYC compartible',
    kyb: 'Conozca su negocio (KYB)',
    businessFraudPrevention: 'Prevención de fraude empresarial',
    ageAssurance: 'Verificación de edad',
    candidateVerification: 'Verificación de candidatos',
    workforceIdv: 'IDV para personal',
    backgroundChecks: 'Verificaciones de antecedentes',
    reverification: 'Reverificación',
    manualReview: 'Revisión manual',
    fintech: 'Fintech',
    marketplaces: 'Mercados',
    digitalHealth: 'Salud digital',
    payments: 'Pagos',
    cryptocurrency: 'Criptomonedas',
    government: 'Gobierno',
    financialInstitutions: 'Instituciones financieras',
    eLearning: 'Aprendizaje en línea',
    higherEducation: 'Educación superior',
    compliance: 'Cumplimiento',
    trustSafety: 'Confianza y seguridad',
    fraudPrevention: 'Prevención de fraude',
    globalExpansion: 'Expansión global',
    blog: 'Blog',
    ebooksReports: 'E-books e informes',
    research: 'Investigación',
    webinarsVideos: 'Webinars y videos',
    identityGlossary: 'Glosario de identidad',
    helpCenter: 'Centro de ayuda',
    caseStudies: 'Casos de estudio',
    identraAcademy: 'Academia Identra',
    aboutUs: 'Sobre nosotros',
    pricing: 'Precios',
    login: 'Iniciar sesión',
    contactUs: 'Contacto',
    industryRecognition: 'Reconocimiento del sector',
    events: 'Eventos',
    earlyCareers: 'Primeros pasos profesionales',
    careers: 'Empleo',
    partnerWithUs: 'Asociarse con nosotros',
    security: 'Seguridad',
    awards: 'Premios',
    documentation: 'Documentación',
    whitePaper: 'Libro Blanco',
    apiReference: 'Referencia de API',
    serviceStatus: 'Estado del servicio',
    websiteTerms: 'Términos de servicio del sitio web',
    privacyPolicy: 'Política de privacidad',
    cookiePolicy: 'Política de cookies',
    doNotSell: 'No vender ni compartir mi información personal',
    dataSubjectRequest: 'Solicitud del titular de datos',
    consumerHealthPrivacy: 'Privacidad de salud del consumidor',
    accessibilityStatement: 'Declaración de accesibilidad del sitio web de Identra',
    gartnerRating: '4,7 en Gartner Peer Insights™',
    g2Reviews: 'Lea nuestras reseñas en G2 • Líder recomendado como estándar del sector 2026',
    slogan: 'Humanizando la identidad en línea',
    pageUnavailableNotice: 'Esta página aún no está disponible. Vuelve a consultarla más tarde.',

    copyright: '© 2026 Identra Identities, Inc. Todos los derechos reservados.'
  },
  ja: {
    readyToStart: '始める準備はできましたか？',
    readyToStartDesc: 'より安全で、より人間らしいインターネットを一緒につくりましょう。',
    getDemo: 'デモを依頼',
    tryItNow: '今すぐ試す',
    platform: 'プラットフォーム',
    verifications: '本人確認',
    riskReports: 'リスクとレポート',
    useCases: 'ユースケース',
    industries: '業界',
    businessGoals: 'ビジネス目標',
    resources: 'リソース',
    company: '会社情報',
    developers: '開発者向け',
    platformOverview: 'プラットフォーム概要',
    dynamicFlow: 'Dynamic Flow',
    relay: 'Relay',
    flowEditor: 'フローエディター',
    passiveSignals: 'パッシブシグナル',
    caseManagement: 'ケース管理',
    graph: 'Graph',
    workflows: 'ワークフロー',
    copilot: 'Copilot',
    identraMarketplace: 'Identra Marketplace',
    governmentId: '公的身分証',
    documentAi: 'Document AI',
    selfieLiveness: '自撮りライブネス',
    selfieRecognition: '自撮り認識',
    databaseChecks: 'データベース照合',
    phoneEmail: '電話番号とメール',
    mobileDriversLicense: 'モバイル運転免許証',
    nfc: 'NFC',
    watchlists: 'ウォッチリスト',
    adverseMedia: 'ネガティブメディア',
    profileReport: 'プロフィールレポート',
    phoneEmailRisk: '電話番号とメールのリスク',
    addressLookup: '住所検索',
    socialMediaLookup: 'ソーシャルメディア検索',
    amlKycCompliance: 'AML/KYCコンプライアンス',
    shareableKyc: '共有可能なKYC',
    kyb: '法人確認（KYB）',
    businessFraudPrevention: '法人不正防止',
    ageAssurance: '年齢確認',
    candidateVerification: '候補者確認',
    workforceIdv: '従業員IDV',
    backgroundChecks: 'バックグラウンドチェック',
    reverification: '再確認',
    manualReview: '手動レビュー',
    fintech: 'フィンテック',
    marketplaces: 'マーケットプレイス',
    digitalHealth: 'デジタルヘルス',
    payments: '決済',
    cryptocurrency: '暗号資産',
    government: '政府機関',
    financialInstitutions: '金融機関',
    eLearning: 'オンライン学習',
    higherEducation: '高等教育',
    compliance: 'コンプライアンス',
    trustSafety: '信頼と安全',
    fraudPrevention: '不正防止',
    globalExpansion: 'グローバル展開',
    blog: 'ブログ',
    ebooksReports: 'Eブックとレポート',
    research: '調査・研究',
    webinarsVideos: 'ウェビナーと動画',
    identityGlossary: '本人確認用語集',
    helpCenter: 'ヘルプセンター',
    caseStudies: '事例',
    identraAcademy: 'Identra Academy',
    aboutUs: '会社概要',
    pricing: '料金',
    login: 'ログイン',
    contactUs: 'お問い合わせ',
    industryRecognition: '業界での評価',
    events: 'イベント',
    earlyCareers: '新卒・若手採用',
    careers: '採用情報',
    partnerWithUs: 'パートナーになる',
    security: 'セキュリティ',
    awards: '受賞歴',
    documentation: 'ドキュメント',
    whitePaper: 'ホワイトペーパー',
    apiReference: 'APIリファレンス',
    serviceStatus: 'サービスステータス',
    websiteTerms: 'Webサイト利用規約',
    privacyPolicy: 'プライバシーポリシー',
    cookiePolicy: 'Cookieポリシー',
    doNotSell: '個人情報を販売または共有しない',
    dataSubjectRequest: 'データ主体リクエスト',
    consumerHealthPrivacy: '消費者健康情報のプライバシー',
    accessibilityStatement: 'Identra Webサイトのアクセシビリティ声明',
    gartnerRating: 'Gartner Peer Insights™で4.7',
    g2Reviews: 'G2のレビューを見る • 2026年推奨業界標準リーダー',
    slogan: 'オンライン本人確認に人間らしさを',
    pageUnavailableNotice: 'このページはまだ利用できません。しばらくしてからもう一度ご確認ください。',

    copyright: '© 2026 Identra Identities, Inc. 無断転載を禁じます。'
  },
  de: {
    readyToStart: 'Bereit loszulegen?',
    readyToStartDesc: 'Lassen Sie uns gemeinsam ein sichereres und menschlicheres Internet schaffen.',
    getDemo: 'Demo anfordern',
    tryItNow: 'Jetzt ausprobieren',
    platform: 'Plattform',
    verifications: 'Verifizierungen',
    riskReports: 'Risiko & Berichte',
    useCases: 'Anwendungsfälle',
    industries: 'Branchen',
    businessGoals: 'Geschäftsziele',
    resources: 'Ressourcen',
    company: 'Unternehmen',
    developers: 'Entwickler',
    platformOverview: 'Plattformübersicht',
    dynamicFlow: 'Dynamic Flow',
    relay: 'Relay',
    flowEditor: 'Flow-Editor',
    passiveSignals: 'Passive Signale',
    caseManagement: 'Fallmanagement',
    graph: 'Graph',
    workflows: 'Workflows',
    copilot: 'Copilot',
    identraMarketplace: 'Identra Marketplace',
    governmentId: 'Amtlicher Ausweis',
    documentAi: 'Document AI',
    selfieLiveness: 'Selfie-Liveness',
    selfieRecognition: 'Selfie-Erkennung',
    databaseChecks: 'Datenbankprüfungen',
    phoneEmail: 'Telefon & E-Mail',
    mobileDriversLicense: 'Mobiler Führerschein',
    nfc: 'NFC',
    watchlists: 'Watchlists',
    adverseMedia: 'Negative Medien',
    profileReport: 'Profilbericht',
    phoneEmailRisk: 'Telefon- & E-Mail-Risiko',
    addressLookup: 'Adresssuche',
    socialMediaLookup: 'Social-Media-Suche',
    amlKycCompliance: 'AML/KYC-Compliance',
    shareableKyc: 'Teilbares KYC',
    kyb: 'Unternehmensprüfung (KYB)',
    businessFraudPrevention: 'Betrugsprävention für Unternehmen',
    ageAssurance: 'Altersnachweis',
    candidateVerification: 'Kandidatenverifizierung',
    workforceIdv: 'Workforce-IDV',
    backgroundChecks: 'Hintergrundprüfungen',
    reverification: 'Re-Verifizierung',
    manualReview: 'Manuelle Prüfung',
    fintech: 'Fintech',
    marketplaces: 'Marktplätze',
    digitalHealth: 'Digitale Gesundheit',
    payments: 'Zahlungen',
    cryptocurrency: 'Kryptowährungen',
    government: 'Behörden',
    financialInstitutions: 'Finanzinstitute',
    eLearning: 'E-Learning',
    higherEducation: 'Hochschulbildung',
    compliance: 'Compliance',
    trustSafety: 'Vertrauen & Sicherheit',
    fraudPrevention: 'Betrugsprävention',
    globalExpansion: 'Globale Expansion',
    blog: 'Blog',
    ebooksReports: 'E-Books & Berichte',
    research: 'Forschung',
    webinarsVideos: 'Webinare & Videos',
    identityGlossary: 'Glossar zur Identität',
    helpCenter: 'Hilfezentrum',
    caseStudies: 'Fallstudien',
    identraAcademy: 'Identra Academy',
    aboutUs: 'Über uns',
    pricing: 'Preise',
    login: 'Anmelden',
    contactUs: 'Kontakt',
    industryRecognition: 'Branchenanerkennung',
    events: 'Events',
    earlyCareers: 'Berufseinstieg',
    careers: 'Karriere',
    partnerWithUs: 'Partner werden',
    security: 'Sicherheit',
    awards: 'Auszeichnungen',
    documentation: 'Dokumentation',
    whitePaper: 'Whitepaper',
    apiReference: 'API-Referenz',
    serviceStatus: 'Dienststatus',
    websiteTerms: 'Nutzungsbedingungen der Website',
    privacyPolicy: 'Datenschutzrichtlinie',
    cookiePolicy: 'Cookie-Richtlinie',
    doNotSell: 'Meine personenbezogenen Daten nicht verkaufen oder teilen',
    dataSubjectRequest: 'Anfrage der betroffenen Person',
    consumerHealthPrivacy: 'Gesundheitsdatenschutz für Verbraucher',
    accessibilityStatement: 'Erklärung zur Barrierefreiheit der Identra-Website',
    gartnerRating: '4,7 über Gartner Peer Insights™',
    g2Reviews: 'Lesen Sie unsere Bewertungen auf G2 • Empfohlener Branchenstandard-Leader 2026',
    slogan: 'Online-Identität menschlicher machen',
    pageUnavailableNotice: 'Diese Seite ist noch nicht verfügbar. Bitte schauen Sie später wieder vorbei.',

    copyright: '© 2026 Identra Identities, Inc. Alle Rechte vorbehalten.'
  },
  vi: {
    readyToStart: 'Sẵn sàng bắt đầu?',
    readyToStartDesc: 'Hãy cùng xây dựng một internet an toàn hơn và nhân văn hơn.',
    getDemo: 'Yêu cầu demo',
    tryItNow: 'Thử ngay',
    platform: 'Nền tảng',
    verifications: 'Xác minh',
    riskReports: 'Rủi ro & Báo cáo',
    useCases: 'Trường hợp sử dụng',
    industries: 'Lĩnh vực',
    businessGoals: 'Mục tiêu kinh doanh',
    resources: 'Tài nguyên',
    company: 'Công ty',
    developers: 'Nhà phát triển',
    platformOverview: 'Tổng quan nền tảng',
    dynamicFlow: 'Dynamic Flow',
    relay: 'Relay',
    flowEditor: 'Trình chỉnh sửa luồng',
    passiveSignals: 'Tín hiệu thụ động',
    caseManagement: 'Quản lý hồ sơ',
    graph: 'Graph',
    workflows: 'Quy trình',
    copilot: 'Copilot',
    identraMarketplace: 'Identra Marketplace',
    governmentId: 'Giấy tờ tùy thân',
    documentAi: 'Document AI',
    selfieLiveness: 'Tính sống của selfie',
    selfieRecognition: 'Nhận dạng selfie',
    databaseChecks: 'Kiểm tra cơ sở dữ liệu',
    phoneEmail: 'Điện thoại & email',
    mobileDriversLicense: 'Bằng lái xe di động',
    nfc: 'NFC',
    watchlists: 'Danh sách theo dõi',
    adverseMedia: 'Truyền thông bất lợi',
    profileReport: 'Báo cáo hồ sơ',
    phoneEmailRisk: 'Rủi ro điện thoại & email',
    addressLookup: 'Tra cứu địa chỉ',
    socialMediaLookup: 'Tra cứu mạng xã hội',
    amlKycCompliance: 'Tuân thủ AML/KYC',
    shareableKyc: 'KYC có thể chia sẻ',
    kyb: 'Xác minh doanh nghiệp (KYB)',
    businessFraudPrevention: 'Ngăn chặn gian lận doanh nghiệp',
    ageAssurance: 'Đảm bảo độ tuổi',
    candidateVerification: 'Xác minh ứng viên',
    workforceIdv: 'IDV cho lực lượng lao động',
    backgroundChecks: 'Kiểm tra lý lịch',
    reverification: 'Xác minh lại',
    manualReview: 'Xem xét thủ công',
    fintech: 'Công nghệ tài chính',
    marketplaces: 'Sàn giao dịch',
    digitalHealth: 'Y tế số',
    payments: 'Thanh toán',
    cryptocurrency: 'Tiền mã hóa',
    government: 'Chính phủ',
    financialInstitutions: 'Tổ chức tài chính',
    eLearning: 'Học trực tuyến',
    higherEducation: 'Giáo dục đại học',
    compliance: 'Tuân thủ',
    trustSafety: 'Tin cậy & An toàn',
    fraudPrevention: 'Ngăn chặn gian lận',
    globalExpansion: 'Mở rộng toàn cầu',
    blog: 'Blog',
    ebooksReports: 'Sách điện tử & báo cáo',
    research: 'Nghiên cứu',
    webinarsVideos: 'Hội thảo trực tuyến & video',
    identityGlossary: 'Thuật ngữ danh tính',
    helpCenter: 'Trung tâm trợ giúp',
    caseStudies: 'Nghiên cứu điển hình',
    identraAcademy: 'Identra Academy',
    aboutUs: 'Về chúng tôi',
    pricing: 'Bảng giá',
    login: 'Đăng nhập',
    contactUs: 'Liên hệ',
    industryRecognition: 'Công nhận trong ngành',
    events: 'Sự kiện',
    earlyCareers: 'Khởi đầu sự nghiệp',
    careers: 'Tuyển dụng',
    partnerWithUs: 'Hợp tác với chúng tôi',
    security: 'Bảo mật',
    awards: 'Giải thưởng',
    documentation: 'Tài liệu',
    whitePaper: 'Sách trắng Identra',
    apiReference: 'Tài liệu tham chiếu API',
    serviceStatus: 'Trạng thái dịch vụ',
    websiteTerms: 'Điều khoản dịch vụ website',
    privacyPolicy: 'Chính sách quyền riêng tư',
    cookiePolicy: 'Chính sách cookie',
    doNotSell: 'Không bán hoặc chia sẻ thông tin cá nhân của tôi',
    dataSubjectRequest: 'Yêu cầu của chủ thể dữ liệu',
    consumerHealthPrivacy: 'Quyền riêng tư sức khỏe người tiêu dùng',
    accessibilityStatement: 'Tuyên bố khả năng truy cập website Identra',
    gartnerRating: '4,7 trên Gartner Peer Insights™',
    g2Reviews: 'Đọc đánh giá của chúng tôi trên G2 • Dẫn đầu tiêu chuẩn ngành được khuyến nghị năm 2026',
    slogan: 'Nhân văn hóa danh tính trực tuyến',
    pageUnavailableNotice: 'Trang này chưa khả dụng. Vui lòng quay lại sau.',

    copyright: '© 2026 Identra Identities, Inc. Bảo lưu mọi quyền.'
  }
};

export const FOOTER_SECTIONS = [
  {
    titleKey: 'platform',
    titleView: 'platform',
    wide: true,
    links: [
      { key: 'platformOverview', view: 'platform' },
      { key: 'dynamicFlow', view: 'dynamic-flow' },
      { key: 'relay', view: 'relay' },
      { key: 'flowEditor', view: 'dynamic-flow' },
      { key: 'passiveSignals', view: 'passive-signals' },
      { key: 'caseManagement', view: 'case-management' },
      { key: 'graph', view: 'graph' },
      { key: 'workflows', view: 'workflows' },
      { key: 'copilot', view: 'copilot' },
      { key: 'identraMarketplace', view: 'platform' }
    ]
  },
  {
    titleKey: 'verifications',
    wide: true,
    links: [
      { key: 'governmentId', view: 'government-id' },
      { key: 'documentAi', view: 'document-ai' },
      { key: 'selfieLiveness', view: 'selfie-age-estimation' },
      { key: 'selfieRecognition', view: 'selfie-recognition' },
      { key: 'databaseChecks', view: 'database-checks' },
      { key: 'phoneEmail', view: 'phone-email' },
      { key: 'mobileDriversLicense', view: 'mobile-drivers-license' },
      { key: 'nfc', view: 'nfc' }
    ]
  },
  {
    titleKey: 'riskReports',
    links: [
      { key: 'watchlists', view: 'watchlists' },
      { key: 'adverseMedia', view: 'adverse-media' },
      { key: 'profileReport', view: 'profile-report' },
      { key: 'phoneEmailRisk', view: 'phone-email-risk' },
      { key: 'addressLookup', view: 'address-lookup' },
      { key: 'socialMediaLookup', view: 'social-media-lookup' }
    ]
  },
  {
    titleKey: 'useCases',
    links: [
      { key: 'amlKycCompliance', view: 'compliance' },
      { key: 'shareableKyc', view: 'connect' },
      { key: 'kyb', view: 'kyb' },
      { key: 'businessFraudPrevention', view: 'business-fraud' },
      { key: 'ageAssurance', view: 'age-assurance' },
      { key: 'candidateVerification', view: 'candidate-verification' },
      { key: 'workforceIdv', view: 'workforce-idv' },
      { key: 'backgroundChecks', view: 'background-checks' },
      { key: 'reverification', view: 'reverification' },
      { key: 'manualReview', view: 'manual-review' }
    ]
  },
  {
    titleKey: 'industries',
    links: [
      { key: 'fintech', view: 'fintech' },
      { key: 'marketplaces', view: 'marketplaces' },
      { key: 'digitalHealth', view: 'digital-health' },
      { key: 'payments', view: 'payments' },
      { key: 'cryptocurrency', view: 'cryptocurrency' },
      { key: 'government', view: 'government' },
      { key: 'financialInstitutions', view: 'financial-institutions' },
      { key: 'eLearning', view: 'e-learning' },
      { key: 'higherEducation', view: 'higher-education' }
    ]
  },
  {
    titleKey: 'businessGoals',
    links: [
      { key: 'compliance', view: 'compliance-goal' },
      { key: 'trustSafety', view: 'trust' },
      { key: 'fraudPrevention', view: 'fraud-prevent' },
      { key: 'globalExpansion', view: 'global-expansion' }
    ]
  },
  {
    titleKey: 'resources',
    links: [
      { key: 'blog', view: 'blog' },
      { key: 'whitePaper', view: 'white-paper' },
      { key: 'ebooksReports', view: 'ebooks' },
      { key: 'research', view: 'research' },
      { key: 'webinarsVideos' },
      { key: 'identityGlossary' },
      { key: 'helpCenter' },
      { key: 'caseStudies', view: 'customers' },
      { key: 'identraAcademy' }
    ]
  },
  {
    titleKey: 'company',
    links: [
      { key: 'aboutUs', view: 'about' },
      { key: 'pricing', view: 'pricing' },
      { key: 'login', view: 'login' },
      { key: 'contactUs', view: 'contact' },
      { key: 'industryRecognition' },
      { key: 'events', view: 'events' },
      { key: 'earlyCareers', view: 'careers' },
      { key: 'careers', view: 'careers' },
      { key: 'partnerWithUs', view: 'partners' },
      { key: 'security', view: 'security' },
      { key: 'awards' }
    ]
  },
  {
    titleKey: 'developers',
    compact: true,
    links: [
      { key: 'documentation', view: 'docs' },
      { key: 'whitePaper', view: 'white-paper' },
      { key: 'apiReference' },
      { key: 'serviceStatus' }
    ]
  }
] as const satisfies readonly {
  titleKey: FooterTextKey;
  titleView?: string;
  wide?: boolean;
  compact?: boolean;
  links: readonly { key: FooterTextKey; view?: string }[];
}[];

export const FOOTER_LEGAL_LINKS = [
  { key: 'websiteTerms' },
  { key: 'privacyPolicy', view: 'privacy-overview' },
  { key: 'cookiePolicy' },
  { key: 'doNotSell', view: 'privacy-overview' },
  { key: 'dataSubjectRequest', view: 'privacy-overview' },
  { key: 'consumerHealthPrivacy' },
  { key: 'accessibilityStatement' }
] as const satisfies readonly { key: FooterTextKey; view?: string }[];
