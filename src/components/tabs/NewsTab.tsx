import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Calendar, Search, Loader2 } from 'lucide-react';
import { NewsItem } from '../../types';
import { saveToCalendar, handleShare } from '../../utils/helpers';

interface NewsTabProps {
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  searchQuery: string;
  isLoading: boolean;
}

export const NewsTab: React.FC<NewsTabProps> = ({ news, setNews, searchQuery, isLoading }) => {
  const [newsFilter, setNewsFilter] = useState<'전체' | '뉴스' | '보도자료' | '안내'>('전체');
  const [newsDeptFilter, setNewsDeptFilter] = useState<string>('전체');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const showToastMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };



  const filteredNews = news.filter(n => {
    const matchesFilter = newsFilter === '전체' || n.type === newsFilter;
    const matchesDept = newsDeptFilter === '전체' || (n.department && n.department.includes(newsDeptFilter));
    const matchesSearch = n.title.includes(searchQuery) || n.summary.includes(searchQuery);
    return matchesFilter && matchesDept && matchesSearch;
  });

  const departments = ['전체', ...Array.from(new Set(news.map(n => n.department?.split(' ')[0]).filter(Boolean)))];

  return (
    <div className="p-4 flex flex-col gap-4 relative">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(['전체', '뉴스', '보도자료', '안내'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => setNewsFilter(filter)}
            className={`flex-none px-5 py-2 rounded-full text-lg font-bold transition-all ${
              newsFilter === filter 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setNewsDeptFilter(dept)}
            className={`flex-none px-4 py-1.5 rounded-xl text-base font-bold transition-all ${
              newsDeptFilter === dept 
                ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-blue-600 opacity-50" />
          <p className="text-xl font-bold text-slate-400">최신 정보를 불러오고 있습니다...</p>
        </div>
      ) : filteredNews.length > 0 ? (
        filteredNews.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          return (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    item.type === '보도자료' 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                      : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleShare(`[복지 : 기초연금] ${item.title}`, item.summary, window.location.href, showToastMessage)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-600 dark:text-slate-300 font-bold"
                  >
                    <Share2 size={18} />
                    <span>공유</span>
                  </button>
                  <button 
                    onClick={() => {
                      saveToCalendar(item.title, item.date, item.summary);
                      showToastMessage("일정이 캘린더 파일(.ics)로 저장되었습니다.");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all text-blue-600 dark:text-blue-400 font-bold"
                  >
                    <Calendar size={18} />
                    <span>일정 저장</span>
                  </button>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-snug">{item.title}</h4>
              {item.department && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">담당부서 : {item.department}</p>
              )}
              
              <div className="relative">
                {isExpanded ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4"
                  >
                    {item.content}
                  </motion.div>
                ) : (
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                )}
                
                <button 
                  onClick={() => toggleExpand(item.id)}
                  className="mt-2 text-blue-600 dark:text-blue-400 font-black flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-xl transition-all"
                >
                  {isExpanded ? '내용 접기' : '상세 내용 더보기'}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-4">
          <Search size={48} className="opacity-20" />
          <p className="text-xl font-bold">검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
};
