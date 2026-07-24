const WORKFORCE_PROVIDER_LABELS: any = {
  en: {
    identityProvider: "Identity Provider",
    mfaChallenger: "MFA Challenger",
    activeDirectory: "Active Directory",
    enterpriseItService: "Enterprise IT Service",
    issueTrackingAccess: "Issue Tracking & Access",
    customerHelpDesk: "Customer/Help Desk Service",
    realtimeAlerts: "Real-time Alerts",
    corporateCommunications: "Corporate Communications"
  },
  es: {
    identityProvider: "Proveedor de identidad",
    mfaChallenger: "Desafío MFA",
    activeDirectory: "Active Directory",
    enterpriseItService: "Servicio TI empresarial",
    issueTrackingAccess: "Seguimiento de incidencias y acceso",
    customerHelpDesk: "Servicio de atención y soporte",
    realtimeAlerts: "Alertas en tiempo real",
    corporateCommunications: "Comunicaciones corporativas"
  },
  ja: {
    identityProvider: "IDプロバイダー",
    mfaChallenger: "MFAチャレンジ",
    activeDirectory: "Active Directory",
    enterpriseItService: "企業ITサービス",
    issueTrackingAccess: "課題追跡とアクセス",
    customerHelpDesk: "顧客・ヘルプデスクサービス",
    realtimeAlerts: "リアルタイムアラート",
    corporateCommunications: "企業コミュニケーション"
  },
  de: {
    identityProvider: "Identitätsanbieter",
    mfaChallenger: "MFA-Challenge",
    activeDirectory: "Active Directory",
    enterpriseItService: "Enterprise-IT-Service",
    issueTrackingAccess: "Issue-Tracking und Zugriff",
    customerHelpDesk: "Kunden-/Helpdesk-Service",
    realtimeAlerts: "Echtzeitwarnungen",
    corporateCommunications: "Unternehmenskommunikation"
  },
  vi: {
    identityProvider: "Nhà cung cấp định danh",
    mfaChallenger: "Thử thách MFA",
    activeDirectory: "Active Directory",
    enterpriseItService: "Dịch vụ CNTT doanh nghiệp",
    issueTrackingAccess: "Theo dõi sự cố và truy cập",
    customerHelpDesk: "Dịch vụ khách hàng/hỗ trợ",
    realtimeAlerts: "Cảnh báo thời gian thực",
    corporateCommunications: "Truyền thông doanh nghiệp"
  }
};

const WORKFORCE_INTEGRATION_DEFINITIONS = [
  { name: "Okta", providerKey: "identityProvider" },
  { name: "Duo", providerKey: "mfaChallenger" },
  { name: "Microsoft Entra", providerKey: "activeDirectory" },
  { name: "ServiceNow", providerKey: "enterpriseItService" },
  { name: "Jira", providerKey: "issueTrackingAccess" },
  { name: "Zendesk", providerKey: "customerHelpDesk" },
  { name: "Slack", providerKey: "realtimeAlerts" },
  { name: "Microsoft Teams", providerKey: "corporateCommunications" }
];

const buildWorkforceIntegrations = (language: keyof typeof WORKFORCE_PROVIDER_LABELS) =>
  WORKFORCE_INTEGRATION_DEFINITIONS.map((item) => ({
    name: item.name,
    provider: WORKFORCE_PROVIDER_LABELS[language][item.providerKey]
  }));

const WORKFORCE_CANDIDATE_GRID = [
  { name: "Elena", verified: true },
  { name: "Alex", verified: false, alert: "Deepfake" },
  { name: "Robert", verified: false, alert: "IP Proxy" },
  { name: "David", verified: true },
  { name: "Sarah", verified: true },
  { name: "Michael", verified: true }
];

export const WORKFORCE_IDV_PAGE_TRANSLATIONS: any = {
  en: {
    badge: "Enterprise Identity Protection",
    heroTitle: "Verify employees at the moments attackers target most.",
    heroDesc: "Stop social engineering, deepfakes, and imidentration at every stage of the employee life cycle. Secure your systems with cryptographic identity proofing.",
    consultationCta: "Get a consultation for Workforce",
    candidateCta: "Go to Candidate Verification",
    coreLabel: "workforce-idv-core",
    ledgerTitle: "Employee Identity Ledger",
    ledgerDesc: "Continuous enterprise credential protection",
    secured: "SECURED",
    lifecycleEvents: "LIFECYCLE EVENTS",
    status: "STATUS",
    ledgerEvents: [
      { title: "IT Help Desk Re-Verification", status: "Biometric match 99.8%", time: "10:45 AM" },
      { title: "IAM Admin Password Reset", status: "Hardware 2FA bound", time: "09:12 AM" },
      { title: "New Hire Onboarding", status: "Document check...", time: "Just Now" }
    ],
    protectionShield: "Enterprise Protection Shield",
    protectionShieldDesc: "Securing over 2.5M corporate authentications daily",
    trustedBy: "TRUSTED BY THE WORLD'S LEADING WORKFORCES",
    trustLogos: { oktaMark: "O", okta: "okta", intercomMark: "I", intercom: "INTERCOM", ro: "ro" },
    scaleLabel: "Enterprise scale & coverage",
    scaleTitle: "Scale globally based on your business needs with Identra",
    scaleDesc: "Ensure comprehensive identity verification with zero bottlenecks. Identra's enterprise platform processes transactions instantly while complying with local data privacy laws worldwide.",
    stats: [
      { value: "200+", label: "countries and territories covered to verify employees" },
      { value: "<1 min", label: "for government ID and selfie verifications" },
      { value: "50+", label: "integrations with leading tech platforms" }
    ],
    globalGrid: "Global Verification Grid",
    globalGridDesc: "GDPR, SOC 2, and CCPA regional routing active.",
    lifecycleLabel: "Full Employee Life Cycle",
    lifecycleTitle: "Protect your business at every stage of the employee life cycle",
    lifecycleDesc: "Verify real-world identities and protect logins automatically at standard milestones. Control access at hiring, secure onboarding, and mitigate password-recovery takeovers.",
    stages: {
      hiring: {
        stage: "STAGE 01",
        title: "Hiring",
        desc: "Safeguard against candidate fraud. Confirm interviewees' real-world identities and their genuine presence during the hiring process."
      },
      onboarding: {
        stage: "STAGE 02",
        title: "Onboarding",
        desc: "Secure onboarding and device enrollment. Verify employees' real-world identities during onboarding and before granting access to workplace systems."
      },
      employment: {
        stage: "STAGE 03",
        title: "Employment",
        desc: "Self-serve account recovery & privileged actions. Reverify identity during password resets or high-risk admin procedures to block hijack attempts."
      }
    },
    initialLog: "System standby. Awaiting workforce events...",
    logs: {
      hiring: [
        "🚀 [Hiring Engine] Candidate submitting application documents...",
        "🔍 Scanning for synthetic personas and face-matching with live video feed...",
        "⚠️ Alert: Keystroke telemetry analysis indicates standard human input. Passed.",
        "✨ Success: Candidate David verified against Global AML & Watchlists. High confidence."
      ],
      onboarding: [
        "📥 [Onboarding Module] New hire accepted. Provisioning IDV link...",
        "📱 Selfie captured and verified with advanced 3D liveness detection...",
        "🔑 Binding cryptographic identity token to corporate hardware key...",
        "✅ Profile saved. Automated enrollment webhook triggered for Active Directory."
      ],
      employment: [
        "🔒 [Security Guard] High-privileged IAM action detected: Global Admin Password Reset...",
        "📲 Real-time challenge sent to mobile device. Verification pending...",
        "🤳 Face scan completed by user. 99.7% structural match to onboarding profile...",
        "🔓 Access Granted. Session initialized successfully."
      ]
    },
    activeTelemetryStream: "ACTIVE TELEMETRY STREAM:",
    simulatingEvent: "SIMULATING EVENT",
    crunching: "Crunching multi-factor biometric telemetry...",
    milestoneHint: "Click on other milestones (Hiring, Onboarding, Employment) to test specific verification scenarios.",
    restartEvent: "Restart Event",
    lifecycleBenefits: [
      { title: "Platform automation", desc: "Seamlessly integrate Identra into your workflows with native support for leading Identity Access Management (IAM) platforms and HR tools." },
      { title: "Reduce manual review", desc: "Reduce the manual review burden on your team using an automated solution to verify identities and matching documents in seconds." },
      { title: "Threat detection & alerts", desc: "Set up alerts to detect unusual employee login behavior, suspicious IP networks, or deepfake attempts instantly." }
    ],
    flowsLabel: "Robust Biometric Flows",
    flowsTitle: "Verify your workforce wherever they are",
    flowsDesc: "Configure identity verification to fire automatically at the moments that matter, like employee onboarding, help desk requests, account recovery, and sensitive actions.",
    tabs: [
      { id: "mobile-first", title: "Enable mobile-first verification for stronger assurance", desc: "Allow employees to complete secure verification on their own mobile devices securely in seconds." },
      { id: "consistency", title: "Ensure identity consistency", desc: "Match user data against onboarding files dynamically to verify returning employees reliably." },
      { id: "detect-fraud", title: "Detect fraud and confirm real-world identity", desc: "Identify fake documentation or injected camera signals instantly with our robust AI ledger." },
      { id: "route-results", title: "Route results to your existing security and IT stack", desc: "Instantly push identity validation approvals directly to Active Directory, Okta, or internal logs." }
    ],
    phone: {
      time: "9:41 AM",
      network: "5G",
      initial: "P",
      verifyTitle: "Verify your identity",
      verifyDesc: "Please prepare your state ID or passport to complete onboarding.",
      begin: "Begin verifying",
      sandbox: "Secure workforce sandbox",
      biometricMatch: "Biometric Match",
      matchScore: "99.7% MATCH",
      consistencyDesc: "Biometric parameters verified successfully against reference records captured at initial onboarding.",
      consistencyPassed: "CONSISTENCY CHECK: PASSED",
      documentAnalysis: "ID DOCUMENT ANALYSIS",
      passport: "USA_PASSPORT",
      documentDesc: "AI Document model authenticates security micro-patterns and cross-references global databases.",
      documentPassed: "DOCUMENT AUTH: PASSED",
      outgoingWebhook: "OUTGOING WEBHOOK",
      postOkta: "POST https://api.okta.com/users",
      syncComplete: "200 OK - SYNC COMPLETE",
      routeDesc: "Credentials successfully synchronized with enterprise Active Directory. Hardware keys bound.",
      provisionComplete: "PROVISION FLOW COMPLETE",
      checklist: "Onboarding Checklist",
      checklistItems: ["Device enrollment", "Sensitive actions", "Account recovery"],
      offboarding: "OFFBOARDING",
      accessRevoke: "Automated Access Revoke",
      offboardingDesc: "Freeze credential tokens automatically as soon as an offboarding status is flagged inside BambooHR or Workday."
    },
    integrationsLabel: "Seamless integrations",
    integrationsTitle: "Unify your identity stack to strengthen your security",
    integrationsDesc: "Identra integrates seamlessly with your IAM, HRIS, IT, and security systems, allowing you to unify your tech stack, automate identity verification workflows, and enhance security — all without overhauling your existing infrastructure.",
    integrations: buildWorkforceIntegrations("en"),
    exploreIntegrations: "Explore all integrations",
    integrationHub: "Integration Hub",
    connected: "CONNECTED",
    securityGateway: "Security Gateway",
    securityChallenge: "Dynamic Security Challenge Active",
    securityChallengeDescPrefix: "Trigger an automated",
    securityChallengeDescSuffix: "verification flow instantly when high-risk indicators exceed configured threat scores.",
    hiringLabel: "Hiring Funnel Security",
    candidateTitle: "Candidate verification for your hiring pipeline",
    candidateDesc: "Cut time spent on fraudulent applicants by verifying candidate identity early. Learn how to protect your organization from emergent threats and keep qualified candidates moving forward without unnecessary friction.",
    candidateLearnCta: "Learn about Candidate Verification",
    candidateGrid: WORKFORCE_CANDIDATE_GRID,
    detailsLabel: "In-depth details",
    detailsTitle: "A deeper look at the Workforce security features",
    accordions: [
      {
        id: "library",
        title: "Robust library of verifications and signals",
        columns: [
          { title: "Identity and device binding", desc: "Fight deepfakes and other types of fraud with selfie liveness checks, video verifications, 2FA device binding, and more." },
          { title: "Global verification coverage", desc: "Collect and verify government ID documents, such as passports and driver licenses, from more than 200 countries and territories." },
          { title: "Configurable settings and checks", desc: "Adjust image quality requirements, face obstruction detection, retry attempts, and more to meet your requirements." },
          { title: "Non-documentary verification", desc: "Check collected PII and digital IDs against global issuing and authoritative sources securely." }
        ]
      },
      {
        id: "usability",
        title: "Balance security with usability",
        paragraphs: [
          "Security is only effective if your employees actually use it. Identra's Workforce IDV provides intuitive, responsive, and mobile-friendly layouts that load in seconds.",
          "Users can seamlessly transition from laptop screens to their smartphones simply by scanning a secure QR code, enabling them to capture documents and complete facial scans frictionlessly."
        ]
      },
      {
        id: "adaptive-controls",
        title: "Adaptive controls that fit your IAM solution",
        paragraphs: [
          "Every business has a unique threat model. Configure conditional routing patterns to enforce multi-factor biometric challenges only when risk parameters exceed thresholds.",
          "Perfectly sync with identity hubs like Okta, Duo, and Azure AD using built-in SDK components, ensuring continuous protection with zero lag."
        ]
      }
    ],
    badges: ["CCPA Compliant", "GDPR Ready", "SOC 2 Type II", "ISO 27001", "HIPAA compliant", "FERPA certified", "Age Checked", "iBeta Level 2"],
    trustTitle: "Trust is built on security and privacy",
    trustDesc: "Identra adheres to the highest industry standards, maintaining strict compliance protocols and independent certifications to safeguard you and your employee records.",
    securityCertsCta: "Explore security certifications",
    readyTitle: "Ready to get started?",
    readyDesc: "Get in touch or start exploring Identra today. Set up custom biometric workflows tailored specifically for your workforce operations.",
    tryDemo: "Try the demo",
    explorePlatform: "Explore Platform"
  },
  es: {},
  ja: {},
  de: {},
  vi: {}
};

WORKFORCE_IDV_PAGE_TRANSLATIONS.es = {
  coreLabel: "workforce-idv-core",
  trustLogos: {
      "oktaMark": "O",
      "okta": "okta",
      "intercomMark": "I",
      "intercom": "INTERCOM",
      "ro": "ro"
    },
  badges: [
      "CCPA Compliant",
      "GDPR Ready",
      "SOC 2 Type II",
      "ISO 27001",
      "HIPAA compliant",
      "FERPA certified",
      "Age Checked",
      "iBeta Level 2"
    ],
  badge: "Protección de identidad empresarial",
  heroTitle: "Verifica empleados en los momentos que más atacan los adversarios.",
  heroDesc: "Detén ingeniería social, deepfakes e impostores en cada etapa del ciclo de vida del empleado. Protege tus sistemas con prueba de identidad criptográfica.",
  consultationCta: "Solicitar asesoría para Workforce",
  candidateCta: "Ir a verificación de candidatos",
  ledgerTitle: "Registro de identidad del empleado",
  ledgerDesc: "Protección continua de credenciales empresariales",
  secured: "PROTEGIDO",
  lifecycleEvents: "EVENTOS DEL CICLO DE VIDA",
  status: "ESTADO",
  ledgerEvents: [
    { title: "Reverificación de mesa de ayuda TI", status: "Coincidencia biométrica 99,8%", time: "10:45" },
    { title: "Restablecimiento de contraseña IAM", status: "2FA de hardware vinculado", time: "09:12" },
    { title: "Onboarding de nuevo empleado", status: "Comprobando documento...", time: "Ahora" }
  ],
  protectionShield: "Escudo de protección empresarial",
  protectionShieldDesc: "Protege más de 2,5 M de autenticaciones corporativas diarias",
  trustedBy: "CONFIADO POR LAS PRINCIPALES FUERZAS LABORALES DEL MUNDO",
  scaleLabel: "Escala y cobertura empresarial",
  scaleTitle: "Escala globalmente según las necesidades de tu negocio con Identra",
  scaleDesc: "Garantiza una verificación de identidad integral sin cuellos de botella. La plataforma empresarial de Identra procesa transacciones al instante cumpliendo leyes locales de privacidad en todo el mundo.",
  stats: [
    { value: "200+", label: "países y territorios cubiertos para verificar empleados" },
    { value: "<1 min", label: "para verificaciones de documento oficial y selfie" },
    { value: "50+", label: "integraciones con plataformas tecnológicas líderes" }
  ],
  globalGrid: "Red global de verificación",
  globalGridDesc: "Enrutamiento regional GDPR, SOC 2 y CCPA activo.",
  lifecycleLabel: "Ciclo de vida completo del empleado",
  lifecycleTitle: "Protege tu negocio en cada etapa del ciclo de vida del empleado",
  lifecycleDesc: "Verifica identidades reales y protege inicios de sesión automáticamente en hitos clave. Controla acceso durante contratación, asegura onboarding y reduce tomas de control por recuperación de contraseña.",
  stages: {
    hiring: { stage: "STAGE 01", title: "Contratación", desc: "Protege contra fraude de candidatos. Confirma la identidad real de entrevistados y su presencia genuina durante el proceso de contratación." },
    onboarding: { stage: "STAGE 02", title: "Onboarding", desc: "Asegura onboarding e inscripción de dispositivos. Verifica la identidad real de empleados antes de conceder acceso a sistemas de trabajo." },
    employment: { stage: "STAGE 03", title: "Empleo", desc: "Recuperación de cuenta y acciones privilegiadas de autoservicio. Revalida identidad en restablecimientos de contraseña o procedimientos administrativos de alto riesgo." }
  },
  initialLog: "Sistema en espera. Esperando eventos de workforce...",
  logs: {
    hiring: ["🚀 [Motor de contratación] El candidato envía documentos...", "🔍 Buscando identidades sintéticas y comparando rostro con video en vivo...", "⚠️ Alerta: el análisis de tecleo indica entrada humana estándar. Aprobado.", "✨ Éxito: candidato David verificado contra AML global y watchlists. Alta confianza."],
    onboarding: ["📥 [Módulo de onboarding] Nuevo empleado aceptado. Preparando enlace IDV...", "📱 Selfie capturada y verificada con detección 3D avanzada de liveness...", "🔑 Vinculando token criptográfico de identidad a llave corporativa...", "✅ Perfil guardado. Webhook de inscripción automática activado para Active Directory."],
    employment: ["🔒 [Guardia de seguridad] Acción IAM privilegiada detectada: restablecimiento de contraseña de administrador global...", "📲 Desafío en tiempo real enviado al dispositivo móvil. Verificación pendiente...", "🤳 Escaneo facial completado. 99,7% de coincidencia estructural con perfil de onboarding...", "🔓 Acceso concedido. Sesión iniciada correctamente."]
  },
  activeTelemetryStream: "FLUJO DE TELEMETRÍA ACTIVO:",
  simulatingEvent: "SIMULANDO EVENTO",
  crunching: "Procesando telemetría biométrica multifactor...",
  milestoneHint: "Haz clic en otros hitos (contratación, onboarding, empleo) para probar escenarios específicos.",
  restartEvent: "Reiniciar evento",
  lifecycleBenefits: [
    { title: "Automatización de plataforma", desc: "Integra Identra en tus workflows con soporte nativo para plataformas IAM líderes y herramientas de RR. HH." },
    { title: "Reduce revisión manual", desc: "Reduce la carga de revisión manual con una solución automatizada que verifica identidades y documentos en segundos." },
    { title: "Detección de amenazas y alertas", desc: "Configura alertas para detectar comportamientos inusuales de inicio de sesión, redes IP sospechosas o intentos de deepfake al instante." }
  ],
  flowsLabel: "Flujos biométricos sólidos",
  flowsTitle: "Verifica tu workforce esté donde esté",
  flowsDesc: "Configura la verificación de identidad para activarse automáticamente en momentos clave como onboarding, solicitudes de soporte, recuperación de cuenta y acciones sensibles.",
  tabs: [
    { id: "mobile-first", title: "Activa verificación móvil para mayor garantía", desc: "Permite que los empleados completen una verificación segura desde sus propios dispositivos móviles en segundos." },
    { id: "consistency", title: "Garantiza consistencia de identidad", desc: "Compara dinámicamente datos del usuario con archivos de onboarding para verificar empleados recurrentes." },
    { id: "detect-fraud", title: "Detecta fraude y confirma identidad real", desc: "Identifica documentos falsos o señales de cámara inyectadas al instante con nuestro registro de IA." },
    { id: "route-results", title: "Envía resultados a tu stack de seguridad y TI", desc: "Envía aprobaciones de identidad directamente a Active Directory, Okta o registros internos." }
  ],
  phone: {
    time: "9:41 AM",
    network: "5G",
    initial: "P",
    passport: "USA_PASSPORT",
    postOkta: "POST https://api.okta.com/users",
    verifyTitle: "Verifica tu identidad",
    verifyDesc: "Prepara tu documento estatal o pasaporte para completar el onboarding.",
    begin: "Comenzar verificación",
    sandbox: "Sandbox seguro de workforce",
    biometricMatch: "Coincidencia biométrica",
    matchScore: "99,7% DE COINCIDENCIA",
    consistencyDesc: "Parámetros biométricos verificados correctamente contra registros capturados en el onboarding inicial.",
    consistencyPassed: "COMPROBACIÓN DE CONSISTENCIA: APROBADA",
    documentAnalysis: "ANÁLISIS DE DOCUMENTO ID",
    documentDesc: "El modelo de documento IA autentica micro-patrones de seguridad y cruza bases de datos globales.",
    documentPassed: "AUTENTICACIÓN DE DOCUMENTO: APROBADA",
    outgoingWebhook: "WEBHOOK SALIENTE",
    syncComplete: "200 OK - SINCRONIZACIÓN COMPLETA",
    routeDesc: "Credenciales sincronizadas con Active Directory empresarial. Llaves de hardware vinculadas.",
    provisionComplete: "FLUJO DE APROVISIONAMIENTO COMPLETO",
    checklist: "Lista de onboarding",
    checklistItems: ["Inscripción de dispositivo", "Acciones sensibles", "Recuperación de cuenta"],
    offboarding: "OFFBOARDING",
    accessRevoke: "Revocación automática de acceso",
    offboardingDesc: "Congela tokens de credencial automáticamente cuando BambooHR o Workday marcan offboarding."
  },
  integrationsLabel: "Integraciones fluidas",
  integrationsTitle: "Unifica tu stack de identidad para fortalecer la seguridad",
  integrationsDesc: "Identra se integra con tus sistemas IAM, HRIS, TI y seguridad para unificar tu stack, automatizar workflows de verificación y mejorar seguridad sin reconstruir infraestructura.",
  integrations: buildWorkforceIntegrations("es"),
  exploreIntegrations: "Explorar todas las integraciones",
  integrationHub: "Centro de integración",
  connected: "CONECTADO",
  securityGateway: "Puerta de seguridad",
  securityChallenge: "Desafío de seguridad dinámico activo",
  securityChallengeDescPrefix: "Activa un flujo automatizado de verificación de",
  securityChallengeDescSuffix: "al instante cuando los indicadores de alto riesgo superen los umbrales configurados.",
  hiringLabel: "Seguridad del embudo de contratación",
  candidateTitle: "Verificación de candidatos para tu pipeline de contratación",
  candidateDesc: "Reduce el tiempo perdido en postulantes fraudulentos verificando identidad temprano. Protege tu organización de amenazas emergentes y mantén el avance de candidatos calificados sin fricción innecesaria.",
  candidateLearnCta: "Conocer Candidate Verification",
  candidateGrid: WORKFORCE_CANDIDATE_GRID,
  detailsLabel: "Detalles en profundidad",
  detailsTitle: "Una mirada más profunda a las funciones de seguridad Workforce",
  accordions: [
    { id: "library", title: "Biblioteca sólida de verificaciones y señales", columns: [{ title: "Vinculación de identidad y dispositivo", desc: "Combate deepfakes y otros fraudes con liveness por selfie, videoverificación, vinculación 2FA de dispositivo y más." }, { title: "Cobertura global de verificación", desc: "Recopila y verifica documentos oficiales como pasaportes y licencias en más de 200 países y territorios." }, { title: "Configuraciones y comprobaciones ajustables", desc: "Ajusta requisitos de calidad de imagen, detección de obstrucción facial, reintentos y más." }, { title: "Verificación sin documento", desc: "Comprueba PII recopilada e IDs digitales contra fuentes emisoras y autorizadas globales." }] },
    { id: "usability", title: "Equilibra seguridad y usabilidad", paragraphs: ["La seguridad solo funciona si tus empleados realmente la usan. Workforce IDV de Identra ofrece diseños intuitivos, responsivos y móviles que cargan en segundos.", "Los usuarios pueden pasar del portátil al teléfono con un código QR seguro para capturar documentos y completar escaneos faciales sin fricción."] },
    { id: "adaptive-controls", title: "Controles adaptativos para tu solución IAM", paragraphs: ["Cada empresa tiene un modelo de amenazas único. Configura rutas condicionales para exigir desafíos biométricos multifactor solo cuando el riesgo supere umbrales.", "Sincroniza con hubs de identidad como Okta, Duo y Azure AD mediante componentes SDK integrados para protección continua sin retrasos."] }
  ],
  trustTitle: "La confianza se basa en seguridad y privacidad",
  trustDesc: "Identra cumple los estándares más altos del sector, con protocolos estrictos de cumplimiento y certificaciones independientes para proteger tus registros de empleados.",
  securityCertsCta: "Explorar certificaciones de seguridad",
  readyTitle: "¿Listo para empezar?",
  readyDesc: "Ponte en contacto o explora Identra hoy. Configura workflows biométricos personalizados para tus operaciones de workforce.",
  tryDemo: "Trải nghiệm demo",
  explorePlatform: "Explorar plataforma"
};

WORKFORCE_IDV_PAGE_TRANSLATIONS.vi = {
  coreLabel: "workforce-idv-core",
  trustLogos: {
      "oktaMark": "O",
      "okta": "okta",
      "intercomMark": "I",
      "intercom": "INTERCOM",
      "ro": "ro"
    },
  badges: [
      "CCPA Compliant",
      "GDPR Ready",
      "SOC 2 Type II",
      "ISO 27001",
      "HIPAA compliant",
      "FERPA certified",
      "Age Checked",
      "iBeta Level 2"
    ],
  badge: "Bảo vệ định danh doanh nghiệp",
  heroTitle: "Xác minh nhân viên vào đúng những thời điểm kẻ tấn công nhắm đến nhiều nhất.",
  heroDesc: "Chặn kỹ nghệ xã hội, deepfake và giả mạo ở mọi giai đoạn vòng đời nhân viên. Bảo vệ hệ thống bằng chứng thực định danh mật mã.",
  consultationCta: "Nhận tư vấn cho Workforce",
  candidateCta: "Đi tới xác minh ứng viên",
  ledgerTitle: "Sổ cái định danh nhân viên",
  ledgerDesc: "Bảo vệ thông tin xác thực doanh nghiệp liên tục",
  secured: "ĐÃ BẢO VỆ",
  lifecycleEvents: "SỰ KIỆN VÒNG ĐỜI",
  status: "TRẠNG THÁI",
  ledgerEvents: [
    { title: "Tái xác minh bộ phận hỗ trợ CNTT", status: "Khớp sinh trắc học 99,8%", time: "10:45" },
    { title: "Đặt lại mật khẩu quản trị IAM", status: "Đã ràng buộc 2FA phần cứng", time: "09:12" },
    { title: "Onboarding nhân viên mới", status: "Đang kiểm tra giấy tờ...", time: "Vừa xong" }
  ],
  protectionShield: "Lá chắn bảo vệ doanh nghiệp",
  protectionShieldDesc: "Bảo vệ hơn 2,5 triệu lượt xác thực doanh nghiệp mỗi ngày",
  trustedBy: "ĐƯỢC CÁC LỰC LƯỢNG LAO ĐỘNG HÀNG ĐẦU THẾ GIỚI TIN DÙNG",
  scaleLabel: "Quy mô & phạm vi doanh nghiệp",
  scaleTitle: "Mở rộng toàn cầu theo nhu cầu kinh doanh với Identra",
  scaleDesc: "Đảm bảo xác minh định danh toàn diện mà không tạo điểm nghẽn. Nền tảng doanh nghiệp của Identra xử lý giao dịch tức thì và tuân thủ luật riêng tư dữ liệu địa phương trên toàn thế giới.",
  stats: [
    { value: "200+", label: "quốc gia và vùng lãnh thổ được hỗ trợ để xác minh nhân viên" },
    { value: "<1 phút", label: "cho xác minh giấy tờ chính phủ và selfie" },
    { value: "50+", label: "tích hợp với các nền tảng công nghệ hàng đầu" }
  ],
  globalGrid: "Lưới xác minh toàn cầu",
  globalGridDesc: "Định tuyến khu vực GDPR, SOC 2 và CCPA đang hoạt động.",
  lifecycleLabel: "Toàn bộ vòng đời nhân viên",
  lifecycleTitle: "Bảo vệ doanh nghiệp ở mọi giai đoạn vòng đời nhân viên",
  lifecycleDesc: "Xác minh danh tính đời thực và tự động bảo vệ đăng nhập tại các mốc quan trọng. Kiểm soát truy cập khi tuyển dụng, bảo vệ onboarding và giảm rủi ro chiếm đoạt qua khôi phục mật khẩu.",
  stages: {
    hiring: { stage: "STAGE 01", title: "Tuyển dụng", desc: "Bảo vệ khỏi gian lận ứng viên. Xác nhận danh tính đời thực và sự hiện diện thật của người phỏng vấn trong quy trình tuyển dụng." },
    onboarding: { stage: "STAGE 02", title: "Onboarding", desc: "Bảo vệ onboarding và đăng ký thiết bị. Xác minh danh tính đời thực của nhân viên trước khi cấp quyền vào hệ thống làm việc." },
    employment: { stage: "STAGE 03", title: "Làm việc", desc: "Tự phục vụ khôi phục tài khoản và hành động đặc quyền. Tái xác minh danh tính khi đặt lại mật khẩu hoặc thực hiện thủ tục quản trị rủi ro cao." }
  },
  initialLog: "Hệ thống chờ. Đang đợi sự kiện workforce...",
  logs: {
    hiring: ["🚀 [CÔNG CỤ TUYỂN DỤNG] Ứng viên đang gửi giấy tờ...", "🔍 Đang quét danh tính tổng hợp và đối chiếu khuôn mặt với video trực tiếp...", "⚠️ Cảnh báo: phân tích nhịp gõ cho thấy thao tác nhập liệu của người thật. Đạt.", "✨ Thành công: ứng viên David đã vượt qua sàng lọc AML và danh sách cảnh báo toàn cầu. Độ tin cậy cao."],
    onboarding: ["📥 [MÔ-ĐUN TIẾP NHẬN] Nhân viên mới đã chấp nhận đề nghị. Đang cấp liên kết IDV...", "📱 Đã chụp selfie và xác minh hiện diện 3D...", "🔑 Đang liên kết mã định danh mật mã với khóa phần cứng doanh nghiệp...", "✅ Đã lưu hồ sơ. Webhook ghi danh tự động đã được kích hoạt cho Active Directory."],
    employment: ["🔒 [Bảo vệ an ninh] Phát hiện hành động IAM đặc quyền cao: đặt lại mật khẩu quản trị toàn cục...", "📲 Đã gửi thử thách thời gian thực đến thiết bị di động. Đang chờ xác minh...", "🤳 Người dùng đã hoàn tất quét khuôn mặt. Khớp cấu trúc 99,7% với hồ sơ onboarding...", "🔓 Đã cấp quyền truy cập. Phiên khởi tạo thành công."]
  },
  activeTelemetryStream: "LUỒNG TELEMETRY ĐANG HOẠT ĐỘNG:",
  simulatingEvent: "ĐANG MÔ PHỎNG SỰ KIỆN",
  crunching: "Đang xử lý telemetry sinh trắc học đa yếu tố...",
  milestoneHint: "Nhấn các mốc khác (tuyển dụng, onboarding, làm việc) để thử kịch bản xác minh cụ thể.",
  restartEvent: "Khởi động lại sự kiện",
  lifecycleBenefits: [
    { title: "Tự động hóa nền tảng", desc: "Tích hợp Identra liền mạch vào workflow với hỗ trợ gốc cho các nền tảng IAM và công cụ nhân sự hàng đầu." },
    { title: "Giảm xem xét thủ công", desc: "Giảm tải xem xét thủ công bằng giải pháp tự động xác minh danh tính và giấy tờ khớp trong vài giây." },
    { title: "Phát hiện mối đe dọa & cảnh báo", desc: "Thiết lập cảnh báo để phát hiện hành vi đăng nhập bất thường, mạng IP đáng ngờ hoặc nỗ lực deepfake ngay lập tức." }
  ],
  flowsLabel: "Luồng sinh trắc học mạnh mẽ",
  flowsTitle: "Xác minh lực lượng lao động ở bất kỳ đâu",
  flowsDesc: "Cấu hình xác minh định danh để tự động kích hoạt vào các thời điểm quan trọng như onboarding nhân viên, yêu cầu hỗ trợ, khôi phục tài khoản và hành động nhạy cảm.",
  tabs: [
    { id: "mobile-first", title: "Bật xác minh ưu tiên di động để bảo đảm mạnh hơn", desc: "Cho phép nhân viên hoàn tất xác minh an toàn trên thiết bị di động cá nhân trong vài giây." },
    { id: "consistency", title: "Đảm bảo nhất quán định danh", desc: "Đối chiếu dữ liệu người dùng với hồ sơ onboarding để xác minh nhân viên quay lại một cách đáng tin cậy." },
    { id: "detect-fraud", title: "Phát hiện gian lận và xác nhận danh tính đời thực", desc: "Phát hiện giấy tờ giả hoặc tín hiệu camera bị chèn ngay lập tức bằng sổ cái AI mạnh mẽ." },
    { id: "route-results", title: "Chuyển kết quả tới stack bảo mật và CNTT hiện có", desc: "Đẩy phê duyệt xác thực định danh trực tiếp tới Active Directory, Okta hoặc nhật ký nội bộ." }
  ],
  phone: {
    time: "9:41 AM",
    network: "5G",
    initial: "P",
    passport: "USA_PASSPORT",
    postOkta: "POST https://api.okta.com/users",
    verifyTitle: "Xác minh danh tính của bạn",
    verifyDesc: "Vui lòng chuẩn bị giấy tờ định danh hoặc hộ chiếu để hoàn tất onboarding.",
    begin: "Bắt đầu xác minh",
    sandbox: "Sandbox workforce an toàn",
    biometricMatch: "Khớp sinh trắc học",
    matchScore: "KHỚP 99,7%",
    consistencyDesc: "Tham số sinh trắc học đã được xác minh thành công với hồ sơ tham chiếu thu ở onboarding ban đầu.",
    consistencyPassed: "KIỂM TRA NHẤT QUÁN: ĐẠT",
    documentAnalysis: "PHÂN TÍCH GIẤY TỜ ĐỊNH DANH",
    documentDesc: "Mô hình AI tài liệu xác thực vi mẫu bảo mật và đối chiếu cơ sở dữ liệu toàn cầu.",
    documentPassed: "XÁC THỰC GIẤY TỜ: ĐẠT",
    outgoingWebhook: "WEBHOOK GỬI RA",
    syncComplete: "200 OK - ĐỒNG BỘ HOÀN TẤT",
    routeDesc: "Thông tin xác thực đã đồng bộ với Active Directory doanh nghiệp. Khóa phần cứng đã ràng buộc.",
    provisionComplete: "LUỒNG CẤP QUYỀN HOÀN TẤT",
    checklist: "Danh sách onboarding",
    checklistItems: ["Đăng ký thiết bị", "Hành động nhạy cảm", "Khôi phục tài khoản"],
    offboarding: "OFFBOARDING",
    accessRevoke: "Tự động thu hồi quyền truy cập",
    offboardingDesc: "Tự động đóng băng token xác thực ngay khi trạng thái offboarding được đánh dấu trong BambooHR hoặc Workday."
  },
  integrationsLabel: "Tích hợp liền mạch",
  integrationsTitle: "Hợp nhất stack định danh để tăng cường bảo mật",
  integrationsDesc: "Identra tích hợp liền mạch với hệ thống IAM, HRIS, CNTT và bảo mật, giúp hợp nhất stack công nghệ, tự động hóa workflow xác minh định danh và tăng cường bảo mật mà không cần thay đổi hạ tầng hiện có.",
  integrations: buildWorkforceIntegrations("vi"),
  exploreIntegrations: "Khám phá tất cả tích hợp",
  integrationHub: "Trung tâm tích hợp",
  connected: "ĐÃ KẾT NỐI",
  securityGateway: "Cổng bảo mật",
  securityChallenge: "Thử thách bảo mật động đang hoạt động",
  securityChallengeDescPrefix: "Kích hoạt tức thì luồng xác minh tự động của",
  securityChallengeDescSuffix: "khi chỉ báo rủi ro cao vượt điểm đe dọa đã cấu hình.",
  hiringLabel: "Bảo mật phễu tuyển dụng",
  candidateTitle: "Xác minh ứng viên cho quy trình tuyển dụng",
  candidateDesc: "Giảm thời gian xử lý ứng viên gian lận bằng cách xác minh danh tính sớm. Bảo vệ tổ chức khỏi mối đe dọa mới nổi và giúp ứng viên đủ điều kiện tiếp tục mà không có ma sát không cần thiết.",
  candidateLearnCta: "Tìm hiểu về xác minh ứng viên",
  candidateGrid: WORKFORCE_CANDIDATE_GRID,
  detailsLabel: "Chi tiết chuyên sâu",
  detailsTitle: "Tìm hiểu sâu hơn về tính năng bảo mật Workforce",
  accordions: [
    { id: "library", title: "Thư viện xác minh và tín hiệu mạnh mẽ", columns: [{ title: "Liên kết danh tính và thiết bị", desc: "Chống deepfake và các hình thức gian lận khác bằng xác minh hiện diện qua selfie, xác minh video, liên kết thiết bị 2FA và nhiều phương thức khác." }, { title: "Phạm vi xác minh toàn cầu", desc: "Thu thập và xác minh giấy tờ do cơ quan nhà nước cấp như hộ chiếu, giấy phép lái xe từ hơn 200 quốc gia và vùng lãnh thổ." }, { title: "Thiết lập và kiểm tra có thể cấu hình", desc: "Điều chỉnh yêu cầu chất lượng ảnh, phát hiện che khuất khuôn mặt, số lần thử lại và nhiều yếu tố khác theo nhu cầu." }, { title: "Xác minh không dùng giấy tờ", desc: "Kiểm tra PII đã thu thập và danh tính số với nguồn phát hành cùng nguồn dữ liệu có thẩm quyền trên toàn cầu." }] },
    { id: "usability", title: "Cân bằng bảo mật với tính dễ dùng", paragraphs: ["Bảo mật chỉ hiệu quả khi nhân viên thật sự sử dụng. Workforce IDV của Identra cung cấp bố cục trực quan, đáp ứng và thân thiện di động, tải trong vài giây.", "Người dùng có thể chuyển mượt từ máy tính sang điện thoại bằng cách quét mã QR an toàn để chụp giấy tờ và hoàn tất quét khuôn mặt ít ma sát."] },
    { id: "adaptive-controls", title: "Kiểm soát thích ứng phù hợp giải pháp IAM", paragraphs: ["Mỗi doanh nghiệp có mô hình đe dọa riêng. Cấu hình tuyến điều kiện để chỉ áp dụng thử thách sinh trắc học đa yếu tố khi thông số rủi ro vượt ngưỡng.", "Đồng bộ hoàn hảo với các trung tâm định danh như Okta, Duo và Azure AD bằng thành phần SDK tích hợp, đảm bảo bảo vệ liên tục không trễ."] }
  ],
  trustTitle: "Niềm tin được xây dựng trên bảo mật và quyền riêng tư",
  trustDesc: "Identra tuân thủ các tiêu chuẩn ngành cao nhất, duy trì giao thức tuân thủ nghiêm ngặt và chứng nhận độc lập để bảo vệ bạn và hồ sơ nhân viên.",
  securityCertsCta: "Khám phá chứng nhận bảo mật",
  readyTitle: "Sẵn sàng bắt đầu?",
  readyDesc: "Liên hệ hoặc bắt đầu khám phá Identra hôm nay. Thiết lập workflow sinh trắc học tùy chỉnh dành riêng cho vận hành workforce của bạn.",
  tryDemo: "Trải nghiệm demo",
  explorePlatform: "Khám phá nền tảng"
};

WORKFORCE_IDV_PAGE_TRANSLATIONS.ja = {
  coreLabel: "workforce-idv-core",
  trustLogos: {
      "oktaMark": "O",
      "okta": "okta",
      "intercomMark": "I",
      "intercom": "INTERCOM",
      "ro": "ro"
    },
  badges: [
      "CCPA Compliant",
      "GDPR Ready",
      "SOC 2 Type II",
      "ISO 27001",
      "HIPAA compliant",
      "FERPA certified",
      "Age Checked",
      "iBeta Level 2"
    ],
  badge: "企業向けID保護",
  heroTitle: "攻撃者が最も狙う瞬間に従業員を確認。",
  heroDesc: "従業員ライフサイクル全体で、ソーシャルエンジニアリング、deepfake、なりすましを阻止します。暗号学的な本人確認でシステムを守ります。",
  consultationCta: "Workforceの相談を依頼",
  candidateCta: "候補者確認へ移動",
  ledgerTitle: "従業員ID台帳",
  ledgerDesc: "企業認証情報の継続保護",
  secured: "保護中",
  lifecycleEvents: "ライフサイクルイベント",
  status: "ステータス",
  ledgerEvents: [
    { title: "ITヘルプデスク再確認", status: "生体一致 99.8%", time: "10:45" },
    { title: "IAM管理者パスワードリセット", status: "ハードウェア2FA連携済み", time: "09:12" },
    { title: "新入社員オンボーディング", status: "書類確認中...", time: "たった今" }
  ],
  protectionShield: "企業保護シールド",
  protectionShieldDesc: "1日250万件超の企業認証を保護",
  trustedBy: "世界有数の従業員組織が信頼",
  scaleLabel: "企業規模とカバレッジ",
  scaleTitle: "Identraで事業ニーズに合わせてグローバルに拡張",
  scaleDesc: "ボトルネックなしで包括的な本人確認を実現します。Identraの企業向けプラットフォームは、世界各地のデータプライバシー法に準拠しながら即時に処理します。",
  stats: [
    { value: "200+", label: "従業員確認に対応する国と地域" },
    { value: "<1分", label: "公的IDとセルフィー確認に必要な時間" },
    { value: "50+", label: "主要テクノロジープラットフォームとの連携" }
  ],
  globalGrid: "グローバル確認グリッド",
  globalGridDesc: "GDPR、SOC 2、CCPAの地域ルーティングが有効です。",
  lifecycleLabel: "従業員ライフサイクル全体",
  lifecycleTitle: "従業員ライフサイクルの各段階でビジネスを保護",
  lifecycleDesc: "実在する身元を確認し、主要な節目でログインを自動保護します。採用時のアクセス制御、オンボーディングの保護、パスワード復旧乗っ取りの抑止を実現します。",
  stages: {
    hiring: { stage: "STAGE 01", title: "採用", desc: "候補者詐欺を防ぎます。採用プロセス中に面接者の実在身元と本人の存在を確認します。" },
    onboarding: { stage: "STAGE 02", title: "オンボーディング", desc: "オンボーディングと端末登録を保護します。職場システムへのアクセス付与前に従業員の実在身元を確認します。" },
    employment: { stage: "STAGE 03", title: "勤務中", desc: "セルフサービスのアカウント復旧と特権操作を保護します。パスワードリセットや高リスク管理操作時に本人確認を再実行します。" }
  },
  initialLog: "システム待機中。workforceイベントを待っています...",
  logs: {
    hiring: ["🚀 [採用エンジン] 候補者が応募書類を送信中...", "🔍 合成IDをスキャンし、ライブ映像と顔照合中...", "⚠️ アラート: キーストローク解析は標準的な人間入力を示しています。合格。", "✨ 成功: 候補者DavidをグローバルAMLとwatchlistで確認。高信頼度。"],
    onboarding: ["📥 [オンボーディングモジュール] 新入社員が承諾。IDVリンクを準備中...", "📱 セルフィーを取得し、高度な3D liveness検出で確認済み...", "🔑 暗号IDトークンを企業ハードウェアキーにバインド中...", "✅ プロフィール保存済み。Active Directory向け自動登録webhookを起動。"],
    employment: ["🔒 [セキュリティガード] 高権限IAM操作を検出: グローバル管理者パスワードリセット...", "📲 リアルタイムチャレンジをモバイル端末へ送信。確認待ち...", "🤳 顔スキャン完了。オンボーディングプロフィールと99.7%構造一致...", "🔓 アクセス許可。セッションを正常に初期化。"]
  },
  activeTelemetryStream: "アクティブなテレメトリストリーム:",
  simulatingEvent: "イベントをシミュレート中",
  crunching: "多要素生体テレメトリを処理中...",
  milestoneHint: "他の節目 (採用、オンボーディング、勤務中) をクリックして確認シナリオを試せます。",
  restartEvent: "イベントを再実行",
  lifecycleBenefits: [
    { title: "プラットフォーム自動化", desc: "主要IAMプラットフォームと人事ツールのネイティブ対応により、Identraをワークフローへシームレスに統合します。" },
    { title: "手動レビューを削減", desc: "本人確認と書類照合を数秒で実行する自動ソリューションにより、チームの手動レビュー負担を減らします。" },
    { title: "脅威検出とアラート", desc: "従業員ログインの異常行動、不審なIPネットワーク、deepfake試行を即座に検出するアラートを設定します。" }
  ],
  flowsLabel: "堅牢な生体認証フロー",
  flowsTitle: "従業員がどこにいても確認",
  flowsDesc: "従業員オンボーディング、ヘルプデスク依頼、アカウント復旧、重要操作など、必要な瞬間に本人確認を自動実行します。",
  tabs: [
    { id: "mobile-first", title: "モバイル優先の確認で保証を強化", desc: "従業員が自分のモバイル端末で数秒以内に安全な確認を完了できます。" },
    { id: "consistency", title: "IDの一貫性を確保", desc: "ユーザーデータをオンボーディングファイルと動的に照合し、戻ってきた従業員を確実に確認します。" },
    { id: "detect-fraud", title: "不正を検出し実在身元を確認", desc: "堅牢なAI台帳により、偽造書類や注入されたカメラ信号を即時に検出します。" },
    { id: "route-results", title: "既存のセキュリティ・ITスタックへ結果を送信", desc: "ID確認の承認をActive Directory、Okta、内部ログへ即時に送信します。" }
  ],
  phone: {
    time: "9:41 AM",
    network: "5G",
    initial: "P",
    passport: "USA_PASSPORT",
    postOkta: "POST https://api.okta.com/users",
    verifyTitle: "本人確認",
    verifyDesc: "オンボーディング完了のため、公的IDまたはパスポートを準備してください。",
    begin: "確認を開始",
    sandbox: "安全なworkforce Sandbox",
    biometricMatch: "生体一致",
    matchScore: "99.7%一致",
    consistencyDesc: "初回オンボーディングで取得した参照記録に対し、生体パラメータを正常に確認しました。",
    consistencyPassed: "一貫性チェック: 合格",
    documentAnalysis: "ID書類解析",
    documentDesc: "AI書類モデルがセキュリティ微細パターンを認証し、グローバルデータベースと照合します。",
    documentPassed: "書類認証: 合格",
    outgoingWebhook: "送信webhook",
    syncComplete: "200 OK - 同期完了",
    routeDesc: "認証情報を企業Active Directoryと正常に同期しました。ハードウェアキーはバインド済みです。",
    provisionComplete: "プロビジョニングフロー完了",
    checklist: "オンボーディングチェックリスト",
    checklistItems: ["端末登録", "重要操作", "アカウント復旧"],
    offboarding: "オフボーディング",
    accessRevoke: "アクセス自動取り消し",
    offboardingDesc: "BambooHRまたはWorkdayでオフボーディング状態が示されると、認証トークンを自動で凍結します。"
  },
  integrationsLabel: "シームレスな連携",
  integrationsTitle: "IDスタックを統合してセキュリティを強化",
  integrationsDesc: "IdentraはIAM、HRIS、IT、セキュリティシステムとシームレスに連携し、既存インフラを大きく変えずに技術スタックの統合、本人確認ワークフローの自動化、セキュリティ強化を実現します。",
  integrations: buildWorkforceIntegrations("ja"),
  exploreIntegrations: "すべての連携を見る",
  integrationHub: "連携ハブ",
  connected: "接続済み",
  securityGateway: "セキュリティゲートウェイ",
  securityChallenge: "動的セキュリティチャレンジ有効",
  securityChallengeDescPrefix: "高リスク指標が設定済み脅威スコアを超えた場合、",
  securityChallengeDescSuffix: "確認フローを即時に自動起動します。",
  hiringLabel: "採用ファネルの保護",
  candidateTitle: "採用パイプライン向け候補者確認",
  candidateDesc: "候補者の身元を早期に確認し、不正応募者に費やす時間を削減します。新たな脅威から組織を守り、有望な候補者を不要な摩擦なく前進させます。",
  candidateLearnCta: "候補者確認を見る",
  candidateGrid: WORKFORCE_CANDIDATE_GRID,
  detailsLabel: "詳細",
  detailsTitle: "Workforceセキュリティ機能の詳細",
  accordions: [
    { id: "library", title: "確認とシグナルの堅牢なライブラリ", columns: [{ title: "IDと端末のバインド", desc: "セルフィーliveness、動画確認、2FA端末バインドなどでdeepfakeやその他の不正に対抗します。" }, { title: "グローバル確認範囲", desc: "200以上の国と地域から、パスポートや運転免許証などの公的ID書類を収集・確認します。" }, { title: "設定可能な確認項目", desc: "画像品質、顔の遮蔽検出、再試行回数などを要件に合わせて調整します。" }, { title: "非書類型確認", desc: "収集したPIIとデジタルIDを、世界の発行元および権威ある情報源と安全に照合します。" }] },
    { id: "usability", title: "セキュリティと使いやすさの両立", paragraphs: ["セキュリティは従業員が実際に使ってこそ機能します。IdentraのWorkforce IDVは、直感的でレスポンシブ、モバイルに適した画面を数秒で読み込みます。", "ユーザーは安全なQRコードをスキャンするだけでPCからスマートフォンへ移り、書類撮影と顔スキャンをスムーズに完了できます。"] },
    { id: "adaptive-controls", title: "IAMソリューションに合わせた適応制御", paragraphs: ["企業ごとに脅威モデルは異なります。リスクがしきい値を超えた場合のみ多要素生体チャレンジを適用する条件付きルーティングを設定できます。", "組み込みSDKコンポーネントにより、Okta、Duo、Azure ADなどのIDハブと完全に同期し、遅延のない継続保護を実現します。"] }
  ],
  trustTitle: "信頼はセキュリティとプライバシーの上に築かれます",
  trustDesc: "Identraは業界最高水準に準拠し、厳格なコンプライアンス手順と独立認証により、貴社と従業員記録を保護します。",
  securityCertsCta: "セキュリティ認証を見る",
  readyTitle: "始める準備はできましたか？",
  readyDesc: "お問い合わせ、または今すぐIdentraをお試しください。従業員運用に合わせたカスタム生体認証ワークフローを設定できます。",
  tryDemo: "Trải nghiệm demo",
  explorePlatform: "プラットフォームを見る"
};

WORKFORCE_IDV_PAGE_TRANSLATIONS.de = {
  coreLabel: "workforce-idv-core",
  trustLogos: {
      "oktaMark": "O",
      "okta": "okta",
      "intercomMark": "I",
      "intercom": "INTERCOM",
      "ro": "ro"
    },
  badges: [
      "CCPA Compliant",
      "GDPR Ready",
      "SOC 2 Type II",
      "ISO 27001",
      "HIPAA compliant",
      "FERPA certified",
      "Age Checked",
      "iBeta Level 2"
    ],
  badge: "Enterprise-Identitätsschutz",
  heroTitle: "Verifizieren Sie Mitarbeitende genau in den Momenten, die Angreifer am stärksten ausnutzen.",
  heroDesc: "Stoppen Sie Social Engineering, Deepfakes und Identitätsmissbrauch in jeder Phase des Mitarbeiterlebenszyklus. Schützen Sie Systeme mit kryptografischem Identitätsnachweis.",
  consultationCta: "Beratung für Workforce anfragen",
  candidateCta: "Zur Kandidatenverifizierung",
  ledgerTitle: "Mitarbeiter-Identitätsregister",
  ledgerDesc: "Kontinuierlicher Schutz von Unternehmenszugangsdaten",
  secured: "GESICHERT",
  lifecycleEvents: "LEBENSZYKLUS-EREIGNISSE",
  status: "STATUS",
  ledgerEvents: [
    { title: "IT-Helpdesk-Reverifizierung", status: "Biometrischer Treffer 99,8%", time: "10:45" },
    { title: "IAM-Admin-Passwort zurücksetzen", status: "Hardware-2FA gebunden", time: "09:12" },
    { title: "Onboarding neuer Mitarbeitender", status: "Dokumentprüfung...", time: "Gerade eben" }
  ],
  protectionShield: "Enterprise-Schutzschild",
  protectionShieldDesc: "Schützt täglich über 2,5 Mio. Unternehmensauthentifizierungen",
  trustedBy: "VERTRAUT VON FÜHRENDEN WORKFORCES WELTWEIT",
  scaleLabel: "Enterprise-Skalierung & Abdeckung",
  scaleTitle: "Skalieren Sie mit Identra global nach Ihren Geschäftsanforderungen",
  scaleDesc: "Stellen Sie umfassende Identitätsprüfung ohne Engpässe sicher. Identras Enterprise-Plattform verarbeitet Transaktionen sofort und erfüllt lokale Datenschutzgesetze weltweit.",
  stats: [
    { value: "200+", label: "Länder und Regionen zur Verifizierung von Mitarbeitenden" },
    { value: "<1 Min.", label: "für amtliche ID- und Selfie-Verifizierungen" },
    { value: "50+", label: "Integrationen mit führenden Technologieplattformen" }
  ],
  globalGrid: "Globales Verifizierungsraster",
  globalGridDesc: "Regionale Weiterleitung für GDPR, SOC 2 und CCPA aktiv.",
  lifecycleLabel: "Vollständiger Mitarbeiterlebenszyklus",
  lifecycleTitle: "Schützen Sie Ihr Unternehmen in jeder Phase des Mitarbeiterlebenszyklus",
  lifecycleDesc: "Verifizieren Sie reale Identitäten und schützen Sie Logins automatisch an wichtigen Meilensteinen. Kontrollieren Sie Zugriff bei Einstellung, sichern Sie Onboarding und verhindern Sie Übernahmen bei Passwortwiederherstellung.",
  stages: {
    hiring: { stage: "STAGE 01", title: "Einstellung", desc: "Schützen Sie sich vor Kandidatenbetrug. Bestätigen Sie reale Identitäten und echte Anwesenheit während des Bewerbungsprozesses." },
    onboarding: { stage: "STAGE 02", title: "Onboarding", desc: "Sichern Sie Onboarding und Geräteanmeldung. Verifizieren Sie reale Identitäten vor dem Zugriff auf Arbeitsplatzsysteme." },
    employment: { stage: "STAGE 03", title: "Beschäftigung", desc: "Self-Service-Kontowiederherstellung und privilegierte Aktionen. Verifizieren Sie Identität bei Passwortresets oder riskanten Admin-Prozessen erneut." }
  },
  initialLog: "System bereit. Wartet auf Workforce-Ereignisse...",
  logs: {
    hiring: ["🚀 [Hiring Engine] Kandidat reicht Bewerbungsdokumente ein...", "🔍 Suche nach synthetischen Identitäten und Gesichtsabgleich mit Live-Video...", "⚠️ Hinweis: Tastatur-Telemetrie zeigt normale menschliche Eingabe. Bestanden.", "✨ Erfolg: Kandidat David gegen globale AML- und Watchlists verifiziert. Hohe Sicherheit."],
    onboarding: ["📥 [Onboarding-Modul] Neueinstellung akzeptiert. IDV-Link wird bereitgestellt...", "📱 Selfie erfasst und mit fortschrittlicher 3D-liveness-Erkennung verifiziert...", "🔑 Kryptografischer Identitätstoken wird an Unternehmens-Hardwareschlüssel gebunden...", "✅ Profil gespeichert. Automatischer Enrollment-webhook für Active Directory ausgelöst."],
    employment: ["🔒 [Security Guard] Hochprivilegierte IAM-Aktion erkannt: Global Admin Password Reset...", "📲 Echtzeit-Challenge an mobiles Gerät gesendet. Verifizierung ausstehend...", "🤳 Gesichtsscan abgeschlossen. 99,7% struktureller Treffer mit Onboarding-Profil...", "🔓 Zugriff gewährt. Sitzung erfolgreich initialisiert."]
  },
  activeTelemetryStream: "AKTIVER TELEMETRIESTREAM:",
  simulatingEvent: "EREIGNIS WIRD SIMULIERT",
  crunching: "Mehrfaktor-biometrische Telemetrie wird verarbeitet...",
  milestoneHint: "Klicken Sie auf andere Meilensteine (Einstellung, Onboarding, Beschäftigung), um spezifische Szenarien zu testen.",
  restartEvent: "Ereignis neu starten",
  lifecycleBenefits: [
    { title: "Plattformautomatisierung", desc: "Integrieren Sie Identra nahtlos in Ihre Workflows mit nativer Unterstützung führender IAM-Plattformen und HR-Tools." },
    { title: "Manuelle Prüfung reduzieren", desc: "Reduzieren Sie manuelle Prüfungen mit einer automatisierten Lösung, die Identitäten und Dokumente in Sekunden verifiziert." },
    { title: "Bedrohungserkennung & Warnungen", desc: "Richten Sie Warnungen ein, um ungewöhnliche Mitarbeiterlogins, verdächtige IP-Netzwerke oder Deepfake-Versuche sofort zu erkennen." }
  ],
  flowsLabel: "Robuste biometrische Flows",
  flowsTitle: "Verifizieren Sie Ihre Workforce überall",
  flowsDesc: "Konfigurieren Sie Identitätsprüfung so, dass sie automatisch bei wichtigen Momenten auslöst, etwa Onboarding, Helpdesk-Anfragen, Kontowiederherstellung und sensiblen Aktionen.",
  tabs: [
    { id: "mobile-first", title: "Mobile-first-Verifizierung für stärkere Sicherheit aktivieren", desc: "Mitarbeitende können sichere Verifizierung auf eigenen Mobilgeräten in Sekunden abschließen." },
    { id: "consistency", title: "Identitätskonsistenz sicherstellen", desc: "Vergleichen Sie Nutzerdaten dynamisch mit Onboarding-Dateien, um zurückkehrende Mitarbeitende zuverlässig zu verifizieren." },
    { id: "detect-fraud", title: "Betrug erkennen und reale Identität bestätigen", desc: "Erkennen Sie gefälschte Dokumente oder eingespeiste Kamerasignale sofort mit unserem robusten KI-Register." },
    { id: "route-results", title: "Ergebnisse an Ihren Security- und IT-Stack senden", desc: "Senden Sie Identitätsfreigaben sofort an Active Directory, Okta oder interne Logs." }
  ],
  phone: {
    time: "9:41 AM",
    network: "5G",
    initial: "P",
    passport: "USA_PASSPORT",
    postOkta: "POST https://api.okta.com/users",
    verifyTitle: "Identität verifizieren",
    verifyDesc: "Bitte halten Sie Ihren Ausweis oder Reisepass bereit, um das Onboarding abzuschließen.",
    begin: "Verifizierung starten",
    sandbox: "Sichere Workforce-Sandbox",
    biometricMatch: "Biometrischer Treffer",
    matchScore: "99,7% TREFFER",
    consistencyDesc: "Biometrische Parameter wurden erfolgreich mit Referenzdaten aus dem ersten Onboarding abgeglichen.",
    consistencyPassed: "KONSISTENZPRÜFUNG: BESTANDEN",
    documentAnalysis: "ID-DOKUMENTANALYSE",
    documentDesc: "Das KI-Dokumentmodell authentifiziert Sicherheits-Mikromuster und gleicht globale Datenbanken ab.",
    documentPassed: "DOKUMENTAUTHENTIFIZIERUNG: BESTANDEN",
    outgoingWebhook: "AUSGEHENDER WEBHOOK",
    syncComplete: "200 OK - SYNCHRONISATION ABGESCHLOSSEN",
    routeDesc: "Zugangsdaten erfolgreich mit Enterprise Active Directory synchronisiert. Hardwareschlüssel gebunden.",
    provisionComplete: "BEREITSTELLUNGSFLOW ABGESCHLOSSEN",
    checklist: "Onboarding-Checkliste",
    checklistItems: ["Geräteregistrierung", "Sensible Aktionen", "Kontowiederherstellung"],
    offboarding: "OFFBOARDING",
    accessRevoke: "Automatischer Zugriffsentzug",
    offboardingDesc: "Zugangstoken werden automatisch eingefroren, sobald in BambooHR oder Workday ein Offboarding-Status markiert ist."
  },
  integrationsLabel: "Nahtlose Integrationen",
  integrationsTitle: "Vereinheitlichen Sie Ihren Identitätsstack für stärkere Sicherheit",
  integrationsDesc: "Identra integriert sich nahtlos in IAM-, HRIS-, IT- und Sicherheitssysteme, damit Sie Ihren Tech-Stack vereinheitlichen, Identitätsprüfungsworkflows automatisieren und Sicherheit stärken können, ohne bestehende Infrastruktur umzubauen.",
  integrations: buildWorkforceIntegrations("de"),
  exploreIntegrations: "Alle Integrationen entdecken",
  integrationHub: "Integrationshub",
  connected: "VERBUNDEN",
  securityGateway: "Security Gateway",
  securityChallenge: "Dynamische Sicherheits-Challenge aktiv",
  securityChallengeDescPrefix: "Lösen Sie automatisch einen",
  securityChallengeDescSuffix: "Verifizierungsflow aus, sobald Hochrisikoindikatoren konfigurierte Bedrohungswerte überschreiten.",
  hiringLabel: "Sicherheit im Einstellungstrichter",
  candidateTitle: "Kandidatenverifizierung für Ihre Einstellungspipeline",
  candidateDesc: "Reduzieren Sie Zeitaufwand für betrügerische Bewerber durch frühe Identitätsprüfung. Schützen Sie Ihre Organisation vor neuen Bedrohungen und halten Sie qualifizierte Kandidaten ohne unnötige Reibung in Bewegung.",
  candidateLearnCta: "Mehr über Candidate Verification",
  candidateGrid: WORKFORCE_CANDIDATE_GRID,
  detailsLabel: "Detaillierte Einblicke",
  detailsTitle: "Ein tieferer Blick auf Workforce-Sicherheitsfunktionen",
  accordions: [
    { id: "library", title: "Robuste Bibliothek aus Verifizierungen und Signalen", columns: [{ title: "Identitäts- und Gerätebindung", desc: "Bekämpfen Sie Deepfakes und andere Betrugsarten mit Selfie-liveness, Videoverifizierung, 2FA-Gerätebindung und mehr." }, { title: "Globale Verifizierungsabdeckung", desc: "Erfassen und prüfen Sie amtliche Dokumente wie Reisepässe und Führerscheine aus mehr als 200 Ländern und Regionen." }, { title: "Konfigurierbare Einstellungen und Prüfungen", desc: "Passen Sie Bildqualitätsanforderungen, Gesichtshinderniserkennung, Wiederholungsversuche und mehr an." }, { title: "Nicht dokumentbasierte Verifizierung", desc: "Prüfen Sie gesammelte PII und digitale IDs sicher gegen globale Aussteller- und Autoritätsquellen." }] },
    { id: "usability", title: "Sicherheit und Nutzbarkeit ausbalancieren", paragraphs: ["Sicherheit wirkt nur, wenn Mitarbeitende sie tatsächlich nutzen. Identras Workforce IDV bietet intuitive, responsive und mobilfreundliche Oberflächen, die in Sekunden laden.", "Nutzer wechseln nahtlos vom Laptop zum Smartphone, indem sie einen sicheren QR-Code scannen, Dokumente erfassen und Gesichtsscans reibungslos abschließen."] },
    { id: "adaptive-controls", title: "Adaptive Kontrollen passend zu Ihrer IAM-Lösung", paragraphs: ["Jedes Unternehmen hat ein eigenes Bedrohungsmodell. Konfigurieren Sie bedingte Routingmuster, um biometrische Mehrfaktor-Challenges nur bei überschrittenen Risikoschwellen auszulösen.", "Synchronisieren Sie perfekt mit Identitätshubs wie Okta, Duo und Azure AD über integrierte SDK-Komponenten für kontinuierlichen Schutz ohne Verzögerung."] }
  ],
  trustTitle: "Vertrauen entsteht durch Sicherheit und Datenschutz",
  trustDesc: "Identra hält höchste Branchenstandards ein und nutzt strenge Compliance-Protokolle sowie unabhängige Zertifizierungen, um Sie und Mitarbeiterdaten zu schützen.",
  securityCertsCta: "Sicherheitszertifizierungen entdecken",
  readyTitle: "Bereit loszulegen?",
  readyDesc: "Kontaktieren Sie uns oder erkunden Sie Identra noch heute. Richten Sie individuelle biometrische Workflows speziell für Ihre Workforce-Prozesse ein.",
  tryDemo: "Trải nghiệm demo",
  explorePlatform: "Plattform entdecken"
};
