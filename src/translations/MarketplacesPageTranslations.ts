/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MARKETPLACES_PAGE_TRANSLATIONS = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'Solutions • Marketplaces',
    heroTitle: 'Balance conversion and risk for every side of your marketplace.',
    heroDesc: "Build trust and protect your marketplace with identity verification that's tough on fraudsters but easy on your users, sellers, and couriers.",
    getDemo: 'Get a demo',
    trySandbox: 'Try identity sandbox',
    terminal: {
      engine: 'MARKETPLACE_TRUST_ENGINE_v1.0',
      autoReview: 'AUTO REVIEW',
      promptPrefix: '>',
      selectPrompt: 'Select a marketplace role scenario to simulate live verification:',
      running: 'Running biometrics, registries, background & device screens...',
      riskDetails: 'Risk Assessment Details:',
      deviceRisk: 'Device Risk Check:',
      runAnother: 'Run another simulation',
      roles: { Seller: 'Seller', Courier: 'Courier', Buyer: 'Buyer' },
      statuses: { Approve: 'APPROVE', Review: 'REVIEW', Block: 'BLOCK' },
      idChecks: { Verified: 'Verified', Unverified: 'Unverified', Failed: 'Failed' },
      dbChecks: { Match: 'Match', 'Partial Match': 'Partial Match', Mismatched: 'Mismatched' },
      scenarios: {
        good_seller: {
          name: 'Marcus Vance',
          type: 'Handmade Crafts Seller (KYS)',
          role: 'Seller',
          idCheck: 'Verified',
          dbCheck: 'Match',
          riskScore: 8,
          status: 'Approve',
          buttonTitle: 'Marcus (Handmade Seller)',
          buttonSubtitle: 'Global KYB / IRS Verification • Pass',
          details: [
            'Government ID matches selfie image (98.6% confidence).',
            'PII matches global business registry and IRS database.',
            'Device IP is residential and matches declared physical address.',
            'No duplicate or connected fraudulent devices detected.'
          ]
        },
        courier_review: {
          name: 'Alex Rivera',
          type: 'Gig Delivery Courier',
          role: 'Courier',
          idCheck: 'Verified',
          dbCheck: 'Partial Match',
          riskScore: 54,
          status: 'Review',
          buttonTitle: 'Alex (Gig Delivery Courier)',
          buttonSubtitle: 'MVR check mismatch • Route to Cases',
          details: [
            'Government ID matches selfie successfully.',
            'Criminal background check: No flags found.',
            'Motor Vehicle Record: MVR mismatch on active license expiration date.',
            'Requires manual operator check to verify license status.'
          ]
        },
        buyer_block: {
          name: 'Thomas Thorne (Promo Abuse Flag)',
          type: 'Guest Buyer Checkout',
          role: 'Buyer',
          idCheck: 'Unverified',
          dbCheck: 'Mismatched',
          riskScore: 92,
          status: 'Block',
          buttonTitle: 'Thomas (Guest Buyer Checkout)',
          buttonSubtitle: 'Device Fingerprint Match • Auto Block',
          details: [
            'Device fingerprint linked to 14 other unique accounts (promo abuse).',
            'IP address flags: active commercial proxy class identified.',
            'Phone number flags: VoIP burner number registered 4 hours ago.',
            'Proactively blocked device and associated payment tokens.'
          ]
        }
      },
      logs: {
        scanId: '[1/4] Scanning driver license / government ID and capturing selfie liveness...',
        biometrics: '[Biometrics] Selfie match result: {result}.',
        livenessFail: 'Liveness Fail',
        matchConfirmed: 'Match Confirmed',
        registries: '[2/4] Verifying identity data across global registries and national databases...',
        database: '[Database] Business name / PII verification: {result}.',
        device: '[3/4] Running device intelligence and network trust algorithms...',
        riskIntel: '[Risk Intel] Analyzing device duplicates, network proxies, and geolocations...',
        compliance: '[4/4] Processing automated compliance rules (INFORM Act / DAC7 / background checks)...',
        decision: '[Decision] Risk rating calculated at {score}/100. Action: {status}.'
      }
    },
    trusted: {
      label: 'Trusted by top global marketplaces & platforms',
      brands: ['Etsy', 'GET YOUR GUIDE', 'fiverr']
    },
    differentiators: [
      {
        badge: 'GLOBAL SCALE',
        title: 'Say "yes" to more users with global verifications and screenings',
        desc: "Verify more individuals and businesses with verification flows that dynamically adjust friction based on users' risk signals. Automatically route users to different checklists based on geolocation, language, and threat indicators.",
        cardTitle: 'Dynamic Verification Path',
        cardSubtitle: 'Auto-routes to minimize abandonment',
        metricLabel: 'Verification Friction',
        metricValue: 'Standard Fast-Track',
        note: 'User is on local cellular connection. Bypass secondary database check.'
      },
      {
        badge: 'ACTIVE PREVENTION',
        title: 'Protect your platform from bad actors',
        desc: 'Trigger safety mechanisms like reverifications and list screenings at any point of the customer life cycle. Collect and compare user data over time to prevent account takeovers, detect duplicate devices, and minimize account sharing.',
        cardTitle: 'Life-cycle Safety Triggers',
        cardSubtitle: 'Block duplicate accounts & takeover attempts',
        stats: [
          { label: 'Device Fingerprint', value: '12 duplicate match' },
          { label: 'Re-verification', value: 'Triggered on payout' }
        ]
      },
      {
        badge: 'CENTRALIZED CONTROL',
        title: 'Consolidate and automate all your identity processes',
        desc: 'Build and launch faster with a comprehensive platform and custom automation rules. Adapt to new compliance requirements like the INFORM Act, DAC7, and DSA by adding new workflows seamlessly without engineering resource locks.',
        cardTitle: 'Automated Workflows',
        cardSubtitle: 'Visual canvas for complex routing',
        trigger: 'On High-Value Seller Registration:',
        steps: ['1. Extract Tax ID (EIN) & check IRS register', '2. Match global PEP and sanctions list', '3. Generate compliant DAC7 seller log']
      }
    ],
    featureSuite: {
      badge: 'Comprehensive Feature Suite',
      title: 'End-to-end trust tools for peer-to-peer marketplaces',
      items: [
        { title: 'Government ID verification', desc: 'Collect and verify your choice of government-issued IDs across 200+ countries and territories, then ensure the ID photo matches the selfie for added assurance.' },
        { title: 'Background checks', desc: 'Integrate criminal background and motor vehicle records (MVR) screening to onboard trust-safe couriers and service providers.' },
        { title: 'Regional database verifications', desc: 'Verify collected and extracted PII against authoritative databases and issuing sources across 40+ countries.' },
        { title: 'Risk signals', desc: 'Automatically collect risk signals like VPN, residential proxies, and browser configuration to detect sophisticated bad actors.' },
        { title: 'Duplicate account detection', desc: 'Proactively block users whose device fingerprints or PII match existing profiles to prevent promo abuse and multiple signups.' },
        { title: 'Global business registry verification', desc: 'Verify the business name, registry ID, registration address, and active status of merchant and seller entities.' },
        { title: 'Document collection', desc: 'Collect and extract insights from business licenses, bank statements, and utility bills using robust OCR parsing.' },
        { title: 'NFC verification', desc: 'Verify passports and e-IDs globally via NFC technology for extremely high-assurance onboarding.' },
        { title: 'VAT verification', desc: 'Verify the VAT number of European merchant entities directly through official regional tax systems.' }
      ]
    },
    demo: {
      visualBadge: 'KYB-KYC Flow',
      visualTitle: 'Etsy Seller Protocol',
      visualRows: [
        { label: 'EIN Business Status', value: 'Matched' },
        { label: 'IRS verification', value: 'Passed' },
        { label: 'INFORM Act log', value: 'Created' }
      ],
      visualHeading: 'Automate compliance dynamically',
      visualDesc: 'Implement ready-to-use policy checklists for local, state, and international compliance regulations.',
      title: 'Start your custom marketplace demo',
      desc: "Tell us a bit about your marketplace platform, and we'll configure a tailored sandbox workflow for your exact business model.",
      requiredAlert: 'Please fill out all required fields.',
      successTitle: 'Custom Demo Requested',
      successPrefix: 'Thank you,',
      successMiddle: 'Your customized marketplace identity sandbox is ready. Check your inbox at',
      successSuffix: 'for integration guides.',
      requestAnother: 'Request another sandbox demo',
      fields: {
        firstName: 'First name*',
        lastName: 'Last name*',
        workEmail: 'Work email*',
        platformUrl: 'Marketplace platform URL*',
        companyName: 'Company name*',
        jobTitle: 'Job title'
      },
      placeholders: {
        firstName: 'Sarah',
        lastName: 'Jenkins',
        workEmail: 'sjenkins@marketplace.io',
        platformUrl: 'https://marketplace.io',
        companyName: 'CraftSpace Ltd',
        jobTitle: 'Head of Trust & Safety'
      },
      submit: 'View custom demo'
    },
    checklist: [
      { title: 'Know Your Seller (KYS)', desc: 'Seamlessly collect, verify, and monitor business entities and individual merchant data to establish platform legitimacy.' },
      { title: 'INFORM Act compliance', desc: 'Automate compliance requirements for high-volume third-party sellers on retail and peer-to-peer marketplaces.' },
      { title: 'DAC7 & DSA compliance', desc: 'Ensure perfect alignment with European tax data collection rules and digital service act provider reporting requirements.' },
      { title: 'IRS 1099 verification', desc: 'Directly check W-9 and tax identification information against official government registration lists.' },
      { title: 'Right to work checks', desc: 'Perform rapid localized employment and document verification screenings for on-demand couriers and gig workers.' },
      { title: 'Multi-sided trust layers', desc: 'Secure buyers from scammers while enabling high-volume merchants to withdraw funds safely without high friction.' }
    ],
    explore: {
      title: "Explore more of Identra's identity platform",
      cards: [
        { title: 'Verify merchants and sellers behind them with integrated KYB-KYC.', cta: 'Learn KYB-KYC solutions' },
        { title: 'Build dynamic age assurance flows.', cta: 'Learn age verification' }
      ]
    },
    cta: {
      title: 'Ready to get started?',
      desc: 'Build bulletproof marketplace trust and compliant partner onboarding.',
      primary: 'Get a demo',
      secondary: 'Try it now →'
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Soluciones • Marketplaces',
    heroTitle: 'Equilibra conversión y riesgo en cada lado de tu marketplace.',
    heroDesc: 'Genera confianza y protege tu marketplace con verificación de identidad estricta contra defraudadores y sencilla para usuarios, vendedores y repartidores.',
    getDemo: 'Solicitar demo',
    trySandbox: 'Probar sandbox de identidad',
    terminal: {
      engine: 'MARKETPLACE_TRUST_ENGINE_v1.0',
      autoReview: 'REVISIÓN AUTOMÁTICA',
      promptPrefix: '>',
      selectPrompt: 'Selecciona un rol del marketplace para simular verificación en vivo:',
      running: 'Ejecutando biometría, registros, antecedentes y señales de dispositivo...',
      riskDetails: 'Detalles de evaluación de riesgo:',
      deviceRisk: 'Control de riesgo del dispositivo:',
      runAnother: 'Ejecutar otra simulación',
      roles: { Seller: 'Vendedor', Courier: 'Repartidor', Buyer: 'Comprador' },
      statuses: { Approve: 'APROBAR', Review: 'REVISAR', Block: 'BLOQUEAR' },
      idChecks: { Verified: 'Verificado', Unverified: 'Sin verificar', Failed: 'Fallido' },
      dbChecks: { Match: 'Coincidencia', 'Partial Match': 'Coincidencia parcial', Mismatched: 'No coincide' },
      scenarios: {
        good_seller: { name: 'Marcus Vance', type: 'Vendedor de artesanías (KYS)', role: 'Seller', idCheck: 'Verified', dbCheck: 'Match', riskScore: 8, status: 'Approve', buttonTitle: 'Marcus (vendedor artesanal)', buttonSubtitle: 'Verificación KYB / IRS global • Aprobado', details: ['El documento oficial coincide con la selfie (98,6% de confianza).', 'La PII coincide con el registro empresarial global y la base del IRS.', 'La IP del dispositivo es residencial y coincide con la dirección declarada.', 'No se detectaron dispositivos duplicados o conectados con fraude.'] },
        courier_review: { name: 'Alex Rivera', type: 'Repartidor de economía gig', role: 'Courier', idCheck: 'Verified', dbCheck: 'Partial Match', riskScore: 54, status: 'Review', buttonTitle: 'Alex (repartidor gig)', buttonSubtitle: 'Diferencia en MVR • Enviar a Casos', details: ['El documento oficial coincide correctamente con la selfie.', 'Antecedentes penales: sin alertas.', 'Registro vehicular: diferencia en fecha de vencimiento de licencia activa.', 'Requiere revisión manual para verificar el estado de la licencia.'] },
        buyer_block: { name: 'Thomas Thorne (alerta de abuso promocional)', type: 'Compra invitada', role: 'Buyer', idCheck: 'Unverified', dbCheck: 'Mismatched', riskScore: 92, status: 'Block', buttonTitle: 'Thomas (compra invitada)', buttonSubtitle: 'Huella de dispositivo coincidente • Bloqueo automático', details: ['Huella de dispositivo vinculada a 14 cuentas únicas (abuso promocional).', 'Alertas de IP: proxy comercial activo identificado.', 'Alertas de teléfono: número VoIP desechable registrado hace 4 horas.', 'Dispositivo y tokens de pago asociados bloqueados proactivamente.'] }
      },
      logs: { scanId: '[1/4] Escaneando licencia / documento oficial y capturando vida de selfie...', biometrics: '[Biometría] Resultado de coincidencia de selfie: {result}.', livenessFail: 'Fallo de vida', matchConfirmed: 'Coincidencia confirmada', registries: '[2/4] Verificando datos de identidad en registros globales y bases nacionales...', database: '[Base de datos] Verificación de nombre comercial / PII: {result}.', device: '[3/4] Ejecutando inteligencia de dispositivo y algoritmos de confianza de red...', riskIntel: '[Intel. de riesgo] Analizando dispositivos duplicados, proxies y geolocalización...', compliance: '[4/4] Procesando reglas de cumplimiento automatizadas (INFORM Act / DAC7 / antecedentes)...', decision: '[Decisión] Riesgo calculado en {score}/100. Acción: {status}.' }
    },
    trusted: { label: 'Con la confianza de marketplaces y plataformas globales líderes', brands: ['Etsy', 'GET YOUR GUIDE', 'fiverr'] },
    differentiators: [
      { badge: 'ESCALA GLOBAL', title: 'Di "sí" a más usuarios con verificaciones y controles globales', desc: 'Verifica más personas y negocios con flujos que ajustan la fricción según señales de riesgo. Enruta automáticamente por ubicación, idioma e indicadores de amenaza.', cardTitle: 'Ruta dinámica de verificación', cardSubtitle: 'Enrutamiento automático para reducir abandono', metricLabel: 'Fricción de verificación', metricValue: 'Vía rápida estándar', note: 'El usuario usa conexión celular local. Omitir control secundario de base de datos.' },
      { badge: 'PREVENCIÓN ACTIVA', title: 'Protege tu plataforma de malos actores', desc: 'Activa reverificaciones y controles de listas en cualquier punto del ciclo de vida. Compara datos de usuario con el tiempo para evitar tomas de cuenta, dispositivos duplicados y cuentas compartidas.', cardTitle: 'Disparadores de seguridad del ciclo de vida', cardSubtitle: 'Bloquea cuentas duplicadas e intentos de toma de cuenta', stats: [{ label: 'Huella del dispositivo', value: '12 coincidencias duplicadas' }, { label: 'Reverificación', value: 'Activada en el pago' }] },
      { badge: 'CONTROL CENTRALIZADO', title: 'Consolida y automatiza todos tus procesos de identidad', desc: 'Construye y lanza más rápido con una plataforma integral y reglas automáticas. Adáptate a INFORM Act, DAC7 y DSA agregando flujos sin depender de ingeniería.', cardTitle: 'Flujos automatizados', cardSubtitle: 'Lienzo visual para rutas complejas', trigger: 'En registro de vendedor de alto valor:', steps: ['1. Extraer Tax ID (EIN) y revisar registro IRS', '2. Coincidir listas PEP y sanciones globales', '3. Generar registro DAC7 conforme'] }
    ],
    featureSuite: { badge: 'Conjunto completo de funciones', title: 'Herramientas de confianza de extremo a extremo para marketplaces P2P', items: [{ title: 'Verificación de documento oficial', desc: 'Recopila y verifica IDs oficiales en más de 200 países y compara la foto con la selfie.' }, { title: 'Verificación de antecedentes', desc: 'Integra antecedentes penales y registros vehiculares (MVR) para incorporar repartidores y proveedores confiables.' }, { title: 'Verificaciones regionales de bases de datos', desc: 'Contrasta PII recopilada y extraída con bases autorizadas en más de 40 países.' }, { title: 'Señales de riesgo', desc: 'Recopila señales como VPN, proxies residenciales y configuración del navegador para detectar abusadores sofisticados.' }, { title: 'Detección de cuentas duplicadas', desc: 'Bloquea usuarios cuyos dispositivos o PII coinciden con perfiles existentes para prevenir abuso promocional.' }, { title: 'Verificación global de registros empresariales', desc: 'Verifica nombre, ID de registro, dirección y estado activo de entidades vendedoras.' }, { title: 'Recopilación de documentos', desc: 'Recopila licencias, extractos bancarios y facturas, y extrae datos mediante OCR robusto.' }, { title: 'Verificación NFC', desc: 'Verifica pasaportes y e-ID globalmente mediante NFC para onboarding de alta seguridad.' }, { title: 'Verificación de IVA', desc: 'Verifica números de IVA de comercios europeos directamente en sistemas fiscales oficiales.' }] },
    demo: { visualBadge: 'Flujo KYB-KYC', visualTitle: 'Protocolo de vendedor Etsy', visualRows: [{ label: 'Estado EIN empresarial', value: 'Coincide' }, { label: 'Verificación IRS', value: 'Aprobada' }, { label: 'Registro INFORM Act', value: 'Creado' }], visualHeading: 'Automatiza cumplimiento dinámicamente', visualDesc: 'Implementa listas de políticas listas para usar para regulaciones locales, estatales e internacionales.', title: 'Inicia tu demo personalizada para marketplace', desc: 'Cuéntanos sobre tu plataforma y configuraremos un sandbox ajustado a tu modelo de negocio.', requiredAlert: 'Completa todos los campos obligatorios.', successTitle: 'Demo personalizada solicitada', successPrefix: 'Gracias,', successMiddle: 'Tu sandbox de identidad para marketplace está listo. Revisa tu correo en', successSuffix: 'para ver las guías de integración.', requestAnother: 'Solicitar otra demo sandbox', fields: { firstName: 'Nombre*', lastName: 'Apellido*', workEmail: 'Correo laboral*', platformUrl: 'URL del marketplace*', companyName: 'Empresa*', jobTitle: 'Cargo' }, placeholders: { firstName: 'Sarah', lastName: 'Jenkins', workEmail: 'sjenkins@marketplace.io', platformUrl: 'https://marketplace.io', companyName: 'CraftSpace Ltd', jobTitle: 'Head of Trust & Safety' }, submit: 'Ver demo personalizada' },
    checklist: [{ title: 'Know Your Seller (KYS)', desc: 'Recopila, verifica y monitorea entidades comerciales y datos de vendedores para legitimar la plataforma.' }, { title: 'Cumplimiento INFORM Act', desc: 'Automatiza requisitos para vendedores externos de alto volumen en marketplaces minoristas y P2P.' }, { title: 'Cumplimiento DAC7 y DSA', desc: 'Alinea la recopilación fiscal europea y los reportes de proveedores de servicios digitales.' }, { title: 'Verificación IRS 1099', desc: 'Comprueba W-9 e identificación fiscal contra registros oficiales del gobierno.' }, { title: 'Derecho a trabajar', desc: 'Realiza controles laborales y documentales locales para repartidores bajo demanda y trabajadores gig.' }, { title: 'Capas de confianza multisided', desc: 'Protege compradores contra estafas y permite retiros seguros para comercios de alto volumen.' }],
    explore: { title: 'Explora más de la plataforma de identidad de Identra', cards: [{ title: 'Verifica comercios y sus vendedores con KYB-KYC integrado.', cta: 'Conocer soluciones KYB-KYC' }, { title: 'Crea flujos dinámicos de garantía de edad.', cta: 'Conocer verificación de edad' }] },
    cta: { title: '¿Listo para empezar?', desc: 'Construye confianza sólida en tu marketplace y onboarding de socios conforme.', primary: 'Solicitar demo', secondary: 'Probar ahora →' }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: 'ソリューション • マーケットプレイス',
    heroTitle: 'マーケットプレイスのあらゆる側面で、転換率とリスクのバランスを取る。',
    heroDesc: '不正利用者には厳しく、ユーザー、販売者、配送担当者には使いやすい本人確認で、信頼を築きマーケットプレイスを守ります。',
    getDemo: 'デモを依頼',
    trySandbox: '本人確認サンドボックスを試す',
    terminal: {
      engine: 'MARKETPLACE_TRUST_ENGINE_v1.0',
      autoReview: '自動レビュー',
      promptPrefix: '>',
      selectPrompt: 'ライブ検証をシミュレーションするマーケットプレイスの役割を選択:',
      running: '生体認証、登録情報、バックグラウンド、デバイスチェックを実行中...',
      riskDetails: 'リスク評価の詳細:',
      deviceRisk: 'デバイスリスクチェック:',
      runAnother: '別のシミュレーションを実行',
      roles: { Seller: '販売者', Courier: '配送担当者', Buyer: '購入者' },
      statuses: { Approve: '承認', Review: 'レビュー', Block: 'ブロック' },
      idChecks: { Verified: '検証済み', Unverified: '未検証', Failed: '失敗' },
      dbChecks: { Match: '一致', 'Partial Match': '部分一致', Mismatched: '不一致' },
      scenarios: {
        good_seller: { name: 'Marcus Vance', type: 'ハンドメイド販売者 (KYS)', role: 'Seller', idCheck: 'Verified', dbCheck: 'Match', riskScore: 8, status: 'Approve', buttonTitle: 'Marcus (ハンドメイド販売者)', buttonSubtitle: 'グローバル KYB / IRS 検証 • 合格', details: ['公的身分証がセルフィー画像と一致 (信頼度 98.6%)。', 'PII がグローバル事業登録と IRS データベースに一致。', 'デバイス IP は住宅回線で申告住所と一致。', '重複または不正関連デバイスは検出されませんでした。'] },
        courier_review: { name: 'Alex Rivera', type: 'ギグ配送担当者', role: 'Courier', idCheck: 'Verified', dbCheck: 'Partial Match', riskScore: 54, status: 'Review', buttonTitle: 'Alex (ギグ配送担当者)', buttonSubtitle: 'MVR 不一致 • ケースへルーティング', details: ['公的身分証はセルフィーと正常に一致。', '犯罪歴チェック: フラグなし。', '自動車記録: 有効免許の有効期限に MVR 不一致。', '免許状態を確認するため手動オペレーター確認が必要です。'] },
        buyer_block: { name: 'Thomas Thorne (プロモーション悪用フラグ)', type: 'ゲスト購入チェックアウト', role: 'Buyer', idCheck: 'Unverified', dbCheck: 'Mismatched', riskScore: 92, status: 'Block', buttonTitle: 'Thomas (ゲスト購入)', buttonSubtitle: 'デバイス指紋一致 • 自動ブロック', details: ['デバイス指紋が他の14個のアカウントに関連 (プロモーション悪用)。', 'IP アラート: 商用プロキシクラスを検出。', '電話番号アラート: 4時間前に登録された VoIP 使い捨て番号。', 'デバイスと関連する支払いトークンを予防的にブロックしました。'] }
      },
      logs: { scanId: '[1/4] 運転免許証 / 公的身分証をスキャンし、セルフィーライブネスを取得中...', biometrics: '[生体認証] セルフィー一致結果: {result}。', livenessFail: 'ライブネス失敗', matchConfirmed: '一致確認済み', registries: '[2/4] グローバル登録情報と国内データベースで本人情報を検証中...', database: '[データベース] 事業名 / PII 検証: {result}。', device: '[3/4] デバイスインテリジェンスとネットワーク信頼アルゴリズムを実行中...', riskIntel: '[リスク情報] 重複デバイス、ネットワークプロキシ、位置情報を分析中...', compliance: '[4/4] 自動コンプライアンスルールを処理中 (INFORM Act / DAC7 / バックグラウンドチェック)...', decision: '[判定] リスク評価は {score}/100。アクション: {status}。' }
    },
    trusted: { label: '世界有数のマーケットプレイスとプラットフォームが信頼', brands: ['Etsy', 'GET YOUR GUIDE', 'fiverr'] },
    differentiators: [
      { badge: 'グローバル規模', title: 'グローバル検証とスクリーニングで、より多くのユーザーを受け入れる', desc: 'ユーザーのリスクシグナルに応じて摩擦を動的に調整する検証フローで、個人と事業者をより多く検証できます。位置情報、言語、脅威指標に基づきチェックリストへ自動ルーティングします。', cardTitle: '動的検証パス', cardSubtitle: '離脱を抑える自動ルーティング', metricLabel: '検証摩擦', metricValue: '標準ファストトラック', note: 'ユーザーはローカル携帯回線を使用中。二次データベースチェックをスキップ。' },
      { badge: '能動的な防止', title: '悪質な利用者からプラットフォームを保護', desc: '顧客ライフサイクルの任意の時点で再検証やリスト照合を起動。時間経過でユーザーデータを比較し、アカウント乗っ取り、重複デバイス、アカウント共有を抑制します。', cardTitle: 'ライフサイクル安全トリガー', cardSubtitle: '重複アカウントと乗っ取りをブロック', stats: [{ label: 'デバイス指紋', value: '12件の重複一致' }, { label: '再検証', value: '支払い時に起動' }] },
      { badge: '一元管理', title: 'すべての本人確認プロセスを統合・自動化', desc: '包括的なプラットフォームと自動化ルールで、より速く構築・公開できます。INFORM Act、DAC7、DSA などの新しい要件にも、開発リソースに縛られずワークフロー追加で対応できます。', cardTitle: '自動ワークフロー', cardSubtitle: '複雑なルーティングのための視覚キャンバス', trigger: '高額販売者登録時:', steps: ['1. Tax ID (EIN) を抽出し IRS 登録を確認', '2. グローバル PEP と制裁リストに照合', '3. DAC7 準拠の販売者ログを生成'] }
    ],
    featureSuite: { badge: '包括的な機能群', title: 'P2P マーケットプレイス向けのエンドツーエンド信頼ツール', items: [{ title: '公的身分証検証', desc: '200以上の国と地域で公的 ID を収集・検証し、ID 写真とセルフィーの一致を確認します。' }, { title: 'バックグラウンドチェック', desc: '犯罪歴と自動車記録 (MVR) のスクリーニングを統合し、信頼できる配送担当者やサービス提供者を受け入れます。' }, { title: '地域データベース検証', desc: '収集・抽出した PII を40以上の国の権威あるデータベースと発行元で確認します。' }, { title: 'リスクシグナル', desc: 'VPN、住宅プロキシ、ブラウザー設定などのリスクシグナルを自動収集し、高度な悪用者を検出します。' }, { title: '重複アカウント検出', desc: 'デバイス指紋や PII が既存プロフィールと一致するユーザーを予防的にブロックします。' }, { title: 'グローバル事業登録検証', desc: '販売者法人の事業名、登録 ID、登録住所、稼働状態を確認します。' }, { title: '書類収集', desc: '事業許可証、銀行明細、公共料金請求書を収集し、OCR で情報を抽出します。' }, { title: 'NFC 検証', desc: 'NFC 技術でパスポートと e-ID をグローバルに検証し、高保証のオンボーディングを実現します。' }, { title: 'VAT 検証', desc: '欧州販売者法人の VAT 番号を公式地域税務システムで直接確認します。' }] },
    demo: { visualBadge: 'KYB-KYC フロー', visualTitle: 'Etsy 販売者プロトコル', visualRows: [{ label: 'EIN 事業状態', value: '一致' }, { label: 'IRS 検証', value: '合格' }, { label: 'INFORM Act ログ', value: '作成済み' }], visualHeading: 'コンプライアンスを動的に自動化', visualDesc: '地域、州、国際規制に対応するすぐに使えるポリシーチェックリストを導入できます。', title: 'カスタムマーケットプレイスデモを開始', desc: 'マーケットプレイスについて教えてください。事業モデルに合わせたサンドボックスワークフローを構成します。', requiredAlert: '必須項目をすべて入力してください。', successTitle: 'カスタムデモをリクエストしました', successPrefix: 'ありがとうございます、', successMiddle: 'カスタム本人確認サンドボックスの準備ができました。統合ガイドは', successSuffix: 'の受信トレイをご確認ください。', requestAnother: '別のサンドボックスデモをリクエスト', fields: { firstName: '名*', lastName: '姓*', workEmail: '勤務先メール*', platformUrl: 'マーケットプレイス URL*', companyName: '会社名*', jobTitle: '役職' }, placeholders: { firstName: 'Sarah', lastName: 'Jenkins', workEmail: 'sjenkins@marketplace.io', platformUrl: 'https://marketplace.io', companyName: 'CraftSpace Ltd', jobTitle: 'Trust & Safety 責任者' }, submit: 'カスタムデモを見る' },
    checklist: [{ title: 'Know Your Seller (KYS)', desc: '事業者と個人販売者データを収集、検証、監視し、プラットフォームの正当性を確立します。' }, { title: 'INFORM Act 対応', desc: '小売および P2P マーケットプレイスの大量販売者に対する要件を自動化します。' }, { title: 'DAC7 と DSA 対応', desc: '欧州の税務データ収集ルールとデジタルサービス法の報告要件に対応します。' }, { title: 'IRS 1099 検証', desc: 'W-9 と納税者番号情報を政府の公式登録リストで直接確認します。' }, { title: '就労資格チェック', desc: 'オンデマンド配送担当者やギグワーカー向けに地域別の雇用・書類検証を迅速に実行します。' }, { title: '多面型の信頼レイヤー', desc: '購入者を詐欺から守りつつ、大量販売者が低摩擦で安全に資金を引き出せるようにします。' }],
    explore: { title: 'Identra の本人確認プラットフォームをさらに見る', cards: [{ title: '統合 KYB-KYC で販売者とその背後の事業者を検証。', cta: 'KYB-KYC ソリューションを見る' }, { title: '動的な年齢保証フローを構築。', cta: '年齢確認を見る' }] },
    cta: { title: '始める準備はできていますか？', desc: '堅牢なマーケットプレイス信頼基盤と準拠したパートナーオンボーディングを構築しましょう。', primary: 'デモを依頼', secondary: '今すぐ試す →' }
  },
  de: {
    backToPlatform: 'Zurück zur Plattform',
    badge: 'Lösungen • Marktplätze',
    heroTitle: 'Conversion und Risiko für jede Seite Ihres Marktplatzes ausbalancieren.',
    heroDesc: 'Schaffen Sie Vertrauen und schützen Sie Ihren Marktplatz mit Identitätsprüfung, die Betrügern standhält und für Nutzer, Verkäufer und Kuriere einfach bleibt.',
    getDemo: 'Demo anfordern',
    trySandbox: 'Identitäts-Sandbox testen',
    terminal: {
      engine: 'MARKETPLACE_TRUST_ENGINE_v1.0',
      autoReview: 'AUTO-PRÜFUNG',
      promptPrefix: '>',
      selectPrompt: 'Wählen Sie ein Marktplatz-Szenario für eine Live-Verifizierung:',
      running: 'Biometrie, Register, Hintergrund- und Geräteprüfungen laufen...',
      riskDetails: 'Details der Risikobewertung:',
      deviceRisk: 'Geräterisiko-Prüfung:',
      runAnother: 'Weitere Simulation starten',
      roles: { Seller: 'Verkäufer', Courier: 'Kurier', Buyer: 'Käufer' },
      statuses: { Approve: 'FREIGEBEN', Review: 'PRÜFEN', Block: 'BLOCKIEREN' },
      idChecks: { Verified: 'Verifiziert', Unverified: 'Nicht verifiziert', Failed: 'Fehlgeschlagen' },
      dbChecks: { Match: 'Treffer', 'Partial Match': 'Teiltreffer', Mismatched: 'Keine Übereinstimmung' },
      scenarios: {
        good_seller: { name: 'Marcus Vance', type: 'Handmade-Verkäufer (KYS)', role: 'Seller', idCheck: 'Verified', dbCheck: 'Match', riskScore: 8, status: 'Approve', buttonTitle: 'Marcus (Handmade-Verkäufer)', buttonSubtitle: 'Globale KYB / IRS-Prüfung • Bestanden', details: ['Ausweis stimmt mit Selfie überein (98,6% Vertrauen).', 'PII stimmt mit globalem Unternehmensregister und IRS-Datenbank überein.', 'Geräte-IP ist privat und passt zur angegebenen Adresse.', 'Keine doppelten oder betrugsbezogenen Geräte erkannt.'] },
        courier_review: { name: 'Alex Rivera', type: 'Gig-Lieferkurier', role: 'Courier', idCheck: 'Verified', dbCheck: 'Partial Match', riskScore: 54, status: 'Review', buttonTitle: 'Alex (Gig-Lieferkurier)', buttonSubtitle: 'MVR-Abweichung • An Fälle weiterleiten', details: ['Ausweis stimmt erfolgreich mit Selfie überein.', 'Strafregisterprüfung: keine Hinweise gefunden.', 'Fahrzeugregister: MVR-Abweichung beim Ablaufdatum der aktiven Lizenz.', 'Manuelle Prüfung zur Bestätigung des Lizenzstatus erforderlich.'] },
        buyer_block: { name: 'Thomas Thorne (Promo-Abuse-Flag)', type: 'Gastkäufer-Checkout', role: 'Buyer', idCheck: 'Unverified', dbCheck: 'Mismatched', riskScore: 92, status: 'Block', buttonTitle: 'Thomas (Gastkäufer-Checkout)', buttonSubtitle: 'Gerätefingerprint-Treffer • Auto-Block', details: ['Gerätefingerprint mit 14 weiteren Konten verknüpft (Promo-Abuse).', 'IP-Warnung: aktive kommerzielle Proxyklasse erkannt.', 'Telefonwarnung: VoIP-Wegwerfnummer vor 4 Stunden registriert.', 'Gerät und zugehörige Zahlungstokens proaktiv blockiert.'] }
      },
      logs: { scanId: '[1/4] Führerschein / Ausweis wird gescannt und Selfie-Liveness erfasst...', biometrics: '[Biometrie] Selfie-Abgleich: {result}.', livenessFail: 'Liveness fehlgeschlagen', matchConfirmed: 'Treffer bestätigt', registries: '[2/4] Identitätsdaten werden in globalen Registern und nationalen Datenbanken geprüft...', database: '[Datenbank] Unternehmensname / PII-Prüfung: {result}.', device: '[3/4] Geräteintelligenz und Netzwerkvertrauensalgorithmen laufen...', riskIntel: '[Risikointel.] Doppelte Geräte, Netzwerk-Proxys und Geostandorte werden analysiert...', compliance: '[4/4] Automatische Compliance-Regeln werden verarbeitet (INFORM Act / DAC7 / Hintergrundprüfungen)...', decision: '[Entscheidung] Risikowertung bei {score}/100. Aktion: {status}.' }
    },
    trusted: { label: 'Vertraut von führenden globalen Marktplätzen und Plattformen', brands: ['Etsy', 'GET YOUR GUIDE', 'fiverr'] },
    differentiators: [
      { badge: 'GLOBALE SKALIERUNG', title: 'Sagen Sie mehr Nutzern ja mit globalen Prüfungen und Screenings', desc: 'Verifizieren Sie mehr Personen und Unternehmen mit Flows, die Reibung dynamisch an Risikosignale anpassen. Nutzer werden automatisch nach Standort, Sprache und Bedrohungsindikatoren geroutet.', cardTitle: 'Dynamischer Verifizierungspfad', cardSubtitle: 'Auto-Routing zur Reduzierung von Abbrüchen', metricLabel: 'Verifizierungsreibung', metricValue: 'Standard-Fast-Track', note: 'Nutzer verwendet lokale Mobilfunkverbindung. Sekundäre Datenbankprüfung überspringen.' },
      { badge: 'AKTIVE PRÄVENTION', title: 'Schützen Sie Ihre Plattform vor schlechten Akteuren', desc: 'Lösen Sie Sicherheitsmechanismen wie Reverifizierungen und Listenscreenings jederzeit im Kundenlebenszyklus aus. Vergleichen Sie Nutzerdaten über Zeit, um Kontoübernahmen, doppelte Geräte und Account-Sharing zu minimieren.', cardTitle: 'Sicherheitstrigger im Lebenszyklus', cardSubtitle: 'Doppelte Konten und Übernahmeversuche blockieren', stats: [{ label: 'Gerätefingerprint', value: '12 doppelte Treffer' }, { label: 'Reverifizierung', value: 'Bei Auszahlung ausgelöst' }] },
      { badge: 'ZENTRALE KONTROLLE', title: 'Alle Identitätsprozesse konsolidieren und automatisieren', desc: 'Bauen und starten Sie schneller mit umfassender Plattform und Automatisierungsregeln. Passen Sie sich INFORM Act, DAC7 und DSA durch neue Workflows ohne Engineering-Blockaden an.', cardTitle: 'Automatisierte Workflows', cardSubtitle: 'Visuelle Arbeitsfläche für komplexes Routing', trigger: 'Bei Registrierung eines hochwertigen Verkäufers:', steps: ['1. Tax ID (EIN) extrahieren und IRS-Register prüfen', '2. Globale PEP- und Sanktionslisten abgleichen', '3. DAC7-konformes Verkäuferlog erstellen'] }
    ],
    featureSuite: { badge: 'Umfassende Funktionssuite', title: 'End-to-End-Vertrauenstools für Peer-to-Peer-Marktplätze', items: [{ title: 'Ausweisprüfung', desc: 'Erfassen und prüfen Sie amtliche IDs aus über 200 Ländern und gleichen Sie das Foto mit dem Selfie ab.' }, { title: 'Hintergrundprüfungen', desc: 'Integrieren Sie Strafregister- und Fahrzeugregisterprüfungen (MVR) für sichere Kuriere und Anbieter.' }, { title: 'Regionale Datenbankprüfungen', desc: 'Prüfen Sie erfasste und extrahierte PII gegen autoritative Datenbanken in über 40 Ländern.' }, { title: 'Risikosignale', desc: 'Erfassen Sie VPN, private Proxys und Browserkonfiguration automatisch, um raffinierte Betrüger zu erkennen.' }, { title: 'Erkennung doppelter Konten', desc: 'Blockieren Sie Nutzer, deren Gerätefingerprints oder PII bestehenden Profilen entsprechen.' }, { title: 'Globale Unternehmensregisterprüfung', desc: 'Prüfen Sie Unternehmensname, Register-ID, Adresse und aktiven Status von Händler- und Verkäuferentitäten.' }, { title: 'Dokumentenerfassung', desc: 'Erfassen Sie Geschäftslizenzen, Kontoauszüge und Rechnungen und extrahieren Sie Daten per OCR.' }, { title: 'NFC-Verifizierung', desc: 'Prüfen Sie Pässe und e-IDs weltweit per NFC für besonders sichere Onboarding-Prozesse.' }, { title: 'VAT-Prüfung', desc: 'Prüfen Sie VAT-Nummern europäischer Händler direkt über offizielle regionale Steuersysteme.' }] },
    demo: { visualBadge: 'KYB-KYC-Flow', visualTitle: 'Etsy-Verkäuferprotokoll', visualRows: [{ label: 'EIN-Unternehmensstatus', value: 'Treffer' }, { label: 'IRS-Prüfung', value: 'Bestanden' }, { label: 'INFORM-Act-Log', value: 'Erstellt' }], visualHeading: 'Compliance dynamisch automatisieren', visualDesc: 'Implementieren Sie sofort nutzbare Policy-Checklisten für lokale, staatliche und internationale Vorschriften.', title: 'Starten Sie Ihre individuelle Marktplatz-Demo', desc: 'Erzählen Sie uns von Ihrer Plattform, und wir konfigurieren einen Sandbox-Workflow für Ihr Geschäftsmodell.', requiredAlert: 'Bitte füllen Sie alle Pflichtfelder aus.', successTitle: 'Individuelle Demo angefragt', successPrefix: 'Danke,', successMiddle: 'Ihre individuelle Marktplatz-Identitäts-Sandbox ist bereit. Prüfen Sie Ihren Posteingang unter', successSuffix: 'für Integrationsleitfäden.', requestAnother: 'Weitere Sandbox-Demo anfragen', fields: { firstName: 'Vorname*', lastName: 'Nachname*', workEmail: 'Geschäftliche E-Mail*', platformUrl: 'Marktplatz-URL*', companyName: 'Unternehmensname*', jobTitle: 'Position' }, placeholders: { firstName: 'Sarah', lastName: 'Jenkins', workEmail: 'sjenkins@marketplace.io', platformUrl: 'https://marketplace.io', companyName: 'CraftSpace Ltd', jobTitle: 'Head of Trust & Safety' }, submit: 'Individuelle Demo ansehen' },
    checklist: [{ title: 'Know Your Seller (KYS)', desc: 'Sammeln, prüfen und überwachen Sie Unternehmens- und Händlerdaten, um Plattformlegitimität herzustellen.' }, { title: 'INFORM-Act-Compliance', desc: 'Automatisieren Sie Anforderungen für volumenstarke Drittverkäufer auf Retail- und P2P-Marktplätzen.' }, { title: 'DAC7- und DSA-Compliance', desc: 'Erfüllen Sie europäische Steuerdatenerfassung und Berichtspflichten des Digital Services Act.' }, { title: 'IRS-1099-Prüfung', desc: 'Prüfen Sie W-9- und Steuer-ID-Informationen direkt gegen offizielle Regierungsregister.' }, { title: 'Right-to-work-Prüfungen', desc: 'Führen Sie schnelle lokale Beschäftigungs- und Dokumentprüfungen für Kuriere und Gig-Worker durch.' }, { title: 'Mehrseitige Vertrauensebenen', desc: 'Schützen Sie Käufer vor Betrug und ermöglichen Sie Händlern sichere Auszahlungen ohne hohe Reibung.' }],
    explore: { title: 'Mehr von Identras Identitätsplattform entdecken', cards: [{ title: 'Prüfen Sie Händler und Verkäufer dahinter mit integriertem KYB-KYC.', cta: 'KYB-KYC-Lösungen ansehen' }, { title: 'Erstellen Sie dynamische Age-Assurance-Flows.', cta: 'Altersprüfung ansehen' }] },
    cta: { title: 'Bereit loszulegen?', desc: 'Bauen Sie belastbares Marktplatzvertrauen und compliant Partner-Onboarding auf.', primary: 'Demo anfordern', secondary: 'Jetzt testen →' }
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    badge: 'Giải pháp • Marketplace',
    heroTitle: 'Cân bằng chuyển đổi và rủi ro cho mọi phía trong marketplace của bạn.',
    heroDesc: 'Xây dựng niềm tin và bảo vệ marketplace bằng xác minh danh tính đủ mạnh với kẻ gian nhưng vẫn dễ dùng cho người mua, người bán và tài xế giao nhận.',
    getDemo: 'Nhận bản demo',
    trySandbox: 'Thử môi trường kiểm thử danh tính',
    terminal: {
      engine: 'MARKETPLACE_TRUST_ENGINE_v1.0',
      autoReview: 'RÀ SOÁT TỰ ĐỘNG',
      promptPrefix: '>',
      selectPrompt: 'Chọn một kịch bản vai trò marketplace để mô phỏng xác minh trực tiếp:',
      running: 'Đang chạy sinh trắc học, cơ sở đăng ký, lý lịch và kiểm tra thiết bị...',
      riskDetails: 'Chi tiết đánh giá rủi ro:',
      deviceRisk: 'Kiểm tra rủi ro thiết bị:',
      runAnother: 'Chạy mô phỏng khác',
      roles: { Seller: 'Người bán', Courier: 'Tài xế giao nhận', Buyer: 'Người mua' },
      statuses: { Approve: 'PHÊ DUYỆT', Review: 'RÀ SOÁT', Block: 'CHẶN' },
      idChecks: { Verified: 'Đã xác minh', Unverified: 'Chưa xác minh', Failed: 'Thất bại' },
      dbChecks: { Match: 'Khớp', 'Partial Match': 'Khớp một phần', Mismatched: 'Không khớp' },
      scenarios: {
        good_seller: { name: 'Marcus Vance', type: 'Người bán đồ thủ công (KYS)', role: 'Seller', idCheck: 'Verified', dbCheck: 'Match', riskScore: 8, status: 'Approve', buttonTitle: 'Marcus (người bán đồ thủ công)', buttonSubtitle: 'Xác minh KYB / IRS toàn cầu • Đạt', details: ['Giấy tờ tùy thân khớp ảnh selfie (độ tin cậy 98,6%).', 'PII khớp cơ sở đăng ký doanh nghiệp toàn cầu và cơ sở dữ liệu IRS.', 'IP thiết bị là mạng dân cư và khớp địa chỉ đã khai báo.', 'Không phát hiện thiết bị trùng lặp hoặc liên quan đến gian lận.'] },
        courier_review: { name: 'Alex Rivera', type: 'Tài xế giao hàng thời vụ', role: 'Courier', idCheck: 'Verified', dbCheck: 'Partial Match', riskScore: 54, status: 'Review', buttonTitle: 'Alex (tài xế giao hàng thời vụ)', buttonSubtitle: 'MVR không khớp • Chuyển đến Cases', details: ['Giấy tờ tùy thân khớp selfie thành công.', 'Kiểm tra lý lịch tư pháp: không có cờ cảnh báo.', 'Hồ sơ phương tiện: MVR không khớp ngày hết hạn giấy phép đang hoạt động.', 'Cần nhân sự vận hành kiểm tra thủ công để xác minh trạng thái giấy phép.'] },
        buyer_block: { name: 'Thomas Thorne (cờ lạm dụng khuyến mãi)', type: 'Thanh toán khách vãng lai', role: 'Buyer', idCheck: 'Unverified', dbCheck: 'Mismatched', riskScore: 92, status: 'Block', buttonTitle: 'Thomas (khách vãng lai)', buttonSubtitle: 'Khớp dấu vân tay thiết bị • Tự động chặn', details: ['Dấu vân tay thiết bị liên kết với 14 tài khoản khác (lạm dụng khuyến mãi).', 'Cờ địa chỉ IP: phát hiện lớp proxy thương mại đang hoạt động.', 'Cờ số điện thoại: số VoIP dùng tạm đăng ký 4 giờ trước.', 'Đã chủ động chặn thiết bị và token thanh toán liên quan.'] }
      },
      logs: { scanId: '[1/4] Đang quét giấy phép lái xe / giấy tờ tùy thân và ghi nhận selfie sống động...', biometrics: '[Sinh trắc học] Kết quả khớp selfie: {result}.', livenessFail: 'Không đạt sống động', matchConfirmed: 'Đã xác nhận khớp', registries: '[2/4] Đang xác minh dữ liệu danh tính qua cơ sở đăng ký toàn cầu và cơ sở dữ liệu quốc gia...', database: '[Cơ sở dữ liệu] Xác minh tên doanh nghiệp / PII: {result}.', device: '[3/4] Đang chạy thuật toán trí tuệ thiết bị và độ tin cậy mạng...', riskIntel: '[Tình báo rủi ro] Đang phân tích thiết bị trùng lặp, proxy mạng và vị trí địa lý...', compliance: '[4/4] Đang xử lý quy tắc tuân thủ tự động (INFORM Act / DAC7 / kiểm tra lý lịch)...', decision: '[Quyết định] Điểm rủi ro được tính là {score}/100. Hành động: {status}.' }
    },
    trusted: { label: 'Được các marketplace và nền tảng toàn cầu hàng đầu tin dùng', brands: ['Etsy', 'GET YOUR GUIDE', 'fiverr'] },
    differentiators: [
      { badge: 'QUY MÔ TOÀN CẦU', title: 'Chấp nhận nhiều người dùng hơn nhờ xác minh và sàng lọc toàn cầu', desc: 'Xác minh nhiều cá nhân và doanh nghiệp hơn bằng luồng xác minh tự điều chỉnh mức ma sát theo tín hiệu rủi ro. Tự động chuyển người dùng đến danh sách kiểm tra khác nhau theo vị trí, ngôn ngữ và chỉ báo đe dọa.', cardTitle: 'Lộ trình xác minh động', cardSubtitle: 'Tự động định tuyến để giảm bỏ ngang', metricLabel: 'Mức ma sát xác minh', metricValue: 'Luồng nhanh tiêu chuẩn', note: 'Người dùng đang dùng mạng di động địa phương. Bỏ qua kiểm tra cơ sở dữ liệu phụ.' },
      { badge: 'PHÒNG NGỪA CHỦ ĐỘNG', title: 'Bảo vệ nền tảng khỏi tác nhân xấu', desc: 'Kích hoạt cơ chế an toàn như tái xác minh và sàng lọc danh sách ở bất kỳ điểm nào trong vòng đời khách hàng. Thu thập và so sánh dữ liệu theo thời gian để ngăn chiếm đoạt tài khoản, phát hiện thiết bị trùng lặp và giảm chia sẻ tài khoản.', cardTitle: 'Kích hoạt an toàn theo vòng đời', cardSubtitle: 'Chặn tài khoản trùng lặp và nỗ lực chiếm đoạt', stats: [{ label: 'Dấu vân tay thiết bị', value: '12 kết quả trùng lặp' }, { label: 'Tái xác minh', value: 'Kích hoạt khi rút tiền' }] },
      { badge: 'KIỂM SOÁT TẬP TRUNG', title: 'Hợp nhất và tự động hóa mọi quy trình danh tính', desc: 'Xây dựng và triển khai nhanh hơn bằng nền tảng toàn diện cùng quy tắc tự động. Thích ứng với yêu cầu như INFORM Act, DAC7 và DSA bằng cách thêm quy trình mới liền mạch mà không bị khóa bởi nguồn lực kỹ thuật.', cardTitle: 'Quy trình tự động', cardSubtitle: 'Bảng trực quan cho định tuyến phức tạp', trigger: 'Khi người bán giá trị cao đăng ký:', steps: ['1. Trích xuất Tax ID (EIN) và kiểm tra cơ sở đăng ký IRS', '2. Khớp danh sách PEP và cấm vận toàn cầu', '3. Tạo nhật ký người bán tuân thủ DAC7'] }
    ],
    featureSuite: { badge: 'Bộ tính năng toàn diện', title: 'Công cụ tin cậy đầu cuối cho marketplace ngang hàng', items: [{ title: 'Xác minh giấy tờ tùy thân', desc: 'Thu thập và xác minh giấy tờ do chính phủ cấp tại hơn 200 quốc gia và vùng lãnh thổ, sau đó đối chiếu ảnh trên giấy tờ với selfie.' }, { title: 'Kiểm tra lý lịch', desc: 'Tích hợp sàng lọc lý lịch tư pháp và hồ sơ phương tiện (MVR) để tiếp nhận tài xế và nhà cung cấp dịch vụ đáng tin cậy.' }, { title: 'Xác minh cơ sở dữ liệu khu vực', desc: 'Đối chiếu PII đã thu thập và trích xuất với cơ sở dữ liệu có thẩm quyền tại hơn 40 quốc gia.' }, { title: 'Tín hiệu rủi ro', desc: 'Tự động thu thập tín hiệu như VPN, proxy dân cư và cấu hình trình duyệt để phát hiện tác nhân xấu tinh vi.' }, { title: 'Phát hiện tài khoản trùng lặp', desc: 'Chủ động chặn người dùng có dấu vân tay thiết bị hoặc PII khớp hồ sơ hiện có để ngăn lạm dụng khuyến mãi.' }, { title: 'Xác minh đăng ký doanh nghiệp toàn cầu', desc: 'Xác minh tên doanh nghiệp, mã đăng ký, địa chỉ đăng ký và trạng thái hoạt động của người bán.' }, { title: 'Thu thập tài liệu', desc: 'Thu thập và trích xuất thông tin từ giấy phép kinh doanh, sao kê ngân hàng và hóa đơn tiện ích bằng OCR mạnh mẽ.' }, { title: 'Xác minh NFC', desc: 'Xác minh hộ chiếu và e-ID toàn cầu qua công nghệ NFC cho quy trình tiếp nhận bảo đảm cao.' }, { title: 'Xác minh VAT', desc: 'Xác minh số VAT của pháp nhân thương mại châu Âu trực tiếp qua hệ thống thuế khu vực chính thức.' }] },
    demo: { visualBadge: 'Luồng KYB-KYC', visualTitle: 'Giao thức người bán Etsy', visualRows: [{ label: 'Trạng thái EIN doanh nghiệp', value: 'Đã khớp' }, { label: 'Xác minh IRS', value: 'Đạt' }, { label: 'Nhật ký INFORM Act', value: 'Đã tạo' }], visualHeading: 'Tự động hóa tuân thủ linh hoạt', visualDesc: 'Triển khai danh sách kiểm tra chính sách sẵn dùng cho quy định địa phương, cấp bang và quốc tế.', title: 'Bắt đầu bản demo marketplace tùy chỉnh', desc: 'Cho chúng tôi biết về nền tảng marketplace của bạn, chúng tôi sẽ cấu hình quy trình kiểm thử phù hợp với mô hình kinh doanh cụ thể.', requiredAlert: 'Vui lòng điền tất cả trường bắt buộc.', successTitle: 'Đã yêu cầu demo tùy chỉnh', successPrefix: 'Cảm ơn,', successMiddle: 'Môi trường kiểm thử danh tính marketplace tùy chỉnh của bạn đã sẵn sàng. Hãy kiểm tra hộp thư tại', successSuffix: 'để xem hướng dẫn tích hợp.', requestAnother: 'Yêu cầu demo kiểm thử khác', fields: { firstName: 'Tên*', lastName: 'Họ*', workEmail: 'Email công việc*', platformUrl: 'URL nền tảng marketplace*', companyName: 'Tên công ty*', jobTitle: 'Chức danh' }, placeholders: { firstName: 'Sarah', lastName: 'Jenkins', workEmail: 'sjenkins@marketplace.io', platformUrl: 'https://marketplace.io', companyName: 'CraftSpace Ltd', jobTitle: 'Trưởng bộ phận Tin cậy & An toàn' }, submit: 'Xem demo tùy chỉnh' },
    checklist: [{ title: 'Know Your Seller (KYS)', desc: 'Thu thập, xác minh và giám sát liền mạch dữ liệu doanh nghiệp và người bán cá nhân để thiết lập tính chính danh của nền tảng.' }, { title: 'Tuân thủ INFORM Act', desc: 'Tự động hóa yêu cầu tuân thủ cho người bán bên thứ ba khối lượng cao trên marketplace bán lẻ và ngang hàng.' }, { title: 'Tuân thủ DAC7 và DSA', desc: 'Đảm bảo phù hợp với quy tắc thu thập dữ liệu thuế châu Âu và yêu cầu báo cáo của nhà cung cấp dịch vụ số.' }, { title: 'Xác minh IRS 1099', desc: 'Kiểm tra trực tiếp thông tin W-9 và mã số thuế với danh sách đăng ký chính phủ chính thức.' }, { title: 'Kiểm tra quyền làm việc', desc: 'Thực hiện sàng lọc việc làm và tài liệu theo địa phương cho tài xế theo nhu cầu và lao động thời vụ.' }, { title: 'Lớp tin cậy đa phía', desc: 'Bảo vệ người mua khỏi lừa đảo, đồng thời cho phép người bán khối lượng cao rút tiền an toàn với ít ma sát.' }],
    explore: { title: 'Khám phá thêm nền tảng danh tính của Identra', cards: [{ title: 'Xác minh thương nhân và người bán phía sau họ bằng KYB-KYC tích hợp.', cta: 'Tìm hiểu giải pháp KYB-KYC' }, { title: 'Xây dựng luồng bảo đảm độ tuổi động.', cta: 'Tìm hiểu xác minh độ tuổi' }] },
    cta: { title: 'Sẵn sàng bắt đầu?', desc: 'Xây dựng niềm tin marketplace vững chắc và quy trình tiếp nhận đối tác tuân thủ.', primary: 'Nhận bản demo', secondary: 'Thử ngay →' }
  }
} as const;
