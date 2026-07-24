import type { Locale } from '../../types/routes';
import type {
  DocContent,
  DocsReferenceActor,
  DocsReferenceCodeKey,
  DocsReferencePhase,
  DocsReferenceStage
} from './docsModel';
import { docsSdkVariants, type DocsSdkVariant, type DocsSdkVariantId } from './docsSdkFlowCatalog';

type LocalizedText = Record<Locale, string>;

interface DocsReferenceStep {
  id: string;
  number: string;
  phase: DocsReferencePhase;
  actor: DocsReferenceActor;
  title: LocalizedText;
  summary: LocalizedText;
  protocol: string;
  inputs: LocalizedText[];
  outputs: LocalizedText[];
  security: LocalizedText;
  codeKey: DocsReferenceCodeKey;
  variants: DocsSdkVariantId[];
}

interface ApiReferenceCopy {
  title: string;
  overviewTitle: string;
  overviewIntro: string;
  contractNotice: string;
  registryNotice: string;
  phaseCardsIntro: string;
  inputLabel: string;
  outputLabel: string;
  securityLabel: string;
  stageCount: string;
  phaseIntro: Record<DocsReferencePhase, string>;
}

interface ReferenceComments {
  mock: string;
  registry: string;
  resolve: string;
  secure: string;
  qrInvitation: string;
  credentialOverDidcomm: string;
  holderDisplay: string;
  minimize: string;
  receiptPrivacy: string;
  unavailableMobile: string;
}

const allIssuerVerifierVariants: DocsSdkVariantId[] = [
  'web-javascript',
  'web-typescript',
  'server-node',
  'server-go',
  'mobile-react-native',
  'mobile-android',
  'mobile-ios'
];

const mobileVariants: DocsSdkVariantId[] = ['mobile-react-native', 'mobile-android', 'mobile-ios'];

export const docsReferenceActors: Record<DocsReferenceActor, LocalizedText> = {
  issuer: {
    en: 'Issuer SDK',
    es: 'SDK de emisor',
    ja: '発行者SDK',
    de: 'Aussteller-SDK',
    vi: 'SDK bên phát hành'
  },
  holder: {
    en: 'Holder Mobile SDK',
    es: 'SDK móvil del titular',
    ja: '保有者モバイルSDK',
    de: 'Mobile Inhaber-SDK',
    vi: 'SDK di động cho bên nắm giữ'
  },
  verifier: {
    en: 'Verifier SDK',
    es: 'SDK de verificador',
    ja: '検証者SDK',
    de: 'Prüfer-SDK',
    vi: 'SDK bên xác minh'
  }
};

export const docsReferencePhases: Record<DocsReferencePhase, LocalizedText> = {
  identity: {
    en: 'Identity and key foundation',
    es: 'Base de identidad y claves',
    ja: 'IDと鍵の基盤',
    de: 'Identitäts- und Schlüsselbasis',
    vi: 'Nền tảng định danh và khóa'
  },
  issuance: {
    en: 'Credential issuance and storage',
    es: 'Emisión y almacenamiento de credenciales',
    ja: 'クレデンシャルの発行と保存',
    de: 'Ausstellung und Speicherung von Nachweisen',
    vi: 'Cấp phát và lưu thực chứng'
  },
  verification: {
    en: 'Presentation and verification',
    es: 'Presentación y verificación',
    ja: '提示と検証',
    de: 'Präsentation und Prüfung',
    vi: 'Trình bày và xác minh'
  }
};

const apiReferenceCopy: Record<Locale, ApiReferenceCopy> = {
  en: {
    title: 'The complete cryptographic lifecycle of a credential',
    overviewTitle: 'Lifecycle overview',
    overviewIntro: 'A detailed SDK API reference from key creation and DID Document publication through DIDComm setup, VC issuance, encrypted storage, VP creation, verification, and Holder receipts.',
    contractNotice: 'SDK contracts in this reference are illustrative. Package names, APIs, and endpoints describe intended contracts and mandatory security boundaries.',
    registryNotice: 'CertNet is the default sandbox registry, but the same DID registry layer can publish and resolve documents through did:web, ION, or an internal registry.',
    phaseCardsIntro: 'The lifecycle is divided into three phases so each API stage has a clear owner, input, output, and security invariant.',
    inputLabel: 'API inputs',
    outputLabel: 'API outputs',
    securityLabel: 'Security invariant',
    stageCount: 'API stages documented in detail',
    phaseIntro: {
      identity: 'Create the public identity and key material each actor needs before any credential is issued or verified.',
      issuance: 'Establish the Holder-Issuer relationship, send the signed VC over DIDComm, and store it only in the mobile vault.',
      verification: 'Create a Verifier session, request a VP, verify every DID and proof, then send a privacy-preserving receipt.'
    }
  },
  es: {
    title: 'Ciclo criptográfico completo de una credencial',
    overviewTitle: 'Vista general del ciclo',
    overviewIntro: 'Referencia detallada del SDK desde la creación de claves y publicación del DID Document hasta DIDComm, emisión de VC, almacenamiento cifrado, creación de VP, verificación y recibos para el titular.',
    contractNotice: 'Los contratos SDK de esta referencia son ilustrativos. Los paquetes, APIs y endpoints describen contratos previstos y límites de seguridad obligatorios.',
    registryNotice: 'CertNet es el registro predeterminado de sandbox, pero la misma capa de DID registry puede publicar y resolver documentos con did:web, ION o un registro interno.',
    phaseCardsIntro: 'El ciclo se divide en tres fases para que cada etapa API tenga dueño, entrada, salida e invariante de seguridad claros.',
    inputLabel: 'Entradas API',
    outputLabel: 'Salidas API',
    securityLabel: 'Invariante de seguridad',
    stageCount: 'etapas API documentadas en detalle',
    phaseIntro: {
      identity: 'Crea la identidad pública y el material de claves que cada actor necesita antes de emitir o verificar credenciales.',
      issuance: 'Establece la relación Holder-Issuer, envía la VC firmada por DIDComm y la guarda solo en la bóveda móvil.',
      verification: 'Crea una sesión de verificador, solicita una VP, verifica cada DID y prueba, y envía un recibo que preserva privacidad.'
    }
  },
  ja: {
    title: 'クレデンシャルの暗号ライフサイクル全体',
    overviewTitle: 'ライフサイクル概要',
    overviewIntro: '鍵生成とDID Document公開から、DIDComm接続、VC発行、暗号化保存、VP作成、検証、保有者へのレシート送信までを扱うSDK APIリファレンスです。',
    contractNotice: 'このリファレンスのSDK契約は説明用です。パッケージ名、API、endpointは想定契約と必須のセキュリティ境界を示します。',
    registryNotice: 'CertNetはsandboxの既定registryですが、同じDID registry層でdid:web、ION、内部registryにも公開と解決ができます。',
    phaseCardsIntro: 'ライフサイクルを3つのフェーズに分け、各API stageの所有者、入力、出力、セキュリティ不変条件を明確にします。',
    inputLabel: 'API入力',
    outputLabel: 'API出力',
    securityLabel: 'セキュリティ不変条件',
    stageCount: '詳細化されたAPI stage',
    phaseIntro: {
      identity: 'クレデンシャルの発行や検証の前に、各アクターが必要とする公開IDと鍵材料を作成します。',
      issuance: 'Holder-Issuer関係を確立し、署名済みVCをDIDCommで送り、モバイルvaultだけに保存します。',
      verification: 'Verifierセッションを作成し、VPを要求し、すべてのDIDとproofを検証して、プライバシーを保つreceiptを送ります。'
    }
  },
  de: {
    title: 'Der vollständige kryptografische Lebenszyklus eines Nachweises',
    overviewTitle: 'Lifecycle-Überblick',
    overviewIntro: 'Eine detaillierte SDK-API-Referenz von Schlüsselerzeugung und DID-Document-Veröffentlichung über DIDComm, VC-Ausstellung, verschlüsselte Speicherung, VP-Erstellung, Prüfung und Inhaber-Receipt.',
    contractNotice: 'Die SDK-Verträge in dieser Referenz sind illustrativ. Paketnamen, APIs und Endpunkte beschreiben geplante Verträge und verbindliche Sicherheitsgrenzen.',
    registryNotice: 'CertNet ist das Standardregister der Sandbox, aber dieselbe DID-registry-Schicht kann Dokumente über did:web, ION oder ein internes Register veröffentlichen und auflösen.',
    phaseCardsIntro: 'Der Lebenszyklus ist in drei Phasen gegliedert, damit jede API-Stufe klare Eigentümer, Eingaben, Ausgaben und Sicherheitsinvarianten hat.',
    inputLabel: 'API-Eingaben',
    outputLabel: 'API-Ausgaben',
    securityLabel: 'Sicherheitsinvariante',
    stageCount: 'API-Stufen detailliert dokumentiert',
    phaseIntro: {
      identity: 'Erstellen Sie die öffentliche Identität und das Schlüsselmaterial, das jeder Akteur vor Ausstellung oder Prüfung benötigt.',
      issuance: 'Stellen Sie die Holder-Issuer-Beziehung her, senden Sie die signierte VC über DIDComm und speichern Sie sie nur im mobilen Tresor.',
      verification: 'Erstellen Sie eine Prüfersitzung, fordern Sie eine VP an, prüfen Sie alle DIDs und Proofs und senden Sie ein datensparsames Receipt.'
    }
  },
  vi: {
    title: 'Toàn bộ vòng đời mật mã của một thực chứng',
    overviewTitle: 'Tổng quan vòng đời',
    overviewIntro: 'Tài liệu API SDK trình bày chi tiết từ bước tạo khóa, công bố tài liệu DID, thiết lập DIDComm, cấp phát và lưu thực chứng (VC), tạo VP, xác minh đến gửi biên nhận cho bên nắm giữ.',
    contractNotice: 'Giao diện SDK trong tài liệu này chỉ mang tính minh họa. Tên gói, API và điểm cuối mô tả giao diện dự kiến cùng các ranh giới bảo mật bắt buộc.',
    registryNotice: 'CertNet là sổ đăng ký mặc định trong môi trường thử nghiệm. Cùng một lớp sổ đăng ký DID cũng có thể công bố và phân giải tài liệu qua did:web, ION hoặc sổ đăng ký nội bộ.',
    phaseCardsIntro: 'Vòng đời được chia thành ba giai đoạn để mỗi bước API có chủ thể, đầu vào, đầu ra và ràng buộc bảo mật rõ ràng.',
    inputLabel: 'Đầu vào API',
    outputLabel: 'Đầu ra API',
    securityLabel: 'Ràng buộc bảo mật',
    stageCount: 'Bước API được mô tả chi tiết',
    phaseIntro: {
      identity: 'Tạo định danh công khai và vật liệu khóa mà mỗi chủ thể cần trước khi phát hành hoặc xác minh thực chứng.',
      issuance: 'Thiết lập quan hệ giữa bên nắm giữ và bên phát hành, gửi thực chứng (VC) đã ký qua DIDComm và chỉ lưu trong kho bảo mật trên thiết bị di động.',
      verification: 'Tạo phiên cho bên xác minh, yêu cầu VP, xác minh từng DID và bằng chứng rồi gửi biên nhận bảo toàn quyền riêng tư.'
    }
  }
};

export const docsReferenceSteps: DocsReferenceStep[] = [
  {
    id: 'issuer-create-keys',
    number: '01',
    phase: 'identity',
    actor: 'issuer',
    title: {
      en: 'Create the issuer key pair',
      es: 'Crear el par de claves del emisor',
      ja: '発行者の鍵ペアを作成',
      de: 'Schlüsselpaar des Ausstellers erstellen',
      vi: 'Tạo cặp khóa cho bên phát hành'
    },
    summary: {
      en: 'The SDK creates an asymmetric signing key. The private key is protected for its runtime; the public key will be placed in the DID Document.',
      es: 'El SDK crea una clave de firma asimétrica. La clave privada se protege según el entorno; la clave pública se incluirá en el DID Document.',
      ja: 'SDKは非対称署名鍵を作成します。秘密鍵は実行環境に合わせて保護され、公開鍵はDID Documentに入ります。',
      de: 'Das SDK erzeugt einen asymmetrischen Signaturschlüssel. Der private Schlüssel wird je Laufzeit geschützt; der öffentliche Schlüssel kommt in das DID Document.',
      vi: 'SDK tạo khóa ký bất đối xứng. Khóa bí mật được bảo vệ theo môi trường chạy; khóa công khai sẽ được đưa vào DID Document.'
    },
    protocol: 'Ed25519 / ES256',
    inputs: [{
      en: 'Signing algorithm and key-protection policy',
      es: 'Algoritmo de firma y política de protección de claves',
      ja: '署名アルゴリズムと鍵保護ポリシー',
      de: 'Signaturalgorithmus und Schlüssel-Schutzrichtlinie',
      vi: 'Thuật toán ký và chính sách bảo vệ khóa'
    }],
    outputs: [{
      en: 'keyId and public key',
      es: 'keyId y clave pública',
      ja: 'keyIdと公開鍵',
      de: 'keyId und öffentlicher Schlüssel',
      vi: 'keyId và khóa công khai'
    }],
    security: {
      en: 'Servers should use HSM or KMS; apps use Keystore or Secure Enclave; web is suitable only when the key policy is controlled.',
      es: 'Los servidores deben usar HSM o KMS; las apps usan Keystore o Secure Enclave; web solo aplica con política de claves controlada.',
      ja: 'サーバーはHSMまたはKMSを使い、アプリはKeystoreまたはSecure Enclaveを使います。Webは鍵ポリシーを制御できる場合だけ適します。',
      de: 'Server sollten HSM oder KMS nutzen; Apps verwenden Keystore oder Secure Enclave; Web eignet sich nur bei kontrollierter Schlüsselrichtlinie.',
      vi: 'Máy chủ nên dùng HSM hoặc KMS; ứng dụng dùng Keystore hoặc Secure Enclave; nền tảng web chỉ phù hợp khi chính sách khóa được kiểm soát.'
    },
    codeKey: 'issuerKeys',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'issuer-register-did',
    number: '02',
    phase: 'identity',
    actor: 'issuer',
    title: {
      en: 'Create a DID Document and publish it to a DID registry',
      es: 'Crear un DID Document y publicarlo en un DID registry',
      ja: 'DID Documentを作成しDID registryへ公開',
      de: 'DID Document erstellen und in einem DID registry veröffentlichen',
      vi: 'Tạo và công bố tài liệu DID lên sổ đăng ký DID'
    },
    summary: {
      en: 'The DID Document contains the public key and DIDComm service endpoint. The SDK can publish it to CertNet, did:web, ION, or an internal registry.',
      es: 'El DID Document contiene la clave pública y el endpoint DIDComm. El SDK puede publicarlo en CertNet, did:web, ION o un registro interno.',
      ja: 'DID Documentには公開鍵とDIDComm service endpointが含まれます。SDKはCertNet、did:web、ION、内部registryへ公開できます。',
      de: 'Das DID Document enthält öffentlichen Schlüssel und DIDComm-Service-Endpunkt. Das SDK kann es in CertNet, did:web, ION oder einem internen Register veröffentlichen.',
      vi: 'Tài liệu DID chứa khóa công khai và điểm cuối dịch vụ DIDComm. SDK có thể công bố tài liệu lên CertNet, did:web, ION hoặc sổ đăng ký nội bộ.'
    },
    protocol: 'DID Core + DID Registry',
    inputs: [{
      en: 'Public key and DIDComm endpoint',
      es: 'Clave pública y endpoint DIDComm',
      ja: '公開鍵とDIDComm endpoint',
      de: 'Öffentlicher Schlüssel und DIDComm-Endpunkt',
      vi: 'Khóa công khai và điểm cuối DIDComm'
    }],
    outputs: [{
      en: 'Canonical DID and stored DID Document',
      es: 'DID canónico y DID Document guardado',
      ja: '正規DIDと保存済みDID Document',
      de: 'Kanonische DID und gespeichertes DID Document',
      vi: 'DID chuẩn và DID Document đã lưu'
    }],
    security: {
      en: 'The registry never receives the private key. The verificationMethod must reference the keyId used to sign VCs.',
      es: 'El registro nunca recibe la clave privada. verificationMethod debe apuntar al keyId usado para firmar VCs.',
      ja: 'registryは秘密鍵を受け取りません。verificationMethodはVC署名に使うkeyIdを参照する必要があります。',
      de: 'Das Register erhält niemals den privaten Schlüssel. verificationMethod muss auf die keyId verweisen, die VCs signiert.',
      vi: 'Sổ đăng ký không nhận khóa bí mật. verificationMethod phải trỏ đúng keyId dùng để ký thực chứng (VC).'
    },
    codeKey: 'issuerDid',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'holder-create-wallet',
    number: '03',
    phase: 'identity',
    actor: 'holder',
    title: {
      en: 'Initialize the Holder wallet and single encrypted vault',
      es: 'Inicializar la wallet del titular y una bóveda cifrada única',
      ja: '保有者walletと単一暗号化vaultを初期化',
      de: 'Inhaber-Wallet und einzigen verschlüsselten Tresor initialisieren',
      vi: 'Khởi tạo ví của bên nắm giữ và kho mã hóa riêng'
    },
    summary: {
      en: 'The app creates DID keys, a DID Document, and a VC vault. DID and vault keys are wrapped by non-exportable device protection keys.',
      es: 'La app crea claves DID, un DID Document y una bóveda VC. Las claves DID y de bóveda se protegen con claves de dispositivo no exportables.',
      ja: 'アプリはDID鍵、DID Document、VC vaultを作成します。DID鍵とvault鍵はexport不可のデバイス保護鍵で包まれます。',
      de: 'Die App erstellt DID-Schlüssel, ein DID Document und einen VC-Tresor. DID- und Tresorschlüssel werden durch nicht exportierbare Geräteschlüssel geschützt.',
      vi: 'Ứng dụng tạo khóa DID, tài liệu DID và kho thực chứng (VC). Khóa DID và khóa kho được bọc bằng khóa bảo vệ không thể xuất khỏi thiết bị.'
    },
    protocol: 'Mobile Secure Storage + DID Registry',
    inputs: [{
      en: 'Biometric and device-migration policy',
      es: 'Política biométrica y de migración de dispositivo',
      ja: '生体認証と端末移行ポリシー',
      de: 'Biometrie- und Gerätemigrationsrichtlinie',
      vi: 'Sinh trắc học và chính sách đổi thiết bị'
    }],
    outputs: [{
      en: 'Holder DID and activated secure vault',
      es: 'DID del titular y bóveda segura activada',
      ja: '保有者DIDと有効化済みsecure vault',
      de: 'Inhaber-DID und aktivierter sicherer Tresor',
      vi: 'DID của bên nắm giữ và kho bảo mật đã được kích hoạt'
    }],
    security: {
      en: 'VCs cannot be exported. During migration, the old wallet must delete all keys and VCs before the new vault activates.',
      es: 'Las VCs no se exportan. En una migración, la wallet anterior debe borrar todas las claves y VCs antes de activar la nueva bóveda.',
      ja: 'VCはexportできません。移行時は新しいvaultの有効化前に、古いwalletがすべての鍵とVCを削除する必要があります。',
      de: 'VCs können nicht exportiert werden. Bei Migration muss die alte Wallet alle Schlüssel und VCs löschen, bevor der neue Tresor aktiv wird.',
      vi: 'Không được xuất thực chứng (VC) khỏi ví. Khi đổi thiết bị, ví cũ phải xóa toàn bộ khóa và VC trước khi kho mới được kích hoạt.'
    },
    codeKey: 'holderWallet',
    variants: mobileVariants
  },
  {
    id: 'issuer-create-invitation',
    number: '04',
    phase: 'issuance',
    actor: 'issuer',
    title: {
      en: 'Issuer creates an issuance connection QR',
      es: 'El emisor crea un QR de conexión para emisión',
      ja: '発行者が発行接続QRを作成',
      de: 'Aussteller erstellt einen QR für die Ausstellungsverbindung',
      vi: 'Bên phát hành tạo QR kết nối cấp phát'
    },
    summary: {
      en: 'The Issuer creates a single-use DIDComm Out-of-Band invitation and encodes it as a QR. The QR contains connection setup data, not a VC.',
      es: 'El emisor crea una invitación DIDComm Out-of-Band de un solo uso y la codifica como QR. El QR contiene datos de conexión, no una VC.',
      ja: '発行者は1回限りのDIDComm Out-of-Band invitationを作りQR化します。QRには接続設定だけが入り、VCは入りません。',
      de: 'Der Aussteller erstellt eine einmalige DIDComm-Out-of-Band-Einladung und codiert sie als QR. Der QR enthält Verbindungsdaten, keine VC.',
      vi: 'Bên phát hành tạo lời mời DIDComm Out-of-Band dùng một lần và mã hóa thành QR. Mã QR chỉ chứa thông tin thiết lập kết nối, không chứa thực chứng (VC).'
    },
    protocol: 'DIDComm OOB 2.0',
    inputs: [{
      en: 'Issuer DID, receive-credential goal, and expiry',
      es: 'DID del emisor, objetivo receive-credential y vencimiento',
      ja: '発行者DID、receive-credential目的、有効期限',
      de: 'Aussteller-DID, receive-credential-Ziel und Ablaufzeit',
      vi: 'DID của bên phát hành, mục đích nhận thực chứng và thời hạn'
    }],
    outputs: [{
      en: 'Invitation ID and QR payload',
      es: 'ID de invitación y payload QR',
      ja: 'Invitation IDとQR payload',
      de: 'Einladungs-ID und QR-Payload',
      vi: 'Mã lời mời và dữ liệu QR'
    }],
    security: {
      en: 'The invitation must expire, be single-use, and bind to a specific issuance session.',
      es: 'La invitación debe expirar, usarse una sola vez y quedar vinculada a una sesión de emisión concreta.',
      ja: 'invitationは期限付き、1回限り、特定の発行sessionに紐づく必要があります。',
      de: 'Die Einladung muss ablaufen, nur einmal nutzbar sein und an eine bestimmte Ausstellungssitzung gebunden sein.',
      vi: 'Lời mời phải có thời hạn, chỉ dùng một lần và gắn với phiên cấp phát cụ thể.'
    },
    codeKey: 'issuerInvitation',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'holder-connect-issuer',
    number: '05',
    phase: 'issuance',
    actor: 'holder',
    title: {
      en: 'Holder scans QR and connects to the Issuer',
      es: 'El titular escanea el QR y se conecta con el emisor',
      ja: '保有者がQRを読み取り発行者へ接続',
      de: 'Inhaber scannt den QR und verbindet sich mit dem Aussteller',
      vi: 'Bên nắm giữ quét mã QR và kết nối với bên phát hành'
    },
    summary: {
      en: 'The wallet decodes the invitation, resolves the Issuer DID Document, validates the endpoint, and completes the DIDComm handshake.',
      es: 'La wallet decodifica la invitación, resuelve el DID Document del emisor, valida el endpoint y completa el handshake DIDComm.',
      ja: 'walletはinvitationを復号し、発行者DID Documentを解決し、endpointを検証してDIDComm handshakeを完了します。',
      de: 'Die Wallet decodiert die Einladung, löst das DID Document des Ausstellers auf, validiert den Endpunkt und schließt den DIDComm-Handshake ab.',
      vi: 'Ví giải mã lời mời, phân giải tài liệu DID của bên phát hành, xác thực điểm cuối rồi hoàn tất quá trình bắt tay DIDComm.'
    },
    protocol: 'DIDComm DID Exchange',
    inputs: [{
      en: 'QR payload from Issuer',
      es: 'Payload QR del emisor',
      ja: '発行者からのQR payload',
      de: 'QR-Payload vom Aussteller',
      vi: 'Dữ liệu QR từ bên phát hành'
    }],
    outputs: [{
      en: 'Encrypted Holder-Issuer connectionId',
      es: 'connectionId cifrado entre titular y emisor',
      ja: '暗号化されたHolder-Issuer connectionId',
      de: 'Verschlüsselte Holder-Issuer connectionId',
      vi: 'connectionId được mã hóa giữa bên nắm giữ và bên phát hành'
    }],
    security: {
      en: 'The wallet must display the resolved Issuer identity so the user knows whom they are connecting to.',
      es: 'La wallet debe mostrar la identidad resuelta del emisor para que el usuario sepa con quién conecta.',
      ja: 'walletは解決済みの発行者IDを表示し、ユーザーが接続先を確認できるようにします。',
      de: 'Die Wallet muss die aufgelöste Ausstelleridentität anzeigen, damit der Nutzer die Gegenstelle kennt.',
      vi: 'Ví phải hiển thị danh tính bên phát hành đã được phân giải để người dùng biết mình đang kết nối với ai.'
    },
    codeKey: 'holderIssuerConnection',
    variants: mobileVariants
  },
  {
    id: 'issuer-sign-send-vc',
    number: '06',
    phase: 'issuance',
    actor: 'issuer',
    title: {
      en: 'Sign the VC and send it over the SSI connection',
      es: 'Firmar la VC y enviarla por la conexión SSI',
      ja: 'VCに署名してSSI接続で送信',
      de: 'VC signieren und über die SSI-Verbindung senden',
      vi: 'Ký VC và gửi qua kết nối SSI'
    },
    summary: {
      en: 'The Issuer creates a VC with issuer DID, subject DID, and claims, signs it with the matching private key, then sends it through DIDComm.',
      es: 'El emisor crea una VC con issuer DID, subject DID y claims, la firma con la clave privada correspondiente y la envía por DIDComm.',
      ja: '発行者はissuer DID、subject DID、claimsを含むVCを作成し、対応する秘密鍵で署名してDIDCommで送信します。',
      de: 'Der Aussteller erstellt eine VC mit issuer DID, subject DID und Claims, signiert sie mit dem passenden privaten Schlüssel und sendet sie per DIDComm.',
      vi: 'Bên phát hành tạo thực chứng (VC) chứa DID của bên phát hành, DID của chủ thể và các thuộc tính, ký bằng khóa bí mật tương ứng rồi gửi qua DIDComm.'
    },
    protocol: 'W3C VC + DIDComm Issue Credential',
    inputs: [{
      en: 'Issuer DID, Holder DID, claims, and connectionId',
      es: 'Issuer DID, Holder DID, claims y connectionId',
      ja: 'Issuer DID、Holder DID、claims、connectionId',
      de: 'Issuer DID, Holder DID, Claims und connectionId',
      vi: 'DID của bên phát hành, DID của bên nắm giữ, các thuộc tính và connectionId'
    }],
    outputs: [{
      en: 'Signed VC and message ID',
      es: 'VC firmada e ID de mensaje',
      ja: '署名済みVCとmessage ID',
      de: 'Signierte VC und Nachrichten-ID',
      vi: 'VC đã ký và message ID'
    }],
    security: {
      en: 'proof.verificationMethod must reference the matching public key in the published DID Document; the private key is accessed only through a key handle.',
      es: 'proof.verificationMethod debe referenciar la clave pública correspondiente en el DID Document publicado; la clave privada solo se usa mediante un key handle.',
      ja: 'proof.verificationMethodは公開済みDID Document内の対応公開鍵を参照する必要があります。秘密鍵はkey handle経由でのみ使われます。',
      de: 'proof.verificationMethod muss auf den passenden öffentlichen Schlüssel im veröffentlichten DID Document verweisen; der private Schlüssel läuft nur über ein Key Handle.',
      vi: 'proof.verificationMethod phải trỏ đến khóa công khai tương ứng trong tài liệu DID đã công bố; khóa bí mật chỉ được truy cập qua mã tham chiếu khóa.'
    },
    codeKey: 'issueCredential',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'holder-verify-store-vc',
    number: '07',
    phase: 'issuance',
    actor: 'holder',
    title: {
      en: 'Holder verifies and stores the VC in the secure vault',
      es: 'El titular verifica y guarda la VC en la bóveda segura',
      ja: '保有者がVCを検証してsecure vaultへ保存',
      de: 'Inhaber prüft und speichert die VC im sicheren Tresor',
      vi: 'Bên nắm giữ xác minh và lưu thực chứng (VC) vào kho bảo mật'
    },
    summary: {
      en: 'The wallet receives the VC, resolves the issuer DID, verifies signature and status, then encrypts the VC before local storage.',
      es: 'La wallet recibe la VC, resuelve el DID del emisor, verifica firma y estado, y cifra la VC antes de guardarla localmente.',
      ja: 'walletはVCを受信し、issuer DIDを解決し、署名と状態を検証してからVCを暗号化してローカル保存します。',
      de: 'Die Wallet empfängt die VC, löst die Issuer DID auf, prüft Signatur und Status und verschlüsselt die VC vor lokaler Speicherung.',
      vi: 'Ví nhận thực chứng (VC), phân giải DID của bên phát hành, xác minh chữ ký và trạng thái rồi mã hóa VC trước khi lưu trên thiết bị.'
    },
    protocol: 'DID Resolve + Encrypted Vault',
    inputs: [{
      en: 'VC received over DIDComm',
      es: 'VC recibida por DIDComm',
      ja: 'DIDCommで受信したVC',
      de: 'Per DIDComm empfangene VC',
      vi: 'VC nhận qua DIDComm'
    }],
    outputs: [{
      en: 'Encrypted credential record',
      es: 'Registro de credencial cifrado',
      ja: '暗号化credential record',
      de: 'Verschlüsselter Credential-Datensatz',
      vi: 'Bản ghi thực chứng được mã hóa'
    }],
    security: {
      en: 'Every VC read requires Secure Enclave or Keystore to unwrap the vault key; the app never receives a clear private key.',
      es: 'Cada lectura de VC requiere Secure Enclave o Keystore para abrir la vault key; la app nunca recibe una clave privada en claro.',
      ja: 'VCを読むたびにSecure EnclaveまたはKeystoreがvault keyを解除します。アプリは平文の秘密鍵を受け取りません。',
      de: 'Jeder VC-Lesezugriff erfordert Secure Enclave oder Keystore zum Entsperren des Tresorschlüssels; die App erhält nie einen privaten Schlüssel im Klartext.',
      vi: 'Mỗi lần đọc VC, SDK yêu cầu Secure Enclave hoặc Keystore mở khóa vault key; ứng dụng không nhận khóa bí mật dạng rõ.'
    },
    codeKey: 'holderStore',
    variants: mobileVariants
  },
  {
    id: 'verifier-register-did',
    number: '08',
    phase: 'verification',
    actor: 'verifier',
    title: {
      en: 'Initialize the Verifier identity',
      es: 'Inicializar la identidad del verificador',
      ja: '検証者IDを初期化',
      de: 'Prüferidentität initialisieren',
      vi: 'Khởi tạo danh tính của bên xác minh'
    },
    summary: {
      en: 'The Verifier creates keys and publishes a DID Document with public key and DIDComm endpoint so the Holder can authenticate it.',
      es: 'El verificador crea claves y publica un DID Document con clave pública y endpoint DIDComm para que el titular pueda autenticarlo.',
      ja: '検証者は鍵を作成し、公開鍵とDIDComm endpointを含むDID Documentを公開して、保有者が認証できるようにします。',
      de: 'Der Prüfer erstellt Schlüssel und veröffentlicht ein DID Document mit öffentlichem Schlüssel und DIDComm-Endpunkt, damit der Inhaber ihn authentifizieren kann.',
      vi: 'Bên xác minh tạo khóa và công bố tài liệu DID chứa khóa công khai cùng điểm cuối DIDComm để bên nắm giữ xác thực trước khi chia sẻ.'
    },
    protocol: 'DID Core + DID Registry',
    inputs: [{
      en: 'Public key and VP receiving endpoint',
      es: 'Clave pública y endpoint de recepción VP',
      ja: '公開鍵とVP受信endpoint',
      de: 'Öffentlicher Schlüssel und VP-Empfangsendpunkt',
      vi: 'Khóa công khai và điểm cuối nhận VP'
    }],
    outputs: [{
      en: 'Verifier DID',
      es: 'DID del verificador',
      ja: 'Verifier DID',
      de: 'Verifier DID',
      vi: 'DID của bên xác minh'
    }],
    security: {
      en: 'The Holder displays a sharing request only after authenticating the Verifier DID and domain.',
      es: 'El titular muestra la solicitud de compartir solo después de autenticar el DID y dominio del verificador.',
      ja: '保有者はVerifier DIDとdomainを認証した後にだけ共有要求を表示します。',
      de: 'Der Inhaber zeigt eine Freigabeanfrage erst nach Authentifizierung von Verifier DID und Domain an.',
      vi: 'Bên nắm giữ chỉ hiển thị yêu cầu chia sẻ sau khi xác thực DID và tên miền của bên xác minh.'
    },
    codeKey: 'verifierIdentity',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'verifier-create-invitation',
    number: '09',
    phase: 'verification',
    actor: 'verifier',
    title: {
      en: 'Verifier creates a verification connection QR',
      es: 'El verificador crea un QR de conexión para verificación',
      ja: '検証者が検証接続QRを作成',
      de: 'Prüfer erstellt einen QR für die Prüfverbindung',
      vi: 'Bên xác minh tạo mã QR kết nối'
    },
    summary: {
      en: 'The Verifier creates a DIDComm invitation bound to a verification session and displays it as a QR for the Holder.',
      es: 'El verificador crea una invitación DIDComm vinculada a una sesión de verificación y la muestra como QR.',
      ja: '検証者はverification sessionに紐づくDIDComm invitationを作成し、保有者向けにQR表示します。',
      de: 'Der Prüfer erstellt eine an die Prüfsitzung gebundene DIDComm-Einladung und zeigt sie dem Inhaber als QR.',
      vi: 'Bên xác minh tạo lời mời DIDComm gắn với phiên xác minh và hiển thị dưới dạng mã QR để bên nắm giữ quét.'
    },
    protocol: 'DIDComm OOB 2.0',
    inputs: [{
      en: 'Verifier DID, domain, and session ID',
      es: 'DID del verificador, dominio e ID de sesión',
      ja: 'Verifier DID、domain、session ID',
      de: 'Verifier DID, Domain und Sitzungs-ID',
      vi: 'DID của bên xác minh, tên miền và mã phiên'
    }],
    outputs: [{
      en: 'QR payload and verificationSessionId',
      es: 'Payload QR y verificationSessionId',
      ja: 'QR payloadとverificationSessionId',
      de: 'QR-Payload und verificationSessionId',
      vi: 'Dữ liệu QR và verificationSessionId'
    }],
    security: {
      en: 'The QR contains no personal data or VP; the challenge is created by a cryptographic random generator.',
      es: 'El QR no contiene datos personales ni VP; el challenge se crea con un generador aleatorio criptográfico.',
      ja: 'QRには個人データやVPを含めません。challengeは暗号論的乱数生成器で作成します。',
      de: 'Der QR enthält keine personenbezogenen Daten oder VP; die Challenge wird kryptografisch zufällig erzeugt.',
      vi: 'QR không chứa dữ liệu cá nhân hoặc VP; challenge được tạo bằng bộ sinh số ngẫu nhiên mật mã.'
    },
    codeKey: 'verifierInvitation',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'holder-connect-verifier',
    number: '10',
    phase: 'verification',
    actor: 'holder',
    title: {
      en: 'Holder scans QR and connects to the Verifier',
      es: 'El titular escanea el QR y se conecta con el verificador',
      ja: '保有者がQRを読み取り検証者へ接続',
      de: 'Inhaber scannt den QR und verbindet sich mit dem Prüfer',
      vi: 'Bên nắm giữ quét mã QR và kết nối với bên xác minh'
    },
    summary: {
      en: 'The wallet resolves the Verifier DID, displays its identity, and establishes a DIDComm connection only after user confirmation.',
      es: 'La wallet resuelve el DID del verificador, muestra su identidad y establece DIDComm solo tras confirmación del usuario.',
      ja: 'walletはVerifier DIDを解決し、そのIDを表示し、ユーザー確認後にだけDIDComm接続を確立します。',
      de: 'Die Wallet löst die Verifier DID auf, zeigt die Identität an und stellt die DIDComm-Verbindung erst nach Nutzerbestätigung her.',
      vi: 'Ví phân giải DID của bên xác minh, hiển thị danh tính của họ và chỉ thiết lập kết nối DIDComm sau khi người dùng xác nhận.'
    },
    protocol: 'DIDComm DID Exchange',
    inputs: [{
      en: 'QR payload from Verifier',
      es: 'Payload QR del verificador',
      ja: '検証者からのQR payload',
      de: 'QR-Payload vom Prüfer',
      vi: 'Dữ liệu QR từ bên xác minh'
    }],
    outputs: [{
      en: 'Holder-Verifier connectionId',
      es: 'connectionId entre titular y verificador',
      ja: 'Holder-Verifier connectionId',
      de: 'Holder-Verifier connectionId',
      vi: 'connectionId giữa bên nắm giữ và bên xác minh'
    }],
    security: {
      en: 'The Issuer connectionId is never reused; each relationship has its own connection and pairwise DID.',
      es: 'El connectionId del emisor nunca se reutiliza; cada relación tiene su propia conexión y pairwise DID.',
      ja: 'Issuer connectionIdは再利用しません。各関係は独自の接続とpairwise DIDを持ちます。',
      de: 'Die Issuer connectionId wird nie wiederverwendet; jede Beziehung hat eigene Verbindung und pairwise DID.',
      vi: 'Không tái sử dụng connectionId của bên phát hành; mỗi quan hệ có kết nối và DID theo cặp riêng.'
    },
    codeKey: 'holderVerifierConnection',
    variants: mobileVariants
  },
  {
    id: 'verifier-send-request',
    number: '11',
    phase: 'verification',
    actor: 'verifier',
    title: {
      en: 'Verifier sends a sharing request over DIDComm',
      es: 'El verificador envía una solicitud de compartir por DIDComm',
      ja: '検証者がDIDCommで共有要求を送信',
      de: 'Prüfer sendet Freigabeanfrage über DIDComm',
      vi: 'Bên xác minh gửi yêu cầu chia sẻ qua DIDComm'
    },
    summary: {
      en: 'After connection, the Verifier sends a Presentation Definition, challenge, domain, purpose, and expiry.',
      es: 'Tras la conexión, el verificador envía Presentation Definition, challenge, dominio, propósito y vencimiento.',
      ja: '接続後、検証者はPresentation Definition、challenge、domain、目的、有効期限を送信します。',
      de: 'Nach der Verbindung sendet der Prüfer Presentation Definition, Challenge, Domain, Zweck und Ablaufzeit.',
      vi: 'Sau khi kết nối, bên xác minh gửi định nghĩa trình xuất, mã thử thách, tên miền, mục đích sử dụng và thời hạn.'
    },
    protocol: 'DIDComm Present Proof',
    inputs: [{
      en: 'Presentation Definition and connectionId',
      es: 'Presentation Definition y connectionId',
      ja: 'Presentation DefinitionとconnectionId',
      de: 'Presentation Definition und connectionId',
      vi: 'Định nghĩa trình xuất và connectionId'
    }],
    outputs: [{
      en: 'Sent presentation request',
      es: 'Solicitud de presentación enviada',
      ja: '送信済みpresentation request',
      de: 'Gesendete Präsentationsanfrage',
      vi: 'Yêu cầu trình xuất đã gửi'
    }],
    security: {
      en: 'The request must minimize data and explain its purpose before the Holder consents.',
      es: 'La solicitud debe minimizar datos y explicar su propósito antes del consentimiento del titular.',
      ja: '要求はデータを最小化し、保有者の同意前に目的を説明する必要があります。',
      de: 'Die Anfrage muss Daten minimieren und ihren Zweck erklären, bevor der Inhaber zustimmt.',
      vi: 'Yêu cầu phải tối thiểu hóa dữ liệu và giải thích mục đích trước khi bên nắm giữ đồng ý.'
    },
    codeKey: 'presentationRequest',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'holder-create-send-vp',
    number: '12',
    phase: 'verification',
    actor: 'holder',
    title: {
      en: 'Holder consents, creates a VP, and sends it to the Verifier',
      es: 'El titular consiente, crea una VP y la envía al verificador',
      ja: '保有者が同意しVPを作成して検証者へ送信',
      de: 'Inhaber stimmt zu, erstellt eine VP und sendet sie an den Prüfer',
      vi: 'Bên nắm giữ đồng ý, tạo VP và gửi cho bên xác minh'
    },
    summary: {
      en: 'After biometric authentication, the wallet opens the secure vault, selects matching VCs, creates a challenge-bound VP, signs it, and sends it over DIDComm.',
      es: 'Tras autenticación biométrica, la wallet abre la bóveda, elige VCs compatibles, crea una VP vinculada al challenge, la firma y la envía por DIDComm.',
      ja: '生体認証後、walletはsecure vaultを開き、該当VCを選び、challengeに紐づくVPを作成、署名してDIDCommで送信します。',
      de: 'Nach biometrischer Authentifizierung öffnet die Wallet den Tresor, wählt passende VCs, erstellt eine Challenge-gebundene VP, signiert und sendet sie per DIDComm.',
      vi: 'Sau khi xác thực sinh trắc học, ví mở kho bảo mật, chọn thực chứng (VC) phù hợp, tạo VP gắn với mã thử thách, ký và gửi qua DIDComm.'
    },
    protocol: 'W3C VP + DIDComm Present Proof',
    inputs: [{
      en: 'Presentation request and user consent',
      es: 'Solicitud de presentación y consentimiento del usuario',
      ja: 'presentation requestとユーザー同意',
      de: 'Präsentationsanfrage und Nutzerzustimmung',
      vi: 'Yêu cầu trình xuất và sự đồng ý của người dùng'
    }],
    outputs: [{
      en: 'Signed VP and message ID',
      es: 'VP firmada e ID de mensaje',
      ja: '署名済みVPとmessage ID',
      de: 'Signierte VP und Nachrichten-ID',
      vi: 'VP đã ký và message ID'
    }],
    security: {
      en: 'The SDK decrypts VCs only in transient memory, clears sensitive data after VP creation, and never permits VC export.',
      es: 'El SDK descifra VCs solo en memoria transitoria, limpia datos sensibles tras crear la VP y nunca permite exportar VCs.',
      ja: 'SDKはVCを一時メモリでのみ復号し、VP作成後に機微データを消去し、VC exportを許可しません。',
      de: 'Das SDK entschlüsselt VCs nur im flüchtigen Speicher, löscht sensible Daten nach VP-Erstellung und erlaubt nie VC-Export.',
      vi: 'SDK chỉ giải mã thực chứng (VC) trong bộ nhớ tạm, xóa dữ liệu nhạy cảm sau khi tạo VP và không cho phép xuất VC.'
    },
    codeKey: 'createPresentation',
    variants: mobileVariants
  },
  {
    id: 'verifier-verify-vp',
    number: '13',
    phase: 'verification',
    actor: 'verifier',
    title: {
      en: 'Verifier resolves DIDs and verifies the VP',
      es: 'El verificador resuelve DIDs y verifica la VP',
      ja: '検証者がDIDを解決してVPを検証',
      de: 'Prüfer löst DIDs auf und prüft die VP',
      vi: 'Bên xác minh phân giải DID và xác minh VP'
    },
    summary: {
      en: 'The Verifier receives the VP, resolves Holder and Issuer DIDs, obtains public keys, and checks signatures, challenge, domain, schema, and VC status.',
      es: 'El verificador recibe la VP, resuelve DIDs de Holder e Issuer, obtiene claves públicas y comprueba firmas, challenge, dominio, schema y estado de VC.',
      ja: '検証者はVPを受信し、HolderとIssuerのDIDを解決し、公開鍵を取得して署名、challenge、domain、schema、VC状態を検証します。',
      de: 'Der Prüfer empfängt die VP, löst Holder- und Issuer-DIDs auf, erhält öffentliche Schlüssel und prüft Signaturen, Challenge, Domain, Schema und VC-Status.',
      vi: 'Bên xác minh nhận VP, phân giải DID của bên nắm giữ và từng bên phát hành, lấy khóa công khai rồi kiểm tra chữ ký, mã thử thách, tên miền, lược đồ và trạng thái VC.'
    },
    protocol: 'DID Resolve + W3C VC/VP Verification',
    inputs: [{
      en: 'VP received over DIDComm and verification session',
      es: 'VP recibida por DIDComm y sesión de verificación',
      ja: 'DIDCommで受信したVPとverification session',
      de: 'Per DIDComm empfangene VP und Prüfsitzung',
      vi: 'VP nhận qua DIDComm và phiên xác minh'
    }],
    outputs: [{
      en: 'VerificationResult with detailed reason codes',
      es: 'VerificationResult con códigos de motivo detallados',
      ja: '詳細reason code付きVerificationResult',
      de: 'VerificationResult mit detaillierten Reason Codes',
      vi: 'VerificationResult có mã lỗi chi tiết'
    }],
    security: {
      en: 'Signature checking alone is insufficient: replay challenge, domain, expiration, and revocation status must also be checked.',
      es: 'Comprobar solo la firma no basta: también hay que validar challenge anti-replay, dominio, vencimiento y revocación.',
      ja: '署名確認だけでは不十分です。replay challenge、domain、有効期限、失効状態も確認します。',
      de: 'Signaturprüfung allein reicht nicht: Replay-Challenge, Domain, Ablauf und Widerrufsstatus müssen ebenfalls geprüft werden.',
      vi: 'Ngoài chữ ký, hệ thống còn phải kiểm tra mã thử thách chống phát lại, tên miền, thời hạn và trạng thái thu hồi.'
    },
    codeKey: 'verifyPresentation',
    variants: allIssuerVerifierVariants
  },
  {
    id: 'verifier-send-result',
    number: '14',
    phase: 'verification',
    actor: 'verifier',
    title: {
      en: 'Send the verification result before business processing',
      es: 'Enviar el resultado de verificación antes del proceso de negocio',
      ja: '業務処理前に検証結果を送信',
      de: 'Prüfergebnis vor Geschäftsverarbeitung senden',
      vi: 'Gửi kết quả xác minh cho bên nắm giữ trước khi xử lý nghiệp vụ'
    },
    summary: {
      en: 'The Verifier creates a signed receipt containing the result and reason code, sends it to the Holder, then runs business-specific processing.',
      es: 'El verificador crea un recibo firmado con resultado y reason code, lo envía al titular y después ejecuta el proceso de negocio.',
      ja: '検証者は結果とreason codeを含む署名済みreceiptを作成して保有者へ送り、その後に業務処理を実行します。',
      de: 'Der Prüfer erstellt ein signiertes Receipt mit Ergebnis und Reason Code, sendet es an den Inhaber und startet erst danach die Fachlogik.',
      vi: 'Bên xác minh tạo biên nhận đã ký chứa kết quả và mã lý do, gửi cho bên nắm giữ rồi mới thực hiện xử lý nghiệp vụ.'
    },
    protocol: 'DIDComm Receipt + Audit Trail',
    inputs: [{
      en: 'VerificationResult and Holder-Verifier connectionId',
      es: 'VerificationResult y connectionId entre Holder y Verifier',
      ja: 'VerificationResultとHolder-Verifier connectionId',
      de: 'VerificationResult und Holder-Verifier connectionId',
      vi: 'VerificationResult và connectionId giữa bên nắm giữ với bên xác minh'
    }],
    outputs: [{
      en: 'Signed receipt and business decision trigger',
      es: 'Recibo firmado y disparador de decisión de negocio',
      ja: '署名済みreceiptと業務判断トリガー',
      de: 'Signiertes Receipt und Auslöser der Geschäftsentscheidung',
      vi: 'Biên nhận đã ký và tác nhân kích hoạt quyết định nghiệp vụ'
    }],
    security: {
      en: 'The receipt must not repeat sensitive Holder claims; store only the decision, reason code, and minimum audit evidence.',
      es: 'El recibo no debe repetir claims sensibles del Holder; guarda solo decisión, reason code y evidencia mínima de auditoría.',
      ja: 'receiptに保有者の機微claimを繰り返してはいけません。判断、reason code、最小限の監査証跡だけを保存します。',
      de: 'Das Receipt darf keine sensiblen Holder-Claims wiederholen; speichern Sie nur Entscheidung, Reason Code und minimale Audit-Belege.',
      vi: 'Biên nhận không được lặp lại thuộc tính nhạy cảm của bên nắm giữ; chỉ lưu quyết định, mã lý do và bằng chứng kiểm toán tối thiểu.'
    },
    codeKey: 'verificationReceipt',
    variants: allIssuerVerifierVariants
  }
];

const comments: Record<Locale, ReferenceComments> = {
  en: {
    mock: 'Illustrative SDK, not for production use.',
    registry: 'Publish or resolve the DID Document through the selected registry provider.',
    resolve: 'Resolve the DID Document through the matching registry provider.',
    secure: 'The private key is accessed only through a protected key handle.',
    qrInvitation: 'The QR only bootstraps DIDComm; it does not contain the credential.',
    credentialOverDidcomm: 'The credential is sent over the DIDComm connection established after QR scan.',
    holderDisplay: 'Display the resolved counterparty identity before the user confirms.',
    minimize: 'Request only claims required for this business purpose.',
    receiptPrivacy: 'The receipt does not repeat sensitive Holder claims.',
    unavailableMobile: 'This API stage is available only in the Holder Mobile SDK.'
  },
  es: {
    mock: 'SDK ilustrativo, no destinado a producción.',
    registry: 'Publica o resuelve el DID Document con el proveedor de registro elegido.',
    resolve: 'Resuelve el DID Document con el proveedor de registro correspondiente.',
    secure: 'La clave privada solo se usa mediante un key handle protegido.',
    qrInvitation: 'El QR solo inicia DIDComm; no contiene la credencial.',
    credentialOverDidcomm: 'La credencial se envía por la conexión DIDComm establecida tras escanear el QR.',
    holderDisplay: 'Muestra la identidad resuelta de la contraparte antes de que el usuario confirme.',
    minimize: 'Solicita solo los claims necesarios para este propósito de negocio.',
    receiptPrivacy: 'El recibo no repite claims sensibles del Holder.',
    unavailableMobile: 'Esta etapa API solo está disponible en el Holder Mobile SDK.'
  },
  ja: {
    mock: '説明用SDKであり、本番利用向けではありません。',
    registry: '選択したregistry providerでDID Documentを公開または解決します。',
    resolve: '対応するregistry providerでDID Documentを解決します。',
    secure: '秘密鍵は保護されたkey handle経由でのみ使われます。',
    qrInvitation: 'QRはDIDComm開始だけに使い、credentialを含みません。',
    credentialOverDidcomm: 'credentialはQR scan後に確立されたDIDComm接続で送信します。',
    holderDisplay: 'ユーザー確認前に、解決済みの相手IDを表示します。',
    minimize: 'この業務目的に必要なclaimだけを要求します。',
    receiptPrivacy: 'receiptはHolderの機微claimを繰り返しません。',
    unavailableMobile: 'このAPI stageはHolder Mobile SDK専用です。'
  },
  de: {
    mock: 'Illustratives SDK, nicht für den Produktivbetrieb.',
    registry: 'DID Document über den gewählten Registeranbieter veröffentlichen oder auflösen.',
    resolve: 'DID Document über den passenden Registeranbieter auflösen.',
    secure: 'Der private Schlüssel wird nur über ein geschütztes Key Handle genutzt.',
    qrInvitation: 'Der QR startet nur DIDComm; er enthält keinen Nachweis.',
    credentialOverDidcomm: 'Der Nachweis wird über die nach QR-Scan aufgebaute DIDComm-Verbindung gesendet.',
    holderDisplay: 'Zeigen Sie die aufgelöste Gegenstelle an, bevor der Nutzer bestätigt.',
    minimize: 'Fordern Sie nur Claims an, die für diesen Geschäftszweck nötig sind.',
    receiptPrivacy: 'Das Receipt wiederholt keine sensiblen Holder-Claims.',
    unavailableMobile: 'Diese API-Stufe ist nur im Holder Mobile SDK verfügbar.'
  },
  vi: {
    mock: 'SDK minh họa, chưa dùng trong môi trường thực tế.',
    registry: 'Công bố hoặc phân giải tài liệu DID qua nhà cung cấp sổ đăng ký đã chọn.',
    resolve: 'Phân giải tài liệu DID qua nhà cung cấp sổ đăng ký tương ứng.',
    secure: 'Khóa bí mật chỉ được truy cập qua mã tham chiếu khóa được bảo vệ.',
    qrInvitation: 'Mã QR chỉ dùng để khởi tạo DIDComm, không chứa thực chứng.',
    credentialOverDidcomm: 'Thực chứng được gửi qua kết nối DIDComm đã thiết lập sau khi quét mã QR.',
    holderDisplay: 'Hiển thị danh tính đối tác đã được phân giải trước khi người dùng xác nhận.',
    minimize: 'Chỉ yêu cầu những thuộc tính cần thiết cho mục đích nghiệp vụ.',
    receiptPrivacy: 'Biên nhận không lặp lại thuộc tính nhạy cảm của bên nắm giữ.',
    unavailableMobile: 'Bước API này chỉ có trong SDK di động dành cho bên nắm giữ.'
  }
};

const stageToBlock = (step: DocsReferenceStep, locale: Locale): { type: 'referenceStage'; stage: DocsReferenceStage } => {
  const copy = apiReferenceCopy[locale];

  return {
    type: 'referenceStage',
    stage: {
      id: step.id,
      number: step.number,
      phase: step.phase,
      phaseLabel: docsReferencePhases[step.phase][locale],
      actor: step.actor,
      actorLabel: docsReferenceActors[step.actor][locale],
      protocol: step.protocol,
      title: step.title[locale],
      summary: step.summary[locale],
      inputLabel: copy.inputLabel,
      outputLabel: copy.outputLabel,
      securityLabel: copy.securityLabel,
      inputs: step.inputs.map(input => input[locale]),
      outputs: step.outputs.map(output => output[locale]),
      security: step.security[locale],
      codeKey: step.codeKey,
      variants: step.variants
    }
  };
};

export function buildApiReferenceDocsContent(locale: Locale): DocContent {
  const copy = apiReferenceCopy[locale];
  const phaseOrder: DocsReferencePhase[] = ['identity', 'issuance', 'verification'];

  return {
    title: copy.title,
    category: 'retrieving',
    sections: [
      {
        id: 'api-lifecycle-overview',
        title: copy.overviewTitle,
        blocks: [
          { type: 'p', text: copy.overviewIntro },
          { type: 'callout', text: copy.contractNotice },
          { type: 'callout', text: copy.registryNotice },
          { type: 'p', text: copy.phaseCardsIntro },
          {
            type: 'cards',
            cards: phaseOrder.map(phase => {
              const count = docsReferenceSteps.filter(step => step.phase === phase).length;
              return {
                title: docsReferencePhases[phase][locale],
                text: `${count} ${copy.stageCount}`
              };
            })
          }
        ]
      },
      ...phaseOrder.map(phase => ({
        id: phase,
        title: docsReferencePhases[phase][locale],
        blocks: [
          { type: 'p' as const, text: copy.phaseIntro[phase] },
          ...docsReferenceSteps
            .filter(step => step.phase === phase)
            .map(step => stageToBlock(step, locale))
        ]
      }))
    ]
  };
}

export const getDocsReferenceFileName = (variant: DocsSdkVariant) =>
  `${variant.framework} · ${variant.language} · ${variant.packageName}`;

function jsReference(key: DocsReferenceCodeKey, variant: DocsSdkVariant, locale: Locale) {
  const c = comments[locale];
  const mobile = variant.environment === 'mobile';
  const sdkClass = mobile ? 'IdentraMobile' : 'Identra';
  const init = `import { ${sdkClass} } from '${variant.packageName}';

// ${c.mock}
const identra = new ${sdkClass}({
  environment: 'sandbox',
  didRegistry: {
    defaultProvider: 'certnet',
    providers: ['certnet', 'did:web', 'ion', 'internal-ledger']
  },
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});`;

  const bodies: Record<DocsReferenceCodeKey, string> = {
    issuerKeys: `const issuerKey = await identra.crypto.generateSigningKey({
  algorithm: 'Ed25519',
  protection: '${variant.environment === 'server' ? 'hsm' : mobile ? 'platform-keystore' : 'managed-session'}',
  extractable: false
});
const publicKey = await issuerKey.exportPublicKey();`,
    issuerDid: `// ${c.registry}
const didDocument = await identra.didRegistry.createDocument({
  publicKey,
  didcommEndpoint: 'https://issuer.example/didcomm'
});
const { did } = await identra.didRegistry.publishDidDocument({
  document: didDocument,
  registries: ['certnet', 'did:web']
});`,
    holderWallet: `const wallet = await identra.holder.createWallet({
  singleDevice: true,
  exportCredentials: false,
  requireBiometric: true
});
const protectionKey = await wallet.secureStorage.createProtectionKey({
  extractable: false
});
const didKey = await wallet.crypto.generateWrappedSigningKey(protectionKey);
const vaultKey = await wallet.crypto.generateWrappedVaultKey(protectionKey);
// ${c.registry}
const holderDid = await wallet.didRegistry.publishDid({
  publicKey: didKey.publicKey,
  didcommEndpoint: wallet.didcomm.mediatorEndpoint
});`,
    issuerInvitation: `const issuanceSession = await identra.issuer.createIssuanceSession({
  issuerDid: did,
  expiresIn: '5m',
  singleUse: true
});
const invitation = await issuanceSession.didcomm.createInvitation({
  goalCode: 'receive-credential'
});
// ${c.qrInvitation}
const qrPayload = await identra.qr.encode(invitation);`,
    holderIssuerConnection: `const invitation = await wallet.qr.decode(scannedQr);
// ${c.resolve}
const issuerDocument = await wallet.didRegistry.resolveDidDocument(invitation.from);
// ${c.holderDisplay}
await wallet.ui.confirmConnection({ didDocument: issuerDocument });

const issuerConnection = await wallet.didcomm.acceptInvitation(invitation);`,
    issueCredential: `const credential = await identra.issuer.issueCredential({
  issuerDid: did,
  subjectDid: holderDid,
  type: ['VerifiableCredential', 'UniversityDegree'],
  claims: { degree: 'Information Technology', graduationYear: 2026 },
  // ${c.secure}
  signingKey: issuerKey
});

// ${c.credentialOverDidcomm}
await issuanceSession.didcomm.sendCredential({
  connectionId: issuerConnection.id,
  credential
});`,
    holderStore: `wallet.didcomm.onCredential(async ({ credential }) => {
  // ${c.resolve}
  const issuerDocument = await wallet.didRegistry.resolveDidDocument(credential.issuer);
  await wallet.credentials.verify({ credential, issuerDocument });

  await wallet.credentials.storeEncrypted({
    credential,
    vaultKey,
    requireBiometric: true
  });
});`,
    verifierIdentity: `const verifierKey = await identra.crypto.generateSigningKey({
  algorithm: 'Ed25519',
  protection: '${variant.environment === 'server' ? 'hsm' : mobile ? 'platform-keystore' : 'managed-session'}',
  extractable: false
});
// ${c.registry}
const { did: verifierDid } = await identra.didRegistry.publishDid({
  publicKey: await verifierKey.exportPublicKey(),
  didcommEndpoint: 'https://verifier.example/didcomm'
});`,
    verifierInvitation: `const verificationSession = await identra.verifier.createSession({
  verifierDid,
  domain: 'jobs.example',
  challenge: crypto.randomUUID(),
  expiresIn: '5m'
});
const invitation = await verificationSession.didcomm.createInvitation();
// ${c.qrInvitation}
const qrPayload = await identra.qr.encode(invitation);`,
    holderVerifierConnection: `const invitation = await wallet.qr.decode(scannedQr);
// ${c.resolve}
const verifierDocument = await wallet.didRegistry.resolveDidDocument(invitation.from);
// ${c.holderDisplay}
await wallet.ui.confirmConnection({ didDocument: verifierDocument });

const verifierConnection = await wallet.didcomm.acceptInvitation(invitation);`,
    presentationRequest: `const request = await verificationSession.createRequest({
  purpose: 'Verify university degree for recruitment',
  presentationDefinition: {
    credentialType: 'UniversityDegree',
    // ${c.minimize}
    fields: ['degree', 'graduationYear']
  }
});
await verificationSession.didcomm.sendRequest({
  connectionId: verifierConnection.id,
  request
});`,
    createPresentation: `const request = await wallet.didcomm.waitForPresentationRequest();
const consent = await wallet.ui.requestDisclosureConsent(request);

const presentation = await wallet.presentations.create({
  request,
  consent,
  holderDid,
  unlockVaultWithBiometric: true
});
await wallet.didcomm.sendPresentation({
  connectionId: verifierConnection.id,
  presentation
});`,
    verifyPresentation: `const presentation = await verificationSession.didcomm.waitForPresentation();

const result = await identra.verifier.verifyPresentation({
  presentation,
  challenge: verificationSession.challenge,
  domain: verificationSession.domain,
  // ${c.resolve}
  resolveDidDocument: identra.didRegistry.resolveDidDocument,
  checkCredentialStatus: true
});`,
    verificationReceipt: `const receipt = await verificationSession.createSignedReceipt({
  verified: result.verified,
  reasonCode: result.reasonCode,
  // ${c.receiptPrivacy}
  includeClaims: false
});
await verificationSession.didcomm.sendReceipt({
  connectionId: verifierConnection.id,
  receipt
});

if (result.verified) await runBusinessWorkflow();`
  };

  return `${init}

${bodies[key]}`;
}

function goReference(key: DocsReferenceCodeKey, locale: Locale) {
  const c = comments[locale];
  const operations: Partial<Record<DocsReferenceCodeKey, string>> = {
    issuerKeys: `issuerKey, _ := client.Crypto.GenerateSigningKey(ctx, identra.KeyOptions{
    Algorithm: "Ed25519", Protection: "hsm", Extractable: false,
  })
  publicKey, _ := issuerKey.ExportPublicKey(ctx)`,
    issuerDid: `// ${c.registry}
  draft := identra.NewDIDDocument(publicKey, "https://issuer.example/didcomm")
  registration, _ := client.DIDRegistry.PublishDIDDocument(ctx, draft, identra.PublishOptions{
    Registries: []string{"certnet", "did:web"},
  })
  issuerDID := registration.DID`,
    issuerInvitation: `session, _ := client.Issuer.CreateIssuanceSession(ctx, issuerDID, "5m")
  invitation, _ := session.DIDComm.CreateInvitation(ctx, "receive-credential")
  qrPayload, _ := client.QR.Encode(invitation)`,
    issueCredential: `// ${c.secure}
  credential, _ := client.Issuer.IssueCredential(ctx, identra.IssueOptions{
    IssuerDID: issuerDID, SubjectDID: holderDID,
    Type: "UniversityDegree", SigningKey: issuerKey,
  })
  _ = session.DIDComm.SendCredential(ctx, connectionID, credential)`,
    verifierIdentity: `verifierKey, _ := client.Crypto.GenerateSigningKey(ctx, identra.KeyOptions{
    Algorithm: "Ed25519", Protection: "hsm", Extractable: false,
  })
  // ${c.registry}
  verifierDID, _ := client.DIDRegistry.PublishDID(ctx, verifierKey.PublicKey(), identra.PublishOptions{
    Registries: []string{"certnet", "did:web"},
  })`,
    verifierInvitation: `session, _ := client.Verifier.CreateSession(ctx, verifierDID, identra.SessionOptions{
    Domain: "jobs.example", Challenge: identra.RandomChallenge(),
  })
  invitation, _ := session.DIDComm.CreateInvitation(ctx)
  qrPayload, _ := client.QR.Encode(invitation)`,
    presentationRequest: `request, _ := session.CreatePresentationRequest(ctx, identra.Request{
    Purpose: "Verify university degree for recruitment",
    CredentialType: "UniversityDegree",
    Fields: []string{"degree", "graduationYear"},
  })
  _ = session.DIDComm.SendRequest(ctx, connectionID, request)`,
    verifyPresentation: `presentation, _ := session.DIDComm.WaitForPresentation(ctx)
  // ${c.resolve}
  result, _ := client.Verifier.VerifyPresentation(ctx, presentation, identra.VerifyOptions{
    Challenge: session.Challenge, Domain: session.Domain,
    ResolveDIDFromRegistry: true, CheckCredentialStatus: true,
  })`,
    verificationReceipt: `// ${c.receiptPrivacy}
  receipt, _ := session.CreateSignedReceipt(ctx, result, false)
  _ = session.DIDComm.SendReceipt(ctx, connectionID, receipt)
  if result.Verified { runBusinessWorkflow() }`
  };

  return `package main

import (
  "context"
  identra "github.com/identra-labs/identra-go"
)

func run(ctx context.Context, client *identra.Client) {
  // ${c.mock}
  ${operations[key] ?? `// ${c.unavailableMobile}`}
}`;
}

function nativeReference(key: DocsReferenceCodeKey, variantId: DocsSdkVariantId, locale: Locale) {
  const swift = variantId === 'mobile-ios';
  const c = comments[locale];
  const line = (swiftCode: string, javaCode: string) => swift ? swiftCode : javaCode;
  const operations: Partial<Record<DocsReferenceCodeKey, string>> = {
    issuerKeys: line(
      `let issuerKey = try await identra.crypto.generateSigningKey(
  algorithm: .ed25519, protection: .secureEnclave, extractable: false
)
let publicKey = try await issuerKey.exportPublicKey()`,
      `KeyHandle issuerKey = identra.crypto().generateSigningKey(
  Algorithm.ED25519, Protection.ANDROID_KEYSTORE, false
);
PublicKey publicKey = issuerKey.exportPublicKey();`
    ),
    issuerDid: line(
      `// ${c.registry}
let draft = IdentraDIDDocument(
  publicKey: publicKey,
  didcommEndpoint: "https://issuer.example/didcomm"
)
let registration = try await identra.didRegistry.publishDIDDocument(
  draft, registries: [.certnet, .didWeb]
)
let issuerDID = registration.did`,
      `// ${c.registry}
DIDDocument draft = DIDDocument.create(publicKey, "https://issuer.example/didcomm");
DIDRegistration registration = identra.didRegistry().publishDidDocument(
  draft, List.of("certnet", "did:web")
);
String issuerDid = registration.did();`
    ),
    holderWallet: line(
      `let wallet = try await identra.holder.createWallet(
  singleDevice: true, exportCredentials: false, requireBiometric: true
)
let protectionKey = try await wallet.secureStorage.createProtectionKey(extractable: false)
let didKey = try await wallet.crypto.generateWrappedSigningKey(protectionKey)
let vaultKey = try await wallet.crypto.generateWrappedVaultKey(protectionKey)
// ${c.registry}
let holderDID = try await wallet.didRegistry.publishDID(
  publicKey: didKey.publicKey,
  didcommEndpoint: wallet.didcomm.mediatorEndpoint
)`,
      `HolderWallet wallet = identra.holder().createWallet(true, false, true);
ProtectionKey protectionKey = wallet.secureStorage().createProtectionKey(false);
WrappedKey didKey = wallet.crypto().generateWrappedSigningKey(protectionKey);
WrappedKey vaultKey = wallet.crypto().generateWrappedVaultKey(protectionKey);
// ${c.registry}
String holderDid = wallet.didRegistry().publishDid(
  didKey.publicKey(), wallet.didcomm().mediatorEndpoint()
);`
    ),
    issuerInvitation: line(
      `let session = try await identra.issuer.createIssuanceSession(
  issuerDID: issuerDID, expiresIn: .minutes(5), singleUse: true
)
let invitation = try await session.didcomm.createInvitation(goalCode: "receive-credential")
let qrPayload = try await identra.qr.encode(invitation)`,
      `IssuanceSession session = identra.issuer().createIssuanceSession(
  issuerDid, Duration.ofMinutes(5), true
);
Invitation invitation = session.didcomm().createInvitation("receive-credential");
String qrPayload = identra.qr().encode(invitation);`
    ),
    holderIssuerConnection: line(
      `let invitation = try await wallet.qr.decode(scannedQR)
// ${c.resolve}
let issuerDocument = try await wallet.didRegistry.resolveDIDDocument(invitation.from)
try await wallet.ui.confirmConnection(issuerDocument)
let issuerConnection = try await wallet.didcomm.acceptInvitation(invitation)`,
      `Invitation invitation = wallet.qr().decode(scannedQr);
// ${c.resolve}
DIDDocument issuerDocument = wallet.didRegistry().resolveDidDocument(invitation.from());
wallet.ui().confirmConnection(issuerDocument);
Connection issuerConnection = wallet.didcomm().acceptInvitation(invitation);`
    ),
    issueCredential: line(
      `// ${c.secure}
let credential = try await identra.issuer.issueCredential(
  issuerDID: issuerDID,
  subjectDID: holderDID,
  type: "UniversityDegree",
  claims: ["graduationYear": 2026],
  signingKey: issuerKey
)
try await session.didcomm.sendCredential(connectionID, credential)`,
      `// ${c.secure}
VerifiableCredential credential = identra.issuer().issueCredential(
  issuerDid, holderDid, "UniversityDegree", claims, issuerKey
);
session.didcomm().sendCredential(connectionId, credential);`
    ),
    holderStore: line(
      `wallet.didcomm.onCredential { credential in
  // ${c.resolve}
  let issuerDocument = try await wallet.didRegistry.resolveDIDDocument(credential.issuer)
  try await wallet.credentials.verify(credential, issuerDocument: issuerDocument)
  try await wallet.credentials.storeEncrypted(
    credential, vaultKey: vaultKey, requireBiometric: true
  )
}`,
      `wallet.didcomm().onCredential(credential -> {
  // ${c.resolve}
  DIDDocument issuerDocument = wallet.didRegistry().resolveDidDocument(credential.issuer());
  wallet.credentials().verify(credential, issuerDocument);
  wallet.credentials().storeEncrypted(credential, vaultKey, true);
});`
    ),
    verifierIdentity: line(
      `let verifierKey = try await identra.crypto.generateSigningKey(
  algorithm: .ed25519, protection: .secureEnclave, extractable: false
)
// ${c.registry}
let verifierDID = try await identra.didRegistry.publishDID(
  publicKey: verifierKey.publicKey,
  didcommEndpoint: "https://verifier.example/didcomm"
)`,
      `KeyHandle verifierKey = identra.crypto().generateSigningKey(
  Algorithm.ED25519, Protection.ANDROID_KEYSTORE, false
);
// ${c.registry}
String verifierDid = identra.didRegistry().publishDid(
  verifierKey.publicKey(), "https://verifier.example/didcomm"
);`
    ),
    verifierInvitation: line(
      `let session = try await identra.verifier.createSession(
  verifierDID: verifierDID,
  domain: "jobs.example",
  challenge: Identra.randomChallenge()
)
let invitation = try await session.didcomm.createInvitation()
let qrPayload = try await identra.qr.encode(invitation)`,
      `VerificationSession session = identra.verifier().createSession(
  verifierDid, "jobs.example", Identra.randomChallenge()
);
Invitation invitation = session.didcomm().createInvitation();
String qrPayload = identra.qr().encode(invitation);`
    ),
    holderVerifierConnection: line(
      `let invitation = try await wallet.qr.decode(scannedQR)
// ${c.resolve}
let verifierDocument = try await wallet.didRegistry.resolveDIDDocument(invitation.from)
try await wallet.ui.confirmConnection(verifierDocument)
let verifierConnection = try await wallet.didcomm.acceptInvitation(invitation)`,
      `Invitation invitation = wallet.qr().decode(scannedQr);
// ${c.resolve}
DIDDocument verifierDocument = wallet.didRegistry().resolveDidDocument(invitation.from());
wallet.ui().confirmConnection(verifierDocument);
Connection verifierConnection = wallet.didcomm().acceptInvitation(invitation);`
    ),
    presentationRequest: line(
      `let request = try await session.createPresentationRequest(
  purpose: "Verify university degree for recruitment",
  credentialType: "UniversityDegree",
  fields: ["degree", "graduationYear"]
)
try await session.didcomm.sendRequest(verifierConnection.id, request)`,
      `PresentationRequest request = session.createPresentationRequest(
  "Verify university degree for recruitment",
  "UniversityDegree",
  List.of("degree", "graduationYear")
);
session.didcomm().sendRequest(verifierConnection.id(), request);`
    ),
    createPresentation: line(
      `let request = try await wallet.didcomm.waitForPresentationRequest()
let consent = try await wallet.ui.requestDisclosureConsent(request)
let presentation = try await wallet.presentations.create(
  request: request, consent: consent, unlockVaultWithBiometric: true
)
try await wallet.didcomm.sendPresentation(verifierConnection.id, presentation)`,
      `PresentationRequest request = wallet.didcomm().waitForPresentationRequest();
Consent consent = wallet.ui().requestDisclosureConsent(request);
VerifiablePresentation presentation = wallet.presentations().create(
  request, consent, true
);
wallet.didcomm().sendPresentation(verifierConnection.id(), presentation);`
    ),
    verifyPresentation: line(
      `let presentation = try await session.didcomm.waitForPresentation()
let result = try await identra.verifier.verifyPresentation(
  presentation,
  challenge: session.challenge,
  domain: session.domain,
  resolveDIDDocument: identra.didRegistry.resolveDIDDocument,
  checkCredentialStatus: true
)`,
      `VerifiablePresentation presentation = session.didcomm().waitForPresentation();
VerificationResult result = identra.verifier().verifyPresentation(
  presentation,
  session.challenge(),
  session.domain(),
  identra.didRegistry()::resolveDidDocument,
  true
);`
    ),
    verificationReceipt: line(
      `// ${c.receiptPrivacy}
let receipt = try await session.createSignedReceipt(
  verified: result.verified,
  reasonCode: result.reasonCode,
  includeClaims: false
)
try await session.didcomm.sendReceipt(verifierConnection.id, receipt)
if result.verified { try await runBusinessWorkflow() }`,
      `// ${c.receiptPrivacy}
VerificationReceipt receipt = session.createSignedReceipt(
  result.verified(), result.reasonCode(), false
);
session.didcomm().sendReceipt(verifierConnection.id(), receipt);
if (result.verified()) runBusinessWorkflow();`
    )
  };

  return `${swift ? 'import IdentraSDK' : 'import dev.identra.sdk.Identra;'}

// ${c.mock}
${swift ? 'let identra = Identra(environment: .sandbox)' : 'Identra identra = Identra.sandbox();'}

${operations[key] ?? `// ${c.unavailableMobile}`}`;
}

export function getDocsReferenceSnippet(key: DocsReferenceCodeKey, variantId: DocsSdkVariantId, locale: Locale) {
  const variant = docsSdkVariants.find(item => item.id === variantId) ?? docsSdkVariants[0];

  if (variant.syntax === 'go') return goReference(key, locale);
  if (variant.syntax === 'java' || variant.syntax === 'swift') return nativeReference(key, variant.id, locale);
  return jsReference(key, variant, locale);
}
