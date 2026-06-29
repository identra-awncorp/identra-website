import type { SyntaxLanguage } from './components/SyntaxHighlightedCode';

export type SdkFlow = 'issuance' | 'holder' | 'verification';
export type SdkEnvironment = 'web' | 'server' | 'mobile';
export type SdkVariantId =
  | 'web-javascript'
  | 'web-typescript'
  | 'server-node'
  | 'server-go'
  | 'mobile-react-native'
  | 'mobile-android'
  | 'mobile-ios';

export type LocalizedText = { vi: string; en: string };

export type SdkVariant = {
  id: SdkVariantId;
  environment: SdkEnvironment;
  language: string;
  framework: string;
  syntax: SyntaxLanguage;
  packageName: string;
};

export type SdkFlowDefinition = {
  id: SdkFlow;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  actor: LocalizedText;
  availability: SdkEnvironment[];
  steps: LocalizedText[];
};

export const sdkVariants: SdkVariant[] = [
  { id: 'web-javascript', environment: 'web', language: 'JavaScript', framework: 'Browser', syntax: 'javascript', packageName: '@identra/web' },
  { id: 'web-typescript', environment: 'web', language: 'TypeScript', framework: 'Browser', syntax: 'typescript', packageName: '@identra/web' },
  { id: 'server-node', environment: 'server', language: 'TypeScript', framework: 'Node.js', syntax: 'typescript', packageName: '@identra/node' },
  { id: 'server-go', environment: 'server', language: 'Go', framework: 'Go service', syntax: 'go', packageName: 'github.com/identra-labs/identra-go' },
  { id: 'mobile-react-native', environment: 'mobile', language: 'TypeScript', framework: 'React Native', syntax: 'typescript', packageName: '@identra/react-native' },
  { id: 'mobile-android', environment: 'mobile', language: 'Java', framework: 'Android', syntax: 'java', packageName: 'dev.identra:android-sdk' },
  { id: 'mobile-ios', environment: 'mobile', language: 'Swift', framework: 'iOS', syntax: 'swift', packageName: 'IdentraSDK' },
];

export const sdkFlows: SdkFlowDefinition[] = [
  {
    id: 'issuance',
    title: { vi: 'Phát hành thực chứng', en: 'Credential issuance' },
    shortTitle: { vi: 'Phát hành', en: 'Issuance' },
    actor: { vi: 'Bên phát hành', en: 'Issuer' },
    description: {
      vi: 'Tạo DID tổ chức, công bố DID Document lên CertNet, did:web, ION hoặc registry nội bộ, ký VC và gửi offer qua DIDComm.',
      en: 'Create an organization DID, publish its DID Document to CertNet, did:web, ION, or an internal registry, sign a VC, and send an offer over DIDComm.',
    },
    availability: ['web', 'server', 'mobile'],
    steps: [
      { vi: 'Khởi tạo SDK cho môi trường đang chạy.', en: 'Initialize the SDK for the current runtime.' },
      { vi: 'Tạo hoặc nạp DID của bên phát hành trên DID registry đã chọn.', en: 'Create or load the issuer DID on the selected DID registry.' },
      { vi: 'Ký Verifiable Credential cho DID của người nhận.', en: 'Sign a Verifiable Credential for the recipient DID.' },
      { vi: 'Gửi credential offer qua kết nối DIDComm.', en: 'Send the credential offer over DIDComm.' },
    ],
  },
  {
    id: 'holder',
    title: { vi: 'Nắm giữ và chia sẻ thực chứng', en: 'Credential holding and sharing' },
    shortTitle: { vi: 'Nắm giữ và chia sẻ', en: 'Hold and share' },
    actor: { vi: 'Người nắm giữ', en: 'Holder' },
    description: {
      vi: 'Nhận VC, xác minh, lưu duy nhất trong secure vault trên điện thoại, quét QR và tạo VP sau khi người dùng đồng ý.',
      en: 'Receive and verify VCs, store them only in the phone secure vault, scan QR requests, and create a VP after consent.',
    },
    availability: ['mobile'],
    steps: [
      { vi: 'Kích hoạt kho thực chứng duy nhất trên thiết bị.', en: 'Activate the single credential vault on this device.' },
      { vi: 'Nhận, xác minh và lưu VC vào secure vault.', en: 'Receive, verify, and store the VC in the secure vault.' },
      { vi: 'Quét QR và xem yêu cầu chia sẻ từ verifier.', en: 'Scan the QR and review the verifier request.' },
      { vi: 'Tạo VP được người dùng chấp thuận và gửi qua DIDComm.', en: 'Create a user-approved VP and send it over DIDComm.' },
    ],
  },
  {
    id: 'verification',
    title: { vi: 'Xác minh thực chứng', en: 'Credential verification' },
    shortTitle: { vi: 'Xác minh', en: 'Verification' },
    actor: { vi: 'Bên xác minh', en: 'Verifier' },
    description: {
      vi: 'Tạo QR yêu cầu dữ liệu, nhận VP, resolve DID Document từ registry tương ứng và kiểm tra toàn bộ bằng chứng.',
      en: 'Create a QR data request, receive a VP, resolve DID Documents from the corresponding registry, and verify every proof.',
    },
    availability: ['web', 'server', 'mobile'],
    steps: [
      { vi: 'Tạo presentation request kèm challenge chống phát lại.', en: 'Create a presentation request with a replay-resistant challenge.' },
      { vi: 'Hiển thị QR chứa DIDComm invitation.', en: 'Display a QR containing the DIDComm invitation.' },
      { vi: 'Nhận VP qua kết nối vừa thiết lập.', en: 'Receive the VP over the newly established connection.' },
      { vi: 'Resolve holder và issuer DID qua registry provider rồi xác minh.', en: 'Resolve holder and issuer DIDs through the registry provider and verify.' },
    ],
  },
];

export const environmentLabels: Record<SdkEnvironment, LocalizedText> = {
  web: { vi: 'Web client', en: 'Web client' },
  server: { vi: 'Server', en: 'Server' },
  mobile: { vi: 'Ứng dụng mobile', en: 'Mobile app' },
};

const comments = {
  vi: {
    mock: 'SDK minh họa, chưa dùng cho production.',
    issuer: 'Chạy ở phía bên phát hành: web, server hoặc ứng dụng nội bộ.',
    holder: 'Chỉ chạy trên điện thoại. VC không được export lên web hoặc thiết bị thứ hai.',
    verifier: 'Chạy ở phía bên xác minh: web, server hoặc ứng dụng.',
    registry: 'DID Document có thể publish lên nhiều registry; CertNet chỉ là provider mặc định trong sandbox.',
  },
  en: {
    mock: 'Illustrative SDK, not for production use.',
    issuer: 'Runs for the issuer on web, server, or an internal app.',
    holder: 'Runs only on the phone. VCs cannot be exported to web or a second device.',
    verifier: 'Runs for the verifier on web, server, or an app.',
    registry: 'A DID Document can be published to multiple registries; CertNet is only the default sandbox provider.',
  },
} as const;

function jsSnippet(flow: SdkFlow, variant: SdkVariant, lang: 'vi' | 'en') {
  const typed = variant.syntax === 'typescript';
  const c = comments[lang];
  const init = `import { Identra${variant.environment === 'mobile' ? 'Mobile' : ''} } from '${variant.packageName}';

// ${c.mock}
const identra = new Identra${variant.environment === 'mobile' ? 'Mobile' : ''}({
  environment: 'sandbox',
  didRegistry: {
    defaultProvider: 'certnet',
    providers: ['certnet', 'did:web', 'ion', 'internal-ledger']
  },
  mediatorUrl: 'https://mediator.sandbox.identra.dev'
});`;

  if (flow === 'issuance') return `${init}

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
  // ${lang === 'vi' ? 'Holder DID được lấy sau khi thiết lập kết nối hoặc tra từ hệ thống nghiệp vụ.' : 'The Holder DID is obtained after connection setup or from the business system.'}
  subjectDid: 'did:identra:holder',
  type: 'UniversityDegree',
  claims: { degree: 'Information Technology', graduationYear: 2026 }
});

// ${lang === 'vi' ? 'Credential không đi qua QR; QR chỉ dùng để bootstrap kết nối DIDComm.' : 'The credential is not placed in the QR; the QR only bootstraps the DIDComm connection.'}
await issuer.didcomm.sendCredentialOffer({ credential, connectionId });`;

  if (flow === 'holder') return `${init}

// ${c.holder}
const wallet = await identra.holder.activateSingleDeviceVault({
  migrationPolicy: 'wipe-old-device',
  exportCredentials: false,
  requireBiometric: true
});

await wallet.didcomm.onCredential(async (credential) => {
  // ${lang === 'vi' ? 'SDK resolve issuer DID, kiểm tra chữ ký/status, rồi mới lưu vào vault.' : 'The SDK resolves the issuer DID, checks signature/status, then stores it in the vault.'}
  await wallet.verifyAndStore(credential);
});

// ${lang === 'vi' ? 'QR của verifier chỉ chứa invitation/yêu cầu, không chứa credential của holder.' : 'The verifier QR contains only an invitation/request, never the holder credential.'}
const request = await wallet.scanPresentationQr(scannedQr);
const consent = await wallet.requestUserConsent(request);
const presentation = await wallet.createPresentation({ request, consent });
await wallet.didcomm.sendPresentation(presentation);`;

  return `${init}

// ${c.verifier}
const verifier = await identra.verifier.create({
  did: 'did:identra:jobs-example'
});

const request = await verifier.createPresentationRequest({
  credentialType: 'UniversityDegree',
  // ${lang === 'vi' ? 'Chỉ yêu cầu các claim cần thiết để giảm dữ liệu holder phải chia sẻ.' : 'Request only the required claims to reduce holder disclosure.'}
  fields: ['degree', 'graduationYear'],
  challenge: crypto.randomUUID()
});
const qrDataUrl = await verifier.createQr(request);

const presentation = await verifier.didcomm.waitForPresentation(request.id);
const result = await verifier.verify({
  presentation,
  // ${lang === 'vi' ? 'Resolver tự chọn provider theo DID method: did:identra, did:web, did:ion...' : 'The resolver selects a provider by DID method: did:identra, did:web, did:ion...'}
  resolveDid: (did) => identra.didRegistry.resolveDidDocument(did),
  checkCredentialStatus: true
});

if (result.verified) grantAccess();`;
}

function goSnippet(flow: SdkFlow, lang: 'vi' | 'en') {
  const c = comments[lang];
  if (flow === 'holder') return '';
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
  // ${lang === 'vi' ? 'Credential được gửi qua DIDComm, không nhúng trực tiếp trong QR.' : 'The credential is sent over DIDComm, not embedded directly in the QR.'}
  _ = issuer.DIDComm.SendCredentialOffer(ctx, connectionID, vc)`
    : `verifier, _ := client.Verifier.Create(ctx, "did:identra:jobs-example")
  request, _ := verifier.CreatePresentationRequest(ctx, identra.Request{
    CredentialType: "UniversityDegree",
    // ${lang === 'vi' ? 'Chỉ yêu cầu claim cần thiết để holder không chia sẻ quá mức.' : 'Request only the required claims so the holder does not overshare.'}
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

function javaSnippet(flow: SdkFlow, lang: 'vi' | 'en') {
  const c = comments[lang];
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
  true // Require biometrics
);
wallet.didcomm().onCredential(wallet::verifyAndStore);
PresentationRequest request = wallet.scanPresentationQr(scannedQr);
Consent consent = wallet.requestUserConsent(request);
wallet.didcomm().sendPresentation(wallet.createPresentation(request, consent));`
      : `Verifier verifier = identra.verifier().create("did:identra:jobs-example");
PresentationRequest request = verifier.createPresentationRequest(
  // ${lang === 'vi' ? 'Yêu cầu tối thiểu dữ liệu cần xác minh.' : 'Request the minimum data needed for verification.'}
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

function swiftSnippet(flow: SdkFlow, lang: 'vi' | 'en') {
  const c = comments[lang];
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
  presentation, resolveDIDsFromRegistry: true, checkCredentialStatus: true
)`;
  return `import IdentraSDK

// ${c.mock}
let identra = Identra(environment: .sandbox)

${body}`;
}

export function getSupportedVariants(flow: SdkFlow) {
  const definition = sdkFlows.find((item) => item.id === flow)!;
  return sdkVariants.filter((variant) => definition.availability.includes(variant.environment));
}

export function getSdkSnippet(flow: SdkFlow, variantId: SdkVariantId, lang: 'vi' | 'en') {
  const variant = sdkVariants.find((item) => item.id === variantId)!;
  if (variant.syntax === 'go') return goSnippet(flow, lang);
  if (variant.syntax === 'java') return javaSnippet(flow, lang);
  if (variant.syntax === 'swift') return swiftSnippet(flow, lang);
  return jsSnippet(flow, variant, lang);
}
