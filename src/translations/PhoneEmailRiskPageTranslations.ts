/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PHONE_EMAIL_RISK_TRANSLATIONS: any = {
  en: {
    backToPlatform: 'Back to platform',
    badge: 'Phone & Email Risk',
    heroTitleBefore: 'Evaluate phone numbers and ',
    heroTitleHighlight: 'emails for potential risk.',
    heroTitleAfter: ' Detect and prevent fraud by assessing the reputation of phone numbers and email addresses used to create accounts on your platform.',
    getDemo: 'Get a demo',
    howTitle: 'How it works',
    howDesc: 'Incorporate reputation checks seamlessly into your existing workflows to block bad actors instantly before they cause damage.',
    howSteps: [
      { title: 'Input Collection', desc: 'Capture email and phone data silently at critical touchpoints such as signups, password resets, or payout updates.' },
      { title: 'Reputation Screening', desc: 'Run real-time API scans against worldwide telecom registries, burner databases, and proprietary domain reputation scores.' },
      { title: 'Dynamic Enforcement', desc: 'Instantly let clean users pass, auto-reject severe burner bots, or route suspect cases to verification or manual queue.' }
    ],
    simulator: {
      eyebrow: 'Interactive Playground',
      title: 'Reputation & Risk Simulator',
      desc: 'Test and evaluate phone and email signals. Select a preset profile below or enter custom details to execute a mock fraud check.',
      clearCustom: 'Clear Custom Data',
      choosePreset: 'Choose a candidate preset:',
      score: 'Score',
      orCustom: 'Or Custom Parameters',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      scanning: 'Scanning...',
      run: 'Run Risk Evaluation',
      loadingDesc: 'Querying worldwide reputation logs & telecom registries',
      riskScore: 'Risk Score',
      recommendedAction: 'Recommended Action:',
      approveDesc: 'Approve account. The phone number and email exhibit highly credible signals with no fraud histories.',
      reviewDesc: 'Hold for verification. Virtual VoIP phone number detected or slight velocity mismatch found.',
      blockDesc: 'Block instantly. Known burner email provider or malicious activity flags detected.',
      phoneDetails: 'Phone Details',
      emailDetails: 'Email Details',
      carrier: 'Carrier:',
      lineType: 'Line Type:',
      validFormat: 'Valid Format:',
      domain: 'Domain:',
      domainAge: 'Domain Age:',
      disposable: 'Disposable:',
      riskFlags: 'Risk Flags:',
      readyTitle: 'Ready to Evaluate',
      readyDesc: 'Select a candidate configuration on the left to start screening.',
      endpoint: 'POST /v1/reports/phone-email-risk',
      sandboxActive: 'Sandbox Environment Active',
      steps: [
        'Connecting to mobile carrier registry...',
        'Verifying phone number active status and porting logs...',
        'Checking email domain authority and disposable attributes...',
        'Calculating combined reputation risks and fraud velocity...'
      ]
    },
    recommendationLabels: { APPROVE: 'APPROVE', REVIEW: 'REVIEW', BLOCK: 'BLOCK' },
    riskLevels: { Low: 'Low', Medium: 'Medium', High: 'High' },
    riskSuffix: 'Risk',
    yes: 'Yes',
    no: 'No',
    yesRisky: 'Yes (Risky)',
    lineTypes: { Mobile: 'Mobile', Landline: 'Landline', VoIP: 'VoIP', Premium: 'Premium', Disposable: 'Disposable' },
    presets: [
      {
        label: 'Standard User (Low Risk)',
        phoneCarrier: 'Verizon Wireless',
        phoneLineType: 'Mobile',
        phoneCountry: 'US',
        phoneSignals: ['Carrier record matches name', 'Active contract > 12 months', 'No recent SIM swaps'],
        emailDomainAge: '15 years',
        emailSignals: ['Highly reputable domain', 'Active inbox verified', 'Zero spam associations']
      },
      {
        label: 'Suspicious VoIP Signup (Medium Risk)',
        phoneCarrier: 'Twilio / Bandwidth.com',
        phoneLineType: 'VoIP',
        phoneCountry: 'US',
        phoneSignals: ['VoIP / Virtual line detected', 'No name match in carrier registry', 'Recently registered number'],
        emailDomainAge: '3 years',
        emailSignals: ['Reputable domain', 'Inbox verified', 'Found in 1 historical data breach']
      },
      {
        label: 'High-Risk Disposable (High Risk)',
        phoneCarrier: 'Unknown / Virtual Burner',
        phoneLineType: 'VoIP',
        phoneCountry: 'US',
        phoneSignals: ['Burner provider detected', 'High velocity: used in 8 accounts today', 'Mismatched billing zip'],
        emailDomainAge: '2 days',
        emailSignals: ['Disposable email domain', 'Domain created < 48 hours ago', 'High volume spam association']
      }
    ],
    custom: {
      label: 'Custom Evaluation',
      voipCarrier: 'Virtual Network Operator',
      mobileCarrier: 'AT&T Mobility',
      voipSignals: ['VoIP number type detected', 'No carrier match for subscription name'],
      mobileSignals: ['Active mobile number subscription', 'Carrier roaming check passed'],
      disposableDomainAge: '3 days',
      standardDomainAge: '8 years',
      disposableSignals: ['Known disposable domain', 'Domain registered very recently', 'Flagged as high-frequency generator'],
      standardSignals: ['Standard personal/business domain', 'Active MX records', 'No history of malicious spam']
    },
    reportsTitle: 'Explore our phone and email risk reports',
    reports: [
      { title: 'Phone number risk', desc: 'Assess the fraud risk of phone numbers to better identify fake and suspicious users, such as those using VoIPs.' },
      { title: 'Email address risk', desc: 'Assess the reputation of email addresses and proactively block fraudsters associated with risky email addresses.' },
      { title: 'Email address and phone number possession', desc: 'Go beyond risk assessment and confirm whether a user owns the email and phone number they entered.', cta: 'Learn more about email and phone verification' }
    ],
    features: [
      { title: 'Account takeover protection', desc: 'Evaluate how risky an email address or phone number is when a user attempts to change their account credentials or security configurations.' },
      { title: 'Investigate fraud', desc: 'Cross-examine inputted email addresses and phone records against active global scam associations and known credit-bust syndicates.' },
      { title: 'KYC compliance', desc: 'Enrich your Know Your Customer (KYC) identity pipeline with additional telecom verification data and domain ownership checks.' },
      { title: 'Fraud prevention', desc: 'Configure robust logic triggers to automatically accept, reject, or flag registrations based on specific carrier risks or domain anomalies.' }
    ],
    exploreTitle: "Explore more of Identra's identity platform",
    exploreCards: [
      { title: 'Seamless user verification via phone/email.', desc: 'Integrate rapid, secure 2FA and phone-ownership verifications seamlessly.', cta: 'Explore Phone & Email Verification' },
      { title: 'Automate all your identity processes.', desc: 'Set custom workflows to orchestrate, analyze and mitigate identity risks.', cta: 'Explore Automated Workflows' }
    ],
    finalCta: {
      title: 'Ready to get started?',
      desc: 'Get in touch with our identity experts or start exploring our automated verification tools today.',
      primary: 'Get a demo',
      secondary: 'Try it now'
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Riesgo de teléfono y email',
    heroTitleBefore: 'Evalúa números de teléfono y ',
    heroTitleHighlight: 'emails para detectar riesgo potencial.',
    heroTitleAfter: ' Detecta y previene fraude evaluando la reputación de los teléfonos y emails usados para crear cuentas en tu plataforma.',
    getDemo: 'Solicitar una demo',
    howTitle: 'Cómo funciona',
    howDesc: 'Incorpora verificaciones de reputación en tus workflows existentes para bloquear actores maliciosos antes de que causen daño.',
    howSteps: [
      { title: 'Recopilación de datos', desc: 'Captura datos de email y teléfono en puntos críticos como registros, restablecimientos de contraseña o cambios de pago.' },
      { title: 'Revisión de reputación', desc: 'Ejecuta escaneos API en tiempo real contra registros globales de telecomunicaciones, bases de números desechables y puntuaciones propias de reputación de dominios.' },
      { title: 'Aplicación dinámica', desc: 'Permite el paso de usuarios confiables, rechaza bots con datos desechables o enruta casos sospechosos a verificación o revisión manual.' }
    ],
    simulator: {
      eyebrow: 'Entorno interactivo',
      title: 'Simulador de reputación y riesgo',
      desc: 'Prueba y evalúa señales de teléfono y email. Selecciona un perfil predefinido o ingresa datos personalizados para ejecutar una verificación simulada de fraude.',
      clearCustom: 'Borrar datos personalizados',
      choosePreset: 'Elige un perfil predefinido:',
      score: 'Puntuación',
      orCustom: 'O parámetros personalizados',
      phoneNumber: 'Número de teléfono',
      emailAddress: 'Email',
      scanning: 'Escaneando...',
      run: 'Ejecutar evaluación de riesgo',
      loadingDesc: 'Consultando registros globales de reputación y telecomunicaciones',
      riskScore: 'Puntuación de riesgo',
      recommendedAction: 'Acción recomendada:',
      approveDesc: 'Aprobar cuenta. El teléfono y el email muestran señales confiables sin historial de fraude.',
      reviewDesc: 'Retener para verificación. Se detectó un número VoIP virtual o una ligera discrepancia de velocidad.',
      blockDesc: 'Bloquear de inmediato. Se detectó proveedor de email desechable o señales de actividad maliciosa.',
      phoneDetails: 'Detalles del teléfono',
      emailDetails: 'Detalles del email',
      carrier: 'Operador:',
      lineType: 'Tipo de línea:',
      validFormat: 'Formato válido:',
      domain: 'Dominio:',
      domainAge: 'Antigüedad del dominio:',
      disposable: 'Desechable:',
      riskFlags: 'Señales de riesgo:',
      readyTitle: 'Listo para evaluar',
      readyDesc: 'Selecciona una configuración de candidato a la izquierda para iniciar el análisis.',
      endpoint: 'POST /v1/reports/phone-email-risk',
      sandboxActive: 'Entorno sandbox activo',
      steps: ['Conectando con el registro del operador móvil...', 'Verificando estado activo del teléfono y registros de portabilidad...', 'Revisando autoridad del dominio y atributos desechables...', 'Calculando reputación combinada y velocidad de fraude...']
    },
    recommendationLabels: { APPROVE: 'APROBAR', REVIEW: 'REVISAR', BLOCK: 'BLOQUEAR' },
    riskLevels: { Low: 'Bajo', Medium: 'Medio', High: 'Alto' },
    riskSuffix: 'riesgo',
    yes: 'Sí',
    no: 'No',
    yesRisky: 'Sí (riesgoso)',
    lineTypes: { Mobile: 'Móvil', Landline: 'Fijo', VoIP: 'VoIP', Premium: 'Premium', Disposable: 'Desechable' },
    presets: [
      { label: 'Usuario estándar (riesgo bajo)', phoneCarrier: 'Verizon Wireless', phoneLineType: 'Mobile', phoneCountry: 'EE. UU.', phoneSignals: ['El registro del operador coincide con el nombre', 'Contrato activo por más de 12 meses', 'Sin cambios recientes de SIM'], emailDomainAge: '15 años', emailSignals: ['Dominio de alta reputación', 'Buzón activo verificado', 'Sin asociaciones con spam'] },
      { label: 'Registro VoIP sospechoso (riesgo medio)', phoneCarrier: 'Twilio / Bandwidth.com', phoneLineType: 'VoIP', phoneCountry: 'EE. UU.', phoneSignals: ['Línea VoIP / virtual detectada', 'Sin coincidencia de nombre en el registro del operador', 'Número registrado recientemente'], emailDomainAge: '3 años', emailSignals: ['Dominio confiable', 'Buzón verificado', 'Encontrado en 1 filtración histórica'] },
      { label: 'Desechable de alto riesgo', phoneCarrier: 'Desconocido / línea virtual temporal', phoneLineType: 'VoIP', phoneCountry: 'EE. UU.', phoneSignals: ['Proveedor temporal detectado', 'Alta velocidad: usado en 8 cuentas hoy', 'Código postal de facturación no coincide'], emailDomainAge: '2 días', emailSignals: ['Dominio de email desechable', 'Dominio creado hace menos de 48 horas', 'Alta asociación con spam'] }
    ],
    custom: {
      label: 'Evaluación personalizada',
      voipCarrier: 'Operador de red virtual',
      mobileCarrier: 'AT&T Mobility',
      voipSignals: ['Tipo de número VoIP detectado', 'Sin coincidencia de operador para el nombre de suscripción'],
      mobileSignals: ['Suscripción móvil activa', 'Verificación de roaming del operador superada'],
      disposableDomainAge: '3 días',
      standardDomainAge: '8 años',
      disposableSignals: ['Dominio desechable conocido', 'Dominio registrado muy recientemente', 'Marcado como generador de alta frecuencia'],
      standardSignals: ['Dominio personal/empresarial estándar', 'Registros MX activos', 'Sin historial de spam malicioso']
    },
    reportsTitle: 'Explora nuestros informes de riesgo de teléfono y email',
    reports: [
      { title: 'Riesgo de número telefónico', desc: 'Evalúa el riesgo de fraude de los teléfonos para identificar mejor usuarios falsos o sospechosos, como quienes usan VoIP.' },
      { title: 'Riesgo de email', desc: 'Evalúa la reputación de emails y bloquea de forma proactiva a defraudadores asociados con direcciones riesgosas.' },
      { title: 'Posesión de email y teléfono', desc: 'Ve más allá del riesgo y confirma si el usuario posee el email y el teléfono que ingresó.', cta: 'Conoce más sobre verificación de email y teléfono' }
    ],
    features: [
      { title: 'Protección contra toma de cuentas', desc: 'Evalúa el riesgo de un email o teléfono cuando un usuario intenta cambiar credenciales o configuraciones de seguridad.' },
      { title: 'Investigación de fraude', desc: 'Cruza emails y registros telefónicos ingresados con asociaciones globales de estafas y redes conocidas de fraude crediticio.' },
      { title: 'Cumplimiento KYC', desc: 'Enriquece tu flujo Know Your Customer (KYC) con datos adicionales de telecomunicaciones y verificación de propiedad de dominios.' },
      { title: 'Prevención de fraude', desc: 'Configura reglas sólidas para aceptar, rechazar o marcar registros automáticamente según riesgos del operador o anomalías del dominio.' }
    ],
    exploreTitle: 'Explora más de la plataforma de identidad de Identra',
    exploreCards: [
      { title: 'Verificación fluida de usuarios por teléfono/email.', desc: 'Integra verificaciones 2FA y de posesión de teléfono rápidas y seguras.', cta: 'Explorar verificación de teléfono y email' },
      { title: 'Automatiza todos tus procesos de identidad.', desc: 'Define workflows personalizados para orquestar, analizar y mitigar riesgos de identidad.', cta: 'Explorar workflows automatizados' }
    ],
    finalCta: { title: '¿Listo para empezar?', desc: 'Contacta con nuestros expertos en identidad o empieza a explorar hoy nuestras herramientas automatizadas de verificación.', primary: 'Solicitar una demo', secondary: 'Probar ahora' }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: '電話番号・メールリスク',
    heroTitleBefore: '電話番号と',
    heroTitleHighlight: 'メールの潜在リスクを評価。',
    heroTitleAfter: ' アカウント作成に使われる電話番号とメールアドレスの評判を評価し、不正を検知・防止します。',
    getDemo: 'デモを依頼',
    howTitle: '仕組み',
    howDesc: '既存のワークフローに評判チェックを自然に組み込み、被害が出る前に悪質な利用者を即座にブロックします。',
    howSteps: [
      { title: '入力情報の収集', desc: '登録、パスワード再設定、支払い先更新などの重要な接点でメールと電話番号を取得します。' },
      { title: '評判スクリーニング', desc: '世界中の通信事業者レジストリ、使い捨て番号データベース、独自のドメイン評判スコアに対してリアルタイム API スキャンを実行します。' },
      { title: '動的な制御', desc: '問題のないユーザーは通過させ、危険な使い捨てボットは自動拒否し、疑わしいケースは検証または手動キューへ送ります。' }
    ],
    simulator: {
      eyebrow: 'インタラクティブ環境',
      title: '評判・リスクシミュレーター',
      desc: '電話番号とメールのシグナルをテスト評価します。プリセットを選ぶか、カスタム情報を入力して模擬不正チェックを実行できます。',
      clearCustom: 'カスタムデータをクリア',
      choosePreset: '候補プリセットを選択:',
      score: 'スコア',
      orCustom: 'またはカスタム条件',
      phoneNumber: '電話番号',
      emailAddress: 'メールアドレス',
      scanning: 'スキャン中...',
      run: 'リスク評価を実行',
      loadingDesc: '世界中の評判ログと通信事業者レジストリを照会中',
      riskScore: 'リスクスコア',
      recommendedAction: '推奨アクション:',
      approveDesc: 'アカウントを承認。電話番号とメールには信頼性の高いシグナルがあり、不正履歴はありません。',
      reviewDesc: '検証待ち。仮想 VoIP 番号または軽微な速度不一致が検出されました。',
      blockDesc: '即時ブロック。既知の使い捨てメールプロバイダーまたは悪意ある活動シグナルが検出されました。',
      phoneDetails: '電話番号の詳細',
      emailDetails: 'メールの詳細',
      carrier: '通信事業者:',
      lineType: '回線種別:',
      validFormat: '有効な形式:',
      domain: 'ドメイン:',
      domainAge: 'ドメイン年齢:',
      disposable: '使い捨て:',
      riskFlags: 'リスクフラグ:',
      readyTitle: '評価準備完了',
      readyDesc: '左側で候補設定を選択してスクリーニングを開始します。',
      endpoint: 'POST /v1/reports/phone-email-risk',
      sandboxActive: 'Sandbox 環境が有効',
      steps: ['携帯通信事業者レジストリへ接続中...', '電話番号の有効状態とポーティングログを確認中...', 'メールドメインの信頼性と使い捨て属性を確認中...', '統合評判リスクと不正速度を計算中...']
    },
    recommendationLabels: { APPROVE: '承認', REVIEW: 'レビュー', BLOCK: 'ブロック' },
    riskLevels: { Low: '低', Medium: '中', High: '高' },
    riskSuffix: 'リスク',
    yes: 'はい',
    no: 'いいえ',
    yesRisky: 'はい（リスクあり）',
    lineTypes: { Mobile: '携帯', Landline: '固定電話', VoIP: 'VoIP', Premium: 'プレミアム', Disposable: '使い捨て' },
    presets: [
      { label: '標準ユーザー（低リスク）', phoneCarrier: 'Verizon Wireless', phoneLineType: 'Mobile', phoneCountry: '米国', phoneSignals: ['通信事業者の記録が名前と一致', '契約期間が 12 か月超', '最近の SIM 交換なし'], emailDomainAge: '15 年', emailSignals: ['非常に信頼性の高いドメイン', '有効な受信箱を確認済み', 'スパム関連なし'] },
      { label: '疑わしい VoIP 登録（中リスク）', phoneCarrier: 'Twilio / Bandwidth.com', phoneLineType: 'VoIP', phoneCountry: '米国', phoneSignals: ['VoIP / 仮想回線を検出', '通信事業者レジストリで名前一致なし', '最近登録された番号'], emailDomainAge: '3 年', emailSignals: ['信頼できるドメイン', '受信箱を確認済み', '過去のデータ漏えい 1 件で検出'] },
      { label: '高リスクの使い捨て情報', phoneCarrier: '不明 / 仮想バーナー', phoneLineType: 'VoIP', phoneCountry: '米国', phoneSignals: ['バーナープロバイダーを検出', '高頻度: 本日 8 アカウントで使用', '請求先 ZIP が不一致'], emailDomainAge: '2 日', emailSignals: ['使い捨てメールドメイン', 'ドメイン作成から 48 時間未満', '大量スパム関連あり'] }
    ],
    custom: {
      label: 'カスタム評価',
      voipCarrier: '仮想ネットワーク事業者',
      mobileCarrier: 'AT&T Mobility',
      voipSignals: ['VoIP 番号種別を検出', '加入者名に一致する通信事業者情報なし'],
      mobileSignals: ['有効な携帯番号契約', '通信事業者ローミングチェック合格'],
      disposableDomainAge: '3 日',
      standardDomainAge: '8 年',
      disposableSignals: ['既知の使い捨てドメイン', 'ごく最近登録されたドメイン', '高頻度生成元としてフラグ'],
      standardSignals: ['標準的な個人/業務用ドメイン', '有効な MX レコード', '悪意あるスパム履歴なし']
    },
    reportsTitle: '電話番号・メールリスクレポートを見る',
    reports: [
      { title: '電話番号リスク', desc: 'VoIP などを使う偽ユーザーや疑わしいユーザーを見分けるため、電話番号の不正リスクを評価します。' },
      { title: 'メールアドレスリスク', desc: 'メールアドレスの評判を評価し、危険なメールに関連する不正利用者を事前にブロックします。' },
      { title: 'メールと電話番号の所有確認', desc: 'リスク評価に加え、入力されたメールと電話番号をユーザーが所有しているか確認します。', cta: 'メール・電話番号検証について詳しく見る' }
    ],
    features: [
      { title: 'アカウント乗っ取り対策', desc: 'ユーザーが認証情報やセキュリティ設定を変更しようとしたとき、メールや電話番号のリスクを評価します。' },
      { title: '不正調査', desc: '入力されたメールアドレスと電話記録を、世界中の詐欺関連情報や既知の信用不正グループと照合します。' },
      { title: 'KYC コンプライアンス', desc: '追加の通信事業者検証データとドメイン所有確認で Know Your Customer (KYC) の本人確認パイプラインを強化します。' },
      { title: '不正防止', desc: '通信事業者リスクやドメイン異常に基づき、登録を自動承認、拒否、フラグ付けする堅牢なロジックを設定します。' }
    ],
    exploreTitle: 'Identra の本人確認プラットフォームをさらに見る',
    exploreCards: [
      { title: '電話番号/メールによるスムーズなユーザー検証。', desc: '高速で安全な 2FA と電話番号所有確認を自然に統合します。', cta: '電話・メール検証を見る' },
      { title: 'すべての本人確認プロセスを自動化。', desc: 'カスタムワークフローで本人確認リスクを制御、分析、軽減します。', cta: '自動ワークフローを見る' }
    ],
    finalCta: { title: '始める準備はできましたか？', desc: '本人確認の専門家に相談するか、自動検証ツールを今すぐ試してみましょう。', primary: 'デモを依頼', secondary: '今すぐ試す' }
  },
  de: {
    backToPlatform: 'Zurück zur Plattform',
    badge: 'Telefon- und E-Mail-Risiko',
    heroTitleBefore: 'Telefonnummern und ',
    heroTitleHighlight: 'E-Mails auf potenzielle Risiken prüfen.',
    heroTitleAfter: ' Erkennen und verhindern Sie Betrug, indem Sie die Reputation der Telefonnummern und E-Mail-Adressen bewerten, die zur Kontoerstellung auf Ihrer Plattform genutzt werden.',
    getDemo: 'Demo anfragen',
    howTitle: 'So funktioniert es',
    howDesc: 'Binden Sie Reputationsprüfungen nahtlos in bestehende Workflows ein, um böswillige Akteure sofort zu blockieren, bevor Schaden entsteht.',
    howSteps: [
      { title: 'Datenerfassung', desc: 'Erfassen Sie E-Mail- und Telefondaten an kritischen Punkten wie Registrierung, Passwortzurücksetzung oder Auszahlungänderung.' },
      { title: 'Reputationsprüfung', desc: 'Führen Sie Echtzeit-API-Scans gegen weltweite Telekomregister, Burner-Datenbanken und eigene Domain-Reputationswerte aus.' },
      { title: 'Dynamische Durchsetzung', desc: 'Lassen Sie unauffällige Nutzer sofort passieren, lehnen Sie gefährliche Burner-Bots automatisch ab oder leiten Sie Verdachtsfälle zur Verifizierung oder manuellen Prüfung weiter.' }
    ],
    simulator: {
      eyebrow: 'Interaktiver Playground',
      title: 'Reputations- und Risikosimulator',
      desc: 'Testen und bewerten Sie Telefon- und E-Mail-Signale. Wählen Sie ein Preset oder geben Sie eigene Daten ein, um eine simulierte Betrugsprüfung auszuführen.',
      clearCustom: 'Benutzerdefinierte Daten löschen',
      choosePreset: 'Kandidaten-Preset wählen:',
      score: 'Wert',
      orCustom: 'Oder eigene Parameter',
      phoneNumber: 'Telefonnummer',
      emailAddress: 'E-Mail-Adresse',
      scanning: 'Scannen...',
      run: 'Risikobewertung starten',
      loadingDesc: 'Weltweite Reputationslogs und Telekomregister werden abgefragt',
      riskScore: 'Risikowert',
      recommendedAction: 'Empfohlene Aktion:',
      approveDesc: 'Konto freigeben. Telefonnummer und E-Mail zeigen glaubwürdige Signale ohne Betrugshistorie.',
      reviewDesc: 'Zur Verifizierung halten. Virtuelle VoIP-Telefonnummer oder leichte Geschwindigkeitsabweichung erkannt.',
      blockDesc: 'Sofort blockieren. Bekannter Burner-E-Mail-Anbieter oder Hinweise auf bösartige Aktivität erkannt.',
      phoneDetails: 'Telefondetails',
      emailDetails: 'E-Mail-Details',
      carrier: 'Anbieter:',
      lineType: 'Leitungstyp:',
      validFormat: 'Gültiges Format:',
      domain: 'Domain:',
      domainAge: 'Domainalter:',
      disposable: 'Wegwerfadresse:',
      riskFlags: 'Risikohinweise:',
      readyTitle: 'Bereit zur Bewertung',
      readyDesc: 'Wählen Sie links eine Kandidatenkonfiguration, um das Screening zu starten.',
      endpoint: 'POST /v1/reports/phone-email-risk',
      sandboxActive: 'Sandbox-Umgebung aktiv',
      steps: ['Verbindung zum Mobilfunkanbieterregister wird hergestellt...', 'Aktivstatus der Telefonnummer und Portierungslogs werden geprüft...', 'Domainautorität und Wegwerfattribute der E-Mail werden geprüft...', 'Kombinierte Reputationsrisiken und Betrugsgeschwindigkeit werden berechnet...']
    },
    recommendationLabels: { APPROVE: 'FREIGEBEN', REVIEW: 'PRÜFEN', BLOCK: 'BLOCKIEREN' },
    riskLevels: { Low: 'Niedrig', Medium: 'Mittel', High: 'Hoch' },
    riskSuffix: 'Risiko',
    yes: 'Ja',
    no: 'Nein',
    yesRisky: 'Ja (riskant)',
    lineTypes: { Mobile: 'Mobil', Landline: 'Festnetz', VoIP: 'VoIP', Premium: 'Premium', Disposable: 'Wegwerfnummer' },
    presets: [
      { label: 'Standardnutzer (niedriges Risiko)', phoneCarrier: 'Verizon Wireless', phoneLineType: 'Mobile', phoneCountry: 'USA', phoneSignals: ['Anbieterdatensatz stimmt mit Namen überein', 'Aktiver Vertrag länger als 12 Monate', 'Keine aktuellen SIM-Wechsel'], emailDomainAge: '15 Jahre', emailSignals: ['Sehr vertrauenswürdige Domain', 'Aktives Postfach verifiziert', 'Keine Spam-Zuordnungen'] },
      { label: 'Verdächtige VoIP-Registrierung (mittleres Risiko)', phoneCarrier: 'Twilio / Bandwidth.com', phoneLineType: 'VoIP', phoneCountry: 'USA', phoneSignals: ['VoIP- / virtuelle Leitung erkannt', 'Keine Namensübereinstimmung im Anbieterregister', 'Kürzlich registrierte Nummer'], emailDomainAge: '3 Jahre', emailSignals: ['Vertrauenswürdige Domain', 'Postfach verifiziert', 'In 1 historischer Datenpanne gefunden'] },
      { label: 'Hochriskante Wegwerfdaten', phoneCarrier: 'Unbekannt / virtueller Burner', phoneLineType: 'VoIP', phoneCountry: 'USA', phoneSignals: ['Burner-Anbieter erkannt', 'Hohe Geschwindigkeit: heute in 8 Konten genutzt', 'Abweichende Rechnungs-PLZ'], emailDomainAge: '2 Tage', emailSignals: ['Wegwerf-E-Mail-Domain', 'Domain vor weniger als 48 Stunden erstellt', 'Hohe Spam-Zuordnung'] }
    ],
    custom: {
      label: 'Benutzerdefinierte Bewertung',
      voipCarrier: 'Virtueller Netzbetreiber',
      mobileCarrier: 'AT&T Mobility',
      voipSignals: ['VoIP-Nummerntyp erkannt', 'Keine Anbieterübereinstimmung für den Vertragsnamen'],
      mobileSignals: ['Aktiver Mobilfunkvertrag', 'Roamingprüfung des Anbieters bestanden'],
      disposableDomainAge: '3 Tage',
      standardDomainAge: '8 Jahre',
      disposableSignals: ['Bekannte Wegwerf-Domain', 'Domain sehr kürzlich registriert', 'Als Hochfrequenzgenerator markiert'],
      standardSignals: ['Standardmäßige private/geschäftliche Domain', 'Aktive MX-Einträge', 'Keine Historie bösartigen Spams']
    },
    reportsTitle: 'Unsere Telefon- und E-Mail-Risikoberichte entdecken',
    reports: [
      { title: 'Telefonnummernrisiko', desc: 'Bewerten Sie das Betrugsrisiko von Telefonnummern, um gefälschte und verdächtige Nutzer wie VoIP-Nutzer besser zu erkennen.' },
      { title: 'E-Mail-Adressrisiko', desc: 'Bewerten Sie die Reputation von E-Mail-Adressen und blockieren Sie Betrüger mit riskanten Adressen proaktiv.' },
      { title: 'Besitz von E-Mail und Telefonnummer', desc: 'Gehen Sie über Risikobewertung hinaus und bestätigen Sie, ob Nutzer die eingegebene E-Mail und Telefonnummer besitzen.', cta: 'Mehr über E-Mail- und Telefonverifizierung erfahren' }
    ],
    features: [
      { title: 'Schutz vor Kontoübernahme', desc: 'Bewerten Sie das Risiko einer E-Mail-Adresse oder Telefonnummer, wenn Nutzer Kontodaten oder Sicherheitseinstellungen ändern möchten.' },
      { title: 'Betrug untersuchen', desc: 'Gleichen Sie eingegebene E-Mail-Adressen und Telefondaten mit aktiven globalen Betrugszuordnungen und bekannten Kreditbetrugsgruppen ab.' },
      { title: 'KYC-Compliance', desc: 'Erweitern Sie Ihre Know Your Customer (KYC)-Pipeline mit zusätzlichen Telekom-Verifizierungsdaten und Domainbesitzprüfungen.' },
      { title: 'Betrugsprävention', desc: 'Konfigurieren Sie robuste Regeln, um Registrierungen anhand bestimmter Anbieterrisiken oder Domainanomalien automatisch zu akzeptieren, abzulehnen oder zu markieren.' }
    ],
    exploreTitle: 'Mehr von Identras Identitätsplattform entdecken',
    exploreCards: [
      { title: 'Nahtlose Nutzerverifizierung per Telefon/E-Mail.', desc: 'Integrieren Sie schnelle, sichere 2FA- und Telefonbesitzprüfungen.', cta: 'Telefon- und E-Mail-Verifizierung entdecken' },
      { title: 'Alle Identitätsprozesse automatisieren.', desc: 'Legen Sie individuelle Workflows fest, um Identitätsrisiken zu orchestrieren, zu analysieren und zu mindern.', cta: 'Automatisierte Workflows entdecken' }
    ],
    finalCta: { title: 'Bereit loszulegen?', desc: 'Kontaktieren Sie unsere Identitätsexperten oder erkunden Sie noch heute unsere automatisierten Verifizierungstools.', primary: 'Demo anfragen', secondary: 'Jetzt ausprobieren' }
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    badge: 'Rủi ro điện thoại và email',
    heroTitleBefore: 'Đánh giá số điện thoại và ',
    heroTitleHighlight: 'email để phát hiện rủi ro tiềm ẩn.',
    heroTitleAfter: ' Phát hiện và ngăn gian lận bằng cách đánh giá uy tín của số điện thoại và địa chỉ email được dùng để tạo tài khoản trên nền tảng của bạn.',
    getDemo: 'Nhận bản demo',
    howTitle: 'Cách hoạt động',
    howDesc: 'Tích hợp kiểm tra uy tín vào workflow hiện có để chặn tác nhân xấu ngay lập tức trước khi họ gây thiệt hại.',
    howSteps: [
      { title: 'Thu thập dữ liệu đầu vào', desc: 'Thu thập dữ liệu email và điện thoại tại các điểm quan trọng như đăng ký, đặt lại mật khẩu hoặc cập nhật thông tin nhận tiền.' },
      { title: 'Sàng lọc uy tín', desc: 'Chạy quét API theo thời gian thực với sổ đăng ký viễn thông toàn cầu, cơ sở dữ liệu số dùng một lần và điểm uy tín tên miền độc quyền.' },
      { title: 'Thực thi linh hoạt', desc: 'Cho người dùng sạch đi qua ngay, tự động từ chối bot dùng thông tin tạm thời nghiêm trọng hoặc chuyển ca nghi ngờ sang xác minh hay hàng đợi xét duyệt thủ công.' }
    ],
    simulator: {
      eyebrow: 'Khu thử nghiệm tương tác',
      title: 'Trình mô phỏng uy tín và rủi ro',
      desc: 'Kiểm thử và đánh giá tín hiệu điện thoại, email. Chọn hồ sơ mẫu bên dưới hoặc nhập thông tin tùy chỉnh để chạy kiểm tra gian lận mô phỏng.',
      clearCustom: 'Xóa dữ liệu tùy chỉnh',
      choosePreset: 'Chọn hồ sơ ứng viên mẫu:',
      score: 'Điểm',
      orCustom: 'Hoặc tham số tùy chỉnh',
      phoneNumber: 'Số điện thoại',
      emailAddress: 'Địa chỉ email',
      scanning: 'Đang quét...',
      run: 'Chạy đánh giá rủi ro',
      loadingDesc: 'Đang truy vấn nhật ký uy tín toàn cầu và sổ đăng ký viễn thông',
      riskScore: 'Điểm rủi ro',
      recommendedAction: 'Hành động đề xuất:',
      approveDesc: 'Phê duyệt tài khoản. Số điện thoại và email có tín hiệu rất đáng tin cậy, không có lịch sử gian lận.',
      reviewDesc: 'Giữ lại để xác minh. Phát hiện số điện thoại VoIP ảo hoặc sai lệch nhẹ về tần suất sử dụng.',
      blockDesc: 'Chặn ngay. Phát hiện nhà cung cấp email dùng một lần đã biết hoặc tín hiệu hoạt động độc hại.',
      phoneDetails: 'Chi tiết điện thoại',
      emailDetails: 'Chi tiết email',
      carrier: 'Nhà mạng:',
      lineType: 'Loại đường dây:',
      validFormat: 'Định dạng hợp lệ:',
      domain: 'Tên miền:',
      domainAge: 'Tuổi tên miền:',
      disposable: 'Dùng một lần:',
      riskFlags: 'Cờ rủi ro:',
      readyTitle: 'Sẵn sàng đánh giá',
      readyDesc: 'Chọn một cấu hình ứng viên ở bên trái để bắt đầu sàng lọc.',
      endpoint: 'POST /v1/reports/phone-email-risk',
      sandboxActive: 'Môi trường sandbox đang hoạt động',
      steps: ['Đang kết nối sổ đăng ký nhà mạng di động...', 'Đang xác minh trạng thái hoạt động của số điện thoại và nhật ký chuyển mạng...', 'Đang kiểm tra uy tín tên miền email và thuộc tính dùng một lần...', 'Đang tính toán rủi ro uy tín tổng hợp và tần suất gian lận...']
    },
    recommendationLabels: { APPROVE: 'PHÊ DUYỆT', REVIEW: 'XÉT DUYỆT', BLOCK: 'CHẶN' },
    riskLevels: { Low: 'Thấp', Medium: 'Trung bình', High: 'Cao' },
    riskSuffix: 'rủi ro',
    yes: 'Có',
    no: 'Không',
    yesRisky: 'Có (rủi ro)',
    lineTypes: { Mobile: 'Di động', Landline: 'Cố định', VoIP: 'VoIP', Premium: 'Premium', Disposable: 'Dùng một lần' },
    presets: [
      { label: 'Người dùng tiêu chuẩn (rủi ro thấp)', phoneCarrier: 'Verizon Wireless', phoneLineType: 'Mobile', phoneCountry: 'Hoa Kỳ', phoneSignals: ['Hồ sơ nhà mạng khớp với tên', 'Hợp đồng hoạt động trên 12 tháng', 'Không có lần đổi SIM gần đây'], emailDomainAge: '15 năm', emailSignals: ['Tên miền có uy tín cao', 'Hộp thư đang hoạt động đã được xác minh', 'Không liên quan đến spam'] },
      { label: 'Đăng ký VoIP đáng ngờ (rủi ro trung bình)', phoneCarrier: 'Twilio / Bandwidth.com', phoneLineType: 'VoIP', phoneCountry: 'Hoa Kỳ', phoneSignals: ['Phát hiện đường dây VoIP / ảo', 'Không khớp tên trong sổ đăng ký nhà mạng', 'Số mới được đăng ký gần đây'], emailDomainAge: '3 năm', emailSignals: ['Tên miền uy tín', 'Hộp thư đã xác minh', 'Xuất hiện trong 1 vụ rò rỉ dữ liệu lịch sử'] },
      { label: 'Thông tin dùng một lần rủi ro cao', phoneCarrier: 'Không xác định / số ảo tạm thời', phoneLineType: 'VoIP', phoneCountry: 'Hoa Kỳ', phoneSignals: ['Phát hiện nhà cung cấp số tạm thời', 'Tần suất cao: dùng trong 8 tài khoản hôm nay', 'Mã ZIP thanh toán không khớp'], emailDomainAge: '2 ngày', emailSignals: ['Tên miền email dùng một lần', 'Tên miền được tạo dưới 48 giờ trước', 'Liên quan nhiều đến spam'] }
    ],
    custom: {
      label: 'Đánh giá tùy chỉnh',
      voipCarrier: 'Nhà mạng ảo',
      mobileCarrier: 'AT&T Mobility',
      voipSignals: ['Phát hiện loại số VoIP', 'Không có thông tin nhà mạng khớp với tên đăng ký'],
      mobileSignals: ['Thuê bao di động đang hoạt động', 'Đạt kiểm tra roaming của nhà mạng'],
      disposableDomainAge: '3 ngày',
      standardDomainAge: '8 năm',
      disposableSignals: ['Tên miền dùng một lần đã biết', 'Tên miền được đăng ký rất gần đây', 'Bị gắn cờ là nguồn tạo tần suất cao'],
      standardSignals: ['Tên miền cá nhân/doanh nghiệp tiêu chuẩn', 'Bản ghi MX đang hoạt động', 'Không có lịch sử spam độc hại']
    },
    reportsTitle: 'Khám phá báo cáo rủi ro điện thoại và email',
    reports: [
      { title: 'Rủi ro số điện thoại', desc: 'Đánh giá rủi ro gian lận của số điện thoại để nhận diện tốt hơn người dùng giả mạo hoặc đáng ngờ, chẳng hạn người dùng VoIP.' },
      { title: 'Rủi ro địa chỉ email', desc: 'Đánh giá uy tín của địa chỉ email và chủ động chặn kẻ gian liên quan đến email rủi ro.' },
      { title: 'Quyền sở hữu email và số điện thoại', desc: 'Vượt ra ngoài đánh giá rủi ro và xác nhận người dùng có sở hữu email, số điện thoại họ đã nhập hay không.', cta: 'Tìm hiểu thêm về xác minh email và điện thoại' }
    ],
    features: [
      { title: 'Bảo vệ khỏi chiếm đoạt tài khoản', desc: 'Đánh giá mức rủi ro của email hoặc số điện thoại khi người dùng cố thay đổi thông tin đăng nhập hoặc cấu hình bảo mật.' },
      { title: 'Điều tra gian lận', desc: 'Đối chiếu email và hồ sơ điện thoại đã nhập với các liên kết lừa đảo toàn cầu và nhóm gian lận tín dụng đã biết.' },
      { title: 'Tuân thủ KYC', desc: 'Làm giàu pipeline Know Your Customer (KYC) bằng dữ liệu xác minh viễn thông bổ sung và kiểm tra quyền sở hữu tên miền.' },
      { title: 'Ngăn chặn gian lận', desc: 'Cấu hình quy tắc mạnh để tự động chấp nhận, từ chối hoặc gắn cờ đăng ký dựa trên rủi ro nhà mạng hoặc bất thường tên miền.' }
    ],
    exploreTitle: 'Khám phá thêm nền tảng định danh của Identra',
    exploreCards: [
      { title: 'Xác minh người dùng liền mạch qua điện thoại/email.', desc: 'Tích hợp nhanh chóng các bước xác minh 2FA bảo mật và quyền sở hữu số điện thoại.', cta: 'Khám phá xác minh điện thoại và email' },
      { title: 'Tự động hóa toàn bộ quy trình định danh.', desc: 'Thiết lập workflow tùy chỉnh để điều phối, phân tích và giảm thiểu rủi ro định danh.', cta: 'Khám phá workflow tự động' }
    ],
    finalCta: { title: 'Sẵn sàng bắt đầu?', desc: 'Liên hệ với chuyên gia định danh của chúng tôi hoặc bắt đầu khám phá các công cụ xác minh tự động ngay hôm nay.', primary: 'Nhận bản demo', secondary: 'Dùng thử ngay' }
  }
};
