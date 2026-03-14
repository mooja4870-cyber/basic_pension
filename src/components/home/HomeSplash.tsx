import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  Coins, 
  UserCheck, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  Sun, 
  Moon 
} from 'lucide-react';
import { CheckHistoryItem, Tab } from '../../types';

interface HomeSplashProps {
  setIsHome: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  checkHistory: CheckHistoryItem[];
  setCurrentTab: (tab: Tab) => void;
}

export const HomeSplash: React.FC<HomeSplashProps> = ({
  setIsHome,
  isDarkMode,
  setIsDarkMode,
  checkHistory,
  setCurrentTab
}) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 20]);

  // Real-time stats simulation
  const [stats, setStats] = useState({ accumulatedCount: 12450, updateTime: "" });

  useEffect(() => {
    const updateStats = () => {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      
      const baseDate = new Date('2026-03-01T00:00:00').getTime();
      const elapsedMinutes = Math.floor((now.getTime() - baseDate) / (1000 * 60));
      const currentCount = 12000 + Math.floor(Math.max(0, elapsedMinutes) * 3);

      setStats({
        accumulatedCount: currentCount,
        updateTime: `${yyyy}.${mm}.${dd} ${hh}:${min}`
      });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 60000); 
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col break-keep transition-colors overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[120px]"
        />
      </div>

      <header className="relative z-20 p-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">복지 : 기초연금</span>
        </motion.div>
        <button 
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="p-3 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-slate-400 hover:scale-110 transition-transform cursor-pointer"
        >
          {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} className="text-blue-600" />}
        </button>
      </header>

      <main className="flex-1 relative z-10 flex flex-col lg:flex-row items-center justify-center p-8 lg:p-24 gap-16">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 text-center lg:text-left">
          <motion.div variants={itemVariants} className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-black rounded-full mb-6 tracking-widest uppercase">
            2026년 최신 정책 반영
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-8">
            당신의<br />
            <span className="text-blue-600">기초연금</span><br />
            찾아드려요.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl lg:text-2xl font-bold text-slate-500 dark:text-slate-400 mb-12 max-w-xl leading-relaxed">
            복잡한 서류 없이 1분 만에 확인하는<br />
            어르신 맞춤형 복지 혜택 가이드
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 relative z-50">
            <button 
              type="button"
              onClick={() => {
                setCurrentTab('news');
                setIsHome(false);
              }}
              className="group relative bg-blue-600 dark:bg-white text-white dark:text-slate-900 text-3xl font-black px-12 py-8 rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden w-full sm:w-auto text-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                지금 바로 시작하기 <ChevronRight size={32} />
              </span>
              <motion.div 
                className="absolute inset-0 bg-blue-700 dark:bg-slate-100 z-0 pointer-events-none" 
                initial={{ x: "-100%" }} 
                whileHover={{ x: 0 }} 
                transition={{ duration: 0.4, ease: "circOut" }} 
              />
            </button>
          </motion.div>
        </motion.div>

        <div className="flex-1 relative w-full max-w-2xl z-0">
          <motion.div style={{ y: y1, rotate }} className="relative z-10">
            <div className="relative">
              <motion.img 
                src="https://picsum.photos/seed/korean-gov-welfare-flat-vector/1000/1200" 
                className="w-full aspect-[4/5] object-cover rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border-8 border-white dark:border-slate-800"
              />
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-10 -left-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center"><Coins size={32} /></div>
                <div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">최대 수급액</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">월 40만원</div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center"><UserCheck size={32} /></div>
                <div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">대상자 확인</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">만 65세 이상</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-20 p-8 lg:p-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "누적 안내수", value: `${stats.accumulatedCount.toLocaleString()}건+`, icon: <TrendingUp size={20} /> },
            { label: "정확도", value: "99.8%", icon: <CheckCircle2 size={20} /> },
            { label: "상담 만족도", value: "4.9/5.0", icon: <Sparkles size={20} /> },
            { label: "실시간 업데이트", value: stats.updateTime || "업데이트 중...", icon: <Calendar size={20} /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex items-center gap-4">
              <div className="text-blue-600">{stat.icon}</div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
};
