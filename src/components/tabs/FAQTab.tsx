import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQItem } from '../../types';

interface FAQTabProps {
  faqs: FAQItem[];
  searchQuery: string;
}

export const FAQTab: React.FC<FAQTabProps> = ({ faqs, searchQuery }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.includes(searchQuery) || faq.answer.includes(searchQuery)
  );

  return (
    <div className="p-6 flex flex-col gap-4">
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
            <button 
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex gap-4 items-start">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">Q</span>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">{faq.question}</span>
              </div>
              <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }}>
                <ChevronDown size={28} className="text-slate-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openId === faq.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-100 dark:border-slate-800"
                >
                  <p className="text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed break-keep">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      ) : (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-4">
          <Search size={48} className="opacity-20" />
          <p className="text-xl font-bold">검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
};
