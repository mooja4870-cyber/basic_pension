import React from 'react';

interface Props {
  onNext: () => void;
}

export const Screen1: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center justify-center px-6 py-10 animate-fade-in">
      {/* Logo */}
      <div className="w-44 h-44 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 animate-bounce-in">
        <span className="text-8xl">🏛️</span>
      </div>

      {/* Title */}
      <h1 className="text-[32px] font-bold text-[#222222] text-center leading-snug mb-4">
        기초연금<br />자격 자가진단
      </h1>

      {/* Subtitle */}
      <p className="text-[22px] text-[#555555] text-center leading-relaxed mb-10">
        내가 기초연금을<br />받을 수 있는지 확인해보세요!
      </p>

      {/* Start Button */}
      <button
        onClick={onNext}
        className="w-[90%] max-w-md h-20 bg-[#1A56DB] text-white text-[26px] font-bold rounded-2xl shadow-lg hover:bg-[#1545b5] active:scale-[0.98] transition-all duration-200"
      >
        👉 진단 시작하기
      </button>

      {/* Info */}
      <p className="text-[18px] text-[#888888] text-center mt-8 leading-relaxed">
        📺 시니어 본색 유튜브 채널 제공<br />
        ✅ 2026년 기준 최신 정보
      </p>
    </div>
  );
};
