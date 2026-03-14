import React from 'react';
import { motion } from 'motion/react';
import { Tab } from '../../types';

interface TabBarProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; hasDot?: boolean }[] = [
  { id: 'news', label: '최신소식', hasDot: true },
  { id: 'check', label: '자가진단' },
  { id: 'calculator', label: '금액계산' },
  { id: 'eligibility', label: '자격조건' },
  { id: 'amount', label: '지급금액' },
  { id: 'application', label: '신청방법' },
  { id: 'senior_guide', label: '맞춤안내' },
  { id: 'faq', label: '자주질문' },
  { id: 'contact', label: '고객센터' },
];

export const TabBar: React.FC<TabBarProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-[164px] z-20 flex overflow-x-auto scrollbar-hide transition-colors">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`flex-none px-6 py-4 text-xl font-bold transition-colors relative ${
            currentTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {tab.label}
          {tab.hasDot && (
            <span className="absolute top-2 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
          {currentTab === tab.id && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400"
            />
          )}
        </button>
      ))}
    </div>
  );
};
