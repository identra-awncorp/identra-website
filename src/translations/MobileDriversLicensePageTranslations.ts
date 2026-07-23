/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MOBILE_DRIVERS_LICENSE_PAGE_TRANSLATIONS = {
  en: {
    backToHome: 'Back to home',
    badge: "Mobile driver's license",
    heroTitle: "Verify users instantly and securely. Verify mobile driver's licenses (mDLs) from industry-leading digital wallet providers to reduce user friction.",
    tryDemo: 'Try the demo',
    pillars: [
      {
        title: 'Increased completion rates',
        desc: 'Maximize conversions with a user-friendly flow that guides users through the wallet handoff process from start to finish.'
      },
      {
        title: 'Lower chances of identity fraud',
        desc: 'Users typically perform an additional hardware-based authentication, like Face ID, before submitting an mDL, adding an extra layer of security.'
      },
      {
        title: 'Higher assurance against fraudulent submissions',
        desc: "Validate mDLs against participating states' DMV records, reducing the risk of fraudulent submissions and tampered biometric information."
      }
    ],
    simulatorLabel: 'Interactive Simulator',
    howItWorksTitle: 'How it works',
    steps: [
      {
        label: 'Configure',
        badge: 'Step 1: Setup',
        title: 'Configure your collection flow to accept mDLs',
        desc: "Set mDLs as an acceptable identity document in your dashboard. If a compatible digital wallet, such as Apple Wallet or Google Wallet, or state-supported mDL is detected on a user's device, Identra will gracefully prompt the user for permission to submit."
      },
      {
        label: 'Decrypt',
        badge: 'Step 2: Decrypt',
        title: 'Decrypt user credentials securely',
        desc: 'Identra handles complex secure cryptography out of the box. Once the user approves sharing their mDL, their digital wallet transmits an encrypted CBOR payload. Identra performs key exchanges, decrypts the record, and checks timestamps to guarantee validity.'
      },
      {
        label: 'Verify',
        badge: 'Step 3: Verify',
        title: 'Verify cryptographically and with state databases',
        desc: 'Run comprehensive state checks instantly. Validate that the digital signature belongs to an official state DMV issuer root certificate, and run direct DMV database inquiries to verify that the license status remains active and has not been revoked.'
      }
    ],
    setupControl: {
      title: "Allow Mobile Driver's Licenses",
      desc: 'Enable digital wallet verification handoff'
    },
    phoneMockup: {
      appName: 'Identra Verify',
      time: '09:41 AM',
      title: 'Upload a photo ID',
      desc: 'We require a verified government identity document.',
      driversLicense: "Driver's license",
      passport: 'Passport',
      mobileDriversLicense: "Mobile driver's license",
      wallet: 'Wallet',
      continue: 'Continue'
    },
    decrypt: {
      title: 'Simulated mDL Decryptor',
      desc: 'Run secure key handshake and verify integrity',
      decrypting: 'Decrypting...',
      decrypted: 'Payload Decrypted',
      run: 'Run Decryptor',
      handshake: 'ISO 18013-5 HANDSHAKE',
      terminal: 'SECURE TERMINAL',
      encryptedReceived: 'Encrypted CBOR binary stream received',
      encryptedSample: '0x8401A201656870323536032620A30101032720215820465243...',
      exchanging: 'Performing ECDH key agreement exchange...',
      success: 'Handshake Succeeded. Document Decrypted.',
      decryptedPayload: `{
  "docType": "org.iso.18013-5.2021.mdl",
  "issuerSignature": "sha256/ECDSA",
  "attributes": {
    "given_name": "Sarah",
    "family_name": "Jenkins",
    "birth_date": "1994-08-12",
    "issue_date": "2023-01-15",
    "expiry_date": "2028-08-12",
    "issuing_state": "California (CA)",
    "portrait_image_sha": "d0e1b5f7e4c..."
  }
}`,
      shaVerified: 'SHA-256 Verified',
      aes: 'AES-GCM-256'
    },
    verify: {
      title: 'Authoritative Verifier',
      desc: 'Query state root DMV repository',
      checking: 'Verifying DMV...',
      passed: 'Passed Check',
      run: 'Query DMV Record',
      reportTitle: 'Authoritative DMV Query Report',
      pending: 'PENDING',
      rows: [
        { label: 'Cryptographic Signature Verification', passed: 'VALID STATE KEY' },
        { label: 'Revocation Status Check', passed: 'ACTIVE / GOOD STANDING' },
        { label: 'Hardware-Backed Security Check', passed: 'PASS (FACEID OK)' }
      ],
      verdictTitle: 'DMV Registry Verdict: VERIFIED.',
      verdictDesc: 'This mobile license belongs to Sarah Jenkins and has been cryptographically validated by California DMV issuing authorities.'
    },
    keyFeatures: {
      label: 'Key features',
      title: 'Leverage emerging technology to increase security and reduce risk',
      desc: "Accepting digital driver's licenses bypasses typical optical OCR scan errors. Receive high fidelity data directly with native state signatures."
    },
    accordions: [
      {
        id: 'encryption',
        title: 'Get higher assurance with end-to-end encryption',
        content: "Identra's adherence to ISO 18013-5 guidelines provides absolute assurance that data is authentic, transmitted over a secure TLS 1.3 channel, and has not been altered or tampered with since issuance."
      },
      {
        id: 'detection',
        title: 'Lower friction with mDL auto-detection',
        content: 'Our SDK checks for device capability in real time. If Apple Wallet or Google Wallet support is detected, Identra immediately invites users to trigger their native device credential manager with a single tap.'
      },
      {
        id: 'accuracy',
        title: 'Reduce false positives and negatives',
        content: 'Say goodbye to blurry photos, glare, and bad angles. Because credentials are read directly from cryptographic wallet packets, you receive 100% accurate, parse-ready name and birthdate strings instantly.'
      }
    ],
    teamUseTitle: 'How teams can use mDL verification',
    teamUseCards: [
      {
        title: 'KYC compliance',
        desc: "Allow users to submit their mobile driver's license and use the decrypted data in your Know Your Customer (KYC) process to verify attributes seamlessly."
      },
      {
        title: 'Identity verification',
        desc: "Verify an individual's identity via the driver's license stored in their digital wallet. Increase confidence by requesting a live selfie and matching it against the portrait ID package."
      },
      {
        title: 'Effortlessly reverify users',
        desc: 'Allow users to reverify their identity before any high-value transaction by requesting an mDL handshake instead of forcing them to dig through physical wallets.'
      }
    ],
    learningTitle: 'Keep learning',
    viewAllResources: 'View all resources',
    resources: [
      {
        meta: 'Whitepaper - 15 mins read',
        title: "The state of Mobile Driver's Licenses (mDL) in 2026",
        desc: 'Understand DMV adoption across all 50 states, international ISO standardization, and how security leaders are preparing.'
      },
      {
        meta: 'Guide - 8 mins read',
        title: 'How to integrate the ISO 18013-5 mDL protocol',
        desc: "Step-by-step developer's tutorial for setting up elliptic-curve handshakes and resolving trust anchors with DMV roots."
      },
      {
        meta: 'Case study - 10 mins read',
        title: 'How modern banks achieve 98% conversion with mDLs',
        desc: 'Read how forward-thinking financial services reduced verification time down to 1.5 seconds while slashing fraud.'
      }
    ],
    exploreTitle: "Explore more of Identra's identity platform",
    exploreCards: [
      {
        title: 'Verify government IDs globally.',
        cta: 'View Government ID Verification'
      },
      {
        title: 'Verify users globally with database checks.',
        cta: 'View Database Checks'
      }
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: "What is a Mobile Driver's License (mDL)?",
        a: "A Mobile Driver's License (mDL) is a highly secure, cryptographically signed digital copy of a driver's license stored in a digital wallet, such as Apple Wallet or Google Wallet, on a mobile device. It follows the ISO 18013-5 international standard, ensuring safe data exchange with verification terminals and software."
      },
      {
        q: 'How does Identra verify an mDL?',
        a: 'When a user shares their mDL via the Identra SDK, the digital wallet securely transmits an encrypted payload containing issuer-signed attributes. Identra decrypts this payload, verifies the digital signature against DMV root certificates, and cross-checks status records in real time to ensure validity.'
      },
      {
        q: "Which states support Mobile Driver's Licenses?",
        a: 'Adoption is growing rapidly. Many states, including California, Colorado, Arizona, Georgia, Maryland, and Ohio, actively support official mDLs, with many more states currently in active pilot phases. Identra integrates seamlessly across major DMV root databases.'
      },
      {
        q: "Can users still upload a physical ID if they don't have an mDL?",
        a: "Yes. Identra's Dynamic Flow automatically falls back to physical Government ID verification if the user does not have an active mDL configured in their digital wallet, ensuring full user coverage."
      }
    ],
    cta: {
      title: 'Ready to get started?',
      desc: 'Get in touch or start exploring Identra today.',
      primary: 'Try the demo',
      secondary: 'Try it now ->'
    }
  },
  es: {
    backToHome: 'Volver al inicio',
    badge: 'Licencia de conducir móvil',
    heroTitle: 'Verifica usuarios al instante y de forma segura. Verifica licencias de conducir móviles (mDL) de proveedores líderes de billeteras digitales para reducir la fricción del usuario.',
    tryDemo: 'Probar la demo',
    pillars: [
      {
        title: 'Mayores tasas de finalización',
        desc: 'Maximiza las conversiones con un flujo fácil de usar que guía a los usuarios durante todo el traspaso a la billetera digital.'
      },
      {
        title: 'Menor probabilidad de fraude de identidad',
        desc: 'Los usuarios suelen completar una autenticación adicional basada en hardware, como Face ID, antes de enviar una mDL, lo que añade una capa extra de seguridad.'
      },
      {
        title: 'Mayor seguridad frente a envíos fraudulentos',
        desc: 'Valida las mDL contra los registros DMV de los estados participantes, reduciendo el riesgo de envíos fraudulentos e información biométrica alterada.'
      }
    ],
    simulatorLabel: 'Simulador interactivo',
    howItWorksTitle: 'Cómo funciona',
    steps: [
      {
        label: 'Configurar',
        badge: 'Paso 1: Configurar',
        title: 'Configura tu flujo de recopilación para aceptar mDL',
        desc: 'Define las mDL como documento de identidad aceptado en tu panel. Si se detecta una billetera digital compatible, como Apple Wallet o Google Wallet, o una mDL estatal en el dispositivo del usuario, Identra le pedirá permiso para enviarla de forma clara.'
      },
      {
        label: 'Descifrar',
        badge: 'Paso 2: Descifrar',
        title: 'Descifra credenciales de usuario de forma segura',
        desc: 'Identra gestiona criptografía segura compleja de forma integrada. Cuando el usuario aprueba compartir su mDL, la billetera digital transmite una carga CBOR cifrada. Identra realiza intercambios de claves, descifra el registro y comprueba las marcas de tiempo para garantizar su validez.'
      },
      {
        label: 'Verificar',
        badge: 'Paso 3: Verificar',
        title: 'Verifica criptográficamente y con bases de datos estatales',
        desc: 'Ejecuta comprobaciones estatales completas al instante. Valida que la firma digital pertenezca a un certificado raíz oficial del DMV estatal y consulta directamente las bases de datos del DMV para confirmar que la licencia sigue activa y no ha sido revocada.'
      }
    ],
    setupControl: {
      title: 'Permitir licencias de conducir móviles',
      desc: 'Activar el traspaso de verificación con billetera digital'
    },
    phoneMockup: {
      appName: 'Identra Verify',
      time: '09:41 AM',
      title: 'Sube una identificación con foto',
      desc: 'Necesitamos un documento de identidad gubernamental verificado.',
      driversLicense: 'Licencia de conducir',
      passport: 'Pasaporte',
      mobileDriversLicense: 'Licencia de conducir móvil',
      wallet: 'Wallet',
      continue: 'Continuar'
    },
    decrypt: {
      title: 'Descifrador mDL simulado',
      desc: 'Ejecuta un intercambio seguro de claves y verifica la integridad',
      decrypting: 'Descifrando...',
      decrypted: 'Carga descifrada',
      run: 'Ejecutar descifrador',
      handshake: 'INTERCAMBIO ISO 18013-5',
      terminal: 'TERMINAL SEGURO',
      encryptedReceived: 'Flujo binario CBOR cifrado recibido',
      encryptedSample: '0x8401A201656870323536032620A30101032720215820465243...',
      exchanging: 'Realizando intercambio de claves ECDH...',
      success: 'Intercambio completado. Documento descifrado.',
      decryptedPayload: `{
  "docType": "org.iso.18013-5.2021.mdl",
  "issuerSignature": "sha256/ECDSA",
  "attributes": {
    "given_name": "Sarah",
    "family_name": "Jenkins",
    "birth_date": "1994-08-12",
    "issue_date": "2023-01-15",
    "expiry_date": "2028-08-12",
    "issuing_state": "California (CA)",
    "portrait_image_sha": "d0e1b5f7e4c..."
  }
}`,
      shaVerified: 'SHA-256 verificado',
      aes: 'AES-GCM-256'
    },
    verify: {
      title: 'Verificador autorizado',
      desc: 'Consultar el repositorio raíz DMV estatal',
      checking: 'Verificando DMV...',
      passed: 'Comprobación aprobada',
      run: 'Consultar registro DMV',
      reportTitle: 'Informe de consulta DMV autorizado',
      pending: 'PENDIENTE',
      rows: [
        { label: 'Verificación de firma criptográfica', passed: 'CLAVE ESTATAL VÁLIDA' },
        { label: 'Comprobación de estado de revocación', passed: 'ACTIVA / EN REGLA' },
        { label: 'Comprobación de seguridad respaldada por hardware', passed: 'APROBADO (FACEID OK)' }
      ],
      verdictTitle: 'Veredicto del registro DMV: VERIFICADO.',
      verdictDesc: 'Esta licencia móvil pertenece a Sarah Jenkins y ha sido validada criptográficamente por las autoridades emisoras del DMV de California.'
    },
    keyFeatures: {
      label: 'Funciones clave',
      title: 'Aprovecha tecnología emergente para aumentar la seguridad y reducir el riesgo',
      desc: 'Aceptar licencias de conducir digitales evita errores habituales del escaneo óptico OCR. Recibe datos de alta fidelidad directamente con firmas estatales nativas.'
    },
    accordions: [
      {
        id: 'encryption',
        title: 'Obtén mayor garantía con cifrado de extremo a extremo',
        content: 'La adhesión de Identra a las directrices ISO 18013-5 ofrece seguridad de que los datos son auténticos, se transmiten por un canal TLS 1.3 seguro y no se han alterado desde su emisión.'
      },
      {
        id: 'detection',
        title: 'Reduce la fricción con detección automática de mDL',
        content: 'Nuestro SDK comprueba la capacidad del dispositivo en tiempo real. Si detecta compatibilidad con Apple Wallet o Google Wallet, Identra invita al usuario a activar su gestor nativo de credenciales con un solo toque.'
      },
      {
        id: 'accuracy',
        title: 'Reduce falsos positivos y negativos',
        content: 'Olvídate de fotos borrosas, reflejos y malos ángulos. Como las credenciales se leen directamente desde paquetes criptográficos de la billetera, recibes al instante nombres y fechas de nacimiento 100% precisos y listos para procesar.'
      }
    ],
    teamUseTitle: 'Cómo pueden usar los equipos la verificación mDL',
    teamUseCards: [
      {
        title: 'Cumplimiento KYC',
        desc: 'Permite que los usuarios envíen su licencia de conducir móvil y usa los datos descifrados en tu proceso Know Your Customer (KYC) para verificar atributos sin fricción.'
      },
      {
        title: 'Verificación de identidad',
        desc: 'Verifica la identidad de una identra mediante la licencia de conducir almacenada en su billetera digital. Aumenta la confianza solicitando una selfie en vivo y comparándola con el paquete de retrato del documento.'
      },
      {
        title: 'Reverificación sencilla de usuarios',
        desc: 'Permite que los usuarios vuelvan a verificar su identidad antes de una transacción de alto valor solicitando un intercambio mDL, sin obligarlos a buscar una billetera física.'
      }
    ],
    learningTitle: 'Sigue aprendiendo',
    viewAllResources: 'Ver todos los recursos',
    resources: [
      {
        meta: 'Documento técnico - lectura de 15 min',
        title: 'El estado de las licencias de conducir móviles (mDL) en 2026',
        desc: 'Comprende la adopción del DMV en los 50 estados, la estandarización internacional ISO y cómo se preparan los equipos de seguridad.'
      },
      {
        meta: 'Guía - lectura de 8 min',
        title: 'Cómo integrar el protocolo mDL ISO 18013-5',
        desc: 'Tutorial paso a paso para desarrolladores sobre configuración de intercambios de curva elíptica y resolución de anclajes de confianza con raíces DMV.'
      },
      {
        meta: 'Caso de estudio - lectura de 10 min',
        title: 'Cómo los bancos modernos logran 98% de conversión con mDL',
        desc: 'Lee cómo servicios financieros innovadores redujeron el tiempo de verificación a 1,5 segundos y disminuyeron el fraude.'
      }
    ],
    exploreTitle: 'Explora más de la plataforma de identidad de Identra',
    exploreCards: [
      {
        title: 'Verifica identificaciones gubernamentales globalmente.',
        cta: 'Ver verificación de identificación gubernamental'
      },
      {
        title: 'Verifica usuarios globalmente con comprobaciones de bases de datos.',
        cta: 'Ver comprobaciones de bases de datos'
      }
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Qué es una licencia de conducir móvil (mDL)?',
        a: 'Una licencia de conducir móvil (mDL) es una copia digital muy segura y firmada criptográficamente de una licencia de conducir almacenada en una billetera digital, como Apple Wallet o Google Wallet, en un dispositivo móvil. Sigue el estándar internacional ISO 18013-5 para intercambiar datos de forma segura con terminales y software de verificación.'
      },
      {
        q: '¿Cómo verifica Identra una mDL?',
        a: 'Cuando un usuario comparte su mDL mediante el SDK de Identra, la billetera digital transmite de forma segura una carga cifrada con atributos firmados por el emisor. Identra descifra esa carga, verifica la firma digital contra certificados raíz del DMV y comprueba registros de estado en tiempo real.'
      },
      {
        q: '¿Qué estados admiten licencias de conducir móviles?',
        a: 'La adopción crece rápidamente. Varios estados, incluidos California, Colorado, Arizona, Georgia, Maryland y Ohio, ya admiten mDL oficiales, y muchos otros están en fases piloto activas. Identra se integra con las principales bases raíz DMV.'
      },
      {
        q: '¿Los usuarios todavía pueden subir una identificación física si no tienen mDL?',
        a: 'Sí. Dynamic Flow de Identra vuelve automáticamente a la verificación física de identificación gubernamental si el usuario no tiene una mDL activa configurada en su billetera digital, lo que mantiene cobertura completa de usuarios.'
      }
    ],
    cta: {
      title: '¿Listo para empezar?',
      desc: 'Ponte en contacto o empieza a explorar Identra hoy.',
      primary: 'Probar la demo',
      secondary: 'Pruébalo ahora ->'
    }
  },
  ja: {
    backToHome: 'ホームに戻る',
    badge: 'モバイル運転免許証',
    heroTitle: 'ユーザーを即時かつ安全に確認。主要なデジタルウォレット事業者のモバイル運転免許証 (mDL) を検証し、ユーザーの手間を減らします。',
    tryDemo: 'デモを試す',
    pillars: [
      {
        title: '完了率の向上',
        desc: 'ウォレット連携の開始から完了までをわかりやすく案内するフローで、コンバージョンを最大化します。'
      },
      {
        title: 'なりすましリスクの低減',
        desc: 'ユーザーは通常、mDL を提出する前に Face ID などのハードウェア認証を追加で行うため、セキュリティ層が増えます。'
      },
      {
        title: '不正提出に対する高い保証',
        desc: '参加州の DMV 記録と mDL を照合し、不正な提出や改ざんされた生体情報のリスクを減らします。'
      }
    ],
    simulatorLabel: 'インタラクティブシミュレーター',
    howItWorksTitle: '仕組み',
    steps: [
      {
        label: '設定',
        badge: 'ステップ 1: 設定',
        title: 'mDL を受け付ける収集フローを設定',
        desc: 'ダッシュボードで mDL を受け付け可能な本人確認書類として設定します。Apple Wallet や Google Wallet などの対応デジタルウォレット、または州対応の mDL がユーザー端末で検出されると、Identra が送信許可をわかりやすく求めます。'
      },
      {
        label: '復号',
        badge: 'ステップ 2: 復号',
        title: 'ユーザー資格情報を安全に復号',
        desc: 'Identra は複雑な安全暗号処理を標準で扱います。ユーザーが mDL の共有を承認すると、デジタルウォレットは暗号化された CBOR ペイロードを送信します。Identra は鍵交換、レコード復号、タイムスタンプ確認を行い、有効性を保証します。'
      },
      {
        label: '検証',
        badge: 'ステップ 3: 検証',
        title: '暗号学的検証と州データベース確認を実行',
        desc: '包括的な州チェックを即時に実行します。デジタル署名が公式な州 DMV 発行者ルート証明書に属することを確認し、DMV データベースへ直接照会して免許が有効で失効していないことを検証します。'
      }
    ],
    setupControl: {
      title: 'モバイル運転免許証を許可',
      desc: 'デジタルウォレット検証の連携を有効化'
    },
    phoneMockup: {
      appName: 'Identra Verify',
      time: '09:41 AM',
      title: '写真付き ID をアップロード',
      desc: '確認済みの公的本人確認書類が必要です。',
      driversLicense: '運転免許証',
      passport: 'パスポート',
      mobileDriversLicense: 'モバイル運転免許証',
      wallet: 'Wallet',
      continue: '続行'
    },
    decrypt: {
      title: 'mDL 復号シミュレーター',
      desc: '安全な鍵ハンドシェイクを実行し、整合性を確認',
      decrypting: '復号中...',
      decrypted: 'ペイロードを復号しました',
      run: '復号を実行',
      handshake: 'ISO 18013-5 ハンドシェイク',
      terminal: '安全な端末',
      encryptedReceived: '暗号化された CBOR バイナリストリームを受信',
      encryptedSample: '0x8401A201656870323536032620A30101032720215820465243...',
      exchanging: 'ECDH 鍵合意交換を実行中...',
      success: 'ハンドシェイク成功。書類を復号しました。',
      decryptedPayload: `{
  "docType": "org.iso.18013-5.2021.mdl",
  "issuerSignature": "sha256/ECDSA",
  "attributes": {
    "given_name": "Sarah",
    "family_name": "Jenkins",
    "birth_date": "1994-08-12",
    "issue_date": "2023-01-15",
    "expiry_date": "2028-08-12",
    "issuing_state": "California (CA)",
    "portrait_image_sha": "d0e1b5f7e4c..."
  }
}`,
      shaVerified: 'SHA-256 検証済み',
      aes: 'AES-GCM-256'
    },
    verify: {
      title: '認可済み検証機能',
      desc: '州 DMV ルートリポジトリを照会',
      checking: 'DMV を検証中...',
      passed: 'チェック合格',
      run: 'DMV 記録を照会',
      reportTitle: '認可済み DMV 照会レポート',
      pending: '保留中',
      rows: [
        { label: '暗号署名の検証', passed: '有効な州キー' },
        { label: '失効状態チェック', passed: '有効 / 良好な状態' },
        { label: 'ハードウェア保護チェック', passed: '合格 (FACEID OK)' }
      ],
      verdictTitle: 'DMV レジストリ判定: 検証済み。',
      verdictDesc: 'このモバイル免許証は Sarah Jenkins のものであり、California DMV 発行機関によって暗号学的に検証されています。'
    },
    keyFeatures: {
      label: '主な機能',
      title: '新しい技術を活用してセキュリティを高め、リスクを低減',
      desc: 'デジタル運転免許証を受け付けることで、光学 OCR スキャンで起こりがちなエラーを回避できます。州のネイティブ署名付き高精度データを直接受け取れます。'
    },
    accordions: [
      {
        id: 'encryption',
        title: 'エンドツーエンド暗号化でより高い保証を獲得',
        content: 'Identra は ISO 18013-5 ガイドラインに準拠しており、データが本物であり、安全な TLS 1.3 チャネルで送信され、発行後に変更や改ざんがないことを確認できます。'
      },
      {
        id: 'detection',
        title: 'mDL 自動検出で摩擦を低減',
        content: 'SDK が端末の対応状況をリアルタイムで確認します。Apple Wallet または Google Wallet の対応が検出されると、Identra はユーザーにネイティブの資格情報マネージャーをワンタップで起動するよう促します。'
      },
      {
        id: 'accuracy',
        title: '誤検知と見逃しを低減',
        content: 'ぼやけた写真、反射、悪い角度に悩まされません。資格情報は暗号化ウォレットパケットから直接読み取られるため、氏名と生年月日の文字列を 100% 正確で処理しやすい形式で即時に受け取れます。'
      }
    ],
    teamUseTitle: 'チームでの mDL 検証の活用方法',
    teamUseCards: [
      {
        title: 'KYC コンプライアンス',
        desc: 'ユーザーがモバイル運転免許証を提出できるようにし、復号されたデータを Know Your Customer (KYC) プロセスで使って属性をスムーズに確認します。'
      },
      {
        title: '本人確認',
        desc: 'デジタルウォレットに保存された運転免許証で個人の身元を確認します。ライブセルフィーを要求し、ID パッケージ内の顔写真と照合して信頼性を高めます。'
      },
      {
        title: 'ユーザー再確認を簡単に',
        desc: '高額取引の前に、物理ウォレットを探させる代わりに mDL ハンドシェイクを要求して、ユーザーの本人性を再確認できます。'
      }
    ],
    learningTitle: 'さらに学ぶ',
    viewAllResources: 'すべてのリソースを見る',
    resources: [
      {
        meta: 'ホワイトペーパー - 15 分で読めます',
        title: '2026 年のモバイル運転免許証 (mDL) の状況',
        desc: '全 50 州における DMV 採用状況、国際 ISO 標準化、セキュリティリーダーの準備状況を理解できます。'
      },
      {
        meta: 'ガイド - 8 分で読めます',
        title: 'ISO 18013-5 mDL プロトコルの統合方法',
        desc: '楕円曲線ハンドシェイクの設定と DMV ルートによる信頼アンカー解決を行う開発者向け手順ガイドです。'
      },
      {
        meta: '事例 - 10 分で読めます',
        title: '現代的な銀行が mDL で 98% のコンバージョンを達成する方法',
        desc: '先進的な金融サービスが検証時間を 1.5 秒まで短縮し、不正を削減した方法を紹介します。'
      }
    ],
    exploreTitle: 'Identra の本人確認プラットフォームをさらに見る',
    exploreCards: [
      {
        title: '世界中の公的 ID を検証。',
        cta: '公的 ID 検証を見る'
      },
      {
        title: 'データベースチェックで世界中のユーザーを検証。',
        cta: 'データベースチェックを見る'
      }
    ],
    faqTitle: 'よくある質問',
    faqs: [
      {
        q: 'モバイル運転免許証 (mDL) とは何ですか？',
        a: 'モバイル運転免許証 (mDL) は、Apple Wallet や Google Wallet などのデジタルウォレットに保存される、暗号署名された非常に安全な運転免許証のデジタルコピーです。国際標準 ISO 18013-5 に準拠し、検証端末やソフトウェアとの安全なデータ交換を可能にします。'
      },
      {
        q: 'Identra は mDL をどのように検証しますか？',
        a: 'ユーザーが Identra SDK 経由で mDL を共有すると、デジタルウォレットは発行者署名付き属性を含む暗号化ペイロードを安全に送信します。Identra はこのペイロードを復号し、DMV ルート証明書に対してデジタル署名を検証し、状態記録をリアルタイムで照合します。'
      },
      {
        q: 'どの州がモバイル運転免許証に対応していますか？',
        a: '採用は急速に広がっています。California、Colorado、Arizona、Georgia、Maryland、Ohio など複数の州が公式 mDL に対応しており、さらに多くの州がパイロット段階にあります。Identra は主要な DMV ルートデータベースと連携します。'
      },
      {
        q: 'mDL がないユーザーも物理 ID をアップロードできますか？',
        a: 'はい。ユーザーのデジタルウォレットに有効な mDL が設定されていない場合、Identra の Dynamic Flow は物理的な公的 ID 検証へ自動的にフォールバックし、すべてのユーザーをカバーします。'
      }
    ],
    cta: {
      title: '始める準備はできましたか？',
      desc: 'Identra について問い合わせるか、今すぐ探索を始めましょう。',
      primary: 'デモを試す',
      secondary: '今すぐ試す ->'
    }
  },
  de: {
    backToHome: 'Zur Startseite',
    badge: 'Mobiler Führerschein',
    heroTitle: 'Verifizieren Sie Nutzer sofort und sicher. Prüfen Sie mobile Führerscheine (mDLs) führender Anbieter digitaler Wallets und reduzieren Sie Reibung für Nutzer.',
    tryDemo: 'Demo testen',
    pillars: [
      {
        title: 'Höhere Abschlussraten',
        desc: 'Maximieren Sie Konversionen mit einem nutzerfreundlichen Ablauf, der Nutzer vom Start bis zum Abschluss durch die Wallet-Übergabe führt.'
      },
      {
        title: 'Geringere Wahrscheinlichkeit von Identitätsbetrug',
        desc: 'Nutzer führen vor dem Einreichen einer mDL in der Regel eine zusätzliche hardwaregestützte Authentifizierung wie Face ID durch. Das schafft eine weitere Sicherheitsebene.'
      },
      {
        title: 'Höhere Sicherheit gegen betrügerische Einreichungen',
        desc: 'Validieren Sie mDLs gegen DMV-Datensätze teilnehmender Bundesstaaten und reduzieren Sie so das Risiko betrügerischer Einreichungen und manipulierter biometrischer Informationen.'
      }
    ],
    simulatorLabel: 'Interaktiver Simulator',
    howItWorksTitle: 'So funktioniert es',
    steps: [
      {
        label: 'Konfigurieren',
        badge: 'Schritt 1: Einrichtung',
        title: 'Konfigurieren Sie Ihren Erfassungsablauf für mDLs',
        desc: 'Legen Sie mDLs in Ihrem Dashboard als zulässiges Identitätsdokument fest. Wenn auf dem Gerät des Nutzers eine kompatible digitale Wallet wie Apple Wallet oder Google Wallet oder eine staatlich unterstützte mDL erkannt wird, bittet Identra den Nutzer klar um die Erlaubnis zur Übermittlung.'
      },
      {
        label: 'Entschlüsseln',
        badge: 'Schritt 2: Entschlüsseln',
        title: 'Entschlüsseln Sie Nutzer-Credentials sicher',
        desc: 'Identra übernimmt komplexe sichere Kryptografie standardmäßig. Sobald der Nutzer dem Teilen seiner mDL zustimmt, übermittelt die digitale Wallet eine verschlüsselte CBOR-Nutzlast. Identra führt Schlüsselaustausche durch, entschlüsselt den Datensatz und prüft Zeitstempel, um die Gültigkeit sicherzustellen.'
      },
      {
        label: 'Verifizieren',
        badge: 'Schritt 3: Verifizieren',
        title: 'Kryptografisch und mit staatlichen Datenbanken verifizieren',
        desc: 'Führen Sie umfassende staatliche Prüfungen sofort aus. Validieren Sie, dass die digitale Signatur zu einem offiziellen DMV-Root-Zertifikat des ausstellenden Bundesstaats gehört, und stellen Sie per direkter DMV-Datenbankabfrage sicher, dass der Führerschein aktiv und nicht widerrufen ist.'
      }
    ],
    setupControl: {
      title: 'Mobile Führerscheine erlauben',
      desc: 'Übergabe zur digitalen Wallet-Verifizierung aktivieren'
    },
    phoneMockup: {
      appName: 'Identra Verify',
      time: '09:41 AM',
      title: 'Lichtbildausweis hochladen',
      desc: 'Wir benötigen ein verifiziertes amtliches Identitätsdokument.',
      driversLicense: 'Führerschein',
      passport: 'Reisepass',
      mobileDriversLicense: 'Mobiler Führerschein',
      wallet: 'Wallet',
      continue: 'Weiter'
    },
    decrypt: {
      title: 'Simulierter mDL-Entschlüsseler',
      desc: 'Sicheren Schlüssel-Handshake ausführen und Integrität prüfen',
      decrypting: 'Entschlüsseln...',
      decrypted: 'Nutzlast entschlüsselt',
      run: 'Entschlüsseler starten',
      handshake: 'ISO 18013-5 HANDSHAKE',
      terminal: 'SICHERES TERMINAL',
      encryptedReceived: 'Verschlüsselter CBOR-Binärstrom empfangen',
      encryptedSample: '0x8401A201656870323536032620A30101032720215820465243...',
      exchanging: 'ECDH-Schlüsselvereinbarung wird ausgeführt...',
      success: 'Handshake erfolgreich. Dokument entschlüsselt.',
      decryptedPayload: `{
  "docType": "org.iso.18013-5.2021.mdl",
  "issuerSignature": "sha256/ECDSA",
  "attributes": {
    "given_name": "Sarah",
    "family_name": "Jenkins",
    "birth_date": "1994-08-12",
    "issue_date": "2023-01-15",
    "expiry_date": "2028-08-12",
    "issuing_state": "California (CA)",
    "portrait_image_sha": "d0e1b5f7e4c..."
  }
}`,
      shaVerified: 'SHA-256 verifiziert',
      aes: 'AES-GCM-256'
    },
    verify: {
      title: 'Autorisierter Verifizierer',
      desc: 'DMV-Root-Repository des Bundesstaats abfragen',
      checking: 'DMV wird verifiziert...',
      passed: 'Prüfung bestanden',
      run: 'DMV-Datensatz abfragen',
      reportTitle: 'Autorisierter DMV-Abfragebericht',
      pending: 'AUSSTEHEND',
      rows: [
        { label: 'Kryptografische Signaturprüfung', passed: 'GÜLTIGER STAATLICHER SCHLÜSSEL' },
        { label: 'Widerrufsstatusprüfung', passed: 'AKTIV / IN ORDNUNG' },
        { label: 'Hardwaregestützte Sicherheitsprüfung', passed: 'BESTANDEN (FACEID OK)' }
      ],
      verdictTitle: 'DMV-Registerurteil: VERIFIZIERT.',
      verdictDesc: 'Dieser mobile Führerschein gehört Sarah Jenkins und wurde von den ausstellenden Behörden des California DMV kryptografisch validiert.'
    },
    keyFeatures: {
      label: 'Kernfunktionen',
      title: 'Nutzen Sie neue Technologie, um Sicherheit zu erhöhen und Risiken zu reduzieren',
      desc: 'Digitale Führerscheine umgehen typische Fehler optischer OCR-Scans. Sie erhalten hochpräzise Daten direkt mit nativen staatlichen Signaturen.'
    },
    accordions: [
      {
        id: 'encryption',
        title: 'Mehr Sicherheit durch Ende-zu-Ende-Verschlüsselung',
        content: 'Die Einhaltung der ISO 18013-5-Richtlinien durch Identra stellt sicher, dass Daten authentisch sind, über einen sicheren TLS 1.3-Kanal übertragen werden und seit der Ausstellung nicht verändert oder manipuliert wurden.'
      },
      {
        id: 'detection',
        title: 'Weniger Reibung durch automatische mDL-Erkennung',
        content: 'Unser SDK prüft die Gerätefähigkeit in Echtzeit. Wenn Unterstützung für Apple Wallet oder Google Wallet erkannt wird, lädt Identra Nutzer sofort ein, den nativen Credential-Manager ihres Geräts mit einem Tippen zu starten.'
      },
      {
        id: 'accuracy',
        title: 'Falsch positive und falsch negative Ergebnisse reduzieren',
        content: 'Unscharfe Fotos, Blendung und schlechte Winkel gehören der Vergangenheit an. Da Credentials direkt aus kryptografischen Wallet-Paketen gelesen werden, erhalten Sie sofort 100% genaue, verarbeitungsbereite Namen und Geburtsdaten.'
      }
    ],
    teamUseTitle: 'Wie Teams mDL-Verifizierung nutzen können',
    teamUseCards: [
      {
        title: 'KYC-Compliance',
        desc: 'Ermöglichen Sie Nutzern, ihren mobilen Führerschein einzureichen, und verwenden Sie die entschlüsselten Daten in Ihrem Know Your Customer (KYC)-Prozess, um Attribute reibungslos zu prüfen.'
      },
      {
        title: 'Identitätsverifizierung',
        desc: 'Verifizieren Sie die Identität einer Person über den in der digitalen Wallet gespeicherten Führerschein. Erhöhen Sie die Sicherheit, indem Sie ein Live-Selfie anfordern und es mit dem Porträt im ID-Paket abgleichen.'
      },
      {
        title: 'Nutzer mühelos erneut verifizieren',
        desc: 'Ermöglichen Sie Nutzern, ihre Identität vor jeder hochwertigen Transaktion erneut zu bestätigen, indem Sie einen mDL-Handshake anfordern, statt sie nach einer physischen Wallet suchen zu lassen.'
      }
    ],
    learningTitle: 'Weiterlernen',
    viewAllResources: 'Alle Ressourcen ansehen',
    resources: [
      {
        meta: 'Whitepaper - 15 Min. Lesezeit',
        title: 'Der Stand mobiler Führerscheine (mDL) im Jahr 2026',
        desc: 'Verstehen Sie die DMV-Einführung in allen 50 Bundesstaaten, die internationale ISO-Standardisierung und wie Sicherheitsverantwortliche sich vorbereiten.'
      },
      {
        meta: 'Leitfaden - 8 Min. Lesezeit',
        title: 'So integrieren Sie das ISO 18013-5 mDL-Protokoll',
        desc: 'Eine Schritt-für-Schritt-Anleitung für Entwickler zur Einrichtung elliptischer Kurven-Handshakes und zur Auflösung von Trust Anchors mit DMV-Roots.'
      },
      {
        meta: 'Fallstudie - 10 Min. Lesezeit',
        title: 'Wie moderne Banken mit mDLs 98% Konversion erreichen',
        desc: 'Lesen Sie, wie zukunftsorientierte Finanzdienste die Verifizierungszeit auf 1,5 Sekunden senkten und Betrug reduzierten.'
      }
    ],
    exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
    exploreCards: [
      {
        title: 'Amtliche IDs weltweit verifizieren.',
        cta: 'Government ID Verification ansehen'
      },
      {
        title: 'Nutzer weltweit mit Datenbankprüfungen verifizieren.',
        cta: 'Database Checks ansehen'
      }
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Was ist ein mobiler Führerschein (mDL)?',
        a: 'Ein mobiler Führerschein (mDL) ist eine sehr sichere, kryptografisch signierte digitale Kopie eines Führerscheins, die in einer digitalen Wallet wie Apple Wallet oder Google Wallet auf einem Mobilgerät gespeichert ist. Er folgt dem internationalen Standard ISO 18013-5 und ermöglicht sicheren Datenaustausch mit Verifizierungsterminals und Software.'
      },
      {
        q: 'Wie verifiziert Identra eine mDL?',
        a: 'Wenn ein Nutzer seine mDL über das Identra SDK teilt, überträgt die digitale Wallet sicher eine verschlüsselte Nutzlast mit vom Aussteller signierten Attributen. Identra entschlüsselt diese Nutzlast, prüft die digitale Signatur gegen DMV-Root-Zertifikate und gleicht Statusdatensätze in Echtzeit ab.'
      },
      {
        q: 'Welche Bundesstaaten unterstützen mobile Führerscheine?',
        a: 'Die Einführung wächst schnell. Mehrere Bundesstaaten, darunter California, Colorado, Arizona, Georgia, Maryland und Ohio, unterstützen offizielle mDLs, viele weitere befinden sich in aktiven Pilotphasen. Identra integriert sich mit wichtigen DMV-Root-Datenbanken.'
      },
      {
        q: 'Können Nutzer weiterhin einen physischen Ausweis hochladen, wenn sie keine mDL haben?',
        a: 'Ja. Identras Dynamic Flow fällt automatisch auf die physische Government ID-Verifizierung zurück, wenn der Nutzer keine aktive mDL in seiner digitalen Wallet konfiguriert hat. So bleibt die Nutzerabdeckung vollständig.'
      }
    ],
    cta: {
      title: 'Bereit loszulegen?',
      desc: 'Kontaktieren Sie uns oder erkunden Sie Identra noch heute.',
      primary: 'Demo testen',
      secondary: 'Jetzt ausprobieren ->'
    }
  },
  vi: {
    backToHome: 'Quay lại trang chủ',
    badge: 'Giấy phép lái xe di động',
    heroTitle: 'Xác minh người dùng tức thì và an toàn. Xác minh giấy phép lái xe di động (mDL) từ các nhà cung cấp ví số hàng đầu để giảm ma sát cho người dùng.',
    tryDemo: 'Trải nghiệm demo',
    pillars: [
      {
        title: 'Tăng tỷ lệ hoàn tất',
        desc: 'Tối đa hóa chuyển đổi bằng luồng thân thiện, hướng dẫn người dùng trong toàn bộ quá trình chuyển tiếp sang ví số.'
      },
      {
        title: 'Giảm nguy cơ gian lận danh tính',
        desc: 'Người dùng thường thực hiện thêm bước xác thực dựa trên phần cứng, như Face ID, trước khi gửi mDL, nhờ đó có thêm một lớp bảo mật.'
      },
      {
        title: 'Tăng độ tin cậy trước hồ sơ gian lận',
        desc: 'Đối chiếu mDL với hồ sơ DMV của các bang tham gia để giảm rủi ro hồ sơ giả mạo và thông tin sinh trắc học bị chỉnh sửa.'
      }
    ],
    simulatorLabel: 'Trình mô phỏng tương tác',
    howItWorksTitle: 'Cách hoạt động',
    steps: [
      {
        label: 'Cấu hình',
        badge: 'Bước 1: Thiết lập',
        title: 'Cấu hình luồng thu thập để chấp nhận mDL',
        desc: 'Đặt mDL là giấy tờ định danh được chấp nhận trong bảng điều khiển. Nếu thiết bị của người dùng có ví số tương thích như Apple Wallet hoặc Google Wallet, hoặc mDL được bang hỗ trợ, Identra sẽ yêu cầu người dùng cho phép gửi một cách rõ ràng.'
      },
      {
        label: 'Giải mã',
        badge: 'Bước 2: Giải mã',
        title: 'Giải mã thông tin xác thực của người dùng một cách an toàn',
        desc: 'Identra xử lý sẵn các thao tác mật mã bảo mật phức tạp. Khi người dùng đồng ý chia sẻ mDL, ví số sẽ truyền một payload CBOR đã mã hóa. Identra thực hiện trao đổi khóa, giải mã bản ghi và kiểm tra dấu thời gian để bảo đảm tính hợp lệ.'
      },
      {
        label: 'Xác minh',
        badge: 'Bước 3: Xác minh',
        title: 'Xác minh bằng mật mã và cơ sở dữ liệu của bang',
        desc: 'Chạy ngay các bước kiểm tra toàn diện cấp bang. Xác nhận chữ ký số thuộc về chứng chỉ gốc của cơ quan DMV chính thức, đồng thời truy vấn trực tiếp cơ sở dữ liệu DMV để bảo đảm giấy phép vẫn còn hiệu lực và chưa bị thu hồi.'
      }
    ],
    setupControl: {
      title: 'Cho phép giấy phép lái xe di động',
      desc: 'Bật chuyển tiếp xác minh qua ví số'
    },
    phoneMockup: {
      appName: 'Identra Verify',
      time: '09:41 AM',
      title: 'Tải lên giấy tờ tùy thân có ảnh',
      desc: 'Chúng tôi cần một giấy tờ định danh do chính phủ cấp đã được xác minh.',
      driversLicense: 'Giấy phép lái xe',
      passport: 'Hộ chiếu',
      mobileDriversLicense: 'Giấy phép lái xe di động',
      wallet: 'Ví số',
      continue: 'Tiếp tục'
    },
    decrypt: {
      title: 'Trình giải mã mDL mô phỏng',
      desc: 'Chạy bắt tay khóa an toàn và xác minh tính toàn vẹn',
      decrypting: 'Đang giải mã...',
      decrypted: 'Đã giải mã payload',
      run: 'Chạy giải mã',
      handshake: 'BẮT TAY ISO 18013-5',
      terminal: 'THIẾT BỊ ĐẦU CUỐI AN TOÀN',
      encryptedReceived: 'Đã nhận luồng nhị phân CBOR được mã hóa',
      encryptedSample: '0x8401A201656870323536032620A30101032720215820465243...',
      exchanging: 'Đang thực hiện trao đổi thỏa thuận khóa ECDH...',
      success: 'Bắt tay thành công. Tài liệu đã được giải mã.',
      decryptedPayload: `{
  "docType": "org.iso.18013-5.2021.mdl",
  "issuerSignature": "sha256/ECDSA",
  "attributes": {
    "given_name": "Sarah",
    "family_name": "Jenkins",
    "birth_date": "1994-08-12",
    "issue_date": "2023-01-15",
    "expiry_date": "2028-08-12",
    "issuing_state": "California (CA)",
    "portrait_image_sha": "d0e1b5f7e4c..."
  }
}`,
      shaVerified: 'Đã xác minh SHA-256',
      aes: 'AES-GCM-256'
    },
    verify: {
      title: 'Bộ xác minh có thẩm quyền',
      desc: 'Truy vấn kho chứng chỉ gốc DMV của bang',
      checking: 'Đang xác minh DMV...',
      passed: 'Kiểm tra đạt',
      run: 'Truy vấn hồ sơ DMV',
      reportTitle: 'Báo cáo truy vấn DMV có thẩm quyền',
      pending: 'ĐANG CHỜ',
      rows: [
        { label: 'Xác minh chữ ký mật mã', passed: 'KHÓA CỦA BANG HỢP LỆ' },
        { label: 'Kiểm tra trạng thái thu hồi', passed: 'CÒN HIỆU LỰC / HỢP LỆ' },
        { label: 'Kiểm tra bảo mật dựa trên phần cứng', passed: 'ĐẠT (FACEID OK)' }
      ],
      verdictTitle: 'Kết luận từ sổ đăng ký DMV: ĐÃ XÁC MINH.',
      verdictDesc: 'Giấy phép di động này thuộc về Sarah Jenkins và đã được cơ quan cấp phép California DMV xác thực bằng mật mã.'
    },
    keyFeatures: {
      label: 'Tính năng chính',
      title: 'Tận dụng công nghệ mới để tăng bảo mật và giảm rủi ro',
      desc: 'Chấp nhận giấy phép lái xe số giúp tránh các lỗi quét OCR quang học thường gặp. Nhận dữ liệu có độ tin cậy cao trực tiếp từ chữ ký gốc của bang.'
    },
    accordions: [
      {
        id: 'encryption',
        title: 'Tăng độ bảo đảm với mã hóa đầu cuối',
        content: 'Việc Identra tuân thủ hướng dẫn ISO 18013-5 giúp bảo đảm dữ liệu là xác thực, được truyền qua kênh TLS 1.3 an toàn và không bị thay đổi hay can thiệp kể từ khi phát hành.'
      },
      {
        id: 'detection',
        title: 'Giảm ma sát nhờ tự động phát hiện mDL',
        content: 'SDK của chúng tôi kiểm tra khả năng của thiết bị theo thời gian thực. Nếu phát hiện hỗ trợ Apple Wallet hoặc Google Wallet, Identra sẽ mời người dùng kích hoạt trình quản lý thông tin xác thực gốc trên thiết bị chỉ bằng một lần chạm.'
      },
      {
        id: 'accuracy',
        title: 'Giảm kết quả dương tính giả và âm tính giả',
        content: 'Không còn ảnh mờ, lóa sáng hay góc chụp kém. Vì thông tin xác thực được đọc trực tiếp từ gói ví số đã ký bằng mật mã, bạn nhận được họ tên và ngày sinh chính xác 100%, sẵn sàng để xử lý ngay.'
      }
    ],
    teamUseTitle: 'Các đội ngũ có thể dùng xác minh mDL như thế nào',
    teamUseCards: [
      {
        title: 'Tuân thủ KYC',
        desc: 'Cho phép người dùng gửi giấy phép lái xe di động và dùng dữ liệu đã giải mã trong quy trình Know Your Customer (KYC) để xác minh thuộc tính một cách liền mạch.'
      },
      {
        title: 'Xác minh danh tính',
        desc: 'Xác minh danh tính cá nhân bằng giấy phép lái xe được lưu trong ví số. Tăng độ tin cậy bằng cách yêu cầu selfie trực tiếp và đối chiếu với ảnh chân dung trong gói ID.'
      },
      {
        title: 'Tái xác minh người dùng dễ dàng',
        desc: 'Cho phép người dùng tái xác minh danh tính trước mỗi giao dịch giá trị cao bằng cách yêu cầu bắt tay mDL, thay vì buộc họ tìm ví vật lý.'
      }
    ],
    learningTitle: 'Tiếp tục tìm hiểu',
    viewAllResources: 'Xem tất cả tài nguyên',
    resources: [
      {
        meta: 'Sách trắng - đọc trong 15 phút',
        title: 'Tình hình giấy phép lái xe di động (mDL) năm 2026',
        desc: 'Tìm hiểu mức độ áp dụng DMV trên toàn bộ 50 bang, quá trình chuẩn hóa ISO quốc tế và cách các lãnh đạo bảo mật đang chuẩn bị.'
      },
      {
        meta: 'Hướng dẫn - đọc trong 8 phút',
        title: 'Cách tích hợp giao thức mDL ISO 18013-5',
        desc: 'Hướng dẫn từng bước cho nhà phát triển để thiết lập bắt tay đường cong elliptic và phân giải neo tin cậy với gốc DMV.'
      },
      {
        meta: 'Nghiên cứu điển hình - đọc trong 10 phút',
        title: 'Cách các ngân hàng hiện đại đạt 98% chuyển đổi với mDL',
        desc: 'Đọc cách các dịch vụ tài chính tiên phong giảm thời gian xác minh xuống còn 1,5 giây đồng thời cắt giảm gian lận.'
      }
    ],
    exploreTitle: 'Khám phá thêm nền tảng định danh của Identra',
    exploreCards: [
      {
        title: 'Xác minh giấy tờ tùy thân do chính phủ cấp trên toàn cầu.',
        cta: 'Xem xác minh ID chính phủ'
      },
      {
        title: 'Xác minh người dùng toàn cầu bằng kiểm tra cơ sở dữ liệu.',
        cta: 'Xem kiểm tra cơ sở dữ liệu'
      }
    ],
    faqTitle: 'Câu hỏi thường gặp',
    faqs: [
      {
        q: 'Giấy phép lái xe di động (mDL) là gì?',
        a: 'Giấy phép lái xe di động (mDL) là bản sao số của giấy phép lái xe, được ký bằng mật mã và lưu trong ví số như Apple Wallet hoặc Google Wallet trên thiết bị di động. mDL tuân theo tiêu chuẩn quốc tế ISO 18013-5, bảo đảm trao đổi dữ liệu an toàn với thiết bị đầu cuối và phần mềm xác minh.'
      },
      {
        q: 'Identra xác minh mDL như thế nào?',
        a: 'Khi người dùng chia sẻ mDL qua Identra SDK, ví số sẽ truyền an toàn một payload được mã hóa chứa các thuộc tính do cơ quan phát hành ký. Identra giải mã payload, xác minh chữ ký số với chứng chỉ gốc DMV và đối chiếu hồ sơ trạng thái theo thời gian thực để bảo đảm hợp lệ.'
      },
      {
        q: 'Những bang nào hỗ trợ giấy phép lái xe di động?',
        a: 'Mức độ áp dụng đang tăng nhanh. Nhiều bang, bao gồm California, Colorado, Arizona, Georgia, Maryland và Ohio, đã hỗ trợ mDL chính thức; nhiều bang khác đang trong giai đoạn thí điểm. Identra tích hợp với các cơ sở dữ liệu gốc DMV lớn.'
      },
      {
        q: 'Người dùng vẫn có thể tải lên ID vật lý nếu không có mDL không?',
        a: 'Có. Dynamic Flow của Identra tự động chuyển về xác minh ID chính phủ vật lý nếu người dùng chưa có mDL đang hoạt động trong ví số, giúp duy trì phạm vi bao phủ đầy đủ cho người dùng.'
      }
    ],
    cta: {
      title: 'Sẵn sàng bắt đầu?',
      desc: 'Liên hệ hoặc bắt đầu khám phá Identra ngay hôm nay.',
      primary: 'Trải nghiệm demo',
      secondary: 'Dùng thử ngay ->'
    }
  }
} as const;
