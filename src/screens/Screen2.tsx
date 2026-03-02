import React, { useState } from 'react';

interface Props {
  onNext: (birthYear: number, age: number) => void;
}

export const Screen2: React.FC<Props> = ({ onNext }) => {
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    const year = parseInt(birthYear);
    if (!birthYear || isNaN(year)) {
      setError('올바른 출생연도를\n입력해주세요.\n예: 1955');
      return;
    }

    const currentYear = 2026;
    const age = currentYear - year;

    if (age >= 65) {
      setError('');
      onNext(year, age);
    } else if (age >= 60 && age < 65) {
      setError(`만 ${age}세이시군요.\n기초연금은 만 65세부터\n신청 가능합니다.\n\n${65 - age}년 후에 신청하실 수 있습니다.`);
    } else if (age > 0 && age < 60) {
      setError(`만 ${age}세이시군요.\n기초연금은 만 65세부터\n신청 가능합니다.`);
    } else {
      setError('올바른 출생연도를\n입력해주세요.\n예: 1955');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col px-6 py-8 animate-fade-in">
      {/* Progress */}
      <div className="mb-2">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A56DB] rounded-full progress-animate" style={{ width: '20%' }} />
        </div>
      </div>

      {/* Question number */}
      <p className="text-[20px] text-[#888888] mb-4">질문 1 / 5</p>

      {/* Question */}
      <h2 className="text-[28px] font-bold text-[#222222] leading-snug mb-4">
        올해 만 나이가<br />어떻게 되시나요?
      </h2>

      {/* Description */}
      <p className="text-[22px] text-[#555555] leading-relaxed mb-8">
        태어난 연도를 입력해주세요<br />예시) 1955
      </p>

      {/* Input */}
      <div className="flex justify-center mb-6">
        <input
          type="number"
          value={birthYear}
          onChange={(e) => { setBirthYear(e.target.value); setError(''); }}
          placeholder="예: 1955"
          className="w-[70%] max-w-xs h-[70px] text-[28px] text-center border-3 border-[#1A56DB] rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
        />
      </div>

      {/* Spacer */}
      <div className="h-5" />

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-[90%] max-w-md h-[75px] bg-[#1A56DB] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#1545b5] active:scale-[0.98] transition-all mx-auto"
      >
        다음으로 →
      </button>

      {/* Error message */}
      {error && (
        <div className="mt-6 p-5 bg-red-50 border-2 border-red-200 rounded-xl mx-auto max-w-md animate-slide-up">
          <p className="text-[20px] text-[#FF0000] text-center whitespace-pre-line font-semibold">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};
