/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TICKET_TRANSFER_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "ticket-transfer",
      "tag": "Relay",
      "title": "Transfer a verified ticket",
      "desc": "Prove original ownership, lock escrow, and transfer a ticket credential safely.",
      "security": "Relay + smart escrow",
      "successResult": "Ticket ownership transferred atomically. The buyer received a verified credential and escrow was released.",
      "steps": [
        {
          "label": "Verify original ownership",
          "action": "Audit ticket owner",
          "logText": "Original purchase key and issuer signature confirmed valid ownership."
        },
        {
          "label": "Lock escrow terms",
          "action": "Initialize escrow",
          "logText": "Relay smart contract locked funds and protected against double spending."
        },
        {
          "label": "Execute transfer",
          "action": "Complete ticket transfer",
          "logText": "Ticket ownership moved to the buyer wallet and escrow settlement was released."
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
        "ticket-transfer": [
          [
            "Original Purchase Key Audit",
            "CA Issuer Signature Decryption",
            "Ticket Ledger Ownership Match"
          ],
          [
            "Relay Smart Contract Init",
            "Atomic Escrow Fund Lock",
            "Double-Spend Integrity Guard"
          ],
          [
            "Atomic Swap Execution",
            "Buyer Wallet Address Update",
            "Escrow Settlement Release"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePass Trust Escrow",
      "badge": "Secure Peer-to-Peer",
      "step1Description": "Step 1: Authenticate ticket seller/owner. Validate digital ownership signatures of Alice Vance.",
      "originalTicketHolder": "Original Ticket Holder",
      "originalBookingId": "Original Booking ID:",
      "ownershipConfirmed": "Ownership signature confirmed",
      "waitingForDecrypt": "Waiting for security decryption",
      "verifyTicketOwnership": "Verify Ticket Ownership",
      "step2Description": "Step 2: Secure escrow. Hold ticketing token and transaction assets in a temporary secure escrow block.",
      "trustEscrowContainer": "Trust escrow container",
      "lockedSealed": "Locked and sealed",
      "awaitingLock": "Awaiting lock",
      "originalAssetState": "Original Asset State",
      "securedContainer": "Secured container",
      "free": "Free",
      "recipientAccountSetup": "Recipient Account Setup",
      "passedRecipient": "Passed (John Doe)",
      "seizeLockEscrow": "Seize & Lock Escrow",
      "step3Description": "Step 3: Instant ticket swap. Identra revokes Alice Vance's QR code and re-issues a new ticket under John Doe.",
      "revokeLabel": "Revoke:",
      "issueToLabel": "Issue to:",
      "revokedState": "Revoked",
      "issuingState": "Issuing",
      "executeSwap": "Execute Instant Secure Swap",
      "ticketTransferComplete": "Ticket Transfer Complete!",
      "successDescription": "Peer-to-peer exchange successful. Alice's old ticket has been revoked, and John Doe is now the official ticket holder.",
      "secureTransactionReceipt": "Secure Transaction Receipt",
      "completed": "Completed",
      "fromOwnerLabel": "From Owner:",
      "toRecipientLabel": "To Recipient:",
      "eventLabel": "Event:",
      "eventName": "Eras World Tour 2026",
      "securedByEscrow": "Secured by Identra Escrow",
      "footer": "Anti-scalping and secure title transfer"
    },
    "logs": {
      "decryptingTicket": "Decrypting ticket ownership certificate for holder: Alice Vance",
      "ownerVerified": "Ticket owner verified: \"Alice Vance\". Crypto signature matched original ticketing ledger perfectly.",
      "lockingEscrow": "Locking VibePass ticket asset in Trust Escrow ledger...",
      "escrowSealed": "Assets escrow sealed. Funds matched. Multisig locking mechanism finalized safely.",
      "executingSwap": "Executing instant cryptographic swap vector...",
      "transferComplete": "Revocation key signed. Re-issuing secure QR under legal holder John Doe. Transfer complete."
    }
  },
  "es": {
    "meta": {
      "id": "ticket-transfer",
      "tag": "Relay",
      "title": "Transferir una entrada verificada",
      "desc": "Prueba propiedad original, bloquea el depósito en garantía y transfiere la credencial de entrada de forma segura.",
      "security": "Relay + depósito inteligente",
      "successResult": "La propiedad de la entrada se transfirió de forma atómica. El comprador recibió una credencial verificada y se liberó el depósito.",
      "steps": [
        {
          "label": "Verificar propiedad original",
          "action": "Auditar propietario de la entrada",
          "logText": "La clave de compra original y la firma del emisor confirmaron propiedad válida."
        },
        {
          "label": "Bloquear términos del depósito",
          "action": "Inicializar depósito en garantía",
          "logText": "El contrato Relay bloqueó fondos y protegió contra doble gasto."
        },
        {
          "label": "Ejecutar transferencia",
          "action": "Completar transferencia de entrada",
          "logText": "La propiedad pasó a la billetera del comprador y se liberó el depósito."
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
        "ticket-transfer": [
          [
            "Auditoría de clave de compra original",
            "Descifrado de firma del emisor CA",
            "Coincidencia de propiedad en libro de entradas"
          ],
          [
            "Inicio de contrato inteligente Relay",
            "Bloqueo de fondos en depósito atómico",
            "Protección de integridad contra doble gasto"
          ],
          [
            "Ejecución de intercambio atómico",
            "Actualización de billetera del comprador",
            "Liberación de liquidación en depósito"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Depósito de confianza VibePass",
      "badge": "Seguro entre particulares",
      "step1Description": "Paso 1: Autentica al vendedor o propietario de la entrada. Valida las firmas digitales de propiedad de Alice Vance.",
      "originalTicketHolder": "Titular original de la entrada",
      "originalBookingId": "ID de reserva original:",
      "ownershipConfirmed": "Firma de propiedad confirmada",
      "waitingForDecrypt": "Esperando descifrado de seguridad",
      "verifyTicketOwnership": "Verificar propiedad de la entrada",
      "step2Description": "Paso 2: Depósito seguro. Retiene el token de la entrada y los activos de la transacción en un bloque temporal de depósito seguro.",
      "trustEscrowContainer": "Contenedor de depósito de confianza",
      "lockedSealed": "Bloqueado y sellado",
      "awaitingLock": "Esperando bloqueo",
      "originalAssetState": "Estado del activo original",
      "securedContainer": "Contenedor asegurado",
      "free": "Libre",
      "recipientAccountSetup": "Configuración de cuenta del destinatario",
      "passedRecipient": "Aprobado (John Doe)",
      "seizeLockEscrow": "Bloquear depósito seguro",
      "step3Description": "Paso 3: Intercambio instantáneo de entrada. Identra revoca el código QR de Alice Vance y emite una entrada nueva a nombre de John Doe.",
      "revokeLabel": "Revocar:",
      "issueToLabel": "Emitir a:",
      "revokedState": "Revocado",
      "issuingState": "Emitiendo",
      "executeSwap": "Ejecutar intercambio seguro instantáneo",
      "ticketTransferComplete": "Transferencia de entrada completada.",
      "successDescription": "El intercambio entre particulares se completó correctamente. La entrada anterior de Alice fue revocada y John Doe ahora es el titular oficial.",
      "secureTransactionReceipt": "Recibo de transacción segura",
      "completed": "Completado",
      "fromOwnerLabel": "Propietaria original:",
      "toRecipientLabel": "Destinatario:",
      "eventLabel": "Evento:",
      "eventName": "Eras World Tour 2026",
      "securedByEscrow": "Protegido por depósito Identra",
      "footer": "Transferencia segura de titularidad y protección anti-reventa"
    },
    "logs": {
      "decryptingTicket": "Descifrando certificado de propiedad del boleto para titular: Alice Vance",
      "ownerVerified": "Propietaria del boleto verificada: \"Alice Vance\". La firma criptográfica coincide con el registro original.",
      "lockingEscrow": "Bloqueando el activo del boleto VibePass en el registro Trust Escrow...",
      "escrowSealed": "Depósito sellado. Fondos coincidentes. Mecanismo multisig finalizado de forma segura.",
      "executingSwap": "Ejecutando vector de intercambio criptográfico instantáneo...",
      "transferComplete": "Clave de revocación firmada. Reemitiendo QR seguro al titular legal John Doe. Transferencia completada."
    }
  },
  "ja": {
    "meta": {
      "id": "ticket-transfer",
      "tag": "Relay",
      "title": "検証済みチケットを譲渡",
      "desc": "元の所有権を証明し、エスクローをロックして、チケット資格情報を安全に譲渡します。",
      "security": "Relay + スマートエスクロー",
      "successResult": "チケット所有権はアトミックに譲渡されました。購入者は検証済み資格情報を受け取り、エスクローは解放されました。",
      "steps": [
        {
          "label": "元の所有権を検証",
          "action": "チケット所有者を監査",
          "logText": "元の購入キーと発行者署名により、有効な所有権を確認しました。"
        },
        {
          "label": "エスクロー条件をロック",
          "action": "エスクローを初期化",
          "logText": "Relayスマートコントラクトが資金をロックし、二重使用を防止しました。"
        },
        {
          "label": "譲渡を実行",
          "action": "チケット譲渡を完了",
          "logText": "チケット所有権は購入者ウォレットへ移り、エスクロー決済が解放されました。"
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
        "ticket-transfer": [
          [
            "元購入キー監査",
            "CA発行者署名復号",
            "チケット台帳所有権照合"
          ],
          [
            "Relayスマートコントラクト初期化",
            "アトミックエスクロー資金ロック",
            "二重使用整合性ガード"
          ],
          [
            "アトミックスワップ実行",
            "購入者ウォレットアドレス更新",
            "エスクロー決済解除"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePass信頼エスクロー",
      "badge": "安全な個人間取引",
      "step1Description": "ステップ1: チケット販売者/所有者を認証します。Alice Vanceのデジタル所有署名を検証します。",
      "originalTicketHolder": "元のチケット所有者",
      "originalBookingId": "元の予約ID:",
      "ownershipConfirmed": "所有署名を確認済み",
      "waitingForDecrypt": "セキュリティ復号を待機中",
      "verifyTicketOwnership": "チケット所有権を確認",
      "step2Description": "ステップ2: 安全なエスクロー。チケットトークンと取引資産を一時的な安全エスクローブロックに保持します。",
      "trustEscrowContainer": "信頼エスクローコンテナ",
      "lockedSealed": "ロック済み・封印済み",
      "awaitingLock": "ロック待機中",
      "originalAssetState": "元資産の状態",
      "securedContainer": "保護コンテナ",
      "free": "未ロック",
      "recipientAccountSetup": "受取人アカウント設定",
      "passedRecipient": "確認済み (John Doe)",
      "seizeLockEscrow": "エスクローを確保してロック",
      "step3Description": "ステップ3: チケットの即時交換。IdentraがAlice VanceのQRコードを失効させ、John Doe名義の新しいチケットを発行します。",
      "revokeLabel": "失効:",
      "issueToLabel": "発行先:",
      "revokedState": "失効済み",
      "issuingState": "発行中",
      "executeSwap": "即時安全交換を実行",
      "ticketTransferComplete": "チケット譲渡が完了しました。",
      "successDescription": "個人間交換が正常に完了しました。Aliceの旧チケットは失効し、John Doeが正式なチケット所有者になりました。",
      "secureTransactionReceipt": "安全な取引レシート",
      "completed": "完了",
      "fromOwnerLabel": "元の所有者:",
      "toRecipientLabel": "受取人:",
      "eventLabel": "イベント:",
      "eventName": "Eras World Tour 2026",
      "securedByEscrow": "Identraエスクローで保護",
      "footer": "転売対策と安全な所有権移転"
    },
    "logs": {
      "decryptingTicket": "保有者 Alice Vance のチケット所有証明書を復号中",
      "ownerVerified": "チケット所有者を検証しました: \"Alice Vance\"。暗号署名は元のチケット台帳と完全に一致しました。",
      "lockingEscrow": "VibePassチケット資産をTrust Escrow台帳にロック中...",
      "escrowSealed": "エスクロー資産を封印しました。資金は一致し、マルチシグロック機構を安全に完了しました。",
      "executingSwap": "即時暗号スワップベクトルを実行中...",
      "transferComplete": "失効キーに署名しました。法的保有者John Doeへ安全なQRを再発行しています。譲渡完了。"
    }
  },
  "de": {
    "meta": {
      "id": "ticket-transfer",
      "tag": "Relay",
      "title": "Verifiziertes Ticket übertragen",
      "desc": "Weisen Sie ursprüngliches Eigentum nach, sperren Sie Treuhandbedingungen und übertragen Sie den Ticketnachweis sicher.",
      "security": "Relay + Smart Escrow",
      "successResult": "Das Ticketeigentum wurde atomar übertragen. Der Käufer erhielt einen verifizierten Nachweis und die Treuhandzahlung wurde freigegeben.",
      "steps": [
        {
          "label": "Ursprüngliches Eigentum prüfen",
          "action": "Ticketinhaber auditieren",
          "logText": "Ursprünglicher Kaufschlüssel und Ausstellersignatur bestätigten gültiges Eigentum."
        },
        {
          "label": "Treuhandbedingungen sperren",
          "action": "Treuhandkonto initialisieren",
          "logText": "Der Relay-Smart-Contract sperrte Mittel und schützte vor doppelter Ausgabe."
        },
        {
          "label": "Übertragung ausführen",
          "action": "Ticketübertragung abschließen",
          "logText": "Das Ticketeigentum wechselte zur Käufer-Wallet und die Treuhandzahlung wurde freigegeben."
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
        "ticket-transfer": [
          [
            "Audit des ursprünglichen Kaufschlüssels",
            "Entschlüsselung der CA-Ausstellersignatur",
            "Abgleich des Ticketeigentums im Ledger"
          ],
          [
            "Relay-Smart-Contract-Initialisierung",
            "Atomare Escrow-Fondssperre",
            "Integritätsschutz gegen Double-Spend"
          ],
          [
            "Ausführung des atomaren Tauschs",
            "Aktualisierung der Käufer-Wallet-Adresse",
            "Freigabe der Escrow-Abwicklung"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "VibePass Vertrauens-Escrow",
      "badge": "Sicherer Peer-to-Peer-Handel",
      "step1Description": "Schritt 1: Authentifizieren Sie den Verkäufer oder Besitzer des Tickets. Validieren Sie die digitalen Eigentumssignaturen von Alice Vance.",
      "originalTicketHolder": "Ursprünglicher Ticketinhaber",
      "originalBookingId": "Ursprüngliche Buchungs-ID:",
      "ownershipConfirmed": "Eigentumssignatur bestätigt",
      "waitingForDecrypt": "Warten auf Sicherheitsentschlüsselung",
      "verifyTicketOwnership": "Ticket-Eigentum verifizieren",
      "step2Description": "Schritt 2: Sicheres Escrow. Ticket-Token und Transaktionswerte werden in einem temporären sicheren Escrow-Block gehalten.",
      "trustEscrowContainer": "Vertrauens-Escrow-Container",
      "lockedSealed": "Gesperrt und versiegelt",
      "awaitingLock": "Wartet auf Sperre",
      "originalAssetState": "Status des ursprünglichen Assets",
      "securedContainer": "Gesicherter Container",
      "free": "Frei",
      "recipientAccountSetup": "Einrichtung des Empfängerkontos",
      "passedRecipient": "Bestanden (John Doe)",
      "seizeLockEscrow": "Escrow sichern und sperren",
      "step3Description": "Schritt 3: Sofortiger Tickettausch. Identra widerruft den QR-Code von Alice Vance und stellt ein neues Ticket auf John Doe aus.",
      "revokeLabel": "Widerrufen:",
      "issueToLabel": "Ausstellen an:",
      "revokedState": "Widerrufen",
      "issuingState": "Wird ausgestellt",
      "executeSwap": "Sicheren Soforttausch ausführen",
      "ticketTransferComplete": "Ticketübertragung abgeschlossen!",
      "successDescription": "Der Peer-to-Peer-Austausch war erfolgreich. Alices altes Ticket wurde widerrufen und John Doe ist jetzt der offizielle Ticketinhaber.",
      "secureTransactionReceipt": "Sicherer Transaktionsbeleg",
      "completed": "Abgeschlossen",
      "fromOwnerLabel": "Vorheriger Besitzer:",
      "toRecipientLabel": "Empfänger:",
      "eventLabel": "Event:",
      "eventName": "Eras World Tour 2026",
      "securedByEscrow": "Geschützt durch Identra Escrow",
      "footer": "Sichere Eigentumsübertragung und Anti-Scalping-Schutz"
    },
    "logs": {
      "decryptingTicket": "Ticket-Eigentumszertifikat für Inhaberin Alice Vance wird entschlüsselt",
      "ownerVerified": "Ticketinhaberin verifiziert: \"Alice Vance\". Kryptografische Signatur stimmt exakt mit dem ursprünglichen Ticketregister überein.",
      "lockingEscrow": "VibePass-Ticketasset wird im Trust-Escrow-Register gesperrt...",
      "escrowSealed": "Escrow-Assets versiegelt. Mittel abgeglichen. Multisig-Sperrmechanismus sicher finalisiert.",
      "executingSwap": "Sofortiger kryptografischer Swap-Vektor wird ausgeführt...",
      "transferComplete": "Widerrufsschlüssel signiert. Sicherer QR wird für rechtmäßigen Inhaber John Doe neu ausgegeben. Übertragung abgeschlossen."
    }
  },
  "vi": {
    "meta": {
      "id": "ticket-transfer",
      "tag": "Relay",
      "title": "Chuyển vé đã xác minh",
      "desc": "Chứng minh quyền sở hữu ban đầu, khóa ký quỹ và chuyển thông tin xác thực vé một cách an toàn.",
      "security": "Relay + ký quỹ thông minh",
      "successResult": "Quyền sở hữu vé đã được chuyển đồng thời. Người mua nhận thông tin xác thực đã xác minh và ký quỹ được giải phóng.",
      "steps": [
        {
          "label": "Xác minh quyền sở hữu ban đầu",
          "action": "Kiểm tra chủ sở hữu vé",
          "logText": "Khóa mua ban đầu và chữ ký bên phát hành xác nhận quyền sở hữu hợp lệ."
        },
        {
          "label": "Khóa điều khoản ký quỹ",
          "action": "Khởi tạo ký quỹ",
          "logText": "Hợp đồng thông minh Relay đã khóa tiền và chống chi tiêu hai lần."
        },
        {
          "label": "Thực hiện chuyển nhượng",
          "action": "Hoàn tất chuyển vé",
          "logText": "Quyền sở hữu vé chuyển sang ví người mua và khoản ký quỹ được giải phóng."
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
        "ticket-transfer": [
          [
            "Kiểm tra khóa mua ban đầu",
            "Giải mã chữ ký bên phát hành CA",
            "Khớp quyền sở hữu trong sổ cái vé"
          ],
          [
            "Khởi tạo hợp đồng thông minh Relay",
            "Khóa quỹ ký quỹ nguyên tử",
            "Bảo vệ toàn vẹn chống chi tiêu hai lần"
          ],
          [
            "Thực thi hoán đổi nguyên tử",
            "Cập nhật địa chỉ ví người mua",
            "Giải phóng thanh toán ký quỹ"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Ký quỹ tin cậy VibePass",
      "badge": "Giao dịch ngang hàng bảo mật",
      "step1Description": "Bước 1: Xác thực người bán hoặc chủ sở hữu vé. Kiểm tra chữ ký sở hữu số của Alice Vance.",
      "originalTicketHolder": "Chủ sở hữu vé ban đầu",
      "originalBookingId": "Mã đặt vé gốc:",
      "ownershipConfirmed": "Đã xác nhận chữ ký sở hữu",
      "waitingForDecrypt": "Đang chờ giải mã bảo mật",
      "verifyTicketOwnership": "Xác minh quyền sở hữu vé",
      "step2Description": "Bước 2: Ký quỹ bảo mật. Giữ token vé và tài sản giao dịch trong khối ký quỹ tạm thời an toàn.",
      "trustEscrowContainer": "Kho ký quỹ tin cậy",
      "lockedSealed": "Đã khóa và niêm phong",
      "awaitingLock": "Đang chờ khóa",
      "originalAssetState": "Trạng thái tài sản gốc",
      "securedContainer": "Đã đưa vào kho bảo mật",
      "free": "Tự do",
      "recipientAccountSetup": "Thiết lập tài khoản người nhận",
      "passedRecipient": "Đã đạt (John Doe)",
      "seizeLockEscrow": "Thiết lập và khóa ký quỹ",
      "step3Description": "Bước 3: Hoán đổi vé tức thời. Identra hủy mã QR của Alice Vance và cấp vé mới dưới tên John Doe.",
      "revokeLabel": "Hủy:",
      "issueToLabel": "Cấp cho:",
      "revokedState": "Đã hủy",
      "issuingState": "Đang cấp",
      "executeSwap": "Thực thi hoán đổi bảo mật tức thời",
      "ticketTransferComplete": "Chuyển nhượng vé hoàn tất!",
      "successDescription": "Giao dịch ngang hàng đã hoàn tất thành công. Vé cũ của Alice đã bị hủy và John Doe hiện là chủ sở hữu vé chính thức.",
      "secureTransactionReceipt": "Biên nhận giao dịch bảo mật",
      "completed": "Hoàn tất",
      "fromOwnerLabel": "Chủ sở hữu cũ:",
      "toRecipientLabel": "Người nhận:",
      "eventLabel": "Sự kiện:",
      "eventName": "Eras World Tour 2026",
      "securedByEscrow": "Được bảo vệ bởi ký quỹ Identra",
      "footer": "Chuyển quyền sở hữu an toàn và chống phe vé"
    },
    "logs": {
      "decryptingTicket": "Đang giải mã chứng chỉ sở hữu vé cho chủ sở hữu: Alice Vance",
      "ownerVerified": "Chủ sở hữu vé đã xác minh: \"Alice Vance\". Chữ ký mật mã khớp hoàn toàn với sổ cái vé gốc.",
      "lockingEscrow": "Đang khóa tài sản vé VibePass trong sổ cái Trust Escrow...",
      "escrowSealed": "Tài sản ký quỹ đã niêm phong. Quỹ đã khớp. Cơ chế khóa đa chữ ký hoàn tất an toàn.",
      "executingSwap": "Đang thực thi vector hoán đổi mật mã tức thời...",
      "transferComplete": "Khóa thu hồi đã ký. Đang phát hành lại QR bảo mật cho chủ sở hữu hợp pháp John Doe. Chuyển nhượng hoàn tất."
    }
  }
} as const;
