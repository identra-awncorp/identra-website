/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "ticket-booking",
      "tag": "Ticketing",
      "title": "Book a high-demand event ticket",
      "desc": "Detect bots, confirm phone ownership, and bind the ticket to a verified fan profile.",
      "security": "Device intelligence + phone risk",
      "successResult": "The booking was confirmed for a verified fan. Bot risk was low and the ticket was cryptographically bound.",
      "steps": [
        {
          "label": "Analyze device risk",
          "action": "Check device signal",
          "logText": "Browser fingerprint, automation signals, and behavioral entropy were assessed."
        },
        {
          "label": "Confirm phone ownership",
          "action": "Verify phone number",
          "logText": "Carrier, SIM, and OTP checks confirmed reachable non-VoIP ownership."
        },
        {
          "label": "Bind ticket credential",
          "action": "Issue verified ticket",
          "logText": "Ticket metadata was sealed with a non-transferability control and QR signature."
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
        "ticket-booking": [
          [
            "WebGL Canvas Fingerprint",
            "Mouse Motion Entropy Matcher",
            "Headless Browser Detector"
          ],
          [
            "Mobile Carrier Signal Audit",
            "Non-VoIP SIM Authentication",
            "OTP Verification Code Match"
          ],
          [
            "Fan Metadata Encryption",
            "Non-transferability Lock Seal",
            "Cryptographic QR Signature Stamp"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePass Arena Checkout",
      "badge": "Anti-Bot Secure",
      "step1Description": "Step 1: Choose your seats in the arena to hold booking. The security system will scan browser headers.",
      "seatingMapSelect": "Seating Map Select",
      "selectedSeats": "Selected: {seats}",
      "noSeatsSelected": "Selected: No seats selected",
      "selectSeatError": "Please select at least one seat to proceed!",
      "holdSeatsCheckout": "Hold Seats & Checkout",
      "step2Description": "Step 2: Bot abuse mitigation. Identra scans client fingerprints, IP routing structures, and mouse vectors.",
      "humanOperatorMetric": "Human operator metric",
      "confidenceLabel": "{score}% confidence",
      "fingerprintIp": "Fingerprint IP",
      "latencyVector": "Latency Vector",
      "runAntiBotTelemetry": "Run Anti-Bot Telemetry Verification",
      "step3Description": "Step 3: Phone SMS OTP check. Verifies the phone belongs to a physical SIM card, preventing virtual VoIP abuse.",
      "smsOtpTitle": "VibePass SMS OTP",
      "secureBookingCode": "Your secure booking code is",
      "mobilePhoneNumber": "Mobile Phone Number",
      "validPhoneError": "Please enter a valid phone number!",
      "sendCode": "Send Code",
      "verificationCodeOtp": "Verification Code (OTP)",
      "otpPlaceholder": "e.g. 4920",
      "phoneAndOtpFirstError": "Please enter phone number and get OTP first!",
      "enterOtpError": "Please enter the OTP code!",
      "incorrectOtpError": "Incorrect verification OTP code!",
      "confirmPurchaseTickets": "Confirm & Purchase Tickets",
      "ticketPurchaseSealed": "Ticket Purchase Sealed!",
      "successDescription": "The Identra security perimeter has successfully locked your ticket, protecting it against scalpers and secondary market abuse.",
      "arenaEntry": "VibePass Arena Entry",
      "secureTicket": "Secure Ticket",
      "seatsLabel": "Seats:",
      "verifiedFanOnly": "Verified fan only",
      "footer": "Anti-scalper fan ticket defense system"
    },
    "logs": {
      "validationNoSeats": "Validation failed: No seats selected.",
      "holdingSeats": "Holding seats {seats}. Checking browser signals...",
      "seatsLocked": "Seats successfully locked. Session validated. Behavioral tracking matches standard human operator model.",
      "runningTelemetry": "Running advanced browser telemetry analysis...",
      "telemetryPassed": "Telemetry scan passed. Proxy=FALSE, WebGL fingerprint verified, bot status=MITIGATED.",
      "sentOtp": "Sent SMS OTP request to: {phone}",
      "incorrectOtp": "Incorrect OTP entered: {otp}",
      "verifyingOtp": "Verifying SMS OTP token...",
      "otpVerified": "OTP code verified. SIM carrier details match physical contract, registered to active subscriber."
    }
  },
  "es": {
    "meta": {
      "id": "ticket-booking",
      "tag": "Entradas",
      "title": "Reservar una entrada de alta demanda",
      "desc": "Detecta bots, confirma propiedad del teléfono y vincula la entrada a un perfil de fan verificado.",
      "security": "Inteligencia de dispositivo + riesgo telefónico",
      "successResult": "La reserva se confirmó para un fan verificado. El riesgo de bot fue bajo y la entrada quedó vinculada criptográficamente.",
      "steps": [
        {
          "label": "Analizar riesgo del dispositivo",
          "action": "Revisar señal del dispositivo",
          "logText": "Se evaluaron huella del navegador, automatización y entropía de comportamiento."
        },
        {
          "label": "Confirmar propiedad del teléfono",
          "action": "Verificar número telefónico",
          "logText": "Operador, SIM y OTP confirmaron propiedad alcanzable no VoIP."
        },
        {
          "label": "Vincular credencial de entrada",
          "action": "Emitir entrada verificada",
          "logText": "Los metadatos de la entrada se sellaron con control de no transferencia y firma QR."
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
        "ticket-booking": [
          [
            "Huella WebGL Canvas",
            "Comparador de entropía del movimiento del mouse",
            "Detector de navegador sin interfaz"
          ],
          [
            "Auditoría de señal de operador móvil",
            "Autenticación SIM no VoIP",
            "Coincidencia de código OTP"
          ],
          [
            "Cifrado de metadatos del fan",
            "Sello de bloqueo contra transferencia",
            "Sello de firma QR criptográfica"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Pago de arena VibePass",
      "badge": "Seguro anti-bots",
      "step1Description": "Paso 1: Elige tus asientos en la arena para retener la reserva. El sistema de seguridad revisará los encabezados del navegador.",
      "seatingMapSelect": "Selección del mapa de asientos",
      "selectedSeats": "Seleccionado: {seats}",
      "noSeatsSelected": "Seleccionado: ningún asiento",
      "selectSeatError": "Selecciona al menos un asiento para continuar.",
      "holdSeatsCheckout": "Retener asientos y pagar",
      "step2Description": "Paso 2: Mitigación de abuso por bots. Identra analiza huellas del cliente, rutas IP y vectores del mouse.",
      "humanOperatorMetric": "Métrica de operador humano",
      "confidenceLabel": "{score}% de confianza",
      "fingerprintIp": "Huella de IP",
      "latencyVector": "Vector de latencia",
      "runAntiBotTelemetry": "Ejecutar verificación telemétrica anti-bots",
      "step3Description": "Paso 3: Verificación OTP por SMS. Confirma que el teléfono pertenece a una SIM física y evita el abuso de VoIP virtual.",
      "smsOtpTitle": "OTP SMS de VibePass",
      "secureBookingCode": "Tu código seguro de reserva es",
      "mobilePhoneNumber": "Número de teléfono móvil",
      "validPhoneError": "Introduce un número de teléfono válido.",
      "sendCode": "Enviar código",
      "verificationCodeOtp": "Código de verificación (OTP)",
      "otpPlaceholder": "p. ej. 4920",
      "phoneAndOtpFirstError": "Introduce el teléfono y solicita el OTP primero.",
      "enterOtpError": "Introduce el código OTP.",
      "incorrectOtpError": "Código OTP incorrecto.",
      "confirmPurchaseTickets": "Confirmar y comprar entradas",
      "ticketPurchaseSealed": "Compra de entradas sellada.",
      "successDescription": "El perímetro de seguridad de Identra bloqueó correctamente tu entrada y la protegió contra revendedores y abusos del mercado secundario.",
      "arenaEntry": "Entrada Arena VibePass",
      "secureTicket": "Entrada segura",
      "seatsLabel": "Asientos:",
      "verifiedFanOnly": "Solo fan verificado",
      "footer": "Sistema de defensa anti-reventa para entradas de fans"
    },
    "logs": {
      "validationNoSeats": "Validación fallida: no se seleccionaron asientos.",
      "holdingSeats": "Reservando asientos {seats}. Comprobando señales del navegador...",
      "seatsLocked": "Asientos bloqueados correctamente. Sesión validada. El comportamiento coincide con un operador humano estándar.",
      "runningTelemetry": "Ejecutando análisis avanzado de telemetría del navegador...",
      "telemetryPassed": "Telemetría aprobada. Proxy=FALSE, huella WebGL verificada, bot status=MITIGATED.",
      "sentOtp": "Solicitud SMS OTP enviada a: {phone}",
      "incorrectOtp": "OTP incorrecto ingresado: {otp}",
      "verifyingOtp": "Verificando token SMS OTP...",
      "otpVerified": "Código OTP verificado. Los datos del operador SIM coinciden con un contrato físico de suscriptor activo."
    }
  },
  "ja": {
    "meta": {
      "id": "ticket-booking",
      "tag": "チケット",
      "title": "人気イベントチケットを予約",
      "desc": "ボットを検知し、電話所有を確認し、チケットを検証済みファンプロフィールへ結び付けます。",
      "security": "デバイスインテリジェンス + 電話リスク",
      "successResult": "検証済みファンの予約が確認されました。ボットリスクは低く、チケットは暗号的に結び付けられました。",
      "steps": [
        {
          "label": "デバイスリスクを分析",
          "action": "デバイスシグナルを確認",
          "logText": "ブラウザ指紋、自動化シグナル、行動エントロピーを評価しました。"
        },
        {
          "label": "電話所有を確認",
          "action": "電話番号を検証",
          "logText": "通信事業者、SIM、OTPにより、到達可能な非VoIP所有を確認しました。"
        },
        {
          "label": "チケット資格情報を結合",
          "action": "検証済みチケットを発行",
          "logText": "チケットメタデータを譲渡制御とQR署名で封印しました。"
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
        "ticket-booking": [
          [
            "WebGL Canvas指紋",
            "マウス動作エントロピーマッチャー",
            "ヘッドレスブラウザ検出"
          ],
          [
            "携帯キャリア信号監査",
            "非VoIP SIM認証",
            "OTP確認コード照合"
          ],
          [
            "ファンメタデータ暗号化",
            "譲渡不可ロックシール",
            "暗号QR署名スタンプ"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePassアリーナ決済",
      "badge": "ボット対策保護",
      "step1Description": "ステップ1: アリーナの座席を選択して予約を一時確保します。セキュリティシステムがブラウザーのヘッダーを確認します。",
      "seatingMapSelect": "座席マップ選択",
      "selectedSeats": "選択済み: {seats}",
      "noSeatsSelected": "選択済み: 座席未選択",
      "selectSeatError": "続行するには少なくとも1席を選択してください。",
      "holdSeatsCheckout": "座席を確保して決済へ",
      "step2Description": "ステップ2: 不正ボット対策。Identraはクライアントの指紋、IP経路、マウス動作ベクトルを分析します。",
      "humanOperatorMetric": "人間操作の指標",
      "confidenceLabel": "信頼度 {score}%",
      "fingerprintIp": "IPフィンガープリント",
      "latencyVector": "遅延ベクトル",
      "runAntiBotTelemetry": "ボット対策テレメトリー検証を実行",
      "step3Description": "ステップ3: SMS OTPによる電話確認。電話番号が物理SIMに紐づくことを確認し、仮想VoIPの悪用を防ぎます。",
      "smsOtpTitle": "VibePass SMS OTP",
      "secureBookingCode": "安全な予約コード:",
      "mobilePhoneNumber": "携帯電話番号",
      "validPhoneError": "有効な電話番号を入力してください。",
      "sendCode": "コードを送信",
      "verificationCodeOtp": "確認コード (OTP)",
      "otpPlaceholder": "例: 4920",
      "phoneAndOtpFirstError": "先に電話番号を入力してOTPを取得してください。",
      "enterOtpError": "OTPコードを入力してください。",
      "incorrectOtpError": "OTP確認コードが正しくありません。",
      "confirmPurchaseTickets": "確認してチケットを購入",
      "ticketPurchaseSealed": "チケット購入が保護されました。",
      "successDescription": "Identraのセキュリティ境界がチケットを正常にロックし、転売業者や二次市場の悪用から保護しました。",
      "arenaEntry": "VibePassアリーナ入場",
      "secureTicket": "安全なチケット",
      "seatsLabel": "座席:",
      "verifiedFanOnly": "認証済みファンのみ",
      "footer": "転売対策ファンチケット防御システム"
    },
    "logs": {
      "validationNoSeats": "検証失敗: 座席が選択されていません。",
      "holdingSeats": "座席 {seats} を仮押さえ中。ブラウザ信号を確認しています...",
      "seatsLocked": "座席を正常にロックしました。セッションは検証済みで、行動追跡は標準的な人間の操作モデルと一致します。",
      "runningTelemetry": "高度なブラウザテレメトリ分析を実行中...",
      "telemetryPassed": "テレメトリスキャン合格。Proxy=FALSE、WebGL指紋検証済み、bot status=MITIGATED。",
      "sentOtp": "SMS OTPリクエストを送信しました: {phone}",
      "incorrectOtp": "入力されたOTPが正しくありません: {otp}",
      "verifyingOtp": "SMS OTPトークンを検証中...",
      "otpVerified": "OTPコードを検証しました。SIM事業者情報は有効な契約中の加入者と一致します。"
    }
  },
  "de": {
    "meta": {
      "id": "ticket-booking",
      "tag": "Tickets",
      "title": "Ticket für ein stark nachgefragtes Event buchen",
      "desc": "Erkennen Sie Bots, bestätigen Sie Telefonbesitz und binden Sie das Ticket an ein verifiziertes Fanprofil.",
      "security": "Geräteintelligenz + Telefonrisiko",
      "successResult": "Die Buchung wurde für einen verifizierten Fan bestätigt. Das Bot-Risiko war niedrig und das Ticket wurde kryptografisch gebunden.",
      "steps": [
        {
          "label": "Geräterisiko analysieren",
          "action": "Gerätesignal prüfen",
          "logText": "Browser-Fingerprint, Automatisierungssignale und Verhaltensentropie wurden bewertet."
        },
        {
          "label": "Telefonbesitz bestätigen",
          "action": "Telefonnummer verifizieren",
          "logText": "Mobilfunkanbieter, SIM und OTP bestätigten erreichbaren Nicht-VoIP-Besitz."
        },
        {
          "label": "Ticketnachweis binden",
          "action": "Verifiziertes Ticket ausstellen",
          "logText": "Ticketmetadaten wurden mit Nichtübertragbarkeitskontrolle und QR-Signatur versiegelt."
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
        "ticket-booking": [
          [
            "WebGL-Canvas-Fingerprint",
            "Mausbewegungs-Entropieabgleich",
            "Headless-Browser-Erkennung"
          ],
          [
            "Mobilfunkanbieter-Signalaudit",
            "Nicht-VoIP-SIM-Authentifizierung",
            "OTP-Verifizierungscode-Abgleich"
          ],
          [
            "Verschlüsselung von Fan-Metadaten",
            "Nichtübertragbarkeits-Locksiegel",
            "Kryptografischer QR-Signaturstempel"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePass Arena-Checkout",
      "badge": "Anti-Bot-geschützt",
      "step1Description": "Schritt 1: Wählen Sie Ihre Sitzplätze in der Arena aus, um die Buchung zu reservieren. Das Sicherheitssystem prüft die Browser-Header.",
      "seatingMapSelect": "Sitzplan auswählen",
      "selectedSeats": "Ausgewählt: {seats}",
      "noSeatsSelected": "Ausgewählt: keine Sitzplätze",
      "selectSeatError": "Bitte wählen Sie mindestens einen Sitzplatz aus, um fortzufahren.",
      "holdSeatsCheckout": "Sitzplätze halten und bezahlen",
      "step2Description": "Schritt 2: Abwehr von Bot-Missbrauch. Identra analysiert Client-Fingerprints, IP-Routing-Strukturen und Mausvektoren.",
      "humanOperatorMetric": "Kennzahl für menschliche Bedienung",
      "confidenceLabel": "{score}% Vertrauen",
      "fingerprintIp": "IP-Fingerprint",
      "latencyVector": "Latenzvektor",
      "runAntiBotTelemetry": "Anti-Bot-Telemetrieprüfung ausführen",
      "step3Description": "Schritt 3: Telefonprüfung per SMS-OTP. Bestätigt, dass das Telefon zu einer physischen SIM-Karte gehört, und verhindert Missbrauch durch virtuelles VoIP.",
      "smsOtpTitle": "VibePass SMS-OTP",
      "secureBookingCode": "Ihr sicherer Buchungscode lautet",
      "mobilePhoneNumber": "Mobiltelefonnummer",
      "validPhoneError": "Bitte geben Sie eine gültige Telefonnummer ein.",
      "sendCode": "Code senden",
      "verificationCodeOtp": "Verifizierungscode (OTP)",
      "otpPlaceholder": "z. B. 4920",
      "phoneAndOtpFirstError": "Bitte geben Sie zuerst die Telefonnummer ein und fordern Sie das OTP an.",
      "enterOtpError": "Bitte geben Sie den OTP-Code ein.",
      "incorrectOtpError": "Der OTP-Code ist falsch.",
      "confirmPurchaseTickets": "Tickets bestätigen und kaufen",
      "ticketPurchaseSealed": "Ticketkauf versiegelt!",
      "successDescription": "Der Sicherheitsbereich von Identra hat Ihr Ticket erfolgreich gesperrt und vor Wiederverkäufern sowie Missbrauch auf dem Zweitmarkt geschützt.",
      "arenaEntry": "VibePass Arena-Einlass",
      "secureTicket": "Sicheres Ticket",
      "seatsLabel": "Sitzplätze:",
      "verifiedFanOnly": "Nur verifizierte Fans",
      "footer": "Anti-Scalping-Schutzsystem für Fan-Tickets"
    },
    "logs": {
      "validationNoSeats": "Validierung fehlgeschlagen: Keine Sitze ausgewählt.",
      "holdingSeats": "Sitze {seats} werden gehalten. Browsersignale werden geprüft...",
      "seatsLocked": "Sitze erfolgreich gesperrt. Sitzung validiert. Verhaltensmuster entspricht einem normalen menschlichen Bediener.",
      "runningTelemetry": "Erweiterte Browser-Telemetrieanalyse wird ausgeführt...",
      "telemetryPassed": "Telemetriescan bestanden. Proxy=FALSE, WebGL-Fingerprint verifiziert, bot status=MITIGATED.",
      "sentOtp": "SMS-OTP-Anfrage gesendet an: {phone}",
      "incorrectOtp": "Falscher OTP eingegeben: {otp}",
      "verifyingOtp": "SMS-OTP-Token wird verifiziert...",
      "otpVerified": "OTP-Code verifiziert. SIM-Anbieterdetails entsprechen einem physischen Vertrag eines aktiven Teilnehmers."
    }
  },
  "vi": {
    "meta": {
      "id": "ticket-booking",
      "tag": "Vé sự kiện",
      "title": "Đặt vé sự kiện nhu cầu cao",
      "desc": "Phát hiện bot, xác nhận quyền sở hữu điện thoại và gắn vé với hồ sơ người hâm mộ đã xác minh.",
      "security": "Tín hiệu thiết bị + rủi ro điện thoại",
      "successResult": "Lượt đặt vé đã được xác nhận cho người hâm mộ đã xác minh. Rủi ro bot thấp và vé đã được gắn bằng mã hóa.",
      "steps": [
        {
          "label": "Phân tích rủi ro thiết bị",
          "action": "Kiểm tra tín hiệu thiết bị",
          "logText": "Dấu vân tay trình duyệt, tín hiệu tự động hóa và hành vi đã được đánh giá."
        },
        {
          "label": "Xác nhận quyền sở hữu điện thoại",
          "action": "Xác minh số điện thoại",
          "logText": "Nhà mạng, SIM và OTP xác nhận quyền sở hữu có thể liên hệ, không phải VoIP."
        },
        {
          "label": "Gắn thông tin xác thực vé",
          "action": "Phát hành vé đã xác minh",
          "logText": "Siêu dữ liệu vé đã được niêm phong bằng kiểm soát chống chuyển nhượng và chữ ký QR."
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
        "ticket-booking": [
          [
            "Dấu vân tay WebGL Canvas",
            "Đối chiếu độ nhiễu chuyển động chuột",
            "Phát hiện trình duyệt headless"
          ],
          [
            "Kiểm tra tín hiệu nhà mạng di động",
            "Xác thực SIM không VoIP",
            "Khớp mã xác minh OTP"
          ],
          [
            "Mã hóa siêu dữ liệu người hâm mộ",
            "Niêm phong khóa chống chuyển nhượng",
            "Đóng dấu chữ ký QR mã hóa"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Thanh toán vé VibePass Arena",
      "badge": "Bảo mật chống bot",
      "step1Description": "Bước 1: Chọn ghế trong sân vận động để giữ chỗ. Hệ thống bảo mật sẽ kiểm tra header của trình duyệt.",
      "seatingMapSelect": "Chọn ghế trên sơ đồ",
      "selectedSeats": "Đã chọn: {seats}",
      "noSeatsSelected": "Đã chọn: chưa chọn ghế",
      "selectSeatError": "Vui lòng chọn ít nhất một ghế để tiếp tục.",
      "holdSeatsCheckout": "Giữ ghế và thanh toán",
      "step2Description": "Bước 2: Giảm thiểu lạm dụng bot. Identra phân tích dấu vân tay thiết bị, tuyến IP và vector di chuyển chuột.",
      "humanOperatorMetric": "Chỉ số thao tác của người thật",
      "confidenceLabel": "Độ tin cậy {score}%",
      "fingerprintIp": "Dấu vân tay IP",
      "latencyVector": "Vector độ trễ",
      "runAntiBotTelemetry": "Chạy xác minh telemetry chống bot",
      "step3Description": "Bước 3: Kiểm tra OTP qua SMS. Xác minh số điện thoại thuộc SIM vật lý để ngăn lạm dụng VoIP ảo.",
      "smsOtpTitle": "OTP SMS VibePass",
      "secureBookingCode": "Mã đặt chỗ bảo mật của bạn là",
      "mobilePhoneNumber": "Số điện thoại di động",
      "validPhoneError": "Vui lòng nhập số điện thoại hợp lệ.",
      "sendCode": "Gửi mã",
      "verificationCodeOtp": "Mã xác minh (OTP)",
      "otpPlaceholder": "ví dụ: 4920",
      "phoneAndOtpFirstError": "Vui lòng nhập số điện thoại và nhận OTP trước.",
      "enterOtpError": "Vui lòng nhập mã OTP.",
      "incorrectOtpError": "Mã OTP xác minh không chính xác.",
      "confirmPurchaseTickets": "Xác nhận và mua vé",
      "ticketPurchaseSealed": "Giao dịch mua vé đã được niêm phong!",
      "successDescription": "Vành đai bảo mật của Identra đã khóa vé thành công, bảo vệ vé khỏi phe vé và lạm dụng trên thị trường thứ cấp.",
      "arenaEntry": "Vé vào VibePass Arena",
      "secureTicket": "Vé bảo mật",
      "seatsLabel": "Ghế:",
      "verifiedFanOnly": "Chỉ dành cho người hâm mộ đã xác minh",
      "footer": "Hệ thống bảo vệ vé chống phe vé"
    },
    "logs": {
      "validationNoSeats": "Xác thực thất bại: chưa chọn ghế.",
      "holdingSeats": "Đang giữ ghế {seats}. Đang kiểm tra tín hiệu trình duyệt...",
      "seatsLocked": "Ghế đã được khóa thành công. Phiên đã xác thực. Theo dõi hành vi khớp mô hình thao tác người dùng chuẩn.",
      "runningTelemetry": "Đang phân tích telemetry trình duyệt nâng cao...",
      "telemetryPassed": "Quét telemetry đạt. Proxy=FALSE, dấu vân tay WebGL đã xác minh, bot status=MITIGATED.",
      "sentOtp": "Đã gửi yêu cầu SMS OTP tới: {phone}",
      "incorrectOtp": "Mã OTP nhập không chính xác: {otp}",
      "verifyingOtp": "Đang xác minh mã SMS OTP...",
      "otpVerified": "Mã OTP đã xác minh. Thông tin nhà mạng SIM khớp hợp đồng vật lý của thuê bao đang hoạt động."
    }
  }
} as const;
