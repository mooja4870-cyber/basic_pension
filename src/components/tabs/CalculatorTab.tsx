import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Coins, Building2, Info } from 'lucide-react';
import { HouseholdType, RegionType, CalcIncome, CalcAssets } from '../../types';
import { pensionService } from '../../services/pensionService';

export const CalculatorTab: React.FC = () => {
  const [calcType, setCalcType] = useState<HouseholdType>('single');
  const [calcRegion, setCalcRegion] = useState<RegionType>('big');
  const [income, setIncome] = useState<CalcIncome>({ earned: '', other: '' });
  const [assets, setAssets] = useState<CalcAssets>({ general: '', financial: '', debt: '' });
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const res = pensionService.calculateIncomeRecognition(income, assets, calcRegion);
    setResult(res);
  };

  const reset = () => {
    setIncome({ earned: '', other: '' });
    setAssets({ general: '', financial: '', debt: '' });
    setResult(null);
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Calculator size={28} />
          </div>
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">소득인정액 계산기</h3>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">가구 유형</label>
            <div className="grid grid-cols-2 gap-4">
              {(['single', 'couple'] as const).map((type) => (
                <button 
                  key={type}
                  onClick={() => setCalcType(type)}
                  className={`p-5 rounded-2xl border-2 text-xl font-bold transition-all ${
                    calcType === type 
                      ? 'bg-amber-500 border-amber-500 text-white shadow-lg' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {type === 'single' ? '단독 가구' : '부부 가구'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xl font-bold text-slate-700 dark:text-slate-300 mb-3">거주 지역</label>
            <div className="grid grid-cols-3 gap-3">
              {(['big', 'medium', 'rural'] as const).map((region) => (
                <button 
                  key={region}
                  onClick={() => setCalcRegion(region)}
                  className={`p-4 rounded-2xl border-2 text-lg font-bold transition-all ${
                    calcRegion === region 
                      ? 'bg-amber-500 border-amber-500 text-white shadow-lg' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {region === 'big' ? '대도시' : region === 'medium' ? '중소도시' : '농어촌'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-400">* 대도시: 특별시, 광역시 / 중소도시: 도의 시 / 농어촌: 도의 군</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Coins size={20} className="text-amber-500" /> 월 소득 정보
            </h4>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">근로소득 (월)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={income.earned}
                    onChange={(e) => setIncome({...income, earned: e.target.value})}
                    placeholder="0"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xl font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">만원</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">기타소득 (연금, 사업 등)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={income.other}
                    onChange={(e) => setIncome({...income, other: e.target.value})}
                    placeholder="0"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xl font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">만원</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Building2 size={20} className="text-amber-500" /> 재산 정보
            </h4>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">일반재산 (토지, 주택 등)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={assets.general}
                    onChange={(e) => setAssets({...assets, general: e.target.value})}
                    placeholder="0"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xl font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">만원</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">금융재산 (예금, 주식 등)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={assets.financial}
                    onChange={(e) => setAssets({...assets, financial: e.target.value})}
                    placeholder="0"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xl font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">만원</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">부채 (대출금 등)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={assets.debt}
                    onChange={(e) => setAssets({...assets, debt: e.target.value})}
                    placeholder="0"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xl font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">만원</span>
                </div>
              </div>
            </div>
          </div>

          {!result ? (
            <button 
              onClick={calculate}
              className="w-full py-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-2xl font-black shadow-xl transition-all active:scale-95"
            >
              계산하기
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-amber-500/30">
              <div className="text-center mb-6">
                <p className="text-lg font-bold text-slate-500 mb-1">나의 예상 소득인정액</p>
                <h4 className="text-5xl font-black text-amber-600 dark:text-amber-400">
                  {result.toLocaleString()} <span className="text-2xl">원</span>
                </h4>
              </div>
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-600 dark:text-slate-400">2026년 선정기준액</span>
                  <span className="text-xl font-black text-slate-800 dark:text-slate-100">
                    {calcType === 'single' ? '2,450,000원' : '3,920,000원'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 text-center">
                  <p className={`text-xl font-black ${result <= (calcType === 'single' ? 2450000 : 3920000) ? 'text-emerald-600' : 'text-red-600'}`}>
                    {result <= (calcType === 'single' ? 2450000 : 3920000) ? '수급 가능성이 매우 높습니다!' : '선정기준액을 초과할 가능성이 있습니다.'}
                  </p>
                </div>
              </div>
              <button onClick={reset} className="w-full mt-6 py-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-slate-600 dark:text-slate-300">다시 계산하기</button>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
        <h5 className="font-black text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <Info size={18} /> 유의사항
        </h5>
        <ul className="text-base font-bold text-red-600 dark:text-red-400 space-y-2 list-disc pl-5">
          <li>월 소득 정보는 세금 등 공제 전 총 소득 금액을 표시해야 합니다.</li>
          <li>본 계산 결과는 입력하신 정보를 바탕으로 산출된 '예상치'입니다.</li>
          <li>실제 수급 자격은 복지로 또는 읍면동 주민센터의 정밀 조사를 통해 결정됩니다.</li>
        </ul>
      </div>
    </div>
  );
};
