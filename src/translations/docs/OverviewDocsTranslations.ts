import type { LocalizedDocsContent } from '../../components/docs/docsTypes';

export const OVERVIEW_DOCS_TRANSLATIONS = {
  en: {
    title: 'Overview',
    category: 'overview',
    sections: [
      {
        id: 'ssi-role-based-flow',
        title: 'Understand SSI by where each piece of code actually runs',
        blocks: [
          { type: 'p', text: 'Role-based SSI guide. Walk through the three roles, understand data boundaries, and compare examples across web, server, and mobile SDK runtimes.' },
          { type: 'p', text: 'Self-sovereign identity becomes easier to understand when each responsibility has a clear owner. An Issuer creates a Verifiable Credential (VC), the Holder keeps it in a mobile secure vault, and a Verifier requests and verifies a Verifiable Presentation (VP).' },
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
          { type: 'p', text: 'Identra separates responsibilities clearly: the Issuer creates VCs, the Holder phone is the only vault, and the Verifier only requests and verifies VPs.' },
          { type: 'subheading', text: 'Most important rule' },
          { type: 'callout', text: 'Web and server never receive a holding SDK. They cannot import, export, or back up user VCs.' },
          { type: 'subheading', text: 'DID registry is not locked to CertNet' },
          { type: 'p', text: 'CertNet is the default sandbox provider. The same SDK can publish and resolve DID Documents on CertNet, did:web, ION, or an internal registry depending on deployment policy.' },
          { type: 'callout', text: 'Illustrative SDK, not for production use. Package names and contracts shown in this Overview are sample documentation.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Credential issuance',
        blocks: [
          { type: 'subheading', text: 'Issuer' },
          { type: 'p', text: 'STEP 01 of 03 in the role-based SSI flow.' },
          { type: 'subheading', text: 'Who creates a credential and where does the code run?' },
          { type: 'p', text: 'The issuer checks data, signs a VC, and sends it to the user. It may integrate on internal web, server, or app.' },
          { type: 'subheading', text: 'Data and key boundary' },
          { type: 'callout', text: 'Organization signing keys must be protected for the runtime, preferably by an HSM on server.' },
          { type: 'table', headers: ['Runtime', 'SDK example', 'When to use'], rows: [
            ['Web client', '@identra/web with Browser JavaScript or TypeScript', 'Internal issuer tools with a controlled key policy'],
            ['Server', '@identra/node or identra-go', 'Protected signing services backed by HSM or managed KMS'],
            ['Mobile app', '@identra/react-native, Android SDK, or iOS SDK', 'Managed internal issuer applications']
          ] },
          { type: 'subheading', text: 'Flow steps' },
          { type: 'list', items: [
            { title: 'Initialize', text: 'Initialize the SDK for the current runtime.' },
            { title: 'Create DID', text: 'Create or load the issuer DID on the selected DID registry.' },
            { title: 'Sign VC', text: 'Sign a Verifiable Credential for the recipient DID.' },
            { title: 'Send offer', text: 'Send the credential offer over DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'issuance' },
          { type: 'p', text: 'The Holder DID is obtained after connection setup or from the business system. The credential is not placed in the QR; the QR only bootstraps the DIDComm connection.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Credential holding and sharing',
        blocks: [
          { type: 'subheading', text: 'Holder' },
          { type: 'p', text: 'STEP 02 of 03 in the role-based SSI flow.' },
          { type: 'subheading', text: 'Where does the credential live and how is it shared?' },
          { type: 'p', text: 'The VC lives only in the phone secure vault. The user scans a QR, reviews the request, consents, and only then does the app create and send a VP over DIDComm.' },
          { type: 'subheading', text: 'Data and device boundary' },
          { type: 'callout', text: 'There is no Holder SDK for web or server. VCs cannot be exported. Device migration deletes every VC from the old phone.' },
          { type: 'list', items: [
            { title: 'Available SDKs', text: 'React Native, Java Android, and Swift iOS.' },
            { title: 'Activate vault', text: 'Activate the single credential vault on this device.' },
            { title: 'Receive VC', text: 'Receive, verify, and store the VC in the secure vault.' },
            { title: 'Scan request', text: 'Scan the QR and review the verifier request.' },
            { title: 'Share VP', text: 'Create a user-approved VP and send it over DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'holder' }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Credential verification',
        blocks: [
          { type: 'subheading', text: 'Verifier' },
          { type: 'p', text: 'STEP 03 of 03 in the role-based SSI flow.' },
          { type: 'subheading', text: 'How does the verifier trust a VP?' },
          { type: 'p', text: 'The verifier receives a VP, extracts holder and issuer DIDs, resolves DID Documents through the matching registry provider such as CertNet, did:web, or ION, then checks signatures, challenge, and revocation status.' },
          { type: 'subheading', text: 'Data and storage boundary' },
          { type: 'callout', text: 'A verifier may run on web, server, or app, but it must not store VCs as a Holder.' },
          { type: 'list', items: [
            { title: 'Create request', text: 'Create a presentation request with a replay-resistant challenge.' },
            { title: 'Show QR', text: 'Display a QR containing the DIDComm invitation.' },
            { title: 'Receive VP', text: 'Receive the VP over the newly established connection.' },
            { title: 'Resolve and verify', text: 'Resolve holder and issuer DIDs through the registry provider and verify.' }
          ] },
          { type: 'sdkExplorer', flow: 'verification' }
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
        title: 'Entender SSI según dónde se ejecuta realmente cada pieza de código',
        blocks: [
          { type: 'p', text: 'Guía SSI basada en roles. Recorre los tres roles, entiende los límites de datos y compara ejemplos entre SDK web, servidor y móvil.' },
          { type: 'p', text: 'La identidad autosoberana se entiende mejor cuando cada responsabilidad tiene un propietario claro. El Emisor crea una Credencial Verificable (VC), el Titular la conserva en una bóveda segura del móvil y el Verificador solicita y valida una Presentación Verificable (VP).' },
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
          { type: 'p', text: 'Identra separa claramente las responsabilidades: el Emisor crea las VC, el teléfono del Titular es la única bóveda, y el Verificador solo solicita y verifica VP.' },
          { type: 'subheading', text: 'Regla más importante' },
          { type: 'callout', text: 'Web y servidor nunca reciben un SDK de custodia. No pueden importar, exportar ni respaldar las VC de los usuarios.' },
          { type: 'subheading', text: 'El registro DID no está limitado a CertNet' },
          { type: 'p', text: 'CertNet es el proveedor predeterminado en sandbox. El mismo SDK puede publicar y resolver documentos DID en CertNet, did:web, ION o un registro interno según la política de despliegue.' },
          { type: 'callout', text: 'SDK ilustrativo, no destinado a producción. Los nombres de paquetes y contratos mostrados en este Overview son documentación de ejemplo.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Emisión de credenciales',
        blocks: [
          { type: 'subheading', text: 'Emisor' },
          { type: 'p', text: 'PASO 01 de 03 en el flujo SSI basado en roles.' },
          { type: 'subheading', text: '¿Quién crea la credencial y dónde se ejecuta el código?' },
          { type: 'p', text: 'El emisor comprueba los datos, firma una VC y la envía al usuario. Puede integrarse en una web interna, servidor o aplicación.' },
          { type: 'subheading', text: 'Límite de datos y claves' },
          { type: 'callout', text: 'Las claves de firma de la organización deben protegerse según el entorno de ejecución, preferiblemente con HSM en servidor.' },
          { type: 'table', headers: ['Entorno', 'Ejemplo de SDK', 'Cuándo usarlo'], rows: [
            ['Cliente web', '@identra/web con JavaScript o TypeScript en navegador', 'Herramientas internas de emisión con política de claves controlada'],
            ['Servidor', '@identra/node o identra-go', 'Servicios de firma protegidos con HSM o KMS administrado'],
            ['Aplicación móvil', '@identra/react-native, Android SDK o iOS SDK', 'Aplicaciones internas de emisión administradas']
          ] },
          { type: 'subheading', text: 'Pasos del flujo' },
          { type: 'list', items: [
            { title: 'Inicializar', text: 'Inicializa el SDK para el entorno en ejecución.' },
            { title: 'Crear DID', text: 'Crea o carga el DID del emisor en el registro DID seleccionado.' },
            { title: 'Firmar VC', text: 'Firma una Credencial Verificable para el DID del destinatario.' },
            { title: 'Enviar oferta', text: 'Envía la oferta de credencial por DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'issuance' },
          { type: 'p', text: 'El DID del Titular se obtiene después de establecer la conexión o desde el sistema de negocio. La credencial no se coloca en el QR; el QR solo inicia la conexión DIDComm.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Custodia y compartición de credenciales',
        blocks: [
          { type: 'subheading', text: 'Titular' },
          { type: 'p', text: 'PASO 02 de 03 en el flujo SSI basado en roles.' },
          { type: 'subheading', text: '¿Dónde vive la credencial y cómo se comparte?' },
          { type: 'p', text: 'La VC vive únicamente en la bóveda segura del teléfono. El usuario escanea un QR, revisa la solicitud, acepta, y solo entonces la app crea y envía una VP por DIDComm.' },
          { type: 'subheading', text: 'Límite de datos y dispositivo' },
          { type: 'callout', text: 'No existe SDK de Titular para web ni servidor. Las VC no pueden exportarse. La migración de dispositivo elimina todas las VC del teléfono anterior.' },
          { type: 'list', items: [
            { title: 'SDK disponibles', text: 'React Native, Java Android y Swift iOS.' },
            { title: 'Activar bóveda', text: 'Activa la única bóveda de credenciales en este dispositivo.' },
            { title: 'Recibir VC', text: 'Recibe, verifica y guarda la VC en la bóveda segura.' },
            { title: 'Escanear solicitud', text: 'Escanea el QR y revisa la solicitud del verificador.' },
            { title: 'Compartir VP', text: 'Crea una VP aprobada por el usuario y la envía por DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'holder' }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Verificación de credenciales',
        blocks: [
          { type: 'subheading', text: 'Verificador' },
          { type: 'p', text: 'PASO 03 de 03 en el flujo SSI basado en roles.' },
          { type: 'subheading', text: '¿Cómo confía el verificador en una VP?' },
          { type: 'p', text: 'El verificador recibe una VP, extrae los DID del titular y del emisor, resuelve los documentos DID mediante el proveedor de registro correspondiente como CertNet, did:web o ION, y luego comprueba firmas, desafío y estado de revocación.' },
          { type: 'subheading', text: 'Límite de datos y almacenamiento' },
          { type: 'callout', text: 'Un verificador puede ejecutarse en web, servidor o aplicación, pero no debe almacenar VC como si fuera un Titular.' },
          { type: 'list', items: [
            { title: 'Crear solicitud', text: 'Crea una solicitud de presentación con un desafío resistente a repetición.' },
            { title: 'Mostrar QR', text: 'Muestra un QR que contiene la invitación DIDComm.' },
            { title: 'Recibir VP', text: 'Recibe la VP mediante la conexión recién establecida.' },
            { title: 'Resolver y verificar', text: 'Resuelve los DID del titular y emisor con el proveedor de registro y verifica.' }
          ] },
          { type: 'sdkExplorer', flow: 'verification' }
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
        title: '各コードが実際にどこで動くかからSSIを理解する',
        blocks: [
          { type: 'p', text: 'ロール別SSIガイドです。3つの役割を順にたどり、データ境界を理解し、Web、サーバー、モバイルSDKの例を比較します。' },
          { type: 'p', text: '自己主権型IDは、各責任の主体を明確にすると理解しやすくなります。発行者が検証可能なクレデンシャル（VC）を作成し、保有者がモバイル端末の安全な保管庫に保存し、検証者が検証可能な提示内容（VP）を要求して検証します。' },
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
          { type: 'p', text: 'Identraは責任を明確に分離します。発行者がVCを作成し、保有者の電話だけが唯一の保管庫となり、検証者はVPを要求して検証するだけです。' },
          { type: 'subheading', text: '最も重要なルール' },
          { type: 'callout', text: 'Webとサーバーには保管用SDKを提供しません。利用者のVCをインポート、エクスポート、バックアップすることはできません。' },
          { type: 'subheading', text: 'DIDレジストリはCertNetに固定されない' },
          { type: 'p', text: 'CertNetはSandboxの既定プロバイダーです。同じSDKで、デプロイ方針に応じてCertNet、did:web、ION、社内レジストリへDID文書を公開し、解決できます。' },
          { type: 'callout', text: '説明用SDKであり、本番利用向けではありません。このOverviewに示すパッケージ名と契約仕様はサンプル文書です。' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'クレデンシャル発行',
        blocks: [
          { type: 'subheading', text: '発行者' },
          { type: 'p', text: 'ロール別SSIフローのステップ01/03です。' },
          { type: 'subheading', text: '誰がクレデンシャルを作り、コードはどこで動くのか' },
          { type: 'p', text: '発行者はデータを確認し、VCへ署名して利用者へ送ります。社内Web、サーバー、アプリのいずれにも組み込めます。' },
          { type: 'subheading', text: 'データと鍵の境界' },
          { type: 'callout', text: '組織の署名鍵は実行環境に応じて保護する必要があります。サーバーではHSMを優先します。' },
          { type: 'table', headers: ['実行環境', 'SDK例', '使う場面'], rows: [
            ['Webクライアント', '@identra/web（Browser JavaScriptまたはTypeScript）', '鍵ポリシーを管理できる社内発行ツール'],
            ['サーバー', '@identra/nodeまたはidentra-go', 'HSMや管理KMSで保護する署名サービス'],
            ['モバイルアプリ', '@identra/react-native、Android SDK、iOS SDK', '管理対象の社内発行アプリ']
          ] },
          { type: 'subheading', text: 'フローの手順' },
          { type: 'list', items: [
            { title: '初期化', text: '現在の実行環境向けにSDKを初期化します。' },
            { title: 'DID作成', text: '選択したDIDレジストリで発行者DIDを作成または読み込みます。' },
            { title: 'VC署名', text: '受け取り側DID向けに検証可能なクレデンシャルへ署名します。' },
            { title: 'オファー送信', text: 'DIDCommでクレデンシャルオファーを送ります。' }
          ] },
          { type: 'sdkExplorer', flow: 'issuance' },
          { type: 'p', text: '保有者DIDは接続確立後、または業務システムから取得します。クレデンシャルはQRに入れず、QRはDIDComm接続を開始するためだけに使います。' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'クレデンシャルの保管と共有',
        blocks: [
          { type: 'subheading', text: '保有者' },
          { type: 'p', text: 'ロール別SSIフローのステップ02/03です。' },
          { type: 'subheading', text: 'クレデンシャルはどこにあり、どう共有されるのか' },
          { type: 'p', text: 'VCは電話の安全な保管庫だけに存在します。利用者がQRを読み取り、要求を確認して同意した後にだけ、アプリがVPを作成してDIDCommで送信します。' },
          { type: 'subheading', text: 'データと端末の境界' },
          { type: 'callout', text: 'Webやサーバー向けの保有者SDKはありません。VCはエクスポートできません。端末移行では旧端末のすべてのVCが削除されます。' },
          { type: 'list', items: [
            { title: '利用可能なSDK', text: 'React Native、Java Android、Swift iOS。' },
            { title: '保管庫を有効化', text: 'この端末上で唯一のクレデンシャル保管庫を有効化します。' },
            { title: 'VCを受信', text: 'VCを受け取り、検証し、安全な保管庫へ保存します。' },
            { title: '要求を読み取る', text: 'QRを読み取り、検証者からの要求を確認します。' },
            { title: 'VPを共有', text: '利用者が承認したVPを作成し、DIDCommで送信します。' }
          ] },
          { type: 'sdkExplorer', flow: 'holder' }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'クレデンシャル検証',
        blocks: [
          { type: 'subheading', text: '検証者' },
          { type: 'p', text: 'ロール別SSIフローのステップ03/03です。' },
          { type: 'subheading', text: '検証者はどのようにVPを信頼するのか' },
          { type: 'p', text: '検証者はVPを受信し、保有者と発行者のDIDを取り出し、CertNet、did:web、IONなど対応するレジストリプロバイダーでDID文書を解決してから、署名、チャレンジ、失効状態を確認します。' },
          { type: 'subheading', text: 'データと保存の境界' },
          { type: 'callout', text: '検証者はWeb、サーバー、アプリで動かせますが、保有者のようにVCを保存してはいけません。' },
          { type: 'list', items: [
            { title: '要求作成', text: '再送攻撃に強いチャレンジ付きの提示要求を作成します。' },
            { title: 'QR表示', text: 'DIDComm invitationを含むQRを表示します。' },
            { title: 'VP受信', text: '新しく確立した接続でVPを受け取ります。' },
            { title: '解決と検証', text: '保有者と発行者のDIDをレジストリプロバイダーで解決し、検証します。' }
          ] },
          { type: 'sdkExplorer', flow: 'verification' }
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
        title: 'SSI anhand des tatsächlichen Ausführungsorts jedes Codeteils verstehen',
        blocks: [
          { type: 'p', text: 'Rollenbasierter SSI-Leitfaden. Gehen Sie die drei Rollen durch, verstehen Sie Datengrenzen und vergleichen Sie Beispiele für Web-, Server- und Mobile-SDKs.' },
          { type: 'p', text: 'Selbstbestimmte Identität wird verständlich, wenn jede Verantwortung klar zugeordnet ist. Der Aussteller erstellt einen überprüfbaren Nachweis (VC), der Inhaber bewahrt ihn im sicheren mobilen Tresor auf und der Prüfer fordert eine überprüfbare Präsentation (VP) an und prüft sie.' },
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
          { type: 'p', text: 'Identra trennt Verantwortlichkeiten klar: Der Aussteller erstellt VCs, das Telefon des Inhabers ist der einzige Tresor, und der Prüfer fordert und prüft nur VPs.' },
          { type: 'subheading', text: 'Wichtigste Regel' },
          { type: 'callout', text: 'Web und Server erhalten niemals ein SDK zum Aufbewahren. Sie können Nutzer-VCs weder importieren, exportieren noch sichern.' },
          { type: 'subheading', text: 'Das DID-Register ist nicht auf CertNet festgelegt' },
          { type: 'p', text: 'CertNet ist der Standardanbieter in der Sandbox. Dasselbe SDK kann DID-Dokumente je nach Bereitstellungsrichtlinie auf CertNet, did:web, ION oder einem internen Register veröffentlichen und auflösen.' },
          { type: 'callout', text: 'Illustratives SDK, nicht für den Produktivbetrieb. Paketnamen und Verträge in diesem Overview sind Beispieldokumentation.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Nachweise ausstellen',
        blocks: [
          { type: 'subheading', text: 'Aussteller' },
          { type: 'p', text: 'SCHRITT 01 von 03 im rollenbasierten SSI-Ablauf.' },
          { type: 'subheading', text: 'Wer erstellt einen Nachweis und wo läuft der Code?' },
          { type: 'p', text: 'Der Aussteller prüft Daten, signiert einen VC und sendet ihn an den Nutzer. Die Integration kann in internem Web, Server oder App laufen.' },
          { type: 'subheading', text: 'Daten- und Schlüsselgrenze' },
          { type: 'callout', text: 'Signaturschlüssel der Organisation müssen passend zur Laufzeit geschützt werden, auf dem Server vorzugsweise durch ein HSM.' },
          { type: 'table', headers: ['Laufzeit', 'SDK-Beispiel', 'Einsatzfall'], rows: [
            ['Webclient', '@identra/web mit Browser-JavaScript oder TypeScript', 'Interne Ausstellerwerkzeuge mit kontrollierter Schlüsselrichtlinie'],
            ['Server', '@identra/node oder identra-go', 'Geschützte Signaturdienste mit HSM oder verwaltetem KMS'],
            ['Mobile App', '@identra/react-native, Android SDK oder iOS SDK', 'Verwaltete interne Ausstelleranwendungen']
          ] },
          { type: 'subheading', text: 'Ablaufschritte' },
          { type: 'list', items: [
            { title: 'Initialisieren', text: 'SDK für die aktuelle Laufzeit initialisieren.' },
            { title: 'DID erstellen', text: 'Aussteller-DID im gewählten DID-Register erstellen oder laden.' },
            { title: 'VC signieren', text: 'Einen überprüfbaren Nachweis für die DID des Empfängers signieren.' },
            { title: 'Angebot senden', text: 'Credential Offer über DIDComm senden.' }
          ] },
          { type: 'sdkExplorer', flow: 'issuance' },
          { type: 'p', text: 'Die DID des Inhabers wird nach dem Verbindungsaufbau oder aus dem Geschäftssystem bezogen. Der Nachweis liegt nicht im QR; der QR startet nur die DIDComm-Verbindung.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Nachweise aufbewahren und teilen',
        blocks: [
          { type: 'subheading', text: 'Inhaber' },
          { type: 'p', text: 'SCHRITT 02 von 03 im rollenbasierten SSI-Ablauf.' },
          { type: 'subheading', text: 'Wo liegt der Nachweis und wie wird er geteilt?' },
          { type: 'p', text: 'Der VC liegt nur im sicheren Tresor des Telefons. Der Nutzer scannt einen QR, prüft die Anfrage, stimmt zu, und erst dann erstellt und sendet die App eine VP über DIDComm.' },
          { type: 'subheading', text: 'Daten- und Gerätegrenze' },
          { type: 'callout', text: 'Es gibt kein Holder-SDK für Web oder Server. VCs können nicht exportiert werden. Eine Gerätemigration löscht alle VCs vom alten Telefon.' },
          { type: 'list', items: [
            { title: 'Verfügbare SDKs', text: 'React Native, Java Android und Swift iOS.' },
            { title: 'Tresor aktivieren', text: 'Den einzigen Credential-Tresor auf diesem Gerät aktivieren.' },
            { title: 'VC empfangen', text: 'VC empfangen, prüfen und im sicheren Tresor speichern.' },
            { title: 'Anfrage scannen', text: 'QR scannen und die Anfrage des Prüfers ansehen.' },
            { title: 'VP teilen', text: 'Eine vom Nutzer freigegebene VP erstellen und über DIDComm senden.' }
          ] },
          { type: 'sdkExplorer', flow: 'holder' }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Nachweise prüfen',
        blocks: [
          { type: 'subheading', text: 'Prüfer' },
          { type: 'p', text: 'SCHRITT 03 von 03 im rollenbasierten SSI-Ablauf.' },
          { type: 'subheading', text: 'Wie vertraut der Prüfer einer VP?' },
          { type: 'p', text: 'Der Prüfer empfängt eine VP, entnimmt Holder- und Issuer-DIDs, löst DID-Dokumente über den passenden Registeranbieter wie CertNet, did:web oder ION auf und prüft anschließend Signaturen, Challenge und Widerrufsstatus.' },
          { type: 'subheading', text: 'Daten- und Speichergrenze' },
          { type: 'callout', text: 'Ein Prüfer kann auf Web, Server oder App laufen, darf VCs aber nicht wie ein Holder speichern.' },
          { type: 'list', items: [
            { title: 'Anfrage erstellen', text: 'Eine Präsentationsanfrage mit replay-sicherer Challenge erstellen.' },
            { title: 'QR anzeigen', text: 'Einen QR mit DIDComm Invitation anzeigen.' },
            { title: 'VP empfangen', text: 'VP über die neu aufgebaute Verbindung empfangen.' },
            { title: 'Auflösen und prüfen', text: 'Holder- und Issuer-DIDs über den Registeranbieter auflösen und prüfen.' }
          ] },
          { type: 'sdkExplorer', flow: 'verification' }
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
          { type: 'p', text: 'Hướng dẫn SSI theo vai trò. Đi từng bước qua ba vai trò, xem ranh giới dữ liệu và so sánh ví dụ giữa các SDK web, server và mobile.' },
          { type: 'p', text: 'SSI trở nên dễ hiểu hơn khi trách nhiệm của từng vai trò được phân định rõ. Bên phát hành tạo Thực chứng có thể xác minh (VC), Người nắm giữ lưu VC trong kho bảo mật trên điện thoại, còn Bên xác minh yêu cầu và kiểm tra Bản trình bày có thể xác minh (VP).' },
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
          { type: 'p', text: 'Identra phân tách rõ trách nhiệm: Bên phát hành tạo VC, điện thoại của Người nắm giữ là kho duy nhất, còn Bên xác minh chỉ yêu cầu và xác minh VP.' },
          { type: 'subheading', text: 'Quy tắc quan trọng nhất' },
          { type: 'callout', text: 'Web và server không bao giờ nhận SDK nắm giữ. Chúng không được import, export hoặc sao lưu VC của người dùng.' },
          { type: 'subheading', text: 'DID registry không bị khóa vào CertNet' },
          { type: 'p', text: 'CertNet là provider mặc định trong sandbox. Cùng SDK có thể publish và resolve DID Document trên CertNet, did:web, ION hoặc registry nội bộ tùy chính sách triển khai.' },
          { type: 'callout', text: 'SDK minh họa, chưa dùng cho production. Tên package và contract trong Overview này là tài liệu mẫu.' }
        ]
      },
      {
        id: 'issue-credential',
        title: 'Phát hành thực chứng',
        blocks: [
          { type: 'subheading', text: 'Bên phát hành' },
          { type: 'p', text: 'BƯỚC 01 trong 03 bước của luồng SSI theo vai trò.' },
          { type: 'subheading', text: 'Ai tạo thực chứng và đoạn mã chạy ở đâu?' },
          { type: 'p', text: 'Tổ chức phát hành kiểm tra dữ liệu, ký VC và gửi cho người dùng. Họ có thể tích hợp trên web nội bộ, server hoặc ứng dụng.' },
          { type: 'subheading', text: 'Ranh giới dữ liệu và khóa' },
          { type: 'callout', text: 'Khóa ký của tổ chức phải được bảo vệ phù hợp với môi trường chạy, ưu tiên HSM trên server.' },
          { type: 'table', headers: ['Môi trường chạy', 'SDK ví dụ', 'Khi nào dùng'], rows: [
            ['Web client', '@identra/web với Browser JavaScript hoặc TypeScript', 'Công cụ phát hành nội bộ có chính sách khóa được kiểm soát'],
            ['Server', '@identra/node hoặc identra-go', 'Dịch vụ ký được bảo vệ bằng HSM hoặc KMS được quản lý'],
            ['Ứng dụng mobile', '@identra/react-native, Android SDK hoặc iOS SDK', 'Ứng dụng phát hành nội bộ được quản lý']
          ] },
          { type: 'subheading', text: 'Các bước của luồng' },
          { type: 'list', items: [
            { title: 'Khởi tạo', text: 'Khởi tạo SDK cho môi trường đang chạy.' },
            { title: 'Tạo DID', text: 'Tạo hoặc nạp DID của bên phát hành trên DID registry đã chọn.' },
            { title: 'Ký VC', text: 'Ký Verifiable Credential cho DID của người nhận.' },
            { title: 'Gửi offer', text: 'Gửi credential offer qua kết nối DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'issuance' },
          { type: 'p', text: 'Holder DID được lấy sau khi thiết lập kết nối hoặc tra từ hệ thống nghiệp vụ. Credential không đi qua QR; QR chỉ dùng để bootstrap kết nối DIDComm.' }
        ]
      },
      {
        id: 'hold-and-share',
        title: 'Nắm giữ và chia sẻ thực chứng',
        blocks: [
          { type: 'subheading', text: 'Người nắm giữ' },
          { type: 'p', text: 'BƯỚC 02 trong 03 bước của luồng SSI theo vai trò.' },
          { type: 'subheading', text: 'Thực chứng nằm ở đâu và được chia sẻ thế nào?' },
          { type: 'p', text: 'VC chỉ nằm trong secure vault trên điện thoại. Người dùng quét QR, xem yêu cầu, đồng ý rồi ứng dụng mới tạo VP và gửi qua DIDComm.' },
          { type: 'subheading', text: 'Ranh giới dữ liệu và thiết bị' },
          { type: 'callout', text: 'Không có SDK Holder cho web hoặc server. Không export VC. Đổi thiết bị đồng nghĩa xóa toàn bộ VC trên thiết bị cũ.' },
          { type: 'list', items: [
            { title: 'SDK khả dụng', text: 'React Native, Java Android và Swift iOS.' },
            { title: 'Kích hoạt vault', text: 'Kích hoạt kho thực chứng duy nhất trên thiết bị.' },
            { title: 'Nhận VC', text: 'Nhận, xác minh và lưu VC vào secure vault.' },
            { title: 'Quét yêu cầu', text: 'Quét QR và xem yêu cầu chia sẻ từ verifier.' },
            { title: 'Chia sẻ VP', text: 'Tạo VP được người dùng chấp thuận và gửi qua DIDComm.' }
          ] },
          { type: 'sdkExplorer', flow: 'holder' }
        ]
      },
      {
        id: 'verify-presentation',
        title: 'Xác minh thực chứng',
        blocks: [
          { type: 'subheading', text: 'Bên xác minh' },
          { type: 'p', text: 'BƯỚC 03 trong 03 bước của luồng SSI theo vai trò.' },
          { type: 'subheading', text: 'Bên xác minh tin vào VP bằng cách nào?' },
          { type: 'p', text: 'Verifier nhận VP, lấy DID của holder và issuer bên trong, resolve DID Document qua registry provider tương ứng như CertNet, did:web hoặc ION rồi kiểm tra chữ ký, challenge và trạng thái thu hồi.' },
          { type: 'subheading', text: 'Ranh giới dữ liệu và lưu trữ' },
          { type: 'callout', text: 'Verifier có thể chạy trên web, server hoặc app nhưng không được lưu VC như một Holder.' },
          { type: 'list', items: [
            { title: 'Tạo request', text: 'Tạo presentation request kèm challenge chống phát lại.' },
            { title: 'Hiển thị QR', text: 'Hiển thị QR chứa DIDComm invitation.' },
            { title: 'Nhận VP', text: 'Nhận VP qua kết nối vừa thiết lập.' },
            { title: 'Resolve và xác minh', text: 'Resolve holder và issuer DID qua registry provider rồi xác minh.' }
          ] },
          { type: 'sdkExplorer', flow: 'verification' }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
