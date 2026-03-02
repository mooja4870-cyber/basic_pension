import React from 'react';

interface Props {
  onChannel: () => void;
  onRestart: () => void;
}

export const Screen7: React.FC<Props> = ({ onChannel, onRestart }) => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col px-6 py-8 animate-fade-in">
      {/* Title */}
      <h2 className="text-[28px] font-bold text-[#222222] mb-6">
        📝 기초연금 신청 방법
      </h2>

      {/* Method 1 */}
      <div className="bg-[#F0F7FF] rounded-2xl p-5 mb-5">
        <h3 className="text-[24px] font-bold text-[#1A56DB] mb-3">1️⃣ 주민센터 방문 신청</h3>
        <p className="text-[22px] text-[#222222] leading-relaxed">
          가까운 주민센터(읍면동사무소)에<br />
          신분증 가지고 방문하세요.<br />
          직원이 친절하게 도와줍니다.
        </p>
      </div>

      {/* Method 2 */}
      <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-gray-100">
        <h3 className="text-[24px] font-bold text-[#1A56DB] mb-3">2️⃣ 국민연금공단 방문</h3>
        <p className="text-[22px] text-[#222222] leading-relaxed">
          국민연금공단 지사에서도<br />
          신청 가능합니다.
        </p>
      </div>

      {/* Method 3 */}
      <div className="bg-white rounded-2xl p-5 mb-5 border-2 border-gray-100">
        <h3 className="text-[24px] font-bold text-[#1A56DB] mb-3">3️⃣ 온라인 신청</h3>
        <p className="text-[22px] text-[#222222] leading-relaxed">
          복지로 홈페이지<br />
          (www.bokjiro.go.kr)에서<br />
          온라인 신청 가능합니다.
        </p>
      </div>

      {/* Required Documents */}
      <div className="bg-[#FFF3E0] rounded-2xl p-5 mb-5">
        <h3 className="text-[24px] font-bold text-[#222222] mb-3">📄 필요한 서류</h3>
        <div className="text-[22px] text-[#222222] leading-loose">
          <p>▪ 신분증 (주민등록증)</p>
          <p>▪ 통장 사본</p>
          <p>▪ 금융정보 제공 동의서</p>
          <p className="text-[18px] text-[#888888] ml-4">(주민센터에 비치되어 있음)</p>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="bg-[#E8F5E9] rounded-2xl p-5 mb-6">
        <h3 className="text-[24px] font-bold text-[#222222] mb-3">📞 문의 전화</h3>
        <div className="text-[22px] text-[#222222] leading-loose">
          <p>▪ 국민연금공단: <span className="font-bold text-[#1A56DB]">1355</span></p>
          <p>▪ 정부 복지 상담: <span className="font-bold text-[#1A56DB]">129</span></p>
          <p>▪ 주민센터: <span className="font-bold text-[#1A56DB]">지역번호+120</span></p>
        </div>
      </div>

      {/* Call Button */}
      <a
        href="tel:1355"
        className="w-[90%] max-w-md h-[75px] bg-[#16A34A] text-white text-[24px] font-bold rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 hover:bg-[#15803d] active:scale-[0.98] transition-all"
      >
        📞 1355 전화 걸기
      </a>

      {/* Channel Button */}
      <button
        onClick={onChannel}
        className="w-[90%] max-w-md h-[65px] bg-[#1A56DB] text-white text-[22px] font-bold rounded-2xl shadow-md mx-auto mb-4 hover:bg-[#1545b5] active:scale-[0.98] transition-all"
      >
        📺 시니어 본색 채널 보기
      </button>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="w-[90%] max-w-md h-[55px] bg-[#888888] text-white text-[20px] font-bold rounded-2xl shadow-md mx-auto hover:bg-[#777] active:scale-[0.98] transition-all"
      >
        🏠 처음으로 돌아가기
      </button>

      <div className="h-8" />
    </div>
  );
};
