import type { Locale } from '../../types/routes';

export const CREDENTIAL_ISSUANCE_PREVIEW_CAPABILITY_IDS = [
  'modules',
  'delivery',
  'custody',
  'lifecycle',
] as const;

export type CredentialIssuancePreviewCapabilityId =
  typeof CREDENTIAL_ISSUANCE_PREVIEW_CAPABILITY_IDS[number];

export type CredentialIssuancePreviewCopy = {
  readonly eyebrow: string;
  readonly status: string;
  readonly title: string;
  readonly description: string;
  readonly capabilitiesLabel: string;
  readonly capabilities: Record<
    CredentialIssuancePreviewCapabilityId,
    {
      readonly title: string;
      readonly description: string;
    }
  >;
  readonly docsCta: string;
  readonly backCta: string;
};

export const CREDENTIAL_ISSUANCE_PREVIEW_TRANSLATIONS = {
  en: {
    eyebrow: 'Shared workspace',
    status: 'Coming soon',
    title: 'Credential Issuance',
    description:
      'Create and configure trusted issuance modules, deliver credentials to compatible wallets, and manage their lifecycle from one organization-wide workspace.',
    capabilitiesLabel: 'Planned workspace capabilities',
    capabilities: {
      modules: {
        title: 'Issuance modules',
        description: 'Create your own modules or configure parameters exposed by a trusted publisher.',
      },
      delivery: {
        title: 'Wallet delivery',
        description: 'Prioritize OpenID4VCI with QR and deep links, with DIDComm as an additional option.',
      },
      custody: {
        title: 'Flexible custody',
        description: 'Use Identra-managed signing or connect your own KMS, HSM, or external signer.',
      },
      lifecycle: {
        title: 'Lifecycle controls',
        description: 'Track versions, issuance history, status changes, revocation, and audit events.',
      },
    },
    docsCta: 'Read issuance docs',
    backCta: 'Back to dashboard',
  },
  es: {
    eyebrow: 'Espacio de trabajo compartido',
    status: 'Próximamente',
    title: 'Credential Issuance',
    description:
      'Crea y configura módulos de emisión confiables, entrega credenciales a billeteras compatibles y administra su ciclo de vida desde un espacio común para toda la organización.',
    capabilitiesLabel: 'Capacidades previstas',
    capabilities: {
      modules: {
        title: 'Módulos de emisión',
        description: 'Crea tus propios módulos o configura los parámetros publicados por un emisor de confianza.',
      },
      delivery: {
        title: 'Entrega a billeteras',
        description: 'OpenID4VCI mediante QR y enlaces profundos como vía principal, con DIDComm como opción adicional.',
      },
      custody: {
        title: 'Custodia flexible',
        description: 'Usa firma administrada por Identra o conecta tu propio KMS, HSM o firmante externo.',
      },
      lifecycle: {
        title: 'Control del ciclo de vida',
        description: 'Sigue versiones, historial de emisión, cambios de estado, revocaciones y auditorías.',
      },
    },
    docsCta: 'Ver documentación',
    backCta: 'Volver al panel',
  },
  ja: {
    eyebrow: '組織共有ワークスペース',
    status: '近日公開',
    title: 'Credential Issuance',
    description:
      '信頼できる発行モジュールの作成と設定、対応ウォレットへのクレデンシャル配信、ライフサイクル管理を組織共通のワークスペースで行えます。',
    capabilitiesLabel: '予定されている機能',
    capabilities: {
      modules: {
        title: '発行モジュール',
        description: '独自モジュールを作成するか、信頼できる発行者が公開したパラメーターを設定します。',
      },
      delivery: {
        title: 'ウォレットへの配信',
        description: 'QRとディープリンクによるOpenID4VCIを優先し、DIDCommも追加の選択肢として利用します。',
      },
      custody: {
        title: '柔軟な鍵管理',
        description: 'Identra管理の署名、または独自のKMS、HSM、外部署名サービスを選べます。',
      },
      lifecycle: {
        title: 'ライフサイクル管理',
        description: 'バージョン、発行履歴、状態変更、失効、監査イベントを追跡します。',
      },
    },
    docsCta: '発行ドキュメントを見る',
    backCta: 'ダッシュボードへ戻る',
  },
  de: {
    eyebrow: 'Gemeinsamer Workspace',
    status: 'Demnächst verfügbar',
    title: 'Credential Issuance',
    description:
      'Erstellen und konfigurieren Sie vertrauenswürdige Ausgabemodule, stellen Sie Nachweise an kompatible Wallets zu und verwalten Sie den Lebenszyklus in einem organisationsweiten Workspace.',
    capabilitiesLabel: 'Geplante Workspace-Funktionen',
    capabilities: {
      modules: {
        title: 'Ausgabemodule',
        description: 'Erstellen Sie eigene Module oder konfigurieren Sie die freigegebenen Parameter eines vertrauenswürdigen Herausgebers.',
      },
      delivery: {
        title: 'Wallet-Zustellung',
        description: 'OpenID4VCI per QR-Code und Deep Link hat Vorrang; DIDComm bleibt eine zusätzliche Option.',
      },
      custody: {
        title: 'Flexible Schlüsselverwaltung',
        description: 'Nutzen Sie Identra-verwaltete Signaturen oder binden Sie KMS, HSM oder externe Signierer ein.',
      },
      lifecycle: {
        title: 'Lebenszyklussteuerung',
        description: 'Verfolgen Sie Versionen, Ausgabeverlauf, Statusänderungen, Widerrufe und Audit-Ereignisse.',
      },
    },
    docsCta: 'Ausgabedokumentation lesen',
    backCta: 'Zurück zum Dashboard',
  },
  vi: {
    eyebrow: 'Workspace dùng chung',
    status: 'Sắp ra mắt',
    title: 'Credential Issuance',
    description:
      'Tạo và cấu hình mô-đun phát hành đáng tin cậy, chuyển thực chứng tới các ví tương thích và quản lý toàn bộ vòng đời trong một workspace dùng chung cho tổ chức.',
    capabilitiesLabel: 'Các năng lực dự kiến',
    capabilities: {
      modules: {
        title: 'Mô-đun phát hành',
        description: 'Tạo mô-đun riêng hoặc cấu hình những tham số được bên phát hành đáng tin cậy cho phép.',
      },
      delivery: {
        title: 'Chuyển tới ví',
        description: 'Ưu tiên OpenID4VCI qua mã QR và deep link, đồng thời hỗ trợ DIDComm như một lựa chọn bổ sung.',
      },
      custody: {
        title: 'Quản lý khóa linh hoạt',
        description: 'Sử dụng dịch vụ ký do Identra quản lý hoặc kết nối KMS, HSM hay bộ ký bên ngoài.',
      },
      lifecycle: {
        title: 'Quản lý vòng đời',
        description: 'Theo dõi phiên bản, lịch sử phát hành, trạng thái, thu hồi và toàn bộ sự kiện kiểm toán.',
      },
    },
    docsCta: 'Đọc tài liệu phát hành',
    backCta: 'Quay lại Dashboard',
  },
} as const satisfies Record<Locale, CredentialIssuancePreviewCopy>;
