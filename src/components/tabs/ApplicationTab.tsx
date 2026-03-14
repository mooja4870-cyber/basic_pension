import React from 'react';
import { MapPin, Home } from 'lucide-react';

export const ApplicationTab: React.FC = () => (
  <div className="p-6 flex flex-col gap-6">
    <div className="bg-slate-800 dark:bg-slate-900 text-white p-8 rounded-3xl shadow-xl border dark:border-slate-800 transition-colors">
      <h3 className="text-3xl font-black mb-4">어디서 신청하나요?</h3>
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="bg-blue-500 p-3 rounded-2xl"><MapPin size={32} /></div>
          <div>
            <p className="text-2xl font-black">방문 신청</p>
            <p className="text-xl opacity-80">주소지 동 주민센터 또는 국민연금공단 지사</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="bg-emerald-500 p-3 rounded-2xl"><Home size={32} /></div>
          <div>
            <p className="text-2xl font-black">온라인 신청</p>
            <p className="text-xl opacity-80">복지로(www.bokjiro.go.kr) 홈페이지</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">준비 서류</h4>
      <ul className="space-y-4">
        <li className="flex gap-3 items-center text-xl font-bold text-slate-600 dark:text-slate-400">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" /> 신분증 (주민등록증, 운전면허증 등)
        </li>
        <li className="flex gap-3 items-center text-xl font-bold text-slate-600 dark:text-slate-400">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" /> 기초연금을 받을 통장 사본
        </li>
        <li className="flex gap-3 items-center text-xl font-bold text-slate-600 dark:text-slate-400">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" /> 배우자의 금융정보등제공동의서
        </li>
      </ul>
    </div>
  </div>
);
