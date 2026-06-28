import { sdkVariants, type LocalizedText, type SdkVariantId } from './identraSdkCatalog';

export type ReferenceActor = 'issuer' | 'holder' | 'verifier';
export type ReferencePhase = 'identity' | 'issuance' | 'verification';
export type ReferenceCodeKey =
  | 'issuerKeys'
  | 'issuerDid'
  | 'holderWallet'
  | 'issuerInvitation'
  | 'holderIssuerConnection'
  | 'issueCredential'
  | 'holderStore'
  | 'verifierIdentity'
  | 'verifierInvitation'
  | 'holderVerifierConnection'
  | 'presentationRequest'
  | 'createPresentation'
  | 'verifyPresentation'
  | 'verificationReceipt';

export type SdkReferenceStep = {
  id: string;
  number: string;
  phase: ReferencePhase;
  actor: ReferenceActor;
  title: LocalizedText;
  summary: LocalizedText;
  protocol: string;
  inputs: LocalizedText[];
  outputs: LocalizedText[];
  security: LocalizedText;
  codeKey: ReferenceCodeKey;
  variants: SdkVariantId[];
};

const allIssuerVerifierVariants: SdkVariantId[] = [
  'web-javascript',
  'web-typescript',
  'server-node',
  'server-go',
  'mobile-react-native',
  'mobile-android',
  'mobile-ios',
];
const mobileVariants: SdkVariantId[] = ['mobile-react-native', 'mobile-android', 'mobile-ios'];

export const referenceActors: Record<ReferenceActor, LocalizedText> = {
  issuer: { vi: 'SDK Bên phát hành', en: 'Issuer SDK' },
  holder: { vi: 'SDK Holder Mobile', en: 'Holder Mobile SDK' },
  verifier: { vi: 'SDK Bên xác minh', en: 'Verifier SDK' },
};

export const referencePhases: Record<ReferencePhase, LocalizedText> = {
  identity: { vi: 'Nền tảng định danh và khóa', en: 'Identity and key foundation' },
  issuance: { vi: 'Cấp phát và lưu thực chứng', en: 'Credential issuance and storage' },
  verification: { vi: 'Trình bày và xác minh', en: 'Presentation and verification' },
};

export const sdkReferenceSteps: SdkReferenceStep[] = [
  {
    id: 'issuer-create-keys',
    number: '01',
    phase: 'identity',
    actor: 'issuer',
    title: { vi: 'Tạo cặp khóa cho bên phát hành', en: 'Create the issuer key pair' },
    summary: {
      vi: 'SDK tạo khóa ký bất đối xứng. Khóa bí mật được bảo vệ theo môi trường chạy; khóa công khai sẽ được đưa vào DID Document.',
      en: 'The SDK creates an asymmetric signing key. The private key is protected for its runtime; the public key will be placed in the DID Document.',
    },
    protocol: 'Ed25519 / ES256',
    inputs: [{ vi: 'Thuật toán ký và chính sách bảo vệ khóa', en: 'Signing algorithm and key-protection policy' }],
    outputs: [{ vi: 'keyId và khóa công khai', en: 'keyId and public key' }],
    security: {
      vi: 'Server nên dùng HSM/KMS; ứng dụng dùng Keystore/Secure Enclave; web chỉ phù hợp cho nghiệp vụ có chính sách khóa được kiểm soát.',
      en: 'Servers should use HSM/KMS; apps use Keystore/Secure Enclave; web is suitable only when its key policy is controlled.',
    },
    codeKey: 'issuerKeys',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'issuer-register-did',
    number: '02',
    phase: 'identity',
    actor: 'issuer',
    title: { vi: 'Tạo DID Document và đăng ký trên CertNet', en: 'Create a DID Document and register it on CertNet' },
    summary: {
      vi: 'DID Document chứa khóa công khai và DIDComm service endpoint. CertNet kiểm tra document, lưu phiên bản đầu tiên và trả về DID chuẩn dùng trong VC.',
      en: 'The DID Document contains the public key and DIDComm service endpoint. CertNet validates and stores its first version, then returns the canonical DID used in VCs.',
    },
    protocol: 'DID Core + CertNet',
    inputs: [{ vi: 'Khóa công khai và DIDComm endpoint', en: 'Public key and DIDComm endpoint' }],
    outputs: [{ vi: 'DID chuẩn và DID Document đã lưu', en: 'Canonical DID and stored DID Document' }],
    security: {
      vi: 'CertNet không nhận khóa bí mật. verificationMethod trong DID Document phải trỏ đúng keyId dùng để ký VC.',
      en: 'CertNet never receives the private key. The DID Document verificationMethod must reference the keyId used to sign VCs.',
    },
    codeKey: 'issuerDid',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'holder-create-wallet',
    number: '03',
    phase: 'identity',
    actor: 'holder',
    title: { vi: 'Khởi tạo ví Holder và kho mã hóa duy nhất', en: 'Initialize the Holder wallet and single encrypted vault' },
    summary: {
      vi: 'Ứng dụng tạo khóa DID, DID Document và kho VC. Khóa bí mật DID và khóa mã hóa kho được bọc bởi khóa bảo vệ không thể export trong Secure Enclave hoặc Android Keystore.',
      en: 'The app creates DID keys, a DID Document, and a VC vault. The DID private key and vault encryption key are wrapped by a non-exportable protection key in Secure Enclave or Android Keystore.',
    },
    protocol: 'Mobile Secure Storage + CertNet',
    inputs: [{ vi: 'Sinh trắc học và chính sách đổi thiết bị', en: 'Biometric and device-migration policy' }],
    outputs: [{ vi: 'Holder DID và secure vault đã kích hoạt', en: 'Holder DID and activated secure vault' }],
    security: {
      vi: 'VC không được export. Khi đổi thiết bị, ví cũ phải xóa toàn bộ khóa và VC trước khi vault mới được kích hoạt.',
      en: 'VCs cannot be exported. During migration, the old wallet must delete all keys and VCs before the new vault activates.',
    },
    codeKey: 'holderWallet',
    variants: mobileVariants,
  },
  {
    id: 'issuer-create-invitation',
    number: '04',
    phase: 'issuance',
    actor: 'issuer',
    title: { vi: 'Bên phát hành tạo QR kết nối cấp phát', en: 'Issuer creates an issuance connection QR' },
    summary: {
      vi: 'Issuer tạo DIDComm Out-of-Band invitation một lần và mã hóa invitation thành QR. QR chỉ chứa thông tin thiết lập kết nối, không chứa VC.',
      en: 'The issuer creates a one-time DIDComm Out-of-Band invitation and encodes it as QR. The QR contains connection setup data, not a VC.',
    },
    protocol: 'DIDComm OOB 2.0',
    inputs: [{ vi: 'Issuer DID, mục đích receive-credential và thời hạn', en: 'Issuer DID, receive-credential goal, and expiry' }],
    outputs: [{ vi: 'Invitation ID và QR payload', en: 'Invitation ID and QR payload' }],
    security: {
      vi: 'Invitation phải có thời hạn, dùng một lần và gắn với phiên cấp phát cụ thể.',
      en: 'The invitation must expire, be single-use, and bind to a specific issuance session.',
    },
    codeKey: 'issuerInvitation',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'holder-connect-issuer',
    number: '05',
    phase: 'issuance',
    actor: 'holder',
    title: { vi: 'Holder quét QR và thiết lập kết nối với Issuer', en: 'Holder scans QR and connects to the Issuer' },
    summary: {
      vi: 'Ví giải mã invitation, resolve DID Document của Issuer trên CertNet, xác thực endpoint rồi hoàn tất DIDComm handshake.',
      en: 'The wallet decodes the invitation, resolves the Issuer DID Document on CertNet, validates the endpoint, and completes the DIDComm handshake.',
    },
    protocol: 'DIDComm DID Exchange',
    inputs: [{ vi: 'QR payload từ Issuer', en: 'QR payload from Issuer' }],
    outputs: [{ vi: 'connectionId mã hóa giữa Holder và Issuer', en: 'Encrypted Holder-Issuer connectionId' }],
    security: {
      vi: 'Ví phải hiển thị danh tính Issuer đã resolve để người dùng biết đang kết nối với ai.',
      en: 'The wallet must display the resolved Issuer identity so the user knows whom they are connecting to.',
    },
    codeKey: 'holderIssuerConnection',
    variants: mobileVariants,
  },
  {
    id: 'issuer-sign-send-vc',
    number: '06',
    phase: 'issuance',
    actor: 'issuer',
    title: { vi: 'Ký VC và gửi qua kết nối SSI', en: 'Sign the VC and send it over the SSI connection' },
    summary: {
      vi: 'Issuer tạo VC chứa issuer DID, subject DID và claims, ký bằng khóa bí mật tương ứng với khóa công khai trong DID Document rồi gửi qua DIDComm.',
      en: 'The Issuer creates a VC containing issuer DID, subject DID, and claims, signs it with the private key corresponding to the DID Document public key, then sends it over DIDComm.',
    },
    protocol: 'W3C VC + DIDComm Issue Credential',
    inputs: [{ vi: 'Issuer DID, Holder DID, claims và connectionId', en: 'Issuer DID, Holder DID, claims, and connectionId' }],
    outputs: [{ vi: 'VC đã ký và message ID', en: 'Signed VC and message ID' }],
    security: {
      vi: 'proof.verificationMethod phải trỏ đến khóa công khai tương ứng trên CertNet; khóa bí mật chỉ được gọi qua key handle.',
      en: 'proof.verificationMethod must reference the corresponding public key on CertNet; the private key is accessed only through its key handle.',
    },
    codeKey: 'issueCredential',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'holder-verify-store-vc',
    number: '07',
    phase: 'issuance',
    actor: 'holder',
    title: { vi: 'Holder xác minh và lưu VC vào secure vault', en: 'Holder verifies and stores the VC in the secure vault' },
    summary: {
      vi: 'Ví nhận VC, resolve issuer DID trên CertNet, xác minh chữ ký và trạng thái rồi mã hóa VC trước khi lưu cục bộ.',
      en: 'The wallet receives the VC, resolves the issuer DID on CertNet, verifies signature and status, then encrypts the VC before local storage.',
    },
    protocol: 'CertNet Resolve + Encrypted Vault',
    inputs: [{ vi: 'VC nhận qua DIDComm', en: 'VC received over DIDComm' }],
    outputs: [{ vi: 'Credential record được mã hóa', en: 'Encrypted credential record' }],
    security: {
      vi: 'Mỗi lần đọc VC, SDK yêu cầu Secure Enclave/Keystore mở khóa vault key; ứng dụng không nhận khóa bí mật dạng rõ.',
      en: 'Every VC read requires Secure Enclave/Keystore to unwrap the vault key; the app never receives a clear private key.',
    },
    codeKey: 'holderStore',
    variants: mobileVariants,
  },
  {
    id: 'verifier-register-did',
    number: '08',
    phase: 'verification',
    actor: 'verifier',
    title: { vi: 'Khởi tạo danh tính của bên xác minh', en: 'Initialize the Verifier identity' },
    summary: {
      vi: 'Verifier tạo khóa, đăng ký DID Document chứa khóa công khai và DIDComm endpoint trên CertNet để Holder xác thực trước khi chia sẻ.',
      en: 'The Verifier creates keys and registers a DID Document containing its public key and DIDComm endpoint on CertNet so the Holder can authenticate it before sharing.',
    },
    protocol: 'DID Core + CertNet',
    inputs: [{ vi: 'Khóa công khai và endpoint nhận VP', en: 'Public key and VP receiving endpoint' }],
    outputs: [{ vi: 'Verifier DID', en: 'Verifier DID' }],
    security: {
      vi: 'Holder chỉ hiển thị yêu cầu chia sẻ sau khi xác thực DID và domain của Verifier.',
      en: 'The Holder displays a sharing request only after authenticating the Verifier DID and domain.',
    },
    codeKey: 'verifierIdentity',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'verifier-create-invitation',
    number: '09',
    phase: 'verification',
    actor: 'verifier',
    title: { vi: 'Verifier tạo QR kết nối xác minh', en: 'Verifier creates a verification connection QR' },
    summary: {
      vi: 'Verifier tạo DIDComm invitation gắn với verification session và hiển thị dưới dạng QR cho Holder quét.',
      en: 'The Verifier creates a DIDComm invitation bound to a verification session and displays it as QR for the Holder.',
    },
    protocol: 'DIDComm OOB 2.0',
    inputs: [{ vi: 'Verifier DID, domain và session ID', en: 'Verifier DID, domain, and session ID' }],
    outputs: [{ vi: 'QR payload và verificationSessionId', en: 'QR payload and verificationSessionId' }],
    security: {
      vi: 'QR không chứa dữ liệu cá nhân hoặc VP; challenge được tạo bằng bộ sinh số ngẫu nhiên mật mã.',
      en: 'The QR contains no personal data or VP; the challenge is created by a cryptographic random generator.',
    },
    codeKey: 'verifierInvitation',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'holder-connect-verifier',
    number: '10',
    phase: 'verification',
    actor: 'holder',
    title: { vi: 'Holder quét QR và kết nối với Verifier', en: 'Holder scans QR and connects to the Verifier' },
    summary: {
      vi: 'Ví resolve Verifier DID trên CertNet, hiển thị danh tính Verifier và chỉ thiết lập DIDComm connection sau khi người dùng xác nhận.',
      en: 'The wallet resolves the Verifier DID on CertNet, displays its identity, and establishes a DIDComm connection only after user confirmation.',
    },
    protocol: 'DIDComm DID Exchange',
    inputs: [{ vi: 'QR payload từ Verifier', en: 'QR payload from Verifier' }],
    outputs: [{ vi: 'connectionId giữa Holder và Verifier', en: 'Holder-Verifier connectionId' }],
    security: {
      vi: 'Không tái sử dụng connectionId của Issuer; mỗi quan hệ có kết nối và pairwise DID riêng.',
      en: 'The Issuer connectionId is never reused; each relationship has its own connection and pairwise DID.',
    },
    codeKey: 'holderVerifierConnection',
    variants: mobileVariants,
  },
  {
    id: 'verifier-send-request',
    number: '11',
    phase: 'verification',
    actor: 'verifier',
    title: { vi: 'Verifier gửi yêu cầu chia sẻ qua DIDComm', en: 'Verifier sends a sharing request over DIDComm' },
    summary: {
      vi: 'Sau khi kết nối hoàn tất, Verifier gửi Presentation Definition, challenge, domain, mục đích sử dụng và thời hạn.',
      en: 'After connection, the Verifier sends a Presentation Definition, challenge, domain, purpose, and expiry.',
    },
    protocol: 'DIDComm Present Proof',
    inputs: [{ vi: 'Presentation Definition và connectionId', en: 'Presentation Definition and connectionId' }],
    outputs: [{ vi: 'Presentation request đã gửi', en: 'Sent presentation request' }],
    security: {
      vi: 'Yêu cầu phải tối thiểu hóa dữ liệu và giải thích mục đích trước khi Holder đồng ý.',
      en: 'The request must minimize data and explain its purpose before the Holder consents.',
    },
    codeKey: 'presentationRequest',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'holder-create-send-vp',
    number: '12',
    phase: 'verification',
    actor: 'holder',
    title: { vi: 'Holder đồng ý, tạo VP và gửi cho Verifier', en: 'Holder consents, creates a VP, and sends it to the Verifier' },
    summary: {
      vi: 'Ví mở secure vault sau xác thực sinh trắc học, chọn VC phù hợp, tạo VP gắn challenge, ký bằng Holder DID key và gửi qua kết nối vừa tạo.',
      en: 'After biometric authentication, the wallet opens the secure vault, selects matching VCs, creates a challenge-bound VP, signs it with the Holder DID key, and sends it over the new connection.',
    },
    protocol: 'W3C VP + DIDComm Present Proof',
    inputs: [{ vi: 'Presentation request và sự đồng ý của người dùng', en: 'Presentation request and user consent' }],
    outputs: [{ vi: 'VP đã ký và message ID', en: 'Signed VP and message ID' }],
    security: {
      vi: 'SDK chỉ giải mã VC trong bộ nhớ tạm, xóa dữ liệu nhạy cảm sau khi tạo VP và không cho phép export VC.',
      en: 'The SDK decrypts VCs only in transient memory, clears sensitive data after VP creation, and never permits VC export.',
    },
    codeKey: 'createPresentation',
    variants: mobileVariants,
  },
  {
    id: 'verifier-verify-vp',
    number: '13',
    phase: 'verification',
    actor: 'verifier',
    title: { vi: 'Verifier resolve DID và xác minh VP', en: 'Verifier resolves DIDs and verifies the VP' },
    summary: {
      vi: 'Verifier nhận VP, resolve Holder DID và từng Issuer DID trên CertNet, lấy khóa công khai tương ứng rồi kiểm tra chữ ký, challenge, domain, schema và trạng thái VC.',
      en: 'The Verifier receives the VP, resolves the Holder DID and every Issuer DID on CertNet, obtains the corresponding public keys, then checks signatures, challenge, domain, schema, and VC status.',
    },
    protocol: 'CertNet Resolve + W3C VC/VP Verification',
    inputs: [{ vi: 'VP nhận qua DIDComm và verification session', en: 'VP received over DIDComm and verification session' }],
    outputs: [{ vi: 'VerificationResult có mã lỗi chi tiết', en: 'VerificationResult with detailed reason codes' }],
    security: {
      vi: 'Không chỉ kiểm tra chữ ký: phải kiểm tra challenge chống phát lại, domain, expiration và trạng thái thu hồi.',
      en: 'Signature checking alone is insufficient: replay challenge, domain, expiration, and revocation status must also be checked.',
    },
    codeKey: 'verifyPresentation',
    variants: allIssuerVerifierVariants,
  },
  {
    id: 'verifier-send-result',
    number: '14',
    phase: 'verification',
    actor: 'verifier',
    title: { vi: 'Gửi kết quả xác minh về Holder trước nghiệp vụ riêng', en: 'Send the verification result before business processing' },
    summary: {
      vi: 'Verifier gửi receipt đã ký qua chính kết nối DIDComm, để Holder biết VP thành công hay thất bại. Chỉ sau đó Verifier mới chạy nghiệp vụ riêng.',
      en: 'The Verifier sends a signed receipt over the same DIDComm connection so the Holder knows whether the VP passed or failed. Only then does the Verifier run its own business process.',
    },
    protocol: 'DIDComm Verification Receipt',
    inputs: [{ vi: 'VerificationResult và connectionId', en: 'VerificationResult and connectionId' }],
    outputs: [{ vi: 'Receipt gửi Holder và business decision', en: 'Receipt sent to Holder and business decision' }],
    security: {
      vi: 'Receipt không nên lặp lại claims nhạy cảm; chỉ chứa session ID, kết quả, thời gian và mã lý do an toàn.',
      en: 'The receipt should not repeat sensitive claims; it contains only session ID, result, timestamp, and a safe reason code.',
    },
    codeKey: 'verificationReceipt',
    variants: allIssuerVerifierVariants,
  },
];

const comments = {
  vi: {
    mock: 'API minh họa. Tên package và contract chưa được phát hành.',
    resolve: 'Resolve DID Document từ CertNet để lấy khóa công khai tin cậy.',
    secure: 'Khóa bí mật không rời khỏi vùng bảo vệ; SDK chỉ sử dụng key handle.',
  },
  en: {
    mock: 'Illustrative API. Package names and contracts have not been released.',
    resolve: 'Resolve the DID Document from CertNet to obtain a trusted public key.',
    secure: 'The private key never leaves protected storage; the SDK uses only its key handle.',
  },
} as const;

function jsReference(key: ReferenceCodeKey, variantId: SdkVariantId, lang: 'vi' | 'en') {
  const variant = sdkVariants.find((item) => item.id === variantId)!;
  const c = comments[lang];
  const mobile = variant.environment === 'mobile';
  const root = mobile ? 'IdentraMobile' : 'Identra';
  const init = `import { ${root} } from '${variant.packageName}';

// ${c.mock}
const identra = new ${root}({ environment: 'sandbox' });`;
  const bodies: Record<ReferenceCodeKey, string> = {
    issuerKeys: `// ${c.secure}
const issuerKey = await identra.crypto.generateSigningKey({
  algorithm: 'Ed25519',
  protection: '${variant.environment === 'server' ? 'hsm' : mobile ? 'platform-keystore' : 'managed-session'}',
  extractable: false
});

const publicKey = await issuerKey.exportPublicKey();`,
    issuerDid: `const draft = identra.did.createDocument({
  verificationMethods: [{
    id: '#issuer-signing-key',
    type: 'Multikey',
    publicKeyMultibase: publicKey.multibase
  }],
  services: [{
    type: 'DIDCommMessaging',
    serviceEndpoint: 'https://issuer.example/didcomm'
  }]
});

const { did, didDocumentVersion } =
  await identra.certNet.registerDidDocument(draft);`,
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

const { did: holderDid } = await wallet.certNet.registerDid({
  publicKey: await didKey.exportPublicKey(),
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
const qrPayload = await identra.qr.encode(invitation);`,
    holderIssuerConnection: `const invitation = await wallet.qr.decode(scannedQr);
const issuerDocument =
  await wallet.certNet.resolveDidDocument(invitation.from);
await wallet.ui.confirmConnection({ didDocument: issuerDocument });

const issuerConnection =
  await wallet.didcomm.acceptInvitation(invitation);`,
    issueCredential: `const credential = await identra.issuer.issueCredential({
  issuerDid: did,
  subjectDid: holderDid,
  type: ['VerifiableCredential', 'UniversityDegree'],
  claims: { degree: 'Information Technology', graduationYear: 2026 },
  // ${c.secure}
  signingKey: issuerKey
});

await issuanceSession.didcomm.sendCredential({
  connectionId: issuerConnection.id,
  credential
});`,
    holderStore: `wallet.didcomm.onCredential(async ({ credential }) => {
  // ${c.resolve}
  const issuerDocument =
    await wallet.certNet.resolveDidDocument(credential.issuer);
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
const { did: verifierDid } = await identra.certNet.registerDid({
  publicKey: await verifierKey.exportPublicKey(),
  didcommEndpoint: 'https://verifier.example/didcomm'
});`,
    verifierInvitation: `const verificationSession =
  await identra.verifier.createSession({
    verifierDid,
    domain: 'jobs.example',
    challenge: crypto.randomUUID(),
    expiresIn: '5m'
  });
const invitation = await verificationSession.didcomm.createInvitation();
const qrPayload = await identra.qr.encode(invitation);`,
    holderVerifierConnection: `const invitation = await wallet.qr.decode(scannedQr);
const verifierDocument =
  await wallet.certNet.resolveDidDocument(invitation.from);
await wallet.ui.confirmConnection({ didDocument: verifierDocument });

const verifierConnection =
  await wallet.didcomm.acceptInvitation(invitation);`,
    presentationRequest: `const request = await verificationSession.createRequest({
  purpose: 'Verify university degree for recruitment',
  presentationDefinition: {
    credentialType: 'UniversityDegree',
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
    verifyPresentation: `const presentation =
  await verificationSession.didcomm.waitForPresentation();

const result = await identra.verifier.verifyPresentation({
  presentation,
  challenge: verificationSession.challenge,
  domain: verificationSession.domain,
  // ${c.resolve}
  resolveDidDocument: identra.certNet.resolveDidDocument,
  checkCredentialStatus: true
});`,
    verificationReceipt: `const receipt = await verificationSession.createSignedReceipt({
  verified: result.verified,
  reasonCode: result.reasonCode,
  includeClaims: false
});
await verificationSession.didcomm.sendReceipt({
  connectionId: verifierConnection.id,
  receipt
});

if (result.verified) await runBusinessWorkflow();`,
  };
  return `${init}

${bodies[key]}`;
}

function goReference(key: ReferenceCodeKey, lang: 'vi' | 'en') {
  const c = comments[lang];
  const operations: Partial<Record<ReferenceCodeKey, string>> = {
    issuerKeys: `issuerKey, _ := client.Crypto.GenerateSigningKey(ctx, identra.KeyOptions{
    Algorithm: "Ed25519", Protection: "hsm", Extractable: false,
  })
  publicKey, _ := issuerKey.ExportPublicKey(ctx)`,
    issuerDid: `draft := identra.NewDIDDocument(publicKey, "https://issuer.example/didcomm")
  registration, _ := client.CertNet.RegisterDIDDocument(ctx, draft)
  issuerDID := registration.DID`,
    issuerInvitation: `session, _ := client.Issuer.CreateIssuanceSession(ctx, issuerDID, "5m")
  invitation, _ := session.DIDComm.CreateInvitation(ctx, "receive-credential")
  qrPayload, _ := client.QR.Encode(invitation)`,
    issueCredential: `credential, _ := client.Issuer.IssueCredential(ctx, identra.IssueOptions{
    IssuerDID: issuerDID, SubjectDID: holderDID,
    Type: "UniversityDegree", SigningKey: issuerKey,
  })
  _ = session.DIDComm.SendCredential(ctx, connectionID, credential)`,
    verifierIdentity: `verifierKey, _ := client.Crypto.GenerateSigningKey(ctx, identra.KeyOptions{
    Algorithm: "Ed25519", Protection: "hsm", Extractable: false,
  })
  verifierDID, _ := client.CertNet.RegisterDID(ctx, verifierKey.PublicKey())`,
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
    ResolveDIDFromCertNet: true, CheckCredentialStatus: true,
  })`,
    verificationReceipt: `receipt, _ := session.CreateSignedReceipt(ctx, result, false)
  _ = session.DIDComm.SendReceipt(ctx, connectionID, receipt)
  if result.Verified { runBusinessWorkflow() }`,
  };
  return `package main

import (
  "context"
  identra "github.com/identra-labs/identra-go"
)

func run(ctx context.Context, client *identra.Client) {
  // ${c.mock}
  ${operations[key] ?? '// This operation is available only in the Holder Mobile SDK.'}
}`;
}

function nativeReference(key: ReferenceCodeKey, variantId: SdkVariantId, lang: 'vi' | 'en') {
  const swift = variantId === 'mobile-ios';
  const c = comments[lang];
  const line = (swiftCode: string, javaCode: string) => swift ? swiftCode : javaCode;
  const operations: Partial<Record<ReferenceCodeKey, string>> = {
    issuerKeys: line(
      `let issuerKey = try await identra.crypto.generateSigningKey(
  algorithm: .ed25519, protection: .secureEnclave, extractable: false
)
let publicKey = try await issuerKey.exportPublicKey()`,
      `KeyHandle issuerKey = identra.crypto().generateSigningKey(
  Algorithm.ED25519, Protection.ANDROID_KEYSTORE, false
);
PublicKey publicKey = issuerKey.exportPublicKey();`,
    ),
    issuerDid: line(
      `let draft = IdentraDIDDocument(
  publicKey: publicKey,
  didcommEndpoint: "https://issuer.example/didcomm"
)
let registration = try await identra.certNet.registerDIDDocument(draft)
let issuerDID = registration.did`,
      `DIDDocument draft = DIDDocument.create(
  publicKey, "https://issuer.example/didcomm"
);
DIDRegistration registration = identra.certNet().registerDidDocument(draft);
String issuerDid = registration.did();`,
    ),
    holderWallet: line(
      `let wallet = try await identra.holder.createWallet(
  singleDevice: true, exportCredentials: false, requireBiometric: true
)
let protectionKey = try await wallet.secureStorage.createProtectionKey(extractable: false)
let didKey = try await wallet.crypto.generateWrappedSigningKey(protectionKey)
let vaultKey = try await wallet.crypto.generateWrappedVaultKey(protectionKey)
let holderDID = try await wallet.certNet.registerDID(
  publicKey: didKey.publicKey, didcommEndpoint: wallet.didcomm.mediatorEndpoint
)`,
      `HolderWallet wallet = identra.holder().createWallet(true, false, true);
ProtectionKey protectionKey = wallet.secureStorage().createProtectionKey(false);
WrappedKey didKey = wallet.crypto().generateWrappedSigningKey(protectionKey);
WrappedKey vaultKey = wallet.crypto().generateWrappedVaultKey(protectionKey);
String holderDid = wallet.certNet().registerDid(
  didKey.publicKey(), wallet.didcomm().mediatorEndpoint()
);`,
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
String qrPayload = identra.qr().encode(invitation);`,
    ),
    holderIssuerConnection: line(
      `let invitation = try await wallet.qr.decode(scannedQR)
let issuerDocument = try await wallet.certNet.resolveDIDDocument(invitation.from)
try await wallet.ui.confirmConnection(issuerDocument)
let issuerConnection = try await wallet.didcomm.acceptInvitation(invitation)`,
      `Invitation invitation = wallet.qr().decode(scannedQr);
DIDDocument issuerDocument = wallet.certNet().resolveDidDocument(invitation.from());
wallet.ui().confirmConnection(issuerDocument);
Connection issuerConnection = wallet.didcomm().acceptInvitation(invitation);`,
    ),
    issueCredential: line(
      `let credential = try await identra.issuer.issueCredential(
  issuerDID: issuerDID,
  subjectDID: holderDID,
  type: "UniversityDegree",
  claims: ["graduationYear": 2026],
  signingKey: issuerKey
)
try await session.didcomm.sendCredential(connectionID, credential)`,
      `VerifiableCredential credential = identra.issuer().issueCredential(
  issuerDid, holderDid, "UniversityDegree", claims, issuerKey
);
session.didcomm().sendCredential(connectionId, credential);`,
    ),
    holderStore: line(
      `wallet.didcomm.onCredential { credential in
  let issuerDocument = try await wallet.certNet.resolveDIDDocument(credential.issuer)
  try await wallet.credentials.verify(credential, issuerDocument: issuerDocument)
  try await wallet.credentials.storeEncrypted(
    credential, vaultKey: vaultKey, requireBiometric: true
  )
}`,
      `wallet.didcomm().onCredential(credential -> {
  DIDDocument issuerDocument = wallet.certNet().resolveDidDocument(credential.issuer());
  wallet.credentials().verify(credential, issuerDocument);
  wallet.credentials().storeEncrypted(credential, vaultKey, true);
});`,
    ),
    verifierIdentity: line(
      `let verifierKey = try await identra.crypto.generateSigningKey(
  algorithm: .ed25519, protection: .secureEnclave, extractable: false
)
let verifierDID = try await identra.certNet.registerDID(
  publicKey: verifierKey.publicKey,
  didcommEndpoint: "https://verifier.example/didcomm"
)`,
      `KeyHandle verifierKey = identra.crypto().generateSigningKey(
  Algorithm.ED25519, Protection.ANDROID_KEYSTORE, false
);
String verifierDid = identra.certNet().registerDid(
  verifierKey.publicKey(), "https://verifier.example/didcomm"
);`,
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
String qrPayload = identra.qr().encode(invitation);`,
    ),
    holderVerifierConnection: line(
      `let invitation = try await wallet.qr.decode(scannedQR)
let verifierDocument = try await wallet.certNet.resolveDIDDocument(invitation.from)
try await wallet.ui.confirmConnection(verifierDocument)
let verifierConnection = try await wallet.didcomm.acceptInvitation(invitation)`,
      `Invitation invitation = wallet.qr().decode(scannedQr);
DIDDocument verifierDocument = wallet.certNet().resolveDidDocument(invitation.from());
wallet.ui().confirmConnection(verifierDocument);
Connection verifierConnection = wallet.didcomm().acceptInvitation(invitation);`,
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
session.didcomm().sendRequest(verifierConnection.id(), request);`,
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
wallet.didcomm().sendPresentation(verifierConnection.id(), presentation);`,
    ),
    verifyPresentation: line(
      `let presentation = try await session.didcomm.waitForPresentation()
let result = try await identra.verifier.verifyPresentation(
  presentation,
  challenge: session.challenge,
  domain: session.domain,
  resolveDIDDocument: identra.certNet.resolveDIDDocument,
  checkCredentialStatus: true
)`,
      `VerifiablePresentation presentation = session.didcomm().waitForPresentation();
VerificationResult result = identra.verifier().verifyPresentation(
  presentation,
  session.challenge(),
  session.domain(),
  identra.certNet()::resolveDidDocument,
  true
);`,
    ),
    verificationReceipt: line(
      `let receipt = try await session.createSignedReceipt(
  verified: result.verified,
  reasonCode: result.reasonCode,
  includeClaims: false
)
try await session.didcomm.sendReceipt(verifierConnection.id, receipt)
if result.verified { try await runBusinessWorkflow() }`,
      `VerificationReceipt receipt = session.createSignedReceipt(
  result.verified(), result.reasonCode(), false
);
session.didcomm().sendReceipt(verifierConnection.id(), receipt);
if (result.verified()) runBusinessWorkflow();`,
    ),
  };
  const sdkImport = swift ? 'import IdentraSDK' : 'import dev.identra.sdk.Identra;';
  return `${sdkImport}

// ${c.mock}
${swift ? 'let identra = Identra(environment: .sandbox)' : 'Identra identra = Identra.sandbox();'}

${operations[key] ?? '// This API stage is not available for this native SDK.'}`;
}

export function getReferenceSnippet(key: ReferenceCodeKey, variantId: SdkVariantId, lang: 'vi' | 'en') {
  if (variantId === 'server-go') return goReference(key, lang);
  if (variantId === 'mobile-android' || variantId === 'mobile-ios') return nativeReference(key, variantId, lang);
  return jsReference(key, variantId, lang);
}
