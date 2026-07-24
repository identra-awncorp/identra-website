/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS: any = {
  "en": {
    "meta": {
      "id": "bank-account",
      "tag": "Banking",
      "title": "Open a bank account",
      "desc": "Verify identity, screen sanctions, and approve a low-risk customer for financial onboarding.",
      "security": "KYC + AML + liveness",
      "successResult": "The applicant passed document, biometric, and watchlist checks. The account can be opened with a verified identity certificate.",
      "steps": [
        {
          "label": "Submit account application",
          "action": "Choose account type and onboarding path",
          "logText": "Account type, onboarding path, profile data, and required documents normalized."
        },
        {
          "label": "Verify ID credential",
          "action": "Scan ID or validate Identra credential",
          "logText": "Document authenticity or Identra credential claims validated."
        },
        {
          "label": "Complete liveness",
          "action": "Run face liveness check",
          "logText": "3D liveness and face-to-document similarity checks passed."
        },
        {
          "label": "Run AML screening",
          "action": "Screen watchlists and approve account",
          "logText": "OFAC, PEP, and adverse-risk registries returned no blocking matches."
        }
      ]
    },
    "page": {
      "backToScenarios": "Back to Scenarios",
      "liveBadge": "Live interactive demo page",
      "resetDemo": "Reset Demo",
      "clientEmulator": "Client interface emulator",
      "flowTitle": "Bank Account Opening",
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
      "underlyingChecks": "Step details",
      "transactionComplete": "TRANSACTION COMPLETE",
      "waitingInput": "WAITING FOR INPUT",
      "viewVerdict": "View Verdict",
      "runAgain": "Run Again",
      "ledgerTitle": "Secure sandbox log transactions",
      "logs": {
        "launch": "[SYSTEM] Launched live interactive demo page: {title}",
        "environment": "[ENVIRONMENT] Provisioning active frontend sandbox context...",
        "instruction": "[INSTRUCTION] Follow interactive tasks in the left panel to complete bank account onboarding.",
        "reset": "[SYSTEM] Reset interactive demo page: {title}",
        "resetInstruction": "[INSTRUCTION] Follow tasks in the left panel to restart account onboarding.",
        "completedLayer": "Completed onboarding step: {label}",
        "nextTask": "Next task: {action}",
        "allPassed": "All bank account onboarding stages passed successfully!",
        "sealed": "Cryptographic verification credentials signed and sealed."
      },
      "subChecks": {
        "bank-account": [
          [
            "Account type requirement selected",
            "Manual or Identra onboarding path selected",
            "Applicant profile fields validated",
            "Business registration proof handled when required"
          ],
          [
            "Government ID capture or Identra credential available",
            "Document authenticity or credential proof validated",
            "Registry identity match accepted"
          ],
          [
            "Face positioned inside liveness frame",
            "3D depth liveness assessed",
            "Face-to-ID similarity audit completed"
          ],
          [
            "OFAC sanctions registry scanned",
            "Interpol red notices queried",
            "PEP exposure screening completed"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "AeroBank Digital Banking Setup",
      "securedByIdentra": "Secured by Identra",
      "digitalBankingPortal": "AeroBank Digital Banking",
      "onlineApplicationSubtitle": "Online Bank Account Application • Step 1 of 4: Application Profile",
      "fillWithIdentra": "Autofill with Identra",
      "qrAutofillDesc": "Scan QR code with Identra app to instantly populate verified identity profile.",
      "scanQrButton": "Scan QR to Autofill",
      "cryptographicallySecuredBadge": "Data cryptographically secured by Identra ZKP",
      "cryptoVerifiedPill": "Cryptographically Verified",
      "scanQrModalTitle": "Scan Identra QR Code",
      "waitingForScan": "Waiting for scan... {seconds}s",
      "qrModalInstructions": "Open Identra App on your smartphone and scan this QR code to instantly fill your profile.",
      "simulatingScan": "Simulating mobile scan verification...",
      "cancelButton": "Cancel",
      "selectAccountType": "Select Account Type",
      "chooseOnboardingMethod": "Choose Onboarding Method",
      "manualEntry": "Manual entry",
      "manualEntryDesc": "Type applicant details and upload required documents.",
      "useIdentra": "Use Identra",
      "useIdentraDesc": "Scan once to provide verified identity and business credentials.",
      "checkingAccount": "Checking Account",
      "savingsAccount": "High-Yield Savings",
      "businessAccount": "Business Premier",
      "emailAddress": "Email Address",
      "phoneNumber": "Phone Number",
      "bankShieldTitle": "Identra Bank-Grade Identity Shield",
      "bankShieldDesc": "Your personal profile is encrypted in transit and matched against official federal registry indices in real-time.",
      "fullNamePlaceholder": "e.g. Alice Vance",
      "ssnPlaceholder": "000-00-0000",
      "emailPlaceholder": "alice.vance@example.com",
      "phonePlaceholder": "+1 (555) 234-5678",
      "addressPlaceholder": "742 Evergreen Terrace, Springfield",
      "popularBadge": "Popular",
      "apyBadge": "4.85% APY",
      "proBadge": "Pro",
      "fdicInsured": "256-Bit FDIC Insured",
      "passedStatus": "PASSED (0 Match)",
      "pendingStatus": "PENDING",
      "fullName": "Full Name",
      "identityNumberSsn": "Identity Number / SSN",
      "physicalAddress": "Physical Address",
      "businessDetailsTitle": "Business account requirements",
      "businessLegalName": "Legal Business Name",
      "businessLegalNamePlaceholder": "e.g. Aero Logistics LLC",
      "businessRegistrationNumber": "Business Registration Number",
      "businessOwnerIdentityNumber": "Business Owner Identity Number",
      "businessRegistrationNumberPlaceholder": "e.g. 0312345678",
      "businessOwnerIdentityNumberPlaceholder": "Must match the applicant's identity number",
      "identraVerifiedFieldPlaceholder": "Filled from verified VC",
      "businessOwnershipMatched": "Owner identity matched",
      "businessRegistrationLicense": "Business Registration License",
      "businessLicenseUploadHint": "Upload a photo of the registration license",
      "businessLicenseUploaded": "Business registration credential attached",
      "businessCredentialNotice": "Identra compares the identity number from the ID VC with the owner identity number from the business registration VC. Only required attributes are disclosed; no license image is needed.",
      "fullNameError": "Please enter your full name!",
      "identityNumberError": "Please enter your identity number / SSN!",
      "physicalAddressError": "Please enter your physical address!",
      "businessLegalNameError": "Please enter the legal business name.",
      "businessRegistrationNumberError": "Please enter the business registration number.",
      "businessOwnerIdentityNumberError": "Please enter the business owner's identity number.",
      "businessOwnershipMismatchError": "The business owner's identity number does not match the applicant's identity number.",
      "businessLicenseError": "Please upload a business registration license image.",
      "identraScanRequiredError": "Please scan with Identra before submitting this flow.",
      "submitRegistrationProfile": "Submit Registration Profile",
      "step2Description": "Step 2: Scan a government passport/ID manually, or let Identra validate the verified credential from the QR flow.",
      "businessVerificationTitle": "Business application verification",
      "businessVerificationIdentraDescription": "Step 2: Verify the ID VC and business registration VC, then cryptographically confirm that the applicant is the business owner.",
      "businessVerificationManualDescription": "Step 2: Verify identity and the uploaded business registration license, then match the applicant to the registered owner.",
      "businessVerificationIdentraFlow": "Identra flow · DID and VC cryptographic verification",
      "businessVerificationManualFlow": "Manual flow · Registry and document verification",
      "businessVerificationStartedLog": "Starting the three-stage business application verification...",
      "businessVerificationSuccess": "Identity, business registration license, and business ownership verification completed successfully.",
      "businessVerificationSteps": [
        {
          "label": "Verify identity information",
          "identraDetails": [
            "Retrieving DID document at did:certnet:0x8a823f...0",
            "DID document resolved; proceeding with cryptographic verification",
            "Cryptographic verification succeeded"
          ],
          "manualDetails": [
            "Matching identity information against the national database",
            "Identity data matched successfully"
          ]
        },
        {
          "label": "Verify business registration license",
          "identraDetails": [
            "Retrieving the business registration VC from the Identra wallet",
            "Verifying the VC signature and revocation status",
            "Business registration VC is valid"
          ],
          "manualDetails": [
            "Extracting information from the uploaded business registration license",
            "Matching the business registration number against the business registry",
            "Business registration license is valid"
          ]
        },
        {
          "label": "Match identity to business license",
          "identraDetails": [
            "Extracting identity numbers from the ID VC and business registration VC",
            "Comparing both identity numbers with cryptographic proof",
            "The applicant identity matches the registered business owner"
          ],
          "manualDetails": [
            "Comparing the applicant identity number with the registered owner's identity number",
            "Business owner information matched successfully"
          ]
        }
      ],
      "step3Description": "Step 3: Passive 3D Facial Liveness. Identra maps facial depth, active eye trackers, and screen reflections to block photos/deepfakes.",
      "analyzing3dBiometrics": "Analyzing 3D Biometrics...",
      "positionFaceInsideOval": "Position face inside oval",
      "verifyBiometricLiveness": "Verify Biometric Liveness",
      "step4Description": "Step 4: Scan international AML (Anti-Money Laundering) registries, sanctions list (OFAC, Interpol, PEP). Ensure zero illicit financial exposure.",
      "registryScreening": "Registry Screening",
      "onlineConnection": "Online connection",
      "ofacSanctionsList": "1. OFAC Sanctions List:",
      "interpolRedNotices": "2. Interpol Red Notices:",
      "politicallyExposedPersons": "3. Politically Exposed Persons (PEP):",
      "executeAmlRegistryChecks": "Execute AML Registry Checks",
      "govIdVerifiedSuccess": "Government ID Verified Successfully!",
      "livenessVerifiedSuccess": "3D Biometric Liveness Verified Successfully!",
      "amlRunningTitle": "Automated Server-Side AML & PEP Screening in progress...",
      "amlFailedTitle": "AML Risk Screening Failed (High Risk Watchlist Match)",
      "amlFailedDesc": "Flagged in OFAC/PEP High Financial Risk Registry for phone number 0968268030.",
      "retryButton": "Retry Screening",
      "issueCardButton": "Claim Debit Card",
      "physicalCardDeliveryNotice": "Your physical AeroBank card will be delivered to your address in 2-5 business days.",
      "identraVcClaimNotice": "Scan the QR code below to receive your card as a Verifiable Credential (VC) directly into your SSI wallet.",
      "claimVcQrTitle": "Scan QR Code to Receive Card in SSI Wallet",
      "accountApproved": "Account Approved!",
      "identityBoundDescription": "Your digital identity has been sealed and bound to AeroBank. Your virtual Debit Card has been issued.",
      "aeroBank": "AeroBank",
      "securityFooter": "AES-256 fully authenticated end-to-end sandbox sessions"
    },
    "logs": {
      "submittingProfile": "Submitting profile: \"{name}\"",
      "profileReceived": "Profile received: name=\"{name}\", ssn=\"{ssn}\". Validating registry signature...",
      "businessLicenseSubmitted": "Manual business data accepted: registration={registrationNumber}; owner identity matched the applicant. Registration license image attached: {fileName}.",
      "businessCredentialResolved": "Business VC verified: {businessName}, registration={registrationNumber}. The owner identity matched the applicant's ID VC; no license image was disclosed.",
      "initializingLiveness": "Initializing 3D facial liveness scan...",
      "facialRecognitionComplete": "Facial recognition matching completed: score=99.8%, face_geometry_match=TRUE, liveness=PASSED",
      "queryingWatchlists": "Querying financial risk sanction watchlists...",
      "amlCheckComplete": "AML check complete. Database search returned 0 matching names for \"{name}\". Risk Level: Low."
    },
    "flowUi": {
      "oneClickAutofillBadge": "1-Click Autofill",
      "cryptoProofVerifiedLabel": "ZKP-ECDSA proof verified",
      "qrName": "Alice Vance",
      "qrIdentityNumber": "987-65-4321",
      "qrEmail": "alice.vance@identra.com",
      "qrPhone": "+1 (555) 234-5678",
      "qrAddress": "742 Evergreen Terrace, Springfield",
      "qrBusinessName": "Aero Logistics LLC",
      "qrBusinessRegistrationNumber": "US-CA-2024-0312345678",
      "qrBusinessOwnerIdentityNumber": "987-65-4321",
      "qrScanStartedLog": "Starting Identra QR scan session on mobile device...",
      "qrScanSuccessLog": "Identra QR scan succeeded - personal data is protected by ZKP-ECDSA cryptographic proof.",
      "businessCredentialVerifiedLog": "Identra matched the owner identity in the business VC to the applicant's ID VC without disclosing a license image.",
      "govIdSuccessLog": "Government-issued ID verified successfully. (Identra National Registry Matching 100%)",
      "amlStartedLog": "Server automation started AML sanctions and PEP watchlist screening...",
      "amlFailedLog": "AML risk screening failed: high financial risk watchlist match detected (OFAC / PEP flagged).",
      "amlPassedLog": "AML screening succeeded: no money laundering risk or sanctions list match detected.",
      "failedMatchStatus": "FAILED MATCH",
      "pepFlaggedStatus": "PEP FLAGGED",
      "amlPassedTitle": "AML & PEP screening complete",
      "amlPassedDescription": "No money laundering or legal risk was found across international registries.",
      "physicalCardTitle": "Physical card delivery",
      "qrHandshakeSubtitle": "Identra eID instant handshake",
      "vcBadgeLabel": "Identra SSI Verifiable Credential (VC)",
      "cardHolderLabel": "CARD HOLDER",
      "cardNumberLabel": "CARD NUMBER",
      "visaPlatinumLabel": "VISA PLATINUM",
      "defaultHolderName": "ALICE VANCE"
    }
  },
  "es": {
    "meta": {
      "id": "bank-account",
      "tag": "Banca",
      "title": "Abrir una cuenta bancaria",
      "desc": "Verifica identidad, revisa sanciones y aprueba a un cliente de bajo riesgo para el alta financiera.",
      "security": "KYC + AML + prueba de vida",
      "successResult": "El solicitante superó las comprobaciones de documento, biometría y listas de control. La cuenta puede abrirse con un certificado de identidad verificado.",
      "steps": [
        {
          "label": "Enviar solicitud de cuenta",
          "action": "Elegir tipo de cuenta y método de alta",
          "logText": "Tipo de cuenta, método de alta, datos del perfil y documentos requeridos normalizados."
        },
        {
          "label": "Verificar credencial de ID",
          "action": "Escanear ID o validar credencial Identra",
          "logText": "Autenticidad del documento o claims de credencial Identra validados."
        },
        {
          "label": "Completar prueba de vida",
          "action": "Ejecutar verificación facial de vida",
          "logText": "La prueba de vida 3D y la similitud rostro-documento fueron aprobadas."
        },
        {
          "label": "Ejecutar filtrado AML",
          "action": "Revisar watchlists y aprobar cuenta",
          "logText": "OFAC, PEP y registros de riesgo no devolvieron coincidencias bloqueantes."
        }
      ]
    },
    "page": {
      "backToScenarios": "Volver a escenarios",
      "liveBadge": "Página demo interactiva en vivo",
      "resetDemo": "Reiniciar demo",
      "clientEmulator": "Emulador de interfaz del cliente",
      "flowTitle": "Apertura de cuenta",
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
      "underlyingChecks": "Detalles del paso",
      "transactionComplete": "TRANSACCIÓN COMPLETA",
      "waitingInput": "ESPERANDO ENTRADA",
      "viewVerdict": "Ver dictamen",
      "runAgain": "Ejecutar de nuevo",
      "ledgerTitle": "Transacciones del registro seguro del sandbox",
      "logs": {
        "launch": "[SYSTEM] Página demo interactiva iniciada: {title}",
        "environment": "[ENVIRONMENT] Preparando el contexto activo de interfaz simulada...",
        "instruction": "[INSTRUCTION] Sigue las tareas del panel izquierdo para completar el alta de la cuenta bancaria.",
        "reset": "[SYSTEM] Página demo interactiva reiniciada: {title}",
        "resetInstruction": "[INSTRUCTION] Sigue las tareas del panel izquierdo para reiniciar el alta de la cuenta.",
        "completedLayer": "Paso de alta completado: {label}",
        "nextTask": "Siguiente tarea: {action}",
        "allPassed": "Todas las etapas de alta de cuenta bancaria se aprobaron correctamente.",
        "sealed": "Credenciales criptográficas de verificación firmadas y selladas."
      },
      "subChecks": {
        "bank-account": [
          [
            "Requisito del tipo de cuenta seleccionado",
            "Ruta manual o Identra seleccionada",
            "Campos del perfil del solicitante validados",
            "Prueba de registro empresarial gestionada si aplica"
          ],
          [
            "Captura de ID oficial o credencial Identra disponible",
            "Autenticidad documental o prueba de credencial validada",
            "Coincidencia de identidad en registro aceptada"
          ],
          [
            "Rostro posicionado dentro del marco de vida",
            "Prueba de vida 3D evaluada",
            "Auditoría de similitud rostro-ID completada"
          ],
          [
            "Registro de sanciones OFAC escaneado",
            "Alertas rojas de Interpol consultadas",
            "Filtrado de exposición PEP completado"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Configuración de banca digital AeroBank",
      "securedByIdentra": "Protegido por Identra",
      "digitalBankingPortal": "Banca Digital AeroBank",
      "onlineApplicationSubtitle": "Solicitud de cuenta bancaria en línea • Paso 1 de 4: Perfil de solicitud",
      "fillWithIdentra": "Completar datos con Identra",
      "qrAutofillDesc": "Escanee el código QR con Identra para completar su perfil de identidad verificado.",
      "scanQrButton": "Escanear QR para auto-completar",
      "cryptographicallySecuredBadge": "Datos asegurados criptográficamente por Identra ZKP",
      "cryptoVerifiedPill": "Verificado Criptográficamente",
      "scanQrModalTitle": "Escanear código QR Identra",
      "waitingForScan": "Esperando escaneo... {seconds}s",
      "qrModalInstructions": "Abra la aplicación Identra en su teléfono y escanee este código QR para completar su perfil.",
      "simulatingScan": "Simulando verificación de escaneo móvil...",
      "cancelButton": "Cancelar",
      "selectAccountType": "Seleccionar tipo de cuenta",
      "chooseOnboardingMethod": "Elegir método de alta",
      "manualEntry": "Entrada manual",
      "manualEntryDesc": "Escribe los datos del solicitante y sube los documentos requeridos.",
      "useIdentra": "Usar Identra",
      "useIdentraDesc": "Escanea una vez para aportar identidad y credenciales empresariales verificadas.",
      "checkingAccount": "Cuenta corriente",
      "savingsAccount": "Cuenta de ahorro",
      "businessAccount": "Cuenta empresarial",
      "emailAddress": "Correo electrónico",
      "phoneNumber": "Número de teléfono",
      "bankShieldTitle": "Protección de identidad de nivel bancario Identra",
      "bankShieldDesc": "Su perfil personal se encripta en tránsito y se coteja con registros oficiales en tiempo real.",
      "fullNamePlaceholder": "ej. Alice Vance",
      "ssnPlaceholder": "000-00-0000",
      "emailPlaceholder": "alice.vance@ejemplo.com",
      "phonePlaceholder": "+34 612 345 678",
      "addressPlaceholder": "742 Avenida Principal, Madrid",
      "popularBadge": "Popular",
      "apyBadge": "4.85% APY",
      "proBadge": "Pro",
      "fdicInsured": "Asegurado por FDIC 256-Bit",
      "passedStatus": "APROBADO (0 Coincidencias)",
      "pendingStatus": "PENDIENTE",
      "fullName": "Nombre completo",
      "businessDetailsTitle": "Requisitos de cuenta empresarial",
      "businessLegalName": "Nombre legal de la empresa",
      "businessLegalNamePlaceholder": "p. ej. Aero Logistics LLC",
      "businessRegistrationNumber": "Número de registro empresarial",
      "businessOwnerIdentityNumber": "Número de identidad del propietario",
      "businessRegistrationNumberPlaceholder": "p. ej. 0312345678",
      "businessOwnerIdentityNumberPlaceholder": "Debe coincidir con la identidad del solicitante",
      "identraVerifiedFieldPlaceholder": "Completado desde una VC verificada",
      "businessOwnershipMatched": "Identidad del propietario validada",
      "businessRegistrationLicense": "Licencia de registro empresarial",
      "businessLicenseUploadHint": "Sube una foto de la licencia de registro",
      "businessLicenseUploaded": "Credencial de registro empresarial adjunta",
      "businessCredentialNotice": "Identra compara el número de identidad de la VC de identidad con el del propietario en la VC de registro empresarial. Solo se revelan los atributos necesarios; no se requiere una imagen de la licencia.",
      "identityNumberSsn": "Número de identidad / SSN",
      "physicalAddress": "Dirección física",
      "fullNameError": "Introduce tu nombre completo.",
      "businessLegalNameError": "Introduce el nombre legal de la empresa.",
      "businessRegistrationNumberError": "Introduce el número de registro empresarial.",
      "businessOwnerIdentityNumberError": "Introduce el número de identidad del propietario.",
      "businessOwnershipMismatchError": "El número de identidad del propietario no coincide con el del solicitante.",
      "businessLicenseError": "Sube una imagen de la licencia de registro empresarial.",
      "identraScanRequiredError": "Escanea con Identra antes de enviar este flujo.",
      "identityNumberError": "Introduce tu número de identidad / SSN.",
      "physicalAddressError": "Introduce tu dirección física.",
      "submitRegistrationProfile": "Enviar perfil de registro",
      "step2Description": "Paso 2: Escanea manualmente un pasaporte/ID oficial, o deja que Identra valide la credencial verificada del flujo QR.",
      "businessVerificationTitle": "Verificación de la solicitud empresarial",
      "businessVerificationIdentraDescription": "Paso 2: Verifica la VC de identidad y la VC de registro empresarial, y confirma criptográficamente que el solicitante es el propietario.",
      "businessVerificationManualDescription": "Paso 2: Verifica la identidad y la licencia empresarial cargada, y vincula al solicitante con el propietario registrado.",
      "businessVerificationIdentraFlow": "Flujo Identra · Verificación criptográfica DID y VC",
      "businessVerificationManualFlow": "Flujo manual · Verificación documental y registral",
      "businessVerificationStartedLog": "Iniciando la verificación empresarial en tres etapas...",
      "businessVerificationSuccess": "La identidad, la licencia empresarial y la titularidad se verificaron correctamente.",
      "businessVerificationSteps": [
        {
          "label": "Verificar información de identidad",
          "identraDetails": [
            "Recuperando el documento DID en did:certnet:0x8a823f...0",
            "Documento DID resuelto; iniciando la verificación criptográfica",
            "Verificación criptográfica completada"
          ],
          "manualDetails": [
            "Contrastando la identidad con la base de datos nacional",
            "Los datos de identidad coinciden"
          ]
        },
        {
          "label": "Verificar licencia de registro empresarial",
          "identraDetails": [
            "Recuperando la VC de registro empresarial desde la cartera Identra",
            "Verificando la firma y el estado de revocación de la VC",
            "La VC de registro empresarial es válida"
          ],
          "manualDetails": [
            "Extrayendo datos de la licencia de registro cargada",
            "Contrastando el número empresarial con el registro mercantil",
            "La licencia de registro empresarial es válida"
          ]
        },
        {
          "label": "Vincular identidad con licencia empresarial",
          "identraDetails": [
            "Extrayendo números de identidad de ambas VC",
            "Comparando ambos números mediante prueba criptográfica",
            "La identidad del solicitante coincide con el propietario registrado"
          ],
          "manualDetails": [
            "Comparando la identidad del solicitante con la del propietario registrado",
            "La información del propietario coincide"
          ]
        }
      ],
      "step3Description": "Paso 3: Prueba pasiva de vida facial 3D. Identra mapea profundidad facial, seguimiento ocular y reflejos de pantalla para bloquear fotos o deepfakes.",
      "analyzing3dBiometrics": "Analizando biometría 3D...",
      "positionFaceInsideOval": "Coloca el rostro dentro del óvalo",
      "verifyBiometricLiveness": "Verificar prueba biométrica de vida",
      "step4Description": "Paso 4: Escanea registros internacionales AML, listas de sanciones (OFAC, Interpol, PEP) y asegura exposición financiera ilícita cero.",
      "registryScreening": "Revisión de registros",
      "onlineConnection": "Conexión en línea",
      "ofacSanctionsList": "1. Lista de sanciones OFAC:",
      "interpolRedNotices": "2. Alertas rojas de Interpol:",
      "politicallyExposedPersons": "3. Identras expuestas políticamente (PEP):",
      "executeAmlRegistryChecks": "Ejecutar verificaciones AML",
      "accountApproved": "Cuenta aprobada.",
      "identityBoundDescription": "Tu identidad digital se selló y vinculó con AeroBank. Se emitió tu tarjeta de débito virtual.",
      "aeroBank": "AeroBank",
      "securityFooter": "Sesiones sandbox cifradas de extremo a extremo con AES-256"
    },
    "logs": {
      "submittingProfile": "Enviando perfil: \"{name}\"",
      "profileReceived": "Perfil recibido: nombre=\"{name}\", SSN=\"{ssn}\". Validando firma del registro...",
      "businessLicenseSubmitted": "Datos empresariales manuales aceptados: registro={registrationNumber}; la identidad del propietario coincide con el solicitante. Imagen de licencia adjunta: {fileName}.",
      "businessCredentialResolved": "VC empresarial verificada: {businessName}, registro={registrationNumber}. La identidad del propietario coincide con la VC de identidad del solicitante; no se reveló ninguna imagen de la licencia.",
      "initializingLiveness": "Iniciando escaneo de prueba de vida facial 3D...",
      "facialRecognitionComplete": "Coincidencia biométrica completada: score=99,8%, face_geometry_match=TRUE, liveness=APROBADA",
      "queryingWatchlists": "Consultando listas de sanciones y riesgo financiero...",
      "amlCheckComplete": "Revisión AML completada. La búsqueda devolvió 0 nombres coincidentes para \"{name}\". Nivel de riesgo: Bajo."
    },
    "flowUi": {
      "oneClickAutofillBadge": "Autorrelleno 1 clic",
      "cryptoProofVerifiedLabel": "Prueba ZKP-ECDSA verificada",
      "qrName": "Alice Vance",
      "qrIdentityNumber": "987-65-4321",
      "qrEmail": "alice.vance@identra.com",
      "qrPhone": "+1 (555) 234-5678",
      "qrAddress": "742 Evergreen Terrace, Springfield",
      "qrBusinessName": "Aero Logistics LLC",
      "qrBusinessRegistrationNumber": "US-CA-2024-0312345678",
      "qrBusinessOwnerIdentityNumber": "987-65-4321",
      "qrScanStartedLog": "Iniciando sesión de escaneo QR Identra en el dispositivo móvil...",
      "qrScanSuccessLog": "Escaneo QR de Identra correcto - datos personales protegidos por prueba ZKP-ECDSA.",
      "businessCredentialVerifiedLog": "Identra vinculó la identidad del propietario de la VC empresarial con la VC de identidad del solicitante sin revelar una imagen de la licencia.",
      "govIdSuccessLog": "Documento oficial verificado correctamente. (Identra National Registry Matching 100%)",
      "amlStartedLog": "El servidor inició revisión AML, sanciones y watchlist PEP...",
      "amlFailedLog": "Revisión AML fallida: coincidencia en lista de alto riesgo financiero (OFAC / PEP flagged).",
      "amlPassedLog": "Revisión AML correcta: no se detectó riesgo de lavado de dinero ni sanciones.",
      "failedMatchStatus": "COINCIDENCIA FALLIDA",
      "pepFlaggedStatus": "PEP MARCADO",
      "amlPassedTitle": "Revisión AML & PEP completa",
      "amlPassedDescription": "No se encontró riesgo de lavado de dinero ni riesgo legal en registros internacionales.",
      "physicalCardTitle": "Entrega de tarjeta física",
      "qrHandshakeSubtitle": "Handshake instantáneo Identra eID",
      "vcBadgeLabel": "Credencial verificable SSI de Identra (VC)",
      "cardHolderLabel": "TITULAR",
      "cardNumberLabel": "NÚMERO DE TARJETA",
      "visaPlatinumLabel": "VISA PLATINUM",
      "defaultHolderName": "ALICE VANCE"
    }
  },
  "ja": {
    "meta": {
      "id": "bank-account",
      "tag": "銀行",
      "title": "銀行口座を開設",
      "desc": "本人確認、制裁リスト確認、低リスク顧客の金融オンボーディング承認を行います。",
      "security": "KYC + AML + ライブネス",
      "successResult": "申請者は書類、生体認証、ウォッチリスト確認に合格しました。確認済み本人証明で口座開設を進められます。",
      "steps": [
        {
          "label": "口座申込を送信",
          "action": "口座種別とオンボーディング方法を選択",
          "logText": "口座種別、オンボーディング方法、プロフィール情報、必要書類を正規化しました。"
        },
        {
          "label": "ID認証情報を検証",
          "action": "IDをスキャンまたはIdentra認証情報を検証",
          "logText": "書類真正性またはIdentra認証情報のクレームを検証しました。"
        },
        {
          "label": "ライブネス完了",
          "action": "顔ライブネスチェックを実行",
          "logText": "3Dライブネスと顔・書類類似度チェックに合格しました。"
        },
        {
          "label": "AML審査を実行",
          "action": "ウォッチリスト審査と口座承認",
          "logText": "OFAC、PEP、リスクレジストリでブロック対象の一致はありませんでした。"
        }
      ]
    },
    "page": {
      "backToScenarios": "シナリオ一覧に戻る",
      "liveBadge": "ライブインタラクティブデモページ",
      "resetDemo": "デモをリセット",
      "clientEmulator": "クライアント画面エミュレーター",
      "flowTitle": "口座開設フロー",
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
      "underlyingChecks": "ステップ詳細",
      "transactionComplete": "取引完了",
      "waitingInput": "入力待機中",
      "viewVerdict": "判定を見る",
      "runAgain": "もう一度実行",
      "ledgerTitle": "安全なSandboxログ取引",
      "logs": {
        "launch": "[SYSTEM] ライブインタラクティブデモを起動しました: {title}",
        "environment": "[ENVIRONMENT] アクティブなフロントエンドSandbox環境を準備中...",
        "instruction": "[INSTRUCTION] 左側パネルのタスクを実行して銀行口座オンボーディングを完了してください。",
        "reset": "[SYSTEM] インタラクティブデモをリセットしました: {title}",
        "resetInstruction": "[INSTRUCTION] 左側パネルのタスクを実行して口座オンボーディングを再開してください。",
        "completedLayer": "オンボーディングステップ完了: {label}",
        "nextTask": "次のタスク: {action}",
        "allPassed": "銀行口座オンボーディングの全ステージに合格しました。",
        "sealed": "暗号化された検証資格情報が署名され、封印されました。"
      },
      "subChecks": {
        "bank-account": [
          [
            "口座種別の要件を選択",
            "手動またはIdentraのオンボーディング方法を選択",
            "申請者プロフィール項目を検証",
            "必要に応じて事業登録証明を処理"
          ],
          [
            "政府発行IDまたはIdentra認証情報を取得",
            "書類真正性または認証情報証明を検証",
            "レジストリ上の本人一致を承認"
          ],
          [
            "顔をライブネス枠内に配置",
            "3D深度ライブネスを評価",
            "顔とIDの類似度監査を完了"
          ],
          [
            "OFAC制裁レジストリをスキャン",
            "Interpol赤手配を照会",
            "PEPエクスポージャー審査を完了"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "AeroBank デジタル口座開設",
      "securedByIdentra": "Identraで保護済み",
      "digitalBankingPortal": "AeroBank デジタルバンキング",
      "onlineApplicationSubtitle": "オンライン銀行口座申込 • ステップ 1 / 4: 申込プロフィール",
      "fillWithIdentra": "Identraで自動入力",
      "qrAutofillDesc": "IdentraアプリでQRコードをスキャンして検証済み身元情報を自動入力。",
      "scanQrButton": "QRスキャンで自動入力",
      "cryptographicallySecuredBadge": "Identra 暗号技術により保護されたデータ",
      "cryptoVerifiedPill": "暗号検証済み",
      "scanQrModalTitle": "Identra QRコードをスキャン",
      "waitingForScan": "スキャン待ち... {seconds}秒",
      "qrModalInstructions": "スマートフォンでIdentraアプリを開き、このQRコードをスキャンしてください。",
      "simulatingScan": "モバイル受託スキャンを検証中...",
      "cancelButton": "キャンセル",
      "selectAccountType": "口座種別の選択",
      "chooseOnboardingMethod": "オンボーディング方法を選択",
      "manualEntry": "手動入力",
      "manualEntryDesc": "申請者情報を入力し、必要書類をアップロードします。",
      "useIdentra": "Identraを使用",
      "useIdentraDesc": "1回のスキャンで検証済みの本人確認情報と事業者認証情報を提供します。",
      "checkingAccount": "普通預金口座",
      "savingsAccount": "高金利普通預金",
      "businessAccount": "法人口座",
      "emailAddress": "メールアドレス",
      "phoneNumber": "電話番号",
      "bankShieldTitle": "Identra 銀行グレードの身元保護シールド",
      "bankShieldDesc": "個人情報は転送中に暗号化され、公式データベースとリアルタイムで照合されます。",
      "fullNamePlaceholder": "例: 山田 太郎",
      "ssnPlaceholder": "000-0000-0000",
      "emailPlaceholder": "alice.vance@example.com",
      "phonePlaceholder": "090-1234-5678",
      "addressPlaceholder": "東京都千代田区丸の内 1-1-1",
      "popularBadge": "人気",
      "apyBadge": "年利 4.85%",
      "proBadge": "プロ",
      "fdicInsured": "256ビット FDIC保険適用",
      "passedStatus": "合格 (該当0件)",
      "pendingStatus": "確認中",
      "fullName": "氏名",
      "businessDetailsTitle": "事業用口座の要件",
      "businessLegalName": "法人正式名称",
      "businessLegalNamePlaceholder": "例: Aero Logistics LLC",
      "businessRegistrationNumber": "事業者登録番号",
      "businessOwnerIdentityNumber": "事業主の本人確認番号",
      "businessRegistrationNumberPlaceholder": "例: 0312345678",
      "businessOwnerIdentityNumberPlaceholder": "申請者の識別番号と一致する必要があります",
      "identraVerifiedFieldPlaceholder": "検証済みVCから入力",
      "businessOwnershipMatched": "事業主の本人確認一致",
      "businessRegistrationLicense": "事業登録証",
      "businessLicenseUploadHint": "登録証の写真をアップロード",
      "businessLicenseUploaded": "事業登録認証情報が添付されました",
      "businessCredentialNotice": "Identraは本人確認VCの識別番号と事業登録VCの事業主識別番号を照合します。必要な属性のみが開示され、登録証の画像は不要です。",
      "identityNumberSsn": "ID番号 / SSN",
      "physicalAddress": "現住所",
      "fullNameError": "氏名を入力してください。",
      "businessLegalNameError": "法人正式名称を入力してください。",
      "businessRegistrationNumberError": "事業者登録番号を入力してください。",
      "businessOwnerIdentityNumberError": "事業主の本人確認番号を入力してください。",
      "businessOwnershipMismatchError": "事業主の本人確認番号が申請者の本人確認番号と一致しません。",
      "businessLicenseError": "事業登録証の画像をアップロードしてください。",
      "identraScanRequiredError": "このフローを送信する前にIdentraでスキャンしてください。",
      "identityNumberError": "ID番号 / SSNを入力してください。",
      "physicalAddressError": "現住所を入力してください。",
      "submitRegistrationProfile": "登録プロフィールを送信",
      "step2Description": "ステップ2: 政府発行のパスポート/IDを手動でスキャンするか、QRフローの検証済み認証情報をIdentraに検証させます。",
      "businessVerificationTitle": "法人申請の検証",
      "businessVerificationIdentraDescription": "ステップ2: 本人確認VCと事業登録VCを検証し、申請者が事業主であることを暗号学的に確認します。",
      "businessVerificationManualDescription": "ステップ2: 本人情報とアップロードされた事業登録証を検証し、申請者と登録事業主を照合します。",
      "businessVerificationIdentraFlow": "Identraフロー · DID/VC暗号検証",
      "businessVerificationManualFlow": "手動フロー · 登録情報と書類の検証",
      "businessVerificationStartedLog": "3段階の法人申請検証を開始しています...",
      "businessVerificationSuccess": "本人情報、事業登録証、事業主との一致確認が完了しました。",
      "businessVerificationSteps": [
        {
          "label": "本人情報を検証",
          "identraDetails": [
            "did:certnet:0x8a823f...0 からDIDドキュメントを取得中",
            "DIDドキュメントを解決し、暗号検証を開始",
            "暗号検証に成功"
          ],
          "manualDetails": [
            "本人情報を国のデータベースと照合中",
            "本人情報が一致"
          ]
        },
        {
          "label": "事業登録証を検証",
          "identraDetails": [
            "Identraウォレットから事業登録VCを取得中",
            "VCの署名と失効状態を検証中",
            "事業登録VCは有効"
          ],
          "manualDetails": [
            "アップロードされた事業登録証から情報を抽出中",
            "事業者登録番号を事業登録簿と照合中",
            "事業登録証は有効"
          ]
        },
        {
          "label": "本人情報と事業登録証を照合",
          "identraDetails": [
            "本人確認VCと事業登録VCから識別番号を抽出中",
            "暗号学的証明により識別番号を比較中",
            "申請者の本人情報が登録事業主と一致"
          ],
          "manualDetails": [
            "申請者の識別番号と登録事業主の識別番号を比較中",
            "事業主情報が一致"
          ]
        }
      ],
      "step3Description": "ステップ3: パッシブ3D顔ライブネス。Identraが顔の奥行き、目の動き、画面反射を分析して写真やディープフェイクを防ぎます。",
      "analyzing3dBiometrics": "3D生体認証を分析中...",
      "positionFaceInsideOval": "顔を楕円の中に合わせてください",
      "verifyBiometricLiveness": "生体ライブネスを確認",
      "step4Description": "ステップ4: 国際AMLレジストリ、制裁リスト（OFAC、Interpol、PEP）をスキャンし、不正金融リスクがないことを確認します。",
      "registryScreening": "レジストリ審査",
      "onlineConnection": "オンライン接続",
      "ofacSanctionsList": "1. OFAC制裁リスト:",
      "interpolRedNotices": "2. Interpol赤手配:",
      "politicallyExposedPersons": "3. 政治的に重要な公人（PEP）:",
      "executeAmlRegistryChecks": "AMLレジストリ確認を実行",
      "accountApproved": "口座が承認されました。",
      "identityBoundDescription": "あなたのデジタルIDはAeroBankに安全に紐づけられました。仮想デビットカードが発行されました。",
      "aeroBank": "AeroBank",
      "securityFooter": "AES-256で完全認証されたエンドツーエンドのサンドボックスセッション"
    },
    "logs": {
      "submittingProfile": "プロフィールを送信中: \"{name}\"",
      "profileReceived": "プロフィールを受信しました: name=\"{name}\", ssn=\"{ssn}\"。登録署名を検証中...",
      "businessLicenseSubmitted": "手動入力した事業情報を受理しました: 登録番号={registrationNumber}、事業主識別番号は申請者と一致。事業登録証画像={fileName}。",
      "businessCredentialResolved": "事業VCを検証しました: {businessName}、登録番号={registrationNumber}。事業主の識別番号は申請者の本人確認VCと一致し、登録証の画像は開示されていません。",
      "initializingLiveness": "3D顔ライブネススキャンを開始中...",
      "facialRecognitionComplete": "顔認識照合が完了しました: score=99.8%, face_geometry_match=TRUE, liveness=合格",
      "queryingWatchlists": "金融リスク制裁ウォッチリストを照会中...",
      "amlCheckComplete": "AMLチェック完了。\"{name}\" に一致する名前は0件でした。リスクレベル: 低。"
    },
    "flowUi": {
      "oneClickAutofillBadge": "1クリック自動入力",
      "cryptoProofVerifiedLabel": "ZKP-ECDSA証明を検証済み",
      "qrName": "Alice Vance",
      "qrIdentityNumber": "987-65-4321",
      "qrEmail": "alice.vance@identra.com",
      "qrPhone": "+1 (555) 234-5678",
      "qrAddress": "742 Evergreen Terrace, Springfield",
      "qrBusinessName": "Aero Logistics LLC",
      "qrBusinessRegistrationNumber": "US-CA-2024-0312345678",
      "qrBusinessOwnerIdentityNumber": "987-65-4321",
      "qrScanStartedLog": "モバイル端末でIdentra QRスキャンセッションを開始しています...",
      "qrScanSuccessLog": "Identra QRスキャン成功 - 個人データはZKP-ECDSA暗号証明で保護されています。",
      "businessCredentialVerifiedLog": "Identraは登録証の画像を開示せず、事業VCの事業主識別番号を申請者の本人確認VCと照合しました。",
      "govIdSuccessLog": "政府発行IDの検証に成功しました。(Identra National Registry Matching 100%)",
      "amlStartedLog": "サーバーがAML制裁リストとPEPウォッチリスト審査を開始しました...",
      "amlFailedLog": "AMLリスク審査失敗: 高金融リスクウォッチリスト一致を検出 (OFAC / PEP flagged)。",
      "amlPassedLog": "AML審査成功: マネーロンダリングリスクまたは制裁リスト一致は検出されませんでした。",
      "failedMatchStatus": "一致失敗",
      "pepFlaggedStatus": "PEPフラグ",
      "amlPassedTitle": "AML & PEP審査完了",
      "amlPassedDescription": "国際レジストリ上でマネーロンダリングまたは法的リスクは見つかりませんでした。",
      "physicalCardTitle": "物理カード配送",
      "qrHandshakeSubtitle": "Identra eID即時ハンドシェイク",
      "vcBadgeLabel": "Identra SSI検証可能資格情報 (VC)",
      "cardHolderLabel": "カード名義",
      "cardNumberLabel": "カード番号",
      "visaPlatinumLabel": "VISA PLATINUM",
      "defaultHolderName": "ALICE VANCE"
    }
  },
  "de": {
    "meta": {
      "id": "bank-account",
      "tag": "Banking",
      "title": "Bankkonto eröffnen",
      "desc": "Verifizieren Sie Identität, prüfen Sie Sanktionen und genehmigen Sie einen risikoarmen Kunden für Finanz-Onboarding.",
      "security": "KYC + AML + Liveness",
      "successResult": "Der Antragsteller hat Dokument-, Biometrie- und Watchlist-Prüfungen bestanden. Das Konto kann mit einem verifizierten Identitätszertifikat eröffnet werden.",
      "steps": [
        {
          "label": "Kontoantrag senden",
          "action": "Kontoart und Onboarding-Pfad wählen",
          "logText": "Kontoart, Onboarding-Pfad, Profildaten und erforderliche Dokumente wurden normalisiert."
        },
        {
          "label": "ID-Nachweis verifizieren",
          "action": "Ausweis scannen oder Identra-Nachweis validieren",
          "logText": "Dokumentenechtheit oder Identra-Nachweis-Claims wurden validiert."
        },
        {
          "label": "Liveness abschließen",
          "action": "Gesichts-Liveness-Prüfung ausführen",
          "logText": "3D-Liveness und Gesicht-zu-Dokument-Ähnlichkeit wurden bestanden."
        },
        {
          "label": "AML-Prüfung ausführen",
          "action": "Watchlists prüfen und Konto genehmigen",
          "logText": "OFAC-, PEP- und Risikoregister lieferten keine blockierenden Treffer."
        }
      ]
    },
    "page": {
      "backToScenarios": "Zurück zu Szenarien",
      "liveBadge": "Live-interaktive Demo-Seite",
      "resetDemo": "Demo zurücksetzen",
      "clientEmulator": "Emulator der Kundenoberfläche",
      "flowTitle": "Kontoeröffnung",
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
      "underlyingChecks": "Schrittdetails",
      "transactionComplete": "TRANSAKTION ABGESCHLOSSEN",
      "waitingInput": "WARTET AUF EINGABE",
      "viewVerdict": "Urteil ansehen",
      "runAgain": "Erneut ausführen",
      "ledgerTitle": "Sichere Sandbox-Logtransaktionen",
      "logs": {
        "launch": "[SYSTEM] Live-interaktive Demo-Seite gestartet: {title}",
        "environment": "[ENVIRONMENT] Aktiver Frontend-Sandbox-Kontext wird bereitgestellt...",
        "instruction": "[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um das Bankkonto-Onboarding abzuschließen.",
        "reset": "[SYSTEM] Interaktive Demo-Seite zurückgesetzt: {title}",
        "resetInstruction": "[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um das Konto-Onboarding neu zu starten.",
        "completedLayer": "Onboarding-Schritt abgeschlossen: {label}",
        "nextTask": "Nächste Aufgabe: {action}",
        "allPassed": "Alle Phasen des Bankkonto-Onboardings wurden erfolgreich bestanden.",
        "sealed": "Kryptografische Verifizierungsnachweise wurden signiert und versiegelt."
      },
      "subChecks": {
        "bank-account": [
          [
            "Anforderung der Kontoart ausgewählt",
            "Manueller oder Identra-Onboarding-Pfad ausgewählt",
            "Profilfelder des Antragstellers validiert",
            "Unternehmensregistrierungsnachweis bei Bedarf verarbeitet"
          ],
          [
            "Amtlicher Ausweis oder Identra-Nachweis verfügbar",
            "Dokumentenechtheit oder Nachweisprüfung validiert",
            "Identitätsabgleich im Register akzeptiert"
          ],
          [
            "Gesicht im Liveness-Rahmen positioniert",
            "3D-Tiefen-Liveness bewertet",
            "Gesicht-zu-ID-Ähnlichkeitsprüfung abgeschlossen"
          ],
          [
            "OFAC-Sanktionsregister gescannt",
            "Interpol-Red-Notices abgefragt",
            "PEP-Expositionsprüfung abgeschlossen"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "AeroBank Digital-Konto-Einrichtung",
      "securedByIdentra": "Gesichert durch Identra",
      "digitalBankingPortal": "AeroBank Digital Banking",
      "onlineApplicationSubtitle": "Online-Bankkontoantrag • Schritt 1 von 4: Antragsprofil",
      "fillWithIdentra": "Mit Identra ausfüllen",
      "qrAutofillDesc": "QR-Code mit Identra-App scannen, um verifiziertes Profil sofort auszufüllen.",
      "scanQrButton": "QR scannen & ausfüllen",
      "cryptographicallySecuredBadge": "Daten kryptografisch durch Identra ZKP gesichert",
      "cryptoVerifiedPill": "Kryptografisch Verifiziert",
      "scanQrModalTitle": "Identra-QR-Code scannen",
      "waitingForScan": "Warte auf Scan... {seconds}s",
      "qrModalInstructions": "Öffnen Sie die Identra-App auf Ihrem Smartphone und scannen Sie diesen QR-Code.",
      "simulatingScan": "Simuliere mobile Scan-Verifizierung...",
      "cancelButton": "Abbrechen",
      "selectAccountType": "Kontoart auswählen",
      "chooseOnboardingMethod": "Onboarding-Methode auswählen",
      "manualEntry": "Manuelle Eingabe",
      "manualEntryDesc": "Antragstellerdaten eingeben und erforderliche Dokumente hochladen.",
      "useIdentra": "Identra verwenden",
      "useIdentraDesc": "Einmal scannen, um verifizierte Identität und Unternehmensnachweise bereitzustellen.",
      "checkingAccount": "Girokonto",
      "savingsAccount": "Tagesgeldkonto",
      "businessAccount": "Geschäftskonto",
      "emailAddress": "E-Mail-Adresse",
      "phoneNumber": "Telefonnummer",
      "bankShieldTitle": "Identra Identitätsschutz auf Bankenniveau",
      "bankShieldDesc": "Ihre persönlichen Daten werden verschlüsselt übertragen und in Echtzeit mit offiziellen Registern abgeglichen.",
      "fullNamePlaceholder": "z. B. Alice Vance",
      "ssnPlaceholder": "000-00-0000",
      "emailPlaceholder": "alice.vance@beispiel.de",
      "phonePlaceholder": "+49 170 1234567",
      "addressPlaceholder": "742 Hauptstraße, Berlin",
      "popularBadge": "Beliebt",
      "apyBadge": "4,85 % p.a.",
      "proBadge": "Pro",
      "fdicInsured": "256-Bit FDIC-versichert",
      "passedStatus": "BESTANDEN (0 Treffer)",
      "pendingStatus": "AUSSTEHEND",
      "fullName": "Vollständiger Name",
      "businessDetailsTitle": "Anforderungen für Geschäftskonten",
      "businessLegalName": "Rechtlicher Firmenname",
      "businessLegalNamePlaceholder": "z. B. Aero Logistics LLC",
      "businessRegistrationNumber": "Unternehmensregisternummer",
      "businessOwnerIdentityNumber": "Identitätsnummer des Unternehmensinhabers",
      "businessRegistrationNumberPlaceholder": "z. B. 0312345678",
      "businessOwnerIdentityNumberPlaceholder": "Muss mit der Identitätsnummer des Antragstellers übereinstimmen",
      "identraVerifiedFieldPlaceholder": "Aus verifizierter VC übernommen",
      "businessOwnershipMatched": "Inhaberidentität abgeglichen",
      "businessRegistrationLicense": "Gewerberegistrierung",
      "businessLicenseUploadHint": "Foto der Registrierung hochladen",
      "businessLicenseUploaded": "Unternehmensnachweis angehängt",
      "businessCredentialNotice": "Identra gleicht die Identitätsnummer aus der Ausweis-VC mit der Inhaberidentität aus der Unternehmensregister-VC ab. Nur erforderliche Attribute werden offengelegt; ein Lizenzbild ist nicht nötig.",
      "identityNumberSsn": "Identitätsnummer / SSN",
      "physicalAddress": "Physische Adresse",
      "fullNameError": "Bitte geben Sie Ihren vollständigen Namen ein.",
      "businessLegalNameError": "Bitte geben Sie den rechtlichen Firmennamen ein.",
      "businessRegistrationNumberError": "Bitte geben Sie die Unternehmensregisternummer ein.",
      "businessOwnerIdentityNumberError": "Bitte geben Sie die Identitätsnummer des Unternehmensinhabers ein.",
      "businessOwnershipMismatchError": "Die Identitätsnummer des Unternehmensinhabers stimmt nicht mit der des Antragstellers überein.",
      "businessLicenseError": "Bitte laden Sie ein Bild der Gewerberegistrierung hoch.",
      "identraScanRequiredError": "Bitte scannen Sie mit Identra, bevor Sie diesen Flow absenden.",
      "identityNumberError": "Bitte geben Sie Ihre Identitätsnummer / SSN ein.",
      "physicalAddressError": "Bitte geben Sie Ihre physische Adresse ein.",
      "submitRegistrationProfile": "Registrierungsprofil absenden",
      "step2Description": "Schritt 2: Scannen Sie einen staatlichen Pass/Ausweis manuell oder lassen Sie Identra den verifizierten Nachweis aus dem QR-Flow validieren.",
      "businessVerificationTitle": "Prüfung des Geschäftskontoantrags",
      "businessVerificationIdentraDescription": "Schritt 2: Ausweis-VC und Unternehmensregister-VC prüfen und kryptografisch bestätigen, dass der Antragsteller der Unternehmensinhaber ist.",
      "businessVerificationManualDescription": "Schritt 2: Identität und hochgeladene Gewerberegistrierung prüfen und den Antragsteller mit dem registrierten Inhaber abgleichen.",
      "businessVerificationIdentraFlow": "Identra-Flow · Kryptografische DID- und VC-Prüfung",
      "businessVerificationManualFlow": "Manueller Flow · Register- und Dokumentprüfung",
      "businessVerificationStartedLog": "Dreistufige Prüfung des Geschäftskontoantrags wird gestartet...",
      "businessVerificationSuccess": "Identität, Gewerberegistrierung und Inhaberschaft wurden erfolgreich geprüft.",
      "businessVerificationSteps": [
        {
          "label": "Identitätsinformationen prüfen",
          "identraDetails": [
            "DID-Dokument unter did:certnet:0x8a823f...0 wird abgerufen",
            "DID-Dokument aufgelöst; kryptografische Prüfung wird gestartet",
            "Kryptografische Prüfung erfolgreich"
          ],
          "manualDetails": [
            "Identitätsinformationen werden mit der nationalen Datenbank abgeglichen",
            "Identitätsdaten stimmen überein"
          ]
        },
        {
          "label": "Gewerberegistrierung prüfen",
          "identraDetails": [
            "Unternehmensregister-VC wird aus der Identra-Wallet abgerufen",
            "VC-Signatur und Widerrufsstatus werden geprüft",
            "Unternehmensregister-VC ist gültig"
          ],
          "manualDetails": [
            "Informationen werden aus der hochgeladenen Gewerberegistrierung extrahiert",
            "Unternehmensregisternummer wird mit dem Unternehmensregister abgeglichen",
            "Gewerberegistrierung ist gültig"
          ]
        },
        {
          "label": "Identität mit Gewerberegistrierung abgleichen",
          "identraDetails": [
            "Identitätsnummern werden aus Ausweis-VC und Unternehmensregister-VC extrahiert",
            "Beide Identitätsnummern werden kryptografisch verglichen",
            "Antragsteller stimmt mit dem registrierten Unternehmensinhaber überein"
          ],
          "manualDetails": [
            "Identitätsnummer des Antragstellers wird mit der des registrierten Inhabers verglichen",
            "Unternehmensinhaberdaten stimmen überein"
          ]
        }
      ],
      "step3Description": "Schritt 3: Passive 3D-Gesichts-Liveness. Identra kartiert Gesichtstiefe, Augenbewegungen und Bildschirmreflexionen, um Fotos und Deepfakes zu blockieren.",
      "analyzing3dBiometrics": "3D-Biometrie wird analysiert...",
      "positionFaceInsideOval": "Gesicht im Oval positionieren",
      "verifyBiometricLiveness": "Biometrische Liveness verifizieren",
      "step4Description": "Schritt 4: Internationale AML-Register und Sanktionslisten (OFAC, Interpol, PEP) prüfen, um unzulässige Finanzrisiken auszuschließen.",
      "registryScreening": "Registerprüfung",
      "onlineConnection": "Online-Verbindung",
      "ofacSanctionsList": "1. OFAC-Sanktionsliste:",
      "interpolRedNotices": "2. Interpol Red Notices:",
      "politicallyExposedPersons": "3. Politisch exponierte Personen (PEP):",
      "executeAmlRegistryChecks": "AML-Registerprüfungen ausführen",
      "accountApproved": "Konto genehmigt!",
      "identityBoundDescription": "Ihre digitale Identität wurde versiegelt und mit AeroBank verknüpft. Ihre virtuelle Debitkarte wurde ausgestellt.",
      "aeroBank": "AeroBank",
      "securityFooter": "AES-256-gesicherte Ende-zu-Ende-Sandbox-Sitzungen"
    },
    "logs": {
      "submittingProfile": "Profil wird übermittelt: \"{name}\"",
      "profileReceived": "Profil empfangen: Name=\"{name}\", SSN=\"{ssn}\". Registersignatur wird validiert...",
      "businessLicenseSubmitted": "Manuelle Unternehmensdaten akzeptiert: Registernummer={registrationNumber}; Inhaberidentität stimmt mit dem Antragsteller überein. Registrierungsbild angehängt: {fileName}.",
      "businessCredentialResolved": "Unternehmens-VC verifiziert: {businessName}, Registernummer={registrationNumber}. Die Inhaberidentität stimmt mit der Ausweis-VC des Antragstellers überein; es wurde kein Lizenzbild offengelegt.",
      "initializingLiveness": "3D-Gesichts-Liveness-Scan wird gestartet...",
      "facialRecognitionComplete": "Gesichtsabgleich abgeschlossen: score=99,8%, face_geometry_match=TRUE, liveness=BESTANDEN",
      "queryingWatchlists": "Sanktionslisten für finanzielles Risiko werden abgefragt...",
      "amlCheckComplete": "AML-Prüfung abgeschlossen. Datenbanksuche ergab 0 Treffer für \"{name}\". Risikostufe: Niedrig."
    },
    "flowUi": {
      "oneClickAutofillBadge": "1-Klick-Autofill",
      "cryptoProofVerifiedLabel": "ZKP-ECDSA-Nachweis verifiziert",
      "qrName": "Alice Vance",
      "qrIdentityNumber": "987-65-4321",
      "qrEmail": "alice.vance@identra.com",
      "qrPhone": "+1 (555) 234-5678",
      "qrAddress": "742 Evergreen Terrace, Springfield",
      "qrBusinessName": "Aero Logistics GmbH",
      "qrBusinessRegistrationNumber": "HRB 123456",
      "qrBusinessOwnerIdentityNumber": "987-65-4321",
      "qrScanStartedLog": "Identra QR-Scan-Sitzung auf Mobilgerät wird gestartet...",
      "qrScanSuccessLog": "Identra QR-Scan erfolgreich - personenbezogene Daten sind durch ZKP-ECDSA-Nachweis geschützt.",
      "businessCredentialVerifiedLog": "Identra hat die Inhaberidentität aus der Unternehmens-VC mit der Ausweis-VC des Antragstellers abgeglichen, ohne ein Lizenzbild offenzulegen.",
      "govIdSuccessLog": "Amtlicher Ausweis erfolgreich verifiziert. (Identra National Registry Matching 100%)",
      "amlStartedLog": "Serverautomatisierung startet AML-Sanktions- und PEP-Watchlist-Prüfung...",
      "amlFailedLog": "AML-Risikoprüfung fehlgeschlagen: Treffer in Hochrisiko-Finanzwatchlist erkannt (OFAC / PEP flagged).",
      "amlPassedLog": "AML-Prüfung erfolgreich: Kein Geldwäsche- oder Sanktionslistenrisiko erkannt.",
      "failedMatchStatus": "TREFFER FEHLER",
      "pepFlaggedStatus": "PEP MARKIERT",
      "amlPassedTitle": "AML- & PEP-Prüfung abgeschlossen",
      "amlPassedDescription": "In internationalen Registern wurde kein Geldwäsche- oder Rechtsrisiko gefunden.",
      "physicalCardTitle": "Lieferung der physischen Karte",
      "qrHandshakeSubtitle": "Identra eID Instant Handshake",
      "vcBadgeLabel": "Identra SSI Verifiable Credential (VC)",
      "cardHolderLabel": "KARTENINHABER",
      "cardNumberLabel": "KARTENNUMMER",
      "visaPlatinumLabel": "VISA PLATINUM",
      "defaultHolderName": "ALICE VANCE"
    }
  },
  "vi": {
    "meta": {
      "id": "bank-account",
      "tag": "Ngân hàng",
      "title": "Mở tài khoản ngân hàng",
      "desc": "Xác minh danh tính, sàng lọc AML và phê duyệt hồ sơ mở tài khoản của khách hàng có mức rủi ro thấp.",
      "security": "KYC + AML + xác minh hiện diện",
      "successResult": "Hồ sơ đã vượt qua bước xác minh giấy tờ, sinh trắc học và sàng lọc danh sách cảnh báo. Tài khoản có thể được mở dựa trên danh tính đã xác minh.",
      "steps": [
        {
          "label": "Gửi hồ sơ mở tài khoản",
          "action": "Chọn loại tài khoản và cách nộp hồ sơ",
          "logText": "Đã ghi nhận loại tài khoản, cách nộp hồ sơ, thông tin đăng ký và các giấy tờ cần thiết."
        },
        {
          "label": "Xác minh giấy tờ định danh",
          "action": "Quét giấy tờ hoặc xác thực bằng Identra",
          "logText": "Đã xác minh tính hợp lệ của giấy tờ hoặc các thuộc tính trong VC Identra."
        },
        {
          "label": "Xác minh khuôn mặt",
          "action": "Xác minh người dùng đang hiện diện trước camera",
          "logText": "Đã xác minh người dùng hiện diện và khuôn mặt trùng khớp với ảnh trên giấy tờ."
        },
        {
          "label": "Sàng lọc AML",
          "action": "Rà soát danh sách cảnh báo và phê duyệt tài khoản",
          "logText": "Không phát hiện cảnh báo cần chặn hồ sơ trong dữ liệu OFAC, PEP và các danh sách rủi ro."
        }
      ]
    },
    "page": {
      "backToScenarios": "Quay lại danh sách kịch bản",
      "liveBadge": "Bản mô phỏng tương tác",
      "resetDemo": "Đặt lại mô phỏng",
      "clientEmulator": "Mô phỏng giao diện khách hàng",
      "flowTitle": "Mở tài khoản ngân hàng",
      "coreVersion": "CORE v2.8",
      "riskLevel": "Mức rủi ro",
      "trustScore": "Điểm tin cậy",
      "systemState": "Trạng thái hệ thống",
      "safeLow": "AN TOÀN / RỦI RO THẤP",
      "evaluating": "ĐANG ĐÁNH GIÁ",
      "analyzing": "ĐANG PHÂN TÍCH",
      "approved": "ĐÃ PHÊ DUYỆT",
      "active": "Đang thực hiện",
      "pass": "Đạt",
      "task": "Nhiệm vụ: {action}",
      "underlyingChecks": "Nội dung kiểm tra",
      "transactionComplete": "QUY TRÌNH HOÀN TẤT",
      "waitingInput": "ĐANG CHỜ THAO TÁC",
      "viewVerdict": "Xem kết luận",
      "runAgain": "Chạy lại",
      "ledgerTitle": "Nhật ký phiên mô phỏng được bảo mật",
      "logs": {
        "launch": "[HỆ THỐNG] Đã khởi chạy bản mô phỏng: {title}",
        "environment": "[MÔI TRƯỜNG] Đang thiết lập giao diện mô phỏng...",
        "instruction": "[HƯỚNG DẪN] Thực hiện thao tác ở khung bên trái để hoàn tất quy trình mở tài khoản.",
        "reset": "[HỆ THỐNG] Đã đặt lại bản mô phỏng: {title}",
        "resetInstruction": "[HƯỚNG DẪN] Thực hiện thao tác ở khung bên trái để bắt đầu lại quy trình mở tài khoản.",
        "completedLayer": "Đã hoàn tất bước: {label}",
        "nextTask": "Bước tiếp theo: {action}",
        "allPassed": "Hồ sơ đã hoàn tất toàn bộ quy trình xét duyệt mở tài khoản.",
        "sealed": "Thông tin xác thực đã được ký và niêm phong bằng mật mã."
      },
      "subChecks": {
        "bank-account": [
          [
            "Đã xác định yêu cầu tương ứng với loại tài khoản",
            "Đã chọn cách nhập thông tin: thủ công hoặc qua Identra",
            "Đã kiểm tra đầy đủ thông tin đăng ký",
            "Đã tiếp nhận giấy phép đăng ký kinh doanh (nếu cần)"
          ],
          [
            "Đã tiếp nhận giấy tờ tùy thân hoặc VC Identra",
            "Đã xác minh tính hợp lệ của giấy tờ hoặc bằng chứng VC",
            "Thông tin định danh trùng khớp với dữ liệu đăng ký"
          ],
          [
            "Khuôn mặt đã được đặt đúng vị trí",
            "Đã xác minh người dùng hiện diện qua dữ liệu chiều sâu 3D",
            "Khuôn mặt trùng khớp với ảnh trên giấy tờ tùy thân"
          ],
          [
            "Đã rà soát danh sách trừng phạt OFAC",
            "Đã kiểm tra thông báo đỏ của Interpol",
            "Đã hoàn tất sàng lọc PEP"
          ]
        ]
      }
    },
    "scenario": {
      "headerTitle": "Cổng mở tài khoản AeroBank",
      "securedByIdentra": "Bảo mật bởi Identra",
      "digitalBankingPortal": "Ngân hàng số AeroBank",
      "onlineApplicationSubtitle": "Đăng ký mở tài khoản ngân hàng số • Bước 1/4: Hồ sơ đăng ký",
      "fillWithIdentra": "Điền thông tin với Identra",
      "qrAutofillDesc": "Quét mã QR bằng ứng dụng Identra để tự động điền hồ sơ định danh đã xác minh.",
      "scanQrButton": "Quét mã để tự động điền",
      "cryptographicallySecuredBadge": "Dữ liệu được bảo vệ bằng mật mã của Identra",
      "cryptoVerifiedPill": "Xác thực bằng mật mã",
      "scanQrModalTitle": "Quét mã QR Identra",
      "waitingForScan": "Đang chờ quét... {seconds}s",
      "qrModalInstructions": "Mở ứng dụng Identra trên điện thoại và quét mã QR này để tự động điền hồ sơ.",
      "simulatingScan": "Đang xác thực dữ liệu từ điện thoại...",
      "cancelButton": "Hủy",
      "selectAccountType": "Chọn loại tài khoản",
      "chooseOnboardingMethod": "Chọn cách nộp hồ sơ",
      "manualEntry": "Nhập thủ công",
      "manualEntryDesc": "Tự nhập thông tin và tải lên giấy tờ bắt buộc.",
      "useIdentra": "Sử dụng Identra",
      "useIdentraDesc": "Quét một lần để cung cấp thông tin định danh và doanh nghiệp đã được xác minh.",
      "checkingAccount": "Tài khoản thanh toán",
      "savingsAccount": "Tiết kiệm lãi suất cao",
      "businessAccount": "Tài khoản doanh nghiệp",
      "emailAddress": "Địa chỉ email",
      "phoneNumber": "Số điện thoại",
      "bankShieldTitle": "Bảo vệ danh tính theo tiêu chuẩn ngân hàng",
      "bankShieldDesc": "Thông tin cá nhân được mã hóa trong quá trình truyền tải và đối chiếu trực tiếp với cơ sở dữ liệu quốc gia theo thời gian thực.",
      "fullNamePlaceholder": "Ví dụ: Nguyễn Văn A",
      "ssnPlaceholder": "012345678901",
      "emailPlaceholder": "nguyenvana@example.com",
      "phonePlaceholder": "0912 345 678",
      "addressPlaceholder": "742 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      "popularBadge": "Phổ biến",
      "apyBadge": "Lãi suất 4.85%/năm",
      "proBadge": "Doanh nghiệp",
      "fdicInsured": "Mã hóa 256 bit • Tiền gửi được bảo hiểm",
      "passedStatus": "ĐẠT (0 KẾT QUẢ TRÙNG KHỚP)",
      "pendingStatus": "ĐANG RÀ SOÁT",
      "fullName": "Họ và tên",
      "businessDetailsTitle": "Yêu cầu cho tài khoản doanh nghiệp",
      "businessLegalName": "Tên doanh nghiệp",
      "businessLegalNamePlaceholder": "Ví dụ: Công ty TNHH Aero Logistics",
      "businessRegistrationNumber": "Mã số doanh nghiệp",
      "businessOwnerIdentityNumber": "Số định danh của chủ doanh nghiệp",
      "businessRegistrationNumberPlaceholder": "Ví dụ: 0312345678",
      "businessOwnerIdentityNumberPlaceholder": "Phải trùng với số định danh người mở tài khoản",
      "identraVerifiedFieldPlaceholder": "Điền từ VC đã xác minh",
      "businessOwnershipMatched": "Đã xác nhận chủ doanh nghiệp",
      "businessRegistrationLicense": "Giấy phép đăng ký kinh doanh",
      "businessLicenseUploadHint": "Tải lên ảnh giấy phép đăng ký kinh doanh",
      "businessLicenseUploaded": "Đã đính kèm thông tin đăng ký kinh doanh",
      "businessCredentialNotice": "Identra đối chiếu số định danh trong VC Căn cước với số định danh chủ doanh nghiệp trong VC Giấy chứng nhận đăng ký doanh nghiệp. Chỉ các thuộc tính cần thiết được tiết lộ; không cần ảnh giấy phép.",
      "identityNumberSsn": "Số định danh / SSN",
      "physicalAddress": "Địa chỉ thường trú",
      "fullNameError": "Vui lòng nhập họ và tên của bạn.",
      "businessLegalNameError": "Vui lòng nhập tên doanh nghiệp.",
      "businessRegistrationNumberError": "Vui lòng nhập mã số doanh nghiệp.",
      "businessOwnerIdentityNumberError": "Vui lòng nhập số định danh của chủ doanh nghiệp.",
      "businessOwnershipMismatchError": "Số định danh chủ doanh nghiệp không khớp với số định danh của người mở tài khoản.",
      "businessLicenseError": "Vui lòng tải lên ảnh giấy phép đăng ký kinh doanh.",
      "identraScanRequiredError": "Vui lòng quét mã bằng Identra trước khi gửi hồ sơ.",
      "identityNumberError": "Vui lòng nhập số định danh / SSN.",
      "physicalAddressError": "Vui lòng nhập địa chỉ thường trú.",
      "submitRegistrationProfile": "Gửi hồ sơ đăng ký",
      "step2Description": "Bước 2: Tải lên giấy tờ tùy thân để xác minh thủ công hoặc dùng Identra để xác minh VC được cung cấp qua mã QR.",
      "businessVerificationTitle": "Xác minh hồ sơ doanh nghiệp",
      "businessVerificationIdentraDescription": "Bước 2: Xác minh VC Căn cước và VC Giấy chứng nhận đăng ký doanh nghiệp, sau đó dùng bằng chứng mật mã để xác nhận người mở tài khoản là chủ doanh nghiệp.",
      "businessVerificationManualDescription": "Bước 2: Xác minh thông tin định danh và giấy phép đăng ký kinh doanh đã tải lên, sau đó xác nhận người mở tài khoản là chủ doanh nghiệp.",
      "businessVerificationIdentraFlow": "Xác minh bằng Identra · DID và VC",
      "businessVerificationManualFlow": "Xác minh thủ công · Cơ sở dữ liệu và giấy phép",
      "businessVerificationStartedLog": "Bắt đầu xác minh hồ sơ doanh nghiệp qua 3 bước...",
      "businessVerificationSuccess": "Đã xác minh thông tin định danh, giấy phép đăng ký kinh doanh và tư cách chủ doanh nghiệp.",
      "businessVerificationSteps": [
        {
          "label": "Xác minh thông tin định danh",
          "identraDetails": [
            "Truy xuất tài liệu DID tại địa chỉ did:certnet:0x8a823f...0",
            "Đã phân giải tài liệu DID, đang xác minh bằng mật mã",
            "Xác minh bằng mật mã thành công"
          ],
          "manualDetails": [
            "Đang đối chiếu thông tin với cơ sở dữ liệu quốc gia",
            "Thông tin định danh trùng khớp"
          ]
        },
        {
          "label": "Xác minh giấy phép đăng ký kinh doanh",
          "identraDetails": [
            "Truy xuất VC Giấy chứng nhận đăng ký doanh nghiệp từ ví Identra",
            "Xác minh chữ ký số và trạng thái thu hồi của VC",
            "VC Giấy chứng nhận đăng ký doanh nghiệp hợp lệ"
          ],
          "manualDetails": [
            "Đang trích xuất thông tin từ ảnh giấy phép đăng ký kinh doanh",
            "Đang đối chiếu mã số doanh nghiệp với cơ sở dữ liệu đăng ký kinh doanh",
            "Giấy phép đăng ký kinh doanh hợp lệ"
          ]
        },
        {
          "label": "Đối chiếu danh tính với giấy phép kinh doanh",
          "identraDetails": [
            "Trích xuất số định danh từ VC Căn cước và VC Giấy chứng nhận đăng ký doanh nghiệp",
            "Đối chiếu hai số định danh bằng phương thức mật mã",
            "Danh tính người mở tài khoản khớp với chủ doanh nghiệp"
          ],
          "manualDetails": [
            "Đang đối chiếu số định danh người mở tài khoản với số định danh chủ doanh nghiệp",
            "Thông tin chủ doanh nghiệp trùng khớp"
          ]
        }
      ],
      "step3Description": "Bước 3: Xác minh hiện diện khuôn mặt 3D theo phương thức thụ động. Identra phân tích độ sâu khuôn mặt, chuyển động mắt và phản chiếu màn hình để phát hiện ảnh chụp hoặc deepfake.",
      "analyzing3dBiometrics": "Đang phân tích sinh trắc học 3D...",
      "positionFaceInsideOval": "Đặt khuôn mặt vào trong khung bầu dục",
      "verifyBiometricLiveness": "Xác minh hiện diện sinh trắc học",
      "step4Description": "Bước 4: Đối chiếu thông tin với các nguồn dữ liệu AML quốc tế và danh sách cảnh báo OFAC, Interpol, PEP để phát hiện rủi ro tài chính.",
      "registryScreening": "Sàng lọc dữ liệu",
      "onlineConnection": "Kết nối trực tuyến",
      "ofacSanctionsList": "1. Danh sách trừng phạt OFAC:",
      "interpolRedNotices": "2. Thông báo đỏ Interpol:",
      "politicallyExposedPersons": "3. Người có chức vụ, quyền hạn chính trị (PEP):",
      "executeAmlRegistryChecks": "Thực hiện sàng lọc AML",
      "govIdVerifiedSuccess": "Đã xác minh giấy tờ tùy thân!",
      "livenessVerifiedSuccess": "Đã xác minh khuôn mặt và sự hiện diện!",
      "amlRunningTitle": "Hệ thống đang tự động sàng lọc AML và PEP...",
      "amlFailedTitle": "Không vượt qua bước sàng lọc AML (phát hiện thông tin trùng khớp với danh sách cảnh báo)",
      "amlFailedDesc": "Số điện thoại 0968268030 xuất hiện trong danh sách cảnh báo rủi ro tài chính cao của OFAC hoặc PEP.",
      "retryButton": "Thử lại",
      "issueCardButton": "Nhận thẻ",
      "physicalCardDeliveryNotice": "Thẻ vật lý AeroBank sẽ được gửi đến địa chỉ của bạn trong vòng 2-5 ngày làm việc.",
      "identraVcClaimNotice": "Quét mã QR dưới đây để thêm thực chứng (VC) của thẻ vào ví SSI.",
      "claimVcQrTitle": "Quét mã QR để nhận thẻ vào ví SSI",
      "accountApproved": "Tài khoản đã được phê duyệt!",
      "identityBoundDescription": "Danh tính số của bạn đã được xác minh và liên kết với AeroBank. Thẻ ghi nợ ảo đã được phát hành.",
      "aeroBank": "AeroBank",
      "securityFooter": "Phiên mô phỏng được mã hóa đầu cuối bằng AES-256"
    },
    "logs": {
      "submittingProfile": "Đang gửi hồ sơ: \"{name}\"",
      "profileReceived": "Đã nhận hồ sơ: tên=\"{name}\", SSN=\"{ssn}\". Đang xác minh chữ ký từ cơ sở dữ liệu...",
      "businessLicenseSubmitted": "Đã tiếp nhận thông tin doanh nghiệp nhập thủ công: mã số={registrationNumber}; số định danh chủ doanh nghiệp khớp với người mở tài khoản. Ảnh giấy phép đã đính kèm: {fileName}.",
      "businessCredentialResolved": "Đã xác minh VC đăng ký doanh nghiệp: {businessName}, mã số={registrationNumber}. Số định danh chủ doanh nghiệp khớp với VC Căn cước; không có ảnh giấy phép nào được tiết lộ.",
      "initializingLiveness": "Đang bắt đầu xác minh hiện diện khuôn mặt 3D...",
      "facialRecognitionComplete": "Đã đối chiếu khuôn mặt: độ tương đồng=99,8%, hình học khuôn mặt=TRÙNG KHỚP, hiện diện=ĐẠT",
      "queryingWatchlists": "Đang đối chiếu với các danh sách cảnh báo rủi ro tài chính...",
      "amlCheckComplete": "Đã hoàn tất sàng lọc AML. Không tìm thấy tên trùng khớp với \"{name}\". Mức rủi ro: Thấp."
    },
    "flowUi": {
      "oneClickAutofillBadge": "Tự động điền",
      "cryptoProofVerifiedLabel": "Đã xác minh bằng chứng ZKP-ECDSA",
      "qrName": "Nguyễn Văn An",
      "qrIdentityNumber": "012398765432",
      "qrEmail": "nguyenvanan@identra.vn",
      "qrPhone": "0988 123 456",
      "qrAddress": "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      "qrBusinessName": "Công ty TNHH Aero Logistics",
      "qrBusinessRegistrationNumber": "0312345678",
      "qrBusinessOwnerIdentityNumber": "012398765432",
      "qrScanStartedLog": "Đã bắt đầu phiên quét mã QR Identra trên thiết bị di động...",
      "qrScanSuccessLog": "Đã quét mã QR Identra. Dữ liệu cá nhân được bảo vệ bằng bằng chứng mật mã ZKP-ECDSA.",
      "businessCredentialVerifiedLog": "Identra đã đối chiếu số định danh chủ doanh nghiệp trong VC đăng ký doanh nghiệp với VC Căn cước mà không tiết lộ ảnh giấy phép.",
      "govIdSuccessLog": "Đã xác minh giấy tờ tùy thân. Thông tin trùng khớp 100% với dữ liệu định danh quốc gia qua Identra.",
      "amlStartedLog": "Hệ thống đang tự động sàng lọc AML, danh sách trừng phạt và PEP...",
      "amlFailedLog": "Không vượt qua bước sàng lọc AML: thông tin trùng khớp với danh sách cảnh báo rủi ro tài chính cao của OFAC hoặc PEP.",
      "amlPassedLog": "Đã hoàn tất sàng lọc AML: không phát hiện dấu hiệu rửa tiền hoặc thông tin trùng khớp với danh sách trừng phạt.",
      "failedMatchStatus": "PHÁT HIỆN TRÙNG KHỚP",
      "pepFlaggedStatus": "CÓ CẢNH BÁO PEP",
      "amlPassedTitle": "Đã hoàn tất sàng lọc AML và PEP",
      "amlPassedDescription": "Không phát hiện dấu hiệu rửa tiền hoặc cảnh báo pháp lý trong các nguồn dữ liệu quốc tế.",
      "physicalCardTitle": "Giao thẻ vật lý tận nơi",
      "qrHandshakeSubtitle": "Kết nối tức thời với Identra eID",
      "vcBadgeLabel": "Thực chứng (VC) do Identra cấp cho ví SSI",
      "cardHolderLabel": "CHỦ THẺ",
      "cardNumberLabel": "SỐ THẺ",
      "visaPlatinumLabel": "VISA PLATINUM",
      "defaultHolderName": "NGUYỄN VĂN A"
    }
  }
} as const;
