export const TRUST_AND_SAFETY_TRANSLATIONS: any = {
  en: {
    backToHome: "Back to home",
    badge: "Trust & safety",
    heroTitlePrefix: "Build trust throughout your platform with seamless verification.",
    heroTitleHighlight: "Ensure that users are who they say they are",
    heroTitleSuffix: "at any point of the user life cycle.",
    heroDesc: "Verify identities instantly, reduce regulatory bottlenecks, and safeguard community growth without compromising your customer onboarding experience.",
    getDemo: "Get a demo",
    exploreSandboxApi: "Explore Sandbox API",
    ecosystemTitle: "Global Trust Ecosystem",
    ecosystemDesc: "Every user is uniquely cross-matched against live biometric data and telecom signaling networks in real time. Experience a frictionless verification process that shuts down bots while greeting humans.",
    passed: "PASSED",
    review: "REVIEW",
    linkedInOnboard: "LinkedIn Onboard",
    biometricsValidated: "Biometrics validated",
    neighborHost: "Neighbor Host",
    mdlCrosscheck: "mDL crosscheck",
    coffeeMeetsBagel: "CoffeeMeetsBagel",
    suspiciousIp: "Suspicious IP",
    signalsLive: "SIGNALS: LIVE",
    kycEngine: "KYC ENGINE",
    passiveIpCheck: "PASSIVE IP CHECK",
    verifiedIsp: "United States / Verified ISP",
    facialSimilarity: "FACIAL SIMILARITY",
    selfieIdMatch: "99.7% Matching Selfie/ID",
    platformAutopilot: "Platform Autopilot Decided:",
    autoApproved: "AUTO-APPROVED ✓",
    trustedBy: "Trusted by startups & the world's largest companies",
    trustedLogoLinkedInMark: "in",
    trustedLogoLinkedIn: "LinkedIn",
    trustedLogoCoffee: "CoffeeMeetsBagel",
    trustedLogoNeighborMark: "N",
    trustedLogoNeighbor: "Neighbor",
    section1Label: "1. Brand Personalization",
    section1Title: "Build verification flows that feel native to your platform",
    section1Desc: "Customize every aspect of the flow, from UI design, custom fonts, and button styling to the specific verifications different users experience, all without needing engineering resources.",
    themeConfigurator: "Interactive Theme Configurator",
    fontPairing: "Font Pairing",
    fonts: { sans: "Sans", serif: "Serif", mono: "Mono" },
    primaryAccentColor: "Primary Accent Color",
    colors: { blue: "Blue", purple: "Purple", teal: "Teal", gold: "Gold" },
    buttonBorderRadius: "Button Border Radius",
    buttons: { none: "Sharp", lg: "Medium", full: "Pill" },
    trustPass: "TRUST PASS",
    welcomeTitle: "Identity Verification Required",
    welcomeDesc: "To proceed securely, let's quickly verify your government identity credentials.",
    beginVerification: "Begin Verification",
    selectIdDocument: "Select ID Document",
    idDocs: [
      { id: "passport", name: "Passport Check", desc: "Verify using national passport" },
      { id: "driver_license", name: "Driver's License", desc: "Verify using regional DMV card" },
      { id: "national_id", name: "National Identity Card", desc: "Secure state-issued card" }
    ],
    scanningFront: "Scanning Front of Card",
    alignFrames: "Align inside frames",
    analyzingSecurity: "Analyzing holographic security features...",
    doneTitle: "Verification Submitted!",
    doneDesc: "Biometrics and security scans captured. Processing review instantly.",
    resetSimulation: "Reset Simulation",
    secureSsl: "SECURE SSL ENCRYPTION",
    riskEvaluatorTitle: "Multi-Layered Risk Evaluator",
    riskEvaluatorDesc: "Automated detection pipelines in action",
    legitimateUser: "Legitimate User",
    riskyActor: "Risky Actor",
    fraudLayers: [
      { label: "Layer 1: Passive Network Screening", metric: "IP & Geofence Logs" },
      { label: "Layer 2: Device Spoof Fingerprinting", metric: "Hardware Signature" },
      { label: "Layer 3: Global Duplicate Prevention", metric: "Accounts Association" },
      { label: "Layer 4: Biometric Liveness Verification", metric: "Real-time Facial Pulse" }
    ],
    clear: "CLEAR",
    flagged: "FLAGGED",
    evaluating: "EVALUATING...",
    idle: "IDLE",
    telemetryOutput: "// Real-time system telemetry output",
    fraudLogsLegit: [
      "Analyzing network connection: clean residential IP, no VPN detected.",
      "Checking device identifiers: modern device, standard user agent.",
      "Cross-referencing database: no multiple accounts or duplicates.",
      "Biometrics matching: high liveness score (98%), face matches ID.",
      "Result: recommended auto-approve (confidence: 99%)."
    ],
    fraudLogsRisky: [
      "Analyzing network connection: high-risk hosting VPN detected.",
      "Checking device identifiers: emulated Android device, spoofed agent.",
      "Cross-referencing database: device ID linked to 4 other accounts.",
      "Biometrics matching: low liveness score (35%), photo of photo.",
      "Result: automatically flagged for manual review (risk score: 84)."
    ],
    totalRiskScore: "Total Account Risk Score",
    autopilotRecommendation: "Autopilot Recommendation",
    autoApprove: "AUTO-APPROVE ✓",
    queueReview: "QUEUE FOR REVIEW ⚠",
    section2Label: "2. Fraud Defense",
    section2Title: "Detect bad actors with multi-layered fraud protection",
    section2Desc: "Protect your legitimate user ecosystem with automated background signals analysis and instant reverifications. Stop advanced fraud rings by uncovering connected device networks and credential-stuffing patterns before any damage is done.",
    fraudBenefits: [
      { title: "Frictionless for legit users", desc: "Allow trusted applicants to sail through using passive geofence checks." },
      { title: "Ironclad security layers", desc: "Deploy biometric verification checks only when anomalies occur." },
      { title: "Advanced ring-busting metrics", desc: "Identify shared networks and hardware variables to expose fraud syndicates." }
    ],
    section3Label: "3. Operations & Scale",
    section3Title: "Scale and streamline your identity operations",
    section3Desc: "Perform manual reviews 10x faster by giving your trust teams all necessary signals contextualized in one tab. Auto-assign suspicious files, resolve document disputes quickly, and trigger downstream compliance alerts automatically.",
    simulatorHint: "Interact with the simulator on the right to approve or reject suspicious applicant credentials.",
    caseActionMsg: "Case {id} successfully {action}",
    approved: "APPROVED",
    rejected: "REJECTED",
    caseWorkspace: "CASE WORKSPACE",
    reviewQueue: "Review Queue (Pending: 2)",
    applicantAlt: "Applicant",
    contactMethods: "Contact Methods",
    verificationFlags: "Verification Flags",
    vpnMasking: "VPN Masking:",
    emulatorUse: "Emulator Use:",
    duplicateIds: "Duplicate IDs:",
    yes: "YES",
    no: "NO",
    submittedProof: "Submitted Document Proof",
    govIdAlt: "Gov ID proof scan",
    frontScanCompleted: "FRONT_SCAN_COMPLETED",
    livenessScore: "Liveness Score:",
    autoRiskScore: "Auto-Risk Score Index:",
    riskSuffix: "RISK",
    webhookActions: "Actions will execute instant platform webhook triggers.",
    rejectProfile: "Reject Profile",
    approveRelease: "Approve & Release",
    featureLabel: "Feature Capabilities",
    featureTitle: "A complete trust toolkit on a single architecture",
    featureDesc: "Scale and coordinate every verification method, automatic screening variable, and manual investigation pipeline with a modular ecosystem.",
    exploreIntegration: "EXPLORE INTEGRATION",
    features: {
      "gov-id": { title: "Government ID verification", description: "Collect and verify your choice of government-issued IDs to identify users across 200+ countries and territories." },
      mdl: { title: "Mobile driver's license (mDL) verification", description: "Verify mobile driver's licenses with a low-friction, high-assurance verification method." },
      "flow-editor": { title: "Flow Editor", description: "Build branded user flows to collect customer information, no code needed." },
      passive: { title: "Passive signals", description: "Silently assess risk with device fingerprints and other behavioral signals." },
      "age-assure": { title: "Age assurance", description: "Comply with online safety regulations requiring age assurance, privacy, and consent." },
      "selfie-live": { title: "Selfie liveness verification", description: "Detect similar backgrounds in submitted selfies and compare against other signals with a selfie similarity check." },
      graph: { title: "Graph", description: "Uncover and block fraud rings or risky accounts that are connected." },
      cases: { title: "Cases", description: "Conduct investigations and maximize team productivity with a configurable case management hub." },
      workflows: { title: "Workflows", description: "Automate decisions and follow-ups throughout the user life cycle." }
    },
    helpLabel: "We're here to help",
    contactTitle: "Contact us to find a solution together",
    contactDesc: "Need custom routing rules or enterprise compliance SLAs? Our solutions engineering team will help design the perfect architecture.",
    contactUs: "Contact us",
    exploreCapabilities: "Explore Trust Capabilities",
    coreTags: ["Age assurance", "Verified profiles", "Account sharing detection", "Account takeover protection", "Promotion abuse"],
    moreTags: ["Synthetic ID detection", "KYC remediation", "Platform trust metric", "Sanctions crossmatch", "Geofence verification"],
    showLess: "Show less",
    more: "+ More",
    exploreMoreTitle: "Explore more of Identra's identity platform",
    exploreCards: [
      { title: "Detect and deter fraud as it evolves.", desc: "Deploy risk threshold engines and block fraudulent patterns across multiple sessions automatically." },
      { title: "Build better identity flows.", desc: "Deliver custom, localized, and friction-appropriate capture interfaces dynamically." }
    ],
    readyTitle: "Ready to get started?",
    readyDesc: "Get in touch or start exploring the Sandbox environment to test compliance workflows and verifications today.",
    tryItNow: "Try it now"
  },
  es: {
    backToHome: "Volver al inicio",
    badge: "Confianza y seguridad",
    heroTitlePrefix: "Genera confianza en toda tu plataforma con verificación fluida.",
    heroTitleHighlight: "Asegura que los usuarios sean quienes dicen ser",
    heroTitleSuffix: "en cualquier punto del ciclo de vida.",
    heroDesc: "Verifica identidades al instante, reduce cuellos de botella regulatorios y protege el crecimiento de la comunidad sin afectar el onboarding.",
    getDemo: "Solicitar una demo",
    exploreSandboxApi: "Explorar API Sandbox",
    ecosystemTitle: "Ecosistema global de confianza",
    ecosystemDesc: "Cada usuario se cruza con datos biométricos vivos y señales de telecomunicaciones en tiempo real. Ofrece una verificación sin fricción que bloquea bots y da la bienvenida a personas reales.",
    passed: "APROBADO",
    review: "REVISAR",
    linkedInOnboard: "Onboarding LinkedIn",
    biometricsValidated: "Biometría validada",
    neighborHost: "Anfitrión Neighbor",
    mdlCrosscheck: "Cruce mDL",
    coffeeMeetsBagel: "CoffeeMeetsBagel",
    suspiciousIp: "IP sospechosa",
    signalsLive: "SEÑALES: EN VIVO",
    kycEngine: "MOTOR KYC",
    passiveIpCheck: "COMPROBACIÓN PASIVA DE IP",
    verifiedIsp: "Estados Unidos / ISP verificado",
    facialSimilarity: "SIMILITUD FACIAL",
    selfieIdMatch: "99,7% de coincidencia selfie/ID",
    platformAutopilot: "Piloto automático decidió:",
    autoApproved: "AUTOAPROBADO ✓",
    trustedBy: "Confiado por startups y las mayores empresas del mundo",
    section1Label: "1. Personalización de marca",
    section1Title: "Crea flujos de verificación que se sientan nativos en tu plataforma",
    section1Desc: "Personaliza cada parte del flujo, desde UI, fuentes y botones hasta las verificaciones que experimenta cada usuario, sin recursos de ingeniería.",
    themeConfigurator: "Configurador interactivo de tema",
    fontPairing: "Combinación de fuentes",
    fonts: { sans: "Sans", serif: "Serif", mono: "Mono" },
    primaryAccentColor: "Color principal",
    colors: { blue: "Azul", purple: "Púrpura", teal: "Verde", gold: "Dorado" },
    buttonBorderRadius: "Radio del botón",
    buttons: { none: "Recto", lg: "Medio", full: "Píldora" },
    trustPass: "PASE DE CONFIANZA",
    welcomeTitle: "Verificación de identidad requerida",
    welcomeDesc: "Para continuar con seguridad, verifiquemos rápidamente tus credenciales oficiales.",
    beginVerification: "Iniciar verificación",
    selectIdDocument: "Seleccionar documento",
    idDocs: [
      { id: "passport", name: "Pasaporte", desc: "Verificar con pasaporte nacional" },
      { id: "driver_license", name: "Licencia de conducir", desc: "Verificar con tarjeta regional" },
      { id: "national_id", name: "Documento nacional", desc: "Documento estatal seguro" }
    ],
    scanningFront: "Escaneando frente del documento",
    alignFrames: "Alinear dentro del marco",
    analyzingSecurity: "Analizando funciones holográficas de seguridad...",
    doneTitle: "¡Verificación enviada!",
    doneDesc: "Biometría y escaneos de seguridad capturados. Procesando revisión al instante.",
    resetSimulation: "Reiniciar simulación",
    secureSsl: "CIFRADO SSL SEGURO",
    riskEvaluatorTitle: "Evaluador de riesgo multicapa",
    riskEvaluatorDesc: "Canales de detección automatizados en acción",
    legitimateUser: "Usuario legítimo",
    riskyActor: "Actor riesgoso",
    fraudLayers: [
      { label: "Capa 1: análisis pasivo de red", metric: "IP y registros de geocerca" },
      { label: "Capa 2: huella de dispositivo falso", metric: "Firma de hardware" },
      { label: "Capa 3: prevención global de duplicados", metric: "Asociación de cuentas" },
      { label: "Capa 4: verificación biométrica de liveness", metric: "Pulso facial en tiempo real" }
    ],
    clear: "LIMPIO",
    flagged: "MARCADO",
    evaluating: "EVALUANDO...",
    idle: "EN ESPERA",
    telemetryOutput: "// Salida telemétrica en tiempo real",
    fraudLogsLegit: ["Analizando conexión: IP residencial limpia, sin VPN.", "Comprobando dispositivo: moderno, agente estándar.", "Cruzando base de datos: sin cuentas múltiples ni duplicados.", "Biometría: liveness alto (98%), rostro coincide con ID.", "Resultado: autoaprobación recomendada (confianza: 99%)."],
    fraudLogsRisky: ["Analizando conexión: VPN de hosting de alto riesgo detectada.", "Comprobando dispositivo: Android emulado, agente falsificado.", "Cruzando base de datos: ID de dispositivo ligado a otras 4 cuentas.", "Biometría: liveness bajo (35%), foto de una foto.", "Resultado: marcado automáticamente para revisión manual (riesgo: 84)."],
    totalRiskScore: "Puntuación total de riesgo",
    autopilotRecommendation: "Recomendación automática",
    autoApprove: "AUTOAPROBAR ✓",
    queueReview: "ENVIAR A REVISIÓN ⚠",
    section2Label: "2. Defensa contra fraude",
    section2Title: "Detecta actores maliciosos con protección antifraude multicapa",
    section2Desc: "Protege tu ecosistema legítimo con análisis automático de señales y reverificaciones instantáneas. Detén redes de fraude al descubrir dispositivos conectados y patrones de credential stuffing.",
    fraudBenefits: [
      { title: "Sin fricción para usuarios legítimos", desc: "Permite que solicitantes confiables avancen con controles pasivos de geocerca." },
      { title: "Capas de seguridad sólidas", desc: "Activa biometría solo cuando aparecen anomalías." },
      { title: "Métricas avanzadas contra redes", desc: "Identifica redes compartidas y variables de hardware para exponer sindicatos de fraude." }
    ],
    section3Label: "3. Operaciones y escala",
    section3Title: "Escala y simplifica tus operaciones de identidad",
    section3Desc: "Haz revisiones manuales 10 veces más rápido reuniendo señales contextualizadas en una pestaña. Asigna archivos sospechosos, resuelve disputas y dispara alertas automáticamente.",
    simulatorHint: "Interactúa con el simulador de la derecha para aprobar o rechazar credenciales sospechosas.",
    caseActionMsg: "Caso {id} {action} correctamente",
    approved: "APROBADO",
    rejected: "RECHAZADO",
    caseWorkspace: "ESPACIO DE CASOS",
    reviewQueue: "Cola de revisión (pendientes: 2)",
    applicantAlt: "Solicitante",
    contactMethods: "Métodos de contacto",
    verificationFlags: "Alertas de verificación",
    vpnMasking: "VPN activa:",
    emulatorUse: "Uso de emulador:",
    duplicateIds: "ID duplicados:",
    yes: "SÍ",
    no: "NO",
    submittedProof: "Prueba documental enviada",
    govIdAlt: "Escaneo de documento",
    frontScanCompleted: "ESCANEO_FRONTAL_COMPLETO",
    livenessScore: "Puntuación liveness:",
    autoRiskScore: "Índice de riesgo automático:",
    riskSuffix: "RIESGO",
    webhookActions: "Las acciones ejecutarán webhooks de plataforma al instante.",
    rejectProfile: "Rechazar perfil",
    approveRelease: "Aprobar y liberar",
    featureLabel: "Capacidades",
    featureTitle: "Un kit completo de confianza en una sola arquitectura",
    featureDesc: "Escala y coordina métodos de verificación, variables de detección automática e investigaciones manuales con un ecosistema modular.",
    exploreIntegration: "EXPLORAR INTEGRACIÓN",
    features: {},
    helpLabel: "Estamos para ayudarte",
    contactTitle: "Contáctanos para encontrar una solución juntos",
    contactDesc: "¿Necesitas reglas personalizadas o SLA empresariales? Nuestro equipo de soluciones diseñará la arquitectura ideal.",
    contactUs: "Contáctanos",
    exploreCapabilities: "Explorar capacidades de confianza",
    coreTags: ["Garantía de edad", "Perfiles verificados", "Detección de cuentas compartidas", "Protección contra toma de cuenta", "Abuso de promociones"],
    moreTags: ["Detección de ID sintética", "Remediación KYC", "Métrica de confianza", "Cruce de sanciones", "Verificación de geocerca"],
    showLess: "Mostrar menos",
    more: "+ Más",
    exploreMoreTitle: "Explora más de la plataforma de identidad de Identra",
    exploreCards: [
      { title: "Detecta y disuade fraude a medida que evoluciona.", desc: "Implementa motores de umbral de riesgo y bloquea patrones fraudulentos automáticamente." },
      { title: "Crea mejores flujos de identidad.", desc: "Entrega interfaces personalizadas, localizadas y con la fricción adecuada dinámicamente." }
    ],
    readyTitle: "¿Listo para empezar?",
    readyDesc: "Ponte en contacto o explora el Sandbox para probar workflows de cumplimiento y verificación hoy.",
    tryItNow: "Probar ahora"
  },
  ja: {},
  de: {},
  vi: {}
};

TRUST_AND_SAFETY_TRANSLATIONS.ja = {
  linkedInOnboard: "LinkedIn Onboard",
  biometricsValidated: "Biometrics validated",
  neighborHost: "Neighbor Host",
  mdlCrosscheck: "mDL crosscheck",
  coffeeMeetsBagel: "CoffeeMeetsBagel",
  suspiciousIp: "Suspicious IP",
  signalsLive: "SIGNALS: LIVE",
  kycEngine: "KYC ENGINE",
  passiveIpCheck: "PASSIVE IP CHECK",
  verifiedIsp: "United States / Verified ISP",
  facialSimilarity: "FACIAL SIMILARITY",
  selfieIdMatch: "99.7% Matching Selfie/ID",
  platformAutopilot: "Platform Autopilot Decided:",
  autoApproved: "AUTO-APPROVED ✓",
  trustedLogoLinkedInMark: "in",
  trustedLogoLinkedIn: "LinkedIn",
  trustedLogoCoffee: "CoffeeMeetsBagel",
  trustedLogoNeighborMark: "N",
  trustedLogoNeighbor: "Neighbor",
  fonts: {
      "sans": "Sans",
      "serif": "Serif",
      "mono": "Mono"
    },
  colors: {
      "blue": "Blue",
      "purple": "Purple",
      "teal": "Teal",
      "gold": "Gold"
    },
  buttons: {
      "none": "Sharp",
      "lg": "Medium",
      "full": "Pill"
    },
  fraudLayers: [
      {
        "label": "Layer 1: Passive Network Screening",
        "metric": "IP & Geofence Logs"
      },
      {
        "label": "Layer 2: Device Spoof Fingerprinting",
        "metric": "Hardware Signature"
      },
      {
        "label": "Layer 3: Global Duplicate Prevention",
        "metric": "Accounts Association"
      },
      {
        "label": "Layer 4: Biometric Liveness Verification",
        "metric": "Real-time Facial Pulse"
      }
    ],
  fraudLogsLegit: [
      "Analyzing network connection: clean residential IP, no VPN detected.",
      "Checking device identifiers: modern device, standard user agent.",
      "Cross-referencing database: no multiple accounts or duplicates.",
      "Biometrics matching: high liveness score (98%), face matches ID.",
      "Result: recommended auto-approve (confidence: 99%)."
    ],
  fraudLogsRisky: [
      "Analyzing network connection: high-risk hosting VPN detected.",
      "Checking device identifiers: emulated Android device, spoofed agent.",
      "Cross-referencing database: device ID linked to 4 other accounts.",
      "Biometrics matching: low liveness score (35%), photo of photo.",
      "Result: automatically flagged for manual review (risk score: 84)."
    ],
  fraudBenefits: [
      {
        "title": "Frictionless for legit users",
        "desc": "Allow trusted applicants to sail through using passive geofence checks."
      },
      {
        "title": "Ironclad security layers",
        "desc": "Deploy biometric verification checks only when anomalies occur."
      },
      {
        "title": "Advanced ring-busting metrics",
        "desc": "Identify shared networks and hardware variables to expose fraud syndicates."
      }
    ],
  caseActionMsg: "Case {id} successfully {action}",
  approved: "APPROVED",
  rejected: "REJECTED",
  applicantAlt: "Applicant",
  vpnMasking: "VPN Masking:",
  emulatorUse: "Emulator Use:",
  duplicateIds: "Duplicate IDs:",
  submittedProof: "Submitted Document Proof",
  govIdAlt: "Gov ID proof scan",
  frontScanCompleted: "FRONT_SCAN_COMPLETED",
  livenessScore: "Liveness Score:",
  autoRiskScore: "Auto-Risk Score Index:",
  riskSuffix: "RISK",
  webhookActions: "Actions will execute instant platform webhook triggers.",
  rejectProfile: "Reject Profile",
  approveRelease: "Approve & Release",
  features: {
      "gov-id": {
        "title": "Government ID verification",
        "description": "Collect and verify your choice of government-issued IDs to identify users across 200+ countries and territories."
      },
      "mdl": {
        "title": "Mobile driver's license (mDL) verification",
        "description": "Verify mobile driver's licenses with a low-friction, high-assurance verification method."
      },
      "flow-editor": {
        "title": "Flow Editor",
        "description": "Build branded user flows to collect customer information, no code needed."
      },
      "passive": {
        "title": "Passive signals",
        "description": "Silently assess risk with device fingerprints and other behavioral signals."
      },
      "age-assure": {
        "title": "Age assurance",
        "description": "Comply with online safety regulations requiring age assurance, privacy, and consent."
      },
      "selfie-live": {
        "title": "Selfie liveness verification",
        "description": "Detect similar backgrounds in submitted selfies and compare against other signals with a selfie similarity check."
      },
      "graph": {
        "title": "Graph",
        "description": "Uncover and block fraud rings or risky accounts that are connected."
      },
      "cases": {
        "title": "Cases",
        "description": "Conduct investigations and maximize team productivity with a configurable case management hub."
      },
      "workflows": {
        "title": "Workflows",
        "description": "Automate decisions and follow-ups throughout the user life cycle."
      }
    },
  exploreCards: [
      {
        "title": "Detect and deter fraud as it evolves.",
        "desc": "Deploy risk threshold engines and block fraudulent patterns across multiple sessions automatically."
      },
      {
        "title": "Build better identity flows.",
        "desc": "Deliver custom, localized, and friction-appropriate capture interfaces dynamically."
      }
    ],
  backToHome: "ホームに戻る",
  badge: "信頼と安全性",
  heroTitlePrefix: "シームレスな認証でプラットフォーム全体の信頼を構築。",
  heroTitleHighlight: "ユーザーが本人であることを確認",
  heroTitleSuffix: "ユーザーライフサイクルのあらゆる時点で実行できます。",
  heroDesc: "本人確認を即時に行い、規制上の負荷を減らし、オンボーディング体験を損なわずにコミュニティ成長を守ります。",
  getDemo: "デモを依頼",
  exploreSandboxApi: "Sandbox APIを見る",
  ecosystemTitle: "グローバル信頼エコシステム",
  ecosystemDesc: "各ユーザーをライブ生体データと通信シグナルにリアルタイムで照合します。人には摩擦の少ない体験を提供し、ボットを遮断します。",
  passed: "合格",
  review: "レビュー",
  trustedBy: "スタートアップから世界最大級の企業までが信頼",
  section1Label: "1. ブランド最適化",
  section1Title: "自社サービスに自然になじむ認証フローを構築",
  section1Desc: "UI、フォント、ボタン、ユーザーごとの認証内容まで、エンジニアリングなしで調整できます。",
  themeConfigurator: "インタラクティブテーマ設定",
  fontPairing: "フォント組み合わせ",
  primaryAccentColor: "メインカラー",
  buttonBorderRadius: "ボタン角丸",
  trustPass: "TRUST PASS",
  welcomeTitle: "本人確認が必要です",
  welcomeDesc: "安全に進むため、公的身分証明情報をすばやく確認します。",
  beginVerification: "確認を開始",
  selectIdDocument: "ID書類を選択",
  idDocs: [
    { id: "passport", name: "パスポート確認", desc: "国のパスポートで確認" },
    { id: "driver_license", name: "運転免許証", desc: "地域の免許証で確認" },
    { id: "national_id", name: "国民IDカード", desc: "政府発行カードで確認" }
  ],
  scanningFront: "カード表面をスキャン中",
  alignFrames: "枠内に合わせてください",
  analyzingSecurity: "ホログラム安全機能を解析中...",
  doneTitle: "確認を送信しました",
  doneDesc: "生体情報とセキュリティスキャンを取得しました。即時に処理します。",
  resetSimulation: "シミュレーションをリセット",
  secureSsl: "安全なSSL暗号化",
  riskEvaluatorTitle: "多層リスク評価",
  riskEvaluatorDesc: "自動検出パイプラインの動作",
  legitimateUser: "正当なユーザー",
  riskyActor: "高リスク行為者",
  clear: "クリア",
  flagged: "検出",
  evaluating: "評価中...",
  idle: "待機",
  telemetryOutput: "// リアルタイム telemetry 出力",
  totalRiskScore: "総アカウントリスクスコア",
  autopilotRecommendation: "自動推奨",
  autoApprove: "自動承認 ✓",
  queueReview: "レビュー待ち ⚠",
  section2Label: "2. 不正防御",
  section2Title: "多層不正対策で悪質ユーザーを検出",
  section2Desc: "自動バックグラウンド信号分析と即時再確認で正当なユーザー環境を守ります。接続デバイスやcredential stuffingの兆候を早期に検出します。",
  section3Label: "3. 運用と拡張",
  section3Title: "本人確認運用を拡張し効率化",
  section3Desc: "必要な信号を1つの画面に文脈付きでまとめ、手動レビューを高速化します。",
  simulatorHint: "右のシミュレーターで疑わしい申請を承認または拒否できます。",
  caseWorkspace: "ケースワークスペース",
  reviewQueue: "レビューキュー（保留: 2）",
  contactMethods: "連絡方法",
  verificationFlags: "確認フラグ",
  yes: "はい",
  no: "いいえ",
  featureLabel: "機能",
  featureTitle: "単一アーキテクチャの完全な信頼ツールキット",
  featureDesc: "認証、スクリーニング、手動調査をモジュール式エコシステムで調整します。",
  exploreIntegration: "連携を見る",
  helpLabel: "サポートします",
  contactTitle: "一緒に最適な解決策を見つけましょう",
  contactDesc: "カスタムルールや企業向けSLAが必要ですか。ソリューションチームが最適な構成を設計します。",
  contactUs: "お問い合わせ",
  exploreCapabilities: "信頼機能を見る",
  coreTags: ["年齢保証", "確認済みプロフィール", "アカウント共有検出", "アカウント乗っ取り保護", "プロモーション不正"],
  moreTags: ["合成ID検出", "KYC修復", "信頼指標", "制裁照合", "ジオフェンス確認"],
  showLess: "少なく表示",
  more: "+ もっと見る",
  exploreMoreTitle: "Identraの本人確認プラットフォームをさらに見る",
  readyTitle: "始める準備はできましたか？",
  readyDesc: "Sandboxでコンプライアンスworkflowと認証を今すぐ試せます。",
  tryItNow: "今すぐ試す"
};

TRUST_AND_SAFETY_TRANSLATIONS.de = {
  linkedInOnboard: "LinkedIn Onboard",
  biometricsValidated: "Biometrics validated",
  neighborHost: "Neighbor Host",
  mdlCrosscheck: "mDL crosscheck",
  coffeeMeetsBagel: "CoffeeMeetsBagel",
  suspiciousIp: "Suspicious IP",
  signalsLive: "SIGNALS: LIVE",
  kycEngine: "KYC ENGINE",
  passiveIpCheck: "PASSIVE IP CHECK",
  verifiedIsp: "United States / Verified ISP",
  facialSimilarity: "FACIAL SIMILARITY",
  selfieIdMatch: "99.7% Matching Selfie/ID",
  platformAutopilot: "Platform Autopilot Decided:",
  autoApproved: "AUTO-APPROVED ✓",
  trustedLogoLinkedInMark: "in",
  trustedLogoLinkedIn: "LinkedIn",
  trustedLogoCoffee: "CoffeeMeetsBagel",
  trustedLogoNeighborMark: "N",
  trustedLogoNeighbor: "Neighbor",
  fonts: {
      "sans": "Sans",
      "serif": "Serif",
      "mono": "Mono"
    },
  colors: {
      "blue": "Blue",
      "purple": "Purple",
      "teal": "Teal",
      "gold": "Gold"
    },
  buttons: {
      "none": "Sharp",
      "lg": "Medium",
      "full": "Pill"
    },
  trustPass: "TRUST PASS",
  secureSsl: "SECURE SSL ENCRYPTION",
  fraudLayers: [
      {
        "label": "Layer 1: Passive Network Screening",
        "metric": "IP & Geofence Logs"
      },
      {
        "label": "Layer 2: Device Spoof Fingerprinting",
        "metric": "Hardware Signature"
      },
      {
        "label": "Layer 3: Global Duplicate Prevention",
        "metric": "Accounts Association"
      },
      {
        "label": "Layer 4: Biometric Liveness Verification",
        "metric": "Real-time Facial Pulse"
      }
    ],
  telemetryOutput: "// Real-time system telemetry output",
  fraudLogsLegit: [
      "Analyzing network connection: clean residential IP, no VPN detected.",
      "Checking device identifiers: modern device, standard user agent.",
      "Cross-referencing database: no multiple accounts or duplicates.",
      "Biometrics matching: high liveness score (98%), face matches ID.",
      "Result: recommended auto-approve (confidence: 99%)."
    ],
  fraudLogsRisky: [
      "Analyzing network connection: high-risk hosting VPN detected.",
      "Checking device identifiers: emulated Android device, spoofed agent.",
      "Cross-referencing database: device ID linked to 4 other accounts.",
      "Biometrics matching: low liveness score (35%), photo of photo.",
      "Result: automatically flagged for manual review (risk score: 84)."
    ],
  fraudBenefits: [
      {
        "title": "Frictionless for legit users",
        "desc": "Allow trusted applicants to sail through using passive geofence checks."
      },
      {
        "title": "Ironclad security layers",
        "desc": "Deploy biometric verification checks only when anomalies occur."
      },
      {
        "title": "Advanced ring-busting metrics",
        "desc": "Identify shared networks and hardware variables to expose fraud syndicates."
      }
    ],
  caseActionMsg: "Case {id} successfully {action}",
  approved: "APPROVED",
  rejected: "REJECTED",
  caseWorkspace: "CASE WORKSPACE",
  reviewQueue: "Review Queue (Pending: 2)",
  applicantAlt: "Applicant",
  contactMethods: "Contact Methods",
  verificationFlags: "Verification Flags",
  vpnMasking: "VPN Masking:",
  emulatorUse: "Emulator Use:",
  duplicateIds: "Duplicate IDs:",
  submittedProof: "Submitted Document Proof",
  govIdAlt: "Gov ID proof scan",
  frontScanCompleted: "FRONT_SCAN_COMPLETED",
  livenessScore: "Liveness Score:",
  autoRiskScore: "Auto-Risk Score Index:",
  riskSuffix: "RISK",
  webhookActions: "Actions will execute instant platform webhook triggers.",
  rejectProfile: "Reject Profile",
  approveRelease: "Approve & Release",
  features: {
      "gov-id": {
        "title": "Government ID verification",
        "description": "Collect and verify your choice of government-issued IDs to identify users across 200+ countries and territories."
      },
      "mdl": {
        "title": "Mobile driver's license (mDL) verification",
        "description": "Verify mobile driver's licenses with a low-friction, high-assurance verification method."
      },
      "flow-editor": {
        "title": "Flow Editor",
        "description": "Build branded user flows to collect customer information, no code needed."
      },
      "passive": {
        "title": "Passive signals",
        "description": "Silently assess risk with device fingerprints and other behavioral signals."
      },
      "age-assure": {
        "title": "Age assurance",
        "description": "Comply with online safety regulations requiring age assurance, privacy, and consent."
      },
      "selfie-live": {
        "title": "Selfie liveness verification",
        "description": "Detect similar backgrounds in submitted selfies and compare against other signals with a selfie similarity check."
      },
      "graph": {
        "title": "Graph",
        "description": "Uncover and block fraud rings or risky accounts that are connected."
      },
      "cases": {
        "title": "Cases",
        "description": "Conduct investigations and maximize team productivity with a configurable case management hub."
      },
      "workflows": {
        "title": "Workflows",
        "description": "Automate decisions and follow-ups throughout the user life cycle."
      }
    },
  coreTags: [
      "Age assurance",
      "Verified profiles",
      "Account sharing detection",
      "Account takeover protection",
      "Promotion abuse"
    ],
  moreTags: [
      "Synthetic ID detection",
      "KYC remediation",
      "Platform trust metric",
      "Sanctions crossmatch",
      "Geofence verification"
    ],
  exploreMoreTitle: "Explore more of Identra's identity platform",
  exploreCards: [
      {
        "title": "Detect and deter fraud as it evolves.",
        "desc": "Deploy risk threshold engines and block fraudulent patterns across multiple sessions automatically."
      },
      {
        "title": "Build better identity flows.",
        "desc": "Deliver custom, localized, and friction-appropriate capture interfaces dynamically."
      }
    ],
  backToHome: "Zur Startseite",
  badge: "Vertrauen & Sicherheit",
  heroTitlePrefix: "Bauen Sie Vertrauen auf Ihrer Plattform mit nahtloser Verifizierung auf.",
  heroTitleHighlight: "Stellen Sie sicher, dass Nutzer wirklich die angegebenen Personen sind",
  heroTitleSuffix: "an jedem Punkt des Nutzerlebenszyklus.",
  heroDesc: "Verifizieren Sie Identitäten sofort, reduzieren Sie regulatorische Engpässe und schützen Sie Community-Wachstum ohne Einbußen beim Onboarding.",
  getDemo: "Demo anfragen",
  exploreSandboxApi: "Sandbox API entdecken",
  ecosystemTitle: "Globales Vertrauensökosystem",
  ecosystemDesc: "Jeder Nutzer wird in Echtzeit mit Live-Biometrie und Telekommunikationssignalen abgeglichen. Reibungsarme Verifizierung blockiert Bots und begrüßt echte Menschen.",
  passed: "BESTANDEN",
  review: "PRÜFEN",
  trustedBy: "Vertraut von Startups und den größten Unternehmen der Welt",
  section1Label: "1. Markenpersonalisierung",
  section1Title: "Erstellen Sie Verifizierungsflows, die sich nativ anfühlen",
  section1Desc: "Passen Sie UI, Schriften, Buttons und nutzerspezifische Prüfungen ohne Engineering-Aufwand an.",
  themeConfigurator: "Interaktiver Theme-Konfigurator",
  fontPairing: "Schriftkombination",
  primaryAccentColor: "Primäre Akzentfarbe",
  buttonBorderRadius: "Button-Radius",
  welcomeTitle: "Identitätsprüfung erforderlich",
  welcomeDesc: "Um sicher fortzufahren, prüfen wir kurz Ihre amtlichen Ausweisdaten.",
  beginVerification: "Verifizierung starten",
  selectIdDocument: "ID-Dokument auswählen",
  idDocs: [
    { id: "passport", name: "Reisepassprüfung", desc: "Mit nationalem Reisepass prüfen" },
    { id: "driver_license", name: "Führerschein", desc: "Mit regionalem Führerschein prüfen" },
    { id: "national_id", name: "Personalausweis", desc: "Sichere staatliche Karte" }
  ],
  scanningFront: "Vorderseite wird gescannt",
  alignFrames: "Im Rahmen ausrichten",
  analyzingSecurity: "Holografische Sicherheitsmerkmale werden analysiert...",
  doneTitle: "Verifizierung übermittelt",
  doneDesc: "Biometrie und Sicherheitsscans erfasst. Prüfung wird sofort verarbeitet.",
  resetSimulation: "Simulation zurücksetzen",
  riskEvaluatorTitle: "Mehrschichtiger Risikobewerter",
  riskEvaluatorDesc: "Automatisierte Erkennungspipelines in Aktion",
  legitimateUser: "Legitimer Nutzer",
  riskyActor: "Riskanter Akteur",
  clear: "UNAUFFÄLLIG",
  flagged: "MARKIERT",
  evaluating: "BEWERTUNG...",
  idle: "BEREIT",
  totalRiskScore: "Gesamtrisiko des Kontos",
  autopilotRecommendation: "Autopilot-Empfehlung",
  autoApprove: "AUTO-FREIGABE ✓",
  queueReview: "ZUR PRÜFUNG ⚠",
  section2Label: "2. Betrugsabwehr",
  section2Title: "Erkennen Sie Angreifer mit mehrschichtigem Betrugsschutz",
  section2Desc: "Schützen Sie legitime Nutzer mit automatisierter Signalanalyse und sofortiger Reverifizierung. Erkennen Sie Geräte-Netzwerke und Credential-Stuffing-Muster frühzeitig.",
  section3Label: "3. Betrieb & Skalierung",
  section3Title: "Skalieren und optimieren Sie Ihre Identitätsprozesse",
  section3Desc: "Beschleunigen Sie manuelle Prüfungen, indem alle Signale kontextualisiert in einer Ansicht erscheinen.",
  simulatorHint: "Nutzen Sie rechts den Simulator, um verdächtige Bewerberdaten freizugeben oder abzulehnen.",
  yes: "JA",
  no: "NEIN",
  featureLabel: "Funktionen",
  featureTitle: "Ein vollständiges Trust-Toolkit auf einer Architektur",
  featureDesc: "Koordinieren Sie Verifizierung, automatische Prüfung und manuelle Untersuchungen in einem modularen Ökosystem.",
  exploreIntegration: "INTEGRATION ENTDECKEN",
  helpLabel: "Wir helfen gern",
  contactTitle: "Kontaktieren Sie uns, um gemeinsam eine Lösung zu finden",
  contactDesc: "Benötigen Sie eigene Routing-Regeln oder Enterprise-SLAs? Unser Solutions-Team entwirft die passende Architektur.",
  contactUs: "Kontakt",
  exploreCapabilities: "Trust-Funktionen entdecken",
  showLess: "Weniger anzeigen",
  more: "+ Mehr",
  readyTitle: "Bereit loszulegen?",
  readyDesc: "Kontaktieren Sie uns oder testen Sie Compliance-Workflows und Verifizierungen noch heute im Sandbox-Umfeld.",
  tryItNow: "Jetzt testen"
};

TRUST_AND_SAFETY_TRANSLATIONS.vi = {
  coffeeMeetsBagel: "CoffeeMeetsBagel",
  trustedLogoLinkedInMark: "in",
  trustedLogoLinkedIn: "LinkedIn",
  trustedLogoCoffee: "CoffeeMeetsBagel",
  trustedLogoNeighborMark: "N",
  trustedLogoNeighbor: "Neighbor",
  fonts: {
      "sans": "Sans",
      "serif": "Serif",
      "mono": "Mono"
    },
  colors: {
      "blue": "Blue",
      "purple": "Purple",
      "teal": "Teal",
      "gold": "Gold"
    },
  buttons: {
      "none": "Sharp",
      "lg": "Medium",
      "full": "Pill"
    },
  trustPass: "TRUST PASS",
  fraudLayers: [
      {
        "label": "Layer 1: Passive Network Screening",
        "metric": "IP & Geofence Logs"
      },
      {
        "label": "Layer 2: Device Spoof Fingerprinting",
        "metric": "Hardware Signature"
      },
      {
        "label": "Layer 3: Global Duplicate Prevention",
        "metric": "Accounts Association"
      },
      {
        "label": "Layer 4: Biometric Liveness Verification",
        "metric": "Real-time Facial Pulse"
      }
    ],
  fraudLogsLegit: [
      "Analyzing network connection: clean residential IP, no VPN detected.",
      "Checking device identifiers: modern device, standard user agent.",
      "Cross-referencing database: no multiple accounts or duplicates.",
      "Biometrics matching: high liveness score (98%), face matches ID.",
      "Result: recommended auto-approve (confidence: 99%)."
    ],
  fraudLogsRisky: [
      "Analyzing network connection: high-risk hosting VPN detected.",
      "Checking device identifiers: emulated Android device, spoofed agent.",
      "Cross-referencing database: device ID linked to 4 other accounts.",
      "Biometrics matching: low liveness score (35%), photo of photo.",
      "Result: automatically flagged for manual review (risk score: 84)."
    ],
  fraudBenefits: [
      {
        "title": "Frictionless for legit users",
        "desc": "Allow trusted applicants to sail through using passive geofence checks."
      },
      {
        "title": "Ironclad security layers",
        "desc": "Deploy biometric verification checks only when anomalies occur."
      },
      {
        "title": "Advanced ring-busting metrics",
        "desc": "Identify shared networks and hardware variables to expose fraud syndicates."
      }
    ],
  features: {
      "gov-id": {
        "title": "Government ID verification",
        "description": "Collect and verify your choice of government-issued IDs to identify users across 200+ countries and territories."
      },
      "mdl": {
        "title": "Mobile driver's license (mDL) verification",
        "description": "Verify mobile driver's licenses with a low-friction, high-assurance verification method."
      },
      "flow-editor": {
        "title": "Flow Editor",
        "description": "Build branded user flows to collect customer information, no code needed."
      },
      "passive": {
        "title": "Passive signals",
        "description": "Silently assess risk with device fingerprints and other behavioral signals."
      },
      "age-assure": {
        "title": "Age assurance",
        "description": "Comply with online safety regulations requiring age assurance, privacy, and consent."
      },
      "selfie-live": {
        "title": "Selfie liveness verification",
        "description": "Detect similar backgrounds in submitted selfies and compare against other signals with a selfie similarity check."
      },
      "graph": {
        "title": "Graph",
        "description": "Uncover and block fraud rings or risky accounts that are connected."
      },
      "cases": {
        "title": "Cases",
        "description": "Conduct investigations and maximize team productivity with a configurable case management hub."
      },
      "workflows": {
        "title": "Workflows",
        "description": "Automate decisions and follow-ups throughout the user life cycle."
      }
    },
  backToHome: "Quay lại trang chủ",
  badge: "Tin cậy & an toàn",
  heroTitlePrefix: "Xây dựng niềm tin trên toàn nền tảng với xác minh liền mạch.",
  heroTitleHighlight: "Bảo đảm người dùng đúng là người họ khai báo",
  heroTitleSuffix: "ở bất kỳ điểm nào trong vòng đời người dùng.",
  heroDesc: "Xác minh danh tính tức thì, giảm điểm nghẽn tuân thủ và bảo vệ tăng trưởng cộng đồng mà không ảnh hưởng trải nghiệm onboarding.",
  getDemo: "Nhận bản demo",
  exploreSandboxApi: "Khám phá Sandbox API",
  ecosystemTitle: "Hệ sinh thái tin cậy toàn cầu",
  ecosystemDesc: "Mỗi người dùng được đối chiếu với dữ liệu sinh trắc học trực tiếp và tín hiệu viễn thông theo thời gian thực. Quy trình ít ma sát giúp chặn bot và chào đón người thật.",
  passed: "ĐẠT",
  review: "XEM XÉT",
  linkedInOnboard: "Onboard LinkedIn",
  biometricsValidated: "Sinh trắc học đã xác thực",
  neighborHost: "Chủ nhà Neighbor",
  mdlCrosscheck: "Đối chiếu mDL",
  suspiciousIp: "IP đáng ngờ",
  signalsLive: "TÍN HIỆU: TRỰC TIẾP",
  kycEngine: "CÔNG CỤ KYC",
  passiveIpCheck: "KIỂM TRA IP THỤ ĐỘNG",
  verifiedIsp: "Hoa Kỳ / ISP đã xác minh",
  facialSimilarity: "TƯƠNG ĐỒNG KHUÔN MẶT",
  selfieIdMatch: "99,7% khớp selfie/ID",
  platformAutopilot: "Tự động nền tảng quyết định:",
  autoApproved: "TỰ ĐỘNG DUYỆT ✓",
  trustedBy: "Được các startup và doanh nghiệp lớn nhất thế giới tin dùng",
  section1Label: "1. Cá nhân hóa thương hiệu",
  section1Title: "Xây dựng luồng xác minh có cảm giác tự nhiên trong nền tảng của bạn",
  section1Desc: "Tùy chỉnh mọi phần của luồng, từ giao diện, phông chữ, kiểu nút đến các bước xác minh cho từng nhóm người dùng mà không cần nguồn lực kỹ thuật.",
  themeConfigurator: "Bộ cấu hình giao diện tương tác",
  fontPairing: "Cặp phông chữ",
  primaryAccentColor: "Màu nhấn chính",
  buttonBorderRadius: "Bo góc nút",
  welcomeTitle: "Cần xác minh danh tính",
  welcomeDesc: "Để tiếp tục an toàn, hãy nhanh chóng xác minh giấy tờ định danh chính phủ của bạn.",
  beginVerification: "Bắt đầu xác minh",
  selectIdDocument: "Chọn giấy tờ định danh",
  idDocs: [
    { id: "passport", name: "Kiểm tra hộ chiếu", desc: "Xác minh bằng hộ chiếu quốc gia" },
    { id: "driver_license", name: "Bằng lái xe", desc: "Xác minh bằng thẻ lái xe khu vực" },
    { id: "national_id", name: "Căn cước công dân", desc: "Thẻ do nhà nước cấp" }
  ],
  scanningFront: "Đang quét mặt trước thẻ",
  alignFrames: "Căn bên trong khung",
  analyzingSecurity: "Đang phân tích đặc điểm bảo mật hologram...",
  doneTitle: "Đã gửi xác minh!",
  doneDesc: "Đã thu sinh trắc học và quét bảo mật. Đang xử lý tức thì.",
  resetSimulation: "Đặt lại mô phỏng",
  secureSsl: "MÃ HÓA SSL AN TOÀN",
  riskEvaluatorTitle: "Bộ đánh giá rủi ro nhiều lớp",
  riskEvaluatorDesc: "Các pipeline phát hiện tự động đang hoạt động",
  legitimateUser: "Người dùng hợp lệ",
  riskyActor: "Đối tượng rủi ro",
  clear: "SẠCH",
  flagged: "BỊ GẮN CỜ",
  evaluating: "ĐANG ĐÁNH GIÁ...",
  idle: "CHỜ",
  telemetryOutput: "// Đầu ra telemetry thời gian thực",
  totalRiskScore: "Điểm rủi ro tài khoản tổng",
  autopilotRecommendation: "Khuyến nghị tự động",
  autoApprove: "TỰ ĐỘNG DUYỆT ✓",
  queueReview: "ĐƯA VÀO HÀNG ĐỢI XEM XÉT ⚠",
  section2Label: "2. Phòng vệ gian lận",
  section2Title: "Phát hiện đối tượng xấu bằng bảo vệ gian lận nhiều lớp",
  section2Desc: "Bảo vệ hệ sinh thái người dùng hợp lệ bằng phân tích tín hiệu nền tự động và tái xác minh tức thì. Ngăn chặn các đường dây gian lận bằng cách phát hiện mạng thiết bị liên kết và mẫu credential stuffing.",
  section3Label: "3. Vận hành & mở rộng",
  section3Title: "Mở rộng và tinh gọn vận hành định danh",
  section3Desc: "Tăng tốc xem xét thủ công bằng cách cung cấp mọi tín hiệu cần thiết trong một tab có ngữ cảnh.",
  simulatorHint: "Tương tác với trình mô phỏng bên phải để duyệt hoặc từ chối thông tin ứng viên đáng ngờ.",
  caseActionMsg: "Hồ sơ {id} đã được {action}",
  approved: "DUYỆT",
  rejected: "TỪ CHỐI",
  caseWorkspace: "KHÔNG GIAN HỒ SƠ",
  reviewQueue: "Hàng đợi xem xét (chờ: 2)",
  applicantAlt: "Ứng viên",
  contactMethods: "Phương thức liên hệ",
  verificationFlags: "Cờ xác minh",
  vpnMasking: "Ẩn VPN:",
  emulatorUse: "Dùng trình giả lập:",
  duplicateIds: "ID trùng lặp:",
  yes: "CÓ",
  no: "KHÔNG",
  submittedProof: "Bằng chứng giấy tờ đã gửi",
  govIdAlt: "Ảnh quét giấy tờ",
  frontScanCompleted: "ĐÃ_QUÉT_MẶT_TRƯỚC",
  livenessScore: "Điểm liveness:",
  autoRiskScore: "Chỉ số rủi ro tự động:",
  riskSuffix: "RỦI RO",
  webhookActions: "Hành động sẽ kích hoạt webhook nền tảng tức thì.",
  rejectProfile: "Từ chối hồ sơ",
  approveRelease: "Duyệt & phát hành",
  featureLabel: "Năng lực tính năng",
  featureTitle: "Bộ công cụ tin cậy hoàn chỉnh trên một kiến trúc",
  featureDesc: "Mở rộng và phối hợp mọi phương thức xác minh, biến sàng lọc tự động và pipeline điều tra thủ công bằng hệ sinh thái mô-đun.",
  exploreIntegration: "KHÁM PHÁ TÍCH HỢP",
  helpLabel: "Chúng tôi sẵn sàng hỗ trợ",
  contactTitle: "Liên hệ để cùng tìm giải pháp",
  contactDesc: "Cần quy tắc định tuyến tùy chỉnh hoặc SLA tuân thủ doanh nghiệp? Đội ngũ giải pháp sẽ giúp thiết kế kiến trúc phù hợp.",
  contactUs: "Liên hệ",
  exploreCapabilities: "Khám phá năng lực tin cậy",
  coreTags: ["Bảo đảm độ tuổi", "Hồ sơ đã xác minh", "Phát hiện chia sẻ tài khoản", "Bảo vệ chống chiếm đoạt tài khoản", "Lạm dụng khuyến mãi"],
  moreTags: ["Phát hiện ID tổng hợp", "Khắc phục KYC", "Chỉ số tin cậy nền tảng", "Đối chiếu cấm vận", "Xác minh geofence"],
  showLess: "Thu gọn",
  more: "+ Thêm",
  exploreMoreTitle: "Khám phá thêm nền tảng định danh của Identra",
  exploreCards: [
    { title: "Phát hiện và ngăn chặn gian lận khi nó biến đổi.", desc: "Triển khai công cụ ngưỡng rủi ro và tự động chặn mẫu gian lận trên nhiều phiên." },
    { title: "Xây dựng luồng định danh tốt hơn.", desc: "Cung cấp giao diện thu thập tùy chỉnh, bản địa hóa và phù hợp mức ma sát một cách linh hoạt." }
  ],
  readyTitle: "Sẵn sàng bắt đầu?",
  readyDesc: "Liên hệ hoặc bắt đầu khám phá môi trường Sandbox để thử workflow tuân thủ và xác minh ngay hôm nay.",
  tryItNow: "Thử ngay"
};

TRUST_AND_SAFETY_TRANSLATIONS.es.features = {
  "gov-id": { title: "Verificación de documento oficial", description: "Recopila y verifica documentos oficiales para identificar usuarios en más de 200 países y territorios." },
  mdl: { title: "Verificación de licencia móvil (mDL)", description: "Verifica licencias de conducir móviles con un método de baja fricción y alta garantía." },
  "flow-editor": { title: "Editor de flujos", description: "Crea flujos de usuario con tu marca para recopilar información sin escribir código." },
  passive: { title: "Señales pasivas", description: "Evalúa riesgo de forma silenciosa con huellas de dispositivo y otras señales de comportamiento." },
  "age-assure": { title: "Garantía de edad", description: "Cumple normas de seguridad en línea que exigen verificación de edad, privacidad y consentimiento." },
  "selfie-live": { title: "Prueba de vida por selfie", description: "Detecta fondos similares en selfies enviados y compara la imagen con otras señales." },
  graph: { title: "Grafo", description: "Descubre y bloquea redes de fraude o cuentas riesgosas conectadas entre sí." },
  cases: { title: "Casos", description: "Realiza investigaciones y mejora la productividad con un centro configurable de gestión de casos." },
  workflows: { title: "Flujos de trabajo", description: "Automatiza decisiones y seguimientos durante todo el ciclo de vida del usuario." }
};

Object.assign(TRUST_AND_SAFETY_TRANSLATIONS.ja, {
  linkedInOnboard: "LinkedIn登録",
  biometricsValidated: "生体認証を確認済み",
  neighborHost: "Neighborホスト",
  mdlCrosscheck: "mDL照合",
  suspiciousIp: "不審なIP",
  signalsLive: "シグナル: ライブ",
  kycEngine: "KYCエンジン",
  passiveIpCheck: "受動的IP確認",
  verifiedIsp: "米国 / 確認済みISP",
  facialSimilarity: "顔類似度",
  selfieIdMatch: "セルフィーとIDが99.7%一致",
  platformAutopilot: "プラットフォームの自動判定:",
  autoApproved: "自動承認 ✓",
  colors: { blue: "青", purple: "紫", teal: "青緑", gold: "金" },
  buttons: { none: "角型", lg: "中程度", full: "丸型" },
  fraudLayers: [
    { label: "レイヤー1: 受動的ネットワーク審査", metric: "IPとジオフェンスログ" },
    { label: "レイヤー2: デバイス偽装の指紋判定", metric: "ハードウェア署名" },
    { label: "レイヤー3: グローバル重複防止", metric: "アカウント関連性" },
    { label: "レイヤー4: 生体ライブネス確認", metric: "リアルタイム顔パルス" }
  ],
  fraudLogsLegit: [
    "ネットワーク接続を解析: 住宅用IPはクリーン、VPNは未検出。",
    "デバイス識別子を確認: 新しい端末、標準ユーザーエージェント。",
    "データベース照合: 複数アカウントや重複なし。",
    "生体照合: livenessスコア高 (98%)、顔がIDと一致。",
    "結果: 自動承認を推奨 (信頼度: 99%)。"
  ],
  fraudLogsRisky: [
    "ネットワーク接続を解析: 高リスクのホスティングVPNを検出。",
    "デバイス識別子を確認: エミュレートされたAndroid端末、偽装エージェント。",
    "データベース照合: デバイスIDが他の4アカウントに関連。",
    "生体照合: livenessスコア低 (35%)、写真の再撮影を検出。",
    "結果: 手動レビューへ自動フラグ付け (リスクスコア: 84)。"
  ],
  fraudBenefits: [
    { title: "正当なユーザーには摩擦を少なく", desc: "信頼できる申請者は受動的なジオフェンス確認でスムーズに通過できます。" },
    { title: "堅牢なセキュリティ層", desc: "異常が発生した場合だけ生体認証チェックを適用します。" },
    { title: "高度な不正ネットワーク検出", desc: "共有ネットワークとハードウェア変数を特定し、不正グループを可視化します。" }
  ],
  caseActionMsg: "ケース{id}を{action}しました",
  approved: "承認",
  rejected: "拒否",
  applicantAlt: "申請者",
  vpnMasking: "VPNマスキング:",
  emulatorUse: "エミュレーター使用:",
  duplicateIds: "重複ID:",
  submittedProof: "提出された書類証明",
  govIdAlt: "公的ID書類スキャン",
  frontScanCompleted: "表面スキャン完了",
  livenessScore: "livenessスコア:",
  autoRiskScore: "自動リスク指標:",
  riskSuffix: "リスク",
  webhookActions: "操作はプラットフォームwebhookを即時に実行します。",
  rejectProfile: "プロフィールを拒否",
  approveRelease: "承認して解除",
  features: {
    "gov-id": { title: "公的ID確認", description: "200以上の国と地域で、公的身分証を収集してユーザーを確認します。" },
    mdl: { title: "モバイル運転免許証 (mDL) 確認", description: "低摩擦で高保証の方法により、モバイル運転免許証を確認します。" },
    "flow-editor": { title: "フローエディター", description: "コードなしで、ブランドに合うユーザーフローを構築して顧客情報を収集します。" },
    passive: { title: "受動的シグナル", description: "デバイス指紋や行動シグナルを使い、ユーザーに負担をかけずリスクを評価します。" },
    "age-assure": { title: "年齢保証", description: "年齢確認、プライバシー、同意を求めるオンライン安全規制に対応します。" },
    "selfie-live": { title: "セルフィーライブネス確認", description: "提出セルフィーの背景類似性を検出し、他のシグナルと照合します。" },
    graph: { title: "グラフ", description: "つながりのある不正ネットワークや高リスクアカウントを発見してブロックします。" },
    cases: { title: "ケース", description: "設定可能なケース管理ハブで調査を進め、チームの生産性を高めます。" },
    workflows: { title: "ワークフロー", description: "ユーザーライフサイクル全体で判断とフォローアップを自動化します。" }
  },
  exploreCards: [
    { title: "進化する不正を検出し抑止します。", desc: "リスクしきい値エンジンを展開し、複数セッションにまたがる不正パターンを自動でブロックします。" },
    { title: "より良い本人確認フローを構築します。", desc: "カスタム、ローカライズ済み、適切な摩擦度の取得画面を動的に提供します。" }
  ]
});

Object.assign(TRUST_AND_SAFETY_TRANSLATIONS.de, {
  linkedInOnboard: "LinkedIn-Onboarding",
  biometricsValidated: "Biometrie bestätigt",
  neighborHost: "Neighbor-Gastgeber",
  mdlCrosscheck: "mDL-Abgleich",
  suspiciousIp: "Verdächtige IP",
  signalsLive: "SIGNALE: LIVE",
  kycEngine: "KYC-ENGINE",
  passiveIpCheck: "PASSIVE IP-PRÜFUNG",
  verifiedIsp: "USA / verifizierter ISP",
  facialSimilarity: "GESICHTSÄHNLICHKEIT",
  selfieIdMatch: "99,7% Übereinstimmung Selfie/ID",
  platformAutopilot: "Plattform-Autopilot entschied:",
  autoApproved: "AUTOMATISCH FREIGEGEBEN ✓",
  colors: { blue: "Blau", purple: "Violett", teal: "Türkis", gold: "Gold" },
  buttons: { none: "Eckig", lg: "Mittel", full: "Pille" },
  secureSsl: "SICHERE SSL-VERSCHLÜSSELUNG",
  fraudLayers: [
    { label: "Ebene 1: Passive Netzwerkprüfung", metric: "IP- und Geofence-Logs" },
    { label: "Ebene 2: Geräte-Spoofing-Fingerabdruck", metric: "Hardware-Signatur" },
    { label: "Ebene 3: Globale Dublettenvermeidung", metric: "Kontoverknüpfungen" },
    { label: "Ebene 4: Biometrische Liveness-Prüfung", metric: "Gesichtspuls in Echtzeit" }
  ],
  telemetryOutput: "// Telemetrieausgabe in Echtzeit",
  fraudLogsLegit: [
    "Netzwerkverbindung wird analysiert: saubere private IP, kein VPN erkannt.",
    "Gerätekennungen werden geprüft: modernes Gerät, Standard-User-Agent.",
    "Datenbankabgleich: keine Mehrfachkonten oder Dubletten.",
    "Biometrieabgleich: hoher liveness-Wert (98%), Gesicht passt zum ID-Dokument.",
    "Ergebnis: automatische Freigabe empfohlen (Konfidenz: 99%)."
  ],
  fraudLogsRisky: [
    "Netzwerkverbindung wird analysiert: riskantes Hosting-VPN erkannt.",
    "Gerätekennungen werden geprüft: emuliertes Android-Gerät, gefälschter Agent.",
    "Datenbankabgleich: Geräte-ID mit 4 weiteren Konten verknüpft.",
    "Biometrieabgleich: niedriger liveness-Wert (35%), Foto eines Fotos.",
    "Ergebnis: automatisch zur manuellen Prüfung markiert (Risiko: 84)."
  ],
  fraudBenefits: [
    { title: "Reibungslos für legitime Nutzer", desc: "Vertrauenswürdige Antragsteller kommen mit passiven Geofence-Prüfungen schnell weiter." },
    { title: "Starke Sicherheitsebenen", desc: "Biometrische Prüfungen werden nur bei Auffälligkeiten ausgelöst." },
    { title: "Erweiterte Kennzahlen gegen Betrugsringe", desc: "Gemeinsame Netzwerke und Hardwarevariablen legen Betrugsgruppen offen." }
  ],
  caseActionMsg: "Fall {id} erfolgreich {action}",
  approved: "FREIGEGEBEN",
  rejected: "ABGELEHNT",
  caseWorkspace: "FALLARBEITSBEREICH",
  reviewQueue: "Prüfwarteschlange (offen: 2)",
  applicantAlt: "Antragsteller",
  contactMethods: "Kontaktmethoden",
  verificationFlags: "Verifizierungsflags",
  vpnMasking: "VPN-Maskierung:",
  emulatorUse: "Emulatornutzung:",
  duplicateIds: "Doppelte IDs:",
  submittedProof: "Eingereichter Dokumentnachweis",
  govIdAlt: "Scan des Ausweisdokuments",
  frontScanCompleted: "VORDERSEITE_GESCANNT",
  livenessScore: "liveness-Wert:",
  autoRiskScore: "Automatischer Risikoindex:",
  riskSuffix: "RISIKO",
  webhookActions: "Aktionen lösen sofort Plattform-webhooks aus.",
  rejectProfile: "Profil ablehnen",
  approveRelease: "Freigeben",
  features: {
    "gov-id": { title: "Prüfung amtlicher Ausweise", description: "Erfassen und prüfen Sie amtliche Ausweise zur Identifizierung von Nutzern in über 200 Ländern und Regionen." },
    mdl: { title: "Prüfung mobiler Führerscheine (mDL)", description: "Prüfen Sie mobile Führerscheine mit geringer Reibung und hoher Sicherheit." },
    "flow-editor": { title: "Flow-Editor", description: "Erstellen Sie markenkonforme Nutzerflows zur Datenerfassung ohne Code." },
    passive: { title: "Passive Signale", description: "Bewerten Sie Risiken unauffällig mit Geräte-Fingerprints und weiteren Verhaltenssignalen." },
    "age-assure": { title: "Altersabsicherung", description: "Erfüllen Sie Online-Sicherheitsvorgaben zu Altersprüfung, Datenschutz und Einwilligung." },
    "selfie-live": { title: "Selfie-liveness-Prüfung", description: "Erkennen Sie ähnliche Hintergründe in Selfies und vergleichen Sie diese mit weiteren Signalen." },
    graph: { title: "Graph", description: "Decken Sie verbundene Betrugsringe oder riskante Konten auf und blockieren Sie sie." },
    cases: { title: "Fälle", description: "Führen Sie Untersuchungen mit einem konfigurierbaren Fallmanagement-Hub produktiver durch." },
    workflows: { title: "Workflows", description: "Automatisieren Sie Entscheidungen und Nachverfolgung im gesamten Nutzerlebenszyklus." }
  },
  coreTags: ["Altersabsicherung", "Verifizierte Profile", "Erkennung von Kontoteilung", "Schutz vor Kontoübernahme", "Missbrauch von Aktionen"],
  moreTags: ["Erkennung synthetischer IDs", "KYC-Nachbearbeitung", "Plattform-Vertrauenskennzahl", "Sanktionsabgleich", "Geofence-Prüfung"],
  exploreMoreTitle: "Entdecken Sie mehr von Identras Identitätsplattform",
  exploreCards: [
    { title: "Betrug erkennen und abschrecken, während er sich verändert.", desc: "Setzen Sie Risikoschwellen ein und blockieren Sie betrügerische Muster über mehrere Sitzungen automatisch." },
    { title: "Bessere Identitätsflows erstellen.", desc: "Liefern Sie angepasste, lokalisierte und passend reibungsarme Erfassungsoberflächen dynamisch aus." }
  ]
});

Object.assign(TRUST_AND_SAFETY_TRANSLATIONS.vi, {
  colors: { blue: "Xanh dương", purple: "Tím", teal: "Xanh ngọc", gold: "Vàng" },
  buttons: { none: "Vuông", lg: "Vừa", full: "Bo tròn" },
  fraudLayers: [
    { label: "Lớp 1: Sàng lọc mạng thụ động", metric: "IP và nhật ký geofence" },
    { label: "Lớp 2: Dấu vân tay thiết bị giả mạo", metric: "Chữ ký phần cứng" },
    { label: "Lớp 3: Ngăn trùng lặp toàn cầu", metric: "Liên kết tài khoản" },
    { label: "Lớp 4: Xác minh liveness sinh trắc học", metric: "Xung khuôn mặt thời gian thực" }
  ],
  fraudLogsLegit: [
    "Đang phân tích kết nối mạng: IP dân cư sạch, không phát hiện VPN.",
    "Đang kiểm tra định danh thiết bị: thiết bị hiện đại, user agent tiêu chuẩn.",
    "Đang đối chiếu cơ sở dữ liệu: không có nhiều tài khoản hoặc bản trùng.",
    "Đối chiếu sinh trắc học: điểm liveness cao (98%), khuôn mặt khớp ID.",
    "Kết quả: khuyến nghị tự động duyệt (độ tin cậy: 99%)."
  ],
  fraudLogsRisky: [
    "Đang phân tích kết nối mạng: phát hiện VPN hosting rủi ro cao.",
    "Đang kiểm tra định danh thiết bị: thiết bị Android giả lập, agent bị giả mạo.",
    "Đang đối chiếu cơ sở dữ liệu: ID thiết bị liên kết với 4 tài khoản khác.",
    "Đối chiếu sinh trắc học: điểm liveness thấp (35%), ảnh chụp lại từ ảnh.",
    "Kết quả: tự động gắn cờ để xem xét thủ công (điểm rủi ro: 84)."
  ],
  fraudBenefits: [
    { title: "Ít ma sát cho người dùng hợp lệ", desc: "Cho phép ứng viên đáng tin cậy đi qua nhanh bằng kiểm tra geofence thụ động." },
    { title: "Các lớp bảo mật vững chắc", desc: "Chỉ kích hoạt kiểm tra sinh trắc học khi xuất hiện bất thường." },
    { title: "Chỉ số nâng cao để phá đường dây gian lận", desc: "Xác định mạng dùng chung và biến phần cứng để bóc tách nhóm gian lận." }
  ],
  features: {
    "gov-id": { title: "Xác minh giấy tờ chính phủ", description: "Thu thập và xác minh giấy tờ do chính phủ cấp để định danh người dùng tại hơn 200 quốc gia và vùng lãnh thổ." },
    mdl: { title: "Xác minh bằng lái xe di động (mDL)", description: "Xác minh bằng lái xe di động bằng phương thức ít ma sát và có độ bảo đảm cao." },
    "flow-editor": { title: "Trình chỉnh sửa luồng", description: "Xây dựng luồng người dùng mang nhận diện thương hiệu để thu thập thông tin khách hàng mà không cần viết mã." },
    passive: { title: "Tín hiệu thụ động", description: "Đánh giá rủi ro âm thầm bằng dấu vân tay thiết bị và các tín hiệu hành vi khác." },
    "age-assure": { title: "Bảo đảm độ tuổi", description: "Đáp ứng quy định an toàn trực tuyến yêu cầu bảo đảm độ tuổi, quyền riêng tư và đồng ý." },
    "selfie-live": { title: "Xác minh liveness bằng selfie", description: "Phát hiện nền ảnh giống nhau trong selfie đã gửi và so sánh với các tín hiệu khác." },
    graph: { title: "Đồ thị", description: "Phát hiện và chặn các đường dây gian lận hoặc tài khoản rủi ro có liên kết với nhau." },
    cases: { title: "Hồ sơ", description: "Điều tra hiệu quả hơn với trung tâm quản lý hồ sơ có thể cấu hình." },
    workflows: { title: "Luồng công việc", description: "Tự động hóa quyết định và bước theo dõi trong toàn bộ vòng đời người dùng." }
  }
});
