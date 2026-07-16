/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IntegrationItem {
  name: string;
  description: string;
  tags: string[];
  isNew?: boolean;
  logoBg: string;
  logoText: string;
  logoTextColor?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export const CATEGORIES = [
  'All',
  'Productivity',
  'Data Enrichment',
  'Credit',
  'AI',
  'Ticketing',
  'CRM',
  'ATS',
  'Authentication',
  'Workforce',
  'Communication',
  'Crypto',
  'HRIS'
];

export const INTEGRATIONS: IntegrationItem[] = [
  {
    name: 'Cloudflare',
    description: '',
    tags: ['Productivity'],
    isNew: true,
    logoBg: 'bg-orange-500',
    logoText: 'CF'
  },
  {
    name: 'CRS',
    description: '',
    tags: ['Data Enrichment', 'Credit'],
    isNew: true,
    logoBg: 'bg-[#1e3a8a]',
    logoText: 'CRS'
  },
  {
    name: 'Notion',
    description: '',
    tags: ['Productivity'],
    isNew: true,
    logoBg: 'bg-black',
    logoText: 'N'
  },
  {
    name: 'Airtable',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-red-500',
    logoText: 'AT'
  },
  {
    name: 'Anthropic',
    description: '',
    tags: ['Productivity', 'AI'],
    logoBg: 'bg-[#ecc9bc]',
    logoText: 'AN',
    logoTextColor: 'text-stone-800'
  },
  {
    name: 'Asana',
    description: '',
    tags: ['Productivity', 'Ticketing'],
    logoBg: 'bg-rose-500',
    logoText: 'AS'
  },
  {
    name: 'Ashby',
    description: '',
    tags: ['ATS', 'Workforce'],
    logoBg: 'bg-[#3b82f6]',
    logoText: 'AB'
  },
  {
    name: 'AtData',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-sky-500',
    logoText: 'AD'
  },
  {
    name: 'Attio',
    description: '',
    tags: ['CRM'],
    logoBg: 'bg-[#18181b]',
    logoText: 'AO'
  },
  {
    name: 'Auth0',
    description: '',
    tags: ['Authentication', 'Productivity'],
    logoBg: 'bg-orange-600',
    logoText: 'A0'
  },
  {
    name: 'BambooHR',
    description: '',
    tags: ['Workforce', 'ATS'],
    logoBg: 'bg-emerald-600',
    logoText: 'BH'
  },
  {
    name: 'Basecamp',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-amber-500',
    logoText: 'BC'
  },
  {
    name: 'Box',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-blue-600',
    logoText: 'BX'
  },
  {
    name: 'Breezy HR',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-indigo-500',
    logoText: 'BZ'
  },
  {
    name: 'Canopy Connect',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-teal-500',
    logoText: 'CC'
  },
  {
    name: 'Chainalysis',
    description: '',
    tags: ['Crypto', 'Data Enrichment'],
    logoBg: 'bg-[#2e1065]',
    logoText: 'CH'
  },
  {
    name: 'Cisco Duo',
    description: '',
    tags: ['Authentication', 'Workforce'],
    logoBg: 'bg-emerald-500',
    logoText: 'DUO'
  },
  {
    name: 'Clearbit',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-blue-700',
    logoText: 'CB'
  },
  {
    name: 'Clerk',
    description: '',
    tags: ['Authentication'],
    logoBg: 'bg-violet-600',
    logoText: 'CLK'
  },
  {
    name: 'ClickUp',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-fuchsia-600',
    logoText: 'CU'
  },
  {
    name: 'Close',
    description: '',
    tags: ['CRM'],
    logoBg: 'bg-cyan-600',
    logoText: 'CL'
  },
  {
    name: 'Coda',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-stone-900',
    logoText: 'CO'
  },
  {
    name: 'Coinbase',
    description: '',
    tags: ['Crypto', 'Data Enrichment'],
    logoBg: 'bg-blue-600',
    logoText: 'CB'
  },
  {
    name: 'Dover',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-green-700',
    logoText: 'DV'
  },
  {
    name: 'Elastic',
    description: '',
    tags: ['Ticketing', 'Workforce'],
    logoBg: 'bg-cyan-500',
    logoText: 'EL'
  },
  {
    name: 'Etherscan',
    description: '',
    tags: ['Crypto'],
    logoBg: 'bg-indigo-900',
    logoText: 'ES'
  },
  {
    name: 'Fountain',
    description: '',
    tags: ['ATS', 'Workforce'],
    logoBg: 'bg-indigo-600',
    logoText: 'FT'
  },
  {
    name: 'Freshdesk',
    description: '',
    tags: ['Ticketing'],
    logoBg: 'bg-sky-400',
    logoText: 'FD'
  },
  {
    name: 'FullContact',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-indigo-800',
    logoText: 'FC'
  },
  {
    name: 'GitHub',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-slate-900',
    logoText: 'GH'
  },
  {
    name: 'GitLab',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-orange-600',
    logoText: 'GL'
  },
  {
    name: 'Google AI',
    description: '',
    tags: ['Productivity', 'AI'],
    logoBg: 'bg-blue-500',
    logoText: 'G'
  },
  {
    name: 'Greenhouse',
    description: '',
    tags: ['Workforce', 'ATS'],
    logoBg: 'bg-emerald-700',
    logoText: 'GH'
  },
  {
    name: 'Groq',
    description: '',
    tags: ['Productivity', 'AI'],
    logoBg: 'bg-stone-900',
    logoText: 'GQ'
  },
  {
    name: 'Gusto',
    description: '',
    tags: ['HRIS', 'Workforce'],
    logoBg: 'bg-orange-400',
    logoText: 'GU'
  },
  {
    name: 'Harvest',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-orange-600',
    logoText: 'HV'
  },
  {
    name: 'HubSpot',
    description: '',
    tags: ['CRM'],
    logoBg: 'bg-orange-500',
    logoText: 'HS'
  },
  {
    name: 'Intercom',
    description: '',
    tags: ['Productivity', 'Ticketing', 'Workforce'],
    logoBg: 'bg-blue-500',
    logoText: 'IC'
  },
  {
    name: 'Jira',
    description: '',
    tags: ['Productivity', 'Ticketing'],
    logoBg: 'bg-blue-600',
    logoText: 'JR'
  },
  {
    name: 'JOIN',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-neutral-800',
    logoText: 'JN'
  },
  {
    name: 'LexisNexis',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-[#991b1b]',
    logoText: 'LN'
  },
  {
    name: 'Mastercard Identity',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-red-500',
    logoText: 'MC'
  },
  {
    name: 'Microsoft Entra',
    description: '',
    tags: ['Authentication', 'Workforce'],
    logoBg: 'bg-blue-500',
    logoText: 'ME'
  },
  {
    name: 'Microsoft Teams',
    description: '',
    tags: ['Communication'],
    logoBg: 'bg-indigo-600',
    logoText: 'MT'
  },
  {
    name: 'Miro',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-yellow-500',
    logoText: 'MR'
  },
  {
    name: 'Mixpanel',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-purple-700',
    logoText: 'MP'
  },
  {
    name: 'MX',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-[#0f172a]',
    logoText: 'MX'
  },
  {
    name: 'Nova Credit',
    description: '',
    tags: ['Credit', 'Data Enrichment'],
    logoBg: 'bg-slate-800',
    logoText: 'NC'
  },
  {
    name: 'Okta',
    description: '',
    tags: ['Authentication', 'Workforce'],
    logoBg: 'bg-sky-600',
    logoText: 'OK'
  },
  {
    name: 'OneLogin',
    description: '',
    tags: ['Authentication', 'Workforce'],
    logoBg: 'bg-red-600',
    logoText: 'OL'
  },
  {
    name: 'OpenAI',
    description: '',
    tags: ['AI', 'Productivity'],
    logoBg: 'bg-[#0f172a]',
    logoText: 'AI'
  },
  {
    name: 'PeopleHR',
    description: '',
    tags: ['HRIS', 'Workforce'],
    logoBg: 'bg-sky-700',
    logoText: 'PH'
  },
  {
    name: 'PhotoDNA',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-gray-700',
    logoText: 'PD'
  },
  {
    name: 'Polymer',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-indigo-600',
    logoText: 'PL'
  },
  {
    name: 'Prove',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-indigo-700',
    logoText: 'PR'
  },
  {
    name: 'Recruitee',
    description: '',
    tags: ['ATS', 'Workforce'],
    logoBg: 'bg-teal-600',
    logoText: 'RT'
  },
  {
    name: 'Salesforce',
    description: '',
    tags: ['CRM'],
    logoBg: 'bg-blue-400',
    logoText: 'SF'
  },
  {
    name: 'SentiLink',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-cyan-700',
    logoText: 'SL'
  },
  {
    name: 'ServiceNow',
    description: '',
    tags: ['Productivity', 'Ticketing', 'Workforce'],
    logoBg: 'bg-emerald-700',
    logoText: 'SN'
  },
  {
    name: 'Slack',
    description: '',
    tags: ['Communication'],
    logoBg: 'bg-[#4a154b]',
    logoText: 'SLK'
  },
  {
    name: 'Smartsheet',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-emerald-600',
    logoText: 'SS'
  },
  {
    name: 'Solana',
    description: '',
    tags: ['Crypto'],
    logoBg: 'bg-[#0f172a]',
    logoText: 'SOL'
  },
  {
    name: 'Stych',
    description: '',
    tags: ['Authentication'],
    logoBg: 'bg-stone-800',
    logoText: 'ST'
  },
  {
    name: 'Supabase',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-[#10b981]',
    logoText: 'SB'
  },
  {
    name: 'TalentLyft',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-sky-500',
    logoText: 'TL'
  },
  {
    name: 'Todoist',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-[#dc2626]',
    logoText: 'TD'
  },
  {
    name: 'TRM',
    description: '',
    tags: ['Crypto', 'Data Enrichment'],
    logoBg: 'bg-[#0f172a]',
    logoText: 'TRM'
  },
  {
    name: 'Twilio',
    description: '',
    tags: ['Communication'],
    logoBg: 'bg-red-600',
    logoText: 'TW'
  },
  {
    name: 'Vercel',
    description: '',
    tags: ['Productivity'],
    logoBg: 'bg-black',
    logoText: 'VC'
  },
  {
    name: 'VerifyMy',
    description: '',
    tags: ['Data Enrichment'],
    logoBg: 'bg-[#4338ca]',
    logoText: 'VM'
  },
  {
    name: 'Workable',
    description: '',
    tags: ['ATS'],
    logoBg: 'bg-[#1d4ed8]',
    logoText: 'WK'
  },
  {
    name: 'Workday',
    description: '',
    tags: ['HRIS', 'Workforce', 'ATS'],
    logoBg: 'bg-blue-800',
    logoText: 'WD'
  },
  {
    name: 'WorkOS',
    description: '',
    tags: ['Authentication'],
    logoBg: 'bg-indigo-600',
    logoText: 'WO'
  },
  {
    name: 'Yardstick',
    description: '',
    tags: ['Workforce'],
    logoBg: 'bg-emerald-800',
    logoText: 'YS'
  },
  {
    name: 'Zendesk',
    description: '',
    tags: ['Productivity', 'Ticketing', 'Workforce'],
    logoBg: 'bg-[#15803d]',
    logoText: 'ZD'
  },
  {
    name: 'Zoho CRM',
    description: '',
    tags: ['CRM'],
    logoBg: 'bg-red-700',
    logoText: 'ZOH'
  },
  {
    name: 'Zoom',
    description: '',
    tags: ['Productivity', 'Workforce'],
    logoBg: 'bg-blue-500',
    logoText: 'ZM'
  }
];
