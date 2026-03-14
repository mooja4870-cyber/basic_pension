import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const EligibilityTab: React.FC = () => (
  <div className="p-6 flex flex-col gap-8">
    <div className="text-center">
      <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-4">기초연금이란?</h3>
      <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-3xl mb-6 transition-colors">
        <img 
          src="https://picsum.photos/seed/pension-info/600/400" 
          alt="기초연금 안내" 
          className="rounded-2xl shadow-lg mb-6 w-full opacity-90 dark:opacity-80"
        />
        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
          어르신들의 편안한 노후생활을 돕고 연금 혜택을 공평하게 나누어 드리기 위해 국가에서 매월 드리는 돈입니다.
        </p>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-900/30">
        <h4 className="text-2xl font-black text-blue-800 dark:text-blue-300 mb-4">누가 받을 수 있나요?</h4>
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <CheckCircle2 size={24} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">만 65세 이상 대한민국 어르신</p>
          </li>
          <li className="flex gap-3 items-start">
            <CheckCircle2 size={24} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">가구 소득인정액이 기준액 이하인 분</p>
          </li>
        </ul>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/30">
        <h4 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mb-4">2026년 선정기준액</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">단독가구</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">245만원</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl text-center shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">부부가구</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">392만원</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
