import type { Locale } from '../../types/routes';
import type { DocsSdkFlow } from './docsTypes';

export type DocsSdkEnvironment = 'web' | 'server' | 'mobile';
export type DocsSdkSyntax = 'javascript' | 'typescript' | 'go' | 'java' | 'swift';
export type DocsSdkVariantId =
  | 'web-javascript'
  | 'web-typescript'
  | 'server-node'
  | 'server-go'
  | 'mobile-react-native'
  | 'mobile-android'
  | 'mobile-ios';

export interface DocsSdkVariant {
  id: DocsSdkVariantId;
  environment: DocsSdkEnvironment;
  language: string;
  framework: string;
  syntax: DocsSdkSyntax;
  packageName: string;
}

interface DocsSdkFlowDefinition {
  id: DocsSdkFlow;
  availability: DocsSdkEnvironment[];
}

interface DocsSdkCopy {
  chooseRuntime: string;
  chooseSdk: string;
  mobileOnly: string;
}

interface DocsSdkComments {
  mock: string;
  issuer: string;
  holder: string;
  verifier: string;
  registry: string;
  holderDid: string;
  qrCredential: string;
  resolve: string;
  requiredClaims: string;
}

export const docsSdkVariants: DocsSdkVariant[] = [
  { id: 'web-javascript', environment: 'web', language: 'JavaScript', framework: 'Browser', syntax: 'javascript', packageName: '@identra/web' },
  { id: 'web-typescript', environment: 'web', language: 'TypeScript', framework: 'Browser', syntax: 'typescript', packageName: '@identra/web' },
  { id: 'server-node', environment: 'server', language: 'TypeScript', framework: 'Node.js', syntax: 'typescript', packageName: '@identra/node' },
  { id: 'server-go', environment: 'server', language: 'Go', framework: 'Go service', syntax: 'go', packageName: 'github.com/identra-labs/identra-go' },
  { id: 'mobile-react-native', environment: 'mobile', language: 'TypeScript', framework: 'React Native', syntax: 'typescript', packageName: '@identra/react-native' },
  { id: 'mobile-android', environment: 'mobile', language: 'Java', framework: 'Android', syntax: 'java', packageName: 'dev.identra:android-sdk' },
  { id: 'mobile-ios', environment: 'mobile', language: 'Swift', framework: 'iOS', syntax: 'swift', packageName: 'IdentraSDK' }
];

export const docsSdkFlows: DocsSdkFlowDefinition[] = [
  { id: 'issuance', availability: ['web', 'server', 'mobile'] },
  { id: 'holder', availability: ['mobile'] },
  { id: 'verification', availability: ['web', 'server', 'mobile'] }
];

export const docsSdkExplorerCopy: Record<Locale, DocsSdkCopy> = {
  en: {
    chooseRuntime: '1. Choose runtime',
    chooseSdk: '2. Choose SDK and language',
    mobileOnly: 'This flow supports mobile only because credentials must remain in one secure vault on the phone.'
  },
  es: {
    chooseRuntime: '1. Elegir entorno de ejecución',
    chooseSdk: '2. Elegir SDK e idioma',
    mobileOnly: 'Este flujo solo admite móvil porque las credenciales deben permanecer en una única bóveda segura del teléfono.'
  },
  ja: {
    chooseRuntime: '1. 実行環境を選択',
    chooseSdk: '2. SDKと言語を選択',
    mobileOnly: 'このフローはモバイル専用です。クレデンシャルは電話上の単一の安全な保管庫に残す必要があります。'
  },
  de: {
    chooseRuntime: '1. Laufzeit wählen',
    chooseSdk: '2. SDK und Sprache wählen',
    mobileOnly: 'Dieser Ablauf unterstützt nur Mobile, weil Nachweise im einzigen sicheren Tresor auf dem Telefon bleiben müssen.'
  },
  vi: {
    chooseRuntime: '1. Chọn môi trường chạy',
    chooseSdk: '2. Chọn SDK và ngôn ngữ',
    mobileOnly: 'Luồng này chỉ hỗ trợ mobile vì thực chứng phải nằm trong một secure vault duy nhất trên điện thoại.'
  }
};

export const docsSdkEnvironmentLabels: Record<DocsSdkEnvironment, Record<Locale, string>> = {
  web: {
    en: 'Web client',
    es: 'Cliente web',
    ja: 'Webクライアント',
    de: 'Webclient',
    vi: 'Web client'
  },
  server: {
    en: 'Server',
    es: 'Servidor',
    ja: 'サーバー',
    de: 'Server',
    vi: 'Server'
  },
  mobile: {
    en: 'Mobile app',
    es: 'Aplicación móvil',
    ja: 'モバイルアプリ',
    de: 'Mobile App',
    vi: 'Ứng dụng mobile'
  }
};

const comments: Record<Locale, DocsSdkComments> = {
  en: {
    mock: 'Illustrative SDK, not for production use.',
    issuer: 'Runs for the issuer on web, server, or an internal app.',
    holder: 'Runs only on the phone. VCs cannot be exported to web or a second device.',
    verifier: 'Runs for the verifier on web, server, or an app.',
    registry: 'A DID Document can be published to multiple registries; CertNet is only the default sandbox provider.',
    holderDid: 'The Holder DID is obtained after connection setup or from the business system.',
    qrCredential: 'The credential is not placed in the QR; the QR only bootstraps the DIDComm connection.',
    resolve: 'The SDK resolves the DID Document from the matching registry provider.',
    requiredClaims: 'Request only the required claims to reduce holder disclosure.'
  },
  es: {
    mock: 'SDK ilustrativo, no destinado a producción.',
    issuer: 'Se ejecuta para el emisor en web, servidor o una app interna.',
    holder: 'Se ejecuta solo en el teléfono. Las VC no se exportan a web ni a un segundo dispositivo.',
    verifier: 'Se ejecuta para el verificador en web, servidor o app.',
    registry: 'Un documento DID puede publicarse en varios registros; CertNet es solo el proveedor predeterminado de sandbox.',
    holderDid: 'El DID del Titular se obtiene después de establecer la conexión o desde el sistema de negocio.',
    qrCredential: 'La credencial no se coloca en el QR; el QR solo inicia la conexión DIDComm.',
    resolve: 'El SDK resuelve el documento DID desde el proveedor de registro correspondiente.',
    requiredClaims: 'Solicita solo los atributos necesarios para reducir la información revelada por el titular.'
  },
  ja: {
    mock: '説明用SDKであり、本番利用向けではありません。',
    issuer: '発行者側で動作します。Web、サーバー、社内アプリで利用できます。',
    holder: '電話上でのみ動作します。VCはWebや2台目の端末へエクスポートできません。',
    verifier: '検証者側で動作します。Web、サーバー、アプリで利用できます。',
    registry: 'DID文書は複数のレジストリへ公開できます。CertNetはSandboxの既定プロバイダーにすぎません。',
    holderDid: '保有者DIDは接続確立後、または業務システムから取得します。',
    qrCredential: 'クレデンシャルはQRに入れません。QRはDIDComm接続を開始するためだけに使います。',
    resolve: 'SDKは対応するレジストリプロバイダーからDID文書を解決します。',
    requiredClaims: '保有者の開示を減らすため、必要な属性だけを要求します。'
  },
  de: {
    mock: 'Illustratives SDK, nicht für den Produktivbetrieb.',
    issuer: 'Läuft für den Aussteller auf Web, Server oder einer internen App.',
    holder: 'Läuft nur auf dem Telefon. VCs können nicht ins Web oder auf ein zweites Gerät exportiert werden.',
    verifier: 'Läuft für den Prüfer auf Web, Server oder App.',
    registry: 'Ein DID-Dokument kann in mehreren Registern veröffentlicht werden; CertNet ist nur der Standardanbieter der Sandbox.',
    holderDid: 'Die DID des Inhabers wird nach dem Verbindungsaufbau oder aus dem Geschäftssystem bezogen.',
    qrCredential: 'Der Nachweis liegt nicht im QR; der QR startet nur die DIDComm-Verbindung.',
    resolve: 'Das SDK löst das DID-Dokument über den passenden Registeranbieter auf.',
    requiredClaims: 'Fordern Sie nur notwendige Attribute an, damit der Inhaber weniger Daten offenlegt.'
  },
  vi: {
    mock: 'SDK minh họa, chưa dùng cho production.',
    issuer: 'Chạy ở phía bên phát hành: web, server hoặc ứng dụng nội bộ.',
    holder: 'Chỉ chạy trên điện thoại. VC không được export lên web hoặc thiết bị thứ hai.',
    verifier: 'Chạy ở phía bên xác minh: web, server hoặc ứng dụng.',
    registry: 'DID Document có thể publish lên nhiều registry; CertNet chỉ là provider mặc định trong sandbox.',
    holderDid: 'Holder DID được lấy sau khi thiết lập kết nối hoặc tra từ hệ thống nghiệp vụ.',
    qrCredential: 'Credential không đi qua QR; QR chỉ dùng để bootstrap kết nối DIDComm.',
    resolve: 'SDK resolve DID Document từ registry provider tương ứng.',
    requiredClaims: 'Chỉ yêu cầu những claim cần thiết để giảm dữ liệu holder phải chia sẻ.'
  }
};

const getFlowDefinition = (flow: DocsSdkFlow) =>
  docsSdkFlows.find(item => item.id === flow) ?? docsSdkFlows[0];

export const getSupportedDocsSdkVariants = (flow: DocsSdkFlow) => {
  const definition = getFlowDefinition(flow);
  return docsSdkVariants.filter(variant => definition.availability.includes(variant.environment));
};

export const getDocsSdkFileName = (variant: DocsSdkVariant) =>
  `${variant.framework} · ${variant.language} · ${variant.packageName}`;

function jsSnippet(flow: DocsSdkFlow, variant: DocsSdkVariant, locale: Locale) {
  const typed = variant.syntax === 'typescript';
  const c = comments[locale];
  const sdkClass = variant.environment === 'mobile' ? 'IdentraMobile' : 'Identra';
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

  if (flow === 'issuance') {
    return `${init}

// ${c.issuer}
const issuer = await identra.issuer.create({
  did: 'did:identra:university',
  keyProtection: '${variant.environment === 'server' ? 'hsm' : 'platform-secure-storage'}'
});

// ${c.registry}
await issuer.publishDidDocument({
  registries: ['certnet', 'did:web']
});

const credential${typed ? ': VerifiableCredential' : ''} = await issuer.issue({
  // ${c.holderDid}
  subjectDid: 'did:identra:holder',
  type: 'UniversityDegree',
  claims: { degree: 'Information Technology', graduationYear: 2026 }
});

// ${c.qrCredential}
await issuer.didcomm.sendCredentialOffer({ credential, connectionId });`;
  }

  if (flow === 'holder') {
    return `${init}

// ${c.holder}
const wallet = await identra.holder.activateSingleDeviceVault({
  migrationPolicy: 'wipe-old-device',
  exportCredentials: false,
  requireBiometric: true
});

await wallet.didcomm.onCredential(async (credential) => {
  // ${c.resolve}
  await wallet.verifyAndStore(credential);
});

const request = await wallet.scanPresentationQr(scannedQr);
const consent = await wallet.requestUserConsent(request);
const presentation = await wallet.createPresentation({ request, consent });
await wallet.didcomm.sendPresentation(presentation);`;
  }

  return `${init}

// ${c.verifier}
const verifier = await identra.verifier.create({
  did: 'did:identra:jobs-example'
});

const request = await verifier.createPresentationRequest({
  credentialType: 'UniversityDegree',
  // ${c.requiredClaims}
  fields: ['degree', 'graduationYear'],
  challenge: crypto.randomUUID()
});
const qrDataUrl = await verifier.createQr(request);

const presentation = await verifier.didcomm.waitForPresentation(request.id);
const result = await verifier.verify({
  presentation,
  // ${c.resolve}
  resolveDid: (did) => identra.didRegistry.resolveDidDocument(did),
  checkCredentialStatus: true
});

if (result.verified) grantAccess();`;
}

function goSnippet(flow: DocsSdkFlow, locale: Locale) {
  const c = comments[locale];
  const operation = flow === 'issuance'
    ? `issuer, _ := client.Issuer.Create(ctx, identra.IssuerOptions{
    DID: "did:identra:university", KeyProtection: "hsm",
  })
  // ${c.registry}
  _ = issuer.PublishDIDDocument(ctx, identra.PublishOptions{
    Registries: []string{"certnet", "did:web"},
  })
  vc, _ := issuer.Issue(ctx, identra.Credential{
    SubjectDID: "did:identra:holder",
    Type: "UniversityDegree",
    Claims: map[string]any{"graduationYear": 2026},
  })
  // ${c.qrCredential}
  _ = issuer.DIDComm.SendCredentialOffer(ctx, connectionID, vc)`
    : `verifier, _ := client.Verifier.Create(ctx, "did:identra:jobs-example")
  request, _ := verifier.CreatePresentationRequest(ctx, identra.Request{
    CredentialType: "UniversityDegree",
    // ${c.requiredClaims}
    Fields: []string{"degree", "graduationYear"},
  })
  qr, _ := verifier.CreateQR(ctx, request)
  presentation, _ := verifier.DIDComm.WaitForPresentation(ctx, request.ID)
  result, _ := verifier.Verify(ctx, presentation, identra.VerifyOptions{
    ResolveDIDFromRegistry: true, CheckCredentialStatus: true,
  })
  if result.Verified { grantAccess() }`;

  return `package main

import (
  "context"
  identra "github.com/identra-labs/identra-go"
)

func main() {
  // ${c.mock}
  ctx := context.Background()
  client := identra.New(identra.Config{Environment: "sandbox"})
  ${operation}
}`;
}

function javaSnippet(flow: DocsSdkFlow, locale: Locale) {
  const c = comments[locale];
  const body = flow === 'issuance'
    ? `Issuer issuer = identra.issuer().create("did:identra:university");
// ${c.registry}
issuer.publishDidDocument(List.of("certnet", "did:web"));
VerifiableCredential vc = issuer.issue(
  "did:identra:holder", "UniversityDegree", claims
);
issuer.didcomm().sendCredentialOffer(connectionId, vc);`
    : flow === 'holder'
      ? `HolderWallet wallet = identra.holder().activateSingleDeviceVault(
  MigrationPolicy.WIPE_OLD_DEVICE,
  ExportPolicy.DISABLED,
  true
);
wallet.didcomm().onCredential(wallet::verifyAndStore);
PresentationRequest request = wallet.scanPresentationQr(scannedQr);
Consent consent = wallet.requestUserConsent(request);
wallet.didcomm().sendPresentation(wallet.createPresentation(request, consent));`
      : `Verifier verifier = identra.verifier().create("did:identra:jobs-example");
PresentationRequest request = verifier.createPresentationRequest(
  // ${c.requiredClaims}
  "UniversityDegree", List.of("degree", "graduationYear")
);
String qr = verifier.createQr(request);
VerifiablePresentation vp = verifier.didcomm().waitForPresentation(request.id());
VerificationResult result = verifier.verify(vp, true, true);`;

  return `import dev.identra.sdk.Identra;

// ${c.mock}
Identra identra = Identra.sandbox();

${body}`;
}

function swiftSnippet(flow: DocsSdkFlow, locale: Locale) {
  const c = comments[locale];
  const body = flow === 'issuance'
    ? `let issuer = try await identra.issuer.create(did: "did:identra:university")
// ${c.registry}
try await issuer.publishDIDDocument(registries: [.certnet, .didWeb])
let credential = try await issuer.issue(
  subjectDID: "did:identra:holder",
  type: "UniversityDegree",
  claims: ["graduationYear": 2026]
)
try await issuer.didcomm.sendCredentialOffer(connectionId, credential)`
    : flow === 'holder'
      ? `let wallet = try await identra.holder.activateSingleDeviceVault(
  migrationPolicy: .wipeOldDevice,
  exportPolicy: .disabled,
  requireBiometric: true
)
wallet.didcomm.onCredential { try await wallet.verifyAndStore($0) }
let request = try await wallet.scanPresentationQR(scannedQR)
let consent = try await wallet.requestUserConsent(request)
try await wallet.didcomm.sendPresentation(
  wallet.createPresentation(request: request, consent: consent)
)`
      : `let verifier = try await identra.verifier.create(did: "did:identra:jobs-example")
let request = try await verifier.createPresentationRequest(
  credentialType: "UniversityDegree",
  fields: ["degree", "graduationYear"]
)
let qr = try await verifier.createQR(request)
let presentation = try await verifier.didcomm.waitForPresentation(request.id)
let result = try await verifier.verify(
  presentation,
  resolveDIDsFromRegistry: true,
  checkCredentialStatus: true
)`;

  return `import IdentraSDK

// ${c.mock}
let identra = Identra(environment: .sandbox)

${body}`;
}

export function getDocsSdkSnippet(flow: DocsSdkFlow, variantId: DocsSdkVariantId, locale: Locale) {
  const variant = docsSdkVariants.find(item => item.id === variantId) ?? docsSdkVariants[0];

  if (variant.syntax === 'go') return goSnippet(flow, locale);
  if (variant.syntax === 'java') return javaSnippet(flow, locale);
  if (variant.syntax === 'swift') return swiftSnippet(flow, locale);
  return jsSnippet(flow, variant, locale);
}
