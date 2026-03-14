import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Sparkles, UserCheck, Calculator, Newspaper, Phone, CircleHelp } from 'lucide-react';

interface AppGuideProps {
  showGuide: boolean;
  setShowGuide: (val: boolean) => void;
  guideStep: number;
  setGuideStep: (val: number | ((prev: number) => number)) => void;
}

export const AppGuide: React.FC<AppGuideProps> = ({ showGuide, setShowGuide, guideStep, setGuideStep }) => {
  const guideSteps = [
    { title: "환영합니다!", desc: "기본연금 앱을 통해 어르신의 소중한 권리 찾아보세요.", icon: <Sparkles size={64} className="text-amber-500" /> },
    { title: "자가진단", desc: "나이와 거주지 정보만으로 수급 가능성을 1분 만에 확인하세요.", icon: <UserCheck size={64} className="text-blue-500" /> },
    { title: "금액계산", desc: "나의 소득과 재산을 입력하면 예상 연금액을 자동으로 계산해 드려요.", icon: <Calculator size={64} className="text-emerald-500" /> },
    { title: "최신소식", desc: "기초연금 정책과 공지사항을 한눈에 확인하고 중요한 변경을 놓치지 마세요.", icon: <Newspaper size={64} className="text-indigo-500" /> },
    { title: "자주질문", desc: "많이 물어보는 질문과 답변을 확인해 신청 전 궁금증을 빠르게 해결하세요.", icon: <CircleHelp size={64} className="text-rose-500" /> },
    { title: "고객센터", desc: "필요할 때 바로 문의처를 확인해 전화 및 방문 상담 정보를 쉽게 찾을 수 있어요.", icon: <Phone size={64} className="text-cyan-500" /> }
  ];

  return (
    <AnimatePresence>
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGuide(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden transition-colors">
            <button onClick={() => setShowGuide(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10 p-2"><X size={32} /></button>
            <div className="p-12 text-center">
              <AnimatePresence mode="wait">
                <motion.div key={guideStep} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex flex-col items-center gap-8 py-8">
                  <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-full">{guideSteps[guideStep].icon}</div>
                  <div>
                    <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{guideSteps[guideStep].title}</h4>
                    <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed break-keep">{guideSteps[guideStep].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between items-center mt-12">
                <button onClick={() => setGuideStep(p => Math.max(0, p - 1))} disabled={guideStep === 0} className={`p-4 rounded-2xl flex items-center gap-2 font-black text-xl transition-all ${guideStep === 0 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600'}`}><ChevronLeft size={28} /> 이전</button>
                <div className="flex gap-2">
                  {guideSteps.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all ${i === guideStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`} />
                  ))}
                </div>
                {guideStep < guideSteps.length - 1 ? (
                  <button onClick={() => setGuideStep(p => p + 1)} className="p-4 bg-blue-600 text-white rounded-2xl flex items-center gap-2 font-black text-xl shadow-lg active:scale-95 transition-all">다음 <ChevronRight size={28} /></button>
                ) : (
                  <button onClick={() => setShowGuide(false)} className="p-4 bg-blue-600 text-white rounded-2xl flex items-center gap-2 font-black text-xl shadow-lg active:scale-95 transition-all">시작하기</button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
