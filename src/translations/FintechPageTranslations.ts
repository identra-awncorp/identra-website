/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type FintechLanguage = 'en' | 'es' | 'ja' | 'de' | 'vi';
export type FintechScenarioKey = 'good' | 'review' | 'block';
export type FintechStatusKey = 'Approve' | 'Review' | 'Block';

type Scenario = {
  name: string;
  type: string;
  amount: string;
  email: string;
  phone: string;
  ip: string;
  idCheck: string;
  dbCheck: string;
  riskScore: number;
  status: FintechStatusKey;
  buttonTitle: string;
  buttonDesc: string;
  details: string[];
};

type Row = {
  title: string;
  desc: string;
  cardTitle: string;
  cardDesc: string;
  metric: string;
  metricValue?: string;
  note?: string;
  metric2?: string;
  metric2Value?: string;
  steps?: string[];
};

type TextCard = {
  title: string;
  desc: string;
};

type ExploreCard = {
  title: string;
  button: string;
};

type FintechTranslations = {
  backToPlatform: string;
  badge: string;
  heroTitle: string;
  heroDesc: string;
  getDemo: string;
  trySandbox: string;
  terminalName: string;
  activeMatch: string;
  simulatorPrompt: string;
  queryData: string;
  decisionBreakdown: string;
  riskScore: string;
  scoreMax: string;
  runAnother: string;
  trustedBy: string;
  buildingBlocksEyebrow: string;
  buildingBlocksTitle: string;
  demoVisualFlow: string;
  demoVisualPolicy: string;
  facialMatch: string;
  passed: string;
  ofacSanctions: string;
  clean: string;
  uboExtracted: string;
  found3: string;
  automationTitle: string;
  automationDesc: string;
  formTitle: string;
  formDesc: string;
  successTitle: string;
  successDesc: string;
  fillAnother: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  companyName: string;
  jobTitle: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  websitePlaceholder: string;
  companyPlaceholder: string;
  jobTitlePlaceholder: string;
  viewDemo: string;
  requiredFieldsAlert: string;
  exploreTitle: string;
  readyTitle: string;
  readyDesc: string;
  tryItNow: string;
  consolePrompt: string;
  bullet: string;
  status: Record<FintechStatusKey, string>;
  scenarios: Record<FintechScenarioKey, Scenario>;
  logs: string[];
  logos: string[];
  rows: Row[];
  platformCards: TextCard[];
  subpoints: TextCard[];
  exploreCards: ExploreCard[];
};

export const FINTECH_TRANSLATIONS: Record<FintechLanguage, FintechTranslations> = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'Solutions • Fintech',
    heroTitle: 'Financial access for good users, not fraudsters.',
    heroDesc: "Fight fraud and convert users, whether you're processing loans, issuing credit cards, automating account openings, or any other use case.",
    getDemo: 'Get a demo',
    trySandbox: 'Try identity sandbox',
    terminalName: 'FINTECH_DECISION_ENGINE_v2.1',
    activeMatch: 'ACTIVE MATCH',
    simulatorPrompt: 'Select a scenario to simulate automated loan / credit verification:',
    queryData: 'Querying financial data & running biometrics...',
    decisionBreakdown: 'Decision Engine Breakdown:',
    riskScore: 'Risk Score:',
    scoreMax: '/100',
    runAnother: 'Run another simulation',
    trustedBy: "Trusted by startups & the world's largest companies",
    buildingBlocksEyebrow: 'Identity Platform Building Blocks',
    buildingBlocksTitle: 'End-to-end verifications, signals, and orchestration',
    demoVisualFlow: 'Dynamic IDV Flow',
    demoVisualPolicy: 'Fintech Loan Policy',
    facialMatch: 'Facial Match',
    passed: 'Passed',
    ofacSanctions: 'OFAC Sanctions',
    clean: 'Clean',
    uboExtracted: 'UBO Extracted',
    found3: '3 found',
    automationTitle: 'Real-time automation engine',
    automationDesc: 'Configure complex verification matrices without writing single lines of backend code.',
    formTitle: 'Start your custom demo',
    formDesc: "Tell us a bit about yourself and we'll personalize the experience, no sales call required.",
    successTitle: 'Custom Demo Request Sent',
    successDesc: 'Thank you, {firstName}! We have customized your Identra sandbox credentials and sent them to {email}.',
    fillAnother: 'Fill another request',
    firstName: 'First name*',
    lastName: 'Last name*',
    email: 'Email*',
    website: 'Website*',
    companyName: 'Company name*',
    jobTitle: 'Job title',
    firstNamePlaceholder: 'Jane',
    lastNamePlaceholder: 'Doe',
    emailPlaceholder: 'jane.doe@company.com',
    websitePlaceholder: 'https://company.com',
    companyPlaceholder: 'Apex Technologies',
    jobTitlePlaceholder: 'VP of Risk & Compliance',
    viewDemo: 'View demo',
    requiredFieldsAlert: 'Please fill out all required fields.',
    exploreTitle: "Explore more of Identra's identity platform",
    readyTitle: 'Ready to get started?',
    readyDesc: 'Get in touch or start exploring Identra today.',
    tryItNow: 'Try it now',
    consolePrompt: '>',
    bullet: '•',
    status: { Approve: 'APPROVE', Review: 'REVIEW', Block: 'BLOCK' },
    scenarios: {
      good: {
        name: 'Emily Chen',
        type: 'Personal Loan Onboarding',
        amount: '$15,000',
        email: 'emily.chen@outlook.com',
        phone: '+1 (415) 555-0192',
        ip: '64.233.160.10 (SF, CA - Residential)',
        idCheck: 'Verified',
        dbCheck: 'Match',
        riskScore: 12,
        status: 'Approve',
        buttonTitle: 'Emily Chen (Good User)',
        buttonDesc: 'Auto-Approve Loan Application • Low Risk',
        details: [
          'Government ID matches selfie image (99.2% confidence).',
          'PII matches credit bureau and AAMVA databases perfectly.',
          'IP address is residential and matches declared billing address.',
          'Device footprint matches known trusted pattern.'
        ]
      },
      review: {
        name: 'Robert Vance',
        type: 'Credit Card Application',
        amount: 'Premium Rewards Card',
        email: 'robvance92@tempmail.io',
        phone: '+1 (646) 555-0314',
        ip: '185.220.101.5 (Unknown Tor Exit Node)',
        idCheck: 'Verified',
        dbCheck: 'Partial Match',
        riskScore: 68,
        status: 'Review',
        buttonTitle: 'Robert Vance (Tor VPN Risk)',
        buttonDesc: 'Mismatched Device • Manual Review Route',
        details: [
          'Government ID verified but expired 3 weeks ago.',
          'Name and DOB match credit records, but SSN has active flags.',
          'IP address flags: non-residential Tor network class.',
          'Email address domain registered within last 48 hours.'
        ]
      },
      block: {
        name: 'Samantha Ross (Identity Fraud Flagged)',
        type: 'Automated Checking Account',
        amount: 'Debit / Direct Deposit',
        email: 'sross_fraudster@proton.me',
        phone: '+1 (312) 555-0481',
        ip: '103.242.112.44 (Stolen Proxy - Lagos)',
        idCheck: 'Failed',
        dbCheck: 'Mismatched',
        riskScore: 98,
        status: 'Block',
        buttonTitle: 'Samantha Ross (Synthetic Threat)',
        buttonDesc: 'Fraud Pattern Checked • Automated Block',
        details: [
          'Selfie mismatch: active presentation attack / print attack detected.',
          'SSN belongs to a deceased individual (Death Master File flag).',
          'Declared physical address does not exist.',
          'IP address linked to previous chargeback attacks.'
        ]
      }
    },
    logs: [
      '[1/4] Extracting Government ID credentials and performing facial match...',
      '[IDV Check] Government ID: {idCheck}. Similarity score computed.',
      '[2/4] Querying national issuing and credit databases...',
      '[DB Check] SSN/Name/DOB Verification: {dbCheck}.',
      '[3/4] Performing digital footprint & passive signal analysis...',
      '[Risk Intel] Network: {ip}. Assessing behavioral metrics.',
      '[4/4] Aggregating signals into automated Decision Engine...',
      '[Decision] Risk Score: {riskScore}/100. Resolution: {status}.'
    ],
    logos: ['affirm', 'Brex', 'Payoneer'],
    rows: [
      {
        title: 'Delight users with safe and seamless onboarding',
        desc: 'Build localized KYC/AML onboarding flows that meet your compliance and branding requirements while ensuring users only need to submit the minimum information needed for their specific situation.',
        cardTitle: 'Dynamic UI Adjustments',
        cardDesc: 'Based on user network and threat factors',
        metric: 'Input Friction Level',
        metricValue: 'Standard',
        note: 'User is on residential WiFi: Bypass secondary selfie checklist step.'
      },
      {
        title: 'Get a complete picture of user risk',
        desc: "Consolidate Identra's signals with your own data to see all risk signals in one place. Then, run individual or population-wide investigations to uncover fraud patterns and mitigate attacks, all with minimal engineering.",
        cardTitle: 'Comprehensive Threat View',
        cardDesc: 'Consolidated device, IP, and bureau signals',
        metric: 'VPN Detection',
        metricValue: 'Commercial VPN',
        metric2: 'Email Risk',
        metric2Value: 'Low Risk Domain'
      },
      {
        title: 'Build scalable processes',
        desc: 'Orchestrate identity data and automate manual processes in Identra. Empower ops teams with comprehensive case views, granular assignment policies, and macros such as automated SAR filings.',
        cardTitle: 'Custom Workflows',
        cardDesc: 'Automate decisions using a visual canvas',
        metric: 'On Loan Approval:',
        steps: ['1. Run OFAC Sanctions watchlist match', '2. Auto-generate SAR report draft if risk > 80', '3. Send approval confirmation webhooks']
      }
    ],
    platformCards: [
      { title: 'Government ID and selfie liveness verifications', desc: 'Collect and verify your choice of government-issued IDs across 200+ countries and territories, then ensure the ID photo matches the selfie for added assurance.' },
      { title: 'Authoritative and issuing databases', desc: 'Verify collected and extracted PII against authoritative databases and issuing sources across 40+ countries.' },
      { title: 'Watchlist, sanctions, and adverse media screenings', desc: 'Screen users across 100+ global sanction and warning lists, 5,000+ PEP lists, and 400+ million news articles.' },
      { title: 'Passive signals', desc: 'Silently collect risk signals like VPN usage and device fingerprint automatically and use them as inputs for dynamic friction.' },
      { title: 'Graph', desc: 'Uncover and block fraud by leveraging link analysis to connect and flag risky accounts.' },
      { title: 'Cases', desc: 'Conduct investigations and resolve more cases with a configurable case management hub.' }
    ],
    subpoints: [
      { title: 'Banking services for individuals and businesses', desc: "Expand your customer base and acquire more users with Identra's end-to-end KYB and KYC solutions." },
      { title: 'Online payments and lending', desc: 'Protect your platform while ensuring a seamless user experience from onboarding to transactions.' },
      { title: 'Embedded finance', desc: 'Offer your customers fully customizable KYB and KYC modules that they can leverage out of the box.' }
    ],
    exploreCards: [
      { title: 'Future-proof your compliance strategy.', button: 'Learn compliance' },
      { title: 'Detect and deter fraud as it evolves.', button: 'Learn fraud detection' }
    ]
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Soluciones • Fintech',
    heroTitle: 'Acceso financiero para usuarios legítimos, no para defraudadores.',
    heroDesc: 'Combata el fraude y convierta más usuarios, ya sea que procese préstamos, emita tarjetas de crédito, automatice aperturas de cuentas o cubra cualquier otro caso de uso.',
    getDemo: 'Solicitar una demo',
    trySandbox: 'Probar sandbox de identidad',
    terminalName: 'FINTECH_DECISION_ENGINE_v2.1',
    activeMatch: 'COINCIDENCIA ACTIVA',
    simulatorPrompt: 'Seleccione un escenario para simular la verificación automatizada de préstamo o crédito:',
    queryData: 'Consultando datos financieros y ejecutando biometría...',
    decisionBreakdown: 'Desglose del motor de decisión:',
    riskScore: 'Puntuación de riesgo:',
    scoreMax: '/100',
    runAnother: 'Ejecutar otra simulación',
    trustedBy: 'Con la confianza de startups y de las empresas más grandes del mundo',
    buildingBlocksEyebrow: 'Bloques de la plataforma de identidad',
    buildingBlocksTitle: 'Verificaciones, señales y orquestación de extremo a extremo',
    demoVisualFlow: 'Flujo IDV dinámico',
    demoVisualPolicy: 'Política de préstamo fintech',
    facialMatch: 'Coincidencia facial',
    passed: 'Aprobado',
    ofacSanctions: 'Sanciones OFAC',
    clean: 'Sin hallazgos',
    uboExtracted: 'UBO extraído',
    found3: '3 encontrados',
    automationTitle: 'Motor de automatización en tiempo real',
    automationDesc: 'Configure matrices de verificación complejas sin escribir código backend.',
    formTitle: 'Inicie su demo personalizada',
    formDesc: 'Cuéntenos un poco sobre usted y personalizaremos la experiencia, sin llamada de ventas.',
    successTitle: 'Solicitud de demo personalizada enviada',
    successDesc: 'Gracias, {firstName}. Personalizamos sus credenciales del sandbox de Identra y las enviamos a {email}.',
    fillAnother: 'Completar otra solicitud',
    firstName: 'Nombre*',
    lastName: 'Apellido*',
    email: 'Correo electrónico*',
    website: 'Sitio web*',
    companyName: 'Nombre de la empresa*',
    jobTitle: 'Cargo',
    firstNamePlaceholder: 'Ana',
    lastNamePlaceholder: 'Pérez',
    emailPlaceholder: 'ana.perez@empresa.com',
    websitePlaceholder: 'https://empresa.com',
    companyPlaceholder: 'Apex Technologies',
    jobTitlePlaceholder: 'VP de Riesgo y Cumplimiento',
    viewDemo: 'Ver demo',
    requiredFieldsAlert: 'Complete todos los campos obligatorios.',
    exploreTitle: 'Explore más de la plataforma de identidad de Identra',
    readyTitle: '¿Listo para comenzar?',
    readyDesc: 'Póngase en contacto o empiece a explorar Identra hoy.',
    tryItNow: 'Probar ahora',
    consolePrompt: '>',
    bullet: '•',
    status: { Approve: 'APROBAR', Review: 'REVISAR', Block: 'BLOQUEAR' },
    scenarios: {
      good: {
        name: 'Emily Chen',
        type: 'Alta de préstamo personal',
        amount: '15.000 USD',
        email: 'emily.chen@outlook.com',
        phone: '+1 (415) 555-0192',
        ip: '64.233.160.10 (SF, CA - Residencial)',
        idCheck: 'Verificado',
        dbCheck: 'Coincidencia',
        riskScore: 12,
        status: 'Approve',
        buttonTitle: 'Emily Chen (usuaria legítima)',
        buttonDesc: 'Aprobación automática de préstamo • Riesgo bajo',
        details: [
          'La identificación oficial coincide con la selfie (99,2% de confianza).',
          'La PII coincide correctamente con el buró de crédito y las bases AAMVA.',
          'La dirección IP es residencial y coincide con la dirección de facturación declarada.',
          'La huella del dispositivo coincide con un patrón de confianza conocido.'
        ]
      },
      review: {
        name: 'Robert Vance',
        type: 'Solicitud de tarjeta de crédito',
        amount: 'Tarjeta premium de recompensas',
        email: 'robvance92@tempmail.io',
        phone: '+1 (646) 555-0314',
        ip: '185.220.101.5 (nodo de salida Tor desconocido)',
        idCheck: 'Verificado',
        dbCheck: 'Coincidencia parcial',
        riskScore: 68,
        status: 'Review',
        buttonTitle: 'Robert Vance (riesgo Tor/VPN)',
        buttonDesc: 'Dispositivo no coincidente • Ruta de revisión manual',
        details: [
          'La identificación oficial fue verificada, pero venció hace 3 semanas.',
          'Nombre y fecha de nacimiento coinciden con registros crediticios, pero el SSN tiene alertas activas.',
          'Alertas de IP: clase de red Tor no residencial.',
          'El dominio del correo electrónico fue registrado en las últimas 48 horas.'
        ]
      },
      block: {
        name: 'Samantha Ross (fraude de identidad detectado)',
        type: 'Cuenta corriente automatizada',
        amount: 'Débito / depósito directo',
        email: 'sross_fraudster@proton.me',
        phone: '+1 (312) 555-0481',
        ip: '103.242.112.44 (proxy robado - Lagos)',
        idCheck: 'Fallido',
        dbCheck: 'No coincide',
        riskScore: 98,
        status: 'Block',
        buttonTitle: 'Samantha Ross (amenaza sintética)',
        buttonDesc: 'Patrón de fraude comprobado • Bloqueo automático',
        details: [
          'Selfie no coincidente: se detectó ataque de presentación activo o con impresión.',
          'El SSN pertenece a una identra fallecida (alerta Death Master File).',
          'La dirección física declarada no existe.',
          'La dirección IP está vinculada a ataques de contracargo previos.'
        ]
      }
    },
    logs: [
      '[1/4] Extrayendo credenciales de identificación oficial y realizando coincidencia facial...',
      '[Comprobación IDV] Identificación oficial: {idCheck}. Puntuación de similitud calculada.',
      '[2/4] Consultando bases emisoras nacionales y burós de crédito...',
      '[Comprobación de bases] Verificación SSN/Nombre/Fecha de nacimiento: {dbCheck}.',
      '[3/4] Analizando huella digital y señales pasivas...',
      '[Inteligencia de riesgo] Red: {ip}. Evaluando métricas de comportamiento.',
      '[4/4] Agregando señales en el motor de decisión automatizado...',
      '[Decisión] Puntuación de riesgo: {riskScore}/100. Resolución: {status}.'
    ],
    logos: ['affirm', 'Brex', 'Payoneer'],
    rows: [
      {
        title: 'Ofrezca una incorporación segura y fluida',
        desc: 'Cree flujos KYC/AML localizados que cumplan sus requisitos de cumplimiento y marca, y pida a cada usuario solo la información mínima necesaria para su situación.',
        cardTitle: 'Ajustes dinámicos de interfaz',
        cardDesc: 'Según la red del usuario y los factores de amenaza',
        metric: 'Nivel de fricción de entrada',
        metricValue: 'Estándar',
        note: 'El usuario está en WiFi residencial: omitir el paso secundario de selfie.'
      },
      {
        title: 'Obtenga una visión completa del riesgo del usuario',
        desc: 'Consolide las señales de Identra con sus propios datos para ver todos los indicadores de riesgo en un solo lugar. Luego ejecute investigaciones individuales o poblacionales para descubrir patrones de fraude y mitigar ataques con poca ingeniería.',
        cardTitle: 'Vista integral de amenazas',
        cardDesc: 'Señales consolidadas de dispositivo, IP y buró',
        metric: 'Detección de VPN',
        metricValue: 'VPN comercial',
        metric2: 'Riesgo del correo',
        metric2Value: 'Dominio de bajo riesgo'
      },
      {
        title: 'Construya procesos escalables',
        desc: 'Orqueste datos de identidad y automatice procesos manuales en Identra. Dé a los equipos de operaciones vistas completas de casos, políticas granulares de asignación y macros como borradores automáticos de reportes SAR.',
        cardTitle: 'Flujos de trabajo personalizados',
        cardDesc: 'Automatice decisiones con un lienzo visual',
        metric: 'Al aprobar el préstamo:',
        steps: ['1. Ejecutar coincidencia con listas de sanciones OFAC', '2. Generar automáticamente un borrador SAR si el riesgo > 80', '3. Enviar webhooks de confirmación de aprobación']
      }
    ],
    platformCards: [
      { title: 'Verificaciones de identificación oficial y prueba de vida con selfie', desc: 'Recopile y verifique identificaciones oficiales de más de 200 países y territorios, y confirme que la foto del documento coincide con la selfie.' },
      { title: 'Bases autorizadas y emisoras', desc: 'Verifique la PII recopilada y extraída contra bases autorizadas y fuentes emisoras en más de 40 países.' },
      { title: 'Listas de vigilancia, sanciones y medios adversos', desc: 'Evalúe usuarios contra más de 100 listas globales de sanciones y advertencias, 5.000 listas PEP y más de 400 millones de artículos de noticias.' },
      { title: 'Señales pasivas', desc: 'Recoja automáticamente señales de riesgo como uso de VPN y huella del dispositivo, y úselas para aplicar fricción dinámica.' },
      { title: 'Graph', desc: 'Descubra y bloquee fraude mediante análisis de vínculos para conectar y marcar cuentas riesgosas.' },
      { title: 'Cases', desc: 'Realice investigaciones y resuelva más casos con un centro configurable de gestión de casos.' }
    ],
    subpoints: [
      { title: 'Servicios bancarios para personas y empresas', desc: 'Amplíe su base de clientes y adquiera más usuarios con las soluciones KYB y KYC de Identra de extremo a extremo.' },
      { title: 'Pagos y préstamos en línea', desc: 'Proteja su plataforma y mantenga una experiencia fluida desde la incorporación hasta las transacciones.' },
      { title: 'Finanzas integradas', desc: 'Ofrezca a sus clientes módulos KYB y KYC totalmente personalizables, listos para usar.' }
    ],
    exploreCards: [
      { title: 'Prepare su estrategia de cumplimiento para el futuro.', button: 'Conocer cumplimiento' },
      { title: 'Detecte y frene el fraude a medida que evoluciona.', button: 'Conocer detección de fraude' }
    ]
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: 'ソリューション • フィンテック',
    heroTitle: '不正利用者ではなく、正当なユーザーに金融アクセスを。',
    heroDesc: 'ローン審査、クレジットカード発行、口座開設の自動化など、あらゆるユースケースで不正を防ぎながらユーザー転換を高めます。',
    getDemo: 'デモを依頼',
    trySandbox: '本人確認サンドボックスを試す',
    terminalName: 'FINTECH_DECISION_ENGINE_v2.1',
    activeMatch: '照合中',
    simulatorPrompt: '自動ローン/与信確認をシミュレートするシナリオを選択してください:',
    queryData: '金融データを照会し、生体認証を実行中...',
    decisionBreakdown: '意思決定エンジンの内訳:',
    riskScore: 'リスクスコア:',
    scoreMax: '/100',
    runAnother: '別のシミュレーションを実行',
    trustedBy: 'スタートアップから世界最大級の企業までが信頼',
    buildingBlocksEyebrow: '本人確認プラットフォームの構成要素',
    buildingBlocksTitle: '検証、シグナル、オーケストレーションをエンドツーエンドで',
    demoVisualFlow: '動的IDVフロー',
    demoVisualPolicy: 'フィンテック融資ポリシー',
    facialMatch: '顔照合',
    passed: '合格',
    ofacSanctions: 'OFAC制裁',
    clean: '該当なし',
    uboExtracted: 'UBO抽出済み',
    found3: '3件検出',
    automationTitle: 'リアルタイム自動化エンジン',
    automationDesc: 'バックエンドコードを書かずに、複雑な検証マトリクスを設定できます。',
    formTitle: 'カスタムデモを開始',
    formDesc: '簡単な情報を入力すると、営業電話なしで体験をパーソナライズします。',
    successTitle: 'カスタムデモのリクエストを送信しました',
    successDesc: '{firstName}さん、ありがとうございます。Identraサンドボックスの認証情報をカスタマイズし、{email}に送信しました。',
    fillAnother: '別のリクエストを入力',
    firstName: '名*',
    lastName: '姓*',
    email: 'メール*',
    website: 'Webサイト*',
    companyName: '会社名*',
    jobTitle: '役職',
    firstNamePlaceholder: '花子',
    lastNamePlaceholder: '山田',
    emailPlaceholder: 'hanako.yamada@company.com',
    websitePlaceholder: 'https://company.com',
    companyPlaceholder: 'Apex Technologies',
    jobTitlePlaceholder: 'リスク・コンプライアンス担当VP',
    viewDemo: 'デモを見る',
    requiredFieldsAlert: '必須項目をすべて入力してください。',
    exploreTitle: 'Identraの本人確認プラットフォームをさらに見る',
    readyTitle: '始める準備はできましたか？',
    readyDesc: 'お問い合わせいただくか、今すぐIdentraをお試しください。',
    tryItNow: '今すぐ試す',
    consolePrompt: '>',
    bullet: '•',
    status: { Approve: '承認', Review: 'レビュー', Block: 'ブロック' },
    scenarios: {
      good: {
        name: 'Emily Chen',
        type: '個人ローン申込',
        amount: '15,000ドル',
        email: 'emily.chen@outlook.com',
        phone: '+1 (415) 555-0192',
        ip: '64.233.160.10 (SF, CA - 住宅回線)',
        idCheck: '確認済み',
        dbCheck: '一致',
        riskScore: 12,
        status: 'Approve',
        buttonTitle: 'Emily Chen（正当なユーザー）',
        buttonDesc: 'ローン申請を自動承認 • 低リスク',
        details: [
          '公的身分証と自撮り画像が一致しています（信頼度99.2%）。',
          'PIIが信用情報機関およびAAMVAデータベースと完全に一致しています。',
          'IPアドレスは住宅回線で、申告された請求先住所と一致しています。',
          'デバイスの特徴が既知の信頼パターンと一致しています。'
        ]
      },
      review: {
        name: 'Robert Vance',
        type: 'クレジットカード申請',
        amount: 'プレミアム特典カード',
        email: 'robvance92@tempmail.io',
        phone: '+1 (646) 555-0314',
        ip: '185.220.101.5 (不明なTor出口ノード)',
        idCheck: '確認済み',
        dbCheck: '一部一致',
        riskScore: 68,
        status: 'Review',
        buttonTitle: 'Robert Vance（Tor/VPNリスク）',
        buttonDesc: 'デバイス不一致 • 手動レビューへ振り分け',
        details: [
          '公的身分証は確認済みですが、3週間前に有効期限が切れています。',
          '氏名と生年月日は信用情報と一致していますが、SSNに有効な警告があります。',
          'IPアドレスの警告: 非住宅系のTorネットワークです。',
          'メールドメインは過去48時間以内に登録されています。'
        ]
      },
      block: {
        name: 'Samantha Ross（本人確認不正の警告）',
        type: '当座預金口座の自動開設',
        amount: 'デビット / 給与振込',
        email: 'sross_fraudster@proton.me',
        phone: '+1 (312) 555-0481',
        ip: '103.242.112.44 (盗用プロキシ - Lagos)',
        idCheck: '失敗',
        dbCheck: '不一致',
        riskScore: 98,
        status: 'Block',
        buttonTitle: 'Samantha Ross（合成IDの脅威）',
        buttonDesc: '不正パターンを確認 • 自動ブロック',
        details: [
          '自撮りが一致しません: アクティブな提示攻撃または印刷攻撃を検出しました。',
          'SSNは死亡者のものです（Death Master Fileの警告）。',
          '申告された住所は存在しません。',
          'IPアドレスは過去のチャージバック攻撃に関連しています。'
        ]
      }
    },
    logs: [
      '[1/4] 公的身分証の情報を抽出し、顔照合を実行中...',
      '[IDVチェック] 公的身分証: {idCheck}。類似度スコアを算出しました。',
      '[2/4] 国内発行元データベースと信用データベースを照会中...',
      '[DBチェック] SSN/氏名/生年月日の確認: {dbCheck}。',
      '[3/4] デジタルフットプリントとパッシブシグナルを分析中...',
      '[リスク情報] ネットワーク: {ip}。行動指標を評価中。',
      '[4/4] 自動意思決定エンジンにシグナルを集約中...',
      '[判定] リスクスコア: {riskScore}/100。結果: {status}。'
    ],
    logos: ['affirm', 'Brex', 'Payoneer'],
    rows: [
      {
        title: '安全でスムーズなオンボーディングを提供',
        desc: 'コンプライアンス要件とブランド要件を満たすローカライズされたKYC/AMLフローを構築し、ユーザーの状況に必要な最小限の情報だけを提出してもらえます。',
        cardTitle: '動的UI調整',
        cardDesc: 'ユーザーのネットワークと脅威要因に基づく',
        metric: '入力時の摩擦レベル',
        metricValue: '標準',
        note: 'ユーザーは住宅用WiFiを利用中: 二次自撮りチェックを省略。'
      },
      {
        title: 'ユーザーリスクを包括的に把握',
        desc: 'Identraのシグナルと自社データを統合し、すべてのリスクシグナルを一か所で確認できます。個別または集団単位の調査を実行し、不正パターンを発見して攻撃を抑えます。',
        cardTitle: '包括的な脅威ビュー',
        cardDesc: 'デバイス、IP、信用情報の統合シグナル',
        metric: 'VPN検出',
        metricValue: '商用VPN',
        metric2: 'メールリスク',
        metric2Value: '低リスクドメイン'
      },
      {
        title: '拡張可能なプロセスを構築',
        desc: 'Identraで本人確認データをオーケストレーションし、手作業を自動化します。包括的なケースビュー、詳細な割り当てポリシー、自動SARドラフトなどのマクロで運用チームを支援します。',
        cardTitle: 'カスタムワークフロー',
        cardDesc: 'ビジュアルキャンバスで意思決定を自動化',
        metric: 'ローン承認時:',
        steps: ['1. OFAC制裁リストとの照合を実行', '2. リスクが80超の場合、SARレポート草案を自動生成', '3. 承認確認webhookを送信']
      }
    ],
    platformCards: [
      { title: '公的身分証と自撮りのライブネス検証', desc: '200以上の国と地域の公的身分証を収集・検証し、身分証写真と自撮りが一致することを確認します。' },
      { title: '権威あるデータベースと発行元データベース', desc: '収集・抽出したPIIを、40以上の国の権威あるデータベースや発行元情報と照合します。' },
      { title: 'ウォッチリスト、制裁、ネガティブメディア審査', desc: '100以上の世界的な制裁・警告リスト、5,000以上のPEPリスト、4億件以上のニュース記事でユーザーを審査します。' },
      { title: 'パッシブシグナル', desc: 'VPN利用やデバイスフィンガープリントなどのリスクシグナルを自動収集し、動的な摩擦の入力として使用します。' },
      { title: 'Graph', desc: 'リンク分析でリスクのあるアカウントを関連付け、検出してブロックします。' },
      { title: 'Cases', desc: '設定可能なケース管理ハブで調査を行い、より多くのケースを解決します。' }
    ],
    subpoints: [
      { title: '個人と企業向けの銀行サービス', desc: 'IdentraのエンドツーエンドKYB/KYCソリューションで顧客基盤を広げ、より多くのユーザーを獲得します。' },
      { title: 'オンライン決済と融資', desc: 'オンボーディングから取引まで、スムーズなユーザー体験を保ちながらプラットフォームを保護します。' },
      { title: '組み込み金融', desc: 'すぐに活用できる、完全にカスタマイズ可能なKYB/KYCモジュールを顧客に提供します。' }
    ],
    exploreCards: [
      { title: '将来に備えたコンプライアンス戦略を。', button: 'コンプライアンスを見る' },
      { title: '進化する不正を検出し、抑止します。', button: '不正検出を見る' }
    ]
  },
  de: {
    backToPlatform: 'Zurück zur Plattform',
    badge: 'Lösungen • Fintech',
    heroTitle: 'Finanzzugang für legitime Nutzer, nicht für Betrüger.',
    heroDesc: 'Bekämpfen Sie Betrug und gewinnen Sie Nutzer, ob Sie Kredite bearbeiten, Kreditkarten ausgeben, Kontoeröffnungen automatisieren oder andere Anwendungsfälle abdecken.',
    getDemo: 'Demo anfordern',
    trySandbox: 'Identitäts-Sandbox testen',
    terminalName: 'FINTECH_DECISION_ENGINE_v2.1',
    activeMatch: 'AKTIVER ABGLEICH',
    simulatorPrompt: 'Wählen Sie ein Szenario für die automatisierte Kreditprüfung:',
    queryData: 'Finanzdaten werden abgefragt und Biometrie wird ausgeführt...',
    decisionBreakdown: 'Aufschlüsselung der Decision Engine:',
    riskScore: 'Risikowert:',
    scoreMax: '/100',
    runAnother: 'Weitere Simulation ausführen',
    trustedBy: 'Vertraut von Startups und den größten Unternehmen der Welt',
    buildingBlocksEyebrow: 'Bausteine der Identitätsplattform',
    buildingBlocksTitle: 'End-to-End-Verifizierungen, Signale und Orchestrierung',
    demoVisualFlow: 'Dynamischer IDV-Flow',
    demoVisualPolicy: 'Fintech-Kreditrichtlinie',
    facialMatch: 'Gesichtsabgleich',
    passed: 'Bestanden',
    ofacSanctions: 'OFAC-Sanktionen',
    clean: 'Unauffällig',
    uboExtracted: 'UBO extrahiert',
    found3: '3 gefunden',
    automationTitle: 'Echtzeit-Automatisierungsengine',
    automationDesc: 'Konfigurieren Sie komplexe Prüfmatrizen, ohne Backend-Code zu schreiben.',
    formTitle: 'Starten Sie Ihre individuelle Demo',
    formDesc: 'Erzählen Sie uns kurz von sich, und wir personalisieren das Erlebnis, ohne Vertriebsanruf.',
    successTitle: 'Individuelle Demoanfrage gesendet',
    successDesc: 'Vielen Dank, {firstName}. Wir haben Ihre Identra-Sandbox-Zugangsdaten angepasst und an {email} gesendet.',
    fillAnother: 'Weitere Anfrage ausfüllen',
    firstName: 'Vorname*',
    lastName: 'Nachname*',
    email: 'E-Mail*',
    website: 'Website*',
    companyName: 'Unternehmensname*',
    jobTitle: 'Position',
    firstNamePlaceholder: 'Julia',
    lastNamePlaceholder: 'Müller',
    emailPlaceholder: 'julia.mueller@firma.de',
    websitePlaceholder: 'https://firma.de',
    companyPlaceholder: 'Apex Technologies',
    jobTitlePlaceholder: 'VP Risiko & Compliance',
    viewDemo: 'Demo ansehen',
    requiredFieldsAlert: 'Bitte füllen Sie alle Pflichtfelder aus.',
    exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
    readyTitle: 'Bereit loszulegen?',
    readyDesc: 'Nehmen Sie Kontakt auf oder erkunden Sie Identra noch heute.',
    tryItNow: 'Jetzt ausprobieren',
    consolePrompt: '>',
    bullet: '•',
    status: { Approve: 'GENEHMIGEN', Review: 'PRÜFEN', Block: 'BLOCKIEREN' },
    scenarios: {
      good: {
        name: 'Emily Chen',
        type: 'Onboarding für Privatkredit',
        amount: '15.000 USD',
        email: 'emily.chen@outlook.com',
        phone: '+1 (415) 555-0192',
        ip: '64.233.160.10 (SF, CA - Privatanschluss)',
        idCheck: 'Verifiziert',
        dbCheck: 'Übereinstimmung',
        riskScore: 12,
        status: 'Approve',
        buttonTitle: 'Emily Chen (legitime Nutzerin)',
        buttonDesc: 'Kreditantrag automatisch genehmigen • Niedriges Risiko',
        details: [
          'Amtlicher Ausweis stimmt mit dem Selfie überein (99,2% Konfidenz).',
          'PII stimmt vollständig mit Kreditbüro- und AAMVA-Datenbanken überein.',
          'IP-Adresse ist privat und stimmt mit der angegebenen Rechnungsadresse überein.',
          'Geräteprofil entspricht einem bekannten vertrauenswürdigen Muster.'
        ]
      },
      review: {
        name: 'Robert Vance',
        type: 'Kreditkartenantrag',
        amount: 'Premium-Prämienkarte',
        email: 'robvance92@tempmail.io',
        phone: '+1 (646) 555-0314',
        ip: '185.220.101.5 (unbekannter Tor-Ausgangsknoten)',
        idCheck: 'Verifiziert',
        dbCheck: 'Teilweise Übereinstimmung',
        riskScore: 68,
        status: 'Review',
        buttonTitle: 'Robert Vance (Tor/VPN-Risiko)',
        buttonDesc: 'Gerät stimmt nicht überein • Manuelle Prüfung',
        details: [
          'Amtlicher Ausweis verifiziert, aber seit 3 Wochen abgelaufen.',
          'Name und Geburtsdatum stimmen mit Kreditdaten überein, aber der SSN hat aktive Warnungen.',
          'IP-Warnung: nicht privates Tor-Netzwerk.',
          'E-Mail-Domain wurde innerhalb der letzten 48 Stunden registriert.'
        ]
      },
      block: {
        name: 'Samantha Ross (Identitätsbetrug markiert)',
        type: 'Automatisiertes Girokonto',
        amount: 'Debit / Direkteinzahlung',
        email: 'sross_fraudster@proton.me',
        phone: '+1 (312) 555-0481',
        ip: '103.242.112.44 (gestohlener Proxy - Lagos)',
        idCheck: 'Fehlgeschlagen',
        dbCheck: 'Keine Übereinstimmung',
        riskScore: 98,
        status: 'Block',
        buttonTitle: 'Samantha Ross (synthetische Bedrohung)',
        buttonDesc: 'Betrugsmuster geprüft • Automatisch blockiert',
        details: [
          'Selfie stimmt nicht überein: aktiver Präsentations- oder Druckangriff erkannt.',
          'SSN gehört zu einer verstorbenen Person (Death Master File-Warnung).',
          'Die angegebene Wohnadresse existiert nicht.',
          'IP-Adresse ist mit früheren Chargeback-Angriffen verknüpft.'
        ]
      }
    },
    logs: [
      '[1/4] Daten des amtlichen Ausweises werden extrahiert und Gesichtsabgleich ausgeführt...',
      '[IDV-Prüfung] Amtlicher Ausweis: {idCheck}. Ähnlichkeitswert berechnet.',
      '[2/4] Nationale Aussteller- und Kreditdatenbanken werden abgefragt...',
      '[DB-Prüfung] SSN/Name/Geburtsdatum-Verifizierung: {dbCheck}.',
      '[3/4] Digitaler Fußabdruck und passive Signale werden analysiert...',
      '[Risikoinformation] Netzwerk: {ip}. Verhaltensmetriken werden bewertet.',
      '[4/4] Signale werden in der automatisierten Decision Engine aggregiert...',
      '[Entscheidung] Risikowert: {riskScore}/100. Ergebnis: {status}.'
    ],
    logos: ['affirm', 'Brex', 'Payoneer'],
    rows: [
      {
        title: 'Nutzer mit sicherem und nahtlosem Onboarding begeistern',
        desc: 'Erstellen Sie lokalisierte KYC/AML-Onboarding-Flows, die Compliance- und Markenanforderungen erfüllen und Nutzer nur die minimal nötigen Informationen für ihre Situation einreichen lassen.',
        cardTitle: 'Dynamische UI-Anpassungen',
        cardDesc: 'Basierend auf Netzwerk- und Bedrohungsfaktoren',
        metric: 'Eingabereibung',
        metricValue: 'Standard',
        note: 'Nutzer ist in einem privaten WLAN: sekundären Selfie-Check überspringen.'
      },
      {
        title: 'Ein vollständiges Bild des Nutzerrisikos erhalten',
        desc: 'Konsolidieren Sie Identra-Signale mit eigenen Daten, um alle Risikosignale an einem Ort zu sehen. Führen Sie Einzel- oder Populationsanalysen aus, um Betrugsmuster aufzudecken und Angriffe mit wenig Engineering-Aufwand einzudämmen.',
        cardTitle: 'Umfassende Bedrohungsansicht',
        cardDesc: 'Konsolidierte Geräte-, IP- und Kreditbüro-Signale',
        metric: 'VPN-Erkennung',
        metricValue: 'Kommerzielles VPN',
        metric2: 'E-Mail-Risiko',
        metric2Value: 'Domain mit niedrigem Risiko'
      },
      {
        title: 'Skalierbare Prozesse aufbauen',
        desc: 'Orchestrieren Sie Identitätsdaten und automatisieren Sie manuelle Prozesse in Identra. Stärken Sie Operations-Teams mit umfassenden Fallansichten, granularen Zuweisungsregeln und Makros wie automatisch erstellten SAR-Entwürfen.',
        cardTitle: 'Individuelle Workflows',
        cardDesc: 'Entscheidungen über eine visuelle Oberfläche automatisieren',
        metric: 'Bei Kreditgenehmigung:',
        steps: ['1. Abgleich mit OFAC-Sanktionsliste ausführen', '2. SAR-Berichtsentwurf automatisch erzeugen, wenn Risiko > 80', '3. Webhooks zur Genehmigungsbestätigung senden']
      }
    ],
    platformCards: [
      { title: 'Amtliche Ausweise und Selfie-Liveness-Verifizierungen', desc: 'Erfassen und prüfen Sie amtliche Ausweise aus über 200 Ländern und Regionen und stellen Sie sicher, dass das Ausweisfoto mit dem Selfie übereinstimmt.' },
      { title: 'Autoritative und ausstellende Datenbanken', desc: 'Prüfen Sie erfasste und extrahierte PII gegen autoritative Datenbanken und Ausstellerquellen in über 40 Ländern.' },
      { title: 'Watchlists, Sanktionen und negative Medien', desc: 'Prüfen Sie Nutzer gegen über 100 globale Sanktions- und Warnlisten, 5.000+ PEP-Listen und mehr als 400 Millionen Nachrichtenartikel.' },
      { title: 'Passive Signale', desc: 'Erfassen Sie Risikosignale wie VPN-Nutzung und Gerätefingerabdruck automatisch und nutzen Sie sie für dynamische Reibung.' },
      { title: 'Graph', desc: 'Entdecken und blockieren Sie Betrug mithilfe von Linkanalyse, um riskante Konten zu verbinden und zu markieren.' },
      { title: 'Cases', desc: 'Führen Sie Untersuchungen durch und lösen Sie mehr Fälle mit einem konfigurierbaren Fallmanagement-Hub.' }
    ],
    subpoints: [
      { title: 'Bankdienstleistungen für Personen und Unternehmen', desc: 'Erweitern Sie Ihre Kundenbasis und gewinnen Sie mehr Nutzer mit Identras End-to-End-KYB- und KYC-Lösungen.' },
      { title: 'Online-Zahlungen und Kreditvergabe', desc: 'Schützen Sie Ihre Plattform und sichern Sie zugleich ein nahtloses Nutzererlebnis vom Onboarding bis zur Transaktion.' },
      { title: 'Eingebettete Finanzdienstleistungen', desc: 'Bieten Sie Ihren Kunden vollständig anpassbare KYB- und KYC-Module, die sofort nutzbar sind.' }
    ],
    exploreCards: [
      { title: 'Machen Sie Ihre Compliance-Strategie zukunftssicher.', button: 'Compliance ansehen' },
      { title: 'Erkennen und verhindern Sie Betrug, während er sich weiterentwickelt.', button: 'Betrugserkennung ansehen' }
    ]
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    badge: 'Giải pháp • Công nghệ tài chính',
    heroTitle: 'Mở quyền tiếp cận tài chính cho người dùng hợp lệ, không phải kẻ gian.',
    heroDesc: 'Chống gian lận và tăng chuyển đổi người dùng, dù bạn đang xử lý khoản vay, phát hành thẻ tín dụng, tự động mở tài khoản hay triển khai bất kỳ trường hợp sử dụng nào khác.',
    getDemo: 'Yêu cầu demo',
    trySandbox: 'Thử sandbox danh tính',
    terminalName: 'FINTECH_DECISION_ENGINE_v2.1',
    activeMatch: 'ĐANG ĐỐI CHIẾU',
    simulatorPrompt: 'Chọn một kịch bản để mô phỏng xác minh khoản vay hoặc tín dụng tự động:',
    queryData: 'Đang truy vấn dữ liệu tài chính và chạy sinh trắc học...',
    decisionBreakdown: 'Phân tích của công cụ quyết định:',
    riskScore: 'Điểm rủi ro:',
    scoreMax: '/100',
    runAnother: 'Chạy mô phỏng khác',
    trustedBy: 'Được các startup và những công ty lớn nhất thế giới tin dùng',
    buildingBlocksEyebrow: 'Các khối của nền tảng danh tính',
    buildingBlocksTitle: 'Xác minh, tín hiệu và điều phối từ đầu đến cuối',
    demoVisualFlow: 'Luồng IDV động',
    demoVisualPolicy: 'Chính sách vay fintech',
    facialMatch: 'Khớp khuôn mặt',
    passed: 'Đạt',
    ofacSanctions: 'Trừng phạt OFAC',
    clean: 'Không có cảnh báo',
    uboExtracted: 'Đã trích xuất UBO',
    found3: 'Tìm thấy 3',
    automationTitle: 'Công cụ tự động hóa thời gian thực',
    automationDesc: 'Cấu hình các ma trận xác minh phức tạp mà không cần viết mã backend.',
    formTitle: 'Bắt đầu demo tùy chỉnh',
    formDesc: 'Cho chúng tôi biết một chút về bạn và chúng tôi sẽ cá nhân hóa trải nghiệm, không cần cuộc gọi bán hàng.',
    successTitle: 'Đã gửi yêu cầu demo tùy chỉnh',
    successDesc: 'Cảm ơn {firstName}! Chúng tôi đã tùy chỉnh thông tin đăng nhập sandbox Identra và gửi đến {email}.',
    fillAnother: 'Điền yêu cầu khác',
    firstName: 'Tên*',
    lastName: 'Họ*',
    email: 'Email*',
    website: 'Trang web*',
    companyName: 'Tên công ty*',
    jobTitle: 'Chức danh',
    firstNamePlaceholder: 'An',
    lastNamePlaceholder: 'Nguyễn',
    emailPlaceholder: 'an.nguyen@congty.com',
    websitePlaceholder: 'https://congty.com',
    companyPlaceholder: 'Apex Technologies',
    jobTitlePlaceholder: 'Phó chủ tịch Rủi ro & Tuân thủ',
    viewDemo: 'Xem demo',
    requiredFieldsAlert: 'Vui lòng điền tất cả các trường bắt buộc.',
    exploreTitle: 'Khám phá thêm nền tảng danh tính của Identra',
    readyTitle: 'Sẵn sàng bắt đầu?',
    readyDesc: 'Liên hệ hoặc bắt đầu khám phá Identra ngay hôm nay.',
    tryItNow: 'Thử ngay',
    consolePrompt: '>',
    bullet: '•',
    status: { Approve: 'DUYỆT', Review: 'XEM XÉT', Block: 'CHẶN' },
    scenarios: {
      good: {
        name: 'Emily Chen',
        type: 'Đăng ký khoản vay cá nhân',
        amount: '15.000 USD',
        email: 'emily.chen@outlook.com',
        phone: '+1 (415) 555-0192',
        ip: '64.233.160.10 (SF, CA - mạng dân cư)',
        idCheck: 'Đã xác minh',
        dbCheck: 'Khớp',
        riskScore: 12,
        status: 'Approve',
        buttonTitle: 'Emily Chen (người dùng hợp lệ)',
        buttonDesc: 'Tự động duyệt hồ sơ vay • Rủi ro thấp',
        details: [
          'Giấy tờ tùy thân khớp với ảnh selfie (độ tin cậy 99,2%).',
          'PII khớp hoàn toàn với văn phòng tín dụng và cơ sở dữ liệu AAMVA.',
          'Địa chỉ IP là mạng dân cư và khớp với địa chỉ thanh toán đã khai báo.',
          'Dấu vết thiết bị khớp với mẫu tin cậy đã biết.'
        ]
      },
      review: {
        name: 'Robert Vance',
        type: 'Đơn đăng ký thẻ tín dụng',
        amount: 'Thẻ thưởng cao cấp',
        email: 'robvance92@tempmail.io',
        phone: '+1 (646) 555-0314',
        ip: '185.220.101.5 (nút thoát Tor không xác định)',
        idCheck: 'Đã xác minh',
        dbCheck: 'Khớp một phần',
        riskScore: 68,
        status: 'Review',
        buttonTitle: 'Robert Vance (rủi ro Tor/VPN)',
        buttonDesc: 'Thiết bị không khớp • Chuyển sang xem xét thủ công',
        details: [
          'Giấy tờ tùy thân đã xác minh nhưng hết hạn 3 tuần trước.',
          'Tên và ngày sinh khớp với hồ sơ tín dụng, nhưng SSN có cảnh báo đang hoạt động.',
          'Cảnh báo IP: lớp mạng Tor không phải mạng dân cư.',
          'Tên miền email được đăng ký trong vòng 48 giờ qua.'
        ]
      },
      block: {
        name: 'Samantha Ross (bị gắn cờ gian lận danh tính)',
        type: 'Tài khoản thanh toán tự động',
        amount: 'Ghi nợ / chuyển lương trực tiếp',
        email: 'sross_fraudster@proton.me',
        phone: '+1 (312) 555-0481',
        ip: '103.242.112.44 (proxy bị đánh cắp - Lagos)',
        idCheck: 'Thất bại',
        dbCheck: 'Không khớp',
        riskScore: 98,
        status: 'Block',
        buttonTitle: 'Samantha Ross (mối đe dọa danh tính tổng hợp)',
        buttonDesc: 'Đã kiểm tra mẫu gian lận • Tự động chặn',
        details: [
          'Selfie không khớp: phát hiện tấn công trình diện hoặc tấn công bằng ảnh in.',
          'SSN thuộc về một người đã mất (cảnh báo Death Master File).',
          'Địa chỉ cư trú đã khai báo không tồn tại.',
          'Địa chỉ IP liên quan đến các cuộc tấn công hoàn tiền trước đây.'
        ]
      }
    },
    logs: [
      '[1/4] Đang trích xuất thông tin giấy tờ tùy thân và đối chiếu khuôn mặt...',
      '[Kiểm tra IDV] Giấy tờ tùy thân: {idCheck}. Đã tính điểm tương đồng.',
      '[2/4] Đang truy vấn cơ sở dữ liệu phát hành quốc gia và tín dụng...',
      '[Kiểm tra cơ sở dữ liệu] Xác minh SSN/Tên/Ngày sinh: {dbCheck}.',
      '[3/4] Đang phân tích dấu vết số và tín hiệu thụ động...',
      '[Thông tin rủi ro] Mạng: {ip}. Đang đánh giá chỉ số hành vi.',
      '[4/4] Đang tổng hợp tín hiệu vào công cụ quyết định tự động...',
      '[Quyết định] Điểm rủi ro: {riskScore}/100. Kết quả: {status}.'
    ],
    logos: ['affirm', 'Brex', 'Payoneer'],
    rows: [
      {
        title: 'Mang đến quy trình đăng ký an toàn và liền mạch',
        desc: 'Xây dựng các luồng KYC/AML được bản địa hóa, đáp ứng yêu cầu tuân thủ và thương hiệu, đồng thời chỉ yêu cầu người dùng cung cấp lượng thông tin tối thiểu phù hợp với tình huống của họ.',
        cardTitle: 'Điều chỉnh giao diện động',
        cardDesc: 'Dựa trên mạng của người dùng và các yếu tố đe dọa',
        metric: 'Mức độ ma sát khi nhập liệu',
        metricValue: 'Tiêu chuẩn',
        note: 'Người dùng đang dùng WiFi dân cư: bỏ qua bước kiểm tra selfie phụ.'
      },
      {
        title: 'Có cái nhìn đầy đủ về rủi ro người dùng',
        desc: 'Hợp nhất tín hiệu của Identra với dữ liệu của bạn để xem tất cả tín hiệu rủi ro ở một nơi. Sau đó chạy điều tra theo từng cá nhân hoặc trên toàn bộ nhóm để phát hiện mẫu gian lận và giảm thiểu tấn công với ít công sức kỹ thuật.',
        cardTitle: 'Góc nhìn đe dọa toàn diện',
        cardDesc: 'Tín hiệu thiết bị, IP và tín dụng đã hợp nhất',
        metric: 'Phát hiện VPN',
        metricValue: 'VPN thương mại',
        metric2: 'Rủi ro email',
        metric2Value: 'Tên miền rủi ro thấp'
      },
      {
        title: 'Xây dựng quy trình có thể mở rộng',
        desc: 'Điều phối dữ liệu danh tính và tự động hóa quy trình thủ công trong Identra. Trao quyền cho đội vận hành bằng góc nhìn hồ sơ toàn diện, chính sách phân công chi tiết và macro như tạo bản nháp báo cáo SAR tự động.',
        cardTitle: 'Quy trình tùy chỉnh',
        cardDesc: 'Tự động hóa quyết định bằng khung trực quan',
        metric: 'Khi phê duyệt khoản vay:',
        steps: ['1. Chạy đối chiếu danh sách trừng phạt OFAC', '2. Tự động tạo bản nháp báo cáo SAR nếu rủi ro > 80', '3. Gửi webhook xác nhận phê duyệt']
      }
    ],
    platformCards: [
      { title: 'Xác minh giấy tờ tùy thân và tính sống của selfie', desc: 'Thu thập và xác minh giấy tờ do chính phủ cấp từ hơn 200 quốc gia và vùng lãnh thổ, rồi đảm bảo ảnh trên giấy tờ khớp với selfie.' },
      { title: 'Cơ sở dữ liệu có thẩm quyền và nguồn phát hành', desc: 'Xác minh PII đã thu thập và trích xuất với cơ sở dữ liệu có thẩm quyền và nguồn phát hành tại hơn 40 quốc gia.' },
      { title: 'Danh sách theo dõi, trừng phạt và truyền thông bất lợi', desc: 'Sàng lọc người dùng trên hơn 100 danh sách trừng phạt và cảnh báo toàn cầu, hơn 5.000 danh sách PEP và hơn 400 triệu bài báo.' },
      { title: 'Tín hiệu thụ động', desc: 'Tự động thu thập tín hiệu rủi ro như việc dùng VPN và dấu vân tay thiết bị, rồi dùng chúng làm đầu vào cho mức ma sát động.' },
      { title: 'Graph', desc: 'Phát hiện và chặn gian lận bằng phân tích liên kết để kết nối và gắn cờ các tài khoản rủi ro.' },
      { title: 'Cases', desc: 'Thực hiện điều tra và xử lý nhiều hồ sơ hơn bằng trung tâm quản lý hồ sơ có thể cấu hình.' }
    ],
    subpoints: [
      { title: 'Dịch vụ ngân hàng cho cá nhân và doanh nghiệp', desc: 'Mở rộng tệp khách hàng và thu hút thêm người dùng với giải pháp KYB và KYC đầu cuối của Identra.' },
      { title: 'Thanh toán và cho vay trực tuyến', desc: 'Bảo vệ nền tảng trong khi vẫn đảm bảo trải nghiệm liền mạch từ đăng ký đến giao dịch.' },
      { title: 'Tài chính nhúng', desc: 'Cung cấp cho khách hàng các mô-đun KYB và KYC tùy chỉnh hoàn toàn, có thể dùng ngay.' }
    ],
    exploreCards: [
      { title: 'Chuẩn bị chiến lược tuân thủ cho tương lai.', button: 'Tìm hiểu tuân thủ' },
      { title: 'Phát hiện và ngăn chặn gian lận khi nó thay đổi.', button: 'Tìm hiểu phát hiện gian lận' }
    ]
  }
};

export type FintechTranslationKey = keyof typeof FINTECH_TRANSLATIONS.en;
