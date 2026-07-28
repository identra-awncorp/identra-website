/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../types/routes';
import type {
  PlatformJourneyStageId,
  PlatformProductId,
} from '../types/platformProducts';

export const PLATFORM_FOUNDATION_IDS = [
  'noCode',
  'integration',
  'privacy',
  'audit',
] as const;

export type PlatformFoundationId = typeof PLATFORM_FOUNDATION_IDS[number];

export const PLATFORM_FAQ_IDS = [
  'selection',
  'flowDifference',
  'sharedData',
  'integration',
] as const;

export type PlatformFaqId = typeof PLATFORM_FAQ_IDS[number];

type ProductCopy = {
  readonly title: string;
  readonly description: string;
};

type StageCopy = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly previewTitle: string;
  readonly previewDescription: string;
};

type FoundationCopy = {
  readonly title: string;
  readonly description: string;
};

type FaqCopy = {
  readonly question: string;
  readonly answer: string;
};

export type PlatformPageCopy = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly capabilitiesLabel: string;
    readonly capabilities: readonly [string, string, string];
    readonly architectureTitle: string;
    readonly architectureDescription: string;
    readonly architectureAriaLabel: string;
    readonly stageLinkLabel: string;
  };
  readonly journey: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
  };
  readonly stages: Record<PlatformJourneyStageId, StageCopy>;
  readonly products: Record<PlatformProductId, ProductCopy>;
  readonly common: {
    readonly productCta: string;
    readonly docsCta: string;
    readonly previewReady: string;
    readonly previewLive: string;
  };
  readonly visuals: {
    readonly collect: {
      readonly workspace: string;
      readonly draft: string;
      readonly start: string;
      readonly credential: string;
      readonly risk: string;
      readonly approve: string;
      readonly stepUp: string;
    };
    readonly orchestrate: {
      readonly workspace: string;
      readonly running: string;
      readonly rule: string;
      readonly ruleValue: string;
      readonly caseQueue: string;
      readonly copilot: string;
      readonly approved: string;
      readonly review: string;
    };
    readonly analyze: {
      readonly workspace: string;
      readonly monitoring: string;
      readonly device: string;
      readonly network: string;
      readonly behavior: string;
      readonly graph: string;
      readonly linked: string;
      readonly blocked: string;
    };
    readonly extend: {
      readonly workspace: string;
      readonly connected: string;
      readonly apiEvent: string;
      readonly webhook: string;
      readonly documentation: string;
      readonly marketplace: string;
    };
  };
  readonly foundations: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<PlatformFoundationId, FoundationCopy>;
    readonly securityCta: string;
    readonly documentationCta: string;
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly contactCta: string;
    readonly items: Record<PlatformFaqId, FaqCopy>;
  };
};

const en: PlatformPageCopy = {
  hero: {
    eyebrow: 'IDENTRA PLATFORM',
    title: 'Identra Platform',
    description: 'Bring identity collection, verification, decision automation, manual review, and fraud intelligence into one connected operating system. Start with the capability you need and expand without rebuilding the customer journey.',
    primaryCta: 'Explore the platform',
    secondaryCta: 'Try the demo',
    capabilitiesLabel: 'One platform for the full trust lifecycle',
    capabilities: [
      'People and business verification',
      'No-code, SDK, and API deployment',
      'Continuous risk decisions',
    ],
    architectureTitle: 'Platform journey',
    architectureDescription: 'Each layer connects to a dedicated product experience.',
    architectureAriaLabel: 'Navigate the four stages of the Identra platform',
    stageLinkLabel: 'View stage',
  },
  journey: {
    eyebrow: 'CONNECTED BY DESIGN',
    title: 'Choose a starting point. Keep the whole system connected.',
    description: 'Identra products share the same identity context, risk signals, and decision history. Teams can adopt one capability today and add the next as their verification program grows.',
  },
  stages: {
    collect: {
      eyebrow: '01 / EXPERIENCE',
      title: 'Design, collect, and share',
      description: 'Create a clear verification experience, adapt it to live risk, and let verified customers reuse trusted credentials with less repeated data collection.',
      previewTitle: 'Adaptive verification journey',
      previewDescription: 'A lightweight view of how collection steps and risk branches stay connected.',
    },
    orchestrate: {
      eyebrow: '02 / OPERATIONS',
      title: 'Orchestrate and operate',
      description: 'Turn checks and signals into consistent decisions. Automate the routine path, give reviewers complete context, and use AI guidance where judgment is required.',
      previewTitle: 'Decision operations',
      previewDescription: 'Rules, review queues, and guided decisions in one operational trace.',
    },
    analyze: {
      eyebrow: '03 / INTELLIGENCE',
      title: 'Analyze and prevent',
      description: 'Observe device, network, and behavioral risk without adding friction, then connect related accounts to uncover coordinated fraud.',
      previewTitle: 'Risk intelligence',
      previewDescription: 'Passive telemetry and relationship analysis reveal patterns that isolated checks miss.',
    },
    extend: {
      eyebrow: '04 / ECOSYSTEM',
      title: 'Connect and extend',
      description: 'Bring the tools your teams already use into Identra. Trigger actions, exchange decision data, and expand the platform through supported integrations.',
      previewTitle: 'Integration workspace',
      previewDescription: 'Connected services receive the same structured decision events.',
    },
  },
  products: {
    flowEditor: {
      title: 'Flow Editor',
      description: 'Design branded verification journeys with a visual no-code builder and preview every screen before publishing.',
    },
    dynamicFlow: {
      title: 'Dynamic Flow',
      description: 'Adapt verification steps in real time so trusted users move quickly while higher-risk sessions receive additional checks.',
    },
    relay: {
      title: 'Relay',
      description: 'Let customers reuse verified credentials and disclose only the information needed for each new verification.',
    },
    workflows: {
      title: 'Workflows',
      description: 'Coordinate checks, rules, webhooks, and follow-up actions across the complete identity lifecycle.',
    },
    caseManagement: {
      title: 'Case Management',
      description: 'Give reviewers one place to inspect evidence, manage queues, record decisions, and resolve exceptions.',
    },
    copilot: {
      title: 'Copilot',
      description: 'Support risk teams with contextual AI guidance that explains signals and recommends the next action.',
    },
    passiveSignals: {
      title: 'Passive Signals',
      description: 'Collect device, network, and behavioral telemetry in the background to detect risk without interrupting good users.',
    },
    graph: {
      title: 'Graph',
      description: 'Map shared devices, IP addresses, contact details, and accounts to reveal coordinated fraud networks.',
    },
    marketplace: {
      title: 'Identra Marketplace',
      description: 'Connect Identra with data providers and operational tools so identity decisions can trigger work across your stack.',
    },
  },
  common: {
    productCta: 'Explore product',
    docsCta: 'Read integration docs',
    previewReady: 'Ready',
    previewLive: 'Live',
  },
  visuals: {
    collect: {
      workspace: 'Flow workspace',
      draft: 'Draft ready',
      start: 'Welcome and consent',
      credential: 'Credential verification',
      risk: 'Risk-based branch',
      approve: 'Fast approval',
      stepUp: 'Additional verification',
    },
    orchestrate: {
      workspace: 'Decision trace',
      running: 'Policy active',
      rule: 'Matched rule',
      ruleValue: 'risk.score >= 70',
      caseQueue: 'Manual review queue',
      copilot: 'Copilot recommendation',
      approved: 'Approve',
      review: 'Review',
    },
    analyze: {
      workspace: 'Risk monitor',
      monitoring: 'Monitoring',
      device: 'Device trust',
      network: 'Network reputation',
      behavior: 'Behavior pattern',
      graph: 'Linked accounts',
      linked: '3 relationships found',
      blocked: 'Coordinated pattern blocked',
    },
    extend: {
      workspace: 'Integration event',
      connected: 'Connected',
      apiEvent: 'Decision API',
      webhook: 'Webhook delivered',
      documentation: 'Developer docs',
      marketplace: 'Marketplace apps',
    },
  },
  foundations: {
    eyebrow: 'PLATFORM FOUNDATIONS',
    title: 'Built to work across product, engineering, risk, and compliance.',
    description: 'Every product uses the same platform foundations, so teams can collaborate without duplicating configuration, evidence, or decision history.',
    items: {
      noCode: {
        title: 'No-code where speed matters',
        description: 'Let product and operations teams update journeys and policies without waiting for a release cycle.',
      },
      integration: {
        title: 'SDK and API when control matters',
        description: 'Embed verification in web or mobile products and connect decisions to backend services.',
      },
      privacy: {
        title: 'Privacy by design',
        description: 'Minimize disclosure, apply granular access controls, and keep sensitive identity data protected.',
      },
      audit: {
        title: 'One auditable history',
        description: 'Keep checks, signals, rules, reviewer actions, and outcomes in a consistent decision record.',
      },
    },
    securityCta: 'Explore security',
    documentationCta: 'Open developer docs',
  },
  faq: {
    eyebrow: 'PLATFORM FAQ',
    title: 'Find the right place to begin.',
    description: 'A few practical distinctions make it easier to choose the first Identra product for your team.',
    contactCta: 'Talk to an expert',
    items: {
      selection: {
        question: 'Which Identra product should we start with?',
        answer: 'Start with the problem closest to your current workflow. Use Flow Editor for the customer-facing journey, Workflows for backend decision automation, Passive Signals or Graph for fraud intelligence, and Case Management when reviewers need a shared investigation workspace.',
      },
      flowDifference: {
        question: 'How are Flow Editor and Dynamic Flow different?',
        answer: 'Flow Editor is the visual workspace used to design screens, collection steps, and branding. Dynamic Flow is the runtime capability that changes the path according to identity context and live risk.',
      },
      sharedData: {
        question: 'Do products share signals and decision history?',
        answer: 'Yes. The platform is designed around a shared identity context. Verification results, passive signals, workflow outcomes, and reviewer actions can be used across the connected products you enable.',
      },
      integration: {
        question: 'Can we integrate gradually?',
        answer: 'Yes. Teams can begin with a hosted or no-code experience, then add SDK, API, webhook, marketplace, and operational integrations as their requirements mature.',
      },
    },
  },
};

const es: PlatformPageCopy = {
  hero: {
    eyebrow: 'PLATAFORMA IDENTRA',
    title: 'Plataforma Identra',
    description: 'Reúna la recopilación y verificación de identidad, la automatización de decisiones, la revisión manual y la inteligencia contra el fraude en un único sistema conectado. Empiece con la capacidad que necesita y amplíe sin reconstruir la experiencia del cliente.',
    primaryCta: 'Explorar la plataforma',
    secondaryCta: 'Probar la demo',
    capabilitiesLabel: 'Una plataforma para todo el ciclo de confianza',
    capabilities: [
      'Verificación de personas y empresas',
      'Implementación no-code, SDK y API',
      'Decisiones de riesgo continuas',
    ],
    architectureTitle: 'Recorrido de la plataforma',
    architectureDescription: 'Cada etapa conecta con una experiencia de producto dedicada.',
    architectureAriaLabel: 'Navegar por las cuatro etapas de la plataforma Identra',
    stageLinkLabel: 'Ver etapa',
  },
  journey: {
    eyebrow: 'CONECTADA DESDE EL DISEÑO',
    title: 'Elija un punto de partida y mantenga conectado todo el sistema.',
    description: 'Los productos Identra comparten el mismo contexto de identidad, las señales de riesgo y el historial de decisiones. Puede adoptar una capacidad hoy y añadir las siguientes a medida que crece su programa.',
  },
  stages: {
    collect: {
      eyebrow: '01 / EXPERIENCIA',
      title: 'Diseñar, recopilar y compartir',
      description: 'Cree una experiencia de verificación clara, adáptela al riesgo en tiempo real y permita reutilizar credenciales confiables sin recopilar los mismos datos una y otra vez.',
      previewTitle: 'Recorrido de verificación adaptable',
      previewDescription: 'Una vista ligera de cómo permanecen conectados los pasos de recopilación y las ramas de riesgo.',
    },
    orchestrate: {
      eyebrow: '02 / OPERACIONES',
      title: 'Orquestar y operar',
      description: 'Convierta comprobaciones y señales en decisiones coherentes. Automatice la ruta habitual y entregue todo el contexto a revisores y agentes de IA.',
      previewTitle: 'Operaciones de decisión',
      previewDescription: 'Reglas, colas de revisión y decisiones asistidas en un mismo registro operativo.',
    },
    analyze: {
      eyebrow: '03 / INTELIGENCIA',
      title: 'Analizar y prevenir',
      description: 'Observe el riesgo de dispositivo, red y comportamiento sin añadir fricción y conecte cuentas relacionadas para descubrir fraude coordinado.',
      previewTitle: 'Inteligencia de riesgo',
      previewDescription: 'La telemetría pasiva y el análisis de relaciones revelan patrones que las comprobaciones aisladas no detectan.',
    },
    extend: {
      eyebrow: '04 / ECOSISTEMA',
      title: 'Conectar y ampliar',
      description: 'Incorpore a Identra las herramientas que sus equipos ya utilizan. Active acciones e intercambie datos de decisión mediante integraciones compatibles.',
      previewTitle: 'Espacio de integraciones',
      previewDescription: 'Los servicios conectados reciben los mismos eventos de decisión estructurados.',
    },
  },
  products: {
    flowEditor: {
      title: 'Flow Editor',
      description: 'Diseñe recorridos de verificación con su marca mediante un editor visual no-code y revise cada pantalla antes de publicar.',
    },
    dynamicFlow: {
      title: 'Dynamic Flow',
      description: 'Adapte los pasos en tiempo real para que los usuarios confiables avancen rápido y las sesiones de riesgo reciban controles adicionales.',
    },
    relay: {
      title: 'Relay',
      description: 'Permita reutilizar credenciales verificadas y compartir solo la información necesaria para cada nueva verificación.',
    },
    workflows: {
      title: 'Workflows',
      description: 'Coordine comprobaciones, reglas, webhooks y acciones de seguimiento en todo el ciclo de identidad.',
    },
    caseManagement: {
      title: 'Gestión de casos',
      description: 'Ofrezca a los revisores un único lugar para examinar pruebas, gestionar colas y resolver excepciones.',
    },
    copilot: {
      title: 'Copilot',
      description: 'Ayude a los equipos de riesgo con orientación de IA contextual que explica las señales y recomienda la siguiente acción.',
    },
    passiveSignals: {
      title: 'Señales pasivas',
      description: 'Recopile telemetría de dispositivo, red y comportamiento en segundo plano sin interrumpir a los usuarios legítimos.',
    },
    graph: {
      title: 'Graph',
      description: 'Relacione dispositivos, IP, datos de contacto y cuentas compartidas para revelar redes de fraude coordinado.',
    },
    marketplace: {
      title: 'Identra Marketplace',
      description: 'Conecte Identra con proveedores de datos y herramientas operativas para activar trabajo en todo su ecosistema.',
    },
  },
  common: {
    productCta: 'Explorar producto',
    docsCta: 'Leer documentación',
    previewReady: 'Listo',
    previewLive: 'En vivo',
  },
  visuals: {
    collect: {
      workspace: 'Espacio de flujos',
      draft: 'Borrador listo',
      start: 'Bienvenida y consentimiento',
      credential: 'Verificación de credencial',
      risk: 'Rama según riesgo',
      approve: 'Aprobación rápida',
      stepUp: 'Verificación adicional',
    },
    orchestrate: {
      workspace: 'Registro de decisión',
      running: 'Política activa',
      rule: 'Regla coincidente',
      ruleValue: 'risk.score >= 70',
      caseQueue: 'Cola de revisión manual',
      copilot: 'Recomendación de Copilot',
      approved: 'Aprobar',
      review: 'Revisar',
    },
    analyze: {
      workspace: 'Monitor de riesgo',
      monitoring: 'Supervisando',
      device: 'Confianza del dispositivo',
      network: 'Reputación de red',
      behavior: 'Patrón de comportamiento',
      graph: 'Cuentas relacionadas',
      linked: '3 relaciones encontradas',
      blocked: 'Patrón coordinado bloqueado',
    },
    extend: {
      workspace: 'Evento de integración',
      connected: 'Conectado',
      apiEvent: 'API de decisiones',
      webhook: 'Webhook entregado',
      documentation: 'Documentación técnica',
      marketplace: 'Aplicaciones del Marketplace',
    },
  },
  foundations: {
    eyebrow: 'BASES DE LA PLATAFORMA',
    title: 'Diseñada para producto, ingeniería, riesgo y cumplimiento.',
    description: 'Todos los productos utilizan las mismas bases para que los equipos colaboren sin duplicar configuración, pruebas ni historial de decisiones.',
    items: {
      noCode: {
        title: 'No-code cuando importa la velocidad',
        description: 'Permita que producto y operaciones actualicen recorridos y políticas sin esperar un ciclo de lanzamiento.',
      },
      integration: {
        title: 'SDK y API cuando importa el control',
        description: 'Integre la verificación en productos web o móviles y conecte decisiones con servicios backend.',
      },
      privacy: {
        title: 'Privacidad desde el diseño',
        description: 'Minimice la divulgación, aplique controles de acceso detallados y proteja los datos sensibles.',
      },
      audit: {
        title: 'Un historial auditable',
        description: 'Mantenga comprobaciones, señales, reglas, acciones del revisor y resultados en un registro coherente.',
      },
    },
    securityCta: 'Explorar seguridad',
    documentationCta: 'Abrir documentación técnica',
  },
  faq: {
    eyebrow: 'PREGUNTAS SOBRE LA PLATAFORMA',
    title: 'Encuentre el mejor punto de partida.',
    description: 'Estas diferencias prácticas ayudan a elegir el primer producto Identra para su equipo.',
    contactCta: 'Hablar con un experto',
    items: {
      selection: {
        question: '¿Con qué producto Identra deberíamos empezar?',
        answer: 'Empiece por el problema más cercano a su proceso actual. Use Flow Editor para la experiencia del cliente, Workflows para automatizar decisiones, Señales pasivas o Graph para inteligencia de fraude y Gestión de casos para la investigación manual.',
      },
      flowDifference: {
        question: '¿En qué se diferencian Flow Editor y Dynamic Flow?',
        answer: 'Flow Editor es el espacio visual para diseñar pantallas, pasos y marca. Dynamic Flow es la capacidad de ejecución que modifica el recorrido según el contexto de identidad y el riesgo en tiempo real.',
      },
      sharedData: {
        question: '¿Los productos comparten señales e historial?',
        answer: 'Sí. Los resultados de verificación, las señales pasivas, los resultados de workflows y las acciones de revisión pueden utilizarse en todos los productos conectados que active.',
      },
      integration: {
        question: '¿Podemos integrar la plataforma por etapas?',
        answer: 'Sí. Puede comenzar con una experiencia alojada o no-code y añadir SDK, API, webhooks, Marketplace e integraciones operativas a medida que evolucionan sus necesidades.',
      },
    },
  },
};

const ja: PlatformPageCopy = {
  hero: {
    eyebrow: 'IDENTRA プラットフォーム',
    title: 'Identra プラットフォーム',
    description: '本人確認情報の収集、検証、意思決定の自動化、手動審査、不正対策インテリジェンスを、ひとつの連携基盤に統合します。必要な機能から導入し、顧客体験を作り直すことなく拡張できます。',
    primaryCta: 'プラットフォームを見る',
    secondaryCta: 'デモを試す',
    capabilitiesLabel: '信頼のライフサイクル全体を支える基盤',
    capabilities: [
      '個人と法人の確認',
      'ノーコード、SDK、API による導入',
      '継続的なリスク判断',
    ],
    architectureTitle: 'プラットフォームの流れ',
    architectureDescription: '各段階から専用の製品体験へ移動できます。',
    architectureAriaLabel: 'Identra プラットフォームの4段階を移動',
    stageLinkLabel: '段階を見る',
  },
  journey: {
    eyebrow: 'つながることを前提に設計',
    title: '必要な機能から始め、システム全体をつなげる。',
    description: 'Identra 製品は、本人確認コンテキスト、リスクシグナル、意思決定履歴を共有します。現在必要な機能を導入し、プログラムの成長に合わせて段階的に追加できます。',
  },
  stages: {
    collect: {
      eyebrow: '01 / 体験設計',
      title: '設計、収集、共有',
      description: '分かりやすい本人確認体験を設計し、リアルタイムのリスクに応じて調整します。確認済みの利用者は、同じ情報を何度も提出せずに実証情報を再利用できます。',
      previewTitle: '適応型の本人確認ジャーニー',
      previewDescription: '情報収集の各ステップとリスク分岐がどのようにつながるかを示します。',
    },
    orchestrate: {
      eyebrow: '02 / 運用',
      title: '統合制御と運用',
      description: '確認結果とシグナルを一貫した判断につなげます。定型処理を自動化し、審査担当者には十分な情報と AI の支援を提供します。',
      previewTitle: '意思決定オペレーション',
      previewDescription: 'ルール、審査キュー、支援付き判断をひとつの運用履歴にまとめます。',
    },
    analyze: {
      eyebrow: '03 / インテリジェンス',
      title: '分析と防止',
      description: '正規利用者に負担をかけず、端末、ネットワーク、行動のリスクを把握します。関連アカウントを結び付け、組織的な不正を発見します。',
      previewTitle: 'リスクインテリジェンス',
      previewDescription: 'パッシブテレメトリと関係分析により、個別確認だけでは見えないパターンを把握します。',
    },
    extend: {
      eyebrow: '04 / エコシステム',
      title: '接続と拡張',
      description: '既存の業務ツールを Identra に接続します。対応する連携を通じて、アクションの実行や判断データの交換ができます。',
      previewTitle: '連携ワークスペース',
      previewDescription: '接続されたサービスへ、同じ構造化された判断イベントを配信します。',
    },
  },
  products: {
    flowEditor: {
      title: 'Flow Editor',
      description: '視覚的なノーコードエディターでブランドに合う本人確認フローを設計し、公開前に各画面を確認できます。',
    },
    dynamicFlow: {
      title: 'Dynamic Flow',
      description: '信頼度の高い利用者は素早く通過させ、リスクの高いセッションには追加確認を求めるよう、経路をリアルタイムで調整します。',
    },
    relay: {
      title: 'Relay',
      description: '確認済みの実証情報を再利用し、新しい確認先には必要な情報だけを安全に共有できます。',
    },
    workflows: {
      title: 'Workflows',
      description: '本人確認のライフサイクル全体で、確認、ルール、Webhook、フォローアップを連携させます。',
    },
    caseManagement: {
      title: 'ケース管理',
      description: '証拠確認、キュー管理、判断記録、例外対応を、審査担当者向けのひとつの画面に集約します。',
    },
    copilot: {
      title: 'Copilot',
      description: 'シグナルの意味を説明し、次の対応を提案する文脈対応型 AI でリスクチームを支援します。',
    },
    passiveSignals: {
      title: 'パッシブシグナル',
      description: '正規利用者の操作を妨げず、端末、ネットワーク、行動のテレメトリをバックグラウンドで収集します。',
    },
    graph: {
      title: 'Graph',
      description: '共有端末、IP、連絡先、アカウントの関係を可視化し、組織的な不正ネットワークを発見します。',
    },
    marketplace: {
      title: 'Identra Marketplace',
      description: 'データ提供元や業務ツールと Identra を接続し、本人確認の判断を既存の業務へ反映します。',
    },
  },
  common: {
    productCta: '製品を見る',
    docsCta: '連携ドキュメントを見る',
    previewReady: '準備完了',
    previewLive: '稼働中',
  },
  visuals: {
    collect: {
      workspace: 'フローワークスペース',
      draft: '下書き準備完了',
      start: '案内と同意',
      credential: '実証情報の確認',
      risk: 'リスクによる分岐',
      approve: '迅速な承認',
      stepUp: '追加確認',
    },
    orchestrate: {
      workspace: '意思決定履歴',
      running: 'ポリシー稼働中',
      rule: '一致したルール',
      ruleValue: 'risk.score >= 70',
      caseQueue: '手動審査キュー',
      copilot: 'Copilot の提案',
      approved: '承認',
      review: '審査',
    },
    analyze: {
      workspace: 'リスクモニター',
      monitoring: '監視中',
      device: '端末の信頼度',
      network: 'ネットワーク評価',
      behavior: '行動パターン',
      graph: '関連アカウント',
      linked: '3件の関係を検出',
      blocked: '組織的なパターンを遮断',
    },
    extend: {
      workspace: '連携イベント',
      connected: '接続済み',
      apiEvent: '意思決定 API',
      webhook: 'Webhook 配信済み',
      documentation: '開発者ドキュメント',
      marketplace: 'Marketplace アプリ',
    },
  },
  foundations: {
    eyebrow: 'プラットフォーム基盤',
    title: '製品、開発、リスク、コンプライアンスの連携を支える設計。',
    description: 'すべての製品が同じ基盤を使うため、設定、証拠、意思決定履歴を重複させずにチーム間で連携できます。',
    items: {
      noCode: {
        title: '速さが必要な場面ではノーコード',
        description: '製品・運用チームがリリースを待たずにフローやポリシーを更新できます。',
      },
      integration: {
        title: '制御が必要な場面では SDK と API',
        description: 'Web やモバイルへ本人確認を組み込み、判断結果をバックエンドサービスへ接続します。',
      },
      privacy: {
        title: 'プライバシーを前提に設計',
        description: '開示を最小限に抑え、きめ細かなアクセス制御で機密性の高い本人確認情報を守ります。',
      },
      audit: {
        title: '監査可能な一貫した履歴',
        description: '確認、シグナル、ルール、審査操作、結果をひとつの判断記録として保持します。',
      },
    },
    securityCta: 'セキュリティを見る',
    documentationCta: '開発者ドキュメントを開く',
  },
  faq: {
    eyebrow: 'プラットフォーム FAQ',
    title: '最適な出発点を見つける。',
    description: '各製品の役割を理解すると、チームに必要な最初の機能を選びやすくなります。',
    contactCta: '専門担当者に相談',
    items: {
      selection: {
        question: 'どの Identra 製品から始めるべきですか？',
        answer: '現在の課題に最も近い製品から始めてください。顧客向け体験には Flow Editor、バックエンドの判断自動化には Workflows、不正分析にはパッシブシグナルまたは Graph、手動調査にはケース管理が適しています。',
      },
      flowDifference: {
        question: 'Flow Editor と Dynamic Flow の違いは何ですか？',
        answer: 'Flow Editor は画面、収集ステップ、ブランド表現を設計する視覚的な作業領域です。Dynamic Flow は本人確認コンテキストとリアルタイムのリスクに応じて経路を変える実行機能です。',
      },
      sharedData: {
        question: '製品間でシグナルと判断履歴を共有できますか？',
        answer: 'はい。確認結果、パッシブシグナル、Workflows の結果、審査操作は、有効化した各製品で共有して利用できます。',
      },
      integration: {
        question: '段階的に連携できますか？',
        answer: 'はい。ホスト型またはノーコードの体験から開始し、要件に応じて SDK、API、Webhook、Marketplace、業務連携を追加できます。',
      },
    },
  },
};

const de: PlatformPageCopy = {
  hero: {
    eyebrow: 'IDENTRA PLATTFORM',
    title: 'Identra Plattform',
    description: 'Verbinden Sie Identitätserfassung, Verifizierung, automatisierte Entscheidungen, manuelle Prüfung und Betrugsanalyse in einem gemeinsamen Betriebssystem. Starten Sie mit der benötigten Funktion und erweitern Sie, ohne die Customer Journey neu aufzubauen.',
    primaryCta: 'Plattform entdecken',
    secondaryCta: 'Demo testen',
    capabilitiesLabel: 'Eine Plattform für den gesamten Vertrauenszyklus',
    capabilities: [
      'Verifizierung von Personen und Unternehmen',
      'Bereitstellung per No-Code, SDK und API',
      'Kontinuierliche Risikoentscheidungen',
    ],
    architectureTitle: 'Plattformablauf',
    architectureDescription: 'Jede Phase führt zu einem eigenen Produkterlebnis.',
    architectureAriaLabel: 'Durch die vier Phasen der Identra Plattform navigieren',
    stageLinkLabel: 'Phase ansehen',
  },
  journey: {
    eyebrow: 'VON GRUND AUF VERBUNDEN',
    title: 'Wählen Sie einen Einstieg und halten Sie das gesamte System verbunden.',
    description: 'Identra Produkte teilen denselben Identitätskontext, dieselben Risikosignale und dieselbe Entscheidungshistorie. Beginnen Sie heute mit einer Funktion und erweitern Sie mit Ihrem Programm.',
  },
  stages: {
    collect: {
      eyebrow: '01 / ERLEBNIS',
      title: 'Gestalten, erfassen und teilen',
      description: 'Erstellen Sie eine klare Verifizierung, passen Sie sie an Live-Risiken an und lassen Sie bestätigte Kunden vertrauenswürdige Nachweise wiederverwenden.',
      previewTitle: 'Adaptive Verifizierungsreise',
      previewDescription: 'Eine kompakte Ansicht verbundener Erfassungsschritte und Risikoverzweigungen.',
    },
    orchestrate: {
      eyebrow: '02 / BETRIEB',
      title: 'Orchestrieren und betreiben',
      description: 'Überführen Sie Prüfungen und Signale in konsistente Entscheidungen. Automatisieren Sie Routinefälle und geben Sie Prüfern sowie KI-Agenten den vollständigen Kontext.',
      previewTitle: 'Entscheidungsbetrieb',
      previewDescription: 'Regeln, Prüfwarteschlangen und unterstützte Entscheidungen in einer operativen Spur.',
    },
    analyze: {
      eyebrow: '03 / INTELLIGENZ',
      title: 'Analysieren und verhindern',
      description: 'Erkennen Sie Geräte-, Netzwerk- und Verhaltensrisiken ohne zusätzliche Reibung und verbinden Sie Konten, um koordinierten Betrug aufzudecken.',
      previewTitle: 'Risiko-Intelligenz',
      previewDescription: 'Passive Telemetrie und Beziehungsanalyse zeigen Muster, die einzelne Prüfungen übersehen.',
    },
    extend: {
      eyebrow: '04 / ÖKOSYSTEM',
      title: 'Verbinden und erweitern',
      description: 'Binden Sie die bereits genutzten Werkzeuge an Identra an. Lösen Sie Aktionen aus und tauschen Sie Entscheidungsdaten über unterstützte Integrationen aus.',
      previewTitle: 'Integrationsbereich',
      previewDescription: 'Verbundene Dienste erhalten dieselben strukturierten Entscheidungsereignisse.',
    },
  },
  products: {
    flowEditor: {
      title: 'Flow Editor',
      description: 'Gestalten Sie markengerechte Verifizierungsreisen mit einem visuellen No-Code-Editor und prüfen Sie jeden Bildschirm vor der Veröffentlichung.',
    },
    dynamicFlow: {
      title: 'Dynamic Flow',
      description: 'Passen Sie Schritte in Echtzeit an, damit vertrauenswürdige Nutzer schnell vorankommen und riskante Sitzungen zusätzliche Prüfungen erhalten.',
    },
    relay: {
      title: 'Relay',
      description: 'Lassen Sie bestätigte Nachweise wiederverwenden und für jede neue Prüfung nur die erforderlichen Informationen offenlegen.',
    },
    workflows: {
      title: 'Workflows',
      description: 'Koordinieren Sie Prüfungen, Regeln, Webhooks und Folgeaktionen über den gesamten Identitätszyklus.',
    },
    caseManagement: {
      title: 'Fallmanagement',
      description: 'Bündeln Sie Beweise, Warteschlangen, Entscheidungen und Ausnahmen in einem gemeinsamen Arbeitsbereich für Prüfer.',
    },
    copilot: {
      title: 'Copilot',
      description: 'Unterstützen Sie Risikoteams mit kontextbezogener KI, die Signale erklärt und den nächsten Schritt empfiehlt.',
    },
    passiveSignals: {
      title: 'Passive Signale',
      description: 'Erfassen Sie Geräte-, Netzwerk- und Verhaltenstelemetrie im Hintergrund, ohne gute Nutzer zu unterbrechen.',
    },
    graph: {
      title: 'Graph',
      description: 'Verknüpfen Sie gemeinsame Geräte, IP-Adressen, Kontaktdaten und Konten, um koordinierte Betrugsnetzwerke aufzudecken.',
    },
    marketplace: {
      title: 'Identra Marketplace',
      description: 'Verbinden Sie Identra mit Datenanbietern und Betriebswerkzeugen, damit Entscheidungen Arbeit im gesamten System auslösen.',
    },
  },
  common: {
    productCta: 'Produkt entdecken',
    docsCta: 'Integrationsdokumentation lesen',
    previewReady: 'Bereit',
    previewLive: 'Live',
  },
  visuals: {
    collect: {
      workspace: 'Flow-Arbeitsbereich',
      draft: 'Entwurf bereit',
      start: 'Begrüßung und Einwilligung',
      credential: 'Nachweisprüfung',
      risk: 'Risikobasierte Verzweigung',
      approve: 'Schnelle Freigabe',
      stepUp: 'Zusätzliche Verifizierung',
    },
    orchestrate: {
      workspace: 'Entscheidungsspur',
      running: 'Richtlinie aktiv',
      rule: 'Passende Regel',
      ruleValue: 'risk.score >= 70',
      caseQueue: 'Manuelle Prüfwarteschlange',
      copilot: 'Copilot-Empfehlung',
      approved: 'Freigeben',
      review: 'Prüfen',
    },
    analyze: {
      workspace: 'Risikomonitor',
      monitoring: 'Überwachung',
      device: 'Gerätevertrauen',
      network: 'Netzwerkreputation',
      behavior: 'Verhaltensmuster',
      graph: 'Verknüpfte Konten',
      linked: '3 Beziehungen gefunden',
      blocked: 'Koordiniertes Muster blockiert',
    },
    extend: {
      workspace: 'Integrationsereignis',
      connected: 'Verbunden',
      apiEvent: 'Entscheidungs-API',
      webhook: 'Webhook zugestellt',
      documentation: 'Entwicklerdokumentation',
      marketplace: 'Marketplace-Apps',
    },
  },
  foundations: {
    eyebrow: 'PLATTFORMGRUNDLAGEN',
    title: 'Für Produkt, Entwicklung, Risiko und Compliance gebaut.',
    description: 'Alle Produkte nutzen dieselben Grundlagen, damit Teams ohne doppelte Konfiguration, Beweise oder Entscheidungshistorien zusammenarbeiten.',
    items: {
      noCode: {
        title: 'No-Code, wenn Geschwindigkeit zählt',
        description: 'Produkt- und Betriebsteams aktualisieren Journeys und Richtlinien ohne einen neuen Release-Zyklus.',
      },
      integration: {
        title: 'SDK und API, wenn Kontrolle zählt',
        description: 'Betten Sie Verifizierung in Web- oder Mobilprodukte ein und verbinden Sie Entscheidungen mit Backend-Diensten.',
      },
      privacy: {
        title: 'Datenschutz durch Technikgestaltung',
        description: 'Minimieren Sie Offenlegung, steuern Sie Zugriffe granular und schützen Sie sensible Identitätsdaten.',
      },
      audit: {
        title: 'Eine prüfbare Historie',
        description: 'Halten Sie Prüfungen, Signale, Regeln, Prüferaktionen und Ergebnisse in einem konsistenten Datensatz fest.',
      },
    },
    securityCta: 'Sicherheit entdecken',
    documentationCta: 'Entwicklerdokumentation öffnen',
  },
  faq: {
    eyebrow: 'PLATTFORM FAQ',
    title: 'Finden Sie den richtigen Einstieg.',
    description: 'Einige praktische Unterschiede erleichtern die Wahl des ersten Identra Produkts.',
    contactCta: 'Mit Experten sprechen',
    items: {
      selection: {
        question: 'Mit welchem Identra Produkt sollten wir beginnen?',
        answer: 'Starten Sie mit dem Problem, das Ihrem aktuellen Ablauf am nächsten liegt. Flow Editor eignet sich für die Kundenerfahrung, Workflows für Backend-Entscheidungen, Passive Signale oder Graph für Betrugsanalyse und Fallmanagement für gemeinsame Untersuchungen.',
      },
      flowDifference: {
        question: 'Wie unterscheiden sich Flow Editor und Dynamic Flow?',
        answer: 'Flow Editor ist der visuelle Arbeitsbereich für Bildschirme, Erfassungsschritte und Branding. Dynamic Flow ist die Laufzeitfunktion, die den Pfad anhand von Identitätskontext und Live-Risiko verändert.',
      },
      sharedData: {
        question: 'Teilen die Produkte Signale und Entscheidungen?',
        answer: 'Ja. Verifizierungsergebnisse, passive Signale, Workflow-Ergebnisse und Prüferaktionen können in allen aktivierten, verbundenen Produkten genutzt werden.',
      },
      integration: {
        question: 'Können wir schrittweise integrieren?',
        answer: 'Ja. Beginnen Sie mit einer gehosteten oder No-Code-Lösung und ergänzen Sie SDK, API, Webhooks, Marketplace und operative Integrationen nach Bedarf.',
      },
    },
  },
};

const vi: PlatformPageCopy = {
  hero: {
    eyebrow: 'NỀN TẢNG IDENTRA',
    title: 'Nền tảng Identra',
    description: 'Hợp nhất quy trình thu thập và xác minh thông tin định danh, tự động ra quyết định, xử lý hồ sơ cần đánh giá thủ công và phát hiện gian lận trên cùng một nền tảng. Doanh nghiệp có thể triển khai tính năng cần thiết trước, rồi mở rộng dần mà không phải thiết kế lại hành trình khách hàng.',
    primaryCta: 'Khám phá nền tảng',
    secondaryCta: 'Trải nghiệm demo',
    capabilitiesLabel: 'Một nền tảng xuyên suốt quy trình xác minh',
    capabilities: [
      'Xác minh khách hàng cá nhân và doanh nghiệp',
      'Triển khai linh hoạt với no-code, SDK hoặc API',
      'Đánh giá rủi ro theo thời gian thực',
    ],
    architectureTitle: 'Các lớp sản phẩm trên nền tảng',
    architectureDescription: 'Mỗi giai đoạn tương ứng với một nhóm sản phẩm chuyên biệt.',
    architectureAriaLabel: 'Sơ đồ bốn giai đoạn của nền tảng Identra',
    stageLinkLabel: 'Xem giai đoạn',
  },
  journey: {
    eyebrow: 'MỘT NỀN TẢNG, NHIỀU ĐIỂM KHỞI ĐẦU',
    title: 'Triển khai theo nhu cầu mà vẫn giữ hệ thống liền mạch.',
    description: 'Các sản phẩm Identra dùng chung dữ liệu định danh, tín hiệu rủi ro và lịch sử ra quyết định. Doanh nghiệp có thể triển khai một tính năng trước, sau đó bổ sung những lớp còn lại khi nhu cầu xác minh tăng lên.',
  },
  stages: {
    collect: {
      eyebrow: '01 / TRẢI NGHIỆM',
      title: 'Thiết kế, thu thập và chia sẻ',
      description: 'Thiết kế hành trình xác minh rõ ràng, tự điều chỉnh theo mức rủi ro thực tế và cho phép khách hàng tái sử dụng thực chứng đã được xác minh thay vì gửi lại cùng một thông tin nhiều lần.',
      previewTitle: 'Luồng xác minh linh hoạt',
      previewDescription: 'Các bước thu thập thông tin và nhánh xử lý theo rủi ro được kết nối trong cùng một luồng.',
    },
    orchestrate: {
      eyebrow: '02 / VẬN HÀNH',
      title: 'Tự động hóa quy trình vận hành',
      description: 'Biến kết quả xác minh và các tín hiệu thu thập được thành quyết định nhất quán. Hồ sơ thông thường được xử lý tự động; trường hợp cần xem xét sẽ được chuyển tới chuyên viên với đầy đủ thông tin liên quan.',
      previewTitle: 'Quy trình ra quyết định',
      previewDescription: 'Quy tắc, hồ sơ chờ duyệt và đề xuất của Copilot được ghi lại trong cùng một quy trình.',
    },
    analyze: {
      eyebrow: '03 / PHÂN TÍCH',
      title: 'Phân tích và phòng ngừa',
      description: 'Phát hiện rủi ro từ thiết bị, mạng và hành vi mà không làm gián đoạn người dùng hợp lệ. Identra còn đối chiếu mối liên hệ giữa các tài khoản để nhận diện những nhóm gian lận có tổ chức.',
      previewTitle: 'Phân tích rủi ro',
      previewDescription: 'Kết hợp tín hiệu thụ động với dữ liệu liên kết giúp phát hiện những dấu hiệu mà từng bước kiểm tra riêng lẻ có thể bỏ sót.',
    },
    extend: {
      eyebrow: '04 / HỆ SINH THÁI',
      title: 'Kết nối và mở rộng',
      description: 'Kết nối Identra với những công cụ doanh nghiệp đang sử dụng. Đồng bộ kết quả ra quyết định, kích hoạt các quy trình liên quan và mở rộng nền tảng qua những tích hợp được hỗ trợ.',
      previewTitle: 'Trung tâm tích hợp',
      previewDescription: 'Mọi dịch vụ được kết nối đều nhận sự kiện ra quyết định theo cùng một cấu trúc.',
    },
  },
  products: {
    flowEditor: {
      title: 'Flow Editor',
      description: 'Thiết kế hành trình xác minh phù hợp với nhận diện thương hiệu bằng công cụ no-code trực quan, đồng thời xem trước từng màn hình trước khi phát hành.',
    },
    dynamicFlow: {
      title: 'Dynamic Flow',
      description: 'Điều chỉnh các bước xác minh theo thời gian thực để người dùng có độ tin cậy cao hoàn tất nhanh hơn, còn trường hợp có dấu hiệu rủi ro sẽ được yêu cầu xác minh thêm.',
    },
    relay: {
      title: 'Relay',
      description: 'Cho phép khách hàng tái sử dụng thực chứng đã được xác minh và chỉ chia sẻ những thông tin cần thiết cho từng yêu cầu mới.',
    },
    workflows: {
      title: 'Workflows',
      description: 'Tự động thực hiện các bước kiểm tra, áp dụng quy tắc, gửi webhook và kích hoạt hành động tiếp theo trong suốt quy trình xác minh.',
    },
    caseManagement: {
      title: 'Quản lý hồ sơ',
      description: 'Tập trung bằng chứng, hồ sơ chờ duyệt, quyết định và trường hợp ngoại lệ vào một không gian làm việc chung cho chuyên viên.',
    },
    copilot: {
      title: 'Copilot',
      description: 'Giúp chuyên viên đánh giá rủi ro hiểu rõ từng tín hiệu, nắm bắt bối cảnh hồ sơ và lựa chọn bước xử lý tiếp theo với sự hỗ trợ của AI.',
    },
    passiveSignals: {
      title: 'Tín hiệu thụ động',
      description: 'Ghi nhận các tín hiệu từ thiết bị, mạng và hành vi ở chế độ nền để phát hiện rủi ro mà không làm gián đoạn người dùng hợp lệ.',
    },
    graph: {
      title: 'Graph',
      description: 'Liên kết thiết bị, địa chỉ IP, thông tin liên hệ và các tài khoản có điểm chung để phát hiện mạng lưới gian lận có tổ chức.',
    },
    marketplace: {
      title: 'Identra Marketplace',
      description: 'Kết nối Identra với các nguồn dữ liệu và công cụ vận hành để kết quả xác minh có thể tự động kích hoạt những bước xử lý tiếp theo trên toàn hệ thống.',
    },
  },
  common: {
    productCta: 'Xem chi tiết sản phẩm',
    docsCta: 'Xem hướng dẫn tích hợp',
    previewReady: 'Sẵn sàng',
    previewLive: 'Đang hoạt động',
  },
  visuals: {
    collect: {
      workspace: 'Trình thiết kế luồng',
      draft: 'Bản nháp sẵn sàng',
      start: 'Giới thiệu và lấy sự đồng ý',
      credential: 'Xác minh thực chứng',
      risk: 'Điều hướng theo mức rủi ro',
      approve: 'Phê duyệt nhanh',
      stepUp: 'Yêu cầu xác minh thêm',
    },
    orchestrate: {
      workspace: 'Luồng ra quyết định',
      running: 'Chính sách đang được áp dụng',
      rule: 'Quy tắc được áp dụng',
      ruleValue: 'risk.score >= 70',
      caseQueue: 'Hồ sơ chờ đánh giá',
      copilot: 'Đề xuất của Copilot',
      approved: 'Phê duyệt',
      review: 'Cần đánh giá',
    },
    analyze: {
      workspace: 'Giám sát rủi ro',
      monitoring: 'Đang giám sát',
      device: 'Độ tin cậy của thiết bị',
      network: 'Độ tin cậy của mạng',
      behavior: 'Dấu hiệu hành vi',
      graph: 'Các tài khoản liên quan',
      linked: 'Phát hiện 3 mối liên hệ',
      blocked: 'Đã chặn nhóm tài khoản có dấu hiệu gian lận',
    },
    extend: {
      workspace: 'Kết nối hệ thống',
      connected: 'Đã kết nối',
      apiEvent: 'API ra quyết định',
      webhook: 'Webhook đã gửi',
      documentation: 'Tài liệu cho nhà phát triển',
      marketplace: 'Ứng dụng trên Marketplace',
    },
  },
  foundations: {
    eyebrow: 'NỀN TẢNG CỐT LÕI',
    title: 'Đáp ứng nhu cầu của bộ phận sản phẩm, kỹ thuật, quản trị rủi ro và tuân thủ.',
    description: 'Tất cả sản phẩm đều dùng chung một nền tảng cốt lõi, giúp các bộ phận phối hợp mà không phải thiết lập lại cấu hình, tập hợp lại bằng chứng hay tổng hợp lại lịch sử ra quyết định.',
    items: {
      noCode: {
        title: 'No-code để triển khai nhanh',
        description: 'Bộ phận sản phẩm và vận hành có thể cập nhật hành trình hoặc chính sách mà không phải chờ đến đợt phát hành phần mềm tiếp theo.',
      },
      integration: {
        title: 'SDK và API để chủ động tích hợp',
        description: 'Tích hợp xác minh vào ứng dụng web hoặc di động, đồng thời chuyển kết quả tới các dịch vụ backend.',
      },
      privacy: {
        title: 'Bảo vệ quyền riêng tư ngay từ thiết kế',
        description: 'Giảm lượng dữ liệu phải tiết lộ, kiểm soát chặt chẽ quyền truy cập và bảo vệ thông tin định danh nhạy cảm.',
      },
      audit: {
        title: 'Lịch sử đầy đủ, sẵn sàng kiểm toán',
        description: 'Lưu kết quả kiểm tra, tín hiệu, quy tắc, thao tác của chuyên viên và quyết định cuối cùng trong cùng một hồ sơ.',
      },
    },
    securityCta: 'Khám phá bảo mật',
    documentationCta: 'Xem tài liệu cho nhà phát triển',
  },
  faq: {
    eyebrow: 'CÂU HỎI VỀ NỀN TẢNG',
    title: 'Nên bắt đầu từ đâu với Identra?',
    description: 'Những giải đáp dưới đây sẽ giúp doanh nghiệp chọn sản phẩm phù hợp nhất để triển khai trước.',
    contactCta: 'Trao đổi với chuyên gia',
    items: {
      selection: {
        question: 'Nên bắt đầu với sản phẩm Identra nào?',
        answer: 'Hãy bắt đầu từ nhu cầu cấp thiết nhất trong quy trình hiện tại. Flow Editor phù hợp để thiết kế hành trình cho khách hàng; Workflows giúp tự động hóa việc ra quyết định; Tín hiệu thụ động và Graph hỗ trợ phát hiện gian lận; còn Quản lý hồ sơ dành cho những trường hợp cần chuyên viên xem xét.',
      },
      flowDifference: {
        question: 'Flow Editor khác Dynamic Flow như thế nào?',
        answer: 'Flow Editor là công cụ trực quan để thiết kế màn hình, các bước thu thập thông tin và nhận diện thương hiệu. Dynamic Flow tự động thay đổi hành trình dựa trên thông tin định danh và mức rủi ro tại thời điểm xác minh.',
      },
      sharedData: {
        question: 'Các sản phẩm có dùng chung tín hiệu và lịch sử quyết định không?',
        answer: 'Có. Kết quả xác minh, tín hiệu thụ động, kết quả xử lý của Workflows và thao tác của chuyên viên đều có thể được sử dụng xuyên suốt các sản phẩm mà doanh nghiệp đã triển khai.',
      },
      integration: {
        question: 'Có thể triển khai từng phần không?',
        answer: 'Có. Doanh nghiệp có thể bắt đầu bằng luồng xác minh dựng sẵn của Identra hoặc tự thiết kế bằng công cụ no-code, sau đó bổ sung SDK, API, webhook, Marketplace và các tích hợp khác khi nhu cầu tăng lên.',
      },
    },
  },
};

export const platformTranslations = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<Locale, PlatformPageCopy>;
