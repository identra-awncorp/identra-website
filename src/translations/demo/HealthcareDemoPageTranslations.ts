/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const HEALTHCARE_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "healthcare",
      "tag": "Healthcare",
      "title": "Register for healthcare access",
      "desc": "Verify patient identity, insurance coverage, and consent before clinical intake.",
      "security": "HIPAA-ready identity controls",
      "successResult": "The patient identity, insurance, and consent checks passed. Clinical intake can continue with protected data handling.",
      "steps": [
        {
          "label": "Verify patient identity",
          "action": "Check patient ID",
          "logText": "Government ID and demographic duplicate checks aligned with the patient profile."
        },
        {
          "label": "Confirm insurance coverage",
          "action": "Scan insurance card",
          "logText": "Policy status, carrier, and group numbers were verified in real time."
        },
        {
          "label": "Capture consent",
          "action": "Sign consent form",
          "logText": "Consent was signed, hashed, and stored under healthcare privacy controls."
        }
      ]
    },
    "page": {
      "backToScenarios": "Back to Scenarios",
      "liveBadge": "Live interactive demo page",
      "resetDemo": "Reset Demo",
      "clientEmulator": "Client interface emulator",
      "flowTitle": "Identity Verification",
      "coreVersion": "CORE v2.8",
      "riskLevel": "Risk Level",
      "trustScore": "Trust Score",
      "systemState": "System State",
      "safeLow": "SAFE / LOW",
      "evaluating": "EVALUATING",
      "analyzing": "ANALYZING",
      "approved": "APPROVED",
      "active": "Active",
      "pass": "Pass",
      "task": "Task: {action}",
      "underlyingChecks": "Underlying system checks",
      "transactionComplete": "TRANSACTION COMPLETE",
      "waitingInput": "WAITING FOR INPUT",
      "viewVerdict": "View Verdict",
      "runAgain": "Run Again",
      "ledgerTitle": "Secure sandbox log transactions",
      "logs": {
        "launch": "[SYSTEM] Launched live interactive demo page: {title}",
        "environment": "[ENVIRONMENT] Provisioning active frontend sandbox context...",
        "instruction": "[INSTRUCTION] Follow interactive tasks in the left panel to trigger identity verification.",
        "reset": "[SYSTEM] Reset interactive demo page: {title}",
        "resetInstruction": "[INSTRUCTION] Follow tasks in the left panel to trigger identity verification.",
        "completedLayer": "Completed verification layer: {label}",
        "nextTask": "Next task: {action}",
        "allPassed": "All identity verification stages passed successfully!",
        "sealed": "Cryptographic verification credentials signed and sealed."
      },
      "subChecks": {
        "healthcare": [
          [
            "Government ID Photo Match",
            "Demographic Duplicate Scan",
            "Clinical Profile Alignment"
          ],
          [
            "Policy Active History Check",
            "Group and Carrier Number Match",
            "Real-time Insurance OCR Read"
          ],
          [
            "HIPAA RSA-2048 Key Encryption",
            "Interactive Signature Capture",
            "Consent Attestation Hash"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "CareFlow Onboarding Desk",
      "hipaaCompliant": "HIPAA Compliant",
      "step1Description": "Step 1: Patient matching check. Identra verifies legal identity to prevent duplicate clinical registration records.",
      "patientLegalName": "Patient Legal Name",
      "medicalSecurityNumber": "Medical Security Number",
      "validPatientNameError": "Please enter a valid patient name!",
      "verifyPatientIdentity": "Verify Patient Identity",
      "step2Description": "Step 2: Insurance Card OCR scan. The system will automatically parse policy number and group details.",
      "blueShieldPremium": "Blue Shield Premium",
      "policyLabel": "Policy:",
      "groupLabel": "Group:",
      "analyzeInsuranceCardOcr": "Analyze Insurance Card OCR",
      "step3Description": "Step 3: HIPAA privacy consent agreement. Confirm secure medical release parameters legally.",
      "consentDescription": "I hereby grant authorization to CareFlow to parse and hold my healthcare record details under full clinical privacy protection guidelines mandated by federal HIPAA laws.",
      "consentCheckbox": "I consent to privacy terms",
      "sealHipaaConsentForm": "Seal HIPAA Consent Form",
      "patientPortalVerified": "Patient Portal Verified!",
      "successDescription": "Patient insurance matched, digital medical files secured, and digital clinic check-in pass issued.",
      "digitalPass": "CareFlow Digital Pass",
      "insuranceVerifiedActive": "Insurance: Verified Active",
      "hipaaSecureFooter": "HIPAA compliant encryption and secure card OCR"
    },
    "logs": {
      "vettingClinicalRecords": "Vetting clinical database records for patient: \"{name}\"",
      "patientRegistryClear": "Patient records registry clear. No duplicate indexes detected for \"{name}\". Match validated.",
      "runningInsuranceOcr": "Running Optical Character Recognition (OCR) over insurance layout...",
      "insuranceScanVerified": "Insurance scan verified: PolicyID=\"{policyId}\", GroupID=\"{groupId}\", carrier=\"Blue Shield Premium\", active=TRUE",
      "consentRequired": "Please check the consent checkbox to continue.",
      "submittingHipaaAgreement": "Submitting legal HIPAA privacy agreement...",
      "hipaaAgreementVerified": "HIPAA agreement verified. Cryptographic timestamp signed and bound to patient profile."
    }
  },
  "es": {
    "meta": {
      "id": "healthcare",
      "tag": "Salud",
      "title": "Registrarse para acceso sanitario",
      "desc": "Verifica identidad del paciente, cobertura de seguro y consentimiento antes de la admisión clínica.",
      "security": "Controles de identidad preparados para HIPAA",
      "successResult": "Identidad, seguro y consentimiento del paciente fueron aprobados. La admisión clínica puede continuar con datos protegidos.",
      "steps": [
        {
          "label": "Verificar identidad del paciente",
          "action": "Comprobar ID del paciente",
          "logText": "El ID gubernamental y la revisión de duplicados demográficos coincidieron con el perfil."
        },
        {
          "label": "Confirmar cobertura de seguro",
          "action": "Escanear tarjeta de seguro",
          "logText": "Estado de póliza, aseguradora y número de grupo fueron verificados en tiempo real."
        },
        {
          "label": "Capturar consentimiento",
          "action": "Firmar formulario de consentimiento",
          "logText": "El consentimiento fue firmado, convertido a hash y guardado bajo controles de privacidad sanitaria."
        }
      ]
    },
    "page": {
      "backToScenarios": "Volver a escenarios",
      "liveBadge": "Página demo interactiva en vivo",
      "resetDemo": "Reiniciar demo",
      "clientEmulator": "Emulador de interfaz del cliente",
      "flowTitle": "Verificación de identidad",
      "coreVersion": "CORE v2.8",
      "riskLevel": "Nivel de riesgo",
      "trustScore": "Puntuación de confianza",
      "systemState": "Estado del sistema",
      "safeLow": "SEGURO / BAJO",
      "evaluating": "EVALUANDO",
      "analyzing": "ANALIZANDO",
      "approved": "APROBADO",
      "active": "Activo",
      "pass": "Aprobado",
      "task": "Tarea: {action}",
      "underlyingChecks": "Comprobaciones internas del sistema",
      "transactionComplete": "TRANSACCIÓN COMPLETA",
      "waitingInput": "ESPERANDO ENTRADA",
      "viewVerdict": "Ver dictamen",
      "runAgain": "Ejecutar de nuevo",
      "ledgerTitle": "Transacciones del registro seguro del sandbox",
      "logs": {
        "launch": "[SYSTEM] Página demo interactiva iniciada: {title}",
        "environment": "[ENVIRONMENT] Preparando el contexto activo de interfaz simulada...",
        "instruction": "[INSTRUCTION] Sigue las tareas del panel izquierdo para activar la verificación de identidad.",
        "reset": "[SYSTEM] Página demo interactiva reiniciada: {title}",
        "resetInstruction": "[INSTRUCTION] Sigue las tareas del panel izquierdo para iniciar de nuevo la verificación.",
        "completedLayer": "Capa de verificación completada: {label}",
        "nextTask": "Siguiente tarea: {action}",
        "allPassed": "Todas las etapas de verificación de identidad se aprobaron correctamente.",
        "sealed": "Credenciales criptográficas de verificación firmadas y selladas."
      },
      "subChecks": {
        "healthcare": [
          [
            "Coincidencia de foto de ID gubernamental",
            "Escaneo de duplicados demográficos",
            "Alineación de perfil clínico"
          ],
          [
            "Revisión de póliza activa",
            "Coincidencia de número de grupo y aseguradora",
            "Lectura OCR de seguro en tiempo real"
          ],
          [
            "Cifrado de clave HIPAA RSA-2048",
            "Captura interactiva de firma",
            "Hash de certificación de consentimiento"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Mesa de incorporación de CareFlow",
      "hipaaCompliant": "Compatible con HIPAA",
      "step1Description": "Paso 1: Verificación de coincidencia del paciente. Identra valida la identidad legal para evitar registros clínicos duplicados.",
      "patientLegalName": "Nombre legal del paciente",
      "medicalSecurityNumber": "Número de seguridad médica",
      "validPatientNameError": "Introduce un nombre de paciente válido.",
      "verifyPatientIdentity": "Verificar identidad del paciente",
      "step2Description": "Paso 2: Escaneo OCR de la tarjeta de seguro. El sistema extrae automáticamente el número de póliza y los detalles del grupo.",
      "blueShieldPremium": "Blue Shield Premium",
      "policyLabel": "Póliza:",
      "groupLabel": "Grupo:",
      "analyzeInsuranceCardOcr": "Analizar OCR de tarjeta de seguro",
      "step3Description": "Paso 3: Consentimiento de privacidad HIPAA. Confirma legalmente los parámetros de divulgación médica segura.",
      "consentDescription": "Autorizo a CareFlow a procesar y conservar los detalles de mi expediente médico bajo las normas completas de privacidad clínica exigidas por HIPAA.",
      "consentCheckbox": "Acepto los términos de privacidad",
      "sealHipaaConsentForm": "Sellar consentimiento HIPAA",
      "patientPortalVerified": "Portal del paciente verificado.",
      "successDescription": "El seguro del paciente fue validado, los archivos médicos digitales quedaron protegidos y se emitió el pase de registro clínico digital.",
      "digitalPass": "Pase digital de CareFlow",
      "insuranceVerifiedActive": "Seguro: verificado activo",
      "hipaaSecureFooter": "Cifrado compatible con HIPAA y OCR seguro de tarjetas"
    },
    "logs": {
      "vettingClinicalRecords": "Revisando registros clínicos para el paciente: \"{name}\"",
      "patientRegistryClear": "Registro de paciente limpio. No se detectaron índices duplicados para \"{name}\". Coincidencia validada.",
      "runningInsuranceOcr": "Ejecutando OCR sobre el diseño de la tarjeta de seguro...",
      "insuranceScanVerified": "Escaneo de seguro verificado: PolicyID=\"{policyId}\", GroupID=\"{groupId}\", aseguradora=\"Blue Shield Premium\", active=TRUE",
      "consentRequired": "Marca la casilla de consentimiento para continuar.",
      "submittingHipaaAgreement": "Enviando acuerdo legal de privacidad HIPAA...",
      "hipaaAgreementVerified": "Acuerdo HIPAA verificado. Marca temporal criptográfica firmada y vinculada al perfil del paciente."
    }
  },
  "ja": {
    "meta": {
      "id": "healthcare",
      "tag": "医療",
      "title": "医療アクセスに登録",
      "desc": "臨床受付前に、患者本人確認、保険適用、同意を確認します。",
      "security": "HIPAA対応の本人確認制御",
      "successResult": "患者ID、保険、同意チェックに合格しました。保護されたデータ処理で臨床受付を継続できます。",
      "steps": [
        {
          "label": "患者本人確認",
          "action": "患者IDを確認",
          "logText": "政府発行IDと人口統計上の重複確認が患者プロフィールと一致しました。"
        },
        {
          "label": "保険適用を確認",
          "action": "保険カードをスキャン",
          "logText": "契約状態、保険会社、グループ番号をリアルタイムで確認しました。"
        },
        {
          "label": "同意を取得",
          "action": "同意書に署名",
          "logText": "同意は署名、ハッシュ化され、医療プライバシー制御下で保存されました。"
        }
      ]
    },
    "page": {
      "backToScenarios": "シナリオ一覧に戻る",
      "liveBadge": "ライブインタラクティブデモページ",
      "resetDemo": "デモをリセット",
      "clientEmulator": "クライアント画面エミュレーター",
      "flowTitle": "本人確認",
      "coreVersion": "CORE v2.8",
      "riskLevel": "リスクレベル",
      "trustScore": "信頼スコア",
      "systemState": "システム状態",
      "safeLow": "安全 / 低",
      "evaluating": "評価中",
      "analyzing": "分析中",
      "approved": "承認済み",
      "active": "実行中",
      "pass": "合格",
      "task": "タスク: {action}",
      "underlyingChecks": "基盤システムチェック",
      "transactionComplete": "取引完了",
      "waitingInput": "入力待機中",
      "viewVerdict": "判定を見る",
      "runAgain": "もう一度実行",
      "ledgerTitle": "安全なSandboxログ取引",
      "logs": {
        "launch": "[SYSTEM] ライブインタラクティブデモを起動しました: {title}",
        "environment": "[ENVIRONMENT] アクティブなフロントエンドSandbox環境を準備中...",
        "instruction": "[INSTRUCTION] 左側パネルのタスクを実行して本人確認を開始してください。",
        "reset": "[SYSTEM] インタラクティブデモをリセットしました: {title}",
        "resetInstruction": "[INSTRUCTION] 左側パネルのタスクを実行して本人確認を再開してください。",
        "completedLayer": "検証レイヤー完了: {label}",
        "nextTask": "次のタスク: {action}",
        "allPassed": "すべての本人確認ステージに合格しました。",
        "sealed": "暗号化された検証資格情報が署名され、封印されました。"
      },
      "subChecks": {
        "healthcare": [
          [
            "政府発行ID写真照合",
            "人口統計重複スキャン",
            "臨床プロフィール整合"
          ],
          [
            "有効な保険履歴確認",
            "グループ番号と保険者番号の照合",
            "保険OCRリアルタイム読み取り"
          ],
          [
            "HIPAA RSA-2048鍵暗号化",
            "インタラクティブ署名取得",
            "同意証明ハッシュ"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "CareFlow オンボーディングデスク",
      "hipaaCompliant": "HIPAA準拠",
      "step1Description": "ステップ1: 患者照合確認。Identraが法的IDを確認し、臨床登録の重複を防ぎます。",
      "patientLegalName": "患者の法的氏名",
      "medicalSecurityNumber": "医療セキュリティ番号",
      "validPatientNameError": "有効な患者名を入力してください。",
      "verifyPatientIdentity": "患者IDを確認",
      "step2Description": "ステップ2: 保険カードOCRスキャン。システムが保険証番号とグループ情報を自動的に抽出します。",
      "blueShieldPremium": "Blue Shield Premium",
      "policyLabel": "保険証番号:",
      "groupLabel": "グループ:",
      "analyzeInsuranceCardOcr": "保険カードOCRを分析",
      "step3Description": "ステップ3: HIPAAプライバシー同意。安全な医療情報開示条件を法的に確認します。",
      "consentDescription": "私は、HIPAAで義務付けられた臨床プライバシー保護ガイドラインに従い、CareFlowが私の医療記録情報を処理・保持することを許可します。",
      "consentCheckbox": "プライバシー条件に同意します",
      "sealHipaaConsentForm": "HIPAA同意書を確定",
      "patientPortalVerified": "患者ポータルが確認されました。",
      "successDescription": "患者保険が照合され、デジタル医療ファイルが保護され、デジタル診療チェックインパスが発行されました。",
      "digitalPass": "CareFlow デジタルパス",
      "insuranceVerifiedActive": "保険: 有効確認済み",
      "hipaaSecureFooter": "HIPAA準拠の暗号化と安全なカードOCR"
    },
    "logs": {
      "vettingClinicalRecords": "患者 \"{name}\" の臨床データベース記録を審査中",
      "patientRegistryClear": "患者記録レジストリはクリーンです。\"{name}\" の重複索引は検出されませんでした。",
      "runningInsuranceOcr": "保険カードレイアウトにOCRを実行中...",
      "insuranceScanVerified": "保険スキャンを検証しました: PolicyID=\"{policyId}\", GroupID=\"{groupId}\", carrier=\"Blue Shield Premium\", active=TRUE",
      "consentRequired": "続行するには同意チェックボックスを選択してください。",
      "submittingHipaaAgreement": "HIPAAプライバシー同意書を提出中...",
      "hipaaAgreementVerified": "HIPAA同意書を検証しました。暗号タイムスタンプを署名し、患者プロフィールに紐付けました。"
    }
  },
  "de": {
    "meta": {
      "id": "healthcare",
      "tag": "Gesundheit",
      "title": "Für Gesundheitszugang registrieren",
      "desc": "Verifizieren Sie Patientenidentität, Versicherungsschutz und Einwilligung vor der klinischen Aufnahme.",
      "security": "HIPAA-fähige Identitätskontrollen",
      "successResult": "Patientenidentität, Versicherung und Einwilligung wurden bestätigt. Die klinische Aufnahme kann mit geschützter Datenverarbeitung fortgesetzt werden.",
      "steps": [
        {
          "label": "Patientenidentität verifizieren",
          "action": "Patienten-ID prüfen",
          "logText": "Staatliche ID und demografische Dublettenprüfung passten zum Patientenprofil."
        },
        {
          "label": "Versicherungsschutz bestätigen",
          "action": "Versicherungskarte scannen",
          "logText": "Policenstatus, Versicherer und Gruppennummer wurden in Echtzeit geprüft."
        },
        {
          "label": "Einwilligung erfassen",
          "action": "Einwilligungsformular unterschreiben",
          "logText": "Die Einwilligung wurde signiert, gehasht und unter Datenschutzkontrollen gespeichert."
        }
      ]
    },
    "page": {
      "backToScenarios": "Zurück zu Szenarien",
      "liveBadge": "Live-interaktive Demo-Seite",
      "resetDemo": "Demo zurücksetzen",
      "clientEmulator": "Emulator der Kundenoberfläche",
      "flowTitle": "Identitätsverifizierung",
      "coreVersion": "CORE v2.8",
      "riskLevel": "Risikostufe",
      "trustScore": "Vertrauensscore",
      "systemState": "Systemstatus",
      "safeLow": "SICHER / NIEDRIG",
      "evaluating": "BEWERTUNG",
      "analyzing": "ANALYSE",
      "approved": "GENEHMIGT",
      "active": "Aktiv",
      "pass": "Bestanden",
      "task": "Aufgabe: {action}",
      "underlyingChecks": "Interne Systemprüfungen",
      "transactionComplete": "TRANSAKTION ABGESCHLOSSEN",
      "waitingInput": "WARTET AUF EINGABE",
      "viewVerdict": "Urteil ansehen",
      "runAgain": "Erneut ausführen",
      "ledgerTitle": "Sichere Sandbox-Logtransaktionen",
      "logs": {
        "launch": "[SYSTEM] Live-interaktive Demo-Seite gestartet: {title}",
        "environment": "[ENVIRONMENT] Aktiver Frontend-Sandbox-Kontext wird bereitgestellt...",
        "instruction": "[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um die Identitätsverifizierung auszulösen.",
        "reset": "[SYSTEM] Interaktive Demo-Seite zurückgesetzt: {title}",
        "resetInstruction": "[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um die Verifizierung erneut zu starten.",
        "completedLayer": "Verifizierungsebene abgeschlossen: {label}",
        "nextTask": "Nächste Aufgabe: {action}",
        "allPassed": "Alle Phasen der Identitätsverifizierung wurden erfolgreich bestanden.",
        "sealed": "Kryptografische Verifizierungsnachweise wurden signiert und versiegelt."
      },
      "subChecks": {
        "healthcare": [
          [
            "Fotoabgleich mit staatlicher ID",
            "Demografischer Dublettenscan",
            "Abgleich des klinischen Profils"
          ],
          [
            "Prüfung aktiver Policenhistorie",
            "Abgleich von Gruppen- und Versicherernummer",
            "Echtzeit-OCR der Versicherung"
          ],
          [
            "HIPAA RSA-2048-Schlüsselverschlüsselung",
            "Interaktive Signaturerfassung",
            "Hash des Einwilligungsnachweises"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "CareFlow Onboarding-Desk",
      "hipaaCompliant": "HIPAA-konform",
      "step1Description": "Schritt 1: Patientenabgleich. Identra verifiziert die rechtliche Identität, um doppelte klinische Registrierungen zu vermeiden.",
      "patientLegalName": "Rechtlicher Name des Patienten",
      "medicalSecurityNumber": "Medizinische Sicherheitsnummer",
      "validPatientNameError": "Bitte geben Sie einen gültigen Patientennamen ein.",
      "verifyPatientIdentity": "Patientenidentität verifizieren",
      "step2Description": "Schritt 2: OCR-Scan der Versicherungskarte. Das System liest Versicherungsnummer und Gruppendetails automatisch aus.",
      "blueShieldPremium": "Blue Shield Premium",
      "policyLabel": "Police:",
      "groupLabel": "Gruppe:",
      "analyzeInsuranceCardOcr": "Versicherungskarten-OCR analysieren",
      "step3Description": "Schritt 3: HIPAA-Datenschutzeinwilligung. Bestätigen Sie die sicheren medizinischen Freigabeparameter rechtsverbindlich.",
      "consentDescription": "Ich ermächtige CareFlow, meine Gesundheitsdaten gemäß den von HIPAA vorgeschriebenen klinischen Datenschutzrichtlinien zu verarbeiten und aufzubewahren.",
      "consentCheckbox": "Ich stimme den Datenschutzbedingungen zu",
      "sealHipaaConsentForm": "HIPAA-Einwilligung versiegeln",
      "patientPortalVerified": "Patientenportal verifiziert!",
      "successDescription": "Die Patientenversicherung wurde abgeglichen, digitale medizinische Dateien wurden gesichert und der digitale Klinik-Check-in-Pass wurde ausgestellt.",
      "digitalPass": "CareFlow Digitalpass",
      "insuranceVerifiedActive": "Versicherung: aktiv verifiziert",
      "hipaaSecureFooter": "HIPAA-konforme Verschlüsselung und sichere Karten-OCR"
    },
    "logs": {
      "vettingClinicalRecords": "Klinische Datenbankeinträge für Patient \"{name}\" werden geprüft",
      "patientRegistryClear": "Patientenregister ist sauber. Keine doppelten Indizes für \"{name}\" gefunden. Abgleich validiert.",
      "runningInsuranceOcr": "Optische Zeichenerkennung (OCR) für Versicherungslayout wird ausgeführt...",
      "insuranceScanVerified": "Versicherungsscan verifiziert: PolicyID=\"{policyId}\", GroupID=\"{groupId}\", Anbieter=\"Blue Shield Premium\", active=TRUE",
      "consentRequired": "Bitte aktivieren Sie die Einwilligungscheckbox, um fortzufahren.",
      "submittingHipaaAgreement": "Rechtliche HIPAA-Datenschutzerklärung wird übermittelt...",
      "hipaaAgreementVerified": "HIPAA-Vereinbarung verifiziert. Kryptografischer Zeitstempel signiert und mit Patientenprofil verknüpft."
    }
  },
  "vi": {
    "meta": {
      "id": "healthcare",
      "tag": "Y tế",
      "title": "Đăng ký truy cập dịch vụ y tế",
      "desc": "Xác minh danh tính bệnh nhân, bảo hiểm và sự đồng ý trước khi tiếp nhận lâm sàng.",
      "security": "Kiểm soát danh tính sẵn sàng cho HIPAA",
      "successResult": "Danh tính bệnh nhân, bảo hiểm và sự đồng ý đã đạt kiểm tra. Quy trình tiếp nhận lâm sàng có thể tiếp tục với xử lý dữ liệu được bảo vệ.",
      "steps": [
        {
          "label": "Xác minh danh tính bệnh nhân",
          "action": "Kiểm tra ID bệnh nhân",
          "logText": "ID chính phủ và kiểm tra trùng lặp nhân khẩu học khớp với hồ sơ bệnh nhân."
        },
        {
          "label": "Xác nhận bảo hiểm",
          "action": "Quét thẻ bảo hiểm",
          "logText": "Trạng thái hợp đồng, nhà bảo hiểm và số nhóm đã được xác minh theo thời gian thực."
        },
        {
          "label": "Thu thập sự đồng ý",
          "action": "Ký biểu mẫu đồng ý",
          "logText": "Sự đồng ý đã được ký, băm và lưu trữ theo kiểm soát quyền riêng tư y tế."
        }
      ]
    },
    "page": {
      "backToScenarios": "Quay lại danh sách kịch bản",
      "liveBadge": "Trang demo tương tác trực tiếp",
      "resetDemo": "Đặt lại demo",
      "clientEmulator": "Mô phỏng giao diện khách hàng",
      "flowTitle": "Xác minh danh tính",
      "coreVersion": "CORE v2.8",
      "riskLevel": "Mức rủi ro",
      "trustScore": "Điểm tin cậy",
      "systemState": "Trạng thái hệ thống",
      "safeLow": "AN TOÀN / THẤP",
      "evaluating": "ĐANG ĐÁNH GIÁ",
      "analyzing": "ĐANG PHÂN TÍCH",
      "approved": "ĐÃ PHÊ DUYỆT",
      "active": "Đang chạy",
      "pass": "Đạt",
      "task": "Nhiệm vụ: {action}",
      "underlyingChecks": "Mô-đun kiểm tra chuyên sâu",
      "transactionComplete": "GIAO DỊCH HOÀN TẤT",
      "waitingInput": "ĐANG CHỜ TƯƠNG TÁC",
      "viewVerdict": "Xem kết luận",
      "runAgain": "Chạy lại",
      "ledgerTitle": "Giao dịch nhật ký sandbox bảo mật",
      "logs": {
        "launch": "[SYSTEM] Đã khởi chạy trang demo tương tác trực tiếp: {title}",
        "environment": "[ENVIRONMENT] Đang thiết lập ngữ cảnh giao diện mô phỏng...",
        "instruction": "[INSTRUCTION] Thực hiện tác vụ ở khung bên trái để kích hoạt xác minh danh tính.",
        "reset": "[SYSTEM] Đã đặt lại trang demo tương tác: {title}",
        "resetInstruction": "[INSTRUCTION] Thực hiện tác vụ ở khung bên trái để bắt đầu lại.",
        "completedLayer": "Hoàn tất lớp xác minh: {label}",
        "nextTask": "Nhiệm vụ tiếp theo: {action}",
        "allPassed": "Tất cả các giai đoạn xác minh danh tính đã được phê duyệt thành công.",
        "sealed": "Thông tin xác thực mã hóa đã được ký và niêm phong."
      },
      "subChecks": {
        "healthcare": [
          [
            "Khớp ảnh ID do chính phủ cấp",
            "Quét trùng lặp nhân khẩu học",
            "Căn khớp hồ sơ lâm sàng"
          ],
          [
            "Kiểm tra lịch sử hiệu lực hợp đồng",
            "Khớp số nhóm và nhà bảo hiểm",
            "Đọc OCR bảo hiểm theo thời gian thực"
          ],
          [
            "Mã hóa khóa HIPAA RSA-2048",
            "Thu thập chữ ký tương tác",
            "Băm chứng nhận đồng ý"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Bàn tiếp nhận CareFlow",
      "hipaaCompliant": "Tuân thủ HIPAA",
      "step1Description": "Bước 1: Kiểm tra đối chiếu bệnh nhân. Identra xác minh định danh pháp lý để ngăn hồ sơ lâm sàng bị đăng ký trùng.",
      "patientLegalName": "Tên pháp lý của bệnh nhân",
      "medicalSecurityNumber": "Mã bảo mật y tế",
      "validPatientNameError": "Vui lòng nhập tên bệnh nhân hợp lệ.",
      "verifyPatientIdentity": "Xác minh định danh bệnh nhân",
      "step2Description": "Bước 2: Quét OCR thẻ bảo hiểm. Hệ thống sẽ tự động trích xuất số hợp đồng và thông tin nhóm.",
      "blueShieldPremium": "Blue Shield Premium",
      "policyLabel": "Hợp đồng:",
      "groupLabel": "Nhóm:",
      "analyzeInsuranceCardOcr": "Phân tích OCR thẻ bảo hiểm",
      "step3Description": "Bước 3: Thỏa thuận quyền riêng tư HIPAA. Xác nhận hợp pháp các tham số chia sẻ hồ sơ y tế an toàn.",
      "consentDescription": "Tôi cho phép CareFlow xử lý và lưu giữ thông tin hồ sơ y tế của tôi theo đầy đủ các hướng dẫn bảo vệ quyền riêng tư lâm sàng do HIPAA quy định.",
      "consentCheckbox": "Tôi đồng ý với điều khoản quyền riêng tư",
      "sealHipaaConsentForm": "Niêm phong cam kết HIPAA",
      "patientPortalVerified": "Cổng bệnh nhân đã được xác minh!",
      "successDescription": "Bảo hiểm của bệnh nhân đã được đối chiếu, hồ sơ y tế số đã được bảo mật và thẻ check-in phòng khám số đã được phát hành.",
      "digitalPass": "Thẻ số CareFlow",
      "insuranceVerifiedActive": "Bảo hiểm: đã xác minh còn hiệu lực",
      "hipaaSecureFooter": "Mã hóa tuân thủ HIPAA và OCR thẻ bảo mật"
    },
    "logs": {
      "vettingClinicalRecords": "Đang rà soát hồ sơ cơ sở dữ liệu y khoa cho bệnh nhân: \"{name}\"",
      "patientRegistryClear": "Sổ hồ sơ bệnh nhân sạch. Không phát hiện chỉ mục trùng lặp cho \"{name}\". Đã xác thực.",
      "runningInsuranceOcr": "Đang chạy OCR trên bố cục thẻ bảo hiểm...",
      "insuranceScanVerified": "Quét bảo hiểm đã xác minh: PolicyID=\"{policyId}\", GroupID=\"{groupId}\", nhà cung cấp=\"Blue Shield Premium\", active=TRUE",
      "consentRequired": "Vui lòng chọn ô đồng ý để tiếp tục.",
      "submittingHipaaAgreement": "Đang gửi thỏa thuận quyền riêng tư HIPAA hợp lệ...",
      "hipaaAgreementVerified": "Thỏa thuận HIPAA đã xác minh. Mốc thời gian mật mã đã ký và liên kết với hồ sơ bệnh nhân."
    }
  }
} as const;
