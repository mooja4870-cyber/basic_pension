import React from 'react';

interface Props {
  onRestart: () => void;
}

export const Screen8: React.FC<Props> = ({ onRestart }) => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col items-center px-6 py-10 animate-fade-in">
      {/* Channel Logo */}
      <div className="w-36 h-36 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 animate-bounce-in">
        <span className="text-7xl">📺</span>
      </div>

      {/* Title */}
      <h2 className="text-[32px] font-bold text-[#222222] text-center mb-6">
        시니어 본색
      </h2>

      {/* Description */}
      <div className="bg-white rounded-2xl p-6 mb-8 w-full max-w-md shadow-md">
        <p className="text-[22px] text-[#222222] text-center leading-loose">
          더 많은 복지 정보를<br />
          유튜브에서 확인하세요!
        </p>
        <div className="mt-4 space-y-3">
          <p className="text-[22px] text-[#16A34A] font-bold">✅ 매주 새로운 복지 정보</p>
          <p className="text-[22px] text-[#16A34A] font-bold">✅ 시니어를 위한 꿀팁</p>
          <p className="text-[22px] text-[#16A34A] font-bold">✅ 무료 앱 추가 배포 예정</p>
        </div>
      </div>

      {/* YouTube Subscribe Button */}
      <a
        href="https://www.youtube.com/channel/UCI9yvQxhE22GxGTcrO0yeHg"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[90%] max-w-md h-[80px] bg-[#FF0000] text-white text-[24px] font-bold rounded-2xl shadow-lg flex items-center justify-center mb-5 hover:bg-[#CC0000] active:scale-[0.98] transition-all"
      >
        📺 유튜브 채널 구독하기
      </a>

      {/* Social links info */}
      <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-md mb-8">
        <p className="text-[20px] text-[#555555] text-center leading-relaxed">
          🔔 구독과 알림 설정을 하면<br />
          새로운 복지 정보를<br />
          빠르게 받아보실 수 있습니다!
        </p>
      </div>

      {/* Home Button */}
      <button
        onClick={onRestart}
        className="w-[90%] max-w-md h-[65px] bg-[#1A56DB] text-white text-[22px] font-bold rounded-2xl shadow-md hover:bg-[#1545b5] active:scale-[0.98] transition-all"
      >
        🏠 처음으로 돌아가기
      </button>

      <div className="h-8" />
    </div>
  );
};
