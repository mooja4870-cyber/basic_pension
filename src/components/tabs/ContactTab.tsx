import React from 'react';
import { Phone, MapPin, Globe, Clock } from 'lucide-react';

export const ContactTab: React.FC = () => (
  <div className="p-6 flex flex-col gap-6">
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8">고객 지원 센터</h3>
      
      <div className="space-y-8">
        <div className="flex gap-4 items-start">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce">
            <Phone size={32} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">상담 전화</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white leading-none mb-2">국번없이 129</p>
            <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-tight">보건복지상담센터 (기초연금 관련 4번)</p>
          </div>
        </div>

        <div className="flex gap-4 items-start border-t border-slate-100 dark:border-slate-800 pt-8">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Phone size={32} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">국민연금 상담</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white leading-none mb-2">국번없이 1355</p>
            <p className="text-lg font-bold text-slate-500 dark:text-slate-400">국민연금공단 고객센터</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <Clock size={20} className="text-blue-500" />
            <span className="text-lg font-bold">평일 09:00 ~ 18:00 (공휴일 제외)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <Globe size={20} className="text-blue-500" />
            <span className="text-lg font-bold">복지로 : www.bokjiro.go.kr</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
      <div>
        <p className="text-2xl font-black mb-1">내 근처 주민센터 찾기</p>
        <p className="text-lg opacity-70">지도에서 가장 가까운 곳을 확인해 보세요.</p>
      </div>
      <div className="bg-white/10 p-4 rounded-2xl"><MapPin size={32} /></div>
    </div>
  </div>
);
