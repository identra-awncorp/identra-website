/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type SummaryLanguage = 'en' | 'es' | 'ja' | 'de' | 'vi';

type LocalizedText = Record<SummaryLanguage, string>;

const resolveSummaryLanguage = (language: string): SummaryLanguage =>
  ['en', 'es', 'ja', 'de', 'vi'].includes(language) ? language as SummaryLanguage : 'en';

const getSummaryLocalizedText = (copy: LocalizedText, language: string): string =>
  copy[resolveSummaryLanguage(language)];

const formatSummaryText = (
  template: string,
  values: Record<string, string | number>
): string => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export const DEMO_SUMMARY_MODAL_TRANSLATIONS: any = {
  "en": {
    "cumulativeTrust": "Cumulative Trust",
    "evidenceNodeHint": "* Click any node to jump to the Evidence tab for that specific layer",
    "threatDeflected": "Threat Deflected:",
    "exporting": "Exporting...",
    "reportExported": "Report Exported!",
    "securityEngineVerdictReport": "SECURITY ENGINE VERDICT REPORT",
    "decisionLogicAnalysis": "Decision Logic Analysis: {scenario}",
    "headerDescription": "Explore the risk mitigation architecture and trust progression thresholds executed under the hood by our automated rules engine.",
    "verdictProgression": "Verdict & Progression",
    "evidenceRules": "Evidence & Rules",
    "digitalPassTab": "Digital Pass",
    "systemVerdict": "SYSTEM VERDICT",
    "confidenceLabel": "CONFIDENCE",
    "approvedVerified": "APPROVED / VERIFIED",
    "overallRiskIndex": "Overall Risk Index:",
    "veryLow": "Very Low",
    "riskScoreDimensionBreakdown": "RISK SCORE DIMENSION BREAKDOWN",
    "riskVectorsDescription": "Evaluated threat vectors (Lower scores indicate safer profiles)",
    "safeThreshold": "0% - 25%: SAFE THRESHOLD",
    "decisionApprovalLimit": "Decision Approval Limit: 25%",
    "verificationConfidenceProgressionTrend": "VERIFICATION CONFIDENCE PROGRESSION TREND",
    "progressionDescription": "Model demonstrating the growth of trustworthiness after each successful verification step",
    "stepLabel": "STEP {index}",
    "layerLabel": "LAYER {index}",
    "trustGainLabel": "Trust",
    "evidenceVaultTitle": "LAYER {index} DIAGNOSTIC EVIDENCE VAULT",
    "triggeredLogicBranch": "TRIGGERED LOGIC BRANCH:",
    "totalTrustGained": "Total Trust Gained:",
    "decodedCryptographicSignals": "DECODED CRYPTOGRAPHIC SIGNALS:",
    "consensusSealDescription": "Consensus sealed and approved under authority certificate Identra-Relay-Vault-2026. Real-time criteria satisfied.",
    "rulesEngineEvaluationAudit": "RULES ENGINE EVALUATION AUDIT",
    "rulesChecked": "Rules Checked",
    "selectedLayer": "Selected Layer",
    "ruleExplanation": "Evaluation logic verifying mathematical authenticity thresholds.",
    "trustWeight": "Trust Weight",
    "highAssuranceSecurityAttestation": "HIGH-ASSURANCE SECURITY ATTESTATION",
    "coreSecureTrustVerdict": "CORE SECURE TRUST VERDICT",
    "statusCompliantValid": "STATUS: COMPLIANT / VALID",
    "identityVerificationPass": "IDENTITY VERIFICATION PASS",
    "certificateDescription": "Cryptographically-signed audit attest completed without default or risk warnings for high assurance transaction: {scenario}.",
    "transactionId": "Transaction ID",
    "issuingAuthority": "Issuing Authority",
    "secureCoreVersion": "SecureCore v2.8",
    "attestationWeight": "Attestation Weight",
    "assuranceSuffix": "Assurance",
    "cryptoProtocol": "Crypto Protocol",
    "cryptoProtocolValue": "RSA-4096 / SHA-512",
    "digitalCredentialSha256Signature": "DIGITAL CREDENTIAL SHA-256 SIGNATURE",
    "copySignatureHash": "Copy signature hash",
    "copySignatureHashFailed": "Could not copy signature hash",
    "officiallyCertified": "Officially certified: 2026-07-11 06:16 UTC",
    "downloadAuditPass": "Download Audit Pass",
    "auditReportDownloaded": "Audit Report Downloaded Successfully!",
    "reportSavedDescription": "The cryptographic ledger audit report was synthesized and saved.",
    "closeAuditSummary": "Close Audit Summary"
  },
  "es": {
    "cumulativeTrust": "Confianza acumulada",
    "evidenceNodeHint": "* Haz clic en cualquier nodo para ir a la pestaña Evidencia de esa capa específica",
    "threatDeflected": "Amenaza bloqueada:",
    "exporting": "Exportando...",
    "reportExported": "Informe exportado.",
    "securityEngineVerdictReport": "INFORME DE VEREDICTO DEL MOTOR DE SEGURIDAD",
    "decisionLogicAnalysis": "Análisis de lógica de decisión: {scenario}",
    "headerDescription": "Explora la arquitectura de mitigación de riesgos y los umbrales de progresión de confianza ejecutados por el motor automático de reglas.",
    "verdictProgression": "Veredicto y progresión",
    "evidenceRules": "Evidencia y reglas",
    "digitalPassTab": "Pase digital",
    "systemVerdict": "VEREDICTO DEL SISTEMA",
    "confidenceLabel": "CONFIANZA",
    "approvedVerified": "APROBADO / VERIFICADO",
    "overallRiskIndex": "Índice de riesgo total:",
    "veryLow": "Muy bajo",
    "riskScoreDimensionBreakdown": "DESGLOSE DETALLADO DEL ÍNDICE DE RIESGO",
    "riskVectorsDescription": "Vectores de amenaza evaluados (las puntuaciones más bajas indican perfiles más seguros)",
    "safeThreshold": "0% - 25%: UMBRAL SEGURO",
    "decisionApprovalLimit": "Límite de aprobación de decisión: 25%",
    "verificationConfidenceProgressionTrend": "TENDENCIA DE PROGRESIÓN DE CONFIANZA DE VERIFICACIÓN",
    "progressionDescription": "Modelo que muestra el crecimiento de la confianza tras cada paso de verificación correcto",
    "stepLabel": "PASO {index}",
    "layerLabel": "CAPA {index}",
    "trustGainLabel": "confianza",
    "evidenceVaultTitle": "BÓVEDA DE EVIDENCIA DIAGNÓSTICA DE LA CAPA {index}",
    "triggeredLogicBranch": "RAMA LÓGICA ACTIVADA:",
    "totalTrustGained": "Confianza acumulada:",
    "decodedCryptographicSignals": "SEÑALES CRIPTOGRÁFICAS DECODIFICADAS:",
    "consensusSealDescription": "Consenso sellado y aprobado con el certificado de autoridad Identra-Relay-Vault-2026. Criterios en tiempo real satisfechos.",
    "rulesEngineEvaluationAudit": "AUDITORÍA DE EVALUACIÓN DEL MOTOR DE REGLAS",
    "rulesChecked": "Reglas revisadas",
    "selectedLayer": "Capa seleccionada",
    "ruleExplanation": "Lógica de evaluación que verifica umbrales matemáticos de autenticidad.",
    "trustWeight": "Peso de confianza",
    "highAssuranceSecurityAttestation": "CERTIFICACIÓN DE SEGURIDAD DE ALTA GARANTÍA",
    "coreSecureTrustVerdict": "VEREDICTO DE CONFIANZA SEGURA PRINCIPAL",
    "statusCompliantValid": "ESTADO: CONFORME / VÁLIDO",
    "identityVerificationPass": "PASE DE VERIFICACIÓN DE IDENTIDAD",
    "certificateDescription": "Certificación de auditoría firmada criptográficamente, completada sin fallos ni advertencias de riesgo para la transacción de alta garantía: {scenario}.",
    "transactionId": "ID de transacción",
    "issuingAuthority": "Autoridad emisora",
    "secureCoreVersion": "SecureCore v2.8",
    "attestationWeight": "Peso de certificación",
    "assuranceSuffix": "garantía",
    "cryptoProtocol": "Protocolo criptográfico",
    "cryptoProtocolValue": "RSA-4096 / SHA-512",
    "digitalCredentialSha256Signature": "FIRMA SHA-256 DE CREDENCIAL DIGITAL",
    "copySignatureHash": "Copiar hash de firma",
    "copySignatureHashFailed": "No se pudo copiar el hash de firma",
    "officiallyCertified": "Certificado oficialmente: 2026-07-11 06:16 UTC",
    "downloadAuditPass": "Descargar pase de auditoría",
    "auditReportDownloaded": "Informe de auditoría descargado correctamente.",
    "reportSavedDescription": "El informe de auditoría del libro criptográfico fue sintetizado y guardado.",
    "closeAuditSummary": "Cerrar resumen de auditoría"
  },
  "ja": {
    "cumulativeTrust": "累積信頼度",
    "evidenceNodeHint": "* 任意のノードをクリックすると、そのレイヤーの証拠タブへ移動します",
    "threatDeflected": "防御した脅威:",
    "exporting": "エクスポート中...",
    "reportExported": "レポートをエクスポートしました。",
    "securityEngineVerdictReport": "セキュリティエンジン判定レポート",
    "decisionLogicAnalysis": "判定ロジック分析: {scenario}",
    "headerDescription": "自動ルールエンジンの内部で実行されるリスク緩和アーキテクチャと信頼度進行しきい値を確認します。",
    "verdictProgression": "判定と進行",
    "evidenceRules": "証拠とルール",
    "digitalPassTab": "デジタルパス",
    "systemVerdict": "システム判定",
    "confidenceLabel": "信頼度",
    "approvedVerified": "承認済み / 検証済み",
    "overallRiskIndex": "総合リスク指数:",
    "veryLow": "非常に低い",
    "riskScoreDimensionBreakdown": "リスクスコア次元別内訳",
    "riskVectorsDescription": "評価済み脅威ベクトル (スコアが低いほど安全性が高い)",
    "safeThreshold": "0% - 25%: 安全しきい値",
    "decisionApprovalLimit": "判定承認上限: 25%",
    "verificationConfidenceProgressionTrend": "検証信頼度の進行傾向",
    "progressionDescription": "各検証ステップの成功後に信頼度が高まる様子を示すモデル",
    "stepLabel": "ステップ {index}",
    "layerLabel": "レイヤー {index}",
    "trustGainLabel": "信頼度",
    "evidenceVaultTitle": "レイヤー {index} 診断証拠ボルト",
    "triggeredLogicBranch": "発動したロジック分岐:",
    "totalTrustGained": "累積信頼度:",
    "decodedCryptographicSignals": "復号済み暗号シグナル:",
    "consensusSealDescription": "Identra-Relay-Vault-2026の権限証明書によりコンセンサスが封印され承認されました。リアルタイム基準を満たしています。",
    "rulesEngineEvaluationAudit": "ルールエンジン評価監査",
    "rulesChecked": "確認済みルール",
    "selectedLayer": "選択中のレイヤー",
    "ruleExplanation": "数学的な真正性しきい値を検証する評価ロジックです。",
    "trustWeight": "信頼重み",
    "highAssuranceSecurityAttestation": "高保証セキュリティ証明",
    "coreSecureTrustVerdict": "コアセキュア信頼判定",
    "statusCompliantValid": "ステータス: 準拠 / 有効",
    "identityVerificationPass": "本人確認パス",
    "certificateDescription": "高保証トランザクション「{scenario}」について、失敗やリスク警告なく暗号署名済み監査証明が完了しました。",
    "transactionId": "トランザクションID",
    "issuingAuthority": "発行機関",
    "secureCoreVersion": "SecureCore v2.8",
    "attestationWeight": "証明重み",
    "assuranceSuffix": "保証",
    "cryptoProtocol": "暗号プロトコル",
    "cryptoProtocolValue": "RSA-4096 / SHA-512",
    "digitalCredentialSha256Signature": "デジタル資格情報 SHA-256 署名",
    "copySignatureHash": "署名ハッシュをコピー",
    "copySignatureHashFailed": "署名ハッシュをコピーできませんでした",
    "officiallyCertified": "正式認証時刻: 2026-07-11 06:16 UTC",
    "downloadAuditPass": "監査パスをダウンロード",
    "auditReportDownloaded": "監査レポートをダウンロードしました。",
    "reportSavedDescription": "暗号台帳監査レポートが生成され保存されました。",
    "closeAuditSummary": "監査サマリーを閉じる"
  },
  "de": {
    "cumulativeTrust": "Kumuliertes Vertrauen",
    "evidenceNodeHint": "* Klicken Sie auf einen Knoten, um zum Evidenz-Tab dieser Ebene zu springen",
    "threatDeflected": "Abgewehrte Bedrohung:",
    "exporting": "Export wird erstellt...",
    "reportExported": "Bericht exportiert!",
    "securityEngineVerdictReport": "BERICHT ZUR SICHERHEITS-ENGINE-ENTSCHEIDUNG",
    "decisionLogicAnalysis": "Analyse der Entscheidungslogik: {scenario}",
    "headerDescription": "Erkunden Sie die Risikominderungsarchitektur und Vertrauensschwellen, die im Hintergrund von der automatisierten Regel-Engine ausgeführt werden.",
    "verdictProgression": "Entscheidung und Verlauf",
    "evidenceRules": "Evidenz und Regeln",
    "digitalPassTab": "Digitaler Pass",
    "systemVerdict": "SYSTEMENTSCHEIDUNG",
    "confidenceLabel": "VERTRAUEN",
    "approvedVerified": "GENEHMIGT / VERIFIZIERT",
    "overallRiskIndex": "Gesamtrisikoindex:",
    "veryLow": "Sehr niedrig",
    "riskScoreDimensionBreakdown": "AUFSCHLÜSSELUNG DER RISIKOWERTE",
    "riskVectorsDescription": "Bewertete Bedrohungsvektoren (niedrigere Werte bedeuten sicherere Profile)",
    "safeThreshold": "0% - 25%: SICHERER SCHWELLENWERT",
    "decisionApprovalLimit": "Entscheidungsgrenze für Genehmigung: 25%",
    "verificationConfidenceProgressionTrend": "VERLAUF DES VERIFIZIERUNGSVERTRAUENS",
    "progressionDescription": "Modell zur Darstellung des Vertrauenszuwachses nach jedem erfolgreichen Verifizierungsschritt",
    "stepLabel": "SCHRITT {index}",
    "layerLabel": "EBENE {index}",
    "trustGainLabel": "Vertrauen",
    "evidenceVaultTitle": "DIAGNOSE-EVIDENZ-TRESOR DER EBENE {index}",
    "triggeredLogicBranch": "AUSGELÖSTER LOGIKZWEIG:",
    "totalTrustGained": "Kumuliertes Vertrauen:",
    "decodedCryptographicSignals": "DECODIERTE KRYPTOGRAFISCHE SIGNALE:",
    "consensusSealDescription": "Konsens wurde unter dem Autoritätszertifikat Identra-Relay-Vault-2026 versiegelt und genehmigt. Echtzeitkriterien erfüllt.",
    "rulesEngineEvaluationAudit": "PRÜFUNG DER REGEL-ENGINE-BEWERTUNG",
    "rulesChecked": "Geprüfte Regeln",
    "selectedLayer": "Ausgewählte Ebene",
    "ruleExplanation": "Bewertungslogik zur Prüfung mathematischer Authentizitätsschwellen.",
    "trustWeight": "Vertrauensgewicht",
    "highAssuranceSecurityAttestation": "SICHERHEITSBESTÄTIGUNG MIT HOHER ZUSICHERUNG",
    "coreSecureTrustVerdict": "KERNENTSCHEIDUNG FÜR SICHERES VERTRAUEN",
    "statusCompliantValid": "STATUS: KONFORM / GÜLTIG",
    "identityVerificationPass": "IDENTITÄTSVERIFIZIERUNGSPASS",
    "certificateDescription": "Kryptografisch signierte Auditbestätigung ohne Ausfälle oder Risikowarnungen für die Hochsicherheitstransaktion abgeschlossen: {scenario}.",
    "transactionId": "Transaktions-ID",
    "issuingAuthority": "Ausstellende Stelle",
    "secureCoreVersion": "SecureCore v2.8",
    "attestationWeight": "Bestätigungsgewicht",
    "assuranceSuffix": "Zusicherung",
    "cryptoProtocol": "Kryptoprotokoll",
    "cryptoProtocolValue": "RSA-4096 / SHA-512",
    "digitalCredentialSha256Signature": "SHA-256-SIGNATUR DES DIGITALEN NACHWEISES",
    "copySignatureHash": "Signatur-Hash kopieren",
    "copySignatureHashFailed": "Signatur-Hash konnte nicht kopiert werden",
    "officiallyCertified": "Offiziell zertifiziert: 2026-07-11 06:16 UTC",
    "downloadAuditPass": "Audit-Pass herunterladen",
    "auditReportDownloaded": "Auditbericht erfolgreich heruntergeladen!",
    "reportSavedDescription": "Der kryptografische Ledger-Auditbericht wurde erstellt und gespeichert.",
    "closeAuditSummary": "Audit-Zusammenfassung schließen"
  },
  "vi": {
    "cumulativeTrust": "Độ tin cậy tích lũy",
    "evidenceNodeHint": "* Nhấp vào bất kỳ nút nào để chuyển đến tab Bằng chứng của lớp tương ứng",
    "threatDeflected": "Mối đe dọa đã chặn:",
    "exporting": "Đang xuất...",
    "reportExported": "Báo cáo đã được xuất!",
    "securityEngineVerdictReport": "BẢN GHI PHÁN QUYẾT BẢO MẬT",
    "decisionLogicAnalysis": "Phân tích logic quyết định: {scenario}",
    "headerDescription": "Khám phá kiến trúc giảm thiểu rủi ro và các ngưỡng tiến triển độ tin cậy được bộ máy quy tắc tự động thực thi ngầm.",
    "verdictProgression": "Phán quyết và tiến trình",
    "evidenceRules": "Bằng chứng và quy tắc",
    "digitalPassTab": "Chứng thư số",
    "systemVerdict": "PHÁN QUYẾT HỆ THỐNG",
    "confidenceLabel": "ĐỘ TIN CẬY",
    "approvedVerified": "ĐÃ PHÊ DUYỆT / ĐÃ XÁC MINH",
    "overallRiskIndex": "Tổng chỉ số rủi ro:",
    "veryLow": "Rất thấp",
    "riskScoreDimensionBreakdown": "BIỂU ĐỒ CHỈ SỐ RỦI RO CHI TIẾT",
    "riskVectorsDescription": "Các chiều phân tích rủi ro (điểm càng thấp, mức an toàn càng cao)",
    "safeThreshold": "0% - 25%: NGƯỠNG AN TOÀN",
    "decisionApprovalLimit": "Giới hạn phê duyệt quyết định: 25%",
    "verificationConfidenceProgressionTrend": "TIẾN TRÌNH ĐỘ TIN CẬY QUA TỪNG BƯỚC",
    "progressionDescription": "Mô hình thể hiện sự gia tăng độ tin cậy sau mỗi bước xác minh thành công",
    "stepLabel": "BƯỚC {index}",
    "layerLabel": "TẦNG {index}",
    "trustGainLabel": "tin cậy",
    "evidenceVaultTitle": "KHO BẰNG CHỨNG KIỂM ĐỊNH TẦNG {index}",
    "triggeredLogicBranch": "NHÁNH LOGIC ĐÃ KÍCH HOẠT:",
    "totalTrustGained": "Độ tin cậy lũy kế:",
    "decodedCryptographicSignals": "DANH SÁCH TÍN HIỆU MẬT MÃ ĐÃ GIẢI MÃ:",
    "consensusSealDescription": "Phán quyết đã được niêm phong và phê duyệt bằng chứng chỉ thẩm quyền Identra-Relay-Vault-2026. Tiêu chí thời gian thực đã đạt.",
    "rulesEngineEvaluationAudit": "KIỂM TOÁN ĐÁNH GIÁ BỘ MÁY QUY TẮC",
    "rulesChecked": "Quy tắc đã kiểm tra",
    "selectedLayer": "Tầng đang chọn",
    "ruleExplanation": "Logic đánh giá xác minh các ngưỡng tính xác thực toán học.",
    "trustWeight": "Trọng số tin cậy",
    "highAssuranceSecurityAttestation": "CHỨNG THỰC BẢO MẬT ĐỘ ĐẢM BẢO CAO",
    "coreSecureTrustVerdict": "PHÁN QUYẾT TIN CẬY LÕI BẢO MẬT",
    "statusCompliantValid": "TRẠNG THÁI: TUÂN THỦ / HỢP LỆ",
    "identityVerificationPass": "CHỨNG THƯ XÁC THỰC DANH TÍNH",
    "certificateDescription": "Chứng thực kiểm toán đã ký mật mã hoàn tất không có lỗi mặc định hoặc cảnh báo rủi ro cho giao dịch độ đảm bảo cao: {scenario}.",
    "transactionId": "Mã giao dịch",
    "issuingAuthority": "Thẩm quyền cấp",
    "secureCoreVersion": "SecureCore v2.8",
    "attestationWeight": "Trọng số chứng thực",
    "assuranceSuffix": "độ đảm bảo",
    "cryptoProtocol": "Giao thức mật mã",
    "cryptoProtocolValue": "RSA-4096 / SHA-512",
    "digitalCredentialSha256Signature": "CHỮ KÝ SHA-256 CỦA CHỨNG THƯ SỐ",
    "copySignatureHash": "Sao chép mã băm chữ ký",
    "copySignatureHashFailed": "Không thể sao chép mã băm chữ ký",
    "officiallyCertified": "Được chứng nhận chính thức lúc: 2026-07-11 06:16 UTC",
    "downloadAuditPass": "Tải chứng thư kiểm toán",
    "auditReportDownloaded": "Tải báo cáo kiểm toán thành công!",
    "reportSavedDescription": "Báo cáo kiểm toán sổ cái mật mã đã được tổng hợp và lưu.",
    "closeAuditSummary": "Đóng tóm tắt kiểm toán"
  }
} as const;

export type RuleStatus = 'PASS' | 'WARN' | 'FAIL';

export interface RuleItem {
  id: string;
  name: LocalizedText;
  weight: number;
  status: RuleStatus;
}

export interface ScenarioDecisionData {
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

export const lt = (en: string, es: string, ja: string, de: string, vi: string): LocalizedText => ({
  en,
  es,
  ja,
  de,
  vi,
});

export const VERDICT_APPROVED: any = lt('APPROVED', 'APROBADO', '承認', 'GENEHMIGT', 'THÔNG QUA');

export const RISK_LABELS: any = {
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

export const EVIDENCE_COPY: any = {
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

export const BANK_ACCOUNT_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const APPLY_JOB_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const TICKET_BOOKING_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const AIRLINES_HOTELS_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const GOVERNMENT_SERVICES_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const HEALTHCARE_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const TICKET_TRANSFER_SUMMARY_DATA: ScenarioDecisionData = {
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
};

export const SCENARIO_DATA_MAP: Record<string, ScenarioDecisionData> = {
  'bank-account': BANK_ACCOUNT_SUMMARY_DATA,
  'apply-job': APPLY_JOB_SUMMARY_DATA,
  'ticket-booking': TICKET_BOOKING_SUMMARY_DATA,
  'airlines-hotels': AIRLINES_HOTELS_SUMMARY_DATA,
  'government-services': GOVERNMENT_SERVICES_SUMMARY_DATA,
  'healthcare': HEALTHCARE_SUMMARY_DATA,
  'ticket-transfer': TICKET_TRANSFER_SUMMARY_DATA,
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

export const DEMO_SUMMARY_SCENARIO_IDS: any = Object.keys(SCENARIO_DATA_MAP);

export const getDemoSummaryDecisionData = (scenarioId: string, language: string, isSsiMode = false): DemoSummaryDecisionData => {
  const scenario = SCENARIO_DATA_MAP[scenarioId] || SCENARIO_DATA_MAP['bank-account'];

  if (scenarioId === 'apply-job') {
    if (isSsiMode) {
      return {
        overallConfidence: 100,
        overallRisk: 0,
        verdict: getSummaryLocalizedText(VERDICT_APPROVED, language),
        riskDimensions: [
          { label: getSummaryLocalizedText(RISK_LABELS.identityFraud, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.licenseForgery, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.criminalBackground, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.automationScore, language), score: 0 },
        ],
        confidenceTrend: [60, 85, 100],
        decisionLogic: getSummaryLocalizedText(lt(
          'Candidate identity was cryptographically verified via Identra eID ZKP Vault. 100% trust assurance achieved with 0% risk across all identity, credential, and background dimensions.',
          'La identidad del candidato se verificó criptográficamente mediante Identra eID ZKP Vault. 100% de confianza con 0% de riesgo.',
          '候補者の身元はIdentra eID ZKP Vault経由で暗号検証されました。100%の信頼性と0%のリスクを実現。',
          'Kandidatenidentität wurde kryptografisch über Identra eID ZKP Vault verifiziert. 100% Vertrauen mit 0% Risiko.',
          'Danh tính ứng viên đã được xác minh bằng chữ ký số mật mã ZKP-ECDSA từ Identra eID Vault. Đạt 100% độ tin cậy tuyệt đối với 0% rủi ro trên toàn bộ các chỉ số danh tính, bằng cấp và lý lịch.'
        ), language),
        rules: scenario.rules.map((rule) => ({
          id: rule.id,
          name: getSummaryLocalizedText(rule.name, language),
          weight: rule.weight,
          status: 'PASS',
        })),
      };
    } else {
      return {
        overallConfidence: 76.5,
        overallRisk: 23.5,
        verdict: getSummaryLocalizedText(VERDICT_APPROVED, language),
        riskDimensions: [
          { label: getSummaryLocalizedText(RISK_LABELS.identityFraud, language), score: 18 },
          { label: getSummaryLocalizedText(RISK_LABELS.licenseForgery, language), score: 24 },
          { label: getSummaryLocalizedText(RISK_LABELS.criminalBackground, language), score: 12 },
          { label: getSummaryLocalizedText(RISK_LABELS.automationScore, language), score: 8 },
        ],
        confidenceTrend: [40, 60, 76.5],
        decisionLogic: getSummaryLocalizedText(lt(
          'Candidate data was self-reported manually without direct ZKP cryptographic proof. Confidence score is limited to 76.5% (<80%) due to unverified primary credentials. Additional manual HR review is advised.',
          'Datos autodeclarados manualmente sin prueba ZKP directa. Puntuación de confianza del 76.5% (<80%).',
          'ZKP暗号証明なしの手動自己申告データ。信頼スコアは76.5%（80%未満）に制限されています。',
          'Manuell selbst deklarierte Daten ohne direkten ZKP-Nachweis. Vertrauenswert auf 76.5% (<80%) begrenzt.',
          'Dữ liệu ứng viên được khai báo thủ công không có bằng chứng mật mã ZKP trực tiếp từ nguồn cấp. Độ tin cậy đạt 76.5% (<80%) do dữ liệu chưa qua niêm phong chữ ký số. Đề xuất HR kiểm tra bổ sung.'
        ), language),
        rules: scenario.rules.map((rule) => ({
          id: rule.id,
          name: getSummaryLocalizedText(rule.name, language),
          weight: rule.weight,
          status: rule.status,
        })),
      };
    }
  }

  return {
    overallConfidence: scenario.overallConfidence,
    overallRisk: scenario.overallRisk,
    verdict: getSummaryLocalizedText(scenario.verdict, language),
    riskDimensions: scenario.riskDimensions.map((dimension) => ({
      label: getSummaryLocalizedText(dimension.label, language),
      score: dimension.score,
    })),
    confidenceTrend: scenario.confidenceTrend,
    decisionLogic: getSummaryLocalizedText(scenario.decisionLogic, language),
    rules: scenario.rules.map((rule) => ({
      id: rule.id,
      name: getSummaryLocalizedText(rule.name, language),
      weight: rule.weight,
      status: rule.status,
    })),
  };
};

export const getDemoSummaryStepEvidence = (scenarioId: string, language: string, isSsiMode = false): DemoSummaryStepEvidence[] => {
  const decisionData = getDemoSummaryDecisionData(scenarioId, language, isSsiMode);
  const scenario = SCENARIO_DATA_MAP[scenarioId] || SCENARIO_DATA_MAP['bank-account'];

  return decisionData.confidenceTrend.map((confidence, index) => {
    const rule = decisionData.rules[index] || decisionData.rules[decisionData.rules.length - 1];
    const signalStatus: DemoSummaryEvidenceSignal['status'] = rule.status === 'FAIL' ? 'WARN' : rule.status;
    const detailTemplate = getSummaryLocalizedText(EVIDENCE_COPY.details[index % EVIDENCE_COPY.details.length], language);

    return {
      processorNode: scenario.processors[index] || `SECURE-CORE-${String(index + 1).padStart(2, '0')}`,
      timestamp: `2026-07-11 06:${String(15 + index).padStart(2, '0')}:${index === 0 ? '32' : index === 1 ? '45' : '01'} UTC`,
      confidenceAchieved: confidence,
      riskDeflection: getSummaryLocalizedText(EVIDENCE_COPY.riskDeflections[index % EVIDENCE_COPY.riskDeflections.length], language),
      details: formatSummaryText(detailTemplate, { rule: rule.name }),
      signals: [
        {
          label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.ruleApplied, language),
          value: rule.name,
          status: signalStatus,
        },
        {
          label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.confidence, language),
          value: `${confidence}%`,
          status: 'PASS',
        },
        {
          label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.status, language),
          value: getSummaryLocalizedText(EVIDENCE_COPY.statusPass, language),
          status: 'PASS',
        },
      ],
    };
  });
};
