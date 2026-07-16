/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PAYMENTS_PAGE_TRANSLATIONS: any = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'Solutions - Payments',
    heroTitle: 'Frictionless compliance for global payments.',
    heroDesc: 'Embed flexible KYB/KYC and AML flows into your product to accelerate growth while maintaining robust cross-border compliance.',
    getDemo: 'Get a demo',
    trySandbox: 'Try identity sandbox',
    heroBenefits: [
      {
        title: 'Verify globally without complexity',
        desc: 'Verify individuals and businesses in more than 200 countries and territories with support for local documents, databases, and compliance regulations.'
      },
      {
        title: 'Onboard users faster with less friction',
        desc: 'Design conversion-optimized onboarding flows that let legitimate users and merchants start transacting instantly without roadblocks.'
      },
      {
        title: 'Streamline compliance and audit prep',
        desc: 'Adapt to evolving regulations like AMLD6 and FinCEN with customizable workflows that automate filings and centralize audit-ready logs.'
      }
    ],
    trust: {
      title: "Trusted by startups & the world's largest companies",
      logos: ['Petal', 'Payoneer', '[AngelList]', 'Branch Payments']
    },
    ecosystem: {
      title: 'Customize identity flows to fit your payments ecosystem',
      desc: 'Dynamically gather documentation, query authoritative sources, and perform compliance checks from a single, integrated console.',
      subtitle: 'Meet users where they are with global KYB/KYC',
      body: 'Collect and verify government IDs and documents across geographies, check them against authoritative sources, and screen for sanctions - all from a single platform.',
      bullets: [
        {
          title: '150+ Global Registry Databases',
          desc: 'Instant business corporate registration verification across global jurisdictions.'
        },
        {
          title: 'UBO Watchlist Matches',
          desc: 'Automated screening against active sanctions, PEPs, and local legal lists.'
        }
      ]
    },
    simulator: {
      terminalVersion: 'PAYMENTS_COMPLIANCE_v4.1',
      engine: 'LIVE RISK ENGINE',
      intro: 'Select an onboarding scenario to trigger real-time corporate KYB / KYC verification loops:',
      statuses: { verified: 'VERIFIED', review: 'REVIEW', block: 'BLOCK', clear: 'Clear', flags: 'Flags', blocked: 'Blocked' },
      scenarios: {
        soleProp: {
          merchantName: 'Alex Mercer (Mercer Organics LLC)',
          buttonTitle: 'Alex Mercer (Perfect Sole Proprietor)',
          buttonMeta: 'TIN Matched - Watchlist Clear - Auto-Verify',
          businessType: 'Organic Produce Retailer',
          country: 'United States',
          kybStatus: 'Verified',
          watchlistStatus: 'Clear',
          riskScore: 8,
          details: [
            'Active LLC filing matched with Delaware Secretary of State database.',
            'TIN perfectly verified with active IRS records.',
            "Sole proprietor selfie matched owner driver's license with 98.9% accuracy.",
            'PEP and OFAC sanction watchlists scanned: No matches found.'
          ]
        },
        crossBorder: {
          merchantName: 'Sato Precision Ltd (Hiroshi Sato)',
          buttonTitle: 'Sato Precision Ltd (Japan Cross-Border)',
          buttonMeta: 'Registry Active - Partial Watchlist Hit - Manual Review',
          businessType: 'Custom Parts Exporter',
          country: 'Japan',
          kybStatus: 'Review',
          watchlistStatus: 'Flags',
          riskScore: 54,
          details: [
            'Japan National Corporate Registry verified; standing is active.',
            'Beneficial owner identification matched national record.',
            'Partial sanction hit detected: Secondary match on a highly common name.',
            'Requires rapid compliance reviewer verification to clear false positive.'
          ]
        },
        shellRisk: {
          merchantName: 'Valyria Trade Corp (Precious Metals)',
          buttonTitle: 'Valyria Trade Corp (Seychelles High Risk)',
          buttonMeta: 'Registry Expired - Sanctions SDN Hit - Auto-Block',
          businessType: 'Brokerage & Shell Intermediary',
          country: 'Seychelles (High Risk Zone)',
          kybStatus: 'Block',
          watchlistStatus: 'Blocked',
          riskScore: 94,
          details: [
            'Seychelles business registry check failed: Corporate entity dissolved.',
            'Ultimate Beneficial Owner (UBO) matches active OFAC SDN list (Sanctioned).',
            'IP Address originates from masked proxy / residential VPN exit node.',
            'Risk Engine: Automated platform block initiated instantly.'
          ]
        }
      },
      logs: {
        step1: '[1/4] Initiating KYB Check on business entity: "{merchant}"...',
        registry: '[Registry Audit] Querying official Secretary of State / National Registry databases...',
        step2: '[2/4] Verifying Tax Identification Numbers (TIN / EIN / VAT)...',
        tax: '[IRS / Revenue] Tax validation response: {taxStatus} format.',
        active: 'ACTIVE',
        failed: 'FAILED / Dissolved',
        step3: '[3/4] Performing Sanctions & PEP Watchlist screening on Ultimate Beneficial Owners (UBOs)...',
        watchlist: '[Compliance Shield] Watchlist Check Status: {status}.',
        step4: '[4/4] Evaluating network intelligence & transaction risk signals...',
        decision: '[Risk Decision Engine] Computed Risk Score: {score}/100. Resolution: {resolution}.'
      },
      signalsTitle: 'Automated Resolution Signals',
      reset: 'Reset Terminal',
      configure: 'Configure Rules',
      loading: 'Reaching national database clusters and executing sanction matching algorithms...'
    },
    friction: {
      mockupTitle: 'Risk Assessment Block',
      riskBadge: 'High Risk IP Detected',
      rows: [
        { label: 'Device Fingerprint', value: 'Tor Network', desc: 'The connection was established through a masked node in Europe.' },
        { label: 'Behavioral Signature', value: 'Copied Clipboard PII', desc: 'User copied name and credit card fields instead of typing naturally.' }
      ],
      checkTitle: 'Dynamic Multi-Factor Check',
      checkDesc: 'Smarter friction enabled: Require government selfie verification.',
      badge: 'Dynamic Friction Controls',
      title: 'Power smarter friction with smarter signals',
      desc: 'Dynamically adjust friction using device, behavioral, and risk signals to reduce manual reviews and boost conversion. When risk is low, let users bypass redundant verification gates entirely. When risk is elevated, prompt users for automated multi-factor steps like a live-blink selfie or address lookup.',
      cta: 'Configure Friction Workflows'
    },
    hub: {
      badge: 'Unified Hub',
      title: 'Unify all your data in a single platform',
      desc: 'Configure KYB, KYC, and AML flows for onboarding and ongoing due diligence with a platform that scales with your business. Say goodbye to scattered API logs, manually compiled PDFs, and fractured merchant profiles. Maintain full visibility over corporate identities, beneficial owners, and risk histories inside an intuitive audit log.',
      bullets: [
        'Consolidated merchant dashboard logs.',
        'Real-time synchronization with Salesforce, Zendesk, or Slack.',
        'Granular redaction settings to meet sensitive GDPR and CCPA policies.'
      ],
      mockupTitle: 'Ongoing Monitoring Suite',
      automated: 'AUTOMATED',
      flowActive: 'FLOW ACTIVE',
      rows: [
        { title: 'Periodic Watchlist Scan', desc: 'Scans 4,500+ sanctions databases daily', status: 'automated' },
        { title: 'Risk Profile Adjustment', desc: 'Detects changes to merchant corporate classification', status: 'automated' },
        { title: 'Re-verification Trigger', desc: 'Forces renewal when corporate registrations expire', status: 'flow' }
      ]
    },
    useCases: {
      label: 'Use Cases',
      title: 'KYB and KYC that moves at the speed of payments',
      desc: 'Streamline compliance checks across every point of your payment lifecycle.',
      tabs: [
        {
          id: 'onboard',
          label: 'Onboard faster',
          title: 'Accelerate Onboarding & Underwriting',
          desc: 'Accelerate time to the first transaction with streamlined ID and business verification. Design tailored web or mobile onboarding flows that verify entity standing and beneficial owner identities in parallel. By combining KYB and KYC checks into a unified workflow, payments companies reduce friction for genuine merchants and customers.'
        },
        {
          id: 'monitor',
          label: 'Monitor dynamically',
          title: 'Ongoing Transaction & Risk Auditing',
          desc: 'Assess risk dynamically over time instead of only at signup. Set automated triggers that screen merchant databases for new adverse media listings or registry standing changes, and trigger active step-up reviews if high-risk actions are initiated. Protect against transaction laundering, merchant fraud, and credit chargeback threats before they impact your financial metrics.'
        },
        {
          id: 'comply',
          label: 'Stay compliant as regulations evolve',
          title: 'Adaptable Legal Compliance Safeguards',
          desc: 'Remain fully compliant as domestic and international regulations evolve. Implement local data storage configurations, configure custom risk assessment rules, and satisfy FinCEN and European AMLD6 mandates. Rest easy knowing Identra supports custom business associate agreement (BAA) profiles and secure, encrypted storage.'
        }
      ]
    },
    features: {
      title: 'Customize identity workflows to fit your payments business',
      desc: 'Tailor every check to your specific geographic markets, target business segments, and risk posture.',
      cards: [
        { title: 'Global coverage', desc: 'Reduce integration time and accelerate entity onboarding with access to more than 150 global data sources through a single integration.' },
        { title: 'Flexible document collection', desc: 'Collect and verify any documentation, such as business registrations or certificates of incorporation, regardless of format, and extract the data you need.' },
        { title: 'Secretary of state business entity search', desc: "Examine and retrieve secretary of state filings for a deeper look at a business's good standing status." },
        { title: 'TIN and VAT verification', desc: 'Verify tax numbers in the US and globally with instant authoritative network validation.' },
        { title: 'Industry classification', desc: 'Assess business risk using automated NAICS and MCC classification indexes to prevent merchant fraud.' },
        { title: 'Financial data', desc: "Assess a company's financial health by checking for open liens and judgments or enriching data via Identra Marketplace integrations." },
        { title: 'Business owner screening', desc: 'Choose from a comprehensive range of verification methods to screen UBOs against watchlists, adverse media reports, and more.' },
        { title: 'Custom Workflows', desc: 'Create custom automations and tailor every aspect of the KYB process, including integrations with systems like Salesforce and Zendesk.' },
        { title: 'Automatic audit logs', desc: 'Maintain logs of all KYB and KYC identity checks and decisions in one place to create an audit trail without storing PII in your own system.' }
      ]
    },
    demo: {
      badge: 'Live Demo Environment',
      title: 'Start your custom demo',
      desc: "Tell us a bit about yourself and we'll personalize the experience - no sales call required.",
      app: 'checkout_onboarding.app',
      merchantApplication: 'Merchant Application',
      identityVerified: 'Identity Verified',
      kybAudit: 'KYB Registry Audit',
      launchSandbox: 'Launch Sandbox',
      firstName: 'First Name *',
      lastName: 'Last Name *',
      workEmail: 'Work Email *',
      companyWebsite: 'Company Website',
      companyName: 'Company Name *',
      jobTitle: 'Job Title',
      placeholders: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        website: 'https://company.com',
        companyName: 'E.g. Paytech LLC',
        jobTitle: 'Compliance Manager'
      },
      viewDemo: 'View Demo',
      requiredAlert: 'Please fill out all required fields.',
      successTitle: 'Sandbox Code Generated!',
      successDesc: "Hi {firstName}, we've generated a persistent sandbox developer token for {companyName}. Check your inbox at {email} to finalize onboarding configuration.",
      submitAnother: 'Submit another request'
    },
    help: {
      title: 'How Identra can help',
      desc: 'Simplify global compliance with fast, scalable solutions.',
      cards: [
        { title: 'Remittance compliance', desc: 'Verify senders and recipients in real time, screen for sanctions, and satisfy cross-border AML requirements without adding unnecessary friction to the customer experience.' },
        { title: 'POS and in-person payments', desc: 'Enable fast, compliant onboarding for brick-and-mortar merchants with flexible document collection and instant registry lookup across diverse global jurisdictions.' },
        { title: 'B2B payments and platforms', desc: 'Verify complex corporate structures, beneficial owners (UBOs), and tax filings to establish robust trust for high-value accounts payable and receivable workflows.' }
      ]
    },
    testimonial: {
      quote: '"We want to automate the decision making process as much as possible during KYB and KYC. Identra not only lets us do that and saves us time but also ensures that we can be flexible with changing our workflows and rules when we discover new fraud rings."',
      name: 'Amanda Hodgetts-Martin',
      title: 'Director of risk management at Branch',
      cta: 'Read case study'
    },
    explore: {
      title: "Explore more of Identra's identity platform",
      cards: [
        { view: 'platform', title: 'Expand globally with international KYB/KYC.' },
        { view: 'kyb', title: 'Verify any business and the people behind them with integrated KYB-KYC.' }
      ]
    },
    finalCta: {
      title: 'Want to move money and not get bottlenecked?',
      desc: 'See how Identra helps global payments companies streamline compliance without sacrificing speed.',
      primary: 'Get a demo',
      secondary: 'Try it now'
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Soluciones - Pagos',
    heroTitle: 'Cumplimiento sin fricción para pagos globales.',
    heroDesc: 'Integra flujos flexibles de KYB/KYC y AML en tu producto para acelerar el crecimiento mientras mantienes un cumplimiento transfronterizo sólido.',
    getDemo: 'Solicitar una demo',
    trySandbox: 'Probar sandbox de identidad',
    heroBenefits: [
      { title: 'Verifica globalmente sin complejidad', desc: 'Verifica personas y empresas en más de 200 países y territorios con soporte para documentos locales, bases de datos y regulaciones de cumplimiento.' },
      { title: 'Incorpora usuarios más rápido y con menos fricción', desc: 'Diseña flujos optimizados para conversión que permiten a usuarios y comercios legítimos empezar a transaccionar al instante.' },
      { title: 'Simplifica cumplimiento y auditoría', desc: 'Adáptate a normas como AMLD6 y FinCEN con workflows configurables que automatizan reportes y centralizan logs listos para auditoría.' }
    ],
    trust: { title: 'Con la confianza de startups y de las empresas más grandes del mundo', logos: ['Petal', 'Payoneer', '[AngelList]', 'Branch Payments'] },
    ecosystem: {
      title: 'Personaliza flujos de identidad para tu ecosistema de pagos',
      desc: 'Recopila documentación, consulta fuentes autorizadas y ejecuta controles de cumplimiento desde una consola integrada.',
      subtitle: 'Llega a los usuarios donde estén con KYB/KYC global',
      body: 'Recopila y verifica IDs gubernamentales y documentos en distintas geografías, contrástalos con fuentes autorizadas y filtra sanciones desde una sola plataforma.',
      bullets: [
        { title: 'Más de 150 bases registrales globales', desc: 'Verificación instantánea de registros corporativos en jurisdicciones globales.' },
        { title: 'Coincidencias UBO en listas de vigilancia', desc: 'Filtrado automático contra sanciones activas, PEPs y listas legales locales.' }
      ]
    },
    simulator: {
      terminalVersion: 'PAYMENTS_COMPLIANCE_v4.1',
      engine: 'MOTOR DE RIESGO EN VIVO',
      intro: 'Selecciona un escenario de onboarding para activar bucles KYB / KYC corporativos en tiempo real:',
      statuses: { verified: 'VERIFICADO', review: 'REVISIÓN', block: 'BLOQUEO', clear: 'Limpio', flags: 'Alertas', blocked: 'Bloqueado' },
      scenarios: {
        soleProp: {
          merchantName: 'Alex Mercer (Mercer Organics LLC)', buttonTitle: 'Alex Mercer (propietario perfecto)', buttonMeta: 'TIN coincidente - Lista limpia - Verificación automática', businessType: 'Minorista de productos orgánicos', country: 'Estados Unidos', kybStatus: 'Verified', watchlistStatus: 'Clear', riskScore: 8,
          details: ['Registro LLC activo coincidente con Delaware Secretary of State.', 'TIN verificado perfectamente con registros activos del IRS.', 'Selfie del propietario coincide con licencia de conducir con 98,9% de precisión.', 'Listas PEP y OFAC escaneadas: sin coincidencias.']
        },
        crossBorder: {
          merchantName: 'Sato Precision Ltd (Hiroshi Sato)', buttonTitle: 'Sato Precision Ltd (Japón transfronterizo)', buttonMeta: 'Registro activo - Coincidencia parcial - Revisión manual', businessType: 'Exportador de piezas personalizadas', country: 'Japón', kybStatus: 'Review', watchlistStatus: 'Flags', riskScore: 54,
          details: ['Registro corporativo nacional de Japón verificado; estado activo.', 'Identificación del beneficiario final coincide con registro nacional.', 'Coincidencia parcial de sanciones: coincidencia secundaria en nombre muy común.', 'Requiere revisión rápida de cumplimiento para descartar falso positivo.']
        },
        shellRisk: {
          merchantName: 'Valyria Trade Corp (metales preciosos)', buttonTitle: 'Valyria Trade Corp (Seychelles alto riesgo)', buttonMeta: 'Registro vencido - SDN sanciones - Bloqueo automático', businessType: 'Intermediario y sociedad pantalla', country: 'Seychelles (zona de alto riesgo)', kybStatus: 'Block', watchlistStatus: 'Blocked', riskScore: 94,
          details: ['Falló la comprobación del registro empresarial de Seychelles: entidad disuelta.', 'El UBO coincide con lista activa OFAC SDN (sancionado).', 'La dirección IP proviene de proxy enmascarado / nodo VPN residencial.', 'Motor de riesgo: bloqueo automático iniciado al instante.']
        }
      },
      logs: {
        step1: '[1/4] Iniciando verificación KYB de la entidad: "{merchant}"...', registry: '[Auditoría registral] Consultando bases oficiales...', step2: '[2/4] Verificando números fiscales (TIN / EIN / VAT)...', tax: '[IRS / Hacienda] Respuesta fiscal: formato {taxStatus}.', active: 'ACTIVO', failed: 'FALLIDO / Disuelto', step3: '[3/4] Filtrando sanciones y PEP sobre UBOs...', watchlist: '[Escudo de cumplimiento] Estado de lista de vigilancia: {status}.', step4: '[4/4] Evaluando inteligencia de red y señales transaccionales...', decision: '[Motor de riesgo] Puntuación: {score}/100. Resolución: {resolution}.'
      },
      signalsTitle: 'Señales de resolución automática',
      reset: 'Reiniciar terminal',
      configure: 'Configurar reglas',
      loading: 'Conectando con bases nacionales y ejecutando algoritmos de coincidencia de sanciones...'
    },
    friction: {
      mockupTitle: 'Bloque de evaluación de riesgo', riskBadge: 'IP de alto riesgo detectada',
      rows: [{ label: 'Huella del dispositivo', value: 'Red Tor', desc: 'La conexión se estableció mediante un nodo enmascarado en Europa.' }, { label: 'Firma conductual', value: 'PII pegada desde portapapeles', desc: 'El usuario copió nombre y tarjeta de crédito en vez de escribirlos naturalmente.' }],
      checkTitle: 'Verificación multifactor dinámica', checkDesc: 'Fricción inteligente activada: requiere verificación de selfie gubernamental.', badge: 'Controles dinámicos de fricción', title: 'Impulsa fricción más inteligente con mejores señales', desc: 'Ajusta dinámicamente la fricción usando señales de dispositivo, comportamiento y riesgo para reducir revisiones manuales y aumentar conversión. Si el riesgo es bajo, omite controles redundantes. Si sube, solicita pasos automatizados como selfie en vivo o address lookup.', cta: 'Configurar workflows de fricción'
    },
    hub: {
      badge: 'Centro unificado', title: 'Unifica todos tus datos en una sola plataforma', desc: 'Configura flujos KYB, KYC y AML para onboarding y debida diligencia continua con una plataforma que escala con tu negocio. Elimina logs dispersos, PDFs manuales y perfiles fragmentados.', bullets: ['Logs consolidados del panel de comercios.', 'Sincronización en tiempo real con Salesforce, Zendesk o Slack.', 'Configuración granular de redacción para GDPR y CCPA.'], mockupTitle: 'Suite de monitoreo continuo', automated: 'AUTOMATIZADO', flowActive: 'FLUJO ACTIVO',
      rows: [{ title: 'Escaneo periódico de listas', desc: 'Escanea 4.500+ bases de sanciones diariamente', status: 'automated' }, { title: 'Ajuste de perfil de riesgo', desc: 'Detecta cambios en la clasificación corporativa del comercio', status: 'automated' }, { title: 'Disparador de reverificación', desc: 'Fuerza renovación cuando vencen registros corporativos', status: 'flow' }]
    },
    useCases: {
      label: 'Casos de uso', title: 'KYB y KYC a la velocidad de los pagos', desc: 'Simplifica controles de cumplimiento en cada punto del ciclo de pagos.',
      tabs: [
        { id: 'onboard', label: 'Onboarding más rápido', title: 'Acelera onboarding y underwriting', desc: 'Reduce el tiempo hasta la primera transacción con verificación de ID y negocio optimizada. Diseña flujos web o móviles que verifican entidad y beneficiarios finales en paralelo.' },
        { id: 'monitor', label: 'Monitorea dinámicamente', title: 'Auditoría continua de transacciones y riesgo', desc: 'Evalúa el riesgo con el tiempo, no solo al registrarse. Configura disparadores que revisen bases de comercios y activen revisiones reforzadas ante acciones de alto riesgo.' },
        { id: 'comply', label: 'Cumple mientras cambian las normas', title: 'Salvaguardas legales adaptables', desc: 'Mantén cumplimiento mientras evolucionan regulaciones locales e internacionales. Configura almacenamiento local, reglas de riesgo y mandatos FinCEN y AMLD6.' }
      ]
    },
    features: {
      title: 'Personaliza workflows de identidad para tu negocio de pagos', desc: 'Adapta cada comprobación a tus mercados, segmentos y postura de riesgo.',
      cards: [
        { title: 'Cobertura global', desc: 'Reduce tiempo de integración y acelera onboarding con más de 150 fuentes globales en una integración.' },
        { title: 'Colección flexible de documentos', desc: 'Recopila y verifica cualquier documentación, sin importar formato, y extrae los datos necesarios.' },
        { title: 'Búsqueda registral de entidades', desc: 'Examina registros oficiales para conocer mejor el buen estado de una empresa.' },
        { title: 'Verificación TIN y VAT', desc: 'Verifica números fiscales en EE. UU. y globalmente con validación autorizada instantánea.' },
        { title: 'Clasificación industrial', desc: 'Evalúa riesgo usando índices NAICS y MCC automatizados para prevenir fraude de comercios.' },
        { title: 'Datos financieros', desc: 'Evalúa salud financiera con liens, sentencias o integraciones de Identra Marketplace.' },
        { title: 'Screening de propietarios', desc: 'Filtra UBOs contra listas, medios adversos y más.' },
        { title: 'Workflows personalizados', desc: 'Crea automatizaciones y adapta KYB, incluyendo integraciones con Salesforce y Zendesk.' },
        { title: 'Logs automáticos de auditoría', desc: 'Mantén checks y decisiones KYB/KYC en un solo lugar sin almacenar PII en tu sistema.' }
      ]
    },
    demo: {
      badge: 'Entorno de demo en vivo', title: 'Inicia tu demo personalizada', desc: 'Cuéntanos un poco sobre ti y personalizaremos la experiencia, sin llamada de ventas.', app: 'checkout_onboarding.app', merchantApplication: 'Solicitud de comercio', identityVerified: 'Identidad verificada', kybAudit: 'Auditoría registral KYB', launchSandbox: 'Iniciar sandbox', firstName: 'Nombre *', lastName: 'Apellido *', workEmail: 'Email laboral *', companyWebsite: 'Sitio web de la empresa', companyName: 'Nombre de empresa *', jobTitle: 'Cargo', placeholders: { firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@empresa.com', website: 'https://empresa.com', companyName: 'Ej. Paytech LLC', jobTitle: 'Gerente de cumplimiento' }, viewDemo: 'Ver demo', requiredAlert: 'Completa todos los campos obligatorios.', successTitle: 'Código de sandbox generado', successDesc: 'Hola {firstName}, generamos un token persistente de desarrollador para {companyName}. Revisa tu correo {email} para finalizar la configuración.', submitAnother: 'Enviar otra solicitud'
    },
    help: { title: 'Cómo puede ayudar Identra', desc: 'Simplifica el cumplimiento global con soluciones rápidas y escalables.', cards: [{ title: 'Cumplimiento en remesas', desc: 'Verifica remitentes y destinatarios en tiempo real, filtra sanciones y cumple AML transfronterizo sin fricción innecesaria.' }, { title: 'POS y pagos presenciales', desc: 'Onboarding rápido y conforme para comercios físicos con documentos flexibles y consulta registral instantánea.' }, { title: 'Pagos B2B y plataformas', desc: 'Verifica estructuras corporativas, UBOs y declaraciones fiscales para flujos de alto valor.' }] },
    testimonial: { quote: '"Queremos automatizar el proceso de decisión tanto como sea posible durante KYB y KYC. Identra nos permite hacerlo, nos ahorra tiempo y nos da flexibilidad para cambiar workflows y reglas cuando descubrimos nuevos grupos de fraude."', name: 'Amanda Hodgetts-Martin', title: 'Directora de gestión de riesgo en Branch', cta: 'Leer caso de estudio' },
    explore: { title: 'Explora más de la plataforma de identidad de Identra', cards: [{ view: 'platform', title: 'Expándete globalmente con KYB/KYC internacional.' }, { view: 'kyb', title: 'Verifica cualquier empresa y las personas detrás de ella con KYB-KYC integrado.' }] },
    finalCta: { title: '¿Quieres mover dinero sin cuellos de botella?', desc: 'Descubre cómo Identra ayuda a empresas de pagos globales a simplificar cumplimiento sin sacrificar velocidad.', primary: 'Solicitar una demo', secondary: 'Pruébalo ahora' }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: 'ソリューション - 決済',
    heroTitle: 'グローバル決済のための摩擦のないコンプライアンス。',
    heroDesc: '柔軟な KYB/KYC と AML フローを製品に組み込み、強固な越境コンプライアンスを保ちながら成長を加速します。',
    getDemo: 'デモを依頼',
    trySandbox: '本人確認サンドボックスを試す',
    heroBenefits: [
      { title: '複雑さなしにグローバル検証', desc: '200 以上の国と地域で、現地書類、データベース、規制に対応しながら個人と事業者を検証します。' },
      { title: '少ない摩擦でより早くオンボード', desc: '正当なユーザーと加盟店がすぐに取引を開始できる、コンバージョン重視のオンボーディングを設計できます。' },
      { title: 'コンプライアンスと監査準備を効率化', desc: 'AMLD6 や FinCEN など進化する規制に合わせ、申告を自動化し監査ログを一元化します。' }
    ],
    trust: { title: 'スタートアップから世界最大級の企業まで信頼されています', logos: ['Petal', 'Payoneer', '[AngelList]', 'Branch Payments'] },
    ecosystem: {
      title: '決済エコシステムに合わせて本人確認フローをカスタマイズ',
      desc: '書類収集、公式ソース照会、コンプライアンスチェックを単一の統合コンソールから動的に実行します。',
      subtitle: 'グローバル KYB/KYC でユーザーに合わせる',
      body: '地域をまたいで政府 ID と書類を収集・検証し、公式ソースと照合し、制裁リストをスクリーニングします。',
      bullets: [
        { title: '150+ のグローバル登記データベース', desc: '世界の管轄区域で法人登記を即時検証します。' },
        { title: 'UBO ウォッチリスト照合', desc: '制裁、PEP、現地法令リストを自動スクリーニングします。' }
      ]
    },
    simulator: {
      terminalVersion: 'PAYMENTS_COMPLIANCE_v4.1',
      engine: 'ライブリスクエンジン',
      intro: 'オンボーディングシナリオを選び、法人 KYB / KYC 検証ループをリアルタイムで実行します:',
      statuses: { verified: '検証済み', review: 'レビュー', block: 'ブロック', clear: 'クリア', flags: 'フラグ', blocked: 'ブロック済み' },
      scenarios: {
        soleProp: { merchantName: 'Alex Mercer (Mercer Organics LLC)', buttonTitle: 'Alex Mercer (理想的な個人事業主)', buttonMeta: 'TIN 一致 - ウォッチリストなし - 自動検証', businessType: '有機農産物小売', country: 'United States', kybStatus: 'Verified', watchlistStatus: 'Clear', riskScore: 8, details: ['Delaware Secretary of State のデータベースと有効な LLC 登記が一致しました。', 'TIN は有効な IRS 記録で完全に検証されました。', '個人事業主のセルフィーが運転免許証と 98.9% の精度で一致しました。', 'PEP と OFAC 制裁リストをスキャン: 一致なし。'] },
        crossBorder: { merchantName: 'Sato Precision Ltd (Hiroshi Sato)', buttonTitle: 'Sato Precision Ltd (日本・越境)', buttonMeta: '登記有効 - 部分一致 - 手動レビュー', businessType: 'カスタム部品輸出業者', country: 'Japan', kybStatus: 'Review', watchlistStatus: 'Flags', riskScore: 54, details: ['日本の法人登記を検証済み。状態は有効です。', '実質的支配者の識別情報が国の記録と一致しました。', '制裁リストの部分一致を検出: 一般的な氏名で二次一致。', '誤検知を解消するため、迅速なコンプライアンスレビューが必要です。'] },
        shellRisk: { merchantName: 'Valyria Trade Corp (Precious Metals)', buttonTitle: 'Valyria Trade Corp (Seychelles 高リスク)', buttonMeta: '登記失効 - SDN 制裁一致 - 自動ブロック', businessType: '仲介・シェル事業者', country: 'Seychelles (高リスク地域)', kybStatus: 'Block', watchlistStatus: 'Blocked', riskScore: 94, details: ['Seychelles 事業登記チェック失敗: 法人は解散済み。', 'UBO が有効な OFAC SDN リストに一致しました。', 'IP アドレスはマスクされたプロキシ / 住宅 VPN 出口ノードから発信。', 'リスクエンジン: 自動プラットフォームブロックを即時開始。'] }
      },
      logs: { step1: '[1/4] 事業体 "{merchant}" の KYB チェックを開始...', registry: '[登記監査] 公式登記データベースを照会中...', step2: '[2/4] 税番号 (TIN / EIN / VAT) を検証中...', tax: '[IRS / Revenue] 税務検証応答: {taxStatus} 形式。', active: '有効', failed: '失敗 / 解散済み', step3: '[3/4] UBO の制裁・PEP ウォッチリストをスクリーニング中...', watchlist: '[コンプライアンスシールド] ウォッチリスト状態: {status}。', step4: '[4/4] ネットワーク情報と取引リスクシグナルを評価中...', decision: '[リスク判断エンジン] リスクスコア: {score}/100。解決: {resolution}。' },
      signalsTitle: '自動解決シグナル',
      reset: '端末をリセット',
      configure: 'ルールを設定',
      loading: '各国データベースクラスタへ接続し、制裁照合アルゴリズムを実行中...'
    },
    friction: {
      mockupTitle: 'リスク評価ブロック', riskBadge: '高リスク IP を検出', rows: [{ label: 'デバイスフィンガープリント', value: 'Tor Network', desc: '接続はヨーロッパのマスクされたノード経由で確立されました。' }, { label: '行動シグネチャ', value: 'クリップボード PII をコピー', desc: 'ユーザーは氏名とクレジットカード項目を自然入力ではなくコピーしました。' }], checkTitle: '動的多要素チェック', checkDesc: 'スマートな摩擦を有効化: 政府 ID セルフィー検証を要求。', badge: '動的摩擦コントロール', title: 'より賢いシグナルで摩擦を最適化', desc: 'デバイス、行動、リスクシグナルに基づいて摩擦を動的に調整し、手動レビューを減らしてコンバージョンを高めます。', cta: '摩擦ワークフローを設定'
    },
    hub: {
      badge: '統合ハブ', title: 'すべてのデータを単一プラットフォームに統合', desc: '事業の成長に合わせて拡張できるプラットフォームで、オンボーディングと継続的デューデリジェンス向けの KYB、KYC、AML フローを設定できます。', bullets: ['加盟店ダッシュボードログを統合。', 'Salesforce、Zendesk、Slack とリアルタイム同期。', 'GDPR と CCPA に対応する詳細な編集設定。'], mockupTitle: '継続監視スイート', automated: '自動', flowActive: 'フロー有効', rows: [{ title: '定期ウォッチリストスキャン', desc: '4,500+ の制裁データベースを毎日スキャン', status: 'automated' }, { title: 'リスクプロファイル調整', desc: '加盟店の法人分類変更を検出', status: 'automated' }, { title: '再検証トリガー', desc: '法人登記が失効すると更新を強制', status: 'flow' }]
    },
    useCases: { label: 'ユースケース', title: '決済の速度で動く KYB と KYC', desc: '決済ライフサイクルのあらゆる地点でコンプライアンスチェックを効率化します。', tabs: [{ id: 'onboard', label: 'より早くオンボード', title: 'オンボーディングと審査を加速', desc: 'ID と事業確認を効率化し、初回取引までの時間を短縮します。' }, { id: 'monitor', label: '動的に監視', title: '継続的な取引・リスク監査', desc: '登録時だけでなく時間の経過に伴ってリスクを評価します。' }, { id: 'comply', label: '規制変化に対応', title: '適応可能な法令遵守ガード', desc: '国内外の規制が変化してもコンプライアンスを維持します。' }] },
    features: { title: '決済事業に合わせて本人確認ワークフローをカスタマイズ', desc: '市場、事業セグメント、リスク姿勢に合わせて各チェックを調整します。', cards: [{ title: 'グローバル対応', desc: '単一統合で 150 以上のグローバルデータソースへアクセスし、オンボーディングを加速します。' }, { title: '柔軟な書類収集', desc: '形式を問わず事業登記や設立証明などを収集・検証します。' }, { title: '事業体登記検索', desc: '公的登記を取得し、事業の良好な状態を確認します。' }, { title: 'TIN と VAT 検証', desc: '米国および世界の税番号を公式ネットワークで即時検証します。' }, { title: '業種分類', desc: 'NAICS と MCC 分類で事業リスクを評価します。' }, { title: '財務データ', desc: '担保権や判決、Marketplace 連携で財務健全性を評価します。' }, { title: '事業主スクリーニング', desc: 'UBO をウォッチリストや adverse media などで確認します。' }, { title: 'カスタムワークフロー', desc: 'KYB プロセスのあらゆる側面を自動化・調整します。' }, { title: '自動監査ログ', desc: 'KYB/KYC チェックと判断を一箇所に記録します。' }] },
    demo: { badge: 'ライブデモ環境', title: 'カスタムデモを開始', desc: '少し情報を入力すると、営業電話なしで体験をパーソナライズします。', app: 'checkout_onboarding.app', merchantApplication: '加盟店申請', identityVerified: '本人確認済み', kybAudit: 'KYB 登記監査', launchSandbox: 'サンドボックスを起動', firstName: '名 *', lastName: '姓 *', workEmail: '勤務先メール *', companyWebsite: '会社 Web サイト', companyName: '会社名 *', jobTitle: '役職', placeholders: { firstName: 'Taro', lastName: 'Yamada', email: 'taro.yamada@company.com', website: 'https://company.com', companyName: '例: Paytech LLC', jobTitle: 'コンプライアンスマネージャー' }, viewDemo: 'デモを見る', requiredAlert: '必須項目をすべて入力してください。', successTitle: 'サンドボックスコードを生成しました', successDesc: '{firstName} さん、{companyName} 用の永続サンドボックス開発者トークンを生成しました。{email} の受信箱を確認して設定を完了してください。', submitAnother: '別のリクエストを送信' },
    help: { title: 'Identra でできること', desc: '高速で拡張可能なソリューションによりグローバルコンプライアンスを簡素化します。', cards: [{ title: '送金コンプライアンス', desc: '送金者と受取人をリアルタイムで検証し、制裁チェックを行います。' }, { title: 'POS と対面決済', desc: '実店舗加盟店の迅速で準拠したオンボーディングを実現します。' }, { title: 'B2B 決済とプラットフォーム', desc: '複雑な法人構造、UBO、税務申告を検証します。' }] },
    testimonial: { quote: '「KYB と KYC の意思決定をできる限り自動化したいと考えています。Identra はそれを実現して時間を節約するだけでなく、新しい不正リングを発見したときにワークフローやルールを柔軟に変更できます。」', name: 'Amanda Hodgetts-Martin', title: 'Branch リスク管理ディレクター', cta: '事例を読む' },
    explore: { title: 'Identra の本人確認プラットフォームをさらに見る', cards: [{ view: 'platform', title: '国際 KYB/KYC でグローバルに拡大。' }, { view: 'kyb', title: '統合 KYB-KYC であらゆる事業と関係者を検証。' }] },
    finalCta: { title: '資金移動を滞らせたくありませんか？', desc: 'Identra がグローバル決済企業のコンプライアンスを速度を犠牲にせず効率化する方法をご覧ください。', primary: 'デモを依頼', secondary: '今すぐ試す' }
  },
  de: {} as any,
  vi: {} as any
};


PAYMENTS_PAGE_TRANSLATIONS.de = {
  backToPlatform: 'Zurück zur Plattform',
  badge: 'Lösungen - Zahlungen',
  heroTitle: 'Reibungslose Compliance für globale Zahlungen.',
  heroDesc: 'Binden Sie flexible KYB/KYC- und AML-Abläufe in Ihr Produkt ein, um Wachstum zu beschleunigen und zugleich robuste grenzüberschreitende Compliance zu wahren.',
  getDemo: 'Demo anfragen',
  trySandbox: 'Identity-Sandbox testen',
  heroBenefits: [
    { title: 'Weltweit verifizieren, ohne Komplexität', desc: 'Verifizieren Sie Personen und Unternehmen in mehr als 200 Ländern und Regionen mit Unterstützung für lokale Dokumente, Datenbanken und Compliance-Vorgaben.' },
    { title: 'Nutzer schneller mit weniger Reibung onboarden', desc: 'Gestalten Sie konversionsstarke Onboarding-Abläufe, damit legitime Nutzer und Händler ohne Hürden sofort Transaktionen starten können.' },
    { title: 'Compliance und Audit-Vorbereitung vereinfachen', desc: 'Reagieren Sie auf Vorschriften wie AMLD6 und FinCEN mit anpassbaren Workflows, die Meldungen automatisieren und auditfähige Protokolle bündeln.' }
  ],
  trust: { title: 'Vertraut von Startups und den größten Unternehmen der Welt', logos: ['Petal', 'Payoneer', '[AngelList]', 'Branch Payments'] },
  ecosystem: {
    title: 'Identitätsabläufe passend zu Ihrem Zahlungsökosystem anpassen',
    desc: 'Sammeln Sie Dokumente dynamisch, fragen Sie offizielle Quellen ab und führen Sie Compliance-Prüfungen aus einer integrierten Konsole durch.',
    subtitle: 'Nutzer überall mit globalem KYB/KYC erreichen',
    body: 'Erfassen und prüfen Sie Ausweise und Dokumente über Regionen hinweg, gleichen Sie sie mit offiziellen Quellen ab und prüfen Sie Sanktionslisten auf einer Plattform.',
    bullets: [
      { title: 'Über 150 globale Registerdatenbanken', desc: 'Sofortige Prüfung von Unternehmensregistrierungen über internationale Rechtsräume hinweg.' },
      { title: 'UBO-Abgleich mit Beobachtungslisten', desc: 'Automatisierte Prüfung gegen aktive Sanktionen, PEPs und lokale Rechtslisten.' }
    ]
  },
  simulator: {
    terminalVersion: 'PAYMENTS_COMPLIANCE_v4.1',
    engine: 'LIVE-RISIKO-ENGINE',
    intro: 'Wählen Sie ein Onboarding-Szenario aus, um KYB/KYC-Prüfschleifen in Echtzeit auszulösen:',
    statuses: { verified: 'VERIFIZIERT', review: 'PRÜFUNG', block: 'SPERREN', clear: 'Unauffällig', flags: 'Hinweise', blocked: 'Gesperrt' },
    scenarios: {
      soleProp: {
        merchantName: 'Alex Mercer (Mercer Organics LLC)',
        buttonTitle: 'Alex Mercer (idealer Einzelunternehmer)',
        buttonMeta: 'TIN stimmt überein - Beobachtungsliste unauffällig - automatisch verifizieren',
        businessType: 'Einzelhandel für Bio-Produkte',
        country: 'Vereinigte Staaten',
        kybStatus: 'Verified',
        watchlistStatus: 'Clear',
        riskScore: 8,
        details: [
          'Aktive LLC-Eintragung mit der Datenbank des Delaware Secretary of State abgeglichen.',
          'TIN vollständig mit aktiven IRS-Datensätzen verifiziert.',
          'Selfie des Einzelunternehmers stimmt mit dem Führerschein des Inhabers zu 98,9 % überein.',
          'PEP- und OFAC-Sanktionslisten geprüft: keine Treffer gefunden.'
        ]
      },
      crossBorder: {
        merchantName: 'Sato Precision Ltd (Hiroshi Sato)',
        buttonTitle: 'Sato Precision Ltd (Japan, grenzüberschreitend)',
        buttonMeta: 'Register aktiv - teilweiser Beobachtungslisten-Treffer - manuelle Prüfung',
        businessType: 'Exporteur für Sonderbauteile',
        country: 'Japan',
        kybStatus: 'Review',
        watchlistStatus: 'Flags',
        riskScore: 54,
        details: [
          'Japanisches Unternehmensregister verifiziert; Status ist aktiv.',
          'Identität des wirtschaftlich Berechtigten stimmt mit dem nationalen Register überein.',
          'Teilweiser Sanktionstreffer erkannt: sekundäre Übereinstimmung bei einem sehr häufigen Namen.',
          'Schnelle Compliance-Prüfung erforderlich, um den Fehlalarm auszuschließen.'
        ]
      },
      shellRisk: {
        merchantName: 'Valyria Trade Corp (Precious Metals)',
        buttonTitle: 'Valyria Trade Corp (Seychellen, hohes Risiko)',
        buttonMeta: 'Register abgelaufen - SDN-Sanktionstreffer - automatisch sperren',
        businessType: 'Brokerage und Mantelgesellschaft',
        country: 'Seychellen (Hochrisikoregion)',
        kybStatus: 'Block',
        watchlistStatus: 'Blocked',
        riskScore: 94,
        details: [
          'Prüfung des Unternehmensregisters der Seychellen fehlgeschlagen: Gesellschaft ist aufgelöst.',
          'Ultimate Beneficial Owner (UBO) stimmt mit aktiver OFAC-SDN-Liste überein.',
          'IP-Adresse stammt von einem maskierten Proxy oder Residential-VPN-Ausgangsknoten.',
          'Risiko-Engine: automatische Plattformsperre sofort eingeleitet.'
        ]
      }
    },
    logs: {
      step1: '[1/4] KYB-Prüfung für Geschäftseinheit "{merchant}" wird gestartet...',
      registry: '[Registerprüfung] Offizielle Secretary-of-State- und nationale Registerdatenbanken werden abgefragt...',
      step2: '[2/4] Steueridentifikationsnummern (TIN / EIN / VAT) werden geprüft...',
      tax: '[IRS / Finanzbehörde] Antwort der Steuerprüfung: Format {taxStatus}.',
      active: 'AKTIV',
      failed: 'FEHLGESCHLAGEN / aufgelöst',
      step3: '[3/4] Sanktions- und PEP-Beobachtungslisten für Ultimate Beneficial Owners (UBOs) werden geprüft...',
      watchlist: '[Compliance-Schutz] Status der Beobachtungslistenprüfung: {status}.',
      step4: '[4/4] Netzwerkintelligenz und Transaktionsrisikosignale werden bewertet...',
      decision: '[Risikoentscheidungs-Engine] Berechneter Risikowert: {score}/100. Ergebnis: {resolution}.'
    },
    signalsTitle: 'Automatisierte Entscheidungssignale',
    reset: 'Terminal zurücksetzen',
    configure: 'Regeln konfigurieren',
    loading: 'Verbindung zu nationalen Datenbankclustern wird hergestellt und Sanktionsabgleich ausgeführt...'
  },
  friction: {
    mockupTitle: 'Risikobewertungsblock',
    riskBadge: 'IP mit hohem Risiko erkannt',
    rows: [
      { label: 'Geräte-Fingerprint', value: 'Tor Network', desc: 'Die Verbindung wurde über einen maskierten Knoten in Europa hergestellt.' },
      { label: 'Verhaltenssignatur', value: 'PII aus Zwischenablage kopiert', desc: 'Der Nutzer hat Namen- und Kreditkartenfelder kopiert, statt sie natürlich einzugeben.' }
    ],
    checkTitle: 'Dynamische Multi-Faktor-Prüfung',
    checkDesc: 'Intelligentere Reibung aktiviert: Selfie-Verifizierung mit amtlichem Ausweis anfordern.',
    badge: 'Dynamische Reibungskontrollen',
    title: 'Intelligentere Reibung mit besseren Signalen steuern',
    desc: 'Passen Sie Reibung anhand von Geräte-, Verhaltens- und Risikosignalen dynamisch an, um manuelle Prüfungen zu reduzieren und Conversion zu erhöhen. Bei geringem Risiko umgehen Nutzer unnötige Prüfungen; bei erhöhtem Risiko werden automatisierte Zusatzschritte wie Live-Blink-Selfie oder Adressprüfung ausgelöst.',
    cta: 'Reibungs-Workflows konfigurieren'
  },
  hub: {
    badge: 'Einheitlicher Hub',
    title: 'Alle Daten auf einer einzigen Plattform bündeln',
    desc: 'Konfigurieren Sie KYB-, KYC- und AML-Abläufe für Onboarding und laufende Due Diligence auf einer Plattform, die mit Ihrem Unternehmen skaliert. Ersetzen Sie verstreute API-Protokolle, manuell erstellte PDFs und fragmentierte Händlerprofile durch klare Sicht auf Unternehmensidentitäten, wirtschaftlich Berechtigte und Risikoverläufe.',
    bullets: [
      'Gebündelte Protokolle im Händler-Dashboard.',
      'Echtzeitsynchronisierung mit Salesforce, Zendesk oder Slack.',
      'Feingranulare Schwärzungseinstellungen für GDPR- und CCPA-Anforderungen.'
    ],
    mockupTitle: 'Suite für laufende Überwachung',
    automated: 'AUTOMATISIERT',
    flowActive: 'FLOW AKTIV',
    rows: [
      { title: 'Regelmäßiger Watchlist-Scan', desc: 'Prüft täglich mehr als 4.500 Sanktionsdatenbanken', status: 'automated' },
      { title: 'Anpassung des Risikoprofils', desc: 'Erkennt Änderungen an der Unternehmensklassifizierung von Händlern', status: 'automated' },
      { title: 'Auslöser für erneute Verifizierung', desc: 'Erzwingt Aktualisierung, wenn Unternehmensregistrierungen ablaufen', status: 'flow' }
    ]
  },
  useCases: {
    label: 'Anwendungsfälle',
    title: 'KYB und KYC im Tempo moderner Zahlungen',
    desc: 'Vereinfachen Sie Compliance-Prüfungen an jedem Punkt Ihres Zahlungslebenszyklus.',
    tabs: [
      { id: 'onboard', label: 'Schneller onboarden', title: 'Onboarding und Risikoprüfung beschleunigen', desc: 'Verkürzen Sie die Zeit bis zur ersten Transaktion mit optimierter Identitäts- und Unternehmensverifizierung. Maßgeschneiderte Web- oder Mobile-Flows prüfen Unternehmensstatus und wirtschaftlich Berechtigte parallel, sodass echte Händler und Kunden weniger Reibung erleben.' },
      { id: 'monitor', label: 'Dynamisch überwachen', title: 'Laufende Transaktions- und Risikoprüfung', desc: 'Bewerten Sie Risiken kontinuierlich statt nur bei der Registrierung. Automatisierte Auslöser prüfen neue adverse-media-Einträge oder Registeränderungen und starten bei riskanten Aktionen aktive Zusatzprüfungen.' },
      { id: 'comply', label: 'Regelkonform bleiben', title: 'Anpassbare rechtliche Schutzmechanismen', desc: 'Bleiben Sie regelkonform, wenn nationale und internationale Vorgaben sich ändern. Konfigurieren Sie lokale Datenspeicherung, individuelle Risikoregeln und Anforderungen von FinCEN und AMLD6.' }
    ]
  },
  features: {
    title: 'Identitäts-Workflows passend zu Ihrem Zahlungsgeschäft anpassen',
    desc: 'Stimmen Sie jede Prüfung auf Ihre geografischen Märkte, Zielsegmente und Risikohaltung ab.',
    cards: [
      { title: 'Globale Abdeckung', desc: 'Reduzieren Sie Integrationsaufwand und beschleunigen Sie Entity-Onboarding mit Zugriff auf mehr als 150 globale Datenquellen über eine einzige Integration.' },
      { title: 'Flexible Dokumentenerfassung', desc: 'Erfassen und prüfen Sie beliebige Unterlagen wie Gewerbeanmeldungen oder Gründungsurkunden unabhängig vom Format und extrahieren Sie die benötigten Daten.' },
      { title: 'Suche in Unternehmensregistern', desc: 'Prüfen und laden Sie Registereinträge, um den guten Status eines Unternehmens tiefer zu bewerten.' },
      { title: 'TIN- und VAT-Prüfung', desc: 'Verifizieren Sie Steuernummern in den USA und weltweit per sofortiger offizieller Netzwerkvalidierung.' },
      { title: 'Branchenklassifizierung', desc: 'Bewerten Sie Unternehmensrisiken mit automatisierten NAICS- und MCC-Klassifizierungen, um Händlerbetrug vorzubeugen.' },
      { title: 'Finanzdaten', desc: 'Bewerten Sie die finanzielle Gesundheit eines Unternehmens durch offene Pfandrechte, Urteile oder angereicherte Daten aus Identra Marketplace-Integrationen.' },
      { title: 'Prüfung von wirtschaftlich Berechtigten', desc: 'Nutzen Sie umfassende Verifizierungsmethoden, um UBOs gegen Watchlists, adverse media und weitere Quellen zu prüfen.' },
      { title: 'Individuelle Workflows', desc: 'Erstellen Sie Automatisierungen und passen Sie jeden Aspekt des KYB-Prozesses an, einschließlich Integrationen wie Salesforce und Zendesk.' },
      { title: 'Automatische Audit-Protokolle', desc: 'Protokollieren Sie alle KYB- und KYC-Prüfungen samt Entscheidungen an einem Ort, ohne PII im eigenen System zu speichern.' }
    ]
  },
  demo: {
    badge: 'Live-Demo-Umgebung',
    title: 'Ihre individuelle Demo starten',
    desc: 'Erzählen Sie uns kurz etwas über sich, und wir personalisieren die Erfahrung - ohne Verkaufsgespräch.',
    app: 'checkout_onboarding.app',
    merchantApplication: 'Händlerantrag',
    identityVerified: 'Identität verifiziert',
    kybAudit: 'KYB-Registerprüfung',
    launchSandbox: 'Sandbox starten',
    firstName: 'Vorname *',
    lastName: 'Nachname *',
    workEmail: 'Geschäftliche E-Mail *',
    companyWebsite: 'Unternehmenswebsite',
    companyName: 'Unternehmensname *',
    jobTitle: 'Position',
    placeholders: { firstName: 'Max', lastName: 'Mustermann', email: 'max.mustermann@firma.de', website: 'https://firma.de', companyName: 'z. B. Paytech LLC', jobTitle: 'Compliance Manager' },
    viewDemo: 'Demo ansehen',
    requiredAlert: 'Bitte füllen Sie alle Pflichtfelder aus.',
    successTitle: 'Sandbox-Code erstellt',
    successDesc: 'Hallo {firstName}, wir haben ein dauerhaftes Sandbox-Entwicklertoken für {companyName} erstellt. Prüfen Sie Ihr Postfach unter {email}, um die Onboarding-Konfiguration abzuschließen.',
    submitAnother: 'Weitere Anfrage senden'
  },
  help: {
    title: 'So kann Identra helfen',
    desc: 'Vereinfachen Sie globale Compliance mit schnellen, skalierbaren Lösungen.',
    cards: [
      { title: 'Compliance für Überweisungen', desc: 'Verifizieren Sie Sender und Empfänger in Echtzeit, prüfen Sie Sanktionen und erfüllen Sie grenzüberschreitende AML-Anforderungen ohne unnötige Reibung.' },
      { title: 'POS und persönliche Zahlungen', desc: 'Ermöglichen Sie schnelles, regelkonformes Onboarding für stationäre Händler mit flexibler Dokumentenerfassung und sofortigem Registerabgleich.' },
      { title: 'B2B-Zahlungen und Plattformen', desc: 'Prüfen Sie komplexe Unternehmensstrukturen, UBOs und Steuerunterlagen, um Vertrauen für hochwertige Zahlungsabläufe aufzubauen.' }
    ]
  },
  testimonial: {
    quote: '"Wir möchten den Entscheidungsprozess während KYB und KYC so weit wie möglich automatisieren. Identra hilft uns nicht nur dabei und spart Zeit, sondern gibt uns auch die Flexibilität, Workflows und Regeln anzupassen, wenn wir neue Betrugsmuster entdecken."',
    name: 'Amanda Hodgetts-Martin',
    title: 'Director of Risk Management bei Branch',
    cta: 'Fallstudie lesen'
  },
  explore: { title: 'Mehr von Identras Identitätsplattform entdecken', cards: [{ view: 'platform', title: 'Global expandieren mit internationalem KYB/KYC.' }, { view: 'kyb', title: 'Jedes Unternehmen und die Menschen dahinter mit integriertem KYB-KYC verifizieren.' }] },
  finalCta: { title: 'Geld bewegen, ohne ausgebremst zu werden?', desc: 'Erfahren Sie, wie Identra globalen Zahlungsunternehmen hilft, Compliance zu vereinfachen, ohne Geschwindigkeit zu opfern.', primary: 'Demo anfragen', secondary: 'Jetzt ausprobieren' }
} as any;

PAYMENTS_PAGE_TRANSLATIONS.vi = {
  backToPlatform: 'Quay lại nền tảng',
  badge: 'Giải pháp - Thanh toán',
  heroTitle: 'Tuân thủ không ma sát cho thanh toán toàn cầu.',
  heroDesc: 'Nhúng các luồng KYB/KYC và AML linh hoạt vào sản phẩm để tăng trưởng nhanh hơn mà vẫn duy trì tuân thủ xuyên biên giới vững chắc.',
  getDemo: 'Nhận bản demo',
  trySandbox: 'Dùng thử sandbox định danh',
  heroBenefits: [
    { title: 'Xác minh toàn cầu mà không phức tạp', desc: 'Xác minh cá nhân và doanh nghiệp tại hơn 200 quốc gia và vùng lãnh thổ với hỗ trợ cho giấy tờ, cơ sở dữ liệu và quy định tuân thủ tại địa phương.' },
    { title: 'Onboard người dùng nhanh hơn, ít ma sát hơn', desc: 'Thiết kế luồng onboarding tối ưu chuyển đổi để người dùng và merchant hợp lệ có thể bắt đầu giao dịch ngay.' },
    { title: 'Tinh gọn tuân thủ và chuẩn bị kiểm toán', desc: 'Thích ứng với các quy định như AMLD6 và FinCEN bằng workflow tùy chỉnh, tự động hóa báo cáo và tập trung nhật ký sẵn sàng kiểm toán.' }
  ],
  trust: { title: 'Được các startup và doanh nghiệp lớn nhất thế giới tin dùng', logos: ['Petal', 'Payoneer', '[AngelList]', 'Branch Payments'] },
  ecosystem: {
    title: 'Tùy chỉnh luồng định danh phù hợp với hệ sinh thái thanh toán',
    desc: 'Thu thập tài liệu linh hoạt, truy vấn nguồn có thẩm quyền và thực hiện kiểm tra tuân thủ từ một bảng điều khiển tích hợp.',
    subtitle: 'Tiếp cận người dùng ở mọi nơi với KYB/KYC toàn cầu',
    body: 'Thu thập và xác minh giấy tờ định danh, tài liệu ở nhiều khu vực, đối chiếu với nguồn có thẩm quyền và sàng lọc lệnh trừng phạt trên một nền tảng duy nhất.',
    bullets: [
      { title: 'Hơn 150 cơ sở dữ liệu đăng ký toàn cầu', desc: 'Xác minh đăng ký doanh nghiệp tức thì trên nhiều khu vực pháp lý.' },
      { title: 'Đối chiếu watchlist cho UBO', desc: 'Tự động sàng lọc lệnh trừng phạt, PEP và danh sách pháp lý địa phương đang hiệu lực.' }
    ]
  },
  simulator: {
    terminalVersion: 'PAYMENTS_COMPLIANCE_v4.1',
    engine: 'BỘ MÁY RỦI RO TRỰC TIẾP',
    intro: 'Chọn một kịch bản onboarding để chạy vòng xác minh KYB/KYC doanh nghiệp theo thời gian thực:',
    statuses: { verified: 'ĐÃ XÁC MINH', review: 'CẦN XÉT DUYỆT', block: 'CHẶN', clear: 'Không có cảnh báo', flags: 'Có tín hiệu', blocked: 'Đã chặn' },
    scenarios: {
      soleProp: {
        merchantName: 'Alex Mercer (Mercer Organics LLC)',
        buttonTitle: 'Alex Mercer (chủ hộ kinh doanh lý tưởng)',
        buttonMeta: 'TIN khớp - watchlist sạch - tự động xác minh',
        businessType: 'Bán lẻ nông sản hữu cơ',
        country: 'Hoa Kỳ',
        kybStatus: 'Verified',
        watchlistStatus: 'Clear',
        riskScore: 8,
        details: [
          'Hồ sơ LLC đang hoạt động khớp với cơ sở dữ liệu của Delaware Secretary of State.',
          'TIN được xác minh đầy đủ với hồ sơ IRS đang hiệu lực.',
          'Selfie của chủ hộ kinh doanh khớp giấy phép lái xe với độ chính xác 98,9%.',
          'Đã quét danh sách PEP và lệnh trừng phạt OFAC: không tìm thấy kết quả khớp.'
        ]
      },
      crossBorder: {
        merchantName: 'Sato Precision Ltd (Hiroshi Sato)',
        buttonTitle: 'Sato Precision Ltd (Nhật Bản, xuyên biên giới)',
        buttonMeta: 'Đăng ký còn hiệu lực - khớp watchlist một phần - xét duyệt thủ công',
        businessType: 'Nhà xuất khẩu linh kiện tùy chỉnh',
        country: 'Nhật Bản',
        kybStatus: 'Review',
        watchlistStatus: 'Flags',
        riskScore: 54,
        details: [
          'Đã xác minh sổ đăng ký doanh nghiệp quốc gia Nhật Bản; trạng thái đang hoạt động.',
          'Thông tin chủ sở hữu hưởng lợi khớp hồ sơ quốc gia.',
          'Phát hiện tín hiệu trừng phạt một phần: trùng khớp phụ với một tên rất phổ biến.',
          'Cần chuyên viên tuân thủ xác minh nhanh để loại bỏ cảnh báo giả.'
        ]
      },
      shellRisk: {
        merchantName: 'Valyria Trade Corp (Precious Metals)',
        buttonTitle: 'Valyria Trade Corp (Seychelles, rủi ro cao)',
        buttonMeta: 'Đăng ký hết hiệu lực - khớp lệnh trừng phạt SDN - tự động chặn',
        businessType: 'Môi giới và công ty vỏ bọc',
        country: 'Seychelles (khu vực rủi ro cao)',
        kybStatus: 'Block',
        watchlistStatus: 'Blocked',
        riskScore: 94,
        details: [
          'Kiểm tra đăng ký kinh doanh tại Seychelles thất bại: pháp nhân đã giải thể.',
          'Ultimate Beneficial Owner (UBO) khớp danh sách OFAC SDN đang hiệu lực.',
          'Địa chỉ IP xuất phát từ proxy ẩn danh hoặc nút thoát residential VPN.',
          'Bộ máy rủi ro: tự động chặn nền tảng ngay lập tức.'
        ]
      }
    },
    logs: {
      step1: '[1/4] Bắt đầu kiểm tra KYB cho pháp nhân: "{merchant}"...',
      registry: '[Kiểm tra đăng ký] Đang truy vấn cơ sở dữ liệu Secretary of State / đăng ký quốc gia chính thức...',
      step2: '[2/4] Đang xác minh mã số thuế (TIN / EIN / VAT)...',
      tax: '[IRS / cơ quan thuế] Phản hồi xác minh thuế: định dạng {taxStatus}.',
      active: 'ĐANG HOẠT ĐỘNG',
      failed: 'THẤT BẠI / đã giải thể',
      step3: '[3/4] Đang sàng lọc lệnh trừng phạt và PEP cho Ultimate Beneficial Owners (UBOs)...',
      watchlist: '[Lớp bảo vệ tuân thủ] Trạng thái kiểm tra watchlist: {status}.',
      step4: '[4/4] Đang đánh giá tín hiệu mạng và rủi ro giao dịch...',
      decision: '[Bộ máy quyết định rủi ro] Điểm rủi ro đã tính: {score}/100. Kết quả: {resolution}.'
    },
    signalsTitle: 'Tín hiệu ra quyết định tự động',
    reset: 'Đặt lại terminal',
    configure: 'Cấu hình quy tắc',
    loading: 'Đang kết nối cụm cơ sở dữ liệu quốc gia và chạy thuật toán đối chiếu lệnh trừng phạt...'
  },
  friction: {
    mockupTitle: 'Khối đánh giá rủi ro',
    riskBadge: 'Phát hiện IP rủi ro cao',
    rows: [
      { label: 'Dấu vân tay thiết bị', value: 'Tor Network', desc: 'Kết nối được thiết lập qua một nút ẩn danh tại châu Âu.' },
      { label: 'Dấu hiệu hành vi', value: 'Sao chép PII từ clipboard', desc: 'Người dùng sao chép tên và trường thẻ tín dụng thay vì nhập tự nhiên.' }
    ],
    checkTitle: 'Kiểm tra đa yếu tố động',
    checkDesc: 'Đã bật ma sát thông minh: yêu cầu xác minh selfie với giấy tờ chính phủ.',
    badge: 'Điều khiển ma sát động',
    title: 'Tạo ma sát thông minh hơn bằng tín hiệu thông minh hơn',
    desc: 'Điều chỉnh ma sát linh hoạt bằng tín hiệu thiết bị, hành vi và rủi ro để giảm xét duyệt thủ công và tăng chuyển đổi. Khi rủi ro thấp, cho phép người dùng bỏ qua các cổng xác minh dư thừa; khi rủi ro tăng, yêu cầu các bước tự động như selfie chớp mắt trực tiếp hoặc tra cứu địa chỉ.',
    cta: 'Cấu hình workflow ma sát'
  },
  hub: {
    badge: 'Trung tâm hợp nhất',
    title: 'Hợp nhất toàn bộ dữ liệu trong một nền tảng',
    desc: 'Cấu hình luồng KYB, KYC và AML cho onboarding và thẩm định liên tục bằng nền tảng có thể mở rộng theo doanh nghiệp. Không còn nhật ký API rời rạc, PDF tổng hợp thủ công hay hồ sơ merchant phân mảnh; mọi định danh doanh nghiệp, chủ sở hữu hưởng lợi và lịch sử rủi ro được đặt trong một nhật ký kiểm toán rõ ràng.',
    bullets: [
      'Nhật ký bảng điều khiển merchant được hợp nhất.',
      'Đồng bộ thời gian thực với Salesforce, Zendesk hoặc Slack.',
      'Thiết lập che dữ liệu chi tiết để đáp ứng chính sách GDPR và CCPA.'
    ],
    mockupTitle: 'Bộ công cụ giám sát liên tục',
    automated: 'TỰ ĐỘNG',
    flowActive: 'LUỒNG ĐANG HOẠT ĐỘNG',
    rows: [
      { title: 'Quét watchlist định kỳ', desc: 'Quét hơn 4.500 cơ sở dữ liệu lệnh trừng phạt mỗi ngày', status: 'automated' },
      { title: 'Điều chỉnh hồ sơ rủi ro', desc: 'Phát hiện thay đổi trong phân loại pháp nhân của merchant', status: 'automated' },
      { title: 'Kích hoạt xác minh lại', desc: 'Buộc làm mới khi đăng ký doanh nghiệp hết hiệu lực', status: 'flow' }
    ]
  },
  useCases: {
    label: 'Trường hợp sử dụng',
    title: 'KYB và KYC chạy theo tốc độ thanh toán',
    desc: 'Tinh gọn kiểm tra tuân thủ tại mọi điểm trong vòng đời thanh toán.',
    tabs: [
      { id: 'onboard', label: 'Onboard nhanh hơn', title: 'Tăng tốc onboarding và thẩm định', desc: 'Rút ngắn thời gian đến giao dịch đầu tiên bằng xác minh định danh và doanh nghiệp được tinh gọn. Thiết kế luồng web hoặc mobile để kiểm tra trạng thái pháp nhân và chủ sở hữu hưởng lợi song song, giúp merchant và khách hàng thật giảm ma sát.' },
      { id: 'monitor', label: 'Giám sát linh hoạt', title: 'Kiểm tra giao dịch và rủi ro liên tục', desc: 'Đánh giá rủi ro theo thời gian thay vì chỉ lúc đăng ký. Các trình kích hoạt tự động sàng lọc adverse media mới hoặc thay đổi đăng ký, rồi yêu cầu xét duyệt nâng cao khi có hành động rủi ro.' },
      { id: 'comply', label: 'Luôn tuân thủ', title: 'Lớp bảo vệ pháp lý có thể thích ứng', desc: 'Duy trì tuân thủ khi quy định trong nước và quốc tế thay đổi. Cấu hình lưu trữ dữ liệu theo địa phương, quy tắc đánh giá rủi ro tùy chỉnh và đáp ứng yêu cầu của FinCEN cùng AMLD6.' }
    ]
  },
  features: {
    title: 'Tùy chỉnh workflow định danh phù hợp với doanh nghiệp thanh toán',
    desc: 'Điều chỉnh từng bước kiểm tra theo thị trường địa lý, phân khúc khách hàng và khẩu vị rủi ro của bạn.',
    cards: [
      { title: 'Phạm vi toàn cầu', desc: 'Giảm thời gian tích hợp và tăng tốc onboarding pháp nhân với hơn 150 nguồn dữ liệu toàn cầu qua một tích hợp duy nhất.' },
      { title: 'Thu thập tài liệu linh hoạt', desc: 'Thu thập và xác minh mọi loại tài liệu như đăng ký kinh doanh hoặc giấy chứng nhận thành lập, bất kể định dạng, rồi trích xuất dữ liệu cần thiết.' },
      { title: 'Tra cứu đăng ký pháp nhân', desc: 'Kiểm tra và truy xuất hồ sơ đăng ký để đánh giá sâu hơn tình trạng hợp lệ của doanh nghiệp.' },
      { title: 'Xác minh TIN và VAT', desc: 'Xác minh mã số thuế tại Hoa Kỳ và toàn cầu bằng mạng lưới có thẩm quyền tức thì.' },
      { title: 'Phân loại ngành nghề', desc: 'Đánh giá rủi ro doanh nghiệp bằng chỉ mục phân loại NAICS và MCC tự động để ngăn gian lận merchant.' },
      { title: 'Dữ liệu tài chính', desc: 'Đánh giá sức khỏe tài chính của công ty bằng cách kiểm tra quyền lưu giữ, phán quyết hoặc làm giàu dữ liệu qua tích hợp Identra Marketplace.' },
      { title: 'Sàng lọc chủ sở hữu doanh nghiệp', desc: 'Chọn nhiều phương thức xác minh để sàng lọc UBO với watchlist, adverse media và các nguồn khác.' },
      { title: 'Workflow tùy chỉnh', desc: 'Tạo tự động hóa và điều chỉnh mọi phần của quy trình KYB, bao gồm tích hợp với Salesforce và Zendesk.' },
      { title: 'Nhật ký kiểm toán tự động', desc: 'Lưu nhật ký tất cả kiểm tra KYB/KYC và quyết định tại một nơi để tạo dấu vết kiểm toán mà không cần lưu PII trong hệ thống của bạn.' }
    ]
  },
  demo: {
    badge: 'Môi trường demo trực tiếp',
    title: 'Bắt đầu bản demo tùy chỉnh',
    desc: 'Cho chúng tôi biết một chút về bạn và chúng tôi sẽ cá nhân hóa trải nghiệm, không cần cuộc gọi bán hàng.',
    app: 'checkout_onboarding.app',
    merchantApplication: 'Đơn đăng ký merchant',
    identityVerified: 'Đã xác minh định danh',
    kybAudit: 'Kiểm tra đăng ký KYB',
    launchSandbox: 'Mở sandbox',
    firstName: 'Tên *',
    lastName: 'Họ *',
    workEmail: 'Email công việc *',
    companyWebsite: 'Website công ty',
    companyName: 'Tên công ty *',
    jobTitle: 'Chức danh',
    placeholders: { firstName: 'An', lastName: 'Nguyễn', email: 'an.nguyen@congty.vn', website: 'https://congty.vn', companyName: 'Ví dụ: Paytech LLC', jobTitle: 'Quản lý tuân thủ' },
    viewDemo: 'Xem demo',
    requiredAlert: 'Vui lòng điền đầy đủ các trường bắt buộc.',
    successTitle: 'Đã tạo mã sandbox',
    successDesc: 'Xin chào {firstName}, chúng tôi đã tạo token sandbox dài hạn cho nhà phát triển của {companyName}. Vui lòng kiểm tra hộp thư {email} để hoàn tất cấu hình onboarding.',
    submitAnother: 'Gửi yêu cầu khác'
  },
  help: {
    title: 'Identra có thể hỗ trợ như thế nào',
    desc: 'Đơn giản hóa tuân thủ toàn cầu bằng các giải pháp nhanh, có thể mở rộng.',
    cards: [
      { title: 'Tuân thủ chuyển tiền', desc: 'Xác minh người gửi và người nhận theo thời gian thực, sàng lọc lệnh trừng phạt và đáp ứng yêu cầu AML xuyên biên giới mà không thêm ma sát không cần thiết.' },
      { title: 'POS và thanh toán trực tiếp', desc: 'Onboard nhanh và đúng chuẩn cho merchant tại cửa hàng bằng thu thập tài liệu linh hoạt và tra cứu đăng ký tức thì trên nhiều khu vực.' },
      { title: 'Thanh toán B2B và nền tảng', desc: 'Xác minh cấu trúc doanh nghiệp phức tạp, UBO và hồ sơ thuế để xây dựng niềm tin cho các luồng phải thu, phải trả giá trị cao.' }
    ]
  },
  testimonial: {
    quote: '"Chúng tôi muốn tự động hóa quá trình ra quyết định nhiều nhất có thể trong KYB và KYC. Identra không chỉ giúp chúng tôi làm điều đó và tiết kiệm thời gian, mà còn bảo đảm chúng tôi có thể linh hoạt thay đổi workflow và quy tắc khi phát hiện các nhóm gian lận mới."',
    name: 'Amanda Hodgetts-Martin',
    title: 'Giám đốc quản lý rủi ro tại Branch',
    cta: 'Đọc nghiên cứu điển hình'
  },
  explore: { title: 'Khám phá thêm nền tảng định danh của Identra', cards: [{ view: 'platform', title: 'Mở rộng toàn cầu với KYB/KYC quốc tế.' }, { view: 'kyb', title: 'Xác minh mọi doanh nghiệp và những người đứng sau họ bằng KYB-KYC tích hợp.' }] },
  finalCta: { title: 'Bạn muốn chuyển tiền mà không bị nghẽn quy trình?', desc: 'Xem cách Identra giúp các công ty thanh toán toàn cầu tinh gọn tuân thủ mà không đánh đổi tốc độ.', primary: 'Nhận bản demo', secondary: 'Dùng thử ngay' }
} as any;
