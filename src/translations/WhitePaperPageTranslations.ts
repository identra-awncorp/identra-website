/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Language } from '../context/LanguageContext';

export type WhitePaperSectionId =
  | 'foundational-concepts'
  | 'executive-summary'
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'chapter-4'
  | 'chapter-5'
  | 'chapter-6'
  | 'chapter-7'
  | 'chapter-8'
  | 'chapter-9'
  | 'chapter-10'
  | 'conclusion'
  | 'appendix-a'
  | 'appendix-b'
  | 'appendix-c';

export type WhitePaperInfoCard = {
  readonly title: string;
  readonly body: string;
};

export type WhitePaperTable = {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
};

export type WhitePaperSection = {
  readonly id: WhitePaperSectionId;
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly cards?: readonly WhitePaperInfoCard[];
  readonly bulletsTitle?: string;
  readonly bullets?: readonly string[];
  readonly table?: WhitePaperTable;
  readonly orderedTitle?: string;
  readonly ordered?: readonly string[];
  readonly note?: WhitePaperInfoCard;
};

export type WhitePaperCopy = {
  readonly backToLanding: string;
  readonly versionBadge: string;
  readonly publisher: string;
  readonly copyLink: string;
  readonly copied: string;
  readonly print: string;
  readonly copyLinkTitle: string;
  readonly mobileTocTitle: string;
  readonly desktopTocTitle: string;
  readonly tocAriaLabel: string;
  readonly searchPlaceholder: string;
  readonly noTocResults: string;
  readonly heroBadge: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly metadata: readonly WhitePaperInfoCard[];
  readonly callouts: readonly (WhitePaperInfoCard & { readonly tone: 'accent' | 'success' })[];
  readonly cta: string;
  readonly attribution: string;
  readonly sections: readonly WhitePaperSection[];
};

export const WHITE_PAPER_TRANSLATIONS = {
  en: {
    backToLanding: 'Home',
    versionBadge: 'WHITE PAPER v1.0',
    publisher: 'AwnCorp / Identra',
    copyLink: 'Share',
    copied: 'Copied',
    print: 'Print / Export PDF',
    copyLinkTitle: 'Copy link',
    mobileTocTitle: 'White paper contents',
    desktopTocTitle: 'Document contents',
    tocAriaLabel: 'White paper contents',
    searchPlaceholder: 'Search the white paper...',
    noTocResults: 'No sections match this search.',
    heroBadge: 'Official Identra white paper 2026',
    heroTitle: 'IDENTRA WHITE PAPER',
    heroSubtitle: 'A super app for verifiable data and smart-contract-powered transactions',
    metadata: [
      { title: 'Version', body: '1.0 - July 2026' },
      { title: 'Author', body: 'AwnCorp / Identra R&D' },
      { title: 'First market', body: 'Vietnam' },
      { title: 'Direction', body: 'Global interoperability' },
    ],
    callouts: [
      {
        title: 'Development status:',
        body: 'At publication time, Identra is in research, product architecture, and UI/UX validation. Capabilities and targets in this white paper are design goals to be confirmed through prototypes, audits, pilots, and production rollout.',
        tone: 'accent',
      },
      {
        title: 'Document scope:',
        body: 'This paper explains Identra’s vision, operating model, social and economic value, enterprise verification layer, smart contract role, business model, and development roadmap.',
        tone: 'success',
      },
    ],
    cta: 'Experience Identra Sandbox',
    attribution: 'AwnCorp / Identra - Version 1.0, July 2026',
    sections: [
      {
        id: 'foundational-concepts',
        eyebrow: 'Foundations',
        title: 'Two Foundational Concepts',
        paragraphs: [
          'Identra is built around a simple premise: digital services become safer when important claims can be verified independently and then used inside automated workflows with consent.',
        ],
        cards: [
          {
            title: 'Verifiable Credential',
            body: 'A digital proof issued by an authoritative source and protected cryptographically. It lets a verifier confirm where data came from, whether it was changed, and whether it remains valid.',
          },
          {
            title: 'Smart Contract',
            body: 'A program that executes agreed conditions automatically. In Identra, smart contracts use verified data to coordinate payments, access rights, escrow, evidence, or obligation completion.',
          },
        ],
        note: {
          title: 'Why the pair matters',
          body: 'Credentials provide trusted evidence; smart contracts turn that evidence into auditable action.',
        },
      },
      {
        id: 'executive-summary',
        eyebrow: 'Executive Summary',
        title: 'A Unified Trust Layer for Digital Activity',
        paragraphs: [
          'Identra is a super app where people and organizations can perform digital activities on a unified trust layer. Privacy, data agency, and verifiable evidence are treated as product primitives rather than afterthoughts.',
          'The platform combines a user-controlled credential wallet with an enterprise verification layer. Individuals keep reusable proofs, while organizations can issue, request, and validate credentials through governed APIs and workflow tools.',
          'The goal is not to centralize every service inside one company. Identra is designed to let trusted data move across education, hiring, finance, commerce, public services, and supply chains without forcing each participant to rebuild verification from scratch.',
        ],
        bulletsTitle: 'Core outcomes',
        bullets: [
          'Reusable evidence reduces repeated onboarding and document collection.',
          'Consent-based data sharing creates clearer accountability between users and institutions.',
          'Smart contracts can execute only when the required proof and policy checks are satisfied.',
          'Enterprises gain a consistent layer for KYC, KYB, AML, audit trails, and trusted data exchange.',
        ],
      },
      {
        id: 'chapter-1',
        eyebrow: 'Chapter 1',
        title: 'Context and Problem',
        paragraphs: [
          'Digital services still rely heavily on screenshots, copied documents, manual attestations, and siloed databases. These methods are slow, easy to tamper with, and difficult to reuse across organizations.',
          'At the same time, users are asked to submit the same sensitive information again and again. This increases breach exposure, weakens trust, and creates unnecessary friction in otherwise simple transactions.',
        ],
        cards: [
          {
            title: 'Fragmented verification',
            body: 'Each platform builds its own identity and document checks, creating duplicated cost and inconsistent assurance.',
          },
          {
            title: 'Weak data portability',
            body: 'Users can rarely carry a verified claim from one trusted issuer to another service without rework.',
          },
          {
            title: 'Limited automation',
            body: 'Contracts and workflows cannot safely automate high-value actions when the input evidence is not machine-verifiable.',
          },
        ],
      },
      {
        id: 'chapter-2',
        eyebrow: 'Chapter 2',
        title: 'What Identra Is',
        paragraphs: [
          'Identra is an identity and verifiable-data infrastructure layer presented through a consumer-grade app and enterprise-grade APIs. It helps people hold proofs and helps organizations rely on those proofs safely.',
          'The product direction is intentionally modular: wallet, credential issuance, verification requests, policy orchestration, audit logs, and transaction execution can evolve independently while sharing a common trust model.',
        ],
        bulletsTitle: 'Design principles',
        bullets: [
          'User consent is required before sensitive attributes are shared.',
          'The minimum necessary claim should be presented for each use case.',
          'Organizations must be able to audit verification decisions without over-collecting personal data.',
          'Interoperability matters more than closed network effects.',
        ],
      },
      {
        id: 'chapter-3',
        eyebrow: 'Chapter 3',
        title: 'The Two Pillars of Identra',
        paragraphs: [
          'The first pillar is the Identra Wallet: a familiar experience where users manage credentials, keys, approvals, and transaction history.',
          'The second pillar is the Enterprise Trust Platform: APIs, SDKs, workflow controls, and compliance tooling that let issuers, verifiers, and service providers operate at scale.',
        ],
        cards: [
          {
            title: 'Identra Wallet',
            body: 'Holds credentials, manages consent, signs presentations, and gives users visibility into where their data is used.',
          },
          {
            title: 'Enterprise Trust Platform',
            body: 'Lets organizations issue credentials, request proofs, run risk checks, and connect verified outcomes to business workflows.',
          },
        ],
      },
      {
        id: 'chapter-4',
        eyebrow: 'Chapter 4',
        title: 'Operating Architecture',
        paragraphs: [
          'Identra separates user experience from trust infrastructure. The app layer handles consent and everyday actions; the verification layer evaluates proofs and policies; the ledger and registry layer records durable trust signals where appropriate.',
          'A CertNet direction can support issuer registries, credential schemas, revocation status, and DID resolution. The intent is to make trust decisions portable without exposing unnecessary personal data on public infrastructure.',
        ],
        bulletsTitle: 'Reference layers',
        bullets: [
          'Wallet and consent layer',
          'Credential issuance and presentation layer',
          'Enterprise verification and policy orchestration layer',
          'Registry, audit, and interoperability layer',
          'Smart-contract execution layer',
        ],
      },
      {
        id: 'chapter-5',
        eyebrow: 'Chapter 5',
        title: 'Enterprise Platform',
        paragraphs: [
          'For organizations, Identra is designed as a verification operating system rather than a single check. Teams can configure journeys, define assurance requirements, review exceptions, and reuse trusted signals across products.',
          'The enterprise layer can support education issuers, employers, financial institutions, marketplaces, public agencies, and supply-chain operators that need evidence with clear provenance.',
        ],
        cards: [
          {
            title: 'Issuance',
            body: 'Create signed credentials for degrees, licenses, business status, membership, eligibility, or completed checks.',
          },
          {
            title: 'Verification',
            body: 'Request proofs, validate issuers, check revocation, and produce auditable outcomes.',
          },
          {
            title: 'Operations',
            body: 'Route exceptions, inspect logs, measure conversion, and tune policy without rebuilding the product flow.',
          },
        ],
      },
      {
        id: 'chapter-6',
        eyebrow: 'Chapter 6',
        title: 'Smart Contracts',
        paragraphs: [
          'Smart contracts are useful only when the inputs are trustworthy. Identra’s role is to supply verified claims and policy results that contracts can depend on before moving value or changing rights.',
          'Examples include conditional payments after proof of delivery, escrow release after credential validation, ticket transfer with eligibility checks, or access to a service after age or license verification.',
        ],
        bulletsTitle: 'Contract guardrails',
        bullets: [
          'Only proof results, not raw sensitive data, should be passed into execution whenever possible.',
          'A clear audit trail must link the decision, policy version, issuer, and consent event.',
          'Fallback and dispute workflows are required for high-value or regulated activity.',
        ],
      },
      {
        id: 'chapter-7',
        eyebrow: 'Chapter 7',
        title: 'Use Cases',
        paragraphs: [
          'Identra is first aimed at markets where repeated verification creates visible friction: education, hiring, small-business finance, commerce, ticketing, public services, and trusted supply chains.',
        ],
        cards: [
          {
            title: 'Education and hiring',
            body: 'Schools issue credentials once; candidates reuse them with employers and scholarship programs.',
          },
          {
            title: 'Finance and small business',
            body: 'Verified identity, business status, and permissions can support onboarding, lending, and account controls.',
          },
          {
            title: 'Commerce and digital assets',
            body: 'Tickets, warranties, memberships, and gated services can be transferred or redeemed with proof-based rules.',
          },
          {
            title: 'Public services and supply chains',
            body: 'Agencies and operators can verify eligibility, licenses, origin, or compliance without manual document loops.',
          },
        ],
      },
      {
        id: 'chapter-8',
        eyebrow: 'Chapter 8',
        title: 'Security and Compliance',
        paragraphs: [
          'Security must be designed into Identra from the beginning: cryptographic signatures, strong authentication, revocation checks, data minimization, and independent audit paths are core requirements.',
          'The compliance model should adapt by jurisdiction and module. Identity verification, payments, health data, employment checks, and public-sector use cases can each carry different licensing and governance requirements.',
        ],
        bulletsTitle: 'Security posture',
        bullets: [
          'Passkeys and strong device binding for wallet access.',
          'Encryption in transit and at rest for sensitive operational data.',
          'Separate duties between issuers, verifiers, custodians, and application services.',
          'Independent review before regulated or high-risk production launches.',
        ],
      },
      {
        id: 'chapter-9',
        eyebrow: 'Chapter 9',
        title: 'Business Model',
        paragraphs: [
          'Identra’s revenue model should align with trust creation instead of selling user data. The platform can monetize verification volume, enterprise workflow subscriptions, issuance tools, and transaction orchestration.',
          'Advertising, if introduced, should remain opt-in and consent-based. A Plan A model can share the value generated by voluntary attribute use back to the user rather than extracting it invisibly.',
        ],
        cards: [
          {
            title: 'Transaction fees',
            body: 'Charged when verified data coordinates contracts, escrow, payments, or recorded obligations.',
          },
          {
            title: 'API and SDK usage',
            body: 'Charged to enterprises for KYC, KYB, AML, biometric checks, credential validation, and audit workflows.',
          },
        ],
      },
      {
        id: 'chapter-10',
        eyebrow: 'Chapter 10',
        title: 'Roadmap, Risks, and Development Principles',
        paragraphs: [
          'The roadmap is staged so trust infrastructure can mature alongside product usability, market adoption, and legal readiness.',
        ],
        table: {
          headers: ['Year', 'Focus', 'Target outcome'],
          rows: [
            ['2026', 'Identity wallet and SSI demo', 'Prototype wallet, credential management, passkeys, and sample education workflows'],
            ['2027', 'Issuance, verification, and enterprise APIs', 'Institution integrations, verifier tools, and compliance pilots'],
            ['2028', 'Contracts, IDPay, and Mini Apps', 'Condition-based transactions and third-party service ecosystem'],
            ['2029', 'Industry ecosystems', 'Education, finance, commerce, public services, and supply-chain trust frameworks'],
            ['2030', 'Regional expansion', 'Cross-border credential interoperability and partner networks'],
          ],
        },
        orderedTitle: 'Development principles',
        ordered: [
          'Do not describe a target capability as if it is already complete.',
          'Do not build a business model around selling user data.',
          'Do not trade interoperability and user agency for short-term growth.',
        ],
      },
      {
        id: 'conclusion',
        eyebrow: 'Conclusion',
        title: 'Trustworthy Data as a Default Capability',
        paragraphs: [
          'The digital economy created enormous amounts of data, but much of it remains hard to prove, hard to reuse, and hard to connect to automated transactions between independent organizations.',
          'Identra addresses that gap by connecting verifiable data with smart contracts inside a unified experience. The result is not just another feature bundle, but an infrastructure direction for safer digital services.',
        ],
      },
      {
        id: 'appendix-a',
        eyebrow: 'Appendix A',
        title: 'Core Terms',
        paragraphs: [],
        table: {
          headers: ['Term', 'Meaning in Identra'],
          rows: [
            ['Self-Sovereign Identity (SSI)', 'A model where the subject controls the use of identity evidence and personal data.'],
            ['Identity wallet', 'A tool for managing credentials, keys, consent, signatures, and trusted relationships.'],
            ['Verifiable Credential (VC)', 'Structured data signed by an issuer and independently verifiable.'],
            ['Issuer', 'The party that creates and signs a credential.'],
            ['Holder', 'The party that stores a credential and chooses when to present it.'],
            ['Verifier', 'The party that requests and validates proof.'],
            ['Trust framework', 'Rules defining roles, authority, assurance levels, and accountability.'],
            ['Mini App', 'A third-party service inside Identra that uses data through the permission layer.'],
          ],
        },
      },
      {
        id: 'appendix-b',
        eyebrow: 'Appendix B',
        title: 'Technical Direction',
        paragraphs: [
          'Identra should support multiple credential formats and trust infrastructures, including W3C VC v2.0, OpenID4VCI, OpenID4VP, SD-JWT VC, JSON-LD, ISO mdoc, DID Core, did:web, did:peer, did:key, and passkey/WebAuthn.',
        ],
      },
      {
        id: 'appendix-c',
        eyebrow: 'Appendix C',
        title: 'Reference Materials',
        paragraphs: [],
        bullets: [
          'Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials.',
          'W3C Verifiable Credentials Data Model v2.0.',
          'W3C Decentralized Identifiers (DIDs) v1.0.',
          'OpenID for Verifiable Credential Issuance and OpenID for Verifiable Presentations.',
          'Applicable privacy, data protection, electronic transaction, cybersecurity, AML, and payment-intermediary regulations.',
        ],
      },
    ],
  },
  es: {
    backToLanding: 'Inicio',
    versionBadge: 'LIBRO BLANCO v1.0',
    publisher: 'AwnCorp / Identra',
    copyLink: 'Compartir',
    copied: 'Copiado',
    print: 'Imprimir / Exportar PDF',
    copyLinkTitle: 'Copiar enlace',
    mobileTocTitle: 'Contenido del libro blanco',
    desktopTocTitle: 'Contenido del documento',
    tocAriaLabel: 'Contenido del libro blanco',
    searchPlaceholder: 'Buscar en el libro blanco...',
    noTocResults: 'Ninguna sección coincide con la búsqueda.',
    heroBadge: 'Libro blanco oficial de Identra 2026',
    heroTitle: 'LIBRO BLANCO DE IDENTRA',
    heroSubtitle: 'Una superapp para datos verificables y transacciones impulsadas por contratos inteligentes',
    metadata: [
      { title: 'Versión', body: '1.0 - Julio de 2026' },
      { title: 'Autor', body: 'I+D de AwnCorp / Identra' },
      { title: 'Primer mercado', body: 'Vietnam' },
      { title: 'Dirección', body: 'Interoperabilidad global' },
    ],
    callouts: [
      {
        title: 'Estado de desarrollo:',
        body: 'En el momento de publicación, Identra se encuentra en investigación, arquitectura de producto y validación de UI/UX. Las capacidades y objetivos descritos son metas de diseño que deben confirmarse mediante prototipos, auditorías, pilotos y despliegues reales.',
        tone: 'accent',
      },
      {
        title: 'Alcance del documento:',
        body: 'Este documento explica la visión de Identra, su modelo operativo, valor social y económico, capa de verificación empresarial, rol de los contratos inteligentes, modelo de negocio y hoja de ruta.',
        tone: 'success',
      },
    ],
    cta: 'Probar Identra Sandbox',
    attribution: 'AwnCorp / Identra - Versión 1.0, julio de 2026',
    sections: [
      {
        id: 'foundational-concepts',
        eyebrow: 'Fundamentos',
        title: 'Dos conceptos fundamentales',
        paragraphs: [
          'Identra parte de una idea sencilla: los servicios digitales son más seguros cuando las afirmaciones importantes pueden verificarse de forma independiente y usarse en flujos automatizados con consentimiento.',
        ],
        cards: [
          {
            title: 'Credencial verificable',
            body: 'Una prueba digital emitida por una fuente autorizada y protegida criptográficamente. Permite confirmar el origen de los datos, si fueron alterados y si siguen vigentes.',
          },
          {
            title: 'Contrato inteligente',
            body: 'Un programa que ejecuta condiciones acordadas automáticamente. En Identra, los contratos inteligentes usan datos verificados para coordinar pagos, accesos, custodia, evidencias u obligaciones.',
          },
        ],
        note: {
          title: 'Por qué importa la combinación',
          body: 'Las credenciales aportan evidencia confiable; los contratos inteligentes convierten esa evidencia en acciones auditables.',
        },
      },
      {
        id: 'executive-summary',
        eyebrow: 'Resumen ejecutivo',
        title: 'Una capa de confianza unificada para la actividad digital',
        paragraphs: [
          'Identra es una superapp donde personas y organizaciones pueden realizar actividades digitales sobre una capa común de confianza. Privacidad, agencia de datos y evidencia verificable son principios de producto, no añadidos tardíos.',
          'La plataforma combina una billetera de credenciales controlada por el usuario con una capa empresarial de verificación. Las personas conservan pruebas reutilizables y las organizaciones pueden emitir, solicitar y validar credenciales mediante APIs y herramientas gobernadas.',
          'El objetivo no es centralizar todos los servicios en una sola empresa. Identra busca que los datos confiables circulen entre educación, empleo, finanzas, comercio, servicios públicos y cadenas de suministro sin rehacer la verificación desde cero.',
        ],
        bulletsTitle: 'Resultados principales',
        bullets: [
          'La evidencia reutilizable reduce onboarding repetido y recolección duplicada de documentos.',
          'El intercambio con consentimiento crea responsabilidades más claras entre usuarios e instituciones.',
          'Los contratos inteligentes pueden ejecutarse solo cuando las pruebas y políticas requeridas se satisfacen.',
          'Las empresas obtienen una capa consistente para KYC, KYB, AML, auditoría e intercambio de datos confiables.',
        ],
      },
      {
        id: 'chapter-1',
        eyebrow: 'Capítulo 1',
        title: 'Contexto y problema',
        paragraphs: [
          'Los servicios digitales aún dependen de capturas, documentos copiados, declaraciones manuales y bases de datos aisladas. Estos métodos son lentos, fáciles de manipular y difíciles de reutilizar entre organizaciones.',
          'Al mismo tiempo, los usuarios entregan la misma información sensible una y otra vez. Esto aumenta la exposición ante filtraciones, debilita la confianza y añade fricción innecesaria.',
        ],
        cards: [
          {
            title: 'Verificación fragmentada',
            body: 'Cada plataforma crea sus propios controles de identidad y documentos, duplicando costos y generando garantías inconsistentes.',
          },
          {
            title: 'Baja portabilidad de datos',
            body: 'El usuario rara vez puede llevar una afirmación verificada de un emisor confiable a otro servicio sin repetir el proceso.',
          },
          {
            title: 'Automatización limitada',
            body: 'Los contratos y flujos no pueden automatizar acciones de alto valor si la evidencia de entrada no es verificable por máquina.',
          },
        ],
      },
      {
        id: 'chapter-2',
        eyebrow: 'Capítulo 2',
        title: 'Qué es Identra',
        paragraphs: [
          'Identra es una capa de identidad y datos verificables presentada mediante una app de uso cotidiano y APIs empresariales. Ayuda a las personas a conservar pruebas y a las organizaciones a confiar en ellas de forma segura.',
          'La dirección del producto es modular: billetera, emisión de credenciales, solicitudes de verificación, orquestación de políticas, registros de auditoría y ejecución transaccional pueden evolucionar por separado con un modelo común de confianza.',
        ],
        bulletsTitle: 'Principios de diseño',
        bullets: [
          'El consentimiento del usuario es obligatorio antes de compartir atributos sensibles.',
          'Cada caso de uso debe presentar la afirmación mínima necesaria.',
          'Las organizaciones necesitan auditar decisiones sin recolectar datos personales de más.',
          'La interoperabilidad vale más que los efectos de red cerrados.',
        ],
      },
      {
        id: 'chapter-3',
        eyebrow: 'Capítulo 3',
        title: 'Los dos pilares de Identra',
        paragraphs: [
          'El primer pilar es Identra Wallet: una experiencia familiar donde los usuarios gestionan credenciales, claves, aprobaciones e historial de transacciones.',
          'El segundo pilar es Enterprise Trust Platform: APIs, SDKs, controles de flujo y herramientas de cumplimiento para que emisores, verificadores y proveedores operen a escala.',
        ],
        cards: [
          {
            title: 'Identra Wallet',
            body: 'Guarda credenciales, administra consentimiento, firma presentaciones y muestra al usuario dónde se usa su información.',
          },
          {
            title: 'Enterprise Trust Platform',
            body: 'Permite emitir credenciales, solicitar pruebas, ejecutar controles de riesgo y conectar resultados verificados con flujos empresariales.',
          },
        ],
      },
      {
        id: 'chapter-4',
        eyebrow: 'Capítulo 4',
        title: 'Arquitectura operativa',
        paragraphs: [
          'Identra separa experiencia de usuario e infraestructura de confianza. La app gestiona consentimiento y acciones diarias; la capa de verificación evalúa pruebas y políticas; la capa de registros mantiene señales de confianza duraderas cuando corresponde.',
          'Una dirección CertNet puede soportar registros de emisores, esquemas de credenciales, estado de revocación y resolución DID. La intención es hacer portables las decisiones de confianza sin exponer datos personales innecesarios.',
        ],
        bulletsTitle: 'Capas de referencia',
        bullets: [
          'Billetera y consentimiento',
          'Emisión y presentación de credenciales',
          'Verificación empresarial y orquestación de políticas',
          'Registros, auditoría e interoperabilidad',
          'Ejecución mediante contratos inteligentes',
        ],
      },
      {
        id: 'chapter-5',
        eyebrow: 'Capítulo 5',
        title: 'Plataforma empresarial',
        paragraphs: [
          'Para las organizaciones, Identra está diseñada como un sistema operativo de verificación, no como un único control. Los equipos pueden configurar recorridos, definir garantías, revisar excepciones y reutilizar señales confiables.',
          'La capa empresarial puede servir a instituciones educativas, empleadores, entidades financieras, marketplaces, agencias públicas y operadores de cadena de suministro que necesitan evidencia con procedencia clara.',
        ],
        cards: [
          {
            title: 'Emisión',
            body: 'Crear credenciales firmadas para títulos, licencias, estado empresarial, membresías, elegibilidad o verificaciones completadas.',
          },
          {
            title: 'Verificación',
            body: 'Solicitar pruebas, validar emisores, revisar revocación y producir resultados auditables.',
          },
          {
            title: 'Operaciones',
            body: 'Derivar excepciones, inspeccionar registros, medir conversión y ajustar políticas sin rehacer el flujo.',
          },
        ],
      },
      {
        id: 'chapter-6',
        eyebrow: 'Capítulo 6',
        title: 'Contratos inteligentes',
        paragraphs: [
          'Los contratos inteligentes solo son útiles cuando las entradas son confiables. Identra aporta afirmaciones verificadas y resultados de política antes de mover valor o cambiar derechos.',
          'Ejemplos: pagos condicionados a prueba de entrega, liberación de custodia tras validar una credencial, transferencia de entradas con elegibilidad o acceso a servicios tras verificar edad o licencia.',
        ],
        bulletsTitle: 'Controles para contratos',
        bullets: [
          'Siempre que sea posible, pasar resultados de prueba y no datos sensibles sin procesar.',
          'Mantener una auditoría que conecte decisión, versión de política, emisor y consentimiento.',
          'Incluir flujos de excepción y disputa para actividades reguladas o de alto valor.',
        ],
      },
      {
        id: 'chapter-7',
        eyebrow: 'Capítulo 7',
        title: 'Casos de uso',
        paragraphs: [
          'Identra apunta primero a mercados donde la verificación repetida crea fricción visible: educación, contratación, finanzas para pequeñas empresas, comercio, entradas, servicios públicos y cadenas de suministro confiables.',
        ],
        cards: [
          {
            title: 'Educación y empleo',
            body: 'Las instituciones emiten credenciales una vez; candidatos las reutilizan con empleadores y programas de becas.',
          },
          {
            title: 'Finanzas y pequeñas empresas',
            body: 'Identidad, estado empresarial y permisos verificados pueden apoyar onboarding, crédito y controles de cuenta.',
          },
          {
            title: 'Comercio y activos digitales',
            body: 'Entradas, garantías, membresías y servicios restringidos pueden transferirse o canjearse con reglas basadas en pruebas.',
          },
          {
            title: 'Servicios públicos y cadenas de suministro',
            body: 'Agencias y operadores pueden verificar elegibilidad, licencias, origen o cumplimiento sin ciclos manuales de documentos.',
          },
        ],
      },
      {
        id: 'chapter-8',
        eyebrow: 'Capítulo 8',
        title: 'Seguridad y cumplimiento',
        paragraphs: [
          'La seguridad debe diseñarse desde el inicio: firmas criptográficas, autenticación fuerte, comprobaciones de revocación, minimización de datos y rutas de auditoría independientes.',
          'El modelo de cumplimiento debe adaptarse por jurisdicción y módulo. Identidad, pagos, salud, empleo y sector público pueden requerir licencias y gobierno distintos.',
        ],
        bulletsTitle: 'Postura de seguridad',
        bullets: [
          'Passkeys y fuerte vinculación de dispositivo para la billetera.',
          'Cifrado en tránsito y en reposo para datos operativos sensibles.',
          'Separación de funciones entre emisores, verificadores, custodios y servicios.',
          'Revisión independiente antes de lanzamientos regulados o de alto riesgo.',
        ],
      },
      {
        id: 'chapter-9',
        eyebrow: 'Capítulo 9',
        title: 'Modelo de negocio',
        paragraphs: [
          'El modelo de ingresos de Identra debe alinearse con la creación de confianza, no con la venta de datos de usuarios. Puede monetizar volumen de verificación, suscripciones de flujo, emisión y orquestación transaccional.',
          'La publicidad, si se introduce, debe ser voluntaria y basada en consentimiento. Un modelo Plan A puede devolver al usuario parte del valor generado por el uso voluntario de atributos.',
        ],
        cards: [
          {
            title: 'Tarifas transaccionales',
            body: 'Aplicadas cuando datos verificados coordinan contratos, custodia, pagos u obligaciones registradas.',
          },
          {
            title: 'Uso de API y SDK',
            body: 'Cobrado a empresas por KYC, KYB, AML, biometría, validación de credenciales y auditoría.',
          },
        ],
      },
      {
        id: 'chapter-10',
        eyebrow: 'Capítulo 10',
        title: 'Hoja de ruta, riesgos y principios',
        paragraphs: [
          'La hoja de ruta avanza por etapas para que la infraestructura de confianza madure junto con la usabilidad, adopción de mercado y preparación legal.',
        ],
        table: {
          headers: ['Año', 'Foco', 'Resultado esperado'],
          rows: [
            ['2026', 'Billetera de identidad y demo SSI', 'Prototipo de billetera, gestión de credenciales, passkeys y flujos educativos'],
            ['2027', 'Emisión, verificación y APIs empresariales', 'Integraciones institucionales, herramientas de verificación y pilotos de cumplimiento'],
            ['2028', 'Contratos, IDPay y Mini Apps', 'Transacciones condicionadas y ecosistema de servicios de terceros'],
            ['2029', 'Ecosistemas sectoriales', 'Educación, finanzas, comercio, servicios públicos y cadenas de suministro'],
            ['2030', 'Expansión regional', 'Interoperabilidad transfronteriza de credenciales y redes de socios'],
          ],
        },
        orderedTitle: 'Principios de desarrollo',
        ordered: [
          'No describir una capacidad objetivo como si ya estuviera terminada.',
          'No construir el negocio alrededor de vender datos del usuario.',
          'No sacrificar interoperabilidad y agencia del usuario por crecimiento de corto plazo.',
        ],
      },
      {
        id: 'conclusion',
        eyebrow: 'Conclusión',
        title: 'Datos confiables como capacidad predeterminada',
        paragraphs: [
          'La economía digital creó enormes cantidades de datos, pero gran parte sigue siendo difícil de probar, reutilizar y conectar a transacciones automatizadas entre organizaciones independientes.',
          'Identra aborda ese vacío conectando datos verificables con contratos inteligentes en una experiencia unificada. El resultado no es solo otro conjunto de funciones, sino una dirección de infraestructura para servicios digitales más seguros.',
        ],
      },
      {
        id: 'appendix-a',
        eyebrow: 'Apéndice A',
        title: 'Términos clave',
        paragraphs: [],
        table: {
          headers: ['Término', 'Significado en Identra'],
          rows: [
            ['Identidad autosoberana (SSI)', 'Modelo en el que el sujeto controla el uso de evidencia de identidad y datos personales.'],
            ['Billetera de identidad', 'Herramienta para gestionar credenciales, claves, consentimiento, firmas y relaciones confiables.'],
            ['Credencial verificable (VC)', 'Datos estructurados firmados por un emisor y verificables independientemente.'],
            ['Emisor', 'Parte que crea y firma una credencial.'],
            ['Titular', 'Parte que almacena una credencial y decide cuándo presentarla.'],
            ['Verificador', 'Parte que solicita y valida una prueba.'],
            ['Marco de confianza', 'Reglas que definen roles, autoridad, niveles de garantía y responsabilidad.'],
            ['Mini App', 'Servicio de tercero dentro de Identra que usa datos mediante la capa de permisos.'],
          ],
        },
      },
      {
        id: 'appendix-b',
        eyebrow: 'Apéndice B',
        title: 'Dirección técnica',
        paragraphs: [
          'Identra debe admitir múltiples formatos de credenciales e infraestructuras de confianza, incluidos W3C VC v2.0, OpenID4VCI, OpenID4VP, SD-JWT VC, JSON-LD, ISO mdoc, DID Core, did:web, did:peer, did:key y passkey/WebAuthn.',
        ],
      },
      {
        id: 'appendix-c',
        eyebrow: 'Apéndice C',
        title: 'Materiales de referencia',
        paragraphs: [],
        bullets: [
          'Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials.',
          'W3C Verifiable Credentials Data Model v2.0.',
          'W3C Decentralized Identifiers (DIDs) v1.0.',
          'OpenID for Verifiable Credential Issuance y OpenID for Verifiable Presentations.',
          'Normativa aplicable sobre privacidad, protección de datos, transacciones electrónicas, ciberseguridad, AML e intermediación de pagos.',
        ],
      },
    ],
  },
  ja: {
    backToLanding: 'ホーム',
    versionBadge: 'ホワイトペーパー v1.0',
    publisher: 'AwnCorp / Identra',
    copyLink: '共有',
    copied: 'コピー済み',
    print: '印刷 / PDF出力',
    copyLinkTitle: 'リンクをコピー',
    mobileTocTitle: 'ホワイトペーパー目次',
    desktopTocTitle: 'ドキュメント目次',
    tocAriaLabel: 'ホワイトペーパー目次',
    searchPlaceholder: 'ホワイトペーパーを検索...',
    noTocResults: '一致するセクションはありません。',
    heroBadge: 'Identra公式ホワイトペーパー 2026',
    heroTitle: 'IDENTRA ホワイトペーパー',
    heroSubtitle: '検証可能なデータとスマートコントラクト取引のためのスーパーアプリ',
    metadata: [
      { title: 'バージョン', body: '1.0 - 2026年7月' },
      { title: '著者', body: 'AwnCorp / Identra R&D' },
      { title: '最初の市場', body: 'ベトナム' },
      { title: '方向性', body: 'グローバル相互運用性' },
    ],
    callouts: [
      {
        title: '開発状況:',
        body: '公開時点のIdentraは、研究、製品アーキテクチャ、UI/UX検証の段階にあります。本書の機能や目標は、プロトタイプ、監査、パイロット、本番展開を通じて確認される設計目標です。',
        tone: 'accent',
      },
      {
        title: '文書の範囲:',
        body: '本書はIdentraのビジョン、運用モデル、社会的・経済的価値、企業向け検証基盤、スマートコントラクトの役割、事業モデル、ロードマップを説明します。',
        tone: 'success',
      },
    ],
    cta: 'Identra Sandboxを試す',
    attribution: 'AwnCorp / Identra - バージョン1.0、2026年7月',
    sections: [
      {
        id: 'foundational-concepts',
        eyebrow: '基礎',
        title: '2つの基礎概念',
        paragraphs: [
          'Identraの前提はシンプルです。重要な主張を独立して検証でき、その結果を同意に基づく自動ワークフローで使えると、デジタルサービスはより安全になります。',
        ],
        cards: [
          {
            title: '検証可能な資格情報',
            body: '権限ある発行者が発行し、暗号技術で保護されたデジタル証明です。データの出所、改ざん有無、有効性を確認できます。',
          },
          {
            title: 'スマートコントラクト',
            body: '合意された条件を自動実行するプログラムです。Identraでは、検証済みデータを使って支払い、アクセス権、エスクロー、証跡、義務履行を調整します。',
          },
        ],
        note: {
          title: '組み合わせの価値',
          body: '資格情報は信頼できる根拠を提供し、スマートコントラクトはその根拠を監査可能な行動に変えます。',
        },
      },
      {
        id: 'executive-summary',
        eyebrow: 'エグゼクティブサマリー',
        title: 'デジタル活動のための統合トラストレイヤー',
        paragraphs: [
          'Identraは、人と組織が共通のトラストレイヤー上でデジタル活動を行うスーパーアプリです。プライバシー、データ主体性、検証可能な根拠を製品の基本要素として扱います。',
          'プラットフォームは、ユーザーが管理する資格情報ウォレットと企業向け検証レイヤーを組み合わせます。個人は再利用可能な証明を保持し、組織はAPIと管理ツールで資格情報を発行、要求、検証できます。',
          '目的は全サービスを一社に集中させることではありません。教育、採用、金融、商取引、公共サービス、サプライチェーンをまたいで、信頼できるデータを再利用できるようにすることです。',
        ],
        bulletsTitle: '主要な成果',
        bullets: [
          '再利用可能な根拠により、繰り返しのオンボーディングと書類収集を減らします。',
          '同意に基づく共有により、ユーザーと機関の責任関係が明確になります。',
          '必要な証明とポリシー条件が満たされた場合のみ、スマートコントラクトを実行できます。',
          '企業はKYC、KYB、AML、監査、信頼できるデータ交換の一貫したレイヤーを得られます。',
        ],
      },
      {
        id: 'chapter-1',
        eyebrow: '第1章',
        title: '背景と課題',
        paragraphs: [
          '現在のデジタルサービスは、スクリーンショット、コピーされた書類、手作業の証明、孤立したデータベースに依存しがちです。これらは遅く、改ざんされやすく、組織間で再利用しにくい方法です。',
          '同時に、ユーザーは同じ機微情報を何度も提出する必要があります。これは漏えいリスクを増やし、信頼を損ない、単純な取引にも摩擦を生みます。',
        ],
        cards: [
          {
            title: '分断された検証',
            body: '各プラットフォームが独自の本人確認と書類確認を構築し、コストと保証水準がばらつきます。',
          },
          {
            title: '低いデータポータビリティ',
            body: '信頼できる発行者の検証済み主張を、別のサービスへ再利用することが難しい状況です。',
          },
          {
            title: '限定的な自動化',
            body: '入力根拠が機械検証できなければ、契約やワークフローは高価値な処理を安全に自動化できません。',
          },
        ],
      },
      {
        id: 'chapter-2',
        eyebrow: '第2章',
        title: 'Identraとは',
        paragraphs: [
          'Identraは、日常的に使えるアプリと企業向けAPIを通じて提供される、IDと検証可能データのインフラレイヤーです。人が証明を保持し、組織が安全にその証明を信頼できるようにします。',
          '製品はモジュール型です。ウォレット、資格情報発行、検証要求、ポリシーオーケストレーション、監査ログ、取引実行は、共通のトラストモデルのもとで個別に進化できます。',
        ],
        bulletsTitle: '設計原則',
        bullets: [
          '機微属性を共有する前にユーザー同意を必須にします。',
          '各ユースケースでは必要最小限の主張だけを提示します。',
          '組織は過剰な個人データ収集なしに検証判断を監査できる必要があります。',
          '閉じたネットワーク効果より相互運用性を重視します。',
        ],
      },
      {
        id: 'chapter-3',
        eyebrow: '第3章',
        title: 'Identraの2つの柱',
        paragraphs: [
          '第一の柱はIdentra Walletです。ユーザーが資格情報、鍵、承認、取引履歴を管理する親しみやすい体験を提供します。',
          '第二の柱はEnterprise Trust Platformです。発行者、検証者、サービス提供者が大規模に運用するためのAPI、SDK、ワークフロー制御、コンプライアンスツールを提供します。',
        ],
        cards: [
          {
            title: 'Identra Wallet',
            body: '資格情報を保持し、同意を管理し、提示に署名し、データ利用先をユーザーに可視化します。',
          },
          {
            title: 'Enterprise Trust Platform',
            body: '組織が資格情報を発行し、証明を要求し、リスクチェックを実行し、検証結果を業務フローへ接続できます。',
          },
        ],
      },
      {
        id: 'chapter-4',
        eyebrow: '第4章',
        title: '運用アーキテクチャ',
        paragraphs: [
          'Identraはユーザー体験とトラストインフラを分離します。アプリ層は同意と日常操作を扱い、検証層は証明とポリシーを評価し、登録・監査層は必要に応じて永続的な信頼シグナルを記録します。',
          'CertNetの方向性は、発行者レジストリ、資格情報スキーマ、失効状態、DID解決を支えます。不要な個人データを公開せず、信頼判断を持ち運べるようにすることが狙いです。',
        ],
        bulletsTitle: '参照レイヤー',
        bullets: [
          'ウォレットと同意レイヤー',
          '資格情報発行と提示レイヤー',
          '企業向け検証とポリシーオーケストレーション',
          '登録、監査、相互運用レイヤー',
          'スマートコントラクト実行レイヤー',
        ],
      },
      {
        id: 'chapter-5',
        eyebrow: '第5章',
        title: '企業向けプラットフォーム',
        paragraphs: [
          '組織にとってIdentraは単一のチェックではなく、検証のオペレーティングシステムです。チームはジャーニーを設定し、保証要件を定義し、例外を確認し、信頼シグナルを再利用できます。',
          '企業レイヤーは、教育機関、雇用主、金融機関、マーケットプレイス、公共機関、サプライチェーン事業者など、出所が明確な根拠を必要とする組織を支援します。',
        ],
        cards: [
          {
            title: '発行',
            body: '学位、免許、企業ステータス、会員資格、適格性、完了済みチェックの署名付き資格情報を作成します。',
          },
          {
            title: '検証',
            body: '証明を要求し、発行者を検証し、失効を確認し、監査可能な結果を生成します。',
          },
          {
            title: '運用',
            body: '例外をルーティングし、ログを確認し、コンバージョンを測定し、製品フローを作り直さずにポリシーを調整します。',
          },
        ],
      },
      {
        id: 'chapter-6',
        eyebrow: '第6章',
        title: 'スマートコントラクト',
        paragraphs: [
          'スマートコントラクトは入力が信頼できる場合に価値を発揮します。Identraは価値移動や権利変更の前に、検証済み主張とポリシー結果を提供します。',
          '例として、配送証明後の条件付き支払い、資格情報検証後のエスクロー解放、適格性チェック付きチケット移転、年齢や免許確認後のサービスアクセスがあります。',
        ],
        bulletsTitle: '契約のガードレール',
        bullets: [
          '可能な限り、生の機微データではなく証明結果を実行へ渡します。',
          '判断、ポリシー版、発行者、同意イベントを結ぶ監査証跡を保持します。',
          '高価値または規制対象の活動には、例外処理と紛争解決フローが必要です。',
        ],
      },
      {
        id: 'chapter-7',
        eyebrow: '第7章',
        title: 'ユースケース',
        paragraphs: [
          'Identraはまず、繰り返し検証が明確な摩擦を生む市場を対象とします。教育、採用、中小企業金融、商取引、チケット、公共サービス、信頼できるサプライチェーンです。',
        ],
        cards: [
          {
            title: '教育と採用',
            body: '学校が資格情報を一度発行し、候補者は雇用主や奨学金プログラムで再利用できます。',
          },
          {
            title: '金融と中小企業',
            body: '検証済みの本人確認、企業状態、権限は、オンボーディング、融資、口座管理に利用できます。',
          },
          {
            title: '商取引とデジタル資産',
            body: 'チケット、保証、会員資格、制限付きサービスは、証明ベースのルールで譲渡や利用ができます。',
          },
          {
            title: '公共サービスとサプライチェーン',
            body: '機関や事業者は、手作業の書類確認を減らしながら適格性、免許、原産地、コンプライアンスを検証できます。',
          },
        ],
      },
      {
        id: 'chapter-8',
        eyebrow: '第8章',
        title: 'セキュリティとコンプライアンス',
        paragraphs: [
          'セキュリティは初期設計から組み込む必要があります。暗号署名、強力な認証、失効確認、データ最小化、独立した監査経路が中核要件です。',
          'コンプライアンスモデルは管轄とモジュールごとに適応する必要があります。本人確認、決済、健康データ、雇用チェック、公共部門では、異なるライセンスやガバナンスが求められます。',
        ],
        bulletsTitle: 'セキュリティ姿勢',
        bullets: [
          'ウォレットアクセスにはPasskeysと強いデバイス紐付けを用います。',
          '機微な運用データは転送時と保存時に暗号化します。',
          '発行者、検証者、カストディアン、アプリケーションサービスの職務を分離します。',
          '規制対象または高リスクの本番展開前に独立レビューを行います。',
        ],
      },
      {
        id: 'chapter-9',
        eyebrow: '第9章',
        title: '事業モデル',
        paragraphs: [
          'Identraの収益モデルは、ユーザーデータ販売ではなく信頼の創出と整合すべきです。検証量、企業ワークフロー契約、発行ツール、取引オーケストレーションを収益化できます。',
          '広告を導入する場合も、オプトインかつ同意ベースであるべきです。Plan Aモデルでは、属性利用で生まれた価値の一部をユーザーへ還元できます。',
        ],
        cards: [
          {
            title: '取引手数料',
            body: '検証済みデータが契約、エスクロー、支払い、記録された義務を調整する際に発生します。',
          },
          {
            title: 'APIとSDK利用',
            body: 'KYC、KYB、AML、生体認証、資格情報検証、監査ワークフローに対して企業へ課金します。',
          },
        ],
      },
      {
        id: 'chapter-10',
        eyebrow: '第10章',
        title: 'ロードマップ、リスク、開発原則',
        paragraphs: [
          'ロードマップは、トラストインフラを製品の使いやすさ、市場導入、法的準備と並行して成熟させるため段階的に設計されています。',
        ],
        table: {
          headers: ['年', '重点', '目標成果'],
          rows: [
            ['2026', 'IDウォレットとSSIデモ', 'ウォレット試作、資格情報管理、Passkeys、教育向けサンプルフロー'],
            ['2027', '発行、検証、企業API', '機関統合、検証者ツール、コンプライアンスパイロット'],
            ['2028', 'コントラクト、IDPay、Mini Apps', '条件付き取引とサードパーティサービスのエコシステム'],
            ['2029', '業界エコシステム', '教育、金融、商取引、公共サービス、サプライチェーンのトラストフレームワーク'],
            ['2030', '地域拡大', '国境を越えた資格情報相互運用性とパートナーネットワーク'],
          ],
        },
        orderedTitle: '開発原則',
        ordered: [
          '目標機能を、すでに完成しているかのように説明しない。',
          'ユーザーデータ販売を中心とした事業モデルを構築しない。',
          '短期成長のために相互運用性とユーザー主体性を犠牲にしない。',
        ],
      },
      {
        id: 'conclusion',
        eyebrow: '結論',
        title: '信頼できるデータを標準機能へ',
        paragraphs: [
          'デジタル経済は膨大なデータを生みましたが、その多くは証明しにくく、再利用しにくく、独立した組織間の自動取引へ接続しにくいままです。',
          'Identraは、検証可能なデータとスマートコントラクトを統合体験の中で接続し、このギャップに取り組みます。それは単なる機能集合ではなく、より安全なデジタルサービスのためのインフラの方向性です。',
        ],
      },
      {
        id: 'appendix-a',
        eyebrow: '付録A',
        title: '主要用語',
        paragraphs: [],
        table: {
          headers: ['用語', 'Identraにおける意味'],
          rows: [
            ['Self-Sovereign Identity (SSI)', '主体が本人確認の根拠と個人データの利用を管理するモデル。'],
            ['IDウォレット', '資格情報、鍵、同意、署名、信頼関係を管理するツール。'],
            ['Verifiable Credential (VC)', '発行者が署名し、独立して検証できる構造化データ。'],
            ['発行者', '資格情報を作成し署名する当事者。'],
            ['保持者', '資格情報を保存し、提示のタイミングを選ぶ当事者。'],
            ['検証者', '証明を要求し検証する当事者。'],
            ['トラストフレームワーク', '役割、権限、保証レベル、責任を定義するルール。'],
            ['Mini App', 'Identra内で許可レイヤーを通じてデータを利用するサードパーティサービス。'],
          ],
        },
      },
      {
        id: 'appendix-b',
        eyebrow: '付録B',
        title: '技術方針',
        paragraphs: [
          'Identraは、W3C VC v2.0、OpenID4VCI、OpenID4VP、SD-JWT VC、JSON-LD、ISO mdoc、DID Core、did:web、did:peer、did:key、passkey/WebAuthnなど、複数の資格情報形式とトラストインフラを支援すべきです。',
        ],
      },
      {
        id: 'appendix-c',
        eyebrow: '付録C',
        title: '参考資料',
        paragraphs: [],
        bullets: [
          'Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials.',
          'W3C Verifiable Credentials Data Model v2.0.',
          'W3C Decentralized Identifiers (DIDs) v1.0.',
          'OpenID for Verifiable Credential IssuanceおよびOpenID for Verifiable Presentations.',
          'プライバシー、データ保護、電子取引、サイバーセキュリティ、AML、決済仲介に関する適用法令。',
        ],
      },
    ],
  },
  de: {
    backToLanding: 'Startseite',
    versionBadge: 'WHITEPAPER v1.0',
    publisher: 'AwnCorp / Identra',
    copyLink: 'Teilen',
    copied: 'Kopiert',
    print: 'Drucken / PDF exportieren',
    copyLinkTitle: 'Link kopieren',
    mobileTocTitle: 'Whitepaper-Inhalt',
    desktopTocTitle: 'Dokumentinhalt',
    tocAriaLabel: 'Whitepaper-Inhalt',
    searchPlaceholder: 'Whitepaper durchsuchen...',
    noTocResults: 'Keine passenden Abschnitte gefunden.',
    heroBadge: 'Offizielles Identra Whitepaper 2026',
    heroTitle: 'IDENTRA WHITEPAPER',
    heroSubtitle: 'Eine Super-App für verifizierbare Daten und Smart-Contract-gestützte Transaktionen',
    metadata: [
      { title: 'Version', body: '1.0 - Juli 2026' },
      { title: 'Autor', body: 'AwnCorp / Identra R&D' },
      { title: 'Erster Markt', body: 'Vietnam' },
      { title: 'Ausrichtung', body: 'Globale Interoperabilität' },
    ],
    callouts: [
      {
        title: 'Entwicklungsstand:',
        body: 'Zum Zeitpunkt der Veröffentlichung befindet sich Identra in Forschung, Produktarchitektur und UI/UX-Validierung. Die beschriebenen Funktionen und Ziele sind Designziele, die durch Prototypen, Audits, Pilotierungen und Produktionseinführungen bestätigt werden müssen.',
        tone: 'accent',
      },
      {
        title: 'Dokumentumfang:',
        body: 'Dieses Whitepaper erklärt Vision, Betriebsmodell, sozialen und wirtschaftlichen Wert, Unternehmensverifikation, Rolle von Smart Contracts, Geschäftsmodell und Entwicklungsfahrplan von Identra.',
        tone: 'success',
      },
    ],
    cta: 'Identra Sandbox erleben',
    attribution: 'AwnCorp / Identra - Version 1.0, Juli 2026',
    sections: [
      {
        id: 'foundational-concepts',
        eyebrow: 'Grundlagen',
        title: 'Zwei grundlegende Konzepte',
        paragraphs: [
          'Identra baut auf einer einfachen Prämisse auf: Digitale Dienste werden sicherer, wenn wichtige Aussagen unabhängig verifiziert und anschließend mit Einwilligung in automatisierten Workflows genutzt werden können.',
        ],
        cards: [
          {
            title: 'Verifiable Credential',
            body: 'Ein digitaler Nachweis, der von einer autoritativen Quelle ausgestellt und kryptografisch geschützt wird. Er zeigt, woher Daten stammen, ob sie verändert wurden und ob sie gültig bleiben.',
          },
          {
            title: 'Smart Contract',
            body: 'Ein Programm, das vereinbarte Bedingungen automatisch ausführt. In Identra koordinieren Smart Contracts Zahlungen, Zugriffsrechte, Escrow, Nachweise oder Verpflichtungen anhand verifizierter Daten.',
          },
        ],
        note: {
          title: 'Warum diese Kombination zählt',
          body: 'Credentials liefern vertrauenswürdige Evidenz; Smart Contracts machen daraus prüfbare Aktionen.',
        },
      },
      {
        id: 'executive-summary',
        eyebrow: 'Executive Summary',
        title: 'Eine einheitliche Vertrauensschicht für digitale Aktivität',
        paragraphs: [
          'Identra ist eine Super-App, in der Menschen und Organisationen digitale Aktivitäten auf einer gemeinsamen Vertrauensschicht ausführen. Datenschutz, Datenhoheit und verifizierbare Evidenz sind Produktgrundlagen.',
          'Die Plattform kombiniert eine nutzergesteuerte Credential Wallet mit einer Unternehmensschicht für Verifikation. Personen behalten wiederverwendbare Nachweise, Organisationen können Credentials über APIs und Governance-Tools ausstellen, anfordern und validieren.',
          'Ziel ist nicht, alle Dienste in einem Unternehmen zu zentralisieren. Identra soll vertrauenswürdige Daten über Bildung, Recruiting, Finanzwesen, Handel, öffentliche Dienste und Lieferketten hinweg nutzbar machen.',
        ],
        bulletsTitle: 'Zentrale Ergebnisse',
        bullets: [
          'Wiederverwendbare Evidenz reduziert wiederholtes Onboarding und doppelte Dokumentenerfassung.',
          'Einwilligungsbasierte Datenfreigabe schafft klarere Verantwortung zwischen Nutzern und Institutionen.',
          'Smart Contracts können erst ausgeführt werden, wenn erforderliche Nachweise und Richtlinien erfüllt sind.',
          'Unternehmen erhalten eine konsistente Schicht für KYC, KYB, AML, Audit-Trails und vertrauenswürdigen Datenaustausch.',
        ],
      },
      {
        id: 'chapter-1',
        eyebrow: 'Kapitel 1',
        title: 'Kontext und Problem',
        paragraphs: [
          'Digitale Dienste stützen sich noch immer auf Screenshots, kopierte Dokumente, manuelle Bestätigungen und isolierte Datenbanken. Diese Methoden sind langsam, manipulierbar und organisationsübergreifend schwer wiederzuverwenden.',
          'Gleichzeitig müssen Nutzer dieselben sensiblen Informationen immer wieder einreichen. Das erhöht das Risiko von Datenpannen, schwächt Vertrauen und erzeugt unnötige Reibung.',
        ],
        cards: [
          {
            title: 'Fragmentierte Verifikation',
            body: 'Jede Plattform baut eigene Identitäts- und Dokumentprüfungen, wodurch Kosten dupliziert und Sicherheiten uneinheitlich werden.',
          },
          {
            title: 'Geringe Datenportabilität',
            body: 'Nutzer können eine verifizierte Aussage selten ohne erneuten Prozess von einem vertrauenswürdigen Aussteller zu einem anderen Dienst mitnehmen.',
          },
          {
            title: 'Begrenzte Automatisierung',
            body: 'Verträge und Workflows können hochwertige Aktionen nicht sicher automatisieren, wenn die Eingabeevidenz nicht maschinenprüfbar ist.',
          },
        ],
      },
      {
        id: 'chapter-2',
        eyebrow: 'Kapitel 2',
        title: 'Was Identra ist',
        paragraphs: [
          'Identra ist eine Infrastruktur für Identität und verifizierbare Daten, bereitgestellt über eine nutzerfreundliche App und Enterprise-APIs. Menschen können Nachweise halten, Organisationen können diesen Nachweisen sicher vertrauen.',
          'Die Produktrichtung ist modular: Wallet, Credential-Ausstellung, Verifikationsanfragen, Policy-Orchestrierung, Audit-Logs und Transaktionsausführung können unabhängig wachsen und ein gemeinsames Vertrauensmodell nutzen.',
        ],
        bulletsTitle: 'Designprinzipien',
        bullets: [
          'Vor der Freigabe sensibler Attribute ist Nutzereinwilligung erforderlich.',
          'Jeder Anwendungsfall sollte nur die minimal notwendige Aussage präsentieren.',
          'Organisationen müssen Entscheidungen prüfen können, ohne zu viele personenbezogene Daten zu sammeln.',
          'Interoperabilität ist wichtiger als geschlossene Netzwerkeffekte.',
        ],
      },
      {
        id: 'chapter-3',
        eyebrow: 'Kapitel 3',
        title: 'Die zwei Säulen von Identra',
        paragraphs: [
          'Die erste Säule ist die Identra Wallet: eine vertraute Erfahrung, in der Nutzer Credentials, Schlüssel, Freigaben und Transaktionshistorie verwalten.',
          'Die zweite Säule ist die Enterprise Trust Platform: APIs, SDKs, Workflow-Steuerung und Compliance-Werkzeuge, mit denen Aussteller, Verifizierer und Serviceanbieter skalieren können.',
        ],
        cards: [
          {
            title: 'Identra Wallet',
            body: 'Speichert Credentials, verwaltet Einwilligung, signiert Präsentationen und zeigt Nutzern, wo ihre Daten verwendet werden.',
          },
          {
            title: 'Enterprise Trust Platform',
            body: 'Ermöglicht Organisationen, Credentials auszustellen, Nachweise anzufordern, Risikoprüfungen durchzuführen und verifizierte Ergebnisse mit Geschäftsprozessen zu verbinden.',
          },
        ],
      },
      {
        id: 'chapter-4',
        eyebrow: 'Kapitel 4',
        title: 'Betriebsarchitektur',
        paragraphs: [
          'Identra trennt Nutzererlebnis und Vertrauensinfrastruktur. Die App-Schicht verarbeitet Einwilligung und Alltagsaktionen; die Verifikationsschicht bewertet Nachweise und Richtlinien; Registry- und Audit-Schichten speichern dauerhafte Vertrauenssignale, wo es sinnvoll ist.',
          'Eine CertNet-Ausrichtung kann Ausstellerregister, Credential-Schemata, Widerrufsstatus und DID-Auflösung unterstützen. Ziel ist portable Vertrauensentscheidung ohne unnötige Offenlegung personenbezogener Daten.',
        ],
        bulletsTitle: 'Referenzschichten',
        bullets: [
          'Wallet- und Einwilligungsschicht',
          'Credential-Ausstellung und Präsentation',
          'Enterprise-Verifikation und Policy-Orchestrierung',
          'Registry, Audit und Interoperabilität',
          'Smart-Contract-Ausführung',
        ],
      },
      {
        id: 'chapter-5',
        eyebrow: 'Kapitel 5',
        title: 'Enterprise-Plattform',
        paragraphs: [
          'Für Organisationen ist Identra als Betriebssystem für Verifikation gedacht, nicht als Einzelprüfung. Teams können Journeys konfigurieren, Assurance-Anforderungen definieren, Ausnahmen prüfen und vertrauenswürdige Signale wiederverwenden.',
          'Die Enterprise-Schicht kann Bildungsanbieter, Arbeitgeber, Finanzinstitute, Marktplätze, Behörden und Lieferkettenbetreiber unterstützen, die Evidenz mit klarer Herkunft benötigen.',
        ],
        cards: [
          {
            title: 'Ausstellung',
            body: 'Signierte Credentials für Abschlüsse, Lizenzen, Unternehmensstatus, Mitgliedschaften, Berechtigungen oder abgeschlossene Prüfungen erstellen.',
          },
          {
            title: 'Verifikation',
            body: 'Nachweise anfordern, Aussteller validieren, Widerruf prüfen und auditierbare Ergebnisse erzeugen.',
          },
          {
            title: 'Betrieb',
            body: 'Ausnahmen routen, Logs prüfen, Conversion messen und Richtlinien anpassen, ohne den Produktfluss neu zu bauen.',
          },
        ],
      },
      {
        id: 'chapter-6',
        eyebrow: 'Kapitel 6',
        title: 'Smart Contracts',
        paragraphs: [
          'Smart Contracts sind nur nützlich, wenn die Eingaben vertrauenswürdig sind. Identra liefert verifizierte Aussagen und Policy-Ergebnisse, bevor Werte bewegt oder Rechte geändert werden.',
          'Beispiele sind bedingte Zahlungen nach Liefernachweis, Escrow-Freigabe nach Credential-Validierung, Ticketübertragung mit Berechtigungsprüfung oder Servicezugang nach Alters- oder Lizenzprüfung.',
        ],
        bulletsTitle: 'Leitplanken für Contracts',
        bullets: [
          'Wenn möglich, nur Prüfergebnisse statt sensibler Rohdaten in die Ausführung geben.',
          'Ein Audit-Trail muss Entscheidung, Policy-Version, Aussteller und Einwilligungsereignis verbinden.',
          'Fallback- und Streitfallprozesse sind für regulierte oder hochwertige Aktivitäten erforderlich.',
        ],
      },
      {
        id: 'chapter-7',
        eyebrow: 'Kapitel 7',
        title: 'Anwendungsfälle',
        paragraphs: [
          'Identra adressiert zuerst Märkte, in denen wiederholte Verifikation spürbare Reibung erzeugt: Bildung, Recruiting, Finanzierung kleiner Unternehmen, Handel, Ticketing, öffentliche Dienste und vertrauenswürdige Lieferketten.',
        ],
        cards: [
          {
            title: 'Bildung und Recruiting',
            body: 'Institutionen stellen Credentials einmal aus; Kandidaten verwenden sie bei Arbeitgebern und Förderprogrammen wieder.',
          },
          {
            title: 'Finanzen und kleine Unternehmen',
            body: 'Verifizierte Identität, Unternehmensstatus und Berechtigungen unterstützen Onboarding, Kreditvergabe und Kontrollen.',
          },
          {
            title: 'Handel und digitale Assets',
            body: 'Tickets, Garantien, Mitgliedschaften und geschützte Dienste können mit nachweisbasierten Regeln übertragen oder eingelöst werden.',
          },
          {
            title: 'Öffentliche Dienste und Lieferketten',
            body: 'Behörden und Betreiber prüfen Berechtigung, Lizenzen, Ursprung oder Compliance ohne manuelle Dokumentenschleifen.',
          },
        ],
      },
      {
        id: 'chapter-8',
        eyebrow: 'Kapitel 8',
        title: 'Sicherheit und Compliance',
        paragraphs: [
          'Sicherheit muss von Beginn an integriert sein: kryptografische Signaturen, starke Authentifizierung, Widerrufsprüfungen, Datenminimierung und unabhängige Audit-Pfade sind Kernanforderungen.',
          'Das Compliance-Modell muss sich nach Jurisdiktion und Modul anpassen. Identitätsprüfung, Zahlungen, Gesundheitsdaten, Beschäftigungsprüfungen und öffentlicher Sektor können unterschiedliche Lizenzen und Governance erfordern.',
        ],
        bulletsTitle: 'Sicherheitsausrichtung',
        bullets: [
          'Passkeys und starke Gerätebindung für Wallet-Zugriff.',
          'Verschlüsselung während Übertragung und Speicherung sensibler Betriebsdaten.',
          'Trennung von Aufgaben zwischen Ausstellern, Verifizierern, Verwahrern und App-Diensten.',
          'Unabhängige Prüfung vor regulierten oder risikoreichen Produktionsstarts.',
        ],
      },
      {
        id: 'chapter-9',
        eyebrow: 'Kapitel 9',
        title: 'Geschäftsmodell',
        paragraphs: [
          'Identras Umsatzmodell sollte auf Vertrauensbildung ausgerichtet sein, nicht auf den Verkauf von Nutzerdaten. Monetarisierbar sind Verifikationsvolumen, Enterprise-Workflow-Abos, Ausstellungswerkzeuge und Transaktionsorchestrierung.',
          'Werbung sollte, falls eingeführt, freiwillig und einwilligungsbasiert bleiben. Ein Plan-A-Modell kann Wert aus freiwilliger Attributnutzung an Nutzer zurückgeben.',
        ],
        cards: [
          {
            title: 'Transaktionsgebühren',
            body: 'Fallen an, wenn verifizierte Daten Contracts, Escrow, Zahlungen oder dokumentierte Verpflichtungen koordinieren.',
          },
          {
            title: 'API- und SDK-Nutzung',
            body: 'Abrechnung für KYC, KYB, AML, biometrische Prüfungen, Credential-Validierung und Audit-Workflows.',
          },
        ],
      },
      {
        id: 'chapter-10',
        eyebrow: 'Kapitel 10',
        title: 'Roadmap, Risiken und Entwicklungsprinzipien',
        paragraphs: [
          'Die Roadmap ist gestaffelt, damit Vertrauensinfrastruktur zusammen mit Benutzerfreundlichkeit, Markteinführung und rechtlicher Reife wachsen kann.',
        ],
        table: {
          headers: ['Jahr', 'Fokus', 'Zielergebnis'],
          rows: [
            ['2026', 'Identity Wallet und SSI-Demo', 'Wallet-Prototyp, Credential-Management, Passkeys und Beispiel-Workflows für Bildung'],
            ['2027', 'Ausstellung, Verifikation und Enterprise-APIs', 'Institutionelle Integrationen, Verifier-Tools und Compliance-Piloten'],
            ['2028', 'Contracts, IDPay und Mini Apps', 'Bedingte Transaktionen und Drittanbieter-Ökosystem'],
            ['2029', 'Branchenökosysteme', 'Trust Frameworks für Bildung, Finanzen, Handel, öffentliche Dienste und Lieferketten'],
            ['2030', 'Regionale Expansion', 'Grenzüberschreitende Credential-Interoperabilität und Partnernetzwerke'],
          ],
        },
        orderedTitle: 'Entwicklungsprinzipien',
        ordered: [
          'Zielfunktionen nicht als bereits fertig beschreiben.',
          'Kein Geschäftsmodell auf dem Verkauf von Nutzerdaten aufbauen.',
          'Interoperabilität und Nutzerhoheit nicht für kurzfristiges Wachstum opfern.',
        ],
      },
      {
        id: 'conclusion',
        eyebrow: 'Fazit',
        title: 'Vertrauenswürdige Daten als Standardfähigkeit',
        paragraphs: [
          'Die digitale Wirtschaft hat enorme Datenmengen geschaffen, doch viele Daten sind schwer zu beweisen, schwer wiederzuverwenden und schwer mit automatisierten Transaktionen zwischen unabhängigen Organisationen zu verbinden.',
          'Identra schließt diese Lücke, indem verifizierbare Daten und Smart Contracts in einer einheitlichen Erfahrung verbunden werden. Das Ergebnis ist nicht nur ein weiteres Funktionspaket, sondern eine Infrastruktur-Richtung für sicherere digitale Dienste.',
        ],
      },
      {
        id: 'appendix-a',
        eyebrow: 'Anhang A',
        title: 'Kernbegriffe',
        paragraphs: [],
        table: {
          headers: ['Begriff', 'Bedeutung in Identra'],
          rows: [
            ['Self-Sovereign Identity (SSI)', 'Ein Modell, in dem das Subjekt die Nutzung von Identitätsnachweisen und personenbezogenen Daten kontrolliert.'],
            ['Identity Wallet', 'Werkzeug zur Verwaltung von Credentials, Schlüsseln, Einwilligung, Signaturen und Vertrauensbeziehungen.'],
            ['Verifiable Credential (VC)', 'Strukturierte Daten, die von einem Aussteller signiert und unabhängig prüfbar sind.'],
            ['Aussteller', 'Die Partei, die ein Credential erstellt und signiert.'],
            ['Holder', 'Die Partei, die ein Credential speichert und entscheidet, wann es präsentiert wird.'],
            ['Verifier', 'Die Partei, die einen Nachweis anfordert und validiert.'],
            ['Trust Framework', 'Regeln für Rollen, Autorität, Assurance-Level und Verantwortlichkeit.'],
            ['Mini App', 'Drittanbieterdienst innerhalb von Identra, der Daten über die Berechtigungsschicht nutzt.'],
          ],
        },
      },
      {
        id: 'appendix-b',
        eyebrow: 'Anhang B',
        title: 'Technische Ausrichtung',
        paragraphs: [
          'Identra sollte mehrere Credential-Formate und Vertrauensinfrastrukturen unterstützen, darunter W3C VC v2.0, OpenID4VCI, OpenID4VP, SD-JWT VC, JSON-LD, ISO mdoc, DID Core, did:web, did:peer, did:key und passkey/WebAuthn.',
        ],
      },
      {
        id: 'appendix-c',
        eyebrow: 'Anhang C',
        title: 'Referenzmaterialien',
        paragraphs: [],
        bullets: [
          'Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials.',
          'W3C Verifiable Credentials Data Model v2.0.',
          'W3C Decentralized Identifiers (DIDs) v1.0.',
          'OpenID for Verifiable Credential Issuance und OpenID for Verifiable Presentations.',
          'Anwendbare Regeln zu Datenschutz, elektronischen Transaktionen, Cybersicherheit, AML und Zahlungsintermediären.',
        ],
      },
    ],
  },
  vi: {
    backToLanding: 'Trang chủ',
    versionBadge: 'SÁCH TRẮNG v1.0',
    publisher: 'AwnCorp / Identra',
    copyLink: 'Chia sẻ',
    copied: 'Đã chép',
    print: 'In / Xuất PDF',
    copyLinkTitle: 'Sao chép đường dẫn',
    mobileTocTitle: 'Mục lục sách trắng',
    desktopTocTitle: 'Mục lục tài liệu',
    tocAriaLabel: 'Mục lục sách trắng',
    searchPlaceholder: 'Tìm trong sách trắng...',
    noTocResults: 'Không có mục nào khớp với tìm kiếm.',
    heroBadge: 'Sách trắng chính thức Identra 2026',
    heroTitle: 'SÁCH TRẮNG IDENTRA',
    heroSubtitle: 'Siêu ứng dụng cho dữ liệu có thể kiểm chứng và giao dịch bằng hợp đồng thông minh',
    metadata: [
      { title: 'Phiên bản', body: '1.0 - Tháng 07/2026' },
      { title: 'Tác giả', body: 'R&D AwnCorp / Identra' },
      { title: 'Thị trường đầu tiên', body: 'Việt Nam' },
      { title: 'Định hướng', body: 'Liên thông quốc tế' },
    ],
    callouts: [
      {
        title: 'Trạng thái phát triển:',
        body: 'Tại thời điểm công bố, Identra đang trong giai đoạn nghiên cứu, thiết kế kiến trúc sản phẩm và xác thực UI/UX. Các năng lực và chỉ tiêu trong sách trắng là mục tiêu thiết kế cần được xác nhận qua nguyên mẫu, kiểm toán, thử nghiệm và triển khai thực tế.',
        tone: 'accent',
      },
      {
        title: 'Phạm vi tài liệu:',
        body: 'Tài liệu trình bày tầm nhìn, mô hình vận hành, giá trị kinh tế - xã hội, lớp xác minh cho tổ chức, vai trò hợp đồng thông minh, mô hình kinh doanh và lộ trình phát triển Identra.',
        tone: 'success',
      },
    ],
    cta: 'Trải nghiệm Identra Sandbox',
    attribution: 'AwnCorp / Identra - Phiên bản 1.0, Tháng 07/2026',
    sections: [
      {
        id: 'foundational-concepts',
        eyebrow: 'Nền tảng',
        title: 'Hai khái niệm nền tảng',
        paragraphs: [
          'Identra được xây dựng từ một tiền đề đơn giản: dịch vụ số an toàn hơn khi các khẳng định quan trọng có thể được kiểm chứng độc lập và được dùng trong luồng tự động có sự đồng ý.',
        ],
        cards: [
          {
            title: 'Thực chứng có thể kiểm chứng',
            body: 'Bằng chứng số do nguồn có thẩm quyền phát hành và bảo vệ bằng mật mã. Người xác minh có thể biết dữ liệu đến từ đâu, có bị sửa đổi hay không và còn hiệu lực hay không.',
          },
          {
            title: 'Hợp đồng thông minh',
            body: 'Chương trình tự động thực thi điều kiện đã thỏa thuận. Trong Identra, hợp đồng thông minh dùng dữ liệu đã xác minh để điều phối thanh toán, quyền truy cập, ký quỹ, chứng cứ hoặc hoàn thành nghĩa vụ.',
          },
        ],
        note: {
          title: 'Vì sao hai phần này đi cùng nhau',
          body: 'Thực chứng tạo căn cứ đáng tin cậy; hợp đồng thông minh biến căn cứ đó thành hành động có thể kiểm toán.',
        },
      },
      {
        id: 'executive-summary',
        eyebrow: 'Tóm tắt điều hành',
        title: 'Lớp niềm tin thống nhất cho hoạt động số',
        paragraphs: [
          'Identra là siêu ứng dụng nơi cá nhân và tổ chức thực hiện hoạt động số trên một lớp niềm tin chung. Quyền riêng tư, quyền tự chủ dữ liệu và bằng chứng có thể kiểm chứng được xem là nền tảng sản phẩm.',
          'Nền tảng kết hợp ví thực chứng do người dùng kiểm soát với lớp xác minh dành cho doanh nghiệp. Cá nhân giữ bằng chứng có thể tái sử dụng, còn tổ chức có thể phát hành, yêu cầu và xác minh thực chứng qua API và công cụ quản trị.',
          'Mục tiêu không phải tập trung mọi dịch vụ vào một công ty. Identra hướng tới việc giúp dữ liệu đáng tin cậy di chuyển giữa giáo dục, tuyển dụng, tài chính, thương mại, dịch vụ công và chuỗi cung ứng mà không phải làm lại xác minh từ đầu.',
        ],
        bulletsTitle: 'Kết quả cốt lõi',
        bullets: [
          'Bằng chứng tái sử dụng giúp giảm onboarding lặp lại và thu thập giấy tờ nhiều lần.',
          'Chia sẻ dữ liệu có đồng ý tạo trách nhiệm rõ ràng hơn giữa người dùng và tổ chức.',
          'Hợp đồng thông minh chỉ thực thi khi bằng chứng và chính sách yêu cầu đã thỏa mãn.',
          'Doanh nghiệp có lớp nhất quán cho KYC, KYB, AML, nhật ký kiểm toán và trao đổi dữ liệu tin cậy.',
        ],
      },
      {
        id: 'chapter-1',
        eyebrow: 'Chương 1',
        title: 'Bối cảnh và bài toán',
        paragraphs: [
          'Dịch vụ số vẫn phụ thuộc nhiều vào ảnh chụp màn hình, bản sao giấy tờ, xác nhận thủ công và cơ sở dữ liệu cô lập. Các phương thức này chậm, dễ bị sửa đổi và khó tái sử dụng giữa các tổ chức.',
          'Người dùng cũng phải nộp lại cùng một loại thông tin nhạy cảm nhiều lần. Điều này làm tăng rủi ro rò rỉ, suy giảm niềm tin và tạo ma sát không cần thiết trong các giao dịch vốn có thể đơn giản hơn.',
        ],
        cards: [
          {
            title: 'Xác minh phân mảnh',
            body: 'Mỗi nền tảng tự xây kiểm tra danh tính và giấy tờ, gây trùng chi phí và mức bảo đảm không đồng nhất.',
          },
          {
            title: 'Dữ liệu khó mang theo',
            body: 'Người dùng hiếm khi có thể dùng lại một khẳng định đã xác minh từ tổ chức đáng tin cậy sang dịch vụ khác mà không làm lại quy trình.',
          },
          {
            title: 'Tự động hóa bị giới hạn',
            body: 'Hợp đồng và quy trình khó tự động hóa hành động giá trị cao nếu đầu vào không thể được máy kiểm chứng.',
          },
        ],
      },
      {
        id: 'chapter-2',
        eyebrow: 'Chương 2',
        title: 'Identra là gì',
        paragraphs: [
          'Identra là lớp hạ tầng định danh và dữ liệu có thể kiểm chứng, được trình bày qua một ứng dụng thân thiện với người dùng và API cấp doanh nghiệp. Nền tảng giúp cá nhân giữ bằng chứng và giúp tổ chức tin cậy bằng chứng đó một cách an toàn.',
          'Định hướng sản phẩm mang tính mô-đun: ví, phát hành thực chứng, yêu cầu xác minh, điều phối chính sách, nhật ký kiểm toán và thực thi giao dịch có thể phát triển độc lập trên cùng mô hình niềm tin.',
        ],
        bulletsTitle: 'Nguyên tắc thiết kế',
        bullets: [
          'Cần có sự đồng ý của người dùng trước khi chia sẻ thuộc tính nhạy cảm.',
          'Mỗi trường hợp sử dụng chỉ nên trình bày khẳng định tối thiểu cần thiết.',
          'Tổ chức phải kiểm toán được quyết định xác minh mà không thu thập quá mức dữ liệu cá nhân.',
          'Khả năng liên thông quan trọng hơn hiệu ứng mạng đóng.',
        ],
      },
      {
        id: 'chapter-3',
        eyebrow: 'Chương 3',
        title: 'Hai trụ cột Identra',
        paragraphs: [
          'Trụ cột thứ nhất là Identra Wallet: trải nghiệm quen thuộc để người dùng quản lý thực chứng, khóa, phê duyệt và lịch sử giao dịch.',
          'Trụ cột thứ hai là Enterprise Trust Platform: API, SDK, điều khiển workflow và công cụ tuân thủ để tổ chức phát hành, xác minh và vận hành ở quy mô lớn.',
        ],
        cards: [
          {
            title: 'Identra Wallet',
            body: 'Lưu thực chứng, quản lý đồng ý, ký phần trình bày và cho người dùng thấy dữ liệu của họ đang được dùng ở đâu.',
          },
          {
            title: 'Enterprise Trust Platform',
            body: 'Cho phép tổ chức phát hành thực chứng, yêu cầu bằng chứng, chạy kiểm tra rủi ro và nối kết quả xác minh vào quy trình kinh doanh.',
          },
        ],
      },
      {
        id: 'chapter-4',
        eyebrow: 'Chương 4',
        title: 'Kiến trúc vận hành',
        paragraphs: [
          'Identra tách trải nghiệm người dùng khỏi hạ tầng niềm tin. Lớp ứng dụng xử lý đồng ý và hành động hằng ngày; lớp xác minh đánh giá bằng chứng và chính sách; lớp registry và kiểm toán ghi nhận tín hiệu niềm tin bền vững khi cần.',
          'Định hướng CertNet có thể hỗ trợ registry của bên phát hành, schema thực chứng, trạng thái thu hồi và phân giải DID. Mục tiêu là làm quyết định niềm tin có thể mang theo mà không đưa dữ liệu cá nhân không cần thiết lên hạ tầng công khai.',
        ],
        bulletsTitle: 'Các lớp tham chiếu',
        bullets: [
          'Lớp ví và đồng ý',
          'Lớp phát hành và trình bày thực chứng',
          'Lớp xác minh doanh nghiệp và điều phối chính sách',
          'Lớp registry, kiểm toán và liên thông',
          'Lớp thực thi hợp đồng thông minh',
        ],
      },
      {
        id: 'chapter-5',
        eyebrow: 'Chương 5',
        title: 'Nền tảng doanh nghiệp',
        paragraphs: [
          'Với tổ chức, Identra được thiết kế như hệ điều hành xác minh thay vì một phép kiểm tra đơn lẻ. Đội ngũ có thể cấu hình hành trình, định nghĩa mức bảo đảm, xử lý ngoại lệ và tái sử dụng tín hiệu đáng tin cậy.',
          'Lớp doanh nghiệp có thể phục vụ cơ sở giáo dục, nhà tuyển dụng, tổ chức tài chính, marketplace, cơ quan công và đơn vị chuỗi cung ứng cần bằng chứng có nguồn gốc rõ ràng.',
        ],
        cards: [
          {
            title: 'Phát hành',
            body: 'Tạo thực chứng đã ký cho bằng cấp, giấy phép, trạng thái doanh nghiệp, hội viên, điều kiện đủ hoặc kiểm tra đã hoàn thành.',
          },
          {
            title: 'Xác minh',
            body: 'Yêu cầu bằng chứng, kiểm tra bên phát hành, xác nhận thu hồi và tạo kết quả có thể kiểm toán.',
          },
          {
            title: 'Vận hành',
            body: 'Điều phối ngoại lệ, xem nhật ký, đo chuyển đổi và tinh chỉnh chính sách mà không xây lại luồng sản phẩm.',
          },
        ],
      },
      {
        id: 'chapter-6',
        eyebrow: 'Chương 6',
        title: 'Hợp đồng thông minh',
        paragraphs: [
          'Hợp đồng thông minh chỉ hữu ích khi đầu vào đáng tin cậy. Vai trò của Identra là cung cấp khẳng định đã xác minh và kết quả chính sách trước khi chuyển giá trị hoặc thay đổi quyền.',
          'Ví dụ gồm thanh toán có điều kiện sau bằng chứng giao hàng, giải ngân ký quỹ sau xác minh thực chứng, chuyển vé với kiểm tra điều kiện đủ hoặc cấp quyền dịch vụ sau xác minh tuổi hay giấy phép.',
        ],
        bulletsTitle: 'Rào chắn cho hợp đồng',
        bullets: [
          'Khi có thể, chỉ đưa kết quả chứng minh vào thực thi thay vì dữ liệu nhạy cảm thô.',
          'Nhật ký kiểm toán phải nối quyết định, phiên bản chính sách, bên phát hành và sự kiện đồng ý.',
          'Hoạt động giá trị cao hoặc chịu quản lý cần có luồng ngoại lệ và giải quyết tranh chấp.',
        ],
      },
      {
        id: 'chapter-7',
        eyebrow: 'Chương 7',
        title: 'Kịch bản ứng dụng',
        paragraphs: [
          'Identra ưu tiên các thị trường nơi xác minh lặp lại tạo ma sát rõ ràng: giáo dục, tuyển dụng, tài chính cho doanh nghiệp nhỏ, thương mại, vé, dịch vụ công và chuỗi cung ứng đáng tin cậy.',
        ],
        cards: [
          {
            title: 'Giáo dục và tuyển dụng',
            body: 'Trường phát hành thực chứng một lần; ứng viên tái sử dụng với nhà tuyển dụng và chương trình học bổng.',
          },
          {
            title: 'Tài chính và doanh nghiệp nhỏ',
            body: 'Danh tính, trạng thái doanh nghiệp và quyền đã xác minh có thể hỗ trợ onboarding, cho vay và kiểm soát tài khoản.',
          },
          {
            title: 'Thương mại và tài sản số',
            body: 'Vé, bảo hành, hội viên và dịch vụ giới hạn có thể chuyển nhượng hoặc sử dụng theo quy tắc dựa trên bằng chứng.',
          },
          {
            title: 'Dịch vụ công và chuỗi cung ứng',
            body: 'Cơ quan và đơn vị vận hành có thể xác minh điều kiện đủ, giấy phép, nguồn gốc hoặc tuân thủ mà không lặp vòng giấy tờ thủ công.',
          },
        ],
      },
      {
        id: 'chapter-8',
        eyebrow: 'Chương 8',
        title: 'Bảo mật và tuân thủ',
        paragraphs: [
          'Bảo mật phải được thiết kế ngay từ đầu: chữ ký mật mã, xác thực mạnh, kiểm tra thu hồi, tối thiểu hóa dữ liệu và đường kiểm toán độc lập là yêu cầu cốt lõi.',
          'Mô hình tuân thủ cần thích ứng theo từng khu vực pháp lý và mô-đun. Xác minh danh tính, thanh toán, dữ liệu sức khỏe, kiểm tra lao động và dịch vụ công có thể có yêu cầu giấy phép và quản trị khác nhau.',
        ],
        bulletsTitle: 'Tư thế bảo mật',
        bullets: [
          'Passkeys và ràng buộc thiết bị mạnh cho truy cập ví.',
          'Mã hóa khi truyền và khi lưu đối với dữ liệu vận hành nhạy cảm.',
          'Phân tách vai trò giữa bên phát hành, bên xác minh, đơn vị lưu ký và dịch vụ ứng dụng.',
          'Đánh giá độc lập trước khi triển khai sản xuất cho hoạt động chịu quản lý hoặc rủi ro cao.',
        ],
      },
      {
        id: 'chapter-9',
        eyebrow: 'Chương 9',
        title: 'Mô hình kinh doanh',
        paragraphs: [
          'Mô hình doanh thu của Identra nên gắn với việc tạo niềm tin thay vì bán dữ liệu người dùng. Nền tảng có thể thu từ lượt xác minh, đăng ký workflow doanh nghiệp, công cụ phát hành và điều phối giao dịch.',
          'Quảng cáo, nếu có, cần là tự nguyện và dựa trên đồng ý. Mô hình Plan A có thể chia sẻ lại cho người dùng phần giá trị sinh ra từ việc dùng thuộc tính một cách chủ động.',
        ],
        cards: [
          {
            title: 'Phí giao dịch',
            body: 'Áp dụng khi dữ liệu đã xác minh điều phối hợp đồng, ký quỹ, thanh toán hoặc nghĩa vụ được ghi nhận.',
          },
          {
            title: 'Sử dụng API và SDK',
            body: 'Doanh nghiệp trả phí cho KYC, KYB, AML, sinh trắc học, xác minh thực chứng và workflow kiểm toán.',
          },
        ],
      },
      {
        id: 'chapter-10',
        eyebrow: 'Chương 10',
        title: 'Lộ trình, rủi ro và nguyên tắc phát triển',
        paragraphs: [
          'Lộ trình được chia giai đoạn để hạ tầng niềm tin trưởng thành cùng khả năng sử dụng sản phẩm, mức chấp nhận thị trường và sự sẵn sàng pháp lý.',
        ],
        table: {
          headers: ['Năm', 'Trọng tâm', 'Kết quả định hướng'],
          rows: [
            ['2026', 'Ví định danh và demo SSI', 'Nguyên mẫu ví, quản lý thực chứng, passkeys và luồng giáo dục mẫu'],
            ['2027', 'Phát hành, xác minh và API doanh nghiệp', 'Tích hợp tổ chức, công cụ bên xác minh và thử nghiệm tuân thủ'],
            ['2028', 'Hợp đồng, IDPay và Mini Apps', 'Giao dịch có điều kiện và hệ sinh thái dịch vụ bên thứ ba'],
            ['2029', 'Hệ sinh thái ngành', 'Khung niềm tin cho giáo dục, tài chính, thương mại, dịch vụ công và chuỗi cung ứng'],
            ['2030', 'Mở rộng khu vực', 'Liên thông thực chứng xuyên biên giới và mạng lưới đối tác'],
          ],
        },
        orderedTitle: 'Nguyên tắc phát triển',
        ordered: [
          'Không mô tả năng lực định hướng như năng lực đã hoàn thành.',
          'Không xây dựng mô hình kinh doanh dựa trên bán dữ liệu người dùng.',
          'Không đánh đổi khả năng liên thông và quyền tự chủ của người dùng để lấy tăng trưởng ngắn hạn.',
        ],
      },
      {
        id: 'conclusion',
        eyebrow: 'Kết luận',
        title: 'Dữ liệu đáng tin cậy như năng lực mặc định',
        paragraphs: [
          'Kinh tế số đã tạo ra lượng dữ liệu rất lớn, nhưng phần lớn dữ liệu vẫn khó chứng minh, khó tái sử dụng và khó đưa vào giao dịch tự động giữa các tổ chức độc lập.',
          'Identra giải quyết khoảng trống đó bằng cách kết nối dữ liệu có thể kiểm chứng với hợp đồng thông minh trong một trải nghiệm thống nhất. Đây không chỉ là một tập hợp tính năng, mà là định hướng hạ tầng cho dịch vụ số an toàn hơn.',
        ],
      },
      {
        id: 'appendix-a',
        eyebrow: 'Phụ lục A',
        title: 'Thuật ngữ cốt lõi',
        paragraphs: [],
        table: {
          headers: ['Thuật ngữ', 'Nghĩa trong Identra'],
          rows: [
            ['Định danh tự chủ (SSI)', 'Mô hình trong đó chủ thể kiểm soát việc sử dụng bằng chứng định danh và dữ liệu cá nhân.'],
            ['Ví định danh', 'Công cụ quản lý thực chứng, khóa, đồng ý, chữ ký và quan hệ tin cậy.'],
            ['Thực chứng có thể kiểm chứng (VC)', 'Dữ liệu có cấu trúc được bên phát hành ký và có thể kiểm tra độc lập.'],
            ['Bên phát hành', 'Chủ thể tạo và ký thực chứng.'],
            ['Người nắm giữ', 'Chủ thể lưu thực chứng và quyết định khi nào trình xuất.'],
            ['Bên xác minh', 'Chủ thể yêu cầu và kiểm tra bằng chứng.'],
            ['Khung niềm tin', 'Bộ quy tắc xác định vai trò, thẩm quyền, mức bảo đảm và trách nhiệm.'],
            ['Mini App', 'Dịch vụ bên thứ ba chạy trong Identra và dùng dữ liệu qua lớp cấp quyền.'],
          ],
        },
      },
      {
        id: 'appendix-b',
        eyebrow: 'Phụ lục B',
        title: 'Định hướng kỹ thuật',
        paragraphs: [
          'Identra nên hỗ trợ nhiều định dạng thực chứng và hạ tầng niềm tin, gồm W3C VC v2.0, OpenID4VCI, OpenID4VP, SD-JWT VC, JSON-LD, ISO mdoc, DID Core, did:web, did:peer, did:key và passkey/WebAuthn.',
        ],
      },
      {
        id: 'appendix-c',
        eyebrow: 'Phụ lục C',
        title: 'Tài liệu tham chiếu',
        paragraphs: [],
        bullets: [
          'Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials.',
          'W3C Verifiable Credentials Data Model v2.0.',
          'W3C Decentralized Identifiers (DIDs) v1.0.',
          'OpenID for Verifiable Credential Issuance và OpenID for Verifiable Presentations.',
          'Quy định hiện hành về bảo vệ dữ liệu cá nhân, giao dịch điện tử, an ninh mạng, phòng chống rửa tiền và trung gian thanh toán.',
        ],
      },
    ],
  },
} satisfies Record<Language, WhitePaperCopy>;
