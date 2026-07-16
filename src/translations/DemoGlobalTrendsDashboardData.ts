/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLocalizedText, type LocalizedText } from './demoLocalization';
import { getDemoSummaryDecisionData } from './DemoSummaryModalData';

const lt = (en: string, es: string, ja: string, de: string, vi: string): LocalizedText => ({
  en,
  es,
  ja,
  de,
  vi,
});

const DASHBOARD_SCENARIOS = [
  {
    id: 'bank-account',
    title: lt('Opening a bank account', 'Abrir una cuenta bancaria', '銀行口座の開設', 'Bankkonto eröffnen', 'Mở tài khoản ngân hàng'),
    tag: lt('Fintech and KYC', 'Fintech y KYC', 'フィンテックとKYC', 'Fintech und KYC', 'Công nghệ tài chính và KYC'),
  },
  {
    id: 'apply-job',
    title: lt('Applying for jobs', 'Postularse a empleos', '求人への応募', 'Bewerbung auf Stellen', 'Nộp hồ sơ ứng tuyển việc làm'),
    tag: lt('Workforce IDV', 'IDV laboral', '従業員IDV', 'Workforce-IDV', 'Xác minh nhân sự'),
  },
  {
    id: 'ticket-booking',
    title: lt('Concert ticket booking', 'Reserva de entradas de concierto', 'コンサートチケット予約', 'Konzertticketbuchung', 'Đặt vé xem ca nhạc'),
    tag: lt('Trust and safety', 'Confianza y seguridad', '信頼と安全', 'Trust & Safety', 'Tin cậy và an toàn'),
  },
  {
    id: 'airlines-hotels',
    title: lt('Airlines and hotels', 'Aerolíneas y hoteles', '航空会社とホテル', 'Fluggesellschaften und Hotels', 'Hàng không và khách sạn'),
    tag: lt('Travel and hospitality', 'Viajes y hospitalidad', '旅行・ホスピタリティ', 'Reisen und Hospitality', 'Du lịch và lưu trú'),
  },
  {
    id: 'government-services',
    title: lt('e-Government services', 'Servicios de e-Gobierno', '電子政府サービス', 'E-Government-Dienste', 'Dịch vụ công trực tuyến'),
    tag: lt('Public sector', 'Sector público', '公共部門', 'Öffentlicher Sektor', 'Khu vực công'),
  },
  {
    id: 'healthcare',
    title: lt('Healthcare and patient portals', 'Salud y portales de pacientes', '医療と患者ポータル', 'Gesundheitswesen und Patientenportale', 'Y tế và cổng thông tin bệnh nhân'),
    tag: lt('Digital health', 'Salud digital', 'デジタルヘルス', 'Digitale Gesundheit', 'Y tế số'),
  },
  {
    id: 'ticket-transfer',
    title: lt('Concert ticket transfer', 'Transferencia de entradas de concierto', 'コンサートチケット譲渡', 'Konzertticketübertragung', 'Chuyển nhượng vé ca nhạc'),
    tag: lt('Secure exchange', 'Intercambio seguro', '安全な交換', 'Sicherer Austausch', 'Giao dịch bảo mật'),
  },
];

export interface DemoGlobalTrendRule {
  id: string;
  name: string;
  weight: number;
  status: 'PASS' | 'WARN' | 'FAIL';
}

export interface DemoGlobalTrendScenario {
  id: string;
  title: string;
  tag: string;
  overallConfidence: number;
  overallRisk: number;
  verdict: string;
  riskDimensions: {
    label: string;
    score: number;
  }[];
  confidenceTrend: number[];
  decisionLogic: string;
  rules: DemoGlobalTrendRule[];
}

export const getDemoGlobalTrendsDashboardData = (language: string): DemoGlobalTrendScenario[] =>
  DASHBOARD_SCENARIOS.map((scenario) => {
    const summary = getDemoSummaryDecisionData(scenario.id, language);

    return {
      id: scenario.id,
      title: getLocalizedText(scenario.title, language),
      tag: getLocalizedText(scenario.tag, language),
      ...summary,
    };
  });
