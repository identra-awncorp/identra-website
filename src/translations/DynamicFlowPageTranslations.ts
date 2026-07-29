/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../types/routes';

export const DYNAMIC_FLOW_BENEFIT_IDS = [
  'visual',
  'adaptive',
  'confidence',
  'scale',
] as const;

export type DynamicFlowBenefitId = typeof DYNAMIC_FLOW_BENEFIT_IDS[number];

export const DYNAMIC_FLOW_STAGE_IDS = [
  'compose',
  'adapt',
  'prove',
  'operate',
] as const;

export type DynamicFlowStageId = typeof DYNAMIC_FLOW_STAGE_IDS[number];

export const DYNAMIC_FLOW_FAQ_IDS = [
  'noCode',
  'testing',
  'reuse',
  'studio',
] as const;

export type DynamicFlowFaqId = typeof DYNAMIC_FLOW_FAQ_IDS[number];

type NamedDescription = {
  readonly title: string;
  readonly description: string;
};

type StageCopy = NamedDescription & {
  readonly eyebrow: string;
  readonly points: readonly [string, string, string];
  readonly visualTitle: string;
  readonly visualItems: readonly [string, string, string];
  readonly visualStatus: string;
};

type FaqCopy = {
  readonly question: string;
  readonly answer: string;
};

export type DynamicFlowPageCopy = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly visualEyebrow: string;
    readonly visualTitle: string;
    readonly visualStatus: string;
    readonly start: string;
    readonly verify: string;
    readonly decide: string;
    readonly continue: string;
    readonly review: string;
    readonly requestMore: string;
    readonly visualAriaLabel: string;
  };
  readonly benefits: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<DynamicFlowBenefitId, NamedDescription>;
  };
  readonly workflow: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly stages: Record<DynamicFlowStageId, StageCopy>;
  };
  readonly studio: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly flowLabel: string;
    readonly flowTitle: string;
    readonly flowDescription: string;
    readonly studioLabel: string;
    readonly studioTitle: string;
    readonly studioDescription: string;
    readonly connectionLabel: string;
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<DynamicFlowFaqId, FaqCopy>;
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
};

const en: DynamicFlowPageCopy = {
  hero: {
    eyebrow: 'DYNAMIC FLOW',
    title: 'Build verification journeys that change with every situation.',
    description: 'Bring identity checks, decisions, and follow-up actions into one visual flow. Start simple, adapt as requirements grow, and keep every path easy to understand.',
    primaryCta: 'Open Dynamic Flow',
    secondaryCta: 'Talk to an expert',
    visualEyebrow: 'Journey overview',
    visualTitle: 'Customer onboarding',
    visualStatus: 'Ready to refine',
    start: 'Start',
    verify: 'Verify identity',
    decide: 'Choose the next step',
    continue: 'Continue',
    review: 'Review',
    requestMore: 'Request more evidence',
    visualAriaLabel: 'An example Dynamic Flow with identity verification and three possible next steps',
  },
  benefits: {
    eyebrow: 'WHY DYNAMIC FLOW',
    title: 'Less setup. More control over every journey.',
    description: 'Dynamic Flow turns complex verification requirements into a journey that teams can see, discuss, and improve together.',
    items: {
      visual: {
        title: 'Design without stitching tools together',
        description: 'Bring verification steps and decisions into one clear workspace instead of managing disconnected configurations.',
      },
      adaptive: {
        title: 'Create the right path for each situation',
        description: 'Move straightforward cases forward and add the right checks when a journey needs more confidence.',
      },
      confidence: {
        title: 'Know what will happen before launch',
        description: 'Review every route, test key scenarios, and catch incomplete journeys before they reach customers.',
      },
      scale: {
        title: 'Change without starting over',
        description: 'Reuse proven building blocks and evolve flows as products, markets, and policies change.',
      },
    },
  },
  workflow: {
    eyebrow: 'ONE WORKSPACE, FROM IDEA TO LAUNCH',
    title: 'Make complex journeys feel manageable.',
    description: 'Dynamic Flow keeps the work understandable at every stage, whether you are shaping the first path or preparing a mature journey for wider use.',
    stages: {
      compose: {
        eyebrow: '01 / BUILD',
        title: 'Turn requirements into a visual journey',
        description: 'Arrange the checks and decisions your service needs in a flow that product, operations, and compliance teams can understand at a glance.',
        points: [
          'Start from ready-to-use modules',
          'Add your own steps when needed',
          'Rearrange the journey without rebuilding it',
        ],
        visualTitle: 'Build the journey',
        visualItems: ['Identity check', 'Decision', 'Completion'],
        visualStatus: 'Editable',
      },
      adapt: {
        eyebrow: '02 / ADAPT',
        title: 'Guide each case to the right next step',
        description: 'Use the information already available in the journey to continue, request another proof, or send a case to the right team.',
        points: [
          'Keep simple journeys short',
          'Add confidence only when it is needed',
          'Make every possible outcome visible',
        ],
        visualTitle: 'Choose the next step',
        visualItems: ['Continue', 'Request more', 'Review'],
        visualStatus: 'Three clear paths',
      },
      prove: {
        eyebrow: '03 / TEST',
        title: 'Check every path before customers see it',
        description: 'Find gaps early, run representative scenarios, and understand why a journey followed a particular route.',
        points: [
          'Spot missing or broken paths',
          'Test representative scenarios safely',
          'Understand why each route was selected',
        ],
        visualTitle: 'Journey checks',
        visualItems: ['Path complete', 'Expected result', 'Ready to review'],
        visualStatus: 'Checks passed',
      },
      operate: {
        eyebrow: '04 / OPERATE',
        title: 'Improve and release with confidence',
        description: 'Keep useful building blocks, changes, and releases organized so the journey can grow without losing clarity or control.',
        points: [
          'Reuse proven flow sections',
          'Keep a clear history of changes',
          'Move updates through controlled environments',
        ],
        visualTitle: 'Release journey',
        visualItems: ['Draft', 'Review', 'Live'],
        visualStatus: 'Version ready',
      },
    },
  },
  studio: {
    eyebrow: 'LOGIC AND EXPERIENCE, IN STEP',
    title: 'Dynamic Flow decides what happens. Interface Studio shapes how it feels.',
    description: 'Keep journey logic and the customer experience connected. When the flow changes, teams can see which screens and states need attention without rebuilding the experience from scratch.',
    flowLabel: 'Journey logic',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Organize checks, decisions, routes, and outcomes in one visual journey.',
    studioLabel: 'Customer experience',
    studioTitle: 'Interface Studio',
    studioDescription: 'Shape the screens, content, branding, and responsive experience for each customer-facing step.',
    connectionLabel: 'One journey, always synchronized',
  },
  faq: {
    eyebrow: 'DYNAMIC FLOW FAQ',
    title: 'A clearer way to build and improve verification journeys.',
    description: 'The essentials teams usually want to know before they begin.',
    items: {
      noCode: {
        question: 'Do we need to write code to build a flow?',
        answer: 'No. Teams can arrange modules, decisions, and routes visually. Custom modules and integrations remain available when a journey needs capabilities beyond the standard building blocks.',
      },
      testing: {
        question: 'Can we test a journey before releasing it?',
        answer: 'Yes. Dynamic Flow is designed to validate the journey, exercise representative scenarios, and make the selected route understandable before an update is released.',
      },
      reuse: {
        question: 'Can we reuse parts of an existing flow?',
        answer: 'Yes. Proven modules and reusable flow sections can be applied across journeys, helping teams stay consistent while adapting to different products or markets.',
      },
      studio: {
        question: 'How does Dynamic Flow work with Interface Studio?',
        answer: 'Dynamic Flow defines journey logic and outcomes. Interface Studio controls the customer-facing screens and states connected to that logic, so both sides can evolve together.',
      },
    },
  },
  cta: {
    eyebrow: 'START WITH A CLEARER JOURNEY',
    title: 'Turn your verification requirements into a flow everyone can understand.',
    description: 'Open Dynamic Flow to explore the workspace, or speak with our team about the journey you want to build.',
    primaryCta: 'Open Dynamic Flow',
    secondaryCta: 'Talk to an expert',
  },
};

const es: DynamicFlowPageCopy = {
  hero: {
    eyebrow: 'DYNAMIC FLOW',
    title: 'Cree recorridos de verificación que se adapten a cada situación.',
    description: 'Reúna verificaciones de identidad, decisiones y acciones posteriores en un único flujo visual. Empiece de forma sencilla, adáptelo a medida que crecen sus necesidades y mantenga cada ruta fácil de entender.',
    primaryCta: 'Abrir Dynamic Flow',
    secondaryCta: 'Hablar con un experto',
    visualEyebrow: 'Vista general del recorrido',
    visualTitle: 'Alta de clientes',
    visualStatus: 'Listo para ajustar',
    start: 'Inicio',
    verify: 'Verificar identidad',
    decide: 'Elegir el siguiente paso',
    continue: 'Continuar',
    review: 'Revisar',
    requestMore: 'Solicitar más pruebas',
    visualAriaLabel: 'Ejemplo de Dynamic Flow con verificación de identidad y tres pasos siguientes posibles',
  },
  benefits: {
    eyebrow: 'POR QUÉ DYNAMIC FLOW',
    title: 'Menos configuración. Más control sobre cada recorrido.',
    description: 'Dynamic Flow convierte requisitos de verificación complejos en un recorrido que los equipos pueden ver, debatir y mejorar juntos.',
    items: {
      visual: {
        title: 'Diseñe sin unir herramientas aisladas',
        description: 'Reúna pasos de verificación y decisiones en un espacio claro, en lugar de administrar configuraciones desconectadas.',
      },
      adaptive: {
        title: 'Cree la ruta adecuada para cada situación',
        description: 'Agilice los casos sencillos y añada las comprobaciones apropiadas cuando el recorrido necesite más confianza.',
      },
      confidence: {
        title: 'Sepa qué ocurrirá antes de publicar',
        description: 'Revise todas las rutas, pruebe escenarios clave y detecte recorridos incompletos antes de que lleguen a los clientes.',
      },
      scale: {
        title: 'Cambie sin empezar de nuevo',
        description: 'Reutilice componentes probados y adapte los flujos cuando cambien los productos, mercados o políticas.',
      },
    },
  },
  workflow: {
    eyebrow: 'UN ESPACIO, DE LA IDEA AL LANZAMIENTO',
    title: 'Haga que los recorridos complejos sean fáciles de gestionar.',
    description: 'Dynamic Flow mantiene el trabajo comprensible en cada etapa, desde la primera ruta hasta la preparación de un recorrido maduro para un uso más amplio.',
    stages: {
      compose: {
        eyebrow: '01 / CREAR',
        title: 'Convierta los requisitos en un recorrido visual',
        description: 'Organice las comprobaciones y decisiones que necesita su servicio en un flujo que producto, operaciones y cumplimiento puedan comprender de un vistazo.',
        points: [
          'Empiece con módulos listos para usar',
          'Añada sus propios pasos cuando sea necesario',
          'Reorganice el recorrido sin reconstruirlo',
        ],
        visualTitle: 'Crear el recorrido',
        visualItems: ['Verificación de identidad', 'Decisión', 'Finalización'],
        visualStatus: 'Editable',
      },
      adapt: {
        eyebrow: '02 / ADAPTAR',
        title: 'Guíe cada caso hacia el siguiente paso adecuado',
        description: 'Use la información disponible para continuar, solicitar otra prueba o enviar el caso al equipo apropiado.',
        points: [
          'Mantenga breves los recorridos sencillos',
          'Añada confianza solo cuando sea necesaria',
          'Haga visible cada resultado posible',
        ],
        visualTitle: 'Elegir el siguiente paso',
        visualItems: ['Continuar', 'Solicitar más', 'Revisar'],
        visualStatus: 'Tres rutas claras',
      },
      prove: {
        eyebrow: '03 / PROBAR',
        title: 'Compruebe cada ruta antes de mostrarla a los clientes',
        description: 'Detecte vacíos con antelación, ejecute escenarios representativos y entienda por qué el recorrido siguió una ruta concreta.',
        points: [
          'Detecte rutas incompletas o rotas',
          'Pruebe escenarios representativos con seguridad',
          'Entienda por qué se eligió cada ruta',
        ],
        visualTitle: 'Comprobaciones del recorrido',
        visualItems: ['Ruta completa', 'Resultado esperado', 'Lista para revisar'],
        visualStatus: 'Comprobaciones superadas',
      },
      operate: {
        eyebrow: '04 / OPERAR',
        title: 'Mejore y publique con confianza',
        description: 'Mantenga organizados los componentes, cambios y lanzamientos para que el recorrido crezca sin perder claridad ni control.',
        points: [
          'Reutilice secciones de flujo probadas',
          'Mantenga un historial claro de cambios',
          'Mueva las mejoras por entornos controlados',
        ],
        visualTitle: 'Publicar el recorrido',
        visualItems: ['Borrador', 'Revisión', 'Activo'],
        visualStatus: 'Versión preparada',
      },
    },
  },
  studio: {
    eyebrow: 'LÓGICA Y EXPERIENCIA, SIEMPRE ALINEADAS',
    title: 'Dynamic Flow decide qué ocurre. Interface Studio define cómo se vive.',
    description: 'Mantenga conectadas la lógica del recorrido y la experiencia del cliente. Cuando cambia el flujo, los equipos pueden ver qué pantallas y estados requieren atención sin reconstruir la experiencia.',
    flowLabel: 'Lógica del recorrido',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Organice comprobaciones, decisiones, rutas y resultados en un único recorrido visual.',
    studioLabel: 'Experiencia del cliente',
    studioTitle: 'Interface Studio',
    studioDescription: 'Diseñe pantallas, contenido, marca y experiencia responsive para cada paso visible por el cliente.',
    connectionLabel: 'Un solo recorrido, siempre sincronizado',
  },
  faq: {
    eyebrow: 'PREGUNTAS SOBRE DYNAMIC FLOW',
    title: 'Una forma más clara de crear y mejorar recorridos de verificación.',
    description: 'Lo esencial que los equipos suelen querer saber antes de empezar.',
    items: {
      noCode: {
        question: '¿Necesitamos escribir código para crear un flujo?',
        answer: 'No. Los equipos pueden organizar visualmente módulos, decisiones y rutas. Los módulos personalizados y las integraciones siguen disponibles cuando el recorrido necesita capacidades adicionales.',
      },
      testing: {
        question: '¿Podemos probar un recorrido antes de publicarlo?',
        answer: 'Sí. Dynamic Flow permite validar el recorrido, ejecutar escenarios representativos y comprender la ruta elegida antes de publicar una actualización.',
      },
      reuse: {
        question: '¿Podemos reutilizar partes de un flujo existente?',
        answer: 'Sí. Los módulos y las secciones de flujo ya probados pueden utilizarse en distintos recorridos para mantener la coherencia y adaptarse a productos o mercados diferentes.',
      },
      studio: {
        question: '¿Cómo funciona Dynamic Flow con Interface Studio?',
        answer: 'Dynamic Flow define la lógica y los resultados del recorrido. Interface Studio controla las pantallas y estados vinculados a esa lógica para que ambos evolucionen juntos.',
      },
    },
  },
  cta: {
    eyebrow: 'EMPIECE CON UN RECORRIDO MÁS CLARO',
    title: 'Convierta sus requisitos de verificación en un flujo que todos puedan entender.',
    description: 'Abra Dynamic Flow para explorar el espacio de trabajo o hable con nuestro equipo sobre el recorrido que desea crear.',
    primaryCta: 'Abrir Dynamic Flow',
    secondaryCta: 'Hablar con un experto',
  },
};

const ja: DynamicFlowPageCopy = {
  hero: {
    eyebrow: 'DYNAMIC FLOW',
    title: '状況に合わせて変化する本人確認ジャーニーを構築。',
    description: '本人確認、判断、その後のアクションを一つのビジュアルフローにまとめます。シンプルに始め、要件の成長に合わせて調整し、すべての経路を分かりやすく保てます。',
    primaryCta: 'Dynamic Flowを開く',
    secondaryCta: '専門家に相談',
    visualEyebrow: 'ジャーニー概要',
    visualTitle: '顧客オンボーディング',
    visualStatus: '調整可能',
    start: '開始',
    verify: '本人確認',
    decide: '次のステップを選択',
    continue: '続行',
    review: 'レビュー',
    requestMore: '追加証明を依頼',
    visualAriaLabel: '本人確認と三つの次のステップを示すDynamic Flowの例',
  },
  benefits: {
    eyebrow: 'DYNAMIC FLOWを選ぶ理由',
    title: '設定の手間を減らし、すべてのジャーニーを自在に管理。',
    description: 'Dynamic Flowは複雑な本人確認要件を、チーム全員が見て話し合い、改善できるジャーニーに変えます。',
    items: {
      visual: {
        title: '分散したツールをつなぎ合わせずに設計',
        description: '本人確認ステップと判断を一つの明快なワークスペースにまとめ、個別設定の管理を減らします。',
      },
      adaptive: {
        title: '状況ごとに適切な経路を用意',
        description: 'シンプルなケースは素早く進め、より確かな確認が必要な場合だけ適切なステップを追加します。',
      },
      confidence: {
        title: '公開前に動きを把握',
        description: 'すべての経路と重要なシナリオを確認し、不完全なジャーニーを顧客に届く前に見つけます。',
      },
      scale: {
        title: '最初から作り直さずに変更',
        description: '実績のある構成要素を再利用し、製品、市場、ポリシーの変化に合わせてフローを発展させます。',
      },
    },
  },
  workflow: {
    eyebrow: 'アイデアから公開まで、一つのワークスペースで',
    title: '複雑なジャーニーを、扱いやすく。',
    description: '最初の経路を形にするときも、成熟したジャーニーを広く展開するときも、Dynamic Flowなら各段階の作業を分かりやすく保てます。',
    stages: {
      compose: {
        eyebrow: '01 / 構築',
        title: '要件をビジュアルジャーニーに変換',
        description: '製品、運用、コンプライアンスの各チームがひと目で理解できるフローに、必要な確認と判断を配置します。',
        points: [
          'すぐに使えるモジュールから開始',
          '必要に応じて独自ステップを追加',
          '作り直さずにジャーニーを再配置',
        ],
        visualTitle: 'ジャーニーを構築',
        visualItems: ['本人確認', '判断', '完了'],
        visualStatus: '編集可能',
      },
      adapt: {
        eyebrow: '02 / 適応',
        title: '各ケースを適切な次のステップへ',
        description: 'ジャーニー内の情報を使い、続行、追加証明の依頼、適切なチームへのレビュー依頼を選べます。',
        points: [
          'シンプルなジャーニーは短く',
          '必要なときだけ確認を追加',
          'すべての結果を見える化',
        ],
        visualTitle: '次のステップを選択',
        visualItems: ['続行', '追加を依頼', 'レビュー'],
        visualStatus: '三つの明確な経路',
      },
      prove: {
        eyebrow: '03 / テスト',
        title: '顧客に公開する前にすべての経路を確認',
        description: '不備を早期に見つけ、代表的なシナリオを実行し、特定の経路が選ばれた理由を理解できます。',
        points: [
          '欠けた経路や壊れた接続を発見',
          '代表的なシナリオを安全にテスト',
          '各経路が選ばれた理由を確認',
        ],
        visualTitle: 'ジャーニーチェック',
        visualItems: ['経路完了', '期待結果', 'レビュー準備完了'],
        visualStatus: 'チェック完了',
      },
      operate: {
        eyebrow: '04 / 運用',
        title: '安心して改善し、公開',
        description: '構成要素、変更、リリースを整理し、明快さと管理性を保ったままジャーニーを成長させます。',
        points: [
          '実績のあるフロー部分を再利用',
          '変更履歴を明確に保持',
          '管理された環境を通じて更新',
        ],
        visualTitle: 'ジャーニーを公開',
        visualItems: ['下書き', 'レビュー', '公開'],
        visualStatus: 'バージョン準備完了',
      },
    },
  },
  studio: {
    eyebrow: 'ロジックと体験を常に同期',
    title: 'Dynamic Flowが動きを決め、Interface Studioが体験を形にします。',
    description: 'ジャーニーのロジックと顧客体験をつなげて管理します。フローが変わっても、再構築することなく、確認が必要な画面や状態を把握できます。',
    flowLabel: 'ジャーニーロジック',
    flowTitle: 'Dynamic Flow',
    flowDescription: '確認、判断、経路、結果を一つのビジュアルジャーニーにまとめます。',
    studioLabel: '顧客体験',
    studioTitle: 'Interface Studio',
    studioDescription: '顧客に表示する各ステップの画面、内容、ブランド、レスポンシブ体験を整えます。',
    connectionLabel: '一つのジャーニーを常に同期',
  },
  faq: {
    eyebrow: 'DYNAMIC FLOW FAQ',
    title: '本人確認ジャーニーを、より分かりやすく構築・改善。',
    description: '開始前によく寄せられる基本的な質問にお答えします。',
    items: {
      noCode: {
        question: 'フロー構築にコードを書く必要はありますか？',
        answer: '必要ありません。モジュール、判断、経路を視覚的に配置できます。標準機能を超える要件には、カスタムモジュールや連携機能も利用できます。',
      },
      testing: {
        question: '公開前にジャーニーをテストできますか？',
        answer: 'はい。ジャーニーを検証し、代表的なシナリオを実行し、更新を公開する前に選択された経路を理解できるよう設計されています。',
      },
      reuse: {
        question: '既存フローの一部を再利用できますか？',
        answer: 'はい。実績のあるモジュールやフロー部分を複数のジャーニーで利用し、一貫性を保ちながら製品や市場ごとに調整できます。',
      },
      studio: {
        question: 'Dynamic FlowとInterface Studioはどのように連携しますか？',
        answer: 'Dynamic Flowはジャーニーのロジックと結果を定義し、Interface Studioはそのロジックに接続された画面と状態を管理します。両者を一緒に発展させられます。',
      },
    },
  },
  cta: {
    eyebrow: 'より明快なジャーニーを始める',
    title: '本人確認要件を、誰もが理解できるフローへ。',
    description: 'Dynamic Flowでワークスペースを試すか、構築したいジャーニーについて担当チームにご相談ください。',
    primaryCta: 'Dynamic Flowを開く',
    secondaryCta: '専門家に相談',
  },
};

const de: DynamicFlowPageCopy = {
  hero: {
    eyebrow: 'DYNAMIC FLOW',
    title: 'Erstellen Sie Verifizierungsabläufe, die sich jeder Situation anpassen.',
    description: 'Bündeln Sie Identitätsprüfungen, Entscheidungen und Folgeaktionen in einem visuellen Flow. Starten Sie einfach, passen Sie ihn an neue Anforderungen an und halten Sie jeden Pfad verständlich.',
    primaryCta: 'Dynamic Flow öffnen',
    secondaryCta: 'Mit Experten sprechen',
    visualEyebrow: 'Überblick über den Ablauf',
    visualTitle: 'Kunden-Onboarding',
    visualStatus: 'Bereit zur Anpassung',
    start: 'Start',
    verify: 'Identität verifizieren',
    decide: 'Nächsten Schritt wählen',
    continue: 'Fortfahren',
    review: 'Prüfen',
    requestMore: 'Weitere Nachweise anfordern',
    visualAriaLabel: 'Beispiel für einen Dynamic Flow mit Identitätsprüfung und drei möglichen nächsten Schritten',
  },
  benefits: {
    eyebrow: 'WARUM DYNAMIC FLOW',
    title: 'Weniger Einrichtung. Mehr Kontrolle über jeden Ablauf.',
    description: 'Dynamic Flow verwandelt komplexe Verifizierungsanforderungen in einen Ablauf, den Teams gemeinsam sehen, besprechen und verbessern können.',
    items: {
      visual: {
        title: 'Gestalten ohne isolierte Werkzeuge zu verbinden',
        description: 'Führen Sie Prüfschritte und Entscheidungen in einem klaren Arbeitsbereich zusammen, statt getrennte Konfigurationen zu verwalten.',
      },
      adaptive: {
        title: 'Der passende Pfad für jede Situation',
        description: 'Lassen Sie einfache Fälle schnell weiterlaufen und ergänzen Sie passende Prüfungen, wenn mehr Sicherheit nötig ist.',
      },
      confidence: {
        title: 'Vor dem Start wissen, was geschieht',
        description: 'Prüfen Sie alle Pfade und wichtigen Szenarien und erkennen Sie unvollständige Abläufe, bevor Kunden sie nutzen.',
      },
      scale: {
        title: 'Ändern, ohne neu anzufangen',
        description: 'Verwenden Sie bewährte Bausteine erneut und entwickeln Sie Flows mit Produkten, Märkten und Richtlinien weiter.',
      },
    },
  },
  workflow: {
    eyebrow: 'EIN ARBEITSBEREICH, VON DER IDEE BIS ZUM START',
    title: 'Machen Sie komplexe Abläufe beherrschbar.',
    description: 'Dynamic Flow hält die Arbeit in jeder Phase verständlich – vom ersten Pfad bis zur breiten Einführung eines ausgereiften Ablaufs.',
    stages: {
      compose: {
        eyebrow: '01 / ERSTELLEN',
        title: 'Anforderungen in einen visuellen Ablauf verwandeln',
        description: 'Ordnen Sie Prüfungen und Entscheidungen in einem Flow an, den Produkt-, Betriebs- und Compliance-Teams auf einen Blick verstehen.',
        points: [
          'Mit einsatzbereiten Modulen beginnen',
          'Eigene Schritte bei Bedarf ergänzen',
          'Den Ablauf ohne Neubau umstellen',
        ],
        visualTitle: 'Ablauf erstellen',
        visualItems: ['Identitätsprüfung', 'Entscheidung', 'Abschluss'],
        visualStatus: 'Bearbeitbar',
      },
      adapt: {
        eyebrow: '02 / ANPASSEN',
        title: 'Jeden Fall zum passenden nächsten Schritt führen',
        description: 'Nutzen Sie vorhandene Informationen, um fortzufahren, weitere Nachweise anzufordern oder einen Fall an das richtige Team zu geben.',
        points: [
          'Einfache Abläufe kurz halten',
          'Zusätzliche Sicherheit nur bei Bedarf',
          'Jedes mögliche Ergebnis sichtbar machen',
        ],
        visualTitle: 'Nächsten Schritt wählen',
        visualItems: ['Fortfahren', 'Mehr anfordern', 'Prüfen'],
        visualStatus: 'Drei klare Pfade',
      },
      prove: {
        eyebrow: '03 / TESTEN',
        title: 'Jeden Pfad prüfen, bevor Kunden ihn sehen',
        description: 'Erkennen Sie Lücken frühzeitig, testen Sie repräsentative Szenarien und verstehen Sie, warum ein bestimmter Pfad gewählt wurde.',
        points: [
          'Fehlende oder unterbrochene Pfade erkennen',
          'Repräsentative Szenarien sicher testen',
          'Die Auswahl jedes Pfades verstehen',
        ],
        visualTitle: 'Ablaufprüfungen',
        visualItems: ['Pfad vollständig', 'Erwartetes Ergebnis', 'Bereit zur Prüfung'],
        visualStatus: 'Prüfungen bestanden',
      },
      operate: {
        eyebrow: '04 / BETREIBEN',
        title: 'Sicher verbessern und veröffentlichen',
        description: 'Halten Sie Bausteine, Änderungen und Releases organisiert, damit der Ablauf ohne Kontrollverlust wachsen kann.',
        points: [
          'Bewährte Flow-Abschnitte wiederverwenden',
          'Eine klare Änderungshistorie behalten',
          'Updates durch kontrollierte Umgebungen führen',
        ],
        visualTitle: 'Ablauf veröffentlichen',
        visualItems: ['Entwurf', 'Prüfung', 'Live'],
        visualStatus: 'Version bereit',
      },
    },
  },
  studio: {
    eyebrow: 'LOGIK UND ERLEBNIS IM EINKLANG',
    title: 'Dynamic Flow entscheidet, was geschieht. Interface Studio gestaltet, wie es sich anfühlt.',
    description: 'Halten Sie Ablauflogik und Kundenerlebnis verbunden. Ändert sich der Flow, sehen Teams, welche Ansichten und Zustände Aufmerksamkeit brauchen, ohne das Erlebnis neu aufzubauen.',
    flowLabel: 'Ablauflogik',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Organisieren Sie Prüfungen, Entscheidungen, Pfade und Ergebnisse in einem visuellen Ablauf.',
    studioLabel: 'Kundenerlebnis',
    studioTitle: 'Interface Studio',
    studioDescription: 'Gestalten Sie Ansichten, Inhalte, Branding und responsive Erlebnisse für jeden sichtbaren Schritt.',
    connectionLabel: 'Ein Ablauf, immer synchron',
  },
  faq: {
    eyebrow: 'DYNAMIC FLOW FAQ',
    title: 'Verifizierungsabläufe klarer erstellen und verbessern.',
    description: 'Die wichtigsten Fragen, die Teams vor dem Einstieg stellen.',
    items: {
      noCode: {
        question: 'Müssen wir Code schreiben, um einen Flow zu erstellen?',
        answer: 'Nein. Teams können Module, Entscheidungen und Pfade visuell anordnen. Eigene Module und Integrationen stehen bereit, wenn ein Ablauf mehr als die Standardbausteine benötigt.',
      },
      testing: {
        question: 'Können wir einen Ablauf vor der Veröffentlichung testen?',
        answer: 'Ja. Dynamic Flow ist darauf ausgelegt, den Ablauf zu validieren, repräsentative Szenarien zu prüfen und den gewählten Pfad vor einer Veröffentlichung verständlich zu machen.',
      },
      reuse: {
        question: 'Können wir Teile eines bestehenden Flows wiederverwenden?',
        answer: 'Ja. Bewährte Module und Flow-Abschnitte lassen sich in mehreren Abläufen einsetzen. So bleiben Teams konsistent und können sich dennoch an Produkte oder Märkte anpassen.',
      },
      studio: {
        question: 'Wie arbeitet Dynamic Flow mit Interface Studio zusammen?',
        answer: 'Dynamic Flow definiert Ablauflogik und Ergebnisse. Interface Studio steuert die daran geknüpften Ansichten und Zustände, sodass sich beide Seiten gemeinsam weiterentwickeln.',
      },
    },
  },
  cta: {
    eyebrow: 'MIT EINEM KLAREREN ABLAUF STARTEN',
    title: 'Verwandeln Sie Ihre Anforderungen in einen Flow, den alle verstehen.',
    description: 'Öffnen Sie Dynamic Flow und erkunden Sie den Arbeitsbereich oder sprechen Sie mit unserem Team über den gewünschten Ablauf.',
    primaryCta: 'Dynamic Flow öffnen',
    secondaryCta: 'Mit Experten sprechen',
  },
};

const vi: DynamicFlowPageCopy = {
  hero: {
    eyebrow: 'DYNAMIC FLOW',
    title: 'Xây dựng hành trình xác minh linh hoạt cho mọi tình huống.',
    description: 'Kết nối các bước xác minh, quyết định và hành động tiếp theo trong một flow trực quan. Doanh nghiệp có thể bắt đầu đơn giản, mở rộng theo nhu cầu và luôn nhìn rõ từng hướng xử lý.',
    primaryCta: 'Mở Dynamic Flow',
    secondaryCta: 'Liên hệ tư vấn',
    visualEyebrow: 'Tổng quan hành trình',
    visualTitle: 'Tiếp nhận khách hàng',
    visualStatus: 'Sẵn sàng điều chỉnh',
    start: 'Bắt đầu',
    verify: 'Xác minh danh tính',
    decide: 'Chọn bước tiếp theo',
    continue: 'Tiếp tục',
    review: 'Chuyển đánh giá',
    requestMore: 'Yêu cầu thêm bằng chứng',
    visualAriaLabel: 'Ví dụ Dynamic Flow gồm bước xác minh danh tính và ba hướng xử lý tiếp theo',
  },
  benefits: {
    eyebrow: 'VÌ SAO NÊN DÙNG DYNAMIC FLOW',
    title: 'Thiết lập gọn hơn. Kiểm soát tốt hơn từng hành trình.',
    description: 'Dynamic Flow biến yêu cầu xác minh phức tạp thành một hành trình mà các đội ngũ có thể cùng quan sát, trao đổi và cải thiện.',
    items: {
      visual: {
        title: 'Thiết kế mà không phải ghép nhiều công cụ',
        description: 'Đưa các bước xác minh và quyết định vào cùng một không gian rõ ràng thay vì quản lý nhiều cấu hình rời rạc.',
      },
      adaptive: {
        title: 'Tạo hướng xử lý phù hợp với từng trường hợp',
        description: 'Cho phép hồ sơ đơn giản tiếp tục nhanh chóng và bổ sung đúng bước kiểm tra khi cần thêm độ tin cậy.',
      },
      confidence: {
        title: 'Biết trước hành trình sẽ vận hành ra sao',
        description: 'Rà soát mọi hướng xử lý, thử các tình huống quan trọng và phát hiện điểm chưa hoàn chỉnh trước khi đưa vào sử dụng.',
      },
      scale: {
        title: 'Thay đổi mà không phải làm lại từ đầu',
        description: 'Tái sử dụng những thành phần đã được kiểm chứng và phát triển flow theo sản phẩm, thị trường hoặc chính sách mới.',
      },
    },
  },
  workflow: {
    eyebrow: 'MỘT KHÔNG GIAN, TỪ Ý TƯỞNG ĐẾN VẬN HÀNH',
    title: 'Biến hành trình phức tạp thành quy trình dễ quản lý.',
    description: 'Dynamic Flow giúp mọi giai đoạn đều dễ hiểu, từ lúc phác thảo hướng xử lý đầu tiên đến khi chuẩn bị một hành trình hoàn chỉnh để sử dụng rộng rãi.',
    stages: {
      compose: {
        eyebrow: '01 / XÂY DỰNG',
        title: 'Biến yêu cầu nghiệp vụ thành hành trình trực quan',
        description: 'Sắp xếp các bước kiểm tra và quyết định thành một flow mà đội ngũ sản phẩm, vận hành và tuân thủ đều có thể nắm bắt nhanh chóng.',
        points: [
          'Bắt đầu với các module sẵn có',
          'Bổ sung bước riêng khi cần',
          'Sắp xếp lại hành trình mà không phải xây lại',
        ],
        visualTitle: 'Xây dựng hành trình',
        visualItems: ['Xác minh danh tính', 'Ra quyết định', 'Hoàn tất'],
        visualStatus: 'Có thể chỉnh sửa',
      },
      adapt: {
        eyebrow: '02 / ĐIỀU CHỈNH',
        title: 'Đưa từng trường hợp đến đúng bước tiếp theo',
        description: 'Dựa trên thông tin đã có để tiếp tục, yêu cầu thêm bằng chứng hoặc chuyển hồ sơ đến đúng đội ngũ xử lý.',
        points: [
          'Giữ hành trình đơn giản luôn ngắn gọn',
          'Chỉ bổ sung kiểm tra khi thực sự cần',
          'Thể hiện rõ mọi kết quả có thể xảy ra',
        ],
        visualTitle: 'Chọn bước tiếp theo',
        visualItems: ['Tiếp tục', 'Yêu cầu thêm', 'Chuyển đánh giá'],
        visualStatus: 'Ba hướng rõ ràng',
      },
      prove: {
        eyebrow: '03 / KIỂM THỬ',
        title: 'Kiểm tra mọi hướng trước khi khách hàng sử dụng',
        description: 'Phát hiện điểm thiếu từ sớm, thử các tình huống đại diện và hiểu vì sao hành trình lựa chọn một hướng xử lý cụ thể.',
        points: [
          'Phát hiện hướng xử lý thiếu hoặc bị ngắt',
          'Thử các tình huống đại diện một cách an toàn',
          'Hiểu lý do mỗi hướng được lựa chọn',
        ],
        visualTitle: 'Kiểm tra hành trình',
        visualItems: ['Đường đi hoàn chỉnh', 'Kết quả đúng dự kiến', 'Sẵn sàng rà soát'],
        visualStatus: 'Đã vượt qua kiểm tra',
      },
      operate: {
        eyebrow: '04 / VẬN HÀNH',
        title: 'Cải tiến và phát hành một cách chủ động',
        description: 'Quản lý các thành phần, thay đổi và bản phát hành có hệ thống để hành trình tiếp tục mở rộng mà không mất đi sự rõ ràng.',
        points: [
          'Tái sử dụng các phần flow đã ổn định',
          'Theo dõi rõ lịch sử thay đổi',
          'Đưa cập nhật qua từng môi trường kiểm soát',
        ],
        visualTitle: 'Phát hành hành trình',
        visualItems: ['Bản nháp', 'Rà soát', 'Đang vận hành'],
        visualStatus: 'Phiên bản đã sẵn sàng',
      },
    },
  },
  studio: {
    eyebrow: 'LOGIC VÀ TRẢI NGHIỆM LUÔN ĐỒNG BỘ',
    title: 'Dynamic Flow quyết định điều gì xảy ra. Interface Studio định hình cách người dùng trải nghiệm.',
    description: 'Giữ logic hành trình và trải nghiệm khách hàng luôn kết nối. Khi flow thay đổi, đội ngũ có thể nhận biết màn hình hoặc trạng thái cần cập nhật mà không phải thiết kế lại toàn bộ trải nghiệm.',
    flowLabel: 'Logic hành trình',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Tổ chức các bước kiểm tra, quyết định, hướng xử lý và kết quả trong một hành trình trực quan.',
    studioLabel: 'Trải nghiệm khách hàng',
    studioTitle: 'Interface Studio',
    studioDescription: 'Thiết kế màn hình, nội dung, nhận diện thương hiệu và trải nghiệm responsive cho từng bước người dùng nhìn thấy.',
    connectionLabel: 'Một hành trình, luôn được đồng bộ',
  },
  faq: {
    eyebrow: 'CÂU HỎI VỀ DYNAMIC FLOW',
    title: 'Cách rõ ràng hơn để xây dựng và cải tiến hành trình xác minh.',
    description: 'Những điều đội ngũ thường muốn biết trước khi bắt đầu.',
    items: {
      noCode: {
        question: 'Có cần viết code để xây dựng flow không?',
        answer: 'Không. Đội ngũ có thể sắp xếp module, quyết định và hướng xử lý bằng giao diện trực quan. Khi hành trình cần chức năng đặc thù, doanh nghiệp vẫn có thể bổ sung module tùy chỉnh và các kết nối phù hợp.',
      },
      testing: {
        question: 'Có thể kiểm thử hành trình trước khi phát hành không?',
        answer: 'Có. Dynamic Flow hỗ trợ kiểm tra tính hoàn chỉnh, thử các tình huống đại diện và làm rõ hướng xử lý được lựa chọn trước khi một thay đổi được phát hành.',
      },
      reuse: {
        question: 'Có thể tái sử dụng một phần flow đã có không?',
        answer: 'Có. Module và các phần flow đã được kiểm chứng có thể dùng lại trong nhiều hành trình, giúp đội ngũ duy trì tính nhất quán mà vẫn linh hoạt theo từng sản phẩm hoặc thị trường.',
      },
      studio: {
        question: 'Dynamic Flow kết hợp với Interface Studio như thế nào?',
        answer: 'Dynamic Flow định nghĩa logic và kết quả của hành trình. Interface Studio quản lý các màn hình và trạng thái gắn với logic đó, giúp hai phần được phát triển đồng bộ.',
      },
    },
  },
  cta: {
    eyebrow: 'BẮT ĐẦU VỚI MỘT HÀNH TRÌNH RÕ RÀNG HƠN',
    title: 'Biến yêu cầu xác minh thành flow mà mọi đội ngũ đều có thể hiểu.',
    description: 'Mở Dynamic Flow để khám phá không gian làm việc hoặc trao đổi với Identra về hành trình doanh nghiệp muốn xây dựng.',
    primaryCta: 'Mở Dynamic Flow',
    secondaryCta: 'Liên hệ tư vấn',
  },
};

export const DYNAMIC_FLOW_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<Locale, DynamicFlowPageCopy>;
