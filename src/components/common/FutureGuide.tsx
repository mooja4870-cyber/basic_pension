import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Brain, ScanLine, Smartphone } from 'lucide-react';

interface FutureGuideProps {
  showFutureGuide: boolean;
  setShowFutureGuide: (val: boolean) => void;
}

export const FutureGuide: React.FC<FutureGuideProps> = ({ showFutureGuide, setShowFutureGuide }) => {
  return (
    <AnimatePresence>
      {showFutureGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFutureGuide(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden transition-colors">
            <div className="bg-blue-600 p-8 text-white relative">
              <button onClick={() => setShowFutureGuide(false)} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors"><X size={32} /></button>
              <h3 className="text-4xl font-black mb-2">미래 기능 미리보기 🚀</h3>
              <p className="text-xl font-bold opacity-80">어르신들을 위해 더 편리한 기술을 준비하고 있습니다.</p>
            </div>
            
            <div className="p-10 grid gap-6">
              {[
                { title: "말 한마디로 찾는 연금 (Voice AI)", desc: "키보드 없이 말로만 물어봐도 척척 답변해 드리는 음성 인식 기술입니다.", icon: <Mic size={32} /> },
                { title: "서류 자동 제출 (OCR)", desc: "사진만 찍으면 복지로 사이트에 자동으로 서류가 등록되는 시스템입니다.", icon: <ScanLine size={32} /> },
                { title: "맞춤형 알림 서비스 (Push)", desc: "신청 마감일이나 기쁜 수급 소식을 스마트폰 알림으로 바로 알려드립니다.", icon: <Smartphone size={32} /> },
                { title: "고도화된 AI 상담 (Brain)", desc: "더 똑똑해진 AI가 훨씬 더 자세하고 친절하게 답변해 드릴 예정입니다.", icon: <Brain size={32} /> }
              ].map((feature, i) => (
                <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-900/30">
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 text-blue-600 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{feature.title}</h4>
                    <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed break-keep">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-8 bg-blue-50 dark:bg-blue-900/20 text-center">
              <button onClick={() => setShowFutureGuide(false)} className="px-12 py-4 bg-blue-600 text-white rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-all">확인했습니다</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
