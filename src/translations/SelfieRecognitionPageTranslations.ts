export const SELFIE_RECOGNITION_TRANSLATIONS: any = {
  en: {
    backToHome: "Back to home",
    tag: "Selfie Recognition Platform",
    heroTitle: "Superior face recognition without compromise.",
    heroDesc: "Industry-leading performance without compromising on compliance, user experience, configurability, or ethics. Authenticate and match users securely in under 1.9 seconds.",
    tryDemo: "Try the demo",
    tryInteractiveMatcher: "Try the interactive matcher simulator",
    performanceLabel: "Performance Standards",
    performanceTitle: "Industry-leading performance without compromise",
    performanceDesc: "Verify real people in seconds. Maintain perfect regulatory adherence while providing a friction-free user verification flow.",
    interactiveLabel: "Interactive Experience",
    simulatorTitle: "Selfie Matcher & Liveness Sandbox",
    simulatorDesc: "Test how Identra's system handles matches, identity mismatches, printed photos, and screen replays in real time. Toggle parameters to see the impact.",
    selectScenario: "Select Simulation Scenario",
    systemParameters: "System Parameters",
    thresholdLabel: "Match Similarity Threshold",
    thresholdDesc: "Minimum confidence score required to approve the comparison. Standard recommendation is 80%.",
    strictLivenessLabel: "Require Strict Liveness Check",
    strictLivenessDesc: "Block printed photos and screen replays even if faces look identical.",
    meshLabel: "Overlay Biometric Landmarks Mesh",
    meshDesc: "Draw facial geometry lines and capture coordinate structures.",
    complianceTitle: "Configure compliance controls",
    complianceDesc: "Fulfill compliance and consent requirements and mitigate risk by configuring the gestures and data you request from users, the verification checks you run, and automated fallback actions.",
    uxTitle: "Create the ideal user experience",
    uxDesc: "Improve pass rates and image quality with real-time guidance and automatically captured selfies. Continuously optimize with A/B testing and easily editable flows.",
    matcherModule: "Biometric Matcher Module",
    engineStatus: "Engine status: ACTIVE",
    scannedIdPortrait: "Scanned ID Portrait",
    idPhotoAlt: "ID photo",
    scanned: "Scanned",
    documentLabel: "Document:",
    jurisdictionLabel: "Jurisdiction:",
    liveSelfie: "Captured Live Selfie",
    selfieAlt: "Selfie",
    recording: "RECORDING",
    captured: "CAPTURED",
    livenessTypeLabel: "Liveness Type:",
    scanResultLabel: "Scan Result:",
    landmarksVerified: "Landmarks Verified ({count} points)",
    facialSimilarityScore: "Facial Similarity Score",
    calculating: "Calculating...",
    similarity: "similarity",
    analyzingVectors: "Analyzing vector alignments",
    progressComplete: "{progress}% complete",
    recalculate: "Recalculate Verification pipeline",
    exploreMoreTitle: "Explore more of Identra's identity platform",
    faqTitle: "Frequently Asked Questions",
    readyTitle: "Ready to get started?",
    readyDesc: "Get in touch or start exploring Identra today. Let us help you design the perfect identity pipeline that scales your onboarding securely.",
    tryItNow: "Try it now",
    decisionAnalyzing: "Biometric scan in progress...",
    decisionLivenessFailed: "Liveness Verification Failed ({type})",
    decisionMismatch: "Identity Mismatch ({score}% < {threshold}% Threshold)",
    decisionMismatchReason: "The mathematical spacing of facial landmarks deviates beyond the acceptable confidence threshold.",
    decisionApproved: "Identity Fully Verified",
    decisionApprovedReason: "Biometric match score is {score}% (exceeds {threshold}% threshold). Live presence verified.",
    statusLabels: {
      APPROVED: "APPROVED",
      FAILED: "FAILED",
      ANALYZING: "ANALYZING"
    },
    livenessTypes: {
      genuine: "Genuine",
      printedSpoof: "Printed Spoof",
      screenReplay: "Screen Replay"
    },
    heroPillars: [
      {
        title: "Ethically-built AI models",
        desc: "Our core models are developed on fully consented, ethically sourced datasets to eliminate demographic bias."
      },
      {
        title: "Uncompromising spoof resistance",
        desc: "Protect your pipeline from advanced presentation attacks, printed photographs, masks, and digital video replays."
      },
      {
        title: "Configurable and automated",
        desc: "Set confidence thresholds, adapt dynamic workflows, and configure user guidelines to fit your risk tolerance."
      }
    ],
    performanceCards: [
      {
        title: "Ethically leverage AI",
        desc: "Leverage models that were developed with ethically sourced data from properly consenting individuals."
      },
      {
        title: "Comply with global regulations",
        desc: "Define how you collect, process, and store data and consent to meet your compliance needs around the world. Store biometric signals locally or use server-side redactions dynamically."
      },
      {
        title: "Resist deepfakes & injection attacks",
        desc: "Ensure trusted human transactions with Identra's selfie liveness detection. Proactively scan for screen reflections, Moire patterns, and flat depth profiles."
      },
      {
        title: "Customize face recognition",
        desc: "Tailor selfie recognition to your needs by specifying requested gestures, risk settings, and match thresholds, then adjust settings instantly as your compliance requirements shift."
      },
      {
        title: "Optimize conversion",
        desc: "Streamline the user experience with smart auto-capture, real-time posture guidance, dynamic error feedback, and customizable themes to match your native app's feel."
      },
      {
        title: "Verify in seconds",
        desc: "Average face recognition verification time is under 1.9 seconds. Provide users with instant verification feedback so they can proceed with their customer journey immediately."
      }
    ],
    scenarios: {
      "chloe-match": {
        name: "Chloe (Genuine Match)",
        subtitle: "Selfie matched against scanned Driver's License",
        livenessDetails: "Passed • Dynamic illumination verified, natural micro-expression and depth checks authentic.",
        country: "United States",
        idType: "Driver's License"
      },
      "identity-mismatch": {
        name: "Sarah (Identity Mismatch)",
        subtitle: "Sarah is taking a live selfie using Chloe's ID card",
        livenessDetails: "Passed • User is a live human, but biometric comparison rejected due to skeletal spacing mismatch.",
        country: "United States",
        idType: "Driver's License"
      },
      "printed-paper-spoof": {
        name: "Marcus (Printed Paper Attack)",
        subtitle: "Marcus holding up a physical photo print of his ID",
        livenessDetails: "Rejected • 2D flat presentation attack detected. No micro-depth changes, paper texture grain scanning failed.",
        country: "Canada",
        idType: "Passport"
      },
      "digital-screen-replay": {
        name: "David (Digital Replay Attack)",
        subtitle: "High-frequency Moire screen projection of David's selfie",
        livenessDetails: "Rejected • High-frequency screen replay attack detected. Identified Moire interference patterns and subpixel matrix grid.",
        country: "United Kingdom",
        idType: "Passport"
      }
    },
    explanationCards: [
      {
        title: "Verify ownership of physical IDs",
        desc: "Capture and match selfies to ID portraits in real time to bind physical IDs to live individuals. Guarantee that the person scanning the ID is the genuine owner of the credential."
      },
      {
        title: "Frictionless user reverification",
        desc: "Capture and match selfies against previously collected ID portraits or selfies to ensure authorized account access during high-risk actions or password resets."
      },
      {
        title: "Strengthen workforce security globally",
        desc: "Ensure employees are who they say they are during onboarding, while accessing sensitive corporate systems, and at other key points throughout their employment life cycle."
      }
    ],
    exploreCards: [
      {
        title: "Estimate age through a selfie.",
        link: "View Selfie Age Estimation"
      },
      {
        title: "Build dynamic age assurance flows.",
        link: "View Dynamic Flow Editor"
      }
    ],
    faqs: [
      {
        q: "How does Selfie Recognition differ from Selfie Liveness checks?",
        a: "Selfie Recognition matches two face biometric vectors to determine if they belong to the same individual, such as comparing a live selfie with a passport photo. Selfie Liveness checks whether the selfie source is a real person in front of the camera rather than a printed photo, mask, or display replay attack."
      },
      {
        q: "How does Identra handle biometric data privacy and compliance?",
        a: "Identra is designed with strict data minimization principles. We support automated redaction rules that delete biometric landmarks, images, and user data immediately after matching is completed, keeping your storage pipeline compliant with GDPR, CCPA, and BIPA laws."
      }
    ]
  },
  es: {
    backToHome: "Volver al inicio",
    tag: "Plataforma de reconocimiento por selfie",
    heroTitle: "Reconocimiento facial superior sin concesiones.",
    heroDesc: "Rendimiento líder del sector sin comprometer cumplimiento, experiencia de usuario, configurabilidad ni ética. Autentica y compara usuarios de forma segura en menos de 1,9 segundos.",
    tryDemo: "Probar la demo",
    tryInteractiveMatcher: "Probar el simulador interactivo de comparación",
    performanceLabel: "Estándares de rendimiento",
    performanceTitle: "Rendimiento líder del sector sin concesiones",
    performanceDesc: "Verifica personas reales en segundos. Mantén una adhesión regulatoria sólida mientras ofreces un flujo de verificación sin fricción.",
    interactiveLabel: "Experiencia interactiva",
    simulatorTitle: "Entorno de pruebas de comparación de selfies y liveness",
    simulatorDesc: "Prueba cómo el sistema de Identra gestiona coincidencias, discrepancias de identidad, fotos impresas y repeticiones de pantalla en tiempo real. Ajusta parámetros para ver el impacto.",
    selectScenario: "Seleccionar escenario de simulación",
    systemParameters: "Parámetros del sistema",
    thresholdLabel: "Umbral de similitud de coincidencia",
    thresholdDesc: "Puntuación mínima de confianza necesaria para aprobar la comparación. La recomendación estándar es 80%.",
    strictLivenessLabel: "Exigir comprobación estricta de liveness",
    strictLivenessDesc: "Bloquea fotos impresas y repeticiones de pantalla aunque los rostros parezcan idénticos.",
    meshLabel: "Superponer malla de puntos biométricos",
    meshDesc: "Dibuja líneas de geometría facial y captura estructuras de coordenadas.",
    complianceTitle: "Configurar controles de cumplimiento",
    complianceDesc: "Cumple requisitos de consentimiento y cumplimiento, y reduce el riesgo configurando los gestos y datos que solicitas, las verificaciones que ejecutas y las acciones automáticas de respaldo.",
    uxTitle: "Crear la experiencia de usuario ideal",
    uxDesc: "Mejora las tasas de aprobación y la calidad de imagen con guía en tiempo real y selfies capturadas automáticamente. Optimiza de forma continua con pruebas A/B y flujos fáciles de editar.",
    matcherModule: "Módulo comparador biométrico",
    engineStatus: "Estado del motor: ACTIVO",
    scannedIdPortrait: "Retrato del documento escaneado",
    idPhotoAlt: "Foto del documento",
    scanned: "Escaneado",
    documentLabel: "Documento:",
    jurisdictionLabel: "Jurisdicción:",
    liveSelfie: "Selfie en vivo capturada",
    selfieAlt: "Selfie",
    recording: "GRABANDO",
    captured: "CAPTURADO",
    livenessTypeLabel: "Tipo de liveness:",
    scanResultLabel: "Resultado del escaneo:",
    landmarksVerified: "Puntos biométricos verificados ({count} puntos)",
    facialSimilarityScore: "Puntuación de similitud facial",
    calculating: "Calculando...",
    similarity: "similitud",
    analyzingVectors: "Analizando alineaciones vectoriales",
    progressComplete: "{progress}% completado",
    recalculate: "Recalcular canal de verificación",
    exploreMoreTitle: "Explora más de la plataforma de identidad de Identra",
    faqTitle: "Preguntas frecuentes",
    readyTitle: "¿Listo para empezar?",
    readyDesc: "Ponte en contacto o empieza a explorar Identra hoy. Te ayudamos a diseñar el canal de identidad ideal para escalar tu incorporación con seguridad.",
    tryItNow: "Probar ahora",
    decisionAnalyzing: "Escaneo biométrico en curso...",
    decisionLivenessFailed: "Falló la verificación de liveness ({type})",
    decisionMismatch: "Discrepancia de identidad ({score}% < umbral de {threshold}%)",
    decisionMismatchReason: "La separación matemática de los puntos faciales se desvía más allá del umbral de confianza aceptable.",
    decisionApproved: "Identidad totalmente verificada",
    decisionApprovedReason: "La puntuación de coincidencia biométrica es {score}% (supera el umbral de {threshold}%). Presencia en vivo verificada.",
    statusLabels: {
      APPROVED: "APROBADO",
      FAILED: "FALLIDO",
      ANALYZING: "ANALIZANDO"
    },
    livenessTypes: {
      genuine: "Genuino",
      printedSpoof: "Suplantación impresa",
      screenReplay: "Repetición de pantalla"
    },
    heroPillars: [
      {
        title: "Modelos de IA creados éticamente",
        desc: "Nuestros modelos principales se desarrollan con conjuntos de datos éticos y con consentimiento pleno para eliminar sesgos demográficos."
      },
      {
        title: "Resistencia sólida a la suplantación",
        desc: "Protege tu canal frente a ataques de presentación avanzados, fotografías impresas, máscaras y repeticiones de video digitales."
      },
      {
        title: "Configurable y automatizado",
        desc: "Define umbrales de confianza, adapta flujos dinámicos y configura guías de usuario según tu tolerancia al riesgo."
      }
    ],
    performanceCards: [
      {
        title: "Aprovecha la IA de forma ética",
        desc: "Usa modelos desarrollados con datos éticos de personas que dieron consentimiento adecuado."
      },
      {
        title: "Cumple regulaciones globales",
        desc: "Define cómo recopilas, procesas y almacenas datos y consentimientos para cumplir tus necesidades en todo el mundo. Guarda señales biométricas localmente o usa redacciones del lado del servidor de forma dinámica."
      },
      {
        title: "Resiste deepfakes y ataques de inyección",
        desc: "Asegura transacciones humanas confiables con la detección de liveness de selfie de Identra. Analiza proactivamente reflejos de pantalla, patrones Moire y perfiles de profundidad planos."
      },
      {
        title: "Personaliza el reconocimiento facial",
        desc: "Adapta el reconocimiento por selfie especificando gestos solicitados, ajustes de riesgo y umbrales de coincidencia, y cambia la configuración al instante cuando evolucionen tus requisitos de cumplimiento."
      },
      {
        title: "Optimiza la conversión",
        desc: "Agiliza la experiencia con captura automática inteligente, guía de postura en tiempo real, mensajes de error dinámicos y temas personalizables que encajan con tu app nativa."
      },
      {
        title: "Verifica en segundos",
        desc: "El tiempo medio de verificación por reconocimiento facial es inferior a 1,9 segundos. Da a los usuarios respuesta inmediata para que continúen su recorrido al instante."
      }
    ],
    scenarios: {
      "chloe-match": {
        name: "Chloe (coincidencia genuina)",
        subtitle: "Selfie comparada con licencia de conducir escaneada",
        livenessDetails: "Aprobado • Iluminación dinámica verificada; microexpresión natural y comprobaciones de profundidad auténticas.",
        country: "Estados Unidos",
        idType: "Licencia de conducir"
      },
      "identity-mismatch": {
        name: "Sarah (discrepancia de identidad)",
        subtitle: "Sarah toma una selfie en vivo usando el documento de Chloe",
        livenessDetails: "Aprobado • La usuaria es una identra viva, pero la comparación biométrica fue rechazada por diferencia en el espaciado estructural.",
        country: "Estados Unidos",
        idType: "Licencia de conducir"
      },
      "printed-paper-spoof": {
        name: "Marcus (ataque con papel impreso)",
        subtitle: "Marcus muestra una foto física impresa de su documento",
        livenessDetails: "Rechazado • Ataque de presentación plana 2D detectado. Sin cambios de microprofundidad; falló el análisis de textura del papel.",
        country: "Canadá",
        idType: "Pasaporte"
      },
      "digital-screen-replay": {
        name: "David (ataque de repetición digital)",
        subtitle: "Proyección de pantalla con patrón Moire de alta frecuencia de la selfie de David",
        livenessDetails: "Rechazado • Ataque de repetición de pantalla detectado. Se identificaron patrones Moire y matriz de subpíxeles.",
        country: "Reino Unido",
        idType: "Pasaporte"
      }
    },
    explanationCards: [
      {
        title: "Verifica la titularidad de documentos físicos",
        desc: "Captura y compara selfies con retratos de documentos en tiempo real para vincular documentos físicos con personas vivas. Garantiza que quien escanea el documento sea su titular genuino."
      },
      {
        title: "Reverificación de usuarios sin fricción",
        desc: "Captura y compara selfies con retratos de documentos o selfies recopiladas previamente para asegurar acceso autorizado durante acciones de alto riesgo o restablecimientos de contraseña."
      },
      {
        title: "Refuerza la seguridad laboral global",
        desc: "Asegura que los empleados sean quienes dicen ser durante la incorporación, al acceder a sistemas corporativos sensibles y en otros puntos clave del ciclo laboral."
      }
    ],
    exploreCards: [
      {
        title: "Estima la edad mediante una selfie.",
        link: "Ver estimación de edad por selfie"
      },
      {
        title: "Construye flujos dinámicos de garantía de edad.",
        link: "Ver editor de flujo dinámico"
      }
    ],
    faqs: [
      {
        q: "¿En qué se diferencia Selfie Recognition de las comprobaciones de Selfie Liveness?",
        a: "Selfie Recognition compara dos vectores biométricos faciales para determinar si pertenecen a la misma identra, por ejemplo al comparar una selfie en vivo con la foto de un pasaporte. Selfie Liveness comprueba si la fuente de la selfie es una identra real frente a la cámara y no una foto impresa, máscara o repetición en pantalla."
      },
      {
        q: "¿Cómo gestiona Identra la privacidad y el cumplimiento de datos biométricos?",
        a: "Identra está diseñado con principios estrictos de minimización de datos. Admitimos reglas automáticas de redacción que eliminan puntos biométricos, imágenes y datos de usuario justo después de finalizar la comparación, manteniendo tu almacenamiento alineado con GDPR, CCPA y BIPA."
      }
    ]
  },
  ja: {
    backToHome: "ホームに戻る",
    tag: "セルフィー認識プラットフォーム",
    heroTitle: "妥協のない高精度な顔認識。",
    heroDesc: "コンプライアンス、ユーザー体験、設定性、倫理性を損なわずに、業界トップクラスの性能を提供します。1.9秒未満でユーザーを安全に認証し照合します。",
    tryDemo: "デモを試す",
    tryInteractiveMatcher: "インタラクティブな照合シミュレーターを試す",
    performanceLabel: "性能基準",
    performanceTitle: "妥協のない業界トップクラスの性能",
    performanceDesc: "実在する人物を数秒で確認します。規制要件を守りながら、摩擦の少ない本人確認フローを提供します。",
    interactiveLabel: "インタラクティブ体験",
    simulatorTitle: "セルフィー照合とlivenessサンドボックス",
    simulatorDesc: "Identraのシステムが一致、本人不一致、印刷写真、画面リプレイをリアルタイムでどう処理するかを試せます。パラメーターを切り替えて影響を確認してください。",
    selectScenario: "シミュレーションシナリオを選択",
    systemParameters: "システムパラメーター",
    thresholdLabel: "照合類似度しきい値",
    thresholdDesc: "比較を承認するために必要な最小信頼スコアです。標準推奨値は80%です。",
    strictLivenessLabel: "厳格なlivenessチェックを必須にする",
    strictLivenessDesc: "顔が同一に見えても、印刷写真や画面リプレイをブロックします。",
    meshLabel: "生体ランドマークメッシュを重ねる",
    meshDesc: "顔の幾何線を描画し、座標構造を取得します。",
    complianceTitle: "コンプライアンス制御を設定",
    complianceDesc: "ユーザーに求めるジェスチャーやデータ、実行する確認、フォールバック動作を設定し、同意とコンプライアンス要件を満たしながらリスクを軽減します。",
    uxTitle: "理想的なユーザー体験を作成",
    uxDesc: "リアルタイムガイドと自動セルフィー撮影で通過率と画像品質を向上します。A/Bテストと編集しやすいフローで継続的に最適化できます。",
    matcherModule: "生体照合モジュール",
    engineStatus: "エンジン状態: 稼働中",
    scannedIdPortrait: "スキャン済みID写真",
    idPhotoAlt: "ID写真",
    scanned: "スキャン済み",
    documentLabel: "書類:",
    jurisdictionLabel: "管轄:",
    liveSelfie: "取得済みライブセルフィー",
    selfieAlt: "セルフィー",
    recording: "記録中",
    captured: "取得済み",
    livenessTypeLabel: "liveness種別:",
    scanResultLabel: "スキャン結果:",
    landmarksVerified: "ランドマーク検証済み（{count}点）",
    facialSimilarityScore: "顔類似度スコア",
    calculating: "計算中...",
    similarity: "類似度",
    analyzingVectors: "ベクトル整列を解析中",
    progressComplete: "{progress}% 完了",
    recalculate: "検証パイプラインを再計算",
    exploreMoreTitle: "Identraの本人確認プラットフォームをさらに見る",
    faqTitle: "よくある質問",
    readyTitle: "始める準備はできましたか？",
    readyDesc: "Identraにお問い合わせいただくか、今すぐ試してみてください。安全にスケールする最適な本人確認パイプラインの設計を支援します。",
    tryItNow: "今すぐ試す",
    decisionAnalyzing: "生体スキャンを実行中...",
    decisionLivenessFailed: "liveness検証に失敗しました（{type}）",
    decisionMismatch: "本人不一致（{score}% < しきい値 {threshold}%）",
    decisionMismatchReason: "顔ランドマーク間隔の数学的差異が、許容される信頼しきい値を超えています。",
    decisionApproved: "本人確認が完了しました",
    decisionApprovedReason: "生体照合スコアは{score}%です（{threshold}%のしきい値を超過）。ライブプレゼンスを確認済みです。",
    statusLabels: {
      APPROVED: "承認",
      FAILED: "失敗",
      ANALYZING: "解析中"
    },
    livenessTypes: {
      genuine: "真正",
      printedSpoof: "印刷物によるなりすまし",
      screenReplay: "画面リプレイ"
    },
    heroPillars: [
      {
        title: "倫理的に構築されたAIモデル",
        desc: "主要モデルは、完全な同意を得た倫理的なデータセットで開発され、人口統計上の偏りを抑えています。"
      },
      {
        title: "妥協のないなりすまし耐性",
        desc: "高度な提示攻撃、印刷写真、マスク、デジタル動画リプレイからパイプラインを保護します。"
      },
      {
        title: "設定可能で自動化",
        desc: "信頼しきい値を設定し、動的ワークフローを調整し、リスク許容度に合わせてユーザーガイドを構成できます。"
      }
    ],
    performanceCards: [
      {
        title: "AIを倫理的に活用",
        desc: "適切な同意を得た個人由来の倫理的データで開発されたモデルを利用できます。"
      },
      {
        title: "グローバル規制に対応",
        desc: "世界各地のコンプライアンス要件に合わせて、データと同意の収集、処理、保存方法を定義できます。生体信号をローカルに保存することも、サーバー側の動的な削除処理を使うこともできます。"
      },
      {
        title: "ディープフェイクと注入攻撃に対抗",
        desc: "Identraのセルフィーliveness検出で信頼できる人間の取引を守ります。画面反射、Moireパターン、平面的な深度プロファイルを事前に検査します。"
      },
      {
        title: "顔認識をカスタマイズ",
        desc: "要求するジェスチャー、リスク設定、照合しきい値を指定してセルフィー認識を調整し、コンプライアンス要件の変化に応じて即座に設定を変更できます。"
      },
      {
        title: "コンバージョンを最適化",
        desc: "スマートな自動撮影、リアルタイム姿勢ガイド、動的なエラー表示、ネイティブアプリに合うカスタムテーマでユーザー体験を効率化します。"
      },
      {
        title: "数秒で確認",
        desc: "顔認識による平均確認時間は1.9秒未満です。ユーザーに即時フィードバックを返し、次の手続きへすぐ進めるようにします。"
      }
    ],
    scenarios: {
      "chloe-match": {
        name: "Chloe（真正一致）",
        subtitle: "スキャン済み運転免許証とセルフィーを照合",
        livenessDetails: "合格 • 動的照明、自然な微表情、深度チェックが真正であることを確認しました。",
        country: "米国",
        idType: "運転免許証"
      },
      "identity-mismatch": {
        name: "Sarah（本人不一致）",
        subtitle: "SarahがChloeのIDカードを使ってライブセルフィーを撮影",
        livenessDetails: "合格 • ユーザーは実在する人物ですが、骨格間隔の不一致により生体比較は拒否されました。",
        country: "米国",
        idType: "運転免許証"
      },
      "printed-paper-spoof": {
        name: "Marcus（印刷写真攻撃）",
        subtitle: "MarcusがID写真の印刷物を掲げている",
        livenessDetails: "拒否 • 2Dの平面提示攻撃を検出。微細な深度変化がなく、紙質テクスチャのスキャンに失敗しました。",
        country: "カナダ",
        idType: "パスポート"
      },
      "digital-screen-replay": {
        name: "David（デジタルリプレイ攻撃）",
        subtitle: "Davidのセルフィーを高周波Moireパターンの画面で投影",
        livenessDetails: "拒否 • 高周波の画面リプレイ攻撃を検出。Moire干渉パターンとサブピクセル格子を識別しました。",
        country: "英国",
        idType: "パスポート"
      }
    },
    explanationCards: [
      {
        title: "物理IDの所有者を確認",
        desc: "セルフィーとID写真をリアルタイムで照合し、物理IDと実在する個人を結び付けます。IDをスキャンしている人物が資格情報の正当な所有者であることを確認します。"
      },
      {
        title: "摩擦の少ないユーザー再確認",
        desc: "過去に取得したID写真やセルフィーと新しいセルフィーを照合し、高リスク操作やパスワードリセット時の正当なアカウントアクセスを確認します。"
      },
      {
        title: "グローバルな従業員セキュリティを強化",
        desc: "オンボーディング、機密性の高い社内システムへのアクセス、雇用ライフサイクル上の重要な場面で、従業員が本人であることを確認します。"
      }
    ],
    exploreCards: [
      {
        title: "セルフィーで年齢を推定。",
        link: "セルフィー年齢推定を見る"
      },
      {
        title: "動的な年齢保証フローを構築。",
        link: "Dynamic Flow Editorを見る"
      }
    ],
    faqs: [
      {
        q: "Selfie RecognitionとSelfie Livenessチェックの違いは何ですか？",
        a: "Selfie Recognitionは2つの顔生体ベクトルを照合し、同一人物かどうかを判断します。たとえばライブセルフィーとパスポート写真の比較です。Selfie Livenessは、セルフィーの入力元が印刷写真、マスク、画面リプレイではなく、カメラの前にいる実在の人物かを確認します。"
      },
      {
        q: "Identraは生体データのプライバシーとコンプライアンスをどう扱いますか？",
        a: "Identraは厳格なデータ最小化原則に基づいて設計されています。照合完了直後に生体ランドマーク、画像、ユーザーデータを削除する自動リダクションルールをサポートし、GDPR、CCPA、BIPAに対応した保存パイプラインを維持できます。"
      }
    ]
  },
  de: {
    backToHome: "Zur Startseite",
    tag: "Plattform für Selfie-Erkennung",
    heroTitle: "Überlegene Gesichtserkennung ohne Kompromisse.",
    heroDesc: "Branchenführende Leistung, ohne Compliance, Nutzererlebnis, Konfigurierbarkeit oder Ethik zu beeinträchtigen. Authentifizieren und vergleichen Sie Nutzer sicher in unter 1,9 Sekunden.",
    tryDemo: "Demo testen",
    tryInteractiveMatcher: "Interaktiven Matcher-Simulator testen",
    performanceLabel: "Leistungsstandards",
    performanceTitle: "Branchenführende Leistung ohne Kompromisse",
    performanceDesc: "Verifizieren Sie echte Personen in Sekunden. Halten Sie regulatorische Anforderungen ein und bieten Sie gleichzeitig einen reibungsarmen Verifizierungsablauf.",
    interactiveLabel: "Interaktive Erfahrung",
    simulatorTitle: "Selfie-Matcher und Liveness-Sandbox",
    simulatorDesc: "Testen Sie in Echtzeit, wie Identra Übereinstimmungen, Identitätsabweichungen, gedruckte Fotos und Bildschirm-Replays verarbeitet. Ändern Sie Parameter und sehen Sie die Auswirkungen.",
    selectScenario: "Simulationsszenario auswählen",
    systemParameters: "Systemparameter",
    thresholdLabel: "Schwellenwert für Match-Ähnlichkeit",
    thresholdDesc: "Mindest-Konfidenzwert, der zur Freigabe des Vergleichs erforderlich ist. Die Standardempfehlung liegt bei 80%.",
    strictLivenessLabel: "Strenge Liveness-Prüfung verlangen",
    strictLivenessDesc: "Blockiert gedruckte Fotos und Bildschirm-Replays, selbst wenn die Gesichter identisch wirken.",
    meshLabel: "Biometrisches Landmarken-Mesh anzeigen",
    meshDesc: "Zeichnet Linien der Gesichtsgeometrie und erfasst Koordinatenstrukturen.",
    complianceTitle: "Compliance-Kontrollen konfigurieren",
    complianceDesc: "Erfüllen Sie Compliance- und Einwilligungsanforderungen und mindern Sie Risiken, indem Sie die angeforderten Gesten und Daten, die ausgeführten Prüfungen und automatisierte Fallback-Aktionen konfigurieren.",
    uxTitle: "Ideales Nutzererlebnis schaffen",
    uxDesc: "Verbessern Sie Bestehensraten und Bildqualität durch Echtzeitführung und automatisch erfasste Selfies. Optimieren Sie kontinuierlich mit A/B-Tests und einfach editierbaren Flows.",
    matcherModule: "Biometrisches Matcher-Modul",
    engineStatus: "Engine-Status: AKTIV",
    scannedIdPortrait: "Gescannter Ausweisporträt",
    idPhotoAlt: "Ausweisfoto",
    scanned: "Gescannt",
    documentLabel: "Dokument:",
    jurisdictionLabel: "Rechtsgebiet:",
    liveSelfie: "Erfasstes Live-Selfie",
    selfieAlt: "Selfie",
    recording: "AUFNAHME",
    captured: "ERFASST",
    livenessTypeLabel: "Liveness-Typ:",
    scanResultLabel: "Scan-Ergebnis:",
    landmarksVerified: "Landmarken verifiziert ({count} Punkte)",
    facialSimilarityScore: "Gesichtsähnlichkeitswert",
    calculating: "Berechnung...",
    similarity: "Ähnlichkeit",
    analyzingVectors: "Vektor-Ausrichtung wird analysiert",
    progressComplete: "{progress}% abgeschlossen",
    recalculate: "Verifizierungspipeline neu berechnen",
    exploreMoreTitle: "Mehr von Identras Identitätsplattform entdecken",
    faqTitle: "Häufig gestellte Fragen",
    readyTitle: "Bereit loszulegen?",
    readyDesc: "Kontaktieren Sie uns oder erkunden Sie Identra noch heute. Wir helfen Ihnen, die passende Identitätspipeline zu entwerfen, die Ihr Onboarding sicher skaliert.",
    tryItNow: "Jetzt testen",
    decisionAnalyzing: "Biometrischer Scan läuft...",
    decisionLivenessFailed: "Liveness-Verifizierung fehlgeschlagen ({type})",
    decisionMismatch: "Identitätsabweichung ({score}% < {threshold}% Schwelle)",
    decisionMismatchReason: "Die mathematische Verteilung der Gesichtslandmarken weicht über den zulässigen Konfidenzschwellenwert hinaus ab.",
    decisionApproved: "Identität vollständig verifiziert",
    decisionApprovedReason: "Der biometrische Match-Wert beträgt {score}% und überschreitet die Schwelle von {threshold}%. Live-Präsenz verifiziert.",
    statusLabels: {
      APPROVED: "FREIGEGEBEN",
      FAILED: "FEHLGESCHLAGEN",
      ANALYZING: "ANALYSE"
    },
    livenessTypes: {
      genuine: "Echt",
      printedSpoof: "Gedruckter Spoof",
      screenReplay: "Bildschirm-Replay"
    },
    heroPillars: [
      {
        title: "Ethisch entwickelte KI-Modelle",
        desc: "Unsere Kernmodelle werden mit vollständig eingewilligten, ethisch beschafften Datensätzen entwickelt, um demografische Verzerrungen zu reduzieren."
      },
      {
        title: "Kompromisslose Spoofing-Abwehr",
        desc: "Schützen Sie Ihre Pipeline vor fortgeschrittenen Präsentationsangriffen, gedruckten Fotos, Masken und digitalen Video-Replays."
      },
      {
        title: "Konfigurierbar und automatisiert",
        desc: "Legen Sie Konfidenzschwellen fest, passen Sie dynamische Workflows an und konfigurieren Sie Nutzerhinweise passend zu Ihrer Risikotoleranz."
      }
    ],
    performanceCards: [
      {
        title: "KI ethisch nutzen",
        desc: "Nutzen Sie Modelle, die mit ethisch beschafften Daten von ordnungsgemäß einwilligenden Personen entwickelt wurden."
      },
      {
        title: "Globale Vorschriften einhalten",
        desc: "Definieren Sie, wie Sie Daten und Einwilligungen weltweit erfassen, verarbeiten und speichern. Speichern Sie biometrische Signale lokal oder nutzen Sie dynamische serverseitige Redaktionen."
      },
      {
        title: "Deepfakes und Injection-Angriffe abwehren",
        desc: "Sichern Sie vertrauenswürdige menschliche Transaktionen mit Identras Selfie-Liveness-Erkennung. Prüfen Sie proaktiv Bildschirmreflexionen, Moire-Muster und flache Tiefenprofile."
      },
      {
        title: "Gesichtserkennung anpassen",
        desc: "Passen Sie Selfie-Erkennung über angeforderte Gesten, Risikoeinstellungen und Match-Schwellenwerte an und ändern Sie Einstellungen sofort, wenn sich Compliance-Anforderungen verschieben."
      },
      {
        title: "Konversion optimieren",
        desc: "Optimieren Sie das Nutzererlebnis mit intelligenter Auto-Erfassung, Echtzeit-Haltungshinweisen, dynamischem Fehlerfeedback und anpassbaren Designs für Ihre native App."
      },
      {
        title: "In Sekunden verifizieren",
        desc: "Die durchschnittliche Verifizierungszeit per Gesichtserkennung liegt unter 1,9 Sekunden. Geben Sie Nutzern sofortiges Feedback, damit sie ihre Customer Journey unmittelbar fortsetzen können."
      }
    ],
    scenarios: {
      "chloe-match": {
        name: "Chloe (echte Übereinstimmung)",
        subtitle: "Selfie mit gescanntem Führerschein abgeglichen",
        livenessDetails: "Bestanden • Dynamische Beleuchtung, natürliche Mikroexpressionen und Tiefenprüfungen authentisch.",
        country: "Vereinigte Staaten",
        idType: "Führerschein"
      },
      "identity-mismatch": {
        name: "Sarah (Identitätsabweichung)",
        subtitle: "Sarah nimmt ein Live-Selfie mit Chloes Ausweiskarte auf",
        livenessDetails: "Bestanden • Die Nutzerin ist eine lebende Person, aber der biometrische Vergleich wurde wegen abweichender Skelettabstände abgelehnt.",
        country: "Vereinigte Staaten",
        idType: "Führerschein"
      },
      "printed-paper-spoof": {
        name: "Marcus (Angriff mit gedrucktem Foto)",
        subtitle: "Marcus hält einen physischen Fotoausdruck seines Ausweises hoch",
        livenessDetails: "Abgelehnt • Flacher 2D-Präsentationsangriff erkannt. Keine Mikro-Tiefenänderungen; Papiertexturprüfung fehlgeschlagen.",
        country: "Kanada",
        idType: "Reisepass"
      },
      "digital-screen-replay": {
        name: "David (digitaler Replay-Angriff)",
        subtitle: "Hochfrequente Moire-Bildschirmprojektion von Davids Selfie",
        livenessDetails: "Abgelehnt • Hochfrequenter Bildschirm-Replay-Angriff erkannt. Moire-Interferenzmuster und Subpixelmatrix identifiziert.",
        country: "Vereinigtes Königreich",
        idType: "Reisepass"
      }
    },
    explanationCards: [
      {
        title: "Eigentum an physischen IDs verifizieren",
        desc: "Erfassen und vergleichen Sie Selfies in Echtzeit mit Ausweisporträts, um physische IDs an lebende Personen zu binden. Stellen Sie sicher, dass die Person, die den Ausweis scannt, der echte Inhaber ist."
      },
      {
        title: "Reibungsarme Nutzer-Reverifizierung",
        desc: "Erfassen und vergleichen Sie Selfies mit zuvor gesammelten Ausweisporträts oder Selfies, um autorisierten Kontozugriff bei risikoreichen Aktionen oder Passwortzurücksetzungen sicherzustellen."
      },
      {
        title: "Globale Workforce-Sicherheit stärken",
        desc: "Stellen Sie beim Onboarding, beim Zugriff auf sensible Unternehmenssysteme und an weiteren Schlüsselpunkten des Beschäftigungszyklus sicher, dass Mitarbeitende wirklich die angegebenen Personen sind."
      }
    ],
    exploreCards: [
      {
        title: "Alter per Selfie schätzen.",
        link: "Selfie-Altersschätzung ansehen"
      },
      {
        title: "Dynamische Age-Assurance-Flows erstellen.",
        link: "Dynamic Flow Editor ansehen"
      }
    ],
    faqs: [
      {
        q: "Wie unterscheidet sich Selfie Recognition von Selfie-Liveness-Prüfungen?",
        a: "Selfie Recognition vergleicht zwei biometrische Gesichtsvektoren, um festzustellen, ob sie zur selben Person gehören, zum Beispiel ein Live-Selfie mit einem Reisepassfoto. Selfie Liveness prüft, ob die Quelle des Selfies eine echte Person vor der Kamera ist und kein gedrucktes Foto, keine Maske oder kein Bildschirm-Replay."
      },
      {
        q: "Wie behandelt Identra Datenschutz und Compliance bei biometrischen Daten?",
        a: "Identra ist nach strengen Grundsätzen der Datenminimierung entwickelt. Automatisierte Redaktionsregeln können biometrische Landmarken, Bilder und Nutzerdaten unmittelbar nach Abschluss des Matchings löschen, damit Ihre Speicherpipeline GDPR, CCPA und BIPA unterstützt."
      }
    ]
  },
  vi: {
    backToHome: "Quay lại trang chủ",
    tag: "Nền tảng nhận diện khuôn mặt bằng selfie",
    heroTitle: "Nhận diện khuôn mặt vượt trội mà không phải đánh đổi.",
    heroDesc: "Hiệu năng hàng đầu ngành mà vẫn bảo đảm tuân thủ, trải nghiệm người dùng, khả năng cấu hình và chuẩn mực đạo đức. Xác thực và đối chiếu người dùng an toàn trong chưa đến 1,9 giây.",
    tryDemo: "Trải nghiệm demo",
    tryInteractiveMatcher: "Thử trình mô phỏng đối chiếu tương tác",
    performanceLabel: "Tiêu chuẩn hiệu năng",
    performanceTitle: "Hiệu năng hàng đầu ngành mà không phải đánh đổi",
    performanceDesc: "Xác minh người thật chỉ trong vài giây. Duy trì tuân thủ quy định đồng thời cung cấp luồng xác minh ít ma sát.",
    interactiveLabel: "Trải nghiệm tương tác",
    simulatorTitle: "Môi trường thử nghiệm đối chiếu selfie và xác minh hiện diện",
    simulatorDesc: "Kiểm thử cách hệ thống Identra xử lý khớp danh tính, sai lệch danh tính, ảnh in và phát lại màn hình theo thời gian thực. Bật tắt tham số để thấy tác động.",
    selectScenario: "Chọn kịch bản mô phỏng",
    systemParameters: "Tham số hệ thống",
    thresholdLabel: "Ngưỡng tương đồng khi đối chiếu",
    thresholdDesc: "Điểm tin cậy tối thiểu cần có để phê duyệt kết quả so sánh. Khuyến nghị tiêu chuẩn là 80%.",
    strictLivenessLabel: "Yêu cầu xác minh hiện diện nghiêm ngặt",
    strictLivenessDesc: "Chặn ảnh in và phát lại màn hình ngay cả khi khuôn mặt trông giống hệt nhau.",
    meshLabel: "Hiển thị lưới điểm mốc sinh trắc học",
    meshDesc: "Vẽ các đường hình học khuôn mặt và ghi nhận cấu trúc tọa độ.",
    complianceTitle: "Cấu hình kiểm soát tuân thủ",
    complianceDesc: "Đáp ứng yêu cầu tuân thủ và đồng ý, đồng thời giảm rủi ro bằng cách cấu hình cử chỉ và dữ liệu cần thu thập, các kiểm tra cần chạy và hành động dự phòng tự động.",
    uxTitle: "Tạo trải nghiệm người dùng lý tưởng",
    uxDesc: "Cải thiện tỷ lệ vượt qua và chất lượng ảnh bằng hướng dẫn theo thời gian thực cùng selfie được tự động chụp. Tối ưu liên tục bằng thử nghiệm A/B và các luồng dễ chỉnh sửa.",
    matcherModule: "Mô-đun đối chiếu sinh trắc học",
    engineStatus: "Trạng thái công cụ: ĐANG HOẠT ĐỘNG",
    scannedIdPortrait: "Ảnh chân dung trên giấy tờ đã quét",
    idPhotoAlt: "Ảnh giấy tờ",
    scanned: "Đã quét",
    documentLabel: "Giấy tờ:",
    jurisdictionLabel: "Khu vực pháp lý:",
    liveSelfie: "Selfie trực tiếp đã chụp",
    selfieAlt: "Selfie",
    recording: "ĐANG GHI",
    captured: "ĐÃ CHỤP",
    livenessTypeLabel: "Phương thức xác minh hiện diện:",
    scanResultLabel: "Kết quả quét:",
    landmarksVerified: "Đã xác minh điểm mốc ({count} điểm)",
    facialSimilarityScore: "Điểm tương đồng khuôn mặt",
    calculating: "Đang tính...",
    similarity: "tương đồng",
    analyzingVectors: "Đang phân tích căn chỉnh vector",
    progressComplete: "Hoàn tất {progress}%",
    recalculate: "Tính lại quy trình xác minh",
    exploreMoreTitle: "Khám phá thêm nền tảng định danh của Identra",
    faqTitle: "Câu hỏi thường gặp",
    readyTitle: "Sẵn sàng bắt đầu?",
    readyDesc: "Liên hệ hoặc bắt đầu khám phá Identra ngay hôm nay. Chúng tôi giúp bạn thiết kế quy trình định danh phù hợp để mở rộng hoạt động tiếp nhận người dùng một cách an toàn.",
    tryItNow: "Thử ngay",
    decisionAnalyzing: "Đang quét sinh trắc học...",
    decisionLivenessFailed: "Không thể xác minh sự hiện diện ({type})",
    decisionMismatch: "Danh tính không khớp ({score}% < ngưỡng {threshold}%)",
    decisionMismatchReason: "Khoảng cách toán học giữa các điểm mốc khuôn mặt vượt quá ngưỡng tin cậy cho phép.",
    decisionApproved: "Danh tính đã được xác minh đầy đủ",
    decisionApprovedReason: "Điểm đối chiếu sinh trắc học là {score}% (vượt ngưỡng {threshold}%). Đã xác minh sự hiện diện trực tiếp.",
    statusLabels: {
      APPROVED: "ĐÃ DUYỆT",
      FAILED: "THẤT BẠI",
      ANALYZING: "ĐANG PHÂN TÍCH"
    },
    livenessTypes: {
      genuine: "Thật",
      printedSpoof: "Giả mạo bằng ảnh in",
      screenReplay: "Phát lại màn hình"
    },
    heroPillars: [
      {
        title: "Mô hình AI được xây dựng có đạo đức",
        desc: "Các mô hình cốt lõi được phát triển từ bộ dữ liệu có đồng ý đầy đủ và nguồn gốc có đạo đức để giảm thiên lệch nhân khẩu học."
      },
      {
        title: "Chống giả mạo không thỏa hiệp",
        desc: "Bảo vệ quy trình trước tấn công trình diện nâng cao, ảnh in, mặt nạ và video phát lại kỹ thuật số."
      },
      {
        title: "Có thể cấu hình và tự động hóa",
        desc: "Đặt ngưỡng tin cậy, điều chỉnh workflow động và cấu hình hướng dẫn người dùng theo mức chấp nhận rủi ro của bạn."
      }
    ],
    performanceCards: [
      {
        title: "Khai thác AI có đạo đức",
        desc: "Sử dụng các mô hình được phát triển từ dữ liệu có nguồn gốc đạo đức của những cá nhân đã đồng ý phù hợp."
      },
      {
        title: "Tuân thủ quy định toàn cầu",
        desc: "Xác định cách thu thập, xử lý và lưu trữ dữ liệu cùng sự đồng thuận để đáp ứng nhu cầu tuân thủ trên toàn thế giới. Lưu tín hiệu sinh trắc học cục bộ hoặc dùng cơ chế xóa dữ liệu phía máy chủ linh hoạt."
      },
      {
        title: "Chống deepfake và tấn công injection",
        desc: "Bảo vệ giao dịch của người thật bằng công nghệ xác minh hiện diện qua selfie của Identra. Hệ thống chủ động quét phản chiếu màn hình, mẫu Moire và cấu hình chiều sâu phẳng."
      },
      {
        title: "Tùy chỉnh nhận diện khuôn mặt",
        desc: "Điều chỉnh nhận diện selfie bằng cách chỉ định cử chỉ cần yêu cầu, thiết lập rủi ro và ngưỡng đối chiếu, rồi thay đổi cấu hình ngay khi yêu cầu tuân thủ thay đổi."
      },
      {
        title: "Tối ưu chuyển đổi",
        desc: "Tinh gọn trải nghiệm người dùng bằng tự động chụp thông minh, hướng dẫn tư thế theo thời gian thực, phản hồi lỗi linh hoạt và giao diện tùy chỉnh phù hợp ứng dụng gốc."
      },
      {
        title: "Xác minh trong vài giây",
        desc: "Thời gian xác minh nhận diện khuôn mặt trung bình dưới 1,9 giây. Cung cấp phản hồi xác minh tức thì để người dùng tiếp tục hành trình ngay lập tức."
      }
    ],
    scenarios: {
      "chloe-match": {
        name: "Chloe (khớp thật)",
        subtitle: "Selfie được đối chiếu với bằng lái xe đã quét",
        livenessDetails: "Đạt • Đã xác minh chiếu sáng động, vi biểu cảm tự nhiên và kiểm tra chiều sâu chân thực.",
        country: "Hoa Kỳ",
        idType: "Bằng lái xe"
      },
      "identity-mismatch": {
        name: "Sarah (không khớp danh tính)",
        subtitle: "Sarah chụp selfie trực tiếp bằng giấy tờ của Chloe",
        livenessDetails: "Đạt • Người dùng là người thật, nhưng so sánh sinh trắc học bị từ chối do khoảng cách cấu trúc khuôn mặt không khớp.",
        country: "Hoa Kỳ",
        idType: "Bằng lái xe"
      },
      "printed-paper-spoof": {
        name: "Marcus (tấn công bằng ảnh in)",
        subtitle: "Marcus giơ ảnh in vật lý từ giấy tờ của mình",
        livenessDetails: "Từ chối • Phát hiện tấn công trình diện 2D phẳng. Không có thay đổi vi chiều sâu, kiểm tra vân giấy thất bại.",
        country: "Canada",
        idType: "Hộ chiếu"
      },
      "digital-screen-replay": {
        name: "David (tấn công phát lại kỹ thuật số)",
        subtitle: "Chiếu selfie của David trên màn hình với mẫu Moire tần số cao",
        livenessDetails: "Từ chối • Phát hiện tấn công phát lại màn hình tần số cao. Nhận diện mẫu nhiễu Moire và lưới điểm ảnh phụ.",
        country: "Vương quốc Anh",
        idType: "Hộ chiếu"
      }
    },
    explanationCards: [
      {
        title: "Xác minh quyền sở hữu giấy tờ vật lý",
        desc: "Chụp và đối chiếu selfie với ảnh chân dung trên giấy tờ theo thời gian thực để gắn giấy tờ vật lý với người thật. Bảo đảm người quét giấy tờ là chủ sở hữu thực sự của giấy tờ."
      },
      {
        title: "Tái xác minh người dùng ít ma sát",
        desc: "Chụp và đối chiếu selfie với ảnh giấy tờ hoặc selfie đã thu thập trước đó để bảo đảm quyền truy cập tài khoản hợp lệ trong hành động rủi ro cao hoặc đặt lại mật khẩu."
      },
      {
        title: "Tăng cường bảo mật lực lượng lao động toàn cầu",
        desc: "Bảo đảm nhân viên đúng là người họ khai báo trong quá trình tiếp nhận, khi truy cập hệ thống doanh nghiệp nhạy cảm và tại các điểm quan trọng khác trong vòng đời làm việc."
      }
    ],
    exploreCards: [
      {
        title: "Ước tính tuổi bằng selfie.",
        link: "Xem ước tính tuổi bằng selfie"
      },
      {
        title: "Xây dựng luồng bảo đảm độ tuổi động.",
        link: "Xem trình chỉnh sửa luồng động"
      }
    ],
    faqs: [
      {
        q: "Nhận diện selfie khác gì với xác minh hiện diện qua selfie?",
        a: "Nhận diện selfie đối chiếu hai vectơ sinh trắc học khuôn mặt để xác định chúng có thuộc cùng một người hay không, chẳng hạn so sánh selfie trực tiếp với ảnh trên hộ chiếu. Xác minh hiện diện kiểm tra xem người thật có đang ở trước camera hay không, thay vì ảnh in, mặt nạ hoặc nội dung phát lại trên màn hình."
      },
      {
        q: "Identra xử lý quyền riêng tư và tuân thủ dữ liệu sinh trắc học như thế nào?",
        a: "Identra được thiết kế theo nguyên tắc giảm thiểu dữ liệu nghiêm ngặt. Chúng tôi hỗ trợ quy tắc xóa dữ liệu tự động để xóa điểm mốc sinh trắc học, hình ảnh và dữ liệu người dùng ngay sau khi hoàn tất đối chiếu, giúp quy trình lưu trữ tuân thủ GDPR, CCPA và BIPA."
      }
    ]
  }
};
