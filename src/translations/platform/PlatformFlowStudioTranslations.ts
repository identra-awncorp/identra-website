/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import type {
  PlatformFlowActionType,
  PlatformFlowPresetId,
  PlatformFlowRuleField,
  PlatformFlowRuleOperator,
  PlatformFlowScenarioId,
  PlatformFlowSignalId,
  PlatformFlowStepId,
  PlatformFlowValidationIssue,
} from '../../components/platform/PlatformFlowStudioModel';

export type PlatformFlowStudioStage = 'collect' | 'orchestrate' | 'analyze';

interface DescribedCopy {
  title: string;
  description: string;
}

interface PlatformFlowStudioCopy {
  badge: string;
  title: string;
  description: string;
  studioAriaLabel: string;
  flowNameLabel: string;
  flowNameHint: string;
  presetLabel: string;
  resetFlow: string;
  exportCode: string;
  invalidConfigTitle: string;
  estimatedMetrics: string;
  stages: Record<PlatformFlowStudioStage, DescribedCopy>;
  presets: Record<PlatformFlowPresetId, DescribedCopy>;
  moduleLibraryTitle: string;
  moduleLibraryDescription: string;
  addModule: string;
  moduleAdded: string;
  flowCanvasTitle: string;
  flowCanvasDescription: string;
  emptyFlowTitle: string;
  emptyFlowDescription: string;
  modeLabel: string;
  modeAlways: string;
  modeStepUp: string;
  moveUp: string;
  moveDown: string;
  removeStep: string;
  dragStep: string;
  steps: Record<PlatformFlowStepId, DescribedCopy>;
  metricCompletion: string;
  metricAssurance: string;
  metricDetection: string;
  metricDuration: string;
  secondsShort: string;
  rulesTitle: string;
  rulesDescription: string;
  addRule: string;
  emptyRulesTitle: string;
  emptyRulesDescription: string;
  priorityLabel: string;
  fieldLabel: string;
  operatorLabel: string;
  valueLabel: string;
  actionLabel: string;
  stepUpTargetLabel: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fields: Record<PlatformFlowRuleField, string>;
  operators: Record<PlatformFlowRuleOperator, string>;
  values: {
    valid: string;
    invalid: string;
    clear: string;
    hit: string;
    trusted: string;
    suspicious: string;
  };
  actions: Record<PlatformFlowActionType, string>;
  removeRule: string;
  topologyTitle: string;
  topologyDescription: string;
  firstMatchNote: string;
  fallbackRoute: string;
  signalsTitle: string;
  signalsDescription: string;
  signals: Record<PlatformFlowSignalId, DescribedCopy>;
  scenariosTitle: string;
  scenariosDescription: string;
  scenarios: Record<PlatformFlowScenarioId, DescribedCopy>;
  runSimulation: string;
  runningSimulation: string;
  runAgain: string;
  executionTitle: string;
  executionDescription: string;
  noResultTitle: string;
  noResultDescription: string;
  riskScore: string;
  matchedRule: string;
  defaultRoute: string;
  finalDecision: string;
  staleResult: string;
  baseRisk: string;
  signalImpact: string;
  statuses: {
    passed: string;
    warning: string;
    failed: string;
    skipped: string;
    pending: string;
    running: string;
    completed: string;
  };
  graphTitle: string;
  graphDescription: string;
  graphEmptyTitle: string;
  graphEmptyDescription: string;
  graphAccount: string;
  graphDevice: string;
  graphIp: string;
  graphSelected: string;
  graphSharedConnections: string;
  validation: Record<PlatformFlowValidationIssue, string>;
  exportTitle: string;
  exportDescription: string;
  exportDisclaimer: string;
  typescriptTab: string;
  jsonTab: string;
  downloadFile: string;
  closeDialog: string;
}

const en: PlatformFlowStudioCopy = {
  badge: 'INTERACTIVE FLOW STUDIO',
  title: 'Design, orchestrate, and test one verification flow',
  description: 'Build the customer journey, define decision rules, then run the same configuration through risk analysis before exporting an integration scaffold.',
  studioAriaLabel: 'Identra interactive verification Flow Studio',
  flowNameLabel: 'Technical flow name',
  flowNameHint: 'Used as the configuration identifier and export file name.',
  presetLabel: 'Starting template',
  resetFlow: 'Reset flow',
  exportCode: 'Export code',
  invalidConfigTitle: 'Complete the configuration before simulating or exporting.',
  estimatedMetrics: 'Live estimates',
  stages: {
    collect: { title: 'Dynamic Flow', description: 'Choose and order verification modules.' },
    orchestrate: { title: 'Orchestrate & automate', description: 'Route each session with prioritized rules.' },
    analyze: { title: 'Analyze & prevent', description: 'Run profiles and inspect risk signals.' },
  },
  presets: {
    'ssi-minimal': { title: 'SSI minimal disclosure', description: 'Use cryptographic credentials first and request a selfie only when risk increases.' },
    'kyc-high-assurance': { title: 'High-assurance KYC', description: 'Combine document, biometric, database, and watchlist checks.' },
    'kyb-business': { title: 'Business KYB', description: 'Match the owner identity to a business registration credential.' },
    blank: { title: 'Blank flow', description: 'Start with an empty verification canvas.' },
  },
  moduleLibraryTitle: 'Verification modules',
  moduleLibraryDescription: 'Add each module once, then arrange the customer journey.',
  addModule: 'Add module',
  moduleAdded: 'Added',
  flowCanvasTitle: 'Verification canvas',
  flowCanvasDescription: 'The main rail always runs. Step-up modules run only when a rule requests them.',
  emptyFlowTitle: 'Your flow is empty',
  emptyFlowDescription: 'Add a verification module from the library to begin.',
  modeLabel: 'Execution mode',
  modeAlways: 'Always run',
  modeStepUp: 'Step-up only',
  moveUp: 'Move up',
  moveDown: 'Move down',
  removeStep: 'Remove module',
  dragStep: 'Drag to reorder',
  steps: {
    'identity-credential': { title: 'Identity credential', description: 'Request only the required identity claims from a cryptographically verifiable credential.' },
    'business-registration-credential': { title: 'Business registration credential', description: 'Retrieve verified legal name and registration number from the business credential.' },
    'ownership-match': { title: 'Business ownership match', description: 'Match the applicant identity to the registered business owner.' },
    'government-id': { title: 'Government ID', description: 'Capture and inspect a passport, identity card, or driving licence.' },
    'selfie-liveness': { title: 'Selfie and liveness', description: 'Match the applicant face and confirm a live capture.' },
    'database-kyc': { title: 'KYC database checks', description: 'Compare minimum identity data against authoritative databases.' },
    watchlist: { title: 'Watchlist screening', description: 'Check sanctions, PEP, and relevant risk lists.' },
  },
  metricCompletion: 'Expected completion',
  metricAssurance: 'Assurance score',
  metricDetection: 'Fraud detection',
  metricDuration: 'Average duration',
  secondsShort: 'sec',
  rulesTitle: 'Decision rules',
  rulesDescription: 'Rules run from top to bottom. The first matching condition emits its action.',
  addRule: 'Add rule',
  emptyRulesTitle: 'No decision rules yet',
  emptyRulesDescription: 'Sessions will use the fallback action until a rule is added.',
  priorityLabel: 'Priority',
  fieldLabel: 'Signal',
  operatorLabel: 'Operator',
  valueLabel: 'Value',
  actionLabel: 'Action',
  stepUpTargetLabel: 'Step-up module',
  fallbackTitle: 'Fallback action',
  fallbackDescription: 'Used when no rule matches the session.',
  fields: {
    'risk-score': 'Risk score',
    'credential-status': 'Credential status',
    'watchlist-status': 'Watchlist status',
    'device-trust': 'Device trust',
  },
  operators: {
    'less-than': 'is less than',
    'less-than-or-equal': 'is at most',
    'greater-than': 'is greater than',
    'greater-than-or-equal': 'is at least',
    equals: 'equals',
    'not-equals': 'does not equal',
  },
  values: {
    valid: 'Valid',
    invalid: 'Invalid',
    clear: 'Clear',
    hit: 'Match found',
    trusted: 'Trusted',
    suspicious: 'Suspicious',
  },
  actions: {
    approve: 'Approve',
    'request-step-up': 'Request step-up',
    'manual-review': 'Send to manual review',
    reject: 'Reject',
    'send-webhook': 'Send webhook',
  },
  removeRule: 'Remove rule',
  topologyTitle: 'Live routing map',
  topologyDescription: 'See how priority and fallback shape the final route.',
  firstMatchNote: 'First matching rule wins',
  fallbackRoute: 'Fallback',
  signalsTitle: 'Prevention signals',
  signalsDescription: 'Enable the background signals that should contribute to the risk decision.',
  signals: {
    'device-fingerprint': { title: 'Device fingerprint', description: 'Identify reused hardware, emulators, and inconsistent device traits.' },
    'ip-reputation': { title: 'IP reputation', description: 'Detect VPN, proxy, Tor, hosting, and geographic anomalies.' },
    'behavior-velocity': { title: 'Behavior velocity', description: 'Measure repeated attempts, automation, and impossible interaction speed.' },
    'graph-links': { title: 'Graph link analysis', description: 'Connect accounts through shared devices, networks, and repeated identifiers.' },
  },
  scenariosTitle: 'Test profile',
  scenariosDescription: 'Run a fixed profile through the current configuration.',
  scenarios: {
    trusted: { title: 'Trusted applicant', description: 'Valid credential, known device, and no watchlist match.' },
    'step-up': { title: 'Step-up required', description: 'Valid identity with suspicious device and network signals.' },
    'fraud-ring': { title: 'Coordinated fraud ring', description: 'Linked accounts share risky infrastructure and watchlist indicators.' },
  },
  runSimulation: 'Run simulation',
  runningSimulation: 'Running flow',
  runAgain: 'Run again',
  executionTitle: 'Execution timeline',
  executionDescription: 'Every event below comes from the flow configured in the other two stages.',
  noResultTitle: 'Ready to test',
  noResultDescription: 'Choose a profile and run the simulation to see verification, risk, routing, and prevention in one timeline.',
  riskScore: 'Risk score',
  matchedRule: 'Matched rule',
  defaultRoute: 'Fallback route',
  finalDecision: 'Final decision',
  staleResult: 'The configuration changed. Run the simulation again for an up-to-date result.',
  baseRisk: 'Base profile risk',
  signalImpact: 'Signal impact',
  statuses: {
    passed: 'Passed',
    warning: 'Needs attention',
    failed: 'Failed',
    skipped: 'Skipped',
    pending: 'Pending',
    running: 'Running',
    completed: 'Completed',
  },
  graphTitle: 'Connected risk graph',
  graphDescription: 'Shared infrastructure becomes visible when Graph link analysis is enabled.',
  graphEmptyTitle: 'No linked network to display',
  graphEmptyDescription: 'Choose the fraud-ring profile and enable Graph link analysis to reveal shared entities.',
  graphAccount: 'Account',
  graphDevice: 'Device',
  graphIp: 'IP network',
  graphSelected: 'Selected entity',
  graphSharedConnections: 'Shared risk connections',
  validation: {
    'missing-name': 'Enter a technical flow name.',
    'missing-verification-step': 'Add at least one verification module.',
    'duplicate-verification-step': 'A verification module can appear only once.',
    'duplicate-rule-id': 'Each workflow rule must have a unique identifier.',
    'invalid-risk-value': 'Risk score values must be between 0 and 100.',
    'invalid-rule-operator': 'The selected operator is not valid for this signal.',
    'missing-step-up-target': 'Choose a module for the step-up action.',
    'invalid-step-up-target': 'The selected target must use Step-up only mode.',
  },
  exportTitle: 'Export integration scaffold',
  exportDescription: 'Both views are generated from the current Flow Studio configuration.',
  exportDisclaimer: 'Illustrative sandbox SDK only. Review the production Identra SDK contract before deployment.',
  typescriptTab: 'TypeScript',
  jsonTab: 'JSON config',
  downloadFile: 'Download file',
  closeDialog: 'Close export dialog',
};

const es: PlatformFlowStudioCopy = {
  badge: 'ESTUDIO DE FLUJOS INTERACTIVO',
  title: 'Diseña, orquesta y prueba un único flujo de verificación',
  description: 'Crea el recorrido, define las reglas de decisión y ejecuta la misma configuración en el análisis de riesgo antes de exportar una base de integración.',
  studioAriaLabel: 'Estudio interactivo de flujos de verificación de Identra',
  flowNameLabel: 'Nombre técnico del flujo',
  flowNameHint: 'Se usa como identificador de configuración y nombre del archivo exportado.',
  presetLabel: 'Plantilla inicial',
  resetFlow: 'Restablecer flujo',
  exportCode: 'Exportar código',
  invalidConfigTitle: 'Completa la configuración antes de simular o exportar.',
  estimatedMetrics: 'Estimaciones en vivo',
  stages: {
    collect: { title: 'Dynamic Flow', description: 'Elige y ordena los módulos de verificación.' },
    orchestrate: { title: 'Orquestar y automatizar', description: 'Dirige cada sesión con reglas prioritarias.' },
    analyze: { title: 'Analizar y prevenir', description: 'Prueba perfiles e inspecciona señales de riesgo.' },
  },
  presets: {
    'ssi-minimal': { title: 'SSI con revelación mínima', description: 'Prioriza credenciales criptográficas y solicita selfie solo cuando aumenta el riesgo.' },
    'kyc-high-assurance': { title: 'KYC de alta garantía', description: 'Combina documento, biometría, bases de datos y listas de control.' },
    'kyb-business': { title: 'KYB empresarial', description: 'Vincula la identidad del titular con la credencial de registro empresarial.' },
    blank: { title: 'Flujo vacío', description: 'Empieza con un lienzo de verificación vacío.' },
  },
  moduleLibraryTitle: 'Módulos de verificación',
  moduleLibraryDescription: 'Añade cada módulo una vez y ordena el recorrido del cliente.',
  addModule: 'Añadir módulo',
  moduleAdded: 'Añadido',
  flowCanvasTitle: 'Lienzo de verificación',
  flowCanvasDescription: 'La ruta principal siempre se ejecuta. Los módulos adicionales solo se activan cuando una regla los solicita.',
  emptyFlowTitle: 'El flujo está vacío',
  emptyFlowDescription: 'Añade un módulo desde la biblioteca para comenzar.',
  modeLabel: 'Modo de ejecución',
  modeAlways: 'Ejecutar siempre',
  modeStepUp: 'Solo verificación adicional',
  moveUp: 'Mover arriba',
  moveDown: 'Mover abajo',
  removeStep: 'Eliminar módulo',
  dragStep: 'Arrastrar para ordenar',
  steps: {
    'identity-credential': { title: 'Credencial de identidad', description: 'Solicita únicamente los atributos necesarios de una credencial verificable criptográficamente.' },
    'business-registration-credential': { title: 'Credencial de registro empresarial', description: 'Obtiene la razón social y el número de registro verificados.' },
    'ownership-match': { title: 'Coincidencia de titularidad', description: 'Vincula la identidad del solicitante con el propietario registrado.' },
    'government-id': { title: 'Documento oficial', description: 'Captura y analiza pasaporte, documento de identidad o permiso de conducir.' },
    'selfie-liveness': { title: 'Selfie y prueba de vida', description: 'Compara el rostro y confirma una captura en vivo.' },
    'database-kyc': { title: 'Consultas KYC', description: 'Contrasta los datos mínimos con fuentes autorizadas.' },
    watchlist: { title: 'Listas de control', description: 'Consulta sanciones, PEP y listas de riesgo relevantes.' },
  },
  metricCompletion: 'Finalización esperada',
  metricAssurance: 'Nivel de garantía',
  metricDetection: 'Detección de fraude',
  metricDuration: 'Duración media',
  secondsShort: 's',
  rulesTitle: 'Reglas de decisión',
  rulesDescription: 'Las reglas se ejecutan de arriba abajo. La primera coincidencia emite su acción.',
  addRule: 'Añadir regla',
  emptyRulesTitle: 'Aún no hay reglas',
  emptyRulesDescription: 'Las sesiones usarán la acción predeterminada hasta que añadas una regla.',
  priorityLabel: 'Prioridad',
  fieldLabel: 'Señal',
  operatorLabel: 'Operador',
  valueLabel: 'Valor',
  actionLabel: 'Acción',
  stepUpTargetLabel: 'Módulo adicional',
  fallbackTitle: 'Acción predeterminada',
  fallbackDescription: 'Se usa cuando ninguna regla coincide.',
  fields: {
    'risk-score': 'Puntuación de riesgo',
    'credential-status': 'Estado de la credencial',
    'watchlist-status': 'Estado en listas',
    'device-trust': 'Confianza del dispositivo',
  },
  operators: {
    'less-than': 'es menor que',
    'less-than-or-equal': 'es como máximo',
    'greater-than': 'es mayor que',
    'greater-than-or-equal': 'es al menos',
    equals: 'es igual a',
    'not-equals': 'no es igual a',
  },
  values: { valid: 'Válida', invalid: 'No válida', clear: 'Sin coincidencias', hit: 'Coincidencia', trusted: 'Confiable', suspicious: 'Sospechoso' },
  actions: { approve: 'Aprobar', 'request-step-up': 'Solicitar verificación adicional', 'manual-review': 'Enviar a revisión manual', reject: 'Rechazar', 'send-webhook': 'Enviar webhook' },
  removeRule: 'Eliminar regla',
  topologyTitle: 'Mapa de rutas en vivo',
  topologyDescription: 'Observa cómo la prioridad y la acción predeterminada definen la ruta.',
  firstMatchNote: 'Se aplica la primera coincidencia',
  fallbackRoute: 'Ruta predeterminada',
  signalsTitle: 'Señales de prevención',
  signalsDescription: 'Activa las señales de fondo que deben contribuir a la decisión de riesgo.',
  signals: {
    'device-fingerprint': { title: 'Huella del dispositivo', description: 'Detecta hardware reutilizado, emuladores y rasgos inconsistentes.' },
    'ip-reputation': { title: 'Reputación de IP', description: 'Detecta VPN, proxy, Tor, hosting y anomalías geográficas.' },
    'behavior-velocity': { title: 'Velocidad de comportamiento', description: 'Mide intentos repetidos, automatización e interacciones imposibles.' },
    'graph-links': { title: 'Análisis de enlaces Graph', description: 'Relaciona cuentas mediante dispositivos, redes e identificadores compartidos.' },
  },
  scenariosTitle: 'Perfil de prueba',
  scenariosDescription: 'Ejecuta un perfil fijo con la configuración actual.',
  scenarios: {
    trusted: { title: 'Solicitante confiable', description: 'Credencial válida, dispositivo conocido y sin coincidencias.' },
    'step-up': { title: 'Verificación adicional', description: 'Identidad válida con señales sospechosas de dispositivo y red.' },
    'fraud-ring': { title: 'Red de fraude coordinado', description: 'Varias cuentas comparten infraestructura riesgosa e indicadores de listas.' },
  },
  runSimulation: 'Ejecutar simulación',
  runningSimulation: 'Ejecutando flujo',
  runAgain: 'Ejecutar de nuevo',
  executionTitle: 'Línea de ejecución',
  executionDescription: 'Cada evento procede del flujo configurado en las otras dos etapas.',
  noResultTitle: 'Listo para probar',
  noResultDescription: 'Elige un perfil y ejecuta la simulación para ver verificación, riesgo, ruta y prevención.',
  riskScore: 'Puntuación de riesgo',
  matchedRule: 'Regla coincidente',
  defaultRoute: 'Ruta predeterminada',
  finalDecision: 'Decisión final',
  staleResult: 'La configuración cambió. Ejecuta de nuevo para actualizar el resultado.',
  baseRisk: 'Riesgo base',
  signalImpact: 'Impacto de señales',
  statuses: { passed: 'Superado', warning: 'Requiere atención', failed: 'Fallido', skipped: 'Omitido', pending: 'Pendiente', running: 'En curso', completed: 'Completado' },
  graphTitle: 'Grafo de riesgo conectado',
  graphDescription: 'La infraestructura compartida aparece cuando se activa Graph.',
  graphEmptyTitle: 'No hay red vinculada',
  graphEmptyDescription: 'Selecciona el perfil de fraude y activa Graph para mostrar entidades compartidas.',
  graphAccount: 'Cuenta',
  graphDevice: 'Dispositivo',
  graphIp: 'Red IP',
  graphSelected: 'Entidad seleccionada',
  graphSharedConnections: 'Conexiones de riesgo compartidas',
  validation: {
    'missing-name': 'Introduce un nombre técnico.',
    'missing-verification-step': 'Añade al menos un módulo de verificación.',
    'duplicate-verification-step': 'Cada módulo solo puede aparecer una vez.',
    'duplicate-rule-id': 'Cada regla debe tener un identificador único.',
    'invalid-risk-value': 'La puntuación debe estar entre 0 y 100.',
    'invalid-rule-operator': 'El operador no es válido para esta señal.',
    'missing-step-up-target': 'Elige un módulo para la verificación adicional.',
    'invalid-step-up-target': 'El módulo elegido debe usar el modo de verificación adicional.',
  },
  exportTitle: 'Exportar base de integración',
  exportDescription: 'Ambas vistas se generan desde la configuración actual.',
  exportDisclaimer: 'SDK ilustrativo de sandbox. Revisa el contrato de producción antes del despliegue.',
  typescriptTab: 'TypeScript',
  jsonTab: 'Configuración JSON',
  downloadFile: 'Descargar archivo',
  closeDialog: 'Cerrar diálogo de exportación',
};

const ja: PlatformFlowStudioCopy = {
  badge: 'インタラクティブ FLOW STUDIO',
  title: '1つの本人確認フローを設計・制御・検証',
  description: '利用者フローと判定ルールを設定し、同じ構成でリスク分析を実行してから統合コードを出力します。',
  studioAriaLabel: 'Identra本人確認フロー・スタジオ',
  flowNameLabel: 'フローの技術名',
  flowNameHint: '構成IDとエクスポートファイル名に使用します。',
  presetLabel: '開始テンプレート',
  resetFlow: 'フローをリセット',
  exportCode: 'コードを出力',
  invalidConfigTitle: 'シミュレーションまたは出力の前に構成を完成してください。',
  estimatedMetrics: 'リアルタイム予測',
  stages: {
    collect: { title: 'Dynamic Flow', description: '本人確認モジュールを選択して並べます。' },
    orchestrate: { title: '制御と自動化', description: '優先ルールで各セッションを振り分けます。' },
    analyze: { title: '分析と防止', description: 'プロファイルを実行し、リスク信号を確認します。' },
  },
  presets: {
    'ssi-minimal': { title: 'SSI最小開示', description: '暗号学的な実証を優先し、リスク上昇時のみselfieを要求します。' },
    'kyc-high-assurance': { title: '高保証KYC', description: '書類、生体認証、データベース、監視リストを組み合わせます。' },
    'kyb-business': { title: '法人KYB', description: '申請者の本人情報と法人登録の実証を照合します。' },
    blank: { title: '空のフロー', description: '空の本人確認キャンバスから開始します。' },
  },
  moduleLibraryTitle: '本人確認モジュール',
  moduleLibraryDescription: '各モジュールを1回だけ追加し、利用者フローを並べ替えます。',
  addModule: 'モジュールを追加',
  moduleAdded: '追加済み',
  flowCanvasTitle: '本人確認キャンバス',
  flowCanvasDescription: 'メイン経路は常に実行され、追加確認モジュールはルールが要求した場合のみ実行されます。',
  emptyFlowTitle: 'フローは空です',
  emptyFlowDescription: 'ライブラリからモジュールを追加してください。',
  modeLabel: '実行モード',
  modeAlways: '常に実行',
  modeStepUp: '追加確認時のみ',
  moveUp: '上へ移動',
  moveDown: '下へ移動',
  removeStep: 'モジュールを削除',
  dragStep: 'ドラッグして並べ替え',
  steps: {
    'identity-credential': { title: '本人情報の実証', description: '暗号学的に検証可能な実証から必要な属性だけを要求します。' },
    'business-registration-credential': { title: '法人登録の実証', description: '確認済みの法人名と登録番号を取得します。' },
    'ownership-match': { title: '法人所有者の照合', description: '申請者の本人情報を登録済み所有者と照合します。' },
    'government-id': { title: '公的身分証明書', description: 'パスポート、IDカード、運転免許証を取得して確認します。' },
    'selfie-liveness': { title: 'Selfieと生体確認', description: '顔を照合し、ライブ撮影であることを確認します。' },
    'database-kyc': { title: 'KYCデータベース照合', description: '必要最小限の本人情報を公的データと照合します。' },
    watchlist: { title: '監視リスト照合', description: '制裁、PEP、関連リスクリストを確認します。' },
  },
  metricCompletion: '完了率予測',
  metricAssurance: '保証スコア',
  metricDetection: '不正検知率',
  metricDuration: '平均時間',
  secondsShort: '秒',
  rulesTitle: '判定ルール',
  rulesDescription: '上から順に評価し、最初に一致したルールの処理を実行します。',
  addRule: 'ルールを追加',
  emptyRulesTitle: '判定ルールがありません',
  emptyRulesDescription: 'ルールを追加するまで既定の処理を使用します。',
  priorityLabel: '優先度',
  fieldLabel: '信号',
  operatorLabel: '演算子',
  valueLabel: '値',
  actionLabel: '処理',
  stepUpTargetLabel: '追加確認モジュール',
  fallbackTitle: '既定の処理',
  fallbackDescription: 'どのルールにも一致しない場合に使用します。',
  fields: { 'risk-score': 'リスクスコア', 'credential-status': '実証の状態', 'watchlist-status': '監視リストの状態', 'device-trust': '端末の信頼度' },
  operators: { 'less-than': '未満', 'less-than-or-equal': '以下', 'greater-than': 'より大きい', 'greater-than-or-equal': '以上', equals: '等しい', 'not-equals': '等しくない' },
  values: { valid: '有効', invalid: '無効', clear: '一致なし', hit: '一致あり', trusted: '信頼済み', suspicious: '疑わしい' },
  actions: { approve: '承認', 'request-step-up': '追加確認を要求', 'manual-review': '手動審査へ送る', reject: '拒否', 'send-webhook': 'Webhookを送信' },
  removeRule: 'ルールを削除',
  topologyTitle: 'ライブ経路マップ',
  topologyDescription: '優先順位と既定処理が経路をどう決めるか確認できます。',
  firstMatchNote: '最初に一致したルールを適用',
  fallbackRoute: '既定経路',
  signalsTitle: '防止信号',
  signalsDescription: 'リスク判定に使用するバックグラウンド信号を有効にします。',
  signals: {
    'device-fingerprint': { title: '端末フィンガープリント', description: '再利用端末、エミュレーター、不整合な端末特性を検知します。' },
    'ip-reputation': { title: 'IPレピュテーション', description: 'VPN、Proxy、Tor、ホスティング、地域異常を検知します。' },
    'behavior-velocity': { title: '行動速度', description: '反復試行、自動化、不自然な操作速度を測定します。' },
    'graph-links': { title: 'Graphリンク分析', description: '共有端末、ネットワーク、識別子からアカウントを関連付けます。' },
  },
  scenariosTitle: 'テストプロファイル',
  scenariosDescription: '現在の構成で固定プロファイルを実行します。',
  scenarios: {
    trusted: { title: '信頼できる申請者', description: '有効な実証、既知端末、監視リスト一致なし。' },
    'step-up': { title: '追加確認が必要', description: '本人情報は有効ですが、端末とネットワークに疑わしい信号があります。' },
    'fraud-ring': { title: '組織的不正ネットワーク', description: '複数アカウントが危険なインフラと監視指標を共有しています。' },
  },
  runSimulation: 'シミュレーションを実行',
  runningSimulation: 'フローを実行中',
  runAgain: '再実行',
  executionTitle: '実行タイムライン',
  executionDescription: 'すべてのイベントは他の2段階で設定したフローから生成されます。',
  noResultTitle: 'テスト準備完了',
  noResultDescription: 'プロファイルを選び、本人確認、リスク、経路、防止処理を一続きで確認します。',
  riskScore: 'リスクスコア',
  matchedRule: '一致したルール',
  defaultRoute: '既定経路',
  finalDecision: '最終判定',
  staleResult: '構成が変更されました。最新結果を得るには再実行してください。',
  baseRisk: '基本リスク',
  signalImpact: '信号の影響',
  statuses: { passed: '成功', warning: '要確認', failed: '失敗', skipped: 'スキップ', pending: '待機中', running: '実行中', completed: '完了' },
  graphTitle: '関連リスクグラフ',
  graphDescription: 'Graphリンク分析を有効にすると共有インフラが表示されます。',
  graphEmptyTitle: '表示できる関連ネットワークがありません',
  graphEmptyDescription: '不正ネットワークを選び、Graphリンク分析を有効にしてください。',
  graphAccount: 'アカウント',
  graphDevice: '端末',
  graphIp: 'IPネットワーク',
  graphSelected: '選択中のエンティティ',
  graphSharedConnections: '共有リスク接続',
  validation: {
    'missing-name': 'フローの技術名を入力してください。',
    'missing-verification-step': '本人確認モジュールを1つ以上追加してください。',
    'duplicate-verification-step': '同じモジュールは1回だけ追加できます。',
    'duplicate-rule-id': '各ルールには固有IDが必要です。',
    'invalid-risk-value': 'リスクスコアは0から100で指定してください。',
    'invalid-rule-operator': 'この信号では選択した演算子を使用できません。',
    'missing-step-up-target': '追加確認モジュールを選択してください。',
    'invalid-step-up-target': '対象モジュールを「追加確認時のみ」に設定してください。',
  },
  exportTitle: '統合コードを出力',
  exportDescription: '両方の表示は現在のFlow Studio構成から生成されます。',
  exportDisclaimer: 'Sandbox用の説明SDKです。本番導入前に正式なIdentra SDK仕様を確認してください。',
  typescriptTab: 'TypeScript',
  jsonTab: 'JSON構成',
  downloadFile: 'ファイルをダウンロード',
  closeDialog: '出力ダイアログを閉じる',
};

const de: PlatformFlowStudioCopy = {
  badge: 'INTERAKTIVES FLOW STUDIO',
  title: 'Einen Verifizierungsablauf entwerfen, steuern und testen',
  description: 'Gestalten Sie die Nutzerstrecke, definieren Sie Entscheidungsregeln und testen Sie dieselbe Konfiguration in der Risikoanalyse, bevor Sie Integrationscode exportieren.',
  studioAriaLabel: 'Interaktives Identra Flow Studio für Verifizierungen',
  flowNameLabel: 'Technischer Flow-Name',
  flowNameHint: 'Wird als Konfigurations-ID und Exportdateiname verwendet.',
  presetLabel: 'Startvorlage',
  resetFlow: 'Flow zurücksetzen',
  exportCode: 'Code exportieren',
  invalidConfigTitle: 'Vervollständigen Sie die Konfiguration vor Simulation oder Export.',
  estimatedMetrics: 'Live-Schätzwerte',
  stages: {
    collect: { title: 'Dynamic Flow', description: 'Verifizierungsmodule auswählen und anordnen.' },
    orchestrate: { title: 'Orchestrieren & automatisieren', description: 'Sitzungen mit priorisierten Regeln steuern.' },
    analyze: { title: 'Analysieren & verhindern', description: 'Profile ausführen und Risikosignale prüfen.' },
  },
  presets: {
    'ssi-minimal': { title: 'SSI mit minimaler Offenlegung', description: 'Kryptografische Nachweise zuerst; Selfie nur bei erhöhtem Risiko.' },
    'kyc-high-assurance': { title: 'KYC mit hoher Sicherheit', description: 'Dokument-, Biometrie-, Datenbank- und Watchlist-Prüfungen kombinieren.' },
    'kyb-business': { title: 'Unternehmens-KYB', description: 'Identität des Eigentümers mit dem Unternehmensnachweis abgleichen.' },
    blank: { title: 'Leerer Flow', description: 'Mit einer leeren Verifizierungsfläche beginnen.' },
  },
  moduleLibraryTitle: 'Verifizierungsmodule',
  moduleLibraryDescription: 'Jedes Modul einmal hinzufügen und die Nutzerstrecke anordnen.',
  addModule: 'Modul hinzufügen',
  moduleAdded: 'Hinzugefügt',
  flowCanvasTitle: 'Verifizierungsfläche',
  flowCanvasDescription: 'Der Hauptpfad läuft immer. Zusatzmodule werden nur durch eine Regel aktiviert.',
  emptyFlowTitle: 'Der Flow ist leer',
  emptyFlowDescription: 'Fügen Sie ein Modul aus der Bibliothek hinzu.',
  modeLabel: 'Ausführungsmodus',
  modeAlways: 'Immer ausführen',
  modeStepUp: 'Nur Zusatzprüfung',
  moveUp: 'Nach oben',
  moveDown: 'Nach unten',
  removeStep: 'Modul entfernen',
  dragStep: 'Zum Sortieren ziehen',
  steps: {
    'identity-credential': { title: 'Identitätsnachweis', description: 'Nur erforderliche Attribute aus einem kryptografisch prüfbaren Nachweis anfordern.' },
    'business-registration-credential': { title: 'Unternehmensnachweis', description: 'Geprüften Firmennamen und Registrierungsnummer abrufen.' },
    'ownership-match': { title: 'Eigentümerabgleich', description: 'Identität der antragstellenden Person mit dem registrierten Eigentümer abgleichen.' },
    'government-id': { title: 'Amtliches Ausweisdokument', description: 'Reisepass, Ausweis oder Führerschein erfassen und prüfen.' },
    'selfie-liveness': { title: 'Selfie und Liveness', description: 'Gesicht abgleichen und eine Live-Aufnahme bestätigen.' },
    'database-kyc': { title: 'KYC-Datenbankprüfungen', description: 'Minimale Identitätsdaten mit maßgeblichen Quellen abgleichen.' },
    watchlist: { title: 'Watchlist-Prüfung', description: 'Sanktions-, PEP- und relevante Risikolisten prüfen.' },
  },
  metricCompletion: 'Erwarteter Abschluss',
  metricAssurance: 'Sicherheitswert',
  metricDetection: 'Betrugserkennung',
  metricDuration: 'Durchschnittsdauer',
  secondsShort: 'Sek.',
  rulesTitle: 'Entscheidungsregeln',
  rulesDescription: 'Regeln laufen von oben nach unten. Die erste passende Regel bestimmt die Aktion.',
  addRule: 'Regel hinzufügen',
  emptyRulesTitle: 'Noch keine Regeln',
  emptyRulesDescription: 'Bis eine Regel angelegt ist, wird die Standardaktion verwendet.',
  priorityLabel: 'Priorität',
  fieldLabel: 'Signal',
  operatorLabel: 'Operator',
  valueLabel: 'Wert',
  actionLabel: 'Aktion',
  stepUpTargetLabel: 'Zusatzmodul',
  fallbackTitle: 'Standardaktion',
  fallbackDescription: 'Wird verwendet, wenn keine Regel passt.',
  fields: { 'risk-score': 'Risikowert', 'credential-status': 'Nachweisstatus', 'watchlist-status': 'Watchlist-Status', 'device-trust': 'Gerätevertrauen' },
  operators: { 'less-than': 'ist kleiner als', 'less-than-or-equal': 'ist höchstens', 'greater-than': 'ist größer als', 'greater-than-or-equal': 'ist mindestens', equals: 'ist gleich', 'not-equals': 'ist nicht gleich' },
  values: { valid: 'Gültig', invalid: 'Ungültig', clear: 'Kein Treffer', hit: 'Treffer', trusted: 'Vertrauenswürdig', suspicious: 'Verdächtig' },
  actions: { approve: 'Genehmigen', 'request-step-up': 'Zusatzprüfung anfordern', 'manual-review': 'Zur manuellen Prüfung', reject: 'Ablehnen', 'send-webhook': 'Webhook senden' },
  removeRule: 'Regel entfernen',
  topologyTitle: 'Live-Routing',
  topologyDescription: 'Sehen Sie, wie Priorität und Standardaktion den Pfad bestimmen.',
  firstMatchNote: 'Erste passende Regel gewinnt',
  fallbackRoute: 'Standardpfad',
  signalsTitle: 'Präventionssignale',
  signalsDescription: 'Aktivieren Sie Hintergrundsignale für die Risikoentscheidung.',
  signals: {
    'device-fingerprint': { title: 'Geräte-Fingerprint', description: 'Wiederverwendete Hardware, Emulatoren und inkonsistente Merkmale erkennen.' },
    'ip-reputation': { title: 'IP-Reputation', description: 'VPN, Proxy, Tor, Hosting und geografische Abweichungen erkennen.' },
    'behavior-velocity': { title: 'Verhaltensgeschwindigkeit', description: 'Wiederholungen, Automatisierung und unmögliche Interaktionsgeschwindigkeit messen.' },
    'graph-links': { title: 'Graph-Link-Analyse', description: 'Konten über gemeinsame Geräte, Netze und Kennungen verbinden.' },
  },
  scenariosTitle: 'Testprofil',
  scenariosDescription: 'Ein festes Profil mit der aktuellen Konfiguration ausführen.',
  scenarios: {
    trusted: { title: 'Vertrauenswürdiger Antrag', description: 'Gültiger Nachweis, bekanntes Gerät und kein Watchlist-Treffer.' },
    'step-up': { title: 'Zusatzprüfung erforderlich', description: 'Gültige Identität mit verdächtigen Geräte- und Netzsignalen.' },
    'fraud-ring': { title: 'Koordiniertes Betrugsnetz', description: 'Verknüpfte Konten teilen riskante Infrastruktur und Watchlist-Signale.' },
  },
  runSimulation: 'Simulation starten',
  runningSimulation: 'Flow wird ausgeführt',
  runAgain: 'Erneut ausführen',
  executionTitle: 'Ausführungszeitleiste',
  executionDescription: 'Jedes Ereignis stammt aus dem in den anderen Stufen konfigurierten Flow.',
  noResultTitle: 'Bereit zum Test',
  noResultDescription: 'Wählen Sie ein Profil und testen Sie Verifizierung, Risiko, Routing und Prävention gemeinsam.',
  riskScore: 'Risikowert',
  matchedRule: 'Passende Regel',
  defaultRoute: 'Standardpfad',
  finalDecision: 'Endentscheidung',
  staleResult: 'Die Konfiguration wurde geändert. Führen Sie die Simulation erneut aus.',
  baseRisk: 'Basisrisiko',
  signalImpact: 'Signaleinfluss',
  statuses: { passed: 'Bestanden', warning: 'Prüfung nötig', failed: 'Fehlgeschlagen', skipped: 'Übersprungen', pending: 'Ausstehend', running: 'Läuft', completed: 'Abgeschlossen' },
  graphTitle: 'Verknüpfter Risikograph',
  graphDescription: 'Gemeinsame Infrastruktur wird bei aktivierter Graph-Analyse sichtbar.',
  graphEmptyTitle: 'Kein verknüpftes Netz verfügbar',
  graphEmptyDescription: 'Wählen Sie das Betrugsprofil und aktivieren Sie Graph-Link-Analyse.',
  graphAccount: 'Konto',
  graphDevice: 'Gerät',
  graphIp: 'IP-Netz',
  graphSelected: 'Ausgewählte Entität',
  graphSharedConnections: 'Gemeinsame Risikoverbindungen',
  validation: {
    'missing-name': 'Geben Sie einen technischen Flow-Namen ein.',
    'missing-verification-step': 'Fügen Sie mindestens ein Verifizierungsmodul hinzu.',
    'duplicate-verification-step': 'Jedes Modul darf nur einmal vorkommen.',
    'duplicate-rule-id': 'Jede Regel benötigt eine eindeutige ID.',
    'invalid-risk-value': 'Risikowerte müssen zwischen 0 und 100 liegen.',
    'invalid-rule-operator': 'Der Operator ist für dieses Signal nicht gültig.',
    'missing-step-up-target': 'Wählen Sie ein Modul für die Zusatzprüfung.',
    'invalid-step-up-target': 'Das Zielmodul muss den Modus „Nur Zusatzprüfung“ verwenden.',
  },
  exportTitle: 'Integrationscode exportieren',
  exportDescription: 'Beide Ansichten werden aus der aktuellen Flow-Studio-Konfiguration erzeugt.',
  exportDisclaimer: 'Nur ein illustratives Sandbox-SDK. Prüfen Sie vor dem Einsatz den produktiven Identra-SDK-Vertrag.',
  typescriptTab: 'TypeScript',
  jsonTab: 'JSON-Konfiguration',
  downloadFile: 'Datei herunterladen',
  closeDialog: 'Exportdialog schließen',
};

const vi: PlatformFlowStudioCopy = {
  badge: 'FLOW STUDIO TƯƠNG TÁC',
  title: 'Thiết kế, điều phối và kiểm thử trên cùng một luồng xác thực',
  description: 'Tạo hành trình xác thực, thiết lập quy tắc quyết định rồi chạy chính cấu hình đó qua lớp phân tích rủi ro trước khi xuất mã tích hợp.',
  studioAriaLabel: 'Flow Studio tương tác để thiết kế luồng xác thực Identra',
  flowNameLabel: 'Tên kỹ thuật của luồng',
  flowNameHint: 'Được dùng làm mã cấu hình và tên tệp khi xuất.',
  presetLabel: 'Mẫu khởi tạo',
  resetFlow: 'Đặt lại luồng',
  exportCode: 'Xuất mã',
  invalidConfigTitle: 'Hoàn thiện cấu hình trước khi chạy mô phỏng hoặc xuất mã.',
  estimatedMetrics: 'Chỉ số ước tính',
  stages: {
    collect: { title: 'Dynamic Flow', description: 'Chọn và sắp xếp các mô-đun xác thực.' },
    orchestrate: { title: 'Điều phối và tự động hóa', description: 'Định tuyến từng phiên bằng các quy tắc ưu tiên.' },
    analyze: { title: 'Phân tích và phòng ngừa', description: 'Chạy hồ sơ mẫu và kiểm tra tín hiệu rủi ro.' },
  },
  presets: {
    'ssi-minimal': { title: 'SSI tiết lộ tối thiểu', description: 'Ưu tiên thực chứng mật mã và chỉ yêu cầu selfie khi rủi ro tăng.' },
    'kyc-high-assurance': { title: 'KYC mức đảm bảo cao', description: 'Kết hợp giấy tờ, sinh trắc học, cơ sở dữ liệu và danh sách theo dõi.' },
    'kyb-business': { title: 'KYB doanh nghiệp', description: 'Khớp danh tính người mở với thực chứng đăng ký doanh nghiệp.' },
    blank: { title: 'Luồng trống', description: 'Bắt đầu từ một khung xác thực chưa có mô-đun.' },
  },
  moduleLibraryTitle: 'Mô-đun xác thực',
  moduleLibraryDescription: 'Mỗi mô-đun chỉ được thêm một lần, sau đó có thể sắp xếp theo hành trình mong muốn.',
  addModule: 'Thêm mô-đun',
  moduleAdded: 'Đã thêm',
  flowCanvasTitle: 'Khung thiết kế luồng',
  flowCanvasDescription: 'Nhánh chính luôn được chạy. Mô-đun tăng cường chỉ chạy khi có quy tắc yêu cầu.',
  emptyFlowTitle: 'Luồng hiện chưa có bước xác thực',
  emptyFlowDescription: 'Thêm một mô-đun từ danh sách bên trái để bắt đầu.',
  modeLabel: 'Chế độ thực hiện',
  modeAlways: 'Luôn thực hiện',
  modeStepUp: 'Chỉ khi cần tăng cường',
  moveUp: 'Chuyển lên',
  moveDown: 'Chuyển xuống',
  removeStep: 'Xóa mô-đun',
  dragStep: 'Kéo để sắp xếp',
  steps: {
    'identity-credential': { title: 'Thực chứng căn cước', description: 'Chỉ yêu cầu những thuộc tính định danh cần thiết từ thực chứng được bảo đảm bằng mật mã.' },
    'business-registration-credential': { title: 'Thực chứng đăng ký doanh nghiệp', description: 'Lấy tên pháp lý và mã số doanh nghiệp đã được xác thực.' },
    'ownership-match': { title: 'Đối chiếu chủ sở hữu', description: 'Khớp danh tính người mở với chủ sở hữu đã đăng ký của doanh nghiệp.' },
    'government-id': { title: 'Giấy tờ tùy thân', description: 'Chụp và kiểm tra hộ chiếu, căn cước hoặc giấy phép lái xe.' },
    'selfie-liveness': { title: 'Selfie và xác minh người thật', description: 'Đối chiếu khuôn mặt và xác nhận ảnh được chụp trực tiếp.' },
    'database-kyc': { title: 'Đối chiếu cơ sở dữ liệu KYC', description: 'Đối chiếu lượng thông tin định danh tối thiểu với nguồn dữ liệu có thẩm quyền.' },
    watchlist: { title: 'Rà soát danh sách theo dõi', description: 'Đối chiếu danh sách trừng phạt, PEP và các danh sách rủi ro liên quan.' },
  },
  metricCompletion: 'Tỷ lệ hoàn tất dự kiến',
  metricAssurance: 'Điểm đảm bảo',
  metricDetection: 'Khả năng phát hiện gian lận',
  metricDuration: 'Thời gian trung bình',
  secondsShort: 'giây',
  rulesTitle: 'Quy tắc quyết định',
  rulesDescription: 'Quy tắc được xét từ trên xuống dưới. Hành động của quy tắc khớp đầu tiên sẽ được thực hiện.',
  addRule: 'Thêm quy tắc',
  emptyRulesTitle: 'Chưa có quy tắc quyết định',
  emptyRulesDescription: 'Mọi phiên sẽ dùng hành động mặc định cho đến khi có quy tắc.',
  priorityLabel: 'Ưu tiên',
  fieldLabel: 'Tín hiệu',
  operatorLabel: 'Điều kiện',
  valueLabel: 'Giá trị',
  actionLabel: 'Hành động',
  stepUpTargetLabel: 'Mô-đun tăng cường',
  fallbackTitle: 'Hành động mặc định',
  fallbackDescription: 'Được dùng khi phiên không khớp với quy tắc nào.',
  fields: {
    'risk-score': 'Điểm rủi ro',
    'credential-status': 'Trạng thái thực chứng',
    'watchlist-status': 'Kết quả danh sách theo dõi',
    'device-trust': 'Độ tin cậy của thiết bị',
  },
  operators: {
    'less-than': 'nhỏ hơn',
    'less-than-or-equal': 'nhỏ hơn hoặc bằng',
    'greater-than': 'lớn hơn',
    'greater-than-or-equal': 'lớn hơn hoặc bằng',
    equals: 'bằng',
    'not-equals': 'khác',
  },
  values: {
    valid: 'Hợp lệ',
    invalid: 'Không hợp lệ',
    clear: 'Không có kết quả trùng khớp',
    hit: 'Có kết quả trùng khớp',
    trusted: 'Đáng tin cậy',
    suspicious: 'Đáng ngờ',
  },
  actions: {
    approve: 'Phê duyệt',
    'request-step-up': 'Yêu cầu xác minh tăng cường',
    'manual-review': 'Chuyển chuyên viên đánh giá',
    reject: 'Từ chối',
    'send-webhook': 'Gửi webhook',
  },
  removeRule: 'Xóa quy tắc',
  topologyTitle: 'Sơ đồ định tuyến trực tiếp',
  topologyDescription: 'Theo dõi cách thứ tự ưu tiên và hành động mặc định quyết định hướng xử lý.',
  firstMatchNote: 'Áp dụng quy tắc khớp đầu tiên',
  fallbackRoute: 'Hướng xử lý mặc định',
  signalsTitle: 'Tín hiệu phòng ngừa',
  signalsDescription: 'Bật những tín hiệu nền sẽ được dùng để đưa ra quyết định rủi ro.',
  signals: {
    'device-fingerprint': { title: 'Dấu vân tay thiết bị', description: 'Phát hiện thiết bị được dùng lại, trình giả lập và đặc điểm thiết bị không nhất quán.' },
    'ip-reputation': { title: 'Độ tin cậy của địa chỉ IP', description: 'Phát hiện VPN, proxy, Tor, máy chủ lưu trữ và vị trí địa lý bất thường.' },
    'behavior-velocity': { title: 'Tần suất hành vi', description: 'Đo lường số lần thử lặp lại, hành vi tự động và tốc độ thao tác bất thường.' },
    'graph-links': { title: 'Phân tích liên kết Graph', description: 'Liên kết các tài khoản qua thiết bị, mạng và mã định danh được dùng chung.' },
  },
  scenariosTitle: 'Hồ sơ chạy thử',
  scenariosDescription: 'Chạy một hồ sơ cố định qua cấu hình hiện tại.',
  scenarios: {
    trusted: { title: 'Hồ sơ hợp lệ', description: 'Thực chứng hợp lệ, thiết bị quen thuộc và không khớp danh sách theo dõi.' },
    'step-up': { title: 'Cần xác minh tăng cường', description: 'Danh tính hợp lệ nhưng thiết bị và mạng có tín hiệu đáng ngờ.' },
    'fraud-ring': { title: 'Mạng lưới gian lận', description: 'Nhiều tài khoản dùng chung hạ tầng rủi ro và có dấu hiệu từ danh sách theo dõi.' },
  },
  runSimulation: 'Chạy mô phỏng',
  runningSimulation: 'Đang chạy luồng',
  runAgain: 'Chạy lại',
  executionTitle: 'Tiến trình thực thi',
  executionDescription: 'Mọi sự kiện bên dưới đều được tạo từ luồng đã cấu hình trong hai giai đoạn trước.',
  noResultTitle: 'Sẵn sàng chạy thử',
  noResultDescription: 'Chọn một hồ sơ rồi chạy mô phỏng để theo dõi xác thực, phân tích rủi ro, định tuyến và phòng ngừa trong cùng một tiến trình.',
  riskScore: 'Điểm rủi ro',
  matchedRule: 'Quy tắc đã khớp',
  defaultRoute: 'Hướng xử lý mặc định',
  finalDecision: 'Quyết định cuối cùng',
  staleResult: 'Cấu hình đã thay đổi. Hãy chạy lại mô phỏng để cập nhật kết quả.',
  baseRisk: 'Rủi ro ban đầu của hồ sơ',
  signalImpact: 'Mức ảnh hưởng của tín hiệu',
  statuses: {
    passed: 'Đạt',
    warning: 'Cần lưu ý',
    failed: 'Không đạt',
    skipped: 'Đã bỏ qua',
    pending: 'Đang chờ',
    running: 'Đang thực hiện',
    completed: 'Đã hoàn tất',
  },
  graphTitle: 'Đồ thị liên kết rủi ro',
  graphDescription: 'Hạ tầng dùng chung sẽ được hiển thị khi bật phân tích liên kết Graph.',
  graphEmptyTitle: 'Chưa có mạng lưới liên kết để hiển thị',
  graphEmptyDescription: 'Chọn hồ sơ mạng lưới gian lận và bật phân tích Graph để xem các thực thể dùng chung.',
  graphAccount: 'Tài khoản',
  graphDevice: 'Thiết bị',
  graphIp: 'Mạng IP',
  graphSelected: 'Thực thể đang chọn',
  graphSharedConnections: 'Mối liên hệ rủi ro dùng chung',
  validation: {
    'missing-name': 'Nhập tên kỹ thuật cho luồng.',
    'missing-verification-step': 'Thêm ít nhất một mô-đun xác thực.',
    'duplicate-verification-step': 'Mỗi mô-đun xác thực chỉ được xuất hiện một lần.',
    'duplicate-rule-id': 'Mỗi quy tắc phải có mã riêng.',
    'invalid-risk-value': 'Điểm rủi ro phải nằm trong khoảng từ 0 đến 100.',
    'invalid-rule-operator': 'Điều kiện này không phù hợp với tín hiệu đã chọn.',
    'missing-step-up-target': 'Chọn mô-đun sẽ được dùng để xác minh tăng cường.',
    'invalid-step-up-target': 'Mô-đun được chọn phải dùng chế độ Chỉ khi cần tăng cường.',
  },
  exportTitle: 'Xuất mã tích hợp',
  exportDescription: 'Cả hai định dạng đều được tạo từ cấu hình hiện tại trong Flow Studio.',
  exportDisclaimer: 'SDK này chỉ dùng để minh họa trong sandbox. Cần đối chiếu giao diện SDK Identra chính thức trước khi triển khai thực tế.',
  typescriptTab: 'TypeScript',
  jsonTab: 'Cấu hình JSON',
  downloadFile: 'Tải tệp xuống',
  closeDialog: 'Đóng cửa sổ xuất mã',
};

export const PLATFORM_FLOW_STUDIO_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<Locale, PlatformFlowStudioCopy>;

