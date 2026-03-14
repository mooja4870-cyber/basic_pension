import React from 'react';

export const AmountTab: React.FC = () => (
  <div className="p-6 flex flex-col gap-8">
    <div className="bg-blue-600 dark:bg-blue-900 text-white p-8 rounded-3xl shadow-xl text-center transition-colors">
      <h3 className="text-3xl font-black mb-4">얼마를 받나요?</h3>
      <p className="text-5xl font-black mb-2">최대 400,000원</p>
      <p className="text-xl font-bold opacity-80">(단독가구 기준, 월 지급액)</p>
    </div>

    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">부부가구 지급액</h4>
        <p className="text-3xl font-black text-blue-600 dark:text-blue-400">최대 640,000원</p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 font-medium">※ 부부 감액 20% 적용</p>
      </div>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-900/30">
        <p className="text-xl font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
          소득 수준이 높거나 국민연금을 많이 받으시는 경우 지급액이 일부 감액될 수 있습니다.
        </p>
      </div>
    </div>
  </div>
);
