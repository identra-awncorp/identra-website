/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PARTNERS_PAGE_TRANSLATIONS = {
  en: {
    backToPlatform: 'Back to Platform',
    badge: 'Identra Partner Program',
    heroTitle: 'Better together. Connect your systems.',
    heroDesc: 'Work alongside Identra to integrate, scale, and deliver global identity management solutions. Leverage our powerful API wrappers and dynamic hooks.',
    heroChecks: ['No-Code Direct Plugs', 'Shared SLA Support Channels'],
    stats: [
      { label: 'App Store Plugins', value: '45+', desc: 'Certified API connections' },
      { label: 'Partner Referral Share', value: 'Up to 25%', desc: 'Recurring client reward split' }
    ],
    simulator: {
      badge: 'Interactive Application Playroom',
      title: 'Interactive App Store Integration',
      descPrefix: 'Simulate connecting external CRM, database, and identity solutions with our live configuration engine. Click',
      connectSyncQuoted: '"Connect Sync"',
      descSuffix: 'on any partner below to witness secure API token exchanges in real time.',
      active: 'ACTIVE',
      connecting: 'Pinging security keys...',
      disconnect: 'Disconnect System',
      connect: 'Connect Sync',
      terminalTitle: 'Live Integration Router',
      terminalStatus: 'SYS_OK',
      readyTitle: 'Ready for System Linkage',
      readyDesc: 'Click "Connect Sync" on a platform card to initiate automated configuration audits.',
      activePipes: 'Active Pipes:',
      uptimeSla: 'Uptime SLA:',
      logs: {
        api: '[API] Initiating integration link for {partner}...',
        oauth: '[OAUTH] Fetching client credentials and access tokens...',
        security: '[SECURITY] Exchanging secure JWT keys with {partner} Gateway...',
        webhook: '[WEBHOOK] Registering callback endpoints: https://api.withidentra.com/v1/partners/{id}',
        schemas: '[SCHEMAS] Syncing customized metadata fields mapping...',
        test: '[TEST] Dispatching initial health-check ping... SUCCESS (RTT: 48ms)',
        complete: '[COMPLETE] Integration connection active for {partner}!'
      }
    },
    categories: {
      all: 'All',
      identity: 'Identity',
      crm: 'CRM',
      database: 'Data',
      security: 'Security'
    },
    integrations: [
      {
        id: 'salesforce',
        name: 'Salesforce',
        category: 'crm',
        logo: 'SF',
        description: 'Enrich lead details and customer profiles with automated identity signals and UBO documents directly inside your Salesforce CRM layout.',
        features: ['Automated Lead Enrichment', 'AML/Sanction Status Logging', 'KYB Document Synchronization']
      },
      {
        id: 'okta',
        name: 'Okta Identity',
        category: 'security',
        logo: 'Okta',
        description: 'Bind secure workforce credentials and multi-factor authentication triggers dynamically based on real-time Identra risk score metrics.',
        features: ['SSO Level Assurance', 'Risk-Based Account Lockout', 'Biometric Selfie MFA Sync']
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        category: 'crm',
        logo: 'HS',
        description: 'Sync comprehensive identity lifecycle statuses and KYC onboarding milestones directly to HubSpot contact fields in real time.',
        features: ['Contact Pipeline Triggers', 'KYC Status Custom Properties', 'No-code integration setup']
      },
      {
        id: 'snowflake',
        name: 'Snowflake',
        category: 'database',
        logo: 'SFK',
        description: 'Securely archive millions of global compliance check logs and document metadata schemas inside Snowflake for advanced analytical audits.',
        features: ['Encrypted Bulk Archival', 'Continuous Sync Pipeline', 'High-Speed Analytical Views']
      }
    ],
    calculator: {
      badge: 'Program Benefits',
      title: 'Interactive Partner Earnings Calculator',
      desc: 'We reward our strategic alliance partners, consultancies, and developers handsomely. Move the slider to forecast your expected referrals per month and preview your tier rewards instantly.',
      expectedReferrals: 'Expected Referrals',
      clientsPerMonth: 'clients / mo',
      minLabel: '1 CLIENT',
      midLabel: '30 CLIENTS',
      maxLabel: '60+ PLATINUM',
      activeTier: 'Active Forecasted Tier',
      activeStatus: 'Active Status',
      revenueShare: 'Revenue Share split',
      marketingBudget: 'Co-Marketing Co-op budget',
      supportSla: 'Support SLA Escalation',
      note: 'Calculations are based on average monthly license terms.',
      apply: 'Apply to Program',
      tiers: [
        { max: 5, tier: 'Registered Affiliate', commission: '10% recurring share', support: 'Standard email queue', mktgBudget: '$500 quarterly co-op', badgeColor: 'bg-slate-100 text-slate-700' },
        { max: 20, tier: 'Silver Catalyst', commission: '15% recurring share', support: 'Priority 2-hour response', mktgBudget: '$2,500 quarterly co-op', badgeColor: 'bg-blue-50 text-[#354CE1]' },
        { max: 40, tier: 'Gold Strategic Partner', commission: '20% recurring share', support: 'Dedicated Partner Manager', mktgBudget: '$10,000 co-marketing funding', badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100' },
        { max: 999, tier: 'Platinum Global Alliance', commission: '25% recurring share', support: 'Instant-response Slack & Support', mktgBudget: '$40,000 global co-campaigns', badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100' }
      ]
    },
    directory: {
      title: 'Certified Partner Network',
      desc: 'Browse pre-configured connectors and verified system integrators globally.',
      searchPlaceholder: 'Search partner directory...',
      website: 'Website',
      emptyTitle: 'No certified partners found',
      emptyDesc: 'Try adjusting your filters or typing different search terms.',
      partners: [
        { name: 'Okta Identity', category: 'security', rating: 'Certified Catalyst', desc: 'Enterprise workforce directory bindings and secure conditional MFA controls.', url: 'okta.com' },
        { name: 'Salesforce CRM', category: 'crm', rating: 'Premium Solution', desc: 'Comprehensive Salesforce fields synchronization and KYB automated reporting.', url: 'salesforce.com' },
        { name: 'HubSpot', category: 'crm', rating: 'Featured App', desc: 'Marketing and customer success pipeline status webhooks and contact syncing.', url: 'hubspot.com' },
        { name: 'Snowflake Data', category: 'database', rating: 'Certified Storage', desc: 'Secure high-performance compliance archiving and audit analytics grids.', url: 'snowflake.com' },
        { name: 'LexisNexis', category: 'identity', rating: 'Strategic Partner', desc: 'Global electronic database checks, property records, and death master indexes.', url: 'lexisnexis.com' },
        { name: 'Twilio Segment', category: 'crm', rating: 'Featured App', desc: 'Customer data platform events, user profile enrichment, and audience building.', url: 'segment.com' },
        { name: 'Plaid Financial', category: 'identity', rating: 'Premium Solution', desc: 'Instant bank account ownership verification and real-time balance inquiries.', url: 'plaid.com' },
        { name: 'AWS Cloud Security', category: 'security', rating: 'Infrastructure Partner', desc: 'High-availability KMS envelope encryption and GovCloud private link pipelines.', url: 'amazon.com' }
      ]
    },
    form: {
      title: 'Apply to Become a Partner',
      desc: "Tell us about your corporate structure, integration capabilities, and let's work on creating instant global trust hooks together.",
      contactName: 'Contact Full Name *',
      contactPlaceholder: 'John Doe',
      email: 'Work Email *',
      emailPlaceholder: 'john@company.com',
      website: 'Company Website URL *',
      websitePlaceholder: 'https://company.com',
      partnerType: 'Partner Type',
      proposed: 'Proposed Integration / Joint Solution',
      proposedPlaceholder: 'Tell us about how your system would hook with Identra APIs, KYC, or custom security profiles...',
      consent: 'I agree to the Identra Partner Program Terms and authorize Identra to review website domain information.',
      submit: 'Submit Partner Application',
      submitting: 'Publishing alliance credential checklist...',
      successTitle: 'Application Submitted!',
      successDescPrefix: 'Thank you for applying. A partner manager will review your submission and website',
      successDescSuffix: 'within 2 business days.',
      recordTitle: 'Partner Application Record',
      partnerId: 'PARTNER_ID:',
      name: 'NAME:',
      domain: 'DOMAIN:',
      type: 'TYPE:',
      status: 'STATUS:',
      reviewPending: 'REVIEW_PENDING',
      submitAnother: 'Submit another application',
      returnHome: 'Return to Homepage',
      typeOptions: [
        { value: 'technology', label: 'Technology Integration (SaaS)' },
        { value: 'consultancy', label: 'Consultancy & System Integrator' },
        { value: 'developer', label: 'Independent Developer' },
        { value: 'agency', label: 'Strategic Alliance / Agency' }
      ],
      errors: {
        partnerName: 'Contact name is required',
        email: 'Valid work email is required',
        companyWebsite: 'Website URL is required',
        consent: 'You must agree to the program terms'
      },
      logs: {
        system: '[SYSTEM] Reviewing Partner Application for {name}...',
        compliance: '[COMPLIANCE] Inspecting Domain: {domain}... OK',
        sla: '[SLA] Generating partnership SLA agreement documents...',
        router: '[AI-ROUTER] Routing application to global partner alliances team...',
        success: '[SUCCESS] Application registered under Partner ID: {id}.'
      }
    }
  },
  es: {
    backToPlatform: 'Volver a la plataforma',
    badge: 'Programa de partners de Identra',
    heroTitle: 'Mejor juntos. Conecta tus sistemas.',
    heroDesc: 'Colabora con Identra para integrar, escalar y entregar soluciones globales de gestión de identidad. Aprovecha nuestros potentes envoltorios de API y hooks dinámicos.',
    heroChecks: ['Conectores directos sin código', 'Canales compartidos de soporte SLA'],
    stats: [
      { label: 'Plugins de App Store', value: '45+', desc: 'Conexiones API certificadas' },
      { label: 'Participación por referidos', value: 'Hasta 25%', desc: 'Reparto recurrente de recompensas por cliente' }
    ],
    simulator: {
      badge: 'Zona interactiva de aplicaciones',
      title: 'Integración interactiva de App Store',
      descPrefix: 'Simula la conexión de soluciones externas de CRM, bases de datos e identidad con nuestro motor de configuración en vivo. Haz clic en',
      connectSyncQuoted: '"Conectar Sync"',
      descSuffix: 'en cualquier partner para ver intercambios seguros de tokens API en tiempo real.',
      active: 'ACTIVO',
      connecting: 'Probando claves de seguridad...',
      disconnect: 'Desconectar sistema',
      connect: 'Conectar Sync',
      terminalTitle: 'Enrutador de integración en vivo',
      terminalStatus: 'SIS_OK',
      readyTitle: 'Listo para vincular sistemas',
      readyDesc: 'Haz clic en "Conectar Sync" en una tarjeta de plataforma para iniciar auditorías automáticas de configuración.',
      activePipes: 'Canales activos:',
      uptimeSla: 'SLA de disponibilidad:',
      logs: {
        api: '[API] Iniciando enlace de integración para {partner}...',
        oauth: '[OAUTH] Obteniendo credenciales de cliente y tokens de acceso...',
        security: '[SEGURIDAD] Intercambiando claves JWT seguras con la pasarela de {partner}...',
        webhook: '[WEBHOOK] Registrando endpoints de devolución: https://api.withidentra.com/v1/partners/{id}',
        schemas: '[ESQUEMAS] Sincronizando mapeo personalizado de metadatos...',
        test: '[PRUEBA] Enviando ping inicial de salud... CORRECTO (RTT: 48ms)',
        complete: '[COMPLETO] Integración activa para {partner}.'
      }
    },
    categories: { all: 'Todos', identity: 'Identidad', crm: 'CRM', database: 'Datos', security: 'Seguridad' },
    integrations: [
      { id: 'salesforce', name: 'Salesforce', category: 'crm', logo: 'SF', description: 'Enriquece leads y perfiles de clientes con señales automáticas de identidad y documentos UBO directamente en Salesforce CRM.', features: ['Enriquecimiento automático de leads', 'Registro de estado AML/sanciones', 'Sincronización de documentos KYB'] },
      { id: 'okta', name: 'Okta Identity', category: 'security', logo: 'Okta', description: 'Vincula credenciales seguras de empleados y activadores MFA según métricas de riesgo de Identra en tiempo real.', features: ['Nivel de garantía SSO', 'Bloqueo de cuenta basado en riesgo', 'Sincronización MFA con selfie biométrica'] },
      { id: 'hubspot', name: 'HubSpot', category: 'crm', logo: 'HS', description: 'Sincroniza estados del ciclo de vida de identidad e hitos de onboarding KYC directamente en campos de contacto de HubSpot.', features: ['Activadores de pipeline de contacto', 'Propiedades personalizadas de estado KYC', 'Configuración sin código'] },
      { id: 'snowflake', name: 'Snowflake', category: 'database', logo: 'SFK', description: 'Archiva de forma segura millones de registros de cumplimiento y metadatos de documentos en Snowflake para auditorías avanzadas.', features: ['Archivado masivo cifrado', 'Canal de sincronización continua', 'Vistas analíticas de alta velocidad'] }
    ],
    calculator: {
      badge: 'Beneficios del programa',
      title: 'Calculadora interactiva de ingresos para partners',
      desc: 'Recompensamos generosamente a partners estratégicos, consultoras y desarrolladores. Mueve el control para prever referidos mensuales y ver tus beneficios al instante.',
      expectedReferrals: 'Referidos esperados',
      clientsPerMonth: 'clientes / mes',
      minLabel: '1 CLIENTE',
      midLabel: '30 CLIENTES',
      maxLabel: '60+ PLATINO',
      activeTier: 'Nivel previsto activo',
      activeStatus: 'Estado activo',
      revenueShare: 'Reparto de ingresos',
      marketingBudget: 'Presupuesto cooperativo de marketing',
      supportSla: 'Escalamiento SLA de soporte',
      note: 'Los cálculos se basan en términos promedio de licencia mensual.',
      apply: 'Postular al programa',
      tiers: [
        { max: 5, tier: 'Afiliado registrado', commission: '10% de participación recurrente', support: 'Cola estándar de email', mktgBudget: 'US$500 trimestrales cooperativos', badgeColor: 'bg-slate-100 text-slate-700' },
        { max: 20, tier: 'Catalyst Silver', commission: '15% de participación recurrente', support: 'Respuesta prioritaria en 2 horas', mktgBudget: 'US$2.500 trimestrales cooperativos', badgeColor: 'bg-blue-50 text-[#354CE1]' },
        { max: 40, tier: 'Partner estratégico Gold', commission: '20% de participación recurrente', support: 'Partner Manager dedicado', mktgBudget: 'US$10.000 para co-marketing', badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100' },
        { max: 999, tier: 'Alianza global Platinum', commission: '25% de participación recurrente', support: 'Slack y soporte de respuesta inmediata', mktgBudget: 'US$40.000 para campañas globales', badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100' }
      ]
    },
    directory: {
      title: 'Red de partners certificados',
      desc: 'Explora conectores preconfigurados e integradores de sistemas verificados en todo el mundo.',
      searchPlaceholder: 'Buscar en directorio de partners...',
      website: 'Sitio web',
      emptyTitle: 'No se encontraron partners certificados',
      emptyDesc: 'Ajusta los filtros o prueba otros términos de búsqueda.',
      partners: [
        { name: 'Okta Identity', category: 'security', rating: 'Catalyst certificado', desc: 'Vínculos de directorio empresarial y controles MFA condicionales seguros.', url: 'okta.com' },
        { name: 'Salesforce CRM', category: 'crm', rating: 'Solución premium', desc: 'Sincronización completa de campos de Salesforce y reportes KYB automáticos.', url: 'salesforce.com' },
        { name: 'HubSpot', category: 'crm', rating: 'App destacada', desc: 'Webhooks de estado para marketing y customer success, y sincronización de contactos.', url: 'hubspot.com' },
        { name: 'Snowflake Data', category: 'database', rating: 'Almacenamiento certificado', desc: 'Archivado seguro de cumplimiento y analítica de auditoría de alto rendimiento.', url: 'snowflake.com' },
        { name: 'LexisNexis', category: 'identity', rating: 'Partner estratégico', desc: 'Comprobaciones electrónicas globales, registros de propiedad e índices de defunción.', url: 'lexisnexis.com' },
        { name: 'Twilio Segment', category: 'crm', rating: 'App destacada', desc: 'Eventos CDP, enriquecimiento de perfiles y creación de audiencias.', url: 'segment.com' },
        { name: 'Plaid Financial', category: 'identity', rating: 'Solución premium', desc: 'Verificación instantánea de titularidad bancaria y consultas de saldo en tiempo real.', url: 'plaid.com' },
        { name: 'AWS Cloud Security', category: 'security', rating: 'Partner de infraestructura', desc: 'Cifrado KMS de alta disponibilidad y pipelines PrivateLink para GovCloud.', url: 'amazon.com' }
      ]
    },
    form: {
      title: 'Postula para convertirte en partner',
      desc: 'Cuéntanos sobre tu estructura corporativa, capacidades de integración y creemos juntos conexiones globales de confianza.',
      contactName: 'Nombre completo de contacto *',
      contactPlaceholder: 'Juan Pérez',
      email: 'Email laboral *',
      emailPlaceholder: 'juan@empresa.com',
      website: 'URL del sitio web de la empresa *',
      websitePlaceholder: 'https://empresa.com',
      partnerType: 'Tipo de partner',
      proposed: 'Integración propuesta / solución conjunta',
      proposedPlaceholder: 'Cuéntanos cómo tu sistema se conectaría con APIs de Identra, KYC o perfiles de seguridad personalizados...',
      consent: 'Acepto los términos del Programa de Partners de Identra y autorizo a Identra a revisar la información del dominio web.',
      submit: 'Enviar solicitud de partner',
      submitting: 'Publicando checklist de credenciales de alianza...',
      successTitle: 'Solicitud enviada',
      successDescPrefix: 'Gracias por postular. Un Partner Manager revisará tu solicitud y el sitio web',
      successDescSuffix: 'en un plazo de 2 días hábiles.',
      recordTitle: 'Registro de solicitud de partner',
      partnerId: 'PARTNER_ID:',
      name: 'NOMBRE:',
      domain: 'DOMINIO:',
      type: 'TIPO:',
      status: 'ESTADO:',
      reviewPending: 'REVISIÓN_PENDIENTE',
      submitAnother: 'Enviar otra solicitud',
      returnHome: 'Volver al inicio',
      typeOptions: [
        { value: 'technology', label: 'Integración tecnológica (SaaS)' },
        { value: 'consultancy', label: 'Consultoría e integrador de sistemas' },
        { value: 'developer', label: 'Desarrollador independiente' },
        { value: 'agency', label: 'Alianza estratégica / agencia' }
      ],
      errors: {
        partnerName: 'El nombre de contacto es obligatorio',
        email: 'Se requiere un email laboral válido',
        companyWebsite: 'La URL del sitio web es obligatoria',
        consent: 'Debes aceptar los términos del programa'
      },
      logs: {
        system: '[SISTEMA] Revisando solicitud de partner para {name}...',
        compliance: '[CUMPLIMIENTO] Inspeccionando dominio: {domain}... OK',
        sla: '[SLA] Generando documentos de acuerdo de partnership...',
        router: '[AI-ROUTER] Enrutando solicitud al equipo global de alianzas...',
        success: '[ÉXITO] Solicitud registrada con Partner ID: {id}.'
      }
    }
  },
  ja: {
    backToPlatform: 'プラットフォームに戻る',
    badge: 'Identra パートナープログラム',
    heroTitle: '共に、より強く。システムをつなぐ。',
    heroDesc: 'Identra と連携し、グローバルな本人確認管理ソリューションを統合、拡張、提供できます。強力な API ラッパーと動的 hooks を活用してください。',
    heroChecks: ['ノーコード直接接続', '共有 SLA サポートチャネル'],
    stats: [
      { label: 'App Store プラグイン', value: '45+', desc: '認定 API 接続' },
      { label: 'パートナー紹介シェア', value: '最大 25%', desc: '継続的な顧客報酬配分' }
    ],
    simulator: {
      badge: 'インタラクティブアプリプレイルーム',
      title: 'App Store 統合シミュレーター',
      descPrefix: '外部 CRM、データベース、本人確認ソリューションをライブ構成エンジンに接続する様子をシミュレートします。下のパートナーで',
      connectSyncQuoted: '「同期を接続」',
      descSuffix: 'をクリックすると、安全な API トークン交換をリアルタイムで確認できます。',
      active: '有効',
      connecting: 'セキュリティキーを確認中...',
      disconnect: 'システムを切断',
      connect: '同期を接続',
      terminalTitle: 'ライブ統合ルーター',
      terminalStatus: 'SYS_OK',
      readyTitle: 'システム連携の準備完了',
      readyDesc: 'プラットフォームカードの「同期を接続」をクリックして、自動構成監査を開始します。',
      activePipes: '有効パイプ:',
      uptimeSla: '稼働 SLA:',
      logs: {
        api: '[API] {partner} の統合リンクを開始中...',
        oauth: '[OAUTH] クライアント資格情報とアクセストークンを取得中...',
        security: '[SECURITY] {partner} Gateway と安全な JWT キーを交換中...',
        webhook: '[WEBHOOK] コールバック endpoint を登録中: https://api.withidentra.com/v1/partners/{id}',
        schemas: '[SCHEMAS] カスタムメタデータフィールドのマッピングを同期中...',
        test: '[TEST] 初回ヘルスチェック ping を送信中... SUCCESS (RTT: 48ms)',
        complete: '[COMPLETE] {partner} の統合接続が有効になりました。'
      }
    },
    categories: { all: 'すべて', identity: '本人確認', crm: 'CRM', database: 'データ', security: 'セキュリティ' },
    integrations: [
      { id: 'salesforce', name: 'Salesforce', category: 'crm', logo: 'SF', description: 'Salesforce CRM レイアウト内で、本人確認シグナルと UBO 書類によりリード詳細と顧客プロファイルを自動強化します。', features: ['リード自動強化', 'AML/制裁ステータス記録', 'KYB 書類同期'] },
      { id: 'okta', name: 'Okta Identity', category: 'security', logo: 'Okta', description: 'Identra のリアルタイムリスクスコアに基づき、従業員資格情報と多要素認証トリガーを動的に連携します。', features: ['SSO 保証レベル', 'リスクベースのアカウントロック', '生体セルフィー MFA 同期'] },
      { id: 'hubspot', name: 'HubSpot', category: 'crm', logo: 'HS', description: '本人確認ライフサイクルの状態と KYC オンボーディングの節目を HubSpot の連絡先フィールドへリアルタイム同期します。', features: ['連絡先パイプラインのトリガー', 'KYC 状態カスタムプロパティ', 'ノーコード統合設定'] },
      { id: 'snowflake', name: 'Snowflake', category: 'database', logo: 'SFK', description: '高度な分析監査に向け、グローバルなコンプライアンスチェックログと書類メタデータを Snowflake に安全にアーカイブします。', features: ['暗号化一括アーカイブ', '継続同期パイプライン', '高速分析ビュー'] }
    ],
    calculator: {
      badge: 'プログラム特典',
      title: 'パートナー収益計算ツール',
      desc: '戦略的アライアンスパートナー、コンサルティング会社、開発者を手厚く支援します。スライダーで月間紹介数を予測し、ティア特典を即座に確認できます。',
      expectedReferrals: '予想紹介数',
      clientsPerMonth: '顧客 / 月',
      minLabel: '1 顧客',
      midLabel: '30 顧客',
      maxLabel: '60+ PLATINUM',
      activeTier: '予測アクティブティア',
      activeStatus: '有効ステータス',
      revenueShare: '収益シェア配分',
      marketingBudget: '共同マーケティング予算',
      supportSla: 'サポート SLA エスカレーション',
      note: '計算は平均的な月次ライセンス条件に基づきます。',
      apply: 'プログラムに応募',
      tiers: [
        { max: 5, tier: 'Registered Affiliate', commission: '継続収益の 10%', support: '標準メールキュー', mktgBudget: '四半期 $500 の共同予算', badgeColor: 'bg-slate-100 text-slate-700' },
        { max: 20, tier: 'Silver Catalyst', commission: '継続収益の 15%', support: '優先 2 時間応答', mktgBudget: '四半期 $2,500 の共同予算', badgeColor: 'bg-blue-50 text-[#354CE1]' },
        { max: 40, tier: 'Gold Strategic Partner', commission: '継続収益の 20%', support: '専任 Partner Manager', mktgBudget: '$10,000 の共同マーケティング資金', badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100' },
        { max: 999, tier: 'Platinum Global Alliance', commission: '継続収益の 25%', support: '即応 Slack とサポート', mktgBudget: '$40,000 のグローバル共同キャンペーン', badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100' }
      ]
    },
    directory: {
      title: '認定パートナーネットワーク',
      desc: '事前構成済みコネクターと認定システムインテグレーターを世界中から探せます。',
      searchPlaceholder: 'パートナーディレクトリを検索...',
      website: 'Web サイト',
      emptyTitle: '認定パートナーが見つかりません',
      emptyDesc: 'フィルターを調整するか、別の検索語を入力してください。',
      partners: [
        { name: 'Okta Identity', category: 'security', rating: 'Certified Catalyst', desc: 'エンタープライズ従業員ディレクトリ連携と安全な条件付き MFA 制御。', url: 'okta.com' },
        { name: 'Salesforce CRM', category: 'crm', rating: 'Premium Solution', desc: 'Salesforce フィールド同期と KYB 自動レポート。', url: 'salesforce.com' },
        { name: 'HubSpot', category: 'crm', rating: 'Featured App', desc: 'マーケティングと顧客成功パイプラインの webhook と連絡先同期。', url: 'hubspot.com' },
        { name: 'Snowflake Data', category: 'database', rating: 'Certified Storage', desc: '安全な高性能コンプライアンスアーカイブと監査分析。', url: 'snowflake.com' },
        { name: 'LexisNexis', category: 'identity', rating: 'Strategic Partner', desc: 'グローバル電子データベースチェック、不動産記録、死亡者インデックス。', url: 'lexisnexis.com' },
        { name: 'Twilio Segment', category: 'crm', rating: 'Featured App', desc: '顧客データ基盤イベント、ユーザープロファイル強化、オーディエンス作成。', url: 'segment.com' },
        { name: 'Plaid Financial', category: 'identity', rating: 'Premium Solution', desc: '銀行口座所有者確認とリアルタイム残高照会。', url: 'plaid.com' },
        { name: 'AWS Cloud Security', category: 'security', rating: 'Infrastructure Partner', desc: '高可用性 KMS エンベロープ暗号化と GovCloud PrivateLink パイプライン。', url: 'amazon.com' }
      ]
    },
    form: {
      title: 'パートナーに応募',
      desc: '企業構造、統合能力について教えてください。世界規模の信頼接続を一緒に作りましょう。',
      contactName: '担当者氏名 *',
      contactPlaceholder: '山田 太郎',
      email: '勤務先メール *',
      emailPlaceholder: 'taro@company.com',
      website: '会社 Web サイト URL *',
      websitePlaceholder: 'https://company.com',
      partnerType: 'パートナー種別',
      proposed: '提案する統合 / 共同ソリューション',
      proposedPlaceholder: '貴社システムが Identra APIs、KYC、またはカスタムセキュリティプロファイルとどう連携するか教えてください...',
      consent: 'Identra パートナープログラム規約に同意し、Identra が Web サイトドメイン情報を確認することを許可します。',
      submit: 'パートナー申請を送信',
      submitting: 'アライアンス資格チェックリストを公開中...',
      successTitle: '申請を送信しました',
      successDescPrefix: 'ご応募ありがとうございます。Partner Manager が申請内容と Web サイト',
      successDescSuffix: 'を 2 営業日以内に確認します。',
      recordTitle: 'パートナー申請記録',
      partnerId: 'PARTNER_ID:',
      name: 'NAME:',
      domain: 'DOMAIN:',
      type: 'TYPE:',
      status: 'STATUS:',
      reviewPending: 'REVIEW_PENDING',
      submitAnother: '別の申請を送信',
      returnHome: 'ホームに戻る',
      typeOptions: [
        { value: 'technology', label: '技術統合 (SaaS)' },
        { value: 'consultancy', label: 'コンサルティング / システムインテグレーター' },
        { value: 'developer', label: '独立開発者' },
        { value: 'agency', label: '戦略的アライアンス / 代理店' }
      ],
      errors: {
        partnerName: '担当者名は必須です',
        email: '有効な勤務先メールが必要です',
        companyWebsite: 'Web サイト URL は必須です',
        consent: 'プログラム規約への同意が必要です'
      },
      logs: {
        system: '[SYSTEM] {name} のパートナー申請を確認中...',
        compliance: '[COMPLIANCE] ドメインを検査中: {domain}... OK',
        sla: '[SLA] パートナーシップ SLA 契約書を生成中...',
        router: '[AI-ROUTER] 申請をグローバルパートナーアライアンスチームへルーティング中...',
        success: '[SUCCESS] 申請を Partner ID: {id} で登録しました。'
      }
    }
  },
  de: {
    backToPlatform: 'Zur Plattform',
    badge: 'Identra Partnerprogramm',
    heroTitle: 'Gemeinsam besser. Verbinden Sie Ihre Systeme.',
    heroDesc: 'Arbeiten Sie mit Identra zusammen, um globale Identitätsmanagementlösungen zu integrieren, zu skalieren und bereitzustellen. Nutzen Sie leistungsstarke API-Wrapper und dynamische Hooks.',
    heroChecks: ['Direkte No-Code-Verbindungen', 'Gemeinsame SLA-Supportkanäle'],
    stats: [
      { label: 'App-Store-Plugins', value: '45+', desc: 'Zertifizierte API-Verbindungen' },
      { label: 'Partnerempfehlungsanteil', value: 'Bis zu 25%', desc: 'Wiederkehrende Kundenprämienaufteilung' }
    ],
    simulator: {
      badge: 'Interaktiver App-Playroom',
      title: 'Interaktive App-Store-Integration',
      descPrefix: 'Simulieren Sie die Verbindung externer CRM-, Datenbank- und Identitätslösungen mit unserer Live-Konfigurationsengine. Klicken Sie bei einem Partner unten auf',
      connectSyncQuoted: '"Sync verbinden"',
      descSuffix: 'um sichere API-Token-Austausche in Echtzeit zu sehen.',
      active: 'AKTIV',
      connecting: 'Sicherheitsschlüssel werden angepingt...',
      disconnect: 'System trennen',
      connect: 'Sync verbinden',
      terminalTitle: 'Live-Integrationsrouter',
      terminalStatus: 'SYS_OK',
      readyTitle: 'Bereit für Systemverknüpfung',
      readyDesc: 'Klicken Sie auf einer Plattformkarte auf "Sync verbinden", um automatische Konfigurationsaudits zu starten.',
      activePipes: 'Aktive Pipes:',
      uptimeSla: 'Uptime-SLA:',
      logs: {
        api: '[API] Integrationslink für {partner} wird gestartet...',
        oauth: '[OAUTH] Client-Credentials und Zugriffstoken werden abgerufen...',
        security: '[SECURITY] Sichere JWT-Schlüssel werden mit {partner} Gateway ausgetauscht...',
        webhook: '[WEBHOOK] Callback-Endpunkte werden registriert: https://api.withidentra.com/v1/partners/{id}',
        schemas: '[SCHEMAS] Benutzerdefinierte Metadatenfeld-Zuordnung wird synchronisiert...',
        test: '[TEST] Initialer Health-Check-Ping wird gesendet... SUCCESS (RTT: 48ms)',
        complete: '[COMPLETE] Integrationsverbindung für {partner} aktiv.'
      }
    },
    categories: { all: 'Alle', identity: 'Identität', crm: 'CRM', database: 'Daten', security: 'Sicherheit' },
    integrations: [
      { id: 'salesforce', name: 'Salesforce', category: 'crm', logo: 'SF', description: 'Reichern Sie Leads und Kundenprofile mit automatisierten Identitätssignalen und UBO-Dokumenten direkt in Salesforce CRM an.', features: ['Automatische Lead-Anreicherung', 'AML-/Sanktionsstatus-Protokollierung', 'KYB-Dokumentsynchronisierung'] },
      { id: 'okta', name: 'Okta Identity', category: 'security', logo: 'Okta', description: 'Verknüpfen Sie sichere Workforce-Credentials und MFA-Auslöser dynamisch anhand von Identra-Risikowerten in Echtzeit.', features: ['SSO-Assurance-Level', 'Risikobasierte Kontosperre', 'Biometrische Selfie-MFA-Synchronisierung'] },
      { id: 'hubspot', name: 'HubSpot', category: 'crm', logo: 'HS', description: 'Synchronisieren Sie Identitätslebenszyklusstatus und KYC-Onboarding-Meilensteine direkt mit HubSpot-Kontaktfeldern.', features: ['Kontakt-Pipeline-Auslöser', 'Benutzerdefinierte KYC-Statusfelder', 'No-Code-Integrationseinrichtung'] },
      { id: 'snowflake', name: 'Snowflake', category: 'database', logo: 'SFK', description: 'Archivieren Sie globale Compliance-Logs und Dokumentmetadaten sicher in Snowflake für erweiterte Audits.', features: ['Verschlüsselte Massenarchivierung', 'Kontinuierliche Sync-Pipeline', 'Hochgeschwindigkeits-Analyseansichten'] }
    ],
    calculator: {
      badge: 'Programmleistungen',
      title: 'Interaktiver Partnerverdienst-Rechner',
      desc: 'Wir belohnen strategische Allianzpartner, Beratungen und Entwickler großzügig. Bewegen Sie den Slider, um monatliche Empfehlungen und Tier-Prämien zu prognostizieren.',
      expectedReferrals: 'Erwartete Empfehlungen',
      clientsPerMonth: 'Kunden / Monat',
      minLabel: '1 KUNDE',
      midLabel: '30 KUNDEN',
      maxLabel: '60+ PLATIN',
      activeTier: 'Aktive prognostizierte Stufe',
      activeStatus: 'Aktiver Status',
      revenueShare: 'Revenue-Share-Aufteilung',
      marketingBudget: 'Co-Marketing-Budget',
      supportSla: 'Support-SLA-Eskalation',
      note: 'Berechnungen basieren auf durchschnittlichen monatlichen Lizenzbedingungen.',
      apply: 'Für Programm bewerben',
      tiers: [
        { max: 5, tier: 'Registrierter Affiliate', commission: '10% wiederkehrende Beteiligung', support: 'Standard-E-Mail-Warteschlange', mktgBudget: '500 $ quartalsweise Co-op', badgeColor: 'bg-slate-100 text-slate-700' },
        { max: 20, tier: 'Silver Catalyst', commission: '15% wiederkehrende Beteiligung', support: 'Priorisierte 2-Stunden-Antwort', mktgBudget: '2.500 $ quartalsweise Co-op', badgeColor: 'bg-blue-50 text-[#354CE1]' },
        { max: 40, tier: 'Gold Strategic Partner', commission: '20% wiederkehrende Beteiligung', support: 'Dedizierter Partner Manager', mktgBudget: '10.000 $ Co-Marketing-Finanzierung', badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100' },
        { max: 999, tier: 'Platinum Global Alliance', commission: '25% wiederkehrende Beteiligung', support: 'Slack & Support mit Sofortantwort', mktgBudget: '40.000 $ globale Co-Kampagnen', badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100' }
      ]
    },
    directory: {
      title: 'Zertifiziertes Partnernetzwerk',
      desc: 'Durchsuchen Sie vorkonfigurierte Konnektoren und verifizierte Systemintegratoren weltweit.',
      searchPlaceholder: 'Partnerverzeichnis durchsuchen...',
      website: 'Website',
      emptyTitle: 'Keine zertifizierten Partner gefunden',
      emptyDesc: 'Passen Sie Filter an oder geben Sie andere Suchbegriffe ein.',
      partners: [
        { name: 'Okta Identity', category: 'security', rating: 'Certified Catalyst', desc: 'Enterprise-Workforce-Verzeichnisbindungen und sichere bedingte MFA-Kontrollen.', url: 'okta.com' },
        { name: 'Salesforce CRM', category: 'crm', rating: 'Premium Solution', desc: 'Umfassende Salesforce-Feldsynchronisierung und automatisierte KYB-Berichte.', url: 'salesforce.com' },
        { name: 'HubSpot', category: 'crm', rating: 'Featured App', desc: 'Status-Webhooks für Marketing und Customer Success sowie Kontaktsynchronisierung.', url: 'hubspot.com' },
        { name: 'Snowflake Data', category: 'database', rating: 'Certified Storage', desc: 'Sichere Compliance-Archivierung und Audit-Analytik mit hoher Leistung.', url: 'snowflake.com' },
        { name: 'LexisNexis', category: 'identity', rating: 'Strategic Partner', desc: 'Globale elektronische Datenbankprüfungen, Eigentumsregister und Sterbeindizes.', url: 'lexisnexis.com' },
        { name: 'Twilio Segment', category: 'crm', rating: 'Featured App', desc: 'Customer-Data-Platform-Events, Profilanreicherung und Zielgruppenaufbau.', url: 'segment.com' },
        { name: 'Plaid Financial', category: 'identity', rating: 'Premium Solution', desc: 'Sofortige Prüfung von Bankkontoinhaberschaft und Echtzeit-Kontostandsabfragen.', url: 'plaid.com' },
        { name: 'AWS Cloud Security', category: 'security', rating: 'Infrastructure Partner', desc: 'Hochverfügbare KMS-Umschlagverschlüsselung und GovCloud PrivateLink-Pipelines.', url: 'amazon.com' }
      ]
    },
    form: {
      title: 'Als Partner bewerben',
      desc: 'Erzählen Sie uns von Ihrer Unternehmensstruktur und Ihren Integrationsfähigkeiten, damit wir gemeinsam globale Vertrauensverbindungen schaffen.',
      contactName: 'Vollständiger Kontaktname *',
      contactPlaceholder: 'Max Mustermann',
      email: 'Geschäftliche E-Mail *',
      emailPlaceholder: 'max@firma.com',
      website: 'Website-URL des Unternehmens *',
      websitePlaceholder: 'https://firma.com',
      partnerType: 'Partnertyp',
      proposed: 'Vorgeschlagene Integration / gemeinsame Lösung',
      proposedPlaceholder: 'Beschreiben Sie, wie Ihr System mit Identra APIs, KYC oder benutzerdefinierten Sicherheitsprofilen verbunden würde...',
      consent: 'Ich stimme den Bedingungen des Identra Partnerprogramms zu und autorisiere Identra, Website-Domaininformationen zu prüfen.',
      submit: 'Partnerbewerbung absenden',
      submitting: 'Alliance-Credential-Checkliste wird veröffentlicht...',
      successTitle: 'Bewerbung eingereicht',
      successDescPrefix: 'Vielen Dank für Ihre Bewerbung. Ein Partner Manager prüft Ihre Einreichung und Website',
      successDescSuffix: 'innerhalb von 2 Werktagen.',
      recordTitle: 'Partnerbewerbungsdatensatz',
      partnerId: 'PARTNER_ID:',
      name: 'NAME:',
      domain: 'DOMAIN:',
      type: 'TYPE:',
      status: 'STATUS:',
      reviewPending: 'REVIEW_PENDING',
      submitAnother: 'Weitere Bewerbung senden',
      returnHome: 'Zur Startseite',
      typeOptions: [
        { value: 'technology', label: 'Technologieintegration (SaaS)' },
        { value: 'consultancy', label: 'Beratung & Systemintegrator' },
        { value: 'developer', label: 'Unabhängiger Entwickler' },
        { value: 'agency', label: 'Strategische Allianz / Agentur' }
      ],
      errors: {
        partnerName: 'Kontaktname ist erforderlich',
        email: 'Gültige geschäftliche E-Mail ist erforderlich',
        companyWebsite: 'Website-URL ist erforderlich',
        consent: 'Sie müssen den Programmbedingungen zustimmen'
      },
      logs: {
        system: '[SYSTEM] Partnerbewerbung für {name} wird geprüft...',
        compliance: '[COMPLIANCE] Domain wird geprüft: {domain}... OK',
        sla: '[SLA] Partnerschafts-SLA-Dokumente werden generiert...',
        router: '[AI-ROUTER] Bewerbung wird an das globale Partner-Alliances-Team geleitet...',
        success: '[SUCCESS] Bewerbung unter Partner ID registriert: {id}.'
      }
    }
  },
  vi: {
    backToPlatform: 'Quay lại nền tảng',
    badge: 'Chương trình đối tác Identra',
    heroTitle: 'Tốt hơn khi cùng nhau. Kết nối hệ thống của bạn.',
    heroDesc: 'Hợp tác cùng Identra để tích hợp, mở rộng và cung cấp giải pháp quản lý danh tính toàn cầu. Tận dụng các lớp bọc API mạnh mẽ và hooks động của chúng tôi.',
    heroChecks: ['Kết nối trực tiếp không cần mã', 'Kênh hỗ trợ SLA dùng chung'],
    stats: [
      { label: 'Plugin App Store', value: '45+', desc: 'Kết nối API đã chứng nhận' },
      { label: 'Chia sẻ giới thiệu đối tác', value: 'Tối đa 25%', desc: 'Chia thưởng khách hàng định kỳ' }
    ],
    simulator: {
      badge: 'Khu thử ứng dụng tương tác',
      title: 'Tích hợp App Store tương tác',
      descPrefix: 'Mô phỏng kết nối các giải pháp CRM, cơ sở dữ liệu và định danh bên ngoài với công cụ cấu hình trực tiếp. Nhấp',
      connectSyncQuoted: '"Kết nối đồng bộ"',
      descSuffix: 'trên bất kỳ đối tác nào bên dưới để xem trao đổi token API an toàn theo thời gian thực.',
      active: 'ĐANG HOẠT ĐỘNG',
      connecting: 'Đang kiểm tra khóa bảo mật...',
      disconnect: 'Ngắt kết nối hệ thống',
      connect: 'Kết nối đồng bộ',
      terminalTitle: 'Bộ định tuyến tích hợp trực tiếp',
      terminalStatus: 'SYS_OK',
      readyTitle: 'Sẵn sàng liên kết hệ thống',
      readyDesc: 'Nhấp "Kết nối đồng bộ" trên thẻ nền tảng để bắt đầu kiểm tra cấu hình tự động.',
      activePipes: 'Luồng đang hoạt động:',
      uptimeSla: 'SLA thời gian hoạt động:',
      logs: {
        api: '[API] Đang khởi tạo liên kết tích hợp cho {partner}...',
        oauth: '[OAUTH] Đang lấy thông tin xác thực client và token truy cập...',
        security: '[SECURITY] Đang trao đổi khóa JWT bảo mật với Gateway của {partner}...',
        webhook: '[WEBHOOK] Đang đăng ký endpoint callback: https://api.withidentra.com/v1/partners/{id}',
        schemas: '[SCHEMAS] Đang đồng bộ ánh xạ trường siêu dữ liệu tùy chỉnh...',
        test: '[TEST] Đang gửi ping kiểm tra sức khỏe ban đầu... THÀNH CÔNG (RTT: 48ms)',
        complete: '[COMPLETE] Kết nối tích hợp cho {partner} đã hoạt động.'
      }
    },
    categories: { all: 'Tất cả', identity: 'Định danh', crm: 'CRM', database: 'Dữ liệu', security: 'Bảo mật' },
    integrations: [
      { id: 'salesforce', name: 'Salesforce', category: 'crm', logo: 'SF', description: 'Làm giàu thông tin khách hàng tiềm năng và hồ sơ khách hàng bằng tín hiệu định danh tự động và tài liệu UBO ngay trong bố cục Salesforce CRM.', features: ['Làm giàu lead tự động', 'Ghi nhật ký trạng thái AML/trừng phạt', 'Đồng bộ tài liệu KYB'] },
      { id: 'okta', name: 'Okta Identity', category: 'security', logo: 'Okta', description: 'Liên kết thông tin xác thực nhân sự an toàn và kích hoạt MFA linh hoạt theo điểm rủi ro Identra theo thời gian thực.', features: ['Mức bảo đảm SSO', 'Khóa tài khoản theo rủi ro', 'Đồng bộ MFA selfie sinh trắc học'] },
      { id: 'hubspot', name: 'HubSpot', category: 'crm', logo: 'HS', description: 'Đồng bộ trạng thái vòng đời định danh và các mốc onboarding KYC trực tiếp vào trường liên hệ HubSpot theo thời gian thực.', features: ['Kích hoạt pipeline liên hệ', 'Thuộc tính tùy chỉnh trạng thái KYC', 'Thiết lập tích hợp không cần mã'] },
      { id: 'snowflake', name: 'Snowflake', category: 'database', logo: 'SFK', description: 'Lưu trữ an toàn hàng triệu nhật ký kiểm tra tuân thủ toàn cầu và siêu dữ liệu tài liệu trong Snowflake để kiểm toán phân tích nâng cao.', features: ['Lưu trữ hàng loạt được mã hóa', 'Pipeline đồng bộ liên tục', 'Chế độ xem phân tích tốc độ cao'] }
    ],
    calculator: {
      badge: 'Lợi ích chương trình',
      title: 'Máy tính thu nhập đối tác tương tác',
      desc: 'Chúng tôi thưởng xứng đáng cho đối tác liên minh chiến lược, đơn vị tư vấn và nhà phát triển. Di chuyển thanh trượt để dự báo số giới thiệu mỗi tháng và xem phần thưởng cấp độ ngay lập tức.',
      expectedReferrals: 'Số giới thiệu dự kiến',
      clientsPerMonth: 'khách hàng / tháng',
      minLabel: '1 KHÁCH HÀNG',
      midLabel: '30 KHÁCH HÀNG',
      maxLabel: '60+ PLATINUM',
      activeTier: 'Cấp dự báo đang hoạt động',
      activeStatus: 'Trạng thái hoạt động',
      revenueShare: 'Tỷ lệ chia sẻ doanh thu',
      marketingBudget: 'Ngân sách đồng tiếp thị',
      supportSla: 'Nâng cấp SLA hỗ trợ',
      note: 'Tính toán dựa trên điều khoản giấy phép trung bình hằng tháng.',
      apply: 'Đăng ký chương trình',
      tiers: [
        { max: 5, tier: 'Đại lý giới thiệu đã đăng ký', commission: 'Chia sẻ định kỳ 10%', support: 'Hàng đợi email tiêu chuẩn', mktgBudget: '500 USD co-op mỗi quý', badgeColor: 'bg-slate-100 text-slate-700' },
        { max: 20, tier: 'Silver Catalyst', commission: 'Chia sẻ định kỳ 15%', support: 'Phản hồi ưu tiên trong 2 giờ', mktgBudget: '2.500 USD co-op mỗi quý', badgeColor: 'bg-blue-50 text-[#354CE1]' },
        { max: 40, tier: 'Gold Strategic Partner', commission: 'Chia sẻ định kỳ 20%', support: 'Partner Manager chuyên trách', mktgBudget: '10.000 USD tài trợ đồng tiếp thị', badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100' },
        { max: 999, tier: 'Platinum Global Alliance', commission: 'Chia sẻ định kỳ 25%', support: 'Slack và hỗ trợ phản hồi tức thì', mktgBudget: '40.000 USD cho chiến dịch toàn cầu', badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-100' }
      ]
    },
    directory: {
      title: 'Mạng lưới đối tác đã chứng nhận',
      desc: 'Duyệt các connector cấu hình sẵn và nhà tích hợp hệ thống đã xác minh trên toàn cầu.',
      searchPlaceholder: 'Tìm trong danh bạ đối tác...',
      website: 'Trang web',
      emptyTitle: 'Không tìm thấy đối tác đã chứng nhận',
      emptyDesc: 'Hãy điều chỉnh bộ lọc hoặc nhập cụm tìm kiếm khác.',
      partners: [
        { name: 'Okta Identity', category: 'security', rating: 'Certified Catalyst', desc: 'Liên kết danh bạ nhân sự doanh nghiệp và điều khiển MFA có điều kiện an toàn.', url: 'okta.com' },
        { name: 'Salesforce CRM', category: 'crm', rating: 'Premium Solution', desc: 'Đồng bộ toàn diện trường Salesforce và báo cáo KYB tự động.', url: 'salesforce.com' },
        { name: 'HubSpot', category: 'crm', rating: 'Featured App', desc: 'Webhook trạng thái pipeline marketing và customer success, cùng đồng bộ liên hệ.', url: 'hubspot.com' },
        { name: 'Snowflake Data', category: 'database', rating: 'Certified Storage', desc: 'Lưu trữ tuân thủ bảo mật hiệu năng cao và lưới phân tích kiểm toán.', url: 'snowflake.com' },
        { name: 'LexisNexis', category: 'identity', rating: 'Strategic Partner', desc: 'Kiểm tra cơ sở dữ liệu điện tử toàn cầu, hồ sơ tài sản và chỉ mục khai tử.', url: 'lexisnexis.com' },
        { name: 'Twilio Segment', category: 'crm', rating: 'Featured App', desc: 'Sự kiện nền tảng dữ liệu khách hàng, làm giàu hồ sơ người dùng và tạo đối tượng.', url: 'segment.com' },
        { name: 'Plaid Financial', category: 'identity', rating: 'Premium Solution', desc: 'Xác minh tức thì quyền sở hữu tài khoản ngân hàng và truy vấn số dư thời gian thực.', url: 'plaid.com' },
        { name: 'AWS Cloud Security', category: 'security', rating: 'Infrastructure Partner', desc: 'Mã hóa phong bì KMS độ sẵn sàng cao và pipeline PrivateLink cho GovCloud.', url: 'amazon.com' }
      ]
    },
    form: {
      title: 'Đăng ký trở thành đối tác',
      desc: 'Hãy cho chúng tôi biết về cơ cấu doanh nghiệp, năng lực tích hợp và cùng xây dựng các điểm kết nối tin cậy toàn cầu tức thì.',
      contactName: 'Họ tên người liên hệ *',
      contactPlaceholder: 'Nguyễn Văn A',
      email: 'Email công việc *',
      emailPlaceholder: 'ten@congty.com',
      website: 'URL trang web công ty *',
      websitePlaceholder: 'https://congty.com',
      partnerType: 'Loại đối tác',
      proposed: 'Tích hợp đề xuất / giải pháp chung',
      proposedPlaceholder: 'Mô tả hệ thống của bạn sẽ kết nối với Identra APIs, KYC hoặc hồ sơ bảo mật tùy chỉnh như thế nào...',
      consent: 'Tôi đồng ý với Điều khoản Chương trình Đối tác Identra và cho phép Identra xem xét thông tin tên miền trang web.',
      submit: 'Gửi hồ sơ đối tác',
      submitting: 'Đang xuất bản checklist thông tin xác thực liên minh...',
      successTitle: 'Đã gửi hồ sơ',
      successDescPrefix: 'Cảm ơn bạn đã đăng ký. Partner Manager sẽ xem xét hồ sơ và trang web',
      successDescSuffix: 'trong vòng 2 ngày làm việc.',
      recordTitle: 'Bản ghi hồ sơ đối tác',
      partnerId: 'PARTNER_ID:',
      name: 'TÊN:',
      domain: 'TÊN MIỀN:',
      type: 'LOẠI:',
      status: 'TRẠNG THÁI:',
      reviewPending: 'ĐANG_CHỜ_XÉT_DUYỆT',
      submitAnother: 'Gửi hồ sơ khác',
      returnHome: 'Quay lại trang chủ',
      typeOptions: [
        { value: 'technology', label: 'Tích hợp công nghệ (SaaS)' },
        { value: 'consultancy', label: 'Tư vấn & tích hợp hệ thống' },
        { value: 'developer', label: 'Nhà phát triển độc lập' },
        { value: 'agency', label: 'Liên minh chiến lược / agency' }
      ],
      errors: {
        partnerName: 'Vui lòng nhập tên người liên hệ',
        email: 'Vui lòng nhập email công việc hợp lệ',
        companyWebsite: 'Vui lòng nhập URL trang web',
        consent: 'Bạn phải đồng ý với điều khoản chương trình'
      },
      logs: {
        system: '[SYSTEM] Đang xem xét hồ sơ đối tác cho {name}...',
        compliance: '[COMPLIANCE] Đang kiểm tra tên miền: {domain}... OK',
        sla: '[SLA] Đang tạo tài liệu thỏa thuận SLA đối tác...',
        router: '[AI-ROUTER] Đang chuyển hồ sơ đến đội liên minh đối tác toàn cầu...',
        success: '[SUCCESS] Hồ sơ đã được đăng ký với Partner ID: {id}.'
      }
    }
  }
} as const;
