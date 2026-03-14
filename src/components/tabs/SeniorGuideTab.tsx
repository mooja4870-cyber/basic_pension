import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, CheckCircle2 } from 'lucide-react';

export const SeniorGuideTab: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<number>(65);

  const guides = [
    { age: 64, title: "신청을 준비할 때 (만 64세)", items: ["생일 한 달 전부터 신청 가능합니다.", "주민등록증과 통장 사본을 미리 챙겨두세요.", "가까운 주민센터 위치를 확인해 보세요."] },
    { age: 65, title: "수급을 시작할 때 (만 65세)", items: ["기초연금 신청 시기를 놓치지 마세요.", "수급자로 선정되면 매달 25일에 지급됩니다.", "지역별 노인 복지 카드도 함께 신청하세요."] },
    { age: 70, title: "안정적인 노후 (만 70세 이상)", items: ["정기적인 소득 신고 변동 내역을 체크하세요.", "지자체별 추가 장수 수당이 있는지 확인해 보세요.", "무료 노인 건강검진 혜택을 꼭 챙기세요."] }
  ];

  const currentGuide = guides.find(g => g.age === selectedAge) || guides[1];

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-3xl border border-orange-100 dark:border-orange-900/30 transition-colors">
        <h3 className="text-3xl font-black text-orange-900 dark:text-orange-200 mb-6 flex items-center gap-2">
          <Heart size={32} /> 맞춤형 어르신 가이드
        </h3>
        
        <div className="flex gap-2 mb-8 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-inner scrollbar-hide overflow-x-auto">
          {[64, 65, 70].map((age) => (
            <button 
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`flex-1 py-4 px-6 rounded-xl text-xl font-bold transition-all whitespace-nowrap ${
                selectedAge === age 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/30'
              }`}
            >
              만 {age}세 {age === 70 && '이상'}
            </button>
          ))}
        </div>

        <motion.div 
          key={selectedAge}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-2xl font-black text-orange-800 dark:text-orange-300">
            <Star className="fill-orange-500 text-orange-500" />
            {currentGuide.title}
          </div>
          <div className="grid gap-4">
            {currentGuide.items.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm items-start">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-900 p-8 rounded-3xl text-white shadow-xl transition-colors">
        <h4 className="text-2xl font-black mb-4">공통 꿀팁!</h4>
        <p className="text-xl font-bold leading-relaxed opacity-90">
          기초연금은 본인이 직접 신청해야만 받으실 수 있습니다. 아드님이나 따님에게 대신 신청해달라고 부탁하는 법도 우리 앱에서 알려드려요!
        </p>
      </div>
    </div>
  );
};
