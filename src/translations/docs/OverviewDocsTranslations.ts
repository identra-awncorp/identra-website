import type { LocalizedDocsContent } from '../../components/docs/docsTypes';

const issuerCode = `import { Identra } from '@identra/web';

const identra = new Identra({
  environment: 'sandbox',
  didRegistry: {
    defaultProvider: 'certnet',
    providers: ['certnet', 'did:web', 'ion', 'internal-ledger']
  },
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});

const issuer = await identra.issuer.create({
  did: 'did:identra:university',
  keyProtection: 'platform-secure-storage'
});

await issuer.publishDidDocument({
  registries: ['certnet', 'did:web']
});

const credential = await issuer.issue({
  subjectDid: 'did:identra:holder',
  type: 'UniversityDegree',
  claims: {
    degree: 'Information Technology',
    graduationYear: 2026
  }
});

await issuer.didcomm.sendCredentialOffer({
  credential,
  connectionId
});`;

const holderCode = `import { IdentraMobile } from '@identra/react-native';

const identra = new IdentraMobile({
  environment: 'sandbox',
  didRegistry: {
    defaultProvider: 'certnet',
    providers: ['certnet', 'did:web', 'ion', 'internal-ledger']
  },
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});

const wallet = await identra.holder.activateSingleDeviceVault({
  migrationPolicy: 'wipe-old-device',
  exportCredentials: false,
  requireBiometric: true
});

await wallet.didcomm.onCredential(async (credential) => {
  await wallet.verifyAndStore(credential);
});

const request = await wallet.scanPresentationQr(scannedQr);
const consent = await wallet.requestUserConsent(request);
const presentation = await wallet.createPresentation({
  request,
  consent
});

await wallet.didcomm.sendPresentation(presentation);`;

const verifierCode = `import { Identra } from '@identra/web';

const identra = new Identra({
  environment: 'sandbox',
  didRegistry: {
    defaultProvider: 'certnet',
    providers: ['certnet', 'did:web', 'ion', 'internal-ledger']
  },
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});

const verifier = await identra.verifier.create({
  did: 'did:identra:jobs-example'
});

const request = await verifier.createPresentationRequest({
  credentialType: 'UniversityDegree',
  fields: ['degree', 'graduationYear'],
  challenge: crypto.randomUUID()
});

const qrDataUrl = await verifier.createQr(request);
const presentation = await verifier.didcomm.waitForPresentation(request.id);

const result = await verifier.verify({
  presentation,
  resolveDid: (did) => identra.didRegistry.resolveDidDocument(did),
  checkCredentialStatus: true
});

if (result.verified) grantAccess();`;

export const OVERVIEW_DOCS_TRANSLATIONS = {
  en: {
    title: 'Overview',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'Understand SSI through where code actually runs',
        blocks: [
          { type: 'p', text: 'Self-sovereign identity becomes easier to understand when each responsibility has a clear owner. An Issuer creates a Verifiable Credential (VC), the Holder keeps it in a mobile secure vault, and a Verifier requests and verifies a Verifiable Presentation (VP).' },
          { type: 'p', text: 'Identra separates these roles across web, server, and mobile SDKs so that credentials do not drift into systems that should never store them.' },
          { type: 'callout', text: '[Issuer validates and signs VC] -> [Holder stores VC on mobile] -> [Holder consents and creates VP] -> [Verifier validates VP]' },
          { type: 'cards', cards: [
            { title: 'Issuer', text: 'Validates source data, signs the credential, and sends a credential offer through DIDComm.' },
            { title: 'Holder', text: 'Keeps the credential in one mobile secure vault and decides when to disclose claims.' },
            { title: 'Verifier', text: 'Requests only the claims it needs and validates signatures, challenge, and credential status.' },
            { title: 'DID registry', text: 'Publishes and resolves DID Documents through CertNet, did:web, ION, or an internal registry.' }
          ] }
        ]
      },
      {
        id: 'data-boundaries',
        title: 'SSI does not mean every platform holds credentials',
        blocks: [
          { type: 'p', text: 'Identra enforces a strict boundary: the Issuer creates the VC, the Holder phone is its only storage location, and the Verifier receives a presentation created for a specific request. The Verifier does not become a second Holder.' },
          { type: 'callout', text: 'Web and server environments never receive a Holder SDK. They cannot import, export, back up, or silently retain a user credential.' },
          { type: 'list', items: [
            { title: 'Credential transport', text: 'The VC is delivered through an authenticated DIDComm connection; it is not embedded in a QR code.' },
            { title: 'QR purpose', text: 'A QR code bootstraps a connection or carries a presentation request, not the Holder credential itself.' },
            { title: 'Registry choice', text: 'CertNet is the default Sandbox provider, but the same SDK can publish and resolve DID Documents through did:web, ION, or an internal registry.' },
            { title: 'Selective disclosure', text: 'A Verifier asks only for claims required by its current purpose, and the Holder approves the request before a VP is created.' }
          ] },
          { type: 'callout', text: 'The SDKs and endpoints below are illustrative Sandbox examples and are not production packages or contracts.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Step 1: Issue a credential',
        blocks: [
          { type: 'p', text: 'The Issuer verifies authoritative source data, signs a VC, and sends it to the user. Issuer code can run in an internal web application, a server service, or a managed mobile application.' },
          { type: 'p', text: 'Protect the organization signing key for its environment. A server integration should prefer an HSM or managed key service and must never send the private key to the browser.' },
          { type: 'table', headers: ['Runtime', 'Typical integration', 'Key protection'], rows: [
            ['Web client', '@identra/web with JavaScript or TypeScript', 'Platform secure storage for approved internal use'],
            ['Server', 'Server SDK or protected service', 'HSM or managed KMS preferred'],
            ['Mobile app', 'Managed issuer application', 'Hardware-backed platform keystore']
          ] },
          { type: 'code', language: 'typescript', fileName: 'issueCredential.ts', code: issuerCode },
          { type: 'p', text: 'The Holder DID comes from the established relationship or your business system. The VC travels through DIDComm after connection setup; the QR code is used only to establish that connection.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Step 2: Hold and share a credential',
        blocks: [
          { type: 'p', text: 'The VC remains in a secure vault on the Holder phone. When the user scans a Verifier QR code, the app shows the request, asks for consent, creates a VP, and sends it through DIDComm.' },
          { type: 'callout', text: 'Holder is mobile-only. There is no Holder SDK for web or server, credentials cannot be exported, and moving to a new device wipes the old device vault.' },
          { type: 'list', items: [
            { title: 'Supported SDKs', text: 'React Native with TypeScript, native Android with Java, and native iOS with Swift.' },
            { title: 'Single-device vault', text: 'One secure vault is the only credential store; biometric access protects local use.' },
            { title: 'Credential intake', text: 'The wallet resolves the Issuer DID and checks signature and status before saving the VC.' },
            { title: 'User consent', text: 'The wallet creates and sends a VP only after the user has reviewed and approved the request.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'holderWallet.ts', code: holderCode }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Step 3: Verify a presentation',
        blocks: [
          { type: 'p', text: 'The Verifier receives a VP, reads the Holder and Issuer DIDs, resolves their DID Documents through the matching registry provider, and validates signatures, challenge, and revocation status.' },
          { type: 'p', text: 'Verifier code may run on web, server, or mobile, but it must not store the VC as though it were a Holder. Persist only the decision and the minimum evidence required by policy.' },
          { type: 'list', items: [
            { title: 'Request', text: 'Specify the credential type, required claims, purpose, and a fresh challenge.' },
            { title: 'Resolve', text: 'Choose the appropriate provider based on the DID method, such as did:identra, did:web, or did:ion.' },
            { title: 'Validate', text: 'Check presentation proof, credential proof, challenge binding, expiry, and credential status.' },
            { title: 'Decide', text: 'Grant access only after verification succeeds and your own policy accepts the disclosed claims.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'verifyPresentation.ts', code: verifierCode }
        ]
      }
    ]
  },
  es: {
    title: 'Descripción general',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'Entender SSI según dónde se ejecuta cada código',
        blocks: [
          { type: 'p', text: 'La identidad autosoberana se entiende mejor cuando cada responsabilidad tiene un propietario claro. El Emisor crea una Credencial Verificable (VC), el Titular la conserva en una bóveda segura del móvil y el Verificador solicita y valida una Presentación Verificable (VP).' },
          { type: 'p', text: 'Identra separa estos roles entre SDK web, servidor y móvil para impedir que las credenciales terminen en sistemas que nunca deberían almacenarlas.' },
          { type: 'callout', text: '[Emisor valida y firma la VC] -> [Titular guarda la VC en el móvil] -> [Titular acepta y crea la VP] -> [Verificador valida la VP]' },
          { type: 'cards', cards: [
            { title: 'Emisor', text: 'Valida datos de origen, firma la credencial y envía una oferta mediante DIDComm.' },
            { title: 'Titular', text: 'Conserva la credencial en una única bóveda móvil y decide qué atributos revelar.' },
            { title: 'Verificador', text: 'Solicita solo los atributos necesarios y valida firmas, valor de desafío y estado.' },
            { title: 'Registro DID', text: 'Publica y resuelve documentos DID mediante CertNet, did:web, ION o un registro interno.' }
          ] }
        ]
      },
      {
        id: 'data-boundaries',
        title: 'SSI no significa que todas las plataformas guarden credenciales',
        blocks: [
          { type: 'p', text: 'Identra aplica un límite estricto: el Emisor crea la VC, el teléfono del Titular es su único almacenamiento y el Verificador recibe una presentación creada para una solicitud concreta. El Verificador no se convierte en un segundo Titular.' },
          { type: 'callout', text: 'Los entornos web y servidor nunca reciben un SDK de Titular. No pueden importar, exportar, respaldar ni conservar silenciosamente una credencial.' },
          { type: 'list', items: [
            { title: 'Transporte', text: 'La VC se entrega por una conexión DIDComm autenticada; no se incluye dentro de un código QR.' },
            { title: 'Función del QR', text: 'El QR inicia una conexión o contiene una solicitud de presentación, no la credencial del Titular.' },
            { title: 'Elección de registro', text: 'CertNet es el proveedor predeterminado de Sandbox, pero el SDK también admite did:web, ION y registros internos.' },
            { title: 'Divulgación selectiva', text: 'El Verificador pide solo los atributos necesarios y el Titular aprueba antes de crear la VP.' }
          ] },
          { type: 'callout', text: 'Los SDK y puntos de acceso siguientes son ejemplos ilustrativos del entorno de pruebas, no paquetes ni contratos para producción.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Paso 1: Emitir una credencial',
        blocks: [
          { type: 'p', text: 'El Emisor verifica datos autorizados, firma una VC y la envía al usuario. El código puede ejecutarse en una aplicación web interna, un servicio de servidor o una app móvil administrada.' },
          { type: 'p', text: 'Protege la clave de firma según el entorno. En servidor, usa preferiblemente un HSM o un servicio de claves y nunca envíes la clave privada al navegador.' },
          { type: 'table', headers: ['Entorno', 'Integración habitual', 'Protección de clave'], rows: [
            ['Web', '@identra/web con JavaScript o TypeScript', 'Almacenamiento seguro de plataforma para uso interno aprobado'],
            ['Servidor', 'SDK de servidor o servicio protegido', 'HSM o KMS administrado'],
            ['Aplicación móvil', 'Aplicación de emisor administrada', 'Almacén de claves de plataforma protegido por hardware']
          ] },
          { type: 'code', language: 'typescript', fileName: 'issueCredential.ts', code: issuerCode },
          { type: 'p', text: 'El DID del Titular procede de la relación establecida o del sistema de negocio. La VC viaja por DIDComm; el QR solo establece la conexión.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Paso 2: Guardar y compartir una credencial',
        blocks: [
          { type: 'p', text: 'La VC permanece en una bóveda segura del teléfono. Al escanear el QR del Verificador, la app muestra la solicitud, pide consentimiento, crea una VP y la envía por DIDComm.' },
          { type: 'callout', text: 'El Titular solo funciona en móvil. No existe SDK para web o servidor, las credenciales no se exportan y migrar de dispositivo elimina la bóveda anterior.' },
          { type: 'list', items: [
            { title: 'SDK compatibles', text: 'React Native con TypeScript, Android nativo con Java e iOS nativo con Swift.' },
            { title: 'Bóveda de un dispositivo', text: 'Una única bóveda segura almacena las credenciales y el acceso local requiere biometría.' },
            { title: 'Recepción', text: 'La cartera digital resuelve el DID del Emisor y comprueba firma y estado antes de guardar la VC.' },
            { title: 'Consentimiento', text: 'La cartera digital solo crea y envía la VP después de que el usuario apruebe la solicitud.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'holderWallet.ts', code: holderCode }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Paso 3: Verificar una presentación',
        blocks: [
          { type: 'p', text: 'El Verificador recibe una VP, lee los DID del Titular y Emisor, resuelve sus documentos con el proveedor correspondiente y valida firmas, valor de desafío y revocación.' },
          { type: 'p', text: 'Puede ejecutarse en web, servidor o móvil, pero no debe guardar la VC como un Titular. Conserva solo la decisión y la evidencia mínima que exija la política.' },
          { type: 'list', items: [
            { title: 'Solicitar', text: 'Indica el tipo de credencial, atributos requeridos, finalidad y un valor de desafío nuevo.' },
            { title: 'Resolver', text: 'Elige el proveedor según el método DID, como did:identra, did:web o did:ion.' },
            { title: 'Validar', text: 'Comprueba prueba de presentación, firma de credencial, valor de desafío, caducidad y estado.' },
            { title: 'Decidir', text: 'Concede acceso solo cuando la validación y la política propia acepten los atributos.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'verifyPresentation.ts', code: verifierCode }
        ]
      }
    ]
  },
  ja: {
    title: '概要',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'コードの実行場所からSSIを理解する',
        blocks: [
          { type: 'p', text: '自己主権型IDは、各責任の主体を明確にすると理解しやすくなります。発行者が検証可能なクレデンシャル（VC）を作成し、保有者がモバイル端末の安全な保管庫に保存し、検証者が検証可能な提示内容（VP）を要求して検証します。' },
          { type: 'p', text: 'Identraはこれらの役割をWeb、サーバー、モバイルの各SDKに分離し、クレデンシャルが保管対象ではないシステムへ流れ込むことを防ぎます。' },
          { type: 'callout', text: '[発行者がVCを確認・署名] -> [保有者がモバイル端末に保管] -> [保有者が同意してVPを作成] -> [検証者がVPを検証]' },
          { type: 'cards', cards: [
            { title: '発行者', text: '元データを確認してクレデンシャルへ署名し、DIDCommで受け取り案内を送ります。' },
            { title: '保有者', text: '1台のモバイル端末にある安全な保管庫でクレデンシャルを保管し、開示する属性を決めます。' },
            { title: '検証者', text: '必要な属性だけを要求し、署名、チャレンジ値、クレデンシャルの状態を確認します。' },
            { title: 'DIDレジストリ', text: 'CertNet、did:web、ION、社内レジストリでDID文書を公開・解決します。' }
          ] }
        ]
      },
      {
        id: 'data-boundaries',
        title: 'SSIでもすべての基盤がクレデンシャルを保持するわけではない',
        blocks: [
          { type: 'p', text: 'Identraは境界を明確にします。発行者がVCを作成し、保有者の端末だけが保管し、検証者は特定の要求向けに作られたVPを受け取ります。検証者が2人目の保有者になることはありません。' },
          { type: 'callout', text: 'Webとサーバーには保有者向けSDKを提供しません。利用者のクレデンシャルを取り込み、書き出し、バックアップ、または暗黙的に保存することはできません。' },
          { type: 'list', items: [
            { title: 'クレデンシャルの転送', text: 'VCは認証済みのDIDComm接続で配信され、QRコードの中には入りません。' },
            { title: 'QRコードの役割', text: 'QRコードは接続の開始またはVPの提示要求に使い、保有者のクレデンシャル自体は含みません。' },
            { title: 'レジストリの選択', text: 'SandboxではCertNetが既定ですが、同じSDKでdid:web、ION、社内レジストリも利用できます。' },
            { title: '選択的開示', text: '検証者は目的に必要な属性だけを要求し、保有者の承認後にVPを作成します。' }
          ] },
          { type: 'callout', text: '以下のSDKとAPIエンドポイントはSandbox向けの説明用サンプルであり、本番環境向けのパッケージや契約仕様ではありません。' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'ステップ1：クレデンシャルを発行する',
        blocks: [
          { type: 'p', text: '発行者は信頼できる元データを確認し、VCへ署名して利用者へ送ります。発行処理は社内Webアプリ、サーバーサービス、管理対象のモバイルアプリで実行できます。' },
          { type: 'p', text: '組織の署名鍵を実行環境に応じて保護します。サーバー連携ではHSMまたは管理対象の鍵管理サービスを優先し、秘密鍵をブラウザーへ渡してはいけません。' },
          { type: 'table', headers: ['実行環境', '一般的な連携', '鍵の保護'], rows: [
            ['Webクライアント', 'JavaScriptまたはTypeScriptの@identra/web', '承認済み社内利用向けの安全なプラットフォーム保管領域'],
            ['サーバー', 'サーバーSDKまたは保護されたサービス', 'HSMまたは管理対象KMSを推奨'],
            ['モバイルアプリ', '管理対象の発行者アプリ', 'ハードウェアで保護されたプラットフォーム鍵保管領域']
          ] },
          { type: 'code', language: 'typescript', fileName: 'issueCredential.ts', code: issuerCode },
          { type: 'p', text: '保有者のDIDは確立済みの関係または業務システムから取得します。VCは接続確立後にDIDCommで送り、QRコードは接続の開始にだけ使います。' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'ステップ2：クレデンシャルを保管・共有する',
        blocks: [
          { type: 'p', text: 'VCは保有者の端末にある安全な保管庫だけに保存されます。検証者のQRコードを読み取ると、アプリが要求を表示して同意を求め、VPを作成してDIDCommで送ります。' },
          { type: 'callout', text: '保有者機能はモバイル専用です。Webやサーバー向けSDKはなく、クレデンシャルを書き出すこともできません。端末移行時は旧端末の保管庫を消去します。' },
          { type: 'list', items: [
            { title: '対応SDK', text: 'TypeScriptのReact Native、JavaのAndroidネイティブ、SwiftのiOSネイティブ。' },
            { title: '単一端末の保管庫', text: '1つの安全な保管庫だけがクレデンシャルを保存し、生体認証で端末上のアクセスを保護します。' },
            { title: '受信時の検証', text: 'ウォレットは発行者のDIDを解決し、署名と状態を確認してからVCを保存します。' },
            { title: '利用者の同意', text: '利用者が要求を確認・承認した後だけVPを作成して送信します。' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'holderWallet.ts', code: holderCode }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'ステップ3：提示内容を検証する',
        blocks: [
          { type: 'p', text: '検証者はVPを受信し、保有者と発行者のDIDを読み取り、対応するレジストリ提供元でDID文書を解決して、署名、チャレンジ値、失効状態を検証します。' },
          { type: 'p', text: '検証処理はWeb、サーバー、モバイルで実行できますが、保有者のようにVCを保存してはいけません。方針で必要な最小限の証跡と判定だけを保持します。' },
          { type: 'list', items: [
            { title: '要求', text: 'クレデンシャルの種類、必要な属性、目的、新しいチャレンジ値を指定します。' },
            { title: '解決', text: 'did:identra、did:web、did:ionなど、DIDメソッドに合う提供元を選択します。' },
            { title: '検証', text: 'VPとVCの証明、チャレンジ値、期限、状態を確認します。' },
            { title: '判定', text: '検証が成功し、自社方針が開示された属性を受け入れた場合だけアクセスを許可します。' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'verifyPresentation.ts', code: verifierCode }
        ]
      }
    ]
  },
  de: {
    title: 'Übersicht',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'SSI anhand des tatsächlichen Ausführungsorts verstehen',
        blocks: [
          { type: 'p', text: 'Selbstbestimmte Identität wird verständlich, wenn jede Verantwortung klar zugeordnet ist. Der Aussteller erstellt einen überprüfbaren Nachweis (VC), der Inhaber bewahrt ihn im sicheren mobilen Tresor auf und der Prüfer fordert eine überprüfbare Präsentation (VP) an und prüft sie.' },
          { type: 'p', text: 'Identra trennt diese Rollen auf Web-, Server- und Mobil-SDKs, damit Nachweise nicht in Systemen landen, die sie nie speichern sollten.' },
          { type: 'callout', text: '[Aussteller prüft und signiert VC] -> [Inhaber speichert VC mobil] -> [Inhaber stimmt zu und erstellt VP] -> [Prüfer prüft VP]' },
          { type: 'cards', cards: [
            { title: 'Aussteller', text: 'Prüft Quelldaten, signiert den Nachweis und sendet ein Angebot über DIDComm.' },
            { title: 'Inhaber', text: 'Bewahrt den Nachweis in einem mobilen Tresor auf und entscheidet über die Offenlegung.' },
            { title: 'Prüfer', text: 'Fordert nur benötigte Attribute an und prüft Signaturen, Prüfwert und Nachweisstatus.' },
            { title: 'DID-Register', text: 'Veröffentlicht und löst DID-Dokumente über CertNet, did:web, ION oder ein internes Register auf.' }
          ] }
        ]
      },
      {
        id: 'data-boundaries',
        title: 'SSI bedeutet nicht, dass jede Plattform Nachweise speichert',
        blocks: [
          { type: 'p', text: 'Identra setzt eine klare Grenze: Der Aussteller erstellt den VC, das Telefon des Inhabers ist der einzige Speicherort und der Prüfer erhält eine VP für eine konkrete Anfrage. Der Prüfer wird nicht zu einem zweiten Inhaber.' },
          { type: 'callout', text: 'Web und Server erhalten kein SDK für Inhaber. Sie können Nutzernachweise weder einlesen, ausgeben, sichern noch unbemerkt aufbewahren.' },
          { type: 'list', items: [
            { title: 'Übertragung', text: 'Der VC wird über eine authentifizierte DIDComm-Verbindung zugestellt und nicht in einen QR-Code eingebettet.' },
            { title: 'QR-Funktion', text: 'Ein QR-Code startet die Verbindung oder enthält eine Präsentationsanfrage, aber nicht den Nachweis.' },
            { title: 'Registerauswahl', text: 'CertNet ist Standard in der Testumgebung; dasselbe SDK unterstützt auch did:web, ION oder interne Register.' },
            { title: 'Selektive Offenlegung', text: 'Der Prüfer fordert nur benötigte Attribute an und der Inhaber stimmt vor Erstellung der VP zu.' }
          ] },
          { type: 'callout', text: 'Die folgenden SDKs und API-Endpunkte sind Beispiele für die Testumgebung und keine Pakete oder Verträge für den Produktivbetrieb.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Schritt 1: Nachweis ausstellen',
        blocks: [
          { type: 'p', text: 'Der Aussteller prüft maßgebliche Quelldaten, signiert einen VC und sendet ihn an den Nutzer. Der Ausstellercode kann in einer internen Webanwendung, einem Serverdienst oder einer verwalteten mobilen App laufen.' },
          { type: 'p', text: 'Schützen Sie den Signaturschlüssel passend zur Umgebung. Serverintegrationen sollten ein HSM oder einen verwalteten Schlüsseldienst verwenden und private Schlüssel nie an den Browser senden.' },
          { type: 'table', headers: ['Laufzeit', 'Typische Integration', 'Schlüsselschutz'], rows: [
            ['Webclient', '@identra/web mit JavaScript oder TypeScript', 'Sicherer Plattformspeicher für freigegebene interne Nutzung'],
            ['Server', 'Server-SDK oder geschützter Dienst', 'HSM oder verwaltetes KMS'],
            ['Mobile App', 'Verwaltete Ausstelleranwendung', 'Hardwaregestützter Plattform-Schlüsselspeicher']
          ] },
          { type: 'code', language: 'typescript', fileName: 'issueCredential.ts', code: issuerCode },
          { type: 'p', text: 'Die DID des Inhabers stammt aus der aufgebauten Beziehung oder dem Geschäftssystem. Der VC wird nach dem Verbindungsaufbau über DIDComm gesendet; der QR-Code stellt nur die Verbindung her.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Schritt 2: Nachweis aufbewahren und teilen',
        blocks: [
          { type: 'p', text: 'Der VC bleibt im sicheren Tresor auf dem Telefon des Inhabers. Nach dem Scannen des Prüfer-QR-Codes zeigt die App die Anfrage, holt Zustimmung ein, erstellt eine VP und sendet sie über DIDComm.' },
          { type: 'callout', text: 'Die Inhaberfunktion ist ausschließlich mobil. Es gibt kein Web- oder Server-SDK, Nachweise sind nicht exportierbar und ein Gerätewechsel löscht den Tresor des alten Geräts.' },
          { type: 'list', items: [
            { title: 'Unterstützte SDKs', text: 'React Native mit TypeScript, natives Android mit Java und natives iOS mit Swift.' },
            { title: 'Ein-Gerät-Tresor', text: 'Ein sicherer Tresor ist der einzige Nachweisspeicher; Biometrie schützt den lokalen Zugriff.' },
            { title: 'Empfang', text: 'Die digitale Brieftasche löst die DID des Ausstellers auf und prüft Signatur und Status vor dem Speichern.' },
            { title: 'Zustimmung', text: 'Die digitale Brieftasche erstellt und sendet eine VP erst nach Prüfung und Freigabe durch den Nutzer.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'holderWallet.ts', code: holderCode }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Schritt 3: Präsentation prüfen',
        blocks: [
          { type: 'p', text: 'Der Prüfer empfängt eine VP, liest die DIDs von Inhaber und Aussteller, löst die DID-Dokumente über den passenden Registeranbieter auf und prüft Signaturen, Prüfwert und Widerrufsstatus.' },
          { type: 'p', text: 'Prüfcode kann auf Web, Server oder Mobilgeräten laufen, darf den VC aber nicht wie ein Inhaber speichern. Bewahren Sie nur Entscheidung und die laut Richtlinie nötigen minimalen Nachweise auf.' },
          { type: 'list', items: [
            { title: 'Anfordern', text: 'Nachweistyp, erforderliche Attribute, Zweck und einen neuen Prüfwert angeben.' },
            { title: 'Auflösen', text: 'Passenden Anbieter anhand der DID-Methode wie did:identra, did:web oder did:ion wählen.' },
            { title: 'Prüfen', text: 'Präsentationsnachweis, Nachweissignatur, Prüfwertbindung, Ablauf und Status prüfen.' },
            { title: 'Entscheiden', text: 'Zugriff erst gewähren, wenn Prüfung und eigene Richtlinie die offengelegten Attribute akzeptieren.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'verifyPresentation.ts', code: verifierCode }
        ]
      }
    ]
  },
  vi: {
    title: 'Tổng quan',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'Hiểu SSI qua nơi từng đoạn mã thực sự chạy',
        blocks: [
          { type: 'p', text: 'SSI trở nên dễ hiểu hơn khi trách nhiệm của từng vai trò được phân định rõ. Bên phát hành tạo Thực chứng có thể xác minh (VC), Người nắm giữ lưu VC trong kho bảo mật trên điện thoại, còn Bên xác minh yêu cầu và kiểm tra Bản trình bày có thể xác minh (VP).' },
          { type: 'p', text: 'Identra tách các vai trò này giữa SDK cho web, máy chủ và thiết bị di động để thực chứng không đi vào những hệ thống vốn không nên lưu giữ chúng.' },
          { type: 'callout', text: '[Bên phát hành kiểm tra và ký VC] -> [Người nắm giữ lưu VC trên thiết bị di động] -> [Người dùng đồng ý và tạo VP] -> [Bên xác minh kiểm tra VP]' },
          { type: 'cards', cards: [
            { title: 'Bên phát hành', text: 'Kiểm tra dữ liệu nguồn, ký thực chứng và gửi đề nghị nhận VC qua DIDComm.' },
            { title: 'Người nắm giữ', text: 'Lưu thực chứng trong một kho bảo mật duy nhất trên điện thoại và quyết định khi nào chia sẻ thuộc tính.' },
            { title: 'Bên xác minh', text: 'Chỉ yêu cầu những thuộc tính cần thiết rồi kiểm tra chữ ký, giá trị thử thách và trạng thái thực chứng.' },
            { title: 'Sổ đăng ký DID', text: 'Đăng tải và phân giải tài liệu DID qua CertNet, did:web, ION hoặc sổ đăng ký nội bộ.' }
          ] }
        ]
      },
      {
        id: 'data-boundaries',
        title: 'SSI không có nghĩa mọi nền tảng đều giữ thực chứng',
        blocks: [
          { type: 'p', text: 'Identra phân tách rõ ranh giới dữ liệu: Bên phát hành tạo VC, điện thoại của Người nắm giữ là nơi lưu duy nhất, còn Bên xác minh chỉ nhận VP được tạo riêng cho một yêu cầu cụ thể. Bên xác minh không trở thành một Người nắm giữ thứ hai.' },
          { type: 'callout', text: 'Môi trường web và máy chủ không bao giờ nhận SDK dành cho Người nắm giữ. Chúng không được nhập, xuất, sao lưu hoặc âm thầm lưu VC của người dùng.' },
          { type: 'list', items: [
            { title: 'Cách chuyển thực chứng', text: 'VC được gửi qua kết nối DIDComm đã xác thực, không được nhúng trong mã QR.' },
            { title: 'Vai trò của QR', text: 'QR chỉ dùng để thiết lập kết nối hoặc mang yêu cầu trình bày, không chứa thực chứng của người dùng.' },
            { title: 'Lựa chọn sổ đăng ký', text: 'CertNet là nhà cung cấp mặc định trong môi trường thử nghiệm; cùng SDK có thể dùng did:web, ION hoặc sổ đăng ký nội bộ.' },
            { title: 'Chia sẻ có chọn lọc', text: 'Bên xác minh chỉ yêu cầu thuộc tính cần cho mục đích hiện tại và người dùng phải đồng ý trước khi VP được tạo.' }
          ] },
          { type: 'callout', text: 'Các SDK và điểm cuối API dưới đây chỉ là ví dụ minh họa trong môi trường thử nghiệm, chưa phải gói phần mềm hoặc hợp đồng dùng cho môi trường thật.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Bước 1: Phát hành thực chứng',
        blocks: [
          { type: 'p', text: 'Tổ chức phát hành kiểm tra dữ liệu có thẩm quyền, ký VC và gửi cho người dùng. Mã phía Bên phát hành có thể chạy trong ứng dụng web nội bộ, dịch vụ máy chủ hoặc ứng dụng di động được quản lý.' },
          { type: 'p', text: 'Khóa ký của tổ chức phải được bảo vệ phù hợp với môi trường. Tích hợp phía máy chủ nên ưu tiên HSM hoặc dịch vụ quản lý khóa và tuyệt đối không chuyển khóa riêng xuống trình duyệt.' },
          { type: 'table', headers: ['Môi trường chạy', 'Cách tích hợp thường dùng', 'Bảo vệ khóa'], rows: [
            ['Trình duyệt web', '@identra/web với JavaScript hoặc TypeScript', 'Kho bảo mật của nền tảng cho ứng dụng nội bộ đã được phê duyệt'],
            ['Máy chủ', 'SDK cho máy chủ hoặc dịch vụ được bảo vệ', 'Ưu tiên HSM hoặc KMS được quản lý'],
            ['Ứng dụng di động', 'Ứng dụng phát hành được quản lý', 'Kho khóa phần cứng của nền tảng']
          ] },
          { type: 'code', language: 'typescript', fileName: 'issueCredential.ts', code: issuerCode },
          { type: 'p', text: 'DID của Người nắm giữ được lấy sau khi thiết lập mối quan hệ hoặc từ hệ thống nghiệp vụ. VC được chuyển qua DIDComm sau khi kết nối hoàn tất; QR chỉ dùng để khởi tạo kết nối.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Bước 2: Nắm giữ và chia sẻ thực chứng',
        blocks: [
          { type: 'p', text: 'VC chỉ nằm trong kho bảo mật trên điện thoại của Người nắm giữ. Khi quét QR của Bên xác minh, ứng dụng hiển thị yêu cầu, xin sự đồng ý, tạo VP rồi gửi qua DIDComm.' },
          { type: 'callout', text: 'Vai trò Người nắm giữ chỉ hỗ trợ thiết bị di động. Không có SDK dành cho Người nắm giữ trên web hoặc máy chủ, VC không thể xuất ra ngoài và khi đổi thiết bị, kho dữ liệu trên thiết bị cũ phải bị xóa.' },
          { type: 'list', items: [
            { title: 'SDK khả dụng', text: 'React Native với TypeScript, Android gốc với Java và iOS gốc với Swift.' },
            { title: 'Kho dữ liệu một thiết bị', text: 'Một kho bảo mật duy nhất là nơi lưu thực chứng; sinh trắc học bảo vệ việc truy cập trên thiết bị.' },
            { title: 'Tiếp nhận VC', text: 'Ví định danh phân giải DID của Bên phát hành, kiểm tra chữ ký và trạng thái rồi mới lưu VC.' },
            { title: 'Sự đồng ý của người dùng', text: 'Ví định danh chỉ tạo và gửi VP sau khi người dùng xem và chấp thuận yêu cầu.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'holderWallet.ts', code: holderCode }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Bước 3: Xác minh bản trình bày',
        blocks: [
          { type: 'p', text: 'Bên xác minh nhận VP, lấy DID của Người nắm giữ và Bên phát hành, phân giải tài liệu DID qua nhà cung cấp sổ đăng ký tương ứng rồi kiểm tra chữ ký, giá trị thử thách và trạng thái thu hồi.' },
          { type: 'p', text: 'Mã xác minh có thể chạy trên web, máy chủ hoặc ứng dụng di động nhưng không được lưu VC như một Người nắm giữ. Chỉ lưu quyết định và lượng bằng chứng tối thiểu mà chính sách yêu cầu.' },
          { type: 'list', items: [
            { title: 'Tạo yêu cầu', text: 'Xác định loại thực chứng, các thuộc tính cần thiết, mục đích sử dụng và một giá trị thử thách mới.' },
            { title: 'Phân giải DID', text: 'Chọn nhà cung cấp phù hợp theo phương thức DID như did:identra, did:web hoặc did:ion.' },
            { title: 'Kiểm tra', text: 'Xác minh bằng chứng của bản trình bày, bằng chứng của thực chứng, giá trị thử thách, thời hạn và trạng thái thực chứng.' },
            { title: 'Ra quyết định', text: 'Chỉ cấp quyền sau khi xác minh thành công và chính sách nội bộ chấp nhận các thuộc tính được chia sẻ.' }
          ] },
          { type: 'code', language: 'typescript', fileName: 'verifyPresentation.ts', code: verifierCode }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
