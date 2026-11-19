/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const LIST_DEMO_PAGE_TRANSLATIONS: any = {
  en: {
    backToHome: "Back to Home",
    labStatus: "2 demos run for real · 7 interface simulations",
    badge: "Try Identra",
    heroTitle: "Try Identra step by step, right in your browser",
    heroCta: "Start the diploma demo",
    heroSecondary: "Check a product's journey",
    benefits: [
      { title: "Real, not simulated", desc: "The first two demos use the Identra server with real digital signatures and real checks." },
      { title: "No app to install", desc: "A trial wallet in your browser plays your phone; the Identra app is not published yet." },
      { title: "Simulations for other sectors", desc: "The other seven scenarios are interface simulations with sample data, to picture the flow in banking, healthcare or travel." },
    ],
    scenarioHeading: "Which scenario would you like to try?",
    availableScenarios: "scenarios",
    startDemo: "Start demo",
    realLabel: "Runs for real",
    simulatedLabel: "Interface simulation",
    appNote: "Testing the Identra app already? The sample university portal and the job application page also work with a phone wallet.",
    portalLink: "Sample university portal",
    customFlowTitle: "Need a flow of your own?",
    customFlowDesc: "Tell us about your documents and your process, and we will look at how Identra fits them with you.",
    contactAction: "Contact us",
    realScenarios: [
      { id: "diploma", tag: "Education", title: "Receive and use a diploma", desc: "A university issues a diploma into a trial wallet in your browser, an employer checks it, then a revoked diploma is refused. Guided step by step.", security: "Trial wallet in the browser, no app needed" },
      { id: "product-journey", tag: "Traceability", title: "Check a product's journey", desc: "Open four sample products or scan their QR with your phone: your browser checks each signed stage, and catches a revoked record and one edited in the database.", security: "Checked in your own browser" },
    ],
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
        tag: 'Credential Issuance',
        title: 'Transfer a verified ticket',
        desc: 'Prove original ownership, lock escrow, and transfer a ticket credential safely.',
        security: 'Credential Issuance + smart escrow',
        successResult: 'Ticket ownership transferred atomically. The buyer received a verified credential and escrow was released.',
        steps: [
          { label: 'Verify original ownership', action: 'Audit ticket owner', logText: 'Original purchase key and issuer signature confirmed valid ownership.' },
          { label: 'Lock escrow terms', action: 'Initialize escrow', logText: 'The escrow smart contract locked funds and protected against double spending.' },
          { label: 'Execute transfer', action: 'Complete ticket transfer', logText: 'Ticket ownership moved to the buyer wallet and escrow settlement was released.' }
        ]
      }
    ]
  },
  es: {
    backToHome: "Volver al inicio",
    labStatus: "2 demos funcionan de verdad · 7 simulaciones de interfaz",
    badge: "Prueba Identra",
    heroTitle: "Prueba Identra paso a paso, en tu navegador",
    heroCta: "Empezar la demo del título",
    heroSecondary: "Comprobar el recorrido de un producto",
    benefits: [
      { title: "Real, no simulado", desc: "Las dos primeras demos usan el servidor de Identra con firmas digitales y comprobaciones reales." },
      { title: "Sin instalar ninguna app", desc: "Una billetera de prueba en el navegador hace de teléfono; la app de Identra aún no está publicada." },
      { title: "Simulaciones de otros sectores", desc: "Los otros siete escenarios son simulaciones de interfaz con datos de ejemplo, para imaginar el flujo en banca, salud o viajes." },
    ],
    scenarioHeading: "¿Qué escenario quieres probar?",
    availableScenarios: "escenarios",
    startDemo: "Iniciar demo",
    realLabel: "Funciona de verdad",
    simulatedLabel: "Simulación de interfaz",
    appNote: "¿Ya pruebas la app de Identra? El portal universitario de ejemplo y la página de empleo también funcionan con una billetera en el teléfono.",
    portalLink: "Portal universitario de ejemplo",
    customFlowTitle: "¿Necesitas un flujo propio?",
    customFlowDesc: "Cuéntanos qué documentos y qué proceso tienes, y veremos contigo cómo encaja Identra.",
    contactAction: "Contactar",
    realScenarios: [
      { id: "diploma", tag: "Educación", title: "Recibir y usar un título", desc: "Una universidad emite un título a una billetera de prueba en tu navegador, una empresa lo comprueba y después un título revocado es rechazado. Guiado paso a paso (en inglés).", security: "Billetera de prueba en el navegador, sin app" },
      { id: "product-journey", tag: "Trazabilidad", title: "Comprobar el recorrido de un producto", desc: "Abre cuatro productos de ejemplo o escanea su QR con el teléfono: tu navegador comprueba cada etapa firmada y detecta un registro revocado y otro editado en la base de datos (en inglés).", security: "Comprobado en tu propio navegador" },
    ],
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
        tag: 'Credential Issuance',
        title: 'Transferir una entrada verificada',
        desc: 'Prueba propiedad original, bloquea el depósito en garantía y transfiere la credencial de entrada de forma segura.',
        security: 'Credential Issuance + depósito inteligente',
        successResult: 'La propiedad de la entrada se transfirió de forma atómica. El comprador recibió una credencial verificada y se liberó el depósito.',
        steps: [
          { label: 'Verificar propiedad original', action: 'Auditar propietario de la entrada', logText: 'La clave de compra original y la firma del emisor confirmaron propiedad válida.' },
          { label: 'Bloquear términos del depósito', action: 'Inicializar depósito en garantía', logText: 'El contrato de depósito bloqueó fondos y protegió contra doble gasto.' },
          { label: 'Ejecutar transferencia', action: 'Completar transferencia de entrada', logText: 'La propiedad pasó a la billetera del comprador y se liberó el depósito.' }
        ]
      }
    ]
  },
  ja: {
    backToHome: "ホームに戻る",
    labStatus: "実際に動くデモ 2 件 · 画面シミュレーション 7 件",
    badge: "Identra を試す",
    heroTitle: "Identra をブラウザで一歩ずつ体験",
    heroCta: "卒業証書デモを始める",
    heroSecondary: "製品の流通履歴を確認する",
    benefits: [
      { title: "シミュレーションではなく実物", desc: "最初の 2 つのデモは Identra のサーバー、本物のデジタル署名と検証を使います。" },
      { title: "アプリのインストール不要", desc: "ブラウザ内のお試しウォレットがスマートフォンの役をします。Identra アプリはまだ公開されていません。" },
      { title: "他業種のシミュレーション", desc: "残りの 7 つは、銀行・医療・旅行などの流れをイメージするための、サンプルデータによる画面シミュレーションです。" },
    ],
    scenarioHeading: "どのシナリオを試しますか？",
    availableScenarios: "件のシナリオ",
    startDemo: "デモを開始",
    realLabel: "実際に動作",
    simulatedLabel: "画面シミュレーション",
    appNote: "すでに Identra アプリをテスト中ですか？サンプル大学ポータルと求人応募ページはスマートフォンのウォレットでも使えます。",
    portalLink: "サンプル大学ポータル",
    customFlowTitle: "独自のフローが必要ですか？",
    customFlowDesc: "扱う書類と業務の流れをお聞かせください。Identra をどう当てはめるか一緒に検討します。",
    contactAction: "お問い合わせ",
    realScenarios: [
      { id: "diploma", tag: "教育", title: "卒業証書を受け取って使う", desc: "大学がブラウザ内のお試しウォレットに卒業証書を発行し、企業が確認し、取り消された証書が拒否されるまでを順に案内します（英語）。", security: "ブラウザ内のお試しウォレット、アプリ不要" },
      { id: "product-journey", tag: "トレーサビリティ", title: "製品の流通履歴を確認する", desc: "4 つのサンプル製品を開くか、スマートフォンで QR を読み取ります。署名された各工程をブラウザ自身が確認し、取り消された記録とデータベースで書き換えられた記録も見つけます（英語）。", security: "あなたのブラウザで確認" },
    ],
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
        tag: 'Credential Issuance',
        title: '検証済みチケットを譲渡',
        desc: '元の所有権を証明し、エスクローをロックして、チケット資格情報を安全に譲渡します。',
        security: 'Credential Issuance + スマートエスクロー',
        successResult: 'チケット所有権はアトミックに譲渡されました。購入者は検証済み資格情報を受け取り、エスクローは解放されました。',
        steps: [
          { label: '元の所有権を検証', action: 'チケット所有者を監査', logText: '元の購入キーと発行者署名により、有効な所有権を確認しました。' },
          { label: 'エスクロー条件をロック', action: 'エスクローを初期化', logText: 'エスクローのスマートコントラクトが資金をロックし、二重使用を防止しました。' },
          { label: '譲渡を実行', action: 'チケット譲渡を完了', logText: 'チケット所有権は購入者ウォレットへ移り、エスクロー決済が解放されました。' }
        ]
      }
    ]
  },
  de: {
    backToHome: "Zur Startseite",
    labStatus: "2 Demos laufen echt · 7 Oberflächen-Simulationen",
    badge: "Identra ausprobieren",
    heroTitle: "Identra Schritt für Schritt im Browser ausprobieren",
    heroCta: "Zeugnis-Demo starten",
    heroSecondary: "Weg eines Produkts prüfen",
    benefits: [
      { title: "Echt, nicht simuliert", desc: "Die ersten zwei Demos nutzen den Identra-Server mit echten digitalen Signaturen und echten Prüfungen." },
      { title: "Keine App nötig", desc: "Eine Test-Wallet im Browser spielt Ihr Smartphone; die Identra-App ist noch nicht veröffentlicht." },
      { title: "Simulationen für andere Branchen", desc: "Die übrigen sieben Szenarien sind Oberflächen-Simulationen mit Beispieldaten, um Abläufe in Banking, Gesundheit oder Reisen vorzustellen." },
    ],
    scenarioHeading: "Welches Szenario möchten Sie ausprobieren?",
    availableScenarios: "Szenarien",
    startDemo: "Demo starten",
    realLabel: "Läuft echt",
    simulatedLabel: "Oberflächen-Simulation",
    appNote: "Testen Sie die Identra-App bereits? Das Beispiel-Hochschulportal und die Bewerbungsseite funktionieren auch mit einer Wallet auf dem Smartphone.",
    portalLink: "Beispiel-Hochschulportal",
    customFlowTitle: "Brauchen Sie einen eigenen Ablauf?",
    customFlowDesc: "Erzählen Sie uns von Ihren Dokumenten und Abläufen; wir prüfen gemeinsam mit Ihnen, wie Identra passt.",
    contactAction: "Kontakt aufnehmen",
    realScenarios: [
      { id: "diploma", tag: "Bildung", title: "Ein Zeugnis erhalten und nutzen", desc: "Eine Hochschule stellt ein Zeugnis in eine Test-Wallet im Browser aus, ein Arbeitgeber prüft es, dann wird ein widerrufenes Zeugnis abgelehnt. Schritt für Schritt geführt (auf Englisch).", security: "Test-Wallet im Browser, keine App nötig" },
      { id: "product-journey", tag: "Rückverfolgbarkeit", title: "Den Weg eines Produkts prüfen", desc: "Öffnen Sie vier Beispielprodukte oder scannen Sie ihren QR-Code mit dem Smartphone: Ihr Browser prüft jede signierte Station und erkennt einen widerrufenen und einen in der Datenbank geänderten Eintrag (auf Englisch).", security: "Im eigenen Browser geprüft" },
    ],
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
        tag: 'Credential Issuance',
        title: 'Verifiziertes Ticket übertragen',
        desc: 'Weisen Sie ursprüngliches Eigentum nach, sperren Sie Treuhandbedingungen und übertragen Sie den Ticketnachweis sicher.',
        security: 'Credential Issuance + Smart Escrow',
        successResult: 'Das Ticketeigentum wurde atomar übertragen. Der Käufer erhielt einen verifizierten Nachweis und die Treuhandzahlung wurde freigegeben.',
        steps: [
          { label: 'Ursprüngliches Eigentum prüfen', action: 'Ticketinhaber auditieren', logText: 'Ursprünglicher Kaufschlüssel und Ausstellersignatur bestätigten gültiges Eigentum.' },
          { label: 'Treuhandbedingungen sperren', action: 'Treuhandkonto initialisieren', logText: 'Der Escrow-Smart-Contract sperrte Mittel und schützte vor doppelter Ausgabe.' },
          { label: 'Übertragung ausführen', action: 'Ticketübertragung abschließen', logText: 'Das Ticketeigentum wechselte zur Käufer-Wallet und die Treuhandzahlung wurde freigegeben.' }
        ]
      }
    ]
  },
  vi: {
    backToHome: "Về trang chủ",
    labStatus: "2 demo chạy thật · 7 mô phỏng giao diện",
    badge: "Trải nghiệm Identra",
    heroTitle: "Thử Identra từng bước, ngay trên trình duyệt",
    heroCta: "Bắt đầu demo bằng tốt nghiệp",
    heroSecondary: "Kiểm tra hành trình sản phẩm",
    benefits: [
      { title: "Chạy thật, không giả lập", desc: "Hai demo đầu dùng máy chủ Identra, chữ ký số thật và các bước kiểm tra thật." },
      { title: "Không cần cài ứng dụng", desc: "Ví thử trên web đóng vai điện thoại của bạn; ứng dụng Identra chưa phát hành." },
      { title: "Mô phỏng cho các ngành khác", desc: "Bảy kịch bản còn lại là mô phỏng giao diện với dữ liệu mẫu, giúp hình dung quy trình trong ngân hàng, y tế, du lịch." },
    ],
    scenarioHeading: "Bạn muốn thử tình huống nào?",
    availableScenarios: "kịch bản",
    startDemo: "Bắt đầu demo",
    realLabel: "Chạy thật",
    simulatedLabel: "Mô phỏng giao diện",
    appNote: "Đang thử nghiệm ứng dụng Identra? Cổng trường mẫu và trang ứng tuyển cũng dùng được với ví trên điện thoại.",
    portalLink: "Cổng trường mẫu",
    customFlowTitle: "Bạn cần một quy trình riêng?",
    customFlowDesc: "Kể cho chúng tôi về giấy tờ và quy trình của bạn; chúng tôi sẽ cùng bạn xem Identra áp dụng thế nào.",
    contactAction: "Liên hệ với chúng tôi",
    realScenarios: [
      { id: "diploma", tag: "Giáo dục", title: "Nhận và dùng bằng tốt nghiệp", desc: "Trường cấp bằng vào ví thử ngay trên trình duyệt, nhà tuyển dụng kiểm tra, rồi xem bằng bị thu hồi bị từ chối. Có hướng dẫn từng bước.", security: "Ví thử trên web, không cần ứng dụng" },
      { id: "product-journey", tag: "Truy xuất nguồn gốc", title: "Kiểm tra hành trình sản phẩm", desc: "Mở bốn sản phẩm mẫu hoặc quét mã QR bằng điện thoại: trình duyệt tự kiểm tra từng chặng có chữ ký, phát hiện cả bản ghi đã bị thu hồi lẫn bản ghi bị sửa trong kho dữ liệu.", security: "Kiểm tra ngay trên trình duyệt của bạn" },
    ],
    scenarios: [
      {
        id: 'bank-account',
        tag: 'Ngân hàng',
        title: 'Mở tài khoản ngân hàng',
        desc: 'Xác minh danh tính, sàng lọc danh sách cấm vận và đánh giá rủi ro trước khi duyệt mở tài khoản.',
        security: 'KYC + AML + kiểm tra người thật',
        successResult: 'Khách hàng đã vượt qua các bước kiểm tra giấy tờ, sinh trắc học và danh sách theo dõi. Tài khoản có thể được mở bằng danh tính đã xác minh.',
        steps: [
          { label: 'Thu thập hồ sơ khách hàng', action: 'Gửi thông tin đăng ký', logText: 'Thông tin được chuẩn hóa, đồng thời đối chiếu các dấu hiệu của danh tính tổng hợp.' },
          { label: 'Xác minh giấy tờ tùy thân', action: 'Quét giấy tờ tùy thân', logText: 'Hệ thống kiểm tra tính xác thực, vùng MRZ, mã vạch và hạn sử dụng của giấy tờ.' },
          { label: 'Xác minh người thật', action: 'Quét khuôn mặt', logText: 'Kết quả kiểm tra người thật 3D và đối chiếu ảnh chân dung trên giấy tờ đều đạt yêu cầu.' },
          { label: 'Sàng lọc AML', action: 'Kiểm tra AML', logText: 'Không phát hiện kết quả trùng khớp cần chặn trên danh sách OFAC, PEP hoặc các nguồn tin bất lợi.' }
        ]
      },
      {
        id: 'apply-job',
        tag: 'Tuyển dụng',
        title: 'Ứng tuyển vào vị trí cần kiểm tra hồ sơ',
        desc: 'Xác minh quyền làm việc, bằng cấp và thông tin lý lịch trước khi chuyển ứng viên sang vòng tiếp theo.',
        security: 'Xác minh danh tính và hồ sơ ứng viên',
        successResult: 'Danh tính, bằng cấp và thông tin lý lịch của ứng viên đều đã được xác minh. Quy trình tuyển dụng có thể tiếp tục.',
        steps: [
          { label: 'Xác minh danh tính', action: 'Xác minh ứng viên', logText: 'Thông tin định danh và giấy phép lao động cho kết quả nhất quán.' },
          { label: 'Đối chiếu bằng cấp', action: 'Kiểm tra hồ sơ học vấn', logText: 'Bằng cấp, chứng nhận kiểm định và giấy phép hành nghề được đối chiếu với các nguồn chính thống.' },
          { label: 'Kiểm tra lý lịch', action: 'Tra cứu lý lịch', logText: 'Kết quả tra cứu tại tòa án, cơ quan đăng ký và cơ sở dữ liệu rủi ro đều nằm trong ngưỡng cho phép.' }
        ]
      },
      {
        id: 'ticket-booking',
        tag: 'Bán vé',
        title: 'Đặt vé cho sự kiện được săn đón',
        desc: 'Phát hiện bot, xác minh người sở hữu số điện thoại và gắn vé với hồ sơ người mua đã được xác thực.',
        security: 'Phân tích thiết bị và rủi ro số điện thoại',
        successResult: 'Giao dịch đặt vé đã được xác nhận cho người mua thật. Nguy cơ bot ở mức thấp và vé đã được liên kết an toàn với danh tính người mua.',
        steps: [
          { label: 'Phân tích rủi ro thiết bị', action: 'Kiểm tra thiết bị', logText: 'Hệ thống đánh giá dấu vân tay trình duyệt, tín hiệu tự động hóa và hành vi trong phiên truy cập.' },
          { label: 'Xác minh chủ thuê bao', action: 'Xác minh số điện thoại', logText: 'Thông tin nhà mạng, SIM và mã OTP xác nhận số điện thoại đang hoạt động, thuộc quyền kiểm soát của người dùng và không phải số VoIP.' },
          { label: 'Gắn vé với danh tính', action: 'Phát hành vé xác thực', logText: 'Siêu dữ liệu vé được ký số bằng mã QR và áp dụng điều kiện hạn chế chuyển nhượng.' }
        ]
      },
      {
        id: 'airlines-hotels',
        tag: 'Du lịch',
        title: 'Làm thủ tục chuyến bay và nhận phòng khách sạn',
        desc: 'Đọc chip NFC trên hộ chiếu, đối chiếu ảnh selfie và kiểm tra thông tin đặt chỗ để giảm rủi ro khi làm thủ tục.',
        security: 'Hộ chiếu NFC và đối chiếu khuôn mặt',
        successResult: 'Hộ chiếu, ảnh selfie và thông tin đặt chỗ của hành khách đều đã được xác minh. Hành khách có thể tiếp tục làm thủ tục.',
        steps: [
          { label: 'Đọc chip NFC trên hộ chiếu', action: 'Quét chip hộ chiếu', logText: 'Chứng thư số của cơ quan cấp và dữ liệu mã hóa trong hộ chiếu đều hợp lệ.' },
          { label: 'Đối chiếu khuôn mặt', action: 'Chụp ảnh selfie', logText: 'Ảnh selfie trực tiếp khớp với ảnh lưu trong chip hộ chiếu với độ tin cậy cao.' },
          { label: 'Kiểm tra đặt chỗ', action: 'Xác minh thông tin đặt chỗ', logText: 'Thông tin chuyến bay, khách sạn và xác nhận độ tuổi được đối chiếu và cho kết quả nhất quán.' }
        ]
      },
      {
        id: 'government-services',
        tag: 'Dịch vụ công',
        title: 'Thực hiện thủ tục hành chính trực tuyến',
        desc: 'Xác minh danh tính, nơi cư trú và điều kiện hồ sơ trước khi tiếp nhận yêu cầu trực tuyến.',
        security: 'Đối chiếu dữ liệu dân cư và nơi cư trú',
        successResult: 'Danh tính và thông tin cư trú đã được xác minh. Hồ sơ có thể được tiếp nhận và xử lý an toàn.',
        steps: [
          { label: 'Tra cứu dữ liệu dân cư', action: 'Đối chiếu hồ sơ công dân', logText: 'Thông tin từ cơ sở dữ liệu dân cư và khai sinh cho kết quả nhất quán.' },
          { label: 'Xác minh nơi cư trú', action: 'Kiểm tra giấy tờ cư trú', logText: 'Địa chỉ bưu chính, hóa đơn tiện ích và dữ liệu vị trí cùng xác nhận nơi cư trú.' },
          { label: 'Phát hành thực chứng', action: 'Tạo thực chứng', logText: 'Thực chứng dùng một lần được liên kết với hồ sơ và ký số để chống chỉnh sửa.' }
        ]
      },
      {
        id: 'healthcare',
        tag: 'Y tế',
        title: 'Đăng ký khám chữa bệnh',
        desc: 'Xác minh danh tính, quyền lợi bảo hiểm và sự đồng thuận của bệnh nhân trước khi tiếp nhận.',
        security: 'Kiểm soát danh tính đáp ứng HIPAA',
        successResult: 'Danh tính, bảo hiểm và sự đồng thuận của bệnh nhân đều đã được xác minh. Cơ sở y tế có thể tiếp nhận bệnh nhân mà vẫn bảo vệ dữ liệu.',
        steps: [
          { label: 'Xác minh danh tính bệnh nhân', action: 'Kiểm tra giấy tờ', logText: 'Thông tin trên giấy tờ tùy thân trùng khớp với hồ sơ bệnh nhân và không phát hiện hồ sơ nhân khẩu học trùng lặp.' },
          { label: 'Kiểm tra quyền lợi bảo hiểm', action: 'Quét thẻ bảo hiểm', logText: 'Hiệu lực hợp đồng, nhà bảo hiểm và mã nhóm được xác minh theo thời gian thực.' },
          { label: 'Ghi nhận sự đồng thuận', action: 'Ký phiếu đồng thuận', logText: 'Phiếu đồng thuận được ký, tạo mã băm và lưu trữ theo các yêu cầu bảo vệ dữ liệu y tế.' }
        ]
      },
      {
        id: 'ticket-transfer',
        tag: 'Credential Issuance',
        title: 'Chuyển nhượng vé đã xác thực',
        desc: 'Xác minh chủ sở hữu hiện tại, khóa tiền trong ký quỹ và chuyển vé an toàn cho người mua.',
        security: 'Tiết lộ có chọn lọc và hợp đồng thông minh',
        successResult: 'Vé và tiền ký quỹ được chuyển giao trong cùng một giao dịch: người mua nhận vé đã xác thực, còn tiền chỉ được giải ngân khi hoàn tất.',
        steps: [
          { label: 'Xác minh quyền sở hữu', action: 'Kiểm tra chủ vé', logText: 'Mã giao dịch mua ban đầu và chữ ký của đơn vị phát hành xác nhận người bán là chủ sở hữu hợp lệ.' },
          { label: 'Khóa tiền ký quỹ', action: 'Tạo giao dịch ký quỹ', logText: 'Hợp đồng thông minh ký quỹ khóa tiền cho đến khi chuyển vé hoàn tất, đồng thời ngăn một vé bị bán hai lần.' },
          { label: 'Hoàn tất chuyển nhượng', action: 'Chuyển vé', logText: 'Quyền sở hữu vé được cập nhật sang ví của người mua và tiền ký quỹ được giải ngân cho người bán.' }
        ]
      }
    ]
  }
};

LIST_DEMO_PAGE_TRANSLATIONS.es.scenarios.forEach((scenario: any, index: number) => {
  const de = LIST_DEMO_PAGE_TRANSLATIONS.de.scenarios[index];
  const ja = LIST_DEMO_PAGE_TRANSLATIONS.ja.scenarios[index];
  const vi = LIST_DEMO_PAGE_TRANSLATIONS.vi.scenarios[index];
  if (!de || !ja || !vi || scenario.id !== de.id || scenario.id !== ja.id || scenario.id !== vi.id) {
    throw new Error('ListDemoPageTranslations scenario ordering mismatch');
  }
});
