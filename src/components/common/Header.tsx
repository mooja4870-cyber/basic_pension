import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Search, Sparkles, Bell, X } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setShowNotifications: (val: boolean) => void;
  setShowFutureGuide: (val: boolean) => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  isDarkMode,
  setIsDarkMode,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  setShowNotifications,
  setShowFutureGuide,
  unreadCount
}) => {
  return (
    <header className="bg-blue-600 dark:bg-blue-900 text-white pt-12 pb-8 px-6 sticky top-0 z-20 shadow-lg overflow-hidden transition-colors">
      <div className="absolute top-0 right-0 p-4 flex gap-4 opacity-80">
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)} 
          className={`p-1 hover:bg-white/10 rounded-full transition-colors ${isSearchOpen ? 'bg-white/20' : ''}`}
        >
          <Search size={24} />
        </button>
        <button 
          onClick={() => setShowFutureGuide(true)} 
          className="p-1 hover:bg-white/10 rounded-full transition-colors relative group"
          title="준비 중인 혁신 기능"
        >
          <Sparkles size={24} className="text-amber-300 animate-pulse" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">혁신 기능 미리보기</span>
        </button>
        <button 
          onClick={() => setShowNotifications(true)} 
          className="p-1 hover:bg-white/10 rounded-full transition-colors relative"
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 rounded-full border-2 border-blue-600 dark:border-blue-900 flex items-center justify-center text-[10px] font-black">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <h1 className="text-5xl font-black mb-2 tracking-tighter">{title}</h1>
        <p className="text-2xl font-bold opacity-90">{subtitle}</p>
      </motion.div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 relative"
          >
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요 (예: 신청방법, 재산기준)"
              className="w-full p-4 pl-12 bg-white/10 border border-white/20 rounded-2xl text-xl font-bold placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
              autoFocus
            />
            <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
