import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  ChevronUp 
} from 'lucide-react';

// Types
import { Tab, NewsItem, Notification, CheckHistoryItem } from './types';

// Constants
import { NOTIFICATIONS_DATA, NEWS_DATA_INITIAL, FAQ_DATA } from './constants/data';

// Components - Common
import { Header } from './components/common/Header';
import { TabBar } from './components/common/TabBar';
import { NotificationPanel } from './components/common/NotificationPanel';
import { AnnouncementBanner } from './components/common/AnnouncementBanner';
import { AppGuide } from './components/common/AppGuide';
import { FutureGuide } from './components/common/FutureGuide';

// Components - Tabs
import { NewsTab } from './components/tabs/NewsTab';
import { AIChatTab } from './components/tabs/AIChatTab';
import { CheckTab } from './components/tabs/CheckTab';
import { CalculatorTab } from './components/tabs/CalculatorTab';
import { EligibilityTab } from './components/tabs/EligibilityTab';
import { AmountTab } from './components/tabs/AmountTab';
import { ApplicationTab } from './components/tabs/ApplicationTab';
import { SeniorGuideTab } from './components/tabs/SeniorGuideTab';
import { FAQTab } from './components/tabs/FAQTab';
import { ContactTab } from './components/tabs/ContactTab';

// Components - Home
import { HomeSplash } from './components/home/HomeSplash';

// Services
import { newsService } from './services/newsService';

export default function App() {
  // --- UI 및 네비게이션 상태 ---
  const [isHome, setIsHome] = useState(true);
  const [currentTab, setCurrentTab] = useState<Tab>('news');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- 데이터 상태 ---
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : NOTIFICATIONS_DATA;
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [checkHistory, setCheckHistory] = useState<CheckHistoryItem[]>(() => {
    const saved = localStorage.getItem('check_history');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 오버레이 상태 ---
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [showFutureGuide, setShowFutureGuide] = useState(false);

  // --- 사이드 이팩트 ---
  useEffect(() => {
    const loadNews = async () => {
      setIsLoadingNews(true);
      const data = await newsService.fetchLatestNews();
      setNews(data);
      setIsLoadingNews(false);
    };
    loadNews();
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 핸들러 ---
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // --- 메인 콘텐츠 렌더링 ---
  const renderTabContent = () => {
    switch (currentTab) {
      case 'news': return <NewsTab news={news} setNews={setNews} searchQuery={searchQuery} isLoading={isLoadingNews} />;
      case 'ai_chat': return <AIChatTab />;
      case 'check': return <CheckTab />;
      case 'calculator': return <CalculatorTab />;
      case 'eligibility': return <EligibilityTab />;
      case 'amount': return <AmountTab />;
      case 'application': return <ApplicationTab />;
      case 'senior_guide': return <SeniorGuideTab />;
      case 'faq': return <FAQTab faqs={FAQ_DATA} searchQuery={searchQuery} />;
      case 'contact': return <ContactTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-24 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900">
      {isHome ? (
        <HomeSplash 
          setIsHome={setIsHome} 
          setShowGuide={setShowGuide} 
          setGuideStep={setGuideStep} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          checkHistory={checkHistory}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            setIsHome(false);
          }}
        />
      ) : (
        <>
          <Header 
            title="복지 : 기초연금"
            subtitle="어르신의 소중한 권리, 쉽고 빠르게"
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowNotifications={setShowNotifications}
            setShowFutureGuide={setShowFutureGuide}
            setShowGuide={setShowGuide}
            setGuideStep={setGuideStep}
            unreadCount={unreadCount}
          />

          <AnnouncementBanner showBanner={showBanner} setShowBanner={setShowBanner} />

          <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <main className="max-w-7xl mx-auto">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </main>

          {/* Floating Buttons */}
          <div className="fixed bottom-8 right-8 flex flex-col gap-5 z-30">
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-3xl border border-white dark:border-slate-800 text-blue-600 dark:text-blue-400 hover:scale-110 active:scale-95 transition-all group"
                >
                  <ChevronUp size={28} className="group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Redesigned Premium Home Button (Stitch Style) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsHome(true)}
              className="relative group flex items-center h-16 bg-white dark:bg-slate-900 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-full border border-slate-100 dark:border-slate-800 p-2 pr-6 overflow-hidden transition-all duration-500 hover:pr-8"
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:bg-blue-700 transition-colors duration-300">
                <Home size={24} />
              </div>
              
              <div className="ml-4 flex flex-col items-start overflow-hidden">
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 leading-none mb-0.5 tracking-tight">처음으로</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">Home Dashboard</span>
              </div>

              {/* Shine Animation */}
              <motion.div 
                className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
                animate={{ left: ["100%", "-100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </motion.button>
          </div>

          <NotificationPanel
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notifications={notifications}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            unreadCount={unreadCount}
          />
        </>
      )}

      <AppGuide showGuide={showGuide} setShowGuide={setShowGuide} guideStep={guideStep} setGuideStep={setGuideStep} />
      <FutureGuide showFutureGuide={showFutureGuide} setShowFutureGuide={setShowFutureGuide} />
    </div>
  );
}
