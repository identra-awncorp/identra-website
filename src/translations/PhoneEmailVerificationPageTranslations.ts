/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PHONE_EMAIL_VERIFICATION_TRANSLATIONS: any = {
  en: {
    back: 'Back to Identity Platform',
    badge: 'Phone & email verification',
    heroTitle: 'Verify phone numbers and emails without adding unnecessary friction.',
    heroDesc: 'Confirm that users control the contact details they submit, strengthen account security, and route suspicious activity into the right verification step.',
    tryDemo: 'Try the demo',
    tryNow: 'Try it now',
    benefits: [
      { title: 'Secure accounts', desc: 'Verify contact ownership before account recovery, payout changes, or high-risk actions.' },
      { title: 'Make verification easy for users', desc: 'Use SMS, email, and carrier checks that feel native to your onboarding flow.' },
      { title: 'Increase completion rates', desc: 'Offer fallback methods when users cannot prove ownership the first time.' }
    ],
    playground: {
      eyebrow: 'Interactive Playground',
      title: 'Test phone and email verification flows',
      desc: 'Switch between OTP delivery, carrier ownership checks, and reputation screening to see how Identra can adapt the path for each user.',
      tabs: [
        { id: 'otp-sms', label: 'SMS OTP' },
        { id: 'otp-email', label: 'Email OTP' },
        { id: 'carrier-db', label: 'Carrier lookup' },
        { id: 'risk-score', label: 'Risk screen' }
      ],
      endpoint: 'API Sandbox: v2/verifications/trust-endpoint',
      response: 'Response: 200 OK',
      network: '5G'
    },
    sms: {
      title: 'SMS Verification Flow',
      phoneLabel: 'Phone number',
      send: 'Send SMS code',
      sending: 'Provisioning secure SMS rails...',
      sendingSub: 'Interfacing with mobile networks',
      sentTitle: 'Verification code dispatched',
      sentDesc: 'A simulated SMS code was sent. Use the generated code or 123456.',
      codeLabel: 'Verification code',
      verify: 'Verify phone',
      verifying: 'Verifying...',
      successTitle: 'Phone verified successfully',
      successDesc: 'Ownership established. Secure 2FA token generated for Session ID',
      error: 'The code did not match. Try the generated code or 123456.',
      notificationTitle: 'Identra SMS Rails',
      notificationTime: 'now',
      notificationBody: 'Your verification code is {code}.',
      previewLabel: 'Identra Security (OTP)',
      previewStatus: 'Active secure routing',
      previewWaiting: 'Waiting for SMS transmission request...',
      previewTyping: 'iMessage...'
    },
    email: {
      title: 'Email Verification Flow',
      emailLabel: 'Email address',
      send: 'Send email code',
      sending: 'Dispatching SMTP envelope...',
      sendingSub: 'Routing via Identra mail systems',
      sentTitle: 'Verification email routed',
      sentDesc: 'A simulated email code was sent. Use the generated code or 123456.',
      codeLabel: 'Verification code',
      verify: 'Verify email',
      verifying: 'Verifying...',
      successTitle: 'Email verified successfully',
      successDescBefore: 'Ownership verified. Safe delivery reputation score logged as',
      successRating: 'Excellent',
      error: 'The code did not match. Try the generated code or 123456.',
      notificationTitle: 'New Email: Identra Auth',
      notificationTime: 'now',
      secureClient: 'Secure Mail Client',
      waiting: 'Waiting for email transmission request...',
      synthesizing: 'Synthesizing SMTP envelope...',
      sender: 'Identra Auth Services',
      subject: 'Subject: Verify email identity',
      time: '9:41 AM'
    },
    carrier: {
      title: 'Carrier Registry Verification',
      phoneLabel: 'Phone number',
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
      zipLabel: 'Billing ZIP',
      run: 'Run carrier lookup',
      searching: 'Querying carrier registries...',
      carriersLabel: 'Simulated carriers queried:',
      carriers: 'AT&T, Verizon, T-Mobile, Sprint',
      result: 'Verification result',
      confidence: 'Match confidence',
      firstNameMatch: 'First name match',
      lastNameMatch: 'Last name match',
      zipMatch: 'Billing ZIP code match',
      registrar: 'Carrier registrar details',
      simSwap: 'Recent SIM swap check',
      matched: 'Matched',
      partial: 'Partial match',
      mismatch: 'Mismatch',
      yes: 'Yes',
      no: 'No',
      recentSwap: 'Recent SIM swap detected',
      noRecentSwap: 'No recent SIM swap',
      logsTitle: 'Registry Handshake Logs',
      logsEyebrow: 'Network Query',
      logsIdle: 'Broadcast query ready...',
      logsSearching: '> Handshaking with T-Mobile/Verizon nodes...',
      logsDetails: '> Registration record details:',
      logsDone: 'Verification matching script finished.',
      registryLink: 'GSM / CDMA Global Registry Link'
    },
    risk: {
      title: 'Fraud & Threat Reputation Engine',
      phoneLabel: 'Phone number',
      emailLabel: 'Email address',
      run: 'Screen reputation',
      analyzing: 'Synthesizing threat fingerprints...',
      verdict: 'Identra risk verdict',
      threatIndex: 'Threat index',
      breakdown: 'Threat signals breakdown',
      safe: 'Low risk',
      medium: 'Medium risk',
      high: 'High risk',
      visualizer: 'Passive Signal Visualizer',
      visualizerHint: 'Tweak toggles and screen reputation on the left.',
      target: 'Screen target',
      simAge: 'SIM age status',
      lineClass: 'Line class',
      emailClass: 'Email class',
      flags: [
        { key: 'voipLine', title: 'Phone line is a VoIP line', desc: 'Low-friction carrier, often exploited by online bots' },
        { key: 'recentSimSwap', title: 'SIM card was swapped recently', desc: 'Tied to immediate takeover vectors and hijack risks' },
        { key: 'disposableDomain', title: 'Email matches temporary domain blacklist', desc: 'Spam or burner mailbox services, such as temp-mail' },
        { key: 'spamListed', title: 'Email reported in public leaks or spam list', desc: 'High historical correlation to compromised actors' }
      ],
      details: {
        voip: { type: 'VoIP line detected', severity: 'MEDIUM', desc: 'Phone number belongs to a virtual or VoIP provider, which has no physical SIM link.' },
        physical: { type: 'Physical SIM verified', severity: 'SAFE', desc: 'Phone line is tied to a physical/eSIM card with a leading global carrier.' },
        sim: { type: 'Recent SIM swap (7 days)', severity: 'HIGH', desc: 'SIM card was replaced recently, which can indicate account takeover attempts.' },
        disposable: { type: 'Disposable or temporary email domain', severity: 'MEDIUM', desc: 'The email domain matches blacklists of free temporary disposable mailboxes.' },
        spam: { type: 'Reputation blacklist hit', severity: 'LOW', desc: 'Email address was found in historical spam databases or public data leaks.' }
      }
    },
    how: {
      title: 'How it works',
      desc: 'A frictionless three-step process built to maximize conversions while locking out malicious actors.',
      tabs: ['1 Collect', '2 Send code', '3 Verify'],
      steps: [
        { title: 'Collect contact information', desc: 'Prompt users to input their phone numbers or email addresses in a responsive, branded interface. Identra formats country codes, screens for typos, and detects input categories on the fly.', bullets: ['Branded, customizable input overlays', 'Real-time international formatting and phone validation'] },
        { title: 'Send verification code', desc: 'Generate and dispatch a one-time passcode (OTP) via SMS, WhatsApp, phone call, or secure email based on your configuration.', bullets: ['SMS, WhatsApp, and email fallback options', 'Automated multi-carrier routing for maximum deliverability'] },
        { title: 'Verify ownership', desc: 'After the user enters the passcode, Identra returns a signed webhook confirmation so your systems can unlock the account or continue to the next identity step.', bullets: ['Instant webhook triggers', 'Seamless transition to ID upload or facial checks'] }
      ],
      mock: {
        step1: 'Step 1: Contact collection',
        prompt: 'Please enter your details to verify your identity',
        mobile: 'Mobile number',
        continue: 'Continue to code send',
        rail: 'DISPATCHING RAIL',
        railName: 'GSM Global',
        routing: 'Routing cryptographically signed SMS bundle containing passcode hash to destination',
        dispatchTime: 'Expected dispatch time: 0.8s',
        ownership: 'Ownership established',
        ownershipDesc: 'Passcode matched. Entity linked to phone registry with high assurance.',
        status: 'Verification status: COMPLETED_OWNER_MATCH'
      }
    },
    methods: {
      title: 'Explore our library of phone and email verification methods',
      desc: 'From seamless two-factor passcodes to deep telecom carrier registries, Identra provides modular tools to adapt to your compliance level.',
      active: 'Active method details displayed in playground',
      learn: 'Learn more about enrichment',
      cards: [
        { id: '2fa-phone', title: 'Phone number (2FA)', desc: 'Verify phone ownership with high-assurance two-factor authentication via automated text messages or phone calls.' },
        { id: 'ownership-phone', title: 'Phone verification (ownership)', desc: 'Check legal names and phone numbers against global telecommunications carrier databases to match submitted KYC parameters.' },
        { id: '2fa-email', title: 'Email verification (2FA)', desc: 'Verify email ownership with secure email templates, one-time passcodes, and magic-link verification.' },
        { id: 'risk-checks', title: 'Phone or email address riskiness', desc: 'Assess phone or email reputation via real-time risk scoring, VoIP screening, and global threat intelligence.' }
      ]
    },
    signals: {
      title: 'Prevent fraud with additional risk signals',
      cards: [
        { title: 'Two-factor authentication', desc: 'Protect accounts by sending a cryptographic passcode to the submitted phone number or email and validating ownership.' },
        { title: 'Account takeover prevention', desc: 'Stop hijacking attempts by screening for recent SIM swaps, suspicious mobile porting, or burner mailbox redirects.' },
        { title: 'Risk assessment', desc: 'Analyze phone and email reputation during onboarding. Intercept disposable domains, VoIP lines, and spam-list records.' }
      ]
    },
    learning: {
      title: 'Keep learning',
      articles: [
        { meta: 'Blog - 6 mins', title: 'Phone verification: An important part of identity verification and fraud prevention', alt: 'Phone verification insights' },
        { meta: 'Blog - 7 mins', title: '3 tips for managing risk without sacrificing user experience', alt: 'Risk management strategies' },
        { meta: 'Guide - 12 mins', title: 'The strategic guide to balancing risk and conversion', alt: 'Conversion and risk guide' }
      ]
    },
    explore: {
      title: "Explore more of Identra's identity platform",
      cards: [
        { eyebrow: 'Identity flows', title: 'Build better identity flows', desc: 'Design dynamic custom flows that trigger database queries or biometric captures based on user inputs.', cta: 'Explore Workflows' },
        { eyebrow: 'Enrichment checks', title: 'Screen phone numbers and emails for risk', desc: 'Incorporate databases, fraud watchlists, and license matching into registration funnels.', cta: 'Explore Database Checks' }
      ]
    },
    finalCta: {
      title: 'Ready to get started?',
      desc: 'Get in touch or start exploring Identra today. Build high-assurance workflows that scale beautifully.',
      primary: 'Try the demo',
      secondary: 'Try it now'
    }
  },
  es: {
    back: 'Volver a la plataforma de identidad',
    badge: 'Verificación de teléfono y email',
    heroTitle: 'Verifica teléfonos y emails sin añadir fricción innecesaria.',
    heroDesc: 'Confirma que los usuarios controlan los datos de contacto que envían, refuerza la seguridad de las cuentas y dirige la actividad sospechosa al paso correcto.',
    tryDemo: 'Probar la demo',
    tryNow: 'Probar ahora',
    benefits: [
      { title: 'Protege cuentas', desc: 'Verifica la propiedad del contacto antes de recuperaciones, cambios de pago o acciones de alto riesgo.' },
      { title: 'Haz que verificar sea fácil', desc: 'Usa SMS, email y comprobaciones de operador integradas en tu onboarding.' },
      { title: 'Aumenta la finalización', desc: 'Ofrece métodos alternativos cuando el usuario no puede demostrar propiedad al primer intento.' }
    ],
    playground: {
      eyebrow: 'Entorno interactivo',
      title: 'Prueba flujos de verificación de teléfono y email',
      desc: 'Alterna entre entrega OTP, comprobaciones de operador y revisión de reputación para ver cómo Identra adapta el camino de cada usuario.',
      tabs: [{ id: 'otp-sms', label: 'OTP por SMS' }, { id: 'otp-email', label: 'OTP por email' }, { id: 'carrier-db', label: 'Consulta de operador' }, { id: 'risk-score', label: 'Riesgo' }],
      endpoint: 'API Sandbox: v2/verifications/trust-endpoint',
      response: 'Respuesta: 200 OK'
    },
    sms: {
      title: 'Flujo de verificación por SMS', phoneLabel: 'Número de teléfono', send: 'Enviar código SMS', sending: 'Preparando rutas SMS seguras...', sendingSub: 'Conectando con redes móviles', sentTitle: 'Código de verificación enviado', sentDesc: 'Se envió un código SMS simulado. Usa el código generado o 123456.', codeLabel: 'Código de verificación', verify: 'Verificar teléfono', verifying: 'Verificando...', successTitle: 'Teléfono verificado correctamente', successDesc: 'Propiedad establecida. Token 2FA seguro generado para Session ID', error: 'El código no coincide. Prueba el código generado o 123456.', notificationTitle: 'Rutas SMS de Identra', notificationTime: 'ahora', notificationBody: 'Tu código de verificación es {code}.', previewLabel: 'Seguridad Identra (OTP)', previewStatus: 'Enrutamiento seguro activo', previewWaiting: 'Esperando solicitud de transmisión SMS...', previewTyping: 'iMessage...'
    },
    email: {
      title: 'Flujo de verificación por email', emailLabel: 'Dirección de email', send: 'Enviar código por email', sending: 'Enviando sobre SMTP...', sendingSub: 'Enrutando por sistemas de correo de Identra', sentTitle: 'Email de verificación enviado', sentDesc: 'Se envió un código de email simulado. Usa el código generado o 123456.', codeLabel: 'Código de verificación', verify: 'Verificar email', verifying: 'Verificando...', successTitle: 'Email verificado correctamente', successDescBefore: 'Propiedad verificada. La reputación de entrega segura quedó registrada como', successRating: 'Excelente', error: 'El código no coincide. Prueba el código generado o 123456.', notificationTitle: 'Nuevo email: Identra Auth', notificationTime: 'ahora', secureClient: 'Cliente de correo seguro', waiting: 'Esperando solicitud de envío de email...', synthesizing: 'Generando sobre SMTP...', sender: 'Identra Auth Services', subject: 'Asunto: Verificar identidad de email', time: '9:41 AM'
    },
    carrier: {
      title: 'Verificación en registro de operador', phoneLabel: 'Número de teléfono', firstNameLabel: 'Nombre', lastNameLabel: 'Apellido', zipLabel: 'ZIP de facturación', run: 'Ejecutar consulta de operador', searching: 'Consultando registros de operadores...', carriersLabel: 'Operadores simulados consultados:', carriers: 'AT&T, Verizon, T-Mobile, Sprint', result: 'Resultado de verificación', confidence: 'Confianza de coincidencia', firstNameMatch: 'Coincidencia de nombre', lastNameMatch: 'Coincidencia de apellido', zipMatch: 'Coincidencia de ZIP de facturación', registrar: 'Detalles del registro del operador', simSwap: 'Comprobación de SIM swap reciente', matched: 'Coincide', partial: 'Coincidencia parcial', mismatch: 'No coincide', yes: 'Sí', no: 'No', recentSwap: 'SIM swap reciente detectado', noRecentSwap: 'Sin SIM swap reciente', logsTitle: 'Registros de handshake', logsEyebrow: 'Consulta de red', logsIdle: 'Consulta broadcast lista...', logsSearching: '> Handshake con nodos T-Mobile/Verizon...', logsDetails: '> Detalles del registro:', logsDone: 'Script de coincidencia finalizado.', registryLink: 'Enlace a registro global GSM / CDMA'
    },
    risk: {
      title: 'Motor de reputación de fraude y amenazas', phoneLabel: 'Número de teléfono', emailLabel: 'Dirección de email', run: 'Revisar reputación', analyzing: 'Generando huellas de amenaza...', verdict: 'Veredicto de riesgo de Identra', threatIndex: 'Índice de amenaza', breakdown: 'Desglose de señales de amenaza', safe: 'Riesgo bajo', medium: 'Riesgo medio', high: 'Riesgo alto', visualizer: 'Visualizador de señales pasivas', visualizerHint: 'Ajusta los toggles y revisa la reputación a la izquierda.', target: 'Objetivo', simAge: 'Estado de antigüedad SIM', lineClass: 'Clase de línea', emailClass: 'Clase de email',
      flags: [{ key: 'voipLine', title: 'La línea telefónica es VoIP', desc: 'Operador de baja fricción, usado a menudo por bots' }, { key: 'recentSimSwap', title: 'La SIM se cambió recientemente', desc: 'Relacionado con vectores inmediatos de toma de cuenta' }, { key: 'disposableDomain', title: 'El email coincide con una lista de dominios temporales', desc: 'Servicios de buzón temporal o spam, como temp-mail' }, { key: 'spamListed', title: 'Email reportado en filtraciones o listas de spam', desc: 'Alta correlación histórica con actores comprometidos' }],
      details: { voip: { type: 'Línea VoIP detectada', severity: 'MEDIO', desc: 'El teléfono pertenece a un proveedor virtual o VoIP sin vínculo físico con SIM.' }, physical: { type: 'SIM física verificada', severity: 'SEGURO', desc: 'La línea está vinculada a una SIM/eSIM física con un operador global.' }, sim: { type: 'SIM swap reciente (7 días)', severity: 'ALTO', desc: 'La SIM se reemplazó recientemente, posible señal de toma de cuenta.' }, disposable: { type: 'Dominio de email temporal', severity: 'MEDIO', desc: 'El dominio coincide con listas de buzones temporales gratuitos.' }, spam: { type: 'Coincidencia en lista negra', severity: 'BAJO', desc: 'El email apareció en bases históricas de spam o filtraciones públicas.' } }
    }
  },
  ja: {},
  de: {},
  vi: {}
};

PHONE_EMAIL_VERIFICATION_TRANSLATIONS.ja = {
  playground: {
      "eyebrow": "Interactive Playground",
      "title": "Test phone and email verification flows",
      "desc": "Switch between OTP delivery, carrier ownership checks, and reputation screening to see how Identra can adapt the path for each user.",
      "tabs": [
        {
          "id": "otp-sms",
          "label": "SMS OTP"
        },
        {
          "id": "otp-email",
          "label": "Email OTP"
        },
        {
          "id": "carrier-db",
          "label": "Carrier lookup"
        },
        {
          "id": "risk-score",
          "label": "Risk screen"
        }
      ],
      "endpoint": "API Sandbox: v2/verifications/trust-endpoint",
      "response": "Response: 200 OK",
      "network": "5G"
    },
  sms: {
      "title": "SMS Verification Flow",
      "phoneLabel": "Phone number",
      "send": "Send SMS code",
      "sending": "Provisioning secure SMS rails...",
      "sendingSub": "Interfacing with mobile networks",
      "sentTitle": "Verification code dispatched",
      "sentDesc": "A simulated SMS code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify phone",
      "verifying": "Verifying...",
      "successTitle": "Phone verified successfully",
      "successDesc": "Ownership established. Secure 2FA token generated for Session ID",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "Identra SMS Rails",
      "notificationTime": "now",
      "notificationBody": "Your verification code is {code}.",
      "previewLabel": "Identra Security (OTP)",
      "previewStatus": "Active secure routing",
      "previewWaiting": "Waiting for SMS transmission request...",
      "previewTyping": "iMessage..."
    },
  email: {
      "title": "Email Verification Flow",
      "emailLabel": "Email address",
      "send": "Send email code",
      "sending": "Dispatching SMTP envelope...",
      "sendingSub": "Routing via Identra mail systems",
      "sentTitle": "Verification email routed",
      "sentDesc": "A simulated email code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify email",
      "verifying": "Verifying...",
      "successTitle": "Email verified successfully",
      "successDescBefore": "Ownership verified. Safe delivery reputation score logged as",
      "successRating": "Excellent",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "New Email: Identra Auth",
      "notificationTime": "now",
      "secureClient": "Secure Mail Client",
      "waiting": "Waiting for email transmission request...",
      "synthesizing": "Synthesizing SMTP envelope...",
      "sender": "Identra Auth Services",
      "subject": "Subject: Verify email identity",
      "time": "9:41 AM"
    },
  carrier: {
      "title": "Carrier Registry Verification",
      "phoneLabel": "Phone number",
      "firstNameLabel": "First name",
      "lastNameLabel": "Last name",
      "zipLabel": "Billing ZIP",
      "run": "Run carrier lookup",
      "searching": "Querying carrier registries...",
      "carriersLabel": "Simulated carriers queried:",
      "carriers": "AT&T, Verizon, T-Mobile, Sprint",
      "result": "Verification result",
      "confidence": "Match confidence",
      "firstNameMatch": "First name match",
      "lastNameMatch": "Last name match",
      "zipMatch": "Billing ZIP code match",
      "registrar": "Carrier registrar details",
      "simSwap": "Recent SIM swap check",
      "matched": "Matched",
      "partial": "Partial match",
      "mismatch": "Mismatch",
      "yes": "Yes",
      "no": "No",
      "recentSwap": "Recent SIM swap detected",
      "noRecentSwap": "No recent SIM swap",
      "logsTitle": "Registry Handshake Logs",
      "logsEyebrow": "Network Query",
      "logsIdle": "Broadcast query ready...",
      "logsSearching": "> Handshaking with T-Mobile/Verizon nodes...",
      "logsDetails": "> Registration record details:",
      "logsDone": "Verification matching script finished.",
      "registryLink": "GSM / CDMA Global Registry Link"
    },
  risk: {
      "title": "Fraud & Threat Reputation Engine",
      "phoneLabel": "Phone number",
      "emailLabel": "Email address",
      "run": "Screen reputation",
      "analyzing": "Synthesizing threat fingerprints...",
      "verdict": "Identra risk verdict",
      "threatIndex": "Threat index",
      "breakdown": "Threat signals breakdown",
      "safe": "Low risk",
      "medium": "Medium risk",
      "high": "High risk",
      "visualizer": "Passive Signal Visualizer",
      "visualizerHint": "Tweak toggles and screen reputation on the left.",
      "target": "Screen target",
      "simAge": "SIM age status",
      "lineClass": "Line class",
      "emailClass": "Email class",
      "flags": [
        {
          "key": "voipLine",
          "title": "Phone line is a VoIP line",
          "desc": "Low-friction carrier, often exploited by online bots"
        },
        {
          "key": "recentSimSwap",
          "title": "SIM card was swapped recently",
          "desc": "Tied to immediate takeover vectors and hijack risks"
        },
        {
          "key": "disposableDomain",
          "title": "Email matches temporary domain blacklist",
          "desc": "Spam or burner mailbox services, such as temp-mail"
        },
        {
          "key": "spamListed",
          "title": "Email reported in public leaks or spam list",
          "desc": "High historical correlation to compromised actors"
        }
      ],
      "details": {
        "voip": {
          "type": "VoIP line detected",
          "severity": "MEDIUM",
          "desc": "Phone number belongs to a virtual or VoIP provider, which has no physical SIM link."
        },
        "physical": {
          "type": "Physical SIM verified",
          "severity": "SAFE",
          "desc": "Phone line is tied to a physical/eSIM card with a leading global carrier."
        },
        "sim": {
          "type": "Recent SIM swap (7 days)",
          "severity": "HIGH",
          "desc": "SIM card was replaced recently, which can indicate account takeover attempts."
        },
        "disposable": {
          "type": "Disposable or temporary email domain",
          "severity": "MEDIUM",
          "desc": "The email domain matches blacklists of free temporary disposable mailboxes."
        },
        "spam": {
          "type": "Reputation blacklist hit",
          "severity": "LOW",
          "desc": "Email address was found in historical spam databases or public data leaks."
        }
      }
    },
  how: {
      "title": "How it works",
      "desc": "A frictionless three-step process built to maximize conversions while locking out malicious actors.",
      "tabs": [
        "1 Collect",
        "2 Send code",
        "3 Verify"
      ],
      "steps": [
        {
          "title": "Collect contact information",
          "desc": "Prompt users to input their phone numbers or email addresses in a responsive, branded interface. Identra formats country codes, screens for typos, and detects input categories on the fly.",
          "bullets": [
            "Branded, customizable input overlays",
            "Real-time international formatting and phone validation"
          ]
        },
        {
          "title": "Send verification code",
          "desc": "Generate and dispatch a one-time passcode (OTP) via SMS, WhatsApp, phone call, or secure email based on your configuration.",
          "bullets": [
            "SMS, WhatsApp, and email fallback options",
            "Automated multi-carrier routing for maximum deliverability"
          ]
        },
        {
          "title": "Verify ownership",
          "desc": "After the user enters the passcode, Identra returns a signed webhook confirmation so your systems can unlock the account or continue to the next identity step.",
          "bullets": [
            "Instant webhook triggers",
            "Seamless transition to ID upload or facial checks"
          ]
        }
      ],
      "mock": {
        "step1": "Step 1: Contact collection",
        "prompt": "Please enter your details to verify your identity",
        "mobile": "Mobile number",
        "continue": "Continue to code send",
        "rail": "DISPATCHING RAIL",
        "railName": "GSM Global",
        "routing": "Routing cryptographically signed SMS bundle containing passcode hash to destination",
        "dispatchTime": "Expected dispatch time: 0.8s",
        "ownership": "Ownership established",
        "ownershipDesc": "Passcode matched. Entity linked to phone registry with high assurance.",
        "status": "Verification status: COMPLETED_OWNER_MATCH"
      }
    },
  methods: {
      "title": "Explore our library of phone and email verification methods",
      "desc": "From seamless two-factor passcodes to deep telecom carrier registries, Identra provides modular tools to adapt to your compliance level.",
      "active": "Active method details displayed in playground",
      "learn": "Learn more about enrichment",
      "cards": [
        {
          "id": "2fa-phone",
          "title": "Phone number (2FA)",
          "desc": "Verify phone ownership with high-assurance two-factor authentication via automated text messages or phone calls."
        },
        {
          "id": "ownership-phone",
          "title": "Phone verification (ownership)",
          "desc": "Check legal names and phone numbers against global telecommunications carrier databases to match submitted KYC parameters."
        },
        {
          "id": "2fa-email",
          "title": "Email verification (2FA)",
          "desc": "Verify email ownership with secure email templates, one-time passcodes, and magic-link verification."
        },
        {
          "id": "risk-checks",
          "title": "Phone or email address riskiness",
          "desc": "Assess phone or email reputation via real-time risk scoring, VoIP screening, and global threat intelligence."
        }
      ]
    },
  signals: {
      "title": "Prevent fraud with additional risk signals",
      "cards": [
        {
          "title": "Two-factor authentication",
          "desc": "Protect accounts by sending a cryptographic passcode to the submitted phone number or email and validating ownership."
        },
        {
          "title": "Account takeover prevention",
          "desc": "Stop hijacking attempts by screening for recent SIM swaps, suspicious mobile porting, or burner mailbox redirects."
        },
        {
          "title": "Risk assessment",
          "desc": "Analyze phone and email reputation during onboarding. Intercept disposable domains, VoIP lines, and spam-list records."
        }
      ]
    },
  learning: {
      "title": "Keep learning",
      "articles": [
        {
          "meta": "Blog - 6 mins",
          "title": "Phone verification: An important part of identity verification and fraud prevention",
          "alt": "Phone verification insights"
        },
        {
          "meta": "Blog - 7 mins",
          "title": "3 tips for managing risk without sacrificing user experience",
          "alt": "Risk management strategies"
        },
        {
          "meta": "Guide - 12 mins",
          "title": "The strategic guide to balancing risk and conversion",
          "alt": "Conversion and risk guide"
        }
      ]
    },
  explore: {
      "title": "Explore more of Identra's identity platform",
      "cards": [
        {
          "eyebrow": "Identity flows",
          "title": "Build better identity flows",
          "desc": "Design dynamic custom flows that trigger database queries or biometric captures based on user inputs.",
          "cta": "Explore Workflows"
        },
        {
          "eyebrow": "Enrichment checks",
          "title": "Screen phone numbers and emails for risk",
          "desc": "Incorporate databases, fraud watchlists, and license matching into registration funnels.",
          "cta": "Explore Database Checks"
        }
      ]
    },
  back: '本人確認プラットフォームに戻る',
  badge: '電話番号・メール認証',
  heroTitle: '不要な摩擦を増やさずに電話番号とメールを確認。',
  heroDesc: 'ユーザーが提出した連絡先を本人が管理していることを確認し、アカウント保護を強化し、疑わしい操作を適切な検証ステップへ送ります。',
  tryDemo: 'Trải nghiệm demo',
  tryNow: '今すぐ試す',
  benefits: [
    { title: 'アカウントを保護', desc: '復旧、支払い先変更、高リスク操作の前に連絡先の所有を確認します。' },
    { title: 'ユーザーにやさしい認証', desc: 'SMS、メール、通信事業者チェックをオンボーディングに自然に組み込みます。' },
    { title: '完了率を向上', desc: '初回で所有を証明できない場合に代替手段を提供します。' }
  ],
  finalCta: { title: '始める準備はできましたか？', desc: 'Identra を今すぐ試し、高保証のワークフローを美しく拡張しましょう。', primary: 'デモを試す', secondary: '今すぐ試す' }
};

PHONE_EMAIL_VERIFICATION_TRANSLATIONS.de = {
  playground: {
      "eyebrow": "Interactive Playground",
      "title": "Test phone and email verification flows",
      "desc": "Switch between OTP delivery, carrier ownership checks, and reputation screening to see how Identra can adapt the path for each user.",
      "tabs": [
        {
          "id": "otp-sms",
          "label": "SMS OTP"
        },
        {
          "id": "otp-email",
          "label": "Email OTP"
        },
        {
          "id": "carrier-db",
          "label": "Carrier lookup"
        },
        {
          "id": "risk-score",
          "label": "Risk screen"
        }
      ],
      "endpoint": "API Sandbox: v2/verifications/trust-endpoint",
      "response": "Response: 200 OK",
      "network": "5G"
    },
  sms: {
      "title": "SMS Verification Flow",
      "phoneLabel": "Phone number",
      "send": "Send SMS code",
      "sending": "Provisioning secure SMS rails...",
      "sendingSub": "Interfacing with mobile networks",
      "sentTitle": "Verification code dispatched",
      "sentDesc": "A simulated SMS code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify phone",
      "verifying": "Verifying...",
      "successTitle": "Phone verified successfully",
      "successDesc": "Ownership established. Secure 2FA token generated for Session ID",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "Identra SMS Rails",
      "notificationTime": "now",
      "notificationBody": "Your verification code is {code}.",
      "previewLabel": "Identra Security (OTP)",
      "previewStatus": "Active secure routing",
      "previewWaiting": "Waiting for SMS transmission request...",
      "previewTyping": "iMessage..."
    },
  email: {
      "title": "Email Verification Flow",
      "emailLabel": "Email address",
      "send": "Send email code",
      "sending": "Dispatching SMTP envelope...",
      "sendingSub": "Routing via Identra mail systems",
      "sentTitle": "Verification email routed",
      "sentDesc": "A simulated email code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify email",
      "verifying": "Verifying...",
      "successTitle": "Email verified successfully",
      "successDescBefore": "Ownership verified. Safe delivery reputation score logged as",
      "successRating": "Excellent",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "New Email: Identra Auth",
      "notificationTime": "now",
      "secureClient": "Secure Mail Client",
      "waiting": "Waiting for email transmission request...",
      "synthesizing": "Synthesizing SMTP envelope...",
      "sender": "Identra Auth Services",
      "subject": "Subject: Verify email identity",
      "time": "9:41 AM"
    },
  carrier: {
      "title": "Carrier Registry Verification",
      "phoneLabel": "Phone number",
      "firstNameLabel": "First name",
      "lastNameLabel": "Last name",
      "zipLabel": "Billing ZIP",
      "run": "Run carrier lookup",
      "searching": "Querying carrier registries...",
      "carriersLabel": "Simulated carriers queried:",
      "carriers": "AT&T, Verizon, T-Mobile, Sprint",
      "result": "Verification result",
      "confidence": "Match confidence",
      "firstNameMatch": "First name match",
      "lastNameMatch": "Last name match",
      "zipMatch": "Billing ZIP code match",
      "registrar": "Carrier registrar details",
      "simSwap": "Recent SIM swap check",
      "matched": "Matched",
      "partial": "Partial match",
      "mismatch": "Mismatch",
      "yes": "Yes",
      "no": "No",
      "recentSwap": "Recent SIM swap detected",
      "noRecentSwap": "No recent SIM swap",
      "logsTitle": "Registry Handshake Logs",
      "logsEyebrow": "Network Query",
      "logsIdle": "Broadcast query ready...",
      "logsSearching": "> Handshaking with T-Mobile/Verizon nodes...",
      "logsDetails": "> Registration record details:",
      "logsDone": "Verification matching script finished.",
      "registryLink": "GSM / CDMA Global Registry Link"
    },
  risk: {
      "title": "Fraud & Threat Reputation Engine",
      "phoneLabel": "Phone number",
      "emailLabel": "Email address",
      "run": "Screen reputation",
      "analyzing": "Synthesizing threat fingerprints...",
      "verdict": "Identra risk verdict",
      "threatIndex": "Threat index",
      "breakdown": "Threat signals breakdown",
      "safe": "Low risk",
      "medium": "Medium risk",
      "high": "High risk",
      "visualizer": "Passive Signal Visualizer",
      "visualizerHint": "Tweak toggles and screen reputation on the left.",
      "target": "Screen target",
      "simAge": "SIM age status",
      "lineClass": "Line class",
      "emailClass": "Email class",
      "flags": [
        {
          "key": "voipLine",
          "title": "Phone line is a VoIP line",
          "desc": "Low-friction carrier, often exploited by online bots"
        },
        {
          "key": "recentSimSwap",
          "title": "SIM card was swapped recently",
          "desc": "Tied to immediate takeover vectors and hijack risks"
        },
        {
          "key": "disposableDomain",
          "title": "Email matches temporary domain blacklist",
          "desc": "Spam or burner mailbox services, such as temp-mail"
        },
        {
          "key": "spamListed",
          "title": "Email reported in public leaks or spam list",
          "desc": "High historical correlation to compromised actors"
        }
      ],
      "details": {
        "voip": {
          "type": "VoIP line detected",
          "severity": "MEDIUM",
          "desc": "Phone number belongs to a virtual or VoIP provider, which has no physical SIM link."
        },
        "physical": {
          "type": "Physical SIM verified",
          "severity": "SAFE",
          "desc": "Phone line is tied to a physical/eSIM card with a leading global carrier."
        },
        "sim": {
          "type": "Recent SIM swap (7 days)",
          "severity": "HIGH",
          "desc": "SIM card was replaced recently, which can indicate account takeover attempts."
        },
        "disposable": {
          "type": "Disposable or temporary email domain",
          "severity": "MEDIUM",
          "desc": "The email domain matches blacklists of free temporary disposable mailboxes."
        },
        "spam": {
          "type": "Reputation blacklist hit",
          "severity": "LOW",
          "desc": "Email address was found in historical spam databases or public data leaks."
        }
      }
    },
  how: {
      "title": "How it works",
      "desc": "A frictionless three-step process built to maximize conversions while locking out malicious actors.",
      "tabs": [
        "1 Collect",
        "2 Send code",
        "3 Verify"
      ],
      "steps": [
        {
          "title": "Collect contact information",
          "desc": "Prompt users to input their phone numbers or email addresses in a responsive, branded interface. Identra formats country codes, screens for typos, and detects input categories on the fly.",
          "bullets": [
            "Branded, customizable input overlays",
            "Real-time international formatting and phone validation"
          ]
        },
        {
          "title": "Send verification code",
          "desc": "Generate and dispatch a one-time passcode (OTP) via SMS, WhatsApp, phone call, or secure email based on your configuration.",
          "bullets": [
            "SMS, WhatsApp, and email fallback options",
            "Automated multi-carrier routing for maximum deliverability"
          ]
        },
        {
          "title": "Verify ownership",
          "desc": "After the user enters the passcode, Identra returns a signed webhook confirmation so your systems can unlock the account or continue to the next identity step.",
          "bullets": [
            "Instant webhook triggers",
            "Seamless transition to ID upload or facial checks"
          ]
        }
      ],
      "mock": {
        "step1": "Step 1: Contact collection",
        "prompt": "Please enter your details to verify your identity",
        "mobile": "Mobile number",
        "continue": "Continue to code send",
        "rail": "DISPATCHING RAIL",
        "railName": "GSM Global",
        "routing": "Routing cryptographically signed SMS bundle containing passcode hash to destination",
        "dispatchTime": "Expected dispatch time: 0.8s",
        "ownership": "Ownership established",
        "ownershipDesc": "Passcode matched. Entity linked to phone registry with high assurance.",
        "status": "Verification status: COMPLETED_OWNER_MATCH"
      }
    },
  methods: {
      "title": "Explore our library of phone and email verification methods",
      "desc": "From seamless two-factor passcodes to deep telecom carrier registries, Identra provides modular tools to adapt to your compliance level.",
      "active": "Active method details displayed in playground",
      "learn": "Learn more about enrichment",
      "cards": [
        {
          "id": "2fa-phone",
          "title": "Phone number (2FA)",
          "desc": "Verify phone ownership with high-assurance two-factor authentication via automated text messages or phone calls."
        },
        {
          "id": "ownership-phone",
          "title": "Phone verification (ownership)",
          "desc": "Check legal names and phone numbers against global telecommunications carrier databases to match submitted KYC parameters."
        },
        {
          "id": "2fa-email",
          "title": "Email verification (2FA)",
          "desc": "Verify email ownership with secure email templates, one-time passcodes, and magic-link verification."
        },
        {
          "id": "risk-checks",
          "title": "Phone or email address riskiness",
          "desc": "Assess phone or email reputation via real-time risk scoring, VoIP screening, and global threat intelligence."
        }
      ]
    },
  signals: {
      "title": "Prevent fraud with additional risk signals",
      "cards": [
        {
          "title": "Two-factor authentication",
          "desc": "Protect accounts by sending a cryptographic passcode to the submitted phone number or email and validating ownership."
        },
        {
          "title": "Account takeover prevention",
          "desc": "Stop hijacking attempts by screening for recent SIM swaps, suspicious mobile porting, or burner mailbox redirects."
        },
        {
          "title": "Risk assessment",
          "desc": "Analyze phone and email reputation during onboarding. Intercept disposable domains, VoIP lines, and spam-list records."
        }
      ]
    },
  learning: {
      "title": "Keep learning",
      "articles": [
        {
          "meta": "Blog - 6 mins",
          "title": "Phone verification: An important part of identity verification and fraud prevention",
          "alt": "Phone verification insights"
        },
        {
          "meta": "Blog - 7 mins",
          "title": "3 tips for managing risk without sacrificing user experience",
          "alt": "Risk management strategies"
        },
        {
          "meta": "Guide - 12 mins",
          "title": "The strategic guide to balancing risk and conversion",
          "alt": "Conversion and risk guide"
        }
      ]
    },
  explore: {
      "title": "Explore more of Identra's identity platform",
      "cards": [
        {
          "eyebrow": "Identity flows",
          "title": "Build better identity flows",
          "desc": "Design dynamic custom flows that trigger database queries or biometric captures based on user inputs.",
          "cta": "Explore Workflows"
        },
        {
          "eyebrow": "Enrichment checks",
          "title": "Screen phone numbers and emails for risk",
          "desc": "Incorporate databases, fraud watchlists, and license matching into registration funnels.",
          "cta": "Explore Database Checks"
        }
      ]
    },
  back: 'Zurück zur Identitätsplattform',
  badge: 'Telefon- und E-Mail-Verifizierung',
  heroTitle: 'Telefonnummern und E-Mails verifizieren, ohne unnötige Reibung zu erzeugen.',
  heroDesc: 'Bestätigen Sie, dass Nutzer die angegebenen Kontaktdaten kontrollieren, stärken Sie die Kontosicherheit und leiten Sie verdächtige Aktivitäten in den passenden Verifizierungsschritt.',
  tryDemo: 'Trải nghiệm demo',
  tryNow: 'Jetzt ausprobieren',
  benefits: [
    { title: 'Konten schützen', desc: 'Prüfen Sie Kontaktbesitz vor Kontowiederherstellung, Auszahlungsänderungen oder riskanten Aktionen.' },
    { title: 'Verifizierung einfach machen', desc: 'Nutzen Sie SMS, E-Mail und Carrier-Prüfungen, die sich nativ in Ihr Onboarding einfügen.' },
    { title: 'Abschlussraten erhöhen', desc: 'Bieten Sie Fallback-Methoden an, wenn Nutzer Besitz nicht beim ersten Versuch nachweisen können.' }
  ],
  finalCta: { title: 'Bereit loszulegen?', desc: 'Kontaktieren Sie Identra oder erkunden Sie heute unsere Verifizierungstools. Erstellen Sie hochsichere Workflows, die elegant skalieren.', primary: 'Demo testen', secondary: 'Jetzt ausprobieren' }
};

PHONE_EMAIL_VERIFICATION_TRANSLATIONS.vi = {
  sms: {
      "title": "SMS Verification Flow",
      "phoneLabel": "Phone number",
      "send": "Send SMS code",
      "sending": "Provisioning secure SMS rails...",
      "sendingSub": "Interfacing with mobile networks",
      "sentTitle": "Verification code dispatched",
      "sentDesc": "A simulated SMS code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify phone",
      "verifying": "Verifying...",
      "successTitle": "Phone verified successfully",
      "successDesc": "Ownership established. Secure 2FA token generated for Session ID",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "Identra SMS Rails",
      "notificationTime": "now",
      "notificationBody": "Your verification code is {code}.",
      "previewLabel": "Identra Security (OTP)",
      "previewStatus": "Active secure routing",
      "previewWaiting": "Waiting for SMS transmission request...",
      "previewTyping": "iMessage..."
    },
  email: {
      "title": "Email Verification Flow",
      "emailLabel": "Email address",
      "send": "Send email code",
      "sending": "Dispatching SMTP envelope...",
      "sendingSub": "Routing via Identra mail systems",
      "sentTitle": "Verification email routed",
      "sentDesc": "A simulated email code was sent. Use the generated code or 123456.",
      "codeLabel": "Verification code",
      "verify": "Verify email",
      "verifying": "Verifying...",
      "successTitle": "Email verified successfully",
      "successDescBefore": "Ownership verified. Safe delivery reputation score logged as",
      "successRating": "Excellent",
      "error": "The code did not match. Try the generated code or 123456.",
      "notificationTitle": "New Email: Identra Auth",
      "notificationTime": "now",
      "secureClient": "Secure Mail Client",
      "waiting": "Waiting for email transmission request...",
      "synthesizing": "Synthesizing SMTP envelope...",
      "sender": "Identra Auth Services",
      "subject": "Subject: Verify email identity",
      "time": "9:41 AM"
    },
  carrier: {
      "title": "Carrier Registry Verification",
      "phoneLabel": "Phone number",
      "firstNameLabel": "First name",
      "lastNameLabel": "Last name",
      "zipLabel": "Billing ZIP",
      "run": "Run carrier lookup",
      "searching": "Querying carrier registries...",
      "carriersLabel": "Simulated carriers queried:",
      "carriers": "AT&T, Verizon, T-Mobile, Sprint",
      "result": "Verification result",
      "confidence": "Match confidence",
      "firstNameMatch": "First name match",
      "lastNameMatch": "Last name match",
      "zipMatch": "Billing ZIP code match",
      "registrar": "Carrier registrar details",
      "simSwap": "Recent SIM swap check",
      "matched": "Matched",
      "partial": "Partial match",
      "mismatch": "Mismatch",
      "yes": "Yes",
      "no": "No",
      "recentSwap": "Recent SIM swap detected",
      "noRecentSwap": "No recent SIM swap",
      "logsTitle": "Registry Handshake Logs",
      "logsEyebrow": "Network Query",
      "logsIdle": "Broadcast query ready...",
      "logsSearching": "> Handshaking with T-Mobile/Verizon nodes...",
      "logsDetails": "> Registration record details:",
      "logsDone": "Verification matching script finished.",
      "registryLink": "GSM / CDMA Global Registry Link"
    },
  risk: {
      "title": "Fraud & Threat Reputation Engine",
      "phoneLabel": "Phone number",
      "emailLabel": "Email address",
      "run": "Screen reputation",
      "analyzing": "Synthesizing threat fingerprints...",
      "verdict": "Identra risk verdict",
      "threatIndex": "Threat index",
      "breakdown": "Threat signals breakdown",
      "safe": "Low risk",
      "medium": "Medium risk",
      "high": "High risk",
      "visualizer": "Passive Signal Visualizer",
      "visualizerHint": "Tweak toggles and screen reputation on the left.",
      "target": "Screen target",
      "simAge": "SIM age status",
      "lineClass": "Line class",
      "emailClass": "Email class",
      "flags": [
        {
          "key": "voipLine",
          "title": "Phone line is a VoIP line",
          "desc": "Low-friction carrier, often exploited by online bots"
        },
        {
          "key": "recentSimSwap",
          "title": "SIM card was swapped recently",
          "desc": "Tied to immediate takeover vectors and hijack risks"
        },
        {
          "key": "disposableDomain",
          "title": "Email matches temporary domain blacklist",
          "desc": "Spam or burner mailbox services, such as temp-mail"
        },
        {
          "key": "spamListed",
          "title": "Email reported in public leaks or spam list",
          "desc": "High historical correlation to compromised actors"
        }
      ],
      "details": {
        "voip": {
          "type": "VoIP line detected",
          "severity": "MEDIUM",
          "desc": "Phone number belongs to a virtual or VoIP provider, which has no physical SIM link."
        },
        "physical": {
          "type": "Physical SIM verified",
          "severity": "SAFE",
          "desc": "Phone line is tied to a physical/eSIM card with a leading global carrier."
        },
        "sim": {
          "type": "Recent SIM swap (7 days)",
          "severity": "HIGH",
          "desc": "SIM card was replaced recently, which can indicate account takeover attempts."
        },
        "disposable": {
          "type": "Disposable or temporary email domain",
          "severity": "MEDIUM",
          "desc": "The email domain matches blacklists of free temporary disposable mailboxes."
        },
        "spam": {
          "type": "Reputation blacklist hit",
          "severity": "LOW",
          "desc": "Email address was found in historical spam databases or public data leaks."
        }
      }
    },
  how: {
      "title": "How it works",
      "desc": "A frictionless three-step process built to maximize conversions while locking out malicious actors.",
      "tabs": [
        "1 Collect",
        "2 Send code",
        "3 Verify"
      ],
      "steps": [
        {
          "title": "Collect contact information",
          "desc": "Prompt users to input their phone numbers or email addresses in a responsive, branded interface. Identra formats country codes, screens for typos, and detects input categories on the fly.",
          "bullets": [
            "Branded, customizable input overlays",
            "Real-time international formatting and phone validation"
          ]
        },
        {
          "title": "Send verification code",
          "desc": "Generate and dispatch a one-time passcode (OTP) via SMS, WhatsApp, phone call, or secure email based on your configuration.",
          "bullets": [
            "SMS, WhatsApp, and email fallback options",
            "Automated multi-carrier routing for maximum deliverability"
          ]
        },
        {
          "title": "Verify ownership",
          "desc": "After the user enters the passcode, Identra returns a signed webhook confirmation so your systems can unlock the account or continue to the next identity step.",
          "bullets": [
            "Instant webhook triggers",
            "Seamless transition to ID upload or facial checks"
          ]
        }
      ],
      "mock": {
        "step1": "Step 1: Contact collection",
        "prompt": "Please enter your details to verify your identity",
        "mobile": "Mobile number",
        "continue": "Continue to code send",
        "rail": "DISPATCHING RAIL",
        "railName": "GSM Global",
        "routing": "Routing cryptographically signed SMS bundle containing passcode hash to destination",
        "dispatchTime": "Expected dispatch time: 0.8s",
        "ownership": "Ownership established",
        "ownershipDesc": "Passcode matched. Entity linked to phone registry with high assurance.",
        "status": "Verification status: COMPLETED_OWNER_MATCH"
      }
    },
  methods: {
      "title": "Explore our library of phone and email verification methods",
      "desc": "From seamless two-factor passcodes to deep telecom carrier registries, Identra provides modular tools to adapt to your compliance level.",
      "active": "Active method details displayed in playground",
      "learn": "Learn more about enrichment",
      "cards": [
        {
          "id": "2fa-phone",
          "title": "Phone number (2FA)",
          "desc": "Verify phone ownership with high-assurance two-factor authentication via automated text messages or phone calls."
        },
        {
          "id": "ownership-phone",
          "title": "Phone verification (ownership)",
          "desc": "Check legal names and phone numbers against global telecommunications carrier databases to match submitted KYC parameters."
        },
        {
          "id": "2fa-email",
          "title": "Email verification (2FA)",
          "desc": "Verify email ownership with secure email templates, one-time passcodes, and magic-link verification."
        },
        {
          "id": "risk-checks",
          "title": "Phone or email address riskiness",
          "desc": "Assess phone or email reputation via real-time risk scoring, VoIP screening, and global threat intelligence."
        }
      ]
    },
  signals: {
      "title": "Prevent fraud with additional risk signals",
      "cards": [
        {
          "title": "Two-factor authentication",
          "desc": "Protect accounts by sending a cryptographic passcode to the submitted phone number or email and validating ownership."
        },
        {
          "title": "Account takeover prevention",
          "desc": "Stop hijacking attempts by screening for recent SIM swaps, suspicious mobile porting, or burner mailbox redirects."
        },
        {
          "title": "Risk assessment",
          "desc": "Analyze phone and email reputation during onboarding. Intercept disposable domains, VoIP lines, and spam-list records."
        }
      ]
    },
  learning: {
      "title": "Keep learning",
      "articles": [
        {
          "meta": "Blog - 6 mins",
          "title": "Phone verification: An important part of identity verification and fraud prevention",
          "alt": "Phone verification insights"
        },
        {
          "meta": "Blog - 7 mins",
          "title": "3 tips for managing risk without sacrificing user experience",
          "alt": "Risk management strategies"
        },
        {
          "meta": "Guide - 12 mins",
          "title": "The strategic guide to balancing risk and conversion",
          "alt": "Conversion and risk guide"
        }
      ]
    },
  explore: {
      "title": "Explore more of Identra's identity platform",
      "cards": [
        {
          "eyebrow": "Identity flows",
          "title": "Build better identity flows",
          "desc": "Design dynamic custom flows that trigger database queries or biometric captures based on user inputs.",
          "cta": "Explore Workflows"
        },
        {
          "eyebrow": "Enrichment checks",
          "title": "Screen phone numbers and emails for risk",
          "desc": "Incorporate databases, fraud watchlists, and license matching into registration funnels.",
          "cta": "Explore Database Checks"
        }
      ]
    },
  back: 'Quay lại nền tảng định danh',
  badge: 'Xác minh điện thoại và email',
  heroTitle: 'Xác minh số điện thoại và email mà không tạo thêm ma sát không cần thiết.',
  heroDesc: 'Xác nhận người dùng kiểm soát thông tin liên hệ họ gửi, tăng cường bảo mật tài khoản và chuyển hoạt động đáng ngờ đến đúng bước xác minh.',
  tryDemo: 'Trải nghiệm demo',
  tryNow: 'Dùng thử ngay',
  benefits: [
    { title: 'Bảo vệ tài khoản', desc: 'Xác minh quyền sở hữu thông tin liên hệ trước khi khôi phục tài khoản, đổi thông tin nhận tiền hoặc thực hiện hành động rủi ro cao.' },
    { title: 'Giúp người dùng xác minh dễ dàng', desc: 'Dùng SMS, email và kiểm tra nhà mạng theo cách tự nhiên trong luồng onboarding.' },
    { title: 'Tăng tỷ lệ hoàn tất', desc: 'Cung cấp phương thức dự phòng khi người dùng chưa thể chứng minh quyền sở hữu ở lần đầu.' }
  ],
  playground: {
    endpoint: "API Sandbox: v2/verifications/trust-endpoint",
    network: "5G",
    eyebrow: 'Khu thử nghiệm tương tác',
    title: 'Kiểm thử luồng xác minh điện thoại và email',
    desc: 'Chuyển giữa gửi OTP, kiểm tra quyền sở hữu qua nhà mạng và sàng lọc uy tín để xem Identra điều chỉnh lộ trình cho từng người dùng như thế nào.',
    tabs: [{ id: 'otp-sms', label: 'OTP qua SMS' }, { id: 'otp-email', label: 'OTP qua email' }, { id: 'carrier-db', label: 'Tra cứu nhà mạng' }, { id: 'risk-score', label: 'Sàng lọc rủi ro' }],
    response: 'Phản hồi: 200 OK'
  },
  finalCta: { title: 'Sẵn sàng bắt đầu?', desc: 'Liên hệ hoặc bắt đầu khám phá Identra ngay hôm nay. Xây dựng workflow độ tin cậy cao có thể mở rộng mượt mà.', primary: 'Trải nghiệm demo', secondary: 'Dùng thử ngay' }
};

Object.assign(PHONE_EMAIL_VERIFICATION_TRANSLATIONS.es, {
  how: {
    title: 'Cómo funciona',
    desc: 'Un proceso de tres pasos sin fricción, diseñado para maximizar conversiones y bloquear actores maliciosos.',
    tabs: ['1 Recopilar', '2 Enviar código', '3 Verificar'],
    steps: [
      { title: 'Recopilar información de contacto', desc: 'Pide a los usuarios su teléfono o email en una interfaz adaptable y de marca. Identra formatea códigos de país, detecta errores y clasifica el dato al instante.', bullets: ['Entradas personalizables con marca', 'Formato internacional y validación de teléfono en tiempo real'] },
      { title: 'Enviar código de verificación', desc: 'Genera y envía un código OTP por SMS, WhatsApp, llamada o email seguro según tu configuración.', bullets: ['Opciones de respaldo por SMS, WhatsApp y email', 'Enrutamiento multioperador para máxima entregabilidad'] },
      { title: 'Verificar propiedad', desc: 'Cuando el usuario introduce el código, Identra devuelve una confirmación webhook firmada para desbloquear la cuenta o continuar el flujo.', bullets: ['Webhooks instantáneos', 'Transición fluida a carga de ID o verificación facial'] }
    ],
    mock: { step1: 'Paso 1: Recopilación de contacto', prompt: 'Ingresa tus datos para verificar tu identidad', mobile: 'Número móvil', continue: 'Continuar al envío de código', rail: 'RUTA EN ENVÍO', railName: 'GSM Global', routing: 'Enrutando paquete SMS firmado con hash del código hacia', dispatchTime: 'Tiempo estimado de envío: 0,8 s', ownership: 'Propiedad establecida', ownershipDesc: 'El código coincide. Entidad vinculada al registro telefónico con alta confianza.', status: 'Estado de verificación: COMPLETED_OWNER_MATCH' }
  },
  methods: {
    title: 'Explora nuestra biblioteca de métodos de verificación de teléfono y email',
    desc: 'Desde códigos de dos factores hasta registros profundos de operadores, Identra ofrece herramientas modulares para tu nivel de cumplimiento.',
    active: 'Detalles del método activo mostrados en el playground',
    learn: 'Más información sobre enriquecimiento',
    cards: [
      { id: '2fa-phone', title: 'Número de teléfono (2FA)', desc: 'Verifica la propiedad del teléfono con autenticación de alta confianza por mensajes o llamadas automáticas.' },
      { id: 'ownership-phone', title: 'Verificación telefónica (propiedad)', desc: 'Compara nombres legales y teléfonos con bases globales de operadores para validar parámetros KYC.' },
      { id: '2fa-email', title: 'Verificación de email (2FA)', desc: 'Confirma la propiedad del email con plantillas seguras, códigos OTP y magic links.' },
      { id: 'risk-checks', title: 'Riesgo de teléfono o email', desc: 'Evalúa reputación mediante scoring en tiempo real, detección VoIP e inteligencia global de amenazas.' }
    ]
  },
  signals: { title: 'Prevén fraude con señales de riesgo adicionales', cards: [{ title: 'Autenticación de dos factores', desc: 'Protege cuentas enviando un código criptográfico al teléfono o email y validando propiedad.' }, { title: 'Prevención de toma de cuenta', desc: 'Detén secuestros revisando SIM swaps recientes, portabilidades sospechosas o buzones temporales.' }, { title: 'Evaluación de riesgo', desc: 'Analiza reputación durante onboarding e intercepta dominios temporales, líneas VoIP y registros de spam.' }] },
  learning: { title: 'Sigue aprendiendo', articles: [{ meta: 'Blog - 6 min', title: 'Verificación telefónica: parte clave de identidad y prevención de fraude', alt: 'Ideas sobre verificación telefónica' }, { meta: 'Blog - 7 min', title: '3 consejos para gestionar riesgo sin sacrificar experiencia de usuario', alt: 'Estrategias de gestión de riesgo' }, { meta: 'Guía - 12 min', title: 'Guía estratégica para equilibrar riesgo y conversión', alt: 'Guía de conversión y riesgo' }] },
  explore: { title: 'Explora más de la plataforma de identidad de Identra', cards: [{ eyebrow: 'Flujos de identidad', title: 'Crea mejores flujos de identidad', desc: 'Diseña flujos dinámicos que activan consultas o capturas biométricas según los datos del usuario.', cta: 'Explorar Workflows' }, { eyebrow: 'Comprobaciones enriquecidas', title: 'Evalúa teléfonos y emails por riesgo', desc: 'Incorpora bases de datos, listas antifraude y coincidencia de licencias en tus registros.', cta: 'Explorar Database Checks' }] },
  finalCta: { title: '¿Listo para empezar?', desc: 'Contacta con Identra o empieza a explorar hoy. Crea workflows de alta confianza que escalan con elegancia.', primary: 'Probar la demo', secondary: 'Probar ahora' }
});

Object.assign(PHONE_EMAIL_VERIFICATION_TRANSLATIONS.ja, {
  playground: { endpoint: "API Sandbox: v2/verifications/trust-endpoint", eyebrow: 'インタラクティブ環境', title: '電話番号とメールの認証フローをテスト', desc: 'OTP 配信、通信事業者の所有確認、評判スクリーニングを切り替え、Identra が各ユーザーの経路を調整する様子を確認できます。', tabs: [{ id: 'otp-sms', label: 'SMS OTP' }, { id: 'otp-email', label: 'メール OTP' }, { id: 'carrier-db', label: '通信事業者照会' }, { id: 'risk-score', label: 'リスク審査' }], response: 'レスポンス: 200 OK', network: '5G' },
  sms: { notificationTitle: "Identra SMS Rails",
    notificationTime: "now",
    notificationBody: "Your verification code is {code}.",
    previewLabel: "Identra Security (OTP)",
    previewStatus: "Active secure routing",
    previewTyping: "iMessage...", title: 'SMS 認証フロー', phoneLabel: '電話番号', send: 'SMS コードを送信', sending: '安全な SMS 経路を準備中...', sendingSub: 'モバイルネットワークと接続中', sentTitle: '認証コードを送信しました', sentDesc: '模擬 SMS コードを送信しました。生成コードまたは 123456 を使用できます。', codeLabel: '認証コード', verify: '電話番号を認証', verifying: '確認中...', successTitle: '電話番号の認証が完了しました', successDesc: '所有確認が完了しました。Session ID 用の安全な 2FA トークンを生成しました', error: 'コードが一致しません。生成コードまたは 123456 をお試しください。', previewWaiting: 'SMS 送信リクエストを待機中...' },
  email: { notificationTitle: "New Email: Identra Auth",
    notificationTime: "now",
    sender: "Identra Auth Services",
    time: "9:41 AM", title: 'メール認証フロー', emailLabel: 'メールアドレス', send: 'メールコードを送信', sending: 'SMTP エンベロープを送信中...', sendingSub: 'Identra メールシステム経由で配送中', sentTitle: '認証メールを送信しました', sentDesc: '模擬メールコードを送信しました。生成コードまたは 123456 を使用できます。', codeLabel: '認証コード', verify: 'メールを認証', verifying: '確認中...', successTitle: 'メール認証が完了しました', successDescBefore: '所有確認が完了しました。安全な配信評判スコア:', successRating: '優秀', error: 'コードが一致しません。生成コードまたは 123456 をお試しください。', secureClient: '安全なメールクライアント', waiting: 'メール送信リクエストを待機中...', synthesizing: 'SMTP エンベロープを作成中...', subject: '件名: メール本人確認' },
  carrier: { carriersLabel: "Simulated carriers queried:",
    carriers: "AT&T, Verizon, T-Mobile, Sprint",
    registryLink: "GSM / CDMA Global Registry Link", title: '通信事業者レジストリ認証', phoneLabel: '電話番号', firstNameLabel: '名', lastNameLabel: '姓', zipLabel: '請求先 ZIP', run: '通信事業者照会を実行', searching: '通信事業者レジストリを照会中...', result: '認証結果', confidence: '一致信頼度', firstNameMatch: '名の一致', lastNameMatch: '姓の一致', zipMatch: '請求先 ZIP の一致', registrar: '通信事業者登録情報', simSwap: '最近の SIM 交換チェック', matched: '一致', partial: '部分一致', mismatch: '不一致', yes: 'はい', no: 'いいえ', recentSwap: '最近の SIM 交換を検出', noRecentSwap: '最近の SIM 交換なし', logsTitle: 'レジストリ接続ログ', logsEyebrow: 'ネットワーク照会', logsIdle: 'ブロードキャスト照会準備完了...', logsSearching: '> T-Mobile/Verizon ノードと接続中...', logsDetails: '> 登録レコード詳細:', logsDone: '照合スクリプトが完了しました。' },
  risk: {  title: '不正・脅威評判エンジン', phoneLabel: '電話番号', emailLabel: 'メールアドレス', run: '評判を審査', analyzing: '脅威フィンガープリントを生成中...', verdict: 'Identra リスク判定', threatIndex: '脅威指数', breakdown: '脅威シグナル内訳', safe: '低リスク', medium: '中リスク', high: '高リスク', visualizer: 'パッシブシグナル表示', visualizerHint: '左側の切り替えで評判を確認します。', target: '審査対象', simAge: 'SIM 年齢状態', lineClass: '回線クラス', emailClass: 'メールクラス', flags: [{ key: 'voipLine', title: '電話回線が VoIP', desc: '低摩擦の通信経路で、オンラインボットに悪用されがちです' }, { key: 'recentSimSwap', title: 'SIM が最近交換された', desc: 'アカウント乗っ取りの即時リスクと関連します' }, { key: 'disposableDomain', title: '一時メールドメインに一致', desc: 'temp-mail などの使い捨てメールサービス' }, { key: 'spamListed', title: '漏えいまたはスパムリストで報告', desc: '侵害済みアクターとの過去相関が高いです' }], details: { voip: { type: 'VoIP 回線を検出', severity: '中', desc: '電話番号は物理 SIM に紐づかない仮想または VoIP プロバイダーに属しています。' }, physical: { type: '物理 SIM を確認', severity: '安全', desc: '電話回線は主要通信事業者の物理 SIM/eSIM に紐づいています。' }, sim: { type: '最近の SIM 交換（7日）', severity: '高', desc: 'SIM が最近交換されており、アカウント乗っ取りの兆候になり得ます。' }, disposable: { type: '一時メールドメイン', severity: '中', desc: 'メールドメインが無料の使い捨てメールボックスのブラックリストと一致しました。' }, spam: { type: '評判ブラックリスト一致', severity: '低', desc: 'メールアドレスが過去のスパムデータベースまたは公開漏えいで見つかりました。' } } },
  how: { title: '仕組み', desc: '悪質な利用者を締め出しながら完了率を高める、摩擦の少ない 3 ステップです。', tabs: ['1 収集', '2 コード送信', '3 確認'], steps: [{ title: '連絡先情報を収集', desc: 'ユーザーに電話番号またはメールアドレスを入力してもらいます。Identra は国番号を整形し、入力ミスを検出し、種別を即時判定します。', bullets: ['ブランドに合わせた入力画面', '国際形式の整形と電話番号検証'] }, { title: '認証コードを送信', desc: '設定に応じて SMS、WhatsApp、電話、または安全なメールで OTP を生成・送信します。', bullets: ['SMS、WhatsApp、メールの代替手段', '到達率を高める複数キャリアルーティング'] }, { title: '所有を確認', desc: 'ユーザーがコードを入力すると、Identra が署名済み webhook 確認を返し、次の本人確認ステップへ進めます。', bullets: ['即時 webhook トリガー', 'ID アップロードや顔認証への自然な遷移'] }], mock: { step1: 'ステップ 1: 連絡先収集', prompt: '本人確認のため詳細を入力してください', mobile: '携帯番号', continue: 'コード送信へ進む', rail: '送信経路', railName: 'GSM Global', routing: '署名済み SMS バンドルを送信先へルーティング中', dispatchTime: '想定送信時間: 0.8 秒', ownership: '所有確認済み', ownershipDesc: 'コードが一致しました。電話レジストリと高い信頼度で紐づいています。', status: '認証ステータス: COMPLETED_OWNER_MATCH' } },
  methods: { title: '電話番号・メール認証メソッドのライブラリを見る', desc: '2要素コードから通信事業者レジストリまで、Identra はコンプライアンス水準に合わせたモジュール型ツールを提供します。', active: '有効なメソッドの詳細をプレイグラウンドに表示中', learn: 'エンリッチメントについて詳しく見る', cards: [{ id: '2fa-phone', title: '電話番号（2FA）', desc: '自動 SMS または通話で高保証の 2要素認証を行い、電話番号の所有を確認します。' }, { id: 'ownership-phone', title: '電話認証（所有確認）', desc: '法的氏名と電話番号を通信事業者データベースと照合し、KYC 情報と一致させます。' }, { id: '2fa-email', title: 'メール認証（2FA）', desc: '安全なメールテンプレート、OTP、magic link でメール所有を確認します。' }, { id: 'risk-checks', title: '電話またはメールのリスク', desc: 'リアルタイムスコア、VoIP 検出、脅威インテリジェンスで評判を評価します。' }] },
  signals: { title: '追加リスクシグナルで不正を防止', cards: [{ title: '2要素認証', desc: '電話番号またはメールに暗号化コードを送り、所有を確認してアカウントを保護します。' }, { title: 'アカウント乗っ取り防止', desc: '最近の SIM 交換、不審な番号移行、使い捨てメール転送を検出します。' }, { title: 'リスク評価', desc: 'オンボーディング中に電話とメールの評判を分析し、使い捨てドメインや VoIP、スパム記録を遮断します。' }] },
  learning: { title: 'さらに学ぶ', articles: [{ meta: 'ブログ - 6分', title: '電話認証: 本人確認と不正防止の重要な要素', alt: '電話認証の洞察' }, { meta: 'ブログ - 7分', title: 'ユーザー体験を損なわずにリスクを管理する 3 つのヒント', alt: 'リスク管理戦略' }, { meta: 'ガイド - 12分', title: 'リスクとコンバージョンのバランスを取る戦略ガイド', alt: 'コンバージョンとリスクのガイド' }] },
  explore: { title: 'Identra の本人確認プラットフォームをさらに見る', cards: [{ eyebrow: '本人確認フロー', title: 'より良い本人確認フローを構築', desc: 'ユーザー入力に基づいてデータベース照会や生体認証を起動する動的フローを設計します。', cta: 'Workflows を見る' }, { eyebrow: 'エンリッチメントチェック', title: '電話番号とメールのリスクを審査', desc: 'データベース、不正ウォッチリスト、免許証照合を登録フローに組み込みます。', cta: 'Database Checks を見る' }] }
});

Object.assign(PHONE_EMAIL_VERIFICATION_TRANSLATIONS.de, {
  playground: { endpoint: "API Sandbox: v2/verifications/trust-endpoint", eyebrow: 'Interaktiver Playground', title: 'Telefon- und E-Mail-Verifizierungsflüsse testen', desc: 'Wechseln Sie zwischen OTP-Zustellung, Carrier-Besitzprüfung und Reputationsscreening, um Identras adaptive Nutzerpfade zu sehen.', tabs: [{ id: 'otp-sms', label: 'SMS OTP' }, { id: 'otp-email', label: 'E-Mail OTP' }, { id: 'carrier-db', label: 'Carrier-Abfrage' }, { id: 'risk-score', label: 'Risiko-Scan' }], response: 'Antwort: 200 OK', network: '5G' },
  sms: { notificationTitle: "Identra SMS Rails",
    notificationTime: "now",
    notificationBody: "Your verification code is {code}.",
    previewLabel: "Identra Security (OTP)",
    previewStatus: "Active secure routing",
    previewTyping: "iMessage...", title: 'SMS-Verifizierungsfluss', phoneLabel: 'Telefonnummer', send: 'SMS-Code senden', sending: 'Sichere SMS-Routen werden bereitgestellt...', sendingSub: 'Verbindung mit Mobilfunknetzen', sentTitle: 'Verifizierungscode gesendet', sentDesc: 'Ein simulierter SMS-Code wurde gesendet. Nutzen Sie den generierten Code oder 123456.', codeLabel: 'Verifizierungscode', verify: 'Telefon verifizieren', verifying: 'Wird verifiziert...', successTitle: 'Telefon erfolgreich verifiziert', successDesc: 'Besitz bestätigt. Sicheres 2FA-Token für Session ID generiert', error: 'Der Code stimmt nicht überein. Nutzen Sie den generierten Code oder 123456.', previewWaiting: 'Warten auf SMS-Übertragungsanfrage...' },
  email: { notificationTitle: "New Email: Identra Auth",
    notificationTime: "now",
    sender: "Identra Auth Services",
    time: "9:41 AM", title: 'E-Mail-Verifizierungsfluss', emailLabel: 'E-Mail-Adresse', send: 'E-Mail-Code senden', sending: 'SMTP-Umschlag wird versendet...', sendingSub: 'Routing über Identra-Mail-Systeme', sentTitle: 'Verifizierungs-E-Mail zugestellt', sentDesc: 'Ein simulierter E-Mail-Code wurde gesendet. Nutzen Sie den generierten Code oder 123456.', codeLabel: 'Verifizierungscode', verify: 'E-Mail verifizieren', verifying: 'Wird verifiziert...', successTitle: 'E-Mail erfolgreich verifiziert', successDescBefore: 'Besitz bestätigt. Sichere Zustellreputation protokolliert als', successRating: 'Ausgezeichnet', error: 'Der Code stimmt nicht überein. Nutzen Sie den generierten Code oder 123456.', secureClient: 'Sicherer Mail-Client', waiting: 'Warten auf E-Mail-Sendeanfrage...', synthesizing: 'SMTP-Umschlag wird erstellt...', subject: 'Betreff: E-Mail-Identität verifizieren' },
  carrier: { carriersLabel: "Simulated carriers queried:",
    carriers: "AT&T, Verizon, T-Mobile, Sprint",
    registryLink: "GSM / CDMA Global Registry Link", title: 'Carrier-Registerverifizierung', phoneLabel: 'Telefonnummer', firstNameLabel: 'Vorname', lastNameLabel: 'Nachname', zipLabel: 'Rechnungs-PLZ', run: 'Carrier-Abfrage starten', searching: 'Carrier-Register werden abgefragt...', result: 'Verifizierungsergebnis', confidence: 'Übereinstimmungswert', firstNameMatch: 'Vorname stimmt überein', lastNameMatch: 'Nachname stimmt überein', zipMatch: 'Rechnungs-PLZ stimmt überein', registrar: 'Carrier-Registerdetails', simSwap: 'Prüfung auf aktuellen SIM-Wechsel', matched: 'Übereinstimmung', partial: 'Teilweise Übereinstimmung', mismatch: 'Keine Übereinstimmung', yes: 'Ja', no: 'Nein', recentSwap: 'Aktueller SIM-Wechsel erkannt', noRecentSwap: 'Kein aktueller SIM-Wechsel', logsTitle: 'Register-Handshake-Protokolle', logsEyebrow: 'Netzwerkabfrage', logsIdle: 'Broadcast-Abfrage bereit...', logsSearching: '> Handshake mit T-Mobile/Verizon-Knoten...', logsDetails: '> Registrierungsdetails:', logsDone: 'Abgleichskript abgeschlossen.' },
  risk: {  title: 'Betrugs- und Bedrohungsreputations-Engine', phoneLabel: 'Telefonnummer', emailLabel: 'E-Mail-Adresse', run: 'Reputation prüfen', analyzing: 'Bedrohungsfingerabdrücke werden erstellt...', verdict: 'Identra-Risikourteil', threatIndex: 'Bedrohungsindex', breakdown: 'Aufschlüsselung der Bedrohungssignale', safe: 'Niedriges Risiko', medium: 'Mittleres Risiko', high: 'Hohes Risiko', visualizer: 'Visualizer für passive Signale', visualizerHint: 'Passen Sie die Schalter an und prüfen Sie links die Reputation.', target: 'Prüfziel', simAge: 'SIM-Altersstatus', lineClass: 'Leitungsklasse', emailClass: 'E-Mail-Klasse', flags: [{ key: 'voipLine', title: 'Telefonleitung ist VoIP', desc: 'Reibungsarmer Carrier, häufig von Bots missbraucht' }, { key: 'recentSimSwap', title: 'SIM-Karte wurde kürzlich gewechselt', desc: 'Mit unmittelbaren Kontoübernahmevektoren verbunden' }, { key: 'disposableDomain', title: 'E-Mail passt zu temporärer Domain-Blacklist', desc: 'Spam- oder Burner-Mailboxdienste wie temp-mail' }, { key: 'spamListed', title: 'E-Mail in Leaks oder Spamlisten gemeldet', desc: 'Hohe historische Korrelation mit kompromittierten Akteuren' }], details: { voip: { type: 'VoIP-Leitung erkannt', severity: 'MITTEL', desc: 'Die Telefonnummer gehört zu einem virtuellen oder VoIP-Anbieter ohne physische SIM-Verknüpfung.' }, physical: { type: 'Physische SIM verifiziert', severity: 'SICHER', desc: 'Die Leitung ist mit einer physischen SIM/eSIM eines großen Carriers verbunden.' }, sim: { type: 'Aktueller SIM-Wechsel (7 Tage)', severity: 'HOCH', desc: 'Die SIM wurde kürzlich ersetzt, was auf Kontoübernahmeversuche hinweisen kann.' }, disposable: { type: 'Temporäre E-Mail-Domain', severity: 'MITTEL', desc: 'Die Domain stimmt mit Blacklists kostenloser Wegwerf-Mailboxen überein.' }, spam: { type: 'Reputations-Blacklist-Treffer', severity: 'NIEDRIG', desc: 'Die E-Mail wurde in historischen Spam-Datenbanken oder öffentlichen Leaks gefunden.' } } },
  how: { title: 'So funktioniert es', desc: 'Ein reibungsarmer Drei-Schritt-Prozess, der Conversion erhöht und böswillige Akteure ausschließt.', tabs: ['1 Erfassen', '2 Code senden', '3 Verifizieren'], steps: [{ title: 'Kontaktdaten erfassen', desc: 'Fordern Sie Telefonnummer oder E-Mail in einer responsiven Markenoberfläche an. Identra formatiert Ländercodes, erkennt Tippfehler und klassifiziert Eingaben sofort.', bullets: ['Markengerechte Eingabeoberflächen', 'Internationale Formatierung und Telefonvalidierung in Echtzeit'] }, { title: 'Verifizierungscode senden', desc: 'Generieren und versenden Sie ein OTP per SMS, WhatsApp, Anruf oder sicherer E-Mail je nach Konfiguration.', bullets: ['Fallbacks per SMS, WhatsApp und E-Mail', 'Automatisches Multi-Carrier-Routing für hohe Zustellbarkeit'] }, { title: 'Besitz verifizieren', desc: 'Nach Codeeingabe sendet Identra eine signierte webhook-Bestätigung, damit Ihr System das Konto freigeben oder fortfahren kann.', bullets: ['Sofortige webhook-Auslöser', 'Nahtloser Übergang zu ID-Upload oder Gesichtsprüfung'] }], mock: { step1: 'Schritt 1: Kontakt erfassen', prompt: 'Bitte geben Sie Ihre Daten zur Identitätsprüfung ein', mobile: 'Mobilnummer', continue: 'Weiter zum Codeversand', rail: 'ROUTE WIRD GESENDET', railName: 'GSM Global', routing: 'Signiertes SMS-Paket wird geroutet an', dispatchTime: 'Erwartete Versandzeit: 0,8 s', ownership: 'Besitz bestätigt', ownershipDesc: 'Code stimmt überein. Entität ist mit hoher Sicherheit dem Telefonregister zugeordnet.', status: 'Verifizierungsstatus: COMPLETED_OWNER_MATCH' } },
  methods: { title: 'Unsere Bibliothek für Telefon- und E-Mail-Verifizierung entdecken', desc: 'Von nahtlosen Zwei-Faktor-Codes bis zu tiefen Carrier-Registern bietet Identra modulare Tools für Ihr Compliance-Niveau.', active: 'Details der aktiven Methode werden im Playground angezeigt', learn: 'Mehr über Enrichment erfahren', cards: [{ id: '2fa-phone', title: 'Telefonnummer (2FA)', desc: 'Verifizieren Sie Telefonbesitz mit hochsicherer Zwei-Faktor-Authentifizierung per automatischer Nachricht oder Anruf.' }, { id: 'ownership-phone', title: 'Telefonverifizierung (Besitz)', desc: 'Gleichen Sie Namen und Telefonnummern mit globalen Carrier-Datenbanken ab, um KYC-Parameter zu prüfen.' }, { id: '2fa-email', title: 'E-Mail-Verifizierung (2FA)', desc: 'Bestätigen Sie E-Mail-Besitz mit sicheren Vorlagen, OTPs und magic links.' }, { id: 'risk-checks', title: 'Risiko von Telefon oder E-Mail', desc: 'Bewerten Sie Reputation per Echtzeit-Scoring, VoIP-Prüfung und globaler Bedrohungsintelligenz.' }] },
  signals: { title: 'Betrug mit zusätzlichen Risikosignalen verhindern', cards: [{ title: 'Zwei-Faktor-Authentifizierung', desc: 'Schützen Sie Konten, indem Sie einen kryptografischen Code an Telefonnummer oder E-Mail senden und Besitz validieren.' }, { title: 'Schutz vor Kontoübernahme', desc: 'Erkennen Sie aktuelle SIM-Wechsel, verdächtige Portierungen oder Weiterleitungen auf Burner-Mailboxen.' }, { title: 'Risikobewertung', desc: 'Analysieren Sie Telefon- und E-Mail-Reputation beim Onboarding und blockieren Sie Wegwerfdomains, VoIP-Leitungen und Spamlisten.' }] },
  learning: { title: 'Weiter lernen', articles: [{ meta: 'Blog - 6 Min.', title: 'Telefonverifizierung als wichtiger Teil von Identitätsprüfung und Betrugsprävention', alt: 'Einblicke in Telefonverifizierung' }, { meta: 'Blog - 7 Min.', title: '3 Tipps für Risikomanagement ohne Verlust der Nutzererfahrung', alt: 'Strategien für Risikomanagement' }, { meta: 'Leitfaden - 12 Min.', title: 'Strategischer Leitfaden zum Ausgleich von Risiko und Conversion', alt: 'Leitfaden zu Conversion und Risiko' }] },
  explore: { title: 'Mehr von Identras Identitätsplattform entdecken', cards: [{ eyebrow: 'Identitätsflüsse', title: 'Bessere Identitätsflüsse erstellen', desc: 'Entwerfen Sie dynamische Flows, die Datenbankabfragen oder biometrische Erfassungen anhand von Nutzereingaben auslösen.', cta: 'Workflows entdecken' }, { eyebrow: 'Enrichment-Prüfungen', title: 'Telefonnummern und E-Mails auf Risiko prüfen', desc: 'Binden Sie Datenbanken, Betrugs-Watchlists und Führerscheinabgleiche in Registrierungsflüsse ein.', cta: 'Database Checks entdecken' }] }
});

Object.assign(PHONE_EMAIL_VERIFICATION_TRANSLATIONS.vi, {
  sms: {  title: 'Luồng xác minh SMS', phoneLabel: 'Số điện thoại', send: 'Gửi mã SMS', sending: 'Đang chuẩn bị tuyến SMS bảo mật...', sendingSub: 'Đang kết nối với mạng di động', sentTitle: 'Đã gửi mã xác minh', sentDesc: 'Mã SMS mô phỏng đã được gửi. Dùng mã đã tạo hoặc 123456.', codeLabel: 'Mã xác minh', verify: 'Xác minh điện thoại', verifying: 'Đang xác minh...', successTitle: 'Xác minh điện thoại thành công', successDesc: 'Đã xác lập quyền sở hữu. Đã tạo token 2FA bảo mật cho Session ID', error: 'Mã không khớp. Hãy thử mã đã tạo hoặc 123456.', notificationTitle: 'Tuyến SMS của Identra', notificationTime: 'bây giờ', notificationBody: 'Mã xác minh của bạn là {code}.', previewLabel: 'Bảo mật Identra (OTP)', previewStatus: 'Định tuyến bảo mật đang hoạt động', previewWaiting: 'Đang chờ yêu cầu gửi SMS...', previewTyping: 'iMessage...' },
  email: {  title: 'Luồng xác minh email', emailLabel: 'Địa chỉ email', send: 'Gửi mã qua email', sending: 'Đang gửi phong bì SMTP...', sendingSub: 'Định tuyến qua hệ thống email của Identra', sentTitle: 'Đã gửi email xác minh', sentDesc: 'Mã email mô phỏng đã được gửi. Dùng mã đã tạo hoặc 123456.', codeLabel: 'Mã xác minh', verify: 'Xác minh email', verifying: 'Đang xác minh...', successTitle: 'Xác minh email thành công', successDescBefore: 'Đã xác minh quyền sở hữu. Điểm uy tín gửi an toàn được ghi nhận là', successRating: 'Xuất sắc', error: 'Mã không khớp. Hãy thử mã đã tạo hoặc 123456.', notificationTitle: 'Email mới: Identra Auth', notificationTime: 'bây giờ', secureClient: 'Ứng dụng email bảo mật', waiting: 'Đang chờ yêu cầu gửi email...', synthesizing: 'Đang tạo phong bì SMTP...', sender: 'Identra Auth Services', subject: 'Chủ đề: Xác minh định danh email', time: '9:41 AM' },
  carrier: {  title: 'Xác minh qua sổ đăng ký nhà mạng', phoneLabel: 'Số điện thoại', firstNameLabel: 'Tên', lastNameLabel: 'Họ', zipLabel: 'ZIP thanh toán', run: 'Chạy tra cứu nhà mạng', searching: 'Đang truy vấn sổ đăng ký nhà mạng...', carriersLabel: 'Nhà mạng mô phỏng đã truy vấn:', carriers: 'AT&T, Verizon, T-Mobile, Sprint', result: 'Kết quả xác minh', confidence: 'Độ tin cậy khớp', firstNameMatch: 'Khớp tên', lastNameMatch: 'Khớp họ', zipMatch: 'Khớp mã ZIP thanh toán', registrar: 'Chi tiết đăng ký nhà mạng', simSwap: 'Kiểm tra đổi SIM gần đây', matched: 'Khớp', partial: 'Khớp một phần', mismatch: 'Không khớp', yes: 'Có', no: 'Không', recentSwap: 'Phát hiện đổi SIM gần đây', noRecentSwap: 'Không có đổi SIM gần đây', logsTitle: 'Nhật ký bắt tay sổ đăng ký', logsEyebrow: 'Truy vấn mạng', logsIdle: 'Truy vấn broadcast đã sẵn sàng...', logsSearching: '> Đang bắt tay với nút T-Mobile/Verizon...', logsDetails: '> Chi tiết bản ghi đăng ký:', logsDone: 'Tập lệnh đối chiếu xác minh đã hoàn tất.', registryLink: 'Liên kết sổ đăng ký GSM / CDMA toàn cầu' },
  risk: {  title: 'Bộ máy uy tín gian lận và mối đe dọa', phoneLabel: 'Số điện thoại', emailLabel: 'Địa chỉ email', run: 'Sàng lọc uy tín', analyzing: 'Đang tổng hợp dấu vân tay mối đe dọa...', verdict: 'Kết luận rủi ro của Identra', threatIndex: 'Chỉ số mối đe dọa', breakdown: 'Phân tích tín hiệu mối đe dọa', safe: 'Rủi ro thấp', medium: 'Rủi ro trung bình', high: 'Rủi ro cao', visualizer: 'Trình hiển thị tín hiệu thụ động', visualizerHint: 'Điều chỉnh công tắc và xem uy tín ở bên trái.', target: 'Mục tiêu sàng lọc', simAge: 'Trạng thái tuổi SIM', lineClass: 'Loại đường dây', emailClass: 'Loại email', flags: [{ key: 'voipLine', title: 'Đường dây điện thoại là VoIP', desc: 'Nhà mạng ít ma sát, thường bị bot trực tuyến lợi dụng' }, { key: 'recentSimSwap', title: 'SIM vừa được đổi gần đây', desc: 'Liên quan đến nguy cơ chiếm đoạt tài khoản tức thời' }, { key: 'disposableDomain', title: 'Email khớp danh sách đen tên miền tạm thời', desc: 'Dịch vụ hộp thư spam hoặc dùng một lần như temp-mail' }, { key: 'spamListed', title: 'Email xuất hiện trong rò rỉ công khai hoặc danh sách spam', desc: 'Tương quan lịch sử cao với tác nhân bị xâm phạm' }], details: { voip: { type: 'Phát hiện đường dây VoIP', severity: 'TRUNG BÌNH', desc: 'Số điện thoại thuộc nhà cung cấp ảo hoặc VoIP, không có liên kết SIM vật lý.' }, physical: { type: 'Đã xác minh SIM vật lý', severity: 'AN TOÀN', desc: 'Đường dây gắn với SIM/eSIM vật lý của nhà mạng lớn.' }, sim: { type: 'Đổi SIM gần đây (7 ngày)', severity: 'CAO', desc: 'SIM được thay gần đây, có thể là dấu hiệu chiếm đoạt tài khoản.' }, disposable: { type: 'Tên miền email tạm thời', severity: 'TRUNG BÌNH', desc: 'Tên miền email khớp danh sách đen hộp thư dùng một lần miễn phí.' }, spam: { type: 'Khớp danh sách đen uy tín', severity: 'THẤP', desc: 'Email xuất hiện trong cơ sở dữ liệu spam lịch sử hoặc rò rỉ công khai.' } } },
  how: { title: 'Cách hoạt động', desc: 'Quy trình ba bước ít ma sát giúp tối đa hóa chuyển đổi và chặn tác nhân xấu.', tabs: ['1 Thu thập', '2 Gửi mã', '3 Xác minh'], steps: [{ title: 'Thu thập thông tin liên hệ', desc: 'Yêu cầu người dùng nhập số điện thoại hoặc email trong giao diện responsive, có thương hiệu. Identra định dạng mã quốc gia, phát hiện lỗi gõ và phân loại dữ liệu ngay lập tức.', bullets: ['Lớp nhập liệu tùy chỉnh theo thương hiệu', 'Định dạng quốc tế và xác thực số điện thoại theo thời gian thực'] }, { title: 'Gửi mã xác minh', desc: 'Tạo và gửi mã OTP qua SMS, WhatsApp, cuộc gọi hoặc email bảo mật theo cấu hình của bạn.', bullets: ['Tùy chọn dự phòng qua SMS, WhatsApp và email', 'Định tuyến đa nhà mạng tự động để tối đa hóa khả năng gửi'] }, { title: 'Xác minh quyền sở hữu', desc: 'Sau khi người dùng nhập mã, Identra trả về xác nhận webhook đã ký để hệ thống mở khóa tài khoản hoặc tiếp tục bước định danh tiếp theo.', bullets: ['Webhook tức thì', 'Chuyển tiếp liền mạch sang tải ID hoặc kiểm tra khuôn mặt'] }], mock: { step1: 'Bước 1: Thu thập liên hệ', prompt: 'Vui lòng nhập thông tin để xác minh định danh', mobile: 'Số di động', continue: 'Tiếp tục gửi mã', rail: 'ĐANG GỬI TUYẾN', railName: 'GSM Global', routing: 'Đang định tuyến gói SMS đã ký chứa hash mã đến', dispatchTime: 'Thời gian gửi dự kiến: 0,8 giây', ownership: 'Đã xác lập quyền sở hữu', ownershipDesc: 'Mã khớp. Thực thể được liên kết với sổ đăng ký điện thoại với độ tin cậy cao.', status: 'Trạng thái xác minh: COMPLETED_OWNER_MATCH' } },
  methods: { title: 'Khám phá thư viện phương thức xác minh điện thoại và email', desc: 'Từ mã hai yếu tố liền mạch đến sổ đăng ký nhà mạng chuyên sâu, Identra cung cấp công cụ mô-đun phù hợp với mức tuân thủ của bạn.', active: 'Chi tiết phương thức đang hoạt động hiển thị trong playground', learn: 'Tìm hiểu thêm về làm giàu dữ liệu', cards: [{ id: '2fa-phone', title: 'Số điện thoại (2FA)', desc: 'Xác minh quyền sở hữu số điện thoại bằng xác thực hai yếu tố qua tin nhắn hoặc cuộc gọi tự động.' }, { id: 'ownership-phone', title: 'Xác minh điện thoại (quyền sở hữu)', desc: 'Đối chiếu tên pháp lý và số điện thoại với cơ sở dữ liệu nhà mạng toàn cầu để khớp tham số KYC.' }, { id: '2fa-email', title: 'Xác minh email (2FA)', desc: 'Xác minh quyền sở hữu email bằng mẫu email bảo mật, mã OTP và magic link.' }, { id: 'risk-checks', title: 'Mức rủi ro của điện thoại hoặc email', desc: 'Đánh giá uy tín điện thoại hoặc email bằng chấm điểm rủi ro thời gian thực, lọc VoIP và tình báo mối đe dọa toàn cầu.' }] },
  signals: { title: 'Ngăn gian lận bằng tín hiệu rủi ro bổ sung', cards: [{ title: 'Xác thực hai yếu tố', desc: 'Bảo vệ tài khoản bằng cách gửi mã mật mã đến số điện thoại hoặc email đã nhập và xác thực quyền sở hữu.' }, { title: 'Ngăn chiếm đoạt tài khoản', desc: 'Chặn gian lận bằng cách sàng lọc đổi SIM gần đây, chuyển mạng đáng ngờ hoặc chuyển hướng hộp thư tạm thời.' }, { title: 'Đánh giá rủi ro', desc: 'Phân tích uy tín điện thoại và email trong onboarding. Chặn tên miền dùng một lần, đường dây VoIP và hồ sơ danh sách spam.' }] },
  learning: { title: 'Tiếp tục tìm hiểu', articles: [{ meta: 'Blog - 6 phút', title: 'Xác minh điện thoại: phần quan trọng của định danh và ngăn gian lận', alt: 'Thông tin về xác minh điện thoại' }, { meta: 'Blog - 7 phút', title: '3 mẹo quản lý rủi ro mà không hy sinh trải nghiệm người dùng', alt: 'Chiến lược quản lý rủi ro' }, { meta: 'Hướng dẫn - 12 phút', title: 'Hướng dẫn chiến lược cân bằng rủi ro và chuyển đổi', alt: 'Hướng dẫn chuyển đổi và rủi ro' }] },
  explore: { title: 'Khám phá thêm nền tảng định danh của Identra', cards: [{ eyebrow: 'Luồng định danh', title: 'Xây dựng luồng định danh tốt hơn', desc: 'Thiết kế luồng tùy chỉnh động kích hoạt truy vấn cơ sở dữ liệu hoặc thu thập sinh trắc học dựa trên dữ liệu ban đầu của người dùng.', cta: 'Khám phá Workflows' }, { eyebrow: 'Kiểm tra làm giàu', title: 'Sàng lọc rủi ro số điện thoại và email', desc: 'Tích hợp cơ sở dữ liệu, danh sách chống gian lận và đối chiếu giấy phép vào phễu đăng ký.', cta: 'Khám phá Database Checks' }] }
});
