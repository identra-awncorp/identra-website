/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DEMO_PAGE_TRANSLATIONS: any = {
  en: {
    backToHome: 'Back to Home',
    labStatus: 'Sandbox Lab Platform',
    badge: 'Demo Scenarios',
    heroTitle: 'Explore how Identra works. Run interactive demo scenarios step by step to see how our identity verification solutions prevent fraud and streamline onboarding.',
    openSandbox: 'Open Sandbox Lab',
    benefits: [
      {
        title: 'Real-world simulations',
        desc: 'Interact with live sandbox tests across banking, recruitment, healthcare, and ticket booking use cases.'
      },
      {
        title: 'Identity flow insights',
        desc: 'See how OCR document scans, 3D facial liveness, and AML screening come together seamlessly under the hood.'
      },
      {
        title: 'Zero-friction experience',
        desc: 'Understand how Identra achieves strong security while preserving high conversion rates with tailored user journeys.'
      }
    ],
    tabs: {
      scenarios: 'Verification Scenarios (7)',
      trends: 'Global Trends & Analytics'
    },
    scenarioHeading: 'Select a Use Case Scenario',
    availableScenarios: 'Available Scenarios',
    startDemo: 'Start Demo',
    customFlowTitle: 'Need to design your own custom flow?',
    customFlowDesc: 'Access our master Sandbox Lab to configure custom verification steps, upload your own identity credentials, and run arbitrary API tests.',
    openComprehensiveSandbox: 'Open Comprehensive Sandbox',
    comingSoon: 'Coming soon',
    scenarios: [
      {
        id: 'bank-account',
        tag: 'Banking',
        title: 'Open a bank account',
        desc: 'Verify identity, screen sanctions, and approve a low-risk customer for financial onboarding.',
        security: 'KYC + AML + liveness',
        successResult: 'The applicant passed document, biometric, and watchlist checks. The account can be opened with a verified identity certificate.',
        steps: [
          { label: 'Collect applicant profile', action: 'Submit profile data', logText: 'Profile attributes normalized and checked for synthetic identity risk.' },
          { label: 'Verify government ID', action: 'Scan government ID', logText: 'Document authenticity, MRZ, barcode, and expiration signals validated.' },
          { label: 'Run biometric liveness', action: 'Complete face check', logText: '3D liveness and face-to-document similarity checks passed.' },
          { label: 'Screen sanctions and PEP lists', action: 'Run AML screening', logText: 'OFAC, PEP, and adverse-risk registries returned no blocking matches.' }
        ]
      },
      {
        id: 'apply-job',
        tag: 'Workforce',
        title: 'Apply for a regulated job',
        desc: 'Validate work eligibility, credentials, and background signals before moving a candidate forward.',
        security: 'Workforce IDV + credential checks',
        successResult: 'The candidate identity, credential, and background layers were validated. The hiring workflow can continue.',
        steps: [
          { label: 'Confirm legal identity', action: 'Verify candidate identity', logText: 'National identity and employment authorization checks returned consistent results.' },
          { label: 'Validate credentials', action: 'Check education records', logText: 'Education, accreditation, and professional license signals were cross-checked.' },
          { label: 'Review background risk', action: 'Run background review', logText: 'Court, registry, and risk database searches completed within policy thresholds.' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'Ticketing',
        title: 'Book a high-demand event ticket',
        desc: 'Detect bots, confirm phone ownership, and bind the ticket to a verified fan profile.',
        security: 'Device intelligence + phone risk',
        successResult: 'The booking was confirmed for a verified fan. Bot risk was low and the ticket was cryptographically bound.',
        steps: [
          { label: 'Analyze device risk', action: 'Check device signal', logText: 'Browser fingerprint, automation signals, and behavioral entropy were assessed.' },
          { label: 'Confirm phone ownership', action: 'Verify phone number', logText: 'Carrier, SIM, and OTP checks confirmed reachable non-VoIP ownership.' },
          { label: 'Bind ticket credential', action: 'Issue verified ticket', logText: 'Ticket metadata was sealed with a non-transferability control and QR signature.' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: 'Travel',
        title: 'Check in for travel and hotel stay',
        desc: 'Use passport NFC, selfie matching, and reservation checks to reduce check-in risk.',
        security: 'NFC passport + face match',
        successResult: 'The traveler passed NFC passport, selfie, and reservation checks. Travel check-in can proceed.',
        steps: [
          { label: 'Read passport NFC chip', action: 'Scan passport chip', logText: 'Government certificate and encrypted passport data were verified.' },
          { label: 'Match traveler selfie', action: 'Complete selfie match', logText: 'The live selfie matched the passport chip image with high confidence.' },
          { label: 'Confirm reservation context', action: 'Validate booking details', logText: 'Flight, hotel, and age attestation details were synchronized.' }
        ]
      },
      {
        id: 'government-services',
        tag: 'Public sector',
        title: 'Access government services',
        desc: 'Confirm citizen identity, residency, and document eligibility for a digital public service.',
        security: 'Registry checks + residency proof',
        successResult: 'Citizen identity and residency proof were verified. The service request can be issued securely.',
        steps: [
          { label: 'Search population registry', action: 'Check citizen record', logText: 'Population registry and birth index records returned a consistent citizen profile.' },
          { label: 'Validate residency proof', action: 'Check residency evidence', logText: 'Postal, utility, and geographic signals confirmed residency.' },
          { label: 'Issue secure credential', action: 'Create digital certificate', logText: 'A one-time document credential was bound and sealed cryptographically.' }
        ]
      },
      {
        id: 'healthcare',
        tag: 'Healthcare',
        title: 'Register for healthcare access',
        desc: 'Verify patient identity, insurance coverage, and consent before clinical intake.',
        security: 'HIPAA-ready identity controls',
        successResult: 'The patient identity, insurance, and consent checks passed. Clinical intake can continue with protected data handling.',
        steps: [
          { label: 'Verify patient identity', action: 'Check patient ID', logText: 'Government ID and demographic duplicate checks aligned with the patient profile.' },
          { label: 'Confirm insurance coverage', action: 'Scan insurance card', logText: 'Policy status, carrier, and group numbers were verified in real time.' },
          { label: 'Capture consent', action: 'Sign consent form', logText: 'Consent was signed, hashed, and stored under healthcare privacy controls.' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Relay',
        title: 'Transfer a verified ticket',
        desc: 'Prove original ownership, lock escrow, and transfer a ticket credential safely.',
        security: 'Relay + smart escrow',
        successResult: 'Ticket ownership transferred atomically. The buyer received a verified credential and escrow was released.',
        steps: [
          { label: 'Verify original ownership', action: 'Audit ticket owner', logText: 'Original purchase key and issuer signature confirmed valid ownership.' },
          { label: 'Lock escrow terms', action: 'Initialize escrow', logText: 'Relay smart contract locked funds and protected against double spending.' },
          { label: 'Execute transfer', action: 'Complete ticket transfer', logText: 'Ticket ownership moved to the buyer wallet and escrow settlement was released.' }
        ]
      }
    ]
  },
  es: {
    backToHome: 'Volver al inicio',
    labStatus: 'Plataforma del laboratorio de pruebas',
    badge: 'Escenarios de demostración',
    heroTitle: 'Explora cómo funciona Identra. Ejecuta escenarios interactivos paso a paso para ver cómo nuestras soluciones de verificación de identidad previenen el fraude y agilizan el alta.',
    openSandbox: 'Abrir laboratorio de pruebas',
    benefits: [
      {
        title: 'Simulaciones reales',
        desc: 'Interactúa con pruebas en vivo para banca, contratación, salud y reserva de entradas.'
      },
      {
        title: 'Visibilidad del flujo de identidad',
        desc: 'Observa cómo se combinan el OCR de documentos, la prueba de vida facial 3D y el filtrado AML.'
      },
      {
        title: 'Experiencia sin fricción',
        desc: 'Entiende cómo Identra mantiene seguridad sólida y altas tasas de conversión con recorridos adaptados.'
      }
    ],
    tabs: {
      scenarios: 'Escenarios de verificación (7)',
      trends: 'Tendencias y analítica global'
    },
    scenarioHeading: 'Selecciona un caso de uso',
    availableScenarios: 'Escenarios disponibles',
    startDemo: 'Iniciar demo',
    customFlowTitle: '¿Necesitas diseñar tu propio flujo?',
    customFlowDesc: 'Accede al laboratorio principal para configurar pasos de verificación personalizados, cargar credenciales de identidad y ejecutar pruebas API.',
    openComprehensiveSandbox: 'Abrir laboratorio completo',
    comingSoon: 'Próximamente',
    scenarios: [
      {
        id: 'bank-account',
        tag: 'Banca',
        title: 'Abrir una cuenta bancaria',
        desc: 'Verifica identidad, revisa sanciones y aprueba a un cliente de bajo riesgo para el alta financiera.',
        security: 'KYC + AML + prueba de vida',
        successResult: 'El solicitante superó las comprobaciones de documento, biometría y listas de control. La cuenta puede abrirse con un certificado de identidad verificado.',
        steps: [
          { label: 'Recopilar perfil del solicitante', action: 'Enviar datos del perfil', logText: 'Los atributos del perfil se normalizaron y se revisó el riesgo de identidad sintética.' },
          { label: 'Verificar ID gubernamental', action: 'Escanear ID gubernamental', logText: 'Se validaron autenticidad del documento, MRZ, código de barras y vencimiento.' },
          { label: 'Ejecutar prueba de vida biométrica', action: 'Completar verificación facial', logText: 'La prueba de vida 3D y la similitud rostro-documento fueron aprobadas.' },
          { label: 'Revisar sanciones y listas PEP', action: 'Ejecutar filtrado AML', logText: 'OFAC, PEP y registros de riesgo no devolvieron coincidencias bloqueantes.' }
        ]
      },
      {
        id: 'apply-job',
        tag: 'Personal',
        title: 'Postular a un empleo regulado',
        desc: 'Valida elegibilidad laboral, credenciales y señales de antecedentes antes de avanzar con un candidato.',
        security: 'IDV laboral + comprobación de credenciales',
        successResult: 'Se validaron identidad, credenciales y antecedentes del candidato. El flujo de contratación puede continuar.',
        steps: [
          { label: 'Confirmar identidad legal', action: 'Verificar identidad del candidato', logText: 'Los controles de identidad nacional y autorización laboral fueron consistentes.' },
          { label: 'Validar credenciales', action: 'Comprobar registros educativos', logText: 'Educación, acreditación y licencias profesionales fueron contrastadas.' },
          { label: 'Revisar riesgo de antecedentes', action: 'Ejecutar revisión de antecedentes', logText: 'Las búsquedas en tribunales, registros y bases de riesgo quedaron dentro de la política.' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'Entradas',
        title: 'Reservar una entrada de alta demanda',
        desc: 'Detecta bots, confirma propiedad del teléfono y vincula la entrada a un perfil de fan verificado.',
        security: 'Inteligencia de dispositivo + riesgo telefónico',
        successResult: 'La reserva se confirmó para un fan verificado. El riesgo de bot fue bajo y la entrada quedó vinculada criptográficamente.',
        steps: [
          { label: 'Analizar riesgo del dispositivo', action: 'Revisar señal del dispositivo', logText: 'Se evaluaron huella del navegador, automatización y entropía de comportamiento.' },
          { label: 'Confirmar propiedad del teléfono', action: 'Verificar número telefónico', logText: 'Operador, SIM y OTP confirmaron propiedad alcanzable no VoIP.' },
          { label: 'Vincular credencial de entrada', action: 'Emitir entrada verificada', logText: 'Los metadatos de la entrada se sellaron con control de no transferencia y firma QR.' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: 'Viajes',
        title: 'Hacer check-in para viaje y hotel',
        desc: 'Usa NFC de pasaporte, coincidencia facial y comprobaciones de reserva para reducir el riesgo en el check-in.',
        security: 'Pasaporte NFC + coincidencia facial',
        successResult: 'El viajero superó pasaporte NFC, selfie y reserva. El check-in puede continuar.',
        steps: [
          { label: 'Leer chip NFC del pasaporte', action: 'Escanear chip del pasaporte', logText: 'Se verificaron certificado gubernamental y datos cifrados del pasaporte.' },
          { label: 'Comparar selfie del viajero', action: 'Completar comparación de selfie', logText: 'La selfie en vivo coincidió con la imagen del chip con alta confianza.' },
          { label: 'Confirmar contexto de reserva', action: 'Validar detalles de reserva', logText: 'Vuelo, hotel y certificación de edad quedaron sincronizados.' }
        ]
      },
      {
        id: 'government-services',
        tag: 'Sector público',
        title: 'Acceder a servicios gubernamentales',
        desc: 'Confirma identidad ciudadana, residencia y elegibilidad documental para un servicio público digital.',
        security: 'Registros + prueba de residencia',
        successResult: 'Se verificaron identidad ciudadana y residencia. La solicitud del servicio puede emitirse con seguridad.',
        steps: [
          { label: 'Buscar registro poblacional', action: 'Comprobar registro ciudadano', logText: 'El registro poblacional y el índice de nacimiento devolvieron un perfil consistente.' },
          { label: 'Validar prueba de residencia', action: 'Comprobar evidencia de residencia', logText: 'Se confirmaron señales postales, de servicios y geográficas.' },
          { label: 'Emitir credencial segura', action: 'Crear certificado digital', logText: 'Una credencial documental de un solo uso quedó vinculada y sellada criptográficamente.' }
        ]
      },
      {
        id: 'healthcare',
        tag: 'Salud',
        title: 'Registrarse para acceso sanitario',
        desc: 'Verifica identidad del paciente, cobertura de seguro y consentimiento antes de la admisión clínica.',
        security: 'Controles de identidad preparados para HIPAA',
        successResult: 'Identidad, seguro y consentimiento del paciente fueron aprobados. La admisión clínica puede continuar con datos protegidos.',
        steps: [
          { label: 'Verificar identidad del paciente', action: 'Comprobar ID del paciente', logText: 'El ID gubernamental y la revisión de duplicados demográficos coincidieron con el perfil.' },
          { label: 'Confirmar cobertura de seguro', action: 'Escanear tarjeta de seguro', logText: 'Estado de póliza, aseguradora y número de grupo fueron verificados en tiempo real.' },
          { label: 'Capturar consentimiento', action: 'Firmar formulario de consentimiento', logText: 'El consentimiento fue firmado, convertido a hash y guardado bajo controles de privacidad sanitaria.' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Relay',
        title: 'Transferir una entrada verificada',
        desc: 'Prueba propiedad original, bloquea el depósito en garantía y transfiere la credencial de entrada de forma segura.',
        security: 'Relay + depósito inteligente',
        successResult: 'La propiedad de la entrada se transfirió de forma atómica. El comprador recibió una credencial verificada y se liberó el depósito.',
        steps: [
          { label: 'Verificar propiedad original', action: 'Auditar propietario de la entrada', logText: 'La clave de compra original y la firma del emisor confirmaron propiedad válida.' },
          { label: 'Bloquear términos del depósito', action: 'Inicializar depósito en garantía', logText: 'El contrato Relay bloqueó fondos y protegió contra doble gasto.' },
          { label: 'Ejecutar transferencia', action: 'Completar transferencia de entrada', logText: 'La propiedad pasó a la billetera del comprador y se liberó el depósito.' }
        ]
      }
    ]
  },
  ja: {
    backToHome: 'ホームに戻る',
    labStatus: '検証ラボプラットフォーム',
    badge: 'デモシナリオ',
    heroTitle: 'Identraの仕組みを体験できます。本人確認ソリューションが不正を防ぎ、オンボーディングを効率化する流れを、インタラクティブなデモで段階的に確認してください。',
    openSandbox: '検証ラボを開く',
    benefits: [
      { title: '実運用に近いシミュレーション', desc: '銀行、採用、医療、チケット予約などのユースケースでライブ検証を操作できます。' },
      { title: '本人確認フローの可視化', desc: '書類OCR、3D顔ライブネス、AMLスクリーニングがどのように連携するか確認できます。' },
      { title: '摩擦の少ない体験', desc: 'Identraが強力なセキュリティと高いコンバージョンを両立する方法を理解できます。' }
    ],
    tabs: { scenarios: '検証シナリオ（7）', trends: 'グローバルトレンドと分析' },
    scenarioHeading: 'ユースケースシナリオを選択',
    availableScenarios: '利用可能なシナリオ',
    startDemo: 'デモを開始',
    customFlowTitle: '独自フローを設計しますか？',
    customFlowDesc: 'メイン検証ラボで検証ステップを構成し、本人確認資格情報をアップロードして、任意のAPIテストを実行できます。',
    openComprehensiveSandbox: '総合検証ラボを開く',
    comingSoon: '近日公開',
    scenarios: [
      {
        id: 'bank-account',
        tag: '銀行',
        title: '銀行口座を開設',
        desc: '本人確認、制裁リスト確認、低リスク顧客の金融オンボーディング承認を行います。',
        security: 'KYC + AML + ライブネス',
        successResult: '申請者は書類、生体認証、ウォッチリスト確認に合格しました。確認済み本人証明で口座開設を進められます。',
        steps: [
          { label: '申請者プロフィールを収集', action: 'プロフィールデータを送信', logText: 'プロフィール属性を正規化し、合成IDリスクを確認しました。' },
          { label: '政府発行IDを検証', action: '政府発行IDをスキャン', logText: '書類真正性、MRZ、バーコード、有効期限シグナルを検証しました。' },
          { label: '生体ライブネスを実行', action: '顔チェックを完了', logText: '3Dライブネスと顔・書類類似度チェックに合格しました。' },
          { label: '制裁・PEPリストを確認', action: 'AMLスクリーニングを実行', logText: 'OFAC、PEP、リスクレジストリでブロック対象の一致はありませんでした。' }
        ]
      },
      {
        id: 'apply-job',
        tag: '雇用',
        title: '規制対象職種に応募',
        desc: '候補者を次へ進める前に、就労資格、資格情報、バックグラウンドシグナルを検証します。',
        security: '雇用IDV + 資格チェック',
        successResult: '候補者の本人確認、資格、バックグラウンド層が検証されました。採用フローを継続できます。',
        steps: [
          { label: '法的本人性を確認', action: '候補者の本人確認を実行', logText: '国民IDと就労許可チェックは一貫した結果を返しました。' },
          { label: '資格情報を検証', action: '学歴記録を確認', logText: '学歴、認定状況、専門資格シグナルを照合しました。' },
          { label: '経歴リスクを確認', action: 'バックグラウンド確認を実行', logText: '裁判所、登録簿、リスクデータベース検索はポリシー範囲内でした。' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'チケット',
        title: '人気イベントチケットを予約',
        desc: 'ボットを検知し、電話所有を確認し、チケットを検証済みファンプロフィールへ結び付けます。',
        security: 'デバイスインテリジェンス + 電話リスク',
        successResult: '検証済みファンの予約が確認されました。ボットリスクは低く、チケットは暗号的に結び付けられました。',
        steps: [
          { label: 'デバイスリスクを分析', action: 'デバイスシグナルを確認', logText: 'ブラウザ指紋、自動化シグナル、行動エントロピーを評価しました。' },
          { label: '電話所有を確認', action: '電話番号を検証', logText: '通信事業者、SIM、OTPにより、到達可能な非VoIP所有を確認しました。' },
          { label: 'チケット資格情報を結合', action: '検証済みチケットを発行', logText: 'チケットメタデータを譲渡制御とQR署名で封印しました。' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: '旅行',
        title: '旅行とホテルにチェックイン',
        desc: 'パスポートNFC、セルフィー照合、予約確認でチェックイン時のリスクを下げます。',
        security: 'NFCパスポート + 顔照合',
        successResult: '旅行者はNFCパスポート、セルフィー、予約確認に合格しました。チェックインを進められます。',
        steps: [
          { label: 'パスポートNFCチップを読み取り', action: 'パスポートチップをスキャン', logText: '政府証明書と暗号化されたパスポートデータを検証しました。' },
          { label: '旅行者セルフィーを照合', action: 'セルフィー照合を完了', logText: 'ライブセルフィーはチップ内画像と高い信頼度で一致しました。' },
          { label: '予約コンテキストを確認', action: '予約詳細を検証', logText: 'フライト、ホテル、年齢証明の詳細を同期しました。' }
        ]
      },
      {
        id: 'government-services',
        tag: '公共部門',
        title: '行政サービスへアクセス',
        desc: 'デジタル行政サービスのために、市民ID、居住証明、書類適格性を確認します。',
        security: 'レジストリ確認 + 居住証明',
        successResult: '市民IDと居住証明が検証されました。サービス申請を安全に発行できます。',
        steps: [
          { label: '住民レジストリを検索', action: '市民記録を確認', logText: '住民レジストリと出生インデックスから一貫した市民プロフィールが返りました。' },
          { label: '居住証明を検証', action: '居住証拠を確認', logText: '郵便、公共料金、地理シグナルで居住を確認しました。' },
          { label: '安全な資格情報を発行', action: 'デジタル証明書を作成', logText: '一回限りの書類資格情報を暗号的に結合し封印しました。' }
        ]
      },
      {
        id: 'healthcare',
        tag: '医療',
        title: '医療アクセスに登録',
        desc: '臨床受付前に、患者本人確認、保険適用、同意を確認します。',
        security: 'HIPAA対応の本人確認制御',
        successResult: '患者ID、保険、同意チェックに合格しました。保護されたデータ処理で臨床受付を継続できます。',
        steps: [
          { label: '患者本人確認', action: '患者IDを確認', logText: '政府発行IDと人口統計上の重複確認が患者プロフィールと一致しました。' },
          { label: '保険適用を確認', action: '保険カードをスキャン', logText: '契約状態、保険会社、グループ番号をリアルタイムで確認しました。' },
          { label: '同意を取得', action: '同意書に署名', logText: '同意は署名、ハッシュ化され、医療プライバシー制御下で保存されました。' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Relay',
        title: '検証済みチケットを譲渡',
        desc: '元の所有権を証明し、エスクローをロックして、チケット資格情報を安全に譲渡します。',
        security: 'Relay + スマートエスクロー',
        successResult: 'チケット所有権はアトミックに譲渡されました。購入者は検証済み資格情報を受け取り、エスクローは解放されました。',
        steps: [
          { label: '元の所有権を検証', action: 'チケット所有者を監査', logText: '元の購入キーと発行者署名により、有効な所有権を確認しました。' },
          { label: 'エスクロー条件をロック', action: 'エスクローを初期化', logText: 'Relayスマートコントラクトが資金をロックし、二重使用を防止しました。' },
          { label: '譲渡を実行', action: 'チケット譲渡を完了', logText: 'チケット所有権は購入者ウォレットへ移り、エスクロー決済が解放されました。' }
        ]
      }
    ]
  },
  de: {
    backToHome: 'Zur Startseite',
    labStatus: 'Testlabor-Plattform',
    badge: 'Demo-Szenarien',
    heroTitle: 'Entdecken Sie, wie Identra funktioniert. Führen Sie interaktive Demo-Szenarien Schritt für Schritt aus und sehen Sie, wie Identitätsverifizierung Betrug verhindert und Onboarding beschleunigt.',
    openSandbox: 'Testlabor öffnen',
    benefits: [
      { title: 'Praxisnahe Simulationen', desc: 'Interagieren Sie mit Live-Tests für Banking, Recruiting, Gesundheitswesen und Ticketbuchung.' },
      { title: 'Einblick in Identitätsflüsse', desc: 'Sehen Sie, wie Dokumenten-OCR, 3D-Gesichts-Liveness und AML-Prüfung zusammenspielen.' },
      { title: 'Reibungsarme Erfahrung', desc: 'Verstehen Sie, wie Identra starke Sicherheit mit hoher Conversion durch angepasste Nutzerwege verbindet.' }
    ],
    tabs: { scenarios: 'Verifizierungsszenarien (7)', trends: 'Globale Trends und Analysen' },
    scenarioHeading: 'Anwendungsfall auswählen',
    availableScenarios: 'Verfügbare Szenarien',
    startDemo: 'Demo starten',
    customFlowTitle: 'Müssen Sie einen eigenen Flow entwerfen?',
    customFlowDesc: 'Nutzen Sie das zentrale Testlabor, um eigene Verifizierungsschritte zu konfigurieren, Identitätsnachweise hochzuladen und API-Tests auszuführen.',
    openComprehensiveSandbox: 'Umfassendes Testlabor öffnen',
    comingSoon: 'Demnächst verfügbar',
    scenarios: [
      {
        id: 'bank-account',
        tag: 'Banking',
        title: 'Bankkonto eröffnen',
        desc: 'Verifizieren Sie Identität, prüfen Sie Sanktionen und genehmigen Sie einen risikoarmen Kunden für Finanz-Onboarding.',
        security: 'KYC + AML + Liveness',
        successResult: 'Der Antragsteller hat Dokument-, Biometrie- und Watchlist-Prüfungen bestanden. Das Konto kann mit einem verifizierten Identitätszertifikat eröffnet werden.',
        steps: [
          { label: 'Antragstellerprofil erfassen', action: 'Profildaten senden', logText: 'Profilattribute wurden normalisiert und auf synthetische Identitätsrisiken geprüft.' },
          { label: 'Staatliche ID verifizieren', action: 'Staatliche ID scannen', logText: 'Dokumentenechtheit, MRZ, Barcode und Ablaufdatum wurden validiert.' },
          { label: 'Biometrische Liveness ausführen', action: 'Gesichtsprüfung abschließen', logText: '3D-Liveness und Gesicht-zu-Dokument-Ähnlichkeit wurden bestanden.' },
          { label: 'Sanktionen und PEP-Listen prüfen', action: 'AML-Prüfung ausführen', logText: 'OFAC-, PEP- und Risikoregister lieferten keine blockierenden Treffer.' }
        ]
      },
      {
        id: 'apply-job',
        tag: 'Arbeitskräfte',
        title: 'Für eine regulierte Stelle bewerben',
        desc: 'Validieren Sie Arbeitserlaubnis, Qualifikationen und Hintergrundsignale, bevor ein Kandidat weiterkommt.',
        security: 'Workforce-IDV + Qualifikationsprüfungen',
        successResult: 'Identität, Qualifikationen und Hintergrundebenen des Kandidaten wurden validiert. Der Einstellungsprozess kann fortgesetzt werden.',
        steps: [
          { label: 'Rechtliche Identität bestätigen', action: 'Kandidatenidentität prüfen', logText: 'Nationale Identität und Arbeitserlaubnis lieferten konsistente Ergebnisse.' },
          { label: 'Qualifikationen validieren', action: 'Bildungsnachweise prüfen', logText: 'Ausbildung, Akkreditierung und Berufslizenzen wurden abgeglichen.' },
          { label: 'Hintergrundrisiko prüfen', action: 'Hintergrundprüfung ausführen', logText: 'Gerichts-, Register- und Risikodatenbanksuchen blieben innerhalb der Richtlinien.' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'Tickets',
        title: 'Ticket für ein stark nachgefragtes Event buchen',
        desc: 'Erkennen Sie Bots, bestätigen Sie Telefonbesitz und binden Sie das Ticket an ein verifiziertes Fanprofil.',
        security: 'Geräteintelligenz + Telefonrisiko',
        successResult: 'Die Buchung wurde für einen verifizierten Fan bestätigt. Das Bot-Risiko war niedrig und das Ticket wurde kryptografisch gebunden.',
        steps: [
          { label: 'Geräterisiko analysieren', action: 'Gerätesignal prüfen', logText: 'Browser-Fingerprint, Automatisierungssignale und Verhaltensentropie wurden bewertet.' },
          { label: 'Telefonbesitz bestätigen', action: 'Telefonnummer verifizieren', logText: 'Mobilfunkanbieter, SIM und OTP bestätigten erreichbaren Nicht-VoIP-Besitz.' },
          { label: 'Ticketnachweis binden', action: 'Verifiziertes Ticket ausstellen', logText: 'Ticketmetadaten wurden mit Nichtübertragbarkeitskontrolle und QR-Signatur versiegelt.' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: 'Reisen',
        title: 'Für Reise und Hotel einchecken',
        desc: 'Nutzen Sie Pass-NFC, Selfie-Abgleich und Reservierungsprüfungen, um Check-in-Risiken zu senken.',
        security: 'NFC-Pass + Gesichtsabgleich',
        successResult: 'Der Reisende hat NFC-Pass-, Selfie- und Reservierungsprüfungen bestanden. Der Check-in kann fortgesetzt werden.',
        steps: [
          { label: 'NFC-Chip des Passes lesen', action: 'Passchip scannen', logText: 'Behördliches Zertifikat und verschlüsselte Passdaten wurden geprüft.' },
          { label: 'Reisenden-Selfie abgleichen', action: 'Selfie-Abgleich abschließen', logText: 'Das Live-Selfie stimmte mit hoher Konfidenz mit dem Chipbild überein.' },
          { label: 'Reservierungskontext bestätigen', action: 'Buchungsdetails validieren', logText: 'Flug-, Hotel- und Altersnachweisdaten wurden synchronisiert.' }
        ]
      },
      {
        id: 'government-services',
        tag: 'Öffentlicher Sektor',
        title: 'Auf staatliche Dienste zugreifen',
        desc: 'Bestätigen Sie Bürgeridentität, Wohnsitz und Dokumentenberechtigung für einen digitalen Verwaltungsdienst.',
        security: 'Registerprüfungen + Wohnsitznachweis',
        successResult: 'Bürgeridentität und Wohnsitznachweis wurden verifiziert. Die Dienstanfrage kann sicher ausgestellt werden.',
        steps: [
          { label: 'Bevölkerungsregister durchsuchen', action: 'Bürgerdatensatz prüfen', logText: 'Bevölkerungsregister und Geburtsindex lieferten ein konsistentes Bürgerprofil.' },
          { label: 'Wohnsitznachweis validieren', action: 'Wohnsitzbeleg prüfen', logText: 'Post-, Versorgungs- und geografische Signale bestätigten den Wohnsitz.' },
          { label: 'Sicheren Nachweis ausstellen', action: 'Digitales Zertifikat erstellen', logText: 'Ein einmaliger Dokumentennachweis wurde kryptografisch gebunden und versiegelt.' }
        ]
      },
      {
        id: 'healthcare',
        tag: 'Gesundheit',
        title: 'Für Gesundheitszugang registrieren',
        desc: 'Verifizieren Sie Patientenidentität, Versicherungsschutz und Einwilligung vor der klinischen Aufnahme.',
        security: 'HIPAA-fähige Identitätskontrollen',
        successResult: 'Patientenidentität, Versicherung und Einwilligung wurden bestätigt. Die klinische Aufnahme kann mit geschützter Datenverarbeitung fortgesetzt werden.',
        steps: [
          { label: 'Patientenidentität verifizieren', action: 'Patienten-ID prüfen', logText: 'Staatliche ID und demografische Dublettenprüfung passten zum Patientenprofil.' },
          { label: 'Versicherungsschutz bestätigen', action: 'Versicherungskarte scannen', logText: 'Policenstatus, Versicherer und Gruppennummer wurden in Echtzeit geprüft.' },
          { label: 'Einwilligung erfassen', action: 'Einwilligungsformular unterschreiben', logText: 'Die Einwilligung wurde signiert, gehasht und unter Datenschutzkontrollen gespeichert.' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Relay',
        title: 'Verifiziertes Ticket übertragen',
        desc: 'Weisen Sie ursprüngliches Eigentum nach, sperren Sie Treuhandbedingungen und übertragen Sie den Ticketnachweis sicher.',
        security: 'Relay + Smart Escrow',
        successResult: 'Das Ticketeigentum wurde atomar übertragen. Der Käufer erhielt einen verifizierten Nachweis und die Treuhandzahlung wurde freigegeben.',
        steps: [
          { label: 'Ursprüngliches Eigentum prüfen', action: 'Ticketinhaber auditieren', logText: 'Ursprünglicher Kaufschlüssel und Ausstellersignatur bestätigten gültiges Eigentum.' },
          { label: 'Treuhandbedingungen sperren', action: 'Treuhandkonto initialisieren', logText: 'Der Relay-Smart-Contract sperrte Mittel und schützte vor doppelter Ausgabe.' },
          { label: 'Übertragung ausführen', action: 'Ticketübertragung abschließen', logText: 'Das Ticketeigentum wechselte zur Käufer-Wallet und die Treuhandzahlung wurde freigegeben.' }
        ]
      }
    ]
  },
  vi: {
    backToHome: 'Quay lại trang chủ',
    labStatus: 'Nền tảng phòng thử nghiệm',
    badge: 'Kịch bản demo',
    heroTitle: 'Khám phá cách Identra hoạt động. Chạy các kịch bản demo tương tác từng bước để xem giải pháp xác minh danh tính ngăn gian lận và tinh gọn quy trình tiếp nhận như thế nào.',
    openSandbox: 'Mở phòng thử nghiệm',
    benefits: [
      { title: 'Mô phỏng sát thực tế', desc: 'Tương tác với các bài kiểm thử trực tiếp cho ngân hàng, tuyển dụng, y tế và đặt vé.' },
      { title: 'Hiểu rõ luồng danh tính', desc: 'Xem OCR giấy tờ, kiểm tra sống khuôn mặt 3D và sàng lọc AML phối hợp với nhau ra sao.' },
      { title: 'Trải nghiệm ít ma sát', desc: 'Hiểu cách Identra duy trì bảo mật mạnh mà vẫn giữ tỷ lệ chuyển đổi cao bằng hành trình người dùng phù hợp.' }
    ],
    tabs: { scenarios: 'Kịch bản xác minh (7)', trends: 'Xu hướng và phân tích toàn cầu' },
    scenarioHeading: 'Chọn kịch bản theo trường hợp sử dụng',
    availableScenarios: 'Kịch bản có sẵn',
    startDemo: 'Bắt đầu demo',
    customFlowTitle: 'Bạn cần thiết kế luồng riêng?',
    customFlowDesc: 'Truy cập phòng thử nghiệm chính để cấu hình các bước xác minh tùy chỉnh, tải thông tin xác thực danh tính và chạy kiểm thử API linh hoạt.',
    openComprehensiveSandbox: 'Mở phòng thử nghiệm đầy đủ',
    comingSoon: 'Sắp ra mắt',
    scenarios: [
      {
        id: 'bank-account',
        tag: 'Ngân hàng',
        title: 'Mở tài khoản ngân hàng',
        desc: 'Xác minh danh tính, sàng lọc danh sách trừng phạt và phê duyệt khách hàng rủi ro thấp cho quy trình tiếp nhận tài chính.',
        security: 'KYC + AML + kiểm tra sống',
        successResult: 'Người đăng ký đã vượt qua kiểm tra giấy tờ, sinh trắc học và danh sách theo dõi. Tài khoản có thể được mở bằng chứng chỉ danh tính đã xác minh.',
        steps: [
          { label: 'Thu thập hồ sơ người đăng ký', action: 'Gửi dữ liệu hồ sơ', logText: 'Thuộc tính hồ sơ đã được chuẩn hóa và kiểm tra rủi ro danh tính tổng hợp.' },
          { label: 'Xác minh ID do chính phủ cấp', action: 'Quét ID chính phủ', logText: 'Đã xác thực tính thật của giấy tờ, MRZ, mã vạch và tín hiệu hết hạn.' },
          { label: 'Chạy kiểm tra sống sinh trắc học', action: 'Hoàn tất kiểm tra khuôn mặt', logText: 'Kiểm tra sống 3D và độ tương đồng khuôn mặt với giấy tờ đã đạt.' },
          { label: 'Sàng lọc trừng phạt và PEP', action: 'Chạy sàng lọc AML', logText: 'OFAC, PEP và các sổ đăng ký rủi ro không trả về kết quả chặn.' }
        ]
      },
      {
        id: 'apply-job',
        tag: 'Nhân sự',
        title: 'Ứng tuyển vị trí có quy định chặt',
        desc: 'Xác thực quyền làm việc, bằng cấp và tín hiệu lý lịch trước khi chuyển ứng viên sang bước tiếp theo.',
        security: 'IDV nhân sự + kiểm tra bằng cấp',
        successResult: 'Danh tính, bằng cấp và các lớp kiểm tra lý lịch của ứng viên đã được xác thực. Quy trình tuyển dụng có thể tiếp tục.',
        steps: [
          { label: 'Xác nhận danh tính pháp lý', action: 'Xác minh danh tính ứng viên', logText: 'Kiểm tra danh tính quốc gia và quyền làm việc trả về kết quả nhất quán.' },
          { label: 'Xác thực bằng cấp', action: 'Kiểm tra hồ sơ học vấn', logText: 'Học vấn, chứng nhận và giấy phép hành nghề đã được đối chiếu.' },
          { label: 'Rà soát rủi ro lý lịch', action: 'Chạy kiểm tra lý lịch', logText: 'Tìm kiếm tại tòa án, sổ đăng ký và cơ sở dữ liệu rủi ro nằm trong ngưỡng chính sách.' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'Vé sự kiện',
        title: 'Đặt vé sự kiện nhu cầu cao',
        desc: 'Phát hiện bot, xác nhận quyền sở hữu điện thoại và gắn vé với hồ sơ người hâm mộ đã xác minh.',
        security: 'Tín hiệu thiết bị + rủi ro điện thoại',
        successResult: 'Lượt đặt vé đã được xác nhận cho người hâm mộ đã xác minh. Rủi ro bot thấp và vé đã được gắn bằng mã hóa.',
        steps: [
          { label: 'Phân tích rủi ro thiết bị', action: 'Kiểm tra tín hiệu thiết bị', logText: 'Dấu vân tay trình duyệt, tín hiệu tự động hóa và hành vi đã được đánh giá.' },
          { label: 'Xác nhận quyền sở hữu điện thoại', action: 'Xác minh số điện thoại', logText: 'Nhà mạng, SIM và OTP xác nhận quyền sở hữu có thể liên hệ, không phải VoIP.' },
          { label: 'Gắn thông tin xác thực vé', action: 'Phát hành vé đã xác minh', logText: 'Siêu dữ liệu vé đã được niêm phong bằng kiểm soát chống chuyển nhượng và chữ ký QR.' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: 'Du lịch',
        title: 'Làm thủ tục cho chuyến bay và khách sạn',
        desc: 'Dùng NFC hộ chiếu, đối chiếu selfie và kiểm tra đặt chỗ để giảm rủi ro khi làm thủ tục.',
        security: 'Hộ chiếu NFC + đối chiếu khuôn mặt',
        successResult: 'Hành khách đã vượt qua kiểm tra hộ chiếu NFC, selfie và đặt chỗ. Quy trình làm thủ tục có thể tiếp tục.',
        steps: [
          { label: 'Đọc chip NFC hộ chiếu', action: 'Quét chip hộ chiếu', logText: 'Chứng thư chính phủ và dữ liệu hộ chiếu mã hóa đã được xác minh.' },
          { label: 'Đối chiếu selfie hành khách', action: 'Hoàn tất đối chiếu selfie', logText: 'Selfie trực tiếp khớp với ảnh trong chip hộ chiếu với độ tin cậy cao.' },
          { label: 'Xác nhận ngữ cảnh đặt chỗ', action: 'Xác thực chi tiết đặt chỗ', logText: 'Thông tin chuyến bay, khách sạn và xác nhận độ tuổi đã được đồng bộ.' }
        ]
      },
      {
        id: 'government-services',
        tag: 'Khu vực công',
        title: 'Truy cập dịch vụ công',
        desc: 'Xác nhận danh tính công dân, cư trú và điều kiện giấy tờ cho một dịch vụ công trực tuyến.',
        security: 'Kiểm tra sổ đăng ký + chứng minh cư trú',
        successResult: 'Danh tính công dân và bằng chứng cư trú đã được xác minh. Yêu cầu dịch vụ có thể được phát hành an toàn.',
        steps: [
          { label: 'Tìm kiếm sổ đăng ký dân cư', action: 'Kiểm tra hồ sơ công dân', logText: 'Sổ đăng ký dân cư và chỉ mục khai sinh trả về hồ sơ công dân nhất quán.' },
          { label: 'Xác thực bằng chứng cư trú', action: 'Kiểm tra chứng cứ cư trú', logText: 'Tín hiệu bưu chính, tiện ích và địa lý xác nhận nơi cư trú.' },
          { label: 'Phát hành chứng chỉ an toàn', action: 'Tạo chứng chỉ số', logText: 'Thông tin xác thực giấy tờ dùng một lần đã được liên kết và niêm phong bằng mã hóa.' }
        ]
      },
      {
        id: 'healthcare',
        tag: 'Y tế',
        title: 'Đăng ký truy cập dịch vụ y tế',
        desc: 'Xác minh danh tính bệnh nhân, bảo hiểm và sự đồng ý trước khi tiếp nhận lâm sàng.',
        security: 'Kiểm soát danh tính sẵn sàng cho HIPAA',
        successResult: 'Danh tính bệnh nhân, bảo hiểm và sự đồng ý đã đạt kiểm tra. Quy trình tiếp nhận lâm sàng có thể tiếp tục với xử lý dữ liệu được bảo vệ.',
        steps: [
          { label: 'Xác minh danh tính bệnh nhân', action: 'Kiểm tra ID bệnh nhân', logText: 'ID chính phủ và kiểm tra trùng lặp nhân khẩu học khớp với hồ sơ bệnh nhân.' },
          { label: 'Xác nhận bảo hiểm', action: 'Quét thẻ bảo hiểm', logText: 'Trạng thái hợp đồng, nhà bảo hiểm và số nhóm đã được xác minh theo thời gian thực.' },
          { label: 'Thu thập sự đồng ý', action: 'Ký biểu mẫu đồng ý', logText: 'Sự đồng ý đã được ký, băm và lưu trữ theo kiểm soát quyền riêng tư y tế.' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Relay',
        title: 'Chuyển vé đã xác minh',
        desc: 'Chứng minh quyền sở hữu ban đầu, khóa ký quỹ và chuyển thông tin xác thực vé một cách an toàn.',
        security: 'Relay + ký quỹ thông minh',
        successResult: 'Quyền sở hữu vé đã được chuyển đồng thời. Người mua nhận thông tin xác thực đã xác minh và ký quỹ được giải phóng.',
        steps: [
          { label: 'Xác minh quyền sở hữu ban đầu', action: 'Kiểm tra chủ sở hữu vé', logText: 'Khóa mua ban đầu và chữ ký bên phát hành xác nhận quyền sở hữu hợp lệ.' },
          { label: 'Khóa điều khoản ký quỹ', action: 'Khởi tạo ký quỹ', logText: 'Hợp đồng thông minh Relay đã khóa tiền và chống chi tiêu hai lần.' },
          { label: 'Thực hiện chuyển nhượng', action: 'Hoàn tất chuyển vé', logText: 'Quyền sở hữu vé chuyển sang ví người mua và khoản ký quỹ được giải phóng.' }
        ]
      }
    ]
  }
};

DEMO_PAGE_TRANSLATIONS.es.scenarios.forEach((scenario: any, index: number) => {
  const de = DEMO_PAGE_TRANSLATIONS.de.scenarios[index];
  const ja = DEMO_PAGE_TRANSLATIONS.ja.scenarios[index];
  const vi = DEMO_PAGE_TRANSLATIONS.vi.scenarios[index];
  if (!de || !ja || !vi || scenario.id !== de.id || scenario.id !== ja.id || scenario.id !== vi.id) {
    throw new Error('DemoPageTranslations scenario ordering mismatch');
  }
});
