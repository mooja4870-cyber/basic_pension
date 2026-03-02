import React, { useState } from 'react';

const regions = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
];

interface Props {
  monthlyIncome: number;
  onNext: (region: string, realEstate: number, financial: number, debt: number, 소득인정액: number, 소득평가액: number, 재산소득환산액: number) => void;
}

export const Screen5: React.FC<Props> = ({ monthlyIncome, onNext }) => {
  const [region, setRegion] = useState('');
  const [realEstate, setRealEstate] = useState('');
  const [financial, setFinancial] = useState('');
  const [debt, setDebt] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!region) {
      setError('거주 지역을 선택해주세요.');
      return;
    }

    const re = realEstate.trim() === '' ? 0 : parseInt(realEstate);
    const fi = financial.trim() === '' ? 0 : parseInt(financial);
    const de = debt.trim() === '' ? 0 : parseInt(debt);

    if (isNaN(re) || isNaN(fi) || isNaN(de) || re < 0 || fi < 0 || de < 0) {
      setError('올바른 금액을 입력해주세요.');
      return;
    }

    // 기본재산액 (만원)
    let 기본재산액만원: number;
    if (['서울', '경기', '인천'].includes(region)) {
      기본재산액만원 = 13500;
    } else if (['부산', '대구', '광주', '대전', '울산', '세종'].includes(region)) {
      기본재산액만원 = 8500;
    } else {
      기본재산액만원 = 7250;
    }

    // 소득평가액 계산
    const 근로소득원 = monthlyIncome * 10000;
    let 소득평가액: number;
    if (근로소득원 > 1160000) {
      소득평가액 = (근로소득원 - 1160000) * 0.7;
    } else {
      소득평가액 = 0;
    }

    // 재산의 소득환산액 계산
    const 총재산원 = (re + fi - de) * 10000;
    let 순재산 = 총재산원 - (기본재산액만원 * 10000);
    if (순재산 < 0) 순재산 = 0;
    const 재산소득환산액 = (순재산 / 12) * 0.04;

    // 소득인정액
    const 소득인정액 = 소득평가액 + 재산소득환산액;

    onNext(region, re, fi, de, 소득인정액, 소득평가액, 재산소득환산액);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex flex-col px-6 py-8 animate-fade-in">
      {/* Progress */}
      <div className="mb-2">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A56DB] rounded-full progress-animate" style={{ width: '80%' }} />
        </div>
      </div>

      {/* Question number */}
      <p className="text-[20px] text-[#888888] mb-4">질문 4 / 5</p>

      {/* Question */}
      <h2 className="text-[28px] font-bold text-[#222222] leading-snug mb-6">
        재산이<br />어느 정도 되시나요?
      </h2>

      {/* Region Selection */}
      <div className="mb-6">
        <label className="text-[22px] font-bold text-[#222222] mb-3 block">① 거주 지역</label>
        <select
          value={region}
          onChange={(e) => { setRegion(e.target.value); setError(''); }}
          className="w-full max-w-md h-[60px] text-[22px] border-3 border-[#1A56DB] rounded-xl px-4 bg-white focus:outline-none focus:ring-4 focus:ring-blue-200 appearance-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231A56DB' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          <option value="">지역을 선택하세요</option>
          {regions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Real Estate */}
      <div className="mb-5">
        <label className="text-[22px] font-bold text-[#222222] mb-1 block">② 부동산 (집, 땅 등)</label>
        <p className="text-[17px] text-[#D32F2F] mb-1">※ 시가가 아닌 '공시가격' 기준입니다.</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={realEstate}
            onChange={(e) => { setRealEstate(e.target.value); setError(''); }}
            placeholder="예: 15000"
            className="flex-1 max-w-[240px] h-[60px] text-[24px] text-center border-3 border-gray-300 rounded-xl focus:border-[#1A56DB] focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
          />
          <span className="text-[22px] font-bold text-[#222222]">만원</span>
        </div>
      </div>

      {/* Financial Assets */}
      <div className="mb-5">
        <label className="text-[22px] font-bold text-[#222222] mb-2 block">③ 금융재산 (예금, 적금 등)</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={financial}
            onChange={(e) => { setFinancial(e.target.value); setError(''); }}
            placeholder="예: 3000"
            className="flex-1 max-w-[240px] h-[60px] text-[24px] text-center border-3 border-gray-300 rounded-xl focus:border-[#1A56DB] focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
          />
          <span className="text-[22px] font-bold text-[#222222]">만원</span>
        </div>
      </div>

      {/* Debt */}
      <div className="mb-5">
        <label className="text-[22px] font-bold text-[#222222] mb-1 block">④ 부채 (빚)</label>
        <p className="text-[17px] text-[#D32F2F] mb-1">※ 은행 등 금융기관으로부터 확인 받을 수 있는 공식적인 부채 기준입니다.</p>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={debt}
            onChange={(e) => { setDebt(e.target.value); setError(''); }}
            placeholder="예: 1000"
            className="flex-1 max-w-[240px] h-[60px] text-[24px] text-center border-3 border-gray-300 rounded-xl focus:border-[#1A56DB] focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white"
          />
          <span className="text-[22px] font-bold text-[#222222]">만원</span>
        </div>
      </div>

      {/* Help */}
      <p className="text-[18px] text-[#1A56DB] text-center mb-6">
        💡 없는 항목은 비워두거나 0을 입력하세요
      </p>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-[90%] max-w-md h-[75px] bg-[#16A34A] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#15803d] active:scale-[0.98] transition-all mx-auto"
      >
        결과 확인하기 →
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
