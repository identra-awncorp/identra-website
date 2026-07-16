/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

export const CRYPTOCURRENCY_TRANSLATIONS: any = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'Solutions • Cryptocurrency',
    heroTitle: 'Protect digital assets with secure identity verification.',
    heroDesc: 'Verify users and businesses instantly to meet global KYC, KYB, and AML standards. Scale safely, minimize friction, and stop crypto fraud at the gate.',
    getDemo: 'Get a demo',
    trySandbox: 'Try identity sandbox',
    terminalName: 'CRYPTO_COMPLIANCE_RADAR_v1.0',
    onChainLive: 'ON-CHAIN LIVE',
    scenarioPrompt: 'Select a wallet scenario to simulate real-time blockchain AML verification:',
    queryProgress: 'Querying ledger transactions & checking watchlists...',
    decisionBreakdown: 'Decision Engine Breakdown:',
    riskScore: 'Risk Score:',
    runAnother: 'Run another simulation',
    trustedBy: "Trusted by startups & the world's largest cryptocurrency companies",
    bridgeStripe: '(a Stripe company)',
    rows: [
      {
        title: 'Collect identity information',
        desc: 'Choose how you verify users and businesses, from government ID and selfie verifications to document verifications, and dynamically adjust friction based on risk. Keep conversions high for low-risk users and implement robust checks when risk signals spike.',
        cardTitle: 'Dynamic Friction Controls',
        cardDesc: 'Based on on-chain wallet exposure & geography',
        metricLabel: 'Required Verification Step',
        metricValue: 'Standard KYC Only',
        note: 'User from low-risk jurisdiction with verified wallet: Bypass secondary document uploads.'
      },
      {
        title: 'Perform due diligence',
        desc: "Run reports for watchlists, adverse media, PEP, FinCEN 314a, and more, and review any report hits in Identra's manual review hub. Cross-reference address lookups and phone risk metrics instantly to detect synthetic identities.",
        cardTitle: 'Comprehensive Compliance Scan',
        cardDesc: 'Real-time global sanctions and PEP screenings',
        metricOneLabel: 'Sanction Watchlists',
        metricOneValue: '0 Matches Found',
        metricTwoLabel: 'PEP Screening',
        metricTwoValue: 'Clean Records'
      },
      {
        title: 'Make faster and better decisions',
        desc: 'Streamline operations with a single platform for investigating, uncovering large-scale fraud, and taking swift follow-up action. Leverage link analysis graph visualization to expose nested networks of multi-accounting fraud rings.',
        cardTitle: 'Decision Automations',
        cardDesc: 'Automate transaction blocking & investigation routing',
        ruleLabel: 'On Large Deposit Flag:',
        steps: [
          '1. Screen wallet origin through on-chain data provider',
          '2. Route to Manual Review if address linked to mixer',
          '3. Instantly notify fraud team with a detailed risk docket'
        ]
      }
    ],
    platformBadge: 'Identity Platform Building Blocks',
    platformTitle: 'End-to-end verifications, signals, and orchestration',
    platformCards: [
      { title: 'Flow Editor', desc: 'Minimize customer frustration with intuitive, branded flows that guide them through the verification process.' },
      { title: 'Library of verification methods', desc: 'Mix and match verification methods that best fit your needs, such as government ID, selfie, database, and document verifications, along with PEP, watchlist, and FinCEN 314a reports.' },
      { title: 'Cases', desc: 'Efficiently review information, make decisions, and take action on riskier users with all the information you need in one place.' },
      { title: 'Dynamic Flow', desc: 'Meet local regulations by choosing what information to collect and data to enrich, along with how users and businesses are verified for every region you serve.' },
      { title: 'No-code platform', desc: "Configure and update onboarding flows easily using Identra's self-serve editor with drag-and-drop modules and prebuilt templates." },
      { title: 'Data security and privacy', desc: 'Manage PII securely with granular data access controls and compliant features certified to the highest industry standards.' }
    ],
    amlFlow: 'Dynamic AML Flow',
    walletPolicy: 'Crypto Wallet policy',
    onchainRisk: 'On-chain Risk',
    passedLow: 'Passed (Low)',
    ofacSanctions: 'OFAC Sanctions',
    clean: 'Clean',
    kycVerification: 'KYC Verification',
    verified: 'Verified',
    automationTitle: 'Real-time automation engine',
    automationDesc: 'Configure complex verification matrices without writing single lines of backend code.',
    formTitle: 'Start your custom demo',
    formDesc: "Tell us a bit about yourself and we'll personalize the experience — no sales call required.",
    formError: 'Please fill out all required fields.',
    demoSentTitle: 'Custom Demo Request Sent',
    demoSentPrefix: 'Thank you, ',
    demoSentMiddle: '! We have customized your Cryptocurrency Identra sandbox credentials and sent them to ',
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
    jobPlaceholder: 'VP of Risk & Compliance',
    viewDemo: 'View demo',
    subpoints: [
      { title: 'Exchange platforms', desc: 'Enable secure and compliant trading environments by instantly verifying users and businesses worldwide before allowing them to transact.' },
      { title: 'Wallets', desc: 'Protect your users and secure your wallet from potential fraud threats by ensuring that only legitimate users gain access.' },
      { title: 'Infrastructure', desc: 'Scale operations and support partners across different regions while maintaining the highest security standards with integrated KYB-KYC.' }
    ],
    exploreTitle: "Explore more of Identra's identity platform",
    exploreComplianceTitle: 'Tailor & scale KYC/AML compliance.',
    learnCompliance: 'Learn compliance',
    exploreDatabaseTitle: 'Verify users globally with database checks.',
    learnDatabase: 'Learn database checks',
    readyTitle: 'Ready to get started?',
    readyDesc: 'Get in touch or start exploring Identra today.',
    tryNow: 'Try it now →',
    statuses: { approve: 'Approve', review: 'Review', block: 'Block' },
    walletChecks: { low: 'Low Risk', medium: 'Medium Risk', sanctioned: 'Sanctioned Mixer' },
    kycStatuses: { verified: 'Verified', requiresSelfie: 'Requires Selfie', blocked: 'Blocked' },
    identityMatch: { found: 'MATCH FOUND', clean: 'CLEAN' },
    logs: {
      step1: '[1/4] Interrogating wallet address on-chain history and smart contract interactions...',
      wallet: '[Wallet Check] Address Status: {walletCheck}. Evaluating direct exposure level.',
      step2: '[2/4] Screening real identity metrics against global sanction watchlists & AML lists...',
      watchlist: '[Watchlist Check] PEP/OFAC status checked. Identity resolution matches: {match}.',
      step3: '[3/4] Parsing browser signals, IP reputation, and behavioral attributes...',
      signal: '[Signal Intel] IP class: {ip}. Checking virtual private network proxies.',
      step4: '[4/4] Injecting variables into Identra decision matrix rule engine...',
      decision: '[Decision] Cumulative Risk: {risk}/100. Action: {status}.'
    },
    scenarios: {
      good: {
        name: 'Alex Rivera',
        type: 'Retail Wallet Activation',
        wallet: '0x71C...3a9b (Coinbase Custody)',
        email: 'alex.rivera@gmail.com',
        ip: '192.168.1.45 (Miami, FL - Residential)',
        title: 'Alex Rivera (Regulated Investor)',
        subtitle: 'Low-Risk Wallet • Auto-Approve Verification',
        details: [
          'Wallet associated with high-reputation regulated exchange.',
          'No history of peer-to-peer darknet markets interaction.',
          'OFAC and global watchlist check came back 100% clean.',
          'Government ID matches facial biometrics successfully.'
        ]
      },
      review: {
        name: 'Devon Miller',
        type: 'High-Volume Exchange Deposit',
        wallet: '0x3f5...991a (DEX Liquidity Provider)',
        email: 'devon_miller_99@protonmail.com',
        ip: '82.102.23.11 (NordVPN Server - Germany)',
        title: 'Devon Miller (DEX & VPN Activity)',
        subtitle: 'Medium-Risk Wallet • Dynamic Selfie Verification',
        details: [
          'Active connection via commercial VPN provider detected.',
          'Wallet interacted with non-KYC decentralized bridge recently.',
          'Transaction volume exceeds user-declared income bracket.',
          'Selfie verification requested to confirm continuous session ownership.'
        ]
      },
      block: {
        name: 'Disclosed Suspicious Entity',
        type: 'Institutional Onboarding Attempt',
        wallet: '0x90F...e7d2 (Tornado Cash Interaction)',
        email: 'anonymous_defi_user@torbox.sh',
        ip: '185.112.144.9 (Stolen Proxy Server)',
        title: 'Suspicious Entity (Mixer/OFAC Block)',
        subtitle: 'Sanctioned Contract Exposure • Automated Block',
        details: [
          'Direct incoming transfer from OFAC-sanctioned smart contract (Tornado Cash).',
          'Synthetic identity profile: SSN flag from deceased records registry.',
          'IP address geo-mismatch: User claimed USA but routed via stolen proxy.',
          'Automated AML SAR report drafted and queued for compliance officer.'
        ]
      }
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Soluciones • Criptomonedas',
    heroTitle: 'Protege activos digitales con verificación de identidad segura.',
    heroDesc: 'Verifica usuarios y empresas al instante para cumplir estándares globales de KYC, KYB y AML. Escala con seguridad, reduce la fricción y detén el fraude cripto desde el inicio.',
    getDemo: 'Solicitar demo',
    trySandbox: 'Probar sandbox de identidad',
    terminalName: 'RADAR_CUMPLIMIENTO_CRIPTO_v1.0',
    onChainLive: 'ON-CHAIN EN VIVO',
    scenarioPrompt: 'Selecciona un escenario de billetera para simular verificación AML en blockchain en tiempo real:',
    queryProgress: 'Consultando transacciones del libro mayor y revisando listas de vigilancia...',
    decisionBreakdown: 'Desglose del motor de decisión:',
    riskScore: 'Puntuación de riesgo:',
    runAnother: 'Ejecutar otra simulación',
    trustedBy: 'Usado por startups y las mayores empresas de criptomonedas del mundo',
    bridgeStripe: '(una empresa de Stripe)',
    rows: [
      {
        title: 'Recopila información de identidad',
        desc: 'Elige cómo verificar usuarios y empresas, desde documentos oficiales y selfies hasta documentos comerciales, y ajusta la fricción dinámicamente según el riesgo. Mantén altas conversiones para usuarios de bajo riesgo y aplica controles robustos cuando suben las señales de riesgo.',
        cardTitle: 'Controles dinámicos de fricción',
        cardDesc: 'Basados en exposición on-chain de la billetera y geografía',
        metricLabel: 'Paso de verificación requerido',
        metricValue: 'Solo KYC estándar',
        note: 'Usuario de jurisdicción de bajo riesgo con billetera verificada: omitir cargas de documentos secundarios.'
      },
      {
        title: 'Realiza debida diligencia',
        desc: 'Ejecuta informes de listas de vigilancia, medios adversos, PEP, FinCEN 314a y más, y revisa coincidencias en el centro de revisión manual de Identra. Cruza búsquedas de dirección y métricas de riesgo telefónico para detectar identidades sintéticas al instante.',
        cardTitle: 'Escaneo integral de cumplimiento',
        cardDesc: 'Sanciones globales y revisión PEP en tiempo real',
        metricOneLabel: 'Listas de sanciones',
        metricOneValue: '0 coincidencias',
        metricTwoLabel: 'Revisión PEP',
        metricTwoValue: 'Registros limpios'
      },
      {
        title: 'Decide más rápido y mejor',
        desc: 'Optimiza operaciones con una sola plataforma para investigar, descubrir fraude a gran escala y actuar rápidamente. Usa visualización de grafos para exponer redes anidadas de fraude multi-cuenta.',
        cardTitle: 'Automatizaciones de decisión',
        cardDesc: 'Automatiza bloqueos de transacciones y rutas de investigación',
        ruleLabel: 'Al detectar depósito grande:',
        steps: [
          '1. Revisar origen de billetera con proveedor de datos on-chain',
          '2. Enviar a revisión manual si la dirección está vinculada a un mixer',
          '3. Notificar al equipo de fraude con expediente de riesgo detallado'
        ]
      }
    ],
    platformBadge: 'Bloques de la plataforma de identidad',
    platformTitle: 'Verificaciones, señales y orquestación de extremo a extremo',
    platformCards: [
      { title: 'Editor de flujos', desc: 'Reduce la frustración del cliente con flujos intuitivos y de marca que guían el proceso de verificación.' },
      { title: 'Biblioteca de métodos de verificación', desc: 'Combina métodos como documento oficial, selfie, base de datos y verificación documental, junto con informes PEP, listas de vigilancia y FinCEN 314a.' },
      { title: 'Casos', desc: 'Revisa información, toma decisiones y actúa sobre usuarios de mayor riesgo con todo lo necesario en un solo lugar.' },
      { title: 'Flujo dinámico', desc: 'Cumple regulaciones locales eligiendo qué información recopilar y enriquecer, y cómo verificar usuarios y empresas en cada región.' },
      { title: 'Plataforma sin código', desc: 'Configura y actualiza flujos de onboarding con el editor autoservicio de Identra, módulos de arrastrar y soltar y plantillas listas.' },
      { title: 'Seguridad y privacidad de datos', desc: 'Gestiona PII de forma segura con controles granulares de acceso y funciones certificadas bajo estándares líderes.' }
    ],
    amlFlow: 'Flujo AML dinámico',
    walletPolicy: 'Política de billetera cripto',
    onchainRisk: 'Riesgo on-chain',
    passedLow: 'Aprobado (bajo)',
    ofacSanctions: 'Sanciones OFAC',
    clean: 'Limpio',
    kycVerification: 'Verificación KYC',
    verified: 'Verificado',
    automationTitle: 'Motor de automatización en tiempo real',
    automationDesc: 'Configura matrices de verificación complejas sin escribir líneas de código backend.',
    formTitle: 'Inicia tu demo personalizada',
    formDesc: 'Cuéntanos un poco sobre ti y personalizaremos la experiencia; no se requiere llamada de ventas.',
    formError: 'Completa todos los campos obligatorios.',
    demoSentTitle: 'Solicitud de demo enviada',
    demoSentPrefix: 'Gracias, ',
    demoSentMiddle: '. Personalizamos tus credenciales del sandbox de Identra para criptomonedas y las enviamos a ',
    fillAnother: 'Enviar otra solicitud',
    firstName: 'Nombre*',
    lastName: 'Apellido*',
    email: 'Email*',
    website: 'Sitio web*',
    companyName: 'Nombre de la empresa*',
    jobTitle: 'Cargo',
    firstNamePlaceholder: 'Juana',
    lastNamePlaceholder: 'Pérez',
    emailPlaceholder: 'juana.perez@empresa.com',
    websitePlaceholder: 'https://empresa.com',
    companyPlaceholder: 'Tecnologías Apex',
    jobPlaceholder: 'VP de Riesgo y Cumplimiento',
    viewDemo: 'Ver demo',
    subpoints: [
      { title: 'Plataformas de intercambio', desc: 'Habilita entornos de trading seguros y conformes verificando usuarios y empresas en todo el mundo antes de permitir transacciones.' },
      { title: 'Billeteras', desc: 'Protege a tus usuarios y tu billetera de amenazas de fraude asegurando que solo usuarios legítimos obtengan acceso.' },
      { title: 'Infraestructura', desc: 'Escala operaciones y apoya socios en distintas regiones manteniendo altos estándares de seguridad con KYB-KYC integrado.' }
    ],
    exploreTitle: 'Explora más de la plataforma de identidad de Identra',
    exploreComplianceTitle: 'Adapta y escala el cumplimiento KYC/AML.',
    learnCompliance: 'Ver cumplimiento',
    exploreDatabaseTitle: 'Verifica usuarios globalmente con comprobaciones de base de datos.',
    learnDatabase: 'Ver comprobaciones de base de datos',
    readyTitle: '¿Listo para empezar?',
    readyDesc: 'Ponte en contacto o empieza a explorar Identra hoy.',
    tryNow: 'Probar ahora →',
    statuses: { approve: 'Aprobar', review: 'Revisar', block: 'Bloquear' },
    walletChecks: { low: 'Riesgo bajo', medium: 'Riesgo medio', sanctioned: 'Mixer sancionado' },
    kycStatuses: { verified: 'Verificado', requiresSelfie: 'Requiere selfie', blocked: 'Bloqueado' },
    identityMatch: { found: 'COINCIDENCIA ENCONTRADA', clean: 'LIMPIO' },
    logs: {
      step1: '[1/4] Consultando historial on-chain de la dirección y contratos inteligentes...',
      wallet: '[Wallet Check] Estado de dirección: {walletCheck}. Evaluando exposición directa.',
      step2: '[2/4] Revisando métricas de identidad contra sanciones globales y listas AML...',
      watchlist: '[Watchlist Check] Estado PEP/OFAC revisado. Coincidencias de identidad: {match}.',
      step3: '[3/4] Analizando señales del navegador, reputación IP y comportamiento...',
      signal: '[Signal Intel] Clase de IP: {ip}. Revisando proxies de red privada virtual.',
      step4: '[4/4] Inyectando variables en el motor de reglas de decisión de Identra...',
      decision: '[Decision] Riesgo acumulado: {risk}/100. Acción: {status}.'
    },
    scenarios: {
      good: {
        name: 'Alex Rivera',
        type: 'Activación de billetera minorista',
        wallet: '0x71C...3a9b (Coinbase Custody)',
        email: 'alex.rivera@gmail.com',
        ip: '192.168.1.45 (Miami, FL - residencial)',
        title: 'Alex Rivera (inversor regulado)',
        subtitle: 'Billetera de bajo riesgo • Aprobación automática',
        details: [
          'Billetera asociada con exchange regulado de alta reputación.',
          'Sin historial de interacción con mercados darknet peer-to-peer.',
          'La revisión OFAC y listas globales volvió 100% limpia.',
          'El documento oficial coincide correctamente con la biometría facial.'
        ]
      },
      review: {
        name: 'Devon Miller',
        type: 'Depósito de exchange de alto volumen',
        wallet: '0x3f5...991a (proveedor de liquidez DEX)',
        email: 'devon_miller_99@protonmail.com',
        ip: '82.102.23.11 (servidor NordVPN - Alemania)',
        title: 'Devon Miller (actividad DEX y VPN)',
        subtitle: 'Billetera de riesgo medio • Verificación dinámica con selfie',
        details: [
          'Se detectó conexión activa mediante proveedor VPN comercial.',
          'La billetera interactuó recientemente con un puente descentralizado sin KYC.',
          'El volumen de transacciones supera el tramo de ingresos declarado.',
          'Se solicitó selfie para confirmar propiedad continua de la sesión.'
        ]
      },
      block: {
        name: 'Entidad sospechosa declarada',
        type: 'Intento de onboarding institucional',
        wallet: '0x90F...e7d2 (interacción con Tornado Cash)',
        email: 'anonymous_defi_user@torbox.sh',
        ip: '185.112.144.9 (servidor proxy robado)',
        title: 'Entidad sospechosa (bloqueo Mixer/OFAC)',
        subtitle: 'Exposición a contrato sancionado • Bloqueo automático',
        details: [
          'Transferencia entrante directa desde contrato inteligente sancionado por OFAC (Tornado Cash).',
          'Perfil de identidad sintética: SSN marcado en registro de personas fallecidas.',
          'IP con discrepancia geográfica: el usuario declaró EE. UU. pero enruta por proxy robado.',
          'Informe AML SAR redactado automáticamente y en cola para cumplimiento.'
        ]
      }
    }
  },
  ja: {},
  de: {},
  vi: {}
};

CRYPTOCURRENCY_TRANSLATIONS.ja = {
  logs: {
      "step1": "[1/4] Interrogating wallet address on-chain history and smart contract interactions...",
      "wallet": "[Wallet Check] Address Status: {walletCheck}. Evaluating direct exposure level.",
      "step2": "[2/4] Screening real identity metrics against global sanction watchlists & AML lists...",
      "watchlist": "[Watchlist Check] PEP/OFAC status checked. Identity resolution matches: {match}.",
      "step3": "[3/4] Parsing browser signals, IP reputation, and behavioral attributes...",
      "signal": "[Signal Intel] IP class: {ip}. Checking virtual private network proxies.",
      "step4": "[4/4] Injecting variables into Identra decision matrix rule engine...",
      "decision": "[Decision] Cumulative Risk: {risk}/100. Action: {status}."
    },
  scenarios: {
      "good": {
        "name": "Alex Rivera",
        "type": "Retail Wallet Activation",
        "wallet": "0x71C...3a9b (Coinbase Custody)",
        "email": "alex.rivera@gmail.com",
        "ip": "192.168.1.45 (Miami, FL - Residential)",
        "title": "Alex Rivera (Regulated Investor)",
        "subtitle": "Low-Risk Wallet • Auto-Approve Verification",
        "details": [
          "Wallet associated with high-reputation regulated exchange.",
          "No history of peer-to-peer darknet markets interaction.",
          "OFAC and global watchlist check came back 100% clean.",
          "Government ID matches facial biometrics successfully."
        ]
      },
      "review": {
        "name": "Devon Miller",
        "type": "High-Volume Exchange Deposit",
        "wallet": "0x3f5...991a (DEX Liquidity Provider)",
        "email": "devon_miller_99@protonmail.com",
        "ip": "82.102.23.11 (NordVPN Server - Germany)",
        "title": "Devon Miller (DEX & VPN Activity)",
        "subtitle": "Medium-Risk Wallet • Dynamic Selfie Verification",
        "details": [
          "Active connection via commercial VPN provider detected.",
          "Wallet interacted with non-KYC decentralized bridge recently.",
          "Transaction volume exceeds user-declared income bracket.",
          "Selfie verification requested to confirm continuous session ownership."
        ]
      },
      "block": {
        "name": "Disclosed Suspicious Entity",
        "type": "Institutional Onboarding Attempt",
        "wallet": "0x90F...e7d2 (Tornado Cash Interaction)",
        "email": "anonymous_defi_user@torbox.sh",
        "ip": "185.112.144.9 (Stolen Proxy Server)",
        "title": "Suspicious Entity (Mixer/OFAC Block)",
        "subtitle": "Sanctioned Contract Exposure • Automated Block",
        "details": [
          "Direct incoming transfer from OFAC-sanctioned smart contract (Tornado Cash).",
          "Synthetic identity profile: SSN flag from deceased records registry.",
          "IP address geo-mismatch: User claimed USA but routed via stolen proxy.",
          "Automated AML SAR report drafted and queued for compliance officer."
        ]
      }
    },
  backToPlatform: 'プラットフォームに戻る',
  badge: 'ソリューション • 暗号資産',
  heroTitle: '安全な本人確認でデジタル資産を守る。',
  heroDesc: 'ユーザーと企業を即時に確認し、グローバルな KYC、KYB、AML 基準に対応します。安全に拡張し、摩擦を抑え、暗号資産不正を入口で止めます。',
  getDemo: 'デモを見る',
  trySandbox: '本人確認サンドボックスを試す',
  terminalName: 'CRYPTO_COMPLIANCE_RADAR_v1.0',
  onChainLive: 'ON-CHAIN ライブ',
  scenarioPrompt: 'ウォレットシナリオを選択して、ブロックチェーン AML 検証をリアルタイムでシミュレーションします:',
  queryProgress: '台帳取引を照会し、ウォッチリストを確認しています...',
  decisionBreakdown: '意思決定エンジンの内訳:',
  riskScore: 'リスクスコア:',
  runAnother: '別のシミュレーションを実行',
  trustedBy: 'スタートアップから世界最大級の暗号資産企業まで利用されています',
  bridgeStripe: '（Stripe の関連会社）',
  statuses: { approve: '承認', review: 'レビュー', block: 'ブロック' },
  walletChecks: { low: '低リスク', medium: '中リスク', sanctioned: '制裁対象ミキサー' },
  kycStatuses: { verified: '確認済み', requiresSelfie: 'セルフィーが必要', blocked: 'ブロック済み' },
  identityMatch: { found: '一致あり', clean: 'クリーン' },
  rows: [
    {
      title: '本人確認情報を収集',
      desc: '公的身分証、セルフィー、書類確認など、ユーザーと企業の確認方法を選び、リスクに応じて摩擦を動的に調整します。低リスクユーザーのコンバージョンを維持し、リスク信号が高まった場合は強固なチェックを適用します。',
      cardTitle: '動的な摩擦制御',
      cardDesc: 'オンチェーンのウォレット露出と地域に基づく',
      metricLabel: '必要な確認ステップ',
      metricValue: '標準 KYC のみ',
      note: '確認済みウォレットを持つ低リスク地域のユーザー: 二次書類アップロードを省略。'
    },
    {
      title: 'デューデリジェンスを実行',
      desc: 'ウォッチリスト、ネガティブメディア、PEP、FinCEN 314a などのレポートを実行し、ヒットを Identra の手動レビューハブで確認できます。住所検索と電話リスク指標を即時に照合し、合成 ID を検出します。',
      cardTitle: '包括的なコンプライアンススキャン',
      cardDesc: 'グローバル制裁と PEP をリアルタイムで確認',
      metricOneLabel: '制裁ウォッチリスト',
      metricOneValue: '一致 0 件',
      metricTwoLabel: 'PEP スクリーニング',
      metricTwoValue: 'クリーンな記録'
    },
    {
      title: 'より速く、より良い判断',
      desc: '調査、大規模不正の発見、迅速なフォローアップを単一プラットフォームで効率化します。リンク分析グラフで、複数アカウント不正ネットワークを可視化します。',
      cardTitle: '意思決定の自動化',
      cardDesc: '取引ブロックと調査ルーティングを自動化',
      ruleLabel: '大口入金フラグ時:',
      steps: [
        '1. オンチェーンデータプロバイダーでウォレット起点を確認',
        '2. ミキサー関連アドレスなら手動レビューへ送る',
        '3. 詳細なリスク記録を添えて不正対策チームへ通知'
      ]
    }
  ],
  platformBadge: '本人確認プラットフォームの構成要素',
  platformTitle: 'エンドツーエンドの確認、シグナル、オーケストレーション',
  platformCards: [
    { title: 'フローエディター', desc: '直感的でブランドに合ったフローにより、ユーザーを確認プロセスへ自然に案内し、離脱を減らします。' },
    { title: '確認方法ライブラリ', desc: '公的身分証、セルフィー、データベース、書類確認に加え、PEP、ウォッチリスト、FinCEN 314a レポートなどを組み合わせられます。' },
    { title: 'ケース', desc: '必要な情報を一か所に集約し、リスクの高いユーザーを効率的にレビュー、判断、対応できます。' },
    { title: 'ダイナミックフロー', desc: '地域ごとに収集・補強する情報と、ユーザーや企業の確認方法を選び、現地規制に対応します。' },
    { title: 'ノーコードプラットフォーム', desc: 'Identra のセルフサービスエディター、ドラッグ&ドロップモジュール、テンプレートでオンボーディングフローを簡単に設定・更新できます。' },
    { title: 'データセキュリティとプライバシー', desc: '細かなデータアクセス制御と業界最高水準の認証機能で PII を安全に管理します。' }
  ],
  amlFlow: '動的 AML フロー',
  walletPolicy: '暗号資産ウォレットポリシー',
  onchainRisk: 'オンチェーンリスク',
  passedLow: '合格（低）',
  ofacSanctions: 'OFAC 制裁',
  clean: 'クリーン',
  kycVerification: 'KYC 確認',
  verified: '確認済み',
  automationTitle: 'リアルタイム自動化エンジン',
  automationDesc: 'バックエンドコードを書かずに複雑な確認マトリクスを設定できます。',
  formTitle: 'カスタムデモを開始',
  formDesc: 'あなたについて少し教えてください。営業電話なしで体験をパーソナライズします。',
  formError: '必須項目をすべて入力してください。',
  demoSentTitle: 'カスタムデモリクエストを送信しました',
  demoSentPrefix: 'ありがとうございます、',
  demoSentMiddle: ' さん。暗号資産向け Identra サンドボックス認証情報をカスタマイズし、送信先は ',
  fillAnother: '別のリクエストを入力',
  firstName: '名*',
  lastName: '姓*',
  email: 'メール*',
  website: 'ウェブサイト*',
  companyName: '会社名*',
  jobTitle: '役職',
  firstNamePlaceholder: '花子',
  lastNamePlaceholder: '山田',
  emailPlaceholder: 'hanako.yamada@example.co.jp',
  websitePlaceholder: 'https://company.co.jp',
  companyPlaceholder: 'Apex Technologies',
  jobPlaceholder: 'リスク・コンプライアンス VP',
  viewDemo: 'デモを見る',
  subpoints: [
    { title: '取引所プラットフォーム', desc: '取引を許可する前に世界中のユーザーと企業を即時確認し、安全で規制対応済みの取引環境を実現します。' },
    { title: 'ウォレット', desc: '正当なユーザーだけがアクセスできるようにして、ユーザーとウォレットを不正の脅威から守ります。' },
    { title: 'インフラ', desc: '統合 KYB-KYC により高いセキュリティ基準を維持しながら、地域をまたぐ運用とパートナー支援を拡張します。' }
  ],
  exploreTitle: 'Identra の本人確認プラットフォームをさらに見る',
  exploreComplianceTitle: 'KYC/AML コンプライアンスを調整・拡張。',
  learnCompliance: 'コンプライアンスを見る',
  exploreDatabaseTitle: 'データベースチェックで世界中のユーザーを確認。',
  learnDatabase: 'データベースチェックを見る',
  readyTitle: '始める準備はできましたか？',
  readyDesc: 'お問い合わせいただくか、今すぐ Identra をお試しください。',
  tryNow: '今すぐ試す →'
};

CRYPTOCURRENCY_TRANSLATIONS.de = {
  ...CRYPTOCURRENCY_TRANSLATIONS.es,
  backToPlatform: 'Zurück zur Plattform',
  badge: 'Lösungen • Kryptowährung',
  heroTitle: 'Schützen Sie digitale Assets mit sicherer Identitätsprüfung.',
  heroDesc: 'Verifizieren Sie Nutzer und Unternehmen sofort, um globale KYC-, KYB- und AML-Standards zu erfüllen. Skalieren Sie sicher, reduzieren Sie Reibung und stoppen Sie Krypto-Betrug am Eingang.',
  getDemo: 'Demo anfordern',
  trySandbox: 'Identity-Sandbox testen',
  terminalName: 'KRYPTO_COMPLIANCE_RADAR_v1.0',
  onChainLive: 'ON-CHAIN LIVE',
  scenarioPrompt: 'Wählen Sie ein Wallet-Szenario, um Blockchain-AML-Prüfung in Echtzeit zu simulieren:',
  queryProgress: 'Ledger-Transaktionen werden abgefragt und Watchlists geprüft...',
  decisionBreakdown: 'Aufschlüsselung der Entscheidungslogik:',
  riskScore: 'Risikowert:',
  runAnother: 'Weitere Simulation starten',
  trustedBy: 'Vertraut von Startups und den größten Kryptowährungsunternehmen der Welt',
  bridgeStripe: '(ein Stripe-Unternehmen)',
  statuses: { approve: 'Genehmigen', review: 'Prüfen', block: 'Blockieren' },
  walletChecks: { low: 'Niedriges Risiko', medium: 'Mittleres Risiko', sanctioned: 'Sanktionierter Mixer' },
  kycStatuses: { verified: 'Verifiziert', requiresSelfie: 'Selfie erforderlich', blocked: 'Blockiert' },
  identityMatch: { found: 'TREFFER GEFUNDEN', clean: 'SAUBER' },
  formError: 'Bitte füllen Sie alle Pflichtfelder aus.',
  demoSentTitle: 'Demo-Anfrage gesendet',
  demoSentPrefix: 'Vielen Dank, ',
  demoSentMiddle: '! Wir haben Ihre Identra-Sandbox-Zugangsdaten für Kryptowährung angepasst und an diese Adresse gesendet: ',
  fillAnother: 'Weitere Anfrage ausfüllen',
  firstName: 'Vorname*',
  lastName: 'Nachname*',
  email: 'E-Mail*',
  website: 'Website*',
  companyName: 'Unternehmensname*',
  jobTitle: 'Position',
  firstNamePlaceholder: 'Erika',
  lastNamePlaceholder: 'Mustermann',
  emailPlaceholder: 'erika@firma.de',
  websitePlaceholder: 'https://firma.de',
  companyPlaceholder: 'Apex Technologies GmbH',
  jobPlaceholder: 'VP Risiko & Compliance',
  viewDemo: 'Demo ansehen',
  readyTitle: 'Bereit loszulegen?',
  readyDesc: 'Kontaktieren Sie uns oder entdecken Sie Identra noch heute.',
  tryNow: 'Jetzt ausprobieren →'
};

CRYPTOCURRENCY_TRANSLATIONS.vi = {
  ...CRYPTOCURRENCY_TRANSLATIONS.ja,
  backToPlatform: 'Quay lại nền tảng',
  badge: 'Giải pháp • Tiền mã hóa',
  heroTitle: 'Bảo vệ tài sản số bằng xác minh danh tính an toàn.',
  heroDesc: 'Xác minh người dùng và doanh nghiệp ngay lập tức để đáp ứng tiêu chuẩn KYC, KYB và AML toàn cầu. Mở rộng an toàn, giảm ma sát và chặn gian lận tiền mã hóa ngay từ đầu.',
  getDemo: 'Nhận demo',
  trySandbox: 'Thử sandbox danh tính',
  terminalName: 'RADAR_TUAN_THU_TIEN_MA_HOA_v1.0',
  onChainLive: 'ON-CHAIN TRỰC TIẾP',
  scenarioPrompt: 'Chọn một kịch bản ví để mô phỏng xác minh AML blockchain theo thời gian thực:',
  queryProgress: 'Đang truy vấn giao dịch sổ cái và kiểm tra danh sách theo dõi...',
  decisionBreakdown: 'Phân tích của bộ máy quyết định:',
  riskScore: 'Điểm rủi ro:',
  runAnother: 'Chạy mô phỏng khác',
  trustedBy: 'Được các startup và những công ty tiền mã hóa lớn nhất thế giới tin dùng',
  bridgeStripe: '(một công ty của Stripe)',
  statuses: { approve: 'Duyệt', review: 'Xem xét', block: 'Chặn' },
  walletChecks: { low: 'Rủi ro thấp', medium: 'Rủi ro trung bình', sanctioned: 'Mixer bị trừng phạt' },
  kycStatuses: { verified: 'Đã xác minh', requiresSelfie: 'Cần selfie', blocked: 'Đã chặn' },
  identityMatch: { found: 'TÌM THẤY TRÙNG KHỚP', clean: 'SẠCH' },
  formTitle: 'Bắt đầu demo tùy chỉnh',
  formDesc: 'Hãy cho chúng tôi biết đôi chút về bạn, chúng tôi sẽ cá nhân hóa trải nghiệm mà không cần cuộc gọi bán hàng.',
  formError: 'Vui lòng điền tất cả trường bắt buộc.',
  demoSentTitle: 'Đã gửi yêu cầu demo tùy chỉnh',
  demoSentPrefix: 'Cảm ơn ',
  demoSentMiddle: '! Chúng tôi đã tùy chỉnh thông tin đăng nhập sandbox Identra cho tiền mã hóa và gửi đến ',
  fillAnother: 'Điền yêu cầu khác',
  firstName: 'Tên*',
  lastName: 'Họ*',
  email: 'Email*',
  website: 'Website*',
  companyName: 'Tên công ty*',
  jobTitle: 'Chức danh',
  firstNamePlaceholder: 'An',
  lastNamePlaceholder: 'Nguyễn',
  emailPlaceholder: 'an@congty.com',
  websitePlaceholder: 'https://congty.com',
  companyPlaceholder: 'Công ty Apex',
  jobPlaceholder: 'Phó chủ tịch Rủi ro & Tuân thủ',
  viewDemo: 'Xem demo',
  readyTitle: 'Sẵn sàng bắt đầu?',
  readyDesc: 'Liên hệ hoặc bắt đầu khám phá Identra hôm nay.',
  tryNow: 'Thử ngay →'
};

Object.assign(CRYPTOCURRENCY_TRANSLATIONS.ja, {
  logs: {
    step1: '[1/4] ウォレットアドレスのオンチェーン履歴とスマートコントラクト連携を確認中...',
    wallet: '[Wallet Check] アドレス状態: {walletCheck}。直接的な露出レベルを評価中。',
    step2: '[2/4] 実在の本人確認指標をグローバル制裁リストと AML リストに照合中...',
    watchlist: '[Watchlist Check] PEP/OFAC 状態を確認しました。本人解決の一致: {match}。',
    step3: '[3/4] ブラウザー信号、IP 評判、行動属性を解析中...',
    signal: '[Signal Intel] IP クラス: {ip}。VPN プロキシを確認中。',
    step4: '[4/4] Identra の意思決定マトリクスルールエンジンに変数を投入中...',
    decision: '[Decision] 累積リスク: {risk}/100。アクション: {status}。'
  },
  scenarios: {
    good: {
      name: 'Alex Rivera',
      type: '個人向けウォレット有効化',
      wallet: '0x71C...3a9b (Coinbase Custody)',
      email: 'alex.rivera@gmail.com',
      ip: '192.168.1.45 (Miami, FL - 住宅回線)',
      title: 'Alex Rivera（規制対象投資家）',
      subtitle: '低リスクウォレット • 自動承認確認',
      details: [
        'ウォレットは信頼性の高い規制対象取引所に関連付けられています。',
        'P2P ダークネット市場との取引履歴はありません。',
        'OFAC とグローバルウォッチリストの確認は 100% クリーンでした。',
        '公的身分証と顔バイオメトリクスが正常に一致しました。'
      ]
    },
    review: {
      name: 'Devon Miller',
      type: '大口取引所入金',
      wallet: '0x3f5...991a (DEX 流動性プロバイダー)',
      email: 'devon_miller_99@protonmail.com',
      ip: '82.102.23.11 (NordVPN サーバー - ドイツ)',
      title: 'Devon Miller（DEX と VPN の活動）',
      subtitle: '中リスクウォレット • 動的セルフィー確認',
      details: [
        '商用 VPN プロバイダー経由のアクティブ接続を検出しました。',
        'ウォレットは最近、KYC なしの分散型ブリッジとやり取りしました。',
        '取引量がユーザー申告の所得帯を超えています。',
        '継続的なセッション所有を確認するためセルフィー確認を要求しました。'
      ]
    },
    block: {
      name: '開示済みの疑わしい主体',
      type: '機関向けオンボーディング試行',
      wallet: '0x90F...e7d2 (Tornado Cash との相互作用)',
      email: 'anonymous_defi_user@torbox.sh',
      ip: '185.112.144.9 (盗用プロキシサーバー)',
      title: '疑わしい主体（Mixer/OFAC ブロック）',
      subtitle: '制裁対象コントラクト露出 • 自動ブロック',
      details: [
        'OFAC 制裁対象スマートコントラクト（Tornado Cash）から直接入金がありました。',
        '合成 ID プロファイル: 死亡者記録レジストリで SSN フラグが有効です。',
        'IP 住所の地域不一致: ユーザーは米国を申告しましたが、盗用プロキシ経由です。',
        'AML SAR レポートを自動作成し、コンプライアンス担当者のキューに追加しました。'
      ]
    }
  }
});

Object.assign(CRYPTOCURRENCY_TRANSLATIONS.de, {
  rows: [
    {
      title: 'Identitätsdaten erfassen',
      desc: 'Wählen Sie, wie Sie Nutzer und Unternehmen verifizieren: mit Ausweis, Selfie, Dokumentenprüfung und dynamischer Reibung je nach Risiko. Halten Sie die Conversion für risikoarme Nutzer hoch und aktivieren Sie robuste Prüfungen bei steigenden Risikosignalen.',
      cardTitle: 'Dynamische Reibungssteuerung',
      cardDesc: 'Basierend auf On-Chain-Wallet-Exposition und Geografie',
      metricLabel: 'Erforderlicher Verifizierungsschritt',
      metricValue: 'Nur Standard-KYC',
      note: 'Nutzer aus risikoarmer Jurisdiktion mit verifizierter Wallet: sekundäre Dokumentuploads überspringen.'
    },
    {
      title: 'Due Diligence durchführen',
      desc: 'Führen Sie Prüfungen für Watchlists, negative Medien, PEP, FinCEN 314a und mehr aus und prüfen Sie Treffer im manuellen Review-Hub von Identra. Kombinieren Sie Adressprüfungen und Telefonrisikometriken, um synthetische Identitäten sofort zu erkennen.',
      cardTitle: 'Umfassender Compliance-Scan',
      cardDesc: 'Globale Sanktionen und PEP-Prüfungen in Echtzeit',
      metricOneLabel: 'Sanktionslisten',
      metricOneValue: '0 Treffer gefunden',
      metricTwoLabel: 'PEP-Prüfung',
      metricTwoValue: 'Saubere Einträge'
    },
    {
      title: 'Schneller und besser entscheiden',
      desc: 'Straffen Sie Abläufe mit einer Plattform für Ermittlungen, großflächige Betrugserkennung und schnelle Folgeaktionen. Nutzen Sie Link-Analyse-Grafen, um verschachtelte Netzwerke von Multi-Account-Betrug aufzudecken.',
      cardTitle: 'Entscheidungsautomatisierung',
      cardDesc: 'Transaktionsblockierung und Untersuchungsrouting automatisieren',
      ruleLabel: 'Bei Flag für große Einzahlung:',
      steps: [
        '1. Wallet-Ursprung über On-Chain-Datenanbieter prüfen',
        '2. Bei Mixer-Verknüpfung an manuelle Prüfung weiterleiten',
        '3. Betrugsteam sofort mit detailliertem Risikodossier benachrichtigen'
      ]
    }
  ],
  platformBadge: 'Bausteine der Identitätsplattform',
  platformTitle: 'Verifizierungen, Signale und Orchestrierung von Ende zu Ende',
  platformCards: [
    { title: 'Flow-Editor', desc: 'Reduzieren Sie Frust mit intuitiven, markengerechten Flows, die Nutzer durch die Verifizierung führen.' },
    { title: 'Bibliothek der Verifizierungsmethoden', desc: 'Kombinieren Sie Ausweis, Selfie, Datenbank- und Dokumentenprüfungen sowie PEP-, Watchlist- und FinCEN-314a-Berichte passend zu Ihren Anforderungen.' },
    { title: 'Cases', desc: 'Prüfen Sie Informationen, treffen Sie Entscheidungen und handeln Sie bei riskanteren Nutzern effizient mit allen Daten an einem Ort.' },
    { title: 'Dynamic Flow', desc: 'Erfüllen Sie lokale Vorschriften, indem Sie pro Region festlegen, welche Informationen erhoben, angereichert und wie Nutzer und Unternehmen verifiziert werden.' },
    { title: 'No-Code-Plattform', desc: 'Konfigurieren und aktualisieren Sie Onboarding-Flows einfach mit Identras Self-Service-Editor, Drag-and-drop-Modulen und Vorlagen.' },
    { title: 'Datensicherheit und Datenschutz', desc: 'Verwalten Sie PII sicher mit granularen Zugriffskontrollen und zertifizierten Funktionen nach höchsten Branchenstandards.' }
  ],
  amlFlow: 'Dynamischer AML-Flow',
  walletPolicy: 'Krypto-Wallet-Richtlinie',
  onchainRisk: 'On-Chain-Risiko',
  passedLow: 'Bestanden (niedrig)',
  ofacSanctions: 'OFAC-Sanktionen',
  clean: 'Sauber',
  kycVerification: 'KYC-Verifizierung',
  verified: 'Verifiziert',
  automationTitle: 'Automatisierungsengine in Echtzeit',
  automationDesc: 'Konfigurieren Sie komplexe Verifizierungsmatrizen ohne eine Zeile Backend-Code.',
  formTitle: 'Starten Sie Ihre individuelle Demo',
  formDesc: 'Erzählen Sie uns kurz von sich, und wir personalisieren die Erfahrung ohne Vertriebsanruf.',
  subpoints: [
    { title: 'Exchange-Plattformen', desc: 'Ermöglichen Sie sichere und konforme Handelsumgebungen, indem Sie Nutzer und Unternehmen weltweit vor Transaktionen sofort verifizieren.' },
    { title: 'Wallets', desc: 'Schützen Sie Ihre Nutzer und Wallet vor Betrugsrisiken, indem nur legitime Nutzer Zugriff erhalten.' },
    { title: 'Infrastruktur', desc: 'Skalieren Sie Abläufe und unterstützen Sie Partner in verschiedenen Regionen mit hohen Sicherheitsstandards und integriertem KYB-KYC.' }
  ],
  exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
  exploreComplianceTitle: 'KYC/AML-Compliance anpassen und skalieren.',
  learnCompliance: 'Compliance ansehen',
  exploreDatabaseTitle: 'Nutzer weltweit mit Datenbankprüfungen verifizieren.',
  learnDatabase: 'Datenbankprüfungen ansehen',
  logs: {
    step1: '[1/4] On-Chain-Historie der Wallet-Adresse und Smart-Contract-Interaktionen werden geprüft...',
    wallet: '[Wallet Check] Adressstatus: {walletCheck}. Direkte Exposition wird bewertet.',
    step2: '[2/4] Identitätsmetriken werden gegen globale Sanktions- und AML-Listen geprüft...',
    watchlist: '[Watchlist Check] PEP/OFAC-Status geprüft. Identitätsabgleich: {match}.',
    step3: '[3/4] Browsersignale, IP-Reputation und Verhaltensattribute werden analysiert...',
    signal: '[Signal Intel] IP-Klasse: {ip}. VPN-Proxys werden geprüft.',
    step4: '[4/4] Variablen werden in Identras Entscheidungsregel-Engine eingespeist...',
    decision: '[Decision] Kumuliertes Risiko: {risk}/100. Aktion: {status}.'
  },
  scenarios: {
    good: {
      name: 'Alex Rivera',
      type: 'Aktivierung einer Retail-Wallet',
      wallet: '0x71C...3a9b (Coinbase Custody)',
      email: 'alex.rivera@gmail.com',
      ip: '192.168.1.45 (Miami, FL - Privatanschluss)',
      title: 'Alex Rivera (regulierter Investor)',
      subtitle: 'Wallet mit niedrigem Risiko • Automatische Genehmigung',
      details: [
        'Wallet ist mit einer renommierten regulierten Börse verbunden.',
        'Keine Historie von Peer-to-Peer-Darknet-Marktplätzen.',
        'OFAC- und globale Watchlist-Prüfung waren vollständig sauber.',
        'Ausweis stimmt erfolgreich mit Gesichtbiometrie überein.'
      ]
    },
    review: {
      name: 'Devon Miller',
      type: 'Großvolumige Exchange-Einzahlung',
      wallet: '0x3f5...991a (DEX-Liquiditätsanbieter)',
      email: 'devon_miller_99@protonmail.com',
      ip: '82.102.23.11 (NordVPN-Server - Deutschland)',
      title: 'Devon Miller (DEX- und VPN-Aktivität)',
      subtitle: 'Wallet mit mittlerem Risiko • Dynamische Selfie-Verifizierung',
      details: [
        'Aktive Verbindung über kommerziellen VPN-Anbieter erkannt.',
        'Wallet interagierte kürzlich mit einer dezentralen Bridge ohne KYC.',
        'Transaktionsvolumen übersteigt die angegebene Einkommensspanne.',
        'Selfie-Verifizierung angefordert, um fortlaufenden Sitzungsbesitz zu bestätigen.'
      ]
    },
    block: {
      name: 'Offengelegte verdächtige Entität',
      type: 'Institutioneller Onboarding-Versuch',
      wallet: '0x90F...e7d2 (Tornado-Cash-Interaktion)',
      email: 'anonymous_defi_user@torbox.sh',
      ip: '185.112.144.9 (gestohlener Proxy-Server)',
      title: 'Verdächtige Entität (Mixer/OFAC-Block)',
      subtitle: 'Exposition gegenüber sanktioniertem Vertrag • Automatischer Block',
      details: [
        'Direkter Eingangstransfer aus OFAC-sanktioniertem Smart Contract (Tornado Cash).',
        'Synthetisches Identitätsprofil: SSN-Flag aus Register verstorbener Personen.',
        'IP-Geografie stimmt nicht überein: Nutzer gab USA an, Routing über gestohlenen Proxy.',
        'AML-SAR-Bericht automatisch erstellt und für Compliance Officer eingereiht.'
      ]
    }
  }
});

Object.assign(CRYPTOCURRENCY_TRANSLATIONS.vi, {
  rows: [
    {
      title: 'Thu thập thông tin danh tính',
      desc: 'Chọn cách xác minh người dùng và doanh nghiệp, từ giấy tờ chính phủ, selfie đến xác minh tài liệu, đồng thời điều chỉnh ma sát linh hoạt theo rủi ro. Giữ tỷ lệ chuyển đổi cao cho người dùng rủi ro thấp và áp dụng kiểm tra mạnh khi tín hiệu rủi ro tăng.',
      cardTitle: 'Điều khiển ma sát động',
      cardDesc: 'Dựa trên mức phơi nhiễm ví on-chain và khu vực',
      metricLabel: 'Bước xác minh bắt buộc',
      metricValue: 'Chỉ KYC tiêu chuẩn',
      note: 'Người dùng từ khu vực rủi ro thấp với ví đã xác minh: bỏ qua tải lên tài liệu phụ.'
    },
    {
      title: 'Thực hiện thẩm định',
      desc: 'Chạy báo cáo danh sách theo dõi, tin tức bất lợi, PEP, FinCEN 314a và nhiều nguồn khác, sau đó xem xét kết quả trong trung tâm đánh giá thủ công của Identra. Đối chiếu địa chỉ và rủi ro điện thoại tức thì để phát hiện danh tính giả.',
      cardTitle: 'Quét tuân thủ toàn diện',
      cardDesc: 'Sàng lọc trừng phạt toàn cầu và PEP theo thời gian thực',
      metricOneLabel: 'Danh sách trừng phạt',
      metricOneValue: '0 kết quả trùng',
      metricTwoLabel: 'Sàng lọc PEP',
      metricTwoValue: 'Hồ sơ sạch'
    },
    {
      title: 'Ra quyết định nhanh và tốt hơn',
      desc: 'Tinh gọn vận hành bằng một nền tảng để điều tra, phát hiện gian lận quy mô lớn và thực hiện hành động tiếp theo nhanh chóng. Tận dụng biểu đồ phân tích liên kết để lộ mạng lưới gian lận nhiều tài khoản.',
      cardTitle: 'Tự động hóa quyết định',
      cardDesc: 'Tự động chặn giao dịch và định tuyến điều tra',
      ruleLabel: 'Khi có cờ tiền gửi lớn:',
      steps: [
        '1. Sàng lọc nguồn gốc ví qua nhà cung cấp dữ liệu on-chain',
        '2. Chuyển sang đánh giá thủ công nếu địa chỉ liên quan đến mixer',
        '3. Thông báo ngay cho đội gian lận với hồ sơ rủi ro chi tiết'
      ]
    }
  ],
  platformBadge: 'Khối xây dựng nền tảng danh tính',
  platformTitle: 'Xác minh, tín hiệu và điều phối từ đầu đến cuối',
  platformCards: [
    { title: 'Trình chỉnh sửa luồng', desc: 'Giảm khó chịu cho khách hàng bằng các luồng trực quan, có thương hiệu, hướng dẫn họ qua quy trình xác minh.' },
    { title: 'Thư viện phương thức xác minh', desc: 'Kết hợp giấy tờ chính phủ, selfie, cơ sở dữ liệu, xác minh tài liệu cùng báo cáo PEP, watchlist và FinCEN 314a phù hợp với nhu cầu.' },
    { title: 'Hồ sơ', desc: 'Xem xét thông tin, ra quyết định và hành động với người dùng rủi ro cao hơn bằng mọi dữ liệu cần thiết ở một nơi.' },
    { title: 'Luồng động', desc: 'Đáp ứng quy định địa phương bằng cách chọn thông tin cần thu thập, làm giàu và cách xác minh người dùng/doanh nghiệp cho từng khu vực.' },
    { title: 'Nền tảng không cần mã', desc: 'Dễ dàng cấu hình và cập nhật luồng onboarding bằng trình chỉnh sửa tự phục vụ, mô-đun kéo thả và mẫu dựng sẵn của Identra.' },
    { title: 'Bảo mật và quyền riêng tư dữ liệu', desc: 'Quản lý PII an toàn với kiểm soát truy cập chi tiết và tính năng tuân thủ được chứng nhận theo tiêu chuẩn cao nhất.' }
  ],
  amlFlow: 'Luồng AML động',
  walletPolicy: 'Chính sách ví tiền mã hóa',
  onchainRisk: 'Rủi ro on-chain',
  passedLow: 'Đạt (thấp)',
  ofacSanctions: 'Trừng phạt OFAC',
  clean: 'Sạch',
  kycVerification: 'Xác minh KYC',
  verified: 'Đã xác minh',
  automationTitle: 'Bộ máy tự động hóa thời gian thực',
  automationDesc: 'Cấu hình ma trận xác minh phức tạp mà không cần viết dòng mã backend nào.',
  subpoints: [
    { title: 'Sàn giao dịch', desc: 'Cho phép môi trường giao dịch an toàn và tuân thủ bằng cách xác minh ngay người dùng và doanh nghiệp toàn cầu trước khi cho phép giao dịch.' },
    { title: 'Ví', desc: 'Bảo vệ người dùng và ví của bạn khỏi nguy cơ gian lận bằng cách đảm bảo chỉ người dùng hợp lệ được truy cập.' },
    { title: 'Hạ tầng', desc: 'Mở rộng vận hành và hỗ trợ đối tác ở nhiều khu vực trong khi duy trì tiêu chuẩn bảo mật cao nhất với KYB-KYC tích hợp.' }
  ],
  exploreTitle: 'Khám phá thêm nền tảng danh tính của Identra',
  exploreComplianceTitle: 'Tùy chỉnh và mở rộng tuân thủ KYC/AML.',
  learnCompliance: 'Tìm hiểu tuân thủ',
  exploreDatabaseTitle: 'Xác minh người dùng toàn cầu bằng kiểm tra cơ sở dữ liệu.',
  learnDatabase: 'Tìm hiểu kiểm tra cơ sở dữ liệu',
  logs: {
    step1: '[1/4] Đang truy vấn lịch sử on-chain và tương tác smart contract của địa chỉ ví...',
    wallet: '[Wallet Check] Trạng thái địa chỉ: {walletCheck}. Đang đánh giá mức phơi nhiễm trực tiếp.',
    step2: '[2/4] Đang sàng lọc chỉ số danh tính với danh sách trừng phạt toàn cầu và AML...',
    watchlist: '[Watchlist Check] Đã kiểm tra trạng thái PEP/OFAC. Kết quả khớp danh tính: {match}.',
    step3: '[3/4] Đang phân tích tín hiệu trình duyệt, uy tín IP và thuộc tính hành vi...',
    signal: '[Signal Intel] Lớp IP: {ip}. Đang kiểm tra proxy mạng riêng ảo.',
    step4: '[4/4] Đang đưa biến vào công cụ quy tắc ma trận quyết định của Identra...',
    decision: '[Decision] Rủi ro tích lũy: {risk}/100. Hành động: {status}.'
  },
  scenarios: {
    good: {
      name: 'Alex Rivera',
      type: 'Kích hoạt ví cá nhân',
      wallet: '0x71C...3a9b (Coinbase Custody)',
      email: 'alex.rivera@gmail.com',
      ip: '192.168.1.45 (Miami, FL - mạng dân cư)',
      title: 'Alex Rivera (nhà đầu tư được quản lý)',
      subtitle: 'Ví rủi ro thấp • Tự động phê duyệt xác minh',
      details: [
        'Ví liên kết với sàn giao dịch được quản lý có uy tín cao.',
        'Không có lịch sử tương tác với chợ darknet ngang hàng.',
        'Kiểm tra OFAC và danh sách theo dõi toàn cầu trả về 100% sạch.',
        'Giấy tờ chính phủ khớp thành công với sinh trắc học khuôn mặt.'
      ]
    },
    review: {
      name: 'Devon Miller',
      type: 'Nạp tiền sàn giao dịch khối lượng cao',
      wallet: '0x3f5...991a (nhà cung cấp thanh khoản DEX)',
      email: 'devon_miller_99@protonmail.com',
      ip: '82.102.23.11 (máy chủ NordVPN - Đức)',
      title: 'Devon Miller (hoạt động DEX & VPN)',
      subtitle: 'Ví rủi ro trung bình • Xác minh selfie động',
      details: [
        'Phát hiện kết nối đang hoạt động qua nhà cung cấp VPN thương mại.',
        'Ví gần đây tương tác với cầu nối phi tập trung không KYC.',
        'Khối lượng giao dịch vượt quá mức thu nhập người dùng khai báo.',
        'Đã yêu cầu selfie để xác nhận quyền sở hữu phiên liên tục.'
      ]
    },
    block: {
      name: 'Thực thể đáng ngờ đã khai báo',
      type: 'Nỗ lực onboarding tổ chức',
      wallet: '0x90F...e7d2 (tương tác Tornado Cash)',
      email: 'anonymous_defi_user@torbox.sh',
      ip: '185.112.144.9 (máy chủ proxy bị đánh cắp)',
      title: 'Thực thể đáng ngờ (chặn Mixer/OFAC)',
      subtitle: 'Phơi nhiễm hợp đồng bị trừng phạt • Tự động chặn',
      details: [
        'Chuyển tiền vào trực tiếp từ smart contract bị OFAC trừng phạt (Tornado Cash).',
        'Hồ sơ danh tính tổng hợp: cờ SSN từ cơ sở dữ liệu người đã mất.',
        'IP không khớp địa lý: người dùng khai Hoa Kỳ nhưng định tuyến qua proxy bị đánh cắp.',
        'Báo cáo AML SAR được soạn tự động và đưa vào hàng đợi cho cán bộ tuân thủ.'
      ]
    }
  }
});
