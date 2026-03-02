import React from 'react';

interface Props {
  onSelect: (type: '단독' | '부부', 기준액: number) => void;
}

export const Screen3: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col px-6 py-8 animate-fade-in">
      {/* Progress */}
      <div className="mb-2">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A56DB] rounded-full progress-animate" style={{ width: '40%' }} />
        </div>
      </div>

      {/* Question number */}
      <p className="text-[20px] text-[#888888] mb-4">질문 2 / 5</p>

      {/* Question */}
      <h2 className="text-[28px] font-bold text-[#222222] leading-snug mb-4">
        가구 유형을<br />선택해주세요
      </h2>

      {/* Description */}
      <p className="text-[20px] text-[#555555] leading-relaxed mb-10">
        배우자가 있으면 부부가구,<br />없으면 단독가구입니다
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-5">
        <button
          onClick={() => onSelect('단독', 2470000)}
          className="w-[90%] max-w-md min-h-[100px] bg-[#16A34A] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#15803d] active:scale-[0.98] transition-all py-4 leading-snug"
        >
          🧓 단독가구<br />
          <span className="text-[20px] font-normal">(혼자 삽니다)</span>
        </button>

        <button
          onClick={() => onSelect('부부', 3952000)}
          className="w-[90%] max-w-md min-h-[100px] bg-[#1A56DB] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#1545b5] active:scale-[0.98] transition-all py-4 leading-snug"
        >
          👫 부부가구<br />
          <span className="text-[20px] font-normal">(배우자와 함께 삽니다)</span>
        </button>
      </div>
    </div>
  );
};
