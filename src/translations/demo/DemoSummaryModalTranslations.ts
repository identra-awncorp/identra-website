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
    "applyJobEvidenceTitle": "EVIDENCE REVIEW - STAGE {index}",
    "applyJobProcessorLabel": "PROCESSOR",
    "applyJobStageLabel": "REVIEWED STAGE:",
    "applyJobSignalsTitle": "RECORDED EVIDENCE:",
    "applyJobEvidenceNotice": "This report records simulated checks only. The employer remains responsible for reviewing the evidence and making the hiring decision.",
    "applyJobChecksTitle": "APPLICATION EVIDENCE CHECKS",
    "applyJobRuleExplanation": "This check records how the submitted evidence was handled within the demo scope.",
    "rulesChecked": "Rules Checked",
    "selectedLayer": "Selected Layer",
    "passedStatus": "Passed",
    "reviewStatus": "Needs review",
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
    "applyJobEvidenceTitle": "REVISIÓN DE PRUEBAS - ETAPA {index}",
    "applyJobProcessorLabel": "PROCESADOR",
    "applyJobStageLabel": "ETAPA REVISADA:",
    "applyJobSignalsTitle": "PRUEBAS REGISTRADAS:",
    "applyJobEvidenceNotice": "Este informe solo registra comprobaciones simuladas. El empleador debe revisar las pruebas y tomar la decisión de contratación.",
    "applyJobChecksTitle": "COMPROBACIONES DE LA SOLICITUD",
    "applyJobRuleExplanation": "Esta comprobación registra cómo se trató la prueba aportada dentro del alcance de la demo.",
    "rulesChecked": "Reglas revisadas",
    "selectedLayer": "Capa seleccionada",
    "passedStatus": "Aprobado",
    "reviewStatus": "Requiere revisión",
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
    "applyJobEvidenceTitle": "証拠確認 - ステージ {index}",
    "applyJobProcessorLabel": "処理ノード",
    "applyJobStageLabel": "確認対象ステージ:",
    "applyJobSignalsTitle": "記録された証拠:",
    "applyJobEvidenceNotice": "このレポートはシミュレーション結果のみを記録します。証拠の確認と採用判断は雇用主が行います。",
    "applyJobChecksTitle": "応募証拠の確認",
    "applyJobRuleExplanation": "この確認は、デモの範囲内で提出された証拠をどのように扱ったかを記録します。",
    "rulesChecked": "確認済みルール",
    "selectedLayer": "選択中のレイヤー",
    "passedStatus": "確認済み",
    "reviewStatus": "要確認",
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
    "applyJobEvidenceTitle": "NACHWEISPRÜFUNG - STUFE {index}",
    "applyJobProcessorLabel": "PROZESSOR",
    "applyJobStageLabel": "GEPRÜFTE STUFE:",
    "applyJobSignalsTitle": "ERFASSTE NACHWEISE:",
    "applyJobEvidenceNotice": "Dieser Bericht dokumentiert nur simulierte Prüfungen. Der Arbeitgeber bleibt für die Nachweisprüfung und Einstellungsentscheidung verantwortlich.",
    "applyJobChecksTitle": "PRÜFUNGEN DER BEWERBUNGSNACHWEISE",
    "applyJobRuleExplanation": "Diese Prüfung dokumentiert die Verarbeitung des eingereichten Nachweises im Rahmen der Demo.",
    "rulesChecked": "Geprüfte Regeln",
    "selectedLayer": "Ausgewählte Ebene",
    "passedStatus": "Bestanden",
    "reviewStatus": "Prüfung erforderlich",
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
    "securityEngineVerdictReport": "BÁO CÁO KẾT QUẢ XÁC MINH",
    "decisionLogicAnalysis": "Báo cáo xác minh: {scenario}",
    "headerDescription": "Xem lại kết quả, bằng chứng đã sử dụng và cách hệ thống xác định trạng thái cuối cùng.",
    "verdictProgression": "Kết quả và tiến trình",
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
    "applyJobEvidenceTitle": "XEM XÉT BẰNG CHỨNG - GIAI ĐOẠN {index}",
    "applyJobProcessorLabel": "BỘ XỬ LÝ",
    "applyJobStageLabel": "GIAI ĐOẠN ĐƯỢC XEM XÉT:",
    "applyJobSignalsTitle": "BẰNG CHỨNG ĐÃ GHI NHẬN:",
    "applyJobEvidenceNotice": "Báo cáo này chỉ ghi nhận kết quả mô phỏng. Doanh nghiệp vẫn có trách nhiệm xem xét bằng chứng và đưa ra quyết định tuyển dụng.",
    "applyJobChecksTitle": "CÁC KIỂM TRA ĐỐI VỚI HỒ SƠ",
    "applyJobRuleExplanation": "Mục này ghi nhận cách bằng chứng được xử lý trong phạm vi bản demo.",
    "rulesChecked": "Quy tắc đã kiểm tra",
    "selectedLayer": "Tầng đang chọn",
    "passedStatus": "Đã kiểm tra",
    "reviewStatus": "Cần xem xét",
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
export const VERDICT_REVIEW_REQUIRED: LocalizedText = lt(
  'HR REVIEW REQUIRED',
  'REQUIERE REVISIÓN DE RR. HH.',
  '人事確認が必要',
  'PRÜFUNG DURCH HR ERFORDERLICH',
  'CẦN NHÂN SỰ XEM XÉT',
);
export const VERDICT_EVIDENCE_VERIFIED: LocalizedText = lt(
  'EVIDENCE VERIFIED',
  'PRUEBAS VERIFICADAS',
  '証拠確認済み',
  'NACHWEISE GEPRÜFT',
  'BẰNG CHỨNG ĐÃ XÁC MINH',
);

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
  statusReview: lt('Needs review', 'Requiere revisión', '要確認', 'Prüfung erforderlich', 'Cần xem xét'),
};

const APPLY_JOB_IDENTRA_EVIDENCE_DETAILS: LocalizedText[] = [
  lt(
    'The candidate-approved minimum-disclosure proof confirmed work eligibility without revealing a personal identity number.',
    'La prueba de divulgación mínima autorizada confirmó la aptitud laboral sin revelar el número de identidad personal.',
    '候補者が承認した最小開示の証拠により、個人識別番号を開示せず就労資格を確認しました。',
    'Der freigegebene Nachweis mit minimaler Offenlegung bestätigte die Arbeitsberechtigung ohne Preisgabe der persönlichen Identifikationsnummer.',
    'Bằng chứng tiết lộ tối thiểu được ứng viên cho phép đã xác nhận điều kiện làm việc mà không tiết lộ số định danh cá nhân.',
  ),
  lt(
    'Issuer DIDs, signatures, holder binding, and credential status were checked for the shared education and employment credentials.',
    'Se comprobaron los DID de los emisores, las firmas, la vinculación del titular y el estado de las credenciales académicas y laborales compartidas.',
    '共有された学歴・職歴資格情報について、発行者DID、署名、所有者バインディング、資格情報の状態を確認しました。',
    'Für die freigegebenen Bildungs- und Beschäftigungsnachweise wurden Aussteller-DIDs, Signaturen, Inhaberbindung und Status geprüft.',
    'DID của bên phát hành, chữ ký, sự ràng buộc với chủ thể và trạng thái của các thực chứng học vấn, kinh nghiệm đã được kiểm tra.',
  ),
  lt(
    'Candidate consent and the permitted screening scope were recorded. The employer must still review the screening result under its hiring policy.',
    'Se registraron el consentimiento del candidato y el alcance permitido. El empleador debe revisar el resultado según su política de contratación.',
    '候補者の同意と許可された確認範囲を記録しました。雇用主は採用方針に基づいて結果を確認する必要があります。',
    'Einwilligung und zulässiger Prüfungsumfang wurden erfasst. Der Arbeitgeber muss das Ergebnis weiterhin gemäß seiner Einstellungsrichtlinie prüfen.',
    'Sự đồng ý của ứng viên và phạm vi rà soát được phép đã được ghi nhận. Doanh nghiệp vẫn cần xem xét kết quả theo chính sách tuyển dụng.',
  ),
];

const APPLY_JOB_MANUAL_EVIDENCE_DETAILS: LocalizedText[] = [
  lt(
    'The submitted identity details were compared with a simulated response from an authorized source and require HR review.',
    'Los datos de identidad se compararon con una respuesta simulada de una fuente autorizada y requieren revisión de RR. HH.',
    '入力された本人情報を認可情報源の模擬応答と照合しました。人事担当者の確認が必要です。',
    'Die eingegebenen Identitätsdaten wurden mit einer simulierten Antwort einer autorisierten Quelle abgeglichen und erfordern eine HR-Prüfung.',
    'Thông tin định danh đã nhập được đối chiếu với kết quả giả lập từ nguồn được phép sử dụng và vẫn cần bộ phận nhân sự xem xét.',
  ),
  lt(
    'Degree information and certificate links were checked using simulated source responses; no cryptographic credential proof was supplied.',
    'La titulación y los enlaces de certificados se revisaron con respuestas simuladas; no se aportaron pruebas criptográficas de credenciales.',
    '学位情報と証明書リンクを模擬応答で確認しました。暗号学的な資格証明は提供されていません。',
    'Abschlussangaben und Zertifikatslinks wurden anhand simulierter Antworten geprüft; kryptografische Nachweise wurden nicht vorgelegt.',
    'Thông tin học vấn và đường dẫn chứng chỉ được kiểm tra bằng kết quả giả lập; ứng viên không cung cấp bằng chứng thực chứng bằng mật mã.',
  ),
  lt(
    'Candidate consent and the permitted screening scope were recorded. The simulated result remains subject to employer review.',
    'Se registraron el consentimiento y el alcance permitido. El resultado simulado queda sujeto a revisión del empleador.',
    '候補者の同意と許可された確認範囲を記録しました。模擬結果は雇用主による確認が必要です。',
    'Einwilligung und zulässiger Prüfungsumfang wurden erfasst. Das simulierte Ergebnis muss vom Arbeitgeber geprüft werden.',
    'Sự đồng ý của ứng viên và phạm vi rà soát được phép đã được ghi nhận. Kết quả giả lập vẫn cần doanh nghiệp xem xét.',
  ),
];

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
  overallConfidence: 0,
  overallRisk: 0,
  verdict: VERDICT_EVIDENCE_VERIFIED,
  riskDimensions: [
    { label: RISK_LABELS.identityFraud, score: 0 },
    { label: RISK_LABELS.licenseForgery, score: 0 },
    { label: RISK_LABELS.criminalBackground, score: 0 },
  ],
  confidenceTrend: [0, 0, 0],
  decisionLogic: lt(
    'The submitted evidence was checked across identity, credentials, and the candidate-approved background-screening scope. The employer remains responsible for the hiring decision.',
    'Las pruebas aportadas se revisaron en identidad, credenciales y el alcance de antecedentes autorizado por el candidato. El empleador sigue siendo responsable de la decisión.',
    '提出された証拠について、本人確認、資格情報、候補者が同意した経歴確認範囲を確認しました。採用判断は雇用主が行います。',
    'Die eingereichten Nachweise wurden für Identität, Qualifikationen und den freigegebenen Umfang der Hintergrundprüfung geprüft. Die Einstellungsentscheidung bleibt beim Arbeitgeber.',
    'Bằng chứng trong hồ sơ đã được kiểm tra theo ba nhóm: danh tính, chuyên môn và phạm vi lý lịch mà ứng viên đồng ý cho rà soát. Quyết định tuyển dụng vẫn thuộc về doanh nghiệp.'
  ),
  rules: [
    { id: 'RULE-WORK-ELIGIBILITY', name: lt('Work eligibility evidence check', 'Comprobación de aptitud laboral', '就労資格証拠の確認', 'Prüfung des Arbeitsberechtigungsnachweises', 'Kiểm tra bằng chứng đủ điều kiện làm việc'), weight: 0, status: 'PASS' },
    { id: 'RULE-CREDENTIAL-PROVENANCE', name: lt('Education and employment credential provenance', 'Procedencia de credenciales académicas y laborales', '学歴・職歴資格情報の出所確認', 'Herkunft von Bildungs- und Beschäftigungsnachweisen', 'Kiểm tra nguồn gốc thực chứng học vấn và kinh nghiệm'), weight: 0, status: 'PASS' },
    { id: 'RULE-BACKGROUND-CONSENT', name: lt('Consent and permitted screening scope', 'Consentimiento y alcance permitido', '同意および許可された確認範囲', 'Einwilligung und zulässiger Prüfungsumfang', 'Kiểm tra sự đồng ý và phạm vi rà soát lý lịch'), weight: 0, status: 'PASS' },
  ],
  processors: ['WORKFORCE-EVIDENCE-01', 'CREDENTIAL-PROVENANCE-02', 'CONSENT-SCOPE-03'],
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
        overallConfidence: 0,
        overallRisk: 0,
        verdict: getSummaryLocalizedText(VERDICT_EVIDENCE_VERIFIED, language),
        riskDimensions: [
          { label: getSummaryLocalizedText(RISK_LABELS.identityFraud, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.licenseForgery, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.criminalBackground, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.automationScore, language), score: 0 },
        ],
        confidenceTrend: [0, 0, 0],
        decisionLogic: getSummaryLocalizedText(lt(
          'The candidate-approved Identra presentation passed the simulated issuer, signature, holder-binding, challenge, and credential-status checks. Background-screening results remain subject to the employer review policy.',
          'La presentación de Identra autorizada por el candidato superó las comprobaciones simuladas de emisor, firma, vinculación del titular, desafío y estado. Los antecedentes siguen sujetos a la política del empleador.',
          '候補者が承認したIdentraプレゼンテーションは、発行者、署名、所有者バインディング、チャレンジ、資格情報の状態に関するシミュレーション検証を通過しました。経歴確認結果は雇用主の方針に基づき確認されます。',
          'Die vom Bewerber freigegebene Identra-Präsentation hat die simulierten Prüfungen von Aussteller, Signatur, Inhaberbindung, Challenge und Status bestanden. Hintergrundprüfungen bleiben der Arbeitgeberrichtlinie unterstellt.',
          'Bản trình bày Identra được ứng viên cho phép đã vượt qua bước kiểm tra giả lập đối với bên phát hành, chữ ký, sự ràng buộc với chủ thể, giá trị thử thách và trạng thái thực chứng. Kết quả kiểm tra lý lịch vẫn cần được xem xét theo chính sách tuyển dụng.'
        ), language),
        rules: scenario.rules.map((rule) => ({
          id: rule.id,
          name: getSummaryLocalizedText(rule.name, language),
          weight: rule.weight,
          status: rule.status,
        })),
      };
    } else {
      return {
        overallConfidence: 0,
        overallRisk: 0,
        verdict: getSummaryLocalizedText(VERDICT_REVIEW_REQUIRED, language),
        riskDimensions: [
          { label: getSummaryLocalizedText(RISK_LABELS.identityFraud, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.licenseForgery, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.criminalBackground, language), score: 0 },
          { label: getSummaryLocalizedText(RISK_LABELS.automationScore, language), score: 0 },
        ],
        confidenceTrend: [0, 0, 0],
        decisionLogic: getSummaryLocalizedText(lt(
          'The candidate entered this information manually. Registry responses and certificate links were simulated, so HR must inspect the supporting evidence before making a hiring decision.',
          'El candidato introdujo la información manualmente. Las respuestas de los registros y los enlaces se simularon, por lo que RR. HH. debe revisar las pruebas antes de decidir.',
          '候補者が情報を手動入力しました。登録簿の応答と証明書リンクはシミュレーションのため、採用判断前に人事担当者が証拠を確認する必要があります。',
          'Der Bewerber hat die Angaben manuell eingegeben. Registerantworten und Zertifikatslinks wurden simuliert; HR muss die Nachweise vor einer Entscheidung prüfen.',
          'Ứng viên tự nhập thông tin trong hồ sơ. Kết quả tra cứu và đường dẫn chứng chỉ chỉ được giả lập, vì vậy bộ phận nhân sự phải xem xét bằng chứng đi kèm trước khi đưa ra quyết định tuyển dụng.'
        ), language),
        rules: scenario.rules.map((rule) => ({
          id: rule.id,
          name: getSummaryLocalizedText(rule.name, language),
          weight: rule.weight,
          status: 'WARN',
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
    const applyJobDetails = isSsiMode
      ? APPLY_JOB_IDENTRA_EVIDENCE_DETAILS
      : APPLY_JOB_MANUAL_EVIDENCE_DETAILS;
    const detailCopy = scenarioId === 'apply-job'
      ? applyJobDetails[index] ?? applyJobDetails[applyJobDetails.length - 1]
      : EVIDENCE_COPY.details[index % EVIDENCE_COPY.details.length];
    const detailTemplate = getSummaryLocalizedText(detailCopy, language);
    const statusValue = getSummaryLocalizedText(
      signalStatus === 'PASS' ? EVIDENCE_COPY.statusPass : EVIDENCE_COPY.statusReview,
      language,
    );
    const signals: DemoSummaryEvidenceSignal[] = [
      {
        label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.ruleApplied, language),
        value: rule.name,
        status: signalStatus,
      },
      {
        label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.status, language),
        value: statusValue,
        status: signalStatus,
      },
    ];

    if (scenarioId !== 'apply-job') {
      signals.splice(1, 0, {
        label: getSummaryLocalizedText(EVIDENCE_COPY.signalLabels.confidence, language),
        value: `${confidence}%`,
        status: 'PASS',
      });
    }

    return {
      processorNode: scenario.processors[index] || `SECURE-CORE-${String(index + 1).padStart(2, '0')}`,
      timestamp: `2026-07-11 06:${String(15 + index).padStart(2, '0')}:${index === 0 ? '32' : index === 1 ? '45' : '01'} UTC`,
      confidenceAchieved: confidence,
      riskDeflection: getSummaryLocalizedText(EVIDENCE_COPY.riskDeflections[index % EVIDENCE_COPY.riskDeflections.length], language),
      details: formatSummaryText(detailTemplate, { rule: rule.name }),
      signals,
    };
  });
};
