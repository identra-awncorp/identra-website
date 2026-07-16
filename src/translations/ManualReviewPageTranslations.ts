/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MANUAL_REVIEW_PAGE_TRANSLATIONS = {
  en: {
    hero: {
      badge: 'Manual Review Use Case',
      title: 'Expedite decisions with a tailored manual review process.',
      desc: 'Tackle everything from routine manual reviews to your toughest fraud cases with a custom investigations hub designed to maximize speed and precision.',
      getDemo: 'Get a demo',
      backToPlatform: 'Back to platform',
      stats: [
        { value: '45%', label: 'Manual Load Reduction', desc: 'Through automated queue triage and conditional rules assignment.' },
        { value: '< 3m', label: 'Average Case Resolution', desc: 'Consolidating active, passive, and AML indicators in one view.' }
      ]
    },
    trusted: {
      label: "Trusted by startups & the world's largest companies",
      brands: ['branch', 'CoffeeMeetsBagel', 'udemy']
    },
    workflow: {
      badge: 'Tailored Workflow Control',
      title: 'Configure your investigation process',
      desc: 'Define logic that automatically flags and assigns cases for manual review, and tailor investigation views to match each case type. Plus, customize case assignment rules and PII access controls dynamically.',
      whyTitle: 'Why it matters:',
      whyDesc: 'Different risk types require different expertise. Routing higher-risk transactions directly to specialized teams prevents backlogs and reduces human error.',
      editor: 'DECISION_LOGIC_EDITOR',
      flow: { approve: 'Approve', condition: 'Condition', decline: 'Decline' },
      step: 'Step 1: Manual Review',
      editTitle: 'Edit condition logic',
      triggerLabel: 'Flag Type / Trigger',
      triggers: {
        risk_score: 'Identra Risk Score',
        vpn_detected: 'VPN or Proxy Network',
        watchlist_hit: 'Sanctions Watchlist Match',
        age_check: 'Age Assurance Estimation'
      },
      criteriaLabel: 'Operator / Criteria',
      operators: {
        greater: 'Greater than (>)',
        less: 'Less than (<)',
        equals: 'Exactly Equals (==)'
      },
      booleanMatching: 'Trigger is boolean matching',
      queueLabel: 'Assign Destination Queue',
      queues: {
        highRisk: 'High Risk Escalations Queue',
        fraud: 'Behavioral Fraud Analyst Triage',
        compliance: 'Sanctions Watchlist Legal Review',
        general: 'Standard Human Review Queue'
      },
      saved: 'Logic Saved Successfully',
      save: 'Save Routing Condition',
      pseudocode: 'Generated Pseudocode:',
      code: {
        if: 'IF',
        then: 'THEN',
        true: '=== true',
        route: 'route_to_queue',
        fallbackValue: '0',
        fields: {
          risk_score: 'user.risk_score',
          vpn_detected: 'user.vpn_or_proxy_active',
          watchlist_hit: 'user.watchlist_match_similarity',
          age_check: 'user.estimated_age'
        }
      }
    },
    signals: {
      badge: 'Full Context Investigation',
      title: 'Investigate users or businesses',
      desc: 'Avoid unnecessary tab-switching by reviewing active, passive, and behavioral signals from internal and third-party sources in one central view. Maintain speed throughout the compliance review cycle.',
      bullets: [
        'Auto-aggregated face match validation scores and document scans.',
        'Real-time IP telemetry, connection security flags, and VPN warnings.',
        'Instant OFAC sanctions watchlist mapping with clear match indicators.'
      ],
      tabs: {
        active: 'Active signals',
        passive: 'Passive signals',
        behavioral: 'Behavioral signals',
        thirdParty: 'Third-Party'
      },
      dashboardLabel: 'INTEGRATED_SIGNALS_DASHBOARD',
      explore: 'Explore Full Risk Suite',
      panels: {
        active: {
          title: 'Government ID Verification',
          subtitle: 'Validated Active Document Check',
          rows: [
            { label: 'Document Authenticity:', value: 'VERIFIED' },
            { label: 'Extracted Name:', value: 'Alex Rivera' },
            { label: 'Face Match Confidence:', value: '98.4% Match (Genuine Selfie)' }
          ],
          note: "User uploaded a validated driver's license with zero evidence of digital manipulation or physical tampering."
        },
        passive: {
          title: 'Passive Risk Telemetry',
          subtitle: 'Behind-the-scenes Connection Security',
          rows: [
            { label: 'VPN / Proxy Detection:', value: 'DETECTED (Mullvad IP)' },
            { label: 'IP Geolocation:', value: 'Frankfurt, Germany' },
            { label: 'Device Fingerprint Match:', value: 'New device associated with 3 other email addresses' }
          ],
          note: 'The connection originated from a popular commercial VPN node, suggesting network concealment.'
        },
        behavioral: {
          title: 'Behavioral Biometrics',
          subtitle: 'Interaction Velocity & In-Flight Hesitation',
          rows: [
            { label: 'Form Submission Velocity:', value: '9.4 seconds (Extremely rapid form autofill)' },
            { label: 'Clipboard Usage:', value: 'Paste detected in SSN & Name fields' },
            { label: 'Page Focus Fluctuations:', value: 'Switched browser tab 5 times during collection' }
          ],
          note: 'Rapid copy-paste behaviors in sensitive fields indicate possible third-party fraud instruction sheets.'
        },
        thirdParty: {
          title: 'Third-Party Database Integration',
          subtitle: 'OFAC, AML, and PEP Lists Checking',
          rows: [
            { label: 'Sanctions Watchlist Match:', value: '84% Match: Alejandro Rivera' },
            { label: 'Adverse Media Check:', value: 'No matching reports found' },
            { label: 'Mobile Registry Status:', value: 'Phone matches carrier registration data' }
          ],
          note: 'Sanctions watchlist triggered a slight match on Alejandro Rivera, requiring legal reviewer confirmation.'
        }
      }
    },
    decision: {
      badge: 'Decisive Integrity Console',
      title: 'Make informed decisions',
      desc: 'Approve, deny, escalate, or mark cases as fraudulent. Handle follow-ups, from filing Suspicious Activity Reports (SARs) to updating Zendesk tickets, directly within the unified Identra console.',
      autoActions: 'Actions triggered automatically:',
      actions: ['API Webhooks', 'Email Notifications', 'FinCEN Draft SARs', 'CRM Syncing'],
      consoleTitle: 'CASE #7194A - DECISION CONSOLE',
      reviewer: 'Assigned Reviewer: Compliance Lead',
      statuses: {
        idle: 'PENDING DECISION',
        approving: 'APPROVING...',
        declining: 'DECLINING...',
        escalating: 'ESCALATING...',
        approved: 'APPROVED',
        declined: 'DECLINED',
        escalated: 'ESCALATED'
      },
      person: {
        name: 'Alex Rivera',
        detail: 'alex.rivera@example.com | San Francisco, CA',
        riskLabel: 'Risk Score',
        riskValue: '84 / 100'
      },
      approve: 'Approve Case',
      decline: 'Decline / Deny',
      escalate: 'Escalate Queue',
      auditTitle: 'SYSTEM AUDIT TRAIL OUTPUT:',
      waiting: 'Waiting for reviewer action to initiate automated system logs...',
      reset: 'Reset Simulation',
      logs: {
        approved: [
          'Initiating case approval protocol...',
          'Syncing verification token with identity store...',
          'Updating CRM database & internal profile logs...',
          'Webhook dispatched: { event: "case.approved", score: 18 }',
          'Email notification dispatched to user: Account Activated.'
        ],
        declined: [
          'Initiating rejection and blacklist procedure...',
          'Logging suspicious device fingerprint details...',
          'Adding credentials to fraud protection database...',
          'Webhook dispatched: { event: "case.declined", category: "proxy_abuse" }',
          'Drafting FinCEN Suspicious Activity Report (SAR)...'
        ],
        escalated: [
          'Flagging case for Tier-2 Senior Review...',
          'Adding priority markers for OFAC verification matches...',
          'Rerouting case to assigned Compliance Directors queue...',
          'Generating audit-trail bookmark for senior reviewer review...'
        ]
      }
    },
    capabilities: {
      title: 'Investigate and resolve with powerful features',
      desc: 'Equip your compliance and risk teams with robust verification modules, strict temporal SLAs, and encrypted database structures.',
      items: [
        { title: 'Workflows', desc: 'Build automated workflows to flag risky cases for additional screening, assign or escalate cases, or add fraudulent users to a blacklist.' },
        { title: 'Dynamic case templates', desc: 'Customize your case views based on the depth of investigation needed and dynamically change case modules based on conditional criteria.' },
        { title: 'Automatic audit logging', desc: 'Maintain an audit log of all interactions with users, including email communications and activities associated with investigations.' },
        { title: 'Granular control over PII', desc: 'Stay compliant by limiting access to sensitive data at the template, module, or field level to guarantee safety checks.' },
        { title: 'Case messaging modules', desc: 'Send and receive emails, collect documentation, and quickly review previous communication for escalated cases.' },
        { title: 'Escalation queues', desc: 'Automatically route cases by setting up dynamic review steps and queues for escalations. Easily adjust assignments for team members.' },
        { title: 'Flexible integrations', desc: 'Bring in additional context from third-party data through custom integrations and database sync engines.' },
        { title: 'SLAs and notifications', desc: 'Ensure timely resolution of high-priority cases with SLAs and automatic notifications for critical validation events.' },
        { title: 'Productivity metrics', desc: 'Optimize manual review with an intuitive dashboard for analyzing productivity metrics such as case resolution time.' }
      ]
    },
    explore: {
      title: "Explore more of Identra's identity platform",
      cards: [
        { title: 'Build your ideal case management process.', desc: 'Tailor deep workflows, review modules, queue assignments, and team tasks.', cta: 'View Case Management' },
        { title: 'Automate all your identity processes.', desc: 'Drag and drop blocks to link databases, verify users, and run third-party checks.', cta: 'View Workflows' }
      ]
    },
    cta: {
      title: 'Ready to get started?',
      desc: 'Get in touch or start exploring Identra today. Link custom validation modules and coordinate your review desk seamlessly.',
      getDemo: 'Get a demo',
      tryNow: 'Try it now'
    }
  },
  es: {
    hero: {
      badge: 'Caso de uso de revisión manual',
      title: 'Acelera decisiones con un proceso de revisión manual a medida.',
      desc: 'Gestiona desde revisiones rutinarias hasta los casos de fraude más complejos con un centro de investigación diseñado para maximizar velocidad y precisión.',
      getDemo: 'Solicitar demo',
      backToPlatform: 'Volver a la plataforma',
      stats: [
        { value: '45%', label: 'Reducción de carga manual', desc: 'Mediante triaje automático de colas y asignación de reglas condicionales.' },
        { value: '< 3 min', label: 'Resolución media de casos', desc: 'Consolidando señales activas, pasivas y AML en una sola vista.' }
      ]
    },
    trusted: { label: 'Con la confianza de startups y las empresas más grandes del mundo', brands: ['branch', 'CoffeeMeetsBagel', 'udemy'] },
    workflow: {
      badge: 'Control de flujo a medida',
      title: 'Configura tu proceso de investigación',
      desc: 'Define lógica que marca y asigna casos automáticamente para revisión manual, y adapta las vistas de investigación a cada tipo de caso. También puedes ajustar reglas de asignación y controles de acceso a PII.',
      whyTitle: 'Por qué importa:',
      whyDesc: 'Cada tipo de riesgo exige experiencia distinta. Enviar transacciones de mayor riesgo a equipos especializados evita retrasos y reduce errores humanos.',
      editor: 'EDITOR_DE_LÓGICA_DE_DECISIÓN',
      flow: { approve: 'Aprobar', condition: 'Condición', decline: 'Rechazar' },
      step: 'Paso 1: Revisión manual',
      editTitle: 'Editar lógica de condición',
      triggerLabel: 'Tipo de alerta / Disparador',
      triggers: { risk_score: 'Puntuación de riesgo de Identra', vpn_detected: 'VPN o red proxy', watchlist_hit: 'Coincidencia en lista de sanciones', age_check: 'Estimación de garantía de edad' },
      criteriaLabel: 'Operador / Criterio',
      operators: { greater: 'Mayor que (>)', less: 'Menor que (<)', equals: 'Exactamente igual (==)' },
      booleanMatching: 'El disparador usa coincidencia booleana',
      queueLabel: 'Asignar cola de destino',
      queues: { highRisk: 'Cola de escalamiento de alto riesgo', fraud: 'Triaje de analistas de fraude conductual', compliance: 'Revisión legal de listas de sanciones', general: 'Cola estándar de revisión humana' },
      saved: 'Lógica guardada correctamente',
      save: 'Guardar condición de enrutamiento',
      pseudocode: 'Pseudocódigo generado:',
      code: { if: 'SI', then: 'ENTONCES', true: '=== true', route: 'route_to_queue', fallbackValue: '0', fields: { risk_score: 'user.risk_score', vpn_detected: 'user.vpn_or_proxy_active', watchlist_hit: 'user.watchlist_match_similarity', age_check: 'user.estimated_age' } }
    },
    signals: {
      badge: 'Investigación con contexto completo',
      title: 'Investiga usuarios o empresas',
      desc: 'Evita cambiar de pestaña revisando señales activas, pasivas y conductuales de fuentes internas y externas en una vista central.',
      bullets: ['Puntuaciones de coincidencia facial y escaneos de documentos agregados automáticamente.', 'Telemetría IP en tiempo real, alertas de conexión y avisos de VPN.', 'Mapeo instantáneo de listas de sanciones OFAC con indicadores claros.'],
      tabs: { active: 'Señales activas', passive: 'Señales pasivas', behavioral: 'Señales conductuales', thirdParty: 'Terceros' },
      dashboardLabel: 'PANEL_DE_SEÑALES_INTEGRADAS',
      explore: 'Explorar suite completa de riesgo',
      panels: {
        active: { title: 'Verificación de documento oficial', subtitle: 'Control documental activo validado', rows: [{ label: 'Autenticidad del documento:', value: 'VERIFICADO' }, { label: 'Nombre extraído:', value: 'Alex Rivera' }, { label: 'Confianza de coincidencia facial:', value: '98,4% de coincidencia (selfie genuino)' }], note: 'El usuario subió una licencia de conducir validada sin evidencia de manipulación digital o física.' },
        passive: { title: 'Telemetría pasiva de riesgo', subtitle: 'Seguridad de conexión en segundo plano', rows: [{ label: 'Detección VPN / proxy:', value: 'DETECTADO (IP Mullvad)' }, { label: 'Geolocalización IP:', value: 'Fráncfort, Alemania' }, { label: 'Coincidencia de huella del dispositivo:', value: 'Dispositivo nuevo asociado con otras 3 direcciones de correo' }], note: 'La conexión provino de un nodo VPN comercial popular, lo que sugiere ocultamiento de red.' },
        behavioral: { title: 'Biometría conductual', subtitle: 'Velocidad de interacción y dudas durante el flujo', rows: [{ label: 'Velocidad de envío del formulario:', value: '9,4 segundos (autorrelleno extremadamente rápido)' }, { label: 'Uso del portapapeles:', value: 'Pegado detectado en campos SSN y nombre' }, { label: 'Cambios de foco de página:', value: 'Cambió de pestaña 5 veces durante la recopilación' }], note: 'Los comportamientos rápidos de copiar y pegar en campos sensibles pueden indicar instrucciones de fraude de terceros.' },
        thirdParty: { title: 'Integración con bases de terceros', subtitle: 'Revisión OFAC, AML y listas PEP', rows: [{ label: 'Coincidencia en lista de sanciones:', value: '84% de coincidencia: Alejandro Rivera' }, { label: 'Revisión de medios adversos:', value: 'No se encontraron informes coincidentes' }, { label: 'Estado del registro móvil:', value: 'El teléfono coincide con datos del operador' }], note: 'La lista de sanciones activó una coincidencia parcial con Alejandro Rivera y requiere confirmación legal.' }
      }
    },
    decision: {
      badge: 'Consola de decisión íntegra',
      title: 'Toma decisiones informadas',
      desc: 'Aprueba, rechaza, escala o marca casos como fraudulentos. Gestiona seguimientos como reportes SAR o tickets de Zendesk desde la consola unificada de Identra.',
      autoActions: 'Acciones activadas automáticamente:',
      actions: ['Webhooks API', 'Notificaciones por correo', 'Borradores SAR FinCEN', 'Sincronización CRM'],
      consoleTitle: 'CASO #7194A - CONSOLA DE DECISIÓN',
      reviewer: 'Revisor asignado: responsable de cumplimiento',
      statuses: { idle: 'DECISIÓN PENDIENTE', approving: 'APROBANDO...', declining: 'RECHAZANDO...', escalating: 'ESCALANDO...', approved: 'APROBADO', declined: 'RECHAZADO', escalated: 'ESCALADO' },
      person: { name: 'Alex Rivera', detail: 'alex.rivera@example.com | San Francisco, CA', riskLabel: 'Puntuación de riesgo', riskValue: '84 / 100' },
      approve: 'Aprobar caso',
      decline: 'Rechazar / Denegar',
      escalate: 'Escalar cola',
      auditTitle: 'SALIDA DE AUDITORÍA DEL SISTEMA:',
      waiting: 'Esperando acción del revisor para iniciar registros automáticos...',
      reset: 'Restablecer simulación',
      logs: {
        approved: ['Iniciando protocolo de aprobación del caso...', 'Sincronizando token de verificación con el almacén de identidad...', 'Actualizando base CRM y registros internos...', 'Webhook enviado: { event: "case.approved", score: 18 }', 'Notificación enviada al usuario: cuenta activada.'],
        declined: ['Iniciando rechazo y procedimiento de lista negra...', 'Registrando huella de dispositivo sospechosa...', 'Añadiendo credenciales a la base antifraude...', 'Webhook enviado: { event: "case.declined", category: "proxy_abuse" }', 'Preparando reporte SAR de FinCEN...'],
        escalated: ['Marcando caso para revisión sénior de nivel 2...', 'Añadiendo prioridad para coincidencias OFAC...', 'Redirigiendo caso a directores de cumplimiento asignados...', 'Generando marcador de auditoría para revisión sénior...']
      }
    },
    capabilities: {
      title: 'Investiga y resuelve con funciones potentes',
      desc: 'Equipa a tus equipos de cumplimiento y riesgo con módulos de verificación robustos, SLA estrictos y estructuras de datos cifradas.',
      items: [
        { title: 'Flujos de trabajo', desc: 'Crea flujos automáticos para marcar casos riesgosos, asignarlos, escalarlos o añadir usuarios fraudulentos a una lista negra.' },
        { title: 'Plantillas dinámicas de caso', desc: 'Personaliza vistas según la profundidad de investigación necesaria y cambia módulos con criterios condicionales.' },
        { title: 'Registro automático de auditoría', desc: 'Mantén un registro de interacciones, correos y actividades asociadas a investigaciones.' },
        { title: 'Control granular de PII', desc: 'Limita el acceso a datos sensibles por plantilla, módulo o campo para mantener cumplimiento.' },
        { title: 'Módulos de mensajería de caso', desc: 'Envía y recibe correos, recopila documentación y revisa comunicaciones previas en casos escalados.' },
        { title: 'Colas de escalamiento', desc: 'Enruta casos automáticamente con pasos y colas dinámicas de revisión.' },
        { title: 'Integraciones flexibles', desc: 'Añade contexto desde datos de terceros mediante integraciones personalizadas y sincronización de bases.' },
        { title: 'SLA y notificaciones', desc: 'Resuelve casos prioritarios a tiempo con SLA y avisos automáticos.' },
        { title: 'Métricas de productividad', desc: 'Optimiza la revisión manual con paneles de métricas como tiempo de resolución.' }
      ]
    },
    explore: { title: 'Explora más de la plataforma de identidad de Identra', cards: [{ title: 'Crea tu proceso ideal de gestión de casos.', desc: 'Adapta flujos, módulos, colas y tareas de equipo.', cta: 'Ver Case Management' }, { title: 'Automatiza todos tus procesos de identidad.', desc: 'Arrastra bloques para enlazar bases, verificar usuarios y ejecutar controles externos.', cta: 'Ver Workflows' }] },
    cta: { title: '¿Listo para empezar?', desc: 'Contacta con nosotros o empieza a explorar Identra hoy. Conecta módulos de validación y coordina tu mesa de revisión.', getDemo: 'Solicitar demo', tryNow: 'Probar ahora' }
  },
  ja: {
    hero: { badge: '手動レビューのユースケース', title: '最適化された手動レビューで意思決定を迅速化。', desc: '日常的なレビューから難しい不正ケースまで、速度と精度を高める調査ハブで対応できます。', getDemo: 'デモを依頼', backToPlatform: 'プラットフォームに戻る', stats: [{ value: '45%', label: '手動負荷を削減', desc: '自動キュートリアージと条件付きルール割り当てによって実現。' }, { value: '< 3分', label: '平均ケース解決時間', desc: 'アクティブ、パッシブ、AML 指標を1つのビューに統合。' }] },
    trusted: { label: 'スタートアップから世界最大級の企業まで信頼', brands: ['branch', 'CoffeeMeetsBagel', 'udemy'] },
    workflow: { badge: 'ワークフロー制御', title: '調査プロセスを設定', desc: '手動レビューが必要なケースを自動でフラグ付け・割り当てし、ケースタイプごとに調査ビューを調整できます。割り当てルールと PII アクセス制御も動的に変更できます。', whyTitle: '重要な理由:', whyDesc: 'リスクの種類ごとに必要な専門性は異なります。高リスク取引を専門チームへ直接ルーティングすることで滞留と人的ミスを減らします。', editor: '意思決定ロジックエディター', flow: { approve: '承認', condition: '条件', decline: '拒否' }, step: 'ステップ 1: 手動レビュー', editTitle: '条件ロジックを編集', triggerLabel: 'フラグ種別 / トリガー', triggers: { risk_score: 'Identra リスクスコア', vpn_detected: 'VPN またはプロキシネットワーク', watchlist_hit: '制裁ウォッチリスト一致', age_check: '年齢保証推定' }, criteriaLabel: '演算子 / 条件', operators: { greater: 'より大きい (>)', less: 'より小さい (<)', equals: '完全一致 (==)' }, booleanMatching: 'トリガーは真偽値一致です', queueLabel: '割り当て先キュー', queues: { highRisk: '高リスクエスカレーションキュー', fraud: '行動不正分析トリアージ', compliance: '制裁ウォッチリスト法務レビュー', general: '標準手動レビューキュー' }, saved: 'ロジックを保存しました', save: 'ルーティング条件を保存', pseudocode: '生成された擬似コード:', code: { if: 'IF', then: 'THEN', true: '=== true', route: 'route_to_queue', fallbackValue: '0', fields: { risk_score: 'user.risk_score', vpn_detected: 'user.vpn_or_proxy_active', watchlist_hit: 'user.watchlist_match_similarity', age_check: 'user.estimated_age' } } },
    signals: { badge: '全体文脈での調査', title: 'ユーザーや事業者を調査', desc: '内部および外部ソースのアクティブ、パッシブ、行動シグナルを中央ビューで確認し、タブ移動を減らします。', bullets: ['顔照合スコアと書類スキャンを自動集約。', 'リアルタイム IP テレメトリ、接続セキュリティフラグ、VPN 警告。', '明確な一致指標付きの OFAC 制裁ウォッチリストマッピング。'], tabs: { active: 'アクティブシグナル', passive: 'パッシブシグナル', behavioral: '行動シグナル', thirdParty: 'サードパーティ' }, dashboardLabel: '統合シグナルダッシュボード', explore: 'リスク機能全体を見る', panels: { active: { title: '公的身分証の検証', subtitle: '検証済みアクティブ書類チェック', rows: [{ label: '書類の真正性:', value: '検証済み' }, { label: '抽出された氏名:', value: 'Alex Rivera' }, { label: '顔照合信頼度:', value: '98.4% 一致 (本物のセルフィー)' }], note: 'ユーザーはデジタル加工や物理的改ざんの証拠がない有効な運転免許証をアップロードしました。' }, passive: { title: 'パッシブリスクテレメトリ', subtitle: '背後での接続セキュリティ', rows: [{ label: 'VPN / プロキシ検出:', value: '検出 (Mullvad IP)' }, { label: 'IP ジオロケーション:', value: 'ドイツ、フランクフルト' }, { label: 'デバイス指紋一致:', value: '新規デバイスが他の3つのメールアドレスに関連' }], note: '接続は一般的な商用 VPN ノードから発生しており、ネットワーク秘匿の可能性があります。' }, behavioral: { title: '行動バイオメトリクス', subtitle: '操作速度と入力中のためらい', rows: [{ label: 'フォーム送信速度:', value: '9.4秒 (非常に速い自動入力)' }, { label: 'クリップボード使用:', value: 'SSN と氏名欄で貼り付けを検出' }, { label: 'ページフォーカス変動:', value: '収集中にブラウザータブを5回切り替え' }], note: '機密項目での高速なコピー貼り付けは、第三者による不正指示書の可能性を示します。' }, thirdParty: { title: '外部データベース連携', subtitle: 'OFAC、AML、PEP リスト確認', rows: [{ label: '制裁ウォッチリスト一致:', value: '84% 一致: Alejandro Rivera' }, { label: 'ネガティブメディア確認:', value: '一致する報告なし' }, { label: '携帯登録状態:', value: '電話番号がキャリア登録データと一致' }], note: '制裁ウォッチリストで Alejandro Rivera との軽微な一致が発生し、法務レビュー担当者の確認が必要です。' } } },
    decision: { badge: '意思決定コンソール', title: '根拠ある判断を行う', desc: '承認、拒否、エスカレーション、不正判定を行い、SAR 提出や Zendesk チケット更新などのフォローアップを Identra の統合コンソールで処理できます。', autoActions: '自動実行されるアクション:', actions: ['API Webhook', 'メール通知', 'FinCEN SAR 下書き', 'CRM 同期'], consoleTitle: 'ケース #7194A - 意思決定コンソール', reviewer: '担当レビューアー: コンプライアンスリード', statuses: { idle: '判断待ち', approving: '承認中...', declining: '拒否中...', escalating: 'エスカレーション中...', approved: '承認済み', declined: '拒否済み', escalated: 'エスカレーション済み' }, person: { name: 'Alex Rivera', detail: 'alex.rivera@example.com | San Francisco, CA', riskLabel: 'リスクスコア', riskValue: '84 / 100' }, approve: 'ケースを承認', decline: '拒否 / 却下', escalate: 'キューへエスカレーション', auditTitle: 'システム監査証跡出力:', waiting: 'レビュー担当者の操作を待機中です...', reset: 'シミュレーションをリセット', logs: { approved: ['ケース承認プロトコルを開始...', '本人確認トークンを ID ストアと同期...', 'CRM データベースと内部プロファイルログを更新...', 'Webhook 送信: { event: "case.approved", score: 18 }', 'ユーザーへメール通知を送信: アカウント有効化。'], declined: ['拒否とブラックリスト処理を開始...', '疑わしいデバイス指紋を記録...', '認証情報を不正防止データベースへ追加...', 'Webhook 送信: { event: "case.declined", category: "proxy_abuse" }', 'FinCEN SAR を下書き中...'], escalated: ['ケースを Tier-2 シニアレビューへフラグ付け...', 'OFAC 照合一致に優先マーカーを追加...', '割り当て済みコンプライアンス責任者キューへ再ルーティング...', 'シニアレビュー用の監査ブックマークを生成...'] } },
    capabilities: { title: '強力な機能で調査と解決を支援', desc: '堅牢な検証モジュール、厳格な SLA、暗号化されたデータ構造でコンプライアンスとリスクチームを支援します。', items: [{ title: 'ワークフロー', desc: 'リスクケースの追加確認、割り当て、エスカレーション、不正ユーザーのブラックリスト追加を自動化します。' }, { title: '動的ケーステンプレート', desc: '必要な調査深度に応じてビューを調整し、条件に基づいてモジュールを変更します。' }, { title: '自動監査ログ', desc: 'メールや調査活動を含むユーザーとのやり取りを監査ログとして保持します。' }, { title: 'PII の細かな制御', desc: 'テンプレート、モジュール、項目単位で機密データへのアクセスを制限します。' }, { title: 'ケースメッセージング', desc: 'メール送受信、書類収集、過去のやり取り確認をすばやく行えます。' }, { title: 'エスカレーションキュー', desc: '動的なレビューステップとキューでケースを自動ルーティングします。' }, { title: '柔軟な連携', desc: '外部データをカスタム連携とデータベース同期で取り込みます。' }, { title: 'SLA と通知', desc: '重要イベントの自動通知と SLA で優先ケースを期限内に解決します。' }, { title: '生産性指標', desc: 'ケース解決時間などを分析するダッシュボードで手動レビューを最適化します。' }] },
    explore: { title: 'Identra の本人確認プラットフォームをさらに見る', cards: [{ title: '理想的なケース管理プロセスを構築。', desc: 'ワークフロー、レビューモジュール、キュー、チームタスクを調整します。', cta: 'Case Management を見る' }, { title: '本人確認プロセスをすべて自動化。', desc: 'ブロックをドラッグしてデータベース連携、ユーザー検証、外部チェックを実行します。', cta: 'Workflows を見る' }] },
    cta: { title: '始める準備はできていますか？', desc: 'Identra を今すぐ探索し、検証モジュールを連携してレビュー業務をスムーズに調整しましょう。', getDemo: 'デモを依頼', tryNow: '今すぐ試す' }
  },
  de: {
    hero: { badge: 'Anwendungsfall manuelle Prüfung', title: 'Entscheidungen mit angepasster manueller Prüfung beschleunigen.', desc: 'Bearbeiten Sie Routineprüfungen und komplexe Betrugsfälle in einem Untersuchungs-Hub für maximale Geschwindigkeit und Präzision.', getDemo: 'Demo anfordern', backToPlatform: 'Zurück zur Plattform', stats: [{ value: '45%', label: 'Weniger manuelle Last', desc: 'Durch automatische Queue-Triage und bedingte Regelzuweisung.' }, { value: '< 3 Min.', label: 'Durchschnittliche Falllösung', desc: 'Aktive, passive und AML-Indikatoren in einer Ansicht.' }] },
    trusted: { label: 'Vertraut von Startups und den größten Unternehmen der Welt', brands: ['branch', 'CoffeeMeetsBagel', 'udemy'] },
    workflow: { badge: 'Angepasste Workflow-Steuerung', title: 'Untersuchungsprozess konfigurieren', desc: 'Definieren Sie Logik, die Fälle automatisch markiert und manuellen Prüfungen zuweist. Passen Sie Untersuchungsansichten, Zuweisungsregeln und PII-Zugriff dynamisch an.', whyTitle: 'Warum das wichtig ist:', whyDesc: 'Unterschiedliche Risiken erfordern unterschiedliche Expertise. Direkte Weiterleitung an Spezialteams verhindert Rückstände und reduziert menschliche Fehler.', editor: 'ENTSCHEIDUNGSLOGIK_EDITOR', flow: { approve: 'Freigeben', condition: 'Bedingung', decline: 'Ablehnen' }, step: 'Schritt 1: Manuelle Prüfung', editTitle: 'Bedingungslogik bearbeiten', triggerLabel: 'Flag-Typ / Trigger', triggers: { risk_score: 'Identra-Risikoscore', vpn_detected: 'VPN- oder Proxy-Netzwerk', watchlist_hit: 'Treffer auf Sanktionsliste', age_check: 'Age-Assurance-Schätzung' }, criteriaLabel: 'Operator / Kriterium', operators: { greater: 'Größer als (>)', less: 'Kleiner als (<)', equals: 'Exakt gleich (==)' }, booleanMatching: 'Trigger ist boolescher Abgleich', queueLabel: 'Ziel-Queue zuweisen', queues: { highRisk: 'High-Risk-Eskalationsqueue', fraud: 'Triage für Verhaltensbetrugsanalyse', compliance: 'Juristische Prüfung der Sanktionsliste', general: 'Standard-Queue für manuelle Prüfung' }, saved: 'Logik erfolgreich gespeichert', save: 'Routing-Bedingung speichern', pseudocode: 'Generierter Pseudocode:', code: { if: 'IF', then: 'THEN', true: '=== true', route: 'route_to_queue', fallbackValue: '0', fields: { risk_score: 'user.risk_score', vpn_detected: 'user.vpn_or_proxy_active', watchlist_hit: 'user.watchlist_match_similarity', age_check: 'user.estimated_age' } } },
    signals: { badge: 'Untersuchung mit vollem Kontext', title: 'Nutzer oder Unternehmen untersuchen', desc: 'Prüfen Sie aktive, passive und verhaltensbezogene Signale aus internen und externen Quellen in einer zentralen Ansicht.', bullets: ['Automatisch aggregierte Face-Match-Scores und Dokumentenscans.', 'IP-Telemetrie in Echtzeit, Verbindungsflags und VPN-Warnungen.', 'Sofortiges OFAC-Sanktionsmapping mit klaren Treffermarkern.'], tabs: { active: 'Aktive Signale', passive: 'Passive Signale', behavioral: 'Verhaltenssignale', thirdParty: 'Drittanbieter' }, dashboardLabel: 'INTEGRIERTES_SIGNAL_DASHBOARD', explore: 'Vollständige Risiko-Suite ansehen', panels: { active: { title: 'Ausweisprüfung', subtitle: 'Validierte aktive Dokumentprüfung', rows: [{ label: 'Dokumentechtheit:', value: 'VERIFIZIERT' }, { label: 'Extrahierter Name:', value: 'Alex Rivera' }, { label: 'Face-Match-Vertrauen:', value: '98,4% Treffer (echtes Selfie)' }], note: 'Der Nutzer lud einen validierten Führerschein ohne Hinweise auf digitale oder physische Manipulation hoch.' }, passive: { title: 'Passive Risikotelemetrie', subtitle: 'Verbindungssicherheit im Hintergrund', rows: [{ label: 'VPN-/Proxy-Erkennung:', value: 'ERKANNT (Mullvad IP)' }, { label: 'IP-Geostandort:', value: 'Frankfurt, Deutschland' }, { label: 'Gerätefingerprint:', value: 'Neues Gerät mit 3 weiteren E-Mail-Adressen verknüpft' }], note: 'Die Verbindung kam von einem beliebten kommerziellen VPN-Knoten und deutet auf Netzwerkverschleierung hin.' }, behavioral: { title: 'Verhaltensbiometrie', subtitle: 'Interaktionsgeschwindigkeit und Zögern', rows: [{ label: 'Formular-Sendegeschwindigkeit:', value: '9,4 Sekunden (extrem schnelles Autofill)' }, { label: 'Zwischenablage:', value: 'Einfügen in SSN- und Namensfeldern erkannt' }, { label: 'Fokuswechsel:', value: 'Browser-Tab während Erfassung 5-mal gewechselt' }], note: 'Schnelles Kopieren und Einfügen in sensiblen Feldern kann auf Betrugsanweisungen Dritter hindeuten.' }, thirdParty: { title: 'Datenbankintegration von Drittanbietern', subtitle: 'OFAC-, AML- und PEP-Listenprüfung', rows: [{ label: 'Sanktionslisten-Treffer:', value: '84% Treffer: Alejandro Rivera' }, { label: 'Negative-Media-Prüfung:', value: 'Keine passenden Berichte gefunden' }, { label: 'Mobilfunkregister:', value: 'Telefon stimmt mit Providerdaten überein' }], note: 'Die Sanktionsliste meldete einen leichten Treffer auf Alejandro Rivera und erfordert juristische Bestätigung.' } } },
    decision: { badge: 'Entscheidungskonsole', title: 'Fundierte Entscheidungen treffen', desc: 'Geben Sie Fälle frei, lehnen Sie sie ab, eskalieren Sie oder markieren Sie Betrug. Bearbeiten Sie SAR-Meldungen und Zendesk-Tickets direkt in der Identra-Konsole.', autoActions: 'Automatisch ausgelöste Aktionen:', actions: ['API-Webhooks', 'E-Mail-Benachrichtigungen', 'FinCEN-SAR-Entwürfe', 'CRM-Synchronisierung'], consoleTitle: 'FALL #7194A - ENTSCHEIDUNGSKONSOLE', reviewer: 'Zugewiesener Prüfer: Compliance Lead', statuses: { idle: 'ENTSCHEIDUNG AUSSTEHEND', approving: 'FREIGABE...', declining: 'ABLEHNUNG...', escalating: 'ESKALATION...', approved: 'FREIGEGEBEN', declined: 'ABGELEHNT', escalated: 'ESKALIERT' }, person: { name: 'Alex Rivera', detail: 'alex.rivera@example.com | San Francisco, CA', riskLabel: 'Risikoscore', riskValue: '84 / 100' }, approve: 'Fall freigeben', decline: 'Ablehnen', escalate: 'Queue eskalieren', auditTitle: 'SYSTEM-AUDIT-TRAIL-AUSGABE:', waiting: 'Warten auf Prüferaktion zum Start automatischer Logs...', reset: 'Simulation zurücksetzen', logs: { approved: ['Fallfreigabeprotokoll wird gestartet...', 'Verifizierungstoken wird mit Identitätsspeicher synchronisiert...', 'CRM-Datenbank und interne Profile werden aktualisiert...', 'Webhook gesendet: { event: "case.approved", score: 18 }', 'E-Mail an Nutzer gesendet: Konto aktiviert.'], declined: ['Ablehnung und Blacklist-Verfahren wird gestartet...', 'Verdächtiger Gerätefingerprint wird protokolliert...', 'Anmeldedaten werden zur Betrugsschutzdatenbank hinzugefügt...', 'Webhook gesendet: { event: "case.declined", category: "proxy_abuse" }', 'FinCEN SAR wird entworfen...'], escalated: ['Fall für Tier-2-Senior-Review markiert...', 'Prioritätsmarker für OFAC-Treffer hinzugefügt...', 'Fall wird an Compliance Directors weitergeleitet...', 'Audit-Trail-Lesezeichen für Senior Review wird erstellt...'] } },
    capabilities: { title: 'Mit starken Funktionen untersuchen und lösen', desc: 'Statten Sie Compliance- und Risikoteams mit robusten Verifizierungsmodulen, strengen SLAs und verschlüsselten Datenstrukturen aus.', items: [{ title: 'Workflows', desc: 'Automatisieren Sie Markierung, Zuweisung, Eskalation und Blacklisting riskanter Fälle.' }, { title: 'Dynamische Fallvorlagen', desc: 'Passen Sie Ansichten und Module anhand der nötigen Untersuchungstiefe an.' }, { title: 'Automatische Audit-Logs', desc: 'Protokollieren Sie Interaktionen, E-Mails und Untersuchungsaktivitäten.' }, { title: 'Granulare PII-Kontrolle', desc: 'Begrenzen Sie Zugriff auf sensible Daten nach Vorlage, Modul oder Feld.' }, { title: 'Fallnachrichtenmodule', desc: 'Senden und empfangen Sie E-Mails, sammeln Sie Dokumente und prüfen Sie frühere Kommunikation.' }, { title: 'Eskalationsqueues', desc: 'Routen Sie Fälle automatisch über dynamische Prüfschritte und Queues.' }, { title: 'Flexible Integrationen', desc: 'Binden Sie Kontext aus Drittanbieterdaten und Datenbanksynchronisierung ein.' }, { title: 'SLAs und Benachrichtigungen', desc: 'Lösen Sie priorisierte Fälle pünktlich mit SLAs und automatischen Hinweisen.' }, { title: 'Produktivitätsmetriken', desc: 'Optimieren Sie manuelle Prüfung über Dashboards mit Kennzahlen wie Lösungszeit.' }] },
    explore: { title: 'Mehr von Identras Identitätsplattform entdecken', cards: [{ title: 'Bauen Sie Ihren idealen Case-Management-Prozess.', desc: 'Passen Sie Workflows, Module, Queues und Teamaufgaben an.', cta: 'Case Management ansehen' }, { title: 'Automatisieren Sie alle Identitätsprozesse.', desc: 'Verbinden Sie Datenbanken, prüfen Sie Nutzer und starten Sie Drittanbieterchecks per Drag-and-drop.', cta: 'Workflows ansehen' }] },
    cta: { title: 'Bereit loszulegen?', desc: 'Kontaktieren Sie uns oder erkunden Sie Identra. Verbinden Sie Validierungsmodule und koordinieren Sie Ihr Review-Team nahtlos.', getDemo: 'Demo anfordern', tryNow: 'Jetzt testen' }
  },
  vi: {
    hero: { badge: 'Trường hợp sử dụng rà soát thủ công', title: 'Tăng tốc quyết định bằng quy trình rà soát thủ công được tùy chỉnh.', desc: 'Xử lý mọi việc từ rà soát thường lệ đến các hồ sơ gian lận khó nhất bằng trung tâm điều tra tùy chỉnh, được thiết kế để tối đa hóa tốc độ và độ chính xác.', getDemo: 'Nhận bản demo', backToPlatform: 'Quay lại nền tảng', stats: [{ value: '45%', label: 'Giảm tải thủ công', desc: 'Nhờ phân loại hàng đợi tự động và phân công theo quy tắc có điều kiện.' }, { value: '< 3 phút', label: 'Thời gian xử lý trung bình', desc: 'Hợp nhất tín hiệu chủ động, thụ động và AML trong một chế độ xem.' }] },
    trusted: { label: 'Được các startup và những doanh nghiệp lớn nhất thế giới tin dùng', brands: ['branch', 'CoffeeMeetsBagel', 'udemy'] },
    workflow: { badge: 'Kiểm soát quy trình tùy chỉnh', title: 'Cấu hình quy trình điều tra', desc: 'Định nghĩa logic tự động gắn cờ và phân công hồ sơ để rà soát thủ công, đồng thời tùy chỉnh chế độ xem điều tra theo từng loại hồ sơ. Bạn cũng có thể điều chỉnh quy tắc phân công và quyền truy cập PII một cách linh hoạt.', whyTitle: 'Vì sao điều này quan trọng:', whyDesc: 'Mỗi loại rủi ro cần chuyên môn khác nhau. Chuyển trực tiếp giao dịch rủi ro cao đến đội chuyên trách giúp tránh tồn đọng và giảm lỗi của con người.', editor: 'TRÌNH_CHỈNH_SỬA_LOGIC_QUYẾT_ĐỊNH', flow: { approve: 'Phê duyệt', condition: 'Điều kiện', decline: 'Từ chối' }, step: 'Bước 1: Rà soát thủ công', editTitle: 'Chỉnh sửa logic điều kiện', triggerLabel: 'Loại cờ / điều kiện kích hoạt', triggers: { risk_score: 'Điểm rủi ro Identra', vpn_detected: 'VPN hoặc mạng proxy', watchlist_hit: 'Khớp danh sách cấm vận', age_check: 'Ước tính bảo đảm độ tuổi' }, criteriaLabel: 'Toán tử / tiêu chí', operators: { greater: 'Lớn hơn (>)', less: 'Nhỏ hơn (<)', equals: 'Bằng chính xác (==)' }, booleanMatching: 'Điều kiện kích hoạt là khớp đúng/sai', queueLabel: 'Gán hàng đợi đích', queues: { highRisk: 'Hàng đợi chuyển cấp rủi ro cao', fraud: 'Phân loại cho chuyên viên gian lận hành vi', compliance: 'Rà soát pháp lý danh sách cấm vận', general: 'Hàng đợi rà soát thủ công tiêu chuẩn' }, saved: 'Đã lưu logic thành công', save: 'Lưu điều kiện định tuyến', pseudocode: 'Mã giả đã tạo:', code: { if: 'NẾU', then: 'THÌ', true: '=== true', route: 'route_to_queue', fallbackValue: '0', fields: { risk_score: 'user.risk_score', vpn_detected: 'user.vpn_or_proxy_active', watchlist_hit: 'user.watchlist_match_similarity', age_check: 'user.estimated_age' } } },
    signals: { badge: 'Điều tra với đầy đủ ngữ cảnh', title: 'Điều tra người dùng hoặc doanh nghiệp', desc: 'Tránh chuyển tab không cần thiết bằng cách rà soát tín hiệu chủ động, thụ động và hành vi từ nguồn nội bộ lẫn bên thứ ba trong một chế độ xem trung tâm.', bullets: ['Tự động tổng hợp điểm khớp khuôn mặt và bản quét tài liệu.', 'Dữ liệu IP theo thời gian thực, cờ bảo mật kết nối và cảnh báo VPN.', 'Lập bản đồ tức thì danh sách cấm vận OFAC với chỉ báo khớp rõ ràng.'], tabs: { active: 'Tín hiệu chủ động', passive: 'Tín hiệu thụ động', behavioral: 'Tín hiệu hành vi', thirdParty: 'Bên thứ ba' }, dashboardLabel: 'BẢNG_TÍN_HIỆU_HỢP_NHẤT', explore: 'Khám phá toàn bộ bộ công cụ rủi ro', panels: { active: { title: 'Xác minh giấy tờ tùy thân', subtitle: 'Kiểm tra tài liệu chủ động đã xác thực', rows: [{ label: 'Tính xác thực tài liệu:', value: 'ĐÃ XÁC MINH' }, { label: 'Tên trích xuất:', value: 'Alex Rivera' }, { label: 'Độ tin cậy khớp khuôn mặt:', value: 'Khớp 98,4% (selfie thật)' }], note: 'Người dùng đã tải lên giấy phép lái xe hợp lệ, không có dấu hiệu chỉnh sửa số hoặc can thiệp vật lý.' }, passive: { title: 'Dữ liệu rủi ro thụ động', subtitle: 'Bảo mật kết nối ở hậu trường', rows: [{ label: 'Phát hiện VPN / proxy:', value: 'ĐÃ PHÁT HIỆN (IP Mullvad)' }, { label: 'Vị trí địa lý IP:', value: 'Frankfurt, Đức' }, { label: 'Khớp dấu vân tay thiết bị:', value: 'Thiết bị mới liên kết với 3 địa chỉ email khác' }], note: 'Kết nối xuất phát từ một nút VPN thương mại phổ biến, cho thấy khả năng che giấu mạng.' }, behavioral: { title: 'Sinh trắc học hành vi', subtitle: 'Tốc độ tương tác và độ ngập ngừng khi thao tác', rows: [{ label: 'Tốc độ gửi biểu mẫu:', value: '9,4 giây (tự điền cực nhanh)' }, { label: 'Sử dụng clipboard:', value: 'Phát hiện dán trong trường SSN và tên' }, { label: 'Biến động tiêu điểm trang:', value: 'Chuyển tab trình duyệt 5 lần trong lúc thu thập' }], note: 'Hành vi sao chép-dán nhanh trong trường nhạy cảm có thể cho thấy hướng dẫn gian lận từ bên thứ ba.' }, thirdParty: { title: 'Tích hợp cơ sở dữ liệu bên thứ ba', subtitle: 'Kiểm tra danh sách OFAC, AML và PEP', rows: [{ label: 'Khớp danh sách cấm vận:', value: 'Khớp 84%: Alejandro Rivera' }, { label: 'Kiểm tra truyền thông bất lợi:', value: 'Không tìm thấy báo cáo khớp' }, { label: 'Trạng thái đăng ký di động:', value: 'Số điện thoại khớp dữ liệu đăng ký nhà mạng' }], note: 'Danh sách cấm vận kích hoạt kết quả khớp nhẹ với Alejandro Rivera, cần chuyên viên pháp lý xác nhận.' } } },
    decision: { badge: 'Bảng điều khiển quyết định toàn vẹn', title: 'Đưa ra quyết định có đầy đủ căn cứ', desc: 'Phê duyệt, từ chối, chuyển cấp hoặc đánh dấu hồ sơ là gian lận. Xử lý các bước tiếp theo, từ nộp Suspicious Activity Reports (SARs) đến cập nhật ticket Zendesk, ngay trong bảng điều khiển Identra hợp nhất.', autoActions: 'Hành động được kích hoạt tự động:', actions: ['Webhook API', 'Thông báo email', 'Bản nháp SAR FinCEN', 'Đồng bộ CRM'], consoleTitle: 'HỒ SƠ #7194A - BẢNG ĐIỀU KHIỂN QUYẾT ĐỊNH', reviewer: 'Người rà soát được gán: Trưởng nhóm tuân thủ', statuses: { idle: 'ĐANG CHỜ QUYẾT ĐỊNH', approving: 'ĐANG PHÊ DUYỆT...', declining: 'ĐANG TỪ CHỐI...', escalating: 'ĐANG CHUYỂN CẤP...', approved: 'ĐÃ PHÊ DUYỆT', declined: 'ĐÃ TỪ CHỐI', escalated: 'ĐÃ CHUYỂN CẤP' }, person: { name: 'Alex Rivera', detail: 'alex.rivera@example.com | San Francisco, CA', riskLabel: 'Điểm rủi ro', riskValue: '84 / 100' }, approve: 'Phê duyệt hồ sơ', decline: 'Từ chối / Bác bỏ', escalate: 'Chuyển cấp hàng đợi', auditTitle: 'ĐẦU RA VẾT KIỂM TOÁN HỆ THỐNG:', waiting: 'Đang chờ người rà soát thao tác để bắt đầu nhật ký hệ thống tự động...', reset: 'Đặt lại mô phỏng', logs: { approved: ['Đang khởi tạo giao thức phê duyệt hồ sơ...', 'Đang đồng bộ token xác minh với kho danh tính...', 'Đang cập nhật cơ sở dữ liệu CRM và nhật ký hồ sơ nội bộ...', 'Đã gửi webhook: { event: "case.approved", score: 18 }', 'Đã gửi email thông báo cho người dùng: tài khoản đã kích hoạt.'], declined: ['Đang khởi tạo quy trình từ chối và danh sách chặn...', 'Đang ghi nhận chi tiết dấu vân tay thiết bị đáng ngờ...', 'Đang thêm thông tin định danh vào cơ sở dữ liệu chống gian lận...', 'Đã gửi webhook: { event: "case.declined", category: "proxy_abuse" }', 'Đang soạn báo cáo SAR FinCEN...'], escalated: ['Đang gắn cờ hồ sơ cho rà soát cấp 2...', 'Đang thêm đánh dấu ưu tiên cho kết quả khớp OFAC...', 'Đang chuyển hồ sơ đến hàng đợi giám đốc tuân thủ được gán...', 'Đang tạo dấu trang vết kiểm toán cho người rà soát cấp cao...'] } },
    capabilities: { title: 'Điều tra và xử lý bằng các tính năng mạnh mẽ', desc: 'Trang bị cho đội tuân thủ và rủi ro các mô-đun xác minh vững chắc, SLA nghiêm ngặt và cấu trúc cơ sở dữ liệu được mã hóa.', items: [{ title: 'Quy trình tự động', desc: 'Xây dựng quy trình tự động để gắn cờ hồ sơ rủi ro, phân công, chuyển cấp hoặc thêm người dùng gian lận vào danh sách chặn.' }, { title: 'Mẫu hồ sơ động', desc: 'Tùy chỉnh chế độ xem hồ sơ theo mức độ điều tra cần thiết và thay đổi mô-đun theo tiêu chí có điều kiện.' }, { title: 'Ghi nhật ký kiểm toán tự động', desc: 'Duy trì nhật ký mọi tương tác với người dùng, bao gồm email và hoạt động liên quan đến điều tra.' }, { title: 'Kiểm soát PII chi tiết', desc: 'Giới hạn quyền truy cập dữ liệu nhạy cảm ở cấp mẫu, mô-đun hoặc trường để đảm bảo kiểm tra an toàn.' }, { title: 'Mô-đun nhắn tin hồ sơ', desc: 'Gửi và nhận email, thu thập tài liệu và nhanh chóng xem lại trao đổi trước đó trong hồ sơ chuyển cấp.' }, { title: 'Hàng đợi chuyển cấp', desc: 'Tự động định tuyến hồ sơ bằng các bước rà soát và hàng đợi động cho chuyển cấp.' }, { title: 'Tích hợp linh hoạt', desc: 'Bổ sung ngữ cảnh từ dữ liệu bên thứ ba qua tích hợp tùy chỉnh và công cụ đồng bộ cơ sở dữ liệu.' }, { title: 'SLA và thông báo', desc: 'Đảm bảo xử lý kịp thời hồ sơ ưu tiên cao bằng SLA và thông báo tự động cho sự kiện xác thực quan trọng.' }, { title: 'Chỉ số năng suất', desc: 'Tối ưu quy trình rà soát thủ công bằng bảng điều khiển phân tích chỉ số như thời gian xử lý hồ sơ.' }] },
    explore: { title: 'Khám phá thêm nền tảng danh tính của Identra', cards: [{ title: 'Xây dựng quy trình quản lý hồ sơ lý tưởng.', desc: 'Tùy chỉnh quy trình sâu, mô-đun rà soát, phân công hàng đợi và nhiệm vụ đội nhóm.', cta: 'Xem Case Management' }, { title: 'Tự động hóa toàn bộ quy trình danh tính.', desc: 'Kéo thả khối để liên kết cơ sở dữ liệu, xác minh người dùng và chạy kiểm tra bên thứ ba.', cta: 'Xem Workflows' }] },
    cta: { title: 'Sẵn sàng bắt đầu?', desc: 'Liên hệ hoặc bắt đầu khám phá Identra hôm nay. Kết nối mô-đun xác thực tùy chỉnh và điều phối bàn rà soát liền mạch.', getDemo: 'Nhận bản demo', tryNow: 'Thử ngay' }
  }
} as const;
