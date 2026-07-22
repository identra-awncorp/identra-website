/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GOVERNMENT_SERVICES_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "government-services",
      "tag": "Public sector",
      "title": "Access government services",
      "desc": "Confirm citizen identity, residency, and document eligibility for a digital public service.",
      "security": "Registry checks + residency proof",
      "successResult": "Citizen identity and residency proof were verified. The service request can be issued securely.",
      "steps": [
        {
          "label": "Search population registry",
          "action": "Check citizen record",
          "logText": "Population registry and birth index records returned a consistent citizen profile."
        },
        {
          "label": "Validate residency proof",
          "action": "Check residency evidence",
          "logText": "Postal, utility, and geographic signals confirmed residency."
        },
        {
          "label": "Issue secure credential",
          "action": "Create digital certificate",
          "logText": "A one-time document credential was bound and sealed cryptographically."
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
      "applyJobRiskTrusted": "FULLY TRUSTED",
      "applyJobRiskNeedsReview": "NEEDS REVIEW",
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
        "government-services": [
          [
            "National Population DB Search",
            "Legal Birth Index Verification",
            "Citizen Record Extraction"
          ],
          [
            "Postal Utility History Scan",
            "Geographical Spatial Validation",
            "Residency Proof Confirmation"
          ],
          [
            "RSA Private Key Generation",
            "One-time Document Binding",
            "Cryptographic Seal Stamp"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "National Citizen Portal",
      "badge": "GovPortal Secure",
      "step1Description": "Step 1: Query national identity database archives. Pull registered voter registration details.",
      "citizenLegalName": "Citizen Legal Name",
      "nationalRegistrarCard": "National Registrar Card",
      "checkCivilRegistries": "Check Civil registries",
      "step2Description": "Step 2: Legal address verification. Identra matches physical residence against utility history and postcode databases.",
      "physicalResidentialAddress": "Physical Residential Address",
      "runAddressSpatialCheck": "Run Address spatial Check",
      "step3Description": "Step 3: Secure digital signature. Draw your signature or type your name below to sign government filings.",
      "digitalSignaturePad": "Digital Signature Pad",
      "signaturePlaceholder": "Type your name to sign cryptographically",
      "signatureRequiredError": "Please sign before submitting!",
      "applyCryptographicSignature": "Apply Cryptographic Signature",
      "civicDocumentApproved": "Civic Document Approved!",
      "successDescription": "Your legal address has been confirmed and tax filings signed under full official cryptographic seal.",
      "officialCivicRecord": "Official Civic Record",
      "citizenLabel": "Citizen:",
      "addressLabel": "Address:",
      "signedLabel": "Signed:",
      "footer": "High-trust citizen profile and legal signature"
    },
    "logs": {
      "lookingUpCivilRegistry": "Looking up voter registry and civil registry indexes...",
      "citizenRecordsVerified": "Citizen identification records verified: owner=\"Alice Vance\", citizen_status=\"ELIGIBLE\"",
      "validatingPostalCoordinates": "Validating spatial coordinates with postal registry indices...",
      "postcodeMatchComplete": "Postcode match complete. utility_bill_verify=TRUE, spatial_address=\"1200 Pennsylvania Ave NW\", registry_certified=TRUE",
      "signatureRequired": "Please input a signature to seal document.",
      "sealingWithSignature": "Sealing documents with digital signature: \"{signature}\"",
      "formDigitallySigned": "Form digitally signed with SHA-256 certificate: signature_key=\"{signature}\", seal=\"OFFICIAL_STATE\""
    }
  },
  "es": {
    "meta": {
      "id": "government-services",
      "tag": "Sector público",
      "title": "Acceder a servicios gubernamentales",
      "desc": "Confirma identidad ciudadana, residencia y elegibilidad documental para un servicio público digital.",
      "security": "Registros + prueba de residencia",
      "successResult": "Se verificaron identidad ciudadana y residencia. La solicitud del servicio puede emitirse con seguridad.",
      "steps": [
        {
          "label": "Buscar registro poblacional",
          "action": "Comprobar registro ciudadano",
          "logText": "El registro poblacional y el índice de nacimiento devolvieron un perfil consistente."
        },
        {
          "label": "Validar prueba de residencia",
          "action": "Comprobar evidencia de residencia",
          "logText": "Se confirmaron señales postales, de servicios y geográficas."
        },
        {
          "label": "Emitir credencial segura",
          "action": "Crear certificado digital",
          "logText": "Una credencial documental de un solo uso quedó vinculada y sellada criptográficamente."
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
      "applyJobRiskTrusted": "CONFIANZA TOTAL",
      "applyJobRiskNeedsReview": "REQUIERE REVISIÓN",
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
        "government-services": [
          [
            "Búsqueda en base poblacional nacional",
            "Verificación de índice legal de nacimiento",
            "Extracción de registro ciudadano"
          ],
          [
            "Escaneo de historial postal y servicios",
            "Validación geoespacial",
            "Confirmación de prueba de residencia"
          ],
          [
            "Generación de clave privada RSA",
            "Vinculación documental de un solo uso",
            "Sello criptográfico"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Portal nacional ciudadano",
      "badge": "GovPortal seguro",
      "step1Description": "Paso 1: Consulta los archivos nacionales de identidad y extrae detalles del registro electoral.",
      "citizenLegalName": "Nombre legal del ciudadano",
      "nationalRegistrarCard": "Tarjeta del registro nacional",
      "checkCivilRegistries": "Consultar registros civiles",
      "step2Description": "Paso 2: Verificación de domicilio legal. Identra compara la residencia física con historial de servicios y bases postales.",
      "physicalResidentialAddress": "Dirección residencial física",
      "runAddressSpatialCheck": "Ejecutar verificación espacial de dirección",
      "step3Description": "Paso 3: Firma digital segura. Dibuja tu firma o escribe tu nombre para firmar trámites gubernamentales.",
      "digitalSignaturePad": "Panel de firma digital",
      "signaturePlaceholder": "Escribe tu nombre para firmar criptográficamente",
      "signatureRequiredError": "Firma antes de enviar.",
      "applyCryptographicSignature": "Aplicar firma criptográfica",
      "civicDocumentApproved": "Documento cívico aprobado.",
      "successDescription": "Tu dirección legal fue confirmada y las declaraciones fiscales quedaron firmadas con sello criptográfico oficial.",
      "officialCivicRecord": "Registro cívico oficial",
      "citizenLabel": "Ciudadano:",
      "addressLabel": "Dirección:",
      "signedLabel": "Firmado:",
      "footer": "Perfil ciudadano de alta confianza y firma legal"
    },
    "logs": {
      "lookingUpCivilRegistry": "Consultando registros electorales e índices civiles...",
      "citizenRecordsVerified": "Registros de identificación ciudadana verificados: owner=\"Alice Vance\", citizen_status=\"ELEGIBLE\"",
      "validatingPostalCoordinates": "Validando coordenadas espaciales con índices postales...",
      "postcodeMatchComplete": "Coincidencia postal completada. utility_bill_verify=TRUE, spatial_address=\"1200 Pennsylvania Ave NW\", registry_certified=TRUE",
      "signatureRequired": "Ingresa una firma para sellar el documento.",
      "sealingWithSignature": "Sellando documentos con firma digital: \"{signature}\"",
      "formDigitallySigned": "Formulario firmado digitalmente con certificado SHA-256: signature_key=\"{signature}\", seal=\"OFFICIAL_STATE\""
    }
  },
  "ja": {
    "meta": {
      "id": "government-services",
      "tag": "公共部門",
      "title": "行政サービスへアクセス",
      "desc": "デジタル行政サービスのために、市民ID、居住証明、書類適格性を確認します。",
      "security": "レジストリ確認 + 居住証明",
      "successResult": "市民IDと居住証明が検証されました。サービス申請を安全に発行できます。",
      "steps": [
        {
          "label": "住民レジストリを検索",
          "action": "市民記録を確認",
          "logText": "住民レジストリと出生インデックスから一貫した市民プロフィールが返りました。"
        },
        {
          "label": "居住証明を検証",
          "action": "居住証拠を確認",
          "logText": "郵便、公共料金、地理シグナルで居住を確認しました。"
        },
        {
          "label": "安全な資格情報を発行",
          "action": "デジタル証明書を作成",
          "logText": "一回限りの書類資格情報を暗号的に結合し封印しました。"
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
      "applyJobRiskTrusted": "完全信頼",
      "applyJobRiskNeedsReview": "追加確認が必要",
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
        "government-services": [
          [
            "国民人口DB検索",
            "法的出生インデックス検証",
            "市民記録抽出"
          ],
          [
            "郵便・公共料金履歴スキャン",
            "地理空間検証",
            "居住証明確認"
          ],
          [
            "RSA秘密鍵生成",
            "一回限りの書類バインド",
            "暗号シールスタンプ"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "国民ポータル",
      "badge": "GovPortal セキュア",
      "step1Description": "ステップ1: 国民IDデータベースのアーカイブを照会し、有権者登録情報を取得します。",
      "citizenLegalName": "市民の法的氏名",
      "nationalRegistrarCard": "国家登録カード",
      "checkCivilRegistries": "市民登録を確認",
      "step2Description": "ステップ2: 法的住所確認。Identraが居住住所を公共料金履歴と郵便番号データベースに照合します。",
      "physicalResidentialAddress": "居住地住所",
      "runAddressSpatialCheck": "住所空間確認を実行",
      "step3Description": "ステップ3: 安全なデジタル署名。署名を描くか氏名を入力して政府書類に署名します。",
      "digitalSignaturePad": "デジタル署名パッド",
      "signaturePlaceholder": "暗号署名する氏名を入力",
      "signatureRequiredError": "送信前に署名してください。",
      "applyCryptographicSignature": "暗号署名を適用",
      "civicDocumentApproved": "市民書類が承認されました。",
      "successDescription": "法的住所が確認され、税務書類は公式の暗号シールで署名されました。",
      "officialCivicRecord": "公式市民記録",
      "citizenLabel": "市民:",
      "addressLabel": "住所:",
      "signedLabel": "署名:",
      "footer": "高信頼の市民プロフィールと法的署名"
    },
    "logs": {
      "lookingUpCivilRegistry": "有権者登録と住民登録索引を検索中...",
      "citizenRecordsVerified": "市民識別記録を検証しました: owner=\"Alice Vance\", citizen_status=\"適格\"",
      "validatingPostalCoordinates": "郵便登録索引で空間座標を検証中...",
      "postcodeMatchComplete": "郵便番号照合が完了しました。utility_bill_verify=TRUE, spatial_address=\"1200 Pennsylvania Ave NW\", registry_certified=TRUE",
      "signatureRequired": "書類を封印するには署名を入力してください。",
      "sealingWithSignature": "デジタル署名で書類を封印中: \"{signature}\"",
      "formDigitallySigned": "SHA-256証明書でフォームにデジタル署名しました: signature_key=\"{signature}\", seal=\"OFFICIAL_STATE\""
    }
  },
  "de": {
    "meta": {
      "id": "government-services",
      "tag": "Öffentlicher Sektor",
      "title": "Auf staatliche Dienste zugreifen",
      "desc": "Bestätigen Sie Bürgeridentität, Wohnsitz und Dokumentenberechtigung für einen digitalen Verwaltungsdienst.",
      "security": "Registerprüfungen + Wohnsitznachweis",
      "successResult": "Bürgeridentität und Wohnsitznachweis wurden verifiziert. Die Dienstanfrage kann sicher ausgestellt werden.",
      "steps": [
        {
          "label": "Bevölkerungsregister durchsuchen",
          "action": "Bürgerdatensatz prüfen",
          "logText": "Bevölkerungsregister und Geburtsindex lieferten ein konsistentes Bürgerprofil."
        },
        {
          "label": "Wohnsitznachweis validieren",
          "action": "Wohnsitzbeleg prüfen",
          "logText": "Post-, Versorgungs- und geografische Signale bestätigten den Wohnsitz."
        },
        {
          "label": "Sicheren Nachweis ausstellen",
          "action": "Digitales Zertifikat erstellen",
          "logText": "Ein einmaliger Dokumentennachweis wurde kryptografisch gebunden und versiegelt."
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
      "applyJobRiskTrusted": "VOLL VERTRAUENSWÜRDIG",
      "applyJobRiskNeedsReview": "PRÜFUNG ERFORDERLICH",
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
        "government-services": [
          [
            "Suche in nationaler Bevölkerungsdatenbank",
            "Verifizierung des Geburtsindex",
            "Extraktion des Bürgerdatensatzes"
          ],
          [
            "Scan von Post- und Versorgungsverlauf",
            "Georäumliche Validierung",
            "Bestätigung des Wohnsitznachweises"
          ],
          [
            "RSA-Privatschlüsselgenerierung",
            "Einmalige Dokumentbindung",
            "Kryptografischer Siegelstempel"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Nationales Bürgerportal",
      "badge": "GovPortal Sicher",
      "step1Description": "Schritt 1: Fragen Sie nationale Identitätsdatenbankarchive ab und rufen Sie Wählerregistrierungsdetails ab.",
      "citizenLegalName": "Rechtlicher Name des Bürgers",
      "nationalRegistrarCard": "Nationale Registerkarte",
      "checkCivilRegistries": "Zivilregister prüfen",
      "step2Description": "Schritt 2: Prüfung der gesetzlichen Adresse. Identra gleicht den Wohnsitz mit Versorgungsverlauf und Postleitzahl-Datenbanken ab.",
      "physicalResidentialAddress": "Physische Wohnadresse",
      "runAddressSpatialCheck": "Räumliche Adressprüfung ausführen",
      "step3Description": "Schritt 3: Sichere digitale Signatur. Zeichnen Sie Ihre Signatur oder geben Sie Ihren Namen ein, um Behördenunterlagen zu signieren.",
      "digitalSignaturePad": "Digitales Signaturfeld",
      "signaturePlaceholder": "Namen eingeben, um kryptografisch zu signieren",
      "signatureRequiredError": "Bitte unterschreiben Sie vor dem Absenden.",
      "applyCryptographicSignature": "Kryptografische Signatur anwenden",
      "civicDocumentApproved": "Bürgerdokument genehmigt!",
      "successDescription": "Ihre gesetzliche Adresse wurde bestätigt und Steuerunterlagen wurden mit offiziellem kryptografischem Siegel signiert.",
      "officialCivicRecord": "Offizieller Bürgerdatensatz",
      "citizenLabel": "Bürger:",
      "addressLabel": "Adresse:",
      "signedLabel": "Signiert:",
      "footer": "Hochvertrauenswürdiges Bürgerprofil und rechtliche Signatur"
    },
    "logs": {
      "lookingUpCivilRegistry": "Wählerregister und zivile Registerindizes werden abgefragt...",
      "citizenRecordsVerified": "Bürgeridentifikationsdaten verifiziert: owner=\"Alice Vance\", citizen_status=\"BERECHTIGT\"",
      "validatingPostalCoordinates": "Räumliche Koordinaten werden mit Postregisterindizes validiert...",
      "postcodeMatchComplete": "Postleitzahlabgleich abgeschlossen. utility_bill_verify=TRUE, spatial_address=\"1200 Pennsylvania Ave NW\", registry_certified=TRUE",
      "signatureRequired": "Bitte geben Sie eine Signatur ein, um das Dokument zu versiegeln.",
      "sealingWithSignature": "Dokumente werden mit digitaler Signatur versiegelt: \"{signature}\"",
      "formDigitallySigned": "Formular mit SHA-256-Zertifikat digital signiert: signature_key=\"{signature}\", seal=\"OFFICIAL_STATE\""
    }
  },
  "vi": {
    "meta": {
      "id": "government-services",
      "tag": "Khu vực công",
      "title": "Truy cập dịch vụ công",
      "desc": "Xác nhận danh tính công dân, cư trú và điều kiện giấy tờ cho một dịch vụ công trực tuyến.",
      "security": "Kiểm tra sổ đăng ký + chứng minh cư trú",
      "successResult": "Danh tính công dân và bằng chứng cư trú đã được xác minh. Yêu cầu dịch vụ có thể được phát hành an toàn.",
      "steps": [
        {
          "label": "Tìm kiếm sổ đăng ký dân cư",
          "action": "Kiểm tra hồ sơ công dân",
          "logText": "Sổ đăng ký dân cư và chỉ mục khai sinh trả về hồ sơ công dân nhất quán."
        },
        {
          "label": "Xác thực bằng chứng cư trú",
          "action": "Kiểm tra chứng cứ cư trú",
          "logText": "Tín hiệu bưu chính, tiện ích và địa lý xác nhận nơi cư trú."
        },
        {
          "label": "Phát hành chứng chỉ an toàn",
          "action": "Tạo chứng chỉ số",
          "logText": "Thông tin xác thực giấy tờ dùng một lần đã được liên kết và niêm phong bằng mã hóa."
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
      "applyJobRiskTrusted": "TIN CẬY TUYỆT ĐỐI",
      "applyJobRiskNeedsReview": "CẦN KIỂM TRA THÊM",
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
        "government-services": [
          [
            "Tìm kiếm cơ sở dữ liệu dân cư quốc gia",
            "Xác minh chỉ mục khai sinh hợp pháp",
            "Trích xuất hồ sơ công dân"
          ],
          [
            "Quét lịch sử bưu chính và tiện ích",
            "Xác thực không gian địa lý",
            "Xác nhận bằng chứng cư trú"
          ],
          [
            "Tạo khóa riêng RSA",
            "Liên kết giấy tờ dùng một lần",
            "Đóng dấu niêm phong mã hóa"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Cổng công dân quốc gia",
      "badge": "GovPortal bảo mật",
      "step1Description": "Bước 1: Truy vấn kho lưu trữ cơ sở dữ liệu định danh quốc gia và lấy thông tin đăng ký cử tri.",
      "citizenLegalName": "Họ tên pháp lý của công dân",
      "nationalRegistrarCard": "Thẻ đăng ký quốc gia",
      "checkCivilRegistries": "Kiểm tra sổ đăng ký dân sự",
      "step2Description": "Bước 2: Xác minh địa chỉ pháp lý. Identra đối chiếu nơi cư trú với lịch sử tiện ích và cơ sở dữ liệu mã bưu chính.",
      "physicalResidentialAddress": "Địa chỉ cư trú thường trú",
      "runAddressSpatialCheck": "Chạy kiểm tra không gian địa chỉ",
      "step3Description": "Bước 3: Chữ ký số bảo mật. Vẽ chữ ký hoặc nhập tên của bạn để ký hồ sơ chính phủ.",
      "digitalSignaturePad": "Bảng chữ ký số",
      "signaturePlaceholder": "Nhập tên của bạn để ký bằng mật mã",
      "signatureRequiredError": "Vui lòng ký trước khi gửi.",
      "applyCryptographicSignature": "Áp dụng chữ ký mật mã",
      "civicDocumentApproved": "Hồ sơ dịch vụ công đã được phê duyệt!",
      "successDescription": "Địa chỉ pháp lý của bạn đã được xác nhận và hồ sơ thuế đã được ký bằng con dấu mật mã chính thức.",
      "officialCivicRecord": "Hồ sơ công dân chính thức",
      "citizenLabel": "Công dân:",
      "addressLabel": "Địa chỉ:",
      "signedLabel": "Đã ký:",
      "footer": "Hồ sơ công dân tin cậy cao và chữ ký pháp lý"
    },
    "logs": {
      "lookingUpCivilRegistry": "Đang tra cứu sổ cử tri và chỉ mục hộ tịch...",
      "citizenRecordsVerified": "Bản ghi định danh công dân đã xác minh: owner=\"Alice Vance\", citizen_status=\"ĐỦ ĐIỀU KIỆN\"",
      "validatingPostalCoordinates": "Đang xác thực tọa độ không gian với chỉ mục bưu chính...",
      "postcodeMatchComplete": "Đối chiếu mã bưu chính hoàn tất. utility_bill_verify=TRUE, spatial_address=\"1200 Pennsylvania Ave NW\", registry_certified=TRUE",
      "signatureRequired": "Vui lòng nhập chữ ký để đóng dấu tài liệu.",
      "sealingWithSignature": "Đang đóng dấu tài liệu bằng chữ ký số: \"{signature}\"",
      "formDigitallySigned": "Biểu mẫu đã ký số bằng chứng chỉ SHA-256: signature_key=\"{signature}\", seal=\"OFFICIAL_STATE\""
    }
  }
} as const;
