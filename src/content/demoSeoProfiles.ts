/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DEMO_SCENARIO_IDS,
  type DemoScenarioId,
  type Locale,
} from '../types/routes';

export type DemoSeoProfile = {
  readonly title: string;
  readonly headline: string;
  readonly description: string;
};

type LocalizedDemoSeoProfile = Record<Locale, DemoSeoProfile>;

export const DEMO_SEO_PROFILES = {
  'bank-account': {
    en: {
      title: 'Bank account opening and KYC demo',
      headline: 'See identity verification in a bank account opening journey',
      description: 'Try a guided bank onboarding demo that combines identity checks, liveness, sanctions screening, and a clear KYC decision.',
    },
    es: {
      title: 'Demo de apertura de cuenta bancaria y KYC',
      headline: 'Descubre la verificación de identidad al abrir una cuenta bancaria',
      description: 'Prueba un onboarding bancario guiado con verificación de identidad, prueba de vida, listas de sanciones y una decisión KYC clara.',
    },
    ja: {
      title: '銀行口座開設とKYCのデモ',
      headline: '銀行口座開設における本人確認を体験',
      description: '本人確認、ライブネス、制裁リスト照合、KYC判定を組み合わせた銀行オンボーディングの流れを体験できます。',
    },
    de: {
      title: 'Demo für Kontoeröffnung und KYC',
      headline: 'Identitätsprüfung bei einer digitalen Kontoeröffnung erleben',
      description: 'Testen Sie ein geführtes Bank-Onboarding mit Identitätsprüfung, Liveness, Sanktionslistenprüfung und klarer KYC-Entscheidung.',
    },
    vi: {
      title: 'Demo mở tài khoản ngân hàng và xác minh KYC',
      headline: 'Trải nghiệm xác minh danh tính khi mở tài khoản ngân hàng',
      description: 'Thử quy trình mở tài khoản có hướng dẫn, kết hợp kiểm tra danh tính, nhận diện sống, sàng lọc cấm vận và đưa ra kết quả KYC rõ ràng.',
    },
  },
  'apply-job': {
    en: {
      title: 'Candidate identity and credential verification demo',
      headline: 'Verify a candidate before a regulated hiring decision',
      description: 'Explore a hiring demo that checks candidate identity, work eligibility, education credentials, and relevant background signals.',
    },
    es: {
      title: 'Demo de verificación de candidatos y credenciales',
      headline: 'Verifica a un candidato antes de una contratación regulada',
      description: 'Explora un proceso de contratación que comprueba identidad, permiso de trabajo, credenciales académicas y señales de antecedentes.',
    },
    ja: {
      title: '候補者の本人確認と資格検証デモ',
      headline: '規制対象職種の採用前に候補者を確認',
      description: '候補者の本人確認、就労資格、学歴証明、関連するバックグラウンド情報を確認する採用フローを体験できます。',
    },
    de: {
      title: 'Demo zur Kandidaten- und Nachweisprüfung',
      headline: 'Kandidaten vor einer regulierten Einstellung prüfen',
      description: 'Erleben Sie einen Recruiting-Ablauf für Identität, Arbeitserlaubnis, Bildungsnachweise und relevante Hintergrundsignale.',
    },
    vi: {
      title: 'Demo xác minh ứng viên và bằng cấp',
      headline: 'Xác minh ứng viên trước quyết định tuyển dụng có điều kiện',
      description: 'Khám phá quy trình tuyển dụng kiểm tra danh tính, điều kiện làm việc, bằng cấp và các tín hiệu lý lịch liên quan của ứng viên.',
    },
  },
  'ticket-booking': {
    en: {
      title: 'Verified event ticket booking demo',
      headline: 'Book a high-demand ticket for a verified fan',
      description: 'See how device intelligence, bot detection, and phone ownership checks can protect a high-demand event ticket purchase.',
    },
    es: {
      title: 'Demo de compra verificada de entradas',
      headline: 'Reserva una entrada de alta demanda para un aficionado verificado',
      description: 'Descubre cómo la inteligencia de dispositivo, la detección de bots y la verificación del teléfono protegen la compra de entradas.',
    },
    ja: {
      title: '本人確認付きイベントチケット購入デモ',
      headline: '確認済みファンとして人気チケットを予約',
      description: 'デバイス分析、ボット検知、電話番号の所有確認によって人気イベントのチケット購入を守る流れを確認できます。',
    },
    de: {
      title: 'Demo für verifizierte Ticketbuchung',
      headline: 'Ein stark nachgefragtes Ticket für einen verifizierten Fan buchen',
      description: 'Sehen Sie, wie Geräteinformationen, Bot-Erkennung und Rufnummernprüfung den Kauf begehrter Veranstaltungstickets schützen.',
    },
    vi: {
      title: 'Demo đặt vé sự kiện cho người mua đã xác minh',
      headline: 'Đặt vé sự kiện có nhu cầu cao cho người hâm mộ đã xác minh',
      description: 'Xem cách phân tích thiết bị, phát hiện bot và kiểm tra quyền sở hữu số điện thoại giúp bảo vệ giao dịch mua vé sự kiện.',
    },
  },
  'airlines-hotels': {
    en: {
      title: 'Airline and hotel identity check-in demo',
      headline: 'Check in for a flight and hotel stay with verified identity',
      description: 'Try a travel check-in journey using passport NFC, selfie matching, and reservation checks to reduce identity and booking risk.',
    },
    es: {
      title: 'Demo de check-in de identidad para viajes y hoteles',
      headline: 'Haz check-in en vuelos y hoteles con una identidad verificada',
      description: 'Prueba un check-in con NFC del pasaporte, comparación facial y verificación de reservas para reducir el riesgo de identidad y reserva.',
    },
    ja: {
      title: '航空・ホテルの本人確認チェックインデモ',
      headline: '確認済みの本人情報でフライトとホテルにチェックイン',
      description: 'パスポートNFC、セルフィー照合、予約確認を使い、本人情報と予約のリスクを抑える旅行チェックインを体験できます。',
    },
    de: {
      title: 'Demo für Identitäts-Check-in bei Reise und Hotel',
      headline: 'Mit geprüfter Identität für Flug und Hotel einchecken',
      description: 'Testen Sie einen Check-in mit Pass-NFC, Selfie-Abgleich und Reservierungsprüfung zur Verringerung von Identitäts- und Buchungsrisiken.',
    },
    vi: {
      title: 'Demo xác minh danh tính khi làm thủ tục du lịch',
      headline: 'Làm thủ tục chuyến bay và khách sạn bằng danh tính đã xác minh',
      description: 'Thử hành trình làm thủ tục sử dụng NFC hộ chiếu, đối chiếu khuôn mặt và kiểm tra đặt chỗ để giảm rủi ro danh tính và giao dịch.',
    },
  },
  'government-services': {
    en: {
      title: 'Digital government service identity demo',
      headline: 'Access a digital public service with verified eligibility',
      description: 'Explore a public service journey that confirms citizen identity, residency, and document eligibility before a request is submitted.',
    },
    es: {
      title: 'Demo de identidad para servicios públicos digitales',
      headline: 'Accede a un servicio público con elegibilidad verificada',
      description: 'Explora un trámite digital que confirma identidad ciudadana, residencia y documentos requeridos antes de enviar la solicitud.',
    },
    ja: {
      title: 'デジタル行政サービスの本人確認デモ',
      headline: '利用資格を確認してデジタル行政サービスへアクセス',
      description: '申請前に住民の本人情報、居住地、必要書類の適格性を確認するデジタル行政手続きの流れを体験できます。',
    },
    de: {
      title: 'Demo für Identität bei digitalen Behördenleistungen',
      headline: 'Mit geprüfter Berechtigung auf einen digitalen Behördendienst zugreifen',
      description: 'Erleben Sie einen digitalen Antrag, der Identität, Wohnsitz und Dokumentberechtigung vor der Einreichung prüft.',
    },
    vi: {
      title: 'Demo xác minh danh tính cho dịch vụ công trực tuyến',
      headline: 'Sử dụng dịch vụ công trực tuyến với điều kiện đã được xác minh',
      description: 'Khám phá thủ tục số xác minh danh tính công dân, nơi cư trú và giấy tờ đủ điều kiện trước khi người dùng gửi yêu cầu.',
    },
  },
  healthcare: {
    en: {
      title: 'Patient identity and healthcare access demo',
      headline: 'Register for healthcare with a verified patient identity',
      description: 'Try a clinical intake journey that verifies patient identity, insurance coverage, and consent before protected health data is used.',
    },
    es: {
      title: 'Demo de identidad del paciente y acceso sanitario',
      headline: 'Regístrate en un servicio sanitario con identidad verificada',
      description: 'Prueba un ingreso clínico que verifica identidad, cobertura del seguro y consentimiento antes de utilizar datos de salud protegidos.',
    },
    ja: {
      title: '患者本人確認と医療アクセスのデモ',
      headline: '確認済みの患者情報で医療サービスに登録',
      description: '保護対象の医療データを扱う前に、患者の本人情報、保険適用、同意を確認する受付フローを体験できます。',
    },
    de: {
      title: 'Demo für Patientenidentität und Gesundheitszugang',
      headline: 'Mit geprüfter Patientenidentität für Gesundheitsleistungen registrieren',
      description: 'Testen Sie eine klinische Aufnahme, die Identität, Versicherungsschutz und Einwilligung vor der Nutzung geschützter Gesundheitsdaten prüft.',
    },
    vi: {
      title: 'Demo xác minh danh tính bệnh nhân và tiếp cận y tế',
      headline: 'Đăng ký dịch vụ y tế bằng danh tính bệnh nhân đã xác minh',
      description: 'Thử quy trình tiếp nhận kiểm tra danh tính bệnh nhân, quyền lợi bảo hiểm và sự đồng ý trước khi sử dụng dữ liệu sức khỏe được bảo vệ.',
    },
  },
  'ticket-transfer': {
    en: {
      title: 'Verified event ticket transfer demo',
      headline: 'Transfer a verified ticket without losing its trust history',
      description: 'See how ownership proof, escrow, and credential issuance can support a safer transfer from the original ticket holder to a buyer.',
    },
    es: {
      title: 'Demo de transferencia verificada de entradas',
      headline: 'Transfiere una entrada verificada sin perder su historial de confianza',
      description: 'Descubre cómo la prueba de propiedad, el depósito y la emisión de credenciales permiten transferir una entrada de forma más segura.',
    },
    ja: {
      title: '確認済みイベントチケット譲渡デモ',
      headline: '信頼履歴を保ったまま確認済みチケットを譲渡',
      description: '所有証明、エスクロー、クレデンシャル発行を使い、元の保有者から購入者へ安全にチケットを移す流れを確認できます。',
    },
    de: {
      title: 'Demo für verifizierte Ticketübertragung',
      headline: 'Ein verifiziertes Ticket mit nachvollziehbarer Vertrauenskette übertragen',
      description: 'Sehen Sie, wie Eigentumsnachweis, Treuhand und Credential Issuance eine sicherere Übertragung vom ursprünglichen Inhaber ermöglichen.',
    },
    vi: {
      title: 'Demo chuyển nhượng vé sự kiện đã xác minh',
      headline: 'Chuyển nhượng vé đã xác minh mà vẫn giữ được lịch sử tin cậy',
      description: 'Xem cách bằng chứng sở hữu, cơ chế ký quỹ và phát hành thực chứng hỗ trợ chuyển vé an toàn hơn từ người sở hữu ban đầu sang người mua.',
    },
  },
} as const satisfies Record<DemoScenarioId, LocalizedDemoSeoProfile>;

export const getDemoSeoProfile = (
  scenarioId: DemoScenarioId,
  locale: Locale,
): DemoSeoProfile => DEMO_SEO_PROFILES[scenarioId][locale];

export const getLocalizedDemoSeoProfiles = (
  locale: Locale,
): readonly DemoSeoProfile[] => DEMO_SCENARIO_IDS.map(
  (scenarioId) => getDemoSeoProfile(scenarioId, locale),
);
