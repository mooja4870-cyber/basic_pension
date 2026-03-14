import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserCheck, HelpCircle, CheckCircle2, Share2 } from 'lucide-react';
import { CheckHistoryItem } from '../../types';
import { pensionService } from '../../services/pensionService';

export const CheckTab: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [residence, setResidence] = useState<'domestic' | 'overseas' | ''>('');
  const [result, setResult] = useState<'eligible' | 'ineligible' | 'maybe' | null>(null);
  const [history, setHistory] = useState<CheckHistoryItem[]>(() => {
    const saved = localStorage.getItem('check_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('check_history', JSON.stringify(history));
  }, [history]);

  const handleCheck = () => {
    const checkResult = pensionService.checkEligibility(age, residence as any);
    setResult(checkResult);
    
    // 기록 저장 (최근 5개만 유지)
    const newItem: CheckHistoryItem = {
      id: Date.now(),
      age,
      residence: residence as 'domestic' | 'overseas',
      result: checkResult === 'maybe' ? 'eligible' : 'ineligible',
      date: new Date().toLocaleString()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 5));
  };

  const reset = () => {
    setAge('');
    setResidence('');
    setResult(null);
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <UserCheck size={32} className="text-blue-600 dark:text-blue-400" />
          간편 자가진단
        </h3>
        
        {!result ? (
          <div className="space-y-8">
            <div>
              <label className="block text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">1. 현재 연세가 어떻게 되시나요?</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="예: 65"
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-2xl font-bold text-slate-900 dark:text-slate-100 focus:border-blue-500 outline-none transition-colors"
                />
                <span className="text-2xl font-bold text-slate-500 dark:text-slate-400">세</span>
              </div>
            </div>

            <div>
              <label className="block text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">2. 현재 어디에 거주하시나요?</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setResidence('domestic')}
                  className={`p-6 rounded-2xl border-2 text-2xl font-bold transition-all ${
                    residence === 'domestic' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  국내 거주
                </button>
                <button 
                  onClick={() => setResidence('overseas')}
                  className={`p-6 rounded-2xl border-2 text-2xl font-bold transition-all ${
                    residence === 'overseas' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  해외 거주
                </button>
              </div>
            </div>

            <button 
              onClick={handleCheck}
              disabled={!age || !residence}
              className={`w-full py-8 rounded-full text-3xl font-black shadow-xl transition-all ${
                age && residence 
                ? 'bg-blue-600 dark:bg-blue-500 text-white active:scale-95' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              결과 확인하기
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            {result === 'ineligible' ? (
              <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-3xl border-2 border-red-100 dark:border-red-900/30">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"><HelpCircle size={48} /></div>
                <h4 className="text-4xl font-black text-red-600 dark:text-red-400 mb-4">수급 대상이 아닙니다</h4>
                <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                  {parseInt(age) < 65 
                    ? "기초연금은 만 65세 이상부터 신청 가능합니다. 생일이 되기 1개월 전부터 미리 준비해 보세요!"
                    : "기초연금은 국내 거주 어르신을 대상으로 합니다. 해외 거주 시 수급이 제한될 수 있습니다."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-3xl border-2 border-emerald-100 dark:border-emerald-900/30">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"><CheckCircle2 size={48} /></div>
                  <h4 className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-4">수급 가능성이 높습니다!</h4>
                  <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                    연령과 거주 요건을 충족하셨습니다. 다만, 가구의 소득과 재산(소득인정액)이 기준 이하인 경우에 최종 지급됩니다.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-left">
                  <p className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">※ 다음 단계 안내</p>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    상세한 소득 조사를 위해 가까운 주민센터를 방문하시거나 복지로 홈페이지에서 정식 신청을 진행해 보세요.
                  </p>
                </div>
              </div>
            )}
            <button onClick={reset} className="mt-8 text-xl font-bold text-slate-400 dark:text-slate-500 underline underline-offset-4">다시 확인하기</button>
          </motion.div>
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-900/30">
        <p className="text-lg font-bold text-amber-800 dark:text-amber-300 leading-relaxed">
          ※ 본 진단은 참고용이며, 정확한 수급 여부는 보건복지부의 공식 조사를 통해 결정됩니다.
        </p>
      </div>

      {history.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">최근 진단 기록</h4>
            <button onClick={() => setHistory([])} className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors">기록 삭제</button>
          </div>
          <div className="grid gap-3">
            {history.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-black text-white ${item.result === 'eligible' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {item.result === 'eligible' ? '수급가능' : '수급불가'}
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.age}세 / {item.residence === 'domestic' ? '국내' : '해외'}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      const text = `[복지 : 기초연금] 기초연금 자가진단 결과: ${item.result === 'eligible' ? '수급 가능성이 높습니다!' : '수급 대상이 아닙니다.'} (${item.age}세, ${item.residence === 'domestic' ? '국내거주' : '해외거주'})`;
                      if (navigator.share) {
                        navigator.share({ title: '기초연금 진단 결과', text, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(text);
                        alert('결과가 복사되었습니다.');
                      }
                    }}
                    className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 rounded-xl transition-colors"
                  >
                    <Share2 size={20} />
                  </button>
                  <div className={item.result === 'eligible' ? 'text-emerald-500' : 'text-red-500'}>
                    {item.result === 'eligible' ? <CheckCircle2 size={24} /> : <HelpCircle size={24} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
