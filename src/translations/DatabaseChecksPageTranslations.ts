/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DATABASE_CHECKS_TRANSLATIONS: any = {
  en: {
    backToHome: 'Back to home',
    heroBadge: 'Product Verifications',
    heroTitle: 'Verify users globally across authoritative and issuing sources.',
    heroDesc: 'Increase assurance and meet regulations anywhere with configurable matching logic and robust global coverage. Validate identity data in real time.',
    tryDemo: 'Try the demo',
    trySandbox: 'Try the database matcher sandbox',
    pillars: [
      {
        title: 'Global coverage',
        desc: 'Match user data against multiple authoritative and issuing sources across 40+ countries to maximize coverage.'
      },
      {
        title: 'Custom matching logic',
        desc: 'Configure the matching logic to find an ideal balance between fraud protection and user experience.'
      },
      {
        title: 'Everything in a single place',
        desc: "Access databases and issuing sources in a single platform so you don't waste time stitching together disparate data."
      }
    ],
    workflowBadge: 'Workflow Integration',
    workflowTitle: 'How it works',
    stepTabs: ['1 Collect', '2 Verify', '3 Decide'],
    steps: [
      {
        title: 'Collect contact information',
        desc: 'Extract data from ID documents provided by users or prompt them to input information. Gather crucial identity parameters like name, date of birth, address, and national identification numbers seamlessly.',
        bullets: ['Automated OCR document scanning', 'Native mobile and web input fields', 'Real-time ZIP and address verification']
      },
      {
        title: 'Verify against authoritative databases',
        desc: 'Cross-reference user inputs instantly with official registries including DMVs, Social Security administrations, and global tax authorities. We scan live networks with ultra-high delivery success rates.',
        bullets: ['Live connection to DMV (AAMVA) records', 'Secure eCBSV SSA verification', 'Instant IRS TIN matching for business tax']
      },
      {
        title: 'Apply custom decisioning and friction',
        desc: 'Define matching confidence limits depending on risk level. Let the workflow system approve clear matches immediately, route partial matches to human reviewers, or increase authentication friction if risk signals are high.',
        bullets: ['Automated pass/fail triggers', 'Inline reviewer dashboards', 'Dynamic step-up authentication']
      }
    ],
    nextStep: 'Next Step',
    phone: {
      verifying: 'VERIFYING YOUR ID',
      api: 'AAMVA API',
      firstName: 'First Name',
      lastName: 'Last Name',
      dob: 'Date of Birth',
      extractionSuccess: 'Extraction successful (Confidence 99%)',
      registryTitle: 'AAMVA DMV Registry',
      registryDesc: 'Verifying driver license records...',
      checkingSsn: 'Checking SSN Registry:',
      match100: '100% Match',
      addressAlignment: 'Address Vector Alignment:',
      matched: 'Matched',
      verifiedTitle: 'User Fully Verified',
      verifiedDesc: 'Data matched against authoritative DMV registries and verified without dynamic review.',
      proceed: 'PROCEED TO ONBOARDING'
    },
    libraryBadge: 'Global Authority Library',
    libraryTitle: 'Explore our library of authoritative databases and issuing sources',
    libraryDesc: 'Direct real-time connections with certified regulatory networks and central issuing directories.',
    dbCards: [
      {
        title: 'Database Verification',
        desc: 'Verify collected and extracted PII against authoritative databases and issuing sources across 40+ countries. Achieve immediate identity validation for major geographic jurisdictions.',
        footer: 'Coverage: Global (40+ Countries)'
      },
      {
        title: 'eCBSV Validation',
        desc: 'Compare names, SSNs, and birthdates against official Social Security Administration records to better assess user risk, including synthetic fraud or thin-file profiles.',
        note: 'Note: eCBSV is not a standalone identity verification and should be used with other Identra verifications and signals.',
        footer: 'Source: Social Security Administration (SSA)'
      },
      {
        title: 'DMV (AAMVA)',
        desc: "Validate information on US driver's licenses and IDs against participating states' DMV records to detect fraudulent IDs. Instantly flag expired, fake, or stolen credentials.",
        footer: 'Source: American Association of Motor Vehicle Administrators'
      },
      {
        title: 'Taxpayer ID (TIN)',
        desc: 'Verify that the name and Taxpayer Identification Number (TIN) provided by a user match records in the Internal Revenue Service (IRS) database. Critical for merchant onboarding and KYB.',
        footer: 'Source: Internal Revenue Service (IRS)'
      },
      {
        title: 'National Registries',
        desc: 'Access local governmental databases across Europe, Latin America, and APAC regions including electoral commissions, civil registries, and tax administration platforms directly.',
        footer: 'Coverage: EU, LATAM, APAC registries'
      }
    ],
    otherDatabasesTitle: 'Other databases?',
    otherDatabasesDesc: 'Looking for a data source not listed here? Connect with us to learn what solutions are available in our global registry ecosystem.',
    connectTeam: 'Connect with our team',
    sandbox: {
      badge: 'Authoritative Verification Testing',
      title: 'Registry Matcher Simulator',
      desc: 'Verify how user record variables are checked against DMV, IRS, or SSA authoritative databases in real time. Load presets to see matching calculations.',
      formTitle: 'Verify Identity Inputs',
      presets: {
        alex: 'Alex Preset',
        jane: 'Jane Preset',
        partial: 'Partial/Wrong'
      },
      destinationLabel: 'Authoritative Destination Database',
      sources: {
        AAMVA: 'DMV (AAMVA)',
        eCBSV: 'SSA (eCBSV)',
        IRS_TIN: 'IRS TIN Match',
        GLOBAL: 'Global Registry'
      },
      labels: {
        firstName: 'First Name',
        lastName: 'Last Name',
        dob: 'Date of Birth',
        ssn: 'Social Security Number (Last 4)',
        state: 'State',
        zip: 'ZIP Code',
        tin: 'Taxpayer ID (TIN / EIN)',
        globalZip: 'Global Postal / ZIP Code'
      },
      connecting: 'Connecting to authoritative server...',
      query: 'Query Authoritative Registry',
      logsTitle: 'Registry Response Logs',
      apiStatus: 'API STATUS: SECURE',
      awaiting: 'Awaiting query triggers...',
      awaitingDesc: 'Select a database preset on the left or customize values, then click "Query Authoritative Registry" to run comparison.',
      transmitting: 'TRANSMITTING SECURE PII BLOB...',
      encryptedTunnel: 'Connecting via encrypted SHA-256 tunnel',
      overallIntegrity: 'Overall Match Integrity',
      confidence: 'Confidence',
      attributeMetrics: 'Attribute Grid Metrics',
      systemStatement: 'SYSTEM STATEMENT:',
      protocol: 'Protocol: SHA-256 Auth Endpoint',
      certification: 'ISO 27001 Certified System',
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        dobShort: 'DOB',
        dob: 'Date of Birth',
        ssnEcbs: 'SSN (eCBSV)',
        stateDmv: 'State DMV Record',
        zip: 'ZIP Code',
        ssaSsn: 'SSA SSN Record',
        irsTin: 'IRS Taxpayer ID (TIN)',
        globalRegistry: 'Global Credit Bureau Registry'
      },
      statuses: {
        MATCH: 'MATCH',
        MISMATCH: 'MISMATCH',
        VERIFIED: 'VERIFIED',
        REJECTED: 'REJECTED',
        REVIEW_REQUIRED: 'REVIEW REQUIRED'
      },
      unknown: 'Unknown',
      summaries: {
        notFound: 'Identity records not found in selected authoritative sources. Matching verification aborted.',
        passed: 'Authoritative validation succeeded with a match score of {score}%. Verification decision approved.',
        review: 'Authoritative validation returned partial matches ({score}% match score). Internal review recommended.'
      }
    },
    featuresBadge: 'Key Features',
    featuresTitle: "Expand your coverage, meet your unique business needs, and improve users' experiences",
    featuresDesc: 'Tailor and automate every step of your database verification pipeline to suit your dynamic risk limits.',
    features: [
      {
        id: 'geo',
        title: 'Comprehensive geographic coverage',
        desc: 'Validate collected PII and national IDs against issuing sources in 40+ countries without needing to integrate multiple vendors.'
      },
      {
        id: 'match',
        title: 'Configurable match criteria',
        desc: 'Specify exact comparison requirements. Set rules for fuzzy matching on names, handle typo tolerances, and configure matching logic on postal codes and DOB ranges.'
      },
      {
        id: 'fill',
        title: 'Address autofill',
        desc: 'Ensure database query quality by assisting users with address completion. Standardize inputs against postal directories before verifying to limit matching drops.'
      },
      {
        id: 'route',
        title: 'Dynamic routing',
        desc: 'Seamlessly query multiple database layers in cascade. If a primary check is inconclusive, automatically route queries to fallbacks to maximize conversion.'
      }
    ],
    useCasesBadge: 'Business Operations',
    useCasesTitle: 'How teams can use database checks',
    useCases: [
      {
        title: 'KYC/AML compliance',
        desc: 'Meet regulatory requirements such as non-documentary verification by verifying users against authoritative databases and issuing sources. Fast-track trusted low-risk clients instantly.'
      },
      {
        title: 'Identity verification',
        desc: "Verify an individual's identity by matching their information against authoritative databases and issuing sources. Bind credentials dynamically with low friction."
      },
      {
        title: 'Dynamic friction',
        desc: 'Automatically adjust friction based on match results. For example, increase friction for individuals who have partial or no matches, demanding document proof or live selfie uploads.'
      }
    ],
    keepLearning: 'Keep learning',
    learning: [
      {
        meta: 'Blog - 9 min read',
        title: 'What are issuing database verifications?',
        desc: 'Understand the difference between credit bureau checks, civil registries, and direct database queries.'
      },
      {
        meta: 'Blog - 6 min read',
        title: 'How to enhance your identity verification decisions with AAMVA checks',
        desc: 'Step-by-step guidelines on integrating US DMV records to catch advanced fake licenses and state IDs.'
      },
      {
        meta: 'Guide - 12 min read',
        title: 'The strategic guide to balancing risk and conversion',
        desc: 'Optimize your identity pipeline. Discover where to introduce frictionless checks and where strict security checks are required.'
      }
    ],
    explorePlatform: "Explore more of Identra's identity platform",
    platformLinks: [
      {
        title: 'Verify government IDs globally.',
        cta: 'View Government ID Verification'
      },
      {
        title: 'Build better identity flows.',
        cta: 'View Workflows Builder'
      }
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: "What countries do Identra's database checks cover?",
        a: 'We integrate with authoritative sources, credit bureaus, civil registries, and utility data streams across 40+ countries. This includes deep coverage for US records (eCBSV, AAMVA DMV, IRS TIN), Canadian credit sources, European civil indexes, and APAC/Latin American tax systems.'
      },
      {
        q: 'How fast are database query checks completed?',
        a: 'Database checks are processed via secure direct API channels and are typically completed in under 1 second. This makes them ideal for low-friction, high-conversion customer signups.'
      },
      {
        q: 'How does Identra handle data security for sensitive queries (SSN, TIN, DOB)?',
        a: 'Identra uses state-of-the-art encryption protocols (AES-256 for storage, TLS 1.3 for transit). We also provide flexible data minimization controls, allowing organizations to automatically mask or purge sensitive attributes like SSNs immediately after verification checks complete.'
      }
    ],
    readyTitle: 'Ready to get started?',
    readyDesc: 'Get in touch or start exploring Identra today.',
    tryItNow: 'Try it now'
  },
  es: {
    backToHome: 'Volver al inicio',
    heroBadge: 'Verificaciones de producto',
    heroTitle: 'Verifica usuarios en todo el mundo con fuentes oficiales y emisoras.',
    heroDesc: 'Aumenta la confianza y cumple regulaciones en cualquier mercado con lógica de coincidencia configurable y cobertura global sólida. Valida datos de identidad en tiempo real.',
    tryDemo: 'Probar la demo',
    trySandbox: 'Probar el entorno de pruebas de coincidencia de bases de datos',
    pillars: [
      {
        title: 'Cobertura global',
        desc: 'Compara datos de usuarios con múltiples fuentes oficiales y emisoras en más de 40 países para maximizar la cobertura.'
      },
      {
        title: 'Lógica de coincidencia personalizada',
        desc: 'Configura la lógica de coincidencia para equilibrar mejor la protección contra fraude y la experiencia del usuario.'
      },
      {
        title: 'Todo en un solo lugar',
        desc: 'Accede a bases de datos y fuentes emisoras desde una sola plataforma, sin perder tiempo conectando datos dispersos.'
      }
    ],
    workflowBadge: 'Integración del flujo de trabajo',
    workflowTitle: 'Cómo funciona',
    stepTabs: ['1 Recopilar', '2 Verificar', '3 Decidir'],
    steps: [
      {
        title: 'Recopila información de contacto',
        desc: 'Extrae datos de documentos de identidad proporcionados por los usuarios o pídeles que ingresen la información. Reúne parámetros clave como nombre, fecha de nacimiento, dirección y números de identificación nacional de forma fluida.',
        bullets: ['Escaneo automatizado de documentos con OCR', 'Campos nativos para web y móvil', 'Verificación de código postal y dirección en tiempo real']
      },
      {
        title: 'Verifica contra bases de datos oficiales',
        desc: 'Contrasta de inmediato los datos del usuario con registros oficiales, incluidos DMV, administraciones de seguridad social y autoridades fiscales globales. Escaneamos redes activas con tasas de entrega muy altas.',
        bullets: ['Conexión en vivo a registros DMV (AAMVA)', 'Verificación segura eCBSV de la SSA', 'Coincidencia instantánea IRS TIN para impuestos empresariales']
      },
      {
        title: 'Aplica decisiones y fricción personalizadas',
        desc: 'Define límites de confianza según el nivel de riesgo. Permite que el sistema apruebe coincidencias claras, envíe coincidencias parciales a revisión humana o aumente la autenticación cuando las señales de riesgo sean altas.',
        bullets: ['Activadores automatizados de aprobación o rechazo', 'Paneles integrados para revisores', 'Autenticación dinámica de refuerzo']
      }
    ],
    nextStep: 'Siguiente paso',
    phone: {
      verifying: 'VERIFICANDO TU ID',
      api: 'API AAMVA',
      firstName: 'Nombre',
      lastName: 'Apellido',
      dob: 'Fecha de nacimiento',
      extractionSuccess: 'Extracción correcta (confianza 99%)',
      registryTitle: 'Registro DMV AAMVA',
      registryDesc: 'Verificando registros de licencia de conducir...',
      checkingSsn: 'Comprobando registro SSN:',
      match100: '100% de coincidencia',
      addressAlignment: 'Alineación vectorial de dirección:',
      matched: 'Coincide',
      verifiedTitle: 'Usuario verificado por completo',
      verifiedDesc: 'Los datos coincidieron con registros DMV oficiales y se verificaron sin revisión dinámica.',
      proceed: 'CONTINUAR AL ALTA'
    },
    libraryBadge: 'Biblioteca de fuentes oficiales',
    libraryTitle: 'Explora nuestra biblioteca de bases de datos oficiales y fuentes emisoras',
    libraryDesc: 'Conexiones directas en tiempo real con redes regulatorias certificadas y directorios emisores centrales.',
    dbCards: [
      {
        title: 'Verificación de bases de datos',
        desc: 'Verifica PII recopilada y extraída contra bases de datos oficiales y fuentes emisoras en más de 40 países. Logra validación de identidad inmediata en jurisdicciones clave.',
        footer: 'Cobertura: global (más de 40 países)'
      },
      {
        title: 'Validación eCBSV',
        desc: 'Compara nombres, SSN y fechas de nacimiento con registros oficiales de la Social Security Administration para evaluar mejor el riesgo de usuario, incluido fraude sintético o perfiles con historial limitado.',
        note: 'Nota: eCBSV no es una verificación de identidad independiente y debe usarse junto con otras verificaciones y señales de Identra.',
        footer: 'Fuente: Social Security Administration (SSA)'
      },
      {
        title: 'DMV (AAMVA)',
        desc: 'Valida datos de licencias de conducir e identificaciones de EE. UU. contra registros DMV de estados participantes para detectar identificaciones fraudulentas. Marca al instante credenciales vencidas, falsas o robadas.',
        footer: 'Fuente: American Association of Motor Vehicle Administrators'
      },
      {
        title: 'Identificación fiscal (TIN)',
        desc: 'Verifica que el nombre y el Taxpayer Identification Number (TIN) proporcionados por un usuario coincidan con la base de datos del Internal Revenue Service (IRS). Es clave para alta de comercios y KYB.',
        footer: 'Fuente: Internal Revenue Service (IRS)'
      },
      {
        title: 'Registros nacionales',
        desc: 'Accede directamente a bases de datos gubernamentales locales en Europa, América Latina y APAC, incluidas comisiones electorales, registros civiles y plataformas de administración tributaria.',
        footer: 'Cobertura: registros de UE, LATAM y APAC'
      }
    ],
    otherDatabasesTitle: '¿Otras bases de datos?',
    otherDatabasesDesc: '¿Buscas una fuente de datos que no aparece aquí? Conéctate con nuestro equipo para conocer las soluciones disponibles en nuestro ecosistema global de registros.',
    connectTeam: 'Conectar con nuestro equipo',
    sandbox: {
      badge: 'Pruebas de verificación oficial',
      title: 'Simulador de coincidencia de registros',
      desc: 'Comprueba cómo se contrastan las variables del usuario con bases de datos oficiales DMV, IRS o SSA en tiempo real. Carga perfiles predefinidos para ver los cálculos de coincidencia.',
      formTitle: 'Verificar datos de identidad',
      presets: {
        alex: 'Perfil Alex',
        jane: 'Perfil Jane',
        partial: 'Parcial/incorrecto'
      },
      destinationLabel: 'Base de datos oficial de destino',
      sources: {
        AAMVA: 'DMV (AAMVA)',
        eCBSV: 'SSA (eCBSV)',
        IRS_TIN: 'Coincidencia IRS TIN',
        GLOBAL: 'Registro global'
      },
      labels: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        dob: 'Fecha de nacimiento',
        ssn: 'Social Security Number (últimos 4)',
        state: 'Estado',
        zip: 'Código ZIP',
        tin: 'Taxpayer ID (TIN / EIN)',
        globalZip: 'Código postal global / ZIP'
      },
      connecting: 'Conectando con el servidor oficial...',
      query: 'Consultar registro oficial',
      logsTitle: 'Registros de respuesta del registro',
      apiStatus: 'ESTADO API: SEGURO',
      awaiting: 'Esperando activadores de consulta...',
      awaitingDesc: 'Selecciona un perfil de base de datos a la izquierda o personaliza los valores; luego haz clic en "Consultar registro oficial" para ejecutar la comparación.',
      transmitting: 'TRANSMITIENDO PAQUETE PII SEGURO...',
      encryptedTunnel: 'Conectando mediante túnel cifrado SHA-256',
      overallIntegrity: 'Integridad general de coincidencia',
      confidence: 'Confianza',
      attributeMetrics: 'Métricas de atributos',
      systemStatement: 'DECLARACIÓN DEL SISTEMA:',
      protocol: 'Protocolo: punto de conexión autenticado SHA-256',
      certification: 'Sistema certificado ISO 27001',
      fields: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        dobShort: 'Fecha nac.',
        dob: 'Fecha de nacimiento',
        ssnEcbs: 'SSN (eCBSV)',
        stateDmv: 'Registro DMV estatal',
        zip: 'Código ZIP',
        ssaSsn: 'Registro SSN de la SSA',
        irsTin: 'IRS Taxpayer ID (TIN)',
        globalRegistry: 'Registro global de buró de crédito'
      },
      statuses: {
        MATCH: 'COINCIDE',
        MISMATCH: 'NO COINCIDE',
        VERIFIED: 'VERIFICADO',
        REJECTED: 'RECHAZADO',
        REVIEW_REQUIRED: 'REQUIERE REVISIÓN'
      },
      unknown: 'Desconocido',
      summaries: {
        notFound: 'No se encontraron registros de identidad en las fuentes oficiales seleccionadas. La verificación de coincidencia se detuvo.',
        passed: 'La validación oficial se completó correctamente con una puntuación de coincidencia del {score}%. Decisión de verificación aprobada.',
        review: 'La validación oficial devolvió coincidencias parciales ({score}% de coincidencia). Se recomienda revisión interna.'
      }
    },
    featuresBadge: 'Funciones clave',
    featuresTitle: 'Amplía tu cobertura, cumple necesidades únicas del negocio y mejora la experiencia de tus usuarios',
    featuresDesc: 'Personaliza y automatiza cada paso de tu canal de verificación de bases de datos para ajustarlo a tus límites dinámicos de riesgo.',
    features: [
      {
        id: 'geo',
        title: 'Cobertura geográfica integral',
        desc: 'Valida PII recopilada e identificaciones nacionales contra fuentes emisoras en más de 40 países sin integrar múltiples proveedores.'
      },
      {
        id: 'match',
        title: 'Criterios de coincidencia configurables',
        desc: 'Define requisitos exactos de comparación. Configura coincidencia flexible de nombres, tolerancia a errores tipográficos y lógica para códigos postales y rangos de fecha de nacimiento.'
      },
      {
        id: 'fill',
        title: 'Autocompletado de dirección',
        desc: 'Mejora la calidad de las consultas ayudando a los usuarios a completar direcciones. Estandariza entradas contra directorios postales antes de verificar para reducir caídas de coincidencia.'
      },
      {
        id: 'route',
        title: 'Enrutamiento dinámico',
        desc: 'Consulta varias capas de bases de datos en cascada. Si una verificación primaria no es concluyente, enruta automáticamente a fuentes alternativas para maximizar conversión.'
      }
    ],
    useCasesBadge: 'Operaciones de negocio',
    useCasesTitle: 'Cómo pueden usar los equipos las verificaciones de bases de datos',
    useCases: [
      {
        title: 'Cumplimiento KYC/AML',
        desc: 'Cumple requisitos regulatorios, como verificación no documental, contrastando usuarios con bases de datos oficiales y fuentes emisoras. Acelera al instante a clientes confiables de bajo riesgo.'
      },
      {
        title: 'Verificación de identidad',
        desc: 'Verifica la identidad de una identra comparando su información con bases de datos oficiales y fuentes emisoras. Vincula credenciales dinámicamente con poca fricción.'
      },
      {
        title: 'Fricción dinámica',
        desc: 'Ajusta automáticamente la fricción según los resultados de coincidencia. Por ejemplo, aumenta la fricción para personas con coincidencias parciales o nulas, solicitando prueba documental o selfies en vivo.'
      }
    ],
    keepLearning: 'Seguir aprendiendo',
    learning: [
      {
        meta: 'Artículo - lectura de 9 min',
        title: '¿Qué son las verificaciones de bases de datos emisoras?',
        desc: 'Entiende la diferencia entre verificaciones de buró de crédito, registros civiles y consultas directas de bases de datos.'
      },
      {
        meta: 'Artículo - lectura de 6 min',
        title: 'Cómo mejorar tus decisiones de verificación de identidad con comprobaciones AAMVA',
        desc: 'Guía paso a paso para integrar registros DMV de EE. UU. y detectar licencias falsas avanzadas e identificaciones estatales.'
      },
      {
        meta: 'Guía - lectura de 12 min',
        title: 'Guía estratégica para equilibrar riesgo y conversión',
        desc: 'Optimiza tu canal de identidad. Descubre dónde introducir verificaciones sin fricción y dónde se requieren controles de seguridad estrictos.'
      }
    ],
    explorePlatform: 'Explora más de la plataforma de identidad de Identra',
    platformLinks: [
      {
        title: 'Verifica identificaciones gubernamentales en todo el mundo.',
        cta: 'Ver verificación de ID gubernamental'
      },
      {
        title: 'Crea mejores flujos de identidad.',
        cta: 'Ver constructor de Workflows'
      }
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Qué países cubren las verificaciones de bases de datos de Identra?',
        a: 'Integramos fuentes oficiales, burós de crédito, registros civiles y flujos de datos de servicios públicos en más de 40 países. Esto incluye cobertura profunda para registros de EE. UU. (eCBSV, AAMVA DMV, IRS TIN), fuentes crediticias canadienses, índices civiles europeos y sistemas tributarios de APAC y América Latina.'
      },
      {
        q: '¿Qué tan rápido se completan las consultas de bases de datos?',
        a: 'Las verificaciones de bases de datos se procesan mediante canales API directos y seguros, y normalmente se completan en menos de 1 segundo. Son ideales para altas de clientes con poca fricción y alta conversión.'
      },
      {
        q: '¿Cómo gestiona Identra la seguridad de datos en consultas sensibles (SSN, TIN, fecha de nacimiento)?',
        a: 'Identra utiliza protocolos de cifrado avanzados (AES-256 para almacenamiento y TLS 1.3 para tránsito). También ofrecemos controles flexibles de minimización de datos para que las organizaciones puedan enmascarar o purgar automáticamente atributos sensibles como SSN cuando termina la verificación.'
      }
    ],
    readyTitle: '¿Listo para empezar?',
    readyDesc: 'Ponte en contacto o empieza a explorar Identra hoy.',
    tryItNow: 'Probar ahora'
  },
  ja: {
    backToHome: 'ホームに戻る',
    heroBadge: 'プロダクト検証',
    heroTitle: '公的情報源と発行元データで、世界中のユーザーを検証。',
    heroDesc: '設定可能な照合ロジックと強力なグローバルカバレッジで、どの市場でも信頼性を高め、規制に対応します。本人確認データをリアルタイムで検証できます。',
    tryDemo: 'デモを試す',
    trySandbox: 'データベース照合の検証環境を試す',
    pillars: [
      {
        title: 'グローバルカバレッジ',
        desc: '40か国以上の複数の公的情報源や発行元データとユーザーデータを照合し、カバレッジを最大化します。'
      },
      {
        title: 'カスタム照合ロジック',
        desc: '不正対策とユーザー体験の最適なバランスを取れるよう、照合ロジックを設定できます。'
      },
      {
        title: 'すべてを一か所で',
        desc: 'データベースと発行元情報に単一プラットフォームからアクセスでき、ばらばらのデータ連携に時間を費やす必要がありません。'
      }
    ],
    workflowBadge: 'ワークフロー連携',
    workflowTitle: '仕組み',
    stepTabs: ['1 収集', '2 検証', '3 判定'],
    steps: [
      {
        title: '連絡先情報を収集',
        desc: 'ユーザーが提出した本人確認書類からデータを抽出するか、入力を促します。氏名、生年月日、住所、国民識別番号などの重要な本人確認項目をスムーズに集めます。',
        bullets: ['OCRによる自動書類スキャン', 'モバイルとWebのネイティブ入力項目', '郵便番号と住所のリアルタイム検証']
      },
      {
        title: '公的データベースで検証',
        desc: 'DMV、社会保障機関、各国の税務当局などの公式レジストリとユーザー入力を即時に照合します。高い到達率でライブネットワークを照会します。',
        bullets: ['DMV (AAMVA) レコードへのライブ接続', '安全な eCBSV SSA 検証', '事業税務向け IRS TIN 即時照合']
      },
      {
        title: '独自の判定と追加確認を適用',
        desc: 'リスク水準に応じて照合信頼度のしきい値を定義します。明確な一致は即時承認し、部分一致は人によるレビューへ回し、リスク信号が高い場合は追加認証を求められます。',
        bullets: ['自動承認/却下トリガー', '組み込みレビューダッシュボード', '動的なステップアップ認証']
      }
    ],
    nextStep: '次のステップ',
    phone: {
      verifying: 'IDを検証中',
      api: 'AAMVA API',
      firstName: '名',
      lastName: '姓',
      dob: '生年月日',
      extractionSuccess: '抽出成功（信頼度99%）',
      registryTitle: 'AAMVA DMV レジストリ',
      registryDesc: '運転免許記録を検証中...',
      checkingSsn: 'SSNレジストリを確認中:',
      match100: '100%一致',
      addressAlignment: '住所ベクトル照合:',
      matched: '一致',
      verifiedTitle: 'ユーザー検証完了',
      verifiedDesc: 'データは公的なDMVレジストリと一致し、動的レビューなしで検証されました。',
      proceed: 'オンボーディングへ進む'
    },
    libraryBadge: '公的情報源ライブラリ',
    libraryTitle: '公的データベースと発行元情報のライブラリを探索',
    libraryDesc: '認定された規制ネットワークと中央発行ディレクトリへ、リアルタイムで直接接続します。',
    dbCards: [
      {
        title: 'データベース検証',
        desc: '収集・抽出したPIIを、40か国以上の公的データベースと発行元情報で検証します。主要地域で即時の本人確認を実現します。',
        footer: 'カバレッジ: グローバル（40か国以上）'
      },
      {
        title: 'eCBSV 検証',
        desc: '氏名、SSN、生年月日をSocial Security Administrationの公式記録と比較し、合成ID詐欺や信用履歴の薄いユーザーなどのリスクをより正確に評価します。',
        note: '注: eCBSVは単独の本人確認ではありません。Identraの他の検証やシグナルと併用してください。',
        footer: '情報源: Social Security Administration (SSA)'
      },
      {
        title: 'DMV (AAMVA)',
        desc: '米国の運転免許証やIDの情報を、参加州のDMV記録と照合して不正なIDを検出します。期限切れ、偽造、盗難された資格情報を即座に検知します。',
        footer: '情報源: American Association of Motor Vehicle Administrators'
      },
      {
        title: '納税者ID (TIN)',
        desc: 'ユーザーが提供した氏名とTaxpayer Identification Number (TIN) がInternal Revenue Service (IRS) のデータベース記録と一致するか確認します。加盟店オンボーディングとKYBに重要です。',
        footer: '情報源: Internal Revenue Service (IRS)'
      },
      {
        title: '国別レジストリ',
        desc: '欧州、ラテンアメリカ、APACの地域政府データベースへ直接アクセスします。選挙委員会、住民登録、税務管理プラットフォームなどを含みます。',
        footer: 'カバレッジ: EU、LATAM、APACのレジストリ'
      }
    ],
    otherDatabasesTitle: '他のデータベースをお探しですか？',
    otherDatabasesDesc: 'ここにないデータソースをお探しの場合は、グローバルレジストリエコシステムで利用できるソリューションについてお問い合わせください。',
    connectTeam: 'チームに相談',
    sandbox: {
      badge: '公的検証テスト',
      title: 'レジストリ照合シミュレーター',
      desc: 'ユーザー記録の変数がDMV、IRS、SSAの公的データベースでどのようにリアルタイム照合されるか確認できます。プリセットを読み込んで照合計算を表示します。',
      formTitle: '本人確認入力を検証',
      presets: {
        alex: 'Alexプリセット',
        jane: 'Janeプリセット',
        partial: '部分一致/誤り'
      },
      destinationLabel: '照会先の公的データベース',
      sources: {
        AAMVA: 'DMV (AAMVA)',
        eCBSV: 'SSA (eCBSV)',
        IRS_TIN: 'IRS TIN 照合',
        GLOBAL: 'グローバルレジストリ'
      },
      labels: {
        firstName: '名',
        lastName: '姓',
        dob: '生年月日',
        ssn: 'Social Security Number（下4桁）',
        state: '州',
        zip: 'ZIPコード',
        tin: 'Taxpayer ID (TIN / EIN)',
        globalZip: 'グローバル郵便番号 / ZIP'
      },
      connecting: '公的サーバーへ接続中...',
      query: '公的レジストリを照会',
      logsTitle: 'レジストリ応答ログ',
      apiStatus: 'API状態: セキュア',
      awaiting: '照会トリガー待機中...',
      awaitingDesc: '左側でデータベースプリセットを選択するか値を編集し、「公的レジストリを照会」をクリックして比較を実行します。',
      transmitting: '安全なPIIペイロードを送信中...',
      encryptedTunnel: 'SHA-256暗号化トンネルで接続中',
      overallIntegrity: '全体照合整合性',
      confidence: '信頼度',
      attributeMetrics: '属性グリッド指標',
      systemStatement: 'システム判定:',
      protocol: 'プロトコル: SHA-256認証エンドポイント',
      certification: 'ISO 27001認証システム',
      fields: {
        firstName: '名',
        lastName: '姓',
        dobShort: '生年月日',
        dob: '生年月日',
        ssnEcbs: 'SSN (eCBSV)',
        stateDmv: '州DMV記録',
        zip: 'ZIPコード',
        ssaSsn: 'SSA SSN記録',
        irsTin: 'IRS Taxpayer ID (TIN)',
        globalRegistry: 'グローバル信用情報レジストリ'
      },
      statuses: {
        MATCH: '一致',
        MISMATCH: '不一致',
        VERIFIED: '検証済み',
        REJECTED: '却下',
        REVIEW_REQUIRED: 'レビュー必要'
      },
      unknown: '不明',
      summaries: {
        notFound: '選択された公的情報源に本人確認記録が見つかりませんでした。照合検証を中止しました。',
        passed: '公的検証は{score}%の一致スコアで成功しました。検証判定は承認されました。',
        review: '公的検証は部分一致を返しました（一致スコア{score}%）。内部レビューを推奨します。'
      }
    },
    featuresBadge: '主な機能',
    featuresTitle: 'カバレッジを広げ、独自のビジネス要件に対応し、ユーザー体験を改善',
    featuresDesc: 'データベース検証パイプラインの各ステップを、動的なリスクしきい値に合わせて調整・自動化できます。',
    features: [
      {
        id: 'geo',
        title: '包括的な地域カバレッジ',
        desc: '複数ベンダーを統合せずに、収集したPIIや国民IDを40か国以上の発行元情報で検証します。'
      },
      {
        id: 'match',
        title: '設定可能な照合条件',
        desc: '正確な比較要件を指定できます。氏名のあいまい一致、入力ミス許容、郵便番号や生年月日範囲の照合ロジックを設定できます。'
      },
      {
        id: 'fill',
        title: '住所オートフィル',
        desc: 'ユーザーの住所入力を支援し、データベース照会の品質を高めます。検証前に郵便ディレクトリで入力を標準化し、照合失敗を抑えます。'
      },
      {
        id: 'route',
        title: '動的ルーティング',
        desc: '複数のデータベース層をカスケードで照会します。一次チェックが不確定な場合は、変換率を最大化するため代替情報源へ自動でルーティングします。'
      }
    ],
    useCasesBadge: 'ビジネス運用',
    useCasesTitle: 'チームでのデータベースチェック活用方法',
    useCases: [
      {
        title: 'KYC/AMLコンプライアンス',
        desc: '非書類型検証などの規制要件に対応するため、ユーザーを公的データベースや発行元情報で検証します。信頼できる低リスク顧客は即時に通過できます。'
      },
      {
        title: '本人確認',
        desc: '個人の情報を公的データベースや発行元情報と照合し、本人性を確認します。低摩擦で資格情報を動的に結び付けます。'
      },
      {
        title: '動的な追加確認',
        desc: '照合結果に基づいて追加確認の強さを自動調整します。部分一致や一致なしの人物には、書類証明やライブセルフィー提出などを求められます。'
      }
    ],
    keepLearning: 'さらに学ぶ',
    learning: [
      {
        meta: 'ブログ - 9分で読めます',
        title: '発行元データベース検証とは？',
        desc: '信用情報機関チェック、住民登録、直接データベース照会の違いを理解できます。'
      },
      {
        meta: 'ブログ - 6分で読めます',
        title: 'AAMVAチェックで本人確認判定を強化する方法',
        desc: '米国DMV記録を統合し、高度な偽造免許証や州IDを検出するための手順を紹介します。'
      },
      {
        meta: 'ガイド - 12分で読めます',
        title: 'リスクとコンバージョンを両立する戦略ガイド',
        desc: '本人確認パイプラインを最適化します。摩擦の少ないチェックを入れる場所と、厳格なセキュリティチェックが必要な場所を見極めます。'
      }
    ],
    explorePlatform: 'Identraの本人確認プラットフォームをさらに探索',
    platformLinks: [
      {
        title: '政府発行IDを世界中で検証。',
        cta: '政府発行ID検証を見る'
      },
      {
        title: 'より良い本人確認フローを構築。',
        cta: 'Workflows Builderを見る'
      }
    ],
    faqTitle: 'よくある質問',
    faqs: [
      {
        q: 'Identraのデータベースチェックはどの国をカバーしていますか？',
        a: '40か国以上で、公的情報源、信用情報機関、住民登録、公共料金データストリームと連携しています。米国記録（eCBSV、AAMVA DMV、IRS TIN）、カナダの信用情報、欧州の住民インデックス、APAC/ラテンアメリカの税務システムを深くカバーします。'
      },
      {
        q: 'データベース照会チェックはどのくらい速く完了しますか？',
        a: 'データベースチェックは安全な直接APIチャネルで処理され、通常1秒未満で完了します。低摩擦で高コンバージョンの顧客登録に適しています。'
      },
      {
        q: 'Identraは機微な照会データ（SSN、TIN、生年月日）をどのように保護しますか？',
        a: 'Identraは高度な暗号化プロトコル（保管時AES-256、転送時TLS 1.3）を使用します。また柔軟なデータ最小化制御により、検証完了後すぐにSSNなどの機微属性を自動でマスクまたは削除できます。'
      }
    ],
    readyTitle: '始める準備はできましたか？',
    readyDesc: 'お問い合わせいただくか、今すぐIdentraを試してみてください。',
    tryItNow: '今すぐ試す'
  },
  de: {
    backToHome: 'Zur Startseite',
    heroBadge: 'Produktverifizierungen',
    heroTitle: 'Verifizieren Sie Nutzer weltweit mit amtlichen und ausstellenden Quellen.',
    heroDesc: 'Erhöhen Sie Sicherheit und erfüllen Sie Vorschriften überall mit konfigurierbarer Abgleichlogik und starker globaler Abdeckung. Validieren Sie Identitätsdaten in Echtzeit.',
    tryDemo: 'Demo testen',
    trySandbox: 'Testumgebung für Datenbankabgleich testen',
    pillars: [
      {
        title: 'Globale Abdeckung',
        desc: 'Gleichen Sie Nutzerdaten mit mehreren amtlichen und ausstellenden Quellen in über 40 Ländern ab, um die Abdeckung zu maximieren.'
      },
      {
        title: 'Individuelle Abgleichlogik',
        desc: 'Konfigurieren Sie die Abgleichlogik, um Betrugsschutz und Nutzererlebnis optimal auszubalancieren.'
      },
      {
        title: 'Alles an einem Ort',
        desc: 'Greifen Sie in einer einzigen Plattform auf Datenbanken und ausstellende Quellen zu, statt unterschiedliche Datenquellen mühsam zu verbinden.'
      }
    ],
    workflowBadge: 'Workflow-Integration',
    workflowTitle: 'So funktioniert es',
    stepTabs: ['1 Erfassen', '2 Verifizieren', '3 Entscheiden'],
    steps: [
      {
        title: 'Kontaktdaten erfassen',
        desc: 'Extrahieren Sie Daten aus von Nutzern bereitgestellten Ausweisdokumenten oder lassen Sie Informationen eingeben. Erfassen Sie wichtige Identitätsparameter wie Name, Geburtsdatum, Adresse und nationale Identifikationsnummern nahtlos.',
        bullets: ['Automatisiertes OCR-Dokumentenscanning', 'Native Eingabefelder für Mobilgeräte und Web', 'Echtzeitprüfung von ZIP und Adresse']
      },
      {
        title: 'Gegen amtliche Datenbanken verifizieren',
        desc: 'Gleichen Sie Nutzereingaben sofort mit offiziellen Registern wie DMV, Sozialversicherungsstellen und globalen Steuerbehörden ab. Wir prüfen Live-Netzwerke mit sehr hohen Zustellraten.',
        bullets: ['Live-Verbindung zu DMV (AAMVA)-Datensätzen', 'Sichere eCBSV-SSA-Verifizierung', 'Sofortiger IRS-TIN-Abgleich für Unternehmenssteuerdaten']
      },
      {
        title: 'Eigene Entscheidungen und Reibung anwenden',
        desc: 'Definieren Sie Vertrauensgrenzen je nach Risikoniveau. Klare Treffer werden sofort genehmigt, Teilergebnisse an Prüfer weitergeleitet oder bei hohem Risiko zusätzliche Authentifizierung verlangt.',
        bullets: ['Automatisierte Pass/Fail-Auslöser', 'Integrierte Prüfer-Dashboards', 'Dynamische Zusatz-Authentifizierung']
      }
    ],
    nextStep: 'Nächster Schritt',
    phone: {
      verifying: 'IHRE ID WIRD GEPRÜFT',
      api: 'AAMVA API',
      firstName: 'Vorname',
      lastName: 'Nachname',
      dob: 'Geburtsdatum',
      extractionSuccess: 'Extraktion erfolgreich (Konfidenz 99%)',
      registryTitle: 'AAMVA DMV-Register',
      registryDesc: 'Führerscheindaten werden geprüft...',
      checkingSsn: 'SSN-Register wird geprüft:',
      match100: '100% Treffer',
      addressAlignment: 'Adressvektor-Abgleich:',
      matched: 'Übereinstimmung',
      verifiedTitle: 'Nutzer vollständig verifiziert',
      verifiedDesc: 'Daten wurden mit amtlichen DMV-Registern abgeglichen und ohne dynamische Prüfung verifiziert.',
      proceed: 'ZUM ONBOARDING'
    },
    libraryBadge: 'Bibliothek amtlicher Quellen',
    libraryTitle: 'Entdecken Sie unsere Bibliothek amtlicher Datenbanken und ausstellender Quellen',
    libraryDesc: 'Direkte Echtzeitverbindungen zu zertifizierten regulatorischen Netzwerken und zentralen Ausstellerverzeichnissen.',
    dbCards: [
      {
        title: 'Datenbankverifizierung',
        desc: 'Verifizieren Sie erfasste und extrahierte PII gegen amtliche Datenbanken und ausstellende Quellen in über 40 Ländern. Erreichen Sie sofortige Identitätsvalidierung in wichtigen geografischen Rechtsräumen.',
        footer: 'Abdeckung: Global (über 40 Länder)'
      },
      {
        title: 'eCBSV-Validierung',
        desc: 'Vergleichen Sie Namen, SSN und Geburtsdaten mit offiziellen Datensätzen der Social Security Administration, um Nutzerrisiken wie synthetischen Betrug oder dünne Akten besser zu bewerten.',
        note: 'Hinweis: eCBSV ist keine eigenständige Identitätsverifizierung und sollte mit anderen Identra-Verifizierungen und Signalen kombiniert werden.',
        footer: 'Quelle: Social Security Administration (SSA)'
      },
      {
        title: 'DMV (AAMVA)',
        desc: 'Validieren Sie Daten auf US-Führerscheinen und IDs gegen DMV-Datensätze teilnehmender Bundesstaaten, um betrügerische IDs zu erkennen. Abgelaufene, gefälschte oder gestohlene Nachweise werden sofort markiert.',
        footer: 'Quelle: American Association of Motor Vehicle Administrators'
      },
      {
        title: 'Steuerzahler-ID (TIN)',
        desc: 'Prüfen Sie, ob der vom Nutzer angegebene Name und die Taxpayer Identification Number (TIN) mit den Datensätzen der Internal Revenue Service (IRS)-Datenbank übereinstimmen. Entscheidend für die Aufnahme von Händlern und KYB.',
        footer: 'Quelle: Internal Revenue Service (IRS)'
      },
      {
        title: 'Nationale Register',
        desc: 'Greifen Sie direkt auf lokale Regierungsdatenbanken in Europa, Lateinamerika und APAC zu, darunter Wahlkommissionen, Personenstandsregister und Steuerverwaltungsplattformen.',
        footer: 'Abdeckung: Register in EU, LATAM und APAC'
      }
    ],
    otherDatabasesTitle: 'Andere Datenbanken?',
    otherDatabasesDesc: 'Suchen Sie eine hier nicht aufgeführte Datenquelle? Sprechen Sie mit uns, um verfügbare Lösungen in unserem globalen Register-Ökosystem kennenzulernen.',
    connectTeam: 'Mit unserem Team sprechen',
    sandbox: {
      badge: 'Test amtlicher Verifizierung',
      title: 'Registerabgleich-Simulator',
      desc: 'Sehen Sie, wie Variablen aus Nutzerdatensätzen in Echtzeit gegen amtliche DMV-, IRS- oder SSA-Datenbanken geprüft werden. Laden Sie Voreinstellungen, um Abgleichberechnungen zu sehen.',
      formTitle: 'Identitätseingaben verifizieren',
      presets: {
        alex: 'Alex-Preset',
        jane: 'Jane-Preset',
        partial: 'Teilweise/falsch'
      },
      destinationLabel: 'Amtliche Zieldatenbank',
      sources: {
        AAMVA: 'DMV (AAMVA)',
        eCBSV: 'SSA (eCBSV)',
        IRS_TIN: 'IRS TIN-Abgleich',
        GLOBAL: 'Globales Register'
      },
      labels: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        dob: 'Geburtsdatum',
        ssn: 'Social Security Number (letzte 4)',
        state: 'Bundesstaat',
        zip: 'ZIP-Code',
        tin: 'Taxpayer ID (TIN / EIN)',
        globalZip: 'Globale Postleitzahl / ZIP'
      },
      connecting: 'Verbindung zum amtlichen Server wird hergestellt...',
      query: 'Amtliches Register abfragen',
      logsTitle: 'Register-Antwortprotokolle',
      apiStatus: 'API-STATUS: SICHER',
      awaiting: 'Warten auf Abfrageauslöser...',
      awaitingDesc: 'Wählen Sie links ein Datenbank-Preset oder passen Sie Werte an und klicken Sie dann auf "Amtliches Register abfragen", um den Vergleich auszuführen.',
      transmitting: 'SICHERES PII-PAKET WIRD ÜBERTRAGEN...',
      encryptedTunnel: 'Verbindung über verschlüsselten SHA-256-Tunnel',
      overallIntegrity: 'Gesamte Abgleichintegrität',
      confidence: 'Konfidenz',
      attributeMetrics: 'Attributraster-Metriken',
      systemStatement: 'SYSTEMAUSSAGE:',
      protocol: 'Protokoll: SHA-256-Auth-Endpunkt',
      certification: 'ISO 27001-zertifiziertes System',
      fields: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        dobShort: 'Geburtsdatum',
        dob: 'Geburtsdatum',
        ssnEcbs: 'SSN (eCBSV)',
        stateDmv: 'DMV-Datensatz des Bundesstaats',
        zip: 'ZIP-Code',
        ssaSsn: 'SSA-SSN-Datensatz',
        irsTin: 'IRS Taxpayer ID (TIN)',
        globalRegistry: 'Globales Kreditbüro-Register'
      },
      statuses: {
        MATCH: 'TREFFER',
        MISMATCH: 'KEIN TREFFER',
        VERIFIED: 'VERIFIZIERT',
        REJECTED: 'ABGELEHNT',
        REVIEW_REQUIRED: 'PRÜFUNG ERFORDERLICH'
      },
      unknown: 'Unbekannt',
      summaries: {
        notFound: 'In den ausgewählten amtlichen Quellen wurden keine Identitätsdatensätze gefunden. Die Abgleichprüfung wurde abgebrochen.',
        passed: 'Die amtliche Validierung war mit einem Trefferwert von {score}% erfolgreich. Die Verifizierungsentscheidung wurde genehmigt.',
        review: 'Die amtliche Validierung lieferte teilweise Treffer ({score}% Trefferwert). Interne Prüfung empfohlen.'
      }
    },
    featuresBadge: 'Wichtige Funktionen',
    featuresTitle: 'Erweitern Sie Ihre Abdeckung, erfüllen Sie individuelle Geschäftsanforderungen und verbessern Sie Nutzererlebnisse',
    featuresDesc: 'Passen Sie jeden Schritt Ihrer Datenbankverifizierung an und automatisieren Sie ihn entsprechend Ihren dynamischen Risikogrenzen.',
    features: [
      {
        id: 'geo',
        title: 'Umfassende geografische Abdeckung',
        desc: 'Validieren Sie erfasste PII und nationale IDs gegen ausstellende Quellen in über 40 Ländern, ohne mehrere Anbieter integrieren zu müssen.'
      },
      {
        id: 'match',
        title: 'Konfigurierbare Abgleichkriterien',
        desc: 'Legen Sie exakte Vergleichsanforderungen fest. Regeln für unscharfe Namensabgleiche, Tippfehlertoleranzen sowie Logik für Postleitzahlen und Geburtsdatumsbereiche sind konfigurierbar.'
      },
      {
        id: 'fill',
        title: 'Adress-Autofill',
        desc: 'Verbessern Sie die Qualität von Datenbankabfragen, indem Nutzer bei der Adressvervollständigung unterstützt werden. Eingaben werden vor der Verifizierung gegen Postverzeichnisse standardisiert.'
      },
      {
        id: 'route',
        title: 'Dynamisches Routing',
        desc: 'Fragen Sie mehrere Datenbankebenen kaskadierend ab. Ist eine primäre Prüfung nicht eindeutig, werden Abfragen automatisch an Fallbacks geleitet, um Conversion zu maximieren.'
      }
    ],
    useCasesBadge: 'Geschäftsbetrieb',
    useCasesTitle: 'Wie Teams Datenbankprüfungen nutzen können',
    useCases: [
      {
        title: 'KYC/AML-Compliance',
        desc: 'Erfüllen Sie regulatorische Anforderungen wie nicht dokumentenbasierte Verifizierung, indem Nutzer gegen amtliche Datenbanken und ausstellende Quellen geprüft werden. Vertrauenswürdige Kunden mit geringem Risiko werden sofort beschleunigt.'
      },
      {
        title: 'Identitätsverifizierung',
        desc: 'Verifizieren Sie die Identität einer Person, indem ihre Informationen mit amtlichen Datenbanken und ausstellenden Quellen abgeglichen werden. Nachweise lassen sich dynamisch mit wenig Reibung binden.'
      },
      {
        title: 'Dynamische Reibung',
        desc: 'Passen Sie Reibung automatisch anhand der Treffergebnisse an. Bei Personen mit teilweisen oder keinen Treffern kann zusätzliche Dokumentenprüfung oder ein Live-Selfie verlangt werden.'
      }
    ],
    keepLearning: 'Weiterlernen',
    learning: [
      {
        meta: 'Artikel - 9 Min. Lesezeit',
        title: 'Was sind Verifizierungen über ausstellende Datenbanken?',
        desc: 'Verstehen Sie den Unterschied zwischen Kreditbüroprüfungen, Personenstandsregistern und direkten Datenbankabfragen.'
      },
      {
        meta: 'Artikel - 6 Min. Lesezeit',
        title: 'So verbessern Sie Entscheidungen zur Identitätsverifizierung mit AAMVA-Prüfungen',
        desc: 'Schrittweise Anleitung zur Integration von US-DMV-Datensätzen, um anspruchsvolle gefälschte Führerscheine und staatliche IDs zu erkennen.'
      },
      {
        meta: 'Leitfaden - 12 Min. Lesezeit',
        title: 'Der strategische Leitfaden zum Ausbalancieren von Risiko und Conversion',
        desc: 'Optimieren Sie Ihre Identitätspipeline. Finden Sie heraus, wo reibungslose Prüfungen sinnvoll sind und wo strenge Sicherheitsprüfungen erforderlich sind.'
      }
    ],
    explorePlatform: 'Mehr von Identras Identitätsplattform entdecken',
    platformLinks: [
      {
        title: 'Regierungs-IDs weltweit verifizieren.',
        cta: 'Verifizierung staatlicher IDs ansehen'
      },
      {
        title: 'Bessere Identitätsflüsse erstellen.',
        cta: 'Workflows Builder ansehen'
      }
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Welche Länder decken Identras Datenbankprüfungen ab?',
        a: 'Wir integrieren amtliche Quellen, Kreditbüros, Personenstandsregister und Versorgungsdatenströme in über 40 Ländern. Dazu gehören tiefe Abdeckung für US-Datensätze (eCBSV, AAMVA DMV, IRS TIN), kanadische Kreditquellen, europäische Personenstandsindizes sowie Steuerverwaltungssysteme in APAC und Lateinamerika.'
      },
      {
        q: 'Wie schnell werden Datenbankabfragen abgeschlossen?',
        a: 'Datenbankprüfungen werden über sichere direkte API-Kanäle verarbeitet und normalerweise in unter 1 Sekunde abgeschlossen. Dadurch eignen sie sich ideal für reibungsarme Kundenregistrierungen mit hoher Conversion.'
      },
      {
        q: 'Wie schützt Identra Daten bei sensiblen Abfragen (SSN, TIN, Geburtsdatum)?',
        a: 'Identra nutzt moderne Verschlüsselungsprotokolle (AES-256 für Speicherung, TLS 1.3 für Übertragung). Zudem bieten wir flexible Kontrollen zur Datenminimierung, damit Organisationen sensible Attribute wie SSN nach Abschluss der Prüfung automatisch maskieren oder löschen können.'
      }
    ],
    readyTitle: 'Bereit loszulegen?',
    readyDesc: 'Kontaktieren Sie uns oder entdecken Sie Identra noch heute.',
    tryItNow: 'Jetzt testen'
  },
  vi: {
    backToHome: 'Quay lại trang chủ',
    heroBadge: 'Xác minh sản phẩm',
    heroTitle: 'Xác minh người dùng trên toàn cầu bằng nguồn dữ liệu chính thức và nguồn phát hành.',
    heroDesc: 'Tăng mức độ tin cậy và đáp ứng quy định ở mọi thị trường với logic đối chiếu có thể cấu hình và độ phủ toàn cầu mạnh mẽ. Xác thực dữ liệu danh tính theo thời gian thực.',
    tryDemo: 'Trải nghiệm demo',
    trySandbox: 'Thử môi trường đối chiếu cơ sở dữ liệu',
    pillars: [
      {
        title: 'Độ phủ toàn cầu',
        desc: 'Đối chiếu dữ liệu người dùng với nhiều nguồn chính thức và nguồn phát hành tại hơn 40 quốc gia để tối đa hóa độ phủ.'
      },
      {
        title: 'Logic đối chiếu tùy chỉnh',
        desc: 'Cấu hình logic đối chiếu để cân bằng tối ưu giữa chống gian lận và trải nghiệm người dùng.'
      },
      {
        title: 'Tất cả trong một nền tảng',
        desc: 'Truy cập cơ sở dữ liệu và nguồn phát hành trong một nền tảng duy nhất, không phải tốn thời gian ghép nối dữ liệu rời rạc.'
      }
    ],
    workflowBadge: 'Tích hợp quy trình',
    workflowTitle: 'Cách hoạt động',
    stepTabs: ['1 Thu thập', '2 Xác minh', '3 Quyết định'],
    steps: [
      {
        title: 'Thu thập thông tin liên hệ',
        desc: 'Trích xuất dữ liệu từ giấy tờ tùy thân do người dùng cung cấp hoặc yêu cầu họ nhập thông tin. Thu thập liền mạch các tham số danh tính quan trọng như họ tên, ngày sinh, địa chỉ và số định danh quốc gia.',
        bullets: ['Quét giấy tờ tự động bằng OCR', 'Trường nhập liệu gốc trên di động và web', 'Xác minh mã ZIP và địa chỉ theo thời gian thực']
      },
      {
        title: 'Xác minh với cơ sở dữ liệu chính thức',
        desc: 'Đối chiếu tức thì dữ liệu người dùng với các hồ sơ chính thức, bao gồm DMV, cơ quan an sinh xã hội và cơ quan thuế toàn cầu. Hệ thống quét các mạng dữ liệu trực tiếp với tỷ lệ phản hồi rất cao.',
        bullets: ['Kết nối trực tiếp tới hồ sơ DMV (AAMVA)', 'Xác minh SSA qua eCBSV an toàn', 'Đối chiếu IRS TIN tức thì cho thuế doanh nghiệp']
      },
      {
        title: 'Áp dụng quyết định và mức xác minh tùy chỉnh',
        desc: 'Đặt ngưỡng tin cậy theo từng mức rủi ro. Cho phép hệ thống phê duyệt ngay các kết quả khớp rõ ràng, chuyển kết quả khớp một phần cho người đánh giá, hoặc tăng bước xác thực khi tín hiệu rủi ro cao.',
        bullets: ['Kích hoạt tự động đạt/không đạt', 'Bảng điều khiển tích hợp cho người đánh giá', 'Xác thực tăng cường động']
      }
    ],
    nextStep: 'Bước tiếp theo',
    phone: {
      verifying: 'ĐANG XÁC MINH ID CỦA BẠN',
      api: 'API AAMVA',
      firstName: 'Tên',
      lastName: 'Họ',
      dob: 'Ngày sinh',
      extractionSuccess: 'Trích xuất thành công (độ tin cậy 99%)',
      registryTitle: 'Sổ đăng ký DMV AAMVA',
      registryDesc: 'Đang xác minh hồ sơ giấy phép lái xe...',
      checkingSsn: 'Đang kiểm tra sổ đăng ký SSN:',
      match100: 'Khớp 100%',
      addressAlignment: 'Căn khớp vectơ địa chỉ:',
      matched: 'Đã khớp',
      verifiedTitle: 'Người dùng đã được xác minh đầy đủ',
      verifiedDesc: 'Dữ liệu đã khớp với hồ sơ DMV chính thức và được xác minh mà không cần đánh giá động.',
      proceed: 'TIẾP TỤC QUY TRÌNH ĐĂNG KÝ'
    },
    libraryBadge: 'Thư viện nguồn chính thức',
    libraryTitle: 'Khám phá thư viện cơ sở dữ liệu chính thức và nguồn phát hành',
    libraryDesc: 'Kết nối trực tiếp theo thời gian thực với các mạng lưới tuân thủ được chứng nhận và thư mục phát hành trung tâm.',
    dbCards: [
      {
        title: 'Xác minh cơ sở dữ liệu',
        desc: 'Xác minh PII đã thu thập và trích xuất với cơ sở dữ liệu chính thức và nguồn phát hành tại hơn 40 quốc gia. Xác thực danh tính tức thì tại các khu vực pháp lý quan trọng.',
        footer: 'Độ phủ: toàn cầu (hơn 40 quốc gia)'
      },
      {
        title: 'Xác thực eCBSV',
        desc: 'So sánh tên, SSN và ngày sinh với hồ sơ chính thức của Social Security Administration để đánh giá rủi ro người dùng tốt hơn, gồm gian lận danh tính tổng hợp hoặc hồ sơ tín dụng mỏng.',
        note: 'Lưu ý: eCBSV không phải là phương thức xác minh danh tính độc lập và nên được dùng cùng các xác minh và tín hiệu khác của Identra.',
        footer: 'Nguồn: Social Security Administration (SSA)'
      },
      {
        title: 'DMV (AAMVA)',
        desc: 'Xác thực thông tin trên giấy phép lái xe và ID của Hoa Kỳ với hồ sơ DMV của các bang tham gia để phát hiện ID gian lận. Đánh dấu tức thì giấy tờ hết hạn, giả mạo hoặc bị đánh cắp.',
        footer: 'Nguồn: American Association of Motor Vehicle Administrators'
      },
      {
        title: 'Mã số thuế (TIN)',
        desc: 'Xác minh tên và Taxpayer Identification Number (TIN) do người dùng cung cấp có khớp với hồ sơ trong cơ sở dữ liệu Internal Revenue Service (IRS) hay không. Rất quan trọng cho quy trình tiếp nhận nhà bán hàng và KYB.',
        footer: 'Nguồn: Internal Revenue Service (IRS)'
      },
      {
        title: 'Sổ đăng ký quốc gia',
        desc: 'Truy cập trực tiếp cơ sở dữ liệu chính phủ địa phương tại châu Âu, Mỹ Latinh và APAC, bao gồm ủy ban bầu cử, hộ tịch và nền tảng quản lý thuế.',
        footer: 'Độ phủ: sổ đăng ký EU, LATAM, APAC'
      }
    ],
    otherDatabasesTitle: 'Cần cơ sở dữ liệu khác?',
    otherDatabasesDesc: 'Bạn đang tìm nguồn dữ liệu chưa có trong danh sách? Kết nối với chúng tôi để tìm hiểu các giải pháp hiện có trong hệ sinh thái sổ đăng ký toàn cầu.',
    connectTeam: 'Kết nối với đội ngũ của chúng tôi',
    sandbox: {
      badge: 'Kiểm thử xác minh chính thức',
      title: 'Trình mô phỏng đối chiếu sổ đăng ký',
      desc: 'Xem cách các biến trong hồ sơ người dùng được kiểm tra với cơ sở dữ liệu chính thức DMV, IRS hoặc SSA theo thời gian thực. Tải mẫu dữ liệu để xem cách tính điểm khớp.',
      formTitle: 'Xác minh dữ liệu danh tính đầu vào',
      presets: {
        alex: 'Mẫu Alex',
        jane: 'Mẫu Jane',
        partial: 'Một phần/sai'
      },
      destinationLabel: 'Cơ sở dữ liệu chính thức đích',
      sources: {
        AAMVA: 'DMV (AAMVA)',
        eCBSV: 'SSA (eCBSV)',
        IRS_TIN: 'Đối chiếu IRS TIN',
        GLOBAL: 'Sổ đăng ký toàn cầu'
      },
      labels: {
        firstName: 'Tên',
        lastName: 'Họ',
        dob: 'Ngày sinh',
        ssn: 'Social Security Number (4 số cuối)',
        state: 'Bang',
        zip: 'Mã ZIP',
        tin: 'Taxpayer ID (TIN / EIN)',
        globalZip: 'Mã bưu chính toàn cầu / ZIP'
      },
      connecting: 'Đang kết nối tới máy chủ chính thức...',
      query: 'Truy vấn sổ đăng ký chính thức',
      logsTitle: 'Nhật ký phản hồi sổ đăng ký',
      apiStatus: 'TRẠNG THÁI API: AN TOÀN',
      awaiting: 'Đang chờ kích hoạt truy vấn...',
      awaitingDesc: 'Chọn một mẫu cơ sở dữ liệu ở bên trái hoặc tùy chỉnh giá trị, sau đó nhấp "Truy vấn sổ đăng ký chính thức" để chạy đối chiếu.',
      transmitting: 'ĐANG TRUYỀN GÓI PII AN TOÀN...',
      encryptedTunnel: 'Đang kết nối qua đường hầm mã hóa SHA-256',
      overallIntegrity: 'Độ toàn vẹn đối chiếu tổng thể',
      confidence: 'Độ tin cậy',
      attributeMetrics: 'Chỉ số lưới thuộc tính',
      systemStatement: 'TUYÊN BỐ HỆ THỐNG:',
      protocol: 'Giao thức: điểm cuối xác thực SHA-256',
      certification: 'Hệ thống được chứng nhận ISO 27001',
      fields: {
        firstName: 'Tên',
        lastName: 'Họ',
        dobShort: 'Ngày sinh',
        dob: 'Ngày sinh',
        ssnEcbs: 'SSN (eCBSV)',
        stateDmv: 'Hồ sơ DMV của bang',
        zip: 'Mã ZIP',
        ssaSsn: 'Hồ sơ SSN của SSA',
        irsTin: 'IRS Taxpayer ID (TIN)',
        globalRegistry: 'Sổ đăng ký tổ chức tín dụng toàn cầu'
      },
      statuses: {
        MATCH: 'KHỚP',
        MISMATCH: 'KHÔNG KHỚP',
        VERIFIED: 'ĐÃ XÁC MINH',
        REJECTED: 'BỊ TỪ CHỐI',
        REVIEW_REQUIRED: 'CẦN ĐÁNH GIÁ'
      },
      unknown: 'Không xác định',
      summaries: {
        notFound: 'Không tìm thấy hồ sơ danh tính trong các nguồn chính thức đã chọn. Quy trình xác minh đối chiếu đã dừng.',
        passed: 'Xác thực với nguồn chính thức thành công với điểm khớp {score}%. Quyết định xác minh đã được phê duyệt.',
        review: 'Xác thực với nguồn chính thức trả về kết quả khớp một phần ({score}% điểm khớp). Khuyến nghị đánh giá nội bộ.'
      }
    },
    featuresBadge: 'Tính năng chính',
    featuresTitle: 'Mở rộng độ phủ, đáp ứng nhu cầu kinh doanh riêng và cải thiện trải nghiệm người dùng',
    featuresDesc: 'Tùy chỉnh và tự động hóa từng bước trong quy trình xác minh cơ sở dữ liệu để phù hợp với ngưỡng rủi ro động.',
    features: [
      {
        id: 'geo',
        title: 'Độ phủ địa lý toàn diện',
        desc: 'Xác thực PII đã thu thập và ID quốc gia với nguồn phát hành tại hơn 40 quốc gia mà không cần tích hợp nhiều nhà cung cấp.'
      },
      {
        id: 'match',
        title: 'Tiêu chí đối chiếu có thể cấu hình',
        desc: 'Chỉ định yêu cầu so sánh chính xác. Đặt quy tắc đối chiếu gần đúng cho tên, dung sai lỗi gõ và logic khớp trên mã bưu chính hoặc khoảng ngày sinh.'
      },
      {
        id: 'fill',
        title: 'Tự động điền địa chỉ',
        desc: 'Nâng cao chất lượng truy vấn bằng cách hỗ trợ người dùng hoàn tất địa chỉ. Chuẩn hóa dữ liệu nhập với thư mục bưu chính trước khi xác minh để giảm lỗi không khớp.'
      },
      {
        id: 'route',
        title: 'Định tuyến động',
        desc: 'Truy vấn liền mạch nhiều lớp cơ sở dữ liệu theo chuỗi. Nếu kiểm tra chính chưa rõ ràng, tự động chuyển sang nguồn dự phòng để tối đa hóa chuyển đổi.'
      }
    ],
    useCasesBadge: 'Vận hành kinh doanh',
    useCasesTitle: 'Cách các đội ngũ dùng kiểm tra cơ sở dữ liệu',
    useCases: [
      {
        title: 'Tuân thủ KYC/AML',
        desc: 'Đáp ứng yêu cầu quy định như xác minh không dựa trên giấy tờ bằng cách kiểm tra người dùng với cơ sở dữ liệu chính thức và nguồn phát hành. Tăng tốc tức thì cho khách hàng đáng tin cậy, rủi ro thấp.'
      },
      {
        title: 'Xác minh danh tính',
        desc: 'Xác minh danh tính của một cá nhân bằng cách đối chiếu thông tin của họ với cơ sở dữ liệu chính thức và nguồn phát hành. Liên kết thông tin xác thực động với ít ma sát.'
      },
      {
        title: 'Ma sát động',
        desc: 'Tự động điều chỉnh mức ma sát dựa trên kết quả đối chiếu. Ví dụ, tăng ma sát với người chỉ khớp một phần hoặc không có kết quả khớp bằng cách yêu cầu giấy tờ chứng minh hoặc selfie trực tiếp.'
      }
    ],
    keepLearning: 'Tiếp tục tìm hiểu',
    learning: [
      {
        meta: 'Bài viết - đọc 9 phút',
        title: 'Xác minh cơ sở dữ liệu phát hành là gì?',
        desc: 'Hiểu sự khác nhau giữa kiểm tra tổ chức tín dụng, sổ đăng ký hộ tịch và truy vấn cơ sở dữ liệu trực tiếp.'
      },
      {
        meta: 'Bài viết - đọc 6 phút',
        title: 'Cách nâng cao quyết định xác minh danh tính bằng kiểm tra AAMVA',
        desc: 'Hướng dẫn từng bước để tích hợp hồ sơ DMV của Hoa Kỳ nhằm phát hiện giấy phép lái xe giả tinh vi và ID do bang cấp.'
      },
      {
        meta: 'Hướng dẫn - đọc 12 phút',
        title: 'Hướng dẫn chiến lược cân bằng rủi ro và chuyển đổi',
        desc: 'Tối ưu hóa quy trình danh tính. Xác định nơi nên thêm kiểm tra ít ma sát và nơi cần kiểm tra bảo mật nghiêm ngặt.'
      }
    ],
    explorePlatform: 'Khám phá thêm nền tảng danh tính của Identra',
    platformLinks: [
      {
        title: 'Xác minh ID do chính phủ cấp trên toàn cầu.',
        cta: 'Xem xác minh ID chính phủ'
      },
      {
        title: 'Xây dựng luồng danh tính tốt hơn.',
        cta: 'Xem trình tạo Workflows'
      }
    ],
    faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      {
        q: 'Kiểm tra cơ sở dữ liệu của Identra hỗ trợ những quốc gia nào?',
        a: 'Chúng tôi tích hợp với nguồn chính thức, tổ chức tín dụng, sổ đăng ký hộ tịch và luồng dữ liệu tiện ích tại hơn 40 quốc gia. Bao gồm độ phủ sâu cho hồ sơ Hoa Kỳ (eCBSV, AAMVA DMV, IRS TIN), nguồn tín dụng Canada, chỉ mục hộ tịch châu Âu và hệ thống thuế tại APAC/Mỹ Latinh.'
      },
      {
        q: 'Kiểm tra truy vấn cơ sở dữ liệu hoàn tất nhanh đến mức nào?',
        a: 'Kiểm tra cơ sở dữ liệu được xử lý qua các kênh API trực tiếp an toàn và thường hoàn tất trong chưa đến 1 giây. Điều này phù hợp cho quy trình đăng ký khách hàng ít ma sát, tỷ lệ chuyển đổi cao.'
      },
      {
        q: 'Identra bảo vệ dữ liệu như thế nào khi truy vấn thông tin nhạy cảm (SSN, TIN, ngày sinh)?',
        a: 'Identra sử dụng các giao thức mã hóa hiện đại (AES-256 cho lưu trữ, TLS 1.3 khi truyền). Chúng tôi cũng cung cấp các kiểm soát giảm thiểu dữ liệu linh hoạt, cho phép tổ chức tự động che hoặc xóa thuộc tính nhạy cảm như SSN ngay sau khi quá trình xác minh hoàn tất.'
      }
    ],
    readyTitle: 'Sẵn sàng bắt đầu?',
    readyDesc: 'Liên hệ với chúng tôi hoặc bắt đầu khám phá Identra ngay hôm nay.',
    tryItNow: 'Thử ngay'
  }
};
