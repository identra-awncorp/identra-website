import type { Locale } from '../types/routes';

export const CREDENTIAL_ISSUANCE_BENEFIT_IDS = [
  'modules',
  'constraints',
  'delivery',
  'lifecycle',
] as const;
export const CREDENTIAL_ISSUANCE_JOURNEY_IDS = [
  'compose',
  'connect',
  'issue',
  'operate',
] as const;
export const CREDENTIAL_ISSUANCE_FAQ_IDS = [
  'code',
  'thirdParty',
  'custody',
  'wallets',
] as const;

export type CredentialIssuanceBenefitId =
  typeof CREDENTIAL_ISSUANCE_BENEFIT_IDS[number];
export type CredentialIssuanceJourneyId =
  typeof CREDENTIAL_ISSUANCE_JOURNEY_IDS[number];
export type CredentialIssuanceFaqId =
  typeof CREDENTIAL_ISSUANCE_FAQ_IDS[number];

type TitleDescription = {
  readonly title: string;
  readonly description: string;
};

export type CredentialIssuancePageCopy = {
  readonly hero: {
    readonly titleLines: readonly [string, string];
    readonly description: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly visualAriaLabel: string;
    readonly visualEyebrow: string;
    readonly visualTitle: string;
    readonly source: string;
    readonly module: string;
    readonly signer: string;
    readonly delivery: string;
    readonly wallet: string;
    readonly preferred: string;
    readonly additional: string;
    readonly chips: readonly [string, string, string, string];
  };
  readonly benefits: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<CredentialIssuanceBenefitId, TitleDescription>;
  };
  readonly journey: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly stages: Record<
      CredentialIssuanceJourneyId,
      TitleDescription & {
        readonly eyebrow: string;
        readonly points: readonly [string, string, string];
      }
    >;
  };
  readonly trust: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly managedLabel: string;
    readonly managed: TitleDescription & { readonly points: readonly [string, string, string] };
    readonly selfManagedLabel: string;
    readonly selfManaged: TitleDescription & { readonly points: readonly [string, string, string] };
    readonly registryTitle: string;
    readonly registryDescription: string;
  };
  readonly ecosystem: {
    readonly label: string;
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly flow: TitleDescription;
    readonly api: TitleDescription;
    readonly outputLabel: string;
    readonly output: string;
  };
  readonly useCases: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly education: TitleDescription & { readonly detail: string };
    readonly banking: TitleDescription & { readonly detail: string };
  };
  readonly standards: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly note: string;
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: Record<CredentialIssuanceFaqId, TitleDescription>;
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly primary: string;
    readonly secondary: string;
  };
};

export const CREDENTIAL_ISSUANCE_TRANSLATIONS = {
  en: {
    hero: {
      titleLines: [
        'Issue trusted credentials.',
        'Make verified results reusable.',
      ],
      description:
        'Issue verifiable credentials from the systems you already use. Identra helps organizations move from a trusted result to a credential people can receive, keep, and reuse.',
      primaryCta: 'Explore the API & SDK',
      secondaryCta: 'Talk to an expert',
      visualAriaLabel:
        'Credential issuance journey from a verified result to a compatible wallet',
      visualEyebrow: 'Issuance journey',
      visualTitle: 'From verified result to reusable proof',
      source: 'Verified result',
      module: 'Issuance module',
      signer: 'DID & signing',
      delivery: 'OpenID4VCI',
      wallet: 'Compatible wallet',
      preferred: 'QR / deep link',
      additional: 'DIDComm optional',
      chips: ['Fast integration', 'Your trust network', 'Wallet choice', 'Lifecycle controls'],
    },
    benefits: {
      eyebrow: 'Why Credential Issuance',
      title: 'A practical path from verification to portable trust',
      description:
        'Give teams the controls they need to issue credible, reusable credentials without hiding the trust decisions that make them valuable.',
      items: {
        modules: {
          title: 'Issue from your own products',
          description:
            'Use the API or SDK to add credential issuance to an existing service without rebuilding the user journey around a separate workspace.',
        },
        constraints: {
          title: 'Choose the trust network',
          description:
            'Use CertNet or connect a blockchain, ledger, or registry selected by your organization and its governance requirements.',
        },
        delivery: {
          title: 'Reach the wallet people choose',
          description:
            'Prioritize OpenID4VCI through QR and deep links for Identra Wallet and compatible external wallets.',
        },
        lifecycle: {
          title: 'Operate beyond the first issue',
          description:
            'Manage module versions, issuance history, status changes, suspension, revocation, expiry, and audit events.',
        },
      },
    },
    journey: {
      eyebrow: 'How it works',
      title: 'One issuance model, two ways to put it into operation',
      description:
        'Integrate directly through the API and SDK, with Dynamic Flow available as an additional channel when issuance belongs inside a verification journey.',
      stages: {
        compose: {
          eyebrow: '01 · Connect',
          title: 'Connect a trusted business result',
          description:
            'Choose the approved result or business event that should lead to a credential.',
          points: [
            'Use results from your existing systems',
            'Define who may receive the credential',
            'Keep issuance policy consistent',
          ],
        },
        connect: {
          eyebrow: '02 · Integrate',
          title: 'Add issuance through the API or SDK',
          description:
            'Create a clear issuance journey inside the product your customers already use.',
          points: [
            'Start from an API call or SDK action',
            'Use Dynamic Flow as an optional channel',
            'Keep the holder experience familiar',
          ],
        },
        issue: {
          eyebrow: '03 · Issue',
          title: 'Sign and deliver with the right trust model',
          description:
            'Use Identra-managed signing or connect infrastructure under your control.',
          points: [
            'Publish DID Documents through a registry adapter',
            'Prioritize OpenID4VCI delivery',
            'Offer DIDComm when the journey requires it',
          ],
        },
        operate: {
          eyebrow: '04 · Operate',
          title: 'Manage the complete lifecycle',
          description:
            'Keep every module and issued credential understandable after launch.',
          points: [
            'Track drafts, releases, deprecation, and archives',
            'Suspend, revoke, or expire issued credentials',
            'Review issuance history and audit events',
          ],
        },
      },
    },
    trust: {
      eyebrow: 'Your trust model',
      title: 'Managed convenience or infrastructure you control',
      description:
        'Choose the operating model that fits your security responsibilities without changing the holder experience.',
      managedLabel: 'Identra-managed',
      managed: {
        title: 'Launch with a managed foundation',
        description:
          'Identra can manage the core issuance operations so your team can focus on the service and the people receiving credentials.',
        points: [
          'A shorter path from integration to issuance',
          'Managed identity and signing operations',
          'Guided status and lifecycle management',
        ],
      },
      selfManagedLabel: 'Self-managed',
      selfManaged: {
        title: 'Keep signing authority in your environment',
        description:
          'Connect a KMS, HSM, or external signer while Identra coordinates modules, delivery, and lifecycle workflows.',
        points: [
          'Private keys remain outside Identra',
          'Connect supported signing infrastructure',
          'Choose did:web, ION, or an internal registry',
        ],
      },
      registryTitle: 'Registry and network choice',
      registryDescription:
        'Start with CertNet or connect a blockchain, ledger, or registry chosen by your organization. The right option depends on governance, interoperability, and operating requirements.',
    },
    ecosystem: {
      label: 'API and SDK at the core',
      eyebrow: 'Built for your operating model',
      title: 'Bring credential issuance into the services people already use',
      description:
        'Engineering teams integrate issuance directly, while Dynamic Flow remains available when a credential should be issued as part of a verification journey.',
      flow: {
        title: 'Dynamic Flow',
        description:
          'Use it as an additional channel when issuance follows an approved verification outcome.',
      },
      api: {
        title: 'API & SDK',
        description:
          'Create issuance sessions, connect signing infrastructure, deliver offers, and manage status from your own system.',
      },
      outputLabel: 'Shared outcome',
      output: 'A trusted credential ready for the holder’s wallet',
    },
    useCases: {
      eyebrow: 'Designed for real reuse',
      title: 'Issue proof that keeps working after the first interaction',
      description:
        'Credential Issuance helps organizations turn a completed decision into portable evidence the holder can present again.',
      education: {
        title: 'Education credentials',
        description:
          'Issue degrees, certificates, and verified learning outcomes directly to a learner’s wallet.',
        detail: 'Institution-issued · Holder-controlled · Easy to present',
      },
      banking: {
        title: 'Reusable bank KYC',
        description:
          'Convert an approved KYC result into a credential customers can reuse in a permissioned journey.',
        detail: 'Based on verified results · Status-aware · Auditable',
      },
    },
    standards: {
      label: 'Standards direction',
      title: 'Built toward an interoperable credential ecosystem',
      description:
        'Our direction follows W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc, and OpenID4VCI.',
      note:
        'These standards describe product direction and interoperability goals; they are not a statement that every profile is production-ready today.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions before you issue',
      description:
        'Understand where configuration ends, who controls signing, and how credentials reach a wallet.',
      items: {
        code: {
          title: 'Does integration require development work?',
          description:
            'The API and SDK path is designed for engineering teams. Dynamic Flow is an additional option for teams that want issuance inside a configured verification journey.',
        },
        thirdParty: {
          title: 'Can I issue from an existing verification result?',
          description:
            'Yes. An approved KYC, education, membership, or other trusted result can trigger issuance when it meets the policy defined by your organization.',
        },
        custody: {
          title: 'Who controls issuer keys?',
          description:
            'You can choose Identra-managed custody or connect your own KMS, HSM, or external signer so private keys remain in your environment.',
        },
        wallets: {
          title: 'Does issuance only work with Identra Wallet?',
          description:
            'Identra Wallet is the preferred experience, while OpenID4VCI is intended to support compatible external wallets as well. DIDComm remains an additional option.',
        },
      },
    },
    cta: {
      eyebrow: 'Credential Issuance',
      title: 'Turn the next verified result into reusable proof',
      description:
        'Review the integration overview or talk with Identra about the credential journey your organization wants to launch.',
      primary: 'Explore the API & SDK',
      secondary: 'Talk to an expert',
    },
  },
  es: {
    hero: {
      titleLines: ['Emite credenciales confiables.', 'Haz reutilizables los resultados verificados.'],
      description:
        'Emite credenciales verificables desde los sistemas que ya utilizas. Identra ayuda a convertir un resultado confiable en una credencial que las personas pueden recibir, guardar y reutilizar.',
      primaryCta: 'Explorar API y SDK',
      secondaryCta: 'Hablar con un asesor',
      visualAriaLabel: 'Recorrido de emisión desde un resultado verificado hasta una billetera compatible',
      visualEyebrow: 'Recorrido de emisión',
      visualTitle: 'Del resultado verificado a una prueba reutilizable',
      source: 'Resultado verificado',
      module: 'Módulo de emisión',
      signer: 'DID y firma',
      delivery: 'OpenID4VCI',
      wallet: 'Billetera compatible',
      preferred: 'QR / enlace profundo',
      additional: 'DIDComm opcional',
      chips: ['Integración ágil', 'Tu red de confianza', 'Elección de billetera', 'Control del ciclo de vida'],
    },
    benefits: {
      eyebrow: 'Por qué Credential Issuance',
      title: 'Un camino práctico de la verificación a la confianza portátil',
      description: 'Ofrece a los equipos control para emitir credenciales valiosas sin ocultar las decisiones de confianza que las respaldan.',
      items: {
        modules: { title: 'Emitir desde tus propios productos', description: 'Usa la API o el SDK para incorporar la emisión de credenciales a un servicio existente, sin trasladar la experiencia a un espacio de trabajo independiente.' },
        constraints: { title: 'Elegir la red de confianza', description: 'Utiliza CertNet o conecta la cadena de bloques, el libro mayor o el registro que elija tu organización según sus requisitos de gobernanza.' },
        delivery: { title: 'Llegar a la billetera elegida', description: 'Prioriza OpenID4VCI mediante QR y enlaces profundos para Identra Wallet y billeteras externas compatibles.' },
        lifecycle: { title: 'Operar más allá de la emisión', description: 'Gestiona versiones, historial, estado, suspensión, revocación, caducidad y auditorías.' },
      },
    },
    journey: {
      eyebrow: 'Cómo funciona',
      title: 'Un modelo de emisión, dos formas de ponerlo en marcha',
      description: 'Integra directamente mediante la API y el SDK. Dynamic Flow queda disponible como canal adicional cuando la emisión forma parte de un recorrido de verificación.',
      stages: {
        compose: { eyebrow: '01 · Conectar', title: 'Conectar un resultado de negocio confiable', description: 'Elige el resultado aprobado o el evento de negocio que debe generar una credencial.', points: ['Usar resultados de tus sistemas actuales', 'Definir quién puede recibir la credencial', 'Mantener una política de emisión coherente'] },
        connect: { eyebrow: '02 · Integrar', title: 'Añadir la emisión mediante API o SDK', description: 'Incorpora un recorrido de emisión claro al producto que tus clientes ya utilizan.', points: ['Iniciar desde una llamada API o una acción del SDK', 'Usar Dynamic Flow como canal opcional', 'Mantener una experiencia familiar para el titular'] },
        issue: { eyebrow: '03 · Emitir', title: 'Firmar y entregar con el modelo adecuado', description: 'Usa firma gestionada por Identra o infraestructura bajo tu control.', points: ['Publicar DID Documents con un adaptador', 'Priorizar la entrega OpenID4VCI', 'Ofrecer DIDComm cuando sea necesario'] },
        operate: { eyebrow: '04 · Operar', title: 'Gestionar todo el ciclo de vida', description: 'Mantén comprensible cada módulo y credencial después del lanzamiento.', points: ['Controlar borradores, versiones y archivo', 'Suspender, revocar o dejar caducar', 'Revisar historial y auditorías'] },
      },
    },
    trust: {
      eyebrow: 'Tu modelo de confianza',
      title: 'Comodidad gestionada o infraestructura propia',
      description: 'Elige el modelo operativo que responde a tus obligaciones de seguridad sin cambiar la experiencia del titular.',
      managedLabel: 'Gestionado por Identra',
      managed: { title: 'Empieza con una base gestionada', description: 'Identra puede encargarse de las operaciones esenciales de emisión para que tu equipo se concentre en el servicio y en quienes reciben las credenciales.', points: ['Un camino más corto de la integración a la emisión', 'Identidad y firma gestionadas', 'Gestión guiada del estado y el ciclo de vida'] },
      selfManagedLabel: 'Autogestionado',
      selfManaged: { title: 'Conserva la autoridad de firma', description: 'Conecta KMS, HSM o un firmante externo mientras Identra coordina módulos y entrega.', points: ['Las claves privadas quedan fuera de Identra', 'Infraestructura de firma compatible', 'did:web, ION o registro interno'] },
      registryTitle: 'Elección de red y registro',
      registryDescription: 'La organización puede empezar con CertNet o conectar la cadena de bloques, el libro mayor o el registro que responda a sus requisitos de gobernanza e interoperabilidad.',
    },
    ecosystem: {
      label: 'API y SDK como núcleo',
      eyebrow: 'Adaptado a tu operación',
      title: 'Lleva la emisión a los servicios que las personas ya utilizan',
      description: 'Los equipos de desarrollo integran la emisión directamente, mientras Dynamic Flow sigue disponible cuando debe formar parte de un recorrido de verificación.',
      flow: { title: 'Dynamic Flow', description: 'Úsalo como canal adicional cuando la emisión sigue a un resultado de verificación aprobado.' },
      api: { title: 'API y SDK', description: 'Crea sesiones, conecta la firma, entrega ofertas y gestiona estados desde tu sistema.' },
      outputLabel: 'Resultado compartido',
      output: 'Una credencial confiable lista para la billetera del titular',
    },
    useCases: {
      eyebrow: 'Creado para reutilizar',
      title: 'Emite pruebas que siguen siendo útiles',
      description: 'Convierte una decisión completada en evidencia portátil que el titular puede volver a presentar.',
      education: { title: 'Credenciales educativas', description: 'Emite títulos, certificados y resultados de aprendizaje verificados a la billetera del estudiante.', detail: 'Emitido por la institución · Controlado por el titular · Fácil de presentar' },
      banking: { title: 'KYC bancario reutilizable', description: 'Convierte un KYC aprobado en una credencial reutilizable dentro de recorridos autorizados.', detail: 'Basado en resultados verificados · Estado actualizado · Auditable' },
    },
    standards: {
      label: 'Dirección de estándares',
      title: 'Hacia un ecosistema interoperable',
      description: 'Nuestra dirección sigue W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc y OpenID4VCI.',
      note: 'Estos estándares expresan objetivos de producto e interoperabilidad; no indican que cada perfil esté listo para producción.',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que conviene saber antes de emitir',
      description: 'Aclara los límites de configuración, el control de firma y la entrega a billeteras.',
      items: {
        code: { title: '¿La integración requiere desarrollo?', description: 'La vía de API y SDK está pensada para equipos técnicos. Dynamic Flow es una opción adicional para emitir dentro de un recorrido de verificación configurado.' },
        thirdParty: { title: '¿Puedo emitir a partir de un resultado de verificación existente?', description: 'Sí. Un KYC aprobado, un resultado educativo, una membresía u otro resultado confiable puede activar la emisión si cumple la política de tu organización.' },
        custody: { title: '¿Quién controla las claves?', description: 'Elige custodia gestionada por Identra o conecta KMS, HSM o firmante externo para mantener las claves en tu entorno.' },
        wallets: { title: '¿Solo funciona con Identra Wallet?', description: 'Identra Wallet es la experiencia preferente, pero OpenID4VCI también está orientado a billeteras externas compatibles. DIDComm es adicional.' },
      },
    },
    cta: {
      eyebrow: 'Credential Issuance',
      title: 'Convierte el próximo resultado verificado en prueba reutilizable',
      description: 'Revisa la integración o habla con Identra sobre el recorrido de credenciales que tu organización quiere lanzar.',
      primary: 'Explorar API y SDK',
      secondary: 'Hablar con un asesor',
    },
  },
  ja: {
    hero: {
      titleLines: ['信頼できるクレデンシャルを発行。', '検証結果を再利用可能に。'],
      description: '現在利用しているシステムから検証可能なクレデンシャルを発行できます。Identraは、信頼できる結果を本人が受け取り、保存し、再利用できる形へつなげます。',
      primaryCta: 'API・SDKを見る',
      secondaryCta: '導入について相談する',
      visualAriaLabel: '検証済み結果から対応ウォレットまでの発行フロー',
      visualEyebrow: '発行フロー',
      visualTitle: '検証済み結果を再利用可能な証明へ',
      source: '検証済み結果',
      module: '発行モジュール',
      signer: 'DIDと署名',
      delivery: 'OpenID4VCI',
      wallet: '対応ウォレット',
      preferred: 'QR / ディープリンク',
      additional: 'DIDCommは任意',
      chips: ['すばやく連携', '信頼ネットワークを選択', 'ウォレットを選択', 'ライフサイクル管理'],
    },
    benefits: {
      eyebrow: 'Credential Issuanceの特長',
      title: '検証から持ち運べる信頼へ',
      description: 'クレデンシャルの価値を支える信頼条件を守りながら、発行に必要なコントロールをチームに提供します。',
      items: {
        modules: { title: '既存の製品からそのまま発行', description: 'APIやSDKを使い、別のワークスペースへ利用者を移動させることなく、現在のサービスにクレデンシャル発行を組み込めます。' },
        constraints: { title: '信頼ネットワークを選択', description: 'CertNetのほか、組織のガバナンス要件に合うブロックチェーン、台帳、レジストリを接続できます。' },
        delivery: { title: '選ばれたウォレットへ配信', description: 'QRとディープリンクによるOpenID4VCIを優先し、Identra Walletと対応外部ウォレットへ届けます。' },
        lifecycle: { title: '発行後も運用', description: 'バージョン、発行履歴、状態、停止、失効、有効期限、監査イベントを管理します。' },
      },
    },
    journey: {
      eyebrow: '仕組み',
      title: '一つの発行モデル、二つの導入方法',
      description: 'APIやSDKから直接統合できます。検証フローの中で発行する場合は、Dynamic Flowを追加のチャネルとして利用できます。',
      stages: {
        compose: { eyebrow: '01 · 接続', title: '信頼できる業務結果をつなぐ', description: 'クレデンシャル発行につなげる承認済みの結果や業務イベントを選びます。', points: ['既存システムの結果を利用', '受け取れる対象者を定義', '一貫した発行ポリシーを維持'] },
        connect: { eyebrow: '02 · 統合', title: 'APIやSDKで発行機能を追加', description: '利用者がすでに使っている製品の中に、分かりやすい発行体験を組み込みます。', points: ['API呼び出しやSDK操作から開始', 'Dynamic Flowは任意のチャネルとして利用', '利用者に馴染みのある体験を維持'] },
        issue: { eyebrow: '03 · 発行', title: '適切な信頼モデルで署名・配信', description: 'Identra管理の署名または自社管理の基盤を選択します。', points: ['アダプター経由でDID Documentを公開', 'OpenID4VCI配信を優先', '必要に応じてDIDCommを利用'] },
        operate: { eyebrow: '04 · 運用', title: 'ライフサイクル全体を管理', description: '公開後のモジュールとクレデンシャルの状態を追跡します。', points: ['下書き、公開、廃止、アーカイブを管理', '停止、失効、有効期限切れを処理', '発行履歴と監査イベントを確認'] },
      },
    },
    trust: {
      eyebrow: '信頼モデル',
      title: '管理型の利便性と自社管理の選択',
      description: '保有者の体験を変えずに、セキュリティ責任に合う運用モデルを選べます。',
      managedLabel: 'Identra管理型',
      managed: { title: '管理型の基盤ですばやく開始', description: 'Identraが発行の中核運用を担い、組織はサービスとクレデンシャルを受け取る人に集中できます。', points: ['連携から発行までを短縮', 'IDと署名の運用を管理', '状態とライフサイクルをガイド'] },
      selfManagedLabel: '自己管理型',
      selfManaged: { title: '署名権限を自社環境に保持', description: 'KMS、HSM、外部署名サービスを接続し、秘密鍵を自社環境に残します。', points: ['秘密鍵はIdentraの外部に保持', '対応する署名基盤を接続', 'did:web、ION、内部レジストリを選択'] },
      registryTitle: 'ネットワークとレジストリの選択',
      registryDescription: 'CertNetから始めることも、組織のガバナンスや相互運用要件に合うブロックチェーン、台帳、レジストリを接続することもできます。',
    },
    ecosystem: {
      label: 'API・SDKを中心に設計',
      eyebrow: '運用モデルに合わせて導入',
      title: '利用者がすでに使うサービスに発行を組み込む',
      description: '開発チームは発行機能を直接統合できます。検証結果に続けて発行する場合はDynamic Flowも利用できます。',
      flow: { title: 'Dynamic Flow', description: '承認済みの検証結果から発行する場合の追加チャネルとして利用できます。' },
      api: { title: 'API & SDK', description: '自社システムから発行セッション、署名、オファー配信、状態管理を行います。' },
      outputLabel: '共通の成果',
      output: '保有者のウォレットで使える信頼済みクレデンシャル',
    },
    useCases: {
      eyebrow: '再利用を前提に設計',
      title: '最初の利用後も価値が続く証明',
      description: '完了した判断を、本人が再び提示できる持ち運び可能な証明へ変換します。',
      education: { title: '教育クレデンシャル', description: '学位、証明書、検証済み学習成果を学習者のウォレットへ発行します。', detail: '教育機関が発行 · 本人が管理 · 提示が簡単' },
      banking: { title: '再利用可能な銀行KYC', description: '承認済みKYC結果を、許可されたフローで再利用できるクレデンシャルにします。', detail: '検証結果に基づく · 状態を追跡 · 監査可能' },
    },
    standards: {
      label: '標準化の方向性',
      title: '相互運用可能なエコシステムへ',
      description: 'W3C VC 2.0、DID Core、SD-JWT VC、JSON-LD/Data Integrity、ISO mdoc、OpenID4VCIを方向性としています。',
      note: 'これらは製品と相互運用性の目標であり、すべてのプロファイルが現在本番対応済みであることを示すものではありません。',
    },
    faq: {
      eyebrow: 'よくある質問',
      title: '発行前に確認したいこと',
      description: '設定範囲、署名権限、ウォレットへの配信方法を確認できます。',
      items: {
        code: { title: '統合には開発が必要ですか？', description: 'API・SDKは開発チーム向けです。設定済みの検証フロー内で発行したい場合は、Dynamic Flowも選べます。' },
        thirdParty: { title: '既存の検証結果から発行できますか？', description: 'はい。承認済みのKYC、学習成果、会員資格など、組織のポリシーを満たす信頼できる結果から発行を開始できます。' },
        custody: { title: '発行者鍵は誰が管理しますか？', description: 'Identra管理型、またはKMS、HSM、外部署名サービスを接続する自己管理型から選べます。' },
        wallets: { title: 'Identra Wallet専用ですか？', description: 'Identra Walletを優先しつつ、OpenID4VCI対応の外部ウォレットも対象とします。DIDCommは追加オプションです。' },
      },
    },
    cta: {
      eyebrow: 'Credential Issuance',
      title: '次の検証結果を再利用可能な証明へ',
      description: '統合概要を確認するか、組織が実現したいクレデンシャル発行についてIdentraへご相談ください。',
      primary: 'API・SDKを見る',
      secondary: '導入について相談する',
    },
  },
  de: {
    hero: {
      titleLines: ['Vertrauenswürdige Nachweise ausgeben.', 'Verifizierte Ergebnisse wiederverwendbar machen.'],
      description: 'Stellen Sie verifizierbare Nachweise aus Ihren bestehenden Systemen aus. Identra macht aus einem vertrauenswürdigen Ergebnis einen Nachweis, den Menschen empfangen, speichern und wiederverwenden können.',
      primaryCta: 'API und SDK entdecken',
      secondaryCta: 'Beratung anfragen',
      visualAriaLabel: 'Ausgabeprozess vom verifizierten Ergebnis bis zur kompatiblen Wallet',
      visualEyebrow: 'Ausgabeprozess',
      visualTitle: 'Vom verifizierten Ergebnis zum wiederverwendbaren Nachweis',
      source: 'Verifiziertes Ergebnis',
      module: 'Ausgabemodul',
      signer: 'DID & Signatur',
      delivery: 'OpenID4VCI',
      wallet: 'Kompatible Wallet',
      preferred: 'QR / Deep Link',
      additional: 'DIDComm optional',
      chips: ['Schnelle Integration', 'Ihr Vertrauensnetzwerk', 'Freie Wallet-Wahl', 'Lebenszyklussteuerung'],
    },
    benefits: {
      eyebrow: 'Warum Credential Issuance',
      title: 'Der praktische Weg von der Prüfung zu portablem Vertrauen',
      description: 'Teams erhalten die nötige Kontrolle, ohne die Vertrauensentscheidungen zu verbergen, die einen Nachweis wertvoll machen.',
      items: {
        modules: { title: 'Aus den eigenen Produkten ausgeben', description: 'Erweitern Sie bestehende Services per API oder SDK um Credential Issuance, ohne die Nutzerführung in einen separaten Workspace zu verlagern.' },
        constraints: { title: 'Das Vertrauensnetzwerk wählen', description: 'Nutzen Sie CertNet oder verbinden Sie eine Blockchain, ein Ledger oder Register passend zu den Governance-Anforderungen Ihrer Organisation.' },
        delivery: { title: 'Die gewählte Wallet erreichen', description: 'OpenID4VCI per QR und Deep Link verbindet Identra Wallet und kompatible externe Wallets.' },
        lifecycle: { title: 'Über die Ausgabe hinaus arbeiten', description: 'Verwalten Sie Versionen, Verlauf, Status, Sperrung, Widerruf, Ablauf und Audit-Ereignisse.' },
      },
    },
    journey: {
      eyebrow: 'So funktioniert es',
      title: 'Ein Ausgabemodell, zwei Wege in den Betrieb',
      description: 'Integrieren Sie direkt per API und SDK. Dynamic Flow bleibt ein zusätzlicher Kanal, wenn die Ausgabe Teil einer Verifizierungsjourney ist.',
      stages: {
        compose: { eyebrow: '01 · Verbinden', title: 'Ein vertrauenswürdiges Geschäftsergebnis anbinden', description: 'Wählen Sie das bestätigte Ergebnis oder Geschäftsereignis, das einen Nachweis auslösen soll.', points: ['Ergebnisse aus bestehenden Systemen nutzen', 'Empfangsberechtigte festlegen', 'Eine konsistente Ausgaberichtlinie beibehalten'] },
        connect: { eyebrow: '02 · Integrieren', title: 'Ausgabe per API oder SDK ergänzen', description: 'Integrieren Sie die Ausgabe in das Produkt, das Ihre Kundinnen und Kunden bereits nutzen.', points: ['Per API-Aufruf oder SDK-Aktion starten', 'Dynamic Flow als optionalen Kanal nutzen', 'Die vertraute Nutzererfahrung beibehalten'] },
        issue: { eyebrow: '03 · Ausgeben', title: 'Mit passendem Vertrauensmodell signieren', description: 'Nutzen Sie Identra-verwaltete Signaturen oder eigene Infrastruktur.', points: ['DID Documents per Adapter veröffentlichen', 'OpenID4VCI-Zustellung priorisieren', 'DIDComm bei Bedarf anbieten'] },
        operate: { eyebrow: '04 · Betreiben', title: 'Den gesamten Lebenszyklus steuern', description: 'Behalten Sie Module und Nachweise auch nach dem Start im Blick.', points: ['Entwurf, Release, Stilllegung und Archiv verwalten', 'Sperren, widerrufen oder ablaufen lassen', 'Ausgabeverlauf und Audit-Ereignisse prüfen'] },
      },
    },
    trust: {
      eyebrow: 'Ihr Vertrauensmodell',
      title: 'Verwalteter Komfort oder eigene Infrastruktur',
      description: 'Wählen Sie das Modell passend zu Ihrer Sicherheitsverantwortung, ohne die Holder-Erfahrung zu verändern.',
      managedLabel: 'Identra-verwaltet',
      managed: { title: 'Mit einer verwalteten Grundlage starten', description: 'Identra kann die zentralen Ausgabeprozesse übernehmen, damit Ihr Team sich auf den Service und die empfangenden Personen konzentriert.', points: ['Kürzerer Weg von Integration zu Ausgabe', 'Verwaltete Identitäts- und Signaturprozesse', 'Geführte Status- und Lebenszyklusverwaltung'] },
      selfManagedLabel: 'Selbstverwaltet',
      selfManaged: { title: 'Signaturhoheit in Ihrer Umgebung', description: 'Verbinden Sie KMS, HSM oder externe Signierer, während Identra Module und Zustellung koordiniert.', points: ['Private Schlüssel bleiben außerhalb von Identra', 'Unterstützte Signaturinfrastruktur verbinden', 'did:web, ION oder internes Register wählen'] },
      registryTitle: 'Netzwerk und Register wählen',
      registryDescription: 'Starten Sie mit CertNet oder verbinden Sie die Blockchain, das Ledger oder das Register, das zu Governance und Interoperabilität Ihrer Organisation passt.',
    },
    ecosystem: {
      label: 'API und SDK im Mittelpunkt',
      eyebrow: 'Für Ihr Betriebsmodell',
      title: 'Credential Issuance in bestehende Services integrieren',
      description: 'Entwicklungsteams integrieren die Ausgabe direkt. Dynamic Flow bleibt verfügbar, wenn sie Teil einer Verifizierungsjourney sein soll.',
      flow: { title: 'Dynamic Flow', description: 'Nutzen Sie es als zusätzlichen Kanal, wenn die Ausgabe auf ein bestätigtes Prüfergebnis folgt.' },
      api: { title: 'API & SDK', description: 'Erstellen Sie Sessions, verbinden Sie Signaturen, liefern Sie Angebote und verwalten Sie Status im eigenen System.' },
      outputLabel: 'Gemeinsames Ergebnis',
      output: 'Ein vertrauenswürdiger Nachweis für die Wallet des Holders',
    },
    useCases: {
      eyebrow: 'Für echte Wiederverwendung',
      title: 'Nachweise, die nach der ersten Interaktion weiterwirken',
      description: 'Machen Sie aus einer abgeschlossenen Entscheidung einen portablen Nachweis, den der Holder erneut vorlegen kann.',
      education: { title: 'Bildungsnachweise', description: 'Geben Sie Abschlüsse, Zertifikate und geprüfte Lernergebnisse direkt an die Wallet aus.', detail: 'Von Institutionen · Holder-kontrolliert · Einfach vorzulegen' },
      banking: { title: 'Wiederverwendbares Bank-KYC', description: 'Wandeln Sie ein genehmigtes KYC-Ergebnis in einen wiederverwendbaren Nachweis um.', detail: 'Verifiziertes Ergebnis · Statusbewusst · Auditierbar' },
    },
    standards: {
      label: 'Standardausrichtung',
      title: 'Auf dem Weg zu einem interoperablen Ökosystem',
      description: 'Unsere Ausrichtung folgt W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc und OpenID4VCI.',
      note: 'Diese Standards beschreiben Produkt- und Interoperabilitätsziele; sie bedeuten nicht, dass jedes Profil bereits produktionsreif ist.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Wichtige Fragen vor der Ausgabe',
      description: 'Klären Sie Konfigurationsgrenzen, Signaturhoheit und Wallet-Zustellung.',
      items: {
        code: { title: 'Erfordert die Integration Entwicklungsarbeit?', description: 'Der API- und SDK-Weg richtet sich an Entwicklungsteams. Dynamic Flow ist eine zusätzliche Option für die Ausgabe innerhalb einer konfigurierten Verifizierungsjourney.' },
        thirdParty: { title: 'Kann ich aus einem bestehenden Prüfergebnis ausgeben?', description: 'Ja. Ein bestätigtes KYC-, Bildungs-, Mitgliedschafts- oder anderes vertrauenswürdiges Ergebnis kann die Ausgabe gemäß Ihrer Organisationsrichtlinie auslösen.' },
        custody: { title: 'Wer kontrolliert die Herausgeberschlüssel?', description: 'Wählen Sie Identra-Verwaltung oder verbinden Sie KMS, HSM oder externe Signierer, damit Schlüssel in Ihrer Umgebung bleiben.' },
        wallets: { title: 'Funktioniert nur Identra Wallet?', description: 'Identra Wallet wird bevorzugt; OpenID4VCI zielt zugleich auf kompatible externe Wallets. DIDComm ist eine Zusatzoption.' },
      },
    },
    cta: {
      eyebrow: 'Credential Issuance',
      title: 'Das nächste verifizierte Ergebnis wird wiederverwendbarer Nachweis',
      description: 'Lesen Sie die Integrationsübersicht oder sprechen Sie mit Identra über den gewünschten Credential-Ablauf Ihrer Organisation.',
      primary: 'API und SDK entdecken',
      secondary: 'Beratung anfragen',
    },
  },
  vi: {
    hero: {
      titleLines: ['Phát hành thực chứng đáng tin cậy.', 'Biến kết quả xác minh thành giá trị có thể tái sử dụng.'],
      description: 'Phát hành thực chứng ngay từ hệ thống đang sử dụng. Identra giúp tổ chức biến một kết quả đáng tin cậy thành thực chứng mà người dùng có thể nhận, lưu giữ và tái sử dụng.',
      primaryCta: 'Khám phá API/SDK',
      secondaryCta: 'Liên hệ tư vấn',
      visualAriaLabel: 'Hành trình phát hành từ kết quả đã xác minh tới ví tương thích',
      visualEyebrow: 'Hành trình phát hành',
      visualTitle: 'Từ kết quả đã xác minh đến bằng chứng có thể tái sử dụng',
      source: 'Kết quả đã xác minh',
      module: 'Mô-đun phát hành',
      signer: 'DID và ký số',
      delivery: 'OpenID4VCI',
      wallet: 'Ví tương thích',
      preferred: 'QR / deep link',
      additional: 'DIDComm bổ sung',
      chips: ['Tích hợp nhanh', 'Tự chọn mạng tin cậy', 'Tự do lựa chọn ví', 'Quản lý vòng đời'],
    },
    benefits: {
      eyebrow: 'Vì sao chọn Credential Issuance',
      title: 'Con đường thực tế từ xác minh đến niềm tin có thể mang theo',
      description: 'Trao cho đội ngũ khả năng phát hành thực chứng hữu ích mà vẫn bảo toàn những quyết định tin cậy tạo nên giá trị của thực chứng.',
      items: {
        modules: { title: 'Phát hành ngay trong sản phẩm của bạn', description: 'Dùng API hoặc SDK để bổ sung khả năng phát hành thực chứng vào dịch vụ hiện có mà không buộc người dùng chuyển sang một workspace riêng.' },
        constraints: { title: 'Chủ động lựa chọn mạng tin cậy', description: 'Sử dụng CertNet hoặc kết nối blockchain, sổ cái hay sổ đăng ký do tổ chức lựa chọn theo yêu cầu quản trị.' },
        delivery: { title: 'Chuyển tới chiếc ví người dùng lựa chọn', description: 'Ưu tiên OpenID4VCI qua mã QR và deep link cho Identra Wallet cũng như các ví bên ngoài tương thích.' },
        lifecycle: { title: 'Vận hành sau lần phát hành đầu tiên', description: 'Quản lý phiên bản, lịch sử phát hành, trạng thái, tạm ngưng, thu hồi, hết hạn và các sự kiện kiểm toán.' },
      },
    },
    journey: {
      eyebrow: 'Cách hoạt động',
      title: 'Tích hợp phát hành thực chứng theo cách phù hợp với tổ chức',
      description: 'API và SDK là con đường tích hợp chính. Dynamic Flow là kênh bổ sung khi việc phát hành nằm trong một hành trình xác minh đã được cấu hình.',
      stages: {
        compose: { eyebrow: '01 · Kết nối', title: 'Kết nối một kết quả đáng tin cậy', description: 'Chọn kết quả đã được phê duyệt hoặc sự kiện nghiệp vụ sẽ dẫn tới việc phát hành thực chứng.', points: ['Dùng kết quả từ hệ thống hiện có', 'Xác định đối tượng được nhận thực chứng', 'Giữ chính sách phát hành nhất quán'] },
        connect: { eyebrow: '02 · Tích hợp', title: 'Đưa phát hành vào sản phẩm qua API hoặc SDK', description: 'Tạo hành trình nhận thực chứng ngay trong dịch vụ mà khách hàng của bạn đang sử dụng.', points: ['Bắt đầu từ lệnh gọi API hoặc tác vụ SDK', 'Dùng Dynamic Flow như một kênh bổ sung', 'Giữ trải nghiệm quen thuộc cho người dùng'] },
        issue: { eyebrow: '03 · Phát hành', title: 'Ký và chuyển thực chứng theo mô hình phù hợp', description: 'Sử dụng dịch vụ do Identra quản lý hoặc kết nối hạ tầng nằm dưới quyền kiểm soát của bạn.', points: ['Công bố DID Document qua adapter', 'Ưu tiên chuyển thực chứng bằng OpenID4VCI', 'Dùng DIDComm khi hành trình yêu cầu'] },
        operate: { eyebrow: '04 · Vận hành', title: 'Quản lý toàn bộ vòng đời', description: 'Duy trì khả năng theo dõi đối với mọi mô-đun và thực chứng sau khi đưa vào sử dụng.', points: ['Quản lý bản nháp, bản phát hành, ngừng dùng và lưu trữ', 'Tạm ngưng, thu hồi hoặc để thực chứng hết hạn', 'Theo dõi lịch sử phát hành và sự kiện kiểm toán'] },
      },
    },
    trust: {
      eyebrow: 'Mô hình tin cậy của bạn',
      title: 'Sự tiện lợi do Identra quản lý hoặc hạ tầng do bạn kiểm soát',
      description: 'Chọn mô hình vận hành phù hợp với trách nhiệm bảo mật mà không làm thay đổi trải nghiệm của người lưu giữ.',
      managedLabel: 'Identra quản lý',
      managed: { title: 'Bắt đầu nhanh với hạ tầng được quản lý', description: 'Identra có thể vận hành các thành phần phát hành cốt lõi để đội ngũ của bạn tập trung vào dịch vụ và người nhận thực chứng.', points: ['Rút ngắn thời gian tích hợp', 'Quản lý danh tính và hoạt động ký', 'Hướng dẫn quản lý trạng thái và vòng đời'] },
      selfManagedLabel: 'Tự quản lý',
      selfManaged: { title: 'Giữ quyền ký trong hạ tầng của bạn', description: 'Kết nối KMS, HSM hoặc bộ ký bên ngoài trong khi Identra điều phối mô-đun, chuyển tới ví và quản lý vòng đời.', points: ['Khóa riêng không đi qua Identra', 'Kết nối hạ tầng ký được hỗ trợ', 'Chọn did:web, ION hoặc sổ đăng ký nội bộ'] },
      registryTitle: 'Lựa chọn mạng và sổ đăng ký',
      registryDescription: 'Tổ chức có thể bắt đầu với CertNet hoặc kết nối blockchain, sổ cái hay sổ đăng ký phù hợp với yêu cầu quản trị và khả năng liên thông của mình.',
    },
    ecosystem: {
      label: 'API và SDK là nền tảng',
      eyebrow: 'Phù hợp với cách tổ chức của bạn vận hành',
      title: 'Đưa phát hành thực chứng vào dịch vụ người dùng đang sử dụng',
      description: 'Đội kỹ thuật tích hợp trực tiếp qua API và SDK; Dynamic Flow được dùng bổ sung khi thực chứng cần phát hành sau một kết quả xác minh.',
      flow: { title: 'Dynamic Flow', description: 'Sử dụng như một kênh bổ sung khi việc phát hành diễn ra sau kết quả xác minh được chấp thuận.' },
      api: { title: 'API & SDK', description: 'Tạo phiên phát hành, kết nối hạ tầng ký, chuyển đề nghị nhận thực chứng và quản lý trạng thái từ hệ thống của bạn.' },
      outputLabel: 'Kết quả chung',
      output: 'Một thực chứng đáng tin cậy, sẵn sàng lưu vào ví của người dùng',
    },
    useCases: {
      eyebrow: 'Được thiết kế để tái sử dụng',
      title: 'Phát hành bằng chứng tiếp tục tạo ra giá trị',
      description: 'Biến một quyết định đã hoàn tất thành bằng chứng có thể mang theo và được người dùng chủ động trình bày lại.',
      education: { title: 'Bằng cấp và chứng chỉ giáo dục', description: 'Phát hành bằng cấp, chứng chỉ và kết quả học tập đã xác minh trực tiếp tới ví của người học.', detail: 'Do cơ sở giáo dục phát hành · Người học kiểm soát · Dễ dàng trình bày' },
      banking: { title: 'Kết quả KYC ngân hàng có thể tái sử dụng', description: 'Chuyển kết quả KYC đã được phê duyệt thành thực chứng có thể dùng lại trong những hành trình được cho phép.', detail: 'Dựa trên kết quả đã xác minh · Theo dõi trạng thái · Có thể kiểm toán' },
    },
    standards: {
      label: 'Định hướng tiêu chuẩn',
      title: 'Hướng tới hệ sinh thái thực chứng có khả năng tương tác',
      description: 'Định hướng của Identra bám theo W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc và OpenID4VCI.',
      note: 'Các tiêu chuẩn này thể hiện định hướng sản phẩm và mục tiêu tương tác; không đồng nghĩa mọi cấu hình đều đã sẵn sàng cho môi trường production.',
    },
    faq: {
      eyebrow: 'Câu hỏi thường gặp',
      title: 'Những điều cần biết trước khi phát hành',
      description: 'Hiểu rõ giới hạn cấu hình, quyền kiểm soát khóa ký và cách thực chứng được chuyển tới ví.',
      items: {
        code: { title: 'Việc tích hợp có cần đội ngũ kỹ thuật không?', description: 'API và SDK dành cho đội kỹ thuật tích hợp vào hệ thống hiện có. Dynamic Flow là lựa chọn bổ sung khi tổ chức muốn phát hành trong một hành trình xác minh được cấu hình sẵn.' },
        thirdParty: { title: 'Có thể phát hành từ kết quả xác minh hiện có không?', description: 'Có. Kết quả KYC, giáo dục, thành viên hoặc một kết quả đáng tin cậy khác có thể kích hoạt phát hành khi đáp ứng chính sách của tổ chức.' },
        custody: { title: 'Ai kiểm soát khóa của bên phát hành?', description: 'Bạn có thể chọn Identra quản lý hoặc kết nối KMS, HSM hay bộ ký bên ngoài để khóa riêng luôn nằm trong hạ tầng của mình.' },
        wallets: { title: 'Có bắt buộc dùng Identra Wallet không?', description: 'Identra Wallet là trải nghiệm được ưu tiên, nhưng OpenID4VCI cũng hướng tới các ví bên ngoài tương thích. DIDComm là lựa chọn bổ sung.' },
      },
    },
    cta: {
      eyebrow: 'Credential Issuance',
      title: 'Biến kết quả xác minh tiếp theo thành bằng chứng có thể tái sử dụng',
      description: 'Xem tổng quan tích hợp hoặc trao đổi với Identra về hành trình phát hành thực chứng mà tổ chức của bạn muốn triển khai.',
      primary: 'Khám phá API/SDK',
      secondary: 'Liên hệ tư vấn',
    },
  },
} as const satisfies Record<Locale, CredentialIssuancePageCopy>;
