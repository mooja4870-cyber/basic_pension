import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, CheckCircle2, Calendar, Sparkles, Newspaper } from 'lucide-react';
import { Notification } from '../../types';
import { saveToCalendar } from '../../utils/helpers';

interface NotificationPanelProps {
  showNotifications: boolean;
  setShowNotifications: (val: boolean) => void;
  notifications: Notification[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  showNotifications,
  setShowNotifications,
  notifications,
  markAsRead,
  markAllAsRead,
  unreadCount
}) => {
  return (
    <AnimatePresence>
      {showNotifications && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNotifications(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col transition-colors"
          >
            <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">알림센터</h3>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {notifications.length > 0 ? (
                notifications.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => markAsRead(n.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98] relative overflow-hidden ${
                    n.isRead 
                      ? 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 ring-1 ring-blue-400/20'
                  }`}>
                    {!n.isRead && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${
                          n.type === 'policy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                          n.type === 'deadline' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                          n.type === 'feature' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                          'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        }`}>
                          {n.type === 'policy' ? <CheckCircle2 size={14} /> :
                           n.type === 'deadline' ? <Calendar size={14} /> :
                           n.type === 'feature' ? <Sparkles size={14} /> :
                           <Newspaper size={14} />}
                        </div>
                        <h4 className={`font-black text-sm ${n.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {n.title}
                        </h4>
                      </div>
                      {!n.isRead && (
                        <span className="px-1.5 py-0.5 bg-blue-600 text-[10px] text-white font-black rounded-md animate-pulse">NEW</span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${n.isRead ? 'text-slate-500 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300 font-medium'}`}>
                      {n.content}
                    </p>
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-[10px] text-slate-400 font-bold">
                        {n.date}
                      </div>
                      {n.type === 'deadline' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            saveToCalendar(n.title, n.date, n.content);
                          }}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Calendar size={10} />
                          <span>일정 저장</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <Bell size={48} className="opacity-20" />
                  <p className="font-bold">새로운 알림이 없습니다</p>
                </div>
              )}
            </div>

            {unreadCount > 0 && (
              <div className="p-4 border-t dark:border-slate-800">
                <button 
                  onClick={markAllAsRead}
                  className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-bold active:scale-95 transition-all"
                >
                  모두 읽음으로 표시
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
