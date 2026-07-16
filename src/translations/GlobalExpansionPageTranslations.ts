/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GlobalExpansionLanguage = 'en' | 'es' | 'ja' | 'de' | 'vi';
export type GlobalExpansionScenarioKey = 'eu' | 'latam' | 'apac' | 'na';
export type GlobalExpansionRegionKey = 'EU' | 'LATAM' | 'APAC' | 'NA';
export type GlobalExpansionHubKey = 'london' | 'tokyo' | 'newYork' | 'singapore' | 'frankfurt';

export type GlobalExpansionTextKey =
  | 'backToPlatform'
  | 'heroBadge'
  | 'heroTitle'
  | 'heroDesc'
  | 'getDemo'
  | 'exploreSandbox'
  | 'hubMonitor'
  | 'registryLatency'
  | 'throughput'
  | 'online'
  | 'trustedBy'
  | 'globalPipelineEyebrow'
  | 'globalPipelineTitle'
  | 'globalPipelineDesc'
  | 'checklistLabel'
  | 'passRateLabel'
  | 'riskRatingLabel'
  | 'complianceEyebrow'
  | 'complianceTitle'
  | 'complianceDesc'
  | 'translationMappingTitle'
  | 'translationMappingDesc'
  | 'screeningBlueprintsTitle'
  | 'screeningBlueprintsDesc'
  | 'hubEyebrow'
  | 'hubTitle'
  | 'hubDesc'
  | 'sdkFootprint'
  | 'deployOnce'
  | 'sdkDesc'
  | 'launchFlowEditor'
  | 'libraryEyebrow'
  | 'libraryTitle'
  | 'libraryDesc'
  | 'liveDetails'
  | 'moduleActive'
  | 'setupSimulation'
  | 'consoleTitle'
  | 'consoleDesc'
  | 'metricsActive'
  | 'consoleName'
  | 'streamingChecks'
  | 'toggleRegion'
  | 'resetForm'
  | 'formTitle'
  | 'formDesc'
  | 'firstName'
  | 'lastName'
  | 'workEmail'
  | 'companyWebsite'
  | 'companyName'
  | 'jobTitle'
  | 'targetRegion'
  | 'viewDemoConsole'
  | 'requiredAlert'
  | 'successTitle'
  | 'successDescBeforeName'
  | 'successNameSuffix'
  | 'successDescAfterName'
  | 'summaryCompany'
  | 'summaryRegion'
  | 'summaryStatus'
  | 'statusPrefix'
  | 'openSandbox'
  | 'submitAnother'
  | 'exploreTitle'
  | 'readyTitle'
  | 'readyDesc'
  | 'tryItNow'
  | 'statusOptimal'
  | 'statusStable'
  | 'defaultTime';

type Scenario = {
  tab: string;
  title: string;
  badge: string;
  requirements: string[];
  description: string;
  riskLevel: string;
  autoPassRate: string;
};

type GridItem = {
  title: string;
  description: string;
  detail: string;
  icon: 'database' | 'network' | 'clipboard' | 'shield' | 'userCheck' | 'radio' | 'landmark' | 'shieldCheck' | 'shoppingBag';
  color: string;
};

type RegionOption = {
  label: string;
  value: GlobalExpansionRegionKey;
};

type InfoSection = {
  eyebrow: GlobalExpansionTextKey;
  title: GlobalExpansionTextKey;
  desc: GlobalExpansionTextKey;
};

type ExploreCard = {
  eyebrow: string;
  title: string;
  cta: string;
  view: 'compliance-goal' | 'database-checks';
};

type Hub = {
  key: GlobalExpansionHubKey;
  city: string;
  tab: string;
  tz: string;
  latency: string;
  status: 'optimal' | 'stable';
};

type GlobalExpansionTranslations = Record<GlobalExpansionTextKey, string> & {
  hubs: Hub[];
  scenarios: Record<GlobalExpansionScenarioKey, Scenario>;
  gridItems: GridItem[];
  regions: RegionOption[];
  consoleLogs: Record<GlobalExpansionRegionKey, string[]>;
  trustedLogos: string[];
  infoSections: InfoSection[];
  exploreCards: ExploreCard[];
  placeholders: {
    firstName: string;
    lastName: string;
    email: string;
    website: string;
    company: string;
    jobTitle: string;
  };
};

export const GLOBAL_EXPANSION_TRANSLATIONS: Record<GlobalExpansionLanguage, GlobalExpansionTranslations> = {
  en: {
    backToPlatform: 'Back to platform',
    heroBadge: 'Global expansion',
    heroTitle: 'Verify internationally while building trust locally. Onboard and verify customers anywhere with cross-border KYB-KYC designed for local compliance.',
    heroDesc: 'Scale seamlessly across borders. Instantly evaluate business structures and consumer credentials against official country registries, and adapt verification gates dynamically with real-time risk profiles.',
    getDemo: 'Get a demo',
    exploreSandbox: 'Explore demo sandbox',
    hubMonitor: 'Global Hub Status Monitor',
    registryLatency: 'Registry latency',
    throughput: 'KYC-KYB throughput',
    online: '99.8% Online',
    trustedBy: "Trusted by startups & the world's largest companies",
    globalPipelineEyebrow: 'Global Identity Pipeline',
    globalPipelineTitle: 'Verify any individual or business',
    globalPipelineDesc: 'Choose from a robust verification library and adjust verification flows based on consumer preferences, fraud types, and global availability. Leverage immediate API pipelines connecting you to verified registries worldwide.',
    checklistLabel: 'Verification gate checklist',
    passRateLabel: 'Est. automatic pass rate',
    riskRatingLabel: 'Risk rating:',
    complianceEyebrow: 'Compliance Customization',
    complianceTitle: 'Adapt to regional regulations and user populations',
    complianceDesc: 'Tailor flows and translations for local populations. Build user risk profiles with automated screenings and reports, then automatically approve, deny, or escalate users for manual review based on local guidelines.',
    translationMappingTitle: 'Dynamic Translation Mapping',
    translationMappingDesc: 'Our system auto-detects user browser environments to serve translated capture portals in 45+ languages.',
    screeningBlueprintsTitle: 'Adaptive Screening Blueprints',
    screeningBlueprintsDesc: 'Configure conditional branches to trigger elevated KYC checks only when users cross specific regional transaction thresholds.',
    hubEyebrow: 'Unified Identity Hub',
    hubTitle: 'Consolidate all identity processes in one place',
    hubDesc: 'Manage and adjust all of your flows from a single place with a flexible automation engine. Make expanding to new populations easy with global coverage via a single integration.',
    sdkFootprint: 'Single SDK Footprint',
    deployOnce: 'Deploy Once, Expand Everywhere',
    sdkDesc: 'Access all verification, registry check, and fraud signals via a single JSON schema.',
    launchFlowEditor: 'Launch flow editor',
    libraryEyebrow: 'Modular Verification Library',
    libraryTitle: 'Everything you need for global onboarding',
    libraryDesc: 'Our comprehensive building blocks operate in concert to deliver compliant onboarding pipelines in seconds. Hover over any block to inspect active system operations.',
    liveDetails: 'Live details',
    moduleActive: 'Module active',
    setupSimulation: 'Instant Setup Simulation',
    consoleTitle: 'Personalized Onboarding Console',
    consoleDesc: 'Fill out the form, and watch our automated pipeline run corporate lookups and KYC database matches tailored directly to your chosen expansion hub.',
    metricsActive: 'Real-time compliance validation metrics active.',
    consoleName: 'REGISTRY_CONSOLE v2.1',
    streamingChecks: 'Streaming live checks...',
    toggleRegion: 'Toggle sandbox region to test regional rulesets:',
    resetForm: 'Reset and return to form',
    formTitle: 'Start your custom demo',
    formDesc: "Tell us a bit about yourself and we'll personalize the experience, no sales call required.",
    firstName: 'First name *',
    lastName: 'Last name',
    workEmail: 'Work email *',
    companyWebsite: 'Company website',
    companyName: 'Company name *',
    jobTitle: 'Job title',
    targetRegion: 'Target Expansion Region *',
    viewDemoConsole: 'View demo console',
    requiredAlert: 'Please fill out the required fields: First name, Email, and Company name.',
    successTitle: 'Custom Sandbox Running!',
    successDescBeforeName: 'Thank you,',
    successNameSuffix: '.',
    successDescAfterName: 'Your custom API pipeline is simulated on the left panel. Choose different target tabs to check regional compliance scenarios.',
    summaryCompany: 'Company:',
    summaryRegion: 'Target Region:',
    summaryStatus: 'Status ID:',
    statusPrefix: 'EXP-SIM-',
    openSandbox: 'Open interactive sandbox',
    submitAnother: 'Submit another inquiry',
    exploreTitle: "Explore more of Identra's identity platform",
    readyTitle: 'Ready to get started?',
    readyDesc: 'Get in touch or start exploring Identra today. Configure custom workflows to scale internationally with perfect ease.',
    tryItNow: 'Try it now',
    statusOptimal: 'optimal',
    statusStable: 'stable',
    defaultTime: '00:00:00',
    hubs: [
      { key: 'london', city: 'London', tab: 'London', tz: 'Europe/London', latency: '42ms', status: 'optimal' },
      { key: 'tokyo', city: 'Tokyo', tab: 'Tokyo', tz: 'Asia/Tokyo', latency: '98ms', status: 'optimal' },
      { key: 'newYork', city: 'New York', tab: 'New', tz: 'America/New_York', latency: '15ms', status: 'optimal' },
      { key: 'singapore', city: 'Singapore', tab: 'Singapore', tz: 'Asia/Singapore', latency: '112ms', status: 'stable' },
      { key: 'frankfurt', city: 'Frankfurt', tab: 'Frankfurt', tz: 'Europe/Berlin', latency: '35ms', status: 'optimal' }
    ],
    scenarios: {
      eu: { tab: 'European', title: 'European Union Expansion', badge: 'GDPR Compliant', requirements: ['VAT Verification', 'German Commercial Register Lookup', 'eIDAS-compliant Signatures'], description: 'Automatically route users through regional checks. Verify VAT details against VIES, check national registers, and satisfy strict European KYC/AML regulations with zero local overhead.', riskLevel: 'Low-to-Mid Risk', autoPassRate: '94.2%' },
      latam: { tab: 'Latin', title: 'Latin America Localization', badge: 'Local Databases', requirements: ['CPF Validation (Brazil)', 'CURP Validation (Mexico)', 'Device Fingerprinting'], description: 'Maximize conversions in emerging markets with ultra-fast mobile document scans. Authenticate identity variables instantly through country-specific governmental sources.', riskLevel: 'High Fraud Density', autoPassRate: '88.6%' },
      apac: { tab: 'APAC', title: 'APAC Market Compliance', badge: 'Multilingual KYC', requirements: ['My Number Card (Japan)', 'Singpass Authentication (Singapore)', 'Sanctions Screening'], description: 'Onboard clients instantly by verifying native-script ID characters. Seamlessly handle Japanese, Chinese, and Korean alphabets via AI-driven translation tables.', riskLevel: 'Regulated Financials', autoPassRate: '91.7%' },
      na: { tab: 'North', title: 'North American Operations', badge: 'Instant KYC-KYB', requirements: ['SSN/TIN Verification', 'FINTRAC AML Rules', 'Holographic Document Review'], description: 'Ensure total regulatory compliance in the USA and Canada. Seamlessly screen prospective employees and businesses against comprehensive national risk lists.', riskLevel: 'Low-to-High Risk', autoPassRate: '96.8%' }
    },
    gridItems: [
      { title: 'Database checks', description: 'Verify collected and extracted PII against authoritative databases and issuing sources across 40+ countries.', detail: 'Instantly cross-reference full names, dates of birth, and national identifiers against direct government and utility source lines.', icon: 'database', color: 'text-indigo-500 bg-indigo-50' },
      { title: 'Global business registry verification', description: "Verify business names, registry numbers, and addresses against 100+ countries' registries.", detail: 'Direct programmatic API links to national registers, company houses, and tax departments globally with active parent-subsidiary resolution.', icon: 'network', color: 'text-sky-500 bg-sky-50' },
      { title: 'Document AI', description: 'Collect and extract documents, like articles of incorporation or bank statements, from more than 90 supported countries.', detail: 'Leverage deep OCR to read native alphabets, validate watermarks, identify document boundaries, and check security hologram consistency.', icon: 'clipboard', color: 'text-emerald-500 bg-emerald-50' },
      { title: 'Watchlist screening', description: 'Screen against 100+ global warning and sanctions lists to meet KYC requirements.', detail: 'Continuous background monitoring against PEP, OFAC, HM Treasury, UN sanctions, and local law enforcement suspect bulletins.', icon: 'shield', color: 'text-rose-500 bg-rose-50' },
      { title: 'Government ID verification', description: 'Collect and verify your choice of government-issued IDs to identify users across 200+ countries and territories.', detail: 'Dynamic web/mobile interfaces that adjust languages and accepted cards based on local user IP, driving maximum conversions.', icon: 'userCheck', color: 'text-violet-500 bg-violet-50' },
      { title: 'NFC verification', description: 'Verify passports and IDs globally via NFC chips and increase conversion with user-friendly, country-specific guidance.', detail: 'Bypasses visual spoofing by fetching raw cryptographic biometric files and digital signatures directly from the passport chip.', icon: 'radio', color: 'text-teal-500 bg-teal-50' },
      { title: 'VAT verification', description: 'Verify the VAT number of any EU country and avoid downtime with automated retry logic.', detail: 'Saves hours of manual tax validation by verifying registrations with VIES databases instantly at checkout or company sign-up.', icon: 'landmark', color: 'text-amber-500 bg-amber-50' },
      { title: 'FINTRAC solutions', description: 'Comply with Canadian AML requirements via a robust library of verifications and reports for KYC and KYB.', detail: 'Pre-packaged reporting layouts, record-retention schedules, and continuous compliance checklists configured for Canada.', icon: 'shieldCheck', color: 'text-blue-500 bg-blue-50' },
      { title: 'DACH solution', description: 'Meet reporting deadlines in the EU with a pre-built solution designed for e-commerce businesses.', detail: 'Tailored automation blueprints for Germany, Austria, and Switzerland with secure consumer verification and local legal alignment.', icon: 'shoppingBag', color: 'text-pink-500 bg-pink-50' }
    ],
    regions: [
      { value: 'EU', label: 'Europe (VIES & Commercial Registries)' },
      { value: 'LATAM', label: 'Latin America (Receita Federal / CPF & CURP)' },
      { value: 'APAC', label: 'Asia-Pacific (My Number Card & Singpass)' },
      { value: 'NA', label: 'North America (FINTRAC & TIN database checks)' }
    ],
    consoleLogs: {
      EU: ['↻ INITIALIZING GLOBAL KYC-KYB PIPELINE [REGION: EUROPEAN UNION]', '▣ Localizing verification rules: Aligning with GDPR & AMLD5 requirements...', '⌕ Fetching commercial registry details for: "{company}"', '◉ query_VIES_database: Confirming VAT number registration status... [OK]', '◆ Screening full corporate tree against PEP, OFAC, and EU consolidated watchlists...', '◌ Initiating identity proofing: Triggering automated Document AI check...', '◇ OCR Analysis: Reading French national passport watermarks & signature fields...', '✦ Biometric Face Match: Selfie vs passport print comparison score: 99.4%', '✓ CONSOLE STATUS: COMPLIANT. Corporate verification token generated successfully!'],
      LATAM: ['↻ INITIALIZING GLOBAL KYC-KYB PIPELINE [REGION: LATIN AMERICA]', '▣ Localizing verification rules: Adjusting to local central bank protocols...', '⌕ Validating tax registers: Querying Brazilian Receita Federal (CPF) for owner details...', '◉ query_Mexican_CURP_database: Checking national records database... [MATCHED]', '◆ Scanning active Latin American politically exposed person (PEP) directories...', '◌ Performing device fingerprinting & IP velocity risk analysis...', '◇ NFC Authentication: Extracting cryptographic security tags from passport chip...', '✦ Biometric Face Match: Real-time user liveness comparison score: 98.1%', '✓ CONSOLE STATUS: COMPLIANT. Corporate verification token generated successfully!'],
      APAC: ['↻ INITIALIZING GLOBAL KYC-KYB PIPELINE [REGION: ASIA-PACIFIC]', '▣ Localizing verification rules: Adjusting to multi-language and Japanese My Number rules...', '⌕ Reading native Kanji scripts: Extracting company details from Japanese registry...', '◉ query_Singpass_authentication_node: Verifying Singapore identity vectors... [SUCCESS]', '◆ Running AML screenings across regional financial databases & Asian enforcement logs...', '◌ Analyzing OCR text layouts: Matching non-Latin characters directly to regional databases...', '✦ Biometric Face Match: Biometric similarity verification index: 97.6%', '✓ CONSOLE STATUS: COMPLIANT. Corporate verification token generated successfully!'],
      NA: ['↻ INITIALIZING GLOBAL KYC-KYB PIPELINE [REGION: NORTH AMERICA]', '▣ Localizing verification rules: Syncing USA Patriot Act & Canada FINTRAC checklists...', '⌕ Querying IRS TIN matching databases & Canadian business registries...', '◉ crosscheck_state_corporation_filings: Querying Delaware Division of Corporations...', '◆ Running immediate OFAC sanctions screenings and continuous monitoring locks...', '◌ Verifying physical ID card holographic properties via Document AI...', '✦ Biometric Face Match: Checking selfie liveness against spoofing engines... [CLEARED]', '✓ CONSOLE STATUS: COMPLIANT. Corporate verification token generated successfully!']
    },
    trustedLogos: ['GET YOUR GUIDE', 'remote', 'Ume'],
    infoSections: [
      { eyebrow: 'complianceEyebrow', title: 'complianceTitle', desc: 'complianceDesc' },
      { eyebrow: 'hubEyebrow', title: 'hubTitle', desc: 'hubDesc' }
    ],
    exploreCards: [
      { eyebrow: 'Compliance goal', title: 'Future-proof your compliance strategy.', cta: 'Explore compliance solutions', view: 'compliance-goal' },
      { eyebrow: 'Verification checks', title: 'Verify users globally with database checks.', cta: 'View database modules', view: 'database-checks' }
    ],
    placeholders: { firstName: 'Jane', lastName: 'Doe', email: 'jane@company.com', website: 'https://company.com', company: 'Acme Corp', jobTitle: 'VP of Growth' }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    heroBadge: 'Expansión global',
    heroTitle: 'Verifique internacionalmente mientras genera confianza local. Incorpore y verifique clientes en cualquier lugar con KYB-KYC transfronterizo diseñado para el cumplimiento local.',
    heroDesc: 'Escala sin fricción entre países. Evalúe al instante estructuras empresariales y credenciales de consumidores contra registros oficiales, y adapte las puertas de verificación con perfiles de riesgo en tiempo real.',
    getDemo: 'Solicitar una demo',
    exploreSandbox: 'Explorar sandbox de demo',
    hubMonitor: 'Monitor de estado de hubs globales',
    registryLatency: 'Latencia del registro',
    throughput: 'Rendimiento KYC-KYB',
    online: '99,8% en línea',
    trustedBy: 'Con la confianza de startups y de las empresas más grandes del mundo',
    globalPipelineEyebrow: 'Canal global de identidad',
    globalPipelineTitle: 'Verifique a cualquier identra o empresa',
    globalPipelineDesc: 'Elija una biblioteca robusta de verificaciones y ajuste los flujos según preferencias del usuario, tipos de fraude y disponibilidad global. Use canales API inmediatos que conectan con registros verificados en todo el mundo.',
    checklistLabel: 'Lista de verificación',
    passRateLabel: 'Tasa automática estimada',
    riskRatingLabel: 'Nivel de riesgo:',
    complianceEyebrow: 'Personalización de cumplimiento',
    complianceTitle: 'Adáptese a regulaciones regionales y poblaciones locales',
    complianceDesc: 'Adapte flujos y traducciones para poblaciones locales. Cree perfiles de riesgo con evaluaciones e informes automatizados, y apruebe, rechace o escale a revisión manual según directrices locales.',
    translationMappingTitle: 'Mapeo dinámico de traducciones',
    translationMappingDesc: 'Nuestro sistema detecta el navegador del usuario para servir portales de captura traducidos en más de 45 idiomas.',
    screeningBlueprintsTitle: 'Plantillas de evaluación adaptativa',
    screeningBlueprintsDesc: 'Configure ramas condicionales para activar verificaciones KYC reforzadas solo cuando se crucen umbrales regionales específicos.',
    hubEyebrow: 'Hub unificado de identidad',
    hubTitle: 'Consolide todos los procesos de identidad en un solo lugar',
    hubDesc: 'Gestione y ajuste todos sus flujos desde un solo lugar con un motor flexible de automatización. Expándase a nuevas poblaciones con cobertura global mediante una sola integración.',
    sdkFootprint: 'Huella única de SDK',
    deployOnce: 'Implemente una vez, expándase a todas partes',
    sdkDesc: 'Acceda a verificaciones, comprobaciones de registros y señales de fraude mediante un único esquema JSON.',
    launchFlowEditor: 'Abrir editor de flujos',
    libraryEyebrow: 'Biblioteca modular de verificación',
    libraryTitle: 'Todo lo necesario para onboarding global',
    libraryDesc: 'Nuestros bloques trabajan juntos para entregar canales de onboarding conformes en segundos. Pase el cursor por cualquier bloque para inspeccionar operaciones activas.',
    liveDetails: 'Detalles en vivo',
    moduleActive: 'Módulo activo',
    setupSimulation: 'Simulación de configuración instantánea',
    consoleTitle: 'Consola de onboarding personalizada',
    consoleDesc: 'Complete el formulario y vea cómo nuestro canal automatizado ejecuta búsquedas corporativas y coincidencias KYC adaptadas a su hub de expansión.',
    metricsActive: 'Métricas de validación de cumplimiento en tiempo real activas.',
    consoleName: 'REGISTRY_CONSOLE v2.1',
    streamingChecks: 'Transmitiendo verificaciones en vivo...',
    toggleRegion: 'Cambie la región del sandbox para probar reglas regionales:',
    resetForm: 'Restablecer y volver al formulario',
    formTitle: 'Inicie su demo personalizada',
    formDesc: 'Cuéntenos un poco sobre usted y personalizaremos la experiencia, sin llamada de ventas.',
    firstName: 'Nombre *',
    lastName: 'Apellido',
    workEmail: 'Correo laboral *',
    companyWebsite: 'Sitio web de la empresa',
    companyName: 'Nombre de la empresa *',
    jobTitle: 'Cargo',
    targetRegion: 'Región objetivo de expansión *',
    viewDemoConsole: 'Ver consola demo',
    requiredAlert: 'Complete los campos obligatorios: nombre, correo electrónico y nombre de empresa.',
    successTitle: 'Sandbox personalizado en ejecución',
    successDescBeforeName: 'Gracias,',
    successNameSuffix: '.',
    successDescAfterName: 'Su canal API personalizado se simula en el panel izquierdo. Elija otras pestañas para revisar escenarios regionales de cumplimiento.',
    summaryCompany: 'Empresa:',
    summaryRegion: 'Región objetivo:',
    summaryStatus: 'ID de estado:',
    statusPrefix: 'EXP-SIM-',
    openSandbox: 'Abrir sandbox interactivo',
    submitAnother: 'Enviar otra consulta',
    exploreTitle: 'Explore más de la plataforma de identidad de Identra',
    readyTitle: '¿Listo para comenzar?',
    readyDesc: 'Póngase en contacto o empiece a explorar Identra hoy. Configure flujos personalizados para escalar internacionalmente con facilidad.',
    tryItNow: 'Probar ahora',
    statusOptimal: 'óptimo',
    statusStable: 'estable',
    defaultTime: '00:00:00',
    hubs: [
      { key: 'london', city: 'Londres', tab: 'Londres', tz: 'Europe/London', latency: '42ms', status: 'optimal' },
      { key: 'tokyo', city: 'Tokio', tab: 'Tokio', tz: 'Asia/Tokyo', latency: '98ms', status: 'optimal' },
      { key: 'newYork', city: 'Nueva York', tab: 'Nueva', tz: 'America/New_York', latency: '15ms', status: 'optimal' },
      { key: 'singapore', city: 'Singapur', tab: 'Singapur', tz: 'Asia/Singapore', latency: '112ms', status: 'stable' },
      { key: 'frankfurt', city: 'Fráncfort', tab: 'Fráncfort', tz: 'Europe/Berlin', latency: '35ms', status: 'optimal' }
    ],
    scenarios: {
      eu: { tab: 'Europa', title: 'Expansión en la Unión Europea', badge: 'Cumple GDPR', requirements: ['Verificación de VAT', 'Consulta del registro mercantil alemán', 'Firmas compatibles con eIDAS'], description: 'Dirija usuarios automáticamente por verificaciones regionales. Verifique VAT contra VIES, consulte registros nacionales y cumpla reglas KYC/AML europeas sin sobrecarga local.', riskLevel: 'Riesgo bajo a medio', autoPassRate: '94,2%' },
      latam: { tab: 'LATAM', title: 'Localización en América Latina', badge: 'Bases locales', requirements: ['Validación CPF (Brasil)', 'Validación CURP (México)', 'Huella del dispositivo'], description: 'Maximice conversiones en mercados emergentes con escaneos móviles ultrarrápidos. Autentique variables de identidad al instante con fuentes gubernamentales locales.', riskLevel: 'Alta densidad de fraude', autoPassRate: '88,6%' },
      apac: { tab: 'APAC', title: 'Cumplimiento para APAC', badge: 'KYC multilingüe', requirements: ['My Number Card (Japón)', 'Autenticación Singpass (Singapur)', 'Sanciones'], description: 'Incorpore clientes al verificar caracteres de ID en escritura nativa. Maneje alfabetos japonés, chino y coreano con tablas de traducción impulsadas por IA.', riskLevel: 'Finanzas reguladas', autoPassRate: '91,7%' },
      na: { tab: 'Norteamérica', title: 'Operaciones en Norteamérica', badge: 'KYC-KYB instantáneo', requirements: ['Verificación SSN/TIN', 'Reglas AML FINTRAC', 'Revisión holográfica de documentos'], description: 'Asegure cumplimiento normativo en EE. UU. y Canadá. Evalúe empleados y empresas frente a listas nacionales completas de riesgo.', riskLevel: 'Riesgo bajo a alto', autoPassRate: '96,8%' }
    },
    gridItems: [],
    regions: [
      { value: 'EU', label: 'Europa (VIES y registros mercantiles)' },
      { value: 'LATAM', label: 'América Latina (Receita Federal / CPF y CURP)' },
      { value: 'APAC', label: 'Asia-Pacífico (My Number Card y Singpass)' },
      { value: 'NA', label: 'Norteamérica (FINTRAC y bases TIN)' }
    ],
    consoleLogs: {} as Record<GlobalExpansionRegionKey, string[]>,
    trustedLogos: ['GET YOUR GUIDE', 'remote', 'Ume'],
    infoSections: [
      { eyebrow: 'complianceEyebrow', title: 'complianceTitle', desc: 'complianceDesc' },
      { eyebrow: 'hubEyebrow', title: 'hubTitle', desc: 'hubDesc' }
    ],
    exploreCards: [
      { eyebrow: 'Objetivo de cumplimiento', title: 'Prepare su estrategia de cumplimiento para el futuro.', cta: 'Explorar soluciones de cumplimiento', view: 'compliance-goal' },
      { eyebrow: 'Comprobaciones de verificación', title: 'Verifique usuarios globalmente con bases de datos.', cta: 'Ver módulos de bases de datos', view: 'database-checks' }
    ],
    placeholders: { firstName: 'Ana', lastName: 'Pérez', email: 'ana@empresa.com', website: 'https://empresa.com', company: 'Acme Corp', jobTitle: 'VP de crecimiento' }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    heroBadge: 'グローバル展開',
    heroTitle: '各地域で信頼を築きながら、国際的に本人確認を。地域の規制に合わせた越境KYB-KYCで、どこでも顧客をオンボーディングして確認できます。',
    heroDesc: '国境を越えてスムーズに拡大できます。公式登録簿に照らして法人構造と顧客情報を即時評価し、リアルタイムのリスクプロファイルで確認ゲートを動的に調整します。',
    getDemo: 'デモを依頼',
    exploreSandbox: 'デモサンドボックスを試す',
    hubMonitor: 'グローバルハブ状態モニター',
    registryLatency: '登録簿レイテンシ',
    throughput: 'KYC-KYB処理能力',
    online: '99.8% オンライン',
    trustedBy: 'スタートアップから世界最大級の企業までが信頼',
    globalPipelineEyebrow: 'グローバル本人確認パイプライン',
    globalPipelineTitle: 'あらゆる個人と企業を確認',
    globalPipelineDesc: '強力な確認ライブラリから選び、ユーザーの希望、不正タイプ、グローバル可用性に基づいてフローを調整できます。世界中の検証済み登録簿につながるAPIパイプラインを活用できます。',
    checklistLabel: '確認ゲートのチェックリスト',
    passRateLabel: '自動通過率の推定',
    riskRatingLabel: 'リスク評価:',
    complianceEyebrow: 'コンプライアンスのカスタマイズ',
    complianceTitle: '地域規制と利用者層に適応',
    complianceDesc: '地域の利用者に合わせてフローと翻訳を調整します。自動スクリーニングとレポートでリスクプロファイルを作成し、地域ルールに基づいて承認、拒否、手動レビューへのエスカレーションを行います。',
    translationMappingTitle: '動的翻訳マッピング',
    translationMappingDesc: 'ユーザーのブラウザ環境を自動検出し、45以上の言語で翻訳済みの入力ポータルを表示します。',
    screeningBlueprintsTitle: '適応型スクリーニング設計',
    screeningBlueprintsDesc: '地域ごとの取引しきい値を超えた場合だけ、強化KYCを起動する条件分岐を設定できます。',
    hubEyebrow: '統合本人確認ハブ',
    hubTitle: 'すべての本人確認プロセスを一か所に統合',
    hubDesc: '柔軟な自動化エンジンで、すべてのフローを一か所から管理・調整できます。単一の統合でグローバルカバレッジを利用し、新しい市場への展開を容易にします。',
    sdkFootprint: '単一SDK構成',
    deployOnce: '一度導入して、どこへでも拡大',
    sdkDesc: 'すべての確認、登録簿チェック、不正シグナルに単一のJSONスキーマでアクセスできます。',
    launchFlowEditor: 'フローエディターを開く',
    libraryEyebrow: 'モジュール型確認ライブラリ',
    libraryTitle: 'グローバルオンボーディングに必要なすべて',
    libraryDesc: '包括的な構成要素が連携し、準拠したオンボーディングパイプラインを数秒で提供します。各ブロックにカーソルを合わせると稼働中の処理を確認できます。',
    liveDetails: 'ライブ詳細',
    moduleActive: 'モジュール稼働中',
    setupSimulation: '即時セットアップシミュレーション',
    consoleTitle: 'パーソナライズされたオンボーディングコンソール',
    consoleDesc: 'フォームを入力すると、選択した展開ハブに合わせて法人照会とKYCデータベース照合が自動実行されます。',
    metricsActive: 'リアルタイムのコンプライアンス検証指標が有効です。',
    consoleName: 'REGISTRY_CONSOLE v2.1',
    streamingChecks: 'ライブチェックを配信中...',
    toggleRegion: 'サンドボックス地域を切り替えて地域ルールをテスト:',
    resetForm: 'リセットしてフォームに戻る',
    formTitle: 'カスタムデモを開始',
    formDesc: '簡単な情報を入力すると、営業電話なしで体験をパーソナライズします。',
    firstName: '名 *',
    lastName: '姓',
    workEmail: '仕事用メール *',
    companyWebsite: '会社Webサイト',
    companyName: '会社名 *',
    jobTitle: '役職',
    targetRegion: '展開対象地域 *',
    viewDemoConsole: 'デモコンソールを見る',
    requiredAlert: '必須項目の名、メール、会社名を入力してください。',
    successTitle: 'カスタムサンドボックスを実行中',
    successDescBeforeName: 'ありがとうございます、',
    successNameSuffix: 'さん。',
    successDescAfterName: 'カスタムAPIパイプラインは左パネルでシミュレーションされています。別の地域タブを選んでコンプライアンスシナリオを確認してください。',
    summaryCompany: '会社:',
    summaryRegion: '対象地域:',
    summaryStatus: 'ステータスID:',
    statusPrefix: 'EXP-SIM-',
    openSandbox: 'インタラクティブサンドボックスを開く',
    submitAnother: '別の問い合わせを送信',
    exploreTitle: 'Identraの本人確認プラットフォームをさらに見る',
    readyTitle: '始める準備はできましたか？',
    readyDesc: 'お問い合わせいただくか、今すぐIdentraをお試しください。国際展開のためのカスタムワークフローを簡単に設定できます。',
    tryItNow: '今すぐ試す',
    statusOptimal: '最適',
    statusStable: '安定',
    defaultTime: '00:00:00',
    hubs: [
      { key: 'london', city: 'ロンドン', tab: 'ロンドン', tz: 'Europe/London', latency: '42ms', status: 'optimal' },
      { key: 'tokyo', city: '東京', tab: '東京', tz: 'Asia/Tokyo', latency: '98ms', status: 'optimal' },
      { key: 'newYork', city: 'ニューヨーク', tab: 'NY', tz: 'America/New_York', latency: '15ms', status: 'optimal' },
      { key: 'singapore', city: 'シンガポール', tab: 'シンガポール', tz: 'Asia/Singapore', latency: '112ms', status: 'stable' },
      { key: 'frankfurt', city: 'フランクフルト', tab: 'フランクフルト', tz: 'Europe/Berlin', latency: '35ms', status: 'optimal' }
    ],
    scenarios: {
      eu: { tab: '欧州', title: '欧州連合への展開', badge: 'GDPR準拠', requirements: ['VAT確認', 'ドイツ商業登記照会', 'eIDAS準拠署名'], description: '地域チェックへユーザーを自動振り分け。VIESでVATを確認し、各国登録簿を照会し、欧州の厳格なKYC/AML規制を現地運用なしで満たします。', riskLevel: '低〜中リスク', autoPassRate: '94.2%' },
      latam: { tab: 'LATAM', title: '中南米ローカライズ', badge: 'ローカルDB', requirements: ['CPF検証（ブラジル）', 'CURP検証（メキシコ）', 'デバイスフィンガープリント'], description: '高速なモバイル書類スキャンで新興市場の転換率を最大化。国別の政府情報源から本人確認変数を即時認証します。', riskLevel: '高い不正密度', autoPassRate: '88.6%' },
      apac: { tab: 'APAC', title: 'APAC市場コンプライアンス', badge: '多言語KYC', requirements: ['マイナンバーカード（日本）', 'Singpass認証（シンガポール）', '制裁スクリーニング'], description: 'ネイティブ文字のIDを確認して顧客を即時オンボーディング。AI翻訳テーブルで日本語、中国語、韓国語の文字体系を扱います。', riskLevel: '規制金融', autoPassRate: '91.7%' },
      na: { tab: '北米', title: '北米オペレーション', badge: '即時KYC-KYB', requirements: ['SSN/TIN確認', 'FINTRAC AMLルール', 'ホログラム書類レビュー'], description: '米国とカナダで規制準拠を確保。候補者や企業を包括的な国別リスクリストと照合します。', riskLevel: '低〜高リスク', autoPassRate: '96.8%' }
    },
    gridItems: [],
    regions: [
      { value: 'EU', label: '欧州（VIESと商業登記）' },
      { value: 'LATAM', label: '中南米（Receita Federal / CPF & CURP）' },
      { value: 'APAC', label: 'アジア太平洋（マイナンバーカードとSingpass）' },
      { value: 'NA', label: '北米（FINTRACとTINデータベース）' }
    ],
    consoleLogs: {} as Record<GlobalExpansionRegionKey, string[]>,
    trustedLogos: ['GET YOUR GUIDE', 'remote', 'Ume'],
    infoSections: [
      { eyebrow: 'complianceEyebrow', title: 'complianceTitle', desc: 'complianceDesc' },
      { eyebrow: 'hubEyebrow', title: 'hubTitle', desc: 'hubDesc' }
    ],
    exploreCards: [
      { eyebrow: 'コンプライアンス目標', title: '将来に備えたコンプライアンス戦略を。', cta: 'コンプライアンスソリューションを見る', view: 'compliance-goal' },
      { eyebrow: '確認チェック', title: 'データベースチェックで世界中のユーザーを確認。', cta: 'データベースモジュールを見る', view: 'database-checks' }
    ],
    placeholders: { firstName: '花子', lastName: '山田', email: 'hanako@company.com', website: 'https://company.com', company: 'Acme Corp', jobTitle: '成長担当VP' }
  },
  de: {
    backToPlatform: 'Zurück zur Plattform',
    heroBadge: 'Globale Expansion',
    heroTitle: 'International verifizieren und lokal Vertrauen aufbauen. Onboarden und verifizieren Sie Kunden überall mit grenzüberschreitendem KYB-KYC für lokale Compliance.',
    heroDesc: 'Skalieren Sie nahtlos über Grenzen hinweg. Bewerten Sie Unternehmensstrukturen und Kundendaten sofort gegen offizielle Register und passen Sie Verifizierungsschritte mit Echtzeit-Risikoprofilen dynamisch an.',
    getDemo: 'Demo anfordern',
    exploreSandbox: 'Demo-Sandbox erkunden',
    hubMonitor: 'Globaler Hub-Statusmonitor',
    registryLatency: 'Registerlatenz',
    throughput: 'KYC-KYB-Durchsatz',
    online: '99,8% online',
    trustedBy: 'Vertraut von Startups und den größten Unternehmen der Welt',
    globalPipelineEyebrow: 'Globale Identitätspipeline',
    globalPipelineTitle: 'Jede Person und jedes Unternehmen verifizieren',
    globalPipelineDesc: 'Wählen Sie aus einer robusten Verifizierungsbibliothek und passen Sie Flows nach Nutzerpräferenzen, Betrugsarten und globaler Verfügbarkeit an. Nutzen Sie direkte API-Pipelines zu verifizierten Registern weltweit.',
    checklistLabel: 'Checkliste für Verifizierungsschritte',
    passRateLabel: 'Geschätzte automatische Freigabe',
    riskRatingLabel: 'Risikobewertung:',
    complianceEyebrow: 'Compliance-Anpassung',
    complianceTitle: 'An regionale Vorschriften und Nutzergruppen anpassen',
    complianceDesc: 'Passen Sie Flows und Übersetzungen an lokale Nutzergruppen an. Erstellen Sie Risikoprofile mit automatisierten Screenings und Berichten und genehmigen, blockieren oder eskalieren Sie Nutzer anhand lokaler Vorgaben.',
    translationMappingTitle: 'Dynamische Übersetzungszuordnung',
    translationMappingDesc: 'Unser System erkennt Browserumgebungen automatisch und liefert übersetzte Erfassungsportale in mehr als 45 Sprachen aus.',
    screeningBlueprintsTitle: 'Adaptive Screening-Blueprints',
    screeningBlueprintsDesc: 'Konfigurieren Sie bedingte Verzweigungen, die erhöhte KYC-Prüfungen nur bei bestimmten regionalen Transaktionsschwellen auslösen.',
    hubEyebrow: 'Einheitlicher Identitäts-Hub',
    hubTitle: 'Alle Identitätsprozesse an einem Ort bündeln',
    hubDesc: 'Verwalten und justieren Sie alle Flows an einem Ort mit einer flexiblen Automatisierungsengine. Erschließen Sie neue Zielgruppen einfacher über globale Abdeckung mit nur einer Integration.',
    sdkFootprint: 'Ein SDK-Footprint',
    deployOnce: 'Einmal bereitstellen, überall expandieren',
    sdkDesc: 'Greifen Sie über ein einziges JSON-Schema auf Verifizierungen, Registerprüfungen und Betrugssignale zu.',
    launchFlowEditor: 'Flow-Editor öffnen',
    libraryEyebrow: 'Modulare Verifizierungsbibliothek',
    libraryTitle: 'Alles für globales Onboarding',
    libraryDesc: 'Unsere Bausteine arbeiten zusammen, um konforme Onboarding-Pipelines in Sekunden bereitzustellen. Bewegen Sie den Mauszeiger über einen Block, um aktive Systemoperationen zu sehen.',
    liveDetails: 'Live-Details',
    moduleActive: 'Modul aktiv',
    setupSimulation: 'Sofortige Setup-Simulation',
    consoleTitle: 'Personalisierte Onboarding-Konsole',
    consoleDesc: 'Füllen Sie das Formular aus und beobachten Sie, wie unsere automatisierte Pipeline Unternehmensabfragen und KYC-Datenbankabgleiche für Ihren Expansions-Hub ausführt.',
    metricsActive: 'Echtzeitmetriken zur Compliance-Validierung aktiv.',
    consoleName: 'REGISTRY_CONSOLE v2.1',
    streamingChecks: 'Live-Prüfungen werden gestreamt...',
    toggleRegion: 'Sandbox-Region umschalten, um regionale Regeln zu testen:',
    resetForm: 'Zurücksetzen und zum Formular zurückkehren',
    formTitle: 'Starten Sie Ihre individuelle Demo',
    formDesc: 'Erzählen Sie uns kurz von sich, und wir personalisieren das Erlebnis, ohne Vertriebsanruf.',
    firstName: 'Vorname *',
    lastName: 'Nachname',
    workEmail: 'Geschäftliche E-Mail *',
    companyWebsite: 'Unternehmenswebsite',
    companyName: 'Unternehmensname *',
    jobTitle: 'Position',
    targetRegion: 'Zielregion der Expansion *',
    viewDemoConsole: 'Demo-Konsole ansehen',
    requiredAlert: 'Bitte füllen Sie die Pflichtfelder aus: Vorname, E-Mail und Unternehmensname.',
    successTitle: 'Individuelle Sandbox läuft',
    successDescBeforeName: 'Vielen Dank,',
    successNameSuffix: '.',
    successDescAfterName: 'Ihre individuelle API-Pipeline wird im linken Bereich simuliert. Wählen Sie andere Ziel-Tabs, um regionale Compliance-Szenarien zu prüfen.',
    summaryCompany: 'Unternehmen:',
    summaryRegion: 'Zielregion:',
    summaryStatus: 'Status-ID:',
    statusPrefix: 'EXP-SIM-',
    openSandbox: 'Interaktive Sandbox öffnen',
    submitAnother: 'Weitere Anfrage senden',
    exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
    readyTitle: 'Bereit loszulegen?',
    readyDesc: 'Nehmen Sie Kontakt auf oder erkunden Sie Identra noch heute. Konfigurieren Sie individuelle Workflows, um international mühelos zu skalieren.',
    tryItNow: 'Jetzt ausprobieren',
    statusOptimal: 'optimal',
    statusStable: 'stabil',
    defaultTime: '00:00:00',
    hubs: [
      { key: 'london', city: 'London', tab: 'London', tz: 'Europe/London', latency: '42ms', status: 'optimal' },
      { key: 'tokyo', city: 'Tokio', tab: 'Tokio', tz: 'Asia/Tokyo', latency: '98ms', status: 'optimal' },
      { key: 'newYork', city: 'New York', tab: 'New', tz: 'America/New_York', latency: '15ms', status: 'optimal' },
      { key: 'singapore', city: 'Singapur', tab: 'Singapur', tz: 'Asia/Singapore', latency: '112ms', status: 'stable' },
      { key: 'frankfurt', city: 'Frankfurt', tab: 'Frankfurt', tz: 'Europe/Berlin', latency: '35ms', status: 'optimal' }
    ],
    scenarios: {
      eu: { tab: 'Europa', title: 'Expansion in der Europäischen Union', badge: 'GDPR-konform', requirements: ['VAT-Verifizierung', 'Abfrage des deutschen Handelsregisters', 'eIDAS-konforme Signaturen'], description: 'Leiten Sie Nutzer automatisch durch regionale Prüfungen. Verifizieren Sie VAT-Daten gegen VIES, prüfen Sie nationale Register und erfüllen Sie strenge europäische KYC/AML-Regeln ohne lokale Zusatzarbeit.', riskLevel: 'Niedriges bis mittleres Risiko', autoPassRate: '94,2%' },
      latam: { tab: 'LATAM', title: 'Lokalisierung in Lateinamerika', badge: 'Lokale Datenbanken', requirements: ['CPF-Validierung (Brasilien)', 'CURP-Validierung (Mexiko)', 'Gerätefingerabdruck'], description: 'Maximieren Sie Conversion in Wachstumsmärkten mit schnellen mobilen Dokumentenscans. Authentifizieren Sie Identitätsvariablen sofort über landesspezifische Regierungsquellen.', riskLevel: 'Hohe Betrugsdichte', autoPassRate: '88,6%' },
      apac: { tab: 'APAC', title: 'APAC-Marktkonformität', badge: 'Mehrsprachiges KYC', requirements: ['My Number Card (Japan)', 'Singpass-Authentifizierung (Singapur)', 'Sanktionsscreening'], description: 'Onboarden Sie Kunden sofort, indem Sie ID-Zeichen in nativer Schrift prüfen. Japanische, chinesische und koreanische Alphabete werden über KI-gestützte Übersetzungstabellen verarbeitet.', riskLevel: 'Regulierte Finanzbranche', autoPassRate: '91,7%' },
      na: { tab: 'Nordamerika', title: 'Nordamerikanische Abläufe', badge: 'Sofortiges KYC-KYB', requirements: ['SSN/TIN-Verifizierung', 'FINTRAC AML-Regeln', 'Holografische Dokumentenprüfung'], description: 'Sichern Sie vollständige regulatorische Compliance in den USA und Kanada. Prüfen Sie potenzielle Mitarbeiter und Unternehmen gegen umfassende nationale Risikolisten.', riskLevel: 'Niedriges bis hohes Risiko', autoPassRate: '96,8%' }
    },
    gridItems: [],
    regions: [
      { value: 'EU', label: 'Europa (VIES & Handelsregister)' },
      { value: 'LATAM', label: 'Lateinamerika (Receita Federal / CPF & CURP)' },
      { value: 'APAC', label: 'Asien-Pazifik (My Number Card & Singpass)' },
      { value: 'NA', label: 'Nordamerika (FINTRAC & TIN-Datenbanken)' }
    ],
    consoleLogs: {} as Record<GlobalExpansionRegionKey, string[]>,
    trustedLogos: ['GET YOUR GUIDE', 'remote', 'Ume'],
    infoSections: [
      { eyebrow: 'complianceEyebrow', title: 'complianceTitle', desc: 'complianceDesc' },
      { eyebrow: 'hubEyebrow', title: 'hubTitle', desc: 'hubDesc' }
    ],
    exploreCards: [
      { eyebrow: 'Compliance-Ziel', title: 'Machen Sie Ihre Compliance-Strategie zukunftssicher.', cta: 'Compliance-Lösungen erkunden', view: 'compliance-goal' },
      { eyebrow: 'Verifizierungsprüfungen', title: 'Verifizieren Sie Nutzer weltweit mit Datenbankprüfungen.', cta: 'Datenbankmodule ansehen', view: 'database-checks' }
    ],
    placeholders: { firstName: 'Julia', lastName: 'Müller', email: 'julia@firma.de', website: 'https://firma.de', company: 'Acme GmbH', jobTitle: 'VP Wachstum' }
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    heroBadge: 'Mở rộng toàn cầu',
    heroTitle: 'Xác minh quốc tế trong khi xây dựng niềm tin tại địa phương. Đăng ký và xác minh khách hàng ở mọi nơi với KYB-KYC xuyên biên giới được thiết kế cho tuân thủ địa phương.',
    heroDesc: 'Mở rộng liền mạch qua biên giới. Đánh giá ngay cấu trúc doanh nghiệp và thông tin người dùng với sổ đăng ký chính thức của từng quốc gia, đồng thời điều chỉnh cổng xác minh động theo hồ sơ rủi ro thời gian thực.',
    getDemo: 'Yêu cầu demo',
    exploreSandbox: 'Khám phá sandbox demo',
    hubMonitor: 'Bảng theo dõi trạng thái hub toàn cầu',
    registryLatency: 'Độ trễ sổ đăng ký',
    throughput: 'Thông lượng KYC-KYB',
    online: '99,8% trực tuyến',
    trustedBy: 'Được các startup và những công ty lớn nhất thế giới tin dùng',
    globalPipelineEyebrow: 'Quy trình danh tính toàn cầu',
    globalPipelineTitle: 'Xác minh mọi cá nhân hoặc doanh nghiệp',
    globalPipelineDesc: 'Chọn từ thư viện xác minh mạnh mẽ và điều chỉnh luồng theo sở thích người dùng, loại gian lận và mức độ sẵn có toàn cầu. Tận dụng các API kết nối tức thì đến sổ đăng ký đã xác thực trên toàn thế giới.',
    checklistLabel: 'Danh sách kiểm tra cổng xác minh',
    passRateLabel: 'Tỷ lệ tự động đạt ước tính',
    riskRatingLabel: 'Xếp hạng rủi ro:',
    complianceEyebrow: 'Tùy chỉnh tuân thủ',
    complianceTitle: 'Thích ứng với quy định khu vực và nhóm người dùng',
    complianceDesc: 'Điều chỉnh luồng và bản dịch cho từng nhóm địa phương. Xây dựng hồ sơ rủi ro bằng sàng lọc và báo cáo tự động, rồi tự động duyệt, từ chối hoặc chuyển xem xét thủ công theo hướng dẫn địa phương.',
    translationMappingTitle: 'Ánh xạ bản dịch động',
    translationMappingDesc: 'Hệ thống tự phát hiện môi trường trình duyệt của người dùng để cung cấp cổng thu thập đã dịch bằng hơn 45 ngôn ngữ.',
    screeningBlueprintsTitle: 'Bản thiết kế sàng lọc thích ứng',
    screeningBlueprintsDesc: 'Cấu hình nhánh điều kiện để chỉ kích hoạt kiểm tra KYC tăng cường khi người dùng vượt ngưỡng giao dịch khu vực cụ thể.',
    hubEyebrow: 'Hub danh tính hợp nhất',
    hubTitle: 'Hợp nhất mọi quy trình danh tính tại một nơi',
    hubDesc: 'Quản lý và điều chỉnh mọi luồng từ một nơi với công cụ tự động hóa linh hoạt. Mở rộng đến nhóm người dùng mới dễ dàng hơn nhờ độ phủ toàn cầu qua một tích hợp duy nhất.',
    sdkFootprint: 'Một dấu vết SDK duy nhất',
    deployOnce: 'Triển khai một lần, mở rộng mọi nơi',
    sdkDesc: 'Truy cập mọi tín hiệu xác minh, kiểm tra sổ đăng ký và gian lận qua một lược đồ JSON duy nhất.',
    launchFlowEditor: 'Mở trình chỉnh sửa luồng',
    libraryEyebrow: 'Thư viện xác minh mô-đun',
    libraryTitle: 'Mọi thứ bạn cần cho đăng ký toàn cầu',
    libraryDesc: 'Các khối toàn diện của chúng tôi phối hợp để tạo quy trình đăng ký tuân thủ trong vài giây. Di chuột lên từng khối để xem hoạt động hệ thống đang chạy.',
    liveDetails: 'Chi tiết trực tiếp',
    moduleActive: 'Mô-đun đang hoạt động',
    setupSimulation: 'Mô phỏng thiết lập tức thì',
    consoleTitle: 'Bảng điều khiển đăng ký cá nhân hóa',
    consoleDesc: 'Điền biểu mẫu và xem quy trình tự động chạy tra cứu doanh nghiệp cùng đối chiếu cơ sở dữ liệu KYC theo đúng hub mở rộng bạn chọn.',
    metricsActive: 'Chỉ số xác thực tuân thủ thời gian thực đang hoạt động.',
    consoleName: 'REGISTRY_CONSOLE v2.1',
    streamingChecks: 'Đang truyền kiểm tra trực tiếp...',
    toggleRegion: 'Chuyển vùng sandbox để kiểm thử bộ quy tắc khu vực:',
    resetForm: 'Đặt lại và quay lại biểu mẫu',
    formTitle: 'Bắt đầu demo tùy chỉnh',
    formDesc: 'Cho chúng tôi biết một chút về bạn và chúng tôi sẽ cá nhân hóa trải nghiệm, không cần cuộc gọi bán hàng.',
    firstName: 'Tên *',
    lastName: 'Họ',
    workEmail: 'Email công việc *',
    companyWebsite: 'Trang web công ty',
    companyName: 'Tên công ty *',
    jobTitle: 'Chức danh',
    targetRegion: 'Khu vực mở rộng mục tiêu *',
    viewDemoConsole: 'Xem bảng điều khiển demo',
    requiredAlert: 'Vui lòng điền các trường bắt buộc: Tên, Email và Tên công ty.',
    successTitle: 'Sandbox tùy chỉnh đang chạy',
    successDescBeforeName: 'Cảm ơn,',
    successNameSuffix: '.',
    successDescAfterName: 'Quy trình API tùy chỉnh của bạn đang được mô phỏng ở bảng bên trái. Chọn các tab mục tiêu khác để kiểm tra kịch bản tuân thủ khu vực.',
    summaryCompany: 'Công ty:',
    summaryRegion: 'Khu vực mục tiêu:',
    summaryStatus: 'ID trạng thái:',
    statusPrefix: 'EXP-SIM-',
    openSandbox: 'Mở sandbox tương tác',
    submitAnother: 'Gửi yêu cầu khác',
    exploreTitle: 'Khám phá thêm nền tảng danh tính của Identra',
    readyTitle: 'Sẵn sàng bắt đầu?',
    readyDesc: 'Liên hệ hoặc bắt đầu khám phá Identra ngay hôm nay. Cấu hình quy trình tùy chỉnh để mở rộng quốc tế thật dễ dàng.',
    tryItNow: 'Thử ngay',
    statusOptimal: 'tối ưu',
    statusStable: 'ổn định',
    defaultTime: '00:00:00',
    hubs: [
      { key: 'london', city: 'London', tab: 'London', tz: 'Europe/London', latency: '42ms', status: 'optimal' },
      { key: 'tokyo', city: 'Tokyo', tab: 'Tokyo', tz: 'Asia/Tokyo', latency: '98ms', status: 'optimal' },
      { key: 'newYork', city: 'New York', tab: 'New', tz: 'America/New_York', latency: '15ms', status: 'optimal' },
      { key: 'singapore', city: 'Singapore', tab: 'Singapore', tz: 'Asia/Singapore', latency: '112ms', status: 'stable' },
      { key: 'frankfurt', city: 'Frankfurt', tab: 'Frankfurt', tz: 'Europe/Berlin', latency: '35ms', status: 'optimal' }
    ],
    scenarios: {
      eu: { tab: 'Châu Âu', title: 'Mở rộng tại Liên minh châu Âu', badge: 'Tuân thủ GDPR', requirements: ['Xác minh VAT', 'Tra cứu sổ đăng ký thương mại Đức', 'Chữ ký tuân thủ eIDAS'], description: 'Tự động định tuyến người dùng qua các kiểm tra khu vực. Xác minh VAT với VIES, kiểm tra sổ đăng ký quốc gia và đáp ứng quy định KYC/AML nghiêm ngặt của châu Âu mà không cần vận hành địa phương.', riskLevel: 'Rủi ro thấp đến trung bình', autoPassRate: '94,2%' },
      latam: { tab: 'LATAM', title: 'Bản địa hóa Mỹ Latinh', badge: 'Cơ sở dữ liệu địa phương', requirements: ['Xác thực CPF (Brazil)', 'Xác thực CURP (Mexico)', 'Dấu vân tay thiết bị'], description: 'Tối đa hóa chuyển đổi ở thị trường mới nổi bằng quét tài liệu di động siêu nhanh. Xác thực biến danh tính tức thì qua nguồn chính phủ theo từng quốc gia.', riskLevel: 'Mật độ gian lận cao', autoPassRate: '88,6%' },
      apac: { tab: 'APAC', title: 'Tuân thủ thị trường APAC', badge: 'KYC đa ngôn ngữ', requirements: ['My Number Card (Nhật Bản)', 'Xác thực Singpass (Singapore)', 'Sàng lọc trừng phạt'], description: 'Đăng ký khách hàng tức thì bằng cách xác minh ký tự ID bản địa. Xử lý mượt mà bảng chữ cái Nhật, Trung và Hàn bằng bảng dịch hỗ trợ AI.', riskLevel: 'Tài chính được quản lý', autoPassRate: '91,7%' },
      na: { tab: 'Bắc Mỹ', title: 'Vận hành Bắc Mỹ', badge: 'KYC-KYB tức thì', requirements: ['Xác minh SSN/TIN', 'Quy tắc AML FINTRAC', 'Xem xét hologram tài liệu'], description: 'Đảm bảo tuân thủ toàn diện tại Hoa Kỳ và Canada. Sàng lọc nhân viên tiềm năng và doanh nghiệp với danh sách rủi ro quốc gia đầy đủ.', riskLevel: 'Rủi ro thấp đến cao', autoPassRate: '96,8%' }
    },
    gridItems: [],
    regions: [
      { value: 'EU', label: 'Châu Âu (VIES & sổ đăng ký thương mại)' },
      { value: 'LATAM', label: 'Mỹ Latinh (Receita Federal / CPF & CURP)' },
      { value: 'APAC', label: 'Châu Á - Thái Bình Dương (My Number Card & Singpass)' },
      { value: 'NA', label: 'Bắc Mỹ (FINTRAC & cơ sở dữ liệu TIN)' }
    ],
    consoleLogs: {} as Record<GlobalExpansionRegionKey, string[]>,
    trustedLogos: ['GET YOUR GUIDE', 'remote', 'Ume'],
    infoSections: [
      { eyebrow: 'complianceEyebrow', title: 'complianceTitle', desc: 'complianceDesc' },
      { eyebrow: 'hubEyebrow', title: 'hubTitle', desc: 'hubDesc' }
    ],
    exploreCards: [
      { eyebrow: 'Mục tiêu tuân thủ', title: 'Chuẩn bị chiến lược tuân thủ cho tương lai.', cta: 'Khám phá giải pháp tuân thủ', view: 'compliance-goal' },
      { eyebrow: 'Kiểm tra xác minh', title: 'Xác minh người dùng toàn cầu bằng kiểm tra cơ sở dữ liệu.', cta: 'Xem mô-đun cơ sở dữ liệu', view: 'database-checks' }
    ],
    placeholders: { firstName: 'An', lastName: 'Nguyễn', email: 'an@congty.com', website: 'https://congty.com', company: 'Acme Corp', jobTitle: 'Phó chủ tịch Tăng trưởng' }
  }
};

GLOBAL_EXPANSION_TRANSLATIONS.es.gridItems = [
  { title: 'Comprobaciones de bases de datos', description: 'Verifique PII recopilada y extraída contra bases autorizadas y fuentes emisoras en más de 40 países.', detail: 'Cruce nombres completos, fechas de nacimiento e identificadores nacionales contra fuentes gubernamentales y servicios públicos.', icon: 'database', color: 'text-indigo-500 bg-indigo-50' },
  { title: 'Verificación de registros empresariales globales', description: 'Verifique nombres de empresas, números registrales y direcciones contra registros de más de 100 países.', detail: 'Enlaces API directos a registros nacionales, cámaras mercantiles y departamentos fiscales con resolución matriz-filial.', icon: 'network', color: 'text-sky-500 bg-sky-50' },
  { title: 'Document AI', description: 'Recoja y extraiga documentos, como actas de constitución o estados bancarios, de más de 90 países admitidos.', detail: 'Use OCR avanzado para leer alfabetos nativos, validar marcas de agua, detectar límites y revisar hologramas.', icon: 'clipboard', color: 'text-emerald-500 bg-emerald-50' },
  { title: 'Evaluación de listas de vigilancia', description: 'Evalúe contra más de 100 listas globales de alertas y sanciones para cumplir requisitos KYC.', detail: 'Monitoreo continuo contra PEP, OFAC, HM Treasury, sanciones ONU y boletines locales de fuerzas de seguridad.', icon: 'shield', color: 'text-rose-500 bg-rose-50' },
  { title: 'Verificación de identificación oficial', description: 'Recoja y verifique identificaciones oficiales para reconocer usuarios en más de 200 países y territorios.', detail: 'Interfaces web y móviles que ajustan idioma y documentos aceptados según la IP local para maximizar conversiones.', icon: 'userCheck', color: 'text-violet-500 bg-violet-50' },
  { title: 'Verificación NFC', description: 'Verifique pasaportes e identificaciones globalmente mediante chips NFC con guía específica por país.', detail: 'Evita falsificaciones visuales al leer archivos biométricos cifrados y firmas digitales desde el chip del pasaporte.', icon: 'radio', color: 'text-teal-500 bg-teal-50' },
  { title: 'Verificación de VAT', description: 'Verifique el número VAT de cualquier país de la UE y evite interrupciones con reintentos automáticos.', detail: 'Reduce validación fiscal manual al confirmar registros con bases VIES en checkout o alta de empresas.', icon: 'landmark', color: 'text-amber-500 bg-amber-50' },
  { title: 'Soluciones FINTRAC', description: 'Cumpla requisitos AML canadienses con una biblioteca robusta de verificaciones e informes para KYC y KYB.', detail: 'Diseños de informes, calendarios de retención y listas de cumplimiento configuradas para Canadá.', icon: 'shieldCheck', color: 'text-blue-500 bg-blue-50' },
  { title: 'Solución DACH', description: 'Cumpla plazos de reporte en la UE con una solución preconfigurada para comercios electrónicos.', detail: 'Automatización adaptada para Alemania, Austria y Suiza con verificación segura y alineación legal local.', icon: 'shoppingBag', color: 'text-pink-500 bg-pink-50' }
];

GLOBAL_EXPANSION_TRANSLATIONS.ja.gridItems = [
  { title: 'データベース照合', description: '収集・抽出したPIIを、40以上の国の権威あるデータベースや発行元情報と照合します。', detail: '氏名、生年月日、国民識別子を政府機関や公共サービスの情報源と即時照合します。', icon: 'database', color: 'text-indigo-500 bg-indigo-50' },
  { title: 'グローバル法人登録確認', description: '100以上の国の登録簿に対して、法人名、登録番号、住所を確認します。', detail: '各国登録簿、会社登記機関、税務機関へAPIで直接接続し、親会社と子会社の関係も解決します。', icon: 'network', color: 'text-sky-500 bg-sky-50' },
  { title: 'Document AI', description: '定款や銀行明細などの書類を、90以上の対応国から収集・抽出します。', detail: '高度なOCRでネイティブ文字を読み取り、透かし、書類境界、セキュリティホログラムを確認します。', icon: 'clipboard', color: 'text-emerald-500 bg-emerald-50' },
  { title: 'ウォッチリスト審査', description: 'KYC要件を満たすため、100以上のグローバル警告・制裁リストで審査します。', detail: 'PEP、OFAC、HM Treasury、国連制裁、地域の捜査機関リストを継続監視します。', icon: 'shield', color: 'text-rose-500 bg-rose-50' },
  { title: '公的身分証確認', description: '200以上の国と地域の公的身分証を収集・確認してユーザーを識別します。', detail: 'ユーザーのIPに基づいて言語と受け付けるカードを調整し、コンバージョンを高めます。', icon: 'userCheck', color: 'text-violet-500 bg-violet-50' },
  { title: 'NFC確認', description: 'NFCチップを使って世界中のパスポートとIDを確認し、国別ガイドで完了率を高めます。', detail: 'パスポートチップから暗号化された生体情報と電子署名を直接取得し、視覚的な偽装を回避します。', icon: 'radio', color: 'text-teal-500 bg-teal-50' },
  { title: 'VAT確認', description: 'EU各国のVAT番号を確認し、自動再試行で停止時間を抑えます。', detail: 'VIESデータベースで登録情報を即時確認し、税務確認の手作業を減らします。', icon: 'landmark', color: 'text-amber-500 bg-amber-50' },
  { title: 'FINTRACソリューション', description: 'KYCとKYB向けの確認・レポートライブラリでカナダAML要件に対応します。', detail: 'カナダ向けに構成されたレポート形式、記録保持スケジュール、継続チェックリストを提供します。', icon: 'shieldCheck', color: 'text-blue-500 bg-blue-50' },
  { title: 'DACHソリューション', description: 'EC事業向けの事前構築ソリューションでEUの報告期限に対応します。', detail: 'ドイツ、オーストリア、スイス向けに、地域法に沿った安全な顧客確認を自動化します。', icon: 'shoppingBag', color: 'text-pink-500 bg-pink-50' }
];

GLOBAL_EXPANSION_TRANSLATIONS.de.gridItems = [
  { title: 'Datenbankprüfungen', description: 'Prüfen Sie erfasste und extrahierte PII gegen autoritative Datenbanken und Ausstellerquellen in über 40 Ländern.', detail: 'Gleichen Sie vollständige Namen, Geburtsdaten und nationale Kennungen sofort mit Regierungs- und Versorgungsquellen ab.', icon: 'database', color: 'text-indigo-500 bg-indigo-50' },
  { title: 'Globale Unternehmensregisterprüfung', description: 'Prüfen Sie Unternehmensnamen, Registernummern und Adressen gegen Register in über 100 Ländern.', detail: 'Direkte API-Verbindungen zu nationalen Registern, Handelsregistern und Steuerbehörden mit Mutter-Tochter-Auflösung.', icon: 'network', color: 'text-sky-500 bg-sky-50' },
  { title: 'Document AI', description: 'Erfassen und extrahieren Sie Dokumente wie Gründungsurkunden oder Kontoauszüge aus über 90 unterstützten Ländern.', detail: 'Nutzen Sie tiefes OCR zum Lesen lokaler Alphabete, Validieren von Wasserzeichen und Prüfen von Sicherheitshologrammen.', icon: 'clipboard', color: 'text-emerald-500 bg-emerald-50' },
  { title: 'Watchlist-Screening', description: 'Prüfen Sie gegen über 100 globale Warn- und Sanktionslisten, um KYC-Anforderungen zu erfüllen.', detail: 'Kontinuierliche Überwachung gegen PEP, OFAC, HM Treasury, UN-Sanktionen und lokale Fahndungslisten.', icon: 'shield', color: 'text-rose-500 bg-rose-50' },
  { title: 'Amtliche Ausweisprüfung', description: 'Erfassen und prüfen Sie amtliche Ausweise, um Nutzer in über 200 Ländern und Regionen zu identifizieren.', detail: 'Web- und Mobiloberflächen passen Sprache und akzeptierte Dokumente anhand der lokalen IP an.', icon: 'userCheck', color: 'text-violet-500 bg-violet-50' },
  { title: 'NFC-Verifizierung', description: 'Prüfen Sie Reisepässe und IDs weltweit über NFC-Chips mit nutzerfreundlicher, länderspezifischer Anleitung.', detail: 'Umgeht visuelle Fälschungen durch direktes Auslesen kryptografischer Biometriedaten und digitaler Signaturen.', icon: 'radio', color: 'text-teal-500 bg-teal-50' },
  { title: 'VAT-Verifizierung', description: 'Prüfen Sie VAT-Nummern aller EU-Länder und vermeiden Sie Ausfälle durch automatische Wiederholungen.', detail: 'Spart manuelle Steuerprüfung, indem Registrierungen sofort mit VIES-Datenbanken bestätigt werden.', icon: 'landmark', color: 'text-amber-500 bg-amber-50' },
  { title: 'FINTRAC-Lösungen', description: 'Erfüllen Sie kanadische AML-Anforderungen mit Prüfungen und Berichten für KYC und KYB.', detail: 'Vorkonfigurierte Berichtslayouts, Aufbewahrungsfristen und laufende Compliance-Checklisten für Kanada.', icon: 'shieldCheck', color: 'text-blue-500 bg-blue-50' },
  { title: 'DACH-Lösung', description: 'Erfüllen Sie EU-Meldefristen mit einer vorkonfigurierten Lösung für E-Commerce-Unternehmen.', detail: 'Automatisierungspläne für Deutschland, Österreich und die Schweiz mit lokaler rechtlicher Ausrichtung.', icon: 'shoppingBag', color: 'text-pink-500 bg-pink-50' }
];

GLOBAL_EXPANSION_TRANSLATIONS.vi.gridItems = [
  { title: 'Kiểm tra cơ sở dữ liệu', description: 'Xác minh PII đã thu thập và trích xuất với cơ sở dữ liệu có thẩm quyền và nguồn phát hành tại hơn 40 quốc gia.', detail: 'Đối chiếu tức thì họ tên, ngày sinh và mã định danh quốc gia với nguồn chính phủ và tiện ích trực tiếp.', icon: 'database', color: 'text-indigo-500 bg-indigo-50' },
  { title: 'Xác minh sổ đăng ký doanh nghiệp toàn cầu', description: 'Xác minh tên doanh nghiệp, số đăng ký và địa chỉ với sổ đăng ký tại hơn 100 quốc gia.', detail: 'Kết nối API trực tiếp đến sổ đăng ký quốc gia, cơ quan đăng ký công ty và cơ quan thuế, kèm phân giải quan hệ mẹ-con.', icon: 'network', color: 'text-sky-500 bg-sky-50' },
  { title: 'Document AI', description: 'Thu thập và trích xuất tài liệu như điều lệ thành lập hoặc sao kê ngân hàng từ hơn 90 quốc gia được hỗ trợ.', detail: 'Dùng OCR chuyên sâu để đọc chữ bản địa, xác thực hình mờ, nhận diện ranh giới tài liệu và kiểm tra hologram bảo mật.', icon: 'clipboard', color: 'text-emerald-500 bg-emerald-50' },
  { title: 'Sàng lọc danh sách theo dõi', description: 'Sàng lọc với hơn 100 danh sách cảnh báo và trừng phạt toàn cầu để đáp ứng yêu cầu KYC.', detail: 'Giám sát liên tục với PEP, OFAC, HM Treasury, trừng phạt Liên Hợp Quốc và cảnh báo thực thi pháp luật địa phương.', icon: 'shield', color: 'text-rose-500 bg-rose-50' },
  { title: 'Xác minh giấy tờ tùy thân', description: 'Thu thập và xác minh giấy tờ do chính phủ cấp để nhận diện người dùng tại hơn 200 quốc gia và vùng lãnh thổ.', detail: 'Giao diện web/di động tự điều chỉnh ngôn ngữ và giấy tờ được chấp nhận theo IP địa phương để tăng chuyển đổi.', icon: 'userCheck', color: 'text-violet-500 bg-violet-50' },
  { title: 'Xác minh NFC', description: 'Xác minh hộ chiếu và ID toàn cầu qua chip NFC với hướng dẫn thân thiện theo từng quốc gia.', detail: 'Vượt qua giả mạo hình ảnh bằng cách lấy trực tiếp tệp sinh trắc học mã hóa và chữ ký số từ chip hộ chiếu.', icon: 'radio', color: 'text-teal-500 bg-teal-50' },
  { title: 'Xác minh VAT', description: 'Xác minh số VAT của mọi quốc gia EU và tránh gián đoạn bằng logic thử lại tự động.', detail: 'Tiết kiệm thời gian xác thực thuế thủ công bằng cách xác nhận đăng ký qua cơ sở dữ liệu VIES tức thì.', icon: 'landmark', color: 'text-amber-500 bg-amber-50' },
  { title: 'Giải pháp FINTRAC', description: 'Tuân thủ yêu cầu AML của Canada bằng thư viện xác minh và báo cáo mạnh mẽ cho KYC và KYB.', detail: 'Mẫu báo cáo, lịch lưu giữ hồ sơ và danh sách kiểm tra tuân thủ liên tục được cấu hình cho Canada.', icon: 'shieldCheck', color: 'text-blue-500 bg-blue-50' },
  { title: 'Giải pháp DACH', description: 'Đáp ứng thời hạn báo cáo tại EU bằng giải pháp dựng sẵn cho doanh nghiệp thương mại điện tử.', detail: 'Bản thiết kế tự động hóa cho Đức, Áo và Thụy Sĩ, bảo đảm xác minh người dùng an toàn theo luật địa phương.', icon: 'shoppingBag', color: 'text-pink-500 bg-pink-50' }
];

GLOBAL_EXPANSION_TRANSLATIONS.es.consoleLogs = {
  EU: ['↻ INICIANDO CANAL GLOBAL KYC-KYB [REGIÓN: UNIÓN EUROPEA]', '▣ Localizando reglas de verificación: alineación con GDPR y AMLD5...', '⌕ Obteniendo datos del registro mercantil para: "{company}"', '◉ query_VIES_database: confirmando estado de registro VAT... [OK]', '◆ Evaluando árbol corporativo completo contra PEP, OFAC y listas consolidadas de la UE...', '◌ Iniciando prueba de identidad: activando comprobación Document AI...', '◇ Análisis OCR: leyendo marcas de agua y firmas de pasaporte francés...', '✦ Coincidencia biométrica: selfie frente a pasaporte, puntuación 99,4%', '✓ ESTADO DE CONSOLA: CONFORME. Token corporativo generado correctamente.'],
  LATAM: ['↻ INICIANDO CANAL GLOBAL KYC-KYB [REGIÓN: AMÉRICA LATINA]', '▣ Localizando reglas: ajuste a protocolos de bancos centrales locales...', '⌕ Validando registros fiscales: consulta Receita Federal brasileña (CPF)...', '◉ query_Mexican_CURP_database: comprobando registros nacionales... [COINCIDE]', '◆ Escaneando directorios latinoamericanos activos de PEP...', '◌ Analizando huella del dispositivo y velocidad de IP...', '◇ Autenticación NFC: extrayendo etiquetas criptográficas del chip del pasaporte...', '✦ Coincidencia biométrica: prueba de vida en tiempo real, puntuación 98,1%', '✓ ESTADO DE CONSOLA: CONFORME. Token corporativo generado correctamente.'],
  APAC: ['↻ INICIANDO CANAL GLOBAL KYC-KYB [REGIÓN: ASIA-PACÍFICO]', '▣ Localizando reglas: adaptación multilingüe y reglas japonesas My Number...', '⌕ Leyendo escritura Kanji: extrayendo datos del registro japonés...', '◉ query_Singpass_authentication_node: verificando vectores de identidad de Singapur... [ÉXITO]', '◆ Ejecutando AML en bases financieras regionales y registros de cumplimiento asiáticos...', '◌ Analizando diseños OCR: comparación directa de caracteres no latinos...', '✦ Coincidencia biométrica: índice de similitud 97,6%', '✓ ESTADO DE CONSOLA: CONFORME. Token corporativo generado correctamente.'],
  NA: ['↻ INICIANDO CANAL GLOBAL KYC-KYB [REGIÓN: NORTEAMÉRICA]', '▣ Localizando reglas: sincronizando USA Patriot Act y listas FINTRAC...', '⌕ Consultando bases IRS TIN y registros empresariales canadienses...', '◉ crosscheck_state_corporation_filings: consultando Delaware Division of Corporations...', '◆ Ejecutando sanciones OFAC inmediatas y monitoreo continuo...', '◌ Verificando propiedades holográficas de documento físico con Document AI...', '✦ Coincidencia biométrica: prueba de vida contra motores antifraude... [APROBADO]', '✓ ESTADO DE CONSOLA: CONFORME. Token corporativo generado correctamente.']
};

GLOBAL_EXPANSION_TRANSLATIONS.ja.consoleLogs = {
  EU: ['↻ グローバルKYC-KYBパイプラインを初期化中 [地域: 欧州連合]', '▣ 検証ルールを地域化中: GDPRとAMLD5要件に合わせています...', '⌕ 商業登記情報を取得中: "{company}"', '◉ query_VIES_database: VAT登録状態を確認中... [OK]', '◆ 法人ツリー全体をPEP、OFAC、EU統合ウォッチリストと照合中...', '◌ 本人確認を開始: Document AIチェックを起動中...', '◇ OCR分析: フランス旅券の透かしと署名欄を読み取り中...', '✦ 生体顔照合: 自撮りと旅券写真の比較スコア 99.4%', '✓ コンソール状態: 準拠。法人確認トークンを生成しました。'],
  LATAM: ['↻ グローバルKYC-KYBパイプラインを初期化中 [地域: 中南米]', '▣ 検証ルールを地域化中: 現地中央銀行プロトコルに調整中...', '⌕ 税務登録を確認中: ブラジルReceita Federal（CPF）を照会中...', '◉ query_Mexican_CURP_database: 国内記録データベースを確認中... [一致]', '◆ 中南米のPEPディレクトリをスキャン中...', '◌ デバイスフィンガープリントとIP速度リスクを分析中...', '◇ NFC認証: パスポートチップから暗号セキュリティタグを抽出中...', '✦ 生体顔照合: リアルタイムライブネス比較スコア 98.1%', '✓ コンソール状態: 準拠。法人確認トークンを生成しました。'],
  APAC: ['↻ グローバルKYC-KYBパイプラインを初期化中 [地域: アジア太平洋]', '▣ 検証ルールを地域化中: 多言語と日本のMy Numberルールに調整中...', '⌕ 漢字を読み取り中: 日本の登記簿から会社情報を抽出中...', '◉ query_Singpass_authentication_node: シンガポールの本人確認ベクトルを確認中... [成功]', '◆ 地域金融DBとアジア執行ログでAMLスクリーニングを実行中...', '◌ OCR文字配置を分析中: 非ラテン文字を地域DBと直接照合中...', '✦ 生体顔照合: 類似度検証指数 97.6%', '✓ コンソール状態: 準拠。法人確認トークンを生成しました。'],
  NA: ['↻ グローバルKYC-KYBパイプラインを初期化中 [地域: 北米]', '▣ 検証ルールを地域化中: USA Patriot ActとFINTRACチェックリストを同期中...', '⌕ IRS TIN照合DBとカナダ法人登録を照会中...', '◉ crosscheck_state_corporation_filings: Delaware Division of Corporationsを照会中...', '◆ OFAC制裁スクリーニングと継続監視を実行中...', '◌ Document AIで物理IDカードのホログラム特性を確認中...', '✦ 生体顔照合: なりすまし検出エンジンでライブネス確認中... [クリア]', '✓ コンソール状態: 準拠。法人確認トークンを生成しました。']
};

GLOBAL_EXPANSION_TRANSLATIONS.de.consoleLogs = {
  EU: ['↻ GLOBALE KYC-KYB-PIPELINE WIRD INITIALISIERT [REGION: EUROPÄISCHE UNION]', '▣ Verifizierungsregeln werden lokalisiert: Abgleich mit GDPR- und AMLD5-Anforderungen...', '⌕ Handelsregisterdaten werden abgerufen für: "{company}"', '◉ query_VIES_database: VAT-Registrierungsstatus wird bestätigt... [OK]', '◆ Vollständiger Unternehmensbaum wird gegen PEP, OFAC und EU-Watchlists geprüft...', '◌ Identitätsprüfung wird gestartet: Document AI-Prüfung ausgelöst...', '◇ OCR-Analyse: Wasserzeichen und Signaturfelder eines französischen Passes werden gelesen...', '✦ Biometrischer Gesichtsabgleich: Selfie gegen Passbild, Score 99,4%', '✓ KONSOLENSTATUS: KONFORM. Unternehmens-Token erfolgreich generiert.'],
  LATAM: ['↻ GLOBALE KYC-KYB-PIPELINE WIRD INITIALISIERT [REGION: LATEINAMERIKA]', '▣ Verifizierungsregeln werden lokalisiert: Anpassung an lokale Zentralbankprotokolle...', '⌕ Steuerregister werden validiert: Brasilianische Receita Federal (CPF) wird abgefragt...', '◉ query_Mexican_CURP_database: Nationale Datensätze werden geprüft... [ÜBEREINSTIMMUNG]', '◆ Aktive lateinamerikanische PEP-Verzeichnisse werden gescannt...', '◌ Gerätefingerabdruck und IP-Geschwindigkeitsrisiko werden analysiert...', '◇ NFC-Authentifizierung: Kryptografische Sicherheitstags aus Passchip werden extrahiert...', '✦ Biometrischer Gesichtsabgleich: Echtzeit-Liveness-Score 98,1%', '✓ KONSOLENSTATUS: KONFORM. Unternehmens-Token erfolgreich generiert.'],
  APAC: ['↻ GLOBALE KYC-KYB-PIPELINE WIRD INITIALISIERT [REGION: ASIEN-PAZIFIK]', '▣ Verifizierungsregeln werden lokalisiert: Mehrsprachigkeit und japanische My Number-Regeln...', '⌕ Native Kanji-Schrift wird gelesen: Firmendaten aus japanischem Register werden extrahiert...', '◉ query_Singpass_authentication_node: Identitätsvektoren aus Singapur werden geprüft... [ERFOLG]', '◆ AML-Screenings über regionale Finanzdatenbanken und asiatische Enforcement-Logs...', '◌ OCR-Textlayouts werden analysiert: Nicht-lateinische Zeichen direkt mit regionalen DBs abgeglichen...', '✦ Biometrischer Gesichtsabgleich: Ähnlichkeitsindex 97,6%', '✓ KONSOLENSTATUS: KONFORM. Unternehmens-Token erfolgreich generiert.'],
  NA: ['↻ GLOBALE KYC-KYB-PIPELINE WIRD INITIALISIERT [REGION: NORDAMERIKA]', '▣ Verifizierungsregeln werden lokalisiert: USA Patriot Act und FINTRAC-Listen werden synchronisiert...', '⌕ IRS TIN-Datenbanken und kanadische Unternehmensregister werden abgefragt...', '◉ crosscheck_state_corporation_filings: Delaware Division of Corporations wird abgefragt...', '◆ Sofortige OFAC-Sanktionsprüfung und kontinuierliche Überwachung werden gestartet...', '◌ Holografische Eigenschaften physischer Ausweise werden per Document AI geprüft...', '✦ Biometrischer Gesichtsabgleich: Selfie-Liveness gegen Spoofing-Engines... [FREIGEGEBEN]', '✓ KONSOLENSTATUS: KONFORM. Unternehmens-Token erfolgreich generiert.']
};

GLOBAL_EXPANSION_TRANSLATIONS.vi.consoleLogs = {
  EU: ['↻ ĐANG KHỞI TẠO QUY TRÌNH KYC-KYB TOÀN CẦU [KHU VỰC: LIÊN MINH CHÂU ÂU]', '▣ Đang bản địa hóa quy tắc xác minh: căn chỉnh với yêu cầu GDPR & AMLD5...', '⌕ Đang lấy chi tiết sổ đăng ký thương mại cho: "{company}"', '◉ query_VIES_database: xác nhận trạng thái đăng ký VAT... [OK]', '◆ Đang sàng lọc toàn bộ cây doanh nghiệp với PEP, OFAC và danh sách EU hợp nhất...', '◌ Đang khởi tạo chứng minh danh tính: kích hoạt kiểm tra Document AI...', '◇ Phân tích OCR: đọc hình mờ và trường chữ ký trên hộ chiếu Pháp...', '✦ Khớp khuôn mặt sinh trắc học: selfie so với hộ chiếu đạt 99,4%', '✓ TRẠNG THÁI BẢNG ĐIỀU KHIỂN: TUÂN THỦ. Đã tạo token xác minh doanh nghiệp.'],
  LATAM: ['↻ ĐANG KHỞI TẠO QUY TRÌNH KYC-KYB TOÀN CẦU [KHU VỰC: MỸ LATINH]', '▣ Đang bản địa hóa quy tắc xác minh: điều chỉnh theo giao thức ngân hàng trung ương địa phương...', '⌕ Đang xác thực sổ đăng ký thuế: truy vấn Receita Federal Brazil (CPF)...', '◉ query_Mexican_CURP_database: kiểm tra cơ sở dữ liệu quốc gia... [KHỚP]', '◆ Đang quét thư mục PEP Mỹ Latinh đang hoạt động...', '◌ Đang phân tích dấu vân tay thiết bị và rủi ro tốc độ IP...', '◇ Xác thực NFC: trích xuất thẻ bảo mật mã hóa từ chip hộ chiếu...', '✦ Khớp khuôn mặt sinh trắc học: điểm so sánh tính sống thời gian thực 98,1%', '✓ TRẠNG THÁI BẢNG ĐIỀU KHIỂN: TUÂN THỦ. Đã tạo token xác minh doanh nghiệp.'],
  APAC: ['↻ ĐANG KHỞI TẠO QUY TRÌNH KYC-KYB TOÀN CẦU [KHU VỰC: CHÂU Á - THÁI BÌNH DƯƠNG]', '▣ Đang bản địa hóa quy tắc xác minh: điều chỉnh cho đa ngôn ngữ và quy tắc My Number của Nhật...', '⌕ Đang đọc chữ Kanji bản địa: trích xuất chi tiết công ty từ sổ đăng ký Nhật...', '◉ query_Singpass_authentication_node: xác minh vector danh tính Singapore... [THÀNH CÔNG]', '◆ Đang chạy sàng lọc AML trên cơ sở dữ liệu tài chính khu vực và nhật ký thực thi châu Á...', '◌ Đang phân tích bố cục OCR: khớp ký tự phi Latin trực tiếp với cơ sở dữ liệu khu vực...', '✦ Khớp khuôn mặt sinh trắc học: chỉ số tương đồng 97,6%', '✓ TRẠNG THÁI BẢNG ĐIỀU KHIỂN: TUÂN THỦ. Đã tạo token xác minh doanh nghiệp.'],
  NA: ['↻ ĐANG KHỞI TẠO QUY TRÌNH KYC-KYB TOÀN CẦU [KHU VỰC: BẮC MỸ]', '▣ Đang bản địa hóa quy tắc xác minh: đồng bộ USA Patriot Act và danh sách FINTRAC...', '⌕ Đang truy vấn cơ sở dữ liệu khớp IRS TIN và sổ đăng ký doanh nghiệp Canada...', '◉ crosscheck_state_corporation_filings: truy vấn Delaware Division of Corporations...', '◆ Đang chạy sàng lọc trừng phạt OFAC tức thì và khóa giám sát liên tục...', '◌ Đang xác minh đặc tính hologram của thẻ ID vật lý bằng Document AI...', '✦ Khớp khuôn mặt sinh trắc học: kiểm tra tính sống selfie với công cụ chống giả mạo... [ĐẠT]', '✓ TRẠNG THÁI BẢNG ĐIỀU KHIỂN: TUÂN THỦ. Đã tạo token xác minh doanh nghiệp.']
};
