/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Language } from '../context/LanguageContext';

const en = {
  copy: {
    featuredBlogPosts: 'Featured blog posts',
    figure1IdentityMap: 'Figure 1: Identity Trust Map',
    challengers: 'Reactive',
    leaders: 'Adaptive',
    nichePlayers: 'Manual',
    visionaries: 'Predictive',
    depthOfSignals: 'Depth of Signals',
    operationalReadiness: 'Operational Readiness',
    blog: 'Blog',
    text8MinRead: '8 min read',
    featuredTitle: 'Adaptive identity verification: how trust teams reduce fraud without adding friction',
    featuredDescription: 'Explore how modern identity teams combine documents, biometrics, passive signals, and review workflows to keep good users moving while suspicious sessions get the right checks.',
    readTheArticle: 'Read the article',
    resourceCenter: 'Resource center',
    allBlogPosts: 'All blog posts',
    searchBlogPosts: 'Search blog posts...',
    topics: 'Topics',
    showLess: 'Show less',
    show4More: 'Show 4 more',
    industries: 'Industries',
    show9More: 'Show 9 more',
    noBlogPostsFound: 'No blog posts found',
    noResultsDescription: 'We could not find any blog posts matching "{query}". Try clearing your search query or selecting other filters.',
    selectedFilters: 'the selected filters',
    clearAllFilters: 'Clear all filters',
    readyToGetStarted: 'Ready to get started?',
    readyDescription: 'Talk with our identity specialists or try the interactive sandbox to see these trust patterns in action.',
    tryTheDemo: 'Try the demo',
    tryItNow: 'Try it now',
    blogLibraryVol3: 'Blog Library - Vol. 3',
    freeAccess: 'Free Access',
    articleFormat: 'Article Format',
    registrationPrompt: 'Fill out the quick registration form below to open this article in our high-fidelity online reader.',
    firstName: 'First Name',
    jane: 'Jane',
    lastName: 'Last Name',
    doe: 'Doe',
    businessEmail: 'Business Email',
    janeDoeCompanyCom: 'jane.doe@company.com',
    companyName: 'Company Name',
    acmeCorp: 'Acme Corp',
    processing: 'Processing...',
    getInstantAccess: 'Get instant access',
    secureArticleReader: 'Simulated Secure Article Reader',
    successMessage: 'Success! "{title}" has been saved.',
    save: 'Save',
    securedByIdentra: 'SECURED BY IDENTRA',
    edition: 'Edition',
    publishedByIdentra: 'Published by Identra Technologies, Inc.',
    documentHash: 'Document Hash: 0x8a92f...7e402b',
    publishedPeriod: 'H1 2026',
    chapter01: 'Chapter 01',
    executiveSummary: 'Executive Summary & Key Ideas',
    theEvolvingLandscape: 'The Evolving Landscape',
    readerParagraph1: 'Identity fraud is no longer a single failed check. It appears across devices, networks, documents, biometrics, behavioral patterns, and account histories.',
    readerParagraph2: 'The strongest programs coordinate signals quietly, then request more proof only when the risk context requires it.',
    h12026KeySignals: 'H1 2026 Key Signals',
    selfieFraudFrequency: 'Selfie fraud frequency',
    deepfakeSpoofsTotal: 'Deepfake spoof share',
    nfcAcceptanceConversion: 'NFC conversion lift',
    metric1Value: '+18.4% YoY',
    metric2Value: '34.1% of bypass attempts',
    metric3Value: '+42.6% lift',
    chapter02: 'Chapter 02',
    multiLayeredSignalsMatrix: 'Multi-Layered Signals Matrix',
    readerParagraph3: 'Relying on a document image alone lets organized fraud groups tune around a single control. Better defense orchestrates passive context with active verification.',
    signalCategory: 'Signal Category',
    threatFlagVector: 'Threat Flag Vector',
    remediationAction: 'Remediation Action',
    ipNetwork: 'IP & Network',
    hostingIpsDataCenterVpns: 'Hosting IPs and data-center VPNs',
    injectPassiveLivenessRequest: 'Inject passive liveness request',
    deviceFingerprint: 'Device Fingerprint',
    headlessBrowserEmulatorSignatures: 'Headless browser or emulator signatures',
    requireMobileAppNfcStep: 'Require mobile app NFC step',
    typingBehavior: 'Typing Behavior',
    instantPastedFormFieldsBots: 'Instant pasted form fields',
    triggerMultiStepReviewCases: 'Trigger multi-step review cases',
    chapter03: 'Chapter 03',
    trustArchitectureChecklist: 'Actionable Trust Architecture Checklist',
    checklistIntro: 'Check the boxes below to assess how ready your current identity program is for adaptive risk decisions:',
    conclusion: 'Conclusion',
    establishingAdaptiveTrust: 'Establishing Adaptive Trust',
    readerConclusion1: 'Trust programs work best when conversion, fraud prevention, compliance, and operations share the same identity context.',
    readerConclusion2: 'Move toward a signals-based identity platform that can adapt as user behavior, regulations, and attack methods change.',
    tryIdentraInteractiveSandbox: 'Try Identra Interactive Sandbox',
    closeArticle: 'Close article',
    thankYouForReading: 'Thank you for reading, {name}!',
    identraWordmark: 'identra',
    closeModal: 'Close article dialog',
    clearSearch: 'Clear search',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    decreaseZoom: 'Decrease zoom',
    increaseZoom: 'Increase zoom'
  },
  posts: {
    'blog-1': {
      title: 'Adaptive identity verification: how trust teams reduce fraud without adding friction',
      type: 'Blog',
      description: 'A practical look at combining document checks, liveness, device signals, and review workflows into one adaptive identity strategy.',
      duration: '8 min read'
    },
    'blog-2': {
      title: 'What passive signals reveal before a user submits an ID',
      type: 'Blog',
      description: 'Learn how network, device, and behavior context can help teams spot high-risk sessions earlier in the onboarding journey.',
      duration: '6 min read'
    },
    'blog-3': {
      title: 'Designing KYC flows that keep good users moving',
      type: 'Blog',
      description: 'How compliance teams use progressive friction to meet KYC obligations while protecting conversion and user trust.',
      duration: '7 min read'
    },
    'blog-4': {
      title: 'A field guide to synthetic identity patterns',
      type: 'Blog',
      description: 'Common signs of synthetic identities, from mismatched signals to shared infrastructure and suspicious account relationships.',
      duration: '9 min read'
    },
    'blog-5': {
      title: 'Why NFC and mobile IDs are changing document verification',
      type: 'Blog',
      description: 'A plain-language overview of cryptographic document checks and why they raise confidence beyond visual inspection.',
      duration: '8 min read'
    },
    'blog-6': {
      title: 'How review teams prioritize cases with identity graph context',
      type: 'Blog',
      description: 'See how linked entities, repeated devices, and shared contact data help investigators focus on the riskiest cases first.',
      duration: '6 min read'
    },
    'blog-7': {
      title: 'Age assurance without over-collecting personal data',
      type: 'Blog',
      description: 'Privacy-minded approaches for proving eligibility while minimizing sensitive data collection and storage.',
      duration: '7 min read'
    },
    'blog-8': {
      title: 'Preparing marketplaces for modern seller verification',
      type: 'Blog',
      description: 'A checklist for onboarding merchants, verifying beneficial ownership, and reducing seller-side fraud at scale.',
      duration: '10 min read'
    },
    'blog-9': {
      title: 'Five signals that help detect account takeover attempts',
      type: 'Blog',
      description: 'From SIM swap clues to device changes, these risk indicators help teams catch suspicious access before damage spreads.',
      duration: '5 min read'
    },
    'blog-10': {
      title: 'Global onboarding: what changes when identity crosses borders',
      type: 'Blog',
      description: 'How teams handle localized documents, regional databases, privacy expectations, and compliance rules in international growth.',
      duration: '11 min read'
    },
    'blog-11': {
      title: 'Building explainable automated decisions for compliance teams',
      type: 'Blog',
      description: 'How clear reason codes, audit trails, and human review paths make automated identity decisions easier to trust.',
      duration: '8 min read'
    },
    'blog-12': {
      title: 'What AI-generated fraud means for selfie verification',
      type: 'Blog',
      description: 'A current overview of deepfake threats, presentation attacks, and layered defenses for biometric verification.',
      duration: '9 min read'
    }
  },
  topicLabels: {
    all: 'All topics',
    fraud: 'Fraud',
    identity: 'Identity',
    compliance: 'Compliance',
    security: 'Security',
    privacy: 'Privacy',
    'artificial-intelligence': 'Artificial intelligence',
    'age-assurance': 'Age assurance',
    culture: 'Culture',
    international: 'International'
  },
  industryLabels: {
    all: 'All industries',
    'finance-fintech': 'Finance/fintech',
    marketplaces: 'Marketplaces',
    cryptocurrency: 'Cryptocurrency',
    'digital-health': 'Digital health',
    gaming: 'Gaming',
    government: 'Government',
    healthcare: 'Healthcare',
    education: 'Education',
    legal: 'Legal',
    'real-estate': 'Real estate',
    'retail-ecommerce': 'Retail/e-commerce',
    travel: 'Travel',
    'adult-entertainment': 'Age-gated platforms',
    dating: 'Social connection'
  },
  readerChecklist: [
    {
      key: 'signals',
      title: 'Collect passive device, network, and behavior context before adding friction',
      desc: 'Helps detect suspicious sessions while keeping low-risk users moving.'
    },
    {
      key: 'documents',
      title: 'Use document, NFC, and mobile ID checks when confidence needs to rise',
      desc: 'Escalates to stronger proof only when the session context calls for it.'
    },
    {
      key: 'graph',
      title: 'Connect shared phones, devices, IPs, and accounts in a graph view',
      desc: 'Surfaces coordinated fraud rings that single-user checks can miss.'
    },
    {
      key: 'review',
      title: 'Route uncertain decisions into a case queue with clear reason codes',
      desc: 'Gives reviewers the context they need to resolve cases quickly.'
    }
  ]
} as const;

type LocalizedShape<T> =
  T extends string ? string :
  T extends readonly (infer Item)[] ? readonly LocalizedShape<Item>[] :
  { readonly [Key in keyof T]: LocalizedShape<T[Key]> };

type BlogPageTranslation = LocalizedShape<typeof en>;

const es = {
  copy: {
    featuredBlogPosts: 'Artículos destacados',
    figure1IdentityMap: 'Figura 1: mapa de confianza de identidad',
    challengers: 'Reactivo',
    leaders: 'Adaptativo',
    nichePlayers: 'Manual',
    visionaries: 'Predictivo',
    depthOfSignals: 'Profundidad de señales',
    operationalReadiness: 'Preparación operativa',
    blog: 'Blog',
    text8MinRead: 'Lectura de 8 min',
    featuredTitle: 'Verificación de identidad adaptativa: cómo reducir el fraude sin añadir fricción',
    featuredDescription: 'Descubre cómo los equipos modernos combinan documentos, biometría, señales pasivas y flujos de revisión para mantener avanzando a los buenos usuarios y aplicar los controles adecuados a sesiones sospechosas.',
    readTheArticle: 'Leer el artículo',
    resourceCenter: 'Centro de recursos',
    allBlogPosts: 'Todos los artículos',
    searchBlogPosts: 'Buscar artículos...',
    topics: 'Temas',
    showLess: 'Mostrar menos',
    show4More: 'Mostrar 4 más',
    industries: 'Sectores',
    show9More: 'Mostrar 9 más',
    noBlogPostsFound: 'No se encontraron artículos',
    noResultsDescription: 'No encontramos artículos que coincidan con "{query}". Prueba a borrar la búsqueda o elegir otros filtros.',
    selectedFilters: 'los filtros seleccionados',
    clearAllFilters: 'Borrar todos los filtros',
    readyToGetStarted: '¿Listo para comenzar?',
    readyDescription: 'Habla con nuestros especialistas en identidad o prueba el entorno interactivo para ver estos patrones de confianza en acción.',
    tryTheDemo: 'Probar la demo',
    tryItNow: 'Probar ahora',
    blogLibraryVol3: 'Biblioteca del blog - Vol. 3',
    freeAccess: 'Acceso gratuito',
    articleFormat: 'Formato de artículo',
    registrationPrompt: 'Completa el breve formulario para abrir este artículo en nuestro lector en línea de alta fidelidad.',
    firstName: 'Nombre',
    jane: 'Jane',
    lastName: 'Apellido',
    doe: 'Doe',
    businessEmail: 'Correo profesional',
    janeDoeCompanyCom: 'jane.doe@company.com',
    companyName: 'Empresa',
    acmeCorp: 'Acme Corp',
    processing: 'Procesando...',
    getInstantAccess: 'Obtener acceso inmediato',
    secureArticleReader: 'Lector seguro de artículos simulado',
    successMessage: '¡Listo! "{title}" se guardó correctamente.',
    save: 'Guardar',
    securedByIdentra: 'PROTEGIDO POR IDENTRA',
    edition: 'Edición',
    publishedByIdentra: 'Publicado por Identra Technologies, Inc.',
    documentHash: 'Hash del documento: 0x8a92f...7e402b',
    publishedPeriod: 'H1 2026',
    chapter01: 'Capítulo 01',
    executiveSummary: 'Resumen ejecutivo e ideas clave',
    theEvolvingLandscape: 'El panorama en evolución',
    readerParagraph1: 'El fraude de identidad ya no se manifiesta como un único control fallido. Aparece en dispositivos, redes, documentos, biometría, comportamiento e historiales de cuenta.',
    readerParagraph2: 'Los programas más sólidos coordinan señales de forma silenciosa y piden más pruebas solo cuando el contexto de riesgo lo exige.',
    h12026KeySignals: 'Señales clave de H1 2026',
    selfieFraudFrequency: 'Frecuencia de fraude con selfie',
    deepfakeSpoofsTotal: 'Proporción de deepfakes',
    nfcAcceptanceConversion: 'Mejora de conversión con NFC',
    metric1Value: '+18,4 % interanual',
    metric2Value: '34,1 % de intentos de evasión',
    metric3Value: '+42,6 % de mejora',
    chapter02: 'Capítulo 02',
    multiLayeredSignalsMatrix: 'Matriz de señales multicapa',
    readerParagraph3: 'Depender solo de la imagen del documento permite que grupos organizados ajusten sus ataques contra un único control. Una defensa mejor coordina contexto pasivo con verificación activa.',
    signalCategory: 'Categoría de señal',
    threatFlagVector: 'Vector de amenaza',
    remediationAction: 'Acción de remediación',
    ipNetwork: 'IP y red',
    hostingIpsDataCenterVpns: 'IP de hosting y VPN de centros de datos',
    injectPassiveLivenessRequest: 'Solicitar prueba de vida pasiva',
    deviceFingerprint: 'Huella del dispositivo',
    headlessBrowserEmulatorSignatures: 'Firmas de navegador sin interfaz o emulador',
    requireMobileAppNfcStep: 'Solicitar paso NFC en app móvil',
    typingBehavior: 'Comportamiento de escritura',
    instantPastedFormFieldsBots: 'Campos pegados de forma instantánea',
    triggerMultiStepReviewCases: 'Activar casos de revisión en varios pasos',
    chapter03: 'Capítulo 03',
    trustArchitectureChecklist: 'Lista práctica de arquitectura de confianza',
    checklistIntro: 'Marca las casillas para evaluar si tu programa de identidad está preparado para decisiones de riesgo adaptativas:',
    conclusion: 'Conclusión',
    establishingAdaptiveTrust: 'Establecer confianza adaptativa',
    readerConclusion1: 'Los programas de confianza funcionan mejor cuando conversión, prevención de fraude, cumplimiento y operaciones comparten el mismo contexto de identidad.',
    readerConclusion2: 'Avanza hacia una plataforma de identidad basada en señales que pueda adaptarse a medida que cambian usuarios, regulaciones y ataques.',
    tryIdentraInteractiveSandbox: 'Probar el entorno interactivo de Identra',
    closeArticle: 'Cerrar artículo',
    thankYouForReading: 'Gracias por leer, {name}.',
    identraWordmark: 'identra',
    closeModal: 'Cerrar diálogo del artículo',
    clearSearch: 'Borrar búsqueda',
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente',
    decreaseZoom: 'Reducir zoom',
    increaseZoom: 'Aumentar zoom'
  },
  posts: {
    'blog-1': {
      title: 'Verificación de identidad adaptativa: cómo reducir el fraude sin añadir fricción',
      type: 'Blog',
      description: 'Una mirada práctica a cómo combinar documentos, prueba de vida, señales de dispositivo y revisión en una estrategia de identidad adaptativa.',
      duration: '8 min'
    },
    'blog-2': {
      title: 'Qué revelan las señales pasivas antes de que un usuario envíe un ID',
      type: 'Blog',
      description: 'Cómo el contexto de red, dispositivo y comportamiento ayuda a detectar sesiones de alto riesgo desde el inicio del registro.',
      duration: '6 min'
    },
    'blog-3': {
      title: 'Diseñar flujos KYC que mantengan avanzando a los buenos usuarios',
      type: 'Blog',
      description: 'Cómo los equipos de cumplimiento usan fricción progresiva para cumplir KYC sin dañar conversión ni confianza.',
      duration: '7 min'
    },
    'blog-4': {
      title: 'Guía práctica de patrones de identidad sintética',
      type: 'Blog',
      description: 'Señales comunes de identidades sintéticas, desde señales discordantes hasta infraestructura compartida.',
      duration: '9 min'
    },
    'blog-5': {
      title: 'Por qué NFC y los IDs móviles están cambiando la verificación documental',
      type: 'Blog',
      description: 'Una explicación clara de las verificaciones criptográficas de documentos y por qué superan la inspección visual.',
      duration: '8 min'
    },
    'blog-6': {
      title: 'Cómo los equipos de revisión priorizan casos con contexto de grafo',
      type: 'Blog',
      description: 'Entidades conectadas, dispositivos repetidos y datos compartidos ayudan a investigar primero los casos más riesgosos.',
      duration: '6 min'
    },
    'blog-7': {
      title: 'Age assurance sin recopilar datos personales en exceso',
      type: 'Blog',
      description: 'Enfoques de privacidad para probar elegibilidad minimizando datos sensibles.',
      duration: '7 min'
    },
    'blog-8': {
      title: 'Preparar plataformas de compraventa para la verificación moderna de vendedores',
      type: 'Blog',
      description: 'Lista de verificación para incorporar comercios, verificar beneficiarios reales y reducir fraude de vendedores.',
      duration: '10 min'
    },
    'blog-9': {
      title: 'Cinco señales que ayudan a detectar intentos de toma de cuenta',
      type: 'Blog',
      description: 'De pistas de SIM swap a cambios de dispositivo: indicadores para detectar accesos sospechosos.',
      duration: '5 min'
    },
    'blog-10': {
      title: 'Alta global: qué cambia cuando la identidad cruza fronteras',
      type: 'Blog',
      description: 'Documentos locales, bases de datos regionales, privacidad y reglas de cumplimiento en expansión internacional.',
      duration: '11 min'
    },
    'blog-11': {
      title: 'Crear decisiones automatizadas explicables para cumplimiento',
      type: 'Blog',
      description: 'Códigos de motivo, auditoría y revisión humana hacen más confiables las decisiones automatizadas.',
      duration: '8 min'
    },
    'blog-12': {
      title: 'Qué significa el fraude generado por IA para la verificación con selfie',
      type: 'Blog',
      description: 'Un panorama actual de deepfakes, ataques de presentación y defensas multicapa.',
      duration: '9 min'
    }
  },
  topicLabels: {
    all: 'Todos los temas',
    fraud: 'Fraude',
    identity: 'Identidad',
    compliance: 'Cumplimiento',
    security: 'Seguridad',
    privacy: 'Privacidad',
    'artificial-intelligence': 'Inteligencia artificial',
    'age-assurance': 'Verificación de edad',
    culture: 'Cultura',
    international: 'Internacional'
  },
  industryLabels: {
    all: 'Todos los sectores',
    'finance-fintech': 'Finanzas/fintech',
    marketplaces: 'Plataformas de compraventa',
    cryptocurrency: 'Criptomonedas',
    'digital-health': 'Salud digital',
    gaming: 'Gaming',
    government: 'Gobierno',
    healthcare: 'Salud',
    education: 'Educación',
    legal: 'Legal',
    'real-estate': 'Bienes raíces',
    'retail-ecommerce': 'Retail/e-commerce',
    travel: 'Viajes',
    'adult-entertainment': 'Plataformas con restricción de edad',
    dating: 'Conexión social'
  },
  readerChecklist: [
    {
      key: 'signals',
      title: 'Recolectar contexto pasivo de dispositivo, red y comportamiento antes de añadir fricción',
      desc: 'Ayuda a detectar sesiones sospechosas mientras los usuarios de bajo riesgo avanzan.'
    },
    {
      key: 'documents',
      title: 'Usar documentos, NFC e ID móvil cuando se necesita más confianza',
      desc: 'Escala a pruebas más fuertes solo cuando el contexto de la sesión lo requiere.'
    },
    {
      key: 'graph',
      title: 'Conectar teléfonos, dispositivos, IP y cuentas compartidas en una vista de grafo',
      desc: 'Revela redes de fraude coordinadas que los controles individuales pueden pasar por alto.'
    },
    {
      key: 'review',
      title: 'Enviar decisiones inciertas a una cola con códigos de motivo claros',
      desc: 'Da a los revisores el contexto necesario para resolver casos con rapidez.'
    }
  ]
} satisfies BlogPageTranslation;

const ja = {
  copy: {
    featuredBlogPosts: '注目のブログ記事',
    figure1IdentityMap: '図1: アイデンティティ信頼マップ',
    challengers: 'リアクティブ',
    leaders: 'アダプティブ',
    nichePlayers: '手動',
    visionaries: '予測型',
    depthOfSignals: 'シグナルの深さ',
    operationalReadiness: '運用の準備度',
    blog: 'ブログ',
    text8MinRead: '8分で読めます',
    featuredTitle: '適応型本人確認: 不正を減らしながら摩擦を増やさない方法',
    featuredDescription: 'ドキュメント、生体認証、パッシブシグナル、レビューワークフローを組み合わせ、信頼できるユーザーは進め、不審なセッションには適切な確認を行う方法を紹介します。',
    readTheArticle: '記事を読む',
    resourceCenter: 'リソースセンター',
    allBlogPosts: 'すべてのブログ記事',
    searchBlogPosts: 'ブログ記事を検索...',
    topics: 'トピック',
    showLess: '表示を減らす',
    show4More: 'さらに4件表示',
    industries: '業界',
    show9More: 'さらに9件表示',
    noBlogPostsFound: 'ブログ記事が見つかりません',
    noResultsDescription: '"{query}" に一致するブログ記事は見つかりませんでした。検索条件を消すか、別のフィルターを選んでください。',
    selectedFilters: '選択したフィルター',
    clearAllFilters: 'すべてのフィルターをクリア',
    readyToGetStarted: '始める準備はできましたか？',
    readyDescription: 'アイデンティティの専門家に相談するか、インタラクティブサンドボックスで信頼パターンを体験してください。',
    tryTheDemo: 'デモを試す',
    tryItNow: '今すぐ試す',
    blogLibraryVol3: 'ブログライブラリ - Vol. 3',
    freeAccess: '無料アクセス',
    articleFormat: '記事形式',
    registrationPrompt: '簡単な登録フォームに入力すると、高精細オンラインリーダーでこの記事を開けます。',
    firstName: '名',
    jane: 'Jane',
    lastName: '姓',
    doe: 'Doe',
    businessEmail: '会社メール',
    janeDoeCompanyCom: 'jane.doe@company.com',
    companyName: '会社名',
    acmeCorp: 'Acme Corp',
    processing: '処理中...',
    getInstantAccess: 'すぐにアクセス',
    secureArticleReader: '安全な記事リーダーのシミュレーション',
    successMessage: '完了しました。「{title}」を保存しました。',
    save: '保存',
    securedByIdentra: 'IDENTRA により保護',
    edition: '版',
    publishedByIdentra: 'Identra Technologies, Inc. 発行',
    documentHash: 'ドキュメントハッシュ: 0x8a92f...7e402b',
    publishedPeriod: '2026年上半期',
    chapter01: '第01章',
    executiveSummary: 'エグゼクティブサマリーと重要ポイント',
    theEvolvingLandscape: '変化する環境',
    readerParagraph1: 'アイデンティティ不正は、単一のチェック失敗だけではありません。デバイス、ネットワーク、文書、生体認証、行動、アカウント履歴にまたがって現れます。',
    readerParagraph2: '強いプログラムはシグナルを静かに連携し、リスク文脈が必要なときだけ追加証明を求めます。',
    h12026KeySignals: '2026年上半期の主要シグナル',
    selfieFraudFrequency: 'セルフィー不正の頻度',
    deepfakeSpoofsTotal: 'ディープフェイク偽装の割合',
    nfcAcceptanceConversion: 'NFCコンバージョン向上',
    metric1Value: '前年比 +18.4%',
    metric2Value: '回避試行の34.1%',
    metric3Value: '+42.6% 向上',
    chapter02: '第02章',
    multiLayeredSignalsMatrix: '多層シグナルマトリクス',
    readerParagraph3: '文書画像だけに頼ると、組織的な不正グループが単一の制御に合わせて攻撃を調整できます。より良い防御では、パッシブな文脈とアクティブな確認を組み合わせます。',
    signalCategory: 'シグナルカテゴリ',
    threatFlagVector: '脅威フラグ',
    remediationAction: '対応アクション',
    ipNetwork: 'IPとネットワーク',
    hostingIpsDataCenterVpns: 'ホスティングIPとデータセンターVPN',
    injectPassiveLivenessRequest: 'パッシブライブネスを要求',
    deviceFingerprint: 'デバイスフィンガープリント',
    headlessBrowserEmulatorSignatures: 'ヘッドレスブラウザまたはエミュレータの署名',
    requireMobileAppNfcStep: 'モバイルアプリでNFCステップを要求',
    typingBehavior: '入力行動',
    instantPastedFormFieldsBots: '即時貼り付けされたフォーム項目',
    triggerMultiStepReviewCases: '複数ステップのレビューケースを開始',
    chapter03: '第03章',
    trustArchitectureChecklist: '実践的な信頼アーキテクチャチェックリスト',
    checklistIntro: '現在のアイデンティティプログラムが適応型リスク判断にどれだけ備えているか確認してください。',
    conclusion: '結論',
    establishingAdaptiveTrust: '適応型信頼を確立する',
    readerConclusion1: '信頼プログラムは、コンバージョン、不正防止、コンプライアンス、運用が同じアイデンティティ文脈を共有するときに最も効果を発揮します。',
    readerConclusion2: 'ユーザー行動、規制、攻撃手法の変化に適応できるシグナルベースのアイデンティティ基盤へ移行しましょう。',
    tryIdentraInteractiveSandbox: 'Identraのインタラクティブ環境を試す',
    closeArticle: '記事を閉じる',
    thankYouForReading: '{name}さん、お読みいただきありがとうございます。',
    identraWordmark: 'identra',
    closeModal: '記事ダイアログを閉じる',
    clearSearch: '検索をクリア',
    previousPage: '前のページ',
    nextPage: '次のページ',
    decreaseZoom: 'ズームアウト',
    increaseZoom: 'ズームイン'
  },
  posts: {
    'blog-1': {
      title: '適応型本人確認: 不正を減らしながら摩擦を増やさない方法',
      type: 'ブログ',
      description: '文書確認、ライブネス、デバイスシグナル、レビューワークフローを組み合わせる実践的な戦略です。',
      duration: '8分'
    },
    'blog-2': {
      title: 'ユーザーがIDを提出する前にパッシブシグナルが示すこと',
      type: 'ブログ',
      description: 'ネットワーク、デバイス、行動の文脈がオンボーディング初期の高リスクセッション検知に役立つ理由。',
      duration: '6分'
    },
    'blog-3': {
      title: '良いユーザーを止めないKYCフローの設計',
      type: 'ブログ',
      description: 'コンプライアンスチームが段階的な摩擦でKYC義務とコンバージョンを両立する方法。',
      duration: '7分'
    },
    'blog-4': {
      title: '合成アイデンティティパターンのフィールドガイド',
      type: 'ブログ',
      description: '一致しないシグナル、共有インフラ、不審なアカウント関係など、合成IDのよくある兆候。',
      duration: '9分'
    },
    'blog-5': {
      title: 'NFCとモバイルIDが文書確認を変える理由',
      type: 'ブログ',
      description: '暗号学的な文書確認が目視検査を超えて信頼度を高める理由をわかりやすく解説します。',
      duration: '8分'
    },
    'blog-6': {
      title: 'アイデンティティグラフでレビューケースを優先する方法',
      type: 'ブログ',
      description: '関連エンティティ、重複デバイス、共有連絡先がリスクの高いケースの優先処理を助けます。',
      duration: '6分'
    },
    'blog-7': {
      title: '個人データを集めすぎない年齢確認',
      type: 'ブログ',
      description: '機密データの収集と保存を最小限にしながら適格性を証明するプライバシー重視の方法。',
      duration: '7分'
    },
    'blog-8': {
      title: '現代的な販売者確認に備えるマーケットプレイス',
      type: 'ブログ',
      description: '加盟店オンボーディング、実質的所有者確認、販売者側不正の削減に向けたチェックリスト。',
      duration: '10分'
    },
    'blog-9': {
      title: 'アカウント乗っ取りの検知に役立つ5つのシグナル',
      type: 'ブログ',
      description: 'SIMスワップの兆候からデバイス変更まで、被害拡大前に不審なアクセスを見つける指標。',
      duration: '5分'
    },
    'blog-10': {
      title: 'グローバルオンボーディング: 国境を越えると何が変わるか',
      type: 'ブログ',
      description: 'ローカル文書、地域データベース、プライバシー期待、国際展開時のコンプライアンス。',
      duration: '11分'
    },
    'blog-11': {
      title: 'コンプライアンスチームのための説明可能な自動判断',
      type: 'ブログ',
      description: '理由コード、監査証跡、人によるレビュー経路が、自動判断への信頼を高めます。',
      duration: '8分'
    },
    'blog-12': {
      title: 'AI生成不正がセルフィー確認にもたらす意味',
      type: 'ブログ',
      description: 'ディープフェイク、提示攻撃、生体認証における多層防御の現状を整理します。',
      duration: '9分'
    }
  },
  topicLabels: {
    all: 'すべてのトピック',
    fraud: '不正',
    identity: 'アイデンティティ',
    compliance: 'コンプライアンス',
    security: 'セキュリティ',
    privacy: 'プライバシー',
    'artificial-intelligence': '人工知能',
    'age-assurance': '年齢確認',
    culture: 'カルチャー',
    international: '国際'
  },
  industryLabels: {
    all: 'すべての業界',
    'finance-fintech': '金融/フィンテック',
    marketplaces: 'マーケットプレイス',
    cryptocurrency: '暗号資産',
    'digital-health': 'デジタルヘルス',
    gaming: 'ゲーム',
    government: '政府',
    healthcare: 'ヘルスケア',
    education: '教育',
    legal: '法務',
    'real-estate': '不動産',
    'retail-ecommerce': '小売/eコマース',
    travel: '旅行',
    'adult-entertainment': '年齢制限のあるプラットフォーム',
    dating: 'ソーシャルマッチング'
  },
  readerChecklist: [
    {
      key: 'signals',
      title: '摩擦を追加する前に、デバイス、ネットワーク、行動のパッシブ文脈を収集する',
      desc: '低リスクユーザーを進めながら、不審なセッションを検知できます。'
    },
    {
      key: 'documents',
      title: '信頼度を上げる必要があるときに文書、NFC、モバイルIDを使う',
      desc: 'セッション文脈が求める場合だけ、より強い証明へ段階的に進みます。'
    },
    {
      key: 'graph',
      title: '共有電話、デバイス、IP、アカウントをグラフビューでつなぐ',
      desc: '単体チェックでは見逃しやすい協調的不正ネットワークを明らかにします。'
    },
    {
      key: 'review',
      title: '不確実な判断を明確な理由コード付きでケースキューへ送る',
      desc: 'レビュアーが素早く判断するための文脈を提供します。'
    }
  ]
} satisfies BlogPageTranslation;

const de = {
  copy: {
    featuredBlogPosts: 'Ausgewählte Blogbeiträge',
    figure1IdentityMap: 'Abbildung 1: Vertrauenskarte für Identitäten',
    challengers: 'Reaktiv',
    leaders: 'Adaptiv',
    nichePlayers: 'Manuell',
    visionaries: 'Prädiktiv',
    depthOfSignals: 'Tiefe der Signale',
    operationalReadiness: 'Operative Bereitschaft',
    blog: 'Blog',
    text8MinRead: '8 Min. Lesezeit',
    featuredTitle: 'Adaptive Identitätsprüfung: Betrug reduzieren, ohne mehr Reibung zu erzeugen',
    featuredDescription: 'Erfahren Sie, wie moderne Identitätsteams Dokumente, Biometrie, passive Signale und Prüfabläufe kombinieren, damit gute Nutzer vorankommen und verdächtige Sitzungen passende Prüfungen erhalten.',
    readTheArticle: 'Artikel lesen',
    resourceCenter: 'Ressourcencenter',
    allBlogPosts: 'Alle Blogbeiträge',
    searchBlogPosts: 'Blogbeiträge suchen...',
    topics: 'Themen',
    showLess: 'Weniger anzeigen',
    show4More: '4 weitere anzeigen',
    industries: 'Branchen',
    show9More: '9 weitere anzeigen',
    noBlogPostsFound: 'Keine Blogbeiträge gefunden',
    noResultsDescription: 'Wir konnten keine Blogbeiträge zu "{query}" finden. Löschen Sie die Suche oder wählen Sie andere Filter.',
    selectedFilters: 'den ausgewählten Filtern',
    clearAllFilters: 'Alle Filter löschen',
    readyToGetStarted: 'Bereit loszulegen?',
    readyDescription: 'Sprechen Sie mit unseren Identitätsexperten oder testen Sie die interaktive Testumgebung, um diese Vertrauensmuster live zu sehen.',
    tryTheDemo: 'Demo testen',
    tryItNow: 'Jetzt ausprobieren',
    blogLibraryVol3: 'Blogbibliothek - Vol. 3',
    freeAccess: 'Kostenloser Zugriff',
    articleFormat: 'Artikelformat',
    registrationPrompt: 'Füllen Sie das kurze Formular aus, um diesen Artikel in unserem hochwertigen Online-Reader zu öffnen.',
    firstName: 'Vorname',
    jane: 'Jane',
    lastName: 'Nachname',
    doe: 'Doe',
    businessEmail: 'Geschäftliche E-Mail',
    janeDoeCompanyCom: 'jane.doe@company.com',
    companyName: 'Unternehmen',
    acmeCorp: 'Acme Corp',
    processing: 'Wird verarbeitet...',
    getInstantAccess: 'Sofortzugriff erhalten',
    secureArticleReader: 'Simulierter sicherer Artikel-Reader',
    successMessage: 'Erfolg! "{title}" wurde gespeichert.',
    save: 'Speichern',
    securedByIdentra: 'GESICHERT DURCH IDENTRA',
    edition: 'Ausgabe',
    publishedByIdentra: 'Veröffentlicht von Identra Technologies, Inc.',
    documentHash: 'Dokument-Hash: 0x8a92f...7e402b',
    publishedPeriod: 'H1 2026',
    chapter01: 'Kapitel 01',
    executiveSummary: 'Executive Summary & Kerngedanken',
    theEvolvingLandscape: 'Die veränderte Lage',
    readerParagraph1: 'Identitätsbetrug ist nicht mehr nur eine einzelne fehlgeschlagene Prüfung. Er zeigt sich über Geräte, Netzwerke, Dokumente, Biometrie, Verhalten und Kontohistorien hinweg.',
    readerParagraph2: 'Starke Programme koordinieren Signale leise im Hintergrund und verlangen zusätzliche Nachweise nur dann, wenn der Risikokontext es erfordert.',
    h12026KeySignals: 'Wichtige Signale H1 2026',
    selfieFraudFrequency: 'Selfie-Betrugsfrequenz',
    deepfakeSpoofsTotal: 'Anteil von Deepfake-Spoofs',
    nfcAcceptanceConversion: 'NFC-Conversion-Uplift',
    metric1Value: '+18,4 % ggü. Vorjahr',
    metric2Value: '34,1 % der Umgehungsversuche',
    metric3Value: '+42,6 % Uplift',
    chapter02: 'Kapitel 02',
    multiLayeredSignalsMatrix: 'Matrix mehrschichtiger Signale',
    readerParagraph3: 'Wer sich nur auf ein Dokumentbild verlässt, erlaubt organisierten Betrugsgruppen, sich auf eine einzelne Kontrolle einzustellen. Bessere Verteidigung verbindet passiven Kontext mit aktiver Verifizierung.',
    signalCategory: 'Signalkategorie',
    threatFlagVector: 'Bedrohungsvektor',
    remediationAction: 'Abhilfemaßnahme',
    ipNetwork: 'IP & Netzwerk',
    hostingIpsDataCenterVpns: 'Hosting-IPs und Rechenzentrums-VPNs',
    injectPassiveLivenessRequest: 'Passive Liveness-Prüfung anfordern',
    deviceFingerprint: 'Geräte-Fingerprint',
    headlessBrowserEmulatorSignatures: 'Headless-Browser- oder Emulator-Signaturen',
    requireMobileAppNfcStep: 'NFC-Schritt in der mobilen App verlangen',
    typingBehavior: 'Tippverhalten',
    instantPastedFormFieldsBots: 'Sofort eingefügte Formularfelder',
    triggerMultiStepReviewCases: 'Mehrstufige Review-Fälle auslösen',
    chapter03: 'Kapitel 03',
    trustArchitectureChecklist: 'Praktische Checkliste für Vertrauensarchitektur',
    checklistIntro: 'Markieren Sie die Punkte, um einzuschätzen, ob Ihr Identitätsprogramm für adaptive Risikoentscheidungen bereit ist:',
    conclusion: 'Fazit',
    establishingAdaptiveTrust: 'Adaptives Vertrauen aufbauen',
    readerConclusion1: 'Vertrauensprogramme funktionieren am besten, wenn Conversion, Betrugsprävention, Compliance und Betrieb denselben Identitätskontext teilen.',
    readerConclusion2: 'Gehen Sie zu einer signalbasierten Identitätsplattform über, die sich an verändertes Nutzerverhalten, neue Regeln und Angriffsmethoden anpassen kann.',
    tryIdentraInteractiveSandbox: 'Interaktive Identra-Testumgebung ausprobieren',
    closeArticle: 'Artikel schließen',
    thankYouForReading: 'Danke fürs Lesen, {name}!',
    identraWordmark: 'identra',
    closeModal: 'Artikeldialog schließen',
    clearSearch: 'Suche löschen',
    previousPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    decreaseZoom: 'Zoom verringern',
    increaseZoom: 'Zoom erhöhen'
  },
  posts: {
    'blog-1': {
      title: 'Adaptive Identitätsprüfung: Betrug reduzieren, ohne mehr Reibung zu erzeugen',
      type: 'Blog',
      description: 'Ein praktischer Blick auf Dokumentprüfungen, Lebenderkennung, Gerätesignale und Prüfabläufe in einer adaptiven Identitätsstrategie.',
      duration: '8 Min.'
    },
    'blog-2': {
      title: 'Was passive Signale zeigen, bevor ein Nutzer einen Ausweis einreicht',
      type: 'Blog',
      description: 'Wie Netzwerk-, Geräte- und Verhaltenskontext riskante Sitzungen früher bei der Registrierung sichtbar machen.',
      duration: '6 Min.'
    },
    'blog-3': {
      title: 'KYC-Flows gestalten, die gute Nutzer weiterbringen',
      type: 'Blog',
      description: 'Wie Compliance-Teams progressive Reibung einsetzen, um KYC-Pflichten und Conversion zu verbinden.',
      duration: '7 Min.'
    },
    'blog-4': {
      title: 'Ein Praxisleitfaden zu synthetischen Identitätsmustern',
      type: 'Blog',
      description: 'Typische Anzeichen synthetischer Identitäten, von widersprüchlichen Signalen bis zu geteilter Infrastruktur.',
      duration: '9 Min.'
    },
    'blog-5': {
      title: 'Warum NFC und mobile IDs die Dokumentprüfung verändern',
      type: 'Blog',
      description: 'Eine verständliche Übersicht zu kryptografischen Dokumentprüfungen und ihrem Vorteil gegenüber Sichtprüfung.',
      duration: '8 Min.'
    },
    'blog-6': {
      title: 'Wie Prüfteams Fälle mit Identitätsgraph-Kontext priorisieren',
      type: 'Blog',
      description: 'Verknüpfte Entitäten, wiederholte Geräte und geteilte Kontaktdaten lenken Ermittler zu den riskantesten Fällen.',
      duration: '6 Min.'
    },
    'blog-7': {
      title: 'Altersnachweis ohne übermäßige Erfassung personenbezogener Daten',
      type: 'Blog',
      description: 'Datenschutzorientierte Ansätze zum Nachweis der Berechtigung mit weniger sensibler Datenspeicherung.',
      duration: '7 Min.'
    },
    'blog-8': {
      title: 'Marktplätze auf moderne Verkäuferverifizierung vorbereiten',
      type: 'Blog',
      description: 'Checkliste für die Händleraufnahme, UBO-Prüfung und weniger Verkäuferbetrug in großem Maßstab.',
      duration: '10 Min.'
    },
    'blog-9': {
      title: 'Fünf Signale zur Erkennung von Account-Übernahmen',
      type: 'Blog',
      description: 'Von SIM-Swap-Hinweisen bis Gerätewechseln: Indikatoren, die verdächtigen Zugriff früh erkennen.',
      duration: '5 Min.'
    },
    'blog-10': {
      title: 'Globale Registrierung: Was sich ändert, wenn Identität Grenzen überschreitet',
      type: 'Blog',
      description: 'Lokale Dokumente, regionale Datenbanken, Datenschutz und Compliance-Regeln bei internationalem Wachstum.',
      duration: '11 Min.'
    },
    'blog-11': {
      title: 'Erklärbare automatische Entscheidungen für Compliance-Teams aufbauen',
      type: 'Blog',
      description: 'Reason Codes, Audit Trails und menschliche Review-Pfade machen automatisierte Entscheidungen vertrauenswürdiger.',
      duration: '8 Min.'
    },
    'blog-12': {
      title: 'Was KI-generierter Betrug für Selfie-Verifizierung bedeutet',
      type: 'Blog',
      description: 'Ein aktueller Überblick über Deepfakes, Presentation Attacks und mehrschichtige biometrische Verteidigung.',
      duration: '9 Min.'
    }
  },
  topicLabels: {
    all: 'Alle Themen',
    fraud: 'Betrug',
    identity: 'Identität',
    compliance: 'Compliance',
    security: 'Sicherheit',
    privacy: 'Datenschutz',
    'artificial-intelligence': 'Künstliche Intelligenz',
    'age-assurance': 'Altersnachweis',
    culture: 'Kultur',
    international: 'International'
  },
  industryLabels: {
    all: 'Alle Branchen',
    'finance-fintech': 'Finanzen/Fintech',
    marketplaces: 'Marktplätze',
    cryptocurrency: 'Kryptowährungen',
    'digital-health': 'Digitale Gesundheit',
    gaming: 'Gaming',
    government: 'Behörden',
    healthcare: 'Gesundheit',
    education: 'Bildung',
    legal: 'Recht',
    'real-estate': 'Immobilien',
    'retail-ecommerce': 'Retail/E-Commerce',
    travel: 'Reisen',
    'adult-entertainment': 'Altersbeschränkte Plattformen',
    dating: 'Soziale Vernetzung'
  },
  readerChecklist: [
    {
      key: 'signals',
      title: 'Passiven Geräte-, Netzwerk- und Verhaltenskontext erfassen, bevor Reibung entsteht',
      desc: 'Erkennt verdächtige Sitzungen, während Nutzer mit geringem Risiko weiterkommen.'
    },
    {
      key: 'documents',
      title: 'Dokumente, NFC und mobile IDs nutzen, wenn mehr Vertrauen nötig ist',
      desc: 'Steigert auf stärkere Nachweise nur dann, wenn der Sitzungskontext es verlangt.'
    },
    {
      key: 'graph',
      title: 'Geteilte Telefone, Geräte, IPs und Konten in einer Graphansicht verbinden',
      desc: 'Macht koordinierte Betrugsringe sichtbar, die Einzelprüfungen übersehen können.'
    },
    {
      key: 'review',
      title: 'Unsichere Entscheidungen mit klaren Reason Codes in eine Fallwarteschlange leiten',
      desc: 'Gibt Reviewern den Kontext, um Fälle schnell zu klären.'
    }
  ]
} satisfies BlogPageTranslation;

const vi = {
  copy: {
    featuredBlogPosts: 'Bài viết nổi bật',
    figure1IdentityMap: 'Hình 1: bản đồ niềm tin danh tính',
    challengers: 'Phản ứng chậm',
    leaders: 'Thích ứng',
    nichePlayers: 'Thủ công',
    visionaries: 'Định hướng tương lai',
    depthOfSignals: 'Độ sâu của tín hiệu',
    operationalReadiness: 'Mức sẵn sàng vận hành',
    blog: 'Blog',
    text8MinRead: 'Đọc trong 8 phút',
    featuredTitle: 'Xác minh danh tính linh hoạt: giảm gian lận mà không làm khó người dùng',
    featuredDescription: 'Tìm hiểu cách các đội ngũ danh tính hiện đại kết hợp giấy tờ, sinh trắc học, tín hiệu thụ động và quy trình xét duyệt để người dùng hợp lệ đi tiếp thuận lợi, còn phiên đáng ngờ được kiểm tra đúng mức.',
    readTheArticle: 'Đọc bài viết',
    resourceCenter: 'Trung tâm tài nguyên',
    allBlogPosts: 'Tất cả bài viết',
    searchBlogPosts: 'Tìm bài viết...',
    topics: 'Chủ đề',
    showLess: 'Thu gọn',
    show4More: 'Hiển thị thêm 4',
    industries: 'Lĩnh vực',
    show9More: 'Hiển thị thêm 9',
    noBlogPostsFound: 'Không tìm thấy bài viết',
    noResultsDescription: 'Không tìm thấy bài viết nào khớp với "{query}". Hãy xóa tìm kiếm hoặc chọn bộ lọc khác.',
    selectedFilters: 'các bộ lọc đã chọn',
    clearAllFilters: 'Xóa tất cả bộ lọc',
    readyToGetStarted: 'Sẵn sàng bắt đầu?',
    readyDescription: 'Trao đổi với chuyên gia danh tính của chúng tôi hoặc thử môi trường tương tác để xem các mô hình tin cậy này vận hành ra sao.',
    tryTheDemo: 'Trải nghiệm demo',
    tryItNow: 'Thử ngay',
    blogLibraryVol3: 'Thư viện blog - Tập 3',
    freeAccess: 'Truy cập miễn phí',
    articleFormat: 'Định dạng bài viết',
    registrationPrompt: 'Điền nhanh biểu mẫu bên dưới để mở bài viết trong trình đọc mô phỏng.',
    firstName: 'Tên',
    jane: 'Jane',
    lastName: 'Họ',
    doe: 'Doe',
    businessEmail: 'Email doanh nghiệp',
    janeDoeCompanyCom: 'jane.doe@company.com',
    companyName: 'Tên công ty',
    acmeCorp: 'Acme Corp',
    processing: 'Đang xử lý...',
    getInstantAccess: 'Truy cập ngay',
    secureArticleReader: 'Trình đọc bài viết an toàn (mô phỏng)',
    successMessage: 'Thành công! "{title}" đã được lưu.',
    save: 'Lưu',
    securedByIdentra: 'ĐƯỢC BẢO VỆ BỞI IDENTRA',
    edition: 'Ấn bản',
    publishedByIdentra: 'Xuất bản bởi Identra Technologies, Inc.',
    documentHash: 'Mã băm tài liệu: 0x8a92f...7e402b',
    publishedPeriod: 'Nửa đầu 2026',
    chapter01: 'Chương 01',
    executiveSummary: 'Tóm tắt điều hành & ý chính',
    theEvolvingLandscape: 'Bối cảnh mới',
    readerParagraph1: 'Gian lận danh tính không còn chỉ là một bước kiểm tra bị vượt qua. Nó xuất hiện đồng thời ở thiết bị, mạng, giấy tờ, sinh trắc học, hành vi và lịch sử tài khoản.',
    readerParagraph2: 'Những chương trình hiệu quả kết hợp các tín hiệu ở phía sau, rồi chỉ yêu cầu thêm bằng chứng khi mức rủi ro thật sự cần.',
    h12026KeySignals: 'Tín hiệu chính nửa đầu 2026',
    selfieFraudFrequency: 'Tần suất gian lận selfie',
    deepfakeSpoofsTotal: 'Tỷ lệ giả mạo deepfake',
    nfcAcceptanceConversion: 'Mức tăng chuyển đổi nhờ NFC',
    metric1Value: '+18,4% so với cùng kỳ',
    metric2Value: '34,1% số lần cố vượt kiểm tra',
    metric3Value: '+42,6% tăng',
    chapter02: 'Chương 02',
    multiLayeredSignalsMatrix: 'Ma trận tín hiệu nhiều lớp',
    readerParagraph3: 'Nếu chỉ dựa vào ảnh giấy tờ, các nhóm gian lận có tổ chức có thể tối ưu để vượt qua một lớp kiểm soát duy nhất. Cách phòng vệ tốt hơn là kết hợp bối cảnh thụ động với xác minh chủ động.',
    signalCategory: 'Nhóm tín hiệu',
    threatFlagVector: 'Dấu hiệu rủi ro',
    remediationAction: 'Hành động xử lý',
    ipNetwork: 'IP & mạng',
    hostingIpsDataCenterVpns: 'IP máy chủ và VPN trung tâm dữ liệu',
    injectPassiveLivenessRequest: 'Yêu cầu kiểm tra người thật thụ động',
    deviceFingerprint: 'Dấu hiệu thiết bị',
    headlessBrowserEmulatorSignatures: 'Dấu hiệu trình duyệt ẩn hoặc giả lập',
    requireMobileAppNfcStep: 'Yêu cầu bước NFC trên ứng dụng di động',
    typingBehavior: 'Cách nhập liệu',
    instantPastedFormFieldsBots: 'Trường biểu mẫu được dán tức thì',
    triggerMultiStepReviewCases: 'Chuyển sang hồ sơ xét duyệt nhiều bước',
    chapter03: 'Chương 03',
    trustArchitectureChecklist: 'Danh sách kiểm tra kiến trúc tin cậy',
    checklistIntro: 'Đánh dấu các mục bên dưới để đánh giá mức sẵn sàng của chương trình danh tính hiện tại trước các quyết định rủi ro linh hoạt:',
    conclusion: 'Kết luận',
    establishingAdaptiveTrust: 'Xây dựng mức tin cậy linh hoạt',
    readerConclusion1: 'Chương trình tin cậy hiệu quả nhất khi tăng trưởng, phòng chống gian lận, tuân thủ và vận hành cùng nhìn vào một bối cảnh danh tính thống nhất.',
    readerConclusion2: 'Hãy chuyển dần sang nền tảng danh tính dựa trên tín hiệu, có khả năng thích ứng khi hành vi người dùng, quy định và phương thức tấn công thay đổi.',
    tryIdentraInteractiveSandbox: 'Thử môi trường tương tác của Identra',
    closeArticle: 'Đóng bài viết',
    thankYouForReading: 'Cảm ơn bạn đã đọc, {name}!',
    identraWordmark: 'identra',
    closeModal: 'Đóng hộp thoại bài viết',
    clearSearch: 'Xóa tìm kiếm',
    previousPage: 'Trang trước',
    nextPage: 'Trang tiếp theo',
    decreaseZoom: 'Thu nhỏ',
    increaseZoom: 'Phóng to'
  },
  posts: {
    'blog-1': {
      title: 'Xác minh danh tính linh hoạt: giảm gian lận mà không làm khó người dùng',
      type: 'Bài viết',
      description: 'Góc nhìn thực tế về cách kết hợp kiểm tra giấy tờ, kiểm tra người thật, tín hiệu thiết bị và quy trình xét duyệt thành một chiến lược danh tính linh hoạt.',
      duration: '8 phút'
    },
    'blog-2': {
      title: 'Tín hiệu thụ động cho biết gì trước khi người dùng gửi giấy tờ',
      type: 'Bài viết',
      description: 'Cách bối cảnh mạng, thiết bị và hành vi giúp phát hiện phiên rủi ro cao ngay từ giai đoạn đăng ký.',
      duration: '6 phút'
    },
    'blog-3': {
      title: 'Thiết kế luồng KYC giúp người dùng tốt tiếp tục đi tiếp',
      type: 'Bài viết',
      description: 'Cách đội ngũ tuân thủ chỉ thêm bước kiểm tra khi cần để đáp ứng KYC mà vẫn giữ trải nghiệm liền mạch.',
      duration: '7 phút'
    },
    'blog-4': {
      title: 'Cẩm nang nhận diện các mẫu danh tính tổng hợp',
      type: 'Bài viết',
      description: 'Dấu hiệu phổ biến của danh tính tổng hợp, từ tín hiệu không khớp đến hạ tầng dùng chung và quan hệ tài khoản đáng ngờ.',
      duration: '9 phút'
    },
    'blog-5': {
      title: 'Vì sao NFC và ID di động đang thay đổi xác minh giấy tờ',
      type: 'Bài viết',
      description: 'Tổng quan dễ hiểu về kiểm tra giấy tờ bằng mật mã và lý do phương pháp này tăng độ tin cậy vượt ngoài kiểm tra trực quan.',
      duration: '8 phút'
    },
    'blog-6': {
      title: 'Cách đội xét duyệt ưu tiên hồ sơ bằng bản đồ liên kết danh tính',
      type: 'Bài viết',
      description: 'Thực thể liên quan, thiết bị lặp lại và dữ liệu liên hệ dùng chung giúp điều tra viên tập trung vào các hồ sơ có rủi ro cao nhất.',
      duration: '6 phút'
    },
    'blog-7': {
      title: 'Xác minh độ tuổi mà không thu thập quá nhiều dữ liệu cá nhân',
      type: 'Bài viết',
      description: 'Cách chứng minh điều kiện tham gia theo hướng bảo vệ quyền riêng tư và giảm lưu trữ dữ liệu nhạy cảm.',
      duration: '7 phút'
    },
    'blog-8': {
      title: 'Chuẩn bị sàn giao dịch cho quy trình xác minh người bán hiện đại',
      type: 'Bài viết',
      description: 'Danh sách kiểm tra để tiếp nhận người bán, xác minh chủ sở hữu hưởng lợi và giảm gian lận phía người bán ở quy mô lớn.',
      duration: '10 phút'
    },
    'blog-9': {
      title: 'Năm tín hiệu giúp phát hiện nỗ lực chiếm đoạt tài khoản',
      type: 'Bài viết',
      description: 'Từ dấu hiệu SIM swap đến thay đổi thiết bị, các chỉ báo này giúp phát hiện truy cập đáng ngờ trước khi thiệt hại lan rộng.',
      duration: '5 phút'
    },
    'blog-10': {
      title: 'Đăng ký người dùng toàn cầu: điều gì thay đổi khi danh tính vượt biên giới',
      type: 'Bài viết',
      description: 'Cách đội ngũ xử lý giấy tờ địa phương, cơ sở dữ liệu khu vực, kỳ vọng quyền riêng tư và quy định trong tăng trưởng quốc tế.',
      duration: '11 phút'
    },
    'blog-11': {
      title: 'Xây dựng quyết định tự động có thể giải thích cho đội tuân thủ',
      type: 'Bài viết',
      description: 'Mã lý do rõ ràng, dấu vết kiểm toán và lộ trình xét duyệt thủ công giúp quyết định tự động đáng tin cậy hơn.',
      duration: '8 phút'
    },
    'blog-12': {
      title: 'Gian lận do AI tạo sinh có ý nghĩa gì với xác minh selfie',
      type: 'Bài viết',
      description: 'Tổng quan hiện tại về deepfake, tấn công trình diện và phòng thủ nhiều lớp cho xác minh sinh trắc học.',
      duration: '9 phút'
    }
  },
  topicLabels: {
    all: 'Tất cả chủ đề',
    fraud: 'Gian lận',
    identity: 'Danh tính',
    compliance: 'Tuân thủ',
    security: 'Bảo mật',
    privacy: 'Quyền riêng tư',
    'artificial-intelligence': 'Trí tuệ nhân tạo',
    'age-assurance': 'Xác minh độ tuổi',
    culture: 'Văn hóa',
    international: 'Quốc tế'
  },
  industryLabels: {
    all: 'Tất cả lĩnh vực',
    'finance-fintech': 'Tài chính số',
    marketplaces: 'Sàn giao dịch',
    cryptocurrency: 'Tiền mã hóa',
    'digital-health': 'Y tế số',
    gaming: 'Trò chơi',
    government: 'Chính phủ',
    healthcare: 'Y tế',
    education: 'Giáo dục',
    legal: 'Pháp lý',
    'real-estate': 'Bất động sản',
    'retail-ecommerce': 'Bán lẻ/thương mại điện tử',
    travel: 'Du lịch',
    'adult-entertainment': 'Nền tảng giới hạn độ tuổi',
    dating: 'Kết nối xã hội'
  },
  readerChecklist: [
    {
      key: 'signals',
      title: 'Thu thập bối cảnh thiết bị, mạng và hành vi thụ động trước khi thêm bước kiểm tra',
      desc: 'Giúp phát hiện phiên đáng ngờ trong khi người dùng rủi ro thấp vẫn tiếp tục thuận lợi.'
    },
    {
      key: 'documents',
      title: 'Dùng giấy tờ, NFC và ID di động khi cần tăng độ tin cậy',
      desc: 'Chỉ nâng lên bằng chứng mạnh hơn khi bối cảnh phiên thực sự yêu cầu.'
    },
    {
      key: 'graph',
      title: 'Kết nối điện thoại, thiết bị, IP và tài khoản dùng chung trong bản đồ liên kết',
      desc: 'Làm lộ các mạng lưới gian lận phối hợp mà kiểm tra từng người có thể bỏ sót.'
    },
    {
      key: 'review',
      title: 'Đưa quyết định chưa chắc chắn vào hàng đợi hồ sơ với mã lý do rõ ràng',
      desc: 'Cung cấp cho người xét duyệt bối cảnh cần thiết để xử lý hồ sơ nhanh hơn.'
    }
  ]
} satisfies BlogPageTranslation;

export const BLOG_PAGE_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi
} as const satisfies Record<Language, BlogPageTranslation>;
