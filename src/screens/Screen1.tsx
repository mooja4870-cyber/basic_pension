import React from 'react';

interface Props {
  onNext: () => void;
}

export const Screen1: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-[#0A0F14] flex flex-col items-center justify-center px-6 py-10 animate-fade-in text-white">
      {/* Title */}
      <h1 className="text-[39px] font-bold text-white text-center leading-tight mb-4 drop-shadow-md">
        기초연금<br />자격 자가진단
      </h1>

      {/* Subtitle */}
      <p className="text-[20px] text-slate-400 text-center leading-relaxed mb-12">
        내가 기초연금을 받을 수 있는지<br />
        <span className="text-slate-300 font-medium">2026년 최신 기준</span>으로 확인해보세요!
      </p>

      {/* Start Button */}
      <div className="w-full flex justify-center">
        <button
          onClick={onNext}
          className="w-[90%] max-w-md h-20 bg-[#1A56DB] text-white text-[26px] font-bold rounded-2xl shadow-[0_4px_20px_rgba(26,86,219,0.3)] hover:bg-[#1545b5] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
        >
          <span>👉</span> 진단 시작하기
        </button>
      </div>

      {/* Info */}
      <div className="mt-12 text-center">
        <p className="text-[16px] text-slate-500 leading-relaxed flex flex-col items-center gap-1">
          <span className="flex items-center gap-2">📺 시니어 본색 유튜브 채널 제공</span>
          <span className="flex items-center gap-2 text-emerald-400/80 font-medium">✅ 2026년 기준 최신 정보</span>
        </p>
      </div>
    </div>
  );
};
