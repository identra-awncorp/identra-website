/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const NFC_PAGE_TRANSLATIONS = {
  en: {
    backToPlatform: 'Back to Platform Overview',
    badge: 'NFC VERIFICATION',
    heroTitle: 'Catch passport and ID fraud with a tap. Verify passports and ID cards with NFC to increase security and prevent fraud without adding friction.',
    getDemo: 'Get a demo',
    heroBenefits: [
      {
        title: 'Catch forged or digitally altered passports',
        desc: 'Scan the secure RFID chip within a passport or ID card to go beyond visual cues and catch fraudulent passports faster.'
      },
      {
        title: 'Reduce manual review of passports',
        desc: 'Leverage NFC to automate the passport verification process, and spend the time investigating complex fraud instead.'
      },
      {
        title: 'Increased completion rates',
        desc: 'Maximize conversions with a user-friendly flow that guides users through the NFC scanning process from start to finish.'
      }
    ],
    integrationPreview: 'INTEGRATION PREVIEW',
    howItWorks: 'How it works',
    tabs: ['1 Add', '2 Extract', '3 Verify'],
    steps: [
      {
        badge: 'STEP 1: FLOW INTEGRATION',
        title: 'Add NFC verification to your KYC flow',
        desc: 'Add NFC verification as an option for compatible devices and documents. Simply drag and drop the NFC component into your flow builder or trigger it selectively depending on device sensors and document requirements.',
        bullets: [
          'Device-native sensor checks run seamlessly in background',
          'Dynamic bypass rules if user device does not support NFC',
          'Tailored instructional videos matching the device platform'
        ]
      },
      {
        badge: 'STEP 2: BIOMETRIC SCAN',
        title: 'Securely extract identity information from NFC chip',
        desc: 'By prompting users to press their smartphone back against their government-issued ID card or passport, the NFC reader extracts full high-res data stored directly on the RFID chip within seconds.'
      },
      {
        badge: 'STEP 3: AUTONOMOUS VALIDATION',
        title: 'Verify authenticity instantly with cryptographic PKI signature validation',
        desc: 'Identra evaluates active state keys (CSCA) and chip validation challenges (AA/CA) to ensure the chip is completely genuine, unaltered, and has not been duplicated.',
        checks: [
          { title: 'Passive Auth (PA)', desc: 'Validates state-signed hashes against counterfeit file modifications.' },
          { title: 'Active Auth (AA)', desc: 'Challenge-response checks to verify physical chip authenticity.' },
          { title: 'Secure Channels', desc: 'Protects data payloads in transit with PACE standards.' },
          { title: 'PKI Directory', desc: 'Crosscheck against ICAO Master List with certified keys.' }
        ]
      }
    ],
    simulator: {
      title: 'Interactive Sandbox Simulator',
      desc: 'Test the contactless scanner mockup to extract encrypted biometrics in real time.',
      start: 'Start Simulated NFC Scan',
      reset: 'Reset Scanner',
      initialLogs: ['Initializing secure contactless reader...', 'Detecting RFID chip... Ready.'],
      logs: [
        'Establishing connection via ISO/IEC 14443 protocol...',
        'Performing BAC (Basic Access Control) authentication using passport MRZ entropy...',
        'Access Granted. Reading COM (Common Data Group)...',
        'Reading DG1 (Biographic Data)... Name and Document ID mapped.',
        'Reading DG2 (Encoded High-Res Biometric Face Portrait)...',
        'Verifying passive authentication signatures using national public key directory (PKD)...',
        'Performing Active Authentication challenge-response (validating chip authenticity)...',
        'Establishing secure PACE channel for end-to-end payload encryption...',
        'Decryption successful. Integrity check: Valid (100% genuine).'
      ],
      scannedData: {
        firstName: 'Daphne',
        lastName: 'Vance',
        docNumber: 'EP2348910',
        nationality: 'United States (USA)',
        birthDate: '1992-11-04',
        expiryDate: '2031-08-19',
        chipVerified: true
      }
    },
    phone: {
      header: 'Identity Flow',
      version: 'v2.10.4',
      verifyTitle: 'Verify your identity',
      verifyDesc: 'We need some information to help us confirm your identity.',
      verifications: 'Verifications',
      governmentId: 'Government ID',
      selfieLiveness: 'Selfie liveness',
      nfcChipVerification: 'NFC chip verification',
      next: 'Next',
      holdTitle: 'Hold phone to ID chip',
      holdDesc: 'Place your device flat against the back of your ID card or passport.',
      scanningTitle: 'Scanning NFC Chip...',
      doNotMove: 'DO NOT MOVE DEVICE',
      chipSuccessTitle: 'Chip Verified Successfully',
      chipSuccessMeta: 'ICAO COMPLIANT DIGITAL AUTH',
      docId: 'Doc ID',
      birthDate: 'Birth Date',
      expires: 'Expires',
      signatureAa: 'Signature AA',
      validPki: 'Valid (PKI)',
      cryptoTitle: 'Cryptographic Integrity',
      cryptoDesc: 'Identra autonomous identity core verdict',
      diagnostics: [
        { name: 'Passive Auth (CSCA)', status: 'PASSED' },
        { name: 'Active Auth (Chip)', status: 'PASSED' },
        { name: 'Photo Hash Match', status: 'MATCH (100%)' },
        { name: 'PACE Encryption', status: 'SECURED' }
      ],
      secureHash: 'Secure Enclave Hash: fd82..ae8a',
      secureFooter: 'Verified securely with Identra cryptographic network'
    },
    keyFeatures: {
      label: 'KEY FEATURES',
      title: 'Securely extract identity information from NFC-enabled devices',
      desc: 'Leverage smartphone Near Field Communication (NFC) hardware to query secure cryptographic public keys and verify tamper-resistant e-passports instantly in any flow.',
      technicalNote: 'Deep Technical Note:'
    },
    featureAccordions: [
      {
        title: 'Increased security',
        description: "Passports are easy to forge. With NFC technology, you don't need to rely on visual details - instead, the information comes from the RFID chip, with additional PKI validation available.",
        details: 'NFC chip data is digitally signed by the issuing government using state-level cryptography. Any attempt to modify the name, date of birth, or photo on the passport breaks this signature, making tampered or cloned IDs instantly detectable.'
      },
      {
        title: 'Streamlined verification',
        description: 'Trigger the optimal user flow automatically when a device supports NFC and the document contains an RFID chip, ensuring maximum security with minimal user drop-off.',
        details: 'Our smart SDK automatically detects the browser/device compatibility and the passport metadata to decide whether to guide the user to tap the passport. This keeps simple flows simple while adding ironclad security when necessary.'
      },
      {
        title: 'Simple UX with autodetection',
        description: 'Help users complete the scan on the first try with animated guides, real-time feedback, and dynamic instructions detailing exactly where to place their device.',
        details: "Different phones have NFC antennas in different spots, such as the top edge of iPhones versus the middle back of Androids. Our guides adapt specifically to the user's OS and handset brand to eliminate user confusion."
      },
      {
        title: 'Global coverage',
        description: 'Accept electronic passports (e-passports) and biometric national identity cards from over 150 countries, conforming to ICAO Doc 9303 standards.',
        details: 'Whether it is a German Personalausweis, a UK passport, or an EU identity card, Identra validates the chip signature against a comprehensive, continuously updated database of CSCA (Country Signing Certification Authority) certificates.'
      }
    ],
    useCases: {
      label: 'USE CASES',
      title: 'How teams can use NFC verification',
      desc: 'Maximize trust thresholds and prevent sophisticated synthetic identity fraud across major user lifecycle milestones.',
      cards: [
        {
          title: 'KYC compliance',
          desc: 'Allow individuals in the EU and US to submit their passports via NFC as a part of your KYC flow, complying with stringent eIDAS levels and financial crime guidelines.'
        },
        {
          title: 'Fraud reduction',
          desc: "Extract key information and verify an individual's identity without running the risk of forged passports. Increase confidence by requesting a live selfie and matching it against the high-res ID portrait stored inside the chip."
        },
        {
          title: 'Step-up verification',
          desc: 'Add NFC as a step-up verification during risky transactions, merchant account activations, or high-value currency transfers to deter persistent bad actors and protect critical financial thresholds.'
        }
      ]
    },
    learningTitle: 'Keep learning',
    readArticle: 'Read article',
    articleBadge: 'ICAO',
    articles: [
      {
        id: 1,
        title: 'A better customer verification process: How Identra is paving the way with NFC, mDL, and other new technologies',
        banner: 'NFC & mDL Integration',
        category: 'Blog',
        readTime: '9 mins',
        content: `As fraudulent identity documents become cheaper and easier to produce online using advanced deepfake engines and synthetic visual edits, relying purely on visual verification of ID cards is becoming a riskier choice.

To bridge this trust gap, Identra is building multi-layered identity infrastructure that embraces advanced, hard-to-spoof signals directly from device-native APIs. Chief among these technologies are NFC (Near Field Communication) verification and mDLs (mobile Driver's Licenses).

NFC lets applications read the cryptographically signed RFID chips directly embedded within modern passports and national identity cards. By requesting a contactless scan, the system retrieves pristine identity data signed with public key infrastructure (PKI) by the sovereign government's issuing authority.

This completely bypasses standard visual flaws, tampering, or digital replicas, and reduces manual check burdens to nearly zero.`
      },
      {
        id: 2,
        title: 'NFC passport verification: A guide',
        banner: 'NFC Passport Tech Guide',
        category: 'Blog',
        readTime: '11 mins',
        content: `Electronic Machine-Readable Travel Documents (eMRTD) are standardized by the International Civil Aviation Organization (ICAO). These travel documents contain a highly secure contactless integrated circuit (RFID chip) storing personal information, digital biometric portrait photos, and public keys.

How Identra performs NFC authentication under the hood:
1. MRZ Reading: The mobile camera scans the Machine-Readable Zone (MRZ) on the passport's data page. The printed details are used to derive the decryption keys needed for BAC or PACE.
2. Radio Reading: The user taps the passport to the back of their smartphone. Contactless radio communication is initialized.
3. Chip Verification: Passive Authentication verifies that chip data is authentic and unmodified. Active Authentication or Chip Authentication verifies that the physical chip is genuine and has not been cloned.`
      },
      {
        id: 3,
        title: 'The strategic guide to balancing risk and conversion',
        banner: 'Balancing Conversion',
        category: 'Guide',
        readTime: '12 mins',
        content: `Every security team wants zero fraud, but every growth team wants zero friction. Forcing every user through an exhaustive identity check can cause genuine users to drop off, while an overly relaxed flow invites malicious actors.

Achieving the right equilibrium requires context-aware friction:
- Segmenting by Risk: Standard transactions may not need ID checks, while high-risk operations should trigger biometric liveness and NFC chip scans.
- Progressive Disclosure: Do not prompt users to tap their passport unless suspicious indicators justify the extra step.
- Autodetection and help cues: When NFC is activated, guide the user visually and explain exactly where the sensor is on their device.`
      }
    ],
    explore: {
      title: "Explore more of Identra's identity platform",
      learnMore: 'Learn more',
      cards: [
        {
          title: 'Reduce friction with mDL verifications.',
          desc: 'Onboard qualified customers seamlessly using official state-issued mobile driver licenses (mDLs) conforming to ISO 18013-5 protocols.'
        },
        {
          title: 'Verify government IDs globally.',
          desc: 'Verify local licenses, regional passports, and national ID cards from 200+ countries with intelligent OCR extraction and biometric matching.'
        }
      ]
    },
    cta: {
      title: 'Ready to get started?',
      desc: 'Get in touch or start exploring the comprehensive identity infrastructure sandbox. Set up and begin making test credentials within minutes.',
      primary: 'Get a demo',
      secondary: 'Try it now'
    },
    modal: {
      separator: '-',
      close: 'Close',
      goBack: 'Go Back'
    }
  },
  es: {
    backToPlatform: 'Volver al resumen de la plataforma',
    badge: 'VERIFICACIÓN NFC',
    heroTitle: 'Detecta fraude en pasaportes e identificaciones con un toque. Verifica pasaportes y tarjetas de identidad con NFC para aumentar la seguridad y prevenir fraude sin añadir fricción.',
    getDemo: 'Solicitar una demo',
    heroBenefits: [
      { title: 'Detecta pasaportes falsificados o alterados digitalmente', desc: 'Escanea el chip RFID seguro de un pasaporte o tarjeta de identidad para ir más allá de las señales visuales y detectar pasaportes fraudulentos con mayor rapidez.' },
      { title: 'Reduce la revisión manual de pasaportes', desc: 'Usa NFC para automatizar el proceso de verificación de pasaportes y dedica más tiempo a investigar fraude complejo.' },
      { title: 'Mayores tasas de finalización', desc: 'Maximiza las conversiones con un flujo fácil de usar que guía al usuario durante todo el proceso de escaneo NFC.' }
    ],
    integrationPreview: 'VISTA PREVIA DE INTEGRACIÓN',
    howItWorks: 'Cómo funciona',
    tabs: ['1 Añadir', '2 Extraer', '3 Verificar'],
    steps: [
      {
        badge: 'PASO 1: INTEGRACIÓN DEL FLUJO',
        title: 'Añade verificación NFC a tu flujo KYC',
        desc: 'Añade verificación NFC como opción para dispositivos y documentos compatibles. Arrastra el componente NFC a tu constructor de flujos o actívalo de forma selectiva según los sensores del dispositivo y los requisitos del documento.',
        bullets: ['Las comprobaciones de sensores nativos se ejecutan en segundo plano', 'Reglas de omisión dinámicas si el dispositivo no admite NFC', 'Videos instructivos adaptados a la plataforma del dispositivo']
      },
      { badge: 'PASO 2: ESCANEO BIOMÉTRICO', title: 'Extrae de forma segura información de identidad del chip NFC', desc: 'Al pedir al usuario que apoye la parte posterior del teléfono sobre su identificación gubernamental o pasaporte, el lector NFC extrae en segundos datos completos de alta resolución almacenados directamente en el chip RFID.' },
      {
        badge: 'PASO 3: VALIDACIÓN AUTÓNOMA',
        title: 'Verifica autenticidad al instante con validación criptográfica de firmas PKI',
        desc: 'Identra evalúa claves estatales activas (CSCA) y desafíos de validación del chip (AA/CA) para asegurar que el chip sea genuino, no alterado y no duplicado.',
        checks: [
          { title: 'Autenticación pasiva (PA)', desc: 'Valida hashes firmados por el estado frente a modificaciones de archivos falsificados.' },
          { title: 'Autenticación activa (AA)', desc: 'Comprobaciones de desafío-respuesta para verificar la autenticidad física del chip.' },
          { title: 'Canales seguros', desc: 'Protege las cargas de datos en tránsito con estándares PACE.' },
          { title: 'Directorio PKI', desc: 'Contrasta con la lista maestra ICAO mediante claves certificadas.' }
        ]
      }
    ],
    simulator: {
      title: 'Simulador interactivo',
      desc: 'Prueba la maqueta del escáner sin contacto para extraer biometría cifrada en tiempo real.',
      start: 'Iniciar escaneo NFC simulado',
      reset: 'Restablecer escáner',
      initialLogs: ['Inicializando lector seguro sin contacto...', 'Detectando chip RFID... Listo.'],
      logs: ['Estableciendo conexión mediante protocolo ISO/IEC 14443...', 'Realizando autenticación BAC con entropía MRZ del pasaporte...', 'Acceso concedido. Leyendo COM...', 'Leyendo DG1... Nombre e ID del documento asignados.', 'Leyendo DG2... Retrato biométrico de alta resolución codificado.', 'Verificando firmas de autenticación pasiva con directorio público nacional (PKD)...', 'Realizando desafío-respuesta de autenticación activa...', 'Estableciendo canal PACE seguro para cifrado de extremo a extremo...', 'Descifrado correcto. Integridad: válida (100% genuino).'],
      scannedData: { firstName: 'Daphne', lastName: 'Vance', docNumber: 'EP2348910', nationality: 'Estados Unidos (USA)', birthDate: '1992-11-04', expiryDate: '2031-08-19', chipVerified: true }
    },
    phone: {
      header: 'Flujo de identidad',
      version: 'v2.10.4',
      verifyTitle: 'Verifica tu identidad',
      verifyDesc: 'Necesitamos algunos datos para ayudarnos a confirmar tu identidad.',
      verifications: 'Verificaciones',
      governmentId: 'Identificación gubernamental',
      selfieLiveness: 'Prueba de vida con selfie',
      nfcChipVerification: 'Verificación de chip NFC',
      next: 'Siguiente',
      holdTitle: 'Acerca el teléfono al chip del ID',
      holdDesc: 'Coloca el dispositivo plano contra la parte posterior de tu tarjeta de identidad o pasaporte.',
      scanningTitle: 'Escaneando chip NFC...',
      doNotMove: 'NO MUEVAS EL DISPOSITIVO',
      chipSuccessTitle: 'Chip verificado correctamente',
      chipSuccessMeta: 'AUTENTICACIÓN DIGITAL COMPATIBLE CON ICAO',
      docId: 'ID doc.',
      birthDate: 'Fecha nac.',
      expires: 'Vence',
      signatureAa: 'Firma AA',
      validPki: 'Válida (PKI)',
      cryptoTitle: 'Integridad criptográfica',
      cryptoDesc: 'Veredicto del núcleo autónomo de identidad de Identra',
      diagnostics: [{ name: 'Auth pasiva (CSCA)', status: 'APROBADO' }, { name: 'Auth activa (chip)', status: 'APROBADO' }, { name: 'Coincidencia hash foto', status: 'COINCIDE (100%)' }, { name: 'Cifrado PACE', status: 'SEGURO' }],
      secureHash: 'Hash de Secure Enclave: fd82..ae8a',
      secureFooter: 'Verificado de forma segura con la red criptográfica de Identra'
    },
    keyFeatures: {
      label: 'FUNCIONES CLAVE',
      title: 'Extrae de forma segura información de identidad desde dispositivos con NFC',
      desc: 'Aprovecha el hardware Near Field Communication (NFC) del smartphone para consultar claves públicas criptográficas seguras y verificar e-passports resistentes a manipulación en cualquier flujo.',
      technicalNote: 'Nota técnica detallada:'
    },
    featureAccordions: [
      { title: 'Mayor seguridad', description: 'Los pasaportes son fáciles de falsificar. Con NFC no necesitas depender de detalles visuales; la información proviene del chip RFID, con validación PKI adicional disponible.', details: 'Los datos del chip NFC están firmados digitalmente por el gobierno emisor con criptografía estatal. Cualquier intento de modificar el nombre, la fecha de nacimiento o la foto rompe esta firma, haciendo detectables al instante las IDs manipuladas o clonadas.' },
      { title: 'Verificación optimizada', description: 'Activa automáticamente el flujo óptimo cuando el dispositivo admite NFC y el documento contiene un chip RFID, con máxima seguridad y mínima pérdida de usuarios.', details: 'Nuestro SDK detecta la compatibilidad del navegador/dispositivo y los metadatos del pasaporte para decidir si debe guiar al usuario a tocar el pasaporte. Esto mantiene los flujos simples y añade seguridad sólida cuando hace falta.' },
      { title: 'UX sencilla con autodetección', description: 'Ayuda a los usuarios a completar el escaneo al primer intento con guías animadas, comentarios en tiempo real e instrucciones dinámicas sobre dónde colocar el dispositivo.', details: 'Los teléfonos tienen antenas NFC en ubicaciones distintas. Nuestras guías se adaptan al sistema operativo y marca del dispositivo del usuario para eliminar confusión.' },
      { title: 'Cobertura global', description: 'Acepta pasaportes electrónicos y documentos nacionales biométricos de más de 150 países, conforme a los estándares ICAO Doc 9303.', details: 'Ya sea un Personalausweis alemán, un pasaporte del Reino Unido o una tarjeta de identidad de la UE, Identra valida la firma del chip contra una base de datos completa y continuamente actualizada de certificados CSCA.' }
    ],
    useCases: {
      label: 'CASOS DE USO',
      title: 'Cómo pueden usar los equipos la verificación NFC',
      desc: 'Maximiza los umbrales de confianza y prevén fraude sofisticado de identidad sintética en hitos clave del ciclo de vida del usuario.',
      cards: [
        { title: 'Cumplimiento KYC', desc: 'Permite que personas en la UE y EE. UU. envíen sus pasaportes por NFC como parte de tu flujo KYC, cumpliendo niveles eIDAS estrictos y directrices contra delitos financieros.' },
        { title: 'Reducción de fraude', desc: 'Extrae información clave y verifica la identidad de una identra sin el riesgo de pasaportes falsificados. Aumenta la confianza solicitando una selfie en vivo y comparándola con el retrato de alta resolución guardado en el chip.' },
        { title: 'Verificación reforzada', desc: 'Añade NFC como verificación adicional en transacciones riesgosas, activaciones de cuentas comerciales o transferencias de alto valor para disuadir actores maliciosos y proteger umbrales financieros críticos.' }
      ]
    },
    learningTitle: 'Sigue aprendiendo',
    readArticle: 'Leer artículo',
    articleBadge: 'ICAO',
    articles: [
      { id: 1, title: 'Un mejor proceso de verificación de clientes: cómo Identra avanza con NFC, mDL y otras tecnologías nuevas', banner: 'Integración NFC y mDL', category: 'Blog', readTime: '9 min', content: 'A medida que los documentos de identidad fraudulentos se vuelven más baratos y fáciles de producir, depender solo de la verificación visual de IDs es cada vez más riesgoso.\n\nPara cerrar esta brecha de confianza, Identra construye infraestructura de identidad multicapa que usa señales avanzadas y difíciles de falsificar desde APIs nativas del dispositivo, como NFC y mDL.\n\nNFC permite leer chips RFID firmados criptográficamente en pasaportes modernos y documentos nacionales. El sistema recupera datos de identidad limpios firmados con infraestructura PKI por la autoridad emisora.\n\nEsto evita fallas visuales, manipulación y réplicas digitales, y reduce casi a cero la carga de revisión manual.' },
      { id: 2, title: 'Verificación de pasaportes con NFC: una guía', banner: 'Guía técnica de pasaporte NFC', category: 'Blog', readTime: '11 min', content: 'Los documentos electrónicos legibles por máquina (eMRTD) están estandarizados por ICAO. Contienen un circuito integrado sin contacto seguro que almacena información personal, retratos biométricos y claves públicas.\n\nIdentra autentica con NFC leyendo la MRZ, iniciando comunicación de radio sin contacto y verificando el chip. La autenticación pasiva comprueba que los datos son auténticos; la autenticación activa o del chip confirma que el chip físico no ha sido clonado.' },
      { id: 3, title: 'Guía estratégica para equilibrar riesgo y conversión', banner: 'Equilibrar conversión', category: 'Guía', readTime: '12 min', content: 'Todo equipo de seguridad busca cero fraude y todo equipo de crecimiento busca cero fricción. El equilibrio requiere fricción contextual.\n\nSegmenta por riesgo, usa divulgación progresiva y activa NFC solo cuando los indicadores lo justifiquen. Cuando NFC esté activo, guía visualmente al usuario y explica dónde está el sensor de su dispositivo.' }
    ],
    explore: {
      title: 'Explora más de la plataforma de identidad de Identra',
      learnMore: 'Más información',
      cards: [
        { title: 'Reduce la fricción con verificaciones mDL.', desc: 'Incorpora clientes cualificados sin fricción usando licencias de conducir móviles oficiales emitidas por estados y conformes con ISO 18013-5.' },
        { title: 'Verifica IDs gubernamentales globalmente.', desc: 'Verifica licencias locales, pasaportes regionales y tarjetas nacionales de identidad de más de 200 países con extracción OCR inteligente y comparación biométrica.' }
      ]
    },
    cta: { title: '¿Listo para empezar?', desc: 'Ponte en contacto o empieza a explorar el sandbox integral de infraestructura de identidad. Configura y crea credenciales de prueba en minutos.', primary: 'Solicitar una demo', secondary: 'Pruébalo ahora' },
    modal: { separator: '-', close: 'Cerrar', goBack: 'Volver' }
  },
  ja: {
    backToPlatform: 'プラットフォーム概要に戻る',
    badge: 'NFC 検証',
    heroTitle: 'タップでパスポートと ID の不正を検出。NFC でパスポートや ID カードを検証し、摩擦を増やさずにセキュリティを高めて不正を防ぎます。',
    getDemo: 'デモを依頼',
    heroBenefits: [
      { title: '偽造またはデジタル改ざんされたパスポートを検出', desc: 'パスポートや ID カード内の安全な RFID チップを読み取り、視覚情報だけでは見抜けない不正パスポートをより早く検出します。' },
      { title: 'パスポートの手動レビューを削減', desc: 'NFC でパスポート検証を自動化し、複雑な不正調査に時間を使えます。' },
      { title: '完了率の向上', desc: 'NFC スキャンの開始から完了までをわかりやすく案内するフローで、コンバージョンを最大化します。' }
    ],
    integrationPreview: '統合プレビュー',
    howItWorks: '仕組み',
    tabs: ['1 追加', '2 抽出', '3 検証'],
    steps: [
      { badge: 'ステップ 1: フロー統合', title: 'KYC フローに NFC 検証を追加', desc: '対応する端末と書類向けに NFC 検証を選択肢として追加します。NFC コンポーネントをフロービルダーに配置するか、端末センサーと書類要件に応じて選択的に起動できます。', bullets: ['端末ネイティブのセンサーチェックをバックグラウンドで実行', '端末が NFC 非対応の場合の動的スキップルール', '端末プラットフォームに合わせた案内動画'] },
      { badge: 'ステップ 2: 生体情報スキャン', title: 'NFC チップから本人情報を安全に抽出', desc: 'ユーザーにスマートフォンの背面を公的 ID カードまたはパスポートへ当ててもらうことで、NFC リーダーが RFID チップ内の高解像度データを数秒で抽出します。' },
      { badge: 'ステップ 3: 自律検証', title: '暗号学的 PKI 署名検証で真正性を即時確認', desc: 'Identra は有効な国別キー (CSCA) とチップ検証チャレンジ (AA/CA) を評価し、チップが完全に本物で、改ざんも複製もされていないことを確認します。', checks: [{ title: 'Passive Auth (PA)', desc: '国が署名したハッシュを検証し、偽造ファイルの改変を検出します。' }, { title: 'Active Auth (AA)', desc: 'チャレンジレスポンスで物理チップの真正性を確認します。' }, { title: '安全なチャネル', desc: 'PACE 標準で転送中のデータペイロードを保護します。' }, { title: 'PKI ディレクトリ', desc: '認証済みキーを使って ICAO Master List と照合します。' }] }
    ],
    simulator: {
      title: 'インタラクティブサンドボックス',
      desc: '非接触スキャナーのモックで、暗号化された生体情報をリアルタイムに抽出します。',
      start: 'NFC スキャンをシミュレート',
      reset: 'スキャナーをリセット',
      initialLogs: ['安全な非接触リーダーを初期化中...', 'RFID チップを検出中... 準備完了。'],
      logs: ['ISO/IEC 14443 プロトコルで接続を確立中...', 'パスポート MRZ エントロピーを使って BAC 認証を実行中...', 'アクセス許可。COM を読み取り中...', 'DG1 を読み取り中... 氏名と書類 ID を対応付けました。', 'DG2 を読み取り中... 高解像度の生体顔写真。', '国別公開鍵ディレクトリ (PKD) で受動認証署名を検証中...', 'Active Authentication チャレンジレスポンスを実行中...', 'エンドツーエンド暗号化用の安全な PACE チャネルを確立中...', '復号成功。整合性チェック: 有効 (100% genuine)。'],
      scannedData: { firstName: 'Daphne', lastName: 'Vance', docNumber: 'EP2348910', nationality: 'United States (USA)', birthDate: '1992-11-04', expiryDate: '2031-08-19', chipVerified: true }
    },
    phone: {
      header: '本人確認フロー', version: 'v2.10.4', verifyTitle: '本人確認を行います', verifyDesc: '本人確認のため、いくつかの情報が必要です。', verifications: '検証項目', governmentId: '公的 ID', selfieLiveness: 'セルフィー生体検知', nfcChipVerification: 'NFC チップ検証', next: '次へ', holdTitle: '電話を ID チップに当てる', holdDesc: '端末を ID カードまたはパスポートの裏面に平らに当ててください。', scanningTitle: 'NFC チップをスキャン中...', doNotMove: '端末を動かさないでください', chipSuccessTitle: 'チップ検証に成功しました', chipSuccessMeta: 'ICAO 準拠デジタル認証', docId: '書類 ID', birthDate: '生年月日', expires: '有効期限', signatureAa: '署名 AA', validPki: '有効 (PKI)', cryptoTitle: '暗号学的整合性', cryptoDesc: 'Identra 自律本人確認コアの判定', diagnostics: [{ name: 'Passive Auth (CSCA)', status: '合格' }, { name: 'Active Auth (Chip)', status: '合格' }, { name: '写真ハッシュ一致', status: '一致 (100%)' }, { name: 'PACE 暗号化', status: '安全' }], secureHash: 'Secure Enclave Hash: fd82..ae8a', secureFooter: 'Identra 暗号ネットワークで安全に検証済み'
    },
    keyFeatures: { label: '主な機能', title: 'NFC 対応端末から本人情報を安全に抽出', desc: 'スマートフォンの Near Field Communication (NFC) ハードウェアで安全な暗号公開鍵を照会し、改ざんに強い e-passport を任意のフローで即時検証します。', technicalNote: '詳細な技術メモ:' },
    featureAccordions: [
      { title: 'セキュリティ向上', description: 'パスポートは偽造されやすいものです。NFC では視覚的な詳細だけに頼らず、RFID チップから情報を取得し、追加の PKI 検証も利用できます。', details: 'NFC チップデータは発行政府により国レベルの暗号でデジタル署名されています。氏名、生年月日、写真を変更しようとすると署名が壊れるため、改ざんや複製 ID を即座に検出できます。' },
      { title: '効率的な検証', description: '端末が NFC に対応し、書類に RFID チップがある場合に最適なユーザーフローを自動起動し、高いセキュリティと低い離脱率を両立します。', details: 'SDK がブラウザ/端末互換性とパスポートメタデータを自動検出し、ユーザーにパスポートをタップするよう案内するか判断します。必要なときだけ強固なセキュリティを追加できます。' },
      { title: '自動検出によるシンプルな UX', description: 'アニメーションガイド、リアルタイムフィードバック、端末の置き場所を示す動的な案内で、ユーザーが初回でスキャンを完了できるよう支援します。', details: 'NFC アンテナの位置は端末ごとに異なります。ガイドは OS と機種ブランドに合わせて調整され、ユーザーの迷いを減らします。' },
      { title: 'グローバル対応', description: 'ICAO Doc 9303 標準に準拠し、150 か国以上の電子パスポートと生体認証付き国民 ID カードを受け付けます。', details: 'ドイツの Personalausweis、英国パスポート、EU ID カードなど、Identra は継続更新される CSCA 証明書データベースに対してチップ署名を検証します。' }
    ],
    useCases: { label: 'ユースケース', title: 'チームでの NFC 検証の活用方法', desc: '主要なユーザーライフサイクルの節目で信頼しきい値を高め、高度な合成 ID 不正を防ぎます。', cards: [{ title: 'KYC コンプライアンス', desc: 'EU と US の個人が KYC フローの一部として NFC 経由でパスポートを提出できるようにし、厳格な eIDAS レベルや金融犯罪対策ガイドラインに対応します。' }, { title: '不正削減', desc: '偽造パスポートのリスクを避けながら重要情報を抽出し、本人性を確認します。ライブセルフィーを要求し、チップ内の高解像度 ID 写真と照合して信頼性を高めます。' }, { title: '追加検証', desc: 'リスクの高い取引、加盟店アカウント有効化、高額送金時に NFC を追加検証として使い、悪意ある行為者を抑止します。' }] },
    learningTitle: 'さらに学ぶ', readArticle: '記事を読む', articleBadge: 'ICAO',
    articles: [
      { id: 1, title: 'より良い顧客検証プロセス: Identra が NFC、mDL、新技術で切り拓く道', banner: 'NFC と mDL の統合', category: 'ブログ', readTime: '9 分', content: '不正な本人確認書類が高度な合成編集で安価かつ簡単に作られるようになり、ID カードの視覚検証だけに頼ることはますます危険になっています。\n\nIdentra はこの信頼ギャップを埋めるため、NFC や mDL など端末ネイティブ API から得られる偽装困難なシグナルを活用する多層の本人確認基盤を構築しています。\n\nNFC は現代のパスポートや国民 ID に埋め込まれた暗号署名付き RFID チップを直接読み取り、発行機関が PKI で署名した正確な本人情報を取得します。' },
      { id: 2, title: 'NFC パスポート検証ガイド', banner: 'NFC パスポート技術ガイド', category: 'ブログ', readTime: '11 分', content: '電子機械読取式渡航文書 (eMRTD) は ICAO により標準化されています。これらの文書には、個人情報、生体顔写真、公開鍵を保存する安全な非接触 IC が含まれます。\n\nIdentra は MRZ 読み取り、非接触無線通信、チップ検証を通じて NFC 認証を行います。受動認証はデータの真正性を、能動認証またはチップ認証は物理チップが複製されていないことを確認します。' },
      { id: 3, title: 'リスクとコンバージョンを両立する戦略ガイド', banner: 'コンバージョンの最適化', category: 'ガイド', readTime: '12 分', content: 'セキュリティチームは不正ゼロを望み、成長チームは摩擦ゼロを望みます。適切な均衡には文脈に応じた摩擦が必要です。\n\nリスク別に分け、段階的な開示を行い、必要な場合だけ NFC を起動します。NFC を使うときは、センサー位置を視覚的に案内して離脱を防ぎます。' }
    ],
    explore: { title: 'Identra の本人確認プラットフォームをさらに見る', learnMore: '詳しく見る', cards: [{ title: 'mDL 検証で摩擦を削減。', desc: 'ISO 18013-5 に準拠した公式州発行のモバイル運転免許証 (mDL) で、適格な顧客をスムーズにオンボードします。' }, { title: '世界中の公的 ID を検証。', desc: '200 か国以上の地域免許証、パスポート、国民 ID カードを、インテリジェントな OCR 抽出と生体照合で検証します。' }] },
    cta: { title: '始める準備はできましたか？', desc: '包括的な本人確認基盤サンドボックスについて問い合わせるか、今すぐ探索を始めましょう。数分で設定し、テスト用資格情報を作成できます。', primary: 'デモを依頼', secondary: '今すぐ試す' },
    modal: { separator: '-', close: '閉じる', goBack: '戻る' }
  },
  de: {
    backToPlatform: 'Zur Plattformübersicht',
    badge: 'NFC-VERIFIZIERUNG',
    heroTitle: 'Erkennen Sie Pass- und ID-Betrug mit einem Tippen. Verifizieren Sie Pässe und Ausweise mit NFC, um Sicherheit zu erhöhen und Betrug ohne zusätzliche Reibung zu verhindern.',
    getDemo: 'Demo anfragen',
    heroBenefits: [
      { title: 'Gefälschte oder digital veränderte Pässe erkennen', desc: 'Scannen Sie den sicheren RFID-Chip in einem Pass oder Ausweis, um über visuelle Hinweise hinauszugehen und betrügerische Pässe schneller zu erkennen.' },
      { title: 'Manuelle Passprüfung reduzieren', desc: 'Nutzen Sie NFC, um die Passverifizierung zu automatisieren, und investieren Sie die Zeit stattdessen in komplexe Betrugsermittlungen.' },
      { title: 'Höhere Abschlussraten', desc: 'Maximieren Sie Konversionen mit einem nutzerfreundlichen Ablauf, der Nutzer von Anfang bis Ende durch den NFC-Scan führt.' }
    ],
    integrationPreview: 'INTEGRATIONSVORSCHAU',
    howItWorks: 'So funktioniert es',
    tabs: ['1 Hinzufügen', '2 Extrahieren', '3 Verifizieren'],
    steps: [
      { badge: 'SCHRITT 1: FLOW-INTEGRATION', title: 'NFC-Verifizierung zu Ihrem KYC-Flow hinzufügen', desc: 'Fügen Sie NFC-Verifizierung als Option für kompatible Geräte und Dokumente hinzu. Ziehen Sie die NFC-Komponente in Ihren Flow Builder oder lösen Sie sie je nach Gerätesensoren und Dokumentanforderungen selektiv aus.', bullets: ['Gerätenahe Sensorprüfungen laufen nahtlos im Hintergrund', 'Dynamische Umgehungsregeln, wenn ein Gerät NFC nicht unterstützt', 'Anleitungsvideos passend zur Geräteplattform'] },
      { badge: 'SCHRITT 2: BIOMETRISCHER SCAN', title: 'Identitätsinformationen sicher aus dem NFC-Chip extrahieren', desc: 'Indem Nutzer ihr Smartphone an ihren amtlichen Ausweis oder Reisepass halten, extrahiert der NFC-Leser innerhalb von Sekunden hochauflösende Daten direkt vom RFID-Chip.' },
      { badge: 'SCHRITT 3: AUTONOME VALIDIERUNG', title: 'Echtheit sofort mit kryptografischer PKI-Signaturvalidierung prüfen', desc: 'Identra bewertet aktive staatliche Schlüssel (CSCA) und Chip-Validierungs-Challenges (AA/CA), um sicherzustellen, dass der Chip echt, unverändert und nicht dupliziert ist.', checks: [{ title: 'Passive Auth (PA)', desc: 'Validiert staatlich signierte Hashes gegen gefälschte Dateimodifikationen.' }, { title: 'Active Auth (AA)', desc: 'Challenge-Response-Prüfungen verifizieren die Echtheit des physischen Chips.' }, { title: 'Sichere Kanäle', desc: 'Schützt Datenlasten während der Übertragung mit PACE-Standards.' }, { title: 'PKI-Verzeichnis', desc: 'Gleicht zertifizierte Schlüssel mit der ICAO Master List ab.' }] }
    ],
    simulator: {
      title: 'Interaktiver Sandbox-Simulator', desc: 'Testen Sie den kontaktlosen Scanner-Mockup, um verschlüsselte biometrische Daten in Echtzeit zu extrahieren.', start: 'Simulierten NFC-Scan starten', reset: 'Scanner zurücksetzen', initialLogs: ['Sicheren kontaktlosen Leser initialisieren...', 'RFID-Chip wird erkannt... Bereit.'], logs: ['Verbindung über ISO/IEC 14443-Protokoll wird hergestellt...', 'BAC-Authentifizierung mit MRZ-Entropie des Passes wird ausgeführt...', 'Zugriff gewährt. COM wird gelesen...', 'DG1 wird gelesen... Name und Dokument-ID zugeordnet.', 'DG2 wird gelesen... Hochauflösendes biometrisches Gesichtsporträt.', 'Passive Authentifizierungssignaturen werden mit nationalem PKD geprüft...', 'Active-Authentication-Challenge-Response wird ausgeführt...', 'Sicherer PACE-Kanal für Ende-zu-Ende-Verschlüsselung wird aufgebaut...', 'Entschlüsselung erfolgreich. Integritätsprüfung: gültig (100% echt).'], scannedData: { firstName: 'Daphne', lastName: 'Vance', docNumber: 'EP2348910', nationality: 'Vereinigte Staaten (USA)', birthDate: '1992-11-04', expiryDate: '2031-08-19', chipVerified: true }
    },
    phone: {
      header: 'Identitäts-Flow', version: 'v2.10.4', verifyTitle: 'Identität verifizieren', verifyDesc: 'Wir benötigen einige Informationen, um Ihre Identität zu bestätigen.', verifications: 'Verifizierungen', governmentId: 'Amtlicher Ausweis', selfieLiveness: 'Selfie-Liveness', nfcChipVerification: 'NFC-Chip-Verifizierung', next: 'Weiter', holdTitle: 'Telefon an den ID-Chip halten', holdDesc: 'Legen Sie Ihr Gerät flach an die Rückseite Ihres Ausweises oder Reisepasses.', scanningTitle: 'NFC-Chip wird gescannt...', doNotMove: 'GERÄT NICHT BEWEGEN', chipSuccessTitle: 'Chip erfolgreich verifiziert', chipSuccessMeta: 'ICAO-KONFORME DIGITALE AUTHENTIFIZIERUNG', docId: 'Dok.-ID', birthDate: 'Geburtsdatum', expires: 'Gültig bis', signatureAa: 'Signatur AA', validPki: 'Gültig (PKI)', cryptoTitle: 'Kryptografische Integrität', cryptoDesc: 'Urteil des autonomen Identitätskerns von Identra', diagnostics: [{ name: 'Passive Auth (CSCA)', status: 'BESTANDEN' }, { name: 'Active Auth (Chip)', status: 'BESTANDEN' }, { name: 'Foto-Hash-Abgleich', status: 'TREFFER (100%)' }, { name: 'PACE-Verschlüsselung', status: 'GESICHERT' }], secureHash: 'Secure Enclave Hash: fd82..ae8a', secureFooter: 'Sicher mit Identras kryptografischem Netzwerk verifiziert'
    },
    keyFeatures: { label: 'KERNFUNKTIONEN', title: 'Identitätsinformationen sicher von NFC-fähigen Geräten extrahieren', desc: 'Nutzen Sie Near Field Communication (NFC)-Hardware von Smartphones, um sichere kryptografische öffentliche Schlüssel abzufragen und manipulationsresistente e-Pässe sofort in jedem Flow zu verifizieren.', technicalNote: 'Ausführliche technische Notiz:' },
    featureAccordions: [
      { title: 'Erhöhte Sicherheit', description: 'Pässe sind leicht zu fälschen. Mit NFC müssen Sie sich nicht auf visuelle Details verlassen; die Informationen stammen vom RFID-Chip, mit zusätzlicher PKI-Validierung.', details: 'NFC-Chipdaten werden von der ausstellenden Regierung mit staatlicher Kryptografie digital signiert. Jeder Versuch, Name, Geburtsdatum oder Foto zu ändern, bricht diese Signatur und macht manipulierte oder geklonte IDs sofort erkennbar.' },
      { title: 'Optimierte Verifizierung', description: 'Lösen Sie automatisch den optimalen Nutzerflow aus, wenn ein Gerät NFC unterstützt und das Dokument einen RFID-Chip enthält.', details: 'Unser SDK erkennt Browser-/Gerätekompatibilität und Passmetadaten automatisch und entscheidet, ob der Nutzer zum Antippen des Passes geführt wird. Einfache Flows bleiben einfach, zusätzliche Sicherheit kommt nur bei Bedarf hinzu.' },
      { title: 'Einfache UX mit Autodetektion', description: 'Helfen Sie Nutzern mit animierten Hilfen, Echtzeitfeedback und dynamischen Anweisungen, den Scan beim ersten Versuch abzuschließen.', details: 'NFC-Antennen sitzen je nach Smartphone an unterschiedlichen Stellen. Unsere Hinweise passen sich an Betriebssystem und Gerätemarke an, um Verwirrung zu vermeiden.' },
      { title: 'Globale Abdeckung', description: 'Akzeptieren Sie elektronische Pässe und biometrische nationale Ausweise aus über 150 Ländern gemäß ICAO Doc 9303.', details: 'Ob deutscher Personalausweis, britischer Pass oder EU-Ausweiskarte: Identra validiert die Chip-Signatur gegen eine umfassende, laufend aktualisierte Datenbank von CSCA-Zertifikaten.' }
    ],
    useCases: { label: 'ANWENDUNGSFÄLLE', title: 'Wie Teams NFC-Verifizierung nutzen können', desc: 'Maximieren Sie Vertrauensschwellen und verhindern Sie anspruchsvollen synthetischen Identitätsbetrug über wichtige Nutzerlebenszyklus-Meilensteine hinweg.', cards: [{ title: 'KYC-Compliance', desc: 'Ermöglichen Sie Personen in der EU und den USA, ihre Pässe per NFC als Teil Ihres KYC-Flows einzureichen und strenge eIDAS-Stufen sowie Finanzkriminalitätsrichtlinien einzuhalten.' }, { title: 'Betrugsreduzierung', desc: 'Extrahieren Sie wichtige Informationen und verifizieren Sie die Identität einer Person ohne das Risiko gefälschter Pässe. Erhöhen Sie die Sicherheit durch ein Live-Selfie und Abgleich mit dem hochauflösenden ID-Porträt im Chip.' }, { title: 'Step-up-Verifizierung', desc: 'Fügen Sie NFC bei riskanten Transaktionen, Händlerkonto-Aktivierungen oder hochwertigen Währungstransfers als zusätzliche Verifizierung hinzu.' }] },
    learningTitle: 'Weiterlernen', readArticle: 'Artikel lesen', articleBadge: 'ICAO',
    articles: [
      { id: 1, title: 'Ein besserer Kundenverifizierungsprozess: Wie Identra mit NFC, mDL und neuen Technologien vorangeht', banner: 'NFC- und mDL-Integration', category: 'Blog', readTime: '9 Min.', content: 'Da betrügerische Identitätsdokumente günstiger und leichter herzustellen sind, wird reine visuelle ID-Prüfung riskanter.\n\nIdentra schließt diese Vertrauenslücke mit mehrschichtiger Identitätsinfrastruktur, die schwer fälschbare Signale aus gerätenativen APIs nutzt, darunter NFC und mDL.\n\nNFC liest kryptografisch signierte RFID-Chips moderner Pässe und Ausweise direkt aus und ruft saubere Identitätsdaten ab, die von der ausstellenden Behörde per PKI signiert wurden.' },
      { id: 2, title: 'NFC-Passverifizierung: Ein Leitfaden', banner: 'NFC-Pass-Technikleitfaden', category: 'Blog', readTime: '11 Min.', content: 'Elektronische maschinenlesbare Reisedokumente (eMRTD) sind von der ICAO standardisiert. Sie enthalten einen sicheren kontaktlosen Chip mit persönlichen Informationen, biometrischen Porträts und öffentlichen Schlüsseln.\n\nIdentra authentifiziert per NFC durch MRZ-Lesung, kontaktlose Funkkommunikation und Chipprüfung. Passive Authentifizierung bestätigt unveränderte Daten; Active Authentication oder Chip Authentication bestätigt, dass der physische Chip nicht geklont wurde.' },
      { id: 3, title: 'Der strategische Leitfaden zum Ausgleich von Risiko und Konversion', banner: 'Konversion ausbalancieren', category: 'Leitfaden', readTime: '12 Min.', content: 'Sicherheitsteams wollen null Betrug, Wachstumsteams null Reibung. Das richtige Gleichgewicht erfordert kontextabhängige Reibung.\n\nSegmentieren Sie nach Risiko, nutzen Sie progressive Offenlegung und aktivieren Sie NFC nur, wenn Hinweise dies rechtfertigen. Wenn NFC aktiv ist, führen Sie Nutzer visuell und erklären Sie die Sensorposition.' }
    ],
    explore: { title: 'Mehr von Identras Identitätsplattform entdecken', learnMore: 'Mehr erfahren', cards: [{ title: 'Reibung mit mDL-Verifizierungen reduzieren.', desc: 'Onboarden Sie qualifizierte Kunden nahtlos mit offiziellen staatlichen mobilen Führerscheinen (mDLs), die ISO 18013-5 erfüllen.' }, { title: 'Amtliche IDs weltweit verifizieren.', desc: 'Verifizieren Sie lokale Führerscheine, regionale Pässe und nationale Ausweise aus über 200 Ländern mit intelligenter OCR-Extraktion und biometrischem Abgleich.' }] },
    cta: { title: 'Bereit loszulegen?', desc: 'Kontaktieren Sie uns oder erkunden Sie die umfassende Sandbox für Identitätsinfrastruktur. Richten Sie sie ein und erstellen Sie innerhalb weniger Minuten Test-Credentials.', primary: 'Demo anfragen', secondary: 'Jetzt ausprobieren' },
    modal: { separator: '-', close: 'Schließen', goBack: 'Zurück' }
  },
  vi: {
    backToPlatform: 'Quay lại tổng quan nền tảng',
    badge: 'XÁC MINH NFC',
    heroTitle: 'Phát hiện gian lận hộ chiếu và ID chỉ bằng một lần chạm. Xác minh hộ chiếu và thẻ ID bằng NFC để tăng bảo mật, ngăn gian lận mà không tạo thêm ma sát.',
    getDemo: 'Nhận bản demo',
    heroBenefits: [
      { title: 'Phát hiện hộ chiếu giả hoặc bị chỉnh sửa số', desc: 'Quét chip RFID bảo mật trong hộ chiếu hoặc thẻ ID để vượt qua các dấu hiệu trực quan và phát hiện hộ chiếu gian lận nhanh hơn.' },
      { title: 'Giảm xét duyệt thủ công hộ chiếu', desc: 'Dùng NFC để tự động hóa quy trình xác minh hộ chiếu, dành thời gian cho các cuộc điều tra gian lận phức tạp hơn.' },
      { title: 'Tăng tỷ lệ hoàn tất', desc: 'Tối đa hóa chuyển đổi bằng luồng thân thiện, hướng dẫn người dùng trong toàn bộ quá trình quét NFC.' }
    ],
    integrationPreview: 'XEM TRƯỚC TÍCH HỢP',
    howItWorks: 'Cách hoạt động',
    tabs: ['1 Thêm', '2 Trích xuất', '3 Xác minh'],
    steps: [
      { badge: 'BƯỚC 1: TÍCH HỢP LUỒNG', title: 'Thêm xác minh NFC vào luồng KYC', desc: 'Thêm xác minh NFC làm tùy chọn cho thiết bị và giấy tờ tương thích. Chỉ cần kéo thả thành phần NFC vào trình tạo luồng hoặc kích hoạt có chọn lọc theo cảm biến thiết bị và yêu cầu giấy tờ.', bullets: ['Kiểm tra cảm biến gốc của thiết bị chạy mượt mà trong nền', 'Quy tắc bỏ qua động nếu thiết bị người dùng không hỗ trợ NFC', 'Video hướng dẫn được điều chỉnh theo nền tảng thiết bị'] },
      { badge: 'BƯỚC 2: QUÉT SINH TRẮC HỌC', title: 'Trích xuất an toàn thông tin định danh từ chip NFC', desc: 'Khi yêu cầu người dùng áp mặt sau điện thoại vào thẻ ID do chính phủ cấp hoặc hộ chiếu, đầu đọc NFC sẽ trích xuất dữ liệu độ phân giải cao được lưu trực tiếp trên chip RFID trong vài giây.' },
      { badge: 'BƯỚC 3: XÁC THỰC TỰ ĐỘNG', title: 'Xác minh tính xác thực tức thì bằng chữ ký mật mã PKI', desc: 'Identra đánh giá khóa hoạt động cấp quốc gia (CSCA) và thử thách xác thực chip (AA/CA) để bảo đảm chip hoàn toàn thật, không bị chỉnh sửa và chưa bị sao chép.', checks: [{ title: 'Xác thực thụ động (PA)', desc: 'Xác thực hash do nhà nước ký để phát hiện chỉnh sửa tệp giả mạo.' }, { title: 'Xác thực chủ động (AA)', desc: 'Kiểm tra thử thách-phản hồi để xác minh tính thật của chip vật lý.' }, { title: 'Kênh bảo mật', desc: 'Bảo vệ payload dữ liệu khi truyền bằng tiêu chuẩn PACE.' }, { title: 'Thư mục PKI', desc: 'Đối chiếu với ICAO Master List bằng khóa đã chứng nhận.' }] }
    ],
    simulator: {
      title: 'Trình mô phỏng tương tác',
      desc: 'Thử mô hình máy quét không tiếp xúc để trích xuất sinh trắc học đã mã hóa theo thời gian thực.',
      start: 'Bắt đầu quét NFC mô phỏng',
      reset: 'Đặt lại máy quét',
      initialLogs: ['Đang khởi tạo đầu đọc không tiếp xúc bảo mật...', 'Đang phát hiện chip RFID... Sẵn sàng.'],
      logs: ['Đang thiết lập kết nối qua giao thức ISO/IEC 14443...', 'Đang thực hiện xác thực BAC bằng entropy MRZ của hộ chiếu...', 'Đã cấp quyền truy cập. Đang đọc COM...', 'Đang đọc DG1... Đã ánh xạ tên và ID tài liệu.', 'Đang đọc DG2... Ảnh chân dung sinh trắc học độ phân giải cao.', 'Đang xác minh chữ ký xác thực thụ động bằng thư mục khóa công khai quốc gia (PKD)...', 'Đang thực hiện thử thách-phản hồi Active Authentication...', 'Đang thiết lập kênh PACE bảo mật để mã hóa đầu cuối payload...', 'Giải mã thành công. Kiểm tra toàn vẹn: hợp lệ (100% thật).'],
      scannedData: { firstName: 'Daphne', lastName: 'Vance', docNumber: 'EP2348910', nationality: 'Hoa Kỳ (USA)', birthDate: '1992-11-04', expiryDate: '2031-08-19', chipVerified: true }
    },
    phone: {
      header: 'Luồng định danh', version: 'v2.10.4', verifyTitle: 'Xác minh danh tính của bạn', verifyDesc: 'Chúng tôi cần một số thông tin để giúp xác nhận danh tính của bạn.', verifications: 'Các bước xác minh', governmentId: 'ID chính phủ', selfieLiveness: 'Kiểm tra selfie sống', nfcChipVerification: 'Xác minh chip NFC', next: 'Tiếp theo', holdTitle: 'Áp điện thoại vào chip ID', holdDesc: 'Đặt thiết bị nằm phẳng trên mặt sau thẻ ID hoặc hộ chiếu của bạn.', scanningTitle: 'Đang quét chip NFC...', doNotMove: 'KHÔNG DI CHUYỂN THIẾT BỊ', chipSuccessTitle: 'Xác minh chip thành công', chipSuccessMeta: 'XÁC THỰC SỐ TUÂN THỦ ICAO', docId: 'ID giấy tờ', birthDate: 'Ngày sinh', expires: 'Hết hạn', signatureAa: 'Chữ ký AA', validPki: 'Hợp lệ (PKI)', cryptoTitle: 'Tính toàn vẹn mật mã', cryptoDesc: 'Kết luận từ lõi định danh tự động của Identra', diagnostics: [{ name: 'Xác thực thụ động (CSCA)', status: 'ĐẠT' }, { name: 'Xác thực chủ động (chip)', status: 'ĐẠT' }, { name: 'Khớp hash ảnh', status: 'KHỚP (100%)' }, { name: 'Mã hóa PACE', status: 'ĐÃ BẢO MẬT' }], secureHash: 'Hash Secure Enclave: fd82..ae8a', secureFooter: 'Được xác minh an toàn bằng mạng mật mã của Identra'
    },
    keyFeatures: { label: 'TÍNH NĂNG CHÍNH', title: 'Trích xuất an toàn thông tin định danh từ thiết bị hỗ trợ NFC', desc: 'Tận dụng phần cứng Near Field Communication (NFC) trên điện thoại để truy vấn khóa công khai mật mã bảo mật và xác minh tức thì e-passport chống can thiệp trong mọi luồng.', technicalNote: 'Ghi chú kỹ thuật chuyên sâu:' },
    featureAccordions: [
      { title: 'Tăng bảo mật', description: 'Hộ chiếu rất dễ bị làm giả. Với NFC, bạn không cần phụ thuộc vào chi tiết trực quan; thông tin đến từ chip RFID và có thể bổ sung xác thực PKI.', details: 'Dữ liệu chip NFC được chính phủ phát hành ký số bằng mật mã cấp quốc gia. Mọi nỗ lực sửa tên, ngày sinh hoặc ảnh trên hộ chiếu sẽ làm hỏng chữ ký này, giúp phát hiện ngay ID bị chỉnh sửa hoặc sao chép.' },
      { title: 'Xác minh tinh gọn', description: 'Tự động kích hoạt luồng tối ưu khi thiết bị hỗ trợ NFC và giấy tờ có chip RFID, bảo đảm an toàn tối đa với tỷ lệ rời bỏ thấp.', details: 'SDK thông minh tự phát hiện khả năng tương thích của trình duyệt/thiết bị và siêu dữ liệu hộ chiếu để quyết định có hướng dẫn người dùng chạm hộ chiếu hay không. Luồng đơn giản vẫn đơn giản, còn bảo mật mạnh được thêm khi cần.' },
      { title: 'Trải nghiệm đơn giản với tự phát hiện', description: 'Giúp người dùng quét thành công ngay lần đầu bằng hướng dẫn động, phản hồi thời gian thực và chỉ dẫn chính xác nơi đặt thiết bị.', details: 'Vị trí ăng-ten NFC khác nhau giữa các điện thoại. Hướng dẫn của chúng tôi thích ứng với hệ điều hành và hãng thiết bị để giảm nhầm lẫn cho người dùng.' },
      { title: 'Phạm vi toàn cầu', description: 'Chấp nhận hộ chiếu điện tử và thẻ căn cước quốc gia sinh trắc học từ hơn 150 quốc gia, tuân thủ tiêu chuẩn ICAO Doc 9303.', details: 'Dù là Personalausweis của Đức, hộ chiếu Vương quốc Anh hay thẻ ID của EU, Identra xác minh chữ ký chip với cơ sở dữ liệu chứng chỉ CSCA toàn diện và liên tục cập nhật.' }
    ],
    useCases: { label: 'TRƯỜNG HỢP SỬ DỤNG', title: 'Các đội ngũ có thể dùng xác minh NFC như thế nào', desc: 'Tối đa hóa ngưỡng tin cậy và ngăn gian lận danh tính tổng hợp tinh vi trong các mốc chính của vòng đời người dùng.', cards: [{ title: 'Tuân thủ KYC', desc: 'Cho phép cá nhân tại EU và US gửi hộ chiếu qua NFC trong luồng KYC, đáp ứng cấp độ eIDAS nghiêm ngặt và hướng dẫn chống tội phạm tài chính.' }, { title: 'Giảm gian lận', desc: 'Trích xuất thông tin chính và xác minh danh tính cá nhân mà không chịu rủi ro hộ chiếu giả. Tăng độ tin cậy bằng cách yêu cầu selfie trực tiếp và đối chiếu với ảnh ID độ phân giải cao trong chip.' }, { title: 'Xác minh tăng cường', desc: 'Thêm NFC làm bước xác minh tăng cường trong giao dịch rủi ro, kích hoạt tài khoản người bán hoặc chuyển tiền giá trị cao để ngăn tác nhân xấu và bảo vệ ngưỡng tài chính quan trọng.' }] },
    learningTitle: 'Tiếp tục tìm hiểu', readArticle: 'Đọc bài viết', articleBadge: 'ICAO',
    articles: [
      { id: 1, title: 'Quy trình xác minh khách hàng tốt hơn: Identra mở đường với NFC, mDL và các công nghệ mới', banner: 'Tích hợp NFC và mDL', category: 'Blog', readTime: '9 phút', content: 'Khi giấy tờ định danh giả ngày càng rẻ và dễ tạo bằng công cụ chỉnh sửa tổng hợp, chỉ dựa vào xác minh trực quan ID trở nên rủi ro hơn.\n\nĐể thu hẹp khoảng cách tin cậy này, Identra xây dựng hạ tầng định danh nhiều lớp, sử dụng tín hiệu khó giả mạo từ API gốc của thiết bị như NFC và mDL.\n\nNFC cho phép ứng dụng đọc trực tiếp chip RFID được ký bằng mật mã trong hộ chiếu hiện đại và thẻ ID quốc gia, lấy dữ liệu định danh sạch do cơ quan phát hành ký bằng PKI.' },
      { id: 2, title: 'Hướng dẫn xác minh hộ chiếu bằng NFC', banner: 'Hướng dẫn kỹ thuật hộ chiếu NFC', category: 'Blog', readTime: '11 phút', content: 'Tài liệu du lịch điện tử đọc được bằng máy (eMRTD) được ICAO tiêu chuẩn hóa. Chúng chứa mạch tích hợp không tiếp xúc bảo mật, lưu thông tin cá nhân, ảnh chân dung sinh trắc học và khóa công khai.\n\nIdentra xác thực NFC bằng cách đọc MRZ, khởi tạo truyền thông vô tuyến không tiếp xúc và xác minh chip. Xác thực thụ động kiểm tra dữ liệu thật và không bị sửa; xác thực chủ động hoặc xác thực chip xác nhận chip vật lý chưa bị sao chép.' },
      { id: 3, title: 'Hướng dẫn chiến lược để cân bằng rủi ro và chuyển đổi', banner: 'Cân bằng chuyển đổi', category: 'Hướng dẫn', readTime: '12 phút', content: 'Đội bảo mật muốn không có gian lận, còn đội tăng trưởng muốn không có ma sát. Điểm cân bằng cần ma sát theo ngữ cảnh.\n\nHãy phân tầng theo rủi ro, dùng tiết lộ lũy tiến và chỉ kích hoạt NFC khi tín hiệu đáng ngờ thật sự cần bước bổ sung. Khi NFC được bật, hãy hướng dẫn trực quan vị trí cảm biến trên thiết bị.' }
    ],
    explore: { title: 'Khám phá thêm nền tảng định danh của Identra', learnMore: 'Tìm hiểu thêm', cards: [{ title: 'Giảm ma sát với xác minh mDL.', desc: 'Tiếp nhận khách hàng đủ điều kiện liền mạch bằng giấy phép lái xe di động (mDL) chính thức do bang cấp, tuân thủ ISO 18013-5.' }, { title: 'Xác minh ID chính phủ trên toàn cầu.', desc: 'Xác minh giấy phép địa phương, hộ chiếu khu vực và thẻ ID quốc gia từ hơn 200 quốc gia bằng trích xuất OCR thông minh và đối chiếu sinh trắc học.' }] },
    cta: { title: 'Sẵn sàng bắt đầu?', desc: 'Liên hệ hoặc bắt đầu khám phá sandbox hạ tầng định danh toàn diện. Thiết lập và tạo thông tin xác thực thử nghiệm chỉ trong vài phút.', primary: 'Nhận bản demo', secondary: 'Dùng thử ngay' },
    modal: { separator: '-', close: 'Đóng', goBack: 'Quay lại' }
  }
} as const;
