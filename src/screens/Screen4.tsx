import React, { useState } from 'react';

interface Props {
  onNext: (income: number) => void;
}

export const Screen4: React.FC<Props> = ({ onNext }) => {
  const [income, setIncome] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    const val = income.trim() === '' ? 0 : parseInt(income);
    if (isNaN(val) || val < 0) {
      setError('올바른 금액을 입력해주세요.');
      return;
    }
    onNext(val);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col px-6 py-8 animate-fade-in">
      {/* Progress */}
      <div className="mb-2">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A56DB] rounded-full progress-animate" style={{ width: '60%' }} />
        </div>
      </div>

      {/* Question number */}
      <p className="text-[20px] text-[#888888] mb-4">질문 3 / 5</p>

      {/* Question */}
      <h2 className="text-[28px] font-bold text-[#222222] leading-snug mb-4">
        월 소득이<br />어느 정도 되시나요?
      </h2>

      {/* Description */}
      <p className="text-[20px] text-[#555555] leading-relaxed mb-6">
        근로소득, 사업소득, 연금소득 등<br />
        매달 받는 돈을 모두 합쳐주세요.<br />
        <span className="text-[#D32F2F] font-semibold">※ 세후 액수가 아닌 '세금 떼기 전'<br />총 지급액 기준으로 입력해주세요.</span><br />
        <span className="font-bold">(만원 단위로 입력)</span>
      </p>

      {/* Input */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <input
          type="number"
          value={income}
          onChange={(e) => { setIncome(e.target.value); setError(''); }}
          placeholder="예: 150"
          className="w-[55%] max-w-[240px] h-[70px] text-[28px] text-center border-3 border-[#1A56DB] rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
        />
        <span className="text-[26px] font-bold text-[#222222]">만원</span>
      </div>

      {/* Help */}
      <p className="text-[20px] text-[#1A56DB] text-center mb-8">
        💡 소득이 없으면 0을 입력하세요
      </p>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-[90%] max-w-md h-[75px] bg-[#1A56DB] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#1545b5] active:scale-[0.98] transition-all mx-auto"
      >
        다음으로 →
      </button>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl mx-auto max-w-md animate-slide-up">
          <p className="text-[20px] text-[#FF0000] text-center font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};
