import type {
  DocContent,
  LocalizedDocsContent,
} from '../../components/docs/docsModel';
import type { Locale } from '../../types/routes';

const moduleExample = `{
  "id": "approved-bank-kyc",
  "credential_profile": "bank_kyc_result",
  "trigger": {
    "source": "dynamic_flow",
    "outcome": "approved"
  },
  "configurable_parameters": [
    "validity_days",
    "display.locale"
  ],
  "protected": [
    "issuer_did",
    "signing_key",
    "credential_structure"
  ]
}`;

const openId4VciExample = `const offer = await identra.issuance.createOffer({
  moduleId: 'approved-bank-kyc',
  subject: { referenceId: 'customer_102938' },
  delivery: { protocol: 'openid4vci' }
});

return {
  qrCode: offer.qrCode,
  deepLink: offer.deepLink,
  expiresAt: offer.expiresAt
};`;

type CredentialIssuanceDocsCopy = {
  readonly title: string;
  readonly overviewTitle: string;
  readonly overview: string;
  readonly cards: readonly [
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
  ];
  readonly modulesTitle: string;
  readonly modules: string;
  readonly moduleCallout: string;
  readonly pathsTitle: string;
  readonly paths: string;
  readonly pathItems: readonly [
    readonly [string, string],
    readonly [string, string],
  ];
  readonly deliveryTitle: string;
  readonly delivery: string;
  readonly deliveryCallout: string;
  readonly contractNote: string;
  readonly trustTitle: string;
  readonly trust: string;
  readonly trustItems: readonly [
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
  ];
  readonly lifecycleTitle: string;
  readonly lifecycle: string;
  readonly lifecycleHeaders: readonly [string, string];
  readonly lifecycleRows: readonly [
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
    readonly [string, string],
  ];
  readonly standardsTitle: string;
  readonly standards: string;
  readonly standardsCallout: string;
};

const DOC_COPY: Record<Locale, CredentialIssuanceDocsCopy> = {
  en: {
    title: 'Credential Issuance',
    overviewTitle: 'Issue reusable proof from verified results',
    overview:
      'Credential Issuance turns an approved verification result into a signed credential that a holder can receive in Identra Wallet or a compatible external wallet. Configure issuance in Dynamic Flow or integrate the same capability through APIs and SDKs.',
    cards: [
      ['Issuance module', 'Defines the credential profile, trigger, allowed parameters, signing policy, and delivery choices.'],
      ['Issuer', 'Owns the authority to issue and chooses Identra-managed or self-managed signing.'],
      ['Holder', 'Reviews the offer and stores the credential in a wallet they control.'],
      ['Lifecycle', 'Tracks module versions and the status of every issued credential.'],
    ],
    modulesTitle: 'Configure modules without weakening publisher trust',
    modules:
      'Create an organization-owned module or use a module published by another trusted issuer. Third-party modules expose an explicit configuration surface; protected keys, credential structure, and trust-critical values cannot be forked or changed.',
    moduleCallout:
      'Treat every published module as a governed contract. Only parameters named by the publisher are configurable.',
    pathsTitle: 'Choose how issuance starts',
    paths:
      'Both integration paths use the same issuer policy and lifecycle model, so a credential does not become less trustworthy because it was issued from a different channel.',
    pathItems: [
      ['Dynamic Flow', 'Place the module after an approved verification outcome and test the complete journey before release.'],
      ['API and SDK', 'Create offers, connect signing infrastructure, deliver credentials, and manage status from your own backend or application.'],
    ],
    deliveryTitle: 'Deliver with OpenID4VCI first',
    delivery:
      'OpenID4VCI is the preferred delivery protocol. Present the offer as a QR code for cross-device journeys or a deep link when the wallet is on the same device.',
    deliveryCallout:
      'DIDComm remains an additional delivery option for journeys that require an established DIDComm relationship.',
    contractNote:
      'API and SDK contracts shown here are illustrative, not production contracts.',
    trustTitle: 'Keys, DIDs, and registry adapters',
    trust:
      'Choose a managed setup for faster operation or keep signing authority in your infrastructure. The selected model does not change which claims a module is authorized to issue.',
    trustItems: [
      ['Identra-managed', 'Identra manages issuer DID, signing operations, status services, and CertNet publication.'],
      ['Self-managed', 'Connect a KMS, HSM, or external signer. Private keys remain outside Identra.'],
      ['Registry adapters', 'Use CertNet, did:web, ION, or an internal registry according to your governance and interoperability requirements.'],
    ],
    lifecycleTitle: 'Manage both lifecycles',
    lifecycle:
      'Module governance and credential status are related but separate. Keep both visible in operational and audit workflows.',
    lifecycleHeaders: ['Lifecycle', 'States and records'],
    lifecycleRows: [
      ['Module', 'Draft, testing, published, deprecated, archived'],
      ['Credential', 'Active, suspended, revoked, expired'],
      ['History', 'Issuance time, module version, delivery method, status changes'],
      ['Audit', 'Actor, action, reason, environment, timestamp'],
    ],
    standardsTitle: 'Standards direction',
    standards:
      'Identra is working toward interoperability across W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc, and OpenID4VCI.',
    standardsCallout:
      'This list describes product direction. It does not mean that every standards profile is production-ready.',
  },
  es: {
    title: 'Credential Issuance',
    overviewTitle: 'Emite pruebas reutilizables a partir de resultados verificados',
    overview: 'Credential Issuance convierte una verificación aprobada en una credencial firmada que el titular puede recibir en Identra Wallet o en una billetera externa compatible. Configura la emisión en Dynamic Flow o integra la misma capacidad mediante API y SDK.',
    cards: [
      ['Módulo de emisión', 'Define perfil, activación, parámetros permitidos, firma y entrega.'],
      ['Emisor', 'Conserva la autoridad y elige firma gestionada o autogestionada.'],
      ['Titular', 'Revisa la oferta y guarda la credencial en la billetera bajo su control.'],
      ['Ciclo de vida', 'Sigue versiones del módulo y el estado de las credenciales emitidas.'],
    ],
    modulesTitle: 'Configura módulos sin debilitar la confianza',
    modules: 'Crea un módulo propio o usa uno publicado por otro emisor de confianza. Los módulos de terceros exponen parámetros explícitos; las claves, estructura y valores críticos no se pueden bifurcar ni modificar.',
    moduleCallout: 'Trata cada módulo publicado como un contrato gobernado. Solo se configuran parámetros nombrados por el emisor.',
    pathsTitle: 'Elige cómo comienza la emisión',
    paths: 'Ambas vías usan la misma política del emisor y el mismo modelo de ciclo de vida.',
    pathItems: [
      ['Dynamic Flow', 'Coloca el módulo después de un resultado aprobado y prueba todo el recorrido antes de publicarlo.'],
      ['API y SDK', 'Crea ofertas, conecta la firma, entrega credenciales y gestiona estados desde tu sistema.'],
    ],
    deliveryTitle: 'OpenID4VCI como vía principal',
    delivery: 'Presenta la oferta mediante QR para recorridos entre dispositivos o con un enlace profundo cuando la billetera está en el mismo dispositivo.',
    deliveryCallout: 'DIDComm sigue disponible como opción adicional cuando el recorrido requiere una relación DIDComm.',
    contractNote: 'Los contratos API y SDK mostrados son ilustrativos y no son contratos de producción.',
    trustTitle: 'Claves, DID y adaptadores',
    trust: 'Elige una configuración gestionada o conserva la autoridad de firma en tu infraestructura.',
    trustItems: [
      ['Gestionado por Identra', 'Identra gestiona DID, firma, estado y publicación en CertNet.'],
      ['Autogestionado', 'Conecta KMS, HSM o un firmante externo; las claves privadas quedan fuera de Identra.'],
      ['Adaptadores', 'Usa CertNet, did:web, ION o un registro interno según tus requisitos de gobernanza e interoperabilidad.'],
    ],
    lifecycleTitle: 'Gestiona ambos ciclos de vida',
    lifecycle: 'La gobernanza del módulo y el estado de la credencial están relacionados, pero se administran por separado.',
    lifecycleHeaders: ['Ciclo de vida', 'Estados y registros'],
    lifecycleRows: [
      ['Módulo', 'Borrador, pruebas, publicado, obsoleto, archivado'],
      ['Credencial', 'Activa, suspendida, revocada, caducada'],
      ['Historial', 'Emisión, versión, entrega y cambios de estado'],
      ['Auditoría', 'Actor, acción, motivo, entorno y fecha'],
    ],
    standardsTitle: 'Dirección de estándares',
    standards: 'Identra avanza hacia W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc y OpenID4VCI.',
    standardsCallout: 'La lista describe una dirección de producto; no indica que todos los perfiles estén listos para producción.',
  },
  ja: {
    title: 'Credential Issuance',
    overviewTitle: '検証済み結果から再利用可能な証明を発行',
    overview: 'Credential Issuanceは、承認済みの検証結果を署名済みクレデンシャルへ変換し、Identra Walletまたは対応する外部ウォレットへ届けます。Dynamic FlowまたはAPI/SDKから利用できます。',
    cards: [
      ['発行モジュール', 'プロファイル、開始条件、設定項目、署名、配信方法を定義します。'],
      ['発行者', '発行権限を持ち、管理型または自己管理型の署名を選びます。'],
      ['保有者', 'オファーを確認し、自分が管理するウォレットへ保存します。'],
      ['ライフサイクル', 'モジュールの版と発行済みクレデンシャルの状態を追跡します。'],
    ],
    modulesTitle: '発行者の信頼を損なわずに設定',
    modules: '組織独自のモジュールを作成するか、信頼できる第三者のモジュールを利用します。第三者モジュールでは公開された項目だけを設定でき、保護された鍵、構造、信頼値は変更できません。',
    moduleCallout: '公開モジュールは管理された契約として扱い、発行者が指定したパラメーターだけを設定してください。',
    pathsTitle: '発行の開始方法を選ぶ',
    paths: 'どちらの統合方法も同じ発行者ポリシーとライフサイクルモデルを利用します。',
    pathItems: [
      ['Dynamic Flow', '承認済みの検証結果の後にモジュールを配置し、公開前に全体をテストします。'],
      ['API & SDK', '自社システムからオファー作成、署名接続、配信、状態管理を行います。'],
    ],
    deliveryTitle: 'OpenID4VCIを優先',
    delivery: '別端末ではQRコード、同じ端末ではディープリンクでオファーを提示します。',
    deliveryCallout: 'DIDComm関係が必要なフローでは、DIDCommも追加の配信方法として利用できます。',
    contractNote: 'ここに示すAPIとSDKのコントラクトは説明用であり、本番用ではありません。',
    trustTitle: '鍵、DID、レジストリアダプター',
    trust: '管理型の利便性か、自社環境での署名権限保持かを選択します。',
    trustItems: [
      ['Identra管理型', 'Identraが発行者DID、署名、状態サービス、CertNet公開を管理します。'],
      ['自己管理型', 'KMS、HSM、外部署名サービスを接続し、秘密鍵をIdentraの外部に保持します。'],
      ['アダプター', 'ガバナンスと相互運用要件に応じて、CertNet、did:web、ION、内部レジストリを選択できます。'],
    ],
    lifecycleTitle: '二つのライフサイクルを管理',
    lifecycle: 'モジュールのガバナンスとクレデンシャル状態は関連しますが、別々に管理します。',
    lifecycleHeaders: ['ライフサイクル', '状態と記録'],
    lifecycleRows: [
      ['モジュール', '下書き、テスト、公開、廃止、アーカイブ'],
      ['クレデンシャル', '有効、停止、失効、期限切れ'],
      ['履歴', '発行日時、版、配信方法、状態変更'],
      ['監査', '実行者、操作、理由、環境、時刻'],
    ],
    standardsTitle: '標準化の方向性',
    standards: 'IdentraはW3C VC 2.0、DID Core、SD-JWT VC、JSON-LD/Data Integrity、ISO mdoc、OpenID4VCIとの相互運用を目指します。',
    standardsCallout: 'この一覧は製品の方向性であり、すべてのプロファイルが本番対応済みであることを示しません。',
  },
  de: {
    title: 'Credential Issuance',
    overviewTitle: 'Wiederverwendbare Nachweise aus verifizierten Ergebnissen',
    overview: 'Credential Issuance macht aus einem bestätigten Prüfergebnis einen signierten Nachweis für Identra Wallet oder eine kompatible externe Wallet. Konfigurieren Sie die Ausgabe in Dynamic Flow oder integrieren Sie per API und SDK.',
    cards: [
      ['Ausgabemodul', 'Definiert Profil, Auslöser, erlaubte Parameter, Signatur und Zustellung.'],
      ['Herausgeber', 'Behält die Autorität und wählt verwaltete oder selbstverwaltete Signatur.'],
      ['Holder', 'Prüft das Angebot und speichert den Nachweis in der eigenen Wallet.'],
      ['Lebenszyklus', 'Verfolgt Modulversionen und den Status ausgegebener Nachweise.'],
    ],
    modulesTitle: 'Module konfigurieren, ohne Vertrauen zu schwächen',
    modules: 'Erstellen Sie ein eigenes Modul oder nutzen Sie ein Modul eines vertrauenswürdigen Herausgebers. Bei Drittanbietermodulen sind nur freigegebene Parameter konfigurierbar; Schlüssel, Struktur und Vertrauenswerte bleiben geschützt.',
    moduleCallout: 'Behandeln Sie veröffentlichte Module als verwaltete Verträge. Nur benannte Parameter sind konfigurierbar.',
    pathsTitle: 'Startpunkt der Ausgabe wählen',
    paths: 'Beide Integrationswege verwenden dieselbe Herausgeberrichtlinie und dasselbe Lebenszyklusmodell.',
    pathItems: [
      ['Dynamic Flow', 'Platzieren Sie das Modul nach einem bestätigten Ergebnis und testen Sie die gesamte Journey.'],
      ['API & SDK', 'Erstellen Sie Angebote, verbinden Sie Signaturen, liefern Sie Nachweise und verwalten Sie Status im eigenen System.'],
    ],
    deliveryTitle: 'OpenID4VCI hat Vorrang',
    delivery: 'Nutzen Sie QR-Codes für geräteübergreifende Journeys und Deep Links, wenn sich die Wallet auf demselben Gerät befindet.',
    deliveryCallout: 'DIDComm bleibt eine zusätzliche Option für Journeys mit bestehender DIDComm-Beziehung.',
    contractNote: 'Die gezeigten API- und SDK-Verträge sind illustrativ und keine Produktionsverträge.',
    trustTitle: 'Schlüssel, DIDs und Registeradapter',
    trust: 'Wählen Sie einen verwalteten Aufbau oder behalten Sie die Signaturhoheit in Ihrer Infrastruktur.',
    trustItems: [
      ['Identra-verwaltet', 'Identra verwaltet DID, Signatur, Statusdienste und CertNet-Veröffentlichung.'],
      ['Selbstverwaltet', 'Verbinden Sie KMS, HSM oder externe Signierer; private Schlüssel bleiben außerhalb von Identra.'],
      ['Registeradapter', 'Wählen Sie CertNet, did:web, ION oder ein internes Register passend zu Governance und Interoperabilität.'],
    ],
    lifecycleTitle: 'Beide Lebenszyklen verwalten',
    lifecycle: 'Modul-Governance und Nachweisstatus hängen zusammen, werden jedoch getrennt geführt.',
    lifecycleHeaders: ['Lebenszyklus', 'Status und Aufzeichnungen'],
    lifecycleRows: [
      ['Modul', 'Entwurf, Test, veröffentlicht, stillgelegt, archiviert'],
      ['Nachweis', 'Aktiv, gesperrt, widerrufen, abgelaufen'],
      ['Verlauf', 'Ausgabezeit, Version, Zustellung, Statusänderungen'],
      ['Audit', 'Akteur, Aktion, Grund, Umgebung, Zeitpunkt'],
    ],
    standardsTitle: 'Standardausrichtung',
    standards: 'Identra arbeitet auf Interoperabilität mit W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc und OpenID4VCI hin.',
    standardsCallout: 'Die Liste beschreibt die Produktentwicklung und bedeutet nicht, dass jedes Profil produktionsreif ist.',
  },
  vi: {
    title: 'Credential Issuance',
    overviewTitle: 'Phát hành bằng chứng có thể tái sử dụng từ kết quả đã xác minh',
    overview: 'Credential Issuance chuyển kết quả xác minh được phê duyệt thành thực chứng đã ký để người dùng nhận bằng Identra Wallet hoặc ví bên ngoài tương thích. Bạn có thể cấu hình trong Dynamic Flow hoặc tích hợp cùng năng lực này qua API và SDK.',
    cards: [
      ['Mô-đun phát hành', 'Xác định loại thực chứng, điều kiện kích hoạt, tham số được phép, chính sách ký và cách chuyển tới ví.'],
      ['Bên phát hành', 'Nắm quyền phát hành và lựa chọn Identra quản lý hoặc tự quản lý hạ tầng ký.'],
      ['Người lưu giữ', 'Xem đề nghị nhận thực chứng và lưu vào chiếc ví do mình kiểm soát.'],
      ['Vòng đời', 'Theo dõi phiên bản mô-đun và trạng thái của từng thực chứng đã phát hành.'],
    ],
    modulesTitle: 'Cấu hình mô-đun mà không làm suy giảm giá trị tin cậy',
    modules: 'Tạo mô-đun thuộc sở hữu tổ chức hoặc dùng mô-đun do một bên phát hành đáng tin cậy công bố. Mô-đun bên thứ ba chỉ mở những tham số được phép cấu hình; khóa, cấu trúc thực chứng và các giá trị tin cậy cốt lõi không thể bị fork hoặc thay đổi.',
    moduleCallout: 'Hãy coi mỗi mô-đun đã công bố là một hợp đồng được quản trị. Chỉ những tham số do bên phát hành nêu rõ mới có thể cấu hình.',
    pathsTitle: 'Chọn cách bắt đầu phát hành',
    paths: 'Hai cách tích hợp dùng chung chính sách bên phát hành và mô hình vòng đời, vì vậy mức độ tin cậy không phụ thuộc vào kênh bắt đầu.',
    pathItems: [
      ['Dynamic Flow', 'Đặt mô-đun sau kết quả xác minh được chấp thuận và kiểm thử toàn bộ hành trình trước khi phát hành.'],
      ['API và SDK', 'Tạo đề nghị nhận thực chứng, kết nối hạ tầng ký, chuyển tới ví và quản lý trạng thái từ hệ thống của bạn.'],
    ],
    deliveryTitle: 'Ưu tiên chuyển thực chứng bằng OpenID4VCI',
    delivery: 'Dùng mã QR cho hành trình giữa hai thiết bị hoặc deep link khi ví nằm trên cùng thiết bị với ứng dụng.',
    deliveryCallout: 'DIDComm vẫn là lựa chọn bổ sung cho những hành trình cần thiết lập quan hệ DIDComm.',
    contractNote: 'Các giao diện API và SDK trong ví dụ chỉ mang tính minh họa, không phải giao diện production.',
    trustTitle: 'Khóa, DID và adapter sổ đăng ký',
    trust: 'Chọn mô hình được quản lý để triển khai thuận tiện hoặc giữ toàn bộ quyền ký trong hạ tầng của bạn.',
    trustItems: [
      ['Identra quản lý', 'Identra quản lý DID bên phát hành, hoạt động ký, dịch vụ trạng thái và công bố lên CertNet.'],
      ['Tự quản lý', 'Kết nối KMS, HSM hoặc bộ ký bên ngoài; khóa riêng luôn nằm ngoài Identra.'],
      ['Adapter sổ đăng ký', 'Lựa chọn CertNet, did:web, ION hoặc sổ đăng ký nội bộ theo yêu cầu quản trị và khả năng liên thông.'],
    ],
    lifecycleTitle: 'Quản lý cả hai vòng đời',
    lifecycle: 'Quản trị mô-đun và trạng thái thực chứng có liên quan nhưng được theo dõi riêng để vận hành và kiểm toán rõ ràng.',
    lifecycleHeaders: ['Vòng đời', 'Trạng thái và hồ sơ'],
    lifecycleRows: [
      ['Mô-đun', 'Bản nháp, kiểm thử, đã phát hành, ngừng dùng, lưu trữ'],
      ['Thực chứng', 'Đang hoạt động, tạm ngưng, đã thu hồi, hết hạn'],
      ['Lịch sử', 'Thời điểm phát hành, phiên bản, cách chuyển tới ví, thay đổi trạng thái'],
      ['Kiểm toán', 'Chủ thể thực hiện, thao tác, lý do, môi trường và thời gian'],
    ],
    standardsTitle: 'Định hướng tiêu chuẩn',
    standards: 'Identra hướng tới khả năng tương tác với W3C VC 2.0, DID Core, SD-JWT VC, JSON-LD/Data Integrity, ISO mdoc và OpenID4VCI.',
    standardsCallout: 'Danh sách này mô tả định hướng sản phẩm; không có nghĩa mọi cấu hình tiêu chuẩn đều đã sẵn sàng cho production.',
  },
};

const buildCredentialIssuanceDocs = (
  locale: Locale,
): DocContent => {
  const copy = DOC_COPY[locale];
  return {
    title: copy.title,
    category: 'sending',
    sections: [
      {
        id: 'credential-issuance-overview',
        title: copy.overviewTitle,
        blocks: [
          { type: 'p', text: copy.overview },
          {
            type: 'cards',
            cards: copy.cards.map(([title, text]) => ({ title, text })),
          },
        ],
      },
      {
        id: 'credential-issuance-modules',
        title: copy.modulesTitle,
        blocks: [
          { type: 'p', text: copy.modules },
          {
            type: 'code',
            language: 'json',
            fileName: 'issuance-module.json',
            code: moduleExample,
          },
          { type: 'callout', text: copy.moduleCallout },
        ],
      },
      {
        id: 'credential-issuance-paths',
        title: copy.pathsTitle,
        blocks: [
          { type: 'p', text: copy.paths },
          {
            type: 'cards',
            cards: copy.pathItems.map(([title, text]) => ({ title, text })),
          },
        ],
      },
      {
        id: 'credential-issuance-delivery',
        title: copy.deliveryTitle,
        blocks: [
          { type: 'p', text: copy.delivery },
          {
            type: 'code',
            language: 'typescript',
            fileName: 'createCredentialOffer.ts',
            code: openId4VciExample,
          },
          {
            type: 'callout',
            text: `${copy.deliveryCallout} ${copy.contractNote}`,
          },
        ],
      },
      {
        id: 'credential-issuance-trust',
        title: copy.trustTitle,
        blocks: [
          { type: 'p', text: copy.trust },
          {
            type: 'list',
            items: copy.trustItems.map(([title, text]) => ({ title, text })),
          },
        ],
      },
      {
        id: 'credential-issuance-lifecycle',
        title: copy.lifecycleTitle,
        blocks: [
          { type: 'p', text: copy.lifecycle },
          {
            type: 'table',
            headers: [...copy.lifecycleHeaders],
            rows: copy.lifecycleRows.map((row) => [...row]),
          },
        ],
      },
      {
        id: 'credential-issuance-standards',
        title: copy.standardsTitle,
        blocks: [
          { type: 'p', text: copy.standards },
          { type: 'callout', text: copy.standardsCallout },
        ],
      },
    ],
  };
};

export const CREDENTIAL_ISSUANCE_DOCS_TRANSLATIONS = {
  en: buildCredentialIssuanceDocs('en'),
  es: buildCredentialIssuanceDocs('es'),
  ja: buildCredentialIssuanceDocs('ja'),
  de: buildCredentialIssuanceDocs('de'),
  vi: buildCredentialIssuanceDocs('vi'),
} satisfies LocalizedDocsContent;
