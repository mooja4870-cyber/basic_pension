/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'news' | 'check' | 'eligibility' | 'amount' | 'application' | 'faq' | 'calculator' | 'senior_guide' | 'contact';

export interface NewsItem {
  id: number;
  type: '뉴스' | '보도자료' | '안내';
  title: string;
  date: string;
  summary: string;
  content: string;
  aiSummary?: string;
  isSummarizing?: boolean;
  department?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export type NotificationType = 'policy' | 'deadline' | 'feature' | 'news';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

export interface CheckHistoryItem {
  id: number;
  age: string;
  residence: 'domestic' | 'overseas';
  result: 'eligible' | 'ineligible';
  date: string;
}

export interface CalcIncome {
  earned: string;
  other: string;
}

export interface CalcAssets {
  general: string;
  financial: string;
  debt: string;
}

export type HouseholdType = 'single' | 'couple';
export type RegionType = 'big' | 'medium' | 'rural';
