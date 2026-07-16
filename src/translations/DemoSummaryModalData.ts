/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatDemoText, getLocalizedText, type LocalizedText } from './demoLocalization';

type RuleStatus = 'PASS' | 'WARN' | 'FAIL';

interface RuleItem {
  id: string;
  name: LocalizedText;
  weight: number;
  status: RuleStatus;
}

interface ScenarioDecisionData {
  overallConfidence: number;
  overallRisk: number;
  verdict: LocalizedText;
  riskDimensions: {
    label: LocalizedText;
    score: number;
  }[];
  confidenceTrend: number[];
  decisionLogic: LocalizedText;
  rules: RuleItem[];
  processors: string[];
}

const lt = (en: string, es: string, ja: string, de: string, vi: string): LocalizedText => ({
  en,
  es,
  ja,
  de,
  vi,
});

const VERDICT_APPROVED = lt('APPROVED', 'APROBADO', '承認', 'GENEHMIGT', 'THÔNG QUA');

const RISK_LABELS = {
  profileValidation: lt('Profile validation', 'Validación de perfil', 'プロフィール検証', 'Profilvalidierung', 'Xác minh hồ sơ'),
  idAuthenticity: lt('ID authenticity', 'Autenticidad del ID', 'ID真正性', 'ID-Echtheit', 'Tính gốc của ID'),
  biometricMatch: lt('Biometric match', 'Coincidencia biométrica', '生体認証照合', 'Biometrischer Abgleich', 'Khớp sinh trắc học'),
  behavioralBot: lt('Behavioral automation', 'Automatización conductual', '行動自動化', 'Verhaltensautomatisierung', 'Hành vi tự động'),
  amlWatchlists: lt('AML watchlists', 'Listas AML', 'AMLウォッチリスト', 'AML-Watchlists', 'Danh sách AML'),
  identityFraud: lt('Identity fraud', 'Fraude de identidad', 'ID不正', 'Identitätsbetrug', 'Gian lận danh tính'),
  licenseForgery: lt('Credential forgery', 'Falsificación de credenciales', '資格偽造', 'Nachweisfälschung', 'Giả mạo chứng chỉ'),
  criminalBackground: lt('Criminal background', 'Antecedentes penales', '犯罪歴', 'Strafrechtlicher Hintergrund', 'Lý lịch tư pháp'),
  automationScore: lt('Automation score', 'Puntuación de automatización', '自動化スコア', 'Automatisierungswert', 'Điểm tự động hóa'),
  deviceSpoofing: lt('Device spoofing', 'Suplantación de dispositivo', 'デバイス偽装', 'Gerätespoofing', 'Giả lập thiết bị'),
  navigationDynamics: lt('Navigation dynamics', 'Dinámica de navegación', '操作動態', 'Navigationsdynamik', 'Động lực học hành vi'),
  carrierRisk: lt('Carrier VoIP risk', 'Riesgo VoIP del operador', '通信事業者VoIPリスク', 'Carrier-VoIP-Risiko', 'Rủi ro số VoIP ảo'),
  multiAccount: lt('Multi-account link', 'Vínculo multicuentas', '複数アカウント連携', 'Mehrkonto-Verknüpfung', 'Liên kết đa tài khoản'),
  nfcIntegrity: lt('NFC chip integrity', 'Integridad de chip NFC', 'NFCチップ完全性', 'NFC-Chipintegrität', 'Tính toàn vẹn chip NFC'),
  faceMatch: lt('Biometric face match', 'Coincidencia facial biométrica', '生体顔照合', 'Biometrischer Gesichtsabgleich', 'Khớp mặt sinh trắc học'),
  ageRisk: lt('Under-age risk', 'Riesgo de minoría de edad', '未成年リスク', 'Minderjährigenrisiko', 'Rủi ro chưa đủ tuổi'),
  imageSpoofing: lt('Image spoofing', 'Suplantación de imagen', '画像偽装', 'Bildspoofing', 'Giả mạo hình ảnh'),
  citizenMatch: lt('Citizen match risk', 'Riesgo de coincidencia ciudadana', '市民照合リスク', 'Bürgerabgleichsrisiko', 'Rủi ro khớp công dân'),
  addressValidation: lt('Address validation', 'Validación de dirección', '住所検証', 'Adressvalidierung', 'Xác minh nơi cư trú'),
  signatureFraud: lt('Signature fraud', 'Fraude de firma', '署名不正', 'Signaturbetrug', 'Mạo danh chữ ký số'),
  ipGeoMatch: lt('IP geolocation match', 'Coincidencia geográfica de IP', 'IP位置情報一致', 'IP-Geolocation-Abgleich', 'Độ khớp địa chỉ IP'),
  identityDuplicate: lt('Identity duplicate', 'Identidad duplicada', 'ID重複', 'Identitätsduplikat', 'Trùng lặp bệnh án'),
  insuranceFraud: lt('Insurance card fraud', 'Fraude de tarjeta de seguro', '保険証不正', 'Versicherungskartenbetrug', 'Gian lận thẻ bảo hiểm'),
  consentCompliance: lt('Consent compliance', 'Cumplimiento de consentimiento', '同意コンプライアンス', 'Einwilligungs-Compliance', 'Tuân thủ đồng ý y tế'),
  ipGeoValidity: lt('IP geo validity', 'Validez geográfica de IP', 'IP地理情報の有効性', 'IP-Geo-Gültigkeit', 'Tính hợp lệ địa lý IP'),
  doubleSpend: lt('Double-spend attempt', 'Intento de doble gasto', '二重使用の試行', 'Double-Spend-Versuch', 'Gian lận bán vé hai lần'),
  escrowBypass: lt('Escrow bypass fraud', 'Fraude de omisión de escrow', 'エスクロー回避不正', 'Escrow-Umgehungsbetrug', 'Gian lận bỏ qua ký quỹ'),
  smartContract: lt('Smart contract audit', 'Auditoría de smart contract', 'スマートコントラクト監査', 'Smart-Contract-Audit', 'An toàn hợp đồng thông minh'),
  transferManipulation: lt('Transfer manipulation', 'Manipulación de transferencia', '譲渡操作', 'Transfermanipulation', 'Can thiệp chuỗi chuyển nhượng'),
};

const SCENARIO_DATA_MAP: Record<string, ScenarioDecisionData> = {
  'bank-account': {
    overallConfidence: 99.2,
    overallRisk: 2.4,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.profileValidation, score: 5 },
      { label: RISK_LABELS.idAuthenticity, score: 3 },
      { label: RISK_LABELS.biometricMatch, score: 1 },
      { label: RISK_LABELS.behavioralBot, score: 2 },
      { label: RISK_LABELS.amlWatchlists, score: 0 },
    ],
    confidenceTrend: [45, 78, 96, 99.2],
    decisionLogic: lt(
      'All identity stages completed without deviation. SSN profile data matched national registry records, passport cryptographic checks passed, live facial liveness confirmed physical presence, and AML screening returned no matches.',
      'Todas las etapas de identidad se completaron sin desviaciones. Los datos SSN coincidieron con registros nacionales, el pasaporte superó las comprobaciones criptográficas, la prueba de vida facial confirmó presencia física y el control AML no encontró coincidencias.',
      'すべての本人確認ステージが逸脱なく完了しました。SSN情報は国家登録と一致し、パスポートの暗号検証に合格し、ライブ顔認証で実在性を確認し、AMLスクリーニングで一致はありませんでした。',
      'Alle Identitätsstufen wurden ohne Abweichung abgeschlossen. Die SSN-Daten stimmten mit nationalen Registern überein, die Passprüfung bestand die kryptografischen Kontrollen, die Gesichtsliveness bestätigte physische Präsenz und AML ergab keine Treffer.',
      'Tất cả bước xác thực danh tính hoàn tất không có sai lệch. Dữ liệu SSN khớp hồ sơ quốc gia, hộ chiếu vượt qua kiểm tra mật mã, nhận diện khuôn mặt sống xác nhận sự hiện diện thật và sàng lọc AML không có trùng khớp.'
    ),
    rules: [
      { id: 'RULE-KYC-PROFILE', name: lt('National database registry match', 'Coincidencia con registro nacional', '国家データベース照合', 'Abgleich mit nationalem Register', 'Đối sánh cơ sở dữ liệu quốc gia'), weight: 20, status: 'PASS' },
      { id: 'RULE-KYC-DOC-SEC', name: lt('Cryptographic ID authenticity check', 'Comprobación criptográfica de ID', 'ID暗号真正性チェック', 'Kryptografische ID-Echtheitsprüfung', 'Kiểm tra tính thật của ID bằng mật mã'), weight: 30, status: 'PASS' },
      { id: 'RULE-KYC-FACEMATCH', name: lt('Biometric facial similarity check', 'Comprobación de similitud facial', '生体顔類似度チェック', 'Biometrische Gesichtsähnlichkeitsprüfung', 'Kiểm tra khớp mặt sinh trắc học'), weight: 30, status: 'PASS' },
      { id: 'RULE-KYC-AML', name: lt('OFAC and PEP sanctions audit', 'Auditoría de sanciones OFAC y PEP', 'OFAC・PEP制裁監査', 'OFAC- und PEP-Sanktionsprüfung', 'Kiểm toán danh sách OFAC và PEP'), weight: 20, status: 'PASS' },
    ],
    processors: ['SECURE-CORE-01', 'OCR-IDV-SCANNER', 'BIO-LIVENESS-V3', 'AML-GLOBAL-ROUTING'],
  },
  'apply-job': {
    overallConfidence: 97.5,
    overallRisk: 3.5,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.identityFraud, score: 4 },
      { label: RISK_LABELS.licenseForgery, score: 6 },
      { label: RISK_LABELS.criminalBackground, score: 2 },
      { label: RISK_LABELS.automationScore, score: 1 },
    ],
    confidenceTrend: [50, 85, 97.5],
    decisionLogic: lt(
      'Candidate John Doe was verified. Active SSN records showed no red flags, the education registrar confirmed the software engineering degree, and court records returned no matching criminal history.',
      'Se verificó al candidato John Doe. Los registros SSN activos no mostraron alertas, el registro educativo confirmó el título de ingeniería de software y los tribunales no devolvieron antecedentes penales coincidentes.',
      '候補者John Doeを確認しました。有効なSSN記録に警告はなく、教育登録機関がソフトウェア工学の学位を確認し、裁判所記録に一致する犯罪歴はありませんでした。',
      'Bewerber John Doe wurde verifiziert. Aktive SSN-Datensätze zeigten keine Warnsignale, das Bildungsregister bestätigte den Abschluss in Software Engineering und Gerichtsakten ergaben keine passenden Vorstrafen.',
      'Ứng viên John Doe đã được xác minh. Hồ sơ SSN đang hoạt động không có cảnh báo, cơ quan đào tạo xác nhận bằng kỹ sư phần mềm và dữ liệu tòa án không có lịch sử hình sự trùng khớp.'
    ),
    rules: [
      { id: 'RULE-IDV-ASSURE', name: lt('National SSN identity security audit', 'Auditoría nacional de seguridad SSN', '国家SSN本人確認監査', 'Nationale SSN-Identitätssicherheitsprüfung', 'Kiểm toán an toàn SSN quốc gia'), weight: 30, status: 'PASS' },
      { id: 'RULE-EDU-VALID', name: lt('Degree registry authority verification', 'Verificación de autoridad académica', '学位登録機関の検証', 'Prüfung der Abschlussregisterstelle', 'Xác minh cơ quan cấp bằng'), weight: 40, status: 'PASS' },
      { id: 'RULE-BG-CRIMINAL', name: lt('Federal and county criminal search', 'Búsqueda penal federal y local', '連邦・郡犯罪歴検索', 'Bundes- und Bezirksstrafregistersuche', 'Tra cứu hình sự liên bang và quận'), weight: 30, status: 'PASS' },
    ],
    processors: ['WORKFORCE-IDV-01', 'EDU-REGISTRY-LINK', 'COURT-RECORD-AUDIT'],
  },
  'ticket-booking': {
    overallConfidence: 96.0,
    overallRisk: 5.2,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.deviceSpoofing, score: 12 },
      { label: RISK_LABELS.navigationDynamics, score: 8 },
      { label: RISK_LABELS.carrierRisk, score: 5 },
      { label: RISK_LABELS.multiAccount, score: 2 },
    ],
    confidenceTrend: [40, 78, 96.0],
    decisionLogic: lt(
      'Anti-scalper controls found no blocking indicators. Browser fingerprint, pointer dynamics, and click cadence matched human behavior. The phone number mapped to a real SIM and OTP verification completed on time.',
      'Los controles anti-reventa no encontraron indicadores de bloqueo. La huella del navegador, la dinámica del cursor y el ritmo de clics coincidieron con comportamiento humano. El teléfono correspondía a una SIM real y el OTP se verificó a tiempo.',
      '転売対策コントロールでブロック指標は見つかりませんでした。ブラウザ指紋、ポインター動作、クリック間隔は人間の行動と一致しました。電話番号は実SIMに紐づき、OTP検証は期限内に完了しました。',
      'Anti-Scalper-Kontrollen fanden keine blockierenden Hinweise. Browser-Fingerprint, Zeigerdynamik und Klickrhythmus entsprachen menschlichem Verhalten. Die Telefonnummer gehörte zu einer echten SIM und die OTP-Prüfung wurde rechtzeitig abgeschlossen.',
      'Kiểm soát chống đầu cơ không phát hiện tín hiệu chặn. Dấu vân tay trình duyệt, chuyển động con trỏ và nhịp bấm khớp hành vi người thật. Số điện thoại gắn với SIM thật và OTP được xác minh đúng hạn.'
    ),
    rules: [
      { id: 'RULE-BOT-HEURISTIC', name: lt('Human-like behavioral signal check', 'Comprobación de señales humanas', '人間らしい行動信号チェック', 'Prüfung menschlicher Verhaltenssignale', 'Kiểm tra tín hiệu hành vi người thật'), weight: 40, status: 'PASS' },
      { id: 'RULE-TELCO-REAL-SIM', name: lt('Carrier telemetry SIM validation', 'Validación de telemetría SIM', '通信事業者SIMテレメトリ検証', 'SIM-Telemetrieprüfung des Netzbetreibers', 'Xác thực SIM vật lý từ nhà mạng'), weight: 30, status: 'PASS' },
      { id: 'RULE-OTP-LOCK', name: lt('SMS ownership binding transaction', 'Vinculación de titularidad por SMS', 'SMS所有権バインディング', 'SMS-Besitzbindungsprüfung', 'Ràng buộc sở hữu qua SMS OTP'), weight: 30, status: 'PASS' },
    ],
    processors: ['BOT-SIGNAL-MATRIX', 'TELCO-SIM-VERIFY', 'TICKET-CRYPT-VAULT'],
  },
  'airlines-hotels': {
    overallConfidence: 99.8,
    overallRisk: 0.8,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.nfcIntegrity, score: 1 },
      { label: RISK_LABELS.faceMatch, score: 1 },
      { label: RISK_LABELS.ageRisk, score: 0 },
      { label: RISK_LABELS.imageSpoofing, score: 2 },
    ],
    confidenceTrend: [60, 92, 99.8],
    decisionLogic: lt(
      'High-assurance contact-free check-in was approved. NFC keys matched the issuing authority certificate, live selfie vectors matched the passport chip portrait, and flight and hotel records synchronized successfully.',
      'Se aprobó el check-in sin contacto de alta garantía. Las claves NFC coincidieron con el certificado emisor, la selfie en vivo coincidió con el retrato del chip del pasaporte y los registros de vuelo y hotel se sincronizaron correctamente.',
      '高保証の非接触チェックインが承認されました。NFCキーは発行機関証明書と一致し、ライブセルフィーはパスポートチップの顔写真と一致し、航空券とホテル記録は正常に同期しました。',
      'Der kontaktlose Check-in mit hoher Sicherheit wurde genehmigt. NFC-Schlüssel stimmten mit dem Zertifikat der Ausgabestelle überein, Live-Selfie-Vektoren passten zum Passchip-Porträt und Flug- sowie Hoteldaten wurden synchronisiert.',
      'Check-in không tiếp xúc mức đảm bảo cao đã được phê duyệt. Khóa NFC khớp chứng chỉ cơ quan cấp, véc-tơ selfie sống khớp ảnh trong chip hộ chiếu và dữ liệu chuyến bay, khách sạn đồng bộ thành công.'
    ),
    rules: [
      { id: 'RULE-NFC-CRYPT', name: lt('Passport NFC cryptographic authentication', 'Autenticación criptográfica NFC del pasaporte', 'パスポートNFC暗号認証', 'Kryptografische NFC-Passauthentifizierung', 'Xác thực mật mã chip NFC hộ chiếu'), weight: 40, status: 'PASS' },
      { id: 'RULE-BIO-CHIPMATCH', name: lt('High-resolution biometric similarity match', 'Coincidencia biométrica de alta resolución', '高解像度生体類似度照合', 'Hochauflösender biometrischer Abgleich', 'Đối sánh sinh trắc độ phân giải cao'), weight: 40, status: 'PASS' },
      { id: 'RULE-AGE-VALID', name: lt('Legal age and flight sync validation', 'Validación de edad legal y vuelo', '法定年齢・フライト同期検証', 'Prüfung von Mindestalter und Flugsynchronisierung', 'Xác minh độ tuổi pháp lý và đồng bộ chuyến bay'), weight: 20, status: 'PASS' },
    ],
    processors: ['NFC-CHIP-READER', 'BIO-VECTOR-EVAL', 'FLIGHT-GUEST-BRIDGE'],
  },
  'government-services': {
    overallConfidence: 98.9,
    overallRisk: 1.5,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.citizenMatch, score: 2 },
      { label: RISK_LABELS.addressValidation, score: 4 },
      { label: RISK_LABELS.signatureFraud, score: 1 },
      { label: RISK_LABELS.ipGeoMatch, score: 3 },
    ],
    confidenceTrend: [55, 88, 98.9],
    decisionLogic: lt(
      'The citizen service request was verified. Citizen index data matched birth and residency registries, address checks cleared against postal and utility records, and the electronic signature was sealed with verified citizen tokens.',
      'La solicitud ciudadana fue verificada. El índice ciudadano coincidió con registros de nacimiento y residencia, la dirección pasó controles postales y de servicios, y la firma electrónica quedó sellada con tokens ciudadanos verificados.',
      '市民サービス申請が検証されました。市民インデックスは出生・居住登録と一致し、住所は郵便・公共料金記録で確認され、電子署名は検証済み市民トークンで封印されました。',
      'Der Bürgerantrag wurde verifiziert. Bürgerindexdaten stimmten mit Geburts- und Wohnsitzregistern überein, Adressprüfungen bestanden Post- und Versorgungsdaten und die elektronische Signatur wurde mit verifizierten Bürgertokens versiegelt.',
      'Yêu cầu dịch vụ công đã được xác minh. Chỉ mục công dân khớp đăng ký khai sinh và cư trú, địa chỉ vượt kiểm tra bưu chính và hóa đơn tiện ích, chữ ký điện tử được niêm phong bằng token công dân đã xác thực.'
    ),
    rules: [
      { id: 'RULE-CITIZEN-LEDGER', name: lt('National citizen database audit', 'Auditoría de base ciudadana nacional', '国家市民データベース監査', 'Prüfung nationaler Bürgerdatenbank', 'Kiểm toán dữ liệu công dân quốc gia'), weight: 40, status: 'PASS' },
      { id: 'RULE-RESIDENCY-LOC', name: lt('Spatial address utility verification', 'Verificación espacial de domicilio', '空間住所・公共料金検証', 'Räumliche Adress- und Versorgungsprüfung', 'Xác minh địa chỉ cư trú theo dữ liệu tiện ích'), weight: 30, status: 'PASS' },
      { id: 'RULE-DIGI-SIGN', name: lt('Cryptographic citizen signature lock', 'Bloqueo criptográfico de firma ciudadana', '市民署名の暗号ロック', 'Kryptografische Bürgersignatursperre', 'Khóa chữ ký công dân bằng mật mã'), weight: 30, status: 'PASS' },
    ],
    processors: ['GOV-CITIZEN-INDEX', 'POSTAL-SPATIAL-GRID', 'PKI-SIGN-ROUTING'],
  },
  healthcare: {
    overallConfidence: 98.0,
    overallRisk: 2.1,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.identityDuplicate, score: 3 },
      { label: RISK_LABELS.insuranceFraud, score: 5 },
      { label: RISK_LABELS.consentCompliance, score: 1 },
      { label: RISK_LABELS.ipGeoValidity, score: 2 },
    ],
    confidenceTrend: [45, 82, 98.0],
    decisionLogic: lt(
      'HIPAA-compliant telemedicine access was cleared. Patient identity checks prevented duplicate medical records, OCR confirmed active insurance coverage, and the consent signature was cryptographically bound to the session.',
      'Se aprobó el acceso de telemedicina conforme a HIPAA. Los controles de identidad evitaron expedientes duplicados, el OCR confirmó cobertura activa y la firma de consentimiento quedó vinculada criptográficamente a la sesión.',
      'HIPAA準拠の遠隔医療アクセスが承認されました。患者ID確認で重複カルテを防ぎ、OCRで有効な保険適用を確認し、同意署名はセッションに暗号的に紐づけられました。',
      'HIPAA-konformer Telemedizinzugang wurde freigegeben. Patientenidentitätsprüfungen verhinderten doppelte Akten, OCR bestätigte aktive Versicherung und die Einwilligungssignatur wurde kryptografisch an die Sitzung gebunden.',
      'Quyền truy cập khám từ xa tuân thủ HIPAA đã được chấp thuận. Kiểm tra danh tính bệnh nhân ngăn hồ sơ trùng lặp, OCR xác nhận bảo hiểm còn hiệu lực và chữ ký đồng ý được ràng buộc mật mã với phiên.'
    ),
    rules: [
      { id: 'RULE-PATIENT-ID', name: lt('De-duplicate patient index audit', 'Auditoría de índice de paciente', '患者インデックス重複排除監査', 'Deduplizierung des Patientenindex', 'Kiểm toán khử trùng lặp hồ sơ bệnh nhân'), weight: 30, status: 'PASS' },
      { id: 'RULE-OCR-INSURANCE', name: lt('Insurance policy coverage verification', 'Verificación de cobertura de seguro', '保険適用範囲の検証', 'Prüfung des Versicherungsschutzes', 'Xác minh phạm vi bảo hiểm y tế'), weight: 40, status: 'PASS' },
      { id: 'RULE-HIPAA-CONSENT', name: lt('HIPAA consent cryptographic wrap', 'Envoltura criptográfica de consentimiento HIPAA', 'HIPAA同意の暗号ラップ', 'Kryptografische HIPAA-Einwilligungskapselung', 'Niêm phong mật mã đồng ý HIPAA'), weight: 30, status: 'PASS' },
    ],
    processors: ['CLINICAL-EMR-MERGER', 'OCR-HEALTH-EXTRACT', 'HIPAA-VAULT-SENTRY'],
  },
  'ticket-transfer': {
    overallConfidence: 99.5,
    overallRisk: 1.0,
    verdict: VERDICT_APPROVED,
    riskDimensions: [
      { label: RISK_LABELS.doubleSpend, score: 1 },
      { label: RISK_LABELS.escrowBypass, score: 2 },
      { label: RISK_LABELS.smartContract, score: 1 },
      { label: RISK_LABELS.transferManipulation, score: 1 },
    ],
    confidenceTrend: [50, 88, 99.5],
    decisionLogic: lt(
      'The peer-to-peer exchange was finalized safely. Original ticket signatures matched the ticketing authority, escrow funding and asset locks were validated, and ownership changed atomically to prevent double spending.',
      'El intercambio entre pares finalizó de forma segura. Las firmas originales coincidieron con la autoridad emisora, se validaron el escrow y el bloqueo del activo, y la propiedad cambió de forma atómica para evitar doble gasto.',
      'P2P交換は安全に完了しました。元のチケット署名は発行機関と一致し、エスクロー資金と資産ロックが検証され、二重使用を防ぐため所有権は原子的に移転しました。',
      'Der Peer-to-Peer-Austausch wurde sicher abgeschlossen. Originale Ticketsignaturen stimmten mit der Ausgabestelle überein, Escrow-Finanzierung und Asset-Sperren wurden geprüft und der Besitz wechselte atomar gegen Double-Spending.',
      'Giao dịch ngang hàng đã hoàn tất an toàn. Chữ ký vé gốc khớp cơ quan phát hành, ký quỹ và khóa tài sản được xác thực, quyền sở hữu chuyển đổi nguyên tử để ngăn bán vé hai lần.'
    ),
    rules: [
      { id: 'RULE-OWNER-AUTH', name: lt('Original purchase signature audit', 'Auditoría de firma de compra original', '元購入署名監査', 'Prüfung der Originalkaufsignatur', 'Kiểm toán chữ ký mua vé gốc'), weight: 45, status: 'PASS' },
      { id: 'RULE-ESCROW-INIT', name: lt('Smart contract escrow funding lock', 'Bloqueo de fondos en smart contract', 'スマートコントラクトエスクロー資金ロック', 'Smart-Contract-Escrow-Finanzierungssperre', 'Khóa ký quỹ bằng hợp đồng thông minh'), weight: 35, status: 'PASS' },
      { id: 'RULE-ATOMIC-SWAP', name: lt('Atomic swap consensus settlement', 'Liquidación por consenso de intercambio atómico', 'アトミックスワップ合意決済', 'Atomic-Swap-Konsensabrechnung', 'Tất toán hoán đổi nguyên tử'), weight: 20, status: 'PASS' },
    ],
    processors: ['TICKET-LEDGER-AUDIT', 'ESCROW-RELAY-CONTRACT', 'ATOMIC-SETTLE-GRID'],
  },
};

const EVIDENCE_COPY = {
  riskDeflections: [
    lt('Identity layer verified', 'Capa de identidad verificada', '本人確認レイヤー検証済み', 'Identitätsebene verifiziert', 'Lớp danh tính đã xác minh'),
    lt('Fraud vector reduced', 'Vector de fraude reducido', '不正ベクトルを低減', 'Betrugsvektor reduziert', 'Véc-tơ gian lận đã giảm'),
    lt('Cryptographic evidence sealed', 'Evidencia criptográfica sellada', '暗号証跡を封印', 'Kryptografische Evidenz versiegelt', 'Bằng chứng mật mã đã niêm phong'),
    lt('Review queue cleared', 'Cola de revisión despejada', 'レビューキューを解消', 'Prüfwarteschlange bereinigt', 'Hàng đợi rà soát đã sạch'),
  ],
  details: [
    lt(
      'The engine evaluated "{rule}" and confirmed the submitted identity signals against trusted data sources.',
      'El motor evaluó "{rule}" y confirmó las señales de identidad enviadas contra fuentes de datos confiables.',
      'エンジンは「{rule}」を評価し、提出された本人確認シグナルを信頼済みデータソースで確認しました。',
      'Die Engine bewertete "{rule}" und bestätigte die eingereichten Identitätssignale gegen vertrauenswürdige Datenquellen.',
      'Bộ máy đã đánh giá "{rule}" và xác nhận tín hiệu danh tính đã gửi với các nguồn dữ liệu tin cậy.'
    ),
    lt(
      'Risk signals were cross-checked and normalized before the confidence score was updated for the next decision layer.',
      'Las señales de riesgo se cotejaron y normalizaron antes de actualizar la confianza para la siguiente capa de decisión.',
      'リスク信号は照合・正規化され、次の判定レイヤーに向けて信頼スコアが更新されました。',
      'Risikosignale wurden abgeglichen und normalisiert, bevor der Vertrauenswert für die nächste Entscheidungsebene aktualisiert wurde.',
      'Tín hiệu rủi ro được đối chiếu và chuẩn hóa trước khi điểm tin cậy được cập nhật cho lớp quyết định tiếp theo.'
    ),
    lt(
      'Cryptographic checks completed successfully and the audit trail was sealed for downstream review.',
      'Las comprobaciones criptográficas finalizaron correctamente y la pista de auditoría quedó sellada para revisión posterior.',
      '暗号チェックは正常に完了し、後続レビュー用に監査証跡が封印されました。',
      'Kryptografische Prüfungen wurden erfolgreich abgeschlossen und die Audit-Spur für nachgelagerte Prüfung versiegelt.',
      'Kiểm tra mật mã hoàn tất thành công và nhật ký kiểm toán được niêm phong cho bước rà soát tiếp theo.'
    ),
  ],
  signalLabels: {
    ruleApplied: lt('Rule applied', 'Regla aplicada', '適用ルール', 'Angewendete Regel', 'Quy tắc đã áp dụng'),
    confidence: lt('Confidence achieved', 'Confianza alcanzada', '到達信頼度', 'Erreichter Vertrauenswert', 'Độ tin cậy đạt được'),
    status: lt('Status', 'Estado', 'ステータス', 'Status', 'Trạng thái'),
  },
  statusPass: lt('Passed', 'Aprobado', '合格', 'Bestanden', 'Đạt'),
};

export interface DemoSummaryRule {
  id: string;
  name: string;
  weight: number;
  status: RuleStatus;
}

export interface DemoSummaryDecisionData {
  overallConfidence: number;
  overallRisk: number;
  verdict: string;
  riskDimensions: {
    label: string;
    score: number;
  }[];
  confidenceTrend: number[];
  decisionLogic: string;
  rules: DemoSummaryRule[];
}

export interface DemoSummaryEvidenceSignal {
  label: string;
  value: string;
  status: 'PASS' | 'WARN' | 'INFO';
}

export interface DemoSummaryStepEvidence {
  processorNode: string;
  timestamp: string;
  confidenceAchieved: number;
  riskDeflection: string;
  details: string;
  signals: DemoSummaryEvidenceSignal[];
}

export const DEMO_SUMMARY_SCENARIO_IDS = Object.keys(SCENARIO_DATA_MAP);

export const getDemoSummaryDecisionData = (scenarioId: string, language: string): DemoSummaryDecisionData => {
  const scenario = SCENARIO_DATA_MAP[scenarioId] || SCENARIO_DATA_MAP['bank-account'];
  return {
    overallConfidence: scenario.overallConfidence,
    overallRisk: scenario.overallRisk,
    verdict: getLocalizedText(scenario.verdict, language),
    riskDimensions: scenario.riskDimensions.map((dimension) => ({
      label: getLocalizedText(dimension.label, language),
      score: dimension.score,
    })),
    confidenceTrend: scenario.confidenceTrend,
    decisionLogic: getLocalizedText(scenario.decisionLogic, language),
    rules: scenario.rules.map((rule) => ({
      id: rule.id,
      name: getLocalizedText(rule.name, language),
      weight: rule.weight,
      status: rule.status,
    })),
  };
};

export const getDemoSummaryStepEvidence = (scenarioId: string, language: string): DemoSummaryStepEvidence[] => {
  const scenario = SCENARIO_DATA_MAP[scenarioId] || SCENARIO_DATA_MAP['bank-account'];

  return scenario.confidenceTrend.map((confidence, index) => {
    const rule = scenario.rules[index] || scenario.rules[scenario.rules.length - 1];
    const signalStatus: DemoSummaryEvidenceSignal['status'] = rule.status === 'FAIL' ? 'WARN' : rule.status;
    const detailTemplate = getLocalizedText(EVIDENCE_COPY.details[index % EVIDENCE_COPY.details.length], language);

    return {
      processorNode: scenario.processors[index] || `SECURE-CORE-${String(index + 1).padStart(2, '0')}`,
      timestamp: `2026-07-11 06:${String(15 + index).padStart(2, '0')}:${index === 0 ? '32' : index === 1 ? '45' : '01'} UTC`,
      confidenceAchieved: confidence,
      riskDeflection: getLocalizedText(EVIDENCE_COPY.riskDeflections[index % EVIDENCE_COPY.riskDeflections.length], language),
      details: formatDemoText(detailTemplate, { rule: getLocalizedText(rule.name, language) }),
      signals: [
        {
          label: getLocalizedText(EVIDENCE_COPY.signalLabels.ruleApplied, language),
          value: getLocalizedText(rule.name, language),
          status: signalStatus,
        },
        {
          label: getLocalizedText(EVIDENCE_COPY.signalLabels.confidence, language),
          value: `${confidence}%`,
          status: 'PASS',
        },
        {
          label: getLocalizedText(EVIDENCE_COPY.signalLabels.status, language),
          value: getLocalizedText(EVIDENCE_COPY.statusPass, language),
          status: 'PASS',
        },
      ],
    };
  });
};
