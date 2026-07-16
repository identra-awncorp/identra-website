/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// TRANSLATION DICTIONARIES
export const caseTranslations = {
  en: {
    backToPlatform: 'Back to Platform Overview',
    caseManagement: 'Case management',
    heroTitle: 'Streamlined case management ',
    heroTitleAccent: 'for any use case.',
    heroDesc: 'Reduce operational burden with drag-and-drop modules and AI-powered decisioning. Consolidate risk signals from active, passive, and external sources into a single, unified reviewer console.',
    getDemo: 'Get a demo',
    startExploring: 'Start exploring',
    
    identityCheck: 'Identity Check',
    activeDataValidation: 'Active data validation',
    passiveSignals: 'Passive Signals',
    behavioralTelemetry: 'Behavioral telemetry',
    routingLogic: 'Routing Logic',
    readyForReview: 'Ready for manual review hub',
    passed: 'PASSED',
    review: 'REVIEW',
    engineVersion: 'IDV_DECISION_ENGINE_v4',
    logicIf: 'IF',
    logicRiskFlag: 'passive_risk_flag',
    logicEqualsTrue: '=== true',
    logicThen: 'THEN',
    logicEscalateFunction: 'escalate_to_cases()',
    logoDapper: 'Dapper Labs',
    logoNewton: 'Newton',
    logoRipple: 'ripple',

    resolveMoreCases: 'Resolve more cases in less time',
    resolveMoreCasesDesc: 'Automate routine cases with Case Review Agents and investigate complex ones faster with built-in collaboration tools that keep your team aligned.',
    unlockSingleSource: 'Unlock a single source of truth',
    unlockSingleSourceDesc: 'Collect and consolidate active, passive, and behavioral signals from Identra and external sources so your agents and reviewers have all relevant context in one place.',
    builtWithCompliance: 'Built with compliance in mind',
    builtWithComplianceDesc: 'Meet compliance requirements with comprehensive audit logging, checklists, comments, and encrypted storage structures.',

    trustedBy: "Trusted by startups & the world's largest companies",

    sandboxBadge: 'Interactive sandbox demo',
    howItWorks: 'How it works',
    tabConfigure: '1 Configure',
    tabInvestigate: '2 Investigate',
    tabDecide: '3 Decide',

    configureTitle: 'Configure templates and assignment rules',
    configureDesc: 'Create custom templates for every type of case. Then, customize the review process by defining assignment rules and resolution statuses.',
    tryItYourself: 'Try it yourself:',
    tryItCheck1: 'Toggle rules on/off to watch real-time evaluation.',
    tryItCheck2: 'Create custom rules instantly in the builder.',
    addCustomRule: 'Add custom evaluation rule',
    createRuleTitle: 'Create evaluation rule',
    ruleNameLabel: 'Rule Name',
    ruleNamePlaceholder: 'e.g. Geolocation Distance limit',
    ifConditionLabel: 'If Condition',
    ifConditionPlaceholder: 'e.g. If user country is different than card brand',
    thenActionLabel: 'Then Action',
    thenActionPlaceholder: 'e.g. Assign to Fraud Escalation queue',
    saveRule: 'Save rule',
    cancel: 'Cancel',

    rulesBuilderTitle: 'Assignment Rules Builder',
    active: 'ACTIVE',
    actionLabel: 'Action:',
    deleteRule: 'Delete Rule',
    totalActiveRules: 'Total Active Rules:',
    configVersion: 'Config version:',
    configVersionValue: 'v2.4.1',

    investigateTitle: 'Investigate complex cases on a single dashboard',
    investigateDesc: 'Collect and consolidate all user data, matching confidence metrics, behavioral risks, and third-party database details into a single clean investigation hub.',
    reviewerConsoleLabel: 'Interactive reviewer console:',
    reviewerConsoleDesc: 'Try resolving the active investigation below! Click on Approve, Reject, or Escalate to trigger automated actions.',
    resetCaseSimulation: 'Reset Case Simulation',

    caseConsole: 'Case Console',
    assignedToYou: 'Assigned to: You',
    reviewerInitials: 'AR',
    statusPending: 'Pending',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',
    statusEscalated: 'Escalated',
    riskScoreLabel: 'Risk Score',
    riskScoreMaxLabel: '/ 100',
    evaluationSignalsLabel: 'Evaluation Signals',
    addPrivateNotePlaceholder: 'Add private investigation note...',
    addButton: 'Add',
    reviewTimelineLabel: 'Review Timeline',
    actionReviewerPanel: 'Action Reviewer Panel',
    systemLogBus: 'SYSTEM_LOG_BUS:',
    approveCaseBtn: 'Approve Case',
    declineFraudBtn: 'Decline / Fraud',
    escalateBtn: 'Escalate',
    resolutionLogged: 'Resolution logged.',
    reviewAnotherCase: 'Review Another Case',

    decideTitle: 'Trigger automated downstream actions',
    decideDesc: 'Decide outcomes instantly with high confidence. Approved users are written directly to your servers via webhooks, while flagged individuals trigger automatic Suspicious Activity Reports (SAR) draft pre-fills and custom alerts.',
    tryTriggerWebhook: 'Try triggering webhook mock:',
    testingEndpoint: 'Testing Endpoint...',
    triggerTestWebhook: 'Trigger Test Webhook',
    autoDecisionTerminal: 'Automatic Decisioning Terminal',
    webhookStatusOnline: 'Webhook status: ONLINE',
    targetLabel: 'Target:',
    targetEndpointValue: 'https://api.yourdomain.com',
    decisionListenerCommand: '$ bin/decide-listener --id=case_83921 --port=3000',
    listeningForDecision: '// Listening for reviewer decision...',
    logBufferEmpty: '[Log buffer empty. Click \'Trigger Test Webhook\' to simulate downstream actions]',

    keyFeatures: 'Key features',
    keyFeaturesTitle: 'Build your ideal case management process',
    keyFeaturesDesc: 'Tailor every aspect of your manual investigation pipeline. Set assignment workflows, mask raw personal documentation, and utilize custom indicators designed to speed up operations.',
    customSchemaTitle: 'Custom Case Schema',
    customSchemaSubtitle: 'Reviewer View Config',
    schemaConfigured: 'Schema Configured',

    appScenarios: 'Application Scenarios',
    howTeamsUse: 'How teams can use Cases',

    readCaseStudy: 'Read case study',
    bitgoResults: 'BitGo case study results',
    bitgoLogoInitial: 'B',
    bitgoDesc: "BitGo reduces manual review by 98% by leveraging Identra's case management solution, FinCEN 314a screening tool, and full identity platform.",
    bitgoQuote: '“As a startup with multiple systems, we needed a way to consolidate our users across different BitGo affiliates and business units. We lacked a clear source of truth, and Identra gives us that. With the time saved on review, and the consolidated single source of truth, you could call the resources my team saves a return on investment.”',
    bitgoCite: 'Director of trust administration at BitGo',

    resources: 'Resources',
    keepLearning: 'Keep learning',
    readArticle: 'Read Article',
    blogLabel: 'Blog',

    exploreUpsell: "Explore more of Identra's identity platform",
    upsell1Title: 'Automate all your identity processes.',
    upsell1Desc: 'Define triggers, execute verifications dynamically, check databases, run risk algorithms, and orchestrate manual tasks with Workflows.',
    upsell1Link: 'See Workflows platform',
    upsell2Title: 'Bring your data and tools into Identra.',
    upsell2Desc: 'Connect third-party risk systems, CRM services, ticketing desks, or data lakes using our robust prebuilt marketplace apps.',
    upsell2Link: 'See integrations marketplace',

    readyToGetStarted: 'Ready to get started?',
    readyToGetStartedDesc: 'Get in touch or start exploring Identra today. Set up custom review queues or test the automated flow sandbox in minutes.',
    tryItNow: 'Try it now',
  },
  es: {

    backToPlatform: 'Volver a la descripción general de la plataforma',
    caseManagement: 'Gestión de casos',
    heroTitle: 'Gestión de casos simplificada',
    heroTitleAccent: 'para cualquier caso de uso.',
    heroDesc: 'Reduzca la carga operativa con módulos de arrastrar y soltar y toma de decisiones impulsadas por IA. Consolide señales de riesgo de fuentes activas, pasivas y externas en una única consola de revisión unificada.',
    getDemo: 'Obtenga una demostración',
    startExploring: 'Empezar a explorar',
    
    identityCheck: 'Verificación de identidad',
    activeDataValidation: 'Validación de datos activos',
    passiveSignals: 'Señales pasivas',
    behavioralTelemetry: 'Telemetría conductual',
    routingLogic: 'Lógica de enrutamiento',
    readyForReview: 'Listo para el centro de revisión manual',
    passed: 'APROBADO',
    review: 'REVISAR',
    engineVersion: 'IDV_DECISION_ENGINE_v4',
    logicIf: 'SI',
    logicRiskFlag: 'passive_risk_flag',
    logicEqualsTrue: '=== verdadero',
    logicThen: 'ENTONCES',
    logicEscalateFunction: 'escalate_to_cases()',
    logoDapper: 'Dapper Labs',
    logoNewton: 'Newton',
    logoRipple: 'ripple',

    resolveMoreCases: 'Resolver más casos en menos tiempo',
    resolveMoreCasesDesc: 'Automatice casos de rutina con agentes de revisión de casos e investigue casos complejos más rápido con herramientas de colaboración integradas que mantienen a su equipo alineado.',
    unlockSingleSource: 'Descubra una única fuente de verdad',
    unlockSingleSourceDesc: 'Recopile y consolide señales activas, pasivas y de comportamiento de Identra y fuentes externas para que sus agentes y revisores tengan todo el contexto relevante en un solo lugar.',
    builtWithCompliance: 'Construido pensando en el cumplimiento',
    builtWithComplianceDesc: 'Cumpla con los requisitos de cumplimiento con registros de auditoría integrales, listas de verificación, comentarios y estructuras de almacenamiento cifradas.',

    trustedBy: "Con la confianza de startups y las empresas más grandes del mundo",

    sandboxBadge: 'Demostración interactiva de zona de pruebas',
    howItWorks: 'como funciona',
    tabConfigure: '1 Configurar',
    tabInvestigate: '2 investigar',
    tabDecide: '3 decidir',

    configureTitle: 'Configurar plantillas y reglas de asignación',
    configureDesc: 'Cree plantillas personalizadas para cada tipo de caso. Luego, personalice el proceso de revisión definiendo reglas de asignación y estados de resolución.',
    tryItYourself: 'Pruébelo usted mismo:',
    tryItCheck1: 'Active o desactive las reglas para ver la evaluación en tiempo real.',
    tryItCheck2: 'Cree reglas personalizadas al instante en el constructor.',
    addCustomRule: 'Agregar regla de evaluación personalizada',
    createRuleTitle: 'Crear regla de evaluación',
    ruleNameLabel: 'Nombre de la regla',
    ruleNamePlaceholder: 'p.ej. Límite de distancia de geolocalización',
    ifConditionLabel: 'Si condición',
    ifConditionPlaceholder: 'p.ej. Si el país del usuario es diferente a la marca de la tarjeta',
    thenActionLabel: 'Entonces acción',
    thenActionPlaceholder: 'p.ej. Asignar a la cola de escalada de fraude',
    saveRule: 'Guardar regla',
    cancel: 'Cancelar',

    rulesBuilderTitle: 'Generador de reglas de asignación',
    active: 'ACTIVO',
    actionLabel: 'Acción:',
    deleteRule: 'Eliminar regla',
    totalActiveRules: 'Total de reglas activas:',
    configVersion: 'Versión de configuración:',
    configVersionValue: 'v2.4.1',

    investigateTitle: 'Investigue casos complejos en un único panel',
    investigateDesc: 'Recopile y consolide todos los datos de los usuarios, haciendo coincidir las métricas de confianza, los riesgos de comportamiento y los detalles de la base de datos de terceros en un único centro de investigación limpio.',
    reviewerConsoleLabel: 'Consola de revisión interactiva:',
    reviewerConsoleDesc: '¡Intenta resolver la investigación activa a continuación! Haga clic en Aprobar, Rechazar o Escalar para activar acciones automatizadas.',
    resetCaseSimulation: 'Restablecer simulación de caso',

    caseConsole: 'Consola de caja',
    assignedToYou: 'Asignado a: usted',
    reviewerInitials: 'AR',
    statusPending: 'Pendiente',
    statusApproved: 'Aprobado',
    statusRejected: 'Rechazado',
    statusEscalated: 'Escalado',
    riskScoreLabel: 'Puntuación de riesgo',
    riskScoreMaxLabel: '/ 100',
    evaluationSignalsLabel: 'Señales de evaluación',
    addPrivateNotePlaceholder: 'Agregar nota de investigación privada...',
    addButton: 'Agregar',
    reviewTimelineLabel: 'Revisar el cronograma',
    actionReviewerPanel: 'Panel de revisión de acciones',
    systemLogBus: 'BUS_LOG_SISTEMA:',
    approveCaseBtn: 'Aprobar caso',
    declineFraudBtn: 'Rechazo / Fraude',
    escalateBtn: 'Escalar',
    resolutionLogged: 'Resolución registrada.',
    reviewAnotherCase: 'Revisar otro caso',

    decideTitle: 'Activar acciones posteriores automatizadas',
    decideDesc: 'Decida los resultados al instante con gran confianza. Los usuarios aprobados se escriben directamente en sus servidores a través de webhooks, mientras que las personas marcadas activan borradores automáticos de informes de actividades sospechosas (SAR) y alertas personalizadas.',
    tryTriggerWebhook: 'Intente activar el simulacro de webhook:',
    testingEndpoint: 'Punto final de prueba...',
    triggerTestWebhook: 'Webhook de prueba de activación',
    autoDecisionTerminal: 'Terminal de toma de decisiones automática',
    webhookStatusOnline: 'Estado del webhook: EN LÍNEA',
    targetLabel: 'Objetivo:',
    targetEndpointValue: 'https://api.yourdomain.com',
    decisionListenerCommand: '$ bin/escuchar-decision --id=case_83921 --puerto=3000',
    listeningForDecision: '// Escuchando la decisión del revisor...',
    logBufferEmpty: '[Búfer de registro vacío. Haga clic en \'Trigger Test Webhook\' para simular acciones posteriores]',

    keyFeatures: 'Características clave',
    keyFeaturesTitle: 'Cree su proceso de gestión de casos ideal',
    keyFeaturesDesc: 'Adapte cada aspecto de su proceso de investigación manual. Establezca flujos de trabajo de asignación, enmascare documentación personal sin procesar y utilice indicadores personalizados diseñados para acelerar las operaciones.',
    customSchemaTitle: 'Esquema de caso personalizado',
    customSchemaSubtitle: 'Configuración de vista del revisor',
    schemaConfigured: 'Esquema configurado',

    appScenarios: 'Escenarios de aplicación',
    howTeamsUse: 'Cómo los equipos pueden utilizar los casos',

    readCaseStudy: 'Leer estudio de caso',
    bitgoResults: 'Resultados del estudio de caso de BitGo',
    bitgoLogoInitial: 'B',
    bitgoDesc: "BitGo reduce la revisión manual en un 98 % al aprovechar la solución de gestión de casos de Identra, la herramienta de detección FinCEN 314a y la plataforma de identidad completa.",
    bitgoQuote: '"Como startup con múltiples sistemas, necesitábamos una forma de consolidar a nuestros usuarios en diferentes afiliados y unidades de negocios de BitGo. Carecíamos de una fuente de verdad clara, y Identra nos la brinda. Con el tiempo ahorrado en la revisión y la única fuente de verdad consolidada, se podría considerar que los recursos que mi equipo ahorra son un retorno de la inversión".',
    bitgoCite: 'Director de administración de fideicomisos en BitGo',

    resources: 'Recursos',
    keepLearning: 'sigue aprendiendo',
    readArticle: 'Leer artículo',
    blogLabel: 'Blog',

    exploreUpsell: "Explora más de la plataforma de identidad de Identra",
    upsell1Title: 'Automatiza todos tus procesos de identidad.',
    upsell1Desc: 'Defina desencadenantes, ejecute verificaciones dinámicamente, verifique bases de datos, ejecute algoritmos de riesgo y organice tareas manuales con flujos de trabajo.',
    upsell1Link: 'Ver plataforma de Workflows',
    upsell2Title: 'Incorpore sus datos y herramientas a Identra.',
    upsell2Desc: 'Conecte sistemas de riesgo de terceros, servicios CRM, mostradores de venta de entradas o lagos de datos utilizando nuestras sólidas aplicaciones de mercado prediseñadas.',
    upsell2Link: 'Ver mercado de integraciones',

    readyToGetStarted: '¿Listo para empezar?',
    readyToGetStartedDesc: 'Ponte en contacto o comienza a explorar Identra hoy. Configure colas de revisión personalizadas o pruebe el entorno de pruebas de flujo automatizado en minutos.',
    tryItNow: 'Pruébalo ahora',
  },
  ja: {

    backToPlatform: 'プラットフォームの概要に戻る',
    caseManagement: 'ケース管理',
    heroTitle: '合理化されたケース管理',
    heroTitleAccent: 'あらゆるユースケースに対応します。',
    heroDesc: 'ドラッグ アンド ドロップ モジュールと AI を活用した意思決定により、運用の負担を軽減します。アクティブ、パッシブ、および外部ソースからのリスク シグナルを単一の統合レビュー担当者コンソールに統合します。',
    getDemo: 'デモを入手する',
    startExploring: '探索を開始する',
    
    identityCheck: '本人確認',
    activeDataValidation: 'アクティブなデータ検証',
    passiveSignals: 'パッシブ信号',
    behavioralTelemetry: '行動テレメトリー',
    routingLogic: 'ルーティングロジック',
    readyForReview: '手動レビューハブの準備ができました',
    passed: '合格した',
    review: 'レビュー',
    engineVersion: 'IDV_DECISION_ENGINE_v4',
    logicIf: 'もし',
    logicRiskFlag: 'passive_risk_flag',
    logicEqualsTrue: '=== true',
    logicThen: 'なら',
    logicEscalateFunction: 'escalate_to_cases()',
    logoDapper: 'Dapper Labs',
    logoNewton: 'Newton',
    logoRipple: 'ripple',

    resolveMoreCases: 'より多くの事件をより短時間で解決する',
    resolveMoreCasesDesc: 'Case Review Agent を使用して日常的なケースを自動化し、チームの連携を保つ組み込みのコラボレーション ツールを使用して複雑なケースをより迅速に調査します。',
    unlockSingleSource: '単一の真実の情報源を明らかにする',
    unlockSingleSourceDesc: 'ペルソナや外部ソースからアクティブ、パッシブ、および行動のシグナルを収集して統合することで、エージェントとレビュー担当者がすべての関連コンテキストを 1 か所で把握できるようになります。',
    builtWithCompliance: 'コンプライアンスを念頭に置いて構築',
    builtWithComplianceDesc: '包括的な監査ログ、チェックリスト、コメント、暗号化されたストレージ構造により、コンプライアンス要件を満たします。',

    trustedBy: "スタートアップ企業や世界最大手の企業から信頼されています",

    sandboxBadge: 'インタラクティブなサンドボックスのデモ',
    howItWorks: '仕組み',
    tabConfigure: '1 設定する',
    tabInvestigate: '2 調査する',
    tabDecide: '3 決める',

    configureTitle: 'テンプレートと割り当てルールを構成する',
    configureDesc: 'あらゆるタイプのケースに対応するカスタム テンプレートを作成します。次に、割り当てルールと解決ステータスを定義して、レビュー プロセスをカスタマイズします。',
    tryItYourself: '自分で試してみてください:',
    tryItCheck1: 'ルールのオン/オフを切り替えて、リアルタイムの評価を確認します。',
    tryItCheck2: 'ビルダーでカスタム ルールを即座に作成します。',
    addCustomRule: 'カスタム評価ルールを追加する',
    createRuleTitle: '評価ルールの作成',
    ruleNameLabel: 'ルール名',
    ruleNamePlaceholder: '例えば地理位置情報の距離制限',
    ifConditionLabel: 'If 条件',
    ifConditionPlaceholder: '例えば利用国とカードブランドが異なる場合',
    thenActionLabel: 'その後のアクション',
    thenActionPlaceholder: '例えば不正行為エスカレーションキューに割り当てる',
    saveRule: 'ルールの保存',
    cancel: 'キャンセル',

    rulesBuilderTitle: '割り当てルールビルダー',
    active: 'アクティブ',
    actionLabel: 'アクション：',
    deleteRule: 'ルールを削除',
    totalActiveRules: 'アクティブなルールの合計:',
    configVersion: '構成バージョン:',
    configVersionValue: 'v2.4.1',

    investigateTitle: '単一のダッシュボードで複雑なケースを調査',
    investigateDesc: 'すべてのユーザー データ、一致する信頼性指標、行動リスク、サードパーティ データベースの詳細を単一のクリーンな調査ハブに収集して統合します。',
    reviewerConsoleLabel: 'インタラクティブなレビュー担当者コンソール:',
    reviewerConsoleDesc: '以下の進行中の調査を解決してみてください。 [承認]、[拒否]、または [エスカレーション] をクリックして自動アクションをトリガーします。',
    resetCaseSimulation: 'リセットケースのシミュレーション',

    caseConsole: 'ケースコンソール',
    assignedToYou: '担当者: あなた',
    reviewerInitials: 'AR',
    statusPending: '保留中',
    statusApproved: '承認済み',
    statusRejected: '却下済み',
    statusEscalated: 'エスカレーション済み',
    riskScoreLabel: 'リスクスコア',
    riskScoreMaxLabel: '/ 100',
    evaluationSignalsLabel: '評価信号',
    addPrivateNotePlaceholder: '私的調査メモを追加...',
    addButton: '追加',
    reviewTimelineLabel: 'レビューのタイムライン',
    actionReviewerPanel: 'アクションレビューアーパネル',
    systemLogBus: 'システムログバス:',
    approveCaseBtn: 'ケースの承認',
    declineFraudBtn: '拒否/詐欺',
    escalateBtn: 'エスカレート',
    resolutionLogged: '解決策が記録されました。',
    reviewAnotherCase: '別のケースを確認する',

    decideTitle: '自動化された下流アクションをトリガーする',
    decideDesc: '高い自信を持って結果を即座に決定します。承認されたユーザーは Webhook 経由でサーバーに直接書き込まれますが、フラグが設定されたユーザーは不審行為レポート (SAR) の下書きの自動事前入力とカスタム アラートをトリガーします。',
    tryTriggerWebhook: 'Webhook モックをトリガーしてみてください。',
    testingEndpoint: 'エンドポイントをテストしています...',
    triggerTestWebhook: 'テスト Webhook のトリガー',
    autoDecisionTerminal: '自動判定端末',
    webhookStatusOnline: 'Webhook ステータス: オンライン',
    targetLabel: 'ターゲット：',
    targetEndpointValue: 'https://api.yourdomain.com',
    decisionListenerCommand: '$ bin/decide-listener --id=case_83921 --port=3000',
    listeningForDecision: '// レビュー担当者の決定を聞いています...',
    logBufferEmpty: '[ログバッファが空です。 「テスト Webhook のトリガー」をクリックして、ダウンストリーム アクションをシミュレートします]',

    keyFeatures: '主な特徴',
    keyFeaturesTitle: '理想的なケース管理プロセスを構築する',
    keyFeaturesDesc: '手動調査パイプラインのあらゆる側面をカスタマイズします。割り当てワークフローを設定し、生の個人文書をマスクし、操作をスピードアップするように設計されたカスタム インジケーターを利用します。',
    customSchemaTitle: 'カスタムケーススキーマ',
    customSchemaSubtitle: 'レビューアービュー構成',
    schemaConfigured: 'スキーマが構成されました',

    appScenarios: 'アプリケーションシナリオ',
    howTeamsUse: 'チームが Case を使用する方法',

    readCaseStudy: 'ケーススタディを読む',
    bitgoResults: 'BitGo のケーススタディ結果',
    bitgoLogoInitial: 'B',
    bitgoDesc: "BitGo は、ペルソナのケース管理ソリューション、FinCEN 314a スクリーニング ツール、および完全な ID プラットフォームを活用することで、手動レビューを 98% 削減します。",
    bitgoQuote: '「複数のシステムを持つスタートアップとして、私たちはさまざまな BitGo 関連会社やビジネス ユニットにまたがるユーザーを統合する方法を必要としていました。私たちには明確な真実の情報源が不足していましたが、ペルソナがそれを提供してくれます。レビューにかかる時間が節約され、統合された単一の真実の情報源により、私のチームが節約できるリソースは投資収益率と言えるでしょう。」',
    bitgoCite: 'BitGo 信託管理ディレクター',

    resources: 'リソース',
    keepLearning: '学び続ける',
    readArticle: '記事を読む',
    blogLabel: 'ブログ',

    exploreUpsell: "ペルソナのアイデンティティ プラットフォームをさらに詳しく見る",
    upsell1Title: 'すべての ID プロセスを自動化します。',
    upsell1Desc: 'トリガーを定義し、検証を動的に実行し、データベースをチェックし、リスク アルゴリズムを実行し、ワークフローを使用して手動タスクを調整します。',
    upsell1Link: '「ワークフロープラットフォーム」を参照',
    upsell2Title: 'データとツールをペルソナに取り込みます。',
    upsell2Desc: '堅牢な構築済みマーケットプレイス アプリを使用して、サードパーティのリスク システム、CRM サービス、チケット発行デスク、またはデータ レイクを接続します。',
    upsell2Link: '統合マーケットプレイスを見る',

    readyToGetStarted: '始める準備はできていますか?',
    readyToGetStartedDesc: '今すぐお問い合わせいただくか、ペルソナの探索を始めてください。カスタム レビュー キューをセットアップしたり、自動化されたフロー サンドボックスを数分でテストしたりできます。',
    tryItNow: '今すぐ試してください',
  },
  de: {

    backToPlatform: 'Zurück zur Plattformübersicht',
    caseManagement: 'Fallmanagement',
    heroTitle: 'Optimiertes Fallmanagement',
    heroTitleAccent: 'für jeden Anwendungsfall.',
    heroDesc: 'Reduzieren Sie den Betriebsaufwand mit Drag-and-Drop-Modulen und KI-gestützter Entscheidungsfindung. Konsolidieren Sie Risikosignale aus aktiven, passiven und externen Quellen in einer einzigen, einheitlichen Prüferkonsole.',
    getDemo: 'Holen Sie sich eine Demo',
    startExploring: 'Beginnen Sie mit der Erkundung',
    
    identityCheck: 'Identitätsprüfung',
    activeDataValidation: 'Aktive Datenvalidierung',
    passiveSignals: 'Passive Signale',
    behavioralTelemetry: 'Verhaltenstelemetrie',
    routingLogic: 'Routing-Logik',
    readyForReview: 'Bereit für den manuellen Überprüfungs-Hub',
    passed: 'BESTANDEN',
    review: 'REZENSION',
    engineVersion: 'IDV_DECISION_ENGINE_v4',
    logicIf: 'WENN',
    logicRiskFlag: 'passive_risk_flag',
    logicEqualsTrue: '=== wahr',
    logicThen: 'DANN',
    logicEscalateFunction: 'escalate_to_cases()',
    logoDapper: 'Dapper Labs',
    logoNewton: 'Newton',
    logoRipple: 'ripple',

    resolveMoreCases: 'Lösen Sie mehr Fälle in kürzerer Zeit',
    resolveMoreCasesDesc: 'Automatisieren Sie Routinefälle mit Case Review Agents und untersuchen Sie komplexe Fälle schneller mit integrierten Tools für die Zusammenarbeit, die Ihr Team auf dem Laufenden halten.',
    unlockSingleSource: 'Erschließen Sie eine einzige Quelle der Wahrheit',
    unlockSingleSourceDesc: 'Sammeln und konsolidieren Sie aktive, passive und Verhaltenssignale von Identra und externen Quellen, damit Ihre Agenten und Prüfer alle relevanten Kontexte an einem Ort haben.',
    builtWithCompliance: 'Bei der Entwicklung wurde auf Compliance geachtet',
    builtWithComplianceDesc: 'Erfüllen Sie Compliance-Anforderungen mit umfassender Audit-Protokollierung, Checklisten, Kommentaren und verschlüsselten Speicherstrukturen.',

    trustedBy: "Startups und die größten Unternehmen der Welt vertrauen darauf",

    sandboxBadge: 'Interaktive Sandbox-Demo',
    howItWorks: 'Wie es funktioniert',
    tabConfigure: '1 Konfigurieren',
    tabInvestigate: '2 Untersuchen',
    tabDecide: '3 Entscheide',

    configureTitle: 'Konfigurieren Sie Vorlagen und Zuweisungsregeln',
    configureDesc: 'Erstellen Sie benutzerdefinierte Vorlagen für jede Art von Fall. Passen Sie dann den Überprüfungsprozess an, indem Sie Zuweisungsregeln und Lösungsstatus definieren.',
    tryItYourself: 'Probieren Sie es selbst aus:',
    tryItCheck1: 'Schalten Sie die Regeln ein/aus, um die Echtzeitauswertung anzusehen.',
    tryItCheck2: 'Erstellen Sie im Builder sofort benutzerdefinierte Regeln.',
    addCustomRule: 'Fügen Sie eine benutzerdefinierte Bewertungsregel hinzu',
    createRuleTitle: 'Auswertungsregel erstellen',
    ruleNameLabel: 'Regelname',
    ruleNamePlaceholder: 'z.B. Geolokalisierungsentfernungsbegrenzung',
    ifConditionLabel: 'Wenn Bedingung',
    ifConditionPlaceholder: 'z.B. Wenn das Benutzerland von der Kartenmarke abweicht',
    thenActionLabel: 'Dann Aktion',
    thenActionPlaceholder: 'z.B. Der Betrugseskalationswarteschlange zuweisen',
    saveRule: 'Regel speichern',
    cancel: 'Stornieren',

    rulesBuilderTitle: 'Builder für Zuweisungsregeln',
    active: 'AKTIV',
    actionLabel: 'Aktion:',
    deleteRule: 'Regel löschen',
    totalActiveRules: 'Gesamtzahl der aktiven Regeln:',
    configVersion: 'Konfigurationsversion:',
    configVersionValue: 'v2.4.1',

    investigateTitle: 'Untersuchen Sie komplexe Fälle auf einem einzigen Dashboard',
    investigateDesc: 'Sammeln und konsolidieren Sie alle Benutzerdaten, vergleichen Sie Vertrauensmetriken, Verhaltensrisiken und Datenbankdetails von Drittanbietern in einem einzigen, sauberen Untersuchungszentrum.',
    reviewerConsoleLabel: 'Interaktive Prüferkonsole:',
    reviewerConsoleDesc: 'Versuchen Sie, die aktive Untersuchung unten zu lösen! Klicken Sie auf Genehmigen, Ablehnen oder Eskalieren, um automatisierte Aktionen auszulösen.',
    resetCaseSimulation: 'Fallsimulation zurücksetzen',

    caseConsole: 'Case-Konsole',
    assignedToYou: 'Zugewiesen an: Sie',
    reviewerInitials: 'AR',
    statusPending: 'Ausstehend',
    statusApproved: 'Genehmigt',
    statusRejected: 'Abgelehnt',
    statusEscalated: 'Eskaliert',
    riskScoreLabel: 'Risikobewertung',
    riskScoreMaxLabel: '/ 100',
    evaluationSignalsLabel: 'Bewertungssignale',
    addPrivateNotePlaceholder: 'Private Ermittlungsnotiz hinzufügen...',
    addButton: 'Hinzufügen',
    reviewTimelineLabel: 'Überprüfen Sie die Zeitleiste',
    actionReviewerPanel: 'Aktionsprüfergremium',
    systemLogBus: 'SYSTEMPROTOKOLL_BUS:',
    approveCaseBtn: 'Fall genehmigen',
    declineFraudBtn: 'Ablehnung / Betrug',
    escalateBtn: 'Eskalieren',
    resolutionLogged: 'Auflösung protokolliert.',
    reviewAnotherCase: 'Überprüfen Sie einen anderen Fall',

    decideTitle: 'Lösen Sie automatisierte nachgelagerte Aktionen aus',
    decideDesc: 'Entscheiden Sie sofort und mit hoher Sicherheit über Ergebnisse. Zugelassene Benutzer werden über Webhooks direkt auf Ihre Server geschrieben, während markierte Personen automatische Vorabfüllungen von Suspicious Activity Reports (SAR)-Entwürfen und benutzerdefinierten Warnungen auslösen.',
    tryTriggerWebhook: 'Versuchen Sie, einen Webhook-Mock auszulösen:',
    testingEndpoint: 'Endpunkt testen...',
    triggerTestWebhook: 'Test-Webhook auslösen',
    autoDecisionTerminal: 'Automatisches Entscheidungsterminal',
    webhookStatusOnline: 'Webhook-Status: ONLINE',
    targetLabel: 'Ziel:',
    targetEndpointValue: 'https://api.yourdomain.com',
    decisionListenerCommand: '$ bin/entscheidungs-listener --id=case_83921 --port=3000',
    listeningForDecision: '// Auf die Entscheidung des Rezensenten warten ...',
    logBufferEmpty: '[Protokollpuffer leer. Klicken Sie auf „Test-Webhook auslösen“, um nachgelagerte Aktionen zu simulieren.]',

    keyFeatures: 'Hauptmerkmale',
    keyFeaturesTitle: 'Erstellen Sie Ihren idealen Case-Management-Prozess',
    keyFeaturesDesc: 'Passen Sie jeden Aspekt Ihrer manuellen Untersuchungspipeline individuell an. Legen Sie Arbeitsabläufe für Zuweisungen fest, maskieren Sie persönliche Rohdokumente und verwenden Sie benutzerdefinierte Indikatoren, die den Betrieb beschleunigen sollen.',
    customSchemaTitle: 'Benutzerdefiniertes Fallschema',
    customSchemaSubtitle: 'Reviewer-Ansichtskonfiguration',
    schemaConfigured: 'Schema konfiguriert',

    appScenarios: 'Anwendungsszenarien',
    howTeamsUse: 'Wie Teams Fälle nutzen können',

    readCaseStudy: 'Fallstudie lesen',
    bitgoResults: 'Ergebnisse der BitGo-Fallstudie',
    bitgoLogoInitial: 'B',
    bitgoDesc: "BitGo reduziert die manuelle Überprüfung um 98 %, indem es die Fallmanagementlösung von Identra, das FinCEN 314a-Screening-Tool und die vollständige Identitätsplattform nutzt.",
    bitgoQuote: '„Als Startup mit mehreren Systemen brauchten wir eine Möglichkeit, unsere Benutzer über verschiedene BitGo-Tochtergesellschaften und Geschäftseinheiten hinweg zu konsolidieren. Uns fehlte eine klare Quelle der Wahrheit, und Identra bietet uns diese. Mit der Zeitersparnis bei der Überprüfung und der konsolidierten einzigen Quelle der Wahrheit könnte man die Ressourcen, die mein Team einspart, als Kapitalrendite bezeichnen.“',
    bitgoCite: 'Direktor der Treuhandverwaltung bei BitGo',

    resources: 'Ressourcen',
    keepLearning: 'Lerne weiter',
    readArticle: 'Artikel lesen',
    blogLabel: 'Blog',

    exploreUpsell: "Entdecken Sie mehr über die Identitätsplattform von Identra",
    upsell1Title: 'Automatisieren Sie alle Ihre Identitätsprozesse.',
    upsell1Desc: 'Definieren Sie Auslöser, führen Sie Überprüfungen dynamisch durch, überprüfen Sie Datenbanken, führen Sie Risikoalgorithmen aus und orchestrieren Sie manuelle Aufgaben mit Workflows.',
    upsell1Link: 'Siehe Workflows-Plattform',
    upsell2Title: 'Bringen Sie Ihre Daten und Tools in Identra ein.',
    upsell2Desc: 'Verbinden Sie Risikosysteme, CRM-Dienste, Ticketschalter oder Data Lakes von Drittanbietern mithilfe unserer robusten vorgefertigten Marktplatz-Apps.',
    upsell2Link: 'Siehe Integrationsmarktplatz',

    readyToGetStarted: 'Bereit, loszulegen?',
    readyToGetStartedDesc: 'Nehmen Sie noch heute Kontakt mit uns auf oder beginnen Sie mit der Erkundung von Identra. Richten Sie benutzerdefinierte Überprüfungswarteschlangen ein oder testen Sie die automatisierte Flow-Sandbox in wenigen Minuten.',
    tryItNow: 'Probieren Sie es jetzt aus',
  },
  vi: {
    backToPlatform: 'Quay lại Tổng quan Nền tảng',
    caseManagement: 'Quản lý hồ sơ',
    heroTitle: 'Quản lý hồ sơ tinh gọn ',
    heroTitleAccent: 'cho mọi trường hợp sử dụng.',
    heroDesc: 'Giảm bớt gánh nặng vận hành với các mô-đun kéo thả và ra quyết định bằng AI. Hợp nhất các tín hiệu rủi ro từ các nguồn chủ động, thụ động và bên ngoài vào một bảng điều khiển đánh giá duy nhất.',
    getDemo: 'Nhận bản demo',
    startExploring: 'Bắt đầu khám phá',
    
    identityCheck: 'Kiểm tra danh tính',
    activeDataValidation: 'Xác thực dữ liệu chủ động',
    passiveSignals: 'Tín hiệu thụ động',
    behavioralTelemetry: 'Đo lường hành vi',
    routingLogic: 'Logic định tuyến',
    readyForReview: 'Sẵn sàng cho trung tâm đánh giá thủ công',
    passed: 'ĐÃ ĐẠT',
    review: 'CẦN ĐÁNH GIÁ',
    engineVersion: 'IDV_DECISION_ENGINE_v4',
    logicIf: 'NẾU',
    logicRiskFlag: 'passive_risk_flag',
    logicEqualsTrue: '=== đúng',
    logicThen: 'THÌ',
    logicEscalateFunction: 'escalate_to_cases()',
    logoDapper: 'Dapper Labs',
    logoNewton: 'Newton',
    logoRipple: 'ripple',

    resolveMoreCases: 'Giải quyết nhiều hồ sơ hơn trong thời gian ngắn hơn',
    resolveMoreCasesDesc: 'Tự động hóa các hồ sơ thông thường với Đại lý Đánh giá Hồ sơ và điều tra các hồ sơ phức tạp nhanh hơn với các công cụ cộng tác tích hợp giúp nhóm của bạn luôn đồng bộ.',
    unlockSingleSource: 'Khai phá một nguồn dữ liệu đáng tin cậy duy nhất',
    unlockSingleSourceDesc: 'Thu thập và hợp nhất các tín hiệu chủ động, thụ động và hành vi từ Identra cũng như các nguồn bên ngoài để các đại lý và người đánh giá có tất cả bối cảnh liên quan ở một nơi.',
    builtWithCompliance: 'Xây dựng với định hướng tuân thủ',
    builtWithComplianceDesc: 'Đáp ứng các yêu cầu tuân thủ với ghi nhật ký kiểm toán toàn diện, danh sách kiểm tra, nhận xét và cấu trúc lưu trữ được mã hóa.',

    trustedBy: 'Được tin dùng bởi các công ty khởi nghiệp & các tập đoàn lớn nhất thế giới',

    sandboxBadge: 'Hộp cát thử nghiệm tương tác',
    howItWorks: 'Cách thức hoạt động',
    tabConfigure: '1 Cấu hình',
    tabInvestigate: '2 Điều tra',
    tabDecide: '3 Quyết định',

    configureTitle: 'Cấu hình biểu mẫu và quy tắc phân công',
    configureDesc: 'Tạo các biểu mẫu tùy chỉnh cho mọi loại hồ sơ. Sau đó, tùy chỉnh quy trình đánh giá bằng cách xác định các quy tắc phân công và trạng thái giải quyết.',
    tryItYourself: 'Hãy tự mình trải nghiệm:',
    tryItCheck1: 'Bật/tắt các quy tắc để xem đánh giá theo thời gian thực.',
    tryItCheck2: 'Tạo quy tắc tùy chỉnh ngay lập tức trong trình dựng.',
    addCustomRule: 'Thêm quy tắc đánh giá tùy chỉnh',
    createRuleTitle: 'Tạo quy tắc đánh giá',
    ruleNameLabel: 'Tên quy tắc',
    ruleNamePlaceholder: 'Ví dụ: Giới hạn Khoảng cách Địa lý',
    ifConditionLabel: 'Điều kiện Nếu',
    ifConditionPlaceholder: 'Ví dụ: Nếu quốc gia của người dùng khác với thương hiệu thẻ',
    thenActionLabel: 'Hành động Thì',
    thenActionPlaceholder: 'Ví dụ: Phân công cho hàng đợi Chuyển tiếp Gian lận',
    saveRule: 'Lưu quy tắc',
    cancel: 'Hủy',

    rulesBuilderTitle: 'Trình xây dựng quy tắc phân công',
    active: 'HOẠT ĐỘNG',
    actionLabel: 'Hành động:',
    deleteRule: 'Xóa quy tắc',
    totalActiveRules: 'Tổng số quy tắc hoạt động:',
    configVersion: 'Phiên bản cấu hình:',
    configVersionValue: 'v2.4.1',

    investigateTitle: 'Điều tra các hồ sơ phức tạp trên một bảng điều khiển duy nhất',
    investigateDesc: 'Thu thập và hợp nhất tất cả dữ liệu người dùng, chỉ số tin cậy so khớp, rủi ro hành vi và chi tiết cơ sở dữ liệu bên thứ ba vào một trung tâm điều tra sạch sẽ duy nhất.',
    reviewerConsoleLabel: 'Bảng điều khiển đánh giá tương tác:',
    reviewerConsoleDesc: 'Hãy thử giải quyết cuộc điều tra đang hoạt động bên dưới! Nhấp vào Phê duyệt, Từ chối hoặc Chuyển tiếp để kích hoạt các hành động tự động.',
    resetCaseSimulation: 'Đặt lại giả lập hồ sơ',

    caseConsole: 'Bảng điều khiển hồ sơ',
    assignedToYou: 'Người phụ trách: Bạn',
    reviewerInitials: 'AR',
    statusPending: 'Đang xử lý',
    statusApproved: 'Đã duyệt',
    statusRejected: 'Bị từ chối',
    statusEscalated: 'Đã chuyển tiếp',
    riskScoreLabel: 'Điểm rủi ro',
    riskScoreMaxLabel: '/ 100',
    evaluationSignalsLabel: 'Tín hiệu đánh giá',
    addPrivateNotePlaceholder: 'Thêm ghi chú điều tra nội bộ...',
    addButton: 'Thêm',
    reviewTimelineLabel: 'Dòng thời gian đánh giá',
    actionReviewerPanel: 'Bảng quyết định của người đánh giá',
    systemLogBus: 'LUỒNG_NHẬT_KÝ_HỆ_THỐNG:',
    approveCaseBtn: 'Phê duyệt hồ sơ',
    declineFraudBtn: 'Từ chối / Gian lận',
    escalateBtn: 'Chuyển tiếp',
    resolutionLogged: 'Đã ghi nhận hướng giải quyết.',
    reviewAnotherCase: 'Đánh giá hồ sơ khác',

    decideTitle: 'Kích hoạt các hành động tự động tiếp theo',
    decideDesc: 'Quyết định kết quả ngay lập tức với độ tin cậy cao. Người dùng được phê duyệt sẽ được ghi trực tiếp vào máy chủ của bạn thông qua webhook, trong khi các cá nhân bị gắn cờ sẽ kích hoạt bản nháp Báo cáo Hoạt động Đáng ngờ (SAR) tự động điền sẵn và các cảnh báo tùy chỉnh.',
    tryTriggerWebhook: 'Hãy thử kích hoạt webhook giả lập:',
    testingEndpoint: 'Đang thử nghiệm Endpoint...',
    triggerTestWebhook: 'Kích hoạt Webhook thử nghiệm',
    autoDecisionTerminal: 'Thiết bị đầu cuối ra quyết định tự động',
    webhookStatusOnline: 'Trạng thái Webhook: HOẠT ĐỘNG',
    targetLabel: 'Mục tiêu:',
    targetEndpointValue: 'https://api.yourdomain.com',
    decisionListenerCommand: '$ bin/lang-nghe-quyet-dinh --id=case_83921 --cong=3000',
    listeningForDecision: '// Đang lắng nghe quyết định của người đánh giá...',
    logBufferEmpty: '[Bộ đệm log trống. Nhấp vào \'Kích hoạt Webhook thử nghiệm\' để mô phỏng các hành động tiếp theo]',

    keyFeatures: 'Các tính năng chính',
    keyFeaturesTitle: 'Xây dựng quy trình quản lý hồ sơ lý tưởng của bạn',
    keyFeaturesDesc: 'Tùy chỉnh mọi khía cạnh trong quy trình điều tra thủ công của bạn. Thiết lập quy trình phân công, che bớt tài liệu cá nhân thô và sử dụng các chỉ số tùy chỉnh được thiết kế để tăng tốc độ vận hành.',
    customSchemaTitle: 'Sơ đồ hồ sơ tùy chỉnh',
    customSchemaSubtitle: 'Cấu hình giao diện người đánh giá',
    schemaConfigured: 'Sơ đồ đã được cấu hình',

    appScenarios: 'Các kịch bản ứng dụng',
    howTeamsUse: 'Cách các nhóm sử dụng Hồ sơ sự vụ',

    readCaseStudy: 'Đọc nghiên cứu tình huống',
    bitgoResults: 'Kết quả nghiên cứu thực tế BitGo',
    bitgoLogoInitial: 'B',
    bitgoDesc: 'BitGo giảm 98% số cuộc đánh giá thủ công nhờ tận dụng giải pháp quản lý hồ sơ của Identra, công cụ sàng lọc FinCEN 314a và toàn bộ nền tảng danh tính.',
    bitgoQuote: '“Là một công ty khởi nghiệp sở hữu nhiều hệ thống, chúng tôi cần một cách để hợp nhất người dùng của mình trên các đơn vị liên kết và đơn vị kinh doanh khác nhau của BitGo. Chúng tôi đã thiếu một nguồn sự thật rõ ràng, và Identra đã mang lại cho chúng tôi điều đó. Với thời gian tiết kiệm được trong quá trình đánh giá cùng nguồn dữ liệu đáng tin cậy duy nhất được hợp nhất, bạn có thể gọi nguồn tài nguyên mà nhóm của tôi tiết kiệm được là một khoản lợi nhuận trên vốn đầu tư.”',
    bitgoCite: 'Giám đốc quản trị ủy thác tại BitGo',

    resources: 'Tài nguyên',
    keepLearning: 'Tiếp tục tìm hiểu',
    readArticle: 'Đọc bài viết',
    blogLabel: 'Bài viết',

    exploreUpsell: 'Khám phá thêm về nền tảng danh tính của Identra',
    exploreUpsellDesc1: 'Định nghĩa các bộ kích hoạt, thực thi các xác minh động, kiểm tra cơ sở dữ liệu, chạy các thuật toán rủi ro và điều phối thủ công bằng Quy trình công việc.',
    upsell1Title: 'Tự động hóa mọi quy trình danh tính của bạn.',
    upsell1Desc: 'Xác định các trình kích hoạt, thực thi xác minh động, kiểm tra cơ sở dữ liệu, chạy thuật toán rủi ro và điều phối các tác vụ thủ công với Luồng quy trình.',
    upsell1Link: 'Xem nền tảng Luồng quy trình',
    upsell2Title: 'Đưa dữ liệu và công cụ của bạn vào Identra.',
    upsell2Desc: 'Kết nối các hệ thống rủi ro của bên thứ ba, dịch vụ CRM, dịch vụ hỗ trợ khách hàng hoặc hồ chứa dữ liệu bằng các ứng dụng thị trường dựng sẵn mạnh mẽ.',
    upsell2Link: 'Xem thị trường tích hợp',

    readyToGetStarted: 'Sẵn sàng để bắt đầu?',
    readyToGetStartedDesc: 'Liên hệ với chúng tôi hoặc bắt đầu khám phá Identra ngay hôm nay. Thiết lập hàng đợi đánh giá tùy chỉnh hoặc thử nghiệm hộp cát luồng tự động trong vài phút.',
    tryItNow: 'Thử ngay',
  }
};

export const ruleTranslations = {
  en: {
    rule1Name: 'High-Value Transactions',
    rule1Condition: 'If transaction amount > $10,000',
    rule1Action: 'Assign to Tier 2 Escalation Queue',
    rule2Name: 'VPN Proxy Guard',
    rule2Condition: 'If VPN or Proxy network is detected',
    rule2Action: 'Flag for review & require selfie liveness',
    rule3Name: 'Watchlist Flag',
    rule3Condition: 'If watchlist name similarity > 85%',
    rule3Action: 'Assign to Legal Compliance Review',
    rule4Name: 'Country Mismatch',
    rule4Condition: 'If ID country differs from IP country',
    rule4Action: 'Flag as suspicious fraud pattern'
  },
  es: {

    rule1Name: 'Transacciones de alto valor',
    rule1Condition: 'Si el monto de la transacción es > $10,000',
    rule1Action: 'Asignar a la cola de escalada de nivel 2',
    rule2Name: 'Guardia de proxy VPN',
    rule2Condition: 'Si se detecta una red VPN o Proxy',
    rule2Action: 'Marcar para revisión y requerir vida de selfie',
    rule3Name: 'Bandera de lista de seguimiento',
    rule3Condition: 'Si la similitud del nombre de la lista de seguimiento es > 85%',
    rule3Action: 'Asignar a revisión de cumplimiento legal',
    rule4Name: 'Desajuste de países',
    rule4Condition: 'Si el país de identificación difiere del país de IP',
    rule4Action: 'Marcar como patrón de fraude sospechoso'
  },
  ja: {

    rule1Name: '高額取引',
    rule1Condition: '取引金額 > $10,000の場合',
    rule1Action: 'Tier 2 エスカレーション キューに割り当てる',
    rule2Name: 'VPN プロキシ ガード',
    rule2Condition: 'VPN または Proxy ネットワークが検出された場合',
    rule2Action: 'レビュー用にフラグを立て、セルフィーのライブネスを要求する',
    rule3Name: 'ウォッチリストのフラグ',
    rule3Condition: 'ウォッチリスト名の類似性が 85% 以上の場合',
    rule3Action: '法令順守レビューに割り当て',
    rule4Name: '国の不一致',
    rule4Condition: 'IDの国とIPの国が異なる場合',
    rule4Action: '疑わしい詐欺パターンとしてフラグを立てる'
  },
  de: {

    rule1Name: 'Hochwertige Transaktionen',
    rule1Condition: 'Wenn der Transaktionsbetrag > 10.000 $ ist',
    rule1Action: 'Der Eskalationswarteschlange der Stufe 2 zuweisen',
    rule2Name: 'VPN-Proxy-Guard',
    rule2Condition: 'Wenn ein VPN- oder Proxy-Netzwerk erkannt wird',
    rule2Action: 'Zur Überprüfung markieren und Selfie-Lebendigkeit erfordern',
    rule3Name: 'Watchlist-Flag',
    rule3Condition: 'Wenn die Namensähnlichkeit der Beobachtungsliste > 85 % beträgt',
    rule3Action: 'Zur Überprüfung der Rechtskonformität zuweisen',
    rule4Name: 'Länderkonflikt',
    rule4Condition: 'Wenn sich das ID-Land vom IP-Land unterscheidet',
    rule4Action: 'Als verdächtiges Betrugsmuster markieren'
  },
  vi: {
    rule1Name: 'Giao dịch Giá trị cao',
    rule1Condition: 'Nếu số tiền giao dịch > $10.000',
    rule1Action: 'Phân công cho hàng đợi Chuyển tiếp Cấp 2',
    rule2Name: 'Bảo vệ Khỏi Proxy VPN',
    rule2Condition: 'Nếu phát hiện mạng VPN hoặc Proxy',
    rule2Action: 'Gắn cờ để đánh giá & yêu cầu độ sống động selfie',
    rule3Name: 'Cờ danh sách theo dõi',
    rule3Condition: 'Nếu độ tương đồng tên danh sách theo dõi > 85%',
    rule3Action: 'Phân công cho Đánh giá Tuân thủ Pháp lý',
    rule4Name: 'Quốc gia không trùng khớp',
    rule4Condition: 'Nếu quốc gia ID khác với quốc gia IP',
    rule4Action: 'Gắn cờ như mô hình gian lận nghi vấn'
  }
};

export const signalTranslations = {
  en: {
    vpnLabel: 'VPN Proxy Detected',
    vpnDetails: 'IP: 185.220.101.4 (Known data center VPN pool)',
    watchlistLabel: 'Watchlist Hit',
    watchlistDetails: 'Slight match with "Alejandro Rivera" (OFAC Sanctions List)',
    faceLabel: 'Face Match Confidence',
    faceDetails: '98% match confidence between ID portrait and selfie liveness check',
    docLabel: 'Document Tampering Check',
    docDetails: 'Passed: Hologram elements and fonts verified genuine'
  },
  es: {

    vpnLabel: 'Proxy VPN detectado',
    vpnDetails: 'IP: 185.220.101.4 (grupo de VPN del centro de datos conocido)',
    watchlistLabel: 'Lista de seguimiento',
    watchlistDetails: 'Leve partido con “Alejandro Rivera” (Lista de Sanciones de la OFAC)',
    faceLabel: 'Cara de confianza',
    faceDetails: '98% de confianza en la coincidencia entre el retrato de identificación y la verificación de vida del selfie',
    docLabel: 'Verificación de manipulación de documentos',
    docDetails: 'Aprobado: elementos de holograma y fuentes verificadas como genuinas'
  },
  ja: {

    vpnLabel: 'VPN プロキシが検出されました',
    vpnDetails: 'IP: 185.220.101.4 (既知のデータセンター VPN プール)',
    watchlistLabel: 'ウォッチリストのヒット',
    watchlistDetails: '「アレハンドロ・リベラ」（OFAC制裁リスト）とわずかに一致',
    faceLabel: '顔の一致の信頼度',
    faceDetails: 'ID ポートレートとセルフィーのライブネス チェック間の一致信頼度が 98%',
    docLabel: '文書改ざんチェック',
    docDetails: '合格: ホログラム要素とフォントが本物であることが確認されました'
  },
  de: {

    vpnLabel: 'VPN-Proxy erkannt',
    vpnDetails: 'IP: 185.220.101.4 (Bekannter VPN-Pool des Rechenzentrums)',
    watchlistLabel: 'Watchlist-Hit',
    watchlistDetails: 'Leichte Übereinstimmung mit „Alejandro Rivera“ (OFAC-Sanktionsliste)',
    faceLabel: 'Vertrauen ins Gesicht',
    faceDetails: '98 % Übereinstimmungssicherheit zwischen Ausweisporträt und Selfie-Lebendigkeitsprüfung',
    docLabel: 'Dokumentenmanipulationsprüfung',
    docDetails: 'Bestanden: Echtheit der Hologrammelemente und Schriftarten bestätigt'
  },
  vi: {
    vpnLabel: 'Phát hiện Proxy VPN',
    vpnDetails: 'IP: 185.220.101.4 (Bể VPN trung tâm dữ liệu đã biết)',
    watchlistLabel: 'Khớp danh sách theo dõi',
    watchlistDetails: 'Khớp nhẹ với "Alejandro Rivera" (Danh sách trừng phạt OFAC)',
    faceLabel: 'Độ tin cậy khớp khuôn mặt',
    faceDetails: 'Độ tin cậy khớp 98% giữa ảnh chân dung ID và kiểm tra độ sống selfie',
    docLabel: 'Kiểm tra giả mạo tài liệu',
    docDetails: 'Đã đạt: Các yếu tố hình ba chiều và phông chữ được xác minh là chính hãng'
  }
};

export const timelineTranslations = {
  en: {
    evt1: 'User completed information-collection flow',
    evt2: 'Passive behavioral checks generated risk score',
    evt3: 'Case case-83921 auto-generated & assigned to you'
  },
  es: {

    evt1: 'Flujo de recopilación de información completado por el usuario',
    evt2: 'Los controles de comportamiento pasivos generaron una puntuación de riesgo',
    evt3: 'Caso case-83921 generado automáticamente y asignado a usted'
  },
  ja: {

    evt1: 'ユーザーが完了する情報収集フロー',
    evt2: '受動的な行動チェックによりリスクスコアが生成される',
    evt3: 'ケース case-83921 が自動生成され、あなたに割り当てられました'
  },
  de: {

    evt1: 'Der Benutzer hat den Informationserfassungsfluss abgeschlossen',
    evt2: 'Passive Verhaltenskontrollen generierten einen Risikoscore',
    evt3: 'Fall case-83921 wurde automatisch generiert und Ihnen zugewiesen'
  },
  vi: {
    evt1: 'Người dùng đã hoàn thành luồng thu thập thông tin',
    evt2: 'Kiểm tra hành vi thụ động đã tạo điểm rủi ro',
    evt3: 'Hồ sơ sự vụ case-83921 tự động được tạo & phân công cho bạn'
  }
};

export const actionTranslations = {
  en: {
    approved: 'Reviewer APPROVED the case',
    rejected: 'Reviewer REJECTED the case as FRAUD',
    escalated: 'Reviewer ESCALATED the case to Tier 2',
    approvedLog: 'Webhook "case.approved" dispatched to API endpoint. Account unlocked.',
    rejectedLog: 'Webhook "case.rejected" dispatched. User banned. FinCEN Draft SAR created.',
    escalatedLog: 'Notification triggered to compliance lead. Re-routed to senior review queue.',
    waitingDecision: 'Waiting for reviewer decision on Case case-83921...',
    noteAdded: 'Note added:'
  },
  es: {

    approved: 'El revisor APROBÓ el caso',
    rejected: 'Revisor RECHAZÓ el caso como FRAUDE',
    escalated: 'El revisor ESCALÓ el caso al Nivel 2',
    approvedLog: 'Webhook "case.approved" enviado al punto final de API. Cuenta desbloqueada.',
    rejectedLog: 'Webhook "case.rejected" enviado. Usuario baneado. Se creó el borrador SAR de FinCEN.',
    escalatedLog: 'Notificación activada al líder de cumplimiento. Redirigido a la cola de revisión senior.',
    waitingDecision: 'Esperando la decisión del revisor sobre el Caso-83921...',
    noteAdded: 'Nota agregada:'
  },
  ja: {

    approved: '査読者がケースを承認しました',
    rejected: '査読者はこの訴訟を詐欺として却下しました',
    escalated: '審査担当者がケースを Tier 2 にエスカレーションしました',
    approvedLog: 'Webhook「case.approved」が API エンドポイントにディスパッチされました。アカウントのロックが解除されました。',
    rejectedLog: 'Webhook「case.rejected」がディスパッチされました。ユーザーが禁止されました。 FinCEN ドラフト SAR が作成されました。',
    escalatedLog: 'コンプライアンス責任者に通知がトリガーされました。上級レビューキューに再ルーティングされました。',
    waitingDecision: 'ケース case-83921 に関する審査担当者の決定を待っています...',
    noteAdded: '注が追加されました:'
  },
  de: {

    approved: 'Der Rezensent hat den Fall genehmigt',
    rejected: 'Der Rezensent hat den Fall als BETRUG ABGELEHNT',
    escalated: 'Der Prüfer hat den Fall an Tier 2 weitergeleitet',
    approvedLog: 'Webhook „case.approved“ wird an den API-Endpunkt gesendet. Konto entsperrt.',
    rejectedLog: 'Webhook „case.rejected“ wurde gesendet. Benutzer gesperrt. FinCEN Draft SAR erstellt.',
    escalatedLog: 'Benachrichtigung an Compliance-Leiter ausgelöst. Umgeleitet in die Warteschlange für Senior-Bewertungen.',
    waitingDecision: 'Warten auf die Entscheidung des Gutachters zum Fall Fall-83921...',
    noteAdded: 'Hinweis hinzugefügt:'
  },
  vi: {
    approved: 'Người đánh giá đã PHÊ DUYỆT hồ sơ',
    rejected: 'Người đánh giá đã TỪ CHỐI hồ sơ vì GIAN LẬN',
    escalated: 'Người đánh giá đã CHUYỂN TIẾP hồ sơ lên Cấp 2',
    approvedLog: 'Webhook "case.approved" đã được gửi đến endpoint API. Tài khoản được mở khóa.',
    rejectedLog: 'Webhook "case.rejected" đã được gửi. Người dùng bị cấm. Đã tạo bản nháp SAR FinCEN.',
    escalatedLog: 'Thông báo được gửi đến trưởng ban tuân thủ. Đã chuyển hướng sang hàng đợi đánh giá cấp cao.',
    waitingDecision: 'Đang chờ quyết định của người đánh giá cho Hồ sơ case-83921...',
    noteAdded: 'Ghi chú đã thêm:'
  }
};

export const webhookSimTranslations = {
  en: [

    '⚡ Initiating POST request to customer endpoint: https://api.yourdomain.com/webhooks/identra',
    '📦 Packing payload: { event: "case.approved", id: "case_83921", reviewer: "agent_402", ... }',
    '🔄 Resolving DNS and setting up secure TLS handshake...',
    '📤 Sending JSON body (1.42 KB)...',
    '🟢 Response received: HTTP/1.1 200 OK',
    '✅ Webhook delivered in 218ms! Database sync successful.'
  ],
  es: [
    '⚡ Iniciar solicitud POST al punto final del cliente: https://api.yourdomain.com/webhooks/identra',
    '📦 Carga útil de embalaje: { evento: "case.approved", id: "case_83921", revisor: "agent_402", ... }',
    '🔄 Resolver DNS y configurar un protocolo de enlace TLS seguro...',
    '📤 Envío de cuerpo JSON (1,42 KB)...',
    '🟢 Respuesta recibida: HTTP/1.1 200 OK',
    '✅ ¡Webhook entregado en 218 ms! Sincronización de la base de datos exitosa.'
  ],
  ja: [
    '⚡ 顧客エンドポイントへの POST リクエストの開始: https://api.yourdomain.com/webhooks/identra',
    '📦 ペイロードのパッキング: { イベント: "case.approved"、id: "case_83921"、レビューア: "agent_402", ... }',
    '🔄 DNS を解決し、安全な TLS ハンドシェイクを設定しています...',
    '📤 JSON 本文 (1.42 KB) を送信中...',
    '🟢 受信した応答: HTTP/1.1 200 OK',
    '✅ Webhook は 218 ミリ秒で配信されました!データベースの同期が成功しました。'
  ],
  de: [
    '⚡ Initiieren einer POST-Anfrage an den Kundenendpunkt: https://api.yourdomain.com/webhooks/identra',
    '📦 Nutzlast packen: { Ereignis: „case.approved“, ID: „case_83921“, Prüfer: „agent_402“, ... }',
    '🔄 DNS auflösen und sicheren TLS-Handshake einrichten ...',
    '📤 JSON-Text wird gesendet (1,42 KB)...',
    '🟢 Antwort erhalten: HTTP/1.1 200 OK',
    '✅ Webhook in 218 ms geliefert! Datenbanksynchronisierung erfolgreich.'
  ],
  vi: [

    '⚡ Khởi chạy yêu cầu POST đến endpoint khách hàng: https://api.yourdomain.com/webhooks/identra',
    '📦 Đóng gói dữ liệu payload: { event: "case.approved", id: "case_83921", reviewer: "agent_402", ... }',
    '🔄 Đang phân giải DNS và thiết lập bắt tay TLS bảo mật...',
    '📤 Đang gửi dữ liệu JSON (1.42 KB)...',
    '🟢 Đã nhận phản hồi: HTTP/1.1 200 OK',
    '✅ Webhook đã được gửi trong 218ms! Đồng bộ hóa cơ sở dữ liệu thành công.'
  ]
};

export const FEATURES_DATA = {
  en: [
    {
      title: 'Drag-and-drop layout editor',
      desc: 'Easily build and modify case templates for any use case. Dynamically customize the reviewer visual interface without writing a single line of code, including ordering data blocks, highlighting risk signals, and embedding action shortcuts.',
      subText: 'Prebuilt templates for KYC, KYB, and transaction monitoring.',
    },
    {
      title: 'Prebuilt investigation modules',
      desc: 'Incorporate native data modules instantly. Highlight ID document photo comparison blocks, match facial liveness video recordings, show geolocation distances on maps, and display structural behavioral telemetry reports in high contrast.',
      subText: '100+ native verification modules available.',
    },
    {
      title: 'Case Review Agents',
      desc: 'Augment human intelligence. AI-powered reviewers process passive and active signals, summarize key discrepancies, translate non-English documents, draft internal risk assessments, and automatically recommend precise next steps for reviewer speed.',
      subText: 'Reduces manual workload and triage overhead by up to 45%.',
    },
    {
      title: 'SLAs and alerts',
      desc: 'Set strict temporal SLA boundaries for cases based on queue levels. Automate high-priority notifications to Slack, MS Teams, or email when cases approach violation limits or when critical OFAC matching flags require legal intervention.',
      subText: 'Automated warnings, time tracking, and auto-escalations.',
    },
    {
      title: 'Escalation queues and assignment policies',
      desc: 'Establish complex assignment parameters. Automatically route cases to senior risk analysts, compliance specialists, or fraud directors depending on transaction value, risk tier, geographic origin, or team workload metrics.',
      subText: 'Fully automated multi-tier queue structures.',
    },
    {
      title: 'Granular control over PII',
      desc: 'Maintain absolute privacy. Hide, mask, or fully redact sensitive Personal Identifiable Information (PII) like SSNs, driver license numbers, or addresses based on custom reviewer access-level policies, matching CCPA & GDPR requirements.',
      subText: 'Role-based access controls and automatic redaction engine.',
    },
    {
      title: 'Audit logging',
      desc: 'Maintain detailed, unalterable event trails. Track every action taken by every reviewer, including open events, note entries, image zooms, SLA extensions, and full decision workflows to satisfy rigorous audit and regulatory criteria.',
      subText: 'Downloadable reports formatted for compliance auditors.',
    },
    {
      title: 'Integrations',
      desc: 'Sync effortlessly with your tech stack. Connect with Zendesk, Salesforce, Jira, or trigger custom server tasks using robust webhooks, secure REST APIs, and pre-packaged native integration libraries.',
      subText: '20+ custom enterprise connectors.',
    },
    {
      title: 'Productivity analytics',
      desc: 'Measure performance with elegant visuals. Track metrics such as average time-to-decision, case volumes across queues, individual analyst throughput, SLA success rates, and false-positive audit summaries.',
      subText: 'Rich real-time team dashboards and weekly summaries.',
    },
  ],
  es: [
    {
      title: 'Editor de diseño de arrastrar y soltar',
      desc: 'Cree y modifique fácilmente plantillas de casos para cualquier caso de uso. Personalice dinámicamente la interfaz visual del revisor sin escribir una sola línea de código, lo que incluye ordenar bloques de datos, resaltar señales de riesgo e incorporar atajos de acción.',
      subText: 'Plantillas prediseñadas para KYC, KYB y monitoreo de transacciones.',
    },
    {
      title: 'Módulos de investigación prediseñados',
      desc: 'Incorpora módulos de datos nativos al instante. Resalte bloques de comparación de fotografías de documentos de identificación, combine grabaciones de video de vida facial, muestre distancias de geolocalización en mapas y muestre informes de telemetría de comportamiento estructural en alto contraste.',
      subText: 'Más de 100 módulos de verificación nativos disponibles.',
    },
    {
      title: 'Agentes de revisión de casos',
      desc: 'Aumentar la inteligencia humana. Los revisores con tecnología de inteligencia artificial procesan señales pasivas y activas, resumen las discrepancias clave, traducen documentos que no están en inglés, redactan evaluaciones de riesgos internas y recomiendan automáticamente los siguientes pasos precisos para acelerar el revisor.',
      subText: 'Reduce la carga de trabajo manual y los gastos generales de clasificación hasta en un 45 %.',
    },
    {
      title: 'SLA y alertas',
      desc: 'Establezca límites de SLA temporales estrictos para casos basados ​​en niveles de cola. Automatice las notificaciones de alta prioridad a Slack, MS Teams o envíe un correo electrónico cuando los casos se acerquen a los límites de infracción o cuando los indicadores críticos de coincidencia de la OFAC requieran intervención legal.',
      subText: 'Advertencias automatizadas, seguimiento del tiempo y escalaciones automáticas.',
    },
    {
      title: 'Colas de escalada y políticas de asignación',
      desc: 'Establezca parámetros de asignación complejos. Dirija automáticamente los casos a analistas de riesgo senior, especialistas en cumplimiento o directores de fraude según el valor de la transacción, el nivel de riesgo, el origen geográfico o las métricas de la carga de trabajo del equipo.',
      subText: 'Estructuras de colas de varios niveles totalmente automatizadas.',
    },
    {
      title: 'Control granular sobre PII',
      desc: 'Mantener absoluta privacidad. Oculte, enmascare o redacte por completo información de identificación personal (PII) confidencial, como números de seguro social, números de licencia de conducir o direcciones, según políticas personalizadas de nivel de acceso de revisor, que cumplan con los requisitos de CCPA y GDPR.',
      subText: 'Controles de acceso basados ​​en roles y motor de redacción automática.',
    },
    {
      title: 'Registro de auditoría',
      desc: 'Mantenga registros de eventos detallados e inalterables. Realice un seguimiento de cada acción realizada por cada revisor, incluidos eventos abiertos, entradas de notas, zooms de imágenes, extensiones de SLA y flujos de trabajo de decisiones completos para satisfacer criterios regulatorios y de auditoría rigurosos.',
      subText: 'Informes descargables formateados para auditores de cumplimiento.',
    },
    {
      title: 'Integraciones',
      desc: 'Sincroniza sin esfuerzo con tu pila tecnológica. Conéctese con Zendesk, Salesforce, Jira o active tareas de servidor personalizadas mediante webhooks sólidos, API REST seguras y bibliotecas de integración nativas empaquetadas previamente.',
      subText: 'Más de 20 conectores empresariales personalizados.',
    },
    {
      title: 'Análisis de productividad',
      desc: 'Mida el rendimiento con imágenes elegantes. Realice un seguimiento de métricas como el tiempo promedio de toma de decisiones, los volúmenes de casos en las colas, el rendimiento de los analistas individuales, las tasas de éxito de los SLA y los resúmenes de auditoría falsos positivos.',
      subText: 'Paneles de control del equipo enriquecidos en tiempo real y resúmenes semanales.',
    },
  ],
  ja: [
    {
      title: 'ドラッグアンドドロップレイアウトエディター',
      desc: 'あらゆるユースケースに合わせてケース テンプレートを簡単に構築および変更できます。コードを 1 行も記述することなく、データ ブロックの順序付け、リスク シグナルの強調表示、アクション ショートカットの埋め込みなど、レビュー担当者のビジュアル インターフェイスを動的にカスタマイズします。',
      subText: 'KYC、KYB、トランザクション監視用の事前構築されたテンプレート。',
    },
    {
      title: '事前構築された調査モジュール',
      desc: 'ネイティブ データ モジュールを即座に組み込みます。 ID 書類の写真比較ブロックをハイライト表示し、顔の生き生きとしたビデオ録画を照合し、地図上に地理位置情報の距離を表示し、構造的行動テレメトリー レポートをハイ コントラストで表示します。',
      subText: '100 を超えるネイティブ検証モジュールが利用可能。',
    },
    {
      title: 'ケースレビューエージェント',
      desc: '人間の知性を拡張します。 AI を活用したレビュー担当者は、パッシブおよびアクティブなシグナルを処理し、主な矛盾を要約し、英語以外の文書を翻訳し、内部リスク評価の草案を作成し、レビュー担当者のスピードを高めるための正確な次のステップを自動的に推奨します。',
      subText: '手動の作業負荷とトリアージのオーバーヘッドを最大 45% 削減します。',
    },
    {
      title: 'SLA とアラート',
      desc: 'キュー レベルに基づいて、ケースに対して厳密な一時的な SLA 境界を設定します。ケースが違反制限に近づいた場合、または重要な OFAC 一致フラグで法的介入が必要な場合、Slack、MS Teams、または電子メールへの優先度の高い通知を自動化します。',
      subText: '自動警告、時間追跡、自動エスカレーション。',
    },
    {
      title: 'エスカレーションキューと割り当てポリシー',
      desc: '複雑な割り当てパラメータを確立します。取引額、リスク層、地理的出身地、またはチームのワークロード指標に応じて、ケースを上級リスク アナリスト、コンプライアンス スペシャリスト、または不正行為ディレクターに自動的にルーティングします。',
      subText: '完全に自動化された多層キュー構造。',
    },
    {
      title: 'PII をきめ細かく制御',
      desc: '絶対的なプライバシーを維持します。 CCPA および GDPR の要件に一致するカスタムのレビュー担当者のアクセス レベル ポリシーに基づいて、SSN、運転免許証番号、住所などの機密の個人識別情報 (PII) を非表示、マスク、または完全に編集します。',
      subText: '役割ベースのアクセス制御と自動編集エンジン。',
    },
    {
      title: '監査ログ',
      desc: '詳細で変更不可能なイベントの証跡を維持します。オープンイベント、メモ入力、画像ズーム、SLA延長、厳格な監査および規制基準を満たすための完全な意思決定ワークフローなど、すべてのレビュー担当者が実行したすべてのアクションを追跡します。',
      subText: 'コンプライアンス監査人向けにフォーマットされたダウンロード可能なレポート。',
    },
    {
      title: '統合',
      desc: '技術スタックと簡単に同期できます。 Zendesk、Salesforce、Jira に接続したり、堅牢な Webhook、安全な REST API、事前にパッケージ化されたネイティブ統合ライブラリを使用してカスタム サーバー タスクをトリガーしたりできます。',
      subText: '20 以上のカスタム エンタープライズ コネクタ。',
    },
    {
      title: '生産性分析',
      desc: 'エレガントなビジュアルでパフォーマンスを測定します。平均決定までの時間、キュー全体のケース量、個々のアナリストのスループット、SLA 成功率、誤検知の監査概要などの指標を追跡します。',
      subText: '豊富なリアルタイムのチーム ダッシュボードと週ごとのサマリー。',
    },
  ],
  de: [
    {
      title: 'Drag-and-Drop-Layout-Editor',
      desc: 'Erstellen und ändern Sie ganz einfach Fallvorlagen für jeden Anwendungsfall. Passen Sie die visuelle Benutzeroberfläche des Prüfers dynamisch an, ohne eine einzige Codezeile schreiben zu müssen, einschließlich der Anordnung von Datenblöcken, der Hervorhebung von Risikosignalen und der Einbettung von Aktionsverknüpfungen.',
      subText: 'Vorgefertigte Vorlagen für KYC, KYB und Transaktionsüberwachung.',
    },
    {
      title: 'Vorgefertigte Untersuchungsmodule',
      desc: 'Integrieren Sie sofort native Datenmodule. Heben Sie Vergleichsblöcke für ID-Dokumentfotos hervor, gleichen Sie Videoaufzeichnungen zur Gesichtslebendigkeit ab, zeigen Sie Geolokalisierungsentfernungen auf Karten an und zeigen Sie strukturelle Verhaltenstelemetrieberichte mit hohem Kontrast an.',
      subText: 'Über 100 native Verifizierungsmodule verfügbar.',
    },
    {
      title: 'Fallbegutachtungsagenten',
      desc: 'Erweitern Sie die menschliche Intelligenz. KI-gestützte Prüfer verarbeiten passive und aktive Signale, fassen wichtige Unstimmigkeiten zusammen, übersetzen nicht-englische Dokumente, entwerfen interne Risikobewertungen und empfehlen automatisch präzise nächste Schritte, um die Prüfgeschwindigkeit zu erhöhen.',
      subText: 'Reduziert den manuellen Arbeitsaufwand und den Triage-Overhead um bis zu 45 %.',
    },
    {
      title: 'SLAs und Warnungen',
      desc: 'Legen Sie strikte zeitliche SLA-Grenzen für Fälle basierend auf den Warteschlangenstufen fest. Automatisieren Sie Benachrichtigungen mit hoher Priorität an Slack, MS Teams oder E-Mails, wenn Fälle die Grenzwerte für Verstöße erreichen oder wenn kritische OFAC-Übereinstimmungsmarkierungen ein rechtliches Eingreifen erfordern.',
      subText: 'Automatisierte Warnungen, Zeiterfassung und automatische Eskalationen.',
    },
    {
      title: 'Eskalationswarteschlangen und Zuweisungsrichtlinien',
      desc: 'Komplexe Zuweisungsparameter festlegen. Leiten Sie Fälle automatisch an leitende Risikoanalysten, Compliance-Spezialisten oder Betrugsdirektoren weiter, abhängig vom Transaktionswert, der Risikostufe, der geografischen Herkunft oder den Kennzahlen zur Arbeitsbelastung des Teams.',
      subText: 'Vollautomatische mehrstufige Warteschlangenstrukturen.',
    },
    {
      title: 'Granulare Kontrolle über personenbezogene Daten',
      desc: 'Behalten Sie absolute Privatsphäre bei. Verstecken, maskieren oder schwärzen Sie vertrauliche personenbezogene Daten (PII) wie SSNs, Führerscheinnummern oder Adressen vollständig, basierend auf benutzerdefinierten Zugriffsebenenrichtlinien für Prüfer, die den CCPA- und DSGVO-Anforderungen entsprechen.',
      subText: 'Rollenbasierte Zugriffskontrollen und automatische Redaktions-Engine.',
    },
    {
      title: 'Audit-Protokollierung',
      desc: 'Pflegen Sie detaillierte, unveränderliche Ereignispfade. Verfolgen Sie jede Aktion jedes Prüfers, einschließlich offener Ereignisse, Notizeinträge, Bildvergrößerungen, SLA-Erweiterungen und vollständiger Entscheidungsworkflows, um strenge Prüfungs- und Regulierungskriterien zu erfüllen.',
      subText: 'Herunterladbare Berichte im Format für Compliance-Prüfer.',
    },
    {
      title: 'Integrationen',
      desc: 'Synchronisieren Sie mühelos mit Ihrem Tech-Stack. Verbinden Sie sich mit Zendesk, Salesforce, Jira oder lösen Sie benutzerdefinierte Serveraufgaben aus, indem Sie robuste Webhooks, sichere REST-APIs und vorgefertigte native Integrationsbibliotheken verwenden.',
      subText: 'Über 20 benutzerdefinierte Unternehmenskonnektoren.',
    },
    {
      title: 'Produktivitätsanalyse',
      desc: 'Messen Sie die Leistung mit eleganter Optik. Verfolgen Sie Kennzahlen wie die durchschnittliche Zeit bis zur Entscheidung, Fallvolumen in allen Warteschlangen, den Durchsatz einzelner Analysten, SLA-Erfolgsquoten und falsch-positive Prüfungszusammenfassungen.',
      subText: 'Umfangreiche Echtzeit-Team-Dashboards und wöchentliche Zusammenfassungen.',
    },
  ],
  vi: [
    {
      title: 'Trình biên tập bố cục kéo thả',
      desc: 'Dễ dàng xây dựng và sửa đổi các biểu mẫu hồ sơ cho bất kỳ trường hợp sử dụng nào. Tùy chỉnh động giao diện trực quan của người đánh giá mà không cần viết một dòng mã nào, bao gồm sắp xếp các khối dữ liệu, đánh dấu các tín hiệu rủi ro và nhúng các lối tắt hành động.',
      subText: 'Biểu mẫu dựng sẵn cho KYC, KYB và giám sát giao dịch.',
    },
    {
      title: 'Các mô-đun điều tra dựng sẵn',
      desc: 'Tích hợp các mô-đun dữ liệu gốc ngay lập tức. Làm nổi bật các khối so sánh ảnh tài liệu ID, khớp các bản ghi video độ sống động của khuôn mặt, hiển thị khoảng cách địa lý trên bản đồ và hiển thị các báo cáo dữ liệu đo lường hành vi có cấu trúc ở độ tương phản cao.',
      subText: 'Hơn 100 mô-đun xác minh gốc có sẵn.',
    },
    {
      title: 'Đại lý Đánh giá Hồ sơ',
      desc: 'Tăng cường trí tuệ con người. Các bộ đánh giá được hỗ trợ bởi AI xử lý các tín hiệu thụ động và chủ động, tóm tắt các điểm khác biệt chính, dịch các tài liệu không phải tiếng Anh, soạn thảo các đánh giá rủi ro nội bộ và tự động đề xuất các bước tiếp theo chính xác để người đánh giá thao tác nhanh hơn.',
      subText: 'Giảm khối lượng công việc thủ công và chi phí sàng lọc lên đến 45%.',
    },
    {
      title: 'SLA và cảnh báo',
      desc: 'Thiết lập ranh giới thời gian SLA nghiêm ngặt cho các hồ sơ dựa trên các cấp độ hàng đợi. Tự động hóa các thông báo ưu tiên cao đến Slack, MS Teams hoặc email khi các hồ sơ tiến gần đến giới hạn vi phạm hoặc khi các cờ trùng khớp OFAC quan trọng yêu cầu can thiệp pháp lý.',
      subText: 'Cảnh báo tự động, theo dõi thời gian và tự động chuyển tiếp.',
    },
    {
      title: 'Hàng đợi chuyển tiếp và chính sách phân công',
      desc: 'Thiết lập các tham số phân công phức tạp. Tự động định tuyến các hồ sơ đến các nhà phân tích rủi ro cao cấp, chuyên gia tuân thủ hoặc giám đốc gian lận tùy thuộc vào giá trị giao dịch, mức độ rủi ro, nguồn gốc địa lý hoặc các chỉ số khối lượng công việc của nhóm.',
      subText: 'Cấu trúc hàng đợi đa cấp hoàn toàn tự động.',
    },
    {
      title: 'Kiểm soát chi tiết đối với thông tin PII',
      desc: 'Duy trì quyền riêng tư tuyệt đối. Ẩn, che hoặc che khuất hoàn toàn thông tin nhận dạng cá nhân nhạy cảm (PII) như số định danh cá nhân, số giấy phép lái xe hoặc địa chỉ dựa trên chính sách cấp độ truy cập tùy chỉnh của người đánh giá, đáp ứng các yêu cầu của CCPA & GDPR.',
      subText: 'Kiểm soát truy cập dựa trên vai trò và công cụ tự động che thông tin.',
    },
    {
      title: 'Nhật ký kiểm toán',
      desc: 'Duy trì các vết sự kiện chi tiết, không thể thay đổi. Theo dõi mọi hành động được thực hiện bởi mọi người đánh giá, bao gồm các sự kiện mở, ghi chú, thu phóng hình ảnh, gia hạn SLA và toàn bộ quy trình quyết định để đáp ứng các tiêu chuẩn kiểm toán và quy định nghiêm ngặt.',
      subText: 'Báo cáo có thể tải xuống được định dạng cho kiểm toán viên tuân thủ.',
    },
    {
      title: 'Tích hợp',
      desc: 'Đồng bộ hóa dễ dàng với ngăn xếp công nghệ của bạn. Kết nối với Zendesk, Salesforce, Jira hoặc kích hoạt các tác vụ máy chủ tùy chỉnh bằng cách sử dụng các webhook mạnh mẽ, API REST an toàn và các thư viện tích hợp gốc được đóng gói sẵn.',
      subText: 'Hơn 20 trình kết nối doanh nghiệp tùy chỉnh.',
    },
    {
      title: 'Phân tích năng suất',
      desc: 'Đo lường hiệu suất với hình ảnh trực quan thanh lịch. Theo dõi các chỉ số như thời gian trung bình đưa ra quyết định, khối lượng hồ sơ trên các hàng đợi, năng suất của từng nhà phân tích, tỷ lệ thành công của SLA và tóm tắt kiểm toán dương tính giả.',
      subText: 'Bảng điều khiển nhóm thời gian thực phong phú và tóm tắt hàng tuần.',
    },
  ]
};

export const USE_CASES_TRANS = {
  en: [
    {
      title: 'KYC',
      desc: 'Review users at every stage of their journey, from onboarding to reverifications to account recovery. Triage manual cases without losing onboarding momentum.',
    },
    {
      title: 'KYB',
      desc: 'Streamline and automate the Know Your Business (KYB) process with our integrated KYB-KYC solution. Consolidate registry data and beneficial owners.',
    },
    {
      title: 'AML case management & automated SAR filing',
      desc: 'Streamline AML case management, manage active and pending AML investigations, and file SARs with compliant prebuilt FinCEN templates.',
    },
    {
      title: 'Fraud investigation',
      desc: 'Step up investigation for risky users with additional manual screening. Investigate linked fraudulent accounts, matching attributes, and device footprints.',
    },
    {
      title: 'Quick process rollouts',
      desc: 'Continuously improve identity processes by testing new checks and adjusting risk thresholds, especially in response to regulatory shifts or fraud waves.',
    },
    {
      title: 'Automated operations',
      desc: 'Automate manual processes to streamline tasks like commercial underwriting, risk tier calculation, or manual call center verification checks.',
    },
  ],
  es: [
    {
      title: 'KYC',
      desc: 'Revise a los usuarios en cada etapa de su recorrido, desde la incorporación hasta las nuevas verificaciones y la recuperación de la cuenta. Clasifique los casos manualmente sin perder el impulso de incorporación.',
    },
    {
      title: 'KYB',
      desc: 'Agilice y automatice el proceso Conozca su negocio (KYB) con nuestra solución integrada KYB-KYC. Consolidar datos registrales y beneficiarios finales.',
    },
    {
      title: 'Gestión de casos AML y presentación automatizada de SAR',
      desc: 'Optimice la gestión de casos de ALD, administre investigaciones de ALD activas y pendientes y presente SAR con plantillas FinCEN prediseñadas y compatibles.',
    },
    {
      title: 'Investigación de fraude',
      desc: 'Intensifique la investigación de usuarios riesgosos con una detección manual adicional. Investigue cuentas fraudulentas vinculadas, atributos coincidentes y huellas de dispositivos.',
    },
    {
      title: 'Implementaciones de procesos rápidos',
      desc: 'Mejore continuamente los procesos de identidad probando nuevos controles y ajustando los umbrales de riesgo, especialmente en respuesta a cambios regulatorios u oleadas de fraude.',
    },
    {
      title: 'Operaciones automatizadas',
      desc: 'Automatice los procesos manuales para agilizar tareas como la suscripción comercial, el cálculo del nivel de riesgo o las verificaciones manuales de verificación del centro de llamadas.',
    },
  ],
  ja: [
    {
      title: '本人確認',
      desc: 'オンボーディングから再検証、アカウント回復に至るまで、ユーザーのジャーニーのあらゆる段階でユーザーをレビューします。オンボーディングの勢いを失うことなく、手動ケースをトリアージします。',
    },
    {
      title: 'KYB',
      desc: '当社の統合された KYB-KYC ソリューションを使用して、Know Your Business (KYB) プロセスを合理化および自動化します。レジストリ データと受益者を統合します。',
    },
    {
      title: 'AML 症例管理と自動化された SAR 申告',
      desc: 'AML 事件管理を合理化し、進行中および保留中の AML 調査を管理し、準拠した事前構築済みの FinCEN テンプレートを使用して SAR をファイルします。',
    },
    {
      title: '不正調査',
      desc: '追加の手動スクリーニングにより、危険なユーザーの調査を強化します。リンクされた不正なアカウント、一致する属性、デバイスのフットプリントを調査します。',
    },
    {
      title: '迅速なプロセスの展開',
      desc: '特に規制の変化や不正行為の波に対応して、新しいチェックをテストし、リスクしきい値を調整することで、アイデンティティ プロセスを継続的に改善します。',
    },
    {
      title: '自動化された操作',
      desc: '手動プロセスを自動化して、商業引受業務、リスク層の計算、コールセンターの手動検証チェックなどのタスクを合理化します。',
    },
  ],
  de: [
    {
      title: 'KYC',
      desc: 'Überprüfen Sie Benutzer in jeder Phase ihrer Reise, vom Onboarding über erneute Bestätigungen bis hin zur Kontowiederherstellung. Sortieren Sie manuelle Fälle, ohne die Onboarding-Dynamik zu verlieren.',
    },
    {
      title: 'KYB',
      desc: 'Optimieren und automatisieren Sie den Know Your Business (KYB)-Prozess mit unserer integrierten KYB-KYC-Lösung. Konsolidieren Sie Registerdaten und wirtschaftliche Eigentümer.',
    },
    {
      title: 'AML-Fallmanagement und automatisierte SAR-Einreichung',
      desc: 'Optimieren Sie das AML-Fallmanagement, verwalten Sie aktive und ausstehende AML-Untersuchungen und reichen Sie SARs mit konformen vorgefertigten FinCEN-Vorlagen ein.',
    },
    {
      title: 'Betrugsermittlung',
      desc: 'Verstärken Sie die Untersuchung risikoreicher Benutzer durch zusätzliche manuelle Überprüfung. Untersuchen Sie verknüpfte betrügerische Konten, übereinstimmende Attribute und Geräte-Footprints.',
    },
    {
      title: 'Schnelle Prozesseinführungen',
      desc: 'Verbessern Sie kontinuierlich Identitätsprozesse, indem Sie neue Prüfungen testen und Risikoschwellen anpassen, insbesondere als Reaktion auf regulatorische Änderungen oder Betrugswellen.',
    },
    {
      title: 'Automatisierte Abläufe',
      desc: 'Automatisieren Sie manuelle Prozesse, um Aufgaben wie das kommerzielle Underwriting, die Berechnung der Risikostufe oder manuelle Callcenter-Verifizierungsprüfungen zu optimieren.',
    },
  ],
  vi: [
    {
      title: 'KYC',
      desc: 'Đánh giá người dùng ở mọi giai đoạn trong hành trình của họ, từ tham gia hệ thống, xác minh lại cho đến khôi phục tài khoản. Sàng lọc các hồ sơ thủ công mà không làm mất đà gia nhập hệ thống.',
    },
    {
      title: 'KYB',
      desc: 'Tinh giản và tự động hóa quy trình Xác minh Doanh nghiệp (KYB) với giải pháp KYB-KYC tích hợp của chúng tôi. Hợp nhất dữ liệu đăng ký và chủ sở hữu hưởng lợi.',
    },
    {
      title: 'Quản lý hồ sơ AML & khai báo SAR tự động',
      desc: 'Tinh giản việc quản lý hồ sơ AML, quản lý các cuộc điều tra AML đang hoạt động và đang chờ xử lý, đồng thời nộp các báo cáo SAR với các biểu mẫu FinCEN dựng sẵn tuân thủ.',
    },
    {
      title: 'Điều tra gian lận',
      desc: 'Đẩy mạnh điều tra đối với những người dùng rủi ro bằng việc sàng lọc thủ công bổ sung. Điều tra các tài khoản gian lận có liên kết, các thuộc tính trùng khớp và dấu vết thiết bị.',
    },
    {
      title: 'Triển khai quy trình nhanh chóng',
      desc: 'Liên tục cải thiện các quy trình danh tính bằng cách thử nghiệm các lượt kiểm tra mới và điều chỉnh ngưỡng rủi ro, đặc biệt là để ứng phó với các thay đổi quy định hoặc làn sóng gian lận.',
    },
    {
      title: 'Vận hành tự động',
      desc: 'Tự động hóa các quy trình thủ công để tinh giản các tác vụ như thẩm định thương mại, tính toán mức rủi ro hoặc kiểm tra xác minh trung tâm cuộc gọi thủ công.',
    },
  ]
};

export const BLOG_TRANS = {
  en: [
    {
      title: 'AML case management: What is it, and why is it important?',
      category: 'Blog',
      readTime: '7 mins',
    },
    {
      title: 'Reimagine your manual review process with Identra Cases',
      category: 'Blog',
      readTime: '4 mins',
    },
    {
      title: 'The case for automated identity verification',
      category: 'Blog',
      readTime: '8 mins',
    },
  ],
  es: [
    {
      title: 'Gestión de casos de AML: ¿Qué es y por qué es importante?',
      category: 'Blog',
      readTime: '7 minutos',
    },
    {
      title: 'Reimagine su proceso de revisión manual con Identra Cases',
      category: 'Blog',
      readTime: '4 minutos',
    },
    {
      title: 'El caso de la verificación de identidad automatizada',
      category: 'Blog',
      readTime: '8 minutos',
    },
  ],
  ja: [
    {
      title: 'AML 症例管理: それは何ですか?なぜ重要ですか?',
      category: 'ブログ',
      readTime: '7分',
    },
    {
      title: 'ペルソナ ケースを使用して手動レビュー プロセスを再考する',
      category: 'ブログ',
      readTime: '4分',
    },
    {
      title: '自動本人確認の事例',
      category: 'ブログ',
      readTime: '8分',
    },
  ],
  de: [
    {
      title: 'AML-Fallmanagement: Was ist das und warum ist es wichtig?',
      category: 'Blog',
      readTime: '7 Min',
    },
    {
      title: 'Gestalten Sie Ihren manuellen Überprüfungsprozess mit Identra Cases neu',
      category: 'Blog',
      readTime: '4 Min',
    },
    {
      title: 'Der Fall einer automatisierten Identitätsprüfung',
      category: 'Blog',
      readTime: '8 Min',
    },
  ],
  vi: [
    {
      title: 'Quản lý hồ sơ AML: Định nghĩa và tầm quan trọng',
      category: 'Bài viết',
      readTime: '7 phút',
    },
    {
      title: 'Tái thiết kế quy trình đánh giá thủ công của bạn với Identra Cases',
      category: 'Bài viết',
      readTime: '4 phút',
    },
    {
      title: 'Lý do nên tự động hóa việc xác minh danh tính',
      category: 'Bài viết',
      readTime: '8 phút',
    },
  ]
};

// DYNAMIC TRANSLATION HELPERS
