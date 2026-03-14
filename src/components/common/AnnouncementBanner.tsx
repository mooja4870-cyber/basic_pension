import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface AnnouncementBannerProps {
  showBanner: boolean;
  setShowBanner: (val: boolean) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ showBanner, setShowBanner }) => {
  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-100 dark:bg-amber-900/40 border-b border-amber-200 dark:border-amber-900/30 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-1.5 rounded-full text-white flex-shrink-0">
                <AlertTriangle size={18} />
              </div>
              <p className="text-lg font-bold text-amber-900 dark:text-amber-200 leading-tight break-keep">
                [신기능] 이제 복지 소식을 지인에게 바로 공유할 수 있습니다! 📢
              </p>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-amber-200 dark:hover:bg-amber-800 rounded-full text-amber-700 dark:text-amber-400 transition-colors"
              aria-label="공지 닫기"
            >
              <X size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
