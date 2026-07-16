/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const KYC_AML_PAGE_TRANSLATIONS = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'AML/KYC COMPLIANCE',
    heroTitle: 'AML/KYC compliance customized to your business needs.',
    heroDesc: 'Tailor Know Your Customer (KYC) and Anti-Money Laundering (AML) processes to meet global regulations your way - both now and in the future.',
    getDemo: 'Get a demo',
    trySandbox: 'Try sandbox',
    heroMockup: {
      engine: 'AML_ENGINE_V3 // ACTIVE',
      autopilot: 'AUTO-PILOT',
      subjectLabel: 'INQUIRY SUBJECT',
      subjectName: 'Alexander Vance',
      subjectId: 'ID: inq_v4983x_compliance',
      riskLabel: 'RISK LEVEL',
      riskValue: 'HIGH RISK MATCH',
      logsLabel: 'VERIFICATION LOGS',
      checks: [
        { label: 'Government ID Authenticity', status: 'PASSED' },
        { label: 'Facial Selfie Liveness Check', status: 'PASSED' },
        { label: 'Sanctions / Watchlist Screen', status: '1 MATCH FOUND' }
      ],
      decisionTitle: 'Active Watchlist Match Decision',
      matchAccuracy: 'Match Accuracy: 97.4%',
      decisionDesc: 'Subject matches name "Alex Vance" on OFAC Sanctions List (SDN). Auto-route to priority compliance review queue.',
      fileSar: 'File SAR/STR Draft',
      overrideApprove: 'Override / Approve',
      actionQueued: 'SAR/STR draft queued'
    },
    pillars: [
      {
        label: '01 // REGULATORY COMPLIANCE',
        title: "Meet today & tomorrow's needs",
        desc: "Automate your AML/KYC processes and quickly adapt to the latest global regulations - all on Identra's agile, no-code platform."
      },
      {
        label: '02 // DYNAMIC USER RISK',
        title: 'Tailored risk-based approach',
        desc: 'Use a highly configurable platform to implement and optimize onboarding and screening workflows around your exact risk parameters.'
      },
      {
        label: '03 // REDUCED OVERHEAD',
        title: 'Consolidated audit system',
        desc: 'Streamline manual reviews, audit trails, and SAR/STR filings by centralizing identity records and compliance logs in one platform.'
      }
    ],
    trustedBy: 'Trusted by fast-growing startups & international enterprises',
    brands: ['BRANCH', 'Z.RO', '6LOCK', 'SQUARE'],
    processTitle: 'Build AML/KYC compliance processes that are delightful to your team, users, and auditors',
    processDesc: 'Maintain compliance without friction. Deliver a fast, modular user experience while ensuring strict risk controls and explainable automated decisions.',
    features: [
      {
        badge: 'Flexible Customization',
        title: 'Granular and transparent compliance controls',
        desc: 'Customize AML/KYC processes with comprehensive controls over required documents, match severity, and audit-ready risk profiles without ongoing engineering resources.',
        bullets: ['Custom match thresholds for sanctions', 'No-code UI for adjusting rule sets', 'Verifiable logs for audit validation']
      },
      {
        badge: 'Dynamic Routing',
        title: 'Seamless end-user experience with dynamic risk routing',
        desc: "Convert trustworthy users instantly, block fraudsters, and satisfy global regulators with verification flows that adjust by location, risk score, and transaction amount.",
        bullets: ['Localized language and country configurations', 'Conditional step progression (step up/down)', 'Responsive interfaces for mobile and web']
      },
      {
        badge: 'Single Source of Truth',
        title: 'Orchestrate your AML/KYC from a single system of record',
        desc: 'Centralize cross-border identity profiles, coordinate investigations holistically, and move from manual audits to automated decisioning and compliant e-filing.',
        approve: 'Approve User',
        decline: 'Decline User',
        reset: 'Reset Status'
      }
    ],
    controlsMockup: {
      livePreview: 'Live Preview',
      title: 'Risk Heuristic Builder',
      strictness: '1. OFAC Sanctions Strictness',
      exact: 'Exact Match (100% Fuzzy)',
      high: 'High Confidence (>85% Fuzzy)',
      standard: 'Standard Search (>75% Fuzzy)',
      selfie: '2. Require Selfie Liveness',
      expired: '3. Reject Expired Documents',
      saved: 'Saved',
      savedDesc: 'Heuristics updated in real time. No engineering deployment or code changes required.'
    },
    routingMockup: {
      title: 'Dynamic User Verification Path',
      active: 'Active Engine',
      rows: [
        { code: 'US', title: 'User Location: California, US', subtitle: 'Low-risk deposit limit', path: 'Path: Instant IDV' },
        { code: 'DE', title: 'User Location: Germany', subtitle: 'Cross-border wiring threshold', path: 'Path: NFC Check + Selfie' },
        { code: '!', title: 'Anomalous IP/Device Flag', subtitle: 'Fuzzy OFAC screening match', path: 'Path: Multi-Doc + Manual review' }
      ]
    },
    caseMockup: {
      label: 'Inquiry Case File',
      name: 'Elena Rostova',
      statuses: { review: 'Needs Review', approved: 'Approved', declined: 'Declined' },
      jurisdiction: 'Jurisdiction',
      jurisdictionValue: 'EU - Estonia',
      databaseMatch: 'Database Match',
      databaseValue: '100% Correct Address',
      verificationCheck: 'Verification Check',
      matchStatus: 'Match Status',
      checks: [
        { label: 'EU National Passport ID', status: 'VERIFIED' },
        { label: 'Selfie Portrait Liveness', status: '3D OK' },
        { label: 'PEP / Sanctions Screening', status: 'LIST HIT (EU WATCH)' }
      ],
      auditTitle: 'Audit logs:',
      logs: ['14:22:10 GMT - Screening triggered', '14:22:11 GMT - Match flag raised on sanctions list'],
      approvedLog: '14:23:05 GMT - Override authorized by Compliance Officer',
      declinedLog: '14:23:05 GMT - Account blocked and auto-SAR prepared'
    },
    lifeCycle: {
      title: 'Efficiently manage and reduce risk across the customer life cycle',
      desc: "Compliance isn't a one-time onboarding check. Identra continuously validates users and entities from birth to ongoing activities.",
      tabs: { onboarding: '1. Onboarding Compliance', lifecycle: '2. Life Cycle Management & Monitoring' },
      onboardingCards: [
        {
          title: 'Individual Onboarding',
          subtitle: 'Customer KYC Checklists',
          items: [
            { title: 'Documentary Verification', desc: 'Extract, verify, and match government-issued documents and data fields with local database checks instantly.' },
            { title: 'Non-Documentary Verification', desc: 'Verify users without passports or licenses by validating SSN, mobile carrier files, and credit bureaus.' },
            { title: 'Identity & Device Binding', desc: 'Assess mobile device fingerprints, browser spoofing indicators, and secure 2FA biometric parameters.' }
          ]
        },
        {
          title: 'Business & Entity Onboarding',
          subtitle: 'Corporate KYB & UBO Checklists',
          items: [
            { title: 'Business Registry Validation', desc: 'Automatically check corporate registration filings and verify business Tax IDs or EINs in global registries.' },
            { title: 'Ultimate Beneficial Owner (UBO)', desc: 'Unwrap complex ownership layers and run KYC screen checks on decision-makers and high-equity stakeholders.' },
            { title: 'Business Document Audit', desc: 'Submit and automatically inspect incorporation articles, trust filings, and partnership certificates.' }
          ]
        }
      ],
      lifecycleCards: [
        {
          title: 'Continuous Monitoring & Screening',
          subtitle: 'Anti-Money Laundering Safeguards',
          items: [
            { title: 'Watchlists & Global Sanctions', desc: 'Run always-on screening against OFAC, UK HMT, EU consolidations, and international watchlist databases.' },
            { title: 'Politically Exposed Persons (PEPs)', desc: 'Detect when active customers acquire high-level political roles or display elevated regulatory exposure.' },
            { title: 'Adverse Media & News Alerts', desc: 'Stay notified if a verified person or business becomes associated with financial crime alerts.' }
          ]
        },
        {
          title: 'High-Risk Reverification',
          subtitle: 'Event-driven security triggers',
          items: [
            { title: 'Large Withdrawal Triggers', desc: 'Request active user face biometrics before releasing funds above predefined compliance ceilings.' },
            { title: 'Account & Device Recovery', desc: 'Mitigate credential stuffing and SIM-swap takeovers with immediate multi-factor ID confirmation.' },
            { title: 'Suspicious Activity Reporting (SAR)', desc: 'Generate file-ready e-form drafts for transaction patterns flagged as anomalous.' }
          ]
        }
      ],
      platformCards: [
        { label: 'Platform automation', title: 'Account Mapping', desc: 'Orchestrate identity systems of record via account mapping in Identra.' },
        { label: 'Compliance E-File', title: 'Auto-Draft SARs', desc: 'Automatically fill out and e-file regulatory SARs and STRs directly.' },
        { label: 'Review Optimization', title: 'Automated Queues', desc: 'Streamline manual review queues with rule-based automated decisioning.' },
        { label: 'Risk Management', title: 'Link Analysis', desc: 'Identify suspicious network patterns with customizable case links.' }
      ]
    },
    accordionIntro: {
      title: 'Everything you need to build your ideal AML/KYC process',
      desc: 'Inspect comprehensive toolsets inside Identra that help compliance managers tailor verification step by step.'
    },
    accordions: [
      {
        id: 'kyc-kyb',
        title: 'Know Your Customers / Know Your Business',
        cards: [
          { title: 'Individual & Business Entity Verification', desc: 'Verify individuals and corporate entities, including complex Ultimate Beneficial Owners (UBOs) and stakeholders, inside a single automated workflow.' },
          { title: 'Documentary Verification', desc: "Inspect and authenticate driver's licenses, national ID cards, and passports from over 200 countries and territories with OCR." },
          { title: 'Seamless Verification Flow', desc: "Design KYC and KYB verification interfaces customized to match your company's visual identity, improving conversion and trust." },
          { title: 'Non-Documentary Verification', desc: 'Check names, addresses, SSNs, and details against issuer databases, credit records, and business registrar files.' }
        ]
      },
      {
        id: 'monitoring',
        title: 'Continuous Screening and Monitoring',
        cards: [
          { title: 'Global Sanction Lists', desc: 'Run checks across active watchlist databases globally, including OFAC, HM Treasury, and EU targets, with fuzzy-match thresholds.' },
          { title: 'Dynamic Re-Screening Cron', desc: 'Enable automatic daily re-screening for active verified customers to capture watchlist changes instantly.' }
        ]
      },
      {
        id: 'due-diligence',
        title: 'Due Diligence Automation',
        cards: [
          { title: 'Advanced AML Workflow Triggers', desc: 'Trigger due diligence questionnaires, address proof, or tax filings for users with elevated risk tags.' },
          { title: 'Automated Audit-Trail Logs', desc: 'Every automated logic trigger, analyst input, and verification outcome is logged for compliance reporting.' }
        ]
      }
    ],
    industriesIntro: {
      badge: 'Global Verticals',
      title: 'Industries served',
      desc: 'Identra provides compliance orchestration infrastructure across diverse international financial sectors. Select an industry to see how compliance shifts.',
      benchmark: 'Sector Benchmark Performance'
    },
    industries: [
      { id: 'banking', title: 'Digital banking', desc: 'Verify customers in seconds while meeting stringent global banking regulations and FinCEN standards.', stat: '99.2% onboarding success rate' },
      { id: 'institutions', title: 'Financial institutions', desc: 'Centralize multi-jurisdiction compliance across branches, entities, and asset management systems.', stat: '-40% decrease in manual review overhead' },
      { id: 'crypto', title: 'Cryptocurrency', desc: 'Prevent financial crime, meet Travel Rule regulations, and continuously screen wallets on global exchanges.', stat: 'Real-time blockchain risk mapping' },
      { id: 'payments', title: 'Online payments and wallets', desc: 'Mitigate fraud, automate chargeback checks, and perform continuous AML screening for payment gateways and wallets.', stat: '<300ms verification response time' },
      { id: 'movement', title: 'Money movement', desc: 'Confirm identities and watchlists for peer-to-peer transfers, cross-border remittances, and disbursements.', stat: 'Zero false positives on sanctions checks' },
      { id: 'lending', title: 'Lending and BNPL', desc: 'Verify credit eligibility, run database checks, and ensure compliance before instant consumer or business loans.', stat: '98% automated decisioning accuracy' }
    ],
    testimonial: {
      quote: '[Identra] saves us a lot of time and is a much more seamless process for users compared to the old system.',
      author: 'Doug Verduzco',
      role: 'Digital transformation officer, Regional Bank',
      badge: 'CASE STUDY SUMMARY',
      title: 'Regional bank met critical AML and KYC compliance while embarking on a digital-first future with Identra',
      desc: 'By replacing legacy identity vendors with Identra, the bank reduced verification delays from 48 hours to less than 12 seconds while maintaining auditable federal compliance.',
      cta: 'Read full case study'
    },
    resourcesIntro: {
      badge: 'Resource Library',
      title: 'Keep learning',
      cta: 'See all ebooks & reports'
    },
    resources: [
      { meta: 'Video - 56 min', title: 'Unlocking global growth: Ensuring compliance and trust across international markets', desc: 'Learn from compliance professionals as they share blueprints on expansion, regulatory nuance, and fraud prevention.', cta: 'Watch video' },
      { meta: 'Guide - 25 min', title: "The identity professional's guide to getting and staying compliant with regulations", desc: 'A comprehensive regulatory playbook mapping AML requirements, KYC verifications, KYB beneficial owner lookups, and SAR timelines.', cta: 'Read playbook' },
      { meta: 'Blog - 7 min', title: 'Automated KYC verification: a guide for compliance managers and executives', desc: 'See how automated decisioning works in identity verification to improve precision and reduce manual review queues.', cta: 'Read blog post' }
    ],
    exploreTitle: "Explore more of Identra's identity platform",
    exploreCards: [
      { label: 'PRODUCT VIEW', title: 'Verify government IDs globally.', desc: 'Deploy secure documentary verification for 200+ countries with advanced facial biometrics.', cta: 'Explore Government ID' },
      { label: 'REPORTING VIEW', title: 'Screen against global sanctions and PEP lists.', desc: 'Execute watchlist matches, politically exposed persons (PEPs) checks, and adverse news alerts instantly.', cta: 'Explore Watchlist Reports' }
    ],
    cta: {
      title: 'Ready to get started?',
      desc: "Discover how Identra's customizable AML/KYC orchestration platform keeps your business compliant, secure, and growing.",
      primary: 'Get a demo',
      secondary: 'Try it now'
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'CUMPLIMIENTO AML/KYC',
    heroTitle: 'Cumplimiento AML/KYC adaptado a las necesidades de tu negocio.',
    heroDesc: 'Adapta los procesos Know Your Customer (KYC) y Anti-Money Laundering (AML) a las regulaciones globales a tu manera, ahora y en el futuro.',
    getDemo: 'Solicitar demo',
    trySandbox: 'Probar sandbox',
    heroMockup: {
      engine: 'AML_ENGINE_V3 // ACTIVO',
      autopilot: 'PILOTO AUTOMÁTICO',
      subjectLabel: 'IDENTRA ANALIZADA',
      subjectName: 'Alexander Vance',
      subjectId: 'ID: inq_v4983x_compliance',
      riskLabel: 'NIVEL DE RIESGO',
      riskValue: 'COINCIDENCIA DE ALTO RIESGO',
      logsLabel: 'REGISTROS DE VERIFICACIÓN',
      checks: [
        { label: 'Autenticidad del documento oficial', status: 'APROBADO' },
        { label: 'Prueba de vida con selfie facial', status: 'APROBADO' },
        { label: 'Revisión de sanciones / listas de vigilancia', status: '1 COINCIDENCIA' }
      ],
      decisionTitle: 'Decisión activa sobre coincidencia en lista',
      matchAccuracy: 'Precisión de coincidencia: 97,4%',
      decisionDesc: 'La identra coincide con el nombre "Alex Vance" en la lista de sanciones OFAC (SDN). Enrutamiento automático a revisión prioritaria de cumplimiento.',
      fileSar: 'Preparar borrador SAR/STR',
      overrideApprove: 'Anular / Aprobar',
      actionQueued: 'Borrador SAR/STR en cola'
    },
    pillars: [
      { label: '01 // CUMPLIMIENTO REGULATORIO', title: 'Cubre las necesidades de hoy y mañana', desc: 'Automatiza tus procesos AML/KYC y adáptate rápido a las regulaciones globales en la plataforma ágil y sin código de Identra.' },
      { label: '02 // RIESGO DINÁMICO DEL USUARIO', title: 'Enfoque basado en riesgo a tu medida', desc: 'Usa una plataforma altamente configurable para optimizar onboarding y monitoreo según tus parámetros exactos de riesgo.' },
      { label: '03 // MENOS CARGA OPERATIVA', title: 'Sistema de auditoría consolidado', desc: 'Simplifica revisiones manuales, auditorías y reportes SAR/STR centralizando identidad y registros de cumplimiento.' }
    ],
    trustedBy: 'Con la confianza de startups de rápido crecimiento y empresas internacionales',
    brands: ['BRANCH', 'Z.RO', '6LOCK', 'SQUARE'],
    processTitle: 'Crea procesos AML/KYC agradables para tu equipo, usuarios y auditores',
    processDesc: 'Mantén el cumplimiento sin fricción. Ofrece una experiencia rápida y modular con controles de riesgo estrictos y decisiones automatizadas explicables.',
    features: [
      { badge: 'Personalización flexible', title: 'Controles de cumplimiento granulares y transparentes', desc: 'Configura documentos requeridos, severidad de coincidencias y perfiles de riesgo auditables sin depender constantemente de ingeniería.', bullets: ['Umbrales personalizados para sanciones', 'Interfaz sin código para ajustar reglas', 'Registros verificables para auditoría'] },
      { badge: 'Enrutamiento dinámico', title: 'Experiencia fluida con rutas de riesgo dinámicas', desc: 'Convierte usuarios confiables al instante, bloquea fraude y cumple regulaciones con flujos que se ajustan por ubicación, riesgo y monto.', bullets: ['Configuración por idioma y país', 'Progresión condicional de pasos', 'Interfaces responsivas para móvil y web'] },
      { badge: 'Fuente única de verdad', title: 'Orquesta AML/KYC desde un sistema de registro único', desc: 'Centraliza perfiles transfronterizos, coordina investigaciones y pasa de auditorías manuales a decisiones automatizadas y e-filing.', approve: 'Aprobar usuario', decline: 'Rechazar usuario', reset: 'Restablecer estado' }
    ],
    controlsMockup: { livePreview: 'Vista en vivo', title: 'Constructor de heurísticas de riesgo', strictness: '1. Rigurosidad de sanciones OFAC', exact: 'Coincidencia exacta (100% fuzzy)', high: 'Alta confianza (>85% fuzzy)', standard: 'Búsqueda estándar (>75% fuzzy)', selfie: '2. Requerir prueba de vida con selfie', expired: '3. Rechazar documentos vencidos', saved: 'Guardado', savedDesc: 'Heurísticas actualizadas en tiempo real. Sin despliegues ni cambios de código.' },
    routingMockup: {
      title: 'Ruta dinámica de verificación',
      active: 'Motor activo',
      rows: [
        { code: 'US', title: 'Ubicación del usuario: California, EE. UU.', subtitle: 'Límite de depósito de bajo riesgo', path: 'Ruta: IDV instantáneo' },
        { code: 'DE', title: 'Ubicación del usuario: Alemania', subtitle: 'Umbral para transferencia transfronteriza', path: 'Ruta: NFC + selfie' },
        { code: '!', title: 'Alerta de IP/dispositivo anómalo', subtitle: 'Coincidencia fuzzy en OFAC', path: 'Ruta: varios documentos + revisión manual' }
      ]
    },
    caseMockup: {
      label: 'Expediente de investigación',
      name: 'Elena Rostova',
      statuses: { review: 'Requiere revisión', approved: 'Aprobado', declined: 'Rechazado' },
      jurisdiction: 'Jurisdicción',
      jurisdictionValue: 'UE - Estonia',
      databaseMatch: 'Coincidencia de base de datos',
      databaseValue: 'Dirección correcta al 100%',
      verificationCheck: 'Verificación',
      matchStatus: 'Estado',
      checks: [
        { label: 'Pasaporte nacional de la UE', status: 'VERIFICADO' },
        { label: 'Prueba de vida con retrato selfie', status: '3D OK' },
        { label: 'Revisión PEP / sanciones', status: 'ALERTA EN LISTA UE' }
      ],
      auditTitle: 'Registros de auditoría:',
      logs: ['14:22:10 GMT - Revisión iniciada', '14:22:11 GMT - Alerta levantada en lista de sanciones'],
      approvedLog: '14:23:05 GMT - Anulación autorizada por oficial de cumplimiento',
      declinedLog: '14:23:05 GMT - Cuenta bloqueada y auto-SAR preparado'
    },
    lifeCycle: {
      title: 'Gestiona y reduce el riesgo durante todo el ciclo de vida del cliente',
      desc: 'El cumplimiento no es solo una revisión de onboarding. Identra valida usuarios y entidades de forma continua desde el alta hasta la actividad diaria.',
      tabs: { onboarding: '1. Cumplimiento en onboarding', lifecycle: '2. Gestión y monitoreo del ciclo de vida' },
      onboardingCards: [
        { title: 'Onboarding individual', subtitle: 'Listas de verificación KYC', items: [{ title: 'Verificación documental', desc: 'Extrae, verifica y compara documentos oficiales y campos de datos con bases locales al instante.' }, { title: 'Verificación no documental', desc: 'Verifica usuarios sin pasaporte o licencia validando SSN, operadores móviles y burós de crédito.' }, { title: 'Vinculación de identidad y dispositivo', desc: 'Evalúa huellas de dispositivos, señales de suplantación del navegador y parámetros biométricos 2FA.' }] },
        { title: 'Onboarding de empresas y entidades', subtitle: 'Listas KYB y UBO', items: [{ title: 'Validación de registro empresarial', desc: 'Revisa registros corporativos y valida Tax IDs o EIN en registros globales.' }, { title: 'Beneficiario final (UBO)', desc: 'Descompone estructuras de propiedad complejas y ejecuta revisiones KYC sobre responsables y accionistas relevantes.' }, { title: 'Auditoría documental empresarial', desc: 'Envía e inspecciona actas de constitución, fideicomisos y certificados de sociedad.' }] }
      ],
      lifecycleCards: [
        { title: 'Monitoreo y revisión continua', subtitle: 'Salvaguardas AML', items: [{ title: 'Listas de vigilancia y sanciones globales', desc: 'Revisión permanente contra OFAC, UK HMT, consolidaciones de la UE y bases internacionales.' }, { title: 'Identras políticamente expuestas (PEP)', desc: 'Detecta si clientes activos asumen cargos políticos de alto nivel o elevan su exposición regulatoria.' }, { title: 'Alertas de noticias y medios adversos', desc: 'Recibe avisos si una identra o empresa verificada se asocia con alertas de delito financiero.' }] },
        { title: 'Reverificación de alto riesgo', subtitle: 'Disparadores de seguridad por evento', items: [{ title: 'Disparadores por retiros grandes', desc: 'Solicita biometría facial antes de liberar fondos por encima de límites de cumplimiento.' }, { title: 'Recuperación de cuenta y dispositivo', desc: 'Reduce ataques de credenciales y SIM-swap con confirmación multifactor de identidad.' }, { title: 'Reporte de actividad sospechosa (SAR)', desc: 'Genera borradores de formularios listos para presentar ante patrones transaccionales anómalos.' }] }
      ],
      platformCards: [
        { label: 'Automatización de plataforma', title: 'Mapeo de cuentas', desc: 'Orquesta sistemas de identidad mediante account mapping en Identra.' },
        { label: 'Archivo electrónico', title: 'Borradores SAR automáticos', desc: 'Completa y presenta SAR y STR regulatorios directamente.' },
        { label: 'Optimización de revisión', title: 'Colas automatizadas', desc: 'Simplifica colas de revisión manual con decisiones basadas en reglas.' },
        { label: 'Gestión de riesgo', title: 'Análisis de vínculos', desc: 'Identifica patrones de red sospechosos con enlaces de caso configurables.' }
      ]
    },
    accordionIntro: { title: 'Todo lo necesario para crear tu proceso AML/KYC ideal', desc: 'Explora herramientas de Identra que ayudan a responsables de cumplimiento a ajustar cada paso de verificación.' },
    accordions: [
      { id: 'kyc-kyb', title: 'Know Your Customers / Know Your Business', cards: [{ title: 'Verificación de personas y entidades', desc: 'Verifica individuos y empresas, incluidos UBO y stakeholders complejos, en un único flujo automatizado.' }, { title: 'Verificación documental', desc: 'Autentica licencias, documentos nacionales y pasaportes de más de 200 países y territorios con OCR.' }, { title: 'Flujo de verificación fluido', desc: 'Diseña interfaces KYC y KYB alineadas con la identidad visual de tu empresa para mejorar conversión y confianza.' }, { title: 'Verificación no documental', desc: 'Comprueba nombres, direcciones, SSN y datos contra emisores, crédito y registros empresariales.' }] },
      { id: 'monitoring', title: 'Revisión y monitoreo continuos', cards: [{ title: 'Listas de sanciones globales', desc: 'Consulta bases activas como OFAC, HM Treasury y objetivos de la UE con umbrales fuzzy configurables.' }, { title: 'Revisión dinámica programada', desc: 'Activa revisiones diarias automáticas para clientes verificados y captura cambios en listas de vigilancia.' }] },
      { id: 'due-diligence', title: 'Automatización de due diligence', cards: [{ title: 'Disparadores AML avanzados', desc: 'Activa cuestionarios, prueba de dirección o declaraciones fiscales para usuarios con riesgo elevado.' }, { title: 'Registros de auditoría automáticos', desc: 'Cada regla, intervención de analista y resultado queda registrado para reportes de cumplimiento.' }] }
    ],
    industriesIntro: { badge: 'Verticales globales', title: 'Industrias atendidas', desc: 'Identra ofrece infraestructura de orquestación de cumplimiento para sectores financieros internacionales diversos.', benchmark: 'Rendimiento de referencia del sector' },
    industries: [
      { id: 'banking', title: 'Banca digital', desc: 'Verifica clientes en segundos cumpliendo regulaciones bancarias globales y estándares FinCEN.', stat: '99,2% de éxito en onboarding' },
      { id: 'institutions', title: 'Instituciones financieras', desc: 'Centraliza cumplimiento multi-jurisdicción en sucursales, entidades y gestión de activos.', stat: '-40% de carga de revisión manual' },
      { id: 'crypto', title: 'Criptomonedas', desc: 'Prevén delitos financieros, cumple Travel Rule y revisa wallets en exchanges globales.', stat: 'Mapeo de riesgo blockchain en tiempo real' },
      { id: 'payments', title: 'Pagos en línea y billeteras', desc: 'Mitiga fraude, automatiza contracargos y realiza revisión AML continua.', stat: '<300 ms de respuesta de verificación' },
      { id: 'movement', title: 'Movimiento de dinero', desc: 'Confirma identidades y listas para transferencias P2P, remesas y desembolsos.', stat: 'Cero falsos positivos en sanciones' },
      { id: 'lending', title: 'Préstamos y BNPL', desc: 'Verifica elegibilidad crediticia, bases de datos y cumplimiento antes de préstamos instantáneos.', stat: '98% de precisión en decisiones automáticas' }
    ],
    testimonial: { quote: '[Identra] nos ahorra mucho tiempo y ofrece un proceso mucho más fluido para los usuarios que el sistema anterior.', author: 'Doug Verduzco', role: 'Director de transformación digital, banco regional', badge: 'RESUMEN DEL CASO', title: 'Un banco regional cumplió requisitos críticos AML y KYC mientras avanzaba hacia un futuro digital con Identra', desc: 'Al reemplazar proveedores heredados por Identra, el banco redujo demoras de 48 horas a menos de 12 segundos manteniendo cumplimiento federal auditable.', cta: 'Leer caso completo' },
    resourcesIntro: { badge: 'Biblioteca de recursos', title: 'Sigue aprendiendo', cta: 'Ver ebooks e informes' },
    resources: [
      { meta: 'Video - 56 min', title: 'Crecimiento global: cumplimiento y confianza en mercados internacionales', desc: 'Aprende de profesionales de cumplimiento sobre expansión, matices regulatorios y prevención de fraude.', cta: 'Ver video' },
      { meta: 'Guía - 25 min', title: 'Guía para profesionales de identidad sobre cumplimiento regulatorio', desc: 'Playbook regulatorio sobre AML, KYC, KYB, beneficiarios finales y plazos SAR.', cta: 'Leer guía' },
      { meta: 'Blog - 7 min', title: 'Verificación KYC automatizada para responsables de cumplimiento', desc: 'Cómo las decisiones automáticas mejoran precisión y reducen colas de revisión manual.', cta: 'Leer blog' }
    ],
    exploreTitle: 'Explora más de la plataforma de identidad de Identra',
    exploreCards: [
      { label: 'VISTA DE PRODUCTO', title: 'Verifica documentos oficiales globalmente.', desc: 'Implementa verificación documental segura para más de 200 países con biometría facial avanzada.', cta: 'Explorar Government ID' },
      { label: 'VISTA DE REPORTES', title: 'Revisa sanciones globales y listas PEP.', desc: 'Ejecuta coincidencias de listas, revisiones PEP y alertas de medios adversos al instante.', cta: 'Explorar reportes de listas' }
    ],
    cta: { title: '¿Listo para empezar?', desc: 'Descubre cómo la plataforma AML/KYC configurable de Identra mantiene tu negocio conforme, seguro y en crecimiento.', primary: 'Solicitar demo', secondary: 'Probar ahora' }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: 'AML/KYC コンプライアンス',
    heroTitle: '事業要件に合わせて設計できる AML/KYC コンプライアンス。',
    heroDesc: 'Know Your Customer (KYC) と Anti-Money Laundering (AML) のプロセスを、現在と将来のグローバル規制に合わせて柔軟に調整できます。',
    getDemo: 'デモを依頼',
    trySandbox: 'サンドボックスを試す',
    heroMockup: {
      engine: 'AML_ENGINE_V3 // 稼働中',
      autopilot: '自動運用',
      subjectLabel: '照会対象',
      subjectName: 'Alexander Vance',
      subjectId: 'ID: inq_v4983x_compliance',
      riskLabel: 'リスクレベル',
      riskValue: '高リスク一致',
      logsLabel: '検証ログ',
      checks: [{ label: '公的身分証の真正性', status: '合格' }, { label: '顔セルフィーのライブネス確認', status: '合格' }, { label: '制裁 / ウォッチリスト照合', status: '1件一致' }],
      decisionTitle: 'アクティブなウォッチリスト一致判定',
      matchAccuracy: '一致精度: 97.4%',
      decisionDesc: '対象者は OFAC 制裁リスト (SDN) の "Alex Vance" と一致しています。優先コンプライアンス審査キューへ自動ルーティングします。',
      fileSar: 'SAR/STR 下書きを作成',
      overrideApprove: '上書き / 承認',
      actionQueued: 'SAR/STR 下書きをキューに追加'
    },
    pillars: [
      { label: '01 // 規制対応', title: '現在と将来の要件に対応', desc: 'Identra の俊敏なノーコード基盤で AML/KYC プロセスを自動化し、最新のグローバル規制へ迅速に適応します。' },
      { label: '02 // 動的なユーザーリスク', title: 'リスクベースの柔軟な運用', desc: '高度に設定可能なプラットフォームで、リスク条件に合わせたオンボーディングとスクリーニングを最適化します。' },
      { label: '03 // 運用負荷の削減', title: '統合された監査システム', desc: '本人確認記録とコンプライアンスログを集約し、手動レビュー、監査証跡、SAR/STR 提出を効率化します。' }
    ],
    trustedBy: '急成長スタートアップと国際企業が信頼',
    brands: ['BRANCH', 'Z.RO', '6LOCK', 'SQUARE'],
    processTitle: 'チーム、ユーザー、監査担当者にとって扱いやすい AML/KYC プロセスを構築',
    processDesc: '摩擦を増やさずにコンプライアンスを維持。厳格なリスク制御と説明可能な自動判定を備えた高速でモジュール型の体験を提供します。',
    features: [
      { badge: '柔軟なカスタマイズ', title: '粒度が細かく透明なコンプライアンス制御', desc: '必要書類、一致の重大度、監査対応のリスクプロファイルを、継続的な開発作業なしで設定できます。', bullets: ['制裁照合のしきい値をカスタマイズ', 'ルールセットを調整できるノーコード UI', '監査検証に使えるログ'] },
      { badge: '動的ルーティング', title: 'リスクに応じて変化するスムーズなユーザー体験', desc: '所在地、リスクスコア、取引金額に応じて検証フローを調整し、信頼できるユーザーを即時通過させ、不正をブロックします。', bullets: ['言語と国別の設定', '条件付きステップ進行', 'モバイルと Web に対応するレスポンシブ UI'] },
      { badge: '信頼できる単一ソース', title: '単一の記録システムから AML/KYC を統制', desc: '国境を越えた本人確認プロファイルを集約し、調査を統合管理して、自動判定と準拠した e-filing へ移行します。', approve: 'ユーザーを承認', decline: 'ユーザーを拒否', reset: '状態をリセット' }
    ],
    controlsMockup: { livePreview: 'ライブプレビュー', title: 'リスクヒューリスティックビルダー', strictness: '1. OFAC 制裁照合の厳格度', exact: '完全一致 (100% Fuzzy)', high: '高信頼度 (>85% Fuzzy)', standard: '標準検索 (>75% Fuzzy)', selfie: '2. セルフィーライブネスを必須化', expired: '3. 期限切れ書類を拒否', saved: '保存済み', savedDesc: 'ヒューリスティックはリアルタイムで更新されます。開発デプロイやコード変更は不要です。' },
    routingMockup: { title: '動的ユーザー検証パス', active: '稼働中のエンジン', rows: [{ code: 'US', title: 'ユーザー所在地: 米国カリフォルニア', subtitle: '低リスクの入金上限', path: 'パス: 即時 IDV' }, { code: 'DE', title: 'ユーザー所在地: ドイツ', subtitle: '国際送金しきい値', path: 'パス: NFC 確認 + セルフィー' }, { code: '!', title: '異常な IP / デバイスフラグ', subtitle: 'OFAC Fuzzy 照合一致', path: 'パス: 複数書類 + 手動レビュー' }] },
    caseMockup: { label: '照会ケースファイル', name: 'Elena Rostova', statuses: { review: 'レビュー必要', approved: '承認済み', declined: '拒否済み' }, jurisdiction: '管轄', jurisdictionValue: 'EU - エストニア', databaseMatch: 'データベース一致', databaseValue: '住所 100% 一致', verificationCheck: '検証項目', matchStatus: '一致状態', checks: [{ label: 'EU 国民パスポート ID', status: '検証済み' }, { label: 'セルフィーポートレートのライブネス', status: '3D OK' }, { label: 'PEP / 制裁スクリーニング', status: 'EU リスト一致' }], auditTitle: '監査ログ:', logs: ['14:22:10 GMT - スクリーニング開始', '14:22:11 GMT - 制裁リストで一致フラグ'], approvedLog: '14:23:05 GMT - コンプライアンス担当者が上書きを承認', declinedLog: '14:23:05 GMT - アカウントをブロックし auto-SAR を作成' },
    lifeCycle: {
      title: '顧客ライフサイクル全体でリスクを効率的に管理・低減',
      desc: 'コンプライアンスはオンボーディング時の一度きりの確認ではありません。Identra はユーザーと法人を継続的に検証します。',
      tabs: { onboarding: '1. オンボーディング対応', lifecycle: '2. ライフサイクル管理と監視' },
      onboardingCards: [
        { title: '個人オンボーディング', subtitle: '顧客 KYC チェックリスト', items: [{ title: '書類検証', desc: '公的書類とデータ項目を抽出、検証し、ローカルデータベースと即時照合します。' }, { title: '非書類検証', desc: 'パスポートや免許証がないユーザーも、SSN、携帯キャリア、信用情報で検証します。' }, { title: '本人性とデバイスの結合', desc: 'モバイル端末の指紋、ブラウザ偽装、2FA 生体認証パラメータを評価します。' }] },
        { title: '企業・法人オンボーディング', subtitle: 'KYB と UBO チェックリスト', items: [{ title: '事業登録の検証', desc: '法人登記を自動確認し、Tax ID や EIN をグローバル登録情報で検証します。' }, { title: '最終受益者 (UBO)', desc: '複雑な所有構造を展開し、意思決定者や主要株主に KYC チェックを実行します。' }, { title: '事業書類監査', desc: '定款、信託書類、パートナーシップ証明書を提出し自動検査します。' }] }
      ],
      lifecycleCards: [
        { title: '継続的な監視とスクリーニング', subtitle: 'AML セーフガード', items: [{ title: 'ウォッチリストとグローバル制裁', desc: 'OFAC、UK HMT、EU 統合リスト、国際ウォッチリストへ常時照合します。' }, { title: '政治的に重要な公的地位者 (PEP)', desc: '既存顧客が高位の政治的役割を取得した場合や規制上の露出が高まった場合に検知します。' }, { title: 'ネガティブメディアとニュースアラート', desc: '検証済みの個人や企業が金融犯罪アラートに関連付いた場合に通知します。' }] },
        { title: '高リスクの再検証', subtitle: 'イベント駆動のセキュリティトリガー', items: [{ title: '大口出金トリガー', desc: 'コンプライアンス上限を超える資金を解放する前に顔認証を要求します。' }, { title: 'アカウントとデバイスの復旧', desc: '多要素 ID 確認によりクレデンシャル攻撃や SIM スワップを軽減します。' }, { title: '疑わしい活動報告 (SAR)', desc: '異常な取引パターンに対して提出可能な e-form 下書きを生成します。' }] }
      ],
      platformCards: [{ label: 'プラットフォーム自動化', title: 'アカウントマッピング', desc: 'Identra の account mapping で本人確認記録システムを統制します。' }, { label: 'コンプライアンス e-file', title: 'SAR 自動下書き', desc: '規制 SAR と STR を自動入力し直接提出します。' }, { label: 'レビュー最適化', title: '自動キュー', desc: 'ルールベースの自動判定で手動レビューキューを効率化します。' }, { label: 'リスク管理', title: 'リンク分析', desc: 'カスタマイズ可能なケースリンクで疑わしいネットワークパターンを特定します。' }]
    },
    accordionIntro: { title: '理想的な AML/KYC プロセス構築に必要なすべて', desc: 'コンプライアンス担当者が検証を段階的に調整できる Identra の包括的なツールセットを確認できます。' },
    accordions: [
      { id: 'kyc-kyb', title: 'Know Your Customers / Know Your Business', cards: [{ title: '個人・法人エンティティ検証', desc: '複雑な UBO や関係者を含む個人と法人を単一の自動ワークフローで検証します。' }, { title: '書類検証', desc: '200以上の国と地域の免許証、国民 ID、パスポートを OCR で認証します。' }, { title: 'スムーズな検証フロー', desc: '企業のブランドに合わせた KYC/KYB UI を設計し、コンバージョンと信頼を高めます。' }, { title: '非書類検証', desc: '氏名、住所、SSN、詳細情報を発行元データベース、信用情報、企業登録で確認します。' }] },
      { id: 'monitoring', title: '継続スクリーニングと監視', cards: [{ title: 'グローバル制裁リスト', desc: 'OFAC、HM Treasury、EU 対象などのアクティブなデータベースを、設定可能なしきい値で照合します。' }, { title: '動的な再スクリーニング Cron', desc: '確認済み顧客に対して日次の自動再スクリーニングを有効化し、変更を即時に捉えます。' }] },
      { id: 'due-diligence', title: 'デューデリジェンス自動化', cards: [{ title: '高度な AML ワークフロートリガー', desc: 'リスクの高いユーザーに質問票、住所証明、税務書類を要求します。' }, { title: '自動監査証跡ログ', desc: '自動ロジック、アナリスト入力、検証結果をすべて記録し、報告に備えます。' }] }
    ],
    industriesIntro: { badge: 'グローバル業種', title: '対応業界', desc: 'Identra は多様な国際金融セクターにコンプライアンス統制基盤を提供します。', benchmark: 'セクター基準パフォーマンス' },
    industries: [
      { id: 'banking', title: 'デジタル銀行', desc: '厳格な銀行規制と FinCEN 標準を満たしながら数秒で顧客を検証します。', stat: 'オンボーディング成功率 99.2%' },
      { id: 'institutions', title: '金融機関', desc: '支店、法人、資産管理システムをまたぐ複雑なコンプライアンスを一元化します。', stat: '手動レビュー負荷を40%削減' },
      { id: 'crypto', title: '暗号資産', desc: '金融犯罪を防ぎ、Travel Rule に対応し、グローバル取引所のウォレットを継続監視します。', stat: 'リアルタイムのブロックチェーンリスクマッピング' },
      { id: 'payments', title: 'オンライン決済とウォレット', desc: '不正を抑え、チャージバック確認を自動化し、決済基盤の AML 監視を継続します。', stat: '検証応答時間 <300ms' },
      { id: 'movement', title: '資金移動', desc: 'P2P 送金、国際送金、企業支払いで本人性とウォッチリストを確認します。', stat: '制裁照合の誤検知ゼロ' },
      { id: 'lending', title: '融資と BNPL', desc: '即時融資の前に信用適格性、データベース、コンプライアンスを確認します。', stat: '自動判定精度 98%' }
    ],
    testimonial: { quote: '[Identra] により大幅に時間を節約でき、以前のシステムよりユーザーにとってはるかにスムーズなプロセスになりました。', author: 'Doug Verduzco', role: '地域銀行 デジタルトランスフォーメーション責任者', badge: 'ケーススタディ概要', title: '地域銀行が Identra とともにデジタル化を進めながら重要な AML/KYC 要件を満たしました', desc: '従来の本人確認ベンダーを Identra に置き換え、検証遅延を48時間から12秒未満に短縮し、監査可能な連邦コンプライアンスを維持しました。', cta: 'ケーススタディを読む' },
    resourcesIntro: { badge: 'リソースライブラリ', title: 'さらに学ぶ', cta: 'すべての ebook とレポートを見る' },
    resources: [{ meta: '動画 - 56分', title: 'グローバル成長を実現: 国際市場でのコンプライアンスと信頼', desc: 'コンプライアンス専門家から、国際展開、規制差異、不正防止の実践を学びます。', cta: '動画を見る' }, { meta: 'ガイド - 25分', title: '本人確認担当者のための規制遵守ガイド', desc: 'AML 要件、KYC、KYB、UBO、SAR タイムラインを整理した包括的なプレイブックです。', cta: 'ガイドを読む' }, { meta: 'ブログ - 7分', title: '自動 KYC 検証: コンプライアンス責任者向けガイド', desc: '本人確認における自動判定が精度を高め、手動レビューを減らす仕組みを解説します。', cta: 'ブログを読む' }],
    exploreTitle: 'Identra の本人確認プラットフォームをさらに見る',
    exploreCards: [{ label: '製品ビュー', title: '世界中の公的身分証を検証。', desc: '200以上の国に対応する安全な書類検証と高度な顔生体認証を導入できます。', cta: 'Government ID を見る' }, { label: 'レポートビュー', title: 'グローバル制裁と PEP リストを照合。', desc: 'ウォッチリスト一致、PEP 確認、ネガティブニュースアラートを即時実行します。', cta: 'ウォッチリストレポートを見る' }],
    cta: { title: '始める準備はできていますか？', desc: 'Identra のカスタマイズ可能な AML/KYC 統制基盤が、事業のコンプライアンス、安全性、成長を支えます。', primary: 'デモを依頼', secondary: '今すぐ試す' }
  },
  de: {
    backToPlatform: 'Zurück zur Plattform',
    badge: 'AML/KYC-COMPLIANCE',
    heroTitle: 'AML/KYC-Compliance, angepasst an Ihre Geschäftsanforderungen.',
    heroDesc: 'Passen Sie Know Your Customer (KYC) und Anti-Money Laundering (AML) an globale Vorschriften an, heute und in Zukunft.',
    getDemo: 'Demo anfordern',
    trySandbox: 'Sandbox testen',
    heroMockup: {
      engine: 'AML_ENGINE_V3 // AKTIV',
      autopilot: 'AUTOPILOT',
      subjectLabel: 'ANFRAGEPERSON',
      subjectName: 'Alexander Vance',
      subjectId: 'ID: inq_v4983x_compliance',
      riskLabel: 'RISIKOSTUFE',
      riskValue: 'HOCHRISIKO-TREFFER',
      logsLabel: 'VERIFIZIERUNGSLOGS',
      checks: [{ label: 'Echtheit des Ausweisdokuments', status: 'BESTANDEN' }, { label: 'Gesichts-Selfie-Liveness', status: 'BESTANDEN' }, { label: 'Sanktions- / Watchlist-Prüfung', status: '1 TREFFER' }],
      decisionTitle: 'Aktive Watchlist-Entscheidung',
      matchAccuracy: 'Treffergenauigkeit: 97,4%',
      decisionDesc: 'Die Person stimmt mit "Alex Vance" auf der OFAC-Sanktionsliste (SDN) überein. Automatische Weiterleitung an die priorisierte Compliance-Prüfung.',
      fileSar: 'SAR/STR-Entwurf erstellen',
      overrideApprove: 'Übersteuern / Freigeben',
      actionQueued: 'SAR/STR-Entwurf vorgemerkt'
    },
    pillars: [
      { label: '01 // REGULATORISCHE COMPLIANCE', title: 'Anforderungen von heute und morgen erfüllen', desc: 'Automatisieren Sie AML/KYC-Prozesse und passen Sie sich schnell an globale Vorschriften an, auf Identras agiler No-Code-Plattform.' },
      { label: '02 // DYNAMISCHES NUTZERRISIKO', title: 'Risikobasierter Ansatz nach Maß', desc: 'Optimieren Sie Onboarding und Screening mit einer Plattform, die sich exakt an Ihre Risikoparameter anpasst.' },
      { label: '03 // WENIGER AUFWAND', title: 'Konsolidiertes Auditsystem', desc: 'Vereinfachen Sie manuelle Prüfungen, Audit-Trails und SAR/STR-Meldungen durch zentrale Identitäts- und Compliance-Logs.' }
    ],
    trustedBy: 'Vertraut von schnell wachsenden Startups und internationalen Unternehmen',
    brands: ['BRANCH', 'Z.RO', '6LOCK', 'SQUARE'],
    processTitle: 'AML/KYC-Prozesse, die Teams, Nutzer und Prüfer gern verwenden',
    processDesc: 'Erfüllen Sie Compliance ohne Reibung. Liefern Sie schnelle, modulare Erlebnisse mit strenger Risikokontrolle und erklärbaren automatisierten Entscheidungen.',
    features: [
      { badge: 'Flexible Anpassung', title: 'Granulare und transparente Compliance-Kontrollen', desc: 'Konfigurieren Sie erforderliche Dokumente, Treffer-Schweregrade und auditierbare Risikoprofile ohne laufende Entwicklungsarbeit.', bullets: ['Eigene Schwellenwerte für Sanktionen', 'No-Code-Oberfläche für Regelanpassung', 'Nachweisbare Logs für Audits'] },
      { badge: 'Dynamisches Routing', title: 'Reibungslose Nutzererfahrung mit risikobasiertem Routing', desc: 'Vertrauenswürdige Nutzer sofort zulassen, Betrug blockieren und globale Regulatoren erfüllen, mit Flows nach Standort, Risiko und Betrag.', bullets: ['Sprach- und Länderkonfigurationen', 'Bedingte Schrittführung', 'Responsive Oberflächen für Mobilgerät und Web'] },
      { badge: 'Single Source of Truth', title: 'AML/KYC aus einem einzigen System orchestrieren', desc: 'Zentralisieren Sie grenzüberschreitende Identitätsprofile, koordinieren Sie Untersuchungen und wechseln Sie zu automatisierter Entscheidung und e-filing.', approve: 'Nutzer freigeben', decline: 'Nutzer ablehnen', reset: 'Status zurücksetzen' }
    ],
    controlsMockup: { livePreview: 'Live-Vorschau', title: 'Risiko-Heuristik-Builder', strictness: '1. OFAC-Sanktionsstrenge', exact: 'Exakter Treffer (100% Fuzzy)', high: 'Hohe Sicherheit (>85% Fuzzy)', standard: 'Standardsuche (>75% Fuzzy)', selfie: '2. Selfie-Liveness verlangen', expired: '3. Abgelaufene Dokumente ablehnen', saved: 'Gespeichert', savedDesc: 'Heuristiken werden in Echtzeit aktualisiert. Keine Deployments oder Codeänderungen nötig.' },
    routingMockup: { title: 'Dynamischer Verifizierungspfad', active: 'Engine aktiv', rows: [{ code: 'US', title: 'Nutzerstandort: Kalifornien, USA', subtitle: 'Einzahlungslimit mit geringem Risiko', path: 'Pfad: Sofortige IDV' }, { code: 'DE', title: 'Nutzerstandort: Deutschland', subtitle: 'Schwelle für grenzüberschreitende Überweisung', path: 'Pfad: NFC-Prüfung + Selfie' }, { code: '!', title: 'Anomale IP-/Gerätewarnung', subtitle: 'Fuzzy-OFAC-Treffer', path: 'Pfad: Mehrere Dokumente + manuelle Prüfung' }] },
    caseMockup: { label: 'Anfrageakte', name: 'Elena Rostova', statuses: { review: 'Prüfung nötig', approved: 'Freigegeben', declined: 'Abgelehnt' }, jurisdiction: 'Jurisdiktion', jurisdictionValue: 'EU - Estland', databaseMatch: 'Datenbanktreffer', databaseValue: 'Adresse 100% korrekt', verificationCheck: 'Prüfung', matchStatus: 'Status', checks: [{ label: 'EU-Reisepass-ID', status: 'VERIFIZIERT' }, { label: 'Selfie-Porträt-Liveness', status: '3D OK' }, { label: 'PEP- / Sanktionsscreening', status: 'TREFFER EU-LISTE' }], auditTitle: 'Audit-Logs:', logs: ['14:22:10 GMT - Screening gestartet', '14:22:11 GMT - Trefferflag auf Sanktionsliste gesetzt'], approvedLog: '14:23:05 GMT - Übersteuerung durch Compliance Officer autorisiert', declinedLog: '14:23:05 GMT - Konto gesperrt und auto-SAR vorbereitet' },
    lifeCycle: {
      title: 'Risiken über den gesamten Kundenlebenszyklus effizient steuern und senken',
      desc: 'Compliance ist keine einmalige Onboarding-Prüfung. Identra validiert Nutzer und Unternehmen kontinuierlich vom Start bis zur laufenden Aktivität.',
      tabs: { onboarding: '1. Onboarding-Compliance', lifecycle: '2. Lebenszyklusmanagement & Monitoring' },
      onboardingCards: [
        { title: 'Onboarding für Personen', subtitle: 'KYC-Checklisten für Kunden', items: [{ title: 'Dokumentarische Verifizierung', desc: 'Dokumente und Datenfelder auslesen, prüfen und sofort mit lokalen Datenbanken abgleichen.' }, { title: 'Nicht-dokumentarische Verifizierung', desc: 'Nutzer ohne Pass oder Führerschein über SSN, Mobilfunkdaten und Auskunfteien prüfen.' }, { title: 'Identitäts- und Gerätebindung', desc: 'Gerätefingerprints, Browser-Spoofing und biometrische 2FA-Parameter bewerten.' }] },
        { title: 'Onboarding für Unternehmen', subtitle: 'KYB- und UBO-Checklisten', items: [{ title: 'Validierung von Handelsregistern', desc: 'Unternehmensregistrierungen prüfen und Tax IDs oder EINs in globalen Registern validieren.' }, { title: 'Wirtschaftlich Berechtigte (UBO)', desc: 'Komplexe Eigentümerstrukturen auflösen und Entscheidungsträger sowie wichtige Anteilseigner prüfen.' }, { title: 'Audit von Geschäftsdokumenten', desc: 'Gründungsunterlagen, Trust-Dokumente und Partnerschaftszertifikate einreichen und prüfen.' }] }
      ],
      lifecycleCards: [
        { title: 'Kontinuierliches Monitoring & Screening', subtitle: 'AML-Schutzmaßnahmen', items: [{ title: 'Watchlists & globale Sanktionen', desc: 'Always-on-Screening gegen OFAC, UK HMT, EU-Konsolidierungen und internationale Watchlists.' }, { title: 'Politisch exponierte Personen (PEP)', desc: 'Erkennen, wenn aktive Kunden politische Funktionen übernehmen oder regulatorisch exponierter werden.' }, { title: 'Negative Medien & News Alerts', desc: 'Sofort benachrichtigt werden, wenn geprüfte Personen oder Unternehmen mit Finanzkriminalität verbunden werden.' }] },
        { title: 'Hochrisiko-Reverifizierung', subtitle: 'Ereignisgesteuerte Sicherheitstrigger', items: [{ title: 'Trigger für große Auszahlungen', desc: 'Gesichtsbiometrie verlangen, bevor Gelder über Compliance-Grenzen freigegeben werden.' }, { title: 'Konto- und Gerätewiederherstellung', desc: 'Credential-Stuffing und SIM-Swap mit sofortiger Multi-Faktor-ID-Bestätigung reduzieren.' }, { title: 'Meldung verdächtiger Aktivitäten (SAR)', desc: 'Einreichfertige e-form-Entwürfe für verdächtige Transaktionsmuster generieren.' }] }
      ],
      platformCards: [{ label: 'Plattformautomatisierung', title: 'Account Mapping', desc: 'Identitätssysteme über Account Mapping in Identra orchestrieren.' }, { label: 'Compliance E-File', title: 'Auto-Draft SARs', desc: 'Regulatorische SARs und STRs automatisch ausfüllen und einreichen.' }, { label: 'Review-Optimierung', title: 'Automatisierte Queues', desc: 'Manuelle Prüfqueues mit regelbasierter Entscheidung vereinfachen.' }, { label: 'Risikomanagement', title: 'Linkanalyse', desc: 'Verdächtige Netzwerkmuster mit konfigurierbaren Case-Links erkennen.' }]
    },
    accordionIntro: { title: 'Alles für Ihren idealen AML/KYC-Prozess', desc: 'Prüfen Sie umfassende Identra-Tools, mit denen Compliance-Manager Verifizierung Schritt für Schritt anpassen.' },
    accordions: [
      { id: 'kyc-kyb', title: 'Know Your Customers / Know Your Business', cards: [{ title: 'Verifizierung von Personen und Unternehmen', desc: 'Personen und Unternehmen inklusive komplexer UBOs und Stakeholder in einem automatisierten Workflow prüfen.' }, { title: 'Dokumentarische Verifizierung', desc: 'Führerscheine, nationale IDs und Reisepässe aus über 200 Ländern und Gebieten per OCR authentifizieren.' }, { title: 'Nahtloser Verifizierungsflow', desc: 'KYC- und KYB-Oberflächen passend zur Markenidentität gestalten und Vertrauen erhöhen.' }, { title: 'Nicht-dokumentarische Verifizierung', desc: 'Namen, Adressen, SSNs und Details gegen Aussteller-, Kredit- und Unternehmensregister prüfen.' }] },
      { id: 'monitoring', title: 'Kontinuierliches Screening und Monitoring', cards: [{ title: 'Globale Sanktionslisten', desc: 'Aktive Watchlist-Datenbanken wie OFAC, HM Treasury und EU-Ziele mit konfigurierbaren Fuzzy-Schwellen prüfen.' }, { title: 'Dynamisches Re-Screening Cron', desc: 'Tägliches automatisches Re-Screening für aktive verifizierte Kunden aktivieren.' }] },
      { id: 'due-diligence', title: 'Automatisierte Due Diligence', cards: [{ title: 'Erweiterte AML-Workflow-Trigger', desc: 'Fragebögen, Adressnachweise oder Steuerunterlagen für Nutzer mit erhöhtem Risiko auslösen.' }, { title: 'Automatische Audit-Trail-Logs', desc: 'Jeder Trigger, Analysteneingriff und jedes Ergebnis wird für Compliance-Berichte protokolliert.' }] }
    ],
    industriesIntro: { badge: 'Globale Branchen', title: 'Bediente Branchen', desc: 'Identra bietet Compliance-Orchestrierung für vielfältige internationale Finanzsektoren.', benchmark: 'Benchmark-Leistung der Branche' },
    industries: [
      { id: 'banking', title: 'Digital Banking', desc: 'Kunden in Sekunden prüfen und globale Bankvorschriften sowie FinCEN-Standards erfüllen.', stat: '99,2% Onboarding-Erfolgsrate' },
      { id: 'institutions', title: 'Finanzinstitute', desc: 'Komplexe Multi-Jurisdiktions-Compliance über Filialen, Einheiten und Asset-Management zentralisieren.', stat: '-40% manueller Prüfaufwand' },
      { id: 'crypto', title: 'Kryptowährung', desc: 'Finanzkriminalität verhindern, Travel Rule erfüllen und Wallets auf globalen Börsen laufend screenen.', stat: 'Blockchain-Risikomapping in Echtzeit' },
      { id: 'payments', title: 'Online-Zahlungen und Wallets', desc: 'Betrug reduzieren, Chargeback-Prüfungen automatisieren und AML-Screening fortlaufend ausführen.', stat: '<300 ms Antwortzeit der Verifizierung' },
      { id: 'movement', title: 'Geldbewegung', desc: 'Identität und Watchlists für P2P-Transfers, Auslandsüberweisungen und Auszahlungen bestätigen.', stat: 'Keine False Positives bei Sanktionsprüfungen' },
      { id: 'lending', title: 'Kreditvergabe und BNPL', desc: 'Bonität, Datenbanken und Compliance vor Sofortkrediten prüfen.', stat: '98% Genauigkeit bei automatischen Entscheidungen' }
    ],
    testimonial: { quote: '[Identra] spart uns viel Zeit und ist für Nutzer deutlich nahtloser als das alte System.', author: 'Doug Verduzco', role: 'Leiter digitale Transformation, Regionalbank', badge: 'CASE-STUDY-ZUSAMMENFASSUNG', title: 'Eine Regionalbank erfüllte kritische AML- und KYC-Anforderungen auf dem Weg in eine digitale Zukunft mit Identra', desc: 'Durch den Wechsel von Legacy-Anbietern zu Identra reduzierte die Bank Verzögerungen von 48 Stunden auf unter 12 Sekunden und behielt auditierbare Compliance.', cta: 'Case Study lesen' },
    resourcesIntro: { badge: 'Ressourcenbibliothek', title: 'Weiter lernen', cta: 'Alle E-Books & Berichte ansehen' },
    resources: [{ meta: 'Video - 56 Min.', title: 'Globales Wachstum: Compliance und Vertrauen in internationalen Märkten', desc: 'Compliance-Fachleute teilen Ansätze für Expansion, regulatorische Nuancen und Betrugsprävention.', cta: 'Video ansehen' }, { meta: 'Leitfaden - 25 Min.', title: 'Der Leitfaden für Identitätsprofis zur regulatorischen Compliance', desc: 'Ein Playbook zu AML-Anforderungen, KYC, KYB, UBO-Abfragen und SAR-Fristen.', cta: 'Leitfaden lesen' }, { meta: 'Blog - 7 Min.', title: 'Automatisierte KYC-Verifizierung für Compliance-Verantwortliche', desc: 'Wie automatische Entscheidungen die Präzision erhöhen und manuelle Prüfqueues reduzieren.', cta: 'Blog lesen' }],
    exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
    exploreCards: [{ label: 'PRODUKTANSICHT', title: 'Ausweisdokumente weltweit verifizieren.', desc: 'Sichere Dokumentenprüfung für 200+ Länder mit fortschrittlicher Gesichtsbiometrie bereitstellen.', cta: 'Government ID entdecken' }, { label: 'REPORTING-ANSICHT', title: 'Globale Sanktionen und PEP-Listen prüfen.', desc: 'Watchlist-Treffer, PEP-Prüfungen und negative News Alerts sofort ausführen.', cta: 'Watchlist Reports entdecken' }],
    cta: { title: 'Bereit loszulegen?', desc: 'Erfahren Sie, wie Identras anpassbare AML/KYC-Orchestrierungsplattform Ihr Unternehmen compliant, sicher und wachstumsfähig hält.', primary: 'Demo anfordern', secondary: 'Jetzt testen' }
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    badge: 'TUÂN THỦ AML/KYC',
    heroTitle: 'Tuân thủ AML/KYC được tùy chỉnh theo nhu cầu doanh nghiệp.',
    heroDesc: 'Điều chỉnh quy trình Know Your Customer (KYC) và Anti-Money Laundering (AML) để đáp ứng quy định toàn cầu theo cách của bạn, cả hiện tại lẫn tương lai.',
    getDemo: 'Nhận bản demo',
    trySandbox: 'Thử môi trường kiểm thử',
    heroMockup: {
      engine: 'AML_ENGINE_V3 // ĐANG HOẠT ĐỘNG',
      autopilot: 'TỰ ĐỘNG',
      subjectLabel: 'ĐỐI TƯỢNG HỒ SƠ',
      subjectName: 'Alexander Vance',
      subjectId: 'ID: inq_v4983x_compliance',
      riskLabel: 'MỨC RỦI RO',
      riskValue: 'KHỚP RỦI RO CAO',
      logsLabel: 'NHẬT KÝ XÁC MINH',
      checks: [{ label: 'Tính xác thực của giấy tờ tùy thân', status: 'ĐẠT' }, { label: 'Kiểm tra sống động selfie khuôn mặt', status: 'ĐẠT' }, { label: 'Sàng lọc cấm vận / danh sách theo dõi', status: 'TÌM THẤY 1 KẾT QUẢ' }],
      decisionTitle: 'Quyết định khớp danh sách theo dõi',
      matchAccuracy: 'Độ chính xác khớp: 97,4%',
      decisionDesc: 'Đối tượng khớp tên "Alex Vance" trong danh sách cấm vận OFAC (SDN). Tự động chuyển vào hàng đợi rà soát tuân thủ ưu tiên.',
      fileSar: 'Tạo bản nháp SAR/STR',
      overrideApprove: 'Ghi đè / Phê duyệt',
      actionQueued: 'Đã đưa bản nháp SAR/STR vào hàng đợi'
    },
    pillars: [
      { label: '01 // TUÂN THỦ QUY ĐỊNH', title: 'Đáp ứng nhu cầu hôm nay và ngày mai', desc: 'Tự động hóa quy trình AML/KYC và nhanh chóng thích ứng với quy định toàn cầu trên nền tảng linh hoạt, không cần viết mã của Identra.' },
      { label: '02 // RỦI RO NGƯỜI DÙNG ĐỘNG', title: 'Cách tiếp cận dựa trên rủi ro theo nhu cầu', desc: 'Dùng nền tảng có khả năng cấu hình cao để tối ưu quy trình tiếp nhận khách hàng và sàng lọc theo chính xác tham số rủi ro của bạn.' },
      { label: '03 // GIẢM GÁNH NẶNG VẬN HÀNH', title: 'Hệ thống kiểm toán hợp nhất', desc: 'Tinh gọn rà soát thủ công, vết kiểm toán và hồ sơ SAR/STR bằng cách tập trung hóa dữ liệu danh tính và nhật ký tuân thủ.' }
    ],
    trustedBy: 'Được các startup tăng trưởng nhanh và doanh nghiệp quốc tế tin dùng',
    brands: ['BRANCH', 'Z.RO', '6LOCK', 'SQUARE'],
    processTitle: 'Xây dựng quy trình AML/KYC thuận tiện cho đội ngũ, người dùng và kiểm toán viên',
    processDesc: 'Duy trì tuân thủ mà không tạo ma sát. Cung cấp trải nghiệm nhanh, dạng mô-đun, đồng thời đảm bảo kiểm soát rủi ro chặt chẽ và quyết định tự động có thể giải thích.',
    features: [
      { badge: 'Tùy chỉnh linh hoạt', title: 'Kiểm soát tuân thủ chi tiết và minh bạch', desc: 'Tùy chỉnh tài liệu bắt buộc, mức độ nghiêm trọng của kết quả khớp và hồ sơ rủi ro sẵn sàng kiểm toán mà không cần phụ thuộc liên tục vào kỹ thuật.', bullets: ['Ngưỡng khớp tùy chỉnh cho cấm vận', 'Giao diện không cần mã để chỉnh bộ quy tắc', 'Nhật ký có thể xác minh cho kiểm toán'] },
      { badge: 'Định tuyến động', title: 'Trải nghiệm người dùng liền mạch với định tuyến theo rủi ro', desc: 'Phê duyệt nhanh người dùng đáng tin cậy, chặn gian lận và đáp ứng yêu cầu quản lý bằng luồng xác minh tự điều chỉnh theo vị trí, điểm rủi ro và số tiền giao dịch.', bullets: ['Cấu hình theo ngôn ngữ và quốc gia', 'Tiến trình bước có điều kiện', 'Giao diện đáp ứng cho di động và web'] },
      { badge: 'Nguồn dữ liệu đáng tin cậy duy nhất', title: 'Điều phối AML/KYC từ một hệ thống hồ sơ duy nhất', desc: 'Tập trung hóa hồ sơ danh tính xuyên biên giới, phối hợp điều tra toàn diện và chuyển từ kiểm toán thủ công sang quyết định tự động cùng nộp hồ sơ điện tử tuân thủ.', approve: 'Phê duyệt người dùng', decline: 'Từ chối người dùng', reset: 'Đặt lại trạng thái' }
    ],
    controlsMockup: { livePreview: 'Xem trước trực tiếp', title: 'Bộ xây dựng quy tắc kinh nghiệm rủi ro', strictness: '1. Độ nghiêm ngặt cấm vận OFAC', exact: 'Khớp chính xác (100% gần đúng)', high: 'Độ tin cậy cao (>85% gần đúng)', standard: 'Tìm kiếm tiêu chuẩn (>75% gần đúng)', selfie: '2. Yêu cầu selfie sống động', expired: '3. Từ chối giấy tờ hết hạn', saved: 'Đã lưu', savedDesc: 'Quy tắc kinh nghiệm được cập nhật theo thời gian thực. Không cần triển khai kỹ thuật hay thay đổi mã.' },
    routingMockup: { title: 'Lộ trình xác minh người dùng động', active: 'Công cụ đang hoạt động', rows: [{ code: 'US', title: 'Vị trí người dùng: California, Hoa Kỳ', subtitle: 'Giới hạn nạp tiền rủi ro thấp', path: 'Lộ trình: IDV tức thì' }, { code: 'DE', title: 'Vị trí người dùng: Đức', subtitle: 'Ngưỡng chuyển tiền xuyên biên giới', path: 'Lộ trình: kiểm tra NFC + selfie' }, { code: '!', title: 'Cờ bất thường IP/thiết bị', subtitle: 'Khớp gần đúng trong OFAC', path: 'Lộ trình: nhiều tài liệu + rà soát thủ công' }] },
    caseMockup: { label: 'Hồ sơ điều tra', name: 'Elena Rostova', statuses: { review: 'Cần rà soát', approved: 'Đã phê duyệt', declined: 'Đã từ chối' }, jurisdiction: 'Khu vực pháp lý', jurisdictionValue: 'EU - Estonia', databaseMatch: 'Kết quả khớp cơ sở dữ liệu', databaseValue: 'Địa chỉ chính xác 100%', verificationCheck: 'Kiểm tra xác minh', matchStatus: 'Trạng thái khớp', checks: [{ label: 'Hộ chiếu quốc gia EU', status: 'ĐÃ XÁC MINH' }, { label: 'Sống động chân dung selfie', status: '3D OK' }, { label: 'Sàng lọc PEP / cấm vận', status: 'KHỚP DANH SÁCH EU' }], auditTitle: 'Nhật ký kiểm toán:', logs: ['14:22:10 GMT - Đã kích hoạt sàng lọc', '14:22:11 GMT - Đã gắn cờ khớp danh sách cấm vận'], approvedLog: '14:23:05 GMT - Nhân sự tuân thủ đã cho phép ghi đè', declinedLog: '14:23:05 GMT - Tài khoản bị khóa và bản nháp SAR tự động đã được chuẩn bị' },
    lifeCycle: {
      title: 'Quản lý và giảm rủi ro hiệu quả trong suốt vòng đời khách hàng',
      desc: 'Tuân thủ không chỉ là một lần kiểm tra khi tiếp nhận khách hàng. Identra liên tục xác thực người dùng và tổ chức từ lúc đăng ký đến các hoạt động đang diễn ra.',
      tabs: { onboarding: '1. Tuân thủ khi tiếp nhận', lifecycle: '2. Quản lý và giám sát vòng đời' },
      onboardingCards: [
        { title: 'Tiếp nhận cá nhân', subtitle: 'Danh sách kiểm tra KYC khách hàng', items: [{ title: 'Xác minh bằng tài liệu', desc: 'Trích xuất, xác minh và đối chiếu giấy tờ do chính phủ cấp cùng trường dữ liệu với cơ sở dữ liệu địa phương ngay lập tức.' }, { title: 'Xác minh không dùng tài liệu', desc: 'Xác minh người dùng không có hộ chiếu hoặc giấy phép bằng SSN, dữ liệu nhà mạng và hồ sơ tín dụng.' }, { title: 'Liên kết danh tính và thiết bị', desc: 'Đánh giá dấu vân tay thiết bị, tín hiệu giả mạo trình duyệt và tham số sinh trắc học 2FA an toàn.' }] },
        { title: 'Tiếp nhận doanh nghiệp và pháp nhân', subtitle: 'Danh sách kiểm tra KYB và UBO', items: [{ title: 'Xác thực đăng ký doanh nghiệp', desc: 'Tự động kiểm tra hồ sơ đăng ký công ty và xác minh Tax ID hoặc EIN trong cơ sở đăng ký toàn cầu.' }, { title: 'Chủ sở hữu hưởng lợi cuối cùng (UBO)', desc: 'Gỡ các lớp sở hữu phức tạp và chạy kiểm tra KYC cho người ra quyết định hoặc cổ đông có tỷ lệ sở hữu cao.' }, { title: 'Kiểm toán tài liệu doanh nghiệp', desc: 'Nộp và tự động kiểm tra điều lệ thành lập, hồ sơ ủy thác và chứng nhận hợp danh.' }] }
      ],
      lifecycleCards: [
        { title: 'Giám sát và sàng lọc liên tục', subtitle: 'Biện pháp bảo vệ AML', items: [{ title: 'Danh sách theo dõi và cấm vận toàn cầu', desc: 'Sàng lọc luôn bật với OFAC, UK HMT, danh sách hợp nhất EU và nhiều cơ sở dữ liệu quốc tế.' }, { title: 'Người có ảnh hưởng chính trị (PEP)', desc: 'Phát hiện khi khách hàng hiện hữu giữ vai trò chính trị cấp cao hoặc có mức phơi nhiễm pháp lý tăng lên.' }, { title: 'Truyền thông bất lợi và cảnh báo tin tức', desc: 'Nhận thông báo nếu cá nhân hoặc doanh nghiệp đã xác minh liên quan đến cảnh báo tội phạm tài chính.' }] },
        { title: 'Tái xác minh rủi ro cao', subtitle: 'Kích hoạt bảo mật theo sự kiện', items: [{ title: 'Kích hoạt khi rút tiền lớn', desc: 'Yêu cầu sinh trắc học khuôn mặt trước khi giải ngân số tiền vượt ngưỡng tuân thủ đã định.' }, { title: 'Khôi phục tài khoản và thiết bị', desc: 'Giảm tấn công nhồi thông tin đăng nhập và SIM-swap bằng xác nhận danh tính đa yếu tố ngay lập tức.' }, { title: 'Báo cáo hoạt động đáng ngờ (SAR)', desc: 'Tạo bản nháp biểu mẫu điện tử sẵn sàng nộp cho các mẫu giao dịch bị đánh dấu bất thường.' }] }
      ],
      platformCards: [{ label: 'Tự động hóa nền tảng', title: 'Ánh xạ tài khoản', desc: 'Điều phối hệ thống hồ sơ danh tính qua ánh xạ tài khoản trong Identra.' }, { label: 'Hồ sơ điện tử tuân thủ', title: 'Tự động nháp SAR', desc: 'Tự động điền và nộp trực tiếp SAR và STR theo quy định.' }, { label: 'Tối ưu rà soát', title: 'Hàng đợi tự động', desc: 'Tinh gọn hàng đợi rà soát thủ công bằng quyết định tự động dựa trên quy tắc.' }, { label: 'Quản lý rủi ro', title: 'Phân tích liên kết', desc: 'Nhận diện mẫu mạng lưới đáng ngờ bằng liên kết hồ sơ có thể tùy chỉnh.' }]
    },
    accordionIntro: { title: 'Mọi thứ bạn cần để xây dựng quy trình AML/KYC lý tưởng', desc: 'Khám phá bộ công cụ toàn diện của Identra giúp nhà quản lý tuân thủ tinh chỉnh từng bước xác minh.' },
    accordions: [
      { id: 'kyc-kyb', title: 'Know Your Customers / Know Your Business', cards: [{ title: 'Xác minh cá nhân và pháp nhân doanh nghiệp', desc: 'Xác minh cá nhân và doanh nghiệp, bao gồm UBO và các bên liên quan phức tạp, trong một quy trình tự động duy nhất.' }, { title: 'Xác minh bằng tài liệu', desc: 'Kiểm tra và xác thực giấy phép lái xe, căn cước quốc gia và hộ chiếu từ hơn 200 quốc gia và vùng lãnh thổ bằng OCR.' }, { title: 'Luồng xác minh liền mạch', desc: 'Thiết kế giao diện KYC và KYB đẹp, phù hợp nhận diện thương hiệu để cải thiện chuyển đổi và niềm tin.' }, { title: 'Xác minh không dùng tài liệu', desc: 'Kiểm tra tên, địa chỉ, SSN và thông tin với cơ sở dữ liệu phát hành, hồ sơ tín dụng và đăng ký doanh nghiệp.' }] },
      { id: 'monitoring', title: 'Sàng lọc và giám sát liên tục', cards: [{ title: 'Danh sách cấm vận toàn cầu', desc: 'Kiểm tra các cơ sở dữ liệu danh sách theo dõi đang hoạt động như OFAC, HM Treasury và mục tiêu EU với ngưỡng khớp gần đúng tùy chỉnh.' }, { title: 'Tái sàng lọc động theo lịch', desc: 'Bật tái sàng lọc tự động hằng ngày cho khách hàng đã xác minh để phát hiện thay đổi trong danh sách theo dõi.' }] },
      { id: 'due-diligence', title: 'Tự động hóa thẩm định', cards: [{ title: 'Kích hoạt quy trình AML nâng cao', desc: 'Kích hoạt bảng câu hỏi thẩm định, chứng minh địa chỉ hoặc hồ sơ thuế cho người dùng có nhãn rủi ro cao.' }, { title: 'Nhật ký vết kiểm toán tự động', desc: 'Mọi kích hoạt logic, thao tác của chuyên viên và kết quả xác minh đều được ghi lại cho báo cáo tuân thủ.' }] }
    ],
    industriesIntro: { badge: 'Ngành dọc toàn cầu', title: 'Ngành được phục vụ', desc: 'Identra cung cấp hạ tầng điều phối tuân thủ cho nhiều lĩnh vực tài chính quốc tế khác nhau.', benchmark: 'Hiệu suất chuẩn theo ngành' },
    industries: [
      { id: 'banking', title: 'Ngân hàng số', desc: 'Xác minh khách hàng trong vài giây đồng thời đáp ứng quy định ngân hàng toàn cầu và tiêu chuẩn FinCEN.', stat: '99,2% tỷ lệ tiếp nhận thành công' },
      { id: 'institutions', title: 'Tổ chức tài chính', desc: 'Tập trung hóa tuân thủ đa khu vực pháp lý trên nhiều chi nhánh, pháp nhân và hệ thống quản lý tài sản.', stat: 'Giảm 40% chi phí rà soát thủ công' },
      { id: 'crypto', title: 'Tiền mã hóa', desc: 'Ngăn tội phạm tài chính, đáp ứng Travel Rule và liên tục sàng lọc ví trên các sàn giao dịch toàn cầu.', stat: 'Lập bản đồ rủi ro blockchain theo thời gian thực' },
      { id: 'payments', title: 'Thanh toán trực tuyến và ví điện tử', desc: 'Giảm gian lận, tự động hóa kiểm tra hoàn trả giao dịch và sàng lọc AML liên tục cho cổng thanh toán và ví.', stat: 'Thời gian phản hồi xác minh <300ms' },
      { id: 'movement', title: 'Luân chuyển tiền', desc: 'Xác nhận danh tính và danh sách theo dõi cho chuyển tiền ngang hàng, kiều hối xuyên biên giới và giải ngân.', stat: 'Không có dương tính giả trong kiểm tra cấm vận' },
      { id: 'lending', title: 'Cho vay và BNPL', desc: 'Xác minh điều kiện tín dụng, kiểm tra cơ sở dữ liệu và đảm bảo tuân thủ trước khi cấp khoản vay tức thì.', stat: '98% độ chính xác quyết định tự động' }
    ],
    testimonial: { quote: '[Identra] giúp chúng tôi tiết kiệm rất nhiều thời gian và mang lại quy trình liền mạch hơn nhiều cho người dùng so với hệ thống cũ.', author: 'Doug Verduzco', role: 'Giám đốc chuyển đổi số, ngân hàng khu vực', badge: 'TÓM TẮT NGHIÊN CỨU TÌNH HUỐNG', title: 'Một ngân hàng khu vực đáp ứng yêu cầu AML và KYC trọng yếu khi chuyển sang tương lai số với Identra', desc: 'Bằng cách thay thế nhà cung cấp danh tính cũ bằng Identra, ngân hàng giảm độ trễ xác minh từ 48 giờ xuống dưới 12 giây mà vẫn duy trì tuân thủ liên bang có thể kiểm toán.', cta: 'Đọc nghiên cứu tình huống đầy đủ' },
    resourcesIntro: { badge: 'Thư viện tài nguyên', title: 'Tiếp tục tìm hiểu', cta: 'Xem tất cả sách điện tử và báo cáo' },
    resources: [{ meta: 'Video - 56 phút', title: 'Mở khóa tăng trưởng toàn cầu: đảm bảo tuân thủ và niềm tin trên thị trường quốc tế', desc: 'Học từ các chuyên gia tuân thủ về mở rộng quốc gia, sắc thái quy định và phương pháp chống gian lận.', cta: 'Xem video' }, { meta: 'Hướng dẫn - 25 phút', title: 'Hướng dẫn cho chuyên gia danh tính để đạt và duy trì tuân thủ quy định', desc: 'Tài liệu thực hành toàn diện về yêu cầu AML, xác minh KYC, tra cứu chủ sở hữu KYB và mốc thời gian SAR.', cta: 'Đọc hướng dẫn' }, { meta: 'Blog - 7 phút', title: 'Xác minh KYC tự động: hướng dẫn cho quản lý tuân thủ và lãnh đạo', desc: 'Cách quyết định tự động hoạt động trong xác minh danh tính để nâng độ chính xác và giảm hàng đợi rà soát thủ công.', cta: 'Đọc bài viết' }],
    exploreTitle: 'Khám phá thêm nền tảng danh tính của Identra',
    exploreCards: [{ label: 'GÓC NHÌN SẢN PHẨM', title: 'Xác minh giấy tờ tùy thân toàn cầu.', desc: 'Triển khai xác minh tài liệu an toàn cho hơn 200 quốc gia với sinh trắc học khuôn mặt nâng cao.', cta: 'Khám phá Government ID' }, { label: 'GÓC NHÌN BÁO CÁO', title: 'Sàng lọc cấm vận toàn cầu và danh sách PEP.', desc: 'Thực thi khớp danh sách theo dõi, kiểm tra PEP và cảnh báo tin tức bất lợi ngay lập tức.', cta: 'Khám phá báo cáo danh sách theo dõi' }],
    cta: { title: 'Sẵn sàng bắt đầu?', desc: 'Khám phá cách nền tảng điều phối AML/KYC tùy chỉnh của Identra giúp doanh nghiệp luôn tuân thủ, an toàn và tăng trưởng.', primary: 'Nhận bản demo', secondary: 'Thử ngay' }
  }
} as const;
