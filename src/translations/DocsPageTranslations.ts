/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const embeddingCode = `import React from 'react';
import Identra from 'identra-react';

export default function IdentityVerify() {
  const handleComplete = (inquiryId: string) => {
    console.log(\`Verification complete! ID: \${inquiryId}\`);
  };

  return (
    <Identra.Inquiry
      templateId="itmpl_Y4x8A9b..."
      environment="sandbox"
      onComplete={handleComplete}
    />
  );
}`;

const inquiryCode = `const response = await fetch('https://api.withidentra.com/v1/inquiries', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer prsk_test_SECRET_TOKEN',
    'Content-Type': 'application/json',
    'Identra-Version': '2025-12-08'
  },
  body: JSON.stringify({
    data: { attributes: { template_id: 'itmpl_Y4x8A9...', reference_id: 'user_102938' } }
  })
});

const inquiry = await response.json();`;

const DOCS_PAGE_STRUCTURE = [
  { id: 'introduction', category: 'overview', nextPageId: 'how-identra-works', sections: ['welcome', 'questions'] },
  { id: 'how-identra-works', category: 'overview', prevPageId: 'introduction', nextPageId: 'security', sections: ['core-concepts', 'lifecycle'] },
  { id: 'security', category: 'overview', prevPageId: 'how-identra-works', nextPageId: 'environments', sections: ['commitments'] },
  { id: 'environments', category: 'overview', prevPageId: 'security', nextPageId: 'choose-integration', sections: ['sandbox-prod'] },
  { id: 'choose-integration', category: 'sending', prevPageId: 'environments', nextPageId: 'inquiries', sections: ['integration-options'] },
  { id: 'inquiries', category: 'sending', prevPageId: 'choose-integration', nextPageId: 'transactions', sections: ['inquiries-intro'] },
  { id: 'transactions', category: 'sending', prevPageId: 'inquiries', nextPageId: 'relay', sections: ['transactions-intro'] },
  { id: 'relay', category: 'sending', prevPageId: 'transactions', nextPageId: 'api-reference', sections: ['relay-intro'] },
  { id: 'api-reference', category: 'retrieving', prevPageId: 'relay', nextPageId: 'changelog', sections: ['api-lifecycle-overview', 'identity', 'issuance', 'verification'] },
  { id: 'changelog', category: 'resources', prevPageId: 'api-reference', sections: ['changelog-intro'] }
];

export const DOCS_PAGE_TRANSLATIONS: any = {
  en: {
    ui: {
      searchPlaceholder: "Search documentation... (Press '/' to search)",
      mobileSearchPlaceholder: 'Search...',
      searchResults: 'Search Results',
      found: 'found',
      noResults: 'No matching pages found for "{query}"',
      helpCenter: 'Help Center',
      openApi: 'OpenAPI Spec',
      status: 'Status',
      serviceOperational: 'Service operational',
      toggleTheme: 'Toggle theme',
      documentationNavigation: 'Documentation Navigation',
      backToMain: 'Back to main site',
      copied: 'Copied',
      copyPage: 'Copy page',
      copyFailed: 'Copy failed',
      helpfulTitle: 'Was this page helpful?',
      helpfulDesc: 'Let us know what you think to help us improve.',
      thanks: 'Thank you for your feedback!',
      yes: 'Yes',
      no: 'No',
      previousSection: 'Previous section',
      nextSection: 'Next section',
      onThisPage: 'On this page',
      documentSections: 'Document sections',
      sectionTopics: 'In this section',
      topicLabels: {
        introduction: 'Introduction',
        details: 'Details',
        keyConcepts: 'Key concepts',
        importantNote: 'Important note',
        guidance: 'Guidance',
        reference: 'Reference',
        codeExample: 'Code example',
        releaseHistory: 'Release history'
      },
      identra: 'identra',
      tabs: {
        overview: 'Overview',
        inquiries: 'Inquiries',
        transactions: 'Transactions',
        relay: 'Relay',
        api: 'API Reference',
        changelog: 'Changelog'
      }
    },
    categories: {
      overview: 'Overview',
      sending: 'Sending data to Identra',
      retrieving: 'Retrieving data from Identra',
      resources: 'Resources'
    },
    pages: [
      {
        id: 'introduction',
        title: 'Introduction',
        category: 'overview',
        nextPageId: 'how-identra-works',
        sections: [
          {
            id: 'welcome',
            title: 'Welcome to Identra!',
            blocks: [
              { type: 'p', text: 'Here you will find comprehensive information for integrating with Identra and our API endpoints. We have made this documentation practical, friendly, and full of examples.' },
              { type: 'p', text: 'If you plan to use the API in Production, review the API Reference and Privacy Policy before handling live identity data.' },
              { type: 'p', text: 'The most complete integration path is an Embedded Flow for web or one of our Mobile SDKs. The fastest no-code option is a Hosted Flow.' }
            ]
          },
          {
            id: 'questions',
            title: 'Questions?',
            blocks: [
              { type: 'p', text: 'We are happy to help with code or product questions. Search the docs, visit the Help Center, connect with sales, or meet peers in the Identra community.' }
            ]
          }
        ]
      },
      {
        id: 'how-identra-works',
        title: 'How Identra Works',
        category: 'overview',
        prevPageId: 'introduction',
        nextPageId: 'security',
        sections: [
          {
            id: 'core-concepts',
            title: 'Core Concepts',
            blocks: [
              { type: 'p', text: 'Identra is an identity infrastructure platform for building custom verification experiences. A successful integration starts with understanding how the core objects connect.' },
              { type: 'cards', cards: [
                { title: 'Inquiries', text: 'An Inquiry is one instance of a user completing identity verification. It captures photos, documents, inputs, and verification checks.' },
                { title: 'Workflows', text: 'Workflows automate logic based on Inquiry decisions, route high-risk cases, and sync records to your systems.' }
              ] }
            ]
          },
          {
            id: 'lifecycle',
            title: 'The Verification Lifecycle',
            blocks: [
              { type: 'p', text: 'Every verification moves through a structured lifecycle: created, underway, submitted, processing, and then approved, declined, or sent to manual review.' },
              { type: 'callout', text: '[Inquiry Created] -> [Underway] -> [Submitted] -> [Processing Verifications] -> [Approved/Declined]' }
            ]
          }
        ]
      },
      {
        id: 'security',
        title: 'Security & Compliance',
        category: 'overview',
        prevPageId: 'how-identra-works',
        nextPageId: 'environments',
        sections: [
          {
            id: 'commitments',
            title: 'World-Class Security',
            blocks: [
              { type: 'p', text: 'Identra is trusted by leading institutions to handle sensitive identity data safely. The platform is designed around strong security, privacy, and compliance controls.' },
              { type: 'list', items: [
                { title: 'Encryption', text: 'Data is encrypted with AES-256 at rest and TLS 1.3 in transit.' },
                { title: 'Compliance Standards', text: 'SOC 2 Type II certified, GDPR-ready, and CCPA-ready controls.' },
                { title: 'Redundant Backup', text: 'Multi-region cloud infrastructure with continuous replication.' }
              ] }
            ]
          }
        ]
      },
      {
        id: 'environments',
        title: 'Environments',
        category: 'overview',
        prevPageId: 'security',
        nextPageId: 'choose-integration',
        sections: [
          {
            id: 'sandbox-prod',
            title: 'Sandbox vs Production',
            blocks: [
              { type: 'p', text: 'Sandbox lets you design, build, and test flows before moving to Production.' },
              { type: 'table', headers: ['Feature', 'Sandbox', 'Production'], rows: [
                ['Real verifications', 'No (mock checks)', 'Yes'],
                ['API endpoint', '/v1/sandbox/*', '/v1/*'],
                ['Pricing / Billing', 'Free', 'Usage-based']
              ] }
            ]
          }
        ]
      },
      {
        id: 'choose-integration',
        title: 'Choose an Integration Method',
        category: 'sending',
        prevPageId: 'environments',
        nextPageId: 'inquiries',
        sections: [
          {
            id: 'integration-options',
            title: 'Integration Options',
            blocks: [
              { type: 'p', text: 'Identra offers integration paths from fully custom SDK experiences to fast hosted links with no development required.' },
              { type: 'cards', cards: [
                { title: 'Embedded Flow', text: 'Render Identra inline in your app or website with custom branding and reduced dropoff.' },
                { title: 'Hosted Flow', text: 'Send users to a secure Identra-hosted URL by email, SMS, or QR code.' }
              ] },
              { type: 'subheading', text: 'Example: Embedding with React' },
              { type: 'p', text: 'Render Identra securely in your interface and handle completion events in your application.' },
              { type: 'code', language: 'tsx', fileName: 'IdentityVerify.tsx', code: embeddingCode }
            ]
          }
        ]
      },
      {
        id: 'inquiries',
        title: 'Inquiries',
        category: 'sending',
        prevPageId: 'choose-integration',
        nextPageId: 'transactions',
        sections: [
          {
            id: 'inquiries-intro',
            title: 'Overview of Inquiries',
            blocks: [
              { type: 'p', text: 'An Inquiry is the focal point of the Identra SDK. Your backend creates an Inquiry via the REST API and passes the resulting token to the client-side flow.' },
              { type: 'subheading', text: 'Creating an Inquiry via REST API' },
              { type: 'p', text: 'Create the session on your secure backend so custom rules and reference user IDs remain protected.' },
              { type: 'code', language: 'javascript', fileName: 'create_inquiry.js', code: inquiryCode }
            ]
          }
        ]
      },
      {
        id: 'transactions',
        title: 'Transactions',
        category: 'sending',
        prevPageId: 'inquiries',
        nextPageId: 'relay',
        sections: [
          { id: 'transactions-intro', title: 'Monitoring Transactions', blocks: [
            { type: 'p', text: 'Track money flows, account transfers, login sessions, and payout events. Run real-time checks to protect users from account takeover and checkout fraud.' }
          ] }
        ]
      },
      {
        id: 'relay',
        title: 'Relay',
        category: 'sending',
        prevPageId: 'transactions',
        nextPageId: 'api-reference',
        sections: [
          { id: 'relay-intro', title: 'Secure Routing with Relay', blocks: [
            { type: 'p', text: 'Relay routes verified PII and checks securely to third-party servers, partner banks, or downstream APIs without requiring you to hold the data.' }
          ] }
        ]
      },
      {
        id: 'api-reference',
        title: 'API Reference',
        category: 'retrieving',
        prevPageId: 'relay',
        nextPageId: 'changelog',
        sections: [
          { id: 'api-lifecycle-overview', title: 'Lifecycle Overview', blocks: [
            { type: 'p', text: 'Follow the full SDK lifecycle from key creation and DID Document publication through credential issuance, holder storage, presentation, and verifier receipts.' }
          ] },
          { id: 'identity', title: 'Identity and Key Foundation', blocks: [
            { type: 'p', text: 'Create secure keys, publish DID Documents, and prepare issuer, holder, and verifier identities before any credential exchange begins.' }
          ] },
          { id: 'issuance', title: 'Credential Issuance and Storage', blocks: [
            { type: 'p', text: 'Open DIDComm channels, sign verifiable credentials, deliver them to the holder, and store them in the mobile wallet.' }
          ] },
          { id: 'verification', title: 'Presentation and Verification', blocks: [
            { type: 'p', text: 'Request a presentation, let the holder approve and submit a verifiable presentation, verify it, and return the result.' }
          ] }
        ]
      },
      {
        id: 'changelog',
        title: 'Changelog',
        category: 'resources',
        prevPageId: 'api-reference',
        sections: [
          { id: 'changelog-intro', title: 'Latest Updates', blocks: [
            { type: 'p', text: 'Stay up to date with additions, improvements, and fixes to the Identra API and SDKs.' },
            { type: 'changelog', items: [
              { version: 'v2025-12-08', title: 'Enhanced Document Check Engine', text: "Upgraded verification checks to use machine learning models for modern driver's licenses and national ID cards." },
              { version: 'v2025-06-15', title: 'Relay Routing Improvements', text: 'Added routing for partial inquiry objects with customizable PII filters.' },
              { version: 'v2024-11-01', title: 'Inline Sandbox Customization', text: 'Introduced template-level overrides for simulating failed and review verdicts from the dashboard.' }
            ] }
          ] }
        ]
      }
    ]
  },
  es: {
    ui: {
      searchPlaceholder: "Buscar documentación... (Pulsa '/' para buscar)",
      mobileSearchPlaceholder: 'Buscar...',
      searchResults: 'Resultados de búsqueda',
      found: 'encontrados',
      noResults: 'No se encontraron páginas para "{query}"',
      helpCenter: 'Centro de ayuda',
      openApi: 'Especificación OpenAPI',
      status: 'Estado',
      serviceOperational: 'Servicio operativo',
      toggleTheme: 'Cambiar tema',
      documentationNavigation: 'Navegación de documentación',
      backToMain: 'Volver al sitio principal',
      copied: 'Copiado',
      copyPage: 'Copiar página',
      copyFailed: 'No se pudo copiar',
      helpfulTitle: '¿Te resultó útil esta página?',
      helpfulDesc: 'Cuéntanos qué opinas para ayudarnos a mejorar.',
      thanks: 'Gracias por tus comentarios.',
      yes: 'Sí',
      no: 'No',
      previousSection: 'Sección anterior',
      nextSection: 'Sección siguiente',
      onThisPage: 'En esta página',
      documentSections: 'Secciones del documento',
      sectionTopics: 'En esta sección',
      topicLabels: {
        introduction: 'Introducción',
        details: 'Detalles',
        keyConcepts: 'Conceptos clave',
        importantNote: 'Nota importante',
        guidance: 'Orientación',
        reference: 'Referencia',
        codeExample: 'Ejemplo de código',
        releaseHistory: 'Historial de versiones'
      },
      identra: 'identra',
      tabs: { overview: 'Resumen', inquiries: 'Solicitudes', transactions: 'Transacciones', relay: 'Retransmisión', api: 'Referencia API', changelog: 'Historial de cambios' }
    },
    categories: { overview: 'Resumen', sending: 'Enviar datos a Identra', retrieving: 'Recuperar datos de Identra', resources: 'Recursos' },
    pages: []
  },
  ja: {
    ui: {
      searchPlaceholder: "ドキュメントを検索...（'/'で検索）",
      mobileSearchPlaceholder: '検索...',
      searchResults: '検索結果',
      found: '件',
      noResults: '「{query}」に一致するページはありません',
      helpCenter: 'ヘルプセンター',
      openApi: 'OpenAPI仕様',
      status: 'ステータス',
      serviceOperational: 'サービス稼働中',
      toggleTheme: 'テーマを切り替え',
      documentationNavigation: 'ドキュメントナビゲーション',
      backToMain: 'メインサイトに戻る',
      copied: 'コピー済み',
      copyPage: 'ページをコピー',
      copyFailed: 'コピーできませんでした',
      helpfulTitle: 'このページは役に立ちましたか？',
      helpfulDesc: '改善のため、ご意見をお聞かせください。',
      thanks: 'フィードバックありがとうございます。',
      yes: 'はい',
      no: 'いいえ',
      previousSection: '前のセクション',
      nextSection: '次のセクション',
      onThisPage: 'このページ',
      documentSections: 'ドキュメントの構成',
      sectionTopics: 'このセクション',
      topicLabels: {
        introduction: 'はじめに',
        details: '詳細',
        keyConcepts: '主要概念',
        importantNote: '重要な注意',
        guidance: 'ガイド',
        reference: 'リファレンス',
        codeExample: 'コード例',
        releaseHistory: 'リリース履歴'
      },
      identra: 'identra',
      tabs: { overview: '概要', inquiries: '照会', transactions: '取引', relay: '中継', api: 'APIリファレンス', changelog: '変更履歴' }
    },
    categories: { overview: '概要', sending: 'Identraへデータ送信', retrieving: 'Identraからデータ取得', resources: 'リソース' },
    pages: []
  },
  de: {
    ui: {
      searchPlaceholder: "Dokumentation suchen... ('/' drücken)",
      mobileSearchPlaceholder: 'Suchen...',
      searchResults: 'Suchergebnisse',
      found: 'gefunden',
      noResults: 'Keine passenden Seiten für "{query}" gefunden',
      helpCenter: 'Hilfecenter',
      openApi: 'OpenAPI-Spezifikation',
      status: 'Status',
      serviceOperational: 'Dienst betriebsbereit',
      toggleTheme: 'Darstellung wechseln',
      documentationNavigation: 'Dokumentationsnavigation',
      backToMain: 'Zur Hauptseite',
      copied: 'Kopiert',
      copyPage: 'Seite kopieren',
      copyFailed: 'Kopieren fehlgeschlagen',
      helpfulTitle: 'War diese Seite hilfreich?',
      helpfulDesc: 'Teilen Sie uns Ihre Meinung mit, damit wir uns verbessern können.',
      thanks: 'Danke für Ihr Feedback.',
      yes: 'Ja',
      no: 'Nein',
      previousSection: 'Vorheriger Abschnitt',
      nextSection: 'Nächster Abschnitt',
      onThisPage: 'Auf dieser Seite',
      documentSections: 'Dokumentabschnitte',
      sectionTopics: 'In diesem Abschnitt',
      topicLabels: {
        introduction: 'Einführung',
        details: 'Details',
        keyConcepts: 'Kernkonzepte',
        importantNote: 'Wichtiger Hinweis',
        guidance: 'Anleitung',
        reference: 'Referenz',
        codeExample: 'Codebeispiel',
        releaseHistory: 'Versionsverlauf'
      },
      identra: 'identra',
      tabs: { overview: 'Übersicht', inquiries: 'Prüfvorgänge', transactions: 'Transaktionen', relay: 'Weiterleitung', api: 'API-Referenz', changelog: 'Änderungsprotokoll' }
    },
    categories: { overview: 'Übersicht', sending: 'Daten an Identra senden', retrieving: 'Daten von Identra abrufen', resources: 'Ressourcen' },
    pages: []
  },
  vi: {
    ui: {
      searchPlaceholder: "Tìm kiếm tài liệu... (Nhấn '/' để tìm)",
      mobileSearchPlaceholder: 'Tìm kiếm...',
      searchResults: 'Kết quả tìm kiếm',
      found: 'kết quả',
      noResults: 'Không tìm thấy trang phù hợp cho "{query}"',
      helpCenter: 'Trung tâm trợ giúp',
      openApi: 'Đặc tả OpenAPI',
      status: 'Trạng thái',
      serviceOperational: 'Dịch vụ đang hoạt động',
      toggleTheme: 'Chuyển giao diện',
      documentationNavigation: 'Điều hướng tài liệu',
      backToMain: 'Quay lại trang chính',
      copied: 'Đã sao chép',
      copyPage: 'Sao chép trang',
      copyFailed: 'Không thể sao chép',
      helpfulTitle: 'Trang này có hữu ích không?',
      helpfulDesc: 'Cho chúng tôi biết ý kiến của bạn để cải thiện tài liệu.',
      thanks: 'Cảm ơn phản hồi của bạn.',
      yes: 'Có',
      no: 'Không',
      previousSection: 'Phần trước',
      nextSection: 'Phần tiếp theo',
      onThisPage: 'Trong trang này',
      documentSections: 'Các phần chính',
      sectionTopics: 'Mục trong phần này',
      topicLabels: {
        introduction: 'Giới thiệu',
        details: 'Chi tiết',
        keyConcepts: 'Khái niệm chính',
        importantNote: 'Lưu ý quan trọng',
        guidance: 'Hướng dẫn',
        reference: 'Bảng tham chiếu',
        codeExample: 'Ví dụ mã',
        releaseHistory: 'Lịch sử phát hành'
      },
      identra: 'identra',
      tabs: { overview: 'Tổng quan', inquiries: 'Hồ sơ xác minh', transactions: 'Giao dịch', relay: 'Chuyển tiếp', api: 'Tham chiếu API', changelog: 'Nhật ký thay đổi' }
    },
    categories: { overview: 'Tổng quan', sending: 'Gửi dữ liệu đến Identra', retrieving: 'Lấy dữ liệu từ Identra', resources: 'Tài nguyên' },
    pages: []
  }
};

const translatePages = (language: 'es' | 'ja' | 'de' | 'vi', titles: Record<string, any>) => {
  DOCS_PAGE_TRANSLATIONS[language].pages = DOCS_PAGE_STRUCTURE.map((pageMeta: any) => {
    const pageCopy = titles[pageMeta.id];
    if (!pageCopy?.title || !pageCopy.sections) {
      throw new Error(`Missing DocsPage translation for ${language}.${pageMeta.id}`);
    }

    return {
      id: pageMeta.id,
      title: pageCopy.title,
      category: pageMeta.category,
      ...(pageMeta.prevPageId ? { prevPageId: pageMeta.prevPageId } : {}),
      ...(pageMeta.nextPageId ? { nextPageId: pageMeta.nextPageId } : {}),
      sections: pageMeta.sections.map((sectionId: string) => {
        const sectionCopy = pageCopy.sections?.[sectionId];
        if (!sectionCopy?.title || !sectionCopy.blocks) {
          throw new Error(`Missing DocsPage translation for ${language}.${pageMeta.id}.${sectionId}`);
        }

        return {
          id: sectionId,
          title: sectionCopy.title,
          blocks: sectionCopy.blocks
        };
      })
    };
  });
};

translatePages('es', {
  introduction: { title: 'Introducción', sections: { welcome: { title: '¡Bienvenido a Identra!', blocks: [
    { type: 'p', text: 'Aquí encontrarás información completa para integrarte con Identra y sus endpoints API, con ejemplos prácticos y fáciles de seguir.' },
    { type: 'p', text: 'Si usarás la API en Producción, revisa la Referencia API y la Política de privacidad antes de manejar datos de identidad reales.' },
    { type: 'p', text: 'La integración más completa es Embedded Flow para web o nuestros Mobile SDKs. La opción sin código más rápida es Hosted Flow.' }
  ] }, questions: { title: '¿Preguntas?', blocks: [{ type: 'p', text: 'Podemos ayudarte con dudas de código o producto. Busca en la documentación, visita el Centro de ayuda, contacta ventas o participa en la comunidad de Identra.' }] } } },
  'how-identra-works': { title: 'Cómo funciona Identra', sections: { 'core-concepts': { title: 'Conceptos clave', blocks: [
    { type: 'p', text: 'Identra es una plataforma de infraestructura de identidad para crear experiencias de verificación personalizadas.' },
    { type: 'cards', cards: [{ title: 'Inquiries', text: 'Un Inquiry representa una instancia de verificación de identidad de un usuario.' }, { title: 'Workflows', text: 'Workflows automatiza decisiones, enruta casos de riesgo y sincroniza registros.' }] }
  ] }, lifecycle: { title: 'Ciclo de vida de verificación', blocks: [{ type: 'p', text: 'Cada verificación avanza por un ciclo estructurado: creada, en curso, enviada, procesando y aprobada, rechazada o enviada a revisión manual.' }, { type: 'callout', text: '[Inquiry creado] -> [En curso] -> [Enviado] -> [Procesando verificaciones] -> [Aprobado/Rechazado]' }] } } },
  security: { title: 'Seguridad y cumplimiento', sections: { commitments: { title: 'Seguridad de primer nivel', blocks: [{ type: 'p', text: 'Identra está diseñada para proteger datos de identidad sensibles con controles sólidos de seguridad, privacidad y cumplimiento.' }, { type: 'list', items: [{ title: 'Cifrado', text: 'AES-256 en reposo y TLS 1.3 en tránsito.' }, { title: 'Estándares', text: 'Controles SOC 2 Type II, GDPR y CCPA.' }, { title: 'Respaldo redundante', text: 'Infraestructura multi-región con replicación continua.' }] }] } } },
  environments: { title: 'Entornos', sections: { 'sandbox-prod': { title: 'Sandbox vs Producción', blocks: [{ type: 'p', text: 'Sandbox permite diseñar, construir y probar flujos antes de pasar a Producción.' }, { type: 'table', headers: ['Función', 'Sandbox', 'Producción'], rows: [['Verificaciones reales', 'No (pruebas simuladas)', 'Sí'], ['Endpoint API', '/v1/sandbox/*', '/v1/*'], ['Precio / facturación', 'Gratis', 'Por uso']] }] } } },
  'choose-integration': { title: 'Elegir un método de integración', sections: { 'integration-options': { title: 'Opciones de integración', blocks: [{ type: 'p', text: 'Identra ofrece rutas desde SDKs personalizados hasta enlaces alojados sin desarrollo.' }, { type: 'cards', cards: [{ title: 'Embedded Flow', text: 'Renderiza Identra dentro de tu aplicación con marca personalizada.' }, { title: 'Hosted Flow', text: 'Envía usuarios a una URL segura alojada por Identra.' }] }, { type: 'subheading', text: 'Ejemplo: integración con React' }, { type: 'p', text: 'Renderiza Identra de forma segura y gestiona eventos de finalización.' }, { type: 'code', language: 'tsx', fileName: 'IdentityVerify.tsx', code: embeddingCode }] } } },
  inquiries: { title: 'Solicitudes de verificación', sections: { 'inquiries-intro': { title: 'Resumen de solicitudes', blocks: [{ type: 'p', text: 'Un Inquiry es el punto central del SDK de Identra. Tu backend lo crea mediante REST API y entrega el token al flujo cliente.' }, { type: 'subheading', text: 'Crear un Inquiry con REST API' }, { type: 'p', text: 'Crea la sesión en tu backend seguro para proteger reglas y referencias internas.' }, { type: 'code', language: 'javascript', fileName: 'create_inquiry.js', code: inquiryCode }] } } },
  transactions: { title: 'Transacciones', sections: { 'transactions-intro': { title: 'Monitorear transacciones', blocks: [{ type: 'p', text: 'Rastrea movimientos de dinero, transferencias, sesiones y pagos para prevenir toma de cuentas y fraude.' }] } } },
  relay: { title: 'Retransmisión', sections: { 'relay-intro': { title: 'Enrutamiento seguro con Relay', blocks: [{ type: 'p', text: 'Relay enruta PII verificada y comprobaciones a terceros o APIs posteriores sin que tengas que conservar esos datos.' }] } } },
  'api-reference': { title: 'Referencia API', sections: {
    'api-lifecycle-overview': { title: 'Resumen del ciclo de vida', blocks: [{ type: 'p', text: 'Sigue todo el ciclo SDK: claves, DID Documents, emisión de credenciales, almacenamiento del titular, presentación y recibos del verificador.' }] },
    identity: { title: 'Base de identidad y claves', blocks: [{ type: 'p', text: 'Crea claves seguras, publica DID Documents y prepara las identidades de emisor, titular y verificador antes del intercambio.' }] },
    issuance: { title: 'Emisión y almacenamiento de credenciales', blocks: [{ type: 'p', text: 'Abre canales DIDComm, firma credenciales verificables, entrégalas al titular y guárdalas en la wallet móvil.' }] },
    verification: { title: 'Presentación y verificación', blocks: [{ type: 'p', text: 'Solicita una presentación, permite que el titular la apruebe y envíe, verifica la prueba y devuelve el resultado.' }] }
  } },
  changelog: { title: 'Historial de cambios', sections: { 'changelog-intro': { title: 'Últimas actualizaciones', blocks: [{ type: 'p', text: 'Mantente al día con mejoras y correcciones de la API y SDKs de Identra.' }, { type: 'changelog', items: [{ version: 'v2025-12-08', title: 'Motor mejorado de comprobación documental', text: 'Modelos de aprendizaje automático para licencias modernas e ID nacionales.' }, { version: 'v2025-06-15', title: 'Mejoras de enrutamiento Relay', text: 'Enrutamiento de objetos parciales con filtros PII personalizables.' }, { version: 'v2024-11-01', title: 'Personalización inline de Sandbox', text: 'Overrides de plantilla para simular rechazos y revisiones.' }] }] } } }
});

translatePages('ja', {
  introduction: { title: 'はじめに', sections: { welcome: { title: 'Identraへようこそ', blocks: [{ type: 'p', text: 'IdentraとAPI endpointsを統合するための実用的な情報と例をまとめています。' }, { type: 'p', text: 'ProductionでAPIを使う前に、APIリファレンスとプライバシーポリシーを確認してください。' }, { type: 'p', text: '最も包括的な方法はWeb向けEmbedded FlowまたはMobile SDKsです。最速のノーコード方法はHosted Flowです。' }] }, questions: { title: '質問がありますか？', blocks: [{ type: 'p', text: 'コードや製品の質問は、ドキュメント検索、ヘルプセンター、営業窓口、Identraコミュニティで確認できます。' }] } } },
  'how-identra-works': { title: 'Identraの仕組み', sections: { 'core-concepts': { title: '主要概念', blocks: [{ type: 'p', text: 'Identraは、カスタム本人確認体験を構築するためのIDインフラです。' }, { type: 'cards', cards: [{ title: 'Inquiries', text: 'Inquiryは、ユーザーが本人確認を完了する1回分のインスタンスです。' }, { title: 'Workflows', text: 'Workflowsは判定に基づく処理、リスクケースのルーティング、記録同期を自動化します。' }] }] }, lifecycle: { title: '検証ライフサイクル', blocks: [{ type: 'p', text: '各検証は、作成、進行中、送信、処理、承認または却下という構造化された流れで進みます。' }, { type: 'callout', text: '[Inquiry作成] -> [進行中] -> [送信済み] -> [検証処理] -> [承認/却下]' }] } } },
  security: { title: 'セキュリティとコンプライアンス', sections: { commitments: { title: '高度なセキュリティ', blocks: [{ type: 'p', text: 'Identraは、機微な本人確認データを安全に扱うため、セキュリティ、プライバシー、コンプライアンスを重視して設計されています。' }, { type: 'list', items: [{ title: '暗号化', text: '保存時AES-256、転送時TLS 1.3。' }, { title: '基準', text: 'SOC 2 Type II、GDPR、CCPA対応の管理策。' }, { title: '冗長バックアップ', text: 'マルチリージョン基盤と継続的なレプリケーション。' }] }] } } },
  environments: { title: '環境', sections: { 'sandbox-prod': { title: 'SandboxとProduction', blocks: [{ type: 'p', text: 'Sandboxでは、Productionへ移行する前にフローを設計、構築、テストできます。' }, { type: 'table', headers: ['機能', 'Sandbox', 'Production'], rows: [['実検証', 'いいえ（模擬チェック）', 'はい'], ['API endpoint', '/v1/sandbox/*', '/v1/*'], ['料金 / 請求', '無料', '使用量ベース']] }] } } },
  'choose-integration': { title: '統合方法の選択', sections: { 'integration-options': { title: '統合オプション', blocks: [{ type: 'p', text: 'Identraは、カスタムSDKから開発不要のホスト型リンクまで複数の統合方法を提供します。' }, { type: 'cards', cards: [{ title: 'Embedded Flow', text: 'Identraをアプリ内に表示し、ブランドに合わせた体験を提供します。' }, { title: 'Hosted Flow', text: '安全なIdentraホストURLへユーザーを送ります。' }] }, { type: 'subheading', text: '例: Reactで埋め込み' }, { type: 'p', text: 'Identraを安全に表示し、完了イベントを処理します。' }, { type: 'code', language: 'tsx', fileName: 'IdentityVerify.tsx', code: embeddingCode }] } } },
  inquiries: { title: '照会', sections: { 'inquiries-intro': { title: '照会の概要', blocks: [{ type: 'p', text: 'InquiryはIdentra SDKの中心です。バックエンドがREST APIで作成し、生成されたトークンをクライアントへ渡します。' }, { type: 'subheading', text: 'REST APIでInquiryを作成' }, { type: 'p', text: 'セキュアなバックエンドでセッションを作成し、ルールや参照IDを保護します。' }, { type: 'code', language: 'javascript', fileName: 'create_inquiry.js', code: inquiryCode }] } } },
  transactions: { title: '取引', sections: { 'transactions-intro': { title: '取引の監視', blocks: [{ type: 'p', text: '資金移動、口座移管、ログイン、支払いイベントを追跡し、不正を防ぎます。' }] } } },
  relay: { title: '中継', sections: { 'relay-intro': { title: '安全な中継経路', blocks: [{ type: 'p', text: 'Relayは、検証済みPIIとチェック結果を、データを保持せずに第三者や下流APIへ安全にルーティングします。' }] } } },
  'api-reference': { title: 'APIリファレンス', sections: {
    'api-lifecycle-overview': { title: 'ライフサイクル概要', blocks: [{ type: 'p', text: '鍵作成、DID Document公開、クレデンシャル発行、Holder保存、提示、Verifierの受領結果まで、SDK全体の流れを追います。' }] },
    identity: { title: 'IDと鍵の基盤', blocks: [{ type: 'p', text: 'クレデンシャル交換の前に、安全な鍵を作成し、DID Documentsを公開し、Issuer、Holder、VerifierのIDを準備します。' }] },
    issuance: { title: 'クレデンシャルの発行と保存', blocks: [{ type: 'p', text: 'DIDCommチャネルを開き、検証可能なクレデンシャルに署名し、Holderへ届けてモバイルウォレットへ保存します。' }] },
    verification: { title: '提示と検証', blocks: [{ type: 'p', text: '提示を要求し、Holderが承認して送信したVerifiable Presentationを検証し、結果を返します。' }] }
  } },
  changelog: { title: '変更履歴', sections: { 'changelog-intro': { title: '最新更新', blocks: [{ type: 'p', text: 'Identra APIとSDKsの追加、改善、修正を確認できます。' }, { type: 'changelog', items: [{ version: 'v2025-12-08', title: '書類チェックエンジン強化', text: '現代的な免許証と国民ID向けに機械学習モデルを強化しました。' }, { version: 'v2025-06-15', title: 'Relayルーティング改善', text: 'カスタムPIIフィルター付き部分Inquiryルーティングを追加しました。' }, { version: 'v2024-11-01', title: 'Inline Sandboxカスタマイズ', text: '失敗やレビュー判定をシミュレーションするテンプレート上書きを追加しました。' }] }] } } }
});

translatePages('de', {
  introduction: { title: 'Einführung', sections: { welcome: { title: 'Willkommen bei Identra!', blocks: [{ type: 'p', text: 'Hier finden Sie praktische Informationen zur Integration mit Identra und unseren API endpoints.' }, { type: 'p', text: 'Wenn Sie die API in Production nutzen, lesen Sie API-Referenz und Datenschutzrichtlinie, bevor Sie echte Identitätsdaten verarbeiten.' }, { type: 'p', text: 'Der umfassendste Weg ist Embedded Flow für Web oder Mobile SDKs. Die schnellste No-Code-Option ist Hosted Flow.' }] }, questions: { title: 'Fragen?', blocks: [{ type: 'p', text: 'Wir helfen gern bei Code- oder Produktfragen. Durchsuchen Sie die Dokumentation, besuchen Sie das Hilfecenter oder kontaktieren Sie unser Team.' }] } } },
  'how-identra-works': { title: 'So funktioniert Identra', sections: { 'core-concepts': { title: 'Kernkonzepte', blocks: [{ type: 'p', text: 'Identra ist eine Identitätsinfrastruktur zum Aufbau eigener Verifizierungserlebnisse.' }, { type: 'cards', cards: [{ title: 'Inquiries', text: 'Ein Inquiry ist eine einzelne Identitätsverifizierung eines Nutzers.' }, { title: 'Workflows', text: 'Workflows automatisieren Entscheidungen, Routing und Datensynchronisierung.' }] }] }, lifecycle: { title: 'Verifizierungslebenszyklus', blocks: [{ type: 'p', text: 'Jede Verifizierung durchläuft Erstellung, Bearbeitung, Übermittlung, Verarbeitung und Entscheidung.' }, { type: 'callout', text: '[Inquiry erstellt] -> [In Bearbeitung] -> [Übermittelt] -> [Verarbeitung] -> [Genehmigt/Abgelehnt]' }] } } },
  security: { title: 'Sicherheit und Compliance', sections: { commitments: { title: 'Erstklassige Sicherheit', blocks: [{ type: 'p', text: 'Identra schützt sensible Identitätsdaten mit starken Sicherheits-, Datenschutz- und Compliance-Kontrollen.' }, { type: 'list', items: [{ title: 'Verschlüsselung', text: 'AES-256 im Ruhezustand und TLS 1.3 bei Übertragung.' }, { title: 'Standards', text: 'SOC 2 Type II, GDPR- und CCPA-Kontrollen.' }, { title: 'Redundanz', text: 'Multi-Region-Infrastruktur mit fortlaufender Replikation.' }] }] } } },
  environments: { title: 'Umgebungen', sections: { 'sandbox-prod': { title: 'Sandbox vs Production', blocks: [{ type: 'p', text: 'Sandbox ermöglicht Design, Aufbau und Tests vor dem Wechsel zu Production.' }, { type: 'table', headers: ['Funktion', 'Sandbox', 'Production'], rows: [['Echte Verifizierungen', 'Nein (Mock-Prüfungen)', 'Ja'], ['API endpoint', '/v1/sandbox/*', '/v1/*'], ['Preise / Abrechnung', 'Kostenlos', 'Nutzungsbasiert']] }] } } },
  'choose-integration': { title: 'Integrationsmethode wählen', sections: { 'integration-options': { title: 'Integrationsoptionen', blocks: [{ type: 'p', text: 'Identra bietet Wege von eigenen SDK-Integrationen bis zu gehosteten Links ohne Entwicklung.' }, { type: 'cards', cards: [{ title: 'Embedded Flow', text: 'Zeigen Sie Identra direkt in Ihrer App mit eigenem Branding an.' }, { title: 'Hosted Flow', text: 'Leiten Sie Nutzer zu einer sicheren Identra-gehosteten URL weiter.' }] }, { type: 'subheading', text: 'Beispiel: Einbettung mit React' }, { type: 'p', text: 'Rendern Sie Identra sicher und verarbeiten Sie Abschlussereignisse.' }, { type: 'code', language: 'tsx', fileName: 'IdentityVerify.tsx', code: embeddingCode }] } } },
  inquiries: { title: 'Prüfvorgänge', sections: { 'inquiries-intro': { title: 'Überblick über Prüfvorgänge', blocks: [{ type: 'p', text: 'Ein Inquiry ist der Mittelpunkt des Identra SDK. Ihr Backend erstellt ihn per REST API und gibt das Token an den Client weiter.' }, { type: 'subheading', text: 'Inquiry per REST API erstellen' }, { type: 'p', text: 'Erstellen Sie die Sitzung auf Ihrem sicheren Backend, um Regeln und Referenzen zu schützen.' }, { type: 'code', language: 'javascript', fileName: 'create_inquiry.js', code: inquiryCode }] } } },
  transactions: { title: 'Transaktionen', sections: { 'transactions-intro': { title: 'Transaktionen überwachen', blocks: [{ type: 'p', text: 'Verfolgen Sie Geldflüsse, Transfers, Sitzungen und Auszahlungen, um Betrug zu verhindern.' }] } } },
  relay: { title: 'Weiterleitung', sections: { 'relay-intro': { title: 'Sichere Weiterleitung', blocks: [{ type: 'p', text: 'Relay leitet verifizierte PII und Prüfergebnisse sicher an Dritte oder nachgelagerte APIs weiter, ohne dass Sie die Daten halten müssen.' }] } } },
  'api-reference': { title: 'API-Referenz', sections: {
    'api-lifecycle-overview': { title: 'Lebenszyklusüberblick', blocks: [{ type: 'p', text: 'Verfolgen Sie den vollständigen SDK-Ablauf von Schlüsseln und DID Documents bis zu Ausstellung, Speicherung, Präsentation, Prüfung und Ergebnisbeleg.' }] },
    identity: { title: 'Identitäts- und Schlüsselbasis', blocks: [{ type: 'p', text: 'Erstellen Sie sichere Schlüssel, veröffentlichen Sie DID Documents und bereiten Sie Aussteller-, Inhaber- und Prüferidentitäten vor.' }] },
    issuance: { title: 'Ausstellung und Speicherung von Nachweisen', blocks: [{ type: 'p', text: 'Öffnen Sie DIDComm-Kanäle, signieren Sie verifizierbare Nachweise, liefern Sie sie an den Inhaber und speichern Sie sie in der mobilen Wallet.' }] },
    verification: { title: 'Präsentation und Prüfung', blocks: [{ type: 'p', text: 'Fordern Sie eine Präsentation an, lassen Sie den Inhaber zustimmen und senden, prüfen Sie den Nachweis und geben Sie das Ergebnis zurück.' }] }
  } },
  changelog: { title: 'Änderungsprotokoll', sections: { 'changelog-intro': { title: 'Neueste Updates', blocks: [{ type: 'p', text: 'Bleiben Sie über Verbesserungen und Korrekturen von API und SDKs informiert.' }, { type: 'changelog', items: [{ version: 'v2025-12-08', title: 'Verbesserte Dokumentprüfmaschine', text: 'Machine-Learning-Modelle für moderne Führerscheine und nationale IDs.' }, { version: 'v2025-06-15', title: 'Relay-Routing-Verbesserungen', text: 'Routing partieller Inquiry-Objekte mit anpassbaren PII-Filtern.' }, { version: 'v2024-11-01', title: 'Inline-Sandbox-Anpassung', text: 'Template-Overrides zur Simulation von Ablehnung und Review.' }] }] } } }
});

translatePages('vi', {
  introduction: { title: 'Giới thiệu', sections: { welcome: { title: 'Chào mừng đến với Identra!', blocks: [{ type: 'p', text: 'Tại đây bạn sẽ tìm thấy thông tin thực tế để tích hợp với Identra và các API endpoint của chúng tôi.' }, { type: 'p', text: 'Nếu dùng API trong Production, hãy xem Tham chiếu API và Chính sách quyền riêng tư trước khi xử lý dữ liệu danh tính thật.' }, { type: 'p', text: 'Cách tích hợp đầy đủ nhất là Embedded Flow cho web hoặc Mobile SDKs. Cách không cần code nhanh nhất là Hosted Flow.' }] }, questions: { title: 'Bạn có câu hỏi?', blocks: [{ type: 'p', text: 'Chúng tôi luôn sẵn sàng hỗ trợ về code hoặc sản phẩm. Hãy tìm trong tài liệu, truy cập Trung tâm trợ giúp, liên hệ đội ngũ bán hàng hoặc tham gia cộng đồng Identra.' }] } } },
  'how-identra-works': { title: 'Cách Identra hoạt động', sections: { 'core-concepts': { title: 'Khái niệm cốt lõi', blocks: [{ type: 'p', text: 'Identra là nền tảng hạ tầng danh tính giúp xây dựng trải nghiệm xác minh tùy chỉnh.' }, { type: 'cards', cards: [{ title: 'Inquiries', text: 'Inquiry là một phiên người dùng thực hiện xác minh danh tính.' }, { title: 'Workflows', text: 'Workflows tự động hóa quyết định, định tuyến trường hợp rủi ro và đồng bộ dữ liệu.' }] }] }, lifecycle: { title: 'Vòng đời xác minh', blocks: [{ type: 'p', text: 'Mỗi xác minh đi qua vòng đời có cấu trúc: tạo, đang thực hiện, gửi, xử lý và được phê duyệt, từ chối hoặc chuyển đánh giá thủ công.' }, { type: 'callout', text: '[Inquiry được tạo] -> [Đang thực hiện] -> [Đã gửi] -> [Đang xử lý] -> [Phê duyệt/Từ chối]' }] } } },
  security: { title: 'Bảo mật và tuân thủ', sections: { commitments: { title: 'Bảo mật hàng đầu', blocks: [{ type: 'p', text: 'Identra được thiết kế để bảo vệ dữ liệu danh tính nhạy cảm bằng các kiểm soát bảo mật, quyền riêng tư và tuân thủ mạnh mẽ.' }, { type: 'list', items: [{ title: 'Mã hóa', text: 'AES-256 khi lưu trữ và TLS 1.3 khi truyền.' }, { title: 'Tiêu chuẩn', text: 'Kiểm soát SOC 2 Type II, GDPR và CCPA.' }, { title: 'Sao lưu dự phòng', text: 'Hạ tầng đa vùng với sao chép liên tục.' }] }] } } },
  environments: { title: 'Môi trường', sections: { 'sandbox-prod': { title: 'Sandbox và Production', blocks: [{ type: 'p', text: 'Sandbox cho phép thiết kế, xây dựng và kiểm thử luồng trước khi chuyển sang Production.' }, { type: 'table', headers: ['Tính năng', 'Sandbox', 'Production'], rows: [['Xác minh thật', 'Không (kiểm tra mô phỏng)', 'Có'], ['API endpoint', '/v1/sandbox/*', '/v1/*'], ['Giá / thanh toán', 'Miễn phí', 'Theo mức sử dụng']] }] } } },
  'choose-integration': { title: 'Chọn phương thức tích hợp', sections: { 'integration-options': { title: 'Tùy chọn tích hợp', blocks: [{ type: 'p', text: 'Identra cung cấp nhiều cách tích hợp, từ SDK tùy chỉnh đến liên kết được lưu trữ không cần phát triển.' }, { type: 'cards', cards: [{ title: 'Embedded Flow', text: 'Hiển thị Identra trực tiếp trong ứng dụng với thương hiệu tùy chỉnh.' }, { title: 'Hosted Flow', text: 'Chuyển người dùng đến URL an toàn do Identra lưu trữ.' }] }, { type: 'subheading', text: 'Ví dụ: nhúng với React' }, { type: 'p', text: 'Hiển thị Identra an toàn và xử lý sự kiện hoàn tất trong ứng dụng.' }, { type: 'code', language: 'tsx', fileName: 'IdentityVerify.tsx', code: embeddingCode }] } } },
  inquiries: { title: 'Hồ sơ xác minh', sections: { 'inquiries-intro': { title: 'Tổng quan về hồ sơ xác minh', blocks: [{ type: 'p', text: 'Inquiry là điểm trung tâm của Identra SDK. Backend tạo Inquiry qua REST API và chuyển token sang luồng phía client.' }, { type: 'subheading', text: 'Tạo Inquiry qua REST API' }, { type: 'p', text: 'Tạo phiên trên backend an toàn để bảo vệ quy tắc và mã tham chiếu nội bộ.' }, { type: 'code', language: 'javascript', fileName: 'create_inquiry.js', code: inquiryCode }] } } },
  transactions: { title: 'Giao dịch', sections: { 'transactions-intro': { title: 'Giám sát giao dịch', blocks: [{ type: 'p', text: 'Theo dõi dòng tiền, chuyển khoản, phiên đăng nhập và thanh toán để chống chiếm đoạt tài khoản và gian lận.' }] } } },
  relay: { title: 'Chuyển tiếp', sections: { 'relay-intro': { title: 'Chuyển tiếp dữ liệu an toàn', blocks: [{ type: 'p', text: 'Relay định tuyến PII đã xác minh và kết quả kiểm tra đến bên thứ ba hoặc API hạ nguồn mà không cần bạn lưu giữ dữ liệu.' }] } } },
  'api-reference': { title: 'Tham chiếu API', sections: {
    'api-lifecycle-overview': { title: 'Tổng quan vòng đời', blocks: [{ type: 'p', text: 'Theo dõi toàn bộ vòng đời SDK: tạo khóa, công bố DID Document, cấp phát thực chứng, lưu vào ví, trình bày bằng chứng và trả kết quả xác minh.' }] },
    identity: { title: 'Nền tảng định danh và khóa', blocks: [{ type: 'p', text: 'Tạo khóa an toàn, công bố DID Documents và chuẩn bị định danh cho bên phát hành, holder và bên xác minh trước khi trao đổi thực chứng.' }] },
    issuance: { title: 'Cấp phát và lưu thực chứng', blocks: [{ type: 'p', text: 'Mở kênh DIDComm, ký thực chứng (VC), chuyển cho bên nắm giữ và lưu vào ví trên thiết bị di động.' }] },
    verification: { title: 'Trình bày và xác minh', blocks: [{ type: 'p', text: 'Gửi yêu cầu trình bày, để holder phê duyệt và gửi verifiable presentation, xác minh bằng chứng rồi trả lại kết quả.' }] }
  } },
  changelog: { title: 'Nhật ký thay đổi', sections: { 'changelog-intro': { title: 'Cập nhật mới nhất', blocks: [{ type: 'p', text: 'Theo dõi các bổ sung, cải tiến và bản sửa lỗi cho Identra API và SDKs.' }, { type: 'changelog', items: [{ version: 'v2025-12-08', title: 'Nâng cấp engine kiểm tra giấy tờ', text: 'Dùng mô hình machine learning cho giấy phép lái xe và ID quốc gia hiện đại.' }, { version: 'v2025-06-15', title: 'Cải tiến định tuyến Relay', text: 'Thêm định tuyến đối tượng Inquiry một phần với bộ lọc PII tùy chỉnh.' }, { version: 'v2024-11-01', title: 'Tùy chỉnh Sandbox inline', text: 'Thêm override cấp template để mô phỏng kết quả từ chối và đánh giá.' }] }] } } }
});
