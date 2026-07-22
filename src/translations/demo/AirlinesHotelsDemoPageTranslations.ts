/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "airlines-hotels",
      "tag": "Travel",
      "title": "Check in for travel and hotel stay",
      "desc": "Use passport NFC, selfie matching, and reservation checks to reduce check-in risk.",
      "security": "NFC passport + face match",
      "successResult": "The traveler passed NFC passport, selfie, and reservation checks. Travel check-in can proceed.",
      "steps": [
        {
          "label": "Read passport NFC chip",
          "action": "Scan passport chip",
          "logText": "Government certificate and encrypted passport data were verified."
        },
        {
          "label": "Match traveler selfie",
          "action": "Complete selfie match",
          "logText": "The live selfie matched the passport chip image with high confidence."
        },
        {
          "label": "Confirm reservation context",
          "action": "Validate booking details",
          "logText": "Flight, hotel, and age attestation details were synchronized."
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
        "airlines-hotels": [
          [
            "NFC Antenna Connection Handshake",
            "Government Certificate Audit",
            "Encrypted Raw Data Read"
          ],
          [
            "Selfie vs NFC Image Matcher",
            "300dpi Extract Photo Similarity",
            "Confidence Scoring (99.9%)"
          ],
          [
            "Flight Passenger List Sync",
            "Hotel Reservation Code Check",
            "Over-18 Age Attestation Stamp"
          ]
        ]
      }
    },
    "scenario": {
      "deskTitle": "Atlas Air & Horizon Desk",
      "nfcBadge": "Contactless NFC",
      "step1Description": "Step 1: Scan biometric e-Passport chip with NFC sensor. Hold your passport to your smartphone.",
      "readingChipCertificate": "Reading chip certificate...",
      "readyForContactless": "Ready for contactless communication",
      "scanPassportNfcChip": "Scan Passport NFC Chip",
      "step2Description": "Step 2: Biometric Face Matching. Compares live selfie camera geometry with original photo inside NFC chip.",
      "passportNfcPhoto": "Passport NFC Photo",
      "liveSelfieScan": "Live Selfie Scan",
      "matchBiometricFacePhoto": "Match Biometric Face Photo",
      "step3Description": "Step 3: Booking sync & contactless registration. Verify legal age and auto-issue digital room keys.",
      "hotelReservationCode": "Hotel Reservation Code:",
      "citizenAgeVerification": "Citizen Age verification:",
      "syncFlightRoomCode": "Sync Flight & Room Code",
      "contactlessCheckInComplete": "Contactless Check-In Complete!",
      "roomKeyReadyDescription": "You are checked in to Room 504. Your virtual room key has been generated on your smartphone.",
      "biometricPassportFooter": "Biometric passport NFC travel compliance"
    },
    "logs": {
      "contactlessNfcScan": "Contactless NFC scan initiated. Hold biometric passport near sensor.",
      "nfcChipDecrypted": "NFC chip decrypted successfully. Country of issue: USA, holder=\"{holder}\", cryptographic cert=\"VALID\"",
      "runningPhotoMatch": "Running 1-to-1 photo match geometry analysis...",
      "facialAnalysisCompleted": "Facial analysis completed. Matched with high resolution passport index: 99.9% matching geometry.",
      "verifyingBoardingLists": "Verifying customer boarding lists and room indices...",
      "bookingSynchronized": "Synchronized booking successful. Age over 18 certified. Room 504 allocated successfully."
    }
  },
  "es": {
    "meta": {
      "id": "airlines-hotels",
      "tag": "Viajes",
      "title": "Hacer check-in para viaje y hotel",
      "desc": "Usa NFC de pasaporte, coincidencia facial y comprobaciones de reserva para reducir el riesgo en el check-in.",
      "security": "Pasaporte NFC + coincidencia facial",
      "successResult": "El viajero superó pasaporte NFC, selfie y reserva. El check-in puede continuar.",
      "steps": [
        {
          "label": "Leer chip NFC del pasaporte",
          "action": "Escanear chip del pasaporte",
          "logText": "Se verificaron certificado gubernamental y datos cifrados del pasaporte."
        },
        {
          "label": "Comparar selfie del viajero",
          "action": "Completar comparación de selfie",
          "logText": "La selfie en vivo coincidió con la imagen del chip con alta confianza."
        },
        {
          "label": "Confirmar contexto de reserva",
          "action": "Validar detalles de reserva",
          "logText": "Vuelo, hotel y certificación de edad quedaron sincronizados."
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
        "airlines-hotels": [
          [
            "Handshake de antena NFC",
            "Auditoría de certificado gubernamental",
            "Lectura de datos brutos cifrados"
          ],
          [
            "Comparador de selfie contra imagen NFC",
            "Similitud de foto extraída a 300dpi",
            "Puntuación de confianza (99,9%)"
          ],
          [
            "Sincronización de lista de pasajeros",
            "Verificación de código de reserva de hotel",
            "Sello de certificación mayor de 18"
          ]
        ]
      }
    },
    "scenario": {
      "deskTitle": "Mostrador Atlas Air & Horizon",
      "nfcBadge": "NFC sin contacto",
      "step1Description": "Paso 1: Escanea el chip biométrico del pasaporte electrónico con el sensor NFC. Mantén el pasaporte cerca de tu smartphone.",
      "readingChipCertificate": "Leyendo certificado del chip...",
      "readyForContactless": "Listo para comunicación sin contacto",
      "scanPassportNfcChip": "Escanear chip NFC del pasaporte",
      "step2Description": "Paso 2: Coincidencia facial biométrica. Compara la geometría de la selfie en vivo con la foto original del chip NFC.",
      "passportNfcPhoto": "Foto NFC del pasaporte",
      "liveSelfieScan": "Escaneo de selfie en vivo",
      "matchBiometricFacePhoto": "Comparar foto facial biométrica",
      "step3Description": "Paso 3: Sincronización de reserva y registro sin contacto. Verifica la mayoría de edad y emite llaves digitales de habitación.",
      "hotelReservationCode": "Código de reserva del hotel:",
      "citizenAgeVerification": "Verificación de edad del ciudadano:",
      "syncFlightRoomCode": "Sincronizar vuelo y código de habitación",
      "contactlessCheckInComplete": "Check-in sin contacto completado.",
      "roomKeyReadyDescription": "Has hecho check-in en la habitación 504. Tu llave virtual se generó en tu smartphone.",
      "biometricPassportFooter": "Cumplimiento de viaje con pasaporte biométrico NFC"
    },
    "logs": {
      "contactlessNfcScan": "Escaneo NFC sin contacto iniciado. Mantén el pasaporte biométrico cerca del sensor.",
      "nfcChipDecrypted": "Chip NFC descifrado correctamente. País emisor: EE. UU., titular=\"{holder}\", certificado criptográfico=\"VÁLIDO\"",
      "runningPhotoMatch": "Ejecutando análisis geométrico de coincidencia fotográfica 1 a 1...",
      "facialAnalysisCompleted": "Análisis facial completado. Coincidencia con el índice de pasaporte de alta resolución: 99,9%.",
      "verifyingBoardingLists": "Verificando listas de embarque del cliente e índices de habitación...",
      "bookingSynchronized": "Reserva sincronizada correctamente. Edad mayor de 18 certificada. Habitación 504 asignada."
    }
  },
  "ja": {
    "meta": {
      "id": "airlines-hotels",
      "tag": "旅行",
      "title": "旅行とホテルにチェックイン",
      "desc": "パスポートNFC、セルフィー照合、予約確認でチェックイン時のリスクを下げます。",
      "security": "NFCパスポート + 顔照合",
      "successResult": "旅行者はNFCパスポート、セルフィー、予約確認に合格しました。チェックインを進められます。",
      "steps": [
        {
          "label": "パスポートNFCチップを読み取り",
          "action": "パスポートチップをスキャン",
          "logText": "政府証明書と暗号化されたパスポートデータを検証しました。"
        },
        {
          "label": "旅行者セルフィーを照合",
          "action": "セルフィー照合を完了",
          "logText": "ライブセルフィーはチップ内画像と高い信頼度で一致しました。"
        },
        {
          "label": "予約コンテキストを確認",
          "action": "予約詳細を検証",
          "logText": "フライト、ホテル、年齢証明の詳細を同期しました。"
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
        "airlines-hotels": [
          [
            "NFCアンテナ接続ハンドシェイク",
            "政府証明書監査",
            "暗号化生データ読み取り"
          ],
          [
            "セルフィーとNFC画像の照合",
            "300dpi抽出写真類似度",
            "信頼スコアリング（99.9%）"
          ],
          [
            "搭乗者リスト同期",
            "ホテル予約コード確認",
            "18歳以上証明スタンプ"
          ]
        ]
      }
    },
    "scenario": {
      "deskTitle": "Atlas Air & Horizon デスク",
      "nfcBadge": "非接触NFC",
      "step1Description": "ステップ1: NFCセンサーで生体認証eパスポートチップを読み取ります。パスポートをスマートフォンに近づけてください。",
      "readingChipCertificate": "チップ証明書を読み取り中...",
      "readyForContactless": "非接触通信の準備ができました",
      "scanPassportNfcChip": "パスポートNFCチップをスキャン",
      "step2Description": "ステップ2: 生体顔照合。ライブセルフィーの形状をNFCチップ内の原本写真と比較します。",
      "passportNfcPhoto": "パスポートNFC写真",
      "liveSelfieScan": "ライブセルフィースキャン",
      "matchBiometricFacePhoto": "生体顔写真を照合",
      "step3Description": "ステップ3: 予約同期と非接触登録。法定年齢を確認し、デジタルルームキーを自動発行します。",
      "hotelReservationCode": "ホテル予約コード:",
      "citizenAgeVerification": "市民年齢確認:",
      "syncFlightRoomCode": "フライトと客室コードを同期",
      "contactlessCheckInComplete": "非接触チェックインが完了しました。",
      "roomKeyReadyDescription": "Room 504へのチェックインが完了しました。スマートフォンに仮想ルームキーが生成されました。",
      "biometricPassportFooter": "NFC生体認証パスポートの旅行コンプライアンス"
    },
    "logs": {
      "contactlessNfcScan": "非接触NFCスキャンを開始しました。生体認証パスポートをセンサーに近づけてください。",
      "nfcChipDecrypted": "NFCチップの復号に成功しました。発行国: USA、保有者=\"{holder}\"、暗号証明書=\"有効\"",
      "runningPhotoMatch": "1対1の写真照合ジオメトリ分析を実行中...",
      "facialAnalysisCompleted": "顔分析が完了しました。高解像度パスポート索引との照合率は99.9%です。",
      "verifyingBoardingLists": "搭乗者リストと客室索引を検証中...",
      "bookingSynchronized": "予約同期に成功しました。18歳以上を認証し、504号室を割り当てました。"
    }
  },
  "de": {
    "meta": {
      "id": "airlines-hotels",
      "tag": "Reisen",
      "title": "Für Reise und Hotel einchecken",
      "desc": "Nutzen Sie Pass-NFC, Selfie-Abgleich und Reservierungsprüfungen, um Check-in-Risiken zu senken.",
      "security": "NFC-Pass + Gesichtsabgleich",
      "successResult": "Der Reisende hat NFC-Pass-, Selfie- und Reservierungsprüfungen bestanden. Der Check-in kann fortgesetzt werden.",
      "steps": [
        {
          "label": "NFC-Chip des Passes lesen",
          "action": "Passchip scannen",
          "logText": "Behördliches Zertifikat und verschlüsselte Passdaten wurden geprüft."
        },
        {
          "label": "Reisenden-Selfie abgleichen",
          "action": "Selfie-Abgleich abschließen",
          "logText": "Das Live-Selfie stimmte mit hoher Konfidenz mit dem Chipbild überein."
        },
        {
          "label": "Reservierungskontext bestätigen",
          "action": "Buchungsdetails validieren",
          "logText": "Flug-, Hotel- und Altersnachweisdaten wurden synchronisiert."
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
        "airlines-hotels": [
          [
            "NFC-Antennenverbindungs-Handshake",
            "Behördliche Zertifikatsprüfung",
            "Verschlüsselte Rohdatenlesung"
          ],
          [
            "Selfie-gegen-NFC-Bildabgleich",
            "300dpi-Fotoähnlichkeit",
            "Konfidenzbewertung (99,9%)"
          ],
          [
            "Synchronisierung der Passagierliste",
            "Hotelreservierungscode-Prüfung",
            "Über-18-Altersnachweisstempel"
          ]
        ]
      }
    },
    "scenario": {
      "deskTitle": "Atlas Air & Horizon Schalter",
      "nfcBadge": "Kontaktloses NFC",
      "step1Description": "Schritt 1: Scannen Sie den biometrischen e-Pass-Chip mit dem NFC-Sensor. Halten Sie den Pass an Ihr Smartphone.",
      "readingChipCertificate": "Chip-Zertifikat wird gelesen...",
      "readyForContactless": "Bereit für kontaktlose Kommunikation",
      "scanPassportNfcChip": "NFC-Chip des Passes scannen",
      "step2Description": "Schritt 2: Biometrischer Gesichtsabgleich. Die Live-Selfie-Geometrie wird mit dem Originalfoto im NFC-Chip verglichen.",
      "passportNfcPhoto": "Passfoto aus NFC",
      "liveSelfieScan": "Live-Selfie-Scan",
      "matchBiometricFacePhoto": "Biometrisches Gesichtsbild abgleichen",
      "step3Description": "Schritt 3: Buchungssynchronisierung und kontaktlose Registrierung. Volljährigkeit prüfen und digitale Zimmerschlüssel ausstellen.",
      "hotelReservationCode": "Hotel-Reservierungscode:",
      "citizenAgeVerification": "Altersprüfung des Reisenden:",
      "syncFlightRoomCode": "Flug- und Zimmercode synchronisieren",
      "contactlessCheckInComplete": "Kontaktloser Check-in abgeschlossen!",
      "roomKeyReadyDescription": "Sie sind in Zimmer 504 eingecheckt. Ihr virtueller Zimmerschlüssel wurde auf Ihrem Smartphone erstellt.",
      "biometricPassportFooter": "Travel-Compliance mit biometrischem NFC-Pass"
    },
    "logs": {
      "contactlessNfcScan": "Kontaktloser NFC-Scan gestartet. Halten Sie den biometrischen Pass an den Sensor.",
      "nfcChipDecrypted": "NFC-Chip erfolgreich entschlüsselt. Ausstellungsland: USA, Inhaber=\"{holder}\", kryptografisches Zertifikat=\"GÜLTIG\"",
      "runningPhotoMatch": "1:1-Fotoabgleich und Geometrieanalyse werden ausgeführt...",
      "facialAnalysisCompleted": "Gesichtsanalyse abgeschlossen. Abgleich mit hochauflösendem Passindex: 99,9%.",
      "verifyingBoardingLists": "Boardinglisten und Zimmerindizes werden geprüft...",
      "bookingSynchronized": "Buchung erfolgreich synchronisiert. Alter über 18 bestätigt. Zimmer 504 erfolgreich zugewiesen."
    }
  },
  "vi": {
    "meta": {
      "id": "airlines-hotels",
      "tag": "Du lịch",
      "title": "Làm thủ tục cho chuyến bay và khách sạn",
      "desc": "Dùng NFC hộ chiếu, đối chiếu selfie và kiểm tra đặt chỗ để giảm rủi ro khi làm thủ tục.",
      "security": "Hộ chiếu NFC + đối chiếu khuôn mặt",
      "successResult": "Hành khách đã vượt qua kiểm tra hộ chiếu NFC, selfie và đặt chỗ. Quy trình làm thủ tục có thể tiếp tục.",
      "steps": [
        {
          "label": "Đọc chip NFC hộ chiếu",
          "action": "Quét chip hộ chiếu",
          "logText": "Chứng thư chính phủ và dữ liệu hộ chiếu mã hóa đã được xác minh."
        },
        {
          "label": "Đối chiếu selfie hành khách",
          "action": "Hoàn tất đối chiếu selfie",
          "logText": "Selfie trực tiếp khớp với ảnh trong chip hộ chiếu với độ tin cậy cao."
        },
        {
          "label": "Xác nhận ngữ cảnh đặt chỗ",
          "action": "Xác thực chi tiết đặt chỗ",
          "logText": "Thông tin chuyến bay, khách sạn và xác nhận độ tuổi đã được đồng bộ."
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
        "airlines-hotels": [
          [
            "Bắt tay kết nối ăng-ten NFC",
            "Kiểm tra chứng thư chính phủ",
            "Đọc dữ liệu thô đã mã hóa"
          ],
          [
            "Đối chiếu selfie với ảnh NFC",
            "So sánh ảnh trích xuất 300dpi",
            "Chấm điểm tin cậy (99,9%)"
          ],
          [
            "Đồng bộ danh sách hành khách bay",
            "Kiểm tra mã đặt phòng khách sạn",
            "Đóng dấu xác nhận trên 18 tuổi"
          ]
        ]
      }
    },
    "scenario": {
      "deskTitle": "Quầy Atlas Air & Horizon",
      "nfcBadge": "NFC không tiếp xúc",
      "step1Description": "Bước 1: Quét chip sinh trắc học trong hộ chiếu điện tử bằng cảm biến NFC. Giữ hộ chiếu gần điện thoại thông minh của bạn.",
      "readingChipCertificate": "Đang đọc chứng chỉ chip...",
      "readyForContactless": "Sẵn sàng kết nối không tiếp xúc",
      "scanPassportNfcChip": "Quét chip NFC của hộ chiếu",
      "step2Description": "Bước 2: Đối chiếu khuôn mặt sinh trắc học. So sánh hình học selfie trực tiếp với ảnh gốc trong chip NFC.",
      "passportNfcPhoto": "Ảnh NFC từ hộ chiếu",
      "liveSelfieScan": "Quét selfie trực tiếp",
      "matchBiometricFacePhoto": "Đối chiếu ảnh khuôn mặt sinh trắc học",
      "step3Description": "Bước 3: Đồng bộ đặt chỗ và đăng ký không tiếp xúc. Xác minh tuổi hợp pháp và tự động cấp chìa khóa phòng số.",
      "hotelReservationCode": "Mã đặt phòng khách sạn:",
      "citizenAgeVerification": "Xác minh tuổi công dân:",
      "syncFlightRoomCode": "Đồng bộ chuyến bay và mã phòng",
      "contactlessCheckInComplete": "Làm thủ tục không tiếp xúc hoàn tất!",
      "roomKeyReadyDescription": "Bạn đã làm thủ tục vào phòng 504. Chìa khóa phòng ảo đã được tạo trên điện thoại thông minh của bạn.",
      "biometricPassportFooter": "Tuân thủ du lịch bằng hộ chiếu sinh trắc học NFC"
    },
    "logs": {
      "contactlessNfcScan": "Bắt đầu quét NFC không tiếp xúc. Giữ hộ chiếu sinh trắc gần cảm biến.",
      "nfcChipDecrypted": "Giải mã chip NFC thành công. Quốc gia cấp: Hoa Kỳ, chủ sở hữu=\"{holder}\", chứng chỉ mật mã=\"HỢP LỆ\"",
      "runningPhotoMatch": "Đang phân tích hình học đối chiếu ảnh chân dung 1-1...",
      "facialAnalysisCompleted": "Phân tích khuôn mặt thành công. Khớp với ảnh hộ chiếu độ phân giải cao: 99,9%.",
      "verifyingBoardingLists": "Đang xác minh danh sách hành khách và chỉ mục phòng...",
      "bookingSynchronized": "Đồng bộ đặt chỗ thành công. Đã xác nhận trên 18 tuổi. Phòng 504 được cấp thành công."
    }
  }
} as const;
