/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../types/routes';

export const INTERFACE_STUDIO_SCREEN_IDS = [
  'welcome',
  'consent',
  'verification',
  'success',
] as const;

export type InterfaceStudioScreenId =
  typeof INTERFACE_STUDIO_SCREEN_IDS[number];

export const INTERFACE_STUDIO_BENEFIT_IDS = [
  'compose',
  'personalize',
  'adapt',
  'release',
] as const;

export type InterfaceStudioBenefitId =
  typeof INTERFACE_STUDIO_BENEFIT_IDS[number];

export const INTERFACE_STUDIO_STAGE_IDS = [
  'connect',
  'build',
  'localize',
  'validate',
] as const;

export type InterfaceStudioStageId =
  typeof INTERFACE_STUDIO_STAGE_IDS[number];

export const INTERFACE_STUDIO_FAQ_IDS = [
  'noCode',
  'sync',
  'locales',
  'validation',
] as const;

export type InterfaceStudioFaqId =
  typeof INTERFACE_STUDIO_FAQ_IDS[number];

type NamedDescription = {
  readonly title: string;
  readonly description: string;
};

type StudioScreenCopy = {
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly action: string;
};

type StudioStageCopy = NamedDescription & {
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

export type InterfaceStudioPageCopy = {
  readonly hero: {
    readonly eyebrow: string;
    readonly orchestrationLabel: string;
    readonly title: string;
    readonly titleLines: readonly [string, string];
    readonly description: string;
    readonly descriptionLines: readonly [string, string];
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly visualAriaLabel: string;
    readonly visualEyebrow: string;
    readonly visualStatus: string;
    readonly screensPanelLabel: string;
    readonly canvasLabel: string;
    readonly inspectorLabel: string;
    readonly previewLabel: string;
    readonly devices: {
      readonly mobile: string;
      readonly tablet: string;
      readonly desktop: string;
    };
    readonly screens: Record<InterfaceStudioScreenId, StudioScreenCopy>;
    readonly inspectorItems: readonly [
      { readonly label: string; readonly value: string },
      { readonly label: string; readonly value: string },
      { readonly label: string; readonly value: string },
      { readonly label: string; readonly value: string },
    ];
    readonly workspace: {
      readonly title: string;
      readonly presetsLabel: string;
      readonly presets: {
        readonly fintech: string;
        readonly crypto: string;
        readonly retail: string;
      };
      readonly brandColorLabel: string;
      readonly cornerStyleLabel: string;
      readonly cornerStyles: {
        readonly sharp: string;
        readonly rounded: string;
        readonly pill: string;
      };
      readonly screenStepLabel: string;
      readonly displayLogoLabel: string;
      readonly liveCanvasLabel: string;
      readonly lightModeLabel: string;
      readonly darkModeLabel: string;
      readonly stepLabel: string;
      readonly fallbackBrandLabel: string;
      readonly securityItems: readonly [string, string];
      readonly scanInstruction: string;
      readonly codePanelLabel: string;
      readonly copyLabel: string;
      readonly copiedLabel: string;
      readonly generatedCodeComment: string;
      readonly cssVariablesLabel: string;
    };
    readonly gallery: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly screenModelLabel: string;
      readonly previewBrandLabel: string;
      readonly previewStatus: string;
    };
  };
  readonly benefits: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<InterfaceStudioBenefitId, NamedDescription>;
  };
  readonly workflow: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly stages: Record<InterfaceStudioStageId, StudioStageCopy>;
  };
  readonly comparison: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly traditionalTitle: string;
    readonly solutionBadge: string;
    readonly studioTitle: string;
    readonly traditionalItems: readonly [
      NamedDescription,
      NamedDescription,
      NamedDescription,
    ];
    readonly studioItems: readonly [
      NamedDescription,
      NamedDescription,
      NamedDescription,
    ];
  };
  readonly sync: {
    readonly ecosystemLabel: string;
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly flowLabel: string;
    readonly flowTitle: string;
    readonly flowDescription: string;
    readonly flowCta: string;
    readonly studioLabel: string;
    readonly studioTitle: string;
    readonly studioDescription: string;
    readonly studioCta: string;
    readonly connectionLabel: string;
  };
  readonly quality: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly [
      NamedDescription,
      NamedDescription,
      NamedDescription,
    ];
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<InterfaceStudioFaqId, FaqCopy>;
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
};

const en: InterfaceStudioPageCopy = {
  hero: {
    eyebrow: 'INTERFACE STUDIO',
    orchestrationLabel: 'EXPERIENCE ORCHESTRATION',
    title: 'Design every screen in the verification journey without losing touch with its logic.',
    titleLines: [
      'Design verification screens',
      'that reflect your brand identity',
    ],
    description: 'Interface Studio turns Dynamic Flow steps, states, and outcomes into a customer experience your team can shape, localize, preview, and validate in one workspace.',
    descriptionLines: [
      'Turn Dynamic Flow steps, states, and outcomes into a clear customer experience.',
      'Shape, localize, preview, and validate every screen in one workspace.',
    ],
    primaryCta: 'Open Interface Studio',
    secondaryCta: 'Talk to an expert',
    visualAriaLabel: 'Interface Studio workspace showing journey screens, a responsive preview, and experience settings',
    visualEyebrow: 'Experience workspace',
    visualStatus: 'Synced with journey',
    screensPanelLabel: 'Screens',
    canvasLabel: 'Live canvas',
    inspectorLabel: 'Inspector',
    previewLabel: 'Responsive preview',
    devices: {
      mobile: 'Mobile',
      tablet: 'Tablet',
      desktop: 'Desktop',
    },
    screens: {
      welcome: {
        label: 'Welcome',
        title: 'Start with confidence',
        body: 'Introduce the journey and set expectations before verification begins.',
        action: 'Start verification',
      },
      consent: {
        label: 'Consent',
        title: 'Ask with context',
        body: 'Explain what will be requested and let customers make an informed choice.',
        action: 'Review and continue',
      },
      verification: {
        label: 'Verification',
        title: 'Guide the next check',
        body: 'Show clear instructions, progress, and recovery states around each verification step.',
        action: 'Continue securely',
      },
      success: {
        label: 'Success',
        title: 'Close the loop clearly',
        body: 'Confirm completion and guide the customer to the right next action.',
        action: 'Continue',
      },
    },
    inspectorItems: [
      { label: 'Design system', value: 'Identra Trust' },
      { label: 'Locale', value: 'English' },
      { label: 'Visibility', value: 'Always visible' },
      { label: 'Breakpoint', value: 'Mobile' },
    ],
    workspace: {
      title: 'Interactive Studio workspace',
      presetsLabel: 'Presets',
      presets: {
        fintech: 'Fintech blue',
        crypto: 'Crypto dark',
        retail: 'Commerce',
      },
      brandColorLabel: 'Brand color',
      cornerStyleLabel: 'Corner style',
      cornerStyles: {
        sharp: 'Sharp',
        rounded: 'Rounded',
        pill: 'Pill',
      },
      screenStepLabel: 'Screen step',
      displayLogoLabel: 'Display logo',
      liveCanvasLabel: 'Live canvas preview',
      lightModeLabel: 'light',
      darkModeLabel: 'dark',
      stepLabel: 'Step',
      fallbackBrandLabel: 'Verification interface',
      securityItems: [
        'Encrypted document transfer',
        'Data privacy controls',
      ],
      scanInstruction: 'Position the identity document inside the frame',
      codePanelLabel: 'Interface configuration',
      copyLabel: 'Copy',
      copiedLabel: 'Copied',
      generatedCodeComment: 'Generated Interface Studio configuration',
      cssVariablesLabel: 'Design tokens',
    },
    gallery: {
      eyebrow: 'CUSTOMER JOURNEY SCREENS',
      title: 'Shape every customer-facing screen',
      description: 'Preview each supported journey state and adapt its content to the experience you want to deliver.',
      screenModelLabel: 'screen',
      previewBrandLabel: 'Identra Verify',
      previewStatus: 'Preview',
    },
  },
  benefits: {
    eyebrow: 'WHY INTERFACE STUDIO',
    title: 'One place to shape the experience around every verification decision.',
    description: 'Give product, design, operations, and compliance teams a shared view of what customers see at every step.',
    items: {
      compose: {
        title: 'Compose screens from reusable blocks',
        description: 'Arrange headings, instructions, consent, credential requests, progress, status, and actions without rebuilding common patterns.',
      },
      personalize: {
        title: 'Connect content to journey data',
        description: 'Bind approved runtime fields and show the right content only when journey conditions are met.',
      },
      adapt: {
        title: 'Adapt across languages and devices',
        description: 'Manage localized copy, light and dark themes, and responsive overrides while previewing the result in context.',
      },
      release: {
        title: 'Find issues before export',
        description: 'Check accessibility, compare visual baselines, and resolve blocking issues before handing off an experience.',
      },
    },
  },
  workflow: {
    eyebrow: 'FROM JOURNEY LOGIC TO CUSTOMER EXPERIENCE',
    title: 'Keep every screen connected, intentional, and ready to evolve.',
    description: 'Interface Studio follows the structure of Dynamic Flow while giving teams the tools to control content, presentation, and release quality.',
    stages: {
      connect: {
        eyebrow: '01 / CONNECT',
        title: 'Start from the journey that already exists',
        description: 'Screens and variants stay associated with the modules, states, and outcomes defined in Dynamic Flow.',
        points: [
          'Create screens for welcome, consent, modules, processing, success, and error states',
          'Match interface variants to supported module states and outcomes',
          'Keep the experience aligned as journey logic changes',
        ],
        visualTitle: 'Journey connection',
        visualItems: ['Flow step mapped', 'State variants ready', 'Outcome linked'],
        visualStatus: 'Logic synchronized',
      },
      build: {
        eyebrow: '02 / COMPOSE',
        title: 'Build each state from clear, reusable blocks',
        description: 'Shape the content and actions customers need, then connect them to safe runtime data and visibility rules.',
        points: [
          'Arrange reusable content and interaction blocks',
          'Bind dynamic content with a localized fallback',
          'Control visibility with flow and module conditions',
        ],
        visualTitle: 'Screen composition',
        visualItems: ['Content blocks', 'Dynamic binding', 'Visibility rules'],
        visualStatus: 'Ready to edit',
      },
      localize: {
        eyebrow: '03 / ADAPT',
        title: 'Preview the right experience for every context',
        description: 'Review language, device, theme, typography, and layout together instead of treating them as separate handoffs.',
        points: [
          'Edit the default locale and add localized content',
          'Preview mobile, tablet, and desktop in light or dark mode',
          'Apply responsive overrides or import a design system',
        ],
        visualTitle: 'Context preview',
        visualItems: ['Five locales', 'Three breakpoints', 'Light and dark'],
        visualStatus: 'Preview in context',
      },
      validate: {
        eyebrow: '04 / VALIDATE',
        title: 'Prove the experience before it leaves the workspace',
        description: 'Run journey scenarios, audit essential accessibility requirements, and compare visual baselines before export.',
        points: [
          'Walk through a scenario step by step or autoplay the journey',
          'Catch accessibility and manifest validation issues',
          'Use visual regression and export gates to prevent incomplete handoffs',
        ],
        visualTitle: 'Release readiness',
        visualItems: ['Journey preview passed', 'Accessibility checked', 'Visual baseline matched'],
        visualStatus: 'Ready to export',
      },
    },
  },
  comparison: {
    eyebrow: 'A SHARED EXPERIENCE WORKFLOW',
    title: 'Bring design and implementation into one workspace.',
    description: 'Reduce repeated handoffs while keeping brand, accessibility, and journey context visible.',
    traditionalTitle: 'Disconnected handoffs',
    solutionBadge: 'CONNECTED WORKSPACE',
    studioTitle: 'Interface Studio',
    traditionalItems: [
      {
        title: 'Repeated implementation',
        description: 'Common interface patterns are rebuilt across separate surfaces.',
      },
      {
        title: 'Fragmented previews',
        description: 'Devices and locales are reviewed in different tools and stages.',
      },
      {
        title: 'Slower updates',
        description: 'Small experience changes depend on another delivery cycle.',
      },
    ],
    studioItems: [
      {
        title: 'Reusable composition',
        description: 'Supported blocks keep common screen patterns consistent.',
      },
      {
        title: 'Contextual preview',
        description: 'Review devices, locales, themes, and journey states together.',
      },
      {
        title: 'Controlled handoff',
        description: 'Validate the experience and export structured configuration when ready.',
      },
    ],
  },
  sync: {
    ecosystemLabel: 'ONE JOURNEY, TWO COORDINATED WORKSPACES',
    eyebrow: 'LOGIC AND EXPERIENCE IN STEP',
    title: 'Design the decision and the experience together.',
    description: 'Dynamic Flow controls what the journey does. Interface Studio controls how each step is presented. Both stay connected through the same screens, states, and outcomes.',
    flowLabel: 'Journey logic',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Define modules, conditions, routes, and outcomes that determine what happens next.',
    flowCta: 'Explore Dynamic Flow',
    studioLabel: 'Customer experience',
    studioTitle: 'Interface Studio',
    studioDescription: 'Shape screens, content, themes, responsive behavior, and localized variants for the journey.',
    studioCta: 'Open Interface Studio',
    connectionLabel: 'Always synchronized',
  },
  quality: {
    eyebrow: 'BUILT-IN RELEASE CONFIDENCE',
    title: 'Catch experience issues before export.',
    description: 'Quality checks live beside the design work, so teams can fix problems while the context is still visible.',
    items: [
      {
        title: 'Accessibility checks',
        description: 'Review essential requirements such as labels, alternative text, and readable structure.',
      },
      {
        title: 'Visual baselines',
        description: 'Capture a screen, variant, device, theme, and locale context for later comparison.',
      },
      {
        title: 'Export readiness',
        description: 'Block incomplete handoffs when interface, flow, or regression issues still need attention.',
      },
    ],
  },
  faq: {
    eyebrow: 'INTERFACE STUDIO FAQ',
    title: 'A clearer way to manage the customer-facing side of verification.',
    description: 'Answers to the questions teams usually ask before shaping their first experience.',
    items: {
      noCode: {
        question: 'Do we need to write code to design screens?',
        answer: 'No. Teams can compose screens from supported blocks, edit content, apply themes, and configure common behavior visually. Design-system import and structured export remain available when engineering teams need a deeper handoff.',
      },
      sync: {
        question: 'How does Interface Studio stay connected to Dynamic Flow?',
        answer: 'Interface Studio derives screens and supported variants from journey modules, states, and outcomes. When logic changes, teams can reconcile the experience without rebuilding the journey from scratch.',
      },
      locales: {
        question: 'Can we design for multiple languages and devices?',
        answer: 'Yes. Teams can manage a default locale and localized content, then preview mobile, tablet, and desktop with light or dark themes and responsive overrides.',
      },
      validation: {
        question: 'Can we validate the experience before export?',
        answer: 'Yes. Interface Studio combines scenario preview, manifest validation, accessibility checks, visual baselines, and export gates so incomplete experiences are visible before handoff.',
      },
    },
  },
  cta: {
    eyebrow: 'START WITH A MORE COHERENT EXPERIENCE',
    title: 'Turn journey logic into screens customers can understand and trust.',
    description: 'Open Interface Studio in the Dashboard or talk with Identra about the experience your team wants to create.',
    primaryCta: 'Open Interface Studio',
    secondaryCta: 'Talk to an expert',
  },
};

const es: InterfaceStudioPageCopy = {
  hero: {
    eyebrow: 'INTERFACE STUDIO',
    orchestrationLabel: 'ORQUESTACIÓN DE EXPERIENCIAS',
    title: 'Diseñe cada pantalla del recorrido de verificación sin perder de vista su lógica.',
    titleLines: [
      'Diseñe pantallas de verificación',
      'que reflejen su marca',
    ],
    description: 'Interface Studio convierte los pasos, estados y resultados de Dynamic Flow en una experiencia que su equipo puede diseñar, localizar, previsualizar y validar en un solo espacio.',
    descriptionLines: [
      'Convierta los pasos, estados y resultados de Dynamic Flow en una experiencia clara.',
      'Diseñe, localice, previsualice y valide cada pantalla en un solo espacio.',
    ],
    primaryCta: 'Abrir Interface Studio',
    secondaryCta: 'Hablar con un experto',
    visualAriaLabel: 'Espacio de Interface Studio con pantallas del recorrido, vista previa adaptable y ajustes de experiencia',
    visualEyebrow: 'Espacio de experiencia',
    visualStatus: 'Sincronizado con el recorrido',
    screensPanelLabel: 'Pantallas',
    canvasLabel: 'Lienzo en vivo',
    inspectorLabel: 'Inspector',
    previewLabel: 'Vista previa adaptable',
    devices: { mobile: 'Móvil', tablet: 'Tableta', desktop: 'Escritorio' },
    screens: {
      welcome: { label: 'Bienvenida', title: 'Empiece con confianza', body: 'Presente el recorrido y aclare qué ocurrirá antes de comenzar la verificación.', action: 'Iniciar verificación' },
      consent: { label: 'Consentimiento', title: 'Solicite con contexto', body: 'Explique qué se solicitará y permita que el cliente decida con información.', action: 'Revisar y continuar' },
      verification: { label: 'Verificación', title: 'Guíe la siguiente comprobación', body: 'Muestre instrucciones, progreso y estados de recuperación claros en cada paso.', action: 'Continuar de forma segura' },
      success: { label: 'Finalización', title: 'Cierre el recorrido con claridad', body: 'Confirme la finalización y dirija al cliente hacia la acción adecuada.', action: 'Continuar' },
    },
    inspectorItems: [
      { label: 'Sistema de diseño', value: 'Identra Trust' },
      { label: 'Idioma', value: 'Español' },
      { label: 'Visibilidad', value: 'Siempre visible' },
      { label: 'Punto de ruptura', value: 'Móvil' },
    ],
    workspace: {
      title: 'Espacio interactivo de Interface Studio',
      presetsLabel: 'Estilos',
      presets: {
        fintech: 'Fintech azul',
        crypto: 'Cripto oscuro',
        retail: 'Comercio',
      },
      brandColorLabel: 'Color de marca',
      cornerStyleLabel: 'Estilo de esquinas',
      cornerStyles: {
        sharp: 'Rectas',
        rounded: 'Redondeadas',
        pill: 'Cápsula',
      },
      screenStepLabel: 'Paso de pantalla',
      displayLogoLabel: 'Mostrar logotipo',
      liveCanvasLabel: 'Vista previa en vivo',
      lightModeLabel: 'claro',
      darkModeLabel: 'oscuro',
      stepLabel: 'Paso',
      fallbackBrandLabel: 'Interfaz de verificación',
      securityItems: [
        'Transferencia cifrada de documentos',
        'Controles de privacidad de datos',
      ],
      scanInstruction: 'Coloque el documento de identidad dentro del marco',
      codePanelLabel: 'Configuración de la interfaz',
      copyLabel: 'Copiar',
      copiedLabel: 'Copiado',
      generatedCodeComment: 'Configuración generada por Interface Studio',
      cssVariablesLabel: 'Tokens de diseño',
    },
    gallery: {
      eyebrow: 'PANTALLAS DEL RECORRIDO DEL CLIENTE',
      title: 'Diseñe cada pantalla que verá el cliente',
      description: 'Previsualice cada estado compatible del recorrido y adapte su contenido a la experiencia que desea ofrecer.',
      screenModelLabel: 'pantalla',
      previewBrandLabel: 'Identra Verify',
      previewStatus: 'Vista previa',
    },
  },
  benefits: {
    eyebrow: 'POR QUÉ INTERFACE STUDIO',
    title: 'Un solo lugar para diseñar la experiencia alrededor de cada decisión.',
    description: 'Ofrezca a producto, diseño, operaciones y cumplimiento una visión compartida de lo que ve el cliente.',
    items: {
      compose: { title: 'Componga pantallas con bloques reutilizables', description: 'Organice títulos, instrucciones, consentimiento, solicitudes, progreso, estados y acciones sin reconstruir patrones comunes.' },
      personalize: { title: 'Conecte el contenido con los datos del recorrido', description: 'Vincule campos de ejecución aprobados y muestre el contenido adecuado cuando se cumplan las condiciones.' },
      adapt: { title: 'Adapte idiomas, temas y dispositivos', description: 'Gestione contenido localizado, temas claro y oscuro, y ajustes adaptables mientras previsualiza el resultado.' },
      release: { title: 'Detecte problemas antes de exportar', description: 'Compruebe accesibilidad, compare referencias visuales y resuelva bloqueos antes de la entrega.' },
    },
  },
  workflow: {
    eyebrow: 'DE LA LÓGICA A LA EXPERIENCIA DEL CLIENTE',
    title: 'Mantenga cada pantalla conectada, intencional y preparada para evolucionar.',
    description: 'Interface Studio sigue la estructura de Dynamic Flow y permite controlar contenido, presentación y calidad de entrega.',
    stages: {
      connect: {
        eyebrow: '01 / CONECTAR', title: 'Parta del recorrido existente', description: 'Las pantallas y variantes permanecen asociadas con los módulos, estados y resultados definidos en Dynamic Flow.',
        points: ['Cree pantallas de bienvenida, consentimiento, módulos, proceso, éxito y error', 'Alinee variantes con estados y resultados compatibles', 'Mantenga la experiencia alineada cuando cambie la lógica'],
        visualTitle: 'Conexión del recorrido', visualItems: ['Paso vinculado', 'Variantes listas', 'Resultado conectado'], visualStatus: 'Lógica sincronizada',
      },
      build: {
        eyebrow: '02 / COMPONER', title: 'Construya cada estado con bloques reutilizables', description: 'Defina contenido y acciones, y conéctelos con datos seguros y reglas de visibilidad.',
        points: ['Organice bloques reutilizables', 'Vincule contenido dinámico con una alternativa localizada', 'Controle la visibilidad mediante condiciones'],
        visualTitle: 'Composición de pantalla', visualItems: ['Bloques de contenido', 'Vínculo dinámico', 'Reglas de visibilidad'], visualStatus: 'Lista para editar',
      },
      localize: {
        eyebrow: '03 / ADAPTAR', title: 'Previsualice la experiencia adecuada para cada contexto', description: 'Revise idioma, dispositivo, tema, tipografía y diseño como una sola experiencia.',
        points: ['Edite el idioma predeterminado y añada traducciones', 'Previsualice móvil, tableta y escritorio en claro u oscuro', 'Aplique ajustes adaptables o importe un sistema de diseño'],
        visualTitle: 'Vista por contexto', visualItems: ['Cinco idiomas', 'Tres dispositivos', 'Claro y oscuro'], visualStatus: 'Contexto visible',
      },
      validate: {
        eyebrow: '04 / VALIDAR', title: 'Compruebe la experiencia antes de entregarla', description: 'Ejecute escenarios, revise accesibilidad y compare referencias visuales antes de exportar.',
        points: ['Recorra un escenario paso a paso o automáticamente', 'Detecte problemas de accesibilidad y del manifiesto', 'Use regresión visual y bloqueos de exportación'],
        visualTitle: 'Preparación de entrega', visualItems: ['Recorrido aprobado', 'Accesibilidad revisada', 'Referencia visual coincidente'], visualStatus: 'Lista para exportar',
      },
    },
  },
  comparison: {
    eyebrow: 'UN FLUJO DE EXPERIENCIA COMPARTIDO',
    title: 'Reúna diseño e implementación en un mismo espacio.',
    description: 'Reduzca entregas repetidas sin perder de vista la marca, la accesibilidad ni el contexto del recorrido.',
    traditionalTitle: 'Entregas desconectadas',
    solutionBadge: 'ESPACIO CONECTADO',
    studioTitle: 'Interface Studio',
    traditionalItems: [
      {
        title: 'Implementación repetida',
        description: 'Los patrones comunes de interfaz se reconstruyen en superficies separadas.',
      },
      {
        title: 'Vistas previas fragmentadas',
        description: 'Los dispositivos y los idiomas se revisan en distintas herramientas y etapas.',
      },
      {
        title: 'Actualizaciones más lentas',
        description: 'Los pequeños cambios de experiencia dependen de otro ciclo de entrega.',
      },
    ],
    studioItems: [
      {
        title: 'Composición reutilizable',
        description: 'Los bloques compatibles mantienen consistentes los patrones comunes.',
      },
      {
        title: 'Vista previa contextual',
        description: 'Revise juntos dispositivos, idiomas, temas y estados del recorrido.',
      },
      {
        title: 'Entrega controlada',
        description: 'Valide la experiencia y exporte una configuración estructurada cuando esté lista.',
      },
    ],
  },
  sync: {
    ecosystemLabel: 'UN RECORRIDO, DOS ESPACIOS COORDINADOS',
    eyebrow: 'LÓGICA Y EXPERIENCIA ALINEADAS',
    title: 'Diseñe la decisión y la experiencia de forma conjunta.',
    description: 'Dynamic Flow controla lo que hace el recorrido. Interface Studio controla cómo se presenta cada paso. Ambos comparten pantallas, estados y resultados.',
    flowLabel: 'Lógica del recorrido', flowTitle: 'Dynamic Flow', flowDescription: 'Defina módulos, condiciones, rutas y resultados que determinan el siguiente paso.', flowCta: 'Explorar Dynamic Flow',
    studioLabel: 'Experiencia del cliente', studioTitle: 'Interface Studio', studioDescription: 'Diseñe pantallas, contenido, temas, comportamiento adaptable y variantes localizadas.', studioCta: 'Abrir Interface Studio',
    connectionLabel: 'Siempre sincronizados',
  },
  quality: {
    eyebrow: 'CONFIANZA INTEGRADA EN LA ENTREGA',
    title: 'Detecte problemas de experiencia antes de exportar.',
    description: 'Las comprobaciones viven junto al diseño para corregir problemas mientras el contexto sigue visible.',
    items: [
      { title: 'Comprobaciones de accesibilidad', description: 'Revise etiquetas, texto alternativo y estructura legible.' },
      { title: 'Referencias visuales', description: 'Capture pantalla, variante, dispositivo, tema e idioma para comparaciones posteriores.' },
      { title: 'Preparación de exportación', description: 'Evite entregas incompletas cuando quedan problemas de interfaz, flujo o regresión.' },
    ],
  },
  faq: {
    eyebrow: 'PREGUNTAS SOBRE INTERFACE STUDIO',
    title: 'Una forma más clara de gestionar la experiencia de verificación.',
    description: 'Respuestas a las preguntas habituales antes de diseñar la primera experiencia.',
    items: {
      noCode: { question: '¿Necesitamos código para diseñar pantallas?', answer: 'No. Los equipos pueden componer pantallas, editar contenido, aplicar temas y configurar comportamientos comunes visualmente. La importación de sistemas de diseño y la exportación estructurada facilitan una entrega más técnica cuando sea necesario.' },
      sync: { question: '¿Cómo se mantiene conectado con Dynamic Flow?', answer: 'Interface Studio deriva pantallas y variantes compatibles de los módulos, estados y resultados del recorrido. Si cambia la lógica, la experiencia puede ajustarse sin reconstruir todo.' },
      locales: { question: '¿Podemos diseñar para varios idiomas y dispositivos?', answer: 'Sí. Puede gestionar un idioma predeterminado y traducciones, y previsualizar móvil, tableta y escritorio con temas claro u oscuro y ajustes adaptables.' },
      validation: { question: '¿Podemos validar la experiencia antes de exportarla?', answer: 'Sí. Interface Studio reúne vista previa por escenarios, validación, accesibilidad, referencias visuales y bloqueos de exportación.' },
    },
  },
  cta: {
    eyebrow: 'EMPIECE CON UNA EXPERIENCIA MÁS COHERENTE',
    title: 'Convierta la lógica del recorrido en pantallas que el cliente pueda entender y confiar.',
    description: 'Abra Interface Studio en el Dashboard o hable con Identra sobre la experiencia que desea crear.',
    primaryCta: 'Abrir Interface Studio',
    secondaryCta: 'Hablar con un experto',
  },
};

const ja: InterfaceStudioPageCopy = {
  hero: {
    eyebrow: 'INTERFACE STUDIO',
    orchestrationLabel: '体験オーケストレーション',
    title: '本人確認のロジックとつながったまま、すべての画面を設計。',
    titleLines: [
      '本人確認画面をデザイン',
      'ブランドらしさをそのまま反映',
    ],
    description: 'Interface StudioはDynamic Flowのステップ、状態、結果を、設計・ローカライズ・プレビュー・検証できる顧客体験へ変換します。',
    descriptionLines: [
      'Dynamic Flowのステップ、状態、結果を、わかりやすい顧客体験へ。',
      'すべての画面を一か所で設計・翻訳・プレビュー・検証できます。',
    ],
    primaryCta: 'Interface Studioを開く',
    secondaryCta: '専門家に相談',
    visualAriaLabel: 'ジャーニー画面、レスポンシブプレビュー、体験設定を表示するInterface Studioワークスペース',
    visualEyebrow: '体験ワークスペース',
    visualStatus: 'ジャーニーと同期済み',
    screensPanelLabel: '画面',
    canvasLabel: 'ライブキャンバス',
    inspectorLabel: 'インスペクター',
    previewLabel: 'レスポンシブプレビュー',
    devices: { mobile: 'モバイル', tablet: 'タブレット', desktop: 'デスクトップ' },
    screens: {
      welcome: { label: 'ようこそ', title: '安心できるスタート', body: '本人確認を始める前に、流れと期待される内容を案内します。', action: '本人確認を開始' },
      consent: { label: '同意', title: '背景を伝えて依頼', body: '求める情報と目的を説明し、納得した上で選択できるようにします。', action: '確認して続行' },
      verification: { label: '本人確認', title: '次の確認をわかりやすく案内', body: '各ステップの手順、進捗、復旧状態を明確に表示します。', action: '安全に続行' },
      success: { label: '完了', title: '明確にジャーニーを完了', body: '完了を伝え、次に必要なアクションへ案内します。', action: '続行' },
    },
    inspectorItems: [
      { label: 'デザインシステム', value: 'Identra Trust' },
      { label: 'ロケール', value: '日本語' },
      { label: '表示条件', value: '常に表示' },
      { label: 'ブレークポイント', value: 'モバイル' },
    ],
    workspace: {
      title: 'Interface Studio インタラクティブワークスペース',
      presetsLabel: 'プリセット',
      presets: {
        fintech: 'フィンテック・ブルー',
        crypto: 'クリプト・ダーク',
        retail: 'コマース',
      },
      brandColorLabel: 'ブランドカラー',
      cornerStyleLabel: '角のスタイル',
      cornerStyles: {
        sharp: 'スクエア',
        rounded: '角丸',
        pill: 'カプセル',
      },
      screenStepLabel: '画面ステップ',
      displayLogoLabel: 'ロゴを表示',
      liveCanvasLabel: 'ライブプレビュー',
      lightModeLabel: 'ライト',
      darkModeLabel: 'ダーク',
      stepLabel: 'ステップ',
      fallbackBrandLabel: '本人確認インターフェース',
      securityItems: [
        '暗号化された書類転送',
        'データプライバシー管理',
      ],
      scanInstruction: '本人確認書類を枠内に収めてください',
      codePanelLabel: 'インターフェース設定',
      copyLabel: 'コピー',
      copiedLabel: 'コピー済み',
      generatedCodeComment: 'Interface Studioで生成された設定',
      cssVariablesLabel: 'デザイントークン',
    },
    gallery: {
      eyebrow: '顧客ジャーニー画面',
      title: '顧客が目にするすべての画面を設計',
      description: '対応するジャーニー状態をプレビューし、提供したい体験に合わせて内容を調整できます。',
      screenModelLabel: '画面',
      previewBrandLabel: 'Identra Verify',
      previewStatus: 'プレビュー',
    },
  },
  benefits: {
    eyebrow: 'INTERFACE STUDIOを選ぶ理由',
    title: '本人確認の各判断に合わせた体験を一か所で設計。',
    description: 'プロダクト、デザイン、運用、コンプライアンスが、顧客に見える内容を共通認識として扱えます。',
    items: {
      compose: { title: '再利用可能なブロックで画面を構成', description: '見出し、説明、同意、資格情報要求、進捗、状態、アクションを共通パターンから組み立てます。' },
      personalize: { title: 'ジャーニーデータとコンテンツを接続', description: '承認済みの実行時フィールドを利用し、条件に合う場合だけ適切な内容を表示します。' },
      adapt: { title: '言語、テーマ、デバイスに適応', description: '翻訳、ライト・ダークテーマ、レスポンシブ調整を同じ文脈でプレビューできます。' },
      release: { title: 'エクスポート前に問題を発見', description: 'アクセシビリティ、ビジュアル基準、ブロッキング課題を引き渡し前に確認します。' },
    },
  },
  workflow: {
    eyebrow: 'ジャーニーロジックから顧客体験へ',
    title: 'すべての画面をつなぎ、意図を保ち、変化に備える。',
    description: 'Interface StudioはDynamic Flowの構造に沿いながら、内容、表現、リリース品質を管理します。',
    stages: {
      connect: {
        eyebrow: '01 / 接続', title: '既存のジャーニーから開始', description: '画面とバリアントをDynamic Flowのモジュール、状態、結果に関連付けます。',
        points: ['開始、同意、モジュール、処理、成功、エラーの画面を用意', '対応する状態と結果にバリアントを割り当て', 'ロジック変更時も体験を整合'],
        visualTitle: 'ジャーニー接続', visualItems: ['ステップを接続', '状態を準備', '結果を関連付け'], visualStatus: 'ロジック同期済み',
      },
      build: {
        eyebrow: '02 / 構成', title: '再利用可能なブロックで各状態を設計', description: '顧客に必要な内容とアクションを、安全なデータと表示条件に接続します。',
        points: ['再利用可能なブロックを配置', 'ローカライズ済み代替文を持つ動的コンテンツを接続', 'フローとモジュール条件で表示を制御'],
        visualTitle: '画面構成', visualItems: ['コンテンツブロック', '動的バインディング', '表示ルール'], visualStatus: '編集可能',
      },
      localize: {
        eyebrow: '03 / 適応', title: '文脈ごとに適切な体験をプレビュー', description: '言語、デバイス、テーマ、文字、レイアウトを一体として確認します。',
        points: ['既定言語を編集し翻訳を追加', 'モバイル、タブレット、デスクトップを明暗テーマで確認', 'レスポンシブ調整やデザインシステムを適用'],
        visualTitle: '文脈プレビュー', visualItems: ['5言語', '3デバイス', 'ライトとダーク'], visualStatus: '文脈を確認',
      },
      validate: {
        eyebrow: '04 / 検証', title: 'ワークスペース内で体験を検証', description: 'シナリオ、アクセシビリティ、ビジュアル基準をエクスポート前に確認します。',
        points: ['シナリオを手動または自動で再生', 'アクセシビリティとマニフェストの課題を検出', 'ビジュアル回帰とエクスポートゲートで不完全な引き渡しを防止'],
        visualTitle: 'リリース準備', visualItems: ['プレビュー合格', 'アクセシビリティ確認', '基準画像一致'], visualStatus: 'エクスポート可能',
      },
    },
  },
  comparison: {
    eyebrow: '共有された体験ワークフロー',
    title: 'デザインと実装を一つのワークスペースへ。',
    description: 'ブランド、アクセシビリティ、ジャーニーの文脈を保ちながら、繰り返しの引き渡しを減らします。',
    traditionalTitle: '分断された引き渡し',
    solutionBadge: '連携ワークスペース',
    studioTitle: 'Interface Studio',
    traditionalItems: [
      {
        title: '実装の繰り返し',
        description: '共通の画面パターンを別々の環境で作り直します。',
      },
      {
        title: '分散したプレビュー',
        description: 'デバイスや言語を異なるツールと工程で確認します。',
      },
      {
        title: '更新に時間がかかる',
        description: '小さな体験変更にも次のリリース工程が必要です。',
      },
    ],
    studioItems: [
      {
        title: '再利用できる画面構成',
        description: '対応ブロックにより共通の画面パターンを一貫して保てます。',
      },
      {
        title: '文脈に沿ったプレビュー',
        description: 'デバイス、言語、テーマ、ジャーニー状態をまとめて確認できます。',
      },
      {
        title: '管理された引き渡し',
        description: '体験を検証し、準備が整ったら構造化された設定を出力します。',
      },
    ],
  },
  sync: {
    ecosystemLabel: '一つのジャーニー、連携する二つのワークスペース',
    eyebrow: 'ロジックと体験を同期',
    title: '判断と体験を一緒に設計。',
    description: 'Dynamic Flowが動作を、Interface Studioが各ステップの見せ方を管理し、画面、状態、結果を通じて連携します。',
    flowLabel: 'ジャーニーロジック', flowTitle: 'Dynamic Flow', flowDescription: '次の動作を決めるモジュール、条件、経路、結果を定義します。', flowCta: 'Dynamic Flowを見る',
    studioLabel: '顧客体験', studioTitle: 'Interface Studio', studioDescription: '画面、内容、テーマ、レスポンシブ動作、翻訳バリアントを設計します。', studioCta: 'Interface Studioを開く',
    connectionLabel: '常に同期',
  },
  quality: {
    eyebrow: '組み込みのリリース品質',
    title: 'エクスポート前に体験の問題を発見。',
    description: '設計と同じ場所で品質を確認し、文脈を保ったまま修正できます。',
    items: [
      { title: 'アクセシビリティ確認', description: 'ラベル、代替テキスト、読みやすい構造などの要件を確認します。' },
      { title: 'ビジュアル基準', description: '画面、状態、デバイス、テーマ、言語の組み合わせを保存して比較します。' },
      { title: 'エクスポート準備', description: 'インターフェース、フロー、回帰の課題が残る引き渡しを防ぎます。' },
    ],
  },
  faq: {
    eyebrow: 'INTERFACE STUDIO FAQ',
    title: '本人確認の顧客体験をより明快に管理。',
    description: '最初の体験を設計する前によく寄せられる質問です。',
    items: {
      noCode: { question: '画面設計にコードは必要ですか？', answer: '必要ありません。対応ブロックから画面を構成し、内容、テーマ、一般的な動作を視覚的に設定できます。必要に応じてデザインシステムの取り込みや構造化エクスポートも利用できます。' },
      sync: { question: 'Dynamic Flowとどう連携しますか？', answer: 'ジャーニーのモジュール、状態、結果から画面と対応バリアントを導きます。ロジックが変わっても、最初から作り直さず体験を調整できます。' },
      locales: { question: '複数言語とデバイスに対応できますか？', answer: 'はい。既定言語と翻訳を管理し、ライト・ダークテーマやレスポンシブ調整を含めて3種類のデバイスで確認できます。' },
      validation: { question: 'エクスポート前に検証できますか？', answer: 'はい。シナリオプレビュー、マニフェスト検証、アクセシビリティ、ビジュアル基準、エクスポートゲートを利用できます。' },
    },
  },
  cta: {
    eyebrow: 'より一貫した体験を始める',
    title: 'ジャーニーロジックを、顧客が理解し信頼できる画面へ。',
    description: 'DashboardでInterface Studioを開くか、作りたい体験についてIdentraにご相談ください。',
    primaryCta: 'Interface Studioを開く',
    secondaryCta: '専門家に相談',
  },
};

const de: InterfaceStudioPageCopy = {
  hero: {
    eyebrow: 'INTERFACE STUDIO',
    orchestrationLabel: 'ERLEBNIS-ORCHESTRIERUNG',
    title: 'Gestalten Sie jeden Bildschirm der Verifizierung, ohne die Logik aus dem Blick zu verlieren.',
    titleLines: [
      'Verifizierungsansichten gestalten',
      'im Look Ihrer Marke',
    ],
    description: 'Interface Studio verwandelt Schritte, Zustände und Ergebnisse aus Dynamic Flow in ein Kundenerlebnis, das Teams an einem Ort gestalten, lokalisieren, prüfen und validieren können.',
    descriptionLines: [
      'Dynamic Flow wird in Interface Studio zu einem klaren Kundenerlebnis.',
      'Gestalten, lokalisieren, prüfen und validieren Sie jede Ansicht an einem Ort.',
    ],
    primaryCta: 'Interface Studio öffnen',
    secondaryCta: 'Mit Experten sprechen',
    visualAriaLabel: 'Interface-Studio-Arbeitsbereich mit Ablaufansichten, responsiver Vorschau und Erlebniseinstellungen',
    visualEyebrow: 'Erlebnis-Arbeitsbereich',
    visualStatus: 'Mit Ablauf synchronisiert',
    screensPanelLabel: 'Ansichten',
    canvasLabel: 'Live-Arbeitsfläche',
    inspectorLabel: 'Eigenschaften',
    previewLabel: 'Responsive Vorschau',
    devices: { mobile: 'Mobil', tablet: 'Tablet', desktop: 'Desktop' },
    screens: {
      welcome: { label: 'Willkommen', title: 'Vertrauensvoll beginnen', body: 'Führen Sie in den Ablauf ein und erklären Sie, was vor der Verifizierung geschieht.', action: 'Verifizierung starten' },
      consent: { label: 'Einwilligung', title: 'Mit Kontext fragen', body: 'Erklären Sie die angeforderten Informationen und ermöglichen Sie eine informierte Entscheidung.', action: 'Prüfen und fortfahren' },
      verification: { label: 'Verifizierung', title: 'Sicher durch den nächsten Schritt führen', body: 'Zeigen Sie klare Anweisungen, Fortschritt und Wiederherstellungszustände.', action: 'Sicher fortfahren' },
      success: { label: 'Erfolg', title: 'Den Ablauf klar abschließen', body: 'Bestätigen Sie den Abschluss und führen Sie zur passenden nächsten Aktion.', action: 'Fortfahren' },
    },
    inspectorItems: [
      { label: 'Designsystem', value: 'Identra Trust' },
      { label: 'Sprache', value: 'Deutsch' },
      { label: 'Sichtbarkeit', value: 'Immer sichtbar' },
      { label: 'Breakpoint', value: 'Mobil' },
    ],
    workspace: {
      title: 'Interaktiver Interface-Studio-Arbeitsbereich',
      presetsLabel: 'Vorlagen',
      presets: {
        fintech: 'Fintech Blau',
        crypto: 'Krypto Dunkel',
        retail: 'Handel',
      },
      brandColorLabel: 'Markenfarbe',
      cornerStyleLabel: 'Eckenstil',
      cornerStyles: {
        sharp: 'Eckig',
        rounded: 'Gerundet',
        pill: 'Kapsel',
      },
      screenStepLabel: 'Ansichtsschritt',
      displayLogoLabel: 'Logo anzeigen',
      liveCanvasLabel: 'Live-Vorschau',
      lightModeLabel: 'hell',
      darkModeLabel: 'dunkel',
      stepLabel: 'Schritt',
      fallbackBrandLabel: 'Verifizierungsoberfläche',
      securityItems: [
        'Verschlüsselte Dokumentübertragung',
        'Kontrollen für den Datenschutz',
      ],
      scanInstruction: 'Positionieren Sie das Ausweisdokument innerhalb des Rahmens',
      codePanelLabel: 'Oberflächenkonfiguration',
      copyLabel: 'Kopieren',
      copiedLabel: 'Kopiert',
      generatedCodeComment: 'Von Interface Studio erzeugte Konfiguration',
      cssVariablesLabel: 'Design-Tokens',
    },
    gallery: {
      eyebrow: 'ANSICHTEN DER KUNDENREISE',
      title: 'Jede kundennahe Ansicht gezielt gestalten',
      description: 'Sehen Sie jeden unterstützten Zustand im Ablauf vorab und passen Sie die Inhalte an das gewünschte Erlebnis an.',
      screenModelLabel: 'Ansicht',
      previewBrandLabel: 'Identra Verify',
      previewStatus: 'Vorschau',
    },
  },
  benefits: {
    eyebrow: 'WARUM INTERFACE STUDIO',
    title: 'Ein Ort für das Erlebnis rund um jede Verifizierungsentscheidung.',
    description: 'Produkt, Design, Betrieb und Compliance erhalten eine gemeinsame Sicht auf jeden Kundenschritt.',
    items: {
      compose: { title: 'Ansichten aus wiederverwendbaren Blöcken', description: 'Ordnen Sie Überschriften, Hinweise, Einwilligung, Anfragen, Fortschritt, Status und Aktionen aus gemeinsamen Mustern an.' },
      personalize: { title: 'Inhalte mit Ablaufinformationen verbinden', description: 'Binden Sie freigegebene Laufzeitfelder ein und zeigen Sie Inhalte nur bei passenden Bedingungen.' },
      adapt: { title: 'An Sprachen, Themen und Geräte anpassen', description: 'Verwalten Sie Übersetzungen, helle und dunkle Themen sowie responsive Anpassungen mit Vorschau.' },
      release: { title: 'Probleme vor dem Export erkennen', description: 'Prüfen Sie Barrierefreiheit, visuelle Referenzen und blockierende Probleme vor der Übergabe.' },
    },
  },
  workflow: {
    eyebrow: 'VON DER ABLAUFLOGIK ZUM KUNDENERLEBNIS',
    title: 'Jede Ansicht verbunden, bewusst gestaltet und bereit für Veränderung.',
    description: 'Interface Studio folgt der Struktur von Dynamic Flow und gibt Teams Kontrolle über Inhalt, Darstellung und Übergabequalität.',
    stages: {
      connect: {
        eyebrow: '01 / VERBINDEN', title: 'Mit dem vorhandenen Ablauf beginnen', description: 'Ansichten und Varianten bleiben mit Modulen, Zuständen und Ergebnissen aus Dynamic Flow verbunden.',
        points: ['Ansichten für Start, Einwilligung, Module, Verarbeitung, Erfolg und Fehler erstellen', 'Varianten mit unterstützten Zuständen und Ergebnissen abgleichen', 'Das Erlebnis bei Logikänderungen synchron halten'],
        visualTitle: 'Ablaufverbindung', visualItems: ['Schritt zugeordnet', 'Varianten bereit', 'Ergebnis verbunden'], visualStatus: 'Logik synchronisiert',
      },
      build: {
        eyebrow: '02 / ZUSAMMENSTELLEN', title: 'Jeden Zustand aus klaren Blöcken erstellen', description: 'Gestalten Sie Inhalte und Aktionen und verbinden Sie sie mit sicheren Daten und Sichtbarkeitsregeln.',
        points: ['Wiederverwendbare Blöcke anordnen', 'Dynamische Inhalte mit lokalisierter Alternative binden', 'Sichtbarkeit über Ablaufbedingungen steuern'],
        visualTitle: 'Ansicht zusammenstellen', visualItems: ['Inhaltsblöcke', 'Dynamische Bindung', 'Sichtbarkeitsregeln'], visualStatus: 'Bereit zur Bearbeitung',
      },
      localize: {
        eyebrow: '03 / ANPASSEN', title: 'Das passende Erlebnis für jeden Kontext prüfen', description: 'Betrachten Sie Sprache, Gerät, Thema, Typografie und Layout gemeinsam.',
        points: ['Standardsprache bearbeiten und Übersetzungen ergänzen', 'Mobil, Tablet und Desktop in hell und dunkel prüfen', 'Responsive Anpassungen oder ein Designsystem anwenden'],
        visualTitle: 'Kontextvorschau', visualItems: ['Fünf Sprachen', 'Drei Geräte', 'Hell und dunkel'], visualStatus: 'Im Kontext prüfen',
      },
      validate: {
        eyebrow: '04 / VALIDIEREN', title: 'Das Erlebnis vor der Übergabe belegen', description: 'Führen Sie Szenarien aus, prüfen Sie Barrierefreiheit und vergleichen Sie visuelle Referenzen.',
        points: ['Szenarien schrittweise oder automatisch durchlaufen', 'Barrierefreiheits- und Manifestprobleme erkennen', 'Unvollständige Übergaben mit Regression und Export-Gates verhindern'],
        visualTitle: 'Übergabebereitschaft', visualItems: ['Vorschau bestanden', 'Barrierefreiheit geprüft', 'Referenz stimmt überein'], visualStatus: 'Bereit zum Export',
      },
    },
  },
  comparison: {
    eyebrow: 'EIN GEMEINSAMER ERLEBNIS-WORKFLOW',
    title: 'Design und Umsetzung in einem Arbeitsbereich verbinden.',
    description: 'Reduzieren Sie wiederholte Übergaben, während Marke, Barrierefreiheit und Ablaufkontext sichtbar bleiben.',
    traditionalTitle: 'Getrennte Übergaben',
    solutionBadge: 'VERBUNDENER ARBEITSBEREICH',
    studioTitle: 'Interface Studio',
    traditionalItems: [
      {
        title: 'Wiederholte Umsetzung',
        description: 'Gängige Oberflächenmuster werden in getrennten Anwendungen neu erstellt.',
      },
      {
        title: 'Verteilte Vorschauen',
        description: 'Geräte und Sprachen werden in unterschiedlichen Werkzeugen und Phasen geprüft.',
      },
      {
        title: 'Langsamere Aktualisierungen',
        description: 'Kleine Erlebnisänderungen hängen von einem weiteren Auslieferungszyklus ab.',
      },
    ],
    studioItems: [
      {
        title: 'Wiederverwendbarer Aufbau',
        description: 'Unterstützte Blöcke halten gängige Ansichtsmuster konsistent.',
      },
      {
        title: 'Kontextbezogene Vorschau',
        description: 'Prüfen Sie Geräte, Sprachen, Themen und Ablaufzustände gemeinsam.',
      },
      {
        title: 'Kontrollierte Übergabe',
        description: 'Validieren Sie das Erlebnis und exportieren Sie die strukturierte Konfiguration, wenn sie bereit ist.',
      },
    ],
  },
  sync: {
    ecosystemLabel: 'EIN ABLAUF, ZWEI KOORDINIERTE ARBEITSBEREICHE',
    eyebrow: 'LOGIK UND ERLEBNIS IM EINKLANG',
    title: 'Entscheidung und Erlebnis gemeinsam gestalten.',
    description: 'Dynamic Flow steuert, was geschieht. Interface Studio steuert, wie jeder Schritt erscheint. Beide teilen Ansichten, Zustände und Ergebnisse.',
    flowLabel: 'Ablauflogik', flowTitle: 'Dynamic Flow', flowDescription: 'Definieren Sie Module, Bedingungen, Pfade und Ergebnisse für den nächsten Schritt.', flowCta: 'Dynamic Flow entdecken',
    studioLabel: 'Kundenerlebnis', studioTitle: 'Interface Studio', studioDescription: 'Gestalten Sie Ansichten, Inhalte, Themen, responsives Verhalten und Übersetzungen.', studioCta: 'Interface Studio öffnen',
    connectionLabel: 'Immer synchron',
  },
  quality: {
    eyebrow: 'INTEGRIERTE ÜBERGABESICHERHEIT',
    title: 'Erlebnisprobleme vor dem Export erkennen.',
    description: 'Qualitätsprüfungen stehen neben dem Design, damit Probleme im sichtbaren Kontext behoben werden.',
    items: [
      { title: 'Barrierefreiheitsprüfung', description: 'Prüfen Sie Beschriftungen, Alternativtexte und eine lesbare Struktur.' },
      { title: 'Visuelle Referenzen', description: 'Erfassen Sie Ansicht, Variante, Gerät, Thema und Sprache für spätere Vergleiche.' },
      { title: 'Exportbereitschaft', description: 'Verhindern Sie Übergaben mit offenen Interface-, Flow- oder Regressionsproblemen.' },
    ],
  },
  faq: {
    eyebrow: 'INTERFACE STUDIO FAQ',
    title: 'Die Kundenseite der Verifizierung klarer verwalten.',
    description: 'Antworten auf häufige Fragen vor dem ersten Erlebnis.',
    items: {
      noCode: { question: 'Brauchen wir Code für die Gestaltung?', answer: 'Nein. Teams können Ansichten aus Blöcken erstellen, Inhalte bearbeiten, Themen anwenden und gängiges Verhalten visuell konfigurieren. Designsystem-Import und strukturierter Export unterstützen technische Übergaben.' },
      sync: { question: 'Wie bleibt Interface Studio mit Dynamic Flow verbunden?', answer: 'Ansichten und Varianten leiten sich aus Modulen, Zuständen und Ergebnissen ab. Bei Logikänderungen lässt sich das Erlebnis abgleichen, ohne neu anzufangen.' },
      locales: { question: 'Können wir mehrere Sprachen und Geräte gestalten?', answer: 'Ja. Verwalten Sie eine Standardsprache und Übersetzungen und prüfen Sie Mobil, Tablet und Desktop mit hellen oder dunklen Themen.' },
      validation: { question: 'Können wir vor dem Export validieren?', answer: 'Ja. Interface Studio kombiniert Szenariovorschau, Manifestvalidierung, Barrierefreiheit, visuelle Referenzen und Export-Gates.' },
    },
  },
  cta: {
    eyebrow: 'MIT EINEM STIMMIGEREN ERLEBNIS STARTEN',
    title: 'Verwandeln Sie Ablauflogik in Ansichten, die Kunden verstehen und denen sie vertrauen.',
    description: 'Öffnen Sie Interface Studio im Dashboard oder sprechen Sie mit Identra über das gewünschte Erlebnis.',
    primaryCta: 'Interface Studio öffnen',
    secondaryCta: 'Mit Experten sprechen',
  },
};

const vi: InterfaceStudioPageCopy = {
  hero: {
    eyebrow: 'INTERFACE STUDIO',
    orchestrationLabel: 'ĐIỀU PHỐI TRẢI NGHIỆM',
    title: 'Thiết kế từng màn hình xác minh mà không tách rời logic của hành trình.',
    titleLines: [
      'Thiết kế màn hình xác minh',
      'mang đậm dấu ấn thương hiệu',
    ],
    description: 'Interface Studio biến các bước, trạng thái và kết quả trong Dynamic Flow thành trải nghiệm khách hàng mà đội ngũ có thể thiết kế, bản địa hóa, xem trước và kiểm tra trong cùng một không gian.',
    descriptionLines: [
      'Biến logic Dynamic Flow thành trải nghiệm xác minh rõ ràng cho khách hàng.',
      'Thiết kế, bản địa hóa, xem trước và kiểm tra mọi màn hình trong cùng một không gian.',
    ],
    primaryCta: 'Mở Interface Studio',
    secondaryCta: 'Liên hệ tư vấn',
    visualAriaLabel: 'Không gian Interface Studio hiển thị danh sách màn hình, bản xem trước thích ứng và các thiết lập trải nghiệm',
    visualEyebrow: 'Không gian thiết kế trải nghiệm',
    visualStatus: 'Đã đồng bộ với hành trình',
    screensPanelLabel: 'Màn hình',
    canvasLabel: 'Khung thiết kế trực tiếp',
    inspectorLabel: 'Thuộc tính',
    previewLabel: 'Xem trước theo thiết bị',
    devices: {
      mobile: 'Di động',
      tablet: 'Máy tính bảng',
      desktop: 'Máy tính',
    },
    screens: {
      welcome: {
        label: 'Chào mừng',
        title: 'Khởi đầu bằng sự tin cậy',
        body: 'Giới thiệu hành trình và giúp khách hàng biết điều gì sẽ diễn ra trước khi xác minh.',
        action: 'Bắt đầu xác minh',
      },
      consent: {
        label: 'Đồng ý',
        title: 'Đề nghị với đầy đủ ngữ cảnh',
        body: 'Giải thích thông tin cần thu thập để khách hàng có thể đưa ra lựa chọn rõ ràng.',
        action: 'Xem lại và tiếp tục',
      },
      verification: {
        label: 'Xác minh',
        title: 'Hướng dẫn rõ bước kiểm tra tiếp theo',
        body: 'Hiển thị hướng dẫn, tiến trình và cách xử lý khi có sự cố ở từng bước xác minh.',
        action: 'Tiếp tục an toàn',
      },
      success: {
        label: 'Hoàn tất',
        title: 'Khép lại hành trình một cách rõ ràng',
        body: 'Xác nhận hoàn tất và hướng khách hàng đến đúng hành động tiếp theo.',
        action: 'Tiếp tục',
      },
    },
    inspectorItems: [
      { label: 'Hệ thống thiết kế', value: 'Identra Trust' },
      { label: 'Ngôn ngữ', value: 'Tiếng Việt' },
      { label: 'Điều kiện hiển thị', value: 'Luôn hiển thị' },
      { label: 'Thiết bị', value: 'Di động' },
    ],
    workspace: {
      title: 'Không gian Interface Studio tương tác',
      presetsLabel: 'Mẫu giao diện',
      presets: {
        fintech: 'Tài chính xanh',
        crypto: 'Tiền số tối',
        retail: 'Thương mại',
      },
      brandColorLabel: 'Màu thương hiệu',
      cornerStyleLabel: 'Kiểu bo góc',
      cornerStyles: {
        sharp: 'Vuông',
        rounded: 'Bo tròn',
        pill: 'Viên thuốc',
      },
      screenStepLabel: 'Bước màn hình',
      displayLogoLabel: 'Hiển thị logo',
      liveCanvasLabel: 'Bản xem trước trực tiếp',
      lightModeLabel: 'sáng',
      darkModeLabel: 'tối',
      stepLabel: 'Bước',
      fallbackBrandLabel: 'Giao diện xác minh',
      securityItems: [
        'Truyền tài liệu đã mã hóa',
        'Kiểm soát quyền riêng tư dữ liệu',
      ],
      scanInstruction: 'Đặt giấy tờ tùy thân nằm gọn trong khung',
      codePanelLabel: 'Cấu hình giao diện',
      copyLabel: 'Sao chép',
      copiedLabel: 'Đã sao chép',
      generatedCodeComment: 'Cấu hình do Interface Studio tạo',
      cssVariablesLabel: 'Biến thiết kế',
    },
    gallery: {
      eyebrow: 'MÀN HÌNH TRONG HÀNH TRÌNH KHÁCH HÀNG',
      title: 'Thiết kế trọn vẹn từng màn hình khách hàng nhìn thấy',
      description: 'Xem trước từng trạng thái được hỗ trợ trong hành trình và điều chỉnh nội dung theo trải nghiệm bạn muốn mang đến.',
      screenModelLabel: 'màn hình',
      previewBrandLabel: 'Identra Verify',
      previewStatus: 'Bản xem trước',
    },
  },
  benefits: {
    eyebrow: 'VÌ SAO NÊN DÙNG INTERFACE STUDIO',
    title: 'Một nơi để định hình trải nghiệm quanh từng quyết định xác minh.',
    description: 'Giúp đội ngũ sản phẩm, thiết kế, vận hành và tuân thủ cùng nhìn thấy những gì khách hàng trải nghiệm ở mỗi bước.',
    items: {
      compose: {
        title: 'Dựng màn hình từ các khối có thể tái sử dụng',
        description: 'Sắp xếp tiêu đề, hướng dẫn, đồng ý, yêu cầu thông tin, tiến trình, trạng thái và hành động mà không phải xây lại mẫu quen thuộc.',
      },
      personalize: {
        title: 'Kết nối nội dung với dữ liệu hành trình',
        description: 'Liên kết các trường dữ liệu runtime được phép sử dụng và chỉ hiển thị nội dung khi điều kiện phù hợp.',
      },
      adapt: {
        title: 'Thích ứng theo ngôn ngữ và thiết bị',
        description: 'Quản lý bản dịch, giao diện sáng hoặc tối và cấu hình riêng theo kích thước màn hình trong cùng bản xem trước.',
      },
      release: {
        title: 'Phát hiện vấn đề trước khi xuất bản',
        description: 'Kiểm tra khả năng tiếp cận, so sánh mốc giao diện và xử lý lỗi chặn trước khi bàn giao trải nghiệm.',
      },
    },
  },
  workflow: {
    eyebrow: 'TỪ LOGIC HÀNH TRÌNH ĐẾN TRẢI NGHIỆM KHÁCH HÀNG',
    title: 'Giữ mọi màn hình luôn kết nối, có chủ đích và sẵn sàng thay đổi.',
    description: 'Interface Studio bám theo cấu trúc của Dynamic Flow, đồng thời trao cho đội ngũ quyền kiểm soát nội dung, cách hiển thị và chất lượng trước khi bàn giao.',
    stages: {
      connect: {
        eyebrow: '01 / KẾT NỐI',
        title: 'Bắt đầu từ hành trình đã có',
        description: 'Màn hình và biến thể luôn gắn với mô-đun, trạng thái và kết quả được định nghĩa trong Dynamic Flow.',
        points: [
          'Tạo màn hình chào mừng, đồng ý, mô-đun, xử lý, thành công và lỗi',
          'Ghép biến thể giao diện với trạng thái và kết quả được hỗ trợ',
          'Giữ trải nghiệm đồng bộ khi logic hành trình thay đổi',
        ],
        visualTitle: 'Kết nối hành trình',
        visualItems: ['Đã ghép bước xử lý', 'Đã chuẩn bị biến thể', 'Đã liên kết kết quả'],
        visualStatus: 'Logic đã đồng bộ',
      },
      build: {
        eyebrow: '02 / XÂY DỰNG',
        title: 'Tạo từng trạng thái từ các khối rõ ràng, có thể dùng lại',
        description: 'Thiết kế nội dung và hành động khách hàng cần, sau đó kết nối với dữ liệu an toàn và quy tắc hiển thị.',
        points: [
          'Sắp xếp các khối nội dung và tương tác có thể tái sử dụng',
          'Liên kết nội dung động cùng phương án dự phòng đã bản địa hóa',
          'Điều khiển hiển thị bằng điều kiện của luồng và mô-đun',
        ],
        visualTitle: 'Xây dựng màn hình',
        visualItems: ['Khối nội dung', 'Liên kết dữ liệu động', 'Quy tắc hiển thị'],
        visualStatus: 'Sẵn sàng chỉnh sửa',
      },
      localize: {
        eyebrow: '03 / THÍCH ỨNG',
        title: 'Xem đúng trải nghiệm trong từng bối cảnh',
        description: 'Kiểm tra ngôn ngữ, thiết bị, giao diện, kiểu chữ và bố cục cùng nhau thay vì tách thành nhiều lần bàn giao.',
        points: [
          'Chỉnh sửa ngôn ngữ mặc định và bổ sung nội dung bản địa hóa',
          'Xem trước trên di động, máy tính bảng và máy tính với giao diện sáng hoặc tối',
          'Áp dụng cấu hình thích ứng hoặc nhập hệ thống thiết kế',
        ],
        visualTitle: 'Xem trước theo bối cảnh',
        visualItems: ['Năm ngôn ngữ', 'Ba loại thiết bị', 'Giao diện sáng và tối'],
        visualStatus: 'Đang xem đúng bối cảnh',
      },
      validate: {
        eyebrow: '04 / KIỂM TRA',
        title: 'Kiểm chứng trải nghiệm trước khi rời không gian làm việc',
        description: 'Chạy kịch bản hành trình, kiểm tra các yêu cầu tiếp cận thiết yếu và so sánh mốc giao diện trước khi xuất bản.',
        points: [
          'Đi qua từng bước của kịch bản hoặc tự động phát toàn bộ hành trình',
          'Phát hiện lỗi khả năng tiếp cận và cấu trúc giao diện',
          'Dùng so sánh giao diện và điều kiện xuất bản để ngăn bàn giao thiếu sót',
        ],
        visualTitle: 'Mức độ sẵn sàng',
        visualItems: ['Bản xem trước đạt', 'Đã kiểm tra tiếp cận', 'Mốc giao diện khớp'],
        visualStatus: 'Sẵn sàng xuất bản',
      },
    },
  },
  comparison: {
    eyebrow: 'QUY TRÌNH THIẾT KẾ TRẢI NGHIỆM THỐNG NHẤT',
    title: 'Kết nối thiết kế và triển khai trong cùng một không gian.',
    description: 'Giảm các vòng bàn giao lặp lại mà vẫn theo sát thương hiệu, khả năng tiếp cận và ngữ cảnh hành trình.',
    traditionalTitle: 'Bàn giao rời rạc',
    solutionBadge: 'KHÔNG GIAN KẾT NỐI',
    studioTitle: 'Interface Studio',
    traditionalItems: [
      {
        title: 'Triển khai lặp lại',
        description: 'Các mẫu giao diện quen thuộc phải được dựng lại trên nhiều bề mặt riêng biệt.',
      },
      {
        title: 'Xem trước phân tán',
        description: 'Thiết bị và ngôn ngữ được kiểm tra bằng nhiều công cụ ở các giai đoạn khác nhau.',
      },
      {
        title: 'Cập nhật chậm hơn',
        description: 'Một thay đổi nhỏ về trải nghiệm vẫn phụ thuộc vào chu kỳ phát hành tiếp theo.',
      },
    ],
    studioItems: [
      {
        title: 'Cấu trúc có thể tái sử dụng',
        description: 'Các khối được hỗ trợ giữ cho những mẫu màn hình phổ biến luôn nhất quán.',
      },
      {
        title: 'Xem trước đúng ngữ cảnh',
        description: 'Kiểm tra đồng thời thiết bị, ngôn ngữ, giao diện và trạng thái hành trình.',
      },
      {
        title: 'Bàn giao có kiểm soát',
        description: 'Kiểm tra trải nghiệm và xuất cấu hình có cấu trúc khi mọi thứ đã sẵn sàng.',
      },
    ],
  },
  sync: {
    ecosystemLabel: 'MỘT HÀNH TRÌNH, HAI KHÔNG GIAN ĐỒNG BỘ',
    eyebrow: 'LOGIC VÀ TRẢI NGHIỆM LUÔN SONG HÀNH',
    title: 'Thiết kế quyết định và trải nghiệm cùng nhau.',
    description: 'Dynamic Flow quản lý hành trình thực hiện điều gì. Interface Studio quản lý từng bước được trình bày ra sao. Hai phần kết nối qua cùng hệ thống màn hình, trạng thái và kết quả.',
    flowLabel: 'Logic hành trình',
    flowTitle: 'Dynamic Flow',
    flowDescription: 'Định nghĩa mô-đun, điều kiện, hướng xử lý và kết quả quyết định bước tiếp theo.',
    flowCta: 'Tìm hiểu Dynamic Flow',
    studioLabel: 'Trải nghiệm khách hàng',
    studioTitle: 'Interface Studio',
    studioDescription: 'Thiết kế màn hình, nội dung, giao diện, cách thích ứng và biến thể theo ngôn ngữ.',
    studioCta: 'Mở Interface Studio',
    connectionLabel: 'Luôn đồng bộ',
  },
  quality: {
    eyebrow: 'KIỂM SOÁT CHẤT LƯỢNG NGAY TRONG QUY TRÌNH',
    title: 'Phát hiện vấn đề trải nghiệm trước khi xuất bản.',
    description: 'Các bước kiểm tra nằm ngay cạnh phần thiết kế để đội ngũ sửa lỗi khi vẫn nhìn thấy đầy đủ bối cảnh.',
    items: [
      {
        title: 'Kiểm tra khả năng tiếp cận',
        description: 'Rà soát nhãn, văn bản thay thế và cấu trúc nội dung dễ đọc.',
      },
      {
        title: 'Mốc so sánh giao diện',
        description: 'Lưu màn hình, biến thể, thiết bị, giao diện và ngôn ngữ làm cơ sở so sánh.',
      },
      {
        title: 'Mức độ sẵn sàng xuất bản',
        description: 'Ngăn bàn giao khi vẫn còn lỗi giao diện, luồng xử lý hoặc sai lệch so với mốc.',
      },
    ],
  },
  faq: {
    eyebrow: 'CÂU HỎI VỀ INTERFACE STUDIO',
    title: 'Cách rõ ràng hơn để quản lý phần trải nghiệm của hành trình xác minh.',
    description: 'Những điều đội ngũ thường muốn biết trước khi thiết kế trải nghiệm đầu tiên.',
    items: {
      noCode: {
        question: 'Có cần lập trình để thiết kế màn hình không?',
        answer: 'Không. Đội ngũ có thể dựng màn hình từ các khối được hỗ trợ, chỉnh sửa nội dung, áp dụng giao diện và cấu hình hành vi phổ biến bằng công cụ trực quan. Khi cần bàn giao sâu hơn cho kỹ thuật, hệ thống vẫn hỗ trợ nhập hệ thống thiết kế và xuất dữ liệu có cấu trúc.',
      },
      sync: {
        question: 'Interface Studio đồng bộ với Dynamic Flow như thế nào?',
        answer: 'Interface Studio tạo màn hình và biến thể phù hợp từ mô-đun, trạng thái và kết quả của hành trình. Khi logic thay đổi, đội ngũ có thể điều chỉnh lại trải nghiệm mà không phải xây dựng từ đầu.',
      },
      locales: {
        question: 'Có thể thiết kế cho nhiều ngôn ngữ và thiết bị không?',
        answer: 'Có. Đội ngũ có thể quản lý ngôn ngữ mặc định và nội dung bản địa hóa, sau đó xem trước trên di động, máy tính bảng và máy tính với giao diện sáng, tối và cấu hình thích ứng.',
      },
      validation: {
        question: 'Có thể kiểm tra trải nghiệm trước khi xuất bản không?',
        answer: 'Có. Interface Studio kết hợp xem trước theo kịch bản, kiểm tra cấu trúc, khả năng tiếp cận, mốc so sánh giao diện và điều kiện xuất bản để làm rõ mọi điểm chưa hoàn chỉnh trước khi bàn giao.',
      },
    },
  },
  cta: {
    eyebrow: 'BẮT ĐẦU VỚI MỘT TRẢI NGHIỆM NHẤT QUÁN HƠN',
    title: 'Biến logic hành trình thành những màn hình khách hàng có thể hiểu và tin cậy.',
    description: 'Mở Interface Studio trong Dashboard hoặc trao đổi với Identra về trải nghiệm đội ngũ muốn xây dựng.',
    primaryCta: 'Mở Interface Studio',
    secondaryCta: 'Liên hệ tư vấn',
  },
};

export const INTERFACE_STUDIO_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<Locale, InterfaceStudioPageCopy>;

// Kept as a compatibility export for existing translation consumers.
export const interfaceStudioPageTranslations = INTERFACE_STUDIO_TRANSLATIONS;
